var Cp=Object.create;var Vo=Object.defineProperty;var Rp=Object.getOwnPropertyDescriptor;var Ip=Object.getOwnPropertyNames;var Op=Object.getPrototypeOf,Lp=Object.prototype.hasOwnProperty;var Mp=(e,t,n)=>t in e?Vo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ko=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Pp=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ip(t))!Lp.call(e,s)&&s!==n&&Vo(e,s,{get:()=>t[s],enumerable:!(r=Rp(t,s))||r.enumerable});return e};var Dp=(e,t,n)=>(n=e!=null?Cp(Op(e)):{},Pp(t||!e||!e.__esModule?Vo(n,"default",{value:e,enumerable:!0}):n,e));var wt=(e,t,n)=>Mp(e,typeof t!="symbol"?t+"":t,n);var ul=Ko((Sb,cl)=>{var _r=1e3,mr=_r*60,gr=mr*60,Jn=gr*24,Fp=Jn*7,jp=Jn*365.25;cl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Bp(e);if(n==="number"&&isFinite(e))return t.long?Wp(e):Up(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Bp(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*jp;case"weeks":case"week":case"w":return n*Fp;case"days":case"day":case"d":return n*Jn;case"hours":case"hour":case"hrs":case"hr":case"h":return n*gr;case"minutes":case"minute":case"mins":case"min":case"m":return n*mr;case"seconds":case"second":case"secs":case"sec":case"s":return n*_r;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Up(e){var t=Math.abs(e);return t>=Jn?Math.round(e/Jn)+"d":t>=gr?Math.round(e/gr)+"h":t>=mr?Math.round(e/mr)+"m":t>=_r?Math.round(e/_r)+"s":e+"ms"}function Wp(e){var t=Math.abs(e);return t>=Jn?Ls(e,t,Jn,"day"):t>=gr?Ls(e,t,gr,"hour"):t>=mr?Ls(e,t,mr,"minute"):t>=_r?Ls(e,t,_r,"second"):e+" ms"}function Ls(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var pl=Ko((Eb,dl)=>{function zp(e){n.debug=n,n.default=n,n.coerce=c,n.disable=a,n.enable=s,n.enabled=i,n.humanize=ul(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let p=0;for(let _=0;_<d.length;_++)p=(p<<5)-p+d.charCodeAt(_),p|=0;return n.colors[Math.abs(p)%n.colors.length]}n.selectColor=t;function n(d){let p,_=null,b,$;function L(...B){if(!L.enabled)return;let G=L,Q=Number(new Date),P=Q-(p||Q);G.diff=P,G.prev=p,G.curr=Q,p=Q,B[0]=n.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let M=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(U,w)=>{if(U==="%%")return"%";M++;let F=n.formatters[w];if(typeof F=="function"){let J=B[M];U=F.call(G,J),B.splice(M,1),M--}return U}),n.formatArgs.call(G,B),(G.log||n.log).apply(G,B)}return L.namespace=d,L.useColors=n.useColors(),L.color=n.selectColor(d),L.extend=r,L.destroy=n.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(b!==n.namespaces&&(b=n.namespaces,$=n.enabled(d)),$),set:B=>{_=B}}),typeof n.init=="function"&&n.init(L),L}function r(d,p){let _=n(this.namespace+(typeof p>"u"?":":p)+d);return _.log=this.log,_}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of p)_[0]==="-"?n.skips.push(_.slice(1)):n.names.push(_)}function o(d,p){let _=0,b=0,$=-1,L=0;for(;_<d.length;)if(b<p.length&&(p[b]===d[_]||p[b]==="*"))p[b]==="*"?($=b,L=_,b++):(_++,b++);else if($!==-1)b=$+1,L++,_=L;else return!1;for(;b<p.length&&p[b]==="*";)b++;return b===p.length}function a(){let d=[...n.names,...n.skips.map(p=>"-"+p)].join(",");return n.enable(""),d}function i(d){for(let p of n.skips)if(o(d,p))return!1;for(let p of n.names)if(o(d,p))return!0;return!1}function c(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}dl.exports=zp});var fl=Ko((Zt,Ms)=>{Zt.formatArgs=Gp;Zt.save=Vp;Zt.load=Kp;Zt.useColors=Hp;Zt.storage=Yp();Zt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Zt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Hp(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Gp(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ms.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}Zt.log=console.debug||console.log||(()=>{});function Vp(e){try{e?Zt.storage.setItem("debug",e):Zt.storage.removeItem("debug")}catch{}}function Kp(){let e;try{e=Zt.storage.getItem("debug")||Zt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Yp(){try{return localStorage}catch{}}Ms.exports=pl()(Zt);var{formatters:Zp}=Ms.exports;Zp.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var qr=globalThis,Es=qr.trustedTypes,Ki=Es?Es.createPolicy("lit-html",{createHTML:e=>e}):void 0,Zo="$lit$",kn=`lit$${Math.random().toFixed(9).slice(2)}$`,Qo="?"+kn,Np=`<${Qo}>`,Yn=document,Fr=()=>Yn.createComment(""),jr=e=>e===null||typeof e!="object"&&typeof e!="function",Xo=Array.isArray,el=e=>Xo(e)||typeof e?.[Symbol.iterator]=="function",Yo=`[ 	
\f\r]`,Nr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Yi=/-->/g,Zi=/>/g,Vn=RegExp(`>|${Yo}(?:([^\\s"'>=/]+)(${Yo}*=${Yo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qi=/'/g,Xi=/"/g,tl=/^(?:script|style|textarea|title)$/i,Jo=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=Jo(1),fr=Jo(2),yb=Jo(3),on=Symbol.for("lit-noChange"),Lt=Symbol.for("lit-nothing"),Ji=new WeakMap,Kn=Yn.createTreeWalker(Yn,129);function nl(e,t){if(!Xo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ki!==void 0?Ki.createHTML(t):t}var rl=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Nr;for(let i=0;i<n;i++){let c=e[i],u,d,p=-1,_=0;for(;_<c.length&&(a.lastIndex=_,d=a.exec(c),d!==null);)_=a.lastIndex,a===Nr?d[1]==="!--"?a=Yi:d[1]!==void 0?a=Zi:d[2]!==void 0?(tl.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=Vn):d[3]!==void 0&&(a=Vn):a===Vn?d[0]===">"?(a=s??Nr,p=-1):d[1]===void 0?p=-2:(p=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?Vn:d[3]==='"'?Xi:Qi):a===Xi||a===Qi?a=Vn:a===Yi||a===Zi?a=Nr:(a=Vn,s=void 0);let b=a===Vn&&e[i+1].startsWith("/>")?" ":"";o+=a===Nr?c+Np:p>=0?(r.push(u),c.slice(0,p)+Zo+c.slice(p)+kn+b):c+kn+(p===-2?i:b)}return[nl(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Br=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,d]=rl(t,n);if(this.el=e.createElement(u,r),Kn.currentNode=this.el.content,n===2||n===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=Kn.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(Zo)){let _=d[a++],b=s.getAttribute(p).split(kn),$=/([.?@])?(.*)/.exec(_);c.push({type:1,index:o,name:$[2],strings:b,ctor:$[1]==="."?Cs:$[1]==="?"?Rs:$[1]==="@"?Is:Qn}),s.removeAttribute(p)}else p.startsWith(kn)&&(c.push({type:6,index:o}),s.removeAttribute(p));if(tl.test(s.tagName)){let p=s.textContent.split(kn),_=p.length-1;if(_>0){s.textContent=Es?Es.emptyScript:"";for(let b=0;b<_;b++)s.append(p[b],Fr()),Kn.nextNode(),c.push({type:2,index:++o});s.append(p[_],Fr())}}}else if(s.nodeType===8)if(s.data===Qo)c.push({type:2,index:o});else{let p=-1;for(;(p=s.data.indexOf(kn,p+1))!==-1;)c.push({type:7,index:o}),p+=kn.length-1}o++}}static createElement(t,n){let r=Yn.createElement("template");return r.innerHTML=t,r}};function Zn(e,t,n=e,r){if(t===on)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=jr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=Zn(e,s._$AS(e,t.values),s,r)),t}var Ts=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??Yn).importNode(n,!0);Kn.currentNode=s;let o=Kn.nextNode(),a=0,i=0,c=r[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new pr(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Os(o,this,t)),this._$AV.push(u),c=r[++i]}a!==c?.index&&(o=Kn.nextNode(),a++)}return Kn.currentNode=Yn,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},pr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Lt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Zn(this,t,n),jr(t)?t===Lt||t==null||t===""?(this._$AH!==Lt&&this._$AR(),this._$AH=Lt):t!==this._$AH&&t!==on&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):el(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Lt&&jr(this._$AH)?this._$AA.nextSibling.data=t:this.T(Yn.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Br.createElement(nl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Ts(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Ji.get(t.strings);return n===void 0&&Ji.set(t.strings,n=new Br(t)),n}k(t){Xo(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Fr()),this.O(Fr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Qn=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Lt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Lt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=Zn(this,t,n,0),a=!jr(t)||t!==this._$AH&&t!==on,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Zn(this,i[r+c],n,c),u===on&&(u=this._$AH[c]),a||(a=!jr(u)||u!==this._$AH[c]),u===Lt?t=Lt:t!==Lt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===Lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Cs=class extends Qn{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Lt?void 0:t}},Rs=class extends Qn{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Lt)}},Is=class extends Qn{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=Zn(this,t,n,0)??Lt)===on)return;let r=this._$AH,s=t===Lt&&r!==Lt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Lt&&(r===Lt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Os=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Zn(this,t)}},sl={M:Zo,P:kn,A:Qo,C:1,L:rl,R:Ts,D:el,V:Zn,I:pr,H:Qn,N:Rs,U:Is,B:Cs,F:Os},qp=qr.litHtmlPolyfillSupport;qp?.(Br,pr),(qr.litHtmlVersions??(qr.litHtmlVersions=[])).push("3.3.1");var Ke=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new pr(t.insertBefore(Fr(),o),o,void 0,n??{})}return s._$AI(e),s};var en="today",Pn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function an(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Xn(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ol(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function al(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function il(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function ll(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var _l=Dp(fl(),1);function Et(e){return(0,_l.default)(`beads-ui:${e}`)}function fn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function er(e,t){let n=fn(e.created_at),r=fn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function hl(e,t){let n=fn(e.created_at),r=fn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function bl(e,t){let n=fn(e.updated_at),r=fn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function yl(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=fn(e.created_at),o=fn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function vl(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Qp=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ml(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function gl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Qp.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function wl(e,t){let n=ml(e),r=ml(t);if(n!==r)return n<r?-1:1;let s=gl(e),o=gl(t);if(s!==o)return s<o?-1:1;let a=fn(e&&e.created_at),i=fn(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var ea=2**20;function hr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-fn(e&&e.created_at)}function Ps(e){return(t,n)=>{let r=hr(t,e),s=hr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function ta(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:hr(i,n)-ea};if(!i)return{rank:hr(a,n)+ea};let c=hr(a,n),u=hr(i,n),d=(c+u)/2;return c<d&&d<u?{rank:d}:{renormalize:r.map((p,_)=>({bead_id:p.id,rank:_*ea}))}}function na(e,t={}){let n=Et(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||er;function u(){for(let _ of Array.from(a))try{_()}catch{}}function d(){s=Array.from(r.values()).sort(c)}function p(_){if(i||!_||_.id!==e)return;let b=Number(_.revision)||0;if(n("apply %s rev=%d",_.type,b),!(b<=o&&_.type!=="snapshot")){if(_.type==="snapshot"){if(b<=o)return;r.clear();let $=Array.isArray(_.issues)?_.issues:[];for(let L of $)L&&typeof L.id=="string"&&L.id.length>0&&r.set(L.id,L);d(),o=b,u();return}if(_.type==="upsert"){let $=_.issue;if($&&typeof $.id=="string"&&$.id.length>0){let L=r.get($.id);if(!L)r.set($.id,$);else{let B=Number.isFinite(L.updated_at)?L.updated_at:0,G=Number.isFinite($.updated_at)?$.updated_at:0;if(B<=G){for(let Q of Object.keys(L))Q in $||delete L[Q];for(let[Q,P]of Object.entries($))L[Q]=P}}d()}o=b,u()}else if(_.type==="delete"){let $=String(_.issue_id||"");$&&(r.delete($),d()),o=b,u()}}}return{id:e,subscribe(_){return a.add(_),()=>{a.delete(_)}},applyPush:p,snapshot(){return s},size(){return r.size},getById(_){return r.get(_)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Ds(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function kl(e){let t=Et("subs"),n=new Map,r=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(c.added)?c.added:[],p=Array.isArray(c.updated)?c.updated:[],_=Array.isArray(c.removed)?c.removed:[];for(let b of Array.from(u)){let $=n.get(b);if(!$)continue;let L=$.itemsById;for(let B of d)typeof B=="string"&&B.length>0&&L.set(B,!0);for(let B of p)typeof B=="string"&&B.length>0&&L.set(B,!0);for(let B of _)typeof B=="string"&&B.length>0&&L.delete(B)}}async function o(i,c){let u=Ds(c);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let p=n.get(i);if(p&&p.key!==u){let _=r.get(p.key);_&&(_.delete(i),_.size===0&&r.delete(p.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(p){let _=n.get(i)||null;if(_){let b=r.get(_.key);b&&(b.delete(i),b.size===0&&r.delete(_.key))}throw n.delete(i),p}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let p=n.get(i)||null;if(p){let _=r.get(p.key);_&&(_.delete(i),_.size===0&&r.delete(p.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Ds,selectors:{getIds(i){let c=n.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=n.get(i);return u?u.itemsById.has(c):!1},count(i){let c=n.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=n.get(i),u={};if(!c)return u;for(let d of c.itemsById.keys())u[d]=!0;return u}}}}function $l(){let e=Et("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let c of Array.from(r))try{c()}catch{}}function a(c,u,d){let p=u?Ds(u):"",_=n.get(c)||"",b=t.has(c);if(e("register %s key=%s (prev=%s)",c,p,_),b&&_&&p&&_!==p){let $=t.get(c);if($)try{$.dispose()}catch{}let L=s.get(c);if(L){try{L()}catch{}s.delete(c)}let B=na(c,d);t.set(c,B);let G=B.subscribe(()=>o());s.set(c,G)}else if(!b){let $=na(c,d);t.set(c,$);let L=$.subscribe(()=>o());s.set(c,L)}return n.set(c,p),()=>i(c)}function i(c){e("unregister %s",c),n.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let d=s.get(c);if(d){try{d()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return r.add(c),()=>r.delete(c)}}}function xl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Al(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Sl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ra(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Xp(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Jp(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function El(e){let t=Et("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Xp(r),a=Jp(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=ra(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?ra(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var ef=Object.freeze({workspace_config:{default_workspace:null}});function Tl(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:ef.workspace_config.default_workspace}}}function Cl(e={}){let t=Et("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Tl(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Tl(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),c=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!c||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Rl(e){let t=Et("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function c(u){return async(p,_)=>{let b=s++,$=Date.now();r.set(b,{type:p,start_ts:$}),t("request start id=%d type=%s count=%d",b,p,n+1),a();let L=!1,B=()=>{L||(L=!0,r.delete(b),i())},G=setTimeout(()=>{L||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,p,Date.now()-$),B())},3e4);try{let Q=await u(p,_),P=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",b,p,P),Q}catch(Q){let P=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,p,P,Q),Q}finally{clearTimeout(G),B()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function ge(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Ns(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(vl),c;switch(i){case"created_desc":return c.sort(er),c;case"created_asc":return c.sort(hl),c;case"updated_desc":return c.sort(bl),c;case"priority":return c.sort(yl),c;case"manual":default:{let u=n();return u?c.sort(Ps(u)):c.sort(er),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function tr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function zt(e){let t=tr(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function tn(e,t){let n=tr(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Il(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=tr(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function qs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Fs(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=qs(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function js(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=Il(n);return{total:n.length,count:r,current:s,children:n}}function Bs(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ta(i,c,u.order),a);s(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let _={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};n.set(_);let b=r(ta(i,c,_.order),a);s(_,b);let $=await t("ui-order-set",{expected_revision:_.revision,entries:b});$&&$.applied&&n.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else p&&p.applied&&n.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:o}}function Us(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function sa(e,t){return!t||typeof e!="string"||e.length===0||Us(t.visible_labels).includes(e)?!0:Us(t.hidden_labels).includes(e)?!1:!Us(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Ol(e,t){return Us(e).filter(n=>sa(n,t))}function Dn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function tf(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function nf(e,t,n,r,s){return l`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function rf(e,t,n,r){return l`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${tf(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Ws(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(wl):a;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?nf(t.parent_id,e.count,n,r,t.onToggle):l`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?l`<div class="board-card__roll-list">
            ${i.map((c,u)=>rf(c,u+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var sf={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ml={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ll={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},of={review:"\u2713",skip:"\u2298"},Nn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function af(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Pl(e){let t=e&&e.fill||"none";return t==="none"?Nn.none:e&&e.stale===!0?Nn.stale:t==="dim"?Nn.dim:e&&e.glyph==="review"?Nn.review:e&&e.glyph==="skip"?Nn.skip:Nn.done}function lf(e){if(!e||e.fill==="none"||!e.approval_state)return Pl(e);let t=[];return e.glyph==="review"?t.push(Nn.review):e.glyph==="skip"&&t.push(Nn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function cf(e,t,n){let r=sf[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=of[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${r} dim`:s==="full"&&(i+=` b-${r} full`),o&&(i+=" stale"),n&&(i+=" cur");let c=s==="none"?"lbl":`lbl l-${r} on`,u=n?`color: var(--stage-${r}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${c}>
        ${Ml[e]||e}
      </div>
    </div>
  `}function zs(e,t){if(!e||!e.stages)return"";let n=Ll[e.route]||Ll.spec_backed,r=e.stages,s=af(n,r,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(a=>`${Ml[a]||a} ${a==="plan"?lf(r[a]||{}):Pl(r[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${n.map(a=>cf(a,r[a]||{},a===s))}
    </div>
  `}function uf(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Dl=2;function df(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,Dl).join(", "),s=n.length-Dl,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function oa(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Hs(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function $n(e){return`${e.kind}:${Hs(e)}@${e.sha}`}function Gs(e,t){if(!e)return null;let n=oa(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=oa(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${$n(t)}`:"";return{kind:e.kind,label:i,title:`${c}${u}`}}function Nl(e,t){let n=Gs(e,t);return n?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function pf(e){if(!e)return null;let t=oa(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${$n(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function ff(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Dn(n,"route")){let i=r.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Dn(n,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Dn(n,"pr")){let i=r.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Nl(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${$n(i)}`}
        >${`exec ${i.kind==="delegated"?Hs(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of Ol(e.labels,n))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Dn(n,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Dn(n,"blocked")&&s.push(...df(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Dn(n,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function _f(e){let t=tn(e.created_at),n=tn(e.updated_at);return!t&&!n?"":l`<span class="board-card__times">
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
  </span>`}function mf(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Ws(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:_f(e),empty_label:"children \uC5C6\uC74C",childChips:aa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function aa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Gs(t,n)?l`<span class="board-card__roll-child-chips">
    ${Nl(t,n)}
    ${pf(n)}
  </span>`:null}function Vs(e,t){let n=uf(e.priority);return l`
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
      ${ff(e,t)}
      ${e.workflow&&Dn(t.policy||null,"stepper")?zs(e.workflow,e.status):""}
      ${mf(e,t)}
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
              ${Pn.map(o=>l`<option
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
        ${e.items.map(o=>Vs(o,t))}
      </div>
    </section>
  `}function ql(e,t,n){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Vs(r,t))}
        </div>
      </div>
    </dialog>
  `}var gf=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],hf=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],bf=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function yf(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return l`
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
  `}function Fl(e,t,n){return l`
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
        ${gf.map(r=>l`<option
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
        ${hf.map(r=>l`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${yf(e,t,n)}
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
        ${bf.map(r=>l`<option
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
  `}var vf=200,wf={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},kf=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),jl="beads-ui.board.sort",Bl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function $f(){try{let e=window.localStorage.getItem(jl);if(e&&Bl.has(e))return e}catch{}return"created_desc"}function Ul(e,t){let n=Et("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.closedRange||en,_=s?Ns(s,a):null,b=Bs({transport:o,uiOrderStore:a}),$=[],L=[],B=[],G=[],Q=[],P=[],M=!1,O=0,U=$f(),w=new Map,F=new Map,J=new Map,Te=new Set,Y={search:"",priority:"",type:"",labels:[]},ce=!1,he=null;function Re(V){return String(V.status||"open")==="open"}function Le(V){let _e=String(V.status||"open");return _e==="open"||_e==="blocked"}function oe(V){let _e=Y.search.trim().toLowerCase(),R=Y.priority,m=Y.type,E=Y.labels;return V.filter(D=>{if(_e){let j=String(D.id||"").toLowerCase(),be=String(D.title||"").toLowerCase();if(!j.includes(_e)&&!be.includes(_e))return!1}if(R!==""&&String(D.priority)!==R||m!==""&&String(D.issue_type||"")!==m)return!1;if(E.length>0){let j=Array.isArray(D.labels)?D.labels:[];if(!E.some(be=>j.includes(be)))return!1}return!0})}function ie(){let V=new Set;for(let _e of[$,L,B,G,Q,P])for(let R of _e){let m=Array.isArray(R.labels)?R.labels:[];for(let E of m)typeof E=="string"&&E.length>0&&V.add(E)}return Array.from(V).sort()}function Me(){return Y.search.trim()!==""||Y.priority!==""||Y.type!==""||Y.labels.length>0}function N(){try{if(_){let V=_.selectBoardColumn("tab:board:in-progress","in_progress",U),_e=_.selectBoardColumn("tab:board:blocked","blocked",U).filter(Le),R=new Set(V.map(qe=>qe.id)),m=_.selectBoardColumn("tab:board:ready","ready",U).filter(qe=>Re(qe)&&!R.has(qe.id)),E=_.selectBoardColumn("tab:board:resolved","resolved",U),D=_.selectBoardColumn("tab:board:deferred","deferred",U),j=_.selectBoardColumn("tab:board:closed","closed").slice(0,vf),be=[..._e,...m,...V,...E,...j];se(be);let ve=new Set;for(let qe of be)qe&&qe.id&&!qs(qe)&&ve.add(qe.id);let xe=!Me();$=xe?Ur(_e,ve):_e,L=xe?Ur(m,ve):m,B=xe?Ur(V,ve):V,G=xe?Ur(E,ve):E,Q=D,O=D.length,P=xe?Ur(j,ve):j,w=new Map;for(let qe of $)w.set(qe.id,"open");for(let qe of L)w.set(qe.id,"open");for(let qe of B)w.set(qe.id,"in_progress");for(let qe of G)w.set(qe.id,"resolved");for(let qe of Q)w.set(qe.id,"deferred");for(let qe of P)w.set(qe.id,"closed");F=new Map;for(let qe of $)F.set(qe.id,"blocked-col");for(let qe of L)F.set(qe.id,"ready-col");for(let qe of B)F.set(qe.id,"in-progress-col");for(let qe of G)F.set(qe.id,"resolved-col");for(let qe of P)F.set(qe.id,"closed-col")}Ze()}catch{$=[],L=[],B=[],G=[],Q=[],P=[],J=new Map,Ze()}}function se(V){J=Fs(V)}function ae(V){return js(J,V)}function Se(V){return!Te.has(V)}function Ie(V,_e){V.preventDefault(),V.stopPropagation(),Te.has(_e)?Te.delete(_e):Te.add(_e),Ze()}function Ne(V,_e){V.preventDefault(),V.stopPropagation(),r(_e)}function A(V,_e){V.preventDefault(),V.stopPropagation(),r(_e)}function fe(V,_e){he||r(_e)}function De(V,_e){V.preventDefault(),V.stopPropagation(),xf(_e).then(R=>{R&&ge("\uBCF5\uC0AC\uB428","success",1200)})}function we(V,_e){he=_e,V.dataTransfer&&(V.dataTransfer.setData("text/plain",_e),V.dataTransfer.effectAllowed="move"),V.target.classList.add("board-card--dragging")}function We(V){V.target.classList.remove("board-card--dragging"),yt(),setTimeout(()=>{he=null},0)}function Ue(V){let _e=String(V.target.value||"");!_e||_e===p||(p=_e,u&&u(_e),Ze())}function Ge(){return i?i.get():null}function Xe(V){let _e=c?c.get():null,R=_e?_e.cleanup_failed:null;if(!R||typeof R!="object"||Array.isArray(R))return null;let m=R[V];return!m||typeof m!="object"||Array.isArray(m)?null:m}let st={onCardClick:fe,onCopyId:De,onDragStart:we,onDragEnd:We,onClosedRangeChange:Ue,rollupFor:ae,isExpanded:Se,onRollupToggle:Ie,onChildClick:Ne,onFromChipClick:A,cleanupFailureFor:Xe,get policy(){return Ge()}};function K(V,_e){he||(ee(),r(_e))}function Z(V,_e){V.preventDefault(),V.stopPropagation(),ee(),r(_e)}let Ce={...st,onCardClick:K,onChildClick:Z,onFromChipClick:Z,get policy(){return Ge()}};function Ye(V){let _e=V.target,R=e.querySelector(".board-filter__labels");_e&&R&&R.contains(_e)||C()}function He(V){V.key==="Escape"&&C()}function pe(){ce||(ce=!0,document.addEventListener("mousedown",Ye),document.addEventListener("keydown",He),Ze())}function C(){ce&&(ce=!1,document.removeEventListener("mousedown",Ye),document.removeEventListener("keydown",He),Ze())}function X(V){V.key==="Escape"&&ee()}function ye(){M||(M=!0,document.addEventListener("keydown",X),Ze())}function ee(){M&&(M=!1,document.removeEventListener("keydown",X),Ze())}let $e={onClose:ee,onOverlayClick(V){V.target===V.currentTarget&&ee()}},at={onSearchInput(V){Y.search=String(V.target.value||""),N()},onPriorityChange(V){Y.priority=String(V.target.value||""),N()},onTypeChange(V){Y.type=String(V.target.value||""),N()},onSortChange(V){let _e=String(V.target.value||"");if(!(!Bl.has(_e)||_e===U)){U=_e;try{window.localStorage.setItem(jl,_e)}catch{}N()}},onDeferredToggle(){M?ee():ye()},onLabelMenuToggle(){ce?C():pe()},onLabelToggle(V){let _e=Y.labels.indexOf(V);_e===-1?Y.labels.push(V):Y.labels.splice(_e,1),N()},onLabelClear(){Y.labels.length!==0&&(Y.labels=[],N())},onNewIssue(){d&&d()}};function ot(){return l`
      <div class="board-view">
        ${Fl(Y,at,{sort_mode:U,deferred_popup_open:M,deferred_count:O,label_options:ie(),label_menu_open:ce})}
        <div class="board-root">
          ${br({title:"Blocked",id:"blocked-col",items:oe($)},st)}
          ${br({title:"Ready",id:"ready-col",items:oe(L)},st)}
          ${br({title:"In progress",id:"in-progress-col",items:oe(B)},st)}
          ${br({title:"Resolved",id:"resolved-col",items:oe(G)},st)}
          ${br({title:"Closed",id:"closed-col",items:oe(P),is_closed:!0,closed_range:p},st)}
        </div>
        ${M?ql({items:oe(Q),count:O},Ce,$e):""}
      </div>
    `}function Ze(){Ke(ot(),e),pt()}function pt(){try{let V=e.querySelector("#deferred-popup");V&&!V.open&&(typeof V.showModal=="function"?V.showModal():V.setAttribute("open",""));let _e=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let R of _e)Array.from(R.querySelectorAll(".board-card")).forEach((E,D)=>{E.tabIndex=D===0?0:-1})}catch{}}async function mt(V,_e){if(!o){ge("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:V,status:_e}),ge("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(R){n("update-status failed: %o",R),ge("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function gt(V){switch(V){case"blocked-col":return $;case"ready-col":return L;case"in-progress-col":return B;case"resolved-col":return G;default:return[]}}function it(V,_e,R){if(!o||!a)return;let m=gt(V),E=m.find(xe=>xe.id===_e);if(!E)return;let D=m.filter(xe=>xe.id!==_e),j=R.closest?R.closest(".board-card"):null,be=D.length;if(j){let xe=j.getAttribute("data-issue-id");if(xe===_e)return;let qe=D.findIndex(vt=>vt.id===xe);qe>=0&&(be=qe)}let ve=D.slice();ve.splice(be,0,E),b.applyReorder(_e,ve,be)}function yt(){for(let V of Array.from(e.querySelectorAll(".board-column--drag-over")))V.classList.remove("board-column--drag-over")}let ze=null;e.addEventListener("dragover",V=>{V.preventDefault(),V.dataTransfer&&(V.dataTransfer.dropEffect="move");let R=V.target.closest(".board-column");R&&R!==ze&&(ze&&ze.classList.remove("board-column--drag-over"),R.classList.add("board-column--drag-over"),ze=R)}),e.addEventListener("dragleave",V=>{let _e=V.relatedTarget;(!_e||!e.contains(_e))&&ze&&(ze.classList.remove("board-column--drag-over"),ze=null)}),e.addEventListener("drop",V=>{V.preventDefault(),ze&&(ze.classList.remove("board-column--drag-over"),ze=null);let _e=V.target,R=_e.closest(".board-column");if(!R)return;let m=V.dataTransfer?.getData("text/plain")||"";if(!m)return;let E=R.id,D=F.get(m);if(D&&D===E){if(kf.has(E)){if(U!=="manual"){ge("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}it(E,m,_e)}return}let j=wf[E];if(!j){ge("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}w.get(m)!==j&&mt(m,j)}),e.addEventListener("keydown",V=>{let _e=V.target;if(!(_e instanceof HTMLElement))return;let R=String(_e.tagName||"").toLowerCase();if(R==="input"||R==="textarea"||R==="select"||R==="button"||R==="a"||_e.isContentEditable===!0)return;let m=_e.closest(".board-card");if(!m)return;let E=String(V.key||"");if(E==="Enter"||E===" "){V.preventDefault();let ve=m.getAttribute("data-issue-id");ve&&r(ve);return}if(E!=="ArrowUp"&&E!=="ArrowDown"&&E!=="ArrowLeft"&&E!=="ArrowRight")return;V.preventDefault();let D=m.closest(".board-column");if(!D)return;let j=Array.from(D.querySelectorAll(".board-card")),be=j.indexOf(m);if(E==="ArrowDown"&&be<j.length-1){Qe(m,j[be+1]);return}if(E==="ArrowUp"&&be>0){Qe(m,j[be-1]);return}if(E==="ArrowLeft"||E==="ArrowRight"){let ve=Array.from(e.querySelectorAll(".board-column")),xe=ve.indexOf(D),qe=E==="ArrowRight"?1:-1,vt=xe+qe;for(;vt>=0&&vt<ve.length;){let nt=ve[vt].querySelector(".board-card");if(nt){Qe(m,nt);return}vt+=qe}}});function Qe(V,_e){try{V.tabIndex=-1,_e.tabIndex=0,_e.focus()}catch{}}let Pe=null;_&&_.subscribe&&(Pe=_.subscribe(()=>{try{N()}catch{}}));let ht=null;i&&i.subscribe&&(ht=i.subscribe(()=>{try{N()}catch{}}));let xt=null;return c&&c.subscribe&&(xt=c.subscribe(()=>{Ze()})),{async load(){n("load"),N()},clear(){C(),ee(),Pe&&(Pe(),Pe=null),ht&&(ht(),ht=null),xt&&(xt(),xt=null),e.replaceChildren(),$=[],L=[],B=[],G=[],Q=[],P=[],w=new Map,F=new Map}}}function Ur(e,t){return e.filter(n=>{let r=qs(n);return!(r&&t.has(r))})}async function xf(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function nn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function nr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Wr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Af(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${nr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${nr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(c=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),c(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function xn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await Af(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var Sf=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Wl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Ef=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function qt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Rt(e){return typeof e=="string"&&e.length>0?e:null}function yr(e){return e.startsWith("gpt-")?e.slice(4):e}function $t(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Hl(e,t,n){let r=Rt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Rt(n[e]);return s===null?null:{value:s,source:"global"}}function zr(e,t,n,r){return Hl(e,t,n)||{value:r,source:"base"}}function ia(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&qt(s?.[t])){let a=Rt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&qt(s)){for(let a of Object.values(s))if(qt(a)){let i=Rt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Rt(r?.runners?.[o]?.models?.[e]?.id)||e}function Tf(e,t){return Rt(t?.review?.reviewers?.[e]?.model)||e}function vr(e,t,n=!1){if(e==="default")return $t(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?yr(e):e;return $t(e,t,r,e,"explicit")}function Gl(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];qt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(qt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function Cf(e,t){let n=[],r=e?.implementation?.model_catalog;qt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(qt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function Rf(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of Cf(t,n)){let o=Gl(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function la(e){return $t(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function zl(e,t,n){let r=Hl(e,t,n);return r?vr(r.value,r.source):$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Qt(e){let t=qt(e.pin)?e.pin:{},n=qt(e.global)?e.global:{},r=qt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&qt(r.session)?r.session:null,o=r?.supported===!0&&qt(r.orchestration)?r.orchestration:null,a=qt(e.runner_catalog)?e.runner_catalog:null,i=Rt(n.quick_fix_impl_model),c=Rf(i,s,a),u={};if(s){let d=zr("workflow_mode",t,n,Rt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?$t(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):vr(d.value,d.source);for(let P of["spec_review","plan_review","impl_review"]){let M=`${P}_model`,O=Rt(P==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),U=zr(M,t,n,O);if(U.value===null)u[M]=$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(U.value!=="self"&&U.value!=="skip"&&!qt(s.review?.reviewers?.[U.value]))u[M]=la($t(U.value,U.source,"",null,"explicit"));else{let w=Tf(U.value,s);u[M]=$t(U.value,U.source,yr(w),w,U.source==="base"?"default":"explicit")}}for(let[P,M]of Object.entries(Wl)){let O=u[M].value;if(O==="self"||O==="skip"){u[P]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let U=Rt(s.review?.reviewers?.[O||""]?.effort),w=zr(P,t,n,U);u[P]=w.value===null?$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):$t(w.value,w.source,w.value,w.value,w.source==="base"?"default":"explicit")}let p=qt(s.implementation?.default)?s.implementation.default:{},_=Rt(e.route),b=_!==null&&["quick_fix","spec_backed","full_plan"].includes(_),$=qt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},L=b&&qt($[_])?$[_]:{};for(let P of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let M=zr(P,t,n,P==="impl_dispatch"?Rt(L.dispatch)||Rt(p.dispatch):Rt(p[P.replace("impl_","")]));u[P]=M.value===null?$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):$t(M.value,M.source,M.value,M.value,M.source==="base"?"default":"explicit")}let B=Rt(t.impl_runtime),G=B==="inherit"?Rt(e.controller_runtime):B,Q=_==="quick_fix"&&Rt(t.impl_dispatch)===null&&c.runtime!==null&&(B===null||G===c.runtime);if(Q){let P=c.runtime,M=i;u.impl_dispatch=$t("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(u.impl_runtime=$t(P,"global",`${P} (\uC720\uB3C4)`,P,"explicit")),Rt(t.impl_model)===null&&(u.impl_model=$t(M,"global",M,M,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let P of["impl_runtime","impl_model","impl_effort","impl_speed"])u[P]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!Q&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let P=u.impl_runtime.value==="inherit"?Rt(e.controller_runtime):u.impl_runtime.value,M=P?Gl(P,s,a):[];if(u.impl_model.value!=="auto"&&M.length>0&&!M.includes(u.impl_model.value))u.impl_model=la(u.impl_model);else{let O=ia(u.impl_model.value,P,s,a);u.impl_model.display=yr(O),u.impl_model.full_value=O}}if(u.impl_effort.value==="auto"){let P=Rt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),M=P?Rt(s.implementation?.effort_by_transport?.[P]?.auto):null;M&&!Ef.has(M)?(u.impl_effort.display=`${M} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=M,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?$t("default","base","default (\uC77C\uBC18)","default","default"):vr("default",u.impl_speed.source))}}else for(let d of Sf.filter(p=>!p.startsWith("orchestration_")))u[d]=zl(d,t,n);if(!s){for(let[d,p]of Object.entries(Wl))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=zl(d,t,n);continue}let p=d.replace("orchestration_",""),_=Rt(o[p]),b=zr(d,t,n,_);if(d==="orchestration_effort"&&b.source==="base"){u[d]=$t(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[d]=$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let $=b.source==="base"?Rt(o.model_id)||b.value:ia(b.value,null,s,a);u[d]=$t(b.value,b.source,yr($),$,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[d]=b.source==="base"?$t("default","base","default (\uC77C\uBC18)","default","default"):vr("default",b.source);continue}u[d]=vr(b.value,b.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=$t(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${yr(d)})`,null,"default")}else if(c.runtime!==null){let d=ia(i,c.runtime,s,a);u.quick_fix_impl_model=$t(i,"global",yr(d),d,"explicit")}else c.offered?u.quick_fix_impl_model=la($t(i,"global","",null,"explicit")):u.quick_fix_impl_model=vr(i,"global");return u}function If(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ks(e){let t=qt(e.pin)?e.pin:{},n=qt(e.global)?e.global:{},r=qt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=p=>{let _={...r,...p};return Qt({pin:e.layer==="pin"?_:t,global:e.layer==="pin"?n:_,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],u=Rt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:If(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:d.map(p=>{let _=s({...o,[e.key]:p})[e.key];return{value:p,label:_.display,full_value:_.full_value}})}}function wr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let c=!1,u=p=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(p))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",p=>{p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),d())}),t.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Ql="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function jt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var An=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Hr=[...An,"reasoning_output_tokens"],Of={codex:["implementation","review-consult"],claude:["subagent"]};function ca(e){let t=0;for(let n of An)t+=jt(e?.[n]);return t}function Lf(e){return!e||typeof e!="object"?!1:An.some(t=>Number.isFinite(e[t]))}function Vl(e){return!e||typeof e!="object"?!1:Hr.some(t=>Number.isFinite(e[t]))}function Mf(e){let t={};for(let n of Hr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Kl(e){let t={};for(let n of Hr)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Yl(e,t){return e==="codex"?jt(t.input_tokens)+jt(t.output_tokens):ca(t)}function Pf(e){return e==="claude"?"Claude":"Codex"}function Df(e){return`\u03C4 ${Xl(e)}`}function Nf(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${jt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${jt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${jt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${jt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${jt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${jt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${jt(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Ql),o.join(`
`)}function Bt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Pf(n)} ${Df(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Nf(n,r)})}return t}function Zs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of Hr)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=jt(i.breakdown[c])+jt(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ua(e){return!e||typeof e!="object"?null:ln({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function qf(e){return e==="codex"?"codex":"claude"}function yn(){return{subtotal:0,breakdown:Mf(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ys(e,t,n){e.subtotal+=t.subtotal;for(let r of Hr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=jt(e.breakdown[r])+jt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Zl(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Xl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function kr(e){return Lf(e)?`\u03C4 ${Xl(ca(e))}`:null}function Sn(e){let t=kr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Gr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${jt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${jt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${jt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${jt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${ca(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Ql),n.join(`
`)}function ln(e,t){let n={claude:yn(),codex:yn()},r={orchestrator:{claude:yn(),codex:yn()},implementation:{claude:yn(),codex:yn()},"review-consult":{claude:yn(),codex:yn()},subagent:{claude:yn(),codex:yn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Vl(c)){let d=qf(i.runner),p=Kl(c),_={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:p,subtotal:Yl(d,p)};p.replayed===!0&&(_.replayed=!0),typeof i.model=="string"&&(_.model=i.model),typeof i.session_id=="string"&&(_.session_id=i.session_id),Ys(n[d],_,!0),Ys(r.orchestrator[d],_,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Of[p].includes(d.role)||!Vl(d.usage))continue;let _=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let b=Kl(d.usage),$={provider:p,role:d.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:Yl(p,b)};$.receipt_id=_,typeof d.agent_type=="string"&&($.agent_type=d.agent_type),typeof d.agent_id=="string"&&($.agent_id=d.agent_id),typeof d.model=="string"&&($.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&($.effort=d.effort),typeof d.session_id=="string"?$.session_id=d.session_id:typeof d.thread_id=="string"&&($.session_id=d.thread_id),typeof d.turn_id=="string"&&($.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&($.completed_at=d.completed_at),b.replayed===!0&&($.replayed=!0),Ys(n[p],$,!1),Ys(r[$.role][p],$,!1)}}let o={};for(let i of["claude","codex"]){let c=n[i];if(c.legs.length===0)continue;let u=Zl(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let c={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(c[u]={...Zl(d,!0),legs:d.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:ic,setPrototypeOf:Jl,isFrozen:Ff,getPrototypeOf:jf,getOwnPropertyDescriptor:Bf}=Object,{freeze:Gt,seal:cn,create:ha}=Object,{apply:ba,construct:ya}=typeof Reflect<"u"&&Reflect;Gt||(Gt=function(t){return t});cn||(cn=function(t){return t});ba||(ba=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});ya||(ya=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var Qs=Vt(Array.prototype.forEach),Uf=Vt(Array.prototype.lastIndexOf),ec=Vt(Array.prototype.pop),Vr=Vt(Array.prototype.push),Wf=Vt(Array.prototype.splice),Js=Vt(String.prototype.toLowerCase),da=Vt(String.prototype.toString),pa=Vt(String.prototype.match),Kr=Vt(String.prototype.replace),zf=Vt(String.prototype.indexOf),Hf=Vt(String.prototype.trim),_n=Vt(Object.prototype.hasOwnProperty),Ht=Vt(RegExp.prototype.test),Yr=Gf(TypeError);function Vt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return ba(e,t,r)}}function Gf(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ya(e,n)}}function ct(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Js;Jl&&Jl(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(Ff(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Vf(e){for(let t=0;t<e.length;t++)_n(e,t)||(e[t]=null);return e}function En(e){let t=ha(null);for(let[n,r]of ic(e))_n(e,n)&&(Array.isArray(r)?t[n]=Vf(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=En(r):t[n]=r);return t}function Zr(e,t){for(;e!==null;){let r=Bf(e,t);if(r){if(r.get)return Vt(r.get);if(typeof r.value=="function")return Vt(r.value)}e=jf(e)}function n(){return null}return n}var tc=Gt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),fa=Gt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),_a=Gt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Kf=Gt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ma=Gt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Yf=Gt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),nc=Gt(["#text"]),rc=Gt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ga=Gt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),sc=Gt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Xs=Gt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Zf=cn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Qf=cn(/<%[\w\W]*|[\w\W]*%>/gm),Xf=cn(/\$\{[\w\W]*/gm),Jf=cn(/^data-[\-\w.\u00B7-\uFFFF]+$/),e_=cn(/^aria-[\-\w]+$/),lc=cn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),t_=cn(/^(?:\w+script|data):/i),n_=cn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),cc=cn(/^html$/i),r_=cn(/^[a-z][.\w]*(-[.\w]+)+$/i),oc=Object.freeze({__proto__:null,ARIA_ATTR:e_,ATTR_WHITESPACE:n_,CUSTOM_ELEMENT:r_,DATA_ATTR:Jf,DOCTYPE_NAME:cc,ERB_EXPR:Qf,IS_ALLOWED_URI:lc,IS_SCRIPT_OR_DATA:t_,MUSTACHE_EXPR:Zf,TMPLIT_EXPR:Xf}),Qr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},s_=function(){return typeof window>"u"?null:window},o_=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ac=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function uc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:s_(),t=ne=>uc(ne);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Qr.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:_,trustedTypes:b}=e,$=c.prototype,L=Zr($,"cloneNode"),B=Zr($,"remove"),G=Zr($,"nextSibling"),Q=Zr($,"childNodes"),P=Zr($,"parentNode");if(typeof a=="function"){let ne=n.createElement("template");ne.content&&ne.content.ownerDocument&&(n=ne.content.ownerDocument)}let M,O="",{implementation:U,createNodeIterator:w,createDocumentFragment:F,getElementsByTagName:J}=n,{importNode:Te}=r,Y=ac();t.isSupported=typeof ic=="function"&&typeof P=="function"&&U&&U.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ce,ERB_EXPR:he,TMPLIT_EXPR:Re,DATA_ATTR:Le,ARIA_ATTR:oe,IS_SCRIPT_OR_DATA:ie,ATTR_WHITESPACE:Me,CUSTOM_ELEMENT:N}=oc,{IS_ALLOWED_URI:se}=oc,ae=null,Se=ct({},[...tc,...fa,..._a,...ma,...nc]),Ie=null,Ne=ct({},[...rc,...ga,...sc,...Xs]),A=Object.seal(ha(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),fe=null,De=null,we=Object.seal(ha(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),We=!0,Ue=!0,Ge=!1,Xe=!0,st=!1,K=!0,Z=!1,Ce=!1,Ye=!1,He=!1,pe=!1,C=!1,X=!0,ye=!1,ee="user-content-",$e=!0,at=!1,ot={},Ze=null,pt=ct({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),mt=null,gt=ct({},["audio","video","img","source","image","track"]),it=null,yt=ct({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ze="http://www.w3.org/1998/Math/MathML",Qe="http://www.w3.org/2000/svg",Pe="http://www.w3.org/1999/xhtml",ht=Pe,xt=!1,V=null,_e=ct({},[ze,Qe,Pe],da),R=ct({},["mi","mo","mn","ms","mtext"]),m=ct({},["annotation-xml"]),E=ct({},["title","style","font","a","script"]),D=null,j=["application/xhtml+xml","text/html"],be="text/html",ve=null,xe=null,qe=n.createElement("form"),vt=function(x){return x instanceof RegExp||x instanceof Function},nt=function(){let x=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(xe&&xe===x)){if((!x||typeof x!="object")&&(x={}),x=En(x),D=j.indexOf(x.PARSER_MEDIA_TYPE)===-1?be:x.PARSER_MEDIA_TYPE,ve=D==="application/xhtml+xml"?da:Js,ae=_n(x,"ALLOWED_TAGS")?ct({},x.ALLOWED_TAGS,ve):Se,Ie=_n(x,"ALLOWED_ATTR")?ct({},x.ALLOWED_ATTR,ve):Ne,V=_n(x,"ALLOWED_NAMESPACES")?ct({},x.ALLOWED_NAMESPACES,da):_e,it=_n(x,"ADD_URI_SAFE_ATTR")?ct(En(yt),x.ADD_URI_SAFE_ATTR,ve):yt,mt=_n(x,"ADD_DATA_URI_TAGS")?ct(En(gt),x.ADD_DATA_URI_TAGS,ve):gt,Ze=_n(x,"FORBID_CONTENTS")?ct({},x.FORBID_CONTENTS,ve):pt,fe=_n(x,"FORBID_TAGS")?ct({},x.FORBID_TAGS,ve):En({}),De=_n(x,"FORBID_ATTR")?ct({},x.FORBID_ATTR,ve):En({}),ot=_n(x,"USE_PROFILES")?x.USE_PROFILES:!1,We=x.ALLOW_ARIA_ATTR!==!1,Ue=x.ALLOW_DATA_ATTR!==!1,Ge=x.ALLOW_UNKNOWN_PROTOCOLS||!1,Xe=x.ALLOW_SELF_CLOSE_IN_ATTR!==!1,st=x.SAFE_FOR_TEMPLATES||!1,K=x.SAFE_FOR_XML!==!1,Z=x.WHOLE_DOCUMENT||!1,He=x.RETURN_DOM||!1,pe=x.RETURN_DOM_FRAGMENT||!1,C=x.RETURN_TRUSTED_TYPE||!1,Ye=x.FORCE_BODY||!1,X=x.SANITIZE_DOM!==!1,ye=x.SANITIZE_NAMED_PROPS||!1,$e=x.KEEP_CONTENT!==!1,at=x.IN_PLACE||!1,se=x.ALLOWED_URI_REGEXP||lc,ht=x.NAMESPACE||Pe,R=x.MATHML_TEXT_INTEGRATION_POINTS||R,m=x.HTML_INTEGRATION_POINTS||m,A=x.CUSTOM_ELEMENT_HANDLING||{},x.CUSTOM_ELEMENT_HANDLING&&vt(x.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(A.tagNameCheck=x.CUSTOM_ELEMENT_HANDLING.tagNameCheck),x.CUSTOM_ELEMENT_HANDLING&&vt(x.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(A.attributeNameCheck=x.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),x.CUSTOM_ELEMENT_HANDLING&&typeof x.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(A.allowCustomizedBuiltInElements=x.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),st&&(Ue=!1),pe&&(He=!0),ot&&(ae=ct({},nc),Ie=[],ot.html===!0&&(ct(ae,tc),ct(Ie,rc)),ot.svg===!0&&(ct(ae,fa),ct(Ie,ga),ct(Ie,Xs)),ot.svgFilters===!0&&(ct(ae,_a),ct(Ie,ga),ct(Ie,Xs)),ot.mathMl===!0&&(ct(ae,ma),ct(Ie,sc),ct(Ie,Xs))),x.ADD_TAGS&&(typeof x.ADD_TAGS=="function"?we.tagCheck=x.ADD_TAGS:(ae===Se&&(ae=En(ae)),ct(ae,x.ADD_TAGS,ve))),x.ADD_ATTR&&(typeof x.ADD_ATTR=="function"?we.attributeCheck=x.ADD_ATTR:(Ie===Ne&&(Ie=En(Ie)),ct(Ie,x.ADD_ATTR,ve))),x.ADD_URI_SAFE_ATTR&&ct(it,x.ADD_URI_SAFE_ATTR,ve),x.FORBID_CONTENTS&&(Ze===pt&&(Ze=En(Ze)),ct(Ze,x.FORBID_CONTENTS,ve)),$e&&(ae["#text"]=!0),Z&&ct(ae,["html","head","body"]),ae.table&&(ct(ae,["tbody"]),delete fe.tbody),x.TRUSTED_TYPES_POLICY){if(typeof x.TRUSTED_TYPES_POLICY.createHTML!="function")throw Yr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof x.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Yr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=x.TRUSTED_TYPES_POLICY,O=M.createHTML("")}else M===void 0&&(M=o_(b,s)),M!==null&&typeof O=="string"&&(O=M.createHTML(""));Gt&&Gt(x),xe=x}},Je=ct({},[...fa,..._a,...Kf]),At=ct({},[...ma,...Yf]),Yt=function(x){let le=P(x);(!le||!le.tagName)&&(le={namespaceURI:ht,tagName:"template"});let Ae=Js(x.tagName),lt=Js(le.tagName);return V[x.namespaceURI]?x.namespaceURI===Qe?le.namespaceURI===Pe?Ae==="svg":le.namespaceURI===ze?Ae==="svg"&&(lt==="annotation-xml"||R[lt]):!!Je[Ae]:x.namespaceURI===ze?le.namespaceURI===Pe?Ae==="math":le.namespaceURI===Qe?Ae==="math"&&m[lt]:!!At[Ae]:x.namespaceURI===Pe?le.namespaceURI===Qe&&!m[lt]||le.namespaceURI===ze&&!R[lt]?!1:!At[Ae]&&(E[Ae]||!Je[Ae]):!!(D==="application/xhtml+xml"&&V[x.namespaceURI]):!1},je=function(x){Vr(t.removed,{element:x});try{P(x).removeChild(x)}catch{B(x)}},Mt=function(x,le){try{Vr(t.removed,{attribute:le.getAttributeNode(x),from:le})}catch{Vr(t.removed,{attribute:null,from:le})}if(le.removeAttribute(x),x==="is")if(He||pe)try{je(le)}catch{}else try{le.setAttribute(x,"")}catch{}},Nt=function(x){let le=null,Ae=null;if(Ye)x="<remove></remove>"+x;else{let _t=pa(x,/^[\r\n\t ]+/);Ae=_t&&_t[0]}D==="application/xhtml+xml"&&ht===Pe&&(x='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+x+"</body></html>");let lt=M?M.createHTML(x):x;if(ht===Pe)try{le=new _().parseFromString(lt,D)}catch{}if(!le||!le.documentElement){le=U.createDocument(ht,"template",null);try{le.documentElement.innerHTML=xt?O:lt}catch{}}let Ct=le.body||le.documentElement;return x&&Ae&&Ct.insertBefore(n.createTextNode(Ae),Ct.childNodes[0]||null),ht===Pe?J.call(le,Z?"html":"body")[0]:Z?le.documentElement:Ct},Ut=function(x){return w.call(x.ownerDocument||x,x,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Ot=function(x){return x instanceof p&&(typeof x.nodeName!="string"||typeof x.textContent!="string"||typeof x.removeChild!="function"||!(x.attributes instanceof d)||typeof x.removeAttribute!="function"||typeof x.setAttribute!="function"||typeof x.namespaceURI!="string"||typeof x.insertBefore!="function"||typeof x.hasChildNodes!="function")},Wt=function(x){return typeof i=="function"&&x instanceof i};function y(ne,x,le){Qs(ne,Ae=>{Ae.call(t,x,le,xe)})}let v=function(x){let le=null;if(y(Y.beforeSanitizeElements,x,null),Ot(x))return je(x),!0;let Ae=ve(x.nodeName);if(y(Y.uponSanitizeElement,x,{tagName:Ae,allowedTags:ae}),K&&x.hasChildNodes()&&!Wt(x.firstElementChild)&&Ht(/<[/\w!]/g,x.innerHTML)&&Ht(/<[/\w!]/g,x.textContent)||x.nodeType===Qr.progressingInstruction||K&&x.nodeType===Qr.comment&&Ht(/<[/\w]/g,x.data))return je(x),!0;if(!(we.tagCheck instanceof Function&&we.tagCheck(Ae))&&(!ae[Ae]||fe[Ae])){if(!fe[Ae]&&W(Ae)&&(A.tagNameCheck instanceof RegExp&&Ht(A.tagNameCheck,Ae)||A.tagNameCheck instanceof Function&&A.tagNameCheck(Ae)))return!1;if($e&&!Ze[Ae]){let lt=P(x)||x.parentNode,Ct=Q(x)||x.childNodes;if(Ct&&lt){let _t=Ct.length;for(let Pt=_t-1;Pt>=0;--Pt){let f=L(Ct[Pt],!0);f.__removalCount=(x.__removalCount||0)+1,lt.insertBefore(f,G(x))}}}return je(x),!0}return x instanceof c&&!Yt(x)||(Ae==="noscript"||Ae==="noembed"||Ae==="noframes")&&Ht(/<\/no(script|embed|frames)/i,x.innerHTML)?(je(x),!0):(st&&x.nodeType===Qr.text&&(le=x.textContent,Qs([ce,he,Re],lt=>{le=Kr(le,lt," ")}),x.textContent!==le&&(Vr(t.removed,{element:x.cloneNode()}),x.textContent=le)),y(Y.afterSanitizeElements,x,null),!1)},I=function(x,le,Ae){if(X&&(le==="id"||le==="name")&&(Ae in n||Ae in qe))return!1;if(!(Ue&&!De[le]&&Ht(Le,le))){if(!(We&&Ht(oe,le))){if(!(we.attributeCheck instanceof Function&&we.attributeCheck(le,x))){if(!Ie[le]||De[le]){if(!(W(x)&&(A.tagNameCheck instanceof RegExp&&Ht(A.tagNameCheck,x)||A.tagNameCheck instanceof Function&&A.tagNameCheck(x))&&(A.attributeNameCheck instanceof RegExp&&Ht(A.attributeNameCheck,le)||A.attributeNameCheck instanceof Function&&A.attributeNameCheck(le,x))||le==="is"&&A.allowCustomizedBuiltInElements&&(A.tagNameCheck instanceof RegExp&&Ht(A.tagNameCheck,Ae)||A.tagNameCheck instanceof Function&&A.tagNameCheck(Ae))))return!1}else if(!it[le]){if(!Ht(se,Kr(Ae,Me,""))){if(!((le==="src"||le==="xlink:href"||le==="href")&&x!=="script"&&zf(Ae,"data:")===0&&mt[x])){if(!(Ge&&!Ht(ie,Kr(Ae,Me,"")))){if(Ae)return!1}}}}}}}return!0},W=function(x){return x!=="annotation-xml"&&pa(x,N)},re=function(x){y(Y.beforeSanitizeAttributes,x,null);let{attributes:le}=x;if(!le||Ot(x))return;let Ae={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ie,forceKeepAttr:void 0},lt=le.length;for(;lt--;){let Ct=le[lt],{name:_t,namespaceURI:Pt,value:f}=Ct,S=ve(_t),H=f,g=_t==="value"?H:Hf(H);if(Ae.attrName=S,Ae.attrValue=g,Ae.keepAttr=!0,Ae.forceKeepAttr=void 0,y(Y.uponSanitizeAttribute,x,Ae),g=Ae.attrValue,ye&&(S==="id"||S==="name")&&(Mt(_t,x),g=ee+g),K&&Ht(/((--!?|])>)|<\/(style|title|textarea)/i,g)){Mt(_t,x);continue}if(S==="attributename"&&pa(g,"href")){Mt(_t,x);continue}if(Ae.forceKeepAttr)continue;if(!Ae.keepAttr){Mt(_t,x);continue}if(!Xe&&Ht(/\/>/i,g)){Mt(_t,x);continue}st&&Qs([ce,he,Re],de=>{g=Kr(g,de," ")});let k=ve(x.nodeName);if(!I(k,S,g)){Mt(_t,x);continue}if(M&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Pt)switch(b.getAttributeType(k,S)){case"TrustedHTML":{g=M.createHTML(g);break}case"TrustedScriptURL":{g=M.createScriptURL(g);break}}if(g!==H)try{Pt?x.setAttributeNS(Pt,_t,g):x.setAttribute(_t,g),Ot(x)?je(x):ec(t.removed)}catch{Mt(_t,x)}}y(Y.afterSanitizeAttributes,x,null)},ke=function ne(x){let le=null,Ae=Ut(x);for(y(Y.beforeSanitizeShadowDOM,x,null);le=Ae.nextNode();)y(Y.uponSanitizeShadowNode,le,null),v(le),re(le),le.content instanceof o&&ne(le.content);y(Y.afterSanitizeShadowDOM,x,null)};return t.sanitize=function(ne){let x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},le=null,Ae=null,lt=null,Ct=null;if(xt=!ne,xt&&(ne="<!-->"),typeof ne!="string"&&!Wt(ne))if(typeof ne.toString=="function"){if(ne=ne.toString(),typeof ne!="string")throw Yr("dirty is not a string, aborting")}else throw Yr("toString is not a function");if(!t.isSupported)return ne;if(Ce||nt(x),t.removed=[],typeof ne=="string"&&(at=!1),at){if(ne.nodeName){let f=ve(ne.nodeName);if(!ae[f]||fe[f])throw Yr("root node is forbidden and cannot be sanitized in-place")}}else if(ne instanceof i)le=Nt("<!---->"),Ae=le.ownerDocument.importNode(ne,!0),Ae.nodeType===Qr.element&&Ae.nodeName==="BODY"||Ae.nodeName==="HTML"?le=Ae:le.appendChild(Ae);else{if(!He&&!st&&!Z&&ne.indexOf("<")===-1)return M&&C?M.createHTML(ne):ne;if(le=Nt(ne),!le)return He?null:C?O:""}le&&Ye&&je(le.firstChild);let _t=Ut(at?ne:le);for(;lt=_t.nextNode();)v(lt),re(lt),lt.content instanceof o&&ke(lt.content);if(at)return ne;if(He){if(pe)for(Ct=F.call(le.ownerDocument);le.firstChild;)Ct.appendChild(le.firstChild);else Ct=le;return(Ie.shadowroot||Ie.shadowrootmode)&&(Ct=Te.call(r,Ct,!0)),Ct}let Pt=Z?le.outerHTML:le.innerHTML;return Z&&ae["!doctype"]&&le.ownerDocument&&le.ownerDocument.doctype&&le.ownerDocument.doctype.name&&Ht(cc,le.ownerDocument.doctype.name)&&(Pt="<!DOCTYPE "+le.ownerDocument.doctype.name+`>
`+Pt),st&&Qs([ce,he,Re],f=>{Pt=Kr(Pt,f," ")}),M&&C?M.createHTML(Pt):Pt},t.setConfig=function(){let ne=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};nt(ne),Ce=!0},t.clearConfig=function(){xe=null,Ce=!1},t.isValidAttribute=function(ne,x,le){xe||nt({});let Ae=ve(ne),lt=ve(x);return I(Ae,lt,le)},t.addHook=function(ne,x){typeof x=="function"&&Vr(Y[ne],x)},t.removeHook=function(ne,x){if(x!==void 0){let le=Uf(Y[ne],x);return le===-1?void 0:Wf(Y[ne],le,1)[0]}return ec(Y[ne])},t.removeHooks=function(ne){Y[ne]=[]},t.removeAllHooks=function(){Y=ac()},t}var dc=uc();var Tn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},eo=e=>(...t)=>({_$litDirective$:e,values:t}),$r=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Xr=class extends $r{constructor(t){if(super(t),this.it=Lt,t.type!==Tn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Lt||t==null)return this._t=void 0,this.it=t;if(t===on)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Xr.directiveName="unsafeHTML",Xr.resultType=1;var pc=eo(Xr);function $a(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var sr=$a();function yc(e){sr=e}var ns={exec:()=>null};function ft(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Kt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var a_=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Kt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},i_=/^(?:[ \t]*(?:\n|$))+/,l_=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,c_=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,rs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,u_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,xa=/(?:[*+-]|\d{1,9}[.)])/,vc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,wc=ft(vc).replace(/bull/g,xa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),d_=ft(vc).replace(/bull/g,xa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Aa=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,p_=/^[^\n]+/,Sa=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,f_=ft(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Sa).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),__=ft(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,xa).getRegex(),ao="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ea=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,m_=ft("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ea).replace("tag",ao).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),kc=ft(Aa).replace("hr",rs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ao).getRegex(),g_=ft(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",kc).getRegex(),Ta={blockquote:g_,code:l_,def:f_,fences:c_,heading:u_,hr:rs,html:m_,lheading:wc,list:__,newline:i_,paragraph:kc,table:ns,text:p_},fc=ft("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",rs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ao).getRegex(),h_={...Ta,lheading:d_,table:fc,paragraph:ft(Aa).replace("hr",rs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",fc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ao).getRegex()},b_={...Ta,html:ft(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ea).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ns,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ft(Aa).replace("hr",rs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",wc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},y_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,v_=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,$c=/^( {2,}|\\)\n(?!\s*$)/,w_=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,io=/[\p{P}\p{S}]/u,Ca=/[\s\p{P}\p{S}]/u,xc=/[^\s\p{P}\p{S}]/u,k_=ft(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ca).getRegex(),Ac=/(?!~)[\p{P}\p{S}]/u,$_=/(?!~)[\s\p{P}\p{S}]/u,x_=/(?:[^\s\p{P}\p{S}]|~)/u,A_=ft(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",a_?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Sc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,S_=ft(Sc,"u").replace(/punct/g,io).getRegex(),E_=ft(Sc,"u").replace(/punct/g,Ac).getRegex(),Ec="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",T_=ft(Ec,"gu").replace(/notPunctSpace/g,xc).replace(/punctSpace/g,Ca).replace(/punct/g,io).getRegex(),C_=ft(Ec,"gu").replace(/notPunctSpace/g,x_).replace(/punctSpace/g,$_).replace(/punct/g,Ac).getRegex(),R_=ft("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,xc).replace(/punctSpace/g,Ca).replace(/punct/g,io).getRegex(),I_=ft(/\\(punct)/,"gu").replace(/punct/g,io).getRegex(),O_=ft(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),L_=ft(Ea).replace("(?:-->|$)","-->").getRegex(),M_=ft("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",L_).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ro=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,P_=ft(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ro).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Tc=ft(/^!?\[(label)\]\[(ref)\]/).replace("label",ro).replace("ref",Sa).getRegex(),Cc=ft(/^!?\[(ref)\](?:\[\])?/).replace("ref",Sa).getRegex(),D_=ft("reflink|nolink(?!\\()","g").replace("reflink",Tc).replace("nolink",Cc).getRegex(),_c=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ra={_backpedal:ns,anyPunctuation:I_,autolink:O_,blockSkip:A_,br:$c,code:v_,del:ns,emStrongLDelim:S_,emStrongRDelimAst:T_,emStrongRDelimUnd:R_,escape:y_,link:P_,nolink:Cc,punctuation:k_,reflink:Tc,reflinkSearch:D_,tag:M_,text:w_,url:ns},N_={...Ra,link:ft(/^!?\[(label)\]\((.*?)\)/).replace("label",ro).getRegex(),reflink:ft(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ro).getRegex()},va={...Ra,emStrongRDelimAst:C_,emStrongLDelim:E_,url:ft(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",_c).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ft(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",_c).getRegex()},q_={...va,br:ft($c).replace("{2,}","*").getRegex(),text:ft(va.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},to={normal:Ta,gfm:h_,pedantic:b_},Jr={normal:Ra,gfm:va,breaks:q_,pedantic:N_},F_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},mc=e=>F_[e];function Cn(e,t){if(t){if(Kt.escapeTest.test(e))return e.replace(Kt.escapeReplace,mc)}else if(Kt.escapeTestNoEncode.test(e))return e.replace(Kt.escapeReplaceNoEncode,mc);return e}function gc(e){try{e=encodeURI(e).replace(Kt.percentDecode,"%")}catch{return null}return e}function hc(e,t){let n=e.replace(Kt.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),r=n.split(Kt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Kt.slashPipe,"|");return r}function es(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function j_(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function bc(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,c}function B_(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var so=class{constructor(e){wt(this,"options");wt(this,"rules");wt(this,"lexer");this.options=e||sr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:es(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=B_(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=es(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:es(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=es(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))i.push(n[c]),a=!0;else if(!a)i.push(n[c]);else break;n=n.slice(c);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=p,n.length===0)break;let _=o.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let b=_,$=b.raw+`
`+n.join(`
`),L=this.blockquote($);o[o.length-1]=L,r=r.substring(0,r.length-b.raw.length)+L.raw,s=s.substring(0,s.length-b.text.length)+L.text;break}else if(_?.type==="list"){let b=_,$=b.raw+`
`+n.join(`
`),L=this.list($);o[o.length-1]=L,r=r.substring(0,r.length-_.raw.length)+L.raw,s=s.substring(0,s.length-b.raw.length)+L.raw,n=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),_=e.split(`
`,1)[0],b=!p.trim(),$=0;if(this.options.pedantic?($=2,d=p.trimStart()):b?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,d=p.slice($),$+=t[1].length),b&&this.rules.other.blankLine.test(_)&&(u+=_+`
`,e=e.substring(_.length+1),c=!0),!c){let L=this.rules.other.nextBulletRegex($),B=this.rules.other.hrRegex($),G=this.rules.other.fencesBeginRegex($),Q=this.rules.other.headingBeginRegex($),P=this.rules.other.htmlBeginRegex($);for(;e;){let M=e.split(`
`,1)[0],O;if(_=M,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),O=_):O=_.replace(this.rules.other.tabCharGlobal,"    "),G.test(_)||Q.test(_)||P.test(_)||L.test(_)||B.test(_))break;if(O.search(this.rules.other.nonSpaceChar)>=$||!_.trim())d+=`
`+O.slice($);else{if(b||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||G.test(p)||Q.test(p)||B.test(p))break;d+=`
`+_}!b&&!_.trim()&&(b=!0),u+=M+`
`,e=e.substring(M.length+1),p=O.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=d.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=d.raw+c.tokens[0].raw,c.tokens[0].text=d.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(d)):c.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):c.tokens.unshift(d)}}if(!s.loose){let u=c.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=d}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=hc(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(hc(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=es(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=j_(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),bc(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return bc(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,c=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let d=[...r[0]][0].length,p=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let b=p.slice(1,-1);return{type:"em",raw:p,text:b,tokens:this.lexer.inlineTokens(b)}}let _=p.slice(2,-2);return{type:"strong",raw:p,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},mn=class wa{constructor(t){wt(this,"tokens");wt(this,"options");wt(this,"state");wt(this,"inlineQueue");wt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||sr,this.options.tokenizer=this.options.tokenizer||new so,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Kt,block:to.normal,inline:Jr.normal};this.options.pedantic?(n.block=to.pedantic,n.inline=Jr.pedantic):this.options.gfm&&(n.block=to.gfm,this.options.breaks?n.inline=Jr.breaks:n.inline=Jr.gfm),this.tokenizer.rules=n}static get rules(){return{block:to,inline:Jr}}static lex(t,n){return new wa(n).lex(t)}static lexInline(t,n){return new wa(n).inlineTokens(t)}lex(t){t=t.replace(Kt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(Kt.tabCharGlobal,"    ").replace(Kt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(d=>(c=d.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let d=n.at(-1);c.type==="text"&&d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,i)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),_;this.options.extensions.startInline.forEach(b=>{_=b.call({lexer:this},p),typeof _=="number"&&_>=0&&(d=Math.min(d,_))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):n.push(c);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},oo=class{constructor(e){wt(this,"options");wt(this,"parser");this.options=e||sr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Kt.notSpaceStart)?.[0],s=e.replace(Kt.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Cn(r)+'">'+(n?s:Cn(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Cn(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Cn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=gc(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Cn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=gc(e);if(s===null)return Cn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Cn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Cn(e.text)}},Ia=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},gn=class ka{constructor(t){wt(this,"options");wt(this,"renderer");wt(this,"textRenderer");this.options=t||sr,this.options.renderer=this.options.renderer||new oo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ia}static parse(t,n){return new ka(n).parse(t)}static parseInline(t,n){return new ka(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},no,ts=(no=class{constructor(e){wt(this,"options");wt(this,"block");this.options=e||sr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?mn.lex:mn.lexInline}provideParser(){return this.block?gn.parse:gn.parseInline}},wt(no,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),wt(no,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),no),U_=class{constructor(...e){wt(this,"defaults",$a());wt(this,"options",this.setOptions);wt(this,"parse",this.parseMarkdown(!0));wt(this,"parseInline",this.parseMarkdown(!1));wt(this,"Parser",gn);wt(this,"Renderer",oo);wt(this,"TextRenderer",Ia);wt(this,"Lexer",mn);wt(this,"Tokenizer",so);wt(this,"Hooks",ts);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new oo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new so(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new ts;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],c=s[a];ts.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&ts.passThroughHooksRespectAsync.has(o))return(async()=>{let p=await i.call(s,u);return c.call(s,p)})();let d=i.call(s,u);return c.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await i.apply(s,u);return p===!1&&(p=await c.apply(s,u)),p})();let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return mn.lex(e,t??this.defaults)}parser(e,t){return gn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?mn.lex:mn.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?gn.parse:gn.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?mn.lex:mn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?gn.parse:gn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Cn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},rr=new U_;function bt(e,t){return rr.parse(e,t)}bt.options=bt.setOptions=function(e){return rr.setOptions(e),bt.defaults=rr.defaults,yc(bt.defaults),bt};bt.getDefaults=$a;bt.defaults=sr;bt.use=function(...e){return rr.use(...e),bt.defaults=rr.defaults,yc(bt.defaults),bt};bt.walkTokens=function(e,t){return rr.walkTokens(e,t)};bt.parseInline=rr.parseInline;bt.Parser=gn;bt.parser=gn.parse;bt.Renderer=oo;bt.TextRenderer=Ia;bt.Lexer=mn;bt.lexer=mn.lex;bt.Tokenizer=so;bt.Hooks=ts;bt.parse=bt;var Zy=bt.options,Qy=bt.setOptions,Xy=bt.use,Jy=bt.walkTokens,ev=bt.parseInline;var tv=gn.parse,nv=mn.lex;function qn(e){let t=bt.parse(e),n=dc.sanitize(t);return pc(n)}function Rn(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function xr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function lo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Ic={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},W_={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},z_=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,H_=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function vn(e){return!!e&&typeof e=="object"}function Oa(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function La(e,t){let n=Oa(e),r=Oa(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Oc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>vn(s)&&typeof s.text=="string"?s.text:"").join(""):vn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function G_(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Ic[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Oa(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=La(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let c=La(vn(i)?i.old_string:"",vn(i)?i.new_string:"");s+=c.added,o+=c.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Ma(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Pa(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=z_.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:H_.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function V_(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(vn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(Pa(a.text));else if(a.type==="thinking"){let i=Ma(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=G_(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?Rc(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(vn(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=Oc(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Rc([s],n):[s]}return[]}function Rc(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function K_(e){let t=typeof e.command=="string"?e.command:"",n=Oc(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Ic.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Y_(e){if(e.type==="item.completed"&&vn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Pa(t.text)];if(t.type==="reasoning"){let n=Ma(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[K_(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Z_(e){if(e.schema!=="codex-delegation-monitor-v1"||!vn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&vn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Pa(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Ma(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=W_[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Q_(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function X_(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return vn(t)?t:null}function Lc(e={}){let t=e.skip_delegated===!0,n=new Map;return{push(r){let s=X_(r);return s?t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0?[]:s.schema==="codex-delegation-monitor-v1"?Z_(s):Q_(s)?Y_(s):V_(s,n):[]}}}function Da(e){let t=[],n=Lc(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var J_=5,em=10,tm=/Task\s+#(\d+)/,nm=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,rm=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function co(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function sm(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function om(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function am(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=tm.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function im(e){if(e.tool==="Bash"){let t=e.command||"";return nm.test(t)?"~ PR/\uAC8C\uC2DC \uC911":rm.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function lm(e){let t=e.filter(s=>s.kind==="tool").slice(-em),n=new Map;t.forEach((s,o)=>{let a=im(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function cm(e){let t=om(e);if(t)return{text:t,guess:!1};let n=am(e);if(n)return{text:n,guess:!1};let r=lm(e);return r?{text:r,guess:!0}:null}function um(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:tn(e,t)}function Ar(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,c=null,u=!1,d={},p=!0,_=new Set,b=new Set,$=null,L=null,B=!1,G=!1,Q=!1,P=null,M=null;function O(){B=!1,G=!1,Q=!1,P=null,M=null}async function U(K){if(n){G=!0,Q=!1,A();try{let Z=await Promise.resolve(n("get-attempt-prompt",{attempt_id:K,...c?{root_dir:c}:{}}));if(o!==K)return;!Z||typeof Z!="object"||Array.isArray(Z)?Q=!0:(P=Z,M=K)}catch{o===K&&(Q=!0)}finally{o===K&&(G=!1,A())}}}function w(){if(B=!B,B&&o&&M!==o){U(o);return}A()}function F(){if(!B)return"";let K=xr({loading:G,error:Q});if(K)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${K}
      </div>`;if(!P)return"";if(P.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Z=lo(P.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Z?l`<div class="prompt-block__meta">${Z} 발송</div>`:""}
      ${typeof P.task_prompt=="string"?Rn("\uACFC\uC5C5 (user)",P.task_prompt):""}
      ${typeof P.system_prompt=="string"?Rn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",P.system_prompt):""}
    </div>`}function J(){if(!i||!r)return[];let K=r.get(i);return Da(K?K.lines:[])}function Te(){if(!i||!r)return null;let K=r.get(i),Z=K?K.last_event_at:null;return typeof Z=="number"?Z:null}function Y(){return d.status==="running"}function ce(){if(Y()&&o){L||(L=setInterval(()=>A(),1e3));return}he()}function he(){L&&(clearInterval(L),L=null)}function Re(K){let Z=[],Ce=0;for(;Ce<K.length;){let{idx:Ye,line:He}=K[Ce];if(He.kind==="tool"){let pe=Ce;for(;pe<K.length&&K[pe].line.kind==="tool"&&K[pe].line.tool===He.tool;)pe+=1;if(pe-Ce>=J_&&!b.has(Ye)){Z.push({kind:"group",idx:Ye,tool:He.tool||"",lines:K.slice(Ce,pe)}),Ce=pe;continue}}Z.push({kind:"line",idx:Ye,line:He}),Ce+=1}return Z}function Le(K){let Z=[],Ce=new Map;for(let pe=0;pe<K.length;pe+=1){let C=K[pe],X=C.parent_tool_use_id;if(typeof X=="string"&&X.length>0){let ye=Ce.get(X);ye||(ye={kind:"subagent",idx:pe,launch_id:X,agent_type:null,header:null,lines:[]},Ce.set(X,ye),Z.push(ye)),ye.lines.push({idx:pe,line:C});continue}if(C.kind==="tool"&&C.tool==="Agent"&&typeof C.launch_id=="string"&&C.launch_id.length>0){let ye=oe(C),ee=Ce.get(C.launch_id);if(ee){ee.header={idx:pe,line:C},ee.agent_type=ye;continue}let $e={kind:"subagent",idx:pe,launch_id:C.launch_id,agent_type:ye,header:{idx:pe,line:C},lines:[]};Ce.set(C.launch_id,$e),Z.push($e);continue}Z.push({kind:"entry",idx:pe,line:C})}let Ye=[],He=0;for(;He<Z.length;){if(Z[He].kind!=="entry"){Ye.push(Z[He]),He+=1;continue}let pe=He;for(;pe<Z.length&&Z[pe].kind==="entry";)pe+=1;Ye.push(...Re(Z.slice(He,pe))),He=pe}return Ye}function oe(K){let Z=K.input;return Z&&typeof Z.subagent_type=="string"?Z.subagent_type:null}function ie(K){for(let Z=K.length-1;Z>=0;Z-=1){let Ce=K[Z];if(Ce.kind==="result"||Ce.kind==="error")return null;if(Ce.kind==="tool"&&!Object.hasOwn(Ce,"result"))return Ce}return null}function Me(K){for(let Z=K.length-1;Z>=0;Z-=1)if(K[Z].kind==="thinking")return K[Z];return null}function N(K,Z){if(Z.kind==="gate")return l`<div class="sv__gate">${Z.text}</div>`;if(Z.kind==="phase")return l`<div class="sv__phase">${Z.text}</div>`;if(Z.kind==="result")return l`<div
        class="sv__result${Z.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Z.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${qn(Z.text||(Z.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Z.kind==="thinking"){let Ce=_.has(K);return l`<div
        class="sv__think${Ce?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>De(K)}
      >
        <span class="sv__think-line">💭 ${co(Z.text)}</span>
        ${Ce?l`<pre class="sv__think-expand">${Z.text}</pre>`:""}
      </div>`}if(Z.kind==="error")return l`<div class="sv__error">⛔ ${Z.text}</div>`;if(Z.kind==="blocker")return l`<div class="sv__error">⛔ ${Z.text}</div>`;if(Z.kind==="tool"){let Ce=_.has(K),Ye=Z.tool==="Bash"?sm(Z.command):0,He=Z.tool==="Bash"?Ye>1?co(Z.command):Z.command:Z.path||Z.command||"";return l`<div
        class="sv__tool${Ce?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>De(K)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Z.icon}</span>
          <span class="sv__tool-name">${Z.tool}</span>
          ${He?l`<span class="sv__tool-detail">${He}</span>`:""}
          ${Ye>1?l`<span class="sv__tool-more">⋯ ${Ye}줄</span>`:""}
          ${typeof Z.added=="number"?l`<span class="sv__diff-add">+${Z.added}</span>`:""}
          ${typeof Z.removed=="number"?l`<span class="sv__diff-del">−${Z.removed}</span>`:""}
          ${Z.result?l`<span class="sv__tool-ok">→ ${Z.result}</span>`:""}
        </span>
        ${Ce?l`<pre class="sv__tool-expand">${se(Z)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${qn(Z.text||"")}</div>`}function se(K){let Z=[];if(K.tool==="Bash"&&typeof K.command=="string"&&K.command.length>0)Z.push(K.command);else if(K.input!==void 0)try{Z.push(`input: ${JSON.stringify(K.input,null,2)}`)}catch{}return typeof K.output=="string"&&K.output.length>0&&Z.push(`output:
${K.output}`),Z.join(`

`)}function ae(){if(!o)return l``;let K=J(),Z=(a?[d.agent_type,d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),Ce=d.session_id||"",Ye=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,He=Y(),pe=He?um(Te(),Date.now()):"",C=He?ie(K):null,X=He?Me(K):null,ye=cm(K);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${ye?l`<span
              class="sv__stage${ye.guess?" sv__stage--guess":""}"
              title=${ye.text}
              >${ye.text}</span
            >`:""}
        ${He?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${pe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${pe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${pe?l`<span class="sv__live-ago">${pe}</span>`:""}</span
            >`:""}
        ${Ce?l`<button
              type="button"
              class="sv__session"
              title=${Ce}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ce}`}
              @click=${()=>We(Ce)}
            >
              ⧉ ${Ce.slice(0,8)}
            </button>`:""}
        ${Z?l`<span class="sv__meta">${Z}</span>`:""}
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
              @click=${w}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${p?" sv__follow--on":""}"
          aria-pressed=${p?"true":"false"}
          aria-label=${Ye}
          @click=${we}
        >
          <span class="sv__follow-full">⇣ ${Ye}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>st()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":F()}
      <div class="sv__body">
        ${K.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:Le(K).map(ee=>ee.kind==="subagent"?Ie(ee):ee.kind==="group"?Se(ee):N(ee.idx,ee.line))}
      </div>
      ${C||X?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${C?l`<span class="sv__now-icon">${C.icon}</span>
                  <span class="sv__now-name">${C.tool}</span>
                  <span class="sv__now-detail"
                    >${C.tool==="Bash"?co(C.command):C.path||C.command||""}</span
                  >`:""}
            ${X?l`<span class="sv__now-think"
                  >💭 ${co(X.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Se(K){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ne(K.idx)}
    >
      <span class="sv__group-icon">${K.lines[0].line.icon}</span>
      <span class="sv__group-name">${K.tool}</span>
      <span class="sv__group-count">${K.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ie(K){let Z=b.has(K.idx),Ce=K.header?K.header.line:null,Ye=Ce?Ce.is_error===!0?"\u2717":typeof Ce.result=="string"?"\u2713":"\u27F3":"",He=Ce&&Ce.command?Ce.command:"";return l`<div class="sv__sub${Z?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ne(K.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${K.agent_type||"subagent"}</span>
        ${He?l`<span class="sv__sub-detail">${He}</span>`:""}
        <span class="sv__sub-count">${K.lines.length}줄</span>
        ${Ye?l`<span class="sv__sub-state">${Ye}</span>`:""}
        ${Z?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Z?l`<div class="sv__sub-body">
            ${Re(K.lines).map(pe=>pe.kind==="group"?Se(pe):N(pe.idx,pe.line))}
          </div>`:""}
    </div>`}function Ne(K){b.add(K),A()}function A(){Ke(ae(),e),ce(),p&&fe()}function fe(){let K=e.querySelector(".sv__body");K&&(K.scrollTop=K.scrollHeight)}function De(K){_.has(K)?_.delete(K):_.add(K),A()}function we(){p=!p,A()}function We(K){nn(K).then(Z=>{Z?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ue(K){!o||!K||(d={...d,...K},A())}function Ge(K){let Z=K.target;if(!Z||!Z.classList||!Z.classList.contains("sv__body"))return;!(Z.scrollHeight-Z.scrollTop-Z.clientHeight<=4)&&p&&(p=!1,A())}e.addEventListener("scroll",Ge,!0);function Xe(K){let Z=K&&K.attempt_id;if(!Z)return;let Ce=i;o=Z,a=typeof K.launch_id=="string"&&K.launch_id.length>0?K.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Ce&&Ce!==i&&Promise.resolve(n("unsubscribe-session-log",{id:Ce})).catch(()=>{}),c=typeof K.root_dir=="string"&&K.root_dir.length>0?K.root_dir:null,d=K.meta||{},u=K.hide_prompt===!0,p=!0,_.clear(),b.clear(),O(),!$&&r&&($=r.subscribe(A)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),A()}function st(){let K=i;o=null,a=null,i=null,c=null,u=!1,_.clear(),b.clear(),O(),he(),n&&K&&Promise.resolve(n("unsubscribe-session-log",{id:K})).catch(()=>{}),Ke(l``,e),s&&s()}return{open:Xe,updateMeta:Ue,close:st,isOpen(){return o!==null},destroy(){he(),$&&($(),$=null),e.removeEventListener("scroll",Ge,!0),o=null,a=null,i=null,c=null,u=!1,Ke(l``,e)}}}function uo(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Na(t.spec_id),s=Na(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Na(e){return typeof e=="string"?e.trim():""}function Mc(e){let t=uo(e);if(t.path)return t;let n=Na(dm(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function dm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function pm(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function fm(e){let t=e&&e.metadata||{},n=Mc(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:pm(t)?null:"plan_pending"}),r}function Pc(e,t){let n=fm(e);return l`
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
  `}var _m="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",mm=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,gm=/^\*\*결론\*\* — (.+)$/;function po(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==_m)return null;let n=mm.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?gm.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Dc=20;function Nc(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function hm(e){return e.length>Dc?`${e.slice(0,Dc)}\u2026`:e}function bm(e,t,n,r){let s=`${t.lane} ${hm(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Nc(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?l`<div class="detail-report__body">
          ${qn(t.body)}
        </div>`:""}
  </div>`}function ym(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Nc(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${qn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function qc(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=po(typeof c.text=="string"?c.text:"");return u?bm(c,u,t,s.has(c.id)):ym(c)})}
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
  `}var{I:Nv}=sl;var Fc=e=>e.strings===void 0;var vm={},jc=(e,t=vm)=>e._$AH=t;var or=eo(class extends $r{constructor(e){if(super(e),e.type!==Tn.PROPERTY&&e.type!==Tn.ATTRIBUTE&&e.type!==Tn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Fc(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===on||t===Lt)return t;let n=e.element,r=e.name;if(e.type===Tn.PROPERTY){if(t===n[r])return on}else if(e.type===Tn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return on}else if(e.type===Tn.ATTRIBUTE&&n.getAttribute(r)===t+"")return on;return jc(e),t}});var fo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Fa=[...fo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],In=["orchestration_model","orchestration_effort","orchestration_speed"],_o=[...fo,...In],wm=Fa.filter(e=>_o.includes(e)),Bc=["delegated","main"],mo=["inherit","claude","codex"],ss=["default","fast"],os=["standard","fast_track"],as=["codex","opus","fable","self","skip"],go=["codex","fable","skip"],ho=["low","medium","high","xhigh"],sn="auto";function rn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Uc(e){if(!rn(e)||!rn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))rn(r)&&rn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Sr(e,t){let n=Uc(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[sn,...r.flatMap(([,s])=>s)]}function Wc(e,t,n,r){if(!rn(e)||!rn(e.runners))return[sn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!rn(a)||!rn(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(n&&n!==sn&&i!==n)continue;let u=r(a,c);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[sn,...s]}function Er(e,t,n){return Wc(e,t,n,(r,s)=>rn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function ja(e,t,n){return Wc(e,t,n,(r,s)=>rn(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:rn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function is(e,t){let n=Uc(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function zc(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Sr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Er(t,s,r.impl_model||sn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var km={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},qa=[...wm,...In],$m=[..._o,...Fa].filter((e,t,n)=>n.indexOf(e)===t&&!qa.includes(e));function Hc(e,t){let n=rn(e)?e:{},r=rn(t)?t:{},s=[];for(let a of qa){let i=n[a]??null,c=r[a]??null;i!==c&&s.push({key:a,label:km[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...$m,...Object.keys(r)])!qa.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Ba(e,t,n,r,s,o){return Ks({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Gc(e,t){let n={};for(let r of Fa){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Vc(e,t){let n={};for(let r of In){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Ua=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...In]}],Fn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},bo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Wa(e,t,n,r,s,o=null){let a=Qt({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Kc(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of Wa(e,t,n,r,s,o))a[i.source]+=1;return a}function Yc(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Zc(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Kv=[...fo,...In];var xm=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],Am={pin:"pin",global:"global",base:"base"};function Sm(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${Am[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Em(e,t,n){switch(e){case"workflow_mode":return os;case"spec_review_model":case"impl_review_model":return as;case"plan_review_model":return go;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ho;case"impl_dispatch":return Bc;case"impl_runtime":return mo;case"impl_model":return Sr(n,t.impl_runtime);case"impl_effort":return Er(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return ss;case"orchestration_model":return is(n,null);case"orchestration_effort":return Er(n,void 0,t.orchestration_model||sn).filter(r=>r!==sn);default:return[]}}function Tm(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${Sm(e.source)}
    <span class="detail-effective__k"
      >${Fn[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${bo[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Fn[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Qc(e,t){let n=Ua.flatMap(c=>c.keys),r=Wa(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Kc(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(c=>[c.key,c])),a=Object.fromEntries(r.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=r.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return l`<details
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
        >${Cm(o)}</span
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
          ${Ua.map(c=>l`
              <div class="detail-effective__subhead">${c.label}</div>
              ${r.filter(u=>c.keys.includes(u.key)).map(u=>{let d=Ks({key:u.key,choices:Em(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Tm(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${or(e.preset_id)}
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
  </details>`}function Cm(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Rm(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Xc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=Rm(n.exec_receipt),c=i?$n(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=Gs(n.planned_execution,n.exec_receipt);return l`<section class="detail-summary" data-seam="detail-summary">
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
      ${xm.map(p=>{let _=p.receipt&&typeof t[p.receipt]=="string"?String(t[p.receipt]):"",b=r[p.id],$=_.length>0||b?.fill==="full",L=!$&&b?.fill==="dim",B=b?.stale===!0;return l`<span
          class=${`detail-summary__gate${$?" detail-summary__gate--on":""}${L?" detail-summary__gate--current":""}${B?" detail-summary__gate--stale":""}`}
          data-gate=${p.id}
        >
          <span class="detail-summary__gate-pill">${p.label}</span>
          ${_?l`<span class="detail-summary__gate-sha"
                >${_.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function nu(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Jc(e){return nu(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function eu(e,t){let n=e&&e[t];if(!nu(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Jc),s=Jc(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function ru(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Im(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${ru(e)}${t}`}function su(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${ru(e)}`}function Om(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:su({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function tu(e){let t=e.provider_key==="claude"?Im:su,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Om(e.provider_key,e.provider)}
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
  </div>`}function ou({md:e,catalog:t,handlers:n}){let r=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${tu({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:eu(t,"claude"),selected:r,handlers:n,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${tu({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:eu(t,"codex"),selected:s,handlers:n})}
    </div>
  </section>`}var au=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function ls(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function yo(e){if(!ls(e)||!ls(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>ls(n)&&ls(n.models));return t.length>0?t:null}function hn(e,t){let n=yo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function iu(e,t){return ls(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function lu(e,t){let n=yo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return iu(r,r.models[t]);return[]}function Lm(e){let t=yo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of iu(r,s))n.includes(o)||n.push(o);return n}function Mm(e,t){if(!t)return Lm(e);let r=yo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of lu(e,o))s.includes(a)||s.push(a);return s}function cu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=hn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?lu(t,r.impl_model):Mm(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function Pm(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Dm(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function uu(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function u(L){L.key==="Escape"&&s&&(L.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Pm(s)}</span
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
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${c}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:l`${i===null?null:l`<pre class="mv__front">
${i}</pre
                        >`}${qn(a)}`}
          </div>
        </div>
      </div>
    `:l``}function p(){Ke(d(),e)}async function _(L,B={}){s=L,o="loading",a="",i=null,c="",p();let G=n?n():"";if(!G){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let Q="/api/doc?workspace="+encodeURIComponent(G)+"&path="+encodeURIComponent(L);try{let P=await r(Q),M=await P.json().catch(()=>({}));if(!P.ok||!M||M.ok!==!0){if(M?.error==="not_found"&&B.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||P.status)+")",p();return}let O=Dm(String(M.content||""));i=O.front,a=O.body,o="ready",p()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function b(){s=null,Ke(l``,e)}function $(){document.removeEventListener("keydown",u),b()}return{open:_,close:b,destroy:$}}var Nm=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],fu="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",vo=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],qm=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function du(e){return typeof e=="string"&&qm.has(e)}var Fm=["running","done","failed","interrupted"],jm={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Bm(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Um(e){let t=Bt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=kr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${fu}
          >부분 집계</span
        >`:""}`}function pu(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ga(e){if(typeof e=="number")return wo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?wo(t):""}function Wm(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function zm(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function za(e){return e===null||typeof e=="string"&&e.trim().length>0}function Ha(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Hm(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!vo.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?za(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||za(t.effort))||!(!("agent_type"in t)||za(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Fm.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Ha(t.started_at)||!Ha(t.last_event_at)||!Ha(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Gm(e,t,n){let s=Bt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Ga(n.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${Ga(n.completed_at)}</span
        >`:""}
    ${s?l`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Vm(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Bt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?wo(e.last_event_at):s?Ga(s.completed_at):"",c=(e.provider==="claude"?["Claude",e.agent_type,Wm(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=zm(e,s);return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${jm[e.status]}</span
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
  </button>`}function Km(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Ym(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let p=Hm(d);!p||s.has(p.launch_id)||du(p.agent_type)||(s.add(p.launch_id),r.push(p))}r.sort((d,p)=>(d.started_at||0)-(p.started_at||0));let a={};for(let{role:d,provider:p}of vo){let _=t?t.roles[d]?.[p]:null;a[d]=_?[..._.legs]:[]}let i=vo.flatMap(({role:d})=>a[d]),c=new Set,u=[];for(let{role:d,provider:p}of vo){for(let _ of r.filter(b=>b.role===d&&b.provider===p)){let b=i.find($=>$.receipt_id===_.launch_id)||null;b&&!Km(_,b)||(b&&c.add(b.receipt_id),u.push(Vm(_,b,e.attempt_id,n)))}for(let _ of a[d])!c.has(_.receipt_id)&&!du(_.agent_type)&&u.push(Gm(d,p,_))}return u}function Zm(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Nm,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${r.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Bm(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${fu}</span>`:""}
  </div>`}var Qm={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function wo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Xm(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function _u(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of r)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let p=typeof u.session_id=="string"&&u.session_id.length>0,_=o.has(u.attempt_id),b=p&&!_,$=p?_?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!b}
      title=${$}
      @click=${L=>{L.stopPropagation(),b&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let p=u.cause_detail,_=p&&typeof p.reason=="string"&&p.reason.length>0?typeof p.command=="string"&&p.command.length>0?`${p.reason} \xB7 ${p.command}`:p.reason:u.cause;return l`<div class="detail-session__cause" title=${_}>
      ${u.cause}
    </div>`},c=u=>{let d=pu(ua(u));if(Bt(d).length===0&&!kr(u.usage))return"";let p=s.has(u.attempt_id);return l`<button
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
      세션 이력${Um(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(u=>{let d=ua(u),p=pu(d),_=Bt(p);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Qm[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${Wr(u)?l`<span
                  class="detail-session__resumed"
                  title=${Wr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${nr(u)}</span>
            ${_.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?l`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${_.length>0?_.map(b=>l`<span
                      class="detail-session__usage"
                      title=${b.tooltip}
                      >${b.label}</span
                    >`):kr(u.usage)?l`<span class="detail-session__usage"
                    >${kr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${wo(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${Xm(u)}
          ${s.has(u.attempt_id)&&u.usage?Zm(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Ym(u,d,t)}
        </div>`})}
    </div>
  `}function mu(e,t={}){return l`
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
          ${Jm(e)}
        </div>`:""}
  `}function Jm(e){let t=xr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Rn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=lo(n.recorded_at);return l`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Rn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Rn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var eg=["open","in_progress","deferred","resolved","closed"],tg=[0,1,2,3,4];function gu(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,d=null,p={},_="",b=!1,$=[],L=!1,B={},G={claude:null,codex:null},Q=null,P=0,M=!1,O=!1,U="",w="",F="";function J(){M=!1,O=!1,U="",w="",F=""}function Te(){G={claude:null,codex:null},Q=null,P+=1}async function Y(T){try{let te=await fetch(T);if(!te.ok)return null;let q=await te.json();if(!q||typeof q!="object"||!Array.isArray(q.accounts))return null;let Oe=q.accounts.filter(ut=>ut!==null&&typeof ut=="object"&&!Array.isArray(ut));return{accounts:Oe,active:Oe.find(ut=>ut.active===!0)||null}}catch{return null}}async function ce(T){Q=T;let te=++P,[q,Oe]=await Promise.all([Y("/api/claude-usage"),Y("/api/codex-usage")]);te!==P||T!==u||(G={claude:q,codex:Oe},Ee())}let he=[],Re=null,Le=null,oe=!1,ie="",Me=!1,N=0,se=new Set;function ae(){he=[],Re=null,Le=null,oe=!1,ie="",Me=!1,N+=1,se.clear()}async function Se(T){if(!s)return;let te=++N;try{let q=await Promise.resolve(s("get-comments",{id:T}));if(te!==N||T!==u)return;he=Array.isArray(q)?q:[],oe=!1}catch{if(te!==N||T!==u)return;oe=!0}Ee()}function Ie(){if(!s||!u)return;let T=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Re!==u){Re=u,Le=T,Se(u);return}T!==null&&T!==Le&&(Le=T,Se(u))}function Ne(T){se.has(T)?se.delete(T):se.add(T),Ee()}function A(T){let te=ie.trim().length===0;ie=T,te!==(T.trim().length===0)&&Ee()}async function fe(){let T=ie.trim();if(!s||!u||T.length===0||Me)return;let te=u;Me=!0,Ee();let q=!1;try{let Oe=await Promise.resolve(s("add-comment",{id:te,text:T}));Array.isArray(Oe)&&Oe.length>0&&(q=!0,te===u&&(he=Oe,oe=!1,ie="",Le=Oe.length))}catch{q=!1}q||ge("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),te===u&&(Me=!1),Ee()}let De={onToggle:Ne,onDraftInput:A,onSubmit:fe},we=document.createElement("div");we.className="md-viewer-root",document.body.appendChild(we);let We=uu(we,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ue=document.createElement("div");Ue.className="session-log-root",document.body.appendChild(Ue);let Ge=Ar(Ue,{transport:s?(T,te)=>Promise.resolve(s(T,te)):void 0,sessionLogStore:c}),Xe=!1,st=!1,K=!1,Z=null,Ce=null,Ye=0;function He(T){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${T}`}function pe(){Xe=!1,st=!1,K=!1,Z=null,Ce=null,Ye+=1}async function C(T){if(!s)return;let te=++Ye;st=!0,K=!1,Ee();try{let q=await Promise.resolve(s("get-bead-prompt",{bead_id:T}));if(te!==Ye)return;!q||typeof q!="object"||Array.isArray(q)?K=!0:(Z=q,Ce=He(T))}catch{te===Ye&&(K=!0)}finally{te===Ye&&(st=!1,Ee())}}function X(){if(Xe=!Xe,Xe&&u&&Ce!==He(u)){Z=null,C(u);return}Ee()}function ye(){if(!a||!u)return[];let T=a.get();return(T&&T.attempts?Object.values(T.attempts):[]).filter(q=>q&&q.bead_id===u).sort((q,Oe)=>(Oe.started_at||0)-(q.started_at||0)).map(q=>({attempt_id:q.attempt_id,bead_id:q.bead_id,status:q.status,started_at:typeof q.started_at=="number"?q.started_at:null,runner:q.runner||null,model:q.model||null,effort:q.effort||q.observed_effort||null,speed:q.speed||null,session_id:q.session_id||null,resumed_from:q.resumed_from||null,continuation_mode:q.continuation_mode||null,dismissed_at:typeof q.dismissed_at=="number"?q.dismissed_at:null,cause:typeof q.cause=="string"?q.cause:null,cause_detail:q.cause_detail||null,exec_default_preset_id:typeof q.exec_default_preset_id=="string"?q.exec_default_preset_id:null,exec_default_preset_revision:typeof q.exec_default_preset_revision=="number"?q.exec_default_preset_revision:null,exec_values:q.exec_values&&typeof q.exec_values=="object"?q.exec_values:null,usage:q.usage||null,usage_legs:Array.isArray(q.usage_legs)?q.usage_legs:[],delegation_sessions:Array.isArray(q.delegation_sessions)?q.delegation_sessions:[]}))}function ee(){if(!a||!u)return null;let T=a.get();return ln(T&&T.attempts||{},u)}let $e=new Set;function at(T){$e.has(T)?$e.delete(T):$e.add(T),Ee()}function ot(T){let te=a?a.get():null,q=te&&te.attempts?te.attempts[T]:null;Ge.open({attempt_id:T,meta:q?{runner:q.runner||void 0,model:q.model||void 0,effort:q.effort||void 0,status:q.status||void 0,session_id:q.session_id||void 0}:{}})}function Ze(T,te){let q=a?a.get():null,Oe=q&&q.attempts?q.attempts[T]:null,rt=(Oe&&Array.isArray(Oe.delegation_sessions)?Oe.delegation_sessions:[]).find(et=>et&&typeof et=="object"&&et.launch_id===te);rt&&Ge.open({attempt_id:T,launch_id:te,meta:{runner:rt.provider==="claude"?"claude":"codex",role:rt.role,...typeof rt.agent_type=="string"?{agent_type:rt.agent_type}:{},model:rt.model,effort:rt.effort,session_id:rt.session_id,status:rt.status}})}async function pt(T){if(!s||!T)return;let te=await wr();if(te===null)return;let q=()=>{let et=a?a.get():null;return et&&typeof et.revision=="number"?et.revision:0},Oe=async(et={},tt=q())=>await s("worker-attempt-resume",{attempt_id:T,expected_revision:tt,...te!==""?{instructions:te}:{},...et}),ut=et=>{et?.queue&&a?.set&&a.set(et.queue)},rt=await Oe();if(ut(rt),rt&&rt.conflict){let et=rt.queue&&typeof rt.queue.revision=="number"?rt.queue.revision:q();rt=await Oe({},et),ut(rt)}rt=await xn(rt,(et,tt)=>Oe({continuation:et,decision_token:tt}),{onResult:ut,refresh:()=>Oe()}),rt&&rt.resumed===!1&&!rt.conflict&&rt.reason&&ge(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${rt.reason}`,"error",2400)}let mt={onOpen:ot,onOpenDelegation:Ze,onResume:pt,onToggleUsage:at};function gt(){let T=a?a.get():null,te={...B};for(let q of["orchestration_model","orchestration_effort","orchestration_speed"]){let Oe=T&&T[q];typeof Oe=="string"&&(te[q]=Oe)}return te}async function it(){if(s){try{let T=await Promise.resolve(s("get-session-defaults",{}));B=T&&T.values&&typeof T.values=="object"?T.values:{}}catch{B={}}Ee()}}function yt(){let T=a?a.get():null;return T&&T.runner_catalog||null}function ze(){let T=a?a.get():null;return T&&typeof T.execution_defaults=="object"?T.execution_defaults:null}function Qe(){let T=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},q=Qt({pin:{...T,...p},global:gt(),execution_defaults:ze(),runner_catalog:yt(),route:typeof T.route=="string"?T.route:null}).orchestration_model.value||"";return hn(yt(),q)}function Pe(){let T=i?i.get():null;return!T||typeof T.revision!="number"?null:{revision:T.revision,presets:Array.isArray(T.presets)?T.presets:[]}}function ht(T){return T?.compatible===!1}function xt(T){i&&T&&typeof T.revision=="number"&&Array.isArray(T.presets)&&i.set({revision:T.revision,presets:T.presets})}async function V(){let T=Pe(),te=T?.presets.find(q=>q.id===_);if(!(!s||!u||!T||!te||ht(te)||b)){b=!0,$=[],Ee();try{let q=await Promise.resolve(s("apply-impl-preset",Zc(u,te.id,T.revision)));if(q&&q.conflict){xt(q),ge("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Oe=q&&Array.isArray(q.issue)?q.issue[0]:q?.issue;if(q&&q.applied&&Oe&&typeof Oe=="object"){d=Oe,$=Array.isArray(q.skipped_orchestration_keys)?q.skipped_orchestration_keys.filter(ut=>typeof ut=="string"):[];for(let ut of au)delete p[ut];ge($.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}q&&q.error==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(q){q&&typeof q=="object"&&q.code==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,Ee()}}}let _e=null;n&&n.subscribe&&(_e=n.subscribe(()=>D()));let R=null;a&&typeof a.subscribe=="function"&&(R=a.subscribe(()=>{u&&Ee()}));let m=null;i&&typeof i.subscribe=="function"&&(m=i.subscribe(()=>{u&&Ee()}));function E(T){T.key==="Escape"&&u&&(T.preventDefault(),r())}document.addEventListener("keydown",E);function D(){if(u){if(n&&typeof n.snapshotFor=="function"){let T=n.snapshotFor("detail:"+u)||[];d=T.find(q=>q&&q.id===u)||T[0]||d}Ie(),Ee()}}function j(T){nn(T).then(te=>{te?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function be(T){T.preventDefault(),T.stopPropagation(),u&&j(u)}function ve(T,te){T.preventDefault(),T.stopPropagation(),j(te)}function xe(T,te,q){T.preventDefault(),T.stopPropagation(),We.open(te,{missing_state:q})}function qe(T,te){p[T]=te,Ee(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Yc(u,T,te.length===0?null:te))).catch(()=>{ge("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function vt(T,te){let q=d||{},Oe=q.metadata&&typeof q.metadata=="object"?q.metadata:{},ut={};for(let tt of["impl_runtime","impl_model","impl_effort"])ut[tt]=Object.hasOwn(p,tt)?p[tt]:typeof Oe[tt]=="string"?Oe[tt]:"";ut[T]=te;let rt=cu(ut,yt(),Qe()),et={};for(let tt of["impl_runtime","impl_model","impl_effort"])et[tt]=p[tt],p[tt]=rt[tt]||"";Ee(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...rt,orchestration_runtime:Qe()})).then(tt=>{let It=Array.isArray(tt)?tt[0]:tt;if(!It||typeof It!="object"||!It.id)throw new Error("implementation target readback failed");d=It;for(let Jt of["impl_runtime","impl_model","impl_effort"])delete p[Jt];Ee()}).catch(()=>{for(let tt of["impl_runtime","impl_model","impl_effort"])et[tt]===void 0?delete p[tt]:p[tt]=et[tt];Ee(),ge("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function nt(T,te,q){if(!s||!u)return!1;try{let Oe=await Promise.resolve(s(T,te)),ut=Array.isArray(Oe)?Oe[0]:Oe;return ut&&typeof ut=="object"&&ut.id?(d=ut,!0):(ge(q,"error"),!1)}catch{return ge(q,"error"),!1}}function Je(T){setTimeout(()=>{try{let te=e.querySelector(T);te&&typeof te.focus=="function"&&te.focus()}catch{}},0)}function At(){M=!0,U=d&&d.title||"",Ee(),Je('.detail-edit__input[data-edit="title"]')}function Yt(T){U=T.target.value}function je(){M=!1,U="",Ee()}function Mt(){nt("edit-text",{id:u,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(te=>{te&&(M=!1,U=""),Ee()})}function Nt(){O=!0,w=d&&d.description||"",Ee(),Je('.detail-edit__textarea[data-edit="description"]')}function Ut(T){w=T.target.value}function Ot(){O=!1,w="",Ee()}function Wt(){nt("edit-text",{id:u,field:"description",value:w},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(te=>{te&&(O=!1,w=""),Ee()})}function y(T,te,q,Oe){if(T.key==="Escape"){T.stopPropagation(),q();return}T.key==="Enter"&&(!Oe||T.ctrlKey||T.metaKey)&&(T.preventDefault(),te())}function v(T){let te=T.target.value;nt("update-status",{id:u,status:te},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Ee())}function I(T){let te=Number(T.target.value);nt("update-priority",{id:u,priority:te},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Ee())}function W(T){F=T.target.value}function re(){let T=F.trim();T.length!==0&&nt("label-add",{id:u,label:T},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(te=>{te&&(F=""),Ee()})}function ke(T){if(T.key==="Escape"){T.stopPropagation(),F="",Ee();return}T.key==="Enter"&&(T.preventDefault(),re())}function ne(T){nt("label-remove",{id:u,label:T},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Ee())}let x={onCopyPath:ve,onOpenDoc:xe};function le(T){return typeof T=="string"?T:T&&typeof T=="object"?String(T.id||T.to||T.issue_id||T.depends_on||""):""}function Ae(T){switch(T&&typeof T=="object"?String(T.dependency_type||T.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function lt(T){let q=(Array.isArray(T.dependencies)?T.dependencies:[]).map(Oe=>({id:le(Oe),icon:Ae(Oe)})).filter(Oe=>Oe.id.length>0);return l`
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
    `}function Ct(T){let te=T.metadata||{},q=T.workflow||{},Oe=q.stages||{},ut=Oe.spec&&Oe.spec.stale,rt=Oe.impl&&Oe.impl.stale,et=Oe.plan||null,tt=q.route_source==="derived",It=q.route||te.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${tt?" detail-kv__v--derived":""}"
          title=${tt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${tt?"unset":It}</span
        >
      </div>
      ${q.route!=="quick_fix"||Object.hasOwn(te,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${te.spec_review||"\uC5C6\uC74C"}${ut?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${q.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${et?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${et?.approval_receipt||"\uC5C6\uC74C"}${et?.approval_state==="stale"?" \xB7 stale":et?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${q.route!=="quick_fix"||Object.hasOwn(te,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${te.impl_review||"\uC5C6\uC74C"}${rt?" \xB7 stale":""}</span
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
              >${$n(q.exec_receipt)}</span
            >
          </div>`:""}
      ${q.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${q.impl_entry.actor}@${q.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${te.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${te.pr_url}</span>
          </div>`:""}
    `}let _t={route:["quick_fix","spec_backed","full_plan"]};async function Pt(T,te){let q=te.target.value;if(T==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&q!=="full_plan"&&!window.confirm(`full_plan \u2192 ${q||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Ee();return}await nt("update-workflow-meta",{id:u,key:T,value:q},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Ee()}function f(T){let te=T.metadata||{};return l` ${((Oe,ut)=>{let rt=_t[Oe],et=typeof te[Oe]=="string"?te[Oe]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${Oe}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Oe}
          data-edit=${`wfmeta-${Oe}`}
          @change=${tt=>Pt(Oe,tt)}
        >
          <option value="" ?selected=${!rt.includes(et)}>
            ${ut}
          </option>
          ${rt.map(tt=>l`<option value=${tt} ?selected=${et===tt}>${tt}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function S(T,te){return M?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${Yt}
            @keydown=${q=>y(q,Mt,je,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Mt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${je}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${T}</h2>
        ${Bt(te).map(q=>l`<span class="detail-usage-total" title=${q.tooltip}
              >${q.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${At}
        >
          ✎
        </button>
      </div>
    `}function H(T){let te=zt(T.created_at),q=zt(T.updated_at);return!te&&!q?l``:l`
      ${te?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${te}</span>
          </div>`:""}
      ${q?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${q}</span>
          </div>`:""}
    `}function g(T,te){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${v}
        >
          ${eg.map(q=>l`<option value=${q} ?selected=${q===T}>${q}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${I}
        >
          ${tg.map(q=>l`<option value=${String(q)} ?selected=${q===te}>
                P${q}
              </option>`)}
        </select>
      </div>
    `}function k(T){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${O?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Nt}
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
              .value=${w}
              @input=${Ut}
              @keydown=${te=>y(te,Wt,Ot,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Wt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ot}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${T||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function de(T){let te=typeof T.notes=="string"?T.notes:"";return te.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${te}</div>
    `}function ue(T){let te=Array.isArray(T.labels)?T.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${te.map(q=>l`<span class="detail-label-chip"
              >${q}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${q}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+q}
                @click=${()=>ne(q)}
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
            @input=${W}
            @keydown=${ke}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${re}
          >
            추가
          </button>
        </span>
      </div>
    `}function Fe(){if(!u)return l``;let T=d||{},te=String(T.id||u),q=T.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Oe=ee(),ut=T.status||"open",rt=typeof T.priority=="number"?Math.max(0,Math.min(4,T.priority)):"",et=T.description||"",tt={...T,metadata:{...T.metadata||{},...p}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${be}
            >
              ${te}
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
          ${S(q,Oe)}
          ${Xc(tt)}
          ${Qc({metadata:tt.metadata,workspace_values:gt(),catalog:yt(),execution_defaults:ze(),expanded:L,presets:Pe()?.presets||[],preset_id:_,preset_busy:b,skipped_orchestration_keys:$},{onToggle:It=>{L=It,Ee()},onEdit:(It,Jt)=>{if(It==="impl_runtime"||It==="impl_model"||It==="impl_effort"){vt(It,Jt??"");return}qe(It,Jt??"")},onPresetSelect:It=>{_=It,$=[],Ee()},onPresetApply:()=>{V()}})}
          ${ou({md:tt.metadata,catalog:G,handlers:{onExecChange:qe}})}
          ${g(ut,rt)} ${H(T)}
          ${k(et)}
          ${qc(he,De,{expanded:se,draft:ie,sending:Me,error:oe})}
          ${de(T)} ${ue(T)} ${lt(T)}
          ${Ct(T)} ${f(T)}
          ${Pc(T,x)}
          ${mu({expanded:Xe,loading:st,error:K,data:Z},{onToggle:X})}
          ${_u(ye(),mt,{total:Oe,expanded:$e})}
        </div>
      </div>
    `}function Ee(){Ke(Fe(),e)}return{load(T){T!==u&&(p={},_="",$=[],L=!1,J(),ae(),pe(),Te()),u=T,d=null,D(),it(),Q!==T&&ce(T)},clear(){u=null,d=null,p={},_="",b=!1,$=[],L=!1,J(),ae(),pe(),Te(),We.close(),Ge.close(),Ke(l``,e)},destroy(){_e&&(_e(),_e=null),R&&(R(),R=null),m&&(m(),m=null),document.removeEventListener("keydown",E),We.destroy(),we.parentNode&&we.parentNode.removeChild(we),Ge.destroy(),Ue.parentNode&&Ue.parentNode.removeChild(Ue),u=null,d=null,Te(),_="",b=!1,$=[],ae(),pe(),Ke(l``,e)}}}function hu(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,d,p="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let _=typeof p=="string"?p.trim():"";if(s&&(_.length>0?(s.textContent=_,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function ko(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function us(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function $o(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function xo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function ng(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:ko(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function bu(e,t){let n=ng(e,t);return n?l`<button
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
            >${xo(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${us(n.deploy.elapsed_ms)}`:""}</span
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
  </div>`}function rg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function ds(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ao(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function wn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,_)=>(p.requested_at||0)-(_.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?rg(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:d}}function cs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return l`<div
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
  </div>`}var sg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function yu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:sg[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function So(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Eo(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.successors)?e.successors:[],r=Array.isArray(e.warnings)?e.warnings:[];return t.length===0&&n.length===0&&r.length===0?"":l`<div class="worker-deps">
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
        >`)}${n.map(s=>l`<span class="worker-dep worker-dep--succ" title=${s.title||""}
          >${s.label}</span
        >`)}${r.map(s=>l`<span class="worker-dep worker-dep--warn">${s}</span>`)}
  </div>`}function Cr(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?l`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function og(e){let t=Array.isArray(e.badges)?e.badges:[],n=Bt(e.usage),r=Sn(e.usage),s=tn(e.done_at);return l`<div
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
              >`):r?l`<span class="worker-usage" title=${Gr(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?l`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${us(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function jn(e){if(e.lane==="done"&&e.done_layout==="three_line")return og(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Bt(e.usage),s=Sn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?tn(e.done_at):"",u=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",p=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",_=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,$=e.lane==="done"?"":Cr(e.workflow),L=l`<span class="worker-mini__title">${e.title}</span>`,B=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",G=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",Q=n.map(N=>N===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${N}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${N===e.completion_badge&&e.completion_title||""}
          >${N}</span
        >`),P=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",M=r.length>0?r.map(N=>l`<span class="worker-usage" title=${N.tooltip}
              >${N.label}</span
            >`):s?l`<span class="worker-usage" title=${Gr(e.usage)}
            >${s}</span
          >`:"",O=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",U=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",w=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",F=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",J=e.discard,Te=J?.action||e.discard_action?l`<button
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
        </button>`:"",Y=e.stale_work||null,ce=Y?l`${Y.can_resume||Y.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${Y.action_id}
            ?disabled=${Y.locked}
          >
            기존 작업 이어가기
          </button>`:""}${Y.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${Y.action_id}
            ?disabled=${Y.locked}
          >
            백업 후 새로 시작
          </button>`:""}${Y.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${Y.action_id}
            ?disabled=${Y.locked}
          >
            다시 확인
          </button>`:""}`:"",he=Y?l`<div class="worker-mini__stale">
        <strong>${Y.title}</strong>
        <span>${Y.summary}</span>
        <span>${Y.cause}</span>
        ${Y.can_backup_fresh?l`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Re=e.revise_action?l`<button
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
        </button>`:"",Le=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${So(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",oe=Eo(e.dependency_chips),ie=cs(e),Me=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||J?.operation||e.revise_action||Y);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">${_}${b}${L}</div>
          <div class="worker-mini__row2">
            ${M}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${zt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${us(e.work_ms)}</span
                >`:""}${Q}${O}
            <span class="worker-mini__actions"
              >${U}${w}${F}${Te}</span
            >
            ${Tr(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${u}${d}${_}${b}${$}${B}${G}${Q}${p}${P}
            </div>
            <div class="worker-mini__body">${L}${he}</div>
            ${oe}${Le}${Me?l`<div class="worker-mini__foot">
                  ${M}${O}
                  <span class="worker-mini__actions"
                    >${U}${w}${F}${Te}${Re}${ce}</span
                  >
                  ${cs(e)}
                </div>`:""}
            ${Tr(e)}`:l`<div class="worker-mini__line">
              ${u}${d}${_}${b}${$}${L}${B}${G}${Q}${p}${P}${M}${O}${U}${w}${F}${Te}
            </div>
            ${oe}${Le}${ie} ${Tr(e)}`}
  </div>`}function Va(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),c=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),u=Eo(e.dependency_chips);return l`<div
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
      ${Cr(a)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?zs(a,e.status):""}${u}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${So(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?Va(r,e.place_menu):jn(r))}
          </div>`}
  </section>`}var vu={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},wu={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function ku(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ka(e){for(let t of ku(e))if(Object.hasOwn(vu,t))return vu[t];return null}function Ya(e){let t=null;for(let n of ku(e))Object.hasOwn(wu,n)&&(t=wu[n]);return t}function To(e){let t=Ka(e),n=Ya(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function $u(e,t){let n=Ka(e)??Ka(t),r=Ya(t)??Ya(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var xu=160;function ag(e){return e.length>xu?`${e.slice(0,xu)}\u2026`:e}function ig(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${ag(e.command)}</code>`:""}
  </div>`}function lg(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function cg(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Au(e){let t=e.failure?To(e.failure.reason):"";return l`<div class="worker-banners">
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
          ${ig(e.failure.cause_detail)}
          ${lg(e.failure.reason)}
          ${cs({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function ug(e){return e?l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var dg=new Set(["codex-runner"]);function pg(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(_=>_&&!(typeof _.agent_type=="string"&&dg.has(_.agent_type))),c=i.filter(_=>_&&_.state==="live"),u=i.filter(_=>_&&_.state!=="live"),d=Eo(e.dependency_chips),p=r?tn(r.updated_at,t):"";return l`${o?l`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?l`<span class="rtile__activity-age"
              >${tn(a,t)}</span
            >`:""}
      </div>`:p?l`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">갱신 ${p}</span>
        </div>`:""}${c.length>0||u.length>0?l`<div class="rtile__legs">
        ${c.map(_=>l`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${_.label}</span
            >`)}${u.length>0?l`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(_=>_.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}${d}`}function Za(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?cg(t-e.started_at):"\u2014",c=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,u=Wr(e),d=Bt(e.usage),p=Sn(e.usage),_=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,b=e.base_exception||null,$=e.landing,L=e.attempt_id&&e.attempt_id===n,B=r.monitor||null,G=ug(B),Q=pg(B,t,a,s?{updated_at:e.updated_at??null}:null),P=s&&e.workflow?.chips?.exec_receipt||null,M=P?l`<div class="rtile__meta">
        <span
          class="ctl-chip ctl-chip--exec-receipt"
          title=${`exec_receipt ${$n(P)}`}
          >${`${P.kind}:${Hs(P)}`}</span
        >
      </div>`:"",O=s?"":Tr(e),U=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${L?" rtile--sel":""}${a?" rtile--paused":""}${o?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Cr(e.workflow)}${G}${u?l`<span class="rtile__resumed" title=${u}>↻</span>`:""}
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
              ${U}
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
              ${U}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${Q}${e.rollup?Ws(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:aa}):""}
    ${$?l`<div class="rtile__landing">
          <span
            class="merge-step${$.failed?" merge-step--failed":""}"
            style=${`--progress: ${$.percent}%`}
            >${$.label}${$.index>0?l`<span class="merge-step__n"
                  >${$.index}/${$.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${s?M:c||d.length>0||p||_||b?l`<div class="rtile__meta">
            ${_?l`<span class="worker-mini__badge">${_}</span>`:""}
            ${b?l`<span
                  class="worker-mini__badge"
                  title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                  >${b}</span
                >`:""}
            ${So(e.exec_chips)}
            ${d.length>0?d.map(w=>l`<span class="worker-usage" title=${w.tooltip}
                      >${w.label}</span
                    >`):p?l`<span
                    class="worker-usage"
                    title=${Gr(e.usage)}
                    >${p}</span
                  >`:""}
          </div>`:""}
    ${O} ${cs(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Qa(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(s=>Za(s,t,n))}
  </div>`}var Xa=new Set(["unavailable","not_applicable"]);function Bn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Su(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Un(e,t){return t===null?null:`${Fn[e]}: ${t.display} (${bo[t.source]})`}function Ja(e){return e.filter(t=>t!==null).join(`
`)}function Co(e){if(typeof e!="object"||e===null)return null;let t=nr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Ja(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Fn.orchestration_model,e.model),n(Fn.orchestration_effort,e.effort),n(Fn.orchestration_speed,e.speed)])}}function ar(e,t){let n=Bn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Bn(e,"orchestration_effort"),s=Bn(e,"orchestration_speed"),o=Su([hn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Ja(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Un("orchestration_model",n),Un("orchestration_effort",r),Un("orchestration_speed",s)])}}function fg(e,t){return e===null||e.value===null||Xa.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function _g(e){return e===null||Xa.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function mg(e){return e===null?null:e.value==="auto"?"auto":Xa.has(e.resolution)?null:e.display}function Wn(e,t){if(typeof e!="object"||e===null)return null;let n=Bn(e,"impl_dispatch"),r=Bn(e,"impl_runtime"),s=Bn(e,"impl_model"),o=Bn(e,"impl_effort"),a=Bn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":Su([fg(r,t??null),_g(s),mg(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Ja(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Un("impl_dispatch",n),Un("impl_runtime",r),Un("impl_model",s),Un("impl_effort",o),Un("impl_speed",a)])}}var Xt="",gg=["impl_runtime","impl_model","impl_effort"],hg=5,Ro=1;function On(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Io(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(C=>ge(C,"error",4e3)),o={},a={},i=[],c=!1,u=null,d={},p="",_="",b=!1,$=!1,L=!1,B=null,G=!1;function Q(){let C=t.queue?t.queue():null;return On(C)?C:null}function P(){let C=Q();return C?C.runner_catalog:null}function M(){let C=Q();return C&&On(C.execution_defaults)?C.execution_defaults:null}function O(){let C=t.implPresetStore?.get();return On(C)&&Array.isArray(C.presets)?C:null}function U(){return r===null?{}:{root_dir:r}}async function w(C,X){return G||!n?null:await n(C,X)}function F(C){C&&On(C.queue)&&t.onQueueAdopt?.(C.queue)}async function J(C,X){let ye=Q();if(!ye||G)return null;let ee=await w(C,{...X,...U(),expected_revision:ye.revision});if(F(ee),r!==null&&ee&&ee.conflict){let $e=ee.queue&&typeof ee.queue.revision=="number"?ee.queue.revision:Q()?.revision??ye.revision;ee=await w(C,{...X,...U(),expected_revision:$e}),F(ee)}return ee}async function Te(){c=!0,pe();try{let C=await w("get-session-defaults",{...U()});o=On(C?.values)?{...C.values}:{},a={...o},i=Array.isArray(C?.warnings)?C.warnings:[]}catch(C){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${C instanceof Error?C.message:String(C)}`)}finally{c=!1,pe()}}async function Y(){let C=Gc(o,a);if(Object.keys(C).length!==0){try{let X=await w("set-session-defaults",{values:C,...U()});o=On(X?.values)?{...X.values}:{},a={...o},i=Array.isArray(X?.warnings)?X.warnings:[]}catch(X){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}pe()}}function ce(C,X){if(gg.includes(C)){Le(C,X);return}X===Xt?delete a[C]:a[C]=X,pe(),Y()}function he(){let C=Ye().orchestration_model,X=Qt({global:{orchestration_model:C??void 0},execution_defaults:M(),runner_catalog:P()}).orchestration_model.value;return X?hn(P(),X):null}function Re(C,X){typeof X=="string"&&X.length>0?a[C]=X:delete a[C]}function Le(C,X){let ye=X===Xt?void 0:X,ee=zc({impl_runtime:C==="impl_runtime"?ye:a.impl_runtime,impl_model:C==="impl_model"?ye:a.impl_model,impl_effort:C==="impl_effort"?ye:a.impl_effort},P(),he());Re("impl_runtime",ee.impl_runtime),Re("impl_model",ee.impl_model),Re("impl_effort",ee.impl_effort),pe(),Y()}async function oe(){let C=Q();if(!C)return;let X={orchestration_model:C.orchestration_model??null,orchestration_effort:C.orchestration_effort??null,orchestration_speed:C.orchestration_speed??null},ye=Vc(X,{...X,...d});if(Object.keys(ye).length!==0){try{let ee=await J("worker-queue-set-orchestration-defaults",{values:ye});if(ee&&ee.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}d={}}catch(ee){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}pe()}}function ie(C,X){d[C]=X===Xt?null:X,pe(),oe()}function Me(C){if(u=C,!C){pe();return}let X=P(),ye=Ye(),ee=ye.orchestration_model;ee&&!is(X,C).includes(ee)&&(d.orchestration_model=null,ee=null);let $e=ye.orchestration_effort;$e&&!ja(X,C,ee||sn).includes($e)&&(d.orchestration_effort=null),pe(),oe()}async function N(C){if(!(!Q()||C<Ro)){try{await J("worker-queue-set-slots",{slots:C})}catch(X){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}pe()}}async function se(C){if(!(!Q()||C<Ro||C>hg)){try{await J("worker-queue-set-serial-lane-count",{count:C})}catch(X){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}pe()}}async function ae(C,X){let ye=C==="auto_advance"?"worker-automation-toggle":C==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await J(ye,{on:X})}catch(ee){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}pe()}function Se(){let C={},X=Ye();for(let ye of _o){let ee=In.includes(ye)?X[ye]:a[ye];typeof ee=="string"&&ee.length>0&&(C[ye]=ee)}return C}async function Ie(){let C=O();if(!C)return;let X=Se();if(Object.keys(X).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ye=(C.presets||[]).find($e=>$e.id===p),ee=_.trim()||(ye?ye.name:"");if(!ee){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let $e=ye?await w("impl-preset-update",{expected_revision:C.revision,id:ye.id,name:ee,settings:X}):await w("impl-preset-create",{expected_revision:C.revision,name:ee,settings:X});if($e&&$e.applied){if(_="",!ye&&Array.isArray($e.presets)){let at=$e.presets.find(ot=>ot.name===ee);p=at?at.id:p}pe()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),pe()}catch($e){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${$e instanceof Error?$e.message:String($e)}`)}}async function Ne(){let C=O();if(!(!C||p.length===0))try{let X=await w("impl-preset-delete",{expected_revision:C.revision,id:p});X&&X.applied?(p="",pe()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),pe())}catch(X){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}}function A(C){o=On(C.values)?{...C.values}:{},a={...o},i=Array.isArray(C.warnings)?C.warnings:[],On(C.queue)&&(t.onQueueAdopt?.(C.queue),d={})}async function fe(){let C=O(),X=Q();if(!C||!X||p.length===0)return;let ye=ee=>({preset_id:p,expected_revision:C.revision,expected_queue_revision:ee,...U()});try{let ee=await w("apply-impl-preset-global",ye(X.revision));if(ee&&ee.applied&&A(ee),r!==null&&ee&&ee.queue_applied===!1){let $e=ee.queue&&typeof ee.queue.revision=="number"?ee.queue.revision:Q()?.revision??X.revision;ee=await w("apply-impl-preset-global",ye($e)),ee&&ee.applied&&A(ee)}ee&&ee.applied?ee.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):ee&&ee.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(ee){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}pe()}async function De(){$=!0,L=!1,pe();try{let C=await w("get-worker-system-prompt",{});!C||typeof C!="object"||Array.isArray(C)?L=!0:B=C}catch{L=!0}finally{$=!1,pe()}}function we(){if(b=!b,b&&!B){De();return}pe()}function We(){let C=xr({loading:$,error:L});if(C)return C;if(!B)return"";let X=Array.isArray(B.variants)?B.variants:[];return l`<div class="settings-dialog__sp-body">
      ${B.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${B.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${X.map(ye=>l`<div class="settings-dialog__sp-variant" data-variant=${ye.key}>
            <div class="settings-dialog__sp-cond">${ye.condition}</div>
            ${Rn(ye.label,ye.system_prompt)}
          </div>`)}
    </div>`}function Ue(){return l`<section
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
        aria-expanded=${b?"true":"false"}
        @click=${we}
      >
        ${b?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${b?We():""}
    </section>`}function Ge(C,X,ye,ee,$e,at,ot){let Ze=$e[C]??Xt,pt=Ba(C,ye,$e,M(),P(),ot),mt=pt.options.find(it=>it.value===Ze),gt=Ze===Xt?pt.full_value:mt?.full_value;return l`<select
        class=${Ze===Xt?"settings-dialog__unset":""}
        data-key=${C}
        aria-label=${X}
        title=${gt||""}
        ?disabled=${at===!0||pt.disabled}
        .value=${or(String(Ze))}
        @change=${it=>ee(C,String(it.target.value))}
      >
        <option value=${Xt} ?selected=${Ze===Xt}>
          ${pt.unset_label}
        </option>
        ${pt.options.map(it=>l`<option
              value=${it.value}
              title=${it.full_value||""}
              ?selected=${it.value===Ze}
            >
              ${it.label}
            </option>`)}
      </select>
      ${Ze===Xt?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Xe(C,X,ye,ee,$e,at=!1,ot){return l`<div
      class=${`settings-dialog__row${at?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        ${Ge(C,X,ye,ee,$e,at,ot)}
      </span>
    </div>`}function st(C,X,ye,ee,$e){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${X}-on)`}
        ></i>
        ${C}
      </span>
      <span class="settings-dialog__controls">
        ${Ge(ye,`${C} \uBAA8\uB378`,ee,ce,a,!1)}
        ${Ge($e,`${C} effort`,ho,ce,a,!1)}
      </span>
    </div>`}function K(C,X,ye,ee){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${ee?" is-on":""}`}
          data-automation=${C}
          aria-pressed=${ee?"true":"false"}
          aria-label=${X}
          @click=${()=>ae(C,!ee)}
        >
          ${ee?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ye}</span>
      </span>
    </div>`}function Z(C,X,ye,ee){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${C}>
          <button
            type="button"
            aria-label=${`${X} \uAC10\uC18C`}
            @click=${()=>ee(ye-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ye}</span>
          <button
            type="button"
            aria-label=${`${X} \uC99D\uAC00`}
            @click=${()=>ee(ye+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ce(C){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${C.rows.length>0?`\uBCC0\uACBD ${C.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${C.rows.map(X=>l`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${X.kind}
          >
            <span class="settings-dialog__preset-diff-label">${X.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${X.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${X.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${C.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${C.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Ye(){let C=Q(),X={};for(let ye of In)X[ye]=Object.prototype.hasOwnProperty.call(d,ye)?d[ye]:C&&typeof C[ye]=="string"?C[ye]:null;return X}function He(){let C=P(),X=a.impl_runtime,ye=a.impl_model,ee=O(),$e=Q(),at=Ye(),ot=is(C,u),Ze=Sr(C,void 0).filter(Pe=>Pe!==sn),pt=ja(C,u,at.orchestration_model||sn).filter(Pe=>Pe!==sn),mt=p?(ee?.presets||[]).find(Pe=>Pe.id===p):null,gt=mt?Hc(Se(),On(mt.settings)?mt.settings:{}):null,it=$e&&typeof $e.slots=="number"?$e.slots:Ro+1,yt=$e&&typeof $e.serial_lane_count=="number"?$e.serial_lane_count:Ro,ze=M()?.supported===!0,Qe=Ba("workflow_mode",os,a,M(),C);return l`
      ${i.length>0?l`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${ze?"":l`<div
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
                .value=${or(p)}
                @change=${Pe=>{p=String(Pe.target.value),pe()}}
              >
                <option value="" ?selected=${p===""}>
                  실행 프리셋…
                </option>
                ${(ee?.presets||[]).map(Pe=>l`<option
                      value=${Pe.id}
                      ?selected=${Pe.id===p}
                    >
                      ${Pe.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!gt||gt.rows.length===0}
                @click=${fe}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${p?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${or(_)}
                @input=${Pe=>{_=String(Pe.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${p?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Ie}
              >
                ${p?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${p.length===0}
                @click=${Ne}
              >
                삭제
              </button>
            </div>
            ${gt?Ce(gt):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${or(u||Xt)}
                    @change=${Pe=>{let ht=String(Pe.target.value);Me(ht===Xt?null:ht)}}
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
              ${Xe("orchestration_model","\uBAA8\uB378",ot,ie,at)}
              ${Xe("orchestration_effort","effort",pt,ie,at)}
              ${Xe("orchestration_speed","\uC18D\uB3C4",ss,ie,at)}
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
                      @click=${()=>ce("workflow_mode",Xt)}
                    >
                      ${Qe.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${os.map(Pe=>l`<button
                          type="button"
                          data-mode=${Pe}
                          aria-pressed=${String(a.workflow_mode===Pe)}
                          @click=${()=>ce("workflow_mode",Pe)}
                        >
                          ${Pe}
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
              ${st("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",as,"spec_review_effort")}
              ${st("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",go,"plan_review_effort")}
              ${st("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",as,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Xe("impl_runtime","\uC704\uC784 \uB300\uC0C1",mo,ce,a)}
              ${Xe("impl_model","\uBAA8\uB378",Sr(C,X),ce,a)}
              ${Xe("impl_effort","effort",Er(C,X,ye),ce,a)}
              ${Xe("impl_speed","\uC18D\uB3C4",ss,ce,a)}
              ${Xe("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Ze,ce,a,!1,{...a,...at})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${K("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",$e?.auto_advance===!0)}
              ${K("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",$e?.auto_merge===!0)}
              ${K("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",$e?.auto_repair===!0)}
              ${Z("slots","\uB3D9\uC2DC \uC2E4\uD589",it,Pe=>N(Pe))}
              ${Z("serial-lane-count","\uC9C1\uB82C \uB808\uC778",yt,Pe=>se(Pe))}
            </div>
            ${Ue()}
          `}
    `}function pe(){G||Ke(He(),e)}return{load(){return d={},Te()},render:pe,sessionDraft:()=>({...a}),destroy(){G=!0,Ke(l``,e)}}}function ps(e){return l`<svg
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
  </svg>`}function Eu(){return ps(fr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Tu(){return ps(fr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Cu(){return ps(fr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Ru(){return ps(fr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Iu(){return ps(fr`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Ou(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Lu(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Bt(Zs(t));let n={};for(let i of An)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let d of An){let p=c[d];typeof p=="number"&&Number.isFinite(p)&&(n[d]+=p,r=!0,u=!0)}if(u){o+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Sn(n):null}function bn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Rr(e,t){let n=bn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function bg(e,t){if(!bn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function yg(e){if(!bn(e)||!bn(e.execution_defaults)||!bn(e.runner_catalog)||!bn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=Qt({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=hn(e.runner_catalog,n.orchestration_model.value??""),s=ar(n,e.runner_catalog),o=Wn(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Mu(e,t){let n=t.notify||(N=>ge(N,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let u=null,d=null,p=null,_=new Map;function b(){let N=t.workspacesState?t.workspacesState():[];return Array.isArray(N)?N.filter(se=>bn(se)):[]}function $(N){return b().find(se=>se.root_dir===N)||null}function L(N){return bg($(N),_.get(N))}function B(){for(let N of b()){let se=_.get(N.root_dir);se&&typeof se.revision=="number"&&typeof N.revision=="number"&&N.revision>=se.revision&&_.delete(N.root_dir)}}async function G(N,se,ae){let Se=t.transport,Ie=L(se);if(!(!Se||!bn(Ie))){try{let Ne=await Se(N,{...ae,root_dir:se,expected_revision:Ie.revision});if(bn(Ne?.queue)&&_.set(se,Ne.queue),Ne&&Ne.conflict){let A=bn(Ne.queue)&&typeof Ne.queue.revision=="number"?Ne.queue.revision:L(se)?.revision;Ne=await Se(N,{...ae,root_dir:se,expected_revision:A}),bn(Ne?.queue)&&_.set(se,Ne.queue)}}catch(Ne){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ne instanceof Error?Ne.message:String(Ne)}`)}oe()}}function Q(N){u!==N&&(u=N,t.onFocusChange?.(u),oe())}function P(N){Q(u===N?null:N)}function M(N){if(d===N){U();return}O(),d=N;let se=$(N);a.textContent=`${se?.name||N} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,p=Io(c,{root_dir:N,queue:()=>L(N),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ae=>{_.set(N,ae),oe()}}),p.load(),oe()}function O(){p?.destroy(),p=null}function U(N){O(),d=null,s.hidden=!0,a.textContent="",N!==!0&&oe()}let w=()=>U();i.addEventListener("click",w);function F(N){N.key==="Escape"&&u!==null&&Q(null)}document.addEventListener("keydown",F);function J(N,se){let ae=Math.max(se,N,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${se}\uAC1C \uC911 ${N}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ae},(Se,Ie)=>Ie<N?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function Te(N){let se=N.auto_advance===!0,ae=N.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${se?" is-on":""}`}
        data-act="auto"
        aria-pressed=${se?"true":"false"}
        aria-label=${`${N.name} \uC790\uB3D9\uD654`}
        title=${se?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${se?Tu():Eu()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ae?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ae?"true":"false"}
        aria-label=${`${N.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ae?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Cu()}
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
        ${Iu()}
      </button>`}function Y(N){let se=yg(N);return se?l`<div class="mon2-deck__chips">
      ${se.orchestration?l`<span class="mon2-deck__chip" title=${se.orchestration.title}
            >오케 ${se.orchestration.text}</span
          >`:""}
      ${se.worker?l`<span class="mon2-deck__chip" title=${se.worker.title}
            >워커 ${se.worker.text}</span
          >`:""}
    </div>`:""}function ce(N){let se=Rr(N,"running"),ae=typeof N.slots=="number"?N.slots:1;return l`<div
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
        ${Ru()} ${J(se,ae)}
        <span class="mon2-deck__counts"
          >${se}/${ae} 실행 · 대기 ${Rr(N,"queue")} · PR
          ${Rr(N,"pr_wait")}${Rr(N,"session_active")>0?` \xB7 \uC138\uC158 ${Rr(N,"session_active")}`:""}</span
        >
      </div>
      <div class="mon2-deck__ops">${Te(N)}</div>
      ${Y(N)}
    </div>`}function he(N){let se=t.doneItems?t.doneItems():[],ae=t.rangeLabel?t.rangeLabel():"",Se=Lu(Array.isArray(se)?se:[]),Ie=Ne=>N.reduce((A,fe)=>A+Rr(fe,Ne),0);return l`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${N.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ae}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${Ie("running")} · 대기 ${Ie("queue")} · PR
        ${Ie("pr_wait")}${Ie("session_active")>0?` \xB7 \uC138\uC158 ${Ie("session_active")}`:""}
        · ${ae} 완료
        ${Array.isArray(se)?se.length:0}
      </div>
      ${Se===null?"":l`<div class="mon2-deck__total-tokens">
            ${typeof Se=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${Ou(ae)}
                  >τ ${Se}</span
                >`:Se.map(Ne=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${Ne.provider}
                      title=${Ne.tooltip}
                      >τ ${Ne.label}</span
                    >`)}
          </div>`}
    </div>`}function Re(){let N=b();return N.length===0?"":l`<div class="mon2-deck__row">
      ${he(N)}
      <div class="mon2-deck__strip">
        ${N.map(se=>ce(se))}
      </div>
    </div>`}function Le(){u!==null&&!$(u)&&(u=null,t.onFocusChange?.(null))}function oe(){B(),Le(),d!==null&&!$(d)&&U(!0),Ke(Re(),r),p?.render()}function ie(N){let se=N.target;if(!se||typeof se.closest!="function")return;let ae=se.closest("[data-root-dir]");if(!ae)return;let Se=ae.getAttribute("data-root-dir")||"",Ie=se.closest("[data-act]")?.getAttribute("data-act");if(Ie==="worker"){t.gotoWorkerTab?.(Se);return}if(Ie==="auto"){G("worker-automation-toggle",Se,{on:L(Se)?.auto_advance!==!0});return}if(Ie==="merge"){G("worker-merge-auto-toggle",Se,{on:L(Se)?.auto_merge!==!0});return}if(Ie==="gear"){M(Se);return}P(Se)}function Me(N){if(N.key!=="Enter"&&N.key!==" ")return;let se=N.target;if(!se||typeof se.closest!="function")return;let ae=se.closest('[data-root-dir][role="button"]');!ae||ae!==se||(N.preventDefault(),P(ae.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ie),r.addEventListener("keydown",Me),{render:oe,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",F),r.removeEventListener("click",ie),r.removeEventListener("keydown",Me),i.removeEventListener("click",w),O(),Ke(l``,r),e.replaceChildren()}}}var vg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",wg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694";function ei(e,t){return`${e}\0${t}`}function kg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function $g(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function xg(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Ag(e,t){let n=new Set(t),r=new Map,s=new Map;for(let i of n){let c=Array.from(new Set((e.get(i)||[]).filter(u=>u!==i&&n.has(u))));r.set(i,c.length);for(let u of c){let d=s.get(u);d?d.push(i):s.set(u,[i])}}let o=[],a=Array.from(n).filter(i=>r.get(i)===0).sort();for(;a.length>0;){let i=a.shift();o.push(i);for(let c of(s.get(i)||[]).slice().sort()){let u=(r.get(c)||0)-1;r.set(c,u),u===0&&a.push(c)}}for(let i of t)o.includes(i)||o.push(i);return o}function Sg(e,t){let n=new Set;for(let[a,i]of t)for(let c of i)n.add(ei(a,c));let r=new Map,s=new Map;for(let a of e){let i=ei(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=ei(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Eg(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Tg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ti(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Pu(e,t,n){let r=$g(n.blocked_by_map),s=[],o=null,a=b=>{let $=n.owner_of.get(b);return typeof $!="string"||$.length===0?(o=kg(b),null):$},i=(b,$)=>{if(o!==null||b===$)return;let L=r.get(b)||[];if(!L.includes($))return;let B=a(b);B!==null&&(r.set(b,L.filter(G=>G!==$)),s.push({type:"dep-remove",a:b,b:$,root_dir:B}))},c=(b,$)=>{if(o!==null||b===$)return;let L=r.get(b)||[];if(L.includes($))return;let B=a(b);if(B!==null){if(xg(r,$,b)){o=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${b}\uAC00 \uC774\uBBF8 ${$}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}r.set(b,[...L,$]),s.push({type:"dep-add",a:b,b:$,root_dir:B})}},u=()=>{let b=n.lane_order.get(e.lane_id||"")||[],$=new Set(b),L=(r.get(e.bead_id)||[]).filter(G=>$.has(G)),B=b.filter(G=>(r.get(G)||[]).includes(e.bead_id));for(let G of L)i(e.bead_id,G);for(let G of B)i(G,e.bead_id);for(let G of L)for(let Q of B)c(Q,G);return b.filter(G=>G!==e.bead_id)},d=(b,$)=>{let L=n.lane_order.get(b)||[],B=L.indexOf(e.bead_id),G=Ag(r,L.filter(O=>O!==e.bead_id)),Q=b.startsWith("pending:")?G.length:Math.max(0,Math.min(G.length,B>=0&&$>B?$-1:$)),P=Q>0?G[Q-1]:null,M=Q<G.length?G[Q]:null;if(P===null){M!==null&&c(M,e.bead_id);return}c(e.bead_id,P),M!==null&&(r.get(M)||[]).includes(P)&&(i(M,P),c(M,e.bead_id))},p=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:vg};if(t.kind==="chain"&&e.kind==="repo-serial")return{refused:wg};if(e.kind==="chain"&&u(),t.kind==="chain"&&d(t.lane_id,t.marker_index),o!==null)return{refused:o};let _=[];if(t.kind==="candidate")e.kind!=="candidate"&&_.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let b=Eg(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")_.push(ti(e.bead_id,e.root_dir,b));else if(e.kind==="parallel"){let $=n.parallel_rows,L=$[Math.max(0,Math.min($.length,t.marker_index))];if(!(!!L&&L.bead_id===e.bead_id)&&Tg(n,e.root_dir)&&p!==void 0){let G=p>b?b:b-1;G>=0&&G!==p&&_.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:G},root_dir:e.root_dir})}}}else if(t.kind==="chain")e.kind==="candidate"&&_.push(ti(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0));else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(p!==void 0&&t.index!==p){let b=p>t.index?t.index:t.index-1;b>=0&&b!==p&&_.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:b},root_dir:e.root_dir})}}else _.push(ti(e.bead_id,e.root_dir,t.index,t.lane_id));return{ops:[...Sg(s,n.blocked_by_map),..._]}}var Du={running:3,paused:2,failed:1};function Nu(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),p=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!p&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=Du[u.run_state],p=Du[i];if(d>p||d===p&&(u.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:r}}var qu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],fs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Oo(e,t){let n=qu.find(s=>s.step===e);if(!n)return null;let r=qu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Fu(e){let t=fs.findIndex(n=>n.step===e);return fs.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function ir(e){let t=fs.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Cg(e){let t=fs.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:fs.length}}function Lo(e){let t=Cg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ri=new Set(["queued","running","retry_pending","repairing"]),ju=new Set(["failed","succeeded"]),Rg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},_s={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Ig={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:_s.base_containment,child_sweep:_s.child_sweep,branch_cleanup:_s.branch_cleanup,parent_close:_s.parent_close};function Og(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Lg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...ri,...ju].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Mg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function ni(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Rg[s];if(!o)return null;let a=Oo(n,`${r} ${o}`);return a?{...a,active:ri.has(s),failed:s==="failed"}:null}function Pg(e){return!e||typeof e!="object"?null:Ig[e.step]||null}function ms(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Pg(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=Og(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter($=>$&&typeof $=="object"&&Lg($,t,i)).sort(Mg):[],u=a?c:[],d=u.find($=>ri.has($.state));if(d)return ni(d);if(s)return s.step==="repo_operations"&&c[0]?ni(c[0],!0):null;let p=u.find($=>ju.has($.state)?$.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return ni(p);if(r){let $=Oo(r.step,r.label);return $?{...$,active:!0,failed:!1}:null}let _=typeof e.cleanup_cursor=="string"?_s[e.cleanup_cursor]:null;if(!_)return null;let b=Oo(_.step,_.label);return b?{...b,active:!0,failed:!1}:null}function Mo(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function si(e,t){return`${e}\0${t}`}function Bu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function oi(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Dg(e,t){return e==="internal"&&t===void 0}function Ir(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Uu(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Ir(s)})`,location_label:Ir(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=oi(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:Dg(a,s)}}function Wu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=si(i.root_dir,c.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(u,[]);for(let d of Array.isArray(c.items)?c.items:[])r.set(d.id,u)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=si(i.root_dir,c.id),d=Array.isArray(c.items)?c.items[0]:null,_=!!d&&d.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],b=s.get(u);if(b)for(let $ of _){let L=r.get($);L&&L!==u&&!b.includes(L)&&b.push(L)}}let o=(i,c)=>{let u=new Set,d=[i];for(;d.length>0;){let p=d.pop();if(p===c)return!0;!p||u.has(p)||(u.add(p),d.push(...s.get(p)||[]))}return!1},a=new Map;for(let[i,c]of s){let u=[];for(let d of c){let p=n.get(d);o(d,i)&&p&&u.push(p)}u.length>0&&a.set(i,u)}return a}function zu(e,t){return si(e,t)}var Hu=1,gs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],ii=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Or={show_blocked:!0,spec:"all"},Gu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Ng(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function qg(e,t){let{winners:n,resumed_from_ids:r}=Nu(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,c=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:ln(e,i.bead_id),can_pause:c==="running"&&d,can_resume:c!=="running"&&d&&!r.has(i.attempt_id)})}return s}function Vu(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Tt(e){return e&&typeof e=="object"?e:{}}function Fg(e,t,n){let r=Tt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=_=>Qt({pin:_,global:a,execution_defaults:s,runner_catalog:o,route:n}),c,u;try{c=i(r),u=i(null)}catch{return null}let d=Ku(ar(c,o),ar(u,o)),p=Ku(Wn(c,null),Wn(u,null));return d||p?{orchestration:d,worker:p}:null}function Ku(e,t){return!e||t&&t.text===e.text?null:e}function jg(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function Bg(e,t){let n=t.get(e);return n?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${Ir(n)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function Ug(e,t,n){let r=new Map;for(let c of e)r.set(c,Array.from(n.get(c)||[]).filter(u=>e.includes(u)).length);let s=[],o=new Map,a=e.filter(c=>(r.get(c)||0)===0).sort();for(let c of a)o.set(c,0);let i=[...a];for(;i.length>0;){let c=i.shift();s.push(c);let u=Array.from(t.get(c)||[]).filter(p=>e.includes(p)).sort(),d=(o.get(c)||0)+(u.length>1?1:0);for(let p of u){let _=(r.get(p)||0)-1;r.set(p,_);let b=o.get(p);o.set(p,b===void 0?d:Math.min(b,d)),_===0&&i.push(p)}}return{order:s,indent:o,cycle:s.length!==e.length}}function Wg(e,t,n){let r=new Map,s=new Map,o=new Set,a=(d,p,_)=>{let b=d.get(p);b?b.add(_):d.set(p,new Set([_]))},i=d=>t.get(d)?.lane==="done";for(let[d,p]of e)if(!i(d))for(let _ of p)_===d||i(_)||(o.add(_),o.add(d),a(r,_,d),a(s,d,_));let c=new Set,u=[];for(let d of Array.from(o).sort()){if(c.has(d))continue;let p=[],_=[d];for(c.add(d);_.length>0;){let P=_.pop();p.push(P);for(let M of[...r.get(P)||[],...s.get(P)||[]])c.has(M)||(c.add(M),_.push(M))}if(p.length<2)continue;let b=p.map(P=>t.get(P));if(b.every(P=>!!P&&/^s[1-5]$/.test(P.lane||""))&&b.every(P=>P&&b[0]&&P.root_dir===b[0].root_dir&&P.lane===b[0].lane))continue;let{order:L,indent:B,cycle:G}=Ug(p.slice().sort(),r,s),Q=G?p.slice().sort():L;u.push({key:p.slice().sort().join("\0"),cycle:G,nodes:Q.map(P=>{let M=t.get(P);return{id:P,workspace_name:M?M.workspace_name:"",root_dir:M?M.root_dir:"",location_label:M?Ir(M):Yu(P,n),indent:G?0:B.get(P)||0}})})}return u}function Yu(e,t){let n=oi(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function zg(e,t,n){let r=t.get(e);if(!r)return Yu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Ir(r)}function Hg(e,t,n){let r=[];for(let s of n.get(e)||[])s!==e&&t.has(s)&&!r.includes(s)&&r.push(s);return r}function Gg(e,t,n,r,s,o,a){let i=(p,_,b,$,L=!1)=>{let B=r.get(p),G=B&&B.lane==="parallel"&&typeof B.position=="number"?B.position-1:null;return{id:p,title:o.get(p)||p,workflow:a.get(p)||null,root_dir:B?B.root_dir:"",workspace_name:B?B.workspace_name:"",seq:_,indent:b,predecessors:$,location_label:zg(p,r,s),draggable:!L&&G!==null,...G!==null?{queue_index:G}:{}}},c=[];for(let p of e.slice().sort((_,b)=>_.key<b.key?-1:1)){let _=new Set(p.nodes.map(b=>b.id));c.push({lane_id:`chain:${p.key}`,label:"",pending:!1,cycle:p.cycle,rows:p.nodes.map((b,$)=>i(b.id,$+1,p.cycle?0:b.indent,p.cycle?[]:Hg(b.id,_,n),p.cycle))})}let u=new Set;for(let p of c)for(let _ of p.rows)u.add(_.id);let d=[];return t.forEach((p,_)=>{let b=p&&typeof p.seed=="string"&&p.seed.length>0?p.seed:null;b!==null&&u.has(b)||(d.push(_),c.push({lane_id:`pending:${_}`,label:"",pending:!0,cycle:!1,rows:b===null?[]:[i(b,1,0,[])]}))}),c.forEach((p,_)=>{p.label=`\uC5F0\uACB0 ${_+1} \xB7 \uB808\uD3EC \uAC04`}),{chain_lanes:c,pending_lanes_kept:d}}function ai(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Po(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function li(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...Or,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&gs.some(A=>A.value===n.candidate_sort)?n.candidate_sort:"repo_spec",c=new Map;for(let A of s)A&&typeof A.root_dir=="string"&&c.set(A.root_dir,A);let u=[],d=[],p=[],_=[],b=[],$=[],L=new Map,B=new Map,G=new Map,Q=new Map,P=new Map,M=new Map,O=new Map;for(let A of r){if(!A||typeof A.root_dir!="string")continue;let fe=A.root_dir,De=A.name||fe,we=c.get(fe),We=we&&typeof we.revision=="number"?we.revision:typeof A.revision=="number"?A.revision:0,Ue=Tt(A.attempts),Ge=Tt(A.bead_titles);for(let[R,m]of Object.entries(Ge))typeof m=="string"&&m.length>0&&M.set(R,m);let Xe=Tt(A.bead_times),st=Tt(A.pr_observations),K=Tt(A.admission),Z=Tt(A.revise_parked),Ce=Tt(A.merge_queue_state),Ye=Tt(A.cleanup_failed),He=Tt(A.discard_operations),pe=Tt(A.bead_blocked_by),C=Tt(A.bead_workflow);for(let[R,m]of Object.entries(C))m&&typeof m=="object"&&O.set(R,m);let X=Tt(A.pr_activity),ye=Array.isArray(A.repo_operations)?A.repo_operations:[],ee=Array.isArray(A.merge_queue)?A.merge_queue:[],$e=new Set(ee.filter(R=>R&&typeof R.bead_id=="string").map(R=>R.bead_id)),at=new Map(ee.filter(R=>R&&typeof R.bead_id=="string").map(R=>[R.bead_id,R])),ot=Array.isArray(A.queue)?A.queue:[],Ze=(Array.isArray(A.serial_lanes)?A.serial_lanes:[]).filter(R=>R&&/^s[1-5]$/.test(R.id)&&Array.isArray(R.entries)),pt=Tt(A.lane_states),mt=typeof A.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(A.serial_lane_count))):Math.min(5,Ze.length);G.set(fe,mt),Q.set(fe,ot.length);let gt=new Map(Ze.map(R=>[R.id,R])),it=new Map;for(let R of Ze)for(let m of R.entries)m&&typeof m.bead_id=="string"&&it.set(m.bead_id,R.id);for(let[R,m]of Object.entries(pe))Array.isArray(m)&&P.set(R,m.filter(E=>typeof E=="string"&&E.length>0));let yt=Array.isArray(A.done)?A.done:[];for(let R of yt)R&&typeof R.bead_id=="string"&&$.push({id:R.bead_id,root_dir:fe,workspace_name:De});let ze=new Map;for(let R of yt)R&&typeof R.bead_id=="string"&&typeof R.added_at=="number"&&ze.set(R.bead_id,R.added_at);let Qe=R=>({id:R,title:Ge[R]||R,root_dir:fe,workspace_name:De,expected_revision:We,draggable:!1,...Tt(Xe[R]).created_at?{created_at:Tt(Xe[R]).created_at}:{},...Tt(Xe[R]).updated_at?{updated_at:Tt(Xe[R]).updated_at}:{}}),Pe=new Set;for(let[R,m]of qg(Ue,ze))Pe.add(R),d.push({...Qe(R),lane:"running",...it.has(R)?{serial_lane_id:it.get(R)}:{},attempt_id:m.attempt_id,run_state:m.run_state,status:m.status||void 0,workflow:C[R]||null,can_pause:m.can_pause,can_resume:m.can_resume,started_at:m.started_at,last_event_at:m.last_event_at,last_activity:m.last_activity,legs:m.legs,runner:m.runner,model:m.model,effort:m.effort,speed:m.speed,resumed_from:m.resumed_from,continuation_mode:m.continuation_mode,usage:m.usage,exec_chips:{orchestration:Co(m),worker:null},discard:wn(He,R,{attempt_id:m.attempt_id}),badges:m.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:m.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:m.run_state==="failed"});for(let R of Array.isArray(A.session_active)?A.session_active:[]){let m=R&&R.bead_id;typeof m!="string"||Pe.has(m)||(Pe.add(m),Array.isArray(R.blocked_by)&&R.blocked_by.length>0&&P.set(m,R.blocked_by.filter(E=>typeof E=="string"&&E.length>0)),typeof R.title=="string"&&R.title.length>0&&M.set(m,R.title),R.workflow&&typeof R.workflow=="object"&&O.set(m,R.workflow),d.push({...Qe(m),title:R.title||Ge[m]||m,lane:"running",kind:"session",status:"in_progress",started_at:ai(R.started_at)??ai(R.updated_at)??void 0,updated_at:ai(R.updated_at)??void 0,workflow:R.workflow||null,labels:Array.isArray(R.labels)?R.labels:[],spec_id:typeof R.spec_id=="string"?R.spec_id:"",blocked:R.blocked===!0,...Array.isArray(R.blocked_by)?{blocked_by:R.blocked_by.filter(E=>typeof E=="string"&&E.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let R of Array.isArray(A.pr_wait)?A.pr_wait:[]){let m=R&&R.bead_id;if(typeof m!="string"||Pe.has(m))continue;Pe.add(m);let E=Tt(st[m]),D=Tt(E.pr),j=E.gate?Tt(E.gate):null,be=$e.has(m),ve=at.get(m)?.continuation_action||null,xe=!!ve&&ve.continuation===null,qe=Ce.active===m,vt=R.external===!0,nt=Ye[m]||null,Je=Tt(X[m]),At=ms({bead_id:m,merge_sha:R.merge_sha,cleanup_cursor:R.cleanup_cursor,merge_progress:Je.merge_progress||null,cleanup_failed:nt,repo_operations:ye}),Yt=Mo(At),je=!!j&&j.base_badge==="\uCDA9\uB3CC",Mt=!!nt&&["child_sweep","branch_cleanup","parent_close"].includes(nt.step)&&!!j&&j.tier==="merged",Nt=vt&&!!nt&&!!j&&j.tier==="merged",Ut=!!j&&["closed_unmerged","review","undecidable"].includes(j.tier),Ot=wn(He,m,{external:vt,merge_active:qe||At?.step==="merge",merge_queued:be,cleanup_active:Yt,merged:!!nt||j?.tier==="merged"}),Wt=!!Ot.operation;p.push({...Qe(m),lane:"pr_wait",workflow:C[m]||null,pr_number:typeof D.number=="number"?D.number:null,pr_url:typeof D.url=="string"?D.url:void 0,external:vt,usage:ln(Ue,m),merge_step:At,badges:xe?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:At?[j?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:nt?[ir(nt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${ir(nt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof j?.gate_badge=="string"&&j.gate_badge.length>0?[j.gate_badge]:[],alert:At?At.failed===!0:!!nt||Ut,reason:nt&&At?.active!==!0?Lo(nt.step):"PR \uB300\uAE30",merge_action:j?.tier==="merged"&&!Mt&&!Nt?!1:!be||xe,merge_enabled:!Wt&&(xe||j?.enabled===!0||je||Mt||Nt),merge_label:xe?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Nt||Mt?"\uC815\uB9AC \uC7AC\uAC1C":je&&!Mt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:xe?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Wt?Ot.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ot.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ot.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Nt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Mt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":je?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":j?.enabled===!0?`\uBA38\uC9C0 (${j.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${j?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:be&&!xe,cancel_enabled:!qe,continuation_mismatch:ve?.mismatch||null,discard:Ot,discard_action:Ot.action,discard_enabled:Ot.enabled,discard_title:Ot.title})}let ht=(R,m,E,D)=>{let j=R&&R.bead_id;if(typeof j!="string"||Pe.has(j))return null;Pe.add(j);let be=Z[j],ve=wn(He,j),xe=ve.operation?ve:null,qe={...Qe(j),lane:m,workflow:C[j]||null,draggable:!xe,discard:xe||void 0,reason:Vu(K,j),seq:E+1,queue_position:E+1,queue_index:E,queue_length:D,badges:be?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!be,revise_action:!!be,revise_enabled:!!be&&!xe,revise_title:be?be.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${be.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(pe,j)&&(qe.blocked_by=Array.isArray(pe[j])?pe[j].filter(vt=>typeof vt=="string"&&vt.length>0):[]),qe};for(let R=0;R<ot.length;R++){let m=ht(ot[R],"queue",R,ot.length);if(!m)continue;_.push(m);let E=L.get(fe);E?E.push(m):L.set(fe,[m])}let xt=R=>{let m=p.find(j=>j.id===R&&j.root_dir===fe);if(m)return{id:R,title:m.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let E=d.find(j=>j.id===R&&j.root_dir===fe),D=E&&E.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":E&&E.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:R,title:E?E.title:Qe(R).title,badge:D}},V=[];for(let R=0;R<Math.max(mt,Ze.length);R++){let m=`s${R+1}`,E=gt.get(m),D=E&&Array.isArray(E.entries)?E.entries:[],j=[];for(let xe=0;xe<D.length;xe++){let qe=ht(D[xe],m,xe,D.length);qe&&(j.push(qe),_.push(qe))}let be=Tt(pt[m]),ve=Array.isArray(be.occupied_by)?be.occupied_by.filter(xe=>typeof xe=="string"):[];j.length===0&&ve.length===0&&(mt<=1||R>=mt)||V.push({id:m,index:R,items:j,raw_length:D.length,occupied_by:ve,occupants:ve.map(xe=>xt(xe)),corrections:Array.isArray(be.corrections)?be.corrections.length:0,cycle:be.cycle===!0,...j.length===0&&ve.length===0?{empty:!0}:{}})}B.set(fe,V);let _e=Array.from({length:mt},(R,m)=>{let E=`s${m+1}`,D=gt.get(E),j=D&&Array.isArray(D.entries)?D.entries:[],be=Tt(pt[E]);return{id:E,index:j.length,length:j.length,occupied_by:Array.isArray(be.occupied_by)?be.occupied_by.filter(ve=>typeof ve=="string"):[]}});for(let R of Array.isArray(A.runnable)?A.runnable:[]){let m=R&&R.bead_id;if(typeof m!="string"||Pe.has(m))continue;Pe.add(m);let E=R.workflow&&typeof R.workflow=="object"?R.workflow:null,D=E&&typeof E.route=="string"&&E.route||(typeof R.route=="string"?R.route:null),j=Fg(Tt(we),R.exec_pins,D);Array.isArray(R.blocked_by)&&R.blocked_by.length>0&&P.set(m,R.blocked_by.filter(be=>typeof be=="string"&&be.length>0)),typeof R.title=="string"&&R.title.length>0&&M.set(m,R.title),E&&O.set(m,E),u.push({...Qe(m),title:R.title||Ge[m]||m,lane:"runnable",draggable:!0,reason:Vu(K,m),created_at:R.created_at??void 0,updated_at:R.updated_at??void 0,status:typeof R.status=="string"?R.status:void 0,labels:Array.isArray(R.labels)?R.labels:[],spec_id:typeof R.spec_id=="string"?R.spec_id:"",workflow:E||(D?{route:D,chips:{route:D}}:null),...j?{exec_chips:j}:{},blocked:R.blocked===!0,...Array.isArray(R.blocked_by)?{blocked_by:R.blocked_by.filter(be=>typeof be=="string"&&be.length>0)}:{},place_index:ot.length,place_lanes:_e})}for(let R of yt){let m=R&&R.bead_id;if(typeof m!="string"||Pe.has(m)||(Pe.add(m),o!==void 0&&typeof R.added_at=="number"&&R.added_at<o))continue;let E=Ng(Ue,m),D=E&&typeof E.done_kind=="string"?E.done_kind:null;b.push({...Qe(m),lane:"done",done:!0,done_layout:"three_line",usage:ln(Ue,m),work_ms:$o(Ue,m),done_at:typeof R.added_at=="number"?R.added_at:void 0,done_kind:D,badges:D&&Gu[D]?[Gu[D]]:[]})}}let U=new Map;s.forEach((A,fe)=>{A&&typeof A.root_dir=="string"&&U.set(A.root_dir,fe)});let w=n&&n.running_sort==="repo"?"repo":"started";d.sort((A,fe)=>{let De=A.kind==="session",we=fe.kind==="session";if(De!==we)return De?1:-1;if(De&&we){let Ge=Po(fe.updated_at)-Po(A.updated_at);return Ge!==0?Ge:A.id.localeCompare(fe.id)}if(w==="repo"){let Ge=U.get(A.root_dir)??Number.MAX_SAFE_INTEGER,Xe=U.get(fe.root_dir)??Number.MAX_SAFE_INTEGER;if(Ge!==Xe)return Ge-Xe}let We=typeof A.started_at=="number"&&Number.isFinite(A.started_at)?A.started_at:null,Ue=typeof fe.started_at=="number"&&Number.isFinite(fe.started_at)?fe.started_at:null;return We!==null&&Ue!==null&&We!==Ue?We-Ue:We===null&&Ue!==null?1:We!==null&&Ue===null?-1:A.id.localeCompare(fe.id)}),b.sort((A,fe)=>(fe.done_at??0)-(A.done_at??0));let F=s.length>0?s:r.map(A=>({root_dir:A&&A.root_dir,name:A&&A.name,auto_advance:A&&A.auto_advance,auto_merge:A&&A.auto_merge,slots:A&&A.slots,revision:A&&A.revision,runner_catalog:A&&A.runner_catalog})),J=new Set(u.map(A=>A.root_dir)),Te=[];for(let A of F){if(!A||typeof A.root_dir!="string")continue;let fe=L.get(A.root_dir)||[],De=B.get(A.root_dir)||[];!(fe.length>0||De.some(We=>We.items.length>0||We.occupied_by.length>0))&&!J.has(A.root_dir)||Te.push({root_dir:A.root_dir,name:A.name||A.root_dir,auto_advance:A.auto_advance===!0,auto_merge:A.auto_merge===!0,slots:typeof A.slots=="number"&&A.slots>=Hu?A.slots:Hu,revision:typeof A.revision=="number"?A.revision:0,runner_catalog:Tt(A.runner_catalog),items:fe,sublanes:{parallel:fe,serial:De},serial_lane_count:G.get(A.root_dir)||0,raw_queue_length:Q.get(A.root_dir)||0})}let Y={runnable:u,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:_,queue_groups:Te,running:d,pr_wait:p,done:b,chains:[],parallel_rows:[],chain_lanes:[],parallel_raw_length:Object.fromEntries(Q),owner_of:{},pending_lanes_kept:[]},ce=Bu(Y);for(let A of $)ce.has(A.id)||ce.set(A.id,{root_dir:A.root_dir,workspace_name:A.workspace_name,lane:"done",state:"done"});let he=new Map;for(let[A,fe]of P)for(let De of fe){let we=he.get(De);we?we.includes(A)||we.push(A):he.set(De,[A])}for(let A of[...Y.queue,...Y.runnable]){if(!Object.hasOwn(A,"blocked_by"))continue;let fe=ce.get(A.id);A.blockers=(A.blocked_by||[]).map(De=>Uu(De,fe,ce,s)),A.blocker_warnings=A.blockers.filter(De=>De.missing_internal).map(De=>`\u26A0 \uC120\uD589 ${De.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),A.blocker_warnings.length>0&&(A.alert=!0)}for(let A of[...Y.queue,...Y.runnable,...Y.running,...Y.pr_wait]){let fe=A.lane==="running"||A.lane==="pr_wait"?[]:(A.blockers||[]).map(jg),De=[];for(let Ue of he.get(A.id)||[]){let Ge=Bg(Ue,ce);Ge&&De.push(Ge)}let we=A.lane==="running"||A.lane==="pr_wait"?[]:A.blocker_warnings||[];if(fe.length===0&&De.length===0&&we.length===0)continue;let We={predecessors:fe,successors:De,warnings:we};A.dependency_chips=We}Y.chains=Wg(P,ce,s);let Re=Wu(Y.queue_groups);for(let A of Y.queue_groups)for(let fe of A.sublanes.serial){let De=Re.get(zu(A.root_dir,fe.id));De&&(fe.cross_wait_peers=De)}let Le=Gg(Y.chains,Array.isArray(n?.pending_lanes)?n.pending_lanes:[],P,ce,s,M,O);Y.chain_lanes=Le.chain_lanes,Y.pending_lanes_kept=Le.pending_lanes_kept;let oe=new Set;for(let A of Y.chain_lanes)for(let fe of A.rows)oe.add(fe.id);let ie=[];for(let A of L.values())for(let fe of A)oe.has(fe.id)||ie.push(fe);ie.sort((A,fe)=>{let De=A.workspace_name.localeCompare(fe.workspace_name);return De!==0?De:(A.queue_index??0)-(fe.queue_index??0)}),Y.parallel_rows=ie;let Me={};for(let[A,fe]of ce)typeof fe.root_dir=="string"&&fe.root_dir.length>0&&(Me[A]=fe.root_dir);Y.owner_of=Me;let N=Y.runnable.length,se=Y.runnable;a.show_blocked||(se=se.filter(A=>A.blocked!==!0));let ae=se.length;a.spec==="with"?se=se.filter(A=>!!A.spec_id):a.spec==="without"&&(se=se.filter(A=>!A.spec_id)),Y.runnable_hidden={blocked:N-ae,spec:ae-se.length};let Se=(A,fe)=>{let De=Po(fe.updated_at)-Po(A.updated_at);return De!==0?De:A.id.localeCompare(fe.id)},Ne=i==="repo_spec"?(A,fe)=>{let De=A.spec_id?0:1,we=fe.spec_id?0:1;return De!==we?De-we:Se(A,fe)}:Se;if(i==="updated_flat")Y.runnable=se.slice().sort(Se),Y.runnable_sections=[];else{let A=new Map;for(let we of se){let We=A.get(we.root_dir);We?We.push(we):A.set(we.root_dir,[we])}let fe=[],De=[];for(let we of F){if(!we||typeof we.root_dir!="string")continue;let We=(A.get(we.root_dir)||[]).slice().sort(Ne);A.delete(we.root_dir),We.length!==0&&(fe.push({root_dir:we.root_dir,name:we.name||we.root_dir,items:We.map(Ue=>({...Ue,workspace_name:""}))}),De.push(...We))}for(let[we,We]of A){let Ue=We.slice().sort(Ne);fe.push({root_dir:we,name:Ue[0]?.workspace_name||we,items:Ue.map(Ge=>({...Ge,workspace_name:""}))}),De.push(...Ue)}Y.runnable=De,Y.runnable_sections=fe}return Y}var Ju="bdui.monitor.done-range",ed="bdui.monitor.running_sort",td="bdui.monitor.candidate_sort",nd="beads-ui.monitor.candidate-filter",rd="beads-ui.monitor.sections";function Vg(){try{let e=window.localStorage.getItem(nd);if(!e)return{...Or};let t=JSON.parse(e);return!t||typeof t!="object"?{...Or}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Or.show_blocked,spec:ii.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Or}}}function Zu(e){try{window.localStorage.setItem(nd,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Kg(){try{let e=window.localStorage.getItem(td);return gs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Yg(e){try{window.localStorage.setItem(td,e)}catch{}}function Zg(){try{let e=window.localStorage.getItem(rd);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Qu(e){try{window.localStorage.setItem(rd,JSON.stringify(e))}catch{}}function Qg(){try{let e=window.localStorage.getItem(Ju);return an(e)?e:en}catch{return en}}function Xg(e){try{window.localStorage.setItem(Ju,e)}catch{}}function Jg(){try{return window.localStorage.getItem(ed)==="repo"?"repo":"started"}catch{return"started"}}function eh(e){try{window.localStorage.setItem(ed,e)}catch{}}var sd="tab:monitor:pipeline",th=1e3,nh=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Xu="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function rh(e){return e>=1&&e<=Xu.length?Xu[e-1]:`(${e})`}function od(e,t){let n=Et("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,c=t.router,u=t.now||(()=>Date.now()),d=t.confirm||(y=>typeof globalThis.confirm!="function"||globalThis.confirm(y)),p=Qg(),_=Jg(),b=Vg(),$=Kg(),L=Zg(),B=null,G=null,Q=[],P=null;function M(){let y=Pn.find(v=>v.value===p);return y?y.label:""}let O=document.createElement("div");O.className="mon",e.appendChild(O);let U=document.createElement("div");U.className="mon2-drawer",e.appendChild(U);let w=li(null,null),F=new Map,J=new Map,Te=null,Y=null,ce=null,he=Ar(U,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{B=null,$e()}});async function Re(y,v,I,W,re=!0){if(!o||!I)return null;let ke=await o(y,{...v,root_dir:I,expected_revision:W});if(ke&&ke.conflict&&re){ke.queue&&J.set(I,ke.queue);let ne=ke.queue&&typeof ke.queue.revision=="number"?ke.queue.revision:W;ke=await o(y,{...v,root_dir:I,expected_revision:ne})}return ke&&ke.queue&&I&&J.set(I,ke.queue),ke}function Le(y,v){let I=J.get(y),W=s&&s.get?s.get():null,re=(Array.isArray(W)?W:[]).find(ne=>ne?.root_dir===y);return(I||re)?.merge_queue?.find(ne=>ne.bead_id===v)?.continuation_action}async function oe(y,v,I,W){let re=await Re(y,v,I,W),ke=J.get(I)?.revision??re?.queue?.revision??W;return xn(re,(ne,x)=>Re(y,{...v,continuation:ne,decision_token:x},I,ke,!1),{refresh:ne=>Re(y,v,I,ne?.queue?.revision??J.get(I)?.revision??ke,!1)})}async function ie(y,v,I,W){let re=await xn({continuation_mismatch:W},(ne,x)=>Re("worker-merge-queue-add",{bead_id:v,continuation:ne,decision_token:x},y,I,!1)),ke=re?.queue?.merge_queue?.find(ne=>ne.bead_id===v)?.continuation_action;re?.applied!==!0&&ke?.continuation===null&&ke.mismatch&&await ie(y,v,re.queue.revision,ke.mismatch)}async function Me(y,v,I){let W=await Re("worker-discard",y,v,I);if(W&&W.discarded===!0){ge(Ao(W),"success",5e3);return}if(W&&W.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${W.reason}`,"error");return}if(W&&W.accepted&&W.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(W&&W.accepted){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${W.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}W&&!W.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function N(y,v,I){return!o||!I?null:await o(y,{...v,root_dir:I})}async function se(){let y=new Map;for(let v of w.pr_wait)y.has(v.root_dir)||y.set(v.root_dir,v.expected_revision);for(let[v,I]of y)await Re("worker-merge-queue-add-all",{},v,I)}function ae(y){let v=L[y];return!!(v&&v.runnable===!0)}function Se(y){let v={...L[y]||{}};v.runnable=!v.runnable,L={...L,[y]:v},Qu(L),$e()}function Ie(y){return L[y]===!0}function Ne(y){L={...L,[y]:L[y]!==!0},Qu(L),$e()}function A(y){let v=ae(y.root_dir);return l`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${y.root_dir}
        data-section="runnable"
        aria-expanded=${v?"false":"true"}
        aria-label=${`${y.name} \uC139\uC158 ${v?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${v?"\u25B8":"\u25BE"}
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
    </header>`}function fe(y,v){return l`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="candidate"
      data-root-dir=${y.root_dir}
    >
      ${v}
    </div>`}function De(y){if(G!==y.id)return null;let v=w.queue_groups.find(W=>W.root_dir===y.root_dir),I=y.place_lanes||[];return{bead_id:y.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:y.place_index??0},...w.chain_lanes.map((W,re)=>({id:`lane:${re}`,label:`\uC5F0\uACB0 ${re+1} \uB05D\uC5D0`,count:W.rows.length})),{id:"new-lane",label:"\uC0C8 \uC5F0\uACB0 \uB808\uC778",count:0},...I.map(W=>({id:`serial:${W.id}`,label:`${v?v.name:""} \uC9C1\uB82C ${Number(W.id.slice(1))}`,count:W.length}))]}}function we(y){return fe(y,Va(y,De(y),{exec_chips_mode:"pinned_only"}))}function We(){return w.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${w.runnable.map(y=>we(y))}
      </div>`:l`${w.runnable_sections.map(y=>{let v=ae(y.root_dir);return l`<section
        class="mon2-sec${v?" is-collapsed":""}"
        data-root-dir=${y.root_dir}
        data-section="runnable"
      >
        ${A({root_dir:y.root_dir,name:y.name,count:y.items.length})}
        ${v?"":l`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${y.items.map(I=>we(I))}
            </div>`}
      </section>`})}`}function Ue(y,v){return l`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="parallel"
      data-root-dir=${y.root_dir}
      data-row-index=${v}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${jn(y)}
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
    </div>`}function Ge(){let y=Ie("parallel");return l`<section
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
        <span class="mon2-area__count">${w.parallel_rows.length}</span>
      </header>
      ${y?"":l`<div class="mon2-area__body" data-drop="parallel">
            ${w.parallel_rows.length===0?l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:w.parallel_rows.map((v,I)=>Ue(v,I))}
          </div>`}
    </section>`}function Xe(y,v,I){return l`<div
      class="mon2-crow"
      style=${`--indent: ${v.indent}`}
      draggable=${v.draggable?"true":"false"}
      data-bead-id=${v.id}
      data-drag-kind="chain"
      data-root-dir=${v.root_dir}
      data-lane-id=${y.lane_id}
      data-row-index=${I}
      data-queue-index=${typeof v.queue_index=="number"?String(v.queue_index):""}
    >
      ${y.cycle?"":l`<span class="mon2-crow__seq" aria-hidden="true"
            >${rh(v.seq)}</span
          >`}
      ${v.workspace_name?l`<span class="worker-mini__repo" title=${v.root_dir}
            >${v.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${v.id}</span>
      ${Cr(v.workflow)}
      <span class="mon2-crow__title">${v.title}</span>
      ${v.predecessors.map(W=>l`<span class="worker-dep worker-dep--pred"
            ><span class="worker-dep__label">← ${W}</span></span
          >`)}
      <span class="mon2-crow__where"
        >${v.location_label==="\uC2E4\uD589\uC911"?`\u25CF ${v.location_label}`:v.location_label}</span
      >
      ${v.draggable?l`<button
            type="button"
            class="mon2-crow__detach"
            data-bead-id=${v.id}
            title="연결에서 빼고 앞뒤를 이어 붙입니다"
            aria-label="연결에서 빼기"
          >
            ✕
          </button>`:""}
    </div>`}function st(y){return l`<div class="mon2-clane" data-lane-id=${y.lane_id}>
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
            </div>`:y.rows.map((v,I)=>Xe(y,v,I))}
      </div>
    </div>`}function K(y,v,I){return l`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="repo-serial"
      data-root-dir=${v.root_dir}
      data-lane-id=${y.id}
      data-row-index=${I}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${jn(v)}
    </div>`}function Z(y){if(y.length===0)return"";let v=y.length-1;return`${y[0].id} \uC810\uC720${v>0?` +${v}`:""}`}function Ce(y){return l`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${y.id}
    >
      ${jn({id:y.id,title:y.title,lane:"running",draggable:!1,ghost:!0,badges:[y.badge]})}
    </div>`}function Ye(y,v){return l`<div
      class="mon2-lane${v.empty?" mon2-lane--empty":""}"
      data-root-dir=${y.root_dir}
      data-lane-length=${String(v.raw_length)}
    >
      ${un({id:"",lane:v.id,title:`${y.name} \xB7 \uC9C1\uB82C ${v.index+1}`,items:v.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:l`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${y.root_dir}
          data-lane-id=${v.id}
          data-lane-length=${String(v.raw_length)}
        >
          ${v.occupants.map(I=>Ce(I))}
          ${v.items.length>0?v.items.map((I,W)=>K(v,I,W)):v.occupants.length>0?"":l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:l`<span
            class="mon2-lane__badge${v.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${v.occupants.length>0?v.occupants.map(I=>`${I.id} \u2014 ${I.badge}`).join(`
`):""}
            >${Z(v.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${y.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${v.empty?l`<div class="mon2-lane__hint">
            ${y.name} 직렬 ${v.index+1} 비어 있음
          </div>`:""}
      ${v.cycle?l`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(v.cross_wait_peers||[]).map(I=>l`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${I.workspace_name}·${I.lane}과 교차 대기
          </div>`)}
    </div>`}function He(){let y=Ie("serial"),v=w.chain_lanes.some(I=>I.pending&&I.rows.length===0);return l`<section
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
          ?disabled=${v}
          title=${v?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4 \u2014 \uC0C8\uB85C\uACE0\uCE68\uD558\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${y?"":l`<div class="mon2-area__body">
            ${w.chain_lanes.map(I=>st(I))}
            ${w.queue_groups.map(I=>I.sublanes.serial.map(W=>Ye(I,W)))}
          </div>`}
    </section>`}function pe(){return l`<div class="mon2-wait">${Ge()}${He()}</div>`}function C(y){return l`<div class="worker-rungrid">
      ${w.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:w.running.map(v=>Za({bead_id:v.id,attempt_id:v.attempt_id||"",title:v.title,runner:v.runner??null,model:v.model??null,effort:v.effort??null,speed:v.speed??null,started_at:v.started_at??null,kind:v.kind,...v.kind==="session"?{updated_at:v.updated_at}:{},workflow:v.workflow||null,resumed_from:v.resumed_from??null,continuation_mode:v.continuation_mode??null,paused:v.run_state==="paused",failed:v.run_state==="failed",status:v.status,status_label:v.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:v.can_resume!==!1,can_pause:v.can_pause!==!1,exec_chips:v.exec_chips||null,usage:v.usage||null,discard:v.discard},y,B,{monitor:{repo:v.workspace_name,root_dir:v.root_dir,serial_lane_id:v.serial_lane_id,last_activity:v.last_activity||null,legs:v.legs||[],dependency_chips:v.dependency_chips||null}}))}
    </div>`}function X(y){let v={runnable:w.runnable,queue:w.queue,running:w.running,pr_wait:w.pr_wait,done:w.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${nh.map(I=>{let W=v[I.lane],re=I.lane==="runnable"?w.runnable_flat?W.length>0?We():void 0:w.runnable_sections.length>0?We():void 0:I.lane==="queue"?w.queue_groups.length>0||w.chain_lanes.length>0||w.parallel_rows.length>0?pe():void 0:I.lane==="running"?C(y):W.length>0?l`${W.map(ke=>jn(ke))}`:void 0;return un({id:`monitor-${I.lane}`,lane:I.pane,title:I.lane==="done"?`\uC644\uB8CC\xB7${M()}`:I.title,items:W,empty:I.empty,body:re,live:I.lane==="running"&&W.length>0,controls:I.lane==="runnable"?ye():void 0,header_control:ee(I.lane,W.length)})})}
      </div>`}function ye(){return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${b.show_blocked}
        />
        🔒
        blocked${w.runnable_hidden.blocked>0?` ${w.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ii.map(y=>l`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${b.spec===y.value?" is-active":""}"
              data-spec=${y.value}
              aria-pressed=${b.spec===y.value?"true":"false"}
            >
              ${y.label}
            </button>`)}
        ${w.runnable_hidden.spec>0?l`<span class="worker-filter__hidden"
              >숨김 ${w.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function ee(y,v){return y==="runnable"?l`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${$}
      >
        ${gs.map(I=>l`<option
              value=${I.value}
              ?selected=${$===I.value}
            >
              ${I.label}
            </option>`)}
      </select>`:y==="running"?l`<select
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
      </select>`:y==="pr_wait"&&v>0?l`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:y==="done"?l`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${p}
      >
        ${Pn.map(I=>l`<option value=${I.value} ?selected=${p===I.value}>
              ${I.label}
            </option>`)}
      </select>`:""}function $e(){let y=s&&s.get?s.get():null,v=s&&s.getWorkspacesState?s.getWorkspacesState():[],I=u(),W=()=>li(y,v,{done_since:Xn(p,I),running_sort:_,candidate_filter:b,candidate_sort:$,pending_lanes:Q});w=W(),w.pending_lanes_kept.length!==Q.length&&(Q=w.pending_lanes_kept.map(re=>Q[re]),w=W()),F=new Map;for(let re of[...w.runnable,...w.queue,...w.running,...w.pr_wait,...w.done])F.has(re.id)||F.set(re.id,re);Ke(X(I),O),ot()?.render(),at(),Ze()}function at(){let y=new Map;for(let v of w.queue_groups)y.set(v.root_dir,v.auto_advance);for(let v of Array.from(O.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let I=v.closest(".mon2-item")?.getAttribute("data-root-dir")||"",W=y.get(I);typeof W=="boolean"&&v.setAttribute("title",`${v.textContent||""} \xB7 ${W?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function ot(){if(ce)return ce;let y=O.querySelector(".mon2-deck");return y?(ce=Mu(y,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>w.done,rangeLabel:M,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:mt,onFocusChange:v=>{P=v,Ze()}}),ce):null}function Ze(){O.classList.toggle("has-focus",P!==null);for(let y of Array.from(O.querySelectorAll(".mon2-sec[data-root-dir]")))y.classList.toggle("is-focus",P!==null&&y.getAttribute("data-root-dir")===P);for(let y of Array.from(O.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let v=F.get(y.getAttribute("data-bead-id")||"");y.classList.toggle("is-focus",P!==null&&!!v&&v.root_dir===P)}for(let y of Array.from(O.querySelectorAll(".mon2-crow[data-root-dir]")))y.classList.toggle("is-focus",P!==null&&y.getAttribute("data-root-dir")===P)}function pt(y,v){let I=a?a():void 0;if(!v||!I||v===I||!i){r(y);return}i(v).then(()=>{r(y)}).catch(W=>{n("workspace switch for %s failed: %o",v,W)})}function mt(y){if(!y)return;let v=a?a():void 0,I=()=>{try{c?.gotoView("worker")}catch(W){n("gotoView(worker) failed: %o",W)}};if(!i||v&&v===y){I();return}i(y).then(I).catch(W=>{n("workspace switch for %s failed: %o",y,W),ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function gt(y){nn(y).then(v=>{ge(v?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",v?"success":"error",1400)})}function it(y){let v=F.get(y)||null;return{item:v,root_dir:v?v.root_dir:"",revision:v?v.expected_revision:0}}function yt(y){if(typeof y=="string"&&y.length>0)return y;if(y&&typeof y=="object"){let v=y;if(typeof v.message=="string"&&v.message.length>0)return v.message;if(typeof v.error=="string"&&v.error.length>0)return v.error;if(v.error&&typeof v.error=="object"&&typeof v.error.message=="string")return v.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function ze(y,v,I){let{root_dir:W}=it(v);if(!(!v||!I||I===v))try{await N(y,{a:v,b:I},W)}catch(re){ge(yt(re),"error")}}function Qe(){let y=new Map,v=s&&s.get?s.get():null,I=W=>Array.isArray(W)?W.filter(re=>typeof re=="string"&&re.length>0):[];for(let W of Array.isArray(v)?v:[]){if(!W||typeof W!="object")continue;let re=W.bead_blocked_by&&typeof W.bead_blocked_by=="object"?W.bead_blocked_by:{};for(let[ke,ne]of Object.entries(re))Array.isArray(ne)&&y.set(ke,I(ne));for(let ke of[...Array.isArray(W.runnable)?W.runnable:[],...Array.isArray(W.session_active)?W.session_active:[]])ke&&typeof ke.bead_id=="string"&&Array.isArray(ke.blocked_by)&&ke.blocked_by.length>0&&y.set(ke.bead_id,I(ke.blocked_by))}return y}function Pe(){let y=new Map;for(let I of w.chain_lanes)y.set(I.lane_id,I.rows.map(W=>W.id));let v=new Map;for(let I of w.parallel_rows)typeof I.queue_index=="number"&&v.set(I.id,I.queue_index);for(let I of w.queue_groups)for(let W of I.sublanes.serial)for(let re of W.items)typeof re.queue_index=="number"&&v.set(re.id,re.queue_index);return{blocked_by_map:Qe(),owner_of:new Map(Object.entries(w.owner_of)),lane_order:y,parallel_rows:w.parallel_rows.map(I=>({bead_id:I.id,root_dir:I.root_dir,queue_index:I.queue_index??0})),parallel_raw_length:new Map(Object.entries(w.parallel_raw_length)),queue_index_of:v}}function ht(y,v){let I=F.get(v);if(I&&I.root_dir===y)return I.expected_revision;let W=w.queue_groups.find(re=>re.root_dir===y);return W?W.revision:0}async function xt(y,v){try{if(y.type==="worker-queue-place"||y.type==="worker-queue-reorder"||y.type==="worker-queue-remove"){let I=await Re(y.type,y.payload,y.root_dir,ht(y.root_dir,v));return I&&I.conflict?(ge("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):I&&I.applied===!1?(ge(I.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${I.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0}return(y.type==="dep-add"||y.type==="dep-remove")&&await N(y.type,{a:y.a,b:y.b},y.root_dir),!0}catch(I){return ge(yt(I),"error"),!1}}async function V(y,v){let I=Pu(y,v,Pe());if("refused"in I){ge(I.refused,"error");return}if(v.kind==="chain"){let W=w.chain_lanes.find(ke=>ke.lane_id===v.lane_id),re=W&&W.pending&&W.rows.length===0?Number(W.lane_id.slice(8)):-1;re>=0&&Q[re]&&(Q=Q.map((ke,ne)=>ne===re?{seed:y.bead_id}:ke))}for(let W of I.ops)if(!await xt(W,y.bead_id))break;$e()}async function _e(y,v){let I=F.get(y);if(!I){$e();return}let W={kind:"candidate",bead_id:y,root_dir:I.root_dir};if(v==="new-lane"){Q.some(ke=>ke.seed===null)||(Q=[...Q,{seed:null}]),$e();let re=w.chain_lanes.find(ke=>ke.pending&&ke.rows.length===0);if(!re)return;await V(W,{kind:"chain",lane_id:re.lane_id,marker_index:0});return}if(v.startsWith("lane:")){let re=w.chain_lanes[Number(v.slice(5))];if(!re){$e();return}await V(W,{kind:"chain",lane_id:re.lane_id,marker_index:re.rows.length});return}if(v.startsWith("serial:")){let re=v.slice(7),ke=(I.place_lanes||[]).find(ne=>ne.id===re);await V(W,{kind:"repo-serial",root_dir:I.root_dir,lane_id:re,index:ke?ke.index:0});return}await V(W,{kind:"parallel",marker_index:w.parallel_rows.length})}async function R(y,v){let I=w.parallel_rows,W=I.findIndex(Ae=>Ae.id===y);if(W<0)return;let re=I[W].root_dir,ke=[];I.forEach((Ae,lt)=>{Ae.root_dir===re&&ke.push(lt)});let ne=ke.indexOf(W),x=ke[ne+v];if(typeof x!="number")return;let le=v===-1?x:ke[ne+2]??Math.min(I.length,x+1);await V({kind:"parallel",bead_id:y,root_dir:re,queue_index:I[W].queue_index??0},{kind:"parallel",marker_index:le})}async function m(y){for(let v of w.chain_lanes){let I=v.rows.find(W=>W.id===y);if(!(!I||!I.draggable)){await V({kind:"chain",bead_id:y,root_dir:I.root_dir,lane_id:v.lane_id,...typeof I.queue_index=="number"?{queue_index:I.queue_index}:{}},{kind:"parallel",marker_index:w.parallel_rows.length});return}}}let E=null,D=!1,j=null;function be(){j!==null&&clearTimeout(j),j=setTimeout(()=>{j=null,D=!1},0)}function ve(y,v){let I=v&&typeof v.closest=="function"?v.closest("[data-row-index]"):null;if(I&&y.contains(I)){let W=Number(I.getAttribute("data-row-index"));return Number.isFinite(W)?W:0}return y.querySelectorAll("[data-row-index]").length}function xe(y){let v=y.target,I=typeof v?.closest=="function"?v.closest("[data-drop]"):null;if(!I||!E)return null;let W=I.getAttribute("data-drop");if(W==="candidate")return{zone:I,target:{kind:"candidate"}};if(W==="parallel")return{zone:I,target:{kind:"parallel",marker_index:ve(I,v)}};if(W==="chain")return{zone:I,target:{kind:"chain",lane_id:I.getAttribute("data-lane-id")||"",marker_index:ve(I,v)}};if(W==="repo-serial"){let re=I.getAttribute("data-root-dir")||"";if(re!==E.root_dir)return null;let ke=typeof v?.closest=="function"?v.closest("[data-queue-index]"):null,ne=ke&&I.contains(ke)?ke.getAttribute("data-queue-index"):I.getAttribute("data-lane-length"),x=Number(ne);return{zone:I,target:{kind:"repo-serial",root_dir:re,lane_id:I.getAttribute("data-lane-id")||"",index:Number.isFinite(x)?x:0}}}return null}function qe(){for(let y of Array.from(O.querySelectorAll(".is-drop-over")))y.classList.remove("is-drop-over")}function vt(y){let v=y.target,I=typeof v?.closest=="function"?v.closest('[draggable="true"][data-bead-id]'):null,W=I?I.closest("[data-drag-kind]"):null;if(!W)return;let re=W.getAttribute("data-bead-id")||"",ke=W.getAttribute("data-drag-kind")||"",ne=W.getAttribute("data-root-dir")||"";if(!re||!ke||!ne)return;let x=W.getAttribute("data-queue-index")||"",le=Number(x),Ae=W.getAttribute("data-lane-id")||"";E={kind:ke,bead_id:re,root_dir:ne,...x!==""&&Number.isFinite(le)?{queue_index:le}:{},...Ae?{lane_id:Ae}:{}},D=!0,G=null,O.classList.add("is-dragging");try{y.dataTransfer?.setData("text/plain",re),y.dataTransfer&&(y.dataTransfer.effectAllowed="move")}catch{}}function nt(y){let v=xe(y);v&&(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"),v.zone.classList.add("is-drop-over"))}function Je(y){let v=y.target;typeof v?.closest=="function"&&v.closest("[data-drop]")?.classList.remove("is-drop-over")}function At(){E=null,qe(),O.classList.remove("is-dragging"),be()}function Yt(y){let v=xe(y),I=E;E=null,qe(),O.classList.remove("is-dragging"),!(!v||!I)&&(y.preventDefault(),V(I,v.target))}function je(y){return{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.run_state==="running"?"running":y.run_state,worktree:y.root_dir}}function Mt(y,v){let{item:I,root_dir:W,revision:re}=it(v),ke=I?.attempt_id||"",ne=y.classList;if(ne.contains("worker-dep__remove")){ze("dep-remove",v,y.dataset.blockerId||"");return}if(ne.contains("mon2-rowops__up")||ne.contains("mon2-rowops__down")){R(v,ne.contains("mon2-rowops__up")?-1:1);return}if(ne.contains("mon2-rowops__remove")){Re("worker-queue-remove",{bead_id:v},W,re);return}if(ne.contains("mon2-crow__detach")){m(v);return}if(ne.contains("worker-card__place")){G=G===v?null:v,$e();return}if(ne.contains("worker-card__place-cancel")){G=null,$e();return}if(ne.contains("worker-card__place-lane")){let x=y.getAttribute("data-lane")||"parallel";G=null,_e(v,x);return}if(ne.contains("rtile__session")){B=ke,ke&&I&&he.open({attempt_id:ke,root_dir:W,meta:je(I)}),$e();return}if(ne.contains("rtile__pause")){N("worker-attempt-pause",{attempt_id:ke},W);return}if(ne.contains("rtile__resume")){wr().then(x=>{if(x!==null)return oe("worker-attempt-resume",{attempt_id:ke,...x!==""?{instructions:x}:{}},W,re)});return}if(ne.contains("rtile__dismiss")){Re("worker-attempt-dismiss",{attempt_id:ke},W,re);return}if(ne.contains("rtile__discard")){if(!d(ds(v,"unmerged")))return;Me({bead_id:v,...ke?{attempt_id:ke}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},W,re);return}if(ne.contains("worker-mini__merge")){let x=Le(W,v);x?.mismatch&&x.continuation===null?ie(W,v,re,x.mismatch):Re("worker-merge-queue-add",{bead_id:v},W,re);return}if(ne.contains("worker-mini__merge-cancel")){Re("worker-merge-queue-remove",{bead_id:v},W,re);return}if(ne.contains("worker-mini__discard")){let x=y.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(ds(v,x)))return;Me({bead_id:v,...y.dataset.attemptId?{attempt_id:y.dataset.attemptId}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},W,re);return}if(ne.contains("worker-mini__revise-fix")){oe("worker-revise-fix",{bead_id:v},W,re);return}ne.contains("worker-mini__revise-approve")&&Re("worker-revise-approve",{bead_id:v},W,re)}function Nt(y){let v=D;D=!1;let I=y.target;if(!I||typeof I.closest!="function"||I.closest("dialog")||I.closest(".mon2-drawer")||I.closest("a"))return;let W=I.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(W){y.preventDefault();let _t=I.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||W.textContent?.trim()||"";_t&&gt(_t);return}let re=I.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(re){y.preventDefault();let Ct=re.getAttribute("data-root-dir")||F.get(I.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||re.getAttribute("title")||"";mt(Ct);return}let ke=I.closest(".mon2-sec__toggle");if(ke){y.preventDefault(),Se(ke.getAttribute("data-root-dir")||"");return}let ne=I.closest(".mon2-area__toggle");if(ne){y.preventDefault(),Ne(ne.getAttribute("data-area")||"parallel");return}if(I.closest(".mon2-newlane")){y.preventDefault(),Q=[...Q,{seed:null}],$e();return}if(I.closest(".mon-merge-all")){y.preventDefault(),se();return}let x=I.closest(".mon-filter__spec");if(x){y.preventDefault(),b={...b,spec:x.getAttribute("data-spec")||"all"},Zu(b),$e();return}let le=I.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!le)return;let Ae=le.getAttribute("data-bead-id")||"",lt=I.closest("button");if(lt){y.preventDefault(),Mt(lt,Ae);return}Ae&&!v&&(y.preventDefault(),pt(Ae,le.getAttribute("data-root-dir")||it(Ae).root_dir))}function Ut(y){let v=y.target;if(!v||typeof v.closest!="function")return;let I=v.closest(".mon-filter__blocked");if(I){b={...b,show_blocked:I.checked},Zu(b),$e();return}let W=v.closest(".mon-candidate-sort");if(W){$=gs.some(ne=>ne.value===W.value)?W.value:"repo_spec",Yg($),$e();return}let re=v.closest(".mon-running-sort");if(re){_=re.value==="repo"?"repo":"started",eh(_),$e();return}let ke=v.closest(".mon-done-range");ke&&(p=an(ke.value)?ke.value:en,Xg(p),$e())}e.addEventListener("click",Nt),e.addEventListener("change",Ut),e.addEventListener("dragstart",vt),e.addEventListener("dragover",nt),e.addEventListener("dragleave",Je),e.addEventListener("drop",Yt),e.addEventListener("dragend",At),s&&typeof s.subscribe=="function"&&(Te=s.subscribe(()=>{try{J.clear(),$e()}catch{}}));function Ot(){Y!==null&&(clearInterval(Y),Y=null)}function Wt(){j!==null&&(clearTimeout(j),j=null)}return{load(){n("load"),$e(),Y===null&&(Y=setInterval(()=>{try{$e()}catch{}},th))},pause(){Ot()},clear(){Ot(),Wt(),Te&&(Te(),Te=null),he.destroy(),ce?.destroy(),ce=null,e.removeEventListener("click",Nt),e.removeEventListener("change",Ut),e.removeEventListener("dragstart",vt),e.removeEventListener("dragover",nt),e.removeEventListener("dragleave",Je),e.removeEventListener("drop",Yt),e.removeEventListener("dragend",At),e.replaceChildren()}}}function ad(e,t,n){let r=Et("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(_){return b=>{b.preventDefault(),r("click tab %s",_),n.gotoView(_)}}function c(){let _=t.getState();return _.view==="worker"||_.view==="monitor"?_.view:"board"}function u(){let _=c();return l`
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
    `}function p(){s&&Ke(u(),s),o&&Ke(d(),o)}return p(),a=t.subscribe(()=>p()),{destroy(){a&&(a(),a=null),s&&Ke(l``,s),o&&Ke(l``,o)}}}var id=["bug","feature","task","epic","chore"];function ld(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var cd=["Critical","High","Medium","Low","Backlog"];function ud(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),c=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),p=n.querySelector("#btn-create"),_=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",o.appendChild(O);for(let U of id){let w=document.createElement("option");w.value=U,w.textContent=ld(U),o.appendChild(w)}a.replaceChildren();for(let U=0;U<=4;U+=1){let w=document.createElement("option");w.value=String(U);let F=cd[U]||"Medium";w.textContent=`${U} \u2013 ${F}`,a.appendChild(w)}}b();function $(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function L(O){s.disabled=O,o.disabled=O,a.disabled=O,i.disabled=O,c.disabled=O,d.disabled=O,p.disabled=O,p.textContent=O?"Creating\u2026":"Create"}function B(){u.textContent=""}function G(O){u.textContent=O}function Q(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?o.value=O:o.value="";let U=window.localStorage.getItem("beads-ui.new.priority");U&&/^\d$/.test(U)?a.value=U:a.value="2"}catch{o.value="",a.value="2"}}function P(){let O=o.value||"",U=a.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),U.length>0&&window.localStorage.setItem("beads-ui.new.priority",U)}async function M(){B();let O=String(s.value||"").trim();if(O.length===0){G("Title is required"),s.focus();return}let U=Number(a.value||"2");if(!(U>=0&&U<=4)){G("Priority must be 0..4"),a.focus();return}let w=String(o.value||""),F=String(c.value||""),J={title:O};w.length>0&&(J.type=w),String(U).length>0&&(J.priority=U),F.length>0&&(J.description=F),L(!0);try{await t("create-issue",J)}catch{L(!1),G("Failed to create issue");return}P(),L(!1),$()}return n.addEventListener("cancel",O=>{O.preventDefault(),$()}),_.addEventListener("click",()=>$()),d.addEventListener("click",()=>$()),n.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),M())}),r.addEventListener("submit",O=>{O.preventDefault(),M()}),{open(){r.reset(),B(),Q();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var sh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function oh(e,t){return sa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function dd(e,t,n){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=oh(r,e);return l`<button
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
  `}function pd(e,t,n){return l`
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
  `}function fd(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${sh.map(([n,r])=>l`<label class="settings-dialog__toggle">
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
  `}var ah=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function _d(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(he=>ge(he,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,u="",d=null;function p(){if(d)return d;let he=a.querySelector('[data-pane="execution"]');return he?(d=Io(he,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Re=>t.queueStore?.set?.(Re)}),d):null}function _(){return l`
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
    `}function b(){let he=r.get();return l`
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
              ${dd(he,s(),G)}
              ${pd(he,u,{onDraft:Re=>{u=Re},onAdd:Q,onRemove:P})}
              ${fd(he,M)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function $(he){let Re=r.get();if(Re)try{let Le=await n("display-policy-set",{expected_revision:Re.revision,policy:he(Re)});L(Le),Le&&Le.conflict&&Le.policy&&(Le=await n("display-policy-set",{expected_revision:Le.policy.revision,policy:he(Le.policy)}),L(Le)),Le&&Le.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function L(he){he&&he.policy&&typeof he.policy=="object"&&r.set(he.policy)}function B(he){$(he)}function G(he){let Re=r.get();if(!Re)return;let Le=!ih(he,Re);B(oe=>lh(he,oe,Le))}function Q(){let he=u.trim();he.length!==0&&(u="",B(Re=>Re.hidden_prefixes.includes(he)?{hidden_prefixes:Re.hidden_prefixes}:{hidden_prefixes:[...Re.hidden_prefixes,he]}),O())}function P(he){B(Re=>({hidden_prefixes:Re.hidden_prefixes.filter(Le=>Le!==he)}))}function M(he){let Re=r.get();if(!Re)return;let Le=Re.chips[he]===!1;B(()=>({chips:{[he]:Le}}))}function O(){Ke(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${ah.map(he=>l`<button
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
              @click=${ce}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${_()} ${b()}
          </div>
        </div>
      `,a),p()}function U(he){i=he,O()}let w=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",w),a.addEventListener("cancel",w);let F=he=>{he.target===a&&ce()};a.addEventListener("click",F);let J=null;r.subscribe&&(J=r.subscribe(()=>{c&&O()}));let Te=null;t.implPresetStore?.subscribe&&(Te=t.implPresetStore.subscribe(()=>{c&&d?.render()}));function Y(he="execution"){c||(c=!0,t.onOpenChange?.(!0),i=he,u="",O(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),p()?.load())}function ce(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Y,close:ce,sessionDraft:()=>d?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",w),a.removeEventListener("cancel",w),a.removeEventListener("click",F),J&&(J(),J=null),Te&&(Te(),Te=null),d?.destroy(),d=null,a.remove()}}}function ih(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function lh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var ch=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],md="usage-meter-card",uh="usage-meter-layer",gd=600,dh=["token_expired","relogin_required"];function hd(e){return String(e).padStart(2,"0")}function ph(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function bd(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${hd(r.getHours())}:${hd(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${ch[r.getMonth()]} ${r.getDate()} ${o}`;return`${ph(n,t)} \xB7 ${i}`}function fh(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function yd(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function vd(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var wd=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function $d(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function _h(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:$d(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function mh(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=_h(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?$d(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function kd(e,t){return`${e}:${t}`}function xd(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function u(){Ke(l``,e),e.hidden=!0,p()}function d(){if(c===null){let oe=e.ownerDocument;c=oe.createElement("div"),c.id=uh,c.className="usage-meter__layer",oe.body.appendChild(c)}return c}function p(){c!==null&&(Ke(l``,c),c.remove(),c=null)}function _(oe){n!==oe&&(n===null&&(document.addEventListener("mousedown",$),document.addEventListener("keydown",B),window.addEventListener("resize",L)),n=oe)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",$),document.removeEventListener("keydown",B),window.removeEventListener("resize",L))}function $(oe){let ie=oe.target;ie&&(e.contains(ie)||c!==null&&c.contains(ie))||(b(),ce())}function L(){ce()}function B(oe){oe.key==="Escape"&&(b(),ce())}function G(oe){n===oe?b():_(oe),ce()}function Q(){b(),ce()}async function P(oe,ie){if(r.has(oe.key))return;let Me=kd(oe.key,ie);r.set(oe.key,ie),a.delete(Me),ce();let N=null;try{N=await(await fetch(oe.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ie})})).json()}catch{N=null}if(t)return;if(r.delete(oe.key),!N||N.ok!==!0){let ae=N&&typeof N.error=="string"&&N.error.length>0?N.error:"network_error";a.set(Me,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ae}`}),ce();return}let se=Array.isArray(N.warnings)?N.warnings.filter(ae=>typeof ae=="string"&&ae.length>0):[];se.length>0&&a.set(Me,{kind:"warn",text:se.join(" \xB7 ")}),ce(),await Le()}function M(oe,ie,Me,N){let se=vd(oe.pct),Se=`resets ${bd(oe.resetsAt,N)}${ie?` \xB7 ${Me}`:""}`;return l`<span
      class="usage-meter__window ${yd(se)}"
      style=${`--progress: ${se}%`}
      title=${Se}
    >
      <span class="usage-meter__label">${oe.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${se}%</span>
    </span>`}function O(oe,ie,Me){let N=ie.available&&typeof ie.ageSeconds=="number"&&ie.ageSeconds>gd,se=N&&typeof ie.ageSeconds=="number"?`${Math.floor(ie.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",ae=ie.accounts.filter(A=>!A.active).length,Se=`usage-meter__group${N?" usage-meter__group--stale":""}`,Ie=l`<span class="usage-meter__provider"
        >${oe.label}</span
      >
      ${ie.available?ie.windows.map(A=>M(A,N,se,Me)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ae>0?l`<span class="usage-meter__badge">+${ae}</span>`:""}`;if(ie.accounts.length===0)return l`<span
        class=${Se}
        aria-label=${`${oe.label} usage`}
        >${Ie}</span
      >`;let Ne=n===oe.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${Se}`}
      aria-label=${`${oe.label} usage`}
      aria-expanded=${Ne?"true":"false"}
      aria-controls=${md}
      @click=${()=>G(oe.key)}
    >
      ${Ie}
    </button>`}function U(oe,ie){return l`<span class="usage-meter" aria-label="Usage">
      ${oe.map(Me=>O(Me.provider,Me.snapshot,ie))}
    </span>`}function w(oe,ie){let Me=vd(oe.pct),N=bd(oe.resetsAt,ie);return l`<span
      class="usage-meter__account-window ${yd(Me)}"
      style=${`--progress: ${Me}%`}
    >
      <span class="usage-meter__account-key">${oe.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Me}%</span>
      <span class="usage-meter__account-reset"
        >${N.length>0?`\u21BB ${N}`:""}</span
      >
    </span>`}function F(oe,ie){return dh.includes(ie)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${oe.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function J(oe,ie,Me){let N=ie.status==="ok",se=typeof ie.ageSeconds=="number"&&ie.ageSeconds>gd,ae=a.get(kd(oe.key,ie.number)),Se=r.get(oe.key),Ie=Se!==void 0,Ne=Se===ie.number,A=["usage-meter__account"];return ie.active&&A.push("usage-meter__account--active"),N||A.push("usage-meter__account--unavailable"),se&&A.push("usage-meter__account--stale"),l`<div class=${A.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${ie.email}
          >${ie.alias===null?ie.email:ie.alias}</span
        >
        ${ie.plan===null?"":l`<span class="usage-meter__account-tag">${ie.plan}</span>`}
        ${ie.active?l`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${ie.ageSeconds===null?"":l`<span class="usage-meter__account-age"
              >${fh(ie.ageSeconds)}</span
            >`}
        ${ie.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Ie}
              @click=${()=>{P(oe,ie.number)}}
            >
              ${Ne?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${N?l`<div class="usage-meter__account-windows">
            ${ie.windows.map(fe=>w(fe,Me))}
          </div>`:l`<div class="usage-meter__account-status">
            ${F(oe,ie.status)}
          </div>`}
      ${ae===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${ae.kind}"
          >
            ${ae.text}
          </div>`}
    </div>`}function Te(oe,ie,Me){let N=ie.accounts.filter(se=>se.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${oe.label} · 활성 ${N} / 전체
        ${ie.accounts.length}
      </h2>
      ${ie.accounts.map(se=>J(oe,se,Me))}
    </section>`}function Y(oe,ie){return l`<div
      class="usage-meter__card"
      id=${md}
      role="dialog"
      aria-label=${`${oe.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${Te(oe.provider,oe.snapshot,ie)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ce(){let oe=[];for(let N of wd){let se=o.get(N.key);se&&oe.push({provider:N,snapshot:se})}if(oe.length===0){b(),u();return}let ie=oe.find(N=>N.provider.key===n&&N.snapshot.accounts.length>0);ie||b();let Me=Date.now();Ke(U(oe,Me),e),e.hidden=!1,ie?he(ie,Me):p()}function he(oe,ie){let Me=d(),N=e.getBoundingClientRect(),se=e.ownerDocument.documentElement.clientWidth;Me.style.setProperty("--usage-meter-anchor-top",`${N.bottom}px`),Me.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,se-N.right)}px`),Ke(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${Q}
        ></div>
        ${Y(oe,ie)}`,Me)}async function Re(oe){try{let ie=await fetch(oe.endpoint);return ie.ok?mh(await ie.json()):null}catch{return null}}async function Le(){i+=1;let oe=i,ie=await Promise.all(wd.map(async Me=>({provider:Me,snapshot:await Re(Me)})));if(!(t||oe!==i)){for(let Me of ie)Me.snapshot?o.set(Me.provider.key,Me.snapshot):o.delete(Me.provider.key);ce()}}return u(),Le(),s=setInterval(()=>{Le()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),u()}}}function Ad(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var gh="worker-ineligible";function ci(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Sd(e){return ci(e).includes(gh)}var hh="worker-serial";function ui(e){return ci(e).includes(hh)}function di(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var bh=new Set(["done","failed","orphaned","stopped","discarded"]),yh={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},vh={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},wh={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function pi(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:wh[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Ed(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,u=new Map,d=!1,p=null,_=null,b=null,$=new Set,L=!1,B=0,G=null,Q=new Set;function P(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function M(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function O(){return o&&o()||""}async function U(){if(!s)return;let m=++B;L=!0,b=null,$.clear(),ze();try{let E=await s("worker-parallel-analysis-targets",{root_dir:O()});if(m!==B||!Qe)return;let D=Array.isArray(E?.qualified)?E.qualified:[],j=Array.isArray(E?.excluded)?E.excluded:[];b={qualified:D,excluded:j};for(let be of D)be&&typeof be.id=="string"&&$.add(be.id)}catch{m===B&&Qe&&(b={qualified:[],excluded:[]},ge("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{m===B&&(L=!1,Qe&&ze())}}function w(m){return Array.isArray(m.runs)?m.runs:[]}function F(){let m=P(),E=new Set;for(let D of Object.values(m.attempts||{})){let j=D;j&&typeof j.bead_id=="string"&&!bh.has(j.status)&&E.add(j.bead_id)}for(let D of Array.isArray(m.pr_wait)?m.pr_wait:[])D&&typeof D.bead_id=="string"&&E.add(D.bead_id);for(let D of Object.values(m.discard_operations||{})){let j=D;j&&j.phase!=="done"&&typeof j.bead_id=="string"&&E.add(j.bead_id)}return E}function J(m){return m.filter(E=>Te(E)===null)}function Te(m){let E=P();for(let D of Array.isArray(E.serial_lanes)?E.serial_lanes:[])if(Array.isArray(D?.entries)&&D.entries.some(j=>j.bead_id===m))return D.id;return(Array.isArray(E.queue)?E.queue:[]).some(D=>D.bead_id===m)?"parallel":null}function Y(m,E){let D=c.get(m);return D||[...E.order]}function ce(m){if(m.length<2)return!1;let E=Te(m[0]);if(!E||E==="parallel")return!1;let D=P(),j=(Array.isArray(D.serial_lanes)?D.serial_lanes:[]).find(ve=>ve.id===E)?.entries.map(ve=>ve.bead_id);if(!Array.isArray(j))return!1;let be=m.map(ve=>j.indexOf(ve));return be.every(ve=>ve>=0)&&be.every((ve,xe)=>xe===0||ve>be[xe-1])}function he(){let m=P(),E=Array.isArray(m.serial_lanes)?m.serial_lanes:[],D=E.find(j=>Array.isArray(j.entries)&&j.entries.length===0);return D?D.id:E[0]?.id||"s1"}function Re(m){let E=P().bead_titles||{};return typeof E[m]=="string"?E[m]:m}async function Le(m,E){if(!s||d)return null;d=!0,ze();try{return await s(m,E)}finally{d=!1,ze()}}async function oe(m){r?.setPending?.(!0);try{let E=await Le("worker-parallel-analysis-start",{force:m,target_ids:Array.from($)});E&&E.applied===!1&&E.reason&&(E.reason==="target_not_qualified"&&Array.isArray(E.detail)?ge(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${E.detail.join(", ")}`,"error",3200):ge(`\uBD84\uC11D \uC2E4\uD328: ${E.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ie(){let m=M().job;!s||!m||await s("worker-parallel-analysis-cancel",{job_id:m.job_id})}async function Me(m){if(!(!s||Q.has(m))){Q.add(m),ze();try{let E=await s("worker-parallel-analysis-prompt",{root_dir:O(),run_id:m});if(!Qe)return;if(E?.ok===!0&&typeof E.prompt=="string"){G={run_id:m,prompt:E.prompt};return}ge(E?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{Q.delete(m),ze()}}}function N(){G=null,ze()}async function se(){if(!G)return;let m=await nn(G.prompt);ge(m?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",m?"success":"error",1400)}function ae(m,E){a&&a(m,pi(E))}function Se(){return P().runner_catalog}function Ie(m){return Object.keys(Se()?.runners?.[m]?.models||{})}function Ne(m){let E=Ie(m),D=Se()?.runners?.[m]?.default_model;return typeof D=="string"&&E.includes(D)?D:E[0]||""}function A(){let m=M().settings,E=p||m.runner||"claude",D=Ie(E),j=p?Ne(E):m.model||D[0]||"",be=di(Se(),E,j),ve=m.effort||"",xe=be.includes(ve)?ve:be[0]||"";return{runner:E,model:j,effort:xe,models:D,efforts:be}}async function fe(m){let E=M().settings,D=await Le("worker-parallel-analysis-settings-update",{expected_revision:E.revision,runner:m.runner,model:m.model,effort:m.effort});(!D||D.applied!==!0)&&(p=null,ze(),D&&D.reason&&ge(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${D.reason}`,"error",2800))}function De(m){p=m,ze();let E=A();fe({runner:m,model:E.model,effort:E.effort})}function we(m){let E=A(),D=di(Se(),E.runner,m);fe({runner:E.runner,model:m,effort:D.includes(E.effort)?E.effort:D[0]||""})}function We(m){let E=A();fe({runner:E.runner,model:E.model,effort:m})}async function Ue(m,E){if(!s||d)return;let D=Y(m,E),j=M();if(D.length<2||!j.last_good){ge("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let be=u.get(m)||he(),ve=()=>({snapshot_digest:j.last_good.identity_digest,group_index:m,lane:be,ordered_bead_ids:D,expected_revision:P().revision});d=!0,ze();try{let xe=await s("worker-parallel-analysis-submit",ve());xe&&xe.queue&&n&&n.set(xe.queue),xe&&xe.applied!==!0&&xe.conflict===!0&&(xe=await s("worker-parallel-analysis-submit",ve()),xe&&xe.queue&&n&&n.set(xe.queue)),xe&&xe.applied===!0?(c.delete(m),ge(`\uC9C1\uB82C \uB808\uC778 ${be}\uC5D0 ${D.length}\uAC1C \uBC30\uCE58`,"success")):ge(`\uC81C\uCD9C \uAC70\uBD80: ${xe?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,ze()}}function Ge(m,E,D){c.set(m,Y(m,E).filter(j=>j!==D)),ze()}function Xe(m){c.delete(m),ze()}function st(m,E,D,j){let be=[...Y(m,E)],ve=be.indexOf(D),xe=ve+j;ve<0||xe<0||xe>=be.length||(be.splice(xe,0,...be.splice(ve,1)),c.set(m,be),ze())}function K(){let m=M().settings,E=Object.keys(Se()?.runners||{}),D=A();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${j=>De(j.target.value)}
        >
          ${E.map(j=>l`<option
                value=${j}
                ?selected=${D.runner===j}
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
          @change=${j=>we(j.target.value)}
        >
          ${D.models.map(j=>l`<option
                value=${j}
                ?selected=${D.model===j}
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
          @change=${j=>We(j.target.value)}
        >
          ${D.efforts.map(j=>l`<option
                value=${j}
                ?selected=${D.effort===j}
              >
                ${j}
              </option>`)}
        </select>
      </label>
      ${Z(m)}
    </div>`}function Z(m){return!Ye(m)||Ce(m)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:m.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${m.runner}/${m.model} · effort
        ${m.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:m.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function Ce(m){return m.is_default===!0&&m.compatible===!1}function Ye(m){return!!(m.runner&&m.model&&m.effort)}function He(m){return Ye(m)&&m.compatible!==!1}function pe(m){let E=Math.max(0,Math.floor(m/1e3)),D=Math.floor(E/60),j=E%60;return`${D}:${String(j).padStart(2,"0")}`}function C(m){let E=m.job;if(E){let D=typeof E.started_at=="number"?E.started_at:0,j=`${E.runner||"?"}/${E.model||"?"}`,be=D?` \xB7 \uACBD\uACFC ${pe(Date.now()-D)}`:"",ve=typeof E.session_id=="string"?E.session_id:"",xe=w(m).find(qe=>qe.run_id===E.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${j} · effort ${E.effort||"?"}${be}</span
        >
        ${ve?l`<code class="pa-session-id" title=${ve}
              >${ve.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ae(E.job_id,xe||E)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${xe?.prompt_saved!==!0||Q.has(E.job_id)}
          @click=${()=>{Me(E.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return X()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function X(){return r?.isPending?.()===!0}function ye(m){let E=!!m.job,D=He(m.settings),j=b!==null&&$.size===0,be=E||d||X()||L;return l`<div class="pa-meta">
      ${m.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(m.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${C(m)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!D||be||j}
        @click=${()=>{oe(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!D||be||j}
        @click=${()=>{oe(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!E}
        @click=${()=>{ie()}}
      >
        취소
      </button>
    </div>`}function ee(m){return typeof m=="string"&&m.length>0?m:"\uBBF8\uBC30\uCE58"}function $e(m,E){E?$.add(m):$.delete(m),ze()}function at(m){let E=Array.isArray(m.scope)?m.scope:[],D=Array.isArray(m.overlaps)?m.overlaps:[];return E.length===0&&D.length===0?l``:l`<span class="pa-target__signals">
      ${E.length>0?l`<details class="pa-target__scope" title=${E.join(`
`)}>
            <summary>scope ${E.length}</summary>
            <ul>
              ${E.map(j=>l`<li><code>${j}</code></li>`)}
            </ul>
          </details>`:""}
      ${D.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${D.join(", ")}`}
            >겹침 ${D.join(", ")}</span
          >`:""}
    </span>`}function ot(){let m=b?.qualified||[],E=b?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${L?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${m.length} \xB7 \uC81C\uC678 ${E.length}`}</span
        >
      </header>
      ${b&&m.length>0?l`<ul class="pa-targets__list">
            ${m.map(D=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${D.id}
                      .checked=${$.has(D.id)}
                      @change=${j=>$e(D.id,j.target.checked)}
                    />
                    <span class="pa-target__title">${D.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${at(D)}
                    <span class="pa-target__route">${D.route}</span>
                    <span class="pa-target__lane"
                      >${ee(D.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:b&&m.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${b&&E.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${E.length}</summary>
            <ul class="pa-targets__list">
              ${E.map(D=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${D.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${yh[D.reason]||D.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${ee(D.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function Ze(m){let E=typeof m.session_id=="string"&&m.session_id.length>0,D=E?m.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${m.outcome}"
        >${vh[m.outcome]||m.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(m.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${m.runner||"?"} / ${m.model||"?"} / ${m.effort||"?"}</span
      >
      ${E?l`<code class="pa-session-id" title=${D}
            >${D.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${m.outcome==="failure"&&m.reason?l`<span class="pa-run-row__reason">${m.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ae(m.run_id,m)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${m.prompt_saved!==!0||Q.has(m.run_id)}
          @click=${()=>{Me(m.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function pt(m){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${m.length>0?l`<ul class="pa-runs__list">
            ${m.map(E=>Ze(E))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function mt(){return G?l`<div
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
            <code>${G.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{se()}}>
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
${G.prompt}</pre
        >
      </section>
    </div>`:""}function gt(m,E){let D=Y(m,E),j=F(),be=D.filter(Je=>j.has(Je)),ve=J(D),xe=ce(D),qe=Array.isArray(P().serial_lanes)?P().serial_lanes:[],vt=u.get(m)||he(),nt=E.eligible!==!0||D.length<2||be.length>0||ve.length>0||xe||d;return l`<section class="pa-group" data-group-index=${String(m)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${E.confidence}</span>
        ${E.categories.map(Je=>l`<span class="pa-group__category">${Je}</span>`)}
        ${xe?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${E.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${ve.length>0?l`<span class="pa-group__stale"
              >stale — ${ve.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${E.reason}</p>
      <ol class="pa-group__members">
        ${D.map((Je,At)=>l`<li class="pa-member" data-bead-id=${Je}>
              <span class="pa-member__seq">${At+1}</span>
              <span class="pa-member__title">${Re(Je)}</span>
              ${j.has(Je)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Je}
                ?disabled=${At===0}
                aria-label=${`${Je} \uC704\uB85C`}
                @click=${()=>st(m,E,Je,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Je}
                ?disabled=${At===D.length-1}
                aria-label=${`${Je} \uC544\uB798\uB85C`}
                @click=${()=>st(m,E,Je,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Je}
                aria-label=${`${Je} \uC81C\uC678`}
                @click=${()=>Ge(m,E,Je)}
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
          @click=${()=>Xe(m)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Je=>{u.set(m,Je.target.value),ze()}}
          >
            ${qe.map((Je,At)=>l`<option
                  value=${Je.id}
                  ?selected=${vt===Je.id}
                >
                  직렬 ${At+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${nt}
          @click=${()=>{Ue(m,E)}}
        >
          제출
        </button>
      </footer>
    </section>`}function it(m){let E=Array.isArray(m.issues)?m.issues:[],D=E.filter(be=>be.verdict==="parallel_ok").length,j=E.filter(be=>be.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${D}</span>
      <span>uncertain ${j}</span>
    </div>`}function yt(){let m=Qe&&!!M().job;if(m&&_===null){_=setInterval(()=>ze(),1e3);return}!m&&_!==null&&(clearInterval(_),_=null)}function ze(){let m=M();p&&m.settings.runner===p&&(p=null);let E=m.last_good?.result;yt(),Ke(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${R}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${K()} ${ye(m)} ${ot()}
            ${E?l`${E.groups.map((D,j)=>gt(j,D))}
                ${E.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${it(E)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${pt(w(m))}
          </div>
        </div>
        ${mt()}
      `,i)}let Qe=!1,Pe=()=>{Qe=!1,G=null,B+=1,yt()},ht=m=>{m.target===m.currentTarget&&R()};i.addEventListener("close",Pe),i.addEventListener("cancel",Pe),i.addEventListener("click",ht);let xt=null;n&&n.subscribe&&(xt=n.subscribe(()=>{Qe&&ze()}));let V=null;r&&r.subscribe&&(V=r.subscribe(()=>{Qe&&ze()}));function _e(){Qe||(Qe=!0,ze(),U(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function R(){Qe&&(Qe=!1,G=null,B+=1,yt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:_e,close:R,destroy(){Qe=!1,_!==null&&(clearInterval(_),_=null),i.removeEventListener("close",Pe),i.removeEventListener("cancel",Pe),i.removeEventListener("click",ht),xt&&(xt(),xt=null),V&&(V(),V=null),i.remove()}}}var Td=new Set(["sh","bash","zsh","dash","ksh"]),Cd=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Rd(e){let t=e.split("/");return t[t.length-1]||""}function kh(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Rd(n[0]);if(r!=="env")return Td.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Td.has(Rd(s))}function $h(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function xh(e){let t=[],n=0;Cd.lastIndex=0;for(let r of e.matchAll(Cd)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:$h(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Ah(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Id(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",c=0,u=null,d=!1;function p(O,U){return U?xh(O).map(w=>w.kind==="plain"?w.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${w.kind}"
            >${w.text}</span
          >`):O}function _(){if(!s)return l``;let O=o==="ready"&&kh(a),U=o==="ready"?a.split(`
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
              @click=${()=>{$()}}
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
                  ${U.map((w,F)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${F+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(w,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){Ke(_(),r)}async function $(){if(o!=="ready")return;let O=await nn(a);ge(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function L(O){O.key==="Escape"&&s&&(O.preventDefault(),P())}function B(){d||(document.addEventListener("keydown",L),d=!0)}function G(){d&&(document.removeEventListener("keydown",L),d=!1)}async function Q(O,U=null){let w=++c;B(),s={...O},u=U||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let J=t?t():"";if(!J){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let Te="/api/repo-ops-script?workspace="+encodeURIComponent(J)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let Y=await n(Te),ce=await Y.json().catch(()=>({}));if(w!==c)return;if((t?t():"")!==J){P();return}if(!Y.ok||!ce||ce.ok!==!0){o="error",i=Ah(ce&&typeof ce.error=="string"?ce.error:""),b();return}s={lane:ce.lane,base_sha:ce.base_sha,path:ce.path,base_ref:ce.base_ref},a=String(ce.content),o="ready",b()}catch{if(w!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function P(){c+=1,G(),s=null,a="",b();let O=u;u=null,O?.isConnected&&O.focus()}function M(){P(),r.remove()}return{open:Q,close:P,destroy:M}}function Od(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let w=o();return typeof w.revision=="number"?w.revision:0}function i(w){t&&w&&w.queue&&typeof w.queue=="object"&&t.set(w.queue)}function c(){let w=o().workspace_info;return w&&typeof w=="object"?w:{}}function u(w,F){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${w}"
      >${F}</span
    >`}function d(w){if(typeof w!="number"||!Number.isFinite(w))return"";let F=w/6e4;return Number.isInteger(F)?`timeout ${F}\uBD84`:`timeout ${Math.round(w/1e3)}\uCD08`}function p(w){let F=d(w);return F?u("config",F):""}function _(w,F,J){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${J.script}
      @click=${Te=>{s&&s({lane:w,base_sha:F.base_sha,path:J.script,base_ref:F.base_ref},Te.currentTarget)}}
    ></button>`}function b(){let w=o().repo_ops_opt_out;return{verify:w?.verify===!0,deploy:w?.deploy===!0}}function $(w,F){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!F}
        @change=${J=>{Q(w,!J.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function L(w){let F=typeof w.base_sha=="string"?w.base_sha:"",J=`${w.source_path||"repo-ops/config.toml"} @ ${w.base_ref||"?"}${F?`@${F.slice(0,7)}`:""}`,Te=b(),Y=!!w.verify&&Te.verify,ce=!!w.deploy&&Te.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${J}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Y?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${w.verify?l`${_("verify",w,w.verify)}
              ${p(w.verify.timeout_ms)}
              ${Y?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Y?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":w.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${w.verify?$("verify",Te.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ce?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${w.deploy?l`${_("deploy",w,w.deploy)}
              ${p(w.deploy.timeout_ms)}
              ${ce?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ce?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":w.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${w.deploy?$("deploy",Te.deploy):""}
      </div>
    </section>`}function B(w){let F=w.repo_ops&&typeof w.repo_ops=="object"?w.repo_ops:null;return F&&(F.status==="resolved"||F.status==="absent")?L(F):F&&(F.status==="pending"||F.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function G(w){if(!n)return;let F=await n("worker-auto-repair-toggle",{on:w,expected_revision:a()});if(i(F),F&&F.conflict){let J=await n("worker-auto-repair-toggle",{on:w,expected_revision:a()});i(J)}r()}async function Q(w,F){if(!n)return;let J=await n("worker-repo-ops-opt-out-toggle",{kind:w,opted_out:F,expected_revision:a()});if(i(J),J&&J.conflict){let Te=await n("worker-repo-ops-opt-out-toggle",{kind:w,opted_out:F,expected_revision:a()});i(Te)}r()}let P={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function M(w,F,J){return l`<div class="worker-repo-ops__policy-group" data-policy=${J}>
      <div class="worker-repo-ops__policy-label">${w}</div>
      <ul class="worker-repo-ops__policy-list">
        ${F.map(Te=>l`<li data-token=${Te}>
              ${P[Te]||Te}
            </li>`)}
      </ul>
    </div>`}function O(w){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${w.map(F=>{let J=[P[F.trigger]||F.trigger];return Number.isInteger(F.attempts_per_operation_attempt)?J.push(`operation\uB2F9 ${F.attempts_per_operation_attempt}\uD68C`):Number.isInteger(F.attempts)?J.push(`${P[F.budget]||F.budget} ${F.attempts}\uD68C`):Number.isInteger(F.sessions_per_user_action)&&J.push(`${F.sessions_per_user_action}\uD68C`,P[F.user_actions]||F.user_actions),F.applies_when&&J.push(P[F.applies_when]||F.applies_when),l`<li data-token=${F.id}>
            <strong>${P[F.id]||F.id}</strong>
            <span>${J.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function U(){let w=o(),F=w.auto_repair!==!1,J=w.repo_operation_policy&&typeof w.repo_operation_policy=="object"?w.repo_operation_policy:null,Te=Array.isArray(w.repo_operations)?w.repo_operations:[],Y=Te.find(Le=>Le.state==="repairing"),ce=Te.filter(Le=>Le.state==="failed"||Le.state==="repairing"),he=ce.length?Math.min(...ce.map(Le=>typeof Le.repair?.remaining=="number"?Le.repair.remaining:0)):J?.auto_repair?.resolution_ladder?.find(Le=>Le.id==="auto_repair_session")?.attempts??1,Re=Array.isArray(J?.auto_repair?.resolution_ladder)?J.auto_repair.resolution_ladder:[];return l`<section
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
          @change=${Le=>{G(Le.target.checked)}}
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
          >${Y?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${Y.repair?.owner_bead||Y.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
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
                ${Re.length} · 금지
                ${(J.never_automatic||[]).length}</span
              >
            </summary>
            ${M("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",J.worker_automatic||[],"worker-automatic")}
            ${J.supported===!1||J.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${J.schema_version})`}
                </div>`:O(Re)}
            ${M("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",J.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${B(c())} ${U()}
      </details>`}}}var Dd=20,Sh=5,Eh=new Set(["failed","repairing","running","queued","retry_pending"]),Ld={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Md={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Th(e,t,n=Dd){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Ch(e){if(e.type==="cleanup")return!0;let t=e.operation;return Eh.has(t.state)&&!t.dismissed&&!t.superseded_by}function Rh(e,t,n={}){let r=Th(e,t,1/0),s=n.expanded===!0?Dd:Sh,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||Ch(i));return{visible:a,hidden:r.length-a.length}}function Pd(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Ih(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Nd(e){let t=e.filter(n=>n.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>l`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function qd(e,t="",n=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function Oh(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Md,r)?Md[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Lh(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?zt(e.at):""}
      >${xo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Pd(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Ld,t.kind)?Ld[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ko(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${us(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Pd(e)}"
          >${Ih(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?qd($u(t.failure_kind,r)):""}
      ${Oh(t)}
      ${Nd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ko(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Mh(e){let t=e.cleanup,n=ir(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?zt(e.at):""}
      >${xo(e.at)||"\u2014"}</span
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
        ${Fu(t.step).map(r=>l`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${qd(To(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Nd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Ph(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Mh(r):Lh(r))}
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
  </section>`}function Fd(e,t={}){let n=null;function r(){if(n===null){Ke(l``,e);return}let a=Rh(n.operations,n.cleanup_failures,{expanded:n.expanded});Ke(Ph({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var Dh=Et("views:worker"),Nh="tab:worker:ready",qh="tab:worker:blocked",Fh="tab:worker:in-progress",jh="tab:worker:resolved",Bh="tab:worker:closed",Do=1,jd=5;function Bd(e){return uo(e).path.length>0}var Uh=new Set(["quick_fix","spec_backed","full_plan"]);function Ud(e){return typeof e=="string"&&Uh.has(e)}var Gd="beads-ui.worker.candidate-filter",fi={show_blocked:!1,spec:"all"};function Wh(){try{let e=window.localStorage.getItem(Gd);if(!e)return{...fi};let t=JSON.parse(e);if(!t||typeof t!="object")return{...fi};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...fi}}}function zh(e){try{window.localStorage.setItem(Gd,JSON.stringify(e))}catch{}}function Hh(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=n(i),u=r(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Gh=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Vd="bdui.worker.candidate_sort",Vh=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],No="spec";function Kh(){try{let e=window.localStorage.getItem(Vd);return e==="board"||e==="created"||e==="spec"?e:No}catch{return No}}function Yh(e){try{window.localStorage.setItem(Vd,e)}catch{}}var Kd="bdui.worker.done-range";function Zh(){try{let e=window.localStorage.getItem(Kd);return an(e)?e:en}catch{return en}}function Qh(e){try{window.localStorage.setItem(Kd,e)}catch{}}var Xh="(max-width: 640px)",Yd="beads-ui.worker.lane-collapsed",hs={queue:!0,done:!0};function Jh(){try{let e=window.localStorage.getItem(Yd);if(!e)return{...hs};let t=JSON.parse(e);return!t||typeof t!="object"?{...hs}:{queue:typeof t.queue=="boolean"?t.queue:hs.queue,done:typeof t.done=="boolean"?t.done:hs.done}}catch{return{...hs}}}function eb(e){try{window.localStorage.setItem(Yd,JSON.stringify(e))}catch{}}function Wd(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function tb(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(er):(r.sort(Ps(n)),t==="board"?r:[...r.filter(Bd),...r.filter(s=>!Bd(s))])}function nb(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function rb(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function zd(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function sb(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function ob(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function ab(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function ib(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function lb(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function _i(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function cb(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,n=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,r=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=r&&typeof r.pr_number=="number"?r.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${n}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),r&&typeof r.bead_id=="string"&&a.push(`repair ${r.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:r&&typeof r.pr_url=="string"?r.pr_url:"",repair_pr_number:s}}function Hd(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ub(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.head_review&&e.head_review.state!=="failed")return n("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Hd(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Hd(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=sb(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${zd(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${zd(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function db(e,t,n,r,s=null,o=null,a=null,i=!1,c=null,u=!0,d=null,p=null,_=null,b={},$=!1,L=!1,B={}){let G=!!c&&c.position>0,Q=!!c?.continuation_action&&c.continuation_action.continuation===null,P=!!c&&c.active===!0,M=c&&c.failure||null,O=ab(c?c.waiting:null,_),U=n[e]||null,w=U&&U.gate?U.gate:null,F=U&&U.pr?U.pr:null,J=cb(_),Te=ib(c?c.resolution:null),Y=lb(c?c.head_review:null),ce=c&&c.head_review||null,he=c&&c.authority||null,Re=!!ce&&["pending","reviewing","revising"].includes(ce.state),Le=G&&!P&&(ce?.state==="failed"||!he||he.source==="automatic"&&!L),oe=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Te?Te.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":O,ie=!!w&&w.base_badge==="\uCDA9\uB3CC",Me=!!w&&w.enabled===!0,N=ms({bead_id:e,merge_sha:B.merge_sha,cleanup_cursor:B.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:B.repo_operations}),se=Mo(N),ae=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!w&&w.tier==="merged",Se=i&&!!r&&!!w&&w.tier==="merged",Ie=Le&&(Me||ie||w?.reason==="base_behind"||w?.reason==="review_receipt_missing"||w?.reason==="review_receipt_stale"||ae||Se),Ne=i&&ie&&u===!1,A=wn(b,e,{external:i,merge_active:P||N?.step==="merge",merge_queued:G,conflict_active:!!a,cleanup_active:se,merged:!!r||w?.tier==="merged"}),fe=!!A.operation,De=!ae&&!!r&&r.step==="repo_operations",we=ub({continuation_required:Q,merge_step:N,conflict_badge:oe,conflict_live:Te?.live===!0||a==="running",head_review:ce&&Y?{...Y,state:ce.state,failure_reason:ce.failure_reason}:null,recovery:J,cleanup_failed:r,cleanup_label:r?ir(r.step):null,base_exception:p,conflicting:ie,gate:w,receipt_check:U&&U.receipt_check?U.receipt_check:null,queue_failure:M,auto_skip:d,queued:G,queue_active:P,queue_position:c?c.position:0,activity:oe?null:o&&o.activity||null}),We=we?.live===!0&&we.title?l`<span title=${we.title}>${we.label}</span>`:we?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:r&&N?.active!==!0?Lo(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:i,pr_number:F&&typeof F.number=="number"?F.number:null,pr_url:F&&typeof F.url=="string"?F.url:"",completion_badge:we?.live!==!0&&we?.title?we.label:null,completion_title:we?.title||"",completion_repair_pr_url:J?J.repair_pr_url:"",completion_repair_pr_number:J?J.repair_pr_number:null,badges:We?[We]:[],live_badge:we?.live===!0?We:null,usage:s,alert:we?.alert===!0,merge_action:w?.tier==="merged"&&!ae&&!Se||De?!1:!G||Q||Le,timeline_action:De,cancel_action:G&&!Q,cancel_enabled:(!P||Re)&&!(J&&J.lock_actions),cancel_title:J&&J.lock_actions?`${J.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:P&&!Re?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Re?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:A,discard_action:A.action,merge_step:N,discard_enabled:A.enabled,discard_title:A.title,merge_enabled:!N&&!a&&!fe&&!p&&!(J&&J.lock_actions)&&!Ne&&!De&&(Me||ie||w?.reason==="base_behind"||w?.reason==="review_receipt_missing"||w?.reason==="review_receipt_stale"||ae||Se||Ie),merge_label:Q?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ae||Se?"\uC815\uB9AC \uC7AC\uAC1C":ie&&!N&&!ae?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":w?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":w?.reason==="review_receipt_missing"||w?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Le?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:fe?A.error?`\uD3D0\uAE30 \uC2E4\uD328: ${A.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${A.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Q?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":N?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${N.label}`:Se?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ne?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ie?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":w?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":w?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":w?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":w?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Me?`\uBA38\uC9C0 (${w.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:w&&w.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${w&&w.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function mi(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,doneRange:d,onDoneRangeChange:p}=t,_=r?Ns(r,i):null,b=Bs({transport:n,uiOrderStore:i}),$=null,L=[],B=Wh(),G=null,Q=Kh(),P=an(d)?d:Zh(),M=new Map;function O(){let f=Pn.find(S=>S.value===P);return f?f.label:"\uC624\uB298"}let U=Jh(),w=!1,F=new Set,J=new Set,Te=new Set,Y=new Set,ce=new Set,he={},Re=null,Le=0,oe=null,ie=[];function Me(f){return Re===f?he:{}}async function N(){if(!n)return;let f=u?.()||"";if(Re===f||oe&&oe.key===f&&oe.generation===Le)return;let S=++Le;oe={key:f,generation:S};let H=null;try{H=await Promise.resolve(n("get-session-defaults",{}))}catch(g){if(S!==Le)return;oe=null,Dh("get-session-defaults failed: %o",g),je();return}S===Le&&(he=H&&typeof H.values=="object"&&H.values!==null?{...H.values}:{},Re=f,oe=null,je())}function se(){Re=null,Le+=1,N()}let ae=document.createElement("div");ae.className="worker-console";let Se=document.createElement("div");Se.className="worker-top";let Ie=document.createElement("div");Ie.className="worker-drawer-overlay",Ie.hidden=!0;let Ne=document.createElement("div");Ne.className="worker-drawer-overlay__backdrop";let A=document.createElement("div");A.className="worker-drawer-host";let fe=document.createElement("div");fe.className="worker-drawer-host",fe.hidden=!0,Ie.append(Ne,A,fe);let De=document.createElement("div");De.className="worker-lanes-host",ae.append(Se,Ie,De),e.appendChild(ae);let we=null,We=null,Ue=Ar(A,{transport:n,sessionLogStore:a,onClose:()=>{we=null,We=null,Ie.hidden=!0,je()}}),Ge=Fd(fe,{onClose:()=>{fe.hidden=!0,Ie.hidden=!0,je()}}),Xe=Id({getWorkspacePath:u||(()=>"")}),st=u&&u()||"",K=Od({queueStore:s,transport:n,onChanged:()=>je(),onOpenScript:(f,S)=>{Xe.open(f,S)}}),Z=o?Ed(ae,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(f,S)=>Ct(f,S)}):null;function Ce(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Do,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Ye(){let f=Ce(),S=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,H=Array.isArray(f.serial_lanes)?f.serial_lanes:[],g=[];for(let de of H){if(g.length>=S)break;!de||typeof de.id!="string"||!/^s[1-5]$/.test(de.id)||!Array.isArray(de.entries)||g.push({id:de.id,label:`\uC9C1\uB82C ${de.id.slice(1)}`,count:de.entries.length})}return g.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},...g]}function He(f){if(!G||!f.some(H=>H.id===G))return null;let S=Ye();return S?{bead_id:G,lanes:S}:null}function pe(){let f=Ce();return typeof f.revision=="number"?f.revision:0}function C(f){f&&f.queue&&s&&s.set(f.queue)}function X(){let f=Ce().queue;return Array.isArray(f)?f.length:0}async function ye(f,S,H){if(!n)return;let g=()=>({bead_id:f,...S==="parallel"?{}:{lane:S},...H===void 0?{}:{index:H},expected_revision:pe()}),k=await n("worker-queue-place",g());C(k),k&&k.conflict&&await n("worker-queue-place",g()).then(C)}async function ee(f,S,H){if(!n)return;let g=()=>({bead_id:f,...S==="parallel"?{}:{lane:S},to_index:H,expected_revision:pe()}),k=await n("worker-queue-reorder",g());C(k),k&&k.conflict&&await n("worker-queue-reorder",g()).then(C)}async function $e(f){if(!n)return;let S=await n("worker-queue-remove",{bead_id:f,expected_revision:pe()});C(S),S&&S.conflict&&await n("worker-queue-remove",{bead_id:f,expected_revision:pe()}).then(C)}async function at(f){if(!n||!f)return;let S=await n("worker-attempt-pause",{attempt_id:f});S&&S.paused===!1&&S.reason&&ge(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${S.reason}`,"error",2400)}async function ot(f){if(!n||!f)return;let S=await wr();if(S===null)return;let H=async(k={})=>await n("worker-attempt-resume",{attempt_id:f,expected_revision:pe(),...S!==""?{instructions:S}:{},...k}),g=await H();C(g),g&&g.conflict&&(g=await H(),C(g)),g=await xn(g,(k,de)=>H({continuation:k,decision_token:de}),{onResult:C,refresh:()=>H()}),g&&g.resumed===!1&&!g.conflict&&g.reason&&ge(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function Ze(f){if(!n||!f)return;let S=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:pe()});C(S),S&&S.conflict&&(S=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:pe()}),C(S)),S&&S.dismissed===!1&&!S.conflict&&S.reason&&ge(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${S.reason}`,"error",2400)}async function pt(f,S,H=!0){if(!n)return null;let g=n,k=await g(f,{...S,expected_revision:pe()});return C(k),k&&k.conflict&&H&&(k=await g(f,{...S,expected_revision:pe()}),C(k)),k}async function mt(f){if(!n||!f)return;let S=Ce().merge_queue?.find(g=>g.bead_id===f)?.continuation_action;if(S?.mismatch&&S.continuation===null){await it(f,S.mismatch);return}F.add(f),je();let H;try{H=await pt("worker-merge-queue-add",{bead_id:f})}finally{F.delete(f),je()}if(!(!H||H.applied)){if(H.conflict){ge("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ge(ob(H.reason),"error",2400)}}async function gt(f){if(!(!n||!f||J.has(f))){J.add(f),je();try{let S=await n("worker-cleanup-retry",{bead_id:f,expected_revision:pe()});C(S),S&&!S.retried&&!S.conflict&&S.reason&&ge(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${S.reason}`,"error",2400)}finally{J.delete(f),je()}}}async function it(f,S){let H=await xn({continuation_mismatch:S},(k,de)=>pt("worker-merge-queue-add",{bead_id:f,continuation:k,decision_token:de},!1)),g=H?.queue?.merge_queue?.find(k=>k.bead_id===f)?.continuation_action;if(H?.applied!==!0&&g?.continuation===null&&g.mismatch){await it(f,g.mismatch);return}H&&H.applied===!1&&!H.conflict&&ge("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function yt(f){if(!n)return;let S=await pt("worker-merge-auto-toggle",{on:f});!S||S.conflict||ge(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function ze(f){if(!n||!f)return;let S=await pt("worker-merge-queue-remove",{bead_id:f});S&&!S.conflict&&!S.applied&&S.reason==="merge_active"&&ge("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Qe(){await pt("worker-merge-queue-remove",{all:!0})}async function Pe(f,S=null,H="unmerged",g=null){if(!n||!f)return;let k=ds(f,H);if(!(!!g||typeof globalThis.confirm!="function"||globalThis.confirm(k)))return;let ue=await n("worker-discard",{bead_id:f,...S?{attempt_id:S}:{},...g?{operation_id:g}:{},expected_revision:pe()});if(C(ue),ue&&ue.conflict&&(ue=await n("worker-discard",{bead_id:f,...S?{attempt_id:S}:{},...g?{operation_id:g}:{},expected_revision:pe()}),C(ue)),ue&&ue.discarded===!0){ge(Ao(ue),"success",5e3);return}if(ue&&ue.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${ue.reason}`,"error",2800);return}if(ue&&ue.accepted&&ue.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ue&&ue.accepted&&!ue.discarded){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${ue.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ue&&!ue.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ht(f,S,H){if(!(!n||!S||!H||Y.has(S))){Y.add(S),je();try{let g=await n(f,{bead_id:S,action_id:H,expected_revision:pe()});C(g),g?.conflict?ge("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!g?.ok&&g?.reason&&ge(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(g.reason)}`,"error",2800)}finally{Y.delete(S),je()}}}async function xt(f,S){if(!n||!S||Te.has(S))return;Te.add(S),je();let H;try{let g=async(k={})=>await n(f,{bead_id:S,expected_revision:pe(),...k});H=await g(),C(H),H&&H.conflict&&(H=await n(f,{bead_id:S,expected_revision:pe()}),C(H)),f==="worker-revise-fix"&&(H=await xn(H,(k,de)=>g({continuation:k,decision_token:de}),{onResult:C,refresh:()=>g()}))}finally{Te.delete(S),je()}if(!(!H||H.conflict)){if(H.ok){ge(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ge(`\uCC98\uBD84 \uAC70\uBD80: ${H.reason||""}`,"error",3e3)}}async function V(f){if(!n)return;let S=await n("worker-automation-toggle",{on:f,expected_revision:pe()});C(S),S&&S.conflict&&await n("worker-automation-toggle",{on:f,expected_revision:pe()}).then(C)}async function _e(f){if(!n||!f)return;let S=await n("worker-repo-operation-repair",{operation_id:f});if(C(S),S&&S.ok===!1){ge(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${S.reason||""}`,"error",3e3);return}S&&S.ok===!0&&ge("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function R(f){if(!n||!f)return;let S=await n("worker-repo-operation-dismiss",{operation_id:f});C(S),S&&S.ok===!1&&ge(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${S.reason||""}`,"error",3e3)}async function m(f){if(!n||!Number.isFinite(f))return;let S=Math.max(Do,Math.floor(f)),H=await n("worker-queue-set-slots",{slots:S,expected_revision:pe()});C(H),H&&H.conflict&&await n("worker-queue-set-slots",{slots:S,expected_revision:pe()}).then(C)}async function E(f){if(!n||!Number.isInteger(f)||f<1||f>jd)return;let S=Ce(),H=(Array.isArray(S.serial_lanes)?S.serial_lanes:[]).slice(f).reduce((de,ue)=>de+(Array.isArray(ue?.entries)?ue.entries.length:0),0),g=()=>({count:f,expected_revision:pe()}),k=await n("worker-queue-set-serial-lane-count",g());C(k),k&&k.conflict&&(k=await n("worker-queue-set-serial-lane-count",g()),C(k)),k&&k.applied&&H>0&&ge(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${H}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function D(){let f=Ce(),S=_?_.selectBoardColumn(Nh,"ready"):[],H=_?_.selectBoardColumn(qh,"blocked"):[],g=_?_.selectBoardColumn(Bh,"closed"):[],k=_?_.selectBoardColumn(Fh,"in_progress"):[],de=_?_.selectBoardColumn(jh,"resolved"):[],ue=Fs([...S,...H,...k,...de,...g]),Fe=new Map;for(let h of[...S,...H,...k])h&&h.id&&!Fe.has(h.id)&&Fe.set(h.id,h);let Ee={...Me(u?.()||"")};for(let h of["orchestration_model","orchestration_effort","orchestration_speed"]){let z=f[h];typeof z=="string"&&(Ee[h]=z)}function T(h,z){let me=Fe.get(h);if(!me)return null;let Ve=me.metadata&&typeof me.metadata=="object"?me.metadata:{},dt=me.workflow?.route,Ft=Ve.route,Dt=Ud(dt)?dt:Ud(Ft)?Ft:null;return Qt({pin:Ve,global:Ee,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:Dt,controller_runtime:z})}function te(h){let z=h.runner||null,me=T(h.bead_id,z),Ve=Co(h),dt=me?Wn(me,z):null;return Ve||dt?{orchestration:Ve,worker:dt}:null}let q=new Map;function Oe(h){if(q.has(h))return q.get(h)??null;let z=T(h,null),me=null;if(z){let Ve=hn(f.runner_catalog??null,z.orchestration_model.value??""),dt=Ve===null?z:T(h,Ve),Ft=ar(dt,f.runner_catalog??null),Dt=Wn(dt,Ve);me=Ft||Dt?{orchestration:Ft,worker:Dt}:null}return q.set(h,me),me}function ut(h){let z=js(ue,h);return z.total===0?null:z}let rt=f.bead_titles||{},et=new Map;for(let[h,z]of Object.entries(rt))typeof z=="string"&&z.length>0&&et.set(h,z);for(let h of[...S,...H])et.set(h.id,h.title||h.id);let tt=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},It=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},Jt=f.bead_workflow&&typeof f.bead_workflow=="object"&&!Array.isArray(f.bead_workflow)?f.bead_workflow:{},Ln=new Map;for(let[h,z]of Object.entries(It))Array.isArray(z)&&Ln.set(h,ui(z));for(let h of[...S,...H]){let z=h.labels;Array.isArray(z)&&!Ln.has(h.id)&&Ln.set(h.id,ui(z))}let lr=new Map,Lr=o?.get()?.last_good?.result?.groups;for(let h of Array.isArray(Lr)?Lr:[]){if(h?.eligible!==!0||!Array.isArray(h.members))continue;let z=h.members.map(Ve=>{let dt=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(Ft=>Ft.entries.some(Dt=>Dt.bead_id===Ve));return dt?dt.id:null});if(!(z.every(Ve=>Ve!==null)&&new Set(z).size===1))for(let Ve of h.members)lr.set(Ve,h.members.filter(dt=>dt!==Ve))}let bs=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},cr=new Map;for(let[h,z]of Object.entries(tt))z&&typeof z=="object"&&cr.set(h,z);for(let h of[...S,...H])cr.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let Gn=h=>cr.get(h)||{},Mn=f.pr_wait||[],Mr=f.pr_observations||{},Be=f.pr_activity||{},St=f.cleanup_failed||{},Pr=Object.entries(St).map(([h,z])=>({bead_id:h,step:z&&z.step?z.step:"",reason:z&&z.reason?z.reason:"",at:z&&typeof z.at=="number"?z.at:null,detail:z&&typeof z.detail=="string"?z.detail:null,output_tail:z&&typeof z.output_tail=="string"&&z.output_tail?z.output_tail:void 0,log_path:z&&typeof z.log_path=="string"&&z.log_path?z.log_path:void 0,retry_count:z&&typeof z.retry_count=="number"&&Number.isInteger(z.retry_count)&&z.retry_count>0?z.retry_count:0,failure_code:z&&typeof z.failure_code=="string"?z.failure_code:void 0,subject_id:z&&typeof z.subject_id=="string"?z.subject_id:void 0,repair_eligible:!!(z&&z.repair_eligible),repair:z&&z.repair?z.repair:void 0})),yi=f.queue||[],lp=new Set([...yi.map(h=>h.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(h=>(Array.isArray(h?.entries)?h.entries:[]).map(z=>z.bead_id)),...Mn.map(h=>h.bead_id),...f.done.map(h=>h.bead_id)]),cp=new Set(H.map(h=>h.id)),up=i?i.get()?.order||{}:{},vi=new Set,wi=[];for(let h of[...S,...H])lp.has(h.id)||vi.has(h.id)||nb(h)||(vi.add(h.id),wi.push(h));L=tb(wi,Q,up);let dp=f.admission||{},ki=h=>{let z=dp[h];if(!z)return"";if(z.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let me=typeof z.reason=="string"?z.reason:"",Ve=me.indexOf(":");return Ve>0&&Ve<me.length-1?`\u26D4 ${me.slice(0,Ve)} (${me.slice(Ve+1)})`:`\u26D4 ${me}`},pp=L.map(h=>{let z=uo(h),me=z.path.length>0,Ve=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",dt=!Object.hasOwn(h,"description")||typeof h.description=="string"&&h.description.trim().length>0,Ft=Object.hasOwn(h,"labels")&&Sd(h.labels),Dt=!Ft&&(Ve?dt:me&&!z.conflict),kt=cp.has(h.id),pn=[];kt&&pn.push(rb(h)),Ve&&!dt?pn.push("missing_description"):!Ve&&z.conflict?pn.push("spec_id_conflict"):!Ve&&!me&&pn.push("spec \uC5C6\uC74C");let Ss=ki(h.id);return Ss&&pn.push(Ss),{id:h.id,title:h.title||h.id,reason:pn.join(" \xB7 "),draggable:Dt,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:Ve,status:h.status,worker_ineligible:Ft,blocked:kt,has_spec:me,exec_chips:Oe(h.id)}}),qo=Hh(pp,B),fp=qo.visible,_p=f.revise_parked||{},ys=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Fo=(h,z)=>h.map((me,Ve)=>{let dt=z!=="done",Ft=z!=="done"&&z!=="queue",Dt=dt?_p[me.bead_id]:null,kt=dt?wn(ys,me.bead_id):null,pn=kt?.operation?kt:null,Ss=dt&&Ln.get(me.bead_id)===!0,Gi=bs[me.bead_id]||[],zo=f.admission&&typeof f.admission=="object"?f.admission[me.bead_id]:null,Ho=dt?yu(zo,!!pn||Y.has(me.bead_id)):null,Ep=dt&&!Ho?ki(me.bead_id):null,Tp=dt?[Ep]:[],Vi=dt&&Gi.length>0&&typeof zo?.reason=="string"&&zo.reason.startsWith("not_ready")?[`\u23F8 ${Gi.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Go=dt?lr.get(me.bead_id):void 0;return Go&&Go.length>0&&Vi.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Go.join(", ")}\uC640`),{id:me.bead_id,title:et.get(me.bead_id)||me.bead_id,reason:Tp.filter(Boolean).join(" \xB7 "),draggable:dt&&!pn&&!Ho,done:z==="done",lane:z,seq:Ft?Ve+1:void 0,worker_serial:Ss,discard:pn,stale_work:Ho,badges:[...Vi,...Dt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Dt,revise_action:!!Dt,revise_enabled:!!Dt&&!pn&&!Te.has(me.bead_id),revise_title:Dt?Dt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Dt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:z==="done"?ln(f.attempts||{},me.bead_id):null,work_ms:z==="done"?$o(f.attempts||{},me.bead_id):null,done_at:z==="done"&&typeof me.added_at=="number"?me.added_at:void 0,exec_chips:dt?Oe(me.bead_id):null,workflow:dt&&Jt[me.bead_id]||null,...Gn(me.bead_id)}}),ur=f.attempts?Object.values(f.attempts):[],jo=new Set;for(let h of ur)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&jo.add(h.resumed_from);let $i=new Map;for(let h of ur)$i.set(h.bead_id,h.attempt_id);let vs=new Map;for(let h of ur)vs.set(h.attempt_id,h);function Bo(h){let z=new Set,me=h;for(;me&&!z.has(me.attempt_id);){if(me.conflict_resolution===!0)return!0;z.add(me.attempt_id),me=typeof me.resumed_from=="string"&&me.resumed_from.length>0&&vs.get(me.resumed_from)||null}return!1}let ws=typeof f.declared_base=="string"?f.declared_base:null;function mp(h){let z=null;for(let me of ur)!me||me.bead_id!==h||Bo(me)||(z===null||(typeof me.started_at=="number"?me.started_at:0)>=(typeof z.started_at=="number"?z.started_at:0))&&(z=me);return z&&typeof z.target_base=="string"?z.target_base:null}let xi=[],Ai=[],gp=Ad(f),Si=h=>{let z=typeof h.session_id=="string"&&h.session_id.length>0,me=jo.has(h.attempt_id);return{eligible:z&&!me,reason:z?me?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},dn=null;for(let h of ur){let z=h.status==="paused"&&!jo.has(h.attempt_id);if(h.status==="running"||z)Ai.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:et.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:z,conflict_resolution:Bo(h),base_exception:_i(ws,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:wn(ys,h.bead_id,{attempt_id:h.attempt_id}),workflow:Jt[h.bead_id]||null,usage:ln(f.attempts||{},h.bead_id),rollup:ut(h.bead_id),rollup_expanded:ce.has(h.bead_id),exec_chips:te(h),...Gn(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&gp(h)){let me=Si(h);xi.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:et.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:wn(ys,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:me.eligible,resume_reason:me.reason,conflict_resolution:Bo(h),base_exception:_i(ws,h.target_base),workflow:Jt[h.bead_id]||null,usage:ln(f.attempts||{},h.bead_id),rollup:ut(h.bead_id),rollup_expanded:ce.has(h.bead_id),exec_chips:te(h),...Gn(h.bead_id)}),dn=h}}let ks=[...xi,...Ai].map(h=>{let z=vs.get(h.attempt_id),me=z?.quickfix_landing;if(z?.quickfix_lane!==!0||!me||typeof me!="object")return h;let Ve=typeof me.reason=="string"&&me.reason.length>0?me.reason:null,dt=ms({bead_id:z.bead_id,merge_sha:me.head_sha,cleanup_cursor:me.cursor,cleanup_failed:Ve?{step:me.cursor,reason:Ve}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return dt?{...h,landing:dt}:h}),Ei=null;if(dn){let h=Si(dn),z=dn.cause_detail;Ei={bead_id:dn.bead_id,repo:dn.repo||"",reason:dn.cause||dn.status,cause_detail:z&&typeof z.reason=="string"?{reason:z.reason,command:typeof z.command=="string"?z.command:null}:null,resume_attempt_id:dn.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:wn(ys,dn.bead_id,{attempt_id:dn.attempt_id})}}let Ti=new Set(ks.map(h=>h.bead_id)),Uo=Array.isArray(f.merge_queue)?f.merge_queue:[],Ci=new Map,Ri=new Map,Ii=new Map,Oi=new Map,Li=new Map;Uo.forEach((h,z)=>{h&&typeof h.bead_id=="string"&&(Ci.set(h.bead_id,z+1),Ri.set(h.bead_id,h.resolution),Ii.set(h.bead_id,h.continuation_action||null),Oi.set(h.bead_id,h.head_review||null),Li.set(h.bead_id,h.authority||null))});let dr=f.merge_queue_state||{active:null,failures:{}},hp=dr.failures||{},Mi=dr.waiting&&typeof dr.waiting.bead_id=="string"&&typeof dr.waiting.reason=="string"?dr.waiting:null,bp=f.auto_merge_skips||{},Pi=h=>{let z=bp[h];if(!z)return null;let me=Mr[h],Ve=me&&me.pr?me.pr.head_sha:null;return Ve&&Ve===z.head_sha?z.reason||"":null},$s=new Map;for(let h of ks)h.failed!==!0&&h.conflict_resolution&&(h.paused?$s.has(h.bead_id)||$s.set(h.bead_id,"paused"):$s.set(h.bead_id,"running"));let Di=ks.filter(h=>!h.paused&&h.failed!==!0).length,Ni=(f.workspace_info||{}).slots,qi=typeof Ni=="number"?Ni:typeof f.slots=="number"?f.slots:Do,yp=Di>qi,xs=Xn(P),vp=(Array.isArray(f.done)?f.done.slice():[]).filter(h=>xs===void 0||typeof h.added_at!="number"||h.added_at>=xs).sort((h,z)=>(z.added_at||0)-(h.added_at||0)),Dr=Fo(vp,"done"),wp=new Set((Array.isArray(f.done)?f.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),Fi=[],kp=u?.()||"";for(let h of g){let z=tr(h.closed_at);if(typeof h.id!="string"||wp.has(h.id)||z===null||xs!==void 0&&z<xs||typeof h.comment_count!="number"||h.comment_count<=0)continue;let me=`${kp}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,Ve=M.get(me);Ve===void 0&&n&&(M.set(me,"pending"),Promise.resolve(n("get-comments",{id:h.id})).then(dt=>{let Ft=Array.isArray(dt)&&dt.some(Dt=>po(typeof Dt?.text=="string"?Dt.text:"")?.lane==="session");M.set(me,Ft?"session":"not-session"),je()}).catch(()=>{M.set(me,"failed"),je()})),Ve==="session"&&Fi.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:z,created_at:h.created_at,updated_at:h.updated_at})}Dr.push(...Fi),Dr.sort((h,z)=>(z.done_at||0)-(h.done_at||0));let As={};for(let h of An)As[h]=0;let ji=!1,Bi=0,Wo=0,Ui=0;for(let h of Dr){let z=h.usage;if(z&&typeof z=="object"){let me=!1;for(let Ve of An)Number.isFinite(z[Ve])&&(As[Ve]+=z[Ve],ji=!0,me=!0);me&&(Wo+=1,Number.isFinite(z.total_cost_usd)&&(Bi+=z.total_cost_usd,Ui+=1))}}Wo>0&&Ui===Wo&&(As.total_cost_usd=Bi);let Wi=Dr.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),$p=Wi.length>0?Bt(Zs(Wi)):ji?Sn(As):null,xp=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},Ap=Array.isArray(f.serial_lanes)?f.serial_lanes:[],zi=h=>{if(Mn.some(Ve=>Ve.bead_id===h))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let z=ur.filter(Ve=>Ve&&Ve.bead_id===h),me=z.length>0?z[z.length-1].status:null;return me==="failed"||me==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":me==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Hi=Ap.filter(h=>h&&typeof h.id=="string"&&Array.isArray(h.entries)).map((h,z)=>{let me=xp[h.id]||{},Ve=new Map((Array.isArray(me.corrections)?me.corrections:[]).filter(kt=>kt&&typeof kt.bead_id=="string"&&typeof kt.after=="string").map(kt=>[kt.bead_id,kt.after])),dt=Fo(h.entries.filter(kt=>!Ti.has(kt.bead_id)),h.id).map(kt=>Ve.has(kt.id)?{...kt,badges:[`\u{1F517} ${Ve.get(kt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...kt.badges]}:kt),Ft=Array.isArray(me.occupied_by)?me.occupied_by.filter(kt=>typeof kt=="string"):[],Dt=Ft.map(kt=>({id:kt,title:et.get(kt)||kt,draggable:!1,lane:h.id,ghost:!0,badges:[zi(kt)]}));return{id:h.id,index:z+1,rows:[...Dt,...dt],occupied:Ft.length>0,badge:Ft.length>0?zi(Ft[0]):"\uB300\uAE30",cycle:me.cycle===!0}}),Sp=typeof f.serial_lane_count=="number"?f.serial_lane_count:Hi.length;return{queue:f,idToTitle:et,candidates:fp,candidate_hidden:{blocked:qo.hidden_blocked,spec:qo.hidden_spec},running:ks,live_count:Di,slots:qi,over_cap:yp,failure:Ei,waiting:Fo(yi.filter(h=>!Ti.has(h.bead_id)),"queue"),serial_lanes:Hi,serial_lane_count:Sp,pr_wait:Mn.map(h=>db(h.bead_id,et.get(h.bead_id)||h.bead_id,Mr,St[h.bead_id]||null,ln(f.attempts||{},h.bead_id),Be[h.bead_id]||(F.has(h.bead_id)||J.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),$s.get(h.bead_id)||null,h.external===!0,{position:Ci.get(h.bead_id)||0,active:dr.active===h.bead_id,failure:hp[h.bead_id]||null,waiting:Mi?.bead_id===h.bead_id?Mi.reason:null,resolution:Ri.get(h.bead_id),continuation_action:Ii.get(h.bead_id),head_review:Oi.get(h.bead_id)||null,authority:Li.get(h.bead_id)||null},h.wt_present!==!1,f.auto_merge===!0?Pi(h.bead_id):null,_i(ws,mp(h.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[h.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},vs.get($i.get(h.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]})).map(h=>({...h,workflow:Jt[h.id]||null,...Gn(h.id)})),merge_queue_length:Uo.length,merge_queue_running:Uo.length>0,auto_excluded:Mn.map(h=>h.bead_id).filter(h=>Pi(h)!==null),declared_base:ws,done:Dr,token_total:$p,cleanup_failures:Pr,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function j(){let S=!!o?.get()?.job,H=!S&&o?.isPending?.()===!0,g=S?"\uBD84\uC11D \uC911":H?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${g?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${g?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${g?l`<span class="worker-analysis-btn__badge">${g}</span>`:""}
    </button>`}function be(f){let S=f.waiting.length>0?f.waiting[0].id:"\u2014",H=l`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,g=Je(f),k=f.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",de=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${O()} 완료 <b>${f.done.length}</b></span
      >`,ue=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,Fe=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Do}
          step="1"
          .value=${String(f.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:jd},(te,q)=>q+1).map(te=>l`<option
                value=${String(te)}
                ?selected=${f.serial_lane_count===te}
              >
                ${te}
              </option>`)}
        </select>
      </label>
      ${o?j():""} `,Ee=Au({failure:f.failure}),T=bu(f.repo_operations,f.cleanup_failures);return w?l`<div class="worker-ribbon">
          ${H} ${g}
          <div class="worker-kpi worker-kpi--ribbon">${k}${de}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Fe}</div>
          <div class="worker-kpi">${ue}</div>
        </div>
        ${T}${K.template()}${Ee}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${H}${g}${Fe}</div>
        <div class="worker-kpi">
          ${k}${de}${ue}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${O()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(te=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${te.tooltip}
                >${O()} 완료 · 누적 ${te.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${S}</b></span
          >
        </div>
      </div>
      ${T}${K.template()}${Ee}`}function ve(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let S=f.running.some(H=>!H.paused&&H.failed!==!0);return l`<section
      class="worker-now${S?" worker-pane--live":""}"
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
      ${f.running.length>0?Qa(f.running,Date.now(),we):""}
      ${f.pr_wait.map(H=>jn(H))}
    </section>`}function xe(f){let S=f.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${B.show_blocked}
        />
        🔒 blocked${S.blocked>0?` ${S.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Gh.map(H=>l`<button
              type="button"
              class="worker-filter__chip${B.spec===H.value?" is-active":""}"
              data-spec=${H.value}
              aria-pressed=${B.spec===H.value?"true":"false"}
            >
              ${H.label}
            </button>`)}
        ${S.spec>0?l`<span class="worker-filter__hidden">숨김 ${S.spec}</span>`:""}
      </div>
    </div>`}function qe(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${Q}
    >
      ${Vh.map(f=>l`<option value=${f.value} ?selected=${Q===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function vt(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${P}
      >
        ${Pn.map(f=>l`<option value=${f.value} ?selected=${P===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function nt(f){let S=l`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,H=f.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return un({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:S,controls:H})}function Je(f){let S=f.queue.auto_merge===!0;if(f.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${S?" is-active":""}"
        title=${S?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${S?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if(S)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let H=new Set(f.auto_excluded),g=f.pr_wait.filter(k=>k.merge_action&&k.merge_enabled&&!H.has(k.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${g>0?` ${g}`:""}
    </button>`}function At(f){let S=un({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:qe(),controls:xe(f),place_menu:He(f.candidates)});return w?l`<div class="worker-lanes worker-lanes--mobile">
        ${ve(f)}
        ${un({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:U.queue,preview:Wd(f.waiting)})}
        ${f.serial_lanes.map(H=>nt(H))}
        ${S}
        ${un({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${O()} \uC644\uB8CC \uC5C6\uC74C`,controls:vt(),collapsible:!0,collapsed:U.done,preview:Array.isArray(f.token_total)?f.token_total.map(H=>H.label).join(" \xB7 "):f.token_total||Wd(f.done)})}
      </div>`:l`<div class="worker-lanes">
      ${S}
      <div class="worker-wait">
        ${un({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(H=>nt(H))}
      </div>
      ${un({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(H=>!H.paused&&H.failed!==!0),body:Qa(f.running,Date.now(),we)})}
      ${un({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${un({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${O()} ${f.done.length}`,items:f.done,empty:`${O()} \uC644\uB8CC \uC5C6\uC74C`,controls:vt()})}
    </div>`}function Yt(f){U={...U,[f]:!U[f]},eb(U),je()}function je(){let f=D();Ke(be(f),Se),Ke(At(f),De)}function Mt(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(Xh);w=!!f.matches;let S=H=>{let g=!!(H&&typeof H.matches=="boolean"?H.matches:f.matches);g!==w&&(w=g,je())};typeof f.addEventListener=="function"?(f.addEventListener("change",S),ie.push(()=>f.removeEventListener("change",S))):typeof f.addListener=="function"&&(f.addListener(S),ie.push(()=>f.removeListener(S)))}let Nt=null;function Ut(f){Nt=f.target instanceof Element?f.target:null}function Ot(f){let H=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!H)return;if(Nt&&H.contains(Nt)&&Nt.closest("input, button, a")){f.preventDefault();return}let g=H.dataset.beadId||"",k=H.dataset.lane||"";$={bead_id:g,from_lane:k};try{f.dataTransfer?.setData("text/plain",g),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function Wt(f){let S=f.target?.closest?.(".worker-pane");if(!S)return;let H=S.dataset.lane||"";H!=="candidate"&&H!=="queue"&&!/^s[1-5]$/.test(H)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),S.classList.add("worker-pane--drag-over"))}function y(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function v(f,S){let H=L.find(ue=>ue.id===f);if(!H)return;let g=L.filter(ue=>ue.id!==f),k=g.length;if(S){let ue=S.dataset.beadId;if(ue===f)return;let Fe=g.findIndex(Ee=>Ee.id===ue);Fe>=0&&(k=Fe)}let de=g.slice();de.splice(k,0,H),b.applyReorder(f,de,k)}function I(f){let S=f.target?.closest?.(".worker-pane");if(!S)return;f.preventDefault(),S.classList.remove("worker-pane--drag-over");let H=S.dataset.lane||"",g=$?.bead_id||f.dataTransfer?.getData("text/plain")||"",k=$?.from_lane||"";if($=null,!g)return;let de=f.target?.closest?.(".worker-mini, .worker-card"),ue=Array.from(S.querySelectorAll(".worker-mini, .worker-card")),Fe=ue.length;if(de){let Ee=ue.indexOf(de);Ee>=0&&(Fe=Ee)}if(Fe=Math.max(0,Fe-S.querySelectorAll(".worker-mini--ghost").length),S.classList.contains("worker-pane--collapsed")&&(Fe=X()),H==="candidate"){if(k==="candidate"){v(g,de);return}(k==="queue"||/^s[1-5]$/.test(k))&&$e(g);return}if(H==="queue"||/^s[1-5]$/.test(H)){let Ee=H==="queue"?"parallel":H;k===H?ee(g,Ee,Fe):ye(g,Ee)}}function W(f){B=f,zh(f),je()}function re(f){Q=f==="board"||f==="created"||f==="spec"?f:No,Yh(Q),je()}function ke(f){P=an(f)?f:en,Qh(P),p?.(P),je()}function ne(f){let S=f.target?.closest?.(".worker-serial-lane-count");if(S){let Fe=Number.parseInt(S.value,10);Number.isFinite(Fe)&&E(Fe).then(je);return}let H=f.target?.closest?.(".worker-filter__blocked");if(H){W({...B,show_blocked:H.checked});return}let g=f.target?.closest?.(".worker-done-range");if(g){ke(g.value);return}let k=f.target?.closest?.(".worker-sort");if(k){re(k.value||No);return}let de=f.target?.closest?.(".worker-slots__input");if(!de)return;let ue=Number.parseInt(de.value,10);if(!Number.isFinite(ue)){je();return}m(ue).then(je)}function x(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function le(){let f=D();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function Ae(){we&&Ue.close(),fe.hidden=!1,Ie.hidden=!1,Ge.open(le()),je()}function lt(f){let S=Ce(),H=S.attempts?S.attempts[f]:null;we=f,We=null,Ge.close(),fe.hidden=!0,Ie.hidden=!1,Ue.open({attempt_id:f,meta:x(H)}),je()}function Ct(f,S){we=null,We=f,Ge.close(),fe.hidden=!0,Ie.hidden=!1,Ue.open({attempt_id:f,meta:S,hide_prompt:!0}),je()}function _t(){if(Ge.isOpen()&&Ge.refresh(le()),We){let H=(o?.get()?.runs||[]).find(g=>g.run_id===We);H?Ue.updateMeta(pi(H)):Ue.close();return}if(!we)return;let f=Ce(),S=f.attempts?f.attempts[we]:null;if(S){Ue.updateMeta(x(S));return}Ue.close()}function Pt(f){let S=f.target;if(S?.closest?.(".worker-mini__serial, .worker-mini__grip")||S?.closest?.("#worker-parallel-analysis-dialog"))return;if(S?.closest?.(".worker-analysis-btn")){Z?.open();return}if(S?.closest?.(".worker-repo-strip")||S?.closest?.(".worker-mini__timeline")){Ae();return}let H=S?.closest?.(".worker-repo-op__session");if(H){let Be=H.dataset.attemptId;Be&&lt(Be);return}let g=S?.closest?.(".worker-repo-op__resolve");if(g){_e(g.dataset.operationId||"");return}let k=S?.closest?.(".worker-repo-op__dismiss");if(k){R(k.dataset.operationId||"");return}let de=S?.closest?.(".worker-cleanup__resume");if(de){let Be=de.dataset.beadId;Be&&gt(Be);return}let ue=S?.closest?.(".worker-banner__resume");if(ue){let Be=ue.dataset.attemptId;Be&&ot(Be);return}let Fe=S?.closest?.(".worker-banner__discard");if(Fe){let Be=Fe.dataset.confirmation==="merged"?"merged":"unmerged";Pe(Fe.dataset.beadId||"",Fe.dataset.attemptId||null,Be,Fe.dataset.operationId||null);return}let Ee=S?.closest?.(".worker-banner__dismiss");if(Ee){let Be=Ee.dataset.attemptId;Be&&Ze(Be);return}if(S?.closest?.(".worker-play")){V(!Ce().auto_advance);return}let T=S?.closest?.(".worker-merge-all");if(T){T.classList.contains("worker-merge-all--stop")?Ce().auto_merge===!0?yt(!1):Qe():yt(!0);return}let te=S?.closest?.(".worker-pane__hd--toggle");if(te){let Be=te.dataset.lane;(Be==="queue"||Be==="done")&&Yt(Be);return}let q=S?.closest?.(".worker-card__place-lane");if(q){let Be=q.dataset.beadId,St=q.dataset.lane;Be&&(St==="parallel"||/^s[1-5]$/.test(St||""))&&(G=null,je(),ye(Be,St));return}if(S?.closest?.(".worker-card__place-cancel")){G=null,je();return}let ut=S?.closest?.(".worker-card__place");if(ut){let Be=ut.dataset.beadId;Be&&!ut.disabled&&(Ye()?(G=Be,je()):ye(Be,"parallel"));return}let rt=S?.closest?.(".worker-filter__chip");if(rt){let Be=rt.dataset.spec;(Be==="all"||Be==="with"||Be==="without")&&W({...B,spec:Be});return}let et=S?.closest?.(".worker-mini__merge");if(et){let Be=et.dataset.beadId||"";Ce().cleanup_failed?.[Be]?gt(Be):mt(Be);return}let tt=S?.closest?.(".worker-mini__merge-cancel");if(tt){ze(tt.dataset.beadId||"");return}let It=S?.closest?.(".worker-mini__discard");if(It){Pe(It.dataset.beadId||"",It.dataset.attemptId||null,It.dataset.discardMode==="merged"?"merged":"unmerged",It.dataset.operationId||null);return}let Jt=S?.closest?.(".worker-mini__stale-continue");if(Jt){ht("worker-stale-work-continue",Jt.dataset.beadId||"",Jt.dataset.actionId||"");return}let Ln=S?.closest?.(".worker-mini__stale-backup");if(Ln){ht("worker-stale-work-backup-fresh",Ln.dataset.beadId||"",Ln.dataset.actionId||"");return}let lr=S?.closest?.(".worker-mini__stale-recheck");if(lr){ht("worker-stale-work-recheck",lr.dataset.beadId||"",lr.dataset.actionId||"");return}let Lr=S?.closest?.(".worker-mini__revise-fix");if(Lr){xt("worker-revise-fix",Lr.dataset.beadId||"");return}let bs=S?.closest?.(".worker-mini__revise-approve");if(bs){xt("worker-revise-approve",bs.dataset.beadId||"");return}if(S?.closest?.(".worker-mini__pr"))return;if(S?.closest?.(".rtile__discard")){let Be=S?.closest?.(".rtile"),St=Be?.dataset?.beadId,Pr=Be?.dataset?.attemptId;St&&Pe(St,Pr||null,"unmerged",S?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(S?.closest?.(".rtile__dismiss")){let St=S?.closest?.(".rtile")?.dataset?.attemptId;St&&Ze(St);return}if(S?.closest?.(".rtile__pause")){let St=S?.closest?.(".rtile")?.dataset?.attemptId;St&&at(St);return}if(S?.closest?.(".rtile__resume")){let St=S?.closest?.(".rtile")?.dataset?.attemptId;St&&ot(St);return}if(S?.closest?.(".rtile__session")){let St=S?.closest?.(".rtile")?.dataset?.attemptId;St&&lt(St);return}if(S?.closest?.(".worker-drawer-overlay__backdrop")){Ge.close(),Ue.close();return}if(S?.closest?.(".worker-drawer-host"))return;let cr=S?.closest?.(".rtile .board-card__roll-toggle");if(cr){let Be=cr.dataset.rollParent;Be&&(ce.has(Be)?ce.delete(Be):ce.add(Be),je());return}let Gn=S?.closest?.(".rtile .board-card__roll-child");if(Gn){let Be=Gn.dataset.childId;Be&&c&&c(Be);return}let Mn=S?.closest?.(".rtile");if(Mn){if(S?.closest?.(".rtile__id")){let St=Mn.dataset.beadId;St&&nn(St).then(Pr=>{Pr?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Be=Mn.dataset.beadId;Be&&c&&c(Be);return}let Mr=S?.closest?.(".worker-mini, .worker-card");if(Mr){let Be=Mr.dataset.beadId;if(S?.closest?.(".worker-mini__id, .worker-card__id")){Be&&nn(Be).then(St=>{St?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Be&&c&&c(Be)}}return e.addEventListener("pointerdown",Ut),e.addEventListener("dragstart",Ot),e.addEventListener("dragover",Wt),e.addEventListener("dragleave",y),e.addEventListener("drop",I),e.addEventListener("click",Pt),e.addEventListener("change",ne),Mt(),_&&ie.push(_.subscribe(()=>{for(let[f,S]of M)S==="failed"&&M.delete(f);je()})),s&&ie.push(s.subscribe(()=>{let f=u&&u()||"";f!==st&&(st=f,Xe.close()),je(),_t()})),o&&typeof o.subscribe=="function"&&ie.push(o.subscribe(()=>{_t(),je()})),je(),{load(){N(),je()},refreshSessionDefaults:se,destroy(){for(let f of ie.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",Ut),e.removeEventListener("dragstart",Ot),e.removeEventListener("dragover",Wt),e.removeEventListener("dragleave",y),e.removeEventListener("drop",I),e.removeEventListener("click",Pt),e.removeEventListener("change",ne);try{Ue.destroy()}catch{}Ie.hidden=!0;try{Z?.destroy()}catch{}try{Xe.destroy()}catch{}Ke(l``,e)}}}function gi(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Zd(e,t,n,r=async()=>{},s=async()=>{}){let o=Et("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function d(U){let F=U.target.value,Te=t.getState().workspace?.current?.path||"";if(F&&F!==Te){o("switching workspace to %s",F),i=!0,O();try{await n(F)}catch(Y){o("workspace switch failed: %o",Y)}finally{i=!1,O()}}}async function p(){let U=t.getState(),w=U.workspace?.current?.path||U.workspace?.available?.[0]?.path||"";if(!(!w||c)){o("git-pulling workspace %s",w),c=!0,O();try{await r(w)}catch(F){o("workspace git pull failed: %o",F)}finally{c=!1,O()}}}function _(U){let w=U.target;w&&e.contains(w)||L()}function b(U){U.key==="Escape"&&L()}function $(){u||(u=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",b),O())}function L(){u&&(u=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",b),O())}function B(){u?L():$()}async function G(U){let w=U.target,F=w.value,J=w.checked;o("toggling visibility %s \u2192 %s",F,String(J));try{await s(F,J)}catch(Te){o("workspace visibility toggle failed: %o",Te)}}function Q(U){return U?l`
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
    `:l``}function P(U,w){return l`
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
                        .checked=${!w.has(F.path)}
                        @change=${G}
                      />
                      <span class="workspace-picker__manage-name"
                        >${gi(F.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let U=t.getState(),w=U.workspace?.current,F=U.workspace?.available||[],J=new Set(U.workspace?.hidden||[]),Te=w?.path||F[0]?.path||"";if(F.length===0)return l``;let Y=F.filter(ce=>!J.has(ce.path)||ce.path===Te);if(Y.length<=1){let ce=Y[0]||F[0],he=gi(ce.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ce.path}"
            >${he}</span
          >
          ${P(F,J)}
          ${Q(Te)}
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
          ${Y.map(ce=>l`
              <option
                value="${ce.path}"
                ?selected=${ce.path===Te}
                title="${ce.path}"
              >
                ${gi(ce.path)}
              </option>
            `)}
        </select>
        ${P(F,J)}
        ${Q(Te)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){Ke(M(),e)}return O(),a=t.subscribe(()=>O()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",b),Ke(l``,e)}}}var Qd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function hi(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Xd(e,t,n=hi()){return{id:n,type:e,payload:t}}function Jd(e={}){let t=Et("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,d=[],p=new Map,_=new Set;function b(M){for(let O of Array.from(_))try{O(M)}catch{}}function $(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let M=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),O=(n.jitterRatio||0)*M,U=Math.max(0,Math.round(M+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",U,a+1),i=setTimeout(()=>{i=null,P()},U)}function L(M){try{s?.send(JSON.stringify(M))}catch(O){t("ws send failed",O)}}function B(){for(o="open",t("ws open"),b(o),a=0;d.length;){let M=d.shift();M&&L(M)}}function G(M){let O;try{O=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let w=u.get(O.id);u.delete(O.id),O.ok?w?.resolve(O.payload):w?.reject(O.error||new Error("ws error"));return}let U=p.get(O.type);if(U&&U.size>0)for(let w of Array.from(U))try{w(O.payload)}catch(F){t("ws event handler error",F)}else t("ws received unhandled message type: %s",O.type)}function Q(){o="closed",t("ws closed"),b(o);for(let[M,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(M);a+=1,$()}function P(){if(!c)return;let M=r();try{s=new WebSocket(M),t("ws connecting %s",M),o="connecting",b(o),s.addEventListener("open",B),s.addEventListener("message",G),s.addEventListener("error",()=>{}),s.addEventListener("close",Q)}catch(O){t("ws connect failed %o",O),$()}}return P(),{send(M,O){if(!Qd.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let U=hi(),w=Xd(M,O,U);return t("send %s id=%s",M,U),new Promise((F,J)=>{u.set(U,{resolve:F,reject:J,type:M}),s&&s.readyState===s.OPEN?L(w):(t("queue %s id=%s (state=%s)",M,U,o),d.push(w))})},on(M,O){p.has(M)||p.set(M,new Set);let U=p.get(M);return U?.add(O),()=>{U?.delete(O)}},onConnection(M){return _.add(M),()=>{_.delete(M)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,P()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function pb(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function fb(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var bi=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ep=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],zn="tab:worker:closed",_b="bdui.worker.done-range",tp=sd,np="worker:queue",rp="worker:parallel-analysis",sp="ui:order",op="ui:display-policy",ap="exec:presets",Hn="tab:board:closed",ip="beads-ui.board.closed-range";function mb(e){let t=Et("main");t("bootstrap start");let n=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ke(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&xd(a),i&&c&&u&&d){let se=function(g,k){let de="Request failed",ue="";if(g&&typeof g=="object"){let Ee=g;if(typeof Ee.message=="string"&&Ee.message.length>0&&(de=Ee.message),typeof Ee.details=="string")ue=Ee.details;else if(Ee.details&&typeof Ee.details=="object")try{ue=JSON.stringify(Ee.details,null,2)}catch{ue=""}}else typeof g=="string"&&g.length>0&&(de=g);let Fe=k&&k.length>0?`Failed to load ${k}`:"Request failed";N.open(Fe,de,ue)},C=function(g){return`${re.getState().workspace.current?.path||""}\0${g}`},X=function(){Xe&&(Xe().catch(()=>{}),Xe=null),st=null,K=null},ee=function(g){Z=g;let k=()=>{Z!==g||re.getState().selected_id!==g||(Z=null,ye(g))};if(!He){Ye.then(k);return}k()},Ze=function(g,k,de,ue,Fe){return de!==ot[k]?(Fe().catch(()=>{}),!1):(g.set(ue,Fe),!0)},mt=function(){let g=re.getState();Qe(g.view==="board"),R(g.view==="worker"),be(g.view==="monitor"),E(g.view==="board"||g.view==="worker"||pt||!!g.selected_id)},yt=function(){let g=Xn(gt);return g===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:g}}},ze=function(){let g=Xn(it);return g===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:g}}},Qe=function(g){if(g)for(let[k,de]of bi){if($e.has(k)||at.has(k))continue;let ue=k===Hn?yt():{type:de};try{Ne.register(k,ue)}catch(T){t("register %s store failed: %o",k,T)}at.add(k);let Fe=ot.board,Ee=!1;Ie.subscribeList(k,ue).then(T=>{Ee=!Ze($e,"board",Fe,k,T)}).catch(T=>{t("subscribe %s failed: %o",k,T),se(T,"board")}).finally(()=>{at.delete(k),Ee&&mt()})}else xt()},xt=function(){ot.board+=1;for(let[g]of bi){let k=$e.get(g);k&&(k().catch(()=>{}),$e.delete(g));try{Ne.unregister(g)}catch(de){t("unregister %s failed: %o",g,de)}}},R=function(g){if(!g){m();return}for(let[k,de]of ep){if(V.has(k)||at.has(k))continue;let ue=k===zn?ze():{type:de};try{Ne.register(k,ue)}catch(T){t("register %s store failed: %o",k,T)}at.add(k);let Fe=ot.worker,Ee=!1;Ie.subscribeList(k,ue).then(T=>{Ee=!Ze(V,"worker",Fe,k,T)}).catch(T=>{t("subscribe %s failed: %o",k,T),se(T,"worker")}).finally(()=>{at.delete(k),Ee&&mt()})}},m=function(){ot.worker+=1;for(let[g]of ep){let k=V.get(g);k&&(k().catch(()=>{}),V.delete(g));try{Ne.unregister(g)}catch(de){t("unregister %s failed: %o",g,de)}}},E=function(g){if(!g){D();return}_e||(Se("subscribe-worker-queue",{id:np}).catch(k=>{t("subscribe-worker-queue failed: %o",k)}),Se("subscribe-worker-parallel-analysis",{id:rp}).catch(k=>{t("subscribe-worker-parallel-analysis failed: %o",k)}),_e=()=>(Se("unsubscribe-worker-parallel-analysis",{id:rp}),Se("unsubscribe-worker-queue",{id:np})))},D=function(){_e&&(_e().catch(()=>{}),_e=null),fe.clear()},be=function(g){if(!g){ve();return}j||(Se("subscribe-monitor-pipeline",{id:tp}).catch(k=>{t("subscribe-monitor-pipeline failed: %o",k)}),j=()=>Se("unsubscribe-monitor-pipeline",{id:tp}))},ve=function(){j&&(j().catch(()=>{}),j=null)},qe=function(){xe||(Se("subscribe-ui-order",{id:sp}).catch(g=>{t("subscribe-ui-order failed: %o",g)}),xe=()=>Se("unsubscribe-ui-order",{id:sp}))},vt=function(){xe&&(xe().catch(()=>{}),xe=null),we.clear()},Je=function(){nt||(Se("subscribe-display-policy",{id:op}).catch(g=>{t("subscribe-display-policy failed: %o",g)}),nt=()=>Se("unsubscribe-display-policy",{id:op}))},At=function(){nt&&(nt().catch(()=>{}),nt=null),We.clear()},je=function(){Yt||(Se("subscribe-impl-presets",{id:ap}).catch(g=>{t("subscribe-impl-presets failed: %o",g)}),Yt=()=>Se("unsubscribe-impl-presets",{id:ap}))},y=function(g){if(!g)return"Unknown";let k=g.split("/").filter(Boolean);return k.length>0?k[k.length-1]:"Unknown"};var p=se,_=C,b=X,$=ee,L=Ze,B=mt,G=yt,Q=ze,P=Qe,M=xt,O=R,U=m,w=E,F=D,J=be,Te=ve,Y=qe,ce=vt,he=Je,Re=At,Le=je,oe=y;let ie=document.getElementById("header-loading"),Me=Rl(ie),N=hu(e),ae=Jd(),Se=Me.wrapSend((g,k)=>ae.send(g,k)),Ie=kl(Se),Ne=$l(),A=Sl(),fe=Al(),De=il(),we=xl(),We=ol(),Ue=al(),Ge=ll();ae.on("impl-presets-snapshot",g=>{let k=g;k&&typeof k.revision=="number"&&Array.isArray(k.presets)&&Ue.set({revision:k.revision,presets:k.presets})}),ae.on("monitor-pipeline-snapshot",g=>{let k=g;if(!(!k||!Array.isArray(k.workspaces)))try{De.set(k.workspaces,k.workspaces_state)}catch{}}),ae.on("ui-order-snapshot",g=>{let k=g;if(k&&typeof k.revision=="number")try{we.set({revision:k.revision,order:k.order&&typeof k.order=="object"?k.order:{}})}catch{}}),ae.on("display-policy-snapshot",g=>{let k=g;if(k&&k.policy&&typeof k.policy=="object")try{We.set(k.policy)}catch{}}),ae.on("session-log-snapshot",g=>{let k=g;if(k&&typeof k.id=="string")try{Ge.set(k.id,Array.isArray(k.lines)?k.lines:[],typeof k.last_event_at=="number"?k.last_event_at:null)}catch{}}),ae.on("session-log-append",g=>{let k=g;if(k&&typeof k.id=="string")try{Ge.append(k.id,k.event)}catch{}}),ae.on("snapshot",g=>{let k=g,de=k&&typeof k.id=="string"?k.id:"",ue=de?Ne.getStore(de):null;if(ue&&k&&k.type==="snapshot")try{ue.applyPush(k)}catch{}}),ae.on("upsert",g=>{let k=g,de=k&&typeof k.id=="string"?k.id:"",ue=de?Ne.getStore(de):null;if(ue&&k&&k.type==="upsert")try{ue.applyPush(k)}catch{}}),ae.on("delete",g=>{let k=g,de=k&&typeof k.id=="string"?k.id:"",ue=de?Ne.getStore(de):null;if(ue&&k&&k.type==="delete")try{ue.applyPush(k)}catch{}});let Xe=null,st=null,K=null,Z=null,Ce=()=>{},Ye=new Promise(g=>{Ce=()=>g(void 0)}),He=!1,pe=!1;async function ye(g){let k=C(g);if(k===st||k===K)return;K=k;let de=`detail:${g}`,ue={type:"issue-detail",params:{id:g}};try{Ne.register(de,ue)}catch(Fe){t("register detail store failed: %o",Fe)}try{let Fe=await Ie.subscribeList(de,ue);if(re.getState().selected_id!==g||C(g)!==k){await Fe().catch(()=>{});return}Xe&&await Xe().catch(()=>{}),Xe=Fe,st=k}catch(Fe){t("detail subscribe failed: %o",Fe),se(Fe,"issue details")}finally{K===k&&(K=null)}}let $e=new Map,at=new Set,ot={board:0,worker:0},pt=!1,gt=en;try{let g=window.localStorage.getItem(ip);an(g)&&(gt=g)}catch{}let it=en;try{let g=window.localStorage.getItem(_b);an(g)&&(it=g)}catch{}async function Pe(g){if(!an(g)||g===gt)return;gt=g;try{window.localStorage.setItem(ip,g)}catch{}let k=$e.get(Hn);if(!k)return;$e.delete(Hn),await k().catch(()=>{});let de=yt();try{Ne.register(Hn,de)}catch(ue){t("register %s store failed: %o",Hn,ue)}try{let ue=await Ie.subscribeList(Hn,de);$e.set(Hn,ue)}catch(ue){t("re-subscribe %s failed: %o",Hn,ue),se(ue,"board")}}async function ht(g){if(!an(g)||g===it)return;it=g;let k=V.get(zn);if(!k)return;V.delete(zn),await k().catch(()=>{});let de=ze();try{Ne.register(zn,de)}catch(ue){t("register %s store failed: %o",zn,ue)}try{let ue=await Ie.subscribeList(zn,de);V.set(zn,ue)}catch(ue){t("re-subscribe %s failed: %o",zn,ue),se(ue,"worker")}}let V=new Map,_e=null,j=null,xe=null,nt=null,Yt=null;async function Mt(){nt=null,We.clear(),Yt=null,Ue.clear(),_e=null,j=null,$e.clear(),V.clear(),ot.board+=1,ot.worker+=1,je();let g=re.getState().workspace.current?.path;if(g)try{await ae.send("set-workspace",{path:g})}catch(de){t("workspace restore after reconnect failed: %o",de);return}Je();let k=re.getState();Qe(k.view==="board"),R(k.view==="worker"),be(k.view==="monitor"),E(k.view==="board"||k.view==="worker"||!!k.selected_id)}async function Nt(){t("clearing all subscriptions for workspace switch"),xt(),m(),D(),A.clear(),vt(),qe(),At(),Je(),X();let g=re.getState();if(g.selected_id)try{Ne.unregister(`detail:${g.selected_id}`)}catch{}let k=re.getState();Qe(k.view==="board"),R(k.view==="worker"),be(k.view==="monitor"),E(k.view==="board"||k.view==="worker"||!!k.selected_id),k.selected_id&&ee(k.selected_id)}async function Ut(g){t("requesting workspace switch to %s",g),pe=!0;try{let k=await ae.send("set-workspace",{path:g});t("workspace switch result: %o",k),k&&k.workspace&&(re.setState({workspace:{current:{path:k.workspace.root_dir,database:k.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",g),k.changed&&(await Nt(),ge("Switched to "+y(g),"success",2e3)))}catch(k){throw t("workspace switch failed: %o",k),ge("Failed to switch workspace","error",3e3),k}finally{pe=!1}}async function Ot(g){t("requesting workspace git pull for %s",g);try{let k=await ae.send("git-pull-workspace",{});t("workspace git pull result: %o",k);let de=k?.status;if(de==="up_to_date"){ge("Already up to date","success",2e3);return}if(de==="stash_pop_conflict"){ge("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ge("Git pulled "+y(g),"success",2e3)}catch(k){t("workspace git pull failed: %o",k);let de=k?.code,ue=k?.message;if(de==="rebase_conflict"){ge("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(de==="rebase_conflict_abort_failed"){ge("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(de==="busy"){ge("Git pull skipped: another operation is running","warning",3e3);return}let Fe=ue?`: ${ue}`:"";throw ge(`Git pull failed${Fe}`,"error",3e3),k}}async function Wt(g,k){t("setting workspace visibility %s \u2192 %s",g,String(k));try{await ae.send("set-workspace-visibility",{path:g,visible:k}),await v()}catch(de){t("workspace visibility update failed: %o",de),ge("Failed to update project visibility","error",3e3)}}async function v(){try{let g=await ae.send("list-workspaces",{});if(t("workspaces loaded: %o",g),g&&Array.isArray(g.workspaces)){let k=g.workspaces.map(Ee=>({path:Ee.path,database:Ee.database,pid:Ee.pid,version:Ee.version})),de=g.current?{path:g.current.root_dir,database:g.current.db_path}:null,ue=Array.isArray(g.hidden)?g.hidden.filter(Ee=>typeof Ee=="string"):[];re.setState({workspace:{current:de,available:k,hidden:ue}});let Fe=window.localStorage.getItem("beads-ui.workspace");Fe&&(!k.some(T=>T.path===Fe)||ue.includes(Fe)?window.localStorage.removeItem("beads-ui.workspace"):de&&Fe!==de.path&&(t("restoring saved workspace preference: %s",Fe),await Ut(Fe)))}}catch(g){t("failed to load workspaces: %o",g)}}ae.on("workspace-changed",g=>{t("workspace-changed event: %o",g),g&&g.root_dir&&(re.setState({workspace:{current:{path:g.root_dir,database:g.db_path}}}),v(),Nt())});let I=!1;if(typeof ae.onConnection=="function"){let g=k=>{t("ws state %s",k),k==="reconnecting"||k==="closed"?(I=!0,ge("Connection lost. Reconnecting\u2026","error",4e3)):k==="open"&&I&&(I=!1,ge("Reconnected","success",2200),fb(re,(de,ue)=>{t(`${de}: %o`,ue)}),Mt())};ae.onConnection(g)}let W="board";try{let g=window.localStorage.getItem("beads-ui.view");(g==="board"||g==="worker"||g==="monitor")&&(W=g)}catch(g){t("view parse error: %o",g)}let re=Cl({config:pb(),view:W});ae.on("worker-queue-snapshot",g=>{let k=g;if(!k||!k.queue)return;let de=re.getState().workspace.current?.path;if(typeof de=="string"&&de.length>0&&k.root_dir!==de){t("dropping worker-queue snapshot for %s",String(k.root_dir));return}try{A.set(k.queue)}catch{}}),ae.on("worker-parallel-analysis-snapshot",g=>{let k=g;if(!k)return;let de=re.getState().workspace.current?.path;if(!(typeof de=="string"&&de.length>0&&typeof k.root_dir=="string"&&k.root_dir!==de))try{fe.set({settings:k.settings,job:k.job??null,runs:Array.isArray(k.runs)?k.runs:[],last_good:k.last_good??null})}catch{}});let ke=El(re);ke.start();let ne=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),x=async(g,k)=>{try{return await Se(g,k)}catch(de){if(ne.has(g))throw de;return[]}};ad({global_element:r,repo_element:s},re,ke);let le=document.getElementById("workspace-picker");le&&Zd(le,re,Ut,Ot,Wt);let Ae=ud(e,(g,k)=>Se(g,k));try{let g=document.getElementById("new-issue-btn");g&&g.addEventListener("click",()=>Ae.open())}catch{}let lt=_d(e,{policyStore:We,queueStore:A,implPresetStore:Ue,transport:(g,k)=>Se(g,k),onOpenChange:g=>{let k=pt;pt=g,mt(),k&&g===!1&&_t.refreshSessionDefaults()},labelOptions:()=>{let g=new Set;for(let[k]of bi)for(let de of Ne.snapshotFor(k)||[]){let ue=de.labels;if(Array.isArray(ue))for(let Fe of ue)typeof Fe=="string"&&Fe.length>0&&g.add(Fe)}return Array.from(g).sort()}});try{let g=document.getElementById("display-settings-btn");g&&(g.setAttribute("aria-label","\uC124\uC815"),g.setAttribute("title","\uC124\uC815"),g.addEventListener("click",()=>lt.open()))}catch{}let Ct=Ul(i,{gotoIssue:g=>ke.gotoIssue(g),issueStores:Ne,transport:x,workerQueueStore:A,uiOrderStore:we,displayPolicyStore:We,closedRange:gt,onClosedRangeChange:g=>{Pe(g)},onNewIssue:()=>Ae.open()}),_t=mi(c,{transport:x,issueStores:Ne,queueStore:A,analysisStore:fe,sessionLogStore:Ge,uiOrderStore:we,gotoIssue:g=>re.setState({selected_id:g}),getWorkspacePath:()=>re.getState().workspace.current?.path,doneRange:it,onDoneRangeChange:g=>{ht(g)}}),Pt=od(u,{transport:x,pipelineStore:De,execPresetStore:Ue,sessionLogStore:Ge,router:ke,gotoIssue:g=>ke.gotoIssue(g),getWorkspacePath:()=>re.getState().workspace.current?.path,switchWorkspace:g=>Ut(g)}),f=gu(d,{issueStores:Ne,transport:x,queueStore:A,execPresetStore:Ue,sessionLogStore:Ge,getWorkspacePath:()=>re.getState().workspace.current?.path,onNavigate:g=>{re.getState().view==="worker"?re.setState({selected_id:g}):ke.gotoIssue(g)},onClose:()=>{let g=re.getState();re.setState({selected_id:null});try{ke.gotoView(g.view==="worker"||g.view==="monitor"?g.view:"board")}catch{}},onOpenExecPresets:()=>{lt.open("execution")}}),S=re.getState().selected_id;S&&(d.hidden=!1,f.load(S),ee(S)),re.subscribe(g=>{let k=g.selected_id;k?(d.hidden=!1,f.load(k),pe||ee(k)):(f.clear(),d.hidden=!0,X())});let H=g=>{i.hidden=g.view!=="board",c.hidden=g.view!=="worker",u.hidden=g.view!=="monitor",o&&o.classList.toggle("is-quiet",g.view==="monitor"),Qe(g.view==="board"),R(g.view==="worker"),be(g.view==="monitor"),E(g.view==="board"||g.view==="worker"||pt||!!g.selected_id),!g.selected_id&&g.view==="board"&&Ct.load(),g.view==="worker"&&_t.load(),g.view==="monitor"?Pt.load():Pt.pause(),window.localStorage.setItem("beads-ui.view",g.view)};re.subscribe(H),H(re.getState()),qe(),Je(),je(),v().finally(()=>{He=!0,Ce()}),window.addEventListener("keydown",g=>{let k=g.ctrlKey||g.metaKey,de=String(g.key||"").toLowerCase(),ue=g.target,Fe=ue&&ue.tagName?String(ue.tagName).toLowerCase():"",Ee=Fe==="input"||Fe==="textarea"||Fe==="select"||ue&&typeof ue.isContentEditable=="boolean"&&ue.isContentEditable;k&&de==="n"&&(Ee||(g.preventDefault(),Ae.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&mb(t)});export{mb as bootstrap,pb as readBootstrapConfig,fb as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
