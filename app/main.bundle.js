var Tf=Object.create;var Ta=Object.defineProperty;var Cf=Object.getOwnPropertyDescriptor;var Rf=Object.getOwnPropertyNames;var Of=Object.getPrototypeOf,Lf=Object.prototype.hasOwnProperty;var If=(e,t,n)=>t in e?Ta(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ca=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Pf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Rf(t))!Lf.call(e,s)&&s!==n&&Ta(e,s,{get:()=>t[s],enumerable:!(r=Cf(t,s))||r.enumerable});return e};var Df=(e,t,n)=>(n=e!=null?Tf(Of(e)):{},Pf(t||!e||!e.__esModule?Ta(n,"default",{value:e,enumerable:!0}):n,e));var ht=(e,t,n)=>If(e,typeof t!="symbol"?t+"":t,n);var tc=Ca((qy,ec)=>{var Er=1e3,Tr=Er*60,Cr=Tr*60,dr=Cr*24,qf=dr*7,Ff=dr*365.25;ec.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return jf(e);if(n==="number"&&isFinite(e))return t.long?Uf(e):Bf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function jf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Ff;case"weeks":case"week":case"w":return n*qf;case"days":case"day":case"d":return n*dr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Cr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Tr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Er;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Bf(e){var t=Math.abs(e);return t>=dr?Math.round(e/dr)+"d":t>=Cr?Math.round(e/Cr)+"h":t>=Tr?Math.round(e/Tr)+"m":t>=Er?Math.round(e/Er)+"s":e+"ms"}function Uf(e){var t=Math.abs(e);return t>=dr?Ys(e,t,dr,"day"):t>=Cr?Ys(e,t,Cr,"hour"):t>=Tr?Ys(e,t,Tr,"minute"):t>=Er?Ys(e,t,Er,"second"):e+" ms"}function Ys(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var rc=Ca((Fy,nc)=>{function Wf(e){n.debug=n,n.default=n,n.coerce=c,n.disable=a,n.enable=s,n.enabled=i,n.humanize=tc(),n.destroy=u,Object.keys(e).forEach(f=>{n[f]=e[f]}),n.names=[],n.skips=[],n.formatters={};function t(f){let h=0;for(let y=0;y<f.length;y++)h=(h<<5)-h+f.charCodeAt(y),h|=0;return n.colors[Math.abs(h)%n.colors.length]}n.selectColor=t;function n(f){let h,y=null,$,S;function F(...B){if(!F.enabled)return;let Y=F,le=Number(new Date),U=le-(h||le);Y.diff=U,Y.prev=h,Y.curr=le,h=le,B[0]=n.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let M=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(W,E)=>{if(W==="%%")return"%";M++;let N=n.formatters[E];if(typeof N=="function"){let re=B[M];W=N.call(Y,re),B.splice(M,1),M--}return W}),n.formatArgs.call(Y,B),(Y.log||n.log).apply(Y,B)}return F.namespace=f,F.useColors=n.useColors(),F.color=n.selectColor(f),F.extend=r,F.destroy=n.destroy,Object.defineProperty(F,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:($!==n.namespaces&&($=n.namespaces,S=n.enabled(f)),S),set:B=>{y=B}}),typeof n.init=="function"&&n.init(F),F}function r(f,h){let y=n(this.namespace+(typeof h>"u"?":":h)+f);return y.log=this.log,y}function s(f){n.save(f),n.namespaces=f,n.names=[],n.skips=[];let h=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of h)y[0]==="-"?n.skips.push(y.slice(1)):n.names.push(y)}function o(f,h){let y=0,$=0,S=-1,F=0;for(;y<f.length;)if($<h.length&&(h[$]===f[y]||h[$]==="*"))h[$]==="*"?(S=$,F=y,$++):(y++,$++);else if(S!==-1)$=S+1,F++,y=F;else return!1;for(;$<h.length&&h[$]==="*";)$++;return $===h.length}function a(){let f=[...n.names,...n.skips.map(h=>"-"+h)].join(",");return n.enable(""),f}function i(f){for(let h of n.skips)if(o(f,h))return!1;for(let h of n.names)if(o(f,h))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}nc.exports=Wf});var sc=Ca((tn,Zs)=>{tn.formatArgs=Hf;tn.save=Gf;tn.load=Vf;tn.useColors=zf;tn.storage=Kf();tn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();tn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function zf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Hf(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Zs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}tn.log=console.debug||console.log||(()=>{});function Gf(e){try{e?tn.storage.setItem("debug",e):tn.storage.removeItem("debug")}catch{}}function Vf(){let e;try{e=tn.storage.getItem("debug")||tn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Kf(){try{return localStorage}catch{}}Zs.exports=rc()(tn);var{formatters:Yf}=Zs.exports;Yf.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Zr=globalThis,Ws=Zr.trustedTypes,Fl=Ws?Ws.createPolicy("lit-html",{createHTML:e=>e}):void 0,Oa="$lit$",Ln=`lit$${Math.random().toFixed(9).slice(2)}$`,La="?"+Ln,Mf=`<${La}>`,ir=document,Xr=()=>ir.createComment(""),Qr=e=>e===null||typeof e!="object"&&typeof e!="function",Ia=Array.isArray,Hl=e=>Ia(e)||typeof e?.[Symbol.iterator]=="function",Ra=`[ 	
\f\r]`,Yr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,jl=/-->/g,Bl=/>/g,or=RegExp(`>|${Ra}(?:([^\\s"'>=/]+)(${Ra}*=${Ra}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ul=/'/g,Wl=/"/g,Gl=/^(?:script|style|textarea|title)$/i,Pa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=Pa(1),es=Pa(2),Oy=Pa(3),_n=Symbol.for("lit-noChange"),Ot=Symbol.for("lit-nothing"),zl=new WeakMap,ar=ir.createTreeWalker(ir,129);function Vl(e,t){if(!Ia(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fl!==void 0?Fl.createHTML(t):t}var Kl=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Yr;for(let i=0;i<n;i++){let c=e[i],u,f,h=-1,y=0;for(;y<c.length&&(a.lastIndex=y,f=a.exec(c),f!==null);)y=a.lastIndex,a===Yr?f[1]==="!--"?a=jl:f[1]!==void 0?a=Bl:f[2]!==void 0?(Gl.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=or):f[3]!==void 0&&(a=or):a===or?f[0]===">"?(a=s??Yr,h=-1):f[1]===void 0?h=-2:(h=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?or:f[3]==='"'?Wl:Ul):a===Wl||a===Ul?a=or:a===jl||a===Bl?a=Yr:(a=or,s=void 0);let $=a===or&&e[i+1].startsWith("/>")?" ":"";o+=a===Yr?c+Mf:h>=0?(r.push(u),c.slice(0,h)+Oa+c.slice(h)+Ln+$):c+Ln+(h===-2?i:$)}return[Vl(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Jr=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,f]=Kl(t,n);if(this.el=e.createElement(u,r),ar.currentNode=this.el.content,n===2||n===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=ar.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Oa)){let y=f[a++],$=s.getAttribute(h).split(Ln),S=/([.?@])?(.*)/.exec(y);c.push({type:1,index:o,name:S[2],strings:$,ctor:S[1]==="."?Hs:S[1]==="?"?Gs:S[1]==="@"?Vs:cr}),s.removeAttribute(h)}else h.startsWith(Ln)&&(c.push({type:6,index:o}),s.removeAttribute(h));if(Gl.test(s.tagName)){let h=s.textContent.split(Ln),y=h.length-1;if(y>0){s.textContent=Ws?Ws.emptyScript:"";for(let $=0;$<y;$++)s.append(h[$],Xr()),ar.nextNode(),c.push({type:2,index:++o});s.append(h[y],Xr())}}}else if(s.nodeType===8)if(s.data===La)c.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(Ln,h+1))!==-1;)c.push({type:7,index:o}),h+=Ln.length-1}o++}}static createElement(t,n){let r=ir.createElement("template");return r.innerHTML=t,r}};function lr(e,t,n=e,r){if(t===_n)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=Qr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=lr(e,s._$AS(e,t.values),s,r)),t}var zs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??ir).importNode(n,!0);ar.currentNode=s;let o=ar.nextNode(),a=0,i=0,c=r[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Sr(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Ks(o,this,t)),this._$AV.push(u),c=r[++i]}a!==c?.index&&(o=ar.nextNode(),a++)}return ar.currentNode=ir,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Sr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Ot,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=lr(this,t,n),Qr(t)?t===Ot||t==null||t===""?(this._$AH!==Ot&&this._$AR(),this._$AH=Ot):t!==this._$AH&&t!==_n&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Hl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ot&&Qr(this._$AH)?this._$AA.nextSibling.data=t:this.T(ir.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Jr.createElement(Vl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new zs(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=zl.get(t.strings);return n===void 0&&zl.set(t.strings,n=new Jr(t)),n}k(t){Ia(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Xr()),this.O(Xr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},cr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Ot,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Ot}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=lr(this,t,n,0),a=!Qr(t)||t!==this._$AH&&t!==_n,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=lr(this,i[r+c],n,c),u===_n&&(u=this._$AH[c]),a||(a=!Qr(u)||u!==this._$AH[c]),u===Ot?t=Ot:t!==Ot&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===Ot?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Hs=class extends cr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ot?void 0:t}},Gs=class extends cr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ot)}},Vs=class extends cr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=lr(this,t,n,0)??Ot)===_n)return;let r=this._$AH,s=t===Ot&&r!==Ot||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Ot&&(r===Ot||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ks=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){lr(this,t)}},Yl={M:Oa,P:Ln,A:La,C:1,L:Kl,R:zs,D:Hl,V:lr,I:Sr,H:cr,N:Gs,U:Vs,B:Hs,F:Ks},Nf=Zr.litHtmlPolyfillSupport;Nf?.(Jr,Sr),(Zr.litHtmlVersions??(Zr.litHtmlVersions=[])).push("3.3.1");var Ge=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Sr(t.insertBefore(Xr(),o),o,void 0,n??{})}return s._$AI(e),s};var ln="today",Gn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function mn(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function ur(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Zl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Xl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ql(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Jl(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var oc=Df(sc(),1);function At(e){return(0,oc.default)(`beads-ui:${e}`)}function vn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function pr(e,t){let n=vn(e.created_at),r=vn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function lc(e,t){let n=vn(e.created_at),r=vn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function cc(e,t){let n=vn(e.updated_at),r=vn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function uc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=vn(e.created_at),o=vn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function dc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Zf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ac(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function ic(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Zf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function pc(e,t){let n=ac(e),r=ac(t);if(n!==r)return n<r?-1:1;let s=ic(e),o=ic(t);if(s!==o)return s<o?-1:1;let a=vn(e&&e.created_at),i=vn(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Da=2**20;function Rr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-vn(e&&e.created_at)}function Xs(e){return(t,n)=>{let r=Rr(t,e),s=Rr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Ma(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Rr(i,n)-Da};if(!i)return{rank:Rr(a,n)+Da};let c=Rr(a,n),u=Rr(i,n),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:r.map((h,y)=>({bead_id:h.id,rank:y*Da}))}}function Na(e,t={}){let n=At(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||pr;function u(){for(let y of Array.from(a))try{y()}catch{}}function f(){s=Array.from(r.values()).sort(c)}function h(y){if(i||!y||y.id!==e)return;let $=Number(y.revision)||0;if(n("apply %s rev=%d",y.type,$),!($<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if($<=o)return;r.clear();let S=Array.isArray(y.issues)?y.issues:[];for(let F of S)F&&typeof F.id=="string"&&F.id.length>0&&r.set(F.id,F);f(),o=$,u();return}if(y.type==="upsert"){let S=y.issue;if(S&&typeof S.id=="string"&&S.id.length>0){let F=r.get(S.id);if(!F)r.set(S.id,S);else{let B=Number.isFinite(F.updated_at)?F.updated_at:0,Y=Number.isFinite(S.updated_at)?S.updated_at:0;if(B<=Y){for(let le of Object.keys(F))le in S||delete F[le];for(let[le,U]of Object.entries(S))F[le]=U}}f()}o=$,u()}else if(y.type==="delete"){let S=String(y.issue_id||"");S&&(r.delete(S),f()),o=$,u()}}}return{id:e,subscribe(y){return a.add(y),()=>{a.delete(y)}},applyPush:h,snapshot(){return s},size(){return r.size},getById(y){return r.get(y)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Qs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function fc(e){let t=At("subs"),n=new Map,r=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],h=Array.isArray(c.updated)?c.updated:[],y=Array.isArray(c.removed)?c.removed:[];for(let $ of Array.from(u)){let S=n.get($);if(!S)continue;let F=S.itemsById;for(let B of f)typeof B=="string"&&B.length>0&&F.set(B,!0);for(let B of h)typeof B=="string"&&B.length>0&&F.set(B,!0);for(let B of y)typeof B=="string"&&B.length>0&&F.delete(B)}}async function o(i,c){let u=Qs(c);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let h=n.get(i);if(h&&h.key!==u){let y=r.get(h.key);y&&(y.delete(i),y.size===0&&r.delete(h.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let f=r.get(u);f&&f.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(h){let y=n.get(i)||null;if(y){let $=r.get(y.key);$&&($.delete(i),$.size===0&&r.delete(y.key))}throw n.delete(i),h}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let h=n.get(i)||null;if(h){let y=r.get(h.key);y&&(y.delete(i),y.size===0&&r.delete(h.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Qs,selectors:{getIds(i){let c=n.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=n.get(i);return u?u.itemsById.has(c):!1},count(i){let c=n.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=n.get(i),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function _c(){let e=At("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let c of Array.from(r))try{c()}catch{}}function a(c,u,f){let h=u?Qs(u):"",y=n.get(c)||"",$=t.has(c);if(e("register %s key=%s (prev=%s)",c,h,y),$&&y&&h&&y!==h){let S=t.get(c);if(S)try{S.dispose()}catch{}let F=s.get(c);if(F){try{F()}catch{}s.delete(c)}let B=Na(c,f);t.set(c,B);let Y=B.subscribe(()=>o());s.set(c,Y)}else if(!$){let S=Na(c,f);t.set(c,S);let F=S.subscribe(()=>o());s.set(c,F)}return n.set(c,h),()=>i(c)}function i(c){e("unregister %s",c),n.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return r.add(c),()=>r.delete(c)}}}function mc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function gc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function bc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function qa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Xf(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Qf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function hc(e){let t=At("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Xf(r),a=Qf(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=qa(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?qa(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Jf=Object.freeze({workspace_config:{default_workspace:null}});function yc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Jf.workspace_config.default_workspace}}}function vc(e={}){let t=At("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:yc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?yc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==n.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===n.worker.show_closed_children[f])&&!i&&!c||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function wc(e){let t=At("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function c(u){return async(h,y)=>{let $=s++,S=Date.now();r.set($,{type:h,start_ts:S}),t("request start id=%d type=%s count=%d",$,h,n+1),a();let F=!1,B=()=>{F||(F=!0,r.delete($),i())},Y=setTimeout(()=>{F||(t("request TIMEOUT id=%d type=%s elapsed=%dms",$,h,Date.now()-S),B())},3e4);try{let le=await u(h,y),U=Date.now()-S;return t("request done id=%d type=%s elapsed=%dms",$,h,U),le}catch(le){let U=Date.now()-S;throw t("request error id=%d type=%s elapsed=%dms err=%o",$,h,U,le),le}finally{clearTimeout(Y),B()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([f,h])=>({id:f,type:h.type,elapsed_ms:u-h.start_ts}))}}}function ae(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Js(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(dc),c;switch(i){case"created_desc":return c.sort(pr),c;case"created_asc":return c.sort(lc),c;case"updated_desc":return c.sort(cc),c;case"priority":return c.sort(uc),c;case"manual":default:{let u=n();return u?c.sort(Xs(u)):c.sort(pr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Cn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function jt(e){let t=Cn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function cn(e,t){let n=Cn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function kc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Cn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function eo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function to(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=eo(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function no(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=kc(n);return{total:n.length,count:r,current:s,children:n}}function ro(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},f=r(Ma(i,c,u.order),a);s(u,f);let h=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(h&&h.conflict){let y={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};n.set(y);let $=r(Ma(i,c,y.order),a);s(y,$);let S=await t("ui-order-set",{expected_revision:y.revision,entries:$});S&&S.applied&&n.set({revision:typeof S.revision=="number"?S.revision:0,order:S.order||{}})}else h&&h.applied&&n.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function so(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Fa(e,t){return!t||typeof e!="string"||e.length===0||so(t.visible_labels).includes(e)?!0:so(t.hidden_labels).includes(e)?!1:!so(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function $c(e,t){return so(e).filter(n=>Fa(n,t))}function Vn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function e_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function t_(e,t,n,r,s){return l`<button
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
  </button>`}function oo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(pc):a;return l`
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
            ${i.map((c,u)=>n_(c,u+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var r_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ac={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},xc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},s_={review:"\u2713",skip:"\u2298"},Kn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function o_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Sc(e){let t=e&&e.fill||"none";return t==="none"?Kn.none:e&&e.stale===!0?Kn.stale:t==="dim"?Kn.dim:e&&e.glyph==="review"?Kn.review:e&&e.glyph==="skip"?Kn.skip:Kn.done}function a_(e){if(!e||e.fill==="none"||!e.approval_state)return Sc(e);let t=[];return e.glyph==="review"?t.push(Kn.review):e.glyph==="skip"&&t.push(Kn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function i_(e,t,n,r){let s=r_[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=s_[t&&t.glyph||""]||"",c="bar";o==="dim"?c+=` b-${s} dim`:o==="full"&&(c+=` b-${s} full`),a&&(c+=" stale"),n&&(c+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,f=n?`color: var(--stage-${s}-on)`:"",h=Ac[e]||e,y=r?Ec(t):null;if(!y)return l`
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
  `}function Ec(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ao(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=xc[e.route]||xc.spec_backed,o=e.stages,a=o_(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${Ac[u]||u} ${u==="plan"?a_(o[u]||{}):Sc(o[u]||{})}`).join(" \xB7 ")}`,c=!!r&&s.some(u=>Ec(o[u]||{})!==null);return l`
    <div
      class="stp"
      role=${c?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>i_(u,o[u]||{},u===a,r))}
    </div>
  `}function l_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Tc=2;function c_(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,Tc).join(", "),s=n.length-Tc,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function ja(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function io(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function In(e){return`${e.kind}:${io(e)}@${e.sha}`}function lo(e,t){if(!e)return null;let n=ja(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=ja(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${In(t)}`:"";return{kind:e.kind,label:i,title:`${c}${u}`}}function Cc(e,t){let n=lo(e,t);return n?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function u_(e){if(!e)return null;let t=ja(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${In(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function d_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Vn(n,"route")){let i=r.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Vn(n,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Vn(n,"pr")){let i=r.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Cc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${In(i)}`}
        >${`exec ${i.kind==="delegated"?io(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of $c(e.labels,n))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Vn(n,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Vn(n,"blocked")&&s.push(...c_(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Vn(n,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function p_(e){let t=cn(e.created_at),n=cn(e.updated_at);return!t&&!n?"":l`<span class="board-card__times">
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
  </span>`}function f_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return oo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:p_(e),empty_label:"children \uC5C6\uC74C",childChips:Ba,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Ba(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return lo(t,n)?l`<span class="board-card__roll-child-chips">
    ${Cc(t,n)}
    ${u_(n)}
  </span>`:null}function co(e,t){let n=l_(e.priority);return l`
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
      ${e.workflow&&Vn(t.policy||null,"stepper")?ao(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
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
        ${e.items.map(o=>co(o,t))}
      </div>
    </section>
  `}function Rc(e,t,n){return l`
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
  `}function Oc(e,t,n){return l`
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
  `}var h_=200,y_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},v_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Lc="beads-ui.board.sort",Ic=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function w_(){try{let e=window.localStorage.getItem(Lc);if(e&&Ic.has(e))return e}catch{}return"created_desc"}function Pc(e,t){let n=At("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,h=t.openDoc,y=t.closedRange||ln,$=s?Js(s,a):null,S=ro({transport:o,uiOrderStore:a}),F=[],B=[],Y=[],le=[],U=[],M=[],D=!1,W=0,E=w_(),N=new Map,re=new Map,J=new Map,_e=new Set,fe={search:"",priority:"",type:"",labels:[]},ee=!1,he=null;function $e(x){return String(x.status||"open")==="open"}function be(x){let G=String(x.status||"open");return G==="open"||G==="blocked"}function ne(x){let G=fe.search.trim().toLowerCase(),Ae=fe.priority,A=fe.type,O=fe.labels;return x.filter(k=>{if(G){let I=String(k.id||"").toLowerCase(),z=String(k.title||"").toLowerCase();if(!I.includes(G)&&!z.includes(G))return!1}if(Ae!==""&&String(k.priority)!==Ae||A!==""&&String(k.issue_type||"")!==A)return!1;if(O.length>0){let I=Array.isArray(k.labels)?k.labels:[];if(!O.some(z=>I.includes(z)))return!1}return!0})}function Se(){let x=new Set;for(let G of[F,B,Y,le,U,M])for(let Ae of G){let A=Array.isArray(Ae.labels)?Ae.labels:[];for(let O of A)typeof O=="string"&&O.length>0&&x.add(O)}return Array.from(x).sort()}function xe(){return fe.search.trim()!==""||fe.priority!==""||fe.type!==""||fe.labels.length>0}function V(){try{if($){let x=$.selectBoardColumn("tab:board:in-progress","in_progress",E),G=$.selectBoardColumn("tab:board:blocked","blocked",E).filter(be),Ae=new Set(x.map(ve=>ve.id)),A=$.selectBoardColumn("tab:board:ready","ready",E).filter(ve=>$e(ve)&&!Ae.has(ve.id)),O=$.selectBoardColumn("tab:board:resolved","resolved",E),k=$.selectBoardColumn("tab:board:deferred","deferred",E),I=$.selectBoardColumn("tab:board:closed","closed").slice(0,h_),z=[...G,...A,...x,...O,...I];X(z);let pe=new Set;for(let ve of z)ve&&ve.id&&!eo(ve)&&pe.add(ve.id);let ce=!xe();F=ce?ts(G,pe):G,B=ce?ts(A,pe):A,Y=ce?ts(x,pe):x,le=ce?ts(O,pe):O,U=k,W=k.length,M=ce?ts(I,pe):I,N=new Map;for(let ve of F)N.set(ve.id,"open");for(let ve of B)N.set(ve.id,"open");for(let ve of Y)N.set(ve.id,"in_progress");for(let ve of le)N.set(ve.id,"resolved");for(let ve of U)N.set(ve.id,"deferred");for(let ve of M)N.set(ve.id,"closed");re=new Map;for(let ve of F)re.set(ve.id,"blocked-col");for(let ve of B)re.set(ve.id,"ready-col");for(let ve of Y)re.set(ve.id,"in-progress-col");for(let ve of le)re.set(ve.id,"resolved-col");for(let ve of M)re.set(ve.id,"closed-col")}dt()}catch{F=[],B=[],Y=[],le=[],U=[],M=[],J=new Map,dt()}}function X(x){J=to(x)}function ye(x){return no(J,x)}function me(x){return!_e.has(x)}function Fe(x,G){x.preventDefault(),x.stopPropagation(),_e.has(G)?_e.delete(G):_e.add(G),dt()}function ue(x,G){x.preventDefault(),x.stopPropagation(),r(G)}function ze(x,G){x.preventDefault(),x.stopPropagation(),r(G)}function tt(x,G){he||r(G)}function ut(x,G){x.preventDefault(),x.stopPropagation(),k_(G).then(Ae=>{Ae&&ae("\uBCF5\uC0AC\uB428","success",1200)})}function C(x,G){he=G,x.dataTransfer&&(x.dataTransfer.setData("text/plain",G),x.dataTransfer.effectAllowed="move"),x.target.classList.add("board-card--dragging")}function se(x){x.target.classList.remove("board-card--dragging"),at(),setTimeout(()=>{he=null},0)}function we(x){let G=String(x.target.value||"");!G||G===y||(y=G,u&&u(G),dt())}function Me(){return i?i.get():null}function De(x){let G=c?c.get():null,Ae=G?G.cleanup_failed:null;if(!Ae||typeof Ae!="object"||Array.isArray(Ae))return null;let A=Ae[x];return!A||typeof A!="object"||Array.isArray(A)?null:A}let Be={onCardClick:tt,onCopyId:ut,onDragStart:C,onDragEnd:se,onClosedRangeChange:we,rollupFor:ye,isExpanded:me,onRollupToggle:Fe,onChildClick:ue,onFromChipClick:ze,onOpenDoc:h?(x,G)=>h(G):void 0,cleanupFailureFor:De,get policy(){return Me()}};function He(x,G){he||(Ue(),r(G))}function st(x,G){x.preventDefault(),x.stopPropagation(),Ue(),r(G)}let mt={...Be,onCardClick:He,onChildClick:st,onFromChipClick:st,onOpenDoc:h?(x,G)=>{Ue(),h(G)}:void 0,get policy(){return Me()}};function te(x){let G=x.target,Ae=e.querySelector(".board-filter__labels");G&&Ae&&Ae.contains(G)||Ye()}function Q(x){x.key==="Escape"&&Ye()}function Le(){ee||(ee=!0,document.addEventListener("mousedown",te),document.addEventListener("keydown",Q),dt())}function Ye(){ee&&(ee=!1,document.removeEventListener("mousedown",te),document.removeEventListener("keydown",Q),dt())}function Oe(x){x.key==="Escape"&&Ue()}function ke(){D||(D=!0,document.addEventListener("keydown",Oe),dt())}function Ue(){D&&(D=!1,document.removeEventListener("keydown",Oe),dt())}let Ve={onClose:Ue,onOverlayClick(x){x.target===x.currentTarget&&Ue()}},Qe={onSearchInput(x){fe.search=String(x.target.value||""),V()},onPriorityChange(x){fe.priority=String(x.target.value||""),V()},onTypeChange(x){fe.type=String(x.target.value||""),V()},onSortChange(x){let G=String(x.target.value||"");if(!(!Ic.has(G)||G===E)){E=G;try{window.localStorage.setItem(Lc,G)}catch{}V()}},onDeferredToggle(){D?Ue():ke()},onLabelMenuToggle(){ee?Ye():Le()},onLabelToggle(x){let G=fe.labels.indexOf(x);G===-1?fe.labels.push(x):fe.labels.splice(G,1),V()},onLabelClear(){fe.labels.length!==0&&(fe.labels=[],V())},onNewIssue(){f&&f()}};function Ze(){return l`
      <div class="board-view">
        ${Oc(fe,Qe,{sort_mode:E,deferred_popup_open:D,deferred_count:W,label_options:Se(),label_menu_open:ee})}
        <div class="board-root">
          ${Or({title:"Blocked",id:"blocked-col",items:ne(F)},Be)}
          ${Or({title:"Ready",id:"ready-col",items:ne(B)},Be)}
          ${Or({title:"In progress",id:"in-progress-col",items:ne(Y)},Be)}
          ${Or({title:"Resolved",id:"resolved-col",items:ne(le)},Be)}
          ${Or({title:"Closed",id:"closed-col",items:ne(M),is_closed:!0,closed_range:y},Be)}
        </div>
        ${D?Rc({items:ne(U),count:W},mt,Ve):""}
      </div>
    `}function dt(){Ge(Ze(),e),Tt()}function Tt(){try{let x=e.querySelector("#deferred-popup");x&&!x.open&&(typeof x.showModal=="function"?x.showModal():x.setAttribute("open",""));let G=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ae of G)Array.from(Ae.querySelectorAll(".board-card")).forEach((O,k)=>{O.tabIndex=k===0?0:-1})}catch{}}async function bt(x,G){if(!o){ae("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:x,status:G}),ae("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ae){n("update-status failed: %o",Ae),ae("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function pt(x){switch(x){case"blocked-col":return F;case"ready-col":return B;case"in-progress-col":return Y;case"resolved-col":return le;default:return[]}}function Rt(x,G,Ae){if(!o||!a)return;let A=pt(x),O=A.find(ce=>ce.id===G);if(!O)return;let k=A.filter(ce=>ce.id!==G),I=Ae.closest?Ae.closest(".board-card"):null,z=k.length;if(I){let ce=I.getAttribute("data-issue-id");if(ce===G)return;let ve=k.findIndex(et=>et.id===ce);ve>=0&&(z=ve)}let pe=k.slice();pe.splice(z,0,O),S.applyReorder(G,pe,z)}function at(){for(let x of Array.from(e.querySelectorAll(".board-column--drag-over")))x.classList.remove("board-column--drag-over")}let We=null;e.addEventListener("dragover",x=>{x.preventDefault(),x.dataTransfer&&(x.dataTransfer.dropEffect="move");let Ae=x.target.closest(".board-column");Ae&&Ae!==We&&(We&&We.classList.remove("board-column--drag-over"),Ae.classList.add("board-column--drag-over"),We=Ae)}),e.addEventListener("dragleave",x=>{let G=x.relatedTarget;(!G||!e.contains(G))&&We&&(We.classList.remove("board-column--drag-over"),We=null)}),e.addEventListener("drop",x=>{x.preventDefault(),We&&(We.classList.remove("board-column--drag-over"),We=null);let G=x.target,Ae=G.closest(".board-column");if(!Ae)return;let A=x.dataTransfer?.getData("text/plain")||"";if(!A)return;let O=Ae.id,k=re.get(A);if(k&&k===O){if(v_.has(O)){if(E!=="manual"){ae("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Rt(O,A,G)}return}let I=y_[O];if(!I){ae("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}N.get(A)!==I&&bt(A,I)}),e.addEventListener("keydown",x=>{let G=x.target;if(!(G instanceof HTMLElement))return;let Ae=String(G.tagName||"").toLowerCase();if(Ae==="input"||Ae==="textarea"||Ae==="select"||Ae==="button"||Ae==="a"||G.isContentEditable===!0)return;let A=G.closest(".board-card");if(!A)return;let O=String(x.key||"");if(O==="Enter"||O===" "){x.preventDefault();let pe=A.getAttribute("data-issue-id");pe&&r(pe);return}if(O!=="ArrowUp"&&O!=="ArrowDown"&&O!=="ArrowLeft"&&O!=="ArrowRight")return;x.preventDefault();let k=A.closest(".board-column");if(!k)return;let I=Array.from(k.querySelectorAll(".board-card")),z=I.indexOf(A);if(O==="ArrowDown"&&z<I.length-1){Te(A,I[z+1]);return}if(O==="ArrowUp"&&z>0){Te(A,I[z-1]);return}if(O==="ArrowLeft"||O==="ArrowRight"){let pe=Array.from(e.querySelectorAll(".board-column")),ce=pe.indexOf(k),ve=O==="ArrowRight"?1:-1,et=ce+ve;for(;et>=0&&et<pe.length;){let Ke=pe[et].querySelector(".board-card");if(Ke){Te(A,Ke);return}et+=ve}}});function Te(x,G){try{x.tabIndex=-1,G.tabIndex=0,G.focus()}catch{}}let P=null;$&&$.subscribe&&(P=$.subscribe(()=>{try{V()}catch{}}));let Z=null;i&&i.subscribe&&(Z=i.subscribe(()=>{try{V()}catch{}}));let ie=null;return c&&c.subscribe&&(ie=c.subscribe(()=>{dt()})),{async load(){n("load"),V()},clear(){Ye(),Ue(),P&&(P(),P=null),Z&&(Z(),Z=null),ie&&(ie(),ie=null),e.replaceChildren(),F=[],B=[],Y=[],le=[],U=[],M=[],N=new Map,re=new Map}}}function ts(e,t){return e.filter(n=>{let r=eo(n);return!(r&&t.has(r))})}async function k_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function un(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function fr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ns(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function $_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${fr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${fr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(c=>{let u=f=>{typeof n.close=="function"&&n.close(),n.remove(),c(f)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Pn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await $_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var x_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Dc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},A_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Pt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Et(e){return typeof e=="string"&&e.length>0?e:null}function Lr(e){return e.startsWith("gpt-")?e.slice(4):e}function $t(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Nc(e,t,n){let r=Et(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Et(n[e]);return s===null?null:{value:s,source:"global"}}function rs(e,t,n,r){return Nc(e,t,n)||{value:r,source:"base"}}function Ua(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Pt(s?.[t])){let a=Et(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Pt(s)){for(let a of Object.values(s))if(Pt(a)){let i=Et(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Et(r?.runners?.[o]?.models?.[e]?.id)||e}function S_(e,t){return Et(t?.review?.reviewers?.[e]?.model)||e}function Ir(e,t,n=!1){if(e==="default")return $t(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Lr(e):e;return $t(e,t,r,e,"explicit")}function qc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Pt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(Pt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function E_(e,t){let n=[],r=e?.implementation?.model_catalog;Pt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Pt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function T_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of E_(t,n)){let o=qc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Wa(e){return $t(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Mc(e,t,n){let r=Nc(e,t,n);return r?Ir(r.value,r.source):$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function nn(e){let t=Pt(e.pin)?e.pin:{},n=Pt(e.global)?e.global:{},r=Pt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Pt(r.session)?r.session:null,o=r?.supported===!0&&Pt(r.orchestration)?r.orchestration:null,a=Pt(e.runner_catalog)?e.runner_catalog:null,i=Et(n.quick_fix_impl_model),c=T_(i,s,a),u={};if(s){let f=rs("workflow_mode",t,n,Et(s.workflow_mode_default));u.workflow_mode=f.source==="base"?$t(f.value,"base",f.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",f.value,"default"):Ir(f.value,f.source);for(let U of["spec_review","plan_review","impl_review"]){let M=`${U}_model`,D=Et(U==="plan_review"?f.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),W=rs(M,t,n,D);if(W.value===null)u[M]=$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(W.value!=="self"&&W.value!=="skip"&&!Pt(s.review?.reviewers?.[W.value]))u[M]=Wa($t(W.value,W.source,"",null,"explicit"));else{let E=S_(W.value,s);u[M]=$t(W.value,W.source,Lr(E),E,W.source==="base"?"default":"explicit")}}for(let[U,M]of Object.entries(Dc)){let D=u[M].value;if(D==="self"||D==="skip"){u[U]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let W=Et(s.review?.reviewers?.[D||""]?.effort),E=rs(U,t,n,W);u[U]=E.value===null?$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):$t(E.value,E.source,E.value,E.value,E.source==="base"?"default":"explicit")}let h=Pt(s.implementation?.default)?s.implementation.default:{},y=Et(e.route),$=y!==null&&["quick_fix","spec_backed","full_plan"].includes(y),S=Pt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},F=$&&Pt(S[y])?S[y]:{};for(let U of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let M=rs(U,t,n,U==="impl_dispatch"?Et(F.dispatch)||Et(h.dispatch):Et(h[U.replace("impl_","")]));u[U]=M.value===null?$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):$t(M.value,M.source,M.value,M.value,M.source==="base"?"default":"explicit")}let B=Et(t.impl_runtime),Y=B==="inherit"?Et(e.controller_runtime):B,le=y==="quick_fix"&&Et(t.impl_dispatch)===null&&c.runtime!==null&&(B===null||Y===c.runtime);if(le){let U=c.runtime,M=i;u.impl_dispatch=$t("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(u.impl_runtime=$t(U,"global",`${U} (\uC720\uB3C4)`,U,"explicit")),Et(t.impl_model)===null&&(u.impl_model=$t(M,"global",M,M,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let U of["impl_runtime","impl_model","impl_effort","impl_speed"])u[U]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!le&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let U=u.impl_runtime.value==="inherit"?Et(e.controller_runtime):u.impl_runtime.value,M=U?qc(U,s,a):[];if(u.impl_model.value!=="auto"&&M.length>0&&!M.includes(u.impl_model.value))u.impl_model=Wa(u.impl_model);else{let D=Ua(u.impl_model.value,U,s,a);u.impl_model.display=Lr(D),u.impl_model.full_value=D}}if(u.impl_effort.value==="auto"){let U=Et(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),M=U?Et(s.implementation?.effort_by_transport?.[U]?.auto):null;M&&!A_.has(M)?(u.impl_effort.display=`${M} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=M,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?$t("default","base","default (\uC77C\uBC18)","default","default"):Ir("default",u.impl_speed.source))}}else for(let f of x_.filter(h=>!h.startsWith("orchestration_")))u[f]=Mc(f,t,n);if(!s){for(let[f,h]of Object.entries(Dc))(u[h].value==="self"||u[h].value==="skip")&&(u[f]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let f of["impl_runtime","impl_model","impl_effort","impl_speed"])u[f]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let f of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[f]=Mc(f,t,n);continue}let h=f.replace("orchestration_",""),y=Et(o[h]),$=rs(f,t,n,y);if(f==="orchestration_effort"&&$.source==="base"){u[f]=$t(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if($.value===null){u[f]=$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(f==="orchestration_model"){let S=$.source==="base"?Et(o.model_id)||$.value:Ua($.value,null,s,a);u[f]=$t($.value,$.source,Lr(S),S,$.source==="base"?"default":"explicit");continue}if($.value==="default"){u[f]=$.source==="base"?$t("default","base","default (\uC77C\uBC18)","default","default"):Ir("default",$.source);continue}u[f]=Ir($.value,$.source)}if(s)if(i===null){let f=u.orchestration_model.full_value;u.quick_fix_impl_model=$t(null,"base",f===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Lr(f)})`,null,"default")}else if(c.runtime!==null){let f=Ua(i,c.runtime,s,a);u.quick_fix_impl_model=$t(i,"global",Lr(f),f,"explicit")}else c.offered?u.quick_fix_impl_model=Wa($t(i,"global","",null,"explicit")):u.quick_fix_impl_model=Ir(i,"global");return u}function C_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function uo(e){let t=Pt(e.pin)?e.pin:{},n=Pt(e.global)?e.global:{},r=Pt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=h=>{let y={...r,...h};return nn({pin:e.layer==="pin"?y:t,global:e.layer==="pin"?n:y,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],u=Et(o[e.key]),f=[...e.choices];return u!==null&&!f.includes(u)&&f.unshift(u),{unset_label:C_(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:f.map(h=>{let y=s({...o,[e.key]:h})[e.key];return{value:h,label:y.display,full_value:y.full_value}})}}function Pr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let c=!1,u=h=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(h))},f=()=>u(r.value.trim());o.addEventListener("click",f),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",h=>{h.key==="Enter"&&(h.ctrlKey||h.metaKey)&&(h.preventDefault(),f())}),t.addEventListener("cancel",h=>{h.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Wc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Dn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],ss=[...Dn,"reasoning_output_tokens"],R_={codex:["implementation","review-consult"],claude:["subagent"]};function za(e){let t=0;for(let n of Dn)t+=Ft(e?.[n]);return t}function O_(e){return!e||typeof e!="object"?!1:Dn.some(t=>Number.isFinite(e[t]))}function Fc(e){return!e||typeof e!="object"?!1:ss.some(t=>Number.isFinite(e[t]))}function L_(e){let t={};for(let n of ss)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function jc(e){let t={};for(let n of ss)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Bc(e,t){return e==="codex"?Ft(t.input_tokens)+Ft(t.output_tokens):za(t)}function I_(e){return e==="claude"?"Claude":"Codex"}function P_(e){return`\u03C4 ${zc(e)}`}function D_(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${Ft(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${Ft(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Wc),o.join(`
`)}function Bt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${I_(n)} ${P_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:D_(n,r)})}return t}function fo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of ss)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=Ft(i.breakdown[c])+Ft(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ha(e){return!e||typeof e!="object"?null:gn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function M_(e){return e==="codex"?"codex":"claude"}function Rn(){return{subtotal:0,breakdown:L_(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function po(e,t,n){e.subtotal+=t.subtotal;for(let r of ss)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ft(e.breakdown[r])+Ft(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Uc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function zc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Dr(e){return O_(e)?`\u03C4 ${zc(za(e))}`:null}function Mn(e){let t=Dr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function os(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${za(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Wc),n.join(`
`)}function gn(e,t){let n={claude:Rn(),codex:Rn()},r={orchestrator:{claude:Rn(),codex:Rn()},implementation:{claude:Rn(),codex:Rn()},"review-consult":{claude:Rn(),codex:Rn()},subagent:{claude:Rn(),codex:Rn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Fc(c)){let f=M_(i.runner),h=jc(c),y={provider:f,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:h,subtotal:Bc(f,h)};h.replayed===!0&&(y.replayed=!0),typeof i.model=="string"&&(y.model=i.model),typeof i.session_id=="string"&&(y.session_id=i.session_id),po(n[f],y,!0),po(r.orchestrator[f],y,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let f of u){let h=f&&f.provider==="claude"?"claude":"codex";if(!f||f.provider!=="codex"&&f.provider!=="claude"||!R_[h].includes(f.role)||!Fc(f.usage))continue;let y=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!y||s.has(y))continue;s.add(y);let $=jc(f.usage),S={provider:h,role:f.role,attempt_id:String(i.attempt_id||""),usage:$,subtotal:Bc(h,$)};S.receipt_id=y,typeof f.agent_type=="string"&&(S.agent_type=f.agent_type),typeof f.agent_id=="string"&&(S.agent_id=f.agent_id),typeof f.model=="string"&&(S.model=f.model),typeof f.effort=="string"&&f.effort.trim().length>0&&(S.effort=f.effort),typeof f.session_id=="string"?S.session_id=f.session_id:typeof f.thread_id=="string"&&(S.session_id=f.thread_id),typeof f.turn_id=="string"&&(S.turn_id=f.turn_id),(typeof f.completed_at=="string"||typeof f.completed_at=="number"&&Number.isFinite(f.completed_at))&&(S.completed_at=f.completed_at),$.replayed===!0&&(S.replayed=!0),po(n[h],S,!1),po(r[S.role][h],S,!1)}}let o={};for(let i of["claude","codex"]){let c=n[i];if(c.legs.length===0)continue;let u=Uc(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let c={};for(let u of["claude","codex"]){let f=r[i][u];f.legs.length>0&&(c[u]={...Uc(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:Jc,setPrototypeOf:Hc,isFrozen:N_,getPrototypeOf:q_,getOwnPropertyDescriptor:F_}=Object,{freeze:Yt,seal:bn,create:Qa}=Object,{apply:Ja,construct:ei}=typeof Reflect<"u"&&Reflect;Yt||(Yt=function(t){return t});bn||(bn=function(t){return t});Ja||(Ja=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});ei||(ei=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var _o=Zt(Array.prototype.forEach),j_=Zt(Array.prototype.lastIndexOf),Gc=Zt(Array.prototype.pop),as=Zt(Array.prototype.push),B_=Zt(Array.prototype.splice),go=Zt(String.prototype.toLowerCase),Ga=Zt(String.prototype.toString),Va=Zt(String.prototype.match),is=Zt(String.prototype.replace),U_=Zt(String.prototype.indexOf),W_=Zt(String.prototype.trim),wn=Zt(Object.prototype.hasOwnProperty),Kt=Zt(RegExp.prototype.test),ls=z_(TypeError);function Zt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Ja(e,t,r)}}function z_(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ei(e,n)}}function nt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:go;Hc&&Hc(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(N_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function H_(e){for(let t=0;t<e.length;t++)wn(e,t)||(e[t]=null);return e}function Nn(e){let t=Qa(null);for(let[n,r]of Jc(e))wn(e,n)&&(Array.isArray(r)?t[n]=H_(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Nn(r):t[n]=r);return t}function cs(e,t){for(;e!==null;){let r=F_(e,t);if(r){if(r.get)return Zt(r.get);if(typeof r.value=="function")return Zt(r.value)}e=q_(e)}function n(){return null}return n}var Vc=Yt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ka=Yt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ya=Yt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),G_=Yt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Za=Yt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),V_=Yt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Kc=Yt(["#text"]),Yc=Yt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Xa=Yt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Zc=Yt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),mo=Yt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),K_=bn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Y_=bn(/<%[\w\W]*|[\w\W]*%>/gm),Z_=bn(/\$\{[\w\W]*/gm),X_=bn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Q_=bn(/^aria-[\-\w]+$/),eu=bn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),J_=bn(/^(?:\w+script|data):/i),em=bn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),tu=bn(/^html$/i),tm=bn(/^[a-z][.\w]*(-[.\w]+)+$/i),Xc=Object.freeze({__proto__:null,ARIA_ATTR:Q_,ATTR_WHITESPACE:em,CUSTOM_ELEMENT:tm,DATA_ATTR:X_,DOCTYPE_NAME:tu,ERB_EXPR:Y_,IS_ALLOWED_URI:eu,IS_SCRIPT_OR_DATA:J_,MUSTACHE_EXPR:K_,TMPLIT_EXPR:Z_}),us={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},nm=function(){return typeof window>"u"?null:window},rm=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Qc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function nu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:nm(),t=Ee=>nu(Ee);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==us.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:h,DOMParser:y,trustedTypes:$}=e,S=c.prototype,F=cs(S,"cloneNode"),B=cs(S,"remove"),Y=cs(S,"nextSibling"),le=cs(S,"childNodes"),U=cs(S,"parentNode");if(typeof a=="function"){let Ee=n.createElement("template");Ee.content&&Ee.content.ownerDocument&&(n=Ee.content.ownerDocument)}let M,D="",{implementation:W,createNodeIterator:E,createDocumentFragment:N,getElementsByTagName:re}=n,{importNode:J}=r,_e=Qc();t.isSupported=typeof Jc=="function"&&typeof U=="function"&&W&&W.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:fe,ERB_EXPR:ee,TMPLIT_EXPR:he,DATA_ATTR:$e,ARIA_ATTR:be,IS_SCRIPT_OR_DATA:ne,ATTR_WHITESPACE:Se,CUSTOM_ELEMENT:xe}=Xc,{IS_ALLOWED_URI:V}=Xc,X=null,ye=nt({},[...Vc,...Ka,...Ya,...Za,...Kc]),me=null,Fe=nt({},[...Yc,...Xa,...Zc,...mo]),ue=Object.seal(Qa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ze=null,tt=null,ut=Object.seal(Qa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),C=!0,se=!0,we=!1,Me=!0,De=!1,Be=!0,He=!1,st=!1,mt=!1,te=!1,Q=!1,Le=!1,Ye=!0,Oe=!1,ke="user-content-",Ue=!0,Ve=!1,Qe={},Ze=null,dt=nt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Tt=null,bt=nt({},["audio","video","img","source","image","track"]),pt=null,Rt=nt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),at="http://www.w3.org/1998/Math/MathML",We="http://www.w3.org/2000/svg",Te="http://www.w3.org/1999/xhtml",P=Te,Z=!1,ie=null,x=nt({},[at,We,Te],Ga),G=nt({},["mi","mo","mn","ms","mtext"]),Ae=nt({},["annotation-xml"]),A=nt({},["title","style","font","a","script"]),O=null,k=["application/xhtml+xml","text/html"],I="text/html",z=null,pe=null,ce=n.createElement("form"),ve=function(R){return R instanceof RegExp||R instanceof Function},et=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(pe&&pe===R)){if((!R||typeof R!="object")&&(R={}),R=Nn(R),O=k.indexOf(R.PARSER_MEDIA_TYPE)===-1?I:R.PARSER_MEDIA_TYPE,z=O==="application/xhtml+xml"?Ga:go,X=wn(R,"ALLOWED_TAGS")?nt({},R.ALLOWED_TAGS,z):ye,me=wn(R,"ALLOWED_ATTR")?nt({},R.ALLOWED_ATTR,z):Fe,ie=wn(R,"ALLOWED_NAMESPACES")?nt({},R.ALLOWED_NAMESPACES,Ga):x,pt=wn(R,"ADD_URI_SAFE_ATTR")?nt(Nn(Rt),R.ADD_URI_SAFE_ATTR,z):Rt,Tt=wn(R,"ADD_DATA_URI_TAGS")?nt(Nn(bt),R.ADD_DATA_URI_TAGS,z):bt,Ze=wn(R,"FORBID_CONTENTS")?nt({},R.FORBID_CONTENTS,z):dt,ze=wn(R,"FORBID_TAGS")?nt({},R.FORBID_TAGS,z):Nn({}),tt=wn(R,"FORBID_ATTR")?nt({},R.FORBID_ATTR,z):Nn({}),Qe=wn(R,"USE_PROFILES")?R.USE_PROFILES:!1,C=R.ALLOW_ARIA_ATTR!==!1,se=R.ALLOW_DATA_ATTR!==!1,we=R.ALLOW_UNKNOWN_PROTOCOLS||!1,Me=R.ALLOW_SELF_CLOSE_IN_ATTR!==!1,De=R.SAFE_FOR_TEMPLATES||!1,Be=R.SAFE_FOR_XML!==!1,He=R.WHOLE_DOCUMENT||!1,te=R.RETURN_DOM||!1,Q=R.RETURN_DOM_FRAGMENT||!1,Le=R.RETURN_TRUSTED_TYPE||!1,mt=R.FORCE_BODY||!1,Ye=R.SANITIZE_DOM!==!1,Oe=R.SANITIZE_NAMED_PROPS||!1,Ue=R.KEEP_CONTENT!==!1,Ve=R.IN_PLACE||!1,V=R.ALLOWED_URI_REGEXP||eu,P=R.NAMESPACE||Te,G=R.MATHML_TEXT_INTEGRATION_POINTS||G,Ae=R.HTML_INTEGRATION_POINTS||Ae,ue=R.CUSTOM_ELEMENT_HANDLING||{},R.CUSTOM_ELEMENT_HANDLING&&ve(R.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ue.tagNameCheck=R.CUSTOM_ELEMENT_HANDLING.tagNameCheck),R.CUSTOM_ELEMENT_HANDLING&&ve(R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ue.attributeNameCheck=R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),R.CUSTOM_ELEMENT_HANDLING&&typeof R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ue.allowCustomizedBuiltInElements=R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),De&&(se=!1),Q&&(te=!0),Qe&&(X=nt({},Kc),me=[],Qe.html===!0&&(nt(X,Vc),nt(me,Yc)),Qe.svg===!0&&(nt(X,Ka),nt(me,Xa),nt(me,mo)),Qe.svgFilters===!0&&(nt(X,Ya),nt(me,Xa),nt(me,mo)),Qe.mathMl===!0&&(nt(X,Za),nt(me,Zc),nt(me,mo))),R.ADD_TAGS&&(typeof R.ADD_TAGS=="function"?ut.tagCheck=R.ADD_TAGS:(X===ye&&(X=Nn(X)),nt(X,R.ADD_TAGS,z))),R.ADD_ATTR&&(typeof R.ADD_ATTR=="function"?ut.attributeCheck=R.ADD_ATTR:(me===Fe&&(me=Nn(me)),nt(me,R.ADD_ATTR,z))),R.ADD_URI_SAFE_ATTR&&nt(pt,R.ADD_URI_SAFE_ATTR,z),R.FORBID_CONTENTS&&(Ze===dt&&(Ze=Nn(Ze)),nt(Ze,R.FORBID_CONTENTS,z)),Ue&&(X["#text"]=!0),He&&nt(X,["html","head","body"]),X.table&&(nt(X,["tbody"]),delete ze.tbody),R.TRUSTED_TYPES_POLICY){if(typeof R.TRUSTED_TYPES_POLICY.createHTML!="function")throw ls('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof R.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ls('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=R.TRUSTED_TYPES_POLICY,D=M.createHTML("")}else M===void 0&&(M=rm($,s)),M!==null&&typeof D=="string"&&(D=M.createHTML(""));Yt&&Yt(R),pe=R}},Ke=nt({},[...Ka,...Ya,...G_]),Ce=nt({},[...Za,...V_]),lt=function(R){let de=U(R);(!de||!de.tagName)&&(de={namespaceURI:P,tagName:"template"});let Ie=go(R.tagName),rt=go(de.tagName);return ie[R.namespaceURI]?R.namespaceURI===We?de.namespaceURI===Te?Ie==="svg":de.namespaceURI===at?Ie==="svg"&&(rt==="annotation-xml"||G[rt]):!!Ke[Ie]:R.namespaceURI===at?de.namespaceURI===Te?Ie==="math":de.namespaceURI===We?Ie==="math"&&Ae[rt]:!!Ce[Ie]:R.namespaceURI===Te?de.namespaceURI===We&&!Ae[rt]||de.namespaceURI===at&&!G[rt]?!1:!Ce[Ie]&&(A[Ie]||!Ke[Ie]):!!(O==="application/xhtml+xml"&&ie[R.namespaceURI]):!1},it=function(R){as(t.removed,{element:R});try{U(R).removeChild(R)}catch{B(R)}},It=function(R,de){try{as(t.removed,{attribute:de.getAttributeNode(R),from:de})}catch{as(t.removed,{attribute:null,from:de})}if(de.removeAttribute(R),R==="is")if(te||Q)try{it(de)}catch{}else try{de.setAttribute(R,"")}catch{}},Dt=function(R){let de=null,Ie=null;if(mt)R="<remove></remove>"+R;else{let ft=Va(R,/^[\r\n\t ]+/);Ie=ft&&ft[0]}O==="application/xhtml+xml"&&P===Te&&(R='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+R+"</body></html>");let rt=M?M.createHTML(R):R;if(P===Te)try{de=new y().parseFromString(rt,O)}catch{}if(!de||!de.documentElement){de=W.createDocument(P,"template",null);try{de.documentElement.innerHTML=Z?D:rt}catch{}}let vt=de.body||de.documentElement;return R&&Ie&&vt.insertBefore(n.createTextNode(Ie),vt.childNodes[0]||null),P===Te?re.call(de,He?"html":"body")[0]:He?de.documentElement:vt},Wt=function(R){return E.call(R.ownerDocument||R,R,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Mt=function(R){return R instanceof h&&(typeof R.nodeName!="string"||typeof R.textContent!="string"||typeof R.removeChild!="function"||!(R.attributes instanceof f)||typeof R.removeAttribute!="function"||typeof R.setAttribute!="function"||typeof R.namespaceURI!="string"||typeof R.insertBefore!="function"||typeof R.hasChildNodes!="function")},zt=function(R){return typeof i=="function"&&R instanceof i};function yt(Ee,R,de){_o(Ee,Ie=>{Ie.call(t,R,de,pe)})}let Nt=function(R){let de=null;if(yt(_e.beforeSanitizeElements,R,null),Mt(R))return it(R),!0;let Ie=z(R.nodeName);if(yt(_e.uponSanitizeElement,R,{tagName:Ie,allowedTags:X}),Be&&R.hasChildNodes()&&!zt(R.firstElementChild)&&Kt(/<[/\w!]/g,R.innerHTML)&&Kt(/<[/\w!]/g,R.textContent)||R.nodeType===us.progressingInstruction||Be&&R.nodeType===us.comment&&Kt(/<[/\w]/g,R.data))return it(R),!0;if(!(ut.tagCheck instanceof Function&&ut.tagCheck(Ie))&&(!X[Ie]||ze[Ie])){if(!ze[Ie]&&Ht(Ie)&&(ue.tagNameCheck instanceof RegExp&&Kt(ue.tagNameCheck,Ie)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(Ie)))return!1;if(Ue&&!Ze[Ie]){let rt=U(R)||R.parentNode,vt=le(R)||R.childNodes;if(vt&&rt){let ft=vt.length;for(let Ct=ft-1;Ct>=0;--Ct){let Lt=F(vt[Ct],!0);Lt.__removalCount=(R.__removalCount||0)+1,rt.insertBefore(Lt,Y(R))}}}return it(R),!0}return R instanceof c&&!lt(R)||(Ie==="noscript"||Ie==="noembed"||Ie==="noframes")&&Kt(/<\/no(script|embed|frames)/i,R.innerHTML)?(it(R),!0):(De&&R.nodeType===us.text&&(de=R.textContent,_o([fe,ee,he],rt=>{de=is(de,rt," ")}),R.textContent!==de&&(as(t.removed,{element:R.cloneNode()}),R.textContent=de)),yt(_e.afterSanitizeElements,R,null),!1)},qe=function(R,de,Ie){if(Ye&&(de==="id"||de==="name")&&(Ie in n||Ie in ce))return!1;if(!(se&&!tt[de]&&Kt($e,de))){if(!(C&&Kt(be,de))){if(!(ut.attributeCheck instanceof Function&&ut.attributeCheck(de,R))){if(!me[de]||tt[de]){if(!(Ht(R)&&(ue.tagNameCheck instanceof RegExp&&Kt(ue.tagNameCheck,R)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(R))&&(ue.attributeNameCheck instanceof RegExp&&Kt(ue.attributeNameCheck,de)||ue.attributeNameCheck instanceof Function&&ue.attributeNameCheck(de,R))||de==="is"&&ue.allowCustomizedBuiltInElements&&(ue.tagNameCheck instanceof RegExp&&Kt(ue.tagNameCheck,Ie)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(Ie))))return!1}else if(!pt[de]){if(!Kt(V,is(Ie,Se,""))){if(!((de==="src"||de==="xlink:href"||de==="href")&&R!=="script"&&U_(Ie,"data:")===0&&Tt[R])){if(!(we&&!Kt(ne,is(Ie,Se,"")))){if(Ie)return!1}}}}}}}return!0},Ht=function(R){return R!=="annotation-xml"&&Va(R,xe)},Qt=function(R){yt(_e.beforeSanitizeAttributes,R,null);let{attributes:de}=R;if(!de||Mt(R))return;let Ie={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:me,forceKeepAttr:void 0},rt=de.length;for(;rt--;){let vt=de[rt],{name:ft,namespaceURI:Ct,value:Lt}=vt,Gt=z(ft),Jt=Lt,wt=ft==="value"?Jt:W_(Jt);if(Ie.attrName=Gt,Ie.attrValue=wt,Ie.keepAttr=!0,Ie.forceKeepAttr=void 0,yt(_e.uponSanitizeAttribute,R,Ie),wt=Ie.attrValue,Oe&&(Gt==="id"||Gt==="name")&&(It(ft,R),wt=ke+wt),Be&&Kt(/((--!?|])>)|<\/(style|title|textarea)/i,wt)){It(ft,R);continue}if(Gt==="attributename"&&Va(wt,"href")){It(ft,R);continue}if(Ie.forceKeepAttr)continue;if(!Ie.keepAttr){It(ft,R);continue}if(!Me&&Kt(/\/>/i,wt)){It(ft,R);continue}De&&_o([fe,ee,he],fn=>{wt=is(wt,fn," ")});let sn=z(R.nodeName);if(!qe(sn,Gt,wt)){It(ft,R);continue}if(M&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!Ct)switch($.getAttributeType(sn,Gt)){case"TrustedHTML":{wt=M.createHTML(wt);break}case"TrustedScriptURL":{wt=M.createScriptURL(wt);break}}if(wt!==Jt)try{Ct?R.setAttributeNS(Ct,ft,wt):R.setAttribute(ft,wt),Mt(R)?it(R):Gc(t.removed)}catch{It(ft,R)}}yt(_e.afterSanitizeAttributes,R,null)},Je=function Ee(R){let de=null,Ie=Wt(R);for(yt(_e.beforeSanitizeShadowDOM,R,null);de=Ie.nextNode();)yt(_e.uponSanitizeShadowNode,de,null),Nt(de),Qt(de),de.content instanceof o&&Ee(de.content);yt(_e.afterSanitizeShadowDOM,R,null)};return t.sanitize=function(Ee){let R=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},de=null,Ie=null,rt=null,vt=null;if(Z=!Ee,Z&&(Ee="<!-->"),typeof Ee!="string"&&!zt(Ee))if(typeof Ee.toString=="function"){if(Ee=Ee.toString(),typeof Ee!="string")throw ls("dirty is not a string, aborting")}else throw ls("toString is not a function");if(!t.isSupported)return Ee;if(st||et(R),t.removed=[],typeof Ee=="string"&&(Ve=!1),Ve){if(Ee.nodeName){let Lt=z(Ee.nodeName);if(!X[Lt]||ze[Lt])throw ls("root node is forbidden and cannot be sanitized in-place")}}else if(Ee instanceof i)de=Dt("<!---->"),Ie=de.ownerDocument.importNode(Ee,!0),Ie.nodeType===us.element&&Ie.nodeName==="BODY"||Ie.nodeName==="HTML"?de=Ie:de.appendChild(Ie);else{if(!te&&!De&&!He&&Ee.indexOf("<")===-1)return M&&Le?M.createHTML(Ee):Ee;if(de=Dt(Ee),!de)return te?null:Le?D:""}de&&mt&&it(de.firstChild);let ft=Wt(Ve?Ee:de);for(;rt=ft.nextNode();)Nt(rt),Qt(rt),rt.content instanceof o&&Je(rt.content);if(Ve)return Ee;if(te){if(Q)for(vt=N.call(de.ownerDocument);de.firstChild;)vt.appendChild(de.firstChild);else vt=de;return(me.shadowroot||me.shadowrootmode)&&(vt=J.call(r,vt,!0)),vt}let Ct=He?de.outerHTML:de.innerHTML;return He&&X["!doctype"]&&de.ownerDocument&&de.ownerDocument.doctype&&de.ownerDocument.doctype.name&&Kt(tu,de.ownerDocument.doctype.name)&&(Ct="<!DOCTYPE "+de.ownerDocument.doctype.name+`>
`+Ct),De&&_o([fe,ee,he],Lt=>{Ct=is(Ct,Lt," ")}),M&&Le?M.createHTML(Ct):Ct},t.setConfig=function(){let Ee=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};et(Ee),st=!0},t.clearConfig=function(){pe=null,st=!1},t.isValidAttribute=function(Ee,R,de){pe||et({});let Ie=z(Ee),rt=z(R);return qe(Ie,rt,de)},t.addHook=function(Ee,R){typeof R=="function"&&as(_e[Ee],R)},t.removeHook=function(Ee,R){if(R!==void 0){let de=j_(_e[Ee],R);return de===-1?void 0:B_(_e[Ee],de,1)[0]}return Gc(_e[Ee])},t.removeHooks=function(Ee){_e[Ee]=[]},t.removeAllHooks=function(){_e=Qc()},t}var ru=nu();var qn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},bo=e=>(...t)=>({_$litDirective$:e,values:t}),Mr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ds=class extends Mr{constructor(t){if(super(t),this.it=Ot,t.type!==qn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ot||t==null)return this._t=void 0,this.it=t;if(t===_n)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ds.directiveName="unsafeHTML",ds.resultType=1;var su=bo(ds);function si(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var mr=si();function du(e){mr=e}var ms={exec:()=>null};function ct(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Xt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var sm=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Xt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},om=/^(?:[ \t]*(?:\n|$))+/,am=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,im=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,gs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,lm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,oi=/(?:[*+-]|\d{1,9}[.)])/,pu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,fu=ct(pu).replace(/bull/g,oi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),cm=ct(pu).replace(/bull/g,oi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ai=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,um=/^[^\n]+/,ii=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,dm=ct(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ii).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),pm=ct(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,oi).getRegex(),$o="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",li=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,fm=ct("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",li).replace("tag",$o).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),_u=ct(ai).replace("hr",gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex(),_m=ct(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",_u).getRegex(),ci={blockquote:_m,code:am,def:dm,fences:im,heading:lm,hr:gs,html:fm,lheading:fu,list:pm,newline:om,paragraph:_u,table:ms,text:um},ou=ct("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex(),mm={...ci,lheading:cm,table:ou,paragraph:ct(ai).replace("hr",gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ou).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex()},gm={...ci,html:ct(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",li).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ms,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ct(ai).replace("hr",gs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",fu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},bm=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,hm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,mu=/^( {2,}|\\)\n(?!\s*$)/,ym=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,xo=/[\p{P}\p{S}]/u,ui=/[\s\p{P}\p{S}]/u,gu=/[^\s\p{P}\p{S}]/u,vm=ct(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ui).getRegex(),bu=/(?!~)[\p{P}\p{S}]/u,wm=/(?!~)[\s\p{P}\p{S}]/u,km=/(?:[^\s\p{P}\p{S}]|~)/u,$m=ct(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",sm?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),hu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,xm=ct(hu,"u").replace(/punct/g,xo).getRegex(),Am=ct(hu,"u").replace(/punct/g,bu).getRegex(),yu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Sm=ct(yu,"gu").replace(/notPunctSpace/g,gu).replace(/punctSpace/g,ui).replace(/punct/g,xo).getRegex(),Em=ct(yu,"gu").replace(/notPunctSpace/g,km).replace(/punctSpace/g,wm).replace(/punct/g,bu).getRegex(),Tm=ct("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,gu).replace(/punctSpace/g,ui).replace(/punct/g,xo).getRegex(),Cm=ct(/\\(punct)/,"gu").replace(/punct/g,xo).getRegex(),Rm=ct(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Om=ct(li).replace("(?:-->|$)","-->").getRegex(),Lm=ct("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Om).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),vo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Im=ct(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",vo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),vu=ct(/^!?\[(label)\]\[(ref)\]/).replace("label",vo).replace("ref",ii).getRegex(),wu=ct(/^!?\[(ref)\](?:\[\])?/).replace("ref",ii).getRegex(),Pm=ct("reflink|nolink(?!\\()","g").replace("reflink",vu).replace("nolink",wu).getRegex(),au=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,di={_backpedal:ms,anyPunctuation:Cm,autolink:Rm,blockSkip:$m,br:mu,code:hm,del:ms,emStrongLDelim:xm,emStrongRDelimAst:Sm,emStrongRDelimUnd:Tm,escape:bm,link:Im,nolink:wu,punctuation:vm,reflink:vu,reflinkSearch:Pm,tag:Lm,text:ym,url:ms},Dm={...di,link:ct(/^!?\[(label)\]\((.*?)\)/).replace("label",vo).getRegex(),reflink:ct(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",vo).getRegex()},ti={...di,emStrongRDelimAst:Em,emStrongLDelim:Am,url:ct(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",au).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ct(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",au).getRegex()},Mm={...ti,br:ct(mu).replace("{2,}","*").getRegex(),text:ct(ti.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ho={normal:ci,gfm:mm,pedantic:gm},ps={normal:di,gfm:ti,breaks:Mm,pedantic:Dm},Nm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},iu=e=>Nm[e];function Fn(e,t){if(t){if(Xt.escapeTest.test(e))return e.replace(Xt.escapeReplace,iu)}else if(Xt.escapeTestNoEncode.test(e))return e.replace(Xt.escapeReplaceNoEncode,iu);return e}function lu(e){try{e=encodeURI(e).replace(Xt.percentDecode,"%")}catch{return null}return e}function cu(e,t){let n=e.replace(Xt.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),r=n.split(Xt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Xt.slashPipe,"|");return r}function fs(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function qm(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function uu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,c}function Fm(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var wo=class{constructor(e){ht(this,"options");ht(this,"rules");ht(this,"lexer");this.options=e||mr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:fs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Fm(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=fs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:fs(t[0],`
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
`,e=e.substring(y.length+1),c=!0),!c){let F=this.rules.other.nextBulletRegex(S),B=this.rules.other.hrRegex(S),Y=this.rules.other.fencesBeginRegex(S),le=this.rules.other.headingBeginRegex(S),U=this.rules.other.htmlBeginRegex(S);for(;e;){let M=e.split(`
`,1)[0],D;if(y=M,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),D=y):D=y.replace(this.rules.other.tabCharGlobal,"    "),Y.test(y)||le.test(y)||U.test(y)||F.test(y)||B.test(y))break;if(D.search(this.rules.other.nonSpaceChar)>=S||!y.trim())f+=`
`+D.slice(S);else{if($||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(h)||le.test(h)||B.test(h))break;f+=`
`+y}!$&&!y.trim()&&($=!0),u+=M+`
`,e=e.substring(M.length+1),h=D.slice(S)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(h=>h.type==="space"),f=u.length>0&&u.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=cu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(cu(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=fs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=qm(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),uu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return uu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,c=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let f=[...r[0]][0].length,h=e.slice(0,s+r.index+f+a);if(Math.min(s,a)%2){let $=h.slice(1,-1);return{type:"em",raw:h,text:$,tokens:this.lexer.inlineTokens($)}}let y=h.slice(2,-2);return{type:"strong",raw:h,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},kn=class ni{constructor(t){ht(this,"tokens");ht(this,"options");ht(this,"state");ht(this,"inlineQueue");ht(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||mr,this.options.tokenizer=this.options.tokenizer||new wo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Xt,block:ho.normal,inline:ps.normal};this.options.pedantic?(n.block=ho.pedantic,n.inline=ps.pedantic):this.options.gfm&&(n.block=ho.gfm,this.options.breaks?n.inline=ps.breaks:n.inline=ps.gfm),this.tokenizer.rules=n}static get rules(){return{block:ho,inline:ps}}static lex(t,n){return new ni(n).lex(t)}static lexInline(t,n){return new ni(n).inlineTokens(t)}lex(t){t=t.replace(Xt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(Xt.tabCharGlobal,"    ").replace(Xt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=n.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,i)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,h=t.slice(1),y;this.options.extensions.startInline.forEach($=>{y=$.call({lexer:this},h),typeof y=="number"&&y>=0&&(f=Math.min(f,y))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let f=n.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):n.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},ko=class{constructor(e){ht(this,"options");ht(this,"parser");this.options=e||mr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Xt.notSpaceStart)?.[0],s=e.replace(Xt.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Fn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=lu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Fn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=lu(e);if(s===null)return Fn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Fn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Fn(e.text)}},pi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},$n=class ri{constructor(t){ht(this,"options");ht(this,"renderer");ht(this,"textRenderer");this.options=t||mr,this.options.renderer=this.options.renderer||new ko,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new pi}static parse(t,n){return new ri(n).parse(t)}static parseInline(t,n){return new ri(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},yo,_s=(yo=class{constructor(e){ht(this,"options");ht(this,"block");this.options=e||mr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?kn.lex:kn.lexInline}provideParser(){return this.block?$n.parse:$n.parseInline}},ht(yo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ht(yo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),yo),jm=class{constructor(...e){ht(this,"defaults",si());ht(this,"options",this.setOptions);ht(this,"parse",this.parseMarkdown(!0));ht(this,"parseInline",this.parseMarkdown(!1));ht(this,"Parser",$n);ht(this,"Renderer",ko);ht(this,"TextRenderer",pi);ht(this,"Lexer",kn);ht(this,"Tokenizer",wo);ht(this,"Hooks",_s);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new ko(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new wo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new _s;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],c=s[a];_s.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&_s.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await i.call(s,u);return c.call(s,h)})();let f=i.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let h=await i.apply(s,u);return h===!1&&(h=await c.apply(s,u)),h})();let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return kn.lex(e,t??this.defaults)}parser(e,t){return $n.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?kn.lex:kn.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?$n.parse:$n.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?kn.lex:kn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?$n.parse:$n.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Fn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},_r=new jm;function gt(e,t){return _r.parse(e,t)}gt.options=gt.setOptions=function(e){return _r.setOptions(e),gt.defaults=_r.defaults,du(gt.defaults),gt};gt.getDefaults=si;gt.defaults=mr;gt.use=function(...e){return _r.use(...e),gt.defaults=_r.defaults,du(gt.defaults),gt};gt.walkTokens=function(e,t){return _r.walkTokens(e,t)};gt.parseInline=_r.parseInline;gt.Parser=$n;gt.parser=$n.parse;gt.Renderer=ko;gt.TextRenderer=pi;gt.Lexer=kn;gt.lexer=kn.lex;gt.Tokenizer=wo;gt.Hooks=_s;gt.parse=gt;var lw=gt.options,cw=gt.setOptions,uw=gt.use,dw=gt.walkTokens,pw=gt.parseInline;var fw=$n.parse,_w=kn.lex;function Yn(e){let t=gt.parse(e),n=ru.sanitize(t);return su(n)}function jn(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Nr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ao(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var $u={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Bm={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Um=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Wm=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function On(e){return!!e&&typeof e=="object"}function fi(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function _i(e,t){let n=fi(e),r=fi(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function xu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>On(s)&&typeof s.text=="string"?s.text:"").join(""):On(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function zm(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:$u[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=fi(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=_i(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let c=_i(On(i)?i.old_string:"",On(i)?i.new_string:"");s+=c.added,o+=c.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function mi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function gi(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Um.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Wm.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Hm(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Gm(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(On(a)){if(a.type==="text"&&typeof a.text=="string")o.push(gi(a.text));else if(a.type==="thinking"){let i=mi(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=zm(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?ku(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(On(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=xu(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?ku([s],n):[s]}return[]}function ku(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Vm(e){let t=typeof e.command=="string"?e.command:"",n=xu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:$u.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Km(e){if(e.type==="item.completed"&&On(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[gi(t.text)];if(t.type==="reasoning"){let n=mi(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Vm(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Ym(e){if(e.schema!=="codex-delegation-monitor-v1"||!On(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&On(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[gi(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=mi(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Bm[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Zm(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Xm(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return On(t)?t:null}function Au(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Xm(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Hm(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Ym(o):Zm(o)?Km(o):Gm(o,n);return a.length>0&&(r.progress=null),a}}}function bi(e){let t=[],n=Au(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Qm=5,Jm=10,eg=/Task\s+#(\d+)/,tg=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,ng=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function So(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function rg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function sg(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function og(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=eg.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function ag(e){if(e.tool==="Bash"){let t=e.command||"";return tg.test(t)?"~ PR/\uAC8C\uC2DC \uC911":ng.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ig(e){let t=e.filter(s=>s.kind==="tool").slice(-Jm),n=new Map;t.forEach((s,o)=>{let a=ag(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function lg(e){let t=sg(e);if(t)return{text:t,guess:!1};let n=og(e);if(n)return{text:n,guess:!1};let r=ig(e);return r?{text:r,guess:!0}:null}function cg(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:cn(e,t)}function qr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,c=null,u=!1,f={},h=!0,y=new Set,$=new Set,S=null,F=null,B=!1,Y=!1,le=!1,U=null,M=null;function D(){B=!1,Y=!1,le=!1,U=null,M=null}async function W(te){if(n){Y=!0,le=!1,ue();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:te,...c?{root_dir:c}:{}}));if(o!==te)return;!Q||typeof Q!="object"||Array.isArray(Q)?le=!0:(U=Q,M=te)}catch{o===te&&(le=!0)}finally{o===te&&(Y=!1,ue())}}}function E(){if(B=!B,B&&o&&M!==o){W(o);return}ue()}function N(){if(!B)return"";let te=Nr({loading:Y,error:le});if(te)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${te}
      </div>`;if(!U)return"";if(U.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=Ao(U.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?l`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof U.task_prompt=="string"?jn("\uACFC\uC5C5 (user)",U.task_prompt):""}
      ${typeof U.system_prompt=="string"?jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",U.system_prompt):""}
    </div>`}function re(){if(!i||!r)return[];let te=r.get(i);return bi(te?te.lines:[])}function J(){if(!i||!r)return null;let te=r.get(i),Q=te?te.last_event_at:null;return typeof Q=="number"?Q:null}function _e(){return f.status==="running"}function fe(){if(_e()&&o){F||(F=setInterval(()=>ue(),1e3));return}ee()}function ee(){F&&(clearInterval(F),F=null)}function he(te){let Q=[],Le=0;for(;Le<te.length;){let{idx:Ye,line:Oe}=te[Le];if(Oe.kind==="tool"){let ke=Le;for(;ke<te.length&&te[ke].line.kind==="tool"&&te[ke].line.tool===Oe.tool;)ke+=1;if(ke-Le>=Qm&&!$.has(Ye)){Q.push({kind:"group",idx:Ye,tool:Oe.tool||"",lines:te.slice(Le,ke)}),Le=ke;continue}}Q.push({kind:"line",idx:Ye,line:Oe}),Le+=1}return Q}function $e(te){let Q=[],Le=new Map;for(let ke=0;ke<te.length;ke+=1){let Ue=te[ke],Ve=Ue.parent_tool_use_id;if(typeof Ve=="string"&&Ve.length>0){let Qe=Le.get(Ve);Qe||(Qe={kind:"subagent",idx:ke,launch_id:Ve,agent_type:null,header:null,lines:[]},Le.set(Ve,Qe),Q.push(Qe)),Qe.lines.push({idx:ke,line:Ue});continue}if(Ue.kind==="tool"&&Ue.tool==="Agent"&&typeof Ue.launch_id=="string"&&Ue.launch_id.length>0){let Qe=be(Ue),Ze=Le.get(Ue.launch_id);if(Ze){Ze.header={idx:ke,line:Ue},Ze.agent_type=Qe;continue}let dt={kind:"subagent",idx:ke,launch_id:Ue.launch_id,agent_type:Qe,header:{idx:ke,line:Ue},lines:[]};Le.set(Ue.launch_id,dt),Q.push(dt);continue}Q.push({kind:"entry",idx:ke,line:Ue})}let Ye=[],Oe=0;for(;Oe<Q.length;){if(Q[Oe].kind!=="entry"){Ye.push(Q[Oe]),Oe+=1;continue}let ke=Oe;for(;ke<Q.length&&Q[ke].kind==="entry";)ke+=1;Ye.push(...he(Q.slice(Oe,ke))),Oe=ke}return Ye}function be(te){let Q=te.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function ne(te){for(let Q=te.length-1;Q>=0;Q-=1){let Le=te[Q];if(Le.kind==="result"||Le.kind==="error")return null;if(Le.kind==="tool"&&!Object.hasOwn(Le,"result"))return Le}return null}function Se(te){for(let Q=te.length-1;Q>=0;Q-=1)if(te[Q].kind==="thinking")return te[Q];return null}function xe(te,Q){if(Q.kind==="gate")return l`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return l`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return l`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Yn(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let Le=y.has(te);return l`<div
        class="sv__think${Le?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>tt(te)}
      >
        <span class="sv__think-line">💭 ${So(Q.text)}</span>
        ${Le?l`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return l`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return l`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let Le=y.has(te),Ye=Q.tool==="Bash"?rg(Q.command):0,Oe=Q.tool==="Bash"?Ye>1?So(Q.command):Q.command:Q.path||Q.command||"";return l`<div
        class="sv__tool${Le?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>tt(te)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${Oe?l`<span class="sv__tool-detail">${Oe}</span>`:""}
          ${Ye>1?l`<span class="sv__tool-more">⋯ ${Ye}줄</span>`:""}
          ${typeof Q.added=="number"?l`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?l`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?l`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${Le?l`<pre class="sv__tool-expand">${V(Q)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Yn(Q.text||"")}</div>`}function V(te){let Q=[];if(te.tool==="Bash"&&typeof te.command=="string"&&te.command.length>0)Q.push(te.command);else if(te.input!==void 0)try{Q.push(`input: ${JSON.stringify(te.input,null,2)}`)}catch{}return typeof te.output=="string"&&te.output.length>0&&Q.push(`output:
${te.output}`),Q.join(`

`)}function X(){if(!o)return l``;let te=re(),Q=(a?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Le=f.session_id||"",Ye=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,Oe=_e(),ke=Oe?cg(J(),Date.now()):"",Ue=Oe?ne(te):null,Ve=Oe?Se(te):null,Qe=lg(te);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?f.role||"":o}</span>
        ${Qe?l`<span
              class="sv__stage${Qe.guess?" sv__stage--guess":""}"
              title=${Qe.text}
              >${Qe.text}</span
            >`:""}
        ${Oe?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ke?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ke}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ke?l`<span class="sv__live-ago">${ke}</span>`:""}</span
            >`:""}
        ${Le?l`<button
              type="button"
              class="sv__session"
              title=${Le}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Le}`}
              @click=${()=>C(Le)}
            >
              ⧉ ${Le.slice(0,8)}
            </button>`:""}
        ${Q?l`<span class="sv__meta">${Q}</span>`:""}
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
          aria-label=${Ye}
          @click=${ut}
        >
          <span class="sv__follow-full">⇣ ${Ye}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>mt()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":N()}
      <div class="sv__body">
        ${te.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:$e(te).map(Ze=>Ze.kind==="subagent"?me(Ze):Ze.kind==="group"?ye(Ze):xe(Ze.idx,Ze.line))}
      </div>
      ${Ue||Ve?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ue?l`<span class="sv__now-icon">${Ue.icon}</span>
                  <span class="sv__now-name">${Ue.tool}</span>
                  <span class="sv__now-detail"
                    >${Ue.tool==="Bash"?So(Ue.command):Ue.path||Ue.command||""}</span
                  >`:""}
            ${Ve?l`<span class="sv__now-think"
                  >💭 ${So(Ve.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ye(te){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Fe(te.idx)}
    >
      <span class="sv__group-icon">${te.lines[0].line.icon}</span>
      <span class="sv__group-name">${te.tool}</span>
      <span class="sv__group-count">${te.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function me(te){let Q=$.has(te.idx),Le=te.header?te.header.line:null,Ye=Le?Le.is_error===!0?"\u2717":typeof Le.result=="string"?"\u2713":"\u27F3":"",Oe=Le&&Le.command?Le.command:"";return l`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Fe(te.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${te.agent_type||"subagent"}</span>
        ${Oe?l`<span class="sv__sub-detail">${Oe}</span>`:""}
        <span class="sv__sub-count">${te.lines.length}줄</span>
        ${Ye?l`<span class="sv__sub-state">${Ye}</span>`:""}
        ${Q?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?l`<div class="sv__sub-body">
            ${he(te.lines).map(ke=>ke.kind==="group"?ye(ke):xe(ke.idx,ke.line))}
          </div>`:""}
    </div>`}function Fe(te){$.add(te),ue()}function ue(){Ge(X(),e),fe(),h&&ze()}function ze(){let te=e.querySelector(".sv__body");te&&(te.scrollTop=te.scrollHeight)}function tt(te){y.has(te)?y.delete(te):y.add(te),ue()}function ut(){h=!h,ue()}function C(te){un(te).then(Q=>{Q?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function se(te){!o||!te||(f={...f,...te},ue())}function we(te){let Q=te.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&h&&(h=!1,ue())}e.addEventListener("scroll",we,!0);function Me(te){let Q=te.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||mt()}let De=!1;function Be(){De||(document.addEventListener("mousedown",Me),De=!0)}function He(){De&&(document.removeEventListener("mousedown",Me),De=!1)}function st(te){let Q=te&&te.attempt_id;if(!Q)return;let Le=i;o=Q,a=typeof te.launch_id=="string"&&te.launch_id.length>0?te.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Le&&Le!==i&&Promise.resolve(n("unsubscribe-session-log",{id:Le})).catch(()=>{}),c=typeof te.root_dir=="string"&&te.root_dir.length>0?te.root_dir:null,f=te.meta||{},u=te.hide_prompt===!0,h=!0,y.clear(),$.clear(),D(),!S&&r&&(S=r.subscribe(ue)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),Be(),ue()}function mt(){let te=i;He(),o=null,a=null,i=null,c=null,u=!1,y.clear(),$.clear(),D(),ee(),n&&te&&Promise.resolve(n("unsubscribe-session-log",{id:te})).catch(()=>{}),Ge(l``,e),s&&s()}return{open:st,updateMeta:se,close:mt,isOpen(){return o!==null},destroy(){ee(),He(),S&&(S(),S=null),e.removeEventListener("scroll",we,!0),o=null,a=null,i=null,c=null,u=!1,Ge(l``,e)}}}function Eo(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=hi(t.spec_id),s=hi(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function hi(e){return typeof e=="string"?e.trim():""}function Su(e){let t=Eo(e);if(t.path)return t;let n=hi(ug(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function ug(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function dg(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function pg(e){let t=e&&e.metadata||{},n=Su(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:dg(t)?null:"plan_pending"}),r}function Eu(e,t){let n=pg(e);return l`
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
  `}var fg="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",_g=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,mg=/^\*\*결론\*\* — (.+)$/;function To(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==fg)return null;let n=_g.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?mg.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Tu=20;function Cu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function gg(e){return e.length>Tu?`${e.slice(0,Tu)}\u2026`:e}function bg(e,t,n,r){let s=`${t.lane} ${gg(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Cu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?l`<div class="detail-report__body">
          ${Yn(t.body)}
        </div>`:""}
  </div>`}function hg(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Cu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Yn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ru(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=To(typeof c.text=="string"?c.text:"");return u?bg(c,u,t,s.has(c.id)):hg(c)})}
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
  `}var{I:Yw}=Yl;var Ou=e=>e.strings===void 0;var yg={},Lu=(e,t=yg)=>e._$AH=t;var gr=bo(class extends Mr{constructor(e){if(super(e),e.type!==qn.PROPERTY&&e.type!==qn.ATTRIBUTE&&e.type!==qn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ou(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===_n||t===Ot)return t;let n=e.element,r=e.name;if(e.type===qn.PROPERTY){if(t===n[r])return _n}else if(e.type===qn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return _n}else if(e.type===qn.ATTRIBUTE&&n.getAttribute(r)===t+"")return _n;return Lu(e),t}});var Co=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],vi=[...Co.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Bn=["orchestration_model","orchestration_effort","orchestration_speed"],Ro=[...Co,...Bn],vg=vi.filter(e=>Ro.includes(e)),Iu=["delegated","main"],Oo=["inherit","claude","codex"],bs=["default","fast"],hs=["standard","fast_track"],ys=["codex","opus","fable","self","skip"],Lo=["codex","fable","skip"],Io=["low","medium","high","xhigh"],pn="auto";function dn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Pu(e){if(!dn(e)||!dn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))dn(r)&&dn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Fr(e,t){let n=Pu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[pn,...r.flatMap(([,s])=>s)]}function Du(e,t,n,r){if(!dn(e)||!dn(e.runners))return[pn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!dn(a)||!dn(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(n&&n!==pn&&i!==n)continue;let u=r(a,c);if(Array.isArray(u))for(let f of u)typeof f=="string"&&!s.includes(f)&&s.push(f)}return[pn,...s]}function jr(e,t,n){return Du(e,t,n,(r,s)=>dn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function wi(e,t,n){return Du(e,t,n,(r,s)=>dn(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:dn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function vs(e,t){let n=Pu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Mu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Fr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!jr(t,s,r.impl_model||pn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var wg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},yi=[...vg,...Bn],kg=[...Ro,...vi].filter((e,t,n)=>n.indexOf(e)===t&&!yi.includes(e));function Nu(e,t){let n=dn(e)?e:{},r=dn(t)?t:{},s=[];for(let a of yi){let i=n[a]??null,c=r[a]??null;i!==c&&s.push({key:a,label:wg[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...kg,...Object.keys(r)])!yi.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function ki(e,t,n,r,s,o){return uo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function qu(e,t){let n={};for(let r of vi){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Fu(e,t){let n={};for(let r of Bn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var $i=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Bn]}],Zn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Po={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function xi(e,t,n,r,s,o=null){let a=nn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function ju(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of xi(e,t,n,r,s,o))a[i.source]+=1;return a}function Bu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Uu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var ak=[...Co,...Bn];var $g=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Ai={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Wu={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},xg={pin:"pin",global:"global",base:"base"};function Ag(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${xg[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Sg(e,t,n){switch(e){case"workflow_mode":return hs;case"spec_review_model":case"impl_review_model":return ys;case"plan_review_model":return Lo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Io;case"impl_dispatch":return Iu;case"impl_runtime":return Oo;case"impl_model":return Fr(n,t.impl_runtime);case"impl_effort":return jr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return bs;case"orchestration_model":return vs(n,null);case"orchestration_effort":return jr(n,void 0,t.orchestration_model||pn).filter(r=>r!==pn);default:return[]}}function Eg(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${Ag(e.source)}
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
      >${Po[e.source]}</span
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
  </div>`}function zu(e,t){let n=$i.flatMap(c=>c.keys),r=xi(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=ju(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(c=>[c.key,c])),a=Object.fromEntries(r.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=r.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return l`<details
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
          ${$i.map(c=>l`
              <div class="detail-effective__subhead">${c.label}</div>
              ${r.filter(u=>c.keys.includes(u.key)).map(u=>{let f=uo({key:u.key,choices:Sg(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Eg(u,{expanded:e.expanded,options:f.options,default_label:f.unset_label,default_full_value:f.full_value,onEdit:t.onEdit})})}
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
  </details>`}function Tg(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Cg(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Hu(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=Cg(n.exec_receipt),c=i?In(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],f=lo(n.planned_execution,n.exec_receipt),h=n.chips?.pr?.number,y=typeof h=="number"?`PR #${h}`:"PR";return l`<section class="detail-summary" data-seam="detail-summary">
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
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Rg(s).map($=>Og($,t,r,{label:$.id==="pr"?y:$.label,href:$.id==="pr"?o:""}))}
    </div>
  </section>`}function Rg(e){let n=typeof e=="string"&&Object.hasOwn(Ai,e)&&Ai[e]||Ai.spec_backed;return $g.filter(r=>n.includes(r.id))}var Do={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Og(e,t,n,r){let s=Lg(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,c=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,f=s&&s.split("@")[1]?.slice(0,7)||"",h=u?Do.stale:i?Do.on:c?Do.current:Do.none,y=Ig(e,n),$=`${r.label} \xB7 ${h}${y?` \xB7 ${y}`:""}${s?` \xB7 ${s}`:""}`,S=`detail-summary__gate${i?" detail-summary__gate--on":""}${c?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${f?" detail-summary__gate--receipt":""}`,F=l`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${f}</span>`;return r.href?l`<a
      class=${S}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${$}
      >${F}</a
    >`:l`<span
    class=${S}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${$}
    >${F}</span
  >`}function Lg(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Ig(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Wu,n)?Wu[n]:""}function Mo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Gu(e){return Mo(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Vu(e,t){let n=e&&e[t];if(!Mo(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Gu),s=Gu(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Zu(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function No(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Zu(e)}${t}`}function Br(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Zu(e)}`}function Pg(e,t,n){if(n!==null){let s=e==="claude"?No:Br,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Br({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Ku(e,t){if(!Mo(e)||e.state!=="usable"||!Mo(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Yu(e){let t=e.provider_key==="claude"?No:Br,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
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
  </div>`}function Xu({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Yu({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Vu(t,"claude"),selected:s,workspace_default:Ku(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Yu({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Vu(t,"codex"),selected:o,workspace_default:Ku(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var Qu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function ws(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function qo(e){if(!ws(e)||!ws(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>ws(n)&&ws(n.models));return t.length>0?t:null}function xn(e,t){let n=qo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Ju(e,t){return ws(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function ed(e,t){let n=qo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Ju(r,r.models[t]);return[]}function Dg(e){let t=qo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Ju(r,s))n.includes(o)||n.push(o);return n}function Mg(e,t){if(!t)return Dg(e);let r=qo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of ed(e,o))s.includes(a)||s.push(a);return s}function td(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=xn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?ed(t,r.impl_model):Mg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function Ng(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function qg(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Fo(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function u(F){F.key==="Escape"&&s&&(F.preventDefault(),$())}document.addEventListener("keydown",u);function f(){return s?l`
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
                        >`}${Yn(a)}`}
          </div>
        </div>
      </div>
    `:l``}function h(){Ge(f(),e)}async function y(F,B={}){s=F,o="loading",a="",i=null,c="",h();let Y=B.workspace||(n?n():"");if(!Y){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",h();return}if(!r){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",h();return}let le="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(F);try{let U=await r(le),M=await U.json().catch(()=>({}));if(!U.ok||!M||M.ok!==!0){if(M?.error==="not_found"&&B.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",h();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||U.status)+")",h();return}let D=qg(String(M.content||""));i=D.front,a=D.body,o="ready",h()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",h()}}function $(){s=null,Ge(l``,e)}function S(){document.removeEventListener("keydown",u),$()}return{open:y,close:$,destroy:S}}var Fg=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],sd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",jo=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],jg=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function nd(e){return typeof e=="string"&&jg.has(e)}var Bg=["running","done","failed","interrupted"],Ug={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Wg(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function zg(e){let t=Bt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Dr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${sd}
          >부분 집계</span
        >`:""}`}function rd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ti(e){if(typeof e=="number")return Bo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Bo(t):""}function Hg(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Gg(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Si(e){return e===null||typeof e=="string"&&e.trim().length>0}function Ei(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Vg(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!jo.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Si(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Si(t.effort))||!(!("agent_type"in t)||Si(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Bg.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Ei(t.started_at)||!Ei(t.last_event_at)||!Ei(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Kg(e,t,n){let s=Bt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Ti(n.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${Ti(n.completed_at)}</span
        >`:""}
    ${s?l`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Yg(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Bt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Bo(e.last_event_at):s?Ti(s.completed_at):"",c=(e.provider==="claude"?["Claude",e.agent_type,Hg(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Gg(e,s);return l`<button
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
      title=${u.title}
      >${u.text}</span
    >
    ${i?l`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?l`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Zg(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Xg(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of o){let h=Vg(f);!h||s.has(h.launch_id)||nd(h.agent_type)||(s.add(h.launch_id),r.push(h))}r.sort((f,h)=>(f.started_at||0)-(h.started_at||0));let a={};for(let{role:f,provider:h}of jo){let y=t?t.roles[f]?.[h]:null;a[f]=y?[...y.legs]:[]}let i=jo.flatMap(({role:f})=>a[f]),c=new Set,u=[];for(let{role:f,provider:h}of jo){for(let y of r.filter($=>$.role===f&&$.provider===h)){let $=i.find(S=>S.receipt_id===y.launch_id)||null;$&&!Zg(y,$)||($&&c.add($.receipt_id),u.push(Yg(y,$,e.attempt_id,n)))}for(let y of a[f])!c.has(y.receipt_id)&&!nd(y.agent_type)&&u.push(Kg(f,h,y))}return u}function Qg(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Fg,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
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
    ${e.replayed?l`<span class="detail-session__usage-note">${sd}</span>`:""}
  </div>`}var Jg={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Bo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function eb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function od(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return l`
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
    </div>`},c=u=>{let f=rd(Ha(u));if(Bt(f).length===0&&!Dr(u.usage))return"";let h=s.has(u.attempt_id);return l`<button
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
      세션 이력${zg(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(u=>{let f=Ha(u),h=rd(f),y=Bt(h);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Jg[u.status||""]||"\xB7"}</span
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
                    >`):Dr(u.usage)?l`<span class="detail-session__usage"
                    >${Dr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Bo(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${eb(u)}
          ${s.has(u.attempt_id)&&u.usage?Qg(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Xg(u,f,t)}
        </div>`})}
    </div>
  `}function ad(e,t={}){return l`
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
      ${typeof n.default_task_prompt=="string"?jn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Ao(n.recorded_at);return l`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?jn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var nb=["open","in_progress","deferred","resolved","closed"],rb=[0,1,2,3,4];function id(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,h={},y="",$=!1,S=[],F=!1,B={},Y={claude:null,codex:null},le=null,U=null,M=0,D=!1,W=!1,E="",N="",re="";function J(){D=!1,W=!1,E="",N="",re=""}function _e(){Y={claude:null,codex:null},le=null,U=null,M+=1}async function fe(){if(!s)return null;try{let m=await Promise.resolve(s("get-workspace-accounts",{}));return m&&typeof m.state=="string"?m:null}catch{return null}}async function ee(m){try{let d=await fetch(m);if(!d.ok)return null;let p=await d.json();if(!p||typeof p!="object"||!Array.isArray(p.accounts))return null;let b=p.accounts.filter(w=>w!==null&&typeof w=="object"&&!Array.isArray(w));return{accounts:b,active:b.find(w=>w.active===!0)||null}}catch{return null}}async function he(m){U=m;let d=++M,[p,b,w]=await Promise.all([ee("/api/claude-usage"),ee("/api/codex-usage"),fe()]);d!==M||m!==u||(Y={claude:p,codex:b},le=w,v())}let $e=[],be=null,ne=null,Se=!1,xe="",V=!1,X=0,ye=new Set;function me(){$e=[],be=null,ne=null,Se=!1,xe="",V=!1,X+=1,ye.clear()}async function Fe(m){if(!s)return;let d=++X;try{let p=await Promise.resolve(s("get-comments",{id:m}));if(d!==X||m!==u)return;$e=Array.isArray(p)?p:[],Se=!1}catch{if(d!==X||m!==u)return;Se=!0}v()}function ue(){if(!s||!u)return;let m=f&&typeof f.comment_count=="number"?f.comment_count:null;if(be!==u){be=u,ne=m,Fe(u);return}m!==null&&m!==ne&&(ne=m,Fe(u))}function ze(m){ye.has(m)?ye.delete(m):ye.add(m),v()}function tt(m){let d=xe.trim().length===0;xe=m,d!==(m.trim().length===0)&&v()}async function ut(){let m=xe.trim();if(!s||!u||m.length===0||V)return;let d=u;V=!0,v();let p=!1;try{let b=await Promise.resolve(s("add-comment",{id:d,text:m}));Array.isArray(b)&&b.length>0&&(p=!0,d===u&&($e=b,Se=!1,xe="",ne=b.length))}catch{p=!1}p||ae("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),d===u&&(V=!1),v()}let C={onToggle:ze,onDraftInput:tt,onSubmit:ut},se=t.mdViewer||null,we=null;se||(we=document.createElement("div"),we.className="md-viewer-root",document.body.appendChild(we));let Me=se||Fo(we,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),De=document.createElement("div");De.className="session-log-root",document.body.appendChild(De);let Be=qr(De,{transport:s?(m,d)=>Promise.resolve(s(m,d)):void 0,sessionLogStore:c}),He=!1,st=!1,mt=!1,te=null,Q=null,Le=0;function Ye(m){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${m}`}function Oe(){He=!1,st=!1,mt=!1,te=null,Q=null,Le+=1}async function ke(m){if(!s)return;let d=++Le;st=!0,mt=!1,v();try{let p=await Promise.resolve(s("get-bead-prompt",{bead_id:m}));if(d!==Le)return;!p||typeof p!="object"||Array.isArray(p)?mt=!0:(te=p,Q=Ye(m))}catch{d===Le&&(mt=!0)}finally{d===Le&&(st=!1,v())}}function Ue(){if(He=!He,He&&u&&Q!==Ye(u)){te=null,ke(u);return}v()}function Ve(){if(!a||!u)return[];let m=a.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter(p=>p&&p.bead_id===u).sort((p,b)=>(b.started_at||0)-(p.started_at||0)).map(p=>({attempt_id:p.attempt_id,bead_id:p.bead_id,status:p.status,started_at:typeof p.started_at=="number"?p.started_at:null,runner:p.runner||null,model:p.model||null,effort:p.effort||p.observed_effort||null,speed:p.speed||null,session_id:p.session_id||null,resumed_from:p.resumed_from||null,continuation_mode:p.continuation_mode||null,dismissed_at:typeof p.dismissed_at=="number"?p.dismissed_at:null,cause:typeof p.cause=="string"?p.cause:null,cause_detail:p.cause_detail||null,exec_default_preset_id:typeof p.exec_default_preset_id=="string"?p.exec_default_preset_id:null,exec_default_preset_revision:typeof p.exec_default_preset_revision=="number"?p.exec_default_preset_revision:null,exec_values:p.exec_values&&typeof p.exec_values=="object"?p.exec_values:null,usage:p.usage||null,usage_legs:Array.isArray(p.usage_legs)?p.usage_legs:[],delegation_sessions:Array.isArray(p.delegation_sessions)?p.delegation_sessions:[]}))}function Qe(){if(!a||!u)return null;let m=a.get();return gn(m&&m.attempts||{},u)}let Ze=new Set;function dt(m){Ze.has(m)?Ze.delete(m):Ze.add(m),v()}function Tt(m){let d=a?a.get():null,p=d&&d.attempts?d.attempts[m]:null;Be.open({attempt_id:m,meta:p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}})}function bt(m,d){let p=a?a.get():null,b=p&&p.attempts?p.attempts[m]:null,q=(b&&Array.isArray(b.delegation_sessions)?b.delegation_sessions:[]).find(H=>H&&typeof H=="object"&&H.launch_id===d);q&&Be.open({attempt_id:m,launch_id:d,meta:{runner:q.provider==="claude"?"claude":"codex",role:q.role,...typeof q.agent_type=="string"?{agent_type:q.agent_type}:{},model:q.model,effort:q.effort,session_id:q.session_id,status:q.status}})}async function pt(m){if(!s||!m)return;let d=await Pr();if(d===null)return;let p=()=>{let H=a?a.get():null;return H&&typeof H.revision=="number"?H.revision:0},b=async(H={},K=p())=>await s("worker-attempt-resume",{attempt_id:m,expected_revision:K,...d!==""?{instructions:d}:{},...H}),w=H=>{H?.queue&&a?.set&&a.set(H.queue)},q=await b();if(w(q),q&&q.conflict){let H=q.queue&&typeof q.queue.revision=="number"?q.queue.revision:p();q=await b({},H),w(q)}q=await Pn(q,(H,K)=>b({continuation:H,decision_token:K}),{onResult:w,refresh:()=>b()}),q&&q.resumed===!1&&!q.conflict&&q.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${q.reason}`,"error",2400)}let Rt={onOpen:Tt,onOpenDelegation:bt,onResume:pt,onToggleUsage:dt};function at(){let m=a?a.get():null,d={...B};for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){let b=m&&m[p];typeof b=="string"&&(d[p]=b)}return d}async function We(){if(s){try{let m=await Promise.resolve(s("get-session-defaults",{}));B=m&&m.values&&typeof m.values=="object"?m.values:{}}catch{B={}}v()}}function Te(){let m=a?a.get():null;return m&&m.runner_catalog||null}function P(){let m=a?a.get():null;return m&&typeof m.execution_defaults=="object"?m.execution_defaults:null}function Z(){let m=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},p=nn({pin:{...m,...h},global:at(),execution_defaults:P(),runner_catalog:Te(),route:typeof m.route=="string"?m.route:null}).orchestration_model.value||"";return xn(Te(),p)}function ie(){let m=i?i.get():null;return!m||typeof m.revision!="number"?null:{revision:m.revision,presets:Array.isArray(m.presets)?m.presets:[]}}function x(m){return m?.compatible===!1}function G(m){i&&m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&i.set({revision:m.revision,presets:m.presets})}async function Ae(){let m=ie(),d=m?.presets.find(p=>p.id===y);if(!(!s||!u||!m||!d||x(d)||$)){$=!0,S=[],v();try{let p=await Promise.resolve(s("apply-impl-preset",Uu(u,d.id,m.revision)));if(p&&p.conflict){G(p),ae("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let b=p&&Array.isArray(p.issue)?p.issue[0]:p?.issue;if(p&&p.applied&&b&&typeof b=="object"){f=b,S=Array.isArray(p.skipped_orchestration_keys)?p.skipped_orchestration_keys.filter(w=>typeof w=="string"):[];for(let w of Qu)delete h[w];ae(S.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}p&&p.error==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(p){p&&typeof p=="object"&&p.code==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{$=!1,v()}}}let A=null;n&&n.subscribe&&(A=n.subscribe(()=>z()));let O=null;a&&typeof a.subscribe=="function"&&(O=a.subscribe(()=>{u&&v()}));let k=null;i&&typeof i.subscribe=="function"&&(k=i.subscribe(()=>{u&&v()}));function I(m){m.key==="Escape"&&u&&(m.preventDefault(),r())}document.addEventListener("keydown",I);function z(){if(u){if(n&&typeof n.snapshotFor=="function"){let m=n.snapshotFor("detail:"+u)||[];f=m.find(p=>p&&p.id===u)||m[0]||f}ue(),v()}}function pe(m){un(m).then(d=>{d?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ce(m){m.preventDefault(),m.stopPropagation(),u&&pe(u)}function ve(m,d){m.preventDefault(),m.stopPropagation(),pe(d)}function et(m,d,p){m.preventDefault(),m.stopPropagation(),Me.open(d,{missing_state:p})}function Ke(m,d){h[m]=d,v(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Bu(u,m,d.length===0?null:d))).catch(()=>{ae("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Ce(m,d){let p=f||{},b=p.metadata&&typeof p.metadata=="object"?p.metadata:{},w={};for(let K of["impl_runtime","impl_model","impl_effort"])w[K]=Object.hasOwn(h,K)?h[K]:typeof b[K]=="string"?b[K]:"";w[m]=d;let q=td(w,Te(),Z()),H={};for(let K of["impl_runtime","impl_model","impl_effort"])H[K]=h[K],h[K]=q[K]||"";v(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...q,orchestration_runtime:Z()})).then(K=>{let ge=Array.isArray(K)?K[0]:K;if(!ge||typeof ge!="object"||!ge.id)throw new Error("implementation target readback failed");f=ge;for(let Re of["impl_runtime","impl_model","impl_effort"])delete h[Re];v()}).catch(()=>{for(let K of["impl_runtime","impl_model","impl_effort"])H[K]===void 0?delete h[K]:h[K]=H[K];v(),ae("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function lt(m,d,p){if(!s||!u)return!1;try{let b=await Promise.resolve(s(m,d)),w=Array.isArray(b)?b[0]:b;return w&&typeof w=="object"&&w.id?(f=w,!0):(ae(p,"error"),!1)}catch{return ae(p,"error"),!1}}function it(m){setTimeout(()=>{try{let d=e.querySelector(m);d&&typeof d.focus=="function"&&d.focus()}catch{}},0)}function It(){D=!0,E=f&&f.title||"",v(),it('.detail-edit__input[data-edit="title"]')}function Dt(m){E=m.target.value}function Wt(){D=!1,E="",v()}function Mt(){lt("edit-text",{id:u,field:"title",value:E},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(d=>{d&&(D=!1,E=""),v()})}function zt(){W=!0,N=f&&f.description||"",v(),it('.detail-edit__textarea[data-edit="description"]')}function yt(m){N=m.target.value}function Nt(){W=!1,N="",v()}function qe(){lt("edit-text",{id:u,field:"description",value:N},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(d=>{d&&(W=!1,N=""),v()})}function Ht(m,d,p,b){if(m.key==="Escape"){m.stopPropagation(),p();return}m.key==="Enter"&&(!b||m.ctrlKey||m.metaKey)&&(m.preventDefault(),d())}function Qt(m){let d=m.target.value;lt("update-status",{id:u,status:d},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function Je(m){let d=Number(m.target.value);lt("update-priority",{id:u,priority:d},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function Ee(m){re=m.target.value}function R(){let m=re.trim();m.length!==0&&lt("label-add",{id:u,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(d=>{d&&(re=""),v()})}function de(m){if(m.key==="Escape"){m.stopPropagation(),re="",v();return}m.key==="Enter"&&(m.preventDefault(),R())}function Ie(m){lt("label-remove",{id:u,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>v())}let rt={onCopyPath:ve,onOpenDoc:et};function vt(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function ft(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ct(m){let p=(Array.isArray(m.dependencies)?m.dependencies:[]).map(b=>({id:vt(b),icon:ft(b)})).filter(b=>b.id.length>0);return l`
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
    `}function Lt(m){let d=m.metadata||{},p=m.workflow||{},b=p.stages||{},w=b.spec&&b.spec.stale,q=b.impl&&b.impl.stale,H=b.plan||null,K=p.route_source==="derived",ge=p.route||d.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${K?" detail-kv__v--derived":""}"
          title=${K?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${K?"unset":ge}</span
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
              <span class="detail-kv__v">${H?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${H?.approval_receipt||"\uC5C6\uC74C"}${H?.approval_state==="stale"?" \xB7 stale":H?.approval_state==="unknown"?" \xB7 unknown":""}</span
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
    `}let Gt={route:["quick_fix","spec_backed","full_plan"]};async function Jt(m,d){let p=d.target.value;if(m==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&p!=="full_plan"&&!window.confirm(`full_plan \u2192 ${p||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){v();return}await lt("update-workflow-meta",{id:u,key:m,value:p},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),v()}function wt(m){let d=m.metadata||{};return l` ${((b,w)=>{let q=Gt[b],H=typeof d[b]=="string"?d[b]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${b}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${b}
          data-edit=${`wfmeta-${b}`}
          @change=${K=>Jt(b,K)}
        >
          <option value="" ?selected=${!q.includes(H)}>
            ${w}
          </option>
          ${q.map(K=>l`<option value=${K} ?selected=${H===K}>${K}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function sn(m,d){return D?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${E}
            @input=${Dt}
            @keydown=${p=>Ht(p,Mt,Wt,!1)}
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
          @click=${It}
        >
          ✎
        </button>
      </div>
    `}function fn(m){let d=jt(m.created_at),p=jt(m.updated_at);return!d&&!p?l``:l`
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
          @change=${Qt}
        >
          ${nb.map(p=>l`<option value=${p} ?selected=${p===m}>${p}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Je}
        >
          ${rb.map(p=>l`<option value=${String(p)} ?selected=${p===d}>
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
              @input=${yt}
              @keydown=${d=>Ht(d,qe,Nt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${qe}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Nt}
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
    `}function Pe(m){let d=Array.isArray(m.labels)?m.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${d.map(p=>l`<span class="detail-label-chip"
              >${p}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${p}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+p}
                @click=${()=>Ie(p)}
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
            @input=${Ee}
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
    `}function _(){if(!u)return l``;let m=f||{},d=String(m.id||u),p=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",b=Qe(),w=m.status||"open",q=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",H=m.description||"",K={...m,metadata:{...m.metadata||{},...h}};return l`
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
          ${sn(p,b)}
          ${Hu(K)}
          ${zu({metadata:K.metadata,workspace_values:at(),catalog:Te(),execution_defaults:P(),expanded:F,presets:ie()?.presets||[],preset_id:y,preset_busy:$,skipped_orchestration_keys:S},{onToggle:ge=>{F=ge,v()},onEdit:(ge,Re)=>{if(ge==="impl_runtime"||ge==="impl_model"||ge==="impl_effort"){Ce(ge,Re??"");return}Ke(ge,Re??"")},onPresetSelect:ge=>{y=ge,S=[],v()},onPresetApply:()=>{Ae()}})}
          ${Xu({md:K.metadata,catalog:Y,workspace_defaults:le,handlers:{onExecChange:Ke}})}
          ${En(w,q)} ${fn(m)}
          ${T(H)}
          ${Ru($e,C,{expanded:ye,draft:xe,sending:V,error:Se})}
          ${L(m)} ${Pe(m)} ${Ct(m)}
          ${Lt(m)} ${wt(m)}
          ${Eu(m,rt)}
          ${ad({expanded:He,loading:st,error:mt,data:te},{onToggle:Ue})}
          ${od(Ve(),Rt,{total:b,expanded:Ze})}
        </div>
      </div>
    `}function v(){Ge(_(),e)}return{load(m){m!==u&&(h={},y="",S=[],F=!1,J(),me(),Oe(),_e()),u=m,f=null,z(),We(),U!==m&&he(m)},clear(){u=null,f=null,h={},y="",$=!1,S=[],F=!1,J(),me(),Oe(),_e(),Me.close(),Be.close(),Ge(l``,e)},destroy(){A&&(A(),A=null),O&&(O(),O=null),k&&(k(),k=null),document.removeEventListener("keydown",I),se||(Me.destroy(),we&&we.parentNode&&we.parentNode.removeChild(we)),Be.destroy(),De.parentNode&&De.parentNode.removeChild(De),u=null,f=null,_e(),y="",$=!1,S=[],me(),Oe(),Ge(l``,e)}}}function ld(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,h="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=f||"An unrecoverable error occurred.");let y=typeof h=="string"?h.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Uo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function $s(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function Wo(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function zo(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function Ho(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function sb(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:Uo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function cd(e,t){let n=sb(e,t);return n?l`<button
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
            >${Ho(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${$s(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Ur(e){let t=cn(e.created_at),n=cn(e.updated_at);return!t&&!n?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${jt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?l`<span>·</span>`:""}${n?l`<span title=${`\uC218\uC815 ${jt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function ob(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function xs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Go(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function An(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(h=>h&&h.bead_id===t&&h.phase!=="done").sort((h,y)=>(h.requested_at||0)-(y.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?ob(s.phase):null,u=s?.kind==="stale_work_backup_fresh",f=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:f}}function ks(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return l`<div
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
  </div>`}var ab={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function ud(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:ab[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Vo(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
  </div>`}function Ko(e,t={}){if(!e)return"";let n=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],s=Array.isArray(e.warnings)?e.warnings:[],o=Array.isArray(e.overlaps)?e.overlaps:[],a=e.scope_missing===!0&&t.lane!=="running",i=e.popover||null,c=e.cross_lane||null;return n.length===0&&r.length===0&&s.length===0&&o.length===0&&!a&&!c?"":l`<div class="worker-deps">
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
        >`)}${s.map(u=>l`<span class="worker-dep worker-dep--warn">${u}</span>`)}${i?ib(i):""}
  </div>`}function Yo(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?l`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function dd(e){return e?l`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Zo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return l`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function lb(e){let t=Array.isArray(e.badges)?e.badges:[],n=Bt(e.usage),r=Mn(e.usage),s=cn(e.done_at);return l`<div
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
  </div>`}function Xn(e){if(e.lane==="done"&&e.done_layout==="three_line")return lb(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Bt(e.usage),s=Mn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?cn(e.done_at):"",u=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",y=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,S=e.lane==="done"?"":Yo(e.workflow),F=dd(e.from_id),B=Zo(e.priority),Y=l`<span class="worker-mini__title">${e.title}</span>`,le=e.pr_url&&e.pr_number?l`<a
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
        >`:"",M=n.map(X=>X===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${X}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${X===e.completion_badge&&e.completion_title||""}
          >${X}</span
        >`),D=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",W=r.length>0?r.map(X=>l`<span class="worker-usage" title=${X.tooltip}
              >${X.label}</span
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
      </button>`:"",re=e.cancel_action?l`<button
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
      </button>`:"",_e=e.discard,fe=_e?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${_e?.attempt_id||""}
          data-operation-id=${_e?.operation?.operation_id||""}
          data-discard-mode=${_e?.confirmation||"unmerged"}
          ?disabled=${_e?!_e.enabled:e.discard_enabled===!1}
          title=${_e?_e.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${_e?.label||"\uD3D0\uAE30"}
        </button>`:"",ee=e.stale_work||null,he=ee?l`${ee.can_resume||ee.can_continue?l`<button
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
          </button>`:""}`:"",$e=ee?l`<div class="worker-mini__stale">
        <strong>${ee.title}</strong>
        <span>${ee.summary}</span>
        <span>${ee.cause}</span>
        ${ee.can_backup_fresh?l`<small
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
        </button>`:"",ne=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${Vo(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",Se=Ko(e.dependency_chips,{lane:e.lane}),xe=ks(e),V=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||_e?.operation||e.revise_action||ee);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">
            ${y}${$}${B}${F}${Y}
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
              >${N}${re}${J}${fe}</span
            >
            ${Ur(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${u}${f}${y}${$}${B}${S}${F}${le}${U}${M}${h}${D}
            </div>
            <div class="worker-mini__body">${Y}${$e}</div>
            ${Se}${ne}${V?l`<div class="worker-mini__foot">
                  ${W}${E}
                  <span class="worker-mini__actions"
                    >${N}${re}${J}${fe}${be}${he}</span
                  >
                  ${ks(e)}
                </div>`:""}
            ${Ur(e)}`:l`<div class="worker-mini__line">
              ${u}${f}${y}${$}${B}${S}${F}${Y}${le}${U}${M}${h}${D}${W}${E}${N}${re}${J}${fe}
            </div>
            ${Se}${ne}${xe} ${Ur(e)}`}
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
      </button>`)}return l`${r}`}function Ci(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),c=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),u=Ko(e.dependency_chips,{lane:e.lane});return l`<div
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
      ${Yo(a)}${r?l`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:""}${dd(e.from_id)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?ao(a,e.status,{onOpenDoc:n.onOpenDoc}):""}${u}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${Vo(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
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
  </div>`}function hn(e){let t=!!e.collapsible&&!!e.collapsed,n=l`<span
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?Ci(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Xn(r))}
          </div>`}
  </section>`}var pd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},fd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function _d(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ri(e){for(let t of _d(e))if(Object.hasOwn(pd,t))return pd[t];return null}function Oi(e){let t=null;for(let n of _d(e))Object.hasOwn(fd,n)&&(t=fd[n]);return t}function Xo(e){let t=Ri(e),n=Oi(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function md(e,t){let n=Ri(e)??Ri(t),r=Oi(t)??Oi(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var gd=160;function ub(e){return e.length>gd?`${e.slice(0,gd)}\u2026`:e}function db(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
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
  </details>`:""}function fb(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function bd(e){let t=e.failure?Xo(e.failure.reason):"";return l`<div class="worker-banners">
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
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var mb=new Set(["codex-runner"]);function gb(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(y=>y&&!(typeof y.agent_type=="string"&&mb.has(y.agent_type))),c=i.filter(y=>y&&y.state==="live"),u=i.filter(y=>y&&y.state!=="live"),f=Ko(e.dependency_chips,{lane:"running"}),h=r?cn(r.updated_at,t):"";return l`${o?l`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?l`<span class="rtile__activity-age"
              >${cn(a,t)}</span
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
      </div>`:""}${f}`}function Li(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?fb(t-e.started_at):"\u2014",c=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,u=ns(e),f=Bt(e.usage),h=Mn(e.usage),y=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,$=e.base_exception||null,S=e.landing,F=e.attempt_id&&e.attempt_id===n,B=r.monitor||null,Y=_b(B),le=gb(B,t,a,s?{updated_at:e.updated_at??null}:null),U=s&&e.workflow?.chips?.exec_receipt||null,M=Yo(e.workflow),D=U?l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${In(U)}`}
        >${`${U.kind}:${io(U)}`}</span
      >`:"",W=M||D?l`<div class="rtile__meta">
          ${M}${D}
        </div>`:"",E=s?"":Ur(e),N=e.discard?.action?l`<button
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
      ${Zo(e.priority)}${Y}${u?l`<span class="rtile__resumed" title=${u}>↻</span>`:""}
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
    ${le}${e.rollup?oo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Ba}):""}
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
            ${Vo(e.exec_chips)}
            ${f.length>0?f.map(re=>l`<span class="worker-usage" title=${re.tooltip}
                      >${re.label}</span
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
  </div>`}function Ii(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Li(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var Pi=new Set(["unavailable","not_applicable"]);function Qn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function hd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Jn(e,t){return t===null?null:`${Zn[e]}: ${t.display} (${Po[t.source]})`}function Di(e){return e.filter(t=>t!==null).join(`
`)}function As(e){if(typeof e!="object"||e===null)return null;let t=fr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Di(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Zn.orchestration_model,e.model),n(Zn.orchestration_effort,e.effort),n(Zn.orchestration_speed,e.speed)])}}function br(e,t){let n=Qn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Qn(e,"orchestration_effort"),s=Qn(e,"orchestration_speed"),o=hd([xn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Di(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Jn("orchestration_model",n),Jn("orchestration_effort",r),Jn("orchestration_speed",s)])}}function bb(e,t){return e===null||e.value===null||Pi.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function hb(e){return e===null||Pi.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function yb(e){return e===null?null:e.value==="auto"?"auto":Pi.has(e.resolution)?null:e.display}function er(e,t){if(typeof e!="object"||e===null)return null;let n=Qn(e,"impl_dispatch"),r=Qn(e,"impl_runtime"),s=Qn(e,"impl_model"),o=Qn(e,"impl_effort"),a=Qn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":hd([bb(r,t??null),hb(s),yb(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Di(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Jn("impl_dispatch",n),Jn("impl_runtime",r),Jn("impl_model",s),Jn("impl_effort",o),Jn("impl_speed",a)])}}var Ut="",vb=["impl_runtime","impl_model","impl_effort"],wb=["claude_account","codex_account"],kb=5,Qo=1;function rn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Jo(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(P=>ae(P,"error",4e3)),o={},a={},i=[],c=!1,u={state:"absent",values:{},warnings:[]},f={},h={},y=Promise.resolve(),$={claude:null,codex:null},S=!1,F=null,B={},Y="",le="",U=!1,M=!1,D=!1,W=null,E=!1;function N(){let P=t.queue?t.queue():null;return rn(P)?P:null}function re(){let P=N();return P?P.runner_catalog:null}function J(){let P=N();return P&&rn(P.execution_defaults)?P.execution_defaults:null}function _e(){let P=t.implPresetStore?.get();return rn(P)&&Array.isArray(P.presets)?P:null}function fe(){return r===null?{}:{root_dir:r}}async function ee(P,Z){return E||!n?null:await n(P,Z)}function he(P){P&&rn(P.queue)&&t.onQueueAdopt?.(P.queue)}async function $e(P,Z){let ie=N();if(!ie||E)return null;let x=await ee(P,{...Z,...fe(),expected_revision:ie.revision});if(he(x),r!==null&&x&&x.conflict){let G=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:N()?.revision??ie.revision;x=await ee(P,{...Z,...fe(),expected_revision:G}),he(x)}return x}async function be(){c=!0,Te();try{let P=await ee("get-session-defaults",{...fe()});o=rn(P?.values)?{...P.values}:{},a={...o},i=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{c=!1,Te()}}async function ne(){let P=qu(o,a);if(Object.keys(P).length!==0){try{let Z=await ee("set-session-defaults",{values:P,...fe()});o=rn(Z?.values)?{...Z.values}:{},a={...o},i=Array.isArray(Z?.warnings)?Z.warnings:[]}catch(Z){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}Te()}}function Se(P,Z){if(!rn(P))return;let ie=P.state;u={state:ie==="usable"||ie==="unusable"||ie==="absent"?ie:"absent",values:rn(P.values)?{...P.values}:{},warnings:Array.isArray(P.warnings)?P.warnings:[]},h={...u.values},Z&&(f={...h})}async function xe(){try{Se(await ee("get-workspace-accounts",{...fe()}),!0)}catch(P){u={state:"unusable",values:{},warnings:["kv_read_failed"]},h={},f={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}Te()}async function V(P){try{let Z=await fetch(P);if(!Z.ok)return null;let ie=await Z.json();if(!rn(ie)||!Array.isArray(ie.accounts))return null;let x=ie.accounts.filter(G=>rn(G)&&typeof G.key=="string"&&G.key.length>0&&typeof G.email=="string"&&G.email.length>0);return{accounts:x,active:x.find(G=>G.active===!0)||null}}catch{return null}}async function X(){S=!0;let[P,Z]=await Promise.all([V("/api/claude-usage"),V("/api/codex-usage")]);E||($={claude:P,codex:Z},Te())}function ye(){let P={};for(let Z of wb){let ie=Object.hasOwn(f,Z)?f[Z]:null,x=Object.hasOwn(h,Z)?h[Z]:null;ie!==x&&(P[Z]=ie)}return P}async function me(){let P=ye();if(Object.keys(P).length!==0){try{Se(await ee("set-workspace-accounts",{values:P,...fe()}),!1)}catch(Z){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}Te()}}function Fe(P,Z){Z===Ut?delete f[P]:f[P]=Z,Te(),y=y.then(()=>me())}function ue(P,Z){if(vb.includes(P)){ut(P,Z);return}Z===Ut?delete a[P]:a[P]=Z,Te(),ne()}function ze(){let P=at().orchestration_model,Z=nn({global:{orchestration_model:P??void 0},execution_defaults:J(),runner_catalog:re()}).orchestration_model.value;return Z?xn(re(),Z):null}function tt(P,Z){typeof Z=="string"&&Z.length>0?a[P]=Z:delete a[P]}function ut(P,Z){let ie=Z===Ut?void 0:Z,x=Mu({impl_runtime:P==="impl_runtime"?ie:a.impl_runtime,impl_model:P==="impl_model"?ie:a.impl_model,impl_effort:P==="impl_effort"?ie:a.impl_effort},re(),ze());tt("impl_runtime",x.impl_runtime),tt("impl_model",x.impl_model),tt("impl_effort",x.impl_effort),Te(),ne()}async function C(){let P=N();if(!P)return;let Z={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},ie=Fu(Z,{...Z,...B});if(Object.keys(ie).length!==0){try{let x=await $e("worker-queue-set-orchestration-defaults",{values:ie});if(x&&x.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}B={}}catch(x){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Te()}}function se(P,Z){B[P]=Z===Ut?null:Z,Te(),C()}function we(P){if(F=P,!P){Te();return}let Z=re(),ie=at(),x=ie.orchestration_model;x&&!vs(Z,P).includes(x)&&(B.orchestration_model=null,x=null);let G=ie.orchestration_effort;G&&!wi(Z,P,x||pn).includes(G)&&(B.orchestration_effort=null),Te(),C()}async function Me(P){if(!(!N()||P<Qo)){try{await $e("worker-queue-set-slots",{slots:P})}catch(Z){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}Te()}}async function De(P){if(!(!N()||P<Qo||P>kb)){try{await $e("worker-queue-set-serial-lane-count",{count:P})}catch(Z){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}Te()}}async function Be(P,Z){let ie=P==="auto_advance"?"worker-automation-toggle":P==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await $e(ie,{on:Z})}catch(x){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Te()}function He(){let P={},Z=at();for(let ie of Ro){let x=Bn.includes(ie)?Z[ie]:a[ie];typeof x=="string"&&x.length>0&&(P[ie]=x)}return P}async function st(){let P=_e();if(!P)return;let Z=He();if(Object.keys(Z).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ie=(P.presets||[]).find(G=>G.id===Y),x=le.trim()||(ie?ie.name:"");if(!x){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=ie?await ee("impl-preset-update",{expected_revision:P.revision,id:ie.id,name:x,settings:Z}):await ee("impl-preset-create",{expected_revision:P.revision,name:x,settings:Z});if(G&&G.applied){if(le="",!ie&&Array.isArray(G.presets)){let Ae=G.presets.find(A=>A.name===x);Y=Ae?Ae.id:Y}Te()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Te()}catch(G){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function mt(){let P=_e();if(!(!P||Y.length===0))try{let Z=await ee("impl-preset-delete",{expected_revision:P.revision,id:Y});Z&&Z.applied?(Y="",Te()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Te())}catch(Z){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}}function te(P){o=rn(P.values)?{...P.values}:{},a={...o},i=Array.isArray(P.warnings)?P.warnings:[],rn(P.queue)&&(t.onQueueAdopt?.(P.queue),B={})}async function Q(){let P=_e(),Z=N();if(!P||!Z||Y.length===0)return;let ie=x=>({preset_id:Y,expected_revision:P.revision,expected_queue_revision:x,...fe()});try{let x=await ee("apply-impl-preset-global",ie(Z.revision));if(x&&x.applied&&te(x),r!==null&&x&&x.queue_applied===!1){let G=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:N()?.revision??Z.revision;x=await ee("apply-impl-preset-global",ie(G)),x&&x.applied&&te(x)}x&&x.applied?x.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):x&&x.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(x){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Te()}async function Le(){M=!0,D=!1,Te();try{let P=await ee("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?D=!0:W=P}catch{D=!0}finally{M=!1,Te()}}function Ye(){if(U=!U,U&&!W){Le();return}Te()}function Oe(){let P=Nr({loading:M,error:D});if(P)return P;if(!W)return"";let Z=Array.isArray(W.variants)?W.variants:[];return l`<div class="settings-dialog__sp-body">
      ${W.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${W.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Z.map(ie=>l`<div class="settings-dialog__sp-variant" data-variant=${ie.key}>
            <div class="settings-dialog__sp-cond">${ie.condition}</div>
            ${jn(ie.label,ie.system_prompt)}
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
        aria-expanded=${U?"true":"false"}
        @click=${Ye}
      >
        ${U?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${U?Oe():""}
    </section>`}function Ue(P,Z,ie,x,G,Ae,A){let O=G[P]??Ut,k=ki(P,ie,G,J(),re(),A),I=k.options.find(pe=>pe.value===O),z=O===Ut?k.full_value:I?.full_value;return l`<select
        class=${O===Ut?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${Z}
        title=${z||""}
        ?disabled=${Ae===!0||k.disabled}
        .value=${gr(String(O))}
        @change=${pe=>x(P,String(pe.target.value))}
      >
        <option value=${Ut} ?selected=${O===Ut}>
          ${k.unset_label}
        </option>
        ${k.options.map(pe=>l`<option
              value=${pe.value}
              title=${pe.full_value||""}
              ?selected=${pe.value===O}
            >
              ${pe.label}
            </option>`)}
      </select>
      ${O===Ut?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ve(P,Z,ie,x,G,Ae=!1,A){return l`<div
      class=${`settings-dialog__row${Ae?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        ${Ue(P,Z,ie,x,G,Ae,A)}
      </span>
    </div>`}function Qe(P,Z){let ie=Z?Z.active:null;return rn(ie)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${P==="claude"?ie.email:Br({...ie,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Ze(P,Z,ie){let x=$[ie],G=Object.hasOwn(f,P)?f[P]:Ut,Ae=ie==="claude"?No:Br,A=!!x?.accounts.some(O=>O.key===G);return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${Z}
          data-account-key=${P}
          @change=${O=>Fe(P,String(O.target.value))}
        >
          <option value=${Ut} ?selected=${G.length===0}>
            ${Qe(ie,x)}
          </option>
          ${G.length>0&&!A?l`<option value=${G} selected>
                ${G} (목록에 없음)
              </option>`:""}
          ${x?.accounts.map(O=>l`<option value=${O.key} ?selected=${O.key===G}>
                ${Ae(O)}
              </option>`)||""}
        </select>
        ${x?"":l`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function dt(){let P=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${P} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${P}`:null}function Tt(P,Z,ie,x,G){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Z}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${Ue(ie,`${P} \uBAA8\uB378`,x,ue,a,!1)}
        ${Ue(G,`${P} effort`,Io,ue,a,!1)}
      </span>
    </div>`}function bt(P,Z,ie,x){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${x?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${x?"true":"false"}
          aria-label=${Z}
          @click=${()=>Be(P,!x)}
        >
          ${x?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ie}</span>
      </span>
    </div>`}function pt(P,Z,ie,x){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
          <button
            type="button"
            aria-label=${`${Z} \uAC10\uC18C`}
            @click=${()=>x(ie-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ie}</span>
          <button
            type="button"
            aria-label=${`${Z} \uC99D\uAC00`}
            @click=${()=>x(ie+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Rt(P){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${P.rows.length>0?`\uBCC0\uACBD ${P.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${P.rows.map(Z=>l`<div
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
      ${P.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${P.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function at(){let P=N(),Z={};for(let ie of Bn)Z[ie]=Object.prototype.hasOwnProperty.call(B,ie)?B[ie]:P&&typeof P[ie]=="string"?P[ie]:null;return Z}function We(){let P=re(),Z=a.impl_runtime,ie=a.impl_model,x=_e(),G=N(),Ae=at(),A=vs(P,F),O=Fr(P,void 0).filter(Ce=>Ce!==pn),k=wi(P,F,Ae.orchestration_model||pn).filter(Ce=>Ce!==pn),I=Y?(x?.presets||[]).find(Ce=>Ce.id===Y):null,z=I?Nu(He(),rn(I.settings)?I.settings:{}):null,pe=G&&typeof G.slots=="number"?G.slots:Qo+1,ce=G&&typeof G.serial_lane_count=="number"?G.serial_lane_count:Qo,ve=J()?.supported===!0,et=dt(),Ke=ki("workflow_mode",hs,a,J(),P);return l`
      ${i.length>0?l`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${et?l`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${et}
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
                .value=${gr(Y)}
                @change=${Ce=>{Y=String(Ce.target.value),Te()}}
              >
                <option value="" ?selected=${Y===""}>
                  실행 프리셋…
                </option>
                ${(x?.presets||[]).map(Ce=>l`<option
                      value=${Ce.id}
                      ?selected=${Ce.id===Y}
                    >
                      ${Ce.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!z||z.rows.length===0}
                @click=${Q}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Y?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${gr(le)}
                @input=${Ce=>{le=String(Ce.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${Y?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${st}
              >
                ${Y?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${Y.length===0}
                @click=${mt}
              >
                삭제
              </button>
            </div>
            ${z?Rt(z):""}

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
              ${Ve("orchestration_model","\uBAA8\uB378",A,se,Ae)}
              ${Ve("orchestration_effort","effort",k,se,Ae)}
              ${Ve("orchestration_speed","\uC18D\uB3C4",bs,se,Ae)}
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
                      data-mode=${Ut}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>ue("workflow_mode",Ut)}
                    >
                      ${Ke.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${hs.map(Ce=>l`<button
                          type="button"
                          data-mode=${Ce}
                          aria-pressed=${String(a.workflow_mode===Ce)}
                          @click=${()=>ue("workflow_mode",Ce)}
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
              ${Tt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ys,"spec_review_effort")}
              ${Tt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Lo,"plan_review_effort")}
              ${Tt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ys,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ve("impl_runtime","\uC704\uC784 \uB300\uC0C1",Oo,ue,a)}
              ${Ve("impl_model","\uBAA8\uB378",Fr(P,Z),ue,a)}
              ${Ve("impl_effort","effort",jr(P,Z,ie),ue,a)}
              ${Ve("impl_speed","\uC18D\uB3C4",bs,ue,a)}
              ${Ve("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",O,ue,a,!1,{...a,...Ae})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${bt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",G?.auto_advance===!0)}
              ${bt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",G?.auto_merge===!0)}
              ${bt("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",G?.auto_repair===!0)}
              ${pt("slots","\uB3D9\uC2DC \uC2E4\uD589",pe,Ce=>Me(Ce))}
              ${pt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",ce,Ce=>De(Ce))}
            </div>
            ${ke()}
          `}
    `}function Te(){E||Ge(We(),e)}return{load(){B={};let P=[be(),xe()];return S||P.push(X()),Promise.all(P).then(()=>{})},render:Te,sessionDraft:()=>({...a}),destroy(){E=!0,Ge(l``,e)}}}function ea(e){return l`<svg
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
  </svg>`}function yd(){return ea(es`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function vd(){return ea(es`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function wd(){return ea(es`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function kd(){return ea(es`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function $d(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function xd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Bt(fo(t));let n={};for(let i of Dn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let f of Dn){let h=c[f];typeof h=="number"&&Number.isFinite(h)&&(n[f]+=h,r=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Mn(n):null}function Sn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Mi(e,t){let n=Sn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function $b(e,t){if(!Sn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function xb(e){if(!Sn(e)||!Sn(e.execution_defaults)||!Sn(e.runner_catalog)||!Sn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=nn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=xn(e.runner_catalog,n.orchestration_model.value??""),s=br(n,e.runner_catalog),o=er(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Ad(e,t){let n=t.notify||(V=>ae(V,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let u=null,f=null,h=null,y=new Map;function $(){let V=t.workspacesState?t.workspacesState():[];return Array.isArray(V)?V.filter(X=>Sn(X)):[]}function S(V){return $().find(X=>X.root_dir===V)||null}function F(V){return $b(S(V),y.get(V))}function B(){for(let V of $()){let X=y.get(V.root_dir);X&&typeof X.revision=="number"&&typeof V.revision=="number"&&V.revision>=X.revision&&y.delete(V.root_dir)}}async function Y(V,X,ye){let me=t.transport,Fe=F(X);if(!(!me||!Sn(Fe))){try{let ue=await me(V,{...ye,root_dir:X,expected_revision:Fe.revision});if(Sn(ue?.queue)&&y.set(X,ue.queue),ue&&ue.conflict){let ze=Sn(ue.queue)&&typeof ue.queue.revision=="number"?ue.queue.revision:F(X)?.revision;ue=await me(V,{...ye,root_dir:X,expected_revision:ze}),Sn(ue?.queue)&&y.set(X,ue.queue)}}catch(ue){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ue instanceof Error?ue.message:String(ue)}`)}ne()}}function le(V){u!==V&&(u=V,t.onFocusChange?.(u),ne())}function U(V){le(u===V?null:V)}function M(V){if(f===V){W();return}D(),f=V;let X=S(V);a.textContent=`${X?.name||V} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,h=Jo(c,{root_dir:V,queue:()=>F(V),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ye=>{y.set(V,ye),ne()}}),h.load(),ne()}function D(){h?.destroy(),h=null}function W(V){D(),f=null,s.hidden=!0,a.textContent="",V!==!0&&ne()}let E=()=>W();i.addEventListener("click",E);function N(V){V.key==="Escape"&&u!==null&&le(null)}document.addEventListener("keydown",N);function re(V,X){let ye=Math.max(X,V,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${X}\uAC1C \uC911 ${V}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ye},(me,Fe)=>Fe<V?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function J(V){let X=V.auto_advance===!0,ye=V.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${X?" is-on":""}`}
        data-act="auto"
        aria-pressed=${X?"true":"false"}
        aria-label=${`${V.name} \uC790\uB3D9\uD654`}
        title=${X?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${X?vd():yd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ye?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ye?"true":"false"}
        aria-label=${`${V.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ye?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${wd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${f===V.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${f===V.root_dir?"true":"false"}
        aria-label=${`${V.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${kd()}
      </button>`}function _e(V){let X=xb(V);return X?l`<div class="mon2-deck__chips">
      ${X.orchestration?l`<span class="mon2-deck__chip" title=${X.orchestration.title}
            >오케 ${X.orchestration.text}</span
          >`:""}
      ${X.worker?l`<span class="mon2-deck__chip" title=${X.worker.title}
            >워커 ${X.worker.text}</span
          >`:""}
    </div>`:""}function fe(V){let X=[];for(let[ye,me]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Fe=Mi(V,ye);Fe>0&&X.push(`${me} ${Fe}`)}return X.join(" \xB7 ")}function ee(V){let X=Mi(V,"running"),ye=typeof V.slots=="number"?V.slots:1;return l`<div
      class=${`mon2-deck__tile${u===V.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${V.root_dir}
      aria-pressed=${u===V.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${V.root_dir}>${V.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ye}\uAC1C \uC911 ${X}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${X}/${ye}</span>
          ${re(X,ye)}
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
        <div class="mon2-deck__ops">${J(V)}</div>
        <span class="mon2-deck__counts">${fe(V)}</span>
        ${_e(V)}
      </div>
    </div>`}function he(V){let X=t.doneItems?t.doneItems():[],ye=t.rangeLabel?t.rangeLabel():"",me=xd(Array.isArray(X)?X:[]),Fe=ue=>V.reduce((ze,tt)=>ze+Mi(tt,ue),0);return l`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${V.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ye}`}
        >실행 ${Fe("running")} · 대기 ${Fe("queue")} · PR
        ${Fe("pr_wait")}${Fe("session_active")>0?` \xB7 \uC138\uC158 ${Fe("session_active")}`:""}
        · ${ye} 완료
        ${Array.isArray(X)?X.length:0}</span
      >
      ${me===null?"":l`<span class="mon2-deck__total-tokens">
            ${typeof me=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${$d(ye)}
                  >${me}</span
                >`:me.map(ue=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${ue.provider}
                      title=${ue.tooltip}
                      >${ue.label}</span
                    >`)}
          </span>`}
    </div>`}function $e(){let V=$();return V.length===0?"":l`${he(V)}
      <div class="mon2-deck__strip">
        ${V.map(X=>ee(X))}
      </div>`}function be(){u!==null&&!S(u)&&(u=null,t.onFocusChange?.(null))}function ne(){B(),be(),f!==null&&!S(f)&&W(!0),Ge($e(),r),h?.render()}function Se(V){let X=V.target;if(!X||typeof X.closest!="function")return;let ye=X.closest("[data-root-dir]");if(!ye)return;let me=ye.getAttribute("data-root-dir")||"",Fe=X.closest("[data-act]")?.getAttribute("data-act");if(Fe==="worker"){t.gotoWorkerTab?.(me);return}if(Fe==="auto"){Y("worker-automation-toggle",me,{on:F(me)?.auto_advance!==!0});return}if(Fe==="merge"){Y("worker-merge-auto-toggle",me,{on:F(me)?.auto_merge!==!0});return}if(Fe==="gear"){M(me);return}U(me)}function xe(V){if(V.key!=="Enter"&&V.key!==" ")return;let X=V.target;if(!X||typeof X.closest!="function")return;let ye=X.closest('[data-root-dir][role="button"]');!ye||ye!==X||(V.preventDefault(),U(ye.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Se),r.addEventListener("keydown",xe),{render:ne,focusRoot:()=>u,panelRoot:()=>f,destroy(){document.removeEventListener("keydown",N),r.removeEventListener("click",Se),r.removeEventListener("keydown",xe),i.removeEventListener("click",E),D(),Ge(l``,r),e.replaceChildren()}}}var Ab="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Sb="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Eb="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ss="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Ni(e,t){return`${e}\0${t}`}function Tb(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Cb(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function na(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Rb(e,t){let n=new Set;for(let[a,i]of t)for(let c of i)n.add(Ni(a,c));let r=new Map,s=new Map;for(let a of e){let i=Ni(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Ni(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Ob(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Lb(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ta(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Sd(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function ra(e){let t=Cb(e.blocked_by_map),n=[],r={refusal:null},s=i=>{let c=e.owner_of.get(i);return typeof c!="string"||c.length===0?(r.refusal=Tb(i),null):c};return{graph:t,dep_ops:n,state:r,ownerOf:s,addDep:(i,c)=>{if(r.refusal!==null||i===c)return;let u=t.get(i)||[];if(u.includes(c))return;let f=s(i);if(f!==null){if(na(t,c,i)){r.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${i}\uAC00 \uC774\uBBF8 ${c}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(i,[...u,c]),n.push({type:"dep-add",a:i,b:c,root_dir:f})}},removeDep:(i,c)=>{if(r.refusal!==null||i===c)return;let u=t.get(i)||[];if(!u.includes(c))return;let f=s(i);f!==null&&(t.set(i,u.filter(h=>h!==c)),n.push({type:"dep-remove",a:i,b:c,root_dir:f}))}}}function sa(e,t,n,r){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Rb(e.dep_ops,t.blocked_by_map),o=s.filter(i=>i.type==="dep-remove"),a=s.filter(i=>i.type==="dep-add");return{lane_ops:n,ops:[...o,...a,...r],lane_op_index:o.length}}function Ed(e,t){for(let n=1;n<t.length;n+=1)e.addDep(t[n].bead_id,t[n-1].bead_id)}function Td(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(ta(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function Ib(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function qi(e,t,n){let r=ra(n),s=[],o=[],a=n.owner_lane_of.get(e.bead_id),i=e.kind==="chain"?e.lane_id??a:void 0,c=i===void 0?void 0:n.cross_lanes.get(i);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Ab};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Sb};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Sd(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Ss}}if(e.kind==="chain"&&c===void 0)return{refused:Ss};let u=()=>{if(c===void 0||c.status!=="confirmed")return;let y=c.entries.map(B=>B.bead_id),$=new Set(y),S=(r.graph.get(e.bead_id)||[]).filter(B=>$.has(B)),F=y.filter(B=>(r.graph.get(B)||[]).includes(e.bead_id));for(let B of S)r.removeDep(e.bead_id,B);for(let B of F)r.removeDep(B,e.bead_id);for(let B of S)for(let Y of F)r.addDep(Y,B)},f=(y,$)=>{let S=n.cross_lanes.get(y),F=S.entries.findIndex(E=>E.bead_id===e.bead_id),B=S.entries.filter(E=>E.bead_id!==e.bead_id),Y=Math.max(0,Math.min(B.length,F>=0&&$>F?$-1:$)),le=-1;if(B.forEach((E,N)=>{n.fixed_members.has(E.bead_id)&&(le=N)}),Y<=le){r.state.refusal=Eb;return}let U=F>=0?S.entries[F]:c?.entries.find(E=>E.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir},M=[...B.slice(0,Y),U,...B.slice(Y)];if(Ib(M,S.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:y,entries:M}}),S.status!=="confirmed")return;let D=Y>0?B[Y-1].bead_id:null,W=Y<B.length?B[Y].bead_id:null;if(D===null){W!==null&&r.addDep(W,e.bead_id);return}r.addDep(e.bead_id,D),W!==null&&(r.graph.get(W)||[]).includes(D)&&(r.removeDep(W,D),r.addDep(W,e.bead_id))},h=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(u(),c!==void 0&&(t.kind!=="chain"||t.lane_id!==i)&&s.push({type:"monitor-lane-update",payload:{lane_id:i,entries:c.entries.filter(y=>y.bead_id!==e.bead_id)}})),t.kind==="chain"&&f(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let y=Ob(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(ta(e.bead_id,e.root_dir,y));else if(e.kind==="parallel"){let $=n.parallel_rows,S=$[Math.max(0,Math.min($.length,t.marker_index))];if(!(!!S&&S.bead_id===e.bead_id)&&Lb(n,e.root_dir)&&h!==void 0){let B=h>y?y:y-1;B>=0&&B!==h&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:B},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let y=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&y.status==="confirmed"&&o.push(ta(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(h!==void 0&&t.index!==h){let y=h>t.index?t.index:t.index-1;y>=0&&y!==h&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:y},root_dir:e.root_dir})}}else o.push(ta(e.bead_id,e.root_dir,t.index,t.lane_id));return sa(r,n,s,o)}function Cd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Ss};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=ra(t),s=[];return Ed(r,n.entries),r.state.refusal===null&&Td(r,t,n.entries,s),sa(r,t,[{type:"monitor-lane-confirm",payload:{lane_id:e}}],s)}function Rd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Ss};let r=ra(t),s=[];return Ed(r,n.entries),r.state.refusal===null&&Td(r,t,n.entries,s),sa(r,t,[],s)}function Od(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Ss};let r=ra(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return sa(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[])}function Fi(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Sd(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Pb="\uC0AC\uC774\uD074",Db=["running","pr_wait"];function Ld(e,t,n){let r=new Map;for(let i of n.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||r.has(i.bead_id)||r.set(i.bead_id,i);let s=r.get(e)?.root_dir,o=n.blocked_by_map.get(e)||[],a=[];for(let i of r.values()){if(i.bead_id===e||i.lane==="done"||t==="successor"&&Db.includes(i.lane)||(t==="predecessor"?o.includes(i.bead_id):(n.blocked_by_map.get(i.bead_id)||[]).includes(e)))continue;let u=t==="predecessor"?na(n.blocked_by_map,i.bead_id,e):na(n.blocked_by_map,e,i.bead_id);a.push({...i,disabled:u,...u?{reason:Pb}:{}})}return a.sort((i,c)=>{let u=s!==void 0&&i.root_dir===s,f=s!==void 0&&c.root_dir===s;return u!==f?u?-1:1:i.bead_id.localeCompare(c.bead_id)}),a}function Id(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var Pd={running:3,paused:2,failed:1};function Wr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Dd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Md(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Wr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Wr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),h=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let f=Pd[u.run_state],h=Pd[i];if(f>h||f===h&&(u.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:r}}function oa(e){return e.replace(/\/+$/,"")}function Mb(e,t){let n=oa(e),r=oa(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function aa(e,t){let n=new Set;for(let r of e)for(let s of t){if(!Mb(r,s))continue;let o=oa(r),a=oa(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var Nd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Es=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ia(e,t){let n=Nd.find(s=>s.step===e);if(!n)return null;let r=Nd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function qd(e){let t=Es.findIndex(n=>n.step===e);return Es.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function hr(e){let t=Es.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Nb(e){let t=Es.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Es.length}}function la(e){let t=Nb(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Bi=new Set(["queued","running","retry_pending","repairing"]),Fd=new Set(["failed","succeeded"]),qb={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Ts={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Fb={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ts.base_containment,child_sweep:Ts.child_sweep,branch_cleanup:Ts.branch_cleanup,parent_close:Ts.parent_close};function jb(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Bb(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Bi,...Fd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Ub(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function ji(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=qb[s];if(!o)return null;let a=ia(n,`${r} ${o}`);return a?{...a,active:Bi.has(s),failed:s==="failed"}:null}function Wb(e){return!e||typeof e!="object"?null:Fb[e.step]||null}function Cs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Wb(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=jb(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(S=>S&&typeof S=="object"&&Bb(S,t,i)).sort(Ub):[],u=a?c:[],f=u.find(S=>Bi.has(S.state));if(f)return ji(f);if(s)return s.step==="repo_operations"&&c[0]?ji(c[0],!0):null;let h=u.find(S=>Fd.has(S.state)?S.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(h)return ji(h);if(r){let S=ia(r.step,r.label);return S?{...S,active:!0,failed:!1}:null}let y=typeof e.cleanup_cursor=="string"?Ts[e.cleanup_cursor]:null;if(!y)return null;let $=ia(y.step,y.label);return $?{...$,active:!0,failed:!1}:null}function ca(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function Ui(e,t){return`${e}\0${t}`}function jd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Wi(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function zb(e,t){return e==="internal"&&t===void 0}function Rs(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Bd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Rs(s)})`,location_label:Rs(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Wi(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:zb(a,s)}}function Ud(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Ui(i.root_dir,c.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(u,[]);for(let f of Array.isArray(c.items)?c.items:[])r.set(f.id,u)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Ui(i.root_dir,c.id),f=Array.isArray(c.items)?c.items[0]:null,y=!!f&&f.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(f.blocked_by)?f.blocked_by:[],$=s.get(u);if($)for(let S of y){let F=r.get(S);F&&F!==u&&!$.includes(F)&&$.push(F)}}let o=(i,c)=>{let u=new Set,f=[i];for(;f.length>0;){let h=f.pop();if(h===c)return!0;!h||u.has(h)||(u.add(h),f.push(...s.get(h)||[]))}return!1},a=new Map;for(let[i,c]of s){let u=[];for(let f of c){let h=n.get(f);o(f,i)&&h&&u.push(h)}u.length>0&&a.set(i,u)}return a}function Wd(e,t){return Ui(e,t)}var zd=1,Os=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Hi=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],yr={show_blocked:!0,spec:"all",with_deps:!1},Hd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Hb(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Wr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Gb(e,t){let{winners:n,resumed_from_ids:r}=Md(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,c=a.run_state,u=a.started_at,f=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:gn(e,i.bead_id),can_pause:c==="running"&&f,can_resume:c!=="running"&&f&&!r.has(i.attempt_id)})}return s}function Gd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function xt(e){return e&&typeof e=="object"?e:{}}function Vb(e,t,n){let r=xt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=y=>nn({pin:y,global:a,execution_defaults:s,runner_catalog:o,route:n}),c,u;try{c=i(r),u=i(null)}catch{return null}let f=Vd(br(c,o),br(u,o)),h=Vd(er(c,null),er(u,null));return f||h?{orchestration:f,worker:h}:null}function Vd(e,t){return!e||t&&t.text===e.text?null:e}function Kb(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function Yb(e,t,n){let r=n.get(e);return!r||r.state==="done"?null:{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${Rs(r)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`,...r.root_dir&&r.root_dir!==t?{badge:r.workspace_name||r.root_dir}:{}}}function Zb(e,t){let n=Wi(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Kd(e,t,n){let r=t.get(e);if(!r)return Zb(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Rs(r)}function Xb(e,t,n,r,s,o){let a=[];return e.forEach((i,c)=>{let u=typeof i.id=="string"?i.id:"";if(u.length===0)return;let f=i.status==="confirmed"?"confirmed":"draft",h=Array.isArray(i.entries)?i.entries:[],y=[];h.forEach(($,S)=>{let F=$&&typeof $.bead_id=="string"?$.bead_id:"";if(F.length===0)return;let B=$&&typeof $.root_dir=="string"?$.root_dir:"",Y=n.get(F),le=Y?Y.state:void 0,U=le==="running"||le==="pr_wait"||le==="done",M=!Y||le==="runnable",D=Y&&Y.lane==="parallel"&&typeof Y.position=="number"?Y.position-1:null,W=y.length>0?y[y.length-1].id:null,E=f==="confirmed"&&W!==null&&!(t.get(F)||[]).includes(W);y.push({id:F,title:s.get(F)||F,root_dir:Y?Y.root_dir:B,workspace_name:Y?Y.workspace_name:o.get(B)||"",seq:S+1,location_label:Kd(F,n,r),draggable:!U,fixed:U,done:le==="done",unplaced:M,mismatch:E,...D!==null?{queue_index:D}:{}})}),y.forEach(($,S)=>{$.seq=S+1}),a.push({lane_id:u,status:f,draft:f==="draft",number:c+1,label:`\uC5F0\uACB0 ${c+1} \xB7 \uB808\uD3EC \uAC04`,rows:y,all_done:y.length>0&&y.every($=>$.done),can_confirm:f==="draft"&&y.length>=2,has_mismatch:f==="confirmed"&&y.some($=>$.mismatch||$.unplaced)})}),a}function Qb(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Jb(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:c,state:u}=Qb(i,t,n);if(u!==void 0&&(i.scope_state=u),c.length===0)continue;let f=o.get(i.root_dir);f?f.push({item:i,scope:c}):o.set(i.root_dir,[{item:i,scope:c}])}let a=(i,c,u)=>{let f={id:c.id,title:c.title,location_label:Kd(c.id,r,s),prefixes:u};i.overlap_chips?i.overlap_chips.push(f):i.overlap_chips=[f]};for(let i of o.values())for(let c=0;c<i.length;c+=1)for(let u=c+1;u<i.length;u+=1){let f=aa(i[c].scope,i[u].scope);f.length!==0&&(a(i[c].item,i[u].item,f),a(i[u].item,i[c].item,f))}}function zi(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ua(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Gi(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...yr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,c=n&&Os.some(C=>C.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let C of s)C&&typeof C.root_dir=="string"&&u.set(C.root_dir,C);let f=new Map;for(let C of s)C&&typeof C.root_dir=="string"&&f.set(C.root_dir,C.name||C.root_dir);for(let C of r)C&&typeof C.root_dir=="string"&&f.set(C.root_dir,C.name||C.root_dir);let h=[],y=[],$=[],S=[],F=[],B=[],Y=new Map,le=new Map,U=new Map,M=new Map,D=new Map,W=new Map,E=new Map,N=new Map;for(let C of r){if(!C||typeof C.root_dir!="string")continue;let se=C.root_dir,we=C.name||se,Me=u.get(se),De=Me&&typeof Me.revision=="number"?Me.revision:typeof C.revision=="number"?C.revision:0,Be=xt(C.attempts),He=xt(C.bead_titles);for(let[k,I]of Object.entries(He))typeof I=="string"&&I.length>0&&N.set(k,I);let st=xt(C.bead_times),mt=xt(C.pr_observations),te=xt(C.admission),Q=xt(C.revise_parked),Le=xt(C.merge_queue_state),Ye=xt(C.cleanup_failed),Oe=xt(C.discard_operations),ke=xt(C.bead_blocked_by);Object.hasOwn(C,"bead_scope")&&W.set(se,xt(C.bead_scope));let Ue=xt(C.bead_workflow),Ve=xt(C.pr_activity),Qe=Array.isArray(C.repo_operations)?C.repo_operations:[],Ze=Array.isArray(C.merge_queue)?C.merge_queue:[],dt=new Set(Ze.filter(k=>k&&typeof k.bead_id=="string").map(k=>k.bead_id)),Tt=new Map(Ze.filter(k=>k&&typeof k.bead_id=="string").map(k=>[k.bead_id,k])),bt=Array.isArray(C.queue)?C.queue:[],pt=(Array.isArray(C.serial_lanes)?C.serial_lanes:[]).filter(k=>k&&/^s[1-5]$/.test(k.id)&&Array.isArray(k.entries)),Rt=xt(C.lane_states),at=typeof C.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(C.serial_lane_count))):Math.min(5,pt.length);U.set(se,at),M.set(se,bt.length);let We=new Map(pt.map(k=>[k.id,k])),Te=new Map;for(let k of pt)for(let I of k.entries)I&&typeof I.bead_id=="string"&&Te.set(I.bead_id,k.id);for(let[k,I]of Object.entries(ke))Array.isArray(I)&&D.set(k,I.filter(z=>typeof z=="string"&&z.length>0));let P=Array.isArray(C.done)?C.done:[];for(let k of P)k&&typeof k.bead_id=="string"&&B.push({id:k.bead_id,root_dir:se,workspace_name:we});let Z=new Map;for(let k of P)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&Z.set(k.bead_id,k.added_at);let ie=k=>({id:k,title:He[k]||k,root_dir:se,workspace_name:we,expected_revision:De,draggable:!1,...xt(st[k]).created_at?{created_at:xt(st[k]).created_at}:{},...xt(st[k]).updated_at?{updated_at:xt(st[k]).updated_at}:{}}),x=new Set;for(let[k,I]of Gb(Be,Z))x.add(k),y.push({...ie(k),lane:"running",...Te.has(k)?{serial_lane_id:Te.get(k)}:{},attempt_id:I.attempt_id,run_state:I.run_state,status:I.status||void 0,workflow:Ue[k]||null,can_pause:I.can_pause,can_resume:I.can_resume,started_at:I.started_at,last_event_at:I.last_event_at,last_activity:I.last_activity,legs:I.legs,runner:I.runner,model:I.model,effort:I.effort,speed:I.speed,resumed_from:I.resumed_from,continuation_mode:I.continuation_mode,usage:I.usage,exec_chips:{orchestration:As(I),worker:null},discard:An(Oe,k,{attempt_id:I.attempt_id}),badges:I.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:I.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:I.run_state==="failed"});for(let[k,I]of Dd(Be)){if(y.some(ce=>ce.id===k))continue;let z=I.attempt,pe=I.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";y.push({...ie(k),lane:"running",kind:"session",attempt_id:typeof z.attempt_id=="string"?z.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:Ue[k]||null,can_pause:!1,can_resume:!1,started_at:I.started_at,last_event_at:typeof z.last_event_at=="number"?z.last_event_at:null,last_activity:z.last_activity&&typeof z.last_activity=="object"?z.last_activity:null,legs:Array.isArray(z.legs)?z.legs:[],runner:typeof z.runner=="string"?z.runner:null,model:typeof z.model=="string"?z.model:null,effort:typeof z.effort=="string"?z.effort:null,speed:typeof z.speed=="string"?z.speed:null,resumed_from:null,continuation_mode:null,usage:z.usage&&typeof z.usage=="object"?z.usage:null,exec_chips:{orchestration:As(z),worker:null},discard:An(Oe,k,{merge_queued:!0}),badges:[I.origin==="auto"?`${pe} \xB7 \uC790\uB3D9`:pe],alert:!1})}for(let k of Array.isArray(C.session_active)?C.session_active:[]){let I=k&&k.bead_id;typeof I!="string"||x.has(I)||(x.add(I),Array.isArray(k.blocked_by)&&k.blocked_by.length>0&&D.set(I,k.blocked_by.filter(z=>typeof z=="string"&&z.length>0)),typeof k.title=="string"&&k.title.length>0&&N.set(I,k.title),y.push({...ie(I),title:k.title||He[I]||I,lane:"running",kind:"session",status:"in_progress",started_at:zi(k.started_at)??zi(k.updated_at)??void 0,updated_at:zi(k.updated_at)??void 0,workflow:k.workflow||null,labels:Array.isArray(k.labels)?k.labels:[],spec_id:typeof k.spec_id=="string"?k.spec_id:"",blocked:k.blocked===!0,...Array.isArray(k.blocked_by)?{blocked_by:k.blocked_by.filter(z=>typeof z=="string"&&z.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let k of Array.isArray(C.pr_wait)?C.pr_wait:[]){let I=k&&k.bead_id;if(typeof I!="string"||x.has(I))continue;x.add(I);let z=xt(mt[I]),pe=xt(z.pr),ce=z.gate?xt(z.gate):null,ve=dt.has(I),et=Tt.get(I)?.continuation_action||null,Ke=!!et&&et.continuation===null,Ce=Le.active===I,lt=k.external===!0,it=Ye[I]||null,It=xt(Ve[I]),Dt=Cs({bead_id:I,merge_sha:k.merge_sha,cleanup_cursor:k.cleanup_cursor,merge_progress:It.merge_progress||null,cleanup_failed:it,repo_operations:Qe}),Wt=ca(Dt),Mt=!!ce&&ce.base_badge==="\uCDA9\uB3CC",zt=!!it&&["child_sweep","branch_cleanup","parent_close"].includes(it.step)&&!!ce&&ce.tier==="merged",yt=lt&&!!it&&!!ce&&ce.tier==="merged",Nt=!!ce&&["closed_unmerged","review","undecidable"].includes(ce.tier),qe=An(Oe,I,{external:lt,merge_active:Ce||Dt?.step==="merge",merge_queued:ve,cleanup_active:Wt,merged:!!it||ce?.tier==="merged"}),Ht=!!qe.operation;$.push({...ie(I),lane:"pr_wait",workflow:Ue[I]||null,pr_number:typeof pe.number=="number"?pe.number:null,pr_url:typeof pe.url=="string"?pe.url:void 0,external:lt,usage:gn(Be,I),merge_step:Dt,badges:Ke?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Dt?[ce?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:it?[hr(it.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${hr(it.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ce?.gate_badge=="string"&&ce.gate_badge.length>0?[ce.gate_badge]:[],alert:Dt?Dt.failed===!0:!!it||Nt,reason:it&&Dt?.active!==!0?la(it.step):"PR \uB300\uAE30",merge_action:ce?.tier==="merged"&&!zt&&!yt?!1:!ve||Ke,merge_enabled:!Ht&&(Ke||ce?.enabled===!0||Mt||zt||yt),merge_label:Ke?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":yt||zt?"\uC815\uB9AC \uC7AC\uAC1C":Mt&&!zt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ke?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ht?qe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${qe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${qe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:yt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":zt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Mt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ce?.enabled===!0?`\uBA38\uC9C0 (${ce.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ce?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ve&&!Ke,cancel_enabled:!Ce,continuation_mismatch:et?.mismatch||null,discard:qe,discard_action:qe.action,discard_enabled:qe.enabled,discard_title:qe.title})}let G=(k,I,z,pe)=>{let ce=k&&k.bead_id;if(typeof ce!="string"||x.has(ce))return null;x.add(ce);let ve=Q[ce],et=An(Oe,ce),Ke=et.operation?et:null,Ce={...ie(ce),lane:I,workflow:Ue[ce]||null,draggable:!Ke,discard:Ke||void 0,reason:Gd(te,ce),seq:z+1,queue_position:z+1,queue_index:z,queue_length:pe,badges:ve?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ve,revise_action:!!ve,revise_enabled:!!ve&&!Ke,revise_title:ve?ve.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ve.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(ke,ce)&&(Ce.blocked_by=Array.isArray(ke[ce])?ke[ce].filter(lt=>typeof lt=="string"&&lt.length>0):[]),Ce};for(let k=0;k<bt.length;k++){let I=G(bt[k],"queue",k,bt.length);if(!I)continue;S.push(I);let z=Y.get(se);z?z.push(I):Y.set(se,[I])}let Ae=k=>{let I=$.find(ce=>ce.id===k&&ce.root_dir===se);if(I)return{id:k,title:I.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let z=y.find(ce=>ce.id===k&&ce.root_dir===se),pe=z&&z.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":z&&z.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:k,title:z?z.title:ie(k).title,badge:pe}},A=[];for(let k=0;k<Math.max(at,pt.length);k++){let I=`s${k+1}`,z=We.get(I),pe=z&&Array.isArray(z.entries)?z.entries:[],ce=[];for(let Ke=0;Ke<pe.length;Ke++){let Ce=G(pe[Ke],I,Ke,pe.length);Ce&&(ce.push(Ce),S.push(Ce))}let ve=xt(Rt[I]),et=Array.isArray(ve.occupied_by)?ve.occupied_by.filter(Ke=>typeof Ke=="string"):[];ce.length===0&&et.length===0&&(at<=1||k>=at)||A.push({id:I,index:k,items:ce,raw_length:pe.length,occupied_by:et,occupants:et.map(Ke=>Ae(Ke)),corrections:Array.isArray(ve.corrections)?ve.corrections.length:0,cycle:ve.cycle===!0,...ce.length===0&&et.length===0?{empty:!0}:{}})}le.set(se,A);let O=Array.from({length:at},(k,I)=>{let z=`s${I+1}`,pe=We.get(z),ce=pe&&Array.isArray(pe.entries)?pe.entries:[],ve=xt(Rt[z]);return{id:z,index:ce.length,length:ce.length,occupied_by:Array.isArray(ve.occupied_by)?ve.occupied_by.filter(et=>typeof et=="string"):[]}});for(let k of Array.isArray(C.runnable)?C.runnable:[]){let I=k&&k.bead_id;if(typeof I!="string"||x.has(I))continue;x.add(I);let z=k.workflow&&typeof k.workflow=="object"?k.workflow:null,pe=z&&typeof z.route=="string"&&z.route||(typeof k.route=="string"?k.route:null),ce=Vb(xt(Me),k.exec_pins,pe);Array.isArray(k.blocked_by)&&k.blocked_by.length>0&&D.set(I,k.blocked_by.filter(ve=>typeof ve=="string"&&ve.length>0)),typeof k.title=="string"&&k.title.length>0&&N.set(I,k.title),Array.isArray(k.scope)&&E.set(I,k.scope.filter(ve=>typeof ve=="string"&&ve.length>0)),h.push({...ie(I),title:k.title||He[I]||I,lane:"runnable",draggable:!0,reason:Gd(te,I),created_at:k.created_at??void 0,updated_at:k.updated_at??void 0,status:typeof k.status=="string"?k.status:void 0,labels:Array.isArray(k.labels)?k.labels:[],spec_id:typeof k.spec_id=="string"?k.spec_id:"",workflow:z||(pe?{route:pe,chips:{route:pe}}:null),...ce?{exec_chips:ce}:{},blocked:k.blocked===!0,...Array.isArray(k.blocked_by)?{blocked_by:k.blocked_by.filter(ve=>typeof ve=="string"&&ve.length>0)}:{},place_index:bt.length,place_lanes:O})}for(let k of P){let I=k&&k.bead_id;if(typeof I!="string"||x.has(I)||(x.add(I),o!==void 0&&typeof k.added_at=="number"&&k.added_at<o))continue;let z=Hb(Be,I),pe=z&&typeof z.done_kind=="string"?z.done_kind:null;F.push({...ie(I),lane:"done",done:!0,done_layout:"three_line",usage:gn(Be,I),work_ms:zo(Be,I),done_at:typeof k.added_at=="number"?k.added_at:void 0,done_kind:pe,badges:[...pe&&Hd[pe]?[Hd[pe]]:[],...Wo(Be,I)]})}}let re=new Map;s.forEach((C,se)=>{C&&typeof C.root_dir=="string"&&re.set(C.root_dir,se)});let J=n&&n.running_sort==="repo"?"repo":"started";y.sort((C,se)=>{let we=C.kind==="session",Me=se.kind==="session";if(we!==Me)return we?1:-1;if(we&&Me){let He=ua(se.updated_at)-ua(C.updated_at);return He!==0?He:C.id.localeCompare(se.id)}if(J==="repo"){let He=re.get(C.root_dir)??Number.MAX_SAFE_INTEGER,st=re.get(se.root_dir)??Number.MAX_SAFE_INTEGER;if(He!==st)return He-st}let De=typeof C.started_at=="number"&&Number.isFinite(C.started_at)?C.started_at:null,Be=typeof se.started_at=="number"&&Number.isFinite(se.started_at)?se.started_at:null;return De!==null&&Be!==null&&De!==Be?De-Be:De===null&&Be!==null?1:De!==null&&Be===null?-1:C.id.localeCompare(se.id)}),F.sort((C,se)=>(se.done_at??0)-(C.done_at??0));let _e=s.length>0?s:r.map(C=>({root_dir:C&&C.root_dir,name:C&&C.name,auto_advance:C&&C.auto_advance,auto_merge:C&&C.auto_merge,slots:C&&C.slots,revision:C&&C.revision,runner_catalog:C&&C.runner_catalog})),fe=new Set(h.map(C=>C.root_dir)),ee=[];for(let C of _e){if(!C||typeof C.root_dir!="string")continue;let se=Y.get(C.root_dir)||[],we=le.get(C.root_dir)||[];!(se.length>0||we.some(De=>De.items.length>0||De.occupied_by.length>0))&&!fe.has(C.root_dir)||ee.push({root_dir:C.root_dir,name:C.name||C.root_dir,auto_advance:C.auto_advance===!0,auto_merge:C.auto_merge===!0,slots:typeof C.slots=="number"&&C.slots>=zd?C.slots:zd,revision:typeof C.revision=="number"?C.revision:0,runner_catalog:xt(C.runner_catalog),items:se,sublanes:{parallel:se,serial:we},serial_lane_count:U.get(C.root_dir)||0,raw_queue_length:M.get(C.root_dir)||0})}let he={runnable:h,runnable_all:h,runnable_hidden:{blocked:0,spec:0,deps:0},runnable_sections:[],runnable_flat:c==="updated_flat",queue:S,queue_groups:ee,running:y,pr_wait:$,done:F,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(M),owner_of:{}},$e=jd(he);for(let C of B)$e.has(C.id)||$e.set(C.id,{root_dir:C.root_dir,workspace_name:C.workspace_name,lane:"done",state:"done"});let be=new Map;for(let[C,se]of D)for(let we of se){let Me=be.get(we);Me?Me.includes(C)||Me.push(C):be.set(we,[C])}for(let C of[...he.queue,...he.runnable]){if(!Object.hasOwn(C,"blocked_by"))continue;let se=$e.get(C.id);C.blockers=(C.blocked_by||[]).map(we=>Bd(we,se,$e,s)),C.blocker_warnings=C.blockers.filter(we=>we.missing_internal).map(we=>`\u26A0 \uC120\uD589 ${we.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),C.blocker_warnings.length>0&&(C.alert=!0)}for(let C of[...he.queue,...he.runnable,...he.running,...he.pr_wait]){let se=C.lane==="running"||C.lane==="pr_wait"?[]:(C.blockers||[]).map(Kb),we=[];for(let Be of be.get(C.id)||[]){let He=Yb(Be,C.root_dir,$e);He&&we.push(He)}let Me=C.lane==="running"||C.lane==="pr_wait"?[]:C.blocker_warnings||[];if(se.length===0&&we.length===0&&Me.length===0)continue;let De={predecessors:se,successors:we,warnings:Me};C.dependency_chips=De}Jb(he,W,E,$e,s);let ne=Ud(he.queue_groups);for(let C of he.queue_groups)for(let se of C.sublanes.serial){let we=ne.get(Wd(C.root_dir,se.id));we&&(se.cross_wait_peers=we)}he.chain_lanes=Xb(i&&Array.isArray(i.lanes)?i.lanes:[],D,$e,s,N,f);let Se=new Map;for(let C of[...he.queue,...he.runnable])Se.has(C.id)||Se.set(C.id,C);let xe=new Set;for(let C of he.chain_lanes)for(let se of C.rows){if(C.status==="confirmed"&&!se.unplaced&&!se.fixed&&xe.add(se.id),!C.draft&&!se.unplaced)continue;let we=Se.get(se.id);we&&(we.cross_lane_chip={lane_id:C.lane_id,number:C.number,status:C.status,label:C.draft?`\uC5F0\uACB0 ${C.number} (draft)`:`\uC5F0\uACB0 ${C.number}`})}let V=[];for(let C of Y.values())for(let se of C)xe.has(se.id)||V.push(se);V.sort((C,se)=>{let we=C.workspace_name.localeCompare(se.workspace_name);return we!==0?we:(C.queue_index??0)-(se.queue_index??0)}),he.parallel_rows=V;let X={};for(let[C,se]of $e)typeof se.root_dir=="string"&&se.root_dir.length>0&&(X[C]=se.root_dir);for(let C of he.chain_lanes)for(let se of C.rows)!Object.hasOwn(X,se.id)&&se.root_dir.length>0&&f.has(se.root_dir)&&(X[se.id]=se.root_dir);he.owner_of=X;let ye=he.runnable.length;he.runnable_all=he.runnable.slice();let me=he.runnable;a.show_blocked||(me=me.filter(C=>C.blocked!==!0));let Fe=me.length;a.spec==="with"?me=me.filter(C=>!!C.spec_id):a.spec==="without"&&(me=me.filter(C=>!C.spec_id));let ue=me.length;a.with_deps&&(me=me.filter(C=>{let se=C.dependency_chips;return se?(se.predecessors||[]).length>0||(se.successors||[]).length>0:!1})),he.runnable_hidden={blocked:ye-Fe,spec:Fe-ue,deps:ue-me.length};let ze=(C,se)=>{let we=ua(se.updated_at)-ua(C.updated_at);return we!==0?we:C.id.localeCompare(se.id)},ut=c==="repo_spec"?(C,se)=>{let we=C.spec_id?0:1,Me=se.spec_id?0:1;return we!==Me?we-Me:ze(C,se)}:ze;if(c==="updated_flat")he.runnable=me.slice().sort(ze),he.runnable_sections=[];else{let C=new Map;for(let Me of me){let De=C.get(Me.root_dir);De?De.push(Me):C.set(Me.root_dir,[Me])}let se=[],we=[];for(let Me of _e){if(!Me||typeof Me.root_dir!="string")continue;let De=(C.get(Me.root_dir)||[]).slice().sort(ut);C.delete(Me.root_dir),De.length!==0&&(se.push({root_dir:Me.root_dir,name:Me.name||Me.root_dir,items:De.map(Be=>({...Be,workspace_name:""}))}),we.push(...De))}for(let[Me,De]of C){let Be=De.slice().sort(ut);se.push({root_dir:Me,name:Be[0]?.workspace_name||Me,items:Be.map(He=>({...He,workspace_name:""}))}),we.push(...Be)}he.runnable=we,he.runnable_sections=se}return he}var Yd="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Zd(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Xd(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var ep="bdui.monitor.done-range",tp="bdui.monitor.running_sort",np="bdui.monitor.candidate_sort",rp="beads-ui.monitor.candidate-filter",sp="beads-ui.monitor.sections";function eh(){try{let e=window.localStorage.getItem(rp);if(!e)return{...yr};let t=JSON.parse(e);return!t||typeof t!="object"?{...yr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:yr.show_blocked,spec:Hi.some(n=>n.value===t.spec)?t.spec:"all",with_deps:typeof t.with_deps=="boolean"?t.with_deps:yr.with_deps}}catch{return{...yr}}}function Vi(e){try{window.localStorage.setItem(rp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec,with_deps:e.with_deps}))}catch{}}function th(){try{let e=window.localStorage.getItem(np);return Os.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function nh(e){try{window.localStorage.setItem(np,e)}catch{}}function rh(){try{let e=window.localStorage.getItem(sp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Qd(e){try{window.localStorage.setItem(sp,JSON.stringify(e))}catch{}}function sh(){try{let e=window.localStorage.getItem(ep);return mn(e)?e:ln}catch{return ln}}function oh(e){try{window.localStorage.setItem(ep,e)}catch{}}function ah(){try{return window.localStorage.getItem(tp)==="repo"?"repo":"started"}catch{return"started"}}function ih(e){try{window.localStorage.setItem(tp,e)}catch{}}var op="tab:monitor:pipeline",lh=1e3,ch=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Jd="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function uh(e){return e>=1&&e<=Jd.length?Jd[e-1]:`(${e})`}function ap(e,t){let n=At("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,c=t.switchWorkspace,u=t.router,f=t.now||(()=>Date.now()),h=t.confirm||(d=>typeof globalThis.confirm!="function"||globalThis.confirm(d)),y=sh(),$=ah(),S=eh(),F=th(),B=rh(),Y=null,le=null,U=null,M=null,D=[],W=null;function E(){let d=Gn.find(p=>p.value===y);return d?d.label:""}let N=document.createElement("div");N.className="mon",e.appendChild(N);let re=document.createElement("div");re.className="mon2-drawer",e.appendChild(re);let J=Gi(null,null),_e=new Map,fe=new Map,ee=null,he=null,$e=null,be=qr(re,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Y=null,x()}});async function ne(d,p,b,w,q=!0){if(!o||!b)return null;let H=await o(d,{...p,root_dir:b,expected_revision:w});if(H&&H.conflict&&q){H.queue&&fe.set(b,H.queue);let K=H.queue&&typeof H.queue.revision=="number"?H.queue.revision:w;H=await o(d,{...p,root_dir:b,expected_revision:K})}return H&&H.queue&&b&&fe.set(b,H.queue),H}function Se(d,p){let b=fe.get(d),w=s&&s.get?s.get():null,q=(Array.isArray(w)?w:[]).find(K=>K?.root_dir===d);return(b||q)?.merge_queue?.find(K=>K.bead_id===p)?.continuation_action}async function xe(d,p,b,w){let q=await ne(d,p,b,w),H=fe.get(b)?.revision??q?.queue?.revision??w;return Pn(q,(K,ge)=>ne(d,{...p,continuation:K,decision_token:ge},b,H,!1),{refresh:K=>ne(d,p,b,K?.queue?.revision??fe.get(b)?.revision??H,!1)})}async function V(d,p,b,w){let q=await Pn({continuation_mismatch:w},(K,ge)=>ne("worker-merge-queue-add",{bead_id:p,continuation:K,decision_token:ge},d,b,!1)),H=q?.queue?.merge_queue?.find(K=>K.bead_id===p)?.continuation_action;q?.applied!==!0&&H?.continuation===null&&H.mismatch&&await V(d,p,q.queue.revision,H.mismatch)}async function X(d,p,b){let w=await ne("worker-discard",d,p,b);if(w&&w.discarded===!0){ae(Go(w),"success",5e3);return}if(w&&w.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${w.reason}`,"error");return}if(w&&w.accepted&&w.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(w&&w.accepted){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${w.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}w&&!w.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ye(d,p,b){return!o||!b?null:await o(d,{...p,root_dir:b})}async function me(){let d=new Map;for(let p of J.pr_wait)d.has(p.root_dir)||d.set(p.root_dir,p.expected_revision);for(let[p,b]of d)await ne("worker-merge-queue-add-all",{},p,b)}function Fe(d){let p=B[d];return!!(p&&p.runnable===!0)}function ue(d){let p={...B[d]||{}};p.runnable=!p.runnable,B={...B,[d]:p},Qd(B),x()}function ze(d){return B[d]===!0}function tt(d){B={...B,[d]:B[d]!==!0},Qd(B),x()}function ut(d){let p=J.queue_groups.find(b=>b.root_dir===d);if(!p)return null;for(let b=0;b<p.serial_lane_count;b+=1){let w=`s${b+1}`,q=p.sublanes.serial.find(H=>H.id===w);if(!q||q.raw_length===0&&q.occupied_by.length===0)return w}return null}function C(d,p){let b=J.queue_groups.find(q=>q.root_dir===d),w=b?b.sublanes.serial.find(q=>q.id===p):void 0;return w?w.raw_length:0}function se(d,p){let b=_e.get(d),w=_e.get(p);if(!b||!w)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let q=Zd(b),H=Zd(w);if(q!==null&&q===H&&b.root_dir===w.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let K=Xd(b),ge=Xd(w);if(K&&H!==null){let Re=H;return{kind:"ops",title:`${Re} \uB05D\uC5D0 ${d}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:d,lane:Re,index:C(w.root_dir,Re)}]}}if(q!==null&&ge&&H===null){let Re=q;return{kind:"ops",title:`${Re} \uB05D\uC5D0 ${p}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:b.root_dir,ops:[{bead_id:p,lane:Re,index:C(b.root_dir,Re)}]}}if(K&&q===null&&ge&&H===null){let Re=ut(b.root_dir);return Re===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Re} \uB808\uC778\uC5D0 ${p} \u2192 ${d} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:b.root_dir,ops:[{bead_id:p,lane:Re,index:0},{bead_id:d,lane:Re,index:1}]}}return!K&&!ge?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:K?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function we(d,p){let b=se(d,p.id);return{id:p.id,title:p.title,location_label:p.location_label,prefixes:p.prefixes,action:b.kind==="note"?{kind:"note",text:b.text}:b.kind==="disabled"?{kind:"disabled",label:Yd,title:b.title}:{kind:"place",label:Yd,title:b.title}}}function Me(d,p){if(!U||U.bead_id!==d)return null;let b=U.counterpart_id,w=p.filter(q=>q.id===b);return w.length===0?null:{rows:w.map(q=>we(d,q))}}function De(d){let p=d.dependency_chips||null,b=d.overlap_chips||[],w=d.scope_state==="missing",q=d.cross_lane_chip;if(!p&&b.length===0&&!w&&!q)return null;let H=Me(d.id,b);return{...p||{},...b.length>0?{overlaps:b}:{},...w?{scope_missing:!0}:{},...q?{cross_lane:{lane_id:q.lane_id,label:q.label}}:{},...H?{popover:H}:{}}}function Be(d){let p=De(d);return p?{...d,dependency_chips:p}:d}async function He(d,p){let b=se(d,p);if(U=null,b.kind!=="ops"){x();return}let w=It(b.root_dir,b.ops[0].bead_id);for(let q of b.ops){let H=await st(q,b.root_dir,w);if(H===null)break;w=H}x()}async function st(d,p,b){try{let w=await ne("worker-queue-place",d,p,b,!1);if(w&&w.conflict)return ae("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!w||w.applied!==!0)return ae(w&&typeof w.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${w.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let q=w.queue?w.queue.revision:void 0;return typeof q!="number"?(ae("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):q}catch(w){return ae(pe(w),"error"),null}}function mt(d){let p=Fe(d.root_dir);return l`<header class="mon2-sec__hd">
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
    </header>`}function te(d,p){return l`<div
      class="mon2-item"
      data-bead-id=${d.id}
      data-drag-kind="candidate"
      data-root-dir=${d.root_dir}
    >
      ${p}
    </div>`}function Q(d){if(le!==d.id)return null;let p=J.queue_groups.find(H=>H.root_dir===d.root_dir),b=d.place_lanes||[],w=J.cross_lanes_revision!==null,q=[{id:"parallel",label:"\uBCD1\uB82C",count:d.place_index??0}];for(let H of J.chain_lanes)q.push({id:`lane:${H.lane_id}`,label:`\uC5F0\uACB0 ${H.number} (${H.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:H.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!w});q.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!w,title:w?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let H of b)q.push({id:`serial:${H.id}`,label:`\uC9C1\uB82C ${Number(H.id.slice(1))}`,count:H.length,group:`${p?p.name:""} \uC9C1\uB82C`});return{bead_id:d.id,lanes:q}}function Le(){let d=[],p=new Set,b=(w,q)=>{for(let H of w)p.has(H.id)||(p.add(H.id),d.push({bead_id:H.id,root_dir:H.root_dir,workspace_name:H.workspace_name,title:H.title,lane:q}))};return b(J.running,"running"),b(J.pr_wait,"pr_wait"),b(J.queue,"queue"),b(J.runnable_all,"runnable"),d}function Ye(d){if(!M||M.bead_id!==d)return"";let p=Ce(),b=Le(),w=new Map;for(let Re of b)w.set(Re.bead_id,Re);let q=(p.get(d)||[]).filter(Re=>w.has(Re)),H=b.filter(Re=>(p.get(Re.bead_id)||[]).includes(d)).map(Re=>Re.bead_id),K=Id(Ld(d,M.direction,{issues:b,blocked_by_map:p}),M.query),ge=J.owner_of[d];return l`<div
      class="mon-deppanel"
      data-bead-id=${d}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__now">
        ${q.length===0&&H.length===0?l`<span class="mon-deppanel__empty">연결된 의존 없음</span>`:""}
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
        ${H.map(Re=>l`<span class="mon-deppanel__chip mon-deppanel__chip--succ"
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
        ${K.length===0?l`<div class="mon-deppanel__empty">후보 없음</div>`:K.map(Re=>l`<button
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
    </div>`}function Oe(d){return te(d,l`${Ci(Be(d),Q(d),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(p,b)=>i(b,d.root_dir):void 0})}${Ye(d.id)}`)}function ke(){return J.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${J.runnable.map(d=>Oe(d))}
      </div>`:l`${J.runnable_sections.map(d=>{let p=Fe(d.root_dir);return l`<section
        class="mon2-sec${p?" is-collapsed":""}"
        data-root-dir=${d.root_dir}
        data-section="runnable"
      >
        ${mt({root_dir:d.root_dir,name:d.name,count:d.items.length})}
        ${p?"":l`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${d.items.map(b=>Oe(b))}
            </div>`}
      </section>`})}`}function Ue(d,p){return l`<div
      class="mon2-item"
      data-bead-id=${d.id}
      data-drag-kind="parallel"
      data-root-dir=${d.root_dir}
      data-row-index=${p}
      data-queue-index=${String(d.queue_index??0)}
    >
      ${Xn(Be(d))}
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
      ${Ye(d.id)}
    </div>`}function Ve(){let d=ze("parallel");return l`<section
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
                </div>`:J.parallel_rows.map((p,b)=>Ue(p,b))}
          </div>`}
    </section>`}function Qe(d,p,b){return l`<div
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
        >${uh(p.seq)}</span
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
    </div>`}function Ze(d){let p=J.cross_lanes_revision!==null;return l`<div class="mon2-clane" data-lane-id=${d.lane_id}>
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
            </div>`:d.rows.map((b,w)=>Qe(d,b,w))}
      </div>
    </div>`}function dt(d,p,b){return l`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="repo-serial"
      data-root-dir=${p.root_dir}
      data-lane-id=${d.id}
      data-row-index=${b}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Xn(Be(p))}
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
      ${Ye(p.id)}
    </div>`}function Tt(d){if(d.length===0)return"";let p=d.length-1;return`${d[0].id} \uC810\uC720${p>0?` +${p}`:""}`}function bt(d){return l`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${d.id}
    >
      ${Xn({id:d.id,title:d.title,lane:"running",draggable:!1,ghost:!0,badges:[d.badge]})}
    </div>`}function pt(d,p){return l`<div
      class="mon2-lane${p.empty?" mon2-lane--empty":""}"
      data-root-dir=${d.root_dir}
      data-lane-length=${String(p.raw_length)}
    >
      ${hn({id:"",lane:p.id,title:`${d.name} \xB7 \uC9C1\uB82C ${p.index+1}`,items:p.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:l`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${d.root_dir}
          data-lane-id=${p.id}
          data-lane-length=${String(p.raw_length)}
        >
          ${p.occupants.map(b=>bt(b))}
          ${p.items.length>0?p.items.map((b,w)=>dt(p,b,w)):p.occupants.length>0?"":l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:l`<span
            class="mon2-lane__badge${p.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${p.occupants.length>0?p.occupants.map(b=>`${b.id} \u2014 ${b.badge}`).join(`
`):""}
            >${Tt(p.occupants)}</span
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
    </div>`}function Rt(){let d=ze("serial"),p=J.cross_lanes_revision!==null,b=J.chain_lanes.some(w=>w.draft&&w.rows.length===0);return l`<section
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
            ${J.chain_lanes.map(w=>Ze(w))}
            ${J.queue_groups.map(w=>w.sublanes.serial.map(q=>pt(w,q)))}
          </div>`}
    </section>`}function at(){return l`<div class="mon2-wait">${Ve()}${Rt()}</div>`}function We(d){return l`<div class="worker-rungrid">
      ${J.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:J.running.map(p=>Li({bead_id:p.id,attempt_id:p.attempt_id||"",title:p.title,runner:p.runner??null,model:p.model??null,effort:p.effort??null,speed:p.speed??null,started_at:p.started_at??null,kind:p.kind,...p.kind==="session"?{updated_at:p.updated_at}:{},workflow:p.workflow||null,resumed_from:p.resumed_from??null,continuation_mode:p.continuation_mode??null,paused:p.run_state==="paused",failed:p.run_state==="failed",status:p.status,status_label:p.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:p.can_resume!==!1,can_pause:p.can_pause!==!1,exec_chips:p.exec_chips||null,usage:p.usage||null,discard:p.discard},d,Y,{monitor:{repo:p.workspace_name,root_dir:p.root_dir,serial_lane_id:p.serial_lane_id,last_activity:p.last_activity||null,legs:p.legs||[],dependency_chips:De(p)}}))}
    </div>`}function Te(d){let p={runnable:J.runnable,queue:J.queue,running:J.running,pr_wait:J.pr_wait,done:J.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${ch.map(b=>{let w=p[b.lane],q=b.lane==="runnable"?J.runnable_flat?w.length>0?ke():void 0:J.runnable_sections.length>0?ke():void 0:b.lane==="queue"?J.queue_groups.length>0||J.chain_lanes.length>0||J.parallel_rows.length>0?at():void 0:b.lane==="running"?We(d):w.length>0?l`${w.map(H=>Xn(H))}`:void 0;return hn({id:`monitor-${b.lane}`,lane:b.pane,title:b.lane==="done"?`\uC644\uB8CC\xB7${E()}`:b.title,items:w,empty:b.empty,body:q,live:b.lane==="running"&&w.length>0,controls:b.lane==="runnable"?P():void 0,header_control:Z(b.lane,w.length)})})}
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
        ${Hi.map(d=>l`<button
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
    </div>`}function Z(d,p){return d==="runnable"?l`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${F}
      >
        ${Os.map(b=>l`<option
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
      </select>`:""}function ie(d){let p=s&&s.get?s.get():null,b=s&&s.getWorkspacesState?s.getWorkspacesState():[],w=d===void 0?s&&s.crossLanes?s.crossLanes():void 0:d,q={done_since:ur(y,f()),running_sort:$,candidate_filter:S,candidate_sort:F};return w!==void 0&&(q.cross_lanes=w),Gi(p,b,q)}function x(){let d=f();J=ie(),_e=new Map;for(let p of[...J.runnable,...J.queue,...J.running,...J.pr_wait,...J.done])!p.non_occupying&&!_e.has(p.id)&&_e.set(p.id,p);Ge(Te(d),N),Ae()?.render(),G(),A()}function G(){let d=new Map;for(let p of J.queue_groups)d.set(p.root_dir,p.auto_advance);for(let p of Array.from(N.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let b=p.closest(".mon2-item")?.getAttribute("data-root-dir")||"",w=d.get(b);typeof w=="boolean"&&p.setAttribute("title",`${p.textContent||""} \xB7 ${w?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ae(){if($e)return $e;let d=N.querySelector(".mon2-deck");return d?($e=Ad(d,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>J.done,rangeLabel:E,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:k,onFocusChange:p=>{W=p,A()}}),$e):null}function A(){N.classList.toggle("has-focus",W!==null);for(let d of Array.from(N.querySelectorAll(".mon2-sec[data-root-dir]")))d.classList.toggle("is-focus",W!==null&&d.getAttribute("data-root-dir")===W);for(let d of Array.from(N.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let p=_e.get(d.getAttribute("data-bead-id")||"");d.classList.toggle("is-focus",W!==null&&!!p&&p.root_dir===W)}for(let d of Array.from(N.querySelectorAll(".mon2-crow[data-root-dir]")))d.classList.toggle("is-focus",W!==null&&d.getAttribute("data-root-dir")===W)}function O(d,p){let b=a?a():void 0;if(!p||!b||p===b||!c){r(d);return}c(p).then(()=>{r(d)}).catch(w=>{n("workspace switch for %s failed: %o",p,w)})}function k(d){if(!d)return;let p=a?a():void 0,b=()=>{try{u?.gotoView("worker")}catch(w){n("gotoView(worker) failed: %o",w)}};if(!c||p&&p===d){b();return}c(d).then(b).catch(w=>{n("workspace switch for %s failed: %o",d,w),ae("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function I(d){un(d).then(p=>{ae(p?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",p?"success":"error",1400)})}function z(d){let p=_e.get(d)||null;return{item:p,root_dir:p?p.root_dir:"",revision:p?p.expected_revision:0}}function pe(d){if(typeof d=="string"&&d.length>0)return d;if(d&&typeof d=="object"){let p=d;if(typeof p.message=="string"&&p.message.length>0)return p.message;if(typeof p.error=="string"&&p.error.length>0)return p.error;if(p.error&&typeof p.error=="object"&&typeof p.error.message=="string")return p.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function ce(d,p,b){let{root_dir:w}=z(p);if(!(!p||!b||b===p))try{await ye(d,{a:p,b},w)}catch(q){ae(pe(q),"error")}}async function ve(d,p,b){let w=J.owner_of[p];if(typeof w!="string"||w.length===0){ae(`${p}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await ye(d,{a:p,b},w)}catch(q){ae(pe(q),"error")}x()}function et(d){return J.runnable.some(p=>p.id===d)||J.parallel_rows.some(p=>p.id===d)?!0:J.queue_groups.some(p=>p.sublanes.serial.some(b=>b.items.some(w=>w.id===d)))}function Ke(d,p){!d||!et(d)||(M=M&&M.bead_id===d&&p===void 0?null:{bead_id:d,direction:p||"predecessor",query:""},x())}function Ce(){let d=new Map,p=s&&s.get?s.get():null,b=w=>Array.isArray(w)?w.filter(q=>typeof q=="string"&&q.length>0):[];for(let w of Array.isArray(p)?p:[]){if(!w||typeof w!="object")continue;let q=w.bead_blocked_by&&typeof w.bead_blocked_by=="object"?w.bead_blocked_by:{};for(let[H,K]of Object.entries(q))Array.isArray(K)&&d.set(H,b(K));for(let H of[...Array.isArray(w.runnable)?w.runnable:[],...Array.isArray(w.session_active)?w.session_active:[]])H&&typeof H.bead_id=="string"&&Array.isArray(H.blocked_by)&&H.blocked_by.length>0&&d.set(H.bead_id,b(H.blocked_by))}return d}function lt(){let d=Ce();for(let p of D){let b=(d.get(p.a)||[]).slice();p.type==="dep-remove"?d.set(p.a,b.filter(w=>w!==p.b)):b.includes(p.b)||d.set(p.a,[...b,p.b])}return d}function it(d=J){let p=new Map,b=new Map,w=new Set,q=new Set;for(let K of d.chain_lanes){p.set(K.lane_id,{status:K.status,entries:K.rows.map(ge=>({bead_id:ge.id,root_dir:ge.root_dir}))});for(let ge of K.rows)b.set(ge.id,K.lane_id),ge.fixed&&w.add(ge.id),ge.unplaced||q.add(ge.id)}let H=new Map;for(let K of d.parallel_rows)typeof K.queue_index=="number"&&H.set(K.id,K.queue_index);for(let K of d.queue_groups)for(let ge of K.sublanes.serial)for(let Re of ge.items)typeof Re.queue_index=="number"&&H.set(Re.id,Re.queue_index);return{blocked_by_map:lt(),owner_of:new Map(Object.entries(d.owner_of)),cross_lanes:p,owner_lane_of:b,fixed_members:w,placed_members:q,parallel_rows:d.parallel_rows.map(K=>({bead_id:K.id,root_dir:K.root_dir,queue_index:K.queue_index??0})),parallel_raw_length:new Map(Object.entries(d.parallel_raw_length)),queue_index_of:H}}function It(d,p){let b=_e.get(p);if(b&&b.root_dir===d)return b.expected_revision;let w=J.queue_groups.find(q=>q.root_dir===d);return w?w.revision:0}async function Dt(d,p,b){try{if(d.type==="worker-queue-place"||d.type==="worker-queue-reorder"||d.type==="worker-queue-remove"){let w=await ne(d.type,d.payload,d.root_dir,b.get(d.root_dir)??It(d.root_dir,p));return!w||typeof w.applied!="boolean"?(ae("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),!1):(w.queue&&typeof w.queue.revision=="number"&&b.set(d.root_dir,w.queue.revision),w.conflict?(ae("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):w.applied===!1?(ae(w.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${w.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0)}return(d.type==="dep-add"||d.type==="dep-remove")&&await ye(d.type,{a:d.a,b:d.b},d.root_dir),!0}catch(w){return ae(pe(w),"error"),!1}}function Wt(d){(d.type==="dep-add"||d.type==="dep-remove")&&(D=[...D,{type:d.type,a:d.a,b:d.b}])}async function Mt(d,p){if(!o)return{ok:!1};try{let b=await o(d.type,{...d.payload,expected_revision:p});return!b||typeof b.revision!="number"?(ae("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:b.revision}}catch(b){let w=b,q=w&&w.code==="conflict"?w.details?.cross_lanes:null;return q&&typeof q.revision=="number"&&Array.isArray(q.lanes)?{ok:!1,conflict:q}:(ae(pe(b),"error"),{ok:!1})}}async function zt(d,p,b){let w=new Map,q=d.ops.slice(0,d.lane_op_index),H=d.ops.slice(d.lane_op_index);for(let ge of q){if(!await Dt(ge,b,w))return{done:!0};Wt(ge)}let K=p;for(let ge of d.lane_ops){if(K===null)return ae("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Re=await Mt(ge,K);if(!Re.ok)return Re.conflict?{done:!1,conflict:Re.conflict}:{done:!0};K=Re.revision}for(let ge of H){if(!await Dt(ge,b,w))return{done:!0};Wt(ge)}return{done:!0}}async function yt(d,p){D=[];let b=J;for(let w=0;;w+=1){let q=d(it(b));if("refused"in q){ae(q.refused,"error");break}let H=await zt(q,b.cross_lanes_revision,p);if(H.done)break;if(w>=1){ae("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}b=ie(H.conflict)}D=[],x()}async function Nt(d,p){await yt(b=>qi(d,p,b),d.bead_id)}async function qe(d,p){if(d==="create"){await yt(b=>Fi(null,b),"");return}if(d==="remove"){let b=J.chain_lanes.find(w=>w.lane_id===p);if(b&&!b.draft){let w=b.rows.filter((q,H)=>H===0?!1:!q.mismatch).length;if(!h(`\uC758\uC874 ${w}\uAC1C\uB97C \uD568\uAED8 \uC81C\uAC70\uD569\uB2C8\uB2E4`))return}await yt(w=>Od(p,w),"");return}await yt(b=>d==="confirm"?Cd(p,b):Rd(p,b),"")}async function Ht(d,p){let b=_e.get(d);if(!b){x();return}let w={kind:"candidate",bead_id:d,root_dir:b.root_dir};if(p==="new-lane"){await yt(q=>Fi({bead_id:d,root_dir:b.root_dir},q),d);return}if(p.startsWith("lane:")){let q=p.slice(5);if(!J.chain_lanes.find(K=>K.lane_id===q)){x();return}await yt(K=>qi(w,{kind:"chain",lane_id:q,marker_index:(K.cross_lanes.get(q)?.entries??[]).length},K),d);return}if(p.startsWith("serial:")){let q=p.slice(7),H=(b.place_lanes||[]).find(K=>K.id===q);await Nt(w,{kind:"repo-serial",root_dir:b.root_dir,lane_id:q,index:H?H.index:0});return}await Nt(w,{kind:"parallel",marker_index:J.parallel_rows.length})}async function Qt(d,p){let b=J.parallel_rows,w=b.findIndex(Vt=>Vt.id===d);if(w<0)return;let q=b[w].root_dir,H=[];b.forEach((Vt,on)=>{Vt.root_dir===q&&H.push(on)});let K=H.indexOf(w),ge=H[K+p];if(typeof ge!="number")return;let Re=p===-1?ge:H[K+2]??Math.min(b.length,ge+1);await Nt({kind:"parallel",bead_id:d,root_dir:q,queue_index:b[w].queue_index??0},{kind:"parallel",marker_index:Re})}async function Je(d){for(let p of J.chain_lanes){let b=p.rows.find(w=>w.id===d);if(b){await Nt({kind:"chain",bead_id:d,root_dir:b.root_dir,lane_id:p.lane_id,...typeof b.queue_index=="number"?{queue_index:b.queue_index}:{}},{kind:"parallel",marker_index:J.parallel_rows.length});return}}}let Ee=null,R=!1,de=null;function Ie(){de!==null&&clearTimeout(de),de=setTimeout(()=>{de=null,R=!1},0)}function rt(d,p){let b=p&&typeof p.closest=="function"?p.closest("[data-row-index]"):null;if(b&&d.contains(b)){let w=Number(b.getAttribute("data-row-index"));return Number.isFinite(w)?w:0}return d.querySelectorAll("[data-row-index]").length}function vt(d){let p=d.target,b=typeof p?.closest=="function"?p.closest("[data-drop]"):null;if(!b||!Ee)return null;let w=b.getAttribute("data-drop");if(w==="candidate")return{zone:b,target:{kind:"candidate"}};if(w==="parallel")return{zone:b,target:{kind:"parallel",marker_index:rt(b,p)}};if(w==="chain")return{zone:b,target:{kind:"chain",lane_id:b.getAttribute("data-lane-id")||"",marker_index:rt(b,p)}};if(w==="repo-serial"){let q=b.getAttribute("data-root-dir")||"";if(q!==Ee.root_dir)return null;let H=typeof p?.closest=="function"?p.closest("[data-queue-index]"):null,K=H&&b.contains(H)?H.getAttribute("data-queue-index"):b.getAttribute("data-lane-length"),ge=Number(K);return{zone:b,target:{kind:"repo-serial",root_dir:q,lane_id:b.getAttribute("data-lane-id")||"",index:Number.isFinite(ge)?ge:0}}}return null}function ft(){for(let d of Array.from(N.querySelectorAll(".is-drop-over")))d.classList.remove("is-drop-over")}function Ct(d){let p=d.target,b=typeof p?.closest=="function"?p.closest('[draggable="true"][data-bead-id]'):null,w=b?b.closest("[data-drag-kind]"):null;if(!w)return;let q=w.getAttribute("data-bead-id")||"",H=w.getAttribute("data-drag-kind")||"",K=w.getAttribute("data-root-dir")||"";if(!q||!H||!K)return;let ge=w.getAttribute("data-queue-index")||"",Re=Number(ge),Vt=w.getAttribute("data-lane-id")||"";Ee={kind:H,bead_id:q,root_dir:K,...ge!==""&&Number.isFinite(Re)?{queue_index:Re}:{},...Vt?{lane_id:Vt}:{}},R=!0,le=null,N.classList.add("is-dragging");try{d.dataTransfer?.setData("text/plain",q),d.dataTransfer&&(d.dataTransfer.effectAllowed="move")}catch{}}function Lt(d){let p=vt(d);p&&(d.preventDefault(),d.dataTransfer&&(d.dataTransfer.dropEffect="move"),p.zone.classList.add("is-drop-over"))}function Gt(d){let p=d.target;typeof p?.closest=="function"&&p.closest("[data-drop]")?.classList.remove("is-drop-over")}function Jt(){Ee=null,ft(),N.classList.remove("is-dragging"),Ie()}function wt(d){let p=vt(d),b=Ee;Ee=null,ft(),N.classList.remove("is-dragging"),!(!p||!b)&&(d.preventDefault(),Nt(b,p.target))}function sn(d){return{runner:d.runner||void 0,model:d.model||void 0,effort:d.effort||void 0,status:d.run_state==="running"?"running":d.run_state,worktree:d.root_dir}}function fn(d,p){let{item:b,root_dir:w,revision:q}=z(p),H=b?.attempt_id||"",K=d.classList;if(K.contains("worker-dep__remove")){ce("dep-remove",p,d.dataset.blockerId||"");return}if(K.contains("mon2-rowops__up")||K.contains("mon2-rowops__down")){Qt(p,K.contains("mon2-rowops__up")?-1:1);return}if(K.contains("mon2-rowops__remove")){ne("worker-queue-remove",{bead_id:p},w,q);return}if(K.contains("mon2-crow__detach")){Je(p);return}if(K.contains("mon-dep__btn")){Ke(p);return}if(K.contains("worker-dep__open")){Ke(p,d.getAttribute("data-dep-direction")==="successor"?"successor":"predecessor");return}if(K.contains("mon-lane__chip")){let ge=d.getAttribute("data-lane-id")||"";N.querySelector(`.mon2-clane[data-lane-id="${ge}"]`)?.scrollIntoView({block:"nearest"});return}if(K.contains("mon-deppanel__unlink")){ve("dep-remove",d.getAttribute("data-dep-a")||"",d.getAttribute("data-dep-b")||"");return}if(K.contains("mon-deppanel__seg")){M&&(M={...M,direction:d.getAttribute("data-dep-direction")==="successor"?"successor":"predecessor"},x());return}if(K.contains("mon-deppanel__cand")){let ge=d.getAttribute("data-dep-cand")||"";M&&ge&&(M.direction==="predecessor"?ve("dep-add",M.bead_id,ge):ve("dep-add",ge,M.bead_id));return}if(K.contains("mon-overlap__chip")){let ge=d.getAttribute("data-overlap-id")||"";U=!!U&&U.bead_id===p&&U.counterpart_id===ge?null:{bead_id:p,counterpart_id:ge},x();return}if(K.contains("mon-overlap__place")){He(p,d.getAttribute("data-counterpart-id")||"");return}if(K.contains("worker-card__place")){le=le===p?null:p,x();return}if(K.contains("worker-card__place-cancel")){le=null,x();return}if(K.contains("worker-card__place-lane")){let ge=d.getAttribute("data-lane")||"parallel";le=null,Ht(p,ge);return}if(K.contains("rtile__session")){Y=H,H&&b&&be.open({attempt_id:H,root_dir:w,meta:sn(b)}),x();return}if(K.contains("rtile__pause")){ye("worker-attempt-pause",{attempt_id:H},w);return}if(K.contains("rtile__resume")){Pr().then(ge=>{if(ge!==null)return xe("worker-attempt-resume",{attempt_id:H,...ge!==""?{instructions:ge}:{}},w,q)});return}if(K.contains("rtile__dismiss")){ne("worker-attempt-dismiss",{attempt_id:H},w,q);return}if(K.contains("rtile__discard")){if(!h(xs(p,"unmerged")))return;X({bead_id:p,...H?{attempt_id:H}:{},...d.dataset.operationId?{operation_id:d.dataset.operationId}:{}},w,q);return}if(K.contains("worker-mini__merge")){let ge=Se(w,p);ge?.mismatch&&ge.continuation===null?V(w,p,q,ge.mismatch):ne("worker-merge-queue-add",{bead_id:p},w,q);return}if(K.contains("worker-mini__merge-cancel")){ne("worker-merge-queue-remove",{bead_id:p},w,q);return}if(K.contains("worker-mini__discard")){let ge=d.dataset.discardMode==="merged"?"merged":"unmerged";if(!h(xs(p,ge)))return;X({bead_id:p,...d.dataset.attemptId?{attempt_id:d.dataset.attemptId}:{},...d.dataset.operationId?{operation_id:d.dataset.operationId}:{}},w,q);return}if(K.contains("worker-mini__revise-fix")){xe("worker-revise-fix",{bead_id:p},w,q);return}K.contains("worker-mini__revise-approve")&&ne("worker-revise-approve",{bead_id:p},w,q)}function En(d){let p=R;R=!1;let b=d.target;if(!b||typeof b.closest!="function"||b.closest("dialog")||b.closest(".mon2-drawer")||b.closest("a"))return;let w=b.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(w){d.preventDefault();let Un=b.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||w.textContent?.trim()||"";Un&&I(Un);return}let q=b.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(q){d.preventDefault();let qt=q.getAttribute("data-root-dir")||_e.get(b.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||q.getAttribute("title")||"";k(qt);return}let H=b.closest(".mon2-sec__toggle");if(H){d.preventDefault(),ue(H.getAttribute("data-root-dir")||"");return}let K=b.closest(".mon2-area__toggle");if(K){d.preventDefault(),tt(K.getAttribute("data-area")||"parallel");return}if(b.closest(".mon2-newlane")){d.preventDefault(),qe("create","");return}let ge=b.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove");if(ge){d.preventDefault();let qt=ge.getAttribute("data-lane-id")||"";qe(ge.classList.contains("mon2-clane__confirm")?"confirm":ge.classList.contains("mon2-clane__reapply")?"reapply":"remove",qt);return}if(b.closest(".mon-merge-all")){d.preventDefault(),me();return}let Re=b.closest(".mon-filter__spec");if(Re){d.preventDefault(),S={...S,spec:Re.getAttribute("data-spec")||"all"},Vi(S),x();return}let Vt=b.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Vt)return;let on=Vt.getAttribute("data-bead-id")||"",zr=b.closest("button");if(zr){d.preventDefault(),fn(zr,on);return}on&&!p&&(d.preventDefault(),O(on,Vt.getAttribute("data-root-dir")||z(on).root_dir))}function T(d){let p=d.target;if(!p||typeof p.closest!="function")return;let b=p.closest(".mon-filter__blocked");if(b){S={...S,show_blocked:b.checked},Vi(S),x();return}let w=p.closest(".mon-filter__deps");if(w){S={...S,with_deps:w.checked},Vi(S),x();return}let q=p.closest(".mon-candidate-sort");if(q){F=Os.some(ge=>ge.value===q.value)?q.value:"repo_spec",nh(F),x();return}let H=p.closest(".mon-running-sort");if(H){$=H.value==="repo"?"repo":"started",ih($),x();return}let K=p.closest(".mon-done-range");K&&(y=mn(K.value)?K.value:ln,oh(y),x())}function L(d){let p=d.target,b=p&&typeof p.closest=="function"?q=>p.closest(q):()=>null,w=!1;U&&!b(".mon-overlap__popover, .mon-overlap__chip")&&(U=null,w=!0),M&&!b(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(M=null,w=!0),w&&x()}function Pe(d){d.key!=="Escape"||!U&&!M||(U=null,M=null,x())}function _(d){let p=d.target;!p||typeof p.closest!="function"||!p.closest(".mon-deppanel__search")||!M||(M={...M,query:p.value},x())}e.addEventListener("click",En),e.addEventListener("change",T),e.addEventListener("input",_),document.addEventListener("click",L),document.addEventListener("keydown",Pe),e.addEventListener("dragstart",Ct),e.addEventListener("dragover",Lt),e.addEventListener("dragleave",Gt),e.addEventListener("drop",wt),e.addEventListener("dragend",Jt),s&&typeof s.subscribe=="function"&&(ee=s.subscribe(()=>{try{fe.clear(),x()}catch{}}));function v(){he!==null&&(clearInterval(he),he=null)}function m(){de!==null&&(clearTimeout(de),de=null)}return{load(){n("load"),x(),he===null&&(he=setInterval(()=>{try{x()}catch{}},lh))},pause(){v()},clear(){v(),m(),ee&&(ee(),ee=null),be.destroy(),$e?.destroy(),$e=null,e.removeEventListener("click",En),e.removeEventListener("change",T),e.removeEventListener("input",_),document.removeEventListener("click",L),document.removeEventListener("keydown",Pe),e.removeEventListener("dragstart",Ct),e.removeEventListener("dragover",Lt),e.removeEventListener("dragleave",Gt),e.removeEventListener("drop",wt),e.removeEventListener("dragend",Jt),e.replaceChildren()}}}function ip(e,t,n){let r=At("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(y){return $=>{$.preventDefault(),r("click tab %s",y),n.gotoView(y)}}function c(){let y=t.getState();return y.view==="worker"||y.view==="monitor"?y.view:"board"}function u(){let y=c();return l`
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
    `}function h(){s&&Ge(u(),s),o&&Ge(f(),o)}return h(),a=t.subscribe(()=>h()),{destroy(){a&&(a(),a=null),s&&Ge(l``,s),o&&Ge(l``,o)}}}var lp=["bug","feature","task","epic","chore"];function cp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var up=["Critical","High","Medium","Low","Backlog"];function dp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),c=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),f=n.querySelector("#btn-cancel"),h=n.querySelector("#btn-create"),y=n.querySelector(".new-issue__close");function $(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let W of lp){let E=document.createElement("option");E.value=W,E.textContent=cp(W),o.appendChild(E)}a.replaceChildren();for(let W=0;W<=4;W+=1){let E=document.createElement("option");E.value=String(W);let N=up[W]||"Medium";E.textContent=`${W} \u2013 ${N}`,a.appendChild(E)}}$();function S(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function F(D){s.disabled=D,o.disabled=D,a.disabled=D,i.disabled=D,c.disabled=D,f.disabled=D,h.disabled=D,h.textContent=D?"Creating\u2026":"Create"}function B(){u.textContent=""}function Y(D){u.textContent=D}function le(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let W=window.localStorage.getItem("beads-ui.new.priority");W&&/^\d$/.test(W)?a.value=W:a.value="2"}catch{o.value="",a.value="2"}}function U(){let D=o.value||"",W=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),W.length>0&&window.localStorage.setItem("beads-ui.new.priority",W)}async function M(){B();let D=String(s.value||"").trim();if(D.length===0){Y("Title is required"),s.focus();return}let W=Number(a.value||"2");if(!(W>=0&&W<=4)){Y("Priority must be 0..4"),a.focus();return}let E=String(o.value||""),N=String(c.value||""),re={title:D};E.length>0&&(re.type=E),String(W).length>0&&(re.priority=W),N.length>0&&(re.description=N),F(!0);try{await t("create-issue",re)}catch{F(!1),Y("Failed to create issue");return}U(),F(!1),S()}return n.addEventListener("cancel",D=>{D.preventDefault(),S()}),y.addEventListener("click",()=>S()),f.addEventListener("click",()=>S()),n.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),M())}),r.addEventListener("submit",D=>{D.preventDefault(),M()}),{open(){r.reset(),B(),le();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){S()}}}var dh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ph(e,t){return Fa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function pp(e,t,n){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=ph(r,e);return l`<button
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
        ${dh.map(([n,r])=>l`<label class="settings-dialog__toggle">
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
  `}var fh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function mp(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(ee=>ae(ee,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,u="",f=null;function h(){if(f)return f;let ee=a.querySelector('[data-pane="execution"]');return ee?(f=Jo(ee,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:he=>t.queueStore?.set?.(he)}),f):null}function y(){return l`
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
              ${pp(ee,s(),Y)}
              ${fp(ee,u,{onDraft:he=>{u=he},onAdd:le,onRemove:U})}
              ${_p(ee,M)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function S(ee){let he=r.get();if(he)try{let $e=await n("display-policy-set",{expected_revision:he.revision,policy:ee(he)});F($e),$e&&$e.conflict&&$e.policy&&($e=await n("display-policy-set",{expected_revision:$e.policy.revision,policy:ee($e.policy)}),F($e)),$e&&$e.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function F(ee){ee&&ee.policy&&typeof ee.policy=="object"&&r.set(ee.policy)}function B(ee){S(ee)}function Y(ee){let he=r.get();if(!he)return;let $e=!_h(ee,he);B(be=>mh(ee,be,$e))}function le(){let ee=u.trim();ee.length!==0&&(u="",B(he=>he.hidden_prefixes.includes(ee)?{hidden_prefixes:he.hidden_prefixes}:{hidden_prefixes:[...he.hidden_prefixes,ee]}),D())}function U(ee){B(he=>({hidden_prefixes:he.hidden_prefixes.filter($e=>$e!==ee)}))}function M(ee){let he=r.get();if(!he)return;let $e=he.chips[ee]===!1;B(()=>({chips:{[ee]:$e}}))}function D(){Ge(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${fh.map(ee=>l`<button
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
      `,a),h()}function W(ee){i=ee,D()}let E=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",E),a.addEventListener("cancel",E);let N=ee=>{ee.target===a&&fe()};a.addEventListener("click",N);let re=null;r.subscribe&&(re=r.subscribe(()=>{c&&D()}));let J=null;t.implPresetStore?.subscribe&&(J=t.implPresetStore.subscribe(()=>{c&&f?.render()}));function _e(ee="execution"){c||(c=!0,t.onOpenChange?.(!0),i=ee,u="",D(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),h()?.load())}function fe(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:_e,close:fe,sessionDraft:()=>f?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",E),a.removeEventListener("cancel",E),a.removeEventListener("click",N),re&&(re(),re=null),J&&(J(),J=null),f?.destroy(),f=null,a.remove()}}}function _h(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function mh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var gh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],gp="usage-meter-card",bh="usage-meter-layer",bp=600,hh=["token_expired","relogin_required"];function hp(e){return String(e).padStart(2,"0")}function yh(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function yp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${hp(r.getHours())}:${hp(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${gh[r.getMonth()]} ${r.getDate()} ${o}`;return`${yh(n,t)} \xB7 ${i}`}function vh(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function vp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function wp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var kp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function xp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function wh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:xp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function kh(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=wh(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?xp(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function $p(e,t){return`${e}:${t}`}function Ap(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function u(){Ge(l``,e),e.hidden=!0,h()}function f(){if(c===null){let be=e.ownerDocument;c=be.createElement("div"),c.id=bh,c.className="usage-meter__layer",be.body.appendChild(c)}return c}function h(){c!==null&&(Ge(l``,c),c.remove(),c=null)}function y(be){n!==be&&(n===null&&(document.addEventListener("mousedown",S),document.addEventListener("keydown",B),window.addEventListener("resize",F)),n=be)}function $(){n!==null&&(n=null,document.removeEventListener("mousedown",S),document.removeEventListener("keydown",B),window.removeEventListener("resize",F))}function S(be){let ne=be.target;ne&&(e.contains(ne)||c!==null&&c.contains(ne))||($(),fe())}function F(){fe()}function B(be){be.key==="Escape"&&($(),fe())}function Y(be){n===be?$():y(be),fe()}function le(){$(),fe()}async function U(be,ne){if(r.has(be.key))return;let Se=$p(be.key,ne);r.set(be.key,ne),a.delete(Se),fe();let xe=null;try{xe=await(await fetch(be.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ne})})).json()}catch{xe=null}if(t)return;if(r.delete(be.key),!xe||xe.ok!==!0){let X=xe&&typeof xe.error=="string"&&xe.error.length>0?xe.error:"network_error";a.set(Se,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${X}`}),fe();return}let V=Array.isArray(xe.warnings)?xe.warnings.filter(X=>typeof X=="string"&&X.length>0):[];V.length>0&&a.set(Se,{kind:"warn",text:V.join(" \xB7 ")}),fe(),await $e()}function M(be,ne,Se,xe){let V=wp(be.pct),ye=`resets ${yp(be.resetsAt,xe)}${ne?` \xB7 ${Se}`:""}`;return l`<span
      class="usage-meter__window ${vp(V)}"
      style=${`--progress: ${V}%`}
      title=${ye}
    >
      <span class="usage-meter__label">${be.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${V}%</span>
    </span>`}function D(be,ne,Se){let xe=ne.available&&typeof ne.ageSeconds=="number"&&ne.ageSeconds>bp,V=xe&&typeof ne.ageSeconds=="number"?`${Math.floor(ne.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",X=ne.accounts.filter(ue=>!ue.active).length,ye=`usage-meter__group${xe?" usage-meter__group--stale":""}`,me=l`<span class="usage-meter__provider"
        >${be.label}</span
      >
      ${ne.available?ne.windows.map(ue=>M(ue,xe,V,Se)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${X>0?l`<span class="usage-meter__badge">+${X}</span>`:""}`;if(ne.accounts.length===0)return l`<span
        class=${ye}
        aria-label=${`${be.label} usage`}
        >${me}</span
      >`;let Fe=n===be.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${ye}`}
      aria-label=${`${be.label} usage`}
      aria-expanded=${Fe?"true":"false"}
      aria-controls=${gp}
      @click=${()=>Y(be.key)}
    >
      ${me}
    </button>`}function W(be,ne){return l`<span class="usage-meter" aria-label="Usage">
      ${be.map(Se=>D(Se.provider,Se.snapshot,ne))}
    </span>`}function E(be,ne){let Se=wp(be.pct),xe=yp(be.resetsAt,ne);return l`<span
      class="usage-meter__account-window ${vp(Se)}"
      style=${`--progress: ${Se}%`}
    >
      <span class="usage-meter__account-key">${be.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Se}%</span>
      <span class="usage-meter__account-reset"
        >${xe.length>0?`\u21BB ${xe}`:""}</span
      >
    </span>`}function N(be,ne){return hh.includes(ne)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${be.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function re(be,ne,Se){let xe=ne.status==="ok",V=typeof ne.ageSeconds=="number"&&ne.ageSeconds>bp,X=a.get($p(be.key,ne.number)),ye=r.get(be.key),me=ye!==void 0,Fe=ye===ne.number,ue=["usage-meter__account"];return ne.active&&ue.push("usage-meter__account--active"),xe||ue.push("usage-meter__account--unavailable"),V&&ue.push("usage-meter__account--stale"),l`<div class=${ue.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${ne.email}
          >${ne.alias===null?ne.email:ne.alias}</span
        >
        ${ne.plan===null?"":l`<span class="usage-meter__account-tag">${ne.plan}</span>`}
        ${ne.active?l`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${ne.ageSeconds===null?"":l`<span class="usage-meter__account-age"
              >${vh(ne.ageSeconds)}</span
            >`}
        ${ne.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${me}
              @click=${()=>{U(be,ne.number)}}
            >
              ${Fe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${xe?l`<div class="usage-meter__account-windows">
            ${ne.windows.map(ze=>E(ze,Se))}
          </div>`:l`<div class="usage-meter__account-status">
            ${N(be,ne.status)}
          </div>`}
      ${X===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${X.kind}"
          >
            ${X.text}
          </div>`}
    </div>`}function J(be,ne,Se){let xe=ne.accounts.filter(V=>V.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${be.label} · 활성 ${xe} / 전체
        ${ne.accounts.length}
      </h2>
      ${ne.accounts.map(V=>re(be,V,Se))}
    </section>`}function _e(be,ne){return l`<div
      class="usage-meter__card"
      id=${gp}
      role="dialog"
      aria-label=${`${be.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${J(be.provider,be.snapshot,ne)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function fe(){let be=[];for(let xe of kp){let V=o.get(xe.key);V&&be.push({provider:xe,snapshot:V})}if(be.length===0){$(),u();return}let ne=be.find(xe=>xe.provider.key===n&&xe.snapshot.accounts.length>0);ne||$();let Se=Date.now();Ge(W(be,Se),e),e.hidden=!1,ne?ee(ne,Se):h()}function ee(be,ne){let Se=f(),xe=e.getBoundingClientRect(),V=e.ownerDocument.documentElement.clientWidth;Se.style.setProperty("--usage-meter-anchor-top",`${xe.bottom}px`),Se.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,V-xe.right)}px`),Ge(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${le}
        ></div>
        ${_e(be,ne)}`,Se)}async function he(be){try{let ne=await fetch(be.endpoint);return ne.ok?kh(await ne.json()):null}catch{return null}}async function $e(){i+=1;let be=i,ne=await Promise.all(kp.map(async Se=>({provider:Se,snapshot:await he(Se)})));if(!(t||be!==i)){for(let Se of ne)Se.snapshot?o.set(Se.provider.key,Se.snapshot):o.delete(Se.provider.key);fe()}}return u(),$e(),s=setInterval(()=>{$e()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),$(),u()}}}function Sp(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var $h="worker-ineligible";function Ki(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ep(e){return Ki(e).includes($h)}var xh="worker-serial";function Yi(e){return Ki(e).includes(xh)}function Zi(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Ah=new Set(["done","failed","orphaned","stopped","discarded"]),Sh={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Eh={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Th={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Xi(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Th[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Tp(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,u=new Map,f=!1,h=null,y=null,$=null,S=new Set,F=!1,B=0,Y=null,le=new Set;function U(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function M(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function D(){return o&&o()||""}async function W(){if(!s)return;let A=++B;F=!0,$=null,S.clear(),We();try{let O=await s("worker-parallel-analysis-targets",{root_dir:D()});if(A!==B||!Te)return;let k=Array.isArray(O?.qualified)?O.qualified:[],I=Array.isArray(O?.excluded)?O.excluded:[];$={qualified:k,excluded:I};for(let z of k)z&&typeof z.id=="string"&&S.add(z.id)}catch{A===B&&Te&&($={qualified:[],excluded:[]},ae("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{A===B&&(F=!1,Te&&We())}}function E(A){return Array.isArray(A.runs)?A.runs:[]}function N(){let A=U(),O=new Set;for(let k of Object.values(A.attempts||{})){let I=k;I&&typeof I.bead_id=="string"&&!Ah.has(I.status)&&O.add(I.bead_id)}for(let k of Array.isArray(A.pr_wait)?A.pr_wait:[])k&&typeof k.bead_id=="string"&&O.add(k.bead_id);for(let k of Object.values(A.discard_operations||{})){let I=k;I&&I.phase!=="done"&&typeof I.bead_id=="string"&&O.add(I.bead_id)}return O}function re(A){return A.filter(O=>J(O)===null)}function J(A){let O=U();for(let k of Array.isArray(O.serial_lanes)?O.serial_lanes:[])if(Array.isArray(k?.entries)&&k.entries.some(I=>I.bead_id===A))return k.id;return(Array.isArray(O.queue)?O.queue:[]).some(k=>k.bead_id===A)?"parallel":null}function _e(A,O){let k=c.get(A);return k||[...O.order]}function fe(A){if(A.length<2)return!1;let O=J(A[0]);if(!O||O==="parallel")return!1;let k=U(),I=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).find(pe=>pe.id===O)?.entries.map(pe=>pe.bead_id);if(!Array.isArray(I))return!1;let z=A.map(pe=>I.indexOf(pe));return z.every(pe=>pe>=0)&&z.every((pe,ce)=>ce===0||pe>z[ce-1])}function ee(){let A=U(),O=Array.isArray(A.serial_lanes)?A.serial_lanes:[],k=O.find(I=>Array.isArray(I.entries)&&I.entries.length===0);return k?k.id:O[0]?.id||"s1"}function he(A){let O=U().bead_titles||{};return typeof O[A]=="string"?O[A]:A}async function $e(A,O){if(!s||f)return null;f=!0,We();try{return await s(A,O)}finally{f=!1,We()}}async function be(A){r?.setPending?.(!0);try{let O=await $e("worker-parallel-analysis-start",{force:A,target_ids:Array.from(S)});O&&O.applied===!1&&O.reason&&(O.reason==="target_not_qualified"&&Array.isArray(O.detail)?ae(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${O.detail.join(", ")}`,"error",3200):ae(`\uBD84\uC11D \uC2E4\uD328: ${O.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ne(){let A=M().job;!s||!A||await s("worker-parallel-analysis-cancel",{job_id:A.job_id})}async function Se(A){if(!(!s||le.has(A))){le.add(A),We();try{let O=await s("worker-parallel-analysis-prompt",{root_dir:D(),run_id:A});if(!Te)return;if(O?.ok===!0&&typeof O.prompt=="string"){Y={run_id:A,prompt:O.prompt};return}ae(O?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{le.delete(A),We()}}}function xe(){Y=null,We()}async function V(){if(!Y)return;let A=await un(Y.prompt);ae(A?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",A?"success":"error",1400)}function X(A,O){a&&a(A,Xi(O))}function ye(){return U().runner_catalog}function me(A){return Object.keys(ye()?.runners?.[A]?.models||{})}function Fe(A){let O=me(A),k=ye()?.runners?.[A]?.default_model;return typeof k=="string"&&O.includes(k)?k:O[0]||""}function ue(){let A=M().settings,O=h||A.runner||"claude",k=me(O),I=h?Fe(O):A.model||k[0]||"",z=Zi(ye(),O,I),pe=A.effort||"",ce=z.includes(pe)?pe:z[0]||"";return{runner:O,model:I,effort:ce,models:k,efforts:z}}async function ze(A){let O=M().settings,k=await $e("worker-parallel-analysis-settings-update",{expected_revision:O.revision,runner:A.runner,model:A.model,effort:A.effort});(!k||k.applied!==!0)&&(h=null,We(),k&&k.reason&&ae(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${k.reason}`,"error",2800))}function tt(A){h=A,We();let O=ue();ze({runner:A,model:O.model,effort:O.effort})}function ut(A){let O=ue(),k=Zi(ye(),O.runner,A);ze({runner:O.runner,model:A,effort:k.includes(O.effort)?O.effort:k[0]||""})}function C(A){let O=ue();ze({runner:O.runner,model:O.model,effort:A})}async function se(A,O){if(!s||f)return;let k=_e(A,O),I=M();if(k.length<2||!I.last_good){ae("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let z=u.get(A)||ee(),pe=()=>({snapshot_digest:I.last_good.identity_digest,group_index:A,lane:z,ordered_bead_ids:k,expected_revision:U().revision});f=!0,We();try{let ce=await s("worker-parallel-analysis-submit",pe());ce&&ce.queue&&n&&n.set(ce.queue),ce&&ce.applied!==!0&&ce.conflict===!0&&(ce=await s("worker-parallel-analysis-submit",pe()),ce&&ce.queue&&n&&n.set(ce.queue)),ce&&ce.applied===!0?(c.delete(A),ae(`\uC9C1\uB82C \uB808\uC778 ${z}\uC5D0 ${k.length}\uAC1C \uBC30\uCE58`,"success")):ae(`\uC81C\uCD9C \uAC70\uBD80: ${ce?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{f=!1,We()}}function we(A,O,k){c.set(A,_e(A,O).filter(I=>I!==k)),We()}function Me(A){c.delete(A),We()}function De(A,O,k,I){let z=[..._e(A,O)],pe=z.indexOf(k),ce=pe+I;pe<0||ce<0||ce>=z.length||(z.splice(ce,0,...z.splice(pe,1)),c.set(A,z),We())}function Be(){let A=M().settings,O=Object.keys(ye()?.runners||{}),k=ue();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${I=>tt(I.target.value)}
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
      ${He(A)}
    </div>`}function He(A){return!mt(A)||st(A)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:A.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${A.runner}/${A.model} · effort
        ${A.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:A.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function st(A){return A.is_default===!0&&A.compatible===!1}function mt(A){return!!(A.runner&&A.model&&A.effort)}function te(A){return mt(A)&&A.compatible!==!1}function Q(A){let O=Math.max(0,Math.floor(A/1e3)),k=Math.floor(O/60),I=O%60;return`${k}:${String(I).padStart(2,"0")}`}function Le(A){let O=A.job;if(O){let k=typeof O.started_at=="number"?O.started_at:0,I=`${O.runner||"?"}/${O.model||"?"}`,z=k?` \xB7 \uACBD\uACFC ${Q(Date.now()-k)}`:"",pe=typeof O.session_id=="string"?O.session_id:"",ce=E(A).find(ve=>ve.run_id===O.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${I} · effort ${O.effort||"?"}${z}</span
        >
        ${pe?l`<code class="pa-session-id" title=${pe}
              >${pe.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>X(O.job_id,ce||O)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${ce?.prompt_saved!==!0||le.has(O.job_id)}
          @click=${()=>{Se(O.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Oe()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Ye(A){let O=Le(A);return O===""?"":l`<div class="pa__strip">${O}</div>`}function Oe(){return r?.isPending?.()===!0}function ke(A){let O=!!A.job,k=te(A.settings),I=$!==null&&S.size===0,z=O||f||Oe()||F;return l`<div class="pa-meta">
      ${A.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(A.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!k||z||I}
        @click=${()=>{be(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!k||z||I}
        @click=${()=>{be(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!O}
        @click=${()=>{ne()}}
      >
        취소
      </button>
    </div>`}function Ue(A){return typeof A=="string"&&A.length>0?A:"\uBBF8\uBC30\uCE58"}function Ve(A,O){O?S.add(A):S.delete(A),We()}function Qe(A){let O=Array.isArray(A.scope)?A.scope:[],k=Array.isArray(A.overlaps)?A.overlaps:[];return O.length===0&&k.length===0?l``:l`<span class="pa-target__signals">
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
    </span>`}function Ze(){let A=$?.qualified||[],O=$?.excluded||[];return l`<section class="pa-targets">
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
                      @change=${I=>Ve(k.id,I.target.checked)}
                    />
                    <span class="pa-target__title">${k.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${Qe(k)}
                    <span class="pa-target__route">${k.route}</span>
                    <span class="pa-target__lane"
                      >${Ue(k.lane)}</span
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
                        >${Sh[k.reason]||k.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${Ue(k.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function dt(A){let O=typeof A.session_id=="string"&&A.session_id.length>0,k=O?A.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${A.outcome}"
        >${Eh[A.outcome]||A.outcome}</span
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
          @click=${()=>X(A.run_id,A)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${A.prompt_saved!==!0||le.has(A.run_id)}
          @click=${()=>{Se(A.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function Tt(A){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${A.length>0?l`<ul class="pa-runs__list">
            ${A.map(O=>dt(O))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function bt(){return Y?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${xe}></div>
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
              @click=${xe}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Y.prompt}</pre
        >
      </section>
    </div>`:""}function pt(A,O){let k=_e(A,O),I=N(),z=k.filter(Ce=>I.has(Ce)),pe=re(k),ce=fe(k),ve=Array.isArray(U().serial_lanes)?U().serial_lanes:[],et=u.get(A)||ee(),Ke=O.eligible!==!0||k.length<2||z.length>0||pe.length>0||ce||f;return l`<section class="pa-group" data-group-index=${String(A)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${O.confidence}</span>
        ${O.categories.map(Ce=>l`<span class="pa-group__category">${Ce}</span>`)}
        ${ce?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${O.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${pe.length>0?l`<span class="pa-group__stale"
              >stale — ${pe.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${O.reason}</p>
      <ol class="pa-group__members">
        ${k.map((Ce,lt)=>l`<li class="pa-member" data-bead-id=${Ce}>
              <span class="pa-member__seq">${lt+1}</span>
              <span class="pa-member__title">${he(Ce)}</span>
              ${I.has(Ce)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ce}
                ?disabled=${lt===0}
                aria-label=${`${Ce} \uC704\uB85C`}
                @click=${()=>De(A,O,Ce,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ce}
                ?disabled=${lt===k.length-1}
                aria-label=${`${Ce} \uC544\uB798\uB85C`}
                @click=${()=>De(A,O,Ce,1)}
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
          @click=${()=>Me(A)}
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
                  ?selected=${et===Ce.id}
                >
                  직렬 ${lt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Ke}
          @click=${()=>{se(A,O)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Rt(A){let O=Array.isArray(A.issues)?A.issues:[],k=O.filter(z=>z.verdict==="parallel_ok").length,I=O.filter(z=>z.verdict==="uncertain").length;return l`<div class="pa-summary">
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
              @click=${Ae}
            >
              ×
            </button>
          </header>
          ${Ye(A)}
          <div class="pa__body">
            ${Be()} ${ke(A)} ${Ze()}
            ${O?l`${O.groups.map((k,I)=>pt(I,k))}
                ${O.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Rt(O)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${Tt(E(A))}
          </div>
        </div>
        ${bt()}
      `,i)}let Te=!1,P=()=>{Te=!1,Y=null,B+=1,at()},Z=A=>{A.target===A.currentTarget&&Ae()};i.addEventListener("close",P),i.addEventListener("cancel",P),i.addEventListener("click",Z);let ie=null;n&&n.subscribe&&(ie=n.subscribe(()=>{Te&&We()}));let x=null;r&&r.subscribe&&(x=r.subscribe(()=>{Te&&We()}));function G(){Te||(Te=!0,We(),W(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Ae(){Te&&(Te=!1,Y=null,B+=1,at(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:G,close:Ae,destroy(){Te=!1,y!==null&&(clearInterval(y),y=null),i.removeEventListener("close",P),i.removeEventListener("cancel",P),i.removeEventListener("click",Z),ie&&(ie(),ie=null),x&&(x(),x=null),i.remove()}}}function Cp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let c=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(c.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:c})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let c=aa(s[a].scope,s[i].scope);if(c.length===0)continue;let u=s[a].member,f=s[i].member;n.get(u.id)?.overlaps.push({id:f.id,title:f.title,location_label:f.location_label,prefixes:c}),n.get(f.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:c})}return n}function Qi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",c=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&c&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&c&&a===null){let u=Ch(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!c?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function Ch(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Rp=new Set(["sh","bash","zsh","dash","ksh"]),Op=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Lp(e){let t=e.split("/");return t[t.length-1]||""}function Rh(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Lp(n[0]);if(r!=="env")return Rp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Rp.has(Lp(s))}function Oh(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Lh(e){let t=[],n=0;Op.lastIndex=0;for(let r of e.matchAll(Op)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Oh(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Ih(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Ip(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",c=0,u=null,f=!1;function h(D,W){return W?Lh(D).map(E=>E.kind==="plain"?E.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${E.kind}"
            >${E.text}</span
          >`):D}function y(){if(!s)return l``;let D=o==="ready"&&Rh(a),W=o==="ready"?a.split(`
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
    </div>`}function $(){Ge(y(),r)}async function S(){if(o!=="ready")return;let D=await un(a);ae(D?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",D?"success":"error")}function F(D){D.key==="Escape"&&s&&(D.preventDefault(),U())}function B(){f||(document.addEventListener("keydown",F),f=!0)}function Y(){f&&(document.removeEventListener("keydown",F),f=!1)}async function le(D,W=null){let E=++c;B(),s={...D},u=W||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",$(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let re=t?t():"";if(!re){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",$();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",$();return}let J="/api/repo-ops-script?workspace="+encodeURIComponent(re)+"&lane="+encodeURIComponent(D.lane)+"&base_sha="+encodeURIComponent(D.base_sha);try{let _e=await n(J),fe=await _e.json().catch(()=>({}));if(E!==c)return;if((t?t():"")!==re){U();return}if(!_e.ok||!fe||fe.ok!==!0){o="error",i=Ih(fe&&typeof fe.error=="string"?fe.error:""),$();return}s={lane:fe.lane,base_sha:fe.base_sha,path:fe.path,base_ref:fe.base_ref},a=String(fe.content),o="ready",$()}catch{if(E!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",$()}}function U(){c+=1,Y(),s=null,a="",$();let D=u;u=null,D?.isConnected&&D.focus()}function M(){U(),r.remove()}return{open:le,close:U,destroy:M}}function Pp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let E=o();return typeof E.revision=="number"?E.revision:0}function i(E){t&&E&&E.queue&&typeof E.queue=="object"&&t.set(E.queue)}function c(){let E=o().workspace_info;return E&&typeof E=="object"?E:{}}function u(E,N){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${E}"
      >${N}</span
    >`}function f(E){if(typeof E!="number"||!Number.isFinite(E))return"";let N=E/6e4;return Number.isInteger(N)?`timeout ${N}\uBD84`:`timeout ${Math.round(E/1e3)}\uCD08`}function h(E){let N=f(E);return N?u("config",N):""}function y(E,N,re){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${re.script}
      @click=${J=>{s&&s({lane:E,base_sha:N.base_sha,path:re.script,base_ref:N.base_ref},J.currentTarget)}}
    ></button>`}function $(){let E=o().repo_ops_opt_out;return{verify:E?.verify===!0,deploy:E?.deploy===!0}}function S(E,N){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!N}
        @change=${re=>{le(E,!re.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function F(E){let N=typeof E.base_sha=="string"?E.base_sha:"",re=`${E.source_path||"repo-ops/config.toml"} @ ${E.base_ref||"?"}${N?`@${N.slice(0,7)}`:""}`,J=$(),_e=!!E.verify&&J.verify,fe=!!E.deploy&&J.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${re}</span>
      </p>
      <div
        class="worker-repo-ops__lane${_e?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${E.verify?l`${y("verify",E,E.verify)}
              ${h(E.verify.timeout_ms)}
              ${_e?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${_e?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":E.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
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
    </section>`}async function Y(E){if(!n)return;let N=await n("worker-auto-repair-toggle",{on:E,expected_revision:a()});if(i(N),N&&N.conflict){let re=await n("worker-auto-repair-toggle",{on:E,expected_revision:a()});i(re)}r()}async function le(E,N){if(!n)return;let re=await n("worker-repo-ops-opt-out-toggle",{kind:E,opted_out:N,expected_revision:a()});if(i(re),re&&re.conflict){let J=await n("worker-repo-ops-opt-out-toggle",{kind:E,opted_out:N,expected_revision:a()});i(J)}r()}let U={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function M(E,N,re){return l`<div class="worker-repo-ops__policy-group" data-policy=${re}>
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
        ${E.map(N=>{let re=[U[N.trigger]||N.trigger];return Number.isInteger(N.attempts_per_operation_attempt)?re.push(`operation\uB2F9 ${N.attempts_per_operation_attempt}\uD68C`):Number.isInteger(N.attempts)?re.push(`${U[N.budget]||N.budget} ${N.attempts}\uD68C`):Number.isInteger(N.sessions_per_user_action)&&re.push(`${N.sessions_per_user_action}\uD68C`,U[N.user_actions]||N.user_actions),N.applies_when&&re.push(U[N.applies_when]||N.applies_when),l`<li data-token=${N.id}>
            <strong>${U[N.id]||N.id}</strong>
            <span>${re.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function W(){let E=o(),N=E.auto_repair!==!1,re=E.repo_operation_policy&&typeof E.repo_operation_policy=="object"?E.repo_operation_policy:null,J=Array.isArray(E.repo_operations)?E.repo_operations:[],_e=J.find($e=>$e.state==="repairing"),fe=J.filter($e=>$e.state==="failed"||$e.state==="repairing"),ee=fe.length?Math.min(...fe.map($e=>typeof $e.repair?.remaining=="number"?$e.repair.remaining:0)):re?.auto_repair?.resolution_ladder?.find($e=>$e.id==="auto_repair_session")?.attempts??1,he=Array.isArray(re?.auto_repair?.resolution_ladder)?re.auto_repair.resolution_ladder:[];return l`<section
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
          @change=${$e=>{Y($e.target.checked)}}
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
          >${_e?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${_e.repair?.owner_bead||_e.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
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
                ${he.length} · 금지
                ${(re.never_automatic||[]).length}</span
              >
            </summary>
            ${M("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",re.worker_automatic||[],"worker-automatic")}
            ${re.supported===!1||re.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${re.schema_version})`}
                </div>`:D(he)}
            ${M("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",re.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${B(c())} ${W()}
      </details>`}}}var qp=20,Ph=5,Dh=new Set(["failed","repairing","running","queued","retry_pending"]),Dp={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Mp={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Mh(e,t,n=qp){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Nh(e){if(e.type==="cleanup")return!0;let t=e.operation;return Dh.has(t.state)&&!t.dismissed&&!t.superseded_by}function qh(e,t,n={}){let r=Mh(e,t,1/0),s=n.expanded===!0?qp:Ph,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||Nh(i));return{visible:a,hidden:r.length-a.length}}function Np(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Fh(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Fp(e){let t=e.filter(n=>n.value);return t.length===0?"":l`<details class="worker-ev__details">
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
  </p>`}function jh(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return l`<div class="worker-ev__acts">
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
  </div>`}function Bh(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?jt(e.at):""}
      >${Ho(e.at)||"\u2014"}</span
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
          >${t.target_base}@${Uo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${$s(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Np(e)}"
          >${Fh(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?jp(md(t.failure_kind,r)):""}
      ${jh(t)}
      ${Fp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Uo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Uh(e){let t=e.cleanup,n=hr(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?jt(e.at):""}
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
        ${qd(t.step).map(r=>l`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${jp(Xo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
  </li>`}function Wh(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Uh(r):Bh(r))}
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
  </section>`}function Bp(e,t={}){let n=null;function r(){if(n===null){Ge(l``,e);return}let a=qh(n.operations,n.cleanup_failures,{expanded:n.expanded});Ge(Wh({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var zh=At("views:worker"),Hh="tab:worker:ready",Gh="tab:worker:blocked",Vh="tab:worker:in-progress",Kh="tab:worker:resolved",Yh="tab:worker:closed",da=1,Up=5;function Wp(e){return Eo(e).path.length>0}var Zh=new Set(["quick_fix","spec_backed","full_plan"]);function zp(e){return typeof e=="string"&&Zh.has(e)}var Kp="beads-ui.worker.candidate-filter",Ji={show_blocked:!1,spec:"all"};function Xh(){try{let e=window.localStorage.getItem(Kp);if(!e)return{...Ji};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Ji};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Ji}}}function Qh(e){try{window.localStorage.setItem(Kp,JSON.stringify(e))}catch{}}function Jh(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=n(i),u=r(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var ey=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Yp="bdui.worker.candidate_sort",ty=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],pa="spec";function ny(){try{let e=window.localStorage.getItem(Yp);return e==="board"||e==="created"||e==="spec"?e:pa}catch{return pa}}function ry(e){try{window.localStorage.setItem(Yp,e)}catch{}}var Zp="bdui.worker.done-range";function sy(){try{let e=window.localStorage.getItem(Zp);return mn(e)?e:ln}catch{return ln}}function oy(e){try{window.localStorage.setItem(Zp,e)}catch{}}var ay="(max-width: 640px)",Xp="beads-ui.worker.lane-collapsed",Ls={queue:!0,done:!0};function iy(){try{let e=window.localStorage.getItem(Xp);if(!e)return{...Ls};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ls}:{queue:typeof t.queue=="boolean"?t.queue:Ls.queue,done:typeof t.done=="boolean"?t.done:Ls.done}}catch{return{...Ls}}}function ly(e){try{window.localStorage.setItem(Xp,JSON.stringify(e))}catch{}}function Hp(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function cy(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(pr):(r.sort(Xs(n)),t==="board"?r:[...r.filter(Wp),...r.filter(s=>!Wp(s))])}function uy(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function dy(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function Gp(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function py(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function fy(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function _y(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function my(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function gy(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function el(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var by=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),hy=new Set(["waiting_metadata","reviewing","retrying"]);function yy(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?jt(r.next_at):"",c=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",c?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${c}`:""].filter(Boolean),live:!0}}default:return null}}function vy(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function wy(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let c=vy(e.terminal_reason);c&&i.push(`\uC6D0 \uC0AC\uC720: ${c}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!by.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Vp(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ky(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Vp(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Vp(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=py(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Gp(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Gp(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function $y(e,t,n,r,s=null,o=null,a=null,i=!1,c=null,u=!0,f=null,h=null,y=null,$={},S=!1,F=!1,B={}){let Y=!!c&&c.position>0,le=!!c?.continuation_action&&c.continuation_action.continuation===null,U=!!c&&c.active===!0,M=c&&c.failure||null,D=_y(c?c.waiting:null,y),W=n[e]||null,E=W&&W.gate?W.gate:null,N=W&&W.pr?W.pr:null,re=my(c?c.resolution:null),J=gy(c?c.head_review:null),_e=c&&c.head_review||null,fe=yy(y,_e),ee=wy(y,fe),he=c&&c.authority||null,$e=!!_e&&["pending","reviewing","revising"].includes(_e.state),be=!!y&&typeof y=="object"&&hy.has(y.phase),ne=Y&&!U&&(_e?.state==="failed"||!he||be||he.source==="automatic"&&!F),Se=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":re?re.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":D,xe=!!E&&E.base_badge==="\uCDA9\uB3CC",V=!!E&&E.enabled===!0,X=Cs({bead_id:e,merge_sha:B.merge_sha,cleanup_cursor:B.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:B.repo_operations}),ye=ca(X),me=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!E&&E.tier==="merged",Fe=i&&!!r&&!!E&&E.tier==="merged",ue=ne&&(V||xe||E?.reason==="base_behind"||E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"||me||Fe),ze=i&&xe&&u===!1,tt=An($,e,{external:i,merge_active:U||X?.step==="merge",merge_queued:Y,conflict_active:!!a,cleanup_active:ye,merged:!!r||E?.tier==="merged"}),ut=!!tt.operation,C=!me&&!!r&&r.step==="repo_operations",se=ky({continuation_required:le,merge_step:X,conflict_badge:Se,conflict_live:re?.live===!0||a==="running",head_review:_e&&J?{...J,state:_e.state,failure_reason:_e.failure_reason}:null,auto_resolution:fe,recovery:ee,cleanup_failed:r,cleanup_label:r?hr(r.step):null,base_exception:h,conflicting:xe,gate:E,receipt_check:W&&W.receipt_check?W.receipt_check:null,queue_failure:M,auto_skip:f,queued:Y,queue_active:U,queue_position:c?c.position:0,activity:Se?null:o&&o.activity||null}),we=se?.live===!0&&se.title?l`<span title=${se.title}>${se.label}</span>`:se?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:r&&X?.active!==!0?la(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:S,external:i,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",completion_badge:se?.live!==!0&&se?.title?se.label:null,completion_title:se?.title||"",completion_repair_pr_url:ee?ee.repair_pr_url:"",completion_repair_pr_number:ee?ee.repair_pr_number:null,badges:we?[we]:[],live_badge:se?.live===!0?we:null,usage:s,alert:se?.alert===!0,merge_action:E?.tier==="merged"&&!me&&!Fe||C?!1:!Y||le||ne,timeline_action:C,cancel_action:Y&&!le,cancel_enabled:(!U||$e)&&!(ee&&ee.lock_actions),cancel_title:ee&&ee.lock_actions?`${ee.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:U&&!$e?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":$e?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:tt,discard_action:tt.action,merge_step:X,discard_enabled:tt.enabled,discard_title:tt.title,merge_enabled:!X&&!a&&!ut&&!h&&!(ee&&ee.lock_actions)&&!ze&&!C&&(V||xe||E?.reason==="base_behind"||E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"||me||Fe||ue||be&&!U),merge_label:le?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":me||Fe?"\uC815\uB9AC \uC7AC\uAC1C":xe&&!X&&!me?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":E?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ne?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ut?tt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${tt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${tt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:le?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":X?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${X.label}`:Fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ze?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":me?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":xe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":V?`\uBA38\uC9C0 (${E.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:E&&E.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${E&&E.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function tl(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,openDoc:f,doneRange:h,onDoneRangeChange:y}=t,$=r?Js(r,i):null,S=ro({transport:n,uiOrderStore:i}),F=null,B=[],Y=Xh(),le=null,U=null,M={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},D=ny(),W=mn(h)?h:sy(),E=new Map;function N(){let _=Gn.find(v=>v.value===W);return _?_.label:"\uC624\uB298"}let re=iy(),J=!1,_e=new Set,fe=new Set,ee=new Set,he=new Set,$e=new Set,be={},ne=null,Se=0,xe=null,V=[];function X(_){return ne===_?be:{}}async function ye(){if(!n)return;let _=u?.()||"";if(ne===_||xe&&xe.key===_&&xe.generation===Se)return;let v=++Se;xe={key:_,generation:v};let m=null;try{m=await Promise.resolve(n("get-session-defaults",{}))}catch(d){if(v!==Se)return;xe=null,zh("get-session-defaults failed: %o",d),qe();return}v===Se&&(be=m&&typeof m.values=="object"&&m.values!==null?{...m.values}:{},ne=_,xe=null,qe())}function me(){ne=null,Se+=1,ye()}let Fe=document.createElement("div");Fe.className="worker-console";let ue=document.createElement("div");ue.className="worker-top";let ze=document.createElement("div");ze.className="worker-drawer-overlay",ze.hidden=!0;let tt=document.createElement("div");tt.className="worker-drawer-overlay__backdrop";let ut=document.createElement("div");ut.className="worker-drawer-host";let C=document.createElement("div");C.className="worker-drawer-host",C.hidden=!0,ze.append(tt,ut,C);let se=document.createElement("div");se.className="worker-lanes-host",Fe.append(ue,ze,se),e.appendChild(Fe);let we=null,Me=null,De=qr(ut,{transport:n,sessionLogStore:a,onClose:()=>{we=null,Me=null,ze.hidden=!0,qe()}}),Be=Bp(C,{onClose:()=>{C.hidden=!0,ze.hidden=!0,qe()}}),He=Ip({getWorkspacePath:u||(()=>"")}),st=u&&u()||"",mt=Pp({queueStore:s,transport:n,onChanged:()=>qe(),onOpenScript:(_,v)=>{He.open(_,v)}}),te=o?Tp(Fe,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(_,v)=>fn(_,v)}):null;function Q(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:da,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Le(){let _=Q(),v=typeof _.serial_lane_count=="number"&&Number.isInteger(_.serial_lane_count)&&_.serial_lane_count>0?Math.min(_.serial_lane_count,5):0,m=Array.isArray(_.serial_lanes)?_.serial_lanes:[],d=[];for(let b of m){if(d.length>=v)break;!b||typeof b.id!="string"||!/^s[1-5]$/.test(b.id)||!Array.isArray(b.entries)||d.push({id:b.id,label:`\uC9C1\uB82C ${b.id.slice(1)}`,count:b.entries.length})}return d.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(_.queue)?_.queue:[]).length},...d]}function Ye(_){if(!le||!_.some(m=>m.id===le))return null;let v=Le();return v?{bead_id:le,lanes:v}:null}function Oe(){let _=Q();return typeof _.revision=="number"?_.revision:0}function ke(_){_&&_.queue&&s&&s.set(_.queue)}function Ue(){let _=Q().queue;return Array.isArray(_)?_.length:0}async function Ve(_,v,m){if(!n)return;let d=()=>({bead_id:_,...v==="parallel"?{}:{lane:v},...m===void 0?{}:{index:m},expected_revision:Oe()}),p=await n("worker-queue-place",d());ke(p),p&&p.conflict&&await n("worker-queue-place",d()).then(ke)}async function Qe(_,v,m){if(!n)return;let d=()=>({bead_id:_,...v==="parallel"?{}:{lane:v},to_index:m,expected_revision:Oe()}),p=await n("worker-queue-reorder",d());ke(p),p&&p.conflict&&await n("worker-queue-reorder",d()).then(ke)}async function Ze(_){if(!n)return;let v=await n("worker-queue-remove",{bead_id:_,expected_revision:Oe()});ke(v),v&&v.conflict&&await n("worker-queue-remove",{bead_id:_,expected_revision:Oe()}).then(ke)}async function dt(_){if(!n||!_)return;let v=await n("worker-attempt-pause",{attempt_id:_});v&&v.paused===!1&&v.reason&&ae(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Tt(_){if(!n||!_)return;let v=await Pr();if(v===null)return;let m=async(p={})=>await n("worker-attempt-resume",{attempt_id:_,expected_revision:Oe(),...v!==""?{instructions:v}:{},...p}),d=await m();ke(d),d&&d.conflict&&(d=await m(),ke(d)),d=await Pn(d,(p,b)=>m({continuation:p,decision_token:b}),{onResult:ke,refresh:()=>m()}),d&&d.resumed===!1&&!d.conflict&&d.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${d.reason}`,"error",2400)}async function bt(_){if(!n||!_)return;let v=await n("worker-attempt-dismiss",{attempt_id:_,expected_revision:Oe()});ke(v),v&&v.conflict&&(v=await n("worker-attempt-dismiss",{attempt_id:_,expected_revision:Oe()}),ke(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&ae(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function pt(_,v,m=!0){if(!n)return null;let d=n,p=await d(_,{...v,expected_revision:Oe()});return ke(p),p&&p.conflict&&m&&(p=await d(_,{...v,expected_revision:Oe()}),ke(p)),p}async function Rt(_){if(!n||!_)return;let v=Q().merge_queue?.find(d=>d.bead_id===_)?.continuation_action;if(v?.mismatch&&v.continuation===null){await We(_,v.mismatch);return}_e.add(_),qe();let m;try{m=await pt("worker-merge-queue-add",{bead_id:_})}catch{ae("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{_e.delete(_),qe()}if(!(!m||m.applied)){if(m.conflict){ae("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ae(fy(m.reason),"error",2400)}}async function at(_){if(!(!n||!_||fe.has(_))){fe.add(_),qe();try{let v=await n("worker-cleanup-retry",{bead_id:_,expected_revision:Oe()});ke(v),v&&!v.retried&&!v.conflict&&v.reason&&ae(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{fe.delete(_),qe()}}}async function We(_,v){let m=await Pn({continuation_mismatch:v},(p,b)=>pt("worker-merge-queue-add",{bead_id:_,continuation:p,decision_token:b},!1)),d=m?.queue?.merge_queue?.find(p=>p.bead_id===_)?.continuation_action;if(m?.applied!==!0&&d?.continuation===null&&d.mismatch){await We(_,d.mismatch);return}m&&m.applied===!1&&!m.conflict&&ae("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Te(_){if(!n)return;let v=await pt("worker-merge-auto-toggle",{on:_});!v||v.conflict||ae(_?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",_?"success":"info",2400)}async function P(_){if(!n||!_)return;let v=await pt("worker-merge-queue-remove",{bead_id:_});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&ae("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Z(){await pt("worker-merge-queue-remove",{all:!0})}async function ie(_,v=null,m="unmerged",d=null){if(!n||!_)return;let p=xs(_,m);if(!(!!d||typeof globalThis.confirm!="function"||globalThis.confirm(p)))return;let w=await n("worker-discard",{bead_id:_,...v?{attempt_id:v}:{},...d?{operation_id:d}:{},expected_revision:Oe()});if(ke(w),w&&w.conflict&&(w=await n("worker-discard",{bead_id:_,...v?{attempt_id:v}:{},...d?{operation_id:d}:{},expected_revision:Oe()}),ke(w)),w&&w.discarded===!0){ae(Go(w),"success",5e3);return}if(w&&w.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${w.reason}`,"error",2800);return}if(w&&w.accepted&&w.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(w&&w.accepted&&!w.discarded){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${w.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}w&&!w.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function x(_,v,m){if(!(!n||!v||!m||he.has(v))){he.add(v),qe();try{let d=await n(_,{bead_id:v,action_id:m,expected_revision:Oe()});ke(d),d?.conflict?ae("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!d?.ok&&d?.reason&&ae(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(d.reason)}`,"error",2800)}finally{he.delete(v),qe()}}}async function G(_,v){if(!n||!v||ee.has(v))return;ee.add(v),qe();let m;try{let d=async(p={})=>await n(_,{bead_id:v,expected_revision:Oe(),...p});m=await d(),ke(m),m&&m.conflict&&(m=await n(_,{bead_id:v,expected_revision:Oe()}),ke(m)),_==="worker-revise-fix"&&(m=await Pn(m,(p,b)=>d({continuation:p,decision_token:b}),{onResult:ke,refresh:()=>d()}))}finally{ee.delete(v),qe()}if(!(!m||m.conflict)){if(m.ok){ae(_==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ae(`\uCC98\uBD84 \uAC70\uBD80: ${m.reason||""}`,"error",3e3)}}async function Ae(_){if(!n)return;let v=await n("worker-automation-toggle",{on:_,expected_revision:Oe()});ke(v),v&&v.conflict&&await n("worker-automation-toggle",{on:_,expected_revision:Oe()}).then(ke)}async function A(_){if(!n||!_)return;let v=await n("worker-repo-operation-repair",{operation_id:_});if(ke(v),v&&v.ok===!1){ae(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&ae("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function O(_){if(!n||!_)return;let v=await n("worker-repo-operation-dismiss",{operation_id:_});ke(v),v&&v.ok===!1&&ae(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function k(_){if(!n||!Number.isFinite(_))return;let v=Math.max(da,Math.floor(_)),m=await n("worker-queue-set-slots",{slots:v,expected_revision:Oe()});ke(m),m&&m.conflict&&await n("worker-queue-set-slots",{slots:v,expected_revision:Oe()}).then(ke)}async function I(_){if(!n||!Number.isInteger(_)||_<1||_>Up)return;let v=Q(),m=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(_).reduce((b,w)=>b+(Array.isArray(w?.entries)?w.entries.length:0),0),d=()=>({count:_,expected_revision:Oe()}),p=await n("worker-queue-set-serial-lane-count",d());ke(p),p&&p.conflict&&(p=await n("worker-queue-set-serial-lane-count",d()),ke(p)),p&&p.applied&&m>0&&ae(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${m}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let z="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function pe(_,v){let m=Qi(_,v.id,M);return{id:v.id,title:v.title,location_label:v.location_label,prefixes:v.prefixes,action:m.kind==="note"?{kind:"note",text:m.text}:m.kind==="disabled"?{kind:"disabled",label:z,title:m.title}:{kind:"place",label:z,title:m.title}}}function ce(_,v){if(!U||U.bead_id!==_)return null;let m=U.counterpart_id,d=v.filter(p=>p.id===m);return d.length===0?null:{rows:d.map(p=>pe(_,p))}}async function ve(_,v){let m=Qi(_,v,M);if(U=null,m.kind!=="ops"){qe();return}let d=Oe();for(let p of m.ops){let b=await et(p,d);if(b===null)break;d=b}qe()}async function et(_,v){if(!n)return null;try{let m=await n("worker-queue-place",{bead_id:_.bead_id,lane:_.lane,index:_.index,expected_revision:v});if(ke(m),m&&m.conflict)return ae("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!m||m.applied!==!0)return ae(m&&typeof m.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${m.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let d=m.queue?m.queue.revision:void 0;return typeof d!="number"?(ae("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):d}catch(m){return ae(m instanceof Error&&m.message?m.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function Ke(){let _=Q(),v=$?$.selectBoardColumn(Hh,"ready"):[],m=$?$.selectBoardColumn(Gh,"blocked"):[],d=$?$.selectBoardColumn(Yh,"closed"):[],p=$?$.selectBoardColumn(Vh,"in_progress"):[],b=$?$.selectBoardColumn(Kh,"resolved"):[],w=to([...v,...m,...p,...b,...d]),q=new Map;for(let g of[...v,...m,...p])g&&g.id&&!q.has(g.id)&&q.set(g.id,g);let H={...X(u?.()||"")};for(let g of["orchestration_model","orchestration_effort","orchestration_speed"]){let j=_[g];typeof j=="string"&&(H[g]=j)}function K(g,j){let oe=q.get(g);if(!oe)return null;let je=oe.metadata&&typeof oe.metadata=="object"?oe.metadata:{},Xe=oe.workflow?.route,kt=je.route,St=zp(Xe)?Xe:zp(kt)?kt:null;return nn({pin:je,global:H,execution_defaults:_.execution_defaults??null,runner_catalog:_.runner_catalog??null,route:St,controller_runtime:j})}function ge(g){let j=g.runner||null,oe=K(g.bead_id,j),je=As(g),Xe=oe?er(oe,j):null;return je||Xe?{orchestration:je,worker:Xe}:null}let Re=new Map;function Vt(g){if(Re.has(g))return Re.get(g)??null;let j=K(g,null),oe=null;if(j){let je=xn(_.runner_catalog??null,j.orchestration_model.value??""),Xe=je===null?j:K(g,je),kt=br(Xe,_.runner_catalog??null),St=er(Xe,je);oe=kt||St?{orchestration:kt,worker:St}:null}return Re.set(g,oe),oe}function on(g){let j=no(w,g);return j.total===0?null:j}let zr=_.bead_titles||{},qt=new Map;for(let[g,j]of Object.entries(zr))typeof j=="string"&&j.length>0&&qt.set(g,j);for(let g of[...v,...m])qt.set(g.id,g.title||g.id);let Un=new Map;for(let g of[...v,...m,...p,...b,...d])g&&g.id&&typeof g.from_id=="string"&&Un.set(g.id,g.from_id);let Tn=new Map;for(let g of[...v,...m,...p,...b,...d])g&&g.id&&typeof g.priority=="number"&&Tn.set(g.id,g.priority);let Is=_.bead_times&&typeof _.bead_times=="object"&&!Array.isArray(_.bead_times)?_.bead_times:{},rr=_.bead_labels&&typeof _.bead_labels=="object"&&!Array.isArray(_.bead_labels)?_.bead_labels:{},Wn=_.bead_workflow&&typeof _.bead_workflow=="object"&&!Array.isArray(_.bead_workflow)?_.bead_workflow:{},zn=new Map;for(let[g,j]of Object.entries(rr))Array.isArray(j)&&zn.set(g,Yi(j));for(let g of[...v,...m]){let j=g.labels;Array.isArray(j)&&!zn.has(g.id)&&zn.set(g.id,Yi(j))}let vr=new Map,Hr=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(Hr)?Hr:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let j=g.members.map(je=>{let Xe=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).find(kt=>kt.entries.some(St=>St.bead_id===je));return Xe?Xe.id:null});if(!(j.every(je=>je!==null)&&new Set(j).size===1))for(let je of g.members)vr.set(je,g.members.filter(Xe=>Xe!==je))}let Ps=_.bead_blocked_by&&typeof _.bead_blocked_by=="object"&&!Array.isArray(_.bead_blocked_by)?_.bead_blocked_by:{},wr=new Map;for(let[g,j]of Object.entries(Is))j&&typeof j=="object"&&wr.set(g,j);for(let g of[...v,...m])wr.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let sr=g=>wr.get(g)||{},Hn=_.pr_wait||[],Gr=_.pr_observations||{},Ne=_.pr_activity||{},ot=_.cleanup_failed||{},an=Object.entries(ot).map(([g,j])=>({bead_id:g,step:j&&j.step?j.step:"",reason:j&&j.reason?j.reason:"",at:j&&typeof j.at=="number"?j.at:null,detail:j&&typeof j.detail=="string"?j.detail:null,output_tail:j&&typeof j.output_tail=="string"&&j.output_tail?j.output_tail:void 0,log_path:j&&typeof j.log_path=="string"&&j.log_path?j.log_path:void 0,retry_count:j&&typeof j.retry_count=="number"&&Number.isInteger(j.retry_count)&&j.retry_count>0?j.retry_count:0,failure_code:j&&typeof j.failure_code=="string"?j.failure_code:void 0,subject_id:j&&typeof j.subject_id=="string"?j.subject_id:void 0,repair_eligible:!!(j&&j.repair_eligible),repair:j&&j.repair?j.repair:void 0})),fa=_.queue||[],df=new Set([...fa.map(g=>g.bead_id),...(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(j=>j.bead_id)),...Hn.map(g=>g.bead_id),..._.done.map(g=>g.bead_id)]),pf=new Set(m.map(g=>g.id)),ff=i?i.get()?.order||{}:{},ol=new Set,al=[];for(let g of[...v,...m])df.has(g.id)||ol.has(g.id)||uy(g)||(ol.add(g.id),al.push(g));B=cy(al,D,ff);let _f=_.admission||{},il=g=>{let j=_f[g];if(!j)return"";if(j.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let oe=typeof j.reason=="string"?j.reason:"",je=oe.indexOf(":");return je>0&&je<oe.length-1?`\u26D4 ${oe.slice(0,je)} (${oe.slice(je+1)})`:`\u26D4 ${oe}`},mf=B.map(g=>{let j=Eo(g),oe=j.path.length>0,je=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",Xe=!Object.hasOwn(g,"description")||typeof g.description=="string"&&g.description.trim().length>0,kt=Object.hasOwn(g,"labels")&&Ep(g.labels),St=!kt&&(je?Xe:oe&&!j.conflict),_t=pf.has(g.id),en=[];_t&&en.push(dy(g)),je&&!Xe?en.push("missing_description"):!je&&j.conflict?en.push("spec_id_conflict"):!je&&!oe&&en.push("spec \uC5C6\uC74C");let Us=il(g.id);return Us&&en.push(Us),{id:g.id,title:g.title||g.id,reason:en.join(" \xB7 "),draggable:St,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:je,status:g.status,worker_ineligible:kt,blocked:_t,has_spec:oe,exec_chips:Vt(g.id),from_id:g.from_id||void 0,priority:Tn.get(g.id)}}),_a=Jh(mf,Y),ma=_a.visible,gf=_.revise_parked||{},Ds=_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},ga=(g,j)=>g.map((oe,je)=>{let Xe=j!=="done",kt=j!=="done"&&j!=="queue",St=Xe?gf[oe.bead_id]:null,_t=Xe?An(Ds,oe.bead_id):null,en=_t?.operation?_t:null,Us=Xe&&zn.get(oe.bead_id)===!0,Nl=Ps[oe.bead_id]||[],Aa=_.admission&&typeof _.admission=="object"?_.admission[oe.bead_id]:null,Sa=Xe?ud(Aa,!!en||he.has(oe.bead_id)):null,Sf=Xe&&!Sa?il(oe.bead_id):null,Ef=Xe?[Sf]:[],ql=Xe&&Nl.length>0&&typeof Aa?.reason=="string"&&Aa.reason.startsWith("not_ready")?[`\u23F8 ${Nl.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Ea=Xe?vr.get(oe.bead_id):void 0;return Ea&&Ea.length>0&&ql.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Ea.join(", ")}\uC640`),{id:oe.bead_id,title:qt.get(oe.bead_id)||oe.bead_id,reason:Ef.filter(Boolean).join(" \xB7 "),draggable:Xe&&!en&&!Sa,done:j==="done",lane:j,seq:kt?je+1:void 0,worker_serial:Us,discard:en,stale_work:Sa,badges:[...ql,...St?["\u23F8 REVISE \uD30C\uD0B9"]:[],...j==="done"?Wo(_.attempts||{},oe.bead_id):[]],alert:!!St,revise_action:!!St,revise_enabled:!!St&&!en&&!ee.has(oe.bead_id),revise_title:St?St.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${St.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:j==="done"?gn(_.attempts||{},oe.bead_id):null,work_ms:j==="done"?zo(_.attempts||{},oe.bead_id):null,done_at:j==="done"&&typeof oe.added_at=="number"?oe.added_at:void 0,exec_chips:Xe?Vt(oe.bead_id):null,workflow:Xe&&Wn[oe.bead_id]||null,from_id:Un.get(oe.bead_id)||void 0,priority:Tn.get(oe.bead_id),...sr(oe.bead_id)}}),kr=_.attempts?Object.values(_.attempts).filter(Wr):[],ba=new Set;for(let g of kr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&ba.add(g.resumed_from);let ll=new Map;for(let g of kr)ll.set(g.bead_id,g.attempt_id);let Vr=new Map;for(let g of kr)Vr.set(g.attempt_id,g);function ha(g){let j=new Set,oe=g;for(;oe&&!j.has(oe.attempt_id);){if(oe.conflict_resolution===!0)return!0;j.add(oe.attempt_id),oe=typeof oe.resumed_from=="string"&&oe.resumed_from.length>0&&Vr.get(oe.resumed_from)||null}return!1}let Ms=typeof _.declared_base=="string"?_.declared_base:null;function bf(g){let j=null;for(let oe of kr)!oe||oe.bead_id!==g||ha(oe)||(j===null||(typeof oe.started_at=="number"?oe.started_at:0)>=(typeof j.started_at=="number"?j.started_at:0))&&(j=oe);return j&&typeof j.target_base=="string"?j.target_base:null}let ya=[],Ns=[],hf=Sp(_),cl=g=>{let j=typeof g.session_id=="string"&&g.session_id.length>0,oe=ba.has(g.attempt_id);return{eligible:j&&!oe,reason:j?oe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},yn=null;for(let g of kr){let j=g.status==="paused"&&!ba.has(g.attempt_id);if(g.status==="running"||j)Ns.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:qt.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:j,conflict_resolution:ha(g),base_exception:el(Ms,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:An(Ds,g.bead_id,{attempt_id:g.attempt_id}),workflow:Wn[g.bead_id]||null,priority:Tn.get(g.bead_id),usage:gn(_.attempts||{},g.bead_id),rollup:on(g.bead_id),rollup_expanded:$e.has(g.bead_id),exec_chips:ge(g),...sr(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&hf(g)){let oe=cl(g);ya.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:qt.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:An(Ds,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:oe.eligible,resume_reason:oe.reason,conflict_resolution:ha(g),base_exception:el(Ms,g.target_base),workflow:Wn[g.bead_id]||null,priority:Tn.get(g.bead_id),usage:gn(_.attempts||{},g.bead_id),rollup:on(g.bead_id),rollup_expanded:$e.has(g.bead_id),exec_chips:ge(g),...sr(g.bead_id)}),yn=g}}let ul=new Set([...ya,...Ns].map(g=>g.bead_id));for(let g of Array.isArray(_.session_active)?_.session_active:[]){let j=g&&g.bead_id;typeof j!="string"||j.length===0||ul.has(j)||(ul.add(j),Ns.push({bead_id:j,attempt_id:null,kind:"session",title:g.title||qt.get(j)||j,status:"in_progress",started_at:Cn(g.started_at)??Cn(g.updated_at),updated_at:Cn(g.updated_at),workflow:g.workflow||null,priority:Tn.get(j),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let $r=[...ya,...Ns].map(g=>{let j=Vr.get(g.attempt_id),oe=j?.quickfix_landing;if(j?.quickfix_lane!==!0||!oe||typeof oe!="object")return g;let je=typeof oe.reason=="string"&&oe.reason.length>0?oe.reason:null,Xe=Cs({bead_id:j.bead_id,merge_sha:oe.head_sha,cleanup_cursor:oe.cursor,cleanup_failed:je?{step:oe.cursor,reason:je}:null,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]});return Xe?{...g,landing:Xe}:g}),dl=null;if(yn){let g=cl(yn),j=yn.cause_detail;dl={bead_id:yn.bead_id,repo:yn.repo||"",reason:yn.cause||yn.status,cause_detail:j&&typeof j.reason=="string"?{reason:j.reason,command:typeof j.command=="string"?j.command:null}:null,resume_attempt_id:yn.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:An(Ds,yn.bead_id,{attempt_id:yn.attempt_id})}}let pl=new Set($r.map(g=>g.bead_id)),va=Array.isArray(_.merge_queue)?_.merge_queue:[],fl=new Map,_l=new Map,ml=new Map,gl=new Map,bl=new Map;va.forEach((g,j)=>{g&&typeof g.bead_id=="string"&&(fl.set(g.bead_id,j+1),_l.set(g.bead_id,g.resolution),ml.set(g.bead_id,g.continuation_action||null),gl.set(g.bead_id,g.head_review||null),bl.set(g.bead_id,g.authority||null))});let xr=_.merge_queue_state||{active:null,failures:{}},yf=xr.failures||{},hl=xr.waiting&&typeof xr.waiting.bead_id=="string"&&typeof xr.waiting.reason=="string"?xr.waiting:null,vf=_.auto_merge_skips||{},yl=g=>{let j=vf[g];if(!j)return null;let oe=Gr[g],je=oe&&oe.pr?oe.pr.head_sha:null;return je&&je===j.head_sha?j.reason||"":null},qs=new Map;for(let g of $r)g.failed!==!0&&g.conflict_resolution&&(g.paused?qs.has(g.bead_id)||qs.set(g.bead_id,"paused"):qs.set(g.bead_id,"running"));let vl=$r.filter(g=>g.kind!=="session"&&!g.paused&&g.failed!==!0).length,wl=(_.workspace_info||{}).slots,kl=typeof wl=="number"?wl:typeof _.slots=="number"?_.slots:da,wf=vl>kl,Fs=ur(W),kf=(Array.isArray(_.done)?_.done.slice():[]).filter(g=>Fs===void 0||typeof g.added_at!="number"||g.added_at>=Fs).sort((g,j)=>(j.added_at||0)-(g.added_at||0)),Kr=ga(kf,"done"),$f=new Set((Array.isArray(_.done)?_.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),$l=[],xf=u?.()||"";for(let g of d){let j=Cn(g.closed_at);if(typeof g.id!="string"||$f.has(g.id)||j===null||Fs!==void 0&&j<Fs||typeof g.comment_count!="number"||g.comment_count<=0)continue;let oe=`${xf}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,je=E.get(oe);je===void 0&&n&&(E.set(oe,"pending"),Promise.resolve(n("get-comments",{id:g.id})).then(Xe=>{let kt=Array.isArray(Xe)&&Xe.some(St=>To(typeof St?.text=="string"?St.text:"")?.lane==="session");E.set(oe,kt?"session":"not-session"),qe()}).catch(()=>{E.set(oe,"failed"),qe()})),je==="session"&&$l.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:j,created_at:g.created_at,updated_at:g.updated_at})}Kr.push(...$l),Kr.sort((g,j)=>(j.done_at||0)-(g.done_at||0));let js={};for(let g of Dn)js[g]=0;let xl=!1,Al=0,wa=0,Sl=0;for(let g of Kr){let j=g.usage;if(j&&typeof j=="object"){let oe=!1;for(let je of Dn)Number.isFinite(j[je])&&(js[je]+=j[je],xl=!0,oe=!0);oe&&(wa+=1,Number.isFinite(j.total_cost_usd)&&(Al+=j.total_cost_usd,Sl+=1))}}wa>0&&Sl===wa&&(js.total_cost_usd=Al);let El=Kr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Af=El.length>0?Bt(fo(El)):xl?Mn(js):null,Tl=_.lane_states&&typeof _.lane_states=="object"&&!Array.isArray(_.lane_states)?_.lane_states:{},Cl=Array.isArray(_.serial_lanes)?_.serial_lanes:[],Rl=g=>{if(Hn.some(je=>je.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let j=kr.filter(je=>je&&je.bead_id===g),oe=j.length>0?j[j.length-1].status:null;return oe==="failed"||oe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":oe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Bs=Cl.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,j)=>{let oe=Tl[g.id]||{},je=new Map((Array.isArray(oe.corrections)?oe.corrections:[]).filter(_t=>_t&&typeof _t.bead_id=="string"&&typeof _t.after=="string").map(_t=>[_t.bead_id,_t.after])),Xe=ga(g.entries.filter(_t=>!pl.has(_t.bead_id)),g.id).map(_t=>je.has(_t.id)?{..._t,badges:[`\u{1F517} ${je.get(_t.id)} \uB4A4 (blocks \uC790\uB3D9)`,..._t.badges]}:_t),kt=Array.isArray(oe.occupied_by)?oe.occupied_by.filter(_t=>typeof _t=="string"):[],St=kt.map(_t=>({id:_t,title:qt.get(_t)||_t,draggable:!1,lane:g.id,ghost:!0,badges:[Rl(_t)]}));return{id:g.id,index:j+1,rows:[...St,...Xe],occupied:kt.length>0,badge:kt.length>0?Rl(kt[0]):"\uB300\uAE30",cycle:oe.cycle===!0}}),Ol=typeof _.serial_lane_count=="number"?_.serial_lane_count:Bs.length,ka=ga(fa.filter(g=>!pl.has(g.bead_id)),"queue"),Ll=new Map,Il=new Set;for(let[g,j]of Object.entries(Tl)){if(!/^s[1-5]$/.test(g))continue;let oe=j&&Array.isArray(j.occupied_by)?j.occupied_by:[];for(let je of oe)typeof je=="string"&&Ll.set(je,g);oe.length>0&&Il.add(g)}let Ar=[];for(let g of $r)typeof g.bead_id=="string"&&Ar.push({id:g.bead_id,title:qt.get(g.bead_id)||g.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ll.get(g.bead_id)??null});for(let g of Bs)for(let j of g.rows)j.ghost!==!0&&Ar.push({id:j.id,title:j.title,location_label:`${g.id} #${j.seq??""}`.trim(),kind:"serial",lane_id:g.id});ka.forEach((g,j)=>{Ar.push({id:g.id,title:g.title,location_label:`#${j+1}`,kind:"parallel",lane_id:null})});for(let g of ma)Ar.push({id:g.id,title:g.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let Pl={};for(let g of Cl)g&&typeof g.id=="string"&&Array.isArray(g.entries)&&(Pl[g.id]=g.entries.length);let $a=new Map;for(let g of Ar)$a.has(g.id)||$a.set(g.id,g);M={members_by_id:$a,serial_raw_lengths:Pl,serial_lane_count:Ol,occupied_lanes:Il};let Dl=Cp(_.bead_scope,Ar),xa=(g,j)=>{let oe=Dl.get(g.id);if(!oe||oe.overlaps.length===0&&!oe.scope_missing)return g;let je=ce(g.id,oe.overlaps);return g.dependency_chips={...g.dependency_chips||{},...oe.overlaps.length>0?{overlaps:oe.overlaps}:{},...oe.scope_missing&&j!=="running"?{scope_missing:!0}:{},...je?{popover:je}:{}},g};for(let g of ka)xa(g,"queue");for(let g of Bs)for(let j of g.rows)j.ghost!==!0&&xa(j,g.id);for(let g of ma)xa(g,"candidate");let Ml=new Map;for(let g of $r){let j=typeof g.bead_id=="string"?g.bead_id:"";if(j.length===0)continue;let oe=g.kind==="session",je=Dl.get(j),Xe=je&&je.overlaps.length>0?je.overlaps:null,kt=typeof g.attempt_id=="string"&&g.attempt_id.length>0?Vr.get(g.attempt_id):void 0,St=kt&&kt.last_activity&&typeof kt.last_activity=="object"?kt.last_activity:null,_t=kt&&Array.isArray(kt.legs)?kt.legs:[];if(!Xe&&!St&&_t.length===0&&!oe)continue;let en=Xe?ce(j,Xe):null;Ml.set(j,{...St?{last_activity:St}:{},..._t.length>0?{legs:_t}:{},...Xe?{dependency_chips:{overlaps:Xe,...en?{popover:en}:{}}}:{}})}return{queue:_,idToTitle:qt,candidates:ma,candidate_hidden:{blocked:_a.hidden_blocked,spec:_a.hidden_spec},running:$r,live_count:vl,slots:kl,over_cap:wf,failure:dl,waiting:ka,serial_lanes:Bs,serial_lane_count:Ol,running_overlays:Ml,pr_wait:Hn.map(g=>$y(g.bead_id,qt.get(g.bead_id)||g.bead_id,Gr,ot[g.bead_id]||null,gn(_.attempts||{},g.bead_id),Ne[g.bead_id]||(_e.has(g.bead_id)||fe.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),qs.get(g.bead_id)||null,g.external===!0,{position:fl.get(g.bead_id)||0,active:xr.active===g.bead_id,failure:yf[g.bead_id]||null,waiting:hl?.bead_id===g.bead_id?hl.reason:null,resolution:_l.get(g.bead_id),continuation_action:ml.get(g.bead_id),head_review:gl.get(g.bead_id)||null,authority:bl.get(g.bead_id)||null},g.wt_present!==!1,_.auto_merge===!0?yl(g.bead_id):null,el(Ms,bf(g.bead_id)),_.completion_status&&typeof _.completion_status=="object"&&!Array.isArray(_.completion_status)&&_.completion_status[g.bead_id]||null,_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},Vr.get(ll.get(g.bead_id)||"")?.worker_serial===!0,_.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]})).map(g=>({...g,workflow:Wn[g.id]||null,priority:Tn.get(g.id),...sr(g.id)})),merge_queue_length:va.length,merge_queue_running:va.length>0,auto_excluded:Hn.map(g=>g.bead_id).filter(g=>yl(g)!==null),declared_base:Ms,done:Kr,token_total:Af,cleanup_failures:an,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]}}function Ce(){let v=!!o?.get()?.job,m=!v&&o?.isPending?.()===!0,d=v?"\uBD84\uC11D \uC911":m?"\uC900\uBE44 \uC911":"";return l`<button
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
          ${Array.from({length:Up},(ge,Re)=>Re+1).map(ge=>l`<option
                value=${String(ge)}
                ?selected=${_.serial_lane_count===ge}
              >
                ${ge}
              </option>`)}
        </select>
      </label>
      ${o?Ce():""} `,H=bd({failure:_.failure}),K=cd(_.repo_operations,_.cleanup_failures);return J?l`<div class="worker-ribbon">
          ${m} ${d}
          <div class="worker-kpi worker-kpi--ribbon">${p}${b}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${q}</div>
          <div class="worker-kpi">${w}</div>
        </div>
        ${K}${mt.template()}${H}`:l`<div class="worker-ctrl">
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
      ${K}${mt.template()}${H}`}function it(_){if(_.running.length===0&&_.pr_wait.length===0)return"";let v=_.running.some(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0);return l`<section
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
      ${_.running.length>0?Ii(_.running,Date.now(),we,_.running_overlays):""}
      ${_.pr_wait.map(m=>Xn(m))}
    </section>`}function It(_){let v=_.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${Y.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ey.map(m=>l`<button
              type="button"
              class="worker-filter__chip${Y.spec===m.value?" is-active":""}"
              data-spec=${m.value}
              aria-pressed=${Y.spec===m.value?"true":"false"}
            >
              ${m.label}
            </button>`)}
        ${v.spec>0?l`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function Dt(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${D}
    >
      ${ty.map(_=>l`<option value=${_.value} ?selected=${D===_.value}>
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
    </div>`}function Mt(_){let v=l`<span
      class="worker-lane__badge${_.occupied?" worker-lane__badge--held":""}"
      >${_.badge}</span
    >`,m=_.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return hn({id:`worker-pane-lane-${_.id}`,lane:_.id,title:`\uC9C1\uB82C ${_.index}`,items:_.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:v,controls:m})}function zt(_){let v=_.queue.auto_merge===!0;if(_.merge_queue_running)return l`<button
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
    </button>`}function yt(_){let v=hn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:_.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Dt(),controls:It(_),place_menu:Ye(_.candidates),onOpenDoc:f?(m,d)=>f(d):void 0});return J?l`<div class="worker-lanes worker-lanes--mobile">
        ${it(_)}
        ${hn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:re.queue,preview:Hp(_.waiting)})}
        ${_.serial_lanes.map(m=>Mt(m))}
        ${v}
        ${hn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:_.done,empty:`${N()} \uC644\uB8CC \uC5C6\uC74C`,controls:Wt(),collapsible:!0,collapsed:re.done,preview:Array.isArray(_.token_total)?_.token_total.map(m=>m.label).join(" \xB7 "):_.token_total||Hp(_.done)})}
      </div>`:l`<div class="worker-lanes">
      ${v}
      <div class="worker-wait">
        ${hn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${_.serial_lanes.map(m=>Mt(m))}
      </div>
      ${hn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${_.slots}`,items:_.running,live:_.running.some(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0),body:Ii(_.running,Date.now(),we,_.running_overlays)})}
      ${hn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:_.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${hn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${N()} ${_.done.length}`,items:_.done,empty:`${N()} \uC644\uB8CC \uC5C6\uC74C`,controls:Wt()})}
    </div>`}function Nt(_){re={...re,[_]:!re[_]},ly(re),qe()}function qe(){let _=Ke();Ge(lt(_),ue),Ge(yt(_),se)}function Ht(){if(typeof window.matchMedia!="function")return;let _=window.matchMedia(ay);J=!!_.matches;let v=m=>{let d=!!(m&&typeof m.matches=="boolean"?m.matches:_.matches);d!==J&&(J=d,qe())};typeof _.addEventListener=="function"?(_.addEventListener("change",v),V.push(()=>_.removeEventListener("change",v))):typeof _.addListener=="function"&&(_.addListener(v),V.push(()=>_.removeListener(v)))}let Qt=null;function Je(_){Qt=_.target instanceof Element?_.target:null}function Ee(_){let m=_.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!m)return;if(Qt&&m.contains(Qt)&&Qt.closest("input, button, a")){_.preventDefault();return}let d=m.dataset.beadId||"",p=m.dataset.lane||"";F={bead_id:d,from_lane:p};try{_.dataTransfer?.setData("text/plain",d),_.dataTransfer&&(_.dataTransfer.effectAllowed="move")}catch{}}function R(_){let v=_.target?.closest?.(".worker-pane");if(!v)return;let m=v.dataset.lane||"";m!=="candidate"&&m!=="queue"&&!/^s[1-5]$/.test(m)||(_.preventDefault(),_.dataTransfer&&(_.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function de(_){_.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ie(_,v){let m=B.find(w=>w.id===_);if(!m)return;let d=B.filter(w=>w.id!==_),p=d.length;if(v){let w=v.dataset.beadId;if(w===_)return;let q=d.findIndex(H=>H.id===w);q>=0&&(p=q)}let b=d.slice();b.splice(p,0,m),S.applyReorder(_,b,p)}function rt(_){let v=_.target?.closest?.(".worker-pane");if(!v)return;_.preventDefault(),v.classList.remove("worker-pane--drag-over");let m=v.dataset.lane||"",d=F?.bead_id||_.dataTransfer?.getData("text/plain")||"",p=F?.from_lane||"";if(F=null,!d)return;let b=_.target?.closest?.(".worker-mini, .worker-card"),w=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),q=w.length;if(b){let H=w.indexOf(b);H>=0&&(q=H)}if(q=Math.max(0,q-v.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(q=Ue()),m==="candidate"){if(p==="candidate"){Ie(d,b);return}(p==="queue"||/^s[1-5]$/.test(p))&&Ze(d);return}if(m==="queue"||/^s[1-5]$/.test(m)){let H=m==="queue"?"parallel":m;p===m?Qe(d,H,q):Ve(d,H)}}function vt(_){Y=_,Qh(_),qe()}function ft(_){D=_==="board"||_==="created"||_==="spec"?_:pa,ry(D),qe()}function Ct(_){W=mn(_)?_:ln,oy(W),y?.(W),qe()}function Lt(_){let v=_.target?.closest?.(".worker-serial-lane-count");if(v){let q=Number.parseInt(v.value,10);Number.isFinite(q)&&I(q).then(qe);return}let m=_.target?.closest?.(".worker-filter__blocked");if(m){vt({...Y,show_blocked:m.checked});return}let d=_.target?.closest?.(".worker-done-range");if(d){Ct(d.value);return}let p=_.target?.closest?.(".worker-sort");if(p){ft(p.value||pa);return}let b=_.target?.closest?.(".worker-slots__input");if(!b)return;let w=Number.parseInt(b.value,10);if(!Number.isFinite(w)){qe();return}k(w).then(qe)}function Gt(_){return _?{runner:_.runner||void 0,model:_.model||void 0,effort:_.effort||void 0,worktree:_.worktree||void 0,status:_.status||void 0,session_id:_.session_id||void 0}:{}}function Jt(){let _=Ke();return{operations:_.repo_operations,cleanup_failures:_.cleanup_failures,repo:u&&u()||""}}function wt(){we&&De.close(),C.hidden=!1,ze.hidden=!1,Be.open(Jt()),qe()}function sn(_){let v=Q(),m=v.attempts?v.attempts[_]:null;we=_,Me=null,Be.close(),C.hidden=!0,ze.hidden=!1,De.open({attempt_id:_,meta:Gt(m)}),qe()}function fn(_,v){we=null,Me=_,Be.close(),C.hidden=!0,ze.hidden=!1,De.open({attempt_id:_,meta:v,hide_prompt:!0}),qe()}function En(){if(Be.isOpen()&&Be.refresh(Jt()),Me){let m=(o?.get()?.runs||[]).find(d=>d.run_id===Me);m?De.updateMeta(Xi(m)):De.close();return}if(!we)return;let _=Q(),v=_.attempts?_.attempts[we]:null;if(v){De.updateMeta(Gt(v));return}De.close()}function T(_){let v=_.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-parallel-analysis-dialog"))return;let m=v?.closest?.(".mon-overlap__chip");if(m){let Ne=m.closest("[data-bead-id]"),ot=Ne&&Ne.getAttribute("data-bead-id")||"";if(ot){let an=m.getAttribute("data-overlap-id")||"";U=!!U&&U.bead_id===ot&&U.counterpart_id===an?null:{bead_id:ot,counterpart_id:an},qe()}return}let d=v?.closest?.(".mon-overlap__place");if(d){let Ne=d.closest("[data-bead-id]"),ot=Ne&&Ne.getAttribute("data-bead-id")||"";ot&&ve(ot,d.getAttribute("data-counterpart-id")||"");return}if(v?.closest?.(".mon-overlap__popover"))return;if(v?.closest?.(".worker-analysis-btn")){te?.open();return}if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){wt();return}let p=v?.closest?.(".worker-repo-op__session");if(p){let Ne=p.dataset.attemptId;Ne&&sn(Ne);return}let b=v?.closest?.(".worker-repo-op__resolve");if(b){A(b.dataset.operationId||"");return}let w=v?.closest?.(".worker-repo-op__dismiss");if(w){O(w.dataset.operationId||"");return}let q=v?.closest?.(".worker-cleanup__resume");if(q){let Ne=q.dataset.beadId;Ne&&at(Ne);return}let H=v?.closest?.(".worker-banner__resume");if(H){let Ne=H.dataset.attemptId;Ne&&Tt(Ne);return}let K=v?.closest?.(".worker-banner__discard");if(K){let Ne=K.dataset.confirmation==="merged"?"merged":"unmerged";ie(K.dataset.beadId||"",K.dataset.attemptId||null,Ne,K.dataset.operationId||null);return}let ge=v?.closest?.(".worker-banner__dismiss");if(ge){let Ne=ge.dataset.attemptId;Ne&&bt(Ne);return}if(v?.closest?.(".worker-play")){Ae(!Q().auto_advance);return}let Re=v?.closest?.(".worker-merge-all");if(Re){Re.classList.contains("worker-merge-all--stop")?Q().auto_merge===!0?Te(!1):Z():Te(!0);return}let Vt=v?.closest?.(".worker-pane__hd--toggle");if(Vt){let Ne=Vt.dataset.lane;(Ne==="queue"||Ne==="done")&&Nt(Ne);return}let on=v?.closest?.(".worker-card__place-lane");if(on){let Ne=on.dataset.beadId,ot=on.dataset.lane;Ne&&(ot==="parallel"||/^s[1-5]$/.test(ot||""))&&(le=null,qe(),Ve(Ne,ot));return}if(v?.closest?.(".worker-card__place-cancel")){le=null,qe();return}let qt=v?.closest?.(".worker-card__place");if(qt){let Ne=qt.dataset.beadId;Ne&&!qt.disabled&&(Le()?(le=Ne,qe()):Ve(Ne,"parallel"));return}let Un=v?.closest?.(".worker-filter__chip");if(Un){let Ne=Un.dataset.spec;(Ne==="all"||Ne==="with"||Ne==="without")&&vt({...Y,spec:Ne});return}let Tn=v?.closest?.(".worker-mini__merge");if(Tn){let Ne=Tn.dataset.beadId||"";Q().cleanup_failed?.[Ne]?at(Ne):Rt(Ne);return}let Is=v?.closest?.(".worker-mini__merge-cancel");if(Is){P(Is.dataset.beadId||"");return}let rr=v?.closest?.(".worker-mini__discard");if(rr){ie(rr.dataset.beadId||"",rr.dataset.attemptId||null,rr.dataset.discardMode==="merged"?"merged":"unmerged",rr.dataset.operationId||null);return}let Wn=v?.closest?.(".worker-mini__stale-continue");if(Wn){x("worker-stale-work-continue",Wn.dataset.beadId||"",Wn.dataset.actionId||"");return}let zn=v?.closest?.(".worker-mini__stale-backup");if(zn){x("worker-stale-work-backup-fresh",zn.dataset.beadId||"",zn.dataset.actionId||"");return}let vr=v?.closest?.(".worker-mini__stale-recheck");if(vr){x("worker-stale-work-recheck",vr.dataset.beadId||"",vr.dataset.actionId||"");return}let Hr=v?.closest?.(".worker-mini__revise-fix");if(Hr){G("worker-revise-fix",Hr.dataset.beadId||"");return}let Ps=v?.closest?.(".worker-mini__revise-approve");if(Ps){G("worker-revise-approve",Ps.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let Ne=v?.closest?.(".rtile"),ot=Ne?.dataset?.beadId,an=Ne?.dataset?.attemptId;ot&&ie(ot,an||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let ot=v?.closest?.(".rtile")?.dataset?.attemptId;ot&&bt(ot);return}if(v?.closest?.(".rtile__pause")){let ot=v?.closest?.(".rtile")?.dataset?.attemptId;ot&&dt(ot);return}if(v?.closest?.(".rtile__resume")){let ot=v?.closest?.(".rtile")?.dataset?.attemptId;ot&&Tt(ot);return}if(v?.closest?.(".rtile__session")){let ot=v?.closest?.(".rtile")?.dataset?.attemptId;ot&&sn(ot);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){Be.close(),De.close();return}if(v?.closest?.(".worker-drawer-host"))return;let wr=v?.closest?.(".rtile .board-card__roll-toggle");if(wr){let Ne=wr.dataset.rollParent;Ne&&($e.has(Ne)?$e.delete(Ne):$e.add(Ne),qe());return}let sr=v?.closest?.(".rtile .board-card__roll-child");if(sr){let Ne=sr.dataset.childId;Ne&&c&&c(Ne);return}let Hn=v?.closest?.(".rtile");if(Hn){if(v?.closest?.(".rtile__id")){let ot=Hn.dataset.beadId;ot&&un(ot).then(an=>{an?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ne=Hn.dataset.beadId;Ne&&c&&c(Ne);return}let Gr=v?.closest?.(".worker-mini, .worker-card");if(Gr){let Ne=Gr.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){Ne&&un(Ne).then(an=>{an?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ot=v?.closest?.(".ctl-chip--from");if(ot){let an=ot.dataset.fromId;an&&c&&c(an);return}Ne&&c&&c(Ne)}}e.addEventListener("pointerdown",Je),e.addEventListener("dragstart",Ee),e.addEventListener("dragover",R),e.addEventListener("dragleave",de),e.addEventListener("drop",rt),e.addEventListener("click",T),e.addEventListener("change",Lt);function L(_){if(!U)return;let v=_.target;v&&typeof v.closest=="function"&&v.closest(".mon-overlap__popover, .mon-overlap__chip")||(U=null,qe())}function Pe(_){_.key!=="Escape"||!U||(U=null,qe())}return document.addEventListener("click",L),document.addEventListener("keydown",Pe),V.push(()=>{document.removeEventListener("click",L),document.removeEventListener("keydown",Pe)}),Ht(),$&&V.push($.subscribe(()=>{for(let[_,v]of E)v==="failed"&&E.delete(_);qe()})),s&&V.push(s.subscribe(()=>{let _=u&&u()||"";_!==st&&(st=_,He.close()),qe(),En()})),o&&typeof o.subscribe=="function"&&V.push(o.subscribe(()=>{En(),qe()})),qe(),{load(){ye(),qe()},refreshSessionDefaults:me,destroy(){for(let _ of V.splice(0))try{_()}catch{}e.removeEventListener("pointerdown",Je),e.removeEventListener("dragstart",Ee),e.removeEventListener("dragover",R),e.removeEventListener("dragleave",de),e.removeEventListener("drop",rt),e.removeEventListener("click",T),e.removeEventListener("change",Lt);try{De.destroy()}catch{}ze.hidden=!0;try{te?.destroy()}catch{}try{He.destroy()}catch{}Ge(l``,e)}}}function nl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Qp(e,t,n,r=async()=>{},s=async()=>{}){let o=At("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function f(W){let N=W.target.value,J=t.getState().workspace?.current?.path||"";if(N&&N!==J){o("switching workspace to %s",N),i=!0,D();try{await n(N)}catch(_e){o("workspace switch failed: %o",_e)}finally{i=!1,D()}}}async function h(){let W=t.getState(),E=W.workspace?.current?.path||W.workspace?.available?.[0]?.path||"";if(!(!E||c)){o("git-pulling workspace %s",E),c=!0,D();try{await r(E)}catch(N){o("workspace git pull failed: %o",N)}finally{c=!1,D()}}}function y(W){let E=W.target;E&&e.contains(E)||F()}function $(W){W.key==="Escape"&&F()}function S(){u||(u=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",$),D())}function F(){u&&(u=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",$),D())}function B(){u?F():S()}async function Y(W){let E=W.target,N=E.value,re=E.checked;o("toggling visibility %s \u2192 %s",N,String(re));try{await s(N,re)}catch(J){o("workspace visibility toggle failed: %o",J)}}function le(W){return W?l`
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
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${nl(N.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let W=t.getState(),E=W.workspace?.current,N=W.workspace?.available||[],re=new Set(W.workspace?.hidden||[]),J=E?.path||N[0]?.path||"";if(N.length===0)return l``;let _e=N.filter(fe=>!re.has(fe.path)||fe.path===J);if(_e.length<=1){let fe=_e[0]||N[0],ee=nl(fe.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${fe.path}"
            >${ee}</span
          >
          ${U(N,re)}
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
          ${_e.map(fe=>l`
              <option
                value="${fe.path}"
                ?selected=${fe.path===J}
                title="${fe.path}"
              >
                ${nl(fe.path)}
              </option>
            `)}
        </select>
        ${U(N,re)}
        ${le(J)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){Ge(M(),e)}return D(),a=t.subscribe(()=>D()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",$),Ge(l``,e)}}}var Jp=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function rl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function ef(e,t,n=rl()){return{id:n,type:e,payload:t}}function tf(e={}){let t=At("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,f=[],h=new Map,y=new Set;function $(M){for(let D of Array.from(y))try{D(M)}catch{}}function S(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),$(o);let M=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),D=(n.jitterRatio||0)*M,W=Math.max(0,Math.round(M+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",W,a+1),i=setTimeout(()=>{i=null,U()},W)}function F(M){try{s?.send(JSON.stringify(M))}catch(D){t("ws send failed",D)}}function B(){for(o="open",t("ws open"),$(o),a=0;f.length;){let M=f.shift();M&&F(M)}}function Y(M){let D;try{D=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(u.has(D.id)){let E=u.get(D.id);u.delete(D.id),D.ok?E?.resolve(D.payload):E?.reject(D.error||new Error("ws error"));return}let W=h.get(D.type);if(W&&W.size>0)for(let E of Array.from(W))try{E(D.payload)}catch(N){t("ws event handler error",N)}else t("ws received unhandled message type: %s",D.type)}function le(){o="closed",t("ws closed"),$(o);for(let[M,D]of u.entries())D.reject(new Error("ws disconnected")),u.delete(M);a+=1,S()}function U(){if(!c)return;let M=r();try{s=new WebSocket(M),t("ws connecting %s",M),o="connecting",$(o),s.addEventListener("open",B),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",le)}catch(D){t("ws connect failed %o",D),S()}}return U(),{send(M,D){if(!Jp.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let W=rl(),E=ef(M,D,W);return t("send %s id=%s",M,W),new Promise((N,re)=>{u.set(W,{resolve:N,reject:re,type:M}),s&&s.readyState===s.OPEN?F(E):(t("queue %s id=%s (state=%s)",M,W,o),f.push(E))})},on(M,D){h.has(M)||h.set(M,new Set);let W=h.get(M);return W?.add(D),()=>{W?.delete(D)}},onConnection(M){return y.add(M),()=>{y.delete(M)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,U()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function xy(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Ay(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var sl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],nf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],tr="tab:worker:closed",Sy="bdui.worker.done-range",rf=op,sf="worker:queue",of="worker:parallel-analysis",af="ui:order",lf="ui:display-policy",cf="exec:presets",nr="tab:board:closed",uf="beads-ui.board.closed-range";function Ey(e){let t=At("main");t("bootstrap start");let n=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ge(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),f=document.getElementById("detail-panel");if(a&&Ap(a),i&&c&&u&&f){let X=function(T,L){let Pe="Request failed",_="";if(T&&typeof T=="object"){let m=T;if(typeof m.message=="string"&&m.message.length>0&&(Pe=m.message),typeof m.details=="string")_=m.details;else if(m.details&&typeof m.details=="object")try{_=JSON.stringify(m.details,null,2)}catch{_=""}}else typeof T=="string"&&T.length>0&&(Pe=T);let v=L&&L.length>0?`Failed to load ${L}`:"Request failed";V.open(v,Pe,_)},Ye=function(T){return`${Je.getState().workspace.current?.path||""}\0${T}`},Oe=function(){De&&(De().catch(()=>{}),De=null),Be=null,He=null},Ue=function(T){st=T;let L=()=>{st!==T||Je.getState().selected_id!==T||(st=null,ke(T))};if(!Q){te.then(L);return}L()},dt=function(T,L,Pe,_,v){return Pe!==Ze[L]?(v().catch(()=>{}),!1):(T.set(_,v),!0)},bt=function(){let T=Je.getState();Te(T.view==="board"),Ae(T.view==="worker"),z(T.view==="monitor"),O(T.view==="board"||T.view==="worker"||Tt||!!T.selected_id)},at=function(){let T=ur(pt);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},We=function(){let T=ur(Rt);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},Te=function(T){if(T)for(let[L,Pe]of sl){if(Ve.has(L)||Qe.has(L))continue;let _=L===nr?at():{type:Pe};try{ue.register(L,_)}catch(d){t("register %s store failed: %o",L,d)}Qe.add(L);let v=Ze.board,m=!1;Fe.subscribeList(L,_).then(d=>{m=!dt(Ve,"board",v,L,d)}).catch(d=>{t("subscribe %s failed: %o",L,d),X(d,"board")}).finally(()=>{Qe.delete(L),m&&bt()})}else ie()},ie=function(){Ze.board+=1;for(let[T]of sl){let L=Ve.get(T);L&&(L().catch(()=>{}),Ve.delete(T));try{ue.unregister(T)}catch(Pe){t("unregister %s failed: %o",T,Pe)}}},Ae=function(T){if(!T){A();return}for(let[L,Pe]of nf){if(x.has(L)||Qe.has(L))continue;let _=L===tr?We():{type:Pe};try{ue.register(L,_)}catch(d){t("register %s store failed: %o",L,d)}Qe.add(L);let v=Ze.worker,m=!1;Fe.subscribeList(L,_).then(d=>{m=!dt(x,"worker",v,L,d)}).catch(d=>{t("subscribe %s failed: %o",L,d),X(d,"worker")}).finally(()=>{Qe.delete(L),m&&bt()})}},A=function(){Ze.worker+=1;for(let[T]of nf){let L=x.get(T);L&&(L().catch(()=>{}),x.delete(T));try{ue.unregister(T)}catch(Pe){t("unregister %s failed: %o",T,Pe)}}},O=function(T){if(!T){k();return}G||(me("subscribe-worker-queue",{id:sf}).catch(L=>{t("subscribe-worker-queue failed: %o",L)}),me("subscribe-worker-parallel-analysis",{id:of}).catch(L=>{t("subscribe-worker-parallel-analysis failed: %o",L)}),G=()=>(me("unsubscribe-worker-parallel-analysis",{id:of}),me("unsubscribe-worker-queue",{id:sf})))},k=function(){G&&(G().catch(()=>{}),G=null),tt.clear()},z=function(T){if(!T){pe();return}I||(me("subscribe-monitor-pipeline",{id:rf}).catch(L=>{t("subscribe-monitor-pipeline failed: %o",L)}),I=()=>me("unsubscribe-monitor-pipeline",{id:rf}))},pe=function(){I&&(I().catch(()=>{}),I=null)},ve=function(){ce||(me("subscribe-ui-order",{id:af}).catch(T=>{t("subscribe-ui-order failed: %o",T)}),ce=()=>me("unsubscribe-ui-order",{id:af}))},et=function(){ce&&(ce().catch(()=>{}),ce=null),C.clear()},Ce=function(){Ke||(me("subscribe-display-policy",{id:lf}).catch(T=>{t("subscribe-display-policy failed: %o",T)}),Ke=()=>me("unsubscribe-display-policy",{id:lf}))},lt=function(){Ke&&(Ke().catch(()=>{}),Ke=null),se.clear()},It=function(){it||(me("subscribe-impl-presets",{id:cf}).catch(T=>{t("subscribe-impl-presets failed: %o",T)}),it=()=>me("unsubscribe-impl-presets",{id:cf}))},Nt=function(T){if(!T)return"Unknown";let L=T.split("/").filter(Boolean);return L.length>0?L[L.length-1]:"Unknown"},Lt=function(T,L){Ct.open(T.path,{missing_state:T.missing_state,...L?{workspace:L}:{}})};var h=X,y=Ye,$=Oe,S=Ue,F=dt,B=bt,Y=at,le=We,U=Te,M=ie,D=Ae,W=A,E=O,N=k,re=z,J=pe,_e=ve,fe=et,ee=Ce,he=lt,$e=It,be=Nt,ne=Lt;let Se=document.getElementById("header-loading"),xe=wc(Se),V=ld(e),ye=tf(),me=xe.wrapSend((T,L)=>ye.send(T,L)),Fe=fc(me),ue=_c(),ze=bc(),tt=gc(),ut=Ql(),C=mc(),se=Zl(),we=Xl(),Me=Jl();ye.on("impl-presets-snapshot",T=>{let L=T;L&&typeof L.revision=="number"&&Array.isArray(L.presets)&&we.set({revision:L.revision,presets:L.presets})}),ye.on("monitor-pipeline-snapshot",T=>{let L=T;if(!(!L||!Array.isArray(L.workspaces)))try{ut.set(L.workspaces,L.workspaces_state,L.cross_lanes)}catch{}}),ye.on("ui-order-snapshot",T=>{let L=T;if(L&&typeof L.revision=="number")try{C.set({revision:L.revision,order:L.order&&typeof L.order=="object"?L.order:{}})}catch{}}),ye.on("display-policy-snapshot",T=>{let L=T;if(L&&L.policy&&typeof L.policy=="object")try{se.set(L.policy)}catch{}}),ye.on("session-log-snapshot",T=>{let L=T;if(L&&typeof L.id=="string")try{Me.set(L.id,Array.isArray(L.lines)?L.lines:[],typeof L.last_event_at=="number"?L.last_event_at:null)}catch{}}),ye.on("session-log-append",T=>{let L=T;if(L&&typeof L.id=="string")try{Me.append(L.id,L.event)}catch{}}),ye.on("snapshot",T=>{let L=T,Pe=L&&typeof L.id=="string"?L.id:"",_=Pe?ue.getStore(Pe):null;if(_&&L&&L.type==="snapshot")try{_.applyPush(L)}catch{}}),ye.on("upsert",T=>{let L=T,Pe=L&&typeof L.id=="string"?L.id:"",_=Pe?ue.getStore(Pe):null;if(_&&L&&L.type==="upsert")try{_.applyPush(L)}catch{}}),ye.on("delete",T=>{let L=T,Pe=L&&typeof L.id=="string"?L.id:"",_=Pe?ue.getStore(Pe):null;if(_&&L&&L.type==="delete")try{_.applyPush(L)}catch{}});let De=null,Be=null,He=null,st=null,mt=()=>{},te=new Promise(T=>{mt=()=>T(void 0)}),Q=!1,Le=!1;async function ke(T){let L=Ye(T);if(L===Be||L===He)return;He=L;let Pe=`detail:${T}`,_={type:"issue-detail",params:{id:T}};try{ue.register(Pe,_)}catch(v){t("register detail store failed: %o",v)}try{let v=await Fe.subscribeList(Pe,_);if(Je.getState().selected_id!==T||Ye(T)!==L){await v().catch(()=>{});return}De&&await De().catch(()=>{}),De=v,Be=L}catch(v){t("detail subscribe failed: %o",v),X(v,"issue details")}finally{He===L&&(He=null)}}let Ve=new Map,Qe=new Set,Ze={board:0,worker:0},Tt=!1,pt=ln;try{let T=window.localStorage.getItem(uf);mn(T)&&(pt=T)}catch{}let Rt=ln;try{let T=window.localStorage.getItem(Sy);mn(T)&&(Rt=T)}catch{}async function P(T){if(!mn(T)||T===pt)return;pt=T;try{window.localStorage.setItem(uf,T)}catch{}let L=Ve.get(nr);if(!L)return;Ve.delete(nr),await L().catch(()=>{});let Pe=at();try{ue.register(nr,Pe)}catch(_){t("register %s store failed: %o",nr,_)}try{let _=await Fe.subscribeList(nr,Pe);Ve.set(nr,_)}catch(_){t("re-subscribe %s failed: %o",nr,_),X(_,"board")}}async function Z(T){if(!mn(T)||T===Rt)return;Rt=T;let L=x.get(tr);if(!L)return;x.delete(tr),await L().catch(()=>{});let Pe=We();try{ue.register(tr,Pe)}catch(_){t("register %s store failed: %o",tr,_)}try{let _=await Fe.subscribeList(tr,Pe);x.set(tr,_)}catch(_){t("re-subscribe %s failed: %o",tr,_),X(_,"worker")}}let x=new Map,G=null,I=null,ce=null,Ke=null,it=null;async function Dt(){Ke=null,se.clear(),it=null,we.clear(),G=null,I=null,Ve.clear(),x.clear(),Ze.board+=1,Ze.worker+=1,It();let T=Je.getState().workspace.current?.path;if(T)try{await ye.send("set-workspace",{path:T})}catch(Pe){t("workspace restore after reconnect failed: %o",Pe);return}Ce();let L=Je.getState();Te(L.view==="board"),Ae(L.view==="worker"),z(L.view==="monitor"),O(L.view==="board"||L.view==="worker"||!!L.selected_id)}async function Wt(){t("clearing all subscriptions for workspace switch"),ie(),A(),k(),ze.clear(),et(),ve(),lt(),Ce(),Oe();let T=Je.getState();if(T.selected_id)try{ue.unregister(`detail:${T.selected_id}`)}catch{}let L=Je.getState();Te(L.view==="board"),Ae(L.view==="worker"),z(L.view==="monitor"),O(L.view==="board"||L.view==="worker"||!!L.selected_id),L.selected_id&&Ue(L.selected_id)}async function Mt(T){t("requesting workspace switch to %s",T),Le=!0;try{let L=await ye.send("set-workspace",{path:T});t("workspace switch result: %o",L),L&&L.workspace&&(Je.setState({workspace:{current:{path:L.workspace.root_dir,database:L.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",T),L.changed&&(await Wt(),ae("Switched to "+Nt(T),"success",2e3)))}catch(L){throw t("workspace switch failed: %o",L),ae("Failed to switch workspace","error",3e3),L}finally{Le=!1}}async function zt(T){t("requesting workspace git pull for %s",T);try{let L=await ye.send("git-pull-workspace",{});t("workspace git pull result: %o",L);let Pe=L?.status;if(Pe==="up_to_date"){ae("Already up to date","success",2e3);return}if(Pe==="stash_pop_conflict"){ae("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ae("Git pulled "+Nt(T),"success",2e3)}catch(L){t("workspace git pull failed: %o",L);let Pe=L?.code,_=L?.message;if(Pe==="rebase_conflict"){ae("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Pe==="rebase_conflict_abort_failed"){ae("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Pe==="busy"){ae("Git pull skipped: another operation is running","warning",3e3);return}let v=_?`: ${_}`:"";throw ae(`Git pull failed${v}`,"error",3e3),L}}async function yt(T,L){t("setting workspace visibility %s \u2192 %s",T,String(L));try{await ye.send("set-workspace-visibility",{path:T,visible:L}),await qe()}catch(Pe){t("workspace visibility update failed: %o",Pe),ae("Failed to update project visibility","error",3e3)}}async function qe(){try{let T=await ye.send("list-workspaces",{});if(t("workspaces loaded: %o",T),T&&Array.isArray(T.workspaces)){let L=T.workspaces.map(m=>({path:m.path,database:m.database,pid:m.pid,version:m.version})),Pe=T.current?{path:T.current.root_dir,database:T.current.db_path}:null,_=Array.isArray(T.hidden)?T.hidden.filter(m=>typeof m=="string"):[];Je.setState({workspace:{current:Pe,available:L,hidden:_}});let v=window.localStorage.getItem("beads-ui.workspace");v&&(!L.some(d=>d.path===v)||_.includes(v)?window.localStorage.removeItem("beads-ui.workspace"):Pe&&v!==Pe.path&&(t("restoring saved workspace preference: %s",v),await Mt(v)))}}catch(T){t("failed to load workspaces: %o",T)}}ye.on("workspace-changed",T=>{t("workspace-changed event: %o",T),T&&T.root_dir&&(Je.setState({workspace:{current:{path:T.root_dir,database:T.db_path}}}),qe(),Wt())});let Ht=!1;if(typeof ye.onConnection=="function"){let T=L=>{t("ws state %s",L),L==="reconnecting"||L==="closed"?(Ht=!0,ae("Connection lost. Reconnecting\u2026","error",4e3)):L==="open"&&Ht&&(Ht=!1,ae("Reconnected","success",2200),Ay(Je,(Pe,_)=>{t(`${Pe}: %o`,_)}),Dt())};ye.onConnection(T)}let Qt="board";try{let T=window.localStorage.getItem("beads-ui.view");(T==="board"||T==="worker"||T==="monitor")&&(Qt=T)}catch(T){t("view parse error: %o",T)}let Je=vc({config:xy(),view:Qt});ye.on("worker-queue-snapshot",T=>{let L=T;if(!L||!L.queue)return;let Pe=Je.getState().workspace.current?.path;if(typeof Pe=="string"&&Pe.length>0&&L.root_dir!==Pe){t("dropping worker-queue snapshot for %s",String(L.root_dir));return}try{ze.set(L.queue)}catch{}}),ye.on("worker-parallel-analysis-snapshot",T=>{let L=T;if(!L)return;let Pe=Je.getState().workspace.current?.path;if(!(typeof Pe=="string"&&Pe.length>0&&typeof L.root_dir=="string"&&L.root_dir!==Pe))try{tt.set({settings:L.settings,job:L.job??null,runs:Array.isArray(L.runs)?L.runs:[],last_good:L.last_good??null})}catch{}});let Ee=hc(Je);Ee.start();let R=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),de=async(T,L)=>{try{return await me(T,L)}catch(Pe){if(R.has(T))throw Pe;return[]}};ip({global_element:r,repo_element:s},Je,Ee);let Ie=document.getElementById("workspace-picker");Ie&&Qp(Ie,Je,Mt,zt,yt);let rt=dp(e,(T,L)=>me(T,L));try{let T=document.getElementById("new-issue-btn");T&&T.addEventListener("click",()=>rt.open())}catch{}let vt=mp(e,{policyStore:se,queueStore:ze,implPresetStore:we,transport:(T,L)=>me(T,L),onOpenChange:T=>{let L=Tt;Tt=T,bt(),L&&T===!1&&Jt.refreshSessionDefaults()},labelOptions:()=>{let T=new Set;for(let[L]of sl)for(let Pe of ue.snapshotFor(L)||[]){let _=Pe.labels;if(Array.isArray(_))for(let v of _)typeof v=="string"&&v.length>0&&T.add(v)}return Array.from(T).sort()}});try{let T=document.getElementById("display-settings-btn");T&&(T.setAttribute("aria-label","\uC124\uC815"),T.setAttribute("title","\uC124\uC815"),T.addEventListener("click",()=>vt.open()))}catch{}let ft=document.createElement("div");ft.className="md-viewer-root",document.body.appendChild(ft);let Ct=Fo(ft,{getWorkspacePath:()=>Je.getState().workspace.current?.path}),Gt=Pc(i,{gotoIssue:T=>Ee.gotoIssue(T),issueStores:ue,transport:de,workerQueueStore:ze,uiOrderStore:C,displayPolicyStore:se,closedRange:pt,onClosedRangeChange:T=>{P(T)},onNewIssue:()=>rt.open(),openDoc:Lt}),Jt=tl(c,{transport:de,issueStores:ue,queueStore:ze,analysisStore:tt,sessionLogStore:Me,uiOrderStore:C,gotoIssue:T=>Je.setState({selected_id:T}),getWorkspacePath:()=>Je.getState().workspace.current?.path,openDoc:Lt,doneRange:Rt,onDoneRangeChange:T=>{Z(T)}}),wt=ap(u,{transport:de,pipelineStore:ut,execPresetStore:we,sessionLogStore:Me,router:Ee,gotoIssue:T=>Ee.gotoIssue(T),getWorkspacePath:()=>Je.getState().workspace.current?.path,switchWorkspace:T=>Mt(T),openDoc:Lt}),sn=id(f,{issueStores:ue,transport:de,queueStore:ze,execPresetStore:we,sessionLogStore:Me,getWorkspacePath:()=>Je.getState().workspace.current?.path,mdViewer:Ct,onNavigate:T=>{Je.getState().view==="worker"?Je.setState({selected_id:T}):Ee.gotoIssue(T)},onClose:()=>{let T=Je.getState();Je.setState({selected_id:null});try{Ee.gotoView(T.view==="worker"||T.view==="monitor"?T.view:"board")}catch{}},onOpenExecPresets:()=>{vt.open("execution")}}),fn=Je.getState().selected_id;fn&&(f.hidden=!1,sn.load(fn),Ue(fn)),Je.subscribe(T=>{let L=T.selected_id;L?(f.hidden=!1,sn.load(L),Le||Ue(L)):(sn.clear(),f.hidden=!0,Oe())});let En=T=>{i.hidden=T.view!=="board",c.hidden=T.view!=="worker",u.hidden=T.view!=="monitor",o&&o.classList.toggle("is-quiet",T.view==="monitor"),Te(T.view==="board"),Ae(T.view==="worker"),z(T.view==="monitor"),O(T.view==="board"||T.view==="worker"||Tt||!!T.selected_id),!T.selected_id&&T.view==="board"&&Gt.load(),T.view==="worker"&&Jt.load(),T.view==="monitor"?wt.load():wt.pause(),window.localStorage.setItem("beads-ui.view",T.view)};Je.subscribe(En),En(Je.getState()),ve(),Ce(),It(),qe().finally(()=>{Q=!0,mt()}),window.addEventListener("keydown",T=>{let L=T.ctrlKey||T.metaKey,Pe=String(T.key||"").toLowerCase(),_=T.target,v=_&&_.tagName?String(_.tagName).toLowerCase():"",m=v==="input"||v==="textarea"||v==="select"||_&&typeof _.isContentEditable=="boolean"&&_.isContentEditable;L&&Pe==="n"&&(m||(T.preventDefault(),rt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Ey(t)});export{Ey as bootstrap,xy as readBootstrapConfig,Ay as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
