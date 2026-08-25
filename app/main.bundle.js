var Mf=Object.create;var Ta=Object.defineProperty;var Nf=Object.getOwnPropertyDescriptor;var qf=Object.getOwnPropertyNames;var Ff=Object.getPrototypeOf,jf=Object.prototype.hasOwnProperty;var Bf=(e,t,n)=>t in e?Ta(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ca=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Uf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of qf(t))!jf.call(e,s)&&s!==n&&Ta(e,s,{get:()=>t[s],enumerable:!(r=Nf(t,s))||r.enumerable});return e};var Wf=(e,t,n)=>(n=e!=null?Mf(Ff(e)):{},Uf(t||!e||!e.__esModule?Ta(n,"default",{value:e,enumerable:!0}):n,e));var ht=(e,t,n)=>Bf(e,typeof t!="symbol"?t+"":t,n);var ac=Ca((Ky,oc)=>{var Sr=1e3,Er=Sr*60,Tr=Er*60,ur=Tr*24,Gf=ur*7,Vf=ur*365.25;oc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Kf(e);if(n==="number"&&isFinite(e))return t.long?Zf(e):Yf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Kf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Vf;case"weeks":case"week":case"w":return n*Gf;case"days":case"day":case"d":return n*ur;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Tr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Er;case"seconds":case"second":case"secs":case"sec":case"s":return n*Sr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Yf(e){var t=Math.abs(e);return t>=ur?Math.round(e/ur)+"d":t>=Tr?Math.round(e/Tr)+"h":t>=Er?Math.round(e/Er)+"m":t>=Sr?Math.round(e/Sr)+"s":e+"ms"}function Zf(e){var t=Math.abs(e);return t>=ur?Ks(e,t,ur,"day"):t>=Tr?Ks(e,t,Tr,"hour"):t>=Er?Ks(e,t,Er,"minute"):t>=Sr?Ks(e,t,Sr,"second"):e+" ms"}function Ks(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var lc=Ca((Yy,ic)=>{function Xf(e){n.debug=n,n.default=n,n.coerce=c,n.disable=a,n.enable=s,n.enabled=i,n.humanize=ac(),n.destroy=d,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let b=0;for(let w=0;w<p.length;w++)b=(b<<5)-b+p.charCodeAt(w),b|=0;return n.colors[Math.abs(b)%n.colors.length]}n.selectColor=t;function n(p){let b,w=null,$,E;function N(...j){if(!N.enabled)return;let Y=N,ie=Number(new Date),z=ie-(b||ie);Y.diff=z,Y.prev=b,Y.curr=ie,b=ie,j[0]=n.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let q=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(U,S)=>{if(U==="%%")return"%";q++;let M=n.formatters[S];if(typeof M=="function"){let re=j[q];U=M.call(Y,re),j.splice(q,1),q--}return U}),n.formatArgs.call(Y,j),(Y.log||n.log).apply(Y,j)}return N.namespace=p,N.useColors=n.useColors(),N.color=n.selectColor(p),N.extend=r,N.destroy=n.destroy,Object.defineProperty(N,"enabled",{enumerable:!0,configurable:!1,get:()=>w!==null?w:($!==n.namespaces&&($=n.namespaces,E=n.enabled(p)),E),set:j=>{w=j}}),typeof n.init=="function"&&n.init(N),N}function r(p,b){let w=n(this.namespace+(typeof b>"u"?":":b)+p);return w.log=this.log,w}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let b=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let w of b)w[0]==="-"?n.skips.push(w.slice(1)):n.names.push(w)}function o(p,b){let w=0,$=0,E=-1,N=0;for(;w<p.length;)if($<b.length&&(b[$]===p[w]||b[$]==="*"))b[$]==="*"?(E=$,N=w,$++):(w++,$++);else if(E!==-1)$=E+1,N++,w=N;else return!1;for(;$<b.length&&b[$]==="*";)$++;return $===b.length}function a(){let p=[...n.names,...n.skips.map(b=>"-"+b)].join(",");return n.enable(""),p}function i(p){for(let b of n.skips)if(o(p,b))return!1;for(let b of n.names)if(o(p,b))return!0;return!1}function c(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}ic.exports=Xf});var cc=Ca((nn,Ys)=>{nn.formatArgs=Jf;nn.save=e_;nn.load=t_;nn.useColors=Qf;nn.storage=n_();nn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();nn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Qf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Jf(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ys.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}nn.log=console.debug||console.log||(()=>{});function e_(e){try{e?nn.storage.setItem("debug",e):nn.storage.removeItem("debug")}catch{}}function t_(){let e;try{e=nn.storage.getItem("debug")||nn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function n_(){try{return localStorage}catch{}}Ys.exports=lc()(nn);var{formatters:r_}=Ys.exports;r_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Zr=globalThis,Bs=Zr.trustedTypes,Wl=Bs?Bs.createPolicy("lit-html",{createHTML:e=>e}):void 0,Oa="$lit$",Pn=`lit$${Math.random().toFixed(9).slice(2)}$`,La="?"+Pn,zf=`<${La}>`,ar=document,Xr=()=>ar.createComment(""),Qr=e=>e===null||typeof e!="object"&&typeof e!="function",Ia=Array.isArray,Yl=e=>Ia(e)||typeof e?.[Symbol.iterator]=="function",Ra=`[ 	
\f\r]`,Yr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,zl=/-->/g,Hl=/>/g,sr=RegExp(`>|${Ra}(?:([^\\s"'>=/]+)(${Ra}*=${Ra}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Gl=/'/g,Vl=/"/g,Zl=/^(?:script|style|textarea|title)$/i,Pa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=Pa(1),es=Pa(2),By=Pa(3),_n=Symbol.for("lit-noChange"),Lt=Symbol.for("lit-nothing"),Kl=new WeakMap,or=ar.createTreeWalker(ar,129);function Xl(e,t){if(!Ia(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Wl!==void 0?Wl.createHTML(t):t}var Ql=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Yr;for(let i=0;i<n;i++){let c=e[i],d,p,b=-1,w=0;for(;w<c.length&&(a.lastIndex=w,p=a.exec(c),p!==null);)w=a.lastIndex,a===Yr?p[1]==="!--"?a=zl:p[1]!==void 0?a=Hl:p[2]!==void 0?(Zl.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=sr):p[3]!==void 0&&(a=sr):a===sr?p[0]===">"?(a=s??Yr,b=-1):p[1]===void 0?b=-2:(b=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?sr:p[3]==='"'?Vl:Gl):a===Vl||a===Gl?a=sr:a===zl||a===Hl?a=Yr:(a=sr,s=void 0);let $=a===sr&&e[i+1].startsWith("/>")?" ":"";o+=a===Yr?c+zf:b>=0?(r.push(d),c.slice(0,b)+Oa+c.slice(b)+Pn+$):c+Pn+(b===-2?i:$)}return[Xl(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Jr=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[d,p]=Ql(t,n);if(this.el=e.createElement(d,r),or.currentNode=this.el.content,n===2||n===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(s=or.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let b of s.getAttributeNames())if(b.endsWith(Oa)){let w=p[a++],$=s.getAttribute(b).split(Pn),E=/([.?@])?(.*)/.exec(w);c.push({type:1,index:o,name:E[2],strings:$,ctor:E[1]==="."?Ws:E[1]==="?"?zs:E[1]==="@"?Hs:lr}),s.removeAttribute(b)}else b.startsWith(Pn)&&(c.push({type:6,index:o}),s.removeAttribute(b));if(Zl.test(s.tagName)){let b=s.textContent.split(Pn),w=b.length-1;if(w>0){s.textContent=Bs?Bs.emptyScript:"";for(let $=0;$<w;$++)s.append(b[$],Xr()),or.nextNode(),c.push({type:2,index:++o});s.append(b[w],Xr())}}}else if(s.nodeType===8)if(s.data===La)c.push({type:2,index:o});else{let b=-1;for(;(b=s.data.indexOf(Pn,b+1))!==-1;)c.push({type:7,index:o}),b+=Pn.length-1}o++}}static createElement(t,n){let r=ar.createElement("template");return r.innerHTML=t,r}};function ir(e,t,n=e,r){if(t===_n)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=Qr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=ir(e,s._$AS(e,t.values),s,r)),t}var Us=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??ar).importNode(n,!0);or.currentNode=s;let o=or.nextNode(),a=0,i=0,c=r[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new xr(o,o.nextSibling,this,t):c.type===1?d=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(d=new Gs(o,this,t)),this._$AV.push(d),c=r[++i]}a!==c?.index&&(o=or.nextNode(),a++)}return or.currentNode=ar,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Lt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=ir(this,t,n),Qr(t)?t===Lt||t==null||t===""?(this._$AH!==Lt&&this._$AR(),this._$AH=Lt):t!==this._$AH&&t!==_n&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Yl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Lt&&Qr(this._$AH)?this._$AA.nextSibling.data=t:this.T(ar.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Jr.createElement(Xl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Us(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Kl.get(t.strings);return n===void 0&&Kl.set(t.strings,n=new Jr(t)),n}k(t){Ia(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Xr()),this.O(Xr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},lr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Lt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Lt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=ir(this,t,n,0),a=!Qr(t)||t!==this._$AH&&t!==_n,a&&(this._$AH=t);else{let i=t,c,d;for(t=o[0],c=0;c<o.length-1;c++)d=ir(this,i[r+c],n,c),d===_n&&(d=this._$AH[c]),a||(a=!Qr(d)||d!==this._$AH[c]),d===Lt?t=Lt:t!==Lt&&(t+=(d??"")+o[c+1]),this._$AH[c]=d}a&&!s&&this.j(t)}j(t){t===Lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ws=class extends lr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Lt?void 0:t}},zs=class extends lr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Lt)}},Hs=class extends lr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=ir(this,t,n,0)??Lt)===_n)return;let r=this._$AH,s=t===Lt&&r!==Lt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Lt&&(r===Lt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Gs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){ir(this,t)}},Jl={M:Oa,P:Pn,A:La,C:1,L:Ql,R:Us,D:Yl,V:ir,I:xr,H:lr,N:zs,U:Hs,B:Ws,F:Gs},Hf=Zr.litHtmlPolyfillSupport;Hf?.(Jr,xr),(Zr.litHtmlVersions??(Zr.litHtmlVersions=[])).push("3.3.1");var Ve=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new xr(t.insertBefore(Xr(),o),o,void 0,n??{})}return s._$AI(e),s};var Vs="today",ec=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Ar=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function En(e){return e==="today"?"today":"7d"}function Da(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function cr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function tc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function nc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function rc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function sc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var uc=Wf(cc(),1);function St(e){return(0,uc.default)(`beads-ui:${e}`)}function yn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function dr(e,t){let n=yn(e.created_at),r=yn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function fc(e,t){let n=yn(e.created_at),r=yn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function _c(e,t){let n=yn(e.updated_at),r=yn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function mc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=yn(e.created_at),o=yn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function gc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var s_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function dc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function pc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=s_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function bc(e,t){let n=dc(e),r=dc(t);if(n!==r)return n<r?-1:1;let s=pc(e),o=pc(t);if(s!==o)return s<o?-1:1;let a=yn(e&&e.created_at),i=yn(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,d=t&&t.id;return c===d?0:String(c)<String(d)?-1:1}var Ma=2**20;function Cr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-yn(e&&e.created_at)}function Zs(e){return(t,n)=>{let r=Cr(t,e),s=Cr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Na(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Cr(i,n)-Ma};if(!i)return{rank:Cr(a,n)+Ma};let c=Cr(a,n),d=Cr(i,n),p=(c+d)/2;return c<p&&p<d?{rank:p}:{renormalize:r.map((b,w)=>({bead_id:b.id,rank:w*Ma}))}}function qa(e,t={}){let n=St(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||dr;function d(){for(let w of Array.from(a))try{w()}catch{}}function p(){s=Array.from(r.values()).sort(c)}function b(w){if(i||!w||w.id!==e)return;let $=Number(w.revision)||0;if(n("apply %s rev=%d",w.type,$),!($<=o&&w.type!=="snapshot")){if(w.type==="snapshot"){if($<=o)return;r.clear();let E=Array.isArray(w.issues)?w.issues:[];for(let N of E)N&&typeof N.id=="string"&&N.id.length>0&&r.set(N.id,N);p(),o=$,d();return}if(w.type==="upsert"){let E=w.issue;if(E&&typeof E.id=="string"&&E.id.length>0){let N=r.get(E.id);if(!N)r.set(E.id,E);else{let j=Number.isFinite(N.updated_at)?N.updated_at:0,Y=Number.isFinite(E.updated_at)?E.updated_at:0;if(j<=Y){for(let ie of Object.keys(N))ie in E||delete N[ie];for(let[ie,z]of Object.entries(E))N[ie]=z}}p()}o=$,d()}else if(w.type==="delete"){let E=String(w.issue_id||"");E&&(r.delete(E),p()),o=$,d()}}}return{id:e,subscribe(w){return a.add(w),()=>{a.delete(w)}},applyPush:b,snapshot(){return s},size(){return r.size},getById(w){return r.get(w)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Xs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function hc(e){let t=St("subs"),n=new Map,r=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let d=r.get(i);if(!d||d.size===0)return;let p=Array.isArray(c.added)?c.added:[],b=Array.isArray(c.updated)?c.updated:[],w=Array.isArray(c.removed)?c.removed:[];for(let $ of Array.from(d)){let E=n.get($);if(!E)continue;let N=E.itemsById;for(let j of p)typeof j=="string"&&j.length>0&&N.set(j,!0);for(let j of b)typeof j=="string"&&j.length>0&&N.set(j,!0);for(let j of w)typeof j=="string"&&j.length>0&&N.delete(j)}}async function o(i,c){let d=Xs(c);if(t("subscribe %s key=%s",i,d),!n.has(i))n.set(i,{key:d,itemsById:new Map});else{let b=n.get(i);if(b&&b.key!==d){let w=r.get(b.key);w&&(w.delete(i),w.size===0&&r.delete(b.key)),n.set(i,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let p=r.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(b){let w=n.get(i)||null;if(w){let $=r.get(w.key);$&&($.delete(i),$.size===0&&r.delete(w.key))}throw n.delete(i),b}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let b=n.get(i)||null;if(b){let w=r.get(b.key);w&&(w.delete(i),w.size===0&&r.delete(b.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Xs,selectors:{getIds(i){let c=n.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let d=n.get(i);return d?d.itemsById.has(c):!1},count(i){let c=n.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=n.get(i),d={};if(!c)return d;for(let p of c.itemsById.keys())d[p]=!0;return d}}}}function yc(){let e=St("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let c of Array.from(r))try{c()}catch{}}function a(c,d,p){let b=d?Xs(d):"",w=n.get(c)||"",$=t.has(c);if(e("register %s key=%s (prev=%s)",c,b,w),$&&w&&b&&w!==b){let E=t.get(c);if(E)try{E.dispose()}catch{}let N=s.get(c);if(N){try{N()}catch{}s.delete(c)}let j=qa(c,p);t.set(c,j);let Y=j.subscribe(()=>o());s.set(c,Y)}else if(!$){let E=qa(c,p);t.set(c,E);let N=E.subscribe(()=>o());s.set(c,N)}return n.set(c,b),()=>i(c)}function i(c){e("unregister %s",c),n.delete(c);let d=t.get(c);d&&(d.dispose(),t.delete(c));let p=s.get(c);if(p){try{p()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let d=t.get(c);return d?d.snapshot().slice():[]},subscribe(c){return r.add(c),()=>r.delete(c)}}}function vc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function wc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function kc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Fa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function o_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function a_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function $c(e){let t=St("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):o_(r),a=a_(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Fa(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Fa(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var i_=Object.freeze({workspace_config:{default_workspace:null}});function xc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:i_.workspace_config.default_workspace}}}function Ac(e={}){let t=St("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:xc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?xc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==n.workspace.hidden[p]),c=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===n.worker.show_closed_children[p])&&!i&&!c||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Sc(e){let t=St("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function c(d){return async(b,w)=>{let $=s++,E=Date.now();r.set($,{type:b,start_ts:E}),t("request start id=%d type=%s count=%d",$,b,n+1),a();let N=!1,j=()=>{N||(N=!0,r.delete($),i())},Y=setTimeout(()=>{N||(t("request TIMEOUT id=%d type=%s elapsed=%dms",$,b,Date.now()-E),j())},3e4);try{let ie=await d(b,w),z=Date.now()-E;return t("request done id=%d type=%s elapsed=%dms",$,b,z),ie}catch(ie){let z=Date.now()-E;throw t("request error id=%d type=%s elapsed=%dms err=%o",$,b,z,ie),ie}finally{clearTimeout(Y),j()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([p,b])=>({id:p,type:b.type,elapsed_ms:d-b.start_ts}))}}}function ae(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Qs(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(gc),c;switch(i){case"created_desc":return c.sort(dr),c;case"created_asc":return c.sort(fc),c;case"updated_desc":return c.sort(_c),c;case"priority":return c.sort(mc),c;case"manual":default:{let d=n();return d?c.sort(Zs(d)):c.sort(dr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Tn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Ut(e){let t=Tn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function ln(e,t){let n=Tn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Ec(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Tn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Js(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function eo(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=Js(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function to(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=Ec(n);return{total:n.length,count:r,current:s,children:n}}function no(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let d of i)c[d.bead_id]=d.rank;n&&n.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},p=r(Na(i,c,d.order),a);s(d,p);let b=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(b&&b.conflict){let w={revision:typeof b.revision=="number"?b.revision:0,order:b.order||{}};n.set(w);let $=r(Na(i,c,w.order),a);s(w,$);let E=await t("ui-order-set",{expected_revision:w.revision,entries:$});E&&E.applied&&n.set({revision:typeof E.revision=="number"?E.revision:0,order:E.order||{}})}else b&&b.applied&&n.set({revision:typeof b.revision=="number"?b.revision:0,order:b.order||{}})}return{applyReorder:o}}function Tc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function ro(e,t){let n=Tc(e),r=Tc(t);return n.length===0||r.length===0?!1:n!==r}function so(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ja(e,t){return!t||typeof e!="string"||e.length===0||so(t.visible_labels).includes(e)?!0:so(t.hidden_labels).includes(e)?!1:!so(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Cc(e,t){return so(e).filter(n=>ja(n,t))}function Gn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function l_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function c_(e,t,n,r,s){return l`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function u_(e,t,n,r){return l`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${l_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function oo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(bc):a;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?c_(t.parent_id,e.count,n,r,t.onToggle):l`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?l`<div class="board-card__roll-list">
            ${i.map((c,d)=>u_(c,d+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var d_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Oc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Rc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},p_={review:"\u2713",skip:"\u2298"},Vn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function f_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Lc(e){let t=e&&e.fill||"none";return t==="none"?Vn.none:e&&e.stale===!0?Vn.stale:t==="dim"?Vn.dim:e&&e.glyph==="review"?Vn.review:e&&e.glyph==="skip"?Vn.skip:Vn.done}function __(e){if(!e||e.fill==="none"||!e.approval_state)return Lc(e);let t=[];return e.glyph==="review"?t.push(Vn.review):e.glyph==="skip"&&t.push(Vn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function m_(e,t,n,r){let s=d_[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=p_[t&&t.glyph||""]||"",c="bar";o==="dim"?c+=` b-${s} dim`:o==="full"&&(c+=` b-${s} full`),a&&(c+=" stale"),n&&(c+=" cur");let d=o==="none"?"lbl":`lbl l-${s} on`,p=n?`color: var(--stage-${s}-on)`:"",b=Oc[e]||e,w=r?Ic(t):null;if(!w)return l`
      <div class="seg">
        <div class=${c} style=${p}>${i}</div>
        <div class=${d}>${b}</div>
      </div>
    `;let $=`${b} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${w.path}`;return l`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${$}
      title=${$}
      @click=${E=>{E.preventDefault(),E.stopPropagation(),r(E,w,e)}}
    >
      <div class=${c} style=${p}>${i}</div>
      <div class=${d}>${b}</div>
    </button>
  `}function Ic(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ao(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=Rc[e.route]||Rc.spec_backed,o=e.stages,a=f_(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(d=>`${Oc[d]||d} ${d==="plan"?__(o[d]||{}):Lc(o[d]||{})}`).join(" \xB7 ")}`,c=!!r&&s.some(d=>Ic(o[d]||{})!==null);return l`
    <div
      class="stp"
      role=${c?"group":"img"}
      aria-label=${i}
    >
      ${s.map(d=>m_(d,o[d]||{},d===a,r))}
    </div>
  `}function g_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Pc=2;function Dc(e){let t=e.slice(0,Pc).join(", "),n=e.length-Pc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function b_(e,t){if(!t)return[];let n=[];if(t.external){let a=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(l`<span class="ctl-chip ctl-chip--blocked">${a}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let a of r)(ro(e,a)?o:s).push(a);return s.length>0&&n.push(l`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Dc(s)}</span
      >`),o.length>0&&n.push(l`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Dc(o)}</span
      >`),n}function Ba(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function io(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Dn(e){return`${e.kind}:${io(e)}@${e.sha}`}function lo(e,t){if(!e)return null;let n=Ba(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=Ba(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,d=t?` \xB7 exec_receipt ${Dn(t)}`:"";return{kind:e.kind,label:i,title:`${c}${d}`}}function Mc(e,t){let n=lo(e,t);return n?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function h_(e){if(!e)return null;let t=Ba(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Dn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function y_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Gn(n,"route")){let i=r.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Gn(n,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Gn(n,"pr")){let i=r.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Mc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Dn(i)}`}
        >${`exec ${i.kind==="delegated"?io(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of Cc(e.labels,n))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Gn(n,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Gn(n,"blocked")&&s.push(...b_(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Gn(n,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function v_(e){let t=ln(e.created_at),n=ln(e.updated_at);return!t&&!n?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Ut(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?l`<span class="board-card__time-sep">·</span>`:""}
    ${n?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Ut(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function w_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return oo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:v_(e),empty_label:"children \uC5C6\uC74C",childChips:Ua,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Ua(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return lo(t,n)?l`<span class="board-card__roll-child-chips">
    ${Mc(t,n)}
    ${h_(n)}
  </span>`:null}function co(e,t){let n=g_(e.priority);return l`
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
      ${y_(e,t)}
      ${e.workflow&&Gn(t.policy||null,"stepper")?ao(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${w_(e,t)}
    </article>
  `}function Rr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return l`
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
              ${ec.map(o=>l`<option
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
        ${e.items.map(o=>co(o,t))}
      </div>
    </section>
  `}function Nc(e,t,n){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>co(r,t))}
        </div>
      </div>
    </dialog>
  `}var k_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],$_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],x_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function A_(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return l`
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
  `}function qc(e,t,n){return l`
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
        ${k_.map(r=>l`<option
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
        ${$_.map(r=>l`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${A_(e,t,n)}
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
        ${x_.map(r=>l`<option
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
  `}var S_=200,E_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},T_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Fc="beads-ui.board.sort",jc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function C_(){try{let e=window.localStorage.getItem(Fc);if(e&&jc.has(e))return e}catch{}return"created_desc"}function Bc(e,t){let n=St("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,b=t.openDoc,w=t.closedRange||Vs,$=s?Qs(s,a):null,E=no({transport:o,uiOrderStore:a}),N=[],j=[],Y=[],ie=[],z=[],q=[],D=!1,U=0,S=C_(),M=new Map,re=new Map,Ae=new Map,be=new Set,H={search:"",priority:"",type:"",labels:[]},X=!1,ye=null;function ke(C){return String(C.status||"open")==="open"}function he(C){let G=String(C.status||"open");return G==="open"||G==="blocked"}function se(C){let G=H.search.trim().toLowerCase(),fe=H.priority,g=H.type,k=H.labels;return C.filter(O=>{if(G){let Q=String(O.id||"").toLowerCase(),Z=String(O.title||"").toLowerCase();if(!Q.includes(G)&&!Z.includes(G))return!1}if(fe!==""&&String(O.priority)!==fe||g!==""&&String(O.issue_type||"")!==g)return!1;if(k.length>0){let Q=Array.isArray(O.labels)?O.labels:[];if(!k.some(Z=>Q.includes(Z)))return!1}return!0})}function xe(){let C=new Set;for(let G of[N,j,Y,ie,z,q])for(let fe of G){let g=Array.isArray(fe.labels)?fe.labels:[];for(let k of g)typeof k=="string"&&k.length>0&&C.add(k)}return Array.from(C).sort()}function ge(){return H.search.trim()!==""||H.priority!==""||H.type!==""||H.labels.length>0}function V(){try{if($){let C=$.selectBoardColumn("tab:board:in-progress","in_progress",S),G=$.selectBoardColumn("tab:board:blocked","blocked",S).filter(he),fe=new Set(C.map($e=>$e.id)),g=$.selectBoardColumn("tab:board:ready","ready",S).filter($e=>ke($e)&&!fe.has($e.id)),k=$.selectBoardColumn("tab:board:resolved","resolved",S),O=$.selectBoardColumn("tab:board:deferred","deferred",S),Q=$.selectBoardColumn("tab:board:closed","closed").slice(0,S_),Z=[...G,...g,...C,...k,...Q];ee(Z);let _e=new Set;for(let $e of Z)$e&&$e.id&&!Js($e)&&_e.add($e.id);let Te=!ge();N=Te?ts(G,_e):G,j=Te?ts(g,_e):g,Y=Te?ts(C,_e):C,ie=Te?ts(k,_e):k,z=O,U=O.length,q=Te?ts(Q,_e):Q,M=new Map;for(let $e of N)M.set($e.id,"open");for(let $e of j)M.set($e.id,"open");for(let $e of Y)M.set($e.id,"in_progress");for(let $e of ie)M.set($e.id,"resolved");for(let $e of z)M.set($e.id,"deferred");for(let $e of q)M.set($e.id,"closed");re=new Map;for(let $e of N)re.set($e.id,"blocked-col");for(let $e of j)re.set($e.id,"ready-col");for(let $e of Y)re.set($e.id,"in-progress-col");for(let $e of ie)re.set($e.id,"resolved-col");for(let $e of q)re.set($e.id,"closed-col")}rt()}catch{N=[],j=[],Y=[],ie=[],z=[],q=[],Ae=new Map,rt()}}function ee(C){Ae=eo(C)}function ce(C){return to(Ae,C)}function ve(C){return!be.has(C)}function De(C,G){C.preventDefault(),C.stopPropagation(),be.has(G)?be.delete(G):be.add(G),rt()}function le(C,G){C.preventDefault(),C.stopPropagation(),r(G)}function ze(C,G){C.preventDefault(),C.stopPropagation(),r(G)}function P(C,G){ye||r(G)}function ue(C,G){C.preventDefault(),C.stopPropagation(),R_(G).then(fe=>{fe&&ae("\uBCF5\uC0AC\uB428","success",1200)})}function Me(C,G){ye=G,C.dataTransfer&&(C.dataTransfer.setData("text/plain",G),C.dataTransfer.effectAllowed="move"),C.target.classList.add("board-card--dragging")}function qe(C){C.target.classList.remove("board-card--dragging"),ut(),setTimeout(()=>{ye=null},0)}function Le(C){let G=String(C.target.value||"");!G||G===w||(w=G,d&&d(G),rt())}function We(){return i?i.get():null}function je(C){let G=c?c.get():null,fe=G?G.cleanup_failed:null;if(!fe||typeof fe!="object"||Array.isArray(fe))return null;let g=fe[C];return!g||typeof g!="object"||Array.isArray(g)?null:g}let Ye={onCardClick:P,onCopyId:ue,onDragStart:Me,onDragEnd:qe,onClosedRangeChange:Le,rollupFor:ce,isExpanded:ve,onRollupToggle:De,onChildClick:le,onFromChipClick:ze,onOpenDoc:b?(C,G)=>b(G):void 0,cleanupFailureFor:je,get policy(){return We()}};function tt(C,G){ye||(Be(),r(G))}function ct(C,G){C.preventDefault(),C.stopPropagation(),Be(),r(G)}let _t={...Ye,onCardClick:tt,onChildClick:ct,onFromChipClick:ct,onOpenDoc:b?(C,G)=>{Be(),b(G)}:void 0,get policy(){return We()}};function te(C){let G=C.target,fe=e.querySelector(".board-filter__labels");G&&fe&&fe.contains(G)||Ke()}function J(C){C.key==="Escape"&&Ke()}function Ce(){X||(X=!0,document.addEventListener("mousedown",te),document.addEventListener("keydown",J),rt())}function Ke(){X&&(X=!1,document.removeEventListener("mousedown",te),document.removeEventListener("keydown",J),rt())}function Oe(C){C.key==="Escape"&&Be()}function we(){D||(D=!0,document.addEventListener("keydown",Oe),rt())}function Be(){D&&(D=!1,document.removeEventListener("keydown",Oe),rt())}let Ge={onClose:Be,onOverlayClick(C){C.target===C.currentTarget&&Be()}},Qe={onSearchInput(C){H.search=String(C.target.value||""),V()},onPriorityChange(C){H.priority=String(C.target.value||""),V()},onTypeChange(C){H.type=String(C.target.value||""),V()},onSortChange(C){let G=String(C.target.value||"");if(!(!jc.has(G)||G===S)){S=G;try{window.localStorage.setItem(Fc,G)}catch{}V()}},onDeferredToggle(){D?Be():we()},onLabelMenuToggle(){X?Ke():Ce()},onLabelToggle(C){let G=H.labels.indexOf(C);G===-1?H.labels.push(C):H.labels.splice(G,1),V()},onLabelClear(){H.labels.length!==0&&(H.labels=[],V())},onNewIssue(){p&&p()}};function Ze(){return l`
      <div class="board-view">
        ${qc(H,Qe,{sort_mode:S,deferred_popup_open:D,deferred_count:U,label_options:xe(),label_menu_open:X})}
        <div class="board-root">
          ${Rr({title:"Blocked",id:"blocked-col",items:se(N)},Ye)}
          ${Rr({title:"Ready",id:"ready-col",items:se(j)},Ye)}
          ${Rr({title:"In progress",id:"in-progress-col",items:se(Y)},Ye)}
          ${Rr({title:"Resolved",id:"resolved-col",items:se(ie)},Ye)}
          ${Rr({title:"Closed",id:"closed-col",items:se(q),is_closed:!0,closed_range:w},Ye)}
        </div>
        ${D?Nc({items:se(z),count:U},_t,Ge):""}
      </div>
    `}function rt(){Ve(Ze(),e),yt()}function yt(){try{let C=e.querySelector("#deferred-popup");C&&!C.open&&(typeof C.showModal=="function"?C.showModal():C.setAttribute("open",""));let G=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let fe of G)Array.from(fe.querySelectorAll(".board-card")).forEach((k,O)=>{k.tabIndex=O===0?0:-1})}catch{}}async function Et(C,G){if(!o){ae("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:C,status:G}),ae("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(fe){n("update-status failed: %o",fe),ae("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function it(C){switch(C){case"blocked-col":return N;case"ready-col":return j;case"in-progress-col":return Y;case"resolved-col":return ie;default:return[]}}function Ot(C,G,fe){if(!o||!a)return;let g=it(C),k=g.find(Te=>Te.id===G);if(!k)return;let O=g.filter(Te=>Te.id!==G),Q=fe.closest?fe.closest(".board-card"):null,Z=O.length;if(Q){let Te=Q.getAttribute("data-issue-id");if(Te===G)return;let $e=O.findIndex(st=>st.id===Te);$e>=0&&(Z=$e)}let _e=O.slice();_e.splice(Z,0,k),E.applyReorder(G,_e,Z)}function ut(){for(let C of Array.from(e.querySelectorAll(".board-column--drag-over")))C.classList.remove("board-column--drag-over")}let He=null;e.addEventListener("dragover",C=>{C.preventDefault(),C.dataTransfer&&(C.dataTransfer.dropEffect="move");let fe=C.target.closest(".board-column");fe&&fe!==He&&(He&&He.classList.remove("board-column--drag-over"),fe.classList.add("board-column--drag-over"),He=fe)}),e.addEventListener("dragleave",C=>{let G=C.relatedTarget;(!G||!e.contains(G))&&He&&(He.classList.remove("board-column--drag-over"),He=null)}),e.addEventListener("drop",C=>{C.preventDefault(),He&&(He.classList.remove("board-column--drag-over"),He=null);let G=C.target,fe=G.closest(".board-column");if(!fe)return;let g=C.dataTransfer?.getData("text/plain")||"";if(!g)return;let k=fe.id,O=re.get(g);if(O&&O===k){if(T_.has(k)){if(S!=="manual"){ae("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ot(k,g,G)}return}let Q=E_[k];if(!Q){ae("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}M.get(g)!==Q&&Et(g,Q)}),e.addEventListener("keydown",C=>{let G=C.target;if(!(G instanceof HTMLElement))return;let fe=String(G.tagName||"").toLowerCase();if(fe==="input"||fe==="textarea"||fe==="select"||fe==="button"||fe==="a"||G.isContentEditable===!0)return;let g=G.closest(".board-card");if(!g)return;let k=String(C.key||"");if(k==="Enter"||k===" "){C.preventDefault();let _e=g.getAttribute("data-issue-id");_e&&r(_e);return}if(k!=="ArrowUp"&&k!=="ArrowDown"&&k!=="ArrowLeft"&&k!=="ArrowRight")return;C.preventDefault();let O=g.closest(".board-column");if(!O)return;let Q=Array.from(O.querySelectorAll(".board-card")),Z=Q.indexOf(g);if(k==="ArrowDown"&&Z<Q.length-1){Re(g,Q[Z+1]);return}if(k==="ArrowUp"&&Z>0){Re(g,Q[Z-1]);return}if(k==="ArrowLeft"||k==="ArrowRight"){let _e=Array.from(e.querySelectorAll(".board-column")),Te=_e.indexOf(O),$e=k==="ArrowRight"?1:-1,st=Te+$e;for(;st>=0&&st<_e.length;){let dt=_e[st].querySelector(".board-card");if(dt){Re(g,dt);return}st+=$e}}});function Re(C,G){try{C.tabIndex=-1,G.tabIndex=0,G.focus()}catch{}}let I=null;$&&$.subscribe&&(I=$.subscribe(()=>{try{V()}catch{}}));let K=null;i&&i.subscribe&&(K=i.subscribe(()=>{try{V()}catch{}}));let pe=null;return c&&c.subscribe&&(pe=c.subscribe(()=>{rt()})),{async load(){n("load"),V()},clear(){Ke(),Be(),I&&(I(),I=null),K&&(K(),K=null),pe&&(pe(),pe=null),e.replaceChildren(),N=[],j=[],Y=[],ie=[],z=[],q=[],M=new Map,re=new Map}}}function ts(e,t){return e.filter(n=>{let r=Js(n);return!(r&&t.has(r))})}async function R_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function cn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function pr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ns(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function O_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${pr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${pr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(c=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),c(p)};r.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Mn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await O_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var L_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Uc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},I_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function qt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ct(e){return typeof e=="string"&&e.length>0?e:null}function Or(e){return e.startsWith("gpt-")?e.slice(4):e}function $t(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function zc(e,t,n){let r=Ct(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Ct(n[e]);return s===null?null:{value:s,source:"global"}}function rs(e,t,n,r){return zc(e,t,n)||{value:r,source:"base"}}function Wa(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&qt(s?.[t])){let a=Ct(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&qt(s)){for(let a of Object.values(s))if(qt(a)){let i=Ct(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Ct(r?.runners?.[o]?.models?.[e]?.id)||e}function P_(e,t){return Ct(t?.review?.reviewers?.[e]?.model)||e}function Lr(e,t,n=!1){if(e==="default")return $t(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Or(e):e;return $t(e,t,r,e,"explicit")}function Hc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];qt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(qt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function D_(e,t){let n=[],r=e?.implementation?.model_catalog;qt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(qt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function M_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of D_(t,n)){let o=Hc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function za(e){return $t(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Wc(e,t,n){let r=zc(e,t,n);return r?Lr(r.value,r.source):$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function rn(e){let t=qt(e.pin)?e.pin:{},n=qt(e.global)?e.global:{},r=qt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&qt(r.session)?r.session:null,o=r?.supported===!0&&qt(r.orchestration)?r.orchestration:null,a=qt(e.runner_catalog)?e.runner_catalog:null,i=Ct(n.quick_fix_impl_model),c=M_(i,s,a),d={};if(s){let p=rs("workflow_mode",t,n,Ct(s.workflow_mode_default));d.workflow_mode=p.source==="base"?$t(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):Lr(p.value,p.source);for(let z of["spec_review","plan_review","impl_review"]){let q=`${z}_model`,D=Ct(z==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),U=rs(q,t,n,D);if(U.value===null)d[q]=$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(U.value!=="self"&&U.value!=="skip"&&!qt(s.review?.reviewers?.[U.value]))d[q]=za($t(U.value,U.source,"",null,"explicit"));else{let S=P_(U.value,s);d[q]=$t(U.value,U.source,Or(S),S,U.source==="base"?"default":"explicit")}}for(let[z,q]of Object.entries(Uc)){let D=d[q].value;if(D==="self"||D==="skip"){d[z]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let U=Ct(s.review?.reviewers?.[D||""]?.effort),S=rs(z,t,n,U);d[z]=S.value===null?$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):$t(S.value,S.source,S.value,S.value,S.source==="base"?"default":"explicit")}let b=qt(s.implementation?.default)?s.implementation.default:{},w=Ct(e.route),$=w!==null&&["quick_fix","spec_backed","full_plan"].includes(w),E=qt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},N=$&&qt(E[w])?E[w]:{};for(let z of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=rs(z,t,n,z==="impl_dispatch"?Ct(N.dispatch)||Ct(b.dispatch):Ct(b[z.replace("impl_","")]));d[z]=q.value===null?$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):$t(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let j=Ct(t.impl_runtime),Y=j==="inherit"?Ct(e.controller_runtime):j,ie=w==="quick_fix"&&Ct(t.impl_dispatch)===null&&c.runtime!==null&&(j===null||Y===c.runtime);if(ie){let z=c.runtime,q=i;d.impl_dispatch=$t("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),j===null&&(d.impl_runtime=$t(z,"global",`${z} (\uC720\uB3C4)`,z,"explicit")),Ct(t.impl_model)===null&&(d.impl_model=$t(q,"global",q,q,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let z of["impl_runtime","impl_model","impl_effort","impl_speed"])d[z]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!ie&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let z=d.impl_runtime.value==="inherit"?Ct(e.controller_runtime):d.impl_runtime.value,q=z?Hc(z,s,a):[];if(d.impl_model.value!=="auto"&&q.length>0&&!q.includes(d.impl_model.value))d.impl_model=za(d.impl_model);else{let D=Wa(d.impl_model.value,z,s,a);d.impl_model.display=Or(D),d.impl_model.full_value=D}}if(d.impl_effort.value==="auto"){let z=Ct(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),q=z?Ct(s.implementation?.effort_by_transport?.[z]?.auto):null;q&&!I_.has(q)?(d.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=q,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?$t("default","base","default (\uC77C\uBC18)","default","default"):Lr("default",d.impl_speed.source))}}else for(let p of L_.filter(b=>!b.startsWith("orchestration_")))d[p]=Wc(p,t,n);if(!s){for(let[p,b]of Object.entries(Uc))(d[b].value==="self"||d[b].value==="skip")&&(d[p]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])d[p]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[p]=Wc(p,t,n);continue}let b=p.replace("orchestration_",""),w=Ct(o[b]),$=rs(p,t,n,w);if(p==="orchestration_effort"&&$.source==="base"){d[p]=$t(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if($.value===null){d[p]=$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let E=$.source==="base"?Ct(o.model_id)||$.value:Wa($.value,null,s,a);d[p]=$t($.value,$.source,Or(E),E,$.source==="base"?"default":"explicit");continue}if($.value==="default"){d[p]=$.source==="base"?$t("default","base","default (\uC77C\uBC18)","default","default"):Lr("default",$.source);continue}d[p]=Lr($.value,$.source)}if(s)if(i===null){let p=d.orchestration_model.full_value;d.quick_fix_impl_model=$t(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Or(p)})`,null,"default")}else if(c.runtime!==null){let p=Wa(i,c.runtime,s,a);d.quick_fix_impl_model=$t(i,"global",Or(p),p,"explicit")}else c.offered?d.quick_fix_impl_model=za($t(i,"global","",null,"explicit")):d.quick_fix_impl_model=Lr(i,"global");return d}function N_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function uo(e){let t=qt(e.pin)?e.pin:{},n=qt(e.global)?e.global:{},r=qt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=b=>{let w={...r,...b};return rn({pin:e.layer==="pin"?w:t,global:e.layer==="pin"?n:w,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],d=Ct(o[e.key]),p=[...e.choices];return d!==null&&!p.includes(d)&&p.unshift(d),{unset_label:N_(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:p.map(b=>{let w=s({...o,[e.key]:b})[e.key];return{value:b,label:w.display,full_value:w.full_value}})}}function Ir(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let c=!1,d=b=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(b))},p=()=>d(r.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),r.addEventListener("keydown",b=>{b.key==="Enter"&&(b.ctrlKey||b.metaKey)&&(b.preventDefault(),p())}),t.addEventListener("cancel",b=>{b.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Ha="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",q_="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Gc="\uBD84\uD574 \uC5C6\uB294 leg";function Pt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Rn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Pr=[...Rn,"reasoning_output_tokens"],F_={codex:["implementation","review-consult"],claude:["subagent"]};function Ga(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Rn.some(t=>Number.isFinite(e[t]))}function j_(e){return!e||typeof e!="object"?!1:Pr.some(t=>Number.isFinite(e[t]))}function Va(e){let t=0;for(let n of Rn)t+=Pt(e?.[n]);return t}function B_(e){return!e||typeof e!="object"?!1:Rn.some(t=>Number.isFinite(e[t]))}function Vc(e){return!e||typeof e!="object"?!1:Pr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function U_(e){let t={};for(let n of Pr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Kc(e){let t={};for(let n of Pr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Yc(e,t){return Ga(t)?Pt(t.total_tokens):e==="codex"?Pt(t.input_tokens)+Pt(t.output_tokens):Va(t)}function W_(e){return e==="claude"?"Claude":"Codex"}function z_(e){return`\u03C4 ${Xc(e)}`}function H_(e,t){let n=t.breakdown||{},r=Pt(t.total_only_subtotal);if(Ga(n)||r>0&&!j_(n)){let d=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,q_];return t.replayed&&d.push(Ha),d.join(`
`)}let s=[`\uC785\uB825 ${Pt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Pt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Pt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Pt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Pt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Pt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Pt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${Gc} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",a=r>0?`${o} + ${Gc}`:o,c=[e==="claude"?`Claude subtotal = ${a}`:`Codex subtotal = ${a}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&c.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&c.push(Ha),c.join(`
`)}function Wt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${W_(n)} ${z_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:H_(n,r)})}return t}function fo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal,Number.isFinite(a.total_only_subtotal)&&(i.total_only_subtotal=Pt(i.total_only_subtotal)+Pt(a.total_only_subtotal));for(let c of Pr)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=Pt(i.breakdown[c])+Pt(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ka(e){return!e||typeof e!="object"?null:mn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function G_(e){return e==="codex"?"codex":"claude"}function Cn(){return{subtotal:0,breakdown:U_(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function po(e,t,n){e.subtotal+=t.subtotal,Ga(t.usage)&&(e.total_only+=t.subtotal);for(let r of Pr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Pt(e.breakdown[r])+Pt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Zc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Xc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Dr(e){return B_(e)?`\u03C4 ${Xc(Va(e))}`:null}function Nn(e){let t=Dr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ss(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Pt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Pt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Pt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Pt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Va(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Ha),n.join(`
`)}function mn(e,t){let n={claude:Cn(),codex:Cn()},r={orchestrator:{claude:Cn(),codex:Cn()},implementation:{claude:Cn(),codex:Cn()},"review-consult":{claude:Cn(),codex:Cn()},subagent:{claude:Cn(),codex:Cn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Vc(c)){let p=G_(i.runner),b=Kc(c),w={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:b,subtotal:Yc(p,b)};b.replayed===!0&&(w.replayed=!0),typeof i.model=="string"&&(w.model=i.model),typeof i.session_id=="string"&&(w.session_id=i.session_id),po(n[p],w,!0),po(r.orchestrator[p],w,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){let b=p&&p.provider==="claude"?"claude":"codex";if(!p||p.provider!=="codex"&&p.provider!=="claude"||!F_[b].includes(p.role)||!Vc(p.usage))continue;let w=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!w||s.has(w))continue;s.add(w);let $=Kc(p.usage),E={provider:b,role:p.role,attempt_id:String(i.attempt_id||""),usage:$,subtotal:Yc(b,$)};E.receipt_id=w,typeof p.agent_type=="string"&&(E.agent_type=p.agent_type),typeof p.agent_id=="string"&&(E.agent_id=p.agent_id),typeof p.model=="string"&&(E.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(E.effort=p.effort),typeof p.session_id=="string"?E.session_id=p.session_id:typeof p.thread_id=="string"&&(E.session_id=p.thread_id),typeof p.turn_id=="string"&&(E.turn_id=p.turn_id),(typeof p.completed_at=="string"||typeof p.completed_at=="number"&&Number.isFinite(p.completed_at))&&(E.completed_at=p.completed_at),$.replayed===!0&&(E.replayed=!0),po(n[b],E,!1),po(r[E.role][b],E,!1)}}let o={};for(let i of["claude","codex"]){let c=n[i];if(c.legs.length===0)continue;let d=Zc(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(d.total_cost_usd=c.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let c={};for(let d of["claude","codex"]){let p=r[i][d];p.legs.length>0&&(c[d]={...Zc(p,!0),legs:p.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:au,setPrototypeOf:Qc,isFrozen:V_,getPrototypeOf:K_,getOwnPropertyDescriptor:Y_}=Object,{freeze:Kt,seal:gn,create:ti}=Object,{apply:ni,construct:ri}=typeof Reflect<"u"&&Reflect;Kt||(Kt=function(t){return t});gn||(gn=function(t){return t});ni||(ni=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});ri||(ri=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var _o=Yt(Array.prototype.forEach),Z_=Yt(Array.prototype.lastIndexOf),Jc=Yt(Array.prototype.pop),os=Yt(Array.prototype.push),X_=Yt(Array.prototype.splice),go=Yt(String.prototype.toLowerCase),Ya=Yt(String.prototype.toString),Za=Yt(String.prototype.match),as=Yt(String.prototype.replace),Q_=Yt(String.prototype.indexOf),J_=Yt(String.prototype.trim),vn=Yt(Object.prototype.hasOwnProperty),Vt=Yt(RegExp.prototype.test),is=em(TypeError);function Yt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return ni(e,t,r)}}function em(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ri(e,n)}}function nt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:go;Qc&&Qc(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(V_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function tm(e){for(let t=0;t<e.length;t++)vn(e,t)||(e[t]=null);return e}function qn(e){let t=ti(null);for(let[n,r]of au(e))vn(e,n)&&(Array.isArray(r)?t[n]=tm(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=qn(r):t[n]=r);return t}function ls(e,t){for(;e!==null;){let r=Y_(e,t);if(r){if(r.get)return Yt(r.get);if(typeof r.value=="function")return Yt(r.value)}e=K_(e)}function n(){return null}return n}var eu=Kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Xa=Kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Qa=Kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),nm=Kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ja=Kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),rm=Kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),tu=Kt(["#text"]),nu=Kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ei=Kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ru=Kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),mo=Kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),sm=gn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),om=gn(/<%[\w\W]*|[\w\W]*%>/gm),am=gn(/\$\{[\w\W]*/gm),im=gn(/^data-[\-\w.\u00B7-\uFFFF]+$/),lm=gn(/^aria-[\-\w]+$/),iu=gn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),cm=gn(/^(?:\w+script|data):/i),um=gn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),lu=gn(/^html$/i),dm=gn(/^[a-z][.\w]*(-[.\w]+)+$/i),su=Object.freeze({__proto__:null,ARIA_ATTR:lm,ATTR_WHITESPACE:um,CUSTOM_ELEMENT:dm,DATA_ATTR:im,DOCTYPE_NAME:lu,ERB_EXPR:om,IS_ALLOWED_URI:iu,IS_SCRIPT_OR_DATA:cm,MUSTACHE_EXPR:sm,TMPLIT_EXPR:am}),cs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},pm=function(){return typeof window>"u"?null:window},fm=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ou=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function cu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:pm(),t=Ie=>cu(Ie);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==cs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:b,DOMParser:w,trustedTypes:$}=e,E=c.prototype,N=ls(E,"cloneNode"),j=ls(E,"remove"),Y=ls(E,"nextSibling"),ie=ls(E,"childNodes"),z=ls(E,"parentNode");if(typeof a=="function"){let Ie=n.createElement("template");Ie.content&&Ie.content.ownerDocument&&(n=Ie.content.ownerDocument)}let q,D="",{implementation:U,createNodeIterator:S,createDocumentFragment:M,getElementsByTagName:re}=n,{importNode:Ae}=r,be=ou();t.isSupported=typeof au=="function"&&typeof z=="function"&&U&&U.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:H,ERB_EXPR:X,TMPLIT_EXPR:ye,DATA_ATTR:ke,ARIA_ATTR:he,IS_SCRIPT_OR_DATA:se,ATTR_WHITESPACE:xe,CUSTOM_ELEMENT:ge}=su,{IS_ALLOWED_URI:V}=su,ee=null,ce=nt({},[...eu,...Xa,...Qa,...Ja,...tu]),ve=null,De=nt({},[...nu,...ei,...ru,...mo]),le=Object.seal(ti(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ze=null,P=null,ue=Object.seal(ti(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Me=!0,qe=!0,Le=!1,We=!0,je=!1,Ye=!0,tt=!1,ct=!1,_t=!1,te=!1,J=!1,Ce=!1,Ke=!0,Oe=!1,we="user-content-",Be=!0,Ge=!1,Qe={},Ze=null,rt=nt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),yt=null,Et=nt({},["audio","video","img","source","image","track"]),it=null,Ot=nt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ut="http://www.w3.org/1998/Math/MathML",He="http://www.w3.org/2000/svg",Re="http://www.w3.org/1999/xhtml",I=Re,K=!1,pe=null,C=nt({},[ut,He,Re],Ya),G=nt({},["mi","mo","mn","ms","mtext"]),fe=nt({},["annotation-xml"]),g=nt({},["title","style","font","a","script"]),k=null,O=["application/xhtml+xml","text/html"],Q="text/html",Z=null,_e=null,Te=n.createElement("form"),$e=function(R){return R instanceof RegExp||R instanceof Function},st=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(_e&&_e===R)){if((!R||typeof R!="object")&&(R={}),R=qn(R),k=O.indexOf(R.PARSER_MEDIA_TYPE)===-1?Q:R.PARSER_MEDIA_TYPE,Z=k==="application/xhtml+xml"?Ya:go,ee=vn(R,"ALLOWED_TAGS")?nt({},R.ALLOWED_TAGS,Z):ce,ve=vn(R,"ALLOWED_ATTR")?nt({},R.ALLOWED_ATTR,Z):De,pe=vn(R,"ALLOWED_NAMESPACES")?nt({},R.ALLOWED_NAMESPACES,Ya):C,it=vn(R,"ADD_URI_SAFE_ATTR")?nt(qn(Ot),R.ADD_URI_SAFE_ATTR,Z):Ot,yt=vn(R,"ADD_DATA_URI_TAGS")?nt(qn(Et),R.ADD_DATA_URI_TAGS,Z):Et,Ze=vn(R,"FORBID_CONTENTS")?nt({},R.FORBID_CONTENTS,Z):rt,ze=vn(R,"FORBID_TAGS")?nt({},R.FORBID_TAGS,Z):qn({}),P=vn(R,"FORBID_ATTR")?nt({},R.FORBID_ATTR,Z):qn({}),Qe=vn(R,"USE_PROFILES")?R.USE_PROFILES:!1,Me=R.ALLOW_ARIA_ATTR!==!1,qe=R.ALLOW_DATA_ATTR!==!1,Le=R.ALLOW_UNKNOWN_PROTOCOLS||!1,We=R.ALLOW_SELF_CLOSE_IN_ATTR!==!1,je=R.SAFE_FOR_TEMPLATES||!1,Ye=R.SAFE_FOR_XML!==!1,tt=R.WHOLE_DOCUMENT||!1,te=R.RETURN_DOM||!1,J=R.RETURN_DOM_FRAGMENT||!1,Ce=R.RETURN_TRUSTED_TYPE||!1,_t=R.FORCE_BODY||!1,Ke=R.SANITIZE_DOM!==!1,Oe=R.SANITIZE_NAMED_PROPS||!1,Be=R.KEEP_CONTENT!==!1,Ge=R.IN_PLACE||!1,V=R.ALLOWED_URI_REGEXP||iu,I=R.NAMESPACE||Re,G=R.MATHML_TEXT_INTEGRATION_POINTS||G,fe=R.HTML_INTEGRATION_POINTS||fe,le=R.CUSTOM_ELEMENT_HANDLING||{},R.CUSTOM_ELEMENT_HANDLING&&$e(R.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(le.tagNameCheck=R.CUSTOM_ELEMENT_HANDLING.tagNameCheck),R.CUSTOM_ELEMENT_HANDLING&&$e(R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(le.attributeNameCheck=R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),R.CUSTOM_ELEMENT_HANDLING&&typeof R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(le.allowCustomizedBuiltInElements=R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),je&&(qe=!1),J&&(te=!0),Qe&&(ee=nt({},tu),ve=[],Qe.html===!0&&(nt(ee,eu),nt(ve,nu)),Qe.svg===!0&&(nt(ee,Xa),nt(ve,ei),nt(ve,mo)),Qe.svgFilters===!0&&(nt(ee,Qa),nt(ve,ei),nt(ve,mo)),Qe.mathMl===!0&&(nt(ee,Ja),nt(ve,ru),nt(ve,mo))),R.ADD_TAGS&&(typeof R.ADD_TAGS=="function"?ue.tagCheck=R.ADD_TAGS:(ee===ce&&(ee=qn(ee)),nt(ee,R.ADD_TAGS,Z))),R.ADD_ATTR&&(typeof R.ADD_ATTR=="function"?ue.attributeCheck=R.ADD_ATTR:(ve===De&&(ve=qn(ve)),nt(ve,R.ADD_ATTR,Z))),R.ADD_URI_SAFE_ATTR&&nt(it,R.ADD_URI_SAFE_ATTR,Z),R.FORBID_CONTENTS&&(Ze===rt&&(Ze=qn(Ze)),nt(Ze,R.FORBID_CONTENTS,Z)),Be&&(ee["#text"]=!0),tt&&nt(ee,["html","head","body"]),ee.table&&(nt(ee,["tbody"]),delete ze.tbody),R.TRUSTED_TYPES_POLICY){if(typeof R.TRUSTED_TYPES_POLICY.createHTML!="function")throw is('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof R.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw is('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=R.TRUSTED_TYPES_POLICY,D=q.createHTML("")}else q===void 0&&(q=fm($,s)),q!==null&&typeof D=="string"&&(D=q.createHTML(""));Kt&&Kt(R),_e=R}},dt=nt({},[...Xa,...Qa,...nm]),Se=nt({},[...Ja,...rm]),bt=function(R){let de=z(R);(!de||!de.tagName)&&(de={namespaceURI:I,tagName:"template"});let Ee=go(R.tagName),ot=go(de.tagName);return pe[R.namespaceURI]?R.namespaceURI===He?de.namespaceURI===Re?Ee==="svg":de.namespaceURI===ut?Ee==="svg"&&(ot==="annotation-xml"||G[ot]):!!dt[Ee]:R.namespaceURI===ut?de.namespaceURI===Re?Ee==="math":de.namespaceURI===He?Ee==="math"&&fe[ot]:!!Se[Ee]:R.namespaceURI===Re?de.namespaceURI===He&&!fe[ot]||de.namespaceURI===ut&&!G[ot]?!1:!Se[Ee]&&(g[Ee]||!dt[Ee]):!!(k==="application/xhtml+xml"&&pe[R.namespaceURI]):!1},gt=function(R){os(t.removed,{element:R});try{z(R).removeChild(R)}catch{j(R)}},Ft=function(R,de){try{os(t.removed,{attribute:de.getAttributeNode(R),from:de})}catch{os(t.removed,{attribute:null,from:de})}if(de.removeAttribute(R),R==="is")if(te||J)try{gt(de)}catch{}else try{de.setAttribute(R,"")}catch{}},Gt=function(R){let de=null,Ee=null;if(_t)R="<remove></remove>"+R;else{let pt=Za(R,/^[\r\n\t ]+/);Ee=pt&&pt[0]}k==="application/xhtml+xml"&&I===Re&&(R='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+R+"</body></html>");let ot=q?q.createHTML(R):R;if(I===Re)try{de=new w().parseFromString(ot,k)}catch{}if(!de||!de.documentElement){de=U.createDocument(I,"template",null);try{de.documentElement.innerHTML=K?D:ot}catch{}}let vt=de.body||de.documentElement;return R&&Ee&&vt.insertBefore(n.createTextNode(Ee),vt.childNodes[0]||null),I===Re?re.call(de,tt?"html":"body")[0]:tt?de.documentElement:vt},Nt=function(R){return S.call(R.ownerDocument||R,R,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Dt=function(R){return R instanceof b&&(typeof R.nodeName!="string"||typeof R.textContent!="string"||typeof R.removeChild!="function"||!(R.attributes instanceof p)||typeof R.removeAttribute!="function"||typeof R.setAttribute!="function"||typeof R.namespaceURI!="string"||typeof R.insertBefore!="function"||typeof R.hasChildNodes!="function")},pn=function(R){return typeof i=="function"&&R instanceof i};function At(Ie,R,de){_o(Ie,Ee=>{Ee.call(t,R,de,_e)})}let Mt=function(R){let de=null;if(At(be.beforeSanitizeElements,R,null),Dt(R))return gt(R),!0;let Ee=Z(R.nodeName);if(At(be.uponSanitizeElement,R,{tagName:Ee,allowedTags:ee}),Ye&&R.hasChildNodes()&&!pn(R.firstElementChild)&&Vt(/<[/\w!]/g,R.innerHTML)&&Vt(/<[/\w!]/g,R.textContent)||R.nodeType===cs.progressingInstruction||Ye&&R.nodeType===cs.comment&&Vt(/<[/\w]/g,R.data))return gt(R),!0;if(!(ue.tagCheck instanceof Function&&ue.tagCheck(Ee))&&(!ee[Ee]||ze[Ee])){if(!ze[Ee]&&Xt(Ee)&&(le.tagNameCheck instanceof RegExp&&Vt(le.tagNameCheck,Ee)||le.tagNameCheck instanceof Function&&le.tagNameCheck(Ee)))return!1;if(Be&&!Ze[Ee]){let ot=z(R)||R.parentNode,vt=ie(R)||R.childNodes;if(vt&&ot){let pt=vt.length;for(let Rt=pt-1;Rt>=0;--Rt){let It=N(vt[Rt],!0);It.__removalCount=(R.__removalCount||0)+1,ot.insertBefore(It,Y(R))}}}return gt(R),!0}return R instanceof c&&!bt(R)||(Ee==="noscript"||Ee==="noembed"||Ee==="noframes")&&Vt(/<\/no(script|embed|frames)/i,R.innerHTML)?(gt(R),!0):(je&&R.nodeType===cs.text&&(de=R.textContent,_o([H,X,ye],ot=>{de=as(de,ot," ")}),R.textContent!==de&&(os(t.removed,{element:R.cloneNode()}),R.textContent=de)),At(be.afterSanitizeElements,R,null),!1)},Ue=function(R,de,Ee){if(Ke&&(de==="id"||de==="name")&&(Ee in n||Ee in Te))return!1;if(!(qe&&!P[de]&&Vt(ke,de))){if(!(Me&&Vt(he,de))){if(!(ue.attributeCheck instanceof Function&&ue.attributeCheck(de,R))){if(!ve[de]||P[de]){if(!(Xt(R)&&(le.tagNameCheck instanceof RegExp&&Vt(le.tagNameCheck,R)||le.tagNameCheck instanceof Function&&le.tagNameCheck(R))&&(le.attributeNameCheck instanceof RegExp&&Vt(le.attributeNameCheck,de)||le.attributeNameCheck instanceof Function&&le.attributeNameCheck(de,R))||de==="is"&&le.allowCustomizedBuiltInElements&&(le.tagNameCheck instanceof RegExp&&Vt(le.tagNameCheck,Ee)||le.tagNameCheck instanceof Function&&le.tagNameCheck(Ee))))return!1}else if(!it[de]){if(!Vt(V,as(Ee,xe,""))){if(!((de==="src"||de==="xlink:href"||de==="href")&&R!=="script"&&Q_(Ee,"data:")===0&&yt[R])){if(!(Le&&!Vt(se,as(Ee,xe,"")))){if(Ee)return!1}}}}}}}return!0},Xt=function(R){return R!=="annotation-xml"&&Za(R,ge)},Qt=function(R){At(be.beforeSanitizeAttributes,R,null);let{attributes:de}=R;if(!de||Dt(R))return;let Ee={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0},ot=de.length;for(;ot--;){let vt=de[ot],{name:pt,namespaceURI:Rt,value:It}=vt,Ht=Z(pt),Jt=It,wt=pt==="value"?Jt:J_(Jt);if(Ee.attrName=Ht,Ee.attrValue=wt,Ee.keepAttr=!0,Ee.forceKeepAttr=void 0,At(be.uponSanitizeAttribute,R,Ee),wt=Ee.attrValue,Oe&&(Ht==="id"||Ht==="name")&&(Ft(pt,R),wt=we+wt),Ye&&Vt(/((--!?|])>)|<\/(style|title|textarea)/i,wt)){Ft(pt,R);continue}if(Ht==="attributename"&&Za(wt,"href")){Ft(pt,R);continue}if(Ee.forceKeepAttr)continue;if(!Ee.keepAttr){Ft(pt,R);continue}if(!We&&Vt(/\/>/i,wt)){Ft(pt,R);continue}je&&_o([H,X,ye],fn=>{wt=as(wt,fn," ")});let en=Z(R.nodeName);if(!Ue(en,Ht,wt)){Ft(pt,R);continue}if(q&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!Rt)switch($.getAttributeType(en,Ht)){case"TrustedHTML":{wt=q.createHTML(wt);break}case"TrustedScriptURL":{wt=q.createScriptURL(wt);break}}if(wt!==Jt)try{Rt?R.setAttributeNS(Rt,pt,wt):R.setAttribute(pt,wt),Dt(R)?gt(R):Jc(t.removed)}catch{Ft(pt,R)}}At(be.afterSanitizeAttributes,R,null)},et=function Ie(R){let de=null,Ee=Nt(R);for(At(be.beforeSanitizeShadowDOM,R,null);de=Ee.nextNode();)At(be.uponSanitizeShadowNode,de,null),Mt(de),Qt(de),de.content instanceof o&&Ie(de.content);At(be.afterSanitizeShadowDOM,R,null)};return t.sanitize=function(Ie){let R=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},de=null,Ee=null,ot=null,vt=null;if(K=!Ie,K&&(Ie="<!-->"),typeof Ie!="string"&&!pn(Ie))if(typeof Ie.toString=="function"){if(Ie=Ie.toString(),typeof Ie!="string")throw is("dirty is not a string, aborting")}else throw is("toString is not a function");if(!t.isSupported)return Ie;if(ct||st(R),t.removed=[],typeof Ie=="string"&&(Ge=!1),Ge){if(Ie.nodeName){let It=Z(Ie.nodeName);if(!ee[It]||ze[It])throw is("root node is forbidden and cannot be sanitized in-place")}}else if(Ie instanceof i)de=Gt("<!---->"),Ee=de.ownerDocument.importNode(Ie,!0),Ee.nodeType===cs.element&&Ee.nodeName==="BODY"||Ee.nodeName==="HTML"?de=Ee:de.appendChild(Ee);else{if(!te&&!je&&!tt&&Ie.indexOf("<")===-1)return q&&Ce?q.createHTML(Ie):Ie;if(de=Gt(Ie),!de)return te?null:Ce?D:""}de&&_t&&gt(de.firstChild);let pt=Nt(Ge?Ie:de);for(;ot=pt.nextNode();)Mt(ot),Qt(ot),ot.content instanceof o&&et(ot.content);if(Ge)return Ie;if(te){if(J)for(vt=M.call(de.ownerDocument);de.firstChild;)vt.appendChild(de.firstChild);else vt=de;return(ve.shadowroot||ve.shadowrootmode)&&(vt=Ae.call(r,vt,!0)),vt}let Rt=tt?de.outerHTML:de.innerHTML;return tt&&ee["!doctype"]&&de.ownerDocument&&de.ownerDocument.doctype&&de.ownerDocument.doctype.name&&Vt(lu,de.ownerDocument.doctype.name)&&(Rt="<!DOCTYPE "+de.ownerDocument.doctype.name+`>
`+Rt),je&&_o([H,X,ye],It=>{Rt=as(Rt,It," ")}),q&&Ce?q.createHTML(Rt):Rt},t.setConfig=function(){let Ie=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};st(Ie),ct=!0},t.clearConfig=function(){_e=null,ct=!1},t.isValidAttribute=function(Ie,R,de){_e||st({});let Ee=Z(Ie),ot=Z(R);return Ue(Ee,ot,de)},t.addHook=function(Ie,R){typeof R=="function"&&os(be[Ie],R)},t.removeHook=function(Ie,R){if(R!==void 0){let de=Z_(be[Ie],R);return de===-1?void 0:X_(be[Ie],de,1)[0]}return Jc(be[Ie])},t.removeHooks=function(Ie){be[Ie]=[]},t.removeAllHooks=function(){be=ou()},t}var uu=cu();var Fn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},bo=e=>(...t)=>({_$litDirective$:e,values:t}),Mr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var us=class extends Mr{constructor(t){if(super(t),this.it=Lt,t.type!==Fn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Lt||t==null)return this._t=void 0,this.it=t;if(t===_n)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};us.directiveName="unsafeHTML",us.resultType=1;var du=bo(us);function ii(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var _r=ii();function hu(e){_r=e}var _s={exec:()=>null};function lt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Zt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var _m=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Zt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},mm=/^(?:[ \t]*(?:\n|$))+/,gm=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,bm=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ms=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,hm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,li=/(?:[*+-]|\d{1,9}[.)])/,yu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,vu=lt(yu).replace(/bull/g,li).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ym=lt(yu).replace(/bull/g,li).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ci=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,vm=/^[^\n]+/,ui=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,wm=lt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ui).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),km=lt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,li).getRegex(),$o="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",di=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,$m=lt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",di).replace("tag",$o).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),wu=lt(ci).replace("hr",ms).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex(),xm=lt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",wu).getRegex(),pi={blockquote:xm,code:gm,def:wm,fences:bm,heading:hm,hr:ms,html:$m,lheading:vu,list:km,newline:mm,paragraph:wu,table:_s,text:vm},pu=lt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ms).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex(),Am={...pi,lheading:ym,table:pu,paragraph:lt(ci).replace("hr",ms).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",pu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex()},Sm={...pi,html:lt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",di).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:_s,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:lt(ci).replace("hr",ms).replace("heading",` *#{1,6} *[^
]`).replace("lheading",vu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Em=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Tm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ku=/^( {2,}|\\)\n(?!\s*$)/,Cm=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,xo=/[\p{P}\p{S}]/u,fi=/[\s\p{P}\p{S}]/u,$u=/[^\s\p{P}\p{S}]/u,Rm=lt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,fi).getRegex(),xu=/(?!~)[\p{P}\p{S}]/u,Om=/(?!~)[\s\p{P}\p{S}]/u,Lm=/(?:[^\s\p{P}\p{S}]|~)/u,Im=lt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",_m?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Au=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Pm=lt(Au,"u").replace(/punct/g,xo).getRegex(),Dm=lt(Au,"u").replace(/punct/g,xu).getRegex(),Su="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Mm=lt(Su,"gu").replace(/notPunctSpace/g,$u).replace(/punctSpace/g,fi).replace(/punct/g,xo).getRegex(),Nm=lt(Su,"gu").replace(/notPunctSpace/g,Lm).replace(/punctSpace/g,Om).replace(/punct/g,xu).getRegex(),qm=lt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,$u).replace(/punctSpace/g,fi).replace(/punct/g,xo).getRegex(),Fm=lt(/\\(punct)/,"gu").replace(/punct/g,xo).getRegex(),jm=lt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Bm=lt(di).replace("(?:-->|$)","-->").getRegex(),Um=lt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Bm).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),vo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Wm=lt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",vo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Eu=lt(/^!?\[(label)\]\[(ref)\]/).replace("label",vo).replace("ref",ui).getRegex(),Tu=lt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ui).getRegex(),zm=lt("reflink|nolink(?!\\()","g").replace("reflink",Eu).replace("nolink",Tu).getRegex(),fu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,_i={_backpedal:_s,anyPunctuation:Fm,autolink:jm,blockSkip:Im,br:ku,code:Tm,del:_s,emStrongLDelim:Pm,emStrongRDelimAst:Mm,emStrongRDelimUnd:qm,escape:Em,link:Wm,nolink:Tu,punctuation:Rm,reflink:Eu,reflinkSearch:zm,tag:Um,text:Cm,url:_s},Hm={..._i,link:lt(/^!?\[(label)\]\((.*?)\)/).replace("label",vo).getRegex(),reflink:lt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",vo).getRegex()},si={..._i,emStrongRDelimAst:Nm,emStrongLDelim:Dm,url:lt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",fu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:lt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",fu).getRegex()},Gm={...si,br:lt(ku).replace("{2,}","*").getRegex(),text:lt(si.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ho={normal:pi,gfm:Am,pedantic:Sm},ds={normal:_i,gfm:si,breaks:Gm,pedantic:Hm},Vm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},_u=e=>Vm[e];function jn(e,t){if(t){if(Zt.escapeTest.test(e))return e.replace(Zt.escapeReplace,_u)}else if(Zt.escapeTestNoEncode.test(e))return e.replace(Zt.escapeReplaceNoEncode,_u);return e}function mu(e){try{e=encodeURI(e).replace(Zt.percentDecode,"%")}catch{return null}return e}function gu(e,t){let n=e.replace(Zt.findPipe,(o,a,i)=>{let c=!1,d=a;for(;--d>=0&&i[d]==="\\";)c=!c;return c?"|":" |"}),r=n.split(Zt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Zt.slashPipe,"|");return r}function ps(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function Km(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function bu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,c}function Ym(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var wo=class{constructor(e){ht(this,"options");ht(this,"rules");ht(this,"lexer");this.options=e||_r}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ps(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Ym(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ps(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ps(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ps(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))i.push(n[c]),a=!0;else if(!a)i.push(n[c]);else break;n=n.slice(c);let d=i.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,s=s?`${s}
${p}`:p;let b=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=b,n.length===0)break;let w=o.at(-1);if(w?.type==="code")break;if(w?.type==="blockquote"){let $=w,E=$.raw+`
`+n.join(`
`),N=this.blockquote(E);o[o.length-1]=N,r=r.substring(0,r.length-$.raw.length)+N.raw,s=s.substring(0,s.length-$.text.length)+N.text;break}else if(w?.type==="list"){let $=w,E=$.raw+`
`+n.join(`
`),N=this.list(E);o[o.length-1]=N,r=r.substring(0,r.length-w.raw.length)+N.raw,s=s.substring(0,s.length-$.raw.length)+N.raw,n=E.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let b=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,N=>" ".repeat(3*N.length)),w=e.split(`
`,1)[0],$=!b.trim(),E=0;if(this.options.pedantic?(E=2,p=b.trimStart()):$?E=t[1].length+1:(E=t[2].search(this.rules.other.nonSpaceChar),E=E>4?1:E,p=b.slice(E),E+=t[1].length),$&&this.rules.other.blankLine.test(w)&&(d+=w+`
`,e=e.substring(w.length+1),c=!0),!c){let N=this.rules.other.nextBulletRegex(E),j=this.rules.other.hrRegex(E),Y=this.rules.other.fencesBeginRegex(E),ie=this.rules.other.headingBeginRegex(E),z=this.rules.other.htmlBeginRegex(E);for(;e;){let q=e.split(`
`,1)[0],D;if(w=q,this.options.pedantic?(w=w.replace(this.rules.other.listReplaceNesting,"  "),D=w):D=w.replace(this.rules.other.tabCharGlobal,"    "),Y.test(w)||ie.test(w)||z.test(w)||N.test(w)||j.test(w))break;if(D.search(this.rules.other.nonSpaceChar)>=E||!w.trim())p+=`
`+D.slice(E);else{if($||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(b)||ie.test(b)||j.test(b))break;p+=`
`+w}!$&&!w.trim()&&($=!0),d+=q+`
`,e=e.substring(q.length+1),b=D.slice(E)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(c.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};c.checked=p.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=p.raw+c.tokens[0].raw,c.tokens[0].text=p.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(p)):c.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):c.tokens.unshift(p)}}if(!s.loose){let d=c.tokens.filter(b=>b.type==="space"),p=d.length>0&&d.some(b=>this.rules.other.anyLine.test(b.raw));s.loose=p}}if(s.loose)for(let c of s.items){c.loose=!0;for(let d of c.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=gu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(gu(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=ps(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Km(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),bu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return bu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,c=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let p=[...r[0]][0].length,b=e.slice(0,s+r.index+p+a);if(Math.min(s,a)%2){let $=b.slice(1,-1);return{type:"em",raw:b,text:$,tokens:this.lexer.inlineTokens($)}}let w=b.slice(2,-2);return{type:"strong",raw:b,text:w,tokens:this.lexer.inlineTokens(w)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},wn=class oi{constructor(t){ht(this,"tokens");ht(this,"options");ht(this,"state");ht(this,"inlineQueue");ht(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||_r,this.options.tokenizer=this.options.tokenizer||new wo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Zt,block:ho.normal,inline:ds.normal};this.options.pedantic?(n.block=ho.pedantic,n.inline=ds.pedantic):this.options.gfm&&(n.block=ho.gfm,this.options.breaks?n.inline=ds.breaks:n.inline=ds.gfm),this.tokenizer.rules=n}static get rules(){return{block:ho,inline:ds}}static lex(t,n){return new oi(n).lex(t)}static lexInline(t,n){return new oi(n).inlineTokens(t)}lex(t){t=t.replace(Zt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(Zt.tabCharGlobal,"    ").replace(Zt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),c;this.options.extensions.startBlock.forEach(d=>{c=d.call({lexer:this},i),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(p=>(c=p.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let p=n.at(-1);c.type==="text"&&p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,i)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,b=t.slice(1),w;this.options.extensions.startInline.forEach($=>{w=$.call({lexer:this},b),typeof w=="number"&&w>=0&&(p=Math.min(p,w))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(c=this.tokenizer.inlineText(d)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):n.push(c);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},ko=class{constructor(e){ht(this,"options");ht(this,"parser");this.options=e||_r}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Zt.notSpaceStart)?.[0],s=e.replace(Zt.endingNewline,"")+`
`;return r?'<pre><code class="language-'+jn(r)+'">'+(n?s:jn(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:jn(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${jn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=mu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+jn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=mu(e);if(s===null)return jn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${jn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:jn(e.text)}},mi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},kn=class ai{constructor(t){ht(this,"options");ht(this,"renderer");ht(this,"textRenderer");this.options=t||_r,this.options.renderer=this.options.renderer||new ko,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new mi}static parse(t,n){return new ai(n).parse(t)}static parseInline(t,n){return new ai(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},yo,fs=(yo=class{constructor(e){ht(this,"options");ht(this,"block");this.options=e||_r}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?wn.lex:wn.lexInline}provideParser(){return this.block?kn.parse:kn.parseInline}},ht(yo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ht(yo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),yo),Zm=class{constructor(...e){ht(this,"defaults",ii());ht(this,"options",this.setOptions);ht(this,"parse",this.parseMarkdown(!0));ht(this,"parseInline",this.parseMarkdown(!1));ht(this,"Parser",kn);ht(this,"Renderer",ko);ht(this,"TextRenderer",mi);ht(this,"Lexer",wn);ht(this,"Tokenizer",wo);ht(this,"Hooks",fs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new ko(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],c=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=c.apply(s,d)),p||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new wo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],c=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=c.apply(s,d)),p}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new fs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],c=s[a];fs.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&fs.passThroughHooksRespectAsync.has(o))return(async()=>{let b=await i.call(s,d);return c.call(s,b)})();let p=i.call(s,d);return c.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let b=await i.apply(s,d);return b===!1&&(b=await c.apply(s,d)),b})();let p=i.apply(s,d);return p===!1&&(p=c.apply(s,d)),p}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return wn.lex(e,t??this.defaults)}parser(e,t){return kn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?wn.lex:wn.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?kn.parse:kn.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?wn.lex:wn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?kn.parse:kn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+jn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},fr=new Zm;function mt(e,t){return fr.parse(e,t)}mt.options=mt.setOptions=function(e){return fr.setOptions(e),mt.defaults=fr.defaults,hu(mt.defaults),mt};mt.getDefaults=ii;mt.defaults=_r;mt.use=function(...e){return fr.use(...e),mt.defaults=fr.defaults,hu(mt.defaults),mt};mt.walkTokens=function(e,t){return fr.walkTokens(e,t)};mt.parseInline=fr.parseInline;mt.Parser=kn;mt.parser=kn.parse;mt.Renderer=ko;mt.TextRenderer=mi;mt.Lexer=wn;mt.lexer=wn.lex;mt.Tokenizer=wo;mt.Hooks=fs;mt.parse=mt;var vw=mt.options,ww=mt.setOptions,kw=mt.use,$w=mt.walkTokens,xw=mt.parseInline;var Aw=kn.parse,Sw=wn.lex;function Kn(e){let t=mt.parse(e),n=uu.sanitize(t);return du(n)}function Bn(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Nr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ao(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Ru={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Xm={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Qm=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Jm=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function On(e){return!!e&&typeof e=="object"}function gi(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function bi(e,t){let n=gi(e),r=gi(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Ou(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>On(s)&&typeof s.text=="string"?s.text:"").join(""):On(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function eg(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Ru[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=gi(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=bi(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let c=bi(On(i)?i.old_string:"",On(i)?i.new_string:"");s+=c.added,o+=c.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function hi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function yi(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Qm.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Jm.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function tg(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function ng(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(On(a)){if(a.type==="text"&&typeof a.text=="string")o.push(yi(a.text));else if(a.type==="thinking"){let i=hi(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=eg(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?Cu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(On(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=Ou(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Cu([s],n):[s]}return[]}function Cu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function rg(e){let t=typeof e.command=="string"?e.command:"",n=Ou(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Ru.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function sg(e){if(e.type==="item.completed"&&On(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[yi(t.text)];if(t.type==="reasoning"){let n=hi(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[rg(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function og(e){if(e.schema!=="codex-delegation-monitor-v1"||!On(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&On(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[yi(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=hi(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Xm[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function ag(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function ig(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return On(t)?t:null}function Lu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=ig(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return tg(o,r);let a=o.schema==="codex-delegation-monitor-v1"?og(o):ag(o)?sg(o):ng(o,n);return a.length>0&&(r.progress=null),a}}}function vi(e){let t=[],n=Lu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var lg=5,cg=10,ug=/Task\s+#(\d+)/,dg=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,pg=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function So(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function fg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function _g(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function mg(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=ug.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!c||d.length===0)continue;t.set(c[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function gg(e){if(e.tool==="Bash"){let t=e.command||"";return dg.test(t)?"~ PR/\uAC8C\uC2DC \uC911":pg.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function bg(e){let t=e.filter(s=>s.kind==="tool").slice(-cg),n=new Map;t.forEach((s,o)=>{let a=gg(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function hg(e){let t=_g(e);if(t)return{text:t,guess:!1};let n=mg(e);if(n)return{text:n,guess:!1};let r=bg(e);return r?{text:r,guess:!0}:null}function yg(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:ln(e,t)}function qr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,c=null,d=!1,p={},b=!0,w=new Set,$=new Set,E=null,N=null,j=!1,Y=!1,ie=!1,z=null,q=null;function D(){j=!1,Y=!1,ie=!1,z=null,q=null}async function U(te){if(n){Y=!0,ie=!1,le();try{let J=await Promise.resolve(n("get-attempt-prompt",{attempt_id:te,...c?{root_dir:c}:{}}));if(o!==te)return;!J||typeof J!="object"||Array.isArray(J)?ie=!0:(z=J,q=te)}catch{o===te&&(ie=!0)}finally{o===te&&(Y=!1,le())}}}function S(){if(j=!j,j&&o&&q!==o){U(o);return}le()}function M(){if(!j)return"";let te=Nr({loading:Y,error:ie});if(te)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${te}
      </div>`;if(!z)return"";if(z.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let J=Ao(z.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${J?l`<div class="prompt-block__meta">${J} 발송</div>`:""}
      ${typeof z.task_prompt=="string"?Bn("\uACFC\uC5C5 (user)",z.task_prompt):""}
      ${typeof z.system_prompt=="string"?Bn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",z.system_prompt):""}
    </div>`}function re(){if(!i||!r)return[];let te=r.get(i);return vi(te?te.lines:[])}function Ae(){if(!i||!r)return null;let te=r.get(i),J=te?te.last_event_at:null;return typeof J=="number"?J:null}function be(){return p.status==="running"}function H(){if(be()&&o){N||(N=setInterval(()=>le(),1e3));return}X()}function X(){N&&(clearInterval(N),N=null)}function ye(te){let J=[],Ce=0;for(;Ce<te.length;){let{idx:Ke,line:Oe}=te[Ce];if(Oe.kind==="tool"){let we=Ce;for(;we<te.length&&te[we].line.kind==="tool"&&te[we].line.tool===Oe.tool;)we+=1;if(we-Ce>=lg&&!$.has(Ke)){J.push({kind:"group",idx:Ke,tool:Oe.tool||"",lines:te.slice(Ce,we)}),Ce=we;continue}}J.push({kind:"line",idx:Ke,line:Oe}),Ce+=1}return J}function ke(te){let J=[],Ce=new Map;for(let we=0;we<te.length;we+=1){let Be=te[we],Ge=Be.parent_tool_use_id;if(typeof Ge=="string"&&Ge.length>0){let Qe=Ce.get(Ge);Qe||(Qe={kind:"subagent",idx:we,launch_id:Ge,agent_type:null,header:null,lines:[]},Ce.set(Ge,Qe),J.push(Qe)),Qe.lines.push({idx:we,line:Be});continue}if(Be.kind==="tool"&&Be.tool==="Agent"&&typeof Be.launch_id=="string"&&Be.launch_id.length>0){let Qe=he(Be),Ze=Ce.get(Be.launch_id);if(Ze){Ze.header={idx:we,line:Be},Ze.agent_type=Qe;continue}let rt={kind:"subagent",idx:we,launch_id:Be.launch_id,agent_type:Qe,header:{idx:we,line:Be},lines:[]};Ce.set(Be.launch_id,rt),J.push(rt);continue}J.push({kind:"entry",idx:we,line:Be})}let Ke=[],Oe=0;for(;Oe<J.length;){if(J[Oe].kind!=="entry"){Ke.push(J[Oe]),Oe+=1;continue}let we=Oe;for(;we<J.length&&J[we].kind==="entry";)we+=1;Ke.push(...ye(J.slice(Oe,we))),Oe=we}return Ke}function he(te){let J=te.input;return J&&typeof J.subagent_type=="string"?J.subagent_type:null}function se(te){for(let J=te.length-1;J>=0;J-=1){let Ce=te[J];if(Ce.kind==="result"||Ce.kind==="error")return null;if(Ce.kind==="tool"&&!Object.hasOwn(Ce,"result"))return Ce}return null}function xe(te){for(let J=te.length-1;J>=0;J-=1)if(te[J].kind==="thinking")return te[J];return null}function ge(te,J){if(J.kind==="gate")return l`<div class="sv__gate">${J.text}</div>`;if(J.kind==="phase")return l`<div class="sv__phase">${J.text}</div>`;if(J.kind==="result")return l`<div
        class="sv__result${J.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${J.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Kn(J.text||(J.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(J.kind==="thinking"){let Ce=w.has(te);return l`<div
        class="sv__think${Ce?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>P(te)}
      >
        <span class="sv__think-line">💭 ${So(J.text)}</span>
        ${Ce?l`<pre class="sv__think-expand">${J.text}</pre>`:""}
      </div>`}if(J.kind==="error")return l`<div class="sv__error">⛔ ${J.text}</div>`;if(J.kind==="blocker")return l`<div class="sv__error">⛔ ${J.text}</div>`;if(J.kind==="tool"){let Ce=w.has(te),Ke=J.tool==="Bash"?fg(J.command):0,Oe=J.tool==="Bash"?Ke>1?So(J.command):J.command:J.path||J.command||"";return l`<div
        class="sv__tool${Ce?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>P(te)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${J.icon}</span>
          <span class="sv__tool-name">${J.tool}</span>
          ${Oe?l`<span class="sv__tool-detail">${Oe}</span>`:""}
          ${Ke>1?l`<span class="sv__tool-more">⋯ ${Ke}줄</span>`:""}
          ${typeof J.added=="number"?l`<span class="sv__diff-add">+${J.added}</span>`:""}
          ${typeof J.removed=="number"?l`<span class="sv__diff-del">−${J.removed}</span>`:""}
          ${J.result?l`<span class="sv__tool-ok">→ ${J.result}</span>`:""}
        </span>
        ${Ce?l`<pre class="sv__tool-expand">${V(J)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Kn(J.text||"")}</div>`}function V(te){let J=[];if(te.tool==="Bash"&&typeof te.command=="string"&&te.command.length>0)J.push(te.command);else if(te.input!==void 0)try{J.push(`input: ${JSON.stringify(te.input,null,2)}`)}catch{}return typeof te.output=="string"&&te.output.length>0&&J.push(`output:
${te.output}`),J.join(`

`)}function ee(){if(!o)return l``;let te=re(),J=(a?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),Ce=p.session_id||"",Ke=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${b?"ON":"OFF"}`,Oe=be(),we=Oe?yg(Ae(),Date.now()):"",Be=Oe?se(te):null,Ge=Oe?xe(te):null,Qe=hg(te);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?p.role||"":o}</span>
        ${Qe?l`<span
              class="sv__stage${Qe.guess?" sv__stage--guess":""}"
              title=${Qe.text}
              >${Qe.text}</span
            >`:""}
        ${Oe?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${we?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${we}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${we?l`<span class="sv__live-ago">${we}</span>`:""}</span
            >`:""}
        ${Ce?l`<button
              type="button"
              class="sv__session"
              title=${Ce}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ce}`}
              @click=${()=>Me(Ce)}
            >
              ⧉ ${Ce.slice(0,8)}
            </button>`:""}
        ${J?l`<span class="sv__meta">${J}</span>`:""}
        ${p.worktree?l`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${a||d?"":l`<button
              type="button"
              class="sv__prompt-toggle${j?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${j?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${S}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${b?" sv__follow--on":""}"
          aria-pressed=${b?"true":"false"}
          aria-label=${Ke}
          @click=${ue}
        >
          <span class="sv__follow-full">⇣ ${Ke}</span>
          <span class="sv__follow-short">⇣ ${b?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>_t()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":M()}
      <div class="sv__body">
        ${te.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:ke(te).map(Ze=>Ze.kind==="subagent"?ve(Ze):Ze.kind==="group"?ce(Ze):ge(Ze.idx,Ze.line))}
      </div>
      ${Be||Ge?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Be?l`<span class="sv__now-icon">${Be.icon}</span>
                  <span class="sv__now-name">${Be.tool}</span>
                  <span class="sv__now-detail"
                    >${Be.tool==="Bash"?So(Be.command):Be.path||Be.command||""}</span
                  >`:""}
            ${Ge?l`<span class="sv__now-think"
                  >💭 ${So(Ge.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ce(te){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>De(te.idx)}
    >
      <span class="sv__group-icon">${te.lines[0].line.icon}</span>
      <span class="sv__group-name">${te.tool}</span>
      <span class="sv__group-count">${te.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function ve(te){let J=$.has(te.idx),Ce=te.header?te.header.line:null,Ke=Ce?Ce.is_error===!0?"\u2717":typeof Ce.result=="string"?"\u2713":"\u27F3":"",Oe=Ce&&Ce.command?Ce.command:"";return l`<div class="sv__sub${J?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>De(te.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${te.agent_type||"subagent"}</span>
        ${Oe?l`<span class="sv__sub-detail">${Oe}</span>`:""}
        <span class="sv__sub-count">${te.lines.length}줄</span>
        ${Ke?l`<span class="sv__sub-state">${Ke}</span>`:""}
        ${J?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${J?l`<div class="sv__sub-body">
            ${ye(te.lines).map(we=>we.kind==="group"?ce(we):ge(we.idx,we.line))}
          </div>`:""}
    </div>`}function De(te){$.add(te),le()}function le(){Ve(ee(),e),H(),b&&ze()}function ze(){let te=e.querySelector(".sv__body");te&&(te.scrollTop=te.scrollHeight)}function P(te){w.has(te)?w.delete(te):w.add(te),le()}function ue(){b=!b,le()}function Me(te){cn(te).then(J=>{J?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function qe(te){!o||!te||(p={...p,...te},le())}function Le(te){let J=te.target;if(!J||!J.classList||!J.classList.contains("sv__body"))return;!(J.scrollHeight-J.scrollTop-J.clientHeight<=4)&&b&&(b=!1,le())}e.addEventListener("scroll",Le,!0);function We(te){let J=te.target;!J||typeof J.closest!="function"||e.contains(J)||J.closest("dialog")||J.closest(".md-viewer-root")||_t()}let je=!1;function Ye(){je||(document.addEventListener("mousedown",We),je=!0)}function tt(){je&&(document.removeEventListener("mousedown",We),je=!1)}function ct(te){let J=te&&te.attempt_id;if(!J)return;let Ce=i;o=J,a=typeof te.launch_id=="string"&&te.launch_id.length>0?te.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Ce&&Ce!==i&&Promise.resolve(n("unsubscribe-session-log",{id:Ce})).catch(()=>{}),c=typeof te.root_dir=="string"&&te.root_dir.length>0?te.root_dir:null,p=te.meta||{},d=te.hide_prompt===!0,b=!0,w.clear(),$.clear(),D(),!E&&r&&(E=r.subscribe(le)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),Ye(),le()}function _t(){let te=i;tt(),o=null,a=null,i=null,c=null,d=!1,w.clear(),$.clear(),D(),X(),n&&te&&Promise.resolve(n("unsubscribe-session-log",{id:te})).catch(()=>{}),Ve(l``,e),s&&s()}return{open:ct,updateMeta:qe,close:_t,isOpen(){return o!==null},destroy(){X(),tt(),E&&(E(),E=null),e.removeEventListener("scroll",Le,!0),o=null,a=null,i=null,c=null,d=!1,Ve(l``,e)}}}function Eo(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=wi(t.spec_id),s=wi(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function wi(e){return typeof e=="string"?e.trim():""}function Iu(e){let t=Eo(e);if(t.path)return t;let n=wi(vg(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function vg(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function wg(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function kg(e){let t=e&&e.metadata||{},n=Iu(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:wg(t)?null:"plan_pending"}),r}function Pu(e,t){let n=kg(e);return l`
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
  `}var $g="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",xg=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Ag=/^\*\*결론\*\* — (.+)$/;function To(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==$g)return null;let n=xg.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Ag.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:c,body:t.slice(d).join(`
`).trim()}}var Du=20;function Mu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Sg(e){return e.length>Du?`${e.slice(0,Du)}\u2026`:e}function Eg(e,t,n,r){let s=`${t.lane} ${Sg(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Mu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?l`<div class="detail-report__body">
          ${Kn(t.body)}
        </div>`:""}
  </div>`}function Tg(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Mu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Kn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Nu(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((c,d)=>String(d.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let d=To(typeof c.text=="string"?c.text:"");return d?Eg(c,d,t,s.has(c.id)):Tg(c)})}
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
  `}var{I:ik}=Jl;var qu=e=>e.strings===void 0;var Cg={},Fu=(e,t=Cg)=>e._$AH=t;var mr=bo(class extends Mr{constructor(e){if(super(e),e.type!==Fn.PROPERTY&&e.type!==Fn.ATTRIBUTE&&e.type!==Fn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!qu(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===_n||t===Lt)return t;let n=e.element,r=e.name;if(e.type===Fn.PROPERTY){if(t===n[r])return _n}else if(e.type===Fn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return _n}else if(e.type===Fn.ATTRIBUTE&&n.getAttribute(r)===t+"")return _n;return Fu(e),t}});var Co=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],$i=[...Co.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Un=["orchestration_model","orchestration_effort","orchestration_speed"],Ro=[...Co,...Un],Rg=$i.filter(e=>Ro.includes(e)),ju=["delegated","main"],Oo=["inherit","claude","codex"],gs=["default","fast"],bs=["standard","fast_track"],hs=["codex","opus","fable","self","skip"],Lo=["codex","fable","skip"],Io=["low","medium","high","xhigh"],dn="auto";function un(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Bu(e){if(!un(e)||!un(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))un(r)&&un(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Fr(e,t){let n=Bu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[dn,...r.flatMap(([,s])=>s)]}function Uu(e,t,n,r){if(!un(e)||!un(e.runners))return[dn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!un(a)||!un(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(n&&n!==dn&&i!==n)continue;let d=r(a,c);if(Array.isArray(d))for(let p of d)typeof p=="string"&&!s.includes(p)&&s.push(p)}return[dn,...s]}function jr(e,t,n){return Uu(e,t,n,(r,s)=>un(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function xi(e,t,n){return Uu(e,t,n,(r,s)=>un(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:un(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function ys(e,t){let n=Bu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Wu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Fr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!jr(t,s,r.impl_model||dn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Og={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ki=[...Rg,...Un],Lg=[...Ro,...$i].filter((e,t,n)=>n.indexOf(e)===t&&!ki.includes(e));function zu(e,t){let n=un(e)?e:{},r=un(t)?t:{},s=[];for(let a of ki){let i=n[a]??null,c=r[a]??null;i!==c&&s.push({key:a,label:Og[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...Lg,...Object.keys(r)])!ki.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Ai(e,t,n,r,s,o){return uo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Hu(e,t){let n={};for(let r of $i){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Gu(e,t){let n={};for(let r of Un){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Si=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Un]}],Yn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Po={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Ei(e,t,n,r,s,o=null){let a=rn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Vu(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of Ei(e,t,n,r,s,o))a[i.source]+=1;return a}function Ku(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Yu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var hk=[...Co,...Un];var Ig=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Ti={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Zu={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Pg={pin:"pin",global:"global",base:"base"};function Dg(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${Pg[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Mg(e,t,n){switch(e){case"workflow_mode":return bs;case"spec_review_model":case"impl_review_model":return hs;case"plan_review_model":return Lo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Io;case"impl_dispatch":return ju;case"impl_runtime":return Oo;case"impl_model":return Fr(n,t.impl_runtime);case"impl_effort":return jr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return gs;case"orchestration_model":return ys(n,null);case"orchestration_effort":return jr(n,void 0,t.orchestration_model||dn).filter(r=>r!==dn);default:return[]}}function Ng(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${Dg(e.source)}
    <span class="detail-effective__k"
      >${Yn[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Po[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Yn[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Xu(e,t){let n=Si.flatMap(c=>c.keys),r=Ei(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Vu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(c=>[c.key,c])),a=Object.fromEntries(r.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=r.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return l`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${c=>t.onToggle(c.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${c=>{c.preventDefault();let d=c.currentTarget.parentElement;t.onToggle(!d.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${qg(o)}</span
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
          ${Si.map(c=>l`
              <div class="detail-effective__subhead">${c.label}</div>
              ${r.filter(d=>c.keys.includes(d.key)).map(d=>{let p=uo({key:d.key,choices:Mg(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Ng(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${mr(e.preset_id)}
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
  </details>`}function qg(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Fg(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Qu(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=Fg(n.exec_receipt),c=i?Dn(i):a,d=i?`${i.kind}:${i.actor}`:a.split("@")[0],p=lo(n.planned_execution,n.exec_receipt),b=n.chips?.pr?.number,w=typeof b=="number"?`PR #${b}`:"PR";return l`<section class="detail-summary" data-seam="detail-summary">
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
            >${w}</a
          >`:""}
      ${p?l`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
          >`:""}
      ${c?l`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${c}
            >${d}${i?.effort?l`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${jg(s).map($=>Bg($,t,r,{label:$.id==="pr"?w:$.label,href:$.id==="pr"?o:""}))}
    </div>
  </section>`}function jg(e){let n=typeof e=="string"&&Object.hasOwn(Ti,e)&&Ti[e]||Ti.spec_backed;return Ig.filter(r=>n.includes(r.id))}var Do={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Bg(e,t,n,r){let s=Ug(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,c=!i&&a==="dim",d=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,p=s&&s.split("@")[1]?.slice(0,7)||"",b=d?Do.stale:i?Do.on:c?Do.current:Do.none,w=Wg(e,n),$=`${r.label} \xB7 ${b}${w?` \xB7 ${w}`:""}${s?` \xB7 ${s}`:""}`,E=`detail-summary__gate${i?" detail-summary__gate--on":""}${c?" detail-summary__gate--current":""}${d?" detail-summary__gate--stale":""}${p?" detail-summary__gate--receipt":""}`,N=l`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${p}</span>`;return r.href?l`<a
      class=${E}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${$}
      >${N}</a
    >`:l`<span
    class=${E}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${$}
    >${N}</span
  >`}function Ug(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Wg(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Zu,n)?Zu[n]:""}function Mo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ju(e){return Mo(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function ed(e,t){let n=e&&e[t];if(!Mo(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Ju),s=Ju(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function rd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function No(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${rd(e)}${t}`}function Br(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${rd(e)}`}function zg(e,t,n){if(n!==null){let s=e==="claude"?No:Br,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Br({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function td(e,t){if(!Mo(e)||e.state!=="usable"||!Mo(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function nd(e){let t=e.provider_key==="claude"?No:Br,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${zg(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function sd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${nd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:ed(t,"claude"),selected:s,workspace_default:td(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${nd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:ed(t,"codex"),selected:o,workspace_default:td(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var od=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function vs(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function qo(e){if(!vs(e)||!vs(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>vs(n)&&vs(n.models));return t.length>0?t:null}function $n(e,t){let n=qo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function ad(e,t){return vs(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function id(e,t){let n=qo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return ad(r,r.models[t]);return[]}function Hg(e){let t=qo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of ad(r,s))n.includes(o)||n.push(o);return n}function Gg(e,t){if(!t)return Hg(e);let r=qo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of id(e,o))s.includes(a)||s.push(a);return s}function ld(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=$n(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?id(t,r.impl_model):Gg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function Vg(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Kg(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Fo(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function d(N){N.key==="Escape"&&s&&(N.preventDefault(),$())}document.addEventListener("keydown",d);function p(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>$()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Vg(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>$()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${c}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:l`${i===null?null:l`<pre class="mv__front">
${i}</pre
                        >`}${Kn(a)}`}
          </div>
        </div>
      </div>
    `:l``}function b(){Ve(p(),e)}async function w(N,j={}){s=N,o="loading",a="",i=null,c="",b();let Y=j.workspace||(n?n():"");if(!Y){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",b();return}if(!r){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",b();return}let ie="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(N);try{let z=await r(ie),q=await z.json().catch(()=>({}));if(!z.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&j.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",b();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||z.status)+")",b();return}let D=Kg(String(q.content||""));i=D.front,a=D.body,o="ready",b()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",b()}}function $(){s=null,Ve(l``,e)}function E(){document.removeEventListener("keydown",d),$()}return{open:w,close:$,destroy:E}}var Yg=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],dd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",jo=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Zg=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function cd(e){return typeof e=="string"&&Zg.has(e)}var Xg=["running","done","failed","interrupted"],Qg={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Jg(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function eb(e){let t=Wt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Dr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${dd}
          >부분 집계</span
        >`:""}`}function ud(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Oi(e){if(typeof e=="number")return Bo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Bo(t):""}function tb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function nb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ci(e){return e===null||typeof e=="string"&&e.trim().length>0}function Ri(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function rb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!jo.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Ci(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ci(t.effort))||!(!("agent_type"in t)||Ci(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Xg.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Ri(t.started_at)||!Ri(t.last_event_at)||!Ri(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function sb(e,t,n){let s=Wt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Oi(n.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${Oi(n.completed_at)}</span
        >`:""}
    ${s?l`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function ob(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Wt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Bo(e.last_event_at):s?Oi(s.completed_at):"",c=(e.provider==="claude"?["Claude",e.agent_type,tb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=nb(e,s);return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Qg[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${c}</span
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
  </button>`}function ab(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function ib(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let b=rb(p);!b||s.has(b.launch_id)||cd(b.agent_type)||(s.add(b.launch_id),r.push(b))}r.sort((p,b)=>(p.started_at||0)-(b.started_at||0));let a={};for(let{role:p,provider:b}of jo){let w=t?t.roles[p]?.[b]:null;a[p]=w?[...w.legs]:[]}let i=jo.flatMap(({role:p})=>a[p]),c=new Set,d=[];for(let{role:p,provider:b}of jo){for(let w of r.filter($=>$.role===p&&$.provider===b)){let $=i.find(E=>E.receipt_id===w.launch_id)||null;$&&!ab(w,$)||($&&c.add($.receipt_id),d.push(ob(w,$,e.attempt_id,n)))}for(let w of a[p])!c.has(w.receipt_id)&&!cd(w.agent_type)&&d.push(sb(p,b,w))}return d}function lb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Yg,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${r.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Jg(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${dd}</span>`:""}
  </div>`}var cb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Bo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function ub(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function pd(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of r)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let b=typeof d.session_id=="string"&&d.session_id.length>0,w=o.has(d.attempt_id),$=b&&!w,E=b?w?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!$}
      title=${E}
      @click=${N=>{N.stopPropagation(),$&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let b=d.cause_detail,w=b&&typeof b.reason=="string"&&b.reason.length>0?typeof b.command=="string"&&b.command.length>0?`${b.reason} \xB7 ${b.command}`:b.reason:d.cause;return l`<div class="detail-session__cause" title=${w}>
      ${d.cause}
    </div>`},c=d=>{let p=ud(Ka(d));if(Wt(p).length===0&&!Dr(d.usage))return"";let b=s.has(d.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${b?"true":"false"}
      title=${b?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${w=>{w.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${eb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(d=>{let p=Ka(d),b=ud(p),w=Wt(b);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${cb[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${ns(d)?l`<span
                  class="detail-session__resumed"
                  title=${ns(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${pr(d)}</span>
            ${w.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?l`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${w.length>0?w.map($=>l`<span
                      class="detail-session__usage"
                      title=${$.tooltip}
                      >${$.label}</span
                    >`):Dr(d.usage)?l`<span class="detail-session__usage"
                    >${Dr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Bo(d.started_at)}</span>
          </button>
          ${c(d)} ${a(d)} ${i(d)} ${ub(d)}
          ${s.has(d.attempt_id)&&d.usage?lb(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${ib(d,p,t)}
        </div>`})}
    </div>
  `}function fd(e,t={}){return l`
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
          ${db(e)}
        </div>`:""}
  `}function db(e){let t=Nr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Bn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Ao(n.recorded_at);return l`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Bn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Bn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var pb=["open","in_progress","deferred","resolved","closed"],fb=[0,1,2,3,4];function _d(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,d=null,p=null,b={},w="",$=!1,E=[],N=!1,j={},Y={claude:null,codex:null},ie=null,z=null,q=0,D=!1,U=!1,S="",M="",re="";function Ae(){D=!1,U=!1,S="",M="",re=""}function be(){Y={claude:null,codex:null},ie=null,z=null,q+=1}async function H(){if(!s)return null;try{let m=await Promise.resolve(s("get-workspace-accounts",{}));return m&&typeof m.state=="string"?m:null}catch{return null}}async function X(m){try{let A=await fetch(m);if(!A.ok)return null;let u=await A.json();if(!u||typeof u!="object"||!Array.isArray(u.accounts))return null;let f=u.accounts.filter(v=>v!==null&&typeof v=="object"&&!Array.isArray(v));return{accounts:f,active:f.find(v=>v.active===!0)||null}}catch{return null}}async function ye(m){z=m;let A=++q,[u,f,v]=await Promise.all([X("/api/claude-usage"),X("/api/codex-usage"),H()]);A!==q||m!==d||(Y={claude:u,codex:f},ie=v,y())}let ke=[],he=null,se=null,xe=!1,ge="",V=!1,ee=0,ce=new Set;function ve(){ke=[],he=null,se=null,xe=!1,ge="",V=!1,ee+=1,ce.clear()}async function De(m){if(!s)return;let A=++ee;try{let u=await Promise.resolve(s("get-comments",{id:m}));if(A!==ee||m!==d)return;ke=Array.isArray(u)?u:[],xe=!1}catch{if(A!==ee||m!==d)return;xe=!0}y()}function le(){if(!s||!d)return;let m=p&&typeof p.comment_count=="number"?p.comment_count:null;if(he!==d){he=d,se=m,De(d);return}m!==null&&m!==se&&(se=m,De(d))}function ze(m){ce.has(m)?ce.delete(m):ce.add(m),y()}function P(m){let A=ge.trim().length===0;ge=m,A!==(m.trim().length===0)&&y()}async function ue(){let m=ge.trim();if(!s||!d||m.length===0||V)return;let A=d;V=!0,y();let u=!1;try{let f=await Promise.resolve(s("add-comment",{id:A,text:m}));Array.isArray(f)&&f.length>0&&(u=!0,A===d&&(ke=f,xe=!1,ge="",se=f.length))}catch{u=!1}u||ae("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),A===d&&(V=!1),y()}let Me={onToggle:ze,onDraftInput:P,onSubmit:ue},qe=t.mdViewer||null,Le=null;qe||(Le=document.createElement("div"),Le.className="md-viewer-root",document.body.appendChild(Le));let We=qe||Fo(Le,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),je=document.createElement("div");je.className="session-log-root",document.body.appendChild(je);let Ye=qr(je,{transport:s?(m,A)=>Promise.resolve(s(m,A)):void 0,sessionLogStore:c}),tt=!1,ct=!1,_t=!1,te=null,J=null,Ce=0;function Ke(m){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${m}`}function Oe(){tt=!1,ct=!1,_t=!1,te=null,J=null,Ce+=1}async function we(m){if(!s)return;let A=++Ce;ct=!0,_t=!1,y();try{let u=await Promise.resolve(s("get-bead-prompt",{bead_id:m}));if(A!==Ce)return;!u||typeof u!="object"||Array.isArray(u)?_t=!0:(te=u,J=Ke(m))}catch{A===Ce&&(_t=!0)}finally{A===Ce&&(ct=!1,y())}}function Be(){if(tt=!tt,tt&&d&&J!==Ke(d)){te=null,we(d);return}y()}function Ge(){if(!a||!d)return[];let m=a.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter(u=>u&&u.bead_id===d).sort((u,f)=>(f.started_at||0)-(u.started_at||0)).map(u=>({attempt_id:u.attempt_id,bead_id:u.bead_id,status:u.status,started_at:typeof u.started_at=="number"?u.started_at:null,runner:u.runner||null,model:u.model||null,effort:u.effort||u.observed_effort||null,speed:u.speed||null,session_id:u.session_id||null,resumed_from:u.resumed_from||null,continuation_mode:u.continuation_mode||null,dismissed_at:typeof u.dismissed_at=="number"?u.dismissed_at:null,cause:typeof u.cause=="string"?u.cause:null,cause_detail:u.cause_detail||null,exec_default_preset_id:typeof u.exec_default_preset_id=="string"?u.exec_default_preset_id:null,exec_default_preset_revision:typeof u.exec_default_preset_revision=="number"?u.exec_default_preset_revision:null,exec_values:u.exec_values&&typeof u.exec_values=="object"?u.exec_values:null,usage:u.usage||null,usage_legs:Array.isArray(u.usage_legs)?u.usage_legs:[],delegation_sessions:Array.isArray(u.delegation_sessions)?u.delegation_sessions:[]}))}function Qe(){if(!a||!d)return null;let m=a.get();return mn(m&&m.attempts||{},d)}let Ze=new Set;function rt(m){Ze.has(m)?Ze.delete(m):Ze.add(m),y()}function yt(m){let A=a?a.get():null,u=A&&A.attempts?A.attempts[m]:null;Ye.open({attempt_id:m,meta:u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}})}function Et(m,A){let u=a?a.get():null,f=u&&u.attempts?u.attempts[m]:null,x=(f&&Array.isArray(f.delegation_sessions)?f.delegation_sessions:[]).find(B=>B&&typeof B=="object"&&B.launch_id===A);x&&Ye.open({attempt_id:m,launch_id:A,meta:{runner:x.provider==="claude"?"claude":"codex",role:x.role,...typeof x.agent_type=="string"?{agent_type:x.agent_type}:{},model:x.model,effort:x.effort,session_id:x.session_id,status:x.status}})}async function it(m){if(!s||!m)return;let A=await Ir();if(A===null)return;let u=()=>{let B=a?a.get():null;return B&&typeof B.revision=="number"?B.revision:0},f=async(B={},W=u())=>await s("worker-attempt-resume",{attempt_id:m,expected_revision:W,...A!==""?{instructions:A}:{},...B}),v=B=>{B?.queue&&a?.set&&a.set(B.queue)},x=await f();if(v(x),x&&x.conflict){let B=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:u();x=await f({},B),v(x)}x=await Mn(x,(B,W)=>f({continuation:B,decision_token:W}),{onResult:v,refresh:()=>f()}),x&&x.resumed===!1&&!x.conflict&&x.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}let Ot={onOpen:yt,onOpenDelegation:Et,onResume:it,onToggleUsage:rt};function ut(){let m=a?a.get():null,A={...j};for(let u of["orchestration_model","orchestration_effort","orchestration_speed"]){let f=m&&m[u];typeof f=="string"&&(A[u]=f)}return A}async function He(){if(s){try{let m=await Promise.resolve(s("get-session-defaults",{}));j=m&&m.values&&typeof m.values=="object"?m.values:{}}catch{j={}}y()}}function Re(){let m=a?a.get():null;return m&&m.runner_catalog||null}function I(){let m=a?a.get():null;return m&&typeof m.execution_defaults=="object"?m.execution_defaults:null}function K(){let m=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},u=rn({pin:{...m,...b},global:ut(),execution_defaults:I(),runner_catalog:Re(),route:typeof m.route=="string"?m.route:null}).orchestration_model.value||"";return $n(Re(),u)}function pe(){let m=i?i.get():null;return!m||typeof m.revision!="number"?null:{revision:m.revision,presets:Array.isArray(m.presets)?m.presets:[]}}function C(m){return m?.compatible===!1}function G(m){i&&m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&i.set({revision:m.revision,presets:m.presets})}async function fe(){let m=pe(),A=m?.presets.find(u=>u.id===w);if(!(!s||!d||!m||!A||C(A)||$)){$=!0,E=[],y();try{let u=await Promise.resolve(s("apply-impl-preset",Yu(d,A.id,m.revision)));if(u&&u.conflict){G(u),ae("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let f=u&&Array.isArray(u.issue)?u.issue[0]:u?.issue;if(u&&u.applied&&f&&typeof f=="object"){p=f,E=Array.isArray(u.skipped_orchestration_keys)?u.skipped_orchestration_keys.filter(v=>typeof v=="string"):[];for(let v of od)delete b[v];ae(E.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}u&&u.error==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(u){u&&typeof u=="object"&&u.code==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{$=!1,y()}}}let g=null;n&&n.subscribe&&(g=n.subscribe(()=>Z()));let k=null;a&&typeof a.subscribe=="function"&&(k=a.subscribe(()=>{d&&y()}));let O=null;i&&typeof i.subscribe=="function"&&(O=i.subscribe(()=>{d&&y()}));function Q(m){m.key==="Escape"&&d&&(m.preventDefault(),r())}document.addEventListener("keydown",Q);function Z(){if(d){if(n&&typeof n.snapshotFor=="function"){let m=n.snapshotFor("detail:"+d)||[];p=m.find(u=>u&&u.id===d)||m[0]||p}le(),y()}}function _e(m){cn(m).then(A=>{A?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Te(m){m.preventDefault(),m.stopPropagation(),d&&_e(d)}function $e(m,A){m.preventDefault(),m.stopPropagation(),_e(A)}function st(m,A,u){m.preventDefault(),m.stopPropagation(),We.open(A,{missing_state:u})}function dt(m,A){b[m]=A,y(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",Ku(d,m,A.length===0?null:A))).catch(()=>{ae("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Se(m,A){let u=p||{},f=u.metadata&&typeof u.metadata=="object"?u.metadata:{},v={};for(let W of["impl_runtime","impl_model","impl_effort"])v[W]=Object.hasOwn(b,W)?b[W]:typeof f[W]=="string"?f[W]:"";v[m]=A;let x=ld(v,Re(),K()),B={};for(let W of["impl_runtime","impl_model","impl_effort"])B[W]=b[W],b[W]=x[W]||"";y(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...x,orchestration_runtime:K()})).then(W=>{let ne=Array.isArray(W)?W[0]:W;if(!ne||typeof ne!="object"||!ne.id)throw new Error("implementation target readback failed");p=ne;for(let me of["impl_runtime","impl_model","impl_effort"])delete b[me];y()}).catch(()=>{for(let W of["impl_runtime","impl_model","impl_effort"])B[W]===void 0?delete b[W]:b[W]=B[W];y(),ae("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function bt(m,A,u){if(!s||!d)return!1;try{let f=await Promise.resolve(s(m,A)),v=Array.isArray(f)?f[0]:f;return v&&typeof v=="object"&&v.id?(p=v,!0):(ae(u,"error"),!1)}catch{return ae(u,"error"),!1}}function gt(m){setTimeout(()=>{try{let A=e.querySelector(m);A&&typeof A.focus=="function"&&A.focus()}catch{}},0)}function Ft(){D=!0,S=p&&p.title||"",y(),gt('.detail-edit__input[data-edit="title"]')}function Gt(m){S=m.target.value}function Nt(){D=!1,S="",y()}function Dt(){bt("edit-text",{id:d,field:"title",value:S},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(A=>{A&&(D=!1,S=""),y()})}function pn(){U=!0,M=p&&p.description||"",y(),gt('.detail-edit__textarea[data-edit="description"]')}function At(m){M=m.target.value}function Mt(){U=!1,M="",y()}function Ue(){bt("edit-text",{id:d,field:"description",value:M},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(A=>{A&&(U=!1,M=""),y()})}function Xt(m,A,u,f){if(m.key==="Escape"){m.stopPropagation(),u();return}m.key==="Enter"&&(!f||m.ctrlKey||m.metaKey)&&(m.preventDefault(),A())}function Qt(m){let A=m.target.value;bt("update-status",{id:d,status:A},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function et(m){let A=Number(m.target.value);bt("update-priority",{id:d,priority:A},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function Ie(m){re=m.target.value}function R(){let m=re.trim();m.length!==0&&bt("label-add",{id:d,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(A=>{A&&(re=""),y()})}function de(m){if(m.key==="Escape"){m.stopPropagation(),re="",y();return}m.key==="Enter"&&(m.preventDefault(),R())}function Ee(m){bt("label-remove",{id:d,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>y())}let ot={onCopyPath:$e,onOpenDoc:st};function vt(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function pt(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Rt(m){let u=(Array.isArray(m.dependencies)?m.dependencies:[]).map(f=>({id:vt(f),icon:pt(f)})).filter(f=>f.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${u.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${u.map(f=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(f.id)}
                  >
                    ${f.icon?`${f.icon} `:""}${f.id}
                  </button>`:l`<span class="detail-dep"
                    >${f.icon?`${f.icon} `:""}${f.id}</span
                  >`)}
          </div>`}
    `}function It(m){let A=m.metadata||{},u=m.workflow||{},f=u.stages||{},v=f.spec&&f.spec.stale,x=f.impl&&f.impl.stale,B=u.quick_fix_review?.state==="stale",W=f.plan||null,ne=u.route_source==="derived",me=u.route||A.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ne?" detail-kv__v--derived":""}"
          title=${ne?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ne?"unset":me}</span
        >
      </div>
      ${u.route!=="quick_fix"||Object.hasOwn(A,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${A.spec_review||"\uC5C6\uC74C"}${v?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${u.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${W?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${W?.approval_receipt||"\uC5C6\uC74C"}${W?.approval_state==="stale"?" \xB7 stale":W?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${u.route!=="quick_fix"||Object.hasOwn(A,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${A.impl_review||"\uC5C6\uC74C"}${x?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${u.resolver?l`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${u.resolver.attempt} \xB7 ${u.resolver.prior_sha} \u2192 ${u.resolver.sha}`}
              >${`${u.resolver.prior_sha.slice(0,7)} \u2192 ${u.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${u.route==="quick_fix"||Object.hasOwn(A,"quick_fix_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${A.quick_fix_review||"\uC5C6\uC74C"}${B?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${u.planned_execution?l`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${u.planned_execution.kind}</span>
            </div>
            ${u.planned_execution.kind==="main"?l`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${u.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${u.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Dn(u.exec_receipt)}</span
            >
          </div>`:""}
      ${u.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${u.impl_entry.actor}@${u.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${A.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${A.pr_url}</span>
          </div>`:""}
    `}let Ht={route:["quick_fix","spec_backed","full_plan"]};async function Jt(m,A){let u=A.target.value;if(m==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&u!=="full_plan"&&!window.confirm(`full_plan \u2192 ${u||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){y();return}await bt("update-workflow-meta",{id:d,key:m,value:u},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),y()}function wt(m){let A=m.metadata||{};return l` ${((f,v)=>{let x=Ht[f],B=typeof A[f]=="string"?A[f]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${f}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${f}
          data-edit=${`wfmeta-${f}`}
          @change=${W=>Jt(f,W)}
        >
          <option value="" ?selected=${!x.includes(B)}>
            ${v}
          </option>
          ${x.map(W=>l`<option value=${W} ?selected=${B===W}>${W}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function en(m,A){return D?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${S}
            @input=${Gt}
            @keydown=${u=>Xt(u,Dt,Nt,!1)}
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
              @click=${Nt}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${m}</h2>
        ${Wt(A).map(u=>l`<span class="detail-usage-total" title=${u.tooltip}
              >${u.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ft}
        >
          ✎
        </button>
      </div>
    `}function fn(m){let A=Ut(m.created_at),u=Ut(m.updated_at);return!A&&!u?l``:l`
      ${A?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
      ${u?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${u}</span>
          </div>`:""}
    `}function Ln(m,A){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Qt}
        >
          ${pb.map(u=>l`<option value=${u} ?selected=${u===m}>${u}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${et}
        >
          ${fb.map(u=>l`<option value=${String(u)} ?selected=${u===A}>
                P${u}
              </option>`)}
        </select>
      </div>
    `}function T(m){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${U?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${pn}
            >
              ✎
            </button>`}
      </div>
      ${U?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${M}
              @input=${At}
              @keydown=${A=>Xt(A,Ue,Mt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ue}
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
            ${m||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function L(m){let A=typeof m.notes=="string"?m.notes:"";return A.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${A}</div>
    `}function Pe(m){let A=Array.isArray(m.labels)?m.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${A.map(u=>l`<span class="detail-label-chip"
              >${u}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${u}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+u}
                @click=${()=>Ee(u)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${re}
            @input=${Ie}
            @keydown=${de}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${R}
          >
            추가
          </button>
        </span>
      </div>
    `}function _(){if(!d)return l``;let m=p||{},A=String(m.id||d),u=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",f=Qe(),v=m.status||"open",x=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",B=m.description||"",W={...m,metadata:{...m.metadata||{},...b}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Te}
            >
              ${A}
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
          ${en(u,f)}
          ${Qu(W)}
          ${Xu({metadata:W.metadata,workspace_values:ut(),catalog:Re(),execution_defaults:I(),expanded:N,presets:pe()?.presets||[],preset_id:w,preset_busy:$,skipped_orchestration_keys:E},{onToggle:ne=>{N=ne,y()},onEdit:(ne,me)=>{if(ne==="impl_runtime"||ne==="impl_model"||ne==="impl_effort"){Se(ne,me??"");return}dt(ne,me??"")},onPresetSelect:ne=>{w=ne,E=[],y()},onPresetApply:()=>{fe()}})}
          ${sd({md:W.metadata,catalog:Y,workspace_defaults:ie,handlers:{onExecChange:dt}})}
          ${Ln(v,x)} ${fn(m)}
          ${T(B)}
          ${Nu(ke,Me,{expanded:ce,draft:ge,sending:V,error:xe})}
          ${L(m)} ${Pe(m)} ${Rt(m)}
          ${It(m)} ${wt(m)}
          ${Pu(m,ot)}
          ${fd({expanded:tt,loading:ct,error:_t,data:te},{onToggle:Be})}
          ${pd(Ge(),Ot,{total:f,expanded:Ze})}
        </div>
      </div>
    `}function y(){Ve(_(),e)}return{load(m){m!==d&&(b={},w="",E=[],N=!1,Ae(),ve(),Oe(),be()),d=m,p=null,Z(),He(),z!==m&&ye(m)},clear(){d=null,p=null,b={},w="",$=!1,E=[],N=!1,Ae(),ve(),Oe(),be(),We.close(),Ye.close(),Ve(l``,e)},destroy(){g&&(g(),g=null),k&&(k(),k=null),O&&(O(),O=null),document.removeEventListener("keydown",Q),qe||(We.destroy(),Le&&Le.parentNode&&Le.parentNode.removeChild(Le)),Ye.destroy(),je.parentNode&&je.parentNode.removeChild(je),d=null,p=null,be(),w="",$=!1,E=[],ve(),Oe(),Ve(l``,e)}}}function md(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(d,p,b="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let w=typeof b=="string"?b.trim():"";if(s&&(w.length>0?(s.textContent=w,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Uo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ks(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function Wo(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function zo(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function Ho(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function _b(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:Uo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function gd(e,t){let n=_b(e,t);return n?l`<button
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
            title=${n.deploy.at?Ut(n.deploy.at):""}
            >${Ho(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${ks(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Ur(e){let t=ln(e.created_at),n=ln(e.updated_at);return!t&&!n?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${Ut(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?l`<span>·</span>`:""}${n?l`<span title=${`\uC218\uC815 ${Ut(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function mb(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function $s(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Go(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function xn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(b=>b&&b.bead_id===t&&b.phase!=="done").sort((b,w)=>(b.requested_at||0)-(w.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?mb(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:p}}function ws(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return l`<div
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
  </div>`}var gb={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function bd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let c=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:gb[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Vo(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function bb(e){return l`<div
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
  </div>`}function Ko(e,t={}){if(!e)return"";let n=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.overlaps)?e.overlaps:[],s=e.scope_missing===!0&&t.lane!=="running",o=e.popover||null,a=e.cross_lane||null;return n.length===0&&r.length===0&&!s&&!a?"":l`<div class="worker-deps">
    ${a?l`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${a.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${a.label}
        </button>`:""}
    ${n.map(i=>l`<span
          class=${`worker-dep worker-dep--pred${i.foreign?" worker-dep--foreign":""}`}
          title=${i.title||""}
          ><button
            type="button"
            class="worker-dep__label worker-dep__open"
            data-dep-id=${i.id}
          >
            ${i.label}
          </button></span
        >`)}${r.map(i=>l`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${i.id}
          aria-label=${`scope \uACB9\uCE68 ${i.id} (${i.location_label})`}
          title=${[`\uACB9\uCE68 ${i.id} (${i.location_label})`,...i.prefixes].join(`
`)}
        >
          ⧉ ${i.id}
        </button>`)}${s?l`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${o?bb(o):""}
  </div>`}function Yo(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?l`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function hb(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return l`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function hd(e){return e?l`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Zo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return l`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function yb(e){let t=Array.isArray(e.badges)?e.badges:[],n=Wt(e.usage),r=Nn(e.usage),s=ln(e.done_at);return l`<div
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
            title=${`\uC644\uB8CC ${Ut(e.done_at)}`}
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
              >`):r?l`<span class="worker-usage" title=${ss(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?l`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${ks(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Zn(e){if(e.lane==="done"&&e.done_layout==="three_line")return yb(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Wt(e.usage),s=Nn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?ln(e.done_at):"",d=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",b=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",w=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,E=e.lane==="done"?"":Yo(e.workflow),N=e.lane==="done"?"":hd(e.from_id),j=Zo(e.priority),Y=l`<span class="worker-mini__title">${e.title}</span>`,ie=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",z=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",q=n.map(ce=>ce===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ce}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ce===e.completion_badge&&e.completion_title||""}
          >${ce}</span
        >`),D=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",U=r.length>0?r.map(ce=>l`<span class="worker-usage" title=${ce.tooltip}
              >${ce.label}</span
            >`):s?l`<span class="worker-usage" title=${ss(e.usage)}
            >${s}</span
          >`:"",S=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",M=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",re=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Ae=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",be=e.discard,H=be?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${be?.attempt_id||""}
          data-operation-id=${be?.operation?.operation_id||""}
          data-discard-mode=${be?.confirmation||"unmerged"}
          ?disabled=${be?!be.enabled:e.discard_enabled===!1}
          title=${be?be.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${be?.label||"\uD3D0\uAE30"}
        </button>`:"",X=e.stale_work||null,ye=X?l`${X.can_resume||X.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${X.action_id}
            ?disabled=${X.locked}
          >
            기존 작업 이어가기
          </button>`:""}${X.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${X.action_id}
            ?disabled=${X.locked}
          >
            백업 후 새로 시작
          </button>`:""}${X.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${X.action_id}
            ?disabled=${X.locked}
          >
            다시 확인
          </button>`:""}`:"",ke=X?l`<div class="worker-mini__stale">
        <strong>${X.title}</strong>
        <span>${X.summary}</span>
        <span>${X.cause}</span>
        ${X.can_backup_fresh?l`<small
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
        </button>`:"",se=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),xe=w||E||N||se||U?l`<div class="worker-chips">
          ${w}${E}${N}${se?Vo(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${U}
        </div>`:"",ge=Ko(e.dependency_chips,{lane:e.lane}),V=ws(e),ee=!!(o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||be?.operation||e.revise_action||X);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">
            ${w}${$}${j}${N}${Y}
          </div>
          <div class="worker-mini__row2">
            ${U}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Ut(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${ks(e.work_ms)}</span
                >`:""}${q}${S}
            <span class="worker-mini__actions"
              >${M}${re}${Ae}${H}</span
            >
            ${Ur(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${d}${p}${$}${j}${ie}${z}${q}${b}${D}
            </div>
            <div class="worker-mini__body">${Y}${ke}</div>
            ${ge}${xe}${ee?l`<div class="worker-mini__foot">
                  ${S}
                  <span class="worker-mini__actions"
                    >${M}${re}${Ae}${H}${he}${ye}</span
                  >
                  ${ws(e)}
                </div>`:""}
            ${Ur(e)}`:l`<div class="worker-mini__line">
              ${d}${p}${$}${j}${Y}${ie}${z}${q}${b}${D}${S}${M}${re}${Ae}${H}
            </div>
            ${ge}${xe}${V} ${Ur(e)}`}
  </div>`}function vb(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(l`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(l`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?l`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return l`${r}`}function Li(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),c=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),d=Ko(e.dependency_chips,{lane:e.lane}),p=e.workspace_name?l`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=Yo(a),w=hd(e.from_id),$=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return l`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?l`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Zo(e.priority)}
      ${r?l`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:""}${hb(a)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?ao(a,e.status,{onOpenDoc:n.onOpenDoc}):""}${d}
    ${p||b||w||$?l`<div class="worker-chips">
          ${p}${b}${w}${Vo(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason||n.dep_action===!0?"":" worker-card__foot--actions-only"}"
    >
      ${o?l`<div class="worker-card__place-menu">
            ${vb(t.lanes,e.id)}
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
              대기로 ↴</button
            >${n.dep_action===!0?l`<button
                  type="button"
                  class="worker-card__dep mon-dep__btn"
                  data-bead-id=${e.id}
                  title="의존성"
                  aria-label="의존성"
                >
                  ⛓
                </button>`:""}`}
    </div>
    ${Ur(e)}
  </div>`}function bn(e){let t=!!e.collapsible&&!!e.collapsed,n=l`<span
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?Li(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Zn(r))}
          </div>`}
  </section>`}var yd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},vd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function wd(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ii(e){for(let t of wd(e))if(Object.hasOwn(yd,t))return yd[t];return null}function Pi(e){let t=null;for(let n of wd(e))Object.hasOwn(vd,n)&&(t=vd[n]);return t}function Xo(e){let t=Ii(e),n=Pi(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function kd(e,t){let n=Ii(e)??Ii(t),r=Pi(t)??Pi(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var $d=160;function wb(e){return e.length>$d?`${e.slice(0,$d)}\u2026`:e}function kb(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${wb(e.command)}</code>`:""}
  </div>`}function $b(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function xb(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function xd(e){let t=e.failure?Xo(e.failure.reason):"";return l`<div class="worker-banners">
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
          ${kb(e.failure.cause_detail)}
          ${$b(e.failure.reason)}
          ${ws({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Ab(e){return!e||!e.repo&&!e.serial_lane_id?"":l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Sb=new Set(["codex-runner"]);function Eb(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&Sb.has(b.agent_type))),c=i.filter(b=>b&&b.state==="live"),d=i.filter(b=>b&&b.state!=="live"),p=r?ln(r.updated_at,t):"";return l`${o?l`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?l`<span class="rtile__activity-age"
              >${ln(a,t)}</span
            >`:""}
      </div>`:p?l`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">갱신 ${p}</span>
        </div>`:""}${c.length>0||d.length>0?l`<div class="rtile__legs">
        ${c.map(b=>l`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${b.label}</span
            >`)}${d.length>0?l`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${d.map(b=>b.label).join(", ")}`}
              >위임 완료 ${d.length}</span
            >`:""}
      </div>`:""}`}function Di(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?xb(t-e.started_at):"\u2014",c=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=ns(e),p=Wt(e.usage),b=Nn(e.usage),w=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,$=e.base_exception||null,E=e.landing,N=e.attempt_id&&e.attempt_id===n,j=r.monitor||null,Y=Ab(j),ie=j?Ko(j.dependency_chips,{lane:"running"}):"",z=Eb(j,t,a,s?{updated_at:e.updated_at??null}:null),q=s&&e.workflow?.chips?.exec_receipt||null,D=Yo(e.workflow),U=q?l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Dn(q)}`}
        >${`${q.kind}:${io(q)}`}</span
      >`:"",S=Y||D||U?l`<div class="rtile__meta">
          ${Y}${D}${U}
        </div>`:"",M=l`${w?l`<span class="worker-mini__badge">${w}</span>`:""}${$?l`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${$}</span
      >`:""}`,re=s?"":Ur(e),Ae=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${N?" rtile--sel":""}${a?" rtile--paused":""}${o?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Zo(e.priority)}${d?l`<span class="rtile__resumed" title=${d}>↻</span>`:""}${M}
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
                ${Ae}
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
                ${Ae}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${z}${e.rollup?oo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Ua}):""}
    ${E?l`<div class="rtile__landing">
          <span
            class="merge-step${E.failed?" merge-step--failed":""}"
            style=${`--progress: ${E.percent}%`}
            >${E.label}${E.index>0?l`<span class="merge-step__n"
                  >${E.index}/${E.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${ie}
    ${s?S:Y||D||c||p.length>0||b?l`<div class="rtile__meta">
            ${Y}${D}${Vo(e.exec_chips)}
            ${p.length>0?p.map(be=>l`<span class="worker-usage" title=${be.tooltip}
                      >${be.label}</span
                    >`):b?l`<span
                    class="worker-usage"
                    title=${ss(e.usage)}
                    >${b}</span
                  >`:""}
          </div>`:""}
    ${ws(e)} ${re}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Mi(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Di(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var Ni=new Set(["unavailable","not_applicable"]);function Xn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Ad(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Qn(e,t){return t===null?null:`${Yn[e]}: ${t.display} (${Po[t.source]})`}function qi(e){return e.filter(t=>t!==null).join(`
`)}function xs(e){if(typeof e!="object"||e===null)return null;let t=pr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:qi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Yn.orchestration_model,e.model),n(Yn.orchestration_effort,e.effort),n(Yn.orchestration_speed,e.speed)])}}function gr(e,t){let n=Xn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Xn(e,"orchestration_effort"),s=Xn(e,"orchestration_speed"),o=Ad([$n(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:qi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Qn("orchestration_model",n),Qn("orchestration_effort",r),Qn("orchestration_speed",s)])}}function Tb(e,t){return e===null||e.value===null||Ni.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Cb(e){return e===null||Ni.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Rb(e){return e===null?null:e.value==="auto"?"auto":Ni.has(e.resolution)?null:e.display}function Jn(e,t){if(typeof e!="object"||e===null)return null;let n=Xn(e,"impl_dispatch"),r=Xn(e,"impl_runtime"),s=Xn(e,"impl_model"),o=Xn(e,"impl_effort"),a=Xn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":Ad([Tb(r,t??null),Cb(s),Rb(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:qi(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Qn("impl_dispatch",n),Qn("impl_runtime",r),Qn("impl_model",s),Qn("impl_effort",o),Qn("impl_speed",a)])}}var zt="",Ob=["impl_runtime","impl_model","impl_effort"],Lb=["claude_account","codex_account"],Ib=5,Qo=1;function sn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Jo(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(I=>ae(I,"error",4e3)),o={},a={},i=[],c=!1,d={state:"absent",values:{},warnings:[]},p={},b={},w=Promise.resolve(),$={claude:null,codex:null},E=!1,N=null,j={},Y="",ie="",z=!1,q=!1,D=!1,U=null,S=!1;function M(){let I=t.queue?t.queue():null;return sn(I)?I:null}function re(){let I=M();return I?I.runner_catalog:null}function Ae(){let I=M();return I&&sn(I.execution_defaults)?I.execution_defaults:null}function be(){let I=t.implPresetStore?.get();return sn(I)&&Array.isArray(I.presets)?I:null}function H(){return r===null?{}:{root_dir:r}}async function X(I,K){return S||!n?null:await n(I,K)}function ye(I){I&&sn(I.queue)&&t.onQueueAdopt?.(I.queue)}async function ke(I,K){let pe=M();if(!pe||S)return null;let C=await X(I,{...K,...H(),expected_revision:pe.revision});if(ye(C),r!==null&&C&&C.conflict){let G=C.queue&&typeof C.queue.revision=="number"?C.queue.revision:M()?.revision??pe.revision;C=await X(I,{...K,...H(),expected_revision:G}),ye(C)}return C}async function he(){c=!0,Re();try{let I=await X("get-session-defaults",{...H()});o=sn(I?.values)?{...I.values}:{},a={...o},i=Array.isArray(I?.warnings)?I.warnings:[]}catch(I){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}finally{c=!1,Re()}}async function se(){let I=Hu(o,a);if(Object.keys(I).length!==0){try{let K=await X("set-session-defaults",{values:I,...H()});o=sn(K?.values)?{...K.values}:{},a={...o},i=Array.isArray(K?.warnings)?K.warnings:[]}catch(K){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}Re()}}function xe(I,K){if(!sn(I))return;let pe=I.state;d={state:pe==="usable"||pe==="unusable"||pe==="absent"?pe:"absent",values:sn(I.values)?{...I.values}:{},warnings:Array.isArray(I.warnings)?I.warnings:[]},b={...d.values},K&&(p={...b})}async function ge(){try{xe(await X("get-workspace-accounts",{...H()}),!0)}catch(I){d={state:"unusable",values:{},warnings:["kv_read_failed"]},b={},p={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}Re()}async function V(I){try{let K=await fetch(I);if(!K.ok)return null;let pe=await K.json();if(!sn(pe)||!Array.isArray(pe.accounts))return null;let C=pe.accounts.filter(G=>sn(G)&&typeof G.key=="string"&&G.key.length>0&&typeof G.email=="string"&&G.email.length>0);return{accounts:C,active:C.find(G=>G.active===!0)||null}}catch{return null}}async function ee(){E=!0;let[I,K]=await Promise.all([V("/api/claude-usage"),V("/api/codex-usage")]);S||($={claude:I,codex:K},Re())}function ce(){let I={};for(let K of Lb){let pe=Object.hasOwn(p,K)?p[K]:null,C=Object.hasOwn(b,K)?b[K]:null;pe!==C&&(I[K]=pe)}return I}async function ve(){let I=ce();if(Object.keys(I).length!==0){try{xe(await X("set-workspace-accounts",{values:I,...H()}),!1)}catch(K){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}Re()}}function De(I,K){K===zt?delete p[I]:p[I]=K,Re(),w=w.then(()=>ve())}function le(I,K){if(Ob.includes(I)){ue(I,K);return}K===zt?delete a[I]:a[I]=K,Re(),se()}function ze(){let I=ut().orchestration_model,K=rn({global:{orchestration_model:I??void 0},execution_defaults:Ae(),runner_catalog:re()}).orchestration_model.value;return K?$n(re(),K):null}function P(I,K){typeof K=="string"&&K.length>0?a[I]=K:delete a[I]}function ue(I,K){let pe=K===zt?void 0:K,C=Wu({impl_runtime:I==="impl_runtime"?pe:a.impl_runtime,impl_model:I==="impl_model"?pe:a.impl_model,impl_effort:I==="impl_effort"?pe:a.impl_effort},re(),ze());P("impl_runtime",C.impl_runtime),P("impl_model",C.impl_model),P("impl_effort",C.impl_effort),Re(),se()}async function Me(){let I=M();if(!I)return;let K={orchestration_model:I.orchestration_model??null,orchestration_effort:I.orchestration_effort??null,orchestration_speed:I.orchestration_speed??null},pe=Gu(K,{...K,...j});if(Object.keys(pe).length!==0){try{let C=await ke("worker-queue-set-orchestration-defaults",{values:pe});if(C&&C.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}j={}}catch(C){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}Re()}}function qe(I,K){j[I]=K===zt?null:K,Re(),Me()}function Le(I){if(N=I,!I){Re();return}let K=re(),pe=ut(),C=pe.orchestration_model;C&&!ys(K,I).includes(C)&&(j.orchestration_model=null,C=null);let G=pe.orchestration_effort;G&&!xi(K,I,C||dn).includes(G)&&(j.orchestration_effort=null),Re(),Me()}async function We(I){if(!(!M()||I<Qo)){try{await ke("worker-queue-set-slots",{slots:I})}catch(K){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}Re()}}async function je(I){if(!(!M()||I<Qo||I>Ib)){try{await ke("worker-queue-set-serial-lane-count",{count:I})}catch(K){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}Re()}}async function Ye(I,K){let pe=I==="auto_advance"?"worker-automation-toggle":I==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await ke(pe,{on:K})}catch(C){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}Re()}function tt(){let I={},K=ut();for(let pe of Ro){let C=Un.includes(pe)?K[pe]:a[pe];typeof C=="string"&&C.length>0&&(I[pe]=C)}return I}async function ct(){let I=be();if(!I)return;let K=tt();if(Object.keys(K).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let pe=(I.presets||[]).find(G=>G.id===Y),C=ie.trim()||(pe?pe.name:"");if(!C){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=pe?await X("impl-preset-update",{expected_revision:I.revision,id:pe.id,name:C,settings:K}):await X("impl-preset-create",{expected_revision:I.revision,name:C,settings:K});if(G&&G.applied){if(ie="",!pe&&Array.isArray(G.presets)){let fe=G.presets.find(g=>g.name===C);Y=fe?fe.id:Y}Re()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Re()}catch(G){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function _t(){let I=be();if(!(!I||Y.length===0))try{let K=await X("impl-preset-delete",{expected_revision:I.revision,id:Y});K&&K.applied?(Y="",Re()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Re())}catch(K){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}}function te(I){o=sn(I.values)?{...I.values}:{},a={...o},i=Array.isArray(I.warnings)?I.warnings:[],sn(I.queue)&&(t.onQueueAdopt?.(I.queue),j={})}async function J(){let I=be(),K=M();if(!I||!K||Y.length===0)return;let pe=C=>({preset_id:Y,expected_revision:I.revision,expected_queue_revision:C,...H()});try{let C=await X("apply-impl-preset-global",pe(K.revision));if(C&&C.applied&&te(C),r!==null&&C&&C.queue_applied===!1){let G=C.queue&&typeof C.queue.revision=="number"?C.queue.revision:M()?.revision??K.revision;C=await X("apply-impl-preset-global",pe(G)),C&&C.applied&&te(C)}C&&C.applied?C.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):C&&C.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(C){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}Re()}async function Ce(){q=!0,D=!1,Re();try{let I=await X("get-worker-system-prompt",{});!I||typeof I!="object"||Array.isArray(I)?D=!0:U=I}catch{D=!0}finally{q=!1,Re()}}function Ke(){if(z=!z,z&&!U){Ce();return}Re()}function Oe(){let I=Nr({loading:q,error:D});if(I)return I;if(!U)return"";let K=Array.isArray(U.variants)?U.variants:[];return l`<div class="settings-dialog__sp-body">
      ${U.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${U.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${K.map(pe=>l`<div class="settings-dialog__sp-variant" data-variant=${pe.key}>
            <div class="settings-dialog__sp-cond">${pe.condition}</div>
            ${Bn(pe.label,pe.system_prompt)}
          </div>`)}
    </div>`}function we(){return l`<section
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
        aria-expanded=${z?"true":"false"}
        @click=${Ke}
      >
        ${z?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${z?Oe():""}
    </section>`}function Be(I,K,pe,C,G,fe,g){let k=G[I]??zt,O=Ai(I,pe,G,Ae(),re(),g),Q=O.options.find(_e=>_e.value===k),Z=k===zt?O.full_value:Q?.full_value;return l`<select
        class=${k===zt?"settings-dialog__unset":""}
        data-key=${I}
        aria-label=${K}
        title=${Z||""}
        ?disabled=${fe===!0||O.disabled}
        .value=${mr(String(k))}
        @change=${_e=>C(I,String(_e.target.value))}
      >
        <option value=${zt} ?selected=${k===zt}>
          ${O.unset_label}
        </option>
        ${O.options.map(_e=>l`<option
              value=${_e.value}
              title=${_e.full_value||""}
              ?selected=${_e.value===k}
            >
              ${_e.label}
            </option>`)}
      </select>
      ${k===zt?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ge(I,K,pe,C,G,fe=!1,g){return l`<div
      class=${`settings-dialog__row${fe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${K}</span>
      <span class="settings-dialog__controls">
        ${Be(I,K,pe,C,G,fe,g)}
      </span>
    </div>`}function Qe(I,K){let pe=K?K.active:null;return sn(pe)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${I==="claude"?pe.email:Br({...pe,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Ze(I,K,pe){let C=$[pe],G=Object.hasOwn(p,I)?p[I]:zt,fe=pe==="claude"?No:Br,g=!!C?.accounts.some(k=>k.key===G);return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${K}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${K}
          data-account-key=${I}
          @change=${k=>De(I,String(k.target.value))}
        >
          <option value=${zt} ?selected=${G.length===0}>
            ${Qe(pe,C)}
          </option>
          ${G.length>0&&!g?l`<option value=${G} selected>
                ${G} (목록에 없음)
              </option>`:""}
          ${C?.accounts.map(k=>l`<option value=${k.key} ?selected=${k.key===G}>
                ${fe(k)}
              </option>`)||""}
        </select>
        ${C?"":l`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function rt(){let I=d.warnings.join(", ");return d.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${I} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:d.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${I}`:null}function yt(I,K,pe,C,G){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${K}-on)`}
        ></i>
        ${I}
      </span>
      <span class="settings-dialog__controls">
        ${Be(pe,`${I} \uBAA8\uB378`,C,le,a,!1)}
        ${Be(G,`${I} effort`,Io,le,a,!1)}
      </span>
    </div>`}function Et(I,K,pe,C){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${K}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${C?" is-on":""}`}
          data-automation=${I}
          aria-pressed=${C?"true":"false"}
          aria-label=${K}
          @click=${()=>Ye(I,!C)}
        >
          ${C?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${pe}</span>
      </span>
    </div>`}function it(I,K,pe,C){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${K}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${I}>
          <button
            type="button"
            aria-label=${`${K} \uAC10\uC18C`}
            @click=${()=>C(pe-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${pe}</span>
          <button
            type="button"
            aria-label=${`${K} \uC99D\uAC00`}
            @click=${()=>C(pe+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ot(I){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${I.rows.length>0?`\uBCC0\uACBD ${I.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${I.rows.map(K=>l`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${K.kind}
          >
            <span class="settings-dialog__preset-diff-label">${K.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${K.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${K.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${I.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${I.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function ut(){let I=M(),K={};for(let pe of Un)K[pe]=Object.prototype.hasOwnProperty.call(j,pe)?j[pe]:I&&typeof I[pe]=="string"?I[pe]:null;return K}function He(){let I=re(),K=a.impl_runtime,pe=a.impl_model,C=be(),G=M(),fe=ut(),g=ys(I,N),k=Fr(I,void 0).filter(Se=>Se!==dn),O=xi(I,N,fe.orchestration_model||dn).filter(Se=>Se!==dn),Q=Y?(C?.presets||[]).find(Se=>Se.id===Y):null,Z=Q?zu(tt(),sn(Q.settings)?Q.settings:{}):null,_e=G&&typeof G.slots=="number"?G.slots:Qo+1,Te=G&&typeof G.serial_lane_count=="number"?G.serial_lane_count:Qo,$e=Ae()?.supported===!0,st=rt(),dt=Ai("workflow_mode",bs,a,Ae(),I);return l`
      ${i.length>0?l`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${st?l`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${st}
          </div>`:""}
      ${$e?"":l`<div
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
                .value=${mr(Y)}
                @change=${Se=>{Y=String(Se.target.value),Re()}}
              >
                <option value="" ?selected=${Y===""}>
                  실행 프리셋…
                </option>
                ${(C?.presets||[]).map(Se=>l`<option
                      value=${Se.id}
                      ?selected=${Se.id===Y}
                    >
                      ${Se.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Z||Z.rows.length===0}
                @click=${J}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Y?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${mr(ie)}
                @input=${Se=>{ie=String(Se.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${Y?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${ct}
              >
                ${Y?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${Y.length===0}
                @click=${_t}
              >
                삭제
              </button>
            </div>
            ${Z?Ot(Z):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${mr(N||zt)}
                    @change=${Se=>{let bt=String(Se.target.value);Le(bt===zt?null:bt)}}
                  >
                    <option value=${zt} ?selected=${!N}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${N==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${N==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ge("orchestration_model","\uBAA8\uB378",g,qe,fe)}
              ${Ge("orchestration_effort","effort",O,qe,fe)}
              ${Ge("orchestration_speed","\uC18D\uB3C4",gs,qe,fe)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Ze("claude_account","Claude","claude")}
              ${Ze("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${zt}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>le("workflow_mode",zt)}
                    >
                      ${dt.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${bs.map(Se=>l`<button
                          type="button"
                          data-mode=${Se}
                          aria-pressed=${String(a.workflow_mode===Se)}
                          @click=${()=>le("workflow_mode",Se)}
                        >
                          ${Se}
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
              ${yt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",hs,"spec_review_effort")}
              ${yt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Lo,"plan_review_effort")}
              ${yt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",hs,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ge("impl_runtime","\uC704\uC784 \uB300\uC0C1",Oo,le,a)}
              ${Ge("impl_model","\uBAA8\uB378",Fr(I,K),le,a)}
              ${Ge("impl_effort","effort",jr(I,K,pe),le,a)}
              ${Ge("impl_speed","\uC18D\uB3C4",gs,le,a)}
              ${Ge("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",k,le,a,!1,{...a,...fe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Et("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",G?.auto_advance===!0)}
              ${Et("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",G?.auto_merge===!0)}
              ${Et("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",G?.auto_repair===!0)}
              ${it("slots","\uB3D9\uC2DC \uC2E4\uD589",_e,Se=>We(Se))}
              ${it("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Te,Se=>je(Se))}
            </div>
            ${we()}
          `}
    `}function Re(){S||Ve(He(),e)}return{load(){j={};let I=[he(),ge()];return E||I.push(ee()),Promise.all(I).then(()=>{})},render:Re,sessionDraft:()=>({...a}),destroy(){S=!0,Ve(l``,e)}}}function ea(e){return l`<svg
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
  </svg>`}function Sd(){return ea(es`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Ed(){return ea(es`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Td(){return ea(es`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Cd(){return ea(es`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Rd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Od(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Wt(fo(t));let n={};for(let i of Rn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let d=!1;for(let p of Rn){let b=c[p];typeof b=="number"&&Number.isFinite(b)&&(n[p]+=b,r=!0,d=!0)}if(d){o+=1;let p=c.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Nn(n):null}function An(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Fi(e,t){let n=An(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Pb(e,t){if(!An(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function Db(e){if(!An(e)||!An(e.execution_defaults)||!An(e.runner_catalog)||!An(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=rn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=$n(e.runner_catalog,n.orchestration_model.value??""),s=gr(n,e.runner_catalog),o=Jn(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Ld(e,t){let n=t.notify||(V=>ae(V,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let d=null,p=null,b=null,w=new Map;function $(){let V=t.workspacesState?t.workspacesState():[];return Array.isArray(V)?V.filter(ee=>An(ee)):[]}function E(V){return $().find(ee=>ee.root_dir===V)||null}function N(V){return Pb(E(V),w.get(V))}function j(){for(let V of $()){let ee=w.get(V.root_dir);ee&&typeof ee.revision=="number"&&typeof V.revision=="number"&&V.revision>=ee.revision&&w.delete(V.root_dir)}}async function Y(V,ee,ce){let ve=t.transport,De=N(ee);if(!(!ve||!An(De))){try{let le=await ve(V,{...ce,root_dir:ee,expected_revision:De.revision});if(An(le?.queue)&&w.set(ee,le.queue),le&&le.conflict){let ze=An(le.queue)&&typeof le.queue.revision=="number"?le.queue.revision:N(ee)?.revision;le=await ve(V,{...ce,root_dir:ee,expected_revision:ze}),An(le?.queue)&&w.set(ee,le.queue)}}catch(le){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${le instanceof Error?le.message:String(le)}`)}se()}}function ie(V){d!==V&&(d=V,t.onFocusChange?.(d),se())}function z(V){ie(d===V?null:V)}function q(V){if(p===V){U();return}D(),p=V;let ee=E(V);a.textContent=`${ee?.name||V} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,b=Jo(c,{root_dir:V,queue:()=>N(V),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ce=>{w.set(V,ce),se()}}),b.load(),se()}function D(){b?.destroy(),b=null}function U(V){D(),p=null,s.hidden=!0,a.textContent="",V!==!0&&se()}let S=()=>U();i.addEventListener("click",S);function M(V){V.key==="Escape"&&d!==null&&ie(null)}document.addEventListener("keydown",M);function re(V,ee){let ce=Math.max(ee,V,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ee}\uAC1C \uC911 ${V}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ce},(ve,De)=>De<V?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function Ae(V){let ee=V.auto_advance===!0,ce=V.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ee?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ee?"true":"false"}
        aria-label=${`${V.name} \uC790\uB3D9\uD654`}
        title=${ee?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ee?Ed():Sd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ce?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ce?"true":"false"}
        aria-label=${`${V.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ce?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Td()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${p===V.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${p===V.root_dir?"true":"false"}
        aria-label=${`${V.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Cd()}
      </button>`}function be(V){let ee=Db(V);return ee?l`<div class="mon2-deck__chips">
      ${ee.orchestration?l`<span class="mon2-deck__chip" title=${ee.orchestration.title}
            >오케 ${ee.orchestration.text}</span
          >`:""}
      ${ee.worker?l`<span class="mon2-deck__chip" title=${ee.worker.title}
            >워커 ${ee.worker.text}</span
          >`:""}
    </div>`:""}function H(V){let ee=[];for(let[ce,ve]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let De=Fi(V,ce);De>0&&ee.push(`${ve} ${De}`)}return ee.join(" \xB7 ")}function X(V){let ee=Fi(V,"running"),ce=typeof V.slots=="number"?V.slots:1;return l`<div
      class=${`mon2-deck__tile${d===V.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${V.root_dir}
      aria-pressed=${d===V.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${V.root_dir}>${V.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ce}\uAC1C \uC911 ${ee}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ee}/${ce}</span>
          ${re(ee,ce)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${V.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${Ae(V)}</div>
        <span class="mon2-deck__counts">${H(V)}</span>
        ${be(V)}
      </div>
    </div>`}function ye(V){let ee=t.doneItems?t.doneItems():[],ce=t.rangeLabel?t.rangeLabel():"",ve=Od(Array.isArray(ee)?ee:[]),De=le=>V.reduce((ze,P)=>ze+Fi(P,le),0);return l`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${V.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ce}`}
        >실행 ${De("running")} · 대기 ${De("queue")} · PR
        ${De("pr_wait")}${De("session_active")>0?` \xB7 \uC138\uC158 ${De("session_active")}`:""}
        · ${ce} 완료
        ${Array.isArray(ee)?ee.length:0}</span
      >
      ${ve===null?"":l`<span class="mon2-deck__total-tokens">
            ${typeof ve=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${Rd(ce)}
                  >${ve}</span
                >`:ve.map(le=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${le.provider}
                      title=${le.tooltip}
                      >${le.label}</span
                    >`)}
          </span>`}
    </div>`}function ke(){let V=$();return V.length===0?"":l`${ye(V)}
      <div class="mon2-deck__strip">
        ${V.map(ee=>X(ee))}
      </div>`}function he(){d!==null&&!E(d)&&(d=null,t.onFocusChange?.(null))}function se(){j(),he(),p!==null&&!E(p)&&U(!0),Ve(ke(),r),b?.render()}function xe(V){let ee=V.target;if(!ee||typeof ee.closest!="function")return;let ce=ee.closest("[data-root-dir]");if(!ce)return;let ve=ce.getAttribute("data-root-dir")||"",De=ee.closest("[data-act]")?.getAttribute("data-act");if(De==="worker"){t.gotoWorkerTab?.(ve);return}if(De==="auto"){Y("worker-automation-toggle",ve,{on:N(ve)?.auto_advance!==!0});return}if(De==="merge"){Y("worker-merge-auto-toggle",ve,{on:N(ve)?.auto_merge!==!0});return}if(De==="gear"){q(ve);return}z(ve)}function ge(V){if(V.key!=="Enter"&&V.key!==" ")return;let ee=V.target;if(!ee||typeof ee.closest!="function")return;let ce=ee.closest('[data-root-dir][role="button"]');!ce||ce!==ee||(V.preventDefault(),z(ce.getAttribute("data-root-dir")||""))}return r.addEventListener("click",xe),r.addEventListener("keydown",ge),{render:se,focusRoot:()=>d,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",M),r.removeEventListener("click",xe),r.removeEventListener("keydown",ge),i.removeEventListener("click",S),D(),Ve(l``,r),e.replaceChildren()}}}var Mb="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Nb="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",qb="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",As="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function ji(e,t){return`${e}\0${t}`}function Fb(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function jb(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Bi(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Bb(e,t){let n=new Set;for(let[a,i]of t)for(let c of i)n.add(ji(a,c));let r=new Map,s=new Map;for(let a of e){let i=ji(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=ji(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Ub(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Wb(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ta(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Id(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function na(e){let t=jb(e.blocked_by_map),n=[],r={refusal:null},s=i=>{let c=e.owner_of.get(i);return typeof c!="string"||c.length===0?(r.refusal=Fb(i),null):c};return{graph:t,dep_ops:n,state:r,ownerOf:s,addDep:(i,c)=>{if(r.refusal!==null||i===c)return;let d=t.get(i)||[];if(d.includes(c))return;let p=s(i);if(p!==null){if(Bi(t,c,i)){r.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${i}\uAC00 \uC774\uBBF8 ${c}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(i,[...d,c]),n.push({type:"dep-add",a:i,b:c,root_dir:p})}},removeDep:(i,c)=>{if(r.refusal!==null||i===c)return;let d=t.get(i)||[];if(!d.includes(c))return;let p=s(i);p!==null&&(t.set(i,d.filter(b=>b!==c)),n.push({type:"dep-remove",a:i,b:c,root_dir:p}))}}}function ra(e,t,n,r){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Bb(e.dep_ops,t.blocked_by_map),o=s.filter(i=>i.type==="dep-remove"),a=s.filter(i=>i.type==="dep-add");return{lane_ops:n,ops:[...o,...a,...r],lane_op_index:o.length}}function Pd(e,t){for(let n=1;n<t.length;n+=1)e.addDep(t[n].bead_id,t[n-1].bead_id)}function Dd(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(ta(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function zb(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ui(e,t,n){let r=na(n),s=[],o=[],a=n.owner_lane_of.get(e.bead_id),i=e.kind==="chain"?e.lane_id??a:void 0,c=i===void 0?void 0:n.cross_lanes.get(i);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Mb};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Nb};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Id(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:As}}if(e.kind==="chain"&&c===void 0)return{refused:As};let d=()=>{if(c===void 0||c.status!=="confirmed")return;let w=c.entries.map(j=>j.bead_id),$=new Set(w),E=(r.graph.get(e.bead_id)||[]).filter(j=>$.has(j)),N=w.filter(j=>(r.graph.get(j)||[]).includes(e.bead_id));for(let j of E)r.removeDep(e.bead_id,j);for(let j of N)r.removeDep(j,e.bead_id);for(let j of E)for(let Y of N)r.addDep(Y,j)},p=(w,$)=>{let E=n.cross_lanes.get(w),N=E.entries.findIndex(S=>S.bead_id===e.bead_id),j=E.entries.filter(S=>S.bead_id!==e.bead_id),Y=Math.max(0,Math.min(j.length,N>=0&&$>N?$-1:$)),ie=-1;if(j.forEach((S,M)=>{n.fixed_members.has(S.bead_id)&&(ie=M)}),Y<=ie){r.state.refusal=qb;return}let z=N>=0?E.entries[N]:c?.entries.find(S=>S.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir},q=[...j.slice(0,Y),z,...j.slice(Y)];if(zb(q,E.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:w,entries:q}}),E.status!=="confirmed")return;let D=Y>0?j[Y-1].bead_id:null,U=Y<j.length?j[Y].bead_id:null;if(D===null){U!==null&&r.addDep(U,e.bead_id);return}r.addDep(e.bead_id,D),U!==null&&(r.graph.get(U)||[]).includes(D)&&(r.removeDep(U,D),r.addDep(U,e.bead_id))},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(d(),c!==void 0&&(t.kind!=="chain"||t.lane_id!==i)&&s.push({type:"monitor-lane-update",payload:{lane_id:i,entries:c.entries.filter(w=>w.bead_id!==e.bead_id)}})),t.kind==="chain"&&p(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=Ub(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(ta(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let $=n.parallel_rows,E=$[Math.max(0,Math.min($.length,t.marker_index))];if(!(!!E&&E.bead_id===e.bead_id)&&Wb(n,e.root_dir)&&b!==void 0){let j=b>w?w:w-1;j>=0&&j!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:j},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let w=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&w.status==="confirmed"&&o.push(ta(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let w=b>t.index?t.index:t.index-1;w>=0&&w!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else o.push(ta(e.bead_id,e.root_dir,t.index,t.lane_id));return ra(r,n,s,o)}function Md(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:As};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=na(t),s=[];return Pd(r,n.entries),r.state.refusal===null&&Dd(r,t,n.entries,s),ra(r,t,[{type:"monitor-lane-confirm",payload:{lane_id:e}}],s)}function Nd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:As};let r=na(t),s=[];return Pd(r,n.entries),r.state.refusal===null&&Dd(r,t,n.entries,s),ra(r,t,[],s)}function qd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:As};let r=na(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return ra(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[])}function Wi(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Id(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Hb="\uC0AC\uC774\uD074";function Fd(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=Bi(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:Hb}:{}})}return o.sort((a,i)=>{let c=r!==void 0&&a.root_dir===r,d=r!==void 0&&i.root_dir===r;return c!==d?c?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function jd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var Bd={running:3,paused:2,failed:1};function Wr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Ud(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Wd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Wr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Wr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let p=t.get(a.bead_id),b=typeof p=="number"&&p>0&&typeof a.finished_at=="number"&&p>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let p=Bd[d.run_state],b=Bd[i];if(p>b||p===b&&(d.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:r}}function sa(e){return e.replace(/\/+$/,"")}function Gb(e,t){let n=sa(e),r=sa(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function oa(e,t){let n=new Set;for(let r of e)for(let s of t){if(!Gb(r,s))continue;let o=sa(r),a=sa(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var zd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ss=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function aa(e,t){let n=zd.find(s=>s.step===e);if(!n)return null;let r=zd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Hd(e){let t=Ss.findIndex(n=>n.step===e);return Ss.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function br(e){let t=Ss.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Vb(e){let t=Ss.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ss.length}}function ia(e){let t=Vb(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Hi=new Set(["queued","running","retry_pending","repairing"]),Gd=new Set(["failed","succeeded"]),Kb={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Es={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Yb={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Es.base_containment,child_sweep:Es.child_sweep,branch_cleanup:Es.branch_cleanup,parent_close:Es.parent_close};function Zb(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Xb(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Hi,...Gd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Qb(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=d=>d.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function zi(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Kb[s];if(!o)return null;let a=aa(n,`${r} ${o}`);return a?{...a,active:Hi.has(s),failed:s==="failed"}:null}function Jb(e){return!e||typeof e!="object"?null:Yb[e.step]||null}function Ts(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Jb(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=Zb(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(E=>E&&typeof E=="object"&&Xb(E,t,i)).sort(Qb):[],d=a?c:[],p=d.find(E=>Hi.has(E.state));if(p)return zi(p);if(s)return s.step==="repo_operations"&&c[0]?zi(c[0],!0):null;let b=d.find(E=>Gd.has(E.state)?E.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(b)return zi(b);if(r){let E=aa(r.step,r.label);return E?{...E,active:!0,failed:!1}:null}let w=typeof e.cleanup_cursor=="string"?Es[e.cleanup_cursor]:null;if(!w)return null;let $=aa(w.step,w.label);return $?{...$,active:!0,failed:!1}:null}function la(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function Gi(e,t){return`${e}\0${t}`}function Vd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Vi(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function ca(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Kd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${ca(s)})`,location_label:ca(s),scope:null,same_lane_ahead:!1};let a=Vi(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1}}function Yd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=Gi(i.root_dir,c.id);n.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(d,[]);for(let p of Array.isArray(c.items)?c.items:[])r.set(p.id,d)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=Gi(i.root_dir,c.id),p=Array.isArray(c.items)?c.items[0]:null,w=!!p&&p.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],$=s.get(d);if($)for(let E of w){let N=r.get(E);N&&N!==d&&!$.includes(N)&&$.push(N)}}let o=(i,c)=>{let d=new Set,p=[i];for(;p.length>0;){let b=p.pop();if(b===c)return!0;!b||d.has(b)||(d.add(b),p.push(...s.get(b)||[]))}return!1},a=new Map;for(let[i,c]of s){let d=[];for(let p of c){let b=n.get(p);o(p,i)&&b&&d.push(b)}d.length>0&&a.set(i,d)}return a}function Zd(e,t){return Gi(e,t)}var Xd=1,Cs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Yi=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],zr={show_blocked:!0,spec:"all"},Qd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function eh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Wr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function th(e,t){let{winners:n,resumed_from_ids:r}=Wd(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,c=a.run_state,d=a.started_at,p=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:d,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:mn(e,i.bead_id),can_pause:c==="running"&&p,can_resume:c!=="running"&&p&&!r.has(i.attempt_id)})}return s}function Jd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function xt(e){return e&&typeof e=="object"?e:{}}function nh(e,t,n){let r=xt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=w=>rn({pin:w,global:a,execution_defaults:s,runner_catalog:o,route:n}),c,d;try{c=i(r),d=i(null)}catch{return null}let p=ep(gr(c,o),gr(d,o)),b=ep(Jn(c,null),Jn(d,null));return p||b?{orchestration:p,worker:b}:null}function ep(e,t){return!e||t&&t.text===e.text?null:e}function rh(e,t){let n=ro(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function sh(e,t){let n=Vi(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function tp(e,t,n){let r=t.get(e);if(!r)return sh(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return ca(r)}function oh(e,t,n,r,s,o){let a=[];return e.forEach((i,c)=>{let d=typeof i.id=="string"?i.id:"";if(d.length===0)return;let p=i.status==="confirmed"?"confirmed":"draft",b=Array.isArray(i.entries)?i.entries:[],w=[];b.forEach(($,E)=>{let N=$&&typeof $.bead_id=="string"?$.bead_id:"";if(N.length===0)return;let j=$&&typeof $.root_dir=="string"?$.root_dir:"",Y=n.get(N),ie=Y?Y.state:void 0,z=ie==="running"||ie==="pr_wait"||ie==="done",q=!Y||ie==="runnable",D=Y&&Y.lane==="parallel"&&typeof Y.position=="number"?Y.position-1:null,U=w.length>0?w[w.length-1].id:null,S=p==="confirmed"&&U!==null&&!(t.get(N)||[]).includes(U);w.push({id:N,title:s.get(N)||N,root_dir:Y?Y.root_dir:j,workspace_name:Y?Y.workspace_name:o.get(j)||"",seq:E+1,location_label:tp(N,n,r),draggable:!z,fixed:z,done:ie==="done",unplaced:q,mismatch:S,...D!==null?{queue_index:D}:{}})}),w.forEach(($,E)=>{$.seq=E+1}),a.push({lane_id:d,status:p,draft:p==="draft",number:c+1,label:`\uC5F0\uACB0 ${c+1} \xB7 \uB808\uD3EC \uAC04`,rows:w,all_done:w.length>0&&w.every($=>$.done),can_confirm:p==="draft"&&w.length>=2,has_mismatch:p==="confirmed"&&w.some($=>$.mismatch||$.unplaced)})}),a}function ah(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function ih(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:c,state:d}=ah(i,t,n);if(d!==void 0&&(i.scope_state=d),c.length===0)continue;let p=o.get(i.root_dir);p?p.push({item:i,scope:c}):o.set(i.root_dir,[{item:i,scope:c}])}let a=(i,c,d)=>{let p={id:c.id,title:c.title,location_label:tp(c.id,r,s),prefixes:d};i.overlap_chips?i.overlap_chips.push(p):i.overlap_chips=[p]};for(let i of o.values())for(let c=0;c<i.length;c+=1)for(let d=c+1;d<i.length;d+=1){let p=oa(i[c].scope,i[d].scope);p.length!==0&&(a(i[c].item,i[d].item,p),a(i[d].item,i[c].item,p))}}function Ki(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ua(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Zi(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...zr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,c=n&&Cs.some(P=>P.value===n.candidate_sort)?n.candidate_sort:"repo_spec",d=new Map;for(let P of s)P&&typeof P.root_dir=="string"&&d.set(P.root_dir,P);let p=new Map;for(let P of s)P&&typeof P.root_dir=="string"&&p.set(P.root_dir,P.name||P.root_dir);for(let P of r)P&&typeof P.root_dir=="string"&&p.set(P.root_dir,P.name||P.root_dir);let b=[],w=[],$=[],E=[],N=[],j=[],Y=new Map,ie=new Map,z=new Map,q=new Map,D=new Map,U=new Map,S=new Map,M=new Map;for(let P of r){if(!P||typeof P.root_dir!="string")continue;let ue=P.root_dir,Me=P.name||ue,qe=d.get(ue),Le=qe&&typeof qe.revision=="number"?qe.revision:typeof P.revision=="number"?P.revision:0,We=xt(P.attempts),je=xt(P.bead_titles);for(let[g,k]of Object.entries(je))typeof k=="string"&&k.length>0&&M.set(g,k);let Ye=xt(P.bead_times),tt=xt(P.pr_observations),ct=xt(P.admission),_t=xt(P.revise_parked),te=xt(P.merge_queue_state),J=xt(P.cleanup_failed),Ce=xt(P.discard_operations),Ke=xt(P.bead_blocked_by);Object.hasOwn(P,"bead_scope")&&U.set(ue,xt(P.bead_scope));let Oe=xt(P.bead_workflow),we=xt(P.pr_activity),Be=Array.isArray(P.repo_operations)?P.repo_operations:[],Ge=Array.isArray(P.merge_queue)?P.merge_queue:[],Qe=new Set(Ge.filter(g=>g&&typeof g.bead_id=="string").map(g=>g.bead_id)),Ze=new Map(Ge.filter(g=>g&&typeof g.bead_id=="string").map(g=>[g.bead_id,g])),rt=Array.isArray(P.queue)?P.queue:[],yt=(Array.isArray(P.serial_lanes)?P.serial_lanes:[]).filter(g=>g&&/^s[1-5]$/.test(g.id)&&Array.isArray(g.entries)),Et=xt(P.lane_states),it=typeof P.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(P.serial_lane_count))):Math.min(5,yt.length);z.set(ue,it),q.set(ue,rt.length);let Ot=new Map(yt.map(g=>[g.id,g])),ut=new Map;for(let g of yt)for(let k of g.entries)k&&typeof k.bead_id=="string"&&ut.set(k.bead_id,g.id);for(let[g,k]of Object.entries(Ke))Array.isArray(k)&&D.set(g,k.filter(O=>typeof O=="string"&&O.length>0));let He=Array.isArray(P.done)?P.done:[];for(let g of He)g&&typeof g.bead_id=="string"&&j.push({id:g.bead_id,root_dir:ue,workspace_name:Me});let Re=new Map;for(let g of He)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&Re.set(g.bead_id,g.added_at);let I=g=>({id:g,title:je[g]||g,root_dir:ue,workspace_name:Me,expected_revision:Le,draggable:!1,...xt(Ye[g]).created_at?{created_at:xt(Ye[g]).created_at}:{},...xt(Ye[g]).updated_at?{updated_at:xt(Ye[g]).updated_at}:{}}),K=new Set;for(let[g,k]of th(We,Re))K.add(g),w.push({...I(g),lane:"running",...ut.has(g)?{serial_lane_id:ut.get(g)}:{},attempt_id:k.attempt_id,run_state:k.run_state,status:k.status||void 0,workflow:Oe[g]||null,can_pause:k.can_pause,can_resume:k.can_resume,started_at:k.started_at,last_event_at:k.last_event_at,last_activity:k.last_activity,legs:k.legs,runner:k.runner,model:k.model,effort:k.effort,speed:k.speed,resumed_from:k.resumed_from,continuation_mode:k.continuation_mode,usage:k.usage,exec_chips:{orchestration:xs(k),worker:null},discard:xn(Ce,g,{attempt_id:k.attempt_id}),badges:k.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:k.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:k.run_state==="failed"});for(let[g,k]of Ud(We)){if(w.some(Z=>Z.id===g))continue;let O=k.attempt,Q=k.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";w.push({...I(g),lane:"running",kind:"session",attempt_id:typeof O.attempt_id=="string"?O.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:Oe[g]||null,can_pause:!1,can_resume:!1,started_at:k.started_at,last_event_at:typeof O.last_event_at=="number"?O.last_event_at:null,last_activity:O.last_activity&&typeof O.last_activity=="object"?O.last_activity:null,legs:Array.isArray(O.legs)?O.legs:[],runner:typeof O.runner=="string"?O.runner:null,model:typeof O.model=="string"?O.model:null,effort:typeof O.effort=="string"?O.effort:null,speed:typeof O.speed=="string"?O.speed:null,resumed_from:null,continuation_mode:null,usage:O.usage&&typeof O.usage=="object"?O.usage:null,exec_chips:{orchestration:xs(O),worker:null},discard:xn(Ce,g,{merge_queued:!0}),badges:[k.origin==="auto"?`${Q} \xB7 \uC790\uB3D9`:Q],alert:!1})}for(let g of Array.isArray(P.session_active)?P.session_active:[]){let k=g&&g.bead_id;typeof k!="string"||K.has(k)||(K.add(k),Array.isArray(g.blocked_by)&&g.blocked_by.length>0&&D.set(k,g.blocked_by.filter(O=>typeof O=="string"&&O.length>0)),typeof g.title=="string"&&g.title.length>0&&M.set(k,g.title),w.push({...I(k),title:g.title||je[k]||k,lane:"running",kind:"session",status:"in_progress",started_at:Ki(g.started_at)??Ki(g.updated_at)??void 0,updated_at:Ki(g.updated_at)??void 0,workflow:g.workflow||null,labels:Array.isArray(g.labels)?g.labels:[],spec_id:typeof g.spec_id=="string"?g.spec_id:"",blocked:g.blocked===!0,...Array.isArray(g.blocked_by)?{blocked_by:g.blocked_by.filter(O=>typeof O=="string"&&O.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let g of Array.isArray(P.pr_wait)?P.pr_wait:[]){let k=g&&g.bead_id;if(typeof k!="string"||K.has(k))continue;K.add(k);let O=xt(tt[k]),Q=xt(O.pr),Z=O.gate?xt(O.gate):null,_e=Qe.has(k),Te=Ze.get(k)?.continuation_action||null,$e=!!Te&&Te.continuation===null,st=te.active===k,dt=g.external===!0,Se=J[k]||null,bt=xt(we[k]),gt=Ts({bead_id:k,merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,merge_progress:bt.merge_progress||null,cleanup_failed:Se,repo_operations:Be}),Ft=la(gt),Gt=!!Z&&Z.base_badge==="\uCDA9\uB3CC",Nt=!!Se&&["child_sweep","branch_cleanup","parent_close"].includes(Se.step)&&!!Z&&Z.tier==="merged",Dt=dt&&!!Se&&!!Z&&Z.tier==="merged",pn=!!Z&&["closed_unmerged","review","undecidable"].includes(Z.tier)&&Z.reason!=="review_receipt_undetermined",At=xn(Ce,k,{external:dt,merge_active:st||gt?.step==="merge",merge_queued:_e,cleanup_active:Ft,merged:!!Se||Z?.tier==="merged"}),Mt=!!At.operation;$.push({...I(k),lane:"pr_wait",workflow:Oe[k]||null,pr_number:typeof Q.number=="number"?Q.number:null,pr_url:typeof Q.url=="string"?Q.url:void 0,external:dt,usage:mn(We,k),merge_step:gt,badges:$e?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:gt?[Z?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Se?[br(Se.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${br(Se.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof Z?.gate_badge=="string"&&Z.gate_badge.length>0?[Z.gate_badge]:[],alert:gt?gt.failed===!0:!!Se||pn,reason:Se&&gt?.active!==!0?ia(Se.step):"PR \uB300\uAE30",merge_action:Z?.tier==="merged"&&!Nt&&!Dt?!1:!_e||$e,merge_enabled:!Mt&&($e||Z?.enabled===!0||Gt||Nt||Dt),merge_label:$e?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Dt||Nt?"\uC815\uB9AC \uC7AC\uAC1C":Gt&&!Nt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:$e?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Mt?At.error?`\uD3D0\uAE30 \uC2E4\uD328: ${At.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${At.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Dt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Nt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Gt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Z?.enabled===!0?`\uBA38\uC9C0 (${Z.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${Z?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:_e&&!$e,cancel_enabled:!st,continuation_mismatch:Te?.mismatch||null,discard:At,discard_action:At.action,discard_enabled:At.enabled,discard_title:At.title})}let pe=(g,k,O,Q)=>{let Z=g&&g.bead_id;if(typeof Z!="string"||K.has(Z))return null;K.add(Z);let _e=_t[Z],Te=xn(Ce,Z),$e=Te.operation?Te:null,st={...I(Z),lane:k,workflow:Oe[Z]||null,draggable:!$e,discard:$e||void 0,reason:Jd(ct,Z),seq:O+1,queue_position:O+1,queue_index:O,queue_length:Q,badges:_e?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!_e,revise_action:!!_e,revise_enabled:!!_e&&!$e,revise_title:_e?_e.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${_e.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Ke,Z)&&(st.blocked_by=Array.isArray(Ke[Z])?Ke[Z].filter(dt=>typeof dt=="string"&&dt.length>0):[]),st};for(let g=0;g<rt.length;g++){let k=pe(rt[g],"queue",g,rt.length);if(!k)continue;E.push(k);let O=Y.get(ue);O?O.push(k):Y.set(ue,[k])}let C=g=>{let k=$.find(Z=>Z.id===g&&Z.root_dir===ue);if(k)return{id:g,title:k.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let O=w.find(Z=>Z.id===g&&Z.root_dir===ue),Q=O&&O.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":O&&O.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:g,title:O?O.title:I(g).title,badge:Q}},G=[];for(let g=0;g<Math.max(it,yt.length);g++){let k=`s${g+1}`,O=Ot.get(k),Q=O&&Array.isArray(O.entries)?O.entries:[],Z=[];for(let $e=0;$e<Q.length;$e++){let st=pe(Q[$e],k,$e,Q.length);st&&(Z.push(st),E.push(st))}let _e=xt(Et[k]),Te=Array.isArray(_e.occupied_by)?_e.occupied_by.filter($e=>typeof $e=="string"):[];Z.length===0&&Te.length===0&&(it<=1||g>=it)||G.push({id:k,index:g,items:Z,raw_length:Q.length,occupied_by:Te,occupants:Te.map($e=>C($e)),corrections:Array.isArray(_e.corrections)?_e.corrections.length:0,cycle:_e.cycle===!0,...Z.length===0&&Te.length===0?{empty:!0}:{}})}ie.set(ue,G);let fe=Array.from({length:it},(g,k)=>{let O=`s${k+1}`,Q=Ot.get(O),Z=Q&&Array.isArray(Q.entries)?Q.entries:[],_e=xt(Et[O]);return{id:O,index:Z.length,length:Z.length,occupied_by:Array.isArray(_e.occupied_by)?_e.occupied_by.filter(Te=>typeof Te=="string"):[]}});for(let g of Array.isArray(P.runnable)?P.runnable:[]){let k=g&&g.bead_id;if(typeof k!="string"||K.has(k))continue;K.add(k);let O=g.workflow&&typeof g.workflow=="object"?g.workflow:null,Q=O&&typeof O.route=="string"&&O.route||(typeof g.route=="string"?g.route:null),Z=nh(xt(qe),g.exec_pins,Q);Array.isArray(g.blocked_by)&&g.blocked_by.length>0&&D.set(k,g.blocked_by.filter(_e=>typeof _e=="string"&&_e.length>0)),typeof g.title=="string"&&g.title.length>0&&M.set(k,g.title),Array.isArray(g.scope)&&S.set(k,g.scope.filter(_e=>typeof _e=="string"&&_e.length>0)),b.push({...I(k),title:g.title||je[k]||k,lane:"runnable",draggable:!0,reason:Jd(ct,k),created_at:g.created_at??void 0,updated_at:g.updated_at??void 0,status:typeof g.status=="string"?g.status:void 0,labels:Array.isArray(g.labels)?g.labels:[],spec_id:typeof g.spec_id=="string"?g.spec_id:"",workflow:O||(Q?{route:Q,chips:{route:Q}}:null),...Z?{exec_chips:Z}:{},blocked:g.blocked===!0,...Array.isArray(g.blocked_by)?{blocked_by:g.blocked_by.filter(_e=>typeof _e=="string"&&_e.length>0)}:{},place_index:rt.length,place_lanes:fe})}for(let g of He){let k=g&&g.bead_id;if(typeof k!="string"||K.has(k)||(K.add(k),o!==void 0&&typeof g.added_at=="number"&&g.added_at<o))continue;let O=eh(We,k),Q=O&&typeof O.done_kind=="string"?O.done_kind:null;N.push({...I(k),lane:"done",done:!0,done_layout:"three_line",usage:mn(We,k),work_ms:zo(We,k),done_at:typeof g.added_at=="number"?g.added_at:void 0,done_kind:Q,badges:[...Q&&Qd[Q]?[Qd[Q]]:[],...Wo(We,k)]})}}let re=new Map;s.forEach((P,ue)=>{P&&typeof P.root_dir=="string"&&re.set(P.root_dir,ue)});let Ae=n&&n.running_sort==="repo"?"repo":"started";w.sort((P,ue)=>{let Me=P.kind==="session",qe=ue.kind==="session";if(Me!==qe)return Me?1:-1;if(Me&&qe){let je=ua(ue.updated_at)-ua(P.updated_at);return je!==0?je:P.id.localeCompare(ue.id)}if(Ae==="repo"){let je=re.get(P.root_dir)??Number.MAX_SAFE_INTEGER,Ye=re.get(ue.root_dir)??Number.MAX_SAFE_INTEGER;if(je!==Ye)return je-Ye}let Le=typeof P.started_at=="number"&&Number.isFinite(P.started_at)?P.started_at:null,We=typeof ue.started_at=="number"&&Number.isFinite(ue.started_at)?ue.started_at:null;return Le!==null&&We!==null&&Le!==We?Le-We:Le===null&&We!==null?1:Le!==null&&We===null?-1:P.id.localeCompare(ue.id)}),N.sort((P,ue)=>(ue.done_at??0)-(P.done_at??0));let be=s.length>0?s:r.map(P=>({root_dir:P&&P.root_dir,name:P&&P.name,auto_advance:P&&P.auto_advance,auto_merge:P&&P.auto_merge,slots:P&&P.slots,revision:P&&P.revision,runner_catalog:P&&P.runner_catalog})),H=new Set(b.map(P=>P.root_dir)),X=[];for(let P of be){if(!P||typeof P.root_dir!="string")continue;let ue=Y.get(P.root_dir)||[],Me=ie.get(P.root_dir)||[];!(ue.length>0||Me.some(Le=>Le.items.length>0||Le.occupied_by.length>0))&&!H.has(P.root_dir)||X.push({root_dir:P.root_dir,name:P.name||P.root_dir,auto_advance:P.auto_advance===!0,auto_merge:P.auto_merge===!0,slots:typeof P.slots=="number"&&P.slots>=Xd?P.slots:Xd,revision:typeof P.revision=="number"?P.revision:0,runner_catalog:xt(P.runner_catalog),items:ue,sublanes:{parallel:ue,serial:Me},serial_lane_count:z.get(P.root_dir)||0,raw_queue_length:q.get(P.root_dir)||0})}let ye={runnable:b,runnable_all:b,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:c==="updated_flat",queue:E,queue_groups:X,running:w,pr_wait:$,done:N,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(q),owner_of:{}},ke=Vd(ye);for(let P of j)ke.has(P.id)||ke.set(P.id,{root_dir:P.root_dir,workspace_name:P.workspace_name,lane:"done",state:"done"});for(let P of[...ye.queue,...ye.runnable]){if(!Object.hasOwn(P,"blocked_by"))continue;let ue=ke.get(P.id);P.blockers=(P.blocked_by||[]).map(Me=>Kd(Me,ue,ke,s))}for(let P of[...ye.queue,...ye.runnable,...ye.running,...ye.pr_wait]){let ue=P.lane==="running"||P.lane==="pr_wait"?[]:(P.blockers||[]).map(qe=>rh(P.id,qe));if(ue.length===0)continue;let Me={predecessors:ue};P.dependency_chips=Me}ih(ye,U,S,ke,s);let he=Yd(ye.queue_groups);for(let P of ye.queue_groups)for(let ue of P.sublanes.serial){let Me=he.get(Zd(P.root_dir,ue.id));Me&&(ue.cross_wait_peers=Me)}ye.chain_lanes=oh(i&&Array.isArray(i.lanes)?i.lanes:[],D,ke,s,M,p);let se=new Map;for(let P of[...ye.queue,...ye.runnable])se.has(P.id)||se.set(P.id,P);let xe=new Set;for(let P of ye.chain_lanes)for(let ue of P.rows){if(P.status==="confirmed"&&!ue.unplaced&&!ue.fixed&&xe.add(ue.id),!P.draft&&!ue.unplaced)continue;let Me=se.get(ue.id);Me&&(Me.cross_lane_chip={lane_id:P.lane_id,number:P.number,status:P.status,label:P.draft?`\uC5F0\uACB0 ${P.number} (draft)`:`\uC5F0\uACB0 ${P.number}`})}let ge=[];for(let P of Y.values())for(let ue of P)xe.has(ue.id)||ge.push(ue);ge.sort((P,ue)=>{let Me=P.workspace_name.localeCompare(ue.workspace_name);return Me!==0?Me:(P.queue_index??0)-(ue.queue_index??0)}),ye.parallel_rows=ge;let V={};for(let[P,ue]of ke)typeof ue.root_dir=="string"&&ue.root_dir.length>0&&(V[P]=ue.root_dir);for(let P of ye.chain_lanes)for(let ue of P.rows)!Object.hasOwn(V,ue.id)&&ue.root_dir.length>0&&p.has(ue.root_dir)&&(V[ue.id]=ue.root_dir);ye.owner_of=V;let ee=ye.runnable.length;ye.runnable_all=ye.runnable.slice();let ce=ye.runnable;a.show_blocked||(ce=ce.filter(P=>P.blocked!==!0));let ve=ce.length;a.spec==="with"?ce=ce.filter(P=>!!P.spec_id):a.spec==="without"&&(ce=ce.filter(P=>!P.spec_id)),ye.runnable_hidden={blocked:ee-ve,spec:ve-ce.length};let De=(P,ue)=>{let Me=ua(ue.updated_at)-ua(P.updated_at);return Me!==0?Me:P.id.localeCompare(ue.id)},ze=c==="repo_spec"?(P,ue)=>{let Me=P.spec_id?0:1,qe=ue.spec_id?0:1;return Me!==qe?Me-qe:De(P,ue)}:De;if(c==="updated_flat")ye.runnable=ce.slice().sort(De),ye.runnable_sections=[];else{let P=new Map;for(let qe of ce){let Le=P.get(qe.root_dir);Le?Le.push(qe):P.set(qe.root_dir,[qe])}let ue=[],Me=[];for(let qe of be){if(!qe||typeof qe.root_dir!="string")continue;let Le=(P.get(qe.root_dir)||[]).slice().sort(ze);P.delete(qe.root_dir),Le.length!==0&&(ue.push({root_dir:qe.root_dir,name:qe.name||qe.root_dir,items:Le.map(We=>({...We,workspace_name:""}))}),Me.push(...Le))}for(let[qe,Le]of P){let We=Le.slice().sort(ze);ue.push({root_dir:qe,name:We[0]?.workspace_name||qe,items:We.map(je=>({...je,workspace_name:""}))}),Me.push(...We)}ye.runnable=Me,ye.runnable_sections=ue}return ye}var np="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function rp(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function sp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var lp="bdui.monitor.done-range",cp="bdui.monitor.running_sort",up="bdui.monitor.candidate_sort",dp="beads-ui.monitor.candidate-filter",pp="beads-ui.monitor.sections";function lh(){try{let e=window.localStorage.getItem(dp);if(!e)return{...zr};let t=JSON.parse(e);return!t||typeof t!="object"?{...zr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:zr.show_blocked,spec:Yi.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...zr}}}function op(e){try{window.localStorage.setItem(dp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function ch(){try{let e=window.localStorage.getItem(up);return Cs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function uh(e){try{window.localStorage.setItem(up,e)}catch{}}function dh(){try{let e=window.localStorage.getItem(pp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function ap(e){try{window.localStorage.setItem(pp,JSON.stringify(e))}catch{}}function ph(){try{let e=window.localStorage.getItem(lp);return e===null?"today":En(e)}catch{return"today"}}function fh(e){try{window.localStorage.setItem(lp,e)}catch{}}function _h(){try{return window.localStorage.getItem(cp)==="repo"?"repo":"started"}catch{return"started"}}function mh(e){try{window.localStorage.setItem(cp,e)}catch{}}var fp="tab:monitor:pipeline",gh=1e3,bh=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],ip="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function hh(e){return e>=1&&e<=ip.length?ip[e-1]:`(${e})`}function _p(e,t){let n=St("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,c=t.switchWorkspace,d=t.router,p=t.now||(()=>Date.now()),b=t.confirm||(u=>typeof globalThis.confirm!="function"||globalThis.confirm(u)),w=ph(),$=_h(),E=lh(),N=ch(),j=dh(),Y=null,ie=null,z=null,q=null,D=[],U=null;function S(){let u=Ar.find(f=>f.value===w);return u?u.label:""}let M=document.createElement("div");M.className="mon",e.appendChild(M);let re=document.createElement("div");re.className="worker-drawer-overlay",re.hidden=!0;let Ae=document.createElement("div");Ae.className="worker-drawer-overlay__backdrop";let be=document.createElement("div");be.className="worker-drawer-host mon2-drawer",re.append(Ae,be),e.appendChild(re);let H=Zi(null,null),X=new Map,ye=new Map,ke=null,he=null,se=null,xe=qr(be,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Y=null,re.hidden=!0,fe()}});async function ge(u,f,v,x,B=!0){if(!o||!v)return null;let W=await o(u,{...f,root_dir:v,expected_revision:x});if(W&&W.conflict&&B){W.queue&&ye.set(v,W.queue);let ne=W.queue&&typeof W.queue.revision=="number"?W.queue.revision:x;W=await o(u,{...f,root_dir:v,expected_revision:ne})}return W&&W.queue&&v&&ye.set(v,W.queue),W}function V(u,f){let v=ye.get(u),x=s&&s.get?s.get():null,B=(Array.isArray(x)?x:[]).find(ne=>ne?.root_dir===u);return(v||B)?.merge_queue?.find(ne=>ne.bead_id===f)?.continuation_action}async function ee(u,f,v,x){let B=await ge(u,f,v,x),W=ye.get(v)?.revision??B?.queue?.revision??x;return Mn(B,(ne,me)=>ge(u,{...f,continuation:ne,decision_token:me},v,W,!1),{refresh:ne=>ge(u,f,v,ne?.queue?.revision??ye.get(v)?.revision??W,!1)})}async function ce(u,f,v,x){let B=await Mn({continuation_mismatch:x},(ne,me)=>ge("worker-merge-queue-add",{bead_id:f,continuation:ne,decision_token:me},u,v,!1)),W=B?.queue?.merge_queue?.find(ne=>ne.bead_id===f)?.continuation_action;B?.applied!==!0&&W?.continuation===null&&W.mismatch&&await ce(u,f,B.queue.revision,W.mismatch)}async function ve(u,f,v){let x=await ge("worker-discard",u,f,v);if(x&&x.discarded===!0){ae(Go(x),"success",5e3);return}if(x&&x.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${x.reason}`,"error");return}if(x&&x.accepted&&x.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(x&&x.accepted){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${x.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}x&&!x.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function De(u,f,v){return!o||!v?null:await o(u,{...f,root_dir:v})}async function le(){let u=new Map;for(let f of H.pr_wait)u.has(f.root_dir)||u.set(f.root_dir,f.expected_revision);for(let[f,v]of u)await ge("worker-merge-queue-add-all",{},f,v)}function ze(u){let f=j[u];return!!(f&&f.runnable===!0)}function P(u){let f={...j[u]||{}};f.runnable=!f.runnable,j={...j,[u]:f},ap(j),fe()}function ue(u){return j[u]===!0}function Me(u){j={...j,[u]:j[u]!==!0},ap(j),fe()}function qe(u){let f=H.queue_groups.find(v=>v.root_dir===u);if(!f)return null;for(let v=0;v<f.serial_lane_count;v+=1){let x=`s${v+1}`,B=f.sublanes.serial.find(W=>W.id===x);if(!B||B.raw_length===0&&B.occupied_by.length===0)return x}return null}function Le(u,f){let v=H.queue_groups.find(B=>B.root_dir===u),x=v?v.sublanes.serial.find(B=>B.id===f):void 0;return x?x.raw_length:0}function We(u,f){let v=X.get(u),x=X.get(f);if(!v||!x)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let B=rp(v),W=rp(x);if(B!==null&&B===W&&v.root_dir===x.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let ne=sp(v),me=sp(x);if(ne&&W!==null){let Je=W;return{kind:"ops",title:`${Je} \uB05D\uC5D0 ${u}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:x.root_dir,ops:[{bead_id:u,lane:Je,index:Le(x.root_dir,Je)}]}}if(B!==null&&me&&W===null){let Je=B;return{kind:"ops",title:`${Je} \uB05D\uC5D0 ${f}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:f,lane:Je,index:Le(v.root_dir,Je)}]}}if(ne&&B===null&&me&&W===null){let Je=qe(v.root_dir);return Je===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Je} \uB808\uC778\uC5D0 ${f} \u2192 ${u} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:f,lane:Je,index:0},{bead_id:u,lane:Je,index:1}]}}return!ne&&!me?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:ne?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function je(u,f){let v=We(u,f.id);return{id:f.id,title:f.title,location_label:f.location_label,prefixes:f.prefixes,action:v.kind==="note"?{kind:"note",text:v.text}:v.kind==="disabled"?{kind:"disabled",label:np,title:v.title}:{kind:"place",label:np,title:v.title}}}function Ye(u,f){if(!z||z.bead_id!==u)return null;let v=z.counterpart_id,x=f.filter(B=>B.id===v);return x.length===0?null:{rows:x.map(B=>je(u,B))}}function tt(u){let f=u.dependency_chips||null,v=u.overlap_chips||[],x=u.scope_state==="missing",B=u.cross_lane_chip;if(!f&&v.length===0&&!x&&!B)return null;let W=Ye(u.id,v);return{...f||{},...v.length>0?{overlaps:v}:{},...x?{scope_missing:!0}:{},...B?{cross_lane:{lane_id:B.lane_id,label:B.label}}:{},...W?{popover:W}:{}}}function ct(u){let f=tt(u);return f?{...u,dependency_chips:f}:u}async function _t(u,f){let v=We(u,f);if(z=null,v.kind!=="ops"){fe();return}let x=Gt(v.root_dir,v.ops[0].bead_id);for(let B of v.ops){let W=await te(B,v.root_dir,x);if(W===null)break;x=W}fe()}async function te(u,f,v){try{let x=await ge("worker-queue-place",u,f,v,!1);if(x&&x.conflict)return ae("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!x||x.applied!==!0)return ae(x&&typeof x.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${x.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let B=x.queue?x.queue.revision:void 0;return typeof B!="number"?(ae("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):B}catch(x){return ae($e(x),"error"),null}}function J(u){let f=ze(u.root_dir);return l`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${u.root_dir}
        data-section="runnable"
        aria-expanded=${f?"false":"true"}
        aria-label=${`${u.name} \uC139\uC158 ${f?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${f?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${u.root_dir}>${u.name}</span>
      <span class="mon2-sec__count">${u.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${u.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Ce(u,f){return l`<div
      class="mon2-item"
      data-bead-id=${u.id}
      data-drag-kind="candidate"
      data-root-dir=${u.root_dir}
    >
      ${f}
    </div>`}function Ke(u){if(ie!==u.id)return null;let f=H.queue_groups.find(W=>W.root_dir===u.root_dir),v=u.place_lanes||[],x=H.cross_lanes_revision!==null,B=[{id:"parallel",label:"\uBCD1\uB82C",count:u.place_index??0}];for(let W of H.chain_lanes)B.push({id:`lane:${W.lane_id}`,label:`\uC5F0\uACB0 ${W.number} (${W.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:W.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!x});B.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!x,title:x?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let W of v)B.push({id:`serial:${W.id}`,label:`\uC9C1\uB82C ${Number(W.id.slice(1))}`,count:W.length,group:`${f?f.name:""} \uC9C1\uB82C`});return{bead_id:u.id,lanes:B}}function Oe(){let u=[],f=new Set,v=(x,B)=>{for(let W of x)f.has(W.id)||(f.add(W.id),u.push({bead_id:W.id,root_dir:W.root_dir,workspace_name:W.workspace_name,title:W.title,lane:B}))};return v(H.running,"running"),v(H.pr_wait,"pr_wait"),v(H.queue,"queue"),v(H.runnable_all,"runnable"),u}function we(u){if(!q||q.bead_id!==u)return"";let f=bt(),v=Oe(),x=new Map;for(let me of v)x.set(me.bead_id,me);let B=(f.get(u)||[]).filter(me=>x.has(me)),W=jd(Fd(u,{issues:v,blocked_by_map:f}),q.query),ne=H.owner_of[u];return l`<div
      class="mon-deppanel"
      data-bead-id=${u}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${B.length===0?l`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${B.map(me=>l`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${me}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${u}
                data-dep-b=${me}
                aria-label=${`${me} \uC5F0\uACB0 \uD574\uC81C`}
                title="연결 해제"
              >
                ✕
              </button></span
            >`)}
      </div>
      <input
        type="search"
        class="mon-deppanel__search"
        placeholder="ID·제목 검색"
        aria-label="의존 후보 검색"
        .value=${q.query}
      />
      <div class="mon-deppanel__list">
        ${W.length===0?l`<div class="mon-deppanel__empty">후보 없음</div>`:W.map(me=>l`<button
                  type="button"
                  class="mon-deppanel__cand${me.disabled?" is-disabled":""}"
                  data-dep-cand=${me.bead_id}
                  ?disabled=${me.disabled}
                  title=${me.reason||me.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${me.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${me.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${me.title}</span
                  >${me.reason?l`<span class="mon-deppanel__cand-reason"
                        >${me.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${ne===void 0?l`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function Be(u){return Ce(u,l`${Li(ct(u),Ke(u),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(f,v)=>i(v,u.root_dir):void 0})}${we(u.id)}`)}function Ge(){return H.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${H.runnable.map(u=>Be(u))}
      </div>`:l`${H.runnable_sections.map(u=>{let f=ze(u.root_dir);return l`<section
        class="mon2-sec${f?" is-collapsed":""}"
        data-root-dir=${u.root_dir}
        data-section="runnable"
      >
        ${J({root_dir:u.root_dir,name:u.name,count:u.items.length})}
        ${f?"":l`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${u.items.map(v=>Be(v))}
            </div>`}
      </section>`})}`}function Qe(u,f){return l`<div
      class="mon2-item"
      data-bead-id=${u.id}
      data-drag-kind="parallel"
      data-root-dir=${u.root_dir}
      data-row-index=${f}
      data-queue-index=${String(u.queue_index??0)}
    >
      ${Zn(ct(u))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${u.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${u.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${u.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${u.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
      ${we(u.id)}
    </div>`}function Ze(){let u=ue("parallel");return l`<section
      class="mon2-area mon2-parallel${u?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${u?"false":"true"}
          aria-label=${`\uBCD1\uB82C \uC601\uC5ED ${u?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${u?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${H.parallel_rows.length}</span>
      </header>
      ${u?"":l`<div class="mon2-area__body" data-drop="parallel">
            ${H.parallel_rows.length===0?l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:H.parallel_rows.map((f,v)=>Qe(f,v))}
          </div>`}
    </section>`}function rt(u,f,v){return l`<div
      class="mon2-crow${f.fixed?" mon2-crow--fixed":""}"
      draggable=${f.draggable?"true":"false"}
      data-bead-id=${f.id}
      data-drag-kind="chain"
      data-root-dir=${f.root_dir}
      data-lane-id=${u.lane_id}
      data-row-index=${v}
      data-queue-index=${typeof f.queue_index=="number"?String(f.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${hh(f.seq)}</span
      >
      ${f.workspace_name?l`<span class="worker-mini__repo" title=${f.root_dir}
            >${f.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${f.id}</span>
      <span class="mon2-crow__title">${f.title}</span>
      ${f.mismatch?l`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      <span class="mon2-crow__where"
        >${f.location_label==="\uC2E4\uD589\uC911"?`\u25CF ${f.location_label}`:f.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${f.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function yt(u){let f=H.cross_lanes_revision!==null;return l`<div class="mon2-clane" data-lane-id=${u.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${u.label}</span>
        <span class="mon2-clane__count">${u.rows.length}</span>
        <span
          class="mon2-clane__badge mon2-clane__badge--${u.draft?"draft":"confirmed"}"
          >${u.draft?"draft":"\uD655\uC815"}</span
        >
        ${u.all_done?l`<span class="mon2-clane__badge mon2-clane__badge--done"
              >모두 완료</span
            >`:""}
        ${u.draft?l`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${u.lane_id}
              ?disabled=${!f||!u.can_confirm}
              title=${u.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:u.has_mismatch?l`<button
                type="button"
                class="mon2-clane__reapply"
                data-lane-id=${u.lane_id}
                ?disabled=${!f}
                title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
              >
                재적용
              </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${u.lane_id}
          ?disabled=${!f}
          title=${u.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${u.lane_id}
      >
        ${u.rows.length===0?l`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:u.rows.map((v,x)=>rt(u,v,x))}
      </div>
    </div>`}function Et(u,f,v){return l`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="repo-serial"
      data-root-dir=${f.root_dir}
      data-lane-id=${u.id}
      data-row-index=${v}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${Zn(ct(f))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${f.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
      </span>
      ${we(f.id)}
    </div>`}function it(u){if(u.length===0)return"";let f=u.length-1;return`${u[0].id} \uC810\uC720${f>0?` +${f}`:""}`}function Ot(u){return l`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${u.id}
    >
      ${Zn({id:u.id,title:u.title,lane:"running",draggable:!1,ghost:!0,badges:[u.badge]})}
    </div>`}function ut(u,f){return l`<div
      class="mon2-lane${f.empty?" mon2-lane--empty":""}"
      data-root-dir=${u.root_dir}
      data-lane-length=${String(f.raw_length)}
    >
      ${bn({id:"",lane:f.id,title:`${u.name} \xB7 \uC9C1\uB82C ${f.index+1}`,items:f.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:l`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${u.root_dir}
          data-lane-id=${f.id}
          data-lane-length=${String(f.raw_length)}
        >
          ${f.occupants.map(v=>Ot(v))}
          ${f.items.length>0?f.items.map((v,x)=>Et(f,v,x)):f.occupants.length>0?"":l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:l`<span
            class="mon2-lane__badge${f.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${f.occupants.length>0?f.occupants.map(v=>`${v.id} \u2014 ${v.badge}`).join(`
`):""}
            >${it(f.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${u.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${f.empty?l`<div class="mon2-lane__hint">
            ${u.name} 직렬 ${f.index+1} 비어 있음
          </div>`:""}
      ${f.cycle?l`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(f.cross_wait_peers||[]).map(v=>l`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${v.workspace_name}·${v.lane}과 교차 대기
          </div>`)}
    </div>`}function He(){let u=ue("serial"),f=H.cross_lanes_revision!==null,v=H.chain_lanes.some(x=>x.draft&&x.rows.length===0);return l`<section
      class="mon2-area mon2-serial${u?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${u?"false":"true"}
          aria-label=${`\uC9C1\uB82C \uC601\uC5ED ${u?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${u?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">직렬 영역</span>
        <button
          type="button"
          class="mon2-newlane"
          ?disabled=${v||!f}
          title=${f?v?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${u?"":l`<div class="mon2-area__body">
            ${H.cross_lanes_unreadable?l`<div class="mon2-clane__unreadable">
                  연결 레인 저장소를 읽을 수 없음
                </div>`:""}
            ${H.chain_lanes.map(x=>yt(x))}
            ${H.queue_groups.map(x=>x.sublanes.serial.map(B=>ut(x,B)))}
          </div>`}
    </section>`}function Re(){return l`<div class="mon2-wait">${Ze()}${He()}</div>`}function I(u){return l`<div class="worker-rungrid">
      ${H.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:H.running.map(f=>Di({bead_id:f.id,attempt_id:f.attempt_id||"",title:f.title,runner:f.runner??null,model:f.model??null,effort:f.effort??null,speed:f.speed??null,started_at:f.started_at??null,kind:f.kind,...f.kind==="session"?{updated_at:f.updated_at}:{},workflow:f.workflow||null,resumed_from:f.resumed_from??null,continuation_mode:f.continuation_mode??null,paused:f.run_state==="paused",failed:f.run_state==="failed",status:f.status,status_label:f.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:f.can_resume!==!1,can_pause:f.can_pause!==!1,exec_chips:f.exec_chips||null,usage:f.usage||null,discard:f.discard},u,Y,{monitor:{repo:f.workspace_name,root_dir:f.root_dir,serial_lane_id:f.serial_lane_id,last_activity:f.last_activity||null,legs:f.legs||[],dependency_chips:tt(f)}}))}
    </div>`}function K(u){let f={runnable:H.runnable,queue:H.queue,running:H.running,pr_wait:H.pr_wait,done:H.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${bh.map(v=>{let x=f[v.lane],B=v.lane==="runnable"?H.runnable_flat?x.length>0?Ge():void 0:H.runnable_sections.length>0?Ge():void 0:v.lane==="queue"?H.queue_groups.length>0||H.chain_lanes.length>0||H.parallel_rows.length>0?Re():void 0:v.lane==="running"?I(u):x.length>0?l`${x.map(W=>Zn(W))}`:void 0;return bn({id:`monitor-${v.lane}`,lane:v.pane,title:v.lane==="done"?`\uC644\uB8CC\xB7${S()}`:v.title,items:x,empty:v.empty,body:B,live:v.lane==="running"&&x.length>0,controls:v.lane==="runnable"?pe():void 0,header_control:C(v.lane,x.length)})})}
      </div>`}function pe(){return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${E.show_blocked}
        />
        🔒
        blocked${H.runnable_hidden.blocked>0?` ${H.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Yi.map(u=>l`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${E.spec===u.value?" is-active":""}"
              data-spec=${u.value}
              aria-pressed=${E.spec===u.value?"true":"false"}
            >
              ${u.label}
            </button>`)}
        ${H.runnable_hidden.spec>0?l`<span class="worker-filter__hidden"
              >숨김 ${H.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function C(u,f){return u==="runnable"?l`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${N}
      >
        ${Cs.map(v=>l`<option
              value=${v.value}
              ?selected=${N===v.value}
            >
              ${v.label}
            </option>`)}
      </select>`:u==="running"?l`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${$}
      >
        <option value="started" ?selected=${$==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${$==="repo"}>
          레포순
        </option>
      </select>`:u==="pr_wait"&&f>0?l`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:u==="done"?l`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${w}
      >
        ${Ar.map(v=>l`<option value=${v.value} ?selected=${w===v.value}>
              ${v.label}
            </option>`)}
      </select>`:""}function G(u){let f=s&&s.get?s.get():null,v=s&&s.getWorkspacesState?s.getWorkspacesState():[],x=u===void 0?s&&s.crossLanes?s.crossLanes():void 0:u,B={done_since:cr(w,p()),running_sort:$,candidate_filter:E,candidate_sort:N};return x!==void 0&&(B.cross_lanes=x),Zi(f,v,B)}function fe(){let u=p();H=G(),X=new Map;for(let f of[...H.runnable,...H.queue,...H.running,...H.pr_wait,...H.done])!f.non_occupying&&!X.has(f.id)&&X.set(f.id,f);Ve(K(u),M),k()?.render(),g(),O()}function g(){let u=new Map;for(let f of H.queue_groups)u.set(f.root_dir,f.auto_advance);for(let f of Array.from(M.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let v=f.closest(".mon2-item")?.getAttribute("data-root-dir")||"",x=u.get(v);typeof x=="boolean"&&f.setAttribute("title",`${f.textContent||""} \xB7 ${x?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function k(){if(se)return se;let u=M.querySelector(".mon2-deck");return u?(se=Ld(u,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>H.done,rangeLabel:S,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:Z,onFocusChange:f=>{U=f,O()}}),se):null}function O(){M.classList.toggle("has-focus",U!==null);for(let u of Array.from(M.querySelectorAll(".mon2-sec[data-root-dir]")))u.classList.toggle("is-focus",U!==null&&u.getAttribute("data-root-dir")===U);for(let u of Array.from(M.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let f=X.get(u.getAttribute("data-bead-id")||"");u.classList.toggle("is-focus",U!==null&&!!f&&f.root_dir===U)}for(let u of Array.from(M.querySelectorAll(".mon2-crow[data-root-dir]")))u.classList.toggle("is-focus",U!==null&&u.getAttribute("data-root-dir")===U)}function Q(u,f){let v=a?a():void 0;if(!f||!v||f===v||!c){r(u);return}c(f).then(()=>{r(u)}).catch(x=>{n("workspace switch for %s failed: %o",f,x)})}function Z(u){if(!u)return;let f=a?a():void 0,v=()=>{try{d?.gotoView("worker")}catch(x){n("gotoView(worker) failed: %o",x)}};if(!c||f&&f===u){v();return}c(u).then(v).catch(x=>{n("workspace switch for %s failed: %o",u,x),ae("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function _e(u){cn(u).then(f=>{ae(f?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",f?"success":"error",1400)})}function Te(u){let f=X.get(u)||null;return{item:f,root_dir:f?f.root_dir:"",revision:f?f.expected_revision:0}}function $e(u){if(typeof u=="string"&&u.length>0)return u;if(u&&typeof u=="object"){let f=u;if(typeof f.message=="string"&&f.message.length>0)return f.message;if(typeof f.error=="string"&&f.error.length>0)return f.error;if(f.error&&typeof f.error=="object"&&typeof f.error.message=="string")return f.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function st(u,f,v){let x=H.owner_of[f];if(typeof x!="string"||x.length===0){ae(`${f}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await De(u,{a:f,b:v},x)}catch(B){ae($e(B),"error")}fe()}function dt(u){return H.runnable.some(f=>f.id===u)||H.parallel_rows.some(f=>f.id===u)?!0:H.queue_groups.some(f=>f.sublanes.serial.some(v=>v.items.some(x=>x.id===u)))}function Se(u){!u||!dt(u)||(q=q&&q.bead_id===u?null:{bead_id:u,query:""},fe())}function bt(){let u=new Map,f=s&&s.get?s.get():null,v=x=>Array.isArray(x)?x.filter(B=>typeof B=="string"&&B.length>0):[];for(let x of Array.isArray(f)?f:[]){if(!x||typeof x!="object")continue;let B=x.bead_blocked_by&&typeof x.bead_blocked_by=="object"?x.bead_blocked_by:{};for(let[W,ne]of Object.entries(B))Array.isArray(ne)&&u.set(W,v(ne));for(let W of[...Array.isArray(x.runnable)?x.runnable:[],...Array.isArray(x.session_active)?x.session_active:[]])W&&typeof W.bead_id=="string"&&Array.isArray(W.blocked_by)&&W.blocked_by.length>0&&u.set(W.bead_id,v(W.blocked_by))}return u}function gt(){let u=bt();for(let f of D){let v=(u.get(f.a)||[]).slice();f.type==="dep-remove"?u.set(f.a,v.filter(x=>x!==f.b)):v.includes(f.b)||u.set(f.a,[...v,f.b])}return u}function Ft(u=H){let f=new Map,v=new Map,x=new Set,B=new Set;for(let ne of u.chain_lanes){f.set(ne.lane_id,{status:ne.status,entries:ne.rows.map(me=>({bead_id:me.id,root_dir:me.root_dir}))});for(let me of ne.rows)v.set(me.id,ne.lane_id),me.fixed&&x.add(me.id),me.unplaced||B.add(me.id)}let W=new Map;for(let ne of u.parallel_rows)typeof ne.queue_index=="number"&&W.set(ne.id,ne.queue_index);for(let ne of u.queue_groups)for(let me of ne.sublanes.serial)for(let Je of me.items)typeof Je.queue_index=="number"&&W.set(Je.id,Je.queue_index);return{blocked_by_map:gt(),owner_of:new Map(Object.entries(u.owner_of)),cross_lanes:f,owner_lane_of:v,fixed_members:x,placed_members:B,parallel_rows:u.parallel_rows.map(ne=>({bead_id:ne.id,root_dir:ne.root_dir,queue_index:ne.queue_index??0})),parallel_raw_length:new Map(Object.entries(u.parallel_raw_length)),queue_index_of:W}}function Gt(u,f){let v=X.get(f);if(v&&v.root_dir===u)return v.expected_revision;let x=H.queue_groups.find(B=>B.root_dir===u);return x?x.revision:0}async function Nt(u,f,v){try{if(u.type==="worker-queue-place"||u.type==="worker-queue-reorder"||u.type==="worker-queue-remove"){let x=await ge(u.type,u.payload,u.root_dir,v.get(u.root_dir)??Gt(u.root_dir,f));return!x||typeof x.applied!="boolean"?(ae("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),!1):(x.queue&&typeof x.queue.revision=="number"&&v.set(u.root_dir,x.queue.revision),x.conflict?(ae("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):x.applied===!1?(ae(x.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${x.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0)}return(u.type==="dep-add"||u.type==="dep-remove")&&await De(u.type,{a:u.a,b:u.b},u.root_dir),!0}catch(x){return ae($e(x),"error"),!1}}function Dt(u){(u.type==="dep-add"||u.type==="dep-remove")&&(D=[...D,{type:u.type,a:u.a,b:u.b}])}async function pn(u,f){if(!o)return{ok:!1};try{let v=await o(u.type,{...u.payload,expected_revision:f});return!v||typeof v.revision!="number"?(ae("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:v.revision}}catch(v){let x=v,B=x&&x.code==="conflict"?x.details?.cross_lanes:null;return B&&typeof B.revision=="number"&&Array.isArray(B.lanes)?{ok:!1,conflict:B}:(ae($e(v),"error"),{ok:!1})}}async function At(u,f,v){let x=new Map,B=u.ops.slice(0,u.lane_op_index),W=u.ops.slice(u.lane_op_index);for(let me of B){if(!await Nt(me,v,x))return{done:!0};Dt(me)}let ne=f;for(let me of u.lane_ops){if(ne===null)return ae("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Je=await pn(me,ne);if(!Je.ok)return Je.conflict?{done:!1,conflict:Je.conflict}:{done:!0};ne=Je.revision}for(let me of W){if(!await Nt(me,v,x))return{done:!0};Dt(me)}return{done:!0}}async function Mt(u,f){D=[];let v=H;for(let x=0;;x+=1){let B=u(Ft(v));if("refused"in B){ae(B.refused,"error");break}let W=await At(B,v.cross_lanes_revision,f);if(W.done)break;if(x>=1){ae("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}v=G(W.conflict)}D=[],fe()}async function Ue(u,f){await Mt(v=>Ui(u,f,v),u.bead_id)}async function Xt(u,f){if(u==="create"){await Mt(v=>Wi(null,v),"");return}if(u==="remove"){let v=H.chain_lanes.find(x=>x.lane_id===f);if(v&&!v.draft){let x=v.rows.filter((B,W)=>W===0?!1:!B.mismatch).length;if(!b(`\uC758\uC874 ${x}\uAC1C\uB97C \uD568\uAED8 \uC81C\uAC70\uD569\uB2C8\uB2E4`))return}await Mt(x=>qd(f,x),"");return}await Mt(v=>u==="confirm"?Md(f,v):Nd(f,v),"")}async function Qt(u,f){let v=X.get(u);if(!v){fe();return}let x={kind:"candidate",bead_id:u,root_dir:v.root_dir};if(f==="new-lane"){await Mt(B=>Wi({bead_id:u,root_dir:v.root_dir},B),u);return}if(f.startsWith("lane:")){let B=f.slice(5);if(!H.chain_lanes.find(ne=>ne.lane_id===B)){fe();return}await Mt(ne=>Ui(x,{kind:"chain",lane_id:B,marker_index:(ne.cross_lanes.get(B)?.entries??[]).length},ne),u);return}if(f.startsWith("serial:")){let B=f.slice(7),W=(v.place_lanes||[]).find(ne=>ne.id===B);await Ue(x,{kind:"repo-serial",root_dir:v.root_dir,lane_id:B,index:W?W.index:0});return}await Ue(x,{kind:"parallel",marker_index:H.parallel_rows.length})}async function et(u,f){let v=H.parallel_rows,x=v.findIndex(jt=>jt.id===u);if(x<0)return;let B=v[x].root_dir,W=[];v.forEach((jt,In)=>{jt.root_dir===B&&W.push(In)});let ne=W.indexOf(x),me=W[ne+f];if(typeof me!="number")return;let Je=f===-1?me:W[ne+2]??Math.min(v.length,me+1);await Ue({kind:"parallel",bead_id:u,root_dir:B,queue_index:v[x].queue_index??0},{kind:"parallel",marker_index:Je})}async function Ie(u){for(let f of H.chain_lanes){let v=f.rows.find(x=>x.id===u);if(v){await Ue({kind:"chain",bead_id:u,root_dir:v.root_dir,lane_id:f.lane_id,...typeof v.queue_index=="number"?{queue_index:v.queue_index}:{}},{kind:"parallel",marker_index:H.parallel_rows.length});return}}}let R=null,de=!1,Ee=null;function ot(){Ee!==null&&clearTimeout(Ee),Ee=setTimeout(()=>{Ee=null,de=!1},0)}function vt(u,f){let v=f&&typeof f.closest=="function"?f.closest("[data-row-index]"):null;if(v&&u.contains(v)){let x=Number(v.getAttribute("data-row-index"));return Number.isFinite(x)?x:0}return u.querySelectorAll("[data-row-index]").length}function pt(u){let f=u.target,v=typeof f?.closest=="function"?f.closest("[data-drop]"):null;if(!v||!R)return null;let x=v.getAttribute("data-drop");if(x==="candidate")return{zone:v,target:{kind:"candidate"}};if(x==="parallel")return{zone:v,target:{kind:"parallel",marker_index:vt(v,f)}};if(x==="chain")return{zone:v,target:{kind:"chain",lane_id:v.getAttribute("data-lane-id")||"",marker_index:vt(v,f)}};if(x==="repo-serial"){let B=v.getAttribute("data-root-dir")||"";if(B!==R.root_dir)return null;let W=typeof f?.closest=="function"?f.closest("[data-queue-index]"):null,ne=W&&v.contains(W)?W.getAttribute("data-queue-index"):v.getAttribute("data-lane-length"),me=Number(ne);return{zone:v,target:{kind:"repo-serial",root_dir:B,lane_id:v.getAttribute("data-lane-id")||"",index:Number.isFinite(me)?me:0}}}return null}function Rt(){for(let u of Array.from(M.querySelectorAll(".is-drop-over")))u.classList.remove("is-drop-over")}function It(u){let f=u.target,v=typeof f?.closest=="function"?f.closest('[draggable="true"][data-bead-id]'):null,x=v?v.closest("[data-drag-kind]"):null;if(!x)return;let B=x.getAttribute("data-bead-id")||"",W=x.getAttribute("data-drag-kind")||"",ne=x.getAttribute("data-root-dir")||"";if(!B||!W||!ne)return;let me=x.getAttribute("data-queue-index")||"",Je=Number(me),jt=x.getAttribute("data-lane-id")||"";R={kind:W,bead_id:B,root_dir:ne,...me!==""&&Number.isFinite(Je)?{queue_index:Je}:{},...jt?{lane_id:jt}:{}},de=!0,ie=null,M.classList.add("is-dragging");try{u.dataTransfer?.setData("text/plain",B),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function Ht(u){let f=pt(u);f&&(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),f.zone.classList.add("is-drop-over"))}function Jt(u){let f=u.target;typeof f?.closest=="function"&&f.closest("[data-drop]")?.classList.remove("is-drop-over")}function wt(){R=null,Rt(),M.classList.remove("is-dragging"),ot()}function en(u){let f=pt(u),v=R;R=null,Rt(),M.classList.remove("is-dragging"),!(!f||!v)&&(u.preventDefault(),Ue(v,f.target))}function fn(u){return{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,status:u.run_state==="running"?"running":u.run_state,worktree:u.root_dir}}function Ln(u,f){let{item:v,root_dir:x,revision:B}=Te(f),W=v?.attempt_id||"",ne=u.classList;if(ne.contains("mon2-rowops__up")||ne.contains("mon2-rowops__down")){et(f,ne.contains("mon2-rowops__up")?-1:1);return}if(ne.contains("mon2-rowops__remove")){ge("worker-queue-remove",{bead_id:f},x,B);return}if(ne.contains("mon2-crow__detach")){Ie(f);return}if(ne.contains("mon-dep__btn")){Se(f);return}if(ne.contains("worker-dep__open")){Se(f);return}if(ne.contains("mon-lane__chip")){let me=u.getAttribute("data-lane-id")||"";M.querySelector(`.mon2-clane[data-lane-id="${me}"]`)?.scrollIntoView({block:"nearest"});return}if(ne.contains("mon-deppanel__unlink")){let me=u.getAttribute("data-dep-a")||"",Je=u.getAttribute("data-dep-b")||"";b(`${Je}\uAC00 ${me}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&st("dep-remove",me,Je);return}if(ne.contains("mon-deppanel__cand")){let me=u.getAttribute("data-dep-cand")||"";q&&me&&st("dep-add",q.bead_id,me);return}if(ne.contains("mon-overlap__chip")){let me=u.getAttribute("data-overlap-id")||"";z=!!z&&z.bead_id===f&&z.counterpart_id===me?null:{bead_id:f,counterpart_id:me},fe();return}if(ne.contains("mon-overlap__place")){_t(f,u.getAttribute("data-counterpart-id")||"");return}if(ne.contains("worker-card__place")){ie=ie===f?null:f,fe();return}if(ne.contains("worker-card__place-cancel")){ie=null,fe();return}if(ne.contains("worker-card__place-lane")){let me=u.getAttribute("data-lane")||"parallel";ie=null,Qt(f,me);return}if(ne.contains("rtile__session")){Y=W,W&&v&&(re.hidden=!1,xe.open({attempt_id:W,root_dir:x,meta:fn(v)})),fe();return}if(ne.contains("rtile__pause")){De("worker-attempt-pause",{attempt_id:W},x);return}if(ne.contains("rtile__resume")){Ir().then(me=>{if(me!==null)return ee("worker-attempt-resume",{attempt_id:W,...me!==""?{instructions:me}:{}},x,B)});return}if(ne.contains("rtile__dismiss")){ge("worker-attempt-dismiss",{attempt_id:W},x,B);return}if(ne.contains("rtile__discard")){if(!b($s(f,"unmerged")))return;ve({bead_id:f,...W?{attempt_id:W}:{},...u.dataset.operationId?{operation_id:u.dataset.operationId}:{}},x,B);return}if(ne.contains("worker-mini__merge")){let me=V(x,f);me?.mismatch&&me.continuation===null?ce(x,f,B,me.mismatch):ge("worker-merge-queue-add",{bead_id:f},x,B);return}if(ne.contains("worker-mini__merge-cancel")){ge("worker-merge-queue-remove",{bead_id:f},x,B);return}if(ne.contains("worker-mini__discard")){let me=u.dataset.discardMode==="merged"?"merged":"unmerged";if(!b($s(f,me)))return;ve({bead_id:f,...u.dataset.attemptId?{attempt_id:u.dataset.attemptId}:{},...u.dataset.operationId?{operation_id:u.dataset.operationId}:{}},x,B);return}if(ne.contains("worker-mini__revise-fix")){ee("worker-revise-fix",{bead_id:f},x,B);return}ne.contains("worker-mini__revise-approve")&&ge("worker-revise-approve",{bead_id:f},x,B)}function T(u){let f=de;de=!1;let v=u.target;if(!v||typeof v.closest!="function"||v.closest("dialog")||v.closest(".worker-drawer-overlay")||v.closest("a"))return;let x=v.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(x){u.preventDefault();let on=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||x.textContent?.trim()||"";on&&_e(on);return}let B=v.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(B){u.preventDefault();let Sn=B.getAttribute("data-root-dir")||X.get(v.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||B.getAttribute("title")||"";Z(Sn);return}let W=v.closest(".mon2-sec__toggle");if(W){u.preventDefault(),P(W.getAttribute("data-root-dir")||"");return}let ne=v.closest(".mon2-area__toggle");if(ne){u.preventDefault(),Me(ne.getAttribute("data-area")||"parallel");return}if(v.closest(".mon2-newlane")){u.preventDefault(),Xt("create","");return}let me=v.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove");if(me){u.preventDefault();let Sn=me.getAttribute("data-lane-id")||"";Xt(me.classList.contains("mon2-clane__confirm")?"confirm":me.classList.contains("mon2-clane__reapply")?"reapply":"remove",Sn);return}if(v.closest(".mon-merge-all")){u.preventDefault(),le();return}let Je=v.closest(".mon-filter__spec");if(Je){u.preventDefault(),E={...E,spec:Je.getAttribute("data-spec")||"all"},op(E),fe();return}let jt=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!jt)return;let In=jt.getAttribute("data-bead-id")||"",Bt=v.closest("button");if(Bt){u.preventDefault(),Ln(Bt,In);return}In&&!f&&(u.preventDefault(),Q(In,jt.getAttribute("data-root-dir")||Te(In).root_dir))}function L(u){let f=u.target;if(!f||typeof f.closest!="function")return;let v=f.closest(".mon-filter__blocked");if(v){E={...E,show_blocked:v.checked},op(E),fe();return}let x=f.closest(".mon-candidate-sort");if(x){N=Cs.some(ne=>ne.value===x.value)?x.value:"repo_spec",uh(N),fe();return}let B=f.closest(".mon-running-sort");if(B){$=B.value==="repo"?"repo":"started",mh($),fe();return}let W=f.closest(".mon-done-range");W&&(w=En(W.value),fh(w),fe())}function Pe(u){let f=u.target,v=f&&typeof f.closest=="function"?B=>f.closest(B):()=>null,x=!1;z&&!v(".mon-overlap__popover, .mon-overlap__chip")&&(z=null,x=!0),q&&!v(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(q=null,x=!0),x&&fe()}function _(u){u.key!=="Escape"||!z&&!q||(z=null,q=null,fe())}function y(u){let f=u.target;!f||typeof f.closest!="function"||!f.closest(".mon-deppanel__search")||!q||(q={...q,query:f.value},fe())}e.addEventListener("click",T),e.addEventListener("change",L),e.addEventListener("input",y),document.addEventListener("click",Pe),document.addEventListener("keydown",_),e.addEventListener("dragstart",It),e.addEventListener("dragover",Ht),e.addEventListener("dragleave",Jt),e.addEventListener("drop",en),e.addEventListener("dragend",wt),s&&typeof s.subscribe=="function"&&(ke=s.subscribe(()=>{try{ye.clear(),fe()}catch{}}));function m(){he!==null&&(clearInterval(he),he=null)}function A(){Ee!==null&&(clearTimeout(Ee),Ee=null)}return{load(){n("load"),fe(),he===null&&(he=setInterval(()=>{try{fe()}catch{}},gh))},pause(){m()},clear(){m(),A(),ke&&(ke(),ke=null),xe.destroy(),re.hidden=!0,se?.destroy(),se=null,e.removeEventListener("click",T),e.removeEventListener("change",L),e.removeEventListener("input",y),document.removeEventListener("click",Pe),document.removeEventListener("keydown",_),e.removeEventListener("dragstart",It),e.removeEventListener("dragover",Ht),e.removeEventListener("dragleave",Jt),e.removeEventListener("drop",en),e.removeEventListener("dragend",wt),e.replaceChildren()}}}function mp(e,t,n){let r=St("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(w){return $=>{$.preventDefault();let E=w==="monitor"&&c()==="monitor"?"worker":w;r("click tab %s",E),n.gotoView(E)}}function c(){let w=t.getState();return w.view==="worker"||w.view==="monitor"?w.view:"board"}function d(){let w=c();return l`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${w==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function p(){let w=c();return l`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${w==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${w==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function b(){s&&Ve(d(),s),o&&Ve(p(),o)}return b(),a=t.subscribe(()=>b()),{destroy(){a&&(a(),a=null),s&&Ve(l``,s),o&&Ve(l``,o)}}}var gp=["bug","feature","task","epic","chore"];function bp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var hp=["Critical","High","Medium","Low","Backlog"];function yp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),c=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),b=n.querySelector("#btn-create"),w=n.querySelector(".new-issue__close");function $(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let U of gp){let S=document.createElement("option");S.value=U,S.textContent=bp(U),o.appendChild(S)}a.replaceChildren();for(let U=0;U<=4;U+=1){let S=document.createElement("option");S.value=String(U);let M=hp[U]||"Medium";S.textContent=`${U} \u2013 ${M}`,a.appendChild(S)}}$();function E(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function N(D){s.disabled=D,o.disabled=D,a.disabled=D,i.disabled=D,c.disabled=D,p.disabled=D,b.disabled=D,b.textContent=D?"Creating\u2026":"Create"}function j(){d.textContent=""}function Y(D){d.textContent=D}function ie(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let U=window.localStorage.getItem("beads-ui.new.priority");U&&/^\d$/.test(U)?a.value=U:a.value="2"}catch{o.value="",a.value="2"}}function z(){let D=o.value||"",U=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),U.length>0&&window.localStorage.setItem("beads-ui.new.priority",U)}async function q(){j();let D=String(s.value||"").trim();if(D.length===0){Y("Title is required"),s.focus();return}let U=Number(a.value||"2");if(!(U>=0&&U<=4)){Y("Priority must be 0..4"),a.focus();return}let S=String(o.value||""),M=String(c.value||""),re={title:D};S.length>0&&(re.type=S),String(U).length>0&&(re.priority=U),M.length>0&&(re.description=M),N(!0);try{await t("create-issue",re)}catch{N(!1),Y("Failed to create issue");return}z(),N(!1),E()}return n.addEventListener("cancel",D=>{D.preventDefault(),E()}),w.addEventListener("click",()=>E()),p.addEventListener("click",()=>E()),n.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),q())}),r.addEventListener("submit",D=>{D.preventDefault(),q()}),{open(){r.reset(),j(),ie();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){E()}}}var yh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function vh(e,t){return ja(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function vp(e,t,n){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=vh(r,e);return l`<button
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
  `}function wp(e,t,n){return l`
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
  `}function kp(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${yh.map(([n,r])=>l`<label class="settings-dialog__toggle">
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
  `}var wh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function $p(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(X=>ae(X,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,d="",p=null;function b(){if(p)return p;let X=a.querySelector('[data-pane="execution"]');return X?(p=Jo(X,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:ye=>t.queueStore?.set?.(ye)}),p):null}function w(){return l`
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
    `}function $(){let X=r.get();return l`
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
              ${vp(X,s(),Y)}
              ${wp(X,d,{onDraft:ye=>{d=ye},onAdd:ie,onRemove:z})}
              ${kp(X,q)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function E(X){let ye=r.get();if(ye)try{let ke=await n("display-policy-set",{expected_revision:ye.revision,policy:X(ye)});N(ke),ke&&ke.conflict&&ke.policy&&(ke=await n("display-policy-set",{expected_revision:ke.policy.revision,policy:X(ke.policy)}),N(ke)),ke&&ke.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function N(X){X&&X.policy&&typeof X.policy=="object"&&r.set(X.policy)}function j(X){E(X)}function Y(X){let ye=r.get();if(!ye)return;let ke=!kh(X,ye);j(he=>$h(X,he,ke))}function ie(){let X=d.trim();X.length!==0&&(d="",j(ye=>ye.hidden_prefixes.includes(X)?{hidden_prefixes:ye.hidden_prefixes}:{hidden_prefixes:[...ye.hidden_prefixes,X]}),D())}function z(X){j(ye=>({hidden_prefixes:ye.hidden_prefixes.filter(ke=>ke!==X)}))}function q(X){let ye=r.get();if(!ye)return;let ke=ye.chips[X]===!1;j(()=>({chips:{[X]:ke}}))}function D(){Ve(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${wh.map(X=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${X.id}
                  aria-selected=${String(i===X.id)}
                  aria-controls=${`settings-pane-${X.id}`}
                  @click=${()=>U(X.id)}
                >
                  <span class="settings-dialog__glyph">${X.glyph}</span>
                  ${X.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${H}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${w()} ${$()}
          </div>
        </div>
      `,a),b()}function U(X){i=X,D()}let S=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",S),a.addEventListener("cancel",S);let M=X=>{X.target===a&&H()};a.addEventListener("click",M);let re=null;r.subscribe&&(re=r.subscribe(()=>{c&&D()}));let Ae=null;t.implPresetStore?.subscribe&&(Ae=t.implPresetStore.subscribe(()=>{c&&p?.render()}));function be(X="execution"){c||(c=!0,t.onOpenChange?.(!0),i=X,d="",D(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),b()?.load())}function H(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:be,close:H,sessionDraft:()=>p?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",S),a.removeEventListener("cancel",S),a.removeEventListener("click",M),re&&(re(),re=null),Ae&&(Ae(),Ae=null),p?.destroy(),p=null,a.remove()}}}function kh(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function $h(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var xh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],xp="usage-meter-card",Ah="usage-meter-layer",Xi=600,Sh=["token_expired","relogin_required"];function Ap(e){return String(e).padStart(2,"0")}function Eh(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Sp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Ap(r.getHours())}:${Ap(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${xh[r.getMonth()]} ${r.getDate()} ${o}`;return`${Eh(n,t)} \xB7 ${i}`}function Th(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Ep(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Tp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Cp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Op(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Ch(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Op(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Rh(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let a=Ch(o);a&&r.push(a)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?Op(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Oh(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Rh(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Lp(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Lh(e,t){return!e.held||Lp(e,t)<=Xi?e:{...e,available:!1,windows:[],accounts:[]}}function Rp(e,t){return`${e}:${t}`}function Ip(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function d(){Ve(l``,e),e.hidden=!0,b()}function p(){if(c===null){let he=e.ownerDocument;c=he.createElement("div"),c.id=Ah,c.className="usage-meter__layer",he.body.appendChild(c)}return c}function b(){c!==null&&(Ve(l``,c),c.remove(),c=null)}function w(he){n!==he&&(n===null&&(document.addEventListener("mousedown",E),document.addEventListener("keydown",j),window.addEventListener("resize",N)),n=he)}function $(){n!==null&&(n=null,document.removeEventListener("mousedown",E),document.removeEventListener("keydown",j),window.removeEventListener("resize",N))}function E(he){let se=he.target;se&&(e.contains(se)||c!==null&&c.contains(se))||($(),H())}function N(){H()}function j(he){he.key==="Escape"&&($(),H())}function Y(he){n===he?$():w(he),H()}function ie(){$(),H()}async function z(he,se){if(r.has(he.key))return;let xe=Rp(he.key,se);r.set(he.key,se),a.delete(xe),H();let ge=null;try{ge=await(await fetch(he.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:se})})).json()}catch{ge=null}if(t)return;if(r.delete(he.key),!ge||ge.ok!==!0){let ee=ge&&typeof ge.error=="string"&&ge.error.length>0?ge.error:"network_error";a.set(xe,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ee}`}),H();return}let V=Array.isArray(ge.warnings)?ge.warnings.filter(ee=>typeof ee=="string"&&ee.length>0):[];V.length>0&&a.set(xe,{kind:"warn",text:V.join(" \xB7 ")}),H(),await ke()}function q(he,se,xe,ge){let V=Tp(he.pct),ce=`resets ${Sp(he.resetsAt,ge)}${se?` \xB7 ${xe}`:""}`;return l`<span
      class="usage-meter__window ${Ep(V)}"
      style=${`--progress: ${V}%`}
      title=${ce}
    >
      <span class="usage-meter__label">${he.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${V}%</span>
    </span>`}function D(he,se,xe){let ge=Lp(se,xe),V=se.available&&(se.held||ge>Xi),ee=V?`${Math.floor(ge/60)}\uBD84 \uC804 \uCE21\uC815`:"",ce=se.accounts.filter(ze=>!ze.active).length,ve=`usage-meter__group${V?" usage-meter__group--stale":""}`,De=l`<span class="usage-meter__provider"
        >${he.label}</span
      >
      ${se.available?se.windows.map(ze=>q(ze,V,ee,xe)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ce>0?l`<span class="usage-meter__badge">+${ce}</span>`:""}`;if(se.accounts.length===0)return l`<span
        class=${ve}
        aria-label=${`${he.label} usage`}
        >${De}</span
      >`;let le=n===he.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${ve}`}
      aria-label=${`${he.label} usage`}
      aria-expanded=${le?"true":"false"}
      aria-controls=${xp}
      @click=${()=>Y(he.key)}
    >
      ${De}
    </button>`}function U(he,se){return l`<span class="usage-meter" aria-label="Usage">
      ${he.map(xe=>D(xe.provider,xe.snapshot,se))}
    </span>`}function S(he,se){let xe=Tp(he.pct),ge=Sp(he.resetsAt,se);return l`<span
      class="usage-meter__account-window ${Ep(xe)}"
      style=${`--progress: ${xe}%`}
    >
      <span class="usage-meter__account-key">${he.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${xe}%</span>
      <span class="usage-meter__account-reset"
        >${ge.length>0?`\u21BB ${ge}`:""}</span
      >
    </span>`}function M(he,se){return Sh.includes(se)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${he.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function re(he,se,xe){let ge=se.status==="ok",V=typeof se.ageSeconds=="number"&&se.ageSeconds>Xi,ee=a.get(Rp(he.key,se.number)),ce=r.get(he.key),ve=ce!==void 0,De=ce===se.number,le=["usage-meter__account"];return se.active&&le.push("usage-meter__account--active"),ge||le.push("usage-meter__account--unavailable"),V&&le.push("usage-meter__account--stale"),l`<div class=${le.join(" ")}>
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
              >${Th(se.ageSeconds)}</span
            >`}
        ${se.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ve}
              @click=${()=>{z(he,se.number)}}
            >
              ${De?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${ge?l`<div class="usage-meter__account-windows">
            ${se.windows.map(ze=>S(ze,xe))}
          </div>`:l`<div class="usage-meter__account-status">
            ${M(he,se.status)}
          </div>`}
      ${ee===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${ee.kind}"
          >
            ${ee.text}
          </div>`}
    </div>`}function Ae(he,se,xe){let ge=se.accounts.filter(V=>V.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${he.label} · 활성 ${ge} / 전체
        ${se.accounts.length}
      </h2>
      ${se.accounts.map(V=>re(he,V,xe))}
    </section>`}function be(he,se){return l`<div
      class="usage-meter__card"
      id=${xp}
      role="dialog"
      aria-label=${`${he.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${Ae(he.provider,he.snapshot,se)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function H(){let he=Date.now(),se=[];for(let ge of Cp){let V=o.get(ge.key);V&&se.push({provider:ge,snapshot:Lh(V,he)})}if(se.length===0){$(),d();return}let xe=se.find(ge=>ge.provider.key===n&&ge.snapshot.accounts.length>0);xe||$(),Ve(U(se,he),e),e.hidden=!1,xe?X(xe,he):b()}function X(he,se){let xe=p(),ge=e.getBoundingClientRect(),V=e.ownerDocument.documentElement.clientWidth;xe.style.setProperty("--usage-meter-anchor-top",`${ge.bottom}px`),xe.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,V-ge.right)}px`),Ve(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ie}
        ></div>
        ${be(he,se)}`,xe)}async function ye(he){try{let se=await fetch(he.endpoint);return se.ok?Oh(await se.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function ke(){i+=1;let he=i,se=await Promise.all(Cp.map(async xe=>({provider:xe,read:await ye(xe)})));if(!(t||he!==i)){for(let xe of se){let ge=xe.provider.key;if(xe.read.kind==="ok"){o.set(ge,xe.read.snapshot);continue}if(xe.read.kind==="empty"){o.delete(ge);continue}let V=o.get(ge);V!==void 0&&!V.held&&o.set(ge,{...V,held:!0})}H()}}return d(),ke(),s=setInterval(()=>{ke()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),$(),d()}}}function Pp(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Ih="worker-ineligible";function Qi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Dp(e){return Qi(e).includes(Ih)}var Ph="worker-serial";function Ji(e){return Qi(e).includes(Ph)}function el(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Dh=new Set(["done","failed","orphaned","stopped","discarded"]),Mh={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Nh={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},qh={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function tl(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:qh[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Mp(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,d=new Map,p=!1,b=null,w=null,$=null,E=new Set,N=!1,j=0,Y=null,ie=new Set;function z(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function q(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function D(){return o&&o()||""}async function U(){if(!s)return;let g=++j;N=!0,$=null,E.clear(),He();try{let k=await s("worker-parallel-analysis-targets",{root_dir:D()});if(g!==j||!Re)return;let O=Array.isArray(k?.qualified)?k.qualified:[],Q=Array.isArray(k?.excluded)?k.excluded:[];$={qualified:O,excluded:Q};for(let Z of O)Z&&typeof Z.id=="string"&&E.add(Z.id)}catch{g===j&&Re&&($={qualified:[],excluded:[]},ae("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{g===j&&(N=!1,Re&&He())}}function S(g){return Array.isArray(g.runs)?g.runs:[]}function M(){let g=z(),k=new Set;for(let O of Object.values(g.attempts||{})){let Q=O;Q&&typeof Q.bead_id=="string"&&!Dh.has(Q.status)&&k.add(Q.bead_id)}for(let O of Array.isArray(g.pr_wait)?g.pr_wait:[])O&&typeof O.bead_id=="string"&&k.add(O.bead_id);for(let O of Object.values(g.discard_operations||{})){let Q=O;Q&&Q.phase!=="done"&&typeof Q.bead_id=="string"&&k.add(Q.bead_id)}return k}function re(g){return g.filter(k=>Ae(k)===null)}function Ae(g){let k=z();for(let O of Array.isArray(k.serial_lanes)?k.serial_lanes:[])if(Array.isArray(O?.entries)&&O.entries.some(Q=>Q.bead_id===g))return O.id;return(Array.isArray(k.queue)?k.queue:[]).some(O=>O.bead_id===g)?"parallel":null}function be(g,k){let O=c.get(g);return O||[...k.order]}function H(g){if(g.length<2)return!1;let k=Ae(g[0]);if(!k||k==="parallel")return!1;let O=z(),Q=(Array.isArray(O.serial_lanes)?O.serial_lanes:[]).find(_e=>_e.id===k)?.entries.map(_e=>_e.bead_id);if(!Array.isArray(Q))return!1;let Z=g.map(_e=>Q.indexOf(_e));return Z.every(_e=>_e>=0)&&Z.every((_e,Te)=>Te===0||_e>Z[Te-1])}function X(){let g=z(),k=Array.isArray(g.serial_lanes)?g.serial_lanes:[],O=k.find(Q=>Array.isArray(Q.entries)&&Q.entries.length===0);return O?O.id:k[0]?.id||"s1"}function ye(g){let k=z().bead_titles||{};return typeof k[g]=="string"?k[g]:g}async function ke(g,k){if(!s||p)return null;p=!0,He();try{return await s(g,k)}finally{p=!1,He()}}async function he(g){r?.setPending?.(!0);try{let k=await ke("worker-parallel-analysis-start",{force:g,target_ids:Array.from(E)});k&&k.applied===!1&&k.reason&&(k.reason==="target_not_qualified"&&Array.isArray(k.detail)?ae(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${k.detail.join(", ")}`,"error",3200):ae(`\uBD84\uC11D \uC2E4\uD328: ${k.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function se(){let g=q().job;!s||!g||await s("worker-parallel-analysis-cancel",{job_id:g.job_id})}async function xe(g){if(!(!s||ie.has(g))){ie.add(g),He();try{let k=await s("worker-parallel-analysis-prompt",{root_dir:D(),run_id:g});if(!Re)return;if(k?.ok===!0&&typeof k.prompt=="string"){Y={run_id:g,prompt:k.prompt};return}ae(k?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{ie.delete(g),He()}}}function ge(){Y=null,He()}async function V(){if(!Y)return;let g=await cn(Y.prompt);ae(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)}function ee(g,k){a&&a(g,tl(k))}function ce(){return z().runner_catalog}function ve(g){return Object.keys(ce()?.runners?.[g]?.models||{})}function De(g){let k=ve(g),O=ce()?.runners?.[g]?.default_model;return typeof O=="string"&&k.includes(O)?O:k[0]||""}function le(){let g=q().settings,k=b||g.runner||"claude",O=ve(k),Q=b?De(k):g.model||O[0]||"",Z=el(ce(),k,Q),_e=g.effort||"",Te=Z.includes(_e)?_e:Z[0]||"";return{runner:k,model:Q,effort:Te,models:O,efforts:Z}}async function ze(g){let k=q().settings,O=await ke("worker-parallel-analysis-settings-update",{expected_revision:k.revision,runner:g.runner,model:g.model,effort:g.effort});(!O||O.applied!==!0)&&(b=null,He(),O&&O.reason&&ae(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${O.reason}`,"error",2800))}function P(g){b=g,He();let k=le();ze({runner:g,model:k.model,effort:k.effort})}function ue(g){let k=le(),O=el(ce(),k.runner,g);ze({runner:k.runner,model:g,effort:O.includes(k.effort)?k.effort:O[0]||""})}function Me(g){let k=le();ze({runner:k.runner,model:k.model,effort:g})}async function qe(g,k){if(!s||p)return;let O=be(g,k),Q=q();if(O.length<2||!Q.last_good){ae("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let Z=d.get(g)||X(),_e=()=>({snapshot_digest:Q.last_good.identity_digest,group_index:g,lane:Z,ordered_bead_ids:O,expected_revision:z().revision});p=!0,He();try{let Te=await s("worker-parallel-analysis-submit",_e());Te&&Te.queue&&n&&n.set(Te.queue),Te&&Te.applied!==!0&&Te.conflict===!0&&(Te=await s("worker-parallel-analysis-submit",_e()),Te&&Te.queue&&n&&n.set(Te.queue)),Te&&Te.applied===!0?(c.delete(g),ae(`\uC9C1\uB82C \uB808\uC778 ${Z}\uC5D0 ${O.length}\uAC1C \uBC30\uCE58`,"success")):ae(`\uC81C\uCD9C \uAC70\uBD80: ${Te?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,He()}}function Le(g,k,O){c.set(g,be(g,k).filter(Q=>Q!==O)),He()}function We(g){c.delete(g),He()}function je(g,k,O,Q){let Z=[...be(g,k)],_e=Z.indexOf(O),Te=_e+Q;_e<0||Te<0||Te>=Z.length||(Z.splice(Te,0,...Z.splice(_e,1)),c.set(g,Z),He())}function Ye(){let g=q().settings,k=Object.keys(ce()?.runners||{}),O=le();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${Q=>P(Q.target.value)}
        >
          ${k.map(Q=>l`<option
                value=${Q}
                ?selected=${O.runner===Q}
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
          @change=${Q=>ue(Q.target.value)}
        >
          ${O.models.map(Q=>l`<option
                value=${Q}
                ?selected=${O.model===Q}
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
          @change=${Q=>Me(Q.target.value)}
        >
          ${O.efforts.map(Q=>l`<option
                value=${Q}
                ?selected=${O.effort===Q}
              >
                ${Q}
              </option>`)}
        </select>
      </label>
      ${tt(g)}
    </div>`}function tt(g){return!_t(g)||ct(g)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:g.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${g.runner}/${g.model} · effort
        ${g.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:g.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function ct(g){return g.is_default===!0&&g.compatible===!1}function _t(g){return!!(g.runner&&g.model&&g.effort)}function te(g){return _t(g)&&g.compatible!==!1}function J(g){let k=Math.max(0,Math.floor(g/1e3)),O=Math.floor(k/60),Q=k%60;return`${O}:${String(Q).padStart(2,"0")}`}function Ce(g){let k=g.job;if(k){let O=typeof k.started_at=="number"?k.started_at:0,Q=`${k.runner||"?"}/${k.model||"?"}`,Z=O?` \xB7 \uACBD\uACFC ${J(Date.now()-O)}`:"",_e=typeof k.session_id=="string"?k.session_id:"",Te=S(g).find($e=>$e.run_id===k.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${Q} · effort ${k.effort||"?"}${Z}</span
        >
        ${_e?l`<code class="pa-session-id" title=${_e}
              >${_e.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ee(k.job_id,Te||k)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Te?.prompt_saved!==!0||ie.has(k.job_id)}
          @click=${()=>{xe(k.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Oe()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Ke(g){let k=Ce(g);return k===""?"":l`<div class="pa__strip">${k}</div>`}function Oe(){return r?.isPending?.()===!0}function we(g){let k=!!g.job,O=te(g.settings),Q=$!==null&&E.size===0,Z=k||p||Oe()||N;return l`<div class="pa-meta">
      ${g.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(g.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!O||Z||Q}
        @click=${()=>{he(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!O||Z||Q}
        @click=${()=>{he(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!k}
        @click=${()=>{se()}}
      >
        취소
      </button>
    </div>`}function Be(g){return typeof g=="string"&&g.length>0?g:"\uBBF8\uBC30\uCE58"}function Ge(g,k){k?E.add(g):E.delete(g),He()}function Qe(g){let k=Array.isArray(g.scope)?g.scope:[],O=Array.isArray(g.overlaps)?g.overlaps:[];return k.length===0&&O.length===0?l``:l`<span class="pa-target__signals">
      ${k.length>0?l`<details class="pa-target__scope" title=${k.join(`
`)}>
            <summary>scope ${k.length}</summary>
            <ul>
              ${k.map(Q=>l`<li><code>${Q}</code></li>`)}
            </ul>
          </details>`:""}
      ${O.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${O.join(", ")}`}
            >겹침 ${O.join(", ")}</span
          >`:""}
    </span>`}function Ze(){let g=$?.qualified||[],k=$?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${N?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${g.length} \xB7 \uC81C\uC678 ${k.length}`}</span
        >
      </header>
      ${$&&g.length>0?l`<ul class="pa-targets__list">
            ${g.map(O=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${O.id}
                      .checked=${E.has(O.id)}
                      @change=${Q=>Ge(O.id,Q.target.checked)}
                    />
                    <span class="pa-target__title">${O.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${Qe(O)}
                    <span class="pa-target__route">${O.route}</span>
                    <span class="pa-target__lane"
                      >${Be(O.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:$&&g.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${$&&k.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${k.length}</summary>
            <ul class="pa-targets__list">
              ${k.map(O=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${O.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Mh[O.reason]||O.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${Be(O.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function rt(g){let k=typeof g.session_id=="string"&&g.session_id.length>0,O=k?g.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${g.outcome}"
        >${Nh[g.outcome]||g.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(g.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${g.runner||"?"} / ${g.model||"?"} / ${g.effort||"?"}</span
      >
      ${k?l`<code class="pa-session-id" title=${O}
            >${O.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${g.outcome==="failure"&&g.reason?l`<span class="pa-run-row__reason">${g.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ee(g.run_id,g)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${g.prompt_saved!==!0||ie.has(g.run_id)}
          @click=${()=>{xe(g.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function yt(g){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${g.length>0?l`<ul class="pa-runs__list">
            ${g.map(k=>rt(k))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Et(){return Y?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${ge}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${Y.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{V()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${ge}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Y.prompt}</pre
        >
      </section>
    </div>`:""}function it(g,k){let O=be(g,k),Q=M(),Z=O.filter(Se=>Q.has(Se)),_e=re(O),Te=H(O),$e=Array.isArray(z().serial_lanes)?z().serial_lanes:[],st=d.get(g)||X(),dt=k.eligible!==!0||O.length<2||Z.length>0||_e.length>0||Te||p;return l`<section class="pa-group" data-group-index=${String(g)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${k.confidence}</span>
        ${k.categories.map(Se=>l`<span class="pa-group__category">${Se}</span>`)}
        ${Te?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${k.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${_e.length>0?l`<span class="pa-group__stale"
              >stale — ${_e.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${k.reason}</p>
      <ol class="pa-group__members">
        ${O.map((Se,bt)=>l`<li class="pa-member" data-bead-id=${Se}>
              <span class="pa-member__seq">${bt+1}</span>
              <span class="pa-member__title">${ye(Se)}</span>
              ${Q.has(Se)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Se}
                ?disabled=${bt===0}
                aria-label=${`${Se} \uC704\uB85C`}
                @click=${()=>je(g,k,Se,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Se}
                ?disabled=${bt===O.length-1}
                aria-label=${`${Se} \uC544\uB798\uB85C`}
                @click=${()=>je(g,k,Se,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Se}
                aria-label=${`${Se} \uC81C\uC678`}
                @click=${()=>Le(g,k,Se)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${k.evidence.map(Se=>l`<li class="pa-evidence">
              <code>${Se.path}</code>
              <span class="pa-evidence__locator">${Se.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>We(g)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Se=>{d.set(g,Se.target.value),He()}}
          >
            ${$e.map((Se,bt)=>l`<option
                  value=${Se.id}
                  ?selected=${st===Se.id}
                >
                  직렬 ${bt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${dt}
          @click=${()=>{qe(g,k)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Ot(g){let k=Array.isArray(g.issues)?g.issues:[],O=k.filter(Z=>Z.verdict==="parallel_ok").length,Q=k.filter(Z=>Z.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${O}</span>
      <span>uncertain ${Q}</span>
    </div>`}function ut(){let g=Re&&!!q().job;if(g&&w===null){w=setInterval(()=>He(),1e3);return}!g&&w!==null&&(clearInterval(w),w=null)}function He(){let g=q();b&&g.settings.runner===b&&(b=null);let k=g.last_good?.result;ut(),Ve(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${fe}
            >
              ×
            </button>
          </header>
          ${Ke(g)}
          <div class="pa__body">
            ${Ye()} ${we(g)} ${Ze()}
            ${k?l`${k.groups.map((O,Q)=>it(Q,O))}
                ${k.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Ot(k)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${yt(S(g))}
          </div>
        </div>
        ${Et()}
      `,i)}let Re=!1,I=()=>{Re=!1,Y=null,j+=1,ut()},K=g=>{g.target===g.currentTarget&&fe()};i.addEventListener("close",I),i.addEventListener("cancel",I),i.addEventListener("click",K);let pe=null;n&&n.subscribe&&(pe=n.subscribe(()=>{Re&&He()}));let C=null;r&&r.subscribe&&(C=r.subscribe(()=>{Re&&He()}));function G(){Re||(Re=!0,He(),U(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function fe(){Re&&(Re=!1,Y=null,j+=1,ut(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:G,close:fe,destroy(){Re=!1,w!==null&&(clearInterval(w),w=null),i.removeEventListener("close",I),i.removeEventListener("cancel",I),i.removeEventListener("click",K),pe&&(pe(),pe=null),C&&(C(),C=null),i.remove()}}}function Np(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let c=i.scope.filter(d=>typeof d=="string"&&d.length>0);if(c.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:c})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let c=oa(s[a].scope,s[i].scope);if(c.length===0)continue;let d=s[a].member,p=s[i].member;n.get(d.id)?.overlaps.push({id:p.id,title:p.title,location_label:p.location_label,prefixes:c}),n.get(p.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:c})}return n}function nl(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",c=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&c&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&c&&a===null){let d=Fh(n);return d===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${d} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:d,index:0},{bead_id:e,lane:d,index:1}]}}return!i&&!c?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function Fh(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var qp=new Set(["sh","bash","zsh","dash","ksh"]),Fp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function jp(e){let t=e.split("/");return t[t.length-1]||""}function jh(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=jp(n[0]);if(r!=="env")return qp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&qp.has(jp(s))}function Bh(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Uh(e){let t=[],n=0;Fp.lastIndex=0;for(let r of e.matchAll(Fp)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Bh(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Wh(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Bp(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",c=0,d=null,p=!1;function b(D,U){return U?Uh(D).map(S=>S.kind==="plain"?S.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${S.kind}"
            >${S.text}</span
          >`):D}function w(){if(!s)return l``;let D=o==="ready"&&jh(a),U=o==="ready"?a.split(`
`):[];return l`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>z()}
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
              @click=${()=>{E()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>z()}
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
                  ${U.map((S,M)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${M+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${b(S,D)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function $(){Ve(w(),r)}async function E(){if(o!=="ready")return;let D=await cn(a);ae(D?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",D?"success":"error")}function N(D){D.key==="Escape"&&s&&(D.preventDefault(),z())}function j(){p||(document.addEventListener("keydown",N),p=!0)}function Y(){p&&(document.removeEventListener("keydown",N),p=!1)}async function ie(D,U=null){let S=++c;j(),s={...D},d=U||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",$(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let re=t?t():"";if(!re){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",$();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",$();return}let Ae="/api/repo-ops-script?workspace="+encodeURIComponent(re)+"&lane="+encodeURIComponent(D.lane)+"&base_sha="+encodeURIComponent(D.base_sha);try{let be=await n(Ae),H=await be.json().catch(()=>({}));if(S!==c)return;if((t?t():"")!==re){z();return}if(!be.ok||!H||H.ok!==!0){o="error",i=Wh(H&&typeof H.error=="string"?H.error:""),$();return}s={lane:H.lane,base_sha:H.base_sha,path:H.path,base_ref:H.base_ref},a=String(H.content),o="ready",$()}catch{if(S!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",$()}}function z(){c+=1,Y(),s=null,a="",$();let D=d;d=null,D?.isConnected&&D.focus()}function q(){z(),r.remove()}return{open:ie,close:z,destroy:q}}function Up(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let S=o();return typeof S.revision=="number"?S.revision:0}function i(S){t&&S&&S.queue&&typeof S.queue=="object"&&t.set(S.queue)}function c(){let S=o().workspace_info;return S&&typeof S=="object"?S:{}}function d(S,M){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${S}"
      >${M}</span
    >`}function p(S){if(typeof S!="number"||!Number.isFinite(S))return"";let M=S/6e4;return Number.isInteger(M)?`timeout ${M}\uBD84`:`timeout ${Math.round(S/1e3)}\uCD08`}function b(S){let M=p(S);return M?d("config",M):""}function w(S,M,re){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${re.script}
      @click=${Ae=>{s&&s({lane:S,base_sha:M.base_sha,path:re.script,base_ref:M.base_ref},Ae.currentTarget)}}
    ></button>`}function $(){let S=o().repo_ops_opt_out;return{verify:S?.verify===!0,deploy:S?.deploy===!0}}function E(S,M){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!M}
        @change=${re=>{ie(S,!re.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function N(S){let M=typeof S.base_sha=="string"?S.base_sha:"",re=`${S.source_path||"repo-ops/config.toml"} @ ${S.base_ref||"?"}${M?`@${M.slice(0,7)}`:""}`,Ae=$(),be=!!S.verify&&Ae.verify,H=!!S.deploy&&Ae.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${re}</span>
      </p>
      <div
        class="worker-repo-ops__lane${be?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${S.verify?l`${w("verify",S,S.verify)}
              ${b(S.verify.timeout_ms)}
              ${be?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${be?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":S.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${S.verify?E("verify",Ae.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${H?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${S.deploy?l`${w("deploy",S,S.deploy)}
              ${b(S.deploy.timeout_ms)}
              ${H?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${H?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":S.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${S.deploy?E("deploy",Ae.deploy):""}
      </div>
    </section>`}function j(S){let M=S.repo_ops&&typeof S.repo_ops=="object"?S.repo_ops:null;return M&&(M.status==="resolved"||M.status==="absent")?N(M):M&&(M.status==="pending"||M.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${M.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${M.error_code?l` — <code>${M.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function Y(S){if(!n)return;let M=await n("worker-auto-repair-toggle",{on:S,expected_revision:a()});if(i(M),M&&M.conflict){let re=await n("worker-auto-repair-toggle",{on:S,expected_revision:a()});i(re)}r()}async function ie(S,M){if(!n)return;let re=await n("worker-repo-ops-opt-out-toggle",{kind:S,opted_out:M,expected_revision:a()});if(i(re),re&&re.conflict){let Ae=await n("worker-repo-ops-opt-out-toggle",{kind:S,opted_out:M,expected_revision:a()});i(Ae)}r()}let z={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function q(S,M,re){return l`<div class="worker-repo-ops__policy-group" data-policy=${re}>
      <div class="worker-repo-ops__policy-label">${S}</div>
      <ul class="worker-repo-ops__policy-list">
        ${M.map(Ae=>l`<li data-token=${Ae}>
              ${z[Ae]||Ae}
            </li>`)}
      </ul>
    </div>`}function D(S){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${S.map(M=>{let re=[z[M.trigger]||M.trigger];return Number.isInteger(M.attempts_per_operation_attempt)?re.push(`operation\uB2F9 ${M.attempts_per_operation_attempt}\uD68C`):Number.isInteger(M.attempts)?re.push(`${z[M.budget]||M.budget} ${M.attempts}\uD68C`):Number.isInteger(M.sessions_per_user_action)&&re.push(`${M.sessions_per_user_action}\uD68C`,z[M.user_actions]||M.user_actions),M.applies_when&&re.push(z[M.applies_when]||M.applies_when),l`<li data-token=${M.id}>
            <strong>${z[M.id]||M.id}</strong>
            <span>${re.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function U(){let S=o(),M=S.auto_repair!==!1,re=S.repo_operation_policy&&typeof S.repo_operation_policy=="object"?S.repo_operation_policy:null,Ae=Array.isArray(S.repo_operations)?S.repo_operations:[],be=Ae.find(ke=>ke.state==="repairing"),H=Ae.filter(ke=>ke.state==="failed"||ke.state==="repairing"),X=H.length?Math.min(...H.map(ke=>typeof ke.repair?.remaining=="number"?ke.repair.remaining:0)):re?.auto_repair?.resolution_ladder?.find(ke=>ke.id==="auto_repair_session")?.attempts??1,ye=Array.isArray(re?.auto_repair?.resolution_ladder)?re.auto_repair.resolution_ladder:[];return l`<section
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
          .checked=${M}
          @change=${ke=>{Y(ke.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${M?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${X}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${be?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${be.repair?.owner_bead||be.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${re?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(re.worker_automatic||[]).length} · 해결 사다리
                ${ye.length} · 금지
                ${(re.never_automatic||[]).length}</span
              >
            </summary>
            ${q("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",re.worker_automatic||[],"worker-automatic")}
            ${re.supported===!1||re.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${re.schema_version})`}
                </div>`:D(ye)}
            ${q("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",re.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${j(c())} ${U()}
      </details>`}}}var Gp=20,zh=5,Hh=new Set(["failed","repairing","running","queued","retry_pending"]),Wp={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},zp={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Gh(e,t,n=Gp){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Vh(e){if(e.type==="cleanup")return!0;let t=e.operation;return Hh.has(t.state)&&!t.dismissed&&!t.superseded_by}function Kh(e,t,n={}){let r=Gh(e,t,1/0),s=n.expanded===!0?Gp:zh,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||Vh(i));return{visible:a,hidden:r.length-a.length}}function Hp(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Yh(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Vp(e){let t=e.filter(n=>n.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>l`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Kp(e,t="",n=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function Zh(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(zp,r)?zp[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Xh(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ut(e.at):""}
      >${Ho(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Hp(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Wp,t.kind)?Wp[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Uo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${ks(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Hp(e)}"
          >${Yh(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?Kp(kd(t.failure_kind,r)):""}
      ${Zh(t)}
      ${Vp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Uo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Qh(e){let t=e.cleanup,n=br(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ut(e.at):""}
      >${Ho(e.at)||"\u2014"}</span
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
        ${Hd(t.step).map(r=>l`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Kp(Xo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Vp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Jh(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Qh(r):Xh(r))}
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
  </section>`}function Yp(e,t={}){let n=null;function r(){if(n===null){Ve(l``,e);return}let a=Kh(n.operations,n.cleanup_failures,{expanded:n.expanded});Ve(Jh({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var ey=St("views:worker"),ty="tab:worker:ready",ny="tab:worker:blocked",ry="tab:worker:in-progress",sy="tab:worker:resolved",oy="tab:worker:closed",da=1,Zp=5;function Xp(e){return Eo(e).path.length>0}var ay=new Set(["quick_fix","spec_backed","full_plan"]);function Qp(e){return typeof e=="string"&&ay.has(e)}var nf="beads-ui.worker.candidate-filter",rl={show_blocked:!1,spec:"all"};function iy(){try{let e=window.localStorage.getItem(nf);if(!e)return{...rl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...rl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...rl}}}function ly(e){try{window.localStorage.setItem(nf,JSON.stringify(e))}catch{}}function cy(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=n(i),d=r(i);c&&d?s.push(i):!c&&d?o+=1:c&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var uy=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],rf="bdui.worker.candidate_sort",dy=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],pa="spec";function py(){try{let e=window.localStorage.getItem(rf);return e==="board"||e==="created"||e==="spec"?e:pa}catch{return pa}}function fy(e){try{window.localStorage.setItem(rf,e)}catch{}}var sf="bdui.worker.done-range";function _y(){try{let e=window.localStorage.getItem(sf);return e===null?"today":En(e)}catch{return"today"}}function my(e){try{window.localStorage.setItem(sf,e)}catch{}}var gy="(max-width: 640px)",of="beads-ui.worker.lane-collapsed",Rs={queue:!0,done:!0};function by(){try{let e=window.localStorage.getItem(of);if(!e)return{...Rs};let t=JSON.parse(e);return!t||typeof t!="object"?{...Rs}:{queue:typeof t.queue=="boolean"?t.queue:Rs.queue,done:typeof t.done=="boolean"?t.done:Rs.done}}catch{return{...Rs}}}function hy(e){try{window.localStorage.setItem(of,JSON.stringify(e))}catch{}}function Jp(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function yy(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(dr):(r.sort(Zs(n)),t==="board"?r:[...r.filter(Xp),...r.filter(s=>!Xp(s))])}function vy(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function wy(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function ef(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function ky(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function $y(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function xy(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Ay(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Sy(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function sl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Ey=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Ty=new Set(["waiting_metadata","reviewing","retrying"]);function Cy(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?Ut(r.next_at):"",c=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",c?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${c}`:""].filter(Boolean),live:!0}}default:return null}}function Ry(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Oy(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let c=Ry(e.terminal_reason);c&&i.push(`\uC6D0 \uC0AC\uC720: ${c}`);for(let d of t?t.details:[])i.push(d);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!Ey.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function tf(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Ly(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(tf(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${tf(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=ky(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${ef(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${ef(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Iy(e,t,n,r,s=null,o=null,a=null,i=!1,c=null,d=!0,p=null,b=null,w=null,$={},E=!1,N=!1,j={}){let Y=!!c&&c.position>0,ie=!!c?.continuation_action&&c.continuation_action.continuation===null,z=!!c&&c.active===!0,q=c&&c.failure||null,D=xy(c?c.waiting:null,w),U=n[e]||null,S=U&&U.gate?U.gate:null,M=U&&U.pr?U.pr:null,re=Ay(c?c.resolution:null),Ae=Sy(c?c.head_review:null),be=c&&c.head_review||null,H=Cy(w,be),X=Oy(w,H),ye=c&&c.authority||null,ke=!!be&&["pending","reviewing","revising"].includes(be.state),he=!!w&&typeof w=="object"&&Ty.has(w.phase),se=Y&&!z&&(be?.state==="failed"||!ye||he||ye.source==="automatic"&&!N),xe=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":re?re.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":D,ge=!!S&&S.base_badge==="\uCDA9\uB3CC",V=!!S&&S.enabled===!0,ee=Ts({bead_id:e,merge_sha:j.merge_sha,cleanup_cursor:j.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:j.repo_operations}),ce=la(ee),ve=o&&!ee&&(o.queueing??null)?o.queueing:null,De=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!S&&S.tier==="merged",le=i&&!!r&&!!S&&S.tier==="merged",ze=se&&(V||ge||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||S?.reason==="review_receipt_undetermined"||De||le),P=i&&ge&&d===!1,ue=xn($,e,{external:i,merge_active:z||ee?.step==="merge",merge_queued:Y,conflict_active:!!a,cleanup_active:ce,merged:!!r||S?.tier==="merged"}),Me=!!ue.operation,qe=!De&&!!r&&r.step==="repo_operations",Le=Ly({continuation_required:ie,queueing:ve,merge_step:ee,conflict_badge:xe,conflict_live:re?.live===!0||a==="running",head_review:be&&Ae?{...Ae,state:be.state,failure_reason:be.failure_reason}:null,auto_resolution:H,recovery:X,cleanup_failed:r,cleanup_label:r?br(r.step):null,base_exception:b,conflicting:ge,gate:S,receipt_check:U&&U.receipt_check?U.receipt_check:null,queue_failure:q,auto_skip:p,queued:Y,queue_active:z,queue_position:c?c.position:0,activity:xe?null:o&&o.activity||null}),We=Le?.live===!0&&Le.title?l`<span title=${Le.title}>${Le.label}</span>`:Le?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ee?.active!==!0?ia(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:E,external:i,pr_number:M&&typeof M.number=="number"?M.number:null,pr_url:M&&typeof M.url=="string"?M.url:"",completion_badge:Le?.live!==!0&&Le?.title?Le.label:null,completion_title:Le?.title||"",completion_repair_pr_url:X?X.repair_pr_url:"",completion_repair_pr_number:X?X.repair_pr_number:null,badges:We?[We]:[],live_badge:Le?.live===!0?We:null,usage:s,alert:Le?.alert===!0,merge_action:S?.tier==="merged"&&!De&&!le||qe?!1:!Y||ie||se,timeline_action:qe,cancel_action:Y&&!ie,cancel_enabled:(!z||ke)&&!(X&&X.lock_actions),cancel_title:X&&X.lock_actions?`${X.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:z&&!ke?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ke?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ue,discard_action:ue.action,merge_step:ee,discard_enabled:ue.enabled,discard_title:ue.title,merge_enabled:!ee&&!ve&&!a&&!Me&&!b&&!(X&&X.lock_actions)&&!P&&!qe&&(V||ge||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||S?.reason==="review_receipt_undetermined"||De||le||ze||he&&!z),merge_label:ie?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":De||le?"\uC815\uB9AC \uC7AC\uAC1C":ge&&!ee&&!De?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":S?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":se?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Me?ue.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ue.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ue.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ie?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ve?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ee?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ee.label}`:le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":P?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":De?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ge?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":S?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":V?`\uBA38\uC9C0 (${S.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:S&&S.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${S&&S.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ol(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:d,openDoc:p,doneRange:b,onDoneRangeChange:w}=t,$=r?Qs(r,i):null,E=no({transport:n,uiOrderStore:i}),N=null,j=[],Y=iy(),ie=null,z=null,q={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},D=py(),U=b?En(b):_y(),S=new Map;function M(){let _=Ar.find(y=>y.value===U);return _?_.label:"\uC624\uB298"}let re=by(),Ae=!1,be=new Set,H=new Set,X=new Set,ye=new Set,ke=new Set,he={},se=null,xe=0,ge=null,V=[];function ee(_){return se===_?he:{}}async function ce(){if(!n)return;let _=d?.()||"";if(se===_||ge&&ge.key===_&&ge.generation===xe)return;let y=++xe;ge={key:_,generation:y};let m=null;try{m=await Promise.resolve(n("get-session-defaults",{}))}catch(A){if(y!==xe)return;ge=null,ey("get-session-defaults failed: %o",A),Ue();return}y===xe&&(he=m&&typeof m.values=="object"&&m.values!==null?{...m.values}:{},se=_,ge=null,Ue())}function ve(){se=null,xe+=1,ce()}let De=document.createElement("div");De.className="worker-console";let le=document.createElement("div");le.className="worker-top";let ze=document.createElement("div");ze.className="worker-drawer-overlay",ze.hidden=!0;let P=document.createElement("div");P.className="worker-drawer-overlay__backdrop";let ue=document.createElement("div");ue.className="worker-drawer-host";let Me=document.createElement("div");Me.className="worker-drawer-host",Me.hidden=!0,ze.append(P,ue,Me);let qe=document.createElement("div");qe.className="worker-lanes-host",De.append(le,ze,qe),e.appendChild(De);let Le=null,We=null,je=qr(ue,{transport:n,sessionLogStore:a,onClose:()=>{Le=null,We=null,ze.hidden=!0,Ue()}}),Ye=Yp(Me,{onClose:()=>{Me.hidden=!0,ze.hidden=!0,Ue()}}),tt=Bp({getWorkspacePath:d||(()=>"")}),ct=d&&d()||"",_t=Up({queueStore:s,transport:n,onChanged:()=>Ue(),onOpenScript:(_,y)=>{tt.open(_,y)}}),te=o?Mp(De,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:d,onOpenTranscript:(_,y)=>fn(_,y)}):null;function J(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:da,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Ce(){let _=J(),y=typeof _.serial_lane_count=="number"&&Number.isInteger(_.serial_lane_count)&&_.serial_lane_count>0?Math.min(_.serial_lane_count,5):0,m=Array.isArray(_.serial_lanes)?_.serial_lanes:[],A=[];for(let f of m){if(A.length>=y)break;!f||typeof f.id!="string"||!/^s[1-5]$/.test(f.id)||!Array.isArray(f.entries)||A.push({id:f.id,label:`\uC9C1\uB82C ${f.id.slice(1)}`,count:f.entries.length})}return A.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(_.queue)?_.queue:[]).length},...A]}function Ke(_){if(!ie||!_.some(m=>m.id===ie))return null;let y=Ce();return y?{bead_id:ie,lanes:y}:null}function Oe(){let _=J();return typeof _.revision=="number"?_.revision:0}function we(_){_&&_.queue&&s&&s.set(_.queue)}function Be(){let _=J().queue;return Array.isArray(_)?_.length:0}async function Ge(_,y,m){if(!n)return;let A=()=>({bead_id:_,...y==="parallel"?{}:{lane:y},...m===void 0?{}:{index:m},expected_revision:Oe()}),u=await n("worker-queue-place",A());we(u),u&&u.conflict&&await n("worker-queue-place",A()).then(we)}async function Qe(_,y,m){if(!n)return;let A=()=>({bead_id:_,...y==="parallel"?{}:{lane:y},to_index:m,expected_revision:Oe()}),u=await n("worker-queue-reorder",A());we(u),u&&u.conflict&&await n("worker-queue-reorder",A()).then(we)}async function Ze(_){if(!n)return;let y=await n("worker-queue-remove",{bead_id:_,expected_revision:Oe()});we(y),y&&y.conflict&&await n("worker-queue-remove",{bead_id:_,expected_revision:Oe()}).then(we)}async function rt(_){if(!n||!_)return;let y=await n("worker-attempt-pause",{attempt_id:_});y&&y.paused===!1&&y.reason&&ae(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function yt(_){if(!n||!_)return;let y=await Ir();if(y===null)return;let m=async(u={})=>await n("worker-attempt-resume",{attempt_id:_,expected_revision:Oe(),...y!==""?{instructions:y}:{},...u}),A=await m();we(A),A&&A.conflict&&(A=await m(),we(A)),A=await Mn(A,(u,f)=>m({continuation:u,decision_token:f}),{onResult:we,refresh:()=>m()}),A&&A.resumed===!1&&!A.conflict&&A.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${A.reason}`,"error",2400)}async function Et(_){if(!n||!_)return;let y=await n("worker-attempt-dismiss",{attempt_id:_,expected_revision:Oe()});we(y),y&&y.conflict&&(y=await n("worker-attempt-dismiss",{attempt_id:_,expected_revision:Oe()}),we(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&ae(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function it(_,y,m=!0){if(!n)return null;let A=n,u=await A(_,{...y,expected_revision:Oe()});return we(u),u&&u.conflict&&m&&(u=await A(_,{...y,expected_revision:Oe()}),we(u)),u}async function Ot(_){if(!n||!_)return;let y=J().merge_queue?.find(A=>A.bead_id===_)?.continuation_action;if(y?.mismatch&&y.continuation===null){await He(_,y.mismatch);return}be.add(_),Ue();let m;try{m=await it("worker-merge-queue-add",{bead_id:_})}catch{ae("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{be.delete(_),Ue()}if(!(!m||m.applied)){if(m.conflict){ae("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ae($y(m.reason),"error",2400)}}async function ut(_){if(!(!n||!_||H.has(_))){H.add(_),Ue();try{let y=await n("worker-cleanup-retry",{bead_id:_,expected_revision:Oe()});we(y),y&&!y.retried&&!y.conflict&&y.reason&&ae(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{H.delete(_),Ue()}}}async function He(_,y){let m=await Mn({continuation_mismatch:y},(u,f)=>it("worker-merge-queue-add",{bead_id:_,continuation:u,decision_token:f},!1)),A=m?.queue?.merge_queue?.find(u=>u.bead_id===_)?.continuation_action;if(m?.applied!==!0&&A?.continuation===null&&A.mismatch){await He(_,A.mismatch);return}m&&m.applied===!1&&!m.conflict&&ae("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Re(_){if(!n)return;let y=await it("worker-merge-auto-toggle",{on:_});!y||y.conflict||ae(_?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",_?"success":"info",2400)}async function I(_){if(!n||!_)return;let y=await it("worker-merge-queue-remove",{bead_id:_});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&ae("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function K(){await it("worker-merge-queue-remove",{all:!0})}async function pe(_,y=null,m="unmerged",A=null){if(!n||!_)return;let u=$s(_,m);if(!(!!A||typeof globalThis.confirm!="function"||globalThis.confirm(u)))return;let v=await n("worker-discard",{bead_id:_,...y?{attempt_id:y}:{},...A?{operation_id:A}:{},expected_revision:Oe()});if(we(v),v&&v.conflict&&(v=await n("worker-discard",{bead_id:_,...y?{attempt_id:y}:{},...A?{operation_id:A}:{},expected_revision:Oe()}),we(v)),v&&v.discarded===!0){ae(Go(v),"success",5e3);return}if(v&&v.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${v.reason}`,"error",2800);return}if(v&&v.accepted&&v.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(v&&v.accepted&&!v.discarded){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${v.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}v&&!v.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function C(_,y,m){if(!(!n||!y||!m||ye.has(y))){ye.add(y),Ue();try{let A=await n(_,{bead_id:y,action_id:m,expected_revision:Oe()});we(A),A?.conflict?ae("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!A?.ok&&A?.reason&&ae(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(A.reason)}`,"error",2800)}finally{ye.delete(y),Ue()}}}async function G(_,y){if(!n||!y||X.has(y))return;X.add(y),Ue();let m;try{let A=async(u={})=>await n(_,{bead_id:y,expected_revision:Oe(),...u});m=await A(),we(m),m&&m.conflict&&(m=await n(_,{bead_id:y,expected_revision:Oe()}),we(m)),_==="worker-revise-fix"&&(m=await Mn(m,(u,f)=>A({continuation:u,decision_token:f}),{onResult:we,refresh:()=>A()}))}finally{X.delete(y),Ue()}if(!(!m||m.conflict)){if(m.ok){ae(_==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ae(`\uCC98\uBD84 \uAC70\uBD80: ${m.reason||""}`,"error",3e3)}}async function fe(_){if(!n)return;let y=await n("worker-automation-toggle",{on:_,expected_revision:Oe()});we(y),y&&y.conflict&&await n("worker-automation-toggle",{on:_,expected_revision:Oe()}).then(we)}async function g(_){if(!n||!_)return;let y=await n("worker-repo-operation-repair",{operation_id:_});if(we(y),y&&y.ok===!1){ae(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${y.reason||""}`,"error",3e3);return}y&&y.ok===!0&&ae("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function k(_){if(!n||!_)return;let y=await n("worker-repo-operation-dismiss",{operation_id:_});we(y),y&&y.ok===!1&&ae(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function O(_){if(!n||!Number.isFinite(_))return;let y=Math.max(da,Math.floor(_)),m=await n("worker-queue-set-slots",{slots:y,expected_revision:Oe()});we(m),m&&m.conflict&&await n("worker-queue-set-slots",{slots:y,expected_revision:Oe()}).then(we)}async function Q(_){if(!n||!Number.isInteger(_)||_<1||_>Zp)return;let y=J(),m=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(_).reduce((f,v)=>f+(Array.isArray(v?.entries)?v.entries.length:0),0),A=()=>({count:_,expected_revision:Oe()}),u=await n("worker-queue-set-serial-lane-count",A());we(u),u&&u.conflict&&(u=await n("worker-queue-set-serial-lane-count",A()),we(u)),u&&u.applied&&m>0&&ae(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${m}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let Z="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function _e(_,y){let m=nl(_,y.id,q);return{id:y.id,title:y.title,location_label:y.location_label,prefixes:y.prefixes,action:m.kind==="note"?{kind:"note",text:m.text}:m.kind==="disabled"?{kind:"disabled",label:Z,title:m.title}:{kind:"place",label:Z,title:m.title}}}function Te(_,y){if(!z||z.bead_id!==_)return null;let m=z.counterpart_id,A=y.filter(u=>u.id===m);return A.length===0?null:{rows:A.map(u=>_e(_,u))}}async function $e(_,y){let m=nl(_,y,q);if(z=null,m.kind!=="ops"){Ue();return}let A=Oe();for(let u of m.ops){let f=await st(u,A);if(f===null)break;A=f}Ue()}async function st(_,y){if(!n)return null;try{let m=await n("worker-queue-place",{bead_id:_.bead_id,lane:_.lane,index:_.index,expected_revision:y});if(we(m),m&&m.conflict)return ae("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!m||m.applied!==!0)return ae(m&&typeof m.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${m.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let A=m.queue?m.queue.revision:void 0;return typeof A!="number"?(ae("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):A}catch(m){return ae(m instanceof Error&&m.message?m.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function dt(){let _=J(),y=$?$.selectBoardColumn(ty,"ready"):[],m=$?$.selectBoardColumn(ny,"blocked"):[],A=$?$.selectBoardColumn(oy,"closed"):[],u=$?$.selectBoardColumn(ry,"in_progress"):[],f=$?$.selectBoardColumn(sy,"resolved"):[],v=eo([...y,...m,...u,...f,...A]),x=new Map;for(let h of[...y,...m,...u])h&&h.id&&!x.has(h.id)&&x.set(h.id,h);let B={...ee(d?.()||"")};for(let h of["orchestration_model","orchestration_effort","orchestration_speed"]){let F=_[h];typeof F=="string"&&(B[h]=F)}function W(h,F){let oe=x.get(h);if(!oe)return null;let Fe=oe.metadata&&typeof oe.metadata=="object"?oe.metadata:{},Xe=oe.workflow?.route,kt=Fe.route,Tt=Qp(Xe)?Xe:Qp(kt)?kt:null;return rn({pin:Fe,global:B,execution_defaults:_.execution_defaults??null,runner_catalog:_.runner_catalog??null,route:Tt,controller_runtime:F})}function ne(h){let F=h.runner||null,oe=W(h.bead_id,F),Fe=xs(h),Xe=oe?Jn(oe,F):null;return Fe||Xe?{orchestration:Fe,worker:Xe}:null}let me=new Map;function Je(h){if(me.has(h))return me.get(h)??null;let F=W(h,null),oe=null;if(F){let Fe=$n(_.runner_catalog??null,F.orchestration_model.value??""),Xe=Fe===null?F:W(h,Fe),kt=gr(Xe,_.runner_catalog??null),Tt=Jn(Xe,Fe);oe=kt||Tt?{orchestration:kt,worker:Tt}:null}return me.set(h,oe),oe}function jt(h){let F=to(v,h);return F.total===0?null:F}let In=_.bead_titles||{},Bt=new Map;for(let[h,F]of Object.entries(In))typeof F=="string"&&F.length>0&&Bt.set(h,F);for(let h of[...y,...m])Bt.set(h.id,h.title||h.id);let Sn=new Map;for(let h of[...y,...m,...u,...f,...A])h&&h.id&&typeof h.from_id=="string"&&Sn.set(h.id,h.from_id);let on=new Map;for(let h of[...y,...m,...u,...f,...A])h&&h.id&&typeof h.priority=="number"&&on.set(h.id,h.priority);let Os=_.bead_times&&typeof _.bead_times=="object"&&!Array.isArray(_.bead_times)?_.bead_times:{},nr=_.bead_labels&&typeof _.bead_labels=="object"&&!Array.isArray(_.bead_labels)?_.bead_labels:{},Wn=_.bead_workflow&&typeof _.bead_workflow=="object"&&!Array.isArray(_.bead_workflow)?_.bead_workflow:{},zn=new Map;for(let[h,F]of Object.entries(nr))Array.isArray(F)&&zn.set(h,Ji(F));for(let h of[...y,...m]){let F=h.labels;Array.isArray(F)&&!zn.has(h.id)&&zn.set(h.id,Ji(F))}let hr=new Map,Hr=o?.get()?.last_good?.result?.groups;for(let h of Array.isArray(Hr)?Hr:[]){if(h?.eligible!==!0||!Array.isArray(h.members))continue;let F=h.members.map(Fe=>{let Xe=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).find(kt=>kt.entries.some(Tt=>Tt.bead_id===Fe));return Xe?Xe.id:null});if(!(F.every(Fe=>Fe!==null)&&new Set(F).size===1))for(let Fe of h.members)hr.set(Fe,h.members.filter(Xe=>Xe!==Fe))}let Ls=_.bead_blocked_by&&typeof _.bead_blocked_by=="object"&&!Array.isArray(_.bead_blocked_by)?_.bead_blocked_by:{},yr=new Map;for(let[h,F]of Object.entries(Os))F&&typeof F=="object"&&yr.set(h,F);for(let h of[...y,...m])yr.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let rr=h=>yr.get(h)||{},Hn=_.pr_wait||[],Gr=_.pr_observations||{},Ne=_.pr_activity||{},at=_.cleanup_failed||{},an=Object.entries(at).map(([h,F])=>({bead_id:h,step:F&&F.step?F.step:"",reason:F&&F.reason?F.reason:"",at:F&&typeof F.at=="number"?F.at:null,detail:F&&typeof F.detail=="string"?F.detail:null,output_tail:F&&typeof F.output_tail=="string"&&F.output_tail?F.output_tail:void 0,log_path:F&&typeof F.log_path=="string"&&F.log_path?F.log_path:void 0,retry_count:F&&typeof F.retry_count=="number"&&Number.isInteger(F.retry_count)&&F.retry_count>0?F.retry_count:0,failure_code:F&&typeof F.failure_code=="string"?F.failure_code:void 0,subject_id:F&&typeof F.subject_id=="string"?F.subject_id:void 0,repair_eligible:!!(F&&F.repair_eligible),repair:F&&F.repair?F.repair:void 0})),fa=_.queue||[],yf=new Set([...fa.map(h=>h.bead_id),...(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).flatMap(h=>(Array.isArray(h?.entries)?h.entries:[]).map(F=>F.bead_id)),...Hn.map(h=>h.bead_id),..._.done.map(h=>h.bead_id)]),vf=new Set(m.map(h=>h.id)),wf=i?i.get()?.order||{}:{},cl=new Set,ul=[];for(let h of[...y,...m])yf.has(h.id)||cl.has(h.id)||vy(h)||(cl.add(h.id),ul.push(h));j=yy(ul,D,wf);let kf=_.admission||{},dl=h=>{let F=kf[h];if(!F)return"";if(F.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let oe=typeof F.reason=="string"?F.reason:"",Fe=oe.indexOf(":");return Fe>0&&Fe<oe.length-1?`\u26D4 ${oe.slice(0,Fe)} (${oe.slice(Fe+1)})`:`\u26D4 ${oe}`},$f=j.map(h=>{let F=Eo(h),oe=F.path.length>0,Fe=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",Xe=!Object.hasOwn(h,"description")||typeof h.description=="string"&&h.description.trim().length>0,kt=Object.hasOwn(h,"labels")&&Dp(h.labels),Tt=!kt&&(Fe?Xe:oe&&!F.conflict),ft=vf.has(h.id),tn=[];ft&&tn.push(wy(h)),Fe&&!Xe?tn.push("missing_description"):!Fe&&F.conflict?tn.push("spec_id_conflict"):!Fe&&!oe&&tn.push("spec \uC5C6\uC74C");let js=dl(h.id);return js&&tn.push(js),{id:h.id,title:h.title||h.id,reason:tn.join(" \xB7 "),draggable:Tt,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:Fe,status:h.status,worker_ineligible:kt,blocked:ft,has_spec:oe,exec_chips:Je(h.id),from_id:h.from_id||void 0,priority:on.get(h.id)}}),_a=cy($f,Y),ma=_a.visible,xf=_.revise_parked||{},Is=_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},ga=(h,F)=>h.map((oe,Fe)=>{let Xe=F!=="done",kt=F!=="done"&&F!=="queue",Tt=Xe?xf[oe.bead_id]:null,ft=Xe?xn(Is,oe.bead_id):null,tn=ft?.operation?ft:null,js=Xe&&zn.get(oe.bead_id)===!0,Bl=Ls[oe.bead_id]||[],Aa=_.admission&&typeof _.admission=="object"?_.admission[oe.bead_id]:null,Sa=Xe?bd(Aa,!!tn||ye.has(oe.bead_id)):null,Pf=Xe&&!Sa?dl(oe.bead_id):null,Df=Xe?[Pf]:[],Ul=Xe&&Bl.length>0&&typeof Aa?.reason=="string"&&Aa.reason.startsWith("not_ready")?[`\u23F8 ${Bl.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Ea=Xe?hr.get(oe.bead_id):void 0;return Ea&&Ea.length>0&&Ul.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Ea.join(", ")}\uC640`),{id:oe.bead_id,title:Bt.get(oe.bead_id)||oe.bead_id,reason:Df.filter(Boolean).join(" \xB7 "),draggable:Xe&&!tn&&!Sa,done:F==="done",lane:F,seq:kt?Fe+1:void 0,worker_serial:js,discard:tn,stale_work:Sa,badges:[...Ul,...Tt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...F==="done"?Wo(_.attempts||{},oe.bead_id):[]],alert:!!Tt,revise_action:!!Tt,revise_enabled:!!Tt&&!tn&&!X.has(oe.bead_id),revise_title:Tt?Tt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Tt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:F==="done"?mn(_.attempts||{},oe.bead_id):null,work_ms:F==="done"?zo(_.attempts||{},oe.bead_id):null,done_at:F==="done"&&typeof oe.added_at=="number"?oe.added_at:void 0,exec_chips:Xe?Je(oe.bead_id):null,workflow:Xe&&Wn[oe.bead_id]||null,from_id:Sn.get(oe.bead_id)||void 0,priority:on.get(oe.bead_id),...rr(oe.bead_id)}}),vr=_.attempts?Object.values(_.attempts).filter(Wr):[],ba=new Set;for(let h of vr)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&ba.add(h.resumed_from);let pl=new Map;for(let h of vr)pl.set(h.bead_id,h.attempt_id);let Vr=new Map;for(let h of vr)Vr.set(h.attempt_id,h);function ha(h){let F=new Set,oe=h;for(;oe&&!F.has(oe.attempt_id);){if(oe.conflict_resolution===!0)return!0;F.add(oe.attempt_id),oe=typeof oe.resumed_from=="string"&&oe.resumed_from.length>0&&Vr.get(oe.resumed_from)||null}return!1}let Ps=typeof _.declared_base=="string"?_.declared_base:null;function Af(h){let F=null;for(let oe of vr)!oe||oe.bead_id!==h||ha(oe)||(F===null||(typeof oe.started_at=="number"?oe.started_at:0)>=(typeof F.started_at=="number"?F.started_at:0))&&(F=oe);return F&&typeof F.target_base=="string"?F.target_base:null}let ya=[],Ds=[],Sf=Pp(_),fl=h=>{let F=typeof h.session_id=="string"&&h.session_id.length>0,oe=ba.has(h.attempt_id);return{eligible:F&&!oe,reason:F?oe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},hn=null;for(let h of vr){let F=h.status==="paused"&&!ba.has(h.attempt_id);if(h.status==="running"||F)Ds.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:Bt.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:F,conflict_resolution:ha(h),base_exception:sl(Ps,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:xn(Is,h.bead_id,{attempt_id:h.attempt_id}),workflow:Wn[h.bead_id]||null,priority:on.get(h.bead_id),usage:mn(_.attempts||{},h.bead_id),rollup:jt(h.bead_id),rollup_expanded:ke.has(h.bead_id),exec_chips:ne(h),...rr(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&Sf(h)){let oe=fl(h);ya.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:Bt.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:xn(Is,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:oe.eligible,resume_reason:oe.reason,conflict_resolution:ha(h),base_exception:sl(Ps,h.target_base),workflow:Wn[h.bead_id]||null,priority:on.get(h.bead_id),usage:mn(_.attempts||{},h.bead_id),rollup:jt(h.bead_id),rollup_expanded:ke.has(h.bead_id),exec_chips:ne(h),...rr(h.bead_id)}),hn=h}}let _l=new Set([...ya,...Ds].map(h=>h.bead_id));for(let h of Array.isArray(_.session_active)?_.session_active:[]){let F=h&&h.bead_id;typeof F!="string"||F.length===0||_l.has(F)||(_l.add(F),Ds.push({bead_id:F,attempt_id:null,kind:"session",title:h.title||Bt.get(F)||F,status:"in_progress",started_at:Tn(h.started_at)??Tn(h.updated_at),updated_at:Tn(h.updated_at),workflow:h.workflow||null,priority:on.get(F),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let wr=[...ya,...Ds].map(h=>{let F=Vr.get(h.attempt_id),oe=F?.quickfix_landing;if(F?.quickfix_lane!==!0||!oe||typeof oe!="object")return h;let Fe=typeof oe.reason=="string"&&oe.reason.length>0?oe.reason:null,Xe=Ts({bead_id:F.bead_id,merge_sha:oe.head_sha,cleanup_cursor:oe.cursor,cleanup_failed:Fe?{step:oe.cursor,reason:Fe}:null,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]});return Xe?{...h,landing:Xe}:h}),ml=null;if(hn){let h=fl(hn),F=hn.cause_detail;ml={bead_id:hn.bead_id,repo:hn.repo||"",reason:hn.cause||hn.status,cause_detail:F&&typeof F.reason=="string"?{reason:F.reason,command:typeof F.command=="string"?F.command:null}:null,resume_attempt_id:hn.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:xn(Is,hn.bead_id,{attempt_id:hn.attempt_id})}}let gl=new Set(wr.map(h=>h.bead_id)),va=Array.isArray(_.merge_queue)?_.merge_queue:[],bl=new Map,hl=new Map,yl=new Map,vl=new Map,wl=new Map;va.forEach((h,F)=>{h&&typeof h.bead_id=="string"&&(bl.set(h.bead_id,F+1),hl.set(h.bead_id,h.resolution),yl.set(h.bead_id,h.continuation_action||null),vl.set(h.bead_id,h.head_review||null),wl.set(h.bead_id,h.authority||null))});let kr=_.merge_queue_state||{active:null,failures:{}},Ef=kr.failures||{},kl=kr.waiting&&typeof kr.waiting.bead_id=="string"&&typeof kr.waiting.reason=="string"?kr.waiting:null,Tf=_.auto_merge_skips||{},$l=h=>{let F=Tf[h];if(!F)return null;let oe=Gr[h],Fe=oe&&oe.pr?oe.pr.head_sha:null;return Fe&&Fe===F.head_sha?F.reason||"":null},Ms=new Map;for(let h of wr)h.failed!==!0&&h.conflict_resolution&&(h.paused?Ms.has(h.bead_id)||Ms.set(h.bead_id,"paused"):Ms.set(h.bead_id,"running"));let xl=wr.filter(h=>h.kind!=="session"&&!h.paused&&h.failed!==!0).length,Al=(_.workspace_info||{}).slots,Sl=typeof Al=="number"?Al:typeof _.slots=="number"?_.slots:da,Cf=xl>Sl,Ns=cr(U),Rf=(Array.isArray(_.done)?_.done.slice():[]).filter(h=>Ns===void 0||typeof h.added_at!="number"||h.added_at>=Ns).sort((h,F)=>(F.added_at||0)-(h.added_at||0)),Kr=ga(Rf,"done"),Of=new Set((Array.isArray(_.done)?_.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),El=[],Lf=d?.()||"";for(let h of A){let F=Tn(h.closed_at);if(typeof h.id!="string"||Of.has(h.id)||F===null||Ns!==void 0&&F<Ns||typeof h.comment_count!="number"||h.comment_count<=0)continue;let oe=`${Lf}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,Fe=S.get(oe);Fe===void 0&&n&&(S.set(oe,"pending"),Promise.resolve(n("get-comments",{id:h.id})).then(Xe=>{let kt=Array.isArray(Xe)&&Xe.some(Tt=>To(typeof Tt?.text=="string"?Tt.text:"")?.lane==="session");S.set(oe,kt?"session":"not-session"),Ue()}).catch(()=>{S.set(oe,"failed"),Ue()})),Fe==="session"&&El.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:F,created_at:h.created_at,updated_at:h.updated_at})}Kr.push(...El),Kr.sort((h,F)=>(F.done_at||0)-(h.done_at||0));let qs={};for(let h of Rn)qs[h]=0;let Tl=!1,Cl=0,wa=0,Rl=0;for(let h of Kr){let F=h.usage;if(F&&typeof F=="object"){let oe=!1;for(let Fe of Rn)Number.isFinite(F[Fe])&&(qs[Fe]+=F[Fe],Tl=!0,oe=!0);oe&&(wa+=1,Number.isFinite(F.total_cost_usd)&&(Cl+=F.total_cost_usd,Rl+=1))}}wa>0&&Rl===wa&&(qs.total_cost_usd=Cl);let Ol=Kr.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),If=Ol.length>0?Wt(fo(Ol)):Tl?Nn(qs):null,Ll=_.lane_states&&typeof _.lane_states=="object"&&!Array.isArray(_.lane_states)?_.lane_states:{},Il=Array.isArray(_.serial_lanes)?_.serial_lanes:[],Pl=h=>{if(Hn.some(Fe=>Fe.bead_id===h))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let F=vr.filter(Fe=>Fe&&Fe.bead_id===h),oe=F.length>0?F[F.length-1].status:null;return oe==="failed"||oe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":oe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Fs=Il.filter(h=>h&&typeof h.id=="string"&&Array.isArray(h.entries)).map((h,F)=>{let oe=Ll[h.id]||{},Fe=new Map((Array.isArray(oe.corrections)?oe.corrections:[]).filter(ft=>ft&&typeof ft.bead_id=="string"&&typeof ft.after=="string").map(ft=>[ft.bead_id,ft.after])),Xe=ga(h.entries.filter(ft=>!gl.has(ft.bead_id)),h.id).map(ft=>Fe.has(ft.id)?{...ft,badges:[`\u{1F517} ${Fe.get(ft.id)} \uB4A4 (blocks \uC790\uB3D9)`,...ft.badges]}:ft),kt=Array.isArray(oe.occupied_by)?oe.occupied_by.filter(ft=>typeof ft=="string"):[],Tt=kt.map(ft=>({id:ft,title:Bt.get(ft)||ft,draggable:!1,lane:h.id,ghost:!0,badges:[Pl(ft)]}));return{id:h.id,index:F+1,rows:[...Tt,...Xe],occupied:kt.length>0,badge:kt.length>0?Pl(kt[0]):"\uB300\uAE30",cycle:oe.cycle===!0}}),Dl=typeof _.serial_lane_count=="number"?_.serial_lane_count:Fs.length,ka=ga(fa.filter(h=>!gl.has(h.bead_id)),"queue"),Ml=new Map,Nl=new Set;for(let[h,F]of Object.entries(Ll)){if(!/^s[1-5]$/.test(h))continue;let oe=F&&Array.isArray(F.occupied_by)?F.occupied_by:[];for(let Fe of oe)typeof Fe=="string"&&Ml.set(Fe,h);oe.length>0&&Nl.add(h)}let $r=[];for(let h of wr)typeof h.bead_id=="string"&&$r.push({id:h.bead_id,title:Bt.get(h.bead_id)||h.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ml.get(h.bead_id)??null});for(let h of Fs)for(let F of h.rows)F.ghost!==!0&&$r.push({id:F.id,title:F.title,location_label:`${h.id} #${F.seq??""}`.trim(),kind:"serial",lane_id:h.id});ka.forEach((h,F)=>{$r.push({id:h.id,title:h.title,location_label:`#${F+1}`,kind:"parallel",lane_id:null})});for(let h of ma)$r.push({id:h.id,title:h.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let ql={};for(let h of Il)h&&typeof h.id=="string"&&Array.isArray(h.entries)&&(ql[h.id]=h.entries.length);let $a=new Map;for(let h of $r)$a.has(h.id)||$a.set(h.id,h);q={members_by_id:$a,serial_raw_lengths:ql,serial_lane_count:Dl,occupied_lanes:Nl};let Fl=Np(_.bead_scope,$r),xa=(h,F)=>{let oe=Fl.get(h.id);if(!oe||oe.overlaps.length===0&&!oe.scope_missing)return h;let Fe=Te(h.id,oe.overlaps);return h.dependency_chips={...h.dependency_chips||{},...oe.overlaps.length>0?{overlaps:oe.overlaps}:{},...oe.scope_missing&&F!=="running"?{scope_missing:!0}:{},...Fe?{popover:Fe}:{}},h};for(let h of ka)xa(h,"queue");for(let h of Fs)for(let F of h.rows)F.ghost!==!0&&xa(F,h.id);for(let h of ma)xa(h,"candidate");let jl=new Map;for(let h of wr){let F=typeof h.bead_id=="string"?h.bead_id:"";if(F.length===0)continue;let oe=h.kind==="session",Fe=Fl.get(F),Xe=Fe&&Fe.overlaps.length>0?Fe.overlaps:null,kt=typeof h.attempt_id=="string"&&h.attempt_id.length>0?Vr.get(h.attempt_id):void 0,Tt=kt&&kt.last_activity&&typeof kt.last_activity=="object"?kt.last_activity:null,ft=kt&&Array.isArray(kt.legs)?kt.legs:[];if(!Xe&&!Tt&&ft.length===0&&!oe)continue;let tn=Xe?Te(F,Xe):null;jl.set(F,{...Tt?{last_activity:Tt}:{},...ft.length>0?{legs:ft}:{},...Xe?{dependency_chips:{overlaps:Xe,...tn?{popover:tn}:{}}}:{}})}return{queue:_,idToTitle:Bt,candidates:ma,candidate_hidden:{blocked:_a.hidden_blocked,spec:_a.hidden_spec},running:wr,live_count:xl,slots:Sl,over_cap:Cf,failure:ml,waiting:ka,serial_lanes:Fs,serial_lane_count:Dl,running_overlays:jl,pr_wait:Hn.map(h=>Iy(h.bead_id,Bt.get(h.bead_id)||h.bead_id,Gr,at[h.bead_id]||null,mn(_.attempts||{},h.bead_id),Ne[h.bead_id]||(be.has(h.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:H.has(h.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Ms.get(h.bead_id)||null,h.external===!0,{position:bl.get(h.bead_id)||0,active:kr.active===h.bead_id,failure:Ef[h.bead_id]||null,waiting:kl?.bead_id===h.bead_id?kl.reason:null,resolution:hl.get(h.bead_id),continuation_action:yl.get(h.bead_id),head_review:vl.get(h.bead_id)||null,authority:wl.get(h.bead_id)||null},h.wt_present!==!1,_.auto_merge===!0?$l(h.bead_id):null,sl(Ps,Af(h.bead_id)),_.completion_status&&typeof _.completion_status=="object"&&!Array.isArray(_.completion_status)&&_.completion_status[h.bead_id]||null,_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},Vr.get(pl.get(h.bead_id)||"")?.worker_serial===!0,_.auto_merge===!0,{merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]})).map(h=>({...h,workflow:Wn[h.id]||null,priority:on.get(h.id),...rr(h.id)})),merge_queue_length:va.length,merge_queue_running:va.length>0,auto_excluded:Hn.map(h=>h.bead_id).filter(h=>$l(h)!==null),declared_base:Ps,done:Kr,token_total:If,cleanup_failures:an,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]}}function Se(){let y=!!o?.get()?.job,m=!y&&o?.isPending?.()===!0,A=y?"\uBD84\uC11D \uC911":m?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${A?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${A?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${A?l`<span class="worker-analysis-btn__badge">${A}</span>`:""}
    </button>`}function bt(_){let y=_.waiting.length>0?_.waiting[0].id:"\u2014",m=l`<button
      type="button"
      class="worker-play${_.queue.auto_advance?" is-active":""}"
    >
      ${_.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,A=pn(_),u=_.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",f=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${_.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${_.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${M()} 완료 <b>${_.done.length}</b></span
      >`,v=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${_.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${_.declared_base||"?"}</span
    >`,x=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${da}
          step="1"
          .value=${String(_.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Zp},(ne,me)=>me+1).map(ne=>l`<option
                value=${String(ne)}
                ?selected=${_.serial_lane_count===ne}
              >
                ${ne}
              </option>`)}
        </select>
      </label>
      ${o?Se():""} `,B=xd({failure:_.failure}),W=gd(_.repo_operations,_.cleanup_failures);return Ae?l`<div class="worker-ribbon">
          ${m} ${A}
          <div class="worker-kpi worker-kpi--ribbon">${u}${f}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${x}</div>
          <div class="worker-kpi">${v}</div>
        </div>
        ${W}${_t.template()}${B}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${m}${A}${x}</div>
        <div class="worker-kpi">
          ${u}${f}${v}
          ${(Array.isArray(_.token_total)?_.token_total:_.token_total?[{label:_.token_total,tooltip:`${M()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(ne=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${ne.tooltip}
                >${M()} 완료 · 누적 ${ne.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${W}${_t.template()}${B}`}function gt(_){if(_.running.length===0&&_.pr_wait.length===0)return"";let y=_.running.some(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0);return l`<section
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
          >${_.running.length+_.pr_wait.length}</span
        >
      </header>
      ${_.running.length>0?Mi(_.running,Date.now(),Le,_.running_overlays):""}
      ${_.pr_wait.map(m=>Zn(m))}
    </section>`}function Ft(_){let y=_.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${Y.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${uy.map(m=>l`<button
              type="button"
              class="worker-filter__chip${Y.spec===m.value?" is-active":""}"
              data-spec=${m.value}
              aria-pressed=${Y.spec===m.value?"true":"false"}
            >
              ${m.label}
            </button>`)}
        ${y.spec>0?l`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function Gt(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${D}
    >
      ${dy.map(_=>l`<option value=${_.value} ?selected=${D===_.value}>
            ${_.label}
          </option>`)}
    </select>`}function Nt(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${U}
      >
        ${Ar.map(_=>l`<option value=${_.value} ?selected=${U===_.value}>
              ${_.label}
            </option>`)}
      </select>
    </div>`}function Dt(_){let y=l`<span
      class="worker-lane__badge${_.occupied?" worker-lane__badge--held":""}"
      >${_.badge}</span
    >`,m=_.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return bn({id:`worker-pane-lane-${_.id}`,lane:_.id,title:`\uC9C1\uB82C ${_.index}`,items:_.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:y,controls:m})}function pn(_){let y=_.queue.auto_merge===!0;if(_.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${y?" is-active":""}"
        title=${y?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${y?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${_.merge_queue_length}
      </button>`;if(y)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let m=new Set(_.auto_excluded),A=_.pr_wait.filter(u=>u.merge_action&&u.merge_enabled&&!m.has(u.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${A>0?` ${A}`:""}
    </button>`}function At(_){let y=bn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:_.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Gt(),controls:Ft(_),place_menu:Ke(_.candidates),onOpenDoc:p?(m,A)=>p(A):void 0});return Ae?l`<div class="worker-lanes worker-lanes--mobile">
        ${gt(_)}
        ${bn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:re.queue,preview:Jp(_.waiting)})}
        ${_.serial_lanes.map(m=>Dt(m))}
        ${y}
        ${bn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:_.done,empty:`${M()} \uC644\uB8CC \uC5C6\uC74C`,controls:Nt(),collapsible:!0,collapsed:re.done,preview:Array.isArray(_.token_total)?_.token_total.map(m=>m.label).join(" \xB7 "):_.token_total||Jp(_.done)})}
      </div>`:l`<div class="worker-lanes">
      ${y}
      <div class="worker-wait">
        ${bn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${_.serial_lanes.map(m=>Dt(m))}
      </div>
      ${bn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${_.slots}`,items:_.running,live:_.running.some(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0),body:Mi(_.running,Date.now(),Le,_.running_overlays)})}
      ${bn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:_.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${bn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${M()} ${_.done.length}`,items:_.done,empty:`${M()} \uC644\uB8CC \uC5C6\uC74C`,controls:Nt()})}
    </div>`}function Mt(_){re={...re,[_]:!re[_]},hy(re),Ue()}function Ue(){let _=dt();Ve(bt(_),le),Ve(At(_),qe)}function Xt(){if(typeof window.matchMedia!="function")return;let _=window.matchMedia(gy);Ae=!!_.matches;let y=m=>{let A=!!(m&&typeof m.matches=="boolean"?m.matches:_.matches);A!==Ae&&(Ae=A,Ue())};typeof _.addEventListener=="function"?(_.addEventListener("change",y),V.push(()=>_.removeEventListener("change",y))):typeof _.addListener=="function"&&(_.addListener(y),V.push(()=>_.removeListener(y)))}let Qt=null;function et(_){Qt=_.target instanceof Element?_.target:null}function Ie(_){let m=_.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!m)return;if(Qt&&m.contains(Qt)&&Qt.closest("input, button, a")){_.preventDefault();return}let A=m.dataset.beadId||"",u=m.dataset.lane||"";N={bead_id:A,from_lane:u};try{_.dataTransfer?.setData("text/plain",A),_.dataTransfer&&(_.dataTransfer.effectAllowed="move")}catch{}}function R(_){let y=_.target?.closest?.(".worker-pane");if(!y)return;let m=y.dataset.lane||"";m!=="candidate"&&m!=="queue"&&!/^s[1-5]$/.test(m)||(_.preventDefault(),_.dataTransfer&&(_.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function de(_){_.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ee(_,y){let m=j.find(v=>v.id===_);if(!m)return;let A=j.filter(v=>v.id!==_),u=A.length;if(y){let v=y.dataset.beadId;if(v===_)return;let x=A.findIndex(B=>B.id===v);x>=0&&(u=x)}let f=A.slice();f.splice(u,0,m),E.applyReorder(_,f,u)}function ot(_){let y=_.target?.closest?.(".worker-pane");if(!y)return;_.preventDefault(),y.classList.remove("worker-pane--drag-over");let m=y.dataset.lane||"",A=N?.bead_id||_.dataTransfer?.getData("text/plain")||"",u=N?.from_lane||"";if(N=null,!A)return;let f=_.target?.closest?.(".worker-mini, .worker-card"),v=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),x=v.length;if(f){let B=v.indexOf(f);B>=0&&(x=B)}if(x=Math.max(0,x-y.querySelectorAll(".worker-mini--ghost").length),y.classList.contains("worker-pane--collapsed")&&(x=Be()),m==="candidate"){if(u==="candidate"){Ee(A,f);return}(u==="queue"||/^s[1-5]$/.test(u))&&Ze(A);return}if(m==="queue"||/^s[1-5]$/.test(m)){let B=m==="queue"?"parallel":m;u===m?Qe(A,B,x):Ge(A,B)}}function vt(_){Y=_,ly(_),Ue()}function pt(_){D=_==="board"||_==="created"||_==="spec"?_:pa,fy(D),Ue()}function Rt(_){U=En(_),my(U),w?.(U),Ue()}function It(_){let y=_.target?.closest?.(".worker-serial-lane-count");if(y){let x=Number.parseInt(y.value,10);Number.isFinite(x)&&Q(x).then(Ue);return}let m=_.target?.closest?.(".worker-filter__blocked");if(m){vt({...Y,show_blocked:m.checked});return}let A=_.target?.closest?.(".worker-done-range");if(A){Rt(A.value);return}let u=_.target?.closest?.(".worker-sort");if(u){pt(u.value||pa);return}let f=_.target?.closest?.(".worker-slots__input");if(!f)return;let v=Number.parseInt(f.value,10);if(!Number.isFinite(v)){Ue();return}O(v).then(Ue)}function Ht(_){return _?{runner:_.runner||void 0,model:_.model||void 0,effort:_.effort||void 0,worktree:_.worktree||void 0,status:_.status||void 0,session_id:_.session_id||void 0}:{}}function Jt(){let _=dt();return{operations:_.repo_operations,cleanup_failures:_.cleanup_failures,repo:d&&d()||""}}function wt(){Le&&je.close(),Me.hidden=!1,ze.hidden=!1,Ye.open(Jt()),Ue()}function en(_){let y=J(),m=y.attempts?y.attempts[_]:null;Le=_,We=null,Ye.close(),Me.hidden=!0,ze.hidden=!1,je.open({attempt_id:_,meta:Ht(m)}),Ue()}function fn(_,y){Le=null,We=_,Ye.close(),Me.hidden=!0,ze.hidden=!1,je.open({attempt_id:_,meta:y,hide_prompt:!0}),Ue()}function Ln(){if(Ye.isOpen()&&Ye.refresh(Jt()),We){let m=(o?.get()?.runs||[]).find(A=>A.run_id===We);m?je.updateMeta(tl(m)):je.close();return}if(!Le)return;let _=J(),y=_.attempts?_.attempts[Le]:null;if(y){je.updateMeta(Ht(y));return}je.close()}function T(_){let y=_.target;if(y?.closest?.(".worker-mini__serial, .worker-mini__grip")||y?.closest?.("#worker-parallel-analysis-dialog"))return;let m=y?.closest?.(".mon-overlap__chip");if(m){let Ne=m.closest("[data-bead-id]"),at=Ne&&Ne.getAttribute("data-bead-id")||"";if(at){let an=m.getAttribute("data-overlap-id")||"";z=!!z&&z.bead_id===at&&z.counterpart_id===an?null:{bead_id:at,counterpart_id:an},Ue()}return}let A=y?.closest?.(".mon-overlap__place");if(A){let Ne=A.closest("[data-bead-id]"),at=Ne&&Ne.getAttribute("data-bead-id")||"";at&&$e(at,A.getAttribute("data-counterpart-id")||"");return}if(y?.closest?.(".mon-overlap__popover"))return;if(y?.closest?.(".worker-analysis-btn")){te?.open();return}if(y?.closest?.(".worker-repo-strip")||y?.closest?.(".worker-mini__timeline")){wt();return}let u=y?.closest?.(".worker-repo-op__session");if(u){let Ne=u.dataset.attemptId;Ne&&en(Ne);return}let f=y?.closest?.(".worker-repo-op__resolve");if(f){g(f.dataset.operationId||"");return}let v=y?.closest?.(".worker-repo-op__dismiss");if(v){k(v.dataset.operationId||"");return}let x=y?.closest?.(".worker-cleanup__resume");if(x){let Ne=x.dataset.beadId;Ne&&ut(Ne);return}let B=y?.closest?.(".worker-banner__resume");if(B){let Ne=B.dataset.attemptId;Ne&&yt(Ne);return}let W=y?.closest?.(".worker-banner__discard");if(W){let Ne=W.dataset.confirmation==="merged"?"merged":"unmerged";pe(W.dataset.beadId||"",W.dataset.attemptId||null,Ne,W.dataset.operationId||null);return}let ne=y?.closest?.(".worker-banner__dismiss");if(ne){let Ne=ne.dataset.attemptId;Ne&&Et(Ne);return}if(y?.closest?.(".worker-play")){fe(!J().auto_advance);return}let me=y?.closest?.(".worker-merge-all");if(me){me.classList.contains("worker-merge-all--stop")?J().auto_merge===!0?Re(!1):K():Re(!0);return}let Je=y?.closest?.(".worker-pane__hd--toggle");if(Je){let Ne=Je.dataset.lane;(Ne==="queue"||Ne==="done")&&Mt(Ne);return}let jt=y?.closest?.(".worker-card__place-lane");if(jt){let Ne=jt.dataset.beadId,at=jt.dataset.lane;Ne&&(at==="parallel"||/^s[1-5]$/.test(at||""))&&(ie=null,Ue(),Ge(Ne,at));return}if(y?.closest?.(".worker-card__place-cancel")){ie=null,Ue();return}let Bt=y?.closest?.(".worker-card__place");if(Bt){let Ne=Bt.dataset.beadId;Ne&&!Bt.disabled&&(Ce()?(ie=Ne,Ue()):Ge(Ne,"parallel"));return}let Sn=y?.closest?.(".worker-filter__chip");if(Sn){let Ne=Sn.dataset.spec;(Ne==="all"||Ne==="with"||Ne==="without")&&vt({...Y,spec:Ne});return}let on=y?.closest?.(".worker-mini__merge");if(on){let Ne=on.dataset.beadId||"";J().cleanup_failed?.[Ne]?ut(Ne):Ot(Ne);return}let Os=y?.closest?.(".worker-mini__merge-cancel");if(Os){I(Os.dataset.beadId||"");return}let nr=y?.closest?.(".worker-mini__discard");if(nr){pe(nr.dataset.beadId||"",nr.dataset.attemptId||null,nr.dataset.discardMode==="merged"?"merged":"unmerged",nr.dataset.operationId||null);return}let Wn=y?.closest?.(".worker-mini__stale-continue");if(Wn){C("worker-stale-work-continue",Wn.dataset.beadId||"",Wn.dataset.actionId||"");return}let zn=y?.closest?.(".worker-mini__stale-backup");if(zn){C("worker-stale-work-backup-fresh",zn.dataset.beadId||"",zn.dataset.actionId||"");return}let hr=y?.closest?.(".worker-mini__stale-recheck");if(hr){C("worker-stale-work-recheck",hr.dataset.beadId||"",hr.dataset.actionId||"");return}let Hr=y?.closest?.(".worker-mini__revise-fix");if(Hr){G("worker-revise-fix",Hr.dataset.beadId||"");return}let Ls=y?.closest?.(".worker-mini__revise-approve");if(Ls){G("worker-revise-approve",Ls.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__discard")){let Ne=y?.closest?.(".rtile"),at=Ne?.dataset?.beadId,an=Ne?.dataset?.attemptId;at&&pe(at,an||null,"unmerged",y?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(y?.closest?.(".rtile__dismiss")){let at=y?.closest?.(".rtile")?.dataset?.attemptId;at&&Et(at);return}if(y?.closest?.(".rtile__pause")){let at=y?.closest?.(".rtile")?.dataset?.attemptId;at&&rt(at);return}if(y?.closest?.(".rtile__resume")){let at=y?.closest?.(".rtile")?.dataset?.attemptId;at&&yt(at);return}if(y?.closest?.(".rtile__session")){let at=y?.closest?.(".rtile")?.dataset?.attemptId;at&&en(at);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){Ye.close(),je.close();return}if(y?.closest?.(".worker-drawer-host"))return;let yr=y?.closest?.(".rtile .board-card__roll-toggle");if(yr){let Ne=yr.dataset.rollParent;Ne&&(ke.has(Ne)?ke.delete(Ne):ke.add(Ne),Ue());return}let rr=y?.closest?.(".rtile .board-card__roll-child");if(rr){let Ne=rr.dataset.childId;Ne&&c&&c(Ne);return}let Hn=y?.closest?.(".rtile");if(Hn){if(y?.closest?.(".rtile__id")){let at=Hn.dataset.beadId;at&&cn(at).then(an=>{an?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ne=Hn.dataset.beadId;Ne&&c&&c(Ne);return}let Gr=y?.closest?.(".worker-mini, .worker-card");if(Gr){let Ne=Gr.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){Ne&&cn(Ne).then(an=>{an?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let at=y?.closest?.(".ctl-chip--from");if(at){let an=at.dataset.fromId;an&&c&&c(an);return}Ne&&c&&c(Ne)}}e.addEventListener("pointerdown",et),e.addEventListener("dragstart",Ie),e.addEventListener("dragover",R),e.addEventListener("dragleave",de),e.addEventListener("drop",ot),e.addEventListener("click",T),e.addEventListener("change",It);function L(_){if(!z)return;let y=_.target;y&&typeof y.closest=="function"&&y.closest(".mon-overlap__popover, .mon-overlap__chip")||(z=null,Ue())}function Pe(_){_.key!=="Escape"||!z||(z=null,Ue())}return document.addEventListener("click",L),document.addEventListener("keydown",Pe),V.push(()=>{document.removeEventListener("click",L),document.removeEventListener("keydown",Pe)}),Xt(),$&&V.push($.subscribe(()=>{for(let[_,y]of S)y==="failed"&&S.delete(_);Ue()})),s&&V.push(s.subscribe(()=>{let _=d&&d()||"";_!==ct&&(ct=_,tt.close()),Ue(),Ln()})),o&&typeof o.subscribe=="function"&&V.push(o.subscribe(()=>{Ln(),Ue()})),Ue(),{load(){ce(),Ue()},refreshSessionDefaults:ve,destroy(){for(let _ of V.splice(0))try{_()}catch{}e.removeEventListener("pointerdown",et),e.removeEventListener("dragstart",Ie),e.removeEventListener("dragover",R),e.removeEventListener("dragleave",de),e.removeEventListener("drop",ot),e.removeEventListener("click",T),e.removeEventListener("change",It);try{je.destroy()}catch{}ze.hidden=!0;try{te?.destroy()}catch{}try{tt.destroy()}catch{}Ve(l``,e)}}}function al(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function af(e,t,n,r=async()=>{},s=async()=>{}){let o=St("views:workspace-picker"),a=null,i=!1,c=!1,d=!1;async function p(U){let M=U.target.value,Ae=t.getState().workspace?.current?.path||"";if(M&&M!==Ae){o("switching workspace to %s",M),i=!0,D();try{await n(M)}catch(be){o("workspace switch failed: %o",be)}finally{i=!1,D()}}}async function b(){let U=t.getState(),S=U.workspace?.current?.path||U.workspace?.available?.[0]?.path||"";if(!(!S||c)){o("git-pulling workspace %s",S),c=!0,D();try{await r(S)}catch(M){o("workspace git pull failed: %o",M)}finally{c=!1,D()}}}function w(U){let S=U.target;S&&e.contains(S)||N()}function $(U){U.key==="Escape"&&N()}function E(){d||(d=!0,document.addEventListener("mousedown",w),document.addEventListener("keydown",$),D())}function N(){d&&(d=!1,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",$),D())}function j(){d?N():E()}async function Y(U){let S=U.target,M=S.value,re=S.checked;o("toggling visibility %s \u2192 %s",M,String(re));try{await s(M,re)}catch(Ae){o("workspace visibility toggle failed: %o",Ae)}}function ie(U){return U?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${b}
        ?disabled=${i||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function z(U,S){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${j}
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
                ${U.map(M=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${M.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${M.path}"
                        .checked=${!S.has(M.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${al(M.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let U=t.getState(),S=U.workspace?.current,M=U.workspace?.available||[],re=new Set(U.workspace?.hidden||[]),Ae=S?.path||M[0]?.path||"";if(M.length===0)return l``;let be=M.filter(H=>!re.has(H.path)||H.path===Ae);if(be.length<=1){let H=be[0]||M[0],X=al(H.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${H.path}"
            >${X}</span
          >
          ${z(M,re)}
          ${ie(Ae)}
          ${c?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||c}
          aria-label="Select project workspace"
        >
          ${be.map(H=>l`
              <option
                value="${H.path}"
                ?selected=${H.path===Ae}
                title="${H.path}"
              >
                ${al(H.path)}
              </option>
            `)}
        </select>
        ${z(M,re)}
        ${ie(Ae)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){Ve(q(),e)}return D(),a=t.subscribe(()=>D()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",w),document.removeEventListener("keydown",$),Ve(l``,e)}}}var lf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function il(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function cf(e,t,n=il()){return{id:n,type:e,payload:t}}function uf(e={}){let t=St("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,d=new Map,p=[],b=new Map,w=new Set;function $(q){for(let D of Array.from(w))try{D(q)}catch{}}function E(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),$(o);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),D=(n.jitterRatio||0)*q,U=Math.max(0,Math.round(q+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",U,a+1),i=setTimeout(()=>{i=null,z()},U)}function N(q){try{s?.send(JSON.stringify(q))}catch(D){t("ws send failed",D)}}function j(){for(o="open",t("ws open"),$(o),a=0;p.length;){let q=p.shift();q&&N(q)}}function Y(q){let D;try{D=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(d.has(D.id)){let S=d.get(D.id);d.delete(D.id),D.ok?S?.resolve(D.payload):S?.reject(D.error||new Error("ws error"));return}let U=b.get(D.type);if(U&&U.size>0)for(let S of Array.from(U))try{S(D.payload)}catch(M){t("ws event handler error",M)}else t("ws received unhandled message type: %s",D.type)}function ie(){o="closed",t("ws closed"),$(o);for(let[q,D]of d.entries())D.reject(new Error("ws disconnected")),d.delete(q);a+=1,E()}function z(){if(!c)return;let q=r();try{s=new WebSocket(q),t("ws connecting %s",q),o="connecting",$(o),s.addEventListener("open",j),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",ie)}catch(D){t("ws connect failed %o",D),E()}}return z(),{send(q,D){if(!lf.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let U=il(),S=cf(q,D,U);return t("send %s id=%s",q,U),new Promise((M,re)=>{d.set(U,{resolve:M,reject:re,type:q}),s&&s.readyState===s.OPEN?N(S):(t("queue %s id=%s (state=%s)",q,U,o),p.push(S))})},on(q,D){b.has(q)||b.set(q,new Set);let U=b.get(q);return U?.add(D),()=>{U?.delete(D)}},onConnection(q){return w.add(q),()=>{w.delete(q)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,z()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Py(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Dy(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var ll=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],df=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],er="tab:worker:closed",My="bdui.worker.done-range",pf=fp,ff="worker:queue",_f="worker:parallel-analysis",mf="ui:order",gf="ui:display-policy",bf="exec:presets",tr="tab:board:closed",hf="beads-ui.board.closed-range";function Ny(e){let t=St("main");t("bootstrap start");let n=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ve(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(a&&Ip(a),i&&c&&d&&p){let ee=function(T,L){let Pe="Request failed",_="";if(T&&typeof T=="object"){let m=T;if(typeof m.message=="string"&&m.message.length>0&&(Pe=m.message),typeof m.details=="string")_=m.details;else if(m.details&&typeof m.details=="object")try{_=JSON.stringify(m.details,null,2)}catch{_=""}}else typeof T=="string"&&T.length>0&&(Pe=T);let y=L&&L.length>0?`Failed to load ${L}`:"Request failed";V.open(y,Pe,_)},Ke=function(T){return`${et.getState().workspace.current?.path||""}\0${T}`},Oe=function(){je&&(je().catch(()=>{}),je=null),Ye=null,tt=null},Be=function(T){ct=T;let L=()=>{ct!==T||et.getState().selected_id!==T||(ct=null,we(T))};if(!J){te.then(L);return}L()},rt=function(T,L,Pe,_,y){return Pe!==Ze[L]?(y().catch(()=>{}),!1):(T.set(_,y),!0)},Et=function(){let T=et.getState();Re(T.view==="board"),fe(T.view==="worker"),Z(T.view==="monitor"),k(T.view==="board"||T.view==="worker"||yt||!!T.selected_id)},ut=function(){let T=cr(it);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},He=function(){let T=cr(Ot);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},Re=function(T){if(T)for(let[L,Pe]of ll){if(Ge.has(L)||Qe.has(L))continue;let _=L===tr?ut():{type:Pe};try{le.register(L,_)}catch(A){t("register %s store failed: %o",L,A)}Qe.add(L);let y=Ze.board,m=!1;De.subscribeList(L,_).then(A=>{m=!rt(Ge,"board",y,L,A)}).catch(A=>{t("subscribe %s failed: %o",L,A),ee(A,"board")}).finally(()=>{Qe.delete(L),m&&Et()})}else pe()},pe=function(){Ze.board+=1;for(let[T]of ll){let L=Ge.get(T);L&&(L().catch(()=>{}),Ge.delete(T));try{le.unregister(T)}catch(Pe){t("unregister %s failed: %o",T,Pe)}}},fe=function(T){if(!T){g();return}for(let[L,Pe]of df){if(C.has(L)||Qe.has(L))continue;let _=L===er?He():{type:Pe};try{le.register(L,_)}catch(A){t("register %s store failed: %o",L,A)}Qe.add(L);let y=Ze.worker,m=!1;De.subscribeList(L,_).then(A=>{m=!rt(C,"worker",y,L,A)}).catch(A=>{t("subscribe %s failed: %o",L,A),ee(A,"worker")}).finally(()=>{Qe.delete(L),m&&Et()})}},g=function(){Ze.worker+=1;for(let[T]of df){let L=C.get(T);L&&(L().catch(()=>{}),C.delete(T));try{le.unregister(T)}catch(Pe){t("unregister %s failed: %o",T,Pe)}}},k=function(T){if(!T){O();return}G||(ve("subscribe-worker-queue",{id:ff}).catch(L=>{t("subscribe-worker-queue failed: %o",L)}),ve("subscribe-worker-parallel-analysis",{id:_f}).catch(L=>{t("subscribe-worker-parallel-analysis failed: %o",L)}),G=()=>(ve("unsubscribe-worker-parallel-analysis",{id:_f}),ve("unsubscribe-worker-queue",{id:ff})))},O=function(){G&&(G().catch(()=>{}),G=null),P.clear()},Z=function(T){if(!T){_e();return}Q||(ve("subscribe-monitor-pipeline",{id:pf}).catch(L=>{t("subscribe-monitor-pipeline failed: %o",L)}),Q=()=>ve("unsubscribe-monitor-pipeline",{id:pf}))},_e=function(){Q&&(Q().catch(()=>{}),Q=null)},$e=function(){Te||(ve("subscribe-ui-order",{id:mf}).catch(T=>{t("subscribe-ui-order failed: %o",T)}),Te=()=>ve("unsubscribe-ui-order",{id:mf}))},st=function(){Te&&(Te().catch(()=>{}),Te=null),Me.clear()},Se=function(){dt||(ve("subscribe-display-policy",{id:gf}).catch(T=>{t("subscribe-display-policy failed: %o",T)}),dt=()=>ve("unsubscribe-display-policy",{id:gf}))},bt=function(){dt&&(dt().catch(()=>{}),dt=null),qe.clear()},Ft=function(){gt||(ve("subscribe-impl-presets",{id:bf}).catch(T=>{t("subscribe-impl-presets failed: %o",T)}),gt=()=>ve("unsubscribe-impl-presets",{id:bf}))},Mt=function(T){if(!T)return"Unknown";let L=T.split("/").filter(Boolean);return L.length>0?L[L.length-1]:"Unknown"},It=function(T,L){Rt.open(T.path,{missing_state:T.missing_state,...L?{workspace:L}:{}})};var b=ee,w=Ke,$=Oe,E=Be,N=rt,j=Et,Y=ut,ie=He,z=Re,q=pe,D=fe,U=g,S=k,M=O,re=Z,Ae=_e,be=$e,H=st,X=Se,ye=bt,ke=Ft,he=Mt,se=It;let xe=document.getElementById("header-loading"),ge=Sc(xe),V=md(e),ce=uf(),ve=ge.wrapSend((T,L)=>ce.send(T,L)),De=hc(ve),le=yc(),ze=kc(),P=wc(),ue=rc(),Me=vc(),qe=tc(),Le=nc(),We=sc();ce.on("impl-presets-snapshot",T=>{let L=T;L&&typeof L.revision=="number"&&Array.isArray(L.presets)&&Le.set({revision:L.revision,presets:L.presets})}),ce.on("monitor-pipeline-snapshot",T=>{let L=T;if(!(!L||!Array.isArray(L.workspaces)))try{ue.set(L.workspaces,L.workspaces_state,L.cross_lanes)}catch{}}),ce.on("ui-order-snapshot",T=>{let L=T;if(L&&typeof L.revision=="number")try{Me.set({revision:L.revision,order:L.order&&typeof L.order=="object"?L.order:{}})}catch{}}),ce.on("display-policy-snapshot",T=>{let L=T;if(L&&L.policy&&typeof L.policy=="object")try{qe.set(L.policy)}catch{}}),ce.on("session-log-snapshot",T=>{let L=T;if(L&&typeof L.id=="string")try{We.set(L.id,Array.isArray(L.lines)?L.lines:[],typeof L.last_event_at=="number"?L.last_event_at:null)}catch{}}),ce.on("session-log-append",T=>{let L=T;if(L&&typeof L.id=="string")try{We.append(L.id,L.event)}catch{}}),ce.on("snapshot",T=>{let L=T,Pe=L&&typeof L.id=="string"?L.id:"",_=Pe?le.getStore(Pe):null;if(_&&L&&L.type==="snapshot")try{_.applyPush(L)}catch{}}),ce.on("upsert",T=>{let L=T,Pe=L&&typeof L.id=="string"?L.id:"",_=Pe?le.getStore(Pe):null;if(_&&L&&L.type==="upsert")try{_.applyPush(L)}catch{}}),ce.on("delete",T=>{let L=T,Pe=L&&typeof L.id=="string"?L.id:"",_=Pe?le.getStore(Pe):null;if(_&&L&&L.type==="delete")try{_.applyPush(L)}catch{}});let je=null,Ye=null,tt=null,ct=null,_t=()=>{},te=new Promise(T=>{_t=()=>T(void 0)}),J=!1,Ce=!1;async function we(T){let L=Ke(T);if(L===Ye||L===tt)return;tt=L;let Pe=`detail:${T}`,_={type:"issue-detail",params:{id:T}};try{le.register(Pe,_)}catch(y){t("register detail store failed: %o",y)}try{let y=await De.subscribeList(Pe,_);if(et.getState().selected_id!==T||Ke(T)!==L){await y().catch(()=>{});return}je&&await je().catch(()=>{}),je=y,Ye=L}catch(y){t("detail subscribe failed: %o",y),ee(y,"issue details")}finally{tt===L&&(tt=null)}}let Ge=new Map,Qe=new Set,Ze={board:0,worker:0},yt=!1,it=Vs;try{let T=window.localStorage.getItem(hf);Da(T)&&(it=T)}catch{}let Ot="today";try{let T=window.localStorage.getItem(My);T!==null&&(Ot=En(T))}catch{}async function I(T){if(!Da(T)||T===it)return;it=T;try{window.localStorage.setItem(hf,T)}catch{}let L=Ge.get(tr);if(!L)return;Ge.delete(tr),await L().catch(()=>{});let Pe=ut();try{le.register(tr,Pe)}catch(_){t("register %s store failed: %o",tr,_)}try{let _=await De.subscribeList(tr,Pe);Ge.set(tr,_)}catch(_){t("re-subscribe %s failed: %o",tr,_),ee(_,"board")}}async function K(T){let L=En(T);if(L===Ot)return;Ot=L;let Pe=C.get(er);if(!Pe)return;C.delete(er),await Pe().catch(()=>{});let _=He();try{le.register(er,_)}catch(y){t("register %s store failed: %o",er,y)}try{let y=await De.subscribeList(er,_);C.set(er,y)}catch(y){t("re-subscribe %s failed: %o",er,y),ee(y,"worker")}}let C=new Map,G=null,Q=null,Te=null,dt=null,gt=null;async function Gt(){dt=null,qe.clear(),gt=null,Le.clear(),G=null,Q=null,Ge.clear(),C.clear(),Ze.board+=1,Ze.worker+=1,Ft();let T=et.getState().workspace.current?.path;if(T)try{await ce.send("set-workspace",{path:T})}catch(Pe){t("workspace restore after reconnect failed: %o",Pe);return}Se();let L=et.getState();Re(L.view==="board"),fe(L.view==="worker"),Z(L.view==="monitor"),k(L.view==="board"||L.view==="worker"||!!L.selected_id)}async function Nt(){t("clearing all subscriptions for workspace switch"),pe(),g(),O(),ze.clear(),st(),$e(),bt(),Se(),Oe();let T=et.getState();if(T.selected_id)try{le.unregister(`detail:${T.selected_id}`)}catch{}let L=et.getState();Re(L.view==="board"),fe(L.view==="worker"),Z(L.view==="monitor"),k(L.view==="board"||L.view==="worker"||!!L.selected_id),L.selected_id&&Be(L.selected_id)}async function Dt(T){t("requesting workspace switch to %s",T),Ce=!0;try{let L=await ce.send("set-workspace",{path:T});t("workspace switch result: %o",L),L&&L.workspace&&(et.setState({workspace:{current:{path:L.workspace.root_dir,database:L.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",T),L.changed&&(await Nt(),ae("Switched to "+Mt(T),"success",2e3)))}catch(L){throw t("workspace switch failed: %o",L),ae("Failed to switch workspace","error",3e3),L}finally{Ce=!1}}async function pn(T){t("requesting workspace git pull for %s",T);try{let L=await ce.send("git-pull-workspace",{});t("workspace git pull result: %o",L);let Pe=L?.status;if(Pe==="up_to_date"){ae("Already up to date","success",2e3);return}if(Pe==="stash_pop_conflict"){ae("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ae("Git pulled "+Mt(T),"success",2e3)}catch(L){t("workspace git pull failed: %o",L);let Pe=L?.code,_=L?.message;if(Pe==="rebase_conflict"){ae("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Pe==="rebase_conflict_abort_failed"){ae("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Pe==="busy"){ae("Git pull skipped: another operation is running","warning",3e3);return}let y=_?`: ${_}`:"";throw ae(`Git pull failed${y}`,"error",3e3),L}}async function At(T,L){t("setting workspace visibility %s \u2192 %s",T,String(L));try{await ce.send("set-workspace-visibility",{path:T,visible:L}),await Ue()}catch(Pe){t("workspace visibility update failed: %o",Pe),ae("Failed to update project visibility","error",3e3)}}async function Ue(){try{let T=await ce.send("list-workspaces",{});if(t("workspaces loaded: %o",T),T&&Array.isArray(T.workspaces)){let L=T.workspaces.map(m=>({path:m.path,database:m.database,pid:m.pid,version:m.version})),Pe=T.current?{path:T.current.root_dir,database:T.current.db_path}:null,_=Array.isArray(T.hidden)?T.hidden.filter(m=>typeof m=="string"):[];et.setState({workspace:{current:Pe,available:L,hidden:_}});let y=window.localStorage.getItem("beads-ui.workspace");y&&(!L.some(A=>A.path===y)||_.includes(y)?window.localStorage.removeItem("beads-ui.workspace"):Pe&&y!==Pe.path&&(t("restoring saved workspace preference: %s",y),await Dt(y)))}}catch(T){t("failed to load workspaces: %o",T)}}ce.on("workspace-changed",T=>{t("workspace-changed event: %o",T),T&&T.root_dir&&(et.setState({workspace:{current:{path:T.root_dir,database:T.db_path}}}),Ue(),Nt())});let Xt=!1;if(typeof ce.onConnection=="function"){let T=L=>{t("ws state %s",L),L==="reconnecting"||L==="closed"?(Xt=!0,ae("Connection lost. Reconnecting\u2026","error",4e3)):L==="open"&&Xt&&(Xt=!1,ae("Reconnected","success",2200),Dy(et,(Pe,_)=>{t(`${Pe}: %o`,_)}),Gt())};ce.onConnection(T)}let Qt="board";try{let T=window.localStorage.getItem("beads-ui.view");(T==="board"||T==="worker"||T==="monitor")&&(Qt=T)}catch(T){t("view parse error: %o",T)}let et=Ac({config:Py(),view:Qt});ce.on("worker-queue-snapshot",T=>{let L=T;if(!L||!L.queue)return;let Pe=et.getState().workspace.current?.path;if(typeof Pe=="string"&&Pe.length>0&&L.root_dir!==Pe){t("dropping worker-queue snapshot for %s",String(L.root_dir));return}try{ze.set(L.queue)}catch{}}),ce.on("worker-parallel-analysis-snapshot",T=>{let L=T;if(!L)return;let Pe=et.getState().workspace.current?.path;if(!(typeof Pe=="string"&&Pe.length>0&&typeof L.root_dir=="string"&&L.root_dir!==Pe))try{P.set({settings:L.settings,job:L.job??null,runs:Array.isArray(L.runs)?L.runs:[],last_good:L.last_good??null})}catch{}});let Ie=$c(et);Ie.start();let R=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),de=async(T,L)=>{try{return await ve(T,L)}catch(Pe){if(R.has(T))throw Pe;return[]}};mp({global_element:r,repo_element:s},et,Ie);let Ee=document.getElementById("workspace-picker");Ee&&af(Ee,et,Dt,pn,At);let ot=yp(e,(T,L)=>ve(T,L));try{let T=document.getElementById("new-issue-btn");T&&T.addEventListener("click",()=>ot.open())}catch{}let vt=$p(e,{policyStore:qe,queueStore:ze,implPresetStore:Le,transport:(T,L)=>ve(T,L),onOpenChange:T=>{let L=yt;yt=T,Et(),L&&T===!1&&Jt.refreshSessionDefaults()},labelOptions:()=>{let T=new Set;for(let[L]of ll)for(let Pe of le.snapshotFor(L)||[]){let _=Pe.labels;if(Array.isArray(_))for(let y of _)typeof y=="string"&&y.length>0&&T.add(y)}return Array.from(T).sort()}});try{let T=document.getElementById("display-settings-btn");T&&(T.setAttribute("aria-label","\uC124\uC815"),T.setAttribute("title","\uC124\uC815"),T.addEventListener("click",()=>vt.open()))}catch{}let pt=document.createElement("div");pt.className="md-viewer-root",document.body.appendChild(pt);let Rt=Fo(pt,{getWorkspacePath:()=>et.getState().workspace.current?.path}),Ht=Bc(i,{gotoIssue:T=>Ie.gotoIssue(T),issueStores:le,transport:de,workerQueueStore:ze,uiOrderStore:Me,displayPolicyStore:qe,closedRange:it,onClosedRangeChange:T=>{I(T)},onNewIssue:()=>ot.open(),openDoc:It}),Jt=ol(c,{transport:de,issueStores:le,queueStore:ze,analysisStore:P,sessionLogStore:We,uiOrderStore:Me,gotoIssue:T=>et.setState({selected_id:T}),getWorkspacePath:()=>et.getState().workspace.current?.path,openDoc:It,doneRange:Ot,onDoneRangeChange:T=>{K(T)}}),wt=_p(d,{transport:de,pipelineStore:ue,execPresetStore:Le,sessionLogStore:We,router:Ie,gotoIssue:T=>Ie.gotoIssue(T),getWorkspacePath:()=>et.getState().workspace.current?.path,switchWorkspace:T=>Dt(T),openDoc:It}),en=_d(p,{issueStores:le,transport:de,queueStore:ze,execPresetStore:Le,sessionLogStore:We,getWorkspacePath:()=>et.getState().workspace.current?.path,mdViewer:Rt,onNavigate:T=>{et.getState().view==="worker"?et.setState({selected_id:T}):Ie.gotoIssue(T)},onClose:()=>{let T=et.getState();et.setState({selected_id:null});try{Ie.gotoView(T.view==="worker"||T.view==="monitor"?T.view:"board")}catch{}},onOpenExecPresets:()=>{vt.open("execution")}}),fn=et.getState().selected_id;fn&&(p.hidden=!1,en.load(fn),Be(fn)),et.subscribe(T=>{let L=T.selected_id;L?(p.hidden=!1,en.load(L),Ce||Be(L)):(en.clear(),p.hidden=!0,Oe())});let Ln=T=>{i.hidden=T.view!=="board",c.hidden=T.view!=="worker",d.hidden=T.view!=="monitor",o&&o.classList.toggle("is-quiet",T.view==="monitor"),Re(T.view==="board"),fe(T.view==="worker"),Z(T.view==="monitor"),k(T.view==="board"||T.view==="worker"||yt||!!T.selected_id),!T.selected_id&&T.view==="board"&&Ht.load(),T.view==="worker"&&Jt.load(),T.view==="monitor"?wt.load():wt.pause(),window.localStorage.setItem("beads-ui.view",T.view)};et.subscribe(Ln),Ln(et.getState()),$e(),Se(),Ft(),Ue().finally(()=>{J=!0,_t()}),window.addEventListener("keydown",T=>{let L=T.ctrlKey||T.metaKey,Pe=String(T.key||"").toLowerCase(),_=T.target,y=_&&_.tagName?String(_.tagName).toLowerCase():"",m=y==="input"||y==="textarea"||y==="select"||_&&typeof _.isContentEditable=="boolean"&&_.isContentEditable;L&&Pe==="n"&&(m||(T.preventDefault(),ot.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Ny(t)});export{Ny as bootstrap,Py as readBootstrapConfig,Dy as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
