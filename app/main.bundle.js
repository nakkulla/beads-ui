var Tf=Object.create;var Ea=Object.defineProperty;var Cf=Object.getOwnPropertyDescriptor;var Rf=Object.getOwnPropertyNames;var Of=Object.getPrototypeOf,Lf=Object.prototype.hasOwnProperty;var If=(e,t,n)=>t in e?Ea(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ta=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Pf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Rf(t))!Lf.call(e,s)&&s!==n&&Ea(e,s,{get:()=>t[s],enumerable:!(r=Cf(t,s))||r.enumerable});return e};var Df=(e,t,n)=>(n=e!=null?Tf(Of(e)):{},Pf(t||!e||!e.__esModule?Ea(n,"default",{value:e,enumerable:!0}):n,e));var ht=(e,t,n)=>If(e,typeof t!="symbol"?t+"":t,n);var ec=Ta((My,Jl)=>{var Er=1e3,Tr=Er*60,Cr=Tr*60,pr=Cr*24,qf=pr*7,Ff=pr*365.25;Jl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return jf(e);if(n==="number"&&isFinite(e))return t.long?Uf(e):Bf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function jf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Ff;case"weeks":case"week":case"w":return n*qf;case"days":case"day":case"d":return n*pr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Cr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Tr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Er;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Bf(e){var t=Math.abs(e);return t>=pr?Math.round(e/pr)+"d":t>=Cr?Math.round(e/Cr)+"h":t>=Tr?Math.round(e/Tr)+"m":t>=Er?Math.round(e/Er)+"s":e+"ms"}function Uf(e){var t=Math.abs(e);return t>=pr?Ks(e,t,pr,"day"):t>=Cr?Ks(e,t,Cr,"hour"):t>=Tr?Ks(e,t,Tr,"minute"):t>=Er?Ks(e,t,Er,"second"):e+" ms"}function Ks(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var nc=Ta((Ny,tc)=>{function Wf(e){n.debug=n,n.default=n,n.coerce=c,n.disable=a,n.enable=s,n.enabled=i,n.humanize=ec(),n.destroy=d,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let h=0;for(let y=0;y<p.length;y++)h=(h<<5)-h+p.charCodeAt(y),h|=0;return n.colors[Math.abs(h)%n.colors.length]}n.selectColor=t;function n(p){let h,y=null,$,E;function N(...B){if(!N.enabled)return;let Y=N,le=Number(new Date),U=le-(h||le);Y.diff=U,Y.prev=h,Y.curr=le,h=le,B[0]=n.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let q=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(W,S)=>{if(W==="%%")return"%";q++;let M=n.formatters[S];if(typeof M=="function"){let ne=B[q];W=M.call(Y,ne),B.splice(q,1),q--}return W}),n.formatArgs.call(Y,B),(Y.log||n.log).apply(Y,B)}return N.namespace=p,N.useColors=n.useColors(),N.color=n.selectColor(p),N.extend=r,N.destroy=n.destroy,Object.defineProperty(N,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:($!==n.namespaces&&($=n.namespaces,E=n.enabled(p)),E),set:B=>{y=B}}),typeof n.init=="function"&&n.init(N),N}function r(p,h){let y=n(this.namespace+(typeof h>"u"?":":h)+p);return y.log=this.log,y}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let h=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of h)y[0]==="-"?n.skips.push(y.slice(1)):n.names.push(y)}function o(p,h){let y=0,$=0,E=-1,N=0;for(;y<p.length;)if($<h.length&&(h[$]===p[y]||h[$]==="*"))h[$]==="*"?(E=$,N=y,$++):(y++,$++);else if(E!==-1)$=E+1,N++,y=N;else return!1;for(;$<h.length&&h[$]==="*";)$++;return $===h.length}function a(){let p=[...n.names,...n.skips.map(h=>"-"+h)].join(",");return n.enable(""),p}function i(p){for(let h of n.skips)if(o(p,h))return!1;for(let h of n.names)if(o(p,h))return!0;return!1}function c(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}tc.exports=Wf});var rc=Ta((nn,Ys)=>{nn.formatArgs=Hf;nn.save=Gf;nn.load=Vf;nn.useColors=zf;nn.storage=Kf();nn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();nn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function zf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Hf(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ys.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}nn.log=console.debug||console.log||(()=>{});function Gf(e){try{e?nn.storage.setItem("debug",e):nn.storage.removeItem("debug")}catch{}}function Vf(){let e;try{e=nn.storage.getItem("debug")||nn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Kf(){try{return localStorage}catch{}}Ys.exports=nc()(nn);var{formatters:Yf}=Ys.exports;Yf.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Zr=globalThis,Us=Zr.trustedTypes,ql=Us?Us.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ra="$lit$",Pn=`lit$${Math.random().toFixed(9).slice(2)}$`,Oa="?"+Pn,Mf=`<${Oa}>`,lr=document,Xr=()=>lr.createComment(""),Qr=e=>e===null||typeof e!="object"&&typeof e!="function",La=Array.isArray,zl=e=>La(e)||typeof e?.[Symbol.iterator]=="function",Ca=`[ 	
\f\r]`,Yr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Fl=/-->/g,jl=/>/g,ar=RegExp(`>|${Ca}(?:([^\\s"'>=/]+)(${Ca}*=${Ca}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bl=/'/g,Ul=/"/g,Hl=/^(?:script|style|textarea|title)$/i,Ia=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=Ia(1),es=Ia(2),Cy=Ia(3),mn=Symbol.for("lit-noChange"),Lt=Symbol.for("lit-nothing"),Wl=new WeakMap,ir=lr.createTreeWalker(lr,129);function Gl(e,t){if(!La(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ql!==void 0?ql.createHTML(t):t}var Vl=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Yr;for(let i=0;i<n;i++){let c=e[i],d,p,h=-1,y=0;for(;y<c.length&&(a.lastIndex=y,p=a.exec(c),p!==null);)y=a.lastIndex,a===Yr?p[1]==="!--"?a=Fl:p[1]!==void 0?a=jl:p[2]!==void 0?(Hl.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=ar):p[3]!==void 0&&(a=ar):a===ar?p[0]===">"?(a=s??Yr,h=-1):p[1]===void 0?h=-2:(h=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?ar:p[3]==='"'?Ul:Bl):a===Ul||a===Bl?a=ar:a===Fl||a===jl?a=Yr:(a=ar,s=void 0);let $=a===ar&&e[i+1].startsWith("/>")?" ":"";o+=a===Yr?c+Mf:h>=0?(r.push(d),c.slice(0,h)+Ra+c.slice(h)+Pn+$):c+Pn+(h===-2?i:$)}return[Gl(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Jr=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[d,p]=Vl(t,n);if(this.el=e.createElement(d,r),ir.currentNode=this.el.content,n===2||n===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=ir.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Ra)){let y=p[a++],$=s.getAttribute(h).split(Pn),E=/([.?@])?(.*)/.exec(y);c.push({type:1,index:o,name:E[2],strings:$,ctor:E[1]==="."?zs:E[1]==="?"?Hs:E[1]==="@"?Gs:ur}),s.removeAttribute(h)}else h.startsWith(Pn)&&(c.push({type:6,index:o}),s.removeAttribute(h));if(Hl.test(s.tagName)){let h=s.textContent.split(Pn),y=h.length-1;if(y>0){s.textContent=Us?Us.emptyScript:"";for(let $=0;$<y;$++)s.append(h[$],Xr()),ir.nextNode(),c.push({type:2,index:++o});s.append(h[y],Xr())}}}else if(s.nodeType===8)if(s.data===Oa)c.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(Pn,h+1))!==-1;)c.push({type:7,index:o}),h+=Pn.length-1}o++}}static createElement(t,n){let r=lr.createElement("template");return r.innerHTML=t,r}};function cr(e,t,n=e,r){if(t===mn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=Qr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=cr(e,s._$AS(e,t.values),s,r)),t}var Ws=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??lr).importNode(n,!0);ir.currentNode=s;let o=ir.nextNode(),a=0,i=0,c=r[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new Sr(o,o.nextSibling,this,t):c.type===1?d=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(d=new Vs(o,this,t)),this._$AV.push(d),c=r[++i]}a!==c?.index&&(o=ir.nextNode(),a++)}return ir.currentNode=lr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Sr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Lt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=cr(this,t,n),Qr(t)?t===Lt||t==null||t===""?(this._$AH!==Lt&&this._$AR(),this._$AH=Lt):t!==this._$AH&&t!==mn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):zl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Lt&&Qr(this._$AH)?this._$AA.nextSibling.data=t:this.T(lr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Jr.createElement(Gl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Ws(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Wl.get(t.strings);return n===void 0&&Wl.set(t.strings,n=new Jr(t)),n}k(t){La(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Xr()),this.O(Xr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ur=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Lt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Lt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=cr(this,t,n,0),a=!Qr(t)||t!==this._$AH&&t!==mn,a&&(this._$AH=t);else{let i=t,c,d;for(t=o[0],c=0;c<o.length-1;c++)d=cr(this,i[r+c],n,c),d===mn&&(d=this._$AH[c]),a||(a=!Qr(d)||d!==this._$AH[c]),d===Lt?t=Lt:t!==Lt&&(t+=(d??"")+o[c+1]),this._$AH[c]=d}a&&!s&&this.j(t)}j(t){t===Lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},zs=class extends ur{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Lt?void 0:t}},Hs=class extends ur{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Lt)}},Gs=class extends ur{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=cr(this,t,n,0)??Lt)===mn)return;let r=this._$AH,s=t===Lt&&r!==Lt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Lt&&(r===Lt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Vs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){cr(this,t)}},Kl={M:Ra,P:Pn,A:Oa,C:1,L:Vl,R:Ws,D:zl,V:cr,I:Sr,H:ur,N:Hs,U:Gs,B:zs,F:Vs},Nf=Zr.litHtmlPolyfillSupport;Nf?.(Jr,Sr),(Zr.litHtmlVersions??(Zr.litHtmlVersions=[])).push("3.3.1");var Ve=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Sr(t.insertBefore(Xr(),o),o,void 0,n??{})}return s._$AI(e),s};var ln="today",Vn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function gn(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function dr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Yl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Zl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Xl(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Ql(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var sc=Df(rc(),1);function St(e){return(0,sc.default)(`beads-ui:${e}`)}function wn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function fr(e,t){let n=wn(e.created_at),r=wn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ic(e,t){let n=wn(e.created_at),r=wn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function lc(e,t){let n=wn(e.updated_at),r=wn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function cc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=wn(e.created_at),o=wn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function uc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Zf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function oc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function ac(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Zf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function dc(e,t){let n=oc(e),r=oc(t);if(n!==r)return n<r?-1:1;let s=ac(e),o=ac(t);if(s!==o)return s<o?-1:1;let a=wn(e&&e.created_at),i=wn(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,d=t&&t.id;return c===d?0:String(c)<String(d)?-1:1}var Pa=2**20;function Rr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-wn(e&&e.created_at)}function Zs(e){return(t,n)=>{let r=Rr(t,e),s=Rr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Da(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Rr(i,n)-Pa};if(!i)return{rank:Rr(a,n)+Pa};let c=Rr(a,n),d=Rr(i,n),p=(c+d)/2;return c<p&&p<d?{rank:p}:{renormalize:r.map((h,y)=>({bead_id:h.id,rank:y*Pa}))}}function Ma(e,t={}){let n=St(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||fr;function d(){for(let y of Array.from(a))try{y()}catch{}}function p(){s=Array.from(r.values()).sort(c)}function h(y){if(i||!y||y.id!==e)return;let $=Number(y.revision)||0;if(n("apply %s rev=%d",y.type,$),!($<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if($<=o)return;r.clear();let E=Array.isArray(y.issues)?y.issues:[];for(let N of E)N&&typeof N.id=="string"&&N.id.length>0&&r.set(N.id,N);p(),o=$,d();return}if(y.type==="upsert"){let E=y.issue;if(E&&typeof E.id=="string"&&E.id.length>0){let N=r.get(E.id);if(!N)r.set(E.id,E);else{let B=Number.isFinite(N.updated_at)?N.updated_at:0,Y=Number.isFinite(E.updated_at)?E.updated_at:0;if(B<=Y){for(let le of Object.keys(N))le in E||delete N[le];for(let[le,U]of Object.entries(E))N[le]=U}}p()}o=$,d()}else if(y.type==="delete"){let E=String(y.issue_id||"");E&&(r.delete(E),p()),o=$,d()}}}return{id:e,subscribe(y){return a.add(y),()=>{a.delete(y)}},applyPush:h,snapshot(){return s},size(){return r.size},getById(y){return r.get(y)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Xs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function pc(e){let t=St("subs"),n=new Map,r=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let d=r.get(i);if(!d||d.size===0)return;let p=Array.isArray(c.added)?c.added:[],h=Array.isArray(c.updated)?c.updated:[],y=Array.isArray(c.removed)?c.removed:[];for(let $ of Array.from(d)){let E=n.get($);if(!E)continue;let N=E.itemsById;for(let B of p)typeof B=="string"&&B.length>0&&N.set(B,!0);for(let B of h)typeof B=="string"&&B.length>0&&N.set(B,!0);for(let B of y)typeof B=="string"&&B.length>0&&N.delete(B)}}async function o(i,c){let d=Xs(c);if(t("subscribe %s key=%s",i,d),!n.has(i))n.set(i,{key:d,itemsById:new Map});else{let h=n.get(i);if(h&&h.key!==d){let y=r.get(h.key);y&&(y.delete(i),y.size===0&&r.delete(h.key)),n.set(i,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let p=r.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(h){let y=n.get(i)||null;if(y){let $=r.get(y.key);$&&($.delete(i),$.size===0&&r.delete(y.key))}throw n.delete(i),h}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let h=n.get(i)||null;if(h){let y=r.get(h.key);y&&(y.delete(i),y.size===0&&r.delete(h.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Xs,selectors:{getIds(i){let c=n.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let d=n.get(i);return d?d.itemsById.has(c):!1},count(i){let c=n.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=n.get(i),d={};if(!c)return d;for(let p of c.itemsById.keys())d[p]=!0;return d}}}}function fc(){let e=St("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let c of Array.from(r))try{c()}catch{}}function a(c,d,p){let h=d?Xs(d):"",y=n.get(c)||"",$=t.has(c);if(e("register %s key=%s (prev=%s)",c,h,y),$&&y&&h&&y!==h){let E=t.get(c);if(E)try{E.dispose()}catch{}let N=s.get(c);if(N){try{N()}catch{}s.delete(c)}let B=Ma(c,p);t.set(c,B);let Y=B.subscribe(()=>o());s.set(c,Y)}else if(!$){let E=Ma(c,p);t.set(c,E);let N=E.subscribe(()=>o());s.set(c,N)}return n.set(c,h),()=>i(c)}function i(c){e("unregister %s",c),n.delete(c);let d=t.get(c);d&&(d.dispose(),t.delete(c));let p=s.get(c);if(p){try{p()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let d=t.get(c);return d?d.snapshot().slice():[]},subscribe(c){return r.add(c),()=>r.delete(c)}}}function _c(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function mc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function gc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Na(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Xf(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Qf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function bc(e){let t=St("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Xf(r),a=Qf(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Na(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Na(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Jf=Object.freeze({workspace_config:{default_workspace:null}});function hc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Jf.workspace_config.default_workspace}}}function yc(e={}){let t=St("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:hc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?hc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==n.workspace.hidden[p]),c=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===n.worker.show_closed_children[p])&&!i&&!c||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function vc(e){let t=St("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function c(d){return async(h,y)=>{let $=s++,E=Date.now();r.set($,{type:h,start_ts:E}),t("request start id=%d type=%s count=%d",$,h,n+1),a();let N=!1,B=()=>{N||(N=!0,r.delete($),i())},Y=setTimeout(()=>{N||(t("request TIMEOUT id=%d type=%s elapsed=%dms",$,h,Date.now()-E),B())},3e4);try{let le=await d(h,y),U=Date.now()-E;return t("request done id=%d type=%s elapsed=%dms",$,h,U),le}catch(le){let U=Date.now()-E;throw t("request error id=%d type=%s elapsed=%dms err=%o",$,h,U,le),le}finally{clearTimeout(Y),B()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([p,h])=>({id:p,type:h.type,elapsed_ms:d-h.start_ts}))}}}function ie(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Qs(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(uc),c;switch(i){case"created_desc":return c.sort(fr),c;case"created_asc":return c.sort(ic),c;case"updated_desc":return c.sort(lc),c;case"priority":return c.sort(cc),c;case"manual":default:{let d=n();return d?c.sort(Zs(d)):c.sort(fr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Cn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Ut(e){let t=Cn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function cn(e,t){let n=Cn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function wc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Cn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Js(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function eo(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=Js(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function to(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=wc(n);return{total:n.length,count:r,current:s,children:n}}function no(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let d of i)c[d.bead_id]=d.rank;n&&n.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},p=r(Da(i,c,d.order),a);s(d,p);let h=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(h&&h.conflict){let y={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};n.set(y);let $=r(Da(i,c,y.order),a);s(y,$);let E=await t("ui-order-set",{expected_revision:y.revision,entries:$});E&&E.applied&&n.set({revision:typeof E.revision=="number"?E.revision:0,order:E.order||{}})}else h&&h.applied&&n.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function ro(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function qa(e,t){return!t||typeof e!="string"||e.length===0||ro(t.visible_labels).includes(e)?!0:ro(t.hidden_labels).includes(e)?!1:!ro(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function kc(e,t){return ro(e).filter(n=>qa(n,t))}function Kn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function e_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function t_(e,t,n,r,s){return l`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function n_(e,t,n,r){return l`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${e_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function so(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(dc):a;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?t_(t.parent_id,e.count,n,r,t.onToggle):l`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?l`<div class="board-card__roll-list">
            ${i.map((c,d)=>n_(c,d+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var r_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},xc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},$c={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},s_={review:"\u2713",skip:"\u2298"},Yn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function o_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ac(e){let t=e&&e.fill||"none";return t==="none"?Yn.none:e&&e.stale===!0?Yn.stale:t==="dim"?Yn.dim:e&&e.glyph==="review"?Yn.review:e&&e.glyph==="skip"?Yn.skip:Yn.done}function a_(e){if(!e||e.fill==="none"||!e.approval_state)return Ac(e);let t=[];return e.glyph==="review"?t.push(Yn.review):e.glyph==="skip"&&t.push(Yn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function i_(e,t,n,r){let s=r_[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=s_[t&&t.glyph||""]||"",c="bar";o==="dim"?c+=` b-${s} dim`:o==="full"&&(c+=` b-${s} full`),a&&(c+=" stale"),n&&(c+=" cur");let d=o==="none"?"lbl":`lbl l-${s} on`,p=n?`color: var(--stage-${s}-on)`:"",h=xc[e]||e,y=r?Sc(t):null;if(!y)return l`
      <div class="seg">
        <div class=${c} style=${p}>${i}</div>
        <div class=${d}>${h}</div>
      </div>
    `;let $=`${h} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${y.path}`;return l`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${$}
      title=${$}
      @click=${E=>{E.preventDefault(),E.stopPropagation(),r(E,y,e)}}
    >
      <div class=${c} style=${p}>${i}</div>
      <div class=${d}>${h}</div>
    </button>
  `}function Sc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function oo(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=$c[e.route]||$c.spec_backed,o=e.stages,a=o_(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(d=>`${xc[d]||d} ${d==="plan"?a_(o[d]||{}):Ac(o[d]||{})}`).join(" \xB7 ")}`,c=!!r&&s.some(d=>Sc(o[d]||{})!==null);return l`
    <div
      class="stp"
      role=${c?"group":"img"}
      aria-label=${i}
    >
      ${s.map(d=>i_(d,o[d]||{},d===a,r))}
    </div>
  `}function l_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ec=2;function c_(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,Ec).join(", "),s=n.length-Ec,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Fa(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function ao(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Dn(e){return`${e.kind}:${ao(e)}@${e.sha}`}function io(e,t){if(!e)return null;let n=Fa(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=Fa(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,d=t?` \xB7 exec_receipt ${Dn(t)}`:"";return{kind:e.kind,label:i,title:`${c}${d}`}}function Tc(e,t){let n=io(e,t);return n?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function u_(e){if(!e)return null;let t=Fa(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Dn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function d_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Kn(n,"route")){let i=r.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Kn(n,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Kn(n,"pr")){let i=r.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Tc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Dn(i)}`}
        >${`exec ${i.kind==="delegated"?ao(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of kc(e.labels,n))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Kn(n,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Kn(n,"blocked")&&s.push(...c_(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Kn(n,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function p_(e){let t=cn(e.created_at),n=cn(e.updated_at);return!t&&!n?"":l`<span class="board-card__times">
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
  </span>`}function f_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return so(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:p_(e),empty_label:"children \uC5C6\uC74C",childChips:ja,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function ja(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return io(t,n)?l`<span class="board-card__roll-child-chips">
    ${Tc(t,n)}
    ${u_(n)}
  </span>`:null}function lo(e,t){let n=l_(e.priority);return l`
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
      ${d_(e,t)}
      ${e.workflow&&Kn(t.policy||null,"stepper")?oo(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${f_(e,t)}
    </article>
  `}function Or(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return l`
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
              ${Vn.map(o=>l`<option
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
        ${e.items.map(o=>lo(o,t))}
      </div>
    </section>
  `}function Cc(e,t,n){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>lo(r,t))}
        </div>
      </div>
    </dialog>
  `}var __=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],m_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],g_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function b_(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return l`
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
  `}function Rc(e,t,n){return l`
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
        ${__.map(r=>l`<option
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
        ${m_.map(r=>l`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${b_(e,t,n)}
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
        ${g_.map(r=>l`<option
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
  `}var h_=200,y_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},v_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Oc="beads-ui.board.sort",Lc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function w_(){try{let e=window.localStorage.getItem(Oc);if(e&&Lc.has(e))return e}catch{}return"created_desc"}function Ic(e,t){let n=St("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,h=t.openDoc,y=t.closedRange||ln,$=s?Qs(s,a):null,E=no({transport:o,uiOrderStore:a}),N=[],B=[],Y=[],le=[],U=[],q=[],D=!1,W=0,S=w_(),M=new Map,ne=new Map,Te=new Map,be=new Set,H={search:"",priority:"",type:"",labels:[]},X=!1,he=null;function ke(C){return String(C.status||"open")==="open"}function ge(C){let G=String(C.status||"open");return G==="open"||G==="blocked"}function se(C){let G=H.search.trim().toLowerCase(),pe=H.priority,g=H.type,k=H.labels;return C.filter(O=>{if(G){let Q=String(O.id||"").toLowerCase(),Z=String(O.title||"").toLowerCase();if(!Q.includes(G)&&!Z.includes(G))return!1}if(pe!==""&&String(O.priority)!==pe||g!==""&&String(O.issue_type||"")!==g)return!1;if(k.length>0){let Q=Array.isArray(O.labels)?O.labels:[];if(!k.some(Z=>Q.includes(Z)))return!1}return!0})}function Se(){let C=new Set;for(let G of[N,B,Y,le,U,q])for(let pe of G){let g=Array.isArray(pe.labels)?pe.labels:[];for(let k of g)typeof k=="string"&&k.length>0&&C.add(k)}return Array.from(C).sort()}function ye(){return H.search.trim()!==""||H.priority!==""||H.type!==""||H.labels.length>0}function K(){try{if($){let C=$.selectBoardColumn("tab:board:in-progress","in_progress",S),G=$.selectBoardColumn("tab:board:blocked","blocked",S).filter(ge),pe=new Set(C.map($e=>$e.id)),g=$.selectBoardColumn("tab:board:ready","ready",S).filter($e=>ke($e)&&!pe.has($e.id)),k=$.selectBoardColumn("tab:board:resolved","resolved",S),O=$.selectBoardColumn("tab:board:deferred","deferred",S),Q=$.selectBoardColumn("tab:board:closed","closed").slice(0,h_),Z=[...G,...g,...C,...k,...Q];ee(Z);let fe=new Set;for(let $e of Z)$e&&$e.id&&!Js($e)&&fe.add($e.id);let Ee=!ye();N=Ee?ts(G,fe):G,B=Ee?ts(g,fe):g,Y=Ee?ts(C,fe):C,le=Ee?ts(k,fe):k,U=O,W=O.length,q=Ee?ts(Q,fe):Q,M=new Map;for(let $e of N)M.set($e.id,"open");for(let $e of B)M.set($e.id,"open");for(let $e of Y)M.set($e.id,"in_progress");for(let $e of le)M.set($e.id,"resolved");for(let $e of U)M.set($e.id,"deferred");for(let $e of q)M.set($e.id,"closed");ne=new Map;for(let $e of N)ne.set($e.id,"blocked-col");for(let $e of B)ne.set($e.id,"ready-col");for(let $e of Y)ne.set($e.id,"in-progress-col");for(let $e of le)ne.set($e.id,"resolved-col");for(let $e of q)ne.set($e.id,"closed-col")}rt()}catch{N=[],B=[],Y=[],le=[],U=[],q=[],Te=new Map,rt()}}function ee(C){Te=eo(C)}function me(C){return to(Te,C)}function ve(C){return!be.has(C)}function Me(C,G){C.preventDefault(),C.stopPropagation(),be.has(G)?be.delete(G):be.add(G),rt()}function ae(C,G){C.preventDefault(),C.stopPropagation(),r(G)}function He(C,G){C.preventDefault(),C.stopPropagation(),r(G)}function I(C,G){he||r(G)}function ce(C,G){C.preventDefault(),C.stopPropagation(),k_(G).then(pe=>{pe&&ie("\uBCF5\uC0AC\uB428","success",1200)})}function Le(C,G){he=G,C.dataTransfer&&(C.dataTransfer.setData("text/plain",G),C.dataTransfer.effectAllowed="move"),C.target.classList.add("board-card--dragging")}function qe(C){C.target.classList.remove("board-card--dragging"),ut(),setTimeout(()=>{he=null},0)}function Ie(C){let G=String(C.target.value||"");!G||G===y||(y=G,d&&d(G),rt())}function We(){return i?i.get():null}function je(C){let G=c?c.get():null,pe=G?G.cleanup_failed:null;if(!pe||typeof pe!="object"||Array.isArray(pe))return null;let g=pe[C];return!g||typeof g!="object"||Array.isArray(g)?null:g}let Ye={onCardClick:I,onCopyId:ce,onDragStart:Le,onDragEnd:qe,onClosedRangeChange:Ie,rollupFor:me,isExpanded:ve,onRollupToggle:Me,onChildClick:ae,onFromChipClick:He,onOpenDoc:h?(C,G)=>h(G):void 0,cleanupFailureFor:je,get policy(){return We()}};function tt(C,G){he||(Be(),r(G))}function ct(C,G){C.preventDefault(),C.stopPropagation(),Be(),r(G)}let _t={...Ye,onCardClick:tt,onChildClick:ct,onFromChipClick:ct,onOpenDoc:h?(C,G)=>{Be(),h(G)}:void 0,get policy(){return We()}};function te(C){let G=C.target,pe=e.querySelector(".board-filter__labels");G&&pe&&pe.contains(G)||Ke()}function J(C){C.key==="Escape"&&Ke()}function Ce(){X||(X=!0,document.addEventListener("mousedown",te),document.addEventListener("keydown",J),rt())}function Ke(){X&&(X=!1,document.removeEventListener("mousedown",te),document.removeEventListener("keydown",J),rt())}function Oe(C){C.key==="Escape"&&Be()}function we(){D||(D=!0,document.addEventListener("keydown",Oe),rt())}function Be(){D&&(D=!1,document.removeEventListener("keydown",Oe),rt())}let Ge={onClose:Be,onOverlayClick(C){C.target===C.currentTarget&&Be()}},Qe={onSearchInput(C){H.search=String(C.target.value||""),K()},onPriorityChange(C){H.priority=String(C.target.value||""),K()},onTypeChange(C){H.type=String(C.target.value||""),K()},onSortChange(C){let G=String(C.target.value||"");if(!(!Lc.has(G)||G===S)){S=G;try{window.localStorage.setItem(Oc,G)}catch{}K()}},onDeferredToggle(){D?Be():we()},onLabelMenuToggle(){X?Ke():Ce()},onLabelToggle(C){let G=H.labels.indexOf(C);G===-1?H.labels.push(C):H.labels.splice(G,1),K()},onLabelClear(){H.labels.length!==0&&(H.labels=[],K())},onNewIssue(){p&&p()}};function Ze(){return l`
      <div class="board-view">
        ${Rc(H,Qe,{sort_mode:S,deferred_popup_open:D,deferred_count:W,label_options:Se(),label_menu_open:X})}
        <div class="board-root">
          ${Or({title:"Blocked",id:"blocked-col",items:se(N)},Ye)}
          ${Or({title:"Ready",id:"ready-col",items:se(B)},Ye)}
          ${Or({title:"In progress",id:"in-progress-col",items:se(Y)},Ye)}
          ${Or({title:"Resolved",id:"resolved-col",items:se(le)},Ye)}
          ${Or({title:"Closed",id:"closed-col",items:se(q),is_closed:!0,closed_range:y},Ye)}
        </div>
        ${D?Cc({items:se(U),count:W},_t,Ge):""}
      </div>
    `}function rt(){Ve(Ze(),e),yt()}function yt(){try{let C=e.querySelector("#deferred-popup");C&&!C.open&&(typeof C.showModal=="function"?C.showModal():C.setAttribute("open",""));let G=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let pe of G)Array.from(pe.querySelectorAll(".board-card")).forEach((k,O)=>{k.tabIndex=O===0?0:-1})}catch{}}async function Et(C,G){if(!o){ie("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:C,status:G}),ie("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(pe){n("update-status failed: %o",pe),ie("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function it(C){switch(C){case"blocked-col":return N;case"ready-col":return B;case"in-progress-col":return Y;case"resolved-col":return le;default:return[]}}function Ot(C,G,pe){if(!o||!a)return;let g=it(C),k=g.find(Ee=>Ee.id===G);if(!k)return;let O=g.filter(Ee=>Ee.id!==G),Q=pe.closest?pe.closest(".board-card"):null,Z=O.length;if(Q){let Ee=Q.getAttribute("data-issue-id");if(Ee===G)return;let $e=O.findIndex(st=>st.id===Ee);$e>=0&&(Z=$e)}let fe=O.slice();fe.splice(Z,0,k),E.applyReorder(G,fe,Z)}function ut(){for(let C of Array.from(e.querySelectorAll(".board-column--drag-over")))C.classList.remove("board-column--drag-over")}let ze=null;e.addEventListener("dragover",C=>{C.preventDefault(),C.dataTransfer&&(C.dataTransfer.dropEffect="move");let pe=C.target.closest(".board-column");pe&&pe!==ze&&(ze&&ze.classList.remove("board-column--drag-over"),pe.classList.add("board-column--drag-over"),ze=pe)}),e.addEventListener("dragleave",C=>{let G=C.relatedTarget;(!G||!e.contains(G))&&ze&&(ze.classList.remove("board-column--drag-over"),ze=null)}),e.addEventListener("drop",C=>{C.preventDefault(),ze&&(ze.classList.remove("board-column--drag-over"),ze=null);let G=C.target,pe=G.closest(".board-column");if(!pe)return;let g=C.dataTransfer?.getData("text/plain")||"";if(!g)return;let k=pe.id,O=ne.get(g);if(O&&O===k){if(v_.has(k)){if(S!=="manual"){ie("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ot(k,g,G)}return}let Q=y_[k];if(!Q){ie("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}M.get(g)!==Q&&Et(g,Q)}),e.addEventListener("keydown",C=>{let G=C.target;if(!(G instanceof HTMLElement))return;let pe=String(G.tagName||"").toLowerCase();if(pe==="input"||pe==="textarea"||pe==="select"||pe==="button"||pe==="a"||G.isContentEditable===!0)return;let g=G.closest(".board-card");if(!g)return;let k=String(C.key||"");if(k==="Enter"||k===" "){C.preventDefault();let fe=g.getAttribute("data-issue-id");fe&&r(fe);return}if(k!=="ArrowUp"&&k!=="ArrowDown"&&k!=="ArrowLeft"&&k!=="ArrowRight")return;C.preventDefault();let O=g.closest(".board-column");if(!O)return;let Q=Array.from(O.querySelectorAll(".board-card")),Z=Q.indexOf(g);if(k==="ArrowDown"&&Z<Q.length-1){Re(g,Q[Z+1]);return}if(k==="ArrowUp"&&Z>0){Re(g,Q[Z-1]);return}if(k==="ArrowLeft"||k==="ArrowRight"){let fe=Array.from(e.querySelectorAll(".board-column")),Ee=fe.indexOf(O),$e=k==="ArrowRight"?1:-1,st=Ee+$e;for(;st>=0&&st<fe.length;){let dt=fe[st].querySelector(".board-card");if(dt){Re(g,dt);return}st+=$e}}});function Re(C,G){try{C.tabIndex=-1,G.tabIndex=0,G.focus()}catch{}}let P=null;$&&$.subscribe&&(P=$.subscribe(()=>{try{K()}catch{}}));let V=null;i&&i.subscribe&&(V=i.subscribe(()=>{try{K()}catch{}}));let de=null;return c&&c.subscribe&&(de=c.subscribe(()=>{rt()})),{async load(){n("load"),K()},clear(){Ke(),Be(),P&&(P(),P=null),V&&(V(),V=null),de&&(de(),de=null),e.replaceChildren(),N=[],B=[],Y=[],le=[],U=[],q=[],M=new Map,ne=new Map}}}function ts(e,t){return e.filter(n=>{let r=Js(n);return!(r&&t.has(r))})}async function k_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function un(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function _r(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ns(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function $_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${_r(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${_r(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(c=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),c(p)};r.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Mn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await $_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var x_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Pc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},A_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Nt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ct(e){return typeof e=="string"&&e.length>0?e:null}function Lr(e){return e.startsWith("gpt-")?e.slice(4):e}function $t(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Mc(e,t,n){let r=Ct(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Ct(n[e]);return s===null?null:{value:s,source:"global"}}function rs(e,t,n,r){return Mc(e,t,n)||{value:r,source:"base"}}function Ba(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Nt(s?.[t])){let a=Ct(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Nt(s)){for(let a of Object.values(s))if(Nt(a)){let i=Ct(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Ct(r?.runners?.[o]?.models?.[e]?.id)||e}function S_(e,t){return Ct(t?.review?.reviewers?.[e]?.model)||e}function Ir(e,t,n=!1){if(e==="default")return $t(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Lr(e):e;return $t(e,t,r,e,"explicit")}function Nc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Nt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(Nt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function E_(e,t){let n=[],r=e?.implementation?.model_catalog;Nt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Nt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function T_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of E_(t,n)){let o=Nc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Ua(e){return $t(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Dc(e,t,n){let r=Mc(e,t,n);return r?Ir(r.value,r.source):$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function rn(e){let t=Nt(e.pin)?e.pin:{},n=Nt(e.global)?e.global:{},r=Nt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Nt(r.session)?r.session:null,o=r?.supported===!0&&Nt(r.orchestration)?r.orchestration:null,a=Nt(e.runner_catalog)?e.runner_catalog:null,i=Ct(n.quick_fix_impl_model),c=T_(i,s,a),d={};if(s){let p=rs("workflow_mode",t,n,Ct(s.workflow_mode_default));d.workflow_mode=p.source==="base"?$t(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):Ir(p.value,p.source);for(let U of["spec_review","plan_review","impl_review"]){let q=`${U}_model`,D=Ct(U==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),W=rs(q,t,n,D);if(W.value===null)d[q]=$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(W.value!=="self"&&W.value!=="skip"&&!Nt(s.review?.reviewers?.[W.value]))d[q]=Ua($t(W.value,W.source,"",null,"explicit"));else{let S=S_(W.value,s);d[q]=$t(W.value,W.source,Lr(S),S,W.source==="base"?"default":"explicit")}}for(let[U,q]of Object.entries(Pc)){let D=d[q].value;if(D==="self"||D==="skip"){d[U]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let W=Ct(s.review?.reviewers?.[D||""]?.effort),S=rs(U,t,n,W);d[U]=S.value===null?$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):$t(S.value,S.source,S.value,S.value,S.source==="base"?"default":"explicit")}let h=Nt(s.implementation?.default)?s.implementation.default:{},y=Ct(e.route),$=y!==null&&["quick_fix","spec_backed","full_plan"].includes(y),E=Nt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},N=$&&Nt(E[y])?E[y]:{};for(let U of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=rs(U,t,n,U==="impl_dispatch"?Ct(N.dispatch)||Ct(h.dispatch):Ct(h[U.replace("impl_","")]));d[U]=q.value===null?$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):$t(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let B=Ct(t.impl_runtime),Y=B==="inherit"?Ct(e.controller_runtime):B,le=y==="quick_fix"&&Ct(t.impl_dispatch)===null&&c.runtime!==null&&(B===null||Y===c.runtime);if(le){let U=c.runtime,q=i;d.impl_dispatch=$t("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(d.impl_runtime=$t(U,"global",`${U} (\uC720\uB3C4)`,U,"explicit")),Ct(t.impl_model)===null&&(d.impl_model=$t(q,"global",q,q,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let U of["impl_runtime","impl_model","impl_effort","impl_speed"])d[U]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!le&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let U=d.impl_runtime.value==="inherit"?Ct(e.controller_runtime):d.impl_runtime.value,q=U?Nc(U,s,a):[];if(d.impl_model.value!=="auto"&&q.length>0&&!q.includes(d.impl_model.value))d.impl_model=Ua(d.impl_model);else{let D=Ba(d.impl_model.value,U,s,a);d.impl_model.display=Lr(D),d.impl_model.full_value=D}}if(d.impl_effort.value==="auto"){let U=Ct(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),q=U?Ct(s.implementation?.effort_by_transport?.[U]?.auto):null;q&&!A_.has(q)?(d.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=q,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?$t("default","base","default (\uC77C\uBC18)","default","default"):Ir("default",d.impl_speed.source))}}else for(let p of x_.filter(h=>!h.startsWith("orchestration_")))d[p]=Dc(p,t,n);if(!s){for(let[p,h]of Object.entries(Pc))(d[h].value==="self"||d[h].value==="skip")&&(d[p]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])d[p]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[p]=Dc(p,t,n);continue}let h=p.replace("orchestration_",""),y=Ct(o[h]),$=rs(p,t,n,y);if(p==="orchestration_effort"&&$.source==="base"){d[p]=$t(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if($.value===null){d[p]=$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let E=$.source==="base"?Ct(o.model_id)||$.value:Ba($.value,null,s,a);d[p]=$t($.value,$.source,Lr(E),E,$.source==="base"?"default":"explicit");continue}if($.value==="default"){d[p]=$.source==="base"?$t("default","base","default (\uC77C\uBC18)","default","default"):Ir("default",$.source);continue}d[p]=Ir($.value,$.source)}if(s)if(i===null){let p=d.orchestration_model.full_value;d.quick_fix_impl_model=$t(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Lr(p)})`,null,"default")}else if(c.runtime!==null){let p=Ba(i,c.runtime,s,a);d.quick_fix_impl_model=$t(i,"global",Lr(p),p,"explicit")}else c.offered?d.quick_fix_impl_model=Ua($t(i,"global","",null,"explicit")):d.quick_fix_impl_model=Ir(i,"global");return d}function C_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function co(e){let t=Nt(e.pin)?e.pin:{},n=Nt(e.global)?e.global:{},r=Nt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=h=>{let y={...r,...h};return rn({pin:e.layer==="pin"?y:t,global:e.layer==="pin"?n:y,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],d=Ct(o[e.key]),p=[...e.choices];return d!==null&&!p.includes(d)&&p.unshift(d),{unset_label:C_(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:p.map(h=>{let y=s({...o,[e.key]:h})[e.key];return{value:h,label:y.display,full_value:y.full_value}})}}function Pr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let c=!1,d=h=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(h))},p=()=>d(r.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),r.addEventListener("keydown",h=>{h.key==="Enter"&&(h.ctrlKey||h.metaKey)&&(h.preventDefault(),p())}),t.addEventListener("cancel",h=>{h.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Uc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Nn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],ss=[...Nn,"reasoning_output_tokens"],R_={codex:["implementation","review-consult"],claude:["subagent"]};function Wa(e){let t=0;for(let n of Nn)t+=Ft(e?.[n]);return t}function O_(e){return!e||typeof e!="object"?!1:Nn.some(t=>Number.isFinite(e[t]))}function qc(e){return!e||typeof e!="object"?!1:ss.some(t=>Number.isFinite(e[t]))}function L_(e){let t={};for(let n of ss)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Fc(e){let t={};for(let n of ss)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function jc(e,t){return e==="codex"?Ft(t.input_tokens)+Ft(t.output_tokens):Wa(t)}function I_(e){return e==="claude"?"Claude":"Codex"}function P_(e){return`\u03C4 ${Wc(e)}`}function D_(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${Ft(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${Ft(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Uc),o.join(`
`)}function Wt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${I_(n)} ${P_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:D_(n,r)})}return t}function po(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of ss)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=Ft(i.breakdown[c])+Ft(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function za(e){return!e||typeof e!="object"?null:bn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function M_(e){return e==="codex"?"codex":"claude"}function Rn(){return{subtotal:0,breakdown:L_(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function uo(e,t,n){e.subtotal+=t.subtotal;for(let r of ss)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ft(e.breakdown[r])+Ft(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Bc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Wc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Dr(e){return O_(e)?`\u03C4 ${Wc(Wa(e))}`:null}function qn(e){let t=Dr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function os(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Wa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Uc),n.join(`
`)}function bn(e,t){let n={claude:Rn(),codex:Rn()},r={orchestrator:{claude:Rn(),codex:Rn()},implementation:{claude:Rn(),codex:Rn()},"review-consult":{claude:Rn(),codex:Rn()},subagent:{claude:Rn(),codex:Rn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(qc(c)){let p=M_(i.runner),h=Fc(c),y={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:h,subtotal:jc(p,h)};h.replayed===!0&&(y.replayed=!0),typeof i.model=="string"&&(y.model=i.model),typeof i.session_id=="string"&&(y.session_id=i.session_id),uo(n[p],y,!0),uo(r.orchestrator[p],y,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){let h=p&&p.provider==="claude"?"claude":"codex";if(!p||p.provider!=="codex"&&p.provider!=="claude"||!R_[h].includes(p.role)||!qc(p.usage))continue;let y=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!y||s.has(y))continue;s.add(y);let $=Fc(p.usage),E={provider:h,role:p.role,attempt_id:String(i.attempt_id||""),usage:$,subtotal:jc(h,$)};E.receipt_id=y,typeof p.agent_type=="string"&&(E.agent_type=p.agent_type),typeof p.agent_id=="string"&&(E.agent_id=p.agent_id),typeof p.model=="string"&&(E.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(E.effort=p.effort),typeof p.session_id=="string"?E.session_id=p.session_id:typeof p.thread_id=="string"&&(E.session_id=p.thread_id),typeof p.turn_id=="string"&&(E.turn_id=p.turn_id),(typeof p.completed_at=="string"||typeof p.completed_at=="number"&&Number.isFinite(p.completed_at))&&(E.completed_at=p.completed_at),$.replayed===!0&&(E.replayed=!0),uo(n[h],E,!1),uo(r[E.role][h],E,!1)}}let o={};for(let i of["claude","codex"]){let c=n[i];if(c.legs.length===0)continue;let d=Bc(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(d.total_cost_usd=c.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let c={};for(let d of["claude","codex"]){let p=r[i][d];p.legs.length>0&&(c[d]={...Bc(p,!0),legs:p.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:Qc,setPrototypeOf:zc,isFrozen:N_,getPrototypeOf:q_,getOwnPropertyDescriptor:F_}=Object,{freeze:Kt,seal:hn,create:Xa}=Object,{apply:Qa,construct:Ja}=typeof Reflect<"u"&&Reflect;Kt||(Kt=function(t){return t});hn||(hn=function(t){return t});Qa||(Qa=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});Ja||(Ja=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var fo=Yt(Array.prototype.forEach),j_=Yt(Array.prototype.lastIndexOf),Hc=Yt(Array.prototype.pop),as=Yt(Array.prototype.push),B_=Yt(Array.prototype.splice),mo=Yt(String.prototype.toLowerCase),Ha=Yt(String.prototype.toString),Ga=Yt(String.prototype.match),is=Yt(String.prototype.replace),U_=Yt(String.prototype.indexOf),W_=Yt(String.prototype.trim),kn=Yt(Object.prototype.hasOwnProperty),Vt=Yt(RegExp.prototype.test),ls=z_(TypeError);function Yt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Qa(e,t,r)}}function z_(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ja(e,n)}}function nt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:mo;zc&&zc(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(N_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function H_(e){for(let t=0;t<e.length;t++)kn(e,t)||(e[t]=null);return e}function Fn(e){let t=Xa(null);for(let[n,r]of Qc(e))kn(e,n)&&(Array.isArray(r)?t[n]=H_(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Fn(r):t[n]=r);return t}function cs(e,t){for(;e!==null;){let r=F_(e,t);if(r){if(r.get)return Yt(r.get);if(typeof r.value=="function")return Yt(r.value)}e=q_(e)}function n(){return null}return n}var Gc=Kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Va=Kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ka=Kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),G_=Kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ya=Kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),V_=Kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Vc=Kt(["#text"]),Kc=Kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Za=Kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Yc=Kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),_o=Kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),K_=hn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Y_=hn(/<%[\w\W]*|[\w\W]*%>/gm),Z_=hn(/\$\{[\w\W]*/gm),X_=hn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Q_=hn(/^aria-[\-\w]+$/),Jc=hn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),J_=hn(/^(?:\w+script|data):/i),em=hn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),eu=hn(/^html$/i),tm=hn(/^[a-z][.\w]*(-[.\w]+)+$/i),Zc=Object.freeze({__proto__:null,ARIA_ATTR:Q_,ATTR_WHITESPACE:em,CUSTOM_ELEMENT:tm,DATA_ATTR:X_,DOCTYPE_NAME:eu,ERB_EXPR:Y_,IS_ALLOWED_URI:Jc,IS_SCRIPT_OR_DATA:J_,MUSTACHE_EXPR:K_,TMPLIT_EXPR:Z_}),us={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},nm=function(){return typeof window>"u"?null:window},rm=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Xc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function tu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:nm(),t=Pe=>tu(Pe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==us.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:h,DOMParser:y,trustedTypes:$}=e,E=c.prototype,N=cs(E,"cloneNode"),B=cs(E,"remove"),Y=cs(E,"nextSibling"),le=cs(E,"childNodes"),U=cs(E,"parentNode");if(typeof a=="function"){let Pe=n.createElement("template");Pe.content&&Pe.content.ownerDocument&&(n=Pe.content.ownerDocument)}let q,D="",{implementation:W,createNodeIterator:S,createDocumentFragment:M,getElementsByTagName:ne}=n,{importNode:Te}=r,be=Xc();t.isSupported=typeof Qc=="function"&&typeof U=="function"&&W&&W.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:H,ERB_EXPR:X,TMPLIT_EXPR:he,DATA_ATTR:ke,ARIA_ATTR:ge,IS_SCRIPT_OR_DATA:se,ATTR_WHITESPACE:Se,CUSTOM_ELEMENT:ye}=Zc,{IS_ALLOWED_URI:K}=Zc,ee=null,me=nt({},[...Gc,...Va,...Ka,...Ya,...Vc]),ve=null,Me=nt({},[...Kc,...Za,...Yc,..._o]),ae=Object.seal(Xa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),He=null,I=null,ce=Object.seal(Xa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Le=!0,qe=!0,Ie=!1,We=!0,je=!1,Ye=!0,tt=!1,ct=!1,_t=!1,te=!1,J=!1,Ce=!1,Ke=!0,Oe=!1,we="user-content-",Be=!0,Ge=!1,Qe={},Ze=null,rt=nt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),yt=null,Et=nt({},["audio","video","img","source","image","track"]),it=null,Ot=nt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ut="http://www.w3.org/1998/Math/MathML",ze="http://www.w3.org/2000/svg",Re="http://www.w3.org/1999/xhtml",P=Re,V=!1,de=null,C=nt({},[ut,ze,Re],Ha),G=nt({},["mi","mo","mn","ms","mtext"]),pe=nt({},["annotation-xml"]),g=nt({},["title","style","font","a","script"]),k=null,O=["application/xhtml+xml","text/html"],Q="text/html",Z=null,fe=null,Ee=n.createElement("form"),$e=function(R){return R instanceof RegExp||R instanceof Function},st=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(fe&&fe===R)){if((!R||typeof R!="object")&&(R={}),R=Fn(R),k=O.indexOf(R.PARSER_MEDIA_TYPE)===-1?Q:R.PARSER_MEDIA_TYPE,Z=k==="application/xhtml+xml"?Ha:mo,ee=kn(R,"ALLOWED_TAGS")?nt({},R.ALLOWED_TAGS,Z):me,ve=kn(R,"ALLOWED_ATTR")?nt({},R.ALLOWED_ATTR,Z):Me,de=kn(R,"ALLOWED_NAMESPACES")?nt({},R.ALLOWED_NAMESPACES,Ha):C,it=kn(R,"ADD_URI_SAFE_ATTR")?nt(Fn(Ot),R.ADD_URI_SAFE_ATTR,Z):Ot,yt=kn(R,"ADD_DATA_URI_TAGS")?nt(Fn(Et),R.ADD_DATA_URI_TAGS,Z):Et,Ze=kn(R,"FORBID_CONTENTS")?nt({},R.FORBID_CONTENTS,Z):rt,He=kn(R,"FORBID_TAGS")?nt({},R.FORBID_TAGS,Z):Fn({}),I=kn(R,"FORBID_ATTR")?nt({},R.FORBID_ATTR,Z):Fn({}),Qe=kn(R,"USE_PROFILES")?R.USE_PROFILES:!1,Le=R.ALLOW_ARIA_ATTR!==!1,qe=R.ALLOW_DATA_ATTR!==!1,Ie=R.ALLOW_UNKNOWN_PROTOCOLS||!1,We=R.ALLOW_SELF_CLOSE_IN_ATTR!==!1,je=R.SAFE_FOR_TEMPLATES||!1,Ye=R.SAFE_FOR_XML!==!1,tt=R.WHOLE_DOCUMENT||!1,te=R.RETURN_DOM||!1,J=R.RETURN_DOM_FRAGMENT||!1,Ce=R.RETURN_TRUSTED_TYPE||!1,_t=R.FORCE_BODY||!1,Ke=R.SANITIZE_DOM!==!1,Oe=R.SANITIZE_NAMED_PROPS||!1,Be=R.KEEP_CONTENT!==!1,Ge=R.IN_PLACE||!1,K=R.ALLOWED_URI_REGEXP||Jc,P=R.NAMESPACE||Re,G=R.MATHML_TEXT_INTEGRATION_POINTS||G,pe=R.HTML_INTEGRATION_POINTS||pe,ae=R.CUSTOM_ELEMENT_HANDLING||{},R.CUSTOM_ELEMENT_HANDLING&&$e(R.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ae.tagNameCheck=R.CUSTOM_ELEMENT_HANDLING.tagNameCheck),R.CUSTOM_ELEMENT_HANDLING&&$e(R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ae.attributeNameCheck=R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),R.CUSTOM_ELEMENT_HANDLING&&typeof R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ae.allowCustomizedBuiltInElements=R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),je&&(qe=!1),J&&(te=!0),Qe&&(ee=nt({},Vc),ve=[],Qe.html===!0&&(nt(ee,Gc),nt(ve,Kc)),Qe.svg===!0&&(nt(ee,Va),nt(ve,Za),nt(ve,_o)),Qe.svgFilters===!0&&(nt(ee,Ka),nt(ve,Za),nt(ve,_o)),Qe.mathMl===!0&&(nt(ee,Ya),nt(ve,Yc),nt(ve,_o))),R.ADD_TAGS&&(typeof R.ADD_TAGS=="function"?ce.tagCheck=R.ADD_TAGS:(ee===me&&(ee=Fn(ee)),nt(ee,R.ADD_TAGS,Z))),R.ADD_ATTR&&(typeof R.ADD_ATTR=="function"?ce.attributeCheck=R.ADD_ATTR:(ve===Me&&(ve=Fn(ve)),nt(ve,R.ADD_ATTR,Z))),R.ADD_URI_SAFE_ATTR&&nt(it,R.ADD_URI_SAFE_ATTR,Z),R.FORBID_CONTENTS&&(Ze===rt&&(Ze=Fn(Ze)),nt(Ze,R.FORBID_CONTENTS,Z)),Be&&(ee["#text"]=!0),tt&&nt(ee,["html","head","body"]),ee.table&&(nt(ee,["tbody"]),delete He.tbody),R.TRUSTED_TYPES_POLICY){if(typeof R.TRUSTED_TYPES_POLICY.createHTML!="function")throw ls('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof R.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ls('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=R.TRUSTED_TYPES_POLICY,D=q.createHTML("")}else q===void 0&&(q=rm($,s)),q!==null&&typeof D=="string"&&(D=q.createHTML(""));Kt&&Kt(R),fe=R}},dt=nt({},[...Va,...Ka,...G_]),xe=nt({},[...Ya,...V_]),bt=function(R){let ue=U(R);(!ue||!ue.tagName)&&(ue={namespaceURI:P,tagName:"template"});let Ae=mo(R.tagName),ot=mo(ue.tagName);return de[R.namespaceURI]?R.namespaceURI===ze?ue.namespaceURI===Re?Ae==="svg":ue.namespaceURI===ut?Ae==="svg"&&(ot==="annotation-xml"||G[ot]):!!dt[Ae]:R.namespaceURI===ut?ue.namespaceURI===Re?Ae==="math":ue.namespaceURI===ze?Ae==="math"&&pe[ot]:!!xe[Ae]:R.namespaceURI===Re?ue.namespaceURI===ze&&!pe[ot]||ue.namespaceURI===ut&&!G[ot]?!1:!xe[Ae]&&(g[Ae]||!dt[Ae]):!!(k==="application/xhtml+xml"&&de[R.namespaceURI]):!1},gt=function(R){as(t.removed,{element:R});try{U(R).removeChild(R)}catch{B(R)}},qt=function(R,ue){try{as(t.removed,{attribute:ue.getAttributeNode(R),from:ue})}catch{as(t.removed,{attribute:null,from:ue})}if(ue.removeAttribute(R),R==="is")if(te||J)try{gt(ue)}catch{}else try{ue.setAttribute(R,"")}catch{}},Gt=function(R){let ue=null,Ae=null;if(_t)R="<remove></remove>"+R;else{let pt=Ga(R,/^[\r\n\t ]+/);Ae=pt&&pt[0]}k==="application/xhtml+xml"&&P===Re&&(R='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+R+"</body></html>");let ot=q?q.createHTML(R):R;if(P===Re)try{ue=new y().parseFromString(ot,k)}catch{}if(!ue||!ue.documentElement){ue=W.createDocument(P,"template",null);try{ue.documentElement.innerHTML=V?D:ot}catch{}}let vt=ue.body||ue.documentElement;return R&&Ae&&vt.insertBefore(n.createTextNode(Ae),vt.childNodes[0]||null),P===Re?ne.call(ue,tt?"html":"body")[0]:tt?ue.documentElement:vt},Mt=function(R){return S.call(R.ownerDocument||R,R,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Pt=function(R){return R instanceof h&&(typeof R.nodeName!="string"||typeof R.textContent!="string"||typeof R.removeChild!="function"||!(R.attributes instanceof p)||typeof R.removeAttribute!="function"||typeof R.setAttribute!="function"||typeof R.namespaceURI!="string"||typeof R.insertBefore!="function"||typeof R.hasChildNodes!="function")},fn=function(R){return typeof i=="function"&&R instanceof i};function At(Pe,R,ue){fo(Pe,Ae=>{Ae.call(t,R,ue,fe)})}let Dt=function(R){let ue=null;if(At(be.beforeSanitizeElements,R,null),Pt(R))return gt(R),!0;let Ae=Z(R.nodeName);if(At(be.uponSanitizeElement,R,{tagName:Ae,allowedTags:ee}),Ye&&R.hasChildNodes()&&!fn(R.firstElementChild)&&Vt(/<[/\w!]/g,R.innerHTML)&&Vt(/<[/\w!]/g,R.textContent)||R.nodeType===us.progressingInstruction||Ye&&R.nodeType===us.comment&&Vt(/<[/\w]/g,R.data))return gt(R),!0;if(!(ce.tagCheck instanceof Function&&ce.tagCheck(Ae))&&(!ee[Ae]||He[Ae])){if(!He[Ae]&&Xt(Ae)&&(ae.tagNameCheck instanceof RegExp&&Vt(ae.tagNameCheck,Ae)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(Ae)))return!1;if(Be&&!Ze[Ae]){let ot=U(R)||R.parentNode,vt=le(R)||R.childNodes;if(vt&&ot){let pt=vt.length;for(let Rt=pt-1;Rt>=0;--Rt){let It=N(vt[Rt],!0);It.__removalCount=(R.__removalCount||0)+1,ot.insertBefore(It,Y(R))}}}return gt(R),!0}return R instanceof c&&!bt(R)||(Ae==="noscript"||Ae==="noembed"||Ae==="noframes")&&Vt(/<\/no(script|embed|frames)/i,R.innerHTML)?(gt(R),!0):(je&&R.nodeType===us.text&&(ue=R.textContent,fo([H,X,he],ot=>{ue=is(ue,ot," ")}),R.textContent!==ue&&(as(t.removed,{element:R.cloneNode()}),R.textContent=ue)),At(be.afterSanitizeElements,R,null),!1)},Ue=function(R,ue,Ae){if(Ke&&(ue==="id"||ue==="name")&&(Ae in n||Ae in Ee))return!1;if(!(qe&&!I[ue]&&Vt(ke,ue))){if(!(Le&&Vt(ge,ue))){if(!(ce.attributeCheck instanceof Function&&ce.attributeCheck(ue,R))){if(!ve[ue]||I[ue]){if(!(Xt(R)&&(ae.tagNameCheck instanceof RegExp&&Vt(ae.tagNameCheck,R)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(R))&&(ae.attributeNameCheck instanceof RegExp&&Vt(ae.attributeNameCheck,ue)||ae.attributeNameCheck instanceof Function&&ae.attributeNameCheck(ue,R))||ue==="is"&&ae.allowCustomizedBuiltInElements&&(ae.tagNameCheck instanceof RegExp&&Vt(ae.tagNameCheck,Ae)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(Ae))))return!1}else if(!it[ue]){if(!Vt(K,is(Ae,Se,""))){if(!((ue==="src"||ue==="xlink:href"||ue==="href")&&R!=="script"&&U_(Ae,"data:")===0&&yt[R])){if(!(Ie&&!Vt(se,is(Ae,Se,"")))){if(Ae)return!1}}}}}}}return!0},Xt=function(R){return R!=="annotation-xml"&&Ga(R,ye)},Qt=function(R){At(be.beforeSanitizeAttributes,R,null);let{attributes:ue}=R;if(!ue||Pt(R))return;let Ae={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0},ot=ue.length;for(;ot--;){let vt=ue[ot],{name:pt,namespaceURI:Rt,value:It}=vt,Ht=Z(pt),Jt=It,wt=pt==="value"?Jt:W_(Jt);if(Ae.attrName=Ht,Ae.attrValue=wt,Ae.keepAttr=!0,Ae.forceKeepAttr=void 0,At(be.uponSanitizeAttribute,R,Ae),wt=Ae.attrValue,Oe&&(Ht==="id"||Ht==="name")&&(qt(pt,R),wt=we+wt),Ye&&Vt(/((--!?|])>)|<\/(style|title|textarea)/i,wt)){qt(pt,R);continue}if(Ht==="attributename"&&Ga(wt,"href")){qt(pt,R);continue}if(Ae.forceKeepAttr)continue;if(!Ae.keepAttr){qt(pt,R);continue}if(!We&&Vt(/\/>/i,wt)){qt(pt,R);continue}je&&fo([H,X,he],_n=>{wt=is(wt,_n," ")});let en=Z(R.nodeName);if(!Ue(en,Ht,wt)){qt(pt,R);continue}if(q&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!Rt)switch($.getAttributeType(en,Ht)){case"TrustedHTML":{wt=q.createHTML(wt);break}case"TrustedScriptURL":{wt=q.createScriptURL(wt);break}}if(wt!==Jt)try{Rt?R.setAttributeNS(Rt,pt,wt):R.setAttribute(pt,wt),Pt(R)?gt(R):Hc(t.removed)}catch{qt(pt,R)}}At(be.afterSanitizeAttributes,R,null)},et=function Pe(R){let ue=null,Ae=Mt(R);for(At(be.beforeSanitizeShadowDOM,R,null);ue=Ae.nextNode();)At(be.uponSanitizeShadowNode,ue,null),Dt(ue),Qt(ue),ue.content instanceof o&&Pe(ue.content);At(be.afterSanitizeShadowDOM,R,null)};return t.sanitize=function(Pe){let R=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ue=null,Ae=null,ot=null,vt=null;if(V=!Pe,V&&(Pe="<!-->"),typeof Pe!="string"&&!fn(Pe))if(typeof Pe.toString=="function"){if(Pe=Pe.toString(),typeof Pe!="string")throw ls("dirty is not a string, aborting")}else throw ls("toString is not a function");if(!t.isSupported)return Pe;if(ct||st(R),t.removed=[],typeof Pe=="string"&&(Ge=!1),Ge){if(Pe.nodeName){let It=Z(Pe.nodeName);if(!ee[It]||He[It])throw ls("root node is forbidden and cannot be sanitized in-place")}}else if(Pe instanceof i)ue=Gt("<!---->"),Ae=ue.ownerDocument.importNode(Pe,!0),Ae.nodeType===us.element&&Ae.nodeName==="BODY"||Ae.nodeName==="HTML"?ue=Ae:ue.appendChild(Ae);else{if(!te&&!je&&!tt&&Pe.indexOf("<")===-1)return q&&Ce?q.createHTML(Pe):Pe;if(ue=Gt(Pe),!ue)return te?null:Ce?D:""}ue&&_t&&gt(ue.firstChild);let pt=Mt(Ge?Pe:ue);for(;ot=pt.nextNode();)Dt(ot),Qt(ot),ot.content instanceof o&&et(ot.content);if(Ge)return Pe;if(te){if(J)for(vt=M.call(ue.ownerDocument);ue.firstChild;)vt.appendChild(ue.firstChild);else vt=ue;return(ve.shadowroot||ve.shadowrootmode)&&(vt=Te.call(r,vt,!0)),vt}let Rt=tt?ue.outerHTML:ue.innerHTML;return tt&&ee["!doctype"]&&ue.ownerDocument&&ue.ownerDocument.doctype&&ue.ownerDocument.doctype.name&&Vt(eu,ue.ownerDocument.doctype.name)&&(Rt="<!DOCTYPE "+ue.ownerDocument.doctype.name+`>
`+Rt),je&&fo([H,X,he],It=>{Rt=is(Rt,It," ")}),q&&Ce?q.createHTML(Rt):Rt},t.setConfig=function(){let Pe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};st(Pe),ct=!0},t.clearConfig=function(){fe=null,ct=!1},t.isValidAttribute=function(Pe,R,ue){fe||st({});let Ae=Z(Pe),ot=Z(R);return Ue(Ae,ot,ue)},t.addHook=function(Pe,R){typeof R=="function"&&as(be[Pe],R)},t.removeHook=function(Pe,R){if(R!==void 0){let ue=j_(be[Pe],R);return ue===-1?void 0:B_(be[Pe],ue,1)[0]}return Hc(be[Pe])},t.removeHooks=function(Pe){be[Pe]=[]},t.removeAllHooks=function(){be=Xc()},t}var nu=tu();var jn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},go=e=>(...t)=>({_$litDirective$:e,values:t}),Mr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ds=class extends Mr{constructor(t){if(super(t),this.it=Lt,t.type!==jn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Lt||t==null)return this._t=void 0,this.it=t;if(t===mn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ds.directiveName="unsafeHTML",ds.resultType=1;var ru=go(ds);function ri(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var gr=ri();function uu(e){gr=e}var ms={exec:()=>null};function lt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Zt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var sm=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Zt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},om=/^(?:[ \t]*(?:\n|$))+/,am=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,im=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,gs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,lm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,si=/(?:[*+-]|\d{1,9}[.)])/,du=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,pu=lt(du).replace(/bull/g,si).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),cm=lt(du).replace(/bull/g,si).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),oi=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,um=/^[^\n]+/,ai=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,dm=lt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ai).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),pm=lt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,si).getRegex(),ko="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ii=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,fm=lt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ii).replace("tag",ko).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),fu=lt(oi).replace("hr",gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ko).getRegex(),_m=lt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",fu).getRegex(),li={blockquote:_m,code:am,def:dm,fences:im,heading:lm,hr:gs,html:fm,lheading:pu,list:pm,newline:om,paragraph:fu,table:ms,text:um},su=lt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ko).getRegex(),mm={...li,lheading:cm,table:su,paragraph:lt(oi).replace("hr",gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",su).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ko).getRegex()},gm={...li,html:lt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ii).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ms,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:lt(oi).replace("hr",gs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",pu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},bm=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,hm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,_u=/^( {2,}|\\)\n(?!\s*$)/,ym=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,$o=/[\p{P}\p{S}]/u,ci=/[\s\p{P}\p{S}]/u,mu=/[^\s\p{P}\p{S}]/u,vm=lt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ci).getRegex(),gu=/(?!~)[\p{P}\p{S}]/u,wm=/(?!~)[\s\p{P}\p{S}]/u,km=/(?:[^\s\p{P}\p{S}]|~)/u,$m=lt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",sm?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),bu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,xm=lt(bu,"u").replace(/punct/g,$o).getRegex(),Am=lt(bu,"u").replace(/punct/g,gu).getRegex(),hu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Sm=lt(hu,"gu").replace(/notPunctSpace/g,mu).replace(/punctSpace/g,ci).replace(/punct/g,$o).getRegex(),Em=lt(hu,"gu").replace(/notPunctSpace/g,km).replace(/punctSpace/g,wm).replace(/punct/g,gu).getRegex(),Tm=lt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,mu).replace(/punctSpace/g,ci).replace(/punct/g,$o).getRegex(),Cm=lt(/\\(punct)/,"gu").replace(/punct/g,$o).getRegex(),Rm=lt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Om=lt(ii).replace("(?:-->|$)","-->").getRegex(),Lm=lt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Om).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),yo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Im=lt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",yo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),yu=lt(/^!?\[(label)\]\[(ref)\]/).replace("label",yo).replace("ref",ai).getRegex(),vu=lt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ai).getRegex(),Pm=lt("reflink|nolink(?!\\()","g").replace("reflink",yu).replace("nolink",vu).getRegex(),ou=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ui={_backpedal:ms,anyPunctuation:Cm,autolink:Rm,blockSkip:$m,br:_u,code:hm,del:ms,emStrongLDelim:xm,emStrongRDelimAst:Sm,emStrongRDelimUnd:Tm,escape:bm,link:Im,nolink:vu,punctuation:vm,reflink:yu,reflinkSearch:Pm,tag:Lm,text:ym,url:ms},Dm={...ui,link:lt(/^!?\[(label)\]\((.*?)\)/).replace("label",yo).getRegex(),reflink:lt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",yo).getRegex()},ei={...ui,emStrongRDelimAst:Em,emStrongLDelim:Am,url:lt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ou).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:lt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ou).getRegex()},Mm={...ei,br:lt(_u).replace("{2,}","*").getRegex(),text:lt(ei.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},bo={normal:li,gfm:mm,pedantic:gm},ps={normal:ui,gfm:ei,breaks:Mm,pedantic:Dm},Nm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},au=e=>Nm[e];function Bn(e,t){if(t){if(Zt.escapeTest.test(e))return e.replace(Zt.escapeReplace,au)}else if(Zt.escapeTestNoEncode.test(e))return e.replace(Zt.escapeReplaceNoEncode,au);return e}function iu(e){try{e=encodeURI(e).replace(Zt.percentDecode,"%")}catch{return null}return e}function lu(e,t){let n=e.replace(Zt.findPipe,(o,a,i)=>{let c=!1,d=a;for(;--d>=0&&i[d]==="\\";)c=!c;return c?"|":" |"}),r=n.split(Zt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Zt.slashPipe,"|");return r}function fs(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function qm(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function cu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,c}function Fm(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var vo=class{constructor(e){ht(this,"options");ht(this,"rules");ht(this,"lexer");this.options=e||gr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:fs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Fm(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=fs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:fs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=fs(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))i.push(n[c]),a=!0;else if(!a)i.push(n[c]);else break;n=n.slice(c);let d=i.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,s=s?`${s}
${p}`:p;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=h,n.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let $=y,E=$.raw+`
`+n.join(`
`),N=this.blockquote(E);o[o.length-1]=N,r=r.substring(0,r.length-$.raw.length)+N.raw,s=s.substring(0,s.length-$.text.length)+N.text;break}else if(y?.type==="list"){let $=y,E=$.raw+`
`+n.join(`
`),N=this.list(E);o[o.length-1]=N,r=r.substring(0,r.length-y.raw.length)+N.raw,s=s.substring(0,s.length-$.raw.length)+N.raw,n=E.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let h=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,N=>" ".repeat(3*N.length)),y=e.split(`
`,1)[0],$=!h.trim(),E=0;if(this.options.pedantic?(E=2,p=h.trimStart()):$?E=t[1].length+1:(E=t[2].search(this.rules.other.nonSpaceChar),E=E>4?1:E,p=h.slice(E),E+=t[1].length),$&&this.rules.other.blankLine.test(y)&&(d+=y+`
`,e=e.substring(y.length+1),c=!0),!c){let N=this.rules.other.nextBulletRegex(E),B=this.rules.other.hrRegex(E),Y=this.rules.other.fencesBeginRegex(E),le=this.rules.other.headingBeginRegex(E),U=this.rules.other.htmlBeginRegex(E);for(;e;){let q=e.split(`
`,1)[0],D;if(y=q,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),D=y):D=y.replace(this.rules.other.tabCharGlobal,"    "),Y.test(y)||le.test(y)||U.test(y)||N.test(y)||B.test(y))break;if(D.search(this.rules.other.nonSpaceChar)>=E||!y.trim())p+=`
`+D.slice(E);else{if($||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(h)||le.test(h)||B.test(h))break;p+=`
`+y}!$&&!y.trim()&&($=!0),d+=q+`
`,e=e.substring(q.length+1),h=D.slice(E)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(c.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};c.checked=p.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=p.raw+c.tokens[0].raw,c.tokens[0].text=p.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(p)):c.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):c.tokens.unshift(p)}}if(!s.loose){let d=c.tokens.filter(h=>h.type==="space"),p=d.length>0&&d.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=p}}if(s.loose)for(let c of s.items){c.loose=!0;for(let d of c.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=lu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(lu(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=fs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=qm(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),cu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return cu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,c=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let p=[...r[0]][0].length,h=e.slice(0,s+r.index+p+a);if(Math.min(s,a)%2){let $=h.slice(1,-1);return{type:"em",raw:h,text:$,tokens:this.lexer.inlineTokens($)}}let y=h.slice(2,-2);return{type:"strong",raw:h,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},$n=class ti{constructor(t){ht(this,"tokens");ht(this,"options");ht(this,"state");ht(this,"inlineQueue");ht(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||gr,this.options.tokenizer=this.options.tokenizer||new vo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Zt,block:bo.normal,inline:ps.normal};this.options.pedantic?(n.block=bo.pedantic,n.inline=ps.pedantic):this.options.gfm&&(n.block=bo.gfm,this.options.breaks?n.inline=ps.breaks:n.inline=ps.gfm),this.tokenizer.rules=n}static get rules(){return{block:bo,inline:ps}}static lex(t,n){return new ti(n).lex(t)}static lexInline(t,n){return new ti(n).inlineTokens(t)}lex(t){t=t.replace(Zt.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(p=>(c=p.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let p=n.at(-1);c.type==="text"&&p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,i)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,h=t.slice(1),y;this.options.extensions.startInline.forEach($=>{y=$.call({lexer:this},h),typeof y=="number"&&y>=0&&(p=Math.min(p,y))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(c=this.tokenizer.inlineText(d)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):n.push(c);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},wo=class{constructor(e){ht(this,"options");ht(this,"parser");this.options=e||gr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Zt.notSpaceStart)?.[0],s=e.replace(Zt.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Bn(r)+'">'+(n?s:Bn(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Bn(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Bn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=iu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Bn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=iu(e);if(s===null)return Bn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Bn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Bn(e.text)}},di=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},xn=class ni{constructor(t){ht(this,"options");ht(this,"renderer");ht(this,"textRenderer");this.options=t||gr,this.options.renderer=this.options.renderer||new wo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new di}static parse(t,n){return new ni(n).parse(t)}static parseInline(t,n){return new ni(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},ho,_s=(ho=class{constructor(e){ht(this,"options");ht(this,"block");this.options=e||gr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?$n.lex:$n.lexInline}provideParser(){return this.block?xn.parse:xn.parseInline}},ht(ho,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ht(ho,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ho),jm=class{constructor(...e){ht(this,"defaults",ri());ht(this,"options",this.setOptions);ht(this,"parse",this.parseMarkdown(!0));ht(this,"parseInline",this.parseMarkdown(!1));ht(this,"Parser",xn);ht(this,"Renderer",wo);ht(this,"TextRenderer",di);ht(this,"Lexer",$n);ht(this,"Tokenizer",vo);ht(this,"Hooks",_s);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new wo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],c=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=c.apply(s,d)),p||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new vo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],c=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=c.apply(s,d)),p}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new _s;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],c=s[a];_s.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&_s.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await i.call(s,d);return c.call(s,h)})();let p=i.call(s,d);return c.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let h=await i.apply(s,d);return h===!1&&(h=await c.apply(s,d)),h})();let p=i.apply(s,d);return p===!1&&(p=c.apply(s,d)),p}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return $n.lex(e,t??this.defaults)}parser(e,t){return xn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?$n.lex:$n.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?xn.parse:xn.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?$n.lex:$n.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?xn.parse:xn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Bn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},mr=new jm;function mt(e,t){return mr.parse(e,t)}mt.options=mt.setOptions=function(e){return mr.setOptions(e),mt.defaults=mr.defaults,uu(mt.defaults),mt};mt.getDefaults=ri;mt.defaults=gr;mt.use=function(...e){return mr.use(...e),mt.defaults=mr.defaults,uu(mt.defaults),mt};mt.walkTokens=function(e,t){return mr.walkTokens(e,t)};mt.parseInline=mr.parseInline;mt.Parser=xn;mt.parser=xn.parse;mt.Renderer=wo;mt.TextRenderer=di;mt.Lexer=$n;mt.lexer=$n.lex;mt.Tokenizer=vo;mt.Hooks=_s;mt.parse=mt;var aw=mt.options,iw=mt.setOptions,lw=mt.use,cw=mt.walkTokens,uw=mt.parseInline;var dw=xn.parse,pw=$n.lex;function Zn(e){let t=mt.parse(e),n=nu.sanitize(t);return ru(n)}function Un(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Nr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function xo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var ku={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Bm={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Um=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Wm=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function On(e){return!!e&&typeof e=="object"}function pi(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function fi(e,t){let n=pi(e),r=pi(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function $u(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>On(s)&&typeof s.text=="string"?s.text:"").join(""):On(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function zm(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:ku[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=pi(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=fi(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let c=fi(On(i)?i.old_string:"",On(i)?i.new_string:"");s+=c.added,o+=c.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function _i(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function mi(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Um.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Wm.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Hm(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Gm(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(On(a)){if(a.type==="text"&&typeof a.text=="string")o.push(mi(a.text));else if(a.type==="thinking"){let i=_i(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=zm(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?wu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(On(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=$u(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?wu([s],n):[s]}return[]}function wu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Vm(e){let t=typeof e.command=="string"?e.command:"",n=$u(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:ku.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Km(e){if(e.type==="item.completed"&&On(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[mi(t.text)];if(t.type==="reasoning"){let n=_i(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Vm(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Ym(e){if(e.schema!=="codex-delegation-monitor-v1"||!On(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&On(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[mi(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=_i(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Bm[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Zm(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Xm(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return On(t)?t:null}function xu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Xm(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Hm(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Ym(o):Zm(o)?Km(o):Gm(o,n);return a.length>0&&(r.progress=null),a}}}function gi(e){let t=[],n=xu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Qm=5,Jm=10,eg=/Task\s+#(\d+)/,tg=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,ng=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ao(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function rg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function sg(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function og(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=eg.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!c||d.length===0)continue;t.set(c[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function ag(e){if(e.tool==="Bash"){let t=e.command||"";return tg.test(t)?"~ PR/\uAC8C\uC2DC \uC911":ng.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ig(e){let t=e.filter(s=>s.kind==="tool").slice(-Jm),n=new Map;t.forEach((s,o)=>{let a=ag(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function lg(e){let t=sg(e);if(t)return{text:t,guess:!1};let n=og(e);if(n)return{text:n,guess:!1};let r=ig(e);return r?{text:r,guess:!0}:null}function cg(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:cn(e,t)}function qr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,c=null,d=!1,p={},h=!0,y=new Set,$=new Set,E=null,N=null,B=!1,Y=!1,le=!1,U=null,q=null;function D(){B=!1,Y=!1,le=!1,U=null,q=null}async function W(te){if(n){Y=!0,le=!1,ae();try{let J=await Promise.resolve(n("get-attempt-prompt",{attempt_id:te,...c?{root_dir:c}:{}}));if(o!==te)return;!J||typeof J!="object"||Array.isArray(J)?le=!0:(U=J,q=te)}catch{o===te&&(le=!0)}finally{o===te&&(Y=!1,ae())}}}function S(){if(B=!B,B&&o&&q!==o){W(o);return}ae()}function M(){if(!B)return"";let te=Nr({loading:Y,error:le});if(te)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${te}
      </div>`;if(!U)return"";if(U.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let J=xo(U.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${J?l`<div class="prompt-block__meta">${J} 발송</div>`:""}
      ${typeof U.task_prompt=="string"?Un("\uACFC\uC5C5 (user)",U.task_prompt):""}
      ${typeof U.system_prompt=="string"?Un("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",U.system_prompt):""}
    </div>`}function ne(){if(!i||!r)return[];let te=r.get(i);return gi(te?te.lines:[])}function Te(){if(!i||!r)return null;let te=r.get(i),J=te?te.last_event_at:null;return typeof J=="number"?J:null}function be(){return p.status==="running"}function H(){if(be()&&o){N||(N=setInterval(()=>ae(),1e3));return}X()}function X(){N&&(clearInterval(N),N=null)}function he(te){let J=[],Ce=0;for(;Ce<te.length;){let{idx:Ke,line:Oe}=te[Ce];if(Oe.kind==="tool"){let we=Ce;for(;we<te.length&&te[we].line.kind==="tool"&&te[we].line.tool===Oe.tool;)we+=1;if(we-Ce>=Qm&&!$.has(Ke)){J.push({kind:"group",idx:Ke,tool:Oe.tool||"",lines:te.slice(Ce,we)}),Ce=we;continue}}J.push({kind:"line",idx:Ke,line:Oe}),Ce+=1}return J}function ke(te){let J=[],Ce=new Map;for(let we=0;we<te.length;we+=1){let Be=te[we],Ge=Be.parent_tool_use_id;if(typeof Ge=="string"&&Ge.length>0){let Qe=Ce.get(Ge);Qe||(Qe={kind:"subagent",idx:we,launch_id:Ge,agent_type:null,header:null,lines:[]},Ce.set(Ge,Qe),J.push(Qe)),Qe.lines.push({idx:we,line:Be});continue}if(Be.kind==="tool"&&Be.tool==="Agent"&&typeof Be.launch_id=="string"&&Be.launch_id.length>0){let Qe=ge(Be),Ze=Ce.get(Be.launch_id);if(Ze){Ze.header={idx:we,line:Be},Ze.agent_type=Qe;continue}let rt={kind:"subagent",idx:we,launch_id:Be.launch_id,agent_type:Qe,header:{idx:we,line:Be},lines:[]};Ce.set(Be.launch_id,rt),J.push(rt);continue}J.push({kind:"entry",idx:we,line:Be})}let Ke=[],Oe=0;for(;Oe<J.length;){if(J[Oe].kind!=="entry"){Ke.push(J[Oe]),Oe+=1;continue}let we=Oe;for(;we<J.length&&J[we].kind==="entry";)we+=1;Ke.push(...he(J.slice(Oe,we))),Oe=we}return Ke}function ge(te){let J=te.input;return J&&typeof J.subagent_type=="string"?J.subagent_type:null}function se(te){for(let J=te.length-1;J>=0;J-=1){let Ce=te[J];if(Ce.kind==="result"||Ce.kind==="error")return null;if(Ce.kind==="tool"&&!Object.hasOwn(Ce,"result"))return Ce}return null}function Se(te){for(let J=te.length-1;J>=0;J-=1)if(te[J].kind==="thinking")return te[J];return null}function ye(te,J){if(J.kind==="gate")return l`<div class="sv__gate">${J.text}</div>`;if(J.kind==="phase")return l`<div class="sv__phase">${J.text}</div>`;if(J.kind==="result")return l`<div
        class="sv__result${J.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${J.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Zn(J.text||(J.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(J.kind==="thinking"){let Ce=y.has(te);return l`<div
        class="sv__think${Ce?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>I(te)}
      >
        <span class="sv__think-line">💭 ${Ao(J.text)}</span>
        ${Ce?l`<pre class="sv__think-expand">${J.text}</pre>`:""}
      </div>`}if(J.kind==="error")return l`<div class="sv__error">⛔ ${J.text}</div>`;if(J.kind==="blocker")return l`<div class="sv__error">⛔ ${J.text}</div>`;if(J.kind==="tool"){let Ce=y.has(te),Ke=J.tool==="Bash"?rg(J.command):0,Oe=J.tool==="Bash"?Ke>1?Ao(J.command):J.command:J.path||J.command||"";return l`<div
        class="sv__tool${Ce?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>I(te)}
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
        ${Ce?l`<pre class="sv__tool-expand">${K(J)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Zn(J.text||"")}</div>`}function K(te){let J=[];if(te.tool==="Bash"&&typeof te.command=="string"&&te.command.length>0)J.push(te.command);else if(te.input!==void 0)try{J.push(`input: ${JSON.stringify(te.input,null,2)}`)}catch{}return typeof te.output=="string"&&te.output.length>0&&J.push(`output:
${te.output}`),J.join(`

`)}function ee(){if(!o)return l``;let te=ne(),J=(a?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),Ce=p.session_id||"",Ke=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,Oe=be(),we=Oe?cg(Te(),Date.now()):"",Be=Oe?se(te):null,Ge=Oe?Se(te):null,Qe=lg(te);return l`<div class="sv" data-attempt-id=${o}>
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
              @click=${()=>Le(Ce)}
            >
              ⧉ ${Ce.slice(0,8)}
            </button>`:""}
        ${J?l`<span class="sv__meta">${J}</span>`:""}
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
              @click=${S}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${Ke}
          @click=${ce}
        >
          <span class="sv__follow-full">⇣ ${Ke}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
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
        ${te.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:ke(te).map(Ze=>Ze.kind==="subagent"?ve(Ze):Ze.kind==="group"?me(Ze):ye(Ze.idx,Ze.line))}
      </div>
      ${Be||Ge?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Be?l`<span class="sv__now-icon">${Be.icon}</span>
                  <span class="sv__now-name">${Be.tool}</span>
                  <span class="sv__now-detail"
                    >${Be.tool==="Bash"?Ao(Be.command):Be.path||Be.command||""}</span
                  >`:""}
            ${Ge?l`<span class="sv__now-think"
                  >💭 ${Ao(Ge.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function me(te){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Me(te.idx)}
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
        @click=${()=>Me(te.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${te.agent_type||"subagent"}</span>
        ${Oe?l`<span class="sv__sub-detail">${Oe}</span>`:""}
        <span class="sv__sub-count">${te.lines.length}줄</span>
        ${Ke?l`<span class="sv__sub-state">${Ke}</span>`:""}
        ${J?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${J?l`<div class="sv__sub-body">
            ${he(te.lines).map(we=>we.kind==="group"?me(we):ye(we.idx,we.line))}
          </div>`:""}
    </div>`}function Me(te){$.add(te),ae()}function ae(){Ve(ee(),e),H(),h&&He()}function He(){let te=e.querySelector(".sv__body");te&&(te.scrollTop=te.scrollHeight)}function I(te){y.has(te)?y.delete(te):y.add(te),ae()}function ce(){h=!h,ae()}function Le(te){un(te).then(J=>{J?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function qe(te){!o||!te||(p={...p,...te},ae())}function Ie(te){let J=te.target;if(!J||!J.classList||!J.classList.contains("sv__body"))return;!(J.scrollHeight-J.scrollTop-J.clientHeight<=4)&&h&&(h=!1,ae())}e.addEventListener("scroll",Ie,!0);function We(te){let J=te.target;!J||typeof J.closest!="function"||e.contains(J)||J.closest("dialog")||J.closest(".md-viewer-root")||_t()}let je=!1;function Ye(){je||(document.addEventListener("mousedown",We),je=!0)}function tt(){je&&(document.removeEventListener("mousedown",We),je=!1)}function ct(te){let J=te&&te.attempt_id;if(!J)return;let Ce=i;o=J,a=typeof te.launch_id=="string"&&te.launch_id.length>0?te.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Ce&&Ce!==i&&Promise.resolve(n("unsubscribe-session-log",{id:Ce})).catch(()=>{}),c=typeof te.root_dir=="string"&&te.root_dir.length>0?te.root_dir:null,p=te.meta||{},d=te.hide_prompt===!0,h=!0,y.clear(),$.clear(),D(),!E&&r&&(E=r.subscribe(ae)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),Ye(),ae()}function _t(){let te=i;tt(),o=null,a=null,i=null,c=null,d=!1,y.clear(),$.clear(),D(),X(),n&&te&&Promise.resolve(n("unsubscribe-session-log",{id:te})).catch(()=>{}),Ve(l``,e),s&&s()}return{open:ct,updateMeta:qe,close:_t,isOpen(){return o!==null},destroy(){X(),tt(),E&&(E(),E=null),e.removeEventListener("scroll",Ie,!0),o=null,a=null,i=null,c=null,d=!1,Ve(l``,e)}}}function So(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=bi(t.spec_id),s=bi(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function bi(e){return typeof e=="string"?e.trim():""}function Au(e){let t=So(e);if(t.path)return t;let n=bi(ug(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function ug(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function dg(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function pg(e){let t=e&&e.metadata||{},n=Au(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:dg(t)?null:"plan_pending"}),r}function Su(e,t){let n=pg(e);return l`
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
  `}var fg="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",_g=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,mg=/^\*\*결론\*\* — (.+)$/;function Eo(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==fg)return null;let n=_g.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?mg.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:c,body:t.slice(d).join(`
`).trim()}}var Eu=20;function Tu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function gg(e){return e.length>Eu?`${e.slice(0,Eu)}\u2026`:e}function bg(e,t,n,r){let s=`${t.lane} ${gg(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Tu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?l`<div class="detail-report__body">
          ${Zn(t.body)}
        </div>`:""}
  </div>`}function hg(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Tu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Zn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Cu(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((c,d)=>String(d.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let d=Eo(typeof c.text=="string"?c.text:"");return d?bg(c,d,t,s.has(c.id)):hg(c)})}
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
  `}var{I:Vw}=Kl;var Ru=e=>e.strings===void 0;var yg={},Ou=(e,t=yg)=>e._$AH=t;var br=go(class extends Mr{constructor(e){if(super(e),e.type!==jn.PROPERTY&&e.type!==jn.ATTRIBUTE&&e.type!==jn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ru(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===mn||t===Lt)return t;let n=e.element,r=e.name;if(e.type===jn.PROPERTY){if(t===n[r])return mn}else if(e.type===jn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return mn}else if(e.type===jn.ATTRIBUTE&&n.getAttribute(r)===t+"")return mn;return Ou(e),t}});var To=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],yi=[...To.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Wn=["orchestration_model","orchestration_effort","orchestration_speed"],Co=[...To,...Wn],vg=yi.filter(e=>Co.includes(e)),Lu=["delegated","main"],Ro=["inherit","claude","codex"],bs=["default","fast"],hs=["standard","fast_track"],ys=["codex","opus","fable","self","skip"],Oo=["codex","fable","skip"],Lo=["low","medium","high","xhigh"],pn="auto";function dn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Iu(e){if(!dn(e)||!dn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))dn(r)&&dn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Fr(e,t){let n=Iu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[pn,...r.flatMap(([,s])=>s)]}function Pu(e,t,n,r){if(!dn(e)||!dn(e.runners))return[pn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!dn(a)||!dn(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(n&&n!==pn&&i!==n)continue;let d=r(a,c);if(Array.isArray(d))for(let p of d)typeof p=="string"&&!s.includes(p)&&s.push(p)}return[pn,...s]}function jr(e,t,n){return Pu(e,t,n,(r,s)=>dn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function vi(e,t,n){return Pu(e,t,n,(r,s)=>dn(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:dn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function vs(e,t){let n=Iu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Du(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Fr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!jr(t,s,r.impl_model||pn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var wg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},hi=[...vg,...Wn],kg=[...Co,...yi].filter((e,t,n)=>n.indexOf(e)===t&&!hi.includes(e));function Mu(e,t){let n=dn(e)?e:{},r=dn(t)?t:{},s=[];for(let a of hi){let i=n[a]??null,c=r[a]??null;i!==c&&s.push({key:a,label:wg[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...kg,...Object.keys(r)])!hi.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function wi(e,t,n,r,s,o){return co({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Nu(e,t){let n={};for(let r of yi){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function qu(e,t){let n={};for(let r of Wn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var ki=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Wn]}],Xn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Io={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function $i(e,t,n,r,s,o=null){let a=rn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Fu(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of $i(e,t,n,r,s,o))a[i.source]+=1;return a}function ju(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Bu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var sk=[...To,...Wn];var $g=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],xi={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Uu={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},xg={pin:"pin",global:"global",base:"base"};function Ag(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${xg[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Sg(e,t,n){switch(e){case"workflow_mode":return hs;case"spec_review_model":case"impl_review_model":return ys;case"plan_review_model":return Oo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Lo;case"impl_dispatch":return Lu;case"impl_runtime":return Ro;case"impl_model":return Fr(n,t.impl_runtime);case"impl_effort":return jr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return bs;case"orchestration_model":return vs(n,null);case"orchestration_effort":return jr(n,void 0,t.orchestration_model||pn).filter(r=>r!==pn);default:return[]}}function Eg(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${Ag(e.source)}
    <span class="detail-effective__k"
      >${Xn[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Io[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Xn[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Wu(e,t){let n=ki.flatMap(c=>c.keys),r=$i(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Fu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(c=>[c.key,c])),a=Object.fromEntries(r.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=r.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return l`<details
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
        >${Tg(o)}</span
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
          ${ki.map(c=>l`
              <div class="detail-effective__subhead">${c.label}</div>
              ${r.filter(d=>c.keys.includes(d.key)).map(d=>{let p=co({key:d.key,choices:Sg(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Eg(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${br(e.preset_id)}
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
  </details>`}function Tg(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Cg(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function zu(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=Cg(n.exec_receipt),c=i?Dn(i):a,d=i?`${i.kind}:${i.actor}`:a.split("@")[0],p=io(n.planned_execution,n.exec_receipt),h=n.chips?.pr?.number,y=typeof h=="number"?`PR #${h}`:"PR";return l`<section class="detail-summary" data-seam="detail-summary">
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
            >${y}</a
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
      ${Rg(s).map($=>Og($,t,r,{label:$.id==="pr"?y:$.label,href:$.id==="pr"?o:""}))}
    </div>
  </section>`}function Rg(e){let n=typeof e=="string"&&Object.hasOwn(xi,e)&&xi[e]||xi.spec_backed;return $g.filter(r=>n.includes(r.id))}var Po={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Og(e,t,n,r){let s=Lg(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,c=!i&&a==="dim",d=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,p=s&&s.split("@")[1]?.slice(0,7)||"",h=d?Po.stale:i?Po.on:c?Po.current:Po.none,y=Ig(e,n),$=`${r.label} \xB7 ${h}${y?` \xB7 ${y}`:""}${s?` \xB7 ${s}`:""}`,E=`detail-summary__gate${i?" detail-summary__gate--on":""}${c?" detail-summary__gate--current":""}${d?" detail-summary__gate--stale":""}${p?" detail-summary__gate--receipt":""}`,N=l`<span class="detail-summary__gate-label"
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
  >`}function Lg(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Ig(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Uu,n)?Uu[n]:""}function Do(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Hu(e){return Do(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Gu(e,t){let n=e&&e[t];if(!Do(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Hu),s=Hu(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Yu(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Mo(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Yu(e)}${t}`}function Br(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Yu(e)}`}function Pg(e,t,n){if(n!==null){let s=e==="claude"?Mo:Br,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Br({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Vu(e,t){if(!Do(e)||e.state!=="usable"||!Do(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Ku(e){let t=e.provider_key==="claude"?Mo:Br,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Pg(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Zu({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Ku({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Gu(t,"claude"),selected:s,workspace_default:Vu(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Ku({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Gu(t,"codex"),selected:o,workspace_default:Vu(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var Xu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function ws(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function No(e){if(!ws(e)||!ws(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>ws(n)&&ws(n.models));return t.length>0?t:null}function An(e,t){let n=No(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Qu(e,t){return ws(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Ju(e,t){let n=No(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Qu(r,r.models[t]);return[]}function Dg(e){let t=No(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Qu(r,s))n.includes(o)||n.push(o);return n}function Mg(e,t){if(!t)return Dg(e);let r=No(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Ju(e,o))s.includes(a)||s.push(a);return s}function ed(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=An(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Ju(t,r.impl_model):Mg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function Ng(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function qg(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function qo(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function d(N){N.key==="Escape"&&s&&(N.preventDefault(),$())}document.addEventListener("keydown",d);function p(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>$()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ng(s)}</span
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
                        >`}${Zn(a)}`}
          </div>
        </div>
      </div>
    `:l``}function h(){Ve(p(),e)}async function y(N,B={}){s=N,o="loading",a="",i=null,c="",h();let Y=B.workspace||(n?n():"");if(!Y){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",h();return}if(!r){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",h();return}let le="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(N);try{let U=await r(le),q=await U.json().catch(()=>({}));if(!U.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&B.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",h();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||U.status)+")",h();return}let D=qg(String(q.content||""));i=D.front,a=D.body,o="ready",h()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",h()}}function $(){s=null,Ve(l``,e)}function E(){document.removeEventListener("keydown",d),$()}return{open:y,close:$,destroy:E}}var Fg=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],rd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Fo=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],jg=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function td(e){return typeof e=="string"&&jg.has(e)}var Bg=["running","done","failed","interrupted"],Ug={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Wg(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function zg(e){let t=Wt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Dr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${rd}
          >부분 집계</span
        >`:""}`}function nd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ei(e){if(typeof e=="number")return jo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?jo(t):""}function Hg(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Gg(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ai(e){return e===null||typeof e=="string"&&e.trim().length>0}function Si(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Vg(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Fo.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Ai(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ai(t.effort))||!(!("agent_type"in t)||Ai(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Bg.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Si(t.started_at)||!Si(t.last_event_at)||!Si(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Kg(e,t,n){let s=Wt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Ei(n.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${Ei(n.completed_at)}</span
        >`:""}
    ${s?l`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Yg(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Wt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?jo(e.last_event_at):s?Ei(s.completed_at):"",c=(e.provider==="claude"?["Claude",e.agent_type,Hg(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=Gg(e,s);return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Ug[e.status]}</span
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
  </button>`}function Zg(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Xg(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let h=Vg(p);!h||s.has(h.launch_id)||td(h.agent_type)||(s.add(h.launch_id),r.push(h))}r.sort((p,h)=>(p.started_at||0)-(h.started_at||0));let a={};for(let{role:p,provider:h}of Fo){let y=t?t.roles[p]?.[h]:null;a[p]=y?[...y.legs]:[]}let i=Fo.flatMap(({role:p})=>a[p]),c=new Set,d=[];for(let{role:p,provider:h}of Fo){for(let y of r.filter($=>$.role===p&&$.provider===h)){let $=i.find(E=>E.receipt_id===y.launch_id)||null;$&&!Zg(y,$)||($&&c.add($.receipt_id),d.push(Yg(y,$,e.attempt_id,n)))}for(let y of a[p])!c.has(y.receipt_id)&&!td(y.agent_type)&&d.push(Kg(p,h,y))}return d}function Qg(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Fg,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${r.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Wg(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${rd}</span>`:""}
  </div>`}var Jg={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function jo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function eb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function sd(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of r)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let h=typeof d.session_id=="string"&&d.session_id.length>0,y=o.has(d.attempt_id),$=h&&!y,E=h?y?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!$}
      title=${E}
      @click=${N=>{N.stopPropagation(),$&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let h=d.cause_detail,y=h&&typeof h.reason=="string"&&h.reason.length>0?typeof h.command=="string"&&h.command.length>0?`${h.reason} \xB7 ${h.command}`:h.reason:d.cause;return l`<div class="detail-session__cause" title=${y}>
      ${d.cause}
    </div>`},c=d=>{let p=nd(za(d));if(Wt(p).length===0&&!Dr(d.usage))return"";let h=s.has(d.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${h?"true":"false"}
      title=${h?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${y=>{y.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${zg(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(d=>{let p=za(d),h=nd(p),y=Wt(h);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Jg[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${ns(d)?l`<span
                  class="detail-session__resumed"
                  title=${ns(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${_r(d)}</span>
            ${y.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?l`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${y.length>0?y.map($=>l`<span
                      class="detail-session__usage"
                      title=${$.tooltip}
                      >${$.label}</span
                    >`):Dr(d.usage)?l`<span class="detail-session__usage"
                    >${Dr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${jo(d.started_at)}</span>
          </button>
          ${c(d)} ${a(d)} ${i(d)} ${eb(d)}
          ${s.has(d.attempt_id)&&d.usage?Qg(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${Xg(d,p,t)}
        </div>`})}
    </div>
  `}function od(e,t={}){return l`
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
          ${tb(e)}
        </div>`:""}
  `}function tb(e){let t=Nr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Un("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=xo(n.recorded_at);return l`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Un("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Un("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var nb=["open","in_progress","deferred","resolved","closed"],rb=[0,1,2,3,4];function ad(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,d=null,p=null,h={},y="",$=!1,E=[],N=!1,B={},Y={claude:null,codex:null},le=null,U=null,q=0,D=!1,W=!1,S="",M="",ne="";function Te(){D=!1,W=!1,S="",M="",ne=""}function be(){Y={claude:null,codex:null},le=null,U=null,q+=1}async function H(){if(!s)return null;try{let m=await Promise.resolve(s("get-workspace-accounts",{}));return m&&typeof m.state=="string"?m:null}catch{return null}}async function X(m){try{let A=await fetch(m);if(!A.ok)return null;let u=await A.json();if(!u||typeof u!="object"||!Array.isArray(u.accounts))return null;let f=u.accounts.filter(v=>v!==null&&typeof v=="object"&&!Array.isArray(v));return{accounts:f,active:f.find(v=>v.active===!0)||null}}catch{return null}}async function he(m){U=m;let A=++q,[u,f,v]=await Promise.all([X("/api/claude-usage"),X("/api/codex-usage"),H()]);A!==q||m!==d||(Y={claude:u,codex:f},le=v,w())}let ke=[],ge=null,se=null,Se=!1,ye="",K=!1,ee=0,me=new Set;function ve(){ke=[],ge=null,se=null,Se=!1,ye="",K=!1,ee+=1,me.clear()}async function Me(m){if(!s)return;let A=++ee;try{let u=await Promise.resolve(s("get-comments",{id:m}));if(A!==ee||m!==d)return;ke=Array.isArray(u)?u:[],Se=!1}catch{if(A!==ee||m!==d)return;Se=!0}w()}function ae(){if(!s||!d)return;let m=p&&typeof p.comment_count=="number"?p.comment_count:null;if(ge!==d){ge=d,se=m,Me(d);return}m!==null&&m!==se&&(se=m,Me(d))}function He(m){me.has(m)?me.delete(m):me.add(m),w()}function I(m){let A=ye.trim().length===0;ye=m,A!==(m.trim().length===0)&&w()}async function ce(){let m=ye.trim();if(!s||!d||m.length===0||K)return;let A=d;K=!0,w();let u=!1;try{let f=await Promise.resolve(s("add-comment",{id:A,text:m}));Array.isArray(f)&&f.length>0&&(u=!0,A===d&&(ke=f,Se=!1,ye="",se=f.length))}catch{u=!1}u||ie("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),A===d&&(K=!1),w()}let Le={onToggle:He,onDraftInput:I,onSubmit:ce},qe=t.mdViewer||null,Ie=null;qe||(Ie=document.createElement("div"),Ie.className="md-viewer-root",document.body.appendChild(Ie));let We=qe||qo(Ie,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),je=document.createElement("div");je.className="session-log-root",document.body.appendChild(je);let Ye=qr(je,{transport:s?(m,A)=>Promise.resolve(s(m,A)):void 0,sessionLogStore:c}),tt=!1,ct=!1,_t=!1,te=null,J=null,Ce=0;function Ke(m){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${m}`}function Oe(){tt=!1,ct=!1,_t=!1,te=null,J=null,Ce+=1}async function we(m){if(!s)return;let A=++Ce;ct=!0,_t=!1,w();try{let u=await Promise.resolve(s("get-bead-prompt",{bead_id:m}));if(A!==Ce)return;!u||typeof u!="object"||Array.isArray(u)?_t=!0:(te=u,J=Ke(m))}catch{A===Ce&&(_t=!0)}finally{A===Ce&&(ct=!1,w())}}function Be(){if(tt=!tt,tt&&d&&J!==Ke(d)){te=null,we(d);return}w()}function Ge(){if(!a||!d)return[];let m=a.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter(u=>u&&u.bead_id===d).sort((u,f)=>(f.started_at||0)-(u.started_at||0)).map(u=>({attempt_id:u.attempt_id,bead_id:u.bead_id,status:u.status,started_at:typeof u.started_at=="number"?u.started_at:null,runner:u.runner||null,model:u.model||null,effort:u.effort||u.observed_effort||null,speed:u.speed||null,session_id:u.session_id||null,resumed_from:u.resumed_from||null,continuation_mode:u.continuation_mode||null,dismissed_at:typeof u.dismissed_at=="number"?u.dismissed_at:null,cause:typeof u.cause=="string"?u.cause:null,cause_detail:u.cause_detail||null,exec_default_preset_id:typeof u.exec_default_preset_id=="string"?u.exec_default_preset_id:null,exec_default_preset_revision:typeof u.exec_default_preset_revision=="number"?u.exec_default_preset_revision:null,exec_values:u.exec_values&&typeof u.exec_values=="object"?u.exec_values:null,usage:u.usage||null,usage_legs:Array.isArray(u.usage_legs)?u.usage_legs:[],delegation_sessions:Array.isArray(u.delegation_sessions)?u.delegation_sessions:[]}))}function Qe(){if(!a||!d)return null;let m=a.get();return bn(m&&m.attempts||{},d)}let Ze=new Set;function rt(m){Ze.has(m)?Ze.delete(m):Ze.add(m),w()}function yt(m){let A=a?a.get():null,u=A&&A.attempts?A.attempts[m]:null;Ye.open({attempt_id:m,meta:u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}})}function Et(m,A){let u=a?a.get():null,f=u&&u.attempts?u.attempts[m]:null,x=(f&&Array.isArray(f.delegation_sessions)?f.delegation_sessions:[]).find(j=>j&&typeof j=="object"&&j.launch_id===A);x&&Ye.open({attempt_id:m,launch_id:A,meta:{runner:x.provider==="claude"?"claude":"codex",role:x.role,...typeof x.agent_type=="string"?{agent_type:x.agent_type}:{},model:x.model,effort:x.effort,session_id:x.session_id,status:x.status}})}async function it(m){if(!s||!m)return;let A=await Pr();if(A===null)return;let u=()=>{let j=a?a.get():null;return j&&typeof j.revision=="number"?j.revision:0},f=async(j={},z=u())=>await s("worker-attempt-resume",{attempt_id:m,expected_revision:z,...A!==""?{instructions:A}:{},...j}),v=j=>{j?.queue&&a?.set&&a.set(j.queue)},x=await f();if(v(x),x&&x.conflict){let j=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:u();x=await f({},j),v(x)}x=await Mn(x,(j,z)=>f({continuation:j,decision_token:z}),{onResult:v,refresh:()=>f()}),x&&x.resumed===!1&&!x.conflict&&x.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}let Ot={onOpen:yt,onOpenDelegation:Et,onResume:it,onToggleUsage:rt};function ut(){let m=a?a.get():null,A={...B};for(let u of["orchestration_model","orchestration_effort","orchestration_speed"]){let f=m&&m[u];typeof f=="string"&&(A[u]=f)}return A}async function ze(){if(s){try{let m=await Promise.resolve(s("get-session-defaults",{}));B=m&&m.values&&typeof m.values=="object"?m.values:{}}catch{B={}}w()}}function Re(){let m=a?a.get():null;return m&&m.runner_catalog||null}function P(){let m=a?a.get():null;return m&&typeof m.execution_defaults=="object"?m.execution_defaults:null}function V(){let m=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},u=rn({pin:{...m,...h},global:ut(),execution_defaults:P(),runner_catalog:Re(),route:typeof m.route=="string"?m.route:null}).orchestration_model.value||"";return An(Re(),u)}function de(){let m=i?i.get():null;return!m||typeof m.revision!="number"?null:{revision:m.revision,presets:Array.isArray(m.presets)?m.presets:[]}}function C(m){return m?.compatible===!1}function G(m){i&&m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&i.set({revision:m.revision,presets:m.presets})}async function pe(){let m=de(),A=m?.presets.find(u=>u.id===y);if(!(!s||!d||!m||!A||C(A)||$)){$=!0,E=[],w();try{let u=await Promise.resolve(s("apply-impl-preset",Bu(d,A.id,m.revision)));if(u&&u.conflict){G(u),ie("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let f=u&&Array.isArray(u.issue)?u.issue[0]:u?.issue;if(u&&u.applied&&f&&typeof f=="object"){p=f,E=Array.isArray(u.skipped_orchestration_keys)?u.skipped_orchestration_keys.filter(v=>typeof v=="string"):[];for(let v of Xu)delete h[v];ie(E.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}u&&u.error==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(u){u&&typeof u=="object"&&u.code==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{$=!1,w()}}}let g=null;n&&n.subscribe&&(g=n.subscribe(()=>Z()));let k=null;a&&typeof a.subscribe=="function"&&(k=a.subscribe(()=>{d&&w()}));let O=null;i&&typeof i.subscribe=="function"&&(O=i.subscribe(()=>{d&&w()}));function Q(m){m.key==="Escape"&&d&&(m.preventDefault(),r())}document.addEventListener("keydown",Q);function Z(){if(d){if(n&&typeof n.snapshotFor=="function"){let m=n.snapshotFor("detail:"+d)||[];p=m.find(u=>u&&u.id===d)||m[0]||p}ae(),w()}}function fe(m){un(m).then(A=>{A?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ee(m){m.preventDefault(),m.stopPropagation(),d&&fe(d)}function $e(m,A){m.preventDefault(),m.stopPropagation(),fe(A)}function st(m,A,u){m.preventDefault(),m.stopPropagation(),We.open(A,{missing_state:u})}function dt(m,A){h[m]=A,w(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",ju(d,m,A.length===0?null:A))).catch(()=>{ie("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function xe(m,A){let u=p||{},f=u.metadata&&typeof u.metadata=="object"?u.metadata:{},v={};for(let z of["impl_runtime","impl_model","impl_effort"])v[z]=Object.hasOwn(h,z)?h[z]:typeof f[z]=="string"?f[z]:"";v[m]=A;let x=ed(v,Re(),V()),j={};for(let z of["impl_runtime","impl_model","impl_effort"])j[z]=h[z],h[z]=x[z]||"";w(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...x,orchestration_runtime:V()})).then(z=>{let re=Array.isArray(z)?z[0]:z;if(!re||typeof re!="object"||!re.id)throw new Error("implementation target readback failed");p=re;for(let _e of["impl_runtime","impl_model","impl_effort"])delete h[_e];w()}).catch(()=>{for(let z of["impl_runtime","impl_model","impl_effort"])j[z]===void 0?delete h[z]:h[z]=j[z];w(),ie("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function bt(m,A,u){if(!s||!d)return!1;try{let f=await Promise.resolve(s(m,A)),v=Array.isArray(f)?f[0]:f;return v&&typeof v=="object"&&v.id?(p=v,!0):(ie(u,"error"),!1)}catch{return ie(u,"error"),!1}}function gt(m){setTimeout(()=>{try{let A=e.querySelector(m);A&&typeof A.focus=="function"&&A.focus()}catch{}},0)}function qt(){D=!0,S=p&&p.title||"",w(),gt('.detail-edit__input[data-edit="title"]')}function Gt(m){S=m.target.value}function Mt(){D=!1,S="",w()}function Pt(){bt("edit-text",{id:d,field:"title",value:S},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(A=>{A&&(D=!1,S=""),w()})}function fn(){W=!0,M=p&&p.description||"",w(),gt('.detail-edit__textarea[data-edit="description"]')}function At(m){M=m.target.value}function Dt(){W=!1,M="",w()}function Ue(){bt("edit-text",{id:d,field:"description",value:M},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(A=>{A&&(W=!1,M=""),w()})}function Xt(m,A,u,f){if(m.key==="Escape"){m.stopPropagation(),u();return}m.key==="Enter"&&(!f||m.ctrlKey||m.metaKey)&&(m.preventDefault(),A())}function Qt(m){let A=m.target.value;bt("update-status",{id:d,status:A},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>w())}function et(m){let A=Number(m.target.value);bt("update-priority",{id:d,priority:A},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>w())}function Pe(m){ne=m.target.value}function R(){let m=ne.trim();m.length!==0&&bt("label-add",{id:d,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(A=>{A&&(ne=""),w()})}function ue(m){if(m.key==="Escape"){m.stopPropagation(),ne="",w();return}m.key==="Enter"&&(m.preventDefault(),R())}function Ae(m){bt("label-remove",{id:d,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>w())}let ot={onCopyPath:$e,onOpenDoc:st};function vt(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function pt(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Rt(m){let u=(Array.isArray(m.dependencies)?m.dependencies:[]).map(f=>({id:vt(f),icon:pt(f)})).filter(f=>f.id.length>0);return l`
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
    `}function It(m){let A=m.metadata||{},u=m.workflow||{},f=u.stages||{},v=f.spec&&f.spec.stale,x=f.impl&&f.impl.stale,j=f.plan||null,z=u.route_source==="derived",re=u.route||A.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${z?" detail-kv__v--derived":""}"
          title=${z?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${z?"unset":re}</span
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
              <span class="detail-kv__v">${j?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${j?.approval_receipt||"\uC5C6\uC74C"}${j?.approval_state==="stale"?" \xB7 stale":j?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${u.route!=="quick_fix"||Object.hasOwn(A,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${A.impl_review||"\uC5C6\uC74C"}${x?" \xB7 stale":""}</span
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
    `}let Ht={route:["quick_fix","spec_backed","full_plan"]};async function Jt(m,A){let u=A.target.value;if(m==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&u!=="full_plan"&&!window.confirm(`full_plan \u2192 ${u||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){w();return}await bt("update-workflow-meta",{id:d,key:m,value:u},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),w()}function wt(m){let A=m.metadata||{};return l` ${((f,v)=>{let x=Ht[f],j=typeof A[f]=="string"?A[f]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${f}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${f}
          data-edit=${`wfmeta-${f}`}
          @change=${z=>Jt(f,z)}
        >
          <option value="" ?selected=${!x.includes(j)}>
            ${v}
          </option>
          ${x.map(z=>l`<option value=${z} ?selected=${j===z}>${z}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function en(m,A){return D?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${S}
            @input=${Gt}
            @keydown=${u=>Xt(u,Pt,Mt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Pt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Mt}
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
          @click=${qt}
        >
          ✎
        </button>
      </div>
    `}function _n(m){let A=Ut(m.created_at),u=Ut(m.updated_at);return!A&&!u?l``:l`
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
          ${nb.map(u=>l`<option value=${u} ?selected=${u===m}>${u}</option>`)}
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
          ${rb.map(u=>l`<option value=${String(u)} ?selected=${u===A}>
                P${u}
              </option>`)}
        </select>
      </div>
    `}function T(m){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${W?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${fn}
            >
              ✎
            </button>`}
      </div>
      ${W?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${M}
              @input=${At}
              @keydown=${A=>Xt(A,Ue,Dt,!0)}
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
                @click=${Dt}
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
    `}function De(m){let A=Array.isArray(m.labels)?m.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${A.map(u=>l`<span class="detail-label-chip"
              >${u}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${u}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+u}
                @click=${()=>Ae(u)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${ne}
            @input=${Pe}
            @keydown=${ue}
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
    `}function _(){if(!d)return l``;let m=p||{},A=String(m.id||d),u=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",f=Qe(),v=m.status||"open",x=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",j=m.description||"",z={...m,metadata:{...m.metadata||{},...h}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Ee}
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
          ${zu(z)}
          ${Wu({metadata:z.metadata,workspace_values:ut(),catalog:Re(),execution_defaults:P(),expanded:N,presets:de()?.presets||[],preset_id:y,preset_busy:$,skipped_orchestration_keys:E},{onToggle:re=>{N=re,w()},onEdit:(re,_e)=>{if(re==="impl_runtime"||re==="impl_model"||re==="impl_effort"){xe(re,_e??"");return}dt(re,_e??"")},onPresetSelect:re=>{y=re,E=[],w()},onPresetApply:()=>{pe()}})}
          ${Zu({md:z.metadata,catalog:Y,workspace_defaults:le,handlers:{onExecChange:dt}})}
          ${Ln(v,x)} ${_n(m)}
          ${T(j)}
          ${Cu(ke,Le,{expanded:me,draft:ye,sending:K,error:Se})}
          ${L(m)} ${De(m)} ${Rt(m)}
          ${It(m)} ${wt(m)}
          ${Su(m,ot)}
          ${od({expanded:tt,loading:ct,error:_t,data:te},{onToggle:Be})}
          ${sd(Ge(),Ot,{total:f,expanded:Ze})}
        </div>
      </div>
    `}function w(){Ve(_(),e)}return{load(m){m!==d&&(h={},y="",E=[],N=!1,Te(),ve(),Oe(),be()),d=m,p=null,Z(),ze(),U!==m&&he(m)},clear(){d=null,p=null,h={},y="",$=!1,E=[],N=!1,Te(),ve(),Oe(),be(),We.close(),Ye.close(),Ve(l``,e)},destroy(){g&&(g(),g=null),k&&(k(),k=null),O&&(O(),O=null),document.removeEventListener("keydown",Q),qe||(We.destroy(),Ie&&Ie.parentNode&&Ie.parentNode.removeChild(Ie)),Ye.destroy(),je.parentNode&&je.parentNode.removeChild(je),d=null,p=null,be(),y="",$=!1,E=[],ve(),Oe(),Ve(l``,e)}}}function id(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(d,p,h="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let y=typeof h=="string"?h.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Bo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function $s(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function Uo(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function Wo(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function zo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function sb(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:Bo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function ld(e,t){let n=sb(e,t);return n?l`<button
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
            >${zo(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${$s(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Ur(e){let t=cn(e.created_at),n=cn(e.updated_at);return!t&&!n?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${Ut(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?l`<span>·</span>`:""}${n?l`<span title=${`\uC218\uC815 ${Ut(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function ob(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function xs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ho(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Sn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(h=>h&&h.bead_id===t&&h.phase!=="done").sort((h,y)=>(h.requested_at||0)-(y.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?ob(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:p}}function ks(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return l`<div
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
  </div>`}var ab={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function cd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let c=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:ab[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Go(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function ib(e){return l`<div
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
  </div>`}function Vo(e,t={}){if(!e)return"";let n=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.warnings)?e.warnings:[],s=Array.isArray(e.overlaps)?e.overlaps:[],o=e.scope_missing===!0&&t.lane!=="running",a=e.popover||null,i=e.cross_lane||null;return n.length===0&&r.length===0&&s.length===0&&!o&&!i?"":l`<div class="worker-deps">
    ${i?l`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${i.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${i.label}
        </button>`:""}
    ${n.map(c=>l`<span class="worker-dep worker-dep--pred" title=${c.title||""}
          ><button
            type="button"
            class="worker-dep__label worker-dep__open"
            data-dep-id=${c.id}
          >
            ${c.label}
          </button></span
        >`)}${s.map(c=>l`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${c.id}
          aria-label=${`scope \uACB9\uCE68 ${c.id} (${c.location_label})`}
          title=${[`\uACB9\uCE68 ${c.id} (${c.location_label})`,...c.prefixes].join(`
`)}
        >
          ⧉ ${c.id}
        </button>`)}${o?l`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${r.map(c=>l`<span class="worker-dep worker-dep--warn">${c}</span>`)}${a?ib(a):""}
  </div>`}function Ko(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?l`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function ud(e){return e?l`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Yo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return l`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function lb(e){let t=Array.isArray(e.badges)?e.badges:[],n=Wt(e.usage),r=qn(e.usage),s=cn(e.done_at);return l`<div
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
              >`):r?l`<span class="worker-usage" title=${os(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?l`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${$s(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Qn(e){if(e.lane==="done"&&e.done_layout==="three_line")return lb(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Wt(e.usage),s=qn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?cn(e.done_at):"",d=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",y=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,E=e.lane==="done"?"":Ko(e.workflow),N=e.lane==="done"?"":ud(e.from_id),B=Yo(e.priority),Y=l`<span class="worker-mini__title">${e.title}</span>`,le=e.pr_url&&e.pr_number?l`<a
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
        >`:"",q=n.map(ee=>ee===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ee}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ee===e.completion_badge&&e.completion_title||""}
          >${ee}</span
        >`),D=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",W=r.length>0?r.map(ee=>l`<span class="worker-usage" title=${ee.tooltip}
              >${ee.label}</span
            >`):s?l`<span class="worker-usage" title=${os(e.usage)}
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
      </button>`:"",ne=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Te=e.timeline_action?l`<button
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
        </button>`:"",X=e.stale_work||null,he=X?l`${X.can_resume||X.can_continue?l`<button
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
      </div>`:"",ge=e.revise_action?l`<button
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
        </button>`:"",se=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${Go(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",Se=Vo(e.dependency_chips,{lane:e.lane}),ye=ks(e),K=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||be?.operation||e.revise_action||X);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">
            ${y}${$}${B}${N}${Y}
          </div>
          <div class="worker-mini__row2">
            ${W}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Ut(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${$s(e.work_ms)}</span
                >`:""}${q}${S}
            <span class="worker-mini__actions"
              >${M}${ne}${Te}${H}</span
            >
            ${Ur(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${d}${p}${y}${$}${B}${E}${N}${le}${U}${q}${h}${D}
            </div>
            <div class="worker-mini__body">${Y}${ke}</div>
            ${Se}${se}${K?l`<div class="worker-mini__foot">
                  ${W}${S}
                  <span class="worker-mini__actions"
                    >${M}${ne}${Te}${H}${ge}${he}</span
                  >
                  ${ks(e)}
                </div>`:""}
            ${Ur(e)}`:l`<div class="worker-mini__line">
              ${d}${p}${y}${$}${B}${E}${N}${Y}${le}${U}${q}${h}${D}${W}${S}${M}${ne}${Te}${H}
            </div>
            ${Se}${se}${ye} ${Ur(e)}`}
  </div>`}function cb(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(l`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(l`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?l`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return l`${r}`}function Ti(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),c=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),d=Vo(e.dependency_chips,{lane:e.lane});return l`<div
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
      >${Yo(e.priority)}
      ${Ko(a)}${r?l`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:""}${ud(e.from_id)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?oo(a,e.status,{onOpenDoc:n.onOpenDoc}):""}${d}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${Go(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason||n.dep_action===!0?"":" worker-card__foot--actions-only"}"
    >
      ${o?l`<div class="worker-card__place-menu">
            ${cb(t.lanes,e.id)}
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
  </div>`}function yn(e){let t=!!e.collapsible&&!!e.collapsed,n=l`<span
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?Ti(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Qn(r))}
          </div>`}
  </section>`}var dd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},pd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function fd(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ci(e){for(let t of fd(e))if(Object.hasOwn(dd,t))return dd[t];return null}function Ri(e){let t=null;for(let n of fd(e))Object.hasOwn(pd,n)&&(t=pd[n]);return t}function Zo(e){let t=Ci(e),n=Ri(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function _d(e,t){let n=Ci(e)??Ci(t),r=Ri(t)??Ri(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var md=160;function ub(e){return e.length>md?`${e.slice(0,md)}\u2026`:e}function db(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${ub(e.command)}</code>`:""}
  </div>`}function pb(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function fb(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function gd(e){let t=e.failure?Zo(e.failure.reason):"";return l`<div class="worker-banners">
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
          ${db(e.failure.cause_detail)}
          ${pb(e.failure.reason)}
          ${ks({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function _b(e){return e?l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var mb=new Set(["codex-runner"]);function gb(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(y=>y&&!(typeof y.agent_type=="string"&&mb.has(y.agent_type))),c=i.filter(y=>y&&y.state==="live"),d=i.filter(y=>y&&y.state!=="live"),p=Vo(e.dependency_chips,{lane:"running"}),h=r?cn(r.updated_at,t):"";return l`${o?l`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?l`<span class="rtile__activity-age"
              >${cn(a,t)}</span
            >`:""}
      </div>`:h?l`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">갱신 ${h}</span>
        </div>`:""}${c.length>0||d.length>0?l`<div class="rtile__legs">
        ${c.map(y=>l`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${y.label}</span
            >`)}${d.length>0?l`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${d.map(y=>y.label).join(", ")}`}
              >위임 완료 ${d.length}</span
            >`:""}
      </div>`:""}${p}`}function Oi(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?fb(t-e.started_at):"\u2014",c=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=ns(e),p=Wt(e.usage),h=qn(e.usage),y=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,$=e.base_exception||null,E=e.landing,N=e.attempt_id&&e.attempt_id===n,B=r.monitor||null,Y=_b(B),le=gb(B,t,a,s?{updated_at:e.updated_at??null}:null),U=s&&e.workflow?.chips?.exec_receipt||null,q=Ko(e.workflow),D=U?l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Dn(U)}`}
        >${`${U.kind}:${ao(U)}`}</span
      >`:"",W=q||D?l`<div class="rtile__meta">
          ${q}${D}
        </div>`:"",S=s?"":Ur(e),M=e.discard?.action?l`<button
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
      ${Yo(e.priority)}${Y}${d?l`<span class="rtile__resumed" title=${d}>↻</span>`:""}
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
                ${M}
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
                ${M}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${le}${e.rollup?so(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ja}):""}
    ${E?l`<div class="rtile__landing">
          <span
            class="merge-step${E.failed?" merge-step--failed":""}"
            style=${`--progress: ${E.percent}%`}
            >${E.label}${E.index>0?l`<span class="merge-step__n"
                  >${E.index}/${E.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${s?W:q||c||p.length>0||h||y||$?l`<div class="rtile__meta">
            ${q}${y?l`<span class="worker-mini__badge">${y}</span>`:""}
            ${$?l`<span
                  class="worker-mini__badge"
                  title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                  >${$}</span
                >`:""}
            ${Go(e.exec_chips)}
            ${p.length>0?p.map(ne=>l`<span class="worker-usage" title=${ne.tooltip}
                      >${ne.label}</span
                    >`):h?l`<span
                    class="worker-usage"
                    title=${os(e.usage)}
                    >${h}</span
                  >`:""}
          </div>`:""}
    ${S} ${ks(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Li(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Oi(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var Ii=new Set(["unavailable","not_applicable"]);function Jn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function bd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function er(e,t){return t===null?null:`${Xn[e]}: ${t.display} (${Io[t.source]})`}function Pi(e){return e.filter(t=>t!==null).join(`
`)}function As(e){if(typeof e!="object"||e===null)return null;let t=_r(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Pi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Xn.orchestration_model,e.model),n(Xn.orchestration_effort,e.effort),n(Xn.orchestration_speed,e.speed)])}}function hr(e,t){let n=Jn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Jn(e,"orchestration_effort"),s=Jn(e,"orchestration_speed"),o=bd([An(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Pi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",er("orchestration_model",n),er("orchestration_effort",r),er("orchestration_speed",s)])}}function bb(e,t){return e===null||e.value===null||Ii.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function hb(e){return e===null||Ii.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function yb(e){return e===null?null:e.value==="auto"?"auto":Ii.has(e.resolution)?null:e.display}function tr(e,t){if(typeof e!="object"||e===null)return null;let n=Jn(e,"impl_dispatch"),r=Jn(e,"impl_runtime"),s=Jn(e,"impl_model"),o=Jn(e,"impl_effort"),a=Jn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":bd([bb(r,t??null),hb(s),yb(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Pi(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",er("impl_dispatch",n),er("impl_runtime",r),er("impl_model",s),er("impl_effort",o),er("impl_speed",a)])}}var zt="",vb=["impl_runtime","impl_model","impl_effort"],wb=["claude_account","codex_account"],kb=5,Xo=1;function sn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Qo(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(P=>ie(P,"error",4e3)),o={},a={},i=[],c=!1,d={state:"absent",values:{},warnings:[]},p={},h={},y=Promise.resolve(),$={claude:null,codex:null},E=!1,N=null,B={},Y="",le="",U=!1,q=!1,D=!1,W=null,S=!1;function M(){let P=t.queue?t.queue():null;return sn(P)?P:null}function ne(){let P=M();return P?P.runner_catalog:null}function Te(){let P=M();return P&&sn(P.execution_defaults)?P.execution_defaults:null}function be(){let P=t.implPresetStore?.get();return sn(P)&&Array.isArray(P.presets)?P:null}function H(){return r===null?{}:{root_dir:r}}async function X(P,V){return S||!n?null:await n(P,V)}function he(P){P&&sn(P.queue)&&t.onQueueAdopt?.(P.queue)}async function ke(P,V){let de=M();if(!de||S)return null;let C=await X(P,{...V,...H(),expected_revision:de.revision});if(he(C),r!==null&&C&&C.conflict){let G=C.queue&&typeof C.queue.revision=="number"?C.queue.revision:M()?.revision??de.revision;C=await X(P,{...V,...H(),expected_revision:G}),he(C)}return C}async function ge(){c=!0,Re();try{let P=await X("get-session-defaults",{...H()});o=sn(P?.values)?{...P.values}:{},a={...o},i=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{c=!1,Re()}}async function se(){let P=Nu(o,a);if(Object.keys(P).length!==0){try{let V=await X("set-session-defaults",{values:P,...H()});o=sn(V?.values)?{...V.values}:{},a={...o},i=Array.isArray(V?.warnings)?V.warnings:[]}catch(V){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}Re()}}function Se(P,V){if(!sn(P))return;let de=P.state;d={state:de==="usable"||de==="unusable"||de==="absent"?de:"absent",values:sn(P.values)?{...P.values}:{},warnings:Array.isArray(P.warnings)?P.warnings:[]},h={...d.values},V&&(p={...h})}async function ye(){try{Se(await X("get-workspace-accounts",{...H()}),!0)}catch(P){d={state:"unusable",values:{},warnings:["kv_read_failed"]},h={},p={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}Re()}async function K(P){try{let V=await fetch(P);if(!V.ok)return null;let de=await V.json();if(!sn(de)||!Array.isArray(de.accounts))return null;let C=de.accounts.filter(G=>sn(G)&&typeof G.key=="string"&&G.key.length>0&&typeof G.email=="string"&&G.email.length>0);return{accounts:C,active:C.find(G=>G.active===!0)||null}}catch{return null}}async function ee(){E=!0;let[P,V]=await Promise.all([K("/api/claude-usage"),K("/api/codex-usage")]);S||($={claude:P,codex:V},Re())}function me(){let P={};for(let V of wb){let de=Object.hasOwn(p,V)?p[V]:null,C=Object.hasOwn(h,V)?h[V]:null;de!==C&&(P[V]=de)}return P}async function ve(){let P=me();if(Object.keys(P).length!==0){try{Se(await X("set-workspace-accounts",{values:P,...H()}),!1)}catch(V){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}Re()}}function Me(P,V){V===zt?delete p[P]:p[P]=V,Re(),y=y.then(()=>ve())}function ae(P,V){if(vb.includes(P)){ce(P,V);return}V===zt?delete a[P]:a[P]=V,Re(),se()}function He(){let P=ut().orchestration_model,V=rn({global:{orchestration_model:P??void 0},execution_defaults:Te(),runner_catalog:ne()}).orchestration_model.value;return V?An(ne(),V):null}function I(P,V){typeof V=="string"&&V.length>0?a[P]=V:delete a[P]}function ce(P,V){let de=V===zt?void 0:V,C=Du({impl_runtime:P==="impl_runtime"?de:a.impl_runtime,impl_model:P==="impl_model"?de:a.impl_model,impl_effort:P==="impl_effort"?de:a.impl_effort},ne(),He());I("impl_runtime",C.impl_runtime),I("impl_model",C.impl_model),I("impl_effort",C.impl_effort),Re(),se()}async function Le(){let P=M();if(!P)return;let V={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},de=qu(V,{...V,...B});if(Object.keys(de).length!==0){try{let C=await ke("worker-queue-set-orchestration-defaults",{values:de});if(C&&C.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}B={}}catch(C){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}Re()}}function qe(P,V){B[P]=V===zt?null:V,Re(),Le()}function Ie(P){if(N=P,!P){Re();return}let V=ne(),de=ut(),C=de.orchestration_model;C&&!vs(V,P).includes(C)&&(B.orchestration_model=null,C=null);let G=de.orchestration_effort;G&&!vi(V,P,C||pn).includes(G)&&(B.orchestration_effort=null),Re(),Le()}async function We(P){if(!(!M()||P<Xo)){try{await ke("worker-queue-set-slots",{slots:P})}catch(V){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}Re()}}async function je(P){if(!(!M()||P<Xo||P>kb)){try{await ke("worker-queue-set-serial-lane-count",{count:P})}catch(V){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}Re()}}async function Ye(P,V){let de=P==="auto_advance"?"worker-automation-toggle":P==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await ke(de,{on:V})}catch(C){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}Re()}function tt(){let P={},V=ut();for(let de of Co){let C=Wn.includes(de)?V[de]:a[de];typeof C=="string"&&C.length>0&&(P[de]=C)}return P}async function ct(){let P=be();if(!P)return;let V=tt();if(Object.keys(V).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let de=(P.presets||[]).find(G=>G.id===Y),C=le.trim()||(de?de.name:"");if(!C){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=de?await X("impl-preset-update",{expected_revision:P.revision,id:de.id,name:C,settings:V}):await X("impl-preset-create",{expected_revision:P.revision,name:C,settings:V});if(G&&G.applied){if(le="",!de&&Array.isArray(G.presets)){let pe=G.presets.find(g=>g.name===C);Y=pe?pe.id:Y}Re()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Re()}catch(G){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function _t(){let P=be();if(!(!P||Y.length===0))try{let V=await X("impl-preset-delete",{expected_revision:P.revision,id:Y});V&&V.applied?(Y="",Re()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Re())}catch(V){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}}function te(P){o=sn(P.values)?{...P.values}:{},a={...o},i=Array.isArray(P.warnings)?P.warnings:[],sn(P.queue)&&(t.onQueueAdopt?.(P.queue),B={})}async function J(){let P=be(),V=M();if(!P||!V||Y.length===0)return;let de=C=>({preset_id:Y,expected_revision:P.revision,expected_queue_revision:C,...H()});try{let C=await X("apply-impl-preset-global",de(V.revision));if(C&&C.applied&&te(C),r!==null&&C&&C.queue_applied===!1){let G=C.queue&&typeof C.queue.revision=="number"?C.queue.revision:M()?.revision??V.revision;C=await X("apply-impl-preset-global",de(G)),C&&C.applied&&te(C)}C&&C.applied?C.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):C&&C.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(C){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}Re()}async function Ce(){q=!0,D=!1,Re();try{let P=await X("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?D=!0:W=P}catch{D=!0}finally{q=!1,Re()}}function Ke(){if(U=!U,U&&!W){Ce();return}Re()}function Oe(){let P=Nr({loading:q,error:D});if(P)return P;if(!W)return"";let V=Array.isArray(W.variants)?W.variants:[];return l`<div class="settings-dialog__sp-body">
      ${W.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${W.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${V.map(de=>l`<div class="settings-dialog__sp-variant" data-variant=${de.key}>
            <div class="settings-dialog__sp-cond">${de.condition}</div>
            ${Un(de.label,de.system_prompt)}
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
        aria-expanded=${U?"true":"false"}
        @click=${Ke}
      >
        ${U?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${U?Oe():""}
    </section>`}function Be(P,V,de,C,G,pe,g){let k=G[P]??zt,O=wi(P,de,G,Te(),ne(),g),Q=O.options.find(fe=>fe.value===k),Z=k===zt?O.full_value:Q?.full_value;return l`<select
        class=${k===zt?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${V}
        title=${Z||""}
        ?disabled=${pe===!0||O.disabled}
        .value=${br(String(k))}
        @change=${fe=>C(P,String(fe.target.value))}
      >
        <option value=${zt} ?selected=${k===zt}>
          ${O.unset_label}
        </option>
        ${O.options.map(fe=>l`<option
              value=${fe.value}
              title=${fe.full_value||""}
              ?selected=${fe.value===k}
            >
              ${fe.label}
            </option>`)}
      </select>
      ${k===zt?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ge(P,V,de,C,G,pe=!1,g){return l`<div
      class=${`settings-dialog__row${pe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${V}</span>
      <span class="settings-dialog__controls">
        ${Be(P,V,de,C,G,pe,g)}
      </span>
    </div>`}function Qe(P,V){let de=V?V.active:null;return sn(de)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${P==="claude"?de.email:Br({...de,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Ze(P,V,de){let C=$[de],G=Object.hasOwn(p,P)?p[P]:zt,pe=de==="claude"?Mo:Br,g=!!C?.accounts.some(k=>k.key===G);return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${V}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${V}
          data-account-key=${P}
          @change=${k=>Me(P,String(k.target.value))}
        >
          <option value=${zt} ?selected=${G.length===0}>
            ${Qe(de,C)}
          </option>
          ${G.length>0&&!g?l`<option value=${G} selected>
                ${G} (목록에 없음)
              </option>`:""}
          ${C?.accounts.map(k=>l`<option value=${k.key} ?selected=${k.key===G}>
                ${pe(k)}
              </option>`)||""}
        </select>
        ${C?"":l`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function rt(){let P=d.warnings.join(", ");return d.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${P} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:d.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${P}`:null}function yt(P,V,de,C,G){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${V}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${Be(de,`${P} \uBAA8\uB378`,C,ae,a,!1)}
        ${Be(G,`${P} effort`,Lo,ae,a,!1)}
      </span>
    </div>`}function Et(P,V,de,C){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${V}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${C?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${C?"true":"false"}
          aria-label=${V}
          @click=${()=>Ye(P,!C)}
        >
          ${C?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${de}</span>
      </span>
    </div>`}function it(P,V,de,C){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${V}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
          <button
            type="button"
            aria-label=${`${V} \uAC10\uC18C`}
            @click=${()=>C(de-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${de}</span>
          <button
            type="button"
            aria-label=${`${V} \uC99D\uAC00`}
            @click=${()=>C(de+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ot(P){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${P.rows.length>0?`\uBCC0\uACBD ${P.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${P.rows.map(V=>l`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${V.kind}
          >
            <span class="settings-dialog__preset-diff-label">${V.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${V.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${V.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${P.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${P.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function ut(){let P=M(),V={};for(let de of Wn)V[de]=Object.prototype.hasOwnProperty.call(B,de)?B[de]:P&&typeof P[de]=="string"?P[de]:null;return V}function ze(){let P=ne(),V=a.impl_runtime,de=a.impl_model,C=be(),G=M(),pe=ut(),g=vs(P,N),k=Fr(P,void 0).filter(xe=>xe!==pn),O=vi(P,N,pe.orchestration_model||pn).filter(xe=>xe!==pn),Q=Y?(C?.presets||[]).find(xe=>xe.id===Y):null,Z=Q?Mu(tt(),sn(Q.settings)?Q.settings:{}):null,fe=G&&typeof G.slots=="number"?G.slots:Xo+1,Ee=G&&typeof G.serial_lane_count=="number"?G.serial_lane_count:Xo,$e=Te()?.supported===!0,st=rt(),dt=wi("workflow_mode",hs,a,Te(),P);return l`
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
                .value=${br(Y)}
                @change=${xe=>{Y=String(xe.target.value),Re()}}
              >
                <option value="" ?selected=${Y===""}>
                  실행 프리셋…
                </option>
                ${(C?.presets||[]).map(xe=>l`<option
                      value=${xe.id}
                      ?selected=${xe.id===Y}
                    >
                      ${xe.name}
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
                .value=${br(le)}
                @input=${xe=>{le=String(xe.target.value)}}
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
                    .value=${br(N||zt)}
                    @change=${xe=>{let bt=String(xe.target.value);Ie(bt===zt?null:bt)}}
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
              ${Ge("orchestration_model","\uBAA8\uB378",g,qe,pe)}
              ${Ge("orchestration_effort","effort",O,qe,pe)}
              ${Ge("orchestration_speed","\uC18D\uB3C4",bs,qe,pe)}
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
                      @click=${()=>ae("workflow_mode",zt)}
                    >
                      ${dt.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${hs.map(xe=>l`<button
                          type="button"
                          data-mode=${xe}
                          aria-pressed=${String(a.workflow_mode===xe)}
                          @click=${()=>ae("workflow_mode",xe)}
                        >
                          ${xe}
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
              ${yt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ys,"spec_review_effort")}
              ${yt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Oo,"plan_review_effort")}
              ${yt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ys,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ge("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ro,ae,a)}
              ${Ge("impl_model","\uBAA8\uB378",Fr(P,V),ae,a)}
              ${Ge("impl_effort","effort",jr(P,V,de),ae,a)}
              ${Ge("impl_speed","\uC18D\uB3C4",bs,ae,a)}
              ${Ge("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",k,ae,a,!1,{...a,...pe})}
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
              ${it("slots","\uB3D9\uC2DC \uC2E4\uD589",fe,xe=>We(xe))}
              ${it("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Ee,xe=>je(xe))}
            </div>
            ${we()}
          `}
    `}function Re(){S||Ve(ze(),e)}return{load(){B={};let P=[ge(),ye()];return E||P.push(ee()),Promise.all(P).then(()=>{})},render:Re,sessionDraft:()=>({...a}),destroy(){S=!0,Ve(l``,e)}}}function Jo(e){return l`<svg
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
  </svg>`}function hd(){return Jo(es`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function yd(){return Jo(es`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function vd(){return Jo(es`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function wd(){return Jo(es`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function kd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function $d(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Wt(po(t));let n={};for(let i of Nn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let d=!1;for(let p of Nn){let h=c[p];typeof h=="number"&&Number.isFinite(h)&&(n[p]+=h,r=!0,d=!0)}if(d){o+=1;let p=c.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?qn(n):null}function En(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Di(e,t){let n=En(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function $b(e,t){if(!En(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function xb(e){if(!En(e)||!En(e.execution_defaults)||!En(e.runner_catalog)||!En(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=rn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=An(e.runner_catalog,n.orchestration_model.value??""),s=hr(n,e.runner_catalog),o=tr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function xd(e,t){let n=t.notify||(K=>ie(K,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let d=null,p=null,h=null,y=new Map;function $(){let K=t.workspacesState?t.workspacesState():[];return Array.isArray(K)?K.filter(ee=>En(ee)):[]}function E(K){return $().find(ee=>ee.root_dir===K)||null}function N(K){return $b(E(K),y.get(K))}function B(){for(let K of $()){let ee=y.get(K.root_dir);ee&&typeof ee.revision=="number"&&typeof K.revision=="number"&&K.revision>=ee.revision&&y.delete(K.root_dir)}}async function Y(K,ee,me){let ve=t.transport,Me=N(ee);if(!(!ve||!En(Me))){try{let ae=await ve(K,{...me,root_dir:ee,expected_revision:Me.revision});if(En(ae?.queue)&&y.set(ee,ae.queue),ae&&ae.conflict){let He=En(ae.queue)&&typeof ae.queue.revision=="number"?ae.queue.revision:N(ee)?.revision;ae=await ve(K,{...me,root_dir:ee,expected_revision:He}),En(ae?.queue)&&y.set(ee,ae.queue)}}catch(ae){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ae instanceof Error?ae.message:String(ae)}`)}se()}}function le(K){d!==K&&(d=K,t.onFocusChange?.(d),se())}function U(K){le(d===K?null:K)}function q(K){if(p===K){W();return}D(),p=K;let ee=E(K);a.textContent=`${ee?.name||K} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,h=Qo(c,{root_dir:K,queue:()=>N(K),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:me=>{y.set(K,me),se()}}),h.load(),se()}function D(){h?.destroy(),h=null}function W(K){D(),p=null,s.hidden=!0,a.textContent="",K!==!0&&se()}let S=()=>W();i.addEventListener("click",S);function M(K){K.key==="Escape"&&d!==null&&le(null)}document.addEventListener("keydown",M);function ne(K,ee){let me=Math.max(ee,K,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ee}\uAC1C \uC911 ${K}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:me},(ve,Me)=>Me<K?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function Te(K){let ee=K.auto_advance===!0,me=K.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ee?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ee?"true":"false"}
        aria-label=${`${K.name} \uC790\uB3D9\uD654`}
        title=${ee?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ee?yd():hd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${me?" is-on":""}`}
        data-act="merge"
        aria-pressed=${me?"true":"false"}
        aria-label=${`${K.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${me?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${vd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${p===K.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${p===K.root_dir?"true":"false"}
        aria-label=${`${K.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${wd()}
      </button>`}function be(K){let ee=xb(K);return ee?l`<div class="mon2-deck__chips">
      ${ee.orchestration?l`<span class="mon2-deck__chip" title=${ee.orchestration.title}
            >오케 ${ee.orchestration.text}</span
          >`:""}
      ${ee.worker?l`<span class="mon2-deck__chip" title=${ee.worker.title}
            >워커 ${ee.worker.text}</span
          >`:""}
    </div>`:""}function H(K){let ee=[];for(let[me,ve]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Me=Di(K,me);Me>0&&ee.push(`${ve} ${Me}`)}return ee.join(" \xB7 ")}function X(K){let ee=Di(K,"running"),me=typeof K.slots=="number"?K.slots:1;return l`<div
      class=${`mon2-deck__tile${d===K.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${K.root_dir}
      aria-pressed=${d===K.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${K.root_dir}>${K.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${me}\uAC1C \uC911 ${ee}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ee}/${me}</span>
          ${ne(ee,me)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${K.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${Te(K)}</div>
        <span class="mon2-deck__counts">${H(K)}</span>
        ${be(K)}
      </div>
    </div>`}function he(K){let ee=t.doneItems?t.doneItems():[],me=t.rangeLabel?t.rangeLabel():"",ve=$d(Array.isArray(ee)?ee:[]),Me=ae=>K.reduce((He,I)=>He+Di(I,ae),0);return l`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${K.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${me}`}
        >실행 ${Me("running")} · 대기 ${Me("queue")} · PR
        ${Me("pr_wait")}${Me("session_active")>0?` \xB7 \uC138\uC158 ${Me("session_active")}`:""}
        · ${me} 완료
        ${Array.isArray(ee)?ee.length:0}</span
      >
      ${ve===null?"":l`<span class="mon2-deck__total-tokens">
            ${typeof ve=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${kd(me)}
                  >${ve}</span
                >`:ve.map(ae=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${ae.provider}
                      title=${ae.tooltip}
                      >${ae.label}</span
                    >`)}
          </span>`}
    </div>`}function ke(){let K=$();return K.length===0?"":l`${he(K)}
      <div class="mon2-deck__strip">
        ${K.map(ee=>X(ee))}
      </div>`}function ge(){d!==null&&!E(d)&&(d=null,t.onFocusChange?.(null))}function se(){B(),ge(),p!==null&&!E(p)&&W(!0),Ve(ke(),r),h?.render()}function Se(K){let ee=K.target;if(!ee||typeof ee.closest!="function")return;let me=ee.closest("[data-root-dir]");if(!me)return;let ve=me.getAttribute("data-root-dir")||"",Me=ee.closest("[data-act]")?.getAttribute("data-act");if(Me==="worker"){t.gotoWorkerTab?.(ve);return}if(Me==="auto"){Y("worker-automation-toggle",ve,{on:N(ve)?.auto_advance!==!0});return}if(Me==="merge"){Y("worker-merge-auto-toggle",ve,{on:N(ve)?.auto_merge!==!0});return}if(Me==="gear"){q(ve);return}U(ve)}function ye(K){if(K.key!=="Enter"&&K.key!==" ")return;let ee=K.target;if(!ee||typeof ee.closest!="function")return;let me=ee.closest('[data-root-dir][role="button"]');!me||me!==ee||(K.preventDefault(),U(me.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Se),r.addEventListener("keydown",ye),{render:se,focusRoot:()=>d,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",M),r.removeEventListener("click",Se),r.removeEventListener("keydown",ye),i.removeEventListener("click",S),D(),Ve(l``,r),e.replaceChildren()}}}var Ab="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Sb="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Eb="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ss="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Mi(e,t){return`${e}\0${t}`}function Tb(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Cb(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Ni(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Rb(e,t){let n=new Set;for(let[a,i]of t)for(let c of i)n.add(Mi(a,c));let r=new Map,s=new Map;for(let a of e){let i=Mi(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Mi(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Ob(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Lb(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ea(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Ad(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function ta(e){let t=Cb(e.blocked_by_map),n=[],r={refusal:null},s=i=>{let c=e.owner_of.get(i);return typeof c!="string"||c.length===0?(r.refusal=Tb(i),null):c};return{graph:t,dep_ops:n,state:r,ownerOf:s,addDep:(i,c)=>{if(r.refusal!==null||i===c)return;let d=t.get(i)||[];if(d.includes(c))return;let p=s(i);if(p!==null){if(Ni(t,c,i)){r.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${i}\uAC00 \uC774\uBBF8 ${c}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(i,[...d,c]),n.push({type:"dep-add",a:i,b:c,root_dir:p})}},removeDep:(i,c)=>{if(r.refusal!==null||i===c)return;let d=t.get(i)||[];if(!d.includes(c))return;let p=s(i);p!==null&&(t.set(i,d.filter(h=>h!==c)),n.push({type:"dep-remove",a:i,b:c,root_dir:p}))}}}function na(e,t,n,r){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Rb(e.dep_ops,t.blocked_by_map),o=s.filter(i=>i.type==="dep-remove"),a=s.filter(i=>i.type==="dep-add");return{lane_ops:n,ops:[...o,...a,...r],lane_op_index:o.length}}function Sd(e,t){for(let n=1;n<t.length;n+=1)e.addDep(t[n].bead_id,t[n-1].bead_id)}function Ed(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(ea(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function Ib(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function qi(e,t,n){let r=ta(n),s=[],o=[],a=n.owner_lane_of.get(e.bead_id),i=e.kind==="chain"?e.lane_id??a:void 0,c=i===void 0?void 0:n.cross_lanes.get(i);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Ab};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Sb};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ad(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Ss}}if(e.kind==="chain"&&c===void 0)return{refused:Ss};let d=()=>{if(c===void 0||c.status!=="confirmed")return;let y=c.entries.map(B=>B.bead_id),$=new Set(y),E=(r.graph.get(e.bead_id)||[]).filter(B=>$.has(B)),N=y.filter(B=>(r.graph.get(B)||[]).includes(e.bead_id));for(let B of E)r.removeDep(e.bead_id,B);for(let B of N)r.removeDep(B,e.bead_id);for(let B of E)for(let Y of N)r.addDep(Y,B)},p=(y,$)=>{let E=n.cross_lanes.get(y),N=E.entries.findIndex(S=>S.bead_id===e.bead_id),B=E.entries.filter(S=>S.bead_id!==e.bead_id),Y=Math.max(0,Math.min(B.length,N>=0&&$>N?$-1:$)),le=-1;if(B.forEach((S,M)=>{n.fixed_members.has(S.bead_id)&&(le=M)}),Y<=le){r.state.refusal=Eb;return}let U=N>=0?E.entries[N]:c?.entries.find(S=>S.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir},q=[...B.slice(0,Y),U,...B.slice(Y)];if(Ib(q,E.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:y,entries:q}}),E.status!=="confirmed")return;let D=Y>0?B[Y-1].bead_id:null,W=Y<B.length?B[Y].bead_id:null;if(D===null){W!==null&&r.addDep(W,e.bead_id);return}r.addDep(e.bead_id,D),W!==null&&(r.graph.get(W)||[]).includes(D)&&(r.removeDep(W,D),r.addDep(W,e.bead_id))},h=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(d(),c!==void 0&&(t.kind!=="chain"||t.lane_id!==i)&&s.push({type:"monitor-lane-update",payload:{lane_id:i,entries:c.entries.filter(y=>y.bead_id!==e.bead_id)}})),t.kind==="chain"&&p(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let y=Ob(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(ea(e.bead_id,e.root_dir,y));else if(e.kind==="parallel"){let $=n.parallel_rows,E=$[Math.max(0,Math.min($.length,t.marker_index))];if(!(!!E&&E.bead_id===e.bead_id)&&Lb(n,e.root_dir)&&h!==void 0){let B=h>y?y:y-1;B>=0&&B!==h&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:B},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let y=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&y.status==="confirmed"&&o.push(ea(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(h!==void 0&&t.index!==h){let y=h>t.index?t.index:t.index-1;y>=0&&y!==h&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:y},root_dir:e.root_dir})}}else o.push(ea(e.bead_id,e.root_dir,t.index,t.lane_id));return na(r,n,s,o)}function Td(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Ss};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=ta(t),s=[];return Sd(r,n.entries),r.state.refusal===null&&Ed(r,t,n.entries,s),na(r,t,[{type:"monitor-lane-confirm",payload:{lane_id:e}}],s)}function Cd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Ss};let r=ta(t),s=[];return Sd(r,n.entries),r.state.refusal===null&&Ed(r,t,n.entries,s),na(r,t,[],s)}function Rd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Ss};let r=ta(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return na(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[])}function Fi(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ad(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Pb="\uC0AC\uC774\uD074";function Od(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=Ni(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:Pb}:{}})}return o.sort((a,i)=>{let c=r!==void 0&&a.root_dir===r,d=r!==void 0&&i.root_dir===r;return c!==d?c?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function Ld(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var Id={running:3,paused:2,failed:1};function Wr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Pd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Dd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Wr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Wr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let p=t.get(a.bead_id),h=typeof p=="number"&&p>0&&typeof a.finished_at=="number"&&p>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let p=Id[d.run_state],h=Id[i];if(p>h||p===h&&(d.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:r}}function ra(e){return e.replace(/\/+$/,"")}function Db(e,t){let n=ra(e),r=ra(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function sa(e,t){let n=new Set;for(let r of e)for(let s of t){if(!Db(r,s))continue;let o=ra(r),a=ra(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var Md=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Es=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function oa(e,t){let n=Md.find(s=>s.step===e);if(!n)return null;let r=Md.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Nd(e){let t=Es.findIndex(n=>n.step===e);return Es.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function yr(e){let t=Es.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Mb(e){let t=Es.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Es.length}}function aa(e){let t=Mb(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Bi=new Set(["queued","running","retry_pending","repairing"]),qd=new Set(["failed","succeeded"]),Nb={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Ts={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},qb={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ts.base_containment,child_sweep:Ts.child_sweep,branch_cleanup:Ts.branch_cleanup,parent_close:Ts.parent_close};function Fb(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function jb(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Bi,...qd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Bb(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=d=>d.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function ji(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Nb[s];if(!o)return null;let a=oa(n,`${r} ${o}`);return a?{...a,active:Bi.has(s),failed:s==="failed"}:null}function Ub(e){return!e||typeof e!="object"?null:qb[e.step]||null}function Cs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Ub(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=Fb(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(E=>E&&typeof E=="object"&&jb(E,t,i)).sort(Bb):[],d=a?c:[],p=d.find(E=>Bi.has(E.state));if(p)return ji(p);if(s)return s.step==="repo_operations"&&c[0]?ji(c[0],!0):null;let h=d.find(E=>qd.has(E.state)?E.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(h)return ji(h);if(r){let E=oa(r.step,r.label);return E?{...E,active:!0,failed:!1}:null}let y=typeof e.cleanup_cursor=="string"?Ts[e.cleanup_cursor]:null;if(!y)return null;let $=oa(y.step,y.label);return $?{...$,active:!0,failed:!1}:null}function ia(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function Ui(e,t){return`${e}\0${t}`}function Fd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Wi(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Wb(e,t){return e==="internal"&&t===void 0}function la(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function jd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${la(s)})`,location_label:la(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Wi(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:Wb(a,s)}}function Bd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=Ui(i.root_dir,c.id);n.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(d,[]);for(let p of Array.isArray(c.items)?c.items:[])r.set(p.id,d)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=Ui(i.root_dir,c.id),p=Array.isArray(c.items)?c.items[0]:null,y=!!p&&p.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],$=s.get(d);if($)for(let E of y){let N=r.get(E);N&&N!==d&&!$.includes(N)&&$.push(N)}}let o=(i,c)=>{let d=new Set,p=[i];for(;p.length>0;){let h=p.pop();if(h===c)return!0;!h||d.has(h)||(d.add(h),p.push(...s.get(h)||[]))}return!1},a=new Map;for(let[i,c]of s){let d=[];for(let p of c){let h=n.get(p);o(p,i)&&h&&d.push(h)}d.length>0&&a.set(i,d)}return a}function Ud(e,t){return Ui(e,t)}var Wd=1,Rs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Hi=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],zr={show_blocked:!0,spec:"all"},zd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function zb(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Wr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Hb(e,t){let{winners:n,resumed_from_ids:r}=Dd(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,c=a.run_state,d=a.started_at,p=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:d,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:bn(e,i.bead_id),can_pause:c==="running"&&p,can_resume:c!=="running"&&p&&!r.has(i.attempt_id)})}return s}function Hd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function xt(e){return e&&typeof e=="object"?e:{}}function Gb(e,t,n){let r=xt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=y=>rn({pin:y,global:a,execution_defaults:s,runner_catalog:o,route:n}),c,d;try{c=i(r),d=i(null)}catch{return null}let p=Gd(hr(c,o),hr(d,o)),h=Gd(tr(c,null),tr(d,null));return p||h?{orchestration:p,worker:h}:null}function Gd(e,t){return!e||t&&t.text===e.text?null:e}function Vb(e){return{id:e.id,label:`\u26D3 blocked: ${e.id}`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${e.location_label})`}}function Kb(e,t){let n=Wi(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Vd(e,t,n){let r=t.get(e);if(!r)return Kb(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return la(r)}function Yb(e,t,n,r,s,o){let a=[];return e.forEach((i,c)=>{let d=typeof i.id=="string"?i.id:"";if(d.length===0)return;let p=i.status==="confirmed"?"confirmed":"draft",h=Array.isArray(i.entries)?i.entries:[],y=[];h.forEach(($,E)=>{let N=$&&typeof $.bead_id=="string"?$.bead_id:"";if(N.length===0)return;let B=$&&typeof $.root_dir=="string"?$.root_dir:"",Y=n.get(N),le=Y?Y.state:void 0,U=le==="running"||le==="pr_wait"||le==="done",q=!Y||le==="runnable",D=Y&&Y.lane==="parallel"&&typeof Y.position=="number"?Y.position-1:null,W=y.length>0?y[y.length-1].id:null,S=p==="confirmed"&&W!==null&&!(t.get(N)||[]).includes(W);y.push({id:N,title:s.get(N)||N,root_dir:Y?Y.root_dir:B,workspace_name:Y?Y.workspace_name:o.get(B)||"",seq:E+1,location_label:Vd(N,n,r),draggable:!U,fixed:U,done:le==="done",unplaced:q,mismatch:S,...D!==null?{queue_index:D}:{}})}),y.forEach(($,E)=>{$.seq=E+1}),a.push({lane_id:d,status:p,draft:p==="draft",number:c+1,label:`\uC5F0\uACB0 ${c+1} \xB7 \uB808\uD3EC \uAC04`,rows:y,all_done:y.length>0&&y.every($=>$.done),can_confirm:p==="draft"&&y.length>=2,has_mismatch:p==="confirmed"&&y.some($=>$.mismatch||$.unplaced)})}),a}function Zb(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Xb(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:c,state:d}=Zb(i,t,n);if(d!==void 0&&(i.scope_state=d),c.length===0)continue;let p=o.get(i.root_dir);p?p.push({item:i,scope:c}):o.set(i.root_dir,[{item:i,scope:c}])}let a=(i,c,d)=>{let p={id:c.id,title:c.title,location_label:Vd(c.id,r,s),prefixes:d};i.overlap_chips?i.overlap_chips.push(p):i.overlap_chips=[p]};for(let i of o.values())for(let c=0;c<i.length;c+=1)for(let d=c+1;d<i.length;d+=1){let p=sa(i[c].scope,i[d].scope);p.length!==0&&(a(i[c].item,i[d].item,p),a(i[d].item,i[c].item,p))}}function zi(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ca(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Gi(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...zr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,c=n&&Rs.some(I=>I.value===n.candidate_sort)?n.candidate_sort:"repo_spec",d=new Map;for(let I of s)I&&typeof I.root_dir=="string"&&d.set(I.root_dir,I);let p=new Map;for(let I of s)I&&typeof I.root_dir=="string"&&p.set(I.root_dir,I.name||I.root_dir);for(let I of r)I&&typeof I.root_dir=="string"&&p.set(I.root_dir,I.name||I.root_dir);let h=[],y=[],$=[],E=[],N=[],B=[],Y=new Map,le=new Map,U=new Map,q=new Map,D=new Map,W=new Map,S=new Map,M=new Map;for(let I of r){if(!I||typeof I.root_dir!="string")continue;let ce=I.root_dir,Le=I.name||ce,qe=d.get(ce),Ie=qe&&typeof qe.revision=="number"?qe.revision:typeof I.revision=="number"?I.revision:0,We=xt(I.attempts),je=xt(I.bead_titles);for(let[g,k]of Object.entries(je))typeof k=="string"&&k.length>0&&M.set(g,k);let Ye=xt(I.bead_times),tt=xt(I.pr_observations),ct=xt(I.admission),_t=xt(I.revise_parked),te=xt(I.merge_queue_state),J=xt(I.cleanup_failed),Ce=xt(I.discard_operations),Ke=xt(I.bead_blocked_by);Object.hasOwn(I,"bead_scope")&&W.set(ce,xt(I.bead_scope));let Oe=xt(I.bead_workflow),we=xt(I.pr_activity),Be=Array.isArray(I.repo_operations)?I.repo_operations:[],Ge=Array.isArray(I.merge_queue)?I.merge_queue:[],Qe=new Set(Ge.filter(g=>g&&typeof g.bead_id=="string").map(g=>g.bead_id)),Ze=new Map(Ge.filter(g=>g&&typeof g.bead_id=="string").map(g=>[g.bead_id,g])),rt=Array.isArray(I.queue)?I.queue:[],yt=(Array.isArray(I.serial_lanes)?I.serial_lanes:[]).filter(g=>g&&/^s[1-5]$/.test(g.id)&&Array.isArray(g.entries)),Et=xt(I.lane_states),it=typeof I.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(I.serial_lane_count))):Math.min(5,yt.length);U.set(ce,it),q.set(ce,rt.length);let Ot=new Map(yt.map(g=>[g.id,g])),ut=new Map;for(let g of yt)for(let k of g.entries)k&&typeof k.bead_id=="string"&&ut.set(k.bead_id,g.id);for(let[g,k]of Object.entries(Ke))Array.isArray(k)&&D.set(g,k.filter(O=>typeof O=="string"&&O.length>0));let ze=Array.isArray(I.done)?I.done:[];for(let g of ze)g&&typeof g.bead_id=="string"&&B.push({id:g.bead_id,root_dir:ce,workspace_name:Le});let Re=new Map;for(let g of ze)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&Re.set(g.bead_id,g.added_at);let P=g=>({id:g,title:je[g]||g,root_dir:ce,workspace_name:Le,expected_revision:Ie,draggable:!1,...xt(Ye[g]).created_at?{created_at:xt(Ye[g]).created_at}:{},...xt(Ye[g]).updated_at?{updated_at:xt(Ye[g]).updated_at}:{}}),V=new Set;for(let[g,k]of Hb(We,Re))V.add(g),y.push({...P(g),lane:"running",...ut.has(g)?{serial_lane_id:ut.get(g)}:{},attempt_id:k.attempt_id,run_state:k.run_state,status:k.status||void 0,workflow:Oe[g]||null,can_pause:k.can_pause,can_resume:k.can_resume,started_at:k.started_at,last_event_at:k.last_event_at,last_activity:k.last_activity,legs:k.legs,runner:k.runner,model:k.model,effort:k.effort,speed:k.speed,resumed_from:k.resumed_from,continuation_mode:k.continuation_mode,usage:k.usage,exec_chips:{orchestration:As(k),worker:null},discard:Sn(Ce,g,{attempt_id:k.attempt_id}),badges:k.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:k.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:k.run_state==="failed"});for(let[g,k]of Pd(We)){if(y.some(Z=>Z.id===g))continue;let O=k.attempt,Q=k.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";y.push({...P(g),lane:"running",kind:"session",attempt_id:typeof O.attempt_id=="string"?O.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:Oe[g]||null,can_pause:!1,can_resume:!1,started_at:k.started_at,last_event_at:typeof O.last_event_at=="number"?O.last_event_at:null,last_activity:O.last_activity&&typeof O.last_activity=="object"?O.last_activity:null,legs:Array.isArray(O.legs)?O.legs:[],runner:typeof O.runner=="string"?O.runner:null,model:typeof O.model=="string"?O.model:null,effort:typeof O.effort=="string"?O.effort:null,speed:typeof O.speed=="string"?O.speed:null,resumed_from:null,continuation_mode:null,usage:O.usage&&typeof O.usage=="object"?O.usage:null,exec_chips:{orchestration:As(O),worker:null},discard:Sn(Ce,g,{merge_queued:!0}),badges:[k.origin==="auto"?`${Q} \xB7 \uC790\uB3D9`:Q],alert:!1})}for(let g of Array.isArray(I.session_active)?I.session_active:[]){let k=g&&g.bead_id;typeof k!="string"||V.has(k)||(V.add(k),Array.isArray(g.blocked_by)&&g.blocked_by.length>0&&D.set(k,g.blocked_by.filter(O=>typeof O=="string"&&O.length>0)),typeof g.title=="string"&&g.title.length>0&&M.set(k,g.title),y.push({...P(k),title:g.title||je[k]||k,lane:"running",kind:"session",status:"in_progress",started_at:zi(g.started_at)??zi(g.updated_at)??void 0,updated_at:zi(g.updated_at)??void 0,workflow:g.workflow||null,labels:Array.isArray(g.labels)?g.labels:[],spec_id:typeof g.spec_id=="string"?g.spec_id:"",blocked:g.blocked===!0,...Array.isArray(g.blocked_by)?{blocked_by:g.blocked_by.filter(O=>typeof O=="string"&&O.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let g of Array.isArray(I.pr_wait)?I.pr_wait:[]){let k=g&&g.bead_id;if(typeof k!="string"||V.has(k))continue;V.add(k);let O=xt(tt[k]),Q=xt(O.pr),Z=O.gate?xt(O.gate):null,fe=Qe.has(k),Ee=Ze.get(k)?.continuation_action||null,$e=!!Ee&&Ee.continuation===null,st=te.active===k,dt=g.external===!0,xe=J[k]||null,bt=xt(we[k]),gt=Cs({bead_id:k,merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,merge_progress:bt.merge_progress||null,cleanup_failed:xe,repo_operations:Be}),qt=ia(gt),Gt=!!Z&&Z.base_badge==="\uCDA9\uB3CC",Mt=!!xe&&["child_sweep","branch_cleanup","parent_close"].includes(xe.step)&&!!Z&&Z.tier==="merged",Pt=dt&&!!xe&&!!Z&&Z.tier==="merged",fn=!!Z&&["closed_unmerged","review","undecidable"].includes(Z.tier),At=Sn(Ce,k,{external:dt,merge_active:st||gt?.step==="merge",merge_queued:fe,cleanup_active:qt,merged:!!xe||Z?.tier==="merged"}),Dt=!!At.operation;$.push({...P(k),lane:"pr_wait",workflow:Oe[k]||null,pr_number:typeof Q.number=="number"?Q.number:null,pr_url:typeof Q.url=="string"?Q.url:void 0,external:dt,usage:bn(We,k),merge_step:gt,badges:$e?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:gt?[Z?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:xe?[yr(xe.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${yr(xe.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof Z?.gate_badge=="string"&&Z.gate_badge.length>0?[Z.gate_badge]:[],alert:gt?gt.failed===!0:!!xe||fn,reason:xe&&gt?.active!==!0?aa(xe.step):"PR \uB300\uAE30",merge_action:Z?.tier==="merged"&&!Mt&&!Pt?!1:!fe||$e,merge_enabled:!Dt&&($e||Z?.enabled===!0||Gt||Mt||Pt),merge_label:$e?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Pt||Mt?"\uC815\uB9AC \uC7AC\uAC1C":Gt&&!Mt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:$e?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Dt?At.error?`\uD3D0\uAE30 \uC2E4\uD328: ${At.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${At.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Pt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Mt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Gt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Z?.enabled===!0?`\uBA38\uC9C0 (${Z.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${Z?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:fe&&!$e,cancel_enabled:!st,continuation_mismatch:Ee?.mismatch||null,discard:At,discard_action:At.action,discard_enabled:At.enabled,discard_title:At.title})}let de=(g,k,O,Q)=>{let Z=g&&g.bead_id;if(typeof Z!="string"||V.has(Z))return null;V.add(Z);let fe=_t[Z],Ee=Sn(Ce,Z),$e=Ee.operation?Ee:null,st={...P(Z),lane:k,workflow:Oe[Z]||null,draggable:!$e,discard:$e||void 0,reason:Hd(ct,Z),seq:O+1,queue_position:O+1,queue_index:O,queue_length:Q,badges:fe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!fe,revise_action:!!fe,revise_enabled:!!fe&&!$e,revise_title:fe?fe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${fe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Ke,Z)&&(st.blocked_by=Array.isArray(Ke[Z])?Ke[Z].filter(dt=>typeof dt=="string"&&dt.length>0):[]),st};for(let g=0;g<rt.length;g++){let k=de(rt[g],"queue",g,rt.length);if(!k)continue;E.push(k);let O=Y.get(ce);O?O.push(k):Y.set(ce,[k])}let C=g=>{let k=$.find(Z=>Z.id===g&&Z.root_dir===ce);if(k)return{id:g,title:k.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let O=y.find(Z=>Z.id===g&&Z.root_dir===ce),Q=O&&O.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":O&&O.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:g,title:O?O.title:P(g).title,badge:Q}},G=[];for(let g=0;g<Math.max(it,yt.length);g++){let k=`s${g+1}`,O=Ot.get(k),Q=O&&Array.isArray(O.entries)?O.entries:[],Z=[];for(let $e=0;$e<Q.length;$e++){let st=de(Q[$e],k,$e,Q.length);st&&(Z.push(st),E.push(st))}let fe=xt(Et[k]),Ee=Array.isArray(fe.occupied_by)?fe.occupied_by.filter($e=>typeof $e=="string"):[];Z.length===0&&Ee.length===0&&(it<=1||g>=it)||G.push({id:k,index:g,items:Z,raw_length:Q.length,occupied_by:Ee,occupants:Ee.map($e=>C($e)),corrections:Array.isArray(fe.corrections)?fe.corrections.length:0,cycle:fe.cycle===!0,...Z.length===0&&Ee.length===0?{empty:!0}:{}})}le.set(ce,G);let pe=Array.from({length:it},(g,k)=>{let O=`s${k+1}`,Q=Ot.get(O),Z=Q&&Array.isArray(Q.entries)?Q.entries:[],fe=xt(Et[O]);return{id:O,index:Z.length,length:Z.length,occupied_by:Array.isArray(fe.occupied_by)?fe.occupied_by.filter(Ee=>typeof Ee=="string"):[]}});for(let g of Array.isArray(I.runnable)?I.runnable:[]){let k=g&&g.bead_id;if(typeof k!="string"||V.has(k))continue;V.add(k);let O=g.workflow&&typeof g.workflow=="object"?g.workflow:null,Q=O&&typeof O.route=="string"&&O.route||(typeof g.route=="string"?g.route:null),Z=Gb(xt(qe),g.exec_pins,Q);Array.isArray(g.blocked_by)&&g.blocked_by.length>0&&D.set(k,g.blocked_by.filter(fe=>typeof fe=="string"&&fe.length>0)),typeof g.title=="string"&&g.title.length>0&&M.set(k,g.title),Array.isArray(g.scope)&&S.set(k,g.scope.filter(fe=>typeof fe=="string"&&fe.length>0)),h.push({...P(k),title:g.title||je[k]||k,lane:"runnable",draggable:!0,reason:Hd(ct,k),created_at:g.created_at??void 0,updated_at:g.updated_at??void 0,status:typeof g.status=="string"?g.status:void 0,labels:Array.isArray(g.labels)?g.labels:[],spec_id:typeof g.spec_id=="string"?g.spec_id:"",workflow:O||(Q?{route:Q,chips:{route:Q}}:null),...Z?{exec_chips:Z}:{},blocked:g.blocked===!0,...Array.isArray(g.blocked_by)?{blocked_by:g.blocked_by.filter(fe=>typeof fe=="string"&&fe.length>0)}:{},place_index:rt.length,place_lanes:pe})}for(let g of ze){let k=g&&g.bead_id;if(typeof k!="string"||V.has(k)||(V.add(k),o!==void 0&&typeof g.added_at=="number"&&g.added_at<o))continue;let O=zb(We,k),Q=O&&typeof O.done_kind=="string"?O.done_kind:null;N.push({...P(k),lane:"done",done:!0,done_layout:"three_line",usage:bn(We,k),work_ms:Wo(We,k),done_at:typeof g.added_at=="number"?g.added_at:void 0,done_kind:Q,badges:[...Q&&zd[Q]?[zd[Q]]:[],...Uo(We,k)]})}}let ne=new Map;s.forEach((I,ce)=>{I&&typeof I.root_dir=="string"&&ne.set(I.root_dir,ce)});let Te=n&&n.running_sort==="repo"?"repo":"started";y.sort((I,ce)=>{let Le=I.kind==="session",qe=ce.kind==="session";if(Le!==qe)return Le?1:-1;if(Le&&qe){let je=ca(ce.updated_at)-ca(I.updated_at);return je!==0?je:I.id.localeCompare(ce.id)}if(Te==="repo"){let je=ne.get(I.root_dir)??Number.MAX_SAFE_INTEGER,Ye=ne.get(ce.root_dir)??Number.MAX_SAFE_INTEGER;if(je!==Ye)return je-Ye}let Ie=typeof I.started_at=="number"&&Number.isFinite(I.started_at)?I.started_at:null,We=typeof ce.started_at=="number"&&Number.isFinite(ce.started_at)?ce.started_at:null;return Ie!==null&&We!==null&&Ie!==We?Ie-We:Ie===null&&We!==null?1:Ie!==null&&We===null?-1:I.id.localeCompare(ce.id)}),N.sort((I,ce)=>(ce.done_at??0)-(I.done_at??0));let be=s.length>0?s:r.map(I=>({root_dir:I&&I.root_dir,name:I&&I.name,auto_advance:I&&I.auto_advance,auto_merge:I&&I.auto_merge,slots:I&&I.slots,revision:I&&I.revision,runner_catalog:I&&I.runner_catalog})),H=new Set(h.map(I=>I.root_dir)),X=[];for(let I of be){if(!I||typeof I.root_dir!="string")continue;let ce=Y.get(I.root_dir)||[],Le=le.get(I.root_dir)||[];!(ce.length>0||Le.some(Ie=>Ie.items.length>0||Ie.occupied_by.length>0))&&!H.has(I.root_dir)||X.push({root_dir:I.root_dir,name:I.name||I.root_dir,auto_advance:I.auto_advance===!0,auto_merge:I.auto_merge===!0,slots:typeof I.slots=="number"&&I.slots>=Wd?I.slots:Wd,revision:typeof I.revision=="number"?I.revision:0,runner_catalog:xt(I.runner_catalog),items:ce,sublanes:{parallel:ce,serial:Le},serial_lane_count:U.get(I.root_dir)||0,raw_queue_length:q.get(I.root_dir)||0})}let he={runnable:h,runnable_all:h,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:c==="updated_flat",queue:E,queue_groups:X,running:y,pr_wait:$,done:N,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(q),owner_of:{}},ke=Fd(he);for(let I of B)ke.has(I.id)||ke.set(I.id,{root_dir:I.root_dir,workspace_name:I.workspace_name,lane:"done",state:"done"});for(let I of[...he.queue,...he.runnable]){if(!Object.hasOwn(I,"blocked_by"))continue;let ce=ke.get(I.id);I.blockers=(I.blocked_by||[]).map(Le=>jd(Le,ce,ke,s)),I.blocker_warnings=I.blockers.filter(Le=>Le.missing_internal).map(Le=>`\u26A0 \uC120\uD589 ${Le.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),I.blocker_warnings.length>0&&(I.alert=!0)}for(let I of[...he.queue,...he.runnable,...he.running,...he.pr_wait]){let ce=I.lane==="running"||I.lane==="pr_wait"?[]:(I.blockers||[]).map(Vb),Le=I.lane==="running"||I.lane==="pr_wait"?[]:I.blocker_warnings||[];if(ce.length===0&&Le.length===0)continue;let qe={predecessors:ce,warnings:Le};I.dependency_chips=qe}Xb(he,W,S,ke,s);let ge=Bd(he.queue_groups);for(let I of he.queue_groups)for(let ce of I.sublanes.serial){let Le=ge.get(Ud(I.root_dir,ce.id));Le&&(ce.cross_wait_peers=Le)}he.chain_lanes=Yb(i&&Array.isArray(i.lanes)?i.lanes:[],D,ke,s,M,p);let se=new Map;for(let I of[...he.queue,...he.runnable])se.has(I.id)||se.set(I.id,I);let Se=new Set;for(let I of he.chain_lanes)for(let ce of I.rows){if(I.status==="confirmed"&&!ce.unplaced&&!ce.fixed&&Se.add(ce.id),!I.draft&&!ce.unplaced)continue;let Le=se.get(ce.id);Le&&(Le.cross_lane_chip={lane_id:I.lane_id,number:I.number,status:I.status,label:I.draft?`\uC5F0\uACB0 ${I.number} (draft)`:`\uC5F0\uACB0 ${I.number}`})}let ye=[];for(let I of Y.values())for(let ce of I)Se.has(ce.id)||ye.push(ce);ye.sort((I,ce)=>{let Le=I.workspace_name.localeCompare(ce.workspace_name);return Le!==0?Le:(I.queue_index??0)-(ce.queue_index??0)}),he.parallel_rows=ye;let K={};for(let[I,ce]of ke)typeof ce.root_dir=="string"&&ce.root_dir.length>0&&(K[I]=ce.root_dir);for(let I of he.chain_lanes)for(let ce of I.rows)!Object.hasOwn(K,ce.id)&&ce.root_dir.length>0&&p.has(ce.root_dir)&&(K[ce.id]=ce.root_dir);he.owner_of=K;let ee=he.runnable.length;he.runnable_all=he.runnable.slice();let me=he.runnable;a.show_blocked||(me=me.filter(I=>I.blocked!==!0));let ve=me.length;a.spec==="with"?me=me.filter(I=>!!I.spec_id):a.spec==="without"&&(me=me.filter(I=>!I.spec_id)),he.runnable_hidden={blocked:ee-ve,spec:ve-me.length};let Me=(I,ce)=>{let Le=ca(ce.updated_at)-ca(I.updated_at);return Le!==0?Le:I.id.localeCompare(ce.id)},He=c==="repo_spec"?(I,ce)=>{let Le=I.spec_id?0:1,qe=ce.spec_id?0:1;return Le!==qe?Le-qe:Me(I,ce)}:Me;if(c==="updated_flat")he.runnable=me.slice().sort(Me),he.runnable_sections=[];else{let I=new Map;for(let qe of me){let Ie=I.get(qe.root_dir);Ie?Ie.push(qe):I.set(qe.root_dir,[qe])}let ce=[],Le=[];for(let qe of be){if(!qe||typeof qe.root_dir!="string")continue;let Ie=(I.get(qe.root_dir)||[]).slice().sort(He);I.delete(qe.root_dir),Ie.length!==0&&(ce.push({root_dir:qe.root_dir,name:qe.name||qe.root_dir,items:Ie.map(We=>({...We,workspace_name:""}))}),Le.push(...Ie))}for(let[qe,Ie]of I){let We=Ie.slice().sort(He);ce.push({root_dir:qe,name:We[0]?.workspace_name||qe,items:We.map(je=>({...je,workspace_name:""}))}),Le.push(...We)}he.runnable=Le,he.runnable_sections=ce}return he}var Kd="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Yd(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Zd(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var ep="bdui.monitor.done-range",tp="bdui.monitor.running_sort",np="bdui.monitor.candidate_sort",rp="beads-ui.monitor.candidate-filter",sp="beads-ui.monitor.sections";function Qb(){try{let e=window.localStorage.getItem(rp);if(!e)return{...zr};let t=JSON.parse(e);return!t||typeof t!="object"?{...zr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:zr.show_blocked,spec:Hi.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...zr}}}function Xd(e){try{window.localStorage.setItem(rp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Jb(){try{let e=window.localStorage.getItem(np);return Rs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function eh(e){try{window.localStorage.setItem(np,e)}catch{}}function th(){try{let e=window.localStorage.getItem(sp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Qd(e){try{window.localStorage.setItem(sp,JSON.stringify(e))}catch{}}function nh(){try{let e=window.localStorage.getItem(ep);return gn(e)?e:ln}catch{return ln}}function rh(e){try{window.localStorage.setItem(ep,e)}catch{}}function sh(){try{return window.localStorage.getItem(tp)==="repo"?"repo":"started"}catch{return"started"}}function oh(e){try{window.localStorage.setItem(tp,e)}catch{}}var op="tab:monitor:pipeline",ah=1e3,ih=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Jd="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function lh(e){return e>=1&&e<=Jd.length?Jd[e-1]:`(${e})`}function ap(e,t){let n=St("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,c=t.switchWorkspace,d=t.router,p=t.now||(()=>Date.now()),h=t.confirm||(u=>typeof globalThis.confirm!="function"||globalThis.confirm(u)),y=nh(),$=sh(),E=Qb(),N=Jb(),B=th(),Y=null,le=null,U=null,q=null,D=[],W=null;function S(){let u=Vn.find(f=>f.value===y);return u?u.label:""}let M=document.createElement("div");M.className="mon",e.appendChild(M);let ne=document.createElement("div");ne.className="worker-drawer-overlay",ne.hidden=!0;let Te=document.createElement("div");Te.className="worker-drawer-overlay__backdrop";let be=document.createElement("div");be.className="worker-drawer-host mon2-drawer",ne.append(Te,be),e.appendChild(ne);let H=Gi(null,null),X=new Map,he=new Map,ke=null,ge=null,se=null,Se=qr(be,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Y=null,ne.hidden=!0,pe()}});async function ye(u,f,v,x,j=!0){if(!o||!v)return null;let z=await o(u,{...f,root_dir:v,expected_revision:x});if(z&&z.conflict&&j){z.queue&&he.set(v,z.queue);let re=z.queue&&typeof z.queue.revision=="number"?z.queue.revision:x;z=await o(u,{...f,root_dir:v,expected_revision:re})}return z&&z.queue&&v&&he.set(v,z.queue),z}function K(u,f){let v=he.get(u),x=s&&s.get?s.get():null,j=(Array.isArray(x)?x:[]).find(re=>re?.root_dir===u);return(v||j)?.merge_queue?.find(re=>re.bead_id===f)?.continuation_action}async function ee(u,f,v,x){let j=await ye(u,f,v,x),z=he.get(v)?.revision??j?.queue?.revision??x;return Mn(j,(re,_e)=>ye(u,{...f,continuation:re,decision_token:_e},v,z,!1),{refresh:re=>ye(u,f,v,re?.queue?.revision??he.get(v)?.revision??z,!1)})}async function me(u,f,v,x){let j=await Mn({continuation_mismatch:x},(re,_e)=>ye("worker-merge-queue-add",{bead_id:f,continuation:re,decision_token:_e},u,v,!1)),z=j?.queue?.merge_queue?.find(re=>re.bead_id===f)?.continuation_action;j?.applied!==!0&&z?.continuation===null&&z.mismatch&&await me(u,f,j.queue.revision,z.mismatch)}async function ve(u,f,v){let x=await ye("worker-discard",u,f,v);if(x&&x.discarded===!0){ie(Ho(x),"success",5e3);return}if(x&&x.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${x.reason}`,"error");return}if(x&&x.accepted&&x.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(x&&x.accepted){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${x.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}x&&!x.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Me(u,f,v){return!o||!v?null:await o(u,{...f,root_dir:v})}async function ae(){let u=new Map;for(let f of H.pr_wait)u.has(f.root_dir)||u.set(f.root_dir,f.expected_revision);for(let[f,v]of u)await ye("worker-merge-queue-add-all",{},f,v)}function He(u){let f=B[u];return!!(f&&f.runnable===!0)}function I(u){let f={...B[u]||{}};f.runnable=!f.runnable,B={...B,[u]:f},Qd(B),pe()}function ce(u){return B[u]===!0}function Le(u){B={...B,[u]:B[u]!==!0},Qd(B),pe()}function qe(u){let f=H.queue_groups.find(v=>v.root_dir===u);if(!f)return null;for(let v=0;v<f.serial_lane_count;v+=1){let x=`s${v+1}`,j=f.sublanes.serial.find(z=>z.id===x);if(!j||j.raw_length===0&&j.occupied_by.length===0)return x}return null}function Ie(u,f){let v=H.queue_groups.find(j=>j.root_dir===u),x=v?v.sublanes.serial.find(j=>j.id===f):void 0;return x?x.raw_length:0}function We(u,f){let v=X.get(u),x=X.get(f);if(!v||!x)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let j=Yd(v),z=Yd(x);if(j!==null&&j===z&&v.root_dir===x.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let re=Zd(v),_e=Zd(x);if(re&&z!==null){let Je=z;return{kind:"ops",title:`${Je} \uB05D\uC5D0 ${u}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:x.root_dir,ops:[{bead_id:u,lane:Je,index:Ie(x.root_dir,Je)}]}}if(j!==null&&_e&&z===null){let Je=j;return{kind:"ops",title:`${Je} \uB05D\uC5D0 ${f}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:f,lane:Je,index:Ie(v.root_dir,Je)}]}}if(re&&j===null&&_e&&z===null){let Je=qe(v.root_dir);return Je===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Je} \uB808\uC778\uC5D0 ${f} \u2192 ${u} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:f,lane:Je,index:0},{bead_id:u,lane:Je,index:1}]}}return!re&&!_e?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:re?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function je(u,f){let v=We(u,f.id);return{id:f.id,title:f.title,location_label:f.location_label,prefixes:f.prefixes,action:v.kind==="note"?{kind:"note",text:v.text}:v.kind==="disabled"?{kind:"disabled",label:Kd,title:v.title}:{kind:"place",label:Kd,title:v.title}}}function Ye(u,f){if(!U||U.bead_id!==u)return null;let v=U.counterpart_id,x=f.filter(j=>j.id===v);return x.length===0?null:{rows:x.map(j=>je(u,j))}}function tt(u){let f=u.dependency_chips||null,v=u.overlap_chips||[],x=u.scope_state==="missing",j=u.cross_lane_chip;if(!f&&v.length===0&&!x&&!j)return null;let z=Ye(u.id,v);return{...f||{},...v.length>0?{overlaps:v}:{},...x?{scope_missing:!0}:{},...j?{cross_lane:{lane_id:j.lane_id,label:j.label}}:{},...z?{popover:z}:{}}}function ct(u){let f=tt(u);return f?{...u,dependency_chips:f}:u}async function _t(u,f){let v=We(u,f);if(U=null,v.kind!=="ops"){pe();return}let x=Gt(v.root_dir,v.ops[0].bead_id);for(let j of v.ops){let z=await te(j,v.root_dir,x);if(z===null)break;x=z}pe()}async function te(u,f,v){try{let x=await ye("worker-queue-place",u,f,v,!1);if(x&&x.conflict)return ie("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!x||x.applied!==!0)return ie(x&&typeof x.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${x.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let j=x.queue?x.queue.revision:void 0;return typeof j!="number"?(ie("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):j}catch(x){return ie($e(x),"error"),null}}function J(u){let f=He(u.root_dir);return l`<header class="mon2-sec__hd">
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
    </div>`}function Ke(u){if(le!==u.id)return null;let f=H.queue_groups.find(z=>z.root_dir===u.root_dir),v=u.place_lanes||[],x=H.cross_lanes_revision!==null,j=[{id:"parallel",label:"\uBCD1\uB82C",count:u.place_index??0}];for(let z of H.chain_lanes)j.push({id:`lane:${z.lane_id}`,label:`\uC5F0\uACB0 ${z.number} (${z.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:z.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!x});j.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!x,title:x?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let z of v)j.push({id:`serial:${z.id}`,label:`\uC9C1\uB82C ${Number(z.id.slice(1))}`,count:z.length,group:`${f?f.name:""} \uC9C1\uB82C`});return{bead_id:u.id,lanes:j}}function Oe(){let u=[],f=new Set,v=(x,j)=>{for(let z of x)f.has(z.id)||(f.add(z.id),u.push({bead_id:z.id,root_dir:z.root_dir,workspace_name:z.workspace_name,title:z.title,lane:j}))};return v(H.running,"running"),v(H.pr_wait,"pr_wait"),v(H.queue,"queue"),v(H.runnable_all,"runnable"),u}function we(u){if(!q||q.bead_id!==u)return"";let f=bt(),v=Oe(),x=new Map;for(let _e of v)x.set(_e.bead_id,_e);let j=(f.get(u)||[]).filter(_e=>x.has(_e)),z=Ld(Od(u,{issues:v,blocked_by_map:f}),q.query),re=H.owner_of[u];return l`<div
      class="mon-deppanel"
      data-bead-id=${u}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${j.length===0?l`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${j.map(_e=>l`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${_e}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${u}
                data-dep-b=${_e}
                aria-label=${`${_e} \uC5F0\uACB0 \uD574\uC81C`}
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
        ${z.length===0?l`<div class="mon-deppanel__empty">후보 없음</div>`:z.map(_e=>l`<button
                  type="button"
                  class="mon-deppanel__cand${_e.disabled?" is-disabled":""}"
                  data-dep-cand=${_e.bead_id}
                  ?disabled=${_e.disabled}
                  title=${_e.reason||_e.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${_e.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${_e.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${_e.title}</span
                  >${_e.reason?l`<span class="mon-deppanel__cand-reason"
                        >${_e.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${re===void 0?l`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function Be(u){return Ce(u,l`${Ti(ct(u),Ke(u),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(f,v)=>i(v,u.root_dir):void 0})}${we(u.id)}`)}function Ge(){return H.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${H.runnable.map(u=>Be(u))}
      </div>`:l`${H.runnable_sections.map(u=>{let f=He(u.root_dir);return l`<section
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
      ${Qn(ct(u))}
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
    </div>`}function Ze(){let u=ce("parallel");return l`<section
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
        >${lh(f.seq)}</span
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
      ${Qn(ct(f))}
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
      ${Qn({id:u.id,title:u.title,lane:"running",draggable:!1,ghost:!0,badges:[u.badge]})}
    </div>`}function ut(u,f){return l`<div
      class="mon2-lane${f.empty?" mon2-lane--empty":""}"
      data-root-dir=${u.root_dir}
      data-lane-length=${String(f.raw_length)}
    >
      ${yn({id:"",lane:f.id,title:`${u.name} \xB7 \uC9C1\uB82C ${f.index+1}`,items:f.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:l`<div
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
    </div>`}function ze(){let u=ce("serial"),f=H.cross_lanes_revision!==null,v=H.chain_lanes.some(x=>x.draft&&x.rows.length===0);return l`<section
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
            ${H.queue_groups.map(x=>x.sublanes.serial.map(j=>ut(x,j)))}
          </div>`}
    </section>`}function Re(){return l`<div class="mon2-wait">${Ze()}${ze()}</div>`}function P(u){return l`<div class="worker-rungrid">
      ${H.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:H.running.map(f=>Oi({bead_id:f.id,attempt_id:f.attempt_id||"",title:f.title,runner:f.runner??null,model:f.model??null,effort:f.effort??null,speed:f.speed??null,started_at:f.started_at??null,kind:f.kind,...f.kind==="session"?{updated_at:f.updated_at}:{},workflow:f.workflow||null,resumed_from:f.resumed_from??null,continuation_mode:f.continuation_mode??null,paused:f.run_state==="paused",failed:f.run_state==="failed",status:f.status,status_label:f.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:f.can_resume!==!1,can_pause:f.can_pause!==!1,exec_chips:f.exec_chips||null,usage:f.usage||null,discard:f.discard},u,Y,{monitor:{repo:f.workspace_name,root_dir:f.root_dir,serial_lane_id:f.serial_lane_id,last_activity:f.last_activity||null,legs:f.legs||[],dependency_chips:tt(f)}}))}
    </div>`}function V(u){let f={runnable:H.runnable,queue:H.queue,running:H.running,pr_wait:H.pr_wait,done:H.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${ih.map(v=>{let x=f[v.lane],j=v.lane==="runnable"?H.runnable_flat?x.length>0?Ge():void 0:H.runnable_sections.length>0?Ge():void 0:v.lane==="queue"?H.queue_groups.length>0||H.chain_lanes.length>0||H.parallel_rows.length>0?Re():void 0:v.lane==="running"?P(u):x.length>0?l`${x.map(z=>Qn(z))}`:void 0;return yn({id:`monitor-${v.lane}`,lane:v.pane,title:v.lane==="done"?`\uC644\uB8CC\xB7${S()}`:v.title,items:x,empty:v.empty,body:j,live:v.lane==="running"&&x.length>0,controls:v.lane==="runnable"?de():void 0,header_control:C(v.lane,x.length)})})}
      </div>`}function de(){return l`<div class="worker-filter">
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
        ${Hi.map(u=>l`<button
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
        ${Rs.map(v=>l`<option
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
        .value=${y}
      >
        ${Vn.map(v=>l`<option value=${v.value} ?selected=${y===v.value}>
              ${v.label}
            </option>`)}
      </select>`:""}function G(u){let f=s&&s.get?s.get():null,v=s&&s.getWorkspacesState?s.getWorkspacesState():[],x=u===void 0?s&&s.crossLanes?s.crossLanes():void 0:u,j={done_since:dr(y,p()),running_sort:$,candidate_filter:E,candidate_sort:N};return x!==void 0&&(j.cross_lanes=x),Gi(f,v,j)}function pe(){let u=p();H=G(),X=new Map;for(let f of[...H.runnable,...H.queue,...H.running,...H.pr_wait,...H.done])!f.non_occupying&&!X.has(f.id)&&X.set(f.id,f);Ve(V(u),M),k()?.render(),g(),O()}function g(){let u=new Map;for(let f of H.queue_groups)u.set(f.root_dir,f.auto_advance);for(let f of Array.from(M.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let v=f.closest(".mon2-item")?.getAttribute("data-root-dir")||"",x=u.get(v);typeof x=="boolean"&&f.setAttribute("title",`${f.textContent||""} \xB7 ${x?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function k(){if(se)return se;let u=M.querySelector(".mon2-deck");return u?(se=xd(u,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>H.done,rangeLabel:S,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:Z,onFocusChange:f=>{W=f,O()}}),se):null}function O(){M.classList.toggle("has-focus",W!==null);for(let u of Array.from(M.querySelectorAll(".mon2-sec[data-root-dir]")))u.classList.toggle("is-focus",W!==null&&u.getAttribute("data-root-dir")===W);for(let u of Array.from(M.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let f=X.get(u.getAttribute("data-bead-id")||"");u.classList.toggle("is-focus",W!==null&&!!f&&f.root_dir===W)}for(let u of Array.from(M.querySelectorAll(".mon2-crow[data-root-dir]")))u.classList.toggle("is-focus",W!==null&&u.getAttribute("data-root-dir")===W)}function Q(u,f){let v=a?a():void 0;if(!f||!v||f===v||!c){r(u);return}c(f).then(()=>{r(u)}).catch(x=>{n("workspace switch for %s failed: %o",f,x)})}function Z(u){if(!u)return;let f=a?a():void 0,v=()=>{try{d?.gotoView("worker")}catch(x){n("gotoView(worker) failed: %o",x)}};if(!c||f&&f===u){v();return}c(u).then(v).catch(x=>{n("workspace switch for %s failed: %o",u,x),ie("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function fe(u){un(u).then(f=>{ie(f?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",f?"success":"error",1400)})}function Ee(u){let f=X.get(u)||null;return{item:f,root_dir:f?f.root_dir:"",revision:f?f.expected_revision:0}}function $e(u){if(typeof u=="string"&&u.length>0)return u;if(u&&typeof u=="object"){let f=u;if(typeof f.message=="string"&&f.message.length>0)return f.message;if(typeof f.error=="string"&&f.error.length>0)return f.error;if(f.error&&typeof f.error=="object"&&typeof f.error.message=="string")return f.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function st(u,f,v){let x=H.owner_of[f];if(typeof x!="string"||x.length===0){ie(`${f}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await Me(u,{a:f,b:v},x)}catch(j){ie($e(j),"error")}pe()}function dt(u){return H.runnable.some(f=>f.id===u)||H.parallel_rows.some(f=>f.id===u)?!0:H.queue_groups.some(f=>f.sublanes.serial.some(v=>v.items.some(x=>x.id===u)))}function xe(u){!u||!dt(u)||(q=q&&q.bead_id===u?null:{bead_id:u,query:""},pe())}function bt(){let u=new Map,f=s&&s.get?s.get():null,v=x=>Array.isArray(x)?x.filter(j=>typeof j=="string"&&j.length>0):[];for(let x of Array.isArray(f)?f:[]){if(!x||typeof x!="object")continue;let j=x.bead_blocked_by&&typeof x.bead_blocked_by=="object"?x.bead_blocked_by:{};for(let[z,re]of Object.entries(j))Array.isArray(re)&&u.set(z,v(re));for(let z of[...Array.isArray(x.runnable)?x.runnable:[],...Array.isArray(x.session_active)?x.session_active:[]])z&&typeof z.bead_id=="string"&&Array.isArray(z.blocked_by)&&z.blocked_by.length>0&&u.set(z.bead_id,v(z.blocked_by))}return u}function gt(){let u=bt();for(let f of D){let v=(u.get(f.a)||[]).slice();f.type==="dep-remove"?u.set(f.a,v.filter(x=>x!==f.b)):v.includes(f.b)||u.set(f.a,[...v,f.b])}return u}function qt(u=H){let f=new Map,v=new Map,x=new Set,j=new Set;for(let re of u.chain_lanes){f.set(re.lane_id,{status:re.status,entries:re.rows.map(_e=>({bead_id:_e.id,root_dir:_e.root_dir}))});for(let _e of re.rows)v.set(_e.id,re.lane_id),_e.fixed&&x.add(_e.id),_e.unplaced||j.add(_e.id)}let z=new Map;for(let re of u.parallel_rows)typeof re.queue_index=="number"&&z.set(re.id,re.queue_index);for(let re of u.queue_groups)for(let _e of re.sublanes.serial)for(let Je of _e.items)typeof Je.queue_index=="number"&&z.set(Je.id,Je.queue_index);return{blocked_by_map:gt(),owner_of:new Map(Object.entries(u.owner_of)),cross_lanes:f,owner_lane_of:v,fixed_members:x,placed_members:j,parallel_rows:u.parallel_rows.map(re=>({bead_id:re.id,root_dir:re.root_dir,queue_index:re.queue_index??0})),parallel_raw_length:new Map(Object.entries(u.parallel_raw_length)),queue_index_of:z}}function Gt(u,f){let v=X.get(f);if(v&&v.root_dir===u)return v.expected_revision;let x=H.queue_groups.find(j=>j.root_dir===u);return x?x.revision:0}async function Mt(u,f,v){try{if(u.type==="worker-queue-place"||u.type==="worker-queue-reorder"||u.type==="worker-queue-remove"){let x=await ye(u.type,u.payload,u.root_dir,v.get(u.root_dir)??Gt(u.root_dir,f));return!x||typeof x.applied!="boolean"?(ie("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),!1):(x.queue&&typeof x.queue.revision=="number"&&v.set(u.root_dir,x.queue.revision),x.conflict?(ie("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):x.applied===!1?(ie(x.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${x.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0)}return(u.type==="dep-add"||u.type==="dep-remove")&&await Me(u.type,{a:u.a,b:u.b},u.root_dir),!0}catch(x){return ie($e(x),"error"),!1}}function Pt(u){(u.type==="dep-add"||u.type==="dep-remove")&&(D=[...D,{type:u.type,a:u.a,b:u.b}])}async function fn(u,f){if(!o)return{ok:!1};try{let v=await o(u.type,{...u.payload,expected_revision:f});return!v||typeof v.revision!="number"?(ie("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:v.revision}}catch(v){let x=v,j=x&&x.code==="conflict"?x.details?.cross_lanes:null;return j&&typeof j.revision=="number"&&Array.isArray(j.lanes)?{ok:!1,conflict:j}:(ie($e(v),"error"),{ok:!1})}}async function At(u,f,v){let x=new Map,j=u.ops.slice(0,u.lane_op_index),z=u.ops.slice(u.lane_op_index);for(let _e of j){if(!await Mt(_e,v,x))return{done:!0};Pt(_e)}let re=f;for(let _e of u.lane_ops){if(re===null)return ie("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Je=await fn(_e,re);if(!Je.ok)return Je.conflict?{done:!1,conflict:Je.conflict}:{done:!0};re=Je.revision}for(let _e of z){if(!await Mt(_e,v,x))return{done:!0};Pt(_e)}return{done:!0}}async function Dt(u,f){D=[];let v=H;for(let x=0;;x+=1){let j=u(qt(v));if("refused"in j){ie(j.refused,"error");break}let z=await At(j,v.cross_lanes_revision,f);if(z.done)break;if(x>=1){ie("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}v=G(z.conflict)}D=[],pe()}async function Ue(u,f){await Dt(v=>qi(u,f,v),u.bead_id)}async function Xt(u,f){if(u==="create"){await Dt(v=>Fi(null,v),"");return}if(u==="remove"){let v=H.chain_lanes.find(x=>x.lane_id===f);if(v&&!v.draft){let x=v.rows.filter((j,z)=>z===0?!1:!j.mismatch).length;if(!h(`\uC758\uC874 ${x}\uAC1C\uB97C \uD568\uAED8 \uC81C\uAC70\uD569\uB2C8\uB2E4`))return}await Dt(x=>Rd(f,x),"");return}await Dt(v=>u==="confirm"?Td(f,v):Cd(f,v),"")}async function Qt(u,f){let v=X.get(u);if(!v){pe();return}let x={kind:"candidate",bead_id:u,root_dir:v.root_dir};if(f==="new-lane"){await Dt(j=>Fi({bead_id:u,root_dir:v.root_dir},j),u);return}if(f.startsWith("lane:")){let j=f.slice(5);if(!H.chain_lanes.find(re=>re.lane_id===j)){pe();return}await Dt(re=>qi(x,{kind:"chain",lane_id:j,marker_index:(re.cross_lanes.get(j)?.entries??[]).length},re),u);return}if(f.startsWith("serial:")){let j=f.slice(7),z=(v.place_lanes||[]).find(re=>re.id===j);await Ue(x,{kind:"repo-serial",root_dir:v.root_dir,lane_id:j,index:z?z.index:0});return}await Ue(x,{kind:"parallel",marker_index:H.parallel_rows.length})}async function et(u,f){let v=H.parallel_rows,x=v.findIndex(jt=>jt.id===u);if(x<0)return;let j=v[x].root_dir,z=[];v.forEach((jt,In)=>{jt.root_dir===j&&z.push(In)});let re=z.indexOf(x),_e=z[re+f];if(typeof _e!="number")return;let Je=f===-1?_e:z[re+2]??Math.min(v.length,_e+1);await Ue({kind:"parallel",bead_id:u,root_dir:j,queue_index:v[x].queue_index??0},{kind:"parallel",marker_index:Je})}async function Pe(u){for(let f of H.chain_lanes){let v=f.rows.find(x=>x.id===u);if(v){await Ue({kind:"chain",bead_id:u,root_dir:v.root_dir,lane_id:f.lane_id,...typeof v.queue_index=="number"?{queue_index:v.queue_index}:{}},{kind:"parallel",marker_index:H.parallel_rows.length});return}}}let R=null,ue=!1,Ae=null;function ot(){Ae!==null&&clearTimeout(Ae),Ae=setTimeout(()=>{Ae=null,ue=!1},0)}function vt(u,f){let v=f&&typeof f.closest=="function"?f.closest("[data-row-index]"):null;if(v&&u.contains(v)){let x=Number(v.getAttribute("data-row-index"));return Number.isFinite(x)?x:0}return u.querySelectorAll("[data-row-index]").length}function pt(u){let f=u.target,v=typeof f?.closest=="function"?f.closest("[data-drop]"):null;if(!v||!R)return null;let x=v.getAttribute("data-drop");if(x==="candidate")return{zone:v,target:{kind:"candidate"}};if(x==="parallel")return{zone:v,target:{kind:"parallel",marker_index:vt(v,f)}};if(x==="chain")return{zone:v,target:{kind:"chain",lane_id:v.getAttribute("data-lane-id")||"",marker_index:vt(v,f)}};if(x==="repo-serial"){let j=v.getAttribute("data-root-dir")||"";if(j!==R.root_dir)return null;let z=typeof f?.closest=="function"?f.closest("[data-queue-index]"):null,re=z&&v.contains(z)?z.getAttribute("data-queue-index"):v.getAttribute("data-lane-length"),_e=Number(re);return{zone:v,target:{kind:"repo-serial",root_dir:j,lane_id:v.getAttribute("data-lane-id")||"",index:Number.isFinite(_e)?_e:0}}}return null}function Rt(){for(let u of Array.from(M.querySelectorAll(".is-drop-over")))u.classList.remove("is-drop-over")}function It(u){let f=u.target,v=typeof f?.closest=="function"?f.closest('[draggable="true"][data-bead-id]'):null,x=v?v.closest("[data-drag-kind]"):null;if(!x)return;let j=x.getAttribute("data-bead-id")||"",z=x.getAttribute("data-drag-kind")||"",re=x.getAttribute("data-root-dir")||"";if(!j||!z||!re)return;let _e=x.getAttribute("data-queue-index")||"",Je=Number(_e),jt=x.getAttribute("data-lane-id")||"";R={kind:z,bead_id:j,root_dir:re,..._e!==""&&Number.isFinite(Je)?{queue_index:Je}:{},...jt?{lane_id:jt}:{}},ue=!0,le=null,M.classList.add("is-dragging");try{u.dataTransfer?.setData("text/plain",j),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function Ht(u){let f=pt(u);f&&(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),f.zone.classList.add("is-drop-over"))}function Jt(u){let f=u.target;typeof f?.closest=="function"&&f.closest("[data-drop]")?.classList.remove("is-drop-over")}function wt(){R=null,Rt(),M.classList.remove("is-dragging"),ot()}function en(u){let f=pt(u),v=R;R=null,Rt(),M.classList.remove("is-dragging"),!(!f||!v)&&(u.preventDefault(),Ue(v,f.target))}function _n(u){return{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,status:u.run_state==="running"?"running":u.run_state,worktree:u.root_dir}}function Ln(u,f){let{item:v,root_dir:x,revision:j}=Ee(f),z=v?.attempt_id||"",re=u.classList;if(re.contains("mon2-rowops__up")||re.contains("mon2-rowops__down")){et(f,re.contains("mon2-rowops__up")?-1:1);return}if(re.contains("mon2-rowops__remove")){ye("worker-queue-remove",{bead_id:f},x,j);return}if(re.contains("mon2-crow__detach")){Pe(f);return}if(re.contains("mon-dep__btn")){xe(f);return}if(re.contains("worker-dep__open")){xe(f);return}if(re.contains("mon-lane__chip")){let _e=u.getAttribute("data-lane-id")||"";M.querySelector(`.mon2-clane[data-lane-id="${_e}"]`)?.scrollIntoView({block:"nearest"});return}if(re.contains("mon-deppanel__unlink")){let _e=u.getAttribute("data-dep-a")||"",Je=u.getAttribute("data-dep-b")||"";h(`${Je}\uAC00 ${_e}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&st("dep-remove",_e,Je);return}if(re.contains("mon-deppanel__cand")){let _e=u.getAttribute("data-dep-cand")||"";q&&_e&&st("dep-add",q.bead_id,_e);return}if(re.contains("mon-overlap__chip")){let _e=u.getAttribute("data-overlap-id")||"";U=!!U&&U.bead_id===f&&U.counterpart_id===_e?null:{bead_id:f,counterpart_id:_e},pe();return}if(re.contains("mon-overlap__place")){_t(f,u.getAttribute("data-counterpart-id")||"");return}if(re.contains("worker-card__place")){le=le===f?null:f,pe();return}if(re.contains("worker-card__place-cancel")){le=null,pe();return}if(re.contains("worker-card__place-lane")){let _e=u.getAttribute("data-lane")||"parallel";le=null,Qt(f,_e);return}if(re.contains("rtile__session")){Y=z,z&&v&&(ne.hidden=!1,Se.open({attempt_id:z,root_dir:x,meta:_n(v)})),pe();return}if(re.contains("rtile__pause")){Me("worker-attempt-pause",{attempt_id:z},x);return}if(re.contains("rtile__resume")){Pr().then(_e=>{if(_e!==null)return ee("worker-attempt-resume",{attempt_id:z,..._e!==""?{instructions:_e}:{}},x,j)});return}if(re.contains("rtile__dismiss")){ye("worker-attempt-dismiss",{attempt_id:z},x,j);return}if(re.contains("rtile__discard")){if(!h(xs(f,"unmerged")))return;ve({bead_id:f,...z?{attempt_id:z}:{},...u.dataset.operationId?{operation_id:u.dataset.operationId}:{}},x,j);return}if(re.contains("worker-mini__merge")){let _e=K(x,f);_e?.mismatch&&_e.continuation===null?me(x,f,j,_e.mismatch):ye("worker-merge-queue-add",{bead_id:f},x,j);return}if(re.contains("worker-mini__merge-cancel")){ye("worker-merge-queue-remove",{bead_id:f},x,j);return}if(re.contains("worker-mini__discard")){let _e=u.dataset.discardMode==="merged"?"merged":"unmerged";if(!h(xs(f,_e)))return;ve({bead_id:f,...u.dataset.attemptId?{attempt_id:u.dataset.attemptId}:{},...u.dataset.operationId?{operation_id:u.dataset.operationId}:{}},x,j);return}if(re.contains("worker-mini__revise-fix")){ee("worker-revise-fix",{bead_id:f},x,j);return}re.contains("worker-mini__revise-approve")&&ye("worker-revise-approve",{bead_id:f},x,j)}function T(u){let f=ue;ue=!1;let v=u.target;if(!v||typeof v.closest!="function"||v.closest("dialog")||v.closest(".worker-drawer-overlay")||v.closest("a"))return;let x=v.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(x){u.preventDefault();let on=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||x.textContent?.trim()||"";on&&fe(on);return}let j=v.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(j){u.preventDefault();let Tn=j.getAttribute("data-root-dir")||X.get(v.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||j.getAttribute("title")||"";Z(Tn);return}let z=v.closest(".mon2-sec__toggle");if(z){u.preventDefault(),I(z.getAttribute("data-root-dir")||"");return}let re=v.closest(".mon2-area__toggle");if(re){u.preventDefault(),Le(re.getAttribute("data-area")||"parallel");return}if(v.closest(".mon2-newlane")){u.preventDefault(),Xt("create","");return}let _e=v.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove");if(_e){u.preventDefault();let Tn=_e.getAttribute("data-lane-id")||"";Xt(_e.classList.contains("mon2-clane__confirm")?"confirm":_e.classList.contains("mon2-clane__reapply")?"reapply":"remove",Tn);return}if(v.closest(".mon-merge-all")){u.preventDefault(),ae();return}let Je=v.closest(".mon-filter__spec");if(Je){u.preventDefault(),E={...E,spec:Je.getAttribute("data-spec")||"all"},Xd(E),pe();return}let jt=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!jt)return;let In=jt.getAttribute("data-bead-id")||"",Bt=v.closest("button");if(Bt){u.preventDefault(),Ln(Bt,In);return}In&&!f&&(u.preventDefault(),Q(In,jt.getAttribute("data-root-dir")||Ee(In).root_dir))}function L(u){let f=u.target;if(!f||typeof f.closest!="function")return;let v=f.closest(".mon-filter__blocked");if(v){E={...E,show_blocked:v.checked},Xd(E),pe();return}let x=f.closest(".mon-candidate-sort");if(x){N=Rs.some(re=>re.value===x.value)?x.value:"repo_spec",eh(N),pe();return}let j=f.closest(".mon-running-sort");if(j){$=j.value==="repo"?"repo":"started",oh($),pe();return}let z=f.closest(".mon-done-range");z&&(y=gn(z.value)?z.value:ln,rh(y),pe())}function De(u){let f=u.target,v=f&&typeof f.closest=="function"?j=>f.closest(j):()=>null,x=!1;U&&!v(".mon-overlap__popover, .mon-overlap__chip")&&(U=null,x=!0),q&&!v(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(q=null,x=!0),x&&pe()}function _(u){u.key!=="Escape"||!U&&!q||(U=null,q=null,pe())}function w(u){let f=u.target;!f||typeof f.closest!="function"||!f.closest(".mon-deppanel__search")||!q||(q={...q,query:f.value},pe())}e.addEventListener("click",T),e.addEventListener("change",L),e.addEventListener("input",w),document.addEventListener("click",De),document.addEventListener("keydown",_),e.addEventListener("dragstart",It),e.addEventListener("dragover",Ht),e.addEventListener("dragleave",Jt),e.addEventListener("drop",en),e.addEventListener("dragend",wt),s&&typeof s.subscribe=="function"&&(ke=s.subscribe(()=>{try{he.clear(),pe()}catch{}}));function m(){ge!==null&&(clearInterval(ge),ge=null)}function A(){Ae!==null&&(clearTimeout(Ae),Ae=null)}return{load(){n("load"),pe(),ge===null&&(ge=setInterval(()=>{try{pe()}catch{}},ah))},pause(){m()},clear(){m(),A(),ke&&(ke(),ke=null),Se.destroy(),ne.hidden=!0,se?.destroy(),se=null,e.removeEventListener("click",T),e.removeEventListener("change",L),e.removeEventListener("input",w),document.removeEventListener("click",De),document.removeEventListener("keydown",_),e.removeEventListener("dragstart",It),e.removeEventListener("dragover",Ht),e.removeEventListener("dragleave",Jt),e.removeEventListener("drop",en),e.removeEventListener("dragend",wt),e.replaceChildren()}}}function ip(e,t,n){let r=St("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(y){return $=>{$.preventDefault(),r("click tab %s",y),n.gotoView(y)}}function c(){let y=t.getState();return y.view==="worker"||y.view==="monitor"?y.view:"board"}function d(){let y=c();return l`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${y==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function p(){let y=c();return l`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${y==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${y==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function h(){s&&Ve(d(),s),o&&Ve(p(),o)}return h(),a=t.subscribe(()=>h()),{destroy(){a&&(a(),a=null),s&&Ve(l``,s),o&&Ve(l``,o)}}}var lp=["bug","feature","task","epic","chore"];function cp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var up=["Critical","High","Medium","Low","Backlog"];function dp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),c=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),h=n.querySelector("#btn-create"),y=n.querySelector(".new-issue__close");function $(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let W of lp){let S=document.createElement("option");S.value=W,S.textContent=cp(W),o.appendChild(S)}a.replaceChildren();for(let W=0;W<=4;W+=1){let S=document.createElement("option");S.value=String(W);let M=up[W]||"Medium";S.textContent=`${W} \u2013 ${M}`,a.appendChild(S)}}$();function E(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function N(D){s.disabled=D,o.disabled=D,a.disabled=D,i.disabled=D,c.disabled=D,p.disabled=D,h.disabled=D,h.textContent=D?"Creating\u2026":"Create"}function B(){d.textContent=""}function Y(D){d.textContent=D}function le(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let W=window.localStorage.getItem("beads-ui.new.priority");W&&/^\d$/.test(W)?a.value=W:a.value="2"}catch{o.value="",a.value="2"}}function U(){let D=o.value||"",W=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),W.length>0&&window.localStorage.setItem("beads-ui.new.priority",W)}async function q(){B();let D=String(s.value||"").trim();if(D.length===0){Y("Title is required"),s.focus();return}let W=Number(a.value||"2");if(!(W>=0&&W<=4)){Y("Priority must be 0..4"),a.focus();return}let S=String(o.value||""),M=String(c.value||""),ne={title:D};S.length>0&&(ne.type=S),String(W).length>0&&(ne.priority=W),M.length>0&&(ne.description=M),N(!0);try{await t("create-issue",ne)}catch{N(!1),Y("Failed to create issue");return}U(),N(!1),E()}return n.addEventListener("cancel",D=>{D.preventDefault(),E()}),y.addEventListener("click",()=>E()),p.addEventListener("click",()=>E()),n.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),q())}),r.addEventListener("submit",D=>{D.preventDefault(),q()}),{open(){r.reset(),B(),le();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){E()}}}var ch=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function uh(e,t){return qa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function pp(e,t,n){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=uh(r,e);return l`<button
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
  `}function fp(e,t,n){return l`
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
  `}function _p(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${ch.map(([n,r])=>l`<label class="settings-dialog__toggle">
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
  `}var dh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function mp(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(X=>ie(X,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,d="",p=null;function h(){if(p)return p;let X=a.querySelector('[data-pane="execution"]');return X?(p=Qo(X,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:he=>t.queueStore?.set?.(he)}),p):null}function y(){return l`
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
              ${pp(X,s(),Y)}
              ${fp(X,d,{onDraft:he=>{d=he},onAdd:le,onRemove:U})}
              ${_p(X,q)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function E(X){let he=r.get();if(he)try{let ke=await n("display-policy-set",{expected_revision:he.revision,policy:X(he)});N(ke),ke&&ke.conflict&&ke.policy&&(ke=await n("display-policy-set",{expected_revision:ke.policy.revision,policy:X(ke.policy)}),N(ke)),ke&&ke.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function N(X){X&&X.policy&&typeof X.policy=="object"&&r.set(X.policy)}function B(X){E(X)}function Y(X){let he=r.get();if(!he)return;let ke=!ph(X,he);B(ge=>fh(X,ge,ke))}function le(){let X=d.trim();X.length!==0&&(d="",B(he=>he.hidden_prefixes.includes(X)?{hidden_prefixes:he.hidden_prefixes}:{hidden_prefixes:[...he.hidden_prefixes,X]}),D())}function U(X){B(he=>({hidden_prefixes:he.hidden_prefixes.filter(ke=>ke!==X)}))}function q(X){let he=r.get();if(!he)return;let ke=he.chips[X]===!1;B(()=>({chips:{[X]:ke}}))}function D(){Ve(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${dh.map(X=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${X.id}
                  aria-selected=${String(i===X.id)}
                  aria-controls=${`settings-pane-${X.id}`}
                  @click=${()=>W(X.id)}
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
            ${y()} ${$()}
          </div>
        </div>
      `,a),h()}function W(X){i=X,D()}let S=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",S),a.addEventListener("cancel",S);let M=X=>{X.target===a&&H()};a.addEventListener("click",M);let ne=null;r.subscribe&&(ne=r.subscribe(()=>{c&&D()}));let Te=null;t.implPresetStore?.subscribe&&(Te=t.implPresetStore.subscribe(()=>{c&&p?.render()}));function be(X="execution"){c||(c=!0,t.onOpenChange?.(!0),i=X,d="",D(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),h()?.load())}function H(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:be,close:H,sessionDraft:()=>p?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",S),a.removeEventListener("cancel",S),a.removeEventListener("click",M),ne&&(ne(),ne=null),Te&&(Te(),Te=null),p?.destroy(),p=null,a.remove()}}}function ph(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function fh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var _h=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],gp="usage-meter-card",mh="usage-meter-layer",bp=600,gh=["token_expired","relogin_required"];function hp(e){return String(e).padStart(2,"0")}function bh(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function yp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${hp(r.getHours())}:${hp(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${_h[r.getMonth()]} ${r.getDate()} ${o}`;return`${bh(n,t)} \xB7 ${i}`}function hh(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function vp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function wp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var kp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function xp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function yh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:xp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function vh(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=yh(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?xp(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function $p(e,t){return`${e}:${t}`}function Ap(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function d(){Ve(l``,e),e.hidden=!0,h()}function p(){if(c===null){let ge=e.ownerDocument;c=ge.createElement("div"),c.id=mh,c.className="usage-meter__layer",ge.body.appendChild(c)}return c}function h(){c!==null&&(Ve(l``,c),c.remove(),c=null)}function y(ge){n!==ge&&(n===null&&(document.addEventListener("mousedown",E),document.addEventListener("keydown",B),window.addEventListener("resize",N)),n=ge)}function $(){n!==null&&(n=null,document.removeEventListener("mousedown",E),document.removeEventListener("keydown",B),window.removeEventListener("resize",N))}function E(ge){let se=ge.target;se&&(e.contains(se)||c!==null&&c.contains(se))||($(),H())}function N(){H()}function B(ge){ge.key==="Escape"&&($(),H())}function Y(ge){n===ge?$():y(ge),H()}function le(){$(),H()}async function U(ge,se){if(r.has(ge.key))return;let Se=$p(ge.key,se);r.set(ge.key,se),a.delete(Se),H();let ye=null;try{ye=await(await fetch(ge.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:se})})).json()}catch{ye=null}if(t)return;if(r.delete(ge.key),!ye||ye.ok!==!0){let ee=ye&&typeof ye.error=="string"&&ye.error.length>0?ye.error:"network_error";a.set(Se,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ee}`}),H();return}let K=Array.isArray(ye.warnings)?ye.warnings.filter(ee=>typeof ee=="string"&&ee.length>0):[];K.length>0&&a.set(Se,{kind:"warn",text:K.join(" \xB7 ")}),H(),await ke()}function q(ge,se,Se,ye){let K=wp(ge.pct),me=`resets ${yp(ge.resetsAt,ye)}${se?` \xB7 ${Se}`:""}`;return l`<span
      class="usage-meter__window ${vp(K)}"
      style=${`--progress: ${K}%`}
      title=${me}
    >
      <span class="usage-meter__label">${ge.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${K}%</span>
    </span>`}function D(ge,se,Se){let ye=se.available&&typeof se.ageSeconds=="number"&&se.ageSeconds>bp,K=ye&&typeof se.ageSeconds=="number"?`${Math.floor(se.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",ee=se.accounts.filter(ae=>!ae.active).length,me=`usage-meter__group${ye?" usage-meter__group--stale":""}`,ve=l`<span class="usage-meter__provider"
        >${ge.label}</span
      >
      ${se.available?se.windows.map(ae=>q(ae,ye,K,Se)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ee>0?l`<span class="usage-meter__badge">+${ee}</span>`:""}`;if(se.accounts.length===0)return l`<span
        class=${me}
        aria-label=${`${ge.label} usage`}
        >${ve}</span
      >`;let Me=n===ge.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${me}`}
      aria-label=${`${ge.label} usage`}
      aria-expanded=${Me?"true":"false"}
      aria-controls=${gp}
      @click=${()=>Y(ge.key)}
    >
      ${ve}
    </button>`}function W(ge,se){return l`<span class="usage-meter" aria-label="Usage">
      ${ge.map(Se=>D(Se.provider,Se.snapshot,se))}
    </span>`}function S(ge,se){let Se=wp(ge.pct),ye=yp(ge.resetsAt,se);return l`<span
      class="usage-meter__account-window ${vp(Se)}"
      style=${`--progress: ${Se}%`}
    >
      <span class="usage-meter__account-key">${ge.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Se}%</span>
      <span class="usage-meter__account-reset"
        >${ye.length>0?`\u21BB ${ye}`:""}</span
      >
    </span>`}function M(ge,se){return gh.includes(se)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ge.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ne(ge,se,Se){let ye=se.status==="ok",K=typeof se.ageSeconds=="number"&&se.ageSeconds>bp,ee=a.get($p(ge.key,se.number)),me=r.get(ge.key),ve=me!==void 0,Me=me===se.number,ae=["usage-meter__account"];return se.active&&ae.push("usage-meter__account--active"),ye||ae.push("usage-meter__account--unavailable"),K&&ae.push("usage-meter__account--stale"),l`<div class=${ae.join(" ")}>
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
              >${hh(se.ageSeconds)}</span
            >`}
        ${se.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ve}
              @click=${()=>{U(ge,se.number)}}
            >
              ${Me?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${ye?l`<div class="usage-meter__account-windows">
            ${se.windows.map(He=>S(He,Se))}
          </div>`:l`<div class="usage-meter__account-status">
            ${M(ge,se.status)}
          </div>`}
      ${ee===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${ee.kind}"
          >
            ${ee.text}
          </div>`}
    </div>`}function Te(ge,se,Se){let ye=se.accounts.filter(K=>K.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ge.label} · 활성 ${ye} / 전체
        ${se.accounts.length}
      </h2>
      ${se.accounts.map(K=>ne(ge,K,Se))}
    </section>`}function be(ge,se){return l`<div
      class="usage-meter__card"
      id=${gp}
      role="dialog"
      aria-label=${`${ge.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${Te(ge.provider,ge.snapshot,se)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function H(){let ge=[];for(let ye of kp){let K=o.get(ye.key);K&&ge.push({provider:ye,snapshot:K})}if(ge.length===0){$(),d();return}let se=ge.find(ye=>ye.provider.key===n&&ye.snapshot.accounts.length>0);se||$();let Se=Date.now();Ve(W(ge,Se),e),e.hidden=!1,se?X(se,Se):h()}function X(ge,se){let Se=p(),ye=e.getBoundingClientRect(),K=e.ownerDocument.documentElement.clientWidth;Se.style.setProperty("--usage-meter-anchor-top",`${ye.bottom}px`),Se.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,K-ye.right)}px`),Ve(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${le}
        ></div>
        ${be(ge,se)}`,Se)}async function he(ge){try{let se=await fetch(ge.endpoint);return se.ok?vh(await se.json()):null}catch{return null}}async function ke(){i+=1;let ge=i,se=await Promise.all(kp.map(async Se=>({provider:Se,snapshot:await he(Se)})));if(!(t||ge!==i)){for(let Se of se)Se.snapshot?o.set(Se.provider.key,Se.snapshot):o.delete(Se.provider.key);H()}}return d(),ke(),s=setInterval(()=>{ke()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),$(),d()}}}function Sp(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var wh="worker-ineligible";function Vi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ep(e){return Vi(e).includes(wh)}var kh="worker-serial";function Ki(e){return Vi(e).includes(kh)}function Yi(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var $h=new Set(["done","failed","orphaned","stopped","discarded"]),xh={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Ah={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Sh={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Zi(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Sh[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Tp(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,d=new Map,p=!1,h=null,y=null,$=null,E=new Set,N=!1,B=0,Y=null,le=new Set;function U(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function q(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function D(){return o&&o()||""}async function W(){if(!s)return;let g=++B;N=!0,$=null,E.clear(),ze();try{let k=await s("worker-parallel-analysis-targets",{root_dir:D()});if(g!==B||!Re)return;let O=Array.isArray(k?.qualified)?k.qualified:[],Q=Array.isArray(k?.excluded)?k.excluded:[];$={qualified:O,excluded:Q};for(let Z of O)Z&&typeof Z.id=="string"&&E.add(Z.id)}catch{g===B&&Re&&($={qualified:[],excluded:[]},ie("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{g===B&&(N=!1,Re&&ze())}}function S(g){return Array.isArray(g.runs)?g.runs:[]}function M(){let g=U(),k=new Set;for(let O of Object.values(g.attempts||{})){let Q=O;Q&&typeof Q.bead_id=="string"&&!$h.has(Q.status)&&k.add(Q.bead_id)}for(let O of Array.isArray(g.pr_wait)?g.pr_wait:[])O&&typeof O.bead_id=="string"&&k.add(O.bead_id);for(let O of Object.values(g.discard_operations||{})){let Q=O;Q&&Q.phase!=="done"&&typeof Q.bead_id=="string"&&k.add(Q.bead_id)}return k}function ne(g){return g.filter(k=>Te(k)===null)}function Te(g){let k=U();for(let O of Array.isArray(k.serial_lanes)?k.serial_lanes:[])if(Array.isArray(O?.entries)&&O.entries.some(Q=>Q.bead_id===g))return O.id;return(Array.isArray(k.queue)?k.queue:[]).some(O=>O.bead_id===g)?"parallel":null}function be(g,k){let O=c.get(g);return O||[...k.order]}function H(g){if(g.length<2)return!1;let k=Te(g[0]);if(!k||k==="parallel")return!1;let O=U(),Q=(Array.isArray(O.serial_lanes)?O.serial_lanes:[]).find(fe=>fe.id===k)?.entries.map(fe=>fe.bead_id);if(!Array.isArray(Q))return!1;let Z=g.map(fe=>Q.indexOf(fe));return Z.every(fe=>fe>=0)&&Z.every((fe,Ee)=>Ee===0||fe>Z[Ee-1])}function X(){let g=U(),k=Array.isArray(g.serial_lanes)?g.serial_lanes:[],O=k.find(Q=>Array.isArray(Q.entries)&&Q.entries.length===0);return O?O.id:k[0]?.id||"s1"}function he(g){let k=U().bead_titles||{};return typeof k[g]=="string"?k[g]:g}async function ke(g,k){if(!s||p)return null;p=!0,ze();try{return await s(g,k)}finally{p=!1,ze()}}async function ge(g){r?.setPending?.(!0);try{let k=await ke("worker-parallel-analysis-start",{force:g,target_ids:Array.from(E)});k&&k.applied===!1&&k.reason&&(k.reason==="target_not_qualified"&&Array.isArray(k.detail)?ie(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${k.detail.join(", ")}`,"error",3200):ie(`\uBD84\uC11D \uC2E4\uD328: ${k.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function se(){let g=q().job;!s||!g||await s("worker-parallel-analysis-cancel",{job_id:g.job_id})}async function Se(g){if(!(!s||le.has(g))){le.add(g),ze();try{let k=await s("worker-parallel-analysis-prompt",{root_dir:D(),run_id:g});if(!Re)return;if(k?.ok===!0&&typeof k.prompt=="string"){Y={run_id:g,prompt:k.prompt};return}ie(k?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{le.delete(g),ze()}}}function ye(){Y=null,ze()}async function K(){if(!Y)return;let g=await un(Y.prompt);ie(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)}function ee(g,k){a&&a(g,Zi(k))}function me(){return U().runner_catalog}function ve(g){return Object.keys(me()?.runners?.[g]?.models||{})}function Me(g){let k=ve(g),O=me()?.runners?.[g]?.default_model;return typeof O=="string"&&k.includes(O)?O:k[0]||""}function ae(){let g=q().settings,k=h||g.runner||"claude",O=ve(k),Q=h?Me(k):g.model||O[0]||"",Z=Yi(me(),k,Q),fe=g.effort||"",Ee=Z.includes(fe)?fe:Z[0]||"";return{runner:k,model:Q,effort:Ee,models:O,efforts:Z}}async function He(g){let k=q().settings,O=await ke("worker-parallel-analysis-settings-update",{expected_revision:k.revision,runner:g.runner,model:g.model,effort:g.effort});(!O||O.applied!==!0)&&(h=null,ze(),O&&O.reason&&ie(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${O.reason}`,"error",2800))}function I(g){h=g,ze();let k=ae();He({runner:g,model:k.model,effort:k.effort})}function ce(g){let k=ae(),O=Yi(me(),k.runner,g);He({runner:k.runner,model:g,effort:O.includes(k.effort)?k.effort:O[0]||""})}function Le(g){let k=ae();He({runner:k.runner,model:k.model,effort:g})}async function qe(g,k){if(!s||p)return;let O=be(g,k),Q=q();if(O.length<2||!Q.last_good){ie("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let Z=d.get(g)||X(),fe=()=>({snapshot_digest:Q.last_good.identity_digest,group_index:g,lane:Z,ordered_bead_ids:O,expected_revision:U().revision});p=!0,ze();try{let Ee=await s("worker-parallel-analysis-submit",fe());Ee&&Ee.queue&&n&&n.set(Ee.queue),Ee&&Ee.applied!==!0&&Ee.conflict===!0&&(Ee=await s("worker-parallel-analysis-submit",fe()),Ee&&Ee.queue&&n&&n.set(Ee.queue)),Ee&&Ee.applied===!0?(c.delete(g),ie(`\uC9C1\uB82C \uB808\uC778 ${Z}\uC5D0 ${O.length}\uAC1C \uBC30\uCE58`,"success")):ie(`\uC81C\uCD9C \uAC70\uBD80: ${Ee?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,ze()}}function Ie(g,k,O){c.set(g,be(g,k).filter(Q=>Q!==O)),ze()}function We(g){c.delete(g),ze()}function je(g,k,O,Q){let Z=[...be(g,k)],fe=Z.indexOf(O),Ee=fe+Q;fe<0||Ee<0||Ee>=Z.length||(Z.splice(Ee,0,...Z.splice(fe,1)),c.set(g,Z),ze())}function Ye(){let g=q().settings,k=Object.keys(me()?.runners||{}),O=ae();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${Q=>I(Q.target.value)}
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
          @change=${Q=>ce(Q.target.value)}
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
          @change=${Q=>Le(Q.target.value)}
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
      >`:g.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function ct(g){return g.is_default===!0&&g.compatible===!1}function _t(g){return!!(g.runner&&g.model&&g.effort)}function te(g){return _t(g)&&g.compatible!==!1}function J(g){let k=Math.max(0,Math.floor(g/1e3)),O=Math.floor(k/60),Q=k%60;return`${O}:${String(Q).padStart(2,"0")}`}function Ce(g){let k=g.job;if(k){let O=typeof k.started_at=="number"?k.started_at:0,Q=`${k.runner||"?"}/${k.model||"?"}`,Z=O?` \xB7 \uACBD\uACFC ${J(Date.now()-O)}`:"",fe=typeof k.session_id=="string"?k.session_id:"",Ee=S(g).find($e=>$e.run_id===k.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${Q} · effort ${k.effort||"?"}${Z}</span
        >
        ${fe?l`<code class="pa-session-id" title=${fe}
              >${fe.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ee(k.job_id,Ee||k)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Ee?.prompt_saved!==!0||le.has(k.job_id)}
          @click=${()=>{Se(k.job_id)}}
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
        @click=${()=>{ge(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!O||Z||Q}
        @click=${()=>{ge(!0)}}
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
    </div>`}function Be(g){return typeof g=="string"&&g.length>0?g:"\uBBF8\uBC30\uCE58"}function Ge(g,k){k?E.add(g):E.delete(g),ze()}function Qe(g){let k=Array.isArray(g.scope)?g.scope:[],O=Array.isArray(g.overlaps)?g.overlaps:[];return k.length===0&&O.length===0?l``:l`<span class="pa-target__signals">
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
                        >${xh[O.reason]||O.reason}</span
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
        >${Ah[g.outcome]||g.outcome}</span
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
          ?disabled=${g.prompt_saved!==!0||le.has(g.run_id)}
          @click=${()=>{Se(g.run_id)}}
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
      <div class="pa-prompt-popup__backdrop" @click=${ye}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${Y.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{K()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${ye}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Y.prompt}</pre
        >
      </section>
    </div>`:""}function it(g,k){let O=be(g,k),Q=M(),Z=O.filter(xe=>Q.has(xe)),fe=ne(O),Ee=H(O),$e=Array.isArray(U().serial_lanes)?U().serial_lanes:[],st=d.get(g)||X(),dt=k.eligible!==!0||O.length<2||Z.length>0||fe.length>0||Ee||p;return l`<section class="pa-group" data-group-index=${String(g)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${k.confidence}</span>
        ${k.categories.map(xe=>l`<span class="pa-group__category">${xe}</span>`)}
        ${Ee?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${k.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${fe.length>0?l`<span class="pa-group__stale"
              >stale — ${fe.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${k.reason}</p>
      <ol class="pa-group__members">
        ${O.map((xe,bt)=>l`<li class="pa-member" data-bead-id=${xe}>
              <span class="pa-member__seq">${bt+1}</span>
              <span class="pa-member__title">${he(xe)}</span>
              ${Q.has(xe)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${xe}
                ?disabled=${bt===0}
                aria-label=${`${xe} \uC704\uB85C`}
                @click=${()=>je(g,k,xe,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${xe}
                ?disabled=${bt===O.length-1}
                aria-label=${`${xe} \uC544\uB798\uB85C`}
                @click=${()=>je(g,k,xe,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${xe}
                aria-label=${`${xe} \uC81C\uC678`}
                @click=${()=>Ie(g,k,xe)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${k.evidence.map(xe=>l`<li class="pa-evidence">
              <code>${xe.path}</code>
              <span class="pa-evidence__locator">${xe.locator}</span>
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
            @change=${xe=>{d.set(g,xe.target.value),ze()}}
          >
            ${$e.map((xe,bt)=>l`<option
                  value=${xe.id}
                  ?selected=${st===xe.id}
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
    </div>`}function ut(){let g=Re&&!!q().job;if(g&&y===null){y=setInterval(()=>ze(),1e3);return}!g&&y!==null&&(clearInterval(y),y=null)}function ze(){let g=q();h&&g.settings.runner===h&&(h=null);let k=g.last_good?.result;ut(),Ve(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${pe}
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
      `,i)}let Re=!1,P=()=>{Re=!1,Y=null,B+=1,ut()},V=g=>{g.target===g.currentTarget&&pe()};i.addEventListener("close",P),i.addEventListener("cancel",P),i.addEventListener("click",V);let de=null;n&&n.subscribe&&(de=n.subscribe(()=>{Re&&ze()}));let C=null;r&&r.subscribe&&(C=r.subscribe(()=>{Re&&ze()}));function G(){Re||(Re=!0,ze(),W(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function pe(){Re&&(Re=!1,Y=null,B+=1,ut(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:G,close:pe,destroy(){Re=!1,y!==null&&(clearInterval(y),y=null),i.removeEventListener("close",P),i.removeEventListener("cancel",P),i.removeEventListener("click",V),de&&(de(),de=null),C&&(C(),C=null),i.remove()}}}function Cp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let c=i.scope.filter(d=>typeof d=="string"&&d.length>0);if(c.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:c})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let c=sa(s[a].scope,s[i].scope);if(c.length===0)continue;let d=s[a].member,p=s[i].member;n.get(d.id)?.overlaps.push({id:p.id,title:p.title,location_label:p.location_label,prefixes:c}),n.get(p.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:c})}return n}function Xi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",c=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&c&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&c&&a===null){let d=Eh(n);return d===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${d} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:d,index:0},{bead_id:e,lane:d,index:1}]}}return!i&&!c?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function Eh(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Rp=new Set(["sh","bash","zsh","dash","ksh"]),Op=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Lp(e){let t=e.split("/");return t[t.length-1]||""}function Th(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Lp(n[0]);if(r!=="env")return Rp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Rp.has(Lp(s))}function Ch(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Rh(e){let t=[],n=0;Op.lastIndex=0;for(let r of e.matchAll(Op)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Ch(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Oh(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Ip(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",c=0,d=null,p=!1;function h(D,W){return W?Rh(D).map(S=>S.kind==="plain"?S.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${S.kind}"
            >${S.text}</span
          >`):D}function y(){if(!s)return l``;let D=o==="ready"&&Th(a),W=o==="ready"?a.split(`
`):[];return l`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>U()}
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
              @click=${()=>U()}
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
                  ${W.map((S,M)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${M+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${h(S,D)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function $(){Ve(y(),r)}async function E(){if(o!=="ready")return;let D=await un(a);ie(D?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",D?"success":"error")}function N(D){D.key==="Escape"&&s&&(D.preventDefault(),U())}function B(){p||(document.addEventListener("keydown",N),p=!0)}function Y(){p&&(document.removeEventListener("keydown",N),p=!1)}async function le(D,W=null){let S=++c;B(),s={...D},d=W||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",$(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ne=t?t():"";if(!ne){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",$();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",$();return}let Te="/api/repo-ops-script?workspace="+encodeURIComponent(ne)+"&lane="+encodeURIComponent(D.lane)+"&base_sha="+encodeURIComponent(D.base_sha);try{let be=await n(Te),H=await be.json().catch(()=>({}));if(S!==c)return;if((t?t():"")!==ne){U();return}if(!be.ok||!H||H.ok!==!0){o="error",i=Oh(H&&typeof H.error=="string"?H.error:""),$();return}s={lane:H.lane,base_sha:H.base_sha,path:H.path,base_ref:H.base_ref},a=String(H.content),o="ready",$()}catch{if(S!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",$()}}function U(){c+=1,Y(),s=null,a="",$();let D=d;d=null,D?.isConnected&&D.focus()}function q(){U(),r.remove()}return{open:le,close:U,destroy:q}}function Pp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let S=o();return typeof S.revision=="number"?S.revision:0}function i(S){t&&S&&S.queue&&typeof S.queue=="object"&&t.set(S.queue)}function c(){let S=o().workspace_info;return S&&typeof S=="object"?S:{}}function d(S,M){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${S}"
      >${M}</span
    >`}function p(S){if(typeof S!="number"||!Number.isFinite(S))return"";let M=S/6e4;return Number.isInteger(M)?`timeout ${M}\uBD84`:`timeout ${Math.round(S/1e3)}\uCD08`}function h(S){let M=p(S);return M?d("config",M):""}function y(S,M,ne){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${ne.script}
      @click=${Te=>{s&&s({lane:S,base_sha:M.base_sha,path:ne.script,base_ref:M.base_ref},Te.currentTarget)}}
    ></button>`}function $(){let S=o().repo_ops_opt_out;return{verify:S?.verify===!0,deploy:S?.deploy===!0}}function E(S,M){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!M}
        @change=${ne=>{le(S,!ne.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function N(S){let M=typeof S.base_sha=="string"?S.base_sha:"",ne=`${S.source_path||"repo-ops/config.toml"} @ ${S.base_ref||"?"}${M?`@${M.slice(0,7)}`:""}`,Te=$(),be=!!S.verify&&Te.verify,H=!!S.deploy&&Te.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${ne}</span>
      </p>
      <div
        class="worker-repo-ops__lane${be?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${S.verify?l`${y("verify",S,S.verify)}
              ${h(S.verify.timeout_ms)}
              ${be?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${be?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":S.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${S.verify?E("verify",Te.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${H?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${S.deploy?l`${y("deploy",S,S.deploy)}
              ${h(S.deploy.timeout_ms)}
              ${H?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${H?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":S.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${S.deploy?E("deploy",Te.deploy):""}
      </div>
    </section>`}function B(S){let M=S.repo_ops&&typeof S.repo_ops=="object"?S.repo_ops:null;return M&&(M.status==="resolved"||M.status==="absent")?N(M):M&&(M.status==="pending"||M.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function Y(S){if(!n)return;let M=await n("worker-auto-repair-toggle",{on:S,expected_revision:a()});if(i(M),M&&M.conflict){let ne=await n("worker-auto-repair-toggle",{on:S,expected_revision:a()});i(ne)}r()}async function le(S,M){if(!n)return;let ne=await n("worker-repo-ops-opt-out-toggle",{kind:S,opted_out:M,expected_revision:a()});if(i(ne),ne&&ne.conflict){let Te=await n("worker-repo-ops-opt-out-toggle",{kind:S,opted_out:M,expected_revision:a()});i(Te)}r()}let U={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function q(S,M,ne){return l`<div class="worker-repo-ops__policy-group" data-policy=${ne}>
      <div class="worker-repo-ops__policy-label">${S}</div>
      <ul class="worker-repo-ops__policy-list">
        ${M.map(Te=>l`<li data-token=${Te}>
              ${U[Te]||Te}
            </li>`)}
      </ul>
    </div>`}function D(S){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${S.map(M=>{let ne=[U[M.trigger]||M.trigger];return Number.isInteger(M.attempts_per_operation_attempt)?ne.push(`operation\uB2F9 ${M.attempts_per_operation_attempt}\uD68C`):Number.isInteger(M.attempts)?ne.push(`${U[M.budget]||M.budget} ${M.attempts}\uD68C`):Number.isInteger(M.sessions_per_user_action)&&ne.push(`${M.sessions_per_user_action}\uD68C`,U[M.user_actions]||M.user_actions),M.applies_when&&ne.push(U[M.applies_when]||M.applies_when),l`<li data-token=${M.id}>
            <strong>${U[M.id]||M.id}</strong>
            <span>${ne.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function W(){let S=o(),M=S.auto_repair!==!1,ne=S.repo_operation_policy&&typeof S.repo_operation_policy=="object"?S.repo_operation_policy:null,Te=Array.isArray(S.repo_operations)?S.repo_operations:[],be=Te.find(ke=>ke.state==="repairing"),H=Te.filter(ke=>ke.state==="failed"||ke.state==="repairing"),X=H.length?Math.min(...H.map(ke=>typeof ke.repair?.remaining=="number"?ke.repair.remaining:0)):ne?.auto_repair?.resolution_ladder?.find(ke=>ke.id==="auto_repair_session")?.attempts??1,he=Array.isArray(ne?.auto_repair?.resolution_ladder)?ne.auto_repair.resolution_ladder:[];return l`<section
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
      ${ne?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(ne.worker_automatic||[]).length} · 해결 사다리
                ${he.length} · 금지
                ${(ne.never_automatic||[]).length}</span
              >
            </summary>
            ${q("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",ne.worker_automatic||[],"worker-automatic")}
            ${ne.supported===!1||ne.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${ne.schema_version})`}
                </div>`:D(he)}
            ${q("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",ne.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${B(c())} ${W()}
      </details>`}}}var qp=20,Lh=5,Ih=new Set(["failed","repairing","running","queued","retry_pending"]),Dp={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Mp={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Ph(e,t,n=qp){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Dh(e){if(e.type==="cleanup")return!0;let t=e.operation;return Ih.has(t.state)&&!t.dismissed&&!t.superseded_by}function Mh(e,t,n={}){let r=Ph(e,t,1/0),s=n.expanded===!0?qp:Lh,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||Dh(i));return{visible:a,hidden:r.length-a.length}}function Np(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Nh(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Fp(e){let t=e.filter(n=>n.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>l`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function jp(e,t="",n=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function qh(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Mp,r)?Mp[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Fh(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ut(e.at):""}
      >${zo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Np(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Dp,t.kind)?Dp[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Bo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${$s(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Np(e)}"
          >${Nh(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?jp(_d(t.failure_kind,r)):""}
      ${qh(t)}
      ${Fp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Bo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function jh(e){let t=e.cleanup,n=yr(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ut(e.at):""}
      >${zo(e.at)||"\u2014"}</span
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
        ${Nd(t.step).map(r=>l`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${jp(Zo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Fp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Bh(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?jh(r):Fh(r))}
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
  </section>`}function Bp(e,t={}){let n=null;function r(){if(n===null){Ve(l``,e);return}let a=Mh(n.operations,n.cleanup_failures,{expanded:n.expanded});Ve(Bh({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var Uh=St("views:worker"),Wh="tab:worker:ready",zh="tab:worker:blocked",Hh="tab:worker:in-progress",Gh="tab:worker:resolved",Vh="tab:worker:closed",ua=1,Up=5;function Wp(e){return So(e).path.length>0}var Kh=new Set(["quick_fix","spec_backed","full_plan"]);function zp(e){return typeof e=="string"&&Kh.has(e)}var Kp="beads-ui.worker.candidate-filter",Qi={show_blocked:!1,spec:"all"};function Yh(){try{let e=window.localStorage.getItem(Kp);if(!e)return{...Qi};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Qi};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Qi}}}function Zh(e){try{window.localStorage.setItem(Kp,JSON.stringify(e))}catch{}}function Xh(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=n(i),d=r(i);c&&d?s.push(i):!c&&d?o+=1:c&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Qh=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Yp="bdui.worker.candidate_sort",Jh=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],da="spec";function ey(){try{let e=window.localStorage.getItem(Yp);return e==="board"||e==="created"||e==="spec"?e:da}catch{return da}}function ty(e){try{window.localStorage.setItem(Yp,e)}catch{}}var Zp="bdui.worker.done-range";function ny(){try{let e=window.localStorage.getItem(Zp);return gn(e)?e:ln}catch{return ln}}function ry(e){try{window.localStorage.setItem(Zp,e)}catch{}}var sy="(max-width: 640px)",Xp="beads-ui.worker.lane-collapsed",Os={queue:!0,done:!0};function oy(){try{let e=window.localStorage.getItem(Xp);if(!e)return{...Os};let t=JSON.parse(e);return!t||typeof t!="object"?{...Os}:{queue:typeof t.queue=="boolean"?t.queue:Os.queue,done:typeof t.done=="boolean"?t.done:Os.done}}catch{return{...Os}}}function ay(e){try{window.localStorage.setItem(Xp,JSON.stringify(e))}catch{}}function Hp(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function iy(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(fr):(r.sort(Zs(n)),t==="board"?r:[...r.filter(Wp),...r.filter(s=>!Wp(s))])}function ly(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function cy(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function Gp(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function uy(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function dy(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function py(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function fy(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function _y(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function Ji(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var my=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),gy=new Set(["waiting_metadata","reviewing","retrying"]);function by(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?Ut(r.next_at):"",c=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",c?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${c}`:""].filter(Boolean),live:!0}}default:return null}}function hy(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function yy(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let c=hy(e.terminal_reason);c&&i.push(`\uC6D0 \uC0AC\uC720: ${c}`);for(let d of t?t.details:[])i.push(d);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!my.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Vp(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function vy(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Vp(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Vp(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=uy(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Gp(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Gp(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function wy(e,t,n,r,s=null,o=null,a=null,i=!1,c=null,d=!0,p=null,h=null,y=null,$={},E=!1,N=!1,B={}){let Y=!!c&&c.position>0,le=!!c?.continuation_action&&c.continuation_action.continuation===null,U=!!c&&c.active===!0,q=c&&c.failure||null,D=py(c?c.waiting:null,y),W=n[e]||null,S=W&&W.gate?W.gate:null,M=W&&W.pr?W.pr:null,ne=fy(c?c.resolution:null),Te=_y(c?c.head_review:null),be=c&&c.head_review||null,H=by(y,be),X=yy(y,H),he=c&&c.authority||null,ke=!!be&&["pending","reviewing","revising"].includes(be.state),ge=!!y&&typeof y=="object"&&gy.has(y.phase),se=Y&&!U&&(be?.state==="failed"||!he||ge||he.source==="automatic"&&!N),Se=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ne?ne.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":D,ye=!!S&&S.base_badge==="\uCDA9\uB3CC",K=!!S&&S.enabled===!0,ee=Cs({bead_id:e,merge_sha:B.merge_sha,cleanup_cursor:B.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:B.repo_operations}),me=ia(ee),ve=o&&!ee&&(o.queueing??null)?o.queueing:null,Me=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!S&&S.tier==="merged",ae=i&&!!r&&!!S&&S.tier==="merged",He=se&&(K||ye||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||Me||ae),I=i&&ye&&d===!1,ce=Sn($,e,{external:i,merge_active:U||ee?.step==="merge",merge_queued:Y,conflict_active:!!a,cleanup_active:me,merged:!!r||S?.tier==="merged"}),Le=!!ce.operation,qe=!Me&&!!r&&r.step==="repo_operations",Ie=vy({continuation_required:le,queueing:ve,merge_step:ee,conflict_badge:Se,conflict_live:ne?.live===!0||a==="running",head_review:be&&Te?{...Te,state:be.state,failure_reason:be.failure_reason}:null,auto_resolution:H,recovery:X,cleanup_failed:r,cleanup_label:r?yr(r.step):null,base_exception:h,conflicting:ye,gate:S,receipt_check:W&&W.receipt_check?W.receipt_check:null,queue_failure:q,auto_skip:p,queued:Y,queue_active:U,queue_position:c?c.position:0,activity:Se?null:o&&o.activity||null}),We=Ie?.live===!0&&Ie.title?l`<span title=${Ie.title}>${Ie.label}</span>`:Ie?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ee?.active!==!0?aa(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:E,external:i,pr_number:M&&typeof M.number=="number"?M.number:null,pr_url:M&&typeof M.url=="string"?M.url:"",completion_badge:Ie?.live!==!0&&Ie?.title?Ie.label:null,completion_title:Ie?.title||"",completion_repair_pr_url:X?X.repair_pr_url:"",completion_repair_pr_number:X?X.repair_pr_number:null,badges:We?[We]:[],live_badge:Ie?.live===!0?We:null,usage:s,alert:Ie?.alert===!0,merge_action:S?.tier==="merged"&&!Me&&!ae||qe?!1:!Y||le||se,timeline_action:qe,cancel_action:Y&&!le,cancel_enabled:(!U||ke)&&!(X&&X.lock_actions),cancel_title:X&&X.lock_actions?`${X.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:U&&!ke?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ke?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ce,discard_action:ce.action,merge_step:ee,discard_enabled:ce.enabled,discard_title:ce.title,merge_enabled:!ee&&!ve&&!a&&!Le&&!h&&!(X&&X.lock_actions)&&!I&&!qe&&(K||ye||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||Me||ae||He||ge&&!U),merge_label:le?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Me||ae?"\uC815\uB9AC \uC7AC\uAC1C":ye&&!ee&&!Me?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":S?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":se?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Le?ce.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ce.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ce.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:le?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ve?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ee?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ee.label}`:ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":I?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Me?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ye?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":K?`\uBA38\uC9C0 (${S.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:S&&S.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${S&&S.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function el(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:d,openDoc:p,doneRange:h,onDoneRangeChange:y}=t,$=r?Qs(r,i):null,E=no({transport:n,uiOrderStore:i}),N=null,B=[],Y=Yh(),le=null,U=null,q={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},D=ey(),W=gn(h)?h:ny(),S=new Map;function M(){let _=Vn.find(w=>w.value===W);return _?_.label:"\uC624\uB298"}let ne=oy(),Te=!1,be=new Set,H=new Set,X=new Set,he=new Set,ke=new Set,ge={},se=null,Se=0,ye=null,K=[];function ee(_){return se===_?ge:{}}async function me(){if(!n)return;let _=d?.()||"";if(se===_||ye&&ye.key===_&&ye.generation===Se)return;let w=++Se;ye={key:_,generation:w};let m=null;try{m=await Promise.resolve(n("get-session-defaults",{}))}catch(A){if(w!==Se)return;ye=null,Uh("get-session-defaults failed: %o",A),Ue();return}w===Se&&(ge=m&&typeof m.values=="object"&&m.values!==null?{...m.values}:{},se=_,ye=null,Ue())}function ve(){se=null,Se+=1,me()}let Me=document.createElement("div");Me.className="worker-console";let ae=document.createElement("div");ae.className="worker-top";let He=document.createElement("div");He.className="worker-drawer-overlay",He.hidden=!0;let I=document.createElement("div");I.className="worker-drawer-overlay__backdrop";let ce=document.createElement("div");ce.className="worker-drawer-host";let Le=document.createElement("div");Le.className="worker-drawer-host",Le.hidden=!0,He.append(I,ce,Le);let qe=document.createElement("div");qe.className="worker-lanes-host",Me.append(ae,He,qe),e.appendChild(Me);let Ie=null,We=null,je=qr(ce,{transport:n,sessionLogStore:a,onClose:()=>{Ie=null,We=null,He.hidden=!0,Ue()}}),Ye=Bp(Le,{onClose:()=>{Le.hidden=!0,He.hidden=!0,Ue()}}),tt=Ip({getWorkspacePath:d||(()=>"")}),ct=d&&d()||"",_t=Pp({queueStore:s,transport:n,onChanged:()=>Ue(),onOpenScript:(_,w)=>{tt.open(_,w)}}),te=o?Tp(Me,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:d,onOpenTranscript:(_,w)=>_n(_,w)}):null;function J(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:ua,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Ce(){let _=J(),w=typeof _.serial_lane_count=="number"&&Number.isInteger(_.serial_lane_count)&&_.serial_lane_count>0?Math.min(_.serial_lane_count,5):0,m=Array.isArray(_.serial_lanes)?_.serial_lanes:[],A=[];for(let f of m){if(A.length>=w)break;!f||typeof f.id!="string"||!/^s[1-5]$/.test(f.id)||!Array.isArray(f.entries)||A.push({id:f.id,label:`\uC9C1\uB82C ${f.id.slice(1)}`,count:f.entries.length})}return A.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(_.queue)?_.queue:[]).length},...A]}function Ke(_){if(!le||!_.some(m=>m.id===le))return null;let w=Ce();return w?{bead_id:le,lanes:w}:null}function Oe(){let _=J();return typeof _.revision=="number"?_.revision:0}function we(_){_&&_.queue&&s&&s.set(_.queue)}function Be(){let _=J().queue;return Array.isArray(_)?_.length:0}async function Ge(_,w,m){if(!n)return;let A=()=>({bead_id:_,...w==="parallel"?{}:{lane:w},...m===void 0?{}:{index:m},expected_revision:Oe()}),u=await n("worker-queue-place",A());we(u),u&&u.conflict&&await n("worker-queue-place",A()).then(we)}async function Qe(_,w,m){if(!n)return;let A=()=>({bead_id:_,...w==="parallel"?{}:{lane:w},to_index:m,expected_revision:Oe()}),u=await n("worker-queue-reorder",A());we(u),u&&u.conflict&&await n("worker-queue-reorder",A()).then(we)}async function Ze(_){if(!n)return;let w=await n("worker-queue-remove",{bead_id:_,expected_revision:Oe()});we(w),w&&w.conflict&&await n("worker-queue-remove",{bead_id:_,expected_revision:Oe()}).then(we)}async function rt(_){if(!n||!_)return;let w=await n("worker-attempt-pause",{attempt_id:_});w&&w.paused===!1&&w.reason&&ie(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function yt(_){if(!n||!_)return;let w=await Pr();if(w===null)return;let m=async(u={})=>await n("worker-attempt-resume",{attempt_id:_,expected_revision:Oe(),...w!==""?{instructions:w}:{},...u}),A=await m();we(A),A&&A.conflict&&(A=await m(),we(A)),A=await Mn(A,(u,f)=>m({continuation:u,decision_token:f}),{onResult:we,refresh:()=>m()}),A&&A.resumed===!1&&!A.conflict&&A.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${A.reason}`,"error",2400)}async function Et(_){if(!n||!_)return;let w=await n("worker-attempt-dismiss",{attempt_id:_,expected_revision:Oe()});we(w),w&&w.conflict&&(w=await n("worker-attempt-dismiss",{attempt_id:_,expected_revision:Oe()}),we(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&ie(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function it(_,w,m=!0){if(!n)return null;let A=n,u=await A(_,{...w,expected_revision:Oe()});return we(u),u&&u.conflict&&m&&(u=await A(_,{...w,expected_revision:Oe()}),we(u)),u}async function Ot(_){if(!n||!_)return;let w=J().merge_queue?.find(A=>A.bead_id===_)?.continuation_action;if(w?.mismatch&&w.continuation===null){await ze(_,w.mismatch);return}be.add(_),Ue();let m;try{m=await it("worker-merge-queue-add",{bead_id:_})}catch{ie("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{be.delete(_),Ue()}if(!(!m||m.applied)){if(m.conflict){ie("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ie(dy(m.reason),"error",2400)}}async function ut(_){if(!(!n||!_||H.has(_))){H.add(_),Ue();try{let w=await n("worker-cleanup-retry",{bead_id:_,expected_revision:Oe()});we(w),w&&!w.retried&&!w.conflict&&w.reason&&ie(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{H.delete(_),Ue()}}}async function ze(_,w){let m=await Mn({continuation_mismatch:w},(u,f)=>it("worker-merge-queue-add",{bead_id:_,continuation:u,decision_token:f},!1)),A=m?.queue?.merge_queue?.find(u=>u.bead_id===_)?.continuation_action;if(m?.applied!==!0&&A?.continuation===null&&A.mismatch){await ze(_,A.mismatch);return}m&&m.applied===!1&&!m.conflict&&ie("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Re(_){if(!n)return;let w=await it("worker-merge-auto-toggle",{on:_});!w||w.conflict||ie(_?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",_?"success":"info",2400)}async function P(_){if(!n||!_)return;let w=await it("worker-merge-queue-remove",{bead_id:_});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&ie("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function V(){await it("worker-merge-queue-remove",{all:!0})}async function de(_,w=null,m="unmerged",A=null){if(!n||!_)return;let u=xs(_,m);if(!(!!A||typeof globalThis.confirm!="function"||globalThis.confirm(u)))return;let v=await n("worker-discard",{bead_id:_,...w?{attempt_id:w}:{},...A?{operation_id:A}:{},expected_revision:Oe()});if(we(v),v&&v.conflict&&(v=await n("worker-discard",{bead_id:_,...w?{attempt_id:w}:{},...A?{operation_id:A}:{},expected_revision:Oe()}),we(v)),v&&v.discarded===!0){ie(Ho(v),"success",5e3);return}if(v&&v.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${v.reason}`,"error",2800);return}if(v&&v.accepted&&v.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(v&&v.accepted&&!v.discarded){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${v.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}v&&!v.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function C(_,w,m){if(!(!n||!w||!m||he.has(w))){he.add(w),Ue();try{let A=await n(_,{bead_id:w,action_id:m,expected_revision:Oe()});we(A),A?.conflict?ie("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!A?.ok&&A?.reason&&ie(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(A.reason)}`,"error",2800)}finally{he.delete(w),Ue()}}}async function G(_,w){if(!n||!w||X.has(w))return;X.add(w),Ue();let m;try{let A=async(u={})=>await n(_,{bead_id:w,expected_revision:Oe(),...u});m=await A(),we(m),m&&m.conflict&&(m=await n(_,{bead_id:w,expected_revision:Oe()}),we(m)),_==="worker-revise-fix"&&(m=await Mn(m,(u,f)=>A({continuation:u,decision_token:f}),{onResult:we,refresh:()=>A()}))}finally{X.delete(w),Ue()}if(!(!m||m.conflict)){if(m.ok){ie(_==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ie(`\uCC98\uBD84 \uAC70\uBD80: ${m.reason||""}`,"error",3e3)}}async function pe(_){if(!n)return;let w=await n("worker-automation-toggle",{on:_,expected_revision:Oe()});we(w),w&&w.conflict&&await n("worker-automation-toggle",{on:_,expected_revision:Oe()}).then(we)}async function g(_){if(!n||!_)return;let w=await n("worker-repo-operation-repair",{operation_id:_});if(we(w),w&&w.ok===!1){ie(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&ie("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function k(_){if(!n||!_)return;let w=await n("worker-repo-operation-dismiss",{operation_id:_});we(w),w&&w.ok===!1&&ie(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function O(_){if(!n||!Number.isFinite(_))return;let w=Math.max(ua,Math.floor(_)),m=await n("worker-queue-set-slots",{slots:w,expected_revision:Oe()});we(m),m&&m.conflict&&await n("worker-queue-set-slots",{slots:w,expected_revision:Oe()}).then(we)}async function Q(_){if(!n||!Number.isInteger(_)||_<1||_>Up)return;let w=J(),m=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).slice(_).reduce((f,v)=>f+(Array.isArray(v?.entries)?v.entries.length:0),0),A=()=>({count:_,expected_revision:Oe()}),u=await n("worker-queue-set-serial-lane-count",A());we(u),u&&u.conflict&&(u=await n("worker-queue-set-serial-lane-count",A()),we(u)),u&&u.applied&&m>0&&ie(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${m}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let Z="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function fe(_,w){let m=Xi(_,w.id,q);return{id:w.id,title:w.title,location_label:w.location_label,prefixes:w.prefixes,action:m.kind==="note"?{kind:"note",text:m.text}:m.kind==="disabled"?{kind:"disabled",label:Z,title:m.title}:{kind:"place",label:Z,title:m.title}}}function Ee(_,w){if(!U||U.bead_id!==_)return null;let m=U.counterpart_id,A=w.filter(u=>u.id===m);return A.length===0?null:{rows:A.map(u=>fe(_,u))}}async function $e(_,w){let m=Xi(_,w,q);if(U=null,m.kind!=="ops"){Ue();return}let A=Oe();for(let u of m.ops){let f=await st(u,A);if(f===null)break;A=f}Ue()}async function st(_,w){if(!n)return null;try{let m=await n("worker-queue-place",{bead_id:_.bead_id,lane:_.lane,index:_.index,expected_revision:w});if(we(m),m&&m.conflict)return ie("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!m||m.applied!==!0)return ie(m&&typeof m.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${m.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let A=m.queue?m.queue.revision:void 0;return typeof A!="number"?(ie("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):A}catch(m){return ie(m instanceof Error&&m.message?m.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function dt(){let _=J(),w=$?$.selectBoardColumn(Wh,"ready"):[],m=$?$.selectBoardColumn(zh,"blocked"):[],A=$?$.selectBoardColumn(Vh,"closed"):[],u=$?$.selectBoardColumn(Hh,"in_progress"):[],f=$?$.selectBoardColumn(Gh,"resolved"):[],v=eo([...w,...m,...u,...f,...A]),x=new Map;for(let b of[...w,...m,...u])b&&b.id&&!x.has(b.id)&&x.set(b.id,b);let j={...ee(d?.()||"")};for(let b of["orchestration_model","orchestration_effort","orchestration_speed"]){let F=_[b];typeof F=="string"&&(j[b]=F)}function z(b,F){let oe=x.get(b);if(!oe)return null;let Fe=oe.metadata&&typeof oe.metadata=="object"?oe.metadata:{},Xe=oe.workflow?.route,kt=Fe.route,Tt=zp(Xe)?Xe:zp(kt)?kt:null;return rn({pin:Fe,global:j,execution_defaults:_.execution_defaults??null,runner_catalog:_.runner_catalog??null,route:Tt,controller_runtime:F})}function re(b){let F=b.runner||null,oe=z(b.bead_id,F),Fe=As(b),Xe=oe?tr(oe,F):null;return Fe||Xe?{orchestration:Fe,worker:Xe}:null}let _e=new Map;function Je(b){if(_e.has(b))return _e.get(b)??null;let F=z(b,null),oe=null;if(F){let Fe=An(_.runner_catalog??null,F.orchestration_model.value??""),Xe=Fe===null?F:z(b,Fe),kt=hr(Xe,_.runner_catalog??null),Tt=tr(Xe,Fe);oe=kt||Tt?{orchestration:kt,worker:Tt}:null}return _e.set(b,oe),oe}function jt(b){let F=to(v,b);return F.total===0?null:F}let In=_.bead_titles||{},Bt=new Map;for(let[b,F]of Object.entries(In))typeof F=="string"&&F.length>0&&Bt.set(b,F);for(let b of[...w,...m])Bt.set(b.id,b.title||b.id);let Tn=new Map;for(let b of[...w,...m,...u,...f,...A])b&&b.id&&typeof b.from_id=="string"&&Tn.set(b.id,b.from_id);let on=new Map;for(let b of[...w,...m,...u,...f,...A])b&&b.id&&typeof b.priority=="number"&&on.set(b.id,b.priority);let Ls=_.bead_times&&typeof _.bead_times=="object"&&!Array.isArray(_.bead_times)?_.bead_times:{},sr=_.bead_labels&&typeof _.bead_labels=="object"&&!Array.isArray(_.bead_labels)?_.bead_labels:{},zn=_.bead_workflow&&typeof _.bead_workflow=="object"&&!Array.isArray(_.bead_workflow)?_.bead_workflow:{},Hn=new Map;for(let[b,F]of Object.entries(sr))Array.isArray(F)&&Hn.set(b,Ki(F));for(let b of[...w,...m]){let F=b.labels;Array.isArray(F)&&!Hn.has(b.id)&&Hn.set(b.id,Ki(F))}let vr=new Map,Hr=o?.get()?.last_good?.result?.groups;for(let b of Array.isArray(Hr)?Hr:[]){if(b?.eligible!==!0||!Array.isArray(b.members))continue;let F=b.members.map(Fe=>{let Xe=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).find(kt=>kt.entries.some(Tt=>Tt.bead_id===Fe));return Xe?Xe.id:null});if(!(F.every(Fe=>Fe!==null)&&new Set(F).size===1))for(let Fe of b.members)vr.set(Fe,b.members.filter(Xe=>Xe!==Fe))}let Is=_.bead_blocked_by&&typeof _.bead_blocked_by=="object"&&!Array.isArray(_.bead_blocked_by)?_.bead_blocked_by:{},wr=new Map;for(let[b,F]of Object.entries(Ls))F&&typeof F=="object"&&wr.set(b,F);for(let b of[...w,...m])wr.set(b.id,{created_at:b.created_at,updated_at:b.updated_at});let or=b=>wr.get(b)||{},Gn=_.pr_wait||[],Gr=_.pr_observations||{},Ne=_.pr_activity||{},at=_.cleanup_failed||{},an=Object.entries(at).map(([b,F])=>({bead_id:b,step:F&&F.step?F.step:"",reason:F&&F.reason?F.reason:"",at:F&&typeof F.at=="number"?F.at:null,detail:F&&typeof F.detail=="string"?F.detail:null,output_tail:F&&typeof F.output_tail=="string"&&F.output_tail?F.output_tail:void 0,log_path:F&&typeof F.log_path=="string"&&F.log_path?F.log_path:void 0,retry_count:F&&typeof F.retry_count=="number"&&Number.isInteger(F.retry_count)&&F.retry_count>0?F.retry_count:0,failure_code:F&&typeof F.failure_code=="string"?F.failure_code:void 0,subject_id:F&&typeof F.subject_id=="string"?F.subject_id:void 0,repair_eligible:!!(F&&F.repair_eligible),repair:F&&F.repair?F.repair:void 0})),pa=_.queue||[],df=new Set([...pa.map(b=>b.bead_id),...(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).flatMap(b=>(Array.isArray(b?.entries)?b.entries:[]).map(F=>F.bead_id)),...Gn.map(b=>b.bead_id),..._.done.map(b=>b.bead_id)]),pf=new Set(m.map(b=>b.id)),ff=i?i.get()?.order||{}:{},sl=new Set,ol=[];for(let b of[...w,...m])df.has(b.id)||sl.has(b.id)||ly(b)||(sl.add(b.id),ol.push(b));B=iy(ol,D,ff);let _f=_.admission||{},al=b=>{let F=_f[b];if(!F)return"";if(F.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let oe=typeof F.reason=="string"?F.reason:"",Fe=oe.indexOf(":");return Fe>0&&Fe<oe.length-1?`\u26D4 ${oe.slice(0,Fe)} (${oe.slice(Fe+1)})`:`\u26D4 ${oe}`},mf=B.map(b=>{let F=So(b),oe=F.path.length>0,Fe=b.workflow?.route==="quick_fix"||b.metadata&&b.metadata.route==="quick_fix",Xe=!Object.hasOwn(b,"description")||typeof b.description=="string"&&b.description.trim().length>0,kt=Object.hasOwn(b,"labels")&&Ep(b.labels),Tt=!kt&&(Fe?Xe:oe&&!F.conflict),ft=pf.has(b.id),tn=[];ft&&tn.push(cy(b)),Fe&&!Xe?tn.push("missing_description"):!Fe&&F.conflict?tn.push("spec_id_conflict"):!Fe&&!oe&&tn.push("spec \uC5C6\uC74C");let Bs=al(b.id);return Bs&&tn.push(Bs),{id:b.id,title:b.title||b.id,reason:tn.join(" \xB7 "),draggable:Tt,lane:"candidate",created_at:b.created_at,updated_at:b.updated_at,workflow:b.workflow,is_quick_fix:Fe,status:b.status,worker_ineligible:kt,blocked:ft,has_spec:oe,exec_chips:Je(b.id),from_id:b.from_id||void 0,priority:on.get(b.id)}}),fa=Xh(mf,Y),_a=fa.visible,gf=_.revise_parked||{},Ps=_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},ma=(b,F)=>b.map((oe,Fe)=>{let Xe=F!=="done",kt=F!=="done"&&F!=="queue",Tt=Xe?gf[oe.bead_id]:null,ft=Xe?Sn(Ps,oe.bead_id):null,tn=ft?.operation?ft:null,Bs=Xe&&Hn.get(oe.bead_id)===!0,Ml=Is[oe.bead_id]||[],xa=_.admission&&typeof _.admission=="object"?_.admission[oe.bead_id]:null,Aa=Xe?cd(xa,!!tn||he.has(oe.bead_id)):null,Sf=Xe&&!Aa?al(oe.bead_id):null,Ef=Xe?[Sf]:[],Nl=Xe&&Ml.length>0&&typeof xa?.reason=="string"&&xa.reason.startsWith("not_ready")?[`\u23F8 ${Ml.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Sa=Xe?vr.get(oe.bead_id):void 0;return Sa&&Sa.length>0&&Nl.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Sa.join(", ")}\uC640`),{id:oe.bead_id,title:Bt.get(oe.bead_id)||oe.bead_id,reason:Ef.filter(Boolean).join(" \xB7 "),draggable:Xe&&!tn&&!Aa,done:F==="done",lane:F,seq:kt?Fe+1:void 0,worker_serial:Bs,discard:tn,stale_work:Aa,badges:[...Nl,...Tt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...F==="done"?Uo(_.attempts||{},oe.bead_id):[]],alert:!!Tt,revise_action:!!Tt,revise_enabled:!!Tt&&!tn&&!X.has(oe.bead_id),revise_title:Tt?Tt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Tt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:F==="done"?bn(_.attempts||{},oe.bead_id):null,work_ms:F==="done"?Wo(_.attempts||{},oe.bead_id):null,done_at:F==="done"&&typeof oe.added_at=="number"?oe.added_at:void 0,exec_chips:Xe?Je(oe.bead_id):null,workflow:Xe&&zn[oe.bead_id]||null,from_id:Tn.get(oe.bead_id)||void 0,priority:on.get(oe.bead_id),...or(oe.bead_id)}}),kr=_.attempts?Object.values(_.attempts).filter(Wr):[],ga=new Set;for(let b of kr)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&ga.add(b.resumed_from);let il=new Map;for(let b of kr)il.set(b.bead_id,b.attempt_id);let Vr=new Map;for(let b of kr)Vr.set(b.attempt_id,b);function ba(b){let F=new Set,oe=b;for(;oe&&!F.has(oe.attempt_id);){if(oe.conflict_resolution===!0)return!0;F.add(oe.attempt_id),oe=typeof oe.resumed_from=="string"&&oe.resumed_from.length>0&&Vr.get(oe.resumed_from)||null}return!1}let Ds=typeof _.declared_base=="string"?_.declared_base:null;function bf(b){let F=null;for(let oe of kr)!oe||oe.bead_id!==b||ba(oe)||(F===null||(typeof oe.started_at=="number"?oe.started_at:0)>=(typeof F.started_at=="number"?F.started_at:0))&&(F=oe);return F&&typeof F.target_base=="string"?F.target_base:null}let ha=[],Ms=[],hf=Sp(_),ll=b=>{let F=typeof b.session_id=="string"&&b.session_id.length>0,oe=ga.has(b.attempt_id);return{eligible:F&&!oe,reason:F?oe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},vn=null;for(let b of kr){let F=b.status==="paused"&&!ga.has(b.attempt_id);if(b.status==="running"||F)Ms.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:Bt.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,paused:F,conflict_resolution:ba(b),base_exception:Ji(Ds,b.target_base),can_pause:typeof b.session_id=="string"&&b.session_id.length>0,discard:Sn(Ps,b.bead_id,{attempt_id:b.attempt_id}),workflow:zn[b.bead_id]||null,priority:on.get(b.bead_id),usage:bn(_.attempts||{},b.bead_id),rollup:jt(b.bead_id),rollup_expanded:ke.has(b.bead_id),exec_chips:re(b),...or(b.bead_id)});else if((b.status==="failed"||b.status==="orphaned")&&hf(b)){let oe=ll(b);ha.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:Bt.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,failed:!0,status:b.status,status_label:b.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Sn(Ps,b.bead_id,{attempt_id:b.attempt_id}),resume_eligible:oe.eligible,resume_reason:oe.reason,conflict_resolution:ba(b),base_exception:Ji(Ds,b.target_base),workflow:zn[b.bead_id]||null,priority:on.get(b.bead_id),usage:bn(_.attempts||{},b.bead_id),rollup:jt(b.bead_id),rollup_expanded:ke.has(b.bead_id),exec_chips:re(b),...or(b.bead_id)}),vn=b}}let cl=new Set([...ha,...Ms].map(b=>b.bead_id));for(let b of Array.isArray(_.session_active)?_.session_active:[]){let F=b&&b.bead_id;typeof F!="string"||F.length===0||cl.has(F)||(cl.add(F),Ms.push({bead_id:F,attempt_id:null,kind:"session",title:b.title||Bt.get(F)||F,status:"in_progress",started_at:Cn(b.started_at)??Cn(b.updated_at),updated_at:Cn(b.updated_at),workflow:b.workflow||null,priority:on.get(F),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let $r=[...ha,...Ms].map(b=>{let F=Vr.get(b.attempt_id),oe=F?.quickfix_landing;if(F?.quickfix_lane!==!0||!oe||typeof oe!="object")return b;let Fe=typeof oe.reason=="string"&&oe.reason.length>0?oe.reason:null,Xe=Cs({bead_id:F.bead_id,merge_sha:oe.head_sha,cleanup_cursor:oe.cursor,cleanup_failed:Fe?{step:oe.cursor,reason:Fe}:null,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]});return Xe?{...b,landing:Xe}:b}),ul=null;if(vn){let b=ll(vn),F=vn.cause_detail;ul={bead_id:vn.bead_id,repo:vn.repo||"",reason:vn.cause||vn.status,cause_detail:F&&typeof F.reason=="string"?{reason:F.reason,command:typeof F.command=="string"?F.command:null}:null,resume_attempt_id:vn.attempt_id,resume_eligible:b.eligible,resume_reason:b.reason,discard:Sn(Ps,vn.bead_id,{attempt_id:vn.attempt_id})}}let dl=new Set($r.map(b=>b.bead_id)),ya=Array.isArray(_.merge_queue)?_.merge_queue:[],pl=new Map,fl=new Map,_l=new Map,ml=new Map,gl=new Map;ya.forEach((b,F)=>{b&&typeof b.bead_id=="string"&&(pl.set(b.bead_id,F+1),fl.set(b.bead_id,b.resolution),_l.set(b.bead_id,b.continuation_action||null),ml.set(b.bead_id,b.head_review||null),gl.set(b.bead_id,b.authority||null))});let xr=_.merge_queue_state||{active:null,failures:{}},yf=xr.failures||{},bl=xr.waiting&&typeof xr.waiting.bead_id=="string"&&typeof xr.waiting.reason=="string"?xr.waiting:null,vf=_.auto_merge_skips||{},hl=b=>{let F=vf[b];if(!F)return null;let oe=Gr[b],Fe=oe&&oe.pr?oe.pr.head_sha:null;return Fe&&Fe===F.head_sha?F.reason||"":null},Ns=new Map;for(let b of $r)b.failed!==!0&&b.conflict_resolution&&(b.paused?Ns.has(b.bead_id)||Ns.set(b.bead_id,"paused"):Ns.set(b.bead_id,"running"));let yl=$r.filter(b=>b.kind!=="session"&&!b.paused&&b.failed!==!0).length,vl=(_.workspace_info||{}).slots,wl=typeof vl=="number"?vl:typeof _.slots=="number"?_.slots:ua,wf=yl>wl,qs=dr(W),kf=(Array.isArray(_.done)?_.done.slice():[]).filter(b=>qs===void 0||typeof b.added_at!="number"||b.added_at>=qs).sort((b,F)=>(F.added_at||0)-(b.added_at||0)),Kr=ma(kf,"done"),$f=new Set((Array.isArray(_.done)?_.done:[]).map(b=>b?.bead_id).filter(b=>typeof b=="string")),kl=[],xf=d?.()||"";for(let b of A){let F=Cn(b.closed_at);if(typeof b.id!="string"||$f.has(b.id)||F===null||qs!==void 0&&F<qs||typeof b.comment_count!="number"||b.comment_count<=0)continue;let oe=`${xf}\0${b.id}\0${String(b.updated_at)}\0${b.comment_count}`,Fe=S.get(oe);Fe===void 0&&n&&(S.set(oe,"pending"),Promise.resolve(n("get-comments",{id:b.id})).then(Xe=>{let kt=Array.isArray(Xe)&&Xe.some(Tt=>Eo(typeof Tt?.text=="string"?Tt.text:"")?.lane==="session");S.set(oe,kt?"session":"not-session"),Ue()}).catch(()=>{S.set(oe,"failed"),Ue()})),Fe==="session"&&kl.push({id:b.id,title:b.title||b.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:F,created_at:b.created_at,updated_at:b.updated_at})}Kr.push(...kl),Kr.sort((b,F)=>(F.done_at||0)-(b.done_at||0));let Fs={};for(let b of Nn)Fs[b]=0;let $l=!1,xl=0,va=0,Al=0;for(let b of Kr){let F=b.usage;if(F&&typeof F=="object"){let oe=!1;for(let Fe of Nn)Number.isFinite(F[Fe])&&(Fs[Fe]+=F[Fe],$l=!0,oe=!0);oe&&(va+=1,Number.isFinite(F.total_cost_usd)&&(xl+=F.total_cost_usd,Al+=1))}}va>0&&Al===va&&(Fs.total_cost_usd=xl);let Sl=Kr.map(b=>b.usage).filter(b=>b&&typeof b=="object"&&b.providers),Af=Sl.length>0?Wt(po(Sl)):$l?qn(Fs):null,El=_.lane_states&&typeof _.lane_states=="object"&&!Array.isArray(_.lane_states)?_.lane_states:{},Tl=Array.isArray(_.serial_lanes)?_.serial_lanes:[],Cl=b=>{if(Gn.some(Fe=>Fe.bead_id===b))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let F=kr.filter(Fe=>Fe&&Fe.bead_id===b),oe=F.length>0?F[F.length-1].status:null;return oe==="failed"||oe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":oe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},js=Tl.filter(b=>b&&typeof b.id=="string"&&Array.isArray(b.entries)).map((b,F)=>{let oe=El[b.id]||{},Fe=new Map((Array.isArray(oe.corrections)?oe.corrections:[]).filter(ft=>ft&&typeof ft.bead_id=="string"&&typeof ft.after=="string").map(ft=>[ft.bead_id,ft.after])),Xe=ma(b.entries.filter(ft=>!dl.has(ft.bead_id)),b.id).map(ft=>Fe.has(ft.id)?{...ft,badges:[`\u{1F517} ${Fe.get(ft.id)} \uB4A4 (blocks \uC790\uB3D9)`,...ft.badges]}:ft),kt=Array.isArray(oe.occupied_by)?oe.occupied_by.filter(ft=>typeof ft=="string"):[],Tt=kt.map(ft=>({id:ft,title:Bt.get(ft)||ft,draggable:!1,lane:b.id,ghost:!0,badges:[Cl(ft)]}));return{id:b.id,index:F+1,rows:[...Tt,...Xe],occupied:kt.length>0,badge:kt.length>0?Cl(kt[0]):"\uB300\uAE30",cycle:oe.cycle===!0}}),Rl=typeof _.serial_lane_count=="number"?_.serial_lane_count:js.length,wa=ma(pa.filter(b=>!dl.has(b.bead_id)),"queue"),Ol=new Map,Ll=new Set;for(let[b,F]of Object.entries(El)){if(!/^s[1-5]$/.test(b))continue;let oe=F&&Array.isArray(F.occupied_by)?F.occupied_by:[];for(let Fe of oe)typeof Fe=="string"&&Ol.set(Fe,b);oe.length>0&&Ll.add(b)}let Ar=[];for(let b of $r)typeof b.bead_id=="string"&&Ar.push({id:b.bead_id,title:Bt.get(b.bead_id)||b.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ol.get(b.bead_id)??null});for(let b of js)for(let F of b.rows)F.ghost!==!0&&Ar.push({id:F.id,title:F.title,location_label:`${b.id} #${F.seq??""}`.trim(),kind:"serial",lane_id:b.id});wa.forEach((b,F)=>{Ar.push({id:b.id,title:b.title,location_label:`#${F+1}`,kind:"parallel",lane_id:null})});for(let b of _a)Ar.push({id:b.id,title:b.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let Il={};for(let b of Tl)b&&typeof b.id=="string"&&Array.isArray(b.entries)&&(Il[b.id]=b.entries.length);let ka=new Map;for(let b of Ar)ka.has(b.id)||ka.set(b.id,b);q={members_by_id:ka,serial_raw_lengths:Il,serial_lane_count:Rl,occupied_lanes:Ll};let Pl=Cp(_.bead_scope,Ar),$a=(b,F)=>{let oe=Pl.get(b.id);if(!oe||oe.overlaps.length===0&&!oe.scope_missing)return b;let Fe=Ee(b.id,oe.overlaps);return b.dependency_chips={...b.dependency_chips||{},...oe.overlaps.length>0?{overlaps:oe.overlaps}:{},...oe.scope_missing&&F!=="running"?{scope_missing:!0}:{},...Fe?{popover:Fe}:{}},b};for(let b of wa)$a(b,"queue");for(let b of js)for(let F of b.rows)F.ghost!==!0&&$a(F,b.id);for(let b of _a)$a(b,"candidate");let Dl=new Map;for(let b of $r){let F=typeof b.bead_id=="string"?b.bead_id:"";if(F.length===0)continue;let oe=b.kind==="session",Fe=Pl.get(F),Xe=Fe&&Fe.overlaps.length>0?Fe.overlaps:null,kt=typeof b.attempt_id=="string"&&b.attempt_id.length>0?Vr.get(b.attempt_id):void 0,Tt=kt&&kt.last_activity&&typeof kt.last_activity=="object"?kt.last_activity:null,ft=kt&&Array.isArray(kt.legs)?kt.legs:[];if(!Xe&&!Tt&&ft.length===0&&!oe)continue;let tn=Xe?Ee(F,Xe):null;Dl.set(F,{...Tt?{last_activity:Tt}:{},...ft.length>0?{legs:ft}:{},...Xe?{dependency_chips:{overlaps:Xe,...tn?{popover:tn}:{}}}:{}})}return{queue:_,idToTitle:Bt,candidates:_a,candidate_hidden:{blocked:fa.hidden_blocked,spec:fa.hidden_spec},running:$r,live_count:yl,slots:wl,over_cap:wf,failure:ul,waiting:wa,serial_lanes:js,serial_lane_count:Rl,running_overlays:Dl,pr_wait:Gn.map(b=>wy(b.bead_id,Bt.get(b.bead_id)||b.bead_id,Gr,at[b.bead_id]||null,bn(_.attempts||{},b.bead_id),Ne[b.bead_id]||(be.has(b.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:H.has(b.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Ns.get(b.bead_id)||null,b.external===!0,{position:pl.get(b.bead_id)||0,active:xr.active===b.bead_id,failure:yf[b.bead_id]||null,waiting:bl?.bead_id===b.bead_id?bl.reason:null,resolution:fl.get(b.bead_id),continuation_action:_l.get(b.bead_id),head_review:ml.get(b.bead_id)||null,authority:gl.get(b.bead_id)||null},b.wt_present!==!1,_.auto_merge===!0?hl(b.bead_id):null,Ji(Ds,bf(b.bead_id)),_.completion_status&&typeof _.completion_status=="object"&&!Array.isArray(_.completion_status)&&_.completion_status[b.bead_id]||null,_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},Vr.get(il.get(b.bead_id)||"")?.worker_serial===!0,_.auto_merge===!0,{merge_sha:b.merge_sha,cleanup_cursor:b.cleanup_cursor,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]})).map(b=>({...b,workflow:zn[b.id]||null,priority:on.get(b.id),...or(b.id)})),merge_queue_length:ya.length,merge_queue_running:ya.length>0,auto_excluded:Gn.map(b=>b.bead_id).filter(b=>hl(b)!==null),declared_base:Ds,done:Kr,token_total:Af,cleanup_failures:an,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]}}function xe(){let w=!!o?.get()?.job,m=!w&&o?.isPending?.()===!0,A=w?"\uBD84\uC11D \uC911":m?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${A?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${A?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${A?l`<span class="worker-analysis-btn__badge">${A}</span>`:""}
    </button>`}function bt(_){let w=_.waiting.length>0?_.waiting[0].id:"\u2014",m=l`<button
      type="button"
      class="worker-play${_.queue.auto_advance?" is-active":""}"
    >
      ${_.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,A=fn(_),u=_.over_cap?l`<span
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
          min=${ua}
          step="1"
          .value=${String(_.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Up},(re,_e)=>_e+1).map(re=>l`<option
                value=${String(re)}
                ?selected=${_.serial_lane_count===re}
              >
                ${re}
              </option>`)}
        </select>
      </label>
      ${o?xe():""} `,j=gd({failure:_.failure}),z=ld(_.repo_operations,_.cleanup_failures);return Te?l`<div class="worker-ribbon">
          ${m} ${A}
          <div class="worker-kpi worker-kpi--ribbon">${u}${f}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${x}</div>
          <div class="worker-kpi">${v}</div>
        </div>
        ${z}${_t.template()}${j}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${m}${A}${x}</div>
        <div class="worker-kpi">
          ${u}${f}${v}
          ${(Array.isArray(_.token_total)?_.token_total:_.token_total?[{label:_.token_total,tooltip:`${M()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(re=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${re.tooltip}
                >${M()} 완료 · 누적 ${re.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${z}${_t.template()}${j}`}function gt(_){if(_.running.length===0&&_.pr_wait.length===0)return"";let w=_.running.some(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0);return l`<section
      class="worker-now${w?" worker-pane--live":""}"
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
      ${_.running.length>0?Li(_.running,Date.now(),Ie,_.running_overlays):""}
      ${_.pr_wait.map(m=>Qn(m))}
    </section>`}function qt(_){let w=_.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${Y.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Qh.map(m=>l`<button
              type="button"
              class="worker-filter__chip${Y.spec===m.value?" is-active":""}"
              data-spec=${m.value}
              aria-pressed=${Y.spec===m.value?"true":"false"}
            >
              ${m.label}
            </button>`)}
        ${w.spec>0?l`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function Gt(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${D}
    >
      ${Jh.map(_=>l`<option value=${_.value} ?selected=${D===_.value}>
            ${_.label}
          </option>`)}
    </select>`}function Mt(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${W}
      >
        ${Vn.map(_=>l`<option value=${_.value} ?selected=${W===_.value}>
              ${_.label}
            </option>`)}
      </select>
    </div>`}function Pt(_){let w=l`<span
      class="worker-lane__badge${_.occupied?" worker-lane__badge--held":""}"
      >${_.badge}</span
    >`,m=_.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return yn({id:`worker-pane-lane-${_.id}`,lane:_.id,title:`\uC9C1\uB82C ${_.index}`,items:_.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:w,controls:m})}function fn(_){let w=_.queue.auto_merge===!0;if(_.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${_.merge_queue_length}
      </button>`;if(w)return l`<button
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
    </button>`}function At(_){let w=yn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:_.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Gt(),controls:qt(_),place_menu:Ke(_.candidates),onOpenDoc:p?(m,A)=>p(A):void 0});return Te?l`<div class="worker-lanes worker-lanes--mobile">
        ${gt(_)}
        ${yn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:ne.queue,preview:Hp(_.waiting)})}
        ${_.serial_lanes.map(m=>Pt(m))}
        ${w}
        ${yn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:_.done,empty:`${M()} \uC644\uB8CC \uC5C6\uC74C`,controls:Mt(),collapsible:!0,collapsed:ne.done,preview:Array.isArray(_.token_total)?_.token_total.map(m=>m.label).join(" \xB7 "):_.token_total||Hp(_.done)})}
      </div>`:l`<div class="worker-lanes">
      ${w}
      <div class="worker-wait">
        ${yn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${_.serial_lanes.map(m=>Pt(m))}
      </div>
      ${yn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${_.slots}`,items:_.running,live:_.running.some(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0),body:Li(_.running,Date.now(),Ie,_.running_overlays)})}
      ${yn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:_.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${yn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${M()} ${_.done.length}`,items:_.done,empty:`${M()} \uC644\uB8CC \uC5C6\uC74C`,controls:Mt()})}
    </div>`}function Dt(_){ne={...ne,[_]:!ne[_]},ay(ne),Ue()}function Ue(){let _=dt();Ve(bt(_),ae),Ve(At(_),qe)}function Xt(){if(typeof window.matchMedia!="function")return;let _=window.matchMedia(sy);Te=!!_.matches;let w=m=>{let A=!!(m&&typeof m.matches=="boolean"?m.matches:_.matches);A!==Te&&(Te=A,Ue())};typeof _.addEventListener=="function"?(_.addEventListener("change",w),K.push(()=>_.removeEventListener("change",w))):typeof _.addListener=="function"&&(_.addListener(w),K.push(()=>_.removeListener(w)))}let Qt=null;function et(_){Qt=_.target instanceof Element?_.target:null}function Pe(_){let m=_.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!m)return;if(Qt&&m.contains(Qt)&&Qt.closest("input, button, a")){_.preventDefault();return}let A=m.dataset.beadId||"",u=m.dataset.lane||"";N={bead_id:A,from_lane:u};try{_.dataTransfer?.setData("text/plain",A),_.dataTransfer&&(_.dataTransfer.effectAllowed="move")}catch{}}function R(_){let w=_.target?.closest?.(".worker-pane");if(!w)return;let m=w.dataset.lane||"";m!=="candidate"&&m!=="queue"&&!/^s[1-5]$/.test(m)||(_.preventDefault(),_.dataTransfer&&(_.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function ue(_){_.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ae(_,w){let m=B.find(v=>v.id===_);if(!m)return;let A=B.filter(v=>v.id!==_),u=A.length;if(w){let v=w.dataset.beadId;if(v===_)return;let x=A.findIndex(j=>j.id===v);x>=0&&(u=x)}let f=A.slice();f.splice(u,0,m),E.applyReorder(_,f,u)}function ot(_){let w=_.target?.closest?.(".worker-pane");if(!w)return;_.preventDefault(),w.classList.remove("worker-pane--drag-over");let m=w.dataset.lane||"",A=N?.bead_id||_.dataTransfer?.getData("text/plain")||"",u=N?.from_lane||"";if(N=null,!A)return;let f=_.target?.closest?.(".worker-mini, .worker-card"),v=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),x=v.length;if(f){let j=v.indexOf(f);j>=0&&(x=j)}if(x=Math.max(0,x-w.querySelectorAll(".worker-mini--ghost").length),w.classList.contains("worker-pane--collapsed")&&(x=Be()),m==="candidate"){if(u==="candidate"){Ae(A,f);return}(u==="queue"||/^s[1-5]$/.test(u))&&Ze(A);return}if(m==="queue"||/^s[1-5]$/.test(m)){let j=m==="queue"?"parallel":m;u===m?Qe(A,j,x):Ge(A,j)}}function vt(_){Y=_,Zh(_),Ue()}function pt(_){D=_==="board"||_==="created"||_==="spec"?_:da,ty(D),Ue()}function Rt(_){W=gn(_)?_:ln,ry(W),y?.(W),Ue()}function It(_){let w=_.target?.closest?.(".worker-serial-lane-count");if(w){let x=Number.parseInt(w.value,10);Number.isFinite(x)&&Q(x).then(Ue);return}let m=_.target?.closest?.(".worker-filter__blocked");if(m){vt({...Y,show_blocked:m.checked});return}let A=_.target?.closest?.(".worker-done-range");if(A){Rt(A.value);return}let u=_.target?.closest?.(".worker-sort");if(u){pt(u.value||da);return}let f=_.target?.closest?.(".worker-slots__input");if(!f)return;let v=Number.parseInt(f.value,10);if(!Number.isFinite(v)){Ue();return}O(v).then(Ue)}function Ht(_){return _?{runner:_.runner||void 0,model:_.model||void 0,effort:_.effort||void 0,worktree:_.worktree||void 0,status:_.status||void 0,session_id:_.session_id||void 0}:{}}function Jt(){let _=dt();return{operations:_.repo_operations,cleanup_failures:_.cleanup_failures,repo:d&&d()||""}}function wt(){Ie&&je.close(),Le.hidden=!1,He.hidden=!1,Ye.open(Jt()),Ue()}function en(_){let w=J(),m=w.attempts?w.attempts[_]:null;Ie=_,We=null,Ye.close(),Le.hidden=!0,He.hidden=!1,je.open({attempt_id:_,meta:Ht(m)}),Ue()}function _n(_,w){Ie=null,We=_,Ye.close(),Le.hidden=!0,He.hidden=!1,je.open({attempt_id:_,meta:w,hide_prompt:!0}),Ue()}function Ln(){if(Ye.isOpen()&&Ye.refresh(Jt()),We){let m=(o?.get()?.runs||[]).find(A=>A.run_id===We);m?je.updateMeta(Zi(m)):je.close();return}if(!Ie)return;let _=J(),w=_.attempts?_.attempts[Ie]:null;if(w){je.updateMeta(Ht(w));return}je.close()}function T(_){let w=_.target;if(w?.closest?.(".worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-parallel-analysis-dialog"))return;let m=w?.closest?.(".mon-overlap__chip");if(m){let Ne=m.closest("[data-bead-id]"),at=Ne&&Ne.getAttribute("data-bead-id")||"";if(at){let an=m.getAttribute("data-overlap-id")||"";U=!!U&&U.bead_id===at&&U.counterpart_id===an?null:{bead_id:at,counterpart_id:an},Ue()}return}let A=w?.closest?.(".mon-overlap__place");if(A){let Ne=A.closest("[data-bead-id]"),at=Ne&&Ne.getAttribute("data-bead-id")||"";at&&$e(at,A.getAttribute("data-counterpart-id")||"");return}if(w?.closest?.(".mon-overlap__popover"))return;if(w?.closest?.(".worker-analysis-btn")){te?.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){wt();return}let u=w?.closest?.(".worker-repo-op__session");if(u){let Ne=u.dataset.attemptId;Ne&&en(Ne);return}let f=w?.closest?.(".worker-repo-op__resolve");if(f){g(f.dataset.operationId||"");return}let v=w?.closest?.(".worker-repo-op__dismiss");if(v){k(v.dataset.operationId||"");return}let x=w?.closest?.(".worker-cleanup__resume");if(x){let Ne=x.dataset.beadId;Ne&&ut(Ne);return}let j=w?.closest?.(".worker-banner__resume");if(j){let Ne=j.dataset.attemptId;Ne&&yt(Ne);return}let z=w?.closest?.(".worker-banner__discard");if(z){let Ne=z.dataset.confirmation==="merged"?"merged":"unmerged";de(z.dataset.beadId||"",z.dataset.attemptId||null,Ne,z.dataset.operationId||null);return}let re=w?.closest?.(".worker-banner__dismiss");if(re){let Ne=re.dataset.attemptId;Ne&&Et(Ne);return}if(w?.closest?.(".worker-play")){pe(!J().auto_advance);return}let _e=w?.closest?.(".worker-merge-all");if(_e){_e.classList.contains("worker-merge-all--stop")?J().auto_merge===!0?Re(!1):V():Re(!0);return}let Je=w?.closest?.(".worker-pane__hd--toggle");if(Je){let Ne=Je.dataset.lane;(Ne==="queue"||Ne==="done")&&Dt(Ne);return}let jt=w?.closest?.(".worker-card__place-lane");if(jt){let Ne=jt.dataset.beadId,at=jt.dataset.lane;Ne&&(at==="parallel"||/^s[1-5]$/.test(at||""))&&(le=null,Ue(),Ge(Ne,at));return}if(w?.closest?.(".worker-card__place-cancel")){le=null,Ue();return}let Bt=w?.closest?.(".worker-card__place");if(Bt){let Ne=Bt.dataset.beadId;Ne&&!Bt.disabled&&(Ce()?(le=Ne,Ue()):Ge(Ne,"parallel"));return}let Tn=w?.closest?.(".worker-filter__chip");if(Tn){let Ne=Tn.dataset.spec;(Ne==="all"||Ne==="with"||Ne==="without")&&vt({...Y,spec:Ne});return}let on=w?.closest?.(".worker-mini__merge");if(on){let Ne=on.dataset.beadId||"";J().cleanup_failed?.[Ne]?ut(Ne):Ot(Ne);return}let Ls=w?.closest?.(".worker-mini__merge-cancel");if(Ls){P(Ls.dataset.beadId||"");return}let sr=w?.closest?.(".worker-mini__discard");if(sr){de(sr.dataset.beadId||"",sr.dataset.attemptId||null,sr.dataset.discardMode==="merged"?"merged":"unmerged",sr.dataset.operationId||null);return}let zn=w?.closest?.(".worker-mini__stale-continue");if(zn){C("worker-stale-work-continue",zn.dataset.beadId||"",zn.dataset.actionId||"");return}let Hn=w?.closest?.(".worker-mini__stale-backup");if(Hn){C("worker-stale-work-backup-fresh",Hn.dataset.beadId||"",Hn.dataset.actionId||"");return}let vr=w?.closest?.(".worker-mini__stale-recheck");if(vr){C("worker-stale-work-recheck",vr.dataset.beadId||"",vr.dataset.actionId||"");return}let Hr=w?.closest?.(".worker-mini__revise-fix");if(Hr){G("worker-revise-fix",Hr.dataset.beadId||"");return}let Is=w?.closest?.(".worker-mini__revise-approve");if(Is){G("worker-revise-approve",Is.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let Ne=w?.closest?.(".rtile"),at=Ne?.dataset?.beadId,an=Ne?.dataset?.attemptId;at&&de(at,an||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let at=w?.closest?.(".rtile")?.dataset?.attemptId;at&&Et(at);return}if(w?.closest?.(".rtile__pause")){let at=w?.closest?.(".rtile")?.dataset?.attemptId;at&&rt(at);return}if(w?.closest?.(".rtile__resume")){let at=w?.closest?.(".rtile")?.dataset?.attemptId;at&&yt(at);return}if(w?.closest?.(".rtile__session")){let at=w?.closest?.(".rtile")?.dataset?.attemptId;at&&en(at);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){Ye.close(),je.close();return}if(w?.closest?.(".worker-drawer-host"))return;let wr=w?.closest?.(".rtile .board-card__roll-toggle");if(wr){let Ne=wr.dataset.rollParent;Ne&&(ke.has(Ne)?ke.delete(Ne):ke.add(Ne),Ue());return}let or=w?.closest?.(".rtile .board-card__roll-child");if(or){let Ne=or.dataset.childId;Ne&&c&&c(Ne);return}let Gn=w?.closest?.(".rtile");if(Gn){if(w?.closest?.(".rtile__id")){let at=Gn.dataset.beadId;at&&un(at).then(an=>{an?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ne=Gn.dataset.beadId;Ne&&c&&c(Ne);return}let Gr=w?.closest?.(".worker-mini, .worker-card");if(Gr){let Ne=Gr.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){Ne&&un(Ne).then(an=>{an?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let at=w?.closest?.(".ctl-chip--from");if(at){let an=at.dataset.fromId;an&&c&&c(an);return}Ne&&c&&c(Ne)}}e.addEventListener("pointerdown",et),e.addEventListener("dragstart",Pe),e.addEventListener("dragover",R),e.addEventListener("dragleave",ue),e.addEventListener("drop",ot),e.addEventListener("click",T),e.addEventListener("change",It);function L(_){if(!U)return;let w=_.target;w&&typeof w.closest=="function"&&w.closest(".mon-overlap__popover, .mon-overlap__chip")||(U=null,Ue())}function De(_){_.key!=="Escape"||!U||(U=null,Ue())}return document.addEventListener("click",L),document.addEventListener("keydown",De),K.push(()=>{document.removeEventListener("click",L),document.removeEventListener("keydown",De)}),Xt(),$&&K.push($.subscribe(()=>{for(let[_,w]of S)w==="failed"&&S.delete(_);Ue()})),s&&K.push(s.subscribe(()=>{let _=d&&d()||"";_!==ct&&(ct=_,tt.close()),Ue(),Ln()})),o&&typeof o.subscribe=="function"&&K.push(o.subscribe(()=>{Ln(),Ue()})),Ue(),{load(){me(),Ue()},refreshSessionDefaults:ve,destroy(){for(let _ of K.splice(0))try{_()}catch{}e.removeEventListener("pointerdown",et),e.removeEventListener("dragstart",Pe),e.removeEventListener("dragover",R),e.removeEventListener("dragleave",ue),e.removeEventListener("drop",ot),e.removeEventListener("click",T),e.removeEventListener("change",It);try{je.destroy()}catch{}He.hidden=!0;try{te?.destroy()}catch{}try{tt.destroy()}catch{}Ve(l``,e)}}}function tl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Qp(e,t,n,r=async()=>{},s=async()=>{}){let o=St("views:workspace-picker"),a=null,i=!1,c=!1,d=!1;async function p(W){let M=W.target.value,Te=t.getState().workspace?.current?.path||"";if(M&&M!==Te){o("switching workspace to %s",M),i=!0,D();try{await n(M)}catch(be){o("workspace switch failed: %o",be)}finally{i=!1,D()}}}async function h(){let W=t.getState(),S=W.workspace?.current?.path||W.workspace?.available?.[0]?.path||"";if(!(!S||c)){o("git-pulling workspace %s",S),c=!0,D();try{await r(S)}catch(M){o("workspace git pull failed: %o",M)}finally{c=!1,D()}}}function y(W){let S=W.target;S&&e.contains(S)||N()}function $(W){W.key==="Escape"&&N()}function E(){d||(d=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",$),D())}function N(){d&&(d=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",$),D())}function B(){d?N():E()}async function Y(W){let S=W.target,M=S.value,ne=S.checked;o("toggling visibility %s \u2192 %s",M,String(ne));try{await s(M,ne)}catch(Te){o("workspace visibility toggle failed: %o",Te)}}function le(W){return W?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${h}
        ?disabled=${i||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function U(W,S){return l`
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
                ${W.map(M=>l`
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
                        >${tl(M.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let W=t.getState(),S=W.workspace?.current,M=W.workspace?.available||[],ne=new Set(W.workspace?.hidden||[]),Te=S?.path||M[0]?.path||"";if(M.length===0)return l``;let be=M.filter(H=>!ne.has(H.path)||H.path===Te);if(be.length<=1){let H=be[0]||M[0],X=tl(H.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${H.path}"
            >${X}</span
          >
          ${U(M,ne)}
          ${le(Te)}
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
                ?selected=${H.path===Te}
                title="${H.path}"
              >
                ${tl(H.path)}
              </option>
            `)}
        </select>
        ${U(M,ne)}
        ${le(Te)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){Ve(q(),e)}return D(),a=t.subscribe(()=>D()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",$),Ve(l``,e)}}}var Jp=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function nl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function ef(e,t,n=nl()){return{id:n,type:e,payload:t}}function tf(e={}){let t=St("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,d=new Map,p=[],h=new Map,y=new Set;function $(q){for(let D of Array.from(y))try{D(q)}catch{}}function E(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),$(o);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),D=(n.jitterRatio||0)*q,W=Math.max(0,Math.round(q+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",W,a+1),i=setTimeout(()=>{i=null,U()},W)}function N(q){try{s?.send(JSON.stringify(q))}catch(D){t("ws send failed",D)}}function B(){for(o="open",t("ws open"),$(o),a=0;p.length;){let q=p.shift();q&&N(q)}}function Y(q){let D;try{D=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(d.has(D.id)){let S=d.get(D.id);d.delete(D.id),D.ok?S?.resolve(D.payload):S?.reject(D.error||new Error("ws error"));return}let W=h.get(D.type);if(W&&W.size>0)for(let S of Array.from(W))try{S(D.payload)}catch(M){t("ws event handler error",M)}else t("ws received unhandled message type: %s",D.type)}function le(){o="closed",t("ws closed"),$(o);for(let[q,D]of d.entries())D.reject(new Error("ws disconnected")),d.delete(q);a+=1,E()}function U(){if(!c)return;let q=r();try{s=new WebSocket(q),t("ws connecting %s",q),o="connecting",$(o),s.addEventListener("open",B),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",le)}catch(D){t("ws connect failed %o",D),E()}}return U(),{send(q,D){if(!Jp.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let W=nl(),S=ef(q,D,W);return t("send %s id=%s",q,W),new Promise((M,ne)=>{d.set(W,{resolve:M,reject:ne,type:q}),s&&s.readyState===s.OPEN?N(S):(t("queue %s id=%s (state=%s)",q,W,o),p.push(S))})},on(q,D){h.has(q)||h.set(q,new Set);let W=h.get(q);return W?.add(D),()=>{W?.delete(D)}},onConnection(q){return y.add(q),()=>{y.delete(q)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,U()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function ky(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function $y(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var rl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],nf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],nr="tab:worker:closed",xy="bdui.worker.done-range",rf=op,sf="worker:queue",of="worker:parallel-analysis",af="ui:order",lf="ui:display-policy",cf="exec:presets",rr="tab:board:closed",uf="beads-ui.board.closed-range";function Ay(e){let t=St("main");t("bootstrap start");let n=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ve(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(a&&Ap(a),i&&c&&d&&p){let ee=function(T,L){let De="Request failed",_="";if(T&&typeof T=="object"){let m=T;if(typeof m.message=="string"&&m.message.length>0&&(De=m.message),typeof m.details=="string")_=m.details;else if(m.details&&typeof m.details=="object")try{_=JSON.stringify(m.details,null,2)}catch{_=""}}else typeof T=="string"&&T.length>0&&(De=T);let w=L&&L.length>0?`Failed to load ${L}`:"Request failed";K.open(w,De,_)},Ke=function(T){return`${et.getState().workspace.current?.path||""}\0${T}`},Oe=function(){je&&(je().catch(()=>{}),je=null),Ye=null,tt=null},Be=function(T){ct=T;let L=()=>{ct!==T||et.getState().selected_id!==T||(ct=null,we(T))};if(!J){te.then(L);return}L()},rt=function(T,L,De,_,w){return De!==Ze[L]?(w().catch(()=>{}),!1):(T.set(_,w),!0)},Et=function(){let T=et.getState();Re(T.view==="board"),pe(T.view==="worker"),Z(T.view==="monitor"),k(T.view==="board"||T.view==="worker"||yt||!!T.selected_id)},ut=function(){let T=dr(it);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},ze=function(){let T=dr(Ot);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},Re=function(T){if(T)for(let[L,De]of rl){if(Ge.has(L)||Qe.has(L))continue;let _=L===rr?ut():{type:De};try{ae.register(L,_)}catch(A){t("register %s store failed: %o",L,A)}Qe.add(L);let w=Ze.board,m=!1;Me.subscribeList(L,_).then(A=>{m=!rt(Ge,"board",w,L,A)}).catch(A=>{t("subscribe %s failed: %o",L,A),ee(A,"board")}).finally(()=>{Qe.delete(L),m&&Et()})}else de()},de=function(){Ze.board+=1;for(let[T]of rl){let L=Ge.get(T);L&&(L().catch(()=>{}),Ge.delete(T));try{ae.unregister(T)}catch(De){t("unregister %s failed: %o",T,De)}}},pe=function(T){if(!T){g();return}for(let[L,De]of nf){if(C.has(L)||Qe.has(L))continue;let _=L===nr?ze():{type:De};try{ae.register(L,_)}catch(A){t("register %s store failed: %o",L,A)}Qe.add(L);let w=Ze.worker,m=!1;Me.subscribeList(L,_).then(A=>{m=!rt(C,"worker",w,L,A)}).catch(A=>{t("subscribe %s failed: %o",L,A),ee(A,"worker")}).finally(()=>{Qe.delete(L),m&&Et()})}},g=function(){Ze.worker+=1;for(let[T]of nf){let L=C.get(T);L&&(L().catch(()=>{}),C.delete(T));try{ae.unregister(T)}catch(De){t("unregister %s failed: %o",T,De)}}},k=function(T){if(!T){O();return}G||(ve("subscribe-worker-queue",{id:sf}).catch(L=>{t("subscribe-worker-queue failed: %o",L)}),ve("subscribe-worker-parallel-analysis",{id:of}).catch(L=>{t("subscribe-worker-parallel-analysis failed: %o",L)}),G=()=>(ve("unsubscribe-worker-parallel-analysis",{id:of}),ve("unsubscribe-worker-queue",{id:sf})))},O=function(){G&&(G().catch(()=>{}),G=null),I.clear()},Z=function(T){if(!T){fe();return}Q||(ve("subscribe-monitor-pipeline",{id:rf}).catch(L=>{t("subscribe-monitor-pipeline failed: %o",L)}),Q=()=>ve("unsubscribe-monitor-pipeline",{id:rf}))},fe=function(){Q&&(Q().catch(()=>{}),Q=null)},$e=function(){Ee||(ve("subscribe-ui-order",{id:af}).catch(T=>{t("subscribe-ui-order failed: %o",T)}),Ee=()=>ve("unsubscribe-ui-order",{id:af}))},st=function(){Ee&&(Ee().catch(()=>{}),Ee=null),Le.clear()},xe=function(){dt||(ve("subscribe-display-policy",{id:lf}).catch(T=>{t("subscribe-display-policy failed: %o",T)}),dt=()=>ve("unsubscribe-display-policy",{id:lf}))},bt=function(){dt&&(dt().catch(()=>{}),dt=null),qe.clear()},qt=function(){gt||(ve("subscribe-impl-presets",{id:cf}).catch(T=>{t("subscribe-impl-presets failed: %o",T)}),gt=()=>ve("unsubscribe-impl-presets",{id:cf}))},Dt=function(T){if(!T)return"Unknown";let L=T.split("/").filter(Boolean);return L.length>0?L[L.length-1]:"Unknown"},It=function(T,L){Rt.open(T.path,{missing_state:T.missing_state,...L?{workspace:L}:{}})};var h=ee,y=Ke,$=Oe,E=Be,N=rt,B=Et,Y=ut,le=ze,U=Re,q=de,D=pe,W=g,S=k,M=O,ne=Z,Te=fe,be=$e,H=st,X=xe,he=bt,ke=qt,ge=Dt,se=It;let Se=document.getElementById("header-loading"),ye=vc(Se),K=id(e),me=tf(),ve=ye.wrapSend((T,L)=>me.send(T,L)),Me=pc(ve),ae=fc(),He=gc(),I=mc(),ce=Xl(),Le=_c(),qe=Yl(),Ie=Zl(),We=Ql();me.on("impl-presets-snapshot",T=>{let L=T;L&&typeof L.revision=="number"&&Array.isArray(L.presets)&&Ie.set({revision:L.revision,presets:L.presets})}),me.on("monitor-pipeline-snapshot",T=>{let L=T;if(!(!L||!Array.isArray(L.workspaces)))try{ce.set(L.workspaces,L.workspaces_state,L.cross_lanes)}catch{}}),me.on("ui-order-snapshot",T=>{let L=T;if(L&&typeof L.revision=="number")try{Le.set({revision:L.revision,order:L.order&&typeof L.order=="object"?L.order:{}})}catch{}}),me.on("display-policy-snapshot",T=>{let L=T;if(L&&L.policy&&typeof L.policy=="object")try{qe.set(L.policy)}catch{}}),me.on("session-log-snapshot",T=>{let L=T;if(L&&typeof L.id=="string")try{We.set(L.id,Array.isArray(L.lines)?L.lines:[],typeof L.last_event_at=="number"?L.last_event_at:null)}catch{}}),me.on("session-log-append",T=>{let L=T;if(L&&typeof L.id=="string")try{We.append(L.id,L.event)}catch{}}),me.on("snapshot",T=>{let L=T,De=L&&typeof L.id=="string"?L.id:"",_=De?ae.getStore(De):null;if(_&&L&&L.type==="snapshot")try{_.applyPush(L)}catch{}}),me.on("upsert",T=>{let L=T,De=L&&typeof L.id=="string"?L.id:"",_=De?ae.getStore(De):null;if(_&&L&&L.type==="upsert")try{_.applyPush(L)}catch{}}),me.on("delete",T=>{let L=T,De=L&&typeof L.id=="string"?L.id:"",_=De?ae.getStore(De):null;if(_&&L&&L.type==="delete")try{_.applyPush(L)}catch{}});let je=null,Ye=null,tt=null,ct=null,_t=()=>{},te=new Promise(T=>{_t=()=>T(void 0)}),J=!1,Ce=!1;async function we(T){let L=Ke(T);if(L===Ye||L===tt)return;tt=L;let De=`detail:${T}`,_={type:"issue-detail",params:{id:T}};try{ae.register(De,_)}catch(w){t("register detail store failed: %o",w)}try{let w=await Me.subscribeList(De,_);if(et.getState().selected_id!==T||Ke(T)!==L){await w().catch(()=>{});return}je&&await je().catch(()=>{}),je=w,Ye=L}catch(w){t("detail subscribe failed: %o",w),ee(w,"issue details")}finally{tt===L&&(tt=null)}}let Ge=new Map,Qe=new Set,Ze={board:0,worker:0},yt=!1,it=ln;try{let T=window.localStorage.getItem(uf);gn(T)&&(it=T)}catch{}let Ot=ln;try{let T=window.localStorage.getItem(xy);gn(T)&&(Ot=T)}catch{}async function P(T){if(!gn(T)||T===it)return;it=T;try{window.localStorage.setItem(uf,T)}catch{}let L=Ge.get(rr);if(!L)return;Ge.delete(rr),await L().catch(()=>{});let De=ut();try{ae.register(rr,De)}catch(_){t("register %s store failed: %o",rr,_)}try{let _=await Me.subscribeList(rr,De);Ge.set(rr,_)}catch(_){t("re-subscribe %s failed: %o",rr,_),ee(_,"board")}}async function V(T){if(!gn(T)||T===Ot)return;Ot=T;let L=C.get(nr);if(!L)return;C.delete(nr),await L().catch(()=>{});let De=ze();try{ae.register(nr,De)}catch(_){t("register %s store failed: %o",nr,_)}try{let _=await Me.subscribeList(nr,De);C.set(nr,_)}catch(_){t("re-subscribe %s failed: %o",nr,_),ee(_,"worker")}}let C=new Map,G=null,Q=null,Ee=null,dt=null,gt=null;async function Gt(){dt=null,qe.clear(),gt=null,Ie.clear(),G=null,Q=null,Ge.clear(),C.clear(),Ze.board+=1,Ze.worker+=1,qt();let T=et.getState().workspace.current?.path;if(T)try{await me.send("set-workspace",{path:T})}catch(De){t("workspace restore after reconnect failed: %o",De);return}xe();let L=et.getState();Re(L.view==="board"),pe(L.view==="worker"),Z(L.view==="monitor"),k(L.view==="board"||L.view==="worker"||!!L.selected_id)}async function Mt(){t("clearing all subscriptions for workspace switch"),de(),g(),O(),He.clear(),st(),$e(),bt(),xe(),Oe();let T=et.getState();if(T.selected_id)try{ae.unregister(`detail:${T.selected_id}`)}catch{}let L=et.getState();Re(L.view==="board"),pe(L.view==="worker"),Z(L.view==="monitor"),k(L.view==="board"||L.view==="worker"||!!L.selected_id),L.selected_id&&Be(L.selected_id)}async function Pt(T){t("requesting workspace switch to %s",T),Ce=!0;try{let L=await me.send("set-workspace",{path:T});t("workspace switch result: %o",L),L&&L.workspace&&(et.setState({workspace:{current:{path:L.workspace.root_dir,database:L.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",T),L.changed&&(await Mt(),ie("Switched to "+Dt(T),"success",2e3)))}catch(L){throw t("workspace switch failed: %o",L),ie("Failed to switch workspace","error",3e3),L}finally{Ce=!1}}async function fn(T){t("requesting workspace git pull for %s",T);try{let L=await me.send("git-pull-workspace",{});t("workspace git pull result: %o",L);let De=L?.status;if(De==="up_to_date"){ie("Already up to date","success",2e3);return}if(De==="stash_pop_conflict"){ie("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ie("Git pulled "+Dt(T),"success",2e3)}catch(L){t("workspace git pull failed: %o",L);let De=L?.code,_=L?.message;if(De==="rebase_conflict"){ie("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(De==="rebase_conflict_abort_failed"){ie("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(De==="busy"){ie("Git pull skipped: another operation is running","warning",3e3);return}let w=_?`: ${_}`:"";throw ie(`Git pull failed${w}`,"error",3e3),L}}async function At(T,L){t("setting workspace visibility %s \u2192 %s",T,String(L));try{await me.send("set-workspace-visibility",{path:T,visible:L}),await Ue()}catch(De){t("workspace visibility update failed: %o",De),ie("Failed to update project visibility","error",3e3)}}async function Ue(){try{let T=await me.send("list-workspaces",{});if(t("workspaces loaded: %o",T),T&&Array.isArray(T.workspaces)){let L=T.workspaces.map(m=>({path:m.path,database:m.database,pid:m.pid,version:m.version})),De=T.current?{path:T.current.root_dir,database:T.current.db_path}:null,_=Array.isArray(T.hidden)?T.hidden.filter(m=>typeof m=="string"):[];et.setState({workspace:{current:De,available:L,hidden:_}});let w=window.localStorage.getItem("beads-ui.workspace");w&&(!L.some(A=>A.path===w)||_.includes(w)?window.localStorage.removeItem("beads-ui.workspace"):De&&w!==De.path&&(t("restoring saved workspace preference: %s",w),await Pt(w)))}}catch(T){t("failed to load workspaces: %o",T)}}me.on("workspace-changed",T=>{t("workspace-changed event: %o",T),T&&T.root_dir&&(et.setState({workspace:{current:{path:T.root_dir,database:T.db_path}}}),Ue(),Mt())});let Xt=!1;if(typeof me.onConnection=="function"){let T=L=>{t("ws state %s",L),L==="reconnecting"||L==="closed"?(Xt=!0,ie("Connection lost. Reconnecting\u2026","error",4e3)):L==="open"&&Xt&&(Xt=!1,ie("Reconnected","success",2200),$y(et,(De,_)=>{t(`${De}: %o`,_)}),Gt())};me.onConnection(T)}let Qt="board";try{let T=window.localStorage.getItem("beads-ui.view");(T==="board"||T==="worker"||T==="monitor")&&(Qt=T)}catch(T){t("view parse error: %o",T)}let et=yc({config:ky(),view:Qt});me.on("worker-queue-snapshot",T=>{let L=T;if(!L||!L.queue)return;let De=et.getState().workspace.current?.path;if(typeof De=="string"&&De.length>0&&L.root_dir!==De){t("dropping worker-queue snapshot for %s",String(L.root_dir));return}try{He.set(L.queue)}catch{}}),me.on("worker-parallel-analysis-snapshot",T=>{let L=T;if(!L)return;let De=et.getState().workspace.current?.path;if(!(typeof De=="string"&&De.length>0&&typeof L.root_dir=="string"&&L.root_dir!==De))try{I.set({settings:L.settings,job:L.job??null,runs:Array.isArray(L.runs)?L.runs:[],last_good:L.last_good??null})}catch{}});let Pe=bc(et);Pe.start();let R=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),ue=async(T,L)=>{try{return await ve(T,L)}catch(De){if(R.has(T))throw De;return[]}};ip({global_element:r,repo_element:s},et,Pe);let Ae=document.getElementById("workspace-picker");Ae&&Qp(Ae,et,Pt,fn,At);let ot=dp(e,(T,L)=>ve(T,L));try{let T=document.getElementById("new-issue-btn");T&&T.addEventListener("click",()=>ot.open())}catch{}let vt=mp(e,{policyStore:qe,queueStore:He,implPresetStore:Ie,transport:(T,L)=>ve(T,L),onOpenChange:T=>{let L=yt;yt=T,Et(),L&&T===!1&&Jt.refreshSessionDefaults()},labelOptions:()=>{let T=new Set;for(let[L]of rl)for(let De of ae.snapshotFor(L)||[]){let _=De.labels;if(Array.isArray(_))for(let w of _)typeof w=="string"&&w.length>0&&T.add(w)}return Array.from(T).sort()}});try{let T=document.getElementById("display-settings-btn");T&&(T.setAttribute("aria-label","\uC124\uC815"),T.setAttribute("title","\uC124\uC815"),T.addEventListener("click",()=>vt.open()))}catch{}let pt=document.createElement("div");pt.className="md-viewer-root",document.body.appendChild(pt);let Rt=qo(pt,{getWorkspacePath:()=>et.getState().workspace.current?.path}),Ht=Ic(i,{gotoIssue:T=>Pe.gotoIssue(T),issueStores:ae,transport:ue,workerQueueStore:He,uiOrderStore:Le,displayPolicyStore:qe,closedRange:it,onClosedRangeChange:T=>{P(T)},onNewIssue:()=>ot.open(),openDoc:It}),Jt=el(c,{transport:ue,issueStores:ae,queueStore:He,analysisStore:I,sessionLogStore:We,uiOrderStore:Le,gotoIssue:T=>et.setState({selected_id:T}),getWorkspacePath:()=>et.getState().workspace.current?.path,openDoc:It,doneRange:Ot,onDoneRangeChange:T=>{V(T)}}),wt=ap(d,{transport:ue,pipelineStore:ce,execPresetStore:Ie,sessionLogStore:We,router:Pe,gotoIssue:T=>Pe.gotoIssue(T),getWorkspacePath:()=>et.getState().workspace.current?.path,switchWorkspace:T=>Pt(T),openDoc:It}),en=ad(p,{issueStores:ae,transport:ue,queueStore:He,execPresetStore:Ie,sessionLogStore:We,getWorkspacePath:()=>et.getState().workspace.current?.path,mdViewer:Rt,onNavigate:T=>{et.getState().view==="worker"?et.setState({selected_id:T}):Pe.gotoIssue(T)},onClose:()=>{let T=et.getState();et.setState({selected_id:null});try{Pe.gotoView(T.view==="worker"||T.view==="monitor"?T.view:"board")}catch{}},onOpenExecPresets:()=>{vt.open("execution")}}),_n=et.getState().selected_id;_n&&(p.hidden=!1,en.load(_n),Be(_n)),et.subscribe(T=>{let L=T.selected_id;L?(p.hidden=!1,en.load(L),Ce||Be(L)):(en.clear(),p.hidden=!0,Oe())});let Ln=T=>{i.hidden=T.view!=="board",c.hidden=T.view!=="worker",d.hidden=T.view!=="monitor",o&&o.classList.toggle("is-quiet",T.view==="monitor"),Re(T.view==="board"),pe(T.view==="worker"),Z(T.view==="monitor"),k(T.view==="board"||T.view==="worker"||yt||!!T.selected_id),!T.selected_id&&T.view==="board"&&Ht.load(),T.view==="worker"&&Jt.load(),T.view==="monitor"?wt.load():wt.pause(),window.localStorage.setItem("beads-ui.view",T.view)};et.subscribe(Ln),Ln(et.getState()),$e(),xe(),qt(),Ue().finally(()=>{J=!0,_t()}),window.addEventListener("keydown",T=>{let L=T.ctrlKey||T.metaKey,De=String(T.key||"").toLowerCase(),_=T.target,w=_&&_.tagName?String(_.tagName).toLowerCase():"",m=w==="input"||w==="textarea"||w==="select"||_&&typeof _.isContentEditable=="boolean"&&_.isContentEditable;L&&De==="n"&&(m||(T.preventDefault(),ot.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Ay(t)});export{Ay as bootstrap,ky as readBootstrapConfig,$y as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
