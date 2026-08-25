var Sf=Object.create;var Ta=Object.defineProperty;var Ef=Object.getOwnPropertyDescriptor;var Tf=Object.getOwnPropertyNames;var Cf=Object.getPrototypeOf,Rf=Object.prototype.hasOwnProperty;var Of=(e,t,n)=>t in e?Ta(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ca=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Lf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Tf(t))!Rf.call(e,s)&&s!==n&&Ta(e,s,{get:()=>t[s],enumerable:!(r=Ef(t,s))||r.enumerable});return e};var If=(e,t,n)=>(n=e!=null?Sf(Cf(e)):{},Lf(t||!e||!e.__esModule?Ta(n,"default",{value:e,enumerable:!0}):n,e));var gt=(e,t,n)=>Of(e,typeof t!="symbol"?t+"":t,n);var Jl=Ca((Ly,Xl)=>{var Tr=1e3,Cr=Tr*60,Rr=Cr*60,dr=Rr*24,Mf=dr*7,Nf=dr*365.25;Xl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return qf(e);if(n==="number"&&isFinite(e))return t.long?jf(e):Ff(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function qf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Nf;case"weeks":case"week":case"w":return n*Mf;case"days":case"day":case"d":return n*dr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Rr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Cr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Tr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Ff(e){var t=Math.abs(e);return t>=dr?Math.round(e/dr)+"d":t>=Rr?Math.round(e/Rr)+"h":t>=Cr?Math.round(e/Cr)+"m":t>=Tr?Math.round(e/Tr)+"s":e+"ms"}function jf(e){var t=Math.abs(e);return t>=dr?Qs(e,t,dr,"day"):t>=Rr?Qs(e,t,Rr,"hour"):t>=Cr?Qs(e,t,Cr,"minute"):t>=Tr?Qs(e,t,Tr,"second"):e+" ms"}function Qs(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var tc=Ca((Iy,ec)=>{function Bf(e){n.debug=n,n.default=n,n.coerce=c,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Jl(),n.destroy=u,Object.keys(e).forEach(f=>{n[f]=e[f]}),n.names=[],n.skips=[],n.formatters={};function t(f){let h=0;for(let y=0;y<f.length;y++)h=(h<<5)-h+f.charCodeAt(y),h|=0;return n.colors[Math.abs(h)%n.colors.length]}n.selectColor=t;function n(f){let h,y=null,$,S;function F(...B){if(!F.enabled)return;let Q=F,le=Number(new Date),U=le-(h||le);Q.diff=U,Q.prev=h,Q.curr=le,h=le,B[0]=n.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let M=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(W,E)=>{if(W==="%%")return"%";M++;let N=n.formatters[E];if(typeof N=="function"){let ne=B[M];W=N.call(Q,ne),B.splice(M,1),M--}return W}),n.formatArgs.call(Q,B),(Q.log||n.log).apply(Q,B)}return F.namespace=f,F.useColors=n.useColors(),F.color=n.selectColor(f),F.extend=r,F.destroy=n.destroy,Object.defineProperty(F,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:($!==n.namespaces&&($=n.namespaces,S=n.enabled(f)),S),set:B=>{y=B}}),typeof n.init=="function"&&n.init(F),F}function r(f,h){let y=n(this.namespace+(typeof h>"u"?":":h)+f);return y.log=this.log,y}function s(f){n.save(f),n.namespaces=f,n.names=[],n.skips=[];let h=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of h)y[0]==="-"?n.skips.push(y.slice(1)):n.names.push(y)}function o(f,h){let y=0,$=0,S=-1,F=0;for(;y<f.length;)if($<h.length&&(h[$]===f[y]||h[$]==="*"))h[$]==="*"?(S=$,F=y,$++):(y++,$++);else if(S!==-1)$=S+1,F++,y=F;else return!1;for(;$<h.length&&h[$]==="*";)$++;return $===h.length}function a(){let f=[...n.names,...n.skips.map(h=>"-"+h)].join(",");return n.enable(""),f}function i(f){for(let h of n.skips)if(o(f,h))return!1;for(let h of n.names)if(o(f,h))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}ec.exports=Bf});var nc=Ca((en,Xs)=>{en.formatArgs=Wf;en.save=zf;en.load=Hf;en.useColors=Uf;en.storage=Gf();en.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();en.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Uf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Wf(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Xs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}en.log=console.debug||console.log||(()=>{});function zf(e){try{e?en.storage.setItem("debug",e):en.storage.removeItem("debug")}catch{}}function Hf(){let e;try{e=en.storage.getItem("debug")||en.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Gf(){try{return localStorage}catch{}}Xs.exports=tc()(en);var{formatters:Vf}=Xs.exports;Vf.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Qr=globalThis,Hs=Qr.trustedTypes,Nl=Hs?Hs.createPolicy("lit-html",{createHTML:e=>e}):void 0,Oa="$lit$",Ln=`lit$${Math.random().toFixed(9).slice(2)}$`,La="?"+Ln,Pf=`<${La}>`,ir=document,Xr=()=>ir.createComment(""),Jr=e=>e===null||typeof e!="object"&&typeof e!="function",Ia=Array.isArray,Wl=e=>Ia(e)||typeof e?.[Symbol.iterator]=="function",Ra=`[ 	
\f\r]`,Zr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ql=/-->/g,Fl=/>/g,or=RegExp(`>|${Ra}(?:([^\\s"'>=/]+)(${Ra}*=${Ra}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),jl=/'/g,Bl=/"/g,zl=/^(?:script|style|textarea|title)$/i,Pa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=Pa(1),Er=Pa(2),Ay=Pa(3),fn=Symbol.for("lit-noChange"),Ct=Symbol.for("lit-nothing"),Ul=new WeakMap,ar=ir.createTreeWalker(ir,129);function Hl(e,t){if(!Ia(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Nl!==void 0?Nl.createHTML(t):t}var Gl=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Zr;for(let i=0;i<n;i++){let c=e[i],u,f,h=-1,y=0;for(;y<c.length&&(a.lastIndex=y,f=a.exec(c),f!==null);)y=a.lastIndex,a===Zr?f[1]==="!--"?a=ql:f[1]!==void 0?a=Fl:f[2]!==void 0?(zl.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=or):f[3]!==void 0&&(a=or):a===or?f[0]===">"?(a=s??Zr,h=-1):f[1]===void 0?h=-2:(h=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?or:f[3]==='"'?Bl:jl):a===Bl||a===jl?a=or:a===ql||a===Fl?a=Zr:(a=or,s=void 0);let $=a===or&&e[i+1].startsWith("/>")?" ":"";o+=a===Zr?c+Pf:h>=0?(r.push(u),c.slice(0,h)+Oa+c.slice(h)+Ln+$):c+Ln+(h===-2?i:$)}return[Hl(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},es=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,f]=Gl(t,n);if(this.el=e.createElement(u,r),ar.currentNode=this.el.content,n===2||n===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=ar.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Oa)){let y=f[a++],$=s.getAttribute(h).split(Ln),S=/([.?@])?(.*)/.exec(y);c.push({type:1,index:o,name:S[2],strings:$,ctor:S[1]==="."?Vs:S[1]==="?"?Ks:S[1]==="@"?Ys:cr}),s.removeAttribute(h)}else h.startsWith(Ln)&&(c.push({type:6,index:o}),s.removeAttribute(h));if(zl.test(s.tagName)){let h=s.textContent.split(Ln),y=h.length-1;if(y>0){s.textContent=Hs?Hs.emptyScript:"";for(let $=0;$<y;$++)s.append(h[$],Xr()),ar.nextNode(),c.push({type:2,index:++o});s.append(h[y],Xr())}}}else if(s.nodeType===8)if(s.data===La)c.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(Ln,h+1))!==-1;)c.push({type:7,index:o}),h+=Ln.length-1}o++}}static createElement(t,n){let r=ir.createElement("template");return r.innerHTML=t,r}};function lr(e,t,n=e,r){if(t===fn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=Jr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=lr(e,s._$AS(e,t.values),s,r)),t}var Gs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??ir).importNode(n,!0);ar.currentNode=s;let o=ar.nextNode(),a=0,i=0,c=r[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Sr(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Zs(o,this,t)),this._$AV.push(u),c=r[++i]}a!==c?.index&&(o=ar.nextNode(),a++)}return ar.currentNode=ir,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Sr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Ct,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=lr(this,t,n),Jr(t)?t===Ct||t==null||t===""?(this._$AH!==Ct&&this._$AR(),this._$AH=Ct):t!==this._$AH&&t!==fn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Wl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ct&&Jr(this._$AH)?this._$AA.nextSibling.data=t:this.T(ir.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=es.createElement(Hl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Gs(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Ul.get(t.strings);return n===void 0&&Ul.set(t.strings,n=new es(t)),n}k(t){Ia(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Xr()),this.O(Xr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},cr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Ct,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Ct}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=lr(this,t,n,0),a=!Jr(t)||t!==this._$AH&&t!==fn,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=lr(this,i[r+c],n,c),u===fn&&(u=this._$AH[c]),a||(a=!Jr(u)||u!==this._$AH[c]),u===Ct?t=Ct:t!==Ct&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===Ct?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Vs=class extends cr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ct?void 0:t}},Ks=class extends cr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ct)}},Ys=class extends cr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=lr(this,t,n,0)??Ct)===fn)return;let r=this._$AH,s=t===Ct&&r!==Ct||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Ct&&(r===Ct||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Zs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){lr(this,t)}},Vl={M:Oa,P:Ln,A:La,C:1,L:Gl,R:Gs,D:Wl,V:lr,I:Sr,H:cr,N:Ks,U:Ys,B:Vs,F:Zs},Df=Qr.litHtmlPolyfillSupport;Df?.(es,Sr),(Qr.litHtmlVersions??(Qr.litHtmlVersions=[])).push("3.3.1");var Ge=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Sr(t.insertBefore(Xr(),o),o,void 0,n??{})}return s._$AI(e),s};var an="today",Gn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function _n(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function ur(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Kl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Yl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Zl(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Ql(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var rc=If(nc(),1);function xt(e){return(0,rc.default)(`beads-ui:${e}`)}function vn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function pr(e,t){let n=vn(e.created_at),r=vn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ac(e,t){let n=vn(e.created_at),r=vn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ic(e,t){let n=vn(e.updated_at),r=vn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function lc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=vn(e.created_at),o=vn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function cc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Kf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function sc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function oc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Kf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function uc(e,t){let n=sc(e),r=sc(t);if(n!==r)return n<r?-1:1;let s=oc(e),o=oc(t);if(s!==o)return s<o?-1:1;let a=vn(e&&e.created_at),i=vn(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Da=2**20;function Or(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-vn(e&&e.created_at)}function Js(e){return(t,n)=>{let r=Or(t,e),s=Or(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Ma(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Or(i,n)-Da};if(!i)return{rank:Or(a,n)+Da};let c=Or(a,n),u=Or(i,n),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:r.map((h,y)=>({bead_id:h.id,rank:y*Da}))}}function Na(e,t={}){let n=xt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||pr;function u(){for(let y of Array.from(a))try{y()}catch{}}function f(){s=Array.from(r.values()).sort(c)}function h(y){if(i||!y||y.id!==e)return;let $=Number(y.revision)||0;if(n("apply %s rev=%d",y.type,$),!($<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if($<=o)return;r.clear();let S=Array.isArray(y.issues)?y.issues:[];for(let F of S)F&&typeof F.id=="string"&&F.id.length>0&&r.set(F.id,F);f(),o=$,u();return}if(y.type==="upsert"){let S=y.issue;if(S&&typeof S.id=="string"&&S.id.length>0){let F=r.get(S.id);if(!F)r.set(S.id,S);else{let B=Number.isFinite(F.updated_at)?F.updated_at:0,Q=Number.isFinite(S.updated_at)?S.updated_at:0;if(B<=Q){for(let le of Object.keys(F))le in S||delete F[le];for(let[le,U]of Object.entries(S))F[le]=U}}f()}o=$,u()}else if(y.type==="delete"){let S=String(y.issue_id||"");S&&(r.delete(S),f()),o=$,u()}}}return{id:e,subscribe(y){return a.add(y),()=>{a.delete(y)}},applyPush:h,snapshot(){return s},size(){return r.size},getById(y){return r.get(y)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function eo(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function dc(e){let t=xt("subs"),n=new Map,r=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],h=Array.isArray(c.updated)?c.updated:[],y=Array.isArray(c.removed)?c.removed:[];for(let $ of Array.from(u)){let S=n.get($);if(!S)continue;let F=S.itemsById;for(let B of f)typeof B=="string"&&B.length>0&&F.set(B,!0);for(let B of h)typeof B=="string"&&B.length>0&&F.set(B,!0);for(let B of y)typeof B=="string"&&B.length>0&&F.delete(B)}}async function o(i,c){let u=eo(c);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let h=n.get(i);if(h&&h.key!==u){let y=r.get(h.key);y&&(y.delete(i),y.size===0&&r.delete(h.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let f=r.get(u);f&&f.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(h){let y=n.get(i)||null;if(y){let $=r.get(y.key);$&&($.delete(i),$.size===0&&r.delete(y.key))}throw n.delete(i),h}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let h=n.get(i)||null;if(h){let y=r.get(h.key);y&&(y.delete(i),y.size===0&&r.delete(h.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:eo,selectors:{getIds(i){let c=n.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=n.get(i);return u?u.itemsById.has(c):!1},count(i){let c=n.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=n.get(i),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function pc(){let e=xt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let c of Array.from(r))try{c()}catch{}}function a(c,u,f){let h=u?eo(u):"",y=n.get(c)||"",$=t.has(c);if(e("register %s key=%s (prev=%s)",c,h,y),$&&y&&h&&y!==h){let S=t.get(c);if(S)try{S.dispose()}catch{}let F=s.get(c);if(F){try{F()}catch{}s.delete(c)}let B=Na(c,f);t.set(c,B);let Q=B.subscribe(()=>o());s.set(c,Q)}else if(!$){let S=Na(c,f);t.set(c,S);let F=S.subscribe(()=>o());s.set(c,F)}return n.set(c,h),()=>i(c)}function i(c){e("unregister %s",c),n.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return r.add(c),()=>r.delete(c)}}}function fc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function _c(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function mc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function qa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Yf(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Zf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function gc(e){let t=xt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Yf(r),a=Zf(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=qa(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?qa(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Qf=Object.freeze({workspace_config:{default_workspace:null}});function bc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Qf.workspace_config.default_workspace}}}function hc(e={}){let t=xt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:bc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?bc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==n.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===n.worker.show_closed_children[f])&&!i&&!c||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function yc(e){let t=xt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function c(u){return async(h,y)=>{let $=s++,S=Date.now();r.set($,{type:h,start_ts:S}),t("request start id=%d type=%s count=%d",$,h,n+1),a();let F=!1,B=()=>{F||(F=!0,r.delete($),i())},Q=setTimeout(()=>{F||(t("request TIMEOUT id=%d type=%s elapsed=%dms",$,h,Date.now()-S),B())},3e4);try{let le=await u(h,y),U=Date.now()-S;return t("request done id=%d type=%s elapsed=%dms",$,h,U),le}catch(le){let U=Date.now()-S;throw t("request error id=%d type=%s elapsed=%dms err=%o",$,h,U,le),le}finally{clearTimeout(Q),B()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([f,h])=>({id:f,type:h.type,elapsed_ms:u-h.start_ts}))}}}function ae(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function to(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(cc),c;switch(i){case"created_desc":return c.sort(pr),c;case"created_asc":return c.sort(ac),c;case"updated_desc":return c.sort(ic),c;case"priority":return c.sort(lc),c;case"manual":default:{let u=n();return u?c.sort(Js(u)):c.sort(pr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Cn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function jt(e){let t=Cn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function ln(e,t){let n=Cn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function vc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Cn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function no(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function ro(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=no(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function so(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=vc(n);return{total:n.length,count:r,current:s,children:n}}function oo(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},f=r(Ma(i,c,u.order),a);s(u,f);let h=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(h&&h.conflict){let y={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};n.set(y);let $=r(Ma(i,c,y.order),a);s(y,$);let S=await t("ui-order-set",{expected_revision:y.revision,entries:$});S&&S.applied&&n.set({revision:typeof S.revision=="number"?S.revision:0,order:S.order||{}})}else h&&h.applied&&n.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function ao(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Fa(e,t){return!t||typeof e!="string"||e.length===0||ao(t.visible_labels).includes(e)?!0:ao(t.hidden_labels).includes(e)?!1:!ao(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function wc(e,t){return ao(e).filter(n=>Fa(n,t))}function Vn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function Xf(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Jf(e,t,n,r,s){return l`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function e_(e,t,n,r){return l`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${Xf(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function io(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(uc):a;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Jf(t.parent_id,e.count,n,r,t.onToggle):l`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?l`<div class="board-card__roll-list">
            ${i.map((c,u)=>e_(c,u+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var t_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},$c={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},kc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},n_={review:"\u2713",skip:"\u2298"},Kn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function r_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function xc(e){let t=e&&e.fill||"none";return t==="none"?Kn.none:e&&e.stale===!0?Kn.stale:t==="dim"?Kn.dim:e&&e.glyph==="review"?Kn.review:e&&e.glyph==="skip"?Kn.skip:Kn.done}function s_(e){if(!e||e.fill==="none"||!e.approval_state)return xc(e);let t=[];return e.glyph==="review"?t.push(Kn.review):e.glyph==="skip"&&t.push(Kn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function o_(e,t,n,r){let s=t_[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=n_[t&&t.glyph||""]||"",c="bar";o==="dim"?c+=` b-${s} dim`:o==="full"&&(c+=` b-${s} full`),a&&(c+=" stale"),n&&(c+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,f=n?`color: var(--stage-${s}-on)`:"",h=$c[e]||e,y=r?Ac(t):null;if(!y)return l`
      <div class="seg">
        <div class=${c} style=${f}>${i}</div>
        <div class=${u}>${h}</div>
      </div>
    `;let $=`${h} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${y.path}`;return l`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${$}
      title=${$}
      @click=${S=>{S.preventDefault(),S.stopPropagation(),r(S,y,e)}}
    >
      <div class=${c} style=${f}>${i}</div>
      <div class=${u}>${h}</div>
    </button>
  `}function Ac(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function lo(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=kc[e.route]||kc.spec_backed,o=e.stages,a=r_(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${$c[u]||u} ${u==="plan"?s_(o[u]||{}):xc(o[u]||{})}`).join(" \xB7 ")}`,c=!!r&&s.some(u=>Ac(o[u]||{})!==null);return l`
    <div
      class="stp"
      role=${c?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>o_(u,o[u]||{},u===a,r))}
    </div>
  `}function a_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Sc=2;function i_(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,Sc).join(", "),s=n.length-Sc,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function ja(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function co(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function In(e){return`${e.kind}:${co(e)}@${e.sha}`}function uo(e,t){if(!e)return null;let n=ja(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=ja(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${In(t)}`:"";return{kind:e.kind,label:i,title:`${c}${u}`}}function Ec(e,t){let n=uo(e,t);return n?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function l_(e){if(!e)return null;let t=ja(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${In(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function c_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Vn(n,"route")){let i=r.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Vn(n,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Vn(n,"pr")){let i=r.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Ec(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${In(i)}`}
        >${`exec ${i.kind==="delegated"?co(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of wc(e.labels,n))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Vn(n,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Vn(n,"blocked")&&s.push(...i_(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Vn(n,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function u_(e){let t=ln(e.created_at),n=ln(e.updated_at);return!t&&!n?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${jt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?l`<span class="board-card__time-sep">·</span>`:""}
    ${n?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${jt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function d_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return io(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:u_(e),empty_label:"children \uC5C6\uC74C",childChips:Ba,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Ba(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return uo(t,n)?l`<span class="board-card__roll-child-chips">
    ${Ec(t,n)}
    ${l_(n)}
  </span>`:null}function po(e,t){let n=a_(e.priority);return l`
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
      ${c_(e,t)}
      ${e.workflow&&Vn(t.policy||null,"stepper")?lo(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${d_(e,t)}
    </article>
  `}function Lr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return l`
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
              ${Gn.map(o=>l`<option
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
  `}function Tc(e,t,n){return l`
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
  `}var p_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],f_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],__=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function m_(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return l`
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
  `}function Cc(e,t,n){return l`
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
        ${p_.map(r=>l`<option
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
        ${f_.map(r=>l`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${m_(e,t,n)}
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
        ${__.map(r=>l`<option
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
  `}var g_=200,b_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},h_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Rc="beads-ui.board.sort",Oc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function y_(){try{let e=window.localStorage.getItem(Rc);if(e&&Oc.has(e))return e}catch{}return"created_desc"}function Lc(e,t){let n=xt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,h=t.openDoc,y=t.closedRange||an,$=s?to(s,a):null,S=oo({transport:o,uiOrderStore:a}),F=[],B=[],Q=[],le=[],U=[],M=[],D=!1,W=0,E=y_(),N=new Map,ne=new Map,J=new Map,me=new Set,fe={search:"",priority:"",type:"",labels:[]},ee=!1,ye=null;function ke(x){return String(x.status||"open")==="open"}function _e(x){let K=String(x.status||"open");return K==="open"||K==="blocked"}function se(x){let K=fe.search.trim().toLowerCase(),xe=fe.priority,A=fe.type,O=fe.labels;return x.filter(k=>{if(K){let I=String(k.id||"").toLowerCase(),H=String(k.title||"").toLowerCase();if(!I.includes(K)&&!H.includes(K))return!1}if(xe!==""&&String(k.priority)!==xe||A!==""&&String(k.issue_type||"")!==A)return!1;if(O.length>0){let I=Array.isArray(k.labels)?k.labels:[];if(!O.some(H=>I.includes(H)))return!1}return!0})}function Ae(){let x=new Set;for(let K of[F,B,Q,le,U,M])for(let xe of K){let A=Array.isArray(xe.labels)?xe.labels:[];for(let O of A)typeof O=="string"&&O.length>0&&x.add(O)}return Array.from(x).sort()}function V(){return fe.search.trim()!==""||fe.priority!==""||fe.type!==""||fe.labels.length>0}function te(){try{if($){let x=$.selectBoardColumn("tab:board:in-progress","in_progress",E),K=$.selectBoardColumn("tab:board:blocked","blocked",E).filter(_e),xe=new Set(x.map(ve=>ve.id)),A=$.selectBoardColumn("tab:board:ready","ready",E).filter(ve=>ke(ve)&&!xe.has(ve.id)),O=$.selectBoardColumn("tab:board:resolved","resolved",E),k=$.selectBoardColumn("tab:board:deferred","deferred",E),I=$.selectBoardColumn("tab:board:closed","closed").slice(0,g_),H=[...K,...A,...x,...O,...I];pe(H);let de=new Set;for(let ve of H)ve&&ve.id&&!no(ve)&&de.add(ve.id);let ce=!V();F=ce?ts(K,de):K,B=ce?ts(A,de):A,Q=ce?ts(x,de):x,le=ce?ts(O,de):O,U=k,W=k.length,M=ce?ts(I,de):I,N=new Map;for(let ve of F)N.set(ve.id,"open");for(let ve of B)N.set(ve.id,"open");for(let ve of Q)N.set(ve.id,"in_progress");for(let ve of le)N.set(ve.id,"resolved");for(let ve of U)N.set(ve.id,"deferred");for(let ve of M)N.set(ve.id,"closed");ne=new Map;for(let ve of F)ne.set(ve.id,"blocked-col");for(let ve of B)ne.set(ve.id,"ready-col");for(let ve of Q)ne.set(ve.id,"in-progress-col");for(let ve of le)ne.set(ve.id,"resolved-col");for(let ve of M)ne.set(ve.id,"closed-col")}_t()}catch{F=[],B=[],Q=[],le=[],U=[],M=[],J=new Map,_t()}}function pe(x){J=ro(x)}function $e(x){return so(J,x)}function be(x){return!me.has(x)}function Ne(x,K){x.preventDefault(),x.stopPropagation(),me.has(K)?me.delete(K):me.add(K),_t()}function he(x,K){x.preventDefault(),x.stopPropagation(),r(K)}function He(x,K){x.preventDefault(),x.stopPropagation(),r(K)}function rt(x,K){ye||r(K)}function ut(x,K){x.preventDefault(),x.stopPropagation(),v_(K).then(xe=>{xe&&ae("\uBCF5\uC0AC\uB428","success",1200)})}function C(x,K){ye=K,x.dataTransfer&&(x.dataTransfer.setData("text/plain",K),x.dataTransfer.effectAllowed="move"),x.target.classList.add("board-card--dragging")}function re(x){x.target.classList.remove("board-card--dragging"),at(),setTimeout(()=>{ye=null},0)}function we(x){let K=String(x.target.value||"");!K||K===y||(y=K,u&&u(K),_t())}function De(){return i?i.get():null}function Pe(x){let K=c?c.get():null,xe=K?K.cleanup_failed:null;if(!xe||typeof xe!="object"||Array.isArray(xe))return null;let A=xe[x];return!A||typeof A!="object"||Array.isArray(A)?null:A}let z={onCardClick:rt,onCopyId:ut,onDragStart:C,onDragEnd:re,onClosedRangeChange:we,rollupFor:$e,isExpanded:be,onRollupToggle:Ne,onChildClick:he,onFromChipClick:He,onOpenDoc:h?(x,K)=>h(K):void 0,cleanupFailureFor:Pe,get policy(){return De()}};function Y(x,K){ye||(Ze(),r(K))}function Se(x,K){x.preventDefault(),x.stopPropagation(),Ze(),r(K)}let Ke={...z,onCardClick:Y,onChildClick:Se,onFromChipClick:Se,onOpenDoc:h?(x,K)=>{Ze(),h(K)}:void 0,get policy(){return De()}};function Ue(x){let K=x.target,xe=e.querySelector(".board-filter__labels");K&&xe&&xe.contains(K)||et()}function Ie(x){x.key==="Escape"&&et()}function ze(){ee||(ee=!0,document.addEventListener("mousedown",Ue),document.addEventListener("keydown",Ie),_t())}function et(){ee&&(ee=!1,document.removeEventListener("mousedown",Ue),document.removeEventListener("keydown",Ie),_t())}function qe(x){x.key==="Escape"&&Ze()}function je(){D||(D=!0,document.addEventListener("keydown",qe),_t())}function Ze(){D&&(D=!1,document.removeEventListener("keydown",qe),_t())}let Xe={onClose:Ze,onOverlayClick(x){x.target===x.currentTarget&&Ze()}},bt={onSearchInput(x){fe.search=String(x.target.value||""),te()},onPriorityChange(x){fe.priority=String(x.target.value||""),te()},onTypeChange(x){fe.type=String(x.target.value||""),te()},onSortChange(x){let K=String(x.target.value||"");if(!(!Oc.has(K)||K===E)){E=K;try{window.localStorage.setItem(Rc,K)}catch{}te()}},onDeferredToggle(){D?Ze():je()},onLabelMenuToggle(){ee?et():ze()},onLabelToggle(x){let K=fe.labels.indexOf(x);K===-1?fe.labels.push(x):fe.labels.splice(K,1),te()},onLabelClear(){fe.labels.length!==0&&(fe.labels=[],te())},onNewIssue(){f&&f()}};function ot(){return l`
      <div class="board-view">
        ${Cc(fe,bt,{sort_mode:E,deferred_popup_open:D,deferred_count:W,label_options:Ae(),label_menu_open:ee})}
        <div class="board-root">
          ${Lr({title:"Blocked",id:"blocked-col",items:se(F)},z)}
          ${Lr({title:"Ready",id:"ready-col",items:se(B)},z)}
          ${Lr({title:"In progress",id:"in-progress-col",items:se(Q)},z)}
          ${Lr({title:"Resolved",id:"resolved-col",items:se(le)},z)}
          ${Lr({title:"Closed",id:"closed-col",items:se(M),is_closed:!0,closed_range:y},z)}
        </div>
        ${D?Tc({items:se(U),count:W},Ke,Xe):""}
      </div>
    `}function _t(){Ge(ot(),e),St()}function St(){try{let x=e.querySelector("#deferred-popup");x&&!x.open&&(typeof x.showModal=="function"?x.showModal():x.setAttribute("open",""));let K=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let xe of K)Array.from(xe.querySelectorAll(".board-card")).forEach((O,k)=>{O.tabIndex=k===0?0:-1})}catch{}}async function mt(x,K){if(!o){ae("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:x,status:K}),ae("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(xe){n("update-status failed: %o",xe),ae("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function dt(x){switch(x){case"blocked-col":return F;case"ready-col":return B;case"in-progress-col":return Q;case"resolved-col":return le;default:return[]}}function Tt(x,K,xe){if(!o||!a)return;let A=dt(x),O=A.find(ce=>ce.id===K);if(!O)return;let k=A.filter(ce=>ce.id!==K),I=xe.closest?xe.closest(".board-card"):null,H=k.length;if(I){let ce=I.getAttribute("data-issue-id");if(ce===K)return;let ve=k.findIndex(Qe=>Qe.id===ce);ve>=0&&(H=ve)}let de=k.slice();de.splice(H,0,O),S.applyReorder(K,de,H)}function at(){for(let x of Array.from(e.querySelectorAll(".board-column--drag-over")))x.classList.remove("board-column--drag-over")}let We=null;e.addEventListener("dragover",x=>{x.preventDefault(),x.dataTransfer&&(x.dataTransfer.dropEffect="move");let xe=x.target.closest(".board-column");xe&&xe!==We&&(We&&We.classList.remove("board-column--drag-over"),xe.classList.add("board-column--drag-over"),We=xe)}),e.addEventListener("dragleave",x=>{let K=x.relatedTarget;(!K||!e.contains(K))&&We&&(We.classList.remove("board-column--drag-over"),We=null)}),e.addEventListener("drop",x=>{x.preventDefault(),We&&(We.classList.remove("board-column--drag-over"),We=null);let K=x.target,xe=K.closest(".board-column");if(!xe)return;let A=x.dataTransfer?.getData("text/plain")||"";if(!A)return;let O=xe.id,k=ne.get(A);if(k&&k===O){if(h_.has(O)){if(E!=="manual"){ae("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Tt(O,A,K)}return}let I=b_[O];if(!I){ae("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}N.get(A)!==I&&mt(A,I)}),e.addEventListener("keydown",x=>{let K=x.target;if(!(K instanceof HTMLElement))return;let xe=String(K.tagName||"").toLowerCase();if(xe==="input"||xe==="textarea"||xe==="select"||xe==="button"||xe==="a"||K.isContentEditable===!0)return;let A=K.closest(".board-card");if(!A)return;let O=String(x.key||"");if(O==="Enter"||O===" "){x.preventDefault();let de=A.getAttribute("data-issue-id");de&&r(de);return}if(O!=="ArrowUp"&&O!=="ArrowDown"&&O!=="ArrowLeft"&&O!=="ArrowRight")return;x.preventDefault();let k=A.closest(".board-column");if(!k)return;let I=Array.from(k.querySelectorAll(".board-card")),H=I.indexOf(A);if(O==="ArrowDown"&&H<I.length-1){Te(A,I[H+1]);return}if(O==="ArrowUp"&&H>0){Te(A,I[H-1]);return}if(O==="ArrowLeft"||O==="ArrowRight"){let de=Array.from(e.querySelectorAll(".board-column")),ce=de.indexOf(k),ve=O==="ArrowRight"?1:-1,Qe=ce+ve;for(;Qe>=0&&Qe<de.length;){let Ve=de[Qe].querySelector(".board-card");if(Ve){Te(A,Ve);return}Qe+=ve}}});function Te(x,K){try{x.tabIndex=-1,K.tabIndex=0,K.focus()}catch{}}let P=null;$&&$.subscribe&&(P=$.subscribe(()=>{try{te()}catch{}}));let X=null;i&&i.subscribe&&(X=i.subscribe(()=>{try{te()}catch{}}));let ie=null;return c&&c.subscribe&&(ie=c.subscribe(()=>{_t()})),{async load(){n("load"),te()},clear(){et(),Ze(),P&&(P(),P=null),X&&(X(),X=null),ie&&(ie(),ie=null),e.replaceChildren(),F=[],B=[],Q=[],le=[],U=[],M=[],N=new Map,ne=new Map}}}function ts(e,t){return e.filter(n=>{let r=no(n);return!(r&&t.has(r))})}async function v_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function cn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function fr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ns(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function w_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${fr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${fr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(c=>{let u=f=>{typeof n.close=="function"&&n.close(),n.remove(),c(f)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Pn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await w_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var k_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Ic={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},$_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function It(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function At(e){return typeof e=="string"&&e.length>0?e:null}function Ir(e){return e.startsWith("gpt-")?e.slice(4):e}function kt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Dc(e,t,n){let r=At(t[e]);if(r!==null)return{value:r,source:"pin"};let s=At(n[e]);return s===null?null:{value:s,source:"global"}}function rs(e,t,n,r){return Dc(e,t,n)||{value:r,source:"base"}}function Ua(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&It(s?.[t])){let a=At(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&It(s)){for(let a of Object.values(s))if(It(a)){let i=At(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return At(r?.runners?.[o]?.models?.[e]?.id)||e}function x_(e,t){return At(t?.review?.reviewers?.[e]?.model)||e}function Pr(e,t,n=!1){if(e==="default")return kt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Ir(e):e;return kt(e,t,r,e,"explicit")}function Mc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];It(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(It(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function A_(e,t){let n=[],r=e?.implementation?.model_catalog;It(r)&&n.push(...Object.keys(r));let s=t?.runners;if(It(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function S_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of A_(t,n)){let o=Mc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Wa(e){return kt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Pc(e,t,n){let r=Dc(e,t,n);return r?Pr(r.value,r.source):kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function tn(e){let t=It(e.pin)?e.pin:{},n=It(e.global)?e.global:{},r=It(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&It(r.session)?r.session:null,o=r?.supported===!0&&It(r.orchestration)?r.orchestration:null,a=It(e.runner_catalog)?e.runner_catalog:null,i=At(n.quick_fix_impl_model),c=S_(i,s,a),u={};if(s){let f=rs("workflow_mode",t,n,At(s.workflow_mode_default));u.workflow_mode=f.source==="base"?kt(f.value,"base",f.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",f.value,"default"):Pr(f.value,f.source);for(let U of["spec_review","plan_review","impl_review"]){let M=`${U}_model`,D=At(U==="plan_review"?f.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),W=rs(M,t,n,D);if(W.value===null)u[M]=kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(W.value!=="self"&&W.value!=="skip"&&!It(s.review?.reviewers?.[W.value]))u[M]=Wa(kt(W.value,W.source,"",null,"explicit"));else{let E=x_(W.value,s);u[M]=kt(W.value,W.source,Ir(E),E,W.source==="base"?"default":"explicit")}}for(let[U,M]of Object.entries(Ic)){let D=u[M].value;if(D==="self"||D==="skip"){u[U]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let W=At(s.review?.reviewers?.[D||""]?.effort),E=rs(U,t,n,W);u[U]=E.value===null?kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):kt(E.value,E.source,E.value,E.value,E.source==="base"?"default":"explicit")}let h=It(s.implementation?.default)?s.implementation.default:{},y=At(e.route),$=y!==null&&["quick_fix","spec_backed","full_plan"].includes(y),S=It(s.implementation?.route_defaults)?s.implementation.route_defaults:{},F=$&&It(S[y])?S[y]:{};for(let U of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let M=rs(U,t,n,U==="impl_dispatch"?At(F.dispatch)||At(h.dispatch):At(h[U.replace("impl_","")]));u[U]=M.value===null?kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):kt(M.value,M.source,M.value,M.value,M.source==="base"?"default":"explicit")}let B=At(t.impl_runtime),Q=B==="inherit"?At(e.controller_runtime):B,le=y==="quick_fix"&&At(t.impl_dispatch)===null&&c.runtime!==null&&(B===null||Q===c.runtime);if(le){let U=c.runtime,M=i;u.impl_dispatch=kt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(u.impl_runtime=kt(U,"global",`${U} (\uC720\uB3C4)`,U,"explicit")),At(t.impl_model)===null&&(u.impl_model=kt(M,"global",M,M,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let U of["impl_runtime","impl_model","impl_effort","impl_speed"])u[U]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!le&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let U=u.impl_runtime.value==="inherit"?At(e.controller_runtime):u.impl_runtime.value,M=U?Mc(U,s,a):[];if(u.impl_model.value!=="auto"&&M.length>0&&!M.includes(u.impl_model.value))u.impl_model=Wa(u.impl_model);else{let D=Ua(u.impl_model.value,U,s,a);u.impl_model.display=Ir(D),u.impl_model.full_value=D}}if(u.impl_effort.value==="auto"){let U=At(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),M=U?At(s.implementation?.effort_by_transport?.[U]?.auto):null;M&&!$_.has(M)?(u.impl_effort.display=`${M} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=M,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?kt("default","base","default (\uC77C\uBC18)","default","default"):Pr("default",u.impl_speed.source))}}else for(let f of k_.filter(h=>!h.startsWith("orchestration_")))u[f]=Pc(f,t,n);if(!s){for(let[f,h]of Object.entries(Ic))(u[h].value==="self"||u[h].value==="skip")&&(u[f]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let f of["impl_runtime","impl_model","impl_effort","impl_speed"])u[f]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let f of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[f]=Pc(f,t,n);continue}let h=f.replace("orchestration_",""),y=At(o[h]),$=rs(f,t,n,y);if(f==="orchestration_effort"&&$.source==="base"){u[f]=kt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if($.value===null){u[f]=kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(f==="orchestration_model"){let S=$.source==="base"?At(o.model_id)||$.value:Ua($.value,null,s,a);u[f]=kt($.value,$.source,Ir(S),S,$.source==="base"?"default":"explicit");continue}if($.value==="default"){u[f]=$.source==="base"?kt("default","base","default (\uC77C\uBC18)","default","default"):Pr("default",$.source);continue}u[f]=Pr($.value,$.source)}if(s)if(i===null){let f=u.orchestration_model.full_value;u.quick_fix_impl_model=kt(null,"base",f===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Ir(f)})`,null,"default")}else if(c.runtime!==null){let f=Ua(i,c.runtime,s,a);u.quick_fix_impl_model=kt(i,"global",Ir(f),f,"explicit")}else c.offered?u.quick_fix_impl_model=Wa(kt(i,"global","",null,"explicit")):u.quick_fix_impl_model=Pr(i,"global");return u}function E_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function fo(e){let t=It(e.pin)?e.pin:{},n=It(e.global)?e.global:{},r=It(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=h=>{let y={...r,...h};return tn({pin:e.layer==="pin"?y:t,global:e.layer==="pin"?n:y,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],u=At(o[e.key]),f=[...e.choices];return u!==null&&!f.includes(u)&&f.unshift(u),{unset_label:E_(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:f.map(h=>{let y=s({...o,[e.key]:h})[e.key];return{value:h,label:y.display,full_value:y.full_value}})}}function Dr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let c=!1,u=h=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(h))},f=()=>u(r.value.trim());o.addEventListener("click",f),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",h=>{h.key==="Enter"&&(h.ctrlKey||h.metaKey)&&(h.preventDefault(),f())}),t.addEventListener("cancel",h=>{h.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Bc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Dn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],ss=[...Dn,"reasoning_output_tokens"],T_={codex:["implementation","review-consult"],claude:["subagent"]};function za(e){let t=0;for(let n of Dn)t+=Ft(e?.[n]);return t}function C_(e){return!e||typeof e!="object"?!1:Dn.some(t=>Number.isFinite(e[t]))}function Nc(e){return!e||typeof e!="object"?!1:ss.some(t=>Number.isFinite(e[t]))}function R_(e){let t={};for(let n of ss)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function qc(e){let t={};for(let n of ss)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Fc(e,t){return e==="codex"?Ft(t.input_tokens)+Ft(t.output_tokens):za(t)}function O_(e){return e==="claude"?"Claude":"Codex"}function L_(e){return`\u03C4 ${Uc(e)}`}function I_(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${Ft(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${Ft(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Bc),o.join(`
`)}function Bt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${O_(n)} ${L_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:I_(n,r)})}return t}function mo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of ss)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=Ft(i.breakdown[c])+Ft(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ha(e){return!e||typeof e!="object"?null:mn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function P_(e){return e==="codex"?"codex":"claude"}function Rn(){return{subtotal:0,breakdown:R_(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function _o(e,t,n){e.subtotal+=t.subtotal;for(let r of ss)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ft(e.breakdown[r])+Ft(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function jc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Uc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Mr(e){return C_(e)?`\u03C4 ${Uc(za(e))}`:null}function Mn(e){let t=Mr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function os(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${za(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Bc),n.join(`
`)}function mn(e,t){let n={claude:Rn(),codex:Rn()},r={orchestrator:{claude:Rn(),codex:Rn()},implementation:{claude:Rn(),codex:Rn()},"review-consult":{claude:Rn(),codex:Rn()},subagent:{claude:Rn(),codex:Rn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Nc(c)){let f=P_(i.runner),h=qc(c),y={provider:f,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:h,subtotal:Fc(f,h)};h.replayed===!0&&(y.replayed=!0),typeof i.model=="string"&&(y.model=i.model),typeof i.session_id=="string"&&(y.session_id=i.session_id),_o(n[f],y,!0),_o(r.orchestrator[f],y,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let f of u){let h=f&&f.provider==="claude"?"claude":"codex";if(!f||f.provider!=="codex"&&f.provider!=="claude"||!T_[h].includes(f.role)||!Nc(f.usage))continue;let y=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!y||s.has(y))continue;s.add(y);let $=qc(f.usage),S={provider:h,role:f.role,attempt_id:String(i.attempt_id||""),usage:$,subtotal:Fc(h,$)};S.receipt_id=y,typeof f.agent_type=="string"&&(S.agent_type=f.agent_type),typeof f.agent_id=="string"&&(S.agent_id=f.agent_id),typeof f.model=="string"&&(S.model=f.model),typeof f.effort=="string"&&f.effort.trim().length>0&&(S.effort=f.effort),typeof f.session_id=="string"?S.session_id=f.session_id:typeof f.thread_id=="string"&&(S.session_id=f.thread_id),typeof f.turn_id=="string"&&(S.turn_id=f.turn_id),(typeof f.completed_at=="string"||typeof f.completed_at=="number"&&Number.isFinite(f.completed_at))&&(S.completed_at=f.completed_at),$.replayed===!0&&(S.replayed=!0),_o(n[h],S,!1),_o(r[S.role][h],S,!1)}}let o={};for(let i of["claude","codex"]){let c=n[i];if(c.legs.length===0)continue;let u=jc(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let c={};for(let u of["claude","codex"]){let f=r[i][u];f.legs.length>0&&(c[u]={...jc(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:Qc,setPrototypeOf:Wc,isFrozen:D_,getPrototypeOf:M_,getOwnPropertyDescriptor:N_}=Object,{freeze:Yt,seal:gn,create:Xa}=Object,{apply:Ja,construct:ei}=typeof Reflect<"u"&&Reflect;Yt||(Yt=function(t){return t});gn||(gn=function(t){return t});Ja||(Ja=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});ei||(ei=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var go=Zt(Array.prototype.forEach),q_=Zt(Array.prototype.lastIndexOf),zc=Zt(Array.prototype.pop),as=Zt(Array.prototype.push),F_=Zt(Array.prototype.splice),ho=Zt(String.prototype.toLowerCase),Ga=Zt(String.prototype.toString),Va=Zt(String.prototype.match),is=Zt(String.prototype.replace),j_=Zt(String.prototype.indexOf),B_=Zt(String.prototype.trim),wn=Zt(Object.prototype.hasOwnProperty),Kt=Zt(RegExp.prototype.test),ls=U_(TypeError);function Zt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Ja(e,t,r)}}function U_(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ei(e,n)}}function Je(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ho;Wc&&Wc(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(D_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function W_(e){for(let t=0;t<e.length;t++)wn(e,t)||(e[t]=null);return e}function Nn(e){let t=Xa(null);for(let[n,r]of Qc(e))wn(e,n)&&(Array.isArray(r)?t[n]=W_(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Nn(r):t[n]=r);return t}function cs(e,t){for(;e!==null;){let r=N_(e,t);if(r){if(r.get)return Zt(r.get);if(typeof r.value=="function")return Zt(r.value)}e=M_(e)}function n(){return null}return n}var Hc=Yt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ka=Yt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ya=Yt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),z_=Yt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Za=Yt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),H_=Yt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Gc=Yt(["#text"]),Vc=Yt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Qa=Yt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Kc=Yt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),bo=Yt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),G_=gn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),V_=gn(/<%[\w\W]*|[\w\W]*%>/gm),K_=gn(/\$\{[\w\W]*/gm),Y_=gn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Z_=gn(/^aria-[\-\w]+$/),Xc=gn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Q_=gn(/^(?:\w+script|data):/i),X_=gn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Jc=gn(/^html$/i),J_=gn(/^[a-z][.\w]*(-[.\w]+)+$/i),Yc=Object.freeze({__proto__:null,ARIA_ATTR:Z_,ATTR_WHITESPACE:X_,CUSTOM_ELEMENT:J_,DATA_ATTR:Y_,DOCTYPE_NAME:Jc,ERB_EXPR:V_,IS_ALLOWED_URI:Xc,IS_SCRIPT_OR_DATA:Q_,MUSTACHE_EXPR:G_,TMPLIT_EXPR:K_}),us={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},em=function(){return typeof window>"u"?null:window},tm=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Zc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function eu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:em(),t=Ee=>eu(Ee);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==us.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:h,DOMParser:y,trustedTypes:$}=e,S=c.prototype,F=cs(S,"cloneNode"),B=cs(S,"remove"),Q=cs(S,"nextSibling"),le=cs(S,"childNodes"),U=cs(S,"parentNode");if(typeof a=="function"){let Ee=n.createElement("template");Ee.content&&Ee.content.ownerDocument&&(n=Ee.content.ownerDocument)}let M,D="",{implementation:W,createNodeIterator:E,createDocumentFragment:N,getElementsByTagName:ne}=n,{importNode:J}=r,me=Zc();t.isSupported=typeof Qc=="function"&&typeof U=="function"&&W&&W.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:fe,ERB_EXPR:ee,TMPLIT_EXPR:ye,DATA_ATTR:ke,ARIA_ATTR:_e,IS_SCRIPT_OR_DATA:se,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:V}=Yc,{IS_ALLOWED_URI:te}=Yc,pe=null,$e=Je({},[...Hc,...Ka,...Ya,...Za,...Gc]),be=null,Ne=Je({},[...Vc,...Qa,...Kc,...bo]),he=Object.seal(Xa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),He=null,rt=null,ut=Object.seal(Xa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),C=!0,re=!0,we=!1,De=!0,Pe=!1,z=!0,Y=!1,Se=!1,Ke=!1,Ue=!1,Ie=!1,ze=!1,et=!0,qe=!1,je="user-content-",Ze=!0,Xe=!1,bt={},ot=null,_t=Je({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),St=null,mt=Je({},["audio","video","img","source","image","track"]),dt=null,Tt=Je({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),at="http://www.w3.org/1998/Math/MathML",We="http://www.w3.org/2000/svg",Te="http://www.w3.org/1999/xhtml",P=Te,X=!1,ie=null,x=Je({},[at,We,Te],Ga),K=Je({},["mi","mo","mn","ms","mtext"]),xe=Je({},["annotation-xml"]),A=Je({},["title","style","font","a","script"]),O=null,k=["application/xhtml+xml","text/html"],I="text/html",H=null,de=null,ce=n.createElement("form"),ve=function(R){return R instanceof RegExp||R instanceof Function},Qe=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(de&&de===R)){if((!R||typeof R!="object")&&(R={}),R=Nn(R),O=k.indexOf(R.PARSER_MEDIA_TYPE)===-1?I:R.PARSER_MEDIA_TYPE,H=O==="application/xhtml+xml"?Ga:ho,pe=wn(R,"ALLOWED_TAGS")?Je({},R.ALLOWED_TAGS,H):$e,be=wn(R,"ALLOWED_ATTR")?Je({},R.ALLOWED_ATTR,H):Ne,ie=wn(R,"ALLOWED_NAMESPACES")?Je({},R.ALLOWED_NAMESPACES,Ga):x,dt=wn(R,"ADD_URI_SAFE_ATTR")?Je(Nn(Tt),R.ADD_URI_SAFE_ATTR,H):Tt,St=wn(R,"ADD_DATA_URI_TAGS")?Je(Nn(mt),R.ADD_DATA_URI_TAGS,H):mt,ot=wn(R,"FORBID_CONTENTS")?Je({},R.FORBID_CONTENTS,H):_t,He=wn(R,"FORBID_TAGS")?Je({},R.FORBID_TAGS,H):Nn({}),rt=wn(R,"FORBID_ATTR")?Je({},R.FORBID_ATTR,H):Nn({}),bt=wn(R,"USE_PROFILES")?R.USE_PROFILES:!1,C=R.ALLOW_ARIA_ATTR!==!1,re=R.ALLOW_DATA_ATTR!==!1,we=R.ALLOW_UNKNOWN_PROTOCOLS||!1,De=R.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Pe=R.SAFE_FOR_TEMPLATES||!1,z=R.SAFE_FOR_XML!==!1,Y=R.WHOLE_DOCUMENT||!1,Ue=R.RETURN_DOM||!1,Ie=R.RETURN_DOM_FRAGMENT||!1,ze=R.RETURN_TRUSTED_TYPE||!1,Ke=R.FORCE_BODY||!1,et=R.SANITIZE_DOM!==!1,qe=R.SANITIZE_NAMED_PROPS||!1,Ze=R.KEEP_CONTENT!==!1,Xe=R.IN_PLACE||!1,te=R.ALLOWED_URI_REGEXP||Xc,P=R.NAMESPACE||Te,K=R.MATHML_TEXT_INTEGRATION_POINTS||K,xe=R.HTML_INTEGRATION_POINTS||xe,he=R.CUSTOM_ELEMENT_HANDLING||{},R.CUSTOM_ELEMENT_HANDLING&&ve(R.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=R.CUSTOM_ELEMENT_HANDLING.tagNameCheck),R.CUSTOM_ELEMENT_HANDLING&&ve(R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),R.CUSTOM_ELEMENT_HANDLING&&typeof R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Pe&&(re=!1),Ie&&(Ue=!0),bt&&(pe=Je({},Gc),be=[],bt.html===!0&&(Je(pe,Hc),Je(be,Vc)),bt.svg===!0&&(Je(pe,Ka),Je(be,Qa),Je(be,bo)),bt.svgFilters===!0&&(Je(pe,Ya),Je(be,Qa),Je(be,bo)),bt.mathMl===!0&&(Je(pe,Za),Je(be,Kc),Je(be,bo))),R.ADD_TAGS&&(typeof R.ADD_TAGS=="function"?ut.tagCheck=R.ADD_TAGS:(pe===$e&&(pe=Nn(pe)),Je(pe,R.ADD_TAGS,H))),R.ADD_ATTR&&(typeof R.ADD_ATTR=="function"?ut.attributeCheck=R.ADD_ATTR:(be===Ne&&(be=Nn(be)),Je(be,R.ADD_ATTR,H))),R.ADD_URI_SAFE_ATTR&&Je(dt,R.ADD_URI_SAFE_ATTR,H),R.FORBID_CONTENTS&&(ot===_t&&(ot=Nn(ot)),Je(ot,R.FORBID_CONTENTS,H)),Ze&&(pe["#text"]=!0),Y&&Je(pe,["html","head","body"]),pe.table&&(Je(pe,["tbody"]),delete He.tbody),R.TRUSTED_TYPES_POLICY){if(typeof R.TRUSTED_TYPES_POLICY.createHTML!="function")throw ls('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof R.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ls('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=R.TRUSTED_TYPES_POLICY,D=M.createHTML("")}else M===void 0&&(M=tm($,s)),M!==null&&typeof D=="string"&&(D=M.createHTML(""));Yt&&Yt(R),de=R}},Ve=Je({},[...Ka,...Ya,...z_]),Ce=Je({},[...Za,...H_]),lt=function(R){let ue=U(R);(!ue||!ue.tagName)&&(ue={namespaceURI:P,tagName:"template"});let Oe=ho(R.tagName),tt=ho(ue.tagName);return ie[R.namespaceURI]?R.namespaceURI===We?ue.namespaceURI===Te?Oe==="svg":ue.namespaceURI===at?Oe==="svg"&&(tt==="annotation-xml"||K[tt]):!!Ve[Oe]:R.namespaceURI===at?ue.namespaceURI===Te?Oe==="math":ue.namespaceURI===We?Oe==="math"&&xe[tt]:!!Ce[Oe]:R.namespaceURI===Te?ue.namespaceURI===We&&!xe[tt]||ue.namespaceURI===at&&!K[tt]?!1:!Ce[Oe]&&(A[Oe]||!Ve[Oe]):!!(O==="application/xhtml+xml"&&ie[R.namespaceURI]):!1},it=function(R){as(t.removed,{element:R});try{U(R).removeChild(R)}catch{B(R)}},Lt=function(R,ue){try{as(t.removed,{attribute:ue.getAttributeNode(R),from:ue})}catch{as(t.removed,{attribute:null,from:ue})}if(ue.removeAttribute(R),R==="is")if(Ue||Ie)try{it(ue)}catch{}else try{ue.setAttribute(R,"")}catch{}},Pt=function(R){let ue=null,Oe=null;if(Ke)R="<remove></remove>"+R;else{let pt=Va(R,/^[\r\n\t ]+/);Oe=pt&&pt[0]}O==="application/xhtml+xml"&&P===Te&&(R='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+R+"</body></html>");let tt=M?M.createHTML(R):R;if(P===Te)try{ue=new y().parseFromString(tt,O)}catch{}if(!ue||!ue.documentElement){ue=W.createDocument(P,"template",null);try{ue.documentElement.innerHTML=X?D:tt}catch{}}let yt=ue.body||ue.documentElement;return R&&Oe&&yt.insertBefore(n.createTextNode(Oe),yt.childNodes[0]||null),P===Te?ne.call(ue,Y?"html":"body")[0]:Y?ue.documentElement:yt},Wt=function(R){return E.call(R.ownerDocument||R,R,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Dt=function(R){return R instanceof h&&(typeof R.nodeName!="string"||typeof R.textContent!="string"||typeof R.removeChild!="function"||!(R.attributes instanceof f)||typeof R.removeAttribute!="function"||typeof R.setAttribute!="function"||typeof R.namespaceURI!="string"||typeof R.insertBefore!="function"||typeof R.hasChildNodes!="function")},zt=function(R){return typeof i=="function"&&R instanceof i};function ht(Ee,R,ue){go(Ee,Oe=>{Oe.call(t,R,ue,de)})}let Mt=function(R){let ue=null;if(ht(me.beforeSanitizeElements,R,null),Dt(R))return it(R),!0;let Oe=H(R.nodeName);if(ht(me.uponSanitizeElement,R,{tagName:Oe,allowedTags:pe}),z&&R.hasChildNodes()&&!zt(R.firstElementChild)&&Kt(/<[/\w!]/g,R.innerHTML)&&Kt(/<[/\w!]/g,R.textContent)||R.nodeType===us.progressingInstruction||z&&R.nodeType===us.comment&&Kt(/<[/\w]/g,R.data))return it(R),!0;if(!(ut.tagCheck instanceof Function&&ut.tagCheck(Oe))&&(!pe[Oe]||He[Oe])){if(!He[Oe]&&Ht(Oe)&&(he.tagNameCheck instanceof RegExp&&Kt(he.tagNameCheck,Oe)||he.tagNameCheck instanceof Function&&he.tagNameCheck(Oe)))return!1;if(Ze&&!ot[Oe]){let tt=U(R)||R.parentNode,yt=le(R)||R.childNodes;if(yt&&tt){let pt=yt.length;for(let Et=pt-1;Et>=0;--Et){let Rt=F(yt[Et],!0);Rt.__removalCount=(R.__removalCount||0)+1,tt.insertBefore(Rt,Q(R))}}}return it(R),!0}return R instanceof c&&!lt(R)||(Oe==="noscript"||Oe==="noembed"||Oe==="noframes")&&Kt(/<\/no(script|embed|frames)/i,R.innerHTML)?(it(R),!0):(Pe&&R.nodeType===us.text&&(ue=R.textContent,go([fe,ee,ye],tt=>{ue=is(ue,tt," ")}),R.textContent!==ue&&(as(t.removed,{element:R.cloneNode()}),R.textContent=ue)),ht(me.afterSanitizeElements,R,null),!1)},Fe=function(R,ue,Oe){if(et&&(ue==="id"||ue==="name")&&(Oe in n||Oe in ce))return!1;if(!(re&&!rt[ue]&&Kt(ke,ue))){if(!(C&&Kt(_e,ue))){if(!(ut.attributeCheck instanceof Function&&ut.attributeCheck(ue,R))){if(!be[ue]||rt[ue]){if(!(Ht(R)&&(he.tagNameCheck instanceof RegExp&&Kt(he.tagNameCheck,R)||he.tagNameCheck instanceof Function&&he.tagNameCheck(R))&&(he.attributeNameCheck instanceof RegExp&&Kt(he.attributeNameCheck,ue)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(ue,R))||ue==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&Kt(he.tagNameCheck,Oe)||he.tagNameCheck instanceof Function&&he.tagNameCheck(Oe))))return!1}else if(!dt[ue]){if(!Kt(te,is(Oe,Ae,""))){if(!((ue==="src"||ue==="xlink:href"||ue==="href")&&R!=="script"&&j_(Oe,"data:")===0&&St[R])){if(!(we&&!Kt(se,is(Oe,Ae,"")))){if(Oe)return!1}}}}}}}return!0},Ht=function(R){return R!=="annotation-xml"&&Va(R,V)},Xt=function(R){ht(me.beforeSanitizeAttributes,R,null);let{attributes:ue}=R;if(!ue||Dt(R))return;let Oe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:be,forceKeepAttr:void 0},tt=ue.length;for(;tt--;){let yt=ue[tt],{name:pt,namespaceURI:Et,value:Rt}=yt,Gt=H(pt),Jt=Rt,vt=pt==="value"?Jt:B_(Jt);if(Oe.attrName=Gt,Oe.attrValue=vt,Oe.keepAttr=!0,Oe.forceKeepAttr=void 0,ht(me.uponSanitizeAttribute,R,Oe),vt=Oe.attrValue,qe&&(Gt==="id"||Gt==="name")&&(Lt(pt,R),vt=je+vt),z&&Kt(/((--!?|])>)|<\/(style|title|textarea)/i,vt)){Lt(pt,R);continue}if(Gt==="attributename"&&Va(vt,"href")){Lt(pt,R);continue}if(Oe.forceKeepAttr)continue;if(!Oe.keepAttr){Lt(pt,R);continue}if(!De&&Kt(/\/>/i,vt)){Lt(pt,R);continue}Pe&&go([fe,ee,ye],pn=>{vt=is(vt,pn," ")});let rn=H(R.nodeName);if(!Fe(rn,Gt,vt)){Lt(pt,R);continue}if(M&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!Et)switch($.getAttributeType(rn,Gt)){case"TrustedHTML":{vt=M.createHTML(vt);break}case"TrustedScriptURL":{vt=M.createScriptURL(vt);break}}if(vt!==Jt)try{Et?R.setAttributeNS(Et,pt,vt):R.setAttribute(pt,vt),Dt(R)?it(R):zc(t.removed)}catch{Lt(pt,R)}}ht(me.afterSanitizeAttributes,R,null)},Ye=function Ee(R){let ue=null,Oe=Wt(R);for(ht(me.beforeSanitizeShadowDOM,R,null);ue=Oe.nextNode();)ht(me.uponSanitizeShadowNode,ue,null),Mt(ue),Xt(ue),ue.content instanceof o&&Ee(ue.content);ht(me.afterSanitizeShadowDOM,R,null)};return t.sanitize=function(Ee){let R=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ue=null,Oe=null,tt=null,yt=null;if(X=!Ee,X&&(Ee="<!-->"),typeof Ee!="string"&&!zt(Ee))if(typeof Ee.toString=="function"){if(Ee=Ee.toString(),typeof Ee!="string")throw ls("dirty is not a string, aborting")}else throw ls("toString is not a function");if(!t.isSupported)return Ee;if(Se||Qe(R),t.removed=[],typeof Ee=="string"&&(Xe=!1),Xe){if(Ee.nodeName){let Rt=H(Ee.nodeName);if(!pe[Rt]||He[Rt])throw ls("root node is forbidden and cannot be sanitized in-place")}}else if(Ee instanceof i)ue=Pt("<!---->"),Oe=ue.ownerDocument.importNode(Ee,!0),Oe.nodeType===us.element&&Oe.nodeName==="BODY"||Oe.nodeName==="HTML"?ue=Oe:ue.appendChild(Oe);else{if(!Ue&&!Pe&&!Y&&Ee.indexOf("<")===-1)return M&&ze?M.createHTML(Ee):Ee;if(ue=Pt(Ee),!ue)return Ue?null:ze?D:""}ue&&Ke&&it(ue.firstChild);let pt=Wt(Xe?Ee:ue);for(;tt=pt.nextNode();)Mt(tt),Xt(tt),tt.content instanceof o&&Ye(tt.content);if(Xe)return Ee;if(Ue){if(Ie)for(yt=N.call(ue.ownerDocument);ue.firstChild;)yt.appendChild(ue.firstChild);else yt=ue;return(be.shadowroot||be.shadowrootmode)&&(yt=J.call(r,yt,!0)),yt}let Et=Y?ue.outerHTML:ue.innerHTML;return Y&&pe["!doctype"]&&ue.ownerDocument&&ue.ownerDocument.doctype&&ue.ownerDocument.doctype.name&&Kt(Jc,ue.ownerDocument.doctype.name)&&(Et="<!DOCTYPE "+ue.ownerDocument.doctype.name+`>
`+Et),Pe&&go([fe,ee,ye],Rt=>{Et=is(Et,Rt," ")}),M&&ze?M.createHTML(Et):Et},t.setConfig=function(){let Ee=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Qe(Ee),Se=!0},t.clearConfig=function(){de=null,Se=!1},t.isValidAttribute=function(Ee,R,ue){de||Qe({});let Oe=H(Ee),tt=H(R);return Fe(Oe,tt,ue)},t.addHook=function(Ee,R){typeof R=="function"&&as(me[Ee],R)},t.removeHook=function(Ee,R){if(R!==void 0){let ue=q_(me[Ee],R);return ue===-1?void 0:F_(me[Ee],ue,1)[0]}return zc(me[Ee])},t.removeHooks=function(Ee){me[Ee]=[]},t.removeAllHooks=function(){me=Zc()},t}var tu=eu();var qn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},yo=e=>(...t)=>({_$litDirective$:e,values:t}),Nr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ds=class extends Nr{constructor(t){if(super(t),this.it=Ct,t.type!==qn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ct||t==null)return this._t=void 0,this.it=t;if(t===fn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ds.directiveName="unsafeHTML",ds.resultType=1;var nu=yo(ds);function si(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var mr=si();function cu(e){mr=e}var ms={exec:()=>null};function ct(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Qt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var nm=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Qt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},rm=/^(?:[ \t]*(?:\n|$))+/,sm=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,om=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,gs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,am=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,oi=/(?:[*+-]|\d{1,9}[.)])/,uu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,du=ct(uu).replace(/bull/g,oi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),im=ct(uu).replace(/bull/g,oi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ai=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,lm=/^[^\n]+/,ii=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,cm=ct(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ii).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),um=ct(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,oi).getRegex(),Ao="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",li=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,dm=ct("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",li).replace("tag",Ao).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),pu=ct(ai).replace("hr",gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ao).getRegex(),pm=ct(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",pu).getRegex(),ci={blockquote:pm,code:sm,def:cm,fences:om,heading:am,hr:gs,html:dm,lheading:du,list:um,newline:rm,paragraph:pu,table:ms,text:lm},ru=ct("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ao).getRegex(),fm={...ci,lheading:im,table:ru,paragraph:ct(ai).replace("hr",gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ru).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ao).getRegex()},_m={...ci,html:ct(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",li).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ms,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ct(ai).replace("hr",gs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",du).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},mm=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,gm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,fu=/^( {2,}|\\)\n(?!\s*$)/,bm=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,So=/[\p{P}\p{S}]/u,ui=/[\s\p{P}\p{S}]/u,_u=/[^\s\p{P}\p{S}]/u,hm=ct(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ui).getRegex(),mu=/(?!~)[\p{P}\p{S}]/u,ym=/(?!~)[\s\p{P}\p{S}]/u,vm=/(?:[^\s\p{P}\p{S}]|~)/u,wm=ct(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",nm?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),gu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,km=ct(gu,"u").replace(/punct/g,So).getRegex(),$m=ct(gu,"u").replace(/punct/g,mu).getRegex(),bu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",xm=ct(bu,"gu").replace(/notPunctSpace/g,_u).replace(/punctSpace/g,ui).replace(/punct/g,So).getRegex(),Am=ct(bu,"gu").replace(/notPunctSpace/g,vm).replace(/punctSpace/g,ym).replace(/punct/g,mu).getRegex(),Sm=ct("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,_u).replace(/punctSpace/g,ui).replace(/punct/g,So).getRegex(),Em=ct(/\\(punct)/,"gu").replace(/punct/g,So).getRegex(),Tm=ct(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Cm=ct(li).replace("(?:-->|$)","-->").getRegex(),Rm=ct("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Cm).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ko=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Om=ct(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ko).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),hu=ct(/^!?\[(label)\]\[(ref)\]/).replace("label",ko).replace("ref",ii).getRegex(),yu=ct(/^!?\[(ref)\](?:\[\])?/).replace("ref",ii).getRegex(),Lm=ct("reflink|nolink(?!\\()","g").replace("reflink",hu).replace("nolink",yu).getRegex(),su=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,di={_backpedal:ms,anyPunctuation:Em,autolink:Tm,blockSkip:wm,br:fu,code:gm,del:ms,emStrongLDelim:km,emStrongRDelimAst:xm,emStrongRDelimUnd:Sm,escape:mm,link:Om,nolink:yu,punctuation:hm,reflink:hu,reflinkSearch:Lm,tag:Rm,text:bm,url:ms},Im={...di,link:ct(/^!?\[(label)\]\((.*?)\)/).replace("label",ko).getRegex(),reflink:ct(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ko).getRegex()},ti={...di,emStrongRDelimAst:Am,emStrongLDelim:$m,url:ct(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",su).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ct(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",su).getRegex()},Pm={...ti,br:ct(fu).replace("{2,}","*").getRegex(),text:ct(ti.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},vo={normal:ci,gfm:fm,pedantic:_m},ps={normal:di,gfm:ti,breaks:Pm,pedantic:Im},Dm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ou=e=>Dm[e];function Fn(e,t){if(t){if(Qt.escapeTest.test(e))return e.replace(Qt.escapeReplace,ou)}else if(Qt.escapeTestNoEncode.test(e))return e.replace(Qt.escapeReplaceNoEncode,ou);return e}function au(e){try{e=encodeURI(e).replace(Qt.percentDecode,"%")}catch{return null}return e}function iu(e,t){let n=e.replace(Qt.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),r=n.split(Qt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Qt.slashPipe,"|");return r}function fs(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function Mm(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function lu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,c}function Nm(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var $o=class{constructor(e){gt(this,"options");gt(this,"rules");gt(this,"lexer");this.options=e||mr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:fs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Nm(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=fs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:fs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=fs(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))i.push(n[c]),a=!0;else if(!a)i.push(n[c]);else break;n=n.slice(c);let u=i.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${f}`:f;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=h,n.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let $=y,S=$.raw+`
`+n.join(`
`),F=this.blockquote(S);o[o.length-1]=F,r=r.substring(0,r.length-$.raw.length)+F.raw,s=s.substring(0,s.length-$.text.length)+F.text;break}else if(y?.type==="list"){let $=y,S=$.raw+`
`+n.join(`
`),F=this.list(S);o[o.length-1]=F,r=r.substring(0,r.length-y.raw.length)+F.raw,s=s.substring(0,s.length-$.raw.length)+F.raw,n=S.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let h=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,F=>" ".repeat(3*F.length)),y=e.split(`
`,1)[0],$=!h.trim(),S=0;if(this.options.pedantic?(S=2,f=h.trimStart()):$?S=t[1].length+1:(S=t[2].search(this.rules.other.nonSpaceChar),S=S>4?1:S,f=h.slice(S),S+=t[1].length),$&&this.rules.other.blankLine.test(y)&&(u+=y+`
`,e=e.substring(y.length+1),c=!0),!c){let F=this.rules.other.nextBulletRegex(S),B=this.rules.other.hrRegex(S),Q=this.rules.other.fencesBeginRegex(S),le=this.rules.other.headingBeginRegex(S),U=this.rules.other.htmlBeginRegex(S);for(;e;){let M=e.split(`
`,1)[0],D;if(y=M,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),D=y):D=y.replace(this.rules.other.tabCharGlobal,"    "),Q.test(y)||le.test(y)||U.test(y)||F.test(y)||B.test(y))break;if(D.search(this.rules.other.nonSpaceChar)>=S||!y.trim())f+=`
`+D.slice(S);else{if($||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Q.test(h)||le.test(h)||B.test(h))break;f+=`
`+y}!$&&!y.trim()&&($=!0),u+=M+`
`,e=e.substring(M.length+1),h=D.slice(S)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(h=>h.type==="space"),f=u.length>0&&u.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=iu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(iu(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=fs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Mm(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),lu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return lu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,c=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let f=[...r[0]][0].length,h=e.slice(0,s+r.index+f+a);if(Math.min(s,a)%2){let $=h.slice(1,-1);return{type:"em",raw:h,text:$,tokens:this.lexer.inlineTokens($)}}let y=h.slice(2,-2);return{type:"strong",raw:h,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},kn=class ni{constructor(t){gt(this,"tokens");gt(this,"options");gt(this,"state");gt(this,"inlineQueue");gt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||mr,this.options.tokenizer=this.options.tokenizer||new $o,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Qt,block:vo.normal,inline:ps.normal};this.options.pedantic?(n.block=vo.pedantic,n.inline=ps.pedantic):this.options.gfm&&(n.block=vo.gfm,this.options.breaks?n.inline=ps.breaks:n.inline=ps.gfm),this.tokenizer.rules=n}static get rules(){return{block:vo,inline:ps}}static lex(t,n){return new ni(n).lex(t)}static lexInline(t,n){return new ni(n).inlineTokens(t)}lex(t){t=t.replace(Qt.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=n.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,i)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,h=t.slice(1),y;this.options.extensions.startInline.forEach($=>{y=$.call({lexer:this},h),typeof y=="number"&&y>=0&&(f=Math.min(f,y))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let f=n.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):n.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},xo=class{constructor(e){gt(this,"options");gt(this,"parser");this.options=e||mr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Qt.notSpaceStart)?.[0],s=e.replace(Qt.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Fn(r)+'">'+(n?s:Fn(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Fn(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Fn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=au(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Fn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=au(e);if(s===null)return Fn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Fn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Fn(e.text)}},pi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},$n=class ri{constructor(t){gt(this,"options");gt(this,"renderer");gt(this,"textRenderer");this.options=t||mr,this.options.renderer=this.options.renderer||new xo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new pi}static parse(t,n){return new ri(n).parse(t)}static parseInline(t,n){return new ri(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},wo,_s=(wo=class{constructor(e){gt(this,"options");gt(this,"block");this.options=e||mr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?kn.lex:kn.lexInline}provideParser(){return this.block?$n.parse:$n.parseInline}},gt(wo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),gt(wo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),wo),qm=class{constructor(...e){gt(this,"defaults",si());gt(this,"options",this.setOptions);gt(this,"parse",this.parseMarkdown(!0));gt(this,"parseInline",this.parseMarkdown(!1));gt(this,"Parser",$n);gt(this,"Renderer",xo);gt(this,"TextRenderer",pi);gt(this,"Lexer",kn);gt(this,"Tokenizer",$o);gt(this,"Hooks",_s);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new xo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new $o(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new _s;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],c=s[a];_s.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&_s.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await i.call(s,u);return c.call(s,h)})();let f=i.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let h=await i.apply(s,u);return h===!1&&(h=await c.apply(s,u)),h})();let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return kn.lex(e,t??this.defaults)}parser(e,t){return $n.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?kn.lex:kn.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?$n.parse:$n.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?kn.lex:kn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?$n.parse:$n.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Fn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},_r=new qm;function ft(e,t){return _r.parse(e,t)}ft.options=ft.setOptions=function(e){return _r.setOptions(e),ft.defaults=_r.defaults,cu(ft.defaults),ft};ft.getDefaults=si;ft.defaults=mr;ft.use=function(...e){return _r.use(...e),ft.defaults=_r.defaults,cu(ft.defaults),ft};ft.walkTokens=function(e,t){return _r.walkTokens(e,t)};ft.parseInline=_r.parseInline;ft.Parser=$n;ft.parser=$n.parse;ft.Renderer=xo;ft.TextRenderer=pi;ft.Lexer=kn;ft.lexer=kn.lex;ft.Tokenizer=$o;ft.Hooks=_s;ft.parse=ft;var nw=ft.options,rw=ft.setOptions,sw=ft.use,ow=ft.walkTokens,aw=ft.parseInline;var iw=$n.parse,lw=kn.lex;function Yn(e){let t=ft.parse(e),n=tu.sanitize(t);return nu(n)}function jn(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function qr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Eo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var wu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Fm={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},jm=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Bm=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function On(e){return!!e&&typeof e=="object"}function fi(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function _i(e,t){let n=fi(e),r=fi(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function ku(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>On(s)&&typeof s.text=="string"?s.text:"").join(""):On(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Um(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:wu[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=fi(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=_i(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let c=_i(On(i)?i.old_string:"",On(i)?i.new_string:"");s+=c.added,o+=c.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function mi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function gi(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=jm.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Bm.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Wm(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function zm(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(On(a)){if(a.type==="text"&&typeof a.text=="string")o.push(gi(a.text));else if(a.type==="thinking"){let i=mi(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Um(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?vu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(On(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=ku(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?vu([s],n):[s]}return[]}function vu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Hm(e){let t=typeof e.command=="string"?e.command:"",n=ku(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:wu.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Gm(e){if(e.type==="item.completed"&&On(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[gi(t.text)];if(t.type==="reasoning"){let n=mi(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Hm(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Vm(e){if(e.schema!=="codex-delegation-monitor-v1"||!On(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&On(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[gi(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=mi(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Fm[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Km(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ym(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return On(t)?t:null}function $u(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Ym(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Wm(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Vm(o):Km(o)?Gm(o):zm(o,n);return a.length>0&&(r.progress=null),a}}}function bi(e){let t=[],n=$u(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Zm=5,Qm=10,Xm=/Task\s+#(\d+)/,Jm=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,eg=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function To(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function tg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function ng(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function rg(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Xm.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function sg(e){if(e.tool==="Bash"){let t=e.command||"";return Jm.test(t)?"~ PR/\uAC8C\uC2DC \uC911":eg.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function og(e){let t=e.filter(s=>s.kind==="tool").slice(-Qm),n=new Map;t.forEach((s,o)=>{let a=sg(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function ag(e){let t=ng(e);if(t)return{text:t,guess:!1};let n=rg(e);if(n)return{text:n,guess:!1};let r=og(e);return r?{text:r,guess:!0}:null}function ig(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:ln(e,t)}function Fr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,c=null,u=!1,f={},h=!0,y=new Set,$=new Set,S=null,F=null,B=!1,Q=!1,le=!1,U=null,M=null;function D(){B=!1,Q=!1,le=!1,U=null,M=null}async function W(z){if(n){Q=!0,le=!1,he();try{let Y=await Promise.resolve(n("get-attempt-prompt",{attempt_id:z,...c?{root_dir:c}:{}}));if(o!==z)return;!Y||typeof Y!="object"||Array.isArray(Y)?le=!0:(U=Y,M=z)}catch{o===z&&(le=!0)}finally{o===z&&(Q=!1,he())}}}function E(){if(B=!B,B&&o&&M!==o){W(o);return}he()}function N(){if(!B)return"";let z=qr({loading:Q,error:le});if(z)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${z}
      </div>`;if(!U)return"";if(U.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Y=Eo(U.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Y?l`<div class="prompt-block__meta">${Y} 발송</div>`:""}
      ${typeof U.task_prompt=="string"?jn("\uACFC\uC5C5 (user)",U.task_prompt):""}
      ${typeof U.system_prompt=="string"?jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",U.system_prompt):""}
    </div>`}function ne(){if(!i||!r)return[];let z=r.get(i);return bi(z?z.lines:[])}function J(){if(!i||!r)return null;let z=r.get(i),Y=z?z.last_event_at:null;return typeof Y=="number"?Y:null}function me(){return f.status==="running"}function fe(){if(me()&&o){F||(F=setInterval(()=>he(),1e3));return}ee()}function ee(){F&&(clearInterval(F),F=null)}function ye(z){let Y=[],Se=0;for(;Se<z.length;){let{idx:Ke,line:Ue}=z[Se];if(Ue.kind==="tool"){let Ie=Se;for(;Ie<z.length&&z[Ie].line.kind==="tool"&&z[Ie].line.tool===Ue.tool;)Ie+=1;if(Ie-Se>=Zm&&!$.has(Ke)){Y.push({kind:"group",idx:Ke,tool:Ue.tool||"",lines:z.slice(Se,Ie)}),Se=Ie;continue}}Y.push({kind:"line",idx:Ke,line:Ue}),Se+=1}return Y}function ke(z){let Y=[],Se=new Map;for(let Ie=0;Ie<z.length;Ie+=1){let ze=z[Ie],et=ze.parent_tool_use_id;if(typeof et=="string"&&et.length>0){let qe=Se.get(et);qe||(qe={kind:"subagent",idx:Ie,launch_id:et,agent_type:null,header:null,lines:[]},Se.set(et,qe),Y.push(qe)),qe.lines.push({idx:Ie,line:ze});continue}if(ze.kind==="tool"&&ze.tool==="Agent"&&typeof ze.launch_id=="string"&&ze.launch_id.length>0){let qe=_e(ze),je=Se.get(ze.launch_id);if(je){je.header={idx:Ie,line:ze},je.agent_type=qe;continue}let Ze={kind:"subagent",idx:Ie,launch_id:ze.launch_id,agent_type:qe,header:{idx:Ie,line:ze},lines:[]};Se.set(ze.launch_id,Ze),Y.push(Ze);continue}Y.push({kind:"entry",idx:Ie,line:ze})}let Ke=[],Ue=0;for(;Ue<Y.length;){if(Y[Ue].kind!=="entry"){Ke.push(Y[Ue]),Ue+=1;continue}let Ie=Ue;for(;Ie<Y.length&&Y[Ie].kind==="entry";)Ie+=1;Ke.push(...ye(Y.slice(Ue,Ie))),Ue=Ie}return Ke}function _e(z){let Y=z.input;return Y&&typeof Y.subagent_type=="string"?Y.subagent_type:null}function se(z){for(let Y=z.length-1;Y>=0;Y-=1){let Se=z[Y];if(Se.kind==="result"||Se.kind==="error")return null;if(Se.kind==="tool"&&!Object.hasOwn(Se,"result"))return Se}return null}function Ae(z){for(let Y=z.length-1;Y>=0;Y-=1)if(z[Y].kind==="thinking")return z[Y];return null}function V(z,Y){if(Y.kind==="gate")return l`<div class="sv__gate">${Y.text}</div>`;if(Y.kind==="phase")return l`<div class="sv__phase">${Y.text}</div>`;if(Y.kind==="result")return l`<div
        class="sv__result${Y.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Y.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Yn(Y.text||(Y.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Y.kind==="thinking"){let Se=y.has(z);return l`<div
        class="sv__think${Se?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>rt(z)}
      >
        <span class="sv__think-line">💭 ${To(Y.text)}</span>
        ${Se?l`<pre class="sv__think-expand">${Y.text}</pre>`:""}
      </div>`}if(Y.kind==="error")return l`<div class="sv__error">⛔ ${Y.text}</div>`;if(Y.kind==="blocker")return l`<div class="sv__error">⛔ ${Y.text}</div>`;if(Y.kind==="tool"){let Se=y.has(z),Ke=Y.tool==="Bash"?tg(Y.command):0,Ue=Y.tool==="Bash"?Ke>1?To(Y.command):Y.command:Y.path||Y.command||"";return l`<div
        class="sv__tool${Se?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>rt(z)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Y.icon}</span>
          <span class="sv__tool-name">${Y.tool}</span>
          ${Ue?l`<span class="sv__tool-detail">${Ue}</span>`:""}
          ${Ke>1?l`<span class="sv__tool-more">⋯ ${Ke}줄</span>`:""}
          ${typeof Y.added=="number"?l`<span class="sv__diff-add">+${Y.added}</span>`:""}
          ${typeof Y.removed=="number"?l`<span class="sv__diff-del">−${Y.removed}</span>`:""}
          ${Y.result?l`<span class="sv__tool-ok">→ ${Y.result}</span>`:""}
        </span>
        ${Se?l`<pre class="sv__tool-expand">${te(Y)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Yn(Y.text||"")}</div>`}function te(z){let Y=[];if(z.tool==="Bash"&&typeof z.command=="string"&&z.command.length>0)Y.push(z.command);else if(z.input!==void 0)try{Y.push(`input: ${JSON.stringify(z.input,null,2)}`)}catch{}return typeof z.output=="string"&&z.output.length>0&&Y.push(`output:
${z.output}`),Y.join(`

`)}function pe(){if(!o)return l``;let z=ne(),Y=(a?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Se=f.session_id||"",Ke=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,Ue=me(),Ie=Ue?ig(J(),Date.now()):"",ze=Ue?se(z):null,et=Ue?Ae(z):null,qe=ag(z);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?f.role||"":o}</span>
        ${qe?l`<span
              class="sv__stage${qe.guess?" sv__stage--guess":""}"
              title=${qe.text}
              >${qe.text}</span
            >`:""}
        ${Ue?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ie?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ie}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ie?l`<span class="sv__live-ago">${Ie}</span>`:""}</span
            >`:""}
        ${Se?l`<button
              type="button"
              class="sv__session"
              title=${Se}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Se}`}
              @click=${()=>C(Se)}
            >
              ⧉ ${Se.slice(0,8)}
            </button>`:""}
        ${Y?l`<span class="sv__meta">${Y}</span>`:""}
        ${f.worktree?l`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${a||u?"":l`<button
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
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${Ke}
          @click=${ut}
        >
          <span class="sv__follow-full">⇣ ${Ke}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Pe()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":N()}
      <div class="sv__body">
        ${z.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:ke(z).map(je=>je.kind==="subagent"?be(je):je.kind==="group"?$e(je):V(je.idx,je.line))}
      </div>
      ${ze||et?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${ze?l`<span class="sv__now-icon">${ze.icon}</span>
                  <span class="sv__now-name">${ze.tool}</span>
                  <span class="sv__now-detail"
                    >${ze.tool==="Bash"?To(ze.command):ze.path||ze.command||""}</span
                  >`:""}
            ${et?l`<span class="sv__now-think"
                  >💭 ${To(et.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function $e(z){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ne(z.idx)}
    >
      <span class="sv__group-icon">${z.lines[0].line.icon}</span>
      <span class="sv__group-name">${z.tool}</span>
      <span class="sv__group-count">${z.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function be(z){let Y=$.has(z.idx),Se=z.header?z.header.line:null,Ke=Se?Se.is_error===!0?"\u2717":typeof Se.result=="string"?"\u2713":"\u27F3":"",Ue=Se&&Se.command?Se.command:"";return l`<div class="sv__sub${Y?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ne(z.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${z.agent_type||"subagent"}</span>
        ${Ue?l`<span class="sv__sub-detail">${Ue}</span>`:""}
        <span class="sv__sub-count">${z.lines.length}줄</span>
        ${Ke?l`<span class="sv__sub-state">${Ke}</span>`:""}
        ${Y?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Y?l`<div class="sv__sub-body">
            ${ye(z.lines).map(Ie=>Ie.kind==="group"?$e(Ie):V(Ie.idx,Ie.line))}
          </div>`:""}
    </div>`}function Ne(z){$.add(z),he()}function he(){Ge(pe(),e),fe(),h&&He()}function He(){let z=e.querySelector(".sv__body");z&&(z.scrollTop=z.scrollHeight)}function rt(z){y.has(z)?y.delete(z):y.add(z),he()}function ut(){h=!h,he()}function C(z){cn(z).then(Y=>{Y?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function re(z){!o||!z||(f={...f,...z},he())}function we(z){let Y=z.target;if(!Y||!Y.classList||!Y.classList.contains("sv__body"))return;!(Y.scrollHeight-Y.scrollTop-Y.clientHeight<=4)&&h&&(h=!1,he())}e.addEventListener("scroll",we,!0);function De(z){let Y=z&&z.attempt_id;if(!Y)return;let Se=i;o=Y,a=typeof z.launch_id=="string"&&z.launch_id.length>0?z.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Se&&Se!==i&&Promise.resolve(n("unsubscribe-session-log",{id:Se})).catch(()=>{}),c=typeof z.root_dir=="string"&&z.root_dir.length>0?z.root_dir:null,f=z.meta||{},u=z.hide_prompt===!0,h=!0,y.clear(),$.clear(),D(),!S&&r&&(S=r.subscribe(he)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),he()}function Pe(){let z=i;o=null,a=null,i=null,c=null,u=!1,y.clear(),$.clear(),D(),ee(),n&&z&&Promise.resolve(n("unsubscribe-session-log",{id:z})).catch(()=>{}),Ge(l``,e),s&&s()}return{open:De,updateMeta:re,close:Pe,isOpen(){return o!==null},destroy(){ee(),S&&(S(),S=null),e.removeEventListener("scroll",we,!0),o=null,a=null,i=null,c=null,u=!1,Ge(l``,e)}}}function Co(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=hi(t.spec_id),s=hi(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function hi(e){return typeof e=="string"?e.trim():""}function xu(e){let t=Co(e);if(t.path)return t;let n=hi(lg(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function lg(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function cg(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function ug(e){let t=e&&e.metadata||{},n=xu(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:cg(t)?null:"plan_pending"}),r}function Au(e,t){let n=ug(e);return l`
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
  `}var dg="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",pg=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,fg=/^\*\*결론\*\* — (.+)$/;function Ro(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==dg)return null;let n=pg.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?fg.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Su=20;function Eu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function _g(e){return e.length>Su?`${e.slice(0,Su)}\u2026`:e}function mg(e,t,n,r){let s=`${t.lane} ${_g(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Eu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?l`<div class="detail-report__body">
          ${Yn(t.body)}
        </div>`:""}
  </div>`}function gg(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Eu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Yn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Tu(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=Ro(typeof c.text=="string"?c.text:"");return u?mg(c,u,t,s.has(c.id)):gg(c)})}
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
  `}var{I:Ww}=Vl;var Cu=e=>e.strings===void 0;var bg={},Ru=(e,t=bg)=>e._$AH=t;var gr=yo(class extends Nr{constructor(e){if(super(e),e.type!==qn.PROPERTY&&e.type!==qn.ATTRIBUTE&&e.type!==qn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Cu(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===fn||t===Ct)return t;let n=e.element,r=e.name;if(e.type===qn.PROPERTY){if(t===n[r])return fn}else if(e.type===qn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return fn}else if(e.type===qn.ATTRIBUTE&&n.getAttribute(r)===t+"")return fn;return Ru(e),t}});var Oo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],vi=[...Oo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Bn=["orchestration_model","orchestration_effort","orchestration_speed"],Lo=[...Oo,...Bn],hg=vi.filter(e=>Lo.includes(e)),Ou=["delegated","main"],Io=["inherit","claude","codex"],bs=["default","fast"],hs=["standard","fast_track"],ys=["codex","opus","fable","self","skip"],Po=["codex","fable","skip"],Do=["low","medium","high","xhigh"],dn="auto";function un(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Lu(e){if(!un(e)||!un(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))un(r)&&un(r.models)&&t.push([n,Object.keys(r.models)]);return t}function jr(e,t){let n=Lu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[dn,...r.flatMap(([,s])=>s)]}function Iu(e,t,n,r){if(!un(e)||!un(e.runners))return[dn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!un(a)||!un(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(n&&n!==dn&&i!==n)continue;let u=r(a,c);if(Array.isArray(u))for(let f of u)typeof f=="string"&&!s.includes(f)&&s.push(f)}return[dn,...s]}function Br(e,t,n){return Iu(e,t,n,(r,s)=>un(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function wi(e,t,n){return Iu(e,t,n,(r,s)=>un(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:un(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function vs(e,t){let n=Lu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Pu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!jr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Br(t,s,r.impl_model||dn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var yg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},yi=[...hg,...Bn],vg=[...Lo,...vi].filter((e,t,n)=>n.indexOf(e)===t&&!yi.includes(e));function Du(e,t){let n=un(e)?e:{},r=un(t)?t:{},s=[];for(let a of yi){let i=n[a]??null,c=r[a]??null;i!==c&&s.push({key:a,label:yg[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...vg,...Object.keys(r)])!yi.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function ki(e,t,n,r,s,o){return fo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Mu(e,t){let n={};for(let r of vi){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Nu(e,t){let n={};for(let r of Bn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var $i=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Bn]}],Zn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Mo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function xi(e,t,n,r,s,o=null){let a=tn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function qu(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of xi(e,t,n,r,s,o))a[i.source]+=1;return a}function Fu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function ju(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var ek=[...Oo,...Bn];var wg=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],kg={pin:"pin",global:"global",base:"base"};function $g(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${kg[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function xg(e,t,n){switch(e){case"workflow_mode":return hs;case"spec_review_model":case"impl_review_model":return ys;case"plan_review_model":return Po;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Do;case"impl_dispatch":return Ou;case"impl_runtime":return Io;case"impl_model":return jr(n,t.impl_runtime);case"impl_effort":return Br(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return bs;case"orchestration_model":return vs(n,null);case"orchestration_effort":return Br(n,void 0,t.orchestration_model||dn).filter(r=>r!==dn);default:return[]}}function Ag(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${$g(e.source)}
    <span class="detail-effective__k"
      >${Zn[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Mo[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Zn[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Bu(e,t){let n=$i.flatMap(c=>c.keys),r=xi(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=qu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(c=>[c.key,c])),a=Object.fromEntries(r.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=r.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return l`<details
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
        >${Sg(o)}</span
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
          ${$i.map(c=>l`
              <div class="detail-effective__subhead">${c.label}</div>
              ${r.filter(u=>c.keys.includes(u.key)).map(u=>{let f=fo({key:u.key,choices:xg(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Ag(u,{expanded:e.expanded,options:f.options,default_label:f.unset_label,default_full_value:f.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${gr(e.preset_id)}
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
  </details>`}function Sg(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Eg(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Uu(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=Eg(n.exec_receipt),c=i?In(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],f=uo(n.planned_execution,n.exec_receipt);return l`<section class="detail-summary" data-seam="detail-summary">
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
      ${f?l`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${f.kind}
            title=${f.title}
            >${f.label}</span
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
      ${wg.map(h=>{let y=h.receipt&&typeof t[h.receipt]=="string"?String(t[h.receipt]):"",$=r[h.id],S=y.length>0||$?.fill==="full",F=!S&&$?.fill==="dim",B=$?.stale===!0;return l`<span
          class=${`detail-summary__gate${S?" detail-summary__gate--on":""}${F?" detail-summary__gate--current":""}${B?" detail-summary__gate--stale":""}`}
          data-gate=${h.id}
        >
          <span class="detail-summary__gate-pill">${h.label}</span>
          ${y?l`<span class="detail-summary__gate-sha"
                >${y.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function No(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Wu(e){return No(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function zu(e,t){let n=e&&e[t];if(!No(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Wu),s=Wu(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Vu(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function qo(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Vu(e)}${t}`}function Ur(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Vu(e)}`}function Tg(e,t,n){if(n!==null){let s=e==="claude"?qo:Ur,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Ur({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Hu(e,t){if(!No(e)||e.state!=="usable"||!No(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Gu(e){let t=e.provider_key==="claude"?qo:Ur,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Tg(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Ku({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Gu({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:zu(t,"claude"),selected:s,workspace_default:Hu(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Gu({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:zu(t,"codex"),selected:o,workspace_default:Hu(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var Yu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function ws(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Fo(e){if(!ws(e)||!ws(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>ws(n)&&ws(n.models));return t.length>0?t:null}function xn(e,t){let n=Fo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Zu(e,t){return ws(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Qu(e,t){let n=Fo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Zu(r,r.models[t]);return[]}function Cg(e){let t=Fo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Zu(r,s))n.includes(o)||n.push(o);return n}function Rg(e,t){if(!t)return Cg(e);let r=Fo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Qu(e,o))s.includes(a)||s.push(a);return s}function Xu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=xn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Qu(t,r.impl_model):Rg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function Og(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Lg(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function jo(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function u(F){F.key==="Escape"&&s&&(F.preventDefault(),$())}document.addEventListener("keydown",u);function f(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>$()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Og(s)}</span
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
                        >`}${Yn(a)}`}
          </div>
        </div>
      </div>
    `:l``}function h(){Ge(f(),e)}async function y(F,B={}){s=F,o="loading",a="",i=null,c="",h();let Q=B.workspace||(n?n():"");if(!Q){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",h();return}if(!r){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",h();return}let le="/api/doc?workspace="+encodeURIComponent(Q)+"&path="+encodeURIComponent(F);try{let U=await r(le),M=await U.json().catch(()=>({}));if(!U.ok||!M||M.ok!==!0){if(M?.error==="not_found"&&B.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",h();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||U.status)+")",h();return}let D=Lg(String(M.content||""));i=D.front,a=D.body,o="ready",h()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",h()}}function $(){s=null,Ge(l``,e)}function S(){document.removeEventListener("keydown",u),$()}return{open:y,close:$,destroy:S}}var Ig=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],td="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Bo=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Pg=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Ju(e){return typeof e=="string"&&Pg.has(e)}var Dg=["running","done","failed","interrupted"],Mg={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Ng(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function qg(e){let t=Bt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Mr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${td}
          >부분 집계</span
        >`:""}`}function ed(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ei(e){if(typeof e=="number")return Uo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Uo(t):""}function Fg(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function jg(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ai(e){return e===null||typeof e=="string"&&e.trim().length>0}function Si(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Bg(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Bo.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Ai(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ai(t.effort))||!(!("agent_type"in t)||Ai(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Dg.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Si(t.started_at)||!Si(t.last_event_at)||!Si(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Ug(e,t,n){let s=Bt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
  </div>`}function Wg(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Bt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Uo(e.last_event_at):s?Ei(s.completed_at):"",c=(e.provider==="claude"?["Claude",e.agent_type,Fg(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=jg(e,s);return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Mg[e.status]}</span
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
  </button>`}function zg(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Hg(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of o){let h=Bg(f);!h||s.has(h.launch_id)||Ju(h.agent_type)||(s.add(h.launch_id),r.push(h))}r.sort((f,h)=>(f.started_at||0)-(h.started_at||0));let a={};for(let{role:f,provider:h}of Bo){let y=t?t.roles[f]?.[h]:null;a[f]=y?[...y.legs]:[]}let i=Bo.flatMap(({role:f})=>a[f]),c=new Set,u=[];for(let{role:f,provider:h}of Bo){for(let y of r.filter($=>$.role===f&&$.provider===h)){let $=i.find(S=>S.receipt_id===y.launch_id)||null;$&&!zg(y,$)||($&&c.add($.receipt_id),u.push(Wg(y,$,e.attempt_id,n)))}for(let y of a[f])!c.has(y.receipt_id)&&!Ju(y.agent_type)&&u.push(Ug(f,h,y))}return u}function Gg(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Ig,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${r.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Ng(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${td}</span>`:""}
  </div>`}var Vg={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Uo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Kg(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function nd(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of r)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let h=typeof u.session_id=="string"&&u.session_id.length>0,y=o.has(u.attempt_id),$=h&&!y,S=h?y?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!$}
      title=${S}
      @click=${F=>{F.stopPropagation(),$&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let h=u.cause_detail,y=h&&typeof h.reason=="string"&&h.reason.length>0?typeof h.command=="string"&&h.command.length>0?`${h.reason} \xB7 ${h.command}`:h.reason:u.cause;return l`<div class="detail-session__cause" title=${y}>
      ${u.cause}
    </div>`},c=u=>{let f=ed(Ha(u));if(Bt(f).length===0&&!Mr(u.usage))return"";let h=s.has(u.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${h?"true":"false"}
      title=${h?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${y=>{y.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${qg(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(u=>{let f=Ha(u),h=ed(f),y=Bt(h);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Vg[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${ns(u)?l`<span
                  class="detail-session__resumed"
                  title=${ns(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${fr(u)}</span>
            ${y.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?l`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${y.length>0?y.map($=>l`<span
                      class="detail-session__usage"
                      title=${$.tooltip}
                      >${$.label}</span
                    >`):Mr(u.usage)?l`<span class="detail-session__usage"
                    >${Mr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Uo(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${Kg(u)}
          ${s.has(u.attempt_id)&&u.usage?Gg(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Hg(u,f,t)}
        </div>`})}
    </div>
  `}function rd(e,t={}){return l`
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
          ${Yg(e)}
        </div>`:""}
  `}function Yg(e){let t=qr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?jn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Eo(n.recorded_at);return l`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?jn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Zg=["open","in_progress","deferred","resolved","closed"],Qg=[0,1,2,3,4];function sd(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,h={},y="",$=!1,S=[],F=!1,B={},Q={claude:null,codex:null},le=null,U=null,M=0,D=!1,W=!1,E="",N="",ne="";function J(){D=!1,W=!1,E="",N="",ne=""}function me(){Q={claude:null,codex:null},le=null,U=null,M+=1}async function fe(){if(!s)return null;try{let m=await Promise.resolve(s("get-workspace-accounts",{}));return m&&typeof m.state=="string"?m:null}catch{return null}}async function ee(m){try{let d=await fetch(m);if(!d.ok)return null;let p=await d.json();if(!p||typeof p!="object"||!Array.isArray(p.accounts))return null;let b=p.accounts.filter(w=>w!==null&&typeof w=="object"&&!Array.isArray(w));return{accounts:b,active:b.find(w=>w.active===!0)||null}}catch{return null}}async function ye(m){U=m;let d=++M,[p,b,w]=await Promise.all([ee("/api/claude-usage"),ee("/api/codex-usage"),fe()]);d!==M||m!==u||(Q={claude:p,codex:b},le=w,v())}let ke=[],_e=null,se=null,Ae=!1,V="",te=!1,pe=0,$e=new Set;function be(){ke=[],_e=null,se=null,Ae=!1,V="",te=!1,pe+=1,$e.clear()}async function Ne(m){if(!s)return;let d=++pe;try{let p=await Promise.resolve(s("get-comments",{id:m}));if(d!==pe||m!==u)return;ke=Array.isArray(p)?p:[],Ae=!1}catch{if(d!==pe||m!==u)return;Ae=!0}v()}function he(){if(!s||!u)return;let m=f&&typeof f.comment_count=="number"?f.comment_count:null;if(_e!==u){_e=u,se=m,Ne(u);return}m!==null&&m!==se&&(se=m,Ne(u))}function He(m){$e.has(m)?$e.delete(m):$e.add(m),v()}function rt(m){let d=V.trim().length===0;V=m,d!==(m.trim().length===0)&&v()}async function ut(){let m=V.trim();if(!s||!u||m.length===0||te)return;let d=u;te=!0,v();let p=!1;try{let b=await Promise.resolve(s("add-comment",{id:d,text:m}));Array.isArray(b)&&b.length>0&&(p=!0,d===u&&(ke=b,Ae=!1,V="",se=b.length))}catch{p=!1}p||ae("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),d===u&&(te=!1),v()}let C={onToggle:He,onDraftInput:rt,onSubmit:ut},re=t.mdViewer||null,we=null;re||(we=document.createElement("div"),we.className="md-viewer-root",document.body.appendChild(we));let De=re||jo(we,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Pe=document.createElement("div");Pe.className="session-log-root",document.body.appendChild(Pe);let z=Fr(Pe,{transport:s?(m,d)=>Promise.resolve(s(m,d)):void 0,sessionLogStore:c}),Y=!1,Se=!1,Ke=!1,Ue=null,Ie=null,ze=0;function et(m){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${m}`}function qe(){Y=!1,Se=!1,Ke=!1,Ue=null,Ie=null,ze+=1}async function je(m){if(!s)return;let d=++ze;Se=!0,Ke=!1,v();try{let p=await Promise.resolve(s("get-bead-prompt",{bead_id:m}));if(d!==ze)return;!p||typeof p!="object"||Array.isArray(p)?Ke=!0:(Ue=p,Ie=et(m))}catch{d===ze&&(Ke=!0)}finally{d===ze&&(Se=!1,v())}}function Ze(){if(Y=!Y,Y&&u&&Ie!==et(u)){Ue=null,je(u);return}v()}function Xe(){if(!a||!u)return[];let m=a.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter(p=>p&&p.bead_id===u).sort((p,b)=>(b.started_at||0)-(p.started_at||0)).map(p=>({attempt_id:p.attempt_id,bead_id:p.bead_id,status:p.status,started_at:typeof p.started_at=="number"?p.started_at:null,runner:p.runner||null,model:p.model||null,effort:p.effort||p.observed_effort||null,speed:p.speed||null,session_id:p.session_id||null,resumed_from:p.resumed_from||null,continuation_mode:p.continuation_mode||null,dismissed_at:typeof p.dismissed_at=="number"?p.dismissed_at:null,cause:typeof p.cause=="string"?p.cause:null,cause_detail:p.cause_detail||null,exec_default_preset_id:typeof p.exec_default_preset_id=="string"?p.exec_default_preset_id:null,exec_default_preset_revision:typeof p.exec_default_preset_revision=="number"?p.exec_default_preset_revision:null,exec_values:p.exec_values&&typeof p.exec_values=="object"?p.exec_values:null,usage:p.usage||null,usage_legs:Array.isArray(p.usage_legs)?p.usage_legs:[],delegation_sessions:Array.isArray(p.delegation_sessions)?p.delegation_sessions:[]}))}function bt(){if(!a||!u)return null;let m=a.get();return mn(m&&m.attempts||{},u)}let ot=new Set;function _t(m){ot.has(m)?ot.delete(m):ot.add(m),v()}function St(m){let d=a?a.get():null,p=d&&d.attempts?d.attempts[m]:null;z.open({attempt_id:m,meta:p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}})}function mt(m,d){let p=a?a.get():null,b=p&&p.attempts?p.attempts[m]:null,q=(b&&Array.isArray(b.delegation_sessions)?b.delegation_sessions:[]).find(G=>G&&typeof G=="object"&&G.launch_id===d);q&&z.open({attempt_id:m,launch_id:d,meta:{runner:q.provider==="claude"?"claude":"codex",role:q.role,...typeof q.agent_type=="string"?{agent_type:q.agent_type}:{},model:q.model,effort:q.effort,session_id:q.session_id,status:q.status}})}async function dt(m){if(!s||!m)return;let d=await Dr();if(d===null)return;let p=()=>{let G=a?a.get():null;return G&&typeof G.revision=="number"?G.revision:0},b=async(G={},Z=p())=>await s("worker-attempt-resume",{attempt_id:m,expected_revision:Z,...d!==""?{instructions:d}:{},...G}),w=G=>{G?.queue&&a?.set&&a.set(G.queue)},q=await b();if(w(q),q&&q.conflict){let G=q.queue&&typeof q.queue.revision=="number"?q.queue.revision:p();q=await b({},G),w(q)}q=await Pn(q,(G,Z)=>b({continuation:G,decision_token:Z}),{onResult:w,refresh:()=>b()}),q&&q.resumed===!1&&!q.conflict&&q.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${q.reason}`,"error",2400)}let Tt={onOpen:St,onOpenDelegation:mt,onResume:dt,onToggleUsage:_t};function at(){let m=a?a.get():null,d={...B};for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){let b=m&&m[p];typeof b=="string"&&(d[p]=b)}return d}async function We(){if(s){try{let m=await Promise.resolve(s("get-session-defaults",{}));B=m&&m.values&&typeof m.values=="object"?m.values:{}}catch{B={}}v()}}function Te(){let m=a?a.get():null;return m&&m.runner_catalog||null}function P(){let m=a?a.get():null;return m&&typeof m.execution_defaults=="object"?m.execution_defaults:null}function X(){let m=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},p=tn({pin:{...m,...h},global:at(),execution_defaults:P(),runner_catalog:Te(),route:typeof m.route=="string"?m.route:null}).orchestration_model.value||"";return xn(Te(),p)}function ie(){let m=i?i.get():null;return!m||typeof m.revision!="number"?null:{revision:m.revision,presets:Array.isArray(m.presets)?m.presets:[]}}function x(m){return m?.compatible===!1}function K(m){i&&m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&i.set({revision:m.revision,presets:m.presets})}async function xe(){let m=ie(),d=m?.presets.find(p=>p.id===y);if(!(!s||!u||!m||!d||x(d)||$)){$=!0,S=[],v();try{let p=await Promise.resolve(s("apply-impl-preset",ju(u,d.id,m.revision)));if(p&&p.conflict){K(p),ae("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let b=p&&Array.isArray(p.issue)?p.issue[0]:p?.issue;if(p&&p.applied&&b&&typeof b=="object"){f=b,S=Array.isArray(p.skipped_orchestration_keys)?p.skipped_orchestration_keys.filter(w=>typeof w=="string"):[];for(let w of Yu)delete h[w];ae(S.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}p&&p.error==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(p){p&&typeof p=="object"&&p.code==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{$=!1,v()}}}let A=null;n&&n.subscribe&&(A=n.subscribe(()=>H()));let O=null;a&&typeof a.subscribe=="function"&&(O=a.subscribe(()=>{u&&v()}));let k=null;i&&typeof i.subscribe=="function"&&(k=i.subscribe(()=>{u&&v()}));function I(m){m.key==="Escape"&&u&&(m.preventDefault(),r())}document.addEventListener("keydown",I);function H(){if(u){if(n&&typeof n.snapshotFor=="function"){let m=n.snapshotFor("detail:"+u)||[];f=m.find(p=>p&&p.id===u)||m[0]||f}he(),v()}}function de(m){cn(m).then(d=>{d?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ce(m){m.preventDefault(),m.stopPropagation(),u&&de(u)}function ve(m,d){m.preventDefault(),m.stopPropagation(),de(d)}function Qe(m,d,p){m.preventDefault(),m.stopPropagation(),De.open(d,{missing_state:p})}function Ve(m,d){h[m]=d,v(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Fu(u,m,d.length===0?null:d))).catch(()=>{ae("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Ce(m,d){let p=f||{},b=p.metadata&&typeof p.metadata=="object"?p.metadata:{},w={};for(let Z of["impl_runtime","impl_model","impl_effort"])w[Z]=Object.hasOwn(h,Z)?h[Z]:typeof b[Z]=="string"?b[Z]:"";w[m]=d;let q=Xu(w,Te(),X()),G={};for(let Z of["impl_runtime","impl_model","impl_effort"])G[Z]=h[Z],h[Z]=q[Z]||"";v(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...q,orchestration_runtime:X()})).then(Z=>{let ge=Array.isArray(Z)?Z[0]:Z;if(!ge||typeof ge!="object"||!ge.id)throw new Error("implementation target readback failed");f=ge;for(let Re of["impl_runtime","impl_model","impl_effort"])delete h[Re];v()}).catch(()=>{for(let Z of["impl_runtime","impl_model","impl_effort"])G[Z]===void 0?delete h[Z]:h[Z]=G[Z];v(),ae("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function lt(m,d,p){if(!s||!u)return!1;try{let b=await Promise.resolve(s(m,d)),w=Array.isArray(b)?b[0]:b;return w&&typeof w=="object"&&w.id?(f=w,!0):(ae(p,"error"),!1)}catch{return ae(p,"error"),!1}}function it(m){setTimeout(()=>{try{let d=e.querySelector(m);d&&typeof d.focus=="function"&&d.focus()}catch{}},0)}function Lt(){D=!0,E=f&&f.title||"",v(),it('.detail-edit__input[data-edit="title"]')}function Pt(m){E=m.target.value}function Wt(){D=!1,E="",v()}function Dt(){lt("edit-text",{id:u,field:"title",value:E},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(d=>{d&&(D=!1,E=""),v()})}function zt(){W=!0,N=f&&f.description||"",v(),it('.detail-edit__textarea[data-edit="description"]')}function ht(m){N=m.target.value}function Mt(){W=!1,N="",v()}function Fe(){lt("edit-text",{id:u,field:"description",value:N},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(d=>{d&&(W=!1,N=""),v()})}function Ht(m,d,p,b){if(m.key==="Escape"){m.stopPropagation(),p();return}m.key==="Enter"&&(!b||m.ctrlKey||m.metaKey)&&(m.preventDefault(),d())}function Xt(m){let d=m.target.value;lt("update-status",{id:u,status:d},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function Ye(m){let d=Number(m.target.value);lt("update-priority",{id:u,priority:d},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function Ee(m){ne=m.target.value}function R(){let m=ne.trim();m.length!==0&&lt("label-add",{id:u,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(d=>{d&&(ne=""),v()})}function ue(m){if(m.key==="Escape"){m.stopPropagation(),ne="",v();return}m.key==="Enter"&&(m.preventDefault(),R())}function Oe(m){lt("label-remove",{id:u,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>v())}let tt={onCopyPath:ve,onOpenDoc:Qe};function yt(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function pt(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Et(m){let p=(Array.isArray(m.dependencies)?m.dependencies:[]).map(b=>({id:yt(b),icon:pt(b)})).filter(b=>b.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${p.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${p.map(b=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(b.id)}
                  >
                    ${b.icon?`${b.icon} `:""}${b.id}
                  </button>`:l`<span class="detail-dep"
                    >${b.icon?`${b.icon} `:""}${b.id}</span
                  >`)}
          </div>`}
    `}function Rt(m){let d=m.metadata||{},p=m.workflow||{},b=p.stages||{},w=b.spec&&b.spec.stale,q=b.impl&&b.impl.stale,G=b.plan||null,Z=p.route_source==="derived",ge=p.route||d.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Z?" detail-kv__v--derived":""}"
          title=${Z?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Z?"unset":ge}</span
        >
      </div>
      ${p.route!=="quick_fix"||Object.hasOwn(d,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${d.spec_review||"\uC5C6\uC74C"}${w?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${p.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${G?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${G?.approval_receipt||"\uC5C6\uC74C"}${G?.approval_state==="stale"?" \xB7 stale":G?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${p.route!=="quick_fix"||Object.hasOwn(d,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${d.impl_review||"\uC5C6\uC74C"}${q?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${p.planned_execution?l`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${p.planned_execution.kind}</span>
            </div>
            ${p.planned_execution.kind==="main"?l`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${p.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${p.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${In(p.exec_receipt)}</span
            >
          </div>`:""}
      ${p.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${p.impl_entry.actor}@${p.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${d.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${d.pr_url}</span>
          </div>`:""}
    `}let Gt={route:["quick_fix","spec_backed","full_plan"]};async function Jt(m,d){let p=d.target.value;if(m==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&p!=="full_plan"&&!window.confirm(`full_plan \u2192 ${p||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){v();return}await lt("update-workflow-meta",{id:u,key:m,value:p},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),v()}function vt(m){let d=m.metadata||{};return l` ${((b,w)=>{let q=Gt[b],G=typeof d[b]=="string"?d[b]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${b}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${b}
          data-edit=${`wfmeta-${b}`}
          @change=${Z=>Jt(b,Z)}
        >
          <option value="" ?selected=${!q.includes(G)}>
            ${w}
          </option>
          ${q.map(Z=>l`<option value=${Z} ?selected=${G===Z}>${Z}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function rn(m,d){return D?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${E}
            @input=${Pt}
            @keydown=${p=>Ht(p,Dt,Wt,!1)}
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
              @click=${Wt}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${m}</h2>
        ${Bt(d).map(p=>l`<span class="detail-usage-total" title=${p.tooltip}
              >${p.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Lt}
        >
          ✎
        </button>
      </div>
    `}function pn(m){let d=jt(m.created_at),p=jt(m.updated_at);return!d&&!p?l``:l`
      ${d?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${d}</span>
          </div>`:""}
      ${p?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${p}</span>
          </div>`:""}
    `}function En(m,d){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Xt}
        >
          ${Zg.map(p=>l`<option value=${p} ?selected=${p===m}>${p}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Ye}
        >
          ${Qg.map(p=>l`<option value=${String(p)} ?selected=${p===d}>
                P${p}
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
              @click=${zt}
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
              .value=${N}
              @input=${ht}
              @keydown=${d=>Ht(d,Fe,Mt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Fe}
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
    `}function L(m){let d=typeof m.notes=="string"?m.notes:"";return d.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${d}</div>
    `}function Le(m){let d=Array.isArray(m.labels)?m.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${d.map(p=>l`<span class="detail-label-chip"
              >${p}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${p}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+p}
                @click=${()=>Oe(p)}
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
            @input=${Ee}
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
    `}function _(){if(!u)return l``;let m=f||{},d=String(m.id||u),p=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",b=bt(),w=m.status||"open",q=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",G=m.description||"",Z={...m,metadata:{...m.metadata||{},...h}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${ce}
            >
              ${d}
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
          ${rn(p,b)}
          ${Uu(Z)}
          ${Bu({metadata:Z.metadata,workspace_values:at(),catalog:Te(),execution_defaults:P(),expanded:F,presets:ie()?.presets||[],preset_id:y,preset_busy:$,skipped_orchestration_keys:S},{onToggle:ge=>{F=ge,v()},onEdit:(ge,Re)=>{if(ge==="impl_runtime"||ge==="impl_model"||ge==="impl_effort"){Ce(ge,Re??"");return}Ve(ge,Re??"")},onPresetSelect:ge=>{y=ge,S=[],v()},onPresetApply:()=>{xe()}})}
          ${Ku({md:Z.metadata,catalog:Q,workspace_defaults:le,handlers:{onExecChange:Ve}})}
          ${En(w,q)} ${pn(m)}
          ${T(G)}
          ${Tu(ke,C,{expanded:$e,draft:V,sending:te,error:Ae})}
          ${L(m)} ${Le(m)} ${Et(m)}
          ${Rt(m)} ${vt(m)}
          ${Au(m,tt)}
          ${rd({expanded:Y,loading:Se,error:Ke,data:Ue},{onToggle:Ze})}
          ${nd(Xe(),Tt,{total:b,expanded:ot})}
        </div>
      </div>
    `}function v(){Ge(_(),e)}return{load(m){m!==u&&(h={},y="",S=[],F=!1,J(),be(),qe(),me()),u=m,f=null,H(),We(),U!==m&&ye(m)},clear(){u=null,f=null,h={},y="",$=!1,S=[],F=!1,J(),be(),qe(),me(),De.close(),z.close(),Ge(l``,e)},destroy(){A&&(A(),A=null),O&&(O(),O=null),k&&(k(),k=null),document.removeEventListener("keydown",I),re||(De.destroy(),we&&we.parentNode&&we.parentNode.removeChild(we)),z.destroy(),Pe.parentNode&&Pe.parentNode.removeChild(Pe),u=null,f=null,me(),y="",$=!1,S=[],be(),qe(),Ge(l``,e)}}}function od(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,h="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=f||"An unrecoverable error occurred.");let y=typeof h=="string"?h.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Wo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function $s(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function zo(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function Ho(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function Go(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Xg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:Wo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function ad(e,t){let n=Xg(e,t);return n?l`<button
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
            title=${n.deploy.at?jt(n.deploy.at):""}
            >${Go(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${$s(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Wr(e){let t=ln(e.created_at),n=ln(e.updated_at);return!t&&!n?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${jt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?l`<span>·</span>`:""}${n?l`<span title=${`\uC218\uC815 ${jt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Jg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function xs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Vo(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function An(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(h=>h&&h.bead_id===t&&h.phase!=="done").sort((h,y)=>(h.requested_at||0)-(y.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?Jg(s.phase):null,u=s?.kind==="stale_work_backup_fresh",f=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:f}}function ks(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return l`<div
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
  </div>`}var eb={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function id(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:eb[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Ko(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function tb(e){return l`<div
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
  </div>`}function Yo(e,t={}){if(!e)return"";let n=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],s=Array.isArray(e.warnings)?e.warnings:[],o=Array.isArray(e.overlaps)?e.overlaps:[],a=e.scope_missing===!0&&t.lane!=="running",i=e.popover||null,c=e.cross_lane||null;return n.length===0&&r.length===0&&s.length===0&&o.length===0&&!a&&!c?"":l`<div class="worker-deps">
    ${c?l`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${c.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${c.label}
        </button>`:""}
    ${n.map(u=>l`<span class="worker-dep worker-dep--pred" title=${u.title||""}
          >${u.badge?l`<span class="worker-dep__badge">${u.badge}</span>`:""}<button
            type="button"
            class="worker-dep__label worker-dep__open"
            data-dep-id=${u.id}
            data-dep-direction="predecessor"
          >
            ${u.label}</button
          ><button
            type="button"
            class="worker-dep__remove"
            data-blocker-id=${u.id}
            aria-label=${`\uC120\uD589 ${u.id} \uC5F0\uACB0 \uD574\uC81C`}
            title="선행 연결 해제"
          >
            ✕
          </button></span
        >`)}${o.map(u=>l`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${u.id}
          aria-label=${`scope \uACB9\uCE68 ${u.id} (${u.location_label})`}
          title=${[`\uACB9\uCE68 ${u.id} (${u.location_label})`,...u.prefixes].join(`
`)}
        >
          ⧉ ${u.id}
        </button>`)}${a?l`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${r.map(u=>l`<span class="worker-dep worker-dep--succ" title=${u.title||""}
          >${u.badge?l`<span class="worker-dep__badge">${u.badge}</span>`:""}<button
            type="button"
            class="worker-dep__label worker-dep__open"
            data-dep-id=${u.id}
            data-dep-direction="successor"
          >
            ${u.label}
          </button></span
        >`)}${s.map(u=>l`<span class="worker-dep worker-dep--warn">${u}</span>`)}${i?tb(i):""}
  </div>`}function Zo(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?l`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function ld(e){return e?l`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Qo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return l`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function nb(e){let t=Array.isArray(e.badges)?e.badges:[],n=Bt(e.usage),r=Mn(e.usage),s=ln(e.done_at);return l`<div
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
            title=${`\uC644\uB8CC ${jt(e.done_at)}`}
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
  </div>`}function Qn(e){if(e.lane==="done"&&e.done_layout==="three_line")return nb(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Bt(e.usage),s=Mn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?ln(e.done_at):"",u=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",y=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,S=e.lane==="done"?"":Zo(e.workflow),F=ld(e.from_id),B=Qo(e.priority),Q=l`<span class="worker-mini__title">${e.title}</span>`,le=e.pr_url&&e.pr_number?l`<a
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
        >`:"",M=n.map(pe=>pe===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${pe}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${pe===e.completion_badge&&e.completion_title||""}
          >${pe}</span
        >`),D=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",W=r.length>0?r.map(pe=>l`<span class="worker-usage" title=${pe.tooltip}
              >${pe.label}</span
            >`):s?l`<span class="worker-usage" title=${os(e.usage)}
            >${s}</span
          >`:"",E=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",N=e.merge_action?l`<button
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
      </button>`:"",J=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",me=e.discard,fe=me?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${me?.attempt_id||""}
          data-operation-id=${me?.operation?.operation_id||""}
          data-discard-mode=${me?.confirmation||"unmerged"}
          ?disabled=${me?!me.enabled:e.discard_enabled===!1}
          title=${me?me.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${me?.label||"\uD3D0\uAE30"}
        </button>`:"",ee=e.stale_work||null,ye=ee?l`${ee.can_resume||ee.can_continue?l`<button
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
          </button>`:""}`:"",ke=ee?l`<div class="worker-mini__stale">
        <strong>${ee.title}</strong>
        <span>${ee.summary}</span>
        <span>${ee.cause}</span>
        ${ee.can_backup_fresh?l`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",_e=e.revise_action?l`<button
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
          ${Ko(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",Ae=Yo(e.dependency_chips,{lane:e.lane}),V=ks(e),te=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||me?.operation||e.revise_action||ee);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">
            ${y}${$}${B}${F}${Q}
          </div>
          <div class="worker-mini__row2">
            ${W}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${jt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${$s(e.work_ms)}</span
                >`:""}${M}${E}
            <span class="worker-mini__actions"
              >${N}${ne}${J}${fe}</span
            >
            ${Wr(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${u}${f}${y}${$}${B}${S}${F}${le}${U}${M}${h}${D}
            </div>
            <div class="worker-mini__body">${Q}${ke}</div>
            ${Ae}${se}${te?l`<div class="worker-mini__foot">
                  ${W}${E}
                  <span class="worker-mini__actions"
                    >${N}${ne}${J}${fe}${_e}${ye}</span
                  >
                  ${ks(e)}
                </div>`:""}
            ${Wr(e)}`:l`<div class="worker-mini__line">
              ${u}${f}${y}${$}${B}${S}${F}${Q}${le}${U}${M}${h}${D}${W}${E}${N}${ne}${J}${fe}
            </div>
            ${Ae}${se}${V} ${Wr(e)}`}
  </div>`}function rb(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(l`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(l`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?l`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return l`${r}`}function Ti(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),c=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),u=Yo(e.dependency_chips,{lane:e.lane});return l`<div
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
      >${Qo(e.priority)}
      ${Zo(a)}${r?l`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:""}${ld(e.from_id)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?lo(a,e.status,{onOpenDoc:n.onOpenDoc}):""}${u}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${Ko(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?l`<div class="worker-card__place-menu">
            ${rb(t.lanes,e.id)}
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
    ${Wr(e)}
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?Ti(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Qn(r))}
          </div>`}
  </section>`}var cd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},ud={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function dd(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ci(e){for(let t of dd(e))if(Object.hasOwn(cd,t))return cd[t];return null}function Ri(e){let t=null;for(let n of dd(e))Object.hasOwn(ud,n)&&(t=ud[n]);return t}function Xo(e){let t=Ci(e),n=Ri(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function pd(e,t){let n=Ci(e)??Ci(t),r=Ri(t)??Ri(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var fd=160;function sb(e){return e.length>fd?`${e.slice(0,fd)}\u2026`:e}function ob(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${sb(e.command)}</code>`:""}
  </div>`}function ab(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ib(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function _d(e){let t=e.failure?Xo(e.failure.reason):"";return l`<div class="worker-banners">
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
          ${ob(e.failure.cause_detail)}
          ${ab(e.failure.reason)}
          ${ks({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function lb(e){return e?l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var cb=new Set(["codex-runner"]);function ub(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(y=>y&&!(typeof y.agent_type=="string"&&cb.has(y.agent_type))),c=i.filter(y=>y&&y.state==="live"),u=i.filter(y=>y&&y.state!=="live"),f=Yo(e.dependency_chips,{lane:"running"}),h=r?ln(r.updated_at,t):"";return l`${o?l`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?l`<span class="rtile__activity-age"
              >${ln(a,t)}</span
            >`:""}
      </div>`:h?l`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">갱신 ${h}</span>
        </div>`:""}${c.length>0||u.length>0?l`<div class="rtile__legs">
        ${c.map(y=>l`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${y.label}</span
            >`)}${u.length>0?l`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(y=>y.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}${f}`}function Oi(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ib(t-e.started_at):"\u2014",c=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,u=ns(e),f=Bt(e.usage),h=Mn(e.usage),y=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,$=e.base_exception||null,S=e.landing,F=e.attempt_id&&e.attempt_id===n,B=r.monitor||null,Q=lb(B),le=ub(B,t,a,s?{updated_at:e.updated_at??null}:null),U=s&&e.workflow?.chips?.exec_receipt||null,M=Zo(e.workflow),D=U?l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${In(U)}`}
        >${`${U.kind}:${co(U)}`}</span
      >`:"",W=M||D?l`<div class="rtile__meta">
          ${M}${D}
        </div>`:"",E=s?"":Wr(e),N=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${F?" rtile--sel":""}${a?" rtile--paused":""}${o?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Qo(e.priority)}${Q}${u?l`<span class="rtile__resumed" title=${u}>↻</span>`:""}
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
                ${N}
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
                ${N}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${le}${e.rollup?io(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Ba}):""}
    ${S?l`<div class="rtile__landing">
          <span
            class="merge-step${S.failed?" merge-step--failed":""}"
            style=${`--progress: ${S.percent}%`}
            >${S.label}${S.index>0?l`<span class="merge-step__n"
                  >${S.index}/${S.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${s?W:M||c||f.length>0||h||y||$?l`<div class="rtile__meta">
            ${M}${y?l`<span class="worker-mini__badge">${y}</span>`:""}
            ${$?l`<span
                  class="worker-mini__badge"
                  title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                  >${$}</span
                >`:""}
            ${Ko(e.exec_chips)}
            ${f.length>0?f.map(ne=>l`<span class="worker-usage" title=${ne.tooltip}
                      >${ne.label}</span
                    >`):h?l`<span
                    class="worker-usage"
                    title=${os(e.usage)}
                    >${h}</span
                  >`:""}
          </div>`:""}
    ${E} ${ks(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Li(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Oi(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var Ii=new Set(["unavailable","not_applicable"]);function Xn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function md(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Jn(e,t){return t===null?null:`${Zn[e]}: ${t.display} (${Mo[t.source]})`}function Pi(e){return e.filter(t=>t!==null).join(`
`)}function As(e){if(typeof e!="object"||e===null)return null;let t=fr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Pi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Zn.orchestration_model,e.model),n(Zn.orchestration_effort,e.effort),n(Zn.orchestration_speed,e.speed)])}}function br(e,t){let n=Xn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Xn(e,"orchestration_effort"),s=Xn(e,"orchestration_speed"),o=md([xn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Pi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Jn("orchestration_model",n),Jn("orchestration_effort",r),Jn("orchestration_speed",s)])}}function db(e,t){return e===null||e.value===null||Ii.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function pb(e){return e===null||Ii.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function fb(e){return e===null?null:e.value==="auto"?"auto":Ii.has(e.resolution)?null:e.display}function er(e,t){if(typeof e!="object"||e===null)return null;let n=Xn(e,"impl_dispatch"),r=Xn(e,"impl_runtime"),s=Xn(e,"impl_model"),o=Xn(e,"impl_effort"),a=Xn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":md([db(r,t??null),pb(s),fb(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Pi(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Jn("impl_dispatch",n),Jn("impl_runtime",r),Jn("impl_model",s),Jn("impl_effort",o),Jn("impl_speed",a)])}}var Ut="",_b=["impl_runtime","impl_model","impl_effort"],mb=["claude_account","codex_account"],gb=5,Jo=1;function nn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ea(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(P=>ae(P,"error",4e3)),o={},a={},i=[],c=!1,u={state:"absent",values:{},warnings:[]},f={},h={},y=Promise.resolve(),$={claude:null,codex:null},S=!1,F=null,B={},Q="",le="",U=!1,M=!1,D=!1,W=null,E=!1;function N(){let P=t.queue?t.queue():null;return nn(P)?P:null}function ne(){let P=N();return P?P.runner_catalog:null}function J(){let P=N();return P&&nn(P.execution_defaults)?P.execution_defaults:null}function me(){let P=t.implPresetStore?.get();return nn(P)&&Array.isArray(P.presets)?P:null}function fe(){return r===null?{}:{root_dir:r}}async function ee(P,X){return E||!n?null:await n(P,X)}function ye(P){P&&nn(P.queue)&&t.onQueueAdopt?.(P.queue)}async function ke(P,X){let ie=N();if(!ie||E)return null;let x=await ee(P,{...X,...fe(),expected_revision:ie.revision});if(ye(x),r!==null&&x&&x.conflict){let K=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:N()?.revision??ie.revision;x=await ee(P,{...X,...fe(),expected_revision:K}),ye(x)}return x}async function _e(){c=!0,Te();try{let P=await ee("get-session-defaults",{...fe()});o=nn(P?.values)?{...P.values}:{},a={...o},i=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{c=!1,Te()}}async function se(){let P=Mu(o,a);if(Object.keys(P).length!==0){try{let X=await ee("set-session-defaults",{values:P,...fe()});o=nn(X?.values)?{...X.values}:{},a={...o},i=Array.isArray(X?.warnings)?X.warnings:[]}catch(X){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}Te()}}function Ae(P,X){if(!nn(P))return;let ie=P.state;u={state:ie==="usable"||ie==="unusable"||ie==="absent"?ie:"absent",values:nn(P.values)?{...P.values}:{},warnings:Array.isArray(P.warnings)?P.warnings:[]},h={...u.values},X&&(f={...h})}async function V(){try{Ae(await ee("get-workspace-accounts",{...fe()}),!0)}catch(P){u={state:"unusable",values:{},warnings:["kv_read_failed"]},h={},f={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}Te()}async function te(P){try{let X=await fetch(P);if(!X.ok)return null;let ie=await X.json();if(!nn(ie)||!Array.isArray(ie.accounts))return null;let x=ie.accounts.filter(K=>nn(K)&&typeof K.key=="string"&&K.key.length>0&&typeof K.email=="string"&&K.email.length>0);return{accounts:x,active:x.find(K=>K.active===!0)||null}}catch{return null}}async function pe(){S=!0;let[P,X]=await Promise.all([te("/api/claude-usage"),te("/api/codex-usage")]);E||($={claude:P,codex:X},Te())}function $e(){let P={};for(let X of mb){let ie=Object.hasOwn(f,X)?f[X]:null,x=Object.hasOwn(h,X)?h[X]:null;ie!==x&&(P[X]=ie)}return P}async function be(){let P=$e();if(Object.keys(P).length!==0){try{Ae(await ee("set-workspace-accounts",{values:P,...fe()}),!1)}catch(X){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}Te()}}function Ne(P,X){X===Ut?delete f[P]:f[P]=X,Te(),y=y.then(()=>be())}function he(P,X){if(_b.includes(P)){ut(P,X);return}X===Ut?delete a[P]:a[P]=X,Te(),se()}function He(){let P=at().orchestration_model,X=tn({global:{orchestration_model:P??void 0},execution_defaults:J(),runner_catalog:ne()}).orchestration_model.value;return X?xn(ne(),X):null}function rt(P,X){typeof X=="string"&&X.length>0?a[P]=X:delete a[P]}function ut(P,X){let ie=X===Ut?void 0:X,x=Pu({impl_runtime:P==="impl_runtime"?ie:a.impl_runtime,impl_model:P==="impl_model"?ie:a.impl_model,impl_effort:P==="impl_effort"?ie:a.impl_effort},ne(),He());rt("impl_runtime",x.impl_runtime),rt("impl_model",x.impl_model),rt("impl_effort",x.impl_effort),Te(),se()}async function C(){let P=N();if(!P)return;let X={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},ie=Nu(X,{...X,...B});if(Object.keys(ie).length!==0){try{let x=await ke("worker-queue-set-orchestration-defaults",{values:ie});if(x&&x.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}B={}}catch(x){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Te()}}function re(P,X){B[P]=X===Ut?null:X,Te(),C()}function we(P){if(F=P,!P){Te();return}let X=ne(),ie=at(),x=ie.orchestration_model;x&&!vs(X,P).includes(x)&&(B.orchestration_model=null,x=null);let K=ie.orchestration_effort;K&&!wi(X,P,x||dn).includes(K)&&(B.orchestration_effort=null),Te(),C()}async function De(P){if(!(!N()||P<Jo)){try{await ke("worker-queue-set-slots",{slots:P})}catch(X){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}Te()}}async function Pe(P){if(!(!N()||P<Jo||P>gb)){try{await ke("worker-queue-set-serial-lane-count",{count:P})}catch(X){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}Te()}}async function z(P,X){let ie=P==="auto_advance"?"worker-automation-toggle":P==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await ke(ie,{on:X})}catch(x){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Te()}function Y(){let P={},X=at();for(let ie of Lo){let x=Bn.includes(ie)?X[ie]:a[ie];typeof x=="string"&&x.length>0&&(P[ie]=x)}return P}async function Se(){let P=me();if(!P)return;let X=Y();if(Object.keys(X).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ie=(P.presets||[]).find(K=>K.id===Q),x=le.trim()||(ie?ie.name:"");if(!x){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let K=ie?await ee("impl-preset-update",{expected_revision:P.revision,id:ie.id,name:x,settings:X}):await ee("impl-preset-create",{expected_revision:P.revision,name:x,settings:X});if(K&&K.applied){if(le="",!ie&&Array.isArray(K.presets)){let xe=K.presets.find(A=>A.name===x);Q=xe?xe.id:Q}Te()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Te()}catch(K){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}}async function Ke(){let P=me();if(!(!P||Q.length===0))try{let X=await ee("impl-preset-delete",{expected_revision:P.revision,id:Q});X&&X.applied?(Q="",Te()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Te())}catch(X){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}}function Ue(P){o=nn(P.values)?{...P.values}:{},a={...o},i=Array.isArray(P.warnings)?P.warnings:[],nn(P.queue)&&(t.onQueueAdopt?.(P.queue),B={})}async function Ie(){let P=me(),X=N();if(!P||!X||Q.length===0)return;let ie=x=>({preset_id:Q,expected_revision:P.revision,expected_queue_revision:x,...fe()});try{let x=await ee("apply-impl-preset-global",ie(X.revision));if(x&&x.applied&&Ue(x),r!==null&&x&&x.queue_applied===!1){let K=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:N()?.revision??X.revision;x=await ee("apply-impl-preset-global",ie(K)),x&&x.applied&&Ue(x)}x&&x.applied?x.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):x&&x.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(x){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Te()}async function ze(){M=!0,D=!1,Te();try{let P=await ee("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?D=!0:W=P}catch{D=!0}finally{M=!1,Te()}}function et(){if(U=!U,U&&!W){ze();return}Te()}function qe(){let P=qr({loading:M,error:D});if(P)return P;if(!W)return"";let X=Array.isArray(W.variants)?W.variants:[];return l`<div class="settings-dialog__sp-body">
      ${W.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${W.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${X.map(ie=>l`<div class="settings-dialog__sp-variant" data-variant=${ie.key}>
            <div class="settings-dialog__sp-cond">${ie.condition}</div>
            ${jn(ie.label,ie.system_prompt)}
          </div>`)}
    </div>`}function je(){return l`<section
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
        @click=${et}
      >
        ${U?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${U?qe():""}
    </section>`}function Ze(P,X,ie,x,K,xe,A){let O=K[P]??Ut,k=ki(P,ie,K,J(),ne(),A),I=k.options.find(de=>de.value===O),H=O===Ut?k.full_value:I?.full_value;return l`<select
        class=${O===Ut?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${X}
        title=${H||""}
        ?disabled=${xe===!0||k.disabled}
        .value=${gr(String(O))}
        @change=${de=>x(P,String(de.target.value))}
      >
        <option value=${Ut} ?selected=${O===Ut}>
          ${k.unset_label}
        </option>
        ${k.options.map(de=>l`<option
              value=${de.value}
              title=${de.full_value||""}
              ?selected=${de.value===O}
            >
              ${de.label}
            </option>`)}
      </select>
      ${O===Ut?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Xe(P,X,ie,x,K,xe=!1,A){return l`<div
      class=${`settings-dialog__row${xe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        ${Ze(P,X,ie,x,K,xe,A)}
      </span>
    </div>`}function bt(P,X){let ie=X?X.active:null;return nn(ie)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${P==="claude"?ie.email:Ur({...ie,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function ot(P,X,ie){let x=$[ie],K=Object.hasOwn(f,P)?f[P]:Ut,xe=ie==="claude"?qo:Ur,A=!!x?.accounts.some(O=>O.key===K);return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${X}
          data-account-key=${P}
          @change=${O=>Ne(P,String(O.target.value))}
        >
          <option value=${Ut} ?selected=${K.length===0}>
            ${bt(ie,x)}
          </option>
          ${K.length>0&&!A?l`<option value=${K} selected>
                ${K} (목록에 없음)
              </option>`:""}
          ${x?.accounts.map(O=>l`<option value=${O.key} ?selected=${O.key===K}>
                ${xe(O)}
              </option>`)||""}
        </select>
        ${x?"":l`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function _t(){let P=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${P} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${P}`:null}function St(P,X,ie,x,K){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${X}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${Ze(ie,`${P} \uBAA8\uB378`,x,he,a,!1)}
        ${Ze(K,`${P} effort`,Do,he,a,!1)}
      </span>
    </div>`}function mt(P,X,ie,x){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${x?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${x?"true":"false"}
          aria-label=${X}
          @click=${()=>z(P,!x)}
        >
          ${x?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ie}</span>
      </span>
    </div>`}function dt(P,X,ie,x){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
          <button
            type="button"
            aria-label=${`${X} \uAC10\uC18C`}
            @click=${()=>x(ie-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ie}</span>
          <button
            type="button"
            aria-label=${`${X} \uC99D\uAC00`}
            @click=${()=>x(ie+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Tt(P){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${P.rows.length>0?`\uBCC0\uACBD ${P.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${P.rows.map(X=>l`<div
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
      ${P.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${P.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function at(){let P=N(),X={};for(let ie of Bn)X[ie]=Object.prototype.hasOwnProperty.call(B,ie)?B[ie]:P&&typeof P[ie]=="string"?P[ie]:null;return X}function We(){let P=ne(),X=a.impl_runtime,ie=a.impl_model,x=me(),K=N(),xe=at(),A=vs(P,F),O=jr(P,void 0).filter(Ce=>Ce!==dn),k=wi(P,F,xe.orchestration_model||dn).filter(Ce=>Ce!==dn),I=Q?(x?.presets||[]).find(Ce=>Ce.id===Q):null,H=I?Du(Y(),nn(I.settings)?I.settings:{}):null,de=K&&typeof K.slots=="number"?K.slots:Jo+1,ce=K&&typeof K.serial_lane_count=="number"?K.serial_lane_count:Jo,ve=J()?.supported===!0,Qe=_t(),Ve=ki("workflow_mode",hs,a,J(),P);return l`
      ${i.length>0?l`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${Qe?l`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Qe}
          </div>`:""}
      ${ve?"":l`<div
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
                .value=${gr(Q)}
                @change=${Ce=>{Q=String(Ce.target.value),Te()}}
              >
                <option value="" ?selected=${Q===""}>
                  실행 프리셋…
                </option>
                ${(x?.presets||[]).map(Ce=>l`<option
                      value=${Ce.id}
                      ?selected=${Ce.id===Q}
                    >
                      ${Ce.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!H||H.rows.length===0}
                @click=${Ie}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Q?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${gr(le)}
                @input=${Ce=>{le=String(Ce.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${Q?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Se}
              >
                ${Q?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${Q.length===0}
                @click=${Ke}
              >
                삭제
              </button>
            </div>
            ${H?Tt(H):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${gr(F||Ut)}
                    @change=${Ce=>{let lt=String(Ce.target.value);we(lt===Ut?null:lt)}}
                  >
                    <option value=${Ut} ?selected=${!F}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${F==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${F==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Xe("orchestration_model","\uBAA8\uB378",A,re,xe)}
              ${Xe("orchestration_effort","effort",k,re,xe)}
              ${Xe("orchestration_speed","\uC18D\uB3C4",bs,re,xe)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${ot("claude_account","Claude","claude")}
              ${ot("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Ut}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>he("workflow_mode",Ut)}
                    >
                      ${Ve.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${hs.map(Ce=>l`<button
                          type="button"
                          data-mode=${Ce}
                          aria-pressed=${String(a.workflow_mode===Ce)}
                          @click=${()=>he("workflow_mode",Ce)}
                        >
                          ${Ce}
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
              ${St("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ys,"spec_review_effort")}
              ${St("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Po,"plan_review_effort")}
              ${St("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ys,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Xe("impl_runtime","\uC704\uC784 \uB300\uC0C1",Io,he,a)}
              ${Xe("impl_model","\uBAA8\uB378",jr(P,X),he,a)}
              ${Xe("impl_effort","effort",Br(P,X,ie),he,a)}
              ${Xe("impl_speed","\uC18D\uB3C4",bs,he,a)}
              ${Xe("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",O,he,a,!1,{...a,...xe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${mt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",K?.auto_advance===!0)}
              ${mt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",K?.auto_merge===!0)}
              ${mt("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",K?.auto_repair===!0)}
              ${dt("slots","\uB3D9\uC2DC \uC2E4\uD589",de,Ce=>De(Ce))}
              ${dt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",ce,Ce=>Pe(Ce))}
            </div>
            ${je()}
          `}
    `}function Te(){E||Ge(We(),e)}return{load(){B={};let P=[_e(),V()];return S||P.push(pe()),Promise.all(P).then(()=>{})},render:Te,sessionDraft:()=>({...a}),destroy(){E=!0,Ge(l``,e)}}}function Ss(e){return l`<svg
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
  </svg>`}function gd(){return Ss(Er`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function bd(){return Ss(Er`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function hd(){return Ss(Er`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function yd(){return Ss(Er`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function vd(){return Ss(Er`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function wd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function kd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Bt(mo(t));let n={};for(let i of Dn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let f of Dn){let h=c[f];typeof h=="number"&&Number.isFinite(h)&&(n[f]+=h,r=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Mn(n):null}function Sn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function zr(e,t){let n=Sn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function bb(e,t){if(!Sn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function hb(e){if(!Sn(e)||!Sn(e.execution_defaults)||!Sn(e.runner_catalog)||!Sn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=tn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=xn(e.runner_catalog,n.orchestration_model.value??""),s=br(n,e.runner_catalog),o=er(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function $d(e,t){let n=t.notify||(V=>ae(V,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let u=null,f=null,h=null,y=new Map;function $(){let V=t.workspacesState?t.workspacesState():[];return Array.isArray(V)?V.filter(te=>Sn(te)):[]}function S(V){return $().find(te=>te.root_dir===V)||null}function F(V){return bb(S(V),y.get(V))}function B(){for(let V of $()){let te=y.get(V.root_dir);te&&typeof te.revision=="number"&&typeof V.revision=="number"&&V.revision>=te.revision&&y.delete(V.root_dir)}}async function Q(V,te,pe){let $e=t.transport,be=F(te);if(!(!$e||!Sn(be))){try{let Ne=await $e(V,{...pe,root_dir:te,expected_revision:be.revision});if(Sn(Ne?.queue)&&y.set(te,Ne.queue),Ne&&Ne.conflict){let he=Sn(Ne.queue)&&typeof Ne.queue.revision=="number"?Ne.queue.revision:F(te)?.revision;Ne=await $e(V,{...pe,root_dir:te,expected_revision:he}),Sn(Ne?.queue)&&y.set(te,Ne.queue)}}catch(Ne){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ne instanceof Error?Ne.message:String(Ne)}`)}_e()}}function le(V){u!==V&&(u=V,t.onFocusChange?.(u),_e())}function U(V){le(u===V?null:V)}function M(V){if(f===V){W();return}D(),f=V;let te=S(V);a.textContent=`${te?.name||V} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,h=ea(c,{root_dir:V,queue:()=>F(V),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:pe=>{y.set(V,pe),_e()}}),h.load(),_e()}function D(){h?.destroy(),h=null}function W(V){D(),f=null,s.hidden=!0,a.textContent="",V!==!0&&_e()}let E=()=>W();i.addEventListener("click",E);function N(V){V.key==="Escape"&&u!==null&&le(null)}document.addEventListener("keydown",N);function ne(V,te){let pe=Math.max(te,V,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${te}\uAC1C \uC911 ${V}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:pe},($e,be)=>be<V?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function J(V){let te=V.auto_advance===!0,pe=V.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${te?" is-on":""}`}
        data-act="auto"
        aria-pressed=${te?"true":"false"}
        aria-label=${`${V.name} \uC790\uB3D9\uD654`}
        title=${te?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${te?bd():gd()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${pe?" is-on":""}`}
        data-act="merge"
        aria-pressed=${pe?"true":"false"}
        aria-label=${`${V.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${pe?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${hd()}
        <span class="mon2-deck__op-label">머지</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${f===V.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${f===V.root_dir?"true":"false"}
        aria-label=${`${V.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${vd()}
      </button>`}function me(V){let te=hb(V);return te?l`<div class="mon2-deck__chips">
      ${te.orchestration?l`<span class="mon2-deck__chip" title=${te.orchestration.title}
            >오케 ${te.orchestration.text}</span
          >`:""}
      ${te.worker?l`<span class="mon2-deck__chip" title=${te.worker.title}
            >워커 ${te.worker.text}</span
          >`:""}
    </div>`:""}function fe(V){let te=zr(V,"running"),pe=typeof V.slots=="number"?V.slots:1;return l`<div
      class=${`mon2-deck__tile${u===V.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${V.root_dir}
      aria-pressed=${u===V.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${V.root_dir}>${V.name}</span>
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
        ${yd()} ${ne(te,pe)}
        <span class="mon2-deck__counts"
          >${te}/${pe} 실행 · 대기 ${zr(V,"queue")} · PR
          ${zr(V,"pr_wait")}${zr(V,"session_active")>0?` \xB7 \uC138\uC158 ${zr(V,"session_active")}`:""}</span
        >
      </div>
      <div class="mon2-deck__ops">${J(V)}</div>
      ${me(V)}
    </div>`}function ee(V){let te=t.doneItems?t.doneItems():[],pe=t.rangeLabel?t.rangeLabel():"",$e=kd(Array.isArray(te)?te:[]),be=Ne=>V.reduce((he,He)=>he+zr(He,Ne),0);return l`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${V.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${pe}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${be("running")} · 대기 ${be("queue")} · PR
        ${be("pr_wait")}${be("session_active")>0?` \xB7 \uC138\uC158 ${be("session_active")}`:""}
        · ${pe} 완료
        ${Array.isArray(te)?te.length:0}
      </div>
      ${$e===null?"":l`<div class="mon2-deck__total-tokens">
            ${typeof $e=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${wd(pe)}
                  >τ ${$e}</span
                >`:$e.map(Ne=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${Ne.provider}
                      title=${Ne.tooltip}
                      >τ ${Ne.label}</span
                    >`)}
          </div>`}
    </div>`}function ye(){let V=$();return V.length===0?"":l`<div class="mon2-deck__row">
      ${ee(V)}
      <div class="mon2-deck__strip">
        ${V.map(te=>fe(te))}
      </div>
    </div>`}function ke(){u!==null&&!S(u)&&(u=null,t.onFocusChange?.(null))}function _e(){B(),ke(),f!==null&&!S(f)&&W(!0),Ge(ye(),r),h?.render()}function se(V){let te=V.target;if(!te||typeof te.closest!="function")return;let pe=te.closest("[data-root-dir]");if(!pe)return;let $e=pe.getAttribute("data-root-dir")||"",be=te.closest("[data-act]")?.getAttribute("data-act");if(be==="worker"){t.gotoWorkerTab?.($e);return}if(be==="auto"){Q("worker-automation-toggle",$e,{on:F($e)?.auto_advance!==!0});return}if(be==="merge"){Q("worker-merge-auto-toggle",$e,{on:F($e)?.auto_merge!==!0});return}if(be==="gear"){M($e);return}U($e)}function Ae(V){if(V.key!=="Enter"&&V.key!==" ")return;let te=V.target;if(!te||typeof te.closest!="function")return;let pe=te.closest('[data-root-dir][role="button"]');!pe||pe!==te||(V.preventDefault(),U(pe.getAttribute("data-root-dir")||""))}return r.addEventListener("click",se),r.addEventListener("keydown",Ae),{render:_e,focusRoot:()=>u,panelRoot:()=>f,destroy(){document.removeEventListener("keydown",N),r.removeEventListener("click",se),r.removeEventListener("keydown",Ae),i.removeEventListener("click",E),D(),Ge(l``,r),e.replaceChildren()}}}var yb="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",vb="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",wb="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Es="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Di(e,t){return`${e}\0${t}`}function kb(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function $b(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function na(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function xb(e,t){let n=new Set;for(let[a,i]of t)for(let c of i)n.add(Di(a,c));let r=new Map,s=new Map;for(let a of e){let i=Di(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Di(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Ab(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Sb(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ta(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function xd(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function ra(e){let t=$b(e.blocked_by_map),n=[],r={refusal:null},s=i=>{let c=e.owner_of.get(i);return typeof c!="string"||c.length===0?(r.refusal=kb(i),null):c};return{graph:t,dep_ops:n,state:r,ownerOf:s,addDep:(i,c)=>{if(r.refusal!==null||i===c)return;let u=t.get(i)||[];if(u.includes(c))return;let f=s(i);if(f!==null){if(na(t,c,i)){r.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${i}\uAC00 \uC774\uBBF8 ${c}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(i,[...u,c]),n.push({type:"dep-add",a:i,b:c,root_dir:f})}},removeDep:(i,c)=>{if(r.refusal!==null||i===c)return;let u=t.get(i)||[];if(!u.includes(c))return;let f=s(i);f!==null&&(t.set(i,u.filter(h=>h!==c)),n.push({type:"dep-remove",a:i,b:c,root_dir:f}))}}}function sa(e,t,n,r){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=xb(e.dep_ops,t.blocked_by_map),o=s.filter(i=>i.type==="dep-remove"),a=s.filter(i=>i.type==="dep-add");return{lane_ops:n,ops:[...o,...a,...r],lane_op_index:o.length}}function Ad(e,t){for(let n=1;n<t.length;n+=1)e.addDep(t[n].bead_id,t[n-1].bead_id)}function Sd(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(ta(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function Eb(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Mi(e,t,n){let r=ra(n),s=[],o=[],a=n.owner_lane_of.get(e.bead_id),i=e.kind==="chain"?e.lane_id??a:void 0,c=i===void 0?void 0:n.cross_lanes.get(i);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:yb};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:vb};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${xd(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Es}}if(e.kind==="chain"&&c===void 0)return{refused:Es};let u=()=>{if(c===void 0||c.status!=="confirmed")return;let y=c.entries.map(B=>B.bead_id),$=new Set(y),S=(r.graph.get(e.bead_id)||[]).filter(B=>$.has(B)),F=y.filter(B=>(r.graph.get(B)||[]).includes(e.bead_id));for(let B of S)r.removeDep(e.bead_id,B);for(let B of F)r.removeDep(B,e.bead_id);for(let B of S)for(let Q of F)r.addDep(Q,B)},f=(y,$)=>{let S=n.cross_lanes.get(y),F=S.entries.findIndex(E=>E.bead_id===e.bead_id),B=S.entries.filter(E=>E.bead_id!==e.bead_id),Q=Math.max(0,Math.min(B.length,F>=0&&$>F?$-1:$)),le=-1;if(B.forEach((E,N)=>{n.fixed_members.has(E.bead_id)&&(le=N)}),Q<=le){r.state.refusal=wb;return}let U=F>=0?S.entries[F]:c?.entries.find(E=>E.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir},M=[...B.slice(0,Q),U,...B.slice(Q)];if(Eb(M,S.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:y,entries:M}}),S.status!=="confirmed")return;let D=Q>0?B[Q-1].bead_id:null,W=Q<B.length?B[Q].bead_id:null;if(D===null){W!==null&&r.addDep(W,e.bead_id);return}r.addDep(e.bead_id,D),W!==null&&(r.graph.get(W)||[]).includes(D)&&(r.removeDep(W,D),r.addDep(W,e.bead_id))},h=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(u(),c!==void 0&&(t.kind!=="chain"||t.lane_id!==i)&&s.push({type:"monitor-lane-update",payload:{lane_id:i,entries:c.entries.filter(y=>y.bead_id!==e.bead_id)}})),t.kind==="chain"&&f(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let y=Ab(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(ta(e.bead_id,e.root_dir,y));else if(e.kind==="parallel"){let $=n.parallel_rows,S=$[Math.max(0,Math.min($.length,t.marker_index))];if(!(!!S&&S.bead_id===e.bead_id)&&Sb(n,e.root_dir)&&h!==void 0){let B=h>y?y:y-1;B>=0&&B!==h&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:B},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let y=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&y.status==="confirmed"&&o.push(ta(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(h!==void 0&&t.index!==h){let y=h>t.index?t.index:t.index-1;y>=0&&y!==h&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:y},root_dir:e.root_dir})}}else o.push(ta(e.bead_id,e.root_dir,t.index,t.lane_id));return sa(r,n,s,o)}function Ed(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Es};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=ra(t),s=[];return Ad(r,n.entries),r.state.refusal===null&&Sd(r,t,n.entries,s),sa(r,t,[{type:"monitor-lane-confirm",payload:{lane_id:e}}],s)}function Td(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Es};let r=ra(t),s=[];return Ad(r,n.entries),r.state.refusal===null&&Sd(r,t,n.entries,s),sa(r,t,[],s)}function Cd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Es};let r=ra(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return sa(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[])}function Ni(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${xd(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Tb="\uC0AC\uC774\uD074",Cb=["running","pr_wait"];function Rd(e,t,n){let r=new Map;for(let i of n.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||r.has(i.bead_id)||r.set(i.bead_id,i);let s=r.get(e)?.root_dir,o=n.blocked_by_map.get(e)||[],a=[];for(let i of r.values()){if(i.bead_id===e||i.lane==="done"||t==="successor"&&Cb.includes(i.lane)||(t==="predecessor"?o.includes(i.bead_id):(n.blocked_by_map.get(i.bead_id)||[]).includes(e)))continue;let u=t==="predecessor"?na(n.blocked_by_map,i.bead_id,e):na(n.blocked_by_map,e,i.bead_id);a.push({...i,disabled:u,...u?{reason:Tb}:{}})}return a.sort((i,c)=>{let u=s!==void 0&&i.root_dir===s,f=s!==void 0&&c.root_dir===s;return u!==f?u?-1:1:i.bead_id.localeCompare(c.bead_id)}),a}function Od(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var Ld={running:3,paused:2,failed:1};function Hr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Id(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Pd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Hr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Hr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),h=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let f=Ld[u.run_state],h=Ld[i];if(f>h||f===h&&(u.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:r}}function oa(e){return e.replace(/\/+$/,"")}function Rb(e,t){let n=oa(e),r=oa(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function aa(e,t){let n=new Set;for(let r of e)for(let s of t){if(!Rb(r,s))continue;let o=oa(r),a=oa(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var Dd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ts=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ia(e,t){let n=Dd.find(s=>s.step===e);if(!n)return null;let r=Dd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Md(e){let t=Ts.findIndex(n=>n.step===e);return Ts.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function hr(e){let t=Ts.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Ob(e){let t=Ts.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ts.length}}function la(e){let t=Ob(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Fi=new Set(["queued","running","retry_pending","repairing"]),Nd=new Set(["failed","succeeded"]),Lb={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Cs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Ib={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Cs.base_containment,child_sweep:Cs.child_sweep,branch_cleanup:Cs.branch_cleanup,parent_close:Cs.parent_close};function Pb(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Db(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Fi,...Nd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Mb(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function qi(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Lb[s];if(!o)return null;let a=ia(n,`${r} ${o}`);return a?{...a,active:Fi.has(s),failed:s==="failed"}:null}function Nb(e){return!e||typeof e!="object"?null:Ib[e.step]||null}function Rs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Nb(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=Pb(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(S=>S&&typeof S=="object"&&Db(S,t,i)).sort(Mb):[],u=a?c:[],f=u.find(S=>Fi.has(S.state));if(f)return qi(f);if(s)return s.step==="repo_operations"&&c[0]?qi(c[0],!0):null;let h=u.find(S=>Nd.has(S.state)?S.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(h)return qi(h);if(r){let S=ia(r.step,r.label);return S?{...S,active:!0,failed:!1}:null}let y=typeof e.cleanup_cursor=="string"?Cs[e.cleanup_cursor]:null;if(!y)return null;let $=ia(y.step,y.label);return $?{...$,active:!0,failed:!1}:null}function ca(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function ji(e,t){return`${e}\0${t}`}function qd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Bi(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function qb(e,t){return e==="internal"&&t===void 0}function Os(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Fd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Os(s)})`,location_label:Os(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Bi(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:qb(a,s)}}function jd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=ji(i.root_dir,c.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(u,[]);for(let f of Array.isArray(c.items)?c.items:[])r.set(f.id,u)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=ji(i.root_dir,c.id),f=Array.isArray(c.items)?c.items[0]:null,y=!!f&&f.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(f.blocked_by)?f.blocked_by:[],$=s.get(u);if($)for(let S of y){let F=r.get(S);F&&F!==u&&!$.includes(F)&&$.push(F)}}let o=(i,c)=>{let u=new Set,f=[i];for(;f.length>0;){let h=f.pop();if(h===c)return!0;!h||u.has(h)||(u.add(h),f.push(...s.get(h)||[]))}return!1},a=new Map;for(let[i,c]of s){let u=[];for(let f of c){let h=n.get(f);o(f,i)&&h&&u.push(h)}u.length>0&&a.set(i,u)}return a}function Bd(e,t){return ji(e,t)}var Ud=1,Ls=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Wi=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],yr={show_blocked:!0,spec:"all",with_deps:!1},Wd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Fb(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Hr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function jb(e,t){let{winners:n,resumed_from_ids:r}=Pd(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,c=a.run_state,u=a.started_at,f=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:mn(e,i.bead_id),can_pause:c==="running"&&f,can_resume:c!=="running"&&f&&!r.has(i.attempt_id)})}return s}function zd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function $t(e){return e&&typeof e=="object"?e:{}}function Bb(e,t,n){let r=$t(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=y=>tn({pin:y,global:a,execution_defaults:s,runner_catalog:o,route:n}),c,u;try{c=i(r),u=i(null)}catch{return null}let f=Hd(br(c,o),br(u,o)),h=Hd(er(c,null),er(u,null));return f||h?{orchestration:f,worker:h}:null}function Hd(e,t){return!e||t&&t.text===e.text?null:e}function Ub(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function Wb(e,t,n){let r=n.get(e);return!r||r.state==="done"?null:{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${Os(r)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`,...r.root_dir&&r.root_dir!==t?{badge:r.workspace_name||r.root_dir}:{}}}function zb(e,t){let n=Bi(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Gd(e,t,n){let r=t.get(e);if(!r)return zb(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Os(r)}function Hb(e,t,n,r,s,o){let a=[];return e.forEach((i,c)=>{let u=typeof i.id=="string"?i.id:"";if(u.length===0)return;let f=i.status==="confirmed"?"confirmed":"draft",h=Array.isArray(i.entries)?i.entries:[],y=[];h.forEach(($,S)=>{let F=$&&typeof $.bead_id=="string"?$.bead_id:"";if(F.length===0)return;let B=$&&typeof $.root_dir=="string"?$.root_dir:"",Q=n.get(F),le=Q?Q.state:void 0,U=le==="running"||le==="pr_wait"||le==="done",M=!Q||le==="runnable",D=Q&&Q.lane==="parallel"&&typeof Q.position=="number"?Q.position-1:null,W=y.length>0?y[y.length-1].id:null,E=f==="confirmed"&&W!==null&&!(t.get(F)||[]).includes(W);y.push({id:F,title:s.get(F)||F,root_dir:Q?Q.root_dir:B,workspace_name:Q?Q.workspace_name:o.get(B)||"",seq:S+1,location_label:Gd(F,n,r),draggable:!U,fixed:U,done:le==="done",unplaced:M,mismatch:E,...D!==null?{queue_index:D}:{}})}),y.forEach(($,S)=>{$.seq=S+1}),a.push({lane_id:u,status:f,draft:f==="draft",number:c+1,label:`\uC5F0\uACB0 ${c+1} \xB7 \uB808\uD3EC \uAC04`,rows:y,all_done:y.length>0&&y.every($=>$.done),can_confirm:f==="draft"&&y.length>=2,has_mismatch:f==="confirmed"&&y.some($=>$.mismatch||$.unplaced)})}),a}function Gb(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Vb(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:c,state:u}=Gb(i,t,n);if(u!==void 0&&(i.scope_state=u),c.length===0)continue;let f=o.get(i.root_dir);f?f.push({item:i,scope:c}):o.set(i.root_dir,[{item:i,scope:c}])}let a=(i,c,u)=>{let f={id:c.id,title:c.title,location_label:Gd(c.id,r,s),prefixes:u};i.overlap_chips?i.overlap_chips.push(f):i.overlap_chips=[f]};for(let i of o.values())for(let c=0;c<i.length;c+=1)for(let u=c+1;u<i.length;u+=1){let f=aa(i[c].scope,i[u].scope);f.length!==0&&(a(i[c].item,i[u].item,f),a(i[u].item,i[c].item,f))}}function Ui(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ua(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function zi(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...yr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,c=n&&Ls.some(C=>C.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let C of s)C&&typeof C.root_dir=="string"&&u.set(C.root_dir,C);let f=new Map;for(let C of s)C&&typeof C.root_dir=="string"&&f.set(C.root_dir,C.name||C.root_dir);for(let C of r)C&&typeof C.root_dir=="string"&&f.set(C.root_dir,C.name||C.root_dir);let h=[],y=[],$=[],S=[],F=[],B=[],Q=new Map,le=new Map,U=new Map,M=new Map,D=new Map,W=new Map,E=new Map,N=new Map;for(let C of r){if(!C||typeof C.root_dir!="string")continue;let re=C.root_dir,we=C.name||re,De=u.get(re),Pe=De&&typeof De.revision=="number"?De.revision:typeof C.revision=="number"?C.revision:0,z=$t(C.attempts),Y=$t(C.bead_titles);for(let[k,I]of Object.entries(Y))typeof I=="string"&&I.length>0&&N.set(k,I);let Se=$t(C.bead_times),Ke=$t(C.pr_observations),Ue=$t(C.admission),Ie=$t(C.revise_parked),ze=$t(C.merge_queue_state),et=$t(C.cleanup_failed),qe=$t(C.discard_operations),je=$t(C.bead_blocked_by);Object.hasOwn(C,"bead_scope")&&W.set(re,$t(C.bead_scope));let Ze=$t(C.bead_workflow),Xe=$t(C.pr_activity),bt=Array.isArray(C.repo_operations)?C.repo_operations:[],ot=Array.isArray(C.merge_queue)?C.merge_queue:[],_t=new Set(ot.filter(k=>k&&typeof k.bead_id=="string").map(k=>k.bead_id)),St=new Map(ot.filter(k=>k&&typeof k.bead_id=="string").map(k=>[k.bead_id,k])),mt=Array.isArray(C.queue)?C.queue:[],dt=(Array.isArray(C.serial_lanes)?C.serial_lanes:[]).filter(k=>k&&/^s[1-5]$/.test(k.id)&&Array.isArray(k.entries)),Tt=$t(C.lane_states),at=typeof C.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(C.serial_lane_count))):Math.min(5,dt.length);U.set(re,at),M.set(re,mt.length);let We=new Map(dt.map(k=>[k.id,k])),Te=new Map;for(let k of dt)for(let I of k.entries)I&&typeof I.bead_id=="string"&&Te.set(I.bead_id,k.id);for(let[k,I]of Object.entries(je))Array.isArray(I)&&D.set(k,I.filter(H=>typeof H=="string"&&H.length>0));let P=Array.isArray(C.done)?C.done:[];for(let k of P)k&&typeof k.bead_id=="string"&&B.push({id:k.bead_id,root_dir:re,workspace_name:we});let X=new Map;for(let k of P)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&X.set(k.bead_id,k.added_at);let ie=k=>({id:k,title:Y[k]||k,root_dir:re,workspace_name:we,expected_revision:Pe,draggable:!1,...$t(Se[k]).created_at?{created_at:$t(Se[k]).created_at}:{},...$t(Se[k]).updated_at?{updated_at:$t(Se[k]).updated_at}:{}}),x=new Set;for(let[k,I]of jb(z,X))x.add(k),y.push({...ie(k),lane:"running",...Te.has(k)?{serial_lane_id:Te.get(k)}:{},attempt_id:I.attempt_id,run_state:I.run_state,status:I.status||void 0,workflow:Ze[k]||null,can_pause:I.can_pause,can_resume:I.can_resume,started_at:I.started_at,last_event_at:I.last_event_at,last_activity:I.last_activity,legs:I.legs,runner:I.runner,model:I.model,effort:I.effort,speed:I.speed,resumed_from:I.resumed_from,continuation_mode:I.continuation_mode,usage:I.usage,exec_chips:{orchestration:As(I),worker:null},discard:An(qe,k,{attempt_id:I.attempt_id}),badges:I.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:I.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:I.run_state==="failed"});for(let[k,I]of Id(z)){if(y.some(ce=>ce.id===k))continue;let H=I.attempt,de=I.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";y.push({...ie(k),lane:"running",kind:"session",attempt_id:typeof H.attempt_id=="string"?H.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:Ze[k]||null,can_pause:!1,can_resume:!1,started_at:I.started_at,last_event_at:typeof H.last_event_at=="number"?H.last_event_at:null,last_activity:H.last_activity&&typeof H.last_activity=="object"?H.last_activity:null,legs:Array.isArray(H.legs)?H.legs:[],runner:typeof H.runner=="string"?H.runner:null,model:typeof H.model=="string"?H.model:null,effort:typeof H.effort=="string"?H.effort:null,speed:typeof H.speed=="string"?H.speed:null,resumed_from:null,continuation_mode:null,usage:H.usage&&typeof H.usage=="object"?H.usage:null,exec_chips:{orchestration:As(H),worker:null},discard:An(qe,k,{merge_queued:!0}),badges:[I.origin==="auto"?`${de} \xB7 \uC790\uB3D9`:de],alert:!1})}for(let k of Array.isArray(C.session_active)?C.session_active:[]){let I=k&&k.bead_id;typeof I!="string"||x.has(I)||(x.add(I),Array.isArray(k.blocked_by)&&k.blocked_by.length>0&&D.set(I,k.blocked_by.filter(H=>typeof H=="string"&&H.length>0)),typeof k.title=="string"&&k.title.length>0&&N.set(I,k.title),y.push({...ie(I),title:k.title||Y[I]||I,lane:"running",kind:"session",status:"in_progress",started_at:Ui(k.started_at)??Ui(k.updated_at)??void 0,updated_at:Ui(k.updated_at)??void 0,workflow:k.workflow||null,labels:Array.isArray(k.labels)?k.labels:[],spec_id:typeof k.spec_id=="string"?k.spec_id:"",blocked:k.blocked===!0,...Array.isArray(k.blocked_by)?{blocked_by:k.blocked_by.filter(H=>typeof H=="string"&&H.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let k of Array.isArray(C.pr_wait)?C.pr_wait:[]){let I=k&&k.bead_id;if(typeof I!="string"||x.has(I))continue;x.add(I);let H=$t(Ke[I]),de=$t(H.pr),ce=H.gate?$t(H.gate):null,ve=_t.has(I),Qe=St.get(I)?.continuation_action||null,Ve=!!Qe&&Qe.continuation===null,Ce=ze.active===I,lt=k.external===!0,it=et[I]||null,Lt=$t(Xe[I]),Pt=Rs({bead_id:I,merge_sha:k.merge_sha,cleanup_cursor:k.cleanup_cursor,merge_progress:Lt.merge_progress||null,cleanup_failed:it,repo_operations:bt}),Wt=ca(Pt),Dt=!!ce&&ce.base_badge==="\uCDA9\uB3CC",zt=!!it&&["child_sweep","branch_cleanup","parent_close"].includes(it.step)&&!!ce&&ce.tier==="merged",ht=lt&&!!it&&!!ce&&ce.tier==="merged",Mt=!!ce&&["closed_unmerged","review","undecidable"].includes(ce.tier),Fe=An(qe,I,{external:lt,merge_active:Ce||Pt?.step==="merge",merge_queued:ve,cleanup_active:Wt,merged:!!it||ce?.tier==="merged"}),Ht=!!Fe.operation;$.push({...ie(I),lane:"pr_wait",workflow:Ze[I]||null,pr_number:typeof de.number=="number"?de.number:null,pr_url:typeof de.url=="string"?de.url:void 0,external:lt,usage:mn(z,I),merge_step:Pt,badges:Ve?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Pt?[ce?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:it?[hr(it.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${hr(it.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ce?.gate_badge=="string"&&ce.gate_badge.length>0?[ce.gate_badge]:[],alert:Pt?Pt.failed===!0:!!it||Mt,reason:it&&Pt?.active!==!0?la(it.step):"PR \uB300\uAE30",merge_action:ce?.tier==="merged"&&!zt&&!ht?!1:!ve||Ve,merge_enabled:!Ht&&(Ve||ce?.enabled===!0||Dt||zt||ht),merge_label:Ve?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ht||zt?"\uC815\uB9AC \uC7AC\uAC1C":Dt&&!zt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ve?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ht?Fe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Fe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Fe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ht?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":zt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Dt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ce?.enabled===!0?`\uBA38\uC9C0 (${ce.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ce?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ve&&!Ve,cancel_enabled:!Ce,continuation_mismatch:Qe?.mismatch||null,discard:Fe,discard_action:Fe.action,discard_enabled:Fe.enabled,discard_title:Fe.title})}let K=(k,I,H,de)=>{let ce=k&&k.bead_id;if(typeof ce!="string"||x.has(ce))return null;x.add(ce);let ve=Ie[ce],Qe=An(qe,ce),Ve=Qe.operation?Qe:null,Ce={...ie(ce),lane:I,workflow:Ze[ce]||null,draggable:!Ve,discard:Ve||void 0,reason:zd(Ue,ce),seq:H+1,queue_position:H+1,queue_index:H,queue_length:de,badges:ve?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ve,revise_action:!!ve,revise_enabled:!!ve&&!Ve,revise_title:ve?ve.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ve.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(je,ce)&&(Ce.blocked_by=Array.isArray(je[ce])?je[ce].filter(lt=>typeof lt=="string"&&lt.length>0):[]),Ce};for(let k=0;k<mt.length;k++){let I=K(mt[k],"queue",k,mt.length);if(!I)continue;S.push(I);let H=Q.get(re);H?H.push(I):Q.set(re,[I])}let xe=k=>{let I=$.find(ce=>ce.id===k&&ce.root_dir===re);if(I)return{id:k,title:I.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let H=y.find(ce=>ce.id===k&&ce.root_dir===re),de=H&&H.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":H&&H.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:k,title:H?H.title:ie(k).title,badge:de}},A=[];for(let k=0;k<Math.max(at,dt.length);k++){let I=`s${k+1}`,H=We.get(I),de=H&&Array.isArray(H.entries)?H.entries:[],ce=[];for(let Ve=0;Ve<de.length;Ve++){let Ce=K(de[Ve],I,Ve,de.length);Ce&&(ce.push(Ce),S.push(Ce))}let ve=$t(Tt[I]),Qe=Array.isArray(ve.occupied_by)?ve.occupied_by.filter(Ve=>typeof Ve=="string"):[];ce.length===0&&Qe.length===0&&(at<=1||k>=at)||A.push({id:I,index:k,items:ce,raw_length:de.length,occupied_by:Qe,occupants:Qe.map(Ve=>xe(Ve)),corrections:Array.isArray(ve.corrections)?ve.corrections.length:0,cycle:ve.cycle===!0,...ce.length===0&&Qe.length===0?{empty:!0}:{}})}le.set(re,A);let O=Array.from({length:at},(k,I)=>{let H=`s${I+1}`,de=We.get(H),ce=de&&Array.isArray(de.entries)?de.entries:[],ve=$t(Tt[H]);return{id:H,index:ce.length,length:ce.length,occupied_by:Array.isArray(ve.occupied_by)?ve.occupied_by.filter(Qe=>typeof Qe=="string"):[]}});for(let k of Array.isArray(C.runnable)?C.runnable:[]){let I=k&&k.bead_id;if(typeof I!="string"||x.has(I))continue;x.add(I);let H=k.workflow&&typeof k.workflow=="object"?k.workflow:null,de=H&&typeof H.route=="string"&&H.route||(typeof k.route=="string"?k.route:null),ce=Bb($t(De),k.exec_pins,de);Array.isArray(k.blocked_by)&&k.blocked_by.length>0&&D.set(I,k.blocked_by.filter(ve=>typeof ve=="string"&&ve.length>0)),typeof k.title=="string"&&k.title.length>0&&N.set(I,k.title),Array.isArray(k.scope)&&E.set(I,k.scope.filter(ve=>typeof ve=="string"&&ve.length>0)),h.push({...ie(I),title:k.title||Y[I]||I,lane:"runnable",draggable:!0,reason:zd(Ue,I),created_at:k.created_at??void 0,updated_at:k.updated_at??void 0,status:typeof k.status=="string"?k.status:void 0,labels:Array.isArray(k.labels)?k.labels:[],spec_id:typeof k.spec_id=="string"?k.spec_id:"",workflow:H||(de?{route:de,chips:{route:de}}:null),...ce?{exec_chips:ce}:{},blocked:k.blocked===!0,...Array.isArray(k.blocked_by)?{blocked_by:k.blocked_by.filter(ve=>typeof ve=="string"&&ve.length>0)}:{},place_index:mt.length,place_lanes:O})}for(let k of P){let I=k&&k.bead_id;if(typeof I!="string"||x.has(I)||(x.add(I),o!==void 0&&typeof k.added_at=="number"&&k.added_at<o))continue;let H=Fb(z,I),de=H&&typeof H.done_kind=="string"?H.done_kind:null;F.push({...ie(I),lane:"done",done:!0,done_layout:"three_line",usage:mn(z,I),work_ms:Ho(z,I),done_at:typeof k.added_at=="number"?k.added_at:void 0,done_kind:de,badges:[...de&&Wd[de]?[Wd[de]]:[],...zo(z,I)]})}}let ne=new Map;s.forEach((C,re)=>{C&&typeof C.root_dir=="string"&&ne.set(C.root_dir,re)});let J=n&&n.running_sort==="repo"?"repo":"started";y.sort((C,re)=>{let we=C.kind==="session",De=re.kind==="session";if(we!==De)return we?1:-1;if(we&&De){let Y=ua(re.updated_at)-ua(C.updated_at);return Y!==0?Y:C.id.localeCompare(re.id)}if(J==="repo"){let Y=ne.get(C.root_dir)??Number.MAX_SAFE_INTEGER,Se=ne.get(re.root_dir)??Number.MAX_SAFE_INTEGER;if(Y!==Se)return Y-Se}let Pe=typeof C.started_at=="number"&&Number.isFinite(C.started_at)?C.started_at:null,z=typeof re.started_at=="number"&&Number.isFinite(re.started_at)?re.started_at:null;return Pe!==null&&z!==null&&Pe!==z?Pe-z:Pe===null&&z!==null?1:Pe!==null&&z===null?-1:C.id.localeCompare(re.id)}),F.sort((C,re)=>(re.done_at??0)-(C.done_at??0));let me=s.length>0?s:r.map(C=>({root_dir:C&&C.root_dir,name:C&&C.name,auto_advance:C&&C.auto_advance,auto_merge:C&&C.auto_merge,slots:C&&C.slots,revision:C&&C.revision,runner_catalog:C&&C.runner_catalog})),fe=new Set(h.map(C=>C.root_dir)),ee=[];for(let C of me){if(!C||typeof C.root_dir!="string")continue;let re=Q.get(C.root_dir)||[],we=le.get(C.root_dir)||[];!(re.length>0||we.some(Pe=>Pe.items.length>0||Pe.occupied_by.length>0))&&!fe.has(C.root_dir)||ee.push({root_dir:C.root_dir,name:C.name||C.root_dir,auto_advance:C.auto_advance===!0,auto_merge:C.auto_merge===!0,slots:typeof C.slots=="number"&&C.slots>=Ud?C.slots:Ud,revision:typeof C.revision=="number"?C.revision:0,runner_catalog:$t(C.runner_catalog),items:re,sublanes:{parallel:re,serial:we},serial_lane_count:U.get(C.root_dir)||0,raw_queue_length:M.get(C.root_dir)||0})}let ye={runnable:h,runnable_all:h,runnable_hidden:{blocked:0,spec:0,deps:0},runnable_sections:[],runnable_flat:c==="updated_flat",queue:S,queue_groups:ee,running:y,pr_wait:$,done:F,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(M),owner_of:{}},ke=qd(ye);for(let C of B)ke.has(C.id)||ke.set(C.id,{root_dir:C.root_dir,workspace_name:C.workspace_name,lane:"done",state:"done"});let _e=new Map;for(let[C,re]of D)for(let we of re){let De=_e.get(we);De?De.includes(C)||De.push(C):_e.set(we,[C])}for(let C of[...ye.queue,...ye.runnable]){if(!Object.hasOwn(C,"blocked_by"))continue;let re=ke.get(C.id);C.blockers=(C.blocked_by||[]).map(we=>Fd(we,re,ke,s)),C.blocker_warnings=C.blockers.filter(we=>we.missing_internal).map(we=>`\u26A0 \uC120\uD589 ${we.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),C.blocker_warnings.length>0&&(C.alert=!0)}for(let C of[...ye.queue,...ye.runnable,...ye.running,...ye.pr_wait]){let re=C.lane==="running"||C.lane==="pr_wait"?[]:(C.blockers||[]).map(Ub),we=[];for(let z of _e.get(C.id)||[]){let Y=Wb(z,C.root_dir,ke);Y&&we.push(Y)}let De=C.lane==="running"||C.lane==="pr_wait"?[]:C.blocker_warnings||[];if(re.length===0&&we.length===0&&De.length===0)continue;let Pe={predecessors:re,successors:we,warnings:De};C.dependency_chips=Pe}Vb(ye,W,E,ke,s);let se=jd(ye.queue_groups);for(let C of ye.queue_groups)for(let re of C.sublanes.serial){let we=se.get(Bd(C.root_dir,re.id));we&&(re.cross_wait_peers=we)}ye.chain_lanes=Hb(i&&Array.isArray(i.lanes)?i.lanes:[],D,ke,s,N,f);let Ae=new Map;for(let C of[...ye.queue,...ye.runnable])Ae.has(C.id)||Ae.set(C.id,C);let V=new Set;for(let C of ye.chain_lanes)for(let re of C.rows){if(C.status==="confirmed"&&!re.unplaced&&!re.fixed&&V.add(re.id),!C.draft&&!re.unplaced)continue;let we=Ae.get(re.id);we&&(we.cross_lane_chip={lane_id:C.lane_id,number:C.number,status:C.status,label:C.draft?`\uC5F0\uACB0 ${C.number} (draft)`:`\uC5F0\uACB0 ${C.number}`})}let te=[];for(let C of Q.values())for(let re of C)V.has(re.id)||te.push(re);te.sort((C,re)=>{let we=C.workspace_name.localeCompare(re.workspace_name);return we!==0?we:(C.queue_index??0)-(re.queue_index??0)}),ye.parallel_rows=te;let pe={};for(let[C,re]of ke)typeof re.root_dir=="string"&&re.root_dir.length>0&&(pe[C]=re.root_dir);for(let C of ye.chain_lanes)for(let re of C.rows)!Object.hasOwn(pe,re.id)&&re.root_dir.length>0&&f.has(re.root_dir)&&(pe[re.id]=re.root_dir);ye.owner_of=pe;let $e=ye.runnable.length;ye.runnable_all=ye.runnable.slice();let be=ye.runnable;a.show_blocked||(be=be.filter(C=>C.blocked!==!0));let Ne=be.length;a.spec==="with"?be=be.filter(C=>!!C.spec_id):a.spec==="without"&&(be=be.filter(C=>!C.spec_id));let he=be.length;a.with_deps&&(be=be.filter(C=>{let re=C.dependency_chips;return re?(re.predecessors||[]).length>0||(re.successors||[]).length>0:!1})),ye.runnable_hidden={blocked:$e-Ne,spec:Ne-he,deps:he-be.length};let He=(C,re)=>{let we=ua(re.updated_at)-ua(C.updated_at);return we!==0?we:C.id.localeCompare(re.id)},ut=c==="repo_spec"?(C,re)=>{let we=C.spec_id?0:1,De=re.spec_id?0:1;return we!==De?we-De:He(C,re)}:He;if(c==="updated_flat")ye.runnable=be.slice().sort(He),ye.runnable_sections=[];else{let C=new Map;for(let De of be){let Pe=C.get(De.root_dir);Pe?Pe.push(De):C.set(De.root_dir,[De])}let re=[],we=[];for(let De of me){if(!De||typeof De.root_dir!="string")continue;let Pe=(C.get(De.root_dir)||[]).slice().sort(ut);C.delete(De.root_dir),Pe.length!==0&&(re.push({root_dir:De.root_dir,name:De.name||De.root_dir,items:Pe.map(z=>({...z,workspace_name:""}))}),we.push(...Pe))}for(let[De,Pe]of C){let z=Pe.slice().sort(ut);re.push({root_dir:De,name:z[0]?.workspace_name||De,items:z.map(Y=>({...Y,workspace_name:""}))}),we.push(...z)}ye.runnable=we,ye.runnable_sections=re}return ye}var Vd="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Kd(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Yd(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Xd="bdui.monitor.done-range",Jd="bdui.monitor.running_sort",ep="bdui.monitor.candidate_sort",tp="beads-ui.monitor.candidate-filter",np="beads-ui.monitor.sections";function Kb(){try{let e=window.localStorage.getItem(tp);if(!e)return{...yr};let t=JSON.parse(e);return!t||typeof t!="object"?{...yr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:yr.show_blocked,spec:Wi.some(n=>n.value===t.spec)?t.spec:"all",with_deps:typeof t.with_deps=="boolean"?t.with_deps:yr.with_deps}}catch{return{...yr}}}function Hi(e){try{window.localStorage.setItem(tp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec,with_deps:e.with_deps}))}catch{}}function Yb(){try{let e=window.localStorage.getItem(ep);return Ls.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Zb(e){try{window.localStorage.setItem(ep,e)}catch{}}function Qb(){try{let e=window.localStorage.getItem(np);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Zd(e){try{window.localStorage.setItem(np,JSON.stringify(e))}catch{}}function Xb(){try{let e=window.localStorage.getItem(Xd);return _n(e)?e:an}catch{return an}}function Jb(e){try{window.localStorage.setItem(Xd,e)}catch{}}function eh(){try{return window.localStorage.getItem(Jd)==="repo"?"repo":"started"}catch{return"started"}}function th(e){try{window.localStorage.setItem(Jd,e)}catch{}}var rp="tab:monitor:pipeline",nh=1e3,rh=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Qd="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function sh(e){return e>=1&&e<=Qd.length?Qd[e-1]:`(${e})`}function sp(e,t){let n=xt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,c=t.switchWorkspace,u=t.router,f=t.now||(()=>Date.now()),h=t.confirm||(d=>typeof globalThis.confirm!="function"||globalThis.confirm(d)),y=Xb(),$=eh(),S=Kb(),F=Yb(),B=Qb(),Q=null,le=null,U=null,M=null,D=[],W=null;function E(){let d=Gn.find(p=>p.value===y);return d?d.label:""}let N=document.createElement("div");N.className="mon",e.appendChild(N);let ne=document.createElement("div");ne.className="mon2-drawer",e.appendChild(ne);let J=zi(null,null),me=new Map,fe=new Map,ee=null,ye=null,ke=null,_e=Fr(ne,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Q=null,x()}});async function se(d,p,b,w,q=!0){if(!o||!b)return null;let G=await o(d,{...p,root_dir:b,expected_revision:w});if(G&&G.conflict&&q){G.queue&&fe.set(b,G.queue);let Z=G.queue&&typeof G.queue.revision=="number"?G.queue.revision:w;G=await o(d,{...p,root_dir:b,expected_revision:Z})}return G&&G.queue&&b&&fe.set(b,G.queue),G}function Ae(d,p){let b=fe.get(d),w=s&&s.get?s.get():null,q=(Array.isArray(w)?w:[]).find(Z=>Z?.root_dir===d);return(b||q)?.merge_queue?.find(Z=>Z.bead_id===p)?.continuation_action}async function V(d,p,b,w){let q=await se(d,p,b,w),G=fe.get(b)?.revision??q?.queue?.revision??w;return Pn(q,(Z,ge)=>se(d,{...p,continuation:Z,decision_token:ge},b,G,!1),{refresh:Z=>se(d,p,b,Z?.queue?.revision??fe.get(b)?.revision??G,!1)})}async function te(d,p,b,w){let q=await Pn({continuation_mismatch:w},(Z,ge)=>se("worker-merge-queue-add",{bead_id:p,continuation:Z,decision_token:ge},d,b,!1)),G=q?.queue?.merge_queue?.find(Z=>Z.bead_id===p)?.continuation_action;q?.applied!==!0&&G?.continuation===null&&G.mismatch&&await te(d,p,q.queue.revision,G.mismatch)}async function pe(d,p,b){let w=await se("worker-discard",d,p,b);if(w&&w.discarded===!0){ae(Vo(w),"success",5e3);return}if(w&&w.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${w.reason}`,"error");return}if(w&&w.accepted&&w.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(w&&w.accepted){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${w.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}w&&!w.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function $e(d,p,b){return!o||!b?null:await o(d,{...p,root_dir:b})}async function be(){let d=new Map;for(let p of J.pr_wait)d.has(p.root_dir)||d.set(p.root_dir,p.expected_revision);for(let[p,b]of d)await se("worker-merge-queue-add-all",{},p,b)}function Ne(d){let p=B[d];return!!(p&&p.runnable===!0)}function he(d){let p={...B[d]||{}};p.runnable=!p.runnable,B={...B,[d]:p},Zd(B),x()}function He(d){return B[d]===!0}function rt(d){B={...B,[d]:B[d]!==!0},Zd(B),x()}function ut(d){let p=J.queue_groups.find(b=>b.root_dir===d);if(!p)return null;for(let b=0;b<p.serial_lane_count;b+=1){let w=`s${b+1}`,q=p.sublanes.serial.find(G=>G.id===w);if(!q||q.raw_length===0&&q.occupied_by.length===0)return w}return null}function C(d,p){let b=J.queue_groups.find(q=>q.root_dir===d),w=b?b.sublanes.serial.find(q=>q.id===p):void 0;return w?w.raw_length:0}function re(d,p){let b=me.get(d),w=me.get(p);if(!b||!w)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let q=Kd(b),G=Kd(w);if(q!==null&&q===G&&b.root_dir===w.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let Z=Yd(b),ge=Yd(w);if(Z&&G!==null){let Re=G;return{kind:"ops",title:`${Re} \uB05D\uC5D0 ${d}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:d,lane:Re,index:C(w.root_dir,Re)}]}}if(q!==null&&ge&&G===null){let Re=q;return{kind:"ops",title:`${Re} \uB05D\uC5D0 ${p}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:b.root_dir,ops:[{bead_id:p,lane:Re,index:C(b.root_dir,Re)}]}}if(Z&&q===null&&ge&&G===null){let Re=ut(b.root_dir);return Re===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Re} \uB808\uC778\uC5D0 ${p} \u2192 ${d} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:b.root_dir,ops:[{bead_id:p,lane:Re,index:0},{bead_id:d,lane:Re,index:1}]}}return!Z&&!ge?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:Z?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function we(d,p){let b=re(d,p.id);return{id:p.id,title:p.title,location_label:p.location_label,prefixes:p.prefixes,action:b.kind==="note"?{kind:"note",text:b.text}:b.kind==="disabled"?{kind:"disabled",label:Vd,title:b.title}:{kind:"place",label:Vd,title:b.title}}}function De(d,p){if(!U||U.bead_id!==d)return null;let b=U.counterpart_id,w=p.filter(q=>q.id===b);return w.length===0?null:{rows:w.map(q=>we(d,q))}}function Pe(d){let p=d.dependency_chips||null,b=d.overlap_chips||[],w=d.scope_state==="missing",q=d.cross_lane_chip;if(!p&&b.length===0&&!w&&!q)return null;let G=De(d.id,b);return{...p||{},...b.length>0?{overlaps:b}:{},...w?{scope_missing:!0}:{},...q?{cross_lane:{lane_id:q.lane_id,label:q.label}}:{},...G?{popover:G}:{}}}function z(d){let p=Pe(d);return p?{...d,dependency_chips:p}:d}async function Y(d,p){let b=re(d,p);if(U=null,b.kind!=="ops"){x();return}let w=Lt(b.root_dir,b.ops[0].bead_id);for(let q of b.ops){let G=await Se(q,b.root_dir,w);if(G===null)break;w=G}x()}async function Se(d,p,b){try{let w=await se("worker-queue-place",d,p,b,!1);if(w&&w.conflict)return ae("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!w||w.applied!==!0)return ae(w&&typeof w.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${w.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let q=w.queue?w.queue.revision:void 0;return typeof q!="number"?(ae("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):q}catch(w){return ae(de(w),"error"),null}}function Ke(d){let p=Ne(d.root_dir);return l`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${d.root_dir}
        data-section="runnable"
        aria-expanded=${p?"false":"true"}
        aria-label=${`${d.name} \uC139\uC158 ${p?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${p?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${d.root_dir}>${d.name}</span>
      <span class="mon2-sec__count">${d.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${d.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Ue(d,p){return l`<div
      class="mon2-item"
      data-bead-id=${d.id}
      data-drag-kind="candidate"
      data-root-dir=${d.root_dir}
    >
      ${p}
    </div>`}function Ie(d){if(le!==d.id)return null;let p=J.queue_groups.find(G=>G.root_dir===d.root_dir),b=d.place_lanes||[],w=J.cross_lanes_revision!==null,q=[{id:"parallel",label:"\uBCD1\uB82C",count:d.place_index??0}];for(let G of J.chain_lanes)q.push({id:`lane:${G.lane_id}`,label:`\uC5F0\uACB0 ${G.number} (${G.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:G.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!w});q.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!w,title:w?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let G of b)q.push({id:`serial:${G.id}`,label:`\uC9C1\uB82C ${Number(G.id.slice(1))}`,count:G.length,group:`${p?p.name:""} \uC9C1\uB82C`});return{bead_id:d.id,lanes:q}}function ze(){let d=[],p=new Set,b=(w,q)=>{for(let G of w)p.has(G.id)||(p.add(G.id),d.push({bead_id:G.id,root_dir:G.root_dir,workspace_name:G.workspace_name,title:G.title,lane:q}))};return b(J.running,"running"),b(J.pr_wait,"pr_wait"),b(J.queue,"queue"),b(J.runnable_all,"runnable"),d}function et(d){if(!M||M.bead_id!==d)return"";let p=Ce(),b=ze(),w=new Map;for(let Re of b)w.set(Re.bead_id,Re);let q=(p.get(d)||[]).filter(Re=>w.has(Re)),G=b.filter(Re=>(p.get(Re.bead_id)||[]).includes(d)).map(Re=>Re.bead_id),Z=Od(Rd(d,M.direction,{issues:b,blocked_by_map:p}),M.query),ge=J.owner_of[d];return l`<div
      class="mon-deppanel"
      data-bead-id=${d}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__now">
        ${q.length===0&&G.length===0?l`<span class="mon-deppanel__empty">연결된 의존 없음</span>`:""}
        ${q.map(Re=>l`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">🔒 선행 ${Re}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${d}
                data-dep-b=${Re}
                aria-label=${`\uC120\uD589 ${Re} \uC5F0\uACB0 \uD574\uC81C`}
                title="선행 연결 해제"
              >
                ✕
              </button></span
            >`)}
        ${G.map(Re=>l`<span class="mon-deppanel__chip mon-deppanel__chip--succ"
              ><span class="mon-deppanel__chip-label">→ 후속 ${Re}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${Re}
                data-dep-b=${d}
                aria-label=${`\uD6C4\uC18D ${Re} \uC5F0\uACB0 \uD574\uC81C`}
                title="후속 연결 해제"
              >
                ✕
              </button></span
            >`)}
      </div>
      <div class="mon-deppanel__dir" role="group" aria-label="의존 방향">
        <button
          type="button"
          class="mon-deppanel__seg${M.direction==="predecessor"?" is-active":""}"
          data-dep-direction="predecessor"
          aria-pressed=${M.direction==="predecessor"?"true":"false"}
        >
          ← 앞에 (선행 추가)
        </button>
        <button
          type="button"
          class="mon-deppanel__seg${M.direction==="successor"?" is-active":""}"
          data-dep-direction="successor"
          aria-pressed=${M.direction==="successor"?"true":"false"}
        >
          → 뒤에 (후속 추가)
        </button>
      </div>
      <input
        type="search"
        class="mon-deppanel__search"
        placeholder="ID·제목 검색"
        aria-label="의존 후보 검색"
        .value=${M.query}
      />
      <div class="mon-deppanel__list">
        ${Z.length===0?l`<div class="mon-deppanel__empty">후보 없음</div>`:Z.map(Re=>l`<button
                  type="button"
                  class="mon-deppanel__cand${Re.disabled?" is-disabled":""}"
                  data-dep-cand=${Re.bead_id}
                  ?disabled=${Re.disabled}
                  title=${Re.reason||Re.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${Re.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${Re.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${Re.title}</span
                  >${Re.reason?l`<span class="mon-deppanel__cand-reason"
                        >${Re.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${ge===void 0?l`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function qe(d){return Ue(d,l`${Ti(z(d),Ie(d),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(p,b)=>i(b,d.root_dir):void 0})}${et(d.id)}`)}function je(){return J.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${J.runnable.map(d=>qe(d))}
      </div>`:l`${J.runnable_sections.map(d=>{let p=Ne(d.root_dir);return l`<section
        class="mon2-sec${p?" is-collapsed":""}"
        data-root-dir=${d.root_dir}
        data-section="runnable"
      >
        ${Ke({root_dir:d.root_dir,name:d.name,count:d.items.length})}
        ${p?"":l`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${d.items.map(b=>qe(b))}
            </div>`}
      </section>`})}`}function Ze(d,p){return l`<div
      class="mon2-item"
      data-bead-id=${d.id}
      data-drag-kind="parallel"
      data-root-dir=${d.root_dir}
      data-row-index=${p}
      data-queue-index=${String(d.queue_index??0)}
    >
      ${Qn(z(d))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${d.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${d.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${d.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${d.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
      ${et(d.id)}
    </div>`}function Xe(){let d=He("parallel");return l`<section
      class="mon2-area mon2-parallel${d?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${d?"false":"true"}
          aria-label=${`\uBCD1\uB82C \uC601\uC5ED ${d?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${d?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${J.parallel_rows.length}</span>
      </header>
      ${d?"":l`<div class="mon2-area__body" data-drop="parallel">
            ${J.parallel_rows.length===0?l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:J.parallel_rows.map((p,b)=>Ze(p,b))}
          </div>`}
    </section>`}function bt(d,p,b){return l`<div
      class="mon2-crow${p.fixed?" mon2-crow--fixed":""}"
      draggable=${p.draggable?"true":"false"}
      data-bead-id=${p.id}
      data-drag-kind="chain"
      data-root-dir=${p.root_dir}
      data-lane-id=${d.lane_id}
      data-row-index=${b}
      data-queue-index=${typeof p.queue_index=="number"?String(p.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${sh(p.seq)}</span
      >
      ${p.workspace_name?l`<span class="worker-mini__repo" title=${p.root_dir}
            >${p.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${p.id}</span>
      <span class="mon2-crow__title">${p.title}</span>
      ${p.mismatch?l`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      <span class="mon2-crow__where"
        >${p.location_label==="\uC2E4\uD589\uC911"?`\u25CF ${p.location_label}`:p.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${p.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function ot(d){let p=J.cross_lanes_revision!==null;return l`<div class="mon2-clane" data-lane-id=${d.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${d.label}</span>
        <span class="mon2-clane__count">${d.rows.length}</span>
        <span
          class="mon2-clane__badge mon2-clane__badge--${d.draft?"draft":"confirmed"}"
          >${d.draft?"draft":"\uD655\uC815"}</span
        >
        ${d.all_done?l`<span class="mon2-clane__badge mon2-clane__badge--done"
              >모두 완료</span
            >`:""}
        ${d.draft?l`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${d.lane_id}
              ?disabled=${!p||!d.can_confirm}
              title=${d.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:d.has_mismatch?l`<button
                type="button"
                class="mon2-clane__reapply"
                data-lane-id=${d.lane_id}
                ?disabled=${!p}
                title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
              >
                재적용
              </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${d.lane_id}
          ?disabled=${!p}
          title=${d.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${d.lane_id}
      >
        ${d.rows.length===0?l`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:d.rows.map((b,w)=>bt(d,b,w))}
      </div>
    </div>`}function _t(d,p,b){return l`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="repo-serial"
      data-root-dir=${p.root_dir}
      data-lane-id=${d.id}
      data-row-index=${b}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Qn(z(p))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${p.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
      </span>
      ${et(p.id)}
    </div>`}function St(d){if(d.length===0)return"";let p=d.length-1;return`${d[0].id} \uC810\uC720${p>0?` +${p}`:""}`}function mt(d){return l`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${d.id}
    >
      ${Qn({id:d.id,title:d.title,lane:"running",draggable:!1,ghost:!0,badges:[d.badge]})}
    </div>`}function dt(d,p){return l`<div
      class="mon2-lane${p.empty?" mon2-lane--empty":""}"
      data-root-dir=${d.root_dir}
      data-lane-length=${String(p.raw_length)}
    >
      ${bn({id:"",lane:p.id,title:`${d.name} \xB7 \uC9C1\uB82C ${p.index+1}`,items:p.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:l`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${d.root_dir}
          data-lane-id=${p.id}
          data-lane-length=${String(p.raw_length)}
        >
          ${p.occupants.map(b=>mt(b))}
          ${p.items.length>0?p.items.map((b,w)=>_t(p,b,w)):p.occupants.length>0?"":l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:l`<span
            class="mon2-lane__badge${p.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${p.occupants.length>0?p.occupants.map(b=>`${b.id} \u2014 ${b.badge}`).join(`
`):""}
            >${St(p.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${d.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${p.empty?l`<div class="mon2-lane__hint">
            ${d.name} 직렬 ${p.index+1} 비어 있음
          </div>`:""}
      ${p.cycle?l`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(p.cross_wait_peers||[]).map(b=>l`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${b.workspace_name}·${b.lane}과 교차 대기
          </div>`)}
    </div>`}function Tt(){let d=He("serial"),p=J.cross_lanes_revision!==null,b=J.chain_lanes.some(w=>w.draft&&w.rows.length===0);return l`<section
      class="mon2-area mon2-serial${d?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${d?"false":"true"}
          aria-label=${`\uC9C1\uB82C \uC601\uC5ED ${d?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${d?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">직렬 영역</span>
        <button
          type="button"
          class="mon2-newlane"
          ?disabled=${b||!p}
          title=${p?b?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${d?"":l`<div class="mon2-area__body">
            ${J.cross_lanes_unreadable?l`<div class="mon2-clane__unreadable">
                  연결 레인 저장소를 읽을 수 없음
                </div>`:""}
            ${J.chain_lanes.map(w=>ot(w))}
            ${J.queue_groups.map(w=>w.sublanes.serial.map(q=>dt(w,q)))}
          </div>`}
    </section>`}function at(){return l`<div class="mon2-wait">${Xe()}${Tt()}</div>`}function We(d){return l`<div class="worker-rungrid">
      ${J.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:J.running.map(p=>Oi({bead_id:p.id,attempt_id:p.attempt_id||"",title:p.title,runner:p.runner??null,model:p.model??null,effort:p.effort??null,speed:p.speed??null,started_at:p.started_at??null,kind:p.kind,...p.kind==="session"?{updated_at:p.updated_at}:{},workflow:p.workflow||null,resumed_from:p.resumed_from??null,continuation_mode:p.continuation_mode??null,paused:p.run_state==="paused",failed:p.run_state==="failed",status:p.status,status_label:p.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:p.can_resume!==!1,can_pause:p.can_pause!==!1,exec_chips:p.exec_chips||null,usage:p.usage||null,discard:p.discard},d,Q,{monitor:{repo:p.workspace_name,root_dir:p.root_dir,serial_lane_id:p.serial_lane_id,last_activity:p.last_activity||null,legs:p.legs||[],dependency_chips:Pe(p)}}))}
    </div>`}function Te(d){let p={runnable:J.runnable,queue:J.queue,running:J.running,pr_wait:J.pr_wait,done:J.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${rh.map(b=>{let w=p[b.lane],q=b.lane==="runnable"?J.runnable_flat?w.length>0?je():void 0:J.runnable_sections.length>0?je():void 0:b.lane==="queue"?J.queue_groups.length>0||J.chain_lanes.length>0||J.parallel_rows.length>0?at():void 0:b.lane==="running"?We(d):w.length>0?l`${w.map(G=>Qn(G))}`:void 0;return bn({id:`monitor-${b.lane}`,lane:b.pane,title:b.lane==="done"?`\uC644\uB8CC\xB7${E()}`:b.title,items:w,empty:b.empty,body:q,live:b.lane==="running"&&w.length>0,controls:b.lane==="runnable"?P():void 0,header_control:X(b.lane,w.length)})})}
      </div>`}function P(){return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${S.show_blocked}
        />
        🔒
        blocked${J.runnable_hidden.blocked>0?` ${J.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Wi.map(d=>l`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${S.spec===d.value?" is-active":""}"
              data-spec=${d.value}
              aria-pressed=${S.spec===d.value?"true":"false"}
            >
              ${d.label}
            </button>`)}
        ${J.runnable_hidden.spec>0?l`<span class="worker-filter__hidden"
              >숨김 ${J.runnable_hidden.spec}</span
            >`:""}
      </div>
      <label
        class="worker-filter__tgl"
        title="열린 선행 또는 열린 후속이 있는 카드만"
      >
        <input
          type="checkbox"
          class="mon-filter__deps"
          .checked=${S.with_deps}
        />
        의존
        있음${J.runnable_hidden.deps>0?` ${J.runnable_hidden.deps}`:""}
      </label>
    </div>`}function X(d,p){return d==="runnable"?l`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${F}
      >
        ${Ls.map(b=>l`<option
              value=${b.value}
              ?selected=${F===b.value}
            >
              ${b.label}
            </option>`)}
      </select>`:d==="running"?l`<select
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
      </select>`:d==="pr_wait"&&p>0?l`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:d==="done"?l`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${y}
      >
        ${Gn.map(b=>l`<option value=${b.value} ?selected=${y===b.value}>
              ${b.label}
            </option>`)}
      </select>`:""}function ie(d){let p=s&&s.get?s.get():null,b=s&&s.getWorkspacesState?s.getWorkspacesState():[],w=d===void 0?s&&s.crossLanes?s.crossLanes():void 0:d,q={done_since:ur(y,f()),running_sort:$,candidate_filter:S,candidate_sort:F};return w!==void 0&&(q.cross_lanes=w),zi(p,b,q)}function x(){let d=f();J=ie(),me=new Map;for(let p of[...J.runnable,...J.queue,...J.running,...J.pr_wait,...J.done])!p.non_occupying&&!me.has(p.id)&&me.set(p.id,p);Ge(Te(d),N),xe()?.render(),K(),A()}function K(){let d=new Map;for(let p of J.queue_groups)d.set(p.root_dir,p.auto_advance);for(let p of Array.from(N.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let b=p.closest(".mon2-item")?.getAttribute("data-root-dir")||"",w=d.get(b);typeof w=="boolean"&&p.setAttribute("title",`${p.textContent||""} \xB7 ${w?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function xe(){if(ke)return ke;let d=N.querySelector(".mon2-deck");return d?(ke=$d(d,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>J.done,rangeLabel:E,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:k,onFocusChange:p=>{W=p,A()}}),ke):null}function A(){N.classList.toggle("has-focus",W!==null);for(let d of Array.from(N.querySelectorAll(".mon2-sec[data-root-dir]")))d.classList.toggle("is-focus",W!==null&&d.getAttribute("data-root-dir")===W);for(let d of Array.from(N.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let p=me.get(d.getAttribute("data-bead-id")||"");d.classList.toggle("is-focus",W!==null&&!!p&&p.root_dir===W)}for(let d of Array.from(N.querySelectorAll(".mon2-crow[data-root-dir]")))d.classList.toggle("is-focus",W!==null&&d.getAttribute("data-root-dir")===W)}function O(d,p){let b=a?a():void 0;if(!p||!b||p===b||!c){r(d);return}c(p).then(()=>{r(d)}).catch(w=>{n("workspace switch for %s failed: %o",p,w)})}function k(d){if(!d)return;let p=a?a():void 0,b=()=>{try{u?.gotoView("worker")}catch(w){n("gotoView(worker) failed: %o",w)}};if(!c||p&&p===d){b();return}c(d).then(b).catch(w=>{n("workspace switch for %s failed: %o",d,w),ae("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function I(d){cn(d).then(p=>{ae(p?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",p?"success":"error",1400)})}function H(d){let p=me.get(d)||null;return{item:p,root_dir:p?p.root_dir:"",revision:p?p.expected_revision:0}}function de(d){if(typeof d=="string"&&d.length>0)return d;if(d&&typeof d=="object"){let p=d;if(typeof p.message=="string"&&p.message.length>0)return p.message;if(typeof p.error=="string"&&p.error.length>0)return p.error;if(p.error&&typeof p.error=="object"&&typeof p.error.message=="string")return p.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function ce(d,p,b){let{root_dir:w}=H(p);if(!(!p||!b||b===p))try{await $e(d,{a:p,b},w)}catch(q){ae(de(q),"error")}}async function ve(d,p,b){let w=J.owner_of[p];if(typeof w!="string"||w.length===0){ae(`${p}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await $e(d,{a:p,b},w)}catch(q){ae(de(q),"error")}x()}function Qe(d){return J.runnable.some(p=>p.id===d)||J.parallel_rows.some(p=>p.id===d)?!0:J.queue_groups.some(p=>p.sublanes.serial.some(b=>b.items.some(w=>w.id===d)))}function Ve(d,p){!d||!Qe(d)||(M=M&&M.bead_id===d&&p===void 0?null:{bead_id:d,direction:p||"predecessor",query:""},x())}function Ce(){let d=new Map,p=s&&s.get?s.get():null,b=w=>Array.isArray(w)?w.filter(q=>typeof q=="string"&&q.length>0):[];for(let w of Array.isArray(p)?p:[]){if(!w||typeof w!="object")continue;let q=w.bead_blocked_by&&typeof w.bead_blocked_by=="object"?w.bead_blocked_by:{};for(let[G,Z]of Object.entries(q))Array.isArray(Z)&&d.set(G,b(Z));for(let G of[...Array.isArray(w.runnable)?w.runnable:[],...Array.isArray(w.session_active)?w.session_active:[]])G&&typeof G.bead_id=="string"&&Array.isArray(G.blocked_by)&&G.blocked_by.length>0&&d.set(G.bead_id,b(G.blocked_by))}return d}function lt(){let d=Ce();for(let p of D){let b=(d.get(p.a)||[]).slice();p.type==="dep-remove"?d.set(p.a,b.filter(w=>w!==p.b)):b.includes(p.b)||d.set(p.a,[...b,p.b])}return d}function it(d=J){let p=new Map,b=new Map,w=new Set,q=new Set;for(let Z of d.chain_lanes){p.set(Z.lane_id,{status:Z.status,entries:Z.rows.map(ge=>({bead_id:ge.id,root_dir:ge.root_dir}))});for(let ge of Z.rows)b.set(ge.id,Z.lane_id),ge.fixed&&w.add(ge.id),ge.unplaced||q.add(ge.id)}let G=new Map;for(let Z of d.parallel_rows)typeof Z.queue_index=="number"&&G.set(Z.id,Z.queue_index);for(let Z of d.queue_groups)for(let ge of Z.sublanes.serial)for(let Re of ge.items)typeof Re.queue_index=="number"&&G.set(Re.id,Re.queue_index);return{blocked_by_map:lt(),owner_of:new Map(Object.entries(d.owner_of)),cross_lanes:p,owner_lane_of:b,fixed_members:w,placed_members:q,parallel_rows:d.parallel_rows.map(Z=>({bead_id:Z.id,root_dir:Z.root_dir,queue_index:Z.queue_index??0})),parallel_raw_length:new Map(Object.entries(d.parallel_raw_length)),queue_index_of:G}}function Lt(d,p){let b=me.get(p);if(b&&b.root_dir===d)return b.expected_revision;let w=J.queue_groups.find(q=>q.root_dir===d);return w?w.revision:0}async function Pt(d,p,b){try{if(d.type==="worker-queue-place"||d.type==="worker-queue-reorder"||d.type==="worker-queue-remove"){let w=await se(d.type,d.payload,d.root_dir,b.get(d.root_dir)??Lt(d.root_dir,p));return!w||typeof w.applied!="boolean"?(ae("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),!1):(w.queue&&typeof w.queue.revision=="number"&&b.set(d.root_dir,w.queue.revision),w.conflict?(ae("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):w.applied===!1?(ae(w.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${w.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0)}return(d.type==="dep-add"||d.type==="dep-remove")&&await $e(d.type,{a:d.a,b:d.b},d.root_dir),!0}catch(w){return ae(de(w),"error"),!1}}function Wt(d){(d.type==="dep-add"||d.type==="dep-remove")&&(D=[...D,{type:d.type,a:d.a,b:d.b}])}async function Dt(d,p){if(!o)return{ok:!1};try{let b=await o(d.type,{...d.payload,expected_revision:p});return!b||typeof b.revision!="number"?(ae("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:b.revision}}catch(b){let w=b,q=w&&w.code==="conflict"?w.details?.cross_lanes:null;return q&&typeof q.revision=="number"&&Array.isArray(q.lanes)?{ok:!1,conflict:q}:(ae(de(b),"error"),{ok:!1})}}async function zt(d,p,b){let w=new Map,q=d.ops.slice(0,d.lane_op_index),G=d.ops.slice(d.lane_op_index);for(let ge of q){if(!await Pt(ge,b,w))return{done:!0};Wt(ge)}let Z=p;for(let ge of d.lane_ops){if(Z===null)return ae("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Re=await Dt(ge,Z);if(!Re.ok)return Re.conflict?{done:!1,conflict:Re.conflict}:{done:!0};Z=Re.revision}for(let ge of G){if(!await Pt(ge,b,w))return{done:!0};Wt(ge)}return{done:!0}}async function ht(d,p){D=[];let b=J;for(let w=0;;w+=1){let q=d(it(b));if("refused"in q){ae(q.refused,"error");break}let G=await zt(q,b.cross_lanes_revision,p);if(G.done)break;if(w>=1){ae("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}b=ie(G.conflict)}D=[],x()}async function Mt(d,p){await ht(b=>Mi(d,p,b),d.bead_id)}async function Fe(d,p){if(d==="create"){await ht(b=>Ni(null,b),"");return}if(d==="remove"){let b=J.chain_lanes.find(w=>w.lane_id===p);if(b&&!b.draft){let w=b.rows.filter((q,G)=>G===0?!1:!q.mismatch).length;if(!h(`\uC758\uC874 ${w}\uAC1C\uB97C \uD568\uAED8 \uC81C\uAC70\uD569\uB2C8\uB2E4`))return}await ht(w=>Cd(p,w),"");return}await ht(b=>d==="confirm"?Ed(p,b):Td(p,b),"")}async function Ht(d,p){let b=me.get(d);if(!b){x();return}let w={kind:"candidate",bead_id:d,root_dir:b.root_dir};if(p==="new-lane"){await ht(q=>Ni({bead_id:d,root_dir:b.root_dir},q),d);return}if(p.startsWith("lane:")){let q=p.slice(5);if(!J.chain_lanes.find(Z=>Z.lane_id===q)){x();return}await ht(Z=>Mi(w,{kind:"chain",lane_id:q,marker_index:(Z.cross_lanes.get(q)?.entries??[]).length},Z),d);return}if(p.startsWith("serial:")){let q=p.slice(7),G=(b.place_lanes||[]).find(Z=>Z.id===q);await Mt(w,{kind:"repo-serial",root_dir:b.root_dir,lane_id:q,index:G?G.index:0});return}await Mt(w,{kind:"parallel",marker_index:J.parallel_rows.length})}async function Xt(d,p){let b=J.parallel_rows,w=b.findIndex(Vt=>Vt.id===d);if(w<0)return;let q=b[w].root_dir,G=[];b.forEach((Vt,sn)=>{Vt.root_dir===q&&G.push(sn)});let Z=G.indexOf(w),ge=G[Z+p];if(typeof ge!="number")return;let Re=p===-1?ge:G[Z+2]??Math.min(b.length,ge+1);await Mt({kind:"parallel",bead_id:d,root_dir:q,queue_index:b[w].queue_index??0},{kind:"parallel",marker_index:Re})}async function Ye(d){for(let p of J.chain_lanes){let b=p.rows.find(w=>w.id===d);if(b){await Mt({kind:"chain",bead_id:d,root_dir:b.root_dir,lane_id:p.lane_id,...typeof b.queue_index=="number"?{queue_index:b.queue_index}:{}},{kind:"parallel",marker_index:J.parallel_rows.length});return}}}let Ee=null,R=!1,ue=null;function Oe(){ue!==null&&clearTimeout(ue),ue=setTimeout(()=>{ue=null,R=!1},0)}function tt(d,p){let b=p&&typeof p.closest=="function"?p.closest("[data-row-index]"):null;if(b&&d.contains(b)){let w=Number(b.getAttribute("data-row-index"));return Number.isFinite(w)?w:0}return d.querySelectorAll("[data-row-index]").length}function yt(d){let p=d.target,b=typeof p?.closest=="function"?p.closest("[data-drop]"):null;if(!b||!Ee)return null;let w=b.getAttribute("data-drop");if(w==="candidate")return{zone:b,target:{kind:"candidate"}};if(w==="parallel")return{zone:b,target:{kind:"parallel",marker_index:tt(b,p)}};if(w==="chain")return{zone:b,target:{kind:"chain",lane_id:b.getAttribute("data-lane-id")||"",marker_index:tt(b,p)}};if(w==="repo-serial"){let q=b.getAttribute("data-root-dir")||"";if(q!==Ee.root_dir)return null;let G=typeof p?.closest=="function"?p.closest("[data-queue-index]"):null,Z=G&&b.contains(G)?G.getAttribute("data-queue-index"):b.getAttribute("data-lane-length"),ge=Number(Z);return{zone:b,target:{kind:"repo-serial",root_dir:q,lane_id:b.getAttribute("data-lane-id")||"",index:Number.isFinite(ge)?ge:0}}}return null}function pt(){for(let d of Array.from(N.querySelectorAll(".is-drop-over")))d.classList.remove("is-drop-over")}function Et(d){let p=d.target,b=typeof p?.closest=="function"?p.closest('[draggable="true"][data-bead-id]'):null,w=b?b.closest("[data-drag-kind]"):null;if(!w)return;let q=w.getAttribute("data-bead-id")||"",G=w.getAttribute("data-drag-kind")||"",Z=w.getAttribute("data-root-dir")||"";if(!q||!G||!Z)return;let ge=w.getAttribute("data-queue-index")||"",Re=Number(ge),Vt=w.getAttribute("data-lane-id")||"";Ee={kind:G,bead_id:q,root_dir:Z,...ge!==""&&Number.isFinite(Re)?{queue_index:Re}:{},...Vt?{lane_id:Vt}:{}},R=!0,le=null,N.classList.add("is-dragging");try{d.dataTransfer?.setData("text/plain",q),d.dataTransfer&&(d.dataTransfer.effectAllowed="move")}catch{}}function Rt(d){let p=yt(d);p&&(d.preventDefault(),d.dataTransfer&&(d.dataTransfer.dropEffect="move"),p.zone.classList.add("is-drop-over"))}function Gt(d){let p=d.target;typeof p?.closest=="function"&&p.closest("[data-drop]")?.classList.remove("is-drop-over")}function Jt(){Ee=null,pt(),N.classList.remove("is-dragging"),Oe()}function vt(d){let p=yt(d),b=Ee;Ee=null,pt(),N.classList.remove("is-dragging"),!(!p||!b)&&(d.preventDefault(),Mt(b,p.target))}function rn(d){return{runner:d.runner||void 0,model:d.model||void 0,effort:d.effort||void 0,status:d.run_state==="running"?"running":d.run_state,worktree:d.root_dir}}function pn(d,p){let{item:b,root_dir:w,revision:q}=H(p),G=b?.attempt_id||"",Z=d.classList;if(Z.contains("worker-dep__remove")){ce("dep-remove",p,d.dataset.blockerId||"");return}if(Z.contains("mon2-rowops__up")||Z.contains("mon2-rowops__down")){Xt(p,Z.contains("mon2-rowops__up")?-1:1);return}if(Z.contains("mon2-rowops__remove")){se("worker-queue-remove",{bead_id:p},w,q);return}if(Z.contains("mon2-crow__detach")){Ye(p);return}if(Z.contains("mon-dep__btn")){Ve(p);return}if(Z.contains("worker-dep__open")){Ve(p,d.getAttribute("data-dep-direction")==="successor"?"successor":"predecessor");return}if(Z.contains("mon-lane__chip")){let ge=d.getAttribute("data-lane-id")||"";N.querySelector(`.mon2-clane[data-lane-id="${ge}"]`)?.scrollIntoView({block:"nearest"});return}if(Z.contains("mon-deppanel__unlink")){ve("dep-remove",d.getAttribute("data-dep-a")||"",d.getAttribute("data-dep-b")||"");return}if(Z.contains("mon-deppanel__seg")){M&&(M={...M,direction:d.getAttribute("data-dep-direction")==="successor"?"successor":"predecessor"},x());return}if(Z.contains("mon-deppanel__cand")){let ge=d.getAttribute("data-dep-cand")||"";M&&ge&&(M.direction==="predecessor"?ve("dep-add",M.bead_id,ge):ve("dep-add",ge,M.bead_id));return}if(Z.contains("mon-overlap__chip")){let ge=d.getAttribute("data-overlap-id")||"";U=!!U&&U.bead_id===p&&U.counterpart_id===ge?null:{bead_id:p,counterpart_id:ge},x();return}if(Z.contains("mon-overlap__place")){Y(p,d.getAttribute("data-counterpart-id")||"");return}if(Z.contains("worker-card__place")){le=le===p?null:p,x();return}if(Z.contains("worker-card__place-cancel")){le=null,x();return}if(Z.contains("worker-card__place-lane")){let ge=d.getAttribute("data-lane")||"parallel";le=null,Ht(p,ge);return}if(Z.contains("rtile__session")){Q=G,G&&b&&_e.open({attempt_id:G,root_dir:w,meta:rn(b)}),x();return}if(Z.contains("rtile__pause")){$e("worker-attempt-pause",{attempt_id:G},w);return}if(Z.contains("rtile__resume")){Dr().then(ge=>{if(ge!==null)return V("worker-attempt-resume",{attempt_id:G,...ge!==""?{instructions:ge}:{}},w,q)});return}if(Z.contains("rtile__dismiss")){se("worker-attempt-dismiss",{attempt_id:G},w,q);return}if(Z.contains("rtile__discard")){if(!h(xs(p,"unmerged")))return;pe({bead_id:p,...G?{attempt_id:G}:{},...d.dataset.operationId?{operation_id:d.dataset.operationId}:{}},w,q);return}if(Z.contains("worker-mini__merge")){let ge=Ae(w,p);ge?.mismatch&&ge.continuation===null?te(w,p,q,ge.mismatch):se("worker-merge-queue-add",{bead_id:p},w,q);return}if(Z.contains("worker-mini__merge-cancel")){se("worker-merge-queue-remove",{bead_id:p},w,q);return}if(Z.contains("worker-mini__discard")){let ge=d.dataset.discardMode==="merged"?"merged":"unmerged";if(!h(xs(p,ge)))return;pe({bead_id:p,...d.dataset.attemptId?{attempt_id:d.dataset.attemptId}:{},...d.dataset.operationId?{operation_id:d.dataset.operationId}:{}},w,q);return}if(Z.contains("worker-mini__revise-fix")){V("worker-revise-fix",{bead_id:p},w,q);return}Z.contains("worker-mini__revise-approve")&&se("worker-revise-approve",{bead_id:p},w,q)}function En(d){let p=R;R=!1;let b=d.target;if(!b||typeof b.closest!="function"||b.closest("dialog")||b.closest(".mon2-drawer")||b.closest("a"))return;let w=b.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(w){d.preventDefault();let Un=b.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||w.textContent?.trim()||"";Un&&I(Un);return}let q=b.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(q){d.preventDefault();let Nt=q.getAttribute("data-root-dir")||me.get(b.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||q.getAttribute("title")||"";k(Nt);return}let G=b.closest(".mon2-sec__toggle");if(G){d.preventDefault(),he(G.getAttribute("data-root-dir")||"");return}let Z=b.closest(".mon2-area__toggle");if(Z){d.preventDefault(),rt(Z.getAttribute("data-area")||"parallel");return}if(b.closest(".mon2-newlane")){d.preventDefault(),Fe("create","");return}let ge=b.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove");if(ge){d.preventDefault();let Nt=ge.getAttribute("data-lane-id")||"";Fe(ge.classList.contains("mon2-clane__confirm")?"confirm":ge.classList.contains("mon2-clane__reapply")?"reapply":"remove",Nt);return}if(b.closest(".mon-merge-all")){d.preventDefault(),be();return}let Re=b.closest(".mon-filter__spec");if(Re){d.preventDefault(),S={...S,spec:Re.getAttribute("data-spec")||"all"},Hi(S),x();return}let Vt=b.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Vt)return;let sn=Vt.getAttribute("data-bead-id")||"",Gr=b.closest("button");if(Gr){d.preventDefault(),pn(Gr,sn);return}sn&&!p&&(d.preventDefault(),O(sn,Vt.getAttribute("data-root-dir")||H(sn).root_dir))}function T(d){let p=d.target;if(!p||typeof p.closest!="function")return;let b=p.closest(".mon-filter__blocked");if(b){S={...S,show_blocked:b.checked},Hi(S),x();return}let w=p.closest(".mon-filter__deps");if(w){S={...S,with_deps:w.checked},Hi(S),x();return}let q=p.closest(".mon-candidate-sort");if(q){F=Ls.some(ge=>ge.value===q.value)?q.value:"repo_spec",Zb(F),x();return}let G=p.closest(".mon-running-sort");if(G){$=G.value==="repo"?"repo":"started",th($),x();return}let Z=p.closest(".mon-done-range");Z&&(y=_n(Z.value)?Z.value:an,Jb(y),x())}function L(d){let p=d.target,b=p&&typeof p.closest=="function"?q=>p.closest(q):()=>null,w=!1;U&&!b(".mon-overlap__popover, .mon-overlap__chip")&&(U=null,w=!0),M&&!b(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(M=null,w=!0),w&&x()}function Le(d){d.key!=="Escape"||!U&&!M||(U=null,M=null,x())}function _(d){let p=d.target;!p||typeof p.closest!="function"||!p.closest(".mon-deppanel__search")||!M||(M={...M,query:p.value},x())}e.addEventListener("click",En),e.addEventListener("change",T),e.addEventListener("input",_),document.addEventListener("click",L),document.addEventListener("keydown",Le),e.addEventListener("dragstart",Et),e.addEventListener("dragover",Rt),e.addEventListener("dragleave",Gt),e.addEventListener("drop",vt),e.addEventListener("dragend",Jt),s&&typeof s.subscribe=="function"&&(ee=s.subscribe(()=>{try{fe.clear(),x()}catch{}}));function v(){ye!==null&&(clearInterval(ye),ye=null)}function m(){ue!==null&&(clearTimeout(ue),ue=null)}return{load(){n("load"),x(),ye===null&&(ye=setInterval(()=>{try{x()}catch{}},nh))},pause(){v()},clear(){v(),m(),ee&&(ee(),ee=null),_e.destroy(),ke?.destroy(),ke=null,e.removeEventListener("click",En),e.removeEventListener("change",T),e.removeEventListener("input",_),document.removeEventListener("click",L),document.removeEventListener("keydown",Le),e.removeEventListener("dragstart",Et),e.removeEventListener("dragover",Rt),e.removeEventListener("dragleave",Gt),e.removeEventListener("drop",vt),e.removeEventListener("dragend",Jt),e.replaceChildren()}}}function op(e,t,n){let r=xt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(y){return $=>{$.preventDefault(),r("click tab %s",y),n.gotoView(y)}}function c(){let y=t.getState();return y.view==="worker"||y.view==="monitor"?y.view:"board"}function u(){let y=c();return l`
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
    `}function f(){let y=c();return l`
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
    `}function h(){s&&Ge(u(),s),o&&Ge(f(),o)}return h(),a=t.subscribe(()=>h()),{destroy(){a&&(a(),a=null),s&&Ge(l``,s),o&&Ge(l``,o)}}}var ap=["bug","feature","task","epic","chore"];function ip(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var lp=["Critical","High","Medium","Low","Backlog"];function cp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),c=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),f=n.querySelector("#btn-cancel"),h=n.querySelector("#btn-create"),y=n.querySelector(".new-issue__close");function $(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let W of ap){let E=document.createElement("option");E.value=W,E.textContent=ip(W),o.appendChild(E)}a.replaceChildren();for(let W=0;W<=4;W+=1){let E=document.createElement("option");E.value=String(W);let N=lp[W]||"Medium";E.textContent=`${W} \u2013 ${N}`,a.appendChild(E)}}$();function S(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function F(D){s.disabled=D,o.disabled=D,a.disabled=D,i.disabled=D,c.disabled=D,f.disabled=D,h.disabled=D,h.textContent=D?"Creating\u2026":"Create"}function B(){u.textContent=""}function Q(D){u.textContent=D}function le(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let W=window.localStorage.getItem("beads-ui.new.priority");W&&/^\d$/.test(W)?a.value=W:a.value="2"}catch{o.value="",a.value="2"}}function U(){let D=o.value||"",W=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),W.length>0&&window.localStorage.setItem("beads-ui.new.priority",W)}async function M(){B();let D=String(s.value||"").trim();if(D.length===0){Q("Title is required"),s.focus();return}let W=Number(a.value||"2");if(!(W>=0&&W<=4)){Q("Priority must be 0..4"),a.focus();return}let E=String(o.value||""),N=String(c.value||""),ne={title:D};E.length>0&&(ne.type=E),String(W).length>0&&(ne.priority=W),N.length>0&&(ne.description=N),F(!0);try{await t("create-issue",ne)}catch{F(!1),Q("Failed to create issue");return}U(),F(!1),S()}return n.addEventListener("cancel",D=>{D.preventDefault(),S()}),y.addEventListener("click",()=>S()),f.addEventListener("click",()=>S()),n.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),M())}),r.addEventListener("submit",D=>{D.preventDefault(),M()}),{open(){r.reset(),B(),le();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){S()}}}var oh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ah(e,t){return Fa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function up(e,t,n){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=ah(r,e);return l`<button
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
  `}function dp(e,t,n){return l`
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
  `}function pp(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${oh.map(([n,r])=>l`<label class="settings-dialog__toggle">
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
  `}var ih=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function fp(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(ee=>ae(ee,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,u="",f=null;function h(){if(f)return f;let ee=a.querySelector('[data-pane="execution"]');return ee?(f=ea(ee,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:ye=>t.queueStore?.set?.(ye)}),f):null}function y(){return l`
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
    `}function $(){let ee=r.get();return l`
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
        ${ee?l`
              ${up(ee,s(),Q)}
              ${dp(ee,u,{onDraft:ye=>{u=ye},onAdd:le,onRemove:U})}
              ${pp(ee,M)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function S(ee){let ye=r.get();if(ye)try{let ke=await n("display-policy-set",{expected_revision:ye.revision,policy:ee(ye)});F(ke),ke&&ke.conflict&&ke.policy&&(ke=await n("display-policy-set",{expected_revision:ke.policy.revision,policy:ee(ke.policy)}),F(ke)),ke&&ke.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function F(ee){ee&&ee.policy&&typeof ee.policy=="object"&&r.set(ee.policy)}function B(ee){S(ee)}function Q(ee){let ye=r.get();if(!ye)return;let ke=!lh(ee,ye);B(_e=>ch(ee,_e,ke))}function le(){let ee=u.trim();ee.length!==0&&(u="",B(ye=>ye.hidden_prefixes.includes(ee)?{hidden_prefixes:ye.hidden_prefixes}:{hidden_prefixes:[...ye.hidden_prefixes,ee]}),D())}function U(ee){B(ye=>({hidden_prefixes:ye.hidden_prefixes.filter(ke=>ke!==ee)}))}function M(ee){let ye=r.get();if(!ye)return;let ke=ye.chips[ee]===!1;B(()=>({chips:{[ee]:ke}}))}function D(){Ge(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${ih.map(ee=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ee.id}
                  aria-selected=${String(i===ee.id)}
                  aria-controls=${`settings-pane-${ee.id}`}
                  @click=${()=>W(ee.id)}
                >
                  <span class="settings-dialog__glyph">${ee.glyph}</span>
                  ${ee.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${fe}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${y()} ${$()}
          </div>
        </div>
      `,a),h()}function W(ee){i=ee,D()}let E=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",E),a.addEventListener("cancel",E);let N=ee=>{ee.target===a&&fe()};a.addEventListener("click",N);let ne=null;r.subscribe&&(ne=r.subscribe(()=>{c&&D()}));let J=null;t.implPresetStore?.subscribe&&(J=t.implPresetStore.subscribe(()=>{c&&f?.render()}));function me(ee="execution"){c||(c=!0,t.onOpenChange?.(!0),i=ee,u="",D(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),h()?.load())}function fe(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:me,close:fe,sessionDraft:()=>f?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",E),a.removeEventListener("cancel",E),a.removeEventListener("click",N),ne&&(ne(),ne=null),J&&(J(),J=null),f?.destroy(),f=null,a.remove()}}}function lh(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function ch(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var uh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],_p="usage-meter-card",dh="usage-meter-layer",mp=600,ph=["token_expired","relogin_required"];function gp(e){return String(e).padStart(2,"0")}function fh(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function bp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${gp(r.getHours())}:${gp(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${uh[r.getMonth()]} ${r.getDate()} ${o}`;return`${fh(n,t)} \xB7 ${i}`}function _h(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function hp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function yp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var vp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function kp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function mh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:kp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function gh(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=mh(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?kp(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function wp(e,t){return`${e}:${t}`}function $p(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function u(){Ge(l``,e),e.hidden=!0,h()}function f(){if(c===null){let _e=e.ownerDocument;c=_e.createElement("div"),c.id=dh,c.className="usage-meter__layer",_e.body.appendChild(c)}return c}function h(){c!==null&&(Ge(l``,c),c.remove(),c=null)}function y(_e){n!==_e&&(n===null&&(document.addEventListener("mousedown",S),document.addEventListener("keydown",B),window.addEventListener("resize",F)),n=_e)}function $(){n!==null&&(n=null,document.removeEventListener("mousedown",S),document.removeEventListener("keydown",B),window.removeEventListener("resize",F))}function S(_e){let se=_e.target;se&&(e.contains(se)||c!==null&&c.contains(se))||($(),fe())}function F(){fe()}function B(_e){_e.key==="Escape"&&($(),fe())}function Q(_e){n===_e?$():y(_e),fe()}function le(){$(),fe()}async function U(_e,se){if(r.has(_e.key))return;let Ae=wp(_e.key,se);r.set(_e.key,se),a.delete(Ae),fe();let V=null;try{V=await(await fetch(_e.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:se})})).json()}catch{V=null}if(t)return;if(r.delete(_e.key),!V||V.ok!==!0){let pe=V&&typeof V.error=="string"&&V.error.length>0?V.error:"network_error";a.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${pe}`}),fe();return}let te=Array.isArray(V.warnings)?V.warnings.filter(pe=>typeof pe=="string"&&pe.length>0):[];te.length>0&&a.set(Ae,{kind:"warn",text:te.join(" \xB7 ")}),fe(),await ke()}function M(_e,se,Ae,V){let te=yp(_e.pct),$e=`resets ${bp(_e.resetsAt,V)}${se?` \xB7 ${Ae}`:""}`;return l`<span
      class="usage-meter__window ${hp(te)}"
      style=${`--progress: ${te}%`}
      title=${$e}
    >
      <span class="usage-meter__label">${_e.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${te}%</span>
    </span>`}function D(_e,se,Ae){let V=se.available&&typeof se.ageSeconds=="number"&&se.ageSeconds>mp,te=V&&typeof se.ageSeconds=="number"?`${Math.floor(se.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",pe=se.accounts.filter(he=>!he.active).length,$e=`usage-meter__group${V?" usage-meter__group--stale":""}`,be=l`<span class="usage-meter__provider"
        >${_e.label}</span
      >
      ${se.available?se.windows.map(he=>M(he,V,te,Ae)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${pe>0?l`<span class="usage-meter__badge">+${pe}</span>`:""}`;if(se.accounts.length===0)return l`<span
        class=${$e}
        aria-label=${`${_e.label} usage`}
        >${be}</span
      >`;let Ne=n===_e.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${$e}`}
      aria-label=${`${_e.label} usage`}
      aria-expanded=${Ne?"true":"false"}
      aria-controls=${_p}
      @click=${()=>Q(_e.key)}
    >
      ${be}
    </button>`}function W(_e,se){return l`<span class="usage-meter" aria-label="Usage">
      ${_e.map(Ae=>D(Ae.provider,Ae.snapshot,se))}
    </span>`}function E(_e,se){let Ae=yp(_e.pct),V=bp(_e.resetsAt,se);return l`<span
      class="usage-meter__account-window ${hp(Ae)}"
      style=${`--progress: ${Ae}%`}
    >
      <span class="usage-meter__account-key">${_e.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ae}%</span>
      <span class="usage-meter__account-reset"
        >${V.length>0?`\u21BB ${V}`:""}</span
      >
    </span>`}function N(_e,se){return ph.includes(se)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${_e.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ne(_e,se,Ae){let V=se.status==="ok",te=typeof se.ageSeconds=="number"&&se.ageSeconds>mp,pe=a.get(wp(_e.key,se.number)),$e=r.get(_e.key),be=$e!==void 0,Ne=$e===se.number,he=["usage-meter__account"];return se.active&&he.push("usage-meter__account--active"),V||he.push("usage-meter__account--unavailable"),te&&he.push("usage-meter__account--stale"),l`<div class=${he.join(" ")}>
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
              >${_h(se.ageSeconds)}</span
            >`}
        ${se.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${be}
              @click=${()=>{U(_e,se.number)}}
            >
              ${Ne?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${V?l`<div class="usage-meter__account-windows">
            ${se.windows.map(He=>E(He,Ae))}
          </div>`:l`<div class="usage-meter__account-status">
            ${N(_e,se.status)}
          </div>`}
      ${pe===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${pe.kind}"
          >
            ${pe.text}
          </div>`}
    </div>`}function J(_e,se,Ae){let V=se.accounts.filter(te=>te.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${_e.label} · 활성 ${V} / 전체
        ${se.accounts.length}
      </h2>
      ${se.accounts.map(te=>ne(_e,te,Ae))}
    </section>`}function me(_e,se){return l`<div
      class="usage-meter__card"
      id=${_p}
      role="dialog"
      aria-label=${`${_e.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${J(_e.provider,_e.snapshot,se)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function fe(){let _e=[];for(let V of vp){let te=o.get(V.key);te&&_e.push({provider:V,snapshot:te})}if(_e.length===0){$(),u();return}let se=_e.find(V=>V.provider.key===n&&V.snapshot.accounts.length>0);se||$();let Ae=Date.now();Ge(W(_e,Ae),e),e.hidden=!1,se?ee(se,Ae):h()}function ee(_e,se){let Ae=f(),V=e.getBoundingClientRect(),te=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${V.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,te-V.right)}px`),Ge(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${le}
        ></div>
        ${me(_e,se)}`,Ae)}async function ye(_e){try{let se=await fetch(_e.endpoint);return se.ok?gh(await se.json()):null}catch{return null}}async function ke(){i+=1;let _e=i,se=await Promise.all(vp.map(async Ae=>({provider:Ae,snapshot:await ye(Ae)})));if(!(t||_e!==i)){for(let Ae of se)Ae.snapshot?o.set(Ae.provider.key,Ae.snapshot):o.delete(Ae.provider.key);fe()}}return u(),ke(),s=setInterval(()=>{ke()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),$(),u()}}}function xp(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var bh="worker-ineligible";function Gi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ap(e){return Gi(e).includes(bh)}var hh="worker-serial";function Vi(e){return Gi(e).includes(hh)}function Ki(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var yh=new Set(["done","failed","orphaned","stopped","discarded"]),vh={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},wh={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},kh={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Yi(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:kh[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Sp(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,u=new Map,f=!1,h=null,y=null,$=null,S=new Set,F=!1,B=0,Q=null,le=new Set;function U(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function M(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function D(){return o&&o()||""}async function W(){if(!s)return;let A=++B;F=!0,$=null,S.clear(),We();try{let O=await s("worker-parallel-analysis-targets",{root_dir:D()});if(A!==B||!Te)return;let k=Array.isArray(O?.qualified)?O.qualified:[],I=Array.isArray(O?.excluded)?O.excluded:[];$={qualified:k,excluded:I};for(let H of k)H&&typeof H.id=="string"&&S.add(H.id)}catch{A===B&&Te&&($={qualified:[],excluded:[]},ae("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{A===B&&(F=!1,Te&&We())}}function E(A){return Array.isArray(A.runs)?A.runs:[]}function N(){let A=U(),O=new Set;for(let k of Object.values(A.attempts||{})){let I=k;I&&typeof I.bead_id=="string"&&!yh.has(I.status)&&O.add(I.bead_id)}for(let k of Array.isArray(A.pr_wait)?A.pr_wait:[])k&&typeof k.bead_id=="string"&&O.add(k.bead_id);for(let k of Object.values(A.discard_operations||{})){let I=k;I&&I.phase!=="done"&&typeof I.bead_id=="string"&&O.add(I.bead_id)}return O}function ne(A){return A.filter(O=>J(O)===null)}function J(A){let O=U();for(let k of Array.isArray(O.serial_lanes)?O.serial_lanes:[])if(Array.isArray(k?.entries)&&k.entries.some(I=>I.bead_id===A))return k.id;return(Array.isArray(O.queue)?O.queue:[]).some(k=>k.bead_id===A)?"parallel":null}function me(A,O){let k=c.get(A);return k||[...O.order]}function fe(A){if(A.length<2)return!1;let O=J(A[0]);if(!O||O==="parallel")return!1;let k=U(),I=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).find(de=>de.id===O)?.entries.map(de=>de.bead_id);if(!Array.isArray(I))return!1;let H=A.map(de=>I.indexOf(de));return H.every(de=>de>=0)&&H.every((de,ce)=>ce===0||de>H[ce-1])}function ee(){let A=U(),O=Array.isArray(A.serial_lanes)?A.serial_lanes:[],k=O.find(I=>Array.isArray(I.entries)&&I.entries.length===0);return k?k.id:O[0]?.id||"s1"}function ye(A){let O=U().bead_titles||{};return typeof O[A]=="string"?O[A]:A}async function ke(A,O){if(!s||f)return null;f=!0,We();try{return await s(A,O)}finally{f=!1,We()}}async function _e(A){r?.setPending?.(!0);try{let O=await ke("worker-parallel-analysis-start",{force:A,target_ids:Array.from(S)});O&&O.applied===!1&&O.reason&&(O.reason==="target_not_qualified"&&Array.isArray(O.detail)?ae(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${O.detail.join(", ")}`,"error",3200):ae(`\uBD84\uC11D \uC2E4\uD328: ${O.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function se(){let A=M().job;!s||!A||await s("worker-parallel-analysis-cancel",{job_id:A.job_id})}async function Ae(A){if(!(!s||le.has(A))){le.add(A),We();try{let O=await s("worker-parallel-analysis-prompt",{root_dir:D(),run_id:A});if(!Te)return;if(O?.ok===!0&&typeof O.prompt=="string"){Q={run_id:A,prompt:O.prompt};return}ae(O?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{le.delete(A),We()}}}function V(){Q=null,We()}async function te(){if(!Q)return;let A=await cn(Q.prompt);ae(A?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",A?"success":"error",1400)}function pe(A,O){a&&a(A,Yi(O))}function $e(){return U().runner_catalog}function be(A){return Object.keys($e()?.runners?.[A]?.models||{})}function Ne(A){let O=be(A),k=$e()?.runners?.[A]?.default_model;return typeof k=="string"&&O.includes(k)?k:O[0]||""}function he(){let A=M().settings,O=h||A.runner||"claude",k=be(O),I=h?Ne(O):A.model||k[0]||"",H=Ki($e(),O,I),de=A.effort||"",ce=H.includes(de)?de:H[0]||"";return{runner:O,model:I,effort:ce,models:k,efforts:H}}async function He(A){let O=M().settings,k=await ke("worker-parallel-analysis-settings-update",{expected_revision:O.revision,runner:A.runner,model:A.model,effort:A.effort});(!k||k.applied!==!0)&&(h=null,We(),k&&k.reason&&ae(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${k.reason}`,"error",2800))}function rt(A){h=A,We();let O=he();He({runner:A,model:O.model,effort:O.effort})}function ut(A){let O=he(),k=Ki($e(),O.runner,A);He({runner:O.runner,model:A,effort:k.includes(O.effort)?O.effort:k[0]||""})}function C(A){let O=he();He({runner:O.runner,model:O.model,effort:A})}async function re(A,O){if(!s||f)return;let k=me(A,O),I=M();if(k.length<2||!I.last_good){ae("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let H=u.get(A)||ee(),de=()=>({snapshot_digest:I.last_good.identity_digest,group_index:A,lane:H,ordered_bead_ids:k,expected_revision:U().revision});f=!0,We();try{let ce=await s("worker-parallel-analysis-submit",de());ce&&ce.queue&&n&&n.set(ce.queue),ce&&ce.applied!==!0&&ce.conflict===!0&&(ce=await s("worker-parallel-analysis-submit",de()),ce&&ce.queue&&n&&n.set(ce.queue)),ce&&ce.applied===!0?(c.delete(A),ae(`\uC9C1\uB82C \uB808\uC778 ${H}\uC5D0 ${k.length}\uAC1C \uBC30\uCE58`,"success")):ae(`\uC81C\uCD9C \uAC70\uBD80: ${ce?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{f=!1,We()}}function we(A,O,k){c.set(A,me(A,O).filter(I=>I!==k)),We()}function De(A){c.delete(A),We()}function Pe(A,O,k,I){let H=[...me(A,O)],de=H.indexOf(k),ce=de+I;de<0||ce<0||ce>=H.length||(H.splice(ce,0,...H.splice(de,1)),c.set(A,H),We())}function z(){let A=M().settings,O=Object.keys($e()?.runners||{}),k=he();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${I=>rt(I.target.value)}
        >
          ${O.map(I=>l`<option
                value=${I}
                ?selected=${k.runner===I}
              >
                ${I}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${I=>ut(I.target.value)}
        >
          ${k.models.map(I=>l`<option
                value=${I}
                ?selected=${k.model===I}
              >
                ${I}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${I=>C(I.target.value)}
        >
          ${k.efforts.map(I=>l`<option
                value=${I}
                ?selected=${k.effort===I}
              >
                ${I}
              </option>`)}
        </select>
      </label>
      ${Y(A)}
    </div>`}function Y(A){return!Ke(A)||Se(A)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:A.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${A.runner}/${A.model} · effort
        ${A.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:A.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function Se(A){return A.is_default===!0&&A.compatible===!1}function Ke(A){return!!(A.runner&&A.model&&A.effort)}function Ue(A){return Ke(A)&&A.compatible!==!1}function Ie(A){let O=Math.max(0,Math.floor(A/1e3)),k=Math.floor(O/60),I=O%60;return`${k}:${String(I).padStart(2,"0")}`}function ze(A){let O=A.job;if(O){let k=typeof O.started_at=="number"?O.started_at:0,I=`${O.runner||"?"}/${O.model||"?"}`,H=k?` \xB7 \uACBD\uACFC ${Ie(Date.now()-k)}`:"",de=typeof O.session_id=="string"?O.session_id:"",ce=E(A).find(ve=>ve.run_id===O.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${I} · effort ${O.effort||"?"}${H}</span
        >
        ${de?l`<code class="pa-session-id" title=${de}
              >${de.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>pe(O.job_id,ce||O)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${ce?.prompt_saved!==!0||le.has(O.job_id)}
          @click=${()=>{Ae(O.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return qe()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function et(A){let O=ze(A);return O===""?"":l`<div class="pa__strip">${O}</div>`}function qe(){return r?.isPending?.()===!0}function je(A){let O=!!A.job,k=Ue(A.settings),I=$!==null&&S.size===0,H=O||f||qe()||F;return l`<div class="pa-meta">
      ${A.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(A.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!k||H||I}
        @click=${()=>{_e(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!k||H||I}
        @click=${()=>{_e(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!O}
        @click=${()=>{se()}}
      >
        취소
      </button>
    </div>`}function Ze(A){return typeof A=="string"&&A.length>0?A:"\uBBF8\uBC30\uCE58"}function Xe(A,O){O?S.add(A):S.delete(A),We()}function bt(A){let O=Array.isArray(A.scope)?A.scope:[],k=Array.isArray(A.overlaps)?A.overlaps:[];return O.length===0&&k.length===0?l``:l`<span class="pa-target__signals">
      ${O.length>0?l`<details class="pa-target__scope" title=${O.join(`
`)}>
            <summary>scope ${O.length}</summary>
            <ul>
              ${O.map(I=>l`<li><code>${I}</code></li>`)}
            </ul>
          </details>`:""}
      ${k.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${k.join(", ")}`}
            >겹침 ${k.join(", ")}</span
          >`:""}
    </span>`}function ot(){let A=$?.qualified||[],O=$?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${F?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${A.length} \xB7 \uC81C\uC678 ${O.length}`}</span
        >
      </header>
      ${$&&A.length>0?l`<ul class="pa-targets__list">
            ${A.map(k=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${k.id}
                      .checked=${S.has(k.id)}
                      @change=${I=>Xe(k.id,I.target.checked)}
                    />
                    <span class="pa-target__title">${k.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${bt(k)}
                    <span class="pa-target__route">${k.route}</span>
                    <span class="pa-target__lane"
                      >${Ze(k.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:$&&A.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${$&&O.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${O.length}</summary>
            <ul class="pa-targets__list">
              ${O.map(k=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${k.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${vh[k.reason]||k.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${Ze(k.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function _t(A){let O=typeof A.session_id=="string"&&A.session_id.length>0,k=O?A.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${A.outcome}"
        >${wh[A.outcome]||A.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(A.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${A.runner||"?"} / ${A.model||"?"} / ${A.effort||"?"}</span
      >
      ${O?l`<code class="pa-session-id" title=${k}
            >${k.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${A.outcome==="failure"&&A.reason?l`<span class="pa-run-row__reason">${A.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>pe(A.run_id,A)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${A.prompt_saved!==!0||le.has(A.run_id)}
          @click=${()=>{Ae(A.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function St(A){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${A.length>0?l`<ul class="pa-runs__list">
            ${A.map(O=>_t(O))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function mt(){return Q?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${V}></div>
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
              @click=${V}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Q.prompt}</pre
        >
      </section>
    </div>`:""}function dt(A,O){let k=me(A,O),I=N(),H=k.filter(Ce=>I.has(Ce)),de=ne(k),ce=fe(k),ve=Array.isArray(U().serial_lanes)?U().serial_lanes:[],Qe=u.get(A)||ee(),Ve=O.eligible!==!0||k.length<2||H.length>0||de.length>0||ce||f;return l`<section class="pa-group" data-group-index=${String(A)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${O.confidence}</span>
        ${O.categories.map(Ce=>l`<span class="pa-group__category">${Ce}</span>`)}
        ${ce?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${O.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${de.length>0?l`<span class="pa-group__stale"
              >stale — ${de.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${O.reason}</p>
      <ol class="pa-group__members">
        ${k.map((Ce,lt)=>l`<li class="pa-member" data-bead-id=${Ce}>
              <span class="pa-member__seq">${lt+1}</span>
              <span class="pa-member__title">${ye(Ce)}</span>
              ${I.has(Ce)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ce}
                ?disabled=${lt===0}
                aria-label=${`${Ce} \uC704\uB85C`}
                @click=${()=>Pe(A,O,Ce,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ce}
                ?disabled=${lt===k.length-1}
                aria-label=${`${Ce} \uC544\uB798\uB85C`}
                @click=${()=>Pe(A,O,Ce,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ce}
                aria-label=${`${Ce} \uC81C\uC678`}
                @click=${()=>we(A,O,Ce)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${O.evidence.map(Ce=>l`<li class="pa-evidence">
              <code>${Ce.path}</code>
              <span class="pa-evidence__locator">${Ce.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>De(A)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ce=>{u.set(A,Ce.target.value),We()}}
          >
            ${ve.map((Ce,lt)=>l`<option
                  value=${Ce.id}
                  ?selected=${Qe===Ce.id}
                >
                  직렬 ${lt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Ve}
          @click=${()=>{re(A,O)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Tt(A){let O=Array.isArray(A.issues)?A.issues:[],k=O.filter(H=>H.verdict==="parallel_ok").length,I=O.filter(H=>H.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${k}</span>
      <span>uncertain ${I}</span>
    </div>`}function at(){let A=Te&&!!M().job;if(A&&y===null){y=setInterval(()=>We(),1e3);return}!A&&y!==null&&(clearInterval(y),y=null)}function We(){let A=M();h&&A.settings.runner===h&&(h=null);let O=A.last_good?.result;at(),Ge(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${xe}
            >
              ×
            </button>
          </header>
          ${et(A)}
          <div class="pa__body">
            ${z()} ${je(A)} ${ot()}
            ${O?l`${O.groups.map((k,I)=>dt(I,k))}
                ${O.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Tt(O)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${St(E(A))}
          </div>
        </div>
        ${mt()}
      `,i)}let Te=!1,P=()=>{Te=!1,Q=null,B+=1,at()},X=A=>{A.target===A.currentTarget&&xe()};i.addEventListener("close",P),i.addEventListener("cancel",P),i.addEventListener("click",X);let ie=null;n&&n.subscribe&&(ie=n.subscribe(()=>{Te&&We()}));let x=null;r&&r.subscribe&&(x=r.subscribe(()=>{Te&&We()}));function K(){Te||(Te=!0,We(),W(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function xe(){Te&&(Te=!1,Q=null,B+=1,at(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:K,close:xe,destroy(){Te=!1,y!==null&&(clearInterval(y),y=null),i.removeEventListener("close",P),i.removeEventListener("cancel",P),i.removeEventListener("click",X),ie&&(ie(),ie=null),x&&(x(),x=null),i.remove()}}}function Ep(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let c=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(c.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:c})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let c=aa(s[a].scope,s[i].scope);if(c.length===0)continue;let u=s[a].member,f=s[i].member;n.get(u.id)?.overlaps.push({id:f.id,title:f.title,location_label:f.location_label,prefixes:c}),n.get(f.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:c})}return n}function Zi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",c=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&c&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&c&&a===null){let u=$h(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!c?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function $h(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Tp=new Set(["sh","bash","zsh","dash","ksh"]),Cp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Rp(e){let t=e.split("/");return t[t.length-1]||""}function xh(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Rp(n[0]);if(r!=="env")return Tp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Tp.has(Rp(s))}function Ah(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Sh(e){let t=[],n=0;Cp.lastIndex=0;for(let r of e.matchAll(Cp)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Ah(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Eh(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Op(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",c=0,u=null,f=!1;function h(D,W){return W?Sh(D).map(E=>E.kind==="plain"?E.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${E.kind}"
            >${E.text}</span
          >`):D}function y(){if(!s)return l``;let D=o==="ready"&&xh(a),W=o==="ready"?a.split(`
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
              @click=${()=>{S()}}
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
                  ${W.map((E,N)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${N+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${h(E,D)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function $(){Ge(y(),r)}async function S(){if(o!=="ready")return;let D=await cn(a);ae(D?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",D?"success":"error")}function F(D){D.key==="Escape"&&s&&(D.preventDefault(),U())}function B(){f||(document.addEventListener("keydown",F),f=!0)}function Q(){f&&(document.removeEventListener("keydown",F),f=!1)}async function le(D,W=null){let E=++c;B(),s={...D},u=W||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",$(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ne=t?t():"";if(!ne){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",$();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",$();return}let J="/api/repo-ops-script?workspace="+encodeURIComponent(ne)+"&lane="+encodeURIComponent(D.lane)+"&base_sha="+encodeURIComponent(D.base_sha);try{let me=await n(J),fe=await me.json().catch(()=>({}));if(E!==c)return;if((t?t():"")!==ne){U();return}if(!me.ok||!fe||fe.ok!==!0){o="error",i=Eh(fe&&typeof fe.error=="string"?fe.error:""),$();return}s={lane:fe.lane,base_sha:fe.base_sha,path:fe.path,base_ref:fe.base_ref},a=String(fe.content),o="ready",$()}catch{if(E!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",$()}}function U(){c+=1,Q(),s=null,a="",$();let D=u;u=null,D?.isConnected&&D.focus()}function M(){U(),r.remove()}return{open:le,close:U,destroy:M}}function Lp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let E=o();return typeof E.revision=="number"?E.revision:0}function i(E){t&&E&&E.queue&&typeof E.queue=="object"&&t.set(E.queue)}function c(){let E=o().workspace_info;return E&&typeof E=="object"?E:{}}function u(E,N){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${E}"
      >${N}</span
    >`}function f(E){if(typeof E!="number"||!Number.isFinite(E))return"";let N=E/6e4;return Number.isInteger(N)?`timeout ${N}\uBD84`:`timeout ${Math.round(E/1e3)}\uCD08`}function h(E){let N=f(E);return N?u("config",N):""}function y(E,N,ne){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${ne.script}
      @click=${J=>{s&&s({lane:E,base_sha:N.base_sha,path:ne.script,base_ref:N.base_ref},J.currentTarget)}}
    ></button>`}function $(){let E=o().repo_ops_opt_out;return{verify:E?.verify===!0,deploy:E?.deploy===!0}}function S(E,N){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!N}
        @change=${ne=>{le(E,!ne.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function F(E){let N=typeof E.base_sha=="string"?E.base_sha:"",ne=`${E.source_path||"repo-ops/config.toml"} @ ${E.base_ref||"?"}${N?`@${N.slice(0,7)}`:""}`,J=$(),me=!!E.verify&&J.verify,fe=!!E.deploy&&J.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${ne}</span>
      </p>
      <div
        class="worker-repo-ops__lane${me?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${E.verify?l`${y("verify",E,E.verify)}
              ${h(E.verify.timeout_ms)}
              ${me?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${me?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":E.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${E.verify?S("verify",J.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${fe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${E.deploy?l`${y("deploy",E,E.deploy)}
              ${h(E.deploy.timeout_ms)}
              ${fe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${fe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":E.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${E.deploy?S("deploy",J.deploy):""}
      </div>
    </section>`}function B(E){let N=E.repo_ops&&typeof E.repo_ops=="object"?E.repo_ops:null;return N&&(N.status==="resolved"||N.status==="absent")?F(N):N&&(N.status==="pending"||N.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${N.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${N.error_code?l` — <code>${N.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function Q(E){if(!n)return;let N=await n("worker-auto-repair-toggle",{on:E,expected_revision:a()});if(i(N),N&&N.conflict){let ne=await n("worker-auto-repair-toggle",{on:E,expected_revision:a()});i(ne)}r()}async function le(E,N){if(!n)return;let ne=await n("worker-repo-ops-opt-out-toggle",{kind:E,opted_out:N,expected_revision:a()});if(i(ne),ne&&ne.conflict){let J=await n("worker-repo-ops-opt-out-toggle",{kind:E,opted_out:N,expected_revision:a()});i(J)}r()}let U={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function M(E,N,ne){return l`<div class="worker-repo-ops__policy-group" data-policy=${ne}>
      <div class="worker-repo-ops__policy-label">${E}</div>
      <ul class="worker-repo-ops__policy-list">
        ${N.map(J=>l`<li data-token=${J}>
              ${U[J]||J}
            </li>`)}
      </ul>
    </div>`}function D(E){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${E.map(N=>{let ne=[U[N.trigger]||N.trigger];return Number.isInteger(N.attempts_per_operation_attempt)?ne.push(`operation\uB2F9 ${N.attempts_per_operation_attempt}\uD68C`):Number.isInteger(N.attempts)?ne.push(`${U[N.budget]||N.budget} ${N.attempts}\uD68C`):Number.isInteger(N.sessions_per_user_action)&&ne.push(`${N.sessions_per_user_action}\uD68C`,U[N.user_actions]||N.user_actions),N.applies_when&&ne.push(U[N.applies_when]||N.applies_when),l`<li data-token=${N.id}>
            <strong>${U[N.id]||N.id}</strong>
            <span>${ne.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function W(){let E=o(),N=E.auto_repair!==!1,ne=E.repo_operation_policy&&typeof E.repo_operation_policy=="object"?E.repo_operation_policy:null,J=Array.isArray(E.repo_operations)?E.repo_operations:[],me=J.find(ke=>ke.state==="repairing"),fe=J.filter(ke=>ke.state==="failed"||ke.state==="repairing"),ee=fe.length?Math.min(...fe.map(ke=>typeof ke.repair?.remaining=="number"?ke.repair.remaining:0)):ne?.auto_repair?.resolution_ladder?.find(ke=>ke.id==="auto_repair_session")?.attempts??1,ye=Array.isArray(ne?.auto_repair?.resolution_ladder)?ne.auto_repair.resolution_ladder:[];return l`<section
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
          .checked=${N}
          @change=${ke=>{Q(ke.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${N?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ee}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${me?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${me.repair?.owner_bead||me.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
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
                ${ye.length} · 금지
                ${(ne.never_automatic||[]).length}</span
              >
            </summary>
            ${M("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",ne.worker_automatic||[],"worker-automatic")}
            ${ne.supported===!1||ne.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${ne.schema_version})`}
                </div>`:D(ye)}
            ${M("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",ne.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${B(c())} ${W()}
      </details>`}}}var Mp=20,Th=5,Ch=new Set(["failed","repairing","running","queued","retry_pending"]),Ip={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Pp={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Rh(e,t,n=Mp){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Oh(e){if(e.type==="cleanup")return!0;let t=e.operation;return Ch.has(t.state)&&!t.dismissed&&!t.superseded_by}function Lh(e,t,n={}){let r=Rh(e,t,1/0),s=n.expanded===!0?Mp:Th,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||Oh(i));return{visible:a,hidden:r.length-a.length}}function Dp(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Ih(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Np(e){let t=e.filter(n=>n.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>l`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function qp(e,t="",n=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function Ph(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Pp,r)?Pp[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Dh(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?jt(e.at):""}
      >${Go(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Dp(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Ip,t.kind)?Ip[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Wo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${$s(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Dp(e)}"
          >${Ih(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?qp(pd(t.failure_kind,r)):""}
      ${Ph(t)}
      ${Np([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Wo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Mh(e){let t=e.cleanup,n=hr(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?jt(e.at):""}
      >${Go(e.at)||"\u2014"}</span
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
        ${Md(t.step).map(r=>l`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${qp(Xo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Np([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Nh(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Mh(r):Dh(r))}
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
  </section>`}function Fp(e,t={}){let n=null;function r(){if(n===null){Ge(l``,e);return}let a=Lh(n.operations,n.cleanup_failures,{expanded:n.expanded});Ge(Nh({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var qh=xt("views:worker"),Fh="tab:worker:ready",jh="tab:worker:blocked",Bh="tab:worker:in-progress",Uh="tab:worker:resolved",Wh="tab:worker:closed",da=1,jp=5;function Bp(e){return Co(e).path.length>0}var zh=new Set(["quick_fix","spec_backed","full_plan"]);function Up(e){return typeof e=="string"&&zh.has(e)}var Gp="beads-ui.worker.candidate-filter",Qi={show_blocked:!1,spec:"all"};function Hh(){try{let e=window.localStorage.getItem(Gp);if(!e)return{...Qi};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Qi};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Qi}}}function Gh(e){try{window.localStorage.setItem(Gp,JSON.stringify(e))}catch{}}function Vh(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=n(i),u=r(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Kh=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Vp="bdui.worker.candidate_sort",Yh=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],pa="spec";function Zh(){try{let e=window.localStorage.getItem(Vp);return e==="board"||e==="created"||e==="spec"?e:pa}catch{return pa}}function Qh(e){try{window.localStorage.setItem(Vp,e)}catch{}}var Kp="bdui.worker.done-range";function Xh(){try{let e=window.localStorage.getItem(Kp);return _n(e)?e:an}catch{return an}}function Jh(e){try{window.localStorage.setItem(Kp,e)}catch{}}var ey="(max-width: 640px)",Yp="beads-ui.worker.lane-collapsed",Is={queue:!0,done:!0};function ty(){try{let e=window.localStorage.getItem(Yp);if(!e)return{...Is};let t=JSON.parse(e);return!t||typeof t!="object"?{...Is}:{queue:typeof t.queue=="boolean"?t.queue:Is.queue,done:typeof t.done=="boolean"?t.done:Is.done}}catch{return{...Is}}}function ny(e){try{window.localStorage.setItem(Yp,JSON.stringify(e))}catch{}}function Wp(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function ry(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(pr):(r.sort(Js(n)),t==="board"?r:[...r.filter(Bp),...r.filter(s=>!Bp(s))])}function sy(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function oy(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function zp(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function ay(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function iy(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function ly(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function cy(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function uy(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Xi(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var dy=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),py=new Set(["waiting_metadata","reviewing","retrying"]);function fy(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?jt(r.next_at):"",c=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",c?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${c}`:""].filter(Boolean),live:!0}}default:return null}}function _y(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function my(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let c=_y(e.terminal_reason);c&&i.push(`\uC6D0 \uC0AC\uC720: ${c}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!dy.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Hp(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function gy(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Hp(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Hp(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=ay(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${zp(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${zp(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function by(e,t,n,r,s=null,o=null,a=null,i=!1,c=null,u=!0,f=null,h=null,y=null,$={},S=!1,F=!1,B={}){let Q=!!c&&c.position>0,le=!!c?.continuation_action&&c.continuation_action.continuation===null,U=!!c&&c.active===!0,M=c&&c.failure||null,D=ly(c?c.waiting:null,y),W=n[e]||null,E=W&&W.gate?W.gate:null,N=W&&W.pr?W.pr:null,ne=cy(c?c.resolution:null),J=uy(c?c.head_review:null),me=c&&c.head_review||null,fe=fy(y,me),ee=my(y,fe),ye=c&&c.authority||null,ke=!!me&&["pending","reviewing","revising"].includes(me.state),_e=!!y&&typeof y=="object"&&py.has(y.phase),se=Q&&!U&&(me?.state==="failed"||!ye||_e||ye.source==="automatic"&&!F),Ae=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ne?ne.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":D,V=!!E&&E.base_badge==="\uCDA9\uB3CC",te=!!E&&E.enabled===!0,pe=Rs({bead_id:e,merge_sha:B.merge_sha,cleanup_cursor:B.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:B.repo_operations}),$e=ca(pe),be=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!E&&E.tier==="merged",Ne=i&&!!r&&!!E&&E.tier==="merged",he=se&&(te||V||E?.reason==="base_behind"||E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"||be||Ne),He=i&&V&&u===!1,rt=An($,e,{external:i,merge_active:U||pe?.step==="merge",merge_queued:Q,conflict_active:!!a,cleanup_active:$e,merged:!!r||E?.tier==="merged"}),ut=!!rt.operation,C=!be&&!!r&&r.step==="repo_operations",re=gy({continuation_required:le,merge_step:pe,conflict_badge:Ae,conflict_live:ne?.live===!0||a==="running",head_review:me&&J?{...J,state:me.state,failure_reason:me.failure_reason}:null,auto_resolution:fe,recovery:ee,cleanup_failed:r,cleanup_label:r?hr(r.step):null,base_exception:h,conflicting:V,gate:E,receipt_check:W&&W.receipt_check?W.receipt_check:null,queue_failure:M,auto_skip:f,queued:Q,queue_active:U,queue_position:c?c.position:0,activity:Ae?null:o&&o.activity||null}),we=re?.live===!0&&re.title?l`<span title=${re.title}>${re.label}</span>`:re?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:r&&pe?.active!==!0?la(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:S,external:i,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",completion_badge:re?.live!==!0&&re?.title?re.label:null,completion_title:re?.title||"",completion_repair_pr_url:ee?ee.repair_pr_url:"",completion_repair_pr_number:ee?ee.repair_pr_number:null,badges:we?[we]:[],live_badge:re?.live===!0?we:null,usage:s,alert:re?.alert===!0,merge_action:E?.tier==="merged"&&!be&&!Ne||C?!1:!Q||le||se,timeline_action:C,cancel_action:Q&&!le,cancel_enabled:(!U||ke)&&!(ee&&ee.lock_actions),cancel_title:ee&&ee.lock_actions?`${ee.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:U&&!ke?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ke?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:rt,discard_action:rt.action,merge_step:pe,discard_enabled:rt.enabled,discard_title:rt.title,merge_enabled:!pe&&!a&&!ut&&!h&&!(ee&&ee.lock_actions)&&!He&&!C&&(te||V||E?.reason==="base_behind"||E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"||be||Ne||he||_e&&!U),merge_label:le?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":be||Ne?"\uC815\uB9AC \uC7AC\uAC1C":V&&!pe&&!be?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":E?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":se?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ut?rt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${rt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${rt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:le?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":pe?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${pe.label}`:Ne?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":He?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":be?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":V?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":te?`\uBA38\uC9C0 (${E.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:E&&E.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${E&&E.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ji(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,openDoc:f,doneRange:h,onDoneRangeChange:y}=t,$=r?to(r,i):null,S=oo({transport:n,uiOrderStore:i}),F=null,B=[],Q=Hh(),le=null,U=null,M={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},D=Zh(),W=_n(h)?h:Xh(),E=new Map;function N(){let _=Gn.find(v=>v.value===W);return _?_.label:"\uC624\uB298"}let ne=ty(),J=!1,me=new Set,fe=new Set,ee=new Set,ye=new Set,ke=new Set,_e={},se=null,Ae=0,V=null,te=[];function pe(_){return se===_?_e:{}}async function $e(){if(!n)return;let _=u?.()||"";if(se===_||V&&V.key===_&&V.generation===Ae)return;let v=++Ae;V={key:_,generation:v};let m=null;try{m=await Promise.resolve(n("get-session-defaults",{}))}catch(d){if(v!==Ae)return;V=null,qh("get-session-defaults failed: %o",d),Fe();return}v===Ae&&(_e=m&&typeof m.values=="object"&&m.values!==null?{...m.values}:{},se=_,V=null,Fe())}function be(){se=null,Ae+=1,$e()}let Ne=document.createElement("div");Ne.className="worker-console";let he=document.createElement("div");he.className="worker-top";let He=document.createElement("div");He.className="worker-drawer-overlay",He.hidden=!0;let rt=document.createElement("div");rt.className="worker-drawer-overlay__backdrop";let ut=document.createElement("div");ut.className="worker-drawer-host";let C=document.createElement("div");C.className="worker-drawer-host",C.hidden=!0,He.append(rt,ut,C);let re=document.createElement("div");re.className="worker-lanes-host",Ne.append(he,He,re),e.appendChild(Ne);let we=null,De=null,Pe=Fr(ut,{transport:n,sessionLogStore:a,onClose:()=>{we=null,De=null,He.hidden=!0,Fe()}}),z=Fp(C,{onClose:()=>{C.hidden=!0,He.hidden=!0,Fe()}}),Y=Op({getWorkspacePath:u||(()=>"")}),Se=u&&u()||"",Ke=Lp({queueStore:s,transport:n,onChanged:()=>Fe(),onOpenScript:(_,v)=>{Y.open(_,v)}}),Ue=o?Sp(Ne,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(_,v)=>pn(_,v)}):null;function Ie(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:da,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ze(){let _=Ie(),v=typeof _.serial_lane_count=="number"&&Number.isInteger(_.serial_lane_count)&&_.serial_lane_count>0?Math.min(_.serial_lane_count,5):0,m=Array.isArray(_.serial_lanes)?_.serial_lanes:[],d=[];for(let b of m){if(d.length>=v)break;!b||typeof b.id!="string"||!/^s[1-5]$/.test(b.id)||!Array.isArray(b.entries)||d.push({id:b.id,label:`\uC9C1\uB82C ${b.id.slice(1)}`,count:b.entries.length})}return d.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(_.queue)?_.queue:[]).length},...d]}function et(_){if(!le||!_.some(m=>m.id===le))return null;let v=ze();return v?{bead_id:le,lanes:v}:null}function qe(){let _=Ie();return typeof _.revision=="number"?_.revision:0}function je(_){_&&_.queue&&s&&s.set(_.queue)}function Ze(){let _=Ie().queue;return Array.isArray(_)?_.length:0}async function Xe(_,v,m){if(!n)return;let d=()=>({bead_id:_,...v==="parallel"?{}:{lane:v},...m===void 0?{}:{index:m},expected_revision:qe()}),p=await n("worker-queue-place",d());je(p),p&&p.conflict&&await n("worker-queue-place",d()).then(je)}async function bt(_,v,m){if(!n)return;let d=()=>({bead_id:_,...v==="parallel"?{}:{lane:v},to_index:m,expected_revision:qe()}),p=await n("worker-queue-reorder",d());je(p),p&&p.conflict&&await n("worker-queue-reorder",d()).then(je)}async function ot(_){if(!n)return;let v=await n("worker-queue-remove",{bead_id:_,expected_revision:qe()});je(v),v&&v.conflict&&await n("worker-queue-remove",{bead_id:_,expected_revision:qe()}).then(je)}async function _t(_){if(!n||!_)return;let v=await n("worker-attempt-pause",{attempt_id:_});v&&v.paused===!1&&v.reason&&ae(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function St(_){if(!n||!_)return;let v=await Dr();if(v===null)return;let m=async(p={})=>await n("worker-attempt-resume",{attempt_id:_,expected_revision:qe(),...v!==""?{instructions:v}:{},...p}),d=await m();je(d),d&&d.conflict&&(d=await m(),je(d)),d=await Pn(d,(p,b)=>m({continuation:p,decision_token:b}),{onResult:je,refresh:()=>m()}),d&&d.resumed===!1&&!d.conflict&&d.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${d.reason}`,"error",2400)}async function mt(_){if(!n||!_)return;let v=await n("worker-attempt-dismiss",{attempt_id:_,expected_revision:qe()});je(v),v&&v.conflict&&(v=await n("worker-attempt-dismiss",{attempt_id:_,expected_revision:qe()}),je(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&ae(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function dt(_,v,m=!0){if(!n)return null;let d=n,p=await d(_,{...v,expected_revision:qe()});return je(p),p&&p.conflict&&m&&(p=await d(_,{...v,expected_revision:qe()}),je(p)),p}async function Tt(_){if(!n||!_)return;let v=Ie().merge_queue?.find(d=>d.bead_id===_)?.continuation_action;if(v?.mismatch&&v.continuation===null){await We(_,v.mismatch);return}me.add(_),Fe();let m;try{m=await dt("worker-merge-queue-add",{bead_id:_})}catch{ae("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{me.delete(_),Fe()}if(!(!m||m.applied)){if(m.conflict){ae("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ae(iy(m.reason),"error",2400)}}async function at(_){if(!(!n||!_||fe.has(_))){fe.add(_),Fe();try{let v=await n("worker-cleanup-retry",{bead_id:_,expected_revision:qe()});je(v),v&&!v.retried&&!v.conflict&&v.reason&&ae(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{fe.delete(_),Fe()}}}async function We(_,v){let m=await Pn({continuation_mismatch:v},(p,b)=>dt("worker-merge-queue-add",{bead_id:_,continuation:p,decision_token:b},!1)),d=m?.queue?.merge_queue?.find(p=>p.bead_id===_)?.continuation_action;if(m?.applied!==!0&&d?.continuation===null&&d.mismatch){await We(_,d.mismatch);return}m&&m.applied===!1&&!m.conflict&&ae("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Te(_){if(!n)return;let v=await dt("worker-merge-auto-toggle",{on:_});!v||v.conflict||ae(_?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",_?"success":"info",2400)}async function P(_){if(!n||!_)return;let v=await dt("worker-merge-queue-remove",{bead_id:_});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&ae("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function X(){await dt("worker-merge-queue-remove",{all:!0})}async function ie(_,v=null,m="unmerged",d=null){if(!n||!_)return;let p=xs(_,m);if(!(!!d||typeof globalThis.confirm!="function"||globalThis.confirm(p)))return;let w=await n("worker-discard",{bead_id:_,...v?{attempt_id:v}:{},...d?{operation_id:d}:{},expected_revision:qe()});if(je(w),w&&w.conflict&&(w=await n("worker-discard",{bead_id:_,...v?{attempt_id:v}:{},...d?{operation_id:d}:{},expected_revision:qe()}),je(w)),w&&w.discarded===!0){ae(Vo(w),"success",5e3);return}if(w&&w.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${w.reason}`,"error",2800);return}if(w&&w.accepted&&w.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(w&&w.accepted&&!w.discarded){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${w.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}w&&!w.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function x(_,v,m){if(!(!n||!v||!m||ye.has(v))){ye.add(v),Fe();try{let d=await n(_,{bead_id:v,action_id:m,expected_revision:qe()});je(d),d?.conflict?ae("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!d?.ok&&d?.reason&&ae(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(d.reason)}`,"error",2800)}finally{ye.delete(v),Fe()}}}async function K(_,v){if(!n||!v||ee.has(v))return;ee.add(v),Fe();let m;try{let d=async(p={})=>await n(_,{bead_id:v,expected_revision:qe(),...p});m=await d(),je(m),m&&m.conflict&&(m=await n(_,{bead_id:v,expected_revision:qe()}),je(m)),_==="worker-revise-fix"&&(m=await Pn(m,(p,b)=>d({continuation:p,decision_token:b}),{onResult:je,refresh:()=>d()}))}finally{ee.delete(v),Fe()}if(!(!m||m.conflict)){if(m.ok){ae(_==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ae(`\uCC98\uBD84 \uAC70\uBD80: ${m.reason||""}`,"error",3e3)}}async function xe(_){if(!n)return;let v=await n("worker-automation-toggle",{on:_,expected_revision:qe()});je(v),v&&v.conflict&&await n("worker-automation-toggle",{on:_,expected_revision:qe()}).then(je)}async function A(_){if(!n||!_)return;let v=await n("worker-repo-operation-repair",{operation_id:_});if(je(v),v&&v.ok===!1){ae(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&ae("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function O(_){if(!n||!_)return;let v=await n("worker-repo-operation-dismiss",{operation_id:_});je(v),v&&v.ok===!1&&ae(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function k(_){if(!n||!Number.isFinite(_))return;let v=Math.max(da,Math.floor(_)),m=await n("worker-queue-set-slots",{slots:v,expected_revision:qe()});je(m),m&&m.conflict&&await n("worker-queue-set-slots",{slots:v,expected_revision:qe()}).then(je)}async function I(_){if(!n||!Number.isInteger(_)||_<1||_>jp)return;let v=Ie(),m=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(_).reduce((b,w)=>b+(Array.isArray(w?.entries)?w.entries.length:0),0),d=()=>({count:_,expected_revision:qe()}),p=await n("worker-queue-set-serial-lane-count",d());je(p),p&&p.conflict&&(p=await n("worker-queue-set-serial-lane-count",d()),je(p)),p&&p.applied&&m>0&&ae(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${m}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let H="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function de(_,v){let m=Zi(_,v.id,M);return{id:v.id,title:v.title,location_label:v.location_label,prefixes:v.prefixes,action:m.kind==="note"?{kind:"note",text:m.text}:m.kind==="disabled"?{kind:"disabled",label:H,title:m.title}:{kind:"place",label:H,title:m.title}}}function ce(_,v){if(!U||U.bead_id!==_)return null;let m=U.counterpart_id,d=v.filter(p=>p.id===m);return d.length===0?null:{rows:d.map(p=>de(_,p))}}async function ve(_,v){let m=Zi(_,v,M);if(U=null,m.kind!=="ops"){Fe();return}let d=qe();for(let p of m.ops){let b=await Qe(p,d);if(b===null)break;d=b}Fe()}async function Qe(_,v){if(!n)return null;try{let m=await n("worker-queue-place",{bead_id:_.bead_id,lane:_.lane,index:_.index,expected_revision:v});if(je(m),m&&m.conflict)return ae("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!m||m.applied!==!0)return ae(m&&typeof m.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${m.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let d=m.queue?m.queue.revision:void 0;return typeof d!="number"?(ae("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):d}catch(m){return ae(m instanceof Error&&m.message?m.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function Ve(){let _=Ie(),v=$?$.selectBoardColumn(Fh,"ready"):[],m=$?$.selectBoardColumn(jh,"blocked"):[],d=$?$.selectBoardColumn(Wh,"closed"):[],p=$?$.selectBoardColumn(Bh,"in_progress"):[],b=$?$.selectBoardColumn(Uh,"resolved"):[],w=ro([...v,...m,...p,...b,...d]),q=new Map;for(let g of[...v,...m,...p])g&&g.id&&!q.has(g.id)&&q.set(g.id,g);let G={...pe(u?.()||"")};for(let g of["orchestration_model","orchestration_effort","orchestration_speed"]){let j=_[g];typeof j=="string"&&(G[g]=j)}function Z(g,j){let oe=q.get(g);if(!oe)return null;let Be=oe.metadata&&typeof oe.metadata=="object"?oe.metadata:{},nt=oe.workflow?.route,qt=Be.route,Ot=Up(nt)?nt:Up(qt)?qt:null;return tn({pin:Be,global:G,execution_defaults:_.execution_defaults??null,runner_catalog:_.runner_catalog??null,route:Ot,controller_runtime:j})}function ge(g){let j=g.runner||null,oe=Z(g.bead_id,j),Be=As(g),nt=oe?er(oe,j):null;return Be||nt?{orchestration:Be,worker:nt}:null}let Re=new Map;function Vt(g){if(Re.has(g))return Re.get(g)??null;let j=Z(g,null),oe=null;if(j){let Be=xn(_.runner_catalog??null,j.orchestration_model.value??""),nt=Be===null?j:Z(g,Be),qt=br(nt,_.runner_catalog??null),Ot=er(nt,Be);oe=qt||Ot?{orchestration:qt,worker:Ot}:null}return Re.set(g,oe),oe}function sn(g){let j=so(w,g);return j.total===0?null:j}let Gr=_.bead_titles||{},Nt=new Map;for(let[g,j]of Object.entries(Gr))typeof j=="string"&&j.length>0&&Nt.set(g,j);for(let g of[...v,...m])Nt.set(g.id,g.title||g.id);let Un=new Map;for(let g of[...v,...m,...p,...b,...d])g&&g.id&&typeof g.from_id=="string"&&Un.set(g.id,g.from_id);let Tn=new Map;for(let g of[...v,...m,...p,...b,...d])g&&g.id&&typeof g.priority=="number"&&Tn.set(g.id,g.priority);let Ps=_.bead_times&&typeof _.bead_times=="object"&&!Array.isArray(_.bead_times)?_.bead_times:{},rr=_.bead_labels&&typeof _.bead_labels=="object"&&!Array.isArray(_.bead_labels)?_.bead_labels:{},Wn=_.bead_workflow&&typeof _.bead_workflow=="object"&&!Array.isArray(_.bead_workflow)?_.bead_workflow:{},zn=new Map;for(let[g,j]of Object.entries(rr))Array.isArray(j)&&zn.set(g,Vi(j));for(let g of[...v,...m]){let j=g.labels;Array.isArray(j)&&!zn.has(g.id)&&zn.set(g.id,Vi(j))}let vr=new Map,Vr=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(Vr)?Vr:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let j=g.members.map(Be=>{let nt=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).find(qt=>qt.entries.some(Ot=>Ot.bead_id===Be));return nt?nt.id:null});if(!(j.every(Be=>Be!==null)&&new Set(j).size===1))for(let Be of g.members)vr.set(Be,g.members.filter(nt=>nt!==Be))}let Ds=_.bead_blocked_by&&typeof _.bead_blocked_by=="object"&&!Array.isArray(_.bead_blocked_by)?_.bead_blocked_by:{},wr=new Map;for(let[g,j]of Object.entries(Ps))j&&typeof j=="object"&&wr.set(g,j);for(let g of[...v,...m])wr.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let sr=g=>wr.get(g)||{},Hn=_.pr_wait||[],Kr=_.pr_observations||{},Me=_.pr_activity||{},st=_.cleanup_failed||{},on=Object.entries(st).map(([g,j])=>({bead_id:g,step:j&&j.step?j.step:"",reason:j&&j.reason?j.reason:"",at:j&&typeof j.at=="number"?j.at:null,detail:j&&typeof j.detail=="string"?j.detail:null,output_tail:j&&typeof j.output_tail=="string"&&j.output_tail?j.output_tail:void 0,log_path:j&&typeof j.log_path=="string"&&j.log_path?j.log_path:void 0,retry_count:j&&typeof j.retry_count=="number"&&Number.isInteger(j.retry_count)&&j.retry_count>0?j.retry_count:0,failure_code:j&&typeof j.failure_code=="string"?j.failure_code:void 0,subject_id:j&&typeof j.subject_id=="string"?j.subject_id:void 0,repair_eligible:!!(j&&j.repair_eligible),repair:j&&j.repair?j.repair:void 0})),fa=_.queue||[],cf=new Set([...fa.map(g=>g.bead_id),...(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(j=>j.bead_id)),...Hn.map(g=>g.bead_id),..._.done.map(g=>g.bead_id)]),uf=new Set(m.map(g=>g.id)),df=i?i.get()?.order||{}:{},rl=new Set,sl=[];for(let g of[...v,...m])cf.has(g.id)||rl.has(g.id)||sy(g)||(rl.add(g.id),sl.push(g));B=ry(sl,D,df);let pf=_.admission||{},ol=g=>{let j=pf[g];if(!j)return"";if(j.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let oe=typeof j.reason=="string"?j.reason:"",Be=oe.indexOf(":");return Be>0&&Be<oe.length-1?`\u26D4 ${oe.slice(0,Be)} (${oe.slice(Be+1)})`:`\u26D4 ${oe}`},ff=B.map(g=>{let j=Co(g),oe=j.path.length>0,Be=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",nt=!Object.hasOwn(g,"description")||typeof g.description=="string"&&g.description.trim().length>0,qt=Object.hasOwn(g,"labels")&&Ap(g.labels),Ot=!qt&&(Be?nt:oe&&!j.conflict),wt=uf.has(g.id),yn=[];wt&&yn.push(oy(g)),Be&&!nt?yn.push("missing_description"):!Be&&j.conflict?yn.push("spec_id_conflict"):!Be&&!oe&&yn.push("spec \uC5C6\uC74C");let zs=ol(g.id);return zs&&yn.push(zs),{id:g.id,title:g.title||g.id,reason:yn.join(" \xB7 "),draggable:Ot,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Be,status:g.status,worker_ineligible:qt,blocked:wt,has_spec:oe,exec_chips:Vt(g.id),from_id:g.from_id||void 0,priority:Tn.get(g.id)}}),_a=Vh(ff,Q),ma=_a.visible,_f=_.revise_parked||{},Ms=_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},ga=(g,j)=>g.map((oe,Be)=>{let nt=j!=="done",qt=j!=="done"&&j!=="queue",Ot=nt?_f[oe.bead_id]:null,wt=nt?An(Ms,oe.bead_id):null,yn=wt?.operation?wt:null,zs=nt&&zn.get(oe.bead_id)===!0,Dl=Ds[oe.bead_id]||[],Aa=_.admission&&typeof _.admission=="object"?_.admission[oe.bead_id]:null,Sa=nt?id(Aa,!!yn||ye.has(oe.bead_id)):null,xf=nt&&!Sa?ol(oe.bead_id):null,Af=nt?[xf]:[],Ml=nt&&Dl.length>0&&typeof Aa?.reason=="string"&&Aa.reason.startsWith("not_ready")?[`\u23F8 ${Dl.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Ea=nt?vr.get(oe.bead_id):void 0;return Ea&&Ea.length>0&&Ml.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Ea.join(", ")}\uC640`),{id:oe.bead_id,title:Nt.get(oe.bead_id)||oe.bead_id,reason:Af.filter(Boolean).join(" \xB7 "),draggable:nt&&!yn&&!Sa,done:j==="done",lane:j,seq:qt?Be+1:void 0,worker_serial:zs,discard:yn,stale_work:Sa,badges:[...Ml,...Ot?["\u23F8 REVISE \uD30C\uD0B9"]:[],...j==="done"?zo(_.attempts||{},oe.bead_id):[]],alert:!!Ot,revise_action:!!Ot,revise_enabled:!!Ot&&!yn&&!ee.has(oe.bead_id),revise_title:Ot?Ot.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ot.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:j==="done"?mn(_.attempts||{},oe.bead_id):null,work_ms:j==="done"?Ho(_.attempts||{},oe.bead_id):null,done_at:j==="done"&&typeof oe.added_at=="number"?oe.added_at:void 0,exec_chips:nt?Vt(oe.bead_id):null,workflow:nt&&Wn[oe.bead_id]||null,from_id:Un.get(oe.bead_id)||void 0,priority:Tn.get(oe.bead_id),...sr(oe.bead_id)}}),kr=_.attempts?Object.values(_.attempts).filter(Hr):[],ba=new Set;for(let g of kr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&ba.add(g.resumed_from);let al=new Map;for(let g of kr)al.set(g.bead_id,g.attempt_id);let Ns=new Map;for(let g of kr)Ns.set(g.attempt_id,g);function ha(g){let j=new Set,oe=g;for(;oe&&!j.has(oe.attempt_id);){if(oe.conflict_resolution===!0)return!0;j.add(oe.attempt_id),oe=typeof oe.resumed_from=="string"&&oe.resumed_from.length>0&&Ns.get(oe.resumed_from)||null}return!1}let qs=typeof _.declared_base=="string"?_.declared_base:null;function mf(g){let j=null;for(let oe of kr)!oe||oe.bead_id!==g||ha(oe)||(j===null||(typeof oe.started_at=="number"?oe.started_at:0)>=(typeof j.started_at=="number"?j.started_at:0))&&(j=oe);return j&&typeof j.target_base=="string"?j.target_base:null}let ya=[],Fs=[],gf=xp(_),il=g=>{let j=typeof g.session_id=="string"&&g.session_id.length>0,oe=ba.has(g.attempt_id);return{eligible:j&&!oe,reason:j?oe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},hn=null;for(let g of kr){let j=g.status==="paused"&&!ba.has(g.attempt_id);if(g.status==="running"||j)Fs.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Nt.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:j,conflict_resolution:ha(g),base_exception:Xi(qs,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:An(Ms,g.bead_id,{attempt_id:g.attempt_id}),workflow:Wn[g.bead_id]||null,priority:Tn.get(g.bead_id),usage:mn(_.attempts||{},g.bead_id),rollup:sn(g.bead_id),rollup_expanded:ke.has(g.bead_id),exec_chips:ge(g),...sr(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&gf(g)){let oe=il(g);ya.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Nt.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:An(Ms,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:oe.eligible,resume_reason:oe.reason,conflict_resolution:ha(g),base_exception:Xi(qs,g.target_base),workflow:Wn[g.bead_id]||null,priority:Tn.get(g.bead_id),usage:mn(_.attempts||{},g.bead_id),rollup:sn(g.bead_id),rollup_expanded:ke.has(g.bead_id),exec_chips:ge(g),...sr(g.bead_id)}),hn=g}}let ll=new Set([...ya,...Fs].map(g=>g.bead_id));for(let g of Array.isArray(_.session_active)?_.session_active:[]){let j=g&&g.bead_id;typeof j!="string"||j.length===0||ll.has(j)||(ll.add(j),Fs.push({bead_id:j,attempt_id:null,kind:"session",title:g.title||Nt.get(j)||j,status:"in_progress",started_at:Cn(g.started_at)??Cn(g.updated_at),updated_at:Cn(g.updated_at),workflow:g.workflow||null,priority:Tn.get(j),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let $r=[...ya,...Fs].map(g=>{let j=Ns.get(g.attempt_id),oe=j?.quickfix_landing;if(j?.quickfix_lane!==!0||!oe||typeof oe!="object")return g;let Be=typeof oe.reason=="string"&&oe.reason.length>0?oe.reason:null,nt=Rs({bead_id:j.bead_id,merge_sha:oe.head_sha,cleanup_cursor:oe.cursor,cleanup_failed:Be?{step:oe.cursor,reason:Be}:null,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]});return nt?{...g,landing:nt}:g}),cl=null;if(hn){let g=il(hn),j=hn.cause_detail;cl={bead_id:hn.bead_id,repo:hn.repo||"",reason:hn.cause||hn.status,cause_detail:j&&typeof j.reason=="string"?{reason:j.reason,command:typeof j.command=="string"?j.command:null}:null,resume_attempt_id:hn.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:An(Ms,hn.bead_id,{attempt_id:hn.attempt_id})}}let ul=new Set($r.map(g=>g.bead_id)),va=Array.isArray(_.merge_queue)?_.merge_queue:[],dl=new Map,pl=new Map,fl=new Map,_l=new Map,ml=new Map;va.forEach((g,j)=>{g&&typeof g.bead_id=="string"&&(dl.set(g.bead_id,j+1),pl.set(g.bead_id,g.resolution),fl.set(g.bead_id,g.continuation_action||null),_l.set(g.bead_id,g.head_review||null),ml.set(g.bead_id,g.authority||null))});let xr=_.merge_queue_state||{active:null,failures:{}},bf=xr.failures||{},gl=xr.waiting&&typeof xr.waiting.bead_id=="string"&&typeof xr.waiting.reason=="string"?xr.waiting:null,hf=_.auto_merge_skips||{},bl=g=>{let j=hf[g];if(!j)return null;let oe=Kr[g],Be=oe&&oe.pr?oe.pr.head_sha:null;return Be&&Be===j.head_sha?j.reason||"":null},js=new Map;for(let g of $r)g.failed!==!0&&g.conflict_resolution&&(g.paused?js.has(g.bead_id)||js.set(g.bead_id,"paused"):js.set(g.bead_id,"running"));let hl=$r.filter(g=>g.kind!=="session"&&!g.paused&&g.failed!==!0).length,yl=(_.workspace_info||{}).slots,vl=typeof yl=="number"?yl:typeof _.slots=="number"?_.slots:da,yf=hl>vl,Bs=ur(W),vf=(Array.isArray(_.done)?_.done.slice():[]).filter(g=>Bs===void 0||typeof g.added_at!="number"||g.added_at>=Bs).sort((g,j)=>(j.added_at||0)-(g.added_at||0)),Yr=ga(vf,"done"),wf=new Set((Array.isArray(_.done)?_.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),wl=[],kf=u?.()||"";for(let g of d){let j=Cn(g.closed_at);if(typeof g.id!="string"||wf.has(g.id)||j===null||Bs!==void 0&&j<Bs||typeof g.comment_count!="number"||g.comment_count<=0)continue;let oe=`${kf}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Be=E.get(oe);Be===void 0&&n&&(E.set(oe,"pending"),Promise.resolve(n("get-comments",{id:g.id})).then(nt=>{let qt=Array.isArray(nt)&&nt.some(Ot=>Ro(typeof Ot?.text=="string"?Ot.text:"")?.lane==="session");E.set(oe,qt?"session":"not-session"),Fe()}).catch(()=>{E.set(oe,"failed"),Fe()})),Be==="session"&&wl.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:j,created_at:g.created_at,updated_at:g.updated_at})}Yr.push(...wl),Yr.sort((g,j)=>(j.done_at||0)-(g.done_at||0));let Us={};for(let g of Dn)Us[g]=0;let kl=!1,$l=0,wa=0,xl=0;for(let g of Yr){let j=g.usage;if(j&&typeof j=="object"){let oe=!1;for(let Be of Dn)Number.isFinite(j[Be])&&(Us[Be]+=j[Be],kl=!0,oe=!0);oe&&(wa+=1,Number.isFinite(j.total_cost_usd)&&($l+=j.total_cost_usd,xl+=1))}}wa>0&&xl===wa&&(Us.total_cost_usd=$l);let Al=Yr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),$f=Al.length>0?Bt(mo(Al)):kl?Mn(Us):null,Sl=_.lane_states&&typeof _.lane_states=="object"&&!Array.isArray(_.lane_states)?_.lane_states:{},El=Array.isArray(_.serial_lanes)?_.serial_lanes:[],Tl=g=>{if(Hn.some(Be=>Be.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let j=kr.filter(Be=>Be&&Be.bead_id===g),oe=j.length>0?j[j.length-1].status:null;return oe==="failed"||oe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":oe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Ws=El.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,j)=>{let oe=Sl[g.id]||{},Be=new Map((Array.isArray(oe.corrections)?oe.corrections:[]).filter(wt=>wt&&typeof wt.bead_id=="string"&&typeof wt.after=="string").map(wt=>[wt.bead_id,wt.after])),nt=ga(g.entries.filter(wt=>!ul.has(wt.bead_id)),g.id).map(wt=>Be.has(wt.id)?{...wt,badges:[`\u{1F517} ${Be.get(wt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...wt.badges]}:wt),qt=Array.isArray(oe.occupied_by)?oe.occupied_by.filter(wt=>typeof wt=="string"):[],Ot=qt.map(wt=>({id:wt,title:Nt.get(wt)||wt,draggable:!1,lane:g.id,ghost:!0,badges:[Tl(wt)]}));return{id:g.id,index:j+1,rows:[...Ot,...nt],occupied:qt.length>0,badge:qt.length>0?Tl(qt[0]):"\uB300\uAE30",cycle:oe.cycle===!0}}),Cl=typeof _.serial_lane_count=="number"?_.serial_lane_count:Ws.length,ka=ga(fa.filter(g=>!ul.has(g.bead_id)),"queue"),Rl=new Map,Ol=new Set;for(let[g,j]of Object.entries(Sl)){if(!/^s[1-5]$/.test(g))continue;let oe=j&&Array.isArray(j.occupied_by)?j.occupied_by:[];for(let Be of oe)typeof Be=="string"&&Rl.set(Be,g);oe.length>0&&Ol.add(g)}let Ar=[];for(let g of $r)typeof g.bead_id=="string"&&Ar.push({id:g.bead_id,title:Nt.get(g.bead_id)||g.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Rl.get(g.bead_id)??null});for(let g of Ws)for(let j of g.rows)j.ghost!==!0&&Ar.push({id:j.id,title:j.title,location_label:`${g.id} #${j.seq??""}`.trim(),kind:"serial",lane_id:g.id});ka.forEach((g,j)=>{Ar.push({id:g.id,title:g.title,location_label:`#${j+1}`,kind:"parallel",lane_id:null})});for(let g of ma)Ar.push({id:g.id,title:g.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let Ll={};for(let g of El)g&&typeof g.id=="string"&&Array.isArray(g.entries)&&(Ll[g.id]=g.entries.length);let $a=new Map;for(let g of Ar)$a.has(g.id)||$a.set(g.id,g);M={members_by_id:$a,serial_raw_lengths:Ll,serial_lane_count:Cl,occupied_lanes:Ol};let Il=Ep(_.bead_scope,Ar),xa=(g,j)=>{let oe=Il.get(g.id);if(!oe||oe.overlaps.length===0&&!oe.scope_missing)return g;let Be=ce(g.id,oe.overlaps);return g.dependency_chips={...g.dependency_chips||{},...oe.overlaps.length>0?{overlaps:oe.overlaps}:{},...oe.scope_missing&&j!=="running"?{scope_missing:!0}:{},...Be?{popover:Be}:{}},g};for(let g of ka)xa(g,"queue");for(let g of Ws)for(let j of g.rows)j.ghost!==!0&&xa(j,g.id);for(let g of ma)xa(g,"candidate");let Pl=new Map;for(let g of $r){let j=typeof g.bead_id=="string"?Il.get(g.bead_id):void 0;if(!j||j.overlaps.length===0)continue;let oe=ce(g.bead_id,j.overlaps);Pl.set(g.bead_id,{dependency_chips:{overlaps:j.overlaps,...oe?{popover:oe}:{}}})}return{queue:_,idToTitle:Nt,candidates:ma,candidate_hidden:{blocked:_a.hidden_blocked,spec:_a.hidden_spec},running:$r,live_count:hl,slots:vl,over_cap:yf,failure:cl,waiting:ka,serial_lanes:Ws,serial_lane_count:Cl,running_overlays:Pl,pr_wait:Hn.map(g=>by(g.bead_id,Nt.get(g.bead_id)||g.bead_id,Kr,st[g.bead_id]||null,mn(_.attempts||{},g.bead_id),Me[g.bead_id]||(me.has(g.bead_id)||fe.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),js.get(g.bead_id)||null,g.external===!0,{position:dl.get(g.bead_id)||0,active:xr.active===g.bead_id,failure:bf[g.bead_id]||null,waiting:gl?.bead_id===g.bead_id?gl.reason:null,resolution:pl.get(g.bead_id),continuation_action:fl.get(g.bead_id),head_review:_l.get(g.bead_id)||null,authority:ml.get(g.bead_id)||null},g.wt_present!==!1,_.auto_merge===!0?bl(g.bead_id):null,Xi(qs,mf(g.bead_id)),_.completion_status&&typeof _.completion_status=="object"&&!Array.isArray(_.completion_status)&&_.completion_status[g.bead_id]||null,_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},Ns.get(al.get(g.bead_id)||"")?.worker_serial===!0,_.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]})).map(g=>({...g,workflow:Wn[g.id]||null,priority:Tn.get(g.id),...sr(g.id)})),merge_queue_length:va.length,merge_queue_running:va.length>0,auto_excluded:Hn.map(g=>g.bead_id).filter(g=>bl(g)!==null),declared_base:qs,done:Yr,token_total:$f,cleanup_failures:on,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]}}function Ce(){let v=!!o?.get()?.job,m=!v&&o?.isPending?.()===!0,d=v?"\uBD84\uC11D \uC911":m?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${d?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${d?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${d?l`<span class="worker-analysis-btn__badge">${d}</span>`:""}
    </button>`}function lt(_){let v=_.waiting.length>0?_.waiting[0].id:"\u2014",m=l`<button
      type="button"
      class="worker-play${_.queue.auto_advance?" is-active":""}"
    >
      ${_.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,d=zt(_),p=_.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",b=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${_.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${_.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${N()} 완료 <b>${_.done.length}</b></span
      >`,w=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${_.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${_.declared_base||"?"}</span
    >`,q=l`<label class="worker-tgl worker-slots"
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
          ${Array.from({length:jp},(ge,Re)=>Re+1).map(ge=>l`<option
                value=${String(ge)}
                ?selected=${_.serial_lane_count===ge}
              >
                ${ge}
              </option>`)}
        </select>
      </label>
      ${o?Ce():""} `,G=_d({failure:_.failure}),Z=ad(_.repo_operations,_.cleanup_failures);return J?l`<div class="worker-ribbon">
          ${m} ${d}
          <div class="worker-kpi worker-kpi--ribbon">${p}${b}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${q}</div>
          <div class="worker-kpi">${w}</div>
        </div>
        ${Z}${Ke.template()}${G}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${m}${d}${q}</div>
        <div class="worker-kpi">
          ${p}${b}${w}
          ${(Array.isArray(_.token_total)?_.token_total:_.token_total?[{label:_.token_total,tooltip:`${N()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(ge=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${ge.tooltip}
                >${N()} 완료 · 누적 ${ge.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${Z}${Ke.template()}${G}`}function it(_){if(_.running.length===0&&_.pr_wait.length===0)return"";let v=_.running.some(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0);return l`<section
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
          >${_.running.length+_.pr_wait.length}</span
        >
      </header>
      ${_.running.length>0?Li(_.running,Date.now(),we,_.running_overlays):""}
      ${_.pr_wait.map(m=>Qn(m))}
    </section>`}function Lt(_){let v=_.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${Q.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Kh.map(m=>l`<button
              type="button"
              class="worker-filter__chip${Q.spec===m.value?" is-active":""}"
              data-spec=${m.value}
              aria-pressed=${Q.spec===m.value?"true":"false"}
            >
              ${m.label}
            </button>`)}
        ${v.spec>0?l`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function Pt(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${D}
    >
      ${Yh.map(_=>l`<option value=${_.value} ?selected=${D===_.value}>
            ${_.label}
          </option>`)}
    </select>`}function Wt(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${W}
      >
        ${Gn.map(_=>l`<option value=${_.value} ?selected=${W===_.value}>
              ${_.label}
            </option>`)}
      </select>
    </div>`}function Dt(_){let v=l`<span
      class="worker-lane__badge${_.occupied?" worker-lane__badge--held":""}"
      >${_.badge}</span
    >`,m=_.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return bn({id:`worker-pane-lane-${_.id}`,lane:_.id,title:`\uC9C1\uB82C ${_.index}`,items:_.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:v,controls:m})}function zt(_){let v=_.queue.auto_merge===!0;if(_.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${_.merge_queue_length}
      </button>`;if(v)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let m=new Set(_.auto_excluded),d=_.pr_wait.filter(p=>p.merge_action&&p.merge_enabled&&!m.has(p.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${d>0?` ${d}`:""}
    </button>`}function ht(_){let v=bn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:_.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Pt(),controls:Lt(_),place_menu:et(_.candidates),onOpenDoc:f?(m,d)=>f(d):void 0});return J?l`<div class="worker-lanes worker-lanes--mobile">
        ${it(_)}
        ${bn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:ne.queue,preview:Wp(_.waiting)})}
        ${_.serial_lanes.map(m=>Dt(m))}
        ${v}
        ${bn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:_.done,empty:`${N()} \uC644\uB8CC \uC5C6\uC74C`,controls:Wt(),collapsible:!0,collapsed:ne.done,preview:Array.isArray(_.token_total)?_.token_total.map(m=>m.label).join(" \xB7 "):_.token_total||Wp(_.done)})}
      </div>`:l`<div class="worker-lanes">
      ${v}
      <div class="worker-wait">
        ${bn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${_.serial_lanes.map(m=>Dt(m))}
      </div>
      ${bn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${_.slots}`,items:_.running,live:_.running.some(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0),body:Li(_.running,Date.now(),we,_.running_overlays)})}
      ${bn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:_.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${bn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${N()} ${_.done.length}`,items:_.done,empty:`${N()} \uC644\uB8CC \uC5C6\uC74C`,controls:Wt()})}
    </div>`}function Mt(_){ne={...ne,[_]:!ne[_]},ny(ne),Fe()}function Fe(){let _=Ve();Ge(lt(_),he),Ge(ht(_),re)}function Ht(){if(typeof window.matchMedia!="function")return;let _=window.matchMedia(ey);J=!!_.matches;let v=m=>{let d=!!(m&&typeof m.matches=="boolean"?m.matches:_.matches);d!==J&&(J=d,Fe())};typeof _.addEventListener=="function"?(_.addEventListener("change",v),te.push(()=>_.removeEventListener("change",v))):typeof _.addListener=="function"&&(_.addListener(v),te.push(()=>_.removeListener(v)))}let Xt=null;function Ye(_){Xt=_.target instanceof Element?_.target:null}function Ee(_){let m=_.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!m)return;if(Xt&&m.contains(Xt)&&Xt.closest("input, button, a")){_.preventDefault();return}let d=m.dataset.beadId||"",p=m.dataset.lane||"";F={bead_id:d,from_lane:p};try{_.dataTransfer?.setData("text/plain",d),_.dataTransfer&&(_.dataTransfer.effectAllowed="move")}catch{}}function R(_){let v=_.target?.closest?.(".worker-pane");if(!v)return;let m=v.dataset.lane||"";m!=="candidate"&&m!=="queue"&&!/^s[1-5]$/.test(m)||(_.preventDefault(),_.dataTransfer&&(_.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function ue(_){_.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Oe(_,v){let m=B.find(w=>w.id===_);if(!m)return;let d=B.filter(w=>w.id!==_),p=d.length;if(v){let w=v.dataset.beadId;if(w===_)return;let q=d.findIndex(G=>G.id===w);q>=0&&(p=q)}let b=d.slice();b.splice(p,0,m),S.applyReorder(_,b,p)}function tt(_){let v=_.target?.closest?.(".worker-pane");if(!v)return;_.preventDefault(),v.classList.remove("worker-pane--drag-over");let m=v.dataset.lane||"",d=F?.bead_id||_.dataTransfer?.getData("text/plain")||"",p=F?.from_lane||"";if(F=null,!d)return;let b=_.target?.closest?.(".worker-mini, .worker-card"),w=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),q=w.length;if(b){let G=w.indexOf(b);G>=0&&(q=G)}if(q=Math.max(0,q-v.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(q=Ze()),m==="candidate"){if(p==="candidate"){Oe(d,b);return}(p==="queue"||/^s[1-5]$/.test(p))&&ot(d);return}if(m==="queue"||/^s[1-5]$/.test(m)){let G=m==="queue"?"parallel":m;p===m?bt(d,G,q):Xe(d,G)}}function yt(_){Q=_,Gh(_),Fe()}function pt(_){D=_==="board"||_==="created"||_==="spec"?_:pa,Qh(D),Fe()}function Et(_){W=_n(_)?_:an,Jh(W),y?.(W),Fe()}function Rt(_){let v=_.target?.closest?.(".worker-serial-lane-count");if(v){let q=Number.parseInt(v.value,10);Number.isFinite(q)&&I(q).then(Fe);return}let m=_.target?.closest?.(".worker-filter__blocked");if(m){yt({...Q,show_blocked:m.checked});return}let d=_.target?.closest?.(".worker-done-range");if(d){Et(d.value);return}let p=_.target?.closest?.(".worker-sort");if(p){pt(p.value||pa);return}let b=_.target?.closest?.(".worker-slots__input");if(!b)return;let w=Number.parseInt(b.value,10);if(!Number.isFinite(w)){Fe();return}k(w).then(Fe)}function Gt(_){return _?{runner:_.runner||void 0,model:_.model||void 0,effort:_.effort||void 0,worktree:_.worktree||void 0,status:_.status||void 0,session_id:_.session_id||void 0}:{}}function Jt(){let _=Ve();return{operations:_.repo_operations,cleanup_failures:_.cleanup_failures,repo:u&&u()||""}}function vt(){we&&Pe.close(),C.hidden=!1,He.hidden=!1,z.open(Jt()),Fe()}function rn(_){let v=Ie(),m=v.attempts?v.attempts[_]:null;we=_,De=null,z.close(),C.hidden=!0,He.hidden=!1,Pe.open({attempt_id:_,meta:Gt(m)}),Fe()}function pn(_,v){we=null,De=_,z.close(),C.hidden=!0,He.hidden=!1,Pe.open({attempt_id:_,meta:v,hide_prompt:!0}),Fe()}function En(){if(z.isOpen()&&z.refresh(Jt()),De){let m=(o?.get()?.runs||[]).find(d=>d.run_id===De);m?Pe.updateMeta(Yi(m)):Pe.close();return}if(!we)return;let _=Ie(),v=_.attempts?_.attempts[we]:null;if(v){Pe.updateMeta(Gt(v));return}Pe.close()}function T(_){let v=_.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-parallel-analysis-dialog"))return;let m=v?.closest?.(".mon-overlap__chip");if(m){let Me=m.closest("[data-bead-id]"),st=Me&&Me.getAttribute("data-bead-id")||"";if(st){let on=m.getAttribute("data-overlap-id")||"";U=!!U&&U.bead_id===st&&U.counterpart_id===on?null:{bead_id:st,counterpart_id:on},Fe()}return}let d=v?.closest?.(".mon-overlap__place");if(d){let Me=d.closest("[data-bead-id]"),st=Me&&Me.getAttribute("data-bead-id")||"";st&&ve(st,d.getAttribute("data-counterpart-id")||"");return}if(v?.closest?.(".mon-overlap__popover"))return;if(v?.closest?.(".worker-analysis-btn")){Ue?.open();return}if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){vt();return}let p=v?.closest?.(".worker-repo-op__session");if(p){let Me=p.dataset.attemptId;Me&&rn(Me);return}let b=v?.closest?.(".worker-repo-op__resolve");if(b){A(b.dataset.operationId||"");return}let w=v?.closest?.(".worker-repo-op__dismiss");if(w){O(w.dataset.operationId||"");return}let q=v?.closest?.(".worker-cleanup__resume");if(q){let Me=q.dataset.beadId;Me&&at(Me);return}let G=v?.closest?.(".worker-banner__resume");if(G){let Me=G.dataset.attemptId;Me&&St(Me);return}let Z=v?.closest?.(".worker-banner__discard");if(Z){let Me=Z.dataset.confirmation==="merged"?"merged":"unmerged";ie(Z.dataset.beadId||"",Z.dataset.attemptId||null,Me,Z.dataset.operationId||null);return}let ge=v?.closest?.(".worker-banner__dismiss");if(ge){let Me=ge.dataset.attemptId;Me&&mt(Me);return}if(v?.closest?.(".worker-play")){xe(!Ie().auto_advance);return}let Re=v?.closest?.(".worker-merge-all");if(Re){Re.classList.contains("worker-merge-all--stop")?Ie().auto_merge===!0?Te(!1):X():Te(!0);return}let Vt=v?.closest?.(".worker-pane__hd--toggle");if(Vt){let Me=Vt.dataset.lane;(Me==="queue"||Me==="done")&&Mt(Me);return}let sn=v?.closest?.(".worker-card__place-lane");if(sn){let Me=sn.dataset.beadId,st=sn.dataset.lane;Me&&(st==="parallel"||/^s[1-5]$/.test(st||""))&&(le=null,Fe(),Xe(Me,st));return}if(v?.closest?.(".worker-card__place-cancel")){le=null,Fe();return}let Nt=v?.closest?.(".worker-card__place");if(Nt){let Me=Nt.dataset.beadId;Me&&!Nt.disabled&&(ze()?(le=Me,Fe()):Xe(Me,"parallel"));return}let Un=v?.closest?.(".worker-filter__chip");if(Un){let Me=Un.dataset.spec;(Me==="all"||Me==="with"||Me==="without")&&yt({...Q,spec:Me});return}let Tn=v?.closest?.(".worker-mini__merge");if(Tn){let Me=Tn.dataset.beadId||"";Ie().cleanup_failed?.[Me]?at(Me):Tt(Me);return}let Ps=v?.closest?.(".worker-mini__merge-cancel");if(Ps){P(Ps.dataset.beadId||"");return}let rr=v?.closest?.(".worker-mini__discard");if(rr){ie(rr.dataset.beadId||"",rr.dataset.attemptId||null,rr.dataset.discardMode==="merged"?"merged":"unmerged",rr.dataset.operationId||null);return}let Wn=v?.closest?.(".worker-mini__stale-continue");if(Wn){x("worker-stale-work-continue",Wn.dataset.beadId||"",Wn.dataset.actionId||"");return}let zn=v?.closest?.(".worker-mini__stale-backup");if(zn){x("worker-stale-work-backup-fresh",zn.dataset.beadId||"",zn.dataset.actionId||"");return}let vr=v?.closest?.(".worker-mini__stale-recheck");if(vr){x("worker-stale-work-recheck",vr.dataset.beadId||"",vr.dataset.actionId||"");return}let Vr=v?.closest?.(".worker-mini__revise-fix");if(Vr){K("worker-revise-fix",Vr.dataset.beadId||"");return}let Ds=v?.closest?.(".worker-mini__revise-approve");if(Ds){K("worker-revise-approve",Ds.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let Me=v?.closest?.(".rtile"),st=Me?.dataset?.beadId,on=Me?.dataset?.attemptId;st&&ie(st,on||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let st=v?.closest?.(".rtile")?.dataset?.attemptId;st&&mt(st);return}if(v?.closest?.(".rtile__pause")){let st=v?.closest?.(".rtile")?.dataset?.attemptId;st&&_t(st);return}if(v?.closest?.(".rtile__resume")){let st=v?.closest?.(".rtile")?.dataset?.attemptId;st&&St(st);return}if(v?.closest?.(".rtile__session")){let st=v?.closest?.(".rtile")?.dataset?.attemptId;st&&rn(st);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){z.close(),Pe.close();return}if(v?.closest?.(".worker-drawer-host"))return;let wr=v?.closest?.(".rtile .board-card__roll-toggle");if(wr){let Me=wr.dataset.rollParent;Me&&(ke.has(Me)?ke.delete(Me):ke.add(Me),Fe());return}let sr=v?.closest?.(".rtile .board-card__roll-child");if(sr){let Me=sr.dataset.childId;Me&&c&&c(Me);return}let Hn=v?.closest?.(".rtile");if(Hn){if(v?.closest?.(".rtile__id")){let st=Hn.dataset.beadId;st&&cn(st).then(on=>{on?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Me=Hn.dataset.beadId;Me&&c&&c(Me);return}let Kr=v?.closest?.(".worker-mini, .worker-card");if(Kr){let Me=Kr.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){Me&&cn(Me).then(on=>{on?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let st=v?.closest?.(".ctl-chip--from");if(st){let on=st.dataset.fromId;on&&c&&c(on);return}Me&&c&&c(Me)}}e.addEventListener("pointerdown",Ye),e.addEventListener("dragstart",Ee),e.addEventListener("dragover",R),e.addEventListener("dragleave",ue),e.addEventListener("drop",tt),e.addEventListener("click",T),e.addEventListener("change",Rt);function L(_){if(!U)return;let v=_.target;v&&typeof v.closest=="function"&&v.closest(".mon-overlap__popover, .mon-overlap__chip")||(U=null,Fe())}function Le(_){_.key!=="Escape"||!U||(U=null,Fe())}return document.addEventListener("click",L),document.addEventListener("keydown",Le),te.push(()=>{document.removeEventListener("click",L),document.removeEventListener("keydown",Le)}),Ht(),$&&te.push($.subscribe(()=>{for(let[_,v]of E)v==="failed"&&E.delete(_);Fe()})),s&&te.push(s.subscribe(()=>{let _=u&&u()||"";_!==Se&&(Se=_,Y.close()),Fe(),En()})),o&&typeof o.subscribe=="function"&&te.push(o.subscribe(()=>{En(),Fe()})),Fe(),{load(){$e(),Fe()},refreshSessionDefaults:be,destroy(){for(let _ of te.splice(0))try{_()}catch{}e.removeEventListener("pointerdown",Ye),e.removeEventListener("dragstart",Ee),e.removeEventListener("dragover",R),e.removeEventListener("dragleave",ue),e.removeEventListener("drop",tt),e.removeEventListener("click",T),e.removeEventListener("change",Rt);try{Pe.destroy()}catch{}He.hidden=!0;try{Ue?.destroy()}catch{}try{Y.destroy()}catch{}Ge(l``,e)}}}function el(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Zp(e,t,n,r=async()=>{},s=async()=>{}){let o=xt("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function f(W){let N=W.target.value,J=t.getState().workspace?.current?.path||"";if(N&&N!==J){o("switching workspace to %s",N),i=!0,D();try{await n(N)}catch(me){o("workspace switch failed: %o",me)}finally{i=!1,D()}}}async function h(){let W=t.getState(),E=W.workspace?.current?.path||W.workspace?.available?.[0]?.path||"";if(!(!E||c)){o("git-pulling workspace %s",E),c=!0,D();try{await r(E)}catch(N){o("workspace git pull failed: %o",N)}finally{c=!1,D()}}}function y(W){let E=W.target;E&&e.contains(E)||F()}function $(W){W.key==="Escape"&&F()}function S(){u||(u=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",$),D())}function F(){u&&(u=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",$),D())}function B(){u?F():S()}async function Q(W){let E=W.target,N=E.value,ne=E.checked;o("toggling visibility %s \u2192 %s",N,String(ne));try{await s(N,ne)}catch(J){o("workspace visibility toggle failed: %o",J)}}function le(W){return W?l`
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
    `:l``}function U(W,E){return l`
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
                ${W.map(N=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${N.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${N.path}"
                        .checked=${!E.has(N.path)}
                        @change=${Q}
                      />
                      <span class="workspace-picker__manage-name"
                        >${el(N.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let W=t.getState(),E=W.workspace?.current,N=W.workspace?.available||[],ne=new Set(W.workspace?.hidden||[]),J=E?.path||N[0]?.path||"";if(N.length===0)return l``;let me=N.filter(fe=>!ne.has(fe.path)||fe.path===J);if(me.length<=1){let fe=me[0]||N[0],ee=el(fe.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${fe.path}"
            >${ee}</span
          >
          ${U(N,ne)}
          ${le(J)}
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
          ${me.map(fe=>l`
              <option
                value="${fe.path}"
                ?selected=${fe.path===J}
                title="${fe.path}"
              >
                ${el(fe.path)}
              </option>
            `)}
        </select>
        ${U(N,ne)}
        ${le(J)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){Ge(M(),e)}return D(),a=t.subscribe(()=>D()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",$),Ge(l``,e)}}}var Qp=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function tl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Xp(e,t,n=tl()){return{id:n,type:e,payload:t}}function Jp(e={}){let t=xt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,f=[],h=new Map,y=new Set;function $(M){for(let D of Array.from(y))try{D(M)}catch{}}function S(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),$(o);let M=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),D=(n.jitterRatio||0)*M,W=Math.max(0,Math.round(M+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",W,a+1),i=setTimeout(()=>{i=null,U()},W)}function F(M){try{s?.send(JSON.stringify(M))}catch(D){t("ws send failed",D)}}function B(){for(o="open",t("ws open"),$(o),a=0;f.length;){let M=f.shift();M&&F(M)}}function Q(M){let D;try{D=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(u.has(D.id)){let E=u.get(D.id);u.delete(D.id),D.ok?E?.resolve(D.payload):E?.reject(D.error||new Error("ws error"));return}let W=h.get(D.type);if(W&&W.size>0)for(let E of Array.from(W))try{E(D.payload)}catch(N){t("ws event handler error",N)}else t("ws received unhandled message type: %s",D.type)}function le(){o="closed",t("ws closed"),$(o);for(let[M,D]of u.entries())D.reject(new Error("ws disconnected")),u.delete(M);a+=1,S()}function U(){if(!c)return;let M=r();try{s=new WebSocket(M),t("ws connecting %s",M),o="connecting",$(o),s.addEventListener("open",B),s.addEventListener("message",Q),s.addEventListener("error",()=>{}),s.addEventListener("close",le)}catch(D){t("ws connect failed %o",D),S()}}return U(),{send(M,D){if(!Qp.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let W=tl(),E=Xp(M,D,W);return t("send %s id=%s",M,W),new Promise((N,ne)=>{u.set(W,{resolve:N,reject:ne,type:M}),s&&s.readyState===s.OPEN?F(E):(t("queue %s id=%s (state=%s)",M,W,o),f.push(E))})},on(M,D){h.has(M)||h.set(M,new Set);let W=h.get(M);return W?.add(D),()=>{W?.delete(D)}},onConnection(M){return y.add(M),()=>{y.delete(M)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,U()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function hy(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function yy(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var nl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ef=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],tr="tab:worker:closed",vy="bdui.worker.done-range",tf=rp,nf="worker:queue",rf="worker:parallel-analysis",sf="ui:order",of="ui:display-policy",af="exec:presets",nr="tab:board:closed",lf="beads-ui.board.closed-range";function wy(e){let t=xt("main");t("bootstrap start");let n=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ge(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),f=document.getElementById("detail-panel");if(a&&$p(a),i&&c&&u&&f){let pe=function(T,L){let Le="Request failed",_="";if(T&&typeof T=="object"){let m=T;if(typeof m.message=="string"&&m.message.length>0&&(Le=m.message),typeof m.details=="string")_=m.details;else if(m.details&&typeof m.details=="object")try{_=JSON.stringify(m.details,null,2)}catch{_=""}}else typeof T=="string"&&T.length>0&&(Le=T);let v=L&&L.length>0?`Failed to load ${L}`:"Request failed";te.open(v,Le,_)},et=function(T){return`${Ye.getState().workspace.current?.path||""}\0${T}`},qe=function(){Pe&&(Pe().catch(()=>{}),Pe=null),z=null,Y=null},Ze=function(T){Se=T;let L=()=>{Se!==T||Ye.getState().selected_id!==T||(Se=null,je(T))};if(!Ie){Ue.then(L);return}L()},_t=function(T,L,Le,_,v){return Le!==ot[L]?(v().catch(()=>{}),!1):(T.set(_,v),!0)},mt=function(){let T=Ye.getState();Te(T.view==="board"),xe(T.view==="worker"),H(T.view==="monitor"),O(T.view==="board"||T.view==="worker"||St||!!T.selected_id)},at=function(){let T=ur(dt);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},We=function(){let T=ur(Tt);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},Te=function(T){if(T)for(let[L,Le]of nl){if(Xe.has(L)||bt.has(L))continue;let _=L===nr?at():{type:Le};try{he.register(L,_)}catch(d){t("register %s store failed: %o",L,d)}bt.add(L);let v=ot.board,m=!1;Ne.subscribeList(L,_).then(d=>{m=!_t(Xe,"board",v,L,d)}).catch(d=>{t("subscribe %s failed: %o",L,d),pe(d,"board")}).finally(()=>{bt.delete(L),m&&mt()})}else ie()},ie=function(){ot.board+=1;for(let[T]of nl){let L=Xe.get(T);L&&(L().catch(()=>{}),Xe.delete(T));try{he.unregister(T)}catch(Le){t("unregister %s failed: %o",T,Le)}}},xe=function(T){if(!T){A();return}for(let[L,Le]of ef){if(x.has(L)||bt.has(L))continue;let _=L===tr?We():{type:Le};try{he.register(L,_)}catch(d){t("register %s store failed: %o",L,d)}bt.add(L);let v=ot.worker,m=!1;Ne.subscribeList(L,_).then(d=>{m=!_t(x,"worker",v,L,d)}).catch(d=>{t("subscribe %s failed: %o",L,d),pe(d,"worker")}).finally(()=>{bt.delete(L),m&&mt()})}},A=function(){ot.worker+=1;for(let[T]of ef){let L=x.get(T);L&&(L().catch(()=>{}),x.delete(T));try{he.unregister(T)}catch(Le){t("unregister %s failed: %o",T,Le)}}},O=function(T){if(!T){k();return}K||(be("subscribe-worker-queue",{id:nf}).catch(L=>{t("subscribe-worker-queue failed: %o",L)}),be("subscribe-worker-parallel-analysis",{id:rf}).catch(L=>{t("subscribe-worker-parallel-analysis failed: %o",L)}),K=()=>(be("unsubscribe-worker-parallel-analysis",{id:rf}),be("unsubscribe-worker-queue",{id:nf})))},k=function(){K&&(K().catch(()=>{}),K=null),rt.clear()},H=function(T){if(!T){de();return}I||(be("subscribe-monitor-pipeline",{id:tf}).catch(L=>{t("subscribe-monitor-pipeline failed: %o",L)}),I=()=>be("unsubscribe-monitor-pipeline",{id:tf}))},de=function(){I&&(I().catch(()=>{}),I=null)},ve=function(){ce||(be("subscribe-ui-order",{id:sf}).catch(T=>{t("subscribe-ui-order failed: %o",T)}),ce=()=>be("unsubscribe-ui-order",{id:sf}))},Qe=function(){ce&&(ce().catch(()=>{}),ce=null),C.clear()},Ce=function(){Ve||(be("subscribe-display-policy",{id:of}).catch(T=>{t("subscribe-display-policy failed: %o",T)}),Ve=()=>be("unsubscribe-display-policy",{id:of}))},lt=function(){Ve&&(Ve().catch(()=>{}),Ve=null),re.clear()},Lt=function(){it||(be("subscribe-impl-presets",{id:af}).catch(T=>{t("subscribe-impl-presets failed: %o",T)}),it=()=>be("unsubscribe-impl-presets",{id:af}))},Mt=function(T){if(!T)return"Unknown";let L=T.split("/").filter(Boolean);return L.length>0?L[L.length-1]:"Unknown"},Rt=function(T,L){Et.open(T.path,{missing_state:T.missing_state,...L?{workspace:L}:{}})};var h=pe,y=et,$=qe,S=Ze,F=_t,B=mt,Q=at,le=We,U=Te,M=ie,D=xe,W=A,E=O,N=k,ne=H,J=de,me=ve,fe=Qe,ee=Ce,ye=lt,ke=Lt,_e=Mt,se=Rt;let Ae=document.getElementById("header-loading"),V=yc(Ae),te=od(e),$e=Jp(),be=V.wrapSend((T,L)=>$e.send(T,L)),Ne=dc(be),he=pc(),He=mc(),rt=_c(),ut=Zl(),C=fc(),re=Kl(),we=Yl(),De=Ql();$e.on("impl-presets-snapshot",T=>{let L=T;L&&typeof L.revision=="number"&&Array.isArray(L.presets)&&we.set({revision:L.revision,presets:L.presets})}),$e.on("monitor-pipeline-snapshot",T=>{let L=T;if(!(!L||!Array.isArray(L.workspaces)))try{ut.set(L.workspaces,L.workspaces_state,L.cross_lanes)}catch{}}),$e.on("ui-order-snapshot",T=>{let L=T;if(L&&typeof L.revision=="number")try{C.set({revision:L.revision,order:L.order&&typeof L.order=="object"?L.order:{}})}catch{}}),$e.on("display-policy-snapshot",T=>{let L=T;if(L&&L.policy&&typeof L.policy=="object")try{re.set(L.policy)}catch{}}),$e.on("session-log-snapshot",T=>{let L=T;if(L&&typeof L.id=="string")try{De.set(L.id,Array.isArray(L.lines)?L.lines:[],typeof L.last_event_at=="number"?L.last_event_at:null)}catch{}}),$e.on("session-log-append",T=>{let L=T;if(L&&typeof L.id=="string")try{De.append(L.id,L.event)}catch{}}),$e.on("snapshot",T=>{let L=T,Le=L&&typeof L.id=="string"?L.id:"",_=Le?he.getStore(Le):null;if(_&&L&&L.type==="snapshot")try{_.applyPush(L)}catch{}}),$e.on("upsert",T=>{let L=T,Le=L&&typeof L.id=="string"?L.id:"",_=Le?he.getStore(Le):null;if(_&&L&&L.type==="upsert")try{_.applyPush(L)}catch{}}),$e.on("delete",T=>{let L=T,Le=L&&typeof L.id=="string"?L.id:"",_=Le?he.getStore(Le):null;if(_&&L&&L.type==="delete")try{_.applyPush(L)}catch{}});let Pe=null,z=null,Y=null,Se=null,Ke=()=>{},Ue=new Promise(T=>{Ke=()=>T(void 0)}),Ie=!1,ze=!1;async function je(T){let L=et(T);if(L===z||L===Y)return;Y=L;let Le=`detail:${T}`,_={type:"issue-detail",params:{id:T}};try{he.register(Le,_)}catch(v){t("register detail store failed: %o",v)}try{let v=await Ne.subscribeList(Le,_);if(Ye.getState().selected_id!==T||et(T)!==L){await v().catch(()=>{});return}Pe&&await Pe().catch(()=>{}),Pe=v,z=L}catch(v){t("detail subscribe failed: %o",v),pe(v,"issue details")}finally{Y===L&&(Y=null)}}let Xe=new Map,bt=new Set,ot={board:0,worker:0},St=!1,dt=an;try{let T=window.localStorage.getItem(lf);_n(T)&&(dt=T)}catch{}let Tt=an;try{let T=window.localStorage.getItem(vy);_n(T)&&(Tt=T)}catch{}async function P(T){if(!_n(T)||T===dt)return;dt=T;try{window.localStorage.setItem(lf,T)}catch{}let L=Xe.get(nr);if(!L)return;Xe.delete(nr),await L().catch(()=>{});let Le=at();try{he.register(nr,Le)}catch(_){t("register %s store failed: %o",nr,_)}try{let _=await Ne.subscribeList(nr,Le);Xe.set(nr,_)}catch(_){t("re-subscribe %s failed: %o",nr,_),pe(_,"board")}}async function X(T){if(!_n(T)||T===Tt)return;Tt=T;let L=x.get(tr);if(!L)return;x.delete(tr),await L().catch(()=>{});let Le=We();try{he.register(tr,Le)}catch(_){t("register %s store failed: %o",tr,_)}try{let _=await Ne.subscribeList(tr,Le);x.set(tr,_)}catch(_){t("re-subscribe %s failed: %o",tr,_),pe(_,"worker")}}let x=new Map,K=null,I=null,ce=null,Ve=null,it=null;async function Pt(){Ve=null,re.clear(),it=null,we.clear(),K=null,I=null,Xe.clear(),x.clear(),ot.board+=1,ot.worker+=1,Lt();let T=Ye.getState().workspace.current?.path;if(T)try{await $e.send("set-workspace",{path:T})}catch(Le){t("workspace restore after reconnect failed: %o",Le);return}Ce();let L=Ye.getState();Te(L.view==="board"),xe(L.view==="worker"),H(L.view==="monitor"),O(L.view==="board"||L.view==="worker"||!!L.selected_id)}async function Wt(){t("clearing all subscriptions for workspace switch"),ie(),A(),k(),He.clear(),Qe(),ve(),lt(),Ce(),qe();let T=Ye.getState();if(T.selected_id)try{he.unregister(`detail:${T.selected_id}`)}catch{}let L=Ye.getState();Te(L.view==="board"),xe(L.view==="worker"),H(L.view==="monitor"),O(L.view==="board"||L.view==="worker"||!!L.selected_id),L.selected_id&&Ze(L.selected_id)}async function Dt(T){t("requesting workspace switch to %s",T),ze=!0;try{let L=await $e.send("set-workspace",{path:T});t("workspace switch result: %o",L),L&&L.workspace&&(Ye.setState({workspace:{current:{path:L.workspace.root_dir,database:L.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",T),L.changed&&(await Wt(),ae("Switched to "+Mt(T),"success",2e3)))}catch(L){throw t("workspace switch failed: %o",L),ae("Failed to switch workspace","error",3e3),L}finally{ze=!1}}async function zt(T){t("requesting workspace git pull for %s",T);try{let L=await $e.send("git-pull-workspace",{});t("workspace git pull result: %o",L);let Le=L?.status;if(Le==="up_to_date"){ae("Already up to date","success",2e3);return}if(Le==="stash_pop_conflict"){ae("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ae("Git pulled "+Mt(T),"success",2e3)}catch(L){t("workspace git pull failed: %o",L);let Le=L?.code,_=L?.message;if(Le==="rebase_conflict"){ae("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Le==="rebase_conflict_abort_failed"){ae("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Le==="busy"){ae("Git pull skipped: another operation is running","warning",3e3);return}let v=_?`: ${_}`:"";throw ae(`Git pull failed${v}`,"error",3e3),L}}async function ht(T,L){t("setting workspace visibility %s \u2192 %s",T,String(L));try{await $e.send("set-workspace-visibility",{path:T,visible:L}),await Fe()}catch(Le){t("workspace visibility update failed: %o",Le),ae("Failed to update project visibility","error",3e3)}}async function Fe(){try{let T=await $e.send("list-workspaces",{});if(t("workspaces loaded: %o",T),T&&Array.isArray(T.workspaces)){let L=T.workspaces.map(m=>({path:m.path,database:m.database,pid:m.pid,version:m.version})),Le=T.current?{path:T.current.root_dir,database:T.current.db_path}:null,_=Array.isArray(T.hidden)?T.hidden.filter(m=>typeof m=="string"):[];Ye.setState({workspace:{current:Le,available:L,hidden:_}});let v=window.localStorage.getItem("beads-ui.workspace");v&&(!L.some(d=>d.path===v)||_.includes(v)?window.localStorage.removeItem("beads-ui.workspace"):Le&&v!==Le.path&&(t("restoring saved workspace preference: %s",v),await Dt(v)))}}catch(T){t("failed to load workspaces: %o",T)}}$e.on("workspace-changed",T=>{t("workspace-changed event: %o",T),T&&T.root_dir&&(Ye.setState({workspace:{current:{path:T.root_dir,database:T.db_path}}}),Fe(),Wt())});let Ht=!1;if(typeof $e.onConnection=="function"){let T=L=>{t("ws state %s",L),L==="reconnecting"||L==="closed"?(Ht=!0,ae("Connection lost. Reconnecting\u2026","error",4e3)):L==="open"&&Ht&&(Ht=!1,ae("Reconnected","success",2200),yy(Ye,(Le,_)=>{t(`${Le}: %o`,_)}),Pt())};$e.onConnection(T)}let Xt="board";try{let T=window.localStorage.getItem("beads-ui.view");(T==="board"||T==="worker"||T==="monitor")&&(Xt=T)}catch(T){t("view parse error: %o",T)}let Ye=hc({config:hy(),view:Xt});$e.on("worker-queue-snapshot",T=>{let L=T;if(!L||!L.queue)return;let Le=Ye.getState().workspace.current?.path;if(typeof Le=="string"&&Le.length>0&&L.root_dir!==Le){t("dropping worker-queue snapshot for %s",String(L.root_dir));return}try{He.set(L.queue)}catch{}}),$e.on("worker-parallel-analysis-snapshot",T=>{let L=T;if(!L)return;let Le=Ye.getState().workspace.current?.path;if(!(typeof Le=="string"&&Le.length>0&&typeof L.root_dir=="string"&&L.root_dir!==Le))try{rt.set({settings:L.settings,job:L.job??null,runs:Array.isArray(L.runs)?L.runs:[],last_good:L.last_good??null})}catch{}});let Ee=gc(Ye);Ee.start();let R=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),ue=async(T,L)=>{try{return await be(T,L)}catch(Le){if(R.has(T))throw Le;return[]}};op({global_element:r,repo_element:s},Ye,Ee);let Oe=document.getElementById("workspace-picker");Oe&&Zp(Oe,Ye,Dt,zt,ht);let tt=cp(e,(T,L)=>be(T,L));try{let T=document.getElementById("new-issue-btn");T&&T.addEventListener("click",()=>tt.open())}catch{}let yt=fp(e,{policyStore:re,queueStore:He,implPresetStore:we,transport:(T,L)=>be(T,L),onOpenChange:T=>{let L=St;St=T,mt(),L&&T===!1&&Jt.refreshSessionDefaults()},labelOptions:()=>{let T=new Set;for(let[L]of nl)for(let Le of he.snapshotFor(L)||[]){let _=Le.labels;if(Array.isArray(_))for(let v of _)typeof v=="string"&&v.length>0&&T.add(v)}return Array.from(T).sort()}});try{let T=document.getElementById("display-settings-btn");T&&(T.setAttribute("aria-label","\uC124\uC815"),T.setAttribute("title","\uC124\uC815"),T.addEventListener("click",()=>yt.open()))}catch{}let pt=document.createElement("div");pt.className="md-viewer-root",document.body.appendChild(pt);let Et=jo(pt,{getWorkspacePath:()=>Ye.getState().workspace.current?.path}),Gt=Lc(i,{gotoIssue:T=>Ee.gotoIssue(T),issueStores:he,transport:ue,workerQueueStore:He,uiOrderStore:C,displayPolicyStore:re,closedRange:dt,onClosedRangeChange:T=>{P(T)},onNewIssue:()=>tt.open(),openDoc:Rt}),Jt=Ji(c,{transport:ue,issueStores:he,queueStore:He,analysisStore:rt,sessionLogStore:De,uiOrderStore:C,gotoIssue:T=>Ye.setState({selected_id:T}),getWorkspacePath:()=>Ye.getState().workspace.current?.path,openDoc:Rt,doneRange:Tt,onDoneRangeChange:T=>{X(T)}}),vt=sp(u,{transport:ue,pipelineStore:ut,execPresetStore:we,sessionLogStore:De,router:Ee,gotoIssue:T=>Ee.gotoIssue(T),getWorkspacePath:()=>Ye.getState().workspace.current?.path,switchWorkspace:T=>Dt(T),openDoc:Rt}),rn=sd(f,{issueStores:he,transport:ue,queueStore:He,execPresetStore:we,sessionLogStore:De,getWorkspacePath:()=>Ye.getState().workspace.current?.path,mdViewer:Et,onNavigate:T=>{Ye.getState().view==="worker"?Ye.setState({selected_id:T}):Ee.gotoIssue(T)},onClose:()=>{let T=Ye.getState();Ye.setState({selected_id:null});try{Ee.gotoView(T.view==="worker"||T.view==="monitor"?T.view:"board")}catch{}},onOpenExecPresets:()=>{yt.open("execution")}}),pn=Ye.getState().selected_id;pn&&(f.hidden=!1,rn.load(pn),Ze(pn)),Ye.subscribe(T=>{let L=T.selected_id;L?(f.hidden=!1,rn.load(L),ze||Ze(L)):(rn.clear(),f.hidden=!0,qe())});let En=T=>{i.hidden=T.view!=="board",c.hidden=T.view!=="worker",u.hidden=T.view!=="monitor",o&&o.classList.toggle("is-quiet",T.view==="monitor"),Te(T.view==="board"),xe(T.view==="worker"),H(T.view==="monitor"),O(T.view==="board"||T.view==="worker"||St||!!T.selected_id),!T.selected_id&&T.view==="board"&&Gt.load(),T.view==="worker"&&Jt.load(),T.view==="monitor"?vt.load():vt.pause(),window.localStorage.setItem("beads-ui.view",T.view)};Ye.subscribe(En),En(Ye.getState()),ve(),Ce(),Lt(),Fe().finally(()=>{Ie=!0,Ke()}),window.addEventListener("keydown",T=>{let L=T.ctrlKey||T.metaKey,Le=String(T.key||"").toLowerCase(),_=T.target,v=_&&_.tagName?String(_.tagName).toLowerCase():"",m=v==="input"||v==="textarea"||v==="select"||_&&typeof _.isContentEditable=="boolean"&&_.isContentEditable;L&&Le==="n"&&(m||(T.preventDefault(),tt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&wy(t)});export{wy as bootstrap,hy as readBootstrapConfig,yy as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
