var Np=Object.create;var Qo=Object.defineProperty;var qp=Object.getOwnPropertyDescriptor;var Fp=Object.getOwnPropertyNames;var jp=Object.getPrototypeOf,Bp=Object.prototype.hasOwnProperty;var Up=(e,t,n)=>t in e?Qo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Xo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Wp=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Fp(t))!Bp.call(e,s)&&s!==n&&Qo(e,s,{get:()=>t[s],enumerable:!(r=qp(t,s))||r.enumerable});return e};var zp=(e,t,n)=>(n=e!=null?Np(jp(e)):{},Wp(t||!e||!e.__esModule?Qo(n,"default",{value:e,enumerable:!0}):n,e));var yt=(e,t,n)=>Up(e,typeof t!="symbol"?t+"":t,n);var fl=Xo((Nb,pl)=>{var _r=1e3,mr=_r*60,gr=mr*60,er=gr*24,Vp=er*7,Kp=er*365.25;pl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Yp(e);if(n==="number"&&isFinite(e))return t.long?Qp(e):Zp(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Yp(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Kp;case"weeks":case"week":case"w":return n*Vp;case"days":case"day":case"d":return n*er;case"hours":case"hour":case"hrs":case"hr":case"h":return n*gr;case"minutes":case"minute":case"mins":case"min":case"m":return n*mr;case"seconds":case"second":case"secs":case"sec":case"s":return n*_r;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Zp(e){var t=Math.abs(e);return t>=er?Math.round(e/er)+"d":t>=gr?Math.round(e/gr)+"h":t>=mr?Math.round(e/mr)+"m":t>=_r?Math.round(e/_r)+"s":e+"ms"}function Qp(e){var t=Math.abs(e);return t>=er?Ps(e,t,er,"day"):t>=gr?Ps(e,t,gr,"hour"):t>=mr?Ps(e,t,mr,"minute"):t>=_r?Ps(e,t,_r,"second"):e+" ms"}function Ps(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var ml=Xo((qb,_l)=>{function Xp(e){n.debug=n,n.default=n,n.coerce=u,n.disable=a,n.enable=s,n.enabled=i,n.humanize=fl(),n.destroy=d,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let _=0;for(let g=0;g<p.length;g++)_=(_<<5)-_+p.charCodeAt(g),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(p){let _,g=null,w,x;function P(...B){if(!P.enabled)return;let H=P,Q=Number(new Date),D=Q-(_||Q);H.diff=D,H.prev=_,H.curr=Q,_=Q,B[0]=n.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let M=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(j,E)=>{if(j==="%%")return"%";M++;let I=n.formatters[E];if(typeof I=="function"){let Y=B[M];j=I.call(H,Y),B.splice(M,1),M--}return j}),n.formatArgs.call(H,B),(H.log||n.log).apply(H,B)}return P.namespace=p,P.useColors=n.useColors(),P.color=n.selectColor(p),P.extend=r,P.destroy=n.destroy,Object.defineProperty(P,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(w!==n.namespaces&&(w=n.namespaces,x=n.enabled(p)),x),set:B=>{g=B}}),typeof n.init=="function"&&n.init(P),P}function r(p,_){let g=n(this.namespace+(typeof _>"u"?":":_)+p);return g.log=this.log,g}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let _=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of _)g[0]==="-"?n.skips.push(g.slice(1)):n.names.push(g)}function o(p,_){let g=0,w=0,x=-1,P=0;for(;g<p.length;)if(w<_.length&&(_[w]===p[g]||_[w]==="*"))_[w]==="*"?(x=w,P=g,w++):(g++,w++);else if(x!==-1)w=x+1,P++,g=P;else return!1;for(;w<_.length&&_[w]==="*";)w++;return w===_.length}function a(){let p=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),p}function i(p){for(let _ of n.skips)if(o(p,_))return!1;for(let _ of n.names)if(o(p,_))return!0;return!1}function u(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}_l.exports=Xp});var gl=Xo((Yt,Ds)=>{Yt.formatArgs=ef;Yt.save=tf;Yt.load=nf;Yt.useColors=Jp;Yt.storage=rf();Yt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Yt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Jp(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ef(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ds.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}Yt.log=console.debug||console.log||(()=>{});function tf(e){try{e?Yt.storage.setItem("debug",e):Yt.storage.removeItem("debug")}catch{}}function nf(){let e;try{e=Yt.storage.getItem("debug")||Yt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function rf(){try{return localStorage}catch{}}Ds.exports=ml()(Yt);var{formatters:sf}=Ds.exports;sf.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Fr=globalThis,Cs=Fr.trustedTypes,Qi=Cs?Cs.createPolicy("lit-html",{createHTML:e=>e}):void 0,ea="$lit$",$n=`lit$${Math.random().toFixed(9).slice(2)}$`,ta="?"+$n,Hp=`<${ta}>`,Zn=document,jr=()=>Zn.createComment(""),Br=e=>e===null||typeof e!="object"&&typeof e!="function",na=Array.isArray,rl=e=>na(e)||typeof e?.[Symbol.iterator]=="function",Jo=`[ 	
\f\r]`,qr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Xi=/-->/g,Ji=/>/g,Kn=RegExp(`>|${Jo}(?:([^\\s"'>=/]+)(${Jo}*=${Jo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),el=/'/g,tl=/"/g,sl=/^(?:script|style|textarea|title)$/i,ra=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=ra(1),fr=ra(2),Rb=ra(3),on=Symbol.for("lit-noChange"),It=Symbol.for("lit-nothing"),nl=new WeakMap,Yn=Zn.createTreeWalker(Zn,129);function ol(e,t){if(!na(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qi!==void 0?Qi.createHTML(t):t}var al=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=qr;for(let i=0;i<n;i++){let u=e[i],d,p,_=-1,g=0;for(;g<u.length&&(a.lastIndex=g,p=a.exec(u),p!==null);)g=a.lastIndex,a===qr?p[1]==="!--"?a=Xi:p[1]!==void 0?a=Ji:p[2]!==void 0?(sl.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Kn):p[3]!==void 0&&(a=Kn):a===Kn?p[0]===">"?(a=s??qr,_=-1):p[1]===void 0?_=-2:(_=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?Kn:p[3]==='"'?tl:el):a===tl||a===el?a=Kn:a===Xi||a===Ji?a=qr:(a=Kn,s=void 0);let w=a===Kn&&e[i+1].startsWith("/>")?" ":"";o+=a===qr?u+Hp:_>=0?(r.push(d),u.slice(0,_)+ea+u.slice(_)+$n+w):u+$n+(_===-2?i:w)}return[ol(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Ur=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,u=this.parts,[d,p]=al(t,n);if(this.el=e.createElement(d,r),Yn.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Yn.nextNode())!==null&&u.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(ea)){let g=p[a++],w=s.getAttribute(_).split($n),x=/([.?@])?(.*)/.exec(g);u.push({type:1,index:o,name:x[2],strings:w,ctor:x[1]==="."?Is:x[1]==="?"?Os:x[1]==="@"?Ls:Xn}),s.removeAttribute(_)}else _.startsWith($n)&&(u.push({type:6,index:o}),s.removeAttribute(_));if(sl.test(s.tagName)){let _=s.textContent.split($n),g=_.length-1;if(g>0){s.textContent=Cs?Cs.emptyScript:"";for(let w=0;w<g;w++)s.append(_[w],jr()),Yn.nextNode(),u.push({type:2,index:++o});s.append(_[g],jr())}}}else if(s.nodeType===8)if(s.data===ta)u.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf($n,_+1))!==-1;)u.push({type:7,index:o}),_+=$n.length-1}o++}}static createElement(t,n){let r=Zn.createElement("template");return r.innerHTML=t,r}};function Qn(e,t,n=e,r){if(t===on)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=Br(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=Qn(e,s._$AS(e,t.values),s,r)),t}var Rs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??Zn).importNode(n,!0);Yn.currentNode=s;let o=Yn.nextNode(),a=0,i=0,u=r[0];for(;u!==void 0;){if(a===u.index){let d;u.type===2?d=new pr(o,o.nextSibling,this,t):u.type===1?d=new u.ctor(o,u.name,u.strings,this,t):u.type===6&&(d=new Ms(o,this,t)),this._$AV.push(d),u=r[++i]}a!==u?.index&&(o=Yn.nextNode(),a++)}return Yn.currentNode=Zn,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},pr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=It,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Qn(this,t,n),Br(t)?t===It||t==null||t===""?(this._$AH!==It&&this._$AR(),this._$AH=It):t!==this._$AH&&t!==on&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):rl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==It&&Br(this._$AH)?this._$AA.nextSibling.data=t:this.T(Zn.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Ur.createElement(ol(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Rs(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=nl.get(t.strings);return n===void 0&&nl.set(t.strings,n=new Ur(t)),n}k(t){na(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(jr()),this.O(jr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Xn=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=It,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=It}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=Qn(this,t,n,0),a=!Br(t)||t!==this._$AH&&t!==on,a&&(this._$AH=t);else{let i=t,u,d;for(t=o[0],u=0;u<o.length-1;u++)d=Qn(this,i[r+u],n,u),d===on&&(d=this._$AH[u]),a||(a=!Br(d)||d!==this._$AH[u]),d===It?t=It:t!==It&&(t+=(d??"")+o[u+1]),this._$AH[u]=d}a&&!s&&this.j(t)}j(t){t===It?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Is=class extends Xn{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===It?void 0:t}},Os=class extends Xn{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==It)}},Ls=class extends Xn{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=Qn(this,t,n,0)??It)===on)return;let r=this._$AH,s=t===It&&r!==It||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==It&&(r===It||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ms=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Qn(this,t)}},il={M:ea,P:$n,A:ta,C:1,L:al,R:Rs,D:rl,V:Qn,I:pr,H:Xn,N:Os,U:Ls,B:Is,F:Ms},Gp=Fr.litHtmlPolyfillSupport;Gp?.(Ur,pr),(Fr.litHtmlVersions??(Fr.litHtmlVersions=[])).push("3.3.1");var Ge=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new pr(t.insertBefore(jr(),o),o,void 0,n??{})}return s._$AI(e),s};var en="today",Dn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function an(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Jn(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ll(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function cl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ul(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function dl(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var hl=zp(gl(),1);function At(e){return(0,hl.default)(`beads-ui:${e}`)}function fn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function tr(e,t){let n=fn(e.created_at),r=fn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function vl(e,t){let n=fn(e.created_at),r=fn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function wl(e,t){let n=fn(e.updated_at),r=fn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function kl(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=fn(e.created_at),o=fn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function $l(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var of=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function bl(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function yl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=of.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function xl(e,t){let n=bl(e),r=bl(t);if(n!==r)return n<r?-1:1;let s=yl(e),o=yl(t);if(s!==o)return s<o?-1:1;let a=fn(e&&e.created_at),i=fn(t&&t.created_at);if(a!==i)return a<i?-1:1;let u=e&&e.id,d=t&&t.id;return u===d?0:String(u)<String(d)?-1:1}var sa=2**20;function hr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-fn(e&&e.created_at)}function Ns(e){return(t,n)=>{let r=hr(t,e),s=hr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function oa(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:hr(i,n)-sa};if(!i)return{rank:hr(a,n)+sa};let u=hr(a,n),d=hr(i,n),p=(u+d)/2;return u<p&&p<d?{rank:p}:{renormalize:r.map((_,g)=>({bead_id:_.id,rank:g*sa}))}}function aa(e,t={}){let n=At(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,u=t.sort||tr;function d(){for(let g of Array.from(a))try{g()}catch{}}function p(){s=Array.from(r.values()).sort(u)}function _(g){if(i||!g||g.id!==e)return;let w=Number(g.revision)||0;if(n("apply %s rev=%d",g.type,w),!(w<=o&&g.type!=="snapshot")){if(g.type==="snapshot"){if(w<=o)return;r.clear();let x=Array.isArray(g.issues)?g.issues:[];for(let P of x)P&&typeof P.id=="string"&&P.id.length>0&&r.set(P.id,P);p(),o=w,d();return}if(g.type==="upsert"){let x=g.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let P=r.get(x.id);if(!P)r.set(x.id,x);else{let B=Number.isFinite(P.updated_at)?P.updated_at:0,H=Number.isFinite(x.updated_at)?x.updated_at:0;if(B<=H){for(let Q of Object.keys(P))Q in x||delete P[Q];for(let[Q,D]of Object.entries(x))P[Q]=D}}p()}o=w,d()}else if(g.type==="delete"){let x=String(g.issue_id||"");x&&(r.delete(x),p()),o=w,d()}}}return{id:e,subscribe(g){return a.add(g),()=>{a.delete(g)}},applyPush:_,snapshot(){return s},size(){return r.size},getById(g){return r.get(g)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function qs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Al(e){let t=At("subs"),n=new Map,r=new Map;function s(i,u){t("applyDelta %s +%d ~%d -%d",i,(u.added||[]).length,(u.updated||[]).length,(u.removed||[]).length);let d=r.get(i);if(!d||d.size===0)return;let p=Array.isArray(u.added)?u.added:[],_=Array.isArray(u.updated)?u.updated:[],g=Array.isArray(u.removed)?u.removed:[];for(let w of Array.from(d)){let x=n.get(w);if(!x)continue;let P=x.itemsById;for(let B of p)typeof B=="string"&&B.length>0&&P.set(B,!0);for(let B of _)typeof B=="string"&&B.length>0&&P.set(B,!0);for(let B of g)typeof B=="string"&&B.length>0&&P.delete(B)}}async function o(i,u){let d=qs(u);if(t("subscribe %s key=%s",i,d),!n.has(i))n.set(i,{key:d,itemsById:new Map});else{let _=n.get(i);if(_&&_.key!==d){let g=r.get(_.key);g&&(g.delete(i),g.size===0&&r.delete(_.key)),n.set(i,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let p=r.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:u.type,params:u.params})}catch(_){let g=n.get(i)||null;if(g){let w=r.get(g.key);w&&(w.delete(i),w.size===0&&r.delete(g.key))}throw n.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let _=n.get(i)||null;if(_){let g=r.get(_.key);g&&(g.delete(i),g.size===0&&r.delete(_.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:qs,selectors:{getIds(i){let u=n.get(i);return u?Array.from(u.itemsById.keys()):[]},has(i,u){let d=n.get(i);return d?d.itemsById.has(u):!1},count(i){let u=n.get(i);return u?u.itemsById.size:0},getItemsById(i){let u=n.get(i),d={};if(!u)return d;for(let p of u.itemsById.keys())d[p]=!0;return d}}}}function Sl(){let e=At("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let u of Array.from(r))try{u()}catch{}}function a(u,d,p){let _=d?qs(d):"",g=n.get(u)||"",w=t.has(u);if(e("register %s key=%s (prev=%s)",u,_,g),w&&g&&_&&g!==_){let x=t.get(u);if(x)try{x.dispose()}catch{}let P=s.get(u);if(P){try{P()}catch{}s.delete(u)}let B=aa(u,p);t.set(u,B);let H=B.subscribe(()=>o());s.set(u,H)}else if(!w){let x=aa(u,p);t.set(u,x);let P=x.subscribe(()=>o());s.set(u,P)}return n.set(u,_),()=>i(u)}function i(u){e("unregister %s",u),n.delete(u);let d=t.get(u);d&&(d.dispose(),t.delete(u));let p=s.get(u);if(p){try{p()}catch{}s.delete(u)}}return{register:a,unregister:i,getStore(u){return t.get(u)||null},snapshotFor(u){let d=t.get(u);return d?d.snapshot().slice():[]},subscribe(u){return r.add(u),()=>r.delete(u)}}}function El(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Tl(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Cl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ia(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function af(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function lf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Rl(e){let t=At("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):af(r),a=lf(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let u=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==u&&(window.location.hash=u)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=ia(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?ia(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var cf=Object.freeze({workspace_config:{default_workspace:null}});function Il(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:cf.workspace_config.default_workspace}}}function Ol(e={}){let t=At("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Il(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Il(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==n.workspace.hidden[p]),u=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===n.worker.show_closed_children[p])&&!i&&!u||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Ll(e){let t=At("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function u(d){return async(_,g)=>{let w=s++,x=Date.now();r.set(w,{type:_,start_ts:x}),t("request start id=%d type=%s count=%d",w,_,n+1),a();let P=!1,B=()=>{P||(P=!0,r.delete(w),i())},H=setTimeout(()=>{P||(t("request TIMEOUT id=%d type=%s elapsed=%dms",w,_,Date.now()-x),B())},3e4);try{let Q=await d(_,g),D=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",w,_,D),Q}catch(Q){let D=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",w,_,D,Q),Q}finally{clearTimeout(H),B()}}}return o(),{wrapSend:u,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([p,_])=>({id:p,type:_.type,elapsed_ms:d-_.start_ts}))}}}function ue(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Fs(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let u=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return u.sort($l),u;switch(i){case"created_desc":return u.sort(tr),u;case"created_asc":return u.sort(vl),u;case"updated_desc":return u.sort(wl),u;case"priority":return u.sort(kl),u;case"manual":default:{let d=n();return d?u.sort(Ns(d)):u.sort(tr),u}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function yn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function zt(e){let t=yn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function tn(e,t){let n=yn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let u=Math.floor(i/7);if(i<30)return`${u}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Ml(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=yn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function js(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Bs(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=js(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Us(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=Ml(n);return{total:n.length,count:r,current:s,children:n}}function Ws(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let u={...a.order};for(let d of i)u[d.bead_id]=d.rank;n&&n.set({revision:a.revision,order:u})}async function o(a,i,u){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},p=r(oa(i,u,d.order),a);s(d,p);let _=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(_&&_.conflict){let g={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(g);let w=r(oa(i,u,g.order),a);s(g,w);let x=await t("ui-order-set",{expected_revision:g.revision,entries:w});x&&x.applied&&n.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function zs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function la(e,t){return!t||typeof e!="string"||e.length===0||zs(t.visible_labels).includes(e)?!0:zs(t.hidden_labels).includes(e)?!1:!zs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Pl(e,t){return zs(e).filter(n=>la(n,t))}function Nn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function uf(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function df(e,t,n,r,s){return l`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function pf(e,t,n,r){return l`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${uf(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Hs(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(xl):a;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?df(t.parent_id,e.count,n,r,t.onToggle):l`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?l`<div class="board-card__roll-list">
            ${i.map((u,d)=>pf(u,d+1,t.childChips?t.childChips(u):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var ff={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Nl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Dl={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},_f={review:"\u2713",skip:"\u2298"},qn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function mf(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function ql(e){let t=e&&e.fill||"none";return t==="none"?qn.none:e&&e.stale===!0?qn.stale:t==="dim"?qn.dim:e&&e.glyph==="review"?qn.review:e&&e.glyph==="skip"?qn.skip:qn.done}function gf(e){if(!e||e.fill==="none"||!e.approval_state)return ql(e);let t=[];return e.glyph==="review"?t.push(qn.review):e.glyph==="skip"&&t.push(qn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function hf(e,t,n){let r=ff[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=_f[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${r} dim`:s==="full"&&(i+=` b-${r} full`),o&&(i+=" stale"),n&&(i+=" cur");let u=s==="none"?"lbl":`lbl l-${r} on`,d=n?`color: var(--stage-${r}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${u}>
        ${Nl[e]||e}
      </div>
    </div>
  `}function Gs(e,t){if(!e||!e.stages)return"";let n=Dl[e.route]||Dl.spec_backed,r=e.stages,s=mf(n,r,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(a=>`${Nl[a]||a} ${a==="plan"?gf(r[a]||{}):ql(r[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${n.map(a=>hf(a,r[a]||{},a===s))}
    </div>
  `}function bf(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Fl=2;function yf(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,Fl).join(", "),s=n.length-Fl,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function ca(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Vs(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function xn(e){return`${e.kind}:${Vs(e)}@${e.sha}`}function Ks(e,t){if(!e)return null;let n=ca(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=ca(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,u=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,d=t?` \xB7 exec_receipt ${xn(t)}`:"";return{kind:e.kind,label:i,title:`${u}${d}`}}function jl(e,t){let n=Ks(e,t);return n?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function vf(e){if(!e)return null;let t=ca(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${xn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function wf(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Nn(n,"route")){let i=r.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Nn(n,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Nn(n,"pr")){let i=r.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=jl(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${xn(i)}`}
        >${`exec ${i.kind==="delegated"?Vs(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of Pl(e.labels,n))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Nn(n,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Nn(n,"blocked")&&s.push(...yf(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Nn(n,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function kf(e){let t=tn(e.created_at),n=tn(e.updated_at);return!t&&!n?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${zt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?l`<span class="board-card__time-sep">·</span>`:""}
    ${n?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${zt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function $f(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Hs(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:kf(e),empty_label:"children \uC5C6\uC74C",childChips:ua,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function ua(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Ks(t,n)?l`<span class="board-card__roll-child-chips">
    ${jl(t,n)}
    ${vf(n)}
  </span>`:null}function Ys(e,t){let n=bf(e.priority);return l`
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
      ${wf(e,t)}
      ${e.workflow&&Nn(t.policy||null,"stepper")?Gs(e.workflow,e.status):""}
      ${$f(e,t)}
    </article>
  `}function br(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return l`
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
              ${Dn.map(o=>l`<option
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
        ${e.items.map(o=>Ys(o,t))}
      </div>
    </section>
  `}function Bl(e,t,n){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Ys(r,t))}
        </div>
      </div>
    </dialog>
  `}var xf=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Af=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Sf=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Ef(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return l`
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
  `}function Ul(e,t,n){return l`
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
        ${xf.map(r=>l`<option
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
        ${Af.map(r=>l`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Ef(e,t,n)}
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
        ${Sf.map(r=>l`<option
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
  `}var Tf=200,Cf={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Rf=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Wl="beads-ui.board.sort",zl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function If(){try{let e=window.localStorage.getItem(Wl);if(e&&zl.has(e))return e}catch{}return"created_desc"}function Hl(e,t){let n=At("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,u=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,_=t.closedRange||en,g=s?Fs(s,a):null,w=Ws({transport:o,uiOrderStore:a}),x=[],P=[],B=[],H=[],Q=[],D=[],M=!1,N=0,j=If(),E=new Map,I=new Map,Y=new Map,$e=new Set,ie={search:"",priority:"",type:"",labels:[]},_e=!1,X=null;function Ie(G){return String(G.status||"open")==="open"}function ye(G){let pe=String(G.status||"open");return pe==="open"||pe==="blocked"}function ne(G){let pe=ie.search.trim().toLowerCase(),Me=ie.priority,S=ie.type,L=ie.labels;return G.filter(k=>{if(pe){let O=String(k.id||"").toLowerCase(),ae=String(k.title||"").toLowerCase();if(!O.includes(pe)&&!ae.includes(pe))return!1}if(Me!==""&&String(k.priority)!==Me||S!==""&&String(k.issue_type||"")!==S)return!1;if(L.length>0){let O=Array.isArray(k.labels)?k.labels:[];if(!L.some(ae=>O.includes(ae)))return!1}return!0})}function se(){let G=new Set;for(let pe of[x,P,B,H,Q,D])for(let Me of pe){let S=Array.isArray(Me.labels)?Me.labels:[];for(let L of S)typeof L=="string"&&L.length>0&&G.add(L)}return Array.from(G).sort()}function Te(){return ie.search.trim()!==""||ie.priority!==""||ie.type!==""||ie.labels.length>0}function q(){try{if(g){let G=g.selectBoardColumn("tab:board:in-progress","in_progress",j),pe=g.selectBoardColumn("tab:board:blocked","blocked",j).filter(ye),Me=new Set(G.map(he=>he.id)),S=g.selectBoardColumn("tab:board:ready","ready",j).filter(he=>Ie(he)&&!Me.has(he.id)),L=g.selectBoardColumn("tab:board:resolved","resolved",j),k=g.selectBoardColumn("tab:board:deferred","deferred",j),O=g.selectBoardColumn("tab:board:closed","closed").slice(0,Tf),ae=[...pe,...S,...G,...L,...O];oe(ae);let le=new Set;for(let he of ae)he&&he.id&&!js(he)&&le.add(he.id);let te=!Te();x=te?Wr(pe,le):pe,P=te?Wr(S,le):S,B=te?Wr(G,le):G,H=te?Wr(L,le):L,Q=k,N=k.length,D=te?Wr(O,le):O,E=new Map;for(let he of x)E.set(he.id,"open");for(let he of P)E.set(he.id,"open");for(let he of B)E.set(he.id,"in_progress");for(let he of H)E.set(he.id,"resolved");for(let he of Q)E.set(he.id,"deferred");for(let he of D)E.set(he.id,"closed");I=new Map;for(let he of x)I.set(he.id,"blocked-col");for(let he of P)I.set(he.id,"ready-col");for(let he of B)I.set(he.id,"in-progress-col");for(let he of H)I.set(he.id,"resolved-col");for(let he of D)I.set(he.id,"closed-col")}Qe()}catch{x=[],P=[],B=[],H=[],Q=[],D=[],Y=new Map,Qe()}}function oe(G){Y=Bs(G)}function re(G){return Us(Y,G)}function xe(G){return!$e.has(G)}function we(G,pe){G.preventDefault(),G.stopPropagation(),$e.has(pe)?$e.delete(pe):$e.add(pe),Qe()}function Oe(G,pe){G.preventDefault(),G.stopPropagation(),r(pe)}function be(G,pe){G.preventDefault(),G.stopPropagation(),r(pe)}function Xe(G,pe){X||r(pe)}function pt(G,pe){G.preventDefault(),G.stopPropagation(),Of(pe).then(Me=>{Me&&ue("\uBCF5\uC0AC\uB428","success",1200)})}function C(G,pe){X=pe,G.dataTransfer&&(G.dataTransfer.setData("text/plain",pe),G.dataTransfer.effectAllowed="move"),G.target.classList.add("board-card--dragging")}function fe(G){G.target.classList.remove("board-card--dragging"),_t(),setTimeout(()=>{X=null},0)}function ke(G){let pe=String(G.target.value||"");!pe||pe===_||(_=pe,d&&d(pe),Qe())}function Ce(){return i?i.get():null}function qe(G){let pe=u?u.get():null,Me=pe?pe.cleanup_failed:null;if(!Me||typeof Me!="object"||Array.isArray(Me))return null;let S=Me[G];return!S||typeof S!="object"||Array.isArray(S)?null:S}let Be={onCardClick:Xe,onCopyId:pt,onDragStart:C,onDragEnd:fe,onClosedRangeChange:ke,rollupFor:re,isExpanded:xe,onRollupToggle:we,onChildClick:Oe,onFromChipClick:be,cleanupFailureFor:qe,get policy(){return Ce()}};function W(G,pe){X||(ee(),r(pe))}function V(G,pe){G.preventDefault(),G.stopPropagation(),ee(),r(pe)}let Ae={...Be,onCardClick:W,onChildClick:V,onFromChipClick:V,get policy(){return Ce()}};function Ve(G){let pe=G.target,Me=e.querySelector(".board-filter__labels");pe&&Me&&Me.contains(pe)||R()}function We(G){G.key==="Escape"&&R()}function de(){_e||(_e=!0,document.addEventListener("mousedown",Ve),document.addEventListener("keydown",We),Qe())}function R(){_e&&(_e=!1,document.removeEventListener("mousedown",Ve),document.removeEventListener("keydown",We),Qe())}function Z(G){G.key==="Escape"&&ee()}function ge(){M||(M=!0,document.addEventListener("keydown",Z),Qe())}function ee(){M&&(M=!1,document.removeEventListener("keydown",Z),Qe())}let Le={onClose:ee,onOverlayClick(G){G.target===G.currentTarget&&ee()}},tt={onSearchInput(G){ie.search=String(G.target.value||""),q()},onPriorityChange(G){ie.priority=String(G.target.value||""),q()},onTypeChange(G){ie.type=String(G.target.value||""),q()},onSortChange(G){let pe=String(G.target.value||"");if(!(!zl.has(pe)||pe===j)){j=pe;try{window.localStorage.setItem(Wl,pe)}catch{}q()}},onDeferredToggle(){M?ee():ge()},onLabelMenuToggle(){_e?R():de()},onLabelToggle(G){let pe=ie.labels.indexOf(G);pe===-1?ie.labels.push(G):ie.labels.splice(pe,1),q()},onLabelClear(){ie.labels.length!==0&&(ie.labels=[],q())},onNewIssue(){p&&p()}};function rt(){return l`
      <div class="board-view">
        ${Ul(ie,tt,{sort_mode:j,deferred_popup_open:M,deferred_count:N,label_options:se(),label_menu_open:_e})}
        <div class="board-root">
          ${br({title:"Blocked",id:"blocked-col",items:ne(x)},Be)}
          ${br({title:"Ready",id:"ready-col",items:ne(P)},Be)}
          ${br({title:"In progress",id:"in-progress-col",items:ne(B)},Be)}
          ${br({title:"Resolved",id:"resolved-col",items:ne(H)},Be)}
          ${br({title:"Closed",id:"closed-col",items:ne(D),is_closed:!0,closed_range:_},Be)}
        </div>
        ${M?Bl({items:ne(Q),count:N},Ae,Le):""}
      </div>
    `}function Qe(){Ge(rt(),e),ft()}function ft(){try{let G=e.querySelector("#deferred-popup");G&&!G.open&&(typeof G.showModal=="function"?G.showModal():G.setAttribute("open",""));let pe=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Me of pe)Array.from(Me.querySelectorAll(".board-card")).forEach((L,k)=>{L.tabIndex=k===0?0:-1})}catch{}}async function ht(G,pe){if(!o){ue("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:G,status:pe}),ue("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Me){n("update-status failed: %o",Me),ue("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ut(G){switch(G){case"blocked-col":return x;case"ready-col":return P;case"in-progress-col":return B;case"resolved-col":return H;default:return[]}}function lt(G,pe,Me){if(!o||!a)return;let S=ut(G),L=S.find(te=>te.id===pe);if(!L)return;let k=S.filter(te=>te.id!==pe),O=Me.closest?Me.closest(".board-card"):null,ae=k.length;if(O){let te=O.getAttribute("data-issue-id");if(te===pe)return;let he=k.findIndex(at=>at.id===te);he>=0&&(ae=he)}let le=k.slice();le.splice(ae,0,L),w.applyReorder(pe,le,ae)}function _t(){for(let G of Array.from(e.querySelectorAll(".board-column--drag-over")))G.classList.remove("board-column--drag-over")}let Ue=null;e.addEventListener("dragover",G=>{G.preventDefault(),G.dataTransfer&&(G.dataTransfer.dropEffect="move");let Me=G.target.closest(".board-column");Me&&Me!==Ue&&(Ue&&Ue.classList.remove("board-column--drag-over"),Me.classList.add("board-column--drag-over"),Ue=Me)}),e.addEventListener("dragleave",G=>{let pe=G.relatedTarget;(!pe||!e.contains(pe))&&Ue&&(Ue.classList.remove("board-column--drag-over"),Ue=null)}),e.addEventListener("drop",G=>{G.preventDefault(),Ue&&(Ue.classList.remove("board-column--drag-over"),Ue=null);let pe=G.target,Me=pe.closest(".board-column");if(!Me)return;let S=G.dataTransfer?.getData("text/plain")||"";if(!S)return;let L=Me.id,k=I.get(S);if(k&&k===L){if(Rf.has(L)){if(j!=="manual"){ue("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}lt(L,S,pe)}return}let O=Cf[L];if(!O){ue("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}E.get(S)!==O&&ht(S,O)}),e.addEventListener("keydown",G=>{let pe=G.target;if(!(pe instanceof HTMLElement))return;let Me=String(pe.tagName||"").toLowerCase();if(Me==="input"||Me==="textarea"||Me==="select"||Me==="button"||Me==="a"||pe.isContentEditable===!0)return;let S=pe.closest(".board-card");if(!S)return;let L=String(G.key||"");if(L==="Enter"||L===" "){G.preventDefault();let le=S.getAttribute("data-issue-id");le&&r(le);return}if(L!=="ArrowUp"&&L!=="ArrowDown"&&L!=="ArrowLeft"&&L!=="ArrowRight")return;G.preventDefault();let k=S.closest(".board-column");if(!k)return;let O=Array.from(k.querySelectorAll(".board-card")),ae=O.indexOf(S);if(L==="ArrowDown"&&ae<O.length-1){De(S,O[ae+1]);return}if(L==="ArrowUp"&&ae>0){De(S,O[ae-1]);return}if(L==="ArrowLeft"||L==="ArrowRight"){let le=Array.from(e.querySelectorAll(".board-column")),te=le.indexOf(k),he=L==="ArrowRight"?1:-1,at=te+he;for(;at>=0&&at<le.length;){let Ke=le[at].querySelector(".board-card");if(Ke){De(S,Ke);return}at+=he}}});function De(G,pe){try{G.tabIndex=-1,pe.tabIndex=0,pe.focus()}catch{}}let Fe=null;g&&g.subscribe&&(Fe=g.subscribe(()=>{try{q()}catch{}}));let mt=null;i&&i.subscribe&&(mt=i.subscribe(()=>{try{q()}catch{}}));let ct=null;return u&&u.subscribe&&(ct=u.subscribe(()=>{Qe()})),{async load(){n("load"),q()},clear(){R(),ee(),Fe&&(Fe(),Fe=null),mt&&(mt(),mt=null),ct&&(ct(),ct=null),e.replaceChildren(),x=[],P=[],B=[],H=[],Q=[],D=[],E=new Map,I=new Map}}}function Wr(e,t){return e.filter(n=>{let r=js(n);return!(r&&t.has(r))})}async function Of(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function nn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function nr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function zr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Lf(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${nr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${nr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(u=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),u(p)};r.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function An(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await Lf(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var Mf=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Gl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Pf=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Pt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function St(e){return typeof e=="string"&&e.length>0?e:null}function yr(e){return e.startsWith("gpt-")?e.slice(4):e}function wt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Kl(e,t,n){let r=St(t[e]);if(r!==null)return{value:r,source:"pin"};let s=St(n[e]);return s===null?null:{value:s,source:"global"}}function Hr(e,t,n,r){return Kl(e,t,n)||{value:r,source:"base"}}function da(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Pt(s?.[t])){let a=St(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Pt(s)){for(let a of Object.values(s))if(Pt(a)){let i=St(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return St(r?.runners?.[o]?.models?.[e]?.id)||e}function Df(e,t){return St(t?.review?.reviewers?.[e]?.model)||e}function vr(e,t,n=!1){if(e==="default")return wt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?yr(e):e;return wt(e,t,r,e,"explicit")}function Yl(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Pt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(Pt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function Nf(e,t){let n=[],r=e?.implementation?.model_catalog;Pt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Pt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function qf(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of Nf(t,n)){let o=Yl(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function pa(e){return wt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Vl(e,t,n){let r=Kl(e,t,n);return r?vr(r.value,r.source):wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Zt(e){let t=Pt(e.pin)?e.pin:{},n=Pt(e.global)?e.global:{},r=Pt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Pt(r.session)?r.session:null,o=r?.supported===!0&&Pt(r.orchestration)?r.orchestration:null,a=Pt(e.runner_catalog)?e.runner_catalog:null,i=St(n.quick_fix_impl_model),u=qf(i,s,a),d={};if(s){let p=Hr("workflow_mode",t,n,St(s.workflow_mode_default));d.workflow_mode=p.source==="base"?wt(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):vr(p.value,p.source);for(let D of["spec_review","plan_review","impl_review"]){let M=`${D}_model`,N=St(D==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),j=Hr(M,t,n,N);if(j.value===null)d[M]=wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(j.value!=="self"&&j.value!=="skip"&&!Pt(s.review?.reviewers?.[j.value]))d[M]=pa(wt(j.value,j.source,"",null,"explicit"));else{let E=Df(j.value,s);d[M]=wt(j.value,j.source,yr(E),E,j.source==="base"?"default":"explicit")}}for(let[D,M]of Object.entries(Gl)){let N=d[M].value;if(N==="self"||N==="skip"){d[D]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let j=St(s.review?.reviewers?.[N||""]?.effort),E=Hr(D,t,n,j);d[D]=E.value===null?wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):wt(E.value,E.source,E.value,E.value,E.source==="base"?"default":"explicit")}let _=Pt(s.implementation?.default)?s.implementation.default:{},g=St(e.route),w=g!==null&&["quick_fix","spec_backed","full_plan"].includes(g),x=Pt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},P=w&&Pt(x[g])?x[g]:{};for(let D of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let M=Hr(D,t,n,D==="impl_dispatch"?St(P.dispatch)||St(_.dispatch):St(_[D.replace("impl_","")]));d[D]=M.value===null?wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):wt(M.value,M.source,M.value,M.value,M.source==="base"?"default":"explicit")}let B=St(t.impl_runtime),H=B==="inherit"?St(e.controller_runtime):B,Q=g==="quick_fix"&&St(t.impl_dispatch)===null&&u.runtime!==null&&(B===null||H===u.runtime);if(Q){let D=u.runtime,M=i;d.impl_dispatch=wt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(d.impl_runtime=wt(D,"global",`${D} (\uC720\uB3C4)`,D,"explicit")),St(t.impl_model)===null&&(d.impl_model=wt(M,"global",M,M,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let D of["impl_runtime","impl_model","impl_effort","impl_speed"])d[D]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!Q&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let D=d.impl_runtime.value==="inherit"?St(e.controller_runtime):d.impl_runtime.value,M=D?Yl(D,s,a):[];if(d.impl_model.value!=="auto"&&M.length>0&&!M.includes(d.impl_model.value))d.impl_model=pa(d.impl_model);else{let N=da(d.impl_model.value,D,s,a);d.impl_model.display=yr(N),d.impl_model.full_value=N}}if(d.impl_effort.value==="auto"){let D=St(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),M=D?St(s.implementation?.effort_by_transport?.[D]?.auto):null;M&&!Pf.has(M)?(d.impl_effort.display=`${M} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=M,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?wt("default","base","default (\uC77C\uBC18)","default","default"):vr("default",d.impl_speed.source))}}else for(let p of Mf.filter(_=>!_.startsWith("orchestration_")))d[p]=Vl(p,t,n);if(!s){for(let[p,_]of Object.entries(Gl))(d[_].value==="self"||d[_].value==="skip")&&(d[p]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])d[p]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[p]=Vl(p,t,n);continue}let _=p.replace("orchestration_",""),g=St(o[_]),w=Hr(p,t,n,g);if(p==="orchestration_effort"&&w.source==="base"){d[p]=wt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(w.value===null){d[p]=wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let x=w.source==="base"?St(o.model_id)||w.value:da(w.value,null,s,a);d[p]=wt(w.value,w.source,yr(x),x,w.source==="base"?"default":"explicit");continue}if(w.value==="default"){d[p]=w.source==="base"?wt("default","base","default (\uC77C\uBC18)","default","default"):vr("default",w.source);continue}d[p]=vr(w.value,w.source)}if(s)if(i===null){let p=d.orchestration_model.full_value;d.quick_fix_impl_model=wt(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${yr(p)})`,null,"default")}else if(u.runtime!==null){let p=da(i,u.runtime,s,a);d.quick_fix_impl_model=wt(i,"global",yr(p),p,"explicit")}else u.offered?d.quick_fix_impl_model=pa(wt(i,"global","",null,"explicit")):d.quick_fix_impl_model=vr(i,"global");return d}function Ff(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Zs(e){let t=Pt(e.pin)?e.pin:{},n=Pt(e.global)?e.global:{},r=Pt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=_=>{let g={...r,..._};return Zt({pin:e.layer==="pin"?g:t,global:e.layer==="pin"?n:g,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],u=s(o)[e.key],d=St(o[e.key]),p=[...e.choices];return d!==null&&!p.includes(d)&&p.unshift(d),{unset_label:Ff(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:u?.resolution==="not_applicable",options:p.map(_=>{let g=s({...o,[e.key]:_})[e.key];return{value:_,label:g.display,full_value:g.full_value}})}}function wr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let u=!1,d=_=>{u||(u=!0,typeof t.close=="function"&&t.close(),t.remove(),i(_))},p=()=>d(r.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),r.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),p())}),t.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var ec="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Sn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Gr=[...Sn,"reasoning_output_tokens"],jf={codex:["implementation","review-consult"],claude:["subagent"]};function fa(e){let t=0;for(let n of Sn)t+=Ft(e?.[n]);return t}function Bf(e){return!e||typeof e!="object"?!1:Sn.some(t=>Number.isFinite(e[t]))}function Zl(e){return!e||typeof e!="object"?!1:Gr.some(t=>Number.isFinite(e[t]))}function Uf(e){let t={};for(let n of Gr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Ql(e){let t={};for(let n of Gr)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Xl(e,t){return e==="codex"?Ft(t.input_tokens)+Ft(t.output_tokens):fa(t)}function Wf(e){return e==="claude"?"Claude":"Codex"}function zf(e){return`\u03C4 ${tc(e)}`}function Hf(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${Ft(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${Ft(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(ec),o.join(`
`)}function Ut(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Wf(n)} ${zf(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Hf(n,r)})}return t}function Xs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let u of Gr)Number.isFinite(a.breakdown[u])&&(i.breakdown[u]=Ft(i.breakdown[u])+Ft(a.breakdown[u]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function _a(e){return!e||typeof e!="object"?null:ln({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Gf(e){return e==="codex"?"codex":"claude"}function vn(){return{subtotal:0,breakdown:Uf(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Qs(e,t,n){e.subtotal+=t.subtotal;for(let r of Gr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ft(e.breakdown[r])+Ft(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Jl(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function tc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function kr(e){return Bf(e)?`\u03C4 ${tc(fa(e))}`:null}function En(e){let t=kr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Vr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${fa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ec),n.join(`
`)}function ln(e,t){let n={claude:vn(),codex:vn()},r={orchestrator:{claude:vn(),codex:vn()},implementation:{claude:vn(),codex:vn()},"review-consult":{claude:vn(),codex:vn()},subagent:{claude:vn(),codex:vn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let u=i.usage;if(Zl(u)){let p=Gf(i.runner),_=Ql(u),g={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:Xl(p,_)};_.replayed===!0&&(g.replayed=!0),typeof i.model=="string"&&(g.model=i.model),typeof i.session_id=="string"&&(g.session_id=i.session_id),Qs(n[p],g,!0),Qs(r.orchestrator[p],g,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){let _=p&&p.provider==="claude"?"claude":"codex";if(!p||p.provider!=="codex"&&p.provider!=="claude"||!jf[_].includes(p.role)||!Zl(p.usage))continue;let g=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!g||s.has(g))continue;s.add(g);let w=Ql(p.usage),x={provider:_,role:p.role,attempt_id:String(i.attempt_id||""),usage:w,subtotal:Xl(_,w)};x.receipt_id=g,typeof p.agent_type=="string"&&(x.agent_type=p.agent_type),typeof p.agent_id=="string"&&(x.agent_id=p.agent_id),typeof p.model=="string"&&(x.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(x.effort=p.effort),typeof p.session_id=="string"?x.session_id=p.session_id:typeof p.thread_id=="string"&&(x.session_id=p.thread_id),typeof p.turn_id=="string"&&(x.turn_id=p.turn_id),(typeof p.completed_at=="string"||typeof p.completed_at=="number"&&Number.isFinite(p.completed_at))&&(x.completed_at=p.completed_at),w.replayed===!0&&(x.replayed=!0),Qs(n[_],x,!1),Qs(r[x.role][_],x,!1)}}let o={};for(let i of["claude","codex"]){let u=n[i];if(u.legs.length===0)continue;let d=Jl(u,!1);i==="claude"&&u.outer_count>0&&u.outer_cost_count===u.outer_count&&(d.total_cost_usd=u.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let u={};for(let d of["claude","codex"]){let p=r[i][d];p.legs.length>0&&(u[d]={...Jl(p,!0),legs:p.legs})}Object.keys(u).length>0&&(a[i]=u)}return{providers:o,roles:a}}var{entries:uc,setPrototypeOf:nc,isFrozen:Vf,getPrototypeOf:Kf,getOwnPropertyDescriptor:Yf}=Object,{freeze:Gt,seal:cn,create:wa}=Object,{apply:ka,construct:$a}=typeof Reflect<"u"&&Reflect;Gt||(Gt=function(t){return t});cn||(cn=function(t){return t});ka||(ka=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});$a||($a=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var Js=Vt(Array.prototype.forEach),Zf=Vt(Array.prototype.lastIndexOf),rc=Vt(Array.prototype.pop),Kr=Vt(Array.prototype.push),Qf=Vt(Array.prototype.splice),to=Vt(String.prototype.toLowerCase),ma=Vt(String.prototype.toString),ga=Vt(String.prototype.match),Yr=Vt(String.prototype.replace),Xf=Vt(String.prototype.indexOf),Jf=Vt(String.prototype.trim),_n=Vt(Object.prototype.hasOwnProperty),Ht=Vt(RegExp.prototype.test),Zr=e_(TypeError);function Vt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return ka(e,t,r)}}function e_(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return $a(e,n)}}function nt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:to;nc&&nc(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(Vf(t)||(t[r]=o),s=o)}e[s]=!0}return e}function t_(e){for(let t=0;t<e.length;t++)_n(e,t)||(e[t]=null);return e}function Tn(e){let t=wa(null);for(let[n,r]of uc(e))_n(e,n)&&(Array.isArray(r)?t[n]=t_(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Tn(r):t[n]=r);return t}function Qr(e,t){for(;e!==null;){let r=Yf(e,t);if(r){if(r.get)return Vt(r.get);if(typeof r.value=="function")return Vt(r.value)}e=Kf(e)}function n(){return null}return n}var sc=Gt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ha=Gt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ba=Gt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),n_=Gt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ya=Gt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),r_=Gt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),oc=Gt(["#text"]),ac=Gt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),va=Gt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ic=Gt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),eo=Gt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),s_=cn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),o_=cn(/<%[\w\W]*|[\w\W]*%>/gm),a_=cn(/\$\{[\w\W]*/gm),i_=cn(/^data-[\-\w.\u00B7-\uFFFF]+$/),l_=cn(/^aria-[\-\w]+$/),dc=cn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),c_=cn(/^(?:\w+script|data):/i),u_=cn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),pc=cn(/^html$/i),d_=cn(/^[a-z][.\w]*(-[.\w]+)+$/i),lc=Object.freeze({__proto__:null,ARIA_ATTR:l_,ATTR_WHITESPACE:u_,CUSTOM_ELEMENT:d_,DATA_ATTR:i_,DOCTYPE_NAME:pc,ERB_EXPR:o_,IS_ALLOWED_URI:dc,IS_SCRIPT_OR_DATA:c_,MUSTACHE_EXPR:s_,TMPLIT_EXPR:a_}),Xr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},p_=function(){return typeof window>"u"?null:window},f_=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},cc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function fc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:p_(),t=Pe=>fc(Pe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Xr.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:u,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:g,trustedTypes:w}=e,x=u.prototype,P=Qr(x,"cloneNode"),B=Qr(x,"remove"),H=Qr(x,"nextSibling"),Q=Qr(x,"childNodes"),D=Qr(x,"parentNode");if(typeof a=="function"){let Pe=n.createElement("template");Pe.content&&Pe.content.ownerDocument&&(n=Pe.content.ownerDocument)}let M,N="",{implementation:j,createNodeIterator:E,createDocumentFragment:I,getElementsByTagName:Y}=n,{importNode:$e}=r,ie=cc();t.isSupported=typeof uc=="function"&&typeof D=="function"&&j&&j.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:_e,ERB_EXPR:X,TMPLIT_EXPR:Ie,DATA_ATTR:ye,ARIA_ATTR:ne,IS_SCRIPT_OR_DATA:se,ATTR_WHITESPACE:Te,CUSTOM_ELEMENT:q}=lc,{IS_ALLOWED_URI:oe}=lc,re=null,xe=nt({},[...sc,...ha,...ba,...ya,...oc]),we=null,Oe=nt({},[...ac,...va,...ic,...eo]),be=Object.seal(wa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Xe=null,pt=null,C=Object.seal(wa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),fe=!0,ke=!0,Ce=!1,qe=!0,Be=!1,W=!0,V=!1,Ae=!1,Ve=!1,We=!1,de=!1,R=!1,Z=!0,ge=!1,ee="user-content-",Le=!0,tt=!1,rt={},Qe=null,ft=nt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ht=null,ut=nt({},["audio","video","img","source","image","track"]),lt=null,_t=nt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ue="http://www.w3.org/1998/Math/MathML",De="http://www.w3.org/2000/svg",Fe="http://www.w3.org/1999/xhtml",mt=Fe,ct=!1,G=null,pe=nt({},[Ue,De,Fe],ma),Me=nt({},["mi","mo","mn","ms","mtext"]),S=nt({},["annotation-xml"]),L=nt({},["title","style","font","a","script"]),k=null,O=["application/xhtml+xml","text/html"],ae="text/html",le=null,te=null,he=n.createElement("form"),at=function(T){return T instanceof RegExp||T instanceof Function},Ke=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(te&&te===T)){if((!T||typeof T!="object")&&(T={}),T=Tn(T),k=O.indexOf(T.PARSER_MEDIA_TYPE)===-1?ae:T.PARSER_MEDIA_TYPE,le=k==="application/xhtml+xml"?ma:to,re=_n(T,"ALLOWED_TAGS")?nt({},T.ALLOWED_TAGS,le):xe,we=_n(T,"ALLOWED_ATTR")?nt({},T.ALLOWED_ATTR,le):Oe,G=_n(T,"ALLOWED_NAMESPACES")?nt({},T.ALLOWED_NAMESPACES,ma):pe,lt=_n(T,"ADD_URI_SAFE_ATTR")?nt(Tn(_t),T.ADD_URI_SAFE_ATTR,le):_t,ht=_n(T,"ADD_DATA_URI_TAGS")?nt(Tn(ut),T.ADD_DATA_URI_TAGS,le):ut,Qe=_n(T,"FORBID_CONTENTS")?nt({},T.FORBID_CONTENTS,le):ft,Xe=_n(T,"FORBID_TAGS")?nt({},T.FORBID_TAGS,le):Tn({}),pt=_n(T,"FORBID_ATTR")?nt({},T.FORBID_ATTR,le):Tn({}),rt=_n(T,"USE_PROFILES")?T.USE_PROFILES:!1,fe=T.ALLOW_ARIA_ATTR!==!1,ke=T.ALLOW_DATA_ATTR!==!1,Ce=T.ALLOW_UNKNOWN_PROTOCOLS||!1,qe=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Be=T.SAFE_FOR_TEMPLATES||!1,W=T.SAFE_FOR_XML!==!1,V=T.WHOLE_DOCUMENT||!1,We=T.RETURN_DOM||!1,de=T.RETURN_DOM_FRAGMENT||!1,R=T.RETURN_TRUSTED_TYPE||!1,Ve=T.FORCE_BODY||!1,Z=T.SANITIZE_DOM!==!1,ge=T.SANITIZE_NAMED_PROPS||!1,Le=T.KEEP_CONTENT!==!1,tt=T.IN_PLACE||!1,oe=T.ALLOWED_URI_REGEXP||dc,mt=T.NAMESPACE||Fe,Me=T.MATHML_TEXT_INTEGRATION_POINTS||Me,S=T.HTML_INTEGRATION_POINTS||S,be=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&at(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&at(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Be&&(ke=!1),de&&(We=!0),rt&&(re=nt({},oc),we=[],rt.html===!0&&(nt(re,sc),nt(we,ac)),rt.svg===!0&&(nt(re,ha),nt(we,va),nt(we,eo)),rt.svgFilters===!0&&(nt(re,ba),nt(we,va),nt(we,eo)),rt.mathMl===!0&&(nt(re,ya),nt(we,ic),nt(we,eo))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?C.tagCheck=T.ADD_TAGS:(re===xe&&(re=Tn(re)),nt(re,T.ADD_TAGS,le))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?C.attributeCheck=T.ADD_ATTR:(we===Oe&&(we=Tn(we)),nt(we,T.ADD_ATTR,le))),T.ADD_URI_SAFE_ATTR&&nt(lt,T.ADD_URI_SAFE_ATTR,le),T.FORBID_CONTENTS&&(Qe===ft&&(Qe=Tn(Qe)),nt(Qe,T.FORBID_CONTENTS,le)),Le&&(re["#text"]=!0),V&&nt(re,["html","head","body"]),re.table&&(nt(re,["tbody"]),delete Xe.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw Zr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Zr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=T.TRUSTED_TYPES_POLICY,N=M.createHTML("")}else M===void 0&&(M=f_(w,s)),M!==null&&typeof N=="string"&&(N=M.createHTML(""));Gt&&Gt(T),te=T}},He=nt({},[...ha,...ba,...n_]),bt=nt({},[...ya,...r_]),$t=function(T){let ce=D(T);(!ce||!ce.tagName)&&(ce={namespaceURI:mt,tagName:"template"});let Se=to(T.tagName),it=to(ce.tagName);return G[T.namespaceURI]?T.namespaceURI===De?ce.namespaceURI===Fe?Se==="svg":ce.namespaceURI===Ue?Se==="svg"&&(it==="annotation-xml"||Me[it]):!!He[Se]:T.namespaceURI===Ue?ce.namespaceURI===Fe?Se==="math":ce.namespaceURI===De?Se==="math"&&S[it]:!!bt[Se]:T.namespaceURI===Fe?ce.namespaceURI===De&&!S[it]||ce.namespaceURI===Ue&&!Me[it]?!1:!bt[Se]&&(L[Se]||!He[Se]):!!(k==="application/xhtml+xml"&&G[T.namespaceURI]):!1},Ne=function(T){Kr(t.removed,{element:T});try{D(T).removeChild(T)}catch{B(T)}},Et=function(T,ce){try{Kr(t.removed,{attribute:ce.getAttributeNode(T),from:ce})}catch{Kr(t.removed,{attribute:null,from:ce})}if(ce.removeAttribute(T),T==="is")if(We||de)try{Ne(ce)}catch{}else try{ce.setAttribute(T,"")}catch{}},jt=function(T){let ce=null,Se=null;if(Ve)T="<remove></remove>"+T;else{let y=ga(T,/^[\r\n\t ]+/);Se=y&&y[0]}k==="application/xhtml+xml"&&mt===Fe&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let it=M?M.createHTML(T):T;if(mt===Fe)try{ce=new g().parseFromString(it,k)}catch{}if(!ce||!ce.documentElement){ce=j.createDocument(mt,"template",null);try{ce.documentElement.innerHTML=ct?N:it}catch{}}let Ct=ce.body||ce.documentElement;return T&&Se&&Ct.insertBefore(n.createTextNode(Se),Ct.childNodes[0]||null),mt===Fe?Y.call(ce,V?"html":"body")[0]:V?ce.documentElement:Ct},Nt=function(T){return E.call(T.ownerDocument||T,T,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Mt=function(T){return T instanceof _&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof p)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},qt=function(T){return typeof i=="function"&&T instanceof i};function Tt(Pe,T,ce){Js(Pe,Se=>{Se.call(t,T,ce,te)})}let Ot=function(T){let ce=null;if(Tt(ie.beforeSanitizeElements,T,null),Mt(T))return Ne(T),!0;let Se=le(T.nodeName);if(Tt(ie.uponSanitizeElement,T,{tagName:Se,allowedTags:re}),W&&T.hasChildNodes()&&!qt(T.firstElementChild)&&Ht(/<[/\w!]/g,T.innerHTML)&&Ht(/<[/\w!]/g,T.textContent)||T.nodeType===Xr.progressingInstruction||W&&T.nodeType===Xr.comment&&Ht(/<[/\w]/g,T.data))return Ne(T),!0;if(!(C.tagCheck instanceof Function&&C.tagCheck(Se))&&(!re[Se]||Xe[Se])){if(!Xe[Se]&&Xt(Se)&&(be.tagNameCheck instanceof RegExp&&Ht(be.tagNameCheck,Se)||be.tagNameCheck instanceof Function&&be.tagNameCheck(Se)))return!1;if(Le&&!Qe[Se]){let it=D(T)||T.parentNode,Ct=Q(T)||T.childNodes;if(Ct&&it){let y=Ct.length;for(let b=y-1;b>=0;--b){let c=P(Ct[b],!0);c.__removalCount=(T.__removalCount||0)+1,it.insertBefore(c,H(T))}}}return Ne(T),!0}return T instanceof u&&!$t(T)||(Se==="noscript"||Se==="noembed"||Se==="noframes")&&Ht(/<\/no(script|embed|frames)/i,T.innerHTML)?(Ne(T),!0):(Be&&T.nodeType===Xr.text&&(ce=T.textContent,Js([_e,X,Ie],it=>{ce=Yr(ce,it," ")}),T.textContent!==ce&&(Kr(t.removed,{element:T.cloneNode()}),T.textContent=ce)),Tt(ie.afterSanitizeElements,T,null),!1)},Bt=function(T,ce,Se){if(Z&&(ce==="id"||ce==="name")&&(Se in n||Se in he))return!1;if(!(ke&&!pt[ce]&&Ht(ye,ce))){if(!(fe&&Ht(ne,ce))){if(!(C.attributeCheck instanceof Function&&C.attributeCheck(ce,T))){if(!we[ce]||pt[ce]){if(!(Xt(T)&&(be.tagNameCheck instanceof RegExp&&Ht(be.tagNameCheck,T)||be.tagNameCheck instanceof Function&&be.tagNameCheck(T))&&(be.attributeNameCheck instanceof RegExp&&Ht(be.attributeNameCheck,ce)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(ce,T))||ce==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&Ht(be.tagNameCheck,Se)||be.tagNameCheck instanceof Function&&be.tagNameCheck(Se))))return!1}else if(!lt[ce]){if(!Ht(oe,Yr(Se,Te,""))){if(!((ce==="src"||ce==="xlink:href"||ce==="href")&&T!=="script"&&Xf(Se,"data:")===0&&ht[T])){if(!(Ce&&!Ht(se,Yr(Se,Te,"")))){if(Se)return!1}}}}}}}return!0},Xt=function(T){return T!=="annotation-xml"&&ga(T,q)},et=function(T){Tt(ie.beforeSanitizeAttributes,T,null);let{attributes:ce}=T;if(!ce||Mt(T))return;let Se={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:we,forceKeepAttr:void 0},it=ce.length;for(;it--;){let Ct=ce[it],{name:y,namespaceURI:b,value:c}=Ct,m=le(y),$=c,f=y==="value"?$:Jf($);if(Se.attrName=m,Se.attrValue=f,Se.keepAttr=!0,Se.forceKeepAttr=void 0,Tt(ie.uponSanitizeAttribute,T,Se),f=Se.attrValue,ge&&(m==="id"||m==="name")&&(Et(y,T),f=ee+f),W&&Ht(/((--!?|])>)|<\/(style|title|textarea)/i,f)){Et(y,T);continue}if(m==="attributename"&&ga(f,"href")){Et(y,T);continue}if(Se.forceKeepAttr)continue;if(!Se.keepAttr){Et(y,T);continue}if(!qe&&Ht(/\/>/i,f)){Et(y,T);continue}Be&&Js([_e,X,Ie],z=>{f=Yr(f,z," ")});let h=le(T.nodeName);if(!Bt(h,m,f)){Et(y,T);continue}if(M&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!b)switch(w.getAttributeType(h,m)){case"TrustedHTML":{f=M.createHTML(f);break}case"TrustedScriptURL":{f=M.createScriptURL(f);break}}if(f!==$)try{b?T.setAttributeNS(b,y,f):T.setAttribute(y,f),Mt(T)?Ne(T):rc(t.removed)}catch{Et(y,T)}}Tt(ie.afterSanitizeAttributes,T,null)},Wt=function Pe(T){let ce=null,Se=Nt(T);for(Tt(ie.beforeSanitizeShadowDOM,T,null);ce=Se.nextNode();)Tt(ie.uponSanitizeShadowNode,ce,null),Ot(ce),et(ce),ce.content instanceof o&&Pe(ce.content);Tt(ie.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(Pe){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ce=null,Se=null,it=null,Ct=null;if(ct=!Pe,ct&&(Pe="<!-->"),typeof Pe!="string"&&!qt(Pe))if(typeof Pe.toString=="function"){if(Pe=Pe.toString(),typeof Pe!="string")throw Zr("dirty is not a string, aborting")}else throw Zr("toString is not a function");if(!t.isSupported)return Pe;if(Ae||Ke(T),t.removed=[],typeof Pe=="string"&&(tt=!1),tt){if(Pe.nodeName){let c=le(Pe.nodeName);if(!re[c]||Xe[c])throw Zr("root node is forbidden and cannot be sanitized in-place")}}else if(Pe instanceof i)ce=jt("<!---->"),Se=ce.ownerDocument.importNode(Pe,!0),Se.nodeType===Xr.element&&Se.nodeName==="BODY"||Se.nodeName==="HTML"?ce=Se:ce.appendChild(Se);else{if(!We&&!Be&&!V&&Pe.indexOf("<")===-1)return M&&R?M.createHTML(Pe):Pe;if(ce=jt(Pe),!ce)return We?null:R?N:""}ce&&Ve&&Ne(ce.firstChild);let y=Nt(tt?Pe:ce);for(;it=y.nextNode();)Ot(it),et(it),it.content instanceof o&&Wt(it.content);if(tt)return Pe;if(We){if(de)for(Ct=I.call(ce.ownerDocument);ce.firstChild;)Ct.appendChild(ce.firstChild);else Ct=ce;return(we.shadowroot||we.shadowrootmode)&&(Ct=$e.call(r,Ct,!0)),Ct}let b=V?ce.outerHTML:ce.innerHTML;return V&&re["!doctype"]&&ce.ownerDocument&&ce.ownerDocument.doctype&&ce.ownerDocument.doctype.name&&Ht(pc,ce.ownerDocument.doctype.name)&&(b="<!DOCTYPE "+ce.ownerDocument.doctype.name+`>
`+b),Be&&Js([_e,X,Ie],c=>{b=Yr(b,c," ")}),M&&R?M.createHTML(b):b},t.setConfig=function(){let Pe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ke(Pe),Ae=!0},t.clearConfig=function(){te=null,Ae=!1},t.isValidAttribute=function(Pe,T,ce){te||Ke({});let Se=le(Pe),it=le(T);return Bt(Se,it,ce)},t.addHook=function(Pe,T){typeof T=="function"&&Kr(ie[Pe],T)},t.removeHook=function(Pe,T){if(T!==void 0){let ce=Zf(ie[Pe],T);return ce===-1?void 0:Qf(ie[Pe],ce,1)[0]}return rc(ie[Pe])},t.removeHooks=function(Pe){ie[Pe]=[]},t.removeAllHooks=function(){ie=cc()},t}var _c=fc();var Cn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},no=e=>(...t)=>({_$litDirective$:e,values:t}),$r=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Jr=class extends $r{constructor(t){if(super(t),this.it=It,t.type!==Cn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===It||t==null)return this._t=void 0,this.it=t;if(t===on)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Jr.directiveName="unsafeHTML",Jr.resultType=1;var mc=no(Jr);function Ea(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var sr=Ea();function kc(e){sr=e}var rs={exec:()=>null};function dt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Kt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var __=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Kt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},m_=/^(?:[ \t]*(?:\n|$))+/,g_=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,h_=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ss=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,b_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ta=/(?:[*+-]|\d{1,9}[.)])/,$c=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,xc=dt($c).replace(/bull/g,Ta).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),y_=dt($c).replace(/bull/g,Ta).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ca=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,v_=/^[^\n]+/,Ra=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,w_=dt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ra).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),k_=dt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ta).getRegex(),lo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ia=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,$_=dt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ia).replace("tag",lo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ac=dt(Ca).replace("hr",ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",lo).getRegex(),x_=dt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ac).getRegex(),Oa={blockquote:x_,code:g_,def:w_,fences:h_,heading:b_,hr:ss,html:$_,lheading:xc,list:k_,newline:m_,paragraph:Ac,table:rs,text:v_},gc=dt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",lo).getRegex(),A_={...Oa,lheading:y_,table:gc,paragraph:dt(Ca).replace("hr",ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",gc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",lo).getRegex()},S_={...Oa,html:dt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ia).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:rs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:dt(Ca).replace("hr",ss).replace("heading",` *#{1,6} *[^
]`).replace("lheading",xc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},E_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,T_=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Sc=/^( {2,}|\\)\n(?!\s*$)/,C_=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,co=/[\p{P}\p{S}]/u,La=/[\s\p{P}\p{S}]/u,Ec=/[^\s\p{P}\p{S}]/u,R_=dt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,La).getRegex(),Tc=/(?!~)[\p{P}\p{S}]/u,I_=/(?!~)[\s\p{P}\p{S}]/u,O_=/(?:[^\s\p{P}\p{S}]|~)/u,L_=dt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",__?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Cc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,M_=dt(Cc,"u").replace(/punct/g,co).getRegex(),P_=dt(Cc,"u").replace(/punct/g,Tc).getRegex(),Rc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",D_=dt(Rc,"gu").replace(/notPunctSpace/g,Ec).replace(/punctSpace/g,La).replace(/punct/g,co).getRegex(),N_=dt(Rc,"gu").replace(/notPunctSpace/g,O_).replace(/punctSpace/g,I_).replace(/punct/g,Tc).getRegex(),q_=dt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ec).replace(/punctSpace/g,La).replace(/punct/g,co).getRegex(),F_=dt(/\\(punct)/,"gu").replace(/punct/g,co).getRegex(),j_=dt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),B_=dt(Ia).replace("(?:-->|$)","-->").getRegex(),U_=dt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",B_).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),oo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,W_=dt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",oo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ic=dt(/^!?\[(label)\]\[(ref)\]/).replace("label",oo).replace("ref",Ra).getRegex(),Oc=dt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ra).getRegex(),z_=dt("reflink|nolink(?!\\()","g").replace("reflink",Ic).replace("nolink",Oc).getRegex(),hc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ma={_backpedal:rs,anyPunctuation:F_,autolink:j_,blockSkip:L_,br:Sc,code:T_,del:rs,emStrongLDelim:M_,emStrongRDelimAst:D_,emStrongRDelimUnd:q_,escape:E_,link:W_,nolink:Oc,punctuation:R_,reflink:Ic,reflinkSearch:z_,tag:U_,text:C_,url:rs},H_={...Ma,link:dt(/^!?\[(label)\]\((.*?)\)/).replace("label",oo).getRegex(),reflink:dt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",oo).getRegex()},xa={...Ma,emStrongRDelimAst:N_,emStrongLDelim:P_,url:dt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",hc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:dt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",hc).getRegex()},G_={...xa,br:dt(Sc).replace("{2,}","*").getRegex(),text:dt(xa.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ro={normal:Oa,gfm:A_,pedantic:S_},es={normal:Ma,gfm:xa,breaks:G_,pedantic:H_},V_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},bc=e=>V_[e];function Rn(e,t){if(t){if(Kt.escapeTest.test(e))return e.replace(Kt.escapeReplace,bc)}else if(Kt.escapeTestNoEncode.test(e))return e.replace(Kt.escapeReplaceNoEncode,bc);return e}function yc(e){try{e=encodeURI(e).replace(Kt.percentDecode,"%")}catch{return null}return e}function vc(e,t){let n=e.replace(Kt.findPipe,(o,a,i)=>{let u=!1,d=a;for(;--d>=0&&i[d]==="\\";)u=!u;return u?"|":" |"}),r=n.split(Kt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Kt.slashPipe,"|");return r}function ts(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function K_(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function wc(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let u={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,u}function Y_(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var ao=class{constructor(e){yt(this,"options");yt(this,"rules");yt(this,"lexer");this.options=e||sr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ts(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Y_(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ts(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ts(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ts(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],u;for(u=0;u<n.length;u++)if(this.rules.other.blockquoteStart.test(n[u]))i.push(n[u]),a=!0;else if(!a)i.push(n[u]);else break;n=n.slice(u);let d=i.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,s=s?`${s}
${p}`:p;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=_,n.length===0)break;let g=o.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let w=g,x=w.raw+`
`+n.join(`
`),P=this.blockquote(x);o[o.length-1]=P,r=r.substring(0,r.length-w.raw.length)+P.raw,s=s.substring(0,s.length-w.text.length)+P.text;break}else if(g?.type==="list"){let w=g,x=w.raw+`
`+n.join(`
`),P=this.list(x);o[o.length-1]=P,r=r.substring(0,r.length-g.raw.length)+P.raw,s=s.substring(0,s.length-w.raw.length)+P.raw,n=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let u=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,P=>" ".repeat(3*P.length)),g=e.split(`
`,1)[0],w=!_.trim(),x=0;if(this.options.pedantic?(x=2,p=_.trimStart()):w?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,p=_.slice(x),x+=t[1].length),w&&this.rules.other.blankLine.test(g)&&(d+=g+`
`,e=e.substring(g.length+1),u=!0),!u){let P=this.rules.other.nextBulletRegex(x),B=this.rules.other.hrRegex(x),H=this.rules.other.fencesBeginRegex(x),Q=this.rules.other.headingBeginRegex(x),D=this.rules.other.htmlBeginRegex(x);for(;e;){let M=e.split(`
`,1)[0],N;if(g=M,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),N=g):N=g.replace(this.rules.other.tabCharGlobal,"    "),H.test(g)||Q.test(g)||D.test(g)||P.test(g)||B.test(g))break;if(N.search(this.rules.other.nonSpaceChar)>=x||!g.trim())p+=`
`+N.slice(x);else{if(w||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||H.test(_)||Q.test(_)||B.test(_))break;p+=`
`+g}!w&&!g.trim()&&(w=!0),d+=M+`
`,e=e.substring(M.length+1),_=N.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let u of s.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),u.tokens[0]?.type==="text"||u.tokens[0]?.type==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(u.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};u.checked=p.checked,s.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=p.raw+u.tokens[0].raw,u.tokens[0].text=p.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(p)):u.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):u.tokens.unshift(p)}}if(!s.loose){let d=u.tokens.filter(_=>_.type==="space"),p=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=p}}if(s.loose)for(let u of s.items){u.loose=!0;for(let d of u.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=vc(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(vc(a,o.header.length).map((i,u)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[u]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=ts(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=K_(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),wc(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return wc(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,u=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){u+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+u);let p=[...r[0]][0].length,_=e.slice(0,s+r.index+p+a);if(Math.min(s,a)%2){let w=_.slice(1,-1);return{type:"em",raw:_,text:w,tokens:this.lexer.inlineTokens(w)}}let g=_.slice(2,-2);return{type:"strong",raw:_,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},mn=class Aa{constructor(t){yt(this,"tokens");yt(this,"options");yt(this,"state");yt(this,"inlineQueue");yt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||sr,this.options.tokenizer=this.options.tokenizer||new ao,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Kt,block:ro.normal,inline:es.normal};this.options.pedantic?(n.block=ro.pedantic,n.inline=es.pedantic):this.options.gfm&&(n.block=ro.gfm,this.options.breaks?n.inline=es.breaks:n.inline=es.gfm),this.tokenizer.rules=n}static get rules(){return{block:ro,inline:es}}static lex(t,n){return new Aa(n).lex(t)}static lexInline(t,n){return new Aa(n).inlineTokens(t)}lex(t){t=t.replace(Kt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(Kt.tabCharGlobal,"    ").replace(Kt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),u;this.options.extensions.startBlock.forEach(d=>{u=d.call({lexer:this},i),typeof u=="number"&&u>=0&&(a=Math.min(a,u))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let u;if(this.options.extensions?.inline?.some(p=>(u=p.call({lexer:this},t,n))?(t=t.substring(u.raw.length),n.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);let p=n.at(-1);u.type==="text"&&p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):n.push(u);continue}if(u=this.tokenizer.emStrong(t,r,i)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),n.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),n.push(u);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,_=t.slice(1),g;this.options.extensions.startInline.forEach(w=>{g=w.call({lexer:this},_),typeof g=="number"&&g>=0&&(p=Math.min(p,g))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(u=this.tokenizer.inlineText(d)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(i=u.raw.slice(-1)),a=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):n.push(u);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},io=class{constructor(e){yt(this,"options");yt(this,"parser");this.options=e||sr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Kt.notSpaceStart)?.[0],s=e.replace(Kt.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Rn(r)+'">'+(n?s:Rn(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Rn(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Rn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=yc(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Rn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=yc(e);if(s===null)return Rn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Rn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Rn(e.text)}},Pa=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},gn=class Sa{constructor(t){yt(this,"options");yt(this,"renderer");yt(this,"textRenderer");this.options=t||sr,this.options.renderer=this.options.renderer||new io,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Pa}static parse(t,n){return new Sa(n).parse(t)}static parseInline(t,n){return new Sa(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},so,ns=(so=class{constructor(e){yt(this,"options");yt(this,"block");this.options=e||sr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?mn.lex:mn.lexInline}provideParser(){return this.block?gn.parse:gn.parseInline}},yt(so,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),yt(so,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),so),Z_=class{constructor(...e){yt(this,"defaults",Ea());yt(this,"options",this.setOptions);yt(this,"parse",this.parseMarkdown(!0));yt(this,"parseInline",this.parseMarkdown(!1));yt(this,"Parser",gn);yt(this,"Renderer",io);yt(this,"TextRenderer",Pa);yt(this,"Lexer",mn);yt(this,"Tokenizer",ao);yt(this,"Hooks",ns);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new io(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],u=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new ao(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],u=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new ns;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],u=s[a];ns.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&ns.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,d);return u.call(s,_)})();let p=i.call(s,d);return u.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,d);return _===!1&&(_=await u.apply(s,d)),_})();let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return mn.lex(e,t??this.defaults)}parser(e,t){return gn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?mn.lex:mn.lexInline)(a,s),u=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(u,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?gn.parse:gn.parseInline)(u,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?mn.lex:mn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?gn.parse:gn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Rn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},rr=new Z_;function gt(e,t){return rr.parse(e,t)}gt.options=gt.setOptions=function(e){return rr.setOptions(e),gt.defaults=rr.defaults,kc(gt.defaults),gt};gt.getDefaults=Ea;gt.defaults=sr;gt.use=function(...e){return rr.use(...e),gt.defaults=rr.defaults,kc(gt.defaults),gt};gt.walkTokens=function(e,t){return rr.walkTokens(e,t)};gt.parseInline=rr.parseInline;gt.Parser=gn;gt.parser=gn.parse;gt.Renderer=io;gt.TextRenderer=Pa;gt.Lexer=mn;gt.lexer=mn.lex;gt.Tokenizer=ao;gt.Hooks=ns;gt.parse=gt;var iv=gt.options,lv=gt.setOptions,cv=gt.use,uv=gt.walkTokens,dv=gt.parseInline;var pv=gn.parse,fv=mn.lex;function Fn(e){let t=gt.parse(e),n=_c.sanitize(t);return mc(n)}function In(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function xr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function uo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Mc={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Q_={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},X_=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,J_=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function wn(e){return!!e&&typeof e=="object"}function Da(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Na(e,t){let n=Da(e),r=Da(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let u=s.get(i)||0;u>0?s.set(i,u-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Pc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>wn(s)&&typeof s.text=="string"?s.text:"").join(""):wn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function em(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Mc[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Da(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=Na(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let u=Na(wn(i)?i.old_string:"",wn(i)?i.new_string:"");s+=u.added,o+=u.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function qa(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Fa(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=X_.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:J_.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function tm(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(wn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(Fa(a.text));else if(a.type==="thinking"){let i=qa(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=em(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?Lc(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(wn(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=Pc(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Lc([s],n):[s]}return[]}function Lc(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function nm(e){let t=typeof e.command=="string"?e.command:"",n=Pc(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Mc.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function rm(e){if(e.type==="item.completed"&&wn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Fa(t.text)];if(t.type==="reasoning"){let n=qa(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[nm(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function sm(e){if(e.schema!=="codex-delegation-monitor-v1"||!wn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&wn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Fa(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=qa(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Q_[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function om(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function am(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return wn(t)?t:null}function Dc(e={}){let t=e.skip_delegated===!0,n=new Map;return{push(r){let s=am(r);return s?t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0?[]:s.schema==="codex-delegation-monitor-v1"?sm(s):om(s)?rm(s):tm(s,n):[]}}}function ja(e){let t=[],n=Dc(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var im=5,lm=10,cm=/Task\s+#(\d+)/,um=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,dm=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function po(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function pm(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function fm(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function _m(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let u=cm.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!u||d.length===0)continue;t.set(u[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function mm(e){if(e.tool==="Bash"){let t=e.command||"";return um.test(t)?"~ PR/\uAC8C\uC2DC \uC911":dm.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function gm(e){let t=e.filter(s=>s.kind==="tool").slice(-lm),n=new Map;t.forEach((s,o)=>{let a=mm(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function hm(e){let t=fm(e);if(t)return{text:t,guess:!1};let n=_m(e);if(n)return{text:n,guess:!1};let r=gm(e);return r?{text:r,guess:!0}:null}function bm(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:tn(e,t)}function Ar(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,u=null,d=!1,p={},_=!0,g=new Set,w=new Set,x=null,P=null,B=!1,H=!1,Q=!1,D=null,M=null;function N(){B=!1,H=!1,Q=!1,D=null,M=null}async function j(W){if(n){H=!0,Q=!1,be();try{let V=await Promise.resolve(n("get-attempt-prompt",{attempt_id:W,...u?{root_dir:u}:{}}));if(o!==W)return;!V||typeof V!="object"||Array.isArray(V)?Q=!0:(D=V,M=W)}catch{o===W&&(Q=!0)}finally{o===W&&(H=!1,be())}}}function E(){if(B=!B,B&&o&&M!==o){j(o);return}be()}function I(){if(!B)return"";let W=xr({loading:H,error:Q});if(W)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${W}
      </div>`;if(!D)return"";if(D.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let V=uo(D.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${V?l`<div class="prompt-block__meta">${V} 발송</div>`:""}
      ${typeof D.task_prompt=="string"?In("\uACFC\uC5C5 (user)",D.task_prompt):""}
      ${typeof D.system_prompt=="string"?In("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",D.system_prompt):""}
    </div>`}function Y(){if(!i||!r)return[];let W=r.get(i);return ja(W?W.lines:[])}function $e(){if(!i||!r)return null;let W=r.get(i),V=W?W.last_event_at:null;return typeof V=="number"?V:null}function ie(){return p.status==="running"}function _e(){if(ie()&&o){P||(P=setInterval(()=>be(),1e3));return}X()}function X(){P&&(clearInterval(P),P=null)}function Ie(W){let V=[],Ae=0;for(;Ae<W.length;){let{idx:Ve,line:We}=W[Ae];if(We.kind==="tool"){let de=Ae;for(;de<W.length&&W[de].line.kind==="tool"&&W[de].line.tool===We.tool;)de+=1;if(de-Ae>=im&&!w.has(Ve)){V.push({kind:"group",idx:Ve,tool:We.tool||"",lines:W.slice(Ae,de)}),Ae=de;continue}}V.push({kind:"line",idx:Ve,line:We}),Ae+=1}return V}function ye(W){let V=[],Ae=new Map;for(let de=0;de<W.length;de+=1){let R=W[de],Z=R.parent_tool_use_id;if(typeof Z=="string"&&Z.length>0){let ge=Ae.get(Z);ge||(ge={kind:"subagent",idx:de,launch_id:Z,agent_type:null,header:null,lines:[]},Ae.set(Z,ge),V.push(ge)),ge.lines.push({idx:de,line:R});continue}if(R.kind==="tool"&&R.tool==="Agent"&&typeof R.launch_id=="string"&&R.launch_id.length>0){let ge=ne(R),ee=Ae.get(R.launch_id);if(ee){ee.header={idx:de,line:R},ee.agent_type=ge;continue}let Le={kind:"subagent",idx:de,launch_id:R.launch_id,agent_type:ge,header:{idx:de,line:R},lines:[]};Ae.set(R.launch_id,Le),V.push(Le);continue}V.push({kind:"entry",idx:de,line:R})}let Ve=[],We=0;for(;We<V.length;){if(V[We].kind!=="entry"){Ve.push(V[We]),We+=1;continue}let de=We;for(;de<V.length&&V[de].kind==="entry";)de+=1;Ve.push(...Ie(V.slice(We,de))),We=de}return Ve}function ne(W){let V=W.input;return V&&typeof V.subagent_type=="string"?V.subagent_type:null}function se(W){for(let V=W.length-1;V>=0;V-=1){let Ae=W[V];if(Ae.kind==="result"||Ae.kind==="error")return null;if(Ae.kind==="tool"&&!Object.hasOwn(Ae,"result"))return Ae}return null}function Te(W){for(let V=W.length-1;V>=0;V-=1)if(W[V].kind==="thinking")return W[V];return null}function q(W,V){if(V.kind==="gate")return l`<div class="sv__gate">${V.text}</div>`;if(V.kind==="phase")return l`<div class="sv__phase">${V.text}</div>`;if(V.kind==="result")return l`<div
        class="sv__result${V.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${V.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Fn(V.text||(V.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(V.kind==="thinking"){let Ae=g.has(W);return l`<div
        class="sv__think${Ae?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>pt(W)}
      >
        <span class="sv__think-line">💭 ${po(V.text)}</span>
        ${Ae?l`<pre class="sv__think-expand">${V.text}</pre>`:""}
      </div>`}if(V.kind==="error")return l`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="blocker")return l`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="tool"){let Ae=g.has(W),Ve=V.tool==="Bash"?pm(V.command):0,We=V.tool==="Bash"?Ve>1?po(V.command):V.command:V.path||V.command||"";return l`<div
        class="sv__tool${Ae?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>pt(W)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${V.icon}</span>
          <span class="sv__tool-name">${V.tool}</span>
          ${We?l`<span class="sv__tool-detail">${We}</span>`:""}
          ${Ve>1?l`<span class="sv__tool-more">⋯ ${Ve}줄</span>`:""}
          ${typeof V.added=="number"?l`<span class="sv__diff-add">+${V.added}</span>`:""}
          ${typeof V.removed=="number"?l`<span class="sv__diff-del">−${V.removed}</span>`:""}
          ${V.result?l`<span class="sv__tool-ok">→ ${V.result}</span>`:""}
        </span>
        ${Ae?l`<pre class="sv__tool-expand">${oe(V)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Fn(V.text||"")}</div>`}function oe(W){let V=[];if(W.tool==="Bash"&&typeof W.command=="string"&&W.command.length>0)V.push(W.command);else if(W.input!==void 0)try{V.push(`input: ${JSON.stringify(W.input,null,2)}`)}catch{}return typeof W.output=="string"&&W.output.length>0&&V.push(`output:
${W.output}`),V.join(`

`)}function re(){if(!o)return l``;let W=Y(),V=(a?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),Ae=p.session_id||"",Ve=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${_?"ON":"OFF"}`,We=ie(),de=We?bm($e(),Date.now()):"",R=We?se(W):null,Z=We?Te(W):null,ge=hm(W);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?p.role||"":o}</span>
        ${ge?l`<span
              class="sv__stage${ge.guess?" sv__stage--guess":""}"
              title=${ge.text}
              >${ge.text}</span
            >`:""}
        ${We?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${de?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${de}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${de?l`<span class="sv__live-ago">${de}</span>`:""}</span
            >`:""}
        ${Ae?l`<button
              type="button"
              class="sv__session"
              title=${Ae}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ae}`}
              @click=${()=>fe(Ae)}
            >
              ⧉ ${Ae.slice(0,8)}
            </button>`:""}
        ${V?l`<span class="sv__meta">${V}</span>`:""}
        ${p.worktree?l`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${a||d?"":l`<button
              type="button"
              class="sv__prompt-toggle${B?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${B?"true":"false"}
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
          aria-label=${Ve}
          @click=${C}
        >
          <span class="sv__follow-full">⇣ ${Ve}</span>
          <span class="sv__follow-short">⇣ ${_?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Be()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":I()}
      <div class="sv__body">
        ${W.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:ye(W).map(ee=>ee.kind==="subagent"?we(ee):ee.kind==="group"?xe(ee):q(ee.idx,ee.line))}
      </div>
      ${R||Z?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${R?l`<span class="sv__now-icon">${R.icon}</span>
                  <span class="sv__now-name">${R.tool}</span>
                  <span class="sv__now-detail"
                    >${R.tool==="Bash"?po(R.command):R.path||R.command||""}</span
                  >`:""}
            ${Z?l`<span class="sv__now-think"
                  >💭 ${po(Z.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function xe(W){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Oe(W.idx)}
    >
      <span class="sv__group-icon">${W.lines[0].line.icon}</span>
      <span class="sv__group-name">${W.tool}</span>
      <span class="sv__group-count">${W.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function we(W){let V=w.has(W.idx),Ae=W.header?W.header.line:null,Ve=Ae?Ae.is_error===!0?"\u2717":typeof Ae.result=="string"?"\u2713":"\u27F3":"",We=Ae&&Ae.command?Ae.command:"";return l`<div class="sv__sub${V?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Oe(W.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${W.agent_type||"subagent"}</span>
        ${We?l`<span class="sv__sub-detail">${We}</span>`:""}
        <span class="sv__sub-count">${W.lines.length}줄</span>
        ${Ve?l`<span class="sv__sub-state">${Ve}</span>`:""}
        ${V?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${V?l`<div class="sv__sub-body">
            ${Ie(W.lines).map(de=>de.kind==="group"?xe(de):q(de.idx,de.line))}
          </div>`:""}
    </div>`}function Oe(W){w.add(W),be()}function be(){Ge(re(),e),_e(),_&&Xe()}function Xe(){let W=e.querySelector(".sv__body");W&&(W.scrollTop=W.scrollHeight)}function pt(W){g.has(W)?g.delete(W):g.add(W),be()}function C(){_=!_,be()}function fe(W){nn(W).then(V=>{V?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ke(W){!o||!W||(p={...p,...W},be())}function Ce(W){let V=W.target;if(!V||!V.classList||!V.classList.contains("sv__body"))return;!(V.scrollHeight-V.scrollTop-V.clientHeight<=4)&&_&&(_=!1,be())}e.addEventListener("scroll",Ce,!0);function qe(W){let V=W&&W.attempt_id;if(!V)return;let Ae=i;o=V,a=typeof W.launch_id=="string"&&W.launch_id.length>0?W.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Ae&&Ae!==i&&Promise.resolve(n("unsubscribe-session-log",{id:Ae})).catch(()=>{}),u=typeof W.root_dir=="string"&&W.root_dir.length>0?W.root_dir:null,p=W.meta||{},d=W.hide_prompt===!0,_=!0,g.clear(),w.clear(),N(),!x&&r&&(x=r.subscribe(be)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...u?{root_dir:u}:{}})).catch(()=>{}),be()}function Be(){let W=i;o=null,a=null,i=null,u=null,d=!1,g.clear(),w.clear(),N(),X(),n&&W&&Promise.resolve(n("unsubscribe-session-log",{id:W})).catch(()=>{}),Ge(l``,e),s&&s()}return{open:qe,updateMeta:ke,close:Be,isOpen(){return o!==null},destroy(){X(),x&&(x(),x=null),e.removeEventListener("scroll",Ce,!0),o=null,a=null,i=null,u=null,d=!1,Ge(l``,e)}}}function fo(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Ba(t.spec_id),s=Ba(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ba(e){return typeof e=="string"?e.trim():""}function Nc(e){let t=fo(e);if(t.path)return t;let n=Ba(ym(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function ym(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function vm(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function wm(e){let t=e&&e.metadata||{},n=Nc(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:vm(t)?null:"plan_pending"}),r}function qc(e,t){let n=wm(e);return l`
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
  `}var km="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",$m=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,xm=/^\*\*결론\*\* — (.+)$/;function _o(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==km)return null;let n=$m.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?xm.exec(t[a]):null,u=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:u,body:t.slice(d).join(`
`).trim()}}var Fc=20;function jc(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Am(e){return e.length>Fc?`${e.slice(0,Fc)}\u2026`:e}function Sm(e,t,n,r){let s=`${t.lane} ${Am(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${jc(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?l`<div class="detail-report__body">
          ${Fn(t.body)}
        </div>`:""}
  </div>`}function Em(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${jc(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Fn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Bc(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((u,d)=>String(d.created_at||"").localeCompare(String(u.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(u=>{let d=_o(typeof u.text=="string"?u.text:"");return d?Sm(u,d,t,s.has(u.id)):Em(u)})}
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
  `}var{I:Kv}=il;var Uc=e=>e.strings===void 0;var Tm={},Wc=(e,t=Tm)=>e._$AH=t;var or=no(class extends $r{constructor(e){if(super(e),e.type!==Cn.PROPERTY&&e.type!==Cn.ATTRIBUTE&&e.type!==Cn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Uc(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===on||t===It)return t;let n=e.element,r=e.name;if(e.type===Cn.PROPERTY){if(t===n[r])return on}else if(e.type===Cn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return on}else if(e.type===Cn.ATTRIBUTE&&n.getAttribute(r)===t+"")return on;return Wc(e),t}});var mo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Wa=[...mo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],On=["orchestration_model","orchestration_effort","orchestration_speed"],go=[...mo,...On],Cm=Wa.filter(e=>go.includes(e)),zc=["delegated","main"],ho=["inherit","claude","codex"],os=["default","fast"],as=["standard","fast_track"],is=["codex","opus","fable","self","skip"],bo=["codex","fable","skip"],yo=["low","medium","high","xhigh"],sn="auto";function rn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Hc(e){if(!rn(e)||!rn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))rn(r)&&rn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Sr(e,t){let n=Hc(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[sn,...r.flatMap(([,s])=>s)]}function Gc(e,t,n,r){if(!rn(e)||!rn(e.runners))return[sn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!rn(a)||!rn(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,u]of Object.entries(a.models)){if(n&&n!==sn&&i!==n)continue;let d=r(a,u);if(Array.isArray(d))for(let p of d)typeof p=="string"&&!s.includes(p)&&s.push(p)}return[sn,...s]}function Er(e,t,n){return Gc(e,t,n,(r,s)=>rn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function za(e,t,n){return Gc(e,t,n,(r,s)=>rn(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:rn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function ls(e,t){let n=Hc(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Vc(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Sr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Er(t,s,r.impl_model||sn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Rm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ua=[...Cm,...On],Im=[...go,...Wa].filter((e,t,n)=>n.indexOf(e)===t&&!Ua.includes(e));function Kc(e,t){let n=rn(e)?e:{},r=rn(t)?t:{},s=[];for(let a of Ua){let i=n[a]??null,u=r[a]??null;i!==u&&s.push({key:a,label:Rm[a]||a,before:i,after:u,kind:i===null?"added":u===null?"removed":"changed"})}let o=[];for(let a of[...Im,...Object.keys(r)])!Ua.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Ha(e,t,n,r,s,o){return Zs({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Yc(e,t){let n={};for(let r of Wa){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Zc(e,t){let n={};for(let r of On){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Ga=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...On]}],jn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},vo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Va(e,t,n,r,s,o=null){let a=Zt({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Qc(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of Va(e,t,n,r,s,o))a[i.source]+=1;return a}function Xc(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Jc(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var ow=[...mo,...On];var Om=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],Lm={pin:"pin",global:"global",base:"base"};function Mm(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${Lm[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Pm(e,t,n){switch(e){case"workflow_mode":return as;case"spec_review_model":case"impl_review_model":return is;case"plan_review_model":return bo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return yo;case"impl_dispatch":return zc;case"impl_runtime":return ho;case"impl_model":return Sr(n,t.impl_runtime);case"impl_effort":return Er(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return os;case"orchestration_model":return ls(n,null);case"orchestration_effort":return Er(n,void 0,t.orchestration_model||sn).filter(r=>r!==sn);default:return[]}}function Dm(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${Mm(e.source)}
    <span class="detail-effective__k"
      >${jn[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${vo[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${jn[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function eu(e,t){let n=Ga.flatMap(u=>u.keys),r=Va(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Qc(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(u=>[u.key,u])),a=Object.fromEntries(r.filter(u=>u.value!==null).map(u=>[u.key,u.value])),i=r.filter(u=>u.full_value&&u.display!==u.full_value).map(u=>u.full_value).join(" \xB7 ");return l`<details
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
        >${Nm(o)}</span
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
          ${Ga.map(u=>l`
              <div class="detail-effective__subhead">${u.label}</div>
              ${r.filter(d=>u.keys.includes(d.key)).map(d=>{let p=Zs({key:d.key,choices:Pm(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Dm(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${or(e.preset_id)}
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
  </details>`}function Nm(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function qm(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function tu(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=qm(n.exec_receipt),u=i?xn(i):a,d=i?`${i.kind}:${i.actor}`:a.split("@")[0],p=Ks(n.planned_execution,n.exec_receipt);return l`<section class="detail-summary" data-seam="detail-summary">
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
      ${p?l`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
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
      ${Om.map(_=>{let g=_.receipt&&typeof t[_.receipt]=="string"?String(t[_.receipt]):"",w=r[_.id],x=g.length>0||w?.fill==="full",P=!x&&w?.fill==="dim",B=w?.stale===!0;return l`<span
          class=${`detail-summary__gate${x?" detail-summary__gate--on":""}${P?" detail-summary__gate--current":""}${B?" detail-summary__gate--stale":""}`}
          data-gate=${_.id}
        >
          <span class="detail-summary__gate-pill">${_.label}</span>
          ${g?l`<span class="detail-summary__gate-sha"
                >${g.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function ou(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function nu(e){return ou(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function ru(e,t){let n=e&&e[t];if(!ou(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(nu),s=nu(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function au(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Fm(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${au(e)}${t}`}function iu(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${au(e)}`}function jm(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:iu({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function su(e){let t=e.provider_key==="claude"?Fm:iu,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${jm(e.provider_key,e.provider)}
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
  </div>`}function lu({md:e,catalog:t,handlers:n}){let r=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${su({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:ru(t,"claude"),selected:r,handlers:n,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${su({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:ru(t,"codex"),selected:s,handlers:n})}
    </div>
  </section>`}var cu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function cs(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function wo(e){if(!cs(e)||!cs(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>cs(n)&&cs(n.models));return t.length>0?t:null}function hn(e,t){let n=wo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function uu(e,t){return cs(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function du(e,t){let n=wo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return uu(r,r.models[t]);return[]}function Bm(e){let t=wo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of uu(r,s))n.includes(o)||n.push(o);return n}function Um(e,t){if(!t)return Bm(e);let r=wo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of du(e,o))s.includes(a)||s.push(a);return s}function pu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=hn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?du(t,r.impl_model):Um(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function Wm(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function zm(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function fu(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,u="";function d(P){P.key==="Escape"&&s&&(P.preventDefault(),w())}document.addEventListener("keydown",d);function p(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Wm(s)}</span
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
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${u}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${u||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:l`${i===null?null:l`<pre class="mv__front">
${i}</pre
                        >`}${Fn(a)}`}
          </div>
        </div>
      </div>
    `:l``}function _(){Ge(p(),e)}async function g(P,B={}){s=P,o="loading",a="",i=null,u="",_();let H=n?n():"";if(!H){o="error",u="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!r){o="error",u="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let Q="/api/doc?workspace="+encodeURIComponent(H)+"&path="+encodeURIComponent(P);try{let D=await r(Q),M=await D.json().catch(()=>({}));if(!D.ok||!M||M.ok!==!0){if(M?.error==="not_found"&&B.missing_state==="plan_pending"){o="pending",u="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",u="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||D.status)+")",_();return}let N=zm(String(M.content||""));i=N.front,a=N.body,o="ready",_()}catch{o="error",u="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function w(){s=null,Ge(l``,e)}function x(){document.removeEventListener("keydown",d),w()}return{open:g,close:w,destroy:x}}var Hm=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],gu="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ko=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Gm=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function _u(e){return typeof e=="string"&&Gm.has(e)}var Vm=["running","done","failed","interrupted"],Km={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Ym(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Zm(e){let t=Ut(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=kr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${gu}
          >부분 집계</span
        >`:""}`}function mu(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Za(e){if(typeof e=="number")return $o(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?$o(t):""}function Qm(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Xm(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ka(e){return e===null||typeof e=="string"&&e.trim().length>0}function Ya(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Jm(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!ko.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Ka(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ka(t.effort))||!(!("agent_type"in t)||Ka(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Vm.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Ya(t.started_at)||!Ya(t.last_event_at)||!Ya(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function eg(e,t,n){let s=Ut({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Za(n.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${Za(n.completed_at)}</span
        >`:""}
    ${s?l`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function tg(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Ut({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?$o(e.last_event_at):s?Za(s.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,Qm(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=Xm(e,s);return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Km[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${u}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${d.title}
      >${d.text}</span
    >
    ${i?l`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?l`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function ng(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function rg(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let _=Jm(p);!_||s.has(_.launch_id)||_u(_.agent_type)||(s.add(_.launch_id),r.push(_))}r.sort((p,_)=>(p.started_at||0)-(_.started_at||0));let a={};for(let{role:p,provider:_}of ko){let g=t?t.roles[p]?.[_]:null;a[p]=g?[...g.legs]:[]}let i=ko.flatMap(({role:p})=>a[p]),u=new Set,d=[];for(let{role:p,provider:_}of ko){for(let g of r.filter(w=>w.role===p&&w.provider===_)){let w=i.find(x=>x.receipt_id===g.launch_id)||null;w&&!ng(g,w)||(w&&u.add(w.receipt_id),d.push(tg(g,w,e.attempt_id,n)))}for(let g of a[p])!u.has(g.receipt_id)&&!_u(g.agent_type)&&d.push(eg(p,_,g))}return d}function sg(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Hm,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${r.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Ym(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${gu}</span>`:""}
  </div>`}var og={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function $o(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function ag(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function hu(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of r)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,g=o.has(d.attempt_id),w=_&&!g,x=_?g?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!w}
      title=${x}
      @click=${P=>{P.stopPropagation(),w&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,g=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return l`<div class="detail-session__cause" title=${g}>
      ${d.cause}
    </div>`},u=d=>{let p=mu(_a(d));if(Ut(p).length===0&&!kr(d.usage))return"";let _=s.has(d.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${g=>{g.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${Zm(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(d=>{let p=_a(d),_=mu(p),g=Ut(_);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${og[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${zr(d)?l`<span
                  class="detail-session__resumed"
                  title=${zr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${nr(d)}</span>
            ${g.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?l`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${g.length>0?g.map(w=>l`<span
                      class="detail-session__usage"
                      title=${w.tooltip}
                      >${w.label}</span
                    >`):kr(d.usage)?l`<span class="detail-session__usage"
                    >${kr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${$o(d.started_at)}</span>
          </button>
          ${u(d)} ${a(d)} ${i(d)} ${ag(d)}
          ${s.has(d.attempt_id)&&d.usage?sg(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${rg(d,p,t)}
        </div>`})}
    </div>
  `}function bu(e,t={}){return l`
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
          ${ig(e)}
        </div>`:""}
  `}function ig(e){let t=xr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?In("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=uo(n.recorded_at);return l`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?In("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?In("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var lg=["open","in_progress","deferred","resolved","closed"],cg=[0,1,2,3,4];function yu(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,u=t.sessionLogStore,d=null,p=null,_={},g="",w=!1,x=[],P=!1,B={},H={claude:null,codex:null},Q=null,D=0,M=!1,N=!1,j="",E="",I="";function Y(){M=!1,N=!1,j="",E="",I=""}function $e(){H={claude:null,codex:null},Q=null,D+=1}async function ie(A){try{let J=await fetch(A);if(!J.ok)return null;let F=await J.json();if(!F||typeof F!="object"||!Array.isArray(F.accounts))return null;let Re=F.accounts.filter(st=>st!==null&&typeof st=="object"&&!Array.isArray(st));return{accounts:Re,active:Re.find(st=>st.active===!0)||null}}catch{return null}}async function _e(A){Q=A;let J=++D,[F,Re]=await Promise.all([ie("/api/claude-usage"),ie("/api/codex-usage")]);J!==D||A!==d||(H={claude:F,codex:Re},ve())}let X=[],Ie=null,ye=null,ne=!1,se="",Te=!1,q=0,oe=new Set;function re(){X=[],Ie=null,ye=null,ne=!1,se="",Te=!1,q+=1,oe.clear()}async function xe(A){if(!s)return;let J=++q;try{let F=await Promise.resolve(s("get-comments",{id:A}));if(J!==q||A!==d)return;X=Array.isArray(F)?F:[],ne=!1}catch{if(J!==q||A!==d)return;ne=!0}ve()}function we(){if(!s||!d)return;let A=p&&typeof p.comment_count=="number"?p.comment_count:null;if(Ie!==d){Ie=d,ye=A,xe(d);return}A!==null&&A!==ye&&(ye=A,xe(d))}function Oe(A){oe.has(A)?oe.delete(A):oe.add(A),ve()}function be(A){let J=se.trim().length===0;se=A,J!==(A.trim().length===0)&&ve()}async function Xe(){let A=se.trim();if(!s||!d||A.length===0||Te)return;let J=d;Te=!0,ve();let F=!1;try{let Re=await Promise.resolve(s("add-comment",{id:J,text:A}));Array.isArray(Re)&&Re.length>0&&(F=!0,J===d&&(X=Re,ne=!1,se="",ye=Re.length))}catch{F=!1}F||ue("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),J===d&&(Te=!1),ve()}let pt={onToggle:Oe,onDraftInput:be,onSubmit:Xe},C=document.createElement("div");C.className="md-viewer-root",document.body.appendChild(C);let fe=fu(C,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),ke=document.createElement("div");ke.className="session-log-root",document.body.appendChild(ke);let Ce=Ar(ke,{transport:s?(A,J)=>Promise.resolve(s(A,J)):void 0,sessionLogStore:u}),qe=!1,Be=!1,W=!1,V=null,Ae=null,Ve=0;function We(A){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${A}`}function de(){qe=!1,Be=!1,W=!1,V=null,Ae=null,Ve+=1}async function R(A){if(!s)return;let J=++Ve;Be=!0,W=!1,ve();try{let F=await Promise.resolve(s("get-bead-prompt",{bead_id:A}));if(J!==Ve)return;!F||typeof F!="object"||Array.isArray(F)?W=!0:(V=F,Ae=We(A))}catch{J===Ve&&(W=!0)}finally{J===Ve&&(Be=!1,ve())}}function Z(){if(qe=!qe,qe&&d&&Ae!==We(d)){V=null,R(d);return}ve()}function ge(){if(!a||!d)return[];let A=a.get();return(A&&A.attempts?Object.values(A.attempts):[]).filter(F=>F&&F.bead_id===d).sort((F,Re)=>(Re.started_at||0)-(F.started_at||0)).map(F=>({attempt_id:F.attempt_id,bead_id:F.bead_id,status:F.status,started_at:typeof F.started_at=="number"?F.started_at:null,runner:F.runner||null,model:F.model||null,effort:F.effort||F.observed_effort||null,speed:F.speed||null,session_id:F.session_id||null,resumed_from:F.resumed_from||null,continuation_mode:F.continuation_mode||null,dismissed_at:typeof F.dismissed_at=="number"?F.dismissed_at:null,cause:typeof F.cause=="string"?F.cause:null,cause_detail:F.cause_detail||null,exec_default_preset_id:typeof F.exec_default_preset_id=="string"?F.exec_default_preset_id:null,exec_default_preset_revision:typeof F.exec_default_preset_revision=="number"?F.exec_default_preset_revision:null,exec_values:F.exec_values&&typeof F.exec_values=="object"?F.exec_values:null,usage:F.usage||null,usage_legs:Array.isArray(F.usage_legs)?F.usage_legs:[],delegation_sessions:Array.isArray(F.delegation_sessions)?F.delegation_sessions:[]}))}function ee(){if(!a||!d)return null;let A=a.get();return ln(A&&A.attempts||{},d)}let Le=new Set;function tt(A){Le.has(A)?Le.delete(A):Le.add(A),ve()}function rt(A){let J=a?a.get():null,F=J&&J.attempts?J.attempts[A]:null;Ce.open({attempt_id:A,meta:F?{runner:F.runner||void 0,model:F.model||void 0,effort:F.effort||void 0,status:F.status||void 0,session_id:F.session_id||void 0}:{}})}function Qe(A,J){let F=a?a.get():null,Re=F&&F.attempts?F.attempts[A]:null,Je=(Re&&Array.isArray(Re.delegation_sessions)?Re.delegation_sessions:[]).find(Ye=>Ye&&typeof Ye=="object"&&Ye.launch_id===J);Je&&Ce.open({attempt_id:A,launch_id:J,meta:{runner:Je.provider==="claude"?"claude":"codex",role:Je.role,...typeof Je.agent_type=="string"?{agent_type:Je.agent_type}:{},model:Je.model,effort:Je.effort,session_id:Je.session_id,status:Je.status}})}async function ft(A){if(!s||!A)return;let J=await wr();if(J===null)return;let F=()=>{let Ye=a?a.get():null;return Ye&&typeof Ye.revision=="number"?Ye.revision:0},Re=async(Ye={},Ze=F())=>await s("worker-attempt-resume",{attempt_id:A,expected_revision:Ze,...J!==""?{instructions:J}:{},...Ye}),st=Ye=>{Ye?.queue&&a?.set&&a.set(Ye.queue)},Je=await Re();if(st(Je),Je&&Je.conflict){let Ye=Je.queue&&typeof Je.queue.revision=="number"?Je.queue.revision:F();Je=await Re({},Ye),st(Je)}Je=await An(Je,(Ye,Ze)=>Re({continuation:Ye,decision_token:Ze}),{onResult:st,refresh:()=>Re()}),Je&&Je.resumed===!1&&!Je.conflict&&Je.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Je.reason}`,"error",2400)}let ht={onOpen:rt,onOpenDelegation:Qe,onResume:ft,onToggleUsage:tt};function ut(){let A=a?a.get():null,J={...B};for(let F of["orchestration_model","orchestration_effort","orchestration_speed"]){let Re=A&&A[F];typeof Re=="string"&&(J[F]=Re)}return J}async function lt(){if(s){try{let A=await Promise.resolve(s("get-session-defaults",{}));B=A&&A.values&&typeof A.values=="object"?A.values:{}}catch{B={}}ve()}}function _t(){let A=a?a.get():null;return A&&A.runner_catalog||null}function Ue(){let A=a?a.get():null;return A&&typeof A.execution_defaults=="object"?A.execution_defaults:null}function De(){let A=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},F=Zt({pin:{...A,..._},global:ut(),execution_defaults:Ue(),runner_catalog:_t(),route:typeof A.route=="string"?A.route:null}).orchestration_model.value||"";return hn(_t(),F)}function Fe(){let A=i?i.get():null;return!A||typeof A.revision!="number"?null:{revision:A.revision,presets:Array.isArray(A.presets)?A.presets:[]}}function mt(A){return A?.compatible===!1}function ct(A){i&&A&&typeof A.revision=="number"&&Array.isArray(A.presets)&&i.set({revision:A.revision,presets:A.presets})}async function G(){let A=Fe(),J=A?.presets.find(F=>F.id===g);if(!(!s||!d||!A||!J||mt(J)||w)){w=!0,x=[],ve();try{let F=await Promise.resolve(s("apply-impl-preset",Jc(d,J.id,A.revision)));if(F&&F.conflict){ct(F),ue("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Re=F&&Array.isArray(F.issue)?F.issue[0]:F?.issue;if(F&&F.applied&&Re&&typeof Re=="object"){p=Re,x=Array.isArray(F.skipped_orchestration_keys)?F.skipped_orchestration_keys.filter(st=>typeof st=="string"):[];for(let st of cu)delete _[st];ue(x.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}F&&F.error==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(F){F&&typeof F=="object"&&F.code==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{w=!1,ve()}}}let pe=null;n&&n.subscribe&&(pe=n.subscribe(()=>k()));let Me=null;a&&typeof a.subscribe=="function"&&(Me=a.subscribe(()=>{d&&ve()}));let S=null;i&&typeof i.subscribe=="function"&&(S=i.subscribe(()=>{d&&ve()}));function L(A){A.key==="Escape"&&d&&(A.preventDefault(),r())}document.addEventListener("keydown",L);function k(){if(d){if(n&&typeof n.snapshotFor=="function"){let A=n.snapshotFor("detail:"+d)||[];p=A.find(F=>F&&F.id===d)||A[0]||p}we(),ve()}}function O(A){nn(A).then(J=>{J?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ae(A){A.preventDefault(),A.stopPropagation(),d&&O(d)}function le(A,J){A.preventDefault(),A.stopPropagation(),O(J)}function te(A,J,F){A.preventDefault(),A.stopPropagation(),fe.open(J,{missing_state:F})}function he(A,J){_[A]=J,ve(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",Xc(d,A,J.length===0?null:J))).catch(()=>{ue("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function at(A,J){let F=p||{},Re=F.metadata&&typeof F.metadata=="object"?F.metadata:{},st={};for(let Ze of["impl_runtime","impl_model","impl_effort"])st[Ze]=Object.hasOwn(_,Ze)?_[Ze]:typeof Re[Ze]=="string"?Re[Ze]:"";st[A]=J;let Je=pu(st,_t(),De()),Ye={};for(let Ze of["impl_runtime","impl_model","impl_effort"])Ye[Ze]=_[Ze],_[Ze]=Je[Ze]||"";ve(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Je,orchestration_runtime:De()})).then(Ze=>{let Rt=Array.isArray(Ze)?Ze[0]:Ze;if(!Rt||typeof Rt!="object"||!Rt.id)throw new Error("implementation target readback failed");p=Rt;for(let Jt of["impl_runtime","impl_model","impl_effort"])delete _[Jt];ve()}).catch(()=>{for(let Ze of["impl_runtime","impl_model","impl_effort"])Ye[Ze]===void 0?delete _[Ze]:_[Ze]=Ye[Ze];ve(),ue("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ke(A,J,F){if(!s||!d)return!1;try{let Re=await Promise.resolve(s(A,J)),st=Array.isArray(Re)?Re[0]:Re;return st&&typeof st=="object"&&st.id?(p=st,!0):(ue(F,"error"),!1)}catch{return ue(F,"error"),!1}}function He(A){setTimeout(()=>{try{let J=e.querySelector(A);J&&typeof J.focus=="function"&&J.focus()}catch{}},0)}function bt(){M=!0,j=p&&p.title||"",ve(),He('.detail-edit__input[data-edit="title"]')}function $t(A){j=A.target.value}function Ne(){M=!1,j="",ve()}function Et(){Ke("edit-text",{id:d,field:"title",value:j},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(J=>{J&&(M=!1,j=""),ve()})}function jt(){N=!0,E=p&&p.description||"",ve(),He('.detail-edit__textarea[data-edit="description"]')}function Nt(A){E=A.target.value}function Mt(){N=!1,E="",ve()}function qt(){Ke("edit-text",{id:d,field:"description",value:E},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(J=>{J&&(N=!1,E=""),ve()})}function Tt(A,J,F,Re){if(A.key==="Escape"){A.stopPropagation(),F();return}A.key==="Enter"&&(!Re||A.ctrlKey||A.metaKey)&&(A.preventDefault(),J())}function Ot(A){let J=A.target.value;Ke("update-status",{id:d,status:J},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ve())}function Bt(A){let J=Number(A.target.value);Ke("update-priority",{id:d,priority:J},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ve())}function Xt(A){I=A.target.value}function et(){let A=I.trim();A.length!==0&&Ke("label-add",{id:d,label:A},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(J=>{J&&(I=""),ve()})}function Wt(A){if(A.key==="Escape"){A.stopPropagation(),I="",ve();return}A.key==="Enter"&&(A.preventDefault(),et())}function Pe(A){Ke("label-remove",{id:d,label:A},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ve())}let T={onCopyPath:le,onOpenDoc:te};function ce(A){return typeof A=="string"?A:A&&typeof A=="object"?String(A.id||A.to||A.issue_id||A.depends_on||""):""}function Se(A){switch(A&&typeof A=="object"?String(A.dependency_type||A.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function it(A){let F=(Array.isArray(A.dependencies)?A.dependencies:[]).map(Re=>({id:ce(Re),icon:Se(Re)})).filter(Re=>Re.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${F.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${F.map(Re=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Re.id)}
                  >
                    ${Re.icon?`${Re.icon} `:""}${Re.id}
                  </button>`:l`<span class="detail-dep"
                    >${Re.icon?`${Re.icon} `:""}${Re.id}</span
                  >`)}
          </div>`}
    `}function Ct(A){let J=A.metadata||{},F=A.workflow||{},Re=F.stages||{},st=Re.spec&&Re.spec.stale,Je=Re.impl&&Re.impl.stale,Ye=Re.plan||null,Ze=F.route_source==="derived",Rt=F.route||J.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ze?" detail-kv__v--derived":""}"
          title=${Ze?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ze?"unset":Rt}</span
        >
      </div>
      ${F.route!=="quick_fix"||Object.hasOwn(J,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${J.spec_review||"\uC5C6\uC74C"}${st?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${F.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ye?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ye?.approval_receipt||"\uC5C6\uC74C"}${Ye?.approval_state==="stale"?" \xB7 stale":Ye?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${F.route!=="quick_fix"||Object.hasOwn(J,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${J.impl_review||"\uC5C6\uC74C"}${Je?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${F.planned_execution?l`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${F.planned_execution.kind}</span>
            </div>
            ${F.planned_execution.kind==="main"?l`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${F.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${F.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${xn(F.exec_receipt)}</span
            >
          </div>`:""}
      ${F.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${F.impl_entry.actor}@${F.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${J.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${J.pr_url}</span>
          </div>`:""}
    `}let y={route:["quick_fix","spec_backed","full_plan"]};async function b(A,J){let F=J.target.value;if(A==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&F!=="full_plan"&&!window.confirm(`full_plan \u2192 ${F||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ve();return}await Ke("update-workflow-meta",{id:d,key:A,value:F},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ve()}function c(A){let J=A.metadata||{};return l` ${((Re,st)=>{let Je=y[Re],Ye=typeof J[Re]=="string"?J[Re]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${Re}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Re}
          data-edit=${`wfmeta-${Re}`}
          @change=${Ze=>b(Re,Ze)}
        >
          <option value="" ?selected=${!Je.includes(Ye)}>
            ${st}
          </option>
          ${Je.map(Ze=>l`<option value=${Ze} ?selected=${Ye===Ze}>${Ze}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function m(A,J){return M?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${j}
            @input=${$t}
            @keydown=${F=>Tt(F,Et,Ne,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Et}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ne}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${A}</h2>
        ${Ut(J).map(F=>l`<span class="detail-usage-total" title=${F.tooltip}
              >${F.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${bt}
        >
          ✎
        </button>
      </div>
    `}function $(A){let J=zt(A.created_at),F=zt(A.updated_at);return!J&&!F?l``:l`
      ${J?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${J}</span>
          </div>`:""}
      ${F?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${F}</span>
          </div>`:""}
    `}function f(A,J){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ot}
        >
          ${lg.map(F=>l`<option value=${F} ?selected=${F===A}>${F}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Bt}
        >
          ${cg.map(F=>l`<option value=${String(F)} ?selected=${F===J}>
                P${F}
              </option>`)}
        </select>
      </div>
    `}function h(A){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${N?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${jt}
            >
              ✎
            </button>`}
      </div>
      ${N?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${E}
              @input=${Nt}
              @keydown=${J=>Tt(J,qt,Mt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${qt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Mt}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${A||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function z(A){let J=typeof A.notes=="string"?A.notes:"";return J.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${J}</div>
    `}function K(A){let J=Array.isArray(A.labels)?A.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${J.map(F=>l`<span class="detail-label-chip"
              >${F}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${F}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+F}
                @click=${()=>Pe(F)}
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
            @input=${Xt}
            @keydown=${Wt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${et}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ee(){if(!d)return l``;let A=p||{},J=String(A.id||d),F=A.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Re=ee(),st=A.status||"open",Je=typeof A.priority=="number"?Math.max(0,Math.min(4,A.priority)):"",Ye=A.description||"",Ze={...A,metadata:{...A.metadata||{},..._}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${ae}
            >
              ${J}
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
          ${m(F,Re)}
          ${tu(Ze)}
          ${eu({metadata:Ze.metadata,workspace_values:ut(),catalog:_t(),execution_defaults:Ue(),expanded:P,presets:Fe()?.presets||[],preset_id:g,preset_busy:w,skipped_orchestration_keys:x},{onToggle:Rt=>{P=Rt,ve()},onEdit:(Rt,Jt)=>{if(Rt==="impl_runtime"||Rt==="impl_model"||Rt==="impl_effort"){at(Rt,Jt??"");return}he(Rt,Jt??"")},onPresetSelect:Rt=>{g=Rt,x=[],ve()},onPresetApply:()=>{G()}})}
          ${lu({md:Ze.metadata,catalog:H,handlers:{onExecChange:he}})}
          ${f(st,Je)} ${$(A)}
          ${h(Ye)}
          ${Bc(X,pt,{expanded:oe,draft:se,sending:Te,error:ne})}
          ${z(A)} ${K(A)} ${it(A)}
          ${Ct(A)} ${c(A)}
          ${qc(A,T)}
          ${bu({expanded:qe,loading:Be,error:W,data:V},{onToggle:Z})}
          ${hu(ge(),ht,{total:Re,expanded:Le})}
        </div>
      </div>
    `}function ve(){Ge(Ee(),e)}return{load(A){A!==d&&(_={},g="",x=[],P=!1,Y(),re(),de(),$e()),d=A,p=null,k(),lt(),Q!==A&&_e(A)},clear(){d=null,p=null,_={},g="",w=!1,x=[],P=!1,Y(),re(),de(),$e(),fe.close(),Ce.close(),Ge(l``,e)},destroy(){pe&&(pe(),pe=null),Me&&(Me(),Me=null),S&&(S(),S=null),document.removeEventListener("keydown",L),fe.destroy(),C.parentNode&&C.parentNode.removeChild(C),Ce.destroy(),ke.parentNode&&ke.parentNode.removeChild(ke),d=null,p=null,$e(),g="",w=!1,x=[],re(),de(),Ge(l``,e)}}}function vu(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},u=(d,p,_="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let g=typeof _=="string"?_.trim():"";if(s&&(g.length>0?(s.textContent=g,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:u,close:i,getElement(){return t}}}function Ao(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ds(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function So(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function Eo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function ug(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:Ao(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function wu(e,t){let n=ug(e,t);return n?l`<button
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
            title=${n.deploy.at?zt(n.deploy.at):""}
            >${Eo(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${ds(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Tr(e){let t=tn(e.created_at),n=tn(e.updated_at);return!t&&!n?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${zt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?l`<span>·</span>`:""}${n?l`<span title=${`\uC218\uC815 ${zt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function dg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function ps(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function To(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function kn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,g)=>(_.requested_at||0)-(g.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,u=s?dg(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${u||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:u,error:i,confirmation:p}}function us(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return l`<div
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
  </div>`}var pg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function ku(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let u=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:pg[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Co(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}var xo=3;function fg(e){return l`<div
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
  </div>`}function Cr(e,t={}){if(!e)return"";let n=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],s=Array.isArray(e.warnings)?e.warnings:[],o=Array.isArray(e.overlaps)?e.overlaps:[],a=e.scope_missing===!0&&t.lane!=="running",i=e.popover||null;if(n.length===0&&r.length===0&&s.length===0&&o.length===0&&!a)return"";let u=o.length>xo,d=u?o.slice(0,xo):o;return l`<div class="worker-deps">
    ${n.map(p=>l`<span class="worker-dep worker-dep--pred" title=${p.title||""}
          ><span class="worker-dep__label">${p.label}</span
          ><button
            type="button"
            class="worker-dep__remove"
            data-blocker-id=${p.id}
            aria-label=${`\uC120\uD589 ${p.id} \uC5F0\uACB0 \uD574\uC81C`}
            title="선행 연결 해제"
          >
            ✕
          </button></span
        >`)}${d.map(p=>l`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${p.id}
          title=${p.prefixes.join(`
`)}
        >
          ⧉ 겹침 ${p.id} (${p.location_label})
        </button>`)}${u?l`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip mon-overlap__chip--more"
          data-overlap-all="true"
          title=${o.slice(xo).map(p=>`${p.id} (${p.location_label})`).join(`
`)}
        >
          +${o.length-xo}
        </button>`:""}${a?l`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 스펙에 scope 선언 필요"
          >scope 없음</span
        >`:""}${r.map(p=>l`<span class="worker-dep worker-dep--succ" title=${p.title||""}
          >${p.label}</span
        >`)}${s.map(p=>l`<span class="worker-dep worker-dep--warn">${p}</span>`)}${i?fg(i):""}
  </div>`}function Rr(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?l`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function _g(e){let t=Array.isArray(e.badges)?e.badges:[],n=Ut(e.usage),r=En(e.usage),s=tn(e.done_at);return l`<div
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
            title=${`\uC644\uB8CC ${zt(e.done_at)}`}
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
              >`):r?l`<span class="worker-usage" title=${Vr(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?l`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${ds(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Bn(e){if(e.lane==="done"&&e.done_layout==="three_line")return _g(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Ut(e.usage),s=En(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,u=i?tn(e.done_at):"",d=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",g=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",w=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,x=e.lane==="done"?"":Rr(e.workflow),P=l`<span class="worker-mini__title">${e.title}</span>`,B=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",H=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",Q=n.map(q=>q===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${q}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${q===e.completion_badge&&e.completion_title||""}
          >${q}</span
        >`),D=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",M=r.length>0?r.map(q=>l`<span class="worker-usage" title=${q.tooltip}
              >${q.label}</span
            >`):s?l`<span class="worker-usage" title=${Vr(e.usage)}
            >${s}</span
          >`:"",N=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",j=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",E=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",I=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",Y=e.discard,$e=Y?.action||e.discard_action?l`<button
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
        </button>`:"",ie=e.stale_work||null,_e=ie?l`${ie.can_resume||ie.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ie.action_id}
            ?disabled=${ie.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ie.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ie.action_id}
            ?disabled=${ie.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ie.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ie.action_id}
            ?disabled=${ie.locked}
          >
            다시 확인
          </button>`:""}`:"",X=ie?l`<div class="worker-mini__stale">
        <strong>${ie.title}</strong>
        <span>${ie.summary}</span>
        <span>${ie.cause}</span>
        ${ie.can_backup_fresh?l`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Ie=e.revise_action?l`<button
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
        </button>`:"",ye=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${Co(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",ne=Cr(e.dependency_chips,{lane:e.lane}),se=us(e),Te=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||Y?.operation||e.revise_action||ie);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">${g}${w}${P}</div>
          <div class="worker-mini__row2">
            ${M}${u?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${zt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${ds(e.work_ms)}</span
                >`:""}${Q}${N}
            <span class="worker-mini__actions"
              >${j}${E}${I}${$e}</span
            >
            ${Tr(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${d}${p}${g}${w}${x}${B}${H}${Q}${_}${D}
            </div>
            <div class="worker-mini__body">${P}${X}</div>
            ${ne}${ye}${Te?l`<div class="worker-mini__foot">
                  ${M}${N}
                  <span class="worker-mini__actions"
                    >${j}${E}${I}${$e}${Ie}${_e}</span
                  >
                  ${us(e)}
                </div>`:""}
            ${Tr(e)}`:l`<div class="worker-mini__line">
              ${d}${p}${g}${w}${x}${P}${B}${H}${Q}${_}${D}${M}${N}${j}${E}${I}${$e}
            </div>
            ${ne}${ye}${se} ${Tr(e)}`}
  </div>`}function Qa(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),u=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),d=Cr(e.dependency_chips,{lane:e.lane});return l`<div
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
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r?l`<span
            class="ctl-chip worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >⛔ worker-ineligible</span
          >`:""}
      ${Rr(a)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?Gs(a,e.status):""}${d}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${Co(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?l`<div class="worker-card__place-menu">
            ${t.lanes.map(p=>l`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${p.id}
                  title="${p.label} 대기 맨 뒤에 추가"
                >
                  <span>${p.label}</span>
                  <span class="worker-card__place-count">${p.count}</span>
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
                  class="worker-card__reason${u?" worker-card__reason--danger":""}"
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
    ${Tr(e)}
  </div>`}function un(e){let t=!!e.collapsible&&!!e.collapsed,n=l`<span
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?Qa(r,e.place_menu):Bn(r))}
          </div>`}
  </section>`}var $u={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},xu={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Au(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Xa(e){for(let t of Au(e))if(Object.hasOwn($u,t))return $u[t];return null}function Ja(e){let t=null;for(let n of Au(e))Object.hasOwn(xu,n)&&(t=xu[n]);return t}function Ro(e){let t=Xa(e),n=Ja(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Su(e,t){let n=Xa(e)??Xa(t),r=Ja(t)??Ja(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Eu=160;function mg(e){return e.length>Eu?`${e.slice(0,Eu)}\u2026`:e}function gg(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${mg(e.command)}</code>`:""}
  </div>`}function hg(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function bg(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Tu(e){let t=e.failure?Ro(e.failure.reason):"";return l`<div class="worker-banners">
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
          ${gg(e.failure.cause_detail)}
          ${hg(e.failure.reason)}
          ${us({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function yg(e){return e?l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var vg=new Set(["codex-runner"]);function wg(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(g=>g&&!(typeof g.agent_type=="string"&&vg.has(g.agent_type))),u=i.filter(g=>g&&g.state==="live"),d=i.filter(g=>g&&g.state!=="live"),p=Cr(e.dependency_chips,{lane:"running"}),_=r?tn(r.updated_at,t):"";return l`${o?l`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?l`<span class="rtile__activity-age"
              >${tn(a,t)}</span
            >`:""}
      </div>`:_?l`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">갱신 ${_}</span>
        </div>`:""}${u.length>0||d.length>0?l`<div class="rtile__legs">
        ${u.map(g=>l`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${g.label}</span
            >`)}${d.length>0?l`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${d.map(g=>g.label).join(", ")}`}
              >위임 완료 ${d.length}</span
            >`:""}
      </div>`:""}${p}`}function ei(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?bg(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=zr(e),p=Ut(e.usage),_=En(e.usage),g=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,w=e.base_exception||null,x=e.landing,P=e.attempt_id&&e.attempt_id===n,B=r.monitor||null,H=yg(B),Q=wg(B,t,a,s?{updated_at:e.updated_at??null}:null),D=s&&e.workflow?.chips?.exec_receipt||null,M=D?l`<div class="rtile__meta">
        <span
          class="ctl-chip ctl-chip--exec-receipt"
          title=${`exec_receipt ${xn(D)}`}
          >${`${D.kind}:${Vs(D)}`}</span
        >
      </div>`:"",N=s?"":Tr(e),j=e.discard?.action?l`<button
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
      ${Rr(e.workflow)}${H}${d?l`<span class="rtile__resumed" title=${d}>↻</span>`:""}
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
              ${j}
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
              ${j}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${Q}${e.rollup?Hs(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ua}):""}
    ${x?l`<div class="rtile__landing">
          <span
            class="merge-step${x.failed?" merge-step--failed":""}"
            style=${`--progress: ${x.percent}%`}
            >${x.label}${x.index>0?l`<span class="merge-step__n"
                  >${x.index}/${x.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${s?M:u||p.length>0||_||g||w?l`<div class="rtile__meta">
            ${g?l`<span class="worker-mini__badge">${g}</span>`:""}
            ${w?l`<span
                  class="worker-mini__badge"
                  title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                  >${w}</span
                >`:""}
            ${Co(e.exec_chips)}
            ${p.length>0?p.map(E=>l`<span class="worker-usage" title=${E.tooltip}
                      >${E.label}</span
                    >`):_?l`<span
                    class="worker-usage"
                    title=${Vr(e.usage)}
                    >${_}</span
                  >`:""}
          </div>`:""}
    ${N} ${us(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ti(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(s=>ei(s,t,n))}
  </div>`}var ni=new Set(["unavailable","not_applicable"]);function Un(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Cu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Wn(e,t){return t===null?null:`${jn[e]}: ${t.display} (${vo[t.source]})`}function ri(e){return e.filter(t=>t!==null).join(`
`)}function Io(e){if(typeof e!="object"||e===null)return null;let t=nr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:ri(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(jn.orchestration_model,e.model),n(jn.orchestration_effort,e.effort),n(jn.orchestration_speed,e.speed)])}}function ar(e,t){let n=Un(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Un(e,"orchestration_effort"),s=Un(e,"orchestration_speed"),o=Cu([hn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:ri(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Wn("orchestration_model",n),Wn("orchestration_effort",r),Wn("orchestration_speed",s)])}}function kg(e,t){return e===null||e.value===null||ni.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function $g(e){return e===null||ni.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function xg(e){return e===null?null:e.value==="auto"?"auto":ni.has(e.resolution)?null:e.display}function zn(e,t){if(typeof e!="object"||e===null)return null;let n=Un(e,"impl_dispatch"),r=Un(e,"impl_runtime"),s=Un(e,"impl_model"),o=Un(e,"impl_effort"),a=Un(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":Cu([kg(r,t??null),$g(s),xg(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:ri(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Wn("impl_dispatch",n),Wn("impl_runtime",r),Wn("impl_model",s),Wn("impl_effort",o),Wn("impl_speed",a)])}}var Qt="",Ag=["impl_runtime","impl_model","impl_effort"],Sg=5,Oo=1;function Ln(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Lo(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(R=>ue(R,"error",4e3)),o={},a={},i=[],u=!1,d=null,p={},_="",g="",w=!1,x=!1,P=!1,B=null,H=!1;function Q(){let R=t.queue?t.queue():null;return Ln(R)?R:null}function D(){let R=Q();return R?R.runner_catalog:null}function M(){let R=Q();return R&&Ln(R.execution_defaults)?R.execution_defaults:null}function N(){let R=t.implPresetStore?.get();return Ln(R)&&Array.isArray(R.presets)?R:null}function j(){return r===null?{}:{root_dir:r}}async function E(R,Z){return H||!n?null:await n(R,Z)}function I(R){R&&Ln(R.queue)&&t.onQueueAdopt?.(R.queue)}async function Y(R,Z){let ge=Q();if(!ge||H)return null;let ee=await E(R,{...Z,...j(),expected_revision:ge.revision});if(I(ee),r!==null&&ee&&ee.conflict){let Le=ee.queue&&typeof ee.queue.revision=="number"?ee.queue.revision:Q()?.revision??ge.revision;ee=await E(R,{...Z,...j(),expected_revision:Le}),I(ee)}return ee}async function $e(){u=!0,de();try{let R=await E("get-session-defaults",{...j()});o=Ln(R?.values)?{...R.values}:{},a={...o},i=Array.isArray(R?.warnings)?R.warnings:[]}catch(R){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${R instanceof Error?R.message:String(R)}`)}finally{u=!1,de()}}async function ie(){let R=Yc(o,a);if(Object.keys(R).length!==0){try{let Z=await E("set-session-defaults",{values:R,...j()});o=Ln(Z?.values)?{...Z.values}:{},a={...o},i=Array.isArray(Z?.warnings)?Z.warnings:[]}catch(Z){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}de()}}function _e(R,Z){if(Ag.includes(R)){ye(R,Z);return}Z===Qt?delete a[R]:a[R]=Z,de(),ie()}function X(){let R=Ve().orchestration_model,Z=Zt({global:{orchestration_model:R??void 0},execution_defaults:M(),runner_catalog:D()}).orchestration_model.value;return Z?hn(D(),Z):null}function Ie(R,Z){typeof Z=="string"&&Z.length>0?a[R]=Z:delete a[R]}function ye(R,Z){let ge=Z===Qt?void 0:Z,ee=Vc({impl_runtime:R==="impl_runtime"?ge:a.impl_runtime,impl_model:R==="impl_model"?ge:a.impl_model,impl_effort:R==="impl_effort"?ge:a.impl_effort},D(),X());Ie("impl_runtime",ee.impl_runtime),Ie("impl_model",ee.impl_model),Ie("impl_effort",ee.impl_effort),de(),ie()}async function ne(){let R=Q();if(!R)return;let Z={orchestration_model:R.orchestration_model??null,orchestration_effort:R.orchestration_effort??null,orchestration_speed:R.orchestration_speed??null},ge=Zc(Z,{...Z,...p});if(Object.keys(ge).length!==0){try{let ee=await Y("worker-queue-set-orchestration-defaults",{values:ge});if(ee&&ee.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}p={}}catch(ee){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}de()}}function se(R,Z){p[R]=Z===Qt?null:Z,de(),ne()}function Te(R){if(d=R,!R){de();return}let Z=D(),ge=Ve(),ee=ge.orchestration_model;ee&&!ls(Z,R).includes(ee)&&(p.orchestration_model=null,ee=null);let Le=ge.orchestration_effort;Le&&!za(Z,R,ee||sn).includes(Le)&&(p.orchestration_effort=null),de(),ne()}async function q(R){if(!(!Q()||R<Oo)){try{await Y("worker-queue-set-slots",{slots:R})}catch(Z){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}de()}}async function oe(R){if(!(!Q()||R<Oo||R>Sg)){try{await Y("worker-queue-set-serial-lane-count",{count:R})}catch(Z){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}de()}}async function re(R,Z){let ge=R==="auto_advance"?"worker-automation-toggle":R==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await Y(ge,{on:Z})}catch(ee){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}de()}function xe(){let R={},Z=Ve();for(let ge of go){let ee=On.includes(ge)?Z[ge]:a[ge];typeof ee=="string"&&ee.length>0&&(R[ge]=ee)}return R}async function we(){let R=N();if(!R)return;let Z=xe();if(Object.keys(Z).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ge=(R.presets||[]).find(Le=>Le.id===_),ee=g.trim()||(ge?ge.name:"");if(!ee){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Le=ge?await E("impl-preset-update",{expected_revision:R.revision,id:ge.id,name:ee,settings:Z}):await E("impl-preset-create",{expected_revision:R.revision,name:ee,settings:Z});if(Le&&Le.applied){if(g="",!ge&&Array.isArray(Le.presets)){let tt=Le.presets.find(rt=>rt.name===ee);_=tt?tt.id:_}de()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),de()}catch(Le){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Le instanceof Error?Le.message:String(Le)}`)}}async function Oe(){let R=N();if(!(!R||_.length===0))try{let Z=await E("impl-preset-delete",{expected_revision:R.revision,id:_});Z&&Z.applied?(_="",de()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),de())}catch(Z){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}}function be(R){o=Ln(R.values)?{...R.values}:{},a={...o},i=Array.isArray(R.warnings)?R.warnings:[],Ln(R.queue)&&(t.onQueueAdopt?.(R.queue),p={})}async function Xe(){let R=N(),Z=Q();if(!R||!Z||_.length===0)return;let ge=ee=>({preset_id:_,expected_revision:R.revision,expected_queue_revision:ee,...j()});try{let ee=await E("apply-impl-preset-global",ge(Z.revision));if(ee&&ee.applied&&be(ee),r!==null&&ee&&ee.queue_applied===!1){let Le=ee.queue&&typeof ee.queue.revision=="number"?ee.queue.revision:Q()?.revision??Z.revision;ee=await E("apply-impl-preset-global",ge(Le)),ee&&ee.applied&&be(ee)}ee&&ee.applied?ee.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):ee&&ee.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(ee){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}de()}async function pt(){x=!0,P=!1,de();try{let R=await E("get-worker-system-prompt",{});!R||typeof R!="object"||Array.isArray(R)?P=!0:B=R}catch{P=!0}finally{x=!1,de()}}function C(){if(w=!w,w&&!B){pt();return}de()}function fe(){let R=xr({loading:x,error:P});if(R)return R;if(!B)return"";let Z=Array.isArray(B.variants)?B.variants:[];return l`<div class="settings-dialog__sp-body">
      ${B.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${B.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Z.map(ge=>l`<div class="settings-dialog__sp-variant" data-variant=${ge.key}>
            <div class="settings-dialog__sp-cond">${ge.condition}</div>
            ${In(ge.label,ge.system_prompt)}
          </div>`)}
    </div>`}function ke(){return l`<section
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
        aria-expanded=${w?"true":"false"}
        @click=${C}
      >
        ${w?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${w?fe():""}
    </section>`}function Ce(R,Z,ge,ee,Le,tt,rt){let Qe=Le[R]??Qt,ft=Ha(R,ge,Le,M(),D(),rt),ht=ft.options.find(lt=>lt.value===Qe),ut=Qe===Qt?ft.full_value:ht?.full_value;return l`<select
        class=${Qe===Qt?"settings-dialog__unset":""}
        data-key=${R}
        aria-label=${Z}
        title=${ut||""}
        ?disabled=${tt===!0||ft.disabled}
        .value=${or(String(Qe))}
        @change=${lt=>ee(R,String(lt.target.value))}
      >
        <option value=${Qt} ?selected=${Qe===Qt}>
          ${ft.unset_label}
        </option>
        ${ft.options.map(lt=>l`<option
              value=${lt.value}
              title=${lt.full_value||""}
              ?selected=${lt.value===Qe}
            >
              ${lt.label}
            </option>`)}
      </select>
      ${Qe===Qt?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function qe(R,Z,ge,ee,Le,tt=!1,rt){return l`<div
      class=${`settings-dialog__row${tt?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        ${Ce(R,Z,ge,ee,Le,tt,rt)}
      </span>
    </div>`}function Be(R,Z,ge,ee,Le){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Z}-on)`}
        ></i>
        ${R}
      </span>
      <span class="settings-dialog__controls">
        ${Ce(ge,`${R} \uBAA8\uB378`,ee,_e,a,!1)}
        ${Ce(Le,`${R} effort`,yo,_e,a,!1)}
      </span>
    </div>`}function W(R,Z,ge,ee){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${ee?" is-on":""}`}
          data-automation=${R}
          aria-pressed=${ee?"true":"false"}
          aria-label=${Z}
          @click=${()=>re(R,!ee)}
        >
          ${ee?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ge}</span>
      </span>
    </div>`}function V(R,Z,ge,ee){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${R}>
          <button
            type="button"
            aria-label=${`${Z} \uAC10\uC18C`}
            @click=${()=>ee(ge-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ge}</span>
          <button
            type="button"
            aria-label=${`${Z} \uC99D\uAC00`}
            @click=${()=>ee(ge+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ae(R){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${R.rows.length>0?`\uBCC0\uACBD ${R.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${R.rows.map(Z=>l`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${Z.kind}
          >
            <span class="settings-dialog__preset-diff-label">${Z.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${Z.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${Z.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${R.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${R.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Ve(){let R=Q(),Z={};for(let ge of On)Z[ge]=Object.prototype.hasOwnProperty.call(p,ge)?p[ge]:R&&typeof R[ge]=="string"?R[ge]:null;return Z}function We(){let R=D(),Z=a.impl_runtime,ge=a.impl_model,ee=N(),Le=Q(),tt=Ve(),rt=ls(R,d),Qe=Sr(R,void 0).filter(Fe=>Fe!==sn),ft=za(R,d,tt.orchestration_model||sn).filter(Fe=>Fe!==sn),ht=_?(ee?.presets||[]).find(Fe=>Fe.id===_):null,ut=ht?Kc(xe(),Ln(ht.settings)?ht.settings:{}):null,lt=Le&&typeof Le.slots=="number"?Le.slots:Oo+1,_t=Le&&typeof Le.serial_lane_count=="number"?Le.serial_lane_count:Oo,Ue=M()?.supported===!0,De=Ha("workflow_mode",as,a,M(),R);return l`
      ${i.length>0?l`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${Ue?"":l`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${u?l`<div class="settings-dialog__empty">불러오는 중…</div>`:l`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${or(_)}
                @change=${Fe=>{_=String(Fe.target.value),de()}}
              >
                <option value="" ?selected=${_===""}>
                  실행 프리셋…
                </option>
                ${(ee?.presets||[]).map(Fe=>l`<option
                      value=${Fe.id}
                      ?selected=${Fe.id===_}
                    >
                      ${Fe.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!ut||ut.rows.length===0}
                @click=${Xe}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${_?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${or(g)}
                @input=${Fe=>{g=String(Fe.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${_?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${we}
              >
                ${_?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${_.length===0}
                @click=${Oe}
              >
                삭제
              </button>
            </div>
            ${ut?Ae(ut):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${or(d||Qt)}
                    @change=${Fe=>{let mt=String(Fe.target.value);Te(mt===Qt?null:mt)}}
                  >
                    <option value=${Qt} ?selected=${!d}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${d==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${d==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${qe("orchestration_model","\uBAA8\uB378",rt,se,tt)}
              ${qe("orchestration_effort","effort",ft,se,tt)}
              ${qe("orchestration_speed","\uC18D\uB3C4",os,se,tt)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Qt}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>_e("workflow_mode",Qt)}
                    >
                      ${De.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${as.map(Fe=>l`<button
                          type="button"
                          data-mode=${Fe}
                          aria-pressed=${String(a.workflow_mode===Fe)}
                          @click=${()=>_e("workflow_mode",Fe)}
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
              ${Be("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",is,"spec_review_effort")}
              ${Be("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",bo,"plan_review_effort")}
              ${Be("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",is,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${qe("impl_runtime","\uC704\uC784 \uB300\uC0C1",ho,_e,a)}
              ${qe("impl_model","\uBAA8\uB378",Sr(R,Z),_e,a)}
              ${qe("impl_effort","effort",Er(R,Z,ge),_e,a)}
              ${qe("impl_speed","\uC18D\uB3C4",os,_e,a)}
              ${qe("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Qe,_e,a,!1,{...a,...tt})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${W("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",Le?.auto_advance===!0)}
              ${W("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",Le?.auto_merge===!0)}
              ${W("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",Le?.auto_repair===!0)}
              ${V("slots","\uB3D9\uC2DC \uC2E4\uD589",lt,Fe=>q(Fe))}
              ${V("serial-lane-count","\uC9C1\uB82C \uB808\uC778",_t,Fe=>oe(Fe))}
            </div>
            ${ke()}
          `}
    `}function de(){H||Ge(We(),e)}return{load(){return p={},$e()},render:de,sessionDraft:()=>({...a}),destroy(){H=!0,Ge(l``,e)}}}function fs(e){return l`<svg
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
  </svg>`}function Ru(){return fs(fr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Iu(){return fs(fr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ou(){return fs(fr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Lu(){return fs(fr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Mu(){return fs(fr`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Pu(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Du(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Ut(Xs(t));let n={};for(let i of Sn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let u=i&&i.usage;if(u&&typeof u=="object"){let d=!1;for(let p of Sn){let _=u[p];typeof _=="number"&&Number.isFinite(_)&&(n[p]+=_,r=!0,d=!0)}if(d){o+=1;let p=u.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?En(n):null}function bn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ir(e,t){let n=bn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Eg(e,t){if(!bn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function Tg(e){if(!bn(e)||!bn(e.execution_defaults)||!bn(e.runner_catalog)||!bn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=Zt({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=hn(e.runner_catalog,n.orchestration_model.value??""),s=ar(n,e.runner_catalog),o=zn(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Nu(e,t){let n=t.notify||(q=>ue(q,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let u=document.createElement("div");u.className="mon2-deck__panel-body",s.append(o,u),e.appendChild(s);let d=null,p=null,_=null,g=new Map;function w(){let q=t.workspacesState?t.workspacesState():[];return Array.isArray(q)?q.filter(oe=>bn(oe)):[]}function x(q){return w().find(oe=>oe.root_dir===q)||null}function P(q){return Eg(x(q),g.get(q))}function B(){for(let q of w()){let oe=g.get(q.root_dir);oe&&typeof oe.revision=="number"&&typeof q.revision=="number"&&q.revision>=oe.revision&&g.delete(q.root_dir)}}async function H(q,oe,re){let xe=t.transport,we=P(oe);if(!(!xe||!bn(we))){try{let Oe=await xe(q,{...re,root_dir:oe,expected_revision:we.revision});if(bn(Oe?.queue)&&g.set(oe,Oe.queue),Oe&&Oe.conflict){let be=bn(Oe.queue)&&typeof Oe.queue.revision=="number"?Oe.queue.revision:P(oe)?.revision;Oe=await xe(q,{...re,root_dir:oe,expected_revision:be}),bn(Oe?.queue)&&g.set(oe,Oe.queue)}}catch(Oe){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Oe instanceof Error?Oe.message:String(Oe)}`)}ne()}}function Q(q){d!==q&&(d=q,t.onFocusChange?.(d),ne())}function D(q){Q(d===q?null:q)}function M(q){if(p===q){j();return}N(),p=q;let oe=x(q);a.textContent=`${oe?.name||q} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,_=Lo(u,{root_dir:q,queue:()=>P(q),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:re=>{g.set(q,re),ne()}}),_.load(),ne()}function N(){_?.destroy(),_=null}function j(q){N(),p=null,s.hidden=!0,a.textContent="",q!==!0&&ne()}let E=()=>j();i.addEventListener("click",E);function I(q){q.key==="Escape"&&d!==null&&Q(null)}document.addEventListener("keydown",I);function Y(q,oe){let re=Math.max(oe,q,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${oe}\uAC1C \uC911 ${q}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:re},(xe,we)=>we<q?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function $e(q){let oe=q.auto_advance===!0,re=q.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${oe?" is-on":""}`}
        data-act="auto"
        aria-pressed=${oe?"true":"false"}
        aria-label=${`${q.name} \uC790\uB3D9\uD654`}
        title=${oe?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${oe?Iu():Ru()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${re?" is-on":""}`}
        data-act="merge"
        aria-pressed=${re?"true":"false"}
        aria-label=${`${q.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${re?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Ou()}
        <span class="mon2-deck__op-label">머지</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${p===q.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${p===q.root_dir?"true":"false"}
        aria-label=${`${q.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Mu()}
      </button>`}function ie(q){let oe=Tg(q);return oe?l`<div class="mon2-deck__chips">
      ${oe.orchestration?l`<span class="mon2-deck__chip" title=${oe.orchestration.title}
            >오케 ${oe.orchestration.text}</span
          >`:""}
      ${oe.worker?l`<span class="mon2-deck__chip" title=${oe.worker.title}
            >워커 ${oe.worker.text}</span
          >`:""}
    </div>`:""}function _e(q){let oe=Ir(q,"running"),re=typeof q.slots=="number"?q.slots:1;return l`<div
      class=${`mon2-deck__tile${d===q.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${q.root_dir}
      aria-pressed=${d===q.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${q.root_dir}>${q.name}</span>
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
        ${Lu()} ${Y(oe,re)}
        <span class="mon2-deck__counts"
          >${oe}/${re} 실행 · 대기 ${Ir(q,"queue")} · PR
          ${Ir(q,"pr_wait")}${Ir(q,"session_active")>0?` \xB7 \uC138\uC158 ${Ir(q,"session_active")}`:""}</span
        >
      </div>
      <div class="mon2-deck__ops">${$e(q)}</div>
      ${ie(q)}
    </div>`}function X(q){let oe=t.doneItems?t.doneItems():[],re=t.rangeLabel?t.rangeLabel():"",xe=Du(Array.isArray(oe)?oe:[]),we=Oe=>q.reduce((be,Xe)=>be+Ir(Xe,Oe),0);return l`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${q.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${re}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${we("running")} · 대기 ${we("queue")} · PR
        ${we("pr_wait")}${we("session_active")>0?` \xB7 \uC138\uC158 ${we("session_active")}`:""}
        · ${re} 완료
        ${Array.isArray(oe)?oe.length:0}
      </div>
      ${xe===null?"":l`<div class="mon2-deck__total-tokens">
            ${typeof xe=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${Pu(re)}
                  >τ ${xe}</span
                >`:xe.map(Oe=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${Oe.provider}
                      title=${Oe.tooltip}
                      >τ ${Oe.label}</span
                    >`)}
          </div>`}
    </div>`}function Ie(){let q=w();return q.length===0?"":l`<div class="mon2-deck__row">
      ${X(q)}
      <div class="mon2-deck__strip">
        ${q.map(oe=>_e(oe))}
      </div>
    </div>`}function ye(){d!==null&&!x(d)&&(d=null,t.onFocusChange?.(null))}function ne(){B(),ye(),p!==null&&!x(p)&&j(!0),Ge(Ie(),r),_?.render()}function se(q){let oe=q.target;if(!oe||typeof oe.closest!="function")return;let re=oe.closest("[data-root-dir]");if(!re)return;let xe=re.getAttribute("data-root-dir")||"",we=oe.closest("[data-act]")?.getAttribute("data-act");if(we==="worker"){t.gotoWorkerTab?.(xe);return}if(we==="auto"){H("worker-automation-toggle",xe,{on:P(xe)?.auto_advance!==!0});return}if(we==="merge"){H("worker-merge-auto-toggle",xe,{on:P(xe)?.auto_merge!==!0});return}if(we==="gear"){M(xe);return}D(xe)}function Te(q){if(q.key!=="Enter"&&q.key!==" ")return;let oe=q.target;if(!oe||typeof oe.closest!="function")return;let re=oe.closest('[data-root-dir][role="button"]');!re||re!==oe||(q.preventDefault(),D(re.getAttribute("data-root-dir")||""))}return r.addEventListener("click",se),r.addEventListener("keydown",Te),{render:ne,focusRoot:()=>d,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",I),r.removeEventListener("click",se),r.removeEventListener("keydown",Te),i.removeEventListener("click",E),N(),Ge(l``,r),e.replaceChildren()}}}var Cg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Rg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694";function si(e,t){return`${e}\0${t}`}function Ig(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Og(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Lg(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Mg(e,t){let n=new Set(t),r=new Map,s=new Map;for(let i of n){let u=Array.from(new Set((e.get(i)||[]).filter(d=>d!==i&&n.has(d))));r.set(i,u.length);for(let d of u){let p=s.get(d);p?p.push(i):s.set(d,[i])}}let o=[],a=Array.from(n).filter(i=>r.get(i)===0).sort();for(;a.length>0;){let i=a.shift();o.push(i);for(let u of(s.get(i)||[]).slice().sort()){let d=(r.get(u)||0)-1;r.set(u,d),d===0&&a.push(u)}}for(let i of t)o.includes(i)||o.push(i);return o}function Pg(e,t){let n=new Set;for(let[a,i]of t)for(let u of i)n.add(si(a,u));let r=new Map,s=new Map;for(let a of e){let i=si(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=si(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Dg(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Ng(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function oi(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function qu(e,t,n){let r=Og(n.blocked_by_map),s=[],o=null,a=w=>{let x=n.owner_of.get(w);return typeof x!="string"||x.length===0?(o=Ig(w),null):x},i=(w,x)=>{if(o!==null||w===x)return;let P=r.get(w)||[];if(!P.includes(x))return;let B=a(w);B!==null&&(r.set(w,P.filter(H=>H!==x)),s.push({type:"dep-remove",a:w,b:x,root_dir:B}))},u=(w,x)=>{if(o!==null||w===x)return;let P=r.get(w)||[];if(P.includes(x))return;let B=a(w);if(B!==null){if(Lg(r,x,w)){o=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${w}\uAC00 \uC774\uBBF8 ${x}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}r.set(w,[...P,x]),s.push({type:"dep-add",a:w,b:x,root_dir:B})}},d=()=>{let w=n.lane_order.get(e.lane_id||"")||[],x=new Set(w),P=(r.get(e.bead_id)||[]).filter(H=>x.has(H)),B=w.filter(H=>(r.get(H)||[]).includes(e.bead_id));for(let H of P)i(e.bead_id,H);for(let H of B)i(H,e.bead_id);for(let H of P)for(let Q of B)u(Q,H);return w.filter(H=>H!==e.bead_id)},p=(w,x)=>{let P=n.lane_order.get(w)||[],B=P.indexOf(e.bead_id),H=Mg(r,P.filter(N=>N!==e.bead_id)),Q=w.startsWith("pending:")?H.length:Math.max(0,Math.min(H.length,B>=0&&x>B?x-1:x)),D=Q>0?H[Q-1]:null,M=Q<H.length?H[Q]:null;if(D===null){M!==null&&u(M,e.bead_id);return}u(e.bead_id,D),M!==null&&(r.get(M)||[]).includes(D)&&(i(M,D),u(M,e.bead_id))},_=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Cg};if(t.kind==="chain"&&e.kind==="repo-serial")return{refused:Rg};if(e.kind==="chain"&&d(),t.kind==="chain"&&p(t.lane_id,t.marker_index),o!==null)return{refused:o};let g=[];if(t.kind==="candidate")e.kind!=="candidate"&&g.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=Dg(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")g.push(oi(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let x=n.parallel_rows,P=x[Math.max(0,Math.min(x.length,t.marker_index))];if(!(!!P&&P.bead_id===e.bead_id)&&Ng(n,e.root_dir)&&_!==void 0){let H=_>w?w:w-1;H>=0&&H!==_&&g.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:H},root_dir:e.root_dir})}}}else if(t.kind==="chain")e.kind==="candidate"&&g.push(oi(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0));else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(_!==void 0&&t.index!==_){let w=_>t.index?t.index:t.index-1;w>=0&&w!==_&&g.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else g.push(oi(e.bead_id,e.root_dir,t.index,t.lane_id));return{ops:[...Pg(s,n.blocked_by_map),...g]}}var Fu={running:3,paused:2,failed:1};function ju(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let p=t.get(a.bead_id),_=typeof p=="number"&&p>0&&typeof a.finished_at=="number"&&p>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!_&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let u=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let p=Fu[d.run_state],_=Fu[i];if(p>_||p===_&&(d.started_at??0)>(u??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:u})}return{winners:o,resumed_from_ids:r}}function Mo(e){return e.replace(/\/+$/,"")}function qg(e,t){let n=Mo(e),r=Mo(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Bu(e,t){let n=new Set;for(let r of e)for(let s of t){if(!qg(r,s))continue;let o=Mo(r),a=Mo(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var Uu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],_s=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Po(e,t){let n=Uu.find(s=>s.step===e);if(!n)return null;let r=Uu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Wu(e){let t=_s.findIndex(n=>n.step===e);return _s.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function ir(e){let t=_s.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Fg(e){let t=_s.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:_s.length}}function Do(e){let t=Fg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ii=new Set(["queued","running","retry_pending","repairing"]),zu=new Set(["failed","succeeded"]),jg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},ms={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Bg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:ms.base_containment,child_sweep:ms.child_sweep,branch_cleanup:ms.branch_cleanup,parent_close:ms.parent_close};function Ug(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Wg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...ii,...zu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function zg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=d=>d.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",u=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(u)}function ai(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=jg[s];if(!o)return null;let a=Po(n,`${r} ${o}`);return a?{...a,active:ii.has(s),failed:s==="failed"}:null}function Hg(e){return!e||typeof e!="object"?null:Bg[e.step]||null}function gs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Hg(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=Ug(e.merge_sha)?e.merge_sha:null,u=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(x=>x&&typeof x=="object"&&Wg(x,t,i)).sort(zg):[],d=a?u:[],p=d.find(x=>ii.has(x.state));if(p)return ai(p);if(s)return s.step==="repo_operations"&&u[0]?ai(u[0],!0):null;let _=d.find(x=>zu.has(x.state)?x.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return ai(_);if(r){let x=Po(r.step,r.label);return x?{...x,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?ms[e.cleanup_cursor]:null;if(!g)return null;let w=Po(g.step,g.label);return w?{...w,active:!0,failed:!1}:null}function No(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function li(e,t){return`${e}\0${t}`}function Hu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function ci(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Gg(e,t){return e==="internal"&&t===void 0}function Or(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Gu(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Or(s)})`,location_label:Or(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=ci(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:Gg(a,s)}}function Vu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let u of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=li(i.root_dir,u.id);n.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:u.id}),s.set(d,[]);for(let p of Array.isArray(u.items)?u.items:[])r.set(p.id,d)}for(let i of t)for(let u of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=li(i.root_dir,u.id),p=Array.isArray(u.items)?u.items[0]:null,g=!!p&&p.queue_index===0&&(!Array.isArray(u.occupied_by)||u.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],w=s.get(d);if(w)for(let x of g){let P=r.get(x);P&&P!==d&&!w.includes(P)&&w.push(P)}}let o=(i,u)=>{let d=new Set,p=[i];for(;p.length>0;){let _=p.pop();if(_===u)return!0;!_||d.has(_)||(d.add(_),p.push(...s.get(_)||[]))}return!1},a=new Map;for(let[i,u]of s){let d=[];for(let p of u){let _=n.get(p);o(p,i)&&_&&d.push(_)}d.length>0&&a.set(i,d)}return a}function Ku(e,t){return li(e,t)}var Yu=1,hs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],di=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Lr={show_blocked:!0,spec:"all"},Zu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Vg(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Kg(e,t){let{winners:n,resumed_from_ids:r}=ju(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,u=a.run_state,d=a.started_at,p=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:u,started_at:d,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:ln(e,i.bead_id),can_pause:u==="running"&&p,can_resume:u!=="running"&&p&&!r.has(i.attempt_id)})}return s}function Qu(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function kt(e){return e&&typeof e=="object"?e:{}}function Yg(e,t,n){let r=kt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=g=>Zt({pin:g,global:a,execution_defaults:s,runner_catalog:o,route:n}),u,d;try{u=i(r),d=i(null)}catch{return null}let p=Xu(ar(u,o),ar(d,o)),_=Xu(zn(u,null),zn(d,null));return p||_?{orchestration:p,worker:_}:null}function Xu(e,t){return!e||t&&t.text===e.text?null:e}function Zg(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function Qg(e,t){let n=t.get(e);return n?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${Or(n)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function Xg(e,t,n){let r=new Map;for(let u of e)r.set(u,Array.from(n.get(u)||[]).filter(d=>e.includes(d)).length);let s=[],o=new Map,a=e.filter(u=>(r.get(u)||0)===0).sort();for(let u of a)o.set(u,0);let i=[...a];for(;i.length>0;){let u=i.shift();s.push(u);let d=Array.from(t.get(u)||[]).filter(_=>e.includes(_)).sort(),p=(o.get(u)||0)+(d.length>1?1:0);for(let _ of d){let g=(r.get(_)||0)-1;r.set(_,g);let w=o.get(_);o.set(_,w===void 0?p:Math.min(w,p)),g===0&&i.push(_)}}return{order:s,indent:o,cycle:s.length!==e.length}}function Jg(e,t,n){let r=new Map,s=new Map,o=new Set,a=(p,_,g)=>{let w=p.get(_);w?w.add(g):p.set(_,new Set([g]))},i=p=>t.get(p)?.lane==="done";for(let[p,_]of e)if(!i(p))for(let g of _)g===p||i(g)||(o.add(g),o.add(p),a(r,g,p),a(s,p,g));let u=new Set,d=[];for(let p of Array.from(o).sort()){if(u.has(p))continue;let _=[],g=[p];for(u.add(p);g.length>0;){let D=g.pop();_.push(D);for(let M of[...r.get(D)||[],...s.get(D)||[]])u.has(M)||(u.add(M),g.push(M))}if(_.length<2)continue;let w=_.map(D=>t.get(D));if(w.every(D=>!!D&&/^s[1-5]$/.test(D.lane||""))&&w.every(D=>D&&w[0]&&D.root_dir===w[0].root_dir&&D.lane===w[0].lane))continue;let{order:P,indent:B,cycle:H}=Xg(_.slice().sort(),r,s),Q=H?_.slice().sort():P;d.push({key:_.slice().sort().join("\0"),cycle:H,nodes:Q.map(D=>{let M=t.get(D);return{id:D,workspace_name:M?M.workspace_name:"",root_dir:M?M.root_dir:"",location_label:M?Or(M):Ju(D,n),indent:H?0:B.get(D)||0}})})}return d}function Ju(e,t){let n=ci(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function ed(e,t,n){let r=t.get(e);if(!r)return Ju(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Or(r)}function eh(e,t,n){let r=[];for(let s of n.get(e)||[])s!==e&&t.has(s)&&!r.includes(s)&&r.push(s);return r}function th(e,t,n,r,s,o,a){let i=(_,g,w,x,P=!1)=>{let B=r.get(_),H=B&&B.lane==="parallel"&&typeof B.position=="number"?B.position-1:null;return{id:_,title:o.get(_)||_,workflow:a.get(_)||null,root_dir:B?B.root_dir:"",workspace_name:B?B.workspace_name:"",seq:g,indent:w,predecessors:x,location_label:ed(_,r,s),draggable:!P&&H!==null,...H!==null?{queue_index:H}:{}}},u=[];for(let _ of e.slice().sort((g,w)=>g.key<w.key?-1:1)){let g=new Set(_.nodes.map(w=>w.id));u.push({lane_id:`chain:${_.key}`,label:"",pending:!1,cycle:_.cycle,rows:_.nodes.map((w,x)=>i(w.id,x+1,_.cycle?0:w.indent,_.cycle?[]:eh(w.id,g,n),_.cycle))})}let d=new Set;for(let _ of u)for(let g of _.rows)d.add(g.id);let p=[];return t.forEach((_,g)=>{let w=_&&typeof _.seed=="string"&&_.seed.length>0?_.seed:null;w!==null&&d.has(w)||(p.push(g),u.push({lane_id:`pending:${g}`,label:"",pending:!0,cycle:!1,rows:w===null?[]:[i(w,1,0,[])]}))}),u.forEach((_,g)=>{_.label=`\uC5F0\uACB0 ${g+1} \xB7 \uB808\uD3EC \uAC04`}),{chain_lanes:u,pending_lanes_kept:p}}function nh(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:e.spec_id?"missing":void 0}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function rh(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:u,state:d}=nh(i,t,n);if(d!==void 0&&(i.scope_state=d),u.length===0)continue;let p=o.get(i.root_dir);p?p.push({item:i,scope:u}):o.set(i.root_dir,[{item:i,scope:u}])}let a=(i,u,d)=>{let p={id:u.id,title:u.title,location_label:ed(u.id,r,s),prefixes:d};i.overlap_chips?i.overlap_chips.push(p):i.overlap_chips=[p]};for(let i of o.values())for(let u=0;u<i.length;u+=1)for(let d=u+1;d<i.length;d+=1){let p=Bu(i[u].scope,i[d].scope);p.length!==0&&(a(i[u].item,i[d].item,p),a(i[d].item,i[u].item,p))}}function ui(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function qo(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function pi(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...Lr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&hs.some(C=>C.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let C of s)C&&typeof C.root_dir=="string"&&u.set(C.root_dir,C);let d=[],p=[],_=[],g=[],w=[],x=[],P=new Map,B=new Map,H=new Map,Q=new Map,D=new Map,M=new Map,N=new Map,j=new Map,E=new Map;for(let C of r){if(!C||typeof C.root_dir!="string")continue;let fe=C.root_dir,ke=C.name||fe,Ce=u.get(fe),qe=Ce&&typeof Ce.revision=="number"?Ce.revision:typeof C.revision=="number"?C.revision:0,Be=kt(C.attempts),W=kt(C.bead_titles);for(let[k,O]of Object.entries(W))typeof O=="string"&&O.length>0&&j.set(k,O);let V=kt(C.bead_times),Ae=kt(C.pr_observations),Ve=kt(C.admission),We=kt(C.revise_parked),de=kt(C.merge_queue_state),R=kt(C.cleanup_failed),Z=kt(C.discard_operations),ge=kt(C.bead_blocked_by);Object.hasOwn(C,"bead_scope")&&M.set(fe,kt(C.bead_scope));let ee=kt(C.bead_workflow);for(let[k,O]of Object.entries(ee))O&&typeof O=="object"&&E.set(k,O);let Le=kt(C.pr_activity),tt=Array.isArray(C.repo_operations)?C.repo_operations:[],rt=Array.isArray(C.merge_queue)?C.merge_queue:[],Qe=new Set(rt.filter(k=>k&&typeof k.bead_id=="string").map(k=>k.bead_id)),ft=new Map(rt.filter(k=>k&&typeof k.bead_id=="string").map(k=>[k.bead_id,k])),ht=Array.isArray(C.queue)?C.queue:[],ut=(Array.isArray(C.serial_lanes)?C.serial_lanes:[]).filter(k=>k&&/^s[1-5]$/.test(k.id)&&Array.isArray(k.entries)),lt=kt(C.lane_states),_t=typeof C.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(C.serial_lane_count))):Math.min(5,ut.length);H.set(fe,_t),Q.set(fe,ht.length);let Ue=new Map(ut.map(k=>[k.id,k])),De=new Map;for(let k of ut)for(let O of k.entries)O&&typeof O.bead_id=="string"&&De.set(O.bead_id,k.id);for(let[k,O]of Object.entries(ge))Array.isArray(O)&&D.set(k,O.filter(ae=>typeof ae=="string"&&ae.length>0));let Fe=Array.isArray(C.done)?C.done:[];for(let k of Fe)k&&typeof k.bead_id=="string"&&x.push({id:k.bead_id,root_dir:fe,workspace_name:ke});let mt=new Map;for(let k of Fe)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&mt.set(k.bead_id,k.added_at);let ct=k=>({id:k,title:W[k]||k,root_dir:fe,workspace_name:ke,expected_revision:qe,draggable:!1,...kt(V[k]).created_at?{created_at:kt(V[k]).created_at}:{},...kt(V[k]).updated_at?{updated_at:kt(V[k]).updated_at}:{}}),G=new Set;for(let[k,O]of Kg(Be,mt))G.add(k),p.push({...ct(k),lane:"running",...De.has(k)?{serial_lane_id:De.get(k)}:{},attempt_id:O.attempt_id,run_state:O.run_state,status:O.status||void 0,workflow:ee[k]||null,can_pause:O.can_pause,can_resume:O.can_resume,started_at:O.started_at,last_event_at:O.last_event_at,last_activity:O.last_activity,legs:O.legs,runner:O.runner,model:O.model,effort:O.effort,speed:O.speed,resumed_from:O.resumed_from,continuation_mode:O.continuation_mode,usage:O.usage,exec_chips:{orchestration:Io(O),worker:null},discard:kn(Z,k,{attempt_id:O.attempt_id}),badges:O.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:O.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:O.run_state==="failed"});for(let k of Array.isArray(C.session_active)?C.session_active:[]){let O=k&&k.bead_id;typeof O!="string"||G.has(O)||(G.add(O),Array.isArray(k.blocked_by)&&k.blocked_by.length>0&&D.set(O,k.blocked_by.filter(ae=>typeof ae=="string"&&ae.length>0)),typeof k.title=="string"&&k.title.length>0&&j.set(O,k.title),k.workflow&&typeof k.workflow=="object"&&E.set(O,k.workflow),p.push({...ct(O),title:k.title||W[O]||O,lane:"running",kind:"session",status:"in_progress",started_at:ui(k.started_at)??ui(k.updated_at)??void 0,updated_at:ui(k.updated_at)??void 0,workflow:k.workflow||null,labels:Array.isArray(k.labels)?k.labels:[],spec_id:typeof k.spec_id=="string"?k.spec_id:"",blocked:k.blocked===!0,...Array.isArray(k.blocked_by)?{blocked_by:k.blocked_by.filter(ae=>typeof ae=="string"&&ae.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let k of Array.isArray(C.pr_wait)?C.pr_wait:[]){let O=k&&k.bead_id;if(typeof O!="string"||G.has(O))continue;G.add(O);let ae=kt(Ae[O]),le=kt(ae.pr),te=ae.gate?kt(ae.gate):null,he=Qe.has(O),at=ft.get(O)?.continuation_action||null,Ke=!!at&&at.continuation===null,He=de.active===O,bt=k.external===!0,$t=R[O]||null,Ne=kt(Le[O]),Et=gs({bead_id:O,merge_sha:k.merge_sha,cleanup_cursor:k.cleanup_cursor,merge_progress:Ne.merge_progress||null,cleanup_failed:$t,repo_operations:tt}),jt=No(Et),Nt=!!te&&te.base_badge==="\uCDA9\uB3CC",Mt=!!$t&&["child_sweep","branch_cleanup","parent_close"].includes($t.step)&&!!te&&te.tier==="merged",qt=bt&&!!$t&&!!te&&te.tier==="merged",Tt=!!te&&["closed_unmerged","review","undecidable"].includes(te.tier),Ot=kn(Z,O,{external:bt,merge_active:He||Et?.step==="merge",merge_queued:he,cleanup_active:jt,merged:!!$t||te?.tier==="merged"}),Bt=!!Ot.operation;_.push({...ct(O),lane:"pr_wait",workflow:ee[O]||null,pr_number:typeof le.number=="number"?le.number:null,pr_url:typeof le.url=="string"?le.url:void 0,external:bt,usage:ln(Be,O),merge_step:Et,badges:Ke?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Et?[te?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:$t?[ir($t.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${ir($t.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof te?.gate_badge=="string"&&te.gate_badge.length>0?[te.gate_badge]:[],alert:Et?Et.failed===!0:!!$t||Tt,reason:$t&&Et?.active!==!0?Do($t.step):"PR \uB300\uAE30",merge_action:te?.tier==="merged"&&!Mt&&!qt?!1:!he||Ke,merge_enabled:!Bt&&(Ke||te?.enabled===!0||Nt||Mt||qt),merge_label:Ke?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":qt||Mt?"\uC815\uB9AC \uC7AC\uAC1C":Nt&&!Mt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ke?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Bt?Ot.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ot.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ot.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:qt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Mt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Nt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":te?.enabled===!0?`\uBA38\uC9C0 (${te.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${te?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:he&&!Ke,cancel_enabled:!He,continuation_mismatch:at?.mismatch||null,discard:Ot,discard_action:Ot.action,discard_enabled:Ot.enabled,discard_title:Ot.title})}let pe=(k,O,ae,le)=>{let te=k&&k.bead_id;if(typeof te!="string"||G.has(te))return null;G.add(te);let he=We[te],at=kn(Z,te),Ke=at.operation?at:null,He={...ct(te),lane:O,workflow:ee[te]||null,draggable:!Ke,discard:Ke||void 0,reason:Qu(Ve,te),seq:ae+1,queue_position:ae+1,queue_index:ae,queue_length:le,badges:he?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!he,revise_action:!!he,revise_enabled:!!he&&!Ke,revise_title:he?he.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${he.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(ge,te)&&(He.blocked_by=Array.isArray(ge[te])?ge[te].filter(bt=>typeof bt=="string"&&bt.length>0):[]),He};for(let k=0;k<ht.length;k++){let O=pe(ht[k],"queue",k,ht.length);if(!O)continue;g.push(O);let ae=P.get(fe);ae?ae.push(O):P.set(fe,[O])}let Me=k=>{let O=_.find(te=>te.id===k&&te.root_dir===fe);if(O)return{id:k,title:O.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let ae=p.find(te=>te.id===k&&te.root_dir===fe),le=ae&&ae.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ae&&ae.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:k,title:ae?ae.title:ct(k).title,badge:le}},S=[];for(let k=0;k<Math.max(_t,ut.length);k++){let O=`s${k+1}`,ae=Ue.get(O),le=ae&&Array.isArray(ae.entries)?ae.entries:[],te=[];for(let Ke=0;Ke<le.length;Ke++){let He=pe(le[Ke],O,Ke,le.length);He&&(te.push(He),g.push(He))}let he=kt(lt[O]),at=Array.isArray(he.occupied_by)?he.occupied_by.filter(Ke=>typeof Ke=="string"):[];te.length===0&&at.length===0&&(_t<=1||k>=_t)||S.push({id:O,index:k,items:te,raw_length:le.length,occupied_by:at,occupants:at.map(Ke=>Me(Ke)),corrections:Array.isArray(he.corrections)?he.corrections.length:0,cycle:he.cycle===!0,...te.length===0&&at.length===0?{empty:!0}:{}})}B.set(fe,S);let L=Array.from({length:_t},(k,O)=>{let ae=`s${O+1}`,le=Ue.get(ae),te=le&&Array.isArray(le.entries)?le.entries:[],he=kt(lt[ae]);return{id:ae,index:te.length,length:te.length,occupied_by:Array.isArray(he.occupied_by)?he.occupied_by.filter(at=>typeof at=="string"):[]}});for(let k of Array.isArray(C.runnable)?C.runnable:[]){let O=k&&k.bead_id;if(typeof O!="string"||G.has(O))continue;G.add(O);let ae=k.workflow&&typeof k.workflow=="object"?k.workflow:null,le=ae&&typeof ae.route=="string"&&ae.route||(typeof k.route=="string"?k.route:null),te=Yg(kt(Ce),k.exec_pins,le);Array.isArray(k.blocked_by)&&k.blocked_by.length>0&&D.set(O,k.blocked_by.filter(he=>typeof he=="string"&&he.length>0)),typeof k.title=="string"&&k.title.length>0&&j.set(O,k.title),ae&&E.set(O,ae),Array.isArray(k.scope)&&N.set(O,k.scope.filter(he=>typeof he=="string"&&he.length>0)),d.push({...ct(O),title:k.title||W[O]||O,lane:"runnable",draggable:!0,reason:Qu(Ve,O),created_at:k.created_at??void 0,updated_at:k.updated_at??void 0,status:typeof k.status=="string"?k.status:void 0,labels:Array.isArray(k.labels)?k.labels:[],spec_id:typeof k.spec_id=="string"?k.spec_id:"",workflow:ae||(le?{route:le,chips:{route:le}}:null),...te?{exec_chips:te}:{},blocked:k.blocked===!0,...Array.isArray(k.blocked_by)?{blocked_by:k.blocked_by.filter(he=>typeof he=="string"&&he.length>0)}:{},place_index:ht.length,place_lanes:L})}for(let k of Fe){let O=k&&k.bead_id;if(typeof O!="string"||G.has(O)||(G.add(O),o!==void 0&&typeof k.added_at=="number"&&k.added_at<o))continue;let ae=Vg(Be,O),le=ae&&typeof ae.done_kind=="string"?ae.done_kind:null;w.push({...ct(O),lane:"done",done:!0,done_layout:"three_line",usage:ln(Be,O),work_ms:So(Be,O),done_at:typeof k.added_at=="number"?k.added_at:void 0,done_kind:le,badges:le&&Zu[le]?[Zu[le]]:[]})}}let I=new Map;s.forEach((C,fe)=>{C&&typeof C.root_dir=="string"&&I.set(C.root_dir,fe)});let Y=n&&n.running_sort==="repo"?"repo":"started";p.sort((C,fe)=>{let ke=C.kind==="session",Ce=fe.kind==="session";if(ke!==Ce)return ke?1:-1;if(ke&&Ce){let W=qo(fe.updated_at)-qo(C.updated_at);return W!==0?W:C.id.localeCompare(fe.id)}if(Y==="repo"){let W=I.get(C.root_dir)??Number.MAX_SAFE_INTEGER,V=I.get(fe.root_dir)??Number.MAX_SAFE_INTEGER;if(W!==V)return W-V}let qe=typeof C.started_at=="number"&&Number.isFinite(C.started_at)?C.started_at:null,Be=typeof fe.started_at=="number"&&Number.isFinite(fe.started_at)?fe.started_at:null;return qe!==null&&Be!==null&&qe!==Be?qe-Be:qe===null&&Be!==null?1:qe!==null&&Be===null?-1:C.id.localeCompare(fe.id)}),w.sort((C,fe)=>(fe.done_at??0)-(C.done_at??0));let $e=s.length>0?s:r.map(C=>({root_dir:C&&C.root_dir,name:C&&C.name,auto_advance:C&&C.auto_advance,auto_merge:C&&C.auto_merge,slots:C&&C.slots,revision:C&&C.revision,runner_catalog:C&&C.runner_catalog})),ie=new Set(d.map(C=>C.root_dir)),_e=[];for(let C of $e){if(!C||typeof C.root_dir!="string")continue;let fe=P.get(C.root_dir)||[],ke=B.get(C.root_dir)||[];!(fe.length>0||ke.some(qe=>qe.items.length>0||qe.occupied_by.length>0))&&!ie.has(C.root_dir)||_e.push({root_dir:C.root_dir,name:C.name||C.root_dir,auto_advance:C.auto_advance===!0,auto_merge:C.auto_merge===!0,slots:typeof C.slots=="number"&&C.slots>=Yu?C.slots:Yu,revision:typeof C.revision=="number"?C.revision:0,runner_catalog:kt(C.runner_catalog),items:fe,sublanes:{parallel:fe,serial:ke},serial_lane_count:H.get(C.root_dir)||0,raw_queue_length:Q.get(C.root_dir)||0})}let X={runnable:d,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:g,queue_groups:_e,running:p,pr_wait:_,done:w,chains:[],parallel_rows:[],chain_lanes:[],parallel_raw_length:Object.fromEntries(Q),owner_of:{},pending_lanes_kept:[]},Ie=Hu(X);for(let C of x)Ie.has(C.id)||Ie.set(C.id,{root_dir:C.root_dir,workspace_name:C.workspace_name,lane:"done",state:"done"});let ye=new Map;for(let[C,fe]of D)for(let ke of fe){let Ce=ye.get(ke);Ce?Ce.includes(C)||Ce.push(C):ye.set(ke,[C])}for(let C of[...X.queue,...X.runnable]){if(!Object.hasOwn(C,"blocked_by"))continue;let fe=Ie.get(C.id);C.blockers=(C.blocked_by||[]).map(ke=>Gu(ke,fe,Ie,s)),C.blocker_warnings=C.blockers.filter(ke=>ke.missing_internal).map(ke=>`\u26A0 \uC120\uD589 ${ke.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),C.blocker_warnings.length>0&&(C.alert=!0)}for(let C of[...X.queue,...X.runnable,...X.running,...X.pr_wait]){let fe=C.lane==="running"||C.lane==="pr_wait"?[]:(C.blockers||[]).map(Zg),ke=[];for(let Be of ye.get(C.id)||[]){let W=Qg(Be,Ie);W&&ke.push(W)}let Ce=C.lane==="running"||C.lane==="pr_wait"?[]:C.blocker_warnings||[];if(fe.length===0&&ke.length===0&&Ce.length===0)continue;let qe={predecessors:fe,successors:ke,warnings:Ce};C.dependency_chips=qe}rh(X,M,N,Ie,s),X.chains=Jg(D,Ie,s);let ne=Vu(X.queue_groups);for(let C of X.queue_groups)for(let fe of C.sublanes.serial){let ke=ne.get(Ku(C.root_dir,fe.id));ke&&(fe.cross_wait_peers=ke)}let se=th(X.chains,Array.isArray(n?.pending_lanes)?n.pending_lanes:[],D,Ie,s,j,E);X.chain_lanes=se.chain_lanes,X.pending_lanes_kept=se.pending_lanes_kept;let Te=new Map;for(let C of[...X.running,...X.queue,...X.runnable])Te.has(C.id)||Te.set(C.id,C);let q=new Set;for(let C of X.chain_lanes)for(let fe of C.rows){q.add(fe.id);let ke=Te.get(fe.id);ke&&(ke.overlap_chips&&(fe.overlap_chips=ke.overlap_chips),ke.scope_state&&(fe.scope_state=ke.scope_state))}let oe=[];for(let C of P.values())for(let fe of C)q.has(fe.id)||oe.push(fe);oe.sort((C,fe)=>{let ke=C.workspace_name.localeCompare(fe.workspace_name);return ke!==0?ke:(C.queue_index??0)-(fe.queue_index??0)}),X.parallel_rows=oe;let re={};for(let[C,fe]of Ie)typeof fe.root_dir=="string"&&fe.root_dir.length>0&&(re[C]=fe.root_dir);X.owner_of=re;let xe=X.runnable.length,we=X.runnable;a.show_blocked||(we=we.filter(C=>C.blocked!==!0));let Oe=we.length;a.spec==="with"?we=we.filter(C=>!!C.spec_id):a.spec==="without"&&(we=we.filter(C=>!C.spec_id)),X.runnable_hidden={blocked:xe-Oe,spec:Oe-we.length};let be=(C,fe)=>{let ke=qo(fe.updated_at)-qo(C.updated_at);return ke!==0?ke:C.id.localeCompare(fe.id)},pt=i==="repo_spec"?(C,fe)=>{let ke=C.spec_id?0:1,Ce=fe.spec_id?0:1;return ke!==Ce?ke-Ce:be(C,fe)}:be;if(i==="updated_flat")X.runnable=we.slice().sort(be),X.runnable_sections=[];else{let C=new Map;for(let Ce of we){let qe=C.get(Ce.root_dir);qe?qe.push(Ce):C.set(Ce.root_dir,[Ce])}let fe=[],ke=[];for(let Ce of $e){if(!Ce||typeof Ce.root_dir!="string")continue;let qe=(C.get(Ce.root_dir)||[]).slice().sort(pt);C.delete(Ce.root_dir),qe.length!==0&&(fe.push({root_dir:Ce.root_dir,name:Ce.name||Ce.root_dir,items:qe.map(Be=>({...Be,workspace_name:""}))}),ke.push(...qe))}for(let[Ce,qe]of C){let Be=qe.slice().sort(pt);fe.push({root_dir:Ce,name:Be[0]?.workspace_name||Ce,items:Be.map(W=>({...W,workspace_name:""}))}),ke.push(...Be)}X.runnable=ke,X.runnable_sections=fe}return X}var td="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function nd(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function rd(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var id="bdui.monitor.done-range",ld="bdui.monitor.running_sort",cd="bdui.monitor.candidate_sort",ud="beads-ui.monitor.candidate-filter",dd="beads-ui.monitor.sections";function sh(){try{let e=window.localStorage.getItem(ud);if(!e)return{...Lr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Lr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Lr.show_blocked,spec:di.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Lr}}}function sd(e){try{window.localStorage.setItem(ud,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function oh(){try{let e=window.localStorage.getItem(cd);return hs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function ah(e){try{window.localStorage.setItem(cd,e)}catch{}}function ih(){try{let e=window.localStorage.getItem(dd);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function od(e){try{window.localStorage.setItem(dd,JSON.stringify(e))}catch{}}function lh(){try{let e=window.localStorage.getItem(id);return an(e)?e:en}catch{return en}}function ch(e){try{window.localStorage.setItem(id,e)}catch{}}function uh(){try{return window.localStorage.getItem(ld)==="repo"?"repo":"started"}catch{return"started"}}function dh(e){try{window.localStorage.setItem(ld,e)}catch{}}var pd="tab:monitor:pipeline",ph=1e3,fh=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],ad="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function _h(e){return e>=1&&e<=ad.length?ad[e-1]:`(${e})`}function fd(e,t){let n=At("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(y=>typeof globalThis.confirm!="function"||globalThis.confirm(y)),_=lh(),g=uh(),w=sh(),x=oh(),P=ih(),B=null,H=null,Q=null,D=[],M=null;function N(){let y=Dn.find(b=>b.value===_);return y?y.label:""}let j=document.createElement("div");j.className="mon",e.appendChild(j);let E=document.createElement("div");E.className="mon2-drawer",e.appendChild(E);let I=pi(null,null),Y=new Map,$e=new Map,ie=null,_e=null,X=null,Ie=Ar(E,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{B=null,De()}});async function ye(y,b,c,m,$=!0){if(!o||!c)return null;let f=await o(y,{...b,root_dir:c,expected_revision:m});if(f&&f.conflict&&$){f.queue&&$e.set(c,f.queue);let h=f.queue&&typeof f.queue.revision=="number"?f.queue.revision:m;f=await o(y,{...b,root_dir:c,expected_revision:h})}return f&&f.queue&&c&&$e.set(c,f.queue),f}function ne(y,b){let c=$e.get(y),m=s&&s.get?s.get():null,$=(Array.isArray(m)?m:[]).find(h=>h?.root_dir===y);return(c||$)?.merge_queue?.find(h=>h.bead_id===b)?.continuation_action}async function se(y,b,c,m){let $=await ye(y,b,c,m),f=$e.get(c)?.revision??$?.queue?.revision??m;return An($,(h,z)=>ye(y,{...b,continuation:h,decision_token:z},c,f,!1),{refresh:h=>ye(y,b,c,h?.queue?.revision??$e.get(c)?.revision??f,!1)})}async function Te(y,b,c,m){let $=await An({continuation_mismatch:m},(h,z)=>ye("worker-merge-queue-add",{bead_id:b,continuation:h,decision_token:z},y,c,!1)),f=$?.queue?.merge_queue?.find(h=>h.bead_id===b)?.continuation_action;$?.applied!==!0&&f?.continuation===null&&f.mismatch&&await Te(y,b,$.queue.revision,f.mismatch)}async function q(y,b,c){let m=await ye("worker-discard",y,b,c);if(m&&m.discarded===!0){ue(To(m),"success",5e3);return}if(m&&m.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${m.reason}`,"error");return}if(m&&m.accepted&&m.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(m&&m.accepted){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${m.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}m&&!m.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function oe(y,b,c){return!o||!c?null:await o(y,{...b,root_dir:c})}async function re(){let y=new Map;for(let b of I.pr_wait)y.has(b.root_dir)||y.set(b.root_dir,b.expected_revision);for(let[b,c]of y)await ye("worker-merge-queue-add-all",{},b,c)}function xe(y){let b=P[y];return!!(b&&b.runnable===!0)}function we(y){let b={...P[y]||{}};b.runnable=!b.runnable,P={...P,[y]:b},od(P),De()}function Oe(y){return P[y]===!0}function be(y){P={...P,[y]:P[y]!==!0},od(P),De()}function Xe(y){let b=I.queue_groups.find(c=>c.root_dir===y);if(!b)return null;for(let c=0;c<b.serial_lane_count;c+=1){let m=`s${c+1}`,$=b.sublanes.serial.find(f=>f.id===m);if(!$||$.raw_length===0&&$.occupied_by.length===0)return m}return null}function pt(y,b){let c=I.queue_groups.find($=>$.root_dir===y),m=c?c.sublanes.serial.find($=>$.id===b):void 0;return m?m.raw_length:0}function C(y,b){let c=Y.get(y),m=Y.get(b);if(!c||!m)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let $=nd(c),f=nd(m);if($!==null&&$===f&&c.root_dir===m.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let h=rd(c),z=rd(m);if(h&&f!==null){let K=f;return{kind:"ops",title:`${K} \uB05D\uC5D0 ${y}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:m.root_dir,ops:[{bead_id:y,lane:K,index:pt(m.root_dir,K)}]}}if($!==null&&z&&f===null){let K=$;return{kind:"ops",title:`${K} \uB05D\uC5D0 ${b}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:c.root_dir,ops:[{bead_id:b,lane:K,index:pt(c.root_dir,K)}]}}if(h&&$===null&&z&&f===null){let K=Xe(c.root_dir);return K===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${K} \uB808\uC778\uC5D0 ${b} \u2192 ${y} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:c.root_dir,ops:[{bead_id:b,lane:K,index:0},{bead_id:y,lane:K,index:1}]}}return!h&&!z?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:h?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function fe(y,b){let c=C(y,b.id);return{id:b.id,title:b.title,location_label:b.location_label,prefixes:b.prefixes,action:c.kind==="note"?{kind:"note",text:c.text}:c.kind==="disabled"?{kind:"disabled",label:td,title:c.title}:{kind:"place",label:td,title:c.title}}}function ke(y,b){if(!Q||Q.bead_id!==y)return null;let c=Q.counterpart_id,m=c===null?b:b.filter($=>$.id===c);return m.length===0?null:{rows:m.map($=>fe(y,$))}}function Ce(y){let b=y.dependency_chips||null,c=y.overlap_chips||[],m=y.scope_state==="missing";if(!b&&c.length===0&&!m)return null;let $=ke(y.id,c);return{...b||{},...c.length>0?{overlaps:c}:{},...m?{scope_missing:!0}:{},...$?{popover:$}:{}}}function qe(y){let b=Ce(y);return b?{...y,dependency_chips:b}:y}async function Be(y,b){let c=C(y,b);if(Q=null,c.kind!=="ops"){De();return}let m=le(c.root_dir,c.ops[0].bead_id);for(let $ of c.ops){let f=await W($,c.root_dir,m);if(f===null)break;m=f}De()}async function W(y,b,c){try{let m=await ye("worker-queue-place",y,b,c,!1);if(m&&m.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!m||m.applied!==!0)return ue(m&&typeof m.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${m.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let $=m.queue?m.queue.revision:void 0;return typeof $!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):$}catch(m){return ue(L(m),"error"),null}}function V(y){let b=xe(y.root_dir);return l`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${y.root_dir}
        data-section="runnable"
        aria-expanded=${b?"false":"true"}
        aria-label=${`${y.name} \uC139\uC158 ${b?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${b?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${y.root_dir}>${y.name}</span>
      <span class="mon2-sec__count">${y.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${y.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Ae(y,b){return l`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="candidate"
      data-root-dir=${y.root_dir}
    >
      ${b}
    </div>`}function Ve(y){if(H!==y.id)return null;let b=I.queue_groups.find(m=>m.root_dir===y.root_dir),c=y.place_lanes||[];return{bead_id:y.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:y.place_index??0},...I.chain_lanes.map((m,$)=>({id:`lane:${$}`,label:`\uC5F0\uACB0 ${$+1} \uB05D\uC5D0`,count:m.rows.length})),{id:"new-lane",label:"\uC0C8 \uC5F0\uACB0 \uB808\uC778",count:0},...c.map(m=>({id:`serial:${m.id}`,label:`${b?b.name:""} \uC9C1\uB82C ${Number(m.id.slice(1))}`,count:m.length}))]}}function We(y){return Ae(y,Qa(qe(y),Ve(y),{exec_chips_mode:"pinned_only"}))}function de(){return I.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${I.runnable.map(y=>We(y))}
      </div>`:l`${I.runnable_sections.map(y=>{let b=xe(y.root_dir);return l`<section
        class="mon2-sec${b?" is-collapsed":""}"
        data-root-dir=${y.root_dir}
        data-section="runnable"
      >
        ${V({root_dir:y.root_dir,name:y.name,count:y.items.length})}
        ${b?"":l`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${y.items.map(c=>We(c))}
            </div>`}
      </section>`})}`}function R(y,b){return l`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="parallel"
      data-root-dir=${y.root_dir}
      data-row-index=${b}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${Bn(qe(y))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${y.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${y.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${y.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
    </div>`}function Z(){let y=Oe("parallel");return l`<section
      class="mon2-area mon2-parallel${y?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${y?"false":"true"}
          aria-label=${`\uBCD1\uB82C \uC601\uC5ED ${y?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${y?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${I.parallel_rows.length}</span>
      </header>
      ${y?"":l`<div class="mon2-area__body" data-drop="parallel">
            ${I.parallel_rows.length===0?l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:I.parallel_rows.map((b,c)=>R(b,c))}
          </div>`}
    </section>`}function ge(y,b,c){return l`<div
      class="mon2-crow"
      style=${`--indent: ${b.indent}`}
      draggable=${b.draggable?"true":"false"}
      data-bead-id=${b.id}
      data-drag-kind="chain"
      data-root-dir=${b.root_dir}
      data-lane-id=${y.lane_id}
      data-row-index=${c}
      data-queue-index=${typeof b.queue_index=="number"?String(b.queue_index):""}
    >
      ${y.cycle?"":l`<span class="mon2-crow__seq" aria-hidden="true"
            >${_h(b.seq)}</span
          >`}
      ${b.workspace_name?l`<span class="worker-mini__repo" title=${b.root_dir}
            >${b.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${b.id}</span>
      ${Rr(b.workflow)}
      <span class="mon2-crow__title">${b.title}</span>
      ${b.predecessors.map(m=>l`<span class="worker-dep worker-dep--pred"
            ><span class="worker-dep__label">← ${m}</span></span
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
      ${Cr(Ce(b),{lane:Y.get(b.id)?.lane})}
    </div>`}function ee(y){return l`<div class="mon2-clane" data-lane-id=${y.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${y.label}</span>
        <span class="mon2-clane__count">${y.rows.length}</span>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${y.lane_id}
      >
        ${y.cycle?l`<div class="mon2-lane__cycle">
              ⛔ 의존 사이클 — 자동 교정 불가
            </div>`:""}
        ${y.rows.length===0?l`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:y.rows.map((b,c)=>ge(y,b,c))}
      </div>
    </div>`}function Le(y,b,c){return l`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="repo-serial"
      data-root-dir=${b.root_dir}
      data-lane-id=${y.id}
      data-row-index=${c}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${Bn(qe(b))}
    </div>`}function tt(y){if(y.length===0)return"";let b=y.length-1;return`${y[0].id} \uC810\uC720${b>0?` +${b}`:""}`}function rt(y){return l`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${y.id}
    >
      ${Bn({id:y.id,title:y.title,lane:"running",draggable:!1,ghost:!0,badges:[y.badge]})}
    </div>`}function Qe(y,b){return l`<div
      class="mon2-lane${b.empty?" mon2-lane--empty":""}"
      data-root-dir=${y.root_dir}
      data-lane-length=${String(b.raw_length)}
    >
      ${un({id:"",lane:b.id,title:`${y.name} \xB7 \uC9C1\uB82C ${b.index+1}`,items:b.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:l`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${y.root_dir}
          data-lane-id=${b.id}
          data-lane-length=${String(b.raw_length)}
        >
          ${b.occupants.map(c=>rt(c))}
          ${b.items.length>0?b.items.map((c,m)=>Le(b,c,m)):b.occupants.length>0?"":l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:l`<span
            class="mon2-lane__badge${b.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${b.occupants.length>0?b.occupants.map(c=>`${c.id} \u2014 ${c.badge}`).join(`
`):""}
            >${tt(b.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${y.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${b.empty?l`<div class="mon2-lane__hint">
            ${y.name} 직렬 ${b.index+1} 비어 있음
          </div>`:""}
      ${b.cycle?l`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(b.cross_wait_peers||[]).map(c=>l`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${c.workspace_name}·${c.lane}과 교차 대기
          </div>`)}
    </div>`}function ft(){let y=Oe("serial"),b=I.chain_lanes.some(c=>c.pending&&c.rows.length===0);return l`<section
      class="mon2-area mon2-serial${y?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${y?"false":"true"}
          aria-label=${`\uC9C1\uB82C \uC601\uC5ED ${y?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${y?"\u25B8":"\u25BE"}
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
      ${y?"":l`<div class="mon2-area__body">
            ${I.chain_lanes.map(c=>ee(c))}
            ${I.queue_groups.map(c=>c.sublanes.serial.map(m=>Qe(c,m)))}
          </div>`}
    </section>`}function ht(){return l`<div class="mon2-wait">${Z()}${ft()}</div>`}function ut(y){return l`<div class="worker-rungrid">
      ${I.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:I.running.map(b=>ei({bead_id:b.id,attempt_id:b.attempt_id||"",title:b.title,runner:b.runner??null,model:b.model??null,effort:b.effort??null,speed:b.speed??null,started_at:b.started_at??null,kind:b.kind,...b.kind==="session"?{updated_at:b.updated_at}:{},workflow:b.workflow||null,resumed_from:b.resumed_from??null,continuation_mode:b.continuation_mode??null,paused:b.run_state==="paused",failed:b.run_state==="failed",status:b.status,status_label:b.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:b.can_resume!==!1,can_pause:b.can_pause!==!1,exec_chips:b.exec_chips||null,usage:b.usage||null,discard:b.discard},y,B,{monitor:{repo:b.workspace_name,root_dir:b.root_dir,serial_lane_id:b.serial_lane_id,last_activity:b.last_activity||null,legs:b.legs||[],dependency_chips:Ce(b)}}))}
    </div>`}function lt(y){let b={runnable:I.runnable,queue:I.queue,running:I.running,pr_wait:I.pr_wait,done:I.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${fh.map(c=>{let m=b[c.lane],$=c.lane==="runnable"?I.runnable_flat?m.length>0?de():void 0:I.runnable_sections.length>0?de():void 0:c.lane==="queue"?I.queue_groups.length>0||I.chain_lanes.length>0||I.parallel_rows.length>0?ht():void 0:c.lane==="running"?ut(y):m.length>0?l`${m.map(f=>Bn(f))}`:void 0;return un({id:`monitor-${c.lane}`,lane:c.pane,title:c.lane==="done"?`\uC644\uB8CC\xB7${N()}`:c.title,items:m,empty:c.empty,body:$,live:c.lane==="running"&&m.length>0,controls:c.lane==="runnable"?_t():void 0,header_control:Ue(c.lane,m.length)})})}
      </div>`}function _t(){return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${w.show_blocked}
        />
        🔒
        blocked${I.runnable_hidden.blocked>0?` ${I.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${di.map(y=>l`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${w.spec===y.value?" is-active":""}"
              data-spec=${y.value}
              aria-pressed=${w.spec===y.value?"true":"false"}
            >
              ${y.label}
            </button>`)}
        ${I.runnable_hidden.spec>0?l`<span class="worker-filter__hidden"
              >숨김 ${I.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Ue(y,b){return y==="runnable"?l`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${x}
      >
        ${hs.map(c=>l`<option
              value=${c.value}
              ?selected=${x===c.value}
            >
              ${c.label}
            </option>`)}
      </select>`:y==="running"?l`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${g}
      >
        <option value="started" ?selected=${g==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${g==="repo"}>
          레포순
        </option>
      </select>`:y==="pr_wait"&&b>0?l`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:y==="done"?l`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${_}
      >
        ${Dn.map(c=>l`<option value=${c.value} ?selected=${_===c.value}>
              ${c.label}
            </option>`)}
      </select>`:""}function De(){let y=s&&s.get?s.get():null,b=s&&s.getWorkspacesState?s.getWorkspacesState():[],c=d(),m=()=>pi(y,b,{done_since:Jn(_,c),running_sort:g,candidate_filter:w,candidate_sort:x,pending_lanes:D});I=m(),I.pending_lanes_kept.length!==D.length&&(D=I.pending_lanes_kept.map($=>D[$]),I=m()),Y=new Map;for(let $ of[...I.runnable,...I.queue,...I.running,...I.pr_wait,...I.done])Y.has($.id)||Y.set($.id,$);Ge(lt(c),j),mt()?.render(),Fe(),ct()}function Fe(){let y=new Map;for(let b of I.queue_groups)y.set(b.root_dir,b.auto_advance);for(let b of Array.from(j.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let c=b.closest(".mon2-item")?.getAttribute("data-root-dir")||"",m=y.get(c);typeof m=="boolean"&&b.setAttribute("title",`${b.textContent||""} \xB7 ${m?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function mt(){if(X)return X;let y=j.querySelector(".mon2-deck");return y?(X=Nu(y,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>I.done,rangeLabel:N,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:pe,onFocusChange:b=>{M=b,ct()}}),X):null}function ct(){j.classList.toggle("has-focus",M!==null);for(let y of Array.from(j.querySelectorAll(".mon2-sec[data-root-dir]")))y.classList.toggle("is-focus",M!==null&&y.getAttribute("data-root-dir")===M);for(let y of Array.from(j.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let b=Y.get(y.getAttribute("data-bead-id")||"");y.classList.toggle("is-focus",M!==null&&!!b&&b.root_dir===M)}for(let y of Array.from(j.querySelectorAll(".mon2-crow[data-root-dir]")))y.classList.toggle("is-focus",M!==null&&y.getAttribute("data-root-dir")===M)}function G(y,b){let c=a?a():void 0;if(!b||!c||b===c||!i){r(y);return}i(b).then(()=>{r(y)}).catch(m=>{n("workspace switch for %s failed: %o",b,m)})}function pe(y){if(!y)return;let b=a?a():void 0,c=()=>{try{u?.gotoView("worker")}catch(m){n("gotoView(worker) failed: %o",m)}};if(!i||b&&b===y){c();return}i(y).then(c).catch(m=>{n("workspace switch for %s failed: %o",y,m),ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Me(y){nn(y).then(b=>{ue(b?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",b?"success":"error",1400)})}function S(y){let b=Y.get(y)||null;return{item:b,root_dir:b?b.root_dir:"",revision:b?b.expected_revision:0}}function L(y){if(typeof y=="string"&&y.length>0)return y;if(y&&typeof y=="object"){let b=y;if(typeof b.message=="string"&&b.message.length>0)return b.message;if(typeof b.error=="string"&&b.error.length>0)return b.error;if(b.error&&typeof b.error=="object"&&typeof b.error.message=="string")return b.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function k(y,b,c){let{root_dir:m}=S(b);if(!(!b||!c||c===b))try{await oe(y,{a:b,b:c},m)}catch($){ue(L($),"error")}}function O(){let y=new Map,b=s&&s.get?s.get():null,c=m=>Array.isArray(m)?m.filter($=>typeof $=="string"&&$.length>0):[];for(let m of Array.isArray(b)?b:[]){if(!m||typeof m!="object")continue;let $=m.bead_blocked_by&&typeof m.bead_blocked_by=="object"?m.bead_blocked_by:{};for(let[f,h]of Object.entries($))Array.isArray(h)&&y.set(f,c(h));for(let f of[...Array.isArray(m.runnable)?m.runnable:[],...Array.isArray(m.session_active)?m.session_active:[]])f&&typeof f.bead_id=="string"&&Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&y.set(f.bead_id,c(f.blocked_by))}return y}function ae(){let y=new Map;for(let c of I.chain_lanes)y.set(c.lane_id,c.rows.map(m=>m.id));let b=new Map;for(let c of I.parallel_rows)typeof c.queue_index=="number"&&b.set(c.id,c.queue_index);for(let c of I.queue_groups)for(let m of c.sublanes.serial)for(let $ of m.items)typeof $.queue_index=="number"&&b.set($.id,$.queue_index);return{blocked_by_map:O(),owner_of:new Map(Object.entries(I.owner_of)),lane_order:y,parallel_rows:I.parallel_rows.map(c=>({bead_id:c.id,root_dir:c.root_dir,queue_index:c.queue_index??0})),parallel_raw_length:new Map(Object.entries(I.parallel_raw_length)),queue_index_of:b}}function le(y,b){let c=Y.get(b);if(c&&c.root_dir===y)return c.expected_revision;let m=I.queue_groups.find($=>$.root_dir===y);return m?m.revision:0}async function te(y,b){try{if(y.type==="worker-queue-place"||y.type==="worker-queue-reorder"||y.type==="worker-queue-remove"){let c=await ye(y.type,y.payload,y.root_dir,le(y.root_dir,b));return c&&c.conflict?(ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):c&&c.applied===!1?(ue(c.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${c.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0}return(y.type==="dep-add"||y.type==="dep-remove")&&await oe(y.type,{a:y.a,b:y.b},y.root_dir),!0}catch(c){return ue(L(c),"error"),!1}}async function he(y,b){let c=qu(y,b,ae());if("refused"in c){ue(c.refused,"error");return}if(b.kind==="chain"){let m=I.chain_lanes.find(f=>f.lane_id===b.lane_id),$=m&&m.pending&&m.rows.length===0?Number(m.lane_id.slice(8)):-1;$>=0&&D[$]&&(D=D.map((f,h)=>h===$?{seed:y.bead_id}:f))}for(let m of c.ops)if(!await te(m,y.bead_id))break;De()}async function at(y,b){let c=Y.get(y);if(!c){De();return}let m={kind:"candidate",bead_id:y,root_dir:c.root_dir};if(b==="new-lane"){D.some(f=>f.seed===null)||(D=[...D,{seed:null}]),De();let $=I.chain_lanes.find(f=>f.pending&&f.rows.length===0);if(!$)return;await he(m,{kind:"chain",lane_id:$.lane_id,marker_index:0});return}if(b.startsWith("lane:")){let $=I.chain_lanes[Number(b.slice(5))];if(!$){De();return}await he(m,{kind:"chain",lane_id:$.lane_id,marker_index:$.rows.length});return}if(b.startsWith("serial:")){let $=b.slice(7),f=(c.place_lanes||[]).find(h=>h.id===$);await he(m,{kind:"repo-serial",root_dir:c.root_dir,lane_id:$,index:f?f.index:0});return}await he(m,{kind:"parallel",marker_index:I.parallel_rows.length})}async function Ke(y,b){let c=I.parallel_rows,m=c.findIndex(Ee=>Ee.id===y);if(m<0)return;let $=c[m].root_dir,f=[];c.forEach((Ee,ve)=>{Ee.root_dir===$&&f.push(ve)});let h=f.indexOf(m),z=f[h+b];if(typeof z!="number")return;let K=b===-1?z:f[h+2]??Math.min(c.length,z+1);await he({kind:"parallel",bead_id:y,root_dir:$,queue_index:c[m].queue_index??0},{kind:"parallel",marker_index:K})}async function He(y){for(let b of I.chain_lanes){let c=b.rows.find(m=>m.id===y);if(!(!c||!c.draggable)){await he({kind:"chain",bead_id:y,root_dir:c.root_dir,lane_id:b.lane_id,...typeof c.queue_index=="number"?{queue_index:c.queue_index}:{}},{kind:"parallel",marker_index:I.parallel_rows.length});return}}}let bt=null,$t=!1,Ne=null;function Et(){Ne!==null&&clearTimeout(Ne),Ne=setTimeout(()=>{Ne=null,$t=!1},0)}function jt(y,b){let c=b&&typeof b.closest=="function"?b.closest("[data-row-index]"):null;if(c&&y.contains(c)){let m=Number(c.getAttribute("data-row-index"));return Number.isFinite(m)?m:0}return y.querySelectorAll("[data-row-index]").length}function Nt(y){let b=y.target,c=typeof b?.closest=="function"?b.closest("[data-drop]"):null;if(!c||!bt)return null;let m=c.getAttribute("data-drop");if(m==="candidate")return{zone:c,target:{kind:"candidate"}};if(m==="parallel")return{zone:c,target:{kind:"parallel",marker_index:jt(c,b)}};if(m==="chain")return{zone:c,target:{kind:"chain",lane_id:c.getAttribute("data-lane-id")||"",marker_index:jt(c,b)}};if(m==="repo-serial"){let $=c.getAttribute("data-root-dir")||"";if($!==bt.root_dir)return null;let f=typeof b?.closest=="function"?b.closest("[data-queue-index]"):null,h=f&&c.contains(f)?f.getAttribute("data-queue-index"):c.getAttribute("data-lane-length"),z=Number(h);return{zone:c,target:{kind:"repo-serial",root_dir:$,lane_id:c.getAttribute("data-lane-id")||"",index:Number.isFinite(z)?z:0}}}return null}function Mt(){for(let y of Array.from(j.querySelectorAll(".is-drop-over")))y.classList.remove("is-drop-over")}function qt(y){let b=y.target,c=typeof b?.closest=="function"?b.closest('[draggable="true"][data-bead-id]'):null,m=c?c.closest("[data-drag-kind]"):null;if(!m)return;let $=m.getAttribute("data-bead-id")||"",f=m.getAttribute("data-drag-kind")||"",h=m.getAttribute("data-root-dir")||"";if(!$||!f||!h)return;let z=m.getAttribute("data-queue-index")||"",K=Number(z),Ee=m.getAttribute("data-lane-id")||"";bt={kind:f,bead_id:$,root_dir:h,...z!==""&&Number.isFinite(K)?{queue_index:K}:{},...Ee?{lane_id:Ee}:{}},$t=!0,H=null,j.classList.add("is-dragging");try{y.dataTransfer?.setData("text/plain",$),y.dataTransfer&&(y.dataTransfer.effectAllowed="move")}catch{}}function Tt(y){let b=Nt(y);b&&(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"),b.zone.classList.add("is-drop-over"))}function Ot(y){let b=y.target;typeof b?.closest=="function"&&b.closest("[data-drop]")?.classList.remove("is-drop-over")}function Bt(){bt=null,Mt(),j.classList.remove("is-dragging"),Et()}function Xt(y){let b=Nt(y),c=bt;bt=null,Mt(),j.classList.remove("is-dragging"),!(!b||!c)&&(y.preventDefault(),he(c,b.target))}function et(y){return{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.run_state==="running"?"running":y.run_state,worktree:y.root_dir}}function Wt(y,b){let{item:c,root_dir:m,revision:$}=S(b),f=c?.attempt_id||"",h=y.classList;if(h.contains("worker-dep__remove")){k("dep-remove",b,y.dataset.blockerId||"");return}if(h.contains("mon2-rowops__up")||h.contains("mon2-rowops__down")){Ke(b,h.contains("mon2-rowops__up")?-1:1);return}if(h.contains("mon2-rowops__remove")){ye("worker-queue-remove",{bead_id:b},m,$);return}if(h.contains("mon2-crow__detach")){He(b);return}if(h.contains("mon-overlap__chip")){let z=y.getAttribute("data-overlap-all")==="true"?null:y.getAttribute("data-overlap-id")||"";Q=!!Q&&Q.bead_id===b&&Q.counterpart_id===z?null:{bead_id:b,counterpart_id:z},De();return}if(h.contains("mon-overlap__place")){Be(b,y.getAttribute("data-counterpart-id")||"");return}if(h.contains("worker-card__place")){H=H===b?null:b,De();return}if(h.contains("worker-card__place-cancel")){H=null,De();return}if(h.contains("worker-card__place-lane")){let z=y.getAttribute("data-lane")||"parallel";H=null,at(b,z);return}if(h.contains("rtile__session")){B=f,f&&c&&Ie.open({attempt_id:f,root_dir:m,meta:et(c)}),De();return}if(h.contains("rtile__pause")){oe("worker-attempt-pause",{attempt_id:f},m);return}if(h.contains("rtile__resume")){wr().then(z=>{if(z!==null)return se("worker-attempt-resume",{attempt_id:f,...z!==""?{instructions:z}:{}},m,$)});return}if(h.contains("rtile__dismiss")){ye("worker-attempt-dismiss",{attempt_id:f},m,$);return}if(h.contains("rtile__discard")){if(!p(ps(b,"unmerged")))return;q({bead_id:b,...f?{attempt_id:f}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},m,$);return}if(h.contains("worker-mini__merge")){let z=ne(m,b);z?.mismatch&&z.continuation===null?Te(m,b,$,z.mismatch):ye("worker-merge-queue-add",{bead_id:b},m,$);return}if(h.contains("worker-mini__merge-cancel")){ye("worker-merge-queue-remove",{bead_id:b},m,$);return}if(h.contains("worker-mini__discard")){let z=y.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(ps(b,z)))return;q({bead_id:b,...y.dataset.attemptId?{attempt_id:y.dataset.attemptId}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},m,$);return}if(h.contains("worker-mini__revise-fix")){se("worker-revise-fix",{bead_id:b},m,$);return}h.contains("worker-mini__revise-approve")&&ye("worker-revise-approve",{bead_id:b},m,$)}function Pe(y){let b=$t;$t=!1;let c=y.target;if(!c||typeof c.closest!="function"||c.closest("dialog")||c.closest(".mon2-drawer")||c.closest("a"))return;let m=c.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(m){y.preventDefault();let J=c.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||m.textContent?.trim()||"";J&&Me(J);return}let $=c.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if($){y.preventDefault();let A=$.getAttribute("data-root-dir")||Y.get(c.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||$.getAttribute("title")||"";pe(A);return}let f=c.closest(".mon2-sec__toggle");if(f){y.preventDefault(),we(f.getAttribute("data-root-dir")||"");return}let h=c.closest(".mon2-area__toggle");if(h){y.preventDefault(),be(h.getAttribute("data-area")||"parallel");return}if(c.closest(".mon2-newlane")){y.preventDefault(),D=[...D,{seed:null}],De();return}if(c.closest(".mon-merge-all")){y.preventDefault(),re();return}let z=c.closest(".mon-filter__spec");if(z){y.preventDefault(),w={...w,spec:z.getAttribute("data-spec")||"all"},sd(w),De();return}let K=c.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!K)return;let Ee=K.getAttribute("data-bead-id")||"",ve=c.closest("button");if(ve){y.preventDefault(),Wt(ve,Ee);return}Ee&&!b&&(y.preventDefault(),G(Ee,K.getAttribute("data-root-dir")||S(Ee).root_dir))}function T(y){let b=y.target;if(!b||typeof b.closest!="function")return;let c=b.closest(".mon-filter__blocked");if(c){w={...w,show_blocked:c.checked},sd(w),De();return}let m=b.closest(".mon-candidate-sort");if(m){x=hs.some(h=>h.value===m.value)?m.value:"repo_spec",ah(x),De();return}let $=b.closest(".mon-running-sort");if($){g=$.value==="repo"?"repo":"started",dh(g),De();return}let f=b.closest(".mon-done-range");f&&(_=an(f.value)?f.value:en,ch(_),De())}function ce(y){if(!Q)return;let b=y.target;b&&typeof b.closest=="function"&&b.closest(".mon-overlap__popover, .mon-overlap__chip")||(Q=null,De())}function Se(y){y.key!=="Escape"||!Q||(Q=null,De())}e.addEventListener("click",Pe),e.addEventListener("change",T),document.addEventListener("click",ce),document.addEventListener("keydown",Se),e.addEventListener("dragstart",qt),e.addEventListener("dragover",Tt),e.addEventListener("dragleave",Ot),e.addEventListener("drop",Xt),e.addEventListener("dragend",Bt),s&&typeof s.subscribe=="function"&&(ie=s.subscribe(()=>{try{$e.clear(),De()}catch{}}));function it(){_e!==null&&(clearInterval(_e),_e=null)}function Ct(){Ne!==null&&(clearTimeout(Ne),Ne=null)}return{load(){n("load"),De(),_e===null&&(_e=setInterval(()=>{try{De()}catch{}},ph))},pause(){it()},clear(){it(),Ct(),ie&&(ie(),ie=null),Ie.destroy(),X?.destroy(),X=null,e.removeEventListener("click",Pe),e.removeEventListener("change",T),document.removeEventListener("click",ce),document.removeEventListener("keydown",Se),e.removeEventListener("dragstart",qt),e.removeEventListener("dragover",Tt),e.removeEventListener("dragleave",Ot),e.removeEventListener("drop",Xt),e.removeEventListener("dragend",Bt),e.replaceChildren()}}}function _d(e,t,n){let r=At("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(g){return w=>{w.preventDefault(),r("click tab %s",g),n.gotoView(g)}}function u(){let g=t.getState();return g.view==="worker"||g.view==="monitor"?g.view:"board"}function d(){let g=u();return l`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${g==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function p(){let g=u();return l`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${g==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${g==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function _(){s&&Ge(d(),s),o&&Ge(p(),o)}return _(),a=t.subscribe(()=>_()),{destroy(){a&&(a(),a=null),s&&Ge(l``,s),o&&Ge(l``,o)}}}var md=["bug","feature","task","epic","chore"];function gd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var hd=["Critical","High","Medium","Low","Backlog"];function bd(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),u=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),g=n.querySelector(".new-issue__close");function w(){o.replaceChildren();let N=document.createElement("option");N.value="",N.textContent="\u2014 Select \u2014",o.appendChild(N);for(let j of md){let E=document.createElement("option");E.value=j,E.textContent=gd(j),o.appendChild(E)}a.replaceChildren();for(let j=0;j<=4;j+=1){let E=document.createElement("option");E.value=String(j);let I=hd[j]||"Medium";E.textContent=`${j} \u2013 ${I}`,a.appendChild(E)}}w();function x(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function P(N){s.disabled=N,o.disabled=N,a.disabled=N,i.disabled=N,u.disabled=N,p.disabled=N,_.disabled=N,_.textContent=N?"Creating\u2026":"Create"}function B(){d.textContent=""}function H(N){d.textContent=N}function Q(){try{let N=window.localStorage.getItem("beads-ui.new.type");N?o.value=N:o.value="";let j=window.localStorage.getItem("beads-ui.new.priority");j&&/^\d$/.test(j)?a.value=j:a.value="2"}catch{o.value="",a.value="2"}}function D(){let N=o.value||"",j=a.value||"";N.length>0&&window.localStorage.setItem("beads-ui.new.type",N),j.length>0&&window.localStorage.setItem("beads-ui.new.priority",j)}async function M(){B();let N=String(s.value||"").trim();if(N.length===0){H("Title is required"),s.focus();return}let j=Number(a.value||"2");if(!(j>=0&&j<=4)){H("Priority must be 0..4"),a.focus();return}let E=String(o.value||""),I=String(u.value||""),Y={title:N};E.length>0&&(Y.type=E),String(j).length>0&&(Y.priority=j),I.length>0&&(Y.description=I),P(!0);try{await t("create-issue",Y)}catch{P(!1),H("Failed to create issue");return}D(),P(!1),x()}return n.addEventListener("cancel",N=>{N.preventDefault(),x()}),g.addEventListener("click",()=>x()),p.addEventListener("click",()=>x()),n.addEventListener("keydown",N=>{N.key==="Enter"&&(N.ctrlKey||N.metaKey)&&(N.preventDefault(),M())}),r.addEventListener("submit",N=>{N.preventDefault(),M()}),{open(){r.reset(),B(),Q();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var mh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function gh(e,t){return la(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function yd(e,t,n){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=gh(r,e);return l`<button
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
  `}function vd(e,t,n){return l`
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
  `}function wd(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${mh.map(([n,r])=>l`<label class="settings-dialog__toggle">
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
  `}var hh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function kd(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(X=>ue(X,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",u=!1,d="",p=null;function _(){if(p)return p;let X=a.querySelector('[data-pane="execution"]');return X?(p=Lo(X,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Ie=>t.queueStore?.set?.(Ie)}),p):null}function g(){return l`
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
    `}function w(){let X=r.get();return l`
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
        ${X?l`
              ${yd(X,s(),H)}
              ${vd(X,d,{onDraft:Ie=>{d=Ie},onAdd:Q,onRemove:D})}
              ${wd(X,M)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function x(X){let Ie=r.get();if(Ie)try{let ye=await n("display-policy-set",{expected_revision:Ie.revision,policy:X(Ie)});P(ye),ye&&ye.conflict&&ye.policy&&(ye=await n("display-policy-set",{expected_revision:ye.policy.revision,policy:X(ye.policy)}),P(ye)),ye&&ye.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function P(X){X&&X.policy&&typeof X.policy=="object"&&r.set(X.policy)}function B(X){x(X)}function H(X){let Ie=r.get();if(!Ie)return;let ye=!bh(X,Ie);B(ne=>yh(X,ne,ye))}function Q(){let X=d.trim();X.length!==0&&(d="",B(Ie=>Ie.hidden_prefixes.includes(X)?{hidden_prefixes:Ie.hidden_prefixes}:{hidden_prefixes:[...Ie.hidden_prefixes,X]}),N())}function D(X){B(Ie=>({hidden_prefixes:Ie.hidden_prefixes.filter(ye=>ye!==X)}))}function M(X){let Ie=r.get();if(!Ie)return;let ye=Ie.chips[X]===!1;B(()=>({chips:{[X]:ye}}))}function N(){Ge(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${hh.map(X=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${X.id}
                  aria-selected=${String(i===X.id)}
                  aria-controls=${`settings-pane-${X.id}`}
                  @click=${()=>j(X.id)}
                >
                  <span class="settings-dialog__glyph">${X.glyph}</span>
                  ${X.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${_e}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${g()} ${w()}
          </div>
        </div>
      `,a),_()}function j(X){i=X,N()}let E=()=>{u=!1,t.onOpenChange?.(!1)};a.addEventListener("close",E),a.addEventListener("cancel",E);let I=X=>{X.target===a&&_e()};a.addEventListener("click",I);let Y=null;r.subscribe&&(Y=r.subscribe(()=>{u&&N()}));let $e=null;t.implPresetStore?.subscribe&&($e=t.implPresetStore.subscribe(()=>{u&&p?.render()}));function ie(X="execution"){u||(u=!0,t.onOpenChange?.(!0),i=X,d="",N(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),_()?.load())}function _e(){u&&(u=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:ie,close:_e,sessionDraft:()=>p?.sessionDraft()??{},destroy(){u=!1,a.removeEventListener("close",E),a.removeEventListener("cancel",E),a.removeEventListener("click",I),Y&&(Y(),Y=null),$e&&($e(),$e=null),p?.destroy(),p=null,a.remove()}}}function bh(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function yh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var vh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],$d="usage-meter-card",wh="usage-meter-layer",xd=600,kh=["token_expired","relogin_required"];function Ad(e){return String(e).padStart(2,"0")}function $h(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Sd(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Ad(r.getHours())}:${Ad(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${vh[r.getMonth()]} ${r.getDate()} ${o}`;return`${$h(n,t)} \xB7 ${i}`}function xh(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Ed(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Td(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Cd=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Id(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Ah(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Id(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Sh(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Ah(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?Id(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function Rd(e,t){return`${e}:${t}`}function Od(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,u=null;function d(){Ge(l``,e),e.hidden=!0,_()}function p(){if(u===null){let ne=e.ownerDocument;u=ne.createElement("div"),u.id=wh,u.className="usage-meter__layer",ne.body.appendChild(u)}return u}function _(){u!==null&&(Ge(l``,u),u.remove(),u=null)}function g(ne){n!==ne&&(n===null&&(document.addEventListener("mousedown",x),document.addEventListener("keydown",B),window.addEventListener("resize",P)),n=ne)}function w(){n!==null&&(n=null,document.removeEventListener("mousedown",x),document.removeEventListener("keydown",B),window.removeEventListener("resize",P))}function x(ne){let se=ne.target;se&&(e.contains(se)||u!==null&&u.contains(se))||(w(),_e())}function P(){_e()}function B(ne){ne.key==="Escape"&&(w(),_e())}function H(ne){n===ne?w():g(ne),_e()}function Q(){w(),_e()}async function D(ne,se){if(r.has(ne.key))return;let Te=Rd(ne.key,se);r.set(ne.key,se),a.delete(Te),_e();let q=null;try{q=await(await fetch(ne.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:se})})).json()}catch{q=null}if(t)return;if(r.delete(ne.key),!q||q.ok!==!0){let re=q&&typeof q.error=="string"&&q.error.length>0?q.error:"network_error";a.set(Te,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${re}`}),_e();return}let oe=Array.isArray(q.warnings)?q.warnings.filter(re=>typeof re=="string"&&re.length>0):[];oe.length>0&&a.set(Te,{kind:"warn",text:oe.join(" \xB7 ")}),_e(),await ye()}function M(ne,se,Te,q){let oe=Td(ne.pct),xe=`resets ${Sd(ne.resetsAt,q)}${se?` \xB7 ${Te}`:""}`;return l`<span
      class="usage-meter__window ${Ed(oe)}"
      style=${`--progress: ${oe}%`}
      title=${xe}
    >
      <span class="usage-meter__label">${ne.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${oe}%</span>
    </span>`}function N(ne,se,Te){let q=se.available&&typeof se.ageSeconds=="number"&&se.ageSeconds>xd,oe=q&&typeof se.ageSeconds=="number"?`${Math.floor(se.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",re=se.accounts.filter(be=>!be.active).length,xe=`usage-meter__group${q?" usage-meter__group--stale":""}`,we=l`<span class="usage-meter__provider"
        >${ne.label}</span
      >
      ${se.available?se.windows.map(be=>M(be,q,oe,Te)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${re>0?l`<span class="usage-meter__badge">+${re}</span>`:""}`;if(se.accounts.length===0)return l`<span
        class=${xe}
        aria-label=${`${ne.label} usage`}
        >${we}</span
      >`;let Oe=n===ne.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${xe}`}
      aria-label=${`${ne.label} usage`}
      aria-expanded=${Oe?"true":"false"}
      aria-controls=${$d}
      @click=${()=>H(ne.key)}
    >
      ${we}
    </button>`}function j(ne,se){return l`<span class="usage-meter" aria-label="Usage">
      ${ne.map(Te=>N(Te.provider,Te.snapshot,se))}
    </span>`}function E(ne,se){let Te=Td(ne.pct),q=Sd(ne.resetsAt,se);return l`<span
      class="usage-meter__account-window ${Ed(Te)}"
      style=${`--progress: ${Te}%`}
    >
      <span class="usage-meter__account-key">${ne.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Te}%</span>
      <span class="usage-meter__account-reset"
        >${q.length>0?`\u21BB ${q}`:""}</span
      >
    </span>`}function I(ne,se){return kh.includes(se)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ne.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function Y(ne,se,Te){let q=se.status==="ok",oe=typeof se.ageSeconds=="number"&&se.ageSeconds>xd,re=a.get(Rd(ne.key,se.number)),xe=r.get(ne.key),we=xe!==void 0,Oe=xe===se.number,be=["usage-meter__account"];return se.active&&be.push("usage-meter__account--active"),q||be.push("usage-meter__account--unavailable"),oe&&be.push("usage-meter__account--stale"),l`<div class=${be.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${se.email}
          >${se.alias===null?se.email:se.alias}</span
        >
        ${se.plan===null?"":l`<span class="usage-meter__account-tag">${se.plan}</span>`}
        ${se.active?l`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${se.ageSeconds===null?"":l`<span class="usage-meter__account-age"
              >${xh(se.ageSeconds)}</span
            >`}
        ${se.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${we}
              @click=${()=>{D(ne,se.number)}}
            >
              ${Oe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${q?l`<div class="usage-meter__account-windows">
            ${se.windows.map(Xe=>E(Xe,Te))}
          </div>`:l`<div class="usage-meter__account-status">
            ${I(ne,se.status)}
          </div>`}
      ${re===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${re.kind}"
          >
            ${re.text}
          </div>`}
    </div>`}function $e(ne,se,Te){let q=se.accounts.filter(oe=>oe.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ne.label} · 활성 ${q} / 전체
        ${se.accounts.length}
      </h2>
      ${se.accounts.map(oe=>Y(ne,oe,Te))}
    </section>`}function ie(ne,se){return l`<div
      class="usage-meter__card"
      id=${$d}
      role="dialog"
      aria-label=${`${ne.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${$e(ne.provider,ne.snapshot,se)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function _e(){let ne=[];for(let q of Cd){let oe=o.get(q.key);oe&&ne.push({provider:q,snapshot:oe})}if(ne.length===0){w(),d();return}let se=ne.find(q=>q.provider.key===n&&q.snapshot.accounts.length>0);se||w();let Te=Date.now();Ge(j(ne,Te),e),e.hidden=!1,se?X(se,Te):_()}function X(ne,se){let Te=p(),q=e.getBoundingClientRect(),oe=e.ownerDocument.documentElement.clientWidth;Te.style.setProperty("--usage-meter-anchor-top",`${q.bottom}px`),Te.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,oe-q.right)}px`),Ge(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${Q}
        ></div>
        ${ie(ne,se)}`,Te)}async function Ie(ne){try{let se=await fetch(ne.endpoint);return se.ok?Sh(await se.json()):null}catch{return null}}async function ye(){i+=1;let ne=i,se=await Promise.all(Cd.map(async Te=>({provider:Te,snapshot:await Ie(Te)})));if(!(t||ne!==i)){for(let Te of se)Te.snapshot?o.set(Te.provider.key,Te.snapshot):o.delete(Te.provider.key);_e()}}return d(),ye(),s=setInterval(()=>{ye()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),w(),d()}}}function Ld(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Eh="worker-ineligible";function fi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Md(e){return fi(e).includes(Eh)}var Th="worker-serial";function _i(e){return fi(e).includes(Th)}function mi(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Ch=new Set(["done","failed","orphaned","stopped","discarded"]),Rh={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Ih={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Oh={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function gi(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Oh[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Pd(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let u=new Map,d=new Map,p=!1,_=null,g=null,w=null,x=new Set,P=!1,B=0,H=null,Q=new Set;function D(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function M(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function N(){return o&&o()||""}async function j(){if(!s)return;let S=++B;P=!0,w=null,x.clear(),Ue();try{let L=await s("worker-parallel-analysis-targets",{root_dir:N()});if(S!==B||!De)return;let k=Array.isArray(L?.qualified)?L.qualified:[],O=Array.isArray(L?.excluded)?L.excluded:[];w={qualified:k,excluded:O};for(let ae of k)ae&&typeof ae.id=="string"&&x.add(ae.id)}catch{S===B&&De&&(w={qualified:[],excluded:[]},ue("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{S===B&&(P=!1,De&&Ue())}}function E(S){return Array.isArray(S.runs)?S.runs:[]}function I(){let S=D(),L=new Set;for(let k of Object.values(S.attempts||{})){let O=k;O&&typeof O.bead_id=="string"&&!Ch.has(O.status)&&L.add(O.bead_id)}for(let k of Array.isArray(S.pr_wait)?S.pr_wait:[])k&&typeof k.bead_id=="string"&&L.add(k.bead_id);for(let k of Object.values(S.discard_operations||{})){let O=k;O&&O.phase!=="done"&&typeof O.bead_id=="string"&&L.add(O.bead_id)}return L}function Y(S){return S.filter(L=>$e(L)===null)}function $e(S){let L=D();for(let k of Array.isArray(L.serial_lanes)?L.serial_lanes:[])if(Array.isArray(k?.entries)&&k.entries.some(O=>O.bead_id===S))return k.id;return(Array.isArray(L.queue)?L.queue:[]).some(k=>k.bead_id===S)?"parallel":null}function ie(S,L){let k=u.get(S);return k||[...L.order]}function _e(S){if(S.length<2)return!1;let L=$e(S[0]);if(!L||L==="parallel")return!1;let k=D(),O=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).find(le=>le.id===L)?.entries.map(le=>le.bead_id);if(!Array.isArray(O))return!1;let ae=S.map(le=>O.indexOf(le));return ae.every(le=>le>=0)&&ae.every((le,te)=>te===0||le>ae[te-1])}function X(){let S=D(),L=Array.isArray(S.serial_lanes)?S.serial_lanes:[],k=L.find(O=>Array.isArray(O.entries)&&O.entries.length===0);return k?k.id:L[0]?.id||"s1"}function Ie(S){let L=D().bead_titles||{};return typeof L[S]=="string"?L[S]:S}async function ye(S,L){if(!s||p)return null;p=!0,Ue();try{return await s(S,L)}finally{p=!1,Ue()}}async function ne(S){r?.setPending?.(!0);try{let L=await ye("worker-parallel-analysis-start",{force:S,target_ids:Array.from(x)});L&&L.applied===!1&&L.reason&&(L.reason==="target_not_qualified"&&Array.isArray(L.detail)?ue(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${L.detail.join(", ")}`,"error",3200):ue(`\uBD84\uC11D \uC2E4\uD328: ${L.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function se(){let S=M().job;!s||!S||await s("worker-parallel-analysis-cancel",{job_id:S.job_id})}async function Te(S){if(!(!s||Q.has(S))){Q.add(S),Ue();try{let L=await s("worker-parallel-analysis-prompt",{root_dir:N(),run_id:S});if(!De)return;if(L?.ok===!0&&typeof L.prompt=="string"){H={run_id:S,prompt:L.prompt};return}ue(L?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{Q.delete(S),Ue()}}}function q(){H=null,Ue()}async function oe(){if(!H)return;let S=await nn(H.prompt);ue(S?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",S?"success":"error",1400)}function re(S,L){a&&a(S,gi(L))}function xe(){return D().runner_catalog}function we(S){return Object.keys(xe()?.runners?.[S]?.models||{})}function Oe(S){let L=we(S),k=xe()?.runners?.[S]?.default_model;return typeof k=="string"&&L.includes(k)?k:L[0]||""}function be(){let S=M().settings,L=_||S.runner||"claude",k=we(L),O=_?Oe(L):S.model||k[0]||"",ae=mi(xe(),L,O),le=S.effort||"",te=ae.includes(le)?le:ae[0]||"";return{runner:L,model:O,effort:te,models:k,efforts:ae}}async function Xe(S){let L=M().settings,k=await ye("worker-parallel-analysis-settings-update",{expected_revision:L.revision,runner:S.runner,model:S.model,effort:S.effort});(!k||k.applied!==!0)&&(_=null,Ue(),k&&k.reason&&ue(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${k.reason}`,"error",2800))}function pt(S){_=S,Ue();let L=be();Xe({runner:S,model:L.model,effort:L.effort})}function C(S){let L=be(),k=mi(xe(),L.runner,S);Xe({runner:L.runner,model:S,effort:k.includes(L.effort)?L.effort:k[0]||""})}function fe(S){let L=be();Xe({runner:L.runner,model:L.model,effort:S})}async function ke(S,L){if(!s||p)return;let k=ie(S,L),O=M();if(k.length<2||!O.last_good){ue("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ae=d.get(S)||X(),le=()=>({snapshot_digest:O.last_good.identity_digest,group_index:S,lane:ae,ordered_bead_ids:k,expected_revision:D().revision});p=!0,Ue();try{let te=await s("worker-parallel-analysis-submit",le());te&&te.queue&&n&&n.set(te.queue),te&&te.applied!==!0&&te.conflict===!0&&(te=await s("worker-parallel-analysis-submit",le()),te&&te.queue&&n&&n.set(te.queue)),te&&te.applied===!0?(u.delete(S),ue(`\uC9C1\uB82C \uB808\uC778 ${ae}\uC5D0 ${k.length}\uAC1C \uBC30\uCE58`,"success")):ue(`\uC81C\uCD9C \uAC70\uBD80: ${te?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,Ue()}}function Ce(S,L,k){u.set(S,ie(S,L).filter(O=>O!==k)),Ue()}function qe(S){u.delete(S),Ue()}function Be(S,L,k,O){let ae=[...ie(S,L)],le=ae.indexOf(k),te=le+O;le<0||te<0||te>=ae.length||(ae.splice(te,0,...ae.splice(le,1)),u.set(S,ae),Ue())}function W(){let S=M().settings,L=Object.keys(xe()?.runners||{}),k=be();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${O=>pt(O.target.value)}
        >
          ${L.map(O=>l`<option
                value=${O}
                ?selected=${k.runner===O}
              >
                ${O}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${O=>C(O.target.value)}
        >
          ${k.models.map(O=>l`<option
                value=${O}
                ?selected=${k.model===O}
              >
                ${O}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${O=>fe(O.target.value)}
        >
          ${k.efforts.map(O=>l`<option
                value=${O}
                ?selected=${k.effort===O}
              >
                ${O}
              </option>`)}
        </select>
      </label>
      ${V(S)}
    </div>`}function V(S){return!Ve(S)||Ae(S)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:S.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${S.runner}/${S.model} · effort
        ${S.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:S.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function Ae(S){return S.is_default===!0&&S.compatible===!1}function Ve(S){return!!(S.runner&&S.model&&S.effort)}function We(S){return Ve(S)&&S.compatible!==!1}function de(S){let L=Math.max(0,Math.floor(S/1e3)),k=Math.floor(L/60),O=L%60;return`${k}:${String(O).padStart(2,"0")}`}function R(S){let L=S.job;if(L){let k=typeof L.started_at=="number"?L.started_at:0,O=`${L.runner||"?"}/${L.model||"?"}`,ae=k?` \xB7 \uACBD\uACFC ${de(Date.now()-k)}`:"",le=typeof L.session_id=="string"?L.session_id:"",te=E(S).find(he=>he.run_id===L.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${O} · effort ${L.effort||"?"}${ae}</span
        >
        ${le?l`<code class="pa-session-id" title=${le}
              >${le.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>re(L.job_id,te||L)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${te?.prompt_saved!==!0||Q.has(L.job_id)}
          @click=${()=>{Te(L.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Z()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Z(){return r?.isPending?.()===!0}function ge(S){let L=!!S.job,k=We(S.settings),O=w!==null&&x.size===0,ae=L||p||Z()||P;return l`<div class="pa-meta">
      ${S.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(S.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${R(S)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!k||ae||O}
        @click=${()=>{ne(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!k||ae||O}
        @click=${()=>{ne(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!L}
        @click=${()=>{se()}}
      >
        취소
      </button>
    </div>`}function ee(S){return typeof S=="string"&&S.length>0?S:"\uBBF8\uBC30\uCE58"}function Le(S,L){L?x.add(S):x.delete(S),Ue()}function tt(S){let L=Array.isArray(S.scope)?S.scope:[],k=Array.isArray(S.overlaps)?S.overlaps:[];return L.length===0&&k.length===0?l``:l`<span class="pa-target__signals">
      ${L.length>0?l`<details class="pa-target__scope" title=${L.join(`
`)}>
            <summary>scope ${L.length}</summary>
            <ul>
              ${L.map(O=>l`<li><code>${O}</code></li>`)}
            </ul>
          </details>`:""}
      ${k.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${k.join(", ")}`}
            >겹침 ${k.join(", ")}</span
          >`:""}
    </span>`}function rt(){let S=w?.qualified||[],L=w?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${P?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${S.length} \xB7 \uC81C\uC678 ${L.length}`}</span
        >
      </header>
      ${w&&S.length>0?l`<ul class="pa-targets__list">
            ${S.map(k=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${k.id}
                      .checked=${x.has(k.id)}
                      @change=${O=>Le(k.id,O.target.checked)}
                    />
                    <span class="pa-target__title">${k.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${tt(k)}
                    <span class="pa-target__route">${k.route}</span>
                    <span class="pa-target__lane"
                      >${ee(k.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:w&&S.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${w&&L.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${L.length}</summary>
            <ul class="pa-targets__list">
              ${L.map(k=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${k.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Rh[k.reason]||k.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${ee(k.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function Qe(S){let L=typeof S.session_id=="string"&&S.session_id.length>0,k=L?S.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${S.outcome}"
        >${Ih[S.outcome]||S.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(S.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${S.runner||"?"} / ${S.model||"?"} / ${S.effort||"?"}</span
      >
      ${L?l`<code class="pa-session-id" title=${k}
            >${k.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${S.outcome==="failure"&&S.reason?l`<span class="pa-run-row__reason">${S.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>re(S.run_id,S)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${S.prompt_saved!==!0||Q.has(S.run_id)}
          @click=${()=>{Te(S.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function ft(S){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${S.length>0?l`<ul class="pa-runs__list">
            ${S.map(L=>Qe(L))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function ht(){return H?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${q}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${H.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{oe()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${q}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${H.prompt}</pre
        >
      </section>
    </div>`:""}function ut(S,L){let k=ie(S,L),O=I(),ae=k.filter(He=>O.has(He)),le=Y(k),te=_e(k),he=Array.isArray(D().serial_lanes)?D().serial_lanes:[],at=d.get(S)||X(),Ke=L.eligible!==!0||k.length<2||ae.length>0||le.length>0||te||p;return l`<section class="pa-group" data-group-index=${String(S)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${L.confidence}</span>
        ${L.categories.map(He=>l`<span class="pa-group__category">${He}</span>`)}
        ${te?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${L.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${le.length>0?l`<span class="pa-group__stale"
              >stale — ${le.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${L.reason}</p>
      <ol class="pa-group__members">
        ${k.map((He,bt)=>l`<li class="pa-member" data-bead-id=${He}>
              <span class="pa-member__seq">${bt+1}</span>
              <span class="pa-member__title">${Ie(He)}</span>
              ${O.has(He)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${He}
                ?disabled=${bt===0}
                aria-label=${`${He} \uC704\uB85C`}
                @click=${()=>Be(S,L,He,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${He}
                ?disabled=${bt===k.length-1}
                aria-label=${`${He} \uC544\uB798\uB85C`}
                @click=${()=>Be(S,L,He,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${He}
                aria-label=${`${He} \uC81C\uC678`}
                @click=${()=>Ce(S,L,He)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${L.evidence.map(He=>l`<li class="pa-evidence">
              <code>${He.path}</code>
              <span class="pa-evidence__locator">${He.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>qe(S)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${He=>{d.set(S,He.target.value),Ue()}}
          >
            ${he.map((He,bt)=>l`<option
                  value=${He.id}
                  ?selected=${at===He.id}
                >
                  직렬 ${bt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Ke}
          @click=${()=>{ke(S,L)}}
        >
          제출
        </button>
      </footer>
    </section>`}function lt(S){let L=Array.isArray(S.issues)?S.issues:[],k=L.filter(ae=>ae.verdict==="parallel_ok").length,O=L.filter(ae=>ae.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${k}</span>
      <span>uncertain ${O}</span>
    </div>`}function _t(){let S=De&&!!M().job;if(S&&g===null){g=setInterval(()=>Ue(),1e3);return}!S&&g!==null&&(clearInterval(g),g=null)}function Ue(){let S=M();_&&S.settings.runner===_&&(_=null);let L=S.last_good?.result;_t(),Ge(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Me}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${W()} ${ge(S)} ${rt()}
            ${L?l`${L.groups.map((k,O)=>ut(O,k))}
                ${L.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${lt(L)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${ft(E(S))}
          </div>
        </div>
        ${ht()}
      `,i)}let De=!1,Fe=()=>{De=!1,H=null,B+=1,_t()},mt=S=>{S.target===S.currentTarget&&Me()};i.addEventListener("close",Fe),i.addEventListener("cancel",Fe),i.addEventListener("click",mt);let ct=null;n&&n.subscribe&&(ct=n.subscribe(()=>{De&&Ue()}));let G=null;r&&r.subscribe&&(G=r.subscribe(()=>{De&&Ue()}));function pe(){De||(De=!0,Ue(),j(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Me(){De&&(De=!1,H=null,B+=1,_t(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:pe,close:Me,destroy(){De=!1,g!==null&&(clearInterval(g),g=null),i.removeEventListener("close",Fe),i.removeEventListener("cancel",Fe),i.removeEventListener("click",mt),ct&&(ct(),ct=null),G&&(G(),G=null),i.remove()}}}var Dd=new Set(["sh","bash","zsh","dash","ksh"]),Nd=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function qd(e){let t=e.split("/");return t[t.length-1]||""}function Lh(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=qd(n[0]);if(r!=="env")return Dd.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Dd.has(qd(s))}function Mh(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Ph(e){let t=[],n=0;Nd.lastIndex=0;for(let r of e.matchAll(Nd)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Mh(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Dh(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Fd(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",u=0,d=null,p=!1;function _(N,j){return j?Ph(N).map(E=>E.kind==="plain"?E.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${E.kind}"
            >${E.text}</span
          >`):N}function g(){if(!s)return l``;let N=o==="ready"&&Lh(a),j=o==="ready"?a.split(`
`):[];return l`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>D()}
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
              @click=${()=>{x()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>D()}
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
                  ${j.map((E,I)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${I+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(E,N)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function w(){Ge(g(),r)}async function x(){if(o!=="ready")return;let N=await nn(a);ue(N?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",N?"success":"error")}function P(N){N.key==="Escape"&&s&&(N.preventDefault(),D())}function B(){p||(document.addEventListener("keydown",P),p=!0)}function H(){p&&(document.removeEventListener("keydown",P),p=!1)}async function Q(N,j=null){let E=++u;B(),s={...N},d=j||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",w(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let Y=t?t():"";if(!Y){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",w();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",w();return}let $e="/api/repo-ops-script?workspace="+encodeURIComponent(Y)+"&lane="+encodeURIComponent(N.lane)+"&base_sha="+encodeURIComponent(N.base_sha);try{let ie=await n($e),_e=await ie.json().catch(()=>({}));if(E!==u)return;if((t?t():"")!==Y){D();return}if(!ie.ok||!_e||_e.ok!==!0){o="error",i=Dh(_e&&typeof _e.error=="string"?_e.error:""),w();return}s={lane:_e.lane,base_sha:_e.base_sha,path:_e.path,base_ref:_e.base_ref},a=String(_e.content),o="ready",w()}catch{if(E!==u)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",w()}}function D(){u+=1,H(),s=null,a="",w();let N=d;d=null,N?.isConnected&&N.focus()}function M(){D(),r.remove()}return{open:Q,close:D,destroy:M}}function jd(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let E=o();return typeof E.revision=="number"?E.revision:0}function i(E){t&&E&&E.queue&&typeof E.queue=="object"&&t.set(E.queue)}function u(){let E=o().workspace_info;return E&&typeof E=="object"?E:{}}function d(E,I){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${E}"
      >${I}</span
    >`}function p(E){if(typeof E!="number"||!Number.isFinite(E))return"";let I=E/6e4;return Number.isInteger(I)?`timeout ${I}\uBD84`:`timeout ${Math.round(E/1e3)}\uCD08`}function _(E){let I=p(E);return I?d("config",I):""}function g(E,I,Y){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${Y.script}
      @click=${$e=>{s&&s({lane:E,base_sha:I.base_sha,path:Y.script,base_ref:I.base_ref},$e.currentTarget)}}
    ></button>`}function w(){let E=o().repo_ops_opt_out;return{verify:E?.verify===!0,deploy:E?.deploy===!0}}function x(E,I){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!I}
        @change=${Y=>{Q(E,!Y.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function P(E){let I=typeof E.base_sha=="string"?E.base_sha:"",Y=`${E.source_path||"repo-ops/config.toml"} @ ${E.base_ref||"?"}${I?`@${I.slice(0,7)}`:""}`,$e=w(),ie=!!E.verify&&$e.verify,_e=!!E.deploy&&$e.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${Y}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ie?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${E.verify?l`${g("verify",E,E.verify)}
              ${_(E.verify.timeout_ms)}
              ${ie?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ie?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":E.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${E.verify?x("verify",$e.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${_e?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${E.deploy?l`${g("deploy",E,E.deploy)}
              ${_(E.deploy.timeout_ms)}
              ${_e?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${_e?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":E.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${E.deploy?x("deploy",$e.deploy):""}
      </div>
    </section>`}function B(E){let I=E.repo_ops&&typeof E.repo_ops=="object"?E.repo_ops:null;return I&&(I.status==="resolved"||I.status==="absent")?P(I):I&&(I.status==="pending"||I.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${I.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${I.error_code?l` — <code>${I.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function H(E){if(!n)return;let I=await n("worker-auto-repair-toggle",{on:E,expected_revision:a()});if(i(I),I&&I.conflict){let Y=await n("worker-auto-repair-toggle",{on:E,expected_revision:a()});i(Y)}r()}async function Q(E,I){if(!n)return;let Y=await n("worker-repo-ops-opt-out-toggle",{kind:E,opted_out:I,expected_revision:a()});if(i(Y),Y&&Y.conflict){let $e=await n("worker-repo-ops-opt-out-toggle",{kind:E,opted_out:I,expected_revision:a()});i($e)}r()}let D={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function M(E,I,Y){return l`<div class="worker-repo-ops__policy-group" data-policy=${Y}>
      <div class="worker-repo-ops__policy-label">${E}</div>
      <ul class="worker-repo-ops__policy-list">
        ${I.map($e=>l`<li data-token=${$e}>
              ${D[$e]||$e}
            </li>`)}
      </ul>
    </div>`}function N(E){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${E.map(I=>{let Y=[D[I.trigger]||I.trigger];return Number.isInteger(I.attempts_per_operation_attempt)?Y.push(`operation\uB2F9 ${I.attempts_per_operation_attempt}\uD68C`):Number.isInteger(I.attempts)?Y.push(`${D[I.budget]||I.budget} ${I.attempts}\uD68C`):Number.isInteger(I.sessions_per_user_action)&&Y.push(`${I.sessions_per_user_action}\uD68C`,D[I.user_actions]||I.user_actions),I.applies_when&&Y.push(D[I.applies_when]||I.applies_when),l`<li data-token=${I.id}>
            <strong>${D[I.id]||I.id}</strong>
            <span>${Y.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function j(){let E=o(),I=E.auto_repair!==!1,Y=E.repo_operation_policy&&typeof E.repo_operation_policy=="object"?E.repo_operation_policy:null,$e=Array.isArray(E.repo_operations)?E.repo_operations:[],ie=$e.find(ye=>ye.state==="repairing"),_e=$e.filter(ye=>ye.state==="failed"||ye.state==="repairing"),X=_e.length?Math.min(..._e.map(ye=>typeof ye.repair?.remaining=="number"?ye.repair.remaining:0)):Y?.auto_repair?.resolution_ladder?.find(ye=>ye.id==="auto_repair_session")?.attempts??1,Ie=Array.isArray(Y?.auto_repair?.resolution_ladder)?Y.auto_repair.resolution_ladder:[];return l`<section
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
          .checked=${I}
          @change=${ye=>{H(ye.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${I?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${X}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${ie?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${ie.repair?.owner_bead||ie.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${Y?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(Y.worker_automatic||[]).length} · 해결 사다리
                ${Ie.length} · 금지
                ${(Y.never_automatic||[]).length}</span
              >
            </summary>
            ${M("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",Y.worker_automatic||[],"worker-automatic")}
            ${Y.supported===!1||Y.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${Y.schema_version})`}
                </div>`:N(Ie)}
            ${M("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",Y.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${B(u())} ${j()}
      </details>`}}}var zd=20,Nh=5,qh=new Set(["failed","repairing","running","queued","retry_pending"]),Bd={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Ud={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Fh(e,t,n=zd){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function jh(e){if(e.type==="cleanup")return!0;let t=e.operation;return qh.has(t.state)&&!t.dismissed&&!t.superseded_by}function Bh(e,t,n={}){let r=Fh(e,t,1/0),s=n.expanded===!0?zd:Nh,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||jh(i));return{visible:a,hidden:r.length-a.length}}function Wd(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Uh(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Hd(e){let t=e.filter(n=>n.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>l`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Gd(e,t="",n=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function Wh(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Ud,r)?Ud[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function zh(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?zt(e.at):""}
      >${Eo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Wd(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Bd,t.kind)?Bd[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Ao(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${ds(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Wd(e)}"
          >${Uh(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?Gd(Su(t.failure_kind,r)):""}
      ${Wh(t)}
      ${Hd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ao(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Hh(e){let t=e.cleanup,n=ir(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?zt(e.at):""}
      >${Eo(e.at)||"\u2014"}</span
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
        ${Wu(t.step).map(r=>l`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Gd(Ro(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Hd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Gh(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Hh(r):zh(r))}
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
  </section>`}function Vd(e,t={}){let n=null;function r(){if(n===null){Ge(l``,e);return}let a=Bh(n.operations,n.cleanup_failures,{expanded:n.expanded});Ge(Gh({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var Vh=At("views:worker"),Kh="tab:worker:ready",Yh="tab:worker:blocked",Zh="tab:worker:in-progress",Qh="tab:worker:resolved",Xh="tab:worker:closed",Fo=1,Kd=5;function Yd(e){return fo(e).path.length>0}var Jh=new Set(["quick_fix","spec_backed","full_plan"]);function Zd(e){return typeof e=="string"&&Jh.has(e)}var ep="beads-ui.worker.candidate-filter",hi={show_blocked:!1,spec:"all"};function eb(){try{let e=window.localStorage.getItem(ep);if(!e)return{...hi};let t=JSON.parse(e);if(!t||typeof t!="object")return{...hi};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...hi}}}function tb(e){try{window.localStorage.setItem(ep,JSON.stringify(e))}catch{}}function nb(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let u=n(i),d=r(i);u&&d?s.push(i):!u&&d?o+=1:u&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var rb=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],tp="bdui.worker.candidate_sort",sb=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],jo="spec";function ob(){try{let e=window.localStorage.getItem(tp);return e==="board"||e==="created"||e==="spec"?e:jo}catch{return jo}}function ab(e){try{window.localStorage.setItem(tp,e)}catch{}}var np="bdui.worker.done-range";function ib(){try{let e=window.localStorage.getItem(np);return an(e)?e:en}catch{return en}}function lb(e){try{window.localStorage.setItem(np,e)}catch{}}var cb="(max-width: 640px)",rp="beads-ui.worker.lane-collapsed",bs={queue:!0,done:!0};function ub(){try{let e=window.localStorage.getItem(rp);if(!e)return{...bs};let t=JSON.parse(e);return!t||typeof t!="object"?{...bs}:{queue:typeof t.queue=="boolean"?t.queue:bs.queue,done:typeof t.done=="boolean"?t.done:bs.done}}catch{return{...bs}}}function db(e){try{window.localStorage.setItem(rp,JSON.stringify(e))}catch{}}function Qd(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function pb(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(tr):(r.sort(Ns(n)),t==="board"?r:[...r.filter(Yd),...r.filter(s=>!Yd(s))])}function fb(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function _b(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function Xd(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function mb(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function gb(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function hb(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function bb(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function yb(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function bi(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function vb(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,n=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,r=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=r&&typeof r.pr_number=="number"?r.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${n}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),r&&typeof r.bead_id=="string"&&a.push(`repair ${r.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:r&&typeof r.pr_url=="string"?r.pr_url:"",repair_pr_number:s}}function Jd(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function wb(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.head_review&&e.head_review.state!=="failed")return n("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Jd(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Jd(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=mb(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Xd(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Xd(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function kb(e,t,n,r,s=null,o=null,a=null,i=!1,u=null,d=!0,p=null,_=null,g=null,w={},x=!1,P=!1,B={}){let H=!!u&&u.position>0,Q=!!u?.continuation_action&&u.continuation_action.continuation===null,D=!!u&&u.active===!0,M=u&&u.failure||null,N=hb(u?u.waiting:null,g),j=n[e]||null,E=j&&j.gate?j.gate:null,I=j&&j.pr?j.pr:null,Y=vb(g),$e=bb(u?u.resolution:null),ie=yb(u?u.head_review:null),_e=u&&u.head_review||null,X=u&&u.authority||null,Ie=!!_e&&["pending","reviewing","revising"].includes(_e.state),ye=H&&!D&&(_e?.state==="failed"||!X||X.source==="automatic"&&!P),ne=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":$e?$e.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":N,se=!!E&&E.base_badge==="\uCDA9\uB3CC",Te=!!E&&E.enabled===!0,q=gs({bead_id:e,merge_sha:B.merge_sha,cleanup_cursor:B.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:B.repo_operations}),oe=No(q),re=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!E&&E.tier==="merged",xe=i&&!!r&&!!E&&E.tier==="merged",we=ye&&(Te||se||E?.reason==="base_behind"||E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"||re||xe),Oe=i&&se&&d===!1,be=kn(w,e,{external:i,merge_active:D||q?.step==="merge",merge_queued:H,conflict_active:!!a,cleanup_active:oe,merged:!!r||E?.tier==="merged"}),Xe=!!be.operation,pt=!re&&!!r&&r.step==="repo_operations",C=wb({continuation_required:Q,merge_step:q,conflict_badge:ne,conflict_live:$e?.live===!0||a==="running",head_review:_e&&ie?{...ie,state:_e.state,failure_reason:_e.failure_reason}:null,recovery:Y,cleanup_failed:r,cleanup_label:r?ir(r.step):null,base_exception:_,conflicting:se,gate:E,receipt_check:j&&j.receipt_check?j.receipt_check:null,queue_failure:M,auto_skip:p,queued:H,queue_active:D,queue_position:u?u.position:0,activity:ne?null:o&&o.activity||null}),fe=C?.live===!0&&C.title?l`<span title=${C.title}>${C.label}</span>`:C?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:r&&q?.active!==!0?Do(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:x,external:i,pr_number:I&&typeof I.number=="number"?I.number:null,pr_url:I&&typeof I.url=="string"?I.url:"",completion_badge:C?.live!==!0&&C?.title?C.label:null,completion_title:C?.title||"",completion_repair_pr_url:Y?Y.repair_pr_url:"",completion_repair_pr_number:Y?Y.repair_pr_number:null,badges:fe?[fe]:[],live_badge:C?.live===!0?fe:null,usage:s,alert:C?.alert===!0,merge_action:E?.tier==="merged"&&!re&&!xe||pt?!1:!H||Q||ye,timeline_action:pt,cancel_action:H&&!Q,cancel_enabled:(!D||Ie)&&!(Y&&Y.lock_actions),cancel_title:Y&&Y.lock_actions?`${Y.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:D&&!Ie?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Ie?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:be,discard_action:be.action,merge_step:q,discard_enabled:be.enabled,discard_title:be.title,merge_enabled:!q&&!a&&!Xe&&!_&&!(Y&&Y.lock_actions)&&!Oe&&!pt&&(Te||se||E?.reason==="base_behind"||E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"||re||xe||we),merge_label:Q?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":re||xe?"\uC815\uB9AC \uC7AC\uAC1C":se&&!q&&!re?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":E?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ye?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Xe?be.error?`\uD3D0\uAE30 \uC2E4\uD328: ${be.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${be.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Q?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":q?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${q.label}`:xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Oe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":re?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":se?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Te?`\uBA38\uC9C0 (${E.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:E&&E.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${E&&E.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function yi(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:u,getWorkspacePath:d,doneRange:p,onDoneRangeChange:_}=t,g=r?Fs(r,i):null,w=Ws({transport:n,uiOrderStore:i}),x=null,P=[],B=eb(),H=null,Q=ob(),D=an(p)?p:ib(),M=new Map;function N(){let c=Dn.find(m=>m.value===D);return c?c.label:"\uC624\uB298"}let j=ub(),E=!1,I=new Set,Y=new Set,$e=new Set,ie=new Set,_e=new Set,X={},Ie=null,ye=0,ne=null,se=[];function Te(c){return Ie===c?X:{}}async function q(){if(!n)return;let c=d?.()||"";if(Ie===c||ne&&ne.key===c&&ne.generation===ye)return;let m=++ye;ne={key:c,generation:m};let $=null;try{$=await Promise.resolve(n("get-session-defaults",{}))}catch(f){if(m!==ye)return;ne=null,Vh("get-session-defaults failed: %o",f),Ne();return}m===ye&&(X=$&&typeof $.values=="object"&&$.values!==null?{...$.values}:{},Ie=c,ne=null,Ne())}function oe(){Ie=null,ye+=1,q()}let re=document.createElement("div");re.className="worker-console";let xe=document.createElement("div");xe.className="worker-top";let we=document.createElement("div");we.className="worker-drawer-overlay",we.hidden=!0;let Oe=document.createElement("div");Oe.className="worker-drawer-overlay__backdrop";let be=document.createElement("div");be.className="worker-drawer-host";let Xe=document.createElement("div");Xe.className="worker-drawer-host",Xe.hidden=!0,we.append(Oe,be,Xe);let pt=document.createElement("div");pt.className="worker-lanes-host",re.append(xe,we,pt),e.appendChild(re);let C=null,fe=null,ke=Ar(be,{transport:n,sessionLogStore:a,onClose:()=>{C=null,fe=null,we.hidden=!0,Ne()}}),Ce=Vd(Xe,{onClose:()=>{Xe.hidden=!0,we.hidden=!0,Ne()}}),qe=Fd({getWorkspacePath:d||(()=>"")}),Be=d&&d()||"",W=jd({queueStore:s,transport:n,onChanged:()=>Ne(),onOpenScript:(c,m)=>{qe.open(c,m)}}),V=o?Pd(re,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:d,onOpenTranscript:(c,m)=>Ct(c,m)}):null;function Ae(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Fo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Ve(){let c=Ae(),m=typeof c.serial_lane_count=="number"&&Number.isInteger(c.serial_lane_count)&&c.serial_lane_count>0?Math.min(c.serial_lane_count,5):0,$=Array.isArray(c.serial_lanes)?c.serial_lanes:[],f=[];for(let z of $){if(f.length>=m)break;!z||typeof z.id!="string"||!/^s[1-5]$/.test(z.id)||!Array.isArray(z.entries)||f.push({id:z.id,label:`\uC9C1\uB82C ${z.id.slice(1)}`,count:z.entries.length})}return f.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(c.queue)?c.queue:[]).length},...f]}function We(c){if(!H||!c.some($=>$.id===H))return null;let m=Ve();return m?{bead_id:H,lanes:m}:null}function de(){let c=Ae();return typeof c.revision=="number"?c.revision:0}function R(c){c&&c.queue&&s&&s.set(c.queue)}function Z(){let c=Ae().queue;return Array.isArray(c)?c.length:0}async function ge(c,m,$){if(!n)return;let f=()=>({bead_id:c,...m==="parallel"?{}:{lane:m},...$===void 0?{}:{index:$},expected_revision:de()}),h=await n("worker-queue-place",f());R(h),h&&h.conflict&&await n("worker-queue-place",f()).then(R)}async function ee(c,m,$){if(!n)return;let f=()=>({bead_id:c,...m==="parallel"?{}:{lane:m},to_index:$,expected_revision:de()}),h=await n("worker-queue-reorder",f());R(h),h&&h.conflict&&await n("worker-queue-reorder",f()).then(R)}async function Le(c){if(!n)return;let m=await n("worker-queue-remove",{bead_id:c,expected_revision:de()});R(m),m&&m.conflict&&await n("worker-queue-remove",{bead_id:c,expected_revision:de()}).then(R)}async function tt(c){if(!n||!c)return;let m=await n("worker-attempt-pause",{attempt_id:c});m&&m.paused===!1&&m.reason&&ue(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function rt(c){if(!n||!c)return;let m=await wr();if(m===null)return;let $=async(h={})=>await n("worker-attempt-resume",{attempt_id:c,expected_revision:de(),...m!==""?{instructions:m}:{},...h}),f=await $();R(f),f&&f.conflict&&(f=await $(),R(f)),f=await An(f,(h,z)=>$({continuation:h,decision_token:z}),{onResult:R,refresh:()=>$()}),f&&f.resumed===!1&&!f.conflict&&f.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${f.reason}`,"error",2400)}async function Qe(c){if(!n||!c)return;let m=await n("worker-attempt-dismiss",{attempt_id:c,expected_revision:de()});R(m),m&&m.conflict&&(m=await n("worker-attempt-dismiss",{attempt_id:c,expected_revision:de()}),R(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&ue(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function ft(c,m,$=!0){if(!n)return null;let f=n,h=await f(c,{...m,expected_revision:de()});return R(h),h&&h.conflict&&$&&(h=await f(c,{...m,expected_revision:de()}),R(h)),h}async function ht(c){if(!n||!c)return;let m=Ae().merge_queue?.find(f=>f.bead_id===c)?.continuation_action;if(m?.mismatch&&m.continuation===null){await lt(c,m.mismatch);return}I.add(c),Ne();let $;try{$=await ft("worker-merge-queue-add",{bead_id:c})}catch{ue("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{I.delete(c),Ne()}if(!(!$||$.applied)){if($.conflict){ue("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ue(gb($.reason),"error",2400)}}async function ut(c){if(!(!n||!c||Y.has(c))){Y.add(c),Ne();try{let m=await n("worker-cleanup-retry",{bead_id:c,expected_revision:de()});R(m),m&&!m.retried&&!m.conflict&&m.reason&&ue(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${m.reason}`,"error",2400)}finally{Y.delete(c),Ne()}}}async function lt(c,m){let $=await An({continuation_mismatch:m},(h,z)=>ft("worker-merge-queue-add",{bead_id:c,continuation:h,decision_token:z},!1)),f=$?.queue?.merge_queue?.find(h=>h.bead_id===c)?.continuation_action;if($?.applied!==!0&&f?.continuation===null&&f.mismatch){await lt(c,f.mismatch);return}$&&$.applied===!1&&!$.conflict&&ue("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function _t(c){if(!n)return;let m=await ft("worker-merge-auto-toggle",{on:c});!m||m.conflict||ue(c?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",c?"success":"info",2400)}async function Ue(c){if(!n||!c)return;let m=await ft("worker-merge-queue-remove",{bead_id:c});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&ue("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function De(){await ft("worker-merge-queue-remove",{all:!0})}async function Fe(c,m=null,$="unmerged",f=null){if(!n||!c)return;let h=ps(c,$);if(!(!!f||typeof globalThis.confirm!="function"||globalThis.confirm(h)))return;let K=await n("worker-discard",{bead_id:c,...m?{attempt_id:m}:{},...f?{operation_id:f}:{},expected_revision:de()});if(R(K),K&&K.conflict&&(K=await n("worker-discard",{bead_id:c,...m?{attempt_id:m}:{},...f?{operation_id:f}:{},expected_revision:de()}),R(K)),K&&K.discarded===!0){ue(To(K),"success",5e3);return}if(K&&K.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${K.reason}`,"error",2800);return}if(K&&K.accepted&&K.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(K&&K.accepted&&!K.discarded){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${K.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}K&&!K.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function mt(c,m,$){if(!(!n||!m||!$||ie.has(m))){ie.add(m),Ne();try{let f=await n(c,{bead_id:m,action_id:$,expected_revision:de()});R(f),f?.conflict?ue("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!f?.ok&&f?.reason&&ue(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(f.reason)}`,"error",2800)}finally{ie.delete(m),Ne()}}}async function ct(c,m){if(!n||!m||$e.has(m))return;$e.add(m),Ne();let $;try{let f=async(h={})=>await n(c,{bead_id:m,expected_revision:de(),...h});$=await f(),R($),$&&$.conflict&&($=await n(c,{bead_id:m,expected_revision:de()}),R($)),c==="worker-revise-fix"&&($=await An($,(h,z)=>f({continuation:h,decision_token:z}),{onResult:R,refresh:()=>f()}))}finally{$e.delete(m),Ne()}if(!(!$||$.conflict)){if($.ok){ue(c==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ue(`\uCC98\uBD84 \uAC70\uBD80: ${$.reason||""}`,"error",3e3)}}async function G(c){if(!n)return;let m=await n("worker-automation-toggle",{on:c,expected_revision:de()});R(m),m&&m.conflict&&await n("worker-automation-toggle",{on:c,expected_revision:de()}).then(R)}async function pe(c){if(!n||!c)return;let m=await n("worker-repo-operation-repair",{operation_id:c});if(R(m),m&&m.ok===!1){ue(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${m.reason||""}`,"error",3e3);return}m&&m.ok===!0&&ue("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Me(c){if(!n||!c)return;let m=await n("worker-repo-operation-dismiss",{operation_id:c});R(m),m&&m.ok===!1&&ue(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${m.reason||""}`,"error",3e3)}async function S(c){if(!n||!Number.isFinite(c))return;let m=Math.max(Fo,Math.floor(c)),$=await n("worker-queue-set-slots",{slots:m,expected_revision:de()});R($),$&&$.conflict&&await n("worker-queue-set-slots",{slots:m,expected_revision:de()}).then(R)}async function L(c){if(!n||!Number.isInteger(c)||c<1||c>Kd)return;let m=Ae(),$=(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).slice(c).reduce((z,K)=>z+(Array.isArray(K?.entries)?K.entries.length:0),0),f=()=>({count:c,expected_revision:de()}),h=await n("worker-queue-set-serial-lane-count",f());R(h),h&&h.conflict&&(h=await n("worker-queue-set-serial-lane-count",f()),R(h)),h&&h.applied&&$>0&&ue(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${$}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function k(){let c=Ae(),m=g?g.selectBoardColumn(Kh,"ready"):[],$=g?g.selectBoardColumn(Yh,"blocked"):[],f=g?g.selectBoardColumn(Xh,"closed"):[],h=g?g.selectBoardColumn(Zh,"in_progress"):[],z=g?g.selectBoardColumn(Qh,"resolved"):[],K=Bs([...m,...$,...h,...z,...f]),Ee=new Map;for(let v of[...m,...$,...h])v&&v.id&&!Ee.has(v.id)&&Ee.set(v.id,v);let ve={...Te(d?.()||"")};for(let v of["orchestration_model","orchestration_effort","orchestration_speed"]){let U=c[v];typeof U=="string"&&(ve[v]=U)}function A(v,U){let me=Ee.get(v);if(!me)return null;let ze=me.metadata&&typeof me.metadata=="object"?me.metadata:{},ot=me.workflow?.route,Dt=ze.route,Lt=Zd(ot)?ot:Zd(Dt)?Dt:null;return Zt({pin:ze,global:ve,execution_defaults:c.execution_defaults??null,runner_catalog:c.runner_catalog??null,route:Lt,controller_runtime:U})}function J(v){let U=v.runner||null,me=A(v.bead_id,U),ze=Io(v),ot=me?zn(me,U):null;return ze||ot?{orchestration:ze,worker:ot}:null}let F=new Map;function Re(v){if(F.has(v))return F.get(v)??null;let U=A(v,null),me=null;if(U){let ze=hn(c.runner_catalog??null,U.orchestration_model.value??""),ot=ze===null?U:A(v,ze),Dt=ar(ot,c.runner_catalog??null),Lt=zn(ot,ze);me=Dt||Lt?{orchestration:Dt,worker:Lt}:null}return F.set(v,me),me}function st(v){let U=Us(K,v);return U.total===0?null:U}let Je=c.bead_titles||{},Ye=new Map;for(let[v,U]of Object.entries(Je))typeof U=="string"&&U.length>0&&Ye.set(v,U);for(let v of[...m,...$])Ye.set(v.id,v.title||v.id);let Ze=c.bead_times&&typeof c.bead_times=="object"&&!Array.isArray(c.bead_times)?c.bead_times:{},Rt=c.bead_labels&&typeof c.bead_labels=="object"&&!Array.isArray(c.bead_labels)?c.bead_labels:{},Jt=c.bead_workflow&&typeof c.bead_workflow=="object"&&!Array.isArray(c.bead_workflow)?c.bead_workflow:{},Mn=new Map;for(let[v,U]of Object.entries(Rt))Array.isArray(U)&&Mn.set(v,_i(U));for(let v of[...m,...$]){let U=v.labels;Array.isArray(U)&&!Mn.has(v.id)&&Mn.set(v.id,_i(U))}let lr=new Map,Mr=o?.get()?.last_good?.result?.groups;for(let v of Array.isArray(Mr)?Mr:[]){if(v?.eligible!==!0||!Array.isArray(v.members))continue;let U=v.members.map(ze=>{let ot=(Array.isArray(c.serial_lanes)?c.serial_lanes:[]).find(Dt=>Dt.entries.some(Lt=>Lt.bead_id===ze));return ot?ot.id:null});if(!(U.every(ze=>ze!==null)&&new Set(U).size===1))for(let ze of v.members)lr.set(ze,v.members.filter(ot=>ot!==ze))}let ys=c.bead_blocked_by&&typeof c.bead_blocked_by=="object"&&!Array.isArray(c.bead_blocked_by)?c.bead_blocked_by:{},cr=new Map;for(let[v,U]of Object.entries(Ze))U&&typeof U=="object"&&cr.set(v,U);for(let v of[...m,...$])cr.set(v.id,{created_at:v.created_at,updated_at:v.updated_at});let Vn=v=>cr.get(v)||{},Pn=c.pr_wait||[],Pr=c.pr_observations||{},je=c.pr_activity||{},xt=c.cleanup_failed||{},Dr=Object.entries(xt).map(([v,U])=>({bead_id:v,step:U&&U.step?U.step:"",reason:U&&U.reason?U.reason:"",at:U&&typeof U.at=="number"?U.at:null,detail:U&&typeof U.detail=="string"?U.detail:null,output_tail:U&&typeof U.output_tail=="string"&&U.output_tail?U.output_tail:void 0,log_path:U&&typeof U.log_path=="string"&&U.log_path?U.log_path:void 0,retry_count:U&&typeof U.retry_count=="number"&&Number.isInteger(U.retry_count)&&U.retry_count>0?U.retry_count:0,failure_code:U&&typeof U.failure_code=="string"?U.failure_code:void 0,subject_id:U&&typeof U.subject_id=="string"?U.subject_id:void 0,repair_eligible:!!(U&&U.repair_eligible),repair:U&&U.repair?U.repair:void 0})),$i=c.queue||[],gp=new Set([...$i.map(v=>v.bead_id),...(Array.isArray(c.serial_lanes)?c.serial_lanes:[]).flatMap(v=>(Array.isArray(v?.entries)?v.entries:[]).map(U=>U.bead_id)),...Pn.map(v=>v.bead_id),...c.done.map(v=>v.bead_id)]),hp=new Set($.map(v=>v.id)),bp=i?i.get()?.order||{}:{},xi=new Set,Ai=[];for(let v of[...m,...$])gp.has(v.id)||xi.has(v.id)||fb(v)||(xi.add(v.id),Ai.push(v));P=pb(Ai,Q,bp);let yp=c.admission||{},Si=v=>{let U=yp[v];if(!U)return"";if(U.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let me=typeof U.reason=="string"?U.reason:"",ze=me.indexOf(":");return ze>0&&ze<me.length-1?`\u26D4 ${me.slice(0,ze)} (${me.slice(ze+1)})`:`\u26D4 ${me}`},vp=P.map(v=>{let U=fo(v),me=U.path.length>0,ze=v.workflow?.route==="quick_fix"||v.metadata&&v.metadata.route==="quick_fix",ot=!Object.hasOwn(v,"description")||typeof v.description=="string"&&v.description.trim().length>0,Dt=Object.hasOwn(v,"labels")&&Md(v.labels),Lt=!Dt&&(ze?ot:me&&!U.conflict),vt=hp.has(v.id),pn=[];vt&&pn.push(_b(v)),ze&&!ot?pn.push("missing_description"):!ze&&U.conflict?pn.push("spec_id_conflict"):!ze&&!me&&pn.push("spec \uC5C6\uC74C");let Ts=Si(v.id);return Ts&&pn.push(Ts),{id:v.id,title:v.title||v.id,reason:pn.join(" \xB7 "),draggable:Lt,lane:"candidate",created_at:v.created_at,updated_at:v.updated_at,workflow:v.workflow,is_quick_fix:ze,status:v.status,worker_ineligible:Dt,blocked:vt,has_spec:me,exec_chips:Re(v.id)}}),Bo=nb(vp,B),wp=Bo.visible,kp=c.revise_parked||{},vs=c.discard_operations&&typeof c.discard_operations=="object"&&!Array.isArray(c.discard_operations)?c.discard_operations:{},Uo=(v,U)=>v.map((me,ze)=>{let ot=U!=="done",Dt=U!=="done"&&U!=="queue",Lt=ot?kp[me.bead_id]:null,vt=ot?kn(vs,me.bead_id):null,pn=vt?.operation?vt:null,Ts=ot&&Mn.get(me.bead_id)===!0,Yi=ys[me.bead_id]||[],Ko=c.admission&&typeof c.admission=="object"?c.admission[me.bead_id]:null,Yo=ot?ku(Ko,!!pn||ie.has(me.bead_id)):null,Pp=ot&&!Yo?Si(me.bead_id):null,Dp=ot?[Pp]:[],Zi=ot&&Yi.length>0&&typeof Ko?.reason=="string"&&Ko.reason.startsWith("not_ready")?[`\u23F8 ${Yi.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Zo=ot?lr.get(me.bead_id):void 0;return Zo&&Zo.length>0&&Zi.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Zo.join(", ")}\uC640`),{id:me.bead_id,title:Ye.get(me.bead_id)||me.bead_id,reason:Dp.filter(Boolean).join(" \xB7 "),draggable:ot&&!pn&&!Yo,done:U==="done",lane:U,seq:Dt?ze+1:void 0,worker_serial:Ts,discard:pn,stale_work:Yo,badges:[...Zi,...Lt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Lt,revise_action:!!Lt,revise_enabled:!!Lt&&!pn&&!$e.has(me.bead_id),revise_title:Lt?Lt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Lt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:U==="done"?ln(c.attempts||{},me.bead_id):null,work_ms:U==="done"?So(c.attempts||{},me.bead_id):null,done_at:U==="done"&&typeof me.added_at=="number"?me.added_at:void 0,exec_chips:ot?Re(me.bead_id):null,workflow:ot&&Jt[me.bead_id]||null,...Vn(me.bead_id)}}),ur=c.attempts?Object.values(c.attempts):[],Wo=new Set;for(let v of ur)v&&typeof v.resumed_from=="string"&&v.resumed_from.length>0&&Wo.add(v.resumed_from);let Ei=new Map;for(let v of ur)Ei.set(v.bead_id,v.attempt_id);let ws=new Map;for(let v of ur)ws.set(v.attempt_id,v);function zo(v){let U=new Set,me=v;for(;me&&!U.has(me.attempt_id);){if(me.conflict_resolution===!0)return!0;U.add(me.attempt_id),me=typeof me.resumed_from=="string"&&me.resumed_from.length>0&&ws.get(me.resumed_from)||null}return!1}let ks=typeof c.declared_base=="string"?c.declared_base:null;function $p(v){let U=null;for(let me of ur)!me||me.bead_id!==v||zo(me)||(U===null||(typeof me.started_at=="number"?me.started_at:0)>=(typeof U.started_at=="number"?U.started_at:0))&&(U=me);return U&&typeof U.target_base=="string"?U.target_base:null}let Ho=[],$s=[],xp=Ld(c),Ti=v=>{let U=typeof v.session_id=="string"&&v.session_id.length>0,me=Wo.has(v.attempt_id);return{eligible:U&&!me,reason:U?me?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},dn=null;for(let v of ur){let U=v.status==="paused"&&!Wo.has(v.attempt_id);if(v.status==="running"||U)$s.push({bead_id:v.bead_id,attempt_id:v.attempt_id,title:Ye.get(v.bead_id)||v.bead_id,runner:v.runner||null,model:v.model||null,effort:v.effort||null,speed:v.speed||null,continuation_mode:v.continuation_mode||null,started_at:typeof v.started_at=="number"?v.started_at:null,resumed_from:v.resumed_from||null,paused:U,conflict_resolution:zo(v),base_exception:bi(ks,v.target_base),can_pause:typeof v.session_id=="string"&&v.session_id.length>0,discard:kn(vs,v.bead_id,{attempt_id:v.attempt_id}),workflow:Jt[v.bead_id]||null,usage:ln(c.attempts||{},v.bead_id),rollup:st(v.bead_id),rollup_expanded:_e.has(v.bead_id),exec_chips:J(v),...Vn(v.bead_id)});else if((v.status==="failed"||v.status==="orphaned")&&xp(v)){let me=Ti(v);Ho.push({bead_id:v.bead_id,attempt_id:v.attempt_id,title:Ye.get(v.bead_id)||v.bead_id,runner:v.runner||null,model:v.model||null,effort:v.effort||null,speed:v.speed||null,continuation_mode:v.continuation_mode||null,started_at:typeof v.started_at=="number"?v.started_at:null,resumed_from:v.resumed_from||null,failed:!0,status:v.status,status_label:v.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:kn(vs,v.bead_id,{attempt_id:v.attempt_id}),resume_eligible:me.eligible,resume_reason:me.reason,conflict_resolution:zo(v),base_exception:bi(ks,v.target_base),workflow:Jt[v.bead_id]||null,usage:ln(c.attempts||{},v.bead_id),rollup:st(v.bead_id),rollup_expanded:_e.has(v.bead_id),exec_chips:J(v),...Vn(v.bead_id)}),dn=v}}let Ci=new Set([...Ho,...$s].map(v=>v.bead_id));for(let v of Array.isArray(c.session_active)?c.session_active:[]){let U=v&&v.bead_id;typeof U!="string"||U.length===0||Ci.has(U)||(Ci.add(U),$s.push({bead_id:U,attempt_id:null,kind:"session",title:v.title||Ye.get(U)||U,status:"in_progress",started_at:yn(v.started_at)??yn(v.updated_at),updated_at:yn(v.updated_at),workflow:v.workflow||null,runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let xs=[...Ho,...$s].map(v=>{let U=ws.get(v.attempt_id),me=U?.quickfix_landing;if(U?.quickfix_lane!==!0||!me||typeof me!="object")return v;let ze=typeof me.reason=="string"&&me.reason.length>0?me.reason:null,ot=gs({bead_id:U.bead_id,merge_sha:me.head_sha,cleanup_cursor:me.cursor,cleanup_failed:ze?{step:me.cursor,reason:ze}:null,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]});return ot?{...v,landing:ot}:v}),Ri=null;if(dn){let v=Ti(dn),U=dn.cause_detail;Ri={bead_id:dn.bead_id,repo:dn.repo||"",reason:dn.cause||dn.status,cause_detail:U&&typeof U.reason=="string"?{reason:U.reason,command:typeof U.command=="string"?U.command:null}:null,resume_attempt_id:dn.attempt_id,resume_eligible:v.eligible,resume_reason:v.reason,discard:kn(vs,dn.bead_id,{attempt_id:dn.attempt_id})}}let Ii=new Set(xs.map(v=>v.bead_id)),Go=Array.isArray(c.merge_queue)?c.merge_queue:[],Oi=new Map,Li=new Map,Mi=new Map,Pi=new Map,Di=new Map;Go.forEach((v,U)=>{v&&typeof v.bead_id=="string"&&(Oi.set(v.bead_id,U+1),Li.set(v.bead_id,v.resolution),Mi.set(v.bead_id,v.continuation_action||null),Pi.set(v.bead_id,v.head_review||null),Di.set(v.bead_id,v.authority||null))});let dr=c.merge_queue_state||{active:null,failures:{}},Ap=dr.failures||{},Ni=dr.waiting&&typeof dr.waiting.bead_id=="string"&&typeof dr.waiting.reason=="string"?dr.waiting:null,Sp=c.auto_merge_skips||{},qi=v=>{let U=Sp[v];if(!U)return null;let me=Pr[v],ze=me&&me.pr?me.pr.head_sha:null;return ze&&ze===U.head_sha?U.reason||"":null},As=new Map;for(let v of xs)v.failed!==!0&&v.conflict_resolution&&(v.paused?As.has(v.bead_id)||As.set(v.bead_id,"paused"):As.set(v.bead_id,"running"));let Fi=xs.filter(v=>v.kind!=="session"&&!v.paused&&v.failed!==!0).length,ji=(c.workspace_info||{}).slots,Bi=typeof ji=="number"?ji:typeof c.slots=="number"?c.slots:Fo,Ep=Fi>Bi,Ss=Jn(D),Tp=(Array.isArray(c.done)?c.done.slice():[]).filter(v=>Ss===void 0||typeof v.added_at!="number"||v.added_at>=Ss).sort((v,U)=>(U.added_at||0)-(v.added_at||0)),Nr=Uo(Tp,"done"),Cp=new Set((Array.isArray(c.done)?c.done:[]).map(v=>v?.bead_id).filter(v=>typeof v=="string")),Ui=[],Rp=d?.()||"";for(let v of f){let U=yn(v.closed_at);if(typeof v.id!="string"||Cp.has(v.id)||U===null||Ss!==void 0&&U<Ss||typeof v.comment_count!="number"||v.comment_count<=0)continue;let me=`${Rp}\0${v.id}\0${String(v.updated_at)}\0${v.comment_count}`,ze=M.get(me);ze===void 0&&n&&(M.set(me,"pending"),Promise.resolve(n("get-comments",{id:v.id})).then(ot=>{let Dt=Array.isArray(ot)&&ot.some(Lt=>_o(typeof Lt?.text=="string"?Lt.text:"")?.lane==="session");M.set(me,Dt?"session":"not-session"),Ne()}).catch(()=>{M.set(me,"failed"),Ne()})),ze==="session"&&Ui.push({id:v.id,title:v.title||v.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:U,created_at:v.created_at,updated_at:v.updated_at})}Nr.push(...Ui),Nr.sort((v,U)=>(U.done_at||0)-(v.done_at||0));let Es={};for(let v of Sn)Es[v]=0;let Wi=!1,zi=0,Vo=0,Hi=0;for(let v of Nr){let U=v.usage;if(U&&typeof U=="object"){let me=!1;for(let ze of Sn)Number.isFinite(U[ze])&&(Es[ze]+=U[ze],Wi=!0,me=!0);me&&(Vo+=1,Number.isFinite(U.total_cost_usd)&&(zi+=U.total_cost_usd,Hi+=1))}}Vo>0&&Hi===Vo&&(Es.total_cost_usd=zi);let Gi=Nr.map(v=>v.usage).filter(v=>v&&typeof v=="object"&&v.providers),Ip=Gi.length>0?Ut(Xs(Gi)):Wi?En(Es):null,Op=c.lane_states&&typeof c.lane_states=="object"&&!Array.isArray(c.lane_states)?c.lane_states:{},Lp=Array.isArray(c.serial_lanes)?c.serial_lanes:[],Vi=v=>{if(Pn.some(ze=>ze.bead_id===v))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let U=ur.filter(ze=>ze&&ze.bead_id===v),me=U.length>0?U[U.length-1].status:null;return me==="failed"||me==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":me==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Ki=Lp.filter(v=>v&&typeof v.id=="string"&&Array.isArray(v.entries)).map((v,U)=>{let me=Op[v.id]||{},ze=new Map((Array.isArray(me.corrections)?me.corrections:[]).filter(vt=>vt&&typeof vt.bead_id=="string"&&typeof vt.after=="string").map(vt=>[vt.bead_id,vt.after])),ot=Uo(v.entries.filter(vt=>!Ii.has(vt.bead_id)),v.id).map(vt=>ze.has(vt.id)?{...vt,badges:[`\u{1F517} ${ze.get(vt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...vt.badges]}:vt),Dt=Array.isArray(me.occupied_by)?me.occupied_by.filter(vt=>typeof vt=="string"):[],Lt=Dt.map(vt=>({id:vt,title:Ye.get(vt)||vt,draggable:!1,lane:v.id,ghost:!0,badges:[Vi(vt)]}));return{id:v.id,index:U+1,rows:[...Lt,...ot],occupied:Dt.length>0,badge:Dt.length>0?Vi(Dt[0]):"\uB300\uAE30",cycle:me.cycle===!0}}),Mp=typeof c.serial_lane_count=="number"?c.serial_lane_count:Ki.length;return{queue:c,idToTitle:Ye,candidates:wp,candidate_hidden:{blocked:Bo.hidden_blocked,spec:Bo.hidden_spec},running:xs,live_count:Fi,slots:Bi,over_cap:Ep,failure:Ri,waiting:Uo($i.filter(v=>!Ii.has(v.bead_id)),"queue"),serial_lanes:Ki,serial_lane_count:Mp,pr_wait:Pn.map(v=>kb(v.bead_id,Ye.get(v.bead_id)||v.bead_id,Pr,xt[v.bead_id]||null,ln(c.attempts||{},v.bead_id),je[v.bead_id]||(I.has(v.bead_id)||Y.has(v.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),As.get(v.bead_id)||null,v.external===!0,{position:Oi.get(v.bead_id)||0,active:dr.active===v.bead_id,failure:Ap[v.bead_id]||null,waiting:Ni?.bead_id===v.bead_id?Ni.reason:null,resolution:Li.get(v.bead_id),continuation_action:Mi.get(v.bead_id),head_review:Pi.get(v.bead_id)||null,authority:Di.get(v.bead_id)||null},v.wt_present!==!1,c.auto_merge===!0?qi(v.bead_id):null,bi(ks,$p(v.bead_id)),c.completion_status&&typeof c.completion_status=="object"&&!Array.isArray(c.completion_status)&&c.completion_status[v.bead_id]||null,c.discard_operations&&typeof c.discard_operations=="object"&&!Array.isArray(c.discard_operations)?c.discard_operations:{},ws.get(Ei.get(v.bead_id)||"")?.worker_serial===!0,c.auto_merge===!0,{merge_sha:v.merge_sha,cleanup_cursor:v.cleanup_cursor,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]})).map(v=>({...v,workflow:Jt[v.id]||null,...Vn(v.id)})),merge_queue_length:Go.length,merge_queue_running:Go.length>0,auto_excluded:Pn.map(v=>v.bead_id).filter(v=>qi(v)!==null),declared_base:ks,done:Nr,token_total:Ip,cleanup_failures:Dr,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]}}function O(){let m=!!o?.get()?.job,$=!m&&o?.isPending?.()===!0,f=m?"\uBD84\uC11D \uC911":$?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${f?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${f?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${f?l`<span class="worker-analysis-btn__badge">${f}</span>`:""}
    </button>`}function ae(c){let m=c.waiting.length>0?c.waiting[0].id:"\u2014",$=l`<button
      type="button"
      class="worker-play${c.queue.auto_advance?" is-active":""}"
    >
      ${c.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,f=He(c),h=c.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",z=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${c.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${c.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${N()} 완료 <b>${c.done.length}</b></span
      >`,K=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${c.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${c.declared_base||"?"}</span
    >`,Ee=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Fo}
          step="1"
          .value=${String(c.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Kd},(J,F)=>F+1).map(J=>l`<option
                value=${String(J)}
                ?selected=${c.serial_lane_count===J}
              >
                ${J}
              </option>`)}
        </select>
      </label>
      ${o?O():""} `,ve=Tu({failure:c.failure}),A=wu(c.repo_operations,c.cleanup_failures);return E?l`<div class="worker-ribbon">
          ${$} ${f}
          <div class="worker-kpi worker-kpi--ribbon">${h}${z}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ee}</div>
          <div class="worker-kpi">${K}</div>
        </div>
        ${A}${W.template()}${ve}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${$}${f}${Ee}</div>
        <div class="worker-kpi">
          ${h}${z}${K}
          ${(Array.isArray(c.token_total)?c.token_total:c.token_total?[{label:c.token_total,tooltip:`${N()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(J=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${J.tooltip}
                >${N()} 완료 · 누적 ${J.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${m}</b></span
          >
        </div>
      </div>
      ${A}${W.template()}${ve}`}function le(c){if(c.running.length===0&&c.pr_wait.length===0)return"";let m=c.running.some($=>$.kind!=="session"&&!$.paused&&$.failed!==!0);return l`<section
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
      ${c.running.length>0?ti(c.running,Date.now(),C):""}
      ${c.pr_wait.map($=>Bn($))}
    </section>`}function te(c){let m=c.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${B.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${rb.map($=>l`<button
              type="button"
              class="worker-filter__chip${B.spec===$.value?" is-active":""}"
              data-spec=${$.value}
              aria-pressed=${B.spec===$.value?"true":"false"}
            >
              ${$.label}
            </button>`)}
        ${m.spec>0?l`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function he(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${Q}
    >
      ${sb.map(c=>l`<option value=${c.value} ?selected=${Q===c.value}>
            ${c.label}
          </option>`)}
    </select>`}function at(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${D}
      >
        ${Dn.map(c=>l`<option value=${c.value} ?selected=${D===c.value}>
              ${c.label}
            </option>`)}
      </select>
    </div>`}function Ke(c){let m=l`<span
      class="worker-lane__badge${c.occupied?" worker-lane__badge--held":""}"
      >${c.badge}</span
    >`,$=c.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return un({id:`worker-pane-lane-${c.id}`,lane:c.id,title:`\uC9C1\uB82C ${c.index}`,items:c.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:m,controls:$})}function He(c){let m=c.queue.auto_merge===!0;if(c.merge_queue_running)return l`<button
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
      </button>`;let $=new Set(c.auto_excluded),f=c.pr_wait.filter(h=>h.merge_action&&h.merge_enabled&&!$.has(h.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${f>0?` ${f}`:""}
    </button>`}function bt(c){let m=un({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:c.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:he(),controls:te(c),place_menu:We(c.candidates)});return E?l`<div class="worker-lanes worker-lanes--mobile">
        ${le(c)}
        ${un({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:j.queue,preview:Qd(c.waiting)})}
        ${c.serial_lanes.map($=>Ke($))}
        ${m}
        ${un({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:c.done,empty:`${N()} \uC644\uB8CC \uC5C6\uC74C`,controls:at(),collapsible:!0,collapsed:j.done,preview:Array.isArray(c.token_total)?c.token_total.map($=>$.label).join(" \xB7 "):c.token_total||Qd(c.done)})}
      </div>`:l`<div class="worker-lanes">
      ${m}
      <div class="worker-wait">
        ${un({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${c.serial_lanes.map($=>Ke($))}
      </div>
      ${un({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${c.slots}`,items:c.running,live:c.running.some($=>$.kind!=="session"&&!$.paused&&$.failed!==!0),body:ti(c.running,Date.now(),C)})}
      ${un({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:c.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${un({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${N()} ${c.done.length}`,items:c.done,empty:`${N()} \uC644\uB8CC \uC5C6\uC74C`,controls:at()})}
    </div>`}function $t(c){j={...j,[c]:!j[c]},db(j),Ne()}function Ne(){let c=k();Ge(ae(c),xe),Ge(bt(c),pt)}function Et(){if(typeof window.matchMedia!="function")return;let c=window.matchMedia(cb);E=!!c.matches;let m=$=>{let f=!!($&&typeof $.matches=="boolean"?$.matches:c.matches);f!==E&&(E=f,Ne())};typeof c.addEventListener=="function"?(c.addEventListener("change",m),se.push(()=>c.removeEventListener("change",m))):typeof c.addListener=="function"&&(c.addListener(m),se.push(()=>c.removeListener(m)))}let jt=null;function Nt(c){jt=c.target instanceof Element?c.target:null}function Mt(c){let $=c.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!$)return;if(jt&&$.contains(jt)&&jt.closest("input, button, a")){c.preventDefault();return}let f=$.dataset.beadId||"",h=$.dataset.lane||"";x={bead_id:f,from_lane:h};try{c.dataTransfer?.setData("text/plain",f),c.dataTransfer&&(c.dataTransfer.effectAllowed="move")}catch{}}function qt(c){let m=c.target?.closest?.(".worker-pane");if(!m)return;let $=m.dataset.lane||"";$!=="candidate"&&$!=="queue"&&!/^s[1-5]$/.test($)||(c.preventDefault(),c.dataTransfer&&(c.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function Tt(c){c.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ot(c,m){let $=P.find(K=>K.id===c);if(!$)return;let f=P.filter(K=>K.id!==c),h=f.length;if(m){let K=m.dataset.beadId;if(K===c)return;let Ee=f.findIndex(ve=>ve.id===K);Ee>=0&&(h=Ee)}let z=f.slice();z.splice(h,0,$),w.applyReorder(c,z,h)}function Bt(c){let m=c.target?.closest?.(".worker-pane");if(!m)return;c.preventDefault(),m.classList.remove("worker-pane--drag-over");let $=m.dataset.lane||"",f=x?.bead_id||c.dataTransfer?.getData("text/plain")||"",h=x?.from_lane||"";if(x=null,!f)return;let z=c.target?.closest?.(".worker-mini, .worker-card"),K=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),Ee=K.length;if(z){let ve=K.indexOf(z);ve>=0&&(Ee=ve)}if(Ee=Math.max(0,Ee-m.querySelectorAll(".worker-mini--ghost").length),m.classList.contains("worker-pane--collapsed")&&(Ee=Z()),$==="candidate"){if(h==="candidate"){Ot(f,z);return}(h==="queue"||/^s[1-5]$/.test(h))&&Le(f);return}if($==="queue"||/^s[1-5]$/.test($)){let ve=$==="queue"?"parallel":$;h===$?ee(f,ve,Ee):ge(f,ve)}}function Xt(c){B=c,tb(c),Ne()}function et(c){Q=c==="board"||c==="created"||c==="spec"?c:jo,ab(Q),Ne()}function Wt(c){D=an(c)?c:en,lb(D),_?.(D),Ne()}function Pe(c){let m=c.target?.closest?.(".worker-serial-lane-count");if(m){let Ee=Number.parseInt(m.value,10);Number.isFinite(Ee)&&L(Ee).then(Ne);return}let $=c.target?.closest?.(".worker-filter__blocked");if($){Xt({...B,show_blocked:$.checked});return}let f=c.target?.closest?.(".worker-done-range");if(f){Wt(f.value);return}let h=c.target?.closest?.(".worker-sort");if(h){et(h.value||jo);return}let z=c.target?.closest?.(".worker-slots__input");if(!z)return;let K=Number.parseInt(z.value,10);if(!Number.isFinite(K)){Ne();return}S(K).then(Ne)}function T(c){return c?{runner:c.runner||void 0,model:c.model||void 0,effort:c.effort||void 0,worktree:c.worktree||void 0,status:c.status||void 0,session_id:c.session_id||void 0}:{}}function ce(){let c=k();return{operations:c.repo_operations,cleanup_failures:c.cleanup_failures,repo:d&&d()||""}}function Se(){C&&ke.close(),Xe.hidden=!1,we.hidden=!1,Ce.open(ce()),Ne()}function it(c){let m=Ae(),$=m.attempts?m.attempts[c]:null;C=c,fe=null,Ce.close(),Xe.hidden=!0,we.hidden=!1,ke.open({attempt_id:c,meta:T($)}),Ne()}function Ct(c,m){C=null,fe=c,Ce.close(),Xe.hidden=!0,we.hidden=!1,ke.open({attempt_id:c,meta:m,hide_prompt:!0}),Ne()}function y(){if(Ce.isOpen()&&Ce.refresh(ce()),fe){let $=(o?.get()?.runs||[]).find(f=>f.run_id===fe);$?ke.updateMeta(gi($)):ke.close();return}if(!C)return;let c=Ae(),m=c.attempts?c.attempts[C]:null;if(m){ke.updateMeta(T(m));return}ke.close()}function b(c){let m=c.target;if(m?.closest?.(".worker-mini__serial, .worker-mini__grip")||m?.closest?.("#worker-parallel-analysis-dialog"))return;if(m?.closest?.(".worker-analysis-btn")){V?.open();return}if(m?.closest?.(".worker-repo-strip")||m?.closest?.(".worker-mini__timeline")){Se();return}let $=m?.closest?.(".worker-repo-op__session");if($){let je=$.dataset.attemptId;je&&it(je);return}let f=m?.closest?.(".worker-repo-op__resolve");if(f){pe(f.dataset.operationId||"");return}let h=m?.closest?.(".worker-repo-op__dismiss");if(h){Me(h.dataset.operationId||"");return}let z=m?.closest?.(".worker-cleanup__resume");if(z){let je=z.dataset.beadId;je&&ut(je);return}let K=m?.closest?.(".worker-banner__resume");if(K){let je=K.dataset.attemptId;je&&rt(je);return}let Ee=m?.closest?.(".worker-banner__discard");if(Ee){let je=Ee.dataset.confirmation==="merged"?"merged":"unmerged";Fe(Ee.dataset.beadId||"",Ee.dataset.attemptId||null,je,Ee.dataset.operationId||null);return}let ve=m?.closest?.(".worker-banner__dismiss");if(ve){let je=ve.dataset.attemptId;je&&Qe(je);return}if(m?.closest?.(".worker-play")){G(!Ae().auto_advance);return}let A=m?.closest?.(".worker-merge-all");if(A){A.classList.contains("worker-merge-all--stop")?Ae().auto_merge===!0?_t(!1):De():_t(!0);return}let J=m?.closest?.(".worker-pane__hd--toggle");if(J){let je=J.dataset.lane;(je==="queue"||je==="done")&&$t(je);return}let F=m?.closest?.(".worker-card__place-lane");if(F){let je=F.dataset.beadId,xt=F.dataset.lane;je&&(xt==="parallel"||/^s[1-5]$/.test(xt||""))&&(H=null,Ne(),ge(je,xt));return}if(m?.closest?.(".worker-card__place-cancel")){H=null,Ne();return}let st=m?.closest?.(".worker-card__place");if(st){let je=st.dataset.beadId;je&&!st.disabled&&(Ve()?(H=je,Ne()):ge(je,"parallel"));return}let Je=m?.closest?.(".worker-filter__chip");if(Je){let je=Je.dataset.spec;(je==="all"||je==="with"||je==="without")&&Xt({...B,spec:je});return}let Ye=m?.closest?.(".worker-mini__merge");if(Ye){let je=Ye.dataset.beadId||"";Ae().cleanup_failed?.[je]?ut(je):ht(je);return}let Ze=m?.closest?.(".worker-mini__merge-cancel");if(Ze){Ue(Ze.dataset.beadId||"");return}let Rt=m?.closest?.(".worker-mini__discard");if(Rt){Fe(Rt.dataset.beadId||"",Rt.dataset.attemptId||null,Rt.dataset.discardMode==="merged"?"merged":"unmerged",Rt.dataset.operationId||null);return}let Jt=m?.closest?.(".worker-mini__stale-continue");if(Jt){mt("worker-stale-work-continue",Jt.dataset.beadId||"",Jt.dataset.actionId||"");return}let Mn=m?.closest?.(".worker-mini__stale-backup");if(Mn){mt("worker-stale-work-backup-fresh",Mn.dataset.beadId||"",Mn.dataset.actionId||"");return}let lr=m?.closest?.(".worker-mini__stale-recheck");if(lr){mt("worker-stale-work-recheck",lr.dataset.beadId||"",lr.dataset.actionId||"");return}let Mr=m?.closest?.(".worker-mini__revise-fix");if(Mr){ct("worker-revise-fix",Mr.dataset.beadId||"");return}let ys=m?.closest?.(".worker-mini__revise-approve");if(ys){ct("worker-revise-approve",ys.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__discard")){let je=m?.closest?.(".rtile"),xt=je?.dataset?.beadId,Dr=je?.dataset?.attemptId;xt&&Fe(xt,Dr||null,"unmerged",m?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(m?.closest?.(".rtile__dismiss")){let xt=m?.closest?.(".rtile")?.dataset?.attemptId;xt&&Qe(xt);return}if(m?.closest?.(".rtile__pause")){let xt=m?.closest?.(".rtile")?.dataset?.attemptId;xt&&tt(xt);return}if(m?.closest?.(".rtile__resume")){let xt=m?.closest?.(".rtile")?.dataset?.attemptId;xt&&rt(xt);return}if(m?.closest?.(".rtile__session")){let xt=m?.closest?.(".rtile")?.dataset?.attemptId;xt&&it(xt);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){Ce.close(),ke.close();return}if(m?.closest?.(".worker-drawer-host"))return;let cr=m?.closest?.(".rtile .board-card__roll-toggle");if(cr){let je=cr.dataset.rollParent;je&&(_e.has(je)?_e.delete(je):_e.add(je),Ne());return}let Vn=m?.closest?.(".rtile .board-card__roll-child");if(Vn){let je=Vn.dataset.childId;je&&u&&u(je);return}let Pn=m?.closest?.(".rtile");if(Pn){if(m?.closest?.(".rtile__id")){let xt=Pn.dataset.beadId;xt&&nn(xt).then(Dr=>{Dr?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let je=Pn.dataset.beadId;je&&u&&u(je);return}let Pr=m?.closest?.(".worker-mini, .worker-card");if(Pr){let je=Pr.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){je&&nn(je).then(xt=>{xt?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}je&&u&&u(je)}}return e.addEventListener("pointerdown",Nt),e.addEventListener("dragstart",Mt),e.addEventListener("dragover",qt),e.addEventListener("dragleave",Tt),e.addEventListener("drop",Bt),e.addEventListener("click",b),e.addEventListener("change",Pe),Et(),g&&se.push(g.subscribe(()=>{for(let[c,m]of M)m==="failed"&&M.delete(c);Ne()})),s&&se.push(s.subscribe(()=>{let c=d&&d()||"";c!==Be&&(Be=c,qe.close()),Ne(),y()})),o&&typeof o.subscribe=="function"&&se.push(o.subscribe(()=>{y(),Ne()})),Ne(),{load(){q(),Ne()},refreshSessionDefaults:oe,destroy(){for(let c of se.splice(0))try{c()}catch{}e.removeEventListener("pointerdown",Nt),e.removeEventListener("dragstart",Mt),e.removeEventListener("dragover",qt),e.removeEventListener("dragleave",Tt),e.removeEventListener("drop",Bt),e.removeEventListener("click",b),e.removeEventListener("change",Pe);try{ke.destroy()}catch{}we.hidden=!0;try{V?.destroy()}catch{}try{qe.destroy()}catch{}Ge(l``,e)}}}function vi(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function sp(e,t,n,r=async()=>{},s=async()=>{}){let o=At("views:workspace-picker"),a=null,i=!1,u=!1,d=!1;async function p(j){let I=j.target.value,$e=t.getState().workspace?.current?.path||"";if(I&&I!==$e){o("switching workspace to %s",I),i=!0,N();try{await n(I)}catch(ie){o("workspace switch failed: %o",ie)}finally{i=!1,N()}}}async function _(){let j=t.getState(),E=j.workspace?.current?.path||j.workspace?.available?.[0]?.path||"";if(!(!E||u)){o("git-pulling workspace %s",E),u=!0,N();try{await r(E)}catch(I){o("workspace git pull failed: %o",I)}finally{u=!1,N()}}}function g(j){let E=j.target;E&&e.contains(E)||P()}function w(j){j.key==="Escape"&&P()}function x(){d||(d=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",w),N())}function P(){d&&(d=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",w),N())}function B(){d?P():x()}async function H(j){let E=j.target,I=E.value,Y=E.checked;o("toggling visibility %s \u2192 %s",I,String(Y));try{await s(I,Y)}catch($e){o("workspace visibility toggle failed: %o",$e)}}function Q(j){return j?l`
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
    `:l``}function D(j,E){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${B}
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
                ${j.map(I=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${I.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${I.path}"
                        .checked=${!E.has(I.path)}
                        @change=${H}
                      />
                      <span class="workspace-picker__manage-name"
                        >${vi(I.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let j=t.getState(),E=j.workspace?.current,I=j.workspace?.available||[],Y=new Set(j.workspace?.hidden||[]),$e=E?.path||I[0]?.path||"";if(I.length===0)return l``;let ie=I.filter(_e=>!Y.has(_e.path)||_e.path===$e);if(ie.length<=1){let _e=ie[0]||I[0],X=vi(_e.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${_e.path}"
            >${X}</span
          >
          ${D(I,Y)}
          ${Q($e)}
          ${u?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||u}
          aria-label="Select project workspace"
        >
          ${ie.map(_e=>l`
              <option
                value="${_e.path}"
                ?selected=${_e.path===$e}
                title="${_e.path}"
              >
                ${vi(_e.path)}
              </option>
            `)}
        </select>
        ${D(I,Y)}
        ${Q($e)}
        ${i||u?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function N(){Ge(M(),e)}return N(),a=t.subscribe(()=>N()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",w),Ge(l``,e)}}}var op=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function wi(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function ap(e,t,n=wi()){return{id:n,type:e,payload:t}}function ip(e={}){let t=At("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,u=!0,d=new Map,p=[],_=new Map,g=new Set;function w(M){for(let N of Array.from(g))try{N(M)}catch{}}function x(){if(!u||i)return;o="reconnecting",t("ws reconnecting\u2026"),w(o);let M=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),N=(n.jitterRatio||0)*M,j=Math.max(0,Math.round(M+(Math.random()*2-1)*N));t("ws retry in %d ms (attempt %d)",j,a+1),i=setTimeout(()=>{i=null,D()},j)}function P(M){try{s?.send(JSON.stringify(M))}catch(N){t("ws send failed",N)}}function B(){for(o="open",t("ws open"),w(o),a=0;p.length;){let M=p.shift();M&&P(M)}}function H(M){let N;try{N=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!N||typeof N.id!="string"||typeof N.type!="string"){t("ws received invalid envelope");return}if(d.has(N.id)){let E=d.get(N.id);d.delete(N.id),N.ok?E?.resolve(N.payload):E?.reject(N.error||new Error("ws error"));return}let j=_.get(N.type);if(j&&j.size>0)for(let E of Array.from(j))try{E(N.payload)}catch(I){t("ws event handler error",I)}else t("ws received unhandled message type: %s",N.type)}function Q(){o="closed",t("ws closed"),w(o);for(let[M,N]of d.entries())N.reject(new Error("ws disconnected")),d.delete(M);a+=1,x()}function D(){if(!u)return;let M=r();try{s=new WebSocket(M),t("ws connecting %s",M),o="connecting",w(o),s.addEventListener("open",B),s.addEventListener("message",H),s.addEventListener("error",()=>{}),s.addEventListener("close",Q)}catch(N){t("ws connect failed %o",N),x()}}return D(),{send(M,N){if(!op.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let j=wi(),E=ap(M,N,j);return t("send %s id=%s",M,j),new Promise((I,Y)=>{d.set(j,{resolve:I,reject:Y,type:M}),s&&s.readyState===s.OPEN?P(E):(t("queue %s id=%s (state=%s)",M,j,o),p.push(E))})},on(M,N){_.has(M)||_.set(M,new Set);let j=_.get(M);return j?.add(N),()=>{j?.delete(N)}},onConnection(M){return g.add(M),()=>{g.delete(M)}},reconnect(){u=!0,i&&(clearTimeout(i),i=null),a=0,D()},close(){u=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function $b(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function xb(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var ki=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],lp=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Hn="tab:worker:closed",Ab="bdui.worker.done-range",cp=pd,up="worker:queue",dp="worker:parallel-analysis",pp="ui:order",fp="ui:display-policy",_p="exec:presets",Gn="tab:board:closed",mp="beads-ui.board.closed-range";function Sb(e){let t=At("main");t("bootstrap start");let n=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ge(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),u=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(a&&Od(a),i&&u&&d&&p){let oe=function(f,h){let z="Request failed",K="";if(f&&typeof f=="object"){let ve=f;if(typeof ve.message=="string"&&ve.message.length>0&&(z=ve.message),typeof ve.details=="string")K=ve.details;else if(ve.details&&typeof ve.details=="object")try{K=JSON.stringify(ve.details,null,2)}catch{K=""}}else typeof f=="string"&&f.length>0&&(z=f);let Ee=h&&h.length>0?`Failed to load ${h}`:"Request failed";q.open(Ee,z,K)},R=function(f){return`${et.getState().workspace.current?.path||""}\0${f}`},Z=function(){qe&&(qe().catch(()=>{}),qe=null),Be=null,W=null},ee=function(f){V=f;let h=()=>{V!==f||et.getState().selected_id!==f||(V=null,ge(f))};if(!We){Ve.then(h);return}h()},Qe=function(f,h,z,K,Ee){return z!==rt[h]?(Ee().catch(()=>{}),!1):(f.set(K,Ee),!0)},ht=function(){let f=et.getState();De(f.view==="board"),Me(f.view==="worker"),ae(f.view==="monitor"),L(f.view==="board"||f.view==="worker"||ft||!!f.selected_id)},_t=function(){let f=Jn(ut);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},Ue=function(){let f=Jn(lt);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},De=function(f){if(f)for(let[h,z]of ki){if(Le.has(h)||tt.has(h))continue;let K=h===Gn?_t():{type:z};try{Oe.register(h,K)}catch(A){t("register %s store failed: %o",h,A)}tt.add(h);let Ee=rt.board,ve=!1;we.subscribeList(h,K).then(A=>{ve=!Qe(Le,"board",Ee,h,A)}).catch(A=>{t("subscribe %s failed: %o",h,A),oe(A,"board")}).finally(()=>{tt.delete(h),ve&&ht()})}else ct()},ct=function(){rt.board+=1;for(let[f]of ki){let h=Le.get(f);h&&(h().catch(()=>{}),Le.delete(f));try{Oe.unregister(f)}catch(z){t("unregister %s failed: %o",f,z)}}},Me=function(f){if(!f){S();return}for(let[h,z]of lp){if(G.has(h)||tt.has(h))continue;let K=h===Hn?Ue():{type:z};try{Oe.register(h,K)}catch(A){t("register %s store failed: %o",h,A)}tt.add(h);let Ee=rt.worker,ve=!1;we.subscribeList(h,K).then(A=>{ve=!Qe(G,"worker",Ee,h,A)}).catch(A=>{t("subscribe %s failed: %o",h,A),oe(A,"worker")}).finally(()=>{tt.delete(h),ve&&ht()})}},S=function(){rt.worker+=1;for(let[f]of lp){let h=G.get(f);h&&(h().catch(()=>{}),G.delete(f));try{Oe.unregister(f)}catch(z){t("unregister %s failed: %o",f,z)}}},L=function(f){if(!f){k();return}pe||(xe("subscribe-worker-queue",{id:up}).catch(h=>{t("subscribe-worker-queue failed: %o",h)}),xe("subscribe-worker-parallel-analysis",{id:dp}).catch(h=>{t("subscribe-worker-parallel-analysis failed: %o",h)}),pe=()=>(xe("unsubscribe-worker-parallel-analysis",{id:dp}),xe("unsubscribe-worker-queue",{id:up})))},k=function(){pe&&(pe().catch(()=>{}),pe=null),Xe.clear()},ae=function(f){if(!f){le();return}O||(xe("subscribe-monitor-pipeline",{id:cp}).catch(h=>{t("subscribe-monitor-pipeline failed: %o",h)}),O=()=>xe("unsubscribe-monitor-pipeline",{id:cp}))},le=function(){O&&(O().catch(()=>{}),O=null)},he=function(){te||(xe("subscribe-ui-order",{id:pp}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),te=()=>xe("unsubscribe-ui-order",{id:pp}))},at=function(){te&&(te().catch(()=>{}),te=null),C.clear()},He=function(){Ke||(xe("subscribe-display-policy",{id:fp}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),Ke=()=>xe("unsubscribe-display-policy",{id:fp}))},bt=function(){Ke&&(Ke().catch(()=>{}),Ke=null),fe.clear()},Ne=function(){$t||(xe("subscribe-impl-presets",{id:_p}).catch(f=>{t("subscribe-impl-presets failed: %o",f)}),$t=()=>xe("unsubscribe-impl-presets",{id:_p}))},Tt=function(f){if(!f)return"Unknown";let h=f.split("/").filter(Boolean);return h.length>0?h[h.length-1]:"Unknown"};var _=oe,g=R,w=Z,x=ee,P=Qe,B=ht,H=_t,Q=Ue,D=De,M=ct,N=Me,j=S,E=L,I=k,Y=ae,$e=le,ie=he,_e=at,X=He,Ie=bt,ye=Ne,ne=Tt;let se=document.getElementById("header-loading"),Te=Ll(se),q=vu(e),re=ip(),xe=Te.wrapSend((f,h)=>re.send(f,h)),we=Al(xe),Oe=Sl(),be=Cl(),Xe=Tl(),pt=ul(),C=El(),fe=ll(),ke=cl(),Ce=dl();re.on("impl-presets-snapshot",f=>{let h=f;h&&typeof h.revision=="number"&&Array.isArray(h.presets)&&ke.set({revision:h.revision,presets:h.presets})}),re.on("monitor-pipeline-snapshot",f=>{let h=f;if(!(!h||!Array.isArray(h.workspaces)))try{pt.set(h.workspaces,h.workspaces_state)}catch{}}),re.on("ui-order-snapshot",f=>{let h=f;if(h&&typeof h.revision=="number")try{C.set({revision:h.revision,order:h.order&&typeof h.order=="object"?h.order:{}})}catch{}}),re.on("display-policy-snapshot",f=>{let h=f;if(h&&h.policy&&typeof h.policy=="object")try{fe.set(h.policy)}catch{}}),re.on("session-log-snapshot",f=>{let h=f;if(h&&typeof h.id=="string")try{Ce.set(h.id,Array.isArray(h.lines)?h.lines:[],typeof h.last_event_at=="number"?h.last_event_at:null)}catch{}}),re.on("session-log-append",f=>{let h=f;if(h&&typeof h.id=="string")try{Ce.append(h.id,h.event)}catch{}}),re.on("snapshot",f=>{let h=f,z=h&&typeof h.id=="string"?h.id:"",K=z?Oe.getStore(z):null;if(K&&h&&h.type==="snapshot")try{K.applyPush(h)}catch{}}),re.on("upsert",f=>{let h=f,z=h&&typeof h.id=="string"?h.id:"",K=z?Oe.getStore(z):null;if(K&&h&&h.type==="upsert")try{K.applyPush(h)}catch{}}),re.on("delete",f=>{let h=f,z=h&&typeof h.id=="string"?h.id:"",K=z?Oe.getStore(z):null;if(K&&h&&h.type==="delete")try{K.applyPush(h)}catch{}});let qe=null,Be=null,W=null,V=null,Ae=()=>{},Ve=new Promise(f=>{Ae=()=>f(void 0)}),We=!1,de=!1;async function ge(f){let h=R(f);if(h===Be||h===W)return;W=h;let z=`detail:${f}`,K={type:"issue-detail",params:{id:f}};try{Oe.register(z,K)}catch(Ee){t("register detail store failed: %o",Ee)}try{let Ee=await we.subscribeList(z,K);if(et.getState().selected_id!==f||R(f)!==h){await Ee().catch(()=>{});return}qe&&await qe().catch(()=>{}),qe=Ee,Be=h}catch(Ee){t("detail subscribe failed: %o",Ee),oe(Ee,"issue details")}finally{W===h&&(W=null)}}let Le=new Map,tt=new Set,rt={board:0,worker:0},ft=!1,ut=en;try{let f=window.localStorage.getItem(mp);an(f)&&(ut=f)}catch{}let lt=en;try{let f=window.localStorage.getItem(Ab);an(f)&&(lt=f)}catch{}async function Fe(f){if(!an(f)||f===ut)return;ut=f;try{window.localStorage.setItem(mp,f)}catch{}let h=Le.get(Gn);if(!h)return;Le.delete(Gn),await h().catch(()=>{});let z=_t();try{Oe.register(Gn,z)}catch(K){t("register %s store failed: %o",Gn,K)}try{let K=await we.subscribeList(Gn,z);Le.set(Gn,K)}catch(K){t("re-subscribe %s failed: %o",Gn,K),oe(K,"board")}}async function mt(f){if(!an(f)||f===lt)return;lt=f;let h=G.get(Hn);if(!h)return;G.delete(Hn),await h().catch(()=>{});let z=Ue();try{Oe.register(Hn,z)}catch(K){t("register %s store failed: %o",Hn,K)}try{let K=await we.subscribeList(Hn,z);G.set(Hn,K)}catch(K){t("re-subscribe %s failed: %o",Hn,K),oe(K,"worker")}}let G=new Map,pe=null,O=null,te=null,Ke=null,$t=null;async function Et(){Ke=null,fe.clear(),$t=null,ke.clear(),pe=null,O=null,Le.clear(),G.clear(),rt.board+=1,rt.worker+=1,Ne();let f=et.getState().workspace.current?.path;if(f)try{await re.send("set-workspace",{path:f})}catch(z){t("workspace restore after reconnect failed: %o",z);return}He();let h=et.getState();De(h.view==="board"),Me(h.view==="worker"),ae(h.view==="monitor"),L(h.view==="board"||h.view==="worker"||!!h.selected_id)}async function jt(){t("clearing all subscriptions for workspace switch"),ct(),S(),k(),be.clear(),at(),he(),bt(),He(),Z();let f=et.getState();if(f.selected_id)try{Oe.unregister(`detail:${f.selected_id}`)}catch{}let h=et.getState();De(h.view==="board"),Me(h.view==="worker"),ae(h.view==="monitor"),L(h.view==="board"||h.view==="worker"||!!h.selected_id),h.selected_id&&ee(h.selected_id)}async function Nt(f){t("requesting workspace switch to %s",f),de=!0;try{let h=await re.send("set-workspace",{path:f});t("workspace switch result: %o",h),h&&h.workspace&&(et.setState({workspace:{current:{path:h.workspace.root_dir,database:h.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),h.changed&&(await jt(),ue("Switched to "+Tt(f),"success",2e3)))}catch(h){throw t("workspace switch failed: %o",h),ue("Failed to switch workspace","error",3e3),h}finally{de=!1}}async function Mt(f){t("requesting workspace git pull for %s",f);try{let h=await re.send("git-pull-workspace",{});t("workspace git pull result: %o",h);let z=h?.status;if(z==="up_to_date"){ue("Already up to date","success",2e3);return}if(z==="stash_pop_conflict"){ue("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ue("Git pulled "+Tt(f),"success",2e3)}catch(h){t("workspace git pull failed: %o",h);let z=h?.code,K=h?.message;if(z==="rebase_conflict"){ue("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(z==="rebase_conflict_abort_failed"){ue("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(z==="busy"){ue("Git pull skipped: another operation is running","warning",3e3);return}let Ee=K?`: ${K}`:"";throw ue(`Git pull failed${Ee}`,"error",3e3),h}}async function qt(f,h){t("setting workspace visibility %s \u2192 %s",f,String(h));try{await re.send("set-workspace-visibility",{path:f,visible:h}),await Ot()}catch(z){t("workspace visibility update failed: %o",z),ue("Failed to update project visibility","error",3e3)}}async function Ot(){try{let f=await re.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let h=f.workspaces.map(ve=>({path:ve.path,database:ve.database,pid:ve.pid,version:ve.version})),z=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,K=Array.isArray(f.hidden)?f.hidden.filter(ve=>typeof ve=="string"):[];et.setState({workspace:{current:z,available:h,hidden:K}});let Ee=window.localStorage.getItem("beads-ui.workspace");Ee&&(!h.some(A=>A.path===Ee)||K.includes(Ee)?window.localStorage.removeItem("beads-ui.workspace"):z&&Ee!==z.path&&(t("restoring saved workspace preference: %s",Ee),await Nt(Ee)))}}catch(f){t("failed to load workspaces: %o",f)}}re.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(et.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),Ot(),jt())});let Bt=!1;if(typeof re.onConnection=="function"){let f=h=>{t("ws state %s",h),h==="reconnecting"||h==="closed"?(Bt=!0,ue("Connection lost. Reconnecting\u2026","error",4e3)):h==="open"&&Bt&&(Bt=!1,ue("Reconnected","success",2200),xb(et,(z,K)=>{t(`${z}: %o`,K)}),Et())};re.onConnection(f)}let Xt="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(Xt=f)}catch(f){t("view parse error: %o",f)}let et=Ol({config:$b(),view:Xt});re.on("worker-queue-snapshot",f=>{let h=f;if(!h||!h.queue)return;let z=et.getState().workspace.current?.path;if(typeof z=="string"&&z.length>0&&h.root_dir!==z){t("dropping worker-queue snapshot for %s",String(h.root_dir));return}try{be.set(h.queue)}catch{}}),re.on("worker-parallel-analysis-snapshot",f=>{let h=f;if(!h)return;let z=et.getState().workspace.current?.path;if(!(typeof z=="string"&&z.length>0&&typeof h.root_dir=="string"&&h.root_dir!==z))try{Xe.set({settings:h.settings,job:h.job??null,runs:Array.isArray(h.runs)?h.runs:[],last_good:h.last_good??null})}catch{}});let Wt=Rl(et);Wt.start();let Pe=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),T=async(f,h)=>{try{return await xe(f,h)}catch(z){if(Pe.has(f))throw z;return[]}};_d({global_element:r,repo_element:s},et,Wt);let ce=document.getElementById("workspace-picker");ce&&sp(ce,et,Nt,Mt,qt);let Se=bd(e,(f,h)=>xe(f,h));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>Se.open())}catch{}let it=kd(e,{policyStore:fe,queueStore:be,implPresetStore:ke,transport:(f,h)=>xe(f,h),onOpenChange:f=>{let h=ft;ft=f,ht(),h&&f===!1&&y.refreshSessionDefaults()},labelOptions:()=>{let f=new Set;for(let[h]of ki)for(let z of Oe.snapshotFor(h)||[]){let K=z.labels;if(Array.isArray(K))for(let Ee of K)typeof Ee=="string"&&Ee.length>0&&f.add(Ee)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&(f.setAttribute("aria-label","\uC124\uC815"),f.setAttribute("title","\uC124\uC815"),f.addEventListener("click",()=>it.open()))}catch{}let Ct=Hl(i,{gotoIssue:f=>Wt.gotoIssue(f),issueStores:Oe,transport:T,workerQueueStore:be,uiOrderStore:C,displayPolicyStore:fe,closedRange:ut,onClosedRangeChange:f=>{Fe(f)},onNewIssue:()=>Se.open()}),y=yi(u,{transport:T,issueStores:Oe,queueStore:be,analysisStore:Xe,sessionLogStore:Ce,uiOrderStore:C,gotoIssue:f=>et.setState({selected_id:f}),getWorkspacePath:()=>et.getState().workspace.current?.path,doneRange:lt,onDoneRangeChange:f=>{mt(f)}}),b=fd(d,{transport:T,pipelineStore:pt,execPresetStore:ke,sessionLogStore:Ce,router:Wt,gotoIssue:f=>Wt.gotoIssue(f),getWorkspacePath:()=>et.getState().workspace.current?.path,switchWorkspace:f=>Nt(f)}),c=yu(p,{issueStores:Oe,transport:T,queueStore:be,execPresetStore:ke,sessionLogStore:Ce,getWorkspacePath:()=>et.getState().workspace.current?.path,onNavigate:f=>{et.getState().view==="worker"?et.setState({selected_id:f}):Wt.gotoIssue(f)},onClose:()=>{let f=et.getState();et.setState({selected_id:null});try{Wt.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{it.open("execution")}}),m=et.getState().selected_id;m&&(p.hidden=!1,c.load(m),ee(m)),et.subscribe(f=>{let h=f.selected_id;h?(p.hidden=!1,c.load(h),de||ee(h)):(c.clear(),p.hidden=!0,Z())});let $=f=>{i.hidden=f.view!=="board",u.hidden=f.view!=="worker",d.hidden=f.view!=="monitor",o&&o.classList.toggle("is-quiet",f.view==="monitor"),De(f.view==="board"),Me(f.view==="worker"),ae(f.view==="monitor"),L(f.view==="board"||f.view==="worker"||ft||!!f.selected_id),!f.selected_id&&f.view==="board"&&Ct.load(),f.view==="worker"&&y.load(),f.view==="monitor"?b.load():b.pause(),window.localStorage.setItem("beads-ui.view",f.view)};et.subscribe($),$(et.getState()),he(),He(),Ne(),Ot().finally(()=>{We=!0,Ae()}),window.addEventListener("keydown",f=>{let h=f.ctrlKey||f.metaKey,z=String(f.key||"").toLowerCase(),K=f.target,Ee=K&&K.tagName?String(K.tagName).toLowerCase():"",ve=Ee==="input"||Ee==="textarea"||Ee==="select"||K&&typeof K.isContentEditable=="boolean"&&K.isContentEditable;h&&z==="n"&&(ve||(f.preventDefault(),Se.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Sb(t)});export{Sb as bootstrap,$b as readBootstrapConfig,xb as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
