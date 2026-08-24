var kp=Object.create;var Wo=Object.defineProperty;var $p=Object.getOwnPropertyDescriptor;var xp=Object.getOwnPropertyNames;var Ap=Object.getPrototypeOf,Sp=Object.prototype.hasOwnProperty;var Ep=(e,t,r)=>t in e?Wo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var zo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Tp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of xp(t))!Sp.call(e,s)&&s!==r&&Wo(e,s,{get:()=>t[s],enumerable:!(n=$p(t,s))||n.enumerable});return e};var Cp=(e,t,r)=>(r=e!=null?kp(Ap(e)):{},Tp(t||!e||!e.__esModule?Wo(r,"default",{value:e,enumerable:!0}):r,e));var wt=(e,t,r)=>Ep(e,typeof t!="symbol"?t+"":t,r);var nl=zo((fb,rl)=>{var gn=1e3,hn=gn*60,bn=hn*60,Yr=bn*24,Lp=Yr*7,Op=Yr*365.25;rl.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Mp(e);if(r==="number"&&isFinite(e))return t.long?Dp(e):Pp(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Mp(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Op;case"weeks":case"week":case"w":return r*Lp;case"days":case"day":case"d":return r*Yr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*bn;case"minutes":case"minute":case"mins":case"min":case"m":return r*hn;case"seconds":case"second":case"secs":case"sec":case"s":return r*gn;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Pp(e){var t=Math.abs(e);return t>=Yr?Math.round(e/Yr)+"d":t>=bn?Math.round(e/bn)+"h":t>=hn?Math.round(e/hn)+"m":t>=gn?Math.round(e/gn)+"s":e+"ms"}function Dp(e){var t=Math.abs(e);return t>=Yr?Ls(e,t,Yr,"day"):t>=bn?Ls(e,t,bn,"hour"):t>=hn?Ls(e,t,hn,"minute"):t>=gn?Ls(e,t,gn,"second"):e+" ms"}function Ls(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var ol=zo((_b,sl)=>{function Np(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=i,r.humanize=nl(),r.destroy=u,Object.keys(e).forEach(d=>{r[d]=e[d]}),r.names=[],r.skips=[],r.formatters={};function t(d){let p=0;for(let _=0;_<d.length;_++)p=(p<<5)-p+d.charCodeAt(_),p|=0;return r.colors[Math.abs(p)%r.colors.length]}r.selectColor=t;function r(d){let p,_=null,h,T;function L(...B){if(!L.enabled)return;let V=L,H=Number(new Date),P=H-(p||H);V.diff=P,V.prev=p,V.curr=H,p=H,B[0]=r.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let j=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(U,b)=>{if(U==="%%")return"%";j++;let F=r.formatters[b];if(typeof F=="function"){let J=B[j];U=F.call(V,J),B.splice(j,1),j--}return U}),r.formatArgs.call(V,B),(V.log||r.log).apply(V,B)}return L.namespace=d,L.useColors=r.useColors(),L.color=r.selectColor(d),L.extend=n,L.destroy=r.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(h!==r.namespaces&&(h=r.namespaces,T=r.enabled(d)),T),set:B=>{_=B}}),typeof r.init=="function"&&r.init(L),L}function n(d,p){let _=r(this.namespace+(typeof p>"u"?":":p)+d);return _.log=this.log,_}function s(d){r.save(d),r.namespaces=d,r.names=[],r.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of p)_[0]==="-"?r.skips.push(_.slice(1)):r.names.push(_)}function o(d,p){let _=0,h=0,T=-1,L=0;for(;_<d.length;)if(h<p.length&&(p[h]===d[_]||p[h]==="*"))p[h]==="*"?(T=h,L=_,h++):(_++,h++);else if(T!==-1)h=T+1,L++,_=L;else return!1;for(;h<p.length&&p[h]==="*";)h++;return h===p.length}function a(){let d=[...r.names,...r.skips.map(p=>"-"+p)].join(",");return r.enable(""),d}function i(d){for(let p of r.skips)if(o(d,p))return!1;for(let p of r.names)if(o(d,p))return!0;return!1}function c(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}sl.exports=Np});var al=zo((Zt,Os)=>{Zt.formatArgs=Fp;Zt.save=jp;Zt.load=Bp;Zt.useColors=qp;Zt.storage=Up();Zt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Zt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function qp(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Fp(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Os.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Zt.log=console.debug||console.log||(()=>{});function jp(e){try{e?Zt.storage.setItem("debug",e):Zt.storage.removeItem("debug")}catch{}}function Bp(){let e;try{e=Zt.storage.getItem("debug")||Zt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Up(){try{return localStorage}catch{}}Os.exports=ol()(Zt);var{formatters:Wp}=Os.exports;Wp.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Dn=globalThis,Ss=Dn.trustedTypes,Bi=Ss?Ss.createPolicy("lit-html",{createHTML:e=>e}):void 0,Go="$lit$",vr=`lit$${Math.random().toFixed(9).slice(2)}$`,Vo="?"+vr,Rp=`<${Vo}>`,Hr=document,Nn=()=>Hr.createComment(""),qn=e=>e===null||typeof e!="object"&&typeof e!="function",Ko=Array.isArray,Vi=e=>Ko(e)||typeof e?.[Symbol.iterator]=="function",Ho=`[ 	
\f\r]`,Pn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ui=/-->/g,Wi=/>/g,Wr=RegExp(`>|${Ho}(?:([^\\s"'>=/]+)(${Ho}*=${Ho}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),zi=/'/g,Hi=/"/g,Ki=/^(?:script|style|textarea|title)$/i,Yo=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=Yo(1),mn=Yo(2),ab=Yo(3),sr=Symbol.for("lit-noChange"),Ot=Symbol.for("lit-nothing"),Gi=new WeakMap,zr=Hr.createTreeWalker(Hr,129);function Yi(e,t){if(!Ko(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Bi!==void 0?Bi.createHTML(t):t}var Zi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Pn;for(let i=0;i<r;i++){let c=e[i],u,d,p=-1,_=0;for(;_<c.length&&(a.lastIndex=_,d=a.exec(c),d!==null);)_=a.lastIndex,a===Pn?d[1]==="!--"?a=Ui:d[1]!==void 0?a=Wi:d[2]!==void 0?(Ki.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=Wr):d[3]!==void 0&&(a=Wr):a===Wr?d[0]===">"?(a=s??Pn,p=-1):d[1]===void 0?p=-2:(p=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?Wr:d[3]==='"'?Hi:zi):a===Hi||a===zi?a=Wr:a===Ui||a===Wi?a=Pn:(a=Wr,s=void 0);let h=a===Wr&&e[i+1].startsWith("/>")?" ":"";o+=a===Pn?c+Rp:p>=0?(n.push(u),c.slice(0,p)+Go+c.slice(p)+vr+h):c+vr+(p===-2?i:h)}return[Yi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Fn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,d]=Zi(t,r);if(this.el=e.createElement(u,n),zr.currentNode=this.el.content,r===2||r===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=zr.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(Go)){let _=d[a++],h=s.getAttribute(p).split(vr),T=/([.?@])?(.*)/.exec(_);c.push({type:1,index:o,name:T[2],strings:h,ctor:T[1]==="."?Ts:T[1]==="?"?Cs:T[1]==="@"?Rs:Vr}),s.removeAttribute(p)}else p.startsWith(vr)&&(c.push({type:6,index:o}),s.removeAttribute(p));if(Ki.test(s.tagName)){let p=s.textContent.split(vr),_=p.length-1;if(_>0){s.textContent=Ss?Ss.emptyScript:"";for(let h=0;h<_;h++)s.append(p[h],Nn()),zr.nextNode(),c.push({type:2,index:++o});s.append(p[_],Nn())}}}else if(s.nodeType===8)if(s.data===Vo)c.push({type:2,index:o});else{let p=-1;for(;(p=s.data.indexOf(vr,p+1))!==-1;)c.push({type:7,index:o}),p+=vr.length-1}o++}}static createElement(t,r){let n=Hr.createElement("template");return n.innerHTML=t,n}};function Gr(e,t,r=e,n){if(t===sr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=qn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Gr(e,s._$AS(e,t.values),s,n)),t}var Es=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Hr).importNode(r,!0);zr.currentNode=s;let o=zr.nextNode(),a=0,i=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new _n(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Is(o,this,t)),this._$AV.push(u),c=n[++i]}a!==c?.index&&(o=zr.nextNode(),a++)}return zr.currentNode=Hr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},_n=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=Ot,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Gr(this,t,r),qn(t)?t===Ot||t==null||t===""?(this._$AH!==Ot&&this._$AR(),this._$AH=Ot):t!==this._$AH&&t!==sr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Vi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ot&&qn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Hr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Fn.createElement(Yi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Es(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Gi.get(t.strings);return r===void 0&&Gi.set(t.strings,r=new Fn(t)),r}k(t){Ko(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Nn()),this.O(Nn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Vr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=Ot,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Ot}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Gr(this,t,r,0),a=!qn(t)||t!==this._$AH&&t!==sr,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Gr(this,i[n+c],r,c),u===sr&&(u=this._$AH[c]),a||(a=!qn(u)||u!==this._$AH[c]),u===Ot?t=Ot:t!==Ot&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===Ot?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ts=class extends Vr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ot?void 0:t}},Cs=class extends Vr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ot)}},Rs=class extends Vr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Gr(this,t,r,0)??Ot)===sr)return;let n=this._$AH,s=t===Ot&&n!==Ot||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Ot&&(n===Ot||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Is=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Gr(this,t)}},Qi={M:Go,P:vr,A:Vo,C:1,L:Zi,R:Es,D:Vi,V:Gr,I:_n,H:Vr,N:Cs,U:Rs,B:Ts,F:Is},Ip=Dn.litHtmlPolyfillSupport;Ip?.(Fn,_n),(Dn.litHtmlVersions??(Dn.litHtmlVersions=[])).push("3.3.1");var Ge=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new _n(t.insertBefore(Nn(),o),o,void 0,r??{})}return s._$AI(e),s};var er="today",Rr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function or(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Kr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Xi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ji(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function el(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function tl(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var il=Cp(al(),1);function St(e){return(0,il.default)(`beads-ui:${e}`)}function pr(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Zr(e,t){let r=pr(e.created_at),n=pr(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ul(e,t){let r=pr(e.created_at),n=pr(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function dl(e,t){let r=pr(e.updated_at),n=pr(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function pl(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=pr(e.created_at),o=pr(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function fl(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var zp=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ll(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function cl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=zp.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function _l(e,t){let r=ll(e),n=ll(t);if(r!==n)return r<n?-1:1;let s=cl(e),o=cl(t);if(s!==o)return s<o?-1:1;let a=pr(e&&e.created_at),i=pr(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Zo=2**20;function yn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-pr(e&&e.created_at)}function Ms(e){return(t,r)=>{let n=yn(t,e),s=yn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Qo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:yn(i,r)-Zo};if(!i)return{rank:yn(a,r)+Zo};let c=yn(a,r),u=yn(i,r),d=(c+u)/2;return c<d&&d<u?{rank:d}:{renormalize:n.map((p,_)=>({bead_id:p.id,rank:_*Zo}))}}function Xo(e,t={}){let r=St(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||Zr;function u(){for(let _ of Array.from(a))try{_()}catch{}}function d(){s=Array.from(n.values()).sort(c)}function p(_){if(i||!_||_.id!==e)return;let h=Number(_.revision)||0;if(r("apply %s rev=%d",_.type,h),!(h<=o&&_.type!=="snapshot")){if(_.type==="snapshot"){if(h<=o)return;n.clear();let T=Array.isArray(_.issues)?_.issues:[];for(let L of T)L&&typeof L.id=="string"&&L.id.length>0&&n.set(L.id,L);d(),o=h,u();return}if(_.type==="upsert"){let T=_.issue;if(T&&typeof T.id=="string"&&T.id.length>0){let L=n.get(T.id);if(!L)n.set(T.id,T);else{let B=Number.isFinite(L.updated_at)?L.updated_at:0,V=Number.isFinite(T.updated_at)?T.updated_at:0;if(B<=V){for(let H of Object.keys(L))H in T||delete L[H];for(let[H,P]of Object.entries(T))L[H]=P}}d()}o=h,u()}else if(_.type==="delete"){let T=String(_.issue_id||"");T&&(n.delete(T),d()),o=h,u()}}}return{id:e,subscribe(_){return a.add(_),()=>{a.delete(_)}},applyPush:p,snapshot(){return s},size(){return n.size},getById(_){return n.get(_)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function Ps(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function ml(e){let t=St("subs"),r=new Map,n=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let d=Array.isArray(c.added)?c.added:[],p=Array.isArray(c.updated)?c.updated:[],_=Array.isArray(c.removed)?c.removed:[];for(let h of Array.from(u)){let T=r.get(h);if(!T)continue;let L=T.itemsById;for(let B of d)typeof B=="string"&&B.length>0&&L.set(B,!0);for(let B of p)typeof B=="string"&&B.length>0&&L.set(B,!0);for(let B of _)typeof B=="string"&&B.length>0&&L.delete(B)}}async function o(i,c){let u=Ps(c);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let p=r.get(i);if(p&&p.key!==u){let _=n.get(p.key);_&&(_.delete(i),_.size===0&&n.delete(p.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let d=n.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(p){let _=r.get(i)||null;if(_){let h=n.get(_.key);h&&(h.delete(i),h.size===0&&n.delete(_.key))}throw r.delete(i),p}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let p=r.get(i)||null;if(p){let _=n.get(p.key);_&&(_.delete(i),_.size===0&&n.delete(p.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Ps,selectors:{getIds(i){let c=r.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=r.get(i);return u?u.itemsById.has(c):!1},count(i){let c=r.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=r.get(i),u={};if(!c)return u;for(let d of c.itemsById.keys())u[d]=!0;return u}}}}function gl(){let e=St("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,d){let p=u?Ps(u):"",_=r.get(c)||"",h=t.has(c);if(e("register %s key=%s (prev=%s)",c,p,_),h&&_&&p&&_!==p){let T=t.get(c);if(T)try{T.dispose()}catch{}let L=s.get(c);if(L){try{L()}catch{}s.delete(c)}let B=Xo(c,d);t.set(c,B);let V=B.subscribe(()=>o());s.set(c,V)}else if(!h){let T=Xo(c,d);t.set(c,T);let L=T.subscribe(()=>o());s.set(c,L)}return r.set(c,p),()=>i(c)}function i(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let d=s.get(c);if(d){try{d()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function hl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function bl(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function yl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Jo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Hp(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Gp(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function vl(e){let t=St("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Hp(n),a=Gp(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Jo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Jo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Vp=Object.freeze({workspace_config:{default_workspace:null}});function wl(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Vp.workspace_config.default_workspace}}}function kl(e={}){let t=St("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:wl(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?wl(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==r.workspace.hidden[d]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===r.worker.show_closed_children[d])&&!i&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function $l(e){let t=St("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(p,_)=>{let h=s++,T=Date.now();n.set(h,{type:p,start_ts:T}),t("request start id=%d type=%s count=%d",h,p,r+1),a();let L=!1,B=()=>{L||(L=!0,n.delete(h),i())},V=setTimeout(()=>{L||(t("request TIMEOUT id=%d type=%s elapsed=%dms",h,p,Date.now()-T),B())},3e4);try{let H=await u(p,_),P=Date.now()-T;return t("request done id=%d type=%s elapsed=%dms",h,p,P),H}catch(H){let P=Date.now()-T;throw t("request error id=%d type=%s elapsed=%dms err=%o",h,p,P,H),H}finally{clearTimeout(V),B()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function _e(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Ds(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(fl),c;switch(i){case"created_desc":return c.sort(Zr),c;case"created_asc":return c.sort(ul),c;case"updated_desc":return c.sort(dl),c;case"priority":return c.sort(pl),c;case"manual":default:{let u=r();return u?c.sort(Ms(u)):c.sort(Zr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Qr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Ht(e){let t=Qr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function ar(e,t){let r=Qr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function xl(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Qr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Ns(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function qs(e){let t=new Map;for(let n of e)n&&n.id&&!t.has(n.id)&&t.set(n.id,n);let r=new Map;for(let n of t.values()){let s=Ns(n);if(!s)continue;let o=r.get(s);o||(o=[],r.set(s,o)),o.push({id:n.id,title:n.title,status:n.status,metadata:n.metadata,workflow:n.workflow,created_at:n.created_at,updated_at:n.updated_at})}return r}function Fs(e,t){let r=e.get(t)||[],n=0;for(let o of r)(o.status==="resolved"||o.status==="closed")&&(n+=1);let s=xl(r);return{total:r.length,count:n,current:s,children:r}}function js(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},d=n(Qo(i,c,u.order),a);s(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let _={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};r.set(_);let h=n(Qo(i,c,_.order),a);s(_,h);let T=await t("ui-order-set",{expected_revision:_.revision,entries:h});T&&T.applied&&r.set({revision:typeof T.revision=="number"?T.revision:0,order:T.order||{}})}else p&&p.applied&&r.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:o}}function Bs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ea(e,t){return!t||typeof e!="string"||e.length===0||Bs(t.visible_labels).includes(e)?!0:Bs(t.hidden_labels).includes(e)?!1:!Bs(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Al(e,t){return Bs(e).filter(r=>ea(r,t))}function Ir(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}function Kp(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Yp(e,t,r,n,s){return l`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${n?"true":"false"}
    @click=${s}
  >
    children ${t}/${r} ${n?"\u25B4":"\u25BE"}
  </button>`}function Zp(e,t,r,n){return l`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${n?s=>n(s,e.id):void 0}
  >
    <span class=${Kp(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${r}
  </button>`}function Us(e,t){let r=e.total||0,n=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(r===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=r>0?a.slice().sort(_l):a;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${r>0?Yp(t.parent_id,e.count,r,n,t.onToggle):l`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${r>0&&e.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${n&&r>0?l`<div class="board-card__roll-list">
            ${i.map((c,u)=>Zp(c,u+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Qp={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},El={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Sl={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Xp={review:"\u2713",skip:"\u2298"},Lr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Jp(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Tl(e){let t=e&&e.fill||"none";return t==="none"?Lr.none:e&&e.stale===!0?Lr.stale:t==="dim"?Lr.dim:e&&e.glyph==="review"?Lr.review:e&&e.glyph==="skip"?Lr.skip:Lr.done}function ef(e){if(!e||e.fill==="none"||!e.approval_state)return Tl(e);let t=[];return e.glyph==="review"?t.push(Lr.review):e.glyph==="skip"&&t.push(Lr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function tf(e,t,r){let n=Qp[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Xp[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${c}>
        ${El[e]||e}
      </div>
    </div>
  `}function vn(e,t){if(!e||!e.stages)return"";let r=Sl[e.route]||Sl.spec_backed,n=e.stages,s=Jp(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${El[a]||a} ${a==="plan"?ef(n[a]||{}):Tl(n[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>tf(a,n[a]||{},a===s))}
    </div>
  `}function rf(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Cl=2;function nf(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Cl).join(", "),s=r.length-Cl,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function ta(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Rl(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Xr(e){return`${e.kind}:${Rl(e)}@${e.sha}`}function Ws(e,t){if(!e)return null;let r=ta(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=ta(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,u=t?` \xB7 exec_receipt ${Xr(t)}`:"";return{kind:e.kind,label:i,title:`${c}${u}`}}function Il(e,t){let r=Ws(e,t);return r?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function sf(e){if(!e)return null;let t=ta(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Xr(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function of(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Ir(r,"route")){let i=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&Ir(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Ir(r,"pr")){let i=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Il(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Xr(i)}`}
        >${`exec ${i.kind==="delegated"?Rl(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of Al(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Ir(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Ir(r,"blocked")&&s.push(...nf(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Ir(r,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function af(e){let t=ar(e.created_at),r=ar(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function lf(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Us(r,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:af(e),empty_label:"children \uC5C6\uC74C",childChips:ra,onToggle:n=>t.onRollupToggle&&t.onRollupToggle(n,e.id),onChildClick:(n,s)=>t.onChildClick&&t.onChildClick(n,s)})}function ra(e){let t=e?.workflow?.chips?.planned_execution,r=e?.workflow?.chips?.exec_receipt;return Ws(t,r)?l`<span class="board-card__roll-child-chips">
    ${Il(t,r)}
    ${sf(r)}
  </span>`:null}function zs(e,t){let r=rf(e.priority);return l`
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
      ${of(e,t)}
      ${e.workflow&&Ir(t.policy||null,"stepper")?vn(e.workflow,e.status):""}
      ${lf(e,t)}
    </article>
  `}function wn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
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
              ${Rr.map(o=>l`<option
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
        ${e.items.map(o=>zs(o,t))}
      </div>
    </section>
  `}function Ll(e,t,r){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>zs(n,t))}
        </div>
      </div>
    </dialog>
  `}var cf=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],uf=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],df=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function pf(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
  `}function Ol(e,t,r){return l`
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
        ${cf.map(n=>l`<option
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
        ${uf.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${pf(e,t,r)}
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
        ${df.map(n=>l`<option
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
  `}var ff=200,_f={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},mf=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ml="beads-ui.board.sort",Pl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function gf(){try{let e=window.localStorage.getItem(Ml);if(e&&Pl.has(e))return e}catch{}return"created_desc"}function Dl(e,t){let r=St("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.closedRange||er,_=s?Ds(s,a):null,h=js({transport:o,uiOrderStore:a}),T=[],L=[],B=[],V=[],H=[],P=[],j=!1,O=0,U=gf(),b=new Map,F=new Map,J=new Map,ee=new Set,pe={search:"",priority:"",type:"",labels:[]},de=!1,he=null;function Se(A){return String(A.status||"open")==="open"}function Le(A){let M=String(A.status||"open");return M==="open"||M==="blocked"}function te(A){let M=pe.search.trim().toLowerCase(),ue=pe.priority,k=pe.type,S=pe.labels;return A.filter(q=>{if(M){let X=String(q.id||"").toLowerCase(),ke=String(q.title||"").toLowerCase();if(!X.includes(M)&&!ke.includes(M))return!1}if(ue!==""&&String(q.priority)!==ue||k!==""&&String(q.issue_type||"")!==k)return!1;if(S.length>0){let X=Array.isArray(q.labels)?q.labels:[];if(!S.some(ke=>X.includes(ke)))return!1}return!0})}function se(){let A=new Set;for(let M of[T,L,B,V,H,P])for(let ue of M){let k=Array.isArray(ue.labels)?ue.labels:[];for(let S of k)typeof S=="string"&&S.length>0&&A.add(S)}return Array.from(A).sort()}function Ae(){return pe.search.trim()!==""||pe.priority!==""||pe.type!==""||pe.labels.length>0}function N(){try{if(_){let A=_.selectBoardColumn("tab:board:in-progress","in_progress",U),M=_.selectBoardColumn("tab:board:blocked","blocked",U).filter(Le),ue=new Set(A.map(De=>De.id)),k=_.selectBoardColumn("tab:board:ready","ready",U).filter(De=>Se(De)&&!ue.has(De.id)),S=_.selectBoardColumn("tab:board:resolved","resolved",U),q=_.selectBoardColumn("tab:board:deferred","deferred",U),X=_.selectBoardColumn("tab:board:closed","closed").slice(0,ff),ke=[...M,...k,...A,...S,...X];oe(ke);let ve=new Set;for(let De of ke)De&&De.id&&!Ns(De)&&ve.add(De.id);let Me=!Ae();T=Me?jn(M,ve):M,L=Me?jn(k,ve):k,B=Me?jn(A,ve):A,V=Me?jn(S,ve):S,H=q,O=q.length,P=Me?jn(X,ve):X,b=new Map;for(let De of T)b.set(De.id,"open");for(let De of L)b.set(De.id,"open");for(let De of B)b.set(De.id,"in_progress");for(let De of V)b.set(De.id,"resolved");for(let De of H)b.set(De.id,"deferred");for(let De of P)b.set(De.id,"closed");F=new Map;for(let De of T)F.set(De.id,"blocked-col");for(let De of L)F.set(De.id,"ready-col");for(let De of B)F.set(De.id,"in-progress-col");for(let De of V)F.set(De.id,"resolved-col");for(let De of P)F.set(De.id,"closed-col")}Xe()}catch{T=[],L=[],B=[],V=[],H=[],P=[],J=new Map,Xe()}}function oe(A){J=qs(A)}function re(A){return Fs(J,A)}function ye(A){return!ee.has(A)}function Ee(A,M){A.preventDefault(),A.stopPropagation(),ee.has(M)?ee.delete(M):ee.add(M),Xe()}function C(A,M){A.preventDefault(),A.stopPropagation(),n(M)}function K(A,M){A.preventDefault(),A.stopPropagation(),n(M)}function $e(A,M){he||n(M)}function Ne(A,M){A.preventDefault(),A.stopPropagation(),hf(M).then(ue=>{ue&&_e("\uBCF5\uC0AC\uB428","success",1200)})}function Oe(A,M){he=M,A.dataTransfer&&(A.dataTransfer.setData("text/plain",M),A.dataTransfer.effectAllowed="move"),A.target.classList.add("board-card--dragging")}function ze(A){A.target.classList.remove("board-card--dragging"),kt(),setTimeout(()=>{he=null},0)}function Ye(A){let M=String(A.target.value||"");!M||M===p||(p=M,u&&u(M),Xe())}function Y(){return i?i.get():null}function Q(A){let M=c?c.get():null,ue=M?M.cleanup_failed:null;if(!ue||typeof ue!="object"||Array.isArray(ue))return null;let k=ue[A];return!k||typeof k!="object"||Array.isArray(k)?null:k}let Te={onCardClick:$e,onCopyId:Ne,onDragStart:Oe,onDragEnd:ze,onClosedRangeChange:Ye,rollupFor:re,isExpanded:ye,onRollupToggle:Ee,onChildClick:C,onFromChipClick:K,cleanupFailureFor:Q,get policy(){return Y()}};function Ze(A,M){he||(ae(),n(M))}function Ve(A,M){A.preventDefault(),A.stopPropagation(),ae(),n(M)}let st={...Te,onCardClick:Ze,onChildClick:Ve,onFromChipClick:Ve,get policy(){return Y()}};function Je(A){let M=A.target,ue=e.querySelector(".board-filter__labels");M&&ue&&ue.contains(M)||I()}function mt(A){A.key==="Escape"&&I()}function Pe(){de||(de=!0,document.addEventListener("mousedown",Je),document.addEventListener("keydown",mt),Xe())}function I(){de&&(de=!1,document.removeEventListener("mousedown",Je),document.removeEventListener("keydown",mt),Xe())}function ne(A){A.key==="Escape"&&ae()}function me(){j||(j=!0,document.addEventListener("keydown",ne),Xe())}function ae(){j&&(j=!1,document.removeEventListener("keydown",ne),Xe())}let qe={onClose:ae,onOverlayClick(A){A.target===A.currentTarget&&ae()}},Qe={onSearchInput(A){pe.search=String(A.target.value||""),N()},onPriorityChange(A){pe.priority=String(A.target.value||""),N()},onTypeChange(A){pe.type=String(A.target.value||""),N()},onSortChange(A){let M=String(A.target.value||"");if(!(!Pl.has(M)||M===U)){U=M;try{window.localStorage.setItem(Ml,M)}catch{}N()}},onDeferredToggle(){j?ae():me()},onLabelMenuToggle(){de?I():Pe()},onLabelToggle(A){let M=pe.labels.indexOf(A);M===-1?pe.labels.push(A):pe.labels.splice(M,1),N()},onLabelClear(){pe.labels.length!==0&&(pe.labels=[],N())},onNewIssue(){d&&d()}};function ot(){return l`
      <div class="board-view">
        ${Ol(pe,Qe,{sort_mode:U,deferred_popup_open:j,deferred_count:O,label_options:se(),label_menu_open:de})}
        <div class="board-root">
          ${wn({title:"Blocked",id:"blocked-col",items:te(T)},Te)}
          ${wn({title:"Ready",id:"ready-col",items:te(L)},Te)}
          ${wn({title:"In progress",id:"in-progress-col",items:te(B)},Te)}
          ${wn({title:"Resolved",id:"resolved-col",items:te(V)},Te)}
          ${wn({title:"Closed",id:"closed-col",items:te(P),is_closed:!0,closed_range:p},Te)}
        </div>
        ${j?Ll({items:te(H),count:O},st,qe):""}
      </div>
    `}function Xe(){Ge(ot(),e),dt()}function dt(){try{let A=e.querySelector("#deferred-popup");A&&!A.open&&(typeof A.showModal=="function"?A.showModal():A.setAttribute("open",""));let M=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ue of M)Array.from(ue.querySelectorAll(".board-card")).forEach((S,q)=>{S.tabIndex=q===0?0:-1})}catch{}}async function yt(A,M){if(!o){_e("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:A,status:M}),_e("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ue){r("update-status failed: %o",ue),_e("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function gt(A){switch(A){case"blocked-col":return T;case"ready-col":return L;case"in-progress-col":return B;case"resolved-col":return V;default:return[]}}function pt(A,M,ue){if(!o||!a)return;let k=gt(A),S=k.find(Me=>Me.id===M);if(!S)return;let q=k.filter(Me=>Me.id!==M),X=ue.closest?ue.closest(".board-card"):null,ke=q.length;if(X){let Me=X.getAttribute("data-issue-id");if(Me===M)return;let De=q.findIndex(Rt=>Rt.id===Me);De>=0&&(ke=De)}let ve=q.slice();ve.splice(ke,0,S),h.applyReorder(M,ve,ke)}function kt(){for(let A of Array.from(e.querySelectorAll(".board-column--drag-over")))A.classList.remove("board-column--drag-over")}let We=null;e.addEventListener("dragover",A=>{A.preventDefault(),A.dataTransfer&&(A.dataTransfer.dropEffect="move");let ue=A.target.closest(".board-column");ue&&ue!==We&&(We&&We.classList.remove("board-column--drag-over"),ue.classList.add("board-column--drag-over"),We=ue)}),e.addEventListener("dragleave",A=>{let M=A.relatedTarget;(!M||!e.contains(M))&&We&&(We.classList.remove("board-column--drag-over"),We=null)}),e.addEventListener("drop",A=>{A.preventDefault(),We&&(We.classList.remove("board-column--drag-over"),We=null);let M=A.target,ue=M.closest(".board-column");if(!ue)return;let k=A.dataTransfer?.getData("text/plain")||"";if(!k)return;let S=ue.id,q=F.get(k);if(q&&q===S){if(mf.has(S)){if(U!=="manual"){_e("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}pt(S,k,M)}return}let X=_f[S];if(!X){_e("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}b.get(k)!==X&&yt(k,X)}),e.addEventListener("keydown",A=>{let M=A.target;if(!(M instanceof HTMLElement))return;let ue=String(M.tagName||"").toLowerCase();if(ue==="input"||ue==="textarea"||ue==="select"||ue==="button"||ue==="a"||M.isContentEditable===!0)return;let k=M.closest(".board-card");if(!k)return;let S=String(A.key||"");if(S==="Enter"||S===" "){A.preventDefault();let ve=k.getAttribute("data-issue-id");ve&&n(ve);return}if(S!=="ArrowUp"&&S!=="ArrowDown"&&S!=="ArrowLeft"&&S!=="ArrowRight")return;A.preventDefault();let q=k.closest(".board-column");if(!q)return;let X=Array.from(q.querySelectorAll(".board-card")),ke=X.indexOf(k);if(S==="ArrowDown"&&ke<X.length-1){Ke(k,X[ke+1]);return}if(S==="ArrowUp"&&ke>0){Ke(k,X[ke-1]);return}if(S==="ArrowLeft"||S==="ArrowRight"){let ve=Array.from(e.querySelectorAll(".board-column")),Me=ve.indexOf(q),De=S==="ArrowRight"?1:-1,Rt=Me+De;for(;Rt>=0&&Rt<ve.length;){let at=ve[Rt].querySelector(".board-card");if(at){Ke(k,at);return}Rt+=De}}});function Ke(A,M){try{A.tabIndex=-1,M.tabIndex=0,M.focus()}catch{}}let Ue=null;_&&_.subscribe&&(Ue=_.subscribe(()=>{try{N()}catch{}}));let ct=null;i&&i.subscribe&&(ct=i.subscribe(()=>{try{N()}catch{}}));let At=null;return c&&c.subscribe&&(At=c.subscribe(()=>{Xe()})),{async load(){r("load"),N()},clear(){I(),ae(),Ue&&(Ue(),Ue=null),ct&&(ct(),ct=null),At&&(At(),At=null),e.replaceChildren(),T=[],L=[],B=[],V=[],H=[],P=[],b=new Map,F=new Map}}}function jn(e,t){return e.filter(r=>{let n=Ns(r);return!(n&&t.has(n))})}async function hf(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function tr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Jr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Bn(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function bf(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Jr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Jr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(c=>{let u=d=>{typeof r.close=="function"&&r.close(),r.remove(),c(d)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function wr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await bf(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var yf=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Nl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},vf=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function qt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ct(e){return typeof e=="string"&&e.length>0?e:null}function kn(e){return e.startsWith("gpt-")?e.slice(4):e}function xt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function Fl(e,t,r){let n=Ct(t[e]);if(n!==null)return{value:n,source:"pin"};let s=Ct(r[e]);return s===null?null:{value:s,source:"global"}}function Un(e,t,r,n){return Fl(e,t,r)||{value:n,source:"base"}}function na(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&qt(s?.[t])){let a=Ct(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&qt(s)){for(let a of Object.values(s))if(qt(a)){let i=Ct(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return Ct(n?.runners?.[o]?.models?.[e]?.id)||e}function wf(e,t){return Ct(t?.review?.reviewers?.[e]?.model)||e}function $n(e,t,r=!1){if(e==="default")return xt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?kn(e):e;return xt(e,t,n,e,"explicit")}function jl(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];qt(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(qt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function kf(e,t){let r=[],n=e?.implementation?.model_catalog;qt(n)&&r.push(...Object.keys(n));let s=t?.runners;if(qt(s))for(let o of Object.keys(s))r.includes(o)||r.push(o);return r}function $f(e,t,r){if(e===null)return{runtime:null,offered:!1};let n=!1;for(let s of kf(t,r)){let o=jl(s,t,r);if(o.length>0&&(n=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:n}}function sa(e){return xt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function ql(e,t,r){let n=Fl(e,t,r);return n?$n(n.value,n.source):xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Qt(e){let t=qt(e.pin)?e.pin:{},r=qt(e.global)?e.global:{},n=qt(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&qt(n.session)?n.session:null,o=n?.supported===!0&&qt(n.orchestration)?n.orchestration:null,a=qt(e.runner_catalog)?e.runner_catalog:null,i=Ct(r.quick_fix_impl_model),c=$f(i,s,a),u={};if(s){let d=Un("workflow_mode",t,r,Ct(s.workflow_mode_default));u.workflow_mode=d.source==="base"?xt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):$n(d.value,d.source);for(let P of["spec_review","plan_review","impl_review"]){let j=`${P}_model`,O=Ct(P==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),U=Un(j,t,r,O);if(U.value===null)u[j]=xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(U.value!=="self"&&U.value!=="skip"&&!qt(s.review?.reviewers?.[U.value]))u[j]=sa(xt(U.value,U.source,"",null,"explicit"));else{let b=wf(U.value,s);u[j]=xt(U.value,U.source,kn(b),b,U.source==="base"?"default":"explicit")}}for(let[P,j]of Object.entries(Nl)){let O=u[j].value;if(O==="self"||O==="skip"){u[P]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let U=Ct(s.review?.reviewers?.[O||""]?.effort),b=Un(P,t,r,U);u[P]=b.value===null?xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):xt(b.value,b.source,b.value,b.value,b.source==="base"?"default":"explicit")}let p=qt(s.implementation?.default)?s.implementation.default:{},_=Ct(e.route),h=_!==null&&["quick_fix","spec_backed","full_plan"].includes(_),T=qt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},L=h&&qt(T[_])?T[_]:{};for(let P of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let j=Un(P,t,r,P==="impl_dispatch"?Ct(L.dispatch)||Ct(p.dispatch):Ct(p[P.replace("impl_","")]));u[P]=j.value===null?xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):xt(j.value,j.source,j.value,j.value,j.source==="base"?"default":"explicit")}let B=Ct(t.impl_runtime),V=B==="inherit"?Ct(e.controller_runtime):B,H=_==="quick_fix"&&Ct(t.impl_dispatch)===null&&c.runtime!==null&&(B===null||V===c.runtime);if(H){let P=c.runtime,j=i;u.impl_dispatch=xt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(u.impl_runtime=xt(P,"global",`${P} (\uC720\uB3C4)`,P,"explicit")),Ct(t.impl_model)===null&&(u.impl_model=xt(j,"global",j,j,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let P of["impl_runtime","impl_model","impl_effort","impl_speed"])u[P]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!H&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let P=u.impl_runtime.value==="inherit"?Ct(e.controller_runtime):u.impl_runtime.value,j=P?jl(P,s,a):[];if(u.impl_model.value!=="auto"&&j.length>0&&!j.includes(u.impl_model.value))u.impl_model=sa(u.impl_model);else{let O=na(u.impl_model.value,P,s,a);u.impl_model.display=kn(O),u.impl_model.full_value=O}}if(u.impl_effort.value==="auto"){let P=Ct(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),j=P?Ct(s.implementation?.effort_by_transport?.[P]?.auto):null;j&&!vf.has(j)?(u.impl_effort.display=`${j} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=j,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?xt("default","base","default (\uC77C\uBC18)","default","default"):$n("default",u.impl_speed.source))}}else for(let d of yf.filter(p=>!p.startsWith("orchestration_")))u[d]=ql(d,t,r);if(!s){for(let[d,p]of Object.entries(Nl))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=ql(d,t,r);continue}let p=d.replace("orchestration_",""),_=Ct(o[p]),h=Un(d,t,r,_);if(d==="orchestration_effort"&&h.source==="base"){u[d]=xt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(h.value===null){u[d]=xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let T=h.source==="base"?Ct(o.model_id)||h.value:na(h.value,null,s,a);u[d]=xt(h.value,h.source,kn(T),T,h.source==="base"?"default":"explicit");continue}if(h.value==="default"){u[d]=h.source==="base"?xt("default","base","default (\uC77C\uBC18)","default","default"):$n("default",h.source);continue}u[d]=$n(h.value,h.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=xt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${kn(d)})`,null,"default")}else if(c.runtime!==null){let d=na(i,c.runtime,s,a);u.quick_fix_impl_model=xt(i,"global",kn(d),d,"explicit")}else c.offered?u.quick_fix_impl_model=sa(xt(i,"global","",null,"explicit")):u.quick_fix_impl_model=$n(i,"global");return u}function xf(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function Hs(e){let t=qt(e.pin)?e.pin:{},r=qt(e.global)?e.global:{},n=qt(e.resolution_global)?{...e.resolution_global}:{};delete n[e.key];let s=p=>{let _={...n,...p};return Qt({pin:e.layer==="pin"?_:t,global:e.layer==="pin"?r:_,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:r,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],u=Ct(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:xf(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:d.map(p=>{let _=s({...o,[e.key]:p})[e.key];return{value:p,label:_.display,full_value:_.full_value}})}}function xn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let c=!1,u=p=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(p))},d=()=>u(n.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),n.addEventListener("keydown",p=>{p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),d())}),t.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var Hl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Bt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var kr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Wn=[...kr,"reasoning_output_tokens"],Af=["implementation","review-consult"];function oa(e){let t=0;for(let r of kr)t+=Bt(e?.[r]);return t}function Sf(e){return!e||typeof e!="object"?!1:kr.some(t=>Number.isFinite(e[t]))}function Bl(e){return!e||typeof e!="object"?!1:Wn.some(t=>Number.isFinite(e[t]))}function Ef(e){let t={};for(let r of Wn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Ul(e){let t={};for(let r of Wn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Wl(e,t){return e==="codex"?Bt(t.input_tokens)+Bt(t.output_tokens):oa(t)}function Tf(e){return e==="claude"?"Claude":"Codex"}function Cf(e){return`\u03C4 ${Gl(e)}`}function Rf(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${Bt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Bt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${Bt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Hl),o.join(`
`)}function Wt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Tf(r)} ${Cf(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Rf(r,n)})}return t}function Vs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of Wn)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=Bt(i.breakdown[c])+Bt(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function aa(e){return!e||typeof e!="object"?null:ir({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function If(e){return e==="codex"?"codex":"claude"}function Or(){return{subtotal:0,breakdown:Ef(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Gs(e,t,r){e.subtotal+=t.subtotal;for(let n of Wn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=Bt(e.breakdown[n])+Bt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function zl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Gl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function An(e){return Sf(e)?`\u03C4 ${Gl(oa(e))}`:null}function $r(e){let t=An(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function zn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Bt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Bt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${oa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Hl),r.join(`
`)}function ir(e,t){let r={claude:Or(),codex:Or()},n={orchestrator:{claude:Or(),codex:Or()},implementation:{claude:Or(),codex:Or()},"review-consult":{claude:Or(),codex:Or()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Bl(c)){let d=If(i.runner),p=Ul(c),_={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:p,subtotal:Wl(d,p)};p.replayed===!0&&(_.replayed=!0),typeof i.model=="string"&&(_.model=i.model),typeof i.session_id=="string"&&(_.session_id=i.session_id),Gs(r[d],_,!0),Gs(n.orchestrator[d],_,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){if(!d||d.provider!=="codex"||!Af.includes(d.role)||!Bl(d.usage))continue;let p=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!p||s.has(p))continue;s.add(p);let _=Ul(d.usage),h={provider:"codex",role:d.role,attempt_id:String(i.attempt_id||""),usage:_,subtotal:Wl("codex",_)};h.receipt_id=p,typeof d.model=="string"&&(h.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(h.effort=d.effort),typeof d.session_id=="string"?h.session_id=d.session_id:typeof d.thread_id=="string"&&(h.session_id=d.thread_id),typeof d.turn_id=="string"&&(h.turn_id=d.turn_id),typeof d.completed_at=="string"&&(h.completed_at=d.completed_at),_.replayed===!0&&(h.replayed=!0),Gs(r.codex,h,!1),Gs(n[h.role].codex,h,!1)}}let o={};for(let i of["claude","codex"]){let c=r[i];if(c.legs.length===0)continue;let u=zl(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let d=n[i][u];d.legs.length>0&&(c[u]={...zl(d,!0),legs:d.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:tc,setPrototypeOf:Vl,isFrozen:Lf,getPrototypeOf:Of,getOwnPropertyDescriptor:Mf}=Object,{freeze:Vt,seal:lr,create:fa}=Object,{apply:_a,construct:ma}=typeof Reflect<"u"&&Reflect;Vt||(Vt=function(t){return t});lr||(lr=function(t){return t});_a||(_a=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});ma||(ma=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Ks=Kt(Array.prototype.forEach),Pf=Kt(Array.prototype.lastIndexOf),Kl=Kt(Array.prototype.pop),Hn=Kt(Array.prototype.push),Df=Kt(Array.prototype.splice),Zs=Kt(String.prototype.toLowerCase),ia=Kt(String.prototype.toString),la=Kt(String.prototype.match),Gn=Kt(String.prototype.replace),Nf=Kt(String.prototype.indexOf),qf=Kt(String.prototype.trim),fr=Kt(Object.prototype.hasOwnProperty),Gt=Kt(RegExp.prototype.test),Vn=Ff(TypeError);function Kt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return _a(e,t,n)}}function Ff(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return ma(e,r)}}function lt(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Zs;Vl&&Vl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Lf(t)||(t[n]=o),s=o)}e[s]=!0}return e}function jf(e){for(let t=0;t<e.length;t++)fr(e,t)||(e[t]=null);return e}function xr(e){let t=fa(null);for(let[r,n]of tc(e))fr(e,r)&&(Array.isArray(n)?t[r]=jf(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=xr(n):t[r]=n);return t}function Kn(e,t){for(;e!==null;){let n=Mf(e,t);if(n){if(n.get)return Kt(n.get);if(typeof n.value=="function")return Kt(n.value)}e=Of(e)}function r(){return null}return r}var Yl=Vt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ca=Vt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ua=Vt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Bf=Vt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),da=Vt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Uf=Vt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Zl=Vt(["#text"]),Ql=Vt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),pa=Vt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Xl=Vt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ys=Vt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Wf=lr(/\{\{[\w\W]*|[\w\W]*\}\}/gm),zf=lr(/<%[\w\W]*|[\w\W]*%>/gm),Hf=lr(/\$\{[\w\W]*/gm),Gf=lr(/^data-[\-\w.\u00B7-\uFFFF]+$/),Vf=lr(/^aria-[\-\w]+$/),rc=lr(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Kf=lr(/^(?:\w+script|data):/i),Yf=lr(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),nc=lr(/^html$/i),Zf=lr(/^[a-z][.\w]*(-[.\w]+)+$/i),Jl=Object.freeze({__proto__:null,ARIA_ATTR:Vf,ATTR_WHITESPACE:Yf,CUSTOM_ELEMENT:Zf,DATA_ATTR:Gf,DOCTYPE_NAME:nc,ERB_EXPR:zf,IS_ALLOWED_URI:rc,IS_SCRIPT_OR_DATA:Kf,MUSTACHE_EXPR:Wf,TMPLIT_EXPR:Hf}),Yn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Qf=function(){return typeof window>"u"?null:window},Xf=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ec=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function sc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Qf(),t=Re=>sc(Re);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Yn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:_,trustedTypes:h}=e,T=c.prototype,L=Kn(T,"cloneNode"),B=Kn(T,"remove"),V=Kn(T,"nextSibling"),H=Kn(T,"childNodes"),P=Kn(T,"parentNode");if(typeof a=="function"){let Re=r.createElement("template");Re.content&&Re.content.ownerDocument&&(r=Re.content.ownerDocument)}let j,O="",{implementation:U,createNodeIterator:b,createDocumentFragment:F,getElementsByTagName:J}=r,{importNode:ee}=n,pe=ec();t.isSupported=typeof tc=="function"&&typeof P=="function"&&U&&U.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:de,ERB_EXPR:he,TMPLIT_EXPR:Se,DATA_ATTR:Le,ARIA_ATTR:te,IS_SCRIPT_OR_DATA:se,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:N}=Jl,{IS_ALLOWED_URI:oe}=Jl,re=null,ye=lt({},[...Yl,...ca,...ua,...da,...Zl]),Ee=null,C=lt({},[...Ql,...pa,...Xl,...Ys]),K=Object.seal(fa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),$e=null,Ne=null,Oe=Object.seal(fa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ze=!0,Ye=!0,Y=!1,Q=!0,Te=!1,Ze=!0,Ve=!1,st=!1,Je=!1,mt=!1,Pe=!1,I=!1,ne=!0,me=!1,ae="user-content-",qe=!0,Qe=!1,ot={},Xe=null,dt=lt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),yt=null,gt=lt({},["audio","video","img","source","image","track"]),pt=null,kt=lt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),We="http://www.w3.org/1998/Math/MathML",Ke="http://www.w3.org/2000/svg",Ue="http://www.w3.org/1999/xhtml",ct=Ue,At=!1,A=null,M=lt({},[We,Ke,Ue],ia),ue=lt({},["mi","mo","mn","ms","mtext"]),k=lt({},["annotation-xml"]),S=lt({},["title","style","font","a","script"]),q=null,X=["application/xhtml+xml","text/html"],ke="text/html",ve=null,Me=null,De=r.createElement("form"),Rt=function(E){return E instanceof RegExp||E instanceof Function},at=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Me&&Me===E)){if((!E||typeof E!="object")&&(E={}),E=xr(E),q=X.indexOf(E.PARSER_MEDIA_TYPE)===-1?ke:E.PARSER_MEDIA_TYPE,ve=q==="application/xhtml+xml"?ia:Zs,re=fr(E,"ALLOWED_TAGS")?lt({},E.ALLOWED_TAGS,ve):ye,Ee=fr(E,"ALLOWED_ATTR")?lt({},E.ALLOWED_ATTR,ve):C,A=fr(E,"ALLOWED_NAMESPACES")?lt({},E.ALLOWED_NAMESPACES,ia):M,pt=fr(E,"ADD_URI_SAFE_ATTR")?lt(xr(kt),E.ADD_URI_SAFE_ATTR,ve):kt,yt=fr(E,"ADD_DATA_URI_TAGS")?lt(xr(gt),E.ADD_DATA_URI_TAGS,ve):gt,Xe=fr(E,"FORBID_CONTENTS")?lt({},E.FORBID_CONTENTS,ve):dt,$e=fr(E,"FORBID_TAGS")?lt({},E.FORBID_TAGS,ve):xr({}),Ne=fr(E,"FORBID_ATTR")?lt({},E.FORBID_ATTR,ve):xr({}),ot=fr(E,"USE_PROFILES")?E.USE_PROFILES:!1,ze=E.ALLOW_ARIA_ATTR!==!1,Ye=E.ALLOW_DATA_ATTR!==!1,Y=E.ALLOW_UNKNOWN_PROTOCOLS||!1,Q=E.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Te=E.SAFE_FOR_TEMPLATES||!1,Ze=E.SAFE_FOR_XML!==!1,Ve=E.WHOLE_DOCUMENT||!1,mt=E.RETURN_DOM||!1,Pe=E.RETURN_DOM_FRAGMENT||!1,I=E.RETURN_TRUSTED_TYPE||!1,Je=E.FORCE_BODY||!1,ne=E.SANITIZE_DOM!==!1,me=E.SANITIZE_NAMED_PROPS||!1,qe=E.KEEP_CONTENT!==!1,Qe=E.IN_PLACE||!1,oe=E.ALLOWED_URI_REGEXP||rc,ct=E.NAMESPACE||Ue,ue=E.MATHML_TEXT_INTEGRATION_POINTS||ue,k=E.HTML_INTEGRATION_POINTS||k,K=E.CUSTOM_ELEMENT_HANDLING||{},E.CUSTOM_ELEMENT_HANDLING&&Rt(E.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(K.tagNameCheck=E.CUSTOM_ELEMENT_HANDLING.tagNameCheck),E.CUSTOM_ELEMENT_HANDLING&&Rt(E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(K.attributeNameCheck=E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),E.CUSTOM_ELEMENT_HANDLING&&typeof E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(K.allowCustomizedBuiltInElements=E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Te&&(Ye=!1),Pe&&(mt=!0),ot&&(re=lt({},Zl),Ee=[],ot.html===!0&&(lt(re,Yl),lt(Ee,Ql)),ot.svg===!0&&(lt(re,ca),lt(Ee,pa),lt(Ee,Ys)),ot.svgFilters===!0&&(lt(re,ua),lt(Ee,pa),lt(Ee,Ys)),ot.mathMl===!0&&(lt(re,da),lt(Ee,Xl),lt(Ee,Ys))),E.ADD_TAGS&&(typeof E.ADD_TAGS=="function"?Oe.tagCheck=E.ADD_TAGS:(re===ye&&(re=xr(re)),lt(re,E.ADD_TAGS,ve))),E.ADD_ATTR&&(typeof E.ADD_ATTR=="function"?Oe.attributeCheck=E.ADD_ATTR:(Ee===C&&(Ee=xr(Ee)),lt(Ee,E.ADD_ATTR,ve))),E.ADD_URI_SAFE_ATTR&&lt(pt,E.ADD_URI_SAFE_ATTR,ve),E.FORBID_CONTENTS&&(Xe===dt&&(Xe=xr(Xe)),lt(Xe,E.FORBID_CONTENTS,ve)),qe&&(re["#text"]=!0),Ve&&lt(re,["html","head","body"]),re.table&&(lt(re,["tbody"]),delete $e.tbody),E.TRUSTED_TYPES_POLICY){if(typeof E.TRUSTED_TYPES_POLICY.createHTML!="function")throw Vn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof E.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Vn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=E.TRUSTED_TYPES_POLICY,O=j.createHTML("")}else j===void 0&&(j=Xf(h,s)),j!==null&&typeof O=="string"&&(O=j.createHTML(""));Vt&&Vt(E),Me=E}},et=lt({},[...ca,...ua,...Bf]),Dt=lt({},[...da,...Uf]),Ut=function(E){let ie=P(E);(!ie||!ie.tagName)&&(ie={namespaceURI:ct,tagName:"template"});let Ce=Zs(E.tagName),ft=Zs(ie.tagName);return A[E.namespaceURI]?E.namespaceURI===Ke?ie.namespaceURI===Ue?Ce==="svg":ie.namespaceURI===We?Ce==="svg"&&(ft==="annotation-xml"||ue[ft]):!!et[Ce]:E.namespaceURI===We?ie.namespaceURI===Ue?Ce==="math":ie.namespaceURI===Ke?Ce==="math"&&k[ft]:!!Dt[Ce]:E.namespaceURI===Ue?ie.namespaceURI===Ke&&!k[ft]||ie.namespaceURI===We&&!ue[ft]?!1:!Dt[Ce]&&(S[Ce]||!et[Ce]):!!(q==="application/xhtml+xml"&&A[E.namespaceURI]):!1},Fe=function(E){Hn(t.removed,{element:E});try{P(E).removeChild(E)}catch{B(E)}},Ft=function(E,ie){try{Hn(t.removed,{attribute:ie.getAttributeNode(E),from:ie})}catch{Hn(t.removed,{attribute:null,from:ie})}if(ie.removeAttribute(E),E==="is")if(mt||Pe)try{Fe(ie)}catch{}else try{ie.setAttribute(E,"")}catch{}},It=function(E){let ie=null,Ce=null;if(Je)E="<remove></remove>"+E;else{let vt=la(E,/^[\r\n\t ]+/);Ce=vt&&vt[0]}q==="application/xhtml+xml"&&ct===Ue&&(E='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+E+"</body></html>");let ft=j?j.createHTML(E):E;if(ct===Ue)try{ie=new _().parseFromString(ft,q)}catch{}if(!ie||!ie.documentElement){ie=U.createDocument(ct,"template",null);try{ie.documentElement.innerHTML=At?O:ft}catch{}}let Mt=ie.body||ie.documentElement;return E&&Ce&&Mt.insertBefore(r.createTextNode(Ce),Mt.childNodes[0]||null),ct===Ue?J.call(ie,Ve?"html":"body")[0]:Ve?ie.documentElement:Mt},zt=function(E){return b.call(E.ownerDocument||E,E,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},v=function(E){return E instanceof p&&(typeof E.nodeName!="string"||typeof E.textContent!="string"||typeof E.removeChild!="function"||!(E.attributes instanceof d)||typeof E.removeAttribute!="function"||typeof E.setAttribute!="function"||typeof E.namespaceURI!="string"||typeof E.insertBefore!="function"||typeof E.hasChildNodes!="function")},w=function(E){return typeof i=="function"&&E instanceof i};function R(Re,E,ie){Ks(Re,Ce=>{Ce.call(t,E,ie,Me)})}let W=function(E){let ie=null;if(R(pe.beforeSanitizeElements,E,null),v(E))return Fe(E),!0;let Ce=ve(E.nodeName);if(R(pe.uponSanitizeElement,E,{tagName:Ce,allowedTags:re}),Ze&&E.hasChildNodes()&&!w(E.firstElementChild)&&Gt(/<[/\w!]/g,E.innerHTML)&&Gt(/<[/\w!]/g,E.textContent)||E.nodeType===Yn.progressingInstruction||Ze&&E.nodeType===Yn.comment&&Gt(/<[/\w]/g,E.data))return Fe(E),!0;if(!(Oe.tagCheck instanceof Function&&Oe.tagCheck(Ce))&&(!re[Ce]||$e[Ce])){if(!$e[Ce]&&we(Ce)&&(K.tagNameCheck instanceof RegExp&&Gt(K.tagNameCheck,Ce)||K.tagNameCheck instanceof Function&&K.tagNameCheck(Ce)))return!1;if(qe&&!Xe[Ce]){let ft=P(E)||E.parentNode,Mt=H(E)||E.childNodes;if(Mt&&ft){let vt=Mt.length;for(let Pt=vt-1;Pt>=0;--Pt){let f=L(Mt[Pt],!0);f.__removalCount=(E.__removalCount||0)+1,ft.insertBefore(f,V(E))}}}return Fe(E),!0}return E instanceof c&&!Ut(E)||(Ce==="noscript"||Ce==="noembed"||Ce==="noframes")&&Gt(/<\/no(script|embed|frames)/i,E.innerHTML)?(Fe(E),!0):(Te&&E.nodeType===Yn.text&&(ie=E.textContent,Ks([de,he,Se],ft=>{ie=Gn(ie,ft," ")}),E.textContent!==ie&&(Hn(t.removed,{element:E.cloneNode()}),E.textContent=ie)),R(pe.afterSanitizeElements,E,null),!1)},be=function(E,ie,Ce){if(ne&&(ie==="id"||ie==="name")&&(Ce in r||Ce in De))return!1;if(!(Ye&&!Ne[ie]&&Gt(Le,ie))){if(!(ze&&Gt(te,ie))){if(!(Oe.attributeCheck instanceof Function&&Oe.attributeCheck(ie,E))){if(!Ee[ie]||Ne[ie]){if(!(we(E)&&(K.tagNameCheck instanceof RegExp&&Gt(K.tagNameCheck,E)||K.tagNameCheck instanceof Function&&K.tagNameCheck(E))&&(K.attributeNameCheck instanceof RegExp&&Gt(K.attributeNameCheck,ie)||K.attributeNameCheck instanceof Function&&K.attributeNameCheck(ie,E))||ie==="is"&&K.allowCustomizedBuiltInElements&&(K.tagNameCheck instanceof RegExp&&Gt(K.tagNameCheck,Ce)||K.tagNameCheck instanceof Function&&K.tagNameCheck(Ce))))return!1}else if(!pt[ie]){if(!Gt(oe,Gn(Ce,Ae,""))){if(!((ie==="src"||ie==="xlink:href"||ie==="href")&&E!=="script"&&Nf(Ce,"data:")===0&&yt[E])){if(!(Y&&!Gt(se,Gn(Ce,Ae,"")))){if(Ce)return!1}}}}}}}return!0},we=function(E){return E!=="annotation-xml"&&la(E,N)},ge=function(E){R(pe.beforeSanitizeAttributes,E,null);let{attributes:ie}=E;if(!ie||v(E))return;let Ce={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ee,forceKeepAttr:void 0},ft=ie.length;for(;ft--;){let Mt=ie[ft],{name:vt,namespaceURI:Pt,value:f}=Mt,$=ve(vt),G=f,m=vt==="value"?G:qf(G);if(Ce.attrName=$,Ce.attrValue=m,Ce.keepAttr=!0,Ce.forceKeepAttr=void 0,R(pe.uponSanitizeAttribute,E,Ce),m=Ce.attrValue,me&&($==="id"||$==="name")&&(Ft(vt,E),m=ae+m),Ze&&Gt(/((--!?|])>)|<\/(style|title|textarea)/i,m)){Ft(vt,E);continue}if($==="attributename"&&la(m,"href")){Ft(vt,E);continue}if(Ce.forceKeepAttr)continue;if(!Ce.keepAttr){Ft(vt,E);continue}if(!Q&&Gt(/\/>/i,m)){Ft(vt,E);continue}Te&&Ks([de,he,Se],ce=>{m=Gn(m,ce," ")});let y=ve(E.nodeName);if(!be(y,$,m)){Ft(vt,E);continue}if(j&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!Pt)switch(h.getAttributeType(y,$)){case"TrustedHTML":{m=j.createHTML(m);break}case"TrustedScriptURL":{m=j.createScriptURL(m);break}}if(m!==G)try{Pt?E.setAttributeNS(Pt,vt,m):E.setAttribute(vt,m),v(E)?Fe(E):Kl(t.removed)}catch{Ft(vt,E)}}R(pe.afterSanitizeAttributes,E,null)},tt=function Re(E){let ie=null,Ce=zt(E);for(R(pe.beforeSanitizeShadowDOM,E,null);ie=Ce.nextNode();)R(pe.uponSanitizeShadowNode,ie,null),W(ie),ge(ie),ie.content instanceof o&&Re(ie.content);R(pe.afterSanitizeShadowDOM,E,null)};return t.sanitize=function(Re){let E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ie=null,Ce=null,ft=null,Mt=null;if(At=!Re,At&&(Re="<!-->"),typeof Re!="string"&&!w(Re))if(typeof Re.toString=="function"){if(Re=Re.toString(),typeof Re!="string")throw Vn("dirty is not a string, aborting")}else throw Vn("toString is not a function");if(!t.isSupported)return Re;if(st||at(E),t.removed=[],typeof Re=="string"&&(Qe=!1),Qe){if(Re.nodeName){let f=ve(Re.nodeName);if(!re[f]||$e[f])throw Vn("root node is forbidden and cannot be sanitized in-place")}}else if(Re instanceof i)ie=It("<!---->"),Ce=ie.ownerDocument.importNode(Re,!0),Ce.nodeType===Yn.element&&Ce.nodeName==="BODY"||Ce.nodeName==="HTML"?ie=Ce:ie.appendChild(Ce);else{if(!mt&&!Te&&!Ve&&Re.indexOf("<")===-1)return j&&I?j.createHTML(Re):Re;if(ie=It(Re),!ie)return mt?null:I?O:""}ie&&Je&&Fe(ie.firstChild);let vt=zt(Qe?Re:ie);for(;ft=vt.nextNode();)W(ft),ge(ft),ft.content instanceof o&&tt(ft.content);if(Qe)return Re;if(mt){if(Pe)for(Mt=F.call(ie.ownerDocument);ie.firstChild;)Mt.appendChild(ie.firstChild);else Mt=ie;return(Ee.shadowroot||Ee.shadowrootmode)&&(Mt=ee.call(n,Mt,!0)),Mt}let Pt=Ve?ie.outerHTML:ie.innerHTML;return Ve&&re["!doctype"]&&ie.ownerDocument&&ie.ownerDocument.doctype&&ie.ownerDocument.doctype.name&&Gt(nc,ie.ownerDocument.doctype.name)&&(Pt="<!DOCTYPE "+ie.ownerDocument.doctype.name+`>
`+Pt),Te&&Ks([de,he,Se],f=>{Pt=Gn(Pt,f," ")}),j&&I?j.createHTML(Pt):Pt},t.setConfig=function(){let Re=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};at(Re),st=!0},t.clearConfig=function(){Me=null,st=!1},t.isValidAttribute=function(Re,E,ie){Me||at({});let Ce=ve(Re),ft=ve(E);return be(Ce,ft,ie)},t.addHook=function(Re,E){typeof E=="function"&&Hn(pe[Re],E)},t.removeHook=function(Re,E){if(E!==void 0){let ie=Pf(pe[Re],E);return ie===-1?void 0:Df(pe[Re],ie,1)[0]}return Kl(pe[Re])},t.removeHooks=function(Re){pe[Re]=[]},t.removeAllHooks=function(){pe=ec()},t}var oc=sc();var Ar={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Qs=e=>(...t)=>({_$litDirective$:e,values:t}),Sn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Zn=class extends Sn{constructor(t){if(super(t),this.it=Ot,t.type!==Ar.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ot||t==null)return this._t=void 0,this.it=t;if(t===sr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Zn.directiveName="unsafeHTML",Zn.resultType=1;var ac=Qs(Zn);function ya(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var tn=ya();function fc(e){tn=e}var es={exec:()=>null};function ht(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Yt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Jf=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Yt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},e_=/^(?:[ \t]*(?:\n|$))+/,t_=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,r_=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ts=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,n_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,va=/(?:[*+-]|\d{1,9}[.)])/,_c=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,mc=ht(_c).replace(/bull/g,va).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),s_=ht(_c).replace(/bull/g,va).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),wa=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,o_=/^[^\n]+/,ka=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,a_=ht(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ka).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),i_=ht(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,va).getRegex(),no="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",$a=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,l_=ht("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",$a).replace("tag",no).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),gc=ht(wa).replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",no).getRegex(),c_=ht(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",gc).getRegex(),xa={blockquote:c_,code:t_,def:a_,fences:r_,heading:n_,hr:ts,html:l_,lheading:mc,list:i_,newline:e_,paragraph:gc,table:es,text:o_},ic=ht("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",no).getRegex(),u_={...xa,lheading:s_,table:ic,paragraph:ht(wa).replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ic).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",no).getRegex()},d_={...xa,html:ht(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",$a).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:es,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ht(wa).replace("hr",ts).replace("heading",` *#{1,6} *[^
]`).replace("lheading",mc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},p_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,f_=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,hc=/^( {2,}|\\)\n(?!\s*$)/,__=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,so=/[\p{P}\p{S}]/u,Aa=/[\s\p{P}\p{S}]/u,bc=/[^\s\p{P}\p{S}]/u,m_=ht(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Aa).getRegex(),yc=/(?!~)[\p{P}\p{S}]/u,g_=/(?!~)[\s\p{P}\p{S}]/u,h_=/(?:[^\s\p{P}\p{S}]|~)/u,b_=ht(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Jf?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),vc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,y_=ht(vc,"u").replace(/punct/g,so).getRegex(),v_=ht(vc,"u").replace(/punct/g,yc).getRegex(),wc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",w_=ht(wc,"gu").replace(/notPunctSpace/g,bc).replace(/punctSpace/g,Aa).replace(/punct/g,so).getRegex(),k_=ht(wc,"gu").replace(/notPunctSpace/g,h_).replace(/punctSpace/g,g_).replace(/punct/g,yc).getRegex(),$_=ht("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,bc).replace(/punctSpace/g,Aa).replace(/punct/g,so).getRegex(),x_=ht(/\\(punct)/,"gu").replace(/punct/g,so).getRegex(),A_=ht(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),S_=ht($a).replace("(?:-->|$)","-->").getRegex(),E_=ht("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",S_).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),eo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,T_=ht(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",eo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),kc=ht(/^!?\[(label)\]\[(ref)\]/).replace("label",eo).replace("ref",ka).getRegex(),$c=ht(/^!?\[(ref)\](?:\[\])?/).replace("ref",ka).getRegex(),C_=ht("reflink|nolink(?!\\()","g").replace("reflink",kc).replace("nolink",$c).getRegex(),lc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Sa={_backpedal:es,anyPunctuation:x_,autolink:A_,blockSkip:b_,br:hc,code:f_,del:es,emStrongLDelim:y_,emStrongRDelimAst:w_,emStrongRDelimUnd:$_,escape:p_,link:T_,nolink:$c,punctuation:m_,reflink:kc,reflinkSearch:C_,tag:E_,text:__,url:es},R_={...Sa,link:ht(/^!?\[(label)\]\((.*?)\)/).replace("label",eo).getRegex(),reflink:ht(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",eo).getRegex()},ga={...Sa,emStrongRDelimAst:k_,emStrongLDelim:v_,url:ht(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",lc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ht(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",lc).getRegex()},I_={...ga,br:ht(hc).replace("{2,}","*").getRegex(),text:ht(ga.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Xs={normal:xa,gfm:u_,pedantic:d_},Qn={normal:Sa,gfm:ga,breaks:I_,pedantic:R_},L_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},cc=e=>L_[e];function Sr(e,t){if(t){if(Yt.escapeTest.test(e))return e.replace(Yt.escapeReplace,cc)}else if(Yt.escapeTestNoEncode.test(e))return e.replace(Yt.escapeReplaceNoEncode,cc);return e}function uc(e){try{e=encodeURI(e).replace(Yt.percentDecode,"%")}catch{return null}return e}function dc(e,t){let r=e.replace(Yt.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(Yt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Yt.slashPipe,"|");return n}function Xn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function O_(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function pc(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,c}function M_(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var to=class{constructor(e){wt(this,"options");wt(this,"rules");wt(this,"lexer");this.options=e||tn}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Xn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=M_(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Xn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Xn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Xn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))i.push(r[c]),a=!0;else if(!a)i.push(r[c]);else break;r=r.slice(c);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=p,r.length===0)break;let _=o.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let h=_,T=h.raw+`
`+r.join(`
`),L=this.blockquote(T);o[o.length-1]=L,n=n.substring(0,n.length-h.raw.length)+L.raw,s=s.substring(0,s.length-h.text.length)+L.text;break}else if(_?.type==="list"){let h=_,T=h.raw+`
`+r.join(`
`),L=this.list(T);o[o.length-1]=L,n=n.substring(0,n.length-_.raw.length)+L.raw,s=s.substring(0,s.length-h.raw.length)+L.raw,r=T.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),_=e.split(`
`,1)[0],h=!p.trim(),T=0;if(this.options.pedantic?(T=2,d=p.trimStart()):h?T=t[1].length+1:(T=t[2].search(this.rules.other.nonSpaceChar),T=T>4?1:T,d=p.slice(T),T+=t[1].length),h&&this.rules.other.blankLine.test(_)&&(u+=_+`
`,e=e.substring(_.length+1),c=!0),!c){let L=this.rules.other.nextBulletRegex(T),B=this.rules.other.hrRegex(T),V=this.rules.other.fencesBeginRegex(T),H=this.rules.other.headingBeginRegex(T),P=this.rules.other.htmlBeginRegex(T);for(;e;){let j=e.split(`
`,1)[0],O;if(_=j,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),O=_):O=_.replace(this.rules.other.tabCharGlobal,"    "),V.test(_)||H.test(_)||P.test(_)||L.test(_)||B.test(_))break;if(O.search(this.rules.other.nonSpaceChar)>=T||!_.trim())d+=`
`+O.slice(T);else{if(h||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(p)||H.test(p)||B.test(p))break;d+=`
`+_}!h&&!_.trim()&&(h=!0),u+=j+`
`,e=e.substring(j.length+1),p=O.slice(T)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=d.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=d.raw+c.tokens[0].raw,c.tokens[0].text=d.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(d)):c.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):c.tokens.unshift(d)}}if(!s.loose){let u=c.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=d}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=dc(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(dc(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Xn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=O_(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),pc(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return pc(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let d=[...n[0]][0].length,p=e.slice(0,s+n.index+d+a);if(Math.min(s,a)%2){let h=p.slice(1,-1);return{type:"em",raw:p,text:h,tokens:this.lexer.inlineTokens(h)}}let _=p.slice(2,-2);return{type:"strong",raw:p,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},_r=class ha{constructor(t){wt(this,"tokens");wt(this,"options");wt(this,"state");wt(this,"inlineQueue");wt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||tn,this.options.tokenizer=this.options.tokenizer||new to,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Yt,block:Xs.normal,inline:Qn.normal};this.options.pedantic?(r.block=Xs.pedantic,r.inline=Qn.pedantic):this.options.gfm&&(r.block=Xs.gfm,this.options.breaks?r.inline=Qn.breaks:r.inline=Qn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Xs,inline:Qn}}static lex(t,r){return new ha(r).lex(t)}static lexInline(t,r){return new ha(r).inlineTokens(t)}lex(t){t=t.replace(Yt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Yt.tabCharGlobal,"    ").replace(Yt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(d=>(c=d.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let d=r.at(-1);c.type==="text"&&d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,i)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),_;this.options.extensions.startInline.forEach(h=>{_=h.call({lexer:this},p),typeof _=="number"&&_>=0&&(d=Math.min(d,_))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let d=r.at(-1);d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):r.push(c);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return r}},ro=class{constructor(e){wt(this,"options");wt(this,"parser");this.options=e||tn}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Yt.notSpaceStart)?.[0],s=e.replace(Yt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Sr(n)+'">'+(r?s:Sr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Sr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Sr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=uc(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Sr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=uc(e);if(s===null)return Sr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Sr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Sr(e.text)}},Ea=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},mr=class ba{constructor(t){wt(this,"options");wt(this,"renderer");wt(this,"textRenderer");this.options=t||tn,this.options.renderer=this.options.renderer||new ro,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ea}static parse(t,r){return new ba(r).parse(t)}static parseInline(t,r){return new ba(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Js,Jn=(Js=class{constructor(e){wt(this,"options");wt(this,"block");this.options=e||tn}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?_r.lex:_r.lexInline}provideParser(){return this.block?mr.parse:mr.parseInline}},wt(Js,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),wt(Js,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Js),P_=class{constructor(...e){wt(this,"defaults",ya());wt(this,"options",this.setOptions);wt(this,"parse",this.parseMarkdown(!0));wt(this,"parseInline",this.parseMarkdown(!1));wt(this,"Parser",mr);wt(this,"Renderer",ro);wt(this,"TextRenderer",Ea);wt(this,"Lexer",_r);wt(this,"Tokenizer",to);wt(this,"Hooks",Jn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new ro(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new to(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Jn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],c=s[a];Jn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Jn.passThroughHooksRespectAsync.has(o))return(async()=>{let p=await i.call(s,u);return c.call(s,p)})();let d=i.call(s,u);return c.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await i.apply(s,u);return p===!1&&(p=await c.apply(s,u)),p})();let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return _r.lex(e,t??this.defaults)}parser(e,t){return mr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?_r.lex:_r.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?mr.parse:mr.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?_r.lex:_r.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?mr.parse:mr.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Sr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},en=new P_;function bt(e,t){return en.parse(e,t)}bt.options=bt.setOptions=function(e){return en.setOptions(e),bt.defaults=en.defaults,fc(bt.defaults),bt};bt.getDefaults=ya;bt.defaults=tn;bt.use=function(...e){return en.use(...e),bt.defaults=en.defaults,fc(bt.defaults),bt};bt.walkTokens=function(e,t){return en.walkTokens(e,t)};bt.parseInline=en.parseInline;bt.Parser=mr;bt.parser=mr.parse;bt.Renderer=ro;bt.TextRenderer=Ea;bt.Lexer=_r;bt.lexer=_r.lex;bt.Tokenizer=to;bt.Hooks=Jn;bt.parse=bt;var Ny=bt.options,qy=bt.setOptions,Fy=bt.use,jy=bt.walkTokens,By=bt.parseInline;var Uy=mr.parse,Wy=_r.lex;function Mr(e){let t=bt.parse(e),r=oc.sanitize(t);return ac(r)}function Er(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function En(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function oo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var xc={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},D_={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},N_=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,q_=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function br(e){return!!e&&typeof e=="object"}function Ta(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ca(e,t){let r=Ta(e),n=Ta(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Ac(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>br(s)&&typeof s.text=="string"?s.text:"").join(""):br(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function F_(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:xc[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Ta(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ca(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let c=Ca(br(i)?i.old_string:"",br(i)?i.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Ra(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Ia(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=N_.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:q_.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function j_(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(br(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Ia(o.text));else if(o.type==="thinking"){let a=Ra(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=F_(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(br(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Ac(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function B_(e){let t=typeof e.command=="string"?e.command:"",r=Ac(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",r].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:xc.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function U_(e){if(e.type==="item.completed"&&br(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ia(t.text)];if(t.type==="reasoning"){let r=Ra(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[B_(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function W_(e){if(e.schema!=="codex-delegation-monitor-v1"||!br(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&br(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[Ia(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=Ra(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=D_[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function z_(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function H_(e){let t=e;if(typeof e=="string"){let r=e.trim();if(r.length===0)return null;try{t=JSON.parse(r)}catch{return null}}return br(t)?t:null}function Sc(){let e=new Map;return{push(t){let r=H_(t);return r?r.schema==="codex-delegation-monitor-v1"?W_(r):z_(r)?U_(r):j_(r,e):[]}}}function La(e){let t=[],r=Sc(),n=Array.isArray(e)?e:[];for(let s of n)for(let o of r.push(s))t.push(o);return t}var G_=5,V_=10,K_=/Task\s+#(\d+)/,Y_=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Z_=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ao(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Q_(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function X_(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function J_(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=K_.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function em(e){if(e.tool==="Bash"){let t=e.command||"";return Y_.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Z_.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function tm(e){let t=e.filter(s=>s.kind==="tool").slice(-V_),r=new Map;t.forEach((s,o)=>{let a=em(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function rm(e){let t=X_(e);if(t)return{text:t,guess:!1};let r=J_(e);if(r)return{text:r,guess:!1};let n=tm(e);return n?{text:n,guess:!0}:null}function nm(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:ar(e,t)}function Tn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,c=null,u=!1,d={},p=!0,_=new Set,h=new Set,T=null,L=null,B=!1,V=!1,H=!1,P=null,j=null;function O(){B=!1,V=!1,H=!1,P=null,j=null}async function U(Y){if(r){V=!0,H=!1,ye();try{let Q=await Promise.resolve(r("get-attempt-prompt",{attempt_id:Y,...c?{root_dir:c}:{}}));if(o!==Y)return;!Q||typeof Q!="object"||Array.isArray(Q)?H=!0:(P=Q,j=Y)}catch{o===Y&&(H=!0)}finally{o===Y&&(V=!1,ye())}}}function b(){if(B=!B,B&&o&&j!==o){U(o);return}ye()}function F(){if(!B)return"";let Y=En({loading:V,error:H});if(Y)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Y}
      </div>`;if(!P)return"";if(P.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=oo(P.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?l`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof P.task_prompt=="string"?Er("\uACFC\uC5C5 (user)",P.task_prompt):""}
      ${typeof P.system_prompt=="string"?Er("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",P.system_prompt):""}
    </div>`}function J(){if(!i||!n)return[];let Y=n.get(i);return La(Y?Y.lines:[])}function ee(){if(!i||!n)return null;let Y=n.get(i),Q=Y?Y.last_event_at:null;return typeof Q=="number"?Q:null}function pe(){return d.status==="running"}function de(){if(pe()&&o){L||(L=setInterval(()=>ye(),1e3));return}he()}function he(){L&&(clearInterval(L),L=null)}function Se(Y){let Q=[],Te=0;for(;Te<Y.length;){let Ze=Y[Te];if(Ze.kind==="tool"){let Ve=Te;for(;Ve<Y.length&&Y[Ve].kind==="tool"&&Y[Ve].tool===Ze.tool;)Ve+=1;if(Ve-Te>=G_&&!h.has(Te)){Q.push({kind:"group",idx:Te,tool:Ze.tool||"",lines:Y.slice(Te,Ve).map((st,Je)=>({idx:Te+Je,line:st}))}),Te=Ve;continue}}Q.push({kind:"line",idx:Te,line:Ze}),Te+=1}return Q}function Le(Y){for(let Q=Y.length-1;Q>=0;Q-=1){let Te=Y[Q];if(Te.kind==="result"||Te.kind==="error")return null;if(Te.kind==="tool"&&!Object.hasOwn(Te,"result"))return Te}return null}function te(Y){for(let Q=Y.length-1;Q>=0;Q-=1)if(Y[Q].kind==="thinking")return Y[Q];return null}function se(Y,Q){if(Q.kind==="gate")return l`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return l`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return l`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Mr(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let Te=_.has(Y);return l`<div
        class="sv__think${Te?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>C(Y)}
      >
        <span class="sv__think-line">💭 ${ao(Q.text)}</span>
        ${Te?l`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return l`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return l`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let Te=_.has(Y),Ze=Q.tool==="Bash"?Q_(Q.command):0,Ve=Q.tool==="Bash"?Ze>1?ao(Q.command):Q.command:Q.path||Q.command||"";return l`<div
        class="sv__tool${Te?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>C(Y)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${Ve?l`<span class="sv__tool-detail">${Ve}</span>`:""}
          ${Ze>1?l`<span class="sv__tool-more">⋯ ${Ze}줄</span>`:""}
          ${typeof Q.added=="number"?l`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?l`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?l`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${Te?l`<pre class="sv__tool-expand">${Ae(Q)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Mr(Q.text||"")}</div>`}function Ae(Y){let Q=[];if(Y.tool==="Bash"&&typeof Y.command=="string"&&Y.command.length>0)Q.push(Y.command);else if(Y.input!==void 0)try{Q.push(`input: ${JSON.stringify(Y.input,null,2)}`)}catch{}return typeof Y.output=="string"&&Y.output.length>0&&Q.push(`output:
${Y.output}`),Q.join(`

`)}function N(){if(!o)return l``;let Y=J(),Q=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),Te=d.session_id||"",Ze=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,Ve=pe(),st=Ve?nm(ee(),Date.now()):"",Je=Ve?Le(Y):null,mt=Ve?te(Y):null,Pe=rm(Y);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${Pe?l`<span
              class="sv__stage${Pe.guess?" sv__stage--guess":""}"
              title=${Pe.text}
              >${Pe.text}</span
            >`:""}
        ${Ve?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${st?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${st}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${st?l`<span class="sv__live-ago">${st}</span>`:""}</span
            >`:""}
        ${Te?l`<button
              type="button"
              class="sv__session"
              title=${Te}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Te}`}
              @click=${()=>$e(Te)}
            >
              ⧉ ${Te.slice(0,8)}
            </button>`:""}
        ${Q?l`<span class="sv__meta">${Q}</span>`:""}
        ${d.worktree?l`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":l`<button
              type="button"
              class="sv__prompt-toggle${B?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${B?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${b}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${p?" sv__follow--on":""}"
          aria-pressed=${p?"true":"false"}
          aria-label=${Ze}
          @click=${K}
        >
          <span class="sv__follow-full">⇣ ${Ze}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Ye()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":F()}
      <div class="sv__body">
        ${Y.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:Se(Y).map(I=>I.kind==="group"?oe(I):se(I.idx,I.line))}
      </div>
      ${Je||mt?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Je?l`<span class="sv__now-icon">${Je.icon}</span>
                  <span class="sv__now-name">${Je.tool}</span>
                  <span class="sv__now-detail"
                    >${Je.tool==="Bash"?ao(Je.command):Je.path||Je.command||""}</span
                  >`:""}
            ${mt?l`<span class="sv__now-think"
                  >💭 ${ao(mt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function oe(Y){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>re(Y.idx)}
    >
      <span class="sv__group-icon">${Y.lines[0].line.icon}</span>
      <span class="sv__group-name">${Y.tool}</span>
      <span class="sv__group-count">${Y.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function re(Y){h.add(Y),ye()}function ye(){Ge(N(),e),de(),p&&Ee()}function Ee(){let Y=e.querySelector(".sv__body");Y&&(Y.scrollTop=Y.scrollHeight)}function C(Y){_.has(Y)?_.delete(Y):_.add(Y),ye()}function K(){p=!p,ye()}function $e(Y){tr(Y).then(Q=>{Q?_e("\uBCF5\uC0AC\uB428","success",1200):_e("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ne(Y){!o||!Y||(d={...d,...Y},ye())}function Oe(Y){let Q=Y.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&p&&(p=!1,ye())}e.addEventListener("scroll",Oe,!0);function ze(Y){let Q=Y&&Y.attempt_id;if(!Q)return;let Te=i;o=Q,a=typeof Y.launch_id=="string"&&Y.launch_id.length>0?Y.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&Te&&Te!==i&&Promise.resolve(r("unsubscribe-session-log",{id:Te})).catch(()=>{}),c=typeof Y.root_dir=="string"&&Y.root_dir.length>0?Y.root_dir:null,d=Y.meta||{},u=Y.hide_prompt===!0,p=!0,_.clear(),h.clear(),O(),!T&&n&&(T=n.subscribe(ye)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),ye()}function Ye(){let Y=i;o=null,a=null,i=null,c=null,u=!1,_.clear(),h.clear(),O(),he(),r&&Y&&Promise.resolve(r("unsubscribe-session-log",{id:Y})).catch(()=>{}),Ge(l``,e),s&&s()}return{open:ze,updateMeta:Ne,close:Ye,isOpen(){return o!==null},destroy(){he(),T&&(T(),T=null),e.removeEventListener("scroll",Oe,!0),o=null,a=null,i=null,c=null,u=!1,Ge(l``,e)}}}function io(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Oa(t.spec_id),s=Oa(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Oa(e){return typeof e=="string"?e.trim():""}function Ec(e){let t=io(e);if(t.path)return t;let r=Oa(sm(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function sm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function om(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function am(e){let t=e&&e.metadata||{},r=Ec(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:om(t)?null:"plan_pending"}),n}function Tc(e,t){let r=am(e);return l`
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
  `}var im="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",lm=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,cm=/^\*\*결론\*\* — (.+)$/;function lo(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==im)return null;let r=lm.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?cm.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Cc=20;function Rc(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function um(e){return e.length>Cc?`${e.slice(0,Cc)}\u2026`:e}function dm(e,t,r,n){let s=`${t.lane} ${um(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Rc(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${Mr(t.body)}
        </div>`:""}
  </div>`}function pm(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Rc(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Mr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ic(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=lo(typeof c.text=="string"?c.text:"");return u?dm(c,u,t,s.has(c.id)):pm(c)})}
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
  `}var{I:xv}=Qi;var Lc=e=>e.strings===void 0;var fm={},Oc=(e,t=fm)=>e._$AH=t;var rn=Qs(class extends Sn{constructor(e){if(super(e),e.type!==Ar.PROPERTY&&e.type!==Ar.ATTRIBUTE&&e.type!==Ar.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Lc(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===sr||t===Ot)return t;let r=e.element,n=e.name;if(e.type===Ar.PROPERTY){if(t===r[n])return sr}else if(e.type===Ar.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return sr}else if(e.type===Ar.ATTRIBUTE&&r.getAttribute(n)===t+"")return sr;return Oc(e),t}});var co=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Pa=[...co.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Tr=["orchestration_model","orchestration_effort","orchestration_speed"],uo=[...co,...Tr],_m=Pa.filter(e=>uo.includes(e)),Mc=["delegated","main"],po=["inherit","claude","codex"],rs=["default","fast"],ns=["standard","fast_track"],ss=["codex","opus","fable","self","skip"],fo=["codex","fable","skip"],_o=["low","medium","high","xhigh"],nr="auto";function rr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Pc(e){if(!rr(e)||!rr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))rr(n)&&rr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Cn(e,t){let r=Pc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[nr,...n.flatMap(([,s])=>s)]}function Dc(e,t,r,n){if(!rr(e)||!rr(e.runners))return[nr];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!rr(a)||!rr(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(r&&r!==nr&&i!==r)continue;let u=n(a,c);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[nr,...s]}function Rn(e,t,r){return Dc(e,t,r,(n,s)=>rr(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function Da(e,t,r){return Dc(e,t,r,(n,s)=>rr(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:rr(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function os(e,t){let r=Pc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Nc(e,t,r){let n={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:n.impl_runtime==="inherit"?r:null;return s&&(n.impl_model&&!Cn(t,s).includes(n.impl_model)&&(n.impl_model=void 0),n.impl_effort&&!Rn(t,s,n.impl_model||nr).includes(n.impl_effort)&&(n.impl_effort=void 0)),n}var mm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ma=[..._m,...Tr],gm=[...uo,...Pa].filter((e,t,r)=>r.indexOf(e)===t&&!Ma.includes(e));function qc(e,t){let r=rr(e)?e:{},n=rr(t)?t:{},s=[];for(let a of Ma){let i=r[a]??null,c=n[a]??null;i!==c&&s.push({key:a,label:mm[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...gm,...Object.keys(n)])!Ma.includes(a)&&!o.includes(a)&&Object.hasOwn(n,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Na(e,t,r,n,s,o){return Hs({key:e,choices:t,layer:"global",global:r,resolution_global:o,execution_defaults:n,runner_catalog:s})}function Fc(e,t){let r={};for(let n of Pa){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function jc(e,t){let r={};for(let n of Tr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var qa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Tr]}],Pr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},mo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Fa(e,t,r,n,s,o=null){let a=Qt({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Bc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of Fa(e,t,r,n,s,o))a[i.source]+=1;return a}function Uc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Wc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Pv=[...co,...Tr];var hm=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],bm={pin:"pin",global:"global",base:"base"};function ym(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${bm[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function vm(e,t,r){switch(e){case"workflow_mode":return ns;case"spec_review_model":case"impl_review_model":return ss;case"plan_review_model":return fo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return _o;case"impl_dispatch":return Mc;case"impl_runtime":return po;case"impl_model":return Cn(r,t.impl_runtime);case"impl_effort":return Rn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return rs;case"orchestration_model":return os(r,null);case"orchestration_effort":return Rn(r,void 0,t.orchestration_model||nr).filter(n=>n!==nr);default:return[]}}function wm(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${ym(e.source)}
    <span class="detail-effective__k"
      >${Pr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${mo[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Pr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function zc(e,t){let r=qa.flatMap(c=>c.keys),n=Fa(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Bc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(c=>[c.key,c])),a=Object.fromEntries(n.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=n.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return l`<details
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
        >${km(o)}</span
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
          ${qa.map(c=>l`
              <div class="detail-effective__subhead">${c.label}</div>
              ${n.filter(u=>c.keys.includes(u.key)).map(u=>{let d=Hs({key:u.key,choices:vm(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return wm(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${rn(e.preset_id)}
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
  </details>`}function km(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function $m(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function Hc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=$m(r.exec_receipt),c=i?Xr(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=Ws(r.planned_execution,r.exec_receipt);return l`<section class="detail-summary" data-seam="detail-summary">
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
      ${hm.map(p=>{let _=p.receipt&&typeof t[p.receipt]=="string"?String(t[p.receipt]):"",h=n[p.id],T=_.length>0||h?.fill==="full",L=!T&&h?.fill==="dim",B=h?.stale===!0;return l`<span
          class=${`detail-summary__gate${T?" detail-summary__gate--on":""}${L?" detail-summary__gate--current":""}${B?" detail-summary__gate--stale":""}`}
          data-gate=${p.id}
        >
          <span class="detail-summary__gate-pill">${p.label}</span>
          ${_?l`<span class="detail-summary__gate-sha"
                >${_.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function Yc(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Gc(e){return Yc(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Vc(e,t){let r=e&&e[t];if(!Yc(r)||!Array.isArray(r.accounts))return null;let n=r.accounts.filter(Gc),s=Gc(r.active)?r.active:null;return{accounts:n,active:s||n.find(o=>o.active===!0)||null}}function Zc(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function xm(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Zc(e)}${t}`}function Qc(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Zc(e)}`}function Am(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Qc({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Kc(e){let t=e.provider_key==="claude"?xm:Qc,r=!!e.provider?.accounts.some(n=>n.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${n=>e.handlers.onExecChange(e.key,n.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Am(e.provider_key,e.provider)}
        </option>
        ${e.selected&&!r?l`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(n=>l`<option
              value=${n.key}
              ?selected=${n.key===e.selected}
            >
              ${t(n)}
            </option>`)||""}
      </select>
      ${e.hint?l`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":l`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function Xc({md:e,catalog:t,handlers:r}){let n=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Kc({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Vc(t,"claude"),selected:n,handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Kc({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Vc(t,"codex"),selected:s,handlers:r})}
    </div>
  </section>`}var Jc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function as(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function go(e){if(!as(e)||!as(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>as(r)&&as(r.models));return t.length>0?t:null}function gr(e,t){let r=go(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function eu(e,t){return as(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function tu(e,t){let r=go(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return eu(n,n.models[t]);return[]}function Sm(e){let t=go(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of eu(n,s))r.includes(o)||r.push(o);return r}function Em(e,t){if(!t)return Sm(e);let n=go(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of tu(e,o))s.includes(a)||s.push(a);return s}function ru(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=gr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?tu(t,n.impl_model):Em(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Tm(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function nu(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function c(T){T.key==="Escape"&&s&&(T.preventDefault(),_())}document.addEventListener("keydown",c);function u(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>_()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Tm(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>_()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${i}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Mr(a)}
          </div>
        </div>
      </div>
    `:l``}function d(){Ge(u(),e)}async function p(T,L={}){s=T,o="loading",a="",i="",d();let B=r?r():"";if(!B){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",d();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",d();return}let V="/api/doc?workspace="+encodeURIComponent(B)+"&path="+encodeURIComponent(T);try{let H=await n(V),P=await H.json().catch(()=>({}));if(!H.ok||!P||P.ok!==!0){if(P?.error==="not_found"&&L.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",d();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(P&&P.error||H.status)+")",d();return}a=String(P.content||""),o="ready",d()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",d()}}function _(){s=null,Ge(l``,e)}function h(){document.removeEventListener("keydown",c),_()}return{open:p,close:_,destroy:h}}var Cm=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],ou="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ho=["implementation","review-consult"],Rm=["running","done","failed","interrupted"],Im={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Lm(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Om(e){let t=Wt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=An(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${ou}
          >부분 집계</span
        >`:""}`}function su(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ja(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ba(t):""}function Mm(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!ho.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!Rm.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function Pm(e,t){let n=Wt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
    ${ja(t.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${ja(t.completed_at)}</span
        >`:""}
    ${n?l`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function Dm(e,t,r,n){let s=e.status==="running"?null:t,a=(s?Wt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Ba(e.last_event_at):s?ja(s.completed_at):"";return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Im[e.status]}</span
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
  </button>`}function Nm(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function qm(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let p=Mm(d);!p||s.has(p.launch_id)||(s.add(p.launch_id),n.push(p))}n.sort((d,p)=>d.started_at-p.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let d of ho){let p=t.roles[d]?.codex;a[d]=p?[...p.legs]:[]}let i=ho.flatMap(d=>a[d]),c=new Set,u=[];for(let d of ho){for(let p of n.filter(_=>_.role===d)){let _=i.find(h=>h.receipt_id===p.launch_id)||null;_&&!Nm(p,_)||(_&&c.add(_.receipt_id),u.push(Dm(p,_,e.attempt_id,r)))}for(let p of a[d])c.has(p.receipt_id)||u.push(Pm(d,p))}return u}function Fm(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Cm,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${n.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Lm(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${ou}</span>`:""}
  </div>`}var jm={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ba(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Bm(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function au(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let p=typeof u.session_id=="string"&&u.session_id.length>0,_=o.has(u.attempt_id),h=p&&!_,T=p?_?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!h}
      title=${T}
      @click=${L=>{L.stopPropagation(),h&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let p=u.cause_detail,_=p&&typeof p.reason=="string"&&p.reason.length>0?typeof p.command=="string"&&p.command.length>0?`${p.reason} \xB7 ${p.command}`:p.reason:u.cause;return l`<div class="detail-session__cause" title=${_}>
      ${u.cause}
    </div>`},c=u=>{let d=su(aa(u));if(Wt(d).length===0&&!An(u.usage))return"";let p=s.has(u.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${p?"true":"false"}
      title=${p?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${_=>{_.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${Om(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let d=aa(u),p=su(d),_=Wt(p);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${jm[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${Bn(u)?l`<span
                  class="detail-session__resumed"
                  title=${Bn(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Jr(u)}</span>
            ${_.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?l`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${_.length>0?_.map(h=>l`<span
                      class="detail-session__usage"
                      title=${h.tooltip}
                      >${h.label}</span
                    >`):An(u.usage)?l`<span class="detail-session__usage"
                    >${An(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ba(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${Bm(u)}
          ${s.has(u.attempt_id)&&u.usage?Fm(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${qm(u,d,t)}
        </div>`})}
    </div>
  `}function iu(e,t={}){return l`
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
          ${Um(e)}
        </div>`:""}
  `}function Um(e){let t=En(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Er("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=oo(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Er("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Er("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Wm=["open","in_progress","deferred","resolved","closed"],zm=[0,1,2,3,4];function lu(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,d=null,p={},_="",h=!1,T=[],L=!1,B={},V={claude:null,codex:null},H=null,P=0,j=!1,O=!1,U="",b="",F="";function J(){j=!1,O=!1,U="",b="",F=""}function ee(){V={claude:null,codex:null},H=null,P+=1}async function pe(x){try{let Z=await fetch(x);if(!Z.ok)return null;let D=await Z.json();if(!D||typeof D!="object"||!Array.isArray(D.accounts))return null;let Ie=D.accounts.filter(ut=>ut!==null&&typeof ut=="object"&&!Array.isArray(ut));return{accounts:Ie,active:Ie.find(ut=>ut.active===!0)||null}}catch{return null}}async function de(x){H=x;let Z=++P,[D,Ie]=await Promise.all([pe("/api/claude-usage"),pe("/api/codex-usage")]);Z!==P||x!==u||(V={claude:D,codex:Ie},xe())}let he=[],Se=null,Le=null,te=!1,se="",Ae=!1,N=0,oe=new Set;function re(){he=[],Se=null,Le=null,te=!1,se="",Ae=!1,N+=1,oe.clear()}async function ye(x){if(!s)return;let Z=++N;try{let D=await Promise.resolve(s("get-comments",{id:x}));if(Z!==N||x!==u)return;he=Array.isArray(D)?D:[],te=!1}catch{if(Z!==N||x!==u)return;te=!0}xe()}function Ee(){if(!s||!u)return;let x=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Se!==u){Se=u,Le=x,ye(u);return}x!==null&&x!==Le&&(Le=x,ye(u))}function C(x){oe.has(x)?oe.delete(x):oe.add(x),xe()}function K(x){let Z=se.trim().length===0;se=x,Z!==(x.trim().length===0)&&xe()}async function $e(){let x=se.trim();if(!s||!u||x.length===0||Ae)return;let Z=u;Ae=!0,xe();let D=!1;try{let Ie=await Promise.resolve(s("add-comment",{id:Z,text:x}));Array.isArray(Ie)&&Ie.length>0&&(D=!0,Z===u&&(he=Ie,te=!1,se="",Le=Ie.length))}catch{D=!1}D||_e("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),Z===u&&(Ae=!1),xe()}let Ne={onToggle:C,onDraftInput:K,onSubmit:$e},Oe=document.createElement("div");Oe.className="md-viewer-root",document.body.appendChild(Oe);let ze=nu(Oe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ye=document.createElement("div");Ye.className="session-log-root",document.body.appendChild(Ye);let Y=Tn(Ye,{transport:s?(x,Z)=>Promise.resolve(s(x,Z)):void 0,sessionLogStore:c}),Q=!1,Te=!1,Ze=!1,Ve=null,st=null,Je=0;function mt(x){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${x}`}function Pe(){Q=!1,Te=!1,Ze=!1,Ve=null,st=null,Je+=1}async function I(x){if(!s)return;let Z=++Je;Te=!0,Ze=!1,xe();try{let D=await Promise.resolve(s("get-bead-prompt",{bead_id:x}));if(Z!==Je)return;!D||typeof D!="object"||Array.isArray(D)?Ze=!0:(Ve=D,st=mt(x))}catch{Z===Je&&(Ze=!0)}finally{Z===Je&&(Te=!1,xe())}}function ne(){if(Q=!Q,Q&&u&&st!==mt(u)){Ve=null,I(u);return}xe()}function me(){if(!a||!u)return[];let x=a.get();return(x&&x.attempts?Object.values(x.attempts):[]).filter(D=>D&&D.bead_id===u).sort((D,Ie)=>(Ie.started_at||0)-(D.started_at||0)).map(D=>({attempt_id:D.attempt_id,bead_id:D.bead_id,status:D.status,started_at:typeof D.started_at=="number"?D.started_at:null,runner:D.runner||null,model:D.model||null,effort:D.effort||D.observed_effort||null,speed:D.speed||null,session_id:D.session_id||null,resumed_from:D.resumed_from||null,continuation_mode:D.continuation_mode||null,dismissed_at:typeof D.dismissed_at=="number"?D.dismissed_at:null,cause:typeof D.cause=="string"?D.cause:null,cause_detail:D.cause_detail||null,exec_default_preset_id:typeof D.exec_default_preset_id=="string"?D.exec_default_preset_id:null,exec_default_preset_revision:typeof D.exec_default_preset_revision=="number"?D.exec_default_preset_revision:null,exec_values:D.exec_values&&typeof D.exec_values=="object"?D.exec_values:null,usage:D.usage||null,usage_legs:Array.isArray(D.usage_legs)?D.usage_legs:[],delegation_sessions:Array.isArray(D.delegation_sessions)?D.delegation_sessions:[]}))}function ae(){if(!a||!u)return null;let x=a.get();return ir(x&&x.attempts||{},u)}let qe=new Set;function Qe(x){qe.has(x)?qe.delete(x):qe.add(x),xe()}function ot(x){let Z=a?a.get():null,D=Z&&Z.attempts?Z.attempts[x]:null;Y.open({attempt_id:x,meta:D?{runner:D.runner||void 0,model:D.model||void 0,effort:D.effort||void 0,status:D.status||void 0,session_id:D.session_id||void 0}:{}})}function Xe(x,Z){let D=a?a.get():null,Ie=D&&D.attempts?D.attempts[x]:null,it=(Ie&&Array.isArray(Ie.delegation_sessions)?Ie.delegation_sessions:[]).find(rt=>rt&&typeof rt=="object"&&rt.launch_id===Z);it&&Y.open({attempt_id:x,launch_id:Z,meta:{runner:"codex",role:it.role,model:it.model,effort:it.effort,session_id:it.session_id,status:it.status}})}async function dt(x){if(!s||!x)return;let Z=await xn();if(Z===null)return;let D=()=>{let rt=a?a.get():null;return rt&&typeof rt.revision=="number"?rt.revision:0},Ie=async(rt={},nt=D())=>await s("worker-attempt-resume",{attempt_id:x,expected_revision:nt,...Z!==""?{instructions:Z}:{},...rt}),ut=rt=>{rt?.queue&&a?.set&&a.set(rt.queue)},it=await Ie();if(ut(it),it&&it.conflict){let rt=it.queue&&typeof it.queue.revision=="number"?it.queue.revision:D();it=await Ie({},rt),ut(it)}it=await wr(it,(rt,nt)=>Ie({continuation:rt,decision_token:nt}),{onResult:ut,refresh:()=>Ie()}),it&&it.resumed===!1&&!it.conflict&&it.reason&&_e(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${it.reason}`,"error",2400)}let yt={onOpen:ot,onOpenDelegation:Xe,onResume:dt,onToggleUsage:Qe};function gt(){let x=a?a.get():null,Z={...B};for(let D of["orchestration_model","orchestration_effort","orchestration_speed"]){let Ie=x&&x[D];typeof Ie=="string"&&(Z[D]=Ie)}return Z}async function pt(){if(s){try{let x=await Promise.resolve(s("get-session-defaults",{}));B=x&&x.values&&typeof x.values=="object"?x.values:{}}catch{B={}}xe()}}function kt(){let x=a?a.get():null;return x&&x.runner_catalog||null}function We(){let x=a?a.get():null;return x&&typeof x.execution_defaults=="object"?x.execution_defaults:null}function Ke(){let x=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},D=Qt({pin:{...x,...p},global:gt(),execution_defaults:We(),runner_catalog:kt(),route:typeof x.route=="string"?x.route:null}).orchestration_model.value||"";return gr(kt(),D)}function Ue(){let x=i?i.get():null;return!x||typeof x.revision!="number"?null:{revision:x.revision,presets:Array.isArray(x.presets)?x.presets:[]}}function ct(x){return x?.compatible===!1}function At(x){i&&x&&typeof x.revision=="number"&&Array.isArray(x.presets)&&i.set({revision:x.revision,presets:x.presets})}async function A(){let x=Ue(),Z=x?.presets.find(D=>D.id===_);if(!(!s||!u||!x||!Z||ct(Z)||h)){h=!0,T=[],xe();try{let D=await Promise.resolve(s("apply-impl-preset",Wc(u,Z.id,x.revision)));if(D&&D.conflict){At(D),_e("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Ie=D&&Array.isArray(D.issue)?D.issue[0]:D?.issue;if(D&&D.applied&&Ie&&typeof Ie=="object"){d=Ie,T=Array.isArray(D.skipped_orchestration_keys)?D.skipped_orchestration_keys.filter(ut=>typeof ut=="string"):[];for(let ut of Jc)delete p[ut];_e(T.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}D&&D.error==="bd_readback_failed"?_e("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):_e("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(D){D&&typeof D=="object"&&D.code==="bd_readback_failed"?_e("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):_e("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{h=!1,xe()}}}let M=null;r&&r.subscribe&&(M=r.subscribe(()=>q()));let ue=null;a&&typeof a.subscribe=="function"&&(ue=a.subscribe(()=>{u&&xe()}));let k=null;i&&typeof i.subscribe=="function"&&(k=i.subscribe(()=>{u&&xe()}));function S(x){x.key==="Escape"&&u&&(x.preventDefault(),n())}document.addEventListener("keydown",S);function q(){if(u){if(r&&typeof r.snapshotFor=="function"){let x=r.snapshotFor("detail:"+u)||[];d=x.find(D=>D&&D.id===u)||x[0]||d}Ee(),xe()}}function X(x){tr(x).then(Z=>{Z?_e("\uBCF5\uC0AC\uB428","success",1200):_e("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ke(x){x.preventDefault(),x.stopPropagation(),u&&X(u)}function ve(x,Z){x.preventDefault(),x.stopPropagation(),X(Z)}function Me(x,Z,D){x.preventDefault(),x.stopPropagation(),ze.open(Z,{missing_state:D})}function De(x,Z){p[x]=Z,xe(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Uc(u,x,Z.length===0?null:Z))).catch(()=>{_e("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Rt(x,Z){let D=d||{},Ie=D.metadata&&typeof D.metadata=="object"?D.metadata:{},ut={};for(let nt of["impl_runtime","impl_model","impl_effort"])ut[nt]=Object.hasOwn(p,nt)?p[nt]:typeof Ie[nt]=="string"?Ie[nt]:"";ut[x]=Z;let it=ru(ut,kt(),Ke()),rt={};for(let nt of["impl_runtime","impl_model","impl_effort"])rt[nt]=p[nt],p[nt]=it[nt]||"";xe(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...it,orchestration_runtime:Ke()})).then(nt=>{let Lt=Array.isArray(nt)?nt[0]:nt;if(!Lt||typeof Lt!="object"||!Lt.id)throw new Error("implementation target readback failed");d=Lt;for(let Jt of["impl_runtime","impl_model","impl_effort"])delete p[Jt];xe()}).catch(()=>{for(let nt of["impl_runtime","impl_model","impl_effort"])rt[nt]===void 0?delete p[nt]:p[nt]=rt[nt];xe(),_e("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function at(x,Z,D){if(!s||!u)return!1;try{let Ie=await Promise.resolve(s(x,Z)),ut=Array.isArray(Ie)?Ie[0]:Ie;return ut&&typeof ut=="object"&&ut.id?(d=ut,!0):(_e(D,"error"),!1)}catch{return _e(D,"error"),!1}}function et(x){setTimeout(()=>{try{let Z=e.querySelector(x);Z&&typeof Z.focus=="function"&&Z.focus()}catch{}},0)}function Dt(){j=!0,U=d&&d.title||"",xe(),et('.detail-edit__input[data-edit="title"]')}function Ut(x){U=x.target.value}function Fe(){j=!1,U="",xe()}function Ft(){at("edit-text",{id:u,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(Z=>{Z&&(j=!1,U=""),xe()})}function It(){O=!0,b=d&&d.description||"",xe(),et('.detail-edit__textarea[data-edit="description"]')}function zt(x){b=x.target.value}function v(){O=!1,b="",xe()}function w(){at("edit-text",{id:u,field:"description",value:b},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(Z=>{Z&&(O=!1,b=""),xe()})}function R(x,Z,D,Ie){if(x.key==="Escape"){x.stopPropagation(),D();return}x.key==="Enter"&&(!Ie||x.ctrlKey||x.metaKey)&&(x.preventDefault(),Z())}function W(x){let Z=x.target.value;at("update-status",{id:u,status:Z},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>xe())}function be(x){let Z=Number(x.target.value);at("update-priority",{id:u,priority:Z},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>xe())}function we(x){F=x.target.value}function ge(){let x=F.trim();x.length!==0&&at("label-add",{id:u,label:x},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(Z=>{Z&&(F=""),xe()})}function tt(x){if(x.key==="Escape"){x.stopPropagation(),F="",xe();return}x.key==="Enter"&&(x.preventDefault(),ge())}function Re(x){at("label-remove",{id:u,label:x},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>xe())}let E={onCopyPath:ve,onOpenDoc:Me};function ie(x){return typeof x=="string"?x:x&&typeof x=="object"?String(x.id||x.to||x.issue_id||x.depends_on||""):""}function Ce(x){switch(x&&typeof x=="object"?String(x.dependency_type||x.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function ft(x){let D=(Array.isArray(x.dependencies)?x.dependencies:[]).map(Ie=>({id:ie(Ie),icon:Ce(Ie)})).filter(Ie=>Ie.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${D.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${D.map(Ie=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Ie.id)}
                  >
                    ${Ie.icon?`${Ie.icon} `:""}${Ie.id}
                  </button>`:l`<span class="detail-dep"
                    >${Ie.icon?`${Ie.icon} `:""}${Ie.id}</span
                  >`)}
          </div>`}
    `}function Mt(x){let Z=x.metadata||{},D=x.workflow||{},Ie=D.stages||{},ut=Ie.spec&&Ie.spec.stale,it=Ie.impl&&Ie.impl.stale,rt=Ie.plan||null,nt=D.route_source==="derived",Lt=D.route||Z.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${nt?" detail-kv__v--derived":""}"
          title=${nt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${nt?"unset":Lt}</span
        >
      </div>
      ${D.route!=="quick_fix"||Object.hasOwn(Z,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${Z.spec_review||"\uC5C6\uC74C"}${ut?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${D.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${rt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${rt?.approval_receipt||"\uC5C6\uC74C"}${rt?.approval_state==="stale"?" \xB7 stale":rt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${D.route!=="quick_fix"||Object.hasOwn(Z,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${Z.impl_review||"\uC5C6\uC74C"}${it?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${D.planned_execution?l`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${D.planned_execution.kind}</span>
            </div>
            ${D.planned_execution.kind==="main"?l`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${D.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${D.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Xr(D.exec_receipt)}</span
            >
          </div>`:""}
      ${D.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${D.impl_entry.actor}@${D.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${Z.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${Z.pr_url}</span>
          </div>`:""}
    `}let vt={route:["quick_fix","spec_backed","full_plan"]};async function Pt(x,Z){let D=Z.target.value;if(x==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&D!=="full_plan"&&!window.confirm(`full_plan \u2192 ${D||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){xe();return}await at("update-workflow-meta",{id:u,key:x,value:D},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),xe()}function f(x){let Z=x.metadata||{};return l` ${((Ie,ut)=>{let it=vt[Ie],rt=typeof Z[Ie]=="string"?Z[Ie]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${Ie}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Ie}
          data-edit=${`wfmeta-${Ie}`}
          @change=${nt=>Pt(Ie,nt)}
        >
          <option value="" ?selected=${!it.includes(rt)}>
            ${ut}
          </option>
          ${it.map(nt=>l`<option value=${nt} ?selected=${rt===nt}>${nt}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function $(x,Z){return j?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${Ut}
            @keydown=${D=>R(D,Ft,Fe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ft}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Fe}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${x}</h2>
        ${Wt(Z).map(D=>l`<span class="detail-usage-total" title=${D.tooltip}
              >${D.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Dt}
        >
          ✎
        </button>
      </div>
    `}function G(x){let Z=Ht(x.created_at),D=Ht(x.updated_at);return!Z&&!D?l``:l`
      ${Z?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${Z}</span>
          </div>`:""}
      ${D?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${D}</span>
          </div>`:""}
    `}function m(x,Z){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${W}
        >
          ${Wm.map(D=>l`<option value=${D} ?selected=${D===x}>${D}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${be}
        >
          ${zm.map(D=>l`<option value=${String(D)} ?selected=${D===Z}>
                P${D}
              </option>`)}
        </select>
      </div>
    `}function y(x){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${O?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${It}
            >
              ✎
            </button>`}
      </div>
      ${O?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${b}
              @input=${zt}
              @keydown=${Z=>R(Z,w,v,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${w}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${v}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${x||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ce(x){let Z=typeof x.notes=="string"?x.notes:"";return Z.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${Z}</div>
    `}function le(x){let Z=Array.isArray(x.labels)?x.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${Z.map(D=>l`<span class="detail-label-chip"
              >${D}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${D}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+D}
                @click=${()=>Re(D)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${F}
            @input=${we}
            @keydown=${tt}
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
    `}function je(){if(!u)return l``;let x=d||{},Z=String(x.id||u),D=x.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Ie=ae(),ut=x.status||"open",it=typeof x.priority=="number"?Math.max(0,Math.min(4,x.priority)):"",rt=x.description||"",nt={...x,metadata:{...x.metadata||{},...p}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>n()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${ke}
            >
              ${Z}
            </button>
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>n()}
            >
              ✕
            </button>
          </div>
          ${$(D,Ie)}
          ${Hc(nt)}
          ${zc({metadata:nt.metadata,workspace_values:gt(),catalog:kt(),execution_defaults:We(),expanded:L,presets:Ue()?.presets||[],preset_id:_,preset_busy:h,skipped_orchestration_keys:T},{onToggle:Lt=>{L=Lt,xe()},onEdit:(Lt,Jt)=>{if(Lt==="impl_runtime"||Lt==="impl_model"||Lt==="impl_effort"){Rt(Lt,Jt??"");return}De(Lt,Jt??"")},onPresetSelect:Lt=>{_=Lt,T=[],xe()},onPresetApply:()=>{A()}})}
          ${Xc({md:nt.metadata,catalog:V,handlers:{onExecChange:De}})}
          ${m(ut,it)} ${G(x)}
          ${y(rt)}
          ${Ic(he,Ne,{expanded:oe,draft:se,sending:Ae,error:te})}
          ${ce(x)} ${le(x)} ${ft(x)}
          ${Mt(x)} ${f(x)}
          ${Tc(x,E)}
          ${iu({expanded:Q,loading:Te,error:Ze,data:Ve},{onToggle:ne})}
          ${au(me(),yt,{total:Ie,expanded:qe})}
        </div>
      </div>
    `}function xe(){Ge(je(),e)}return{load(x){x!==u&&(p={},_="",T=[],L=!1,J(),re(),Pe(),ee()),u=x,d=null,q(),pt(),H!==x&&de(x)},clear(){u=null,d=null,p={},_="",h=!1,T=[],L=!1,J(),re(),Pe(),ee(),ze.close(),Y.close(),Ge(l``,e)},destroy(){M&&(M(),M=null),ue&&(ue(),ue=null),k&&(k(),k=null),document.removeEventListener("keydown",S),ze.destroy(),Oe.parentNode&&Oe.parentNode.removeChild(Oe),Y.destroy(),Ye.parentNode&&Ye.parentNode.removeChild(Ye),u=null,d=null,ee(),_="",h=!1,T=[],re(),Pe(),Ge(l``,e)}}}function cu(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,d,p="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=d||"An unrecoverable error occurred.");let _=typeof p=="string"?p.trim():"";if(s&&(_.length>0?(s.textContent=_,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function bo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ls(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function yo(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function vo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Hm(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:bo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function uu(e,t){let r=Hm(e,t);return r?l`<button
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
            title=${r.deploy.at?Ht(r.deploy.at):""}
            >${vo(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${ls(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function In(e){let t=ar(e.created_at),r=ar(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Gm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function cs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function wo(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function yr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,_)=>(p.requested_at||0)-(_.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?Gm(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:d}}function is(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return l`<div
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
  </div>`}var Vm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function du(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Vm[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function ko(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let r=t.pin===!0?" exec-chip--pin":"",n=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return l`${e.orchestration?l`<span
        class="exec-chip exec-chip--orch${r}"
        title=${`${e.orchestration.title}${n}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?l`<span
        class="exec-chip exec-chip--worker${r}"
        title=${`${e.worker.title}${n}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function $o(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],n=Array.isArray(e.warnings)?e.warnings:[];return t.length===0&&r.length===0&&n.length===0?"":l`<div class="worker-deps">
    ${t.map(s=>l`<span class="worker-dep worker-dep--pred" title=${s.title||""}
          ><span class="worker-dep__label">${s.label}</span
          ><button
            type="button"
            class="worker-dep__remove"
            data-blocker-id=${s.id}
            aria-label=${`\uC120\uD589 ${s.id} \uC5F0\uACB0 \uD574\uC81C`}
            title="선행 연결 해제"
          >
            ✕
          </button></span
        >`)}${r.map(s=>l`<span class="worker-dep worker-dep--succ" title=${s.title||""}
          >${s.label}</span
        >`)}${n.map(s=>l`<span class="worker-dep worker-dep--warn">${s}</span>`)}
  </div>`}function Km(e){let t=Array.isArray(e.badges)?e.badges:[],r=Wt(e.usage),n=$r(e.usage),s=ar(e.done_at);return l`<div
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
            title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
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
      ${r.length>0?r.map(o=>l`<span class="worker-usage" title=${o.tooltip}
                >${o.label}</span
              >`):n?l`<span class="worker-usage" title=${zn(e.usage)}
              >${n}</span
            >`:""}
      ${typeof e.work_ms=="number"?l`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${ls(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function nn(e){if(e.lane==="done"&&e.done_layout==="three_line")return Km(e);let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=Wt(e.usage),s=$r(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?ar(e.done_at):"",u=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",p=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",_=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",h=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,T=l`<span class="worker-mini__title">${e.title}</span>`,L=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",B=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",V=r.map(Ae=>Ae===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Ae}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Ae===e.completion_badge&&e.completion_title||""}
          >${Ae}</span
        >`),H=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",P=n.length>0?n.map(Ae=>l`<span class="worker-usage" title=${Ae.tooltip}
              >${Ae.label}</span
            >`):s?l`<span class="worker-usage" title=${zn(e.usage)}
            >${s}</span
          >`:"",j=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",O=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",U=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",b=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",F=e.discard,J=F?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${F?.attempt_id||""}
          data-operation-id=${F?.operation?.operation_id||""}
          data-discard-mode=${F?.confirmation||"unmerged"}
          ?disabled=${F?!F.enabled:e.discard_enabled===!1}
          title=${F?F.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${F?.label||"\uD3D0\uAE30"}
        </button>`:"",ee=e.stale_work||null,pe=ee?l`${ee.can_resume||ee.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ee.action_id}
            ?disabled=${ee.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ee.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ee.action_id}
            ?disabled=${ee.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ee.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ee.action_id}
            ?disabled=${ee.locked}
          >
            다시 확인
          </button>`:""}`:"",de=ee?l`<div class="worker-mini__stale">
        <strong>${ee.title}</strong>
        <span>${ee.summary}</span>
        <span>${ee.cause}</span>
        ${ee.can_backup_fresh?l`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",he=e.revise_action?l`<button
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
        </button>`:"",Se=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${ko(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",Le=$o(e.dependency_chips),te=is(e),se=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||F?.operation||e.revise_action||ee);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">${_}${h}${T}</div>
          <div class="worker-mini__row2">
            ${P}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${ls(e.work_ms)}</span
                >`:""}${V}${j}
            <span class="worker-mini__actions"
              >${O}${U}${b}${J}</span
            >
            ${In(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${u}${d}${_}${h}${L}${B}${V}${p}${H}
            </div>
            <div class="worker-mini__body">${T}${de}</div>
            ${Le}${Se}${se?l`<div class="worker-mini__foot">
                  ${P}${j}
                  <span class="worker-mini__actions"
                    >${O}${U}${b}${J}${he}${pe}</span
                  >
                  ${is(e)}
                </div>`:""}
            ${In(e)}`:l`<div class="worker-mini__line">
              ${u}${d}${_}${h}${T}${L}${B}${V}${p}${H}${P}${j}${O}${U}${b}${J}
            </div>
            ${Le}${Se}${te} ${In(e)}`}
  </div>`}function Ua(e,t=null,r={}){let n=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!n,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=a&&a.chips||{},c=i.route||a&&a.route,u=i.route_source==="derived"||!!(a&&a.route_source==="derived"),d=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),p=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),_=$o(e.dependency_chips);return l`<div
    class="worker-card${s?"":" worker-card--static"}${n?" worker-card--ineligible":""}"
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
      ${n?l`<span
            class="ctl-chip worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >⛔ worker-ineligible</span
          >`:""}
      ${a&&c?l`<span
            class="ctl-chip ctl-chip--route${u?" is-derived":""}"
            title=${u?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${u?"unset":c}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?vn(a,e.status):""}${_}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${ko(e.exec_chips,{pin:r.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?l`<div class="worker-card__place-menu">
            ${t.lanes.map(h=>l`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${h.id}
                  title="${h.label} 대기 맨 뒤에 추가"
                >
                  <span>${h.label}</span>
                  <span class="worker-card__place-count">${h.count}</span>
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
                  class="worker-card__reason${p?" worker-card__reason--danger":""}"
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
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":n?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":d?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${In(e)}
  </div>`}function cr(e){let t=!!e.collapsible&&!!e.collapsed,r=l`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Ua(n,e.place_menu):nn(n))}
          </div>`}
  </section>`}var pu={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},fu={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function _u(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Wa(e){for(let t of _u(e))if(Object.hasOwn(pu,t))return pu[t];return null}function za(e){let t=null;for(let r of _u(e))Object.hasOwn(fu,r)&&(t=fu[r]);return t}function xo(e){let t=Wa(e),r=za(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function mu(e,t){let r=Wa(e)??Wa(t),n=za(t)??za(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var gu=160;function Ym(e){return e.length>gu?`${e.slice(0,gu)}\u2026`:e}function Zm(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${Ym(e.command)}</code>`:""}
  </div>`}function Qm(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Xm(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function hu(e){let t=e.failure?xo(e.failure.reason):"";return l`<div class="worker-banners">
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
          ${Zm(e.failure.cause_detail)}
          ${Qm(e.failure.reason)}
          ${is({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Jm(e){return e?l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}function eg(e,t,r){if(!e)return"";let n=e.workflow||null,s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=Array.isArray(e.legs)?e.legs:[],c=i.filter(p=>p&&p.state==="live"),u=i.filter(p=>p&&p.state!=="live"),d=$o(e.dependency_chips);return l`${n?vn(n,"in_progress"):""}
  ${o?l`<div class="rtile__activity${r?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?l`<span class="rtile__activity-age"
              >${ar(a,t)}</span
            >`:""}
      </div>`:""}${c.length>0||u.length>0?l`<div class="rtile__legs">
        ${c.map(p=>l`<span class="rtile__leg rtile__leg--live"
              >⟳ ${p.label}</span
            >`)}${u.length>0?l`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(p=>p.label).join(", ")}`}
              >✓ ${u.length}</span
            >`:""}
      </div>`:""}${d}`}function Ha(e,t,r=null,n={}){let s=e.failed===!0,o=!!e.paused,a=s?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):o?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Xm(t-e.started_at):"\u2014",i=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,c=Bn(e),u=Wt(e.usage),d=$r(e.usage),p=e.conflict_resolution?o?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,h=e.landing,T=e.attempt_id&&e.attempt_id===r,L=n.monitor||null,B=Jm(L),V=eg(L,t,o),H=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${T?" rtile--sel":""}${o?" rtile--paused":""}${s?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${B}${c?l`<span class="rtile__resumed" title=${c}>↻</span>`:""}
      <span class="rtile__elapsed">${a}</span>
      ${s?l`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${H}
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
            ${o?l`<button
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
            ${H}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${V}${e.rollup?Us(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ra}):""}
    ${h?l`<div class="rtile__landing">
          <span
            class="merge-step${h.failed?" merge-step--failed":""}"
            style=${`--progress: ${h.percent}%`}
            >${h.label}${h.index>0?l`<span class="merge-step__n"
                  >${h.index}/${h.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${i||u.length>0||d||p||_?l`<div class="rtile__meta">
          ${p?l`<span class="worker-mini__badge">${p}</span>`:""}
          ${_?l`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${ko(e.exec_chips)}
          ${u.length>0?u.map(P=>l`<span class="worker-usage" title=${P.tooltip}
                    >${P.label}</span
                  >`):d?l`<span
                  class="worker-usage"
                  title=${zn(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${In(e)} ${is(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${s||o?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Ga(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Ha(s,t,r))}
  </div>`}var Va=new Set(["unavailable","not_applicable"]);function Dr(e,t){if(typeof e!="object"||e===null)return null;let r=e[t];return typeof r=="object"&&r!==null?r:null}function bu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Nr(e,t){return t===null?null:`${Pr[e]}: ${t.display} (${mo[t.source]})`}function Ka(e){return e.filter(t=>t!==null).join(`
`)}function Ao(e){if(typeof e!="object"||e===null)return null;let t=Jr(e);if(t==="")return null;let r=(n,s)=>typeof s=="string"&&s.length>0?`${n}: ${s}`:null;return{text:t,title:Ka(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",r("runner",e.runner),r(Pr.orchestration_model,e.model),r(Pr.orchestration_effort,e.effort),r(Pr.orchestration_speed,e.speed)])}}function sn(e,t){let r=Dr(e,"orchestration_model");if(r===null||r.resolution==="unavailable")return null;let n=Dr(e,"orchestration_effort"),s=Dr(e,"orchestration_speed"),o=bu([gr(t,r.value??""),r.display,n!==null&&n.value!==null?n.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Ka(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Nr("orchestration_model",r),Nr("orchestration_effort",n),Nr("orchestration_speed",s)])}}function tg(e,t){return e===null||e.value===null||Va.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function rg(e){return e===null||Va.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function ng(e){return e===null?null:e.value==="auto"?"auto":Va.has(e.resolution)?null:e.display}function qr(e,t){if(typeof e!="object"||e===null)return null;let r=Dr(e,"impl_dispatch"),n=Dr(e,"impl_runtime"),s=Dr(e,"impl_model"),o=Dr(e,"impl_effort"),a=Dr(e,"impl_speed"),i=r!==null&&r.value==="main"?"\uBA54\uC778":bu([tg(n,t??null),rg(s),ng(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Ka(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Nr("impl_dispatch",r),Nr("impl_runtime",n),Nr("impl_model",s),Nr("impl_effort",o),Nr("impl_speed",a)])}}var Xt="",sg=["impl_runtime","impl_model","impl_effort"],og=5,So=1;function Cr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Eo(e,t){let r=t.transport,n=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(I=>_e(I,"error",4e3)),o={},a={},i=[],c=!1,u=null,d={},p="",_="",h=!1,T=!1,L=!1,B=null,V=!1;function H(){let I=t.queue?t.queue():null;return Cr(I)?I:null}function P(){let I=H();return I?I.runner_catalog:null}function j(){let I=H();return I&&Cr(I.execution_defaults)?I.execution_defaults:null}function O(){let I=t.implPresetStore?.get();return Cr(I)&&Array.isArray(I.presets)?I:null}function U(){return n===null?{}:{root_dir:n}}async function b(I,ne){return V||!r?null:await r(I,ne)}function F(I){I&&Cr(I.queue)&&t.onQueueAdopt?.(I.queue)}async function J(I,ne){let me=H();if(!me||V)return null;let ae=await b(I,{...ne,...U(),expected_revision:me.revision});if(F(ae),n!==null&&ae&&ae.conflict){let qe=ae.queue&&typeof ae.queue.revision=="number"?ae.queue.revision:H()?.revision??me.revision;ae=await b(I,{...ne,...U(),expected_revision:qe}),F(ae)}return ae}async function ee(){c=!0,Pe();try{let I=await b("get-session-defaults",{...U()});o=Cr(I?.values)?{...I.values}:{},a={...o},i=Array.isArray(I?.warnings)?I.warnings:[]}catch(I){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}finally{c=!1,Pe()}}async function pe(){let I=Fc(o,a);if(Object.keys(I).length!==0){try{let ne=await b("set-session-defaults",{values:I,...U()});o=Cr(ne?.values)?{...ne.values}:{},a={...o},i=Array.isArray(ne?.warnings)?ne.warnings:[]}catch(ne){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}Pe()}}function de(I,ne){if(sg.includes(I)){Le(I,ne);return}ne===Xt?delete a[I]:a[I]=ne,Pe(),pe()}function he(){let I=Je().orchestration_model,ne=Qt({global:{orchestration_model:I??void 0},execution_defaults:j(),runner_catalog:P()}).orchestration_model.value;return ne?gr(P(),ne):null}function Se(I,ne){typeof ne=="string"&&ne.length>0?a[I]=ne:delete a[I]}function Le(I,ne){let me=ne===Xt?void 0:ne,ae=Nc({impl_runtime:I==="impl_runtime"?me:a.impl_runtime,impl_model:I==="impl_model"?me:a.impl_model,impl_effort:I==="impl_effort"?me:a.impl_effort},P(),he());Se("impl_runtime",ae.impl_runtime),Se("impl_model",ae.impl_model),Se("impl_effort",ae.impl_effort),Pe(),pe()}async function te(){let I=H();if(!I)return;let ne={orchestration_model:I.orchestration_model??null,orchestration_effort:I.orchestration_effort??null,orchestration_speed:I.orchestration_speed??null},me=jc(ne,{...ne,...d});if(Object.keys(me).length!==0){try{let ae=await J("worker-queue-set-orchestration-defaults",{values:me});if(ae&&ae.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}d={}}catch(ae){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ae instanceof Error?ae.message:String(ae)}`)}Pe()}}function se(I,ne){d[I]=ne===Xt?null:ne,Pe(),te()}function Ae(I){if(u=I,!I){Pe();return}let ne=P(),me=Je(),ae=me.orchestration_model;ae&&!os(ne,I).includes(ae)&&(d.orchestration_model=null,ae=null);let qe=me.orchestration_effort;qe&&!Da(ne,I,ae||nr).includes(qe)&&(d.orchestration_effort=null),Pe(),te()}async function N(I){if(!(!H()||I<So)){try{await J("worker-queue-set-slots",{slots:I})}catch(ne){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}Pe()}}async function oe(I){if(!(!H()||I<So||I>og)){try{await J("worker-queue-set-serial-lane-count",{count:I})}catch(ne){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}Pe()}}async function re(I,ne){let me=I==="auto_advance"?"worker-automation-toggle":I==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await J(me,{on:ne})}catch(ae){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ae instanceof Error?ae.message:String(ae)}`)}Pe()}function ye(){let I={},ne=Je();for(let me of uo){let ae=Tr.includes(me)?ne[me]:a[me];typeof ae=="string"&&ae.length>0&&(I[me]=ae)}return I}async function Ee(){let I=O();if(!I)return;let ne=ye();if(Object.keys(ne).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let me=(I.presets||[]).find(qe=>qe.id===p),ae=_.trim()||(me?me.name:"");if(!ae){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let qe=me?await b("impl-preset-update",{expected_revision:I.revision,id:me.id,name:ae,settings:ne}):await b("impl-preset-create",{expected_revision:I.revision,name:ae,settings:ne});if(qe&&qe.applied){if(_="",!me&&Array.isArray(qe.presets)){let Qe=qe.presets.find(ot=>ot.name===ae);p=Qe?Qe.id:p}Pe()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Pe()}catch(qe){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${qe instanceof Error?qe.message:String(qe)}`)}}async function C(){let I=O();if(!(!I||p.length===0))try{let ne=await b("impl-preset-delete",{expected_revision:I.revision,id:p});ne&&ne.applied?(p="",Pe()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Pe())}catch(ne){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}}function K(I){o=Cr(I.values)?{...I.values}:{},a={...o},i=Array.isArray(I.warnings)?I.warnings:[],Cr(I.queue)&&(t.onQueueAdopt?.(I.queue),d={})}async function $e(){let I=O(),ne=H();if(!I||!ne||p.length===0)return;let me=ae=>({preset_id:p,expected_revision:I.revision,expected_queue_revision:ae,...U()});try{let ae=await b("apply-impl-preset-global",me(ne.revision));if(ae&&ae.applied&&K(ae),n!==null&&ae&&ae.queue_applied===!1){let qe=ae.queue&&typeof ae.queue.revision=="number"?ae.queue.revision:H()?.revision??ne.revision;ae=await b("apply-impl-preset-global",me(qe)),ae&&ae.applied&&K(ae)}ae&&ae.applied?ae.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):ae&&ae.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(ae){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${ae instanceof Error?ae.message:String(ae)}`)}Pe()}async function Ne(){T=!0,L=!1,Pe();try{let I=await b("get-worker-system-prompt",{});!I||typeof I!="object"||Array.isArray(I)?L=!0:B=I}catch{L=!0}finally{T=!1,Pe()}}function Oe(){if(h=!h,h&&!B){Ne();return}Pe()}function ze(){let I=En({loading:T,error:L});if(I)return I;if(!B)return"";let ne=Array.isArray(B.variants)?B.variants:[];return l`<div class="settings-dialog__sp-body">
      ${B.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${B.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${ne.map(me=>l`<div class="settings-dialog__sp-variant" data-variant=${me.key}>
            <div class="settings-dialog__sp-cond">${me.condition}</div>
            ${Er(me.label,me.system_prompt)}
          </div>`)}
    </div>`}function Ye(){return l`<section
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
        aria-expanded=${h?"true":"false"}
        @click=${Oe}
      >
        ${h?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${h?ze():""}
    </section>`}function Y(I,ne,me,ae,qe,Qe,ot){let Xe=qe[I]??Xt,dt=Na(I,me,qe,j(),P(),ot),yt=dt.options.find(pt=>pt.value===Xe),gt=Xe===Xt?dt.full_value:yt?.full_value;return l`<select
        class=${Xe===Xt?"settings-dialog__unset":""}
        data-key=${I}
        aria-label=${ne}
        title=${gt||""}
        ?disabled=${Qe===!0||dt.disabled}
        .value=${rn(String(Xe))}
        @change=${pt=>ae(I,String(pt.target.value))}
      >
        <option value=${Xt} ?selected=${Xe===Xt}>
          ${dt.unset_label}
        </option>
        ${dt.options.map(pt=>l`<option
              value=${pt.value}
              title=${pt.full_value||""}
              ?selected=${pt.value===Xe}
            >
              ${pt.label}
            </option>`)}
      </select>
      ${Xe===Xt?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Q(I,ne,me,ae,qe,Qe=!1,ot){return l`<div
      class=${`settings-dialog__row${Qe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${ne}</span>
      <span class="settings-dialog__controls">
        ${Y(I,ne,me,ae,qe,Qe,ot)}
      </span>
    </div>`}function Te(I,ne,me,ae,qe){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${ne}-on)`}
        ></i>
        ${I}
      </span>
      <span class="settings-dialog__controls">
        ${Y(me,`${I} \uBAA8\uB378`,ae,de,a,!1)}
        ${Y(qe,`${I} effort`,_o,de,a,!1)}
      </span>
    </div>`}function Ze(I,ne,me,ae){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ne}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${ae?" is-on":""}`}
          data-automation=${I}
          aria-pressed=${ae?"true":"false"}
          aria-label=${ne}
          @click=${()=>re(I,!ae)}
        >
          ${ae?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${me}</span>
      </span>
    </div>`}function Ve(I,ne,me,ae){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ne}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${I}>
          <button
            type="button"
            aria-label=${`${ne} \uAC10\uC18C`}
            @click=${()=>ae(me-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${me}</span>
          <button
            type="button"
            aria-label=${`${ne} \uC99D\uAC00`}
            @click=${()=>ae(me+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function st(I){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${I.rows.length>0?`\uBCC0\uACBD ${I.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${I.rows.map(ne=>l`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${ne.kind}
          >
            <span class="settings-dialog__preset-diff-label">${ne.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${ne.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${ne.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${I.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${I.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Je(){let I=H(),ne={};for(let me of Tr)ne[me]=Object.prototype.hasOwnProperty.call(d,me)?d[me]:I&&typeof I[me]=="string"?I[me]:null;return ne}function mt(){let I=P(),ne=a.impl_runtime,me=a.impl_model,ae=O(),qe=H(),Qe=Je(),ot=os(I,u),Xe=Cn(I,void 0).filter(Ue=>Ue!==nr),dt=Da(I,u,Qe.orchestration_model||nr).filter(Ue=>Ue!==nr),yt=p?(ae?.presets||[]).find(Ue=>Ue.id===p):null,gt=yt?qc(ye(),Cr(yt.settings)?yt.settings:{}):null,pt=qe&&typeof qe.slots=="number"?qe.slots:So+1,kt=qe&&typeof qe.serial_lane_count=="number"?qe.serial_lane_count:So,We=j()?.supported===!0,Ke=Na("workflow_mode",ns,a,j(),I);return l`
      ${i.length>0?l`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${We?"":l`<div
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
                .value=${rn(p)}
                @change=${Ue=>{p=String(Ue.target.value),Pe()}}
              >
                <option value="" ?selected=${p===""}>
                  실행 프리셋…
                </option>
                ${(ae?.presets||[]).map(Ue=>l`<option
                      value=${Ue.id}
                      ?selected=${Ue.id===p}
                    >
                      ${Ue.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!gt||gt.rows.length===0}
                @click=${$e}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${p?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${rn(_)}
                @input=${Ue=>{_=String(Ue.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${p?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Ee}
              >
                ${p?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${p.length===0}
                @click=${C}
              >
                삭제
              </button>
            </div>
            ${gt?st(gt):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${rn(u||Xt)}
                    @change=${Ue=>{let ct=String(Ue.target.value);Ae(ct===Xt?null:ct)}}
                  >
                    <option value=${Xt} ?selected=${!u}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${u==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${u==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Q("orchestration_model","\uBAA8\uB378",ot,se,Qe)}
              ${Q("orchestration_effort","effort",dt,se,Qe)}
              ${Q("orchestration_speed","\uC18D\uB3C4",rs,se,Qe)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Xt}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>de("workflow_mode",Xt)}
                    >
                      ${Ke.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${ns.map(Ue=>l`<button
                          type="button"
                          data-mode=${Ue}
                          aria-pressed=${String(a.workflow_mode===Ue)}
                          @click=${()=>de("workflow_mode",Ue)}
                        >
                          ${Ue}
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
              ${Te("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ss,"spec_review_effort")}
              ${Te("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",fo,"plan_review_effort")}
              ${Te("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ss,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Q("impl_runtime","\uC704\uC784 \uB300\uC0C1",po,de,a)}
              ${Q("impl_model","\uBAA8\uB378",Cn(I,ne),de,a)}
              ${Q("impl_effort","effort",Rn(I,ne,me),de,a)}
              ${Q("impl_speed","\uC18D\uB3C4",rs,de,a)}
              ${Q("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Xe,de,a,!1,{...a,...Qe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Ze("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",qe?.auto_advance===!0)}
              ${Ze("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",qe?.auto_merge===!0)}
              ${Ze("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",qe?.auto_repair===!0)}
              ${Ve("slots","\uB3D9\uC2DC \uC2E4\uD589",pt,Ue=>N(Ue))}
              ${Ve("serial-lane-count","\uC9C1\uB82C \uB808\uC778",kt,Ue=>oe(Ue))}
            </div>
            ${Ye()}
          `}
    `}function Pe(){V||Ge(mt(),e)}return{load(){return d={},ee()},render:Pe,sessionDraft:()=>({...a}),destroy(){V=!0,Ge(l``,e)}}}function us(e){return l`<svg
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
  </svg>`}function yu(){return us(mn`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function vu(){return us(mn`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function wu(){return us(mn`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ku(){return us(mn`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function $u(){return us(mn`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function xu(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Au(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Wt(Vs(t));let r={};for(let i of kr)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let d of kr){let p=c[d];typeof p=="number"&&Number.isFinite(p)&&(r[d]+=p,n=!0,u=!0)}if(u){o+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?$r(r):null}function hr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function To(e,t){let r=hr(e?.counts)?e.counts:null,n=r?r[t]:null;return typeof n=="number"&&Number.isFinite(n)?n:0}function ag(e,t){if(!hr(t))return e;let r={...e};for(let[n,s]of Object.entries(t))s!==void 0&&(r[n]=s);return r}function ig(e){if(!hr(e)||!hr(e.execution_defaults)||!hr(e.runner_catalog)||!hr(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let r=Qt({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),n=gr(e.runner_catalog,r.orchestration_model.value??""),s=sn(r,e.runner_catalog),o=qr(r,n);return s===null&&o===null?null:{orchestration:s,worker:o}}function Su(e,t){let r=t.notify||(N=>_e(N,"error",4e3)),n=document.createElement("div");n.className="mon2-deck__main",e.appendChild(n);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let u=null,d=null,p=null,_=new Map;function h(){let N=t.workspacesState?t.workspacesState():[];return Array.isArray(N)?N.filter(oe=>hr(oe)):[]}function T(N){return h().find(oe=>oe.root_dir===N)||null}function L(N){return ag(T(N),_.get(N))}function B(){for(let N of h()){let oe=_.get(N.root_dir);oe&&typeof oe.revision=="number"&&typeof N.revision=="number"&&N.revision>=oe.revision&&_.delete(N.root_dir)}}async function V(N,oe,re){let ye=t.transport,Ee=L(oe);if(!(!ye||!hr(Ee))){try{let C=await ye(N,{...re,root_dir:oe,expected_revision:Ee.revision});if(hr(C?.queue)&&_.set(oe,C.queue),C&&C.conflict){let K=hr(C.queue)&&typeof C.queue.revision=="number"?C.queue.revision:L(oe)?.revision;C=await ye(N,{...re,root_dir:oe,expected_revision:K}),hr(C?.queue)&&_.set(oe,C.queue)}}catch(C){r(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}te()}}function H(N){u!==N&&(u=N,t.onFocusChange?.(u),te())}function P(N){H(u===N?null:N)}function j(N){if(d===N){U();return}O(),d=N;let oe=T(N);a.textContent=`${oe?.name||N} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,p=Eo(c,{root_dir:N,queue:()=>L(N),transport:t.transport,implPresetStore:t.implPresetStore,notify:r,onQueueAdopt:re=>{_.set(N,re),te()}}),p.load(),te()}function O(){p?.destroy(),p=null}function U(N){O(),d=null,s.hidden=!0,a.textContent="",N!==!0&&te()}let b=()=>U();i.addEventListener("click",b);function F(N){N.key==="Escape"&&u!==null&&H(null)}document.addEventListener("keydown",F);function J(N,oe){let re=Math.max(oe,N,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${oe}\uAC1C \uC911 ${N}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:re},(ye,Ee)=>Ee<N?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function ee(N){let oe=N.auto_advance===!0,re=N.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${oe?" is-on":""}`}
        data-act="auto"
        aria-pressed=${oe?"true":"false"}
        aria-label=${`${N.name} \uC790\uB3D9\uD654`}
        title=${oe?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${oe?vu():yu()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${re?" is-on":""}`}
        data-act="merge"
        aria-pressed=${re?"true":"false"}
        aria-label=${`${N.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${re?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${wu()}
        <span class="mon2-deck__op-label">머지</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===N.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===N.root_dir?"true":"false"}
        aria-label=${`${N.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${$u()}
      </button>`}function pe(N){let oe=ig(N);return oe?l`<div class="mon2-deck__chips">
      ${oe.orchestration?l`<span class="mon2-deck__chip" title=${oe.orchestration.title}
            >오케 ${oe.orchestration.text}</span
          >`:""}
      ${oe.worker?l`<span class="mon2-deck__chip" title=${oe.worker.title}
            >워커 ${oe.worker.text}</span
          >`:""}
    </div>`:""}function de(N){let oe=To(N,"running"),re=typeof N.slots=="number"?N.slots:1;return l`<div
      class=${`mon2-deck__tile${u===N.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${N.root_dir}
      aria-pressed=${u===N.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${N.root_dir}>${N.name}</span>
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
        ${ku()} ${J(oe,re)}
        <span class="mon2-deck__counts"
          >${oe}/${re} 실행 · 대기 ${To(N,"queue")} · PR
          ${To(N,"pr_wait")}</span
        >
      </div>
      <div class="mon2-deck__ops">${ee(N)}</div>
      ${pe(N)}
    </div>`}function he(N){let oe=t.doneItems?t.doneItems():[],re=t.rangeLabel?t.rangeLabel():"",ye=Au(Array.isArray(oe)?oe:[]),Ee=C=>N.reduce((K,$e)=>K+To($e,C),0);return l`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${N.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${re}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${Ee("running")} · 대기 ${Ee("queue")} · PR ${Ee("pr_wait")} ·
        ${re} 완료 ${Array.isArray(oe)?oe.length:0}
      </div>
      ${ye===null?"":l`<div class="mon2-deck__total-tokens">
            ${typeof ye=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${xu(re)}
                  >τ ${ye}</span
                >`:ye.map(C=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${C.provider}
                      title=${C.tooltip}
                      >τ ${C.label}</span
                    >`)}
          </div>`}
    </div>`}function Se(){let N=h();return N.length===0?"":l`<div class="mon2-deck__row">
      ${he(N)}
      <div class="mon2-deck__strip">
        ${N.map(oe=>de(oe))}
      </div>
    </div>`}function Le(){u!==null&&!T(u)&&(u=null,t.onFocusChange?.(null))}function te(){B(),Le(),d!==null&&!T(d)&&U(!0),Ge(Se(),n),p?.render()}function se(N){let oe=N.target;if(!oe||typeof oe.closest!="function")return;let re=oe.closest("[data-root-dir]");if(!re)return;let ye=re.getAttribute("data-root-dir")||"",Ee=oe.closest("[data-act]")?.getAttribute("data-act");if(Ee==="worker"){t.gotoWorkerTab?.(ye);return}if(Ee==="auto"){V("worker-automation-toggle",ye,{on:L(ye)?.auto_advance!==!0});return}if(Ee==="merge"){V("worker-merge-auto-toggle",ye,{on:L(ye)?.auto_merge!==!0});return}if(Ee==="gear"){j(ye);return}P(ye)}function Ae(N){if(N.key!=="Enter"&&N.key!==" ")return;let oe=N.target;if(!oe||typeof oe.closest!="function")return;let re=oe.closest('[data-root-dir][role="button"]');!re||re!==oe||(N.preventDefault(),P(re.getAttribute("data-root-dir")||""))}return n.addEventListener("click",se),n.addEventListener("keydown",Ae),{render:te,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",F),n.removeEventListener("click",se),n.removeEventListener("keydown",Ae),i.removeEventListener("click",b),O(),Ge(l``,n),e.replaceChildren()}}}var lg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",cg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694";function Ya(e,t){return`${e}\0${t}`}function ug(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function dg(e){let t=new Map;for(let[r,n]of e)t.set(r,n.slice());return t}function pg(e,t,r){let n=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===r)return!0;n.has(a)||(n.add(a),s.push(a))}}return!1}function fg(e,t){let r=new Set(t),n=new Map,s=new Map;for(let i of r){let c=Array.from(new Set((e.get(i)||[]).filter(u=>u!==i&&r.has(u))));n.set(i,c.length);for(let u of c){let d=s.get(u);d?d.push(i):s.set(u,[i])}}let o=[],a=Array.from(r).filter(i=>n.get(i)===0).sort();for(;a.length>0;){let i=a.shift();o.push(i);for(let c of(s.get(i)||[]).slice().sort()){let u=(n.get(c)||0)-1;n.set(c,u),u===0&&a.push(c)}}for(let i of t)o.includes(i)||o.push(i);return o}function _g(e,t){let r=new Set;for(let[a,i]of t)for(let c of i)r.add(Ya(a,c));let n=new Map,s=new Map;for(let a of e){let i=Ya(a.a,a.b);n.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Ya(a.a,a.b);n.get(i)===a&&s.get(i)!==r.has(i)&&o.push(a)}return o}function mg(e,t,r){let n=e.parallel_rows,s=Math.max(0,Math.min(n.length,r)),o=n[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(n[a].root_dir===t)return n[a].queue_index+1;for(let a=s;a<n.length;a++)if(n[a].root_dir===t)return n[a].queue_index;return e.parallel_raw_length.get(t)??0}function gg(e,t){return e.parallel_rows.some(r=>r.root_dir===t)}function Za(e,t,r,n){return{type:"worker-queue-place",payload:{bead_id:e,...n?{lane:n}:{},index:r},root_dir:t}}function Eu(e,t,r){let n=dg(r.blocked_by_map),s=[],o=null,a=h=>{let T=r.owner_of.get(h);return typeof T!="string"||T.length===0?(o=ug(h),null):T},i=(h,T)=>{if(o!==null||h===T)return;let L=n.get(h)||[];if(!L.includes(T))return;let B=a(h);B!==null&&(n.set(h,L.filter(V=>V!==T)),s.push({type:"dep-remove",a:h,b:T,root_dir:B}))},c=(h,T)=>{if(o!==null||h===T)return;let L=n.get(h)||[];if(L.includes(T))return;let B=a(h);if(B!==null){if(pg(n,T,h)){o=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${h}\uAC00 \uC774\uBBF8 ${T}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}n.set(h,[...L,T]),s.push({type:"dep-add",a:h,b:T,root_dir:B})}},u=()=>{let h=r.lane_order.get(e.lane_id||"")||[],T=new Set(h),L=(n.get(e.bead_id)||[]).filter(V=>T.has(V)),B=h.filter(V=>(n.get(V)||[]).includes(e.bead_id));for(let V of L)i(e.bead_id,V);for(let V of B)i(V,e.bead_id);for(let V of L)for(let H of B)c(H,V);return h.filter(V=>V!==e.bead_id)},d=(h,T)=>{let L=r.lane_order.get(h)||[],B=L.indexOf(e.bead_id),V=fg(n,L.filter(O=>O!==e.bead_id)),H=h.startsWith("pending:")?V.length:Math.max(0,Math.min(V.length,B>=0&&T>B?T-1:T)),P=H>0?V[H-1]:null,j=H<V.length?V[H]:null;if(P===null){j!==null&&c(j,e.bead_id);return}c(e.bead_id,P),j!==null&&(n.get(j)||[]).includes(P)&&(i(j,P),c(j,e.bead_id))},p=typeof e.queue_index=="number"?e.queue_index:r.queue_index_of.get(e.bead_id);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:lg};if(t.kind==="chain"&&e.kind==="repo-serial")return{refused:cg};if(e.kind==="chain"&&u(),t.kind==="chain"&&d(t.lane_id,t.marker_index),o!==null)return{refused:o};let _=[];if(t.kind==="candidate")e.kind!=="candidate"&&_.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let h=mg(r,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")_.push(Za(e.bead_id,e.root_dir,h));else if(e.kind==="parallel"){let T=r.parallel_rows,L=T[Math.max(0,Math.min(T.length,t.marker_index))];if(!(!!L&&L.bead_id===e.bead_id)&&gg(r,e.root_dir)&&p!==void 0){let V=p>h?h:h-1;V>=0&&V!==p&&_.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:V},root_dir:e.root_dir})}}}else if(t.kind==="chain")e.kind==="candidate"&&_.push(Za(e.bead_id,e.root_dir,r.parallel_raw_length.get(e.root_dir)??0));else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(p!==void 0&&t.index!==p){let h=p>t.index?t.index:t.index-1;h>=0&&h!==p&&_.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:h},root_dir:e.root_dir})}}else _.push(Za(e.bead_id,e.root_dir,t.index,t.lane_id));return{ops:[..._g(s,r.blocked_by_map),..._]}}var Tu={running:3,paused:2,failed:1};function Cu(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),p=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!p&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=Tu[u.run_state],p=Tu[i];if(d>p||d===p&&(u.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:n}}var Ru=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],ds=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Co(e,t){let r=Ru.find(s=>s.step===e);if(!r)return null;let n=Ru.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Iu(e){let t=ds.findIndex(r=>r.step===e);return ds.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function on(e){let t=ds.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function hg(e){let t=ds.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:ds.length}}function Ro(e){let t=hg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Xa=new Set(["queued","running","retry_pending","repairing"]),Lu=new Set(["failed","succeeded"]),bg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},ps={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},yg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:ps.base_containment,child_sweep:ps.child_sweep,branch_cleanup:ps.branch_cleanup,parent_close:ps.parent_close};function vg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function wg(e,t,r){return!["verify","deploy"].includes(e.kind)||![...Xa,...Lu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function kg(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=u=>u.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function Qa(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=bg[s];if(!o)return null;let a=Co(r,`${n} ${o}`);return a?{...a,active:Xa.has(s),failed:s==="failed"}:null}function $g(e){return!e||typeof e!="object"?null:yg[e.step]||null}function fs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=$g(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=vg(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(T=>T&&typeof T=="object"&&wg(T,t,i)).sort(kg):[],u=a?c:[],d=u.find(T=>Xa.has(T.state));if(d)return Qa(d);if(s)return s.step==="repo_operations"&&c[0]?Qa(c[0],!0):null;let p=u.find(T=>Lu.has(T.state)?T.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return Qa(p);if(n){let T=Co(n.step,n.label);return T?{...T,active:!0,failed:!1}:null}let _=typeof e.cleanup_cursor=="string"?ps[e.cleanup_cursor]:null;if(!_)return null;let h=Co(_.step,_.label);return h?{...h,active:!0,failed:!1}:null}function Io(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function Ja(e,t){return`${e}\0${t}`}function Ou(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function ei(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function xg(e,t){return e==="internal"&&t===void 0}function Ln(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Mu(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Ln(s)})`,location_label:Ln(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=ei(e,n),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:xg(a,s)}}function Pu(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Ja(i.root_dir,c.id);r.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(u,[]);for(let d of Array.isArray(c.items)?c.items:[])n.set(d.id,u)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Ja(i.root_dir,c.id),d=Array.isArray(c.items)?c.items[0]:null,_=!!d&&d.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],h=s.get(u);if(h)for(let T of _){let L=n.get(T);L&&L!==u&&!h.includes(L)&&h.push(L)}}let o=(i,c)=>{let u=new Set,d=[i];for(;d.length>0;){let p=d.pop();if(p===c)return!0;!p||u.has(p)||(u.add(p),d.push(...s.get(p)||[]))}return!1},a=new Map;for(let[i,c]of s){let u=[];for(let d of c){let p=r.get(d);o(d,i)&&p&&u.push(p)}u.length>0&&a.set(i,u)}return a}function Du(e,t){return Ja(e,t)}var Nu=1,_s=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],ti=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],On={show_blocked:!0,spec:"all"},qu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Ag(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Sg(e,t){let{winners:r,resumed_from_ids:n}=Cu(e,t),s=new Map;for(let[o,a]of r){let i=a.attempt,c=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:ir(e,i.bead_id),can_pause:c==="running"&&d,can_resume:c!=="running"&&d&&!n.has(i.attempt_id)})}return s}function Fu(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Et(e){return e&&typeof e=="object"?e:{}}function Eg(e,t,r){let n=Et(t);if(Object.keys(n).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=_=>Qt({pin:_,global:a,execution_defaults:s,runner_catalog:o,route:r}),c,u;try{c=i(n),u=i(null)}catch{return null}let d=ju(sn(c,o),sn(u,o)),p=ju(qr(c,null),qr(u,null));return d||p?{orchestration:d,worker:p}:null}function ju(e,t){return!e||t&&t.text===e.text?null:e}function Tg(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function Cg(e,t){let r=t.get(e);return r?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${Ln(r)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function Rg(e,t,r){let n=new Map;for(let c of e)n.set(c,Array.from(r.get(c)||[]).filter(u=>e.includes(u)).length);let s=[],o=new Map,a=e.filter(c=>(n.get(c)||0)===0).sort();for(let c of a)o.set(c,0);let i=[...a];for(;i.length>0;){let c=i.shift();s.push(c);let u=Array.from(t.get(c)||[]).filter(p=>e.includes(p)).sort(),d=(o.get(c)||0)+(u.length>1?1:0);for(let p of u){let _=(n.get(p)||0)-1;n.set(p,_);let h=o.get(p);o.set(p,h===void 0?d:Math.min(h,d)),_===0&&i.push(p)}}return{order:s,indent:o,cycle:s.length!==e.length}}function Ig(e,t,r){let n=new Map,s=new Map,o=new Set,a=(u,d,p)=>{let _=u.get(d);_?_.add(p):u.set(d,new Set([p]))};for(let[u,d]of e)for(let p of d)p!==u&&(o.add(p),o.add(u),a(n,p,u),a(s,u,p));let i=new Set,c=[];for(let u of Array.from(o).sort()){if(i.has(u))continue;let d=[],p=[u];for(i.add(u);p.length>0;){let H=p.pop();d.push(H);for(let P of[...n.get(H)||[],...s.get(H)||[]])i.has(P)||(i.add(P),p.push(P))}if(d.length<2)continue;let _=d.map(H=>t.get(H));if(_.every(H=>!!H&&/^s[1-5]$/.test(H.lane||""))&&_.every(H=>H&&_[0]&&H.root_dir===_[0].root_dir&&H.lane===_[0].lane))continue;let{order:T,indent:L,cycle:B}=Rg(d.slice().sort(),n,s),V=B?d.slice().sort():T;c.push({key:d.slice().sort().join("\0"),cycle:B,nodes:V.map(H=>{let P=t.get(H);return{id:H,workspace_name:P?P.workspace_name:"",root_dir:P?P.root_dir:"",location_label:P?Ln(P):Uu(H,r),indent:B?0:L.get(H)||0}})})}return c}function Uu(e,t){let r=ei(e,t);return r==="internal"?"\uBBF8\uC801\uC7AC":r==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Lg(e,t,r){let n=t.get(e);if(!n)return Uu(e,r);if(typeof n.position=="number"){if(n.lane==="parallel")return`#${n.position}`;if(/^s[1-5]$/.test(n.lane))return`${n.lane} #${n.position}`}return Ln(n)}function Og(e,t,r){let n=[];for(let s of r.get(e)||[])s!==e&&t.has(s)&&!n.includes(s)&&n.push(s);return n}function Mg(e,t,r,n,s,o){let a=(d,p,_,h,T=!1)=>{let L=n.get(d),B=L&&L.lane==="parallel"&&typeof L.position=="number"?L.position-1:null;return{id:d,title:o.get(d)||d,root_dir:L?L.root_dir:"",workspace_name:L?L.workspace_name:"",seq:p,indent:_,predecessors:h,location_label:Lg(d,n,s),draggable:!T&&B!==null,...B!==null?{queue_index:B}:{}}},i=[];for(let d of e.slice().sort((p,_)=>p.key<_.key?-1:1)){let p=new Set(d.nodes.map(_=>_.id));i.push({lane_id:`chain:${d.key}`,label:"",pending:!1,cycle:d.cycle,rows:d.nodes.map((_,h)=>a(_.id,h+1,d.cycle?0:_.indent,d.cycle?[]:Og(_.id,p,r),d.cycle))})}let c=new Set;for(let d of i)for(let p of d.rows)c.add(p.id);let u=[];return t.forEach((d,p)=>{let _=d&&typeof d.seed=="string"&&d.seed.length>0?d.seed:null;_!==null&&c.has(_)||(u.push(p),i.push({lane_id:`pending:${p}`,label:"",pending:!0,cycle:!1,rows:_===null?[]:[a(_,1,0,[])]}))}),i.forEach((d,p)=>{d.label=`\uC5F0\uACB0 ${p+1} \xB7 \uB808\uD3EC \uAC04`}),{chain_lanes:i,pending_lanes_kept:u}}function Bu(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ri(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a={...On,...r&&r.candidate_filter?r.candidate_filter:{}},i=r&&_s.some(C=>C.value===r.candidate_sort)?r.candidate_sort:"repo_spec",c=new Map;for(let C of s)C&&typeof C.root_dir=="string"&&c.set(C.root_dir,C);let u=[],d=[],p=[],_=[],h=[],T=[],L=new Map,B=new Map,V=new Map,H=new Map,P=new Map,j=new Map;for(let C of n){if(!C||typeof C.root_dir!="string")continue;let K=C.root_dir,$e=C.name||K,Ne=c.get(K),Oe=Ne&&typeof Ne.revision=="number"?Ne.revision:typeof C.revision=="number"?C.revision:0,ze=Et(C.attempts),Ye=Et(C.bead_titles);for(let[A,M]of Object.entries(Ye))typeof M=="string"&&M.length>0&&j.set(A,M);let Y=Et(C.bead_times),Q=Et(C.pr_observations),Te=Et(C.admission),Ze=Et(C.revise_parked),Ve=Et(C.merge_queue_state),st=Et(C.cleanup_failed),Je=Et(C.discard_operations),mt=Et(C.bead_blocked_by),Pe=Et(C.bead_workflow),I=Et(C.pr_activity),ne=Array.isArray(C.repo_operations)?C.repo_operations:[],me=Array.isArray(C.merge_queue)?C.merge_queue:[],ae=new Set(me.filter(A=>A&&typeof A.bead_id=="string").map(A=>A.bead_id)),qe=new Map(me.filter(A=>A&&typeof A.bead_id=="string").map(A=>[A.bead_id,A])),Qe=Array.isArray(C.queue)?C.queue:[],ot=(Array.isArray(C.serial_lanes)?C.serial_lanes:[]).filter(A=>A&&/^s[1-5]$/.test(A.id)&&Array.isArray(A.entries)),Xe=Et(C.lane_states),dt=typeof C.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(C.serial_lane_count))):Math.min(5,ot.length);V.set(K,dt),H.set(K,Qe.length);let yt=new Map(ot.map(A=>[A.id,A])),gt=new Map;for(let A of ot)for(let M of A.entries)M&&typeof M.bead_id=="string"&&gt.set(M.bead_id,A.id);for(let[A,M]of Object.entries(mt))Array.isArray(M)&&P.set(A,M.filter(ue=>typeof ue=="string"&&ue.length>0));let pt=Array.isArray(C.done)?C.done:[];for(let A of pt)A&&typeof A.bead_id=="string"&&T.push({id:A.bead_id,root_dir:K,workspace_name:$e});let kt=new Map;for(let A of pt)A&&typeof A.bead_id=="string"&&typeof A.added_at=="number"&&kt.set(A.bead_id,A.added_at);let We=A=>({id:A,title:Ye[A]||A,root_dir:K,workspace_name:$e,expected_revision:Oe,draggable:!1,...Et(Y[A]).created_at?{created_at:Et(Y[A]).created_at}:{},...Et(Y[A]).updated_at?{updated_at:Et(Y[A]).updated_at}:{}}),Ke=new Set;for(let[A,M]of Sg(ze,kt))Ke.add(A),d.push({...We(A),lane:"running",...gt.has(A)?{serial_lane_id:gt.get(A)}:{},attempt_id:M.attempt_id,run_state:M.run_state,status:M.status||void 0,workflow:Pe[A]||null,can_pause:M.can_pause,can_resume:M.can_resume,started_at:M.started_at,last_event_at:M.last_event_at,last_activity:M.last_activity,legs:M.legs,runner:M.runner,model:M.model,effort:M.effort,speed:M.speed,resumed_from:M.resumed_from,continuation_mode:M.continuation_mode,usage:M.usage,exec_chips:{orchestration:Ao(M),worker:null},discard:yr(Je,A,{attempt_id:M.attempt_id}),badges:M.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:M.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:M.run_state==="failed"});for(let A of Array.isArray(C.pr_wait)?C.pr_wait:[]){let M=A&&A.bead_id;if(typeof M!="string"||Ke.has(M))continue;Ke.add(M);let ue=Et(Q[M]),k=Et(ue.pr),S=ue.gate?Et(ue.gate):null,q=ae.has(M),X=qe.get(M)?.continuation_action||null,ke=!!X&&X.continuation===null,ve=Ve.active===M,Me=A.external===!0,De=st[M]||null,Rt=Et(I[M]),at=fs({bead_id:M,merge_sha:A.merge_sha,cleanup_cursor:A.cleanup_cursor,merge_progress:Rt.merge_progress||null,cleanup_failed:De,repo_operations:ne}),et=Io(at),Dt=!!S&&S.base_badge==="\uCDA9\uB3CC",Ut=!!De&&["child_sweep","branch_cleanup","parent_close"].includes(De.step)&&!!S&&S.tier==="merged",Fe=Me&&!!De&&!!S&&S.tier==="merged",Ft=!!S&&["closed_unmerged","review","undecidable"].includes(S.tier),It=yr(Je,M,{external:Me,merge_active:ve||at?.step==="merge",merge_queued:q,cleanup_active:et,merged:!!De||S?.tier==="merged"}),zt=!!It.operation;p.push({...We(M),lane:"pr_wait",pr_number:typeof k.number=="number"?k.number:null,pr_url:typeof k.url=="string"?k.url:void 0,external:Me,usage:ir(ze,M),merge_step:at,badges:ke?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:at?[S?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:De?[on(De.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${on(De.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof S?.gate_badge=="string"&&S.gate_badge.length>0?[S.gate_badge]:[],alert:at?at.failed===!0:!!De||Ft,reason:De&&at?.active!==!0?Ro(De.step):"PR \uB300\uAE30",merge_action:S?.tier==="merged"&&!Ut&&!Fe?!1:!q||ke,merge_enabled:!zt&&(ke||S?.enabled===!0||Dt||Ut||Fe),merge_label:ke?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Fe||Ut?"\uC815\uB9AC \uC7AC\uAC1C":Dt&&!Ut?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ke?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":zt?It.error?`\uD3D0\uAE30 \uC2E4\uD328: ${It.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${It.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ut?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Dt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.enabled===!0?`\uBA38\uC9C0 (${S.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${S?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:q&&!ke,cancel_enabled:!ve,continuation_mismatch:X?.mismatch||null,discard:It,discard_action:It.action,discard_enabled:It.enabled,discard_title:It.title})}let Ue=(A,M,ue,k)=>{let S=A&&A.bead_id;if(typeof S!="string"||Ke.has(S))return null;Ke.add(S);let q=Ze[S],X=yr(Je,S),ke=X.operation?X:null,ve={...We(S),lane:M,draggable:!ke,discard:ke||void 0,reason:Fu(Te,S),seq:ue+1,queue_position:ue+1,queue_index:ue,queue_length:k,badges:q?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!q,revise_action:!!q,revise_enabled:!!q&&!ke,revise_title:q?q.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${q.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(mt,S)&&(ve.blocked_by=Array.isArray(mt[S])?mt[S].filter(Me=>typeof Me=="string"&&Me.length>0):[]),ve};for(let A=0;A<Qe.length;A++){let M=Ue(Qe[A],"queue",A,Qe.length);if(!M)continue;_.push(M);let ue=L.get(K);ue?ue.push(M):L.set(K,[M])}let ct=[];for(let A=0;A<Math.max(dt,ot.length);A++){let M=`s${A+1}`,ue=yt.get(M),k=ue&&Array.isArray(ue.entries)?ue.entries:[],S=[];for(let ke=0;ke<k.length;ke++){let ve=Ue(k[ke],M,ke,k.length);ve&&(S.push(ve),_.push(ve))}let q=Et(Xe[M]),X=Array.isArray(q.occupied_by)?q.occupied_by.filter(ke=>typeof ke=="string"):[];S.length===0&&X.length===0&&(dt<=1||A>=dt)||ct.push({id:M,index:A,items:S,raw_length:k.length,occupied_by:X,corrections:Array.isArray(q.corrections)?q.corrections.length:0,cycle:q.cycle===!0,...S.length===0&&X.length===0?{empty:!0}:{}})}B.set(K,ct);let At=Array.from({length:dt},(A,M)=>{let ue=`s${M+1}`,k=yt.get(ue),S=k&&Array.isArray(k.entries)?k.entries:[],q=Et(Xe[ue]);return{id:ue,index:S.length,length:S.length,occupied_by:Array.isArray(q.occupied_by)?q.occupied_by.filter(X=>typeof X=="string"):[]}});for(let A of Array.isArray(C.runnable)?C.runnable:[]){let M=A&&A.bead_id;if(typeof M!="string"||Ke.has(M))continue;Ke.add(M);let ue=A.workflow&&typeof A.workflow=="object"?A.workflow:null,k=ue&&typeof ue.route=="string"&&ue.route||(typeof A.route=="string"?A.route:null),S=Eg(Et(Ne),A.exec_pins,k);Array.isArray(A.blocked_by)&&A.blocked_by.length>0&&P.set(M,A.blocked_by.filter(q=>typeof q=="string"&&q.length>0)),typeof A.title=="string"&&A.title.length>0&&j.set(M,A.title),u.push({...We(M),title:A.title||Ye[M]||M,lane:"runnable",draggable:!0,reason:Fu(Te,M),created_at:A.created_at??void 0,updated_at:A.updated_at??void 0,status:typeof A.status=="string"?A.status:void 0,labels:Array.isArray(A.labels)?A.labels:[],spec_id:typeof A.spec_id=="string"?A.spec_id:"",workflow:ue||(k?{route:k,chips:{route:k}}:null),...S?{exec_chips:S}:{},blocked:A.blocked===!0,...Array.isArray(A.blocked_by)?{blocked_by:A.blocked_by.filter(q=>typeof q=="string"&&q.length>0)}:{},place_index:Qe.length,place_lanes:At})}for(let A of pt){let M=A&&A.bead_id;if(typeof M!="string"||Ke.has(M)||(Ke.add(M),o!==void 0&&typeof A.added_at=="number"&&A.added_at<o))continue;let ue=Ag(ze,M),k=ue&&typeof ue.done_kind=="string"?ue.done_kind:null;h.push({...We(M),lane:"done",done:!0,done_layout:"three_line",usage:ir(ze,M),work_ms:yo(ze,M),done_at:typeof A.added_at=="number"?A.added_at:void 0,done_kind:k,badges:k&&qu[k]?[qu[k]]:[]})}}let O=new Map;s.forEach((C,K)=>{C&&typeof C.root_dir=="string"&&O.set(C.root_dir,K)});let U=r&&r.running_sort==="repo"?"repo":"started";d.sort((C,K)=>{if(U==="repo"){let Oe=O.get(C.root_dir)??Number.MAX_SAFE_INTEGER,ze=O.get(K.root_dir)??Number.MAX_SAFE_INTEGER;if(Oe!==ze)return Oe-ze}let $e=typeof C.started_at=="number"&&Number.isFinite(C.started_at)?C.started_at:null,Ne=typeof K.started_at=="number"&&Number.isFinite(K.started_at)?K.started_at:null;return $e!==null&&Ne!==null&&$e!==Ne?$e-Ne:$e===null&&Ne!==null?1:$e!==null&&Ne===null?-1:C.id.localeCompare(K.id)}),h.sort((C,K)=>(K.done_at??0)-(C.done_at??0));let b=s.length>0?s:n.map(C=>({root_dir:C&&C.root_dir,name:C&&C.name,auto_advance:C&&C.auto_advance,auto_merge:C&&C.auto_merge,slots:C&&C.slots,revision:C&&C.revision,runner_catalog:C&&C.runner_catalog})),F=new Set(u.map(C=>C.root_dir)),J=[];for(let C of b){if(!C||typeof C.root_dir!="string")continue;let K=L.get(C.root_dir)||[],$e=B.get(C.root_dir)||[];!(K.length>0||$e.some(Oe=>Oe.items.length>0||Oe.occupied_by.length>0))&&!F.has(C.root_dir)||J.push({root_dir:C.root_dir,name:C.name||C.root_dir,auto_advance:C.auto_advance===!0,auto_merge:C.auto_merge===!0,slots:typeof C.slots=="number"&&C.slots>=Nu?C.slots:Nu,revision:typeof C.revision=="number"?C.revision:0,runner_catalog:Et(C.runner_catalog),items:K,sublanes:{parallel:K,serial:$e},serial_lane_count:V.get(C.root_dir)||0,raw_queue_length:H.get(C.root_dir)||0})}let ee={runnable:u,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:_,queue_groups:J,running:d,pr_wait:p,done:h,chains:[],parallel_rows:[],chain_lanes:[],parallel_raw_length:Object.fromEntries(H),owner_of:{},pending_lanes_kept:[]},pe=Ou(ee);for(let C of T)pe.has(C.id)||pe.set(C.id,{root_dir:C.root_dir,workspace_name:C.workspace_name,lane:"done",state:"done"});let de=new Map;for(let[C,K]of P)for(let $e of K){let Ne=de.get($e);Ne?Ne.includes(C)||Ne.push(C):de.set($e,[C])}for(let C of[...ee.queue,...ee.runnable]){if(!Object.hasOwn(C,"blocked_by"))continue;let K=pe.get(C.id);C.blockers=(C.blocked_by||[]).map($e=>Mu($e,K,pe,s)),C.blocker_warnings=C.blockers.filter($e=>$e.missing_internal).map($e=>`\u26A0 \uC120\uD589 ${$e.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),C.blocker_warnings.length>0&&(C.alert=!0)}for(let C of[...ee.queue,...ee.runnable,...ee.running,...ee.pr_wait]){let K=C.lane==="running"||C.lane==="pr_wait"?[]:(C.blockers||[]).map(Tg),$e=[];for(let ze of de.get(C.id)||[]){let Ye=Cg(ze,pe);Ye&&$e.push(Ye)}let Ne=C.lane==="running"||C.lane==="pr_wait"?[]:C.blocker_warnings||[];if(K.length===0&&$e.length===0&&Ne.length===0)continue;let Oe={predecessors:K,successors:$e,warnings:Ne};C.dependency_chips=Oe}ee.chains=Ig(P,pe,s);let he=Pu(ee.queue_groups);for(let C of ee.queue_groups)for(let K of C.sublanes.serial){let $e=he.get(Du(C.root_dir,K.id));$e&&(K.cross_wait_peers=$e)}let Se=Mg(ee.chains,Array.isArray(r?.pending_lanes)?r.pending_lanes:[],P,pe,s,j);ee.chain_lanes=Se.chain_lanes,ee.pending_lanes_kept=Se.pending_lanes_kept;let Le=new Set;for(let C of ee.chain_lanes)for(let K of C.rows)Le.add(K.id);let te=[];for(let C of L.values())for(let K of C)Le.has(K.id)||te.push(K);te.sort((C,K)=>{let $e=C.workspace_name.localeCompare(K.workspace_name);return $e!==0?$e:(C.queue_index??0)-(K.queue_index??0)}),ee.parallel_rows=te;let se={};for(let[C,K]of pe)typeof K.root_dir=="string"&&K.root_dir.length>0&&(se[C]=K.root_dir);ee.owner_of=se;let Ae=ee.runnable.length,N=ee.runnable;a.show_blocked||(N=N.filter(C=>C.blocked!==!0));let oe=N.length;a.spec==="with"?N=N.filter(C=>!!C.spec_id):a.spec==="without"&&(N=N.filter(C=>!C.spec_id)),ee.runnable_hidden={blocked:Ae-oe,spec:oe-N.length};let re=(C,K)=>{let $e=Bu(K.updated_at)-Bu(C.updated_at);return $e!==0?$e:C.id.localeCompare(K.id)},Ee=i==="repo_spec"?(C,K)=>{let $e=C.spec_id?0:1,Ne=K.spec_id?0:1;return $e!==Ne?$e-Ne:re(C,K)}:re;if(i==="updated_flat")ee.runnable=N.slice().sort(re),ee.runnable_sections=[];else{let C=new Map;for(let Ne of N){let Oe=C.get(Ne.root_dir);Oe?Oe.push(Ne):C.set(Ne.root_dir,[Ne])}let K=[],$e=[];for(let Ne of b){if(!Ne||typeof Ne.root_dir!="string")continue;let Oe=(C.get(Ne.root_dir)||[]).slice().sort(Ee);C.delete(Ne.root_dir),Oe.length!==0&&(K.push({root_dir:Ne.root_dir,name:Ne.name||Ne.root_dir,items:Oe.map(ze=>({...ze,workspace_name:""}))}),$e.push(...Oe))}for(let[Ne,Oe]of C){let ze=Oe.slice().sort(Ee);K.push({root_dir:Ne,name:ze[0]?.workspace_name||Ne,items:ze.map(Ye=>({...Ye,workspace_name:""}))}),$e.push(...ze)}ee.runnable=$e,ee.runnable_sections=K}return ee}var Gu="bdui.monitor.done-range",Vu="bdui.monitor.running_sort",Ku="bdui.monitor.candidate_sort",Yu="beads-ui.monitor.candidate-filter",Zu="beads-ui.monitor.sections";function Pg(){try{let e=window.localStorage.getItem(Yu);if(!e)return{...On};let t=JSON.parse(e);return!t||typeof t!="object"?{...On}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:On.show_blocked,spec:ti.some(r=>r.value===t.spec)?t.spec:"all"}}catch{return{...On}}}function Wu(e){try{window.localStorage.setItem(Yu,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Dg(){try{let e=window.localStorage.getItem(Ku);return _s.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Ng(e){try{window.localStorage.setItem(Ku,e)}catch{}}function qg(){try{let e=window.localStorage.getItem(Zu);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function zu(e){try{window.localStorage.setItem(Zu,JSON.stringify(e))}catch{}}function Fg(){try{let e=window.localStorage.getItem(Gu);return or(e)?e:er}catch{return er}}function jg(e){try{window.localStorage.setItem(Gu,e)}catch{}}function Bg(){try{return window.localStorage.getItem(Vu)==="repo"?"repo":"started"}catch{return"started"}}function Ug(e){try{window.localStorage.setItem(Vu,e)}catch{}}var Qu="tab:monitor:pipeline",Wg=1e3,zg=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Hu="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Hg(e){return e>=1&&e<=Hu.length?Hu[e-1]:`(${e})`}function Xu(e,t){let r=St("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,c=t.router,u=t.now||(()=>Date.now()),d=t.confirm||(v=>typeof globalThis.confirm!="function"||globalThis.confirm(v)),p=Fg(),_=Bg(),h=Pg(),T=Dg(),L=qg(),B=null,V=null,H=[],P=null;function j(){let v=Rr.find(w=>w.value===p);return v?v.label:""}let O=document.createElement("div");O.className="mon",e.appendChild(O);let U=document.createElement("div");U.className="mon2-drawer",e.appendChild(U);let b=ri(null,null),F=new Map,J=new Map,ee=null,pe=null,de=null,he=Tn(U,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{B=null,me()}});async function Se(v,w,R,W,be=!0){if(!o||!R)return null;let we=await o(v,{...w,root_dir:R,expected_revision:W});if(we&&we.conflict&&be){we.queue&&J.set(R,we.queue);let ge=we.queue&&typeof we.queue.revision=="number"?we.queue.revision:W;we=await o(v,{...w,root_dir:R,expected_revision:ge})}return we&&we.queue&&R&&J.set(R,we.queue),we}function Le(v,w){let R=J.get(v),W=s&&s.get?s.get():null,be=(Array.isArray(W)?W:[]).find(ge=>ge?.root_dir===v);return(R||be)?.merge_queue?.find(ge=>ge.bead_id===w)?.continuation_action}async function te(v,w,R,W){let be=await Se(v,w,R,W),we=J.get(R)?.revision??be?.queue?.revision??W;return wr(be,(ge,tt)=>Se(v,{...w,continuation:ge,decision_token:tt},R,we,!1),{refresh:ge=>Se(v,w,R,ge?.queue?.revision??J.get(R)?.revision??we,!1)})}async function se(v,w,R,W){let be=await wr({continuation_mismatch:W},(ge,tt)=>Se("worker-merge-queue-add",{bead_id:w,continuation:ge,decision_token:tt},v,R,!1)),we=be?.queue?.merge_queue?.find(ge=>ge.bead_id===w)?.continuation_action;be?.applied!==!0&&we?.continuation===null&&we.mismatch&&await se(v,w,be.queue.revision,we.mismatch)}async function Ae(v,w,R){let W=await Se("worker-discard",v,w,R);if(W&&W.discarded===!0){_e(wo(W),"success",5e3);return}if(W&&W.reason){_e(`\uD3D0\uAE30 \uC2E4\uD328: ${W.reason}`,"error");return}if(W&&W.accepted&&W.pending==="merged_revert"){_e("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(W&&W.accepted){_e(`\uD3D0\uAE30 \uC9C4\uD589: ${W.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}W&&!W.conflict&&_e("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function N(v,w,R){return!o||!R?null:await o(v,{...w,root_dir:R})}async function oe(){let v=new Map;for(let w of b.pr_wait)v.has(w.root_dir)||v.set(w.root_dir,w.expected_revision);for(let[w,R]of v)await Se("worker-merge-queue-add-all",{},w,R)}function re(v){let w=L[v];return!!(w&&w.runnable===!0)}function ye(v){let w={...L[v]||{}};w.runnable=!w.runnable,L={...L,[v]:w},zu(L),me()}function Ee(v){return L[v]===!0}function C(v){L={...L,[v]:L[v]!==!0},zu(L),me()}function K(v){let w=re(v.root_dir);return l`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${v.root_dir}
        data-section="runnable"
        aria-expanded=${w?"false":"true"}
        aria-label=${`${v.name} \uC139\uC158 ${w?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${w?"\u25B8":"\u25BE"}
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
    </header>`}function $e(v,w){return l`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="candidate"
      data-root-dir=${v.root_dir}
    >
      ${w}
    </div>`}function Ne(v){if(V!==v.id)return null;let w=b.queue_groups.find(W=>W.root_dir===v.root_dir),R=v.place_lanes||[];return{bead_id:v.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:v.place_index??0},...b.chain_lanes.map((W,be)=>({id:`lane:${be}`,label:`\uC5F0\uACB0 ${be+1} \uB05D\uC5D0`,count:W.rows.length})),{id:"new-lane",label:"\uC0C8 \uC5F0\uACB0 \uB808\uC778",count:0},...R.map(W=>({id:`serial:${W.id}`,label:`${w?w.name:""} \uC9C1\uB82C ${Number(W.id.slice(1))}`,count:W.length}))]}}function Oe(v){return $e(v,Ua(v,Ne(v),{exec_chips_mode:"pinned_only"}))}function ze(){return b.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${b.runnable.map(v=>Oe(v))}
      </div>`:l`${b.runnable_sections.map(v=>{let w=re(v.root_dir);return l`<section
        class="mon2-sec${w?" is-collapsed":""}"
        data-root-dir=${v.root_dir}
        data-section="runnable"
      >
        ${K({root_dir:v.root_dir,name:v.name,count:v.items.length})}
        ${w?"":l`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${v.items.map(R=>Oe(R))}
            </div>`}
      </section>`})}`}function Ye(v,w){return l`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="parallel"
      data-root-dir=${v.root_dir}
      data-row-index=${w}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${nn(v)}
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
    </div>`}function Y(){let v=Ee("parallel");return l`<section
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
        <span class="mon2-area__count">${b.parallel_rows.length}</span>
      </header>
      ${v?"":l`<div class="mon2-area__body" data-drop="parallel">
            ${b.parallel_rows.length===0?l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:b.parallel_rows.map((w,R)=>Ye(w,R))}
          </div>`}
    </section>`}function Q(v,w,R){return l`<div
      class="mon2-crow"
      style=${`--indent: ${w.indent}`}
      draggable=${w.draggable?"true":"false"}
      data-bead-id=${w.id}
      data-drag-kind="chain"
      data-root-dir=${w.root_dir}
      data-lane-id=${v.lane_id}
      data-row-index=${R}
      data-queue-index=${typeof w.queue_index=="number"?String(w.queue_index):""}
    >
      ${v.cycle?"":l`<span class="mon2-crow__seq" aria-hidden="true"
            >${Hg(w.seq)}</span
          >`}
      ${w.workspace_name?l`<span class="worker-mini__repo" title=${w.root_dir}
            >${w.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${w.id}</span>
      <span class="mon2-crow__title">${w.title}</span>
      ${w.predecessors.map(W=>l`<span class="worker-dep worker-dep--pred"
            ><span class="worker-dep__label">← ${W}</span></span
          >`)}
      <span class="mon2-crow__where"
        >${w.location_label==="\uC2E4\uD589\uC911"?`\u25CF ${w.location_label}`:w.location_label}</span
      >
      ${w.draggable?l`<button
            type="button"
            class="mon2-crow__detach"
            data-bead-id=${w.id}
            title="연결에서 빼고 앞뒤를 이어 붙입니다"
            aria-label="연결에서 빼기"
          >
            ✕
          </button>`:""}
    </div>`}function Te(v){return l`<div class="mon2-clane" data-lane-id=${v.lane_id}>
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
            </div>`:v.rows.map((w,R)=>Q(v,w,R))}
      </div>
    </div>`}function Ze(v,w,R){return l`<div
      class="mon2-item"
      data-bead-id=${w.id}
      data-drag-kind="repo-serial"
      data-root-dir=${w.root_dir}
      data-lane-id=${v.id}
      data-row-index=${R}
      data-queue-index=${String(w.queue_index??0)}
    >
      ${nn(w)}
    </div>`}function Ve(v,w){return l`<div
      class="mon2-lane${w.empty?" mon2-lane--empty":""}"
      data-root-dir=${v.root_dir}
      data-lane-length=${String(w.raw_length)}
    >
      ${cr({id:"",lane:w.id,title:`${v.name} \xB7 \uC9C1\uB82C ${w.index+1}`,items:w.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:l`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${v.root_dir}
          data-lane-id=${w.id}
          data-lane-length=${String(w.raw_length)}
        >
          ${w.items.length>0?w.items.map((R,W)=>Ze(w,R,W)):l`<div class="worker-pane__empty">
                비어 있음 — 드래그로 배치
              </div>`}
        </div>`,header_control:l`<span class="mon2-lane__badge"
            >${w.occupied_by.length>0?"\uC810\uC720":""}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${v.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${w.empty?l`<div class="mon2-lane__hint">
            ${v.name} 직렬 ${w.index+1} 비어 있음
          </div>`:""}
      ${w.cycle?l`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(w.cross_wait_peers||[]).map(R=>l`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${R.workspace_name}·${R.lane}과 교차 대기
          </div>`)}
    </div>`}function st(){let v=Ee("serial"),w=b.chain_lanes.some(R=>R.pending&&R.rows.length===0);return l`<section
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
          ?disabled=${w}
          title=${w?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4 \u2014 \uC0C8\uB85C\uACE0\uCE68\uD558\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${v?"":l`<div class="mon2-area__body">
            ${b.chain_lanes.map(R=>Te(R))}
            ${b.queue_groups.map(R=>R.sublanes.serial.map(W=>Ve(R,W)))}
          </div>`}
    </section>`}function Je(){return l`<div class="mon2-wait">${Y()}${st()}</div>`}function mt(v){return l`<div class="worker-rungrid">
      ${b.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:b.running.map(w=>Ha({bead_id:w.id,attempt_id:w.attempt_id||"",title:w.title,runner:w.runner??null,model:w.model??null,effort:w.effort??null,speed:w.speed??null,started_at:w.started_at??null,resumed_from:w.resumed_from??null,continuation_mode:w.continuation_mode??null,paused:w.run_state==="paused",failed:w.run_state==="failed",status:w.status,status_label:w.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:w.can_resume!==!1,can_pause:w.can_pause!==!1,exec_chips:w.exec_chips||null,usage:w.usage||null,discard:w.discard},v,B,{monitor:{repo:w.workspace_name,root_dir:w.root_dir,serial_lane_id:w.serial_lane_id,workflow:w.workflow||null,last_activity:w.last_activity||null,legs:w.legs||[],dependency_chips:w.dependency_chips||null}}))}
    </div>`}function Pe(v){let w={runnable:b.runnable,queue:b.queue,running:b.running,pr_wait:b.pr_wait,done:b.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${zg.map(R=>{let W=w[R.lane],be=R.lane==="runnable"?b.runnable_flat?W.length>0?ze():void 0:b.runnable_sections.length>0?ze():void 0:R.lane==="queue"?b.queue_groups.length>0||b.chain_lanes.length>0||b.parallel_rows.length>0?Je():void 0:R.lane==="running"?mt(v):W.length>0?l`${W.map(we=>nn(we))}`:void 0;return cr({id:`monitor-${R.lane}`,lane:R.pane,title:R.lane==="done"?`\uC644\uB8CC\xB7${j()}`:R.title,items:W,empty:R.empty,body:be,live:R.lane==="running"&&W.length>0,controls:R.lane==="runnable"?I():void 0,header_control:ne(R.lane,W.length)})})}
      </div>`}function I(){return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${h.show_blocked}
        />
        🔒
        blocked${b.runnable_hidden.blocked>0?` ${b.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ti.map(v=>l`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${h.spec===v.value?" is-active":""}"
              data-spec=${v.value}
              aria-pressed=${h.spec===v.value?"true":"false"}
            >
              ${v.label}
            </button>`)}
        ${b.runnable_hidden.spec>0?l`<span class="worker-filter__hidden"
              >숨김 ${b.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function ne(v,w){return v==="runnable"?l`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${T}
      >
        ${_s.map(R=>l`<option
              value=${R.value}
              ?selected=${T===R.value}
            >
              ${R.label}
            </option>`)}
      </select>`:v==="running"?l`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${_}
      >
        <option value="started" ?selected=${_==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${_==="repo"}>
          레포순
        </option>
      </select>`:v==="pr_wait"&&w>0?l`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:v==="done"?l`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${p}
      >
        ${Rr.map(R=>l`<option value=${R.value} ?selected=${p===R.value}>
              ${R.label}
            </option>`)}
      </select>`:""}function me(){let v=s&&s.get?s.get():null,w=s&&s.getWorkspacesState?s.getWorkspacesState():[],R=u(),W=()=>ri(v,w,{done_since:Kr(p,R),running_sort:_,candidate_filter:h,candidate_sort:T,pending_lanes:H});b=W(),b.pending_lanes_kept.length!==H.length&&(H=b.pending_lanes_kept.map(be=>H[be]),b=W()),F=new Map;for(let be of[...b.runnable,...b.queue,...b.running,...b.pr_wait,...b.done])F.has(be.id)||F.set(be.id,be);Ge(Pe(R),O),qe()?.render(),ae(),Qe()}function ae(){let v=new Map;for(let w of b.queue_groups)v.set(w.root_dir,w.auto_advance);for(let w of Array.from(O.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let R=w.closest(".mon2-item")?.getAttribute("data-root-dir")||"",W=v.get(R);typeof W=="boolean"&&w.setAttribute("title",`${w.textContent||""} \xB7 ${W?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function qe(){if(de)return de;let v=O.querySelector(".mon2-deck");return v?(de=Su(v,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>b.done,rangeLabel:j,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:Xe,onFocusChange:w=>{P=w,Qe()}}),de):null}function Qe(){O.classList.toggle("has-focus",P!==null);for(let v of Array.from(O.querySelectorAll(".mon2-sec[data-root-dir]")))v.classList.toggle("is-focus",P!==null&&v.getAttribute("data-root-dir")===P);for(let v of Array.from(O.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let w=F.get(v.getAttribute("data-bead-id")||"");v.classList.toggle("is-focus",P!==null&&!!w&&w.root_dir===P)}for(let v of Array.from(O.querySelectorAll(".mon2-crow[data-root-dir]")))v.classList.toggle("is-focus",P!==null&&v.getAttribute("data-root-dir")===P)}function ot(v,w){let R=a?a():void 0;if(!w||!R||w===R||!i){n(v);return}i(w).then(()=>{n(v)}).catch(W=>{r("workspace switch for %s failed: %o",w,W)})}function Xe(v){if(!v)return;let w=a?a():void 0,R=()=>{try{c?.gotoView("worker")}catch(W){r("gotoView(worker) failed: %o",W)}};if(!i||w&&w===v){R();return}i(v).then(R).catch(W=>{r("workspace switch for %s failed: %o",v,W),_e("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function dt(v){tr(v).then(w=>{_e(w?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",w?"success":"error",1400)})}function yt(v){let w=F.get(v)||null;return{item:w,root_dir:w?w.root_dir:"",revision:w?w.expected_revision:0}}function gt(v){if(typeof v=="string"&&v.length>0)return v;if(v&&typeof v=="object"){let w=v;if(typeof w.message=="string"&&w.message.length>0)return w.message;if(typeof w.error=="string"&&w.error.length>0)return w.error;if(w.error&&typeof w.error=="object"&&typeof w.error.message=="string")return w.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function pt(v,w,R){let{root_dir:W}=yt(w);if(!(!w||!R||R===w))try{await N(v,{a:w,b:R},W)}catch(be){_e(gt(be),"error")}}function kt(){let v=new Map,w=s&&s.get?s.get():null,R=W=>Array.isArray(W)?W.filter(be=>typeof be=="string"&&be.length>0):[];for(let W of Array.isArray(w)?w:[]){if(!W||typeof W!="object")continue;let be=W.bead_blocked_by&&typeof W.bead_blocked_by=="object"?W.bead_blocked_by:{};for(let[we,ge]of Object.entries(be))Array.isArray(ge)&&v.set(we,R(ge));for(let we of Array.isArray(W.runnable)?W.runnable:[])we&&typeof we.bead_id=="string"&&Array.isArray(we.blocked_by)&&we.blocked_by.length>0&&v.set(we.bead_id,R(we.blocked_by))}return v}function We(){let v=new Map;for(let R of b.chain_lanes)v.set(R.lane_id,R.rows.map(W=>W.id));let w=new Map;for(let R of b.parallel_rows)typeof R.queue_index=="number"&&w.set(R.id,R.queue_index);for(let R of b.queue_groups)for(let W of R.sublanes.serial)for(let be of W.items)typeof be.queue_index=="number"&&w.set(be.id,be.queue_index);return{blocked_by_map:kt(),owner_of:new Map(Object.entries(b.owner_of)),lane_order:v,parallel_rows:b.parallel_rows.map(R=>({bead_id:R.id,root_dir:R.root_dir,queue_index:R.queue_index??0})),parallel_raw_length:new Map(Object.entries(b.parallel_raw_length)),queue_index_of:w}}function Ke(v,w){let R=F.get(w);if(R&&R.root_dir===v)return R.expected_revision;let W=b.queue_groups.find(be=>be.root_dir===v);return W?W.revision:0}async function Ue(v,w){try{if(v.type==="worker-queue-place"||v.type==="worker-queue-reorder"||v.type==="worker-queue-remove"){let R=await Se(v.type,v.payload,v.root_dir,Ke(v.root_dir,w));return R&&R.conflict?(_e("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):R&&R.applied===!1?(_e(R.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${R.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0}return(v.type==="dep-add"||v.type==="dep-remove")&&await N(v.type,{a:v.a,b:v.b},v.root_dir),!0}catch(R){return _e(gt(R),"error"),!1}}async function ct(v,w){let R=Eu(v,w,We());if("refused"in R){_e(R.refused,"error");return}if(w.kind==="chain"){let W=b.chain_lanes.find(we=>we.lane_id===w.lane_id),be=W&&W.pending&&W.rows.length===0?Number(W.lane_id.slice(8)):-1;be>=0&&H[be]&&(H=H.map((we,ge)=>ge===be?{seed:v.bead_id}:we))}for(let W of R.ops)if(!await Ue(W,v.bead_id))break;me()}async function At(v,w){let R=F.get(v);if(!R){me();return}let W={kind:"candidate",bead_id:v,root_dir:R.root_dir};if(w==="new-lane"){H.some(we=>we.seed===null)||(H=[...H,{seed:null}]),me();let be=b.chain_lanes.find(we=>we.pending&&we.rows.length===0);if(!be)return;await ct(W,{kind:"chain",lane_id:be.lane_id,marker_index:0});return}if(w.startsWith("lane:")){let be=b.chain_lanes[Number(w.slice(5))];if(!be){me();return}await ct(W,{kind:"chain",lane_id:be.lane_id,marker_index:be.rows.length});return}if(w.startsWith("serial:")){let be=w.slice(7),we=(R.place_lanes||[]).find(ge=>ge.id===be);await ct(W,{kind:"repo-serial",root_dir:R.root_dir,lane_id:be,index:we?we.index:0});return}await ct(W,{kind:"parallel",marker_index:b.parallel_rows.length})}async function A(v,w){let R=b.parallel_rows,W=R.findIndex(E=>E.id===v);if(W<0)return;let be=R[W].root_dir,we=[];R.forEach((E,ie)=>{E.root_dir===be&&we.push(ie)});let ge=we.indexOf(W),tt=we[ge+w];if(typeof tt!="number")return;let Re=w===-1?tt:we[ge+2]??Math.min(R.length,tt+1);await ct({kind:"parallel",bead_id:v,root_dir:be,queue_index:R[W].queue_index??0},{kind:"parallel",marker_index:Re})}async function M(v){for(let w of b.chain_lanes){let R=w.rows.find(W=>W.id===v);if(!(!R||!R.draggable)){await ct({kind:"chain",bead_id:v,root_dir:R.root_dir,lane_id:w.lane_id,...typeof R.queue_index=="number"?{queue_index:R.queue_index}:{}},{kind:"parallel",marker_index:b.parallel_rows.length});return}}}let ue=null,k=!1,S=null;function q(){S!==null&&clearTimeout(S),S=setTimeout(()=>{S=null,k=!1},0)}function X(v,w){let R=w&&typeof w.closest=="function"?w.closest("[data-row-index]"):null;if(R&&v.contains(R)){let W=Number(R.getAttribute("data-row-index"));return Number.isFinite(W)?W:0}return v.querySelectorAll("[data-row-index]").length}function ke(v){let w=v.target,R=typeof w?.closest=="function"?w.closest("[data-drop]"):null;if(!R||!ue)return null;let W=R.getAttribute("data-drop");if(W==="candidate")return{zone:R,target:{kind:"candidate"}};if(W==="parallel")return{zone:R,target:{kind:"parallel",marker_index:X(R,w)}};if(W==="chain")return{zone:R,target:{kind:"chain",lane_id:R.getAttribute("data-lane-id")||"",marker_index:X(R,w)}};if(W==="repo-serial"){let be=R.getAttribute("data-root-dir")||"";if(be!==ue.root_dir)return null;let we=typeof w?.closest=="function"?w.closest("[data-queue-index]"):null,ge=we&&R.contains(we)?we.getAttribute("data-queue-index"):R.getAttribute("data-lane-length"),tt=Number(ge);return{zone:R,target:{kind:"repo-serial",root_dir:be,lane_id:R.getAttribute("data-lane-id")||"",index:Number.isFinite(tt)?tt:0}}}return null}function ve(){for(let v of Array.from(O.querySelectorAll(".is-drop-over")))v.classList.remove("is-drop-over")}function Me(v){let w=v.target,R=typeof w?.closest=="function"?w.closest('[draggable="true"][data-bead-id]'):null,W=R?R.closest("[data-drag-kind]"):null;if(!W)return;let be=W.getAttribute("data-bead-id")||"",we=W.getAttribute("data-drag-kind")||"",ge=W.getAttribute("data-root-dir")||"";if(!be||!we||!ge)return;let tt=W.getAttribute("data-queue-index")||"",Re=Number(tt),E=W.getAttribute("data-lane-id")||"";ue={kind:we,bead_id:be,root_dir:ge,...tt!==""&&Number.isFinite(Re)?{queue_index:Re}:{},...E?{lane_id:E}:{}},k=!0,V=null,O.classList.add("is-dragging");try{v.dataTransfer?.setData("text/plain",be),v.dataTransfer&&(v.dataTransfer.effectAllowed="move")}catch{}}function De(v){let w=ke(v);w&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"),w.zone.classList.add("is-drop-over"))}function Rt(v){let w=v.target;typeof w?.closest=="function"&&w.closest("[data-drop]")?.classList.remove("is-drop-over")}function at(){ue=null,ve(),O.classList.remove("is-dragging"),q()}function et(v){let w=ke(v),R=ue;ue=null,ve(),O.classList.remove("is-dragging"),!(!w||!R)&&(v.preventDefault(),ct(R,w.target))}function Dt(v){return{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.run_state==="running"?"running":v.run_state,worktree:v.root_dir}}function Ut(v,w){let{item:R,root_dir:W,revision:be}=yt(w),we=R?.attempt_id||"",ge=v.classList;if(ge.contains("worker-dep__remove")){pt("dep-remove",w,v.dataset.blockerId||"");return}if(ge.contains("mon2-rowops__up")||ge.contains("mon2-rowops__down")){A(w,ge.contains("mon2-rowops__up")?-1:1);return}if(ge.contains("mon2-rowops__remove")){Se("worker-queue-remove",{bead_id:w},W,be);return}if(ge.contains("mon2-crow__detach")){M(w);return}if(ge.contains("worker-card__place")){V=V===w?null:w,me();return}if(ge.contains("worker-card__place-cancel")){V=null,me();return}if(ge.contains("worker-card__place-lane")){let tt=v.getAttribute("data-lane")||"parallel";V=null,At(w,tt);return}if(ge.contains("rtile__session")){B=we,we&&R&&he.open({attempt_id:we,root_dir:W,meta:Dt(R)}),me();return}if(ge.contains("rtile__pause")){N("worker-attempt-pause",{attempt_id:we},W);return}if(ge.contains("rtile__resume")){xn().then(tt=>{if(tt!==null)return te("worker-attempt-resume",{attempt_id:we,...tt!==""?{instructions:tt}:{}},W,be)});return}if(ge.contains("rtile__dismiss")){Se("worker-attempt-dismiss",{attempt_id:we},W,be);return}if(ge.contains("rtile__discard")){if(!d(cs(w,"unmerged")))return;Ae({bead_id:w,...we?{attempt_id:we}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},W,be);return}if(ge.contains("worker-mini__merge")){let tt=Le(W,w);tt?.mismatch&&tt.continuation===null?se(W,w,be,tt.mismatch):Se("worker-merge-queue-add",{bead_id:w},W,be);return}if(ge.contains("worker-mini__merge-cancel")){Se("worker-merge-queue-remove",{bead_id:w},W,be);return}if(ge.contains("worker-mini__discard")){let tt=v.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(cs(w,tt)))return;Ae({bead_id:w,...v.dataset.attemptId?{attempt_id:v.dataset.attemptId}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},W,be);return}if(ge.contains("worker-mini__revise-fix")){te("worker-revise-fix",{bead_id:w},W,be);return}ge.contains("worker-mini__revise-approve")&&Se("worker-revise-approve",{bead_id:w},W,be)}function Fe(v){let w=k;k=!1;let R=v.target;if(!R||typeof R.closest!="function"||R.closest("dialog")||R.closest(".mon2-drawer")||R.closest("a"))return;let W=R.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(W){v.preventDefault();let ft=R.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||W.textContent?.trim()||"";ft&&dt(ft);return}let be=R.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(be){v.preventDefault();let Ce=be.getAttribute("data-root-dir")||F.get(R.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||be.getAttribute("title")||"";Xe(Ce);return}let we=R.closest(".mon2-sec__toggle");if(we){v.preventDefault(),ye(we.getAttribute("data-root-dir")||"");return}let ge=R.closest(".mon2-area__toggle");if(ge){v.preventDefault(),C(ge.getAttribute("data-area")||"parallel");return}if(R.closest(".mon2-newlane")){v.preventDefault(),H=[...H,{seed:null}],me();return}if(R.closest(".mon-merge-all")){v.preventDefault(),oe();return}let tt=R.closest(".mon-filter__spec");if(tt){v.preventDefault(),h={...h,spec:tt.getAttribute("data-spec")||"all"},Wu(h),me();return}let Re=R.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Re)return;let E=Re.getAttribute("data-bead-id")||"",ie=R.closest("button");if(ie){v.preventDefault(),Ut(ie,E);return}E&&!w&&(v.preventDefault(),ot(E,Re.getAttribute("data-root-dir")||yt(E).root_dir))}function Ft(v){let w=v.target;if(!w||typeof w.closest!="function")return;let R=w.closest(".mon-filter__blocked");if(R){h={...h,show_blocked:R.checked},Wu(h),me();return}let W=w.closest(".mon-candidate-sort");if(W){T=_s.some(ge=>ge.value===W.value)?W.value:"repo_spec",Ng(T),me();return}let be=w.closest(".mon-running-sort");if(be){_=be.value==="repo"?"repo":"started",Ug(_),me();return}let we=w.closest(".mon-done-range");we&&(p=or(we.value)?we.value:er,jg(p),me())}e.addEventListener("click",Fe),e.addEventListener("change",Ft),e.addEventListener("dragstart",Me),e.addEventListener("dragover",De),e.addEventListener("dragleave",Rt),e.addEventListener("drop",et),e.addEventListener("dragend",at),s&&typeof s.subscribe=="function"&&(ee=s.subscribe(()=>{try{J.clear(),me()}catch{}}));function It(){pe!==null&&(clearInterval(pe),pe=null)}function zt(){S!==null&&(clearTimeout(S),S=null)}return{load(){r("load"),me(),pe===null&&(pe=setInterval(()=>{try{me()}catch{}},Wg))},pause(){It()},clear(){It(),zt(),ee&&(ee(),ee=null),he.destroy(),de?.destroy(),de=null,e.removeEventListener("click",Fe),e.removeEventListener("change",Ft),e.removeEventListener("dragstart",Me),e.removeEventListener("dragover",De),e.removeEventListener("dragleave",Rt),e.removeEventListener("drop",et),e.removeEventListener("dragend",at),e.replaceChildren()}}}function Ju(e,t,r){let n=St("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(_){return h=>{h.preventDefault(),n("click tab %s",_),r.gotoView(_)}}function c(){let _=t.getState();return _.view==="worker"||_.view==="monitor"?_.view:"board"}function u(){let _=c();return l`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${_==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let _=c();return l`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${_==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${_==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function p(){s&&Ge(u(),s),o&&Ge(d(),o)}return p(),a=t.subscribe(()=>p()),{destroy(){a&&(a(),a=null),s&&Ge(l``,s),o&&Ge(l``,o)}}}var ed=["bug","feature","task","epic","chore"];function td(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var rd=["Critical","High","Medium","Low","Backlog"];function nd(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),d=r.querySelector("#btn-cancel"),p=r.querySelector("#btn-create"),_=r.querySelector(".new-issue__close");function h(){o.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",o.appendChild(O);for(let U of ed){let b=document.createElement("option");b.value=U,b.textContent=td(U),o.appendChild(b)}a.replaceChildren();for(let U=0;U<=4;U+=1){let b=document.createElement("option");b.value=String(U);let F=rd[U]||"Medium";b.textContent=`${U} \u2013 ${F}`,a.appendChild(b)}}h();function T(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function L(O){s.disabled=O,o.disabled=O,a.disabled=O,i.disabled=O,c.disabled=O,d.disabled=O,p.disabled=O,p.textContent=O?"Creating\u2026":"Create"}function B(){u.textContent=""}function V(O){u.textContent=O}function H(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?o.value=O:o.value="";let U=window.localStorage.getItem("beads-ui.new.priority");U&&/^\d$/.test(U)?a.value=U:a.value="2"}catch{o.value="",a.value="2"}}function P(){let O=o.value||"",U=a.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),U.length>0&&window.localStorage.setItem("beads-ui.new.priority",U)}async function j(){B();let O=String(s.value||"").trim();if(O.length===0){V("Title is required"),s.focus();return}let U=Number(a.value||"2");if(!(U>=0&&U<=4)){V("Priority must be 0..4"),a.focus();return}let b=String(o.value||""),F=String(c.value||""),J={title:O};b.length>0&&(J.type=b),String(U).length>0&&(J.priority=U),F.length>0&&(J.description=F),L(!0);try{await t("create-issue",J)}catch{L(!1),V("Failed to create issue");return}P(),L(!1),T()}return r.addEventListener("cancel",O=>{O.preventDefault(),T()}),_.addEventListener("click",()=>T()),d.addEventListener("click",()=>T()),r.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),j())}),n.addEventListener("submit",O=>{O.preventDefault(),j()}),{open(){n.reset(),B(),H();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){T()}}}var Gg=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Vg(e,t){return ea(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function sd(e,t,r){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=Vg(n,e);return l`<button
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
  `}function od(e,t,r){return l`
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
  `}function ad(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Gg.map(([r,n])=>l`<label class="settings-dialog__toggle">
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
  `}var Kg=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function id(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(he=>_e(he,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,u="",d=null;function p(){if(d)return d;let he=a.querySelector('[data-pane="execution"]');return he?(d=Eo(he,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:r,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Se=>t.queueStore?.set?.(Se)}),d):null}function _(){return l`
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
    `}function h(){let he=n.get();return l`
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
        ${he?l`
              ${sd(he,s(),V)}
              ${od(he,u,{onDraft:Se=>{u=Se},onAdd:H,onRemove:P})}
              ${ad(he,j)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function T(he){let Se=n.get();if(Se)try{let Le=await r("display-policy-set",{expected_revision:Se.revision,policy:he(Se)});L(Le),Le&&Le.conflict&&Le.policy&&(Le=await r("display-policy-set",{expected_revision:Le.policy.revision,policy:he(Le.policy)}),L(Le)),Le&&Le.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function L(he){he&&he.policy&&typeof he.policy=="object"&&n.set(he.policy)}function B(he){T(he)}function V(he){let Se=n.get();if(!Se)return;let Le=!Yg(he,Se);B(te=>Zg(he,te,Le))}function H(){let he=u.trim();he.length!==0&&(u="",B(Se=>Se.hidden_prefixes.includes(he)?{hidden_prefixes:Se.hidden_prefixes}:{hidden_prefixes:[...Se.hidden_prefixes,he]}),O())}function P(he){B(Se=>({hidden_prefixes:Se.hidden_prefixes.filter(Le=>Le!==he)}))}function j(he){let Se=n.get();if(!Se)return;let Le=Se.chips[he]===!1;B(()=>({chips:{[he]:Le}}))}function O(){Ge(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Kg.map(he=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${he.id}
                  aria-selected=${String(i===he.id)}
                  aria-controls=${`settings-pane-${he.id}`}
                  @click=${()=>U(he.id)}
                >
                  <span class="settings-dialog__glyph">${he.glyph}</span>
                  ${he.label}
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
            ${_()} ${h()}
          </div>
        </div>
      `,a),p()}function U(he){i=he,O()}let b=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",b),a.addEventListener("cancel",b);let F=he=>{he.target===a&&de()};a.addEventListener("click",F);let J=null;n.subscribe&&(J=n.subscribe(()=>{c&&O()}));let ee=null;t.implPresetStore?.subscribe&&(ee=t.implPresetStore.subscribe(()=>{c&&d?.render()}));function pe(he="execution"){c||(c=!0,t.onOpenChange?.(!0),i=he,u="",O(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),p()?.load())}function de(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:pe,close:de,sessionDraft:()=>d?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",b),a.removeEventListener("cancel",b),a.removeEventListener("click",F),J&&(J(),J=null),ee&&(ee(),ee=null),d?.destroy(),d=null,a.remove()}}}function Yg(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Zg(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Qg=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],ld="usage-meter-card",Xg="usage-meter-layer",cd=600,Jg=["token_expired","relogin_required"];function ud(e){return String(e).padStart(2,"0")}function eh(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function dd(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${ud(n.getHours())}:${ud(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Qg[n.getMonth()]} ${n.getDate()} ${o}`;return`${eh(r,t)} \xB7 ${i}`}function th(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function pd(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function fd(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var _d=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function gd(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function rh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:gd(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function nh(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=rh(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?gd(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function md(e,t){return`${e}:${t}`}function hd(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function u(){Ge(l``,e),e.hidden=!0,p()}function d(){if(c===null){let te=e.ownerDocument;c=te.createElement("div"),c.id=Xg,c.className="usage-meter__layer",te.body.appendChild(c)}return c}function p(){c!==null&&(Ge(l``,c),c.remove(),c=null)}function _(te){r!==te&&(r===null&&(document.addEventListener("mousedown",T),document.addEventListener("keydown",B),window.addEventListener("resize",L)),r=te)}function h(){r!==null&&(r=null,document.removeEventListener("mousedown",T),document.removeEventListener("keydown",B),window.removeEventListener("resize",L))}function T(te){let se=te.target;se&&(e.contains(se)||c!==null&&c.contains(se))||(h(),de())}function L(){de()}function B(te){te.key==="Escape"&&(h(),de())}function V(te){r===te?h():_(te),de()}function H(){h(),de()}async function P(te,se){if(n.has(te.key))return;let Ae=md(te.key,se);n.set(te.key,se),a.delete(Ae),de();let N=null;try{N=await(await fetch(te.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:se})})).json()}catch{N=null}if(t)return;if(n.delete(te.key),!N||N.ok!==!0){let re=N&&typeof N.error=="string"&&N.error.length>0?N.error:"network_error";a.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${re}`}),de();return}let oe=Array.isArray(N.warnings)?N.warnings.filter(re=>typeof re=="string"&&re.length>0):[];oe.length>0&&a.set(Ae,{kind:"warn",text:oe.join(" \xB7 ")}),de(),await Le()}function j(te,se,Ae,N){let oe=fd(te.pct),ye=`resets ${dd(te.resetsAt,N)}${se?` \xB7 ${Ae}`:""}`;return l`<span
      class="usage-meter__window ${pd(oe)}"
      style=${`--progress: ${oe}%`}
      title=${ye}
    >
      <span class="usage-meter__label">${te.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${oe}%</span>
    </span>`}function O(te,se,Ae){let N=se.available&&typeof se.ageSeconds=="number"&&se.ageSeconds>cd,oe=N&&typeof se.ageSeconds=="number"?`${Math.floor(se.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",re=se.accounts.filter(K=>!K.active).length,ye=`usage-meter__group${N?" usage-meter__group--stale":""}`,Ee=l`<span class="usage-meter__provider"
        >${te.label}</span
      >
      ${se.available?se.windows.map(K=>j(K,N,oe,Ae)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${re>0?l`<span class="usage-meter__badge">+${re}</span>`:""}`;if(se.accounts.length===0)return l`<span
        class=${ye}
        aria-label=${`${te.label} usage`}
        >${Ee}</span
      >`;let C=r===te.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${ye}`}
      aria-label=${`${te.label} usage`}
      aria-expanded=${C?"true":"false"}
      aria-controls=${ld}
      @click=${()=>V(te.key)}
    >
      ${Ee}
    </button>`}function U(te,se){return l`<span class="usage-meter" aria-label="Usage">
      ${te.map(Ae=>O(Ae.provider,Ae.snapshot,se))}
    </span>`}function b(te,se){let Ae=fd(te.pct),N=dd(te.resetsAt,se);return l`<span
      class="usage-meter__account-window ${pd(Ae)}"
      style=${`--progress: ${Ae}%`}
    >
      <span class="usage-meter__account-key">${te.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ae}%</span>
      <span class="usage-meter__account-reset"
        >${N.length>0?`\u21BB ${N}`:""}</span
      >
    </span>`}function F(te,se){return Jg.includes(se)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${te.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function J(te,se,Ae){let N=se.status==="ok",oe=typeof se.ageSeconds=="number"&&se.ageSeconds>cd,re=a.get(md(te.key,se.number)),ye=n.get(te.key),Ee=ye!==void 0,C=ye===se.number,K=["usage-meter__account"];return se.active&&K.push("usage-meter__account--active"),N||K.push("usage-meter__account--unavailable"),oe&&K.push("usage-meter__account--stale"),l`<div class=${K.join(" ")}>
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
              >${th(se.ageSeconds)}</span
            >`}
        ${se.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Ee}
              @click=${()=>{P(te,se.number)}}
            >
              ${C?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${N?l`<div class="usage-meter__account-windows">
            ${se.windows.map($e=>b($e,Ae))}
          </div>`:l`<div class="usage-meter__account-status">
            ${F(te,se.status)}
          </div>`}
      ${re===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${re.kind}"
          >
            ${re.text}
          </div>`}
    </div>`}function ee(te,se,Ae){let N=se.accounts.filter(oe=>oe.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${te.label} · 활성 ${N} / 전체
        ${se.accounts.length}
      </h2>
      ${se.accounts.map(oe=>J(te,oe,Ae))}
    </section>`}function pe(te,se){return l`<div
      class="usage-meter__card"
      id=${ld}
      role="dialog"
      aria-label=${`${te.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${ee(te.provider,te.snapshot,se)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function de(){let te=[];for(let N of _d){let oe=o.get(N.key);oe&&te.push({provider:N,snapshot:oe})}if(te.length===0){h(),u();return}let se=te.find(N=>N.provider.key===r&&N.snapshot.accounts.length>0);se||h();let Ae=Date.now();Ge(U(te,Ae),e),e.hidden=!1,se?he(se,Ae):p()}function he(te,se){let Ae=d(),N=e.getBoundingClientRect(),oe=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${N.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,oe-N.right)}px`),Ge(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${H}
        ></div>
        ${pe(te,se)}`,Ae)}async function Se(te){try{let se=await fetch(te.endpoint);return se.ok?nh(await se.json()):null}catch{return null}}async function Le(){i+=1;let te=i,se=await Promise.all(_d.map(async Ae=>({provider:Ae,snapshot:await Se(Ae)})));if(!(t||te!==i)){for(let Ae of se)Ae.snapshot?o.set(Ae.provider.key,Ae.snapshot):o.delete(Ae.provider.key);de()}}return u(),Le(),s=setInterval(()=>{Le()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),h(),u()}}}function bd(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var sh="worker-ineligible";function ni(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function yd(e){return ni(e).includes(sh)}var oh="worker-serial";function si(e){return ni(e).includes(oh)}function oi(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var ah=new Set(["done","failed","orphaned","stopped","discarded"]),ih={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},lh={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},ch={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function ai(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:ch[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function vd(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,u=new Map,d=!1,p=null,_=null,h=null,T=new Set,L=!1,B=0,V=null,H=new Set;function P(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function j(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function O(){return o&&o()||""}async function U(){if(!s)return;let k=++B;L=!0,h=null,T.clear(),We();try{let S=await s("worker-parallel-analysis-targets",{root_dir:O()});if(k!==B||!Ke)return;let q=Array.isArray(S?.qualified)?S.qualified:[],X=Array.isArray(S?.excluded)?S.excluded:[];h={qualified:q,excluded:X};for(let ke of q)ke&&typeof ke.id=="string"&&T.add(ke.id)}catch{k===B&&Ke&&(h={qualified:[],excluded:[]},_e("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{k===B&&(L=!1,Ke&&We())}}function b(k){return Array.isArray(k.runs)?k.runs:[]}function F(){let k=P(),S=new Set;for(let q of Object.values(k.attempts||{})){let X=q;X&&typeof X.bead_id=="string"&&!ah.has(X.status)&&S.add(X.bead_id)}for(let q of Array.isArray(k.pr_wait)?k.pr_wait:[])q&&typeof q.bead_id=="string"&&S.add(q.bead_id);for(let q of Object.values(k.discard_operations||{})){let X=q;X&&X.phase!=="done"&&typeof X.bead_id=="string"&&S.add(X.bead_id)}return S}function J(k){return k.filter(S=>ee(S)===null)}function ee(k){let S=P();for(let q of Array.isArray(S.serial_lanes)?S.serial_lanes:[])if(Array.isArray(q?.entries)&&q.entries.some(X=>X.bead_id===k))return q.id;return(Array.isArray(S.queue)?S.queue:[]).some(q=>q.bead_id===k)?"parallel":null}function pe(k,S){let q=c.get(k);return q||[...S.order]}function de(k){if(k.length<2)return!1;let S=ee(k[0]);if(!S||S==="parallel")return!1;let q=P(),X=(Array.isArray(q.serial_lanes)?q.serial_lanes:[]).find(ve=>ve.id===S)?.entries.map(ve=>ve.bead_id);if(!Array.isArray(X))return!1;let ke=k.map(ve=>X.indexOf(ve));return ke.every(ve=>ve>=0)&&ke.every((ve,Me)=>Me===0||ve>ke[Me-1])}function he(){let k=P(),S=Array.isArray(k.serial_lanes)?k.serial_lanes:[],q=S.find(X=>Array.isArray(X.entries)&&X.entries.length===0);return q?q.id:S[0]?.id||"s1"}function Se(k){let S=P().bead_titles||{};return typeof S[k]=="string"?S[k]:k}async function Le(k,S){if(!s||d)return null;d=!0,We();try{return await s(k,S)}finally{d=!1,We()}}async function te(k){n?.setPending?.(!0);try{let S=await Le("worker-parallel-analysis-start",{force:k,target_ids:Array.from(T)});S&&S.applied===!1&&S.reason&&(S.reason==="target_not_qualified"&&Array.isArray(S.detail)?_e(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${S.detail.join(", ")}`,"error",3200):_e(`\uBD84\uC11D \uC2E4\uD328: ${S.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function se(){let k=j().job;!s||!k||await s("worker-parallel-analysis-cancel",{job_id:k.job_id})}async function Ae(k){if(!(!s||H.has(k))){H.add(k),We();try{let S=await s("worker-parallel-analysis-prompt",{root_dir:O(),run_id:k});if(!Ke)return;if(S?.ok===!0&&typeof S.prompt=="string"){V={run_id:k,prompt:S.prompt};return}_e(S?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{H.delete(k),We()}}}function N(){V=null,We()}async function oe(){if(!V)return;let k=await tr(V.prompt);_e(k?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",k?"success":"error",1400)}function re(k,S){a&&a(k,ai(S))}function ye(){return P().runner_catalog}function Ee(k){return Object.keys(ye()?.runners?.[k]?.models||{})}function C(k){let S=Ee(k),q=ye()?.runners?.[k]?.default_model;return typeof q=="string"&&S.includes(q)?q:S[0]||""}function K(){let k=j().settings,S=p||k.runner||"claude",q=Ee(S),X=p?C(S):k.model||q[0]||"",ke=oi(ye(),S,X),ve=k.effort||"",Me=ke.includes(ve)?ve:ke[0]||"";return{runner:S,model:X,effort:Me,models:q,efforts:ke}}async function $e(k){let S=j().settings,q=await Le("worker-parallel-analysis-settings-update",{expected_revision:S.revision,runner:k.runner,model:k.model,effort:k.effort});(!q||q.applied!==!0)&&(p=null,We(),q&&q.reason&&_e(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${q.reason}`,"error",2800))}function Ne(k){p=k,We();let S=K();$e({runner:k,model:S.model,effort:S.effort})}function Oe(k){let S=K(),q=oi(ye(),S.runner,k);$e({runner:S.runner,model:k,effort:q.includes(S.effort)?S.effort:q[0]||""})}function ze(k){let S=K();$e({runner:S.runner,model:S.model,effort:k})}async function Ye(k,S){if(!s||d)return;let q=pe(k,S),X=j();if(q.length<2||!X.last_good){_e("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ke=u.get(k)||he(),ve=()=>({snapshot_digest:X.last_good.identity_digest,group_index:k,lane:ke,ordered_bead_ids:q,expected_revision:P().revision});d=!0,We();try{let Me=await s("worker-parallel-analysis-submit",ve());Me&&Me.queue&&r&&r.set(Me.queue),Me&&Me.applied!==!0&&Me.conflict===!0&&(Me=await s("worker-parallel-analysis-submit",ve()),Me&&Me.queue&&r&&r.set(Me.queue)),Me&&Me.applied===!0?(c.delete(k),_e(`\uC9C1\uB82C \uB808\uC778 ${ke}\uC5D0 ${q.length}\uAC1C \uBC30\uCE58`,"success")):_e(`\uC81C\uCD9C \uAC70\uBD80: ${Me?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,We()}}function Y(k,S,q){c.set(k,pe(k,S).filter(X=>X!==q)),We()}function Q(k){c.delete(k),We()}function Te(k,S,q,X){let ke=[...pe(k,S)],ve=ke.indexOf(q),Me=ve+X;ve<0||Me<0||Me>=ke.length||(ke.splice(Me,0,...ke.splice(ve,1)),c.set(k,ke),We())}function Ze(){let k=j().settings,S=Object.keys(ye()?.runners||{}),q=K();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${X=>Ne(X.target.value)}
        >
          ${S.map(X=>l`<option
                value=${X}
                ?selected=${q.runner===X}
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
          @change=${X=>Oe(X.target.value)}
        >
          ${q.models.map(X=>l`<option
                value=${X}
                ?selected=${q.model===X}
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
          @change=${X=>ze(X.target.value)}
        >
          ${q.efforts.map(X=>l`<option
                value=${X}
                ?selected=${q.effort===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      ${Ve(k)}
    </div>`}function Ve(k){return!Je(k)||st(k)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:k.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${k.runner}/${k.model} · effort
        ${k.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:k.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function st(k){return k.is_default===!0&&k.compatible===!1}function Je(k){return!!(k.runner&&k.model&&k.effort)}function mt(k){return Je(k)&&k.compatible!==!1}function Pe(k){let S=Math.max(0,Math.floor(k/1e3)),q=Math.floor(S/60),X=S%60;return`${q}:${String(X).padStart(2,"0")}`}function I(k){let S=k.job;if(S){let q=typeof S.started_at=="number"?S.started_at:0,X=`${S.runner||"?"}/${S.model||"?"}`,ke=q?` \xB7 \uACBD\uACFC ${Pe(Date.now()-q)}`:"",ve=typeof S.session_id=="string"?S.session_id:"",Me=b(k).find(De=>De.run_id===S.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${X} · effort ${S.effort||"?"}${ke}</span
        >
        ${ve?l`<code class="pa-session-id" title=${ve}
              >${ve.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>re(S.job_id,Me||S)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Me?.prompt_saved!==!0||H.has(S.job_id)}
          @click=${()=>{Ae(S.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return ne()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function ne(){return n?.isPending?.()===!0}function me(k){let S=!!k.job,q=mt(k.settings),X=h!==null&&T.size===0,ke=S||d||ne()||L;return l`<div class="pa-meta">
      ${k.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(k.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${I(k)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!q||ke||X}
        @click=${()=>{te(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!q||ke||X}
        @click=${()=>{te(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!S}
        @click=${()=>{se()}}
      >
        취소
      </button>
    </div>`}function ae(k){return typeof k=="string"&&k.length>0?k:"\uBBF8\uBC30\uCE58"}function qe(k,S){S?T.add(k):T.delete(k),We()}function Qe(k){let S=Array.isArray(k.scope)?k.scope:[],q=Array.isArray(k.overlaps)?k.overlaps:[];return S.length===0&&q.length===0?l``:l`<span class="pa-target__signals">
      ${S.length>0?l`<details class="pa-target__scope" title=${S.join(`
`)}>
            <summary>scope ${S.length}</summary>
            <ul>
              ${S.map(X=>l`<li><code>${X}</code></li>`)}
            </ul>
          </details>`:""}
      ${q.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${q.join(", ")}`}
            >겹침 ${q.join(", ")}</span
          >`:""}
    </span>`}function ot(){let k=h?.qualified||[],S=h?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${L?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${k.length} \xB7 \uC81C\uC678 ${S.length}`}</span
        >
      </header>
      ${h&&k.length>0?l`<ul class="pa-targets__list">
            ${k.map(q=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${q.id}
                      .checked=${T.has(q.id)}
                      @change=${X=>qe(q.id,X.target.checked)}
                    />
                    <span class="pa-target__title">${q.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${Qe(q)}
                    <span class="pa-target__route">${q.route}</span>
                    <span class="pa-target__lane"
                      >${ae(q.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:h&&k.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${h&&S.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${S.length}</summary>
            <ul class="pa-targets__list">
              ${S.map(q=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${q.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${ih[q.reason]||q.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${ae(q.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function Xe(k){let S=typeof k.session_id=="string"&&k.session_id.length>0,q=S?k.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${k.outcome}"
        >${lh[k.outcome]||k.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(k.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${k.runner||"?"} / ${k.model||"?"} / ${k.effort||"?"}</span
      >
      ${S?l`<code class="pa-session-id" title=${q}
            >${q.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${k.outcome==="failure"&&k.reason?l`<span class="pa-run-row__reason">${k.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>re(k.run_id,k)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${k.prompt_saved!==!0||H.has(k.run_id)}
          @click=${()=>{Ae(k.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function dt(k){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${k.length>0?l`<ul class="pa-runs__list">
            ${k.map(S=>Xe(S))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function yt(){return V?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${N}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${V.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{oe()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${N}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${V.prompt}</pre
        >
      </section>
    </div>`:""}function gt(k,S){let q=pe(k,S),X=F(),ke=q.filter(et=>X.has(et)),ve=J(q),Me=de(q),De=Array.isArray(P().serial_lanes)?P().serial_lanes:[],Rt=u.get(k)||he(),at=S.eligible!==!0||q.length<2||ke.length>0||ve.length>0||Me||d;return l`<section class="pa-group" data-group-index=${String(k)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${S.confidence}</span>
        ${S.categories.map(et=>l`<span class="pa-group__category">${et}</span>`)}
        ${Me?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${S.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${ve.length>0?l`<span class="pa-group__stale"
              >stale — ${ve.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${S.reason}</p>
      <ol class="pa-group__members">
        ${q.map((et,Dt)=>l`<li class="pa-member" data-bead-id=${et}>
              <span class="pa-member__seq">${Dt+1}</span>
              <span class="pa-member__title">${Se(et)}</span>
              ${X.has(et)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${et}
                ?disabled=${Dt===0}
                aria-label=${`${et} \uC704\uB85C`}
                @click=${()=>Te(k,S,et,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${et}
                ?disabled=${Dt===q.length-1}
                aria-label=${`${et} \uC544\uB798\uB85C`}
                @click=${()=>Te(k,S,et,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${et}
                aria-label=${`${et} \uC81C\uC678`}
                @click=${()=>Y(k,S,et)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${S.evidence.map(et=>l`<li class="pa-evidence">
              <code>${et.path}</code>
              <span class="pa-evidence__locator">${et.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Q(k)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${et=>{u.set(k,et.target.value),We()}}
          >
            ${De.map((et,Dt)=>l`<option
                  value=${et.id}
                  ?selected=${Rt===et.id}
                >
                  직렬 ${Dt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${at}
          @click=${()=>{Ye(k,S)}}
        >
          제출
        </button>
      </footer>
    </section>`}function pt(k){let S=Array.isArray(k.issues)?k.issues:[],q=S.filter(ke=>ke.verdict==="parallel_ok").length,X=S.filter(ke=>ke.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${q}</span>
      <span>uncertain ${X}</span>
    </div>`}function kt(){let k=Ke&&!!j().job;if(k&&_===null){_=setInterval(()=>We(),1e3);return}!k&&_!==null&&(clearInterval(_),_=null)}function We(){let k=j();p&&k.settings.runner===p&&(p=null);let S=k.last_good?.result;kt(),Ge(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${ue}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${Ze()} ${me(k)} ${ot()}
            ${S?l`${S.groups.map((q,X)=>gt(X,q))}
                ${S.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${pt(S)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${dt(b(k))}
          </div>
        </div>
        ${yt()}
      `,i)}let Ke=!1,Ue=()=>{Ke=!1,V=null,B+=1,kt()},ct=k=>{k.target===k.currentTarget&&ue()};i.addEventListener("close",Ue),i.addEventListener("cancel",Ue),i.addEventListener("click",ct);let At=null;r&&r.subscribe&&(At=r.subscribe(()=>{Ke&&We()}));let A=null;n&&n.subscribe&&(A=n.subscribe(()=>{Ke&&We()}));function M(){Ke||(Ke=!0,We(),U(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function ue(){Ke&&(Ke=!1,V=null,B+=1,kt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:M,close:ue,destroy(){Ke=!1,_!==null&&(clearInterval(_),_=null),i.removeEventListener("close",Ue),i.removeEventListener("cancel",Ue),i.removeEventListener("click",ct),At&&(At(),At=null),A&&(A(),A=null),i.remove()}}}var wd=new Set(["sh","bash","zsh","dash","ksh"]),kd=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function $d(e){let t=e.split("/");return t[t.length-1]||""}function uh(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=$d(r[0]);if(n!=="env")return wd.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&wd.has($d(s))}function dh(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function ph(e){let t=[],r=0;kd.lastIndex=0;for(let n of e.matchAll(kd)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:dh(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function fh(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function xd(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",c=0,u=null,d=!1;function p(O,U){return U?ph(O).map(b=>b.kind==="plain"?b.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${b.kind}"
            >${b.text}</span
          >`):O}function _(){if(!s)return l``;let O=o==="ready"&&uh(a),U=o==="ready"?a.split(`
`):[];return l`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>P()}
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
              @click=${()=>{T()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>P()}
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
                  ${U.map((b,F)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${F+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(b,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function h(){Ge(_(),n)}async function T(){if(o!=="ready")return;let O=await tr(a);_e(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function L(O){O.key==="Escape"&&s&&(O.preventDefault(),P())}function B(){d||(document.addEventListener("keydown",L),d=!0)}function V(){d&&(document.removeEventListener("keydown",L),d=!1)}async function H(O,U=null){let b=++c;B(),s={...O},u=U||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",h(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let J=t?t():"";if(!J){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",h();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",h();return}let ee="/api/repo-ops-script?workspace="+encodeURIComponent(J)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let pe=await r(ee),de=await pe.json().catch(()=>({}));if(b!==c)return;if((t?t():"")!==J){P();return}if(!pe.ok||!de||de.ok!==!0){o="error",i=fh(de&&typeof de.error=="string"?de.error:""),h();return}s={lane:de.lane,base_sha:de.base_sha,path:de.path,base_ref:de.base_ref},a=String(de.content),o="ready",h()}catch{if(b!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",h()}}function P(){c+=1,V(),s=null,a="",h();let O=u;u=null,O?.isConnected&&O.focus()}function j(){P(),n.remove()}return{open:H,close:P,destroy:j}}function Ad(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let b=o();return typeof b.revision=="number"?b.revision:0}function i(b){t&&b&&b.queue&&typeof b.queue=="object"&&t.set(b.queue)}function c(){let b=o().workspace_info;return b&&typeof b=="object"?b:{}}function u(b,F){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${b}"
      >${F}</span
    >`}function d(b){if(typeof b!="number"||!Number.isFinite(b))return"";let F=b/6e4;return Number.isInteger(F)?`timeout ${F}\uBD84`:`timeout ${Math.round(b/1e3)}\uCD08`}function p(b){let F=d(b);return F?u("config",F):""}function _(b,F,J){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${J.script}
      @click=${ee=>{s&&s({lane:b,base_sha:F.base_sha,path:J.script,base_ref:F.base_ref},ee.currentTarget)}}
    ></button>`}function h(){let b=o().repo_ops_opt_out;return{verify:b?.verify===!0,deploy:b?.deploy===!0}}function T(b,F){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!F}
        @change=${J=>{H(b,!J.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function L(b){let F=typeof b.base_sha=="string"?b.base_sha:"",J=`${b.source_path||"repo-ops/config.toml"} @ ${b.base_ref||"?"}${F?`@${F.slice(0,7)}`:""}`,ee=h(),pe=!!b.verify&&ee.verify,de=!!b.deploy&&ee.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${J}</span>
      </p>
      <div
        class="worker-repo-ops__lane${pe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${b.verify?l`${_("verify",b,b.verify)}
              ${p(b.verify.timeout_ms)}
              ${pe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${pe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":b.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${b.verify?T("verify",ee.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${de?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${b.deploy?l`${_("deploy",b,b.deploy)}
              ${p(b.deploy.timeout_ms)}
              ${de?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${de?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":b.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${b.deploy?T("deploy",ee.deploy):""}
      </div>
    </section>`}function B(b){let F=b.repo_ops&&typeof b.repo_ops=="object"?b.repo_ops:null;return F&&(F.status==="resolved"||F.status==="absent")?L(F):F&&(F.status==="pending"||F.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${F.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${F.error_code?l` — <code>${F.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function V(b){if(!r)return;let F=await r("worker-auto-repair-toggle",{on:b,expected_revision:a()});if(i(F),F&&F.conflict){let J=await r("worker-auto-repair-toggle",{on:b,expected_revision:a()});i(J)}n()}async function H(b,F){if(!r)return;let J=await r("worker-repo-ops-opt-out-toggle",{kind:b,opted_out:F,expected_revision:a()});if(i(J),J&&J.conflict){let ee=await r("worker-repo-ops-opt-out-toggle",{kind:b,opted_out:F,expected_revision:a()});i(ee)}n()}let P={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function j(b,F,J){return l`<div class="worker-repo-ops__policy-group" data-policy=${J}>
      <div class="worker-repo-ops__policy-label">${b}</div>
      <ul class="worker-repo-ops__policy-list">
        ${F.map(ee=>l`<li data-token=${ee}>
              ${P[ee]||ee}
            </li>`)}
      </ul>
    </div>`}function O(b){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${b.map(F=>{let J=[P[F.trigger]||F.trigger];return Number.isInteger(F.attempts_per_operation_attempt)?J.push(`operation\uB2F9 ${F.attempts_per_operation_attempt}\uD68C`):Number.isInteger(F.attempts)?J.push(`${P[F.budget]||F.budget} ${F.attempts}\uD68C`):Number.isInteger(F.sessions_per_user_action)&&J.push(`${F.sessions_per_user_action}\uD68C`,P[F.user_actions]||F.user_actions),F.applies_when&&J.push(P[F.applies_when]||F.applies_when),l`<li data-token=${F.id}>
            <strong>${P[F.id]||F.id}</strong>
            <span>${J.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function U(){let b=o(),F=b.auto_repair!==!1,J=b.repo_operation_policy&&typeof b.repo_operation_policy=="object"?b.repo_operation_policy:null,ee=Array.isArray(b.repo_operations)?b.repo_operations:[],pe=ee.find(Le=>Le.state==="repairing"),de=ee.filter(Le=>Le.state==="failed"||Le.state==="repairing"),he=de.length?Math.min(...de.map(Le=>typeof Le.repair?.remaining=="number"?Le.repair.remaining:0)):J?.auto_repair?.resolution_ladder?.find(Le=>Le.id==="auto_repair_session")?.attempts??1,Se=Array.isArray(J?.auto_repair?.resolution_ladder)?J.auto_repair.resolution_ladder:[];return l`<section
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
          .checked=${F}
          @change=${Le=>{V(Le.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${F?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${he}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${pe?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${pe.repair?.owner_bead||pe.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${J?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(J.worker_automatic||[]).length} · 해결 사다리
                ${Se.length} · 금지
                ${(J.never_automatic||[]).length}</span
              >
            </summary>
            ${j("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",J.worker_automatic||[],"worker-automatic")}
            ${J.supported===!1||J.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${J.schema_version})`}
                </div>`:O(Se)}
            ${j("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",J.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${B(c())} ${U()}
      </details>`}}}var Cd=20,_h=5,mh=new Set(["failed","repairing","running","queued","retry_pending"]),Sd={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Ed={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function gh(e,t,r=Cd){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function hh(e){if(e.type==="cleanup")return!0;let t=e.operation;return mh.has(t.state)&&!t.dismissed&&!t.superseded_by}function bh(e,t,r={}){let n=gh(e,t,1/0),s=r.expanded===!0?Cd:_h,o=new Set(n.slice(0,s)),a=n.filter(i=>o.has(i)||hh(i));return{visible:a,hidden:n.length-a.length}}function Td(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function yh(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Rd(e){let t=e.filter(r=>r.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>l`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Id(e,t="",r=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function vh(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Ed,n)?Ed[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function wh(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${vo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Td(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Sd,t.kind)?Sd[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${bo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${ls(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Td(e)}"
          >${yh(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Id(mu(t.failure_kind,n)):""}
      ${vh(t)}
      ${Rd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${bo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function kh(e){let t=e.cleanup,r=on(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${vo(e.at)||"\u2014"}</span
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
        ${Iu(t.step).map(n=>l`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Id(xo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Rd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function $h(e){let t=typeof e.hidden=="number"?e.hidden:0,r=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(n=>n.type==="cleanup"?kh(n):wh(n))}
        </ul>`}
    ${t>0||r?l`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${r?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function Ld(e,t={}){let r=null;function n(){if(r===null){Ge(l``,e);return}let a=bh(r.operations,r.cleanup_failures,{expanded:r.expanded});Ge($h({events:a.visible,hidden:a.hidden,expanded:r.expanded,repo:r.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&r&&(r.expanded=!r.expanded,n())});function s(a){r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&(r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:r.expanded},n())}}}var xh=St("views:worker"),Ah="tab:worker:ready",Sh="tab:worker:blocked",Eh="tab:worker:in-progress",Th="tab:worker:resolved",Ch="tab:worker:closed",Lo=1,Od=5;function Md(e){return io(e).path.length>0}var Rh=new Set(["quick_fix","spec_backed","full_plan"]);function Pd(e){return typeof e=="string"&&Rh.has(e)}var Fd="beads-ui.worker.candidate-filter",ii={show_blocked:!1,spec:"all"};function Ih(){try{let e=window.localStorage.getItem(Fd);if(!e)return{...ii};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ii};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ii}}}function Lh(e){try{window.localStorage.setItem(Fd,JSON.stringify(e))}catch{}}function Oh(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=r(i),u=n(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Mh=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],jd="bdui.worker.candidate_sort",Ph=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Oo="spec";function Dh(){try{let e=window.localStorage.getItem(jd);return e==="board"||e==="created"||e==="spec"?e:Oo}catch{return Oo}}function Nh(e){try{window.localStorage.setItem(jd,e)}catch{}}var Bd="bdui.worker.done-range";function qh(){try{let e=window.localStorage.getItem(Bd);return or(e)?e:er}catch{return er}}function Fh(e){try{window.localStorage.setItem(Bd,e)}catch{}}var jh="(max-width: 640px)",Ud="beads-ui.worker.lane-collapsed",ms={queue:!0,done:!0};function Bh(){try{let e=window.localStorage.getItem(Ud);if(!e)return{...ms};let t=JSON.parse(e);return!t||typeof t!="object"?{...ms}:{queue:typeof t.queue=="boolean"?t.queue:ms.queue,done:typeof t.done=="boolean"?t.done:ms.done}}catch{return{...ms}}}function Uh(e){try{window.localStorage.setItem(Ud,JSON.stringify(e))}catch{}}function Dd(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Wh(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Zr):(n.sort(Ms(r)),t==="board"?n:[...n.filter(Md),...n.filter(s=>!Md(s))])}function zh(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Hh(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Nd(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Gh(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Vh(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Kh(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Yh(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function li(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Zh(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function qd(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function Qh(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):qd(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${qd(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Nd(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Nd(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Xh(e,t,r,n,s=null,o=null,a=null,i=!1,c=null,u=!0,d=null,p=null,_=null,h={},T=!1,L=!1,B={}){let V=!!c&&c.position>0,H=!!c?.continuation_action&&c.continuation_action.continuation===null,P=!!c&&c.active===!0,j=c&&c.failure||null,O=Vh(c?c.waiting:null,_),U=r[e]||null,b=U&&U.gate?U.gate:null,F=U&&U.pr?U.pr:null,J=Zh(_),ee=Kh(c?c.resolution:null),pe=Yh(c?c.head_review:null),de=c&&c.head_review||null,he=c&&c.authority||null,Se=!!de&&["pending","reviewing","revising"].includes(de.state),Le=V&&!P&&(de?.state==="failed"||!he||he.source==="automatic"&&!L),te=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ee?ee.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":O,se=!!b&&b.base_badge==="\uCDA9\uB3CC",Ae=!!b&&b.enabled===!0,N=fs({bead_id:e,merge_sha:B.merge_sha,cleanup_cursor:B.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:B.repo_operations}),oe=Io(N),re=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!b&&b.tier==="merged",ye=i&&!!n&&!!b&&b.tier==="merged",Ee=Le&&(Ae||se||b?.reason==="base_behind"||b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"||re||ye),C=i&&se&&u===!1,K=yr(h,e,{external:i,merge_active:P||N?.step==="merge",merge_queued:V,conflict_active:!!a,cleanup_active:oe,merged:!!n||b?.tier==="merged"}),$e=!!K.operation,Ne=!re&&!!n&&n.step==="repo_operations",Oe=Qh({continuation_required:H,merge_step:N,conflict_badge:te,conflict_live:ee?.live===!0||a==="running",head_review:de&&pe?{...pe,state:de.state,failure_reason:de.failure_reason}:null,recovery:J,cleanup_failed:n,cleanup_label:n?on(n.step):null,base_exception:p,conflicting:se,gate:b,receipt_check:U&&U.receipt_check?U.receipt_check:null,queue_failure:j,auto_skip:d,queued:V,queue_active:P,queue_position:c?c.position:0,activity:te?null:o&&o.activity||null}),ze=Oe?.live===!0&&Oe.title?l`<span title=${Oe.title}>${Oe.label}</span>`:Oe?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:n&&N?.active!==!0?Ro(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:T,external:i,pr_number:F&&typeof F.number=="number"?F.number:null,pr_url:F&&typeof F.url=="string"?F.url:"",completion_badge:Oe?.live!==!0&&Oe?.title?Oe.label:null,completion_title:Oe?.title||"",completion_repair_pr_url:J?J.repair_pr_url:"",completion_repair_pr_number:J?J.repair_pr_number:null,badges:ze?[ze]:[],live_badge:Oe?.live===!0?ze:null,usage:s,alert:Oe?.alert===!0,merge_action:b?.tier==="merged"&&!re&&!ye||Ne?!1:!V||H||Le,timeline_action:Ne,cancel_action:V&&!H,cancel_enabled:(!P||Se)&&!(J&&J.lock_actions),cancel_title:J&&J.lock_actions?`${J.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:P&&!Se?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Se?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:K,discard_action:K.action,merge_step:N,discard_enabled:K.enabled,discard_title:K.title,merge_enabled:!N&&!a&&!$e&&!p&&!(J&&J.lock_actions)&&!C&&!Ne&&(Ae||se||b?.reason==="base_behind"||b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"||re||ye||Ee),merge_label:H?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":re||ye?"\uC815\uB9AC \uC7AC\uAC1C":se&&!N&&!re?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":b?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Le?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:$e?K.error?`\uD3D0\uAE30 \uC2E4\uD328: ${K.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${K.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:H?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":N?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${N.label}`:ye?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":C?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":re?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":se?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ae?`\uBA38\uC9C0 (${b.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:b&&b.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${b&&b.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ci(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,doneRange:d,onDoneRangeChange:p}=t,_=n?Ds(n,i):null,h=js({transport:r,uiOrderStore:i}),T=null,L=[],B=Ih(),V=null,H=Dh(),P=or(d)?d:qh(),j=new Map;function O(){let f=Rr.find($=>$.value===P);return f?f.label:"\uC624\uB298"}let U=Bh(),b=!1,F=new Set,J=new Set,ee=new Set,pe=new Set,de=new Set,he={},Se=null,Le=0,te=null,se=[];function Ae(f){return Se===f?he:{}}async function N(){if(!r)return;let f=u?.()||"";if(Se===f||te&&te.key===f&&te.generation===Le)return;let $=++Le;te={key:f,generation:$};let G=null;try{G=await Promise.resolve(r("get-session-defaults",{}))}catch(m){if($!==Le)return;te=null,xh("get-session-defaults failed: %o",m),Fe();return}$===Le&&(he=G&&typeof G.values=="object"&&G.values!==null?{...G.values}:{},Se=f,te=null,Fe())}function oe(){Se=null,Le+=1,N()}let re=document.createElement("div");re.className="worker-console";let ye=document.createElement("div");ye.className="worker-top";let Ee=document.createElement("div");Ee.className="worker-drawer-overlay",Ee.hidden=!0;let C=document.createElement("div");C.className="worker-drawer-overlay__backdrop";let K=document.createElement("div");K.className="worker-drawer-host";let $e=document.createElement("div");$e.className="worker-drawer-host",$e.hidden=!0,Ee.append(C,K,$e);let Ne=document.createElement("div");Ne.className="worker-lanes-host",re.append(ye,Ee,Ne),e.appendChild(re);let Oe=null,ze=null,Ye=Tn(K,{transport:r,sessionLogStore:a,onClose:()=>{Oe=null,ze=null,Ee.hidden=!0,Fe()}}),Y=Ld($e,{onClose:()=>{$e.hidden=!0,Ee.hidden=!0,Fe()}}),Q=xd({getWorkspacePath:u||(()=>"")}),Te=u&&u()||"",Ze=Ad({queueStore:s,transport:r,onChanged:()=>Fe(),onOpenScript:(f,$)=>{Q.open(f,$)}}),Ve=o?vd(re,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:u,onOpenTranscript:(f,$)=>Mt(f,$)}):null;function st(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Lo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Je(){let f=st(),$=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,G=Array.isArray(f.serial_lanes)?f.serial_lanes:[],m=[];for(let ce of G){if(m.length>=$)break;!ce||typeof ce.id!="string"||!/^s[1-5]$/.test(ce.id)||!Array.isArray(ce.entries)||m.push({id:ce.id,label:`\uC9C1\uB82C ${ce.id.slice(1)}`,count:ce.entries.length})}return m.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},...m]}function mt(f){if(!V||!f.some(G=>G.id===V))return null;let $=Je();return $?{bead_id:V,lanes:$}:null}function Pe(){let f=st();return typeof f.revision=="number"?f.revision:0}function I(f){f&&f.queue&&s&&s.set(f.queue)}function ne(){let f=st().queue;return Array.isArray(f)?f.length:0}async function me(f,$,G){if(!r)return;let m=()=>({bead_id:f,...$==="parallel"?{}:{lane:$},...G===void 0?{}:{index:G},expected_revision:Pe()}),y=await r("worker-queue-place",m());I(y),y&&y.conflict&&await r("worker-queue-place",m()).then(I)}async function ae(f,$,G){if(!r)return;let m=()=>({bead_id:f,...$==="parallel"?{}:{lane:$},to_index:G,expected_revision:Pe()}),y=await r("worker-queue-reorder",m());I(y),y&&y.conflict&&await r("worker-queue-reorder",m()).then(I)}async function qe(f){if(!r)return;let $=await r("worker-queue-remove",{bead_id:f,expected_revision:Pe()});I($),$&&$.conflict&&await r("worker-queue-remove",{bead_id:f,expected_revision:Pe()}).then(I)}async function Qe(f){if(!r||!f)return;let $=await r("worker-attempt-pause",{attempt_id:f});$&&$.paused===!1&&$.reason&&_e(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${$.reason}`,"error",2400)}async function ot(f){if(!r||!f)return;let $=await xn();if($===null)return;let G=async(y={})=>await r("worker-attempt-resume",{attempt_id:f,expected_revision:Pe(),...$!==""?{instructions:$}:{},...y}),m=await G();I(m),m&&m.conflict&&(m=await G(),I(m)),m=await wr(m,(y,ce)=>G({continuation:y,decision_token:ce}),{onResult:I,refresh:()=>G()}),m&&m.resumed===!1&&!m.conflict&&m.reason&&_e(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Xe(f){if(!r||!f)return;let $=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:Pe()});I($),$&&$.conflict&&($=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:Pe()}),I($)),$&&$.dismissed===!1&&!$.conflict&&$.reason&&_e(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${$.reason}`,"error",2400)}async function dt(f,$,G=!0){if(!r)return null;let m=r,y=await m(f,{...$,expected_revision:Pe()});return I(y),y&&y.conflict&&G&&(y=await m(f,{...$,expected_revision:Pe()}),I(y)),y}async function yt(f){if(!r||!f)return;let $=st().merge_queue?.find(m=>m.bead_id===f)?.continuation_action;if($?.mismatch&&$.continuation===null){await pt(f,$.mismatch);return}F.add(f),Fe();let G;try{G=await dt("worker-merge-queue-add",{bead_id:f})}finally{F.delete(f),Fe()}!G||G.conflict||G.applied||_e(Gh(G.reason),"error",2400)}async function gt(f){if(!(!r||!f||J.has(f))){J.add(f),Fe();try{let $=await r("worker-cleanup-retry",{bead_id:f,expected_revision:Pe()});I($),$&&!$.retried&&!$.conflict&&$.reason&&_e(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${$.reason}`,"error",2400)}finally{J.delete(f),Fe()}}}async function pt(f,$){let G=await wr({continuation_mismatch:$},(y,ce)=>dt("worker-merge-queue-add",{bead_id:f,continuation:y,decision_token:ce},!1)),m=G?.queue?.merge_queue?.find(y=>y.bead_id===f)?.continuation_action;if(G?.applied!==!0&&m?.continuation===null&&m.mismatch){await pt(f,m.mismatch);return}G&&G.applied===!1&&!G.conflict&&_e("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function kt(f){if(!r)return;let $=await dt("worker-merge-auto-toggle",{on:f});!$||$.conflict||_e(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function We(f){if(!r||!f)return;let $=await dt("worker-merge-queue-remove",{bead_id:f});$&&!$.conflict&&!$.applied&&$.reason==="merge_active"&&_e("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ke(){await dt("worker-merge-queue-remove",{all:!0})}async function Ue(f,$=null,G="unmerged",m=null){if(!r||!f)return;let y=cs(f,G);if(!(!!m||typeof globalThis.confirm!="function"||globalThis.confirm(y)))return;let le=await r("worker-discard",{bead_id:f,...$?{attempt_id:$}:{},...m?{operation_id:m}:{},expected_revision:Pe()});if(I(le),le&&le.conflict&&(le=await r("worker-discard",{bead_id:f,...$?{attempt_id:$}:{},...m?{operation_id:m}:{},expected_revision:Pe()}),I(le)),le&&le.discarded===!0){_e(wo(le),"success",5e3);return}if(le&&le.reason){_e(`\uD3D0\uAE30 \uC2E4\uD328: ${le.reason}`,"error",2800);return}if(le&&le.accepted&&le.pending==="merged_revert"){_e("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(le&&le.accepted&&!le.discarded){_e(`\uD3D0\uAE30 \uC9C4\uD589: ${le.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}le&&!le.conflict&&_e("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ct(f,$,G){if(!(!r||!$||!G||pe.has($))){pe.add($),Fe();try{let m=await r(f,{bead_id:$,action_id:G,expected_revision:Pe()});I(m),m?.conflict?_e("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!m?.ok&&m?.reason&&_e(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(m.reason)}`,"error",2800)}finally{pe.delete($),Fe()}}}async function At(f,$){if(!r||!$||ee.has($))return;ee.add($),Fe();let G;try{let m=async(y={})=>await r(f,{bead_id:$,expected_revision:Pe(),...y});G=await m(),I(G),G&&G.conflict&&(G=await r(f,{bead_id:$,expected_revision:Pe()}),I(G)),f==="worker-revise-fix"&&(G=await wr(G,(y,ce)=>m({continuation:y,decision_token:ce}),{onResult:I,refresh:()=>m()}))}finally{ee.delete($),Fe()}if(!(!G||G.conflict)){if(G.ok){_e(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}_e(`\uCC98\uBD84 \uAC70\uBD80: ${G.reason||""}`,"error",3e3)}}async function A(f){if(!r)return;let $=await r("worker-automation-toggle",{on:f,expected_revision:Pe()});I($),$&&$.conflict&&await r("worker-automation-toggle",{on:f,expected_revision:Pe()}).then(I)}async function M(f){if(!r||!f)return;let $=await r("worker-repo-operation-repair",{operation_id:f});if(I($),$&&$.ok===!1){_e(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${$.reason||""}`,"error",3e3);return}$&&$.ok===!0&&_e("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function ue(f){if(!r||!f)return;let $=await r("worker-repo-operation-dismiss",{operation_id:f});I($),$&&$.ok===!1&&_e(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${$.reason||""}`,"error",3e3)}async function k(f){if(!r||!Number.isFinite(f))return;let $=Math.max(Lo,Math.floor(f)),G=await r("worker-queue-set-slots",{slots:$,expected_revision:Pe()});I(G),G&&G.conflict&&await r("worker-queue-set-slots",{slots:$,expected_revision:Pe()}).then(I)}async function S(f){if(!r||!Number.isInteger(f)||f<1||f>Od)return;let $=st(),G=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).slice(f).reduce((ce,le)=>ce+(Array.isArray(le?.entries)?le.entries.length:0),0),m=()=>({count:f,expected_revision:Pe()}),y=await r("worker-queue-set-serial-lane-count",m());I(y),y&&y.conflict&&(y=await r("worker-queue-set-serial-lane-count",m()),I(y)),y&&y.applied&&G>0&&_e(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${G}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function q(){let f=st(),$=_?_.selectBoardColumn(Ah,"ready"):[],G=_?_.selectBoardColumn(Sh,"blocked"):[],m=_?_.selectBoardColumn(Ch,"closed"):[],y=_?_.selectBoardColumn(Eh,"in_progress"):[],ce=_?_.selectBoardColumn(Th,"resolved"):[],le=qs([...$,...G,...y,...ce,...m]),je=new Map;for(let g of[...$,...G,...y])g&&g.id&&!je.has(g.id)&&je.set(g.id,g);let xe={...Ae(u?.()||"")};for(let g of["orchestration_model","orchestration_effort","orchestration_speed"]){let z=f[g];typeof z=="string"&&(xe[g]=z)}function x(g,z){let fe=je.get(g);if(!fe)return null;let He=fe.metadata&&typeof fe.metadata=="object"?fe.metadata:{},_t=fe.workflow?.route,jt=He.route,Nt=Pd(_t)?_t:Pd(jt)?jt:null;return Qt({pin:He,global:xe,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:Nt,controller_runtime:z})}function Z(g){let z=g.runner||null,fe=x(g.bead_id,z),He=Ao(g),_t=fe?qr(fe,z):null;return He||_t?{orchestration:He,worker:_t}:null}let D=new Map;function Ie(g){if(D.has(g))return D.get(g)??null;let z=x(g,null),fe=null;if(z){let He=gr(f.runner_catalog??null,z.orchestration_model.value??""),_t=He===null?z:x(g,He),jt=sn(_t,f.runner_catalog??null),Nt=qr(_t,He);fe=jt||Nt?{orchestration:jt,worker:Nt}:null}return D.set(g,fe),fe}function ut(g){let z=Fs(le,g);return z.total===0?null:z}let it=f.bead_titles||{},rt=new Map;for(let[g,z]of Object.entries(it))typeof z=="string"&&z.length>0&&rt.set(g,z);for(let g of[...$,...G])rt.set(g.id,g.title||g.id);let nt=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},Lt=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},Jt=new Map;for(let[g,z]of Object.entries(Lt))Array.isArray(z)&&Jt.set(g,si(z));for(let g of[...$,...G]){let z=g.labels;Array.isArray(z)&&!Jt.has(g.id)&&Jt.set(g.id,si(z))}let an=new Map,ln=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(ln)?ln:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let z=g.members.map(He=>{let _t=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(jt=>jt.entries.some(Nt=>Nt.bead_id===He));return _t?_t.id:null});if(!(z.every(He=>He!==null)&&new Set(z).size===1))for(let He of g.members)an.set(He,g.members.filter(_t=>_t!==He))}let gs=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},cn=new Map;for(let[g,z]of Object.entries(nt))z&&typeof z=="object"&&cn.set(g,z);for(let g of[...$,...G])cn.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let Br=g=>cn.get(g)||{},Ur=f.pr_wait||[],un=f.pr_observations||{},hs=f.pr_activity||{},Be=f.cleanup_failed||{},Tt=Object.entries(Be).map(([g,z])=>({bead_id:g,step:z&&z.step?z.step:"",reason:z&&z.reason?z.reason:"",at:z&&typeof z.at=="number"?z.at:null,detail:z&&typeof z.detail=="string"?z.detail:null,output_tail:z&&typeof z.output_tail=="string"&&z.output_tail?z.output_tail:void 0,log_path:z&&typeof z.log_path=="string"&&z.log_path?z.log_path:void 0,retry_count:z&&typeof z.retry_count=="number"&&Number.isInteger(z.retry_count)&&z.retry_count>0?z.retry_count:0,failure_code:z&&typeof z.failure_code=="string"?z.failure_code:void 0,subject_id:z&&typeof z.subject_id=="string"?z.subject_id:void 0,repair_eligible:!!(z&&z.repair_eligible),repair:z&&z.repair?z.repair:void 0})),dn=f.queue||[],tp=new Set([...dn.map(g=>g.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(z=>z.bead_id)),...Ur.map(g=>g.bead_id),...f.done.map(g=>g.bead_id)]),rp=new Set(G.map(g=>g.id)),np=i?i.get()?.order||{}:{},fi=new Set,_i=[];for(let g of[...$,...G])tp.has(g.id)||fi.has(g.id)||zh(g)||(fi.add(g.id),_i.push(g));L=Wh(_i,H,np);let sp=f.admission||{},mi=g=>{let z=sp[g];if(!z)return"";if(z.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let fe=typeof z.reason=="string"?z.reason:"",He=fe.indexOf(":");return He>0&&He<fe.length-1?`\u26D4 ${fe.slice(0,He)} (${fe.slice(He+1)})`:`\u26D4 ${fe}`},op=L.map(g=>{let z=io(g),fe=z.path.length>0,He=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",_t=!Object.hasOwn(g,"description")||typeof g.description=="string"&&g.description.trim().length>0,jt=Object.hasOwn(g,"labels")&&yd(g.labels),Nt=!jt&&(He?_t:fe&&!z.conflict),$t=rp.has(g.id),dr=[];$t&&dr.push(Hh(g)),He&&!_t?dr.push("missing_description"):!He&&z.conflict?dr.push("spec_id_conflict"):!He&&!fe&&dr.push("spec \uC5C6\uC74C");let As=mi(g.id);return As&&dr.push(As),{id:g.id,title:g.title||g.id,reason:dr.join(" \xB7 "),draggable:Nt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:He,status:g.status,worker_ineligible:jt,blocked:$t,has_spec:fe,exec_chips:Ie(g.id)}}),Mo=Oh(op,B),ap=Mo.visible,ip=f.revise_parked||{},bs=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Po=(g,z)=>g.map((fe,He)=>{let _t=z!=="done",jt=z!=="done"&&z!=="queue",Nt=_t?ip[fe.bead_id]:null,$t=_t?yr(bs,fe.bead_id):null,dr=$t?.operation?$t:null,As=_t&&Jt.get(fe.bead_id)===!0,Fi=gs[fe.bead_id]||[],jo=f.admission&&typeof f.admission=="object"?f.admission[fe.bead_id]:null,Bo=_t?du(jo,!!dr||pe.has(fe.bead_id)):null,vp=_t&&!Bo?mi(fe.bead_id):null,wp=_t?[vp]:[],ji=_t&&Fi.length>0&&typeof jo?.reason=="string"&&jo.reason.startsWith("not_ready")?[`\u23F8 ${Fi.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Uo=_t?an.get(fe.bead_id):void 0;return Uo&&Uo.length>0&&ji.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Uo.join(", ")}\uC640`),{id:fe.bead_id,title:rt.get(fe.bead_id)||fe.bead_id,reason:wp.filter(Boolean).join(" \xB7 "),draggable:_t&&!dr&&!Bo,done:z==="done",lane:z,seq:jt?He+1:void 0,worker_serial:As,discard:dr,stale_work:Bo,badges:[...ji,...Nt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Nt,revise_action:!!Nt,revise_enabled:!!Nt&&!dr&&!ee.has(fe.bead_id),revise_title:Nt?Nt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Nt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:z==="done"?ir(f.attempts||{},fe.bead_id):null,work_ms:z==="done"?yo(f.attempts||{},fe.bead_id):null,done_at:z==="done"&&typeof fe.added_at=="number"?fe.added_at:void 0,exec_chips:_t?Ie(fe.bead_id):null,...Br(fe.bead_id)}}),pn=f.attempts?Object.values(f.attempts):[],Do=new Set;for(let g of pn)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&Do.add(g.resumed_from);let gi=new Map;for(let g of pn)gi.set(g.bead_id,g.attempt_id);let ys=new Map;for(let g of pn)ys.set(g.attempt_id,g);function No(g){let z=new Set,fe=g;for(;fe&&!z.has(fe.attempt_id);){if(fe.conflict_resolution===!0)return!0;z.add(fe.attempt_id),fe=typeof fe.resumed_from=="string"&&fe.resumed_from.length>0&&ys.get(fe.resumed_from)||null}return!1}let vs=typeof f.declared_base=="string"?f.declared_base:null;function lp(g){let z=null;for(let fe of pn)!fe||fe.bead_id!==g||No(fe)||(z===null||(typeof fe.started_at=="number"?fe.started_at:0)>=(typeof z.started_at=="number"?z.started_at:0))&&(z=fe);return z&&typeof z.target_base=="string"?z.target_base:null}let hi=[],bi=[],cp=bd(f),yi=g=>{let z=typeof g.session_id=="string"&&g.session_id.length>0,fe=Do.has(g.attempt_id);return{eligible:z&&!fe,reason:z?fe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},ur=null;for(let g of pn){let z=g.status==="paused"&&!Do.has(g.attempt_id);if(g.status==="running"||z)bi.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:rt.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:z,conflict_resolution:No(g),base_exception:li(vs,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:yr(bs,g.bead_id,{attempt_id:g.attempt_id}),usage:ir(f.attempts||{},g.bead_id),rollup:ut(g.bead_id),rollup_expanded:de.has(g.bead_id),exec_chips:Z(g),...Br(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&cp(g)){let fe=yi(g);hi.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:rt.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:yr(bs,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:fe.eligible,resume_reason:fe.reason,conflict_resolution:No(g),base_exception:li(vs,g.target_base),usage:ir(f.attempts||{},g.bead_id),rollup:ut(g.bead_id),rollup_expanded:de.has(g.bead_id),exec_chips:Z(g),...Br(g.bead_id)}),ur=g}}let ws=[...hi,...bi].map(g=>{let z=ys.get(g.attempt_id),fe=z?.quickfix_landing;if(z?.quickfix_lane!==!0||!fe||typeof fe!="object")return g;let He=typeof fe.reason=="string"&&fe.reason.length>0?fe.reason:null,_t=fs({bead_id:z.bead_id,merge_sha:fe.head_sha,cleanup_cursor:fe.cursor,cleanup_failed:He?{step:fe.cursor,reason:He}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return _t?{...g,landing:_t}:g}),vi=null;if(ur){let g=yi(ur),z=ur.cause_detail;vi={bead_id:ur.bead_id,repo:ur.repo||"",reason:ur.cause||ur.status,cause_detail:z&&typeof z.reason=="string"?{reason:z.reason,command:typeof z.command=="string"?z.command:null}:null,resume_attempt_id:ur.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:yr(bs,ur.bead_id,{attempt_id:ur.attempt_id})}}let wi=new Set(ws.map(g=>g.bead_id)),qo=Array.isArray(f.merge_queue)?f.merge_queue:[],ki=new Map,$i=new Map,xi=new Map,Ai=new Map,Si=new Map;qo.forEach((g,z)=>{g&&typeof g.bead_id=="string"&&(ki.set(g.bead_id,z+1),$i.set(g.bead_id,g.resolution),xi.set(g.bead_id,g.continuation_action||null),Ai.set(g.bead_id,g.head_review||null),Si.set(g.bead_id,g.authority||null))});let fn=f.merge_queue_state||{active:null,failures:{}},up=fn.failures||{},Ei=fn.waiting&&typeof fn.waiting.bead_id=="string"&&typeof fn.waiting.reason=="string"?fn.waiting:null,dp=f.auto_merge_skips||{},Ti=g=>{let z=dp[g];if(!z)return null;let fe=un[g],He=fe&&fe.pr?fe.pr.head_sha:null;return He&&He===z.head_sha?z.reason||"":null},ks=new Map;for(let g of ws)g.failed!==!0&&g.conflict_resolution&&(g.paused?ks.has(g.bead_id)||ks.set(g.bead_id,"paused"):ks.set(g.bead_id,"running"));let Ci=ws.filter(g=>!g.paused&&g.failed!==!0).length,Ri=(f.workspace_info||{}).slots,Ii=typeof Ri=="number"?Ri:typeof f.slots=="number"?f.slots:Lo,pp=Ci>Ii,$s=Kr(P),fp=(Array.isArray(f.done)?f.done.slice():[]).filter(g=>$s===void 0||typeof g.added_at!="number"||g.added_at>=$s).sort((g,z)=>(z.added_at||0)-(g.added_at||0)),Mn=Po(fp,"done"),_p=new Set((Array.isArray(f.done)?f.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Li=[],mp=u?.()||"";for(let g of m){let z=Qr(g.closed_at);if(typeof g.id!="string"||_p.has(g.id)||z===null||$s!==void 0&&z<$s||typeof g.comment_count!="number"||g.comment_count<=0)continue;let fe=`${mp}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,He=j.get(fe);He===void 0&&r&&(j.set(fe,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(_t=>{let jt=Array.isArray(_t)&&_t.some(Nt=>lo(typeof Nt?.text=="string"?Nt.text:"")?.lane==="session");j.set(fe,jt?"session":"not-session"),Fe()}).catch(()=>{j.set(fe,"failed"),Fe()})),He==="session"&&Li.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:z,created_at:g.created_at,updated_at:g.updated_at})}Mn.push(...Li),Mn.sort((g,z)=>(z.done_at||0)-(g.done_at||0));let xs={};for(let g of kr)xs[g]=0;let Oi=!1,Mi=0,Fo=0,Pi=0;for(let g of Mn){let z=g.usage;if(z&&typeof z=="object"){let fe=!1;for(let He of kr)Number.isFinite(z[He])&&(xs[He]+=z[He],Oi=!0,fe=!0);fe&&(Fo+=1,Number.isFinite(z.total_cost_usd)&&(Mi+=z.total_cost_usd,Pi+=1))}}Fo>0&&Pi===Fo&&(xs.total_cost_usd=Mi);let Di=Mn.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),gp=Di.length>0?Wt(Vs(Di)):Oi?$r(xs):null,hp=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},bp=Array.isArray(f.serial_lanes)?f.serial_lanes:[],Ni=g=>{if(Ur.some(He=>He.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let z=pn.filter(He=>He&&He.bead_id===g),fe=z.length>0?z[z.length-1].status:null;return fe==="failed"||fe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":fe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},qi=bp.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,z)=>{let fe=hp[g.id]||{},He=new Map((Array.isArray(fe.corrections)?fe.corrections:[]).filter($t=>$t&&typeof $t.bead_id=="string"&&typeof $t.after=="string").map($t=>[$t.bead_id,$t.after])),_t=Po(g.entries.filter($t=>!wi.has($t.bead_id)),g.id).map($t=>He.has($t.id)?{...$t,badges:[`\u{1F517} ${He.get($t.id)} \uB4A4 (blocks \uC790\uB3D9)`,...$t.badges]}:$t),jt=Array.isArray(fe.occupied_by)?fe.occupied_by.filter($t=>typeof $t=="string"):[],Nt=jt.map($t=>({id:$t,title:rt.get($t)||$t,draggable:!1,lane:g.id,ghost:!0,badges:[Ni($t)]}));return{id:g.id,index:z+1,rows:[...Nt,..._t],occupied:jt.length>0,badge:jt.length>0?Ni(jt[0]):"\uB300\uAE30",cycle:fe.cycle===!0}}),yp=typeof f.serial_lane_count=="number"?f.serial_lane_count:qi.length;return{queue:f,idToTitle:rt,candidates:ap,candidate_hidden:{blocked:Mo.hidden_blocked,spec:Mo.hidden_spec},running:ws,live_count:Ci,slots:Ii,over_cap:pp,failure:vi,waiting:Po(dn.filter(g=>!wi.has(g.bead_id)),"queue"),serial_lanes:qi,serial_lane_count:yp,pr_wait:Ur.map(g=>Xh(g.bead_id,rt.get(g.bead_id)||g.bead_id,un,Be[g.bead_id]||null,ir(f.attempts||{},g.bead_id),hs[g.bead_id]||(F.has(g.bead_id)||J.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),ks.get(g.bead_id)||null,g.external===!0,{position:ki.get(g.bead_id)||0,active:fn.active===g.bead_id,failure:up[g.bead_id]||null,waiting:Ei?.bead_id===g.bead_id?Ei.reason:null,resolution:$i.get(g.bead_id),continuation_action:xi.get(g.bead_id),head_review:Ai.get(g.bead_id)||null,authority:Si.get(g.bead_id)||null},g.wt_present!==!1,f.auto_merge===!0?Ti(g.bead_id):null,li(vs,lp(g.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[g.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},ys.get(gi.get(g.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]})).map(g=>({...g,...Br(g.id)})),merge_queue_length:qo.length,merge_queue_running:qo.length>0,auto_excluded:Ur.map(g=>g.bead_id).filter(g=>Ti(g)!==null),declared_base:vs,done:Mn,token_total:gp,cleanup_failures:Tt,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function X(){let $=!!o?.get()?.job,G=!$&&o?.isPending?.()===!0,m=$?"\uBD84\uC11D \uC911":G?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${m?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${m?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${m?l`<span class="worker-analysis-btn__badge">${m}</span>`:""}
    </button>`}function ke(f){let $=f.waiting.length>0?f.waiting[0].id:"\u2014",G=l`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,m=et(f),y=f.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ce=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${O()} 완료 <b>${f.done.length}</b></span
      >`,le=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,je=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Lo}
          step="1"
          .value=${String(f.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Od},(Z,D)=>D+1).map(Z=>l`<option
                value=${String(Z)}
                ?selected=${f.serial_lane_count===Z}
              >
                ${Z}
              </option>`)}
        </select>
      </label>
      ${o?X():""} `,xe=hu({failure:f.failure}),x=uu(f.repo_operations,f.cleanup_failures);return b?l`<div class="worker-ribbon">
          ${G} ${m}
          <div class="worker-kpi worker-kpi--ribbon">${y}${ce}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${je}</div>
          <div class="worker-kpi">${le}</div>
        </div>
        ${x}${Ze.template()}${xe}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${G}${m}${je}</div>
        <div class="worker-kpi">
          ${y}${ce}${le}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${O()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Z=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Z.tooltip}
                >${O()} 완료 · 누적 ${Z.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${$}</b></span
          >
        </div>
      </div>
      ${x}${Ze.template()}${xe}`}function ve(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let $=f.running.some(G=>!G.paused&&G.failed!==!0);return l`<section
      class="worker-now${$?" worker-pane--live":""}"
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
      ${f.running.length>0?Ga(f.running,Date.now(),Oe):""}
      ${f.pr_wait.map(G=>nn(G))}
    </section>`}function Me(f){let $=f.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${B.show_blocked}
        />
        🔒 blocked${$.blocked>0?` ${$.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Mh.map(G=>l`<button
              type="button"
              class="worker-filter__chip${B.spec===G.value?" is-active":""}"
              data-spec=${G.value}
              aria-pressed=${B.spec===G.value?"true":"false"}
            >
              ${G.label}
            </button>`)}
        ${$.spec>0?l`<span class="worker-filter__hidden">숨김 ${$.spec}</span>`:""}
      </div>
    </div>`}function De(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${H}
    >
      ${Ph.map(f=>l`<option value=${f.value} ?selected=${H===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function Rt(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${P}
      >
        ${Rr.map(f=>l`<option value=${f.value} ?selected=${P===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function at(f){let $=l`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,G=f.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return cr({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:$,controls:G})}function et(f){let $=f.queue.auto_merge===!0;if(f.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${$?" is-active":""}"
        title=${$?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${$?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if($)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let G=new Set(f.auto_excluded),m=f.pr_wait.filter(y=>y.merge_action&&y.merge_enabled&&!G.has(y.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${m>0?` ${m}`:""}
    </button>`}function Dt(f){let $=cr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:De(),controls:Me(f),place_menu:mt(f.candidates)});return b?l`<div class="worker-lanes worker-lanes--mobile">
        ${ve(f)}
        ${cr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:U.queue,preview:Dd(f.waiting)})}
        ${f.serial_lanes.map(G=>at(G))}
        ${$}
        ${cr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${O()} \uC644\uB8CC \uC5C6\uC74C`,controls:Rt(),collapsible:!0,collapsed:U.done,preview:Array.isArray(f.token_total)?f.token_total.map(G=>G.label).join(" \xB7 "):f.token_total||Dd(f.done)})}
      </div>`:l`<div class="worker-lanes">
      ${$}
      <div class="worker-wait">
        ${cr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(G=>at(G))}
      </div>
      ${cr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(G=>!G.paused&&G.failed!==!0),body:Ga(f.running,Date.now(),Oe)})}
      ${cr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${cr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${O()} ${f.done.length}`,items:f.done,empty:`${O()} \uC644\uB8CC \uC5C6\uC74C`,controls:Rt()})}
    </div>`}function Ut(f){U={...U,[f]:!U[f]},Uh(U),Fe()}function Fe(){let f=q();Ge(ke(f),ye),Ge(Dt(f),Ne)}function Ft(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(jh);b=!!f.matches;let $=G=>{let m=!!(G&&typeof G.matches=="boolean"?G.matches:f.matches);m!==b&&(b=m,Fe())};typeof f.addEventListener=="function"?(f.addEventListener("change",$),se.push(()=>f.removeEventListener("change",$))):typeof f.addListener=="function"&&(f.addListener($),se.push(()=>f.removeListener($)))}let It=null;function zt(f){It=f.target instanceof Element?f.target:null}function v(f){let G=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!G)return;if(It&&G.contains(It)&&It.closest("input, button, a")){f.preventDefault();return}let m=G.dataset.beadId||"",y=G.dataset.lane||"";T={bead_id:m,from_lane:y};try{f.dataTransfer?.setData("text/plain",m),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function w(f){let $=f.target?.closest?.(".worker-pane");if(!$)return;let G=$.dataset.lane||"";G!=="candidate"&&G!=="queue"&&!/^s[1-5]$/.test(G)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),$.classList.add("worker-pane--drag-over"))}function R(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function W(f,$){let G=L.find(le=>le.id===f);if(!G)return;let m=L.filter(le=>le.id!==f),y=m.length;if($){let le=$.dataset.beadId;if(le===f)return;let je=m.findIndex(xe=>xe.id===le);je>=0&&(y=je)}let ce=m.slice();ce.splice(y,0,G),h.applyReorder(f,ce,y)}function be(f){let $=f.target?.closest?.(".worker-pane");if(!$)return;f.preventDefault(),$.classList.remove("worker-pane--drag-over");let G=$.dataset.lane||"",m=T?.bead_id||f.dataTransfer?.getData("text/plain")||"",y=T?.from_lane||"";if(T=null,!m)return;let ce=f.target?.closest?.(".worker-mini, .worker-card"),le=Array.from($.querySelectorAll(".worker-mini, .worker-card")),je=le.length;if(ce){let xe=le.indexOf(ce);xe>=0&&(je=xe)}if(je=Math.max(0,je-$.querySelectorAll(".worker-mini--ghost").length),$.classList.contains("worker-pane--collapsed")&&(je=ne()),G==="candidate"){if(y==="candidate"){W(m,ce);return}(y==="queue"||/^s[1-5]$/.test(y))&&qe(m);return}if(G==="queue"||/^s[1-5]$/.test(G)){let xe=G==="queue"?"parallel":G;y===G?ae(m,xe,je):me(m,xe)}}function we(f){B=f,Lh(f),Fe()}function ge(f){H=f==="board"||f==="created"||f==="spec"?f:Oo,Nh(H),Fe()}function tt(f){P=or(f)?f:er,Fh(P),p?.(P),Fe()}function Re(f){let $=f.target?.closest?.(".worker-serial-lane-count");if($){let je=Number.parseInt($.value,10);Number.isFinite(je)&&S(je).then(Fe);return}let G=f.target?.closest?.(".worker-filter__blocked");if(G){we({...B,show_blocked:G.checked});return}let m=f.target?.closest?.(".worker-done-range");if(m){tt(m.value);return}let y=f.target?.closest?.(".worker-sort");if(y){ge(y.value||Oo);return}let ce=f.target?.closest?.(".worker-slots__input");if(!ce)return;let le=Number.parseInt(ce.value,10);if(!Number.isFinite(le)){Fe();return}k(le).then(Fe)}function E(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function ie(){let f=q();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function Ce(){Oe&&Ye.close(),$e.hidden=!1,Ee.hidden=!1,Y.open(ie()),Fe()}function ft(f){let $=st(),G=$.attempts?$.attempts[f]:null;Oe=f,ze=null,Y.close(),$e.hidden=!0,Ee.hidden=!1,Ye.open({attempt_id:f,meta:E(G)}),Fe()}function Mt(f,$){Oe=null,ze=f,Y.close(),$e.hidden=!0,Ee.hidden=!1,Ye.open({attempt_id:f,meta:$,hide_prompt:!0}),Fe()}function vt(){if(Y.isOpen()&&Y.refresh(ie()),ze){let G=(o?.get()?.runs||[]).find(m=>m.run_id===ze);G?Ye.updateMeta(ai(G)):Ye.close();return}if(!Oe)return;let f=st(),$=f.attempts?f.attempts[Oe]:null;if($){Ye.updateMeta(E($));return}Ye.close()}function Pt(f){let $=f.target;if($?.closest?.(".worker-mini__serial, .worker-mini__grip")||$?.closest?.("#worker-parallel-analysis-dialog"))return;if($?.closest?.(".worker-analysis-btn")){Ve?.open();return}if($?.closest?.(".worker-repo-strip")||$?.closest?.(".worker-mini__timeline")){Ce();return}let G=$?.closest?.(".worker-repo-op__session");if(G){let Be=G.dataset.attemptId;Be&&ft(Be);return}let m=$?.closest?.(".worker-repo-op__resolve");if(m){M(m.dataset.operationId||"");return}let y=$?.closest?.(".worker-repo-op__dismiss");if(y){ue(y.dataset.operationId||"");return}let ce=$?.closest?.(".worker-cleanup__resume");if(ce){let Be=ce.dataset.beadId;Be&&gt(Be);return}let le=$?.closest?.(".worker-banner__resume");if(le){let Be=le.dataset.attemptId;Be&&ot(Be);return}let je=$?.closest?.(".worker-banner__discard");if(je){let Be=je.dataset.confirmation==="merged"?"merged":"unmerged";Ue(je.dataset.beadId||"",je.dataset.attemptId||null,Be,je.dataset.operationId||null);return}let xe=$?.closest?.(".worker-banner__dismiss");if(xe){let Be=xe.dataset.attemptId;Be&&Xe(Be);return}if($?.closest?.(".worker-play")){A(!st().auto_advance);return}let x=$?.closest?.(".worker-merge-all");if(x){x.classList.contains("worker-merge-all--stop")?st().auto_merge===!0?kt(!1):Ke():kt(!0);return}let Z=$?.closest?.(".worker-pane__hd--toggle");if(Z){let Be=Z.dataset.lane;(Be==="queue"||Be==="done")&&Ut(Be);return}let D=$?.closest?.(".worker-card__place-lane");if(D){let Be=D.dataset.beadId,Tt=D.dataset.lane;Be&&(Tt==="parallel"||/^s[1-5]$/.test(Tt||""))&&(V=null,Fe(),me(Be,Tt));return}if($?.closest?.(".worker-card__place-cancel")){V=null,Fe();return}let ut=$?.closest?.(".worker-card__place");if(ut){let Be=ut.dataset.beadId;Be&&!ut.disabled&&(Je()?(V=Be,Fe()):me(Be,"parallel"));return}let it=$?.closest?.(".worker-filter__chip");if(it){let Be=it.dataset.spec;(Be==="all"||Be==="with"||Be==="without")&&we({...B,spec:Be});return}let rt=$?.closest?.(".worker-mini__merge");if(rt){let Be=rt.dataset.beadId||"";st().cleanup_failed?.[Be]?gt(Be):yt(Be);return}let nt=$?.closest?.(".worker-mini__merge-cancel");if(nt){We(nt.dataset.beadId||"");return}let Lt=$?.closest?.(".worker-mini__discard");if(Lt){Ue(Lt.dataset.beadId||"",Lt.dataset.attemptId||null,Lt.dataset.discardMode==="merged"?"merged":"unmerged",Lt.dataset.operationId||null);return}let Jt=$?.closest?.(".worker-mini__stale-continue");if(Jt){ct("worker-stale-work-continue",Jt.dataset.beadId||"",Jt.dataset.actionId||"");return}let an=$?.closest?.(".worker-mini__stale-backup");if(an){ct("worker-stale-work-backup-fresh",an.dataset.beadId||"",an.dataset.actionId||"");return}let ln=$?.closest?.(".worker-mini__stale-recheck");if(ln){ct("worker-stale-work-recheck",ln.dataset.beadId||"",ln.dataset.actionId||"");return}let gs=$?.closest?.(".worker-mini__revise-fix");if(gs){At("worker-revise-fix",gs.dataset.beadId||"");return}let cn=$?.closest?.(".worker-mini__revise-approve");if(cn){At("worker-revise-approve",cn.dataset.beadId||"");return}if($?.closest?.(".worker-mini__pr"))return;if($?.closest?.(".rtile__discard")){let Be=$?.closest?.(".rtile"),Tt=Be?.dataset?.beadId,dn=Be?.dataset?.attemptId;Tt&&Ue(Tt,dn||null,"unmerged",$?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if($?.closest?.(".rtile__dismiss")){let Tt=$?.closest?.(".rtile")?.dataset?.attemptId;Tt&&Xe(Tt);return}if($?.closest?.(".rtile__pause")){let Tt=$?.closest?.(".rtile")?.dataset?.attemptId;Tt&&Qe(Tt);return}if($?.closest?.(".rtile__resume")){let Tt=$?.closest?.(".rtile")?.dataset?.attemptId;Tt&&ot(Tt);return}if($?.closest?.(".rtile__session")){let Tt=$?.closest?.(".rtile")?.dataset?.attemptId;Tt&&ft(Tt);return}if($?.closest?.(".worker-drawer-overlay__backdrop")){Y.close(),Ye.close();return}if($?.closest?.(".worker-drawer-host"))return;let Br=$?.closest?.(".rtile .board-card__roll-toggle");if(Br){let Be=Br.dataset.rollParent;Be&&(de.has(Be)?de.delete(Be):de.add(Be),Fe());return}let Ur=$?.closest?.(".rtile .board-card__roll-child");if(Ur){let Be=Ur.dataset.childId;Be&&c&&c(Be);return}let un=$?.closest?.(".rtile");if(un){if($?.closest?.(".rtile__id")){let Tt=un.dataset.beadId;Tt&&tr(Tt).then(dn=>{dn?_e("\uBCF5\uC0AC\uB428","success",1200):_e("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Be=un.dataset.beadId;Be&&c&&c(Be);return}let hs=$?.closest?.(".worker-mini, .worker-card");if(hs){let Be=hs.dataset.beadId;if($?.closest?.(".worker-mini__id, .worker-card__id")){Be&&tr(Be).then(Tt=>{Tt?_e("\uBCF5\uC0AC\uB428","success",1200):_e("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Be&&c&&c(Be)}}return e.addEventListener("pointerdown",zt),e.addEventListener("dragstart",v),e.addEventListener("dragover",w),e.addEventListener("dragleave",R),e.addEventListener("drop",be),e.addEventListener("click",Pt),e.addEventListener("change",Re),Ft(),_&&se.push(_.subscribe(()=>{for(let[f,$]of j)$==="failed"&&j.delete(f);Fe()})),s&&se.push(s.subscribe(()=>{let f=u&&u()||"";f!==Te&&(Te=f,Q.close()),Fe(),vt()})),o&&typeof o.subscribe=="function"&&se.push(o.subscribe(()=>{vt(),Fe()})),Fe(),{load(){N(),Fe()},refreshSessionDefaults:oe,destroy(){for(let f of se.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",zt),e.removeEventListener("dragstart",v),e.removeEventListener("dragover",w),e.removeEventListener("dragleave",R),e.removeEventListener("drop",be),e.removeEventListener("click",Pt),e.removeEventListener("change",Re);try{Ye.destroy()}catch{}Ee.hidden=!0;try{Ve?.destroy()}catch{}try{Q.destroy()}catch{}Ge(l``,e)}}}function ui(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Wd(e,t,r,n=async()=>{},s=async()=>{}){let o=St("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function d(U){let F=U.target.value,ee=t.getState().workspace?.current?.path||"";if(F&&F!==ee){o("switching workspace to %s",F),i=!0,O();try{await r(F)}catch(pe){o("workspace switch failed: %o",pe)}finally{i=!1,O()}}}async function p(){let U=t.getState(),b=U.workspace?.current?.path||U.workspace?.available?.[0]?.path||"";if(!(!b||c)){o("git-pulling workspace %s",b),c=!0,O();try{await n(b)}catch(F){o("workspace git pull failed: %o",F)}finally{c=!1,O()}}}function _(U){let b=U.target;b&&e.contains(b)||L()}function h(U){U.key==="Escape"&&L()}function T(){u||(u=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",h),O())}function L(){u&&(u=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",h),O())}function B(){u?L():T()}async function V(U){let b=U.target,F=b.value,J=b.checked;o("toggling visibility %s \u2192 %s",F,String(J));try{await s(F,J)}catch(ee){o("workspace visibility toggle failed: %o",ee)}}function H(U){return U?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${p}
        ?disabled=${i||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function P(U,b){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${B}
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
                ${U.map(F=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${F.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${F.path}"
                        .checked=${!b.has(F.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ui(F.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function j(){let U=t.getState(),b=U.workspace?.current,F=U.workspace?.available||[],J=new Set(U.workspace?.hidden||[]),ee=b?.path||F[0]?.path||"";if(F.length===0)return l``;let pe=F.filter(de=>!J.has(de.path)||de.path===ee);if(pe.length<=1){let de=pe[0]||F[0],he=ui(de.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${de.path}"
            >${he}</span
          >
          ${P(F,J)}
          ${H(ee)}
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
          ${pe.map(de=>l`
              <option
                value="${de.path}"
                ?selected=${de.path===ee}
                title="${de.path}"
              >
                ${ui(de.path)}
              </option>
            `)}
        </select>
        ${P(F,J)}
        ${H(ee)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){Ge(j(),e)}return O(),a=t.subscribe(()=>O()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",h),Ge(l``,e)}}}var zd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function di(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Hd(e,t,r=di()){return{id:r,type:e,payload:t}}function Gd(e={}){let t=St("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,d=[],p=new Map,_=new Set;function h(j){for(let O of Array.from(_))try{O(j)}catch{}}function T(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),h(o);let j=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),O=(r.jitterRatio||0)*j,U=Math.max(0,Math.round(j+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",U,a+1),i=setTimeout(()=>{i=null,P()},U)}function L(j){try{s?.send(JSON.stringify(j))}catch(O){t("ws send failed",O)}}function B(){for(o="open",t("ws open"),h(o),a=0;d.length;){let j=d.shift();j&&L(j)}}function V(j){let O;try{O=JSON.parse(String(j.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let b=u.get(O.id);u.delete(O.id),O.ok?b?.resolve(O.payload):b?.reject(O.error||new Error("ws error"));return}let U=p.get(O.type);if(U&&U.size>0)for(let b of Array.from(U))try{b(O.payload)}catch(F){t("ws event handler error",F)}else t("ws received unhandled message type: %s",O.type)}function H(){o="closed",t("ws closed"),h(o);for(let[j,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(j);a+=1,T()}function P(){if(!c)return;let j=n();try{s=new WebSocket(j),t("ws connecting %s",j),o="connecting",h(o),s.addEventListener("open",B),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",H)}catch(O){t("ws connect failed %o",O),T()}}return P(),{send(j,O){if(!zd.includes(j))return Promise.reject(new Error(`unknown message type: ${j}`));let U=di(),b=Hd(j,O,U);return t("send %s id=%s",j,U),new Promise((F,J)=>{u.set(U,{resolve:F,reject:J,type:j}),s&&s.readyState===s.OPEN?L(b):(t("queue %s id=%s (state=%s)",j,U,o),d.push(b))})},on(j,O){p.has(j)||p.set(j,new Set);let U=p.get(j);return U?.add(O),()=>{U?.delete(O)}},onConnection(j){return _.add(j),()=>{_.delete(j)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,P()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Jh(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function eb(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var pi=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Vd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Fr="tab:worker:closed",tb="bdui.worker.done-range",Kd=Qu,Yd="worker:queue",Zd="worker:parallel-analysis",Qd="ui:order",Xd="ui:display-policy",Jd="exec:presets",jr="tab:board:closed",ep="beads-ui.board.closed-range";function rb(e){let t=St("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ge(r,e);let n=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&hd(a),i&&c&&u&&d){let oe=function(m,y){let ce="Request failed",le="";if(m&&typeof m=="object"){let xe=m;if(typeof xe.message=="string"&&xe.message.length>0&&(ce=xe.message),typeof xe.details=="string")le=xe.details;else if(xe.details&&typeof xe.details=="object")try{le=JSON.stringify(xe.details,null,2)}catch{le=""}}else typeof m=="string"&&m.length>0&&(ce=m);let je=y&&y.length>0?`Failed to load ${y}`:"Request failed";N.open(je,ce,le)},I=function(m){return`${ge.getState().workspace.current?.path||""}\0${m}`},ne=function(){Q&&(Q().catch(()=>{}),Q=null),Te=null,Ze=null},ae=function(m){Ve=m;let y=()=>{Ve!==m||ge.getState().selected_id!==m||(Ve=null,me(m))};if(!mt){Je.then(y);return}y()},Xe=function(m,y,ce,le,je){return ce!==ot[y]?(je().catch(()=>{}),!1):(m.set(le,je),!0)},yt=function(){let m=ge.getState();Ke(m.view==="board"),ue(m.view==="worker"),ke(m.view==="monitor"),S(m.view==="board"||m.view==="worker"||dt||!!m.selected_id)},kt=function(){let m=Kr(gt);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},We=function(){let m=Kr(pt);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},Ke=function(m){if(m)for(let[y,ce]of pi){if(qe.has(y)||Qe.has(y))continue;let le=y===jr?kt():{type:ce};try{C.register(y,le)}catch(x){t("register %s store failed: %o",y,x)}Qe.add(y);let je=ot.board,xe=!1;Ee.subscribeList(y,le).then(x=>{xe=!Xe(qe,"board",je,y,x)}).catch(x=>{t("subscribe %s failed: %o",y,x),oe(x,"board")}).finally(()=>{Qe.delete(y),xe&&yt()})}else At()},At=function(){ot.board+=1;for(let[m]of pi){let y=qe.get(m);y&&(y().catch(()=>{}),qe.delete(m));try{C.unregister(m)}catch(ce){t("unregister %s failed: %o",m,ce)}}},ue=function(m){if(!m){k();return}for(let[y,ce]of Vd){if(A.has(y)||Qe.has(y))continue;let le=y===Fr?We():{type:ce};try{C.register(y,le)}catch(x){t("register %s store failed: %o",y,x)}Qe.add(y);let je=ot.worker,xe=!1;Ee.subscribeList(y,le).then(x=>{xe=!Xe(A,"worker",je,y,x)}).catch(x=>{t("subscribe %s failed: %o",y,x),oe(x,"worker")}).finally(()=>{Qe.delete(y),xe&&yt()})}},k=function(){ot.worker+=1;for(let[m]of Vd){let y=A.get(m);y&&(y().catch(()=>{}),A.delete(m));try{C.unregister(m)}catch(ce){t("unregister %s failed: %o",m,ce)}}},S=function(m){if(!m){q();return}M||(ye("subscribe-worker-queue",{id:Yd}).catch(y=>{t("subscribe-worker-queue failed: %o",y)}),ye("subscribe-worker-parallel-analysis",{id:Zd}).catch(y=>{t("subscribe-worker-parallel-analysis failed: %o",y)}),M=()=>(ye("unsubscribe-worker-parallel-analysis",{id:Zd}),ye("unsubscribe-worker-queue",{id:Yd})))},q=function(){M&&(M().catch(()=>{}),M=null),$e.clear()},ke=function(m){if(!m){ve();return}X||(ye("subscribe-monitor-pipeline",{id:Kd}).catch(y=>{t("subscribe-monitor-pipeline failed: %o",y)}),X=()=>ye("unsubscribe-monitor-pipeline",{id:Kd}))},ve=function(){X&&(X().catch(()=>{}),X=null)},De=function(){Me||(ye("subscribe-ui-order",{id:Qd}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),Me=()=>ye("unsubscribe-ui-order",{id:Qd}))},Rt=function(){Me&&(Me().catch(()=>{}),Me=null),Oe.clear()},et=function(){at||(ye("subscribe-display-policy",{id:Xd}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),at=()=>ye("unsubscribe-display-policy",{id:Xd}))},Dt=function(){at&&(at().catch(()=>{}),at=null),ze.clear()},Fe=function(){Ut||(ye("subscribe-impl-presets",{id:Jd}).catch(m=>{t("subscribe-impl-presets failed: %o",m)}),Ut=()=>ye("unsubscribe-impl-presets",{id:Jd}))},R=function(m){if(!m)return"Unknown";let y=m.split("/").filter(Boolean);return y.length>0?y[y.length-1]:"Unknown"};var p=oe,_=I,h=ne,T=ae,L=Xe,B=yt,V=kt,H=We,P=Ke,j=At,O=ue,U=k,b=S,F=q,J=ke,ee=ve,pe=De,de=Rt,he=et,Se=Dt,Le=Fe,te=R;let se=document.getElementById("header-loading"),Ae=$l(se),N=cu(e),re=Gd(),ye=Ae.wrapSend((m,y)=>re.send(m,y)),Ee=ml(ye),C=gl(),K=yl(),$e=bl(),Ne=el(),Oe=hl(),ze=Xi(),Ye=Ji(),Y=tl();re.on("impl-presets-snapshot",m=>{let y=m;y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&Ye.set({revision:y.revision,presets:y.presets})}),re.on("monitor-pipeline-snapshot",m=>{let y=m;if(!(!y||!Array.isArray(y.workspaces)))try{Ne.set(y.workspaces,y.workspaces_state)}catch{}}),re.on("ui-order-snapshot",m=>{let y=m;if(y&&typeof y.revision=="number")try{Oe.set({revision:y.revision,order:y.order&&typeof y.order=="object"?y.order:{}})}catch{}}),re.on("display-policy-snapshot",m=>{let y=m;if(y&&y.policy&&typeof y.policy=="object")try{ze.set(y.policy)}catch{}}),re.on("session-log-snapshot",m=>{let y=m;if(y&&typeof y.id=="string")try{Y.set(y.id,Array.isArray(y.lines)?y.lines:[],typeof y.last_event_at=="number"?y.last_event_at:null)}catch{}}),re.on("session-log-append",m=>{let y=m;if(y&&typeof y.id=="string")try{Y.append(y.id,y.event)}catch{}}),re.on("snapshot",m=>{let y=m,ce=y&&typeof y.id=="string"?y.id:"",le=ce?C.getStore(ce):null;if(le&&y&&y.type==="snapshot")try{le.applyPush(y)}catch{}}),re.on("upsert",m=>{let y=m,ce=y&&typeof y.id=="string"?y.id:"",le=ce?C.getStore(ce):null;if(le&&y&&y.type==="upsert")try{le.applyPush(y)}catch{}}),re.on("delete",m=>{let y=m,ce=y&&typeof y.id=="string"?y.id:"",le=ce?C.getStore(ce):null;if(le&&y&&y.type==="delete")try{le.applyPush(y)}catch{}});let Q=null,Te=null,Ze=null,Ve=null,st=()=>{},Je=new Promise(m=>{st=()=>m(void 0)}),mt=!1,Pe=!1;async function me(m){let y=I(m);if(y===Te||y===Ze)return;Ze=y;let ce=`detail:${m}`,le={type:"issue-detail",params:{id:m}};try{C.register(ce,le)}catch(je){t("register detail store failed: %o",je)}try{let je=await Ee.subscribeList(ce,le);if(ge.getState().selected_id!==m||I(m)!==y){await je().catch(()=>{});return}Q&&await Q().catch(()=>{}),Q=je,Te=y}catch(je){t("detail subscribe failed: %o",je),oe(je,"issue details")}finally{Ze===y&&(Ze=null)}}let qe=new Map,Qe=new Set,ot={board:0,worker:0},dt=!1,gt=er;try{let m=window.localStorage.getItem(ep);or(m)&&(gt=m)}catch{}let pt=er;try{let m=window.localStorage.getItem(tb);or(m)&&(pt=m)}catch{}async function Ue(m){if(!or(m)||m===gt)return;gt=m;try{window.localStorage.setItem(ep,m)}catch{}let y=qe.get(jr);if(!y)return;qe.delete(jr),await y().catch(()=>{});let ce=kt();try{C.register(jr,ce)}catch(le){t("register %s store failed: %o",jr,le)}try{let le=await Ee.subscribeList(jr,ce);qe.set(jr,le)}catch(le){t("re-subscribe %s failed: %o",jr,le),oe(le,"board")}}async function ct(m){if(!or(m)||m===pt)return;pt=m;let y=A.get(Fr);if(!y)return;A.delete(Fr),await y().catch(()=>{});let ce=We();try{C.register(Fr,ce)}catch(le){t("register %s store failed: %o",Fr,le)}try{let le=await Ee.subscribeList(Fr,ce);A.set(Fr,le)}catch(le){t("re-subscribe %s failed: %o",Fr,le),oe(le,"worker")}}let A=new Map,M=null,X=null,Me=null,at=null,Ut=null;async function Ft(){at=null,ze.clear(),Ut=null,Ye.clear(),M=null,X=null,qe.clear(),A.clear(),ot.board+=1,ot.worker+=1,Fe();let m=ge.getState().workspace.current?.path;if(m)try{await re.send("set-workspace",{path:m})}catch(ce){t("workspace restore after reconnect failed: %o",ce);return}et();let y=ge.getState();Ke(y.view==="board"),ue(y.view==="worker"),ke(y.view==="monitor"),S(y.view==="board"||y.view==="worker"||!!y.selected_id)}async function It(){t("clearing all subscriptions for workspace switch"),At(),k(),q(),K.clear(),Rt(),De(),Dt(),et(),ne();let m=ge.getState();if(m.selected_id)try{C.unregister(`detail:${m.selected_id}`)}catch{}let y=ge.getState();Ke(y.view==="board"),ue(y.view==="worker"),ke(y.view==="monitor"),S(y.view==="board"||y.view==="worker"||!!y.selected_id),y.selected_id&&ae(y.selected_id)}async function zt(m){t("requesting workspace switch to %s",m),Pe=!0;try{let y=await re.send("set-workspace",{path:m});t("workspace switch result: %o",y),y&&y.workspace&&(ge.setState({workspace:{current:{path:y.workspace.root_dir,database:y.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),y.changed&&(await It(),_e("Switched to "+R(m),"success",2e3)))}catch(y){throw t("workspace switch failed: %o",y),_e("Failed to switch workspace","error",3e3),y}finally{Pe=!1}}async function v(m){t("requesting workspace git pull for %s",m);try{let y=await re.send("git-pull-workspace",{});t("workspace git pull result: %o",y);let ce=y?.status;if(ce==="up_to_date"){_e("Already up to date","success",2e3);return}if(ce==="stash_pop_conflict"){_e("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}_e("Git pulled "+R(m),"success",2e3)}catch(y){t("workspace git pull failed: %o",y);let ce=y?.code,le=y?.message;if(ce==="rebase_conflict"){_e("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(ce==="rebase_conflict_abort_failed"){_e("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(ce==="busy"){_e("Git pull skipped: another operation is running","warning",3e3);return}let je=le?`: ${le}`:"";throw _e(`Git pull failed${je}`,"error",3e3),y}}async function w(m,y){t("setting workspace visibility %s \u2192 %s",m,String(y));try{await re.send("set-workspace-visibility",{path:m,visible:y}),await W()}catch(ce){t("workspace visibility update failed: %o",ce),_e("Failed to update project visibility","error",3e3)}}async function W(){try{let m=await re.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let y=m.workspaces.map(xe=>({path:xe.path,database:xe.database,pid:xe.pid,version:xe.version})),ce=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,le=Array.isArray(m.hidden)?m.hidden.filter(xe=>typeof xe=="string"):[];ge.setState({workspace:{current:ce,available:y,hidden:le}});let je=window.localStorage.getItem("beads-ui.workspace");je&&(!y.some(x=>x.path===je)||le.includes(je)?window.localStorage.removeItem("beads-ui.workspace"):ce&&je!==ce.path&&(t("restoring saved workspace preference: %s",je),await zt(je)))}}catch(m){t("failed to load workspaces: %o",m)}}re.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(ge.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),W(),It())});let be=!1;if(typeof re.onConnection=="function"){let m=y=>{t("ws state %s",y),y==="reconnecting"||y==="closed"?(be=!0,_e("Connection lost. Reconnecting\u2026","error",4e3)):y==="open"&&be&&(be=!1,_e("Reconnected","success",2200),eb(ge,(ce,le)=>{t(`${ce}: %o`,le)}),Ft())};re.onConnection(m)}let we="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(we=m)}catch(m){t("view parse error: %o",m)}let ge=kl({config:Jh(),view:we});re.on("worker-queue-snapshot",m=>{let y=m;if(!y||!y.queue)return;let ce=ge.getState().workspace.current?.path;if(typeof ce=="string"&&ce.length>0&&y.root_dir!==ce){t("dropping worker-queue snapshot for %s",String(y.root_dir));return}try{K.set(y.queue)}catch{}}),re.on("worker-parallel-analysis-snapshot",m=>{let y=m;if(!y)return;let ce=ge.getState().workspace.current?.path;if(!(typeof ce=="string"&&ce.length>0&&typeof y.root_dir=="string"&&y.root_dir!==ce))try{$e.set({settings:y.settings,job:y.job??null,runs:Array.isArray(y.runs)?y.runs:[],last_good:y.last_good??null})}catch{}});let tt=vl(ge);tt.start();let Re=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),E=async(m,y)=>{try{return await ye(m,y)}catch(ce){if(Re.has(m))throw ce;return[]}};Ju({global_element:n,repo_element:s},ge,tt);let ie=document.getElementById("workspace-picker");ie&&Wd(ie,ge,zt,v,w);let Ce=nd(e,(m,y)=>ye(m,y));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>Ce.open())}catch{}let ft=id(e,{policyStore:ze,queueStore:K,implPresetStore:Ye,transport:(m,y)=>ye(m,y),onOpenChange:m=>{let y=dt;dt=m,yt(),y&&m===!1&&vt.refreshSessionDefaults()},labelOptions:()=>{let m=new Set;for(let[y]of pi)for(let ce of C.snapshotFor(y)||[]){let le=ce.labels;if(Array.isArray(le))for(let je of le)typeof je=="string"&&je.length>0&&m.add(je)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&(m.setAttribute("aria-label","\uC124\uC815"),m.setAttribute("title","\uC124\uC815"),m.addEventListener("click",()=>ft.open()))}catch{}let Mt=Dl(i,{gotoIssue:m=>tt.gotoIssue(m),issueStores:C,transport:E,workerQueueStore:K,uiOrderStore:Oe,displayPolicyStore:ze,closedRange:gt,onClosedRangeChange:m=>{Ue(m)},onNewIssue:()=>Ce.open()}),vt=ci(c,{transport:E,issueStores:C,queueStore:K,analysisStore:$e,sessionLogStore:Y,uiOrderStore:Oe,gotoIssue:m=>ge.setState({selected_id:m}),getWorkspacePath:()=>ge.getState().workspace.current?.path,doneRange:pt,onDoneRangeChange:m=>{ct(m)}}),Pt=Xu(u,{transport:E,pipelineStore:Ne,execPresetStore:Ye,sessionLogStore:Y,router:tt,gotoIssue:m=>tt.gotoIssue(m),getWorkspacePath:()=>ge.getState().workspace.current?.path,switchWorkspace:m=>zt(m)}),f=lu(d,{issueStores:C,transport:E,queueStore:K,execPresetStore:Ye,sessionLogStore:Y,getWorkspacePath:()=>ge.getState().workspace.current?.path,onNavigate:m=>{ge.getState().view==="worker"?ge.setState({selected_id:m}):tt.gotoIssue(m)},onClose:()=>{let m=ge.getState();ge.setState({selected_id:null});try{tt.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}},onOpenExecPresets:()=>{ft.open("execution")}}),$=ge.getState().selected_id;$&&(d.hidden=!1,f.load($),ae($)),ge.subscribe(m=>{let y=m.selected_id;y?(d.hidden=!1,f.load(y),Pe||ae(y)):(f.clear(),d.hidden=!0,ne())});let G=m=>{i.hidden=m.view!=="board",c.hidden=m.view!=="worker",u.hidden=m.view!=="monitor",o&&o.classList.toggle("is-quiet",m.view==="monitor"),Ke(m.view==="board"),ue(m.view==="worker"),ke(m.view==="monitor"),S(m.view==="board"||m.view==="worker"||dt||!!m.selected_id),!m.selected_id&&m.view==="board"&&Mt.load(),m.view==="worker"&&vt.load(),m.view==="monitor"?Pt.load():Pt.pause(),window.localStorage.setItem("beads-ui.view",m.view)};ge.subscribe(G),G(ge.getState()),De(),et(),Fe(),W().finally(()=>{mt=!0,st()}),window.addEventListener("keydown",m=>{let y=m.ctrlKey||m.metaKey,ce=String(m.key||"").toLowerCase(),le=m.target,je=le&&le.tagName?String(le.tagName).toLowerCase():"",xe=je==="input"||je==="textarea"||je==="select"||le&&typeof le.isContentEditable=="boolean"&&le.isContentEditable;y&&ce==="n"&&(xe||(m.preventDefault(),Ce.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&rb(t)});export{rb as bootstrap,Jh as readBootstrapConfig,eb as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
