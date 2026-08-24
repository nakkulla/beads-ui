var Ap=Object.create;var zo=Object.defineProperty;var Sp=Object.getOwnPropertyDescriptor;var Ep=Object.getOwnPropertyNames;var Tp=Object.getPrototypeOf,Cp=Object.prototype.hasOwnProperty;var Rp=(e,t,r)=>t in e?zo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Ho=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ip=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ep(t))!Cp.call(e,s)&&s!==r&&zo(e,s,{get:()=>t[s],enumerable:!(n=Sp(t,s))||n.enumerable});return e};var Op=(e,t,r)=>(r=e!=null?Ap(Tp(e)):{},Ip(t||!e||!e.__esModule?zo(r,"default",{value:e,enumerable:!0}):r,e));var wt=(e,t,r)=>Rp(e,typeof t!="symbol"?t+"":t,r);var ol=Ho((vb,sl)=>{var gn=1e3,hn=gn*60,bn=hn*60,Yr=bn*24,Pp=Yr*7,Dp=Yr*365.25;sl.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Np(e);if(r==="number"&&isFinite(e))return t.long?Fp(e):qp(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Np(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Dp;case"weeks":case"week":case"w":return r*Pp;case"days":case"day":case"d":return r*Yr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*bn;case"minutes":case"minute":case"mins":case"min":case"m":return r*hn;case"seconds":case"second":case"secs":case"sec":case"s":return r*gn;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function qp(e){var t=Math.abs(e);return t>=Yr?Math.round(e/Yr)+"d":t>=bn?Math.round(e/bn)+"h":t>=hn?Math.round(e/hn)+"m":t>=gn?Math.round(e/gn)+"s":e+"ms"}function Fp(e){var t=Math.abs(e);return t>=Yr?Os(e,t,Yr,"day"):t>=bn?Os(e,t,bn,"hour"):t>=hn?Os(e,t,hn,"minute"):t>=gn?Os(e,t,gn,"second"):e+" ms"}function Os(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var il=Ho((wb,al)=>{function jp(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=i,r.humanize=ol(),r.destroy=u,Object.keys(e).forEach(d=>{r[d]=e[d]}),r.names=[],r.skips=[],r.formatters={};function t(d){let p=0;for(let _=0;_<d.length;_++)p=(p<<5)-p+d.charCodeAt(_),p|=0;return r.colors[Math.abs(p)%r.colors.length]}r.selectColor=t;function r(d){let p,_=null,h,x;function O(...B){if(!O.enabled)return;let V=O,Z=Number(new Date),D=Z-(p||Z);V.diff=D,V.prev=p,V.curr=Z,p=Z,B[0]=r.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let M=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(U,b)=>{if(U==="%%")return"%";M++;let j=r.formatters[b];if(typeof j=="function"){let te=B[M];U=j.call(V,te),B.splice(M,1),M--}return U}),r.formatArgs.call(V,B),(V.log||r.log).apply(V,B)}return O.namespace=d,O.useColors=r.useColors(),O.color=r.selectColor(d),O.extend=n,O.destroy=r.destroy,Object.defineProperty(O,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(h!==r.namespaces&&(h=r.namespaces,x=r.enabled(d)),x),set:B=>{_=B}}),typeof r.init=="function"&&r.init(O),O}function n(d,p){let _=r(this.namespace+(typeof p>"u"?":":p)+d);return _.log=this.log,_}function s(d){r.save(d),r.namespaces=d,r.names=[],r.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of p)_[0]==="-"?r.skips.push(_.slice(1)):r.names.push(_)}function o(d,p){let _=0,h=0,x=-1,O=0;for(;_<d.length;)if(h<p.length&&(p[h]===d[_]||p[h]==="*"))p[h]==="*"?(x=h,O=_,h++):(_++,h++);else if(x!==-1)h=x+1,O++,_=O;else return!1;for(;h<p.length&&p[h]==="*";)h++;return h===p.length}function a(){let d=[...r.names,...r.skips.map(p=>"-"+p)].join(",");return r.enable(""),d}function i(d){for(let p of r.skips)if(o(d,p))return!1;for(let p of r.names)if(o(d,p))return!0;return!1}function c(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}al.exports=jp});var ll=Ho((Zt,Ls)=>{Zt.formatArgs=Up;Zt.save=Wp;Zt.load=zp;Zt.useColors=Bp;Zt.storage=Hp();Zt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Zt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Bp(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Up(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ls.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Zt.log=console.debug||console.log||(()=>{});function Wp(e){try{e?Zt.storage.setItem("debug",e):Zt.storage.removeItem("debug")}catch{}}function zp(){let e;try{e=Zt.storage.getItem("debug")||Zt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Hp(){try{return localStorage}catch{}}Ls.exports=il()(Zt);var{formatters:Gp}=Ls.exports;Gp.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Dn=globalThis,Ss=Dn.trustedTypes,Wi=Ss?Ss.createPolicy("lit-html",{createHTML:e=>e}):void 0,Vo="$lit$",wr=`lit$${Math.random().toFixed(9).slice(2)}$`,Ko="?"+wr,Lp=`<${Ko}>`,Hr=document,Nn=()=>Hr.createComment(""),qn=e=>e===null||typeof e!="object"&&typeof e!="function",Yo=Array.isArray,Yi=e=>Yo(e)||typeof e?.[Symbol.iterator]=="function",Go=`[ 	
\f\r]`,Pn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,zi=/-->/g,Hi=/>/g,Wr=RegExp(`>|${Go}(?:([^\\s"'>=/]+)(${Go}*=${Go}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Gi=/'/g,Vi=/"/g,Zi=/^(?:script|style|textarea|title)$/i,Zo=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=Zo(1),mn=Zo(2),fb=Zo(3),sr=Symbol.for("lit-noChange"),Lt=Symbol.for("lit-nothing"),Ki=new WeakMap,zr=Hr.createTreeWalker(Hr,129);function Qi(e,t){if(!Yo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Wi!==void 0?Wi.createHTML(t):t}var Xi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Pn;for(let i=0;i<r;i++){let c=e[i],u,d,p=-1,_=0;for(;_<c.length&&(a.lastIndex=_,d=a.exec(c),d!==null);)_=a.lastIndex,a===Pn?d[1]==="!--"?a=zi:d[1]!==void 0?a=Hi:d[2]!==void 0?(Zi.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=Wr):d[3]!==void 0&&(a=Wr):a===Wr?d[0]===">"?(a=s??Pn,p=-1):d[1]===void 0?p=-2:(p=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?Wr:d[3]==='"'?Vi:Gi):a===Vi||a===Gi?a=Wr:a===zi||a===Hi?a=Pn:(a=Wr,s=void 0);let h=a===Wr&&e[i+1].startsWith("/>")?" ":"";o+=a===Pn?c+Lp:p>=0?(n.push(u),c.slice(0,p)+Vo+c.slice(p)+wr+h):c+wr+(p===-2?i:h)}return[Qi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Fn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,d]=Xi(t,r);if(this.el=e.createElement(u,n),zr.currentNode=this.el.content,r===2||r===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=zr.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(Vo)){let _=d[a++],h=s.getAttribute(p).split(wr),x=/([.?@])?(.*)/.exec(_);c.push({type:1,index:o,name:x[2],strings:h,ctor:x[1]==="."?Ts:x[1]==="?"?Cs:x[1]==="@"?Rs:Vr}),s.removeAttribute(p)}else p.startsWith(wr)&&(c.push({type:6,index:o}),s.removeAttribute(p));if(Zi.test(s.tagName)){let p=s.textContent.split(wr),_=p.length-1;if(_>0){s.textContent=Ss?Ss.emptyScript:"";for(let h=0;h<_;h++)s.append(p[h],Nn()),zr.nextNode(),c.push({type:2,index:++o});s.append(p[_],Nn())}}}else if(s.nodeType===8)if(s.data===Ko)c.push({type:2,index:o});else{let p=-1;for(;(p=s.data.indexOf(wr,p+1))!==-1;)c.push({type:7,index:o}),p+=wr.length-1}o++}}static createElement(t,r){let n=Hr.createElement("template");return n.innerHTML=t,n}};function Gr(e,t,r=e,n){if(t===sr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=qn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Gr(e,s._$AS(e,t.values),s,n)),t}var Es=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Hr).importNode(r,!0);zr.currentNode=s;let o=zr.nextNode(),a=0,i=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new _n(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Is(o,this,t)),this._$AV.push(u),c=n[++i]}a!==c?.index&&(o=zr.nextNode(),a++)}return zr.currentNode=Hr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},_n=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=Lt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Gr(this,t,r),qn(t)?t===Lt||t==null||t===""?(this._$AH!==Lt&&this._$AR(),this._$AH=Lt):t!==this._$AH&&t!==sr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Yi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Lt&&qn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Hr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Fn.createElement(Qi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Es(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Ki.get(t.strings);return r===void 0&&Ki.set(t.strings,r=new Fn(t)),r}k(t){Yo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Nn()),this.O(Nn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Vr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=Lt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Lt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Gr(this,t,r,0),a=!qn(t)||t!==this._$AH&&t!==sr,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Gr(this,i[n+c],r,c),u===sr&&(u=this._$AH[c]),a||(a=!qn(u)||u!==this._$AH[c]),u===Lt?t=Lt:t!==Lt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===Lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ts=class extends Vr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Lt?void 0:t}},Cs=class extends Vr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Lt)}},Rs=class extends Vr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Gr(this,t,r,0)??Lt)===sr)return;let n=this._$AH,s=t===Lt&&n!==Lt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Lt&&(n===Lt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Is=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Gr(this,t)}},Ji={M:Vo,P:wr,A:Ko,C:1,L:Xi,R:Es,D:Yi,V:Gr,I:_n,H:Vr,N:Cs,U:Rs,B:Ts,F:Is},Mp=Dn.litHtmlPolyfillSupport;Mp?.(Fn,_n),(Dn.litHtmlVersions??(Dn.litHtmlVersions=[])).push("3.3.1");var Ke=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new _n(t.insertBefore(Nn(),o),o,void 0,r??{})}return s._$AI(e),s};var er="today",Ir=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function or(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Kr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function el(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function tl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function rl(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function nl(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var cl=Op(ll(),1);function St(e){return(0,cl.default)(`beads-ui:${e}`)}function pr(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Zr(e,t){let r=pr(e.created_at),n=pr(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function pl(e,t){let r=pr(e.created_at),n=pr(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function fl(e,t){let r=pr(e.updated_at),n=pr(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function _l(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=pr(e.created_at),o=pr(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ml(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Vp=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ul(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function dl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Vp.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function gl(e,t){let r=ul(e),n=ul(t);if(r!==n)return r<n?-1:1;let s=dl(e),o=dl(t);if(s!==o)return s<o?-1:1;let a=pr(e&&e.created_at),i=pr(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Qo=2**20;function yn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-pr(e&&e.created_at)}function Ms(e){return(t,r)=>{let n=yn(t,e),s=yn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Xo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:yn(i,r)-Qo};if(!i)return{rank:yn(a,r)+Qo};let c=yn(a,r),u=yn(i,r),d=(c+u)/2;return c<d&&d<u?{rank:d}:{renormalize:n.map((p,_)=>({bead_id:p.id,rank:_*Qo}))}}function Jo(e,t={}){let r=St(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||Zr;function u(){for(let _ of Array.from(a))try{_()}catch{}}function d(){s=Array.from(n.values()).sort(c)}function p(_){if(i||!_||_.id!==e)return;let h=Number(_.revision)||0;if(r("apply %s rev=%d",_.type,h),!(h<=o&&_.type!=="snapshot")){if(_.type==="snapshot"){if(h<=o)return;n.clear();let x=Array.isArray(_.issues)?_.issues:[];for(let O of x)O&&typeof O.id=="string"&&O.id.length>0&&n.set(O.id,O);d(),o=h,u();return}if(_.type==="upsert"){let x=_.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let O=n.get(x.id);if(!O)n.set(x.id,x);else{let B=Number.isFinite(O.updated_at)?O.updated_at:0,V=Number.isFinite(x.updated_at)?x.updated_at:0;if(B<=V){for(let Z of Object.keys(O))Z in x||delete O[Z];for(let[Z,D]of Object.entries(x))O[Z]=D}}d()}o=h,u()}else if(_.type==="delete"){let x=String(_.issue_id||"");x&&(n.delete(x),d()),o=h,u()}}}return{id:e,subscribe(_){return a.add(_),()=>{a.delete(_)}},applyPush:p,snapshot(){return s},size(){return n.size},getById(_){return n.get(_)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function Ps(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function hl(e){let t=St("subs"),r=new Map,n=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let d=Array.isArray(c.added)?c.added:[],p=Array.isArray(c.updated)?c.updated:[],_=Array.isArray(c.removed)?c.removed:[];for(let h of Array.from(u)){let x=r.get(h);if(!x)continue;let O=x.itemsById;for(let B of d)typeof B=="string"&&B.length>0&&O.set(B,!0);for(let B of p)typeof B=="string"&&B.length>0&&O.set(B,!0);for(let B of _)typeof B=="string"&&B.length>0&&O.delete(B)}}async function o(i,c){let u=Ps(c);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let p=r.get(i);if(p&&p.key!==u){let _=n.get(p.key);_&&(_.delete(i),_.size===0&&n.delete(p.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let d=n.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(p){let _=r.get(i)||null;if(_){let h=n.get(_.key);h&&(h.delete(i),h.size===0&&n.delete(_.key))}throw r.delete(i),p}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let p=r.get(i)||null;if(p){let _=n.get(p.key);_&&(_.delete(i),_.size===0&&n.delete(p.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Ps,selectors:{getIds(i){let c=r.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=r.get(i);return u?u.itemsById.has(c):!1},count(i){let c=r.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=r.get(i),u={};if(!c)return u;for(let d of c.itemsById.keys())u[d]=!0;return u}}}}function bl(){let e=St("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,d){let p=u?Ps(u):"",_=r.get(c)||"",h=t.has(c);if(e("register %s key=%s (prev=%s)",c,p,_),h&&_&&p&&_!==p){let x=t.get(c);if(x)try{x.dispose()}catch{}let O=s.get(c);if(O){try{O()}catch{}s.delete(c)}let B=Jo(c,d);t.set(c,B);let V=B.subscribe(()=>o());s.set(c,V)}else if(!h){let x=Jo(c,d);t.set(c,x);let O=x.subscribe(()=>o());s.set(c,O)}return r.set(c,p),()=>i(c)}function i(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let d=s.get(c);if(d){try{d()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function yl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function vl(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function wl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ea(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Kp(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Yp(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function kl(e){let t=St("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Kp(n),a=Yp(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=ea(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?ea(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Zp=Object.freeze({workspace_config:{default_workspace:null}});function $l(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Zp.workspace_config.default_workspace}}}function xl(e={}){let t=St("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:$l(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?$l(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==r.workspace.hidden[d]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===r.worker.show_closed_children[d])&&!i&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Al(e){let t=St("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(p,_)=>{let h=s++,x=Date.now();n.set(h,{type:p,start_ts:x}),t("request start id=%d type=%s count=%d",h,p,r+1),a();let O=!1,B=()=>{O||(O=!0,n.delete(h),i())},V=setTimeout(()=>{O||(t("request TIMEOUT id=%d type=%s elapsed=%dms",h,p,Date.now()-x),B())},3e4);try{let Z=await u(p,_),D=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",h,p,D),Z}catch(Z){let D=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",h,p,D,Z),Z}finally{clearTimeout(V),B()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function me(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Ds(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(ml),c;switch(i){case"created_desc":return c.sort(Zr),c;case"created_asc":return c.sort(pl),c;case"updated_desc":return c.sort(fl),c;case"priority":return c.sort(_l),c;case"manual":default:{let u=r();return u?c.sort(Ms(u)):c.sort(Zr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Qr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Ht(e){let t=Qr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function ar(e,t){let r=Qr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Sl(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Qr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Ns(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function qs(e){let t=new Map;for(let n of e)n&&n.id&&!t.has(n.id)&&t.set(n.id,n);let r=new Map;for(let n of t.values()){let s=Ns(n);if(!s)continue;let o=r.get(s);o||(o=[],r.set(s,o)),o.push({id:n.id,title:n.title,status:n.status,metadata:n.metadata,workflow:n.workflow,created_at:n.created_at,updated_at:n.updated_at})}return r}function Fs(e,t){let r=e.get(t)||[],n=0;for(let o of r)(o.status==="resolved"||o.status==="closed")&&(n+=1);let s=Sl(r);return{total:r.length,count:n,current:s,children:r}}function js(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},d=n(Xo(i,c,u.order),a);s(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let _={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};r.set(_);let h=n(Xo(i,c,_.order),a);s(_,h);let x=await t("ui-order-set",{expected_revision:_.revision,entries:h});x&&x.applied&&r.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else p&&p.applied&&r.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:o}}function Bs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ta(e,t){return!t||typeof e!="string"||e.length===0||Bs(t.visible_labels).includes(e)?!0:Bs(t.hidden_labels).includes(e)?!1:!Bs(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function El(e,t){return Bs(e).filter(r=>ta(r,t))}function Or(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}function Qp(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Xp(e,t,r,n,s){return l`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${n?"true":"false"}
    @click=${s}
  >
    children ${t}/${r} ${n?"\u25B4":"\u25BE"}
  </button>`}function Jp(e,t,r,n){return l`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${n?s=>n(s,e.id):void 0}
  >
    <span class=${Qp(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${r}
  </button>`}function Us(e,t){let r=e.total||0,n=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(r===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=r>0?a.slice().sort(gl):a;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${r>0?Xp(t.parent_id,e.count,r,n,t.onToggle):l`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${r>0&&e.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${n&&r>0?l`<div class="board-card__roll-list">
            ${i.map((c,u)=>Jp(c,u+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var ef={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Cl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Tl={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},tf={review:"\u2713",skip:"\u2298"},Lr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function rf(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Rl(e){let t=e&&e.fill||"none";return t==="none"?Lr.none:e&&e.stale===!0?Lr.stale:t==="dim"?Lr.dim:e&&e.glyph==="review"?Lr.review:e&&e.glyph==="skip"?Lr.skip:Lr.done}function nf(e){if(!e||e.fill==="none"||!e.approval_state)return Rl(e);let t=[];return e.glyph==="review"?t.push(Lr.review):e.glyph==="skip"&&t.push(Lr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function sf(e,t,r){let n=ef[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=tf[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${c}>
        ${Cl[e]||e}
      </div>
    </div>
  `}function vn(e,t){if(!e||!e.stages)return"";let r=Tl[e.route]||Tl.spec_backed,n=e.stages,s=rf(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Cl[a]||a} ${a==="plan"?nf(n[a]||{}):Rl(n[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>sf(a,n[a]||{},a===s))}
    </div>
  `}function of(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Il=2;function af(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Il).join(", "),s=r.length-Il,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function ra(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Ol(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Xr(e){return`${e.kind}:${Ol(e)}@${e.sha}`}function Ws(e,t){if(!e)return null;let r=ra(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=ra(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,u=t?` \xB7 exec_receipt ${Xr(t)}`:"";return{kind:e.kind,label:i,title:`${c}${u}`}}function Ll(e,t){let r=Ws(e,t);return r?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function lf(e){if(!e)return null;let t=ra(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Xr(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function cf(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Or(r,"route")){let i=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&Or(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Or(r,"pr")){let i=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Ll(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Xr(i)}`}
        >${`exec ${i.kind==="delegated"?Ol(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of El(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Or(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Or(r,"blocked")&&s.push(...af(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Or(r,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function uf(e){let t=ar(e.created_at),r=ar(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
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
  </span>`}function df(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Us(r,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:uf(e),empty_label:"children \uC5C6\uC74C",childChips:na,onToggle:n=>t.onRollupToggle&&t.onRollupToggle(n,e.id),onChildClick:(n,s)=>t.onChildClick&&t.onChildClick(n,s)})}function na(e){let t=e?.workflow?.chips?.planned_execution,r=e?.workflow?.chips?.exec_receipt;return Ws(t,r)?l`<span class="board-card__roll-child-chips">
    ${Ll(t,r)}
    ${lf(r)}
  </span>`:null}function zs(e,t){let r=of(e.priority);return l`
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
      ${cf(e,t)}
      ${e.workflow&&Or(t.policy||null,"stepper")?vn(e.workflow,e.status):""}
      ${df(e,t)}
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
              ${Ir.map(o=>l`<option
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
  `}function Ml(e,t,r){return l`
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
  `}var pf=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ff=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],_f=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function mf(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
  `}function Pl(e,t,r){return l`
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
        ${pf.map(n=>l`<option
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
        ${ff.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${mf(e,t,r)}
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
        ${_f.map(n=>l`<option
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
  `}var gf=200,hf={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},bf=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Dl="beads-ui.board.sort",Nl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function yf(){try{let e=window.localStorage.getItem(Dl);if(e&&Nl.has(e))return e}catch{}return"created_desc"}function ql(e,t){let r=St("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.closedRange||er,_=s?Ds(s,a):null,h=js({transport:o,uiOrderStore:a}),x=[],O=[],B=[],V=[],Z=[],D=[],M=!1,L=0,U=yf(),b=new Map,j=new Map,te=new Map,re=new Set,_e={search:"",priority:"",type:"",labels:[]},pe=!1,be=null;function Te(S){return String(S.status||"open")==="open"}function Le(S){let P=String(S.status||"open");return P==="open"||P==="blocked"}function ne(S){let P=_e.search.trim().toLowerCase(),de=_e.priority,k=_e.type,E=_e.labels;return S.filter(F=>{if(P){let ee=String(F.id||"").toLowerCase(),ke=String(F.title||"").toLowerCase();if(!ee.includes(P)&&!ke.includes(P))return!1}if(de!==""&&String(F.priority)!==de||k!==""&&String(F.issue_type||"")!==k)return!1;if(E.length>0){let ee=Array.isArray(F.labels)?F.labels:[];if(!E.some(ke=>ee.includes(ke)))return!1}return!0})}function oe(){let S=new Set;for(let P of[x,O,B,V,Z,D])for(let de of P){let k=Array.isArray(de.labels)?de.labels:[];for(let E of k)typeof E=="string"&&E.length>0&&S.add(E)}return Array.from(S).sort()}function Ae(){return _e.search.trim()!==""||_e.priority!==""||_e.type!==""||_e.labels.length>0}function N(){try{if(_){let S=_.selectBoardColumn("tab:board:in-progress","in_progress",U),P=_.selectBoardColumn("tab:board:blocked","blocked",U).filter(Le),de=new Set(S.map(De=>De.id)),k=_.selectBoardColumn("tab:board:ready","ready",U).filter(De=>Te(De)&&!de.has(De.id)),E=_.selectBoardColumn("tab:board:resolved","resolved",U),F=_.selectBoardColumn("tab:board:deferred","deferred",U),ee=_.selectBoardColumn("tab:board:closed","closed").slice(0,gf),ke=[...P,...k,...S,...E,...ee];ie(ke);let ve=new Set;for(let De of ke)De&&De.id&&!Ns(De)&&ve.add(De.id);let Me=!Ae();x=Me?jn(P,ve):P,O=Me?jn(k,ve):k,B=Me?jn(S,ve):S,V=Me?jn(E,ve):E,Z=F,L=F.length,D=Me?jn(ee,ve):ee,b=new Map;for(let De of x)b.set(De.id,"open");for(let De of O)b.set(De.id,"open");for(let De of B)b.set(De.id,"in_progress");for(let De of V)b.set(De.id,"resolved");for(let De of Z)b.set(De.id,"deferred");for(let De of D)b.set(De.id,"closed");j=new Map;for(let De of x)j.set(De.id,"blocked-col");for(let De of O)j.set(De.id,"ready-col");for(let De of B)j.set(De.id,"in-progress-col");for(let De of V)j.set(De.id,"resolved-col");for(let De of D)j.set(De.id,"closed-col")}Xe()}catch{x=[],O=[],B=[],V=[],Z=[],D=[],te=new Map,Xe()}}function ie(S){te=qs(S)}function se(S){return Fs(te,S)}function Se(S){return!re.has(S)}function Ce(S,P){S.preventDefault(),S.stopPropagation(),re.has(P)?re.delete(P):re.add(P),Xe()}function C(S,P){S.preventDefault(),S.stopPropagation(),n(P)}function G(S,P){S.preventDefault(),S.stopPropagation(),n(P)}function $e(S,P){be||n(P)}function Ne(S,P){S.preventDefault(),S.stopPropagation(),vf(P).then(de=>{de&&me("\uBCF5\uC0AC\uB428","success",1200)})}function Pe(S,P){be=P,S.dataTransfer&&(S.dataTransfer.setData("text/plain",P),S.dataTransfer.effectAllowed="move"),S.target.classList.add("board-card--dragging")}function He(S){S.target.classList.remove("board-card--dragging"),kt(),setTimeout(()=>{be=null},0)}function Ze(S){let P=String(S.target.value||"");!P||P===p||(p=P,u&&u(P),Xe())}function ot(){return i?i.get():null}function at(S){let P=c?c.get():null,de=P?P.cleanup_failed:null;if(!de||typeof de!="object"||Array.isArray(de))return null;let k=de[S];return!k||typeof k!="object"||Array.isArray(k)?null:k}let nt={onCardClick:$e,onCopyId:Ne,onDragStart:Pe,onDragEnd:He,onClosedRangeChange:Ze,rollupFor:se,isExpanded:Se,onRollupToggle:Ce,onChildClick:C,onFromChipClick:G,cleanupFailureFor:at,get policy(){return ot()}};function K(S,P){be||(J(),n(P))}function Y(S,P){S.preventDefault(),S.stopPropagation(),J(),n(P)}let Ee={...nt,onCardClick:K,onChildClick:Y,onFromChipClick:Y,get policy(){return ot()}};function Ve(S){let P=S.target,de=e.querySelector(".board-filter__labels");P&&de&&de.contains(P)||R()}function ze(S){S.key==="Escape"&&R()}function fe(){pe||(pe=!0,document.addEventListener("mousedown",Ve),document.addEventListener("keydown",ze),Xe())}function R(){pe&&(pe=!1,document.removeEventListener("mousedown",Ve),document.removeEventListener("keydown",ze),Xe())}function Q(S){S.key==="Escape"&&J()}function ae(){M||(M=!0,document.addEventListener("keydown",Q),Xe())}function J(){M&&(M=!1,document.removeEventListener("keydown",Q),Xe())}let qe={onClose:J,onOverlayClick(S){S.target===S.currentTarget&&J()}},Qe={onSearchInput(S){_e.search=String(S.target.value||""),N()},onPriorityChange(S){_e.priority=String(S.target.value||""),N()},onTypeChange(S){_e.type=String(S.target.value||""),N()},onSortChange(S){let P=String(S.target.value||"");if(!(!Nl.has(P)||P===U)){U=P;try{window.localStorage.setItem(Dl,P)}catch{}N()}},onDeferredToggle(){M?J():ae()},onLabelMenuToggle(){pe?R():fe()},onLabelToggle(S){let P=_e.labels.indexOf(S);P===-1?_e.labels.push(S):_e.labels.splice(P,1),N()},onLabelClear(){_e.labels.length!==0&&(_e.labels=[],N())},onNewIssue(){d&&d()}};function it(){return l`
      <div class="board-view">
        ${Pl(_e,Qe,{sort_mode:U,deferred_popup_open:M,deferred_count:L,label_options:oe(),label_menu_open:pe})}
        <div class="board-root">
          ${wn({title:"Blocked",id:"blocked-col",items:ne(x)},nt)}
          ${wn({title:"Ready",id:"ready-col",items:ne(O)},nt)}
          ${wn({title:"In progress",id:"in-progress-col",items:ne(B)},nt)}
          ${wn({title:"Resolved",id:"resolved-col",items:ne(V)},nt)}
          ${wn({title:"Closed",id:"closed-col",items:ne(D),is_closed:!0,closed_range:p},nt)}
        </div>
        ${M?Ml({items:ne(Z),count:L},Ee,qe):""}
      </div>
    `}function Xe(){Ke(it(),e),pt()}function pt(){try{let S=e.querySelector("#deferred-popup");S&&!S.open&&(typeof S.showModal=="function"?S.showModal():S.setAttribute("open",""));let P=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let de of P)Array.from(de.querySelectorAll(".board-card")).forEach((E,F)=>{E.tabIndex=F===0?0:-1})}catch{}}async function yt(S,P){if(!o){me("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:S,status:P}),me("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(de){r("update-status failed: %o",de),me("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function gt(S){switch(S){case"blocked-col":return x;case"ready-col":return O;case"in-progress-col":return B;case"resolved-col":return V;default:return[]}}function ft(S,P,de){if(!o||!a)return;let k=gt(S),E=k.find(Me=>Me.id===P);if(!E)return;let F=k.filter(Me=>Me.id!==P),ee=de.closest?de.closest(".board-card"):null,ke=F.length;if(ee){let Me=ee.getAttribute("data-issue-id");if(Me===P)return;let De=F.findIndex(Rt=>Rt.id===Me);De>=0&&(ke=De)}let ve=F.slice();ve.splice(ke,0,E),h.applyReorder(P,ve,ke)}function kt(){for(let S of Array.from(e.querySelectorAll(".board-column--drag-over")))S.classList.remove("board-column--drag-over")}let We=null;e.addEventListener("dragover",S=>{S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect="move");let de=S.target.closest(".board-column");de&&de!==We&&(We&&We.classList.remove("board-column--drag-over"),de.classList.add("board-column--drag-over"),We=de)}),e.addEventListener("dragleave",S=>{let P=S.relatedTarget;(!P||!e.contains(P))&&We&&(We.classList.remove("board-column--drag-over"),We=null)}),e.addEventListener("drop",S=>{S.preventDefault(),We&&(We.classList.remove("board-column--drag-over"),We=null);let P=S.target,de=P.closest(".board-column");if(!de)return;let k=S.dataTransfer?.getData("text/plain")||"";if(!k)return;let E=de.id,F=j.get(k);if(F&&F===E){if(bf.has(E)){if(U!=="manual"){me("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ft(E,k,P)}return}let ee=hf[E];if(!ee){me("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}b.get(k)!==ee&&yt(k,ee)}),e.addEventListener("keydown",S=>{let P=S.target;if(!(P instanceof HTMLElement))return;let de=String(P.tagName||"").toLowerCase();if(de==="input"||de==="textarea"||de==="select"||de==="button"||de==="a"||P.isContentEditable===!0)return;let k=P.closest(".board-card");if(!k)return;let E=String(S.key||"");if(E==="Enter"||E===" "){S.preventDefault();let ve=k.getAttribute("data-issue-id");ve&&n(ve);return}if(E!=="ArrowUp"&&E!=="ArrowDown"&&E!=="ArrowLeft"&&E!=="ArrowRight")return;S.preventDefault();let F=k.closest(".board-column");if(!F)return;let ee=Array.from(F.querySelectorAll(".board-card")),ke=ee.indexOf(k);if(E==="ArrowDown"&&ke<ee.length-1){Ye(k,ee[ke+1]);return}if(E==="ArrowUp"&&ke>0){Ye(k,ee[ke-1]);return}if(E==="ArrowLeft"||E==="ArrowRight"){let ve=Array.from(e.querySelectorAll(".board-column")),Me=ve.indexOf(F),De=E==="ArrowRight"?1:-1,Rt=Me+De;for(;Rt>=0&&Rt<ve.length;){let lt=ve[Rt].querySelector(".board-card");if(lt){Ye(k,lt);return}Rt+=De}}});function Ye(S,P){try{S.tabIndex=-1,P.tabIndex=0,P.focus()}catch{}}let Ue=null;_&&_.subscribe&&(Ue=_.subscribe(()=>{try{N()}catch{}}));let ut=null;i&&i.subscribe&&(ut=i.subscribe(()=>{try{N()}catch{}}));let At=null;return c&&c.subscribe&&(At=c.subscribe(()=>{Xe()})),{async load(){r("load"),N()},clear(){R(),J(),Ue&&(Ue(),Ue=null),ut&&(ut(),ut=null),At&&(At(),At=null),e.replaceChildren(),x=[],O=[],B=[],V=[],Z=[],D=[],b=new Map,j=new Map}}}function jn(e,t){return e.filter(r=>{let n=Ns(r);return!(n&&t.has(n))})}async function vf(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function tr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Jr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Bn(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function wf(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Jr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Jr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(c=>{let u=d=>{typeof r.close=="function"&&r.close(),r.remove(),c(d)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function kr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await wf(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var kf=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Fl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},$f=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function qt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ct(e){return typeof e=="string"&&e.length>0?e:null}function kn(e){return e.startsWith("gpt-")?e.slice(4):e}function xt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function Bl(e,t,r){let n=Ct(t[e]);if(n!==null)return{value:n,source:"pin"};let s=Ct(r[e]);return s===null?null:{value:s,source:"global"}}function Un(e,t,r,n){return Bl(e,t,r)||{value:n,source:"base"}}function sa(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&qt(s?.[t])){let a=Ct(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&qt(s)){for(let a of Object.values(s))if(qt(a)){let i=Ct(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return Ct(n?.runners?.[o]?.models?.[e]?.id)||e}function xf(e,t){return Ct(t?.review?.reviewers?.[e]?.model)||e}function $n(e,t,r=!1){if(e==="default")return xt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?kn(e):e;return xt(e,t,n,e,"explicit")}function Ul(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];qt(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(qt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function Af(e,t){let r=[],n=e?.implementation?.model_catalog;qt(n)&&r.push(...Object.keys(n));let s=t?.runners;if(qt(s))for(let o of Object.keys(s))r.includes(o)||r.push(o);return r}function Sf(e,t,r){if(e===null)return{runtime:null,offered:!1};let n=!1;for(let s of Af(t,r)){let o=Ul(s,t,r);if(o.length>0&&(n=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:n}}function oa(e){return xt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function jl(e,t,r){let n=Bl(e,t,r);return n?$n(n.value,n.source):xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Qt(e){let t=qt(e.pin)?e.pin:{},r=qt(e.global)?e.global:{},n=qt(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&qt(n.session)?n.session:null,o=n?.supported===!0&&qt(n.orchestration)?n.orchestration:null,a=qt(e.runner_catalog)?e.runner_catalog:null,i=Ct(r.quick_fix_impl_model),c=Sf(i,s,a),u={};if(s){let d=Un("workflow_mode",t,r,Ct(s.workflow_mode_default));u.workflow_mode=d.source==="base"?xt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):$n(d.value,d.source);for(let D of["spec_review","plan_review","impl_review"]){let M=`${D}_model`,L=Ct(D==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),U=Un(M,t,r,L);if(U.value===null)u[M]=xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(U.value!=="self"&&U.value!=="skip"&&!qt(s.review?.reviewers?.[U.value]))u[M]=oa(xt(U.value,U.source,"",null,"explicit"));else{let b=xf(U.value,s);u[M]=xt(U.value,U.source,kn(b),b,U.source==="base"?"default":"explicit")}}for(let[D,M]of Object.entries(Fl)){let L=u[M].value;if(L==="self"||L==="skip"){u[D]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let U=Ct(s.review?.reviewers?.[L||""]?.effort),b=Un(D,t,r,U);u[D]=b.value===null?xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):xt(b.value,b.source,b.value,b.value,b.source==="base"?"default":"explicit")}let p=qt(s.implementation?.default)?s.implementation.default:{},_=Ct(e.route),h=_!==null&&["quick_fix","spec_backed","full_plan"].includes(_),x=qt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},O=h&&qt(x[_])?x[_]:{};for(let D of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let M=Un(D,t,r,D==="impl_dispatch"?Ct(O.dispatch)||Ct(p.dispatch):Ct(p[D.replace("impl_","")]));u[D]=M.value===null?xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):xt(M.value,M.source,M.value,M.value,M.source==="base"?"default":"explicit")}let B=Ct(t.impl_runtime),V=B==="inherit"?Ct(e.controller_runtime):B,Z=_==="quick_fix"&&Ct(t.impl_dispatch)===null&&c.runtime!==null&&(B===null||V===c.runtime);if(Z){let D=c.runtime,M=i;u.impl_dispatch=xt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(u.impl_runtime=xt(D,"global",`${D} (\uC720\uB3C4)`,D,"explicit")),Ct(t.impl_model)===null&&(u.impl_model=xt(M,"global",M,M,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let D of["impl_runtime","impl_model","impl_effort","impl_speed"])u[D]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!Z&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let D=u.impl_runtime.value==="inherit"?Ct(e.controller_runtime):u.impl_runtime.value,M=D?Ul(D,s,a):[];if(u.impl_model.value!=="auto"&&M.length>0&&!M.includes(u.impl_model.value))u.impl_model=oa(u.impl_model);else{let L=sa(u.impl_model.value,D,s,a);u.impl_model.display=kn(L),u.impl_model.full_value=L}}if(u.impl_effort.value==="auto"){let D=Ct(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),M=D?Ct(s.implementation?.effort_by_transport?.[D]?.auto):null;M&&!$f.has(M)?(u.impl_effort.display=`${M} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=M,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?xt("default","base","default (\uC77C\uBC18)","default","default"):$n("default",u.impl_speed.source))}}else for(let d of kf.filter(p=>!p.startsWith("orchestration_")))u[d]=jl(d,t,r);if(!s){for(let[d,p]of Object.entries(Fl))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=xt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=jl(d,t,r);continue}let p=d.replace("orchestration_",""),_=Ct(o[p]),h=Un(d,t,r,_);if(d==="orchestration_effort"&&h.source==="base"){u[d]=xt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(h.value===null){u[d]=xt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let x=h.source==="base"?Ct(o.model_id)||h.value:sa(h.value,null,s,a);u[d]=xt(h.value,h.source,kn(x),x,h.source==="base"?"default":"explicit");continue}if(h.value==="default"){u[d]=h.source==="base"?xt("default","base","default (\uC77C\uBC18)","default","default"):$n("default",h.source);continue}u[d]=$n(h.value,h.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=xt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${kn(d)})`,null,"default")}else if(c.runtime!==null){let d=sa(i,c.runtime,s,a);u.quick_fix_impl_model=xt(i,"global",kn(d),d,"explicit")}else c.offered?u.quick_fix_impl_model=oa(xt(i,"global","",null,"explicit")):u.quick_fix_impl_model=$n(i,"global");return u}function Ef(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function Hs(e){let t=qt(e.pin)?e.pin:{},r=qt(e.global)?e.global:{},n=qt(e.resolution_global)?{...e.resolution_global}:{};delete n[e.key];let s=p=>{let _={...n,...p};return Qt({pin:e.layer==="pin"?_:t,global:e.layer==="pin"?r:_,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:r,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],u=Ct(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Ef(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:d.map(p=>{let _=s({...o,[e.key]:p})[e.key];return{value:p,label:_.display,full_value:_.full_value}})}}function xn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let c=!1,u=p=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(p))},d=()=>u(n.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),n.addEventListener("keydown",p=>{p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),d())}),t.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var Vl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Bt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var $r=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Wn=[...$r,"reasoning_output_tokens"],Tf={codex:["implementation","review-consult"],claude:["subagent"]};function aa(e){let t=0;for(let r of $r)t+=Bt(e?.[r]);return t}function Cf(e){return!e||typeof e!="object"?!1:$r.some(t=>Number.isFinite(e[t]))}function Wl(e){return!e||typeof e!="object"?!1:Wn.some(t=>Number.isFinite(e[t]))}function Rf(e){let t={};for(let r of Wn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function zl(e){let t={};for(let r of Wn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Hl(e,t){return e==="codex"?Bt(t.input_tokens)+Bt(t.output_tokens):aa(t)}function If(e){return e==="claude"?"Claude":"Codex"}function Of(e){return`\u03C4 ${Kl(e)}`}function Lf(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${Bt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Bt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${Bt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Vl),o.join(`
`)}function Wt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${If(r)} ${Of(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Lf(r,n)})}return t}function Vs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of Wn)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=Bt(i.breakdown[c])+Bt(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ia(e){return!e||typeof e!="object"?null:ir({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Mf(e){return e==="codex"?"codex":"claude"}function br(){return{subtotal:0,breakdown:Rf(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Gs(e,t,r){e.subtotal+=t.subtotal;for(let n of Wn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=Bt(e.breakdown[n])+Bt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Gl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Kl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function An(e){return Cf(e)?`\u03C4 ${Kl(aa(e))}`:null}function xr(e){let t=An(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function zn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Bt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Bt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${aa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Vl),r.join(`
`)}function ir(e,t){let r={claude:br(),codex:br()},n={orchestrator:{claude:br(),codex:br()},implementation:{claude:br(),codex:br()},"review-consult":{claude:br(),codex:br()},subagent:{claude:br(),codex:br()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Wl(c)){let d=Mf(i.runner),p=zl(c),_={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:p,subtotal:Hl(d,p)};p.replayed===!0&&(_.replayed=!0),typeof i.model=="string"&&(_.model=i.model),typeof i.session_id=="string"&&(_.session_id=i.session_id),Gs(r[d],_,!0),Gs(n.orchestrator[d],_,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Tf[p].includes(d.role)||!Wl(d.usage))continue;let _=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let h=zl(d.usage),x={provider:p,role:d.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:Hl(p,h)};x.receipt_id=_,typeof d.agent_type=="string"&&(x.agent_type=d.agent_type),typeof d.agent_id=="string"&&(x.agent_id=d.agent_id),typeof d.model=="string"&&(x.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(x.effort=d.effort),typeof d.session_id=="string"?x.session_id=d.session_id:typeof d.thread_id=="string"&&(x.session_id=d.thread_id),typeof d.turn_id=="string"&&(x.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(x.completed_at=d.completed_at),h.replayed===!0&&(x.replayed=!0),Gs(r[p],x,!1),Gs(n[x.role][p],x,!1)}}let o={};for(let i of["claude","codex"]){let c=r[i];if(c.legs.length===0)continue;let u=Gl(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let c={};for(let u of["claude","codex"]){let d=n[i][u];d.legs.length>0&&(c[u]={...Gl(d,!0),legs:d.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:nc,setPrototypeOf:Yl,isFrozen:Pf,getPrototypeOf:Df,getOwnPropertyDescriptor:Nf}=Object,{freeze:Vt,seal:lr,create:_a}=Object,{apply:ma,construct:ga}=typeof Reflect<"u"&&Reflect;Vt||(Vt=function(t){return t});lr||(lr=function(t){return t});ma||(ma=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});ga||(ga=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Ks=Kt(Array.prototype.forEach),qf=Kt(Array.prototype.lastIndexOf),Zl=Kt(Array.prototype.pop),Hn=Kt(Array.prototype.push),Ff=Kt(Array.prototype.splice),Zs=Kt(String.prototype.toLowerCase),la=Kt(String.prototype.toString),ca=Kt(String.prototype.match),Gn=Kt(String.prototype.replace),jf=Kt(String.prototype.indexOf),Bf=Kt(String.prototype.trim),fr=Kt(Object.prototype.hasOwnProperty),Gt=Kt(RegExp.prototype.test),Vn=Uf(TypeError);function Kt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return ma(e,t,n)}}function Uf(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return ga(e,r)}}function ct(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Zs;Yl&&Yl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Pf(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Wf(e){for(let t=0;t<e.length;t++)fr(e,t)||(e[t]=null);return e}function Ar(e){let t=_a(null);for(let[r,n]of nc(e))fr(e,r)&&(Array.isArray(n)?t[r]=Wf(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Ar(n):t[r]=n);return t}function Kn(e,t){for(;e!==null;){let n=Nf(e,t);if(n){if(n.get)return Kt(n.get);if(typeof n.value=="function")return Kt(n.value)}e=Df(e)}function r(){return null}return r}var Ql=Vt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ua=Vt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),da=Vt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),zf=Vt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),pa=Vt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Hf=Vt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Xl=Vt(["#text"]),Jl=Vt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),fa=Vt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ec=Vt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ys=Vt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Gf=lr(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Vf=lr(/<%[\w\W]*|[\w\W]*%>/gm),Kf=lr(/\$\{[\w\W]*/gm),Yf=lr(/^data-[\-\w.\u00B7-\uFFFF]+$/),Zf=lr(/^aria-[\-\w]+$/),sc=lr(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Qf=lr(/^(?:\w+script|data):/i),Xf=lr(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),oc=lr(/^html$/i),Jf=lr(/^[a-z][.\w]*(-[.\w]+)+$/i),tc=Object.freeze({__proto__:null,ARIA_ATTR:Zf,ATTR_WHITESPACE:Xf,CUSTOM_ELEMENT:Jf,DATA_ATTR:Yf,DOCTYPE_NAME:oc,ERB_EXPR:Vf,IS_ALLOWED_URI:sc,IS_SCRIPT_OR_DATA:Qf,MUSTACHE_EXPR:Gf,TMPLIT_EXPR:Kf}),Yn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},e_=function(){return typeof window>"u"?null:window},t_=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},rc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ac(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e_(),t=Ie=>ac(Ie);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Yn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:_,trustedTypes:h}=e,x=c.prototype,O=Kn(x,"cloneNode"),B=Kn(x,"remove"),V=Kn(x,"nextSibling"),Z=Kn(x,"childNodes"),D=Kn(x,"parentNode");if(typeof a=="function"){let Ie=r.createElement("template");Ie.content&&Ie.content.ownerDocument&&(r=Ie.content.ownerDocument)}let M,L="",{implementation:U,createNodeIterator:b,createDocumentFragment:j,getElementsByTagName:te}=r,{importNode:re}=n,_e=rc();t.isSupported=typeof nc=="function"&&typeof D=="function"&&U&&U.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:pe,ERB_EXPR:be,TMPLIT_EXPR:Te,DATA_ATTR:Le,ARIA_ATTR:ne,IS_SCRIPT_OR_DATA:oe,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:N}=tc,{IS_ALLOWED_URI:ie}=tc,se=null,Se=ct({},[...Ql,...ua,...da,...pa,...Xl]),Ce=null,C=ct({},[...Jl,...fa,...ec,...Ys]),G=Object.seal(_a(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),$e=null,Ne=null,Pe=Object.seal(_a(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),He=!0,Ze=!0,ot=!1,at=!0,nt=!1,K=!0,Y=!1,Ee=!1,Ve=!1,ze=!1,fe=!1,R=!1,Q=!0,ae=!1,J="user-content-",qe=!0,Qe=!1,it={},Xe=null,pt=ct({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),yt=null,gt=ct({},["audio","video","img","source","image","track"]),ft=null,kt=ct({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),We="http://www.w3.org/1998/Math/MathML",Ye="http://www.w3.org/2000/svg",Ue="http://www.w3.org/1999/xhtml",ut=Ue,At=!1,S=null,P=ct({},[We,Ye,Ue],la),de=ct({},["mi","mo","mn","ms","mtext"]),k=ct({},["annotation-xml"]),E=ct({},["title","style","font","a","script"]),F=null,ee=["application/xhtml+xml","text/html"],ke="text/html",ve=null,Me=null,De=r.createElement("form"),Rt=function(T){return T instanceof RegExp||T instanceof Function},lt=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Me&&Me===T)){if((!T||typeof T!="object")&&(T={}),T=Ar(T),F=ee.indexOf(T.PARSER_MEDIA_TYPE)===-1?ke:T.PARSER_MEDIA_TYPE,ve=F==="application/xhtml+xml"?la:Zs,se=fr(T,"ALLOWED_TAGS")?ct({},T.ALLOWED_TAGS,ve):Se,Ce=fr(T,"ALLOWED_ATTR")?ct({},T.ALLOWED_ATTR,ve):C,S=fr(T,"ALLOWED_NAMESPACES")?ct({},T.ALLOWED_NAMESPACES,la):P,ft=fr(T,"ADD_URI_SAFE_ATTR")?ct(Ar(kt),T.ADD_URI_SAFE_ATTR,ve):kt,yt=fr(T,"ADD_DATA_URI_TAGS")?ct(Ar(gt),T.ADD_DATA_URI_TAGS,ve):gt,Xe=fr(T,"FORBID_CONTENTS")?ct({},T.FORBID_CONTENTS,ve):pt,$e=fr(T,"FORBID_TAGS")?ct({},T.FORBID_TAGS,ve):Ar({}),Ne=fr(T,"FORBID_ATTR")?ct({},T.FORBID_ATTR,ve):Ar({}),it=fr(T,"USE_PROFILES")?T.USE_PROFILES:!1,He=T.ALLOW_ARIA_ATTR!==!1,Ze=T.ALLOW_DATA_ATTR!==!1,ot=T.ALLOW_UNKNOWN_PROTOCOLS||!1,at=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,nt=T.SAFE_FOR_TEMPLATES||!1,K=T.SAFE_FOR_XML!==!1,Y=T.WHOLE_DOCUMENT||!1,ze=T.RETURN_DOM||!1,fe=T.RETURN_DOM_FRAGMENT||!1,R=T.RETURN_TRUSTED_TYPE||!1,Ve=T.FORCE_BODY||!1,Q=T.SANITIZE_DOM!==!1,ae=T.SANITIZE_NAMED_PROPS||!1,qe=T.KEEP_CONTENT!==!1,Qe=T.IN_PLACE||!1,ie=T.ALLOWED_URI_REGEXP||sc,ut=T.NAMESPACE||Ue,de=T.MATHML_TEXT_INTEGRATION_POINTS||de,k=T.HTML_INTEGRATION_POINTS||k,G=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&Rt(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(G.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&Rt(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(G.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(G.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),nt&&(Ze=!1),fe&&(ze=!0),it&&(se=ct({},Xl),Ce=[],it.html===!0&&(ct(se,Ql),ct(Ce,Jl)),it.svg===!0&&(ct(se,ua),ct(Ce,fa),ct(Ce,Ys)),it.svgFilters===!0&&(ct(se,da),ct(Ce,fa),ct(Ce,Ys)),it.mathMl===!0&&(ct(se,pa),ct(Ce,ec),ct(Ce,Ys))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?Pe.tagCheck=T.ADD_TAGS:(se===Se&&(se=Ar(se)),ct(se,T.ADD_TAGS,ve))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?Pe.attributeCheck=T.ADD_ATTR:(Ce===C&&(Ce=Ar(Ce)),ct(Ce,T.ADD_ATTR,ve))),T.ADD_URI_SAFE_ATTR&&ct(ft,T.ADD_URI_SAFE_ATTR,ve),T.FORBID_CONTENTS&&(Xe===pt&&(Xe=Ar(Xe)),ct(Xe,T.FORBID_CONTENTS,ve)),qe&&(se["#text"]=!0),Y&&ct(se,["html","head","body"]),se.table&&(ct(se,["tbody"]),delete $e.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw Vn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Vn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=T.TRUSTED_TYPES_POLICY,L=M.createHTML("")}else M===void 0&&(M=t_(h,s)),M!==null&&typeof L=="string"&&(L=M.createHTML(""));Vt&&Vt(T),Me=T}},Je=ct({},[...ua,...da,...zf]),Dt=ct({},[...pa,...Hf]),Ut=function(T){let le=D(T);(!le||!le.tagName)&&(le={namespaceURI:ut,tagName:"template"});let Re=Zs(T.tagName),_t=Zs(le.tagName);return S[T.namespaceURI]?T.namespaceURI===Ye?le.namespaceURI===Ue?Re==="svg":le.namespaceURI===We?Re==="svg"&&(_t==="annotation-xml"||de[_t]):!!Je[Re]:T.namespaceURI===We?le.namespaceURI===Ue?Re==="math":le.namespaceURI===Ye?Re==="math"&&k[_t]:!!Dt[Re]:T.namespaceURI===Ue?le.namespaceURI===Ye&&!k[_t]||le.namespaceURI===We&&!de[_t]?!1:!Dt[Re]&&(E[Re]||!Je[Re]):!!(F==="application/xhtml+xml"&&S[T.namespaceURI]):!1},Fe=function(T){Hn(t.removed,{element:T});try{D(T).removeChild(T)}catch{B(T)}},Ft=function(T,le){try{Hn(t.removed,{attribute:le.getAttributeNode(T),from:le})}catch{Hn(t.removed,{attribute:null,from:le})}if(le.removeAttribute(T),T==="is")if(ze||fe)try{Fe(le)}catch{}else try{le.setAttribute(T,"")}catch{}},It=function(T){let le=null,Re=null;if(Ve)T="<remove></remove>"+T;else{let vt=ca(T,/^[\r\n\t ]+/);Re=vt&&vt[0]}F==="application/xhtml+xml"&&ut===Ue&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let _t=M?M.createHTML(T):T;if(ut===Ue)try{le=new _().parseFromString(_t,F)}catch{}if(!le||!le.documentElement){le=U.createDocument(ut,"template",null);try{le.documentElement.innerHTML=At?L:_t}catch{}}let Mt=le.body||le.documentElement;return T&&Re&&Mt.insertBefore(r.createTextNode(Re),Mt.childNodes[0]||null),ut===Ue?te.call(le,Y?"html":"body")[0]:Y?le.documentElement:Mt},zt=function(T){return b.call(T.ownerDocument||T,T,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},v=function(T){return T instanceof p&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof d)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},w=function(T){return typeof i=="function"&&T instanceof i};function I(Ie,T,le){Ks(Ie,Re=>{Re.call(t,T,le,Me)})}let W=function(T){let le=null;if(I(_e.beforeSanitizeElements,T,null),v(T))return Fe(T),!0;let Re=ve(T.nodeName);if(I(_e.uponSanitizeElement,T,{tagName:Re,allowedTags:se}),K&&T.hasChildNodes()&&!w(T.firstElementChild)&&Gt(/<[/\w!]/g,T.innerHTML)&&Gt(/<[/\w!]/g,T.textContent)||T.nodeType===Yn.progressingInstruction||K&&T.nodeType===Yn.comment&&Gt(/<[/\w]/g,T.data))return Fe(T),!0;if(!(Pe.tagCheck instanceof Function&&Pe.tagCheck(Re))&&(!se[Re]||$e[Re])){if(!$e[Re]&&we(Re)&&(G.tagNameCheck instanceof RegExp&&Gt(G.tagNameCheck,Re)||G.tagNameCheck instanceof Function&&G.tagNameCheck(Re)))return!1;if(qe&&!Xe[Re]){let _t=D(T)||T.parentNode,Mt=Z(T)||T.childNodes;if(Mt&&_t){let vt=Mt.length;for(let Pt=vt-1;Pt>=0;--Pt){let f=O(Mt[Pt],!0);f.__removalCount=(T.__removalCount||0)+1,_t.insertBefore(f,V(T))}}}return Fe(T),!0}return T instanceof c&&!Ut(T)||(Re==="noscript"||Re==="noembed"||Re==="noframes")&&Gt(/<\/no(script|embed|frames)/i,T.innerHTML)?(Fe(T),!0):(nt&&T.nodeType===Yn.text&&(le=T.textContent,Ks([pe,be,Te],_t=>{le=Gn(le,_t," ")}),T.textContent!==le&&(Hn(t.removed,{element:T.cloneNode()}),T.textContent=le)),I(_e.afterSanitizeElements,T,null),!1)},ye=function(T,le,Re){if(Q&&(le==="id"||le==="name")&&(Re in r||Re in De))return!1;if(!(Ze&&!Ne[le]&&Gt(Le,le))){if(!(He&&Gt(ne,le))){if(!(Pe.attributeCheck instanceof Function&&Pe.attributeCheck(le,T))){if(!Ce[le]||Ne[le]){if(!(we(T)&&(G.tagNameCheck instanceof RegExp&&Gt(G.tagNameCheck,T)||G.tagNameCheck instanceof Function&&G.tagNameCheck(T))&&(G.attributeNameCheck instanceof RegExp&&Gt(G.attributeNameCheck,le)||G.attributeNameCheck instanceof Function&&G.attributeNameCheck(le,T))||le==="is"&&G.allowCustomizedBuiltInElements&&(G.tagNameCheck instanceof RegExp&&Gt(G.tagNameCheck,Re)||G.tagNameCheck instanceof Function&&G.tagNameCheck(Re))))return!1}else if(!ft[le]){if(!Gt(ie,Gn(Re,Ae,""))){if(!((le==="src"||le==="xlink:href"||le==="href")&&T!=="script"&&jf(Re,"data:")===0&&yt[T])){if(!(ot&&!Gt(oe,Gn(Re,Ae,"")))){if(Re)return!1}}}}}}}return!0},we=function(T){return T!=="annotation-xml"&&ca(T,N)},he=function(T){I(_e.beforeSanitizeAttributes,T,null);let{attributes:le}=T;if(!le||v(T))return;let Re={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ce,forceKeepAttr:void 0},_t=le.length;for(;_t--;){let Mt=le[_t],{name:vt,namespaceURI:Pt,value:f}=Mt,$=ve(vt),H=f,m=vt==="value"?H:Bf(H);if(Re.attrName=$,Re.attrValue=m,Re.keepAttr=!0,Re.forceKeepAttr=void 0,I(_e.uponSanitizeAttribute,T,Re),m=Re.attrValue,ae&&($==="id"||$==="name")&&(Ft(vt,T),m=J+m),K&&Gt(/((--!?|])>)|<\/(style|title|textarea)/i,m)){Ft(vt,T);continue}if($==="attributename"&&ca(m,"href")){Ft(vt,T);continue}if(Re.forceKeepAttr)continue;if(!Re.keepAttr){Ft(vt,T);continue}if(!at&&Gt(/\/>/i,m)){Ft(vt,T);continue}nt&&Ks([pe,be,Te],ue=>{m=Gn(m,ue," ")});let y=ve(T.nodeName);if(!ye(y,$,m)){Ft(vt,T);continue}if(M&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!Pt)switch(h.getAttributeType(y,$)){case"TrustedHTML":{m=M.createHTML(m);break}case"TrustedScriptURL":{m=M.createScriptURL(m);break}}if(m!==H)try{Pt?T.setAttributeNS(Pt,vt,m):T.setAttribute(vt,m),v(T)?Fe(T):Zl(t.removed)}catch{Ft(vt,T)}}I(_e.afterSanitizeAttributes,T,null)},et=function Ie(T){let le=null,Re=zt(T);for(I(_e.beforeSanitizeShadowDOM,T,null);le=Re.nextNode();)I(_e.uponSanitizeShadowNode,le,null),W(le),he(le),le.content instanceof o&&Ie(le.content);I(_e.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(Ie){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},le=null,Re=null,_t=null,Mt=null;if(At=!Ie,At&&(Ie="<!-->"),typeof Ie!="string"&&!w(Ie))if(typeof Ie.toString=="function"){if(Ie=Ie.toString(),typeof Ie!="string")throw Vn("dirty is not a string, aborting")}else throw Vn("toString is not a function");if(!t.isSupported)return Ie;if(Ee||lt(T),t.removed=[],typeof Ie=="string"&&(Qe=!1),Qe){if(Ie.nodeName){let f=ve(Ie.nodeName);if(!se[f]||$e[f])throw Vn("root node is forbidden and cannot be sanitized in-place")}}else if(Ie instanceof i)le=It("<!---->"),Re=le.ownerDocument.importNode(Ie,!0),Re.nodeType===Yn.element&&Re.nodeName==="BODY"||Re.nodeName==="HTML"?le=Re:le.appendChild(Re);else{if(!ze&&!nt&&!Y&&Ie.indexOf("<")===-1)return M&&R?M.createHTML(Ie):Ie;if(le=It(Ie),!le)return ze?null:R?L:""}le&&Ve&&Fe(le.firstChild);let vt=zt(Qe?Ie:le);for(;_t=vt.nextNode();)W(_t),he(_t),_t.content instanceof o&&et(_t.content);if(Qe)return Ie;if(ze){if(fe)for(Mt=j.call(le.ownerDocument);le.firstChild;)Mt.appendChild(le.firstChild);else Mt=le;return(Ce.shadowroot||Ce.shadowrootmode)&&(Mt=re.call(n,Mt,!0)),Mt}let Pt=Y?le.outerHTML:le.innerHTML;return Y&&se["!doctype"]&&le.ownerDocument&&le.ownerDocument.doctype&&le.ownerDocument.doctype.name&&Gt(oc,le.ownerDocument.doctype.name)&&(Pt="<!DOCTYPE "+le.ownerDocument.doctype.name+`>
`+Pt),nt&&Ks([pe,be,Te],f=>{Pt=Gn(Pt,f," ")}),M&&R?M.createHTML(Pt):Pt},t.setConfig=function(){let Ie=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};lt(Ie),Ee=!0},t.clearConfig=function(){Me=null,Ee=!1},t.isValidAttribute=function(Ie,T,le){Me||lt({});let Re=ve(Ie),_t=ve(T);return ye(Re,_t,le)},t.addHook=function(Ie,T){typeof T=="function"&&Hn(_e[Ie],T)},t.removeHook=function(Ie,T){if(T!==void 0){let le=qf(_e[Ie],T);return le===-1?void 0:Ff(_e[Ie],le,1)[0]}return Zl(_e[Ie])},t.removeHooks=function(Ie){_e[Ie]=[]},t.removeAllHooks=function(){_e=rc()},t}var ic=ac();var Sr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Qs=e=>(...t)=>({_$litDirective$:e,values:t}),Sn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Zn=class extends Sn{constructor(t){if(super(t),this.it=Lt,t.type!==Sr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Lt||t==null)return this._t=void 0,this.it=t;if(t===sr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Zn.directiveName="unsafeHTML",Zn.resultType=1;var lc=Qs(Zn);function va(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var tn=va();function mc(e){tn=e}var es={exec:()=>null};function ht(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Yt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var r_=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Yt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},n_=/^(?:[ \t]*(?:\n|$))+/,s_=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,o_=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ts=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,a_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,wa=/(?:[*+-]|\d{1,9}[.)])/,gc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,hc=ht(gc).replace(/bull/g,wa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),i_=ht(gc).replace(/bull/g,wa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ka=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,l_=/^[^\n]+/,$a=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,c_=ht(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",$a).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),u_=ht(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,wa).getRegex(),no="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",xa=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,d_=ht("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",xa).replace("tag",no).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),bc=ht(ka).replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",no).getRegex(),p_=ht(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",bc).getRegex(),Aa={blockquote:p_,code:s_,def:c_,fences:o_,heading:a_,hr:ts,html:d_,lheading:hc,list:u_,newline:n_,paragraph:bc,table:es,text:l_},cc=ht("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",no).getRegex(),f_={...Aa,lheading:i_,table:cc,paragraph:ht(ka).replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",cc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",no).getRegex()},__={...Aa,html:ht(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",xa).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:es,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ht(ka).replace("hr",ts).replace("heading",` *#{1,6} *[^
]`).replace("lheading",hc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},m_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,g_=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,yc=/^( {2,}|\\)\n(?!\s*$)/,h_=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,so=/[\p{P}\p{S}]/u,Sa=/[\s\p{P}\p{S}]/u,vc=/[^\s\p{P}\p{S}]/u,b_=ht(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Sa).getRegex(),wc=/(?!~)[\p{P}\p{S}]/u,y_=/(?!~)[\s\p{P}\p{S}]/u,v_=/(?:[^\s\p{P}\p{S}]|~)/u,w_=ht(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",r_?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),kc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,k_=ht(kc,"u").replace(/punct/g,so).getRegex(),$_=ht(kc,"u").replace(/punct/g,wc).getRegex(),$c="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",x_=ht($c,"gu").replace(/notPunctSpace/g,vc).replace(/punctSpace/g,Sa).replace(/punct/g,so).getRegex(),A_=ht($c,"gu").replace(/notPunctSpace/g,v_).replace(/punctSpace/g,y_).replace(/punct/g,wc).getRegex(),S_=ht("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,vc).replace(/punctSpace/g,Sa).replace(/punct/g,so).getRegex(),E_=ht(/\\(punct)/,"gu").replace(/punct/g,so).getRegex(),T_=ht(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),C_=ht(xa).replace("(?:-->|$)","-->").getRegex(),R_=ht("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",C_).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),eo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,I_=ht(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",eo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),xc=ht(/^!?\[(label)\]\[(ref)\]/).replace("label",eo).replace("ref",$a).getRegex(),Ac=ht(/^!?\[(ref)\](?:\[\])?/).replace("ref",$a).getRegex(),O_=ht("reflink|nolink(?!\\()","g").replace("reflink",xc).replace("nolink",Ac).getRegex(),uc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ea={_backpedal:es,anyPunctuation:E_,autolink:T_,blockSkip:w_,br:yc,code:g_,del:es,emStrongLDelim:k_,emStrongRDelimAst:x_,emStrongRDelimUnd:S_,escape:m_,link:I_,nolink:Ac,punctuation:b_,reflink:xc,reflinkSearch:O_,tag:R_,text:h_,url:es},L_={...Ea,link:ht(/^!?\[(label)\]\((.*?)\)/).replace("label",eo).getRegex(),reflink:ht(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",eo).getRegex()},ha={...Ea,emStrongRDelimAst:A_,emStrongLDelim:$_,url:ht(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",uc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ht(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",uc).getRegex()},M_={...ha,br:ht(yc).replace("{2,}","*").getRegex(),text:ht(ha.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Xs={normal:Aa,gfm:f_,pedantic:__},Qn={normal:Ea,gfm:ha,breaks:M_,pedantic:L_},P_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},dc=e=>P_[e];function Er(e,t){if(t){if(Yt.escapeTest.test(e))return e.replace(Yt.escapeReplace,dc)}else if(Yt.escapeTestNoEncode.test(e))return e.replace(Yt.escapeReplaceNoEncode,dc);return e}function pc(e){try{e=encodeURI(e).replace(Yt.percentDecode,"%")}catch{return null}return e}function fc(e,t){let r=e.replace(Yt.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(Yt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Yt.slashPipe,"|");return n}function Xn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function D_(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function _c(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,c}function N_(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var to=class{constructor(e){wt(this,"options");wt(this,"rules");wt(this,"lexer");this.options=e||tn}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Xn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=N_(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Xn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Xn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Xn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))i.push(r[c]),a=!0;else if(!a)i.push(r[c]);else break;r=r.slice(c);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=p,r.length===0)break;let _=o.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let h=_,x=h.raw+`
`+r.join(`
`),O=this.blockquote(x);o[o.length-1]=O,n=n.substring(0,n.length-h.raw.length)+O.raw,s=s.substring(0,s.length-h.text.length)+O.text;break}else if(_?.type==="list"){let h=_,x=h.raw+`
`+r.join(`
`),O=this.list(x);o[o.length-1]=O,n=n.substring(0,n.length-_.raw.length)+O.raw,s=s.substring(0,s.length-h.raw.length)+O.raw,r=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,O=>" ".repeat(3*O.length)),_=e.split(`
`,1)[0],h=!p.trim(),x=0;if(this.options.pedantic?(x=2,d=p.trimStart()):h?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,d=p.slice(x),x+=t[1].length),h&&this.rules.other.blankLine.test(_)&&(u+=_+`
`,e=e.substring(_.length+1),c=!0),!c){let O=this.rules.other.nextBulletRegex(x),B=this.rules.other.hrRegex(x),V=this.rules.other.fencesBeginRegex(x),Z=this.rules.other.headingBeginRegex(x),D=this.rules.other.htmlBeginRegex(x);for(;e;){let M=e.split(`
`,1)[0],L;if(_=M,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),L=_):L=_.replace(this.rules.other.tabCharGlobal,"    "),V.test(_)||Z.test(_)||D.test(_)||O.test(_)||B.test(_))break;if(L.search(this.rules.other.nonSpaceChar)>=x||!_.trim())d+=`
`+L.slice(x);else{if(h||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(p)||Z.test(p)||B.test(p))break;d+=`
`+_}!h&&!_.trim()&&(h=!0),u+=M+`
`,e=e.substring(M.length+1),p=L.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=d.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=d.raw+c.tokens[0].raw,c.tokens[0].text=d.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(d)):c.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):c.tokens.unshift(d)}}if(!s.loose){let u=c.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=d}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=fc(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(fc(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Xn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=D_(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),_c(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return _c(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let d=[...n[0]][0].length,p=e.slice(0,s+n.index+d+a);if(Math.min(s,a)%2){let h=p.slice(1,-1);return{type:"em",raw:p,text:h,tokens:this.lexer.inlineTokens(h)}}let _=p.slice(2,-2);return{type:"strong",raw:p,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},_r=class ba{constructor(t){wt(this,"tokens");wt(this,"options");wt(this,"state");wt(this,"inlineQueue");wt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||tn,this.options.tokenizer=this.options.tokenizer||new to,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Yt,block:Xs.normal,inline:Qn.normal};this.options.pedantic?(r.block=Xs.pedantic,r.inline=Qn.pedantic):this.options.gfm&&(r.block=Xs.gfm,this.options.breaks?r.inline=Qn.breaks:r.inline=Qn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Xs,inline:Qn}}static lex(t,r){return new ba(r).lex(t)}static lexInline(t,r){return new ba(r).inlineTokens(t)}lex(t){t=t.replace(Yt.carriageReturn,`
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
`;return n?'<pre><code class="language-'+Er(n)+'">'+(r?s:Er(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Er(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Er(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=pc(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Er(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=pc(e);if(s===null)return Er(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Er(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Er(e.text)}},Ta=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},mr=class ya{constructor(t){wt(this,"options");wt(this,"renderer");wt(this,"textRenderer");this.options=t||tn,this.options.renderer=this.options.renderer||new ro,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ta}static parse(t,r){return new ya(r).parse(t)}static parseInline(t,r){return new ya(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Js,Jn=(Js=class{constructor(e){wt(this,"options");wt(this,"block");this.options=e||tn}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?_r.lex:_r.lexInline}provideParser(){return this.block?mr.parse:mr.parseInline}},wt(Js,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),wt(Js,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Js),q_=class{constructor(...e){wt(this,"defaults",va());wt(this,"options",this.setOptions);wt(this,"parse",this.parseMarkdown(!0));wt(this,"parseInline",this.parseMarkdown(!1));wt(this,"Parser",mr);wt(this,"Renderer",ro);wt(this,"TextRenderer",Ta);wt(this,"Lexer",_r);wt(this,"Tokenizer",to);wt(this,"Hooks",Jn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new ro(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new to(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Jn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],c=s[a];Jn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Jn.passThroughHooksRespectAsync.has(o))return(async()=>{let p=await i.call(s,u);return c.call(s,p)})();let d=i.call(s,u);return c.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await i.apply(s,u);return p===!1&&(p=await c.apply(s,u)),p})();let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return _r.lex(e,t??this.defaults)}parser(e,t){return mr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?_r.lex:_r.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?mr.parse:mr.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?_r.lex:_r.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?mr.parse:mr.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Er(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},en=new q_;function bt(e,t){return en.parse(e,t)}bt.options=bt.setOptions=function(e){return en.setOptions(e),bt.defaults=en.defaults,mc(bt.defaults),bt};bt.getDefaults=va;bt.defaults=tn;bt.use=function(...e){return en.use(...e),bt.defaults=en.defaults,mc(bt.defaults),bt};bt.walkTokens=function(e,t){return en.walkTokens(e,t)};bt.parseInline=en.parseInline;bt.Parser=mr;bt.parser=mr.parse;bt.Renderer=ro;bt.TextRenderer=Ta;bt.Lexer=_r;bt.lexer=_r.lex;bt.Tokenizer=to;bt.Hooks=Jn;bt.parse=bt;var zy=bt.options,Hy=bt.setOptions,Gy=bt.use,Vy=bt.walkTokens,Ky=bt.parseInline;var Yy=mr.parse,Zy=_r.lex;function Mr(e){let t=bt.parse(e),r=ic.sanitize(t);return lc(r)}function Tr(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function En(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function oo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Ec={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},F_={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},j_=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,B_=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function yr(e){return!!e&&typeof e=="object"}function Ca(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ra(e,t){let r=Ca(e),n=Ca(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Tc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>yr(s)&&typeof s.text=="string"?s.text:"").join(""):yr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function U_(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Ec[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Ca(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ra(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let c=Ra(yr(i)?i.old_string:"",yr(i)?i.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(n.launch_id=e.id),typeof r.description=="string"&&(n.command=r.description)),n}function Ia(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Oa(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=j_.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:B_.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function W_(e,t){let r=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let n=e.message,s=n&&Array.isArray(n.content)?n.content:[],o=[];for(let a of s)if(yr(a)){if(a.type==="text"&&typeof a.text=="string")o.push(Oa(a.text));else if(a.type==="thinking"){let i=Ia(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=U_(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return r?Sc(o,r):o}if(e.type==="user"){let n=e.message,s=n&&Array.isArray(n.content)?n.content:[];for(let o of s)if(yr(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=Tc(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let n=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:n,text:typeof e.result=="string"?e.result:n?"DONE":""};return r?Sc([s],r):[s]}return[]}function Sc(e,t){for(let r of e)r.parent_tool_use_id=t;return e}function z_(e){let t=typeof e.command=="string"?e.command:"",r=Tc(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",r].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Ec.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function H_(e){if(e.type==="item.completed"&&yr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Oa(t.text)];if(t.type==="reasoning"){let r=Ia(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[z_(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function G_(e){if(e.schema!=="codex-delegation-monitor-v1"||!yr(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&yr(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[Oa(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=Ia(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=F_[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function V_(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function K_(e){let t=e;if(typeof e=="string"){let r=e.trim();if(r.length===0)return null;try{t=JSON.parse(r)}catch{return null}}return yr(t)?t:null}function Cc(e={}){let t=e.skip_delegated===!0,r=new Map;return{push(n){let s=K_(n);return s?t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0?[]:s.schema==="codex-delegation-monitor-v1"?G_(s):V_(s)?H_(s):W_(s,r):[]}}}function La(e){let t=[],r=Cc(),n=Array.isArray(e)?e:[];for(let s of n)for(let o of r.push(s))t.push(o);return t}var Y_=5,Z_=10,Q_=/Task\s+#(\d+)/,X_=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,J_=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ao(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function em(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function tm(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function rm(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Q_.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function nm(e){if(e.tool==="Bash"){let t=e.command||"";return X_.test(t)?"~ PR/\uAC8C\uC2DC \uC911":J_.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function sm(e){let t=e.filter(s=>s.kind==="tool").slice(-Z_),r=new Map;t.forEach((s,o)=>{let a=nm(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function om(e){let t=tm(e);if(t)return{text:t,guess:!1};let r=rm(e);if(r)return{text:r,guess:!1};let n=sm(e);return n?{text:n,guess:!0}:null}function am(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:ar(e,t)}function Tn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,c=null,u=!1,d={},p=!0,_=new Set,h=new Set,x=null,O=null,B=!1,V=!1,Z=!1,D=null,M=null;function L(){B=!1,V=!1,Z=!1,D=null,M=null}async function U(K){if(r){V=!0,Z=!1,G();try{let Y=await Promise.resolve(r("get-attempt-prompt",{attempt_id:K,...c?{root_dir:c}:{}}));if(o!==K)return;!Y||typeof Y!="object"||Array.isArray(Y)?Z=!0:(D=Y,M=K)}catch{o===K&&(Z=!0)}finally{o===K&&(V=!1,G())}}}function b(){if(B=!B,B&&o&&M!==o){U(o);return}G()}function j(){if(!B)return"";let K=En({loading:V,error:Z});if(K)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${K}
      </div>`;if(!D)return"";if(D.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Y=oo(D.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Y?l`<div class="prompt-block__meta">${Y} 발송</div>`:""}
      ${typeof D.task_prompt=="string"?Tr("\uACFC\uC5C5 (user)",D.task_prompt):""}
      ${typeof D.system_prompt=="string"?Tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",D.system_prompt):""}
    </div>`}function te(){if(!i||!n)return[];let K=n.get(i);return La(K?K.lines:[])}function re(){if(!i||!n)return null;let K=n.get(i),Y=K?K.last_event_at:null;return typeof Y=="number"?Y:null}function _e(){return d.status==="running"}function pe(){if(_e()&&o){O||(O=setInterval(()=>G(),1e3));return}be()}function be(){O&&(clearInterval(O),O=null)}function Te(K){let Y=[],Ee=0;for(;Ee<K.length;){let{idx:Ve,line:ze}=K[Ee];if(ze.kind==="tool"){let fe=Ee;for(;fe<K.length&&K[fe].line.kind==="tool"&&K[fe].line.tool===ze.tool;)fe+=1;if(fe-Ee>=Y_&&!h.has(Ve)){Y.push({kind:"group",idx:Ve,tool:ze.tool||"",lines:K.slice(Ee,fe)}),Ee=fe;continue}}Y.push({kind:"line",idx:Ve,line:ze}),Ee+=1}return Y}function Le(K){let Y=[],Ee=new Map;for(let fe=0;fe<K.length;fe+=1){let R=K[fe],Q=R.parent_tool_use_id;if(typeof Q=="string"&&Q.length>0){let ae=Ee.get(Q);ae||(ae={kind:"subagent",idx:fe,launch_id:Q,agent_type:null,header:null,lines:[]},Ee.set(Q,ae),Y.push(ae)),ae.lines.push({idx:fe,line:R});continue}if(R.kind==="tool"&&R.tool==="Agent"&&typeof R.launch_id=="string"&&R.launch_id.length>0){let ae=ne(R),J=Ee.get(R.launch_id);if(J){J.header={idx:fe,line:R},J.agent_type=ae;continue}let qe={kind:"subagent",idx:fe,launch_id:R.launch_id,agent_type:ae,header:{idx:fe,line:R},lines:[]};Ee.set(R.launch_id,qe),Y.push(qe);continue}Y.push({kind:"entry",idx:fe,line:R})}let Ve=[],ze=0;for(;ze<Y.length;){if(Y[ze].kind!=="entry"){Ve.push(Y[ze]),ze+=1;continue}let fe=ze;for(;fe<Y.length&&Y[fe].kind==="entry";)fe+=1;Ve.push(...Te(Y.slice(ze,fe))),ze=fe}return Ve}function ne(K){let Y=K.input;return Y&&typeof Y.subagent_type=="string"?Y.subagent_type:null}function oe(K){for(let Y=K.length-1;Y>=0;Y-=1){let Ee=K[Y];if(Ee.kind==="result"||Ee.kind==="error")return null;if(Ee.kind==="tool"&&!Object.hasOwn(Ee,"result"))return Ee}return null}function Ae(K){for(let Y=K.length-1;Y>=0;Y-=1)if(K[Y].kind==="thinking")return K[Y];return null}function N(K,Y){if(Y.kind==="gate")return l`<div class="sv__gate">${Y.text}</div>`;if(Y.kind==="phase")return l`<div class="sv__phase">${Y.text}</div>`;if(Y.kind==="result")return l`<div
        class="sv__result${Y.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Y.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Mr(Y.text||(Y.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Y.kind==="thinking"){let Ee=_.has(K);return l`<div
        class="sv__think${Ee?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ne(K)}
      >
        <span class="sv__think-line">💭 ${ao(Y.text)}</span>
        ${Ee?l`<pre class="sv__think-expand">${Y.text}</pre>`:""}
      </div>`}if(Y.kind==="error")return l`<div class="sv__error">⛔ ${Y.text}</div>`;if(Y.kind==="blocker")return l`<div class="sv__error">⛔ ${Y.text}</div>`;if(Y.kind==="tool"){let Ee=_.has(K),Ve=Y.tool==="Bash"?em(Y.command):0,ze=Y.tool==="Bash"?Ve>1?ao(Y.command):Y.command:Y.path||Y.command||"";return l`<div
        class="sv__tool${Ee?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ne(K)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Y.icon}</span>
          <span class="sv__tool-name">${Y.tool}</span>
          ${ze?l`<span class="sv__tool-detail">${ze}</span>`:""}
          ${Ve>1?l`<span class="sv__tool-more">⋯ ${Ve}줄</span>`:""}
          ${typeof Y.added=="number"?l`<span class="sv__diff-add">+${Y.added}</span>`:""}
          ${typeof Y.removed=="number"?l`<span class="sv__diff-del">−${Y.removed}</span>`:""}
          ${Y.result?l`<span class="sv__tool-ok">→ ${Y.result}</span>`:""}
        </span>
        ${Ee?l`<pre class="sv__tool-expand">${ie(Y)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Mr(Y.text||"")}</div>`}function ie(K){let Y=[];if(K.tool==="Bash"&&typeof K.command=="string"&&K.command.length>0)Y.push(K.command);else if(K.input!==void 0)try{Y.push(`input: ${JSON.stringify(K.input,null,2)}`)}catch{}return typeof K.output=="string"&&K.output.length>0&&Y.push(`output:
${K.output}`),Y.join(`

`)}function se(){if(!o)return l``;let K=te(),Y=(a?[d.agent_type,d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),Ee=d.session_id||"",Ve=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,ze=_e(),fe=ze?am(re(),Date.now()):"",R=ze?oe(K):null,Q=ze?Ae(K):null,ae=om(K);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${ae?l`<span
              class="sv__stage${ae.guess?" sv__stage--guess":""}"
              title=${ae.text}
              >${ae.text}</span
            >`:""}
        ${ze?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${fe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${fe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${fe?l`<span class="sv__live-ago">${fe}</span>`:""}</span
            >`:""}
        ${Ee?l`<button
              type="button"
              class="sv__session"
              title=${Ee}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ee}`}
              @click=${()=>He(Ee)}
            >
              ⧉ ${Ee.slice(0,8)}
            </button>`:""}
        ${Y?l`<span class="sv__meta">${Y}</span>`:""}
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
          aria-label=${Ve}
          @click=${Pe}
        >
          <span class="sv__follow-full">⇣ ${Ve}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>nt()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":j()}
      <div class="sv__body">
        ${K.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:Le(K).map(J=>J.kind==="subagent"?Ce(J):J.kind==="group"?Se(J):N(J.idx,J.line))}
      </div>
      ${R||Q?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${R?l`<span class="sv__now-icon">${R.icon}</span>
                  <span class="sv__now-name">${R.tool}</span>
                  <span class="sv__now-detail"
                    >${R.tool==="Bash"?ao(R.command):R.path||R.command||""}</span
                  >`:""}
            ${Q?l`<span class="sv__now-think"
                  >💭 ${ao(Q.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Se(K){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>C(K.idx)}
    >
      <span class="sv__group-icon">${K.lines[0].line.icon}</span>
      <span class="sv__group-name">${K.tool}</span>
      <span class="sv__group-count">${K.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ce(K){let Y=h.has(K.idx),Ee=K.header?K.header.line:null,Ve=Ee?Ee.is_error===!0?"\u2717":typeof Ee.result=="string"?"\u2713":"\u27F3":"",ze=Ee&&Ee.command?Ee.command:"";return l`<div class="sv__sub${Y?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>C(K.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${K.agent_type||"subagent"}</span>
        ${ze?l`<span class="sv__sub-detail">${ze}</span>`:""}
        <span class="sv__sub-count">${K.lines.length}줄</span>
        ${Ve?l`<span class="sv__sub-state">${Ve}</span>`:""}
        ${Y?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Y?l`<div class="sv__sub-body">
            ${Te(K.lines).map(fe=>fe.kind==="group"?Se(fe):N(fe.idx,fe.line))}
          </div>`:""}
    </div>`}function C(K){h.add(K),G()}function G(){Ke(se(),e),pe(),p&&$e()}function $e(){let K=e.querySelector(".sv__body");K&&(K.scrollTop=K.scrollHeight)}function Ne(K){_.has(K)?_.delete(K):_.add(K),G()}function Pe(){p=!p,G()}function He(K){tr(K).then(Y=>{Y?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ze(K){!o||!K||(d={...d,...K},G())}function ot(K){let Y=K.target;if(!Y||!Y.classList||!Y.classList.contains("sv__body"))return;!(Y.scrollHeight-Y.scrollTop-Y.clientHeight<=4)&&p&&(p=!1,G())}e.addEventListener("scroll",ot,!0);function at(K){let Y=K&&K.attempt_id;if(!Y)return;let Ee=i;o=Y,a=typeof K.launch_id=="string"&&K.launch_id.length>0?K.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&Ee&&Ee!==i&&Promise.resolve(r("unsubscribe-session-log",{id:Ee})).catch(()=>{}),c=typeof K.root_dir=="string"&&K.root_dir.length>0?K.root_dir:null,d=K.meta||{},u=K.hide_prompt===!0,p=!0,_.clear(),h.clear(),L(),!x&&n&&(x=n.subscribe(G)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),G()}function nt(){let K=i;o=null,a=null,i=null,c=null,u=!1,_.clear(),h.clear(),L(),be(),r&&K&&Promise.resolve(r("unsubscribe-session-log",{id:K})).catch(()=>{}),Ke(l``,e),s&&s()}return{open:at,updateMeta:Ze,close:nt,isOpen(){return o!==null},destroy(){be(),x&&(x(),x=null),e.removeEventListener("scroll",ot,!0),o=null,a=null,i=null,c=null,u=!1,Ke(l``,e)}}}function io(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Ma(t.spec_id),s=Ma(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ma(e){return typeof e=="string"?e.trim():""}function Rc(e){let t=io(e);if(t.path)return t;let r=Ma(im(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function im(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function lm(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function cm(e){let t=e&&e.metadata||{},r=Rc(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:lm(t)?null:"plan_pending"}),n}function Ic(e,t){let r=cm(e);return l`
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
  `}var um="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",dm=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,pm=/^\*\*결론\*\* — (.+)$/;function lo(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==um)return null;let r=dm.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?pm.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Oc=20;function Lc(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function fm(e){return e.length>Oc?`${e.slice(0,Oc)}\u2026`:e}function _m(e,t,r,n){let s=`${t.lane} ${fm(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Lc(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${Mr(t.body)}
        </div>`:""}
  </div>`}function mm(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Lc(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Mr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Mc(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=lo(typeof c.text=="string"?c.text:"");return u?_m(c,u,t,s.has(c.id)):mm(c)})}
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
  `}var{I:Iv}=Ji;var Pc=e=>e.strings===void 0;var gm={},Dc=(e,t=gm)=>e._$AH=t;var rn=Qs(class extends Sn{constructor(e){if(super(e),e.type!==Sr.PROPERTY&&e.type!==Sr.ATTRIBUTE&&e.type!==Sr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Pc(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===sr||t===Lt)return t;let r=e.element,n=e.name;if(e.type===Sr.PROPERTY){if(t===r[n])return sr}else if(e.type===Sr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return sr}else if(e.type===Sr.ATTRIBUTE&&r.getAttribute(n)===t+"")return sr;return Dc(e),t}});var co=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Da=[...co.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Cr=["orchestration_model","orchestration_effort","orchestration_speed"],uo=[...co,...Cr],hm=Da.filter(e=>uo.includes(e)),Nc=["delegated","main"],po=["inherit","claude","codex"],rs=["default","fast"],ns=["standard","fast_track"],ss=["codex","opus","fable","self","skip"],fo=["codex","fable","skip"],_o=["low","medium","high","xhigh"],nr="auto";function rr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function qc(e){if(!rr(e)||!rr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))rr(n)&&rr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Cn(e,t){let r=qc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[nr,...n.flatMap(([,s])=>s)]}function Fc(e,t,r,n){if(!rr(e)||!rr(e.runners))return[nr];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!rr(a)||!rr(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(r&&r!==nr&&i!==r)continue;let u=n(a,c);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[nr,...s]}function Rn(e,t,r){return Fc(e,t,r,(n,s)=>rr(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function Na(e,t,r){return Fc(e,t,r,(n,s)=>rr(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:rr(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function os(e,t){let r=qc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function jc(e,t,r){let n={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:n.impl_runtime==="inherit"?r:null;return s&&(n.impl_model&&!Cn(t,s).includes(n.impl_model)&&(n.impl_model=void 0),n.impl_effort&&!Rn(t,s,n.impl_model||nr).includes(n.impl_effort)&&(n.impl_effort=void 0)),n}var bm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Pa=[...hm,...Cr],ym=[...uo,...Da].filter((e,t,r)=>r.indexOf(e)===t&&!Pa.includes(e));function Bc(e,t){let r=rr(e)?e:{},n=rr(t)?t:{},s=[];for(let a of Pa){let i=r[a]??null,c=n[a]??null;i!==c&&s.push({key:a,label:bm[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...ym,...Object.keys(n)])!Pa.includes(a)&&!o.includes(a)&&Object.hasOwn(n,a)&&o.push(a);return{rows:s,ignored_keys:o}}function qa(e,t,r,n,s,o){return Hs({key:e,choices:t,layer:"global",global:r,resolution_global:o,execution_defaults:n,runner_catalog:s})}function Uc(e,t){let r={};for(let n of Da){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Wc(e,t){let r={};for(let n of Cr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Fa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Cr]}],Pr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},mo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ja(e,t,r,n,s,o=null){let a=Qt({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function zc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of ja(e,t,r,n,s,o))a[i.source]+=1;return a}function Hc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Gc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Uv=[...co,...Cr];var vm=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],wm={pin:"pin",global:"global",base:"base"};function km(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${wm[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function $m(e,t,r){switch(e){case"workflow_mode":return ns;case"spec_review_model":case"impl_review_model":return ss;case"plan_review_model":return fo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return _o;case"impl_dispatch":return Nc;case"impl_runtime":return po;case"impl_model":return Cn(r,t.impl_runtime);case"impl_effort":return Rn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return rs;case"orchestration_model":return os(r,null);case"orchestration_effort":return Rn(r,void 0,t.orchestration_model||nr).filter(n=>n!==nr);default:return[]}}function xm(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${km(e.source)}
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
  </div>`}function Vc(e,t){let r=Fa.flatMap(c=>c.keys),n=ja(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=zc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(c=>[c.key,c])),a=Object.fromEntries(n.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=n.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return l`<details
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
        >${Am(o)}</span
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
          ${Fa.map(c=>l`
              <div class="detail-effective__subhead">${c.label}</div>
              ${n.filter(u=>c.keys.includes(u.key)).map(u=>{let d=Hs({key:u.key,choices:$m(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return xm(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
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
  </details>`}function Am(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Sm(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function Kc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=Sm(r.exec_receipt),c=i?Xr(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=Ws(r.planned_execution,r.exec_receipt);return l`<section class="detail-summary" data-seam="detail-summary">
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
      ${vm.map(p=>{let _=p.receipt&&typeof t[p.receipt]=="string"?String(t[p.receipt]):"",h=n[p.id],x=_.length>0||h?.fill==="full",O=!x&&h?.fill==="dim",B=h?.stale===!0;return l`<span
          class=${`detail-summary__gate${x?" detail-summary__gate--on":""}${O?" detail-summary__gate--current":""}${B?" detail-summary__gate--stale":""}`}
          data-gate=${p.id}
        >
          <span class="detail-summary__gate-pill">${p.label}</span>
          ${_?l`<span class="detail-summary__gate-sha"
                >${_.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function Xc(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Yc(e){return Xc(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Zc(e,t){let r=e&&e[t];if(!Xc(r)||!Array.isArray(r.accounts))return null;let n=r.accounts.filter(Yc),s=Yc(r.active)?r.active:null;return{accounts:n,active:s||n.find(o=>o.active===!0)||null}}function Jc(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Em(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Jc(e)}${t}`}function eu(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Jc(e)}`}function Tm(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:eu({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Qc(e){let t=e.provider_key==="claude"?Em:eu,r=!!e.provider?.accounts.some(n=>n.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${n=>e.handlers.onExecChange(e.key,n.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Tm(e.provider_key,e.provider)}
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
  </div>`}function tu({md:e,catalog:t,handlers:r}){let n=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Qc({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Zc(t,"claude"),selected:n,handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Qc({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Zc(t,"codex"),selected:s,handlers:r})}
    </div>
  </section>`}var ru=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function as(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function go(e){if(!as(e)||!as(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>as(r)&&as(r.models));return t.length>0?t:null}function gr(e,t){let r=go(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function nu(e,t){return as(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function su(e,t){let r=go(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return nu(n,n.models[t]);return[]}function Cm(e){let t=go(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of nu(n,s))r.includes(o)||r.push(o);return r}function Rm(e,t){if(!t)return Cm(e);let n=go(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of su(e,o))s.includes(a)||s.push(a);return s}function ou(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=gr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?su(t,n.impl_model):Rm(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Im(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Om(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let r=t[1].trim();return{front:r.length>0?r:null,body:e.slice(t[0].length)}}function au(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function u(O){O.key==="Escape"&&s&&(O.preventDefault(),h())}document.addEventListener("keydown",u);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Im(s)}</span
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
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${c}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:l`${i===null?null:l`<pre class="mv__front">
${i}</pre
                        >`}${Mr(a)}`}
          </div>
        </div>
      </div>
    `:l``}function p(){Ke(d(),e)}async function _(O,B={}){s=O,o="loading",a="",i=null,c="",p();let V=r?r():"";if(!V){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let Z="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(O);try{let D=await n(Z),M=await D.json().catch(()=>({}));if(!D.ok||!M||M.ok!==!0){if(M?.error==="not_found"&&B.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||D.status)+")",p();return}let L=Om(String(M.content||""));i=L.front,a=L.body,o="ready",p()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function h(){s=null,Ke(l``,e)}function x(){document.removeEventListener("keydown",u),h()}return{open:_,close:h,destroy:x}}var Lm=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],lu="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ho=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Mm=["running","done","failed","interrupted"],Pm={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Dm(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Nm(e){let t=Wt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=An(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${lu}
          >부분 집계</span
        >`:""}`}function iu(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Wa(e){if(typeof e=="number")return bo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?bo(t):""}function qm(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Fm(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ba(e){return e===null||typeof e=="string"&&e.trim().length>0}function Ua(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function jm(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,r=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!ho.some(n=>n.role===t.role&&n.provider===t.provider)||!(r?Ba(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ba(t.effort))||!(!("agent_type"in t)||Ba(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Mm.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:r?!Ua(t.started_at)||!Ua(t.last_event_at)||!Ua(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Bm(e,t,r){let s=Wt({providers:{[t]:{subtotal:r.subtotal,breakdown:r.usage,...r.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[r.provider,r.model,r.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${r.session_id?l`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${r.session_id}
          >${r.session_id.slice(0,8)}</span
        >`:""}
    ${Wa(r.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${Wa(r.completed_at)}</span
        >`:""}
    ${s?l`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Um(e,t,r,n){let s=e.status==="running"?null:t,a=(s?Wt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?bo(e.last_event_at):s?Wa(s.completed_at):"",c=(e.provider==="claude"?["Claude",e.agent_type,qm(e.model)]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Fm(e,s);return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Pm[e.status]}</span
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
  </button>`}function Wm(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function zm(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let p=jm(d);!p||s.has(p.launch_id)||(s.add(p.launch_id),n.push(p))}n.sort((d,p)=>(d.started_at||0)-(p.started_at||0));let a={};for(let{role:d,provider:p}of ho){let _=t?t.roles[d]?.[p]:null;a[d]=_?[..._.legs]:[]}let i=ho.flatMap(({role:d})=>a[d]),c=new Set,u=[];for(let{role:d,provider:p}of ho){for(let _ of n.filter(h=>h.role===d&&h.provider===p)){let h=i.find(x=>x.receipt_id===_.launch_id)||null;h&&!Wm(_,h)||(h&&c.add(h.receipt_id),u.push(Um(_,h,e.attempt_id,r)))}for(let _ of a[d])c.has(_.receipt_id)||u.push(Bm(d,p,_))}return u}function Hm(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Lm,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${n.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Dm(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${lu}</span>`:""}
  </div>`}var Gm={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function bo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Vm(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function cu(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let p=typeof u.session_id=="string"&&u.session_id.length>0,_=o.has(u.attempt_id),h=p&&!_,x=p?_?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!h}
      title=${x}
      @click=${O=>{O.stopPropagation(),h&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let p=u.cause_detail,_=p&&typeof p.reason=="string"&&p.reason.length>0?typeof p.command=="string"&&p.command.length>0?`${p.reason} \xB7 ${p.command}`:p.reason:u.cause;return l`<div class="detail-session__cause" title=${_}>
      ${u.cause}
    </div>`},c=u=>{let d=iu(ia(u));if(Wt(d).length===0&&!An(u.usage))return"";let p=s.has(u.attempt_id);return l`<button
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
      세션 이력${Nm(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let d=ia(u),p=iu(d),_=Wt(p);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Gm[u.status||""]||"\xB7"}</span
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
            <span class="detail-session__time">${bo(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${Vm(u)}
          ${s.has(u.attempt_id)&&u.usage?Hm(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${zm(u,d,t)}
        </div>`})}
    </div>
  `}function uu(e,t={}){return l`
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
          ${Km(e)}
        </div>`:""}
  `}function Km(e){let t=En(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Tr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=oo(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Tr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Ym=["open","in_progress","deferred","resolved","closed"],Zm=[0,1,2,3,4];function du(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,d=null,p={},_="",h=!1,x=[],O=!1,B={},V={claude:null,codex:null},Z=null,D=0,M=!1,L=!1,U="",b="",j="";function te(){M=!1,L=!1,U="",b="",j=""}function re(){V={claude:null,codex:null},Z=null,D+=1}async function _e(A){try{let X=await fetch(A);if(!X.ok)return null;let q=await X.json();if(!q||typeof q!="object"||!Array.isArray(q.accounts))return null;let Oe=q.accounts.filter(dt=>dt!==null&&typeof dt=="object"&&!Array.isArray(dt));return{accounts:Oe,active:Oe.find(dt=>dt.active===!0)||null}}catch{return null}}async function pe(A){Z=A;let X=++D,[q,Oe]=await Promise.all([_e("/api/claude-usage"),_e("/api/codex-usage")]);X!==D||A!==u||(V={claude:q,codex:Oe},xe())}let be=[],Te=null,Le=null,ne=!1,oe="",Ae=!1,N=0,ie=new Set;function se(){be=[],Te=null,Le=null,ne=!1,oe="",Ae=!1,N+=1,ie.clear()}async function Se(A){if(!s)return;let X=++N;try{let q=await Promise.resolve(s("get-comments",{id:A}));if(X!==N||A!==u)return;be=Array.isArray(q)?q:[],ne=!1}catch{if(X!==N||A!==u)return;ne=!0}xe()}function Ce(){if(!s||!u)return;let A=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Te!==u){Te=u,Le=A,Se(u);return}A!==null&&A!==Le&&(Le=A,Se(u))}function C(A){ie.has(A)?ie.delete(A):ie.add(A),xe()}function G(A){let X=oe.trim().length===0;oe=A,X!==(A.trim().length===0)&&xe()}async function $e(){let A=oe.trim();if(!s||!u||A.length===0||Ae)return;let X=u;Ae=!0,xe();let q=!1;try{let Oe=await Promise.resolve(s("add-comment",{id:X,text:A}));Array.isArray(Oe)&&Oe.length>0&&(q=!0,X===u&&(be=Oe,ne=!1,oe="",Le=Oe.length))}catch{q=!1}q||me("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),X===u&&(Ae=!1),xe()}let Ne={onToggle:C,onDraftInput:G,onSubmit:$e},Pe=document.createElement("div");Pe.className="md-viewer-root",document.body.appendChild(Pe);let He=au(Pe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ze=document.createElement("div");Ze.className="session-log-root",document.body.appendChild(Ze);let ot=Tn(Ze,{transport:s?(A,X)=>Promise.resolve(s(A,X)):void 0,sessionLogStore:c}),at=!1,nt=!1,K=!1,Y=null,Ee=null,Ve=0;function ze(A){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${A}`}function fe(){at=!1,nt=!1,K=!1,Y=null,Ee=null,Ve+=1}async function R(A){if(!s)return;let X=++Ve;nt=!0,K=!1,xe();try{let q=await Promise.resolve(s("get-bead-prompt",{bead_id:A}));if(X!==Ve)return;!q||typeof q!="object"||Array.isArray(q)?K=!0:(Y=q,Ee=ze(A))}catch{X===Ve&&(K=!0)}finally{X===Ve&&(nt=!1,xe())}}function Q(){if(at=!at,at&&u&&Ee!==ze(u)){Y=null,R(u);return}xe()}function ae(){if(!a||!u)return[];let A=a.get();return(A&&A.attempts?Object.values(A.attempts):[]).filter(q=>q&&q.bead_id===u).sort((q,Oe)=>(Oe.started_at||0)-(q.started_at||0)).map(q=>({attempt_id:q.attempt_id,bead_id:q.bead_id,status:q.status,started_at:typeof q.started_at=="number"?q.started_at:null,runner:q.runner||null,model:q.model||null,effort:q.effort||q.observed_effort||null,speed:q.speed||null,session_id:q.session_id||null,resumed_from:q.resumed_from||null,continuation_mode:q.continuation_mode||null,dismissed_at:typeof q.dismissed_at=="number"?q.dismissed_at:null,cause:typeof q.cause=="string"?q.cause:null,cause_detail:q.cause_detail||null,exec_default_preset_id:typeof q.exec_default_preset_id=="string"?q.exec_default_preset_id:null,exec_default_preset_revision:typeof q.exec_default_preset_revision=="number"?q.exec_default_preset_revision:null,exec_values:q.exec_values&&typeof q.exec_values=="object"?q.exec_values:null,usage:q.usage||null,usage_legs:Array.isArray(q.usage_legs)?q.usage_legs:[],delegation_sessions:Array.isArray(q.delegation_sessions)?q.delegation_sessions:[]}))}function J(){if(!a||!u)return null;let A=a.get();return ir(A&&A.attempts||{},u)}let qe=new Set;function Qe(A){qe.has(A)?qe.delete(A):qe.add(A),xe()}function it(A){let X=a?a.get():null,q=X&&X.attempts?X.attempts[A]:null;ot.open({attempt_id:A,meta:q?{runner:q.runner||void 0,model:q.model||void 0,effort:q.effort||void 0,status:q.status||void 0,session_id:q.session_id||void 0}:{}})}function Xe(A,X){let q=a?a.get():null,Oe=q&&q.attempts?q.attempts[A]:null,st=(Oe&&Array.isArray(Oe.delegation_sessions)?Oe.delegation_sessions:[]).find(tt=>tt&&typeof tt=="object"&&tt.launch_id===X);st&&ot.open({attempt_id:A,launch_id:X,meta:{runner:st.provider==="claude"?"claude":"codex",role:st.role,...typeof st.agent_type=="string"?{agent_type:st.agent_type}:{},model:st.model,effort:st.effort,session_id:st.session_id,status:st.status}})}async function pt(A){if(!s||!A)return;let X=await xn();if(X===null)return;let q=()=>{let tt=a?a.get():null;return tt&&typeof tt.revision=="number"?tt.revision:0},Oe=async(tt={},rt=q())=>await s("worker-attempt-resume",{attempt_id:A,expected_revision:rt,...X!==""?{instructions:X}:{},...tt}),dt=tt=>{tt?.queue&&a?.set&&a.set(tt.queue)},st=await Oe();if(dt(st),st&&st.conflict){let tt=st.queue&&typeof st.queue.revision=="number"?st.queue.revision:q();st=await Oe({},tt),dt(st)}st=await kr(st,(tt,rt)=>Oe({continuation:tt,decision_token:rt}),{onResult:dt,refresh:()=>Oe()}),st&&st.resumed===!1&&!st.conflict&&st.reason&&me(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${st.reason}`,"error",2400)}let yt={onOpen:it,onOpenDelegation:Xe,onResume:pt,onToggleUsage:Qe};function gt(){let A=a?a.get():null,X={...B};for(let q of["orchestration_model","orchestration_effort","orchestration_speed"]){let Oe=A&&A[q];typeof Oe=="string"&&(X[q]=Oe)}return X}async function ft(){if(s){try{let A=await Promise.resolve(s("get-session-defaults",{}));B=A&&A.values&&typeof A.values=="object"?A.values:{}}catch{B={}}xe()}}function kt(){let A=a?a.get():null;return A&&A.runner_catalog||null}function We(){let A=a?a.get():null;return A&&typeof A.execution_defaults=="object"?A.execution_defaults:null}function Ye(){let A=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},q=Qt({pin:{...A,...p},global:gt(),execution_defaults:We(),runner_catalog:kt(),route:typeof A.route=="string"?A.route:null}).orchestration_model.value||"";return gr(kt(),q)}function Ue(){let A=i?i.get():null;return!A||typeof A.revision!="number"?null:{revision:A.revision,presets:Array.isArray(A.presets)?A.presets:[]}}function ut(A){return A?.compatible===!1}function At(A){i&&A&&typeof A.revision=="number"&&Array.isArray(A.presets)&&i.set({revision:A.revision,presets:A.presets})}async function S(){let A=Ue(),X=A?.presets.find(q=>q.id===_);if(!(!s||!u||!A||!X||ut(X)||h)){h=!0,x=[],xe();try{let q=await Promise.resolve(s("apply-impl-preset",Gc(u,X.id,A.revision)));if(q&&q.conflict){At(q),me("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Oe=q&&Array.isArray(q.issue)?q.issue[0]:q?.issue;if(q&&q.applied&&Oe&&typeof Oe=="object"){d=Oe,x=Array.isArray(q.skipped_orchestration_keys)?q.skipped_orchestration_keys.filter(dt=>typeof dt=="string"):[];for(let dt of ru)delete p[dt];me(x.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}q&&q.error==="bd_readback_failed"?me("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):me("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(q){q&&typeof q=="object"&&q.code==="bd_readback_failed"?me("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):me("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{h=!1,xe()}}}let P=null;r&&r.subscribe&&(P=r.subscribe(()=>F()));let de=null;a&&typeof a.subscribe=="function"&&(de=a.subscribe(()=>{u&&xe()}));let k=null;i&&typeof i.subscribe=="function"&&(k=i.subscribe(()=>{u&&xe()}));function E(A){A.key==="Escape"&&u&&(A.preventDefault(),n())}document.addEventListener("keydown",E);function F(){if(u){if(r&&typeof r.snapshotFor=="function"){let A=r.snapshotFor("detail:"+u)||[];d=A.find(q=>q&&q.id===u)||A[0]||d}Ce(),xe()}}function ee(A){tr(A).then(X=>{X?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ke(A){A.preventDefault(),A.stopPropagation(),u&&ee(u)}function ve(A,X){A.preventDefault(),A.stopPropagation(),ee(X)}function Me(A,X,q){A.preventDefault(),A.stopPropagation(),He.open(X,{missing_state:q})}function De(A,X){p[A]=X,xe(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Hc(u,A,X.length===0?null:X))).catch(()=>{me("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Rt(A,X){let q=d||{},Oe=q.metadata&&typeof q.metadata=="object"?q.metadata:{},dt={};for(let rt of["impl_runtime","impl_model","impl_effort"])dt[rt]=Object.hasOwn(p,rt)?p[rt]:typeof Oe[rt]=="string"?Oe[rt]:"";dt[A]=X;let st=ou(dt,kt(),Ye()),tt={};for(let rt of["impl_runtime","impl_model","impl_effort"])tt[rt]=p[rt],p[rt]=st[rt]||"";xe(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...st,orchestration_runtime:Ye()})).then(rt=>{let Ot=Array.isArray(rt)?rt[0]:rt;if(!Ot||typeof Ot!="object"||!Ot.id)throw new Error("implementation target readback failed");d=Ot;for(let Jt of["impl_runtime","impl_model","impl_effort"])delete p[Jt];xe()}).catch(()=>{for(let rt of["impl_runtime","impl_model","impl_effort"])tt[rt]===void 0?delete p[rt]:p[rt]=tt[rt];xe(),me("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function lt(A,X,q){if(!s||!u)return!1;try{let Oe=await Promise.resolve(s(A,X)),dt=Array.isArray(Oe)?Oe[0]:Oe;return dt&&typeof dt=="object"&&dt.id?(d=dt,!0):(me(q,"error"),!1)}catch{return me(q,"error"),!1}}function Je(A){setTimeout(()=>{try{let X=e.querySelector(A);X&&typeof X.focus=="function"&&X.focus()}catch{}},0)}function Dt(){M=!0,U=d&&d.title||"",xe(),Je('.detail-edit__input[data-edit="title"]')}function Ut(A){U=A.target.value}function Fe(){M=!1,U="",xe()}function Ft(){lt("edit-text",{id:u,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(X=>{X&&(M=!1,U=""),xe()})}function It(){L=!0,b=d&&d.description||"",xe(),Je('.detail-edit__textarea[data-edit="description"]')}function zt(A){b=A.target.value}function v(){L=!1,b="",xe()}function w(){lt("edit-text",{id:u,field:"description",value:b},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(X=>{X&&(L=!1,b=""),xe()})}function I(A,X,q,Oe){if(A.key==="Escape"){A.stopPropagation(),q();return}A.key==="Enter"&&(!Oe||A.ctrlKey||A.metaKey)&&(A.preventDefault(),X())}function W(A){let X=A.target.value;lt("update-status",{id:u,status:X},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>xe())}function ye(A){let X=Number(A.target.value);lt("update-priority",{id:u,priority:X},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>xe())}function we(A){j=A.target.value}function he(){let A=j.trim();A.length!==0&&lt("label-add",{id:u,label:A},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(X=>{X&&(j=""),xe()})}function et(A){if(A.key==="Escape"){A.stopPropagation(),j="",xe();return}A.key==="Enter"&&(A.preventDefault(),he())}function Ie(A){lt("label-remove",{id:u,label:A},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>xe())}let T={onCopyPath:ve,onOpenDoc:Me};function le(A){return typeof A=="string"?A:A&&typeof A=="object"?String(A.id||A.to||A.issue_id||A.depends_on||""):""}function Re(A){switch(A&&typeof A=="object"?String(A.dependency_type||A.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function _t(A){let q=(Array.isArray(A.dependencies)?A.dependencies:[]).map(Oe=>({id:le(Oe),icon:Re(Oe)})).filter(Oe=>Oe.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${q.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${q.map(Oe=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Oe.id)}
                  >
                    ${Oe.icon?`${Oe.icon} `:""}${Oe.id}
                  </button>`:l`<span class="detail-dep"
                    >${Oe.icon?`${Oe.icon} `:""}${Oe.id}</span
                  >`)}
          </div>`}
    `}function Mt(A){let X=A.metadata||{},q=A.workflow||{},Oe=q.stages||{},dt=Oe.spec&&Oe.spec.stale,st=Oe.impl&&Oe.impl.stale,tt=Oe.plan||null,rt=q.route_source==="derived",Ot=q.route||X.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${rt?" detail-kv__v--derived":""}"
          title=${rt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${rt?"unset":Ot}</span
        >
      </div>
      ${q.route!=="quick_fix"||Object.hasOwn(X,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${X.spec_review||"\uC5C6\uC74C"}${dt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${q.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${tt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${tt?.approval_receipt||"\uC5C6\uC74C"}${tt?.approval_state==="stale"?" \xB7 stale":tt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${q.route!=="quick_fix"||Object.hasOwn(X,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${X.impl_review||"\uC5C6\uC74C"}${st?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${q.planned_execution?l`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${q.planned_execution.kind}</span>
            </div>
            ${q.planned_execution.kind==="main"?l`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${q.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${q.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Xr(q.exec_receipt)}</span
            >
          </div>`:""}
      ${q.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${q.impl_entry.actor}@${q.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${X.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${X.pr_url}</span>
          </div>`:""}
    `}let vt={route:["quick_fix","spec_backed","full_plan"]};async function Pt(A,X){let q=X.target.value;if(A==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&q!=="full_plan"&&!window.confirm(`full_plan \u2192 ${q||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){xe();return}await lt("update-workflow-meta",{id:u,key:A,value:q},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),xe()}function f(A){let X=A.metadata||{};return l` ${((Oe,dt)=>{let st=vt[Oe],tt=typeof X[Oe]=="string"?X[Oe]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${Oe}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Oe}
          data-edit=${`wfmeta-${Oe}`}
          @change=${rt=>Pt(Oe,rt)}
        >
          <option value="" ?selected=${!st.includes(tt)}>
            ${dt}
          </option>
          ${st.map(rt=>l`<option value=${rt} ?selected=${tt===rt}>${rt}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function $(A,X){return M?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${Ut}
            @keydown=${q=>I(q,Ft,Fe,!1)}
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
        <h2 class="detail-overlay__title">${A}</h2>
        ${Wt(X).map(q=>l`<span class="detail-usage-total" title=${q.tooltip}
              >${q.label}</span
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
    `}function H(A){let X=Ht(A.created_at),q=Ht(A.updated_at);return!X&&!q?l``:l`
      ${X?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${X}</span>
          </div>`:""}
      ${q?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${q}</span>
          </div>`:""}
    `}function m(A,X){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${W}
        >
          ${Ym.map(q=>l`<option value=${q} ?selected=${q===A}>${q}</option>`)}
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
          ${Zm.map(q=>l`<option value=${String(q)} ?selected=${q===X}>
                P${q}
              </option>`)}
        </select>
      </div>
    `}function y(A){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${L?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${It}
            >
              ✎
            </button>`}
      </div>
      ${L?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${b}
              @input=${zt}
              @keydown=${X=>I(X,w,v,!0)}
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
            ${A||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ue(A){let X=typeof A.notes=="string"?A.notes:"";return X.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${X}</div>
    `}function ce(A){let X=Array.isArray(A.labels)?A.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${X.map(q=>l`<span class="detail-label-chip"
              >${q}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${q}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+q}
                @click=${()=>Ie(q)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${j}
            @input=${we}
            @keydown=${et}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${he}
          >
            추가
          </button>
        </span>
      </div>
    `}function je(){if(!u)return l``;let A=d||{},X=String(A.id||u),q=A.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Oe=J(),dt=A.status||"open",st=typeof A.priority=="number"?Math.max(0,Math.min(4,A.priority)):"",tt=A.description||"",rt={...A,metadata:{...A.metadata||{},...p}};return l`
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
              ${X}
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
          ${$(q,Oe)}
          ${Kc(rt)}
          ${Vc({metadata:rt.metadata,workspace_values:gt(),catalog:kt(),execution_defaults:We(),expanded:O,presets:Ue()?.presets||[],preset_id:_,preset_busy:h,skipped_orchestration_keys:x},{onToggle:Ot=>{O=Ot,xe()},onEdit:(Ot,Jt)=>{if(Ot==="impl_runtime"||Ot==="impl_model"||Ot==="impl_effort"){Rt(Ot,Jt??"");return}De(Ot,Jt??"")},onPresetSelect:Ot=>{_=Ot,x=[],xe()},onPresetApply:()=>{S()}})}
          ${tu({md:rt.metadata,catalog:V,handlers:{onExecChange:De}})}
          ${m(dt,st)} ${H(A)}
          ${y(tt)}
          ${Mc(be,Ne,{expanded:ie,draft:oe,sending:Ae,error:ne})}
          ${ue(A)} ${ce(A)} ${_t(A)}
          ${Mt(A)} ${f(A)}
          ${Ic(A,T)}
          ${uu({expanded:at,loading:nt,error:K,data:Y},{onToggle:Q})}
          ${cu(ae(),yt,{total:Oe,expanded:qe})}
        </div>
      </div>
    `}function xe(){Ke(je(),e)}return{load(A){A!==u&&(p={},_="",x=[],O=!1,te(),se(),fe(),re()),u=A,d=null,F(),ft(),Z!==A&&pe(A)},clear(){u=null,d=null,p={},_="",h=!1,x=[],O=!1,te(),se(),fe(),re(),He.close(),ot.close(),Ke(l``,e)},destroy(){P&&(P(),P=null),de&&(de(),de=null),k&&(k(),k=null),document.removeEventListener("keydown",E),He.destroy(),Pe.parentNode&&Pe.parentNode.removeChild(Pe),ot.destroy(),Ze.parentNode&&Ze.parentNode.removeChild(Ze),u=null,d=null,re(),_="",h=!1,x=[],se(),fe(),Ke(l``,e)}}}function pu(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,d,p="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=d||"An unrecoverable error occurred.");let _=typeof p=="string"?p.trim():"";if(s&&(_.length>0?(s.textContent=_,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function yo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ls(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function vo(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function wo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Qm(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:yo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function fu(e,t){let r=Qm(e,t);return r?l`<button
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
            >${wo(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${ls(r.deploy.elapsed_ms)}`:""}</span
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
  </div>`}function Xm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function cs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ko(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function vr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,_)=>(p.requested_at||0)-(_.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?Xm(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:d}}function is(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return l`<div
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
  </div>`}var Jm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function _u(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Jm[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function $o(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let r=t.pin===!0?" exec-chip--pin":"",n=t.pin===!0?`
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
      >`:""}`}function xo(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],n=Array.isArray(e.warnings)?e.warnings:[];return t.length===0&&r.length===0&&n.length===0?"":l`<div class="worker-deps">
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
  </div>`}function eg(e){let t=Array.isArray(e.badges)?e.badges:[],r=Wt(e.usage),n=xr(e.usage),s=ar(e.done_at);return l`<div
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
  </div>`}function nn(e){if(e.lane==="done"&&e.done_layout==="three_line")return eg(e);let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=Wt(e.usage),s=xr(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?ar(e.done_at):"",u=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",p=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",_=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",h=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,x=l`<span class="worker-mini__title">${e.title}</span>`,O=e.pr_url&&e.pr_number?l`<a
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
        >`),Z=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",D=n.length>0?n.map(Ae=>l`<span class="worker-usage" title=${Ae.tooltip}
              >${Ae.label}</span
            >`):s?l`<span class="worker-usage" title=${zn(e.usage)}
            >${s}</span
          >`:"",M=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",L=e.merge_action?l`<button
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
      </button>`:"",j=e.discard,te=j?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${j?.attempt_id||""}
          data-operation-id=${j?.operation?.operation_id||""}
          data-discard-mode=${j?.confirmation||"unmerged"}
          ?disabled=${j?!j.enabled:e.discard_enabled===!1}
          title=${j?j.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${j?.label||"\uD3D0\uAE30"}
        </button>`:"",re=e.stale_work||null,_e=re?l`${re.can_resume||re.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${re.action_id}
            ?disabled=${re.locked}
          >
            기존 작업 이어가기
          </button>`:""}${re.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${re.action_id}
            ?disabled=${re.locked}
          >
            백업 후 새로 시작
          </button>`:""}${re.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${re.action_id}
            ?disabled=${re.locked}
          >
            다시 확인
          </button>`:""}`:"",pe=re?l`<div class="worker-mini__stale">
        <strong>${re.title}</strong>
        <span>${re.summary}</span>
        <span>${re.cause}</span>
        ${re.can_backup_fresh?l`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",be=e.revise_action?l`<button
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
        </button>`:"",Te=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${$o(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",Le=xo(e.dependency_chips),ne=is(e),oe=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||j?.operation||e.revise_action||re);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">${_}${h}${x}</div>
          <div class="worker-mini__row2">
            ${D}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${ls(e.work_ms)}</span
                >`:""}${V}${M}
            <span class="worker-mini__actions"
              >${L}${U}${b}${te}</span
            >
            ${In(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${u}${d}${_}${h}${O}${B}${V}${p}${Z}
            </div>
            <div class="worker-mini__body">${x}${pe}</div>
            ${Le}${Te}${oe?l`<div class="worker-mini__foot">
                  ${D}${M}
                  <span class="worker-mini__actions"
                    >${L}${U}${b}${te}${be}${_e}</span
                  >
                  ${is(e)}
                </div>`:""}
            ${In(e)}`:l`<div class="worker-mini__line">
              ${u}${d}${_}${h}${x}${O}${B}${V}${p}${Z}${D}${M}${L}${U}${b}${te}
            </div>
            ${Le}${Te}${ne} ${In(e)}`}
  </div>`}function za(e,t=null,r={}){let n=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!n,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=a&&a.chips||{},c=i.route||a&&a.route,u=i.route_source==="derived"||!!(a&&a.route_source==="derived"),d=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),p=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),_=xo(e.dependency_chips);return l`<div
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
          ${$o(e.exec_chips,{pin:r.exec_chips_mode==="pinned_only"})}
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?za(n,e.place_menu):nn(n))}
          </div>`}
  </section>`}var mu={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},gu={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function hu(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ha(e){for(let t of hu(e))if(Object.hasOwn(mu,t))return mu[t];return null}function Ga(e){let t=null;for(let r of hu(e))Object.hasOwn(gu,r)&&(t=gu[r]);return t}function Ao(e){let t=Ha(e),r=Ga(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function bu(e,t){let r=Ha(e)??Ha(t),n=Ga(t)??Ga(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var yu=160;function tg(e){return e.length>yu?`${e.slice(0,yu)}\u2026`:e}function rg(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${tg(e.command)}</code>`:""}
  </div>`}function ng(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function sg(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function vu(e){let t=e.failure?Ao(e.failure.reason):"";return l`<div class="worker-banners">
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
          ${rg(e.failure.cause_detail)}
          ${ng(e.failure.reason)}
          ${is({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function og(e){return e?l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}function ag(e,t,r){if(!e)return"";let n=e.workflow||null,s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=Array.isArray(e.legs)?e.legs:[],c=i.filter(p=>p&&p.state==="live"),u=i.filter(p=>p&&p.state!=="live"),d=xo(e.dependency_chips);return l`${n?vn(n,"in_progress"):""}
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
      </div>`:""}${d}`}function Va(e,t,r=null,n={}){let s=e.failed===!0,o=!!e.paused,a=s?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):o?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?sg(t-e.started_at):"\u2014",i=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,c=Bn(e),u=Wt(e.usage),d=xr(e.usage),p=e.conflict_resolution?o?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,h=e.landing,x=e.attempt_id&&e.attempt_id===r,O=n.monitor||null,B=og(O),V=ag(O,t,o),Z=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${x?" rtile--sel":""}${o?" rtile--paused":""}${s?" rtile--failed":""}"
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
            ${Z}
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
            ${Z}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${V}${e.rollup?Us(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:na}):""}
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
          ${$o(e.exec_chips)}
          ${u.length>0?u.map(D=>l`<span class="worker-usage" title=${D.tooltip}
                    >${D.label}</span
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
  </div>`}function Ka(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Va(s,t,r))}
  </div>`}var Ya=new Set(["unavailable","not_applicable"]);function Dr(e,t){if(typeof e!="object"||e===null)return null;let r=e[t];return typeof r=="object"&&r!==null?r:null}function wu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Nr(e,t){return t===null?null:`${Pr[e]}: ${t.display} (${mo[t.source]})`}function Za(e){return e.filter(t=>t!==null).join(`
`)}function So(e){if(typeof e!="object"||e===null)return null;let t=Jr(e);if(t==="")return null;let r=(n,s)=>typeof s=="string"&&s.length>0?`${n}: ${s}`:null;return{text:t,title:Za(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",r("runner",e.runner),r(Pr.orchestration_model,e.model),r(Pr.orchestration_effort,e.effort),r(Pr.orchestration_speed,e.speed)])}}function sn(e,t){let r=Dr(e,"orchestration_model");if(r===null||r.resolution==="unavailable")return null;let n=Dr(e,"orchestration_effort"),s=Dr(e,"orchestration_speed"),o=wu([gr(t,r.value??""),r.display,n!==null&&n.value!==null?n.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Za(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Nr("orchestration_model",r),Nr("orchestration_effort",n),Nr("orchestration_speed",s)])}}function ig(e,t){return e===null||e.value===null||Ya.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function lg(e){return e===null||Ya.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function cg(e){return e===null?null:e.value==="auto"?"auto":Ya.has(e.resolution)?null:e.display}function qr(e,t){if(typeof e!="object"||e===null)return null;let r=Dr(e,"impl_dispatch"),n=Dr(e,"impl_runtime"),s=Dr(e,"impl_model"),o=Dr(e,"impl_effort"),a=Dr(e,"impl_speed"),i=r!==null&&r.value==="main"?"\uBA54\uC778":wu([ig(n,t??null),lg(s),cg(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Za(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Nr("impl_dispatch",r),Nr("impl_runtime",n),Nr("impl_model",s),Nr("impl_effort",o),Nr("impl_speed",a)])}}var Xt="",ug=["impl_runtime","impl_model","impl_effort"],dg=5,Eo=1;function Rr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function To(e,t){let r=t.transport,n=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(R=>me(R,"error",4e3)),o={},a={},i=[],c=!1,u=null,d={},p="",_="",h=!1,x=!1,O=!1,B=null,V=!1;function Z(){let R=t.queue?t.queue():null;return Rr(R)?R:null}function D(){let R=Z();return R?R.runner_catalog:null}function M(){let R=Z();return R&&Rr(R.execution_defaults)?R.execution_defaults:null}function L(){let R=t.implPresetStore?.get();return Rr(R)&&Array.isArray(R.presets)?R:null}function U(){return n===null?{}:{root_dir:n}}async function b(R,Q){return V||!r?null:await r(R,Q)}function j(R){R&&Rr(R.queue)&&t.onQueueAdopt?.(R.queue)}async function te(R,Q){let ae=Z();if(!ae||V)return null;let J=await b(R,{...Q,...U(),expected_revision:ae.revision});if(j(J),n!==null&&J&&J.conflict){let qe=J.queue&&typeof J.queue.revision=="number"?J.queue.revision:Z()?.revision??ae.revision;J=await b(R,{...Q,...U(),expected_revision:qe}),j(J)}return J}async function re(){c=!0,fe();try{let R=await b("get-session-defaults",{...U()});o=Rr(R?.values)?{...R.values}:{},a={...o},i=Array.isArray(R?.warnings)?R.warnings:[]}catch(R){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${R instanceof Error?R.message:String(R)}`)}finally{c=!1,fe()}}async function _e(){let R=Uc(o,a);if(Object.keys(R).length!==0){try{let Q=await b("set-session-defaults",{values:R,...U()});o=Rr(Q?.values)?{...Q.values}:{},a={...o},i=Array.isArray(Q?.warnings)?Q.warnings:[]}catch(Q){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}fe()}}function pe(R,Q){if(ug.includes(R)){Le(R,Q);return}Q===Xt?delete a[R]:a[R]=Q,fe(),_e()}function be(){let R=Ve().orchestration_model,Q=Qt({global:{orchestration_model:R??void 0},execution_defaults:M(),runner_catalog:D()}).orchestration_model.value;return Q?gr(D(),Q):null}function Te(R,Q){typeof Q=="string"&&Q.length>0?a[R]=Q:delete a[R]}function Le(R,Q){let ae=Q===Xt?void 0:Q,J=jc({impl_runtime:R==="impl_runtime"?ae:a.impl_runtime,impl_model:R==="impl_model"?ae:a.impl_model,impl_effort:R==="impl_effort"?ae:a.impl_effort},D(),be());Te("impl_runtime",J.impl_runtime),Te("impl_model",J.impl_model),Te("impl_effort",J.impl_effort),fe(),_e()}async function ne(){let R=Z();if(!R)return;let Q={orchestration_model:R.orchestration_model??null,orchestration_effort:R.orchestration_effort??null,orchestration_speed:R.orchestration_speed??null},ae=Wc(Q,{...Q,...d});if(Object.keys(ae).length!==0){try{let J=await te("worker-queue-set-orchestration-defaults",{values:ae});if(J&&J.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}d={}}catch(J){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}fe()}}function oe(R,Q){d[R]=Q===Xt?null:Q,fe(),ne()}function Ae(R){if(u=R,!R){fe();return}let Q=D(),ae=Ve(),J=ae.orchestration_model;J&&!os(Q,R).includes(J)&&(d.orchestration_model=null,J=null);let qe=ae.orchestration_effort;qe&&!Na(Q,R,J||nr).includes(qe)&&(d.orchestration_effort=null),fe(),ne()}async function N(R){if(!(!Z()||R<Eo)){try{await te("worker-queue-set-slots",{slots:R})}catch(Q){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}fe()}}async function ie(R){if(!(!Z()||R<Eo||R>dg)){try{await te("worker-queue-set-serial-lane-count",{count:R})}catch(Q){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}fe()}}async function se(R,Q){let ae=R==="auto_advance"?"worker-automation-toggle":R==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await te(ae,{on:Q})}catch(J){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}fe()}function Se(){let R={},Q=Ve();for(let ae of uo){let J=Cr.includes(ae)?Q[ae]:a[ae];typeof J=="string"&&J.length>0&&(R[ae]=J)}return R}async function Ce(){let R=L();if(!R)return;let Q=Se();if(Object.keys(Q).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ae=(R.presets||[]).find(qe=>qe.id===p),J=_.trim()||(ae?ae.name:"");if(!J){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let qe=ae?await b("impl-preset-update",{expected_revision:R.revision,id:ae.id,name:J,settings:Q}):await b("impl-preset-create",{expected_revision:R.revision,name:J,settings:Q});if(qe&&qe.applied){if(_="",!ae&&Array.isArray(qe.presets)){let Qe=qe.presets.find(it=>it.name===J);p=Qe?Qe.id:p}fe()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),fe()}catch(qe){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${qe instanceof Error?qe.message:String(qe)}`)}}async function C(){let R=L();if(!(!R||p.length===0))try{let Q=await b("impl-preset-delete",{expected_revision:R.revision,id:p});Q&&Q.applied?(p="",fe()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),fe())}catch(Q){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}}function G(R){o=Rr(R.values)?{...R.values}:{},a={...o},i=Array.isArray(R.warnings)?R.warnings:[],Rr(R.queue)&&(t.onQueueAdopt?.(R.queue),d={})}async function $e(){let R=L(),Q=Z();if(!R||!Q||p.length===0)return;let ae=J=>({preset_id:p,expected_revision:R.revision,expected_queue_revision:J,...U()});try{let J=await b("apply-impl-preset-global",ae(Q.revision));if(J&&J.applied&&G(J),n!==null&&J&&J.queue_applied===!1){let qe=J.queue&&typeof J.queue.revision=="number"?J.queue.revision:Z()?.revision??Q.revision;J=await b("apply-impl-preset-global",ae(qe)),J&&J.applied&&G(J)}J&&J.applied?J.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):J&&J.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(J){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}fe()}async function Ne(){x=!0,O=!1,fe();try{let R=await b("get-worker-system-prompt",{});!R||typeof R!="object"||Array.isArray(R)?O=!0:B=R}catch{O=!0}finally{x=!1,fe()}}function Pe(){if(h=!h,h&&!B){Ne();return}fe()}function He(){let R=En({loading:x,error:O});if(R)return R;if(!B)return"";let Q=Array.isArray(B.variants)?B.variants:[];return l`<div class="settings-dialog__sp-body">
      ${B.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${B.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Q.map(ae=>l`<div class="settings-dialog__sp-variant" data-variant=${ae.key}>
            <div class="settings-dialog__sp-cond">${ae.condition}</div>
            ${Tr(ae.label,ae.system_prompt)}
          </div>`)}
    </div>`}function Ze(){return l`<section
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
        @click=${Pe}
      >
        ${h?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${h?He():""}
    </section>`}function ot(R,Q,ae,J,qe,Qe,it){let Xe=qe[R]??Xt,pt=qa(R,ae,qe,M(),D(),it),yt=pt.options.find(ft=>ft.value===Xe),gt=Xe===Xt?pt.full_value:yt?.full_value;return l`<select
        class=${Xe===Xt?"settings-dialog__unset":""}
        data-key=${R}
        aria-label=${Q}
        title=${gt||""}
        ?disabled=${Qe===!0||pt.disabled}
        .value=${rn(String(Xe))}
        @change=${ft=>J(R,String(ft.target.value))}
      >
        <option value=${Xt} ?selected=${Xe===Xt}>
          ${pt.unset_label}
        </option>
        ${pt.options.map(ft=>l`<option
              value=${ft.value}
              title=${ft.full_value||""}
              ?selected=${ft.value===Xe}
            >
              ${ft.label}
            </option>`)}
      </select>
      ${Xe===Xt?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function at(R,Q,ae,J,qe,Qe=!1,it){return l`<div
      class=${`settings-dialog__row${Qe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        ${ot(R,Q,ae,J,qe,Qe,it)}
      </span>
    </div>`}function nt(R,Q,ae,J,qe){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Q}-on)`}
        ></i>
        ${R}
      </span>
      <span class="settings-dialog__controls">
        ${ot(ae,`${R} \uBAA8\uB378`,J,pe,a,!1)}
        ${ot(qe,`${R} effort`,_o,pe,a,!1)}
      </span>
    </div>`}function K(R,Q,ae,J){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${J?" is-on":""}`}
          data-automation=${R}
          aria-pressed=${J?"true":"false"}
          aria-label=${Q}
          @click=${()=>se(R,!J)}
        >
          ${J?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ae}</span>
      </span>
    </div>`}function Y(R,Q,ae,J){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${R}>
          <button
            type="button"
            aria-label=${`${Q} \uAC10\uC18C`}
            @click=${()=>J(ae-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ae}</span>
          <button
            type="button"
            aria-label=${`${Q} \uC99D\uAC00`}
            @click=${()=>J(ae+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ee(R){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${R.rows.length>0?`\uBCC0\uACBD ${R.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${R.rows.map(Q=>l`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${Q.kind}
          >
            <span class="settings-dialog__preset-diff-label">${Q.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${Q.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${Q.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${R.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${R.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Ve(){let R=Z(),Q={};for(let ae of Cr)Q[ae]=Object.prototype.hasOwnProperty.call(d,ae)?d[ae]:R&&typeof R[ae]=="string"?R[ae]:null;return Q}function ze(){let R=D(),Q=a.impl_runtime,ae=a.impl_model,J=L(),qe=Z(),Qe=Ve(),it=os(R,u),Xe=Cn(R,void 0).filter(Ue=>Ue!==nr),pt=Na(R,u,Qe.orchestration_model||nr).filter(Ue=>Ue!==nr),yt=p?(J?.presets||[]).find(Ue=>Ue.id===p):null,gt=yt?Bc(Se(),Rr(yt.settings)?yt.settings:{}):null,ft=qe&&typeof qe.slots=="number"?qe.slots:Eo+1,kt=qe&&typeof qe.serial_lane_count=="number"?qe.serial_lane_count:Eo,We=M()?.supported===!0,Ye=qa("workflow_mode",ns,a,M(),R);return l`
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
                @change=${Ue=>{p=String(Ue.target.value),fe()}}
              >
                <option value="" ?selected=${p===""}>
                  실행 프리셋…
                </option>
                ${(J?.presets||[]).map(Ue=>l`<option
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
                @click=${Ce}
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
            ${gt?Ee(gt):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${rn(u||Xt)}
                    @change=${Ue=>{let ut=String(Ue.target.value);Ae(ut===Xt?null:ut)}}
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
              ${at("orchestration_model","\uBAA8\uB378",it,oe,Qe)}
              ${at("orchestration_effort","effort",pt,oe,Qe)}
              ${at("orchestration_speed","\uC18D\uB3C4",rs,oe,Qe)}
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
                      @click=${()=>pe("workflow_mode",Xt)}
                    >
                      ${Ye.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${ns.map(Ue=>l`<button
                          type="button"
                          data-mode=${Ue}
                          aria-pressed=${String(a.workflow_mode===Ue)}
                          @click=${()=>pe("workflow_mode",Ue)}
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
              ${nt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ss,"spec_review_effort")}
              ${nt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",fo,"plan_review_effort")}
              ${nt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ss,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${at("impl_runtime","\uC704\uC784 \uB300\uC0C1",po,pe,a)}
              ${at("impl_model","\uBAA8\uB378",Cn(R,Q),pe,a)}
              ${at("impl_effort","effort",Rn(R,Q,ae),pe,a)}
              ${at("impl_speed","\uC18D\uB3C4",rs,pe,a)}
              ${at("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Xe,pe,a,!1,{...a,...Qe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${K("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",qe?.auto_advance===!0)}
              ${K("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",qe?.auto_merge===!0)}
              ${K("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",qe?.auto_repair===!0)}
              ${Y("slots","\uB3D9\uC2DC \uC2E4\uD589",ft,Ue=>N(Ue))}
              ${Y("serial-lane-count","\uC9C1\uB82C \uB808\uC778",kt,Ue=>ie(Ue))}
            </div>
            ${Ze()}
          `}
    `}function fe(){V||Ke(ze(),e)}return{load(){return d={},re()},render:fe,sessionDraft:()=>({...a}),destroy(){V=!0,Ke(l``,e)}}}function us(e){return l`<svg
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
  </svg>`}function ku(){return us(mn`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function $u(){return us(mn`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function xu(){return us(mn`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Au(){return us(mn`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Su(){return us(mn`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Eu(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Tu(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Wt(Vs(t));let r={};for(let i of $r)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let d of $r){let p=c[d];typeof p=="number"&&Number.isFinite(p)&&(r[d]+=p,n=!0,u=!0)}if(u){o+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?xr(r):null}function hr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Co(e,t){let r=hr(e?.counts)?e.counts:null,n=r?r[t]:null;return typeof n=="number"&&Number.isFinite(n)?n:0}function pg(e,t){if(!hr(t))return e;let r={...e};for(let[n,s]of Object.entries(t))s!==void 0&&(r[n]=s);return r}function fg(e){if(!hr(e)||!hr(e.execution_defaults)||!hr(e.runner_catalog)||!hr(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let r=Qt({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),n=gr(e.runner_catalog,r.orchestration_model.value??""),s=sn(r,e.runner_catalog),o=qr(r,n);return s===null&&o===null?null:{orchestration:s,worker:o}}function Cu(e,t){let r=t.notify||(N=>me(N,"error",4e3)),n=document.createElement("div");n.className="mon2-deck__main",e.appendChild(n);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let u=null,d=null,p=null,_=new Map;function h(){let N=t.workspacesState?t.workspacesState():[];return Array.isArray(N)?N.filter(ie=>hr(ie)):[]}function x(N){return h().find(ie=>ie.root_dir===N)||null}function O(N){return pg(x(N),_.get(N))}function B(){for(let N of h()){let ie=_.get(N.root_dir);ie&&typeof ie.revision=="number"&&typeof N.revision=="number"&&N.revision>=ie.revision&&_.delete(N.root_dir)}}async function V(N,ie,se){let Se=t.transport,Ce=O(ie);if(!(!Se||!hr(Ce))){try{let C=await Se(N,{...se,root_dir:ie,expected_revision:Ce.revision});if(hr(C?.queue)&&_.set(ie,C.queue),C&&C.conflict){let G=hr(C.queue)&&typeof C.queue.revision=="number"?C.queue.revision:O(ie)?.revision;C=await Se(N,{...se,root_dir:ie,expected_revision:G}),hr(C?.queue)&&_.set(ie,C.queue)}}catch(C){r(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}ne()}}function Z(N){u!==N&&(u=N,t.onFocusChange?.(u),ne())}function D(N){Z(u===N?null:N)}function M(N){if(d===N){U();return}L(),d=N;let ie=x(N);a.textContent=`${ie?.name||N} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,p=To(c,{root_dir:N,queue:()=>O(N),transport:t.transport,implPresetStore:t.implPresetStore,notify:r,onQueueAdopt:se=>{_.set(N,se),ne()}}),p.load(),ne()}function L(){p?.destroy(),p=null}function U(N){L(),d=null,s.hidden=!0,a.textContent="",N!==!0&&ne()}let b=()=>U();i.addEventListener("click",b);function j(N){N.key==="Escape"&&u!==null&&Z(null)}document.addEventListener("keydown",j);function te(N,ie){let se=Math.max(ie,N,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ie}\uAC1C \uC911 ${N}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:se},(Se,Ce)=>Ce<N?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function re(N){let ie=N.auto_advance===!0,se=N.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ie?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ie?"true":"false"}
        aria-label=${`${N.name} \uC790\uB3D9\uD654`}
        title=${ie?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ie?$u():ku()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${se?" is-on":""}`}
        data-act="merge"
        aria-pressed=${se?"true":"false"}
        aria-label=${`${N.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${se?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${xu()}
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
        ${Su()}
      </button>`}function _e(N){let ie=fg(N);return ie?l`<div class="mon2-deck__chips">
      ${ie.orchestration?l`<span class="mon2-deck__chip" title=${ie.orchestration.title}
            >오케 ${ie.orchestration.text}</span
          >`:""}
      ${ie.worker?l`<span class="mon2-deck__chip" title=${ie.worker.title}
            >워커 ${ie.worker.text}</span
          >`:""}
    </div>`:""}function pe(N){let ie=Co(N,"running"),se=typeof N.slots=="number"?N.slots:1;return l`<div
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
        ${Au()} ${te(ie,se)}
        <span class="mon2-deck__counts"
          >${ie}/${se} 실행 · 대기 ${Co(N,"queue")} · PR
          ${Co(N,"pr_wait")}</span
        >
      </div>
      <div class="mon2-deck__ops">${re(N)}</div>
      ${_e(N)}
    </div>`}function be(N){let ie=t.doneItems?t.doneItems():[],se=t.rangeLabel?t.rangeLabel():"",Se=Tu(Array.isArray(ie)?ie:[]),Ce=C=>N.reduce((G,$e)=>G+Co($e,C),0);return l`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${N.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${se}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${Ce("running")} · 대기 ${Ce("queue")} · PR ${Ce("pr_wait")} ·
        ${se} 완료 ${Array.isArray(ie)?ie.length:0}
      </div>
      ${Se===null?"":l`<div class="mon2-deck__total-tokens">
            ${typeof Se=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${Eu(se)}
                  >τ ${Se}</span
                >`:Se.map(C=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${C.provider}
                      title=${C.tooltip}
                      >τ ${C.label}</span
                    >`)}
          </div>`}
    </div>`}function Te(){let N=h();return N.length===0?"":l`<div class="mon2-deck__row">
      ${be(N)}
      <div class="mon2-deck__strip">
        ${N.map(ie=>pe(ie))}
      </div>
    </div>`}function Le(){u!==null&&!x(u)&&(u=null,t.onFocusChange?.(null))}function ne(){B(),Le(),d!==null&&!x(d)&&U(!0),Ke(Te(),n),p?.render()}function oe(N){let ie=N.target;if(!ie||typeof ie.closest!="function")return;let se=ie.closest("[data-root-dir]");if(!se)return;let Se=se.getAttribute("data-root-dir")||"",Ce=ie.closest("[data-act]")?.getAttribute("data-act");if(Ce==="worker"){t.gotoWorkerTab?.(Se);return}if(Ce==="auto"){V("worker-automation-toggle",Se,{on:O(Se)?.auto_advance!==!0});return}if(Ce==="merge"){V("worker-merge-auto-toggle",Se,{on:O(Se)?.auto_merge!==!0});return}if(Ce==="gear"){M(Se);return}D(Se)}function Ae(N){if(N.key!=="Enter"&&N.key!==" ")return;let ie=N.target;if(!ie||typeof ie.closest!="function")return;let se=ie.closest('[data-root-dir][role="button"]');!se||se!==ie||(N.preventDefault(),D(se.getAttribute("data-root-dir")||""))}return n.addEventListener("click",oe),n.addEventListener("keydown",Ae),{render:ne,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",j),n.removeEventListener("click",oe),n.removeEventListener("keydown",Ae),i.removeEventListener("click",b),L(),Ke(l``,n),e.replaceChildren()}}}var _g="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",mg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694";function Qa(e,t){return`${e}\0${t}`}function gg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function hg(e){let t=new Map;for(let[r,n]of e)t.set(r,n.slice());return t}function bg(e,t,r){let n=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===r)return!0;n.has(a)||(n.add(a),s.push(a))}}return!1}function yg(e,t){let r=new Set(t),n=new Map,s=new Map;for(let i of r){let c=Array.from(new Set((e.get(i)||[]).filter(u=>u!==i&&r.has(u))));n.set(i,c.length);for(let u of c){let d=s.get(u);d?d.push(i):s.set(u,[i])}}let o=[],a=Array.from(r).filter(i=>n.get(i)===0).sort();for(;a.length>0;){let i=a.shift();o.push(i);for(let c of(s.get(i)||[]).slice().sort()){let u=(n.get(c)||0)-1;n.set(c,u),u===0&&a.push(c)}}for(let i of t)o.includes(i)||o.push(i);return o}function vg(e,t){let r=new Set;for(let[a,i]of t)for(let c of i)r.add(Qa(a,c));let n=new Map,s=new Map;for(let a of e){let i=Qa(a.a,a.b);n.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Qa(a.a,a.b);n.get(i)===a&&s.get(i)!==r.has(i)&&o.push(a)}return o}function wg(e,t,r){let n=e.parallel_rows,s=Math.max(0,Math.min(n.length,r)),o=n[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(n[a].root_dir===t)return n[a].queue_index+1;for(let a=s;a<n.length;a++)if(n[a].root_dir===t)return n[a].queue_index;return e.parallel_raw_length.get(t)??0}function kg(e,t){return e.parallel_rows.some(r=>r.root_dir===t)}function Xa(e,t,r,n){return{type:"worker-queue-place",payload:{bead_id:e,...n?{lane:n}:{},index:r},root_dir:t}}function Ru(e,t,r){let n=hg(r.blocked_by_map),s=[],o=null,a=h=>{let x=r.owner_of.get(h);return typeof x!="string"||x.length===0?(o=gg(h),null):x},i=(h,x)=>{if(o!==null||h===x)return;let O=n.get(h)||[];if(!O.includes(x))return;let B=a(h);B!==null&&(n.set(h,O.filter(V=>V!==x)),s.push({type:"dep-remove",a:h,b:x,root_dir:B}))},c=(h,x)=>{if(o!==null||h===x)return;let O=n.get(h)||[];if(O.includes(x))return;let B=a(h);if(B!==null){if(bg(n,x,h)){o=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${h}\uAC00 \uC774\uBBF8 ${x}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}n.set(h,[...O,x]),s.push({type:"dep-add",a:h,b:x,root_dir:B})}},u=()=>{let h=r.lane_order.get(e.lane_id||"")||[],x=new Set(h),O=(n.get(e.bead_id)||[]).filter(V=>x.has(V)),B=h.filter(V=>(n.get(V)||[]).includes(e.bead_id));for(let V of O)i(e.bead_id,V);for(let V of B)i(V,e.bead_id);for(let V of O)for(let Z of B)c(Z,V);return h.filter(V=>V!==e.bead_id)},d=(h,x)=>{let O=r.lane_order.get(h)||[],B=O.indexOf(e.bead_id),V=yg(n,O.filter(L=>L!==e.bead_id)),Z=h.startsWith("pending:")?V.length:Math.max(0,Math.min(V.length,B>=0&&x>B?x-1:x)),D=Z>0?V[Z-1]:null,M=Z<V.length?V[Z]:null;if(D===null){M!==null&&c(M,e.bead_id);return}c(e.bead_id,D),M!==null&&(n.get(M)||[]).includes(D)&&(i(M,D),c(M,e.bead_id))},p=typeof e.queue_index=="number"?e.queue_index:r.queue_index_of.get(e.bead_id);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:_g};if(t.kind==="chain"&&e.kind==="repo-serial")return{refused:mg};if(e.kind==="chain"&&u(),t.kind==="chain"&&d(t.lane_id,t.marker_index),o!==null)return{refused:o};let _=[];if(t.kind==="candidate")e.kind!=="candidate"&&_.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let h=wg(r,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")_.push(Xa(e.bead_id,e.root_dir,h));else if(e.kind==="parallel"){let x=r.parallel_rows,O=x[Math.max(0,Math.min(x.length,t.marker_index))];if(!(!!O&&O.bead_id===e.bead_id)&&kg(r,e.root_dir)&&p!==void 0){let V=p>h?h:h-1;V>=0&&V!==p&&_.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:V},root_dir:e.root_dir})}}}else if(t.kind==="chain")e.kind==="candidate"&&_.push(Xa(e.bead_id,e.root_dir,r.parallel_raw_length.get(e.root_dir)??0));else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(p!==void 0&&t.index!==p){let h=p>t.index?t.index:t.index-1;h>=0&&h!==p&&_.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:h},root_dir:e.root_dir})}}else _.push(Xa(e.bead_id,e.root_dir,t.index,t.lane_id));return{ops:[...vg(s,r.blocked_by_map),..._]}}var Iu={running:3,paused:2,failed:1};function Ou(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),p=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!p&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=Iu[u.run_state],p=Iu[i];if(d>p||d===p&&(u.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:n}}var Lu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],ds=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ro(e,t){let r=Lu.find(s=>s.step===e);if(!r)return null;let n=Lu.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Mu(e){let t=ds.findIndex(r=>r.step===e);return ds.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function on(e){let t=ds.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function $g(e){let t=ds.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:ds.length}}function Io(e){let t=$g(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ei=new Set(["queued","running","retry_pending","repairing"]),Pu=new Set(["failed","succeeded"]),xg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},ps={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Ag={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:ps.base_containment,child_sweep:ps.child_sweep,branch_cleanup:ps.branch_cleanup,parent_close:ps.parent_close};function Sg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Eg(e,t,r){return!["verify","deploy"].includes(e.kind)||![...ei,...Pu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function Tg(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=u=>u.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function Ja(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=xg[s];if(!o)return null;let a=Ro(r,`${n} ${o}`);return a?{...a,active:ei.has(s),failed:s==="failed"}:null}function Cg(e){return!e||typeof e!="object"?null:Ag[e.step]||null}function fs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Cg(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=Sg(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(x=>x&&typeof x=="object"&&Eg(x,t,i)).sort(Tg):[],u=a?c:[],d=u.find(x=>ei.has(x.state));if(d)return Ja(d);if(s)return s.step==="repo_operations"&&c[0]?Ja(c[0],!0):null;let p=u.find(x=>Pu.has(x.state)?x.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return Ja(p);if(n){let x=Ro(n.step,n.label);return x?{...x,active:!0,failed:!1}:null}let _=typeof e.cleanup_cursor=="string"?ps[e.cleanup_cursor]:null;if(!_)return null;let h=Ro(_.step,_.label);return h?{...h,active:!0,failed:!1}:null}function Oo(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function ti(e,t){return`${e}\0${t}`}function Du(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function ri(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Rg(e,t){return e==="internal"&&t===void 0}function On(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Nu(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${On(s)})`,location_label:On(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=ri(e,n),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:Rg(a,s)}}function qu(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=ti(i.root_dir,c.id);r.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(u,[]);for(let d of Array.isArray(c.items)?c.items:[])n.set(d.id,u)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=ti(i.root_dir,c.id),d=Array.isArray(c.items)?c.items[0]:null,_=!!d&&d.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],h=s.get(u);if(h)for(let x of _){let O=n.get(x);O&&O!==u&&!h.includes(O)&&h.push(O)}}let o=(i,c)=>{let u=new Set,d=[i];for(;d.length>0;){let p=d.pop();if(p===c)return!0;!p||u.has(p)||(u.add(p),d.push(...s.get(p)||[]))}return!1},a=new Map;for(let[i,c]of s){let u=[];for(let d of c){let p=r.get(d);o(d,i)&&p&&u.push(p)}u.length>0&&a.set(i,u)}return a}function Fu(e,t){return ti(e,t)}var ju=1,_s=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],ni=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Ln={show_blocked:!0,spec:"all"},Bu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Ig(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Og(e,t){let{winners:r,resumed_from_ids:n}=Ou(e,t),s=new Map;for(let[o,a]of r){let i=a.attempt,c=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:ir(e,i.bead_id),can_pause:c==="running"&&d,can_resume:c!=="running"&&d&&!n.has(i.attempt_id)})}return s}function Uu(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Et(e){return e&&typeof e=="object"?e:{}}function Lg(e,t,r){let n=Et(t);if(Object.keys(n).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=_=>Qt({pin:_,global:a,execution_defaults:s,runner_catalog:o,route:r}),c,u;try{c=i(n),u=i(null)}catch{return null}let d=Wu(sn(c,o),sn(u,o)),p=Wu(qr(c,null),qr(u,null));return d||p?{orchestration:d,worker:p}:null}function Wu(e,t){return!e||t&&t.text===e.text?null:e}function Mg(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function Pg(e,t){let r=t.get(e);return r?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${On(r)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function Dg(e,t,r){let n=new Map;for(let c of e)n.set(c,Array.from(r.get(c)||[]).filter(u=>e.includes(u)).length);let s=[],o=new Map,a=e.filter(c=>(n.get(c)||0)===0).sort();for(let c of a)o.set(c,0);let i=[...a];for(;i.length>0;){let c=i.shift();s.push(c);let u=Array.from(t.get(c)||[]).filter(p=>e.includes(p)).sort(),d=(o.get(c)||0)+(u.length>1?1:0);for(let p of u){let _=(n.get(p)||0)-1;n.set(p,_);let h=o.get(p);o.set(p,h===void 0?d:Math.min(h,d)),_===0&&i.push(p)}}return{order:s,indent:o,cycle:s.length!==e.length}}function Ng(e,t,r){let n=new Map,s=new Map,o=new Set,a=(d,p,_)=>{let h=d.get(p);h?h.add(_):d.set(p,new Set([_]))},i=d=>t.get(d)?.lane==="done";for(let[d,p]of e)if(!i(d))for(let _ of p)_===d||i(_)||(o.add(_),o.add(d),a(n,_,d),a(s,d,_));let c=new Set,u=[];for(let d of Array.from(o).sort()){if(c.has(d))continue;let p=[],_=[d];for(c.add(d);_.length>0;){let D=_.pop();p.push(D);for(let M of[...n.get(D)||[],...s.get(D)||[]])c.has(M)||(c.add(M),_.push(M))}if(p.length<2)continue;let h=p.map(D=>t.get(D));if(h.every(D=>!!D&&/^s[1-5]$/.test(D.lane||""))&&h.every(D=>D&&h[0]&&D.root_dir===h[0].root_dir&&D.lane===h[0].lane))continue;let{order:O,indent:B,cycle:V}=Dg(p.slice().sort(),n,s),Z=V?p.slice().sort():O;u.push({key:p.slice().sort().join("\0"),cycle:V,nodes:Z.map(D=>{let M=t.get(D);return{id:D,workspace_name:M?M.workspace_name:"",root_dir:M?M.root_dir:"",location_label:M?On(M):Hu(D,r),indent:V?0:B.get(D)||0}})})}return u}function Hu(e,t){let r=ri(e,t);return r==="internal"?"\uBBF8\uC801\uC7AC":r==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function qg(e,t,r){let n=t.get(e);if(!n)return Hu(e,r);if(typeof n.position=="number"){if(n.lane==="parallel")return`#${n.position}`;if(/^s[1-5]$/.test(n.lane))return`${n.lane} #${n.position}`}return On(n)}function Fg(e,t,r){let n=[];for(let s of r.get(e)||[])s!==e&&t.has(s)&&!n.includes(s)&&n.push(s);return n}function jg(e,t,r,n,s,o){let a=(d,p,_,h,x=!1)=>{let O=n.get(d),B=O&&O.lane==="parallel"&&typeof O.position=="number"?O.position-1:null;return{id:d,title:o.get(d)||d,root_dir:O?O.root_dir:"",workspace_name:O?O.workspace_name:"",seq:p,indent:_,predecessors:h,location_label:qg(d,n,s),draggable:!x&&B!==null,...B!==null?{queue_index:B}:{}}},i=[];for(let d of e.slice().sort((p,_)=>p.key<_.key?-1:1)){let p=new Set(d.nodes.map(_=>_.id));i.push({lane_id:`chain:${d.key}`,label:"",pending:!1,cycle:d.cycle,rows:d.nodes.map((_,h)=>a(_.id,h+1,d.cycle?0:_.indent,d.cycle?[]:Fg(_.id,p,r),d.cycle))})}let c=new Set;for(let d of i)for(let p of d.rows)c.add(p.id);let u=[];return t.forEach((d,p)=>{let _=d&&typeof d.seed=="string"&&d.seed.length>0?d.seed:null;_!==null&&c.has(_)||(u.push(p),i.push({lane_id:`pending:${p}`,label:"",pending:!0,cycle:!1,rows:_===null?[]:[a(_,1,0,[])]}))}),i.forEach((d,p)=>{d.label=`\uC5F0\uACB0 ${p+1} \xB7 \uB808\uD3EC \uAC04`}),{chain_lanes:i,pending_lanes_kept:u}}function zu(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function si(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a={...Ln,...r&&r.candidate_filter?r.candidate_filter:{}},i=r&&_s.some(C=>C.value===r.candidate_sort)?r.candidate_sort:"repo_spec",c=new Map;for(let C of s)C&&typeof C.root_dir=="string"&&c.set(C.root_dir,C);let u=[],d=[],p=[],_=[],h=[],x=[],O=new Map,B=new Map,V=new Map,Z=new Map,D=new Map,M=new Map;for(let C of n){if(!C||typeof C.root_dir!="string")continue;let G=C.root_dir,$e=C.name||G,Ne=c.get(G),Pe=Ne&&typeof Ne.revision=="number"?Ne.revision:typeof C.revision=="number"?C.revision:0,He=Et(C.attempts),Ze=Et(C.bead_titles);for(let[S,P]of Object.entries(Ze))typeof P=="string"&&P.length>0&&M.set(S,P);let ot=Et(C.bead_times),at=Et(C.pr_observations),nt=Et(C.admission),K=Et(C.revise_parked),Y=Et(C.merge_queue_state),Ee=Et(C.cleanup_failed),Ve=Et(C.discard_operations),ze=Et(C.bead_blocked_by),fe=Et(C.bead_workflow),R=Et(C.pr_activity),Q=Array.isArray(C.repo_operations)?C.repo_operations:[],ae=Array.isArray(C.merge_queue)?C.merge_queue:[],J=new Set(ae.filter(S=>S&&typeof S.bead_id=="string").map(S=>S.bead_id)),qe=new Map(ae.filter(S=>S&&typeof S.bead_id=="string").map(S=>[S.bead_id,S])),Qe=Array.isArray(C.queue)?C.queue:[],it=(Array.isArray(C.serial_lanes)?C.serial_lanes:[]).filter(S=>S&&/^s[1-5]$/.test(S.id)&&Array.isArray(S.entries)),Xe=Et(C.lane_states),pt=typeof C.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(C.serial_lane_count))):Math.min(5,it.length);V.set(G,pt),Z.set(G,Qe.length);let yt=new Map(it.map(S=>[S.id,S])),gt=new Map;for(let S of it)for(let P of S.entries)P&&typeof P.bead_id=="string"&&gt.set(P.bead_id,S.id);for(let[S,P]of Object.entries(ze))Array.isArray(P)&&D.set(S,P.filter(de=>typeof de=="string"&&de.length>0));let ft=Array.isArray(C.done)?C.done:[];for(let S of ft)S&&typeof S.bead_id=="string"&&x.push({id:S.bead_id,root_dir:G,workspace_name:$e});let kt=new Map;for(let S of ft)S&&typeof S.bead_id=="string"&&typeof S.added_at=="number"&&kt.set(S.bead_id,S.added_at);let We=S=>({id:S,title:Ze[S]||S,root_dir:G,workspace_name:$e,expected_revision:Pe,draggable:!1,...Et(ot[S]).created_at?{created_at:Et(ot[S]).created_at}:{},...Et(ot[S]).updated_at?{updated_at:Et(ot[S]).updated_at}:{}}),Ye=new Set;for(let[S,P]of Og(He,kt))Ye.add(S),d.push({...We(S),lane:"running",...gt.has(S)?{serial_lane_id:gt.get(S)}:{},attempt_id:P.attempt_id,run_state:P.run_state,status:P.status||void 0,workflow:fe[S]||null,can_pause:P.can_pause,can_resume:P.can_resume,started_at:P.started_at,last_event_at:P.last_event_at,last_activity:P.last_activity,legs:P.legs,runner:P.runner,model:P.model,effort:P.effort,speed:P.speed,resumed_from:P.resumed_from,continuation_mode:P.continuation_mode,usage:P.usage,exec_chips:{orchestration:So(P),worker:null},discard:vr(Ve,S,{attempt_id:P.attempt_id}),badges:P.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:P.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:P.run_state==="failed"});for(let S of Array.isArray(C.pr_wait)?C.pr_wait:[]){let P=S&&S.bead_id;if(typeof P!="string"||Ye.has(P))continue;Ye.add(P);let de=Et(at[P]),k=Et(de.pr),E=de.gate?Et(de.gate):null,F=J.has(P),ee=qe.get(P)?.continuation_action||null,ke=!!ee&&ee.continuation===null,ve=Y.active===P,Me=S.external===!0,De=Ee[P]||null,Rt=Et(R[P]),lt=fs({bead_id:P,merge_sha:S.merge_sha,cleanup_cursor:S.cleanup_cursor,merge_progress:Rt.merge_progress||null,cleanup_failed:De,repo_operations:Q}),Je=Oo(lt),Dt=!!E&&E.base_badge==="\uCDA9\uB3CC",Ut=!!De&&["child_sweep","branch_cleanup","parent_close"].includes(De.step)&&!!E&&E.tier==="merged",Fe=Me&&!!De&&!!E&&E.tier==="merged",Ft=!!E&&["closed_unmerged","review","undecidable"].includes(E.tier),It=vr(Ve,P,{external:Me,merge_active:ve||lt?.step==="merge",merge_queued:F,cleanup_active:Je,merged:!!De||E?.tier==="merged"}),zt=!!It.operation;p.push({...We(P),lane:"pr_wait",pr_number:typeof k.number=="number"?k.number:null,pr_url:typeof k.url=="string"?k.url:void 0,external:Me,usage:ir(He,P),merge_step:lt,badges:ke?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:lt?[E?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:De?[on(De.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${on(De.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof E?.gate_badge=="string"&&E.gate_badge.length>0?[E.gate_badge]:[],alert:lt?lt.failed===!0:!!De||Ft,reason:De&&lt?.active!==!0?Io(De.step):"PR \uB300\uAE30",merge_action:E?.tier==="merged"&&!Ut&&!Fe?!1:!F||ke,merge_enabled:!zt&&(ke||E?.enabled===!0||Dt||Ut||Fe),merge_label:ke?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Fe||Ut?"\uC815\uB9AC \uC7AC\uAC1C":Dt&&!Ut?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ke?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":zt?It.error?`\uD3D0\uAE30 \uC2E4\uD328: ${It.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${It.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ut?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Dt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.enabled===!0?`\uBA38\uC9C0 (${E.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${E?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:F&&!ke,cancel_enabled:!ve,continuation_mismatch:ee?.mismatch||null,discard:It,discard_action:It.action,discard_enabled:It.enabled,discard_title:It.title})}let Ue=(S,P,de,k)=>{let E=S&&S.bead_id;if(typeof E!="string"||Ye.has(E))return null;Ye.add(E);let F=K[E],ee=vr(Ve,E),ke=ee.operation?ee:null,ve={...We(E),lane:P,draggable:!ke,discard:ke||void 0,reason:Uu(nt,E),seq:de+1,queue_position:de+1,queue_index:de,queue_length:k,badges:F?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!F,revise_action:!!F,revise_enabled:!!F&&!ke,revise_title:F?F.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${F.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(ze,E)&&(ve.blocked_by=Array.isArray(ze[E])?ze[E].filter(Me=>typeof Me=="string"&&Me.length>0):[]),ve};for(let S=0;S<Qe.length;S++){let P=Ue(Qe[S],"queue",S,Qe.length);if(!P)continue;_.push(P);let de=O.get(G);de?de.push(P):O.set(G,[P])}let ut=[];for(let S=0;S<Math.max(pt,it.length);S++){let P=`s${S+1}`,de=yt.get(P),k=de&&Array.isArray(de.entries)?de.entries:[],E=[];for(let ke=0;ke<k.length;ke++){let ve=Ue(k[ke],P,ke,k.length);ve&&(E.push(ve),_.push(ve))}let F=Et(Xe[P]),ee=Array.isArray(F.occupied_by)?F.occupied_by.filter(ke=>typeof ke=="string"):[];E.length===0&&ee.length===0&&(pt<=1||S>=pt)||ut.push({id:P,index:S,items:E,raw_length:k.length,occupied_by:ee,corrections:Array.isArray(F.corrections)?F.corrections.length:0,cycle:F.cycle===!0,...E.length===0&&ee.length===0?{empty:!0}:{}})}B.set(G,ut);let At=Array.from({length:pt},(S,P)=>{let de=`s${P+1}`,k=yt.get(de),E=k&&Array.isArray(k.entries)?k.entries:[],F=Et(Xe[de]);return{id:de,index:E.length,length:E.length,occupied_by:Array.isArray(F.occupied_by)?F.occupied_by.filter(ee=>typeof ee=="string"):[]}});for(let S of Array.isArray(C.runnable)?C.runnable:[]){let P=S&&S.bead_id;if(typeof P!="string"||Ye.has(P))continue;Ye.add(P);let de=S.workflow&&typeof S.workflow=="object"?S.workflow:null,k=de&&typeof de.route=="string"&&de.route||(typeof S.route=="string"?S.route:null),E=Lg(Et(Ne),S.exec_pins,k);Array.isArray(S.blocked_by)&&S.blocked_by.length>0&&D.set(P,S.blocked_by.filter(F=>typeof F=="string"&&F.length>0)),typeof S.title=="string"&&S.title.length>0&&M.set(P,S.title),u.push({...We(P),title:S.title||Ze[P]||P,lane:"runnable",draggable:!0,reason:Uu(nt,P),created_at:S.created_at??void 0,updated_at:S.updated_at??void 0,status:typeof S.status=="string"?S.status:void 0,labels:Array.isArray(S.labels)?S.labels:[],spec_id:typeof S.spec_id=="string"?S.spec_id:"",workflow:de||(k?{route:k,chips:{route:k}}:null),...E?{exec_chips:E}:{},blocked:S.blocked===!0,...Array.isArray(S.blocked_by)?{blocked_by:S.blocked_by.filter(F=>typeof F=="string"&&F.length>0)}:{},place_index:Qe.length,place_lanes:At})}for(let S of ft){let P=S&&S.bead_id;if(typeof P!="string"||Ye.has(P)||(Ye.add(P),o!==void 0&&typeof S.added_at=="number"&&S.added_at<o))continue;let de=Ig(He,P),k=de&&typeof de.done_kind=="string"?de.done_kind:null;h.push({...We(P),lane:"done",done:!0,done_layout:"three_line",usage:ir(He,P),work_ms:vo(He,P),done_at:typeof S.added_at=="number"?S.added_at:void 0,done_kind:k,badges:k&&Bu[k]?[Bu[k]]:[]})}}let L=new Map;s.forEach((C,G)=>{C&&typeof C.root_dir=="string"&&L.set(C.root_dir,G)});let U=r&&r.running_sort==="repo"?"repo":"started";d.sort((C,G)=>{if(U==="repo"){let Pe=L.get(C.root_dir)??Number.MAX_SAFE_INTEGER,He=L.get(G.root_dir)??Number.MAX_SAFE_INTEGER;if(Pe!==He)return Pe-He}let $e=typeof C.started_at=="number"&&Number.isFinite(C.started_at)?C.started_at:null,Ne=typeof G.started_at=="number"&&Number.isFinite(G.started_at)?G.started_at:null;return $e!==null&&Ne!==null&&$e!==Ne?$e-Ne:$e===null&&Ne!==null?1:$e!==null&&Ne===null?-1:C.id.localeCompare(G.id)}),h.sort((C,G)=>(G.done_at??0)-(C.done_at??0));let b=s.length>0?s:n.map(C=>({root_dir:C&&C.root_dir,name:C&&C.name,auto_advance:C&&C.auto_advance,auto_merge:C&&C.auto_merge,slots:C&&C.slots,revision:C&&C.revision,runner_catalog:C&&C.runner_catalog})),j=new Set(u.map(C=>C.root_dir)),te=[];for(let C of b){if(!C||typeof C.root_dir!="string")continue;let G=O.get(C.root_dir)||[],$e=B.get(C.root_dir)||[];!(G.length>0||$e.some(Pe=>Pe.items.length>0||Pe.occupied_by.length>0))&&!j.has(C.root_dir)||te.push({root_dir:C.root_dir,name:C.name||C.root_dir,auto_advance:C.auto_advance===!0,auto_merge:C.auto_merge===!0,slots:typeof C.slots=="number"&&C.slots>=ju?C.slots:ju,revision:typeof C.revision=="number"?C.revision:0,runner_catalog:Et(C.runner_catalog),items:G,sublanes:{parallel:G,serial:$e},serial_lane_count:V.get(C.root_dir)||0,raw_queue_length:Z.get(C.root_dir)||0})}let re={runnable:u,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:_,queue_groups:te,running:d,pr_wait:p,done:h,chains:[],parallel_rows:[],chain_lanes:[],parallel_raw_length:Object.fromEntries(Z),owner_of:{},pending_lanes_kept:[]},_e=Du(re);for(let C of x)_e.has(C.id)||_e.set(C.id,{root_dir:C.root_dir,workspace_name:C.workspace_name,lane:"done",state:"done"});let pe=new Map;for(let[C,G]of D)for(let $e of G){let Ne=pe.get($e);Ne?Ne.includes(C)||Ne.push(C):pe.set($e,[C])}for(let C of[...re.queue,...re.runnable]){if(!Object.hasOwn(C,"blocked_by"))continue;let G=_e.get(C.id);C.blockers=(C.blocked_by||[]).map($e=>Nu($e,G,_e,s)),C.blocker_warnings=C.blockers.filter($e=>$e.missing_internal).map($e=>`\u26A0 \uC120\uD589 ${$e.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),C.blocker_warnings.length>0&&(C.alert=!0)}for(let C of[...re.queue,...re.runnable,...re.running,...re.pr_wait]){let G=C.lane==="running"||C.lane==="pr_wait"?[]:(C.blockers||[]).map(Mg),$e=[];for(let He of pe.get(C.id)||[]){let Ze=Pg(He,_e);Ze&&$e.push(Ze)}let Ne=C.lane==="running"||C.lane==="pr_wait"?[]:C.blocker_warnings||[];if(G.length===0&&$e.length===0&&Ne.length===0)continue;let Pe={predecessors:G,successors:$e,warnings:Ne};C.dependency_chips=Pe}re.chains=Ng(D,_e,s);let be=qu(re.queue_groups);for(let C of re.queue_groups)for(let G of C.sublanes.serial){let $e=be.get(Fu(C.root_dir,G.id));$e&&(G.cross_wait_peers=$e)}let Te=jg(re.chains,Array.isArray(r?.pending_lanes)?r.pending_lanes:[],D,_e,s,M);re.chain_lanes=Te.chain_lanes,re.pending_lanes_kept=Te.pending_lanes_kept;let Le=new Set;for(let C of re.chain_lanes)for(let G of C.rows)Le.add(G.id);let ne=[];for(let C of O.values())for(let G of C)Le.has(G.id)||ne.push(G);ne.sort((C,G)=>{let $e=C.workspace_name.localeCompare(G.workspace_name);return $e!==0?$e:(C.queue_index??0)-(G.queue_index??0)}),re.parallel_rows=ne;let oe={};for(let[C,G]of _e)typeof G.root_dir=="string"&&G.root_dir.length>0&&(oe[C]=G.root_dir);re.owner_of=oe;let Ae=re.runnable.length,N=re.runnable;a.show_blocked||(N=N.filter(C=>C.blocked!==!0));let ie=N.length;a.spec==="with"?N=N.filter(C=>!!C.spec_id):a.spec==="without"&&(N=N.filter(C=>!C.spec_id)),re.runnable_hidden={blocked:Ae-ie,spec:ie-N.length};let se=(C,G)=>{let $e=zu(G.updated_at)-zu(C.updated_at);return $e!==0?$e:C.id.localeCompare(G.id)},Ce=i==="repo_spec"?(C,G)=>{let $e=C.spec_id?0:1,Ne=G.spec_id?0:1;return $e!==Ne?$e-Ne:se(C,G)}:se;if(i==="updated_flat")re.runnable=N.slice().sort(se),re.runnable_sections=[];else{let C=new Map;for(let Ne of N){let Pe=C.get(Ne.root_dir);Pe?Pe.push(Ne):C.set(Ne.root_dir,[Ne])}let G=[],$e=[];for(let Ne of b){if(!Ne||typeof Ne.root_dir!="string")continue;let Pe=(C.get(Ne.root_dir)||[]).slice().sort(Ce);C.delete(Ne.root_dir),Pe.length!==0&&(G.push({root_dir:Ne.root_dir,name:Ne.name||Ne.root_dir,items:Pe.map(He=>({...He,workspace_name:""}))}),$e.push(...Pe))}for(let[Ne,Pe]of C){let He=Pe.slice().sort(Ce);G.push({root_dir:Ne,name:He[0]?.workspace_name||Ne,items:He.map(Ze=>({...Ze,workspace_name:""}))}),$e.push(...He)}re.runnable=$e,re.runnable_sections=G}return re}var Yu="bdui.monitor.done-range",Zu="bdui.monitor.running_sort",Qu="bdui.monitor.candidate_sort",Xu="beads-ui.monitor.candidate-filter",Ju="beads-ui.monitor.sections";function Bg(){try{let e=window.localStorage.getItem(Xu);if(!e)return{...Ln};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ln}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Ln.show_blocked,spec:ni.some(r=>r.value===t.spec)?t.spec:"all"}}catch{return{...Ln}}}function Gu(e){try{window.localStorage.setItem(Xu,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Ug(){try{let e=window.localStorage.getItem(Qu);return _s.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Wg(e){try{window.localStorage.setItem(Qu,e)}catch{}}function zg(){try{let e=window.localStorage.getItem(Ju);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Vu(e){try{window.localStorage.setItem(Ju,JSON.stringify(e))}catch{}}function Hg(){try{let e=window.localStorage.getItem(Yu);return or(e)?e:er}catch{return er}}function Gg(e){try{window.localStorage.setItem(Yu,e)}catch{}}function Vg(){try{return window.localStorage.getItem(Zu)==="repo"?"repo":"started"}catch{return"started"}}function Kg(e){try{window.localStorage.setItem(Zu,e)}catch{}}var ed="tab:monitor:pipeline",Yg=1e3,Zg=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Ku="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Qg(e){return e>=1&&e<=Ku.length?Ku[e-1]:`(${e})`}function td(e,t){let r=St("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,c=t.router,u=t.now||(()=>Date.now()),d=t.confirm||(v=>typeof globalThis.confirm!="function"||globalThis.confirm(v)),p=Hg(),_=Vg(),h=Bg(),x=Ug(),O=zg(),B=null,V=null,Z=[],D=null;function M(){let v=Ir.find(w=>w.value===p);return v?v.label:""}let L=document.createElement("div");L.className="mon",e.appendChild(L);let U=document.createElement("div");U.className="mon2-drawer",e.appendChild(U);let b=si(null,null),j=new Map,te=new Map,re=null,_e=null,pe=null,be=Tn(U,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{B=null,ae()}});async function Te(v,w,I,W,ye=!0){if(!o||!I)return null;let we=await o(v,{...w,root_dir:I,expected_revision:W});if(we&&we.conflict&&ye){we.queue&&te.set(I,we.queue);let he=we.queue&&typeof we.queue.revision=="number"?we.queue.revision:W;we=await o(v,{...w,root_dir:I,expected_revision:he})}return we&&we.queue&&I&&te.set(I,we.queue),we}function Le(v,w){let I=te.get(v),W=s&&s.get?s.get():null,ye=(Array.isArray(W)?W:[]).find(he=>he?.root_dir===v);return(I||ye)?.merge_queue?.find(he=>he.bead_id===w)?.continuation_action}async function ne(v,w,I,W){let ye=await Te(v,w,I,W),we=te.get(I)?.revision??ye?.queue?.revision??W;return kr(ye,(he,et)=>Te(v,{...w,continuation:he,decision_token:et},I,we,!1),{refresh:he=>Te(v,w,I,he?.queue?.revision??te.get(I)?.revision??we,!1)})}async function oe(v,w,I,W){let ye=await kr({continuation_mismatch:W},(he,et)=>Te("worker-merge-queue-add",{bead_id:w,continuation:he,decision_token:et},v,I,!1)),we=ye?.queue?.merge_queue?.find(he=>he.bead_id===w)?.continuation_action;ye?.applied!==!0&&we?.continuation===null&&we.mismatch&&await oe(v,w,ye.queue.revision,we.mismatch)}async function Ae(v,w,I){let W=await Te("worker-discard",v,w,I);if(W&&W.discarded===!0){me(ko(W),"success",5e3);return}if(W&&W.reason){me(`\uD3D0\uAE30 \uC2E4\uD328: ${W.reason}`,"error");return}if(W&&W.accepted&&W.pending==="merged_revert"){me("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(W&&W.accepted){me(`\uD3D0\uAE30 \uC9C4\uD589: ${W.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}W&&!W.conflict&&me("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function N(v,w,I){return!o||!I?null:await o(v,{...w,root_dir:I})}async function ie(){let v=new Map;for(let w of b.pr_wait)v.has(w.root_dir)||v.set(w.root_dir,w.expected_revision);for(let[w,I]of v)await Te("worker-merge-queue-add-all",{},w,I)}function se(v){let w=O[v];return!!(w&&w.runnable===!0)}function Se(v){let w={...O[v]||{}};w.runnable=!w.runnable,O={...O,[v]:w},Vu(O),ae()}function Ce(v){return O[v]===!0}function C(v){O={...O,[v]:O[v]!==!0},Vu(O),ae()}function G(v){let w=se(v.root_dir);return l`<header class="mon2-sec__hd">
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
    </div>`}function Ne(v){if(V!==v.id)return null;let w=b.queue_groups.find(W=>W.root_dir===v.root_dir),I=v.place_lanes||[];return{bead_id:v.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:v.place_index??0},...b.chain_lanes.map((W,ye)=>({id:`lane:${ye}`,label:`\uC5F0\uACB0 ${ye+1} \uB05D\uC5D0`,count:W.rows.length})),{id:"new-lane",label:"\uC0C8 \uC5F0\uACB0 \uB808\uC778",count:0},...I.map(W=>({id:`serial:${W.id}`,label:`${w?w.name:""} \uC9C1\uB82C ${Number(W.id.slice(1))}`,count:W.length}))]}}function Pe(v){return $e(v,za(v,Ne(v),{exec_chips_mode:"pinned_only"}))}function He(){return b.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${b.runnable.map(v=>Pe(v))}
      </div>`:l`${b.runnable_sections.map(v=>{let w=se(v.root_dir);return l`<section
        class="mon2-sec${w?" is-collapsed":""}"
        data-root-dir=${v.root_dir}
        data-section="runnable"
      >
        ${G({root_dir:v.root_dir,name:v.name,count:v.items.length})}
        ${w?"":l`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${v.items.map(I=>Pe(I))}
            </div>`}
      </section>`})}`}function Ze(v,w){return l`<div
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
    </div>`}function ot(){let v=Ce("parallel");return l`<section
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
                </div>`:b.parallel_rows.map((w,I)=>Ze(w,I))}
          </div>`}
    </section>`}function at(v,w,I){return l`<div
      class="mon2-crow"
      style=${`--indent: ${w.indent}`}
      draggable=${w.draggable?"true":"false"}
      data-bead-id=${w.id}
      data-drag-kind="chain"
      data-root-dir=${w.root_dir}
      data-lane-id=${v.lane_id}
      data-row-index=${I}
      data-queue-index=${typeof w.queue_index=="number"?String(w.queue_index):""}
    >
      ${v.cycle?"":l`<span class="mon2-crow__seq" aria-hidden="true"
            >${Qg(w.seq)}</span
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
    </div>`}function nt(v){return l`<div class="mon2-clane" data-lane-id=${v.lane_id}>
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
            </div>`:v.rows.map((w,I)=>at(v,w,I))}
      </div>
    </div>`}function K(v,w,I){return l`<div
      class="mon2-item"
      data-bead-id=${w.id}
      data-drag-kind="repo-serial"
      data-root-dir=${w.root_dir}
      data-lane-id=${v.id}
      data-row-index=${I}
      data-queue-index=${String(w.queue_index??0)}
    >
      ${nn(w)}
    </div>`}function Y(v,w){return l`<div
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
          ${w.items.length>0?w.items.map((I,W)=>K(w,I,W)):l`<div class="worker-pane__empty">
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
      ${(w.cross_wait_peers||[]).map(I=>l`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${I.workspace_name}·${I.lane}과 교차 대기
          </div>`)}
    </div>`}function Ee(){let v=Ce("serial"),w=b.chain_lanes.some(I=>I.pending&&I.rows.length===0);return l`<section
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
            ${b.chain_lanes.map(I=>nt(I))}
            ${b.queue_groups.map(I=>I.sublanes.serial.map(W=>Y(I,W)))}
          </div>`}
    </section>`}function Ve(){return l`<div class="mon2-wait">${ot()}${Ee()}</div>`}function ze(v){return l`<div class="worker-rungrid">
      ${b.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:b.running.map(w=>Va({bead_id:w.id,attempt_id:w.attempt_id||"",title:w.title,runner:w.runner??null,model:w.model??null,effort:w.effort??null,speed:w.speed??null,started_at:w.started_at??null,resumed_from:w.resumed_from??null,continuation_mode:w.continuation_mode??null,paused:w.run_state==="paused",failed:w.run_state==="failed",status:w.status,status_label:w.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:w.can_resume!==!1,can_pause:w.can_pause!==!1,exec_chips:w.exec_chips||null,usage:w.usage||null,discard:w.discard},v,B,{monitor:{repo:w.workspace_name,root_dir:w.root_dir,serial_lane_id:w.serial_lane_id,workflow:w.workflow||null,last_activity:w.last_activity||null,legs:w.legs||[],dependency_chips:w.dependency_chips||null}}))}
    </div>`}function fe(v){let w={runnable:b.runnable,queue:b.queue,running:b.running,pr_wait:b.pr_wait,done:b.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${Zg.map(I=>{let W=w[I.lane],ye=I.lane==="runnable"?b.runnable_flat?W.length>0?He():void 0:b.runnable_sections.length>0?He():void 0:I.lane==="queue"?b.queue_groups.length>0||b.chain_lanes.length>0||b.parallel_rows.length>0?Ve():void 0:I.lane==="running"?ze(v):W.length>0?l`${W.map(we=>nn(we))}`:void 0;return cr({id:`monitor-${I.lane}`,lane:I.pane,title:I.lane==="done"?`\uC644\uB8CC\xB7${M()}`:I.title,items:W,empty:I.empty,body:ye,live:I.lane==="running"&&W.length>0,controls:I.lane==="runnable"?R():void 0,header_control:Q(I.lane,W.length)})})}
      </div>`}function R(){return l`<div class="worker-filter">
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
        ${ni.map(v=>l`<button
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
    </div>`}function Q(v,w){return v==="runnable"?l`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${x}
      >
        ${_s.map(I=>l`<option
              value=${I.value}
              ?selected=${x===I.value}
            >
              ${I.label}
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
        ${Ir.map(I=>l`<option value=${I.value} ?selected=${p===I.value}>
              ${I.label}
            </option>`)}
      </select>`:""}function ae(){let v=s&&s.get?s.get():null,w=s&&s.getWorkspacesState?s.getWorkspacesState():[],I=u(),W=()=>si(v,w,{done_since:Kr(p,I),running_sort:_,candidate_filter:h,candidate_sort:x,pending_lanes:Z});b=W(),b.pending_lanes_kept.length!==Z.length&&(Z=b.pending_lanes_kept.map(ye=>Z[ye]),b=W()),j=new Map;for(let ye of[...b.runnable,...b.queue,...b.running,...b.pr_wait,...b.done])j.has(ye.id)||j.set(ye.id,ye);Ke(fe(I),L),qe()?.render(),J(),Qe()}function J(){let v=new Map;for(let w of b.queue_groups)v.set(w.root_dir,w.auto_advance);for(let w of Array.from(L.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let I=w.closest(".mon2-item")?.getAttribute("data-root-dir")||"",W=v.get(I);typeof W=="boolean"&&w.setAttribute("title",`${w.textContent||""} \xB7 ${W?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function qe(){if(pe)return pe;let v=L.querySelector(".mon2-deck");return v?(pe=Cu(v,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>b.done,rangeLabel:M,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:Xe,onFocusChange:w=>{D=w,Qe()}}),pe):null}function Qe(){L.classList.toggle("has-focus",D!==null);for(let v of Array.from(L.querySelectorAll(".mon2-sec[data-root-dir]")))v.classList.toggle("is-focus",D!==null&&v.getAttribute("data-root-dir")===D);for(let v of Array.from(L.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let w=j.get(v.getAttribute("data-bead-id")||"");v.classList.toggle("is-focus",D!==null&&!!w&&w.root_dir===D)}for(let v of Array.from(L.querySelectorAll(".mon2-crow[data-root-dir]")))v.classList.toggle("is-focus",D!==null&&v.getAttribute("data-root-dir")===D)}function it(v,w){let I=a?a():void 0;if(!w||!I||w===I||!i){n(v);return}i(w).then(()=>{n(v)}).catch(W=>{r("workspace switch for %s failed: %o",w,W)})}function Xe(v){if(!v)return;let w=a?a():void 0,I=()=>{try{c?.gotoView("worker")}catch(W){r("gotoView(worker) failed: %o",W)}};if(!i||w&&w===v){I();return}i(v).then(I).catch(W=>{r("workspace switch for %s failed: %o",v,W),me("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function pt(v){tr(v).then(w=>{me(w?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",w?"success":"error",1400)})}function yt(v){let w=j.get(v)||null;return{item:w,root_dir:w?w.root_dir:"",revision:w?w.expected_revision:0}}function gt(v){if(typeof v=="string"&&v.length>0)return v;if(v&&typeof v=="object"){let w=v;if(typeof w.message=="string"&&w.message.length>0)return w.message;if(typeof w.error=="string"&&w.error.length>0)return w.error;if(w.error&&typeof w.error=="object"&&typeof w.error.message=="string")return w.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function ft(v,w,I){let{root_dir:W}=yt(w);if(!(!w||!I||I===w))try{await N(v,{a:w,b:I},W)}catch(ye){me(gt(ye),"error")}}function kt(){let v=new Map,w=s&&s.get?s.get():null,I=W=>Array.isArray(W)?W.filter(ye=>typeof ye=="string"&&ye.length>0):[];for(let W of Array.isArray(w)?w:[]){if(!W||typeof W!="object")continue;let ye=W.bead_blocked_by&&typeof W.bead_blocked_by=="object"?W.bead_blocked_by:{};for(let[we,he]of Object.entries(ye))Array.isArray(he)&&v.set(we,I(he));for(let we of Array.isArray(W.runnable)?W.runnable:[])we&&typeof we.bead_id=="string"&&Array.isArray(we.blocked_by)&&we.blocked_by.length>0&&v.set(we.bead_id,I(we.blocked_by))}return v}function We(){let v=new Map;for(let I of b.chain_lanes)v.set(I.lane_id,I.rows.map(W=>W.id));let w=new Map;for(let I of b.parallel_rows)typeof I.queue_index=="number"&&w.set(I.id,I.queue_index);for(let I of b.queue_groups)for(let W of I.sublanes.serial)for(let ye of W.items)typeof ye.queue_index=="number"&&w.set(ye.id,ye.queue_index);return{blocked_by_map:kt(),owner_of:new Map(Object.entries(b.owner_of)),lane_order:v,parallel_rows:b.parallel_rows.map(I=>({bead_id:I.id,root_dir:I.root_dir,queue_index:I.queue_index??0})),parallel_raw_length:new Map(Object.entries(b.parallel_raw_length)),queue_index_of:w}}function Ye(v,w){let I=j.get(w);if(I&&I.root_dir===v)return I.expected_revision;let W=b.queue_groups.find(ye=>ye.root_dir===v);return W?W.revision:0}async function Ue(v,w){try{if(v.type==="worker-queue-place"||v.type==="worker-queue-reorder"||v.type==="worker-queue-remove"){let I=await Te(v.type,v.payload,v.root_dir,Ye(v.root_dir,w));return I&&I.conflict?(me("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):I&&I.applied===!1?(me(I.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${I.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0}return(v.type==="dep-add"||v.type==="dep-remove")&&await N(v.type,{a:v.a,b:v.b},v.root_dir),!0}catch(I){return me(gt(I),"error"),!1}}async function ut(v,w){let I=Ru(v,w,We());if("refused"in I){me(I.refused,"error");return}if(w.kind==="chain"){let W=b.chain_lanes.find(we=>we.lane_id===w.lane_id),ye=W&&W.pending&&W.rows.length===0?Number(W.lane_id.slice(8)):-1;ye>=0&&Z[ye]&&(Z=Z.map((we,he)=>he===ye?{seed:v.bead_id}:we))}for(let W of I.ops)if(!await Ue(W,v.bead_id))break;ae()}async function At(v,w){let I=j.get(v);if(!I){ae();return}let W={kind:"candidate",bead_id:v,root_dir:I.root_dir};if(w==="new-lane"){Z.some(we=>we.seed===null)||(Z=[...Z,{seed:null}]),ae();let ye=b.chain_lanes.find(we=>we.pending&&we.rows.length===0);if(!ye)return;await ut(W,{kind:"chain",lane_id:ye.lane_id,marker_index:0});return}if(w.startsWith("lane:")){let ye=b.chain_lanes[Number(w.slice(5))];if(!ye){ae();return}await ut(W,{kind:"chain",lane_id:ye.lane_id,marker_index:ye.rows.length});return}if(w.startsWith("serial:")){let ye=w.slice(7),we=(I.place_lanes||[]).find(he=>he.id===ye);await ut(W,{kind:"repo-serial",root_dir:I.root_dir,lane_id:ye,index:we?we.index:0});return}await ut(W,{kind:"parallel",marker_index:b.parallel_rows.length})}async function S(v,w){let I=b.parallel_rows,W=I.findIndex(T=>T.id===v);if(W<0)return;let ye=I[W].root_dir,we=[];I.forEach((T,le)=>{T.root_dir===ye&&we.push(le)});let he=we.indexOf(W),et=we[he+w];if(typeof et!="number")return;let Ie=w===-1?et:we[he+2]??Math.min(I.length,et+1);await ut({kind:"parallel",bead_id:v,root_dir:ye,queue_index:I[W].queue_index??0},{kind:"parallel",marker_index:Ie})}async function P(v){for(let w of b.chain_lanes){let I=w.rows.find(W=>W.id===v);if(!(!I||!I.draggable)){await ut({kind:"chain",bead_id:v,root_dir:I.root_dir,lane_id:w.lane_id,...typeof I.queue_index=="number"?{queue_index:I.queue_index}:{}},{kind:"parallel",marker_index:b.parallel_rows.length});return}}}let de=null,k=!1,E=null;function F(){E!==null&&clearTimeout(E),E=setTimeout(()=>{E=null,k=!1},0)}function ee(v,w){let I=w&&typeof w.closest=="function"?w.closest("[data-row-index]"):null;if(I&&v.contains(I)){let W=Number(I.getAttribute("data-row-index"));return Number.isFinite(W)?W:0}return v.querySelectorAll("[data-row-index]").length}function ke(v){let w=v.target,I=typeof w?.closest=="function"?w.closest("[data-drop]"):null;if(!I||!de)return null;let W=I.getAttribute("data-drop");if(W==="candidate")return{zone:I,target:{kind:"candidate"}};if(W==="parallel")return{zone:I,target:{kind:"parallel",marker_index:ee(I,w)}};if(W==="chain")return{zone:I,target:{kind:"chain",lane_id:I.getAttribute("data-lane-id")||"",marker_index:ee(I,w)}};if(W==="repo-serial"){let ye=I.getAttribute("data-root-dir")||"";if(ye!==de.root_dir)return null;let we=typeof w?.closest=="function"?w.closest("[data-queue-index]"):null,he=we&&I.contains(we)?we.getAttribute("data-queue-index"):I.getAttribute("data-lane-length"),et=Number(he);return{zone:I,target:{kind:"repo-serial",root_dir:ye,lane_id:I.getAttribute("data-lane-id")||"",index:Number.isFinite(et)?et:0}}}return null}function ve(){for(let v of Array.from(L.querySelectorAll(".is-drop-over")))v.classList.remove("is-drop-over")}function Me(v){let w=v.target,I=typeof w?.closest=="function"?w.closest('[draggable="true"][data-bead-id]'):null,W=I?I.closest("[data-drag-kind]"):null;if(!W)return;let ye=W.getAttribute("data-bead-id")||"",we=W.getAttribute("data-drag-kind")||"",he=W.getAttribute("data-root-dir")||"";if(!ye||!we||!he)return;let et=W.getAttribute("data-queue-index")||"",Ie=Number(et),T=W.getAttribute("data-lane-id")||"";de={kind:we,bead_id:ye,root_dir:he,...et!==""&&Number.isFinite(Ie)?{queue_index:Ie}:{},...T?{lane_id:T}:{}},k=!0,V=null,L.classList.add("is-dragging");try{v.dataTransfer?.setData("text/plain",ye),v.dataTransfer&&(v.dataTransfer.effectAllowed="move")}catch{}}function De(v){let w=ke(v);w&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"),w.zone.classList.add("is-drop-over"))}function Rt(v){let w=v.target;typeof w?.closest=="function"&&w.closest("[data-drop]")?.classList.remove("is-drop-over")}function lt(){de=null,ve(),L.classList.remove("is-dragging"),F()}function Je(v){let w=ke(v),I=de;de=null,ve(),L.classList.remove("is-dragging"),!(!w||!I)&&(v.preventDefault(),ut(I,w.target))}function Dt(v){return{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.run_state==="running"?"running":v.run_state,worktree:v.root_dir}}function Ut(v,w){let{item:I,root_dir:W,revision:ye}=yt(w),we=I?.attempt_id||"",he=v.classList;if(he.contains("worker-dep__remove")){ft("dep-remove",w,v.dataset.blockerId||"");return}if(he.contains("mon2-rowops__up")||he.contains("mon2-rowops__down")){S(w,he.contains("mon2-rowops__up")?-1:1);return}if(he.contains("mon2-rowops__remove")){Te("worker-queue-remove",{bead_id:w},W,ye);return}if(he.contains("mon2-crow__detach")){P(w);return}if(he.contains("worker-card__place")){V=V===w?null:w,ae();return}if(he.contains("worker-card__place-cancel")){V=null,ae();return}if(he.contains("worker-card__place-lane")){let et=v.getAttribute("data-lane")||"parallel";V=null,At(w,et);return}if(he.contains("rtile__session")){B=we,we&&I&&be.open({attempt_id:we,root_dir:W,meta:Dt(I)}),ae();return}if(he.contains("rtile__pause")){N("worker-attempt-pause",{attempt_id:we},W);return}if(he.contains("rtile__resume")){xn().then(et=>{if(et!==null)return ne("worker-attempt-resume",{attempt_id:we,...et!==""?{instructions:et}:{}},W,ye)});return}if(he.contains("rtile__dismiss")){Te("worker-attempt-dismiss",{attempt_id:we},W,ye);return}if(he.contains("rtile__discard")){if(!d(cs(w,"unmerged")))return;Ae({bead_id:w,...we?{attempt_id:we}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},W,ye);return}if(he.contains("worker-mini__merge")){let et=Le(W,w);et?.mismatch&&et.continuation===null?oe(W,w,ye,et.mismatch):Te("worker-merge-queue-add",{bead_id:w},W,ye);return}if(he.contains("worker-mini__merge-cancel")){Te("worker-merge-queue-remove",{bead_id:w},W,ye);return}if(he.contains("worker-mini__discard")){let et=v.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(cs(w,et)))return;Ae({bead_id:w,...v.dataset.attemptId?{attempt_id:v.dataset.attemptId}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},W,ye);return}if(he.contains("worker-mini__revise-fix")){ne("worker-revise-fix",{bead_id:w},W,ye);return}he.contains("worker-mini__revise-approve")&&Te("worker-revise-approve",{bead_id:w},W,ye)}function Fe(v){let w=k;k=!1;let I=v.target;if(!I||typeof I.closest!="function"||I.closest("dialog")||I.closest(".mon2-drawer")||I.closest("a"))return;let W=I.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(W){v.preventDefault();let _t=I.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||W.textContent?.trim()||"";_t&&pt(_t);return}let ye=I.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(ye){v.preventDefault();let Re=ye.getAttribute("data-root-dir")||j.get(I.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||ye.getAttribute("title")||"";Xe(Re);return}let we=I.closest(".mon2-sec__toggle");if(we){v.preventDefault(),Se(we.getAttribute("data-root-dir")||"");return}let he=I.closest(".mon2-area__toggle");if(he){v.preventDefault(),C(he.getAttribute("data-area")||"parallel");return}if(I.closest(".mon2-newlane")){v.preventDefault(),Z=[...Z,{seed:null}],ae();return}if(I.closest(".mon-merge-all")){v.preventDefault(),ie();return}let et=I.closest(".mon-filter__spec");if(et){v.preventDefault(),h={...h,spec:et.getAttribute("data-spec")||"all"},Gu(h),ae();return}let Ie=I.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Ie)return;let T=Ie.getAttribute("data-bead-id")||"",le=I.closest("button");if(le){v.preventDefault(),Ut(le,T);return}T&&!w&&(v.preventDefault(),it(T,Ie.getAttribute("data-root-dir")||yt(T).root_dir))}function Ft(v){let w=v.target;if(!w||typeof w.closest!="function")return;let I=w.closest(".mon-filter__blocked");if(I){h={...h,show_blocked:I.checked},Gu(h),ae();return}let W=w.closest(".mon-candidate-sort");if(W){x=_s.some(he=>he.value===W.value)?W.value:"repo_spec",Wg(x),ae();return}let ye=w.closest(".mon-running-sort");if(ye){_=ye.value==="repo"?"repo":"started",Kg(_),ae();return}let we=w.closest(".mon-done-range");we&&(p=or(we.value)?we.value:er,Gg(p),ae())}e.addEventListener("click",Fe),e.addEventListener("change",Ft),e.addEventListener("dragstart",Me),e.addEventListener("dragover",De),e.addEventListener("dragleave",Rt),e.addEventListener("drop",Je),e.addEventListener("dragend",lt),s&&typeof s.subscribe=="function"&&(re=s.subscribe(()=>{try{te.clear(),ae()}catch{}}));function It(){_e!==null&&(clearInterval(_e),_e=null)}function zt(){E!==null&&(clearTimeout(E),E=null)}return{load(){r("load"),ae(),_e===null&&(_e=setInterval(()=>{try{ae()}catch{}},Yg))},pause(){It()},clear(){It(),zt(),re&&(re(),re=null),be.destroy(),pe?.destroy(),pe=null,e.removeEventListener("click",Fe),e.removeEventListener("change",Ft),e.removeEventListener("dragstart",Me),e.removeEventListener("dragover",De),e.removeEventListener("dragleave",Rt),e.removeEventListener("drop",Je),e.removeEventListener("dragend",lt),e.replaceChildren()}}}function rd(e,t,r){let n=St("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(_){return h=>{h.preventDefault(),n("click tab %s",_),r.gotoView(_)}}function c(){let _=t.getState();return _.view==="worker"||_.view==="monitor"?_.view:"board"}function u(){let _=c();return l`
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
    `}function p(){s&&Ke(u(),s),o&&Ke(d(),o)}return p(),a=t.subscribe(()=>p()),{destroy(){a&&(a(),a=null),s&&Ke(l``,s),o&&Ke(l``,o)}}}var nd=["bug","feature","task","epic","chore"];function sd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var od=["Critical","High","Medium","Low","Backlog"];function ad(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),d=r.querySelector("#btn-cancel"),p=r.querySelector("#btn-create"),_=r.querySelector(".new-issue__close");function h(){o.replaceChildren();let L=document.createElement("option");L.value="",L.textContent="\u2014 Select \u2014",o.appendChild(L);for(let U of nd){let b=document.createElement("option");b.value=U,b.textContent=sd(U),o.appendChild(b)}a.replaceChildren();for(let U=0;U<=4;U+=1){let b=document.createElement("option");b.value=String(U);let j=od[U]||"Medium";b.textContent=`${U} \u2013 ${j}`,a.appendChild(b)}}h();function x(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function O(L){s.disabled=L,o.disabled=L,a.disabled=L,i.disabled=L,c.disabled=L,d.disabled=L,p.disabled=L,p.textContent=L?"Creating\u2026":"Create"}function B(){u.textContent=""}function V(L){u.textContent=L}function Z(){try{let L=window.localStorage.getItem("beads-ui.new.type");L?o.value=L:o.value="";let U=window.localStorage.getItem("beads-ui.new.priority");U&&/^\d$/.test(U)?a.value=U:a.value="2"}catch{o.value="",a.value="2"}}function D(){let L=o.value||"",U=a.value||"";L.length>0&&window.localStorage.setItem("beads-ui.new.type",L),U.length>0&&window.localStorage.setItem("beads-ui.new.priority",U)}async function M(){B();let L=String(s.value||"").trim();if(L.length===0){V("Title is required"),s.focus();return}let U=Number(a.value||"2");if(!(U>=0&&U<=4)){V("Priority must be 0..4"),a.focus();return}let b=String(o.value||""),j=String(c.value||""),te={title:L};b.length>0&&(te.type=b),String(U).length>0&&(te.priority=U),j.length>0&&(te.description=j),O(!0);try{await t("create-issue",te)}catch{O(!1),V("Failed to create issue");return}D(),O(!1),x()}return r.addEventListener("cancel",L=>{L.preventDefault(),x()}),_.addEventListener("click",()=>x()),d.addEventListener("click",()=>x()),r.addEventListener("keydown",L=>{L.key==="Enter"&&(L.ctrlKey||L.metaKey)&&(L.preventDefault(),M())}),n.addEventListener("submit",L=>{L.preventDefault(),M()}),{open(){n.reset(),B(),Z();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var Xg=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Jg(e,t){return ta(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function id(e,t,r){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=Jg(n,e);return l`<button
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
  `}function ld(e,t,r){return l`
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
  `}function cd(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Xg.map(([r,n])=>l`<label class="settings-dialog__toggle">
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
  `}var eh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function ud(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(be=>me(be,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,u="",d=null;function p(){if(d)return d;let be=a.querySelector('[data-pane="execution"]');return be?(d=To(be,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:r,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Te=>t.queueStore?.set?.(Te)}),d):null}function _(){return l`
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
    `}function h(){let be=n.get();return l`
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
        ${be?l`
              ${id(be,s(),V)}
              ${ld(be,u,{onDraft:Te=>{u=Te},onAdd:Z,onRemove:D})}
              ${cd(be,M)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function x(be){let Te=n.get();if(Te)try{let Le=await r("display-policy-set",{expected_revision:Te.revision,policy:be(Te)});O(Le),Le&&Le.conflict&&Le.policy&&(Le=await r("display-policy-set",{expected_revision:Le.policy.revision,policy:be(Le.policy)}),O(Le)),Le&&Le.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function O(be){be&&be.policy&&typeof be.policy=="object"&&n.set(be.policy)}function B(be){x(be)}function V(be){let Te=n.get();if(!Te)return;let Le=!th(be,Te);B(ne=>rh(be,ne,Le))}function Z(){let be=u.trim();be.length!==0&&(u="",B(Te=>Te.hidden_prefixes.includes(be)?{hidden_prefixes:Te.hidden_prefixes}:{hidden_prefixes:[...Te.hidden_prefixes,be]}),L())}function D(be){B(Te=>({hidden_prefixes:Te.hidden_prefixes.filter(Le=>Le!==be)}))}function M(be){let Te=n.get();if(!Te)return;let Le=Te.chips[be]===!1;B(()=>({chips:{[be]:Le}}))}function L(){Ke(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${eh.map(be=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${be.id}
                  aria-selected=${String(i===be.id)}
                  aria-controls=${`settings-pane-${be.id}`}
                  @click=${()=>U(be.id)}
                >
                  <span class="settings-dialog__glyph">${be.glyph}</span>
                  ${be.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${pe}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${_()} ${h()}
          </div>
        </div>
      `,a),p()}function U(be){i=be,L()}let b=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",b),a.addEventListener("cancel",b);let j=be=>{be.target===a&&pe()};a.addEventListener("click",j);let te=null;n.subscribe&&(te=n.subscribe(()=>{c&&L()}));let re=null;t.implPresetStore?.subscribe&&(re=t.implPresetStore.subscribe(()=>{c&&d?.render()}));function _e(be="execution"){c||(c=!0,t.onOpenChange?.(!0),i=be,u="",L(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),p()?.load())}function pe(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:_e,close:pe,sessionDraft:()=>d?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",b),a.removeEventListener("cancel",b),a.removeEventListener("click",j),te&&(te(),te=null),re&&(re(),re=null),d?.destroy(),d=null,a.remove()}}}function th(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function rh(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var nh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dd="usage-meter-card",sh="usage-meter-layer",pd=600,oh=["token_expired","relogin_required"];function fd(e){return String(e).padStart(2,"0")}function ah(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function _d(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${fd(n.getHours())}:${fd(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${nh[n.getMonth()]} ${n.getDate()} ${o}`;return`${ah(r,t)} \xB7 ${i}`}function ih(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function md(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function gd(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var hd=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function yd(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function lh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:yd(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function ch(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=lh(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?yd(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function bd(e,t){return`${e}:${t}`}function vd(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function u(){Ke(l``,e),e.hidden=!0,p()}function d(){if(c===null){let ne=e.ownerDocument;c=ne.createElement("div"),c.id=sh,c.className="usage-meter__layer",ne.body.appendChild(c)}return c}function p(){c!==null&&(Ke(l``,c),c.remove(),c=null)}function _(ne){r!==ne&&(r===null&&(document.addEventListener("mousedown",x),document.addEventListener("keydown",B),window.addEventListener("resize",O)),r=ne)}function h(){r!==null&&(r=null,document.removeEventListener("mousedown",x),document.removeEventListener("keydown",B),window.removeEventListener("resize",O))}function x(ne){let oe=ne.target;oe&&(e.contains(oe)||c!==null&&c.contains(oe))||(h(),pe())}function O(){pe()}function B(ne){ne.key==="Escape"&&(h(),pe())}function V(ne){r===ne?h():_(ne),pe()}function Z(){h(),pe()}async function D(ne,oe){if(n.has(ne.key))return;let Ae=bd(ne.key,oe);n.set(ne.key,oe),a.delete(Ae),pe();let N=null;try{N=await(await fetch(ne.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:oe})})).json()}catch{N=null}if(t)return;if(n.delete(ne.key),!N||N.ok!==!0){let se=N&&typeof N.error=="string"&&N.error.length>0?N.error:"network_error";a.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${se}`}),pe();return}let ie=Array.isArray(N.warnings)?N.warnings.filter(se=>typeof se=="string"&&se.length>0):[];ie.length>0&&a.set(Ae,{kind:"warn",text:ie.join(" \xB7 ")}),pe(),await Le()}function M(ne,oe,Ae,N){let ie=gd(ne.pct),Se=`resets ${_d(ne.resetsAt,N)}${oe?` \xB7 ${Ae}`:""}`;return l`<span
      class="usage-meter__window ${md(ie)}"
      style=${`--progress: ${ie}%`}
      title=${Se}
    >
      <span class="usage-meter__label">${ne.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${ie}%</span>
    </span>`}function L(ne,oe,Ae){let N=oe.available&&typeof oe.ageSeconds=="number"&&oe.ageSeconds>pd,ie=N&&typeof oe.ageSeconds=="number"?`${Math.floor(oe.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",se=oe.accounts.filter(G=>!G.active).length,Se=`usage-meter__group${N?" usage-meter__group--stale":""}`,Ce=l`<span class="usage-meter__provider"
        >${ne.label}</span
      >
      ${oe.available?oe.windows.map(G=>M(G,N,ie,Ae)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${se>0?l`<span class="usage-meter__badge">+${se}</span>`:""}`;if(oe.accounts.length===0)return l`<span
        class=${Se}
        aria-label=${`${ne.label} usage`}
        >${Ce}</span
      >`;let C=r===ne.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${Se}`}
      aria-label=${`${ne.label} usage`}
      aria-expanded=${C?"true":"false"}
      aria-controls=${dd}
      @click=${()=>V(ne.key)}
    >
      ${Ce}
    </button>`}function U(ne,oe){return l`<span class="usage-meter" aria-label="Usage">
      ${ne.map(Ae=>L(Ae.provider,Ae.snapshot,oe))}
    </span>`}function b(ne,oe){let Ae=gd(ne.pct),N=_d(ne.resetsAt,oe);return l`<span
      class="usage-meter__account-window ${md(Ae)}"
      style=${`--progress: ${Ae}%`}
    >
      <span class="usage-meter__account-key">${ne.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ae}%</span>
      <span class="usage-meter__account-reset"
        >${N.length>0?`\u21BB ${N}`:""}</span
      >
    </span>`}function j(ne,oe){return oh.includes(oe)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ne.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function te(ne,oe,Ae){let N=oe.status==="ok",ie=typeof oe.ageSeconds=="number"&&oe.ageSeconds>pd,se=a.get(bd(ne.key,oe.number)),Se=n.get(ne.key),Ce=Se!==void 0,C=Se===oe.number,G=["usage-meter__account"];return oe.active&&G.push("usage-meter__account--active"),N||G.push("usage-meter__account--unavailable"),ie&&G.push("usage-meter__account--stale"),l`<div class=${G.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${oe.email}
          >${oe.alias===null?oe.email:oe.alias}</span
        >
        ${oe.plan===null?"":l`<span class="usage-meter__account-tag">${oe.plan}</span>`}
        ${oe.active?l`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${oe.ageSeconds===null?"":l`<span class="usage-meter__account-age"
              >${ih(oe.ageSeconds)}</span
            >`}
        ${oe.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Ce}
              @click=${()=>{D(ne,oe.number)}}
            >
              ${C?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${N?l`<div class="usage-meter__account-windows">
            ${oe.windows.map($e=>b($e,Ae))}
          </div>`:l`<div class="usage-meter__account-status">
            ${j(ne,oe.status)}
          </div>`}
      ${se===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${se.kind}"
          >
            ${se.text}
          </div>`}
    </div>`}function re(ne,oe,Ae){let N=oe.accounts.filter(ie=>ie.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ne.label} · 활성 ${N} / 전체
        ${oe.accounts.length}
      </h2>
      ${oe.accounts.map(ie=>te(ne,ie,Ae))}
    </section>`}function _e(ne,oe){return l`<div
      class="usage-meter__card"
      id=${dd}
      role="dialog"
      aria-label=${`${ne.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${re(ne.provider,ne.snapshot,oe)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function pe(){let ne=[];for(let N of hd){let ie=o.get(N.key);ie&&ne.push({provider:N,snapshot:ie})}if(ne.length===0){h(),u();return}let oe=ne.find(N=>N.provider.key===r&&N.snapshot.accounts.length>0);oe||h();let Ae=Date.now();Ke(U(ne,Ae),e),e.hidden=!1,oe?be(oe,Ae):p()}function be(ne,oe){let Ae=d(),N=e.getBoundingClientRect(),ie=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${N.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,ie-N.right)}px`),Ke(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${Z}
        ></div>
        ${_e(ne,oe)}`,Ae)}async function Te(ne){try{let oe=await fetch(ne.endpoint);return oe.ok?ch(await oe.json()):null}catch{return null}}async function Le(){i+=1;let ne=i,oe=await Promise.all(hd.map(async Ae=>({provider:Ae,snapshot:await Te(Ae)})));if(!(t||ne!==i)){for(let Ae of oe)Ae.snapshot?o.set(Ae.provider.key,Ae.snapshot):o.delete(Ae.provider.key);pe()}}return u(),Le(),s=setInterval(()=>{Le()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),h(),u()}}}function wd(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var uh="worker-ineligible";function oi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function kd(e){return oi(e).includes(uh)}var dh="worker-serial";function ai(e){return oi(e).includes(dh)}function ii(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var ph=new Set(["done","failed","orphaned","stopped","discarded"]),fh={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},_h={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},mh={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function li(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:mh[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function $d(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,u=new Map,d=!1,p=null,_=null,h=null,x=new Set,O=!1,B=0,V=null,Z=new Set;function D(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function M(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function L(){return o&&o()||""}async function U(){if(!s)return;let k=++B;O=!0,h=null,x.clear(),We();try{let E=await s("worker-parallel-analysis-targets",{root_dir:L()});if(k!==B||!Ye)return;let F=Array.isArray(E?.qualified)?E.qualified:[],ee=Array.isArray(E?.excluded)?E.excluded:[];h={qualified:F,excluded:ee};for(let ke of F)ke&&typeof ke.id=="string"&&x.add(ke.id)}catch{k===B&&Ye&&(h={qualified:[],excluded:[]},me("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{k===B&&(O=!1,Ye&&We())}}function b(k){return Array.isArray(k.runs)?k.runs:[]}function j(){let k=D(),E=new Set;for(let F of Object.values(k.attempts||{})){let ee=F;ee&&typeof ee.bead_id=="string"&&!ph.has(ee.status)&&E.add(ee.bead_id)}for(let F of Array.isArray(k.pr_wait)?k.pr_wait:[])F&&typeof F.bead_id=="string"&&E.add(F.bead_id);for(let F of Object.values(k.discard_operations||{})){let ee=F;ee&&ee.phase!=="done"&&typeof ee.bead_id=="string"&&E.add(ee.bead_id)}return E}function te(k){return k.filter(E=>re(E)===null)}function re(k){let E=D();for(let F of Array.isArray(E.serial_lanes)?E.serial_lanes:[])if(Array.isArray(F?.entries)&&F.entries.some(ee=>ee.bead_id===k))return F.id;return(Array.isArray(E.queue)?E.queue:[]).some(F=>F.bead_id===k)?"parallel":null}function _e(k,E){let F=c.get(k);return F||[...E.order]}function pe(k){if(k.length<2)return!1;let E=re(k[0]);if(!E||E==="parallel")return!1;let F=D(),ee=(Array.isArray(F.serial_lanes)?F.serial_lanes:[]).find(ve=>ve.id===E)?.entries.map(ve=>ve.bead_id);if(!Array.isArray(ee))return!1;let ke=k.map(ve=>ee.indexOf(ve));return ke.every(ve=>ve>=0)&&ke.every((ve,Me)=>Me===0||ve>ke[Me-1])}function be(){let k=D(),E=Array.isArray(k.serial_lanes)?k.serial_lanes:[],F=E.find(ee=>Array.isArray(ee.entries)&&ee.entries.length===0);return F?F.id:E[0]?.id||"s1"}function Te(k){let E=D().bead_titles||{};return typeof E[k]=="string"?E[k]:k}async function Le(k,E){if(!s||d)return null;d=!0,We();try{return await s(k,E)}finally{d=!1,We()}}async function ne(k){n?.setPending?.(!0);try{let E=await Le("worker-parallel-analysis-start",{force:k,target_ids:Array.from(x)});E&&E.applied===!1&&E.reason&&(E.reason==="target_not_qualified"&&Array.isArray(E.detail)?me(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${E.detail.join(", ")}`,"error",3200):me(`\uBD84\uC11D \uC2E4\uD328: ${E.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function oe(){let k=M().job;!s||!k||await s("worker-parallel-analysis-cancel",{job_id:k.job_id})}async function Ae(k){if(!(!s||Z.has(k))){Z.add(k),We();try{let E=await s("worker-parallel-analysis-prompt",{root_dir:L(),run_id:k});if(!Ye)return;if(E?.ok===!0&&typeof E.prompt=="string"){V={run_id:k,prompt:E.prompt};return}me(E?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{Z.delete(k),We()}}}function N(){V=null,We()}async function ie(){if(!V)return;let k=await tr(V.prompt);me(k?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",k?"success":"error",1400)}function se(k,E){a&&a(k,li(E))}function Se(){return D().runner_catalog}function Ce(k){return Object.keys(Se()?.runners?.[k]?.models||{})}function C(k){let E=Ce(k),F=Se()?.runners?.[k]?.default_model;return typeof F=="string"&&E.includes(F)?F:E[0]||""}function G(){let k=M().settings,E=p||k.runner||"claude",F=Ce(E),ee=p?C(E):k.model||F[0]||"",ke=ii(Se(),E,ee),ve=k.effort||"",Me=ke.includes(ve)?ve:ke[0]||"";return{runner:E,model:ee,effort:Me,models:F,efforts:ke}}async function $e(k){let E=M().settings,F=await Le("worker-parallel-analysis-settings-update",{expected_revision:E.revision,runner:k.runner,model:k.model,effort:k.effort});(!F||F.applied!==!0)&&(p=null,We(),F&&F.reason&&me(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${F.reason}`,"error",2800))}function Ne(k){p=k,We();let E=G();$e({runner:k,model:E.model,effort:E.effort})}function Pe(k){let E=G(),F=ii(Se(),E.runner,k);$e({runner:E.runner,model:k,effort:F.includes(E.effort)?E.effort:F[0]||""})}function He(k){let E=G();$e({runner:E.runner,model:E.model,effort:k})}async function Ze(k,E){if(!s||d)return;let F=_e(k,E),ee=M();if(F.length<2||!ee.last_good){me("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ke=u.get(k)||be(),ve=()=>({snapshot_digest:ee.last_good.identity_digest,group_index:k,lane:ke,ordered_bead_ids:F,expected_revision:D().revision});d=!0,We();try{let Me=await s("worker-parallel-analysis-submit",ve());Me&&Me.queue&&r&&r.set(Me.queue),Me&&Me.applied!==!0&&Me.conflict===!0&&(Me=await s("worker-parallel-analysis-submit",ve()),Me&&Me.queue&&r&&r.set(Me.queue)),Me&&Me.applied===!0?(c.delete(k),me(`\uC9C1\uB82C \uB808\uC778 ${ke}\uC5D0 ${F.length}\uAC1C \uBC30\uCE58`,"success")):me(`\uC81C\uCD9C \uAC70\uBD80: ${Me?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,We()}}function ot(k,E,F){c.set(k,_e(k,E).filter(ee=>ee!==F)),We()}function at(k){c.delete(k),We()}function nt(k,E,F,ee){let ke=[..._e(k,E)],ve=ke.indexOf(F),Me=ve+ee;ve<0||Me<0||Me>=ke.length||(ke.splice(Me,0,...ke.splice(ve,1)),c.set(k,ke),We())}function K(){let k=M().settings,E=Object.keys(Se()?.runners||{}),F=G();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${ee=>Ne(ee.target.value)}
        >
          ${E.map(ee=>l`<option
                value=${ee}
                ?selected=${F.runner===ee}
              >
                ${ee}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${ee=>Pe(ee.target.value)}
        >
          ${F.models.map(ee=>l`<option
                value=${ee}
                ?selected=${F.model===ee}
              >
                ${ee}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${ee=>He(ee.target.value)}
        >
          ${F.efforts.map(ee=>l`<option
                value=${ee}
                ?selected=${F.effort===ee}
              >
                ${ee}
              </option>`)}
        </select>
      </label>
      ${Y(k)}
    </div>`}function Y(k){return!Ve(k)||Ee(k)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:k.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${k.runner}/${k.model} · effort
        ${k.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:k.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function Ee(k){return k.is_default===!0&&k.compatible===!1}function Ve(k){return!!(k.runner&&k.model&&k.effort)}function ze(k){return Ve(k)&&k.compatible!==!1}function fe(k){let E=Math.max(0,Math.floor(k/1e3)),F=Math.floor(E/60),ee=E%60;return`${F}:${String(ee).padStart(2,"0")}`}function R(k){let E=k.job;if(E){let F=typeof E.started_at=="number"?E.started_at:0,ee=`${E.runner||"?"}/${E.model||"?"}`,ke=F?` \xB7 \uACBD\uACFC ${fe(Date.now()-F)}`:"",ve=typeof E.session_id=="string"?E.session_id:"",Me=b(k).find(De=>De.run_id===E.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${ee} · effort ${E.effort||"?"}${ke}</span
        >
        ${ve?l`<code class="pa-session-id" title=${ve}
              >${ve.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>se(E.job_id,Me||E)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Me?.prompt_saved!==!0||Z.has(E.job_id)}
          @click=${()=>{Ae(E.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Q()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Q(){return n?.isPending?.()===!0}function ae(k){let E=!!k.job,F=ze(k.settings),ee=h!==null&&x.size===0,ke=E||d||Q()||O;return l`<div class="pa-meta">
      ${k.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(k.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${R(k)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!F||ke||ee}
        @click=${()=>{ne(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!F||ke||ee}
        @click=${()=>{ne(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!E}
        @click=${()=>{oe()}}
      >
        취소
      </button>
    </div>`}function J(k){return typeof k=="string"&&k.length>0?k:"\uBBF8\uBC30\uCE58"}function qe(k,E){E?x.add(k):x.delete(k),We()}function Qe(k){let E=Array.isArray(k.scope)?k.scope:[],F=Array.isArray(k.overlaps)?k.overlaps:[];return E.length===0&&F.length===0?l``:l`<span class="pa-target__signals">
      ${E.length>0?l`<details class="pa-target__scope" title=${E.join(`
`)}>
            <summary>scope ${E.length}</summary>
            <ul>
              ${E.map(ee=>l`<li><code>${ee}</code></li>`)}
            </ul>
          </details>`:""}
      ${F.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${F.join(", ")}`}
            >겹침 ${F.join(", ")}</span
          >`:""}
    </span>`}function it(){let k=h?.qualified||[],E=h?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${O?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${k.length} \xB7 \uC81C\uC678 ${E.length}`}</span
        >
      </header>
      ${h&&k.length>0?l`<ul class="pa-targets__list">
            ${k.map(F=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${F.id}
                      .checked=${x.has(F.id)}
                      @change=${ee=>qe(F.id,ee.target.checked)}
                    />
                    <span class="pa-target__title">${F.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${Qe(F)}
                    <span class="pa-target__route">${F.route}</span>
                    <span class="pa-target__lane"
                      >${J(F.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:h&&k.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${h&&E.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${E.length}</summary>
            <ul class="pa-targets__list">
              ${E.map(F=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${F.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${fh[F.reason]||F.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${J(F.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function Xe(k){let E=typeof k.session_id=="string"&&k.session_id.length>0,F=E?k.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${k.outcome}"
        >${_h[k.outcome]||k.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(k.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${k.runner||"?"} / ${k.model||"?"} / ${k.effort||"?"}</span
      >
      ${E?l`<code class="pa-session-id" title=${F}
            >${F.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${k.outcome==="failure"&&k.reason?l`<span class="pa-run-row__reason">${k.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>se(k.run_id,k)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${k.prompt_saved!==!0||Z.has(k.run_id)}
          @click=${()=>{Ae(k.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function pt(k){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${k.length>0?l`<ul class="pa-runs__list">
            ${k.map(E=>Xe(E))}
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
            <button type="button" @click=${()=>{ie()}}>
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
    </div>`:""}function gt(k,E){let F=_e(k,E),ee=j(),ke=F.filter(Je=>ee.has(Je)),ve=te(F),Me=pe(F),De=Array.isArray(D().serial_lanes)?D().serial_lanes:[],Rt=u.get(k)||be(),lt=E.eligible!==!0||F.length<2||ke.length>0||ve.length>0||Me||d;return l`<section class="pa-group" data-group-index=${String(k)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${E.confidence}</span>
        ${E.categories.map(Je=>l`<span class="pa-group__category">${Je}</span>`)}
        ${Me?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${E.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${ve.length>0?l`<span class="pa-group__stale"
              >stale — ${ve.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${E.reason}</p>
      <ol class="pa-group__members">
        ${F.map((Je,Dt)=>l`<li class="pa-member" data-bead-id=${Je}>
              <span class="pa-member__seq">${Dt+1}</span>
              <span class="pa-member__title">${Te(Je)}</span>
              ${ee.has(Je)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Je}
                ?disabled=${Dt===0}
                aria-label=${`${Je} \uC704\uB85C`}
                @click=${()=>nt(k,E,Je,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Je}
                ?disabled=${Dt===F.length-1}
                aria-label=${`${Je} \uC544\uB798\uB85C`}
                @click=${()=>nt(k,E,Je,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Je}
                aria-label=${`${Je} \uC81C\uC678`}
                @click=${()=>ot(k,E,Je)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${E.evidence.map(Je=>l`<li class="pa-evidence">
              <code>${Je.path}</code>
              <span class="pa-evidence__locator">${Je.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>at(k)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Je=>{u.set(k,Je.target.value),We()}}
          >
            ${De.map((Je,Dt)=>l`<option
                  value=${Je.id}
                  ?selected=${Rt===Je.id}
                >
                  직렬 ${Dt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${lt}
          @click=${()=>{Ze(k,E)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ft(k){let E=Array.isArray(k.issues)?k.issues:[],F=E.filter(ke=>ke.verdict==="parallel_ok").length,ee=E.filter(ke=>ke.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${F}</span>
      <span>uncertain ${ee}</span>
    </div>`}function kt(){let k=Ye&&!!M().job;if(k&&_===null){_=setInterval(()=>We(),1e3);return}!k&&_!==null&&(clearInterval(_),_=null)}function We(){let k=M();p&&k.settings.runner===p&&(p=null);let E=k.last_good?.result;kt(),Ke(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${de}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${K()} ${ae(k)} ${it()}
            ${E?l`${E.groups.map((F,ee)=>gt(ee,F))}
                ${E.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ft(E)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${pt(b(k))}
          </div>
        </div>
        ${yt()}
      `,i)}let Ye=!1,Ue=()=>{Ye=!1,V=null,B+=1,kt()},ut=k=>{k.target===k.currentTarget&&de()};i.addEventListener("close",Ue),i.addEventListener("cancel",Ue),i.addEventListener("click",ut);let At=null;r&&r.subscribe&&(At=r.subscribe(()=>{Ye&&We()}));let S=null;n&&n.subscribe&&(S=n.subscribe(()=>{Ye&&We()}));function P(){Ye||(Ye=!0,We(),U(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function de(){Ye&&(Ye=!1,V=null,B+=1,kt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:P,close:de,destroy(){Ye=!1,_!==null&&(clearInterval(_),_=null),i.removeEventListener("close",Ue),i.removeEventListener("cancel",Ue),i.removeEventListener("click",ut),At&&(At(),At=null),S&&(S(),S=null),i.remove()}}}var xd=new Set(["sh","bash","zsh","dash","ksh"]),Ad=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Sd(e){let t=e.split("/");return t[t.length-1]||""}function gh(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=Sd(r[0]);if(n!=="env")return xd.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&xd.has(Sd(s))}function hh(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function bh(e){let t=[],r=0;Ad.lastIndex=0;for(let n of e.matchAll(Ad)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:hh(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function yh(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Ed(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",c=0,u=null,d=!1;function p(L,U){return U?bh(L).map(b=>b.kind==="plain"?b.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${b.kind}"
            >${b.text}</span
          >`):L}function _(){if(!s)return l``;let L=o==="ready"&&gh(a),U=o==="ready"?a.split(`
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
                  ${U.map((b,j)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${j+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(b,L)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function h(){Ke(_(),n)}async function x(){if(o!=="ready")return;let L=await tr(a);me(L?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",L?"success":"error")}function O(L){L.key==="Escape"&&s&&(L.preventDefault(),D())}function B(){d||(document.addEventListener("keydown",O),d=!0)}function V(){d&&(document.removeEventListener("keydown",O),d=!1)}async function Z(L,U=null){let b=++c;B(),s={...L},u=U||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",h(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let te=t?t():"";if(!te){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",h();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",h();return}let re="/api/repo-ops-script?workspace="+encodeURIComponent(te)+"&lane="+encodeURIComponent(L.lane)+"&base_sha="+encodeURIComponent(L.base_sha);try{let _e=await r(re),pe=await _e.json().catch(()=>({}));if(b!==c)return;if((t?t():"")!==te){D();return}if(!_e.ok||!pe||pe.ok!==!0){o="error",i=yh(pe&&typeof pe.error=="string"?pe.error:""),h();return}s={lane:pe.lane,base_sha:pe.base_sha,path:pe.path,base_ref:pe.base_ref},a=String(pe.content),o="ready",h()}catch{if(b!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",h()}}function D(){c+=1,V(),s=null,a="",h();let L=u;u=null,L?.isConnected&&L.focus()}function M(){D(),n.remove()}return{open:Z,close:D,destroy:M}}function Td(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let b=o();return typeof b.revision=="number"?b.revision:0}function i(b){t&&b&&b.queue&&typeof b.queue=="object"&&t.set(b.queue)}function c(){let b=o().workspace_info;return b&&typeof b=="object"?b:{}}function u(b,j){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${b}"
      >${j}</span
    >`}function d(b){if(typeof b!="number"||!Number.isFinite(b))return"";let j=b/6e4;return Number.isInteger(j)?`timeout ${j}\uBD84`:`timeout ${Math.round(b/1e3)}\uCD08`}function p(b){let j=d(b);return j?u("config",j):""}function _(b,j,te){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${te.script}
      @click=${re=>{s&&s({lane:b,base_sha:j.base_sha,path:te.script,base_ref:j.base_ref},re.currentTarget)}}
    ></button>`}function h(){let b=o().repo_ops_opt_out;return{verify:b?.verify===!0,deploy:b?.deploy===!0}}function x(b,j){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!j}
        @change=${te=>{Z(b,!te.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function O(b){let j=typeof b.base_sha=="string"?b.base_sha:"",te=`${b.source_path||"repo-ops/config.toml"} @ ${b.base_ref||"?"}${j?`@${j.slice(0,7)}`:""}`,re=h(),_e=!!b.verify&&re.verify,pe=!!b.deploy&&re.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${te}</span>
      </p>
      <div
        class="worker-repo-ops__lane${_e?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${b.verify?l`${_("verify",b,b.verify)}
              ${p(b.verify.timeout_ms)}
              ${_e?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${_e?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":b.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${b.verify?x("verify",re.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${pe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${b.deploy?l`${_("deploy",b,b.deploy)}
              ${p(b.deploy.timeout_ms)}
              ${pe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${pe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":b.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${b.deploy?x("deploy",re.deploy):""}
      </div>
    </section>`}function B(b){let j=b.repo_ops&&typeof b.repo_ops=="object"?b.repo_ops:null;return j&&(j.status==="resolved"||j.status==="absent")?O(j):j&&(j.status==="pending"||j.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${j.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${j.error_code?l` — <code>${j.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function V(b){if(!r)return;let j=await r("worker-auto-repair-toggle",{on:b,expected_revision:a()});if(i(j),j&&j.conflict){let te=await r("worker-auto-repair-toggle",{on:b,expected_revision:a()});i(te)}n()}async function Z(b,j){if(!r)return;let te=await r("worker-repo-ops-opt-out-toggle",{kind:b,opted_out:j,expected_revision:a()});if(i(te),te&&te.conflict){let re=await r("worker-repo-ops-opt-out-toggle",{kind:b,opted_out:j,expected_revision:a()});i(re)}n()}let D={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function M(b,j,te){return l`<div class="worker-repo-ops__policy-group" data-policy=${te}>
      <div class="worker-repo-ops__policy-label">${b}</div>
      <ul class="worker-repo-ops__policy-list">
        ${j.map(re=>l`<li data-token=${re}>
              ${D[re]||re}
            </li>`)}
      </ul>
    </div>`}function L(b){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${b.map(j=>{let te=[D[j.trigger]||j.trigger];return Number.isInteger(j.attempts_per_operation_attempt)?te.push(`operation\uB2F9 ${j.attempts_per_operation_attempt}\uD68C`):Number.isInteger(j.attempts)?te.push(`${D[j.budget]||j.budget} ${j.attempts}\uD68C`):Number.isInteger(j.sessions_per_user_action)&&te.push(`${j.sessions_per_user_action}\uD68C`,D[j.user_actions]||j.user_actions),j.applies_when&&te.push(D[j.applies_when]||j.applies_when),l`<li data-token=${j.id}>
            <strong>${D[j.id]||j.id}</strong>
            <span>${te.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function U(){let b=o(),j=b.auto_repair!==!1,te=b.repo_operation_policy&&typeof b.repo_operation_policy=="object"?b.repo_operation_policy:null,re=Array.isArray(b.repo_operations)?b.repo_operations:[],_e=re.find(Le=>Le.state==="repairing"),pe=re.filter(Le=>Le.state==="failed"||Le.state==="repairing"),be=pe.length?Math.min(...pe.map(Le=>typeof Le.repair?.remaining=="number"?Le.repair.remaining:0)):te?.auto_repair?.resolution_ladder?.find(Le=>Le.id==="auto_repair_session")?.attempts??1,Te=Array.isArray(te?.auto_repair?.resolution_ladder)?te.auto_repair.resolution_ladder:[];return l`<section
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
          .checked=${j}
          @change=${Le=>{V(Le.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${j?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${be}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${_e?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${_e.repair?.owner_bead||_e.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${te?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(te.worker_automatic||[]).length} · 해결 사다리
                ${Te.length} · 금지
                ${(te.never_automatic||[]).length}</span
              >
            </summary>
            ${M("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",te.worker_automatic||[],"worker-automatic")}
            ${te.supported===!1||te.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${te.schema_version})`}
                </div>`:L(Te)}
            ${M("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",te.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${B(c())} ${U()}
      </details>`}}}var Od=20,vh=5,wh=new Set(["failed","repairing","running","queued","retry_pending"]),Cd={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Rd={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function kh(e,t,r=Od){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function $h(e){if(e.type==="cleanup")return!0;let t=e.operation;return wh.has(t.state)&&!t.dismissed&&!t.superseded_by}function xh(e,t,r={}){let n=kh(e,t,1/0),s=r.expanded===!0?Od:vh,o=new Set(n.slice(0,s)),a=n.filter(i=>o.has(i)||$h(i));return{visible:a,hidden:n.length-a.length}}function Id(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Ah(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Ld(e){let t=e.filter(r=>r.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>l`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Md(e,t="",r=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function Sh(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Rd,n)?Rd[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Eh(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${wo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Id(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Cd,t.kind)?Cd[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${yo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${ls(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Id(e)}"
          >${Ah(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Md(bu(t.failure_kind,n)):""}
      ${Sh(t)}
      ${Ld([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${yo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Th(e){let t=e.cleanup,r=on(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${wo(e.at)||"\u2014"}</span
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
        ${Mu(t.step).map(n=>l`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Md(Ao(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Ld([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Ch(e){let t=typeof e.hidden=="number"?e.hidden:0,r=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(n=>n.type==="cleanup"?Th(n):Eh(n))}
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
  </section>`}function Pd(e,t={}){let r=null;function n(){if(r===null){Ke(l``,e);return}let a=xh(r.operations,r.cleanup_failures,{expanded:r.expanded});Ke(Ch({events:a.visible,hidden:a.hidden,expanded:r.expanded,repo:r.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&r&&(r.expanded=!r.expanded,n())});function s(a){r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&(r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:r.expanded},n())}}}var Rh=St("views:worker"),Ih="tab:worker:ready",Oh="tab:worker:blocked",Lh="tab:worker:in-progress",Mh="tab:worker:resolved",Ph="tab:worker:closed",Lo=1,Dd=5;function Nd(e){return io(e).path.length>0}var Dh=new Set(["quick_fix","spec_backed","full_plan"]);function qd(e){return typeof e=="string"&&Dh.has(e)}var Ud="beads-ui.worker.candidate-filter",ci={show_blocked:!1,spec:"all"};function Nh(){try{let e=window.localStorage.getItem(Ud);if(!e)return{...ci};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ci};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ci}}}function qh(e){try{window.localStorage.setItem(Ud,JSON.stringify(e))}catch{}}function Fh(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=r(i),u=n(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var jh=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Wd="bdui.worker.candidate_sort",Bh=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Mo="spec";function Uh(){try{let e=window.localStorage.getItem(Wd);return e==="board"||e==="created"||e==="spec"?e:Mo}catch{return Mo}}function Wh(e){try{window.localStorage.setItem(Wd,e)}catch{}}var zd="bdui.worker.done-range";function zh(){try{let e=window.localStorage.getItem(zd);return or(e)?e:er}catch{return er}}function Hh(e){try{window.localStorage.setItem(zd,e)}catch{}}var Gh="(max-width: 640px)",Hd="beads-ui.worker.lane-collapsed",ms={queue:!0,done:!0};function Vh(){try{let e=window.localStorage.getItem(Hd);if(!e)return{...ms};let t=JSON.parse(e);return!t||typeof t!="object"?{...ms}:{queue:typeof t.queue=="boolean"?t.queue:ms.queue,done:typeof t.done=="boolean"?t.done:ms.done}}catch{return{...ms}}}function Kh(e){try{window.localStorage.setItem(Hd,JSON.stringify(e))}catch{}}function Fd(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Yh(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Zr):(n.sort(Ms(r)),t==="board"?n:[...n.filter(Nd),...n.filter(s=>!Nd(s))])}function Zh(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Qh(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function jd(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Xh(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Jh(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function eb(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function tb(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function rb(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function ui(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function nb(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Bd(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function sb(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.merge_step)return e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return r(e.conflict_badge,{live:e.conflict_live===!0});if(e.head_review&&e.head_review.state!=="failed")return r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return r(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Bd(e.receipt_check).length>0)return r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Bd(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let n=Xh(e.head_review.failure_reason);return r(`\uB9AC\uBDF0 \uC2E4\uD328: ${n.label}`,{title:e.head_review.failure_reason?`${n.action} (${e.head_review.failure_reason})`:n.action,alert:!0})}return e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${jd(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${jd(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function ob(e,t,r,n,s=null,o=null,a=null,i=!1,c=null,u=!0,d=null,p=null,_=null,h={},x=!1,O=!1,B={}){let V=!!c&&c.position>0,Z=!!c?.continuation_action&&c.continuation_action.continuation===null,D=!!c&&c.active===!0,M=c&&c.failure||null,L=eb(c?c.waiting:null,_),U=r[e]||null,b=U&&U.gate?U.gate:null,j=U&&U.pr?U.pr:null,te=nb(_),re=tb(c?c.resolution:null),_e=rb(c?c.head_review:null),pe=c&&c.head_review||null,be=c&&c.authority||null,Te=!!pe&&["pending","reviewing","revising"].includes(pe.state),Le=V&&!D&&(pe?.state==="failed"||!be||be.source==="automatic"&&!O),ne=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":re?re.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":L,oe=!!b&&b.base_badge==="\uCDA9\uB3CC",Ae=!!b&&b.enabled===!0,N=fs({bead_id:e,merge_sha:B.merge_sha,cleanup_cursor:B.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:B.repo_operations}),ie=Oo(N),se=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!b&&b.tier==="merged",Se=i&&!!n&&!!b&&b.tier==="merged",Ce=Le&&(Ae||oe||b?.reason==="base_behind"||b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"||se||Se),C=i&&oe&&u===!1,G=vr(h,e,{external:i,merge_active:D||N?.step==="merge",merge_queued:V,conflict_active:!!a,cleanup_active:ie,merged:!!n||b?.tier==="merged"}),$e=!!G.operation,Ne=!se&&!!n&&n.step==="repo_operations",Pe=sb({continuation_required:Z,merge_step:N,conflict_badge:ne,conflict_live:re?.live===!0||a==="running",head_review:pe&&_e?{..._e,state:pe.state,failure_reason:pe.failure_reason}:null,recovery:te,cleanup_failed:n,cleanup_label:n?on(n.step):null,base_exception:p,conflicting:oe,gate:b,receipt_check:U&&U.receipt_check?U.receipt_check:null,queue_failure:M,auto_skip:d,queued:V,queue_active:D,queue_position:c?c.position:0,activity:ne?null:o&&o.activity||null}),He=Pe?.live===!0&&Pe.title?l`<span title=${Pe.title}>${Pe.label}</span>`:Pe?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:n&&N?.active!==!0?Io(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:x,external:i,pr_number:j&&typeof j.number=="number"?j.number:null,pr_url:j&&typeof j.url=="string"?j.url:"",completion_badge:Pe?.live!==!0&&Pe?.title?Pe.label:null,completion_title:Pe?.title||"",completion_repair_pr_url:te?te.repair_pr_url:"",completion_repair_pr_number:te?te.repair_pr_number:null,badges:He?[He]:[],live_badge:Pe?.live===!0?He:null,usage:s,alert:Pe?.alert===!0,merge_action:b?.tier==="merged"&&!se&&!Se||Ne?!1:!V||Z||Le,timeline_action:Ne,cancel_action:V&&!Z,cancel_enabled:(!D||Te)&&!(te&&te.lock_actions),cancel_title:te&&te.lock_actions?`${te.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:D&&!Te?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Te?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:G,discard_action:G.action,merge_step:N,discard_enabled:G.enabled,discard_title:G.title,merge_enabled:!N&&!a&&!$e&&!p&&!(te&&te.lock_actions)&&!C&&!Ne&&(Ae||oe||b?.reason==="base_behind"||b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"||se||Se||Ce),merge_label:Z?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":se||Se?"\uC815\uB9AC \uC7AC\uAC1C":oe&&!N&&!se?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":b?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Le?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:$e?G.error?`\uD3D0\uAE30 \uC2E4\uD328: ${G.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${G.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Z?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":N?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${N.label}`:Se?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":C?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":se?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":oe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ae?`\uBA38\uC9C0 (${b.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:b&&b.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${b&&b.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function di(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,doneRange:d,onDoneRangeChange:p}=t,_=n?Ds(n,i):null,h=js({transport:r,uiOrderStore:i}),x=null,O=[],B=Nh(),V=null,Z=Uh(),D=or(d)?d:zh(),M=new Map;function L(){let f=Ir.find($=>$.value===D);return f?f.label:"\uC624\uB298"}let U=Vh(),b=!1,j=new Set,te=new Set,re=new Set,_e=new Set,pe=new Set,be={},Te=null,Le=0,ne=null,oe=[];function Ae(f){return Te===f?be:{}}async function N(){if(!r)return;let f=u?.()||"";if(Te===f||ne&&ne.key===f&&ne.generation===Le)return;let $=++Le;ne={key:f,generation:$};let H=null;try{H=await Promise.resolve(r("get-session-defaults",{}))}catch(m){if($!==Le)return;ne=null,Rh("get-session-defaults failed: %o",m),Fe();return}$===Le&&(be=H&&typeof H.values=="object"&&H.values!==null?{...H.values}:{},Te=f,ne=null,Fe())}function ie(){Te=null,Le+=1,N()}let se=document.createElement("div");se.className="worker-console";let Se=document.createElement("div");Se.className="worker-top";let Ce=document.createElement("div");Ce.className="worker-drawer-overlay",Ce.hidden=!0;let C=document.createElement("div");C.className="worker-drawer-overlay__backdrop";let G=document.createElement("div");G.className="worker-drawer-host";let $e=document.createElement("div");$e.className="worker-drawer-host",$e.hidden=!0,Ce.append(C,G,$e);let Ne=document.createElement("div");Ne.className="worker-lanes-host",se.append(Se,Ce,Ne),e.appendChild(se);let Pe=null,He=null,Ze=Tn(G,{transport:r,sessionLogStore:a,onClose:()=>{Pe=null,He=null,Ce.hidden=!0,Fe()}}),ot=Pd($e,{onClose:()=>{$e.hidden=!0,Ce.hidden=!0,Fe()}}),at=Ed({getWorkspacePath:u||(()=>"")}),nt=u&&u()||"",K=Td({queueStore:s,transport:r,onChanged:()=>Fe(),onOpenScript:(f,$)=>{at.open(f,$)}}),Y=o?$d(se,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:u,onOpenTranscript:(f,$)=>Mt(f,$)}):null;function Ee(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Lo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Ve(){let f=Ee(),$=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,H=Array.isArray(f.serial_lanes)?f.serial_lanes:[],m=[];for(let ue of H){if(m.length>=$)break;!ue||typeof ue.id!="string"||!/^s[1-5]$/.test(ue.id)||!Array.isArray(ue.entries)||m.push({id:ue.id,label:`\uC9C1\uB82C ${ue.id.slice(1)}`,count:ue.entries.length})}return m.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},...m]}function ze(f){if(!V||!f.some(H=>H.id===V))return null;let $=Ve();return $?{bead_id:V,lanes:$}:null}function fe(){let f=Ee();return typeof f.revision=="number"?f.revision:0}function R(f){f&&f.queue&&s&&s.set(f.queue)}function Q(){let f=Ee().queue;return Array.isArray(f)?f.length:0}async function ae(f,$,H){if(!r)return;let m=()=>({bead_id:f,...$==="parallel"?{}:{lane:$},...H===void 0?{}:{index:H},expected_revision:fe()}),y=await r("worker-queue-place",m());R(y),y&&y.conflict&&await r("worker-queue-place",m()).then(R)}async function J(f,$,H){if(!r)return;let m=()=>({bead_id:f,...$==="parallel"?{}:{lane:$},to_index:H,expected_revision:fe()}),y=await r("worker-queue-reorder",m());R(y),y&&y.conflict&&await r("worker-queue-reorder",m()).then(R)}async function qe(f){if(!r)return;let $=await r("worker-queue-remove",{bead_id:f,expected_revision:fe()});R($),$&&$.conflict&&await r("worker-queue-remove",{bead_id:f,expected_revision:fe()}).then(R)}async function Qe(f){if(!r||!f)return;let $=await r("worker-attempt-pause",{attempt_id:f});$&&$.paused===!1&&$.reason&&me(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${$.reason}`,"error",2400)}async function it(f){if(!r||!f)return;let $=await xn();if($===null)return;let H=async(y={})=>await r("worker-attempt-resume",{attempt_id:f,expected_revision:fe(),...$!==""?{instructions:$}:{},...y}),m=await H();R(m),m&&m.conflict&&(m=await H(),R(m)),m=await kr(m,(y,ue)=>H({continuation:y,decision_token:ue}),{onResult:R,refresh:()=>H()}),m&&m.resumed===!1&&!m.conflict&&m.reason&&me(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Xe(f){if(!r||!f)return;let $=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:fe()});R($),$&&$.conflict&&($=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:fe()}),R($)),$&&$.dismissed===!1&&!$.conflict&&$.reason&&me(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${$.reason}`,"error",2400)}async function pt(f,$,H=!0){if(!r)return null;let m=r,y=await m(f,{...$,expected_revision:fe()});return R(y),y&&y.conflict&&H&&(y=await m(f,{...$,expected_revision:fe()}),R(y)),y}async function yt(f){if(!r||!f)return;let $=Ee().merge_queue?.find(m=>m.bead_id===f)?.continuation_action;if($?.mismatch&&$.continuation===null){await ft(f,$.mismatch);return}j.add(f),Fe();let H;try{H=await pt("worker-merge-queue-add",{bead_id:f})}finally{j.delete(f),Fe()}if(!(!H||H.applied)){if(H.conflict){me("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}me(Jh(H.reason),"error",2400)}}async function gt(f){if(!(!r||!f||te.has(f))){te.add(f),Fe();try{let $=await r("worker-cleanup-retry",{bead_id:f,expected_revision:fe()});R($),$&&!$.retried&&!$.conflict&&$.reason&&me(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${$.reason}`,"error",2400)}finally{te.delete(f),Fe()}}}async function ft(f,$){let H=await kr({continuation_mismatch:$},(y,ue)=>pt("worker-merge-queue-add",{bead_id:f,continuation:y,decision_token:ue},!1)),m=H?.queue?.merge_queue?.find(y=>y.bead_id===f)?.continuation_action;if(H?.applied!==!0&&m?.continuation===null&&m.mismatch){await ft(f,m.mismatch);return}H&&H.applied===!1&&!H.conflict&&me("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function kt(f){if(!r)return;let $=await pt("worker-merge-auto-toggle",{on:f});!$||$.conflict||me(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function We(f){if(!r||!f)return;let $=await pt("worker-merge-queue-remove",{bead_id:f});$&&!$.conflict&&!$.applied&&$.reason==="merge_active"&&me("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ye(){await pt("worker-merge-queue-remove",{all:!0})}async function Ue(f,$=null,H="unmerged",m=null){if(!r||!f)return;let y=cs(f,H);if(!(!!m||typeof globalThis.confirm!="function"||globalThis.confirm(y)))return;let ce=await r("worker-discard",{bead_id:f,...$?{attempt_id:$}:{},...m?{operation_id:m}:{},expected_revision:fe()});if(R(ce),ce&&ce.conflict&&(ce=await r("worker-discard",{bead_id:f,...$?{attempt_id:$}:{},...m?{operation_id:m}:{},expected_revision:fe()}),R(ce)),ce&&ce.discarded===!0){me(ko(ce),"success",5e3);return}if(ce&&ce.reason){me(`\uD3D0\uAE30 \uC2E4\uD328: ${ce.reason}`,"error",2800);return}if(ce&&ce.accepted&&ce.pending==="merged_revert"){me("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ce&&ce.accepted&&!ce.discarded){me(`\uD3D0\uAE30 \uC9C4\uD589: ${ce.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ce&&!ce.conflict&&me("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ut(f,$,H){if(!(!r||!$||!H||_e.has($))){_e.add($),Fe();try{let m=await r(f,{bead_id:$,action_id:H,expected_revision:fe()});R(m),m?.conflict?me("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!m?.ok&&m?.reason&&me(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(m.reason)}`,"error",2800)}finally{_e.delete($),Fe()}}}async function At(f,$){if(!r||!$||re.has($))return;re.add($),Fe();let H;try{let m=async(y={})=>await r(f,{bead_id:$,expected_revision:fe(),...y});H=await m(),R(H),H&&H.conflict&&(H=await r(f,{bead_id:$,expected_revision:fe()}),R(H)),f==="worker-revise-fix"&&(H=await kr(H,(y,ue)=>m({continuation:y,decision_token:ue}),{onResult:R,refresh:()=>m()}))}finally{re.delete($),Fe()}if(!(!H||H.conflict)){if(H.ok){me(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}me(`\uCC98\uBD84 \uAC70\uBD80: ${H.reason||""}`,"error",3e3)}}async function S(f){if(!r)return;let $=await r("worker-automation-toggle",{on:f,expected_revision:fe()});R($),$&&$.conflict&&await r("worker-automation-toggle",{on:f,expected_revision:fe()}).then(R)}async function P(f){if(!r||!f)return;let $=await r("worker-repo-operation-repair",{operation_id:f});if(R($),$&&$.ok===!1){me(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${$.reason||""}`,"error",3e3);return}$&&$.ok===!0&&me("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function de(f){if(!r||!f)return;let $=await r("worker-repo-operation-dismiss",{operation_id:f});R($),$&&$.ok===!1&&me(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${$.reason||""}`,"error",3e3)}async function k(f){if(!r||!Number.isFinite(f))return;let $=Math.max(Lo,Math.floor(f)),H=await r("worker-queue-set-slots",{slots:$,expected_revision:fe()});R(H),H&&H.conflict&&await r("worker-queue-set-slots",{slots:$,expected_revision:fe()}).then(R)}async function E(f){if(!r||!Number.isInteger(f)||f<1||f>Dd)return;let $=Ee(),H=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).slice(f).reduce((ue,ce)=>ue+(Array.isArray(ce?.entries)?ce.entries.length:0),0),m=()=>({count:f,expected_revision:fe()}),y=await r("worker-queue-set-serial-lane-count",m());R(y),y&&y.conflict&&(y=await r("worker-queue-set-serial-lane-count",m()),R(y)),y&&y.applied&&H>0&&me(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${H}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function F(){let f=Ee(),$=_?_.selectBoardColumn(Ih,"ready"):[],H=_?_.selectBoardColumn(Oh,"blocked"):[],m=_?_.selectBoardColumn(Ph,"closed"):[],y=_?_.selectBoardColumn(Lh,"in_progress"):[],ue=_?_.selectBoardColumn(Mh,"resolved"):[],ce=qs([...$,...H,...y,...ue,...m]),je=new Map;for(let g of[...$,...H,...y])g&&g.id&&!je.has(g.id)&&je.set(g.id,g);let xe={...Ae(u?.()||"")};for(let g of["orchestration_model","orchestration_effort","orchestration_speed"]){let z=f[g];typeof z=="string"&&(xe[g]=z)}function A(g,z){let ge=je.get(g);if(!ge)return null;let Ge=ge.metadata&&typeof ge.metadata=="object"?ge.metadata:{},mt=ge.workflow?.route,jt=Ge.route,Nt=qd(mt)?mt:qd(jt)?jt:null;return Qt({pin:Ge,global:xe,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:Nt,controller_runtime:z})}function X(g){let z=g.runner||null,ge=A(g.bead_id,z),Ge=So(g),mt=ge?qr(ge,z):null;return Ge||mt?{orchestration:Ge,worker:mt}:null}let q=new Map;function Oe(g){if(q.has(g))return q.get(g)??null;let z=A(g,null),ge=null;if(z){let Ge=gr(f.runner_catalog??null,z.orchestration_model.value??""),mt=Ge===null?z:A(g,Ge),jt=sn(mt,f.runner_catalog??null),Nt=qr(mt,Ge);ge=jt||Nt?{orchestration:jt,worker:Nt}:null}return q.set(g,ge),ge}function dt(g){let z=Fs(ce,g);return z.total===0?null:z}let st=f.bead_titles||{},tt=new Map;for(let[g,z]of Object.entries(st))typeof z=="string"&&z.length>0&&tt.set(g,z);for(let g of[...$,...H])tt.set(g.id,g.title||g.id);let rt=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},Ot=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},Jt=new Map;for(let[g,z]of Object.entries(Ot))Array.isArray(z)&&Jt.set(g,ai(z));for(let g of[...$,...H]){let z=g.labels;Array.isArray(z)&&!Jt.has(g.id)&&Jt.set(g.id,ai(z))}let an=new Map,ln=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(ln)?ln:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let z=g.members.map(Ge=>{let mt=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(jt=>jt.entries.some(Nt=>Nt.bead_id===Ge));return mt?mt.id:null});if(!(z.every(Ge=>Ge!==null)&&new Set(z).size===1))for(let Ge of g.members)an.set(Ge,g.members.filter(mt=>mt!==Ge))}let gs=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},cn=new Map;for(let[g,z]of Object.entries(rt))z&&typeof z=="object"&&cn.set(g,z);for(let g of[...$,...H])cn.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let Br=g=>cn.get(g)||{},Ur=f.pr_wait||[],un=f.pr_observations||{},hs=f.pr_activity||{},Be=f.cleanup_failed||{},Tt=Object.entries(Be).map(([g,z])=>({bead_id:g,step:z&&z.step?z.step:"",reason:z&&z.reason?z.reason:"",at:z&&typeof z.at=="number"?z.at:null,detail:z&&typeof z.detail=="string"?z.detail:null,output_tail:z&&typeof z.output_tail=="string"&&z.output_tail?z.output_tail:void 0,log_path:z&&typeof z.log_path=="string"&&z.log_path?z.log_path:void 0,retry_count:z&&typeof z.retry_count=="number"&&Number.isInteger(z.retry_count)&&z.retry_count>0?z.retry_count:0,failure_code:z&&typeof z.failure_code=="string"?z.failure_code:void 0,subject_id:z&&typeof z.subject_id=="string"?z.subject_id:void 0,repair_eligible:!!(z&&z.repair_eligible),repair:z&&z.repair?z.repair:void 0})),dn=f.queue||[],sp=new Set([...dn.map(g=>g.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(z=>z.bead_id)),...Ur.map(g=>g.bead_id),...f.done.map(g=>g.bead_id)]),op=new Set(H.map(g=>g.id)),ap=i?i.get()?.order||{}:{},mi=new Set,gi=[];for(let g of[...$,...H])sp.has(g.id)||mi.has(g.id)||Zh(g)||(mi.add(g.id),gi.push(g));O=Yh(gi,Z,ap);let ip=f.admission||{},hi=g=>{let z=ip[g];if(!z)return"";if(z.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ge=typeof z.reason=="string"?z.reason:"",Ge=ge.indexOf(":");return Ge>0&&Ge<ge.length-1?`\u26D4 ${ge.slice(0,Ge)} (${ge.slice(Ge+1)})`:`\u26D4 ${ge}`},lp=O.map(g=>{let z=io(g),ge=z.path.length>0,Ge=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",mt=!Object.hasOwn(g,"description")||typeof g.description=="string"&&g.description.trim().length>0,jt=Object.hasOwn(g,"labels")&&kd(g.labels),Nt=!jt&&(Ge?mt:ge&&!z.conflict),$t=op.has(g.id),dr=[];$t&&dr.push(Qh(g)),Ge&&!mt?dr.push("missing_description"):!Ge&&z.conflict?dr.push("spec_id_conflict"):!Ge&&!ge&&dr.push("spec \uC5C6\uC74C");let As=hi(g.id);return As&&dr.push(As),{id:g.id,title:g.title||g.id,reason:dr.join(" \xB7 "),draggable:Nt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Ge,status:g.status,worker_ineligible:jt,blocked:$t,has_spec:ge,exec_chips:Oe(g.id)}}),Po=Fh(lp,B),cp=Po.visible,up=f.revise_parked||{},bs=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Do=(g,z)=>g.map((ge,Ge)=>{let mt=z!=="done",jt=z!=="done"&&z!=="queue",Nt=mt?up[ge.bead_id]:null,$t=mt?vr(bs,ge.bead_id):null,dr=$t?.operation?$t:null,As=mt&&Jt.get(ge.bead_id)===!0,Bi=gs[ge.bead_id]||[],Bo=f.admission&&typeof f.admission=="object"?f.admission[ge.bead_id]:null,Uo=mt?_u(Bo,!!dr||_e.has(ge.bead_id)):null,$p=mt&&!Uo?hi(ge.bead_id):null,xp=mt?[$p]:[],Ui=mt&&Bi.length>0&&typeof Bo?.reason=="string"&&Bo.reason.startsWith("not_ready")?[`\u23F8 ${Bi.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Wo=mt?an.get(ge.bead_id):void 0;return Wo&&Wo.length>0&&Ui.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Wo.join(", ")}\uC640`),{id:ge.bead_id,title:tt.get(ge.bead_id)||ge.bead_id,reason:xp.filter(Boolean).join(" \xB7 "),draggable:mt&&!dr&&!Uo,done:z==="done",lane:z,seq:jt?Ge+1:void 0,worker_serial:As,discard:dr,stale_work:Uo,badges:[...Ui,...Nt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Nt,revise_action:!!Nt,revise_enabled:!!Nt&&!dr&&!re.has(ge.bead_id),revise_title:Nt?Nt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Nt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:z==="done"?ir(f.attempts||{},ge.bead_id):null,work_ms:z==="done"?vo(f.attempts||{},ge.bead_id):null,done_at:z==="done"&&typeof ge.added_at=="number"?ge.added_at:void 0,exec_chips:mt?Oe(ge.bead_id):null,...Br(ge.bead_id)}}),pn=f.attempts?Object.values(f.attempts):[],No=new Set;for(let g of pn)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&No.add(g.resumed_from);let bi=new Map;for(let g of pn)bi.set(g.bead_id,g.attempt_id);let ys=new Map;for(let g of pn)ys.set(g.attempt_id,g);function qo(g){let z=new Set,ge=g;for(;ge&&!z.has(ge.attempt_id);){if(ge.conflict_resolution===!0)return!0;z.add(ge.attempt_id),ge=typeof ge.resumed_from=="string"&&ge.resumed_from.length>0&&ys.get(ge.resumed_from)||null}return!1}let vs=typeof f.declared_base=="string"?f.declared_base:null;function dp(g){let z=null;for(let ge of pn)!ge||ge.bead_id!==g||qo(ge)||(z===null||(typeof ge.started_at=="number"?ge.started_at:0)>=(typeof z.started_at=="number"?z.started_at:0))&&(z=ge);return z&&typeof z.target_base=="string"?z.target_base:null}let yi=[],vi=[],pp=wd(f),wi=g=>{let z=typeof g.session_id=="string"&&g.session_id.length>0,ge=No.has(g.attempt_id);return{eligible:z&&!ge,reason:z?ge?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},ur=null;for(let g of pn){let z=g.status==="paused"&&!No.has(g.attempt_id);if(g.status==="running"||z)vi.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:tt.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:z,conflict_resolution:qo(g),base_exception:ui(vs,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:vr(bs,g.bead_id,{attempt_id:g.attempt_id}),usage:ir(f.attempts||{},g.bead_id),rollup:dt(g.bead_id),rollup_expanded:pe.has(g.bead_id),exec_chips:X(g),...Br(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&pp(g)){let ge=wi(g);yi.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:tt.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:vr(bs,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ge.eligible,resume_reason:ge.reason,conflict_resolution:qo(g),base_exception:ui(vs,g.target_base),usage:ir(f.attempts||{},g.bead_id),rollup:dt(g.bead_id),rollup_expanded:pe.has(g.bead_id),exec_chips:X(g),...Br(g.bead_id)}),ur=g}}let ws=[...yi,...vi].map(g=>{let z=ys.get(g.attempt_id),ge=z?.quickfix_landing;if(z?.quickfix_lane!==!0||!ge||typeof ge!="object")return g;let Ge=typeof ge.reason=="string"&&ge.reason.length>0?ge.reason:null,mt=fs({bead_id:z.bead_id,merge_sha:ge.head_sha,cleanup_cursor:ge.cursor,cleanup_failed:Ge?{step:ge.cursor,reason:Ge}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return mt?{...g,landing:mt}:g}),ki=null;if(ur){let g=wi(ur),z=ur.cause_detail;ki={bead_id:ur.bead_id,repo:ur.repo||"",reason:ur.cause||ur.status,cause_detail:z&&typeof z.reason=="string"?{reason:z.reason,command:typeof z.command=="string"?z.command:null}:null,resume_attempt_id:ur.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:vr(bs,ur.bead_id,{attempt_id:ur.attempt_id})}}let $i=new Set(ws.map(g=>g.bead_id)),Fo=Array.isArray(f.merge_queue)?f.merge_queue:[],xi=new Map,Ai=new Map,Si=new Map,Ei=new Map,Ti=new Map;Fo.forEach((g,z)=>{g&&typeof g.bead_id=="string"&&(xi.set(g.bead_id,z+1),Ai.set(g.bead_id,g.resolution),Si.set(g.bead_id,g.continuation_action||null),Ei.set(g.bead_id,g.head_review||null),Ti.set(g.bead_id,g.authority||null))});let fn=f.merge_queue_state||{active:null,failures:{}},fp=fn.failures||{},Ci=fn.waiting&&typeof fn.waiting.bead_id=="string"&&typeof fn.waiting.reason=="string"?fn.waiting:null,_p=f.auto_merge_skips||{},Ri=g=>{let z=_p[g];if(!z)return null;let ge=un[g],Ge=ge&&ge.pr?ge.pr.head_sha:null;return Ge&&Ge===z.head_sha?z.reason||"":null},ks=new Map;for(let g of ws)g.failed!==!0&&g.conflict_resolution&&(g.paused?ks.has(g.bead_id)||ks.set(g.bead_id,"paused"):ks.set(g.bead_id,"running"));let Ii=ws.filter(g=>!g.paused&&g.failed!==!0).length,Oi=(f.workspace_info||{}).slots,Li=typeof Oi=="number"?Oi:typeof f.slots=="number"?f.slots:Lo,mp=Ii>Li,$s=Kr(D),gp=(Array.isArray(f.done)?f.done.slice():[]).filter(g=>$s===void 0||typeof g.added_at!="number"||g.added_at>=$s).sort((g,z)=>(z.added_at||0)-(g.added_at||0)),Mn=Do(gp,"done"),hp=new Set((Array.isArray(f.done)?f.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Mi=[],bp=u?.()||"";for(let g of m){let z=Qr(g.closed_at);if(typeof g.id!="string"||hp.has(g.id)||z===null||$s!==void 0&&z<$s||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ge=`${bp}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Ge=M.get(ge);Ge===void 0&&r&&(M.set(ge,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(mt=>{let jt=Array.isArray(mt)&&mt.some(Nt=>lo(typeof Nt?.text=="string"?Nt.text:"")?.lane==="session");M.set(ge,jt?"session":"not-session"),Fe()}).catch(()=>{M.set(ge,"failed"),Fe()})),Ge==="session"&&Mi.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:z,created_at:g.created_at,updated_at:g.updated_at})}Mn.push(...Mi),Mn.sort((g,z)=>(z.done_at||0)-(g.done_at||0));let xs={};for(let g of $r)xs[g]=0;let Pi=!1,Di=0,jo=0,Ni=0;for(let g of Mn){let z=g.usage;if(z&&typeof z=="object"){let ge=!1;for(let Ge of $r)Number.isFinite(z[Ge])&&(xs[Ge]+=z[Ge],Pi=!0,ge=!0);ge&&(jo+=1,Number.isFinite(z.total_cost_usd)&&(Di+=z.total_cost_usd,Ni+=1))}}jo>0&&Ni===jo&&(xs.total_cost_usd=Di);let qi=Mn.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),yp=qi.length>0?Wt(Vs(qi)):Pi?xr(xs):null,vp=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},wp=Array.isArray(f.serial_lanes)?f.serial_lanes:[],Fi=g=>{if(Ur.some(Ge=>Ge.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let z=pn.filter(Ge=>Ge&&Ge.bead_id===g),ge=z.length>0?z[z.length-1].status:null;return ge==="failed"||ge==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ge==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ji=wp.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,z)=>{let ge=vp[g.id]||{},Ge=new Map((Array.isArray(ge.corrections)?ge.corrections:[]).filter($t=>$t&&typeof $t.bead_id=="string"&&typeof $t.after=="string").map($t=>[$t.bead_id,$t.after])),mt=Do(g.entries.filter($t=>!$i.has($t.bead_id)),g.id).map($t=>Ge.has($t.id)?{...$t,badges:[`\u{1F517} ${Ge.get($t.id)} \uB4A4 (blocks \uC790\uB3D9)`,...$t.badges]}:$t),jt=Array.isArray(ge.occupied_by)?ge.occupied_by.filter($t=>typeof $t=="string"):[],Nt=jt.map($t=>({id:$t,title:tt.get($t)||$t,draggable:!1,lane:g.id,ghost:!0,badges:[Fi($t)]}));return{id:g.id,index:z+1,rows:[...Nt,...mt],occupied:jt.length>0,badge:jt.length>0?Fi(jt[0]):"\uB300\uAE30",cycle:ge.cycle===!0}}),kp=typeof f.serial_lane_count=="number"?f.serial_lane_count:ji.length;return{queue:f,idToTitle:tt,candidates:cp,candidate_hidden:{blocked:Po.hidden_blocked,spec:Po.hidden_spec},running:ws,live_count:Ii,slots:Li,over_cap:mp,failure:ki,waiting:Do(dn.filter(g=>!$i.has(g.bead_id)),"queue"),serial_lanes:ji,serial_lane_count:kp,pr_wait:Ur.map(g=>ob(g.bead_id,tt.get(g.bead_id)||g.bead_id,un,Be[g.bead_id]||null,ir(f.attempts||{},g.bead_id),hs[g.bead_id]||(j.has(g.bead_id)||te.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),ks.get(g.bead_id)||null,g.external===!0,{position:xi.get(g.bead_id)||0,active:fn.active===g.bead_id,failure:fp[g.bead_id]||null,waiting:Ci?.bead_id===g.bead_id?Ci.reason:null,resolution:Ai.get(g.bead_id),continuation_action:Si.get(g.bead_id),head_review:Ei.get(g.bead_id)||null,authority:Ti.get(g.bead_id)||null},g.wt_present!==!1,f.auto_merge===!0?Ri(g.bead_id):null,ui(vs,dp(g.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[g.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},ys.get(bi.get(g.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]})).map(g=>({...g,...Br(g.id)})),merge_queue_length:Fo.length,merge_queue_running:Fo.length>0,auto_excluded:Ur.map(g=>g.bead_id).filter(g=>Ri(g)!==null),declared_base:vs,done:Mn,token_total:yp,cleanup_failures:Tt,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function ee(){let $=!!o?.get()?.job,H=!$&&o?.isPending?.()===!0,m=$?"\uBD84\uC11D \uC911":H?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${m?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${m?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${m?l`<span class="worker-analysis-btn__badge">${m}</span>`:""}
    </button>`}function ke(f){let $=f.waiting.length>0?f.waiting[0].id:"\u2014",H=l`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,m=Je(f),y=f.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ue=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${L()} 완료 <b>${f.done.length}</b></span
      >`,ce=l`<span
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
          ${Array.from({length:Dd},(X,q)=>q+1).map(X=>l`<option
                value=${String(X)}
                ?selected=${f.serial_lane_count===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      ${o?ee():""} `,xe=vu({failure:f.failure}),A=fu(f.repo_operations,f.cleanup_failures);return b?l`<div class="worker-ribbon">
          ${H} ${m}
          <div class="worker-kpi worker-kpi--ribbon">${y}${ue}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${je}</div>
          <div class="worker-kpi">${ce}</div>
        </div>
        ${A}${K.template()}${xe}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${H}${m}${je}</div>
        <div class="worker-kpi">
          ${y}${ue}${ce}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${L()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(X=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${X.tooltip}
                >${L()} 완료 · 누적 ${X.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${$}</b></span
          >
        </div>
      </div>
      ${A}${K.template()}${xe}`}function ve(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let $=f.running.some(H=>!H.paused&&H.failed!==!0);return l`<section
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
      ${f.running.length>0?Ka(f.running,Date.now(),Pe):""}
      ${f.pr_wait.map(H=>nn(H))}
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
        ${jh.map(H=>l`<button
              type="button"
              class="worker-filter__chip${B.spec===H.value?" is-active":""}"
              data-spec=${H.value}
              aria-pressed=${B.spec===H.value?"true":"false"}
            >
              ${H.label}
            </button>`)}
        ${$.spec>0?l`<span class="worker-filter__hidden">숨김 ${$.spec}</span>`:""}
      </div>
    </div>`}function De(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${Z}
    >
      ${Bh.map(f=>l`<option value=${f.value} ?selected=${Z===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function Rt(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${D}
      >
        ${Ir.map(f=>l`<option value=${f.value} ?selected=${D===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function lt(f){let $=l`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,H=f.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return cr({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:$,controls:H})}function Je(f){let $=f.queue.auto_merge===!0;if(f.merge_queue_running)return l`<button
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
      </button>`;let H=new Set(f.auto_excluded),m=f.pr_wait.filter(y=>y.merge_action&&y.merge_enabled&&!H.has(y.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${m>0?` ${m}`:""}
    </button>`}function Dt(f){let $=cr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:De(),controls:Me(f),place_menu:ze(f.candidates)});return b?l`<div class="worker-lanes worker-lanes--mobile">
        ${ve(f)}
        ${cr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:U.queue,preview:Fd(f.waiting)})}
        ${f.serial_lanes.map(H=>lt(H))}
        ${$}
        ${cr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:Rt(),collapsible:!0,collapsed:U.done,preview:Array.isArray(f.token_total)?f.token_total.map(H=>H.label).join(" \xB7 "):f.token_total||Fd(f.done)})}
      </div>`:l`<div class="worker-lanes">
      ${$}
      <div class="worker-wait">
        ${cr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(H=>lt(H))}
      </div>
      ${cr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(H=>!H.paused&&H.failed!==!0),body:Ka(f.running,Date.now(),Pe)})}
      ${cr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${cr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${L()} ${f.done.length}`,items:f.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:Rt()})}
    </div>`}function Ut(f){U={...U,[f]:!U[f]},Kh(U),Fe()}function Fe(){let f=F();Ke(ke(f),Se),Ke(Dt(f),Ne)}function Ft(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(Gh);b=!!f.matches;let $=H=>{let m=!!(H&&typeof H.matches=="boolean"?H.matches:f.matches);m!==b&&(b=m,Fe())};typeof f.addEventListener=="function"?(f.addEventListener("change",$),oe.push(()=>f.removeEventListener("change",$))):typeof f.addListener=="function"&&(f.addListener($),oe.push(()=>f.removeListener($)))}let It=null;function zt(f){It=f.target instanceof Element?f.target:null}function v(f){let H=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!H)return;if(It&&H.contains(It)&&It.closest("input, button, a")){f.preventDefault();return}let m=H.dataset.beadId||"",y=H.dataset.lane||"";x={bead_id:m,from_lane:y};try{f.dataTransfer?.setData("text/plain",m),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function w(f){let $=f.target?.closest?.(".worker-pane");if(!$)return;let H=$.dataset.lane||"";H!=="candidate"&&H!=="queue"&&!/^s[1-5]$/.test(H)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),$.classList.add("worker-pane--drag-over"))}function I(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function W(f,$){let H=O.find(ce=>ce.id===f);if(!H)return;let m=O.filter(ce=>ce.id!==f),y=m.length;if($){let ce=$.dataset.beadId;if(ce===f)return;let je=m.findIndex(xe=>xe.id===ce);je>=0&&(y=je)}let ue=m.slice();ue.splice(y,0,H),h.applyReorder(f,ue,y)}function ye(f){let $=f.target?.closest?.(".worker-pane");if(!$)return;f.preventDefault(),$.classList.remove("worker-pane--drag-over");let H=$.dataset.lane||"",m=x?.bead_id||f.dataTransfer?.getData("text/plain")||"",y=x?.from_lane||"";if(x=null,!m)return;let ue=f.target?.closest?.(".worker-mini, .worker-card"),ce=Array.from($.querySelectorAll(".worker-mini, .worker-card")),je=ce.length;if(ue){let xe=ce.indexOf(ue);xe>=0&&(je=xe)}if(je=Math.max(0,je-$.querySelectorAll(".worker-mini--ghost").length),$.classList.contains("worker-pane--collapsed")&&(je=Q()),H==="candidate"){if(y==="candidate"){W(m,ue);return}(y==="queue"||/^s[1-5]$/.test(y))&&qe(m);return}if(H==="queue"||/^s[1-5]$/.test(H)){let xe=H==="queue"?"parallel":H;y===H?J(m,xe,je):ae(m,xe)}}function we(f){B=f,qh(f),Fe()}function he(f){Z=f==="board"||f==="created"||f==="spec"?f:Mo,Wh(Z),Fe()}function et(f){D=or(f)?f:er,Hh(D),p?.(D),Fe()}function Ie(f){let $=f.target?.closest?.(".worker-serial-lane-count");if($){let je=Number.parseInt($.value,10);Number.isFinite(je)&&E(je).then(Fe);return}let H=f.target?.closest?.(".worker-filter__blocked");if(H){we({...B,show_blocked:H.checked});return}let m=f.target?.closest?.(".worker-done-range");if(m){et(m.value);return}let y=f.target?.closest?.(".worker-sort");if(y){he(y.value||Mo);return}let ue=f.target?.closest?.(".worker-slots__input");if(!ue)return;let ce=Number.parseInt(ue.value,10);if(!Number.isFinite(ce)){Fe();return}k(ce).then(Fe)}function T(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function le(){let f=F();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function Re(){Pe&&Ze.close(),$e.hidden=!1,Ce.hidden=!1,ot.open(le()),Fe()}function _t(f){let $=Ee(),H=$.attempts?$.attempts[f]:null;Pe=f,He=null,ot.close(),$e.hidden=!0,Ce.hidden=!1,Ze.open({attempt_id:f,meta:T(H)}),Fe()}function Mt(f,$){Pe=null,He=f,ot.close(),$e.hidden=!0,Ce.hidden=!1,Ze.open({attempt_id:f,meta:$,hide_prompt:!0}),Fe()}function vt(){if(ot.isOpen()&&ot.refresh(le()),He){let H=(o?.get()?.runs||[]).find(m=>m.run_id===He);H?Ze.updateMeta(li(H)):Ze.close();return}if(!Pe)return;let f=Ee(),$=f.attempts?f.attempts[Pe]:null;if($){Ze.updateMeta(T($));return}Ze.close()}function Pt(f){let $=f.target;if($?.closest?.(".worker-mini__serial, .worker-mini__grip")||$?.closest?.("#worker-parallel-analysis-dialog"))return;if($?.closest?.(".worker-analysis-btn")){Y?.open();return}if($?.closest?.(".worker-repo-strip")||$?.closest?.(".worker-mini__timeline")){Re();return}let H=$?.closest?.(".worker-repo-op__session");if(H){let Be=H.dataset.attemptId;Be&&_t(Be);return}let m=$?.closest?.(".worker-repo-op__resolve");if(m){P(m.dataset.operationId||"");return}let y=$?.closest?.(".worker-repo-op__dismiss");if(y){de(y.dataset.operationId||"");return}let ue=$?.closest?.(".worker-cleanup__resume");if(ue){let Be=ue.dataset.beadId;Be&&gt(Be);return}let ce=$?.closest?.(".worker-banner__resume");if(ce){let Be=ce.dataset.attemptId;Be&&it(Be);return}let je=$?.closest?.(".worker-banner__discard");if(je){let Be=je.dataset.confirmation==="merged"?"merged":"unmerged";Ue(je.dataset.beadId||"",je.dataset.attemptId||null,Be,je.dataset.operationId||null);return}let xe=$?.closest?.(".worker-banner__dismiss");if(xe){let Be=xe.dataset.attemptId;Be&&Xe(Be);return}if($?.closest?.(".worker-play")){S(!Ee().auto_advance);return}let A=$?.closest?.(".worker-merge-all");if(A){A.classList.contains("worker-merge-all--stop")?Ee().auto_merge===!0?kt(!1):Ye():kt(!0);return}let X=$?.closest?.(".worker-pane__hd--toggle");if(X){let Be=X.dataset.lane;(Be==="queue"||Be==="done")&&Ut(Be);return}let q=$?.closest?.(".worker-card__place-lane");if(q){let Be=q.dataset.beadId,Tt=q.dataset.lane;Be&&(Tt==="parallel"||/^s[1-5]$/.test(Tt||""))&&(V=null,Fe(),ae(Be,Tt));return}if($?.closest?.(".worker-card__place-cancel")){V=null,Fe();return}let dt=$?.closest?.(".worker-card__place");if(dt){let Be=dt.dataset.beadId;Be&&!dt.disabled&&(Ve()?(V=Be,Fe()):ae(Be,"parallel"));return}let st=$?.closest?.(".worker-filter__chip");if(st){let Be=st.dataset.spec;(Be==="all"||Be==="with"||Be==="without")&&we({...B,spec:Be});return}let tt=$?.closest?.(".worker-mini__merge");if(tt){let Be=tt.dataset.beadId||"";Ee().cleanup_failed?.[Be]?gt(Be):yt(Be);return}let rt=$?.closest?.(".worker-mini__merge-cancel");if(rt){We(rt.dataset.beadId||"");return}let Ot=$?.closest?.(".worker-mini__discard");if(Ot){Ue(Ot.dataset.beadId||"",Ot.dataset.attemptId||null,Ot.dataset.discardMode==="merged"?"merged":"unmerged",Ot.dataset.operationId||null);return}let Jt=$?.closest?.(".worker-mini__stale-continue");if(Jt){ut("worker-stale-work-continue",Jt.dataset.beadId||"",Jt.dataset.actionId||"");return}let an=$?.closest?.(".worker-mini__stale-backup");if(an){ut("worker-stale-work-backup-fresh",an.dataset.beadId||"",an.dataset.actionId||"");return}let ln=$?.closest?.(".worker-mini__stale-recheck");if(ln){ut("worker-stale-work-recheck",ln.dataset.beadId||"",ln.dataset.actionId||"");return}let gs=$?.closest?.(".worker-mini__revise-fix");if(gs){At("worker-revise-fix",gs.dataset.beadId||"");return}let cn=$?.closest?.(".worker-mini__revise-approve");if(cn){At("worker-revise-approve",cn.dataset.beadId||"");return}if($?.closest?.(".worker-mini__pr"))return;if($?.closest?.(".rtile__discard")){let Be=$?.closest?.(".rtile"),Tt=Be?.dataset?.beadId,dn=Be?.dataset?.attemptId;Tt&&Ue(Tt,dn||null,"unmerged",$?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if($?.closest?.(".rtile__dismiss")){let Tt=$?.closest?.(".rtile")?.dataset?.attemptId;Tt&&Xe(Tt);return}if($?.closest?.(".rtile__pause")){let Tt=$?.closest?.(".rtile")?.dataset?.attemptId;Tt&&Qe(Tt);return}if($?.closest?.(".rtile__resume")){let Tt=$?.closest?.(".rtile")?.dataset?.attemptId;Tt&&it(Tt);return}if($?.closest?.(".rtile__session")){let Tt=$?.closest?.(".rtile")?.dataset?.attemptId;Tt&&_t(Tt);return}if($?.closest?.(".worker-drawer-overlay__backdrop")){ot.close(),Ze.close();return}if($?.closest?.(".worker-drawer-host"))return;let Br=$?.closest?.(".rtile .board-card__roll-toggle");if(Br){let Be=Br.dataset.rollParent;Be&&(pe.has(Be)?pe.delete(Be):pe.add(Be),Fe());return}let Ur=$?.closest?.(".rtile .board-card__roll-child");if(Ur){let Be=Ur.dataset.childId;Be&&c&&c(Be);return}let un=$?.closest?.(".rtile");if(un){if($?.closest?.(".rtile__id")){let Tt=un.dataset.beadId;Tt&&tr(Tt).then(dn=>{dn?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Be=un.dataset.beadId;Be&&c&&c(Be);return}let hs=$?.closest?.(".worker-mini, .worker-card");if(hs){let Be=hs.dataset.beadId;if($?.closest?.(".worker-mini__id, .worker-card__id")){Be&&tr(Be).then(Tt=>{Tt?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Be&&c&&c(Be)}}return e.addEventListener("pointerdown",zt),e.addEventListener("dragstart",v),e.addEventListener("dragover",w),e.addEventListener("dragleave",I),e.addEventListener("drop",ye),e.addEventListener("click",Pt),e.addEventListener("change",Ie),Ft(),_&&oe.push(_.subscribe(()=>{for(let[f,$]of M)$==="failed"&&M.delete(f);Fe()})),s&&oe.push(s.subscribe(()=>{let f=u&&u()||"";f!==nt&&(nt=f,at.close()),Fe(),vt()})),o&&typeof o.subscribe=="function"&&oe.push(o.subscribe(()=>{vt(),Fe()})),Fe(),{load(){N(),Fe()},refreshSessionDefaults:ie,destroy(){for(let f of oe.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",zt),e.removeEventListener("dragstart",v),e.removeEventListener("dragover",w),e.removeEventListener("dragleave",I),e.removeEventListener("drop",ye),e.removeEventListener("click",Pt),e.removeEventListener("change",Ie);try{Ze.destroy()}catch{}Ce.hidden=!0;try{Y?.destroy()}catch{}try{at.destroy()}catch{}Ke(l``,e)}}}function pi(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Gd(e,t,r,n=async()=>{},s=async()=>{}){let o=St("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function d(U){let j=U.target.value,re=t.getState().workspace?.current?.path||"";if(j&&j!==re){o("switching workspace to %s",j),i=!0,L();try{await r(j)}catch(_e){o("workspace switch failed: %o",_e)}finally{i=!1,L()}}}async function p(){let U=t.getState(),b=U.workspace?.current?.path||U.workspace?.available?.[0]?.path||"";if(!(!b||c)){o("git-pulling workspace %s",b),c=!0,L();try{await n(b)}catch(j){o("workspace git pull failed: %o",j)}finally{c=!1,L()}}}function _(U){let b=U.target;b&&e.contains(b)||O()}function h(U){U.key==="Escape"&&O()}function x(){u||(u=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",h),L())}function O(){u&&(u=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",h),L())}function B(){u?O():x()}async function V(U){let b=U.target,j=b.value,te=b.checked;o("toggling visibility %s \u2192 %s",j,String(te));try{await s(j,te)}catch(re){o("workspace visibility toggle failed: %o",re)}}function Z(U){return U?l`
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
    `:l``}function D(U,b){return l`
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
                ${U.map(j=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${j.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${j.path}"
                        .checked=${!b.has(j.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${pi(j.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let U=t.getState(),b=U.workspace?.current,j=U.workspace?.available||[],te=new Set(U.workspace?.hidden||[]),re=b?.path||j[0]?.path||"";if(j.length===0)return l``;let _e=j.filter(pe=>!te.has(pe.path)||pe.path===re);if(_e.length<=1){let pe=_e[0]||j[0],be=pi(pe.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${pe.path}"
            >${be}</span
          >
          ${D(j,te)}
          ${Z(re)}
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
          ${_e.map(pe=>l`
              <option
                value="${pe.path}"
                ?selected=${pe.path===re}
                title="${pe.path}"
              >
                ${pi(pe.path)}
              </option>
            `)}
        </select>
        ${D(j,te)}
        ${Z(re)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function L(){Ke(M(),e)}return L(),a=t.subscribe(()=>L()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",h),Ke(l``,e)}}}var Vd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function fi(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Kd(e,t,r=fi()){return{id:r,type:e,payload:t}}function Yd(e={}){let t=St("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,d=[],p=new Map,_=new Set;function h(M){for(let L of Array.from(_))try{L(M)}catch{}}function x(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),h(o);let M=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),L=(r.jitterRatio||0)*M,U=Math.max(0,Math.round(M+(Math.random()*2-1)*L));t("ws retry in %d ms (attempt %d)",U,a+1),i=setTimeout(()=>{i=null,D()},U)}function O(M){try{s?.send(JSON.stringify(M))}catch(L){t("ws send failed",L)}}function B(){for(o="open",t("ws open"),h(o),a=0;d.length;){let M=d.shift();M&&O(M)}}function V(M){let L;try{L=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!L||typeof L.id!="string"||typeof L.type!="string"){t("ws received invalid envelope");return}if(u.has(L.id)){let b=u.get(L.id);u.delete(L.id),L.ok?b?.resolve(L.payload):b?.reject(L.error||new Error("ws error"));return}let U=p.get(L.type);if(U&&U.size>0)for(let b of Array.from(U))try{b(L.payload)}catch(j){t("ws event handler error",j)}else t("ws received unhandled message type: %s",L.type)}function Z(){o="closed",t("ws closed"),h(o);for(let[M,L]of u.entries())L.reject(new Error("ws disconnected")),u.delete(M);a+=1,x()}function D(){if(!c)return;let M=n();try{s=new WebSocket(M),t("ws connecting %s",M),o="connecting",h(o),s.addEventListener("open",B),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",Z)}catch(L){t("ws connect failed %o",L),x()}}return D(),{send(M,L){if(!Vd.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let U=fi(),b=Kd(M,L,U);return t("send %s id=%s",M,U),new Promise((j,te)=>{u.set(U,{resolve:j,reject:te,type:M}),s&&s.readyState===s.OPEN?O(b):(t("queue %s id=%s (state=%s)",M,U,o),d.push(b))})},on(M,L){p.has(M)||p.set(M,new Set);let U=p.get(M);return U?.add(L),()=>{U?.delete(L)}},onConnection(M){return _.add(M),()=>{_.delete(M)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,D()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function ab(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function ib(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var _i=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Zd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Fr="tab:worker:closed",lb="bdui.worker.done-range",Qd=ed,Xd="worker:queue",Jd="worker:parallel-analysis",ep="ui:order",tp="ui:display-policy",rp="exec:presets",jr="tab:board:closed",np="beads-ui.board.closed-range";function cb(e){let t=St("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ke(r,e);let n=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&vd(a),i&&c&&u&&d){let ie=function(m,y){let ue="Request failed",ce="";if(m&&typeof m=="object"){let xe=m;if(typeof xe.message=="string"&&xe.message.length>0&&(ue=xe.message),typeof xe.details=="string")ce=xe.details;else if(xe.details&&typeof xe.details=="object")try{ce=JSON.stringify(xe.details,null,2)}catch{ce=""}}else typeof m=="string"&&m.length>0&&(ue=m);let je=y&&y.length>0?`Failed to load ${y}`:"Request failed";N.open(je,ue,ce)},R=function(m){return`${he.getState().workspace.current?.path||""}\0${m}`},Q=function(){at&&(at().catch(()=>{}),at=null),nt=null,K=null},J=function(m){Y=m;let y=()=>{Y!==m||he.getState().selected_id!==m||(Y=null,ae(m))};if(!ze){Ve.then(y);return}y()},Xe=function(m,y,ue,ce,je){return ue!==it[y]?(je().catch(()=>{}),!1):(m.set(ce,je),!0)},yt=function(){let m=he.getState();Ye(m.view==="board"),de(m.view==="worker"),ke(m.view==="monitor"),E(m.view==="board"||m.view==="worker"||pt||!!m.selected_id)},kt=function(){let m=Kr(gt);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},We=function(){let m=Kr(ft);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},Ye=function(m){if(m)for(let[y,ue]of _i){if(qe.has(y)||Qe.has(y))continue;let ce=y===jr?kt():{type:ue};try{C.register(y,ce)}catch(A){t("register %s store failed: %o",y,A)}Qe.add(y);let je=it.board,xe=!1;Ce.subscribeList(y,ce).then(A=>{xe=!Xe(qe,"board",je,y,A)}).catch(A=>{t("subscribe %s failed: %o",y,A),ie(A,"board")}).finally(()=>{Qe.delete(y),xe&&yt()})}else At()},At=function(){it.board+=1;for(let[m]of _i){let y=qe.get(m);y&&(y().catch(()=>{}),qe.delete(m));try{C.unregister(m)}catch(ue){t("unregister %s failed: %o",m,ue)}}},de=function(m){if(!m){k();return}for(let[y,ue]of Zd){if(S.has(y)||Qe.has(y))continue;let ce=y===Fr?We():{type:ue};try{C.register(y,ce)}catch(A){t("register %s store failed: %o",y,A)}Qe.add(y);let je=it.worker,xe=!1;Ce.subscribeList(y,ce).then(A=>{xe=!Xe(S,"worker",je,y,A)}).catch(A=>{t("subscribe %s failed: %o",y,A),ie(A,"worker")}).finally(()=>{Qe.delete(y),xe&&yt()})}},k=function(){it.worker+=1;for(let[m]of Zd){let y=S.get(m);y&&(y().catch(()=>{}),S.delete(m));try{C.unregister(m)}catch(ue){t("unregister %s failed: %o",m,ue)}}},E=function(m){if(!m){F();return}P||(Se("subscribe-worker-queue",{id:Xd}).catch(y=>{t("subscribe-worker-queue failed: %o",y)}),Se("subscribe-worker-parallel-analysis",{id:Jd}).catch(y=>{t("subscribe-worker-parallel-analysis failed: %o",y)}),P=()=>(Se("unsubscribe-worker-parallel-analysis",{id:Jd}),Se("unsubscribe-worker-queue",{id:Xd})))},F=function(){P&&(P().catch(()=>{}),P=null),$e.clear()},ke=function(m){if(!m){ve();return}ee||(Se("subscribe-monitor-pipeline",{id:Qd}).catch(y=>{t("subscribe-monitor-pipeline failed: %o",y)}),ee=()=>Se("unsubscribe-monitor-pipeline",{id:Qd}))},ve=function(){ee&&(ee().catch(()=>{}),ee=null)},De=function(){Me||(Se("subscribe-ui-order",{id:ep}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),Me=()=>Se("unsubscribe-ui-order",{id:ep}))},Rt=function(){Me&&(Me().catch(()=>{}),Me=null),Pe.clear()},Je=function(){lt||(Se("subscribe-display-policy",{id:tp}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),lt=()=>Se("unsubscribe-display-policy",{id:tp}))},Dt=function(){lt&&(lt().catch(()=>{}),lt=null),He.clear()},Fe=function(){Ut||(Se("subscribe-impl-presets",{id:rp}).catch(m=>{t("subscribe-impl-presets failed: %o",m)}),Ut=()=>Se("unsubscribe-impl-presets",{id:rp}))},I=function(m){if(!m)return"Unknown";let y=m.split("/").filter(Boolean);return y.length>0?y[y.length-1]:"Unknown"};var p=ie,_=R,h=Q,x=J,O=Xe,B=yt,V=kt,Z=We,D=Ye,M=At,L=de,U=k,b=E,j=F,te=ke,re=ve,_e=De,pe=Rt,be=Je,Te=Dt,Le=Fe,ne=I;let oe=document.getElementById("header-loading"),Ae=Al(oe),N=pu(e),se=Yd(),Se=Ae.wrapSend((m,y)=>se.send(m,y)),Ce=hl(Se),C=bl(),G=wl(),$e=vl(),Ne=rl(),Pe=yl(),He=el(),Ze=tl(),ot=nl();se.on("impl-presets-snapshot",m=>{let y=m;y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&Ze.set({revision:y.revision,presets:y.presets})}),se.on("monitor-pipeline-snapshot",m=>{let y=m;if(!(!y||!Array.isArray(y.workspaces)))try{Ne.set(y.workspaces,y.workspaces_state)}catch{}}),se.on("ui-order-snapshot",m=>{let y=m;if(y&&typeof y.revision=="number")try{Pe.set({revision:y.revision,order:y.order&&typeof y.order=="object"?y.order:{}})}catch{}}),se.on("display-policy-snapshot",m=>{let y=m;if(y&&y.policy&&typeof y.policy=="object")try{He.set(y.policy)}catch{}}),se.on("session-log-snapshot",m=>{let y=m;if(y&&typeof y.id=="string")try{ot.set(y.id,Array.isArray(y.lines)?y.lines:[],typeof y.last_event_at=="number"?y.last_event_at:null)}catch{}}),se.on("session-log-append",m=>{let y=m;if(y&&typeof y.id=="string")try{ot.append(y.id,y.event)}catch{}}),se.on("snapshot",m=>{let y=m,ue=y&&typeof y.id=="string"?y.id:"",ce=ue?C.getStore(ue):null;if(ce&&y&&y.type==="snapshot")try{ce.applyPush(y)}catch{}}),se.on("upsert",m=>{let y=m,ue=y&&typeof y.id=="string"?y.id:"",ce=ue?C.getStore(ue):null;if(ce&&y&&y.type==="upsert")try{ce.applyPush(y)}catch{}}),se.on("delete",m=>{let y=m,ue=y&&typeof y.id=="string"?y.id:"",ce=ue?C.getStore(ue):null;if(ce&&y&&y.type==="delete")try{ce.applyPush(y)}catch{}});let at=null,nt=null,K=null,Y=null,Ee=()=>{},Ve=new Promise(m=>{Ee=()=>m(void 0)}),ze=!1,fe=!1;async function ae(m){let y=R(m);if(y===nt||y===K)return;K=y;let ue=`detail:${m}`,ce={type:"issue-detail",params:{id:m}};try{C.register(ue,ce)}catch(je){t("register detail store failed: %o",je)}try{let je=await Ce.subscribeList(ue,ce);if(he.getState().selected_id!==m||R(m)!==y){await je().catch(()=>{});return}at&&await at().catch(()=>{}),at=je,nt=y}catch(je){t("detail subscribe failed: %o",je),ie(je,"issue details")}finally{K===y&&(K=null)}}let qe=new Map,Qe=new Set,it={board:0,worker:0},pt=!1,gt=er;try{let m=window.localStorage.getItem(np);or(m)&&(gt=m)}catch{}let ft=er;try{let m=window.localStorage.getItem(lb);or(m)&&(ft=m)}catch{}async function Ue(m){if(!or(m)||m===gt)return;gt=m;try{window.localStorage.setItem(np,m)}catch{}let y=qe.get(jr);if(!y)return;qe.delete(jr),await y().catch(()=>{});let ue=kt();try{C.register(jr,ue)}catch(ce){t("register %s store failed: %o",jr,ce)}try{let ce=await Ce.subscribeList(jr,ue);qe.set(jr,ce)}catch(ce){t("re-subscribe %s failed: %o",jr,ce),ie(ce,"board")}}async function ut(m){if(!or(m)||m===ft)return;ft=m;let y=S.get(Fr);if(!y)return;S.delete(Fr),await y().catch(()=>{});let ue=We();try{C.register(Fr,ue)}catch(ce){t("register %s store failed: %o",Fr,ce)}try{let ce=await Ce.subscribeList(Fr,ue);S.set(Fr,ce)}catch(ce){t("re-subscribe %s failed: %o",Fr,ce),ie(ce,"worker")}}let S=new Map,P=null,ee=null,Me=null,lt=null,Ut=null;async function Ft(){lt=null,He.clear(),Ut=null,Ze.clear(),P=null,ee=null,qe.clear(),S.clear(),it.board+=1,it.worker+=1,Fe();let m=he.getState().workspace.current?.path;if(m)try{await se.send("set-workspace",{path:m})}catch(ue){t("workspace restore after reconnect failed: %o",ue);return}Je();let y=he.getState();Ye(y.view==="board"),de(y.view==="worker"),ke(y.view==="monitor"),E(y.view==="board"||y.view==="worker"||!!y.selected_id)}async function It(){t("clearing all subscriptions for workspace switch"),At(),k(),F(),G.clear(),Rt(),De(),Dt(),Je(),Q();let m=he.getState();if(m.selected_id)try{C.unregister(`detail:${m.selected_id}`)}catch{}let y=he.getState();Ye(y.view==="board"),de(y.view==="worker"),ke(y.view==="monitor"),E(y.view==="board"||y.view==="worker"||!!y.selected_id),y.selected_id&&J(y.selected_id)}async function zt(m){t("requesting workspace switch to %s",m),fe=!0;try{let y=await se.send("set-workspace",{path:m});t("workspace switch result: %o",y),y&&y.workspace&&(he.setState({workspace:{current:{path:y.workspace.root_dir,database:y.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),y.changed&&(await It(),me("Switched to "+I(m),"success",2e3)))}catch(y){throw t("workspace switch failed: %o",y),me("Failed to switch workspace","error",3e3),y}finally{fe=!1}}async function v(m){t("requesting workspace git pull for %s",m);try{let y=await se.send("git-pull-workspace",{});t("workspace git pull result: %o",y);let ue=y?.status;if(ue==="up_to_date"){me("Already up to date","success",2e3);return}if(ue==="stash_pop_conflict"){me("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}me("Git pulled "+I(m),"success",2e3)}catch(y){t("workspace git pull failed: %o",y);let ue=y?.code,ce=y?.message;if(ue==="rebase_conflict"){me("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(ue==="rebase_conflict_abort_failed"){me("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(ue==="busy"){me("Git pull skipped: another operation is running","warning",3e3);return}let je=ce?`: ${ce}`:"";throw me(`Git pull failed${je}`,"error",3e3),y}}async function w(m,y){t("setting workspace visibility %s \u2192 %s",m,String(y));try{await se.send("set-workspace-visibility",{path:m,visible:y}),await W()}catch(ue){t("workspace visibility update failed: %o",ue),me("Failed to update project visibility","error",3e3)}}async function W(){try{let m=await se.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let y=m.workspaces.map(xe=>({path:xe.path,database:xe.database,pid:xe.pid,version:xe.version})),ue=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,ce=Array.isArray(m.hidden)?m.hidden.filter(xe=>typeof xe=="string"):[];he.setState({workspace:{current:ue,available:y,hidden:ce}});let je=window.localStorage.getItem("beads-ui.workspace");je&&(!y.some(A=>A.path===je)||ce.includes(je)?window.localStorage.removeItem("beads-ui.workspace"):ue&&je!==ue.path&&(t("restoring saved workspace preference: %s",je),await zt(je)))}}catch(m){t("failed to load workspaces: %o",m)}}se.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(he.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),W(),It())});let ye=!1;if(typeof se.onConnection=="function"){let m=y=>{t("ws state %s",y),y==="reconnecting"||y==="closed"?(ye=!0,me("Connection lost. Reconnecting\u2026","error",4e3)):y==="open"&&ye&&(ye=!1,me("Reconnected","success",2200),ib(he,(ue,ce)=>{t(`${ue}: %o`,ce)}),Ft())};se.onConnection(m)}let we="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(we=m)}catch(m){t("view parse error: %o",m)}let he=xl({config:ab(),view:we});se.on("worker-queue-snapshot",m=>{let y=m;if(!y||!y.queue)return;let ue=he.getState().workspace.current?.path;if(typeof ue=="string"&&ue.length>0&&y.root_dir!==ue){t("dropping worker-queue snapshot for %s",String(y.root_dir));return}try{G.set(y.queue)}catch{}}),se.on("worker-parallel-analysis-snapshot",m=>{let y=m;if(!y)return;let ue=he.getState().workspace.current?.path;if(!(typeof ue=="string"&&ue.length>0&&typeof y.root_dir=="string"&&y.root_dir!==ue))try{$e.set({settings:y.settings,job:y.job??null,runs:Array.isArray(y.runs)?y.runs:[],last_good:y.last_good??null})}catch{}});let et=kl(he);et.start();let Ie=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),T=async(m,y)=>{try{return await Se(m,y)}catch(ue){if(Ie.has(m))throw ue;return[]}};rd({global_element:n,repo_element:s},he,et);let le=document.getElementById("workspace-picker");le&&Gd(le,he,zt,v,w);let Re=ad(e,(m,y)=>Se(m,y));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>Re.open())}catch{}let _t=ud(e,{policyStore:He,queueStore:G,implPresetStore:Ze,transport:(m,y)=>Se(m,y),onOpenChange:m=>{let y=pt;pt=m,yt(),y&&m===!1&&vt.refreshSessionDefaults()},labelOptions:()=>{let m=new Set;for(let[y]of _i)for(let ue of C.snapshotFor(y)||[]){let ce=ue.labels;if(Array.isArray(ce))for(let je of ce)typeof je=="string"&&je.length>0&&m.add(je)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&(m.setAttribute("aria-label","\uC124\uC815"),m.setAttribute("title","\uC124\uC815"),m.addEventListener("click",()=>_t.open()))}catch{}let Mt=ql(i,{gotoIssue:m=>et.gotoIssue(m),issueStores:C,transport:T,workerQueueStore:G,uiOrderStore:Pe,displayPolicyStore:He,closedRange:gt,onClosedRangeChange:m=>{Ue(m)},onNewIssue:()=>Re.open()}),vt=di(c,{transport:T,issueStores:C,queueStore:G,analysisStore:$e,sessionLogStore:ot,uiOrderStore:Pe,gotoIssue:m=>he.setState({selected_id:m}),getWorkspacePath:()=>he.getState().workspace.current?.path,doneRange:ft,onDoneRangeChange:m=>{ut(m)}}),Pt=td(u,{transport:T,pipelineStore:Ne,execPresetStore:Ze,sessionLogStore:ot,router:et,gotoIssue:m=>et.gotoIssue(m),getWorkspacePath:()=>he.getState().workspace.current?.path,switchWorkspace:m=>zt(m)}),f=du(d,{issueStores:C,transport:T,queueStore:G,execPresetStore:Ze,sessionLogStore:ot,getWorkspacePath:()=>he.getState().workspace.current?.path,onNavigate:m=>{he.getState().view==="worker"?he.setState({selected_id:m}):et.gotoIssue(m)},onClose:()=>{let m=he.getState();he.setState({selected_id:null});try{et.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}},onOpenExecPresets:()=>{_t.open("execution")}}),$=he.getState().selected_id;$&&(d.hidden=!1,f.load($),J($)),he.subscribe(m=>{let y=m.selected_id;y?(d.hidden=!1,f.load(y),fe||J(y)):(f.clear(),d.hidden=!0,Q())});let H=m=>{i.hidden=m.view!=="board",c.hidden=m.view!=="worker",u.hidden=m.view!=="monitor",o&&o.classList.toggle("is-quiet",m.view==="monitor"),Ye(m.view==="board"),de(m.view==="worker"),ke(m.view==="monitor"),E(m.view==="board"||m.view==="worker"||pt||!!m.selected_id),!m.selected_id&&m.view==="board"&&Mt.load(),m.view==="worker"&&vt.load(),m.view==="monitor"?Pt.load():Pt.pause(),window.localStorage.setItem("beads-ui.view",m.view)};he.subscribe(H),H(he.getState()),De(),Je(),Fe(),W().finally(()=>{ze=!0,Ee()}),window.addEventListener("keydown",m=>{let y=m.ctrlKey||m.metaKey,ue=String(m.key||"").toLowerCase(),ce=m.target,je=ce&&ce.tagName?String(ce.tagName).toLowerCase():"",xe=je==="input"||je==="textarea"||je==="select"||ce&&typeof ce.isContentEditable=="boolean"&&ce.isContentEditable;y&&ue==="n"&&(xe||(m.preventDefault(),Re.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&cb(t)});export{cb as bootstrap,ab as readBootstrapConfig,ib as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
