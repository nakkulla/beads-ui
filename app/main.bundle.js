var Tf=Object.create;var Ta=Object.defineProperty;var Cf=Object.getOwnPropertyDescriptor;var Rf=Object.getOwnPropertyNames;var Of=Object.getPrototypeOf,Lf=Object.prototype.hasOwnProperty;var If=(e,t,n)=>t in e?Ta(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ca=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Pf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Rf(t))!Lf.call(e,s)&&s!==n&&Ta(e,s,{get:()=>t[s],enumerable:!(r=Cf(t,s))||r.enumerable});return e};var Df=(e,t,n)=>(n=e!=null?Tf(Of(e)):{},Pf(t||!e||!e.__esModule?Ta(n,"default",{value:e,enumerable:!0}):n,e));var vt=(e,t,n)=>If(e,typeof t!="symbol"?t+"":t,n);var tc=Ca((qy,ec)=>{var Cr=1e3,Rr=Cr*60,Or=Rr*60,fr=Or*24,qf=fr*7,Ff=fr*365.25;ec.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return jf(e);if(n==="number"&&isFinite(e))return t.long?Uf(e):Bf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function jf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Ff;case"weeks":case"week":case"w":return n*qf;case"days":case"day":case"d":return n*fr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Or;case"minutes":case"minute":case"mins":case"min":case"m":return n*Rr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Cr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Bf(e){var t=Math.abs(e);return t>=fr?Math.round(e/fr)+"d":t>=Or?Math.round(e/Or)+"h":t>=Rr?Math.round(e/Rr)+"m":t>=Cr?Math.round(e/Cr)+"s":e+"ms"}function Uf(e){var t=Math.abs(e);return t>=fr?Ys(e,t,fr,"day"):t>=Or?Ys(e,t,Or,"hour"):t>=Rr?Ys(e,t,Rr,"minute"):t>=Cr?Ys(e,t,Cr,"second"):e+" ms"}function Ys(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var rc=Ca((Fy,nc)=>{function Wf(e){n.debug=n,n.default=n,n.coerce=c,n.disable=a,n.enable=s,n.enabled=i,n.humanize=tc(),n.destroy=u,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let b=0;for(let h=0;h<p.length;h++)b=(b<<5)-b+p.charCodeAt(h),b|=0;return n.colors[Math.abs(b)%n.colors.length]}n.selectColor=t;function n(p){let b,h=null,k,T;function j(...W){if(!j.enabled)return;let Z=j,ce=Number(new Date),z=ce-(b||ce);Z.diff=z,Z.prev=b,Z.curr=ce,b=ce,W[0]=n.coerce(W[0]),typeof W[0]!="string"&&W.unshift("%O");let q=0;W[0]=W[0].replace(/%([a-zA-Z%])/g,(H,C)=>{if(H==="%%")return"%";q++;let F=n.formatters[C];if(typeof F=="function"){let re=W[q];H=F.call(Z,re),W.splice(q,1),q--}return H}),n.formatArgs.call(Z,W),(Z.log||n.log).apply(Z,W)}return j.namespace=p,j.useColors=n.useColors(),j.color=n.selectColor(p),j.extend=r,j.destroy=n.destroy,Object.defineProperty(j,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(k!==n.namespaces&&(k=n.namespaces,T=n.enabled(p)),T),set:W=>{h=W}}),typeof n.init=="function"&&n.init(j),j}function r(p,b){let h=n(this.namespace+(typeof b>"u"?":":b)+p);return h.log=this.log,h}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let b=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of b)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(p,b){let h=0,k=0,T=-1,j=0;for(;h<p.length;)if(k<b.length&&(b[k]===p[h]||b[k]==="*"))b[k]==="*"?(T=k,j=h,k++):(h++,k++);else if(T!==-1)k=T+1,j++,h=j;else return!1;for(;k<b.length&&b[k]==="*";)k++;return k===b.length}function a(){let p=[...n.names,...n.skips.map(b=>"-"+b)].join(",");return n.enable(""),p}function i(p){for(let b of n.skips)if(o(p,b))return!1;for(let b of n.names)if(o(p,b))return!0;return!1}function c(p){return p instanceof Error?p.stack||p.message:p}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}nc.exports=Wf});var sc=Ca((sn,Zs)=>{sn.formatArgs=Hf;sn.save=Gf;sn.load=Vf;sn.useColors=zf;sn.storage=Kf();sn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();sn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function zf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Hf(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Zs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}sn.log=console.debug||console.log||(()=>{});function Gf(e){try{e?sn.storage.setItem("debug",e):sn.storage.removeItem("debug")}catch{}}function Vf(){let e;try{e=sn.storage.getItem("debug")||sn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Kf(){try{return localStorage}catch{}}Zs.exports=rc()(sn);var{formatters:Yf}=Zs.exports;Yf.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Xr=globalThis,Ws=Xr.trustedTypes,Fl=Ws?Ws.createPolicy("lit-html",{createHTML:e=>e}):void 0,Oa="$lit$",In=`lit$${Math.random().toFixed(9).slice(2)}$`,La="?"+In,Mf=`<${La}>`,cr=document,Qr=()=>cr.createComment(""),Jr=e=>e===null||typeof e!="object"&&typeof e!="function",Ia=Array.isArray,Hl=e=>Ia(e)||typeof e?.[Symbol.iterator]=="function",Ra=`[ 	
\f\r]`,Zr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,jl=/-->/g,Bl=/>/g,ir=RegExp(`>|${Ra}(?:([^\\s"'>=/]+)(${Ra}*=${Ra}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ul=/'/g,Wl=/"/g,Gl=/^(?:script|style|textarea|title)$/i,Pa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=Pa(1),ts=Pa(2),Oy=Pa(3),gn=Symbol.for("lit-noChange"),Lt=Symbol.for("lit-nothing"),zl=new WeakMap,lr=cr.createTreeWalker(cr,129);function Vl(e,t){if(!Ia(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fl!==void 0?Fl.createHTML(t):t}var Kl=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Zr;for(let i=0;i<n;i++){let c=e[i],u,p,b=-1,h=0;for(;h<c.length&&(a.lastIndex=h,p=a.exec(c),p!==null);)h=a.lastIndex,a===Zr?p[1]==="!--"?a=jl:p[1]!==void 0?a=Bl:p[2]!==void 0?(Gl.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=ir):p[3]!==void 0&&(a=ir):a===ir?p[0]===">"?(a=s??Zr,b=-1):p[1]===void 0?b=-2:(b=a.lastIndex-p[2].length,u=p[1],a=p[3]===void 0?ir:p[3]==='"'?Wl:Ul):a===Wl||a===Ul?a=ir:a===jl||a===Bl?a=Zr:(a=ir,s=void 0);let k=a===ir&&e[i+1].startsWith("/>")?" ":"";o+=a===Zr?c+Mf:b>=0?(r.push(u),c.slice(0,b)+Oa+c.slice(b)+In+k):c+In+(b===-2?i:k)}return[Vl(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},es=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,p]=Kl(t,n);if(this.el=e.createElement(u,r),lr.currentNode=this.el.content,n===2||n===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(s=lr.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let b of s.getAttributeNames())if(b.endsWith(Oa)){let h=p[a++],k=s.getAttribute(b).split(In),T=/([.?@])?(.*)/.exec(h);c.push({type:1,index:o,name:T[2],strings:k,ctor:T[1]==="."?Hs:T[1]==="?"?Gs:T[1]==="@"?Vs:dr}),s.removeAttribute(b)}else b.startsWith(In)&&(c.push({type:6,index:o}),s.removeAttribute(b));if(Gl.test(s.tagName)){let b=s.textContent.split(In),h=b.length-1;if(h>0){s.textContent=Ws?Ws.emptyScript:"";for(let k=0;k<h;k++)s.append(b[k],Qr()),lr.nextNode(),c.push({type:2,index:++o});s.append(b[h],Qr())}}}else if(s.nodeType===8)if(s.data===La)c.push({type:2,index:o});else{let b=-1;for(;(b=s.data.indexOf(In,b+1))!==-1;)c.push({type:7,index:o}),b+=In.length-1}o++}}static createElement(t,n){let r=cr.createElement("template");return r.innerHTML=t,r}};function ur(e,t,n=e,r){if(t===gn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=Jr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=ur(e,s._$AS(e,t.values),s,r)),t}var zs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??cr).importNode(n,!0);lr.currentNode=s;let o=lr.nextNode(),a=0,i=0,c=r[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Tr(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Ks(o,this,t)),this._$AV.push(u),c=r[++i]}a!==c?.index&&(o=lr.nextNode(),a++)}return lr.currentNode=cr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Tr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Lt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=ur(this,t,n),Jr(t)?t===Lt||t==null||t===""?(this._$AH!==Lt&&this._$AR(),this._$AH=Lt):t!==this._$AH&&t!==gn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Hl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Lt&&Jr(this._$AH)?this._$AA.nextSibling.data=t:this.T(cr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=es.createElement(Vl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new zs(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=zl.get(t.strings);return n===void 0&&zl.set(t.strings,n=new es(t)),n}k(t){Ia(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Qr()),this.O(Qr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},dr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Lt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Lt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=ur(this,t,n,0),a=!Jr(t)||t!==this._$AH&&t!==gn,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=ur(this,i[r+c],n,c),u===gn&&(u=this._$AH[c]),a||(a=!Jr(u)||u!==this._$AH[c]),u===Lt?t=Lt:t!==Lt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===Lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Hs=class extends dr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Lt?void 0:t}},Gs=class extends dr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Lt)}},Vs=class extends dr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=ur(this,t,n,0)??Lt)===gn)return;let r=this._$AH,s=t===Lt&&r!==Lt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Lt&&(r===Lt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ks=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){ur(this,t)}},Yl={M:Oa,P:In,A:La,C:1,L:Kl,R:zs,D:Hl,V:ur,I:Tr,H:dr,N:Gs,U:Vs,B:Hs,F:Ks},Nf=Xr.litHtmlPolyfillSupport;Nf?.(es,Tr),(Xr.litHtmlVersions??(Xr.litHtmlVersions=[])).push("3.3.1");var Ke=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Tr(t.insertBefore(Qr(),o),o,void 0,n??{})}return s._$AI(e),s};var dn="today",Vn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function bn(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function pr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Zl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Xl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ql(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Jl(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var oc=Df(sc(),1);function St(e){return(0,oc.default)(`beads-ui:${e}`)}function kn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function _r(e,t){let n=kn(e.created_at),r=kn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function lc(e,t){let n=kn(e.created_at),r=kn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function cc(e,t){let n=kn(e.updated_at),r=kn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function uc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=kn(e.created_at),o=kn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function dc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Zf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ac(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function ic(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Zf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function pc(e,t){let n=ac(e),r=ac(t);if(n!==r)return n<r?-1:1;let s=ic(e),o=ic(t);if(s!==o)return s<o?-1:1;let a=kn(e&&e.created_at),i=kn(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Da=2**20;function Lr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-kn(e&&e.created_at)}function Xs(e){return(t,n)=>{let r=Lr(t,e),s=Lr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Ma(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Lr(i,n)-Da};if(!i)return{rank:Lr(a,n)+Da};let c=Lr(a,n),u=Lr(i,n),p=(c+u)/2;return c<p&&p<u?{rank:p}:{renormalize:r.map((b,h)=>({bead_id:b.id,rank:h*Da}))}}function Na(e,t={}){let n=St(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||_r;function u(){for(let h of Array.from(a))try{h()}catch{}}function p(){s=Array.from(r.values()).sort(c)}function b(h){if(i||!h||h.id!==e)return;let k=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,k),!(k<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(k<=o)return;r.clear();let T=Array.isArray(h.issues)?h.issues:[];for(let j of T)j&&typeof j.id=="string"&&j.id.length>0&&r.set(j.id,j);p(),o=k,u();return}if(h.type==="upsert"){let T=h.issue;if(T&&typeof T.id=="string"&&T.id.length>0){let j=r.get(T.id);if(!j)r.set(T.id,T);else{let W=Number.isFinite(j.updated_at)?j.updated_at:0,Z=Number.isFinite(T.updated_at)?T.updated_at:0;if(W<=Z){for(let ce of Object.keys(j))ce in T||delete j[ce];for(let[ce,z]of Object.entries(T))j[ce]=z}}p()}o=k,u()}else if(h.type==="delete"){let T=String(h.issue_id||"");T&&(r.delete(T),p()),o=k,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:b,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Qs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function fc(e){let t=St("subs"),n=new Map,r=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let p=Array.isArray(c.added)?c.added:[],b=Array.isArray(c.updated)?c.updated:[],h=Array.isArray(c.removed)?c.removed:[];for(let k of Array.from(u)){let T=n.get(k);if(!T)continue;let j=T.itemsById;for(let W of p)typeof W=="string"&&W.length>0&&j.set(W,!0);for(let W of b)typeof W=="string"&&W.length>0&&j.set(W,!0);for(let W of h)typeof W=="string"&&W.length>0&&j.delete(W)}}async function o(i,c){let u=Qs(c);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let b=n.get(i);if(b&&b.key!==u){let h=r.get(b.key);h&&(h.delete(i),h.size===0&&r.delete(b.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let p=r.get(u);p&&p.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(b){let h=n.get(i)||null;if(h){let k=r.get(h.key);k&&(k.delete(i),k.size===0&&r.delete(h.key))}throw n.delete(i),b}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let b=n.get(i)||null;if(b){let h=r.get(b.key);h&&(h.delete(i),h.size===0&&r.delete(b.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Qs,selectors:{getIds(i){let c=n.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=n.get(i);return u?u.itemsById.has(c):!1},count(i){let c=n.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=n.get(i),u={};if(!c)return u;for(let p of c.itemsById.keys())u[p]=!0;return u}}}}function _c(){let e=St("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let c of Array.from(r))try{c()}catch{}}function a(c,u,p){let b=u?Qs(u):"",h=n.get(c)||"",k=t.has(c);if(e("register %s key=%s (prev=%s)",c,b,h),k&&h&&b&&h!==b){let T=t.get(c);if(T)try{T.dispose()}catch{}let j=s.get(c);if(j){try{j()}catch{}s.delete(c)}let W=Na(c,p);t.set(c,W);let Z=W.subscribe(()=>o());s.set(c,Z)}else if(!k){let T=Na(c,p);t.set(c,T);let j=T.subscribe(()=>o());s.set(c,j)}return n.set(c,b),()=>i(c)}function i(c){e("unregister %s",c),n.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let p=s.get(c);if(p){try{p()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return r.add(c),()=>r.delete(c)}}}function mc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function gc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function bc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function qa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Xf(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Qf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function hc(e){let t=St("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Xf(r),a=Qf(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=qa(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?qa(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Jf=Object.freeze({workspace_config:{default_workspace:null}});function yc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Jf.workspace_config.default_workspace}}}function vc(e={}){let t=St("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:yc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?yc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,p)=>u!==n.workspace.hidden[p]),c=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,p)=>u===n.worker.show_closed_children[p])&&!i&&!c||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function wc(e){let t=St("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function c(u){return async(b,h)=>{let k=s++,T=Date.now();r.set(k,{type:b,start_ts:T}),t("request start id=%d type=%s count=%d",k,b,n+1),a();let j=!1,W=()=>{j||(j=!0,r.delete(k),i())},Z=setTimeout(()=>{j||(t("request TIMEOUT id=%d type=%s elapsed=%dms",k,b,Date.now()-T),W())},3e4);try{let ce=await u(b,h),z=Date.now()-T;return t("request done id=%d type=%s elapsed=%dms",k,b,z),ce}catch(ce){let z=Date.now()-T;throw t("request error id=%d type=%s elapsed=%dms err=%o",k,b,z,ce),ce}finally{clearTimeout(Z),W()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([p,b])=>({id:p,type:b.type,elapsed_ms:u-b.start_ts}))}}}function le(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Js(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(dc),c;switch(i){case"created_desc":return c.sort(_r),c;case"created_asc":return c.sort(lc),c;case"updated_desc":return c.sort(cc),c;case"priority":return c.sort(uc),c;case"manual":default:{let u=n();return u?c.sort(Xs(u)):c.sort(_r),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Cn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Wt(e){let t=Cn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function pn(e,t){let n=Cn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function kc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Cn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function eo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function to(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=eo(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function no(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=kc(n);return{total:n.length,count:r,current:s,children:n}}function ro(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},p=r(Ma(i,c,u.order),a);s(u,p);let b=await t("ui-order-set",{expected_revision:u.revision,entries:p});if(b&&b.conflict){let h={revision:typeof b.revision=="number"?b.revision:0,order:b.order||{}};n.set(h);let k=r(Ma(i,c,h.order),a);s(h,k);let T=await t("ui-order-set",{expected_revision:h.revision,entries:k});T&&T.applied&&n.set({revision:typeof T.revision=="number"?T.revision:0,order:T.order||{}})}else b&&b.applied&&n.set({revision:typeof b.revision=="number"?b.revision:0,order:b.order||{}})}return{applyReorder:o}}function so(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Fa(e,t){return!t||typeof e!="string"||e.length===0||so(t.visible_labels).includes(e)?!0:so(t.hidden_labels).includes(e)?!1:!so(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function $c(e,t){return so(e).filter(n=>Fa(n,t))}function Kn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function e_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function t_(e,t,n,r,s){return l`<button
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
  `}var r_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ac={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},xc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},s_={review:"\u2713",skip:"\u2298"},Yn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function o_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Sc(e){let t=e&&e.fill||"none";return t==="none"?Yn.none:e&&e.stale===!0?Yn.stale:t==="dim"?Yn.dim:e&&e.glyph==="review"?Yn.review:e&&e.glyph==="skip"?Yn.skip:Yn.done}function a_(e){if(!e||e.fill==="none"||!e.approval_state)return Sc(e);let t=[];return e.glyph==="review"?t.push(Yn.review):e.glyph==="skip"&&t.push(Yn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function i_(e,t,n,r){let s=r_[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=s_[t&&t.glyph||""]||"",c="bar";o==="dim"?c+=` b-${s} dim`:o==="full"&&(c+=` b-${s} full`),a&&(c+=" stale"),n&&(c+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,p=n?`color: var(--stage-${s}-on)`:"",b=Ac[e]||e,h=r?Ec(t):null;if(!h)return l`
      <div class="seg">
        <div class=${c} style=${p}>${i}</div>
        <div class=${u}>${b}</div>
      </div>
    `;let k=`${b} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return l`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${k}
      title=${k}
      @click=${T=>{T.preventDefault(),T.stopPropagation(),r(T,h,e)}}
    >
      <div class=${c} style=${p}>${i}</div>
      <div class=${u}>${b}</div>
    </button>
  `}function Ec(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ao(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=xc[e.route]||xc.spec_backed,o=e.stages,a=o_(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${Ac[u]||u} ${u==="plan"?a_(o[u]||{}):Sc(o[u]||{})}`).join(" \xB7 ")}`,c=!!r&&s.some(u=>Ec(o[u]||{})!==null);return l`
    <div
      class="stp"
      role=${c?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>i_(u,o[u]||{},u===a,r))}
    </div>
  `}function l_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Tc=2;function c_(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,Tc).join(", "),s=n.length-Tc,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function ja(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function io(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Pn(e){return`${e.kind}:${io(e)}@${e.sha}`}function lo(e,t){if(!e)return null;let n=ja(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=ja(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Pn(t)}`:"";return{kind:e.kind,label:i,title:`${c}${u}`}}function Cc(e,t){let n=lo(e,t);return n?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function u_(e){if(!e)return null;let t=ja(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Pn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function d_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Kn(n,"route")){let i=r.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Kn(n,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Kn(n,"pr")){let i=r.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Cc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Pn(i)}`}
        >${`exec ${i.kind==="delegated"?io(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of $c(e.labels,n))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Kn(n,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Kn(n,"blocked")&&s.push(...c_(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Kn(n,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function p_(e){let t=pn(e.created_at),n=pn(e.updated_at);return!t&&!n?"":l`<span class="board-card__times">
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
      ${e.workflow&&Kn(t.policy||null,"stepper")?ao(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${f_(e,t)}
    </article>
  `}function Ir(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return l`
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
  `}var h_=200,y_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},v_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Lc="beads-ui.board.sort",Ic=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function w_(){try{let e=window.localStorage.getItem(Lc);if(e&&Ic.has(e))return e}catch{}return"created_desc"}function Pc(e,t){let n=St("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,p=t.onNewIssue,b=t.openDoc,h=t.closedRange||dn,k=s?Js(s,a):null,T=ro({transport:o,uiOrderStore:a}),j=[],W=[],Z=[],ce=[],z=[],q=[],N=!1,H=0,C=w_(),F=new Map,re=new Map,Te=new Map,ye=new Set,G={search:"",priority:"",type:"",labels:[]},ee=!1,ve=null;function Ae(S){return String(S.status||"open")==="open"}function ge(S){let K=String(S.status||"open");return K==="open"||K==="blocked"}function se(S){let K=G.search.trim().toLowerCase(),_e=G.priority,x=G.type,L=G.labels;return S.filter(w=>{if(K){let D=String(w.id||"").toLowerCase(),V=String(w.title||"").toLowerCase();if(!D.includes(K)&&!V.includes(K))return!1}if(_e!==""&&String(w.priority)!==_e||x!==""&&String(w.issue_type||"")!==x)return!1;if(L.length>0){let D=Array.isArray(w.labels)?w.labels:[];if(!L.some(V=>D.includes(V)))return!1}return!0})}function Se(){let S=new Set;for(let K of[j,W,Z,ce,z,q])for(let _e of K){let x=Array.isArray(_e.labels)?_e.labels:[];for(let L of x)typeof L=="string"&&L.length>0&&S.add(L)}return Array.from(S).sort()}function we(){return G.search.trim()!==""||G.priority!==""||G.type!==""||G.labels.length>0}function Y(){try{if(k){let S=k.selectBoardColumn("tab:board:in-progress","in_progress",C),K=k.selectBoardColumn("tab:board:blocked","blocked",C).filter(ge),_e=new Set(S.map(ke=>ke.id)),x=k.selectBoardColumn("tab:board:ready","ready",C).filter(ke=>Ae(ke)&&!_e.has(ke.id)),L=k.selectBoardColumn("tab:board:resolved","resolved",C),w=k.selectBoardColumn("tab:board:deferred","deferred",C),D=k.selectBoardColumn("tab:board:closed","closed").slice(0,h_),V=[...K,...x,...S,...L,...D];Q(V);let me=new Set;for(let ke of V)ke&&ke.id&&!eo(ke)&&me.add(ke.id);let ae=!we();j=ae?ns(K,me):K,W=ae?ns(x,me):x,Z=ae?ns(S,me):S,ce=ae?ns(L,me):L,z=w,H=w.length,q=ae?ns(D,me):D,F=new Map;for(let ke of j)F.set(ke.id,"open");for(let ke of W)F.set(ke.id,"open");for(let ke of Z)F.set(ke.id,"in_progress");for(let ke of ce)F.set(ke.id,"resolved");for(let ke of z)F.set(ke.id,"deferred");for(let ke of q)F.set(ke.id,"closed");re=new Map;for(let ke of j)re.set(ke.id,"blocked-col");for(let ke of W)re.set(ke.id,"ready-col");for(let ke of Z)re.set(ke.id,"in-progress-col");for(let ke of ce)re.set(ke.id,"resolved-col");for(let ke of q)re.set(ke.id,"closed-col")}ft()}catch{j=[],W=[],Z=[],ce=[],z=[],q=[],Te=new Map,ft()}}function Q(S){Te=to(S)}function $e(S){return no(Te,S)}function be(S){return!ye.has(S)}function je(S,K){S.preventDefault(),S.stopPropagation(),ye.has(K)?ye.delete(K):ye.add(K),ft()}function oe(S,K){S.preventDefault(),S.stopPropagation(),r(K)}function Ve(S,K){S.preventDefault(),S.stopPropagation(),r(K)}function pt(S,K){ve||r(K)}function rt(S,K){S.preventDefault(),S.stopPropagation(),k_(K).then(_e=>{_e&&le("\uBCF5\uC0AC\uB428","success",1200)})}function O(S,K){ve=K,S.dataTransfer&&(S.dataTransfer.setData("text/plain",K),S.dataTransfer.effectAllowed="move"),S.target.classList.add("board-card--dragging")}function de(S){S.target.classList.remove("board-card--dragging"),ct(),setTimeout(()=>{ve=null},0)}function he(S){let K=String(S.target.value||"");!K||K===h||(h=K,u&&u(K),ft())}function Ie(){return i?i.get():null}function Ne(S){let K=c?c.get():null,_e=K?K.cleanup_failed:null;if(!_e||typeof _e!="object"||Array.isArray(_e))return null;let x=_e[S];return!x||typeof x!="object"||Array.isArray(x)?null:x}let ze={onCardClick:pt,onCopyId:rt,onDragStart:O,onDragEnd:de,onClosedRangeChange:he,rollupFor:$e,isExpanded:be,onRollupToggle:je,onChildClick:oe,onFromChipClick:Ve,onOpenDoc:b?(S,K)=>b(K):void 0,cleanupFailureFor:Ne,get policy(){return Ie()}};function He(S,K){ve||(We(),r(K))}function at(S,K){S.preventDefault(),S.stopPropagation(),We(),r(K)}let bt={...ze,onCardClick:He,onChildClick:at,onFromChipClick:at,onOpenDoc:b?(S,K)=>{We(),b(K)}:void 0,get policy(){return Ie()}};function ne(S){let K=S.target,_e=e.querySelector(".board-filter__labels");K&&_e&&_e.contains(K)||Qe()}function te(S){S.key==="Escape"&&Qe()}function Pe(){ee||(ee=!0,document.addEventListener("mousedown",ne),document.addEventListener("keydown",te),ft())}function Qe(){ee&&(ee=!1,document.removeEventListener("mousedown",ne),document.removeEventListener("keydown",te),ft())}function Le(S){S.key==="Escape"&&We()}function xe(){N||(N=!0,document.addEventListener("keydown",Le),ft())}function We(){N&&(N=!1,document.removeEventListener("keydown",Le),ft())}let Ye={onClose:We,onOverlayClick(S){S.target===S.currentTarget&&We()}},et={onSearchInput(S){G.search=String(S.target.value||""),Y()},onPriorityChange(S){G.priority=String(S.target.value||""),Y()},onTypeChange(S){G.type=String(S.target.value||""),Y()},onSortChange(S){let K=String(S.target.value||"");if(!(!Ic.has(K)||K===C)){C=K;try{window.localStorage.setItem(Lc,K)}catch{}Y()}},onDeferredToggle(){N?We():xe()},onLabelMenuToggle(){ee?Qe():Pe()},onLabelToggle(S){let K=G.labels.indexOf(S);K===-1?G.labels.push(S):G.labels.splice(K,1),Y()},onLabelClear(){G.labels.length!==0&&(G.labels=[],Y())},onNewIssue(){p&&p()}};function Xe(){return l`
      <div class="board-view">
        ${Oc(G,et,{sort_mode:C,deferred_popup_open:N,deferred_count:H,label_options:Se(),label_menu_open:ee})}
        <div class="board-root">
          ${Ir({title:"Blocked",id:"blocked-col",items:se(j)},ze)}
          ${Ir({title:"Ready",id:"ready-col",items:se(W)},ze)}
          ${Ir({title:"In progress",id:"in-progress-col",items:se(Z)},ze)}
          ${Ir({title:"Resolved",id:"resolved-col",items:se(ce)},ze)}
          ${Ir({title:"Closed",id:"closed-col",items:se(q),is_closed:!0,closed_range:h},ze)}
        </div>
        ${N?Rc({items:se(z),count:H},bt,Ye):""}
      </div>
    `}function ft(){Ke(Xe(),e),Ct()}function Ct(){try{let S=e.querySelector("#deferred-popup");S&&!S.open&&(typeof S.showModal=="function"?S.showModal():S.setAttribute("open",""));let K=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let _e of K)Array.from(_e.querySelectorAll(".board-card")).forEach((L,w)=>{L.tabIndex=w===0?0:-1})}catch{}}async function yt(S,K){if(!o){le("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:S,status:K}),le("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(_e){n("update-status failed: %o",_e),le("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function _t(S){switch(S){case"blocked-col":return j;case"ready-col":return W;case"in-progress-col":return Z;case"resolved-col":return ce;default:return[]}}function Ot(S,K,_e){if(!o||!a)return;let x=_t(S),L=x.find(ae=>ae.id===K);if(!L)return;let w=x.filter(ae=>ae.id!==K),D=_e.closest?_e.closest(".board-card"):null,V=w.length;if(D){let ae=D.getAttribute("data-issue-id");if(ae===K)return;let ke=w.findIndex(st=>st.id===ae);ke>=0&&(V=ke)}let me=w.slice();me.splice(V,0,L),T.applyReorder(K,me,V)}function ct(){for(let S of Array.from(e.querySelectorAll(".board-column--drag-over")))S.classList.remove("board-column--drag-over")}let Ge=null;e.addEventListener("dragover",S=>{S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect="move");let _e=S.target.closest(".board-column");_e&&_e!==Ge&&(Ge&&Ge.classList.remove("board-column--drag-over"),_e.classList.add("board-column--drag-over"),Ge=_e)}),e.addEventListener("dragleave",S=>{let K=S.relatedTarget;(!K||!e.contains(K))&&Ge&&(Ge.classList.remove("board-column--drag-over"),Ge=null)}),e.addEventListener("drop",S=>{S.preventDefault(),Ge&&(Ge.classList.remove("board-column--drag-over"),Ge=null);let K=S.target,_e=K.closest(".board-column");if(!_e)return;let x=S.dataTransfer?.getData("text/plain")||"";if(!x)return;let L=_e.id,w=re.get(x);if(w&&w===L){if(v_.has(L)){if(C!=="manual"){le("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ot(L,x,K)}return}let D=y_[L];if(!D){le("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}F.get(x)!==D&&yt(x,D)}),e.addEventListener("keydown",S=>{let K=S.target;if(!(K instanceof HTMLElement))return;let _e=String(K.tagName||"").toLowerCase();if(_e==="input"||_e==="textarea"||_e==="select"||_e==="button"||_e==="a"||K.isContentEditable===!0)return;let x=K.closest(".board-card");if(!x)return;let L=String(S.key||"");if(L==="Enter"||L===" "){S.preventDefault();let me=x.getAttribute("data-issue-id");me&&r(me);return}if(L!=="ArrowUp"&&L!=="ArrowDown"&&L!=="ArrowLeft"&&L!=="ArrowRight")return;S.preventDefault();let w=x.closest(".board-column");if(!w)return;let D=Array.from(w.querySelectorAll(".board-card")),V=D.indexOf(x);if(L==="ArrowDown"&&V<D.length-1){Ee(x,D[V+1]);return}if(L==="ArrowUp"&&V>0){Ee(x,D[V-1]);return}if(L==="ArrowLeft"||L==="ArrowRight"){let me=Array.from(e.querySelectorAll(".board-column")),ae=me.indexOf(w),ke=L==="ArrowRight"?1:-1,st=ae+ke;for(;st>=0&&st<me.length;){let Ze=me[st].querySelector(".board-card");if(Ze){Ee(x,Ze);return}st+=ke}}});function Ee(S,K){try{S.tabIndex=-1,K.tabIndex=0,K.focus()}catch{}}let M=null;k&&k.subscribe&&(M=k.subscribe(()=>{try{Y()}catch{}}));let X=null;i&&i.subscribe&&(X=i.subscribe(()=>{try{Y()}catch{}}));let ue=null;return c&&c.subscribe&&(ue=c.subscribe(()=>{ft()})),{async load(){n("load"),Y()},clear(){Qe(),We(),M&&(M(),M=null),X&&(X(),X=null),ue&&(ue(),ue=null),e.replaceChildren(),j=[],W=[],Z=[],ce=[],z=[],q=[],F=new Map,re=new Map}}}function ns(e,t){return e.filter(n=>{let r=eo(n);return!(r&&t.has(r))})}async function k_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function fn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function mr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function rs(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function $_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${mr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${mr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(c=>{let u=p=>{typeof n.close=="function"&&n.close(),n.remove(),c(p)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Dn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await $_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var x_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Dc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},A_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function qt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Tt(e){return typeof e=="string"&&e.length>0?e:null}function Pr(e){return e.startsWith("gpt-")?e.slice(4):e}function $t(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Nc(e,t,n){let r=Tt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Tt(n[e]);return s===null?null:{value:s,source:"global"}}function ss(e,t,n,r){return Nc(e,t,n)||{value:r,source:"base"}}function Ua(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&qt(s?.[t])){let a=Tt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&qt(s)){for(let a of Object.values(s))if(qt(a)){let i=Tt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Tt(r?.runners?.[o]?.models?.[e]?.id)||e}function S_(e,t){return Tt(t?.review?.reviewers?.[e]?.model)||e}function Dr(e,t,n=!1){if(e==="default")return $t(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Pr(e):e;return $t(e,t,r,e,"explicit")}function qc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];qt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(qt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function E_(e,t){let n=[],r=e?.implementation?.model_catalog;qt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(qt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function T_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of E_(t,n)){let o=qc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Wa(e){return $t(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Mc(e,t,n){let r=Nc(e,t,n);return r?Dr(r.value,r.source):$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function on(e){let t=qt(e.pin)?e.pin:{},n=qt(e.global)?e.global:{},r=qt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&qt(r.session)?r.session:null,o=r?.supported===!0&&qt(r.orchestration)?r.orchestration:null,a=qt(e.runner_catalog)?e.runner_catalog:null,i=Tt(n.quick_fix_impl_model),c=T_(i,s,a),u={};if(s){let p=ss("workflow_mode",t,n,Tt(s.workflow_mode_default));u.workflow_mode=p.source==="base"?$t(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):Dr(p.value,p.source);for(let z of["spec_review","plan_review","impl_review"]){let q=`${z}_model`,N=Tt(z==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),H=ss(q,t,n,N);if(H.value===null)u[q]=$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(H.value!=="self"&&H.value!=="skip"&&!qt(s.review?.reviewers?.[H.value]))u[q]=Wa($t(H.value,H.source,"",null,"explicit"));else{let C=S_(H.value,s);u[q]=$t(H.value,H.source,Pr(C),C,H.source==="base"?"default":"explicit")}}for(let[z,q]of Object.entries(Dc)){let N=u[q].value;if(N==="self"||N==="skip"){u[z]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let H=Tt(s.review?.reviewers?.[N||""]?.effort),C=ss(z,t,n,H);u[z]=C.value===null?$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):$t(C.value,C.source,C.value,C.value,C.source==="base"?"default":"explicit")}let b=qt(s.implementation?.default)?s.implementation.default:{},h=Tt(e.route),k=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),T=qt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},j=k&&qt(T[h])?T[h]:{};for(let z of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=ss(z,t,n,z==="impl_dispatch"?Tt(j.dispatch)||Tt(b.dispatch):Tt(b[z.replace("impl_","")]));u[z]=q.value===null?$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):$t(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let W=Tt(t.impl_runtime),Z=W==="inherit"?Tt(e.controller_runtime):W,ce=h==="quick_fix"&&Tt(t.impl_dispatch)===null&&c.runtime!==null&&(W===null||Z===c.runtime);if(ce){let z=c.runtime,q=i;u.impl_dispatch=$t("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),W===null&&(u.impl_runtime=$t(z,"global",`${z} (\uC720\uB3C4)`,z,"explicit")),Tt(t.impl_model)===null&&(u.impl_model=$t(q,"global",q,q,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let z of["impl_runtime","impl_model","impl_effort","impl_speed"])u[z]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ce&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let z=u.impl_runtime.value==="inherit"?Tt(e.controller_runtime):u.impl_runtime.value,q=z?qc(z,s,a):[];if(u.impl_model.value!=="auto"&&q.length>0&&!q.includes(u.impl_model.value))u.impl_model=Wa(u.impl_model);else{let N=Ua(u.impl_model.value,z,s,a);u.impl_model.display=Pr(N),u.impl_model.full_value=N}}if(u.impl_effort.value==="auto"){let z=Tt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),q=z?Tt(s.implementation?.effort_by_transport?.[z]?.auto):null;q&&!A_.has(q)?(u.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=q,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?$t("default","base","default (\uC77C\uBC18)","default","default"):Dr("default",u.impl_speed.source))}}else for(let p of x_.filter(b=>!b.startsWith("orchestration_")))u[p]=Mc(p,t,n);if(!s){for(let[p,b]of Object.entries(Dc))(u[b].value==="self"||u[b].value==="skip")&&(u[p]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])u[p]=$t(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[p]=Mc(p,t,n);continue}let b=p.replace("orchestration_",""),h=Tt(o[b]),k=ss(p,t,n,h);if(p==="orchestration_effort"&&k.source==="base"){u[p]=$t(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(k.value===null){u[p]=$t(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let T=k.source==="base"?Tt(o.model_id)||k.value:Ua(k.value,null,s,a);u[p]=$t(k.value,k.source,Pr(T),T,k.source==="base"?"default":"explicit");continue}if(k.value==="default"){u[p]=k.source==="base"?$t("default","base","default (\uC77C\uBC18)","default","default"):Dr("default",k.source);continue}u[p]=Dr(k.value,k.source)}if(s)if(i===null){let p=u.orchestration_model.full_value;u.quick_fix_impl_model=$t(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Pr(p)})`,null,"default")}else if(c.runtime!==null){let p=Ua(i,c.runtime,s,a);u.quick_fix_impl_model=$t(i,"global",Pr(p),p,"explicit")}else c.offered?u.quick_fix_impl_model=Wa($t(i,"global","",null,"explicit")):u.quick_fix_impl_model=Dr(i,"global");return u}function C_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function uo(e){let t=qt(e.pin)?e.pin:{},n=qt(e.global)?e.global:{},r=qt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=b=>{let h={...r,...b};return on({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],u=Tt(o[e.key]),p=[...e.choices];return u!==null&&!p.includes(u)&&p.unshift(u),{unset_label:C_(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:p.map(b=>{let h=s({...o,[e.key]:b})[e.key];return{value:b,label:h.display,full_value:h.full_value}})}}function Mr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let c=!1,u=b=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(b))},p=()=>u(r.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",b=>{b.key==="Enter"&&(b.ctrlKey||b.metaKey)&&(b.preventDefault(),p())}),t.addEventListener("cancel",b=>{b.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Wc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Bt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Mn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],os=[...Mn,"reasoning_output_tokens"],R_={codex:["implementation","review-consult"],claude:["subagent"]};function za(e){let t=0;for(let n of Mn)t+=Bt(e?.[n]);return t}function O_(e){return!e||typeof e!="object"?!1:Mn.some(t=>Number.isFinite(e[t]))}function Fc(e){return!e||typeof e!="object"?!1:os.some(t=>Number.isFinite(e[t]))}function L_(e){let t={};for(let n of os)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function jc(e){let t={};for(let n of os)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Bc(e,t){return e==="codex"?Bt(t.input_tokens)+Bt(t.output_tokens):za(t)}function I_(e){return e==="claude"?"Claude":"Codex"}function P_(e){return`\u03C4 ${zc(e)}`}function D_(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${Bt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Bt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${Bt(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Wc),o.join(`
`)}function zt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${I_(n)} ${P_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:D_(n,r)})}return t}function fo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of os)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=Bt(i.breakdown[c])+Bt(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ha(e){return!e||typeof e!="object"?null:hn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function M_(e){return e==="codex"?"codex":"claude"}function Rn(){return{subtotal:0,breakdown:L_(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function po(e,t,n){e.subtotal+=t.subtotal;for(let r of os)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Bt(e.breakdown[r])+Bt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Uc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function zc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Nr(e){return O_(e)?`\u03C4 ${zc(za(e))}`:null}function Nn(e){let t=Nr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function as(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Bt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Bt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${za(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Wc),n.join(`
`)}function hn(e,t){let n={claude:Rn(),codex:Rn()},r={orchestrator:{claude:Rn(),codex:Rn()},implementation:{claude:Rn(),codex:Rn()},"review-consult":{claude:Rn(),codex:Rn()},subagent:{claude:Rn(),codex:Rn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Fc(c)){let p=M_(i.runner),b=jc(c),h={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:b,subtotal:Bc(p,b)};b.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),po(n[p],h,!0),po(r.orchestrator[p],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of u){let b=p&&p.provider==="claude"?"claude":"codex";if(!p||p.provider!=="codex"&&p.provider!=="claude"||!R_[b].includes(p.role)||!Fc(p.usage))continue;let h=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let k=jc(p.usage),T={provider:b,role:p.role,attempt_id:String(i.attempt_id||""),usage:k,subtotal:Bc(b,k)};T.receipt_id=h,typeof p.agent_type=="string"&&(T.agent_type=p.agent_type),typeof p.agent_id=="string"&&(T.agent_id=p.agent_id),typeof p.model=="string"&&(T.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(T.effort=p.effort),typeof p.session_id=="string"?T.session_id=p.session_id:typeof p.thread_id=="string"&&(T.session_id=p.thread_id),typeof p.turn_id=="string"&&(T.turn_id=p.turn_id),(typeof p.completed_at=="string"||typeof p.completed_at=="number"&&Number.isFinite(p.completed_at))&&(T.completed_at=p.completed_at),k.replayed===!0&&(T.replayed=!0),po(n[b],T,!1),po(r[T.role][b],T,!1)}}let o={};for(let i of["claude","codex"]){let c=n[i];if(c.legs.length===0)continue;let u=Uc(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let c={};for(let u of["claude","codex"]){let p=r[i][u];p.legs.length>0&&(c[u]={...Uc(p,!0),legs:p.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:Jc,setPrototypeOf:Hc,isFrozen:N_,getPrototypeOf:q_,getOwnPropertyDescriptor:F_}=Object,{freeze:Qt,seal:yn,create:Qa}=Object,{apply:Ja,construct:ei}=typeof Reflect<"u"&&Reflect;Qt||(Qt=function(t){return t});yn||(yn=function(t){return t});Ja||(Ja=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});ei||(ei=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var _o=Jt(Array.prototype.forEach),j_=Jt(Array.prototype.lastIndexOf),Gc=Jt(Array.prototype.pop),is=Jt(Array.prototype.push),B_=Jt(Array.prototype.splice),go=Jt(String.prototype.toLowerCase),Ga=Jt(String.prototype.toString),Va=Jt(String.prototype.match),ls=Jt(String.prototype.replace),U_=Jt(String.prototype.indexOf),W_=Jt(String.prototype.trim),$n=Jt(Object.prototype.hasOwnProperty),Xt=Jt(RegExp.prototype.test),cs=z_(TypeError);function Jt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Ja(e,t,r)}}function z_(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ei(e,n)}}function ot(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:go;Hc&&Hc(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(N_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function H_(e){for(let t=0;t<e.length;t++)$n(e,t)||(e[t]=null);return e}function qn(e){let t=Qa(null);for(let[n,r]of Jc(e))$n(e,n)&&(Array.isArray(r)?t[n]=H_(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=qn(r):t[n]=r);return t}function us(e,t){for(;e!==null;){let r=F_(e,t);if(r){if(r.get)return Jt(r.get);if(typeof r.value=="function")return Jt(r.value)}e=q_(e)}function n(){return null}return n}var Vc=Qt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ka=Qt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ya=Qt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),G_=Qt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Za=Qt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),V_=Qt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Kc=Qt(["#text"]),Yc=Qt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Xa=Qt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Zc=Qt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),mo=Qt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),K_=yn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Y_=yn(/<%[\w\W]*|[\w\W]*%>/gm),Z_=yn(/\$\{[\w\W]*/gm),X_=yn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Q_=yn(/^aria-[\-\w]+$/),eu=yn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),J_=yn(/^(?:\w+script|data):/i),em=yn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),tu=yn(/^html$/i),tm=yn(/^[a-z][.\w]*(-[.\w]+)+$/i),Xc=Object.freeze({__proto__:null,ARIA_ATTR:Q_,ATTR_WHITESPACE:em,CUSTOM_ELEMENT:tm,DATA_ATTR:X_,DOCTYPE_NAME:tu,ERB_EXPR:Y_,IS_ALLOWED_URI:eu,IS_SCRIPT_OR_DATA:J_,MUSTACHE_EXPR:K_,TMPLIT_EXPR:Z_}),ds={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},nm=function(){return typeof window>"u"?null:window},rm=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Qc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function nu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:nm(),t=De=>nu(De);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ds.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:b,DOMParser:h,trustedTypes:k}=e,T=c.prototype,j=us(T,"cloneNode"),W=us(T,"remove"),Z=us(T,"nextSibling"),ce=us(T,"childNodes"),z=us(T,"parentNode");if(typeof a=="function"){let De=n.createElement("template");De.content&&De.content.ownerDocument&&(n=De.content.ownerDocument)}let q,N="",{implementation:H,createNodeIterator:C,createDocumentFragment:F,getElementsByTagName:re}=n,{importNode:Te}=r,ye=Qc();t.isSupported=typeof Jc=="function"&&typeof z=="function"&&H&&H.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:G,ERB_EXPR:ee,TMPLIT_EXPR:ve,DATA_ATTR:Ae,ARIA_ATTR:ge,IS_SCRIPT_OR_DATA:se,ATTR_WHITESPACE:Se,CUSTOM_ELEMENT:we}=Xc,{IS_ALLOWED_URI:Y}=Xc,Q=null,$e=ot({},[...Vc,...Ka,...Ya,...Za,...Kc]),be=null,je=ot({},[...Yc,...Xa,...Zc,...mo]),oe=Object.seal(Qa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ve=null,pt=null,rt=Object.seal(Qa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),O=!0,de=!0,he=!1,Ie=!0,Ne=!1,ze=!0,He=!1,at=!1,bt=!1,ne=!1,te=!1,Pe=!1,Qe=!0,Le=!1,xe="user-content-",We=!0,Ye=!1,et={},Xe=null,ft=ot({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ct=null,yt=ot({},["audio","video","img","source","image","track"]),_t=null,Ot=ot({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ct="http://www.w3.org/1998/Math/MathML",Ge="http://www.w3.org/2000/svg",Ee="http://www.w3.org/1999/xhtml",M=Ee,X=!1,ue=null,S=ot({},[ct,Ge,Ee],Ga),K=ot({},["mi","mo","mn","ms","mtext"]),_e=ot({},["annotation-xml"]),x=ot({},["title","style","font","a","script"]),L=null,w=["application/xhtml+xml","text/html"],D="text/html",V=null,me=null,ae=n.createElement("form"),ke=function(I){return I instanceof RegExp||I instanceof Function},st=function(){let I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(me&&me===I)){if((!I||typeof I!="object")&&(I={}),I=qn(I),L=w.indexOf(I.PARSER_MEDIA_TYPE)===-1?D:I.PARSER_MEDIA_TYPE,V=L==="application/xhtml+xml"?Ga:go,Q=$n(I,"ALLOWED_TAGS")?ot({},I.ALLOWED_TAGS,V):$e,be=$n(I,"ALLOWED_ATTR")?ot({},I.ALLOWED_ATTR,V):je,ue=$n(I,"ALLOWED_NAMESPACES")?ot({},I.ALLOWED_NAMESPACES,Ga):S,_t=$n(I,"ADD_URI_SAFE_ATTR")?ot(qn(Ot),I.ADD_URI_SAFE_ATTR,V):Ot,Ct=$n(I,"ADD_DATA_URI_TAGS")?ot(qn(yt),I.ADD_DATA_URI_TAGS,V):yt,Xe=$n(I,"FORBID_CONTENTS")?ot({},I.FORBID_CONTENTS,V):ft,Ve=$n(I,"FORBID_TAGS")?ot({},I.FORBID_TAGS,V):qn({}),pt=$n(I,"FORBID_ATTR")?ot({},I.FORBID_ATTR,V):qn({}),et=$n(I,"USE_PROFILES")?I.USE_PROFILES:!1,O=I.ALLOW_ARIA_ATTR!==!1,de=I.ALLOW_DATA_ATTR!==!1,he=I.ALLOW_UNKNOWN_PROTOCOLS||!1,Ie=I.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ne=I.SAFE_FOR_TEMPLATES||!1,ze=I.SAFE_FOR_XML!==!1,He=I.WHOLE_DOCUMENT||!1,ne=I.RETURN_DOM||!1,te=I.RETURN_DOM_FRAGMENT||!1,Pe=I.RETURN_TRUSTED_TYPE||!1,bt=I.FORCE_BODY||!1,Qe=I.SANITIZE_DOM!==!1,Le=I.SANITIZE_NAMED_PROPS||!1,We=I.KEEP_CONTENT!==!1,Ye=I.IN_PLACE||!1,Y=I.ALLOWED_URI_REGEXP||eu,M=I.NAMESPACE||Ee,K=I.MATHML_TEXT_INTEGRATION_POINTS||K,_e=I.HTML_INTEGRATION_POINTS||_e,oe=I.CUSTOM_ELEMENT_HANDLING||{},I.CUSTOM_ELEMENT_HANDLING&&ke(I.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(oe.tagNameCheck=I.CUSTOM_ELEMENT_HANDLING.tagNameCheck),I.CUSTOM_ELEMENT_HANDLING&&ke(I.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(oe.attributeNameCheck=I.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),I.CUSTOM_ELEMENT_HANDLING&&typeof I.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(oe.allowCustomizedBuiltInElements=I.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ne&&(de=!1),te&&(ne=!0),et&&(Q=ot({},Kc),be=[],et.html===!0&&(ot(Q,Vc),ot(be,Yc)),et.svg===!0&&(ot(Q,Ka),ot(be,Xa),ot(be,mo)),et.svgFilters===!0&&(ot(Q,Ya),ot(be,Xa),ot(be,mo)),et.mathMl===!0&&(ot(Q,Za),ot(be,Zc),ot(be,mo))),I.ADD_TAGS&&(typeof I.ADD_TAGS=="function"?rt.tagCheck=I.ADD_TAGS:(Q===$e&&(Q=qn(Q)),ot(Q,I.ADD_TAGS,V))),I.ADD_ATTR&&(typeof I.ADD_ATTR=="function"?rt.attributeCheck=I.ADD_ATTR:(be===je&&(be=qn(be)),ot(be,I.ADD_ATTR,V))),I.ADD_URI_SAFE_ATTR&&ot(_t,I.ADD_URI_SAFE_ATTR,V),I.FORBID_CONTENTS&&(Xe===ft&&(Xe=qn(Xe)),ot(Xe,I.FORBID_CONTENTS,V)),We&&(Q["#text"]=!0),He&&ot(Q,["html","head","body"]),Q.table&&(ot(Q,["tbody"]),delete Ve.tbody),I.TRUSTED_TYPES_POLICY){if(typeof I.TRUSTED_TYPES_POLICY.createHTML!="function")throw cs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof I.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw cs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=I.TRUSTED_TYPES_POLICY,N=q.createHTML("")}else q===void 0&&(q=rm(k,s)),q!==null&&typeof N=="string"&&(N=q.createHTML(""));Qt&&Qt(I),me=I}},Ze=ot({},[...Ka,...Ya,...G_]),Ce=ot({},[...Za,...V_]),ut=function(I){let fe=z(I);(!fe||!fe.tagName)&&(fe={namespaceURI:M,tagName:"template"});let Re=go(I.tagName),tt=go(fe.tagName);return ue[I.namespaceURI]?I.namespaceURI===Ge?fe.namespaceURI===Ee?Re==="svg":fe.namespaceURI===ct?Re==="svg"&&(tt==="annotation-xml"||K[tt]):!!Ze[Re]:I.namespaceURI===ct?fe.namespaceURI===Ee?Re==="math":fe.namespaceURI===Ge?Re==="math"&&_e[tt]:!!Ce[Re]:I.namespaceURI===Ee?fe.namespaceURI===Ge&&!_e[tt]||fe.namespaceURI===ct&&!K[tt]?!1:!Ce[Re]&&(x[Re]||!Ze[Re]):!!(L==="application/xhtml+xml"&&ue[I.namespaceURI]):!1},it=function(I){is(t.removed,{element:I});try{z(I).removeChild(I)}catch{W(I)}},Ft=function(I,fe){try{is(t.removed,{attribute:fe.getAttributeNode(I),from:fe})}catch{is(t.removed,{attribute:null,from:fe})}if(fe.removeAttribute(I),I==="is")if(ne||te)try{it(fe)}catch{}else try{fe.setAttribute(I,"")}catch{}},jt=function(I){let fe=null,Re=null;if(bt)I="<remove></remove>"+I;else{let mt=Va(I,/^[\r\n\t ]+/);Re=mt&&mt[0]}L==="application/xhtml+xml"&&M===Ee&&(I='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+I+"</body></html>");let tt=q?q.createHTML(I):I;if(M===Ee)try{fe=new h().parseFromString(tt,L)}catch{}if(!fe||!fe.documentElement){fe=H.createDocument(M,"template",null);try{fe.documentElement.innerHTML=X?N:tt}catch{}}let At=fe.body||fe.documentElement;return I&&Re&&At.insertBefore(n.createTextNode(Re),At.childNodes[0]||null),M===Ee?re.call(fe,He?"html":"body")[0]:He?fe.documentElement:At},Gt=function(I){return C.call(I.ownerDocument||I,I,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Mt=function(I){return I instanceof b&&(typeof I.nodeName!="string"||typeof I.textContent!="string"||typeof I.removeChild!="function"||!(I.attributes instanceof p)||typeof I.removeAttribute!="function"||typeof I.setAttribute!="function"||typeof I.namespaceURI!="string"||typeof I.insertBefore!="function"||typeof I.hasChildNodes!="function")},Ut=function(I){return typeof i=="function"&&I instanceof i};function It(De,I,fe){_o(De,Re=>{Re.call(t,I,fe,me)})}let Kt=function(I){let fe=null;if(It(ye.beforeSanitizeElements,I,null),Mt(I))return it(I),!0;let Re=V(I.nodeName);if(It(ye.uponSanitizeElement,I,{tagName:Re,allowedTags:Q}),ze&&I.hasChildNodes()&&!Ut(I.firstElementChild)&&Xt(/<[/\w!]/g,I.innerHTML)&&Xt(/<[/\w!]/g,I.textContent)||I.nodeType===ds.progressingInstruction||ze&&I.nodeType===ds.comment&&Xt(/<[/\w]/g,I.data))return it(I),!0;if(!(rt.tagCheck instanceof Function&&rt.tagCheck(Re))&&(!Q[Re]||Ve[Re])){if(!Ve[Re]&&Nt(Re)&&(oe.tagNameCheck instanceof RegExp&&Xt(oe.tagNameCheck,Re)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(Re)))return!1;if(We&&!Xe[Re]){let tt=z(I)||I.parentNode,At=ce(I)||I.childNodes;if(At&&tt){let mt=At.length;for(let Rt=mt-1;Rt>=0;--Rt){let Pt=j(At[Rt],!0);Pt.__removalCount=(I.__removalCount||0)+1,tt.insertBefore(Pt,Z(I))}}}return it(I),!0}return I instanceof c&&!ut(I)||(Re==="noscript"||Re==="noembed"||Re==="noframes")&&Xt(/<\/no(script|embed|frames)/i,I.innerHTML)?(it(I),!0):(Ne&&I.nodeType===ds.text&&(fe=I.textContent,_o([G,ee,ve],tt=>{fe=ls(fe,tt," ")}),I.textContent!==fe&&(is(t.removed,{element:I.cloneNode()}),I.textContent=fe)),It(ye.afterSanitizeElements,I,null),!1)},qe=function(I,fe,Re){if(Qe&&(fe==="id"||fe==="name")&&(Re in n||Re in ae))return!1;if(!(de&&!pt[fe]&&Xt(Ae,fe))){if(!(O&&Xt(ge,fe))){if(!(rt.attributeCheck instanceof Function&&rt.attributeCheck(fe,I))){if(!be[fe]||pt[fe]){if(!(Nt(I)&&(oe.tagNameCheck instanceof RegExp&&Xt(oe.tagNameCheck,I)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(I))&&(oe.attributeNameCheck instanceof RegExp&&Xt(oe.attributeNameCheck,fe)||oe.attributeNameCheck instanceof Function&&oe.attributeNameCheck(fe,I))||fe==="is"&&oe.allowCustomizedBuiltInElements&&(oe.tagNameCheck instanceof RegExp&&Xt(oe.tagNameCheck,Re)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(Re))))return!1}else if(!_t[fe]){if(!Xt(Y,ls(Re,Se,""))){if(!((fe==="src"||fe==="xlink:href"||fe==="href")&&I!=="script"&&U_(Re,"data:")===0&&Ct[I])){if(!(he&&!Xt(se,ls(Re,Se,"")))){if(Re)return!1}}}}}}}return!0},Nt=function(I){return I!=="annotation-xml"&&Va(I,we)},Yt=function(I){It(ye.beforeSanitizeAttributes,I,null);let{attributes:fe}=I;if(!fe||Mt(I))return;let Re={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:be,forceKeepAttr:void 0},tt=fe.length;for(;tt--;){let At=fe[tt],{name:mt,namespaceURI:Rt,value:Pt}=At,Vt=V(mt),tn=Pt,wt=mt==="value"?tn:W_(tn);if(Re.attrName=Vt,Re.attrValue=wt,Re.keepAttr=!0,Re.forceKeepAttr=void 0,It(ye.uponSanitizeAttribute,I,Re),wt=Re.attrValue,Le&&(Vt==="id"||Vt==="name")&&(Ft(mt,I),wt=xe+wt),ze&&Xt(/((--!?|])>)|<\/(style|title|textarea)/i,wt)){Ft(mt,I);continue}if(Vt==="attributename"&&Va(wt,"href")){Ft(mt,I);continue}if(Re.forceKeepAttr)continue;if(!Re.keepAttr){Ft(mt,I);continue}if(!Ie&&Xt(/\/>/i,wt)){Ft(mt,I);continue}Ne&&_o([G,ee,ve],ln=>{wt=ls(wt,ln," ")});let nn=V(I.nodeName);if(!qe(nn,Vt,wt)){Ft(mt,I);continue}if(q&&typeof k=="object"&&typeof k.getAttributeType=="function"&&!Rt)switch(k.getAttributeType(nn,Vt)){case"TrustedHTML":{wt=q.createHTML(wt);break}case"TrustedScriptURL":{wt=q.createScriptURL(wt);break}}if(wt!==tn)try{Rt?I.setAttributeNS(Rt,mt,wt):I.setAttribute(mt,wt),Mt(I)?it(I):Gc(t.removed)}catch{Ft(mt,I)}}It(ye.afterSanitizeAttributes,I,null)},nt=function De(I){let fe=null,Re=Gt(I);for(It(ye.beforeSanitizeShadowDOM,I,null);fe=Re.nextNode();)It(ye.uponSanitizeShadowNode,fe,null),Kt(fe),Yt(fe),fe.content instanceof o&&De(fe.content);It(ye.afterSanitizeShadowDOM,I,null)};return t.sanitize=function(De){let I=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},fe=null,Re=null,tt=null,At=null;if(X=!De,X&&(De="<!-->"),typeof De!="string"&&!Ut(De))if(typeof De.toString=="function"){if(De=De.toString(),typeof De!="string")throw cs("dirty is not a string, aborting")}else throw cs("toString is not a function");if(!t.isSupported)return De;if(at||st(I),t.removed=[],typeof De=="string"&&(Ye=!1),Ye){if(De.nodeName){let Pt=V(De.nodeName);if(!Q[Pt]||Ve[Pt])throw cs("root node is forbidden and cannot be sanitized in-place")}}else if(De instanceof i)fe=jt("<!---->"),Re=fe.ownerDocument.importNode(De,!0),Re.nodeType===ds.element&&Re.nodeName==="BODY"||Re.nodeName==="HTML"?fe=Re:fe.appendChild(Re);else{if(!ne&&!Ne&&!He&&De.indexOf("<")===-1)return q&&Pe?q.createHTML(De):De;if(fe=jt(De),!fe)return ne?null:Pe?N:""}fe&&bt&&it(fe.firstChild);let mt=Gt(Ye?De:fe);for(;tt=mt.nextNode();)Kt(tt),Yt(tt),tt.content instanceof o&&nt(tt.content);if(Ye)return De;if(ne){if(te)for(At=F.call(fe.ownerDocument);fe.firstChild;)At.appendChild(fe.firstChild);else At=fe;return(be.shadowroot||be.shadowrootmode)&&(At=Te.call(r,At,!0)),At}let Rt=He?fe.outerHTML:fe.innerHTML;return He&&Q["!doctype"]&&fe.ownerDocument&&fe.ownerDocument.doctype&&fe.ownerDocument.doctype.name&&Xt(tu,fe.ownerDocument.doctype.name)&&(Rt="<!DOCTYPE "+fe.ownerDocument.doctype.name+`>
`+Rt),Ne&&_o([G,ee,ve],Pt=>{Rt=ls(Rt,Pt," ")}),q&&Pe?q.createHTML(Rt):Rt},t.setConfig=function(){let De=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};st(De),at=!0},t.clearConfig=function(){me=null,at=!1},t.isValidAttribute=function(De,I,fe){me||st({});let Re=V(De),tt=V(I);return qe(Re,tt,fe)},t.addHook=function(De,I){typeof I=="function"&&is(ye[De],I)},t.removeHook=function(De,I){if(I!==void 0){let fe=j_(ye[De],I);return fe===-1?void 0:B_(ye[De],fe,1)[0]}return Gc(ye[De])},t.removeHooks=function(De){ye[De]=[]},t.removeAllHooks=function(){ye=Qc()},t}var ru=nu();var Fn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},bo=e=>(...t)=>({_$litDirective$:e,values:t}),qr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ps=class extends qr{constructor(t){if(super(t),this.it=Lt,t.type!==Fn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Lt||t==null)return this._t=void 0,this.it=t;if(t===gn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ps.directiveName="unsafeHTML",ps.resultType=1;var su=bo(ps);function si(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var br=si();function du(e){br=e}var gs={exec:()=>null};function dt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(en.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var sm=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),en={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},om=/^(?:[ \t]*(?:\n|$))+/,am=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,im=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,bs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,lm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,oi=/(?:[*+-]|\d{1,9}[.)])/,pu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,fu=dt(pu).replace(/bull/g,oi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),cm=dt(pu).replace(/bull/g,oi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ai=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,um=/^[^\n]+/,ii=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,dm=dt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ii).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),pm=dt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,oi).getRegex(),$o="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",li=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,fm=dt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",li).replace("tag",$o).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),_u=dt(ai).replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex(),_m=dt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",_u).getRegex(),ci={blockquote:_m,code:am,def:dm,fences:im,heading:lm,hr:bs,html:fm,lheading:fu,list:pm,newline:om,paragraph:_u,table:gs,text:um},ou=dt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex(),mm={...ci,lheading:cm,table:ou,paragraph:dt(ai).replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ou).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex()},gm={...ci,html:dt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",li).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:gs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:dt(ai).replace("hr",bs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",fu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},bm=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,hm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,mu=/^( {2,}|\\)\n(?!\s*$)/,ym=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,xo=/[\p{P}\p{S}]/u,ui=/[\s\p{P}\p{S}]/u,gu=/[^\s\p{P}\p{S}]/u,vm=dt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ui).getRegex(),bu=/(?!~)[\p{P}\p{S}]/u,wm=/(?!~)[\s\p{P}\p{S}]/u,km=/(?:[^\s\p{P}\p{S}]|~)/u,$m=dt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",sm?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),hu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,xm=dt(hu,"u").replace(/punct/g,xo).getRegex(),Am=dt(hu,"u").replace(/punct/g,bu).getRegex(),yu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Sm=dt(yu,"gu").replace(/notPunctSpace/g,gu).replace(/punctSpace/g,ui).replace(/punct/g,xo).getRegex(),Em=dt(yu,"gu").replace(/notPunctSpace/g,km).replace(/punctSpace/g,wm).replace(/punct/g,bu).getRegex(),Tm=dt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,gu).replace(/punctSpace/g,ui).replace(/punct/g,xo).getRegex(),Cm=dt(/\\(punct)/,"gu").replace(/punct/g,xo).getRegex(),Rm=dt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Om=dt(li).replace("(?:-->|$)","-->").getRegex(),Lm=dt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Om).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),vo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Im=dt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",vo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),vu=dt(/^!?\[(label)\]\[(ref)\]/).replace("label",vo).replace("ref",ii).getRegex(),wu=dt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ii).getRegex(),Pm=dt("reflink|nolink(?!\\()","g").replace("reflink",vu).replace("nolink",wu).getRegex(),au=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,di={_backpedal:gs,anyPunctuation:Cm,autolink:Rm,blockSkip:$m,br:mu,code:hm,del:gs,emStrongLDelim:xm,emStrongRDelimAst:Sm,emStrongRDelimUnd:Tm,escape:bm,link:Im,nolink:wu,punctuation:vm,reflink:vu,reflinkSearch:Pm,tag:Lm,text:ym,url:gs},Dm={...di,link:dt(/^!?\[(label)\]\((.*?)\)/).replace("label",vo).getRegex(),reflink:dt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",vo).getRegex()},ti={...di,emStrongRDelimAst:Em,emStrongLDelim:Am,url:dt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",au).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:dt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",au).getRegex()},Mm={...ti,br:dt(mu).replace("{2,}","*").getRegex(),text:dt(ti.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ho={normal:ci,gfm:mm,pedantic:gm},fs={normal:di,gfm:ti,breaks:Mm,pedantic:Dm},Nm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},iu=e=>Nm[e];function jn(e,t){if(t){if(en.escapeTest.test(e))return e.replace(en.escapeReplace,iu)}else if(en.escapeTestNoEncode.test(e))return e.replace(en.escapeReplaceNoEncode,iu);return e}function lu(e){try{e=encodeURI(e).replace(en.percentDecode,"%")}catch{return null}return e}function cu(e,t){let n=e.replace(en.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),r=n.split(en.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(en.slashPipe,"|");return r}function _s(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function qm(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function uu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,c}function Fm(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var wo=class{constructor(e){vt(this,"options");vt(this,"rules");vt(this,"lexer");this.options=e||br}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:_s(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Fm(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=_s(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:_s(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=_s(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))i.push(n[c]),a=!0;else if(!a)i.push(n[c]);else break;n=n.slice(c);let u=i.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${p}`:p;let b=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=b,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let k=h,T=k.raw+`
`+n.join(`
`),j=this.blockquote(T);o[o.length-1]=j,r=r.substring(0,r.length-k.raw.length)+j.raw,s=s.substring(0,s.length-k.text.length)+j.text;break}else if(h?.type==="list"){let k=h,T=k.raw+`
`+n.join(`
`),j=this.list(T);o[o.length-1]=j,r=r.substring(0,r.length-h.raw.length)+j.raw,s=s.substring(0,s.length-k.raw.length)+j.raw,n=T.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,u="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let b=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,j=>" ".repeat(3*j.length)),h=e.split(`
`,1)[0],k=!b.trim(),T=0;if(this.options.pedantic?(T=2,p=b.trimStart()):k?T=t[1].length+1:(T=t[2].search(this.rules.other.nonSpaceChar),T=T>4?1:T,p=b.slice(T),T+=t[1].length),k&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),c=!0),!c){let j=this.rules.other.nextBulletRegex(T),W=this.rules.other.hrRegex(T),Z=this.rules.other.fencesBeginRegex(T),ce=this.rules.other.headingBeginRegex(T),z=this.rules.other.htmlBeginRegex(T);for(;e;){let q=e.split(`
`,1)[0],N;if(h=q,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),N=h):N=h.replace(this.rules.other.tabCharGlobal,"    "),Z.test(h)||ce.test(h)||z.test(h)||j.test(h)||W.test(h))break;if(N.search(this.rules.other.nonSpaceChar)>=T||!h.trim())p+=`
`+N.slice(T);else{if(k||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Z.test(b)||ce.test(b)||W.test(b))break;p+=`
`+h}!k&&!h.trim()&&(k=!0),u+=q+`
`,e=e.substring(q.length+1),b=N.slice(T)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=p.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=p.raw+c.tokens[0].raw,c.tokens[0].text=p.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(p)):c.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):c.tokens.unshift(p)}}if(!s.loose){let u=c.tokens.filter(b=>b.type==="space"),p=u.length>0&&u.some(b=>this.rules.other.anyLine.test(b.raw));s.loose=p}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=cu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(cu(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=_s(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=qm(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),uu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return uu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,c=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let p=[...r[0]][0].length,b=e.slice(0,s+r.index+p+a);if(Math.min(s,a)%2){let k=b.slice(1,-1);return{type:"em",raw:b,text:k,tokens:this.lexer.inlineTokens(k)}}let h=b.slice(2,-2);return{type:"strong",raw:b,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},xn=class ni{constructor(t){vt(this,"tokens");vt(this,"options");vt(this,"state");vt(this,"inlineQueue");vt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||br,this.options.tokenizer=this.options.tokenizer||new wo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:en,block:ho.normal,inline:fs.normal};this.options.pedantic?(n.block=ho.pedantic,n.inline=fs.pedantic):this.options.gfm&&(n.block=ho.gfm,this.options.breaks?n.inline=fs.breaks:n.inline=fs.gfm),this.tokenizer.rules=n}static get rules(){return{block:ho,inline:fs}}static lex(t,n){return new ni(n).lex(t)}static lexInline(t,n){return new ni(n).inlineTokens(t)}lex(t){t=t.replace(en.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(en.tabCharGlobal,"    ").replace(en.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(p=>(c=p.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let p=n.at(-1);c.type==="text"&&p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,i)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let u=t;if(this.options.extensions?.startInline){let p=1/0,b=t.slice(1),h;this.options.extensions.startInline.forEach(k=>{h=k.call({lexer:this},b),typeof h=="number"&&h>=0&&(p=Math.min(p,h))}),p<1/0&&p>=0&&(u=t.substring(0,p+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):n.push(c);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},ko=class{constructor(e){vt(this,"options");vt(this,"parser");this.options=e||br}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(en.notSpaceStart)?.[0],s=e.replace(en.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${jn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=lu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+jn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=lu(e);if(s===null)return jn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${jn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:jn(e.text)}},pi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},An=class ri{constructor(t){vt(this,"options");vt(this,"renderer");vt(this,"textRenderer");this.options=t||br,this.options.renderer=this.options.renderer||new ko,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new pi}static parse(t,n){return new ri(n).parse(t)}static parseInline(t,n){return new ri(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},yo,ms=(yo=class{constructor(e){vt(this,"options");vt(this,"block");this.options=e||br}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?xn.lex:xn.lexInline}provideParser(){return this.block?An.parse:An.parseInline}},vt(yo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),vt(yo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),yo),jm=class{constructor(...e){vt(this,"defaults",si());vt(this,"options",this.setOptions);vt(this,"parse",this.parseMarkdown(!0));vt(this,"parseInline",this.parseMarkdown(!1));vt(this,"Parser",An);vt(this,"Renderer",ko);vt(this,"TextRenderer",pi);vt(this,"Lexer",xn);vt(this,"Tokenizer",wo);vt(this,"Hooks",ms);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new ko(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],c=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=c.apply(s,u)),p||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new wo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],c=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=c.apply(s,u)),p}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new ms;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],c=s[a];ms.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&ms.passThroughHooksRespectAsync.has(o))return(async()=>{let b=await i.call(s,u);return c.call(s,b)})();let p=i.call(s,u);return c.call(s,p)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let b=await i.apply(s,u);return b===!1&&(b=await c.apply(s,u)),b})();let p=i.apply(s,u);return p===!1&&(p=c.apply(s,u)),p}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return xn.lex(e,t??this.defaults)}parser(e,t){return An.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?xn.lex:xn.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?An.parse:An.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?xn.lex:xn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?An.parse:An.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+jn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},gr=new jm;function ht(e,t){return gr.parse(e,t)}ht.options=ht.setOptions=function(e){return gr.setOptions(e),ht.defaults=gr.defaults,du(ht.defaults),ht};ht.getDefaults=si;ht.defaults=br;ht.use=function(...e){return gr.use(...e),ht.defaults=gr.defaults,du(ht.defaults),ht};ht.walkTokens=function(e,t){return gr.walkTokens(e,t)};ht.parseInline=gr.parseInline;ht.Parser=An;ht.parser=An.parse;ht.Renderer=ko;ht.TextRenderer=pi;ht.Lexer=xn;ht.lexer=xn.lex;ht.Tokenizer=wo;ht.Hooks=ms;ht.parse=ht;var lw=ht.options,cw=ht.setOptions,uw=ht.use,dw=ht.walkTokens,pw=ht.parseInline;var fw=An.parse,_w=xn.lex;function Zn(e){let t=ht.parse(e),n=ru.sanitize(t);return su(n)}function Bn(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Fr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ao(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var $u={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Bm={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Um=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Wm=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function On(e){return!!e&&typeof e=="object"}function fi(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function _i(e,t){let n=fi(e),r=fi(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function xu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>On(s)&&typeof s.text=="string"?s.text:"").join(""):On(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function zm(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:$u[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=fi(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=_i(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let c=_i(On(i)?i.old_string:"",On(i)?i.new_string:"");s+=c.added,o+=c.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function mi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function gi(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Um.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Wm.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Hm(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Gm(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(On(a)){if(a.type==="text"&&typeof a.text=="string")o.push(gi(a.text));else if(a.type==="thinking"){let i=mi(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=zm(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?ku(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(On(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=xu(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?ku([s],n):[s]}return[]}function ku(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Vm(e){let t=typeof e.command=="string"?e.command:"",n=xu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:$u.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Km(e){if(e.type==="item.completed"&&On(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[gi(t.text)];if(t.type==="reasoning"){let n=mi(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Vm(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Ym(e){if(e.schema!=="codex-delegation-monitor-v1"||!On(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&On(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[gi(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=mi(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Bm[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Zm(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Xm(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return On(t)?t:null}function Au(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Xm(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Hm(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Ym(o):Zm(o)?Km(o):Gm(o,n);return a.length>0&&(r.progress=null),a}}}function bi(e){let t=[],n=Au(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Qm=5,Jm=10,eg=/Task\s+#(\d+)/,tg=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,ng=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function So(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function rg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function sg(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function og(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=eg.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function ag(e){if(e.tool==="Bash"){let t=e.command||"";return tg.test(t)?"~ PR/\uAC8C\uC2DC \uC911":ng.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ig(e){let t=e.filter(s=>s.kind==="tool").slice(-Jm),n=new Map;t.forEach((s,o)=>{let a=ag(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function lg(e){let t=sg(e);if(t)return{text:t,guess:!1};let n=og(e);if(n)return{text:n,guess:!1};let r=ig(e);return r?{text:r,guess:!0}:null}function cg(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:pn(e,t)}function jr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,c=null,u=!1,p={},b=!0,h=new Set,k=new Set,T=null,j=null,W=!1,Z=!1,ce=!1,z=null,q=null;function N(){W=!1,Z=!1,ce=!1,z=null,q=null}async function H(ne){if(n){Z=!0,ce=!1,oe();try{let te=await Promise.resolve(n("get-attempt-prompt",{attempt_id:ne,...c?{root_dir:c}:{}}));if(o!==ne)return;!te||typeof te!="object"||Array.isArray(te)?ce=!0:(z=te,q=ne)}catch{o===ne&&(ce=!0)}finally{o===ne&&(Z=!1,oe())}}}function C(){if(W=!W,W&&o&&q!==o){H(o);return}oe()}function F(){if(!W)return"";let ne=Fr({loading:Z,error:ce});if(ne)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${ne}
      </div>`;if(!z)return"";if(z.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let te=Ao(z.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${te?l`<div class="prompt-block__meta">${te} 발송</div>`:""}
      ${typeof z.task_prompt=="string"?Bn("\uACFC\uC5C5 (user)",z.task_prompt):""}
      ${typeof z.system_prompt=="string"?Bn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",z.system_prompt):""}
    </div>`}function re(){if(!i||!r)return[];let ne=r.get(i);return bi(ne?ne.lines:[])}function Te(){if(!i||!r)return null;let ne=r.get(i),te=ne?ne.last_event_at:null;return typeof te=="number"?te:null}function ye(){return p.status==="running"}function G(){if(ye()&&o){j||(j=setInterval(()=>oe(),1e3));return}ee()}function ee(){j&&(clearInterval(j),j=null)}function ve(ne){let te=[],Pe=0;for(;Pe<ne.length;){let{idx:Qe,line:Le}=ne[Pe];if(Le.kind==="tool"){let xe=Pe;for(;xe<ne.length&&ne[xe].line.kind==="tool"&&ne[xe].line.tool===Le.tool;)xe+=1;if(xe-Pe>=Qm&&!k.has(Qe)){te.push({kind:"group",idx:Qe,tool:Le.tool||"",lines:ne.slice(Pe,xe)}),Pe=xe;continue}}te.push({kind:"line",idx:Qe,line:Le}),Pe+=1}return te}function Ae(ne){let te=[],Pe=new Map;for(let xe=0;xe<ne.length;xe+=1){let We=ne[xe],Ye=We.parent_tool_use_id;if(typeof Ye=="string"&&Ye.length>0){let et=Pe.get(Ye);et||(et={kind:"subagent",idx:xe,launch_id:Ye,agent_type:null,header:null,lines:[]},Pe.set(Ye,et),te.push(et)),et.lines.push({idx:xe,line:We});continue}if(We.kind==="tool"&&We.tool==="Agent"&&typeof We.launch_id=="string"&&We.launch_id.length>0){let et=ge(We),Xe=Pe.get(We.launch_id);if(Xe){Xe.header={idx:xe,line:We},Xe.agent_type=et;continue}let ft={kind:"subagent",idx:xe,launch_id:We.launch_id,agent_type:et,header:{idx:xe,line:We},lines:[]};Pe.set(We.launch_id,ft),te.push(ft);continue}te.push({kind:"entry",idx:xe,line:We})}let Qe=[],Le=0;for(;Le<te.length;){if(te[Le].kind!=="entry"){Qe.push(te[Le]),Le+=1;continue}let xe=Le;for(;xe<te.length&&te[xe].kind==="entry";)xe+=1;Qe.push(...ve(te.slice(Le,xe))),Le=xe}return Qe}function ge(ne){let te=ne.input;return te&&typeof te.subagent_type=="string"?te.subagent_type:null}function se(ne){for(let te=ne.length-1;te>=0;te-=1){let Pe=ne[te];if(Pe.kind==="result"||Pe.kind==="error")return null;if(Pe.kind==="tool"&&!Object.hasOwn(Pe,"result"))return Pe}return null}function Se(ne){for(let te=ne.length-1;te>=0;te-=1)if(ne[te].kind==="thinking")return ne[te];return null}function we(ne,te){if(te.kind==="gate")return l`<div class="sv__gate">${te.text}</div>`;if(te.kind==="phase")return l`<div class="sv__phase">${te.text}</div>`;if(te.kind==="result")return l`<div
        class="sv__result${te.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${te.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Zn(te.text||(te.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(te.kind==="thinking"){let Pe=h.has(ne);return l`<div
        class="sv__think${Pe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>pt(ne)}
      >
        <span class="sv__think-line">💭 ${So(te.text)}</span>
        ${Pe?l`<pre class="sv__think-expand">${te.text}</pre>`:""}
      </div>`}if(te.kind==="error")return l`<div class="sv__error">⛔ ${te.text}</div>`;if(te.kind==="blocker")return l`<div class="sv__error">⛔ ${te.text}</div>`;if(te.kind==="tool"){let Pe=h.has(ne),Qe=te.tool==="Bash"?rg(te.command):0,Le=te.tool==="Bash"?Qe>1?So(te.command):te.command:te.path||te.command||"";return l`<div
        class="sv__tool${Pe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>pt(ne)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${te.icon}</span>
          <span class="sv__tool-name">${te.tool}</span>
          ${Le?l`<span class="sv__tool-detail">${Le}</span>`:""}
          ${Qe>1?l`<span class="sv__tool-more">⋯ ${Qe}줄</span>`:""}
          ${typeof te.added=="number"?l`<span class="sv__diff-add">+${te.added}</span>`:""}
          ${typeof te.removed=="number"?l`<span class="sv__diff-del">−${te.removed}</span>`:""}
          ${te.result?l`<span class="sv__tool-ok">→ ${te.result}</span>`:""}
        </span>
        ${Pe?l`<pre class="sv__tool-expand">${Y(te)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Zn(te.text||"")}</div>`}function Y(ne){let te=[];if(ne.tool==="Bash"&&typeof ne.command=="string"&&ne.command.length>0)te.push(ne.command);else if(ne.input!==void 0)try{te.push(`input: ${JSON.stringify(ne.input,null,2)}`)}catch{}return typeof ne.output=="string"&&ne.output.length>0&&te.push(`output:
${ne.output}`),te.join(`

`)}function Q(){if(!o)return l``;let ne=re(),te=(a?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),Pe=p.session_id||"",Qe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${b?"ON":"OFF"}`,Le=ye(),xe=Le?cg(Te(),Date.now()):"",We=Le?se(ne):null,Ye=Le?Se(ne):null,et=lg(ne);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?p.role||"":o}</span>
        ${et?l`<span
              class="sv__stage${et.guess?" sv__stage--guess":""}"
              title=${et.text}
              >${et.text}</span
            >`:""}
        ${Le?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${xe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${xe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${xe?l`<span class="sv__live-ago">${xe}</span>`:""}</span
            >`:""}
        ${Pe?l`<button
              type="button"
              class="sv__session"
              title=${Pe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Pe}`}
              @click=${()=>O(Pe)}
            >
              ⧉ ${Pe.slice(0,8)}
            </button>`:""}
        ${te?l`<span class="sv__meta">${te}</span>`:""}
        ${p.worktree?l`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${a||u?"":l`<button
              type="button"
              class="sv__prompt-toggle${W?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${W?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${C}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${b?" sv__follow--on":""}"
          aria-pressed=${b?"true":"false"}
          aria-label=${Qe}
          @click=${rt}
        >
          <span class="sv__follow-full">⇣ ${Qe}</span>
          <span class="sv__follow-short">⇣ ${b?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>bt()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":F()}
      <div class="sv__body">
        ${ne.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:Ae(ne).map(Xe=>Xe.kind==="subagent"?be(Xe):Xe.kind==="group"?$e(Xe):we(Xe.idx,Xe.line))}
      </div>
      ${We||Ye?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${We?l`<span class="sv__now-icon">${We.icon}</span>
                  <span class="sv__now-name">${We.tool}</span>
                  <span class="sv__now-detail"
                    >${We.tool==="Bash"?So(We.command):We.path||We.command||""}</span
                  >`:""}
            ${Ye?l`<span class="sv__now-think"
                  >💭 ${So(Ye.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function $e(ne){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>je(ne.idx)}
    >
      <span class="sv__group-icon">${ne.lines[0].line.icon}</span>
      <span class="sv__group-name">${ne.tool}</span>
      <span class="sv__group-count">${ne.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function be(ne){let te=k.has(ne.idx),Pe=ne.header?ne.header.line:null,Qe=Pe?Pe.is_error===!0?"\u2717":typeof Pe.result=="string"?"\u2713":"\u27F3":"",Le=Pe&&Pe.command?Pe.command:"";return l`<div class="sv__sub${te?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>je(ne.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${ne.agent_type||"subagent"}</span>
        ${Le?l`<span class="sv__sub-detail">${Le}</span>`:""}
        <span class="sv__sub-count">${ne.lines.length}줄</span>
        ${Qe?l`<span class="sv__sub-state">${Qe}</span>`:""}
        ${te?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${te?l`<div class="sv__sub-body">
            ${ve(ne.lines).map(xe=>xe.kind==="group"?$e(xe):we(xe.idx,xe.line))}
          </div>`:""}
    </div>`}function je(ne){k.add(ne),oe()}function oe(){Ke(Q(),e),G(),b&&Ve()}function Ve(){let ne=e.querySelector(".sv__body");ne&&(ne.scrollTop=ne.scrollHeight)}function pt(ne){h.has(ne)?h.delete(ne):h.add(ne),oe()}function rt(){b=!b,oe()}function O(ne){fn(ne).then(te=>{te?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function de(ne){!o||!ne||(p={...p,...ne},oe())}function he(ne){let te=ne.target;if(!te||!te.classList||!te.classList.contains("sv__body"))return;!(te.scrollHeight-te.scrollTop-te.clientHeight<=4)&&b&&(b=!1,oe())}e.addEventListener("scroll",he,!0);function Ie(ne){let te=ne.target;!te||typeof te.closest!="function"||e.contains(te)||te.closest("dialog")||te.closest(".md-viewer-root")||bt()}let Ne=!1;function ze(){Ne||(document.addEventListener("mousedown",Ie),Ne=!0)}function He(){Ne&&(document.removeEventListener("mousedown",Ie),Ne=!1)}function at(ne){let te=ne&&ne.attempt_id;if(!te)return;let Pe=i;o=te,a=typeof ne.launch_id=="string"&&ne.launch_id.length>0?ne.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Pe&&Pe!==i&&Promise.resolve(n("unsubscribe-session-log",{id:Pe})).catch(()=>{}),c=typeof ne.root_dir=="string"&&ne.root_dir.length>0?ne.root_dir:null,p=ne.meta||{},u=ne.hide_prompt===!0,b=!0,h.clear(),k.clear(),N(),!T&&r&&(T=r.subscribe(oe)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),ze(),oe()}function bt(){let ne=i;He(),o=null,a=null,i=null,c=null,u=!1,h.clear(),k.clear(),N(),ee(),n&&ne&&Promise.resolve(n("unsubscribe-session-log",{id:ne})).catch(()=>{}),Ke(l``,e),s&&s()}return{open:at,updateMeta:de,close:bt,isOpen(){return o!==null},destroy(){ee(),He(),T&&(T(),T=null),e.removeEventListener("scroll",he,!0),o=null,a=null,i=null,c=null,u=!1,Ke(l``,e)}}}function Eo(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=hi(t.spec_id),s=hi(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function hi(e){return typeof e=="string"?e.trim():""}function Su(e){let t=Eo(e);if(t.path)return t;let n=hi(ug(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function ug(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function dg(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function pg(e){let t=e&&e.metadata||{},n=Su(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:dg(t)?null:"plan_pending"}),r}function Eu(e,t){let n=pg(e);return l`
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
          ${Zn(t.body)}
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
      ${Zn(typeof e.text=="string"?e.text:"")}
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
  `}var{I:Yw}=Yl;var Ou=e=>e.strings===void 0;var yg={},Lu=(e,t=yg)=>e._$AH=t;var hr=bo(class extends qr{constructor(e){if(super(e),e.type!==Fn.PROPERTY&&e.type!==Fn.ATTRIBUTE&&e.type!==Fn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ou(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===gn||t===Lt)return t;let n=e.element,r=e.name;if(e.type===Fn.PROPERTY){if(t===n[r])return gn}else if(e.type===Fn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return gn}else if(e.type===Fn.ATTRIBUTE&&n.getAttribute(r)===t+"")return gn;return Lu(e),t}});var Co=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],vi=[...Co.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Un=["orchestration_model","orchestration_effort","orchestration_speed"],Ro=[...Co,...Un],vg=vi.filter(e=>Ro.includes(e)),Iu=["delegated","main"],Oo=["inherit","claude","codex"],hs=["default","fast"],ys=["standard","fast_track"],vs=["codex","opus","fable","self","skip"],Lo=["codex","fable","skip"],Io=["low","medium","high","xhigh"],mn="auto";function _n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Pu(e){if(!_n(e)||!_n(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))_n(r)&&_n(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Br(e,t){let n=Pu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[mn,...r.flatMap(([,s])=>s)]}function Du(e,t,n,r){if(!_n(e)||!_n(e.runners))return[mn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!_n(a)||!_n(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(n&&n!==mn&&i!==n)continue;let u=r(a,c);if(Array.isArray(u))for(let p of u)typeof p=="string"&&!s.includes(p)&&s.push(p)}return[mn,...s]}function Ur(e,t,n){return Du(e,t,n,(r,s)=>_n(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function wi(e,t,n){return Du(e,t,n,(r,s)=>_n(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:_n(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function ws(e,t){let n=Pu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Mu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Br(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Ur(t,s,r.impl_model||mn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var wg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},yi=[...vg,...Un],kg=[...Ro,...vi].filter((e,t,n)=>n.indexOf(e)===t&&!yi.includes(e));function Nu(e,t){let n=_n(e)?e:{},r=_n(t)?t:{},s=[];for(let a of yi){let i=n[a]??null,c=r[a]??null;i!==c&&s.push({key:a,label:wg[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...kg,...Object.keys(r)])!yi.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function ki(e,t,n,r,s,o){return uo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function qu(e,t){let n={};for(let r of vi){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Fu(e,t){let n={};for(let r of Un){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var $i=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Un]}],Xn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Po={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function xi(e,t,n,r,s,o=null){let a=on({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function ju(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of xi(e,t,n,r,s,o))a[i.source]+=1;return a}function Bu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Uu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var ak=[...Co,...Un];var $g=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Ai={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Wu={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},xg={pin:"pin",global:"global",base:"base"};function Ag(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${xg[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Sg(e,t,n){switch(e){case"workflow_mode":return ys;case"spec_review_model":case"impl_review_model":return vs;case"plan_review_model":return Lo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Io;case"impl_dispatch":return Iu;case"impl_runtime":return Oo;case"impl_model":return Br(n,t.impl_runtime);case"impl_effort":return Ur(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return hs;case"orchestration_model":return ws(n,null);case"orchestration_effort":return Ur(n,void 0,t.orchestration_model||mn).filter(r=>r!==mn);default:return[]}}function Eg(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
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
      >${Po[e.source]}</span
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
              ${r.filter(u=>c.keys.includes(u.key)).map(u=>{let p=uo({key:u.key,choices:Sg(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Eg(u,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${hr(e.preset_id)}
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
  </details>`}function Tg(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Cg(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Hu(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=Cg(n.exec_receipt),c=i?Pn(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],p=lo(n.planned_execution,n.exec_receipt),b=n.chips?.pr?.number,h=typeof b=="number"?`PR #${b}`:"PR";return l`<section class="detail-summary" data-seam="detail-summary">
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
            >${h}</a
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
      ${Rg(s).map(k=>Og(k,t,r,{label:k.id==="pr"?h:k.label,href:k.id==="pr"?o:""}))}
    </div>
  </section>`}function Rg(e){let n=typeof e=="string"&&Object.hasOwn(Ai,e)&&Ai[e]||Ai.spec_backed;return $g.filter(r=>n.includes(r.id))}var Do={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Og(e,t,n,r){let s=Lg(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,c=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,p=s&&s.split("@")[1]?.slice(0,7)||"",b=u?Do.stale:i?Do.on:c?Do.current:Do.none,h=Ig(e,n),k=`${r.label} \xB7 ${b}${h?` \xB7 ${h}`:""}${s?` \xB7 ${s}`:""}`,T=`detail-summary__gate${i?" detail-summary__gate--on":""}${c?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${p?" detail-summary__gate--receipt":""}`,j=l`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${p}</span>`;return r.href?l`<a
      class=${T}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${k}
      >${j}</a
    >`:l`<span
    class=${T}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${k}
    >${j}</span
  >`}function Lg(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Ig(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Wu,n)?Wu[n]:""}function Mo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Gu(e){return Mo(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Vu(e,t){let n=e&&e[t];if(!Mo(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Gu),s=Gu(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Zu(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function No(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Zu(e)}${t}`}function Wr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Zu(e)}`}function Pg(e,t,n){if(n!==null){let s=e==="claude"?No:Wr,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Wr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Ku(e,t){if(!Mo(e)||e.state!=="usable"||!Mo(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Yu(e){let t=e.provider_key==="claude"?No:Wr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
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
  </section>`}var Qu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function ks(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function qo(e){if(!ks(e)||!ks(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>ks(n)&&ks(n.models));return t.length>0?t:null}function Sn(e,t){let n=qo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Ju(e,t){return ks(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function ed(e,t){let n=qo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Ju(r,r.models[t]);return[]}function Dg(e){let t=qo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Ju(r,s))n.includes(o)||n.push(o);return n}function Mg(e,t){if(!t)return Dg(e);let r=qo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of ed(e,o))s.includes(a)||s.push(a);return s}function td(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=Sn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?ed(t,r.impl_model):Mg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function Ng(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function qg(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Fo(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function u(j){j.key==="Escape"&&s&&(j.preventDefault(),k())}document.addEventListener("keydown",u);function p(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>k()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ng(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>k()}
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
    `:l``}function b(){Ke(p(),e)}async function h(j,W={}){s=j,o="loading",a="",i=null,c="",b();let Z=W.workspace||(n?n():"");if(!Z){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",b();return}if(!r){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",b();return}let ce="/api/doc?workspace="+encodeURIComponent(Z)+"&path="+encodeURIComponent(j);try{let z=await r(ce),q=await z.json().catch(()=>({}));if(!z.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&W.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",b();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||z.status)+")",b();return}let N=qg(String(q.content||""));i=N.front,a=N.body,o="ready",b()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",b()}}function k(){s=null,Ke(l``,e)}function T(){document.removeEventListener("keydown",u),k()}return{open:h,close:k,destroy:T}}var Fg=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],sd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",jo=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],jg=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function nd(e){return typeof e=="string"&&jg.has(e)}var Bg=["running","done","failed","interrupted"],Ug={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Wg(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function zg(e){let t=zt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Nr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${sd}
          >부분 집계</span
        >`:""}`}function rd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ti(e){if(typeof e=="number")return Bo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Bo(t):""}function Hg(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Gg(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Si(e){return e===null||typeof e=="string"&&e.trim().length>0}function Ei(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Vg(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!jo.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Si(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Si(t.effort))||!(!("agent_type"in t)||Si(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Bg.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Ei(t.started_at)||!Ei(t.last_event_at)||!Ei(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Kg(e,t,n){let s=zt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
  </div>`}function Yg(e,t,n,r){let s=e.status==="running"?null:t,a=(s?zt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Bo(e.last_event_at):s?Ti(s.completed_at):"",c=(e.provider==="claude"?["Claude",e.agent_type,Hg(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Gg(e,s);return l`<button
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
  </button>`}function Zg(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Xg(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let b=Vg(p);!b||s.has(b.launch_id)||nd(b.agent_type)||(s.add(b.launch_id),r.push(b))}r.sort((p,b)=>(p.started_at||0)-(b.started_at||0));let a={};for(let{role:p,provider:b}of jo){let h=t?t.roles[p]?.[b]:null;a[p]=h?[...h.legs]:[]}let i=jo.flatMap(({role:p})=>a[p]),c=new Set,u=[];for(let{role:p,provider:b}of jo){for(let h of r.filter(k=>k.role===p&&k.provider===b)){let k=i.find(T=>T.receipt_id===h.launch_id)||null;k&&!Zg(h,k)||(k&&c.add(k.receipt_id),u.push(Yg(h,k,e.attempt_id,n)))}for(let h of a[p])!c.has(h.receipt_id)&&!nd(h.agent_type)&&u.push(Kg(p,b,h))}return u}function Qg(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Fg,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
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
    `;let o=new Set;for(let u of r)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let b=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),k=b&&!h,T=b?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!k}
      title=${T}
      @click=${j=>{j.stopPropagation(),k&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let b=u.cause_detail,h=b&&typeof b.reason=="string"&&b.reason.length>0?typeof b.command=="string"&&b.command.length>0?`${b.reason} \xB7 ${b.command}`:b.reason:u.cause;return l`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},c=u=>{let p=rd(Ha(u));if(zt(p).length===0&&!Nr(u.usage))return"";let b=s.has(u.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${b?"true":"false"}
      title=${b?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${zg(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(u=>{let p=Ha(u),b=rd(p),h=zt(b);return l`<div class="detail-session-row">
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
            ${rs(u)?l`<span
                  class="detail-session__resumed"
                  title=${rs(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${mr(u)}</span>
            ${h.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?l`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(k=>l`<span
                      class="detail-session__usage"
                      title=${k.tooltip}
                      >${k.label}</span
                    >`):Nr(u.usage)?l`<span class="detail-session__usage"
                    >${Nr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Bo(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${eb(u)}
          ${s.has(u.attempt_id)&&u.usage?Qg(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Xg(u,p,t)}
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
  `}function tb(e){let t=Fr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Bn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Ao(n.recorded_at);return l`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Bn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Bn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var nb=["open","in_progress","deferred","resolved","closed"],rb=[0,1,2,3,4];function id(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,p=null,b={},h="",k=!1,T=[],j=!1,W={},Z={claude:null,codex:null},ce=null,z=null,q=0,N=!1,H=!1,C="",F="",re="";function Te(){N=!1,H=!1,C="",F="",re=""}function ye(){Z={claude:null,codex:null},ce=null,z=null,q+=1}async function G(){if(!s)return null;try{let m=await Promise.resolve(s("get-workspace-accounts",{}));return m&&typeof m.state=="string"?m:null}catch{return null}}async function ee(m){try{let E=await fetch(m);if(!E.ok)return null;let A=await E.json();if(!A||typeof A!="object"||!Array.isArray(A.accounts))return null;let d=A.accounts.filter(_=>_!==null&&typeof _=="object"&&!Array.isArray(_));return{accounts:d,active:d.find(_=>_.active===!0)||null}}catch{return null}}async function ve(m){z=m;let E=++q,[A,d,_]=await Promise.all([ee("/api/claude-usage"),ee("/api/codex-usage"),G()]);E!==q||m!==u||(Z={claude:A,codex:d},ce=_,y())}let Ae=[],ge=null,se=null,Se=!1,we="",Y=!1,Q=0,$e=new Set;function be(){Ae=[],ge=null,se=null,Se=!1,we="",Y=!1,Q+=1,$e.clear()}async function je(m){if(!s)return;let E=++Q;try{let A=await Promise.resolve(s("get-comments",{id:m}));if(E!==Q||m!==u)return;Ae=Array.isArray(A)?A:[],Se=!1}catch{if(E!==Q||m!==u)return;Se=!0}y()}function oe(){if(!s||!u)return;let m=p&&typeof p.comment_count=="number"?p.comment_count:null;if(ge!==u){ge=u,se=m,je(u);return}m!==null&&m!==se&&(se=m,je(u))}function Ve(m){$e.has(m)?$e.delete(m):$e.add(m),y()}function pt(m){let E=we.trim().length===0;we=m,E!==(m.trim().length===0)&&y()}async function rt(){let m=we.trim();if(!s||!u||m.length===0||Y)return;let E=u;Y=!0,y();let A=!1;try{let d=await Promise.resolve(s("add-comment",{id:E,text:m}));Array.isArray(d)&&d.length>0&&(A=!0,E===u&&(Ae=d,Se=!1,we="",se=d.length))}catch{A=!1}A||le("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),E===u&&(Y=!1),y()}let O={onToggle:Ve,onDraftInput:pt,onSubmit:rt},de=t.mdViewer||null,he=null;de||(he=document.createElement("div"),he.className="md-viewer-root",document.body.appendChild(he));let Ie=de||Fo(he,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ne=document.createElement("div");Ne.className="session-log-root",document.body.appendChild(Ne);let ze=jr(Ne,{transport:s?(m,E)=>Promise.resolve(s(m,E)):void 0,sessionLogStore:c}),He=!1,at=!1,bt=!1,ne=null,te=null,Pe=0;function Qe(m){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${m}`}function Le(){He=!1,at=!1,bt=!1,ne=null,te=null,Pe+=1}async function xe(m){if(!s)return;let E=++Pe;at=!0,bt=!1,y();try{let A=await Promise.resolve(s("get-bead-prompt",{bead_id:m}));if(E!==Pe)return;!A||typeof A!="object"||Array.isArray(A)?bt=!0:(ne=A,te=Qe(m))}catch{E===Pe&&(bt=!0)}finally{E===Pe&&(at=!1,y())}}function We(){if(He=!He,He&&u&&te!==Qe(u)){ne=null,xe(u);return}y()}function Ye(){if(!a||!u)return[];let m=a.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter(A=>A&&A.bead_id===u).sort((A,d)=>(d.started_at||0)-(A.started_at||0)).map(A=>({attempt_id:A.attempt_id,bead_id:A.bead_id,status:A.status,started_at:typeof A.started_at=="number"?A.started_at:null,runner:A.runner||null,model:A.model||null,effort:A.effort||A.observed_effort||null,speed:A.speed||null,session_id:A.session_id||null,resumed_from:A.resumed_from||null,continuation_mode:A.continuation_mode||null,dismissed_at:typeof A.dismissed_at=="number"?A.dismissed_at:null,cause:typeof A.cause=="string"?A.cause:null,cause_detail:A.cause_detail||null,exec_default_preset_id:typeof A.exec_default_preset_id=="string"?A.exec_default_preset_id:null,exec_default_preset_revision:typeof A.exec_default_preset_revision=="number"?A.exec_default_preset_revision:null,exec_values:A.exec_values&&typeof A.exec_values=="object"?A.exec_values:null,usage:A.usage||null,usage_legs:Array.isArray(A.usage_legs)?A.usage_legs:[],delegation_sessions:Array.isArray(A.delegation_sessions)?A.delegation_sessions:[]}))}function et(){if(!a||!u)return null;let m=a.get();return hn(m&&m.attempts||{},u)}let Xe=new Set;function ft(m){Xe.has(m)?Xe.delete(m):Xe.add(m),y()}function Ct(m){let E=a?a.get():null,A=E&&E.attempts?E.attempts[m]:null;ze.open({attempt_id:m,meta:A?{runner:A.runner||void 0,model:A.model||void 0,effort:A.effort||void 0,status:A.status||void 0,session_id:A.session_id||void 0}:{}})}function yt(m,E){let A=a?a.get():null,d=A&&A.attempts?A.attempts[m]:null,v=(d&&Array.isArray(d.delegation_sessions)?d.delegation_sessions:[]).find($=>$&&typeof $=="object"&&$.launch_id===E);v&&ze.open({attempt_id:m,launch_id:E,meta:{runner:v.provider==="claude"?"claude":"codex",role:v.role,...typeof v.agent_type=="string"?{agent_type:v.agent_type}:{},model:v.model,effort:v.effort,session_id:v.session_id,status:v.status}})}async function _t(m){if(!s||!m)return;let E=await Mr();if(E===null)return;let A=()=>{let $=a?a.get():null;return $&&typeof $.revision=="number"?$.revision:0},d=async($={},B=A())=>await s("worker-attempt-resume",{attempt_id:m,expected_revision:B,...E!==""?{instructions:E}:{},...$}),_=$=>{$?.queue&&a?.set&&a.set($.queue)},v=await d();if(_(v),v&&v.conflict){let $=v.queue&&typeof v.queue.revision=="number"?v.queue.revision:A();v=await d({},$),_(v)}v=await Dn(v,($,B)=>d({continuation:$,decision_token:B}),{onResult:_,refresh:()=>d()}),v&&v.resumed===!1&&!v.conflict&&v.reason&&le(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}let Ot={onOpen:Ct,onOpenDelegation:yt,onResume:_t,onToggleUsage:ft};function ct(){let m=a?a.get():null,E={...W};for(let A of["orchestration_model","orchestration_effort","orchestration_speed"]){let d=m&&m[A];typeof d=="string"&&(E[A]=d)}return E}async function Ge(){if(s){try{let m=await Promise.resolve(s("get-session-defaults",{}));W=m&&m.values&&typeof m.values=="object"?m.values:{}}catch{W={}}y()}}function Ee(){let m=a?a.get():null;return m&&m.runner_catalog||null}function M(){let m=a?a.get():null;return m&&typeof m.execution_defaults=="object"?m.execution_defaults:null}function X(){let m=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},A=on({pin:{...m,...b},global:ct(),execution_defaults:M(),runner_catalog:Ee(),route:typeof m.route=="string"?m.route:null}).orchestration_model.value||"";return Sn(Ee(),A)}function ue(){let m=i?i.get():null;return!m||typeof m.revision!="number"?null:{revision:m.revision,presets:Array.isArray(m.presets)?m.presets:[]}}function S(m){return m?.compatible===!1}function K(m){i&&m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&i.set({revision:m.revision,presets:m.presets})}async function _e(){let m=ue(),E=m?.presets.find(A=>A.id===h);if(!(!s||!u||!m||!E||S(E)||k)){k=!0,T=[],y();try{let A=await Promise.resolve(s("apply-impl-preset",Uu(u,E.id,m.revision)));if(A&&A.conflict){K(A),le("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let d=A&&Array.isArray(A.issue)?A.issue[0]:A?.issue;if(A&&A.applied&&d&&typeof d=="object"){p=d,T=Array.isArray(A.skipped_orchestration_keys)?A.skipped_orchestration_keys.filter(_=>typeof _=="string"):[];for(let _ of Qu)delete b[_];le(T.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}A&&A.error==="bd_readback_failed"?le("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):le("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(A){A&&typeof A=="object"&&A.code==="bd_readback_failed"?le("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):le("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{k=!1,y()}}}let x=null;n&&n.subscribe&&(x=n.subscribe(()=>V()));let L=null;a&&typeof a.subscribe=="function"&&(L=a.subscribe(()=>{u&&y()}));let w=null;i&&typeof i.subscribe=="function"&&(w=i.subscribe(()=>{u&&y()}));function D(m){m.key==="Escape"&&u&&(m.preventDefault(),r())}document.addEventListener("keydown",D);function V(){if(u){if(n&&typeof n.snapshotFor=="function"){let m=n.snapshotFor("detail:"+u)||[];p=m.find(A=>A&&A.id===u)||m[0]||p}oe(),y()}}function me(m){fn(m).then(E=>{E?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ae(m){m.preventDefault(),m.stopPropagation(),u&&me(u)}function ke(m,E){m.preventDefault(),m.stopPropagation(),me(E)}function st(m,E,A){m.preventDefault(),m.stopPropagation(),Ie.open(E,{missing_state:A})}function Ze(m,E){b[m]=E,y(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Bu(u,m,E.length===0?null:E))).catch(()=>{le("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Ce(m,E){let A=p||{},d=A.metadata&&typeof A.metadata=="object"?A.metadata:{},_={};for(let B of["impl_runtime","impl_model","impl_effort"])_[B]=Object.hasOwn(b,B)?b[B]:typeof d[B]=="string"?d[B]:"";_[m]=E;let v=td(_,Ee(),X()),$={};for(let B of["impl_runtime","impl_model","impl_effort"])$[B]=b[B],b[B]=v[B]||"";y(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...v,orchestration_runtime:X()})).then(B=>{let J=Array.isArray(B)?B[0]:B;if(!J||typeof J!="object"||!J.id)throw new Error("implementation target readback failed");p=J;for(let pe of["impl_runtime","impl_model","impl_effort"])delete b[pe];y()}).catch(()=>{for(let B of["impl_runtime","impl_model","impl_effort"])$[B]===void 0?delete b[B]:b[B]=$[B];y(),le("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function ut(m,E,A){if(!s||!u)return!1;try{let d=await Promise.resolve(s(m,E)),_=Array.isArray(d)?d[0]:d;return _&&typeof _=="object"&&_.id?(p=_,!0):(le(A,"error"),!1)}catch{return le(A,"error"),!1}}function it(m){setTimeout(()=>{try{let E=e.querySelector(m);E&&typeof E.focus=="function"&&E.focus()}catch{}},0)}function Ft(){N=!0,C=p&&p.title||"",y(),it('.detail-edit__input[data-edit="title"]')}function jt(m){C=m.target.value}function Gt(){N=!1,C="",y()}function Mt(){ut("edit-text",{id:u,field:"title",value:C},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(N=!1,C=""),y()})}function Ut(){H=!0,F=p&&p.description||"",y(),it('.detail-edit__textarea[data-edit="description"]')}function It(m){F=m.target.value}function Kt(){H=!1,F="",y()}function qe(){ut("edit-text",{id:u,field:"description",value:F},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(H=!1,F=""),y()})}function Nt(m,E,A,d){if(m.key==="Escape"){m.stopPropagation(),A();return}m.key==="Enter"&&(!d||m.ctrlKey||m.metaKey)&&(m.preventDefault(),E())}function Yt(m){let E=m.target.value;ut("update-status",{id:u,status:E},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function nt(m){let E=Number(m.target.value);ut("update-priority",{id:u,priority:E},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function De(m){re=m.target.value}function I(){let m=re.trim();m.length!==0&&ut("label-add",{id:u,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(E=>{E&&(re=""),y()})}function fe(m){if(m.key==="Escape"){m.stopPropagation(),re="",y();return}m.key==="Enter"&&(m.preventDefault(),I())}function Re(m){ut("label-remove",{id:u,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>y())}let tt={onCopyPath:ke,onOpenDoc:st};function At(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function mt(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Rt(m){let A=(Array.isArray(m.dependencies)?m.dependencies:[]).map(d=>({id:At(d),icon:mt(d)})).filter(d=>d.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${A.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${A.map(d=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(d.id)}
                  >
                    ${d.icon?`${d.icon} `:""}${d.id}
                  </button>`:l`<span class="detail-dep"
                    >${d.icon?`${d.icon} `:""}${d.id}</span
                  >`)}
          </div>`}
    `}function Pt(m){let E=m.metadata||{},A=m.workflow||{},d=A.stages||{},_=d.spec&&d.spec.stale,v=d.impl&&d.impl.stale,$=d.plan||null,B=A.route_source==="derived",J=A.route||E.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${B?" detail-kv__v--derived":""}"
          title=${B?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${B?"unset":J}</span
        >
      </div>
      ${A.route!=="quick_fix"||Object.hasOwn(E,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${E.spec_review||"\uC5C6\uC74C"}${_?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${A.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${$?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${$?.approval_receipt||"\uC5C6\uC74C"}${$?.approval_state==="stale"?" \xB7 stale":$?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${A.route!=="quick_fix"||Object.hasOwn(E,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${E.impl_review||"\uC5C6\uC74C"}${v?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${A.planned_execution?l`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${A.planned_execution.kind}</span>
            </div>
            ${A.planned_execution.kind==="main"?l`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${A.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${A.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Pn(A.exec_receipt)}</span
            >
          </div>`:""}
      ${A.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${A.impl_entry.actor}@${A.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${E.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${E.pr_url}</span>
          </div>`:""}
    `}let Vt={route:["quick_fix","spec_backed","full_plan"]};async function tn(m,E){let A=E.target.value;if(m==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&A!=="full_plan"&&!window.confirm(`full_plan \u2192 ${A||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){y();return}await ut("update-workflow-meta",{id:u,key:m,value:A},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),y()}function wt(m){let E=m.metadata||{};return l` ${((d,_)=>{let v=Vt[d],$=typeof E[d]=="string"?E[d]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${d}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${d}
          data-edit=${`wfmeta-${d}`}
          @change=${B=>tn(d,B)}
        >
          <option value="" ?selected=${!v.includes($)}>
            ${_}
          </option>
          ${v.map(B=>l`<option value=${B} ?selected=${$===B}>${B}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function nn(m,E){return N?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${C}
            @input=${jt}
            @keydown=${A=>Nt(A,Mt,Gt,!1)}
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
              @click=${Gt}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${m}</h2>
        ${zt(E).map(A=>l`<span class="detail-usage-total" title=${A.tooltip}
              >${A.label}</span
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
    `}function ln(m){let E=Wt(m.created_at),A=Wt(m.updated_at);return!E&&!A?l``:l`
      ${E?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
      ${A?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
    `}function Ln(m,E){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Yt}
        >
          ${nb.map(A=>l`<option value=${A} ?selected=${A===m}>${A}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${nt}
        >
          ${rb.map(A=>l`<option value=${String(A)} ?selected=${A===E}>
                P${A}
              </option>`)}
        </select>
      </div>
    `}function R(m){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${H?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ut}
            >
              ✎
            </button>`}
      </div>
      ${H?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${F}
              @input=${It}
              @keydown=${E=>Nt(E,qe,Kt,!0)}
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
                @click=${Kt}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${m||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function P(m){let E=typeof m.notes=="string"?m.notes:"";return E.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${E}</div>
    `}function Me(m){let E=Array.isArray(m.labels)?m.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${E.map(A=>l`<span class="detail-label-chip"
              >${A}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${A}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+A}
                @click=${()=>Re(A)}
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
            @input=${De}
            @keydown=${fe}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${I}
          >
            추가
          </button>
        </span>
      </div>
    `}function f(){if(!u)return l``;let m=p||{},E=String(m.id||u),A=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",d=et(),_=m.status||"open",v=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",$=m.description||"",B={...m,metadata:{...m.metadata||{},...b}};return l`
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
              ${E}
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
          ${nn(A,d)}
          ${Hu(B)}
          ${zu({metadata:B.metadata,workspace_values:ct(),catalog:Ee(),execution_defaults:M(),expanded:j,presets:ue()?.presets||[],preset_id:h,preset_busy:k,skipped_orchestration_keys:T},{onToggle:J=>{j=J,y()},onEdit:(J,pe)=>{if(J==="impl_runtime"||J==="impl_model"||J==="impl_effort"){Ce(J,pe??"");return}Ze(J,pe??"")},onPresetSelect:J=>{h=J,T=[],y()},onPresetApply:()=>{_e()}})}
          ${Xu({md:B.metadata,catalog:Z,workspace_defaults:ce,handlers:{onExecChange:Ze}})}
          ${Ln(_,v)} ${ln(m)}
          ${R($)}
          ${Ru(Ae,O,{expanded:$e,draft:we,sending:Y,error:Se})}
          ${P(m)} ${Me(m)} ${Rt(m)}
          ${Pt(m)} ${wt(m)}
          ${Eu(m,tt)}
          ${ad({expanded:He,loading:at,error:bt,data:ne},{onToggle:We})}
          ${od(Ye(),Ot,{total:d,expanded:Xe})}
        </div>
      </div>
    `}function y(){Ke(f(),e)}return{load(m){m!==u&&(b={},h="",T=[],j=!1,Te(),be(),Le(),ye()),u=m,p=null,V(),Ge(),z!==m&&ve(m)},clear(){u=null,p=null,b={},h="",k=!1,T=[],j=!1,Te(),be(),Le(),ye(),Ie.close(),ze.close(),Ke(l``,e)},destroy(){x&&(x(),x=null),L&&(L(),L=null),w&&(w(),w=null),document.removeEventListener("keydown",D),de||(Ie.destroy(),he&&he.parentNode&&he.parentNode.removeChild(he)),ze.destroy(),Ne.parentNode&&Ne.parentNode.removeChild(Ne),u=null,p=null,ye(),h="",k=!1,T=[],be(),Le(),Ke(l``,e)}}}function ld(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,p,b="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let h=typeof b=="string"?b.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Uo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function xs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function Wo(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function zo(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function Ho(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function sb(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:Uo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function cd(e,t){let n=sb(e,t);return n?l`<button
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
            >${Ho(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${xs(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function zr(e){let t=pn(e.created_at),n=pn(e.updated_at);return!t&&!n?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${Wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?l`<span>·</span>`:""}${n?l`<span title=${`\uC218\uC815 ${Wt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function ob(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function As(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Go(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function En(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(b=>b&&b.bead_id===t&&b.phase!=="done").sort((b,h)=>(b.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?ob(s.phase):null,u=s?.kind==="stale_work_backup_fresh",p=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:p}}function $s(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return l`<div
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
  >`}function lb(e){let t=Array.isArray(e.badges)?e.badges:[],n=zt(e.usage),r=Nn(e.usage),s=pn(e.done_at);return l`<div
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
              >`):r?l`<span class="worker-usage" title=${as(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?l`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${xs(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Qn(e){if(e.lane==="done"&&e.done_layout==="three_line")return lb(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=zt(e.usage),s=Nn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?pn(e.done_at):"",u=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",b=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,T=e.lane==="done"?"":Yo(e.workflow),j=e.lane==="done"?"":dd(e.from_id),W=Zo(e.priority),Z=l`<span class="worker-mini__title">${e.title}</span>`,ce=e.pr_url&&e.pr_number?l`<a
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
        >`:"",q=n.map(Q=>Q===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Q}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Q===e.completion_badge&&e.completion_title||""}
          >${Q}</span
        >`),N=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",H=r.length>0?r.map(Q=>l`<span class="worker-usage" title=${Q.tooltip}
              >${Q.label}</span
            >`):s?l`<span class="worker-usage" title=${as(e.usage)}
            >${s}</span
          >`:"",C=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",F=e.merge_action?l`<button
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
      </button>`:"",Te=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ye=e.discard,G=ye?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ye?.attempt_id||""}
          data-operation-id=${ye?.operation?.operation_id||""}
          data-discard-mode=${ye?.confirmation||"unmerged"}
          ?disabled=${ye?!ye.enabled:e.discard_enabled===!1}
          title=${ye?ye.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ye?.label||"\uD3D0\uAE30"}
        </button>`:"",ee=e.stale_work||null,ve=ee?l`${ee.can_resume||ee.can_continue?l`<button
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
          </button>`:""}`:"",Ae=ee?l`<div class="worker-mini__stale">
        <strong>${ee.title}</strong>
        <span>${ee.summary}</span>
        <span>${ee.cause}</span>
        ${ee.can_backup_fresh?l`<small
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
          ${Vo(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",Se=Ko(e.dependency_chips,{lane:e.lane}),we=$s(e),Y=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ye?.operation||e.revise_action||ee);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">
            ${h}${k}${W}${j}${Z}
          </div>
          <div class="worker-mini__row2">
            ${H}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Wt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${xs(e.work_ms)}</span
                >`:""}${q}${C}
            <span class="worker-mini__actions"
              >${F}${re}${Te}${G}</span
            >
            ${zr(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${u}${p}${h}${k}${W}${T}${j}${ce}${z}${q}${b}${N}
            </div>
            <div class="worker-mini__body">${Z}${Ae}</div>
            ${Se}${se}${Y?l`<div class="worker-mini__foot">
                  ${H}${C}
                  <span class="worker-mini__actions"
                    >${F}${re}${Te}${G}${ge}${ve}</span
                  >
                  ${$s(e)}
                </div>`:""}
            ${zr(e)}`:l`<div class="worker-mini__line">
              ${u}${p}${h}${k}${W}${T}${j}${Z}${ce}${z}${q}${b}${N}${H}${C}${F}${re}${Te}${G}
            </div>
            ${Se}${se}${we} ${zr(e)}`}
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
    ${zr(e)}
  </div>`}function vn(e){let t=!!e.collapsible&&!!e.collapsed,n=l`<span
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?Ci(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Qn(r))}
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
          ${$s({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function _b(e){return e?l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var mb=new Set(["codex-runner"]);function gb(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(h=>h&&!(typeof h.agent_type=="string"&&mb.has(h.agent_type))),c=i.filter(h=>h&&h.state==="live"),u=i.filter(h=>h&&h.state!=="live"),p=Ko(e.dependency_chips,{lane:"running"}),b=r?pn(r.updated_at,t):"";return l`${o?l`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?l`<span class="rtile__activity-age"
              >${pn(a,t)}</span
            >`:""}
      </div>`:b?l`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">갱신 ${b}</span>
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
      </div>`:""}${p}`}function Li(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?fb(t-e.started_at):"\u2014",c=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,u=rs(e),p=zt(e.usage),b=Nn(e.usage),h=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,k=e.base_exception||null,T=e.landing,j=e.attempt_id&&e.attempt_id===n,W=r.monitor||null,Z=_b(W),ce=gb(W,t,a,s?{updated_at:e.updated_at??null}:null),z=s&&e.workflow?.chips?.exec_receipt||null,q=Yo(e.workflow),N=z?l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Pn(z)}`}
        >${`${z.kind}:${io(z)}`}</span
      >`:"",H=q||N?l`<div class="rtile__meta">
          ${q}${N}
        </div>`:"",C=s?"":zr(e),F=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${j?" rtile--sel":""}${a?" rtile--paused":""}${o?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Zo(e.priority)}${Z}${u?l`<span class="rtile__resumed" title=${u}>↻</span>`:""}
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
                ${F}
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
                ${F}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${ce}${e.rollup?oo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Ba}):""}
    ${T?l`<div class="rtile__landing">
          <span
            class="merge-step${T.failed?" merge-step--failed":""}"
            style=${`--progress: ${T.percent}%`}
            >${T.label}${T.index>0?l`<span class="merge-step__n"
                  >${T.index}/${T.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${s?H:q||c||p.length>0||b||h||k?l`<div class="rtile__meta">
            ${q}${h?l`<span class="worker-mini__badge">${h}</span>`:""}
            ${k?l`<span
                  class="worker-mini__badge"
                  title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                  >${k}</span
                >`:""}
            ${Vo(e.exec_chips)}
            ${p.length>0?p.map(re=>l`<span class="worker-usage" title=${re.tooltip}
                      >${re.label}</span
                    >`):b?l`<span
                    class="worker-usage"
                    title=${as(e.usage)}
                    >${b}</span
                  >`:""}
          </div>`:""}
    ${C} ${$s(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Ii(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Li(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var Pi=new Set(["unavailable","not_applicable"]);function Jn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function hd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function er(e,t){return t===null?null:`${Xn[e]}: ${t.display} (${Po[t.source]})`}function Di(e){return e.filter(t=>t!==null).join(`
`)}function Ss(e){if(typeof e!="object"||e===null)return null;let t=mr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Di(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Xn.orchestration_model,e.model),n(Xn.orchestration_effort,e.effort),n(Xn.orchestration_speed,e.speed)])}}function yr(e,t){let n=Jn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Jn(e,"orchestration_effort"),s=Jn(e,"orchestration_speed"),o=hd([Sn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Di(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",er("orchestration_model",n),er("orchestration_effort",r),er("orchestration_speed",s)])}}function bb(e,t){return e===null||e.value===null||Pi.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function hb(e){return e===null||Pi.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function yb(e){return e===null?null:e.value==="auto"?"auto":Pi.has(e.resolution)?null:e.display}function tr(e,t){if(typeof e!="object"||e===null)return null;let n=Jn(e,"impl_dispatch"),r=Jn(e,"impl_runtime"),s=Jn(e,"impl_model"),o=Jn(e,"impl_effort"),a=Jn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":hd([bb(r,t??null),hb(s),yb(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Di(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",er("impl_dispatch",n),er("impl_runtime",r),er("impl_model",s),er("impl_effort",o),er("impl_speed",a)])}}var Ht="",vb=["impl_runtime","impl_model","impl_effort"],wb=["claude_account","codex_account"],kb=5,Qo=1;function an(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Jo(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(M=>le(M,"error",4e3)),o={},a={},i=[],c=!1,u={state:"absent",values:{},warnings:[]},p={},b={},h=Promise.resolve(),k={claude:null,codex:null},T=!1,j=null,W={},Z="",ce="",z=!1,q=!1,N=!1,H=null,C=!1;function F(){let M=t.queue?t.queue():null;return an(M)?M:null}function re(){let M=F();return M?M.runner_catalog:null}function Te(){let M=F();return M&&an(M.execution_defaults)?M.execution_defaults:null}function ye(){let M=t.implPresetStore?.get();return an(M)&&Array.isArray(M.presets)?M:null}function G(){return r===null?{}:{root_dir:r}}async function ee(M,X){return C||!n?null:await n(M,X)}function ve(M){M&&an(M.queue)&&t.onQueueAdopt?.(M.queue)}async function Ae(M,X){let ue=F();if(!ue||C)return null;let S=await ee(M,{...X,...G(),expected_revision:ue.revision});if(ve(S),r!==null&&S&&S.conflict){let K=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:F()?.revision??ue.revision;S=await ee(M,{...X,...G(),expected_revision:K}),ve(S)}return S}async function ge(){c=!0,Ee();try{let M=await ee("get-session-defaults",{...G()});o=an(M?.values)?{...M.values}:{},a={...o},i=Array.isArray(M?.warnings)?M.warnings:[]}catch(M){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${M instanceof Error?M.message:String(M)}`)}finally{c=!1,Ee()}}async function se(){let M=qu(o,a);if(Object.keys(M).length!==0){try{let X=await ee("set-session-defaults",{values:M,...G()});o=an(X?.values)?{...X.values}:{},a={...o},i=Array.isArray(X?.warnings)?X.warnings:[]}catch(X){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}Ee()}}function Se(M,X){if(!an(M))return;let ue=M.state;u={state:ue==="usable"||ue==="unusable"||ue==="absent"?ue:"absent",values:an(M.values)?{...M.values}:{},warnings:Array.isArray(M.warnings)?M.warnings:[]},b={...u.values},X&&(p={...b})}async function we(){try{Se(await ee("get-workspace-accounts",{...G()}),!0)}catch(M){u={state:"unusable",values:{},warnings:["kv_read_failed"]},b={},p={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${M instanceof Error?M.message:String(M)}`)}Ee()}async function Y(M){try{let X=await fetch(M);if(!X.ok)return null;let ue=await X.json();if(!an(ue)||!Array.isArray(ue.accounts))return null;let S=ue.accounts.filter(K=>an(K)&&typeof K.key=="string"&&K.key.length>0&&typeof K.email=="string"&&K.email.length>0);return{accounts:S,active:S.find(K=>K.active===!0)||null}}catch{return null}}async function Q(){T=!0;let[M,X]=await Promise.all([Y("/api/claude-usage"),Y("/api/codex-usage")]);C||(k={claude:M,codex:X},Ee())}function $e(){let M={};for(let X of wb){let ue=Object.hasOwn(p,X)?p[X]:null,S=Object.hasOwn(b,X)?b[X]:null;ue!==S&&(M[X]=ue)}return M}async function be(){let M=$e();if(Object.keys(M).length!==0){try{Se(await ee("set-workspace-accounts",{values:M,...G()}),!1)}catch(X){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}Ee()}}function je(M,X){X===Ht?delete p[M]:p[M]=X,Ee(),h=h.then(()=>be())}function oe(M,X){if(vb.includes(M)){rt(M,X);return}X===Ht?delete a[M]:a[M]=X,Ee(),se()}function Ve(){let M=ct().orchestration_model,X=on({global:{orchestration_model:M??void 0},execution_defaults:Te(),runner_catalog:re()}).orchestration_model.value;return X?Sn(re(),X):null}function pt(M,X){typeof X=="string"&&X.length>0?a[M]=X:delete a[M]}function rt(M,X){let ue=X===Ht?void 0:X,S=Mu({impl_runtime:M==="impl_runtime"?ue:a.impl_runtime,impl_model:M==="impl_model"?ue:a.impl_model,impl_effort:M==="impl_effort"?ue:a.impl_effort},re(),Ve());pt("impl_runtime",S.impl_runtime),pt("impl_model",S.impl_model),pt("impl_effort",S.impl_effort),Ee(),se()}async function O(){let M=F();if(!M)return;let X={orchestration_model:M.orchestration_model??null,orchestration_effort:M.orchestration_effort??null,orchestration_speed:M.orchestration_speed??null},ue=Fu(X,{...X,...W});if(Object.keys(ue).length!==0){try{let S=await Ae("worker-queue-set-orchestration-defaults",{values:ue});if(S&&S.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}W={}}catch(S){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Ee()}}function de(M,X){W[M]=X===Ht?null:X,Ee(),O()}function he(M){if(j=M,!M){Ee();return}let X=re(),ue=ct(),S=ue.orchestration_model;S&&!ws(X,M).includes(S)&&(W.orchestration_model=null,S=null);let K=ue.orchestration_effort;K&&!wi(X,M,S||mn).includes(K)&&(W.orchestration_effort=null),Ee(),O()}async function Ie(M){if(!(!F()||M<Qo)){try{await Ae("worker-queue-set-slots",{slots:M})}catch(X){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}Ee()}}async function Ne(M){if(!(!F()||M<Qo||M>kb)){try{await Ae("worker-queue-set-serial-lane-count",{count:M})}catch(X){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}Ee()}}async function ze(M,X){let ue=M==="auto_advance"?"worker-automation-toggle":M==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await Ae(ue,{on:X})}catch(S){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Ee()}function He(){let M={},X=ct();for(let ue of Ro){let S=Un.includes(ue)?X[ue]:a[ue];typeof S=="string"&&S.length>0&&(M[ue]=S)}return M}async function at(){let M=ye();if(!M)return;let X=He();if(Object.keys(X).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ue=(M.presets||[]).find(K=>K.id===Z),S=ce.trim()||(ue?ue.name:"");if(!S){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let K=ue?await ee("impl-preset-update",{expected_revision:M.revision,id:ue.id,name:S,settings:X}):await ee("impl-preset-create",{expected_revision:M.revision,name:S,settings:X});if(K&&K.applied){if(ce="",!ue&&Array.isArray(K.presets)){let _e=K.presets.find(x=>x.name===S);Z=_e?_e.id:Z}Ee()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ee()}catch(K){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}}async function bt(){let M=ye();if(!(!M||Z.length===0))try{let X=await ee("impl-preset-delete",{expected_revision:M.revision,id:Z});X&&X.applied?(Z="",Ee()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ee())}catch(X){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}}function ne(M){o=an(M.values)?{...M.values}:{},a={...o},i=Array.isArray(M.warnings)?M.warnings:[],an(M.queue)&&(t.onQueueAdopt?.(M.queue),W={})}async function te(){let M=ye(),X=F();if(!M||!X||Z.length===0)return;let ue=S=>({preset_id:Z,expected_revision:M.revision,expected_queue_revision:S,...G()});try{let S=await ee("apply-impl-preset-global",ue(X.revision));if(S&&S.applied&&ne(S),r!==null&&S&&S.queue_applied===!1){let K=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:F()?.revision??X.revision;S=await ee("apply-impl-preset-global",ue(K)),S&&S.applied&&ne(S)}S&&S.applied?S.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):S&&S.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(S){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Ee()}async function Pe(){q=!0,N=!1,Ee();try{let M=await ee("get-worker-system-prompt",{});!M||typeof M!="object"||Array.isArray(M)?N=!0:H=M}catch{N=!0}finally{q=!1,Ee()}}function Qe(){if(z=!z,z&&!H){Pe();return}Ee()}function Le(){let M=Fr({loading:q,error:N});if(M)return M;if(!H)return"";let X=Array.isArray(H.variants)?H.variants:[];return l`<div class="settings-dialog__sp-body">
      ${H.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${H.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${X.map(ue=>l`<div class="settings-dialog__sp-variant" data-variant=${ue.key}>
            <div class="settings-dialog__sp-cond">${ue.condition}</div>
            ${Bn(ue.label,ue.system_prompt)}
          </div>`)}
    </div>`}function xe(){return l`<section
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
        @click=${Qe}
      >
        ${z?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${z?Le():""}
    </section>`}function We(M,X,ue,S,K,_e,x){let L=K[M]??Ht,w=ki(M,ue,K,Te(),re(),x),D=w.options.find(me=>me.value===L),V=L===Ht?w.full_value:D?.full_value;return l`<select
        class=${L===Ht?"settings-dialog__unset":""}
        data-key=${M}
        aria-label=${X}
        title=${V||""}
        ?disabled=${_e===!0||w.disabled}
        .value=${hr(String(L))}
        @change=${me=>S(M,String(me.target.value))}
      >
        <option value=${Ht} ?selected=${L===Ht}>
          ${w.unset_label}
        </option>
        ${w.options.map(me=>l`<option
              value=${me.value}
              title=${me.full_value||""}
              ?selected=${me.value===L}
            >
              ${me.label}
            </option>`)}
      </select>
      ${L===Ht?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ye(M,X,ue,S,K,_e=!1,x){return l`<div
      class=${`settings-dialog__row${_e?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        ${We(M,X,ue,S,K,_e,x)}
      </span>
    </div>`}function et(M,X){let ue=X?X.active:null;return an(ue)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${M==="claude"?ue.email:Wr({...ue,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Xe(M,X,ue){let S=k[ue],K=Object.hasOwn(p,M)?p[M]:Ht,_e=ue==="claude"?No:Wr,x=!!S?.accounts.some(L=>L.key===K);return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${X}
          data-account-key=${M}
          @change=${L=>je(M,String(L.target.value))}
        >
          <option value=${Ht} ?selected=${K.length===0}>
            ${et(ue,S)}
          </option>
          ${K.length>0&&!x?l`<option value=${K} selected>
                ${K} (목록에 없음)
              </option>`:""}
          ${S?.accounts.map(L=>l`<option value=${L.key} ?selected=${L.key===K}>
                ${_e(L)}
              </option>`)||""}
        </select>
        ${S?"":l`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function ft(){let M=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${M} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${M}`:null}function Ct(M,X,ue,S,K){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${X}-on)`}
        ></i>
        ${M}
      </span>
      <span class="settings-dialog__controls">
        ${We(ue,`${M} \uBAA8\uB378`,S,oe,a,!1)}
        ${We(K,`${M} effort`,Io,oe,a,!1)}
      </span>
    </div>`}function yt(M,X,ue,S){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${S?" is-on":""}`}
          data-automation=${M}
          aria-pressed=${S?"true":"false"}
          aria-label=${X}
          @click=${()=>ze(M,!S)}
        >
          ${S?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ue}</span>
      </span>
    </div>`}function _t(M,X,ue,S){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${M}>
          <button
            type="button"
            aria-label=${`${X} \uAC10\uC18C`}
            @click=${()=>S(ue-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ue}</span>
          <button
            type="button"
            aria-label=${`${X} \uC99D\uAC00`}
            @click=${()=>S(ue+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ot(M){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${M.rows.length>0?`\uBCC0\uACBD ${M.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${M.rows.map(X=>l`<div
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
      ${M.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${M.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function ct(){let M=F(),X={};for(let ue of Un)X[ue]=Object.prototype.hasOwnProperty.call(W,ue)?W[ue]:M&&typeof M[ue]=="string"?M[ue]:null;return X}function Ge(){let M=re(),X=a.impl_runtime,ue=a.impl_model,S=ye(),K=F(),_e=ct(),x=ws(M,j),L=Br(M,void 0).filter(Ce=>Ce!==mn),w=wi(M,j,_e.orchestration_model||mn).filter(Ce=>Ce!==mn),D=Z?(S?.presets||[]).find(Ce=>Ce.id===Z):null,V=D?Nu(He(),an(D.settings)?D.settings:{}):null,me=K&&typeof K.slots=="number"?K.slots:Qo+1,ae=K&&typeof K.serial_lane_count=="number"?K.serial_lane_count:Qo,ke=Te()?.supported===!0,st=ft(),Ze=ki("workflow_mode",ys,a,Te(),M);return l`
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
      ${ke?"":l`<div
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
                .value=${hr(Z)}
                @change=${Ce=>{Z=String(Ce.target.value),Ee()}}
              >
                <option value="" ?selected=${Z===""}>
                  실행 프리셋…
                </option>
                ${(S?.presets||[]).map(Ce=>l`<option
                      value=${Ce.id}
                      ?selected=${Ce.id===Z}
                    >
                      ${Ce.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!V||V.rows.length===0}
                @click=${te}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Z?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${hr(ce)}
                @input=${Ce=>{ce=String(Ce.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${Z?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${at}
              >
                ${Z?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${Z.length===0}
                @click=${bt}
              >
                삭제
              </button>
            </div>
            ${V?Ot(V):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${hr(j||Ht)}
                    @change=${Ce=>{let ut=String(Ce.target.value);he(ut===Ht?null:ut)}}
                  >
                    <option value=${Ht} ?selected=${!j}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${j==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${j==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ye("orchestration_model","\uBAA8\uB378",x,de,_e)}
              ${Ye("orchestration_effort","effort",w,de,_e)}
              ${Ye("orchestration_speed","\uC18D\uB3C4",hs,de,_e)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Xe("claude_account","Claude","claude")}
              ${Xe("codex_account","Codex","codex")}
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
                      @click=${()=>oe("workflow_mode",Ht)}
                    >
                      ${Ze.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${ys.map(Ce=>l`<button
                          type="button"
                          data-mode=${Ce}
                          aria-pressed=${String(a.workflow_mode===Ce)}
                          @click=${()=>oe("workflow_mode",Ce)}
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
              ${Ct("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",vs,"spec_review_effort")}
              ${Ct("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Lo,"plan_review_effort")}
              ${Ct("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",vs,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ye("impl_runtime","\uC704\uC784 \uB300\uC0C1",Oo,oe,a)}
              ${Ye("impl_model","\uBAA8\uB378",Br(M,X),oe,a)}
              ${Ye("impl_effort","effort",Ur(M,X,ue),oe,a)}
              ${Ye("impl_speed","\uC18D\uB3C4",hs,oe,a)}
              ${Ye("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",L,oe,a,!1,{...a,..._e})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${yt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",K?.auto_advance===!0)}
              ${yt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",K?.auto_merge===!0)}
              ${yt("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",K?.auto_repair===!0)}
              ${_t("slots","\uB3D9\uC2DC \uC2E4\uD589",me,Ce=>Ie(Ce))}
              ${_t("serial-lane-count","\uC9C1\uB82C \uB808\uC778",ae,Ce=>Ne(Ce))}
            </div>
            ${xe()}
          `}
    `}function Ee(){C||Ke(Ge(),e)}return{load(){W={};let M=[ge(),we()];return T||M.push(Q()),Promise.all(M).then(()=>{})},render:Ee,sessionDraft:()=>({...a}),destroy(){C=!0,Ke(l``,e)}}}function ea(e){return l`<svg
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
  </svg>`}function yd(){return ea(ts`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function vd(){return ea(ts`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function wd(){return ea(ts`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function kd(){return ea(ts`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function $d(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function xd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return zt(fo(t));let n={};for(let i of Mn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let p of Mn){let b=c[p];typeof b=="number"&&Number.isFinite(b)&&(n[p]+=b,r=!0,u=!0)}if(u){o+=1;let p=c.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Nn(n):null}function Tn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Mi(e,t){let n=Tn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function $b(e,t){if(!Tn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function xb(e){if(!Tn(e)||!Tn(e.execution_defaults)||!Tn(e.runner_catalog)||!Tn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=on({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Sn(e.runner_catalog,n.orchestration_model.value??""),s=yr(n,e.runner_catalog),o=tr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Ad(e,t){let n=t.notify||(Y=>le(Y,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let u=null,p=null,b=null,h=new Map;function k(){let Y=t.workspacesState?t.workspacesState():[];return Array.isArray(Y)?Y.filter(Q=>Tn(Q)):[]}function T(Y){return k().find(Q=>Q.root_dir===Y)||null}function j(Y){return $b(T(Y),h.get(Y))}function W(){for(let Y of k()){let Q=h.get(Y.root_dir);Q&&typeof Q.revision=="number"&&typeof Y.revision=="number"&&Y.revision>=Q.revision&&h.delete(Y.root_dir)}}async function Z(Y,Q,$e){let be=t.transport,je=j(Q);if(!(!be||!Tn(je))){try{let oe=await be(Y,{...$e,root_dir:Q,expected_revision:je.revision});if(Tn(oe?.queue)&&h.set(Q,oe.queue),oe&&oe.conflict){let Ve=Tn(oe.queue)&&typeof oe.queue.revision=="number"?oe.queue.revision:j(Q)?.revision;oe=await be(Y,{...$e,root_dir:Q,expected_revision:Ve}),Tn(oe?.queue)&&h.set(Q,oe.queue)}}catch(oe){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${oe instanceof Error?oe.message:String(oe)}`)}se()}}function ce(Y){u!==Y&&(u=Y,t.onFocusChange?.(u),se())}function z(Y){ce(u===Y?null:Y)}function q(Y){if(p===Y){H();return}N(),p=Y;let Q=T(Y);a.textContent=`${Q?.name||Y} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,b=Jo(c,{root_dir:Y,queue:()=>j(Y),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:$e=>{h.set(Y,$e),se()}}),b.load(),se()}function N(){b?.destroy(),b=null}function H(Y){N(),p=null,s.hidden=!0,a.textContent="",Y!==!0&&se()}let C=()=>H();i.addEventListener("click",C);function F(Y){Y.key==="Escape"&&u!==null&&ce(null)}document.addEventListener("keydown",F);function re(Y,Q){let $e=Math.max(Q,Y,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${Q}\uAC1C \uC911 ${Y}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:$e},(be,je)=>je<Y?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function Te(Y){let Q=Y.auto_advance===!0,$e=Y.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${Q?" is-on":""}`}
        data-act="auto"
        aria-pressed=${Q?"true":"false"}
        aria-label=${`${Y.name} \uC790\uB3D9\uD654`}
        title=${Q?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${Q?vd():yd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${$e?" is-on":""}`}
        data-act="merge"
        aria-pressed=${$e?"true":"false"}
        aria-label=${`${Y.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${$e?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${wd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${p===Y.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${p===Y.root_dir?"true":"false"}
        aria-label=${`${Y.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${kd()}
      </button>`}function ye(Y){let Q=xb(Y);return Q?l`<div class="mon2-deck__chips">
      ${Q.orchestration?l`<span class="mon2-deck__chip" title=${Q.orchestration.title}
            >오케 ${Q.orchestration.text}</span
          >`:""}
      ${Q.worker?l`<span class="mon2-deck__chip" title=${Q.worker.title}
            >워커 ${Q.worker.text}</span
          >`:""}
    </div>`:""}function G(Y){let Q=[];for(let[$e,be]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let je=Mi(Y,$e);je>0&&Q.push(`${be} ${je}`)}return Q.join(" \xB7 ")}function ee(Y){let Q=Mi(Y,"running"),$e=typeof Y.slots=="number"?Y.slots:1;return l`<div
      class=${`mon2-deck__tile${u===Y.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${Y.root_dir}
      aria-pressed=${u===Y.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${Y.root_dir}>${Y.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${$e}\uAC1C \uC911 ${Q}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${Q}/${$e}</span>
          ${re(Q,$e)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${Y.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${Te(Y)}</div>
        <span class="mon2-deck__counts">${G(Y)}</span>
        ${ye(Y)}
      </div>
    </div>`}function ve(Y){let Q=t.doneItems?t.doneItems():[],$e=t.rangeLabel?t.rangeLabel():"",be=xd(Array.isArray(Q)?Q:[]),je=oe=>Y.reduce((Ve,pt)=>Ve+Mi(pt,oe),0);return l`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${Y.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${$e}`}
        >실행 ${je("running")} · 대기 ${je("queue")} · PR
        ${je("pr_wait")}${je("session_active")>0?` \xB7 \uC138\uC158 ${je("session_active")}`:""}
        · ${$e} 완료
        ${Array.isArray(Q)?Q.length:0}</span
      >
      ${be===null?"":l`<span class="mon2-deck__total-tokens">
            ${typeof be=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${$d($e)}
                  >${be}</span
                >`:be.map(oe=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${oe.provider}
                      title=${oe.tooltip}
                      >${oe.label}</span
                    >`)}
          </span>`}
    </div>`}function Ae(){let Y=k();return Y.length===0?"":l`${ve(Y)}
      <div class="mon2-deck__strip">
        ${Y.map(Q=>ee(Q))}
      </div>`}function ge(){u!==null&&!T(u)&&(u=null,t.onFocusChange?.(null))}function se(){W(),ge(),p!==null&&!T(p)&&H(!0),Ke(Ae(),r),b?.render()}function Se(Y){let Q=Y.target;if(!Q||typeof Q.closest!="function")return;let $e=Q.closest("[data-root-dir]");if(!$e)return;let be=$e.getAttribute("data-root-dir")||"",je=Q.closest("[data-act]")?.getAttribute("data-act");if(je==="worker"){t.gotoWorkerTab?.(be);return}if(je==="auto"){Z("worker-automation-toggle",be,{on:j(be)?.auto_advance!==!0});return}if(je==="merge"){Z("worker-merge-auto-toggle",be,{on:j(be)?.auto_merge!==!0});return}if(je==="gear"){q(be);return}z(be)}function we(Y){if(Y.key!=="Enter"&&Y.key!==" ")return;let Q=Y.target;if(!Q||typeof Q.closest!="function")return;let $e=Q.closest('[data-root-dir][role="button"]');!$e||$e!==Q||(Y.preventDefault(),z($e.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Se),r.addEventListener("keydown",we),{render:se,focusRoot:()=>u,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",F),r.removeEventListener("click",Se),r.removeEventListener("keydown",we),i.removeEventListener("click",C),N(),Ke(l``,r),e.replaceChildren()}}}var Ab="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Sb="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Eb="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Es="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Ni(e,t){return`${e}\0${t}`}function Tb(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Cb(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function na(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Rb(e,t){let n=new Set;for(let[a,i]of t)for(let c of i)n.add(Ni(a,c));let r=new Map,s=new Map;for(let a of e){let i=Ni(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Ni(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Ob(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Lb(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ta(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Sd(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function ra(e){let t=Cb(e.blocked_by_map),n=[],r={refusal:null},s=i=>{let c=e.owner_of.get(i);return typeof c!="string"||c.length===0?(r.refusal=Tb(i),null):c};return{graph:t,dep_ops:n,state:r,ownerOf:s,addDep:(i,c)=>{if(r.refusal!==null||i===c)return;let u=t.get(i)||[];if(u.includes(c))return;let p=s(i);if(p!==null){if(na(t,c,i)){r.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${i}\uAC00 \uC774\uBBF8 ${c}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(i,[...u,c]),n.push({type:"dep-add",a:i,b:c,root_dir:p})}},removeDep:(i,c)=>{if(r.refusal!==null||i===c)return;let u=t.get(i)||[];if(!u.includes(c))return;let p=s(i);p!==null&&(t.set(i,u.filter(b=>b!==c)),n.push({type:"dep-remove",a:i,b:c,root_dir:p}))}}}function sa(e,t,n,r){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Rb(e.dep_ops,t.blocked_by_map),o=s.filter(i=>i.type==="dep-remove"),a=s.filter(i=>i.type==="dep-add");return{lane_ops:n,ops:[...o,...a,...r],lane_op_index:o.length}}function Ed(e,t){for(let n=1;n<t.length;n+=1)e.addDep(t[n].bead_id,t[n-1].bead_id)}function Td(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(ta(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function Ib(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function qi(e,t,n){let r=ra(n),s=[],o=[],a=n.owner_lane_of.get(e.bead_id),i=e.kind==="chain"?e.lane_id??a:void 0,c=i===void 0?void 0:n.cross_lanes.get(i);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Ab};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Sb};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Sd(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Es}}if(e.kind==="chain"&&c===void 0)return{refused:Es};let u=()=>{if(c===void 0||c.status!=="confirmed")return;let h=c.entries.map(W=>W.bead_id),k=new Set(h),T=(r.graph.get(e.bead_id)||[]).filter(W=>k.has(W)),j=h.filter(W=>(r.graph.get(W)||[]).includes(e.bead_id));for(let W of T)r.removeDep(e.bead_id,W);for(let W of j)r.removeDep(W,e.bead_id);for(let W of T)for(let Z of j)r.addDep(Z,W)},p=(h,k)=>{let T=n.cross_lanes.get(h),j=T.entries.findIndex(C=>C.bead_id===e.bead_id),W=T.entries.filter(C=>C.bead_id!==e.bead_id),Z=Math.max(0,Math.min(W.length,j>=0&&k>j?k-1:k)),ce=-1;if(W.forEach((C,F)=>{n.fixed_members.has(C.bead_id)&&(ce=F)}),Z<=ce){r.state.refusal=Eb;return}let z=j>=0?T.entries[j]:c?.entries.find(C=>C.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir},q=[...W.slice(0,Z),z,...W.slice(Z)];if(Ib(q,T.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:h,entries:q}}),T.status!=="confirmed")return;let N=Z>0?W[Z-1].bead_id:null,H=Z<W.length?W[Z].bead_id:null;if(N===null){H!==null&&r.addDep(H,e.bead_id);return}r.addDep(e.bead_id,N),H!==null&&(r.graph.get(H)||[]).includes(N)&&(r.removeDep(H,N),r.addDep(H,e.bead_id))},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(u(),c!==void 0&&(t.kind!=="chain"||t.lane_id!==i)&&s.push({type:"monitor-lane-update",payload:{lane_id:i,entries:c.entries.filter(h=>h.bead_id!==e.bead_id)}})),t.kind==="chain"&&p(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let h=Ob(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(ta(e.bead_id,e.root_dir,h));else if(e.kind==="parallel"){let k=n.parallel_rows,T=k[Math.max(0,Math.min(k.length,t.marker_index))];if(!(!!T&&T.bead_id===e.bead_id)&&Lb(n,e.root_dir)&&b!==void 0){let W=b>h?h:h-1;W>=0&&W!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:W},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let h=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&h.status==="confirmed"&&o.push(ta(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let h=b>t.index?t.index:t.index-1;h>=0&&h!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:h},root_dir:e.root_dir})}}else o.push(ta(e.bead_id,e.root_dir,t.index,t.lane_id));return sa(r,n,s,o)}function Cd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Es};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=ra(t),s=[];return Ed(r,n.entries),r.state.refusal===null&&Td(r,t,n.entries,s),sa(r,t,[{type:"monitor-lane-confirm",payload:{lane_id:e}}],s)}function Rd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Es};let r=ra(t),s=[];return Ed(r,n.entries),r.state.refusal===null&&Td(r,t,n.entries,s),sa(r,t,[],s)}function Od(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Es};let r=ra(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return sa(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[])}function Fi(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Sd(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Pb="\uC0AC\uC774\uD074",Db=["running","pr_wait"];function Ld(e,t,n){let r=new Map;for(let i of n.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||r.has(i.bead_id)||r.set(i.bead_id,i);let s=r.get(e)?.root_dir,o=n.blocked_by_map.get(e)||[],a=[];for(let i of r.values()){if(i.bead_id===e||i.lane==="done"||t==="successor"&&Db.includes(i.lane)||(t==="predecessor"?o.includes(i.bead_id):(n.blocked_by_map.get(i.bead_id)||[]).includes(e)))continue;let u=t==="predecessor"?na(n.blocked_by_map,i.bead_id,e):na(n.blocked_by_map,e,i.bead_id);a.push({...i,disabled:u,...u?{reason:Pb}:{}})}return a.sort((i,c)=>{let u=s!==void 0&&i.root_dir===s,p=s!==void 0&&c.root_dir===s;return u!==p?u?-1:1:i.bead_id.localeCompare(c.bead_id)}),a}function Id(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var Pd={running:3,paused:2,failed:1};function Hr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Dd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Md(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Hr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Hr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let p=t.get(a.bead_id),b=typeof p=="number"&&p>0&&typeof a.finished_at=="number"&&p>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let p=Pd[u.run_state],b=Pd[i];if(p>b||p===b&&(u.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:r}}function oa(e){return e.replace(/\/+$/,"")}function Mb(e,t){let n=oa(e),r=oa(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function aa(e,t){let n=new Set;for(let r of e)for(let s of t){if(!Mb(r,s))continue;let o=oa(r),a=oa(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var Nd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ts=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ia(e,t){let n=Nd.find(s=>s.step===e);if(!n)return null;let r=Nd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function qd(e){let t=Ts.findIndex(n=>n.step===e);return Ts.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function vr(e){let t=Ts.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Nb(e){let t=Ts.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ts.length}}function la(e){let t=Nb(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Bi=new Set(["queued","running","retry_pending","repairing"]),Fd=new Set(["failed","succeeded"]),qb={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Cs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Fb={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Cs.base_containment,child_sweep:Cs.child_sweep,branch_cleanup:Cs.branch_cleanup,parent_close:Cs.parent_close};function jb(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Bb(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Bi,...Fd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Ub(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function ji(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=qb[s];if(!o)return null;let a=ia(n,`${r} ${o}`);return a?{...a,active:Bi.has(s),failed:s==="failed"}:null}function Wb(e){return!e||typeof e!="object"?null:Fb[e.step]||null}function Rs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Wb(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=jb(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(T=>T&&typeof T=="object"&&Bb(T,t,i)).sort(Ub):[],u=a?c:[],p=u.find(T=>Bi.has(T.state));if(p)return ji(p);if(s)return s.step==="repo_operations"&&c[0]?ji(c[0],!0):null;let b=u.find(T=>Fd.has(T.state)?T.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(b)return ji(b);if(r){let T=ia(r.step,r.label);return T?{...T,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Cs[e.cleanup_cursor]:null;if(!h)return null;let k=ia(h.step,h.label);return k?{...k,active:!0,failed:!1}:null}function ca(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function Ui(e,t){return`${e}\0${t}`}function jd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Wi(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function zb(e,t){return e==="internal"&&t===void 0}function Os(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Bd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Os(s)})`,location_label:Os(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Wi(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:zb(a,s)}}function Ud(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Ui(i.root_dir,c.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(u,[]);for(let p of Array.isArray(c.items)?c.items:[])r.set(p.id,u)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Ui(i.root_dir,c.id),p=Array.isArray(c.items)?c.items[0]:null,h=!!p&&p.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],k=s.get(u);if(k)for(let T of h){let j=r.get(T);j&&j!==u&&!k.includes(j)&&k.push(j)}}let o=(i,c)=>{let u=new Set,p=[i];for(;p.length>0;){let b=p.pop();if(b===c)return!0;!b||u.has(b)||(u.add(b),p.push(...s.get(b)||[]))}return!1},a=new Map;for(let[i,c]of s){let u=[];for(let p of c){let b=n.get(p);o(p,i)&&b&&u.push(b)}u.length>0&&a.set(i,u)}return a}function Wd(e,t){return Ui(e,t)}var zd=1,Ls=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Hi=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],wr={show_blocked:!0,spec:"all",with_deps:!1},Hd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Hb(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Hr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Gb(e,t){let{winners:n,resumed_from_ids:r}=Md(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,c=a.run_state,u=a.started_at,p=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:hn(e,i.bead_id),can_pause:c==="running"&&p,can_resume:c!=="running"&&p&&!r.has(i.attempt_id)})}return s}function Gd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function xt(e){return e&&typeof e=="object"?e:{}}function Vb(e,t,n){let r=xt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=h=>on({pin:h,global:a,execution_defaults:s,runner_catalog:o,route:n}),c,u;try{c=i(r),u=i(null)}catch{return null}let p=Vd(yr(c,o),yr(u,o)),b=Vd(tr(c,null),tr(u,null));return p||b?{orchestration:p,worker:b}:null}function Vd(e,t){return!e||t&&t.text===e.text?null:e}function Kb(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function Yb(e,t,n){let r=n.get(e);return!r||r.state==="done"?null:{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${Os(r)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`,...r.root_dir&&r.root_dir!==t?{badge:r.workspace_name||r.root_dir}:{}}}function Zb(e,t){let n=Wi(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Kd(e,t,n){let r=t.get(e);if(!r)return Zb(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Os(r)}function Xb(e,t,n,r,s,o){let a=[];return e.forEach((i,c)=>{let u=typeof i.id=="string"?i.id:"";if(u.length===0)return;let p=i.status==="confirmed"?"confirmed":"draft",b=Array.isArray(i.entries)?i.entries:[],h=[];b.forEach((k,T)=>{let j=k&&typeof k.bead_id=="string"?k.bead_id:"";if(j.length===0)return;let W=k&&typeof k.root_dir=="string"?k.root_dir:"",Z=n.get(j),ce=Z?Z.state:void 0,z=ce==="running"||ce==="pr_wait"||ce==="done",q=!Z||ce==="runnable",N=Z&&Z.lane==="parallel"&&typeof Z.position=="number"?Z.position-1:null,H=h.length>0?h[h.length-1].id:null,C=p==="confirmed"&&H!==null&&!(t.get(j)||[]).includes(H);h.push({id:j,title:s.get(j)||j,root_dir:Z?Z.root_dir:W,workspace_name:Z?Z.workspace_name:o.get(W)||"",seq:T+1,location_label:Kd(j,n,r),draggable:!z,fixed:z,done:ce==="done",unplaced:q,mismatch:C,...N!==null?{queue_index:N}:{}})}),h.forEach((k,T)=>{k.seq=T+1}),a.push({lane_id:u,status:p,draft:p==="draft",number:c+1,label:`\uC5F0\uACB0 ${c+1} \xB7 \uB808\uD3EC \uAC04`,rows:h,all_done:h.length>0&&h.every(k=>k.done),can_confirm:p==="draft"&&h.length>=2,has_mismatch:p==="confirmed"&&h.some(k=>k.mismatch||k.unplaced)})}),a}function Qb(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Jb(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:c,state:u}=Qb(i,t,n);if(u!==void 0&&(i.scope_state=u),c.length===0)continue;let p=o.get(i.root_dir);p?p.push({item:i,scope:c}):o.set(i.root_dir,[{item:i,scope:c}])}let a=(i,c,u)=>{let p={id:c.id,title:c.title,location_label:Kd(c.id,r,s),prefixes:u};i.overlap_chips?i.overlap_chips.push(p):i.overlap_chips=[p]};for(let i of o.values())for(let c=0;c<i.length;c+=1)for(let u=c+1;u<i.length;u+=1){let p=aa(i[c].scope,i[u].scope);p.length!==0&&(a(i[c].item,i[u].item,p),a(i[u].item,i[c].item,p))}}function zi(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ua(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Gi(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...wr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,c=n&&Ls.some(O=>O.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let O of s)O&&typeof O.root_dir=="string"&&u.set(O.root_dir,O);let p=new Map;for(let O of s)O&&typeof O.root_dir=="string"&&p.set(O.root_dir,O.name||O.root_dir);for(let O of r)O&&typeof O.root_dir=="string"&&p.set(O.root_dir,O.name||O.root_dir);let b=[],h=[],k=[],T=[],j=[],W=[],Z=new Map,ce=new Map,z=new Map,q=new Map,N=new Map,H=new Map,C=new Map,F=new Map;for(let O of r){if(!O||typeof O.root_dir!="string")continue;let de=O.root_dir,he=O.name||de,Ie=u.get(de),Ne=Ie&&typeof Ie.revision=="number"?Ie.revision:typeof O.revision=="number"?O.revision:0,ze=xt(O.attempts),He=xt(O.bead_titles);for(let[w,D]of Object.entries(He))typeof D=="string"&&D.length>0&&F.set(w,D);let at=xt(O.bead_times),bt=xt(O.pr_observations),ne=xt(O.admission),te=xt(O.revise_parked),Pe=xt(O.merge_queue_state),Qe=xt(O.cleanup_failed),Le=xt(O.discard_operations),xe=xt(O.bead_blocked_by);Object.hasOwn(O,"bead_scope")&&H.set(de,xt(O.bead_scope));let We=xt(O.bead_workflow),Ye=xt(O.pr_activity),et=Array.isArray(O.repo_operations)?O.repo_operations:[],Xe=Array.isArray(O.merge_queue)?O.merge_queue:[],ft=new Set(Xe.filter(w=>w&&typeof w.bead_id=="string").map(w=>w.bead_id)),Ct=new Map(Xe.filter(w=>w&&typeof w.bead_id=="string").map(w=>[w.bead_id,w])),yt=Array.isArray(O.queue)?O.queue:[],_t=(Array.isArray(O.serial_lanes)?O.serial_lanes:[]).filter(w=>w&&/^s[1-5]$/.test(w.id)&&Array.isArray(w.entries)),Ot=xt(O.lane_states),ct=typeof O.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(O.serial_lane_count))):Math.min(5,_t.length);z.set(de,ct),q.set(de,yt.length);let Ge=new Map(_t.map(w=>[w.id,w])),Ee=new Map;for(let w of _t)for(let D of w.entries)D&&typeof D.bead_id=="string"&&Ee.set(D.bead_id,w.id);for(let[w,D]of Object.entries(xe))Array.isArray(D)&&N.set(w,D.filter(V=>typeof V=="string"&&V.length>0));let M=Array.isArray(O.done)?O.done:[];for(let w of M)w&&typeof w.bead_id=="string"&&W.push({id:w.bead_id,root_dir:de,workspace_name:he});let X=new Map;for(let w of M)w&&typeof w.bead_id=="string"&&typeof w.added_at=="number"&&X.set(w.bead_id,w.added_at);let ue=w=>({id:w,title:He[w]||w,root_dir:de,workspace_name:he,expected_revision:Ne,draggable:!1,...xt(at[w]).created_at?{created_at:xt(at[w]).created_at}:{},...xt(at[w]).updated_at?{updated_at:xt(at[w]).updated_at}:{}}),S=new Set;for(let[w,D]of Gb(ze,X))S.add(w),h.push({...ue(w),lane:"running",...Ee.has(w)?{serial_lane_id:Ee.get(w)}:{},attempt_id:D.attempt_id,run_state:D.run_state,status:D.status||void 0,workflow:We[w]||null,can_pause:D.can_pause,can_resume:D.can_resume,started_at:D.started_at,last_event_at:D.last_event_at,last_activity:D.last_activity,legs:D.legs,runner:D.runner,model:D.model,effort:D.effort,speed:D.speed,resumed_from:D.resumed_from,continuation_mode:D.continuation_mode,usage:D.usage,exec_chips:{orchestration:Ss(D),worker:null},discard:En(Le,w,{attempt_id:D.attempt_id}),badges:D.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:D.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:D.run_state==="failed"});for(let[w,D]of Dd(ze)){if(h.some(ae=>ae.id===w))continue;let V=D.attempt,me=D.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";h.push({...ue(w),lane:"running",kind:"session",attempt_id:typeof V.attempt_id=="string"?V.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:We[w]||null,can_pause:!1,can_resume:!1,started_at:D.started_at,last_event_at:typeof V.last_event_at=="number"?V.last_event_at:null,last_activity:V.last_activity&&typeof V.last_activity=="object"?V.last_activity:null,legs:Array.isArray(V.legs)?V.legs:[],runner:typeof V.runner=="string"?V.runner:null,model:typeof V.model=="string"?V.model:null,effort:typeof V.effort=="string"?V.effort:null,speed:typeof V.speed=="string"?V.speed:null,resumed_from:null,continuation_mode:null,usage:V.usage&&typeof V.usage=="object"?V.usage:null,exec_chips:{orchestration:Ss(V),worker:null},discard:En(Le,w,{merge_queued:!0}),badges:[D.origin==="auto"?`${me} \xB7 \uC790\uB3D9`:me],alert:!1})}for(let w of Array.isArray(O.session_active)?O.session_active:[]){let D=w&&w.bead_id;typeof D!="string"||S.has(D)||(S.add(D),Array.isArray(w.blocked_by)&&w.blocked_by.length>0&&N.set(D,w.blocked_by.filter(V=>typeof V=="string"&&V.length>0)),typeof w.title=="string"&&w.title.length>0&&F.set(D,w.title),h.push({...ue(D),title:w.title||He[D]||D,lane:"running",kind:"session",status:"in_progress",started_at:zi(w.started_at)??zi(w.updated_at)??void 0,updated_at:zi(w.updated_at)??void 0,workflow:w.workflow||null,labels:Array.isArray(w.labels)?w.labels:[],spec_id:typeof w.spec_id=="string"?w.spec_id:"",blocked:w.blocked===!0,...Array.isArray(w.blocked_by)?{blocked_by:w.blocked_by.filter(V=>typeof V=="string"&&V.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let w of Array.isArray(O.pr_wait)?O.pr_wait:[]){let D=w&&w.bead_id;if(typeof D!="string"||S.has(D))continue;S.add(D);let V=xt(bt[D]),me=xt(V.pr),ae=V.gate?xt(V.gate):null,ke=ft.has(D),st=Ct.get(D)?.continuation_action||null,Ze=!!st&&st.continuation===null,Ce=Pe.active===D,ut=w.external===!0,it=Qe[D]||null,Ft=xt(Ye[D]),jt=Rs({bead_id:D,merge_sha:w.merge_sha,cleanup_cursor:w.cleanup_cursor,merge_progress:Ft.merge_progress||null,cleanup_failed:it,repo_operations:et}),Gt=ca(jt),Mt=!!ae&&ae.base_badge==="\uCDA9\uB3CC",Ut=!!it&&["child_sweep","branch_cleanup","parent_close"].includes(it.step)&&!!ae&&ae.tier==="merged",It=ut&&!!it&&!!ae&&ae.tier==="merged",Kt=!!ae&&["closed_unmerged","review","undecidable"].includes(ae.tier),qe=En(Le,D,{external:ut,merge_active:Ce||jt?.step==="merge",merge_queued:ke,cleanup_active:Gt,merged:!!it||ae?.tier==="merged"}),Nt=!!qe.operation;k.push({...ue(D),lane:"pr_wait",workflow:We[D]||null,pr_number:typeof me.number=="number"?me.number:null,pr_url:typeof me.url=="string"?me.url:void 0,external:ut,usage:hn(ze,D),merge_step:jt,badges:Ze?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:jt?[ae?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:it?[vr(it.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${vr(it.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ae?.gate_badge=="string"&&ae.gate_badge.length>0?[ae.gate_badge]:[],alert:jt?jt.failed===!0:!!it||Kt,reason:it&&jt?.active!==!0?la(it.step):"PR \uB300\uAE30",merge_action:ae?.tier==="merged"&&!Ut&&!It?!1:!ke||Ze,merge_enabled:!Nt&&(Ze||ae?.enabled===!0||Mt||Ut||It),merge_label:Ze?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":It||Ut?"\uC815\uB9AC \uC7AC\uAC1C":Mt&&!Ut?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ze?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Nt?qe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${qe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${qe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:It?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ut?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Mt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ae?.enabled===!0?`\uBA38\uC9C0 (${ae.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ae?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ke&&!Ze,cancel_enabled:!Ce,continuation_mismatch:st?.mismatch||null,discard:qe,discard_action:qe.action,discard_enabled:qe.enabled,discard_title:qe.title})}let K=(w,D,V,me)=>{let ae=w&&w.bead_id;if(typeof ae!="string"||S.has(ae))return null;S.add(ae);let ke=te[ae],st=En(Le,ae),Ze=st.operation?st:null,Ce={...ue(ae),lane:D,workflow:We[ae]||null,draggable:!Ze,discard:Ze||void 0,reason:Gd(ne,ae),seq:V+1,queue_position:V+1,queue_index:V,queue_length:me,badges:ke?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ke,revise_action:!!ke,revise_enabled:!!ke&&!Ze,revise_title:ke?ke.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ke.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(xe,ae)&&(Ce.blocked_by=Array.isArray(xe[ae])?xe[ae].filter(ut=>typeof ut=="string"&&ut.length>0):[]),Ce};for(let w=0;w<yt.length;w++){let D=K(yt[w],"queue",w,yt.length);if(!D)continue;T.push(D);let V=Z.get(de);V?V.push(D):Z.set(de,[D])}let _e=w=>{let D=k.find(ae=>ae.id===w&&ae.root_dir===de);if(D)return{id:w,title:D.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let V=h.find(ae=>ae.id===w&&ae.root_dir===de),me=V&&V.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":V&&V.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:w,title:V?V.title:ue(w).title,badge:me}},x=[];for(let w=0;w<Math.max(ct,_t.length);w++){let D=`s${w+1}`,V=Ge.get(D),me=V&&Array.isArray(V.entries)?V.entries:[],ae=[];for(let Ze=0;Ze<me.length;Ze++){let Ce=K(me[Ze],D,Ze,me.length);Ce&&(ae.push(Ce),T.push(Ce))}let ke=xt(Ot[D]),st=Array.isArray(ke.occupied_by)?ke.occupied_by.filter(Ze=>typeof Ze=="string"):[];ae.length===0&&st.length===0&&(ct<=1||w>=ct)||x.push({id:D,index:w,items:ae,raw_length:me.length,occupied_by:st,occupants:st.map(Ze=>_e(Ze)),corrections:Array.isArray(ke.corrections)?ke.corrections.length:0,cycle:ke.cycle===!0,...ae.length===0&&st.length===0?{empty:!0}:{}})}ce.set(de,x);let L=Array.from({length:ct},(w,D)=>{let V=`s${D+1}`,me=Ge.get(V),ae=me&&Array.isArray(me.entries)?me.entries:[],ke=xt(Ot[V]);return{id:V,index:ae.length,length:ae.length,occupied_by:Array.isArray(ke.occupied_by)?ke.occupied_by.filter(st=>typeof st=="string"):[]}});for(let w of Array.isArray(O.runnable)?O.runnable:[]){let D=w&&w.bead_id;if(typeof D!="string"||S.has(D))continue;S.add(D);let V=w.workflow&&typeof w.workflow=="object"?w.workflow:null,me=V&&typeof V.route=="string"&&V.route||(typeof w.route=="string"?w.route:null),ae=Vb(xt(Ie),w.exec_pins,me);Array.isArray(w.blocked_by)&&w.blocked_by.length>0&&N.set(D,w.blocked_by.filter(ke=>typeof ke=="string"&&ke.length>0)),typeof w.title=="string"&&w.title.length>0&&F.set(D,w.title),Array.isArray(w.scope)&&C.set(D,w.scope.filter(ke=>typeof ke=="string"&&ke.length>0)),b.push({...ue(D),title:w.title||He[D]||D,lane:"runnable",draggable:!0,reason:Gd(ne,D),created_at:w.created_at??void 0,updated_at:w.updated_at??void 0,status:typeof w.status=="string"?w.status:void 0,labels:Array.isArray(w.labels)?w.labels:[],spec_id:typeof w.spec_id=="string"?w.spec_id:"",workflow:V||(me?{route:me,chips:{route:me}}:null),...ae?{exec_chips:ae}:{},blocked:w.blocked===!0,...Array.isArray(w.blocked_by)?{blocked_by:w.blocked_by.filter(ke=>typeof ke=="string"&&ke.length>0)}:{},place_index:yt.length,place_lanes:L})}for(let w of M){let D=w&&w.bead_id;if(typeof D!="string"||S.has(D)||(S.add(D),o!==void 0&&typeof w.added_at=="number"&&w.added_at<o))continue;let V=Hb(ze,D),me=V&&typeof V.done_kind=="string"?V.done_kind:null;j.push({...ue(D),lane:"done",done:!0,done_layout:"three_line",usage:hn(ze,D),work_ms:zo(ze,D),done_at:typeof w.added_at=="number"?w.added_at:void 0,done_kind:me,badges:[...me&&Hd[me]?[Hd[me]]:[],...Wo(ze,D)]})}}let re=new Map;s.forEach((O,de)=>{O&&typeof O.root_dir=="string"&&re.set(O.root_dir,de)});let Te=n&&n.running_sort==="repo"?"repo":"started";h.sort((O,de)=>{let he=O.kind==="session",Ie=de.kind==="session";if(he!==Ie)return he?1:-1;if(he&&Ie){let He=ua(de.updated_at)-ua(O.updated_at);return He!==0?He:O.id.localeCompare(de.id)}if(Te==="repo"){let He=re.get(O.root_dir)??Number.MAX_SAFE_INTEGER,at=re.get(de.root_dir)??Number.MAX_SAFE_INTEGER;if(He!==at)return He-at}let Ne=typeof O.started_at=="number"&&Number.isFinite(O.started_at)?O.started_at:null,ze=typeof de.started_at=="number"&&Number.isFinite(de.started_at)?de.started_at:null;return Ne!==null&&ze!==null&&Ne!==ze?Ne-ze:Ne===null&&ze!==null?1:Ne!==null&&ze===null?-1:O.id.localeCompare(de.id)}),j.sort((O,de)=>(de.done_at??0)-(O.done_at??0));let ye=s.length>0?s:r.map(O=>({root_dir:O&&O.root_dir,name:O&&O.name,auto_advance:O&&O.auto_advance,auto_merge:O&&O.auto_merge,slots:O&&O.slots,revision:O&&O.revision,runner_catalog:O&&O.runner_catalog})),G=new Set(b.map(O=>O.root_dir)),ee=[];for(let O of ye){if(!O||typeof O.root_dir!="string")continue;let de=Z.get(O.root_dir)||[],he=ce.get(O.root_dir)||[];!(de.length>0||he.some(Ne=>Ne.items.length>0||Ne.occupied_by.length>0))&&!G.has(O.root_dir)||ee.push({root_dir:O.root_dir,name:O.name||O.root_dir,auto_advance:O.auto_advance===!0,auto_merge:O.auto_merge===!0,slots:typeof O.slots=="number"&&O.slots>=zd?O.slots:zd,revision:typeof O.revision=="number"?O.revision:0,runner_catalog:xt(O.runner_catalog),items:de,sublanes:{parallel:de,serial:he},serial_lane_count:z.get(O.root_dir)||0,raw_queue_length:q.get(O.root_dir)||0})}let ve={runnable:b,runnable_all:b,runnable_hidden:{blocked:0,spec:0,deps:0},runnable_sections:[],runnable_flat:c==="updated_flat",queue:T,queue_groups:ee,running:h,pr_wait:k,done:j,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(q),owner_of:{}},Ae=jd(ve);for(let O of W)Ae.has(O.id)||Ae.set(O.id,{root_dir:O.root_dir,workspace_name:O.workspace_name,lane:"done",state:"done"});let ge=new Map;for(let[O,de]of N)for(let he of de){let Ie=ge.get(he);Ie?Ie.includes(O)||Ie.push(O):ge.set(he,[O])}for(let O of[...ve.queue,...ve.runnable]){if(!Object.hasOwn(O,"blocked_by"))continue;let de=Ae.get(O.id);O.blockers=(O.blocked_by||[]).map(he=>Bd(he,de,Ae,s)),O.blocker_warnings=O.blockers.filter(he=>he.missing_internal).map(he=>`\u26A0 \uC120\uD589 ${he.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),O.blocker_warnings.length>0&&(O.alert=!0)}for(let O of[...ve.queue,...ve.runnable,...ve.running,...ve.pr_wait]){let de=O.lane==="running"||O.lane==="pr_wait"?[]:(O.blockers||[]).map(Kb),he=[];for(let ze of ge.get(O.id)||[]){let He=Yb(ze,O.root_dir,Ae);He&&he.push(He)}let Ie=O.lane==="running"||O.lane==="pr_wait"?[]:O.blocker_warnings||[];if(de.length===0&&he.length===0&&Ie.length===0)continue;let Ne={predecessors:de,successors:he,warnings:Ie};O.dependency_chips=Ne}Jb(ve,H,C,Ae,s);let se=Ud(ve.queue_groups);for(let O of ve.queue_groups)for(let de of O.sublanes.serial){let he=se.get(Wd(O.root_dir,de.id));he&&(de.cross_wait_peers=he)}ve.chain_lanes=Xb(i&&Array.isArray(i.lanes)?i.lanes:[],N,Ae,s,F,p);let Se=new Map;for(let O of[...ve.queue,...ve.runnable])Se.has(O.id)||Se.set(O.id,O);let we=new Set;for(let O of ve.chain_lanes)for(let de of O.rows){if(O.status==="confirmed"&&!de.unplaced&&!de.fixed&&we.add(de.id),!O.draft&&!de.unplaced)continue;let he=Se.get(de.id);he&&(he.cross_lane_chip={lane_id:O.lane_id,number:O.number,status:O.status,label:O.draft?`\uC5F0\uACB0 ${O.number} (draft)`:`\uC5F0\uACB0 ${O.number}`})}let Y=[];for(let O of Z.values())for(let de of O)we.has(de.id)||Y.push(de);Y.sort((O,de)=>{let he=O.workspace_name.localeCompare(de.workspace_name);return he!==0?he:(O.queue_index??0)-(de.queue_index??0)}),ve.parallel_rows=Y;let Q={};for(let[O,de]of Ae)typeof de.root_dir=="string"&&de.root_dir.length>0&&(Q[O]=de.root_dir);for(let O of ve.chain_lanes)for(let de of O.rows)!Object.hasOwn(Q,de.id)&&de.root_dir.length>0&&p.has(de.root_dir)&&(Q[de.id]=de.root_dir);ve.owner_of=Q;let $e=ve.runnable.length;ve.runnable_all=ve.runnable.slice();let be=ve.runnable;a.show_blocked||(be=be.filter(O=>O.blocked!==!0));let je=be.length;a.spec==="with"?be=be.filter(O=>!!O.spec_id):a.spec==="without"&&(be=be.filter(O=>!O.spec_id));let oe=be.length;a.with_deps&&(be=be.filter(O=>{let de=O.dependency_chips;return de?(de.predecessors||[]).length>0||(de.successors||[]).length>0:!1})),ve.runnable_hidden={blocked:$e-je,spec:je-oe,deps:oe-be.length};let Ve=(O,de)=>{let he=ua(de.updated_at)-ua(O.updated_at);return he!==0?he:O.id.localeCompare(de.id)},rt=c==="repo_spec"?(O,de)=>{let he=O.spec_id?0:1,Ie=de.spec_id?0:1;return he!==Ie?he-Ie:Ve(O,de)}:Ve;if(c==="updated_flat")ve.runnable=be.slice().sort(Ve),ve.runnable_sections=[];else{let O=new Map;for(let Ie of be){let Ne=O.get(Ie.root_dir);Ne?Ne.push(Ie):O.set(Ie.root_dir,[Ie])}let de=[],he=[];for(let Ie of ye){if(!Ie||typeof Ie.root_dir!="string")continue;let Ne=(O.get(Ie.root_dir)||[]).slice().sort(rt);O.delete(Ie.root_dir),Ne.length!==0&&(de.push({root_dir:Ie.root_dir,name:Ie.name||Ie.root_dir,items:Ne.map(ze=>({...ze,workspace_name:""}))}),he.push(...Ne))}for(let[Ie,Ne]of O){let ze=Ne.slice().sort(rt);de.push({root_dir:Ie,name:ze[0]?.workspace_name||Ie,items:ze.map(He=>({...He,workspace_name:""}))}),he.push(...ze)}ve.runnable=he,ve.runnable_sections=de}return ve}var Yd="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Zd(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Xd(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var ep="bdui.monitor.done-range",tp="bdui.monitor.running_sort",np="bdui.monitor.candidate_sort",rp="beads-ui.monitor.candidate-filter",sp="beads-ui.monitor.sections";function eh(){try{let e=window.localStorage.getItem(rp);if(!e)return{...wr};let t=JSON.parse(e);return!t||typeof t!="object"?{...wr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:wr.show_blocked,spec:Hi.some(n=>n.value===t.spec)?t.spec:"all",with_deps:typeof t.with_deps=="boolean"?t.with_deps:wr.with_deps}}catch{return{...wr}}}function Vi(e){try{window.localStorage.setItem(rp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec,with_deps:e.with_deps}))}catch{}}function th(){try{let e=window.localStorage.getItem(np);return Ls.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function nh(e){try{window.localStorage.setItem(np,e)}catch{}}function rh(){try{let e=window.localStorage.getItem(sp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Qd(e){try{window.localStorage.setItem(sp,JSON.stringify(e))}catch{}}function sh(){try{let e=window.localStorage.getItem(ep);return bn(e)?e:dn}catch{return dn}}function oh(e){try{window.localStorage.setItem(ep,e)}catch{}}function ah(){try{return window.localStorage.getItem(tp)==="repo"?"repo":"started"}catch{return"started"}}function ih(e){try{window.localStorage.setItem(tp,e)}catch{}}var op="tab:monitor:pipeline",lh=1e3,ch=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Jd="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function uh(e){return e>=1&&e<=Jd.length?Jd[e-1]:`(${e})`}function ap(e,t){let n=St("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,c=t.switchWorkspace,u=t.router,p=t.now||(()=>Date.now()),b=t.confirm||(d=>typeof globalThis.confirm!="function"||globalThis.confirm(d)),h=sh(),k=ah(),T=eh(),j=th(),W=rh(),Z=null,ce=null,z=null,q=null,N=[],H=null;function C(){let d=Vn.find(_=>_.value===h);return d?d.label:""}let F=document.createElement("div");F.className="mon",e.appendChild(F);let re=document.createElement("div");re.className="worker-drawer-overlay",re.hidden=!0;let Te=document.createElement("div");Te.className="worker-drawer-overlay__backdrop";let ye=document.createElement("div");ye.className="worker-drawer-host mon2-drawer",re.append(Te,ye),e.appendChild(re);let G=Gi(null,null),ee=new Map,ve=new Map,Ae=null,ge=null,se=null,Se=jr(ye,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Z=null,re.hidden=!0,_e()}});async function we(d,_,v,$,B=!0){if(!o||!v)return null;let J=await o(d,{..._,root_dir:v,expected_revision:$});if(J&&J.conflict&&B){J.queue&&ve.set(v,J.queue);let pe=J.queue&&typeof J.queue.revision=="number"?J.queue.revision:$;J=await o(d,{..._,root_dir:v,expected_revision:pe})}return J&&J.queue&&v&&ve.set(v,J.queue),J}function Y(d,_){let v=ve.get(d),$=s&&s.get?s.get():null,B=(Array.isArray($)?$:[]).find(pe=>pe?.root_dir===d);return(v||B)?.merge_queue?.find(pe=>pe.bead_id===_)?.continuation_action}async function Q(d,_,v,$){let B=await we(d,_,v,$),J=ve.get(v)?.revision??B?.queue?.revision??$;return Dn(B,(pe,Oe)=>we(d,{..._,continuation:pe,decision_token:Oe},v,J,!1),{refresh:pe=>we(d,_,v,pe?.queue?.revision??ve.get(v)?.revision??J,!1)})}async function $e(d,_,v,$){let B=await Dn({continuation_mismatch:$},(pe,Oe)=>we("worker-merge-queue-add",{bead_id:_,continuation:pe,decision_token:Oe},d,v,!1)),J=B?.queue?.merge_queue?.find(pe=>pe.bead_id===_)?.continuation_action;B?.applied!==!0&&J?.continuation===null&&J.mismatch&&await $e(d,_,B.queue.revision,J.mismatch)}async function be(d,_,v){let $=await we("worker-discard",d,_,v);if($&&$.discarded===!0){le(Go($),"success",5e3);return}if($&&$.reason){le(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){le("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){le(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&le("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function je(d,_,v){return!o||!v?null:await o(d,{..._,root_dir:v})}async function oe(){let d=new Map;for(let _ of G.pr_wait)d.has(_.root_dir)||d.set(_.root_dir,_.expected_revision);for(let[_,v]of d)await we("worker-merge-queue-add-all",{},_,v)}function Ve(d){let _=W[d];return!!(_&&_.runnable===!0)}function pt(d){let _={...W[d]||{}};_.runnable=!_.runnable,W={...W,[d]:_},Qd(W),_e()}function rt(d){return W[d]===!0}function O(d){W={...W,[d]:W[d]!==!0},Qd(W),_e()}function de(d){let _=G.queue_groups.find(v=>v.root_dir===d);if(!_)return null;for(let v=0;v<_.serial_lane_count;v+=1){let $=`s${v+1}`,B=_.sublanes.serial.find(J=>J.id===$);if(!B||B.raw_length===0&&B.occupied_by.length===0)return $}return null}function he(d,_){let v=G.queue_groups.find(B=>B.root_dir===d),$=v?v.sublanes.serial.find(B=>B.id===_):void 0;return $?$.raw_length:0}function Ie(d,_){let v=ee.get(d),$=ee.get(_);if(!v||!$)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let B=Zd(v),J=Zd($);if(B!==null&&B===J&&v.root_dir===$.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let pe=Xd(v),Oe=Xd($);if(pe&&J!==null){let Fe=J;return{kind:"ops",title:`${Fe} \uB05D\uC5D0 ${d}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:d,lane:Fe,index:he($.root_dir,Fe)}]}}if(B!==null&&Oe&&J===null){let Fe=B;return{kind:"ops",title:`${Fe} \uB05D\uC5D0 ${_}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:_,lane:Fe,index:he(v.root_dir,Fe)}]}}if(pe&&B===null&&Oe&&J===null){let Fe=de(v.root_dir);return Fe===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Fe} \uB808\uC778\uC5D0 ${_} \u2192 ${d} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:_,lane:Fe,index:0},{bead_id:d,lane:Fe,index:1}]}}return!pe&&!Oe?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:pe?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function Ne(d,_){let v=Ie(d,_.id);return{id:_.id,title:_.title,location_label:_.location_label,prefixes:_.prefixes,action:v.kind==="note"?{kind:"note",text:v.text}:v.kind==="disabled"?{kind:"disabled",label:Yd,title:v.title}:{kind:"place",label:Yd,title:v.title}}}function ze(d,_){if(!z||z.bead_id!==d)return null;let v=z.counterpart_id,$=_.filter(B=>B.id===v);return $.length===0?null:{rows:$.map(B=>Ne(d,B))}}function He(d){let _=d.dependency_chips||null,v=d.overlap_chips||[],$=d.scope_state==="missing",B=d.cross_lane_chip;if(!_&&v.length===0&&!$&&!B)return null;let J=ze(d.id,v);return{..._||{},...v.length>0?{overlaps:v}:{},...$?{scope_missing:!0}:{},...B?{cross_lane:{lane_id:B.lane_id,label:B.label}}:{},...J?{popover:J}:{}}}function at(d){let _=He(d);return _?{...d,dependency_chips:_}:d}async function bt(d,_){let v=Ie(d,_);if(z=null,v.kind!=="ops"){_e();return}let $=Gt(v.root_dir,v.ops[0].bead_id);for(let B of v.ops){let J=await ne(B,v.root_dir,$);if(J===null)break;$=J}_e()}async function ne(d,_,v){try{let $=await we("worker-queue-place",d,_,v,!1);if($&&$.conflict)return le("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!$||$.applied!==!0)return le($&&typeof $.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let B=$.queue?$.queue.revision:void 0;return typeof B!="number"?(le("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):B}catch($){return le(ke($),"error"),null}}function te(d){let _=Ve(d.root_dir);return l`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${d.root_dir}
        data-section="runnable"
        aria-expanded=${_?"false":"true"}
        aria-label=${`${d.name} \uC139\uC158 ${_?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${_?"\u25B8":"\u25BE"}
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
    </header>`}function Pe(d,_){return l`<div
      class="mon2-item"
      data-bead-id=${d.id}
      data-drag-kind="candidate"
      data-root-dir=${d.root_dir}
    >
      ${_}
    </div>`}function Qe(d){if(ce!==d.id)return null;let _=G.queue_groups.find(J=>J.root_dir===d.root_dir),v=d.place_lanes||[],$=G.cross_lanes_revision!==null,B=[{id:"parallel",label:"\uBCD1\uB82C",count:d.place_index??0}];for(let J of G.chain_lanes)B.push({id:`lane:${J.lane_id}`,label:`\uC5F0\uACB0 ${J.number} (${J.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:J.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});B.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let J of v)B.push({id:`serial:${J.id}`,label:`\uC9C1\uB82C ${Number(J.id.slice(1))}`,count:J.length,group:`${_?_.name:""} \uC9C1\uB82C`});return{bead_id:d.id,lanes:B}}function Le(){let d=[],_=new Set,v=($,B)=>{for(let J of $)_.has(J.id)||(_.add(J.id),d.push({bead_id:J.id,root_dir:J.root_dir,workspace_name:J.workspace_name,title:J.title,lane:B}))};return v(G.running,"running"),v(G.pr_wait,"pr_wait"),v(G.queue,"queue"),v(G.runnable_all,"runnable"),d}function xe(d){if(!q||q.bead_id!==d)return"";let _=it(),v=Le(),$=new Map;for(let Fe of v)$.set(Fe.bead_id,Fe);let B=(_.get(d)||[]).filter(Fe=>$.has(Fe)),J=v.filter(Fe=>(_.get(Fe.bead_id)||[]).includes(d)).map(Fe=>Fe.bead_id),pe=Id(Ld(d,q.direction,{issues:v,blocked_by_map:_}),q.query),Oe=G.owner_of[d];return l`<div
      class="mon-deppanel"
      data-bead-id=${d}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__now">
        ${B.length===0&&J.length===0?l`<span class="mon-deppanel__empty">연결된 의존 없음</span>`:""}
        ${B.map(Fe=>l`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">🔒 선행 ${Fe}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${d}
                data-dep-b=${Fe}
                aria-label=${`\uC120\uD589 ${Fe} \uC5F0\uACB0 \uD574\uC81C`}
                title="선행 연결 해제"
              >
                ✕
              </button></span
            >`)}
        ${J.map(Fe=>l`<span class="mon-deppanel__chip mon-deppanel__chip--succ"
              ><span class="mon-deppanel__chip-label">→ 후속 ${Fe}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${Fe}
                data-dep-b=${d}
                aria-label=${`\uD6C4\uC18D ${Fe} \uC5F0\uACB0 \uD574\uC81C`}
                title="후속 연결 해제"
              >
                ✕
              </button></span
            >`)}
      </div>
      <div class="mon-deppanel__dir" role="group" aria-label="의존 방향">
        <button
          type="button"
          class="mon-deppanel__seg${q.direction==="predecessor"?" is-active":""}"
          data-dep-direction="predecessor"
          aria-pressed=${q.direction==="predecessor"?"true":"false"}
        >
          ← 앞에 (선행 추가)
        </button>
        <button
          type="button"
          class="mon-deppanel__seg${q.direction==="successor"?" is-active":""}"
          data-dep-direction="successor"
          aria-pressed=${q.direction==="successor"?"true":"false"}
        >
          → 뒤에 (후속 추가)
        </button>
      </div>
      <input
        type="search"
        class="mon-deppanel__search"
        placeholder="ID·제목 검색"
        aria-label="의존 후보 검색"
        .value=${q.query}
      />
      <div class="mon-deppanel__list">
        ${pe.length===0?l`<div class="mon-deppanel__empty">후보 없음</div>`:pe.map(Fe=>l`<button
                  type="button"
                  class="mon-deppanel__cand${Fe.disabled?" is-disabled":""}"
                  data-dep-cand=${Fe.bead_id}
                  ?disabled=${Fe.disabled}
                  title=${Fe.reason||Fe.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${Fe.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${Fe.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${Fe.title}</span
                  >${Fe.reason?l`<span class="mon-deppanel__cand-reason"
                        >${Fe.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${Oe===void 0?l`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function We(d){return Pe(d,l`${Ci(at(d),Qe(d),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(_,v)=>i(v,d.root_dir):void 0})}${xe(d.id)}`)}function Ye(){return G.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${G.runnable.map(d=>We(d))}
      </div>`:l`${G.runnable_sections.map(d=>{let _=Ve(d.root_dir);return l`<section
        class="mon2-sec${_?" is-collapsed":""}"
        data-root-dir=${d.root_dir}
        data-section="runnable"
      >
        ${te({root_dir:d.root_dir,name:d.name,count:d.items.length})}
        ${_?"":l`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${d.items.map(v=>We(v))}
            </div>`}
      </section>`})}`}function et(d,_){return l`<div
      class="mon2-item"
      data-bead-id=${d.id}
      data-drag-kind="parallel"
      data-root-dir=${d.root_dir}
      data-row-index=${_}
      data-queue-index=${String(d.queue_index??0)}
    >
      ${Qn(at(d))}
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
      ${xe(d.id)}
    </div>`}function Xe(){let d=rt("parallel");return l`<section
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
        <span class="mon2-area__count">${G.parallel_rows.length}</span>
      </header>
      ${d?"":l`<div class="mon2-area__body" data-drop="parallel">
            ${G.parallel_rows.length===0?l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:G.parallel_rows.map((_,v)=>et(_,v))}
          </div>`}
    </section>`}function ft(d,_,v){return l`<div
      class="mon2-crow${_.fixed?" mon2-crow--fixed":""}"
      draggable=${_.draggable?"true":"false"}
      data-bead-id=${_.id}
      data-drag-kind="chain"
      data-root-dir=${_.root_dir}
      data-lane-id=${d.lane_id}
      data-row-index=${v}
      data-queue-index=${typeof _.queue_index=="number"?String(_.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${uh(_.seq)}</span
      >
      ${_.workspace_name?l`<span class="worker-mini__repo" title=${_.root_dir}
            >${_.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${_.id}</span>
      <span class="mon2-crow__title">${_.title}</span>
      ${_.mismatch?l`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      <span class="mon2-crow__where"
        >${_.location_label==="\uC2E4\uD589\uC911"?`\u25CF ${_.location_label}`:_.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${_.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function Ct(d){let _=G.cross_lanes_revision!==null;return l`<div class="mon2-clane" data-lane-id=${d.lane_id}>
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
              ?disabled=${!_||!d.can_confirm}
              title=${d.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:d.has_mismatch?l`<button
                type="button"
                class="mon2-clane__reapply"
                data-lane-id=${d.lane_id}
                ?disabled=${!_}
                title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
              >
                재적용
              </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${d.lane_id}
          ?disabled=${!_}
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
            </div>`:d.rows.map((v,$)=>ft(d,v,$))}
      </div>
    </div>`}function yt(d,_,v){return l`<div
      class="mon2-item"
      data-bead-id=${_.id}
      data-drag-kind="repo-serial"
      data-root-dir=${_.root_dir}
      data-lane-id=${d.id}
      data-row-index=${v}
      data-queue-index=${String(_.queue_index??0)}
    >
      ${Qn(at(_))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${_.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
      </span>
      ${xe(_.id)}
    </div>`}function _t(d){if(d.length===0)return"";let _=d.length-1;return`${d[0].id} \uC810\uC720${_>0?` +${_}`:""}`}function Ot(d){return l`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${d.id}
    >
      ${Qn({id:d.id,title:d.title,lane:"running",draggable:!1,ghost:!0,badges:[d.badge]})}
    </div>`}function ct(d,_){return l`<div
      class="mon2-lane${_.empty?" mon2-lane--empty":""}"
      data-root-dir=${d.root_dir}
      data-lane-length=${String(_.raw_length)}
    >
      ${vn({id:"",lane:_.id,title:`${d.name} \xB7 \uC9C1\uB82C ${_.index+1}`,items:_.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:l`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${d.root_dir}
          data-lane-id=${_.id}
          data-lane-length=${String(_.raw_length)}
        >
          ${_.occupants.map(v=>Ot(v))}
          ${_.items.length>0?_.items.map((v,$)=>yt(_,v,$)):_.occupants.length>0?"":l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:l`<span
            class="mon2-lane__badge${_.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${_.occupants.length>0?_.occupants.map(v=>`${v.id} \u2014 ${v.badge}`).join(`
`):""}
            >${_t(_.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${d.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${_.empty?l`<div class="mon2-lane__hint">
            ${d.name} 직렬 ${_.index+1} 비어 있음
          </div>`:""}
      ${_.cycle?l`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(_.cross_wait_peers||[]).map(v=>l`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${v.workspace_name}·${v.lane}과 교차 대기
          </div>`)}
    </div>`}function Ge(){let d=rt("serial"),_=G.cross_lanes_revision!==null,v=G.chain_lanes.some($=>$.draft&&$.rows.length===0);return l`<section
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
          ?disabled=${v||!_}
          title=${_?v?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${d?"":l`<div class="mon2-area__body">
            ${G.cross_lanes_unreadable?l`<div class="mon2-clane__unreadable">
                  연결 레인 저장소를 읽을 수 없음
                </div>`:""}
            ${G.chain_lanes.map($=>Ct($))}
            ${G.queue_groups.map($=>$.sublanes.serial.map(B=>ct($,B)))}
          </div>`}
    </section>`}function Ee(){return l`<div class="mon2-wait">${Xe()}${Ge()}</div>`}function M(d){return l`<div class="worker-rungrid">
      ${G.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:G.running.map(_=>Li({bead_id:_.id,attempt_id:_.attempt_id||"",title:_.title,runner:_.runner??null,model:_.model??null,effort:_.effort??null,speed:_.speed??null,started_at:_.started_at??null,kind:_.kind,..._.kind==="session"?{updated_at:_.updated_at}:{},workflow:_.workflow||null,resumed_from:_.resumed_from??null,continuation_mode:_.continuation_mode??null,paused:_.run_state==="paused",failed:_.run_state==="failed",status:_.status,status_label:_.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:_.can_resume!==!1,can_pause:_.can_pause!==!1,exec_chips:_.exec_chips||null,usage:_.usage||null,discard:_.discard},d,Z,{monitor:{repo:_.workspace_name,root_dir:_.root_dir,serial_lane_id:_.serial_lane_id,last_activity:_.last_activity||null,legs:_.legs||[],dependency_chips:He(_)}}))}
    </div>`}function X(d){let _={runnable:G.runnable,queue:G.queue,running:G.running,pr_wait:G.pr_wait,done:G.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${ch.map(v=>{let $=_[v.lane],B=v.lane==="runnable"?G.runnable_flat?$.length>0?Ye():void 0:G.runnable_sections.length>0?Ye():void 0:v.lane==="queue"?G.queue_groups.length>0||G.chain_lanes.length>0||G.parallel_rows.length>0?Ee():void 0:v.lane==="running"?M(d):$.length>0?l`${$.map(J=>Qn(J))}`:void 0;return vn({id:`monitor-${v.lane}`,lane:v.pane,title:v.lane==="done"?`\uC644\uB8CC\xB7${C()}`:v.title,items:$,empty:v.empty,body:B,live:v.lane==="running"&&$.length>0,controls:v.lane==="runnable"?ue():void 0,header_control:S(v.lane,$.length)})})}
      </div>`}function ue(){return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${T.show_blocked}
        />
        🔒
        blocked${G.runnable_hidden.blocked>0?` ${G.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Hi.map(d=>l`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${T.spec===d.value?" is-active":""}"
              data-spec=${d.value}
              aria-pressed=${T.spec===d.value?"true":"false"}
            >
              ${d.label}
            </button>`)}
        ${G.runnable_hidden.spec>0?l`<span class="worker-filter__hidden"
              >숨김 ${G.runnable_hidden.spec}</span
            >`:""}
      </div>
      <label
        class="worker-filter__tgl"
        title="열린 선행 또는 열린 후속이 있는 카드만"
      >
        <input
          type="checkbox"
          class="mon-filter__deps"
          .checked=${T.with_deps}
        />
        의존
        있음${G.runnable_hidden.deps>0?` ${G.runnable_hidden.deps}`:""}
      </label>
    </div>`}function S(d,_){return d==="runnable"?l`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${j}
      >
        ${Ls.map(v=>l`<option
              value=${v.value}
              ?selected=${j===v.value}
            >
              ${v.label}
            </option>`)}
      </select>`:d==="running"?l`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${k}
      >
        <option value="started" ?selected=${k==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${k==="repo"}>
          레포순
        </option>
      </select>`:d==="pr_wait"&&_>0?l`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:d==="done"?l`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${Vn.map(v=>l`<option value=${v.value} ?selected=${h===v.value}>
              ${v.label}
            </option>`)}
      </select>`:""}function K(d){let _=s&&s.get?s.get():null,v=s&&s.getWorkspacesState?s.getWorkspacesState():[],$=d===void 0?s&&s.crossLanes?s.crossLanes():void 0:d,B={done_since:pr(h,p()),running_sort:k,candidate_filter:T,candidate_sort:j};return $!==void 0&&(B.cross_lanes=$),Gi(_,v,B)}function _e(){let d=p();G=K(),ee=new Map;for(let _ of[...G.runnable,...G.queue,...G.running,...G.pr_wait,...G.done])!_.non_occupying&&!ee.has(_.id)&&ee.set(_.id,_);Ke(X(d),F),L()?.render(),x(),w()}function x(){let d=new Map;for(let _ of G.queue_groups)d.set(_.root_dir,_.auto_advance);for(let _ of Array.from(F.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let v=_.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=d.get(v);typeof $=="boolean"&&_.setAttribute("title",`${_.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function L(){if(se)return se;let d=F.querySelector(".mon2-deck");return d?(se=Ad(d,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>G.done,rangeLabel:C,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:V,onFocusChange:_=>{H=_,w()}}),se):null}function w(){F.classList.toggle("has-focus",H!==null);for(let d of Array.from(F.querySelectorAll(".mon2-sec[data-root-dir]")))d.classList.toggle("is-focus",H!==null&&d.getAttribute("data-root-dir")===H);for(let d of Array.from(F.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let _=ee.get(d.getAttribute("data-bead-id")||"");d.classList.toggle("is-focus",H!==null&&!!_&&_.root_dir===H)}for(let d of Array.from(F.querySelectorAll(".mon2-crow[data-root-dir]")))d.classList.toggle("is-focus",H!==null&&d.getAttribute("data-root-dir")===H)}function D(d,_){let v=a?a():void 0;if(!_||!v||_===v||!c){r(d);return}c(_).then(()=>{r(d)}).catch($=>{n("workspace switch for %s failed: %o",_,$)})}function V(d){if(!d)return;let _=a?a():void 0,v=()=>{try{u?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!c||_&&_===d){v();return}c(d).then(v).catch($=>{n("workspace switch for %s failed: %o",d,$),le("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function me(d){fn(d).then(_=>{le(_?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",_?"success":"error",1400)})}function ae(d){let _=ee.get(d)||null;return{item:_,root_dir:_?_.root_dir:"",revision:_?_.expected_revision:0}}function ke(d){if(typeof d=="string"&&d.length>0)return d;if(d&&typeof d=="object"){let _=d;if(typeof _.message=="string"&&_.message.length>0)return _.message;if(typeof _.error=="string"&&_.error.length>0)return _.error;if(_.error&&typeof _.error=="object"&&typeof _.error.message=="string")return _.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function st(d,_,v){let{root_dir:$}=ae(_);if(!(!_||!v||v===_))try{await je(d,{a:_,b:v},$)}catch(B){le(ke(B),"error")}}async function Ze(d,_,v){let $=G.owner_of[_];if(typeof $!="string"||$.length===0){le(`${_}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await je(d,{a:_,b:v},$)}catch(B){le(ke(B),"error")}_e()}function Ce(d){return G.runnable.some(_=>_.id===d)||G.parallel_rows.some(_=>_.id===d)?!0:G.queue_groups.some(_=>_.sublanes.serial.some(v=>v.items.some($=>$.id===d)))}function ut(d,_){!d||!Ce(d)||(q=q&&q.bead_id===d&&_===void 0?null:{bead_id:d,direction:_||"predecessor",query:""},_e())}function it(){let d=new Map,_=s&&s.get?s.get():null,v=$=>Array.isArray($)?$.filter(B=>typeof B=="string"&&B.length>0):[];for(let $ of Array.isArray(_)?_:[]){if(!$||typeof $!="object")continue;let B=$.bead_blocked_by&&typeof $.bead_blocked_by=="object"?$.bead_blocked_by:{};for(let[J,pe]of Object.entries(B))Array.isArray(pe)&&d.set(J,v(pe));for(let J of[...Array.isArray($.runnable)?$.runnable:[],...Array.isArray($.session_active)?$.session_active:[]])J&&typeof J.bead_id=="string"&&Array.isArray(J.blocked_by)&&J.blocked_by.length>0&&d.set(J.bead_id,v(J.blocked_by))}return d}function Ft(){let d=it();for(let _ of N){let v=(d.get(_.a)||[]).slice();_.type==="dep-remove"?d.set(_.a,v.filter($=>$!==_.b)):v.includes(_.b)||d.set(_.a,[...v,_.b])}return d}function jt(d=G){let _=new Map,v=new Map,$=new Set,B=new Set;for(let pe of d.chain_lanes){_.set(pe.lane_id,{status:pe.status,entries:pe.rows.map(Oe=>({bead_id:Oe.id,root_dir:Oe.root_dir}))});for(let Oe of pe.rows)v.set(Oe.id,pe.lane_id),Oe.fixed&&$.add(Oe.id),Oe.unplaced||B.add(Oe.id)}let J=new Map;for(let pe of d.parallel_rows)typeof pe.queue_index=="number"&&J.set(pe.id,pe.queue_index);for(let pe of d.queue_groups)for(let Oe of pe.sublanes.serial)for(let Fe of Oe.items)typeof Fe.queue_index=="number"&&J.set(Fe.id,Fe.queue_index);return{blocked_by_map:Ft(),owner_of:new Map(Object.entries(d.owner_of)),cross_lanes:_,owner_lane_of:v,fixed_members:$,placed_members:B,parallel_rows:d.parallel_rows.map(pe=>({bead_id:pe.id,root_dir:pe.root_dir,queue_index:pe.queue_index??0})),parallel_raw_length:new Map(Object.entries(d.parallel_raw_length)),queue_index_of:J}}function Gt(d,_){let v=ee.get(_);if(v&&v.root_dir===d)return v.expected_revision;let $=G.queue_groups.find(B=>B.root_dir===d);return $?$.revision:0}async function Mt(d,_,v){try{if(d.type==="worker-queue-place"||d.type==="worker-queue-reorder"||d.type==="worker-queue-remove"){let $=await we(d.type,d.payload,d.root_dir,v.get(d.root_dir)??Gt(d.root_dir,_));return!$||typeof $.applied!="boolean"?(le("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),!1):($.queue&&typeof $.queue.revision=="number"&&v.set(d.root_dir,$.queue.revision),$.conflict?(le("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):$.applied===!1?(le($.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0)}return(d.type==="dep-add"||d.type==="dep-remove")&&await je(d.type,{a:d.a,b:d.b},d.root_dir),!0}catch($){return le(ke($),"error"),!1}}function Ut(d){(d.type==="dep-add"||d.type==="dep-remove")&&(N=[...N,{type:d.type,a:d.a,b:d.b}])}async function It(d,_){if(!o)return{ok:!1};try{let v=await o(d.type,{...d.payload,expected_revision:_});return!v||typeof v.revision!="number"?(le("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:v.revision}}catch(v){let $=v,B=$&&$.code==="conflict"?$.details?.cross_lanes:null;return B&&typeof B.revision=="number"&&Array.isArray(B.lanes)?{ok:!1,conflict:B}:(le(ke(v),"error"),{ok:!1})}}async function Kt(d,_,v){let $=new Map,B=d.ops.slice(0,d.lane_op_index),J=d.ops.slice(d.lane_op_index);for(let Oe of B){if(!await Mt(Oe,v,$))return{done:!0};Ut(Oe)}let pe=_;for(let Oe of d.lane_ops){if(pe===null)return le("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Fe=await It(Oe,pe);if(!Fe.ok)return Fe.conflict?{done:!1,conflict:Fe.conflict}:{done:!0};pe=Fe.revision}for(let Oe of J){if(!await Mt(Oe,v,$))return{done:!0};Ut(Oe)}return{done:!0}}async function qe(d,_){N=[];let v=G;for(let $=0;;$+=1){let B=d(jt(v));if("refused"in B){le(B.refused,"error");break}let J=await Kt(B,v.cross_lanes_revision,_);if(J.done)break;if($>=1){le("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}v=K(J.conflict)}N=[],_e()}async function Nt(d,_){await qe(v=>qi(d,_,v),d.bead_id)}async function Yt(d,_){if(d==="create"){await qe(v=>Fi(null,v),"");return}if(d==="remove"){let v=G.chain_lanes.find($=>$.lane_id===_);if(v&&!v.draft){let $=v.rows.filter((B,J)=>J===0?!1:!B.mismatch).length;if(!b(`\uC758\uC874 ${$}\uAC1C\uB97C \uD568\uAED8 \uC81C\uAC70\uD569\uB2C8\uB2E4`))return}await qe($=>Od(_,$),"");return}await qe(v=>d==="confirm"?Cd(_,v):Rd(_,v),"")}async function nt(d,_){let v=ee.get(d);if(!v){_e();return}let $={kind:"candidate",bead_id:d,root_dir:v.root_dir};if(_==="new-lane"){await qe(B=>Fi({bead_id:d,root_dir:v.root_dir},B),d);return}if(_.startsWith("lane:")){let B=_.slice(5);if(!G.chain_lanes.find(pe=>pe.lane_id===B)){_e();return}await qe(pe=>qi($,{kind:"chain",lane_id:B,marker_index:(pe.cross_lanes.get(B)?.entries??[]).length},pe),d);return}if(_.startsWith("serial:")){let B=_.slice(7),J=(v.place_lanes||[]).find(pe=>pe.id===B);await Nt($,{kind:"repo-serial",root_dir:v.root_dir,lane_id:B,index:J?J.index:0});return}await Nt($,{kind:"parallel",marker_index:G.parallel_rows.length})}async function De(d,_){let v=G.parallel_rows,$=v.findIndex(cn=>cn.id===d);if($<0)return;let B=v[$].root_dir,J=[];v.forEach((cn,Dt)=>{cn.root_dir===B&&J.push(Dt)});let pe=J.indexOf($),Oe=J[pe+_];if(typeof Oe!="number")return;let Fe=_===-1?Oe:J[pe+2]??Math.min(v.length,Oe+1);await Nt({kind:"parallel",bead_id:d,root_dir:B,queue_index:v[$].queue_index??0},{kind:"parallel",marker_index:Fe})}async function I(d){for(let _ of G.chain_lanes){let v=_.rows.find($=>$.id===d);if(v){await Nt({kind:"chain",bead_id:d,root_dir:v.root_dir,lane_id:_.lane_id,...typeof v.queue_index=="number"?{queue_index:v.queue_index}:{}},{kind:"parallel",marker_index:G.parallel_rows.length});return}}}let fe=null,Re=!1,tt=null;function At(){tt!==null&&clearTimeout(tt),tt=setTimeout(()=>{tt=null,Re=!1},0)}function mt(d,_){let v=_&&typeof _.closest=="function"?_.closest("[data-row-index]"):null;if(v&&d.contains(v)){let $=Number(v.getAttribute("data-row-index"));return Number.isFinite($)?$:0}return d.querySelectorAll("[data-row-index]").length}function Rt(d){let _=d.target,v=typeof _?.closest=="function"?_.closest("[data-drop]"):null;if(!v||!fe)return null;let $=v.getAttribute("data-drop");if($==="candidate")return{zone:v,target:{kind:"candidate"}};if($==="parallel")return{zone:v,target:{kind:"parallel",marker_index:mt(v,_)}};if($==="chain")return{zone:v,target:{kind:"chain",lane_id:v.getAttribute("data-lane-id")||"",marker_index:mt(v,_)}};if($==="repo-serial"){let B=v.getAttribute("data-root-dir")||"";if(B!==fe.root_dir)return null;let J=typeof _?.closest=="function"?_.closest("[data-queue-index]"):null,pe=J&&v.contains(J)?J.getAttribute("data-queue-index"):v.getAttribute("data-lane-length"),Oe=Number(pe);return{zone:v,target:{kind:"repo-serial",root_dir:B,lane_id:v.getAttribute("data-lane-id")||"",index:Number.isFinite(Oe)?Oe:0}}}return null}function Pt(){for(let d of Array.from(F.querySelectorAll(".is-drop-over")))d.classList.remove("is-drop-over")}function Vt(d){let _=d.target,v=typeof _?.closest=="function"?_.closest('[draggable="true"][data-bead-id]'):null,$=v?v.closest("[data-drag-kind]"):null;if(!$)return;let B=$.getAttribute("data-bead-id")||"",J=$.getAttribute("data-drag-kind")||"",pe=$.getAttribute("data-root-dir")||"";if(!B||!J||!pe)return;let Oe=$.getAttribute("data-queue-index")||"",Fe=Number(Oe),cn=$.getAttribute("data-lane-id")||"";fe={kind:J,bead_id:B,root_dir:pe,...Oe!==""&&Number.isFinite(Fe)?{queue_index:Fe}:{},...cn?{lane_id:cn}:{}},Re=!0,ce=null,F.classList.add("is-dragging");try{d.dataTransfer?.setData("text/plain",B),d.dataTransfer&&(d.dataTransfer.effectAllowed="move")}catch{}}function tn(d){let _=Rt(d);_&&(d.preventDefault(),d.dataTransfer&&(d.dataTransfer.dropEffect="move"),_.zone.classList.add("is-drop-over"))}function wt(d){let _=d.target;typeof _?.closest=="function"&&_.closest("[data-drop]")?.classList.remove("is-drop-over")}function nn(){fe=null,Pt(),F.classList.remove("is-dragging"),At()}function ln(d){let _=Rt(d),v=fe;fe=null,Pt(),F.classList.remove("is-dragging"),!(!_||!v)&&(d.preventDefault(),Nt(v,_.target))}function Ln(d){return{runner:d.runner||void 0,model:d.model||void 0,effort:d.effort||void 0,status:d.run_state==="running"?"running":d.run_state,worktree:d.root_dir}}function R(d,_){let{item:v,root_dir:$,revision:B}=ae(_),J=v?.attempt_id||"",pe=d.classList;if(pe.contains("worker-dep__remove")){st("dep-remove",_,d.dataset.blockerId||"");return}if(pe.contains("mon2-rowops__up")||pe.contains("mon2-rowops__down")){De(_,pe.contains("mon2-rowops__up")?-1:1);return}if(pe.contains("mon2-rowops__remove")){we("worker-queue-remove",{bead_id:_},$,B);return}if(pe.contains("mon2-crow__detach")){I(_);return}if(pe.contains("mon-dep__btn")){ut(_);return}if(pe.contains("worker-dep__open")){ut(_,d.getAttribute("data-dep-direction")==="successor"?"successor":"predecessor");return}if(pe.contains("mon-lane__chip")){let Oe=d.getAttribute("data-lane-id")||"";F.querySelector(`.mon2-clane[data-lane-id="${Oe}"]`)?.scrollIntoView({block:"nearest"});return}if(pe.contains("mon-deppanel__unlink")){Ze("dep-remove",d.getAttribute("data-dep-a")||"",d.getAttribute("data-dep-b")||"");return}if(pe.contains("mon-deppanel__seg")){q&&(q={...q,direction:d.getAttribute("data-dep-direction")==="successor"?"successor":"predecessor"},_e());return}if(pe.contains("mon-deppanel__cand")){let Oe=d.getAttribute("data-dep-cand")||"";q&&Oe&&(q.direction==="predecessor"?Ze("dep-add",q.bead_id,Oe):Ze("dep-add",Oe,q.bead_id));return}if(pe.contains("mon-overlap__chip")){let Oe=d.getAttribute("data-overlap-id")||"";z=!!z&&z.bead_id===_&&z.counterpart_id===Oe?null:{bead_id:_,counterpart_id:Oe},_e();return}if(pe.contains("mon-overlap__place")){bt(_,d.getAttribute("data-counterpart-id")||"");return}if(pe.contains("worker-card__place")){ce=ce===_?null:_,_e();return}if(pe.contains("worker-card__place-cancel")){ce=null,_e();return}if(pe.contains("worker-card__place-lane")){let Oe=d.getAttribute("data-lane")||"parallel";ce=null,nt(_,Oe);return}if(pe.contains("rtile__session")){Z=J,J&&v&&(re.hidden=!1,Se.open({attempt_id:J,root_dir:$,meta:Ln(v)})),_e();return}if(pe.contains("rtile__pause")){je("worker-attempt-pause",{attempt_id:J},$);return}if(pe.contains("rtile__resume")){Mr().then(Oe=>{if(Oe!==null)return Q("worker-attempt-resume",{attempt_id:J,...Oe!==""?{instructions:Oe}:{}},$,B)});return}if(pe.contains("rtile__dismiss")){we("worker-attempt-dismiss",{attempt_id:J},$,B);return}if(pe.contains("rtile__discard")){if(!b(As(_,"unmerged")))return;be({bead_id:_,...J?{attempt_id:J}:{},...d.dataset.operationId?{operation_id:d.dataset.operationId}:{}},$,B);return}if(pe.contains("worker-mini__merge")){let Oe=Y($,_);Oe?.mismatch&&Oe.continuation===null?$e($,_,B,Oe.mismatch):we("worker-merge-queue-add",{bead_id:_},$,B);return}if(pe.contains("worker-mini__merge-cancel")){we("worker-merge-queue-remove",{bead_id:_},$,B);return}if(pe.contains("worker-mini__discard")){let Oe=d.dataset.discardMode==="merged"?"merged":"unmerged";if(!b(As(_,Oe)))return;be({bead_id:_,...d.dataset.attemptId?{attempt_id:d.dataset.attemptId}:{},...d.dataset.operationId?{operation_id:d.dataset.operationId}:{}},$,B);return}if(pe.contains("worker-mini__revise-fix")){Q("worker-revise-fix",{bead_id:_},$,B);return}pe.contains("worker-mini__revise-approve")&&we("worker-revise-approve",{bead_id:_},$,B)}function P(d){let _=Re;Re=!1;let v=d.target;if(!v||typeof v.closest!="function"||v.closest("dialog")||v.closest(".worker-drawer-overlay")||v.closest("a"))return;let $=v.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){d.preventDefault();let sr=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";sr&&me(sr);return}let B=v.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(B){d.preventDefault();let Zt=B.getAttribute("data-root-dir")||ee.get(v.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||B.getAttribute("title")||"";V(Zt);return}let J=v.closest(".mon2-sec__toggle");if(J){d.preventDefault(),pt(J.getAttribute("data-root-dir")||"");return}let pe=v.closest(".mon2-area__toggle");if(pe){d.preventDefault(),O(pe.getAttribute("data-area")||"parallel");return}if(v.closest(".mon2-newlane")){d.preventDefault(),Yt("create","");return}let Oe=v.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove");if(Oe){d.preventDefault();let Zt=Oe.getAttribute("data-lane-id")||"";Yt(Oe.classList.contains("mon2-clane__confirm")?"confirm":Oe.classList.contains("mon2-clane__reapply")?"reapply":"remove",Zt);return}if(v.closest(".mon-merge-all")){d.preventDefault(),oe();return}let Fe=v.closest(".mon-filter__spec");if(Fe){d.preventDefault(),T={...T,spec:Fe.getAttribute("data-spec")||"all"},Vi(T),_e();return}let cn=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!cn)return;let Dt=cn.getAttribute("data-bead-id")||"",Wn=v.closest("button");if(Wn){d.preventDefault(),R(Wn,Dt);return}Dt&&!_&&(d.preventDefault(),D(Dt,cn.getAttribute("data-root-dir")||ae(Dt).root_dir))}function Me(d){let _=d.target;if(!_||typeof _.closest!="function")return;let v=_.closest(".mon-filter__blocked");if(v){T={...T,show_blocked:v.checked},Vi(T),_e();return}let $=_.closest(".mon-filter__deps");if($){T={...T,with_deps:$.checked},Vi(T),_e();return}let B=_.closest(".mon-candidate-sort");if(B){j=Ls.some(Oe=>Oe.value===B.value)?B.value:"repo_spec",nh(j),_e();return}let J=_.closest(".mon-running-sort");if(J){k=J.value==="repo"?"repo":"started",ih(k),_e();return}let pe=_.closest(".mon-done-range");pe&&(h=bn(pe.value)?pe.value:dn,oh(h),_e())}function f(d){let _=d.target,v=_&&typeof _.closest=="function"?B=>_.closest(B):()=>null,$=!1;z&&!v(".mon-overlap__popover, .mon-overlap__chip")&&(z=null,$=!0),q&&!v(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(q=null,$=!0),$&&_e()}function y(d){d.key!=="Escape"||!z&&!q||(z=null,q=null,_e())}function m(d){let _=d.target;!_||typeof _.closest!="function"||!_.closest(".mon-deppanel__search")||!q||(q={...q,query:_.value},_e())}e.addEventListener("click",P),e.addEventListener("change",Me),e.addEventListener("input",m),document.addEventListener("click",f),document.addEventListener("keydown",y),e.addEventListener("dragstart",Vt),e.addEventListener("dragover",tn),e.addEventListener("dragleave",wt),e.addEventListener("drop",ln),e.addEventListener("dragend",nn),s&&typeof s.subscribe=="function"&&(Ae=s.subscribe(()=>{try{ve.clear(),_e()}catch{}}));function E(){ge!==null&&(clearInterval(ge),ge=null)}function A(){tt!==null&&(clearTimeout(tt),tt=null)}return{load(){n("load"),_e(),ge===null&&(ge=setInterval(()=>{try{_e()}catch{}},lh))},pause(){E()},clear(){E(),A(),Ae&&(Ae(),Ae=null),Se.destroy(),re.hidden=!0,se?.destroy(),se=null,e.removeEventListener("click",P),e.removeEventListener("change",Me),e.removeEventListener("input",m),document.removeEventListener("click",f),document.removeEventListener("keydown",y),e.removeEventListener("dragstart",Vt),e.removeEventListener("dragover",tn),e.removeEventListener("dragleave",wt),e.removeEventListener("drop",ln),e.removeEventListener("dragend",nn),e.replaceChildren()}}}function ip(e,t,n){let r=St("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return k=>{k.preventDefault(),r("click tab %s",h),n.gotoView(h)}}function c(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=c();return l`
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
    `}function p(){let h=c();return l`
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
    `}function b(){s&&Ke(u(),s),o&&Ke(p(),o)}return b(),a=t.subscribe(()=>b()),{destroy(){a&&(a(),a=null),s&&Ke(l``,s),o&&Ke(l``,o)}}}var lp=["bug","feature","task","epic","chore"];function cp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var up=["Critical","High","Medium","Low","Backlog"];function dp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),c=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),b=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function k(){o.replaceChildren();let N=document.createElement("option");N.value="",N.textContent="\u2014 Select \u2014",o.appendChild(N);for(let H of lp){let C=document.createElement("option");C.value=H,C.textContent=cp(H),o.appendChild(C)}a.replaceChildren();for(let H=0;H<=4;H+=1){let C=document.createElement("option");C.value=String(H);let F=up[H]||"Medium";C.textContent=`${H} \u2013 ${F}`,a.appendChild(C)}}k();function T(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function j(N){s.disabled=N,o.disabled=N,a.disabled=N,i.disabled=N,c.disabled=N,p.disabled=N,b.disabled=N,b.textContent=N?"Creating\u2026":"Create"}function W(){u.textContent=""}function Z(N){u.textContent=N}function ce(){try{let N=window.localStorage.getItem("beads-ui.new.type");N?o.value=N:o.value="";let H=window.localStorage.getItem("beads-ui.new.priority");H&&/^\d$/.test(H)?a.value=H:a.value="2"}catch{o.value="",a.value="2"}}function z(){let N=o.value||"",H=a.value||"";N.length>0&&window.localStorage.setItem("beads-ui.new.type",N),H.length>0&&window.localStorage.setItem("beads-ui.new.priority",H)}async function q(){W();let N=String(s.value||"").trim();if(N.length===0){Z("Title is required"),s.focus();return}let H=Number(a.value||"2");if(!(H>=0&&H<=4)){Z("Priority must be 0..4"),a.focus();return}let C=String(o.value||""),F=String(c.value||""),re={title:N};C.length>0&&(re.type=C),String(H).length>0&&(re.priority=H),F.length>0&&(re.description=F),j(!0);try{await t("create-issue",re)}catch{j(!1),Z("Failed to create issue");return}z(),j(!1),T()}return n.addEventListener("cancel",N=>{N.preventDefault(),T()}),h.addEventListener("click",()=>T()),p.addEventListener("click",()=>T()),n.addEventListener("keydown",N=>{N.key==="Enter"&&(N.ctrlKey||N.metaKey)&&(N.preventDefault(),q())}),r.addEventListener("submit",N=>{N.preventDefault(),q()}),{open(){r.reset(),W(),ce();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){T()}}}var dh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ph(e,t){return Fa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function pp(e,t,n){return l`
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
  `}var fh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function mp(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(ee=>le(ee,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,u="",p=null;function b(){if(p)return p;let ee=a.querySelector('[data-pane="execution"]');return ee?(p=Jo(ee,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:ve=>t.queueStore?.set?.(ve)}),p):null}function h(){return l`
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
    `}function k(){let ee=r.get();return l`
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
              ${pp(ee,s(),Z)}
              ${fp(ee,u,{onDraft:ve=>{u=ve},onAdd:ce,onRemove:z})}
              ${_p(ee,q)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function T(ee){let ve=r.get();if(ve)try{let Ae=await n("display-policy-set",{expected_revision:ve.revision,policy:ee(ve)});j(Ae),Ae&&Ae.conflict&&Ae.policy&&(Ae=await n("display-policy-set",{expected_revision:Ae.policy.revision,policy:ee(Ae.policy)}),j(Ae)),Ae&&Ae.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function j(ee){ee&&ee.policy&&typeof ee.policy=="object"&&r.set(ee.policy)}function W(ee){T(ee)}function Z(ee){let ve=r.get();if(!ve)return;let Ae=!_h(ee,ve);W(ge=>mh(ee,ge,Ae))}function ce(){let ee=u.trim();ee.length!==0&&(u="",W(ve=>ve.hidden_prefixes.includes(ee)?{hidden_prefixes:ve.hidden_prefixes}:{hidden_prefixes:[...ve.hidden_prefixes,ee]}),N())}function z(ee){W(ve=>({hidden_prefixes:ve.hidden_prefixes.filter(Ae=>Ae!==ee)}))}function q(ee){let ve=r.get();if(!ve)return;let Ae=ve.chips[ee]===!1;W(()=>({chips:{[ee]:Ae}}))}function N(){Ke(l`
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
                  @click=${()=>H(ee.id)}
                >
                  <span class="settings-dialog__glyph">${ee.glyph}</span>
                  ${ee.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${G}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${k()}
          </div>
        </div>
      `,a),b()}function H(ee){i=ee,N()}let C=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",C),a.addEventListener("cancel",C);let F=ee=>{ee.target===a&&G()};a.addEventListener("click",F);let re=null;r.subscribe&&(re=r.subscribe(()=>{c&&N()}));let Te=null;t.implPresetStore?.subscribe&&(Te=t.implPresetStore.subscribe(()=>{c&&p?.render()}));function ye(ee="execution"){c||(c=!0,t.onOpenChange?.(!0),i=ee,u="",N(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),b()?.load())}function G(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:ye,close:G,sessionDraft:()=>p?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",C),a.removeEventListener("cancel",C),a.removeEventListener("click",F),re&&(re(),re=null),Te&&(Te(),Te=null),p?.destroy(),p=null,a.remove()}}}function _h(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function mh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var gh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],gp="usage-meter-card",bh="usage-meter-layer",bp=600,hh=["token_expired","relogin_required"];function hp(e){return String(e).padStart(2,"0")}function yh(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function yp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${hp(r.getHours())}:${hp(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${gh[r.getMonth()]} ${r.getDate()} ${o}`;return`${yh(n,t)} \xB7 ${i}`}function vh(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function vp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function wp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var kp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function xp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function wh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:xp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function kh(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=wh(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?xp(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function $p(e,t){return`${e}:${t}`}function Ap(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function u(){Ke(l``,e),e.hidden=!0,b()}function p(){if(c===null){let ge=e.ownerDocument;c=ge.createElement("div"),c.id=bh,c.className="usage-meter__layer",ge.body.appendChild(c)}return c}function b(){c!==null&&(Ke(l``,c),c.remove(),c=null)}function h(ge){n!==ge&&(n===null&&(document.addEventListener("mousedown",T),document.addEventListener("keydown",W),window.addEventListener("resize",j)),n=ge)}function k(){n!==null&&(n=null,document.removeEventListener("mousedown",T),document.removeEventListener("keydown",W),window.removeEventListener("resize",j))}function T(ge){let se=ge.target;se&&(e.contains(se)||c!==null&&c.contains(se))||(k(),G())}function j(){G()}function W(ge){ge.key==="Escape"&&(k(),G())}function Z(ge){n===ge?k():h(ge),G()}function ce(){k(),G()}async function z(ge,se){if(r.has(ge.key))return;let Se=$p(ge.key,se);r.set(ge.key,se),a.delete(Se),G();let we=null;try{we=await(await fetch(ge.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:se})})).json()}catch{we=null}if(t)return;if(r.delete(ge.key),!we||we.ok!==!0){let Q=we&&typeof we.error=="string"&&we.error.length>0?we.error:"network_error";a.set(Se,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${Q}`}),G();return}let Y=Array.isArray(we.warnings)?we.warnings.filter(Q=>typeof Q=="string"&&Q.length>0):[];Y.length>0&&a.set(Se,{kind:"warn",text:Y.join(" \xB7 ")}),G(),await Ae()}function q(ge,se,Se,we){let Y=wp(ge.pct),$e=`resets ${yp(ge.resetsAt,we)}${se?` \xB7 ${Se}`:""}`;return l`<span
      class="usage-meter__window ${vp(Y)}"
      style=${`--progress: ${Y}%`}
      title=${$e}
    >
      <span class="usage-meter__label">${ge.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${Y}%</span>
    </span>`}function N(ge,se,Se){let we=se.available&&typeof se.ageSeconds=="number"&&se.ageSeconds>bp,Y=we&&typeof se.ageSeconds=="number"?`${Math.floor(se.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",Q=se.accounts.filter(oe=>!oe.active).length,$e=`usage-meter__group${we?" usage-meter__group--stale":""}`,be=l`<span class="usage-meter__provider"
        >${ge.label}</span
      >
      ${se.available?se.windows.map(oe=>q(oe,we,Y,Se)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Q>0?l`<span class="usage-meter__badge">+${Q}</span>`:""}`;if(se.accounts.length===0)return l`<span
        class=${$e}
        aria-label=${`${ge.label} usage`}
        >${be}</span
      >`;let je=n===ge.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${$e}`}
      aria-label=${`${ge.label} usage`}
      aria-expanded=${je?"true":"false"}
      aria-controls=${gp}
      @click=${()=>Z(ge.key)}
    >
      ${be}
    </button>`}function H(ge,se){return l`<span class="usage-meter" aria-label="Usage">
      ${ge.map(Se=>N(Se.provider,Se.snapshot,se))}
    </span>`}function C(ge,se){let Se=wp(ge.pct),we=yp(ge.resetsAt,se);return l`<span
      class="usage-meter__account-window ${vp(Se)}"
      style=${`--progress: ${Se}%`}
    >
      <span class="usage-meter__account-key">${ge.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Se}%</span>
      <span class="usage-meter__account-reset"
        >${we.length>0?`\u21BB ${we}`:""}</span
      >
    </span>`}function F(ge,se){return hh.includes(se)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ge.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function re(ge,se,Se){let we=se.status==="ok",Y=typeof se.ageSeconds=="number"&&se.ageSeconds>bp,Q=a.get($p(ge.key,se.number)),$e=r.get(ge.key),be=$e!==void 0,je=$e===se.number,oe=["usage-meter__account"];return se.active&&oe.push("usage-meter__account--active"),we||oe.push("usage-meter__account--unavailable"),Y&&oe.push("usage-meter__account--stale"),l`<div class=${oe.join(" ")}>
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
              >${vh(se.ageSeconds)}</span
            >`}
        ${se.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${be}
              @click=${()=>{z(ge,se.number)}}
            >
              ${je?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${we?l`<div class="usage-meter__account-windows">
            ${se.windows.map(Ve=>C(Ve,Se))}
          </div>`:l`<div class="usage-meter__account-status">
            ${F(ge,se.status)}
          </div>`}
      ${Q===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${Q.kind}"
          >
            ${Q.text}
          </div>`}
    </div>`}function Te(ge,se,Se){let we=se.accounts.filter(Y=>Y.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ge.label} · 활성 ${we} / 전체
        ${se.accounts.length}
      </h2>
      ${se.accounts.map(Y=>re(ge,Y,Se))}
    </section>`}function ye(ge,se){return l`<div
      class="usage-meter__card"
      id=${gp}
      role="dialog"
      aria-label=${`${ge.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${Te(ge.provider,ge.snapshot,se)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function G(){let ge=[];for(let we of kp){let Y=o.get(we.key);Y&&ge.push({provider:we,snapshot:Y})}if(ge.length===0){k(),u();return}let se=ge.find(we=>we.provider.key===n&&we.snapshot.accounts.length>0);se||k();let Se=Date.now();Ke(H(ge,Se),e),e.hidden=!1,se?ee(se,Se):b()}function ee(ge,se){let Se=p(),we=e.getBoundingClientRect(),Y=e.ownerDocument.documentElement.clientWidth;Se.style.setProperty("--usage-meter-anchor-top",`${we.bottom}px`),Se.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,Y-we.right)}px`),Ke(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ce}
        ></div>
        ${ye(ge,se)}`,Se)}async function ve(ge){try{let se=await fetch(ge.endpoint);return se.ok?kh(await se.json()):null}catch{return null}}async function Ae(){i+=1;let ge=i,se=await Promise.all(kp.map(async Se=>({provider:Se,snapshot:await ve(Se)})));if(!(t||ge!==i)){for(let Se of se)Se.snapshot?o.set(Se.provider.key,Se.snapshot):o.delete(Se.provider.key);G()}}return u(),Ae(),s=setInterval(()=>{Ae()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),k(),u()}}}function Sp(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var $h="worker-ineligible";function Ki(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ep(e){return Ki(e).includes($h)}var xh="worker-serial";function Yi(e){return Ki(e).includes(xh)}function Zi(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Ah=new Set(["done","failed","orphaned","stopped","discarded"]),Sh={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Eh={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Th={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Xi(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Th[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Tp(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,u=new Map,p=!1,b=null,h=null,k=null,T=new Set,j=!1,W=0,Z=null,ce=new Set;function z(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function q(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function N(){return o&&o()||""}async function H(){if(!s)return;let x=++W;j=!0,k=null,T.clear(),Ge();try{let L=await s("worker-parallel-analysis-targets",{root_dir:N()});if(x!==W||!Ee)return;let w=Array.isArray(L?.qualified)?L.qualified:[],D=Array.isArray(L?.excluded)?L.excluded:[];k={qualified:w,excluded:D};for(let V of w)V&&typeof V.id=="string"&&T.add(V.id)}catch{x===W&&Ee&&(k={qualified:[],excluded:[]},le("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{x===W&&(j=!1,Ee&&Ge())}}function C(x){return Array.isArray(x.runs)?x.runs:[]}function F(){let x=z(),L=new Set;for(let w of Object.values(x.attempts||{})){let D=w;D&&typeof D.bead_id=="string"&&!Ah.has(D.status)&&L.add(D.bead_id)}for(let w of Array.isArray(x.pr_wait)?x.pr_wait:[])w&&typeof w.bead_id=="string"&&L.add(w.bead_id);for(let w of Object.values(x.discard_operations||{})){let D=w;D&&D.phase!=="done"&&typeof D.bead_id=="string"&&L.add(D.bead_id)}return L}function re(x){return x.filter(L=>Te(L)===null)}function Te(x){let L=z();for(let w of Array.isArray(L.serial_lanes)?L.serial_lanes:[])if(Array.isArray(w?.entries)&&w.entries.some(D=>D.bead_id===x))return w.id;return(Array.isArray(L.queue)?L.queue:[]).some(w=>w.bead_id===x)?"parallel":null}function ye(x,L){let w=c.get(x);return w||[...L.order]}function G(x){if(x.length<2)return!1;let L=Te(x[0]);if(!L||L==="parallel")return!1;let w=z(),D=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).find(me=>me.id===L)?.entries.map(me=>me.bead_id);if(!Array.isArray(D))return!1;let V=x.map(me=>D.indexOf(me));return V.every(me=>me>=0)&&V.every((me,ae)=>ae===0||me>V[ae-1])}function ee(){let x=z(),L=Array.isArray(x.serial_lanes)?x.serial_lanes:[],w=L.find(D=>Array.isArray(D.entries)&&D.entries.length===0);return w?w.id:L[0]?.id||"s1"}function ve(x){let L=z().bead_titles||{};return typeof L[x]=="string"?L[x]:x}async function Ae(x,L){if(!s||p)return null;p=!0,Ge();try{return await s(x,L)}finally{p=!1,Ge()}}async function ge(x){r?.setPending?.(!0);try{let L=await Ae("worker-parallel-analysis-start",{force:x,target_ids:Array.from(T)});L&&L.applied===!1&&L.reason&&(L.reason==="target_not_qualified"&&Array.isArray(L.detail)?le(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${L.detail.join(", ")}`,"error",3200):le(`\uBD84\uC11D \uC2E4\uD328: ${L.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function se(){let x=q().job;!s||!x||await s("worker-parallel-analysis-cancel",{job_id:x.job_id})}async function Se(x){if(!(!s||ce.has(x))){ce.add(x),Ge();try{let L=await s("worker-parallel-analysis-prompt",{root_dir:N(),run_id:x});if(!Ee)return;if(L?.ok===!0&&typeof L.prompt=="string"){Z={run_id:x,prompt:L.prompt};return}le(L?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{ce.delete(x),Ge()}}}function we(){Z=null,Ge()}async function Y(){if(!Z)return;let x=await fn(Z.prompt);le(x?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",x?"success":"error",1400)}function Q(x,L){a&&a(x,Xi(L))}function $e(){return z().runner_catalog}function be(x){return Object.keys($e()?.runners?.[x]?.models||{})}function je(x){let L=be(x),w=$e()?.runners?.[x]?.default_model;return typeof w=="string"&&L.includes(w)?w:L[0]||""}function oe(){let x=q().settings,L=b||x.runner||"claude",w=be(L),D=b?je(L):x.model||w[0]||"",V=Zi($e(),L,D),me=x.effort||"",ae=V.includes(me)?me:V[0]||"";return{runner:L,model:D,effort:ae,models:w,efforts:V}}async function Ve(x){let L=q().settings,w=await Ae("worker-parallel-analysis-settings-update",{expected_revision:L.revision,runner:x.runner,model:x.model,effort:x.effort});(!w||w.applied!==!0)&&(b=null,Ge(),w&&w.reason&&le(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${w.reason}`,"error",2800))}function pt(x){b=x,Ge();let L=oe();Ve({runner:x,model:L.model,effort:L.effort})}function rt(x){let L=oe(),w=Zi($e(),L.runner,x);Ve({runner:L.runner,model:x,effort:w.includes(L.effort)?L.effort:w[0]||""})}function O(x){let L=oe();Ve({runner:L.runner,model:L.model,effort:x})}async function de(x,L){if(!s||p)return;let w=ye(x,L),D=q();if(w.length<2||!D.last_good){le("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let V=u.get(x)||ee(),me=()=>({snapshot_digest:D.last_good.identity_digest,group_index:x,lane:V,ordered_bead_ids:w,expected_revision:z().revision});p=!0,Ge();try{let ae=await s("worker-parallel-analysis-submit",me());ae&&ae.queue&&n&&n.set(ae.queue),ae&&ae.applied!==!0&&ae.conflict===!0&&(ae=await s("worker-parallel-analysis-submit",me()),ae&&ae.queue&&n&&n.set(ae.queue)),ae&&ae.applied===!0?(c.delete(x),le(`\uC9C1\uB82C \uB808\uC778 ${V}\uC5D0 ${w.length}\uAC1C \uBC30\uCE58`,"success")):le(`\uC81C\uCD9C \uAC70\uBD80: ${ae?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,Ge()}}function he(x,L,w){c.set(x,ye(x,L).filter(D=>D!==w)),Ge()}function Ie(x){c.delete(x),Ge()}function Ne(x,L,w,D){let V=[...ye(x,L)],me=V.indexOf(w),ae=me+D;me<0||ae<0||ae>=V.length||(V.splice(ae,0,...V.splice(me,1)),c.set(x,V),Ge())}function ze(){let x=q().settings,L=Object.keys($e()?.runners||{}),w=oe();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${D=>pt(D.target.value)}
        >
          ${L.map(D=>l`<option
                value=${D}
                ?selected=${w.runner===D}
              >
                ${D}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${D=>rt(D.target.value)}
        >
          ${w.models.map(D=>l`<option
                value=${D}
                ?selected=${w.model===D}
              >
                ${D}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${D=>O(D.target.value)}
        >
          ${w.efforts.map(D=>l`<option
                value=${D}
                ?selected=${w.effort===D}
              >
                ${D}
              </option>`)}
        </select>
      </label>
      ${He(x)}
    </div>`}function He(x){return!bt(x)||at(x)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:x.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${x.runner}/${x.model} · effort
        ${x.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:x.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function at(x){return x.is_default===!0&&x.compatible===!1}function bt(x){return!!(x.runner&&x.model&&x.effort)}function ne(x){return bt(x)&&x.compatible!==!1}function te(x){let L=Math.max(0,Math.floor(x/1e3)),w=Math.floor(L/60),D=L%60;return`${w}:${String(D).padStart(2,"0")}`}function Pe(x){let L=x.job;if(L){let w=typeof L.started_at=="number"?L.started_at:0,D=`${L.runner||"?"}/${L.model||"?"}`,V=w?` \xB7 \uACBD\uACFC ${te(Date.now()-w)}`:"",me=typeof L.session_id=="string"?L.session_id:"",ae=C(x).find(ke=>ke.run_id===L.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${D} · effort ${L.effort||"?"}${V}</span
        >
        ${me?l`<code class="pa-session-id" title=${me}
              >${me.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>Q(L.job_id,ae||L)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${ae?.prompt_saved!==!0||ce.has(L.job_id)}
          @click=${()=>{Se(L.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Le()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Qe(x){let L=Pe(x);return L===""?"":l`<div class="pa__strip">${L}</div>`}function Le(){return r?.isPending?.()===!0}function xe(x){let L=!!x.job,w=ne(x.settings),D=k!==null&&T.size===0,V=L||p||Le()||j;return l`<div class="pa-meta">
      ${x.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(x.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!w||V||D}
        @click=${()=>{ge(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!w||V||D}
        @click=${()=>{ge(!0)}}
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
    </div>`}function We(x){return typeof x=="string"&&x.length>0?x:"\uBBF8\uBC30\uCE58"}function Ye(x,L){L?T.add(x):T.delete(x),Ge()}function et(x){let L=Array.isArray(x.scope)?x.scope:[],w=Array.isArray(x.overlaps)?x.overlaps:[];return L.length===0&&w.length===0?l``:l`<span class="pa-target__signals">
      ${L.length>0?l`<details class="pa-target__scope" title=${L.join(`
`)}>
            <summary>scope ${L.length}</summary>
            <ul>
              ${L.map(D=>l`<li><code>${D}</code></li>`)}
            </ul>
          </details>`:""}
      ${w.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${w.join(", ")}`}
            >겹침 ${w.join(", ")}</span
          >`:""}
    </span>`}function Xe(){let x=k?.qualified||[],L=k?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${j?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${x.length} \xB7 \uC81C\uC678 ${L.length}`}</span
        >
      </header>
      ${k&&x.length>0?l`<ul class="pa-targets__list">
            ${x.map(w=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${w.id}
                      .checked=${T.has(w.id)}
                      @change=${D=>Ye(w.id,D.target.checked)}
                    />
                    <span class="pa-target__title">${w.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${et(w)}
                    <span class="pa-target__route">${w.route}</span>
                    <span class="pa-target__lane"
                      >${We(w.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:k&&x.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${k&&L.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${L.length}</summary>
            <ul class="pa-targets__list">
              ${L.map(w=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${w.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Sh[w.reason]||w.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${We(w.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function ft(x){let L=typeof x.session_id=="string"&&x.session_id.length>0,w=L?x.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${x.outcome}"
        >${Eh[x.outcome]||x.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(x.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${x.runner||"?"} / ${x.model||"?"} / ${x.effort||"?"}</span
      >
      ${L?l`<code class="pa-session-id" title=${w}
            >${w.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${x.outcome==="failure"&&x.reason?l`<span class="pa-run-row__reason">${x.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>Q(x.run_id,x)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${x.prompt_saved!==!0||ce.has(x.run_id)}
          @click=${()=>{Se(x.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function Ct(x){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${x.length>0?l`<ul class="pa-runs__list">
            ${x.map(L=>ft(L))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function yt(){return Z?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${we}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${Z.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Y()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${we}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Z.prompt}</pre
        >
      </section>
    </div>`:""}function _t(x,L){let w=ye(x,L),D=F(),V=w.filter(Ce=>D.has(Ce)),me=re(w),ae=G(w),ke=Array.isArray(z().serial_lanes)?z().serial_lanes:[],st=u.get(x)||ee(),Ze=L.eligible!==!0||w.length<2||V.length>0||me.length>0||ae||p;return l`<section class="pa-group" data-group-index=${String(x)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${L.confidence}</span>
        ${L.categories.map(Ce=>l`<span class="pa-group__category">${Ce}</span>`)}
        ${ae?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${L.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${me.length>0?l`<span class="pa-group__stale"
              >stale — ${me.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${L.reason}</p>
      <ol class="pa-group__members">
        ${w.map((Ce,ut)=>l`<li class="pa-member" data-bead-id=${Ce}>
              <span class="pa-member__seq">${ut+1}</span>
              <span class="pa-member__title">${ve(Ce)}</span>
              ${D.has(Ce)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ce}
                ?disabled=${ut===0}
                aria-label=${`${Ce} \uC704\uB85C`}
                @click=${()=>Ne(x,L,Ce,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ce}
                ?disabled=${ut===w.length-1}
                aria-label=${`${Ce} \uC544\uB798\uB85C`}
                @click=${()=>Ne(x,L,Ce,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ce}
                aria-label=${`${Ce} \uC81C\uC678`}
                @click=${()=>he(x,L,Ce)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${L.evidence.map(Ce=>l`<li class="pa-evidence">
              <code>${Ce.path}</code>
              <span class="pa-evidence__locator">${Ce.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Ie(x)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ce=>{u.set(x,Ce.target.value),Ge()}}
          >
            ${ke.map((Ce,ut)=>l`<option
                  value=${Ce.id}
                  ?selected=${st===Ce.id}
                >
                  직렬 ${ut+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Ze}
          @click=${()=>{de(x,L)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Ot(x){let L=Array.isArray(x.issues)?x.issues:[],w=L.filter(V=>V.verdict==="parallel_ok").length,D=L.filter(V=>V.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${w}</span>
      <span>uncertain ${D}</span>
    </div>`}function ct(){let x=Ee&&!!q().job;if(x&&h===null){h=setInterval(()=>Ge(),1e3);return}!x&&h!==null&&(clearInterval(h),h=null)}function Ge(){let x=q();b&&x.settings.runner===b&&(b=null);let L=x.last_good?.result;ct(),Ke(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${_e}
            >
              ×
            </button>
          </header>
          ${Qe(x)}
          <div class="pa__body">
            ${ze()} ${xe(x)} ${Xe()}
            ${L?l`${L.groups.map((w,D)=>_t(D,w))}
                ${L.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Ot(L)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${Ct(C(x))}
          </div>
        </div>
        ${yt()}
      `,i)}let Ee=!1,M=()=>{Ee=!1,Z=null,W+=1,ct()},X=x=>{x.target===x.currentTarget&&_e()};i.addEventListener("close",M),i.addEventListener("cancel",M),i.addEventListener("click",X);let ue=null;n&&n.subscribe&&(ue=n.subscribe(()=>{Ee&&Ge()}));let S=null;r&&r.subscribe&&(S=r.subscribe(()=>{Ee&&Ge()}));function K(){Ee||(Ee=!0,Ge(),H(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function _e(){Ee&&(Ee=!1,Z=null,W+=1,ct(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:K,close:_e,destroy(){Ee=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",M),i.removeEventListener("cancel",M),i.removeEventListener("click",X),ue&&(ue(),ue=null),S&&(S(),S=null),i.remove()}}}function Cp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let c=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(c.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:c})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let c=aa(s[a].scope,s[i].scope);if(c.length===0)continue;let u=s[a].member,p=s[i].member;n.get(u.id)?.overlaps.push({id:p.id,title:p.title,location_label:p.location_label,prefixes:c}),n.get(p.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:c})}return n}function Qi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",c=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&c&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&c&&a===null){let u=Ch(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!c?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function Ch(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Rp=new Set(["sh","bash","zsh","dash","ksh"]),Op=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Lp(e){let t=e.split("/");return t[t.length-1]||""}function Rh(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Lp(n[0]);if(r!=="env")return Rp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Rp.has(Lp(s))}function Oh(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Lh(e){let t=[],n=0;Op.lastIndex=0;for(let r of e.matchAll(Op)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Oh(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Ih(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Ip(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",c=0,u=null,p=!1;function b(N,H){return H?Lh(N).map(C=>C.kind==="plain"?C.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${C.kind}"
            >${C.text}</span
          >`):N}function h(){if(!s)return l``;let N=o==="ready"&&Rh(a),H=o==="ready"?a.split(`
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
              @click=${()=>{T()}}
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
                  ${H.map((C,F)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${F+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${b(C,N)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function k(){Ke(h(),r)}async function T(){if(o!=="ready")return;let N=await fn(a);le(N?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",N?"success":"error")}function j(N){N.key==="Escape"&&s&&(N.preventDefault(),z())}function W(){p||(document.addEventListener("keydown",j),p=!0)}function Z(){p&&(document.removeEventListener("keydown",j),p=!1)}async function ce(N,H=null){let C=++c;W(),s={...N},u=H||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",k(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let re=t?t():"";if(!re){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",k();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",k();return}let Te="/api/repo-ops-script?workspace="+encodeURIComponent(re)+"&lane="+encodeURIComponent(N.lane)+"&base_sha="+encodeURIComponent(N.base_sha);try{let ye=await n(Te),G=await ye.json().catch(()=>({}));if(C!==c)return;if((t?t():"")!==re){z();return}if(!ye.ok||!G||G.ok!==!0){o="error",i=Ih(G&&typeof G.error=="string"?G.error:""),k();return}s={lane:G.lane,base_sha:G.base_sha,path:G.path,base_ref:G.base_ref},a=String(G.content),o="ready",k()}catch{if(C!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",k()}}function z(){c+=1,Z(),s=null,a="",k();let N=u;u=null,N?.isConnected&&N.focus()}function q(){z(),r.remove()}return{open:ce,close:z,destroy:q}}function Pp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let C=o();return typeof C.revision=="number"?C.revision:0}function i(C){t&&C&&C.queue&&typeof C.queue=="object"&&t.set(C.queue)}function c(){let C=o().workspace_info;return C&&typeof C=="object"?C:{}}function u(C,F){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${C}"
      >${F}</span
    >`}function p(C){if(typeof C!="number"||!Number.isFinite(C))return"";let F=C/6e4;return Number.isInteger(F)?`timeout ${F}\uBD84`:`timeout ${Math.round(C/1e3)}\uCD08`}function b(C){let F=p(C);return F?u("config",F):""}function h(C,F,re){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${re.script}
      @click=${Te=>{s&&s({lane:C,base_sha:F.base_sha,path:re.script,base_ref:F.base_ref},Te.currentTarget)}}
    ></button>`}function k(){let C=o().repo_ops_opt_out;return{verify:C?.verify===!0,deploy:C?.deploy===!0}}function T(C,F){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!F}
        @change=${re=>{ce(C,!re.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function j(C){let F=typeof C.base_sha=="string"?C.base_sha:"",re=`${C.source_path||"repo-ops/config.toml"} @ ${C.base_ref||"?"}${F?`@${F.slice(0,7)}`:""}`,Te=k(),ye=!!C.verify&&Te.verify,G=!!C.deploy&&Te.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${re}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ye?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${C.verify?l`${h("verify",C,C.verify)}
              ${b(C.verify.timeout_ms)}
              ${ye?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ye?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":C.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${C.verify?T("verify",Te.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${G?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${C.deploy?l`${h("deploy",C,C.deploy)}
              ${b(C.deploy.timeout_ms)}
              ${G?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${G?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":C.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${C.deploy?T("deploy",Te.deploy):""}
      </div>
    </section>`}function W(C){let F=C.repo_ops&&typeof C.repo_ops=="object"?C.repo_ops:null;return F&&(F.status==="resolved"||F.status==="absent")?j(F):F&&(F.status==="pending"||F.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function Z(C){if(!n)return;let F=await n("worker-auto-repair-toggle",{on:C,expected_revision:a()});if(i(F),F&&F.conflict){let re=await n("worker-auto-repair-toggle",{on:C,expected_revision:a()});i(re)}r()}async function ce(C,F){if(!n)return;let re=await n("worker-repo-ops-opt-out-toggle",{kind:C,opted_out:F,expected_revision:a()});if(i(re),re&&re.conflict){let Te=await n("worker-repo-ops-opt-out-toggle",{kind:C,opted_out:F,expected_revision:a()});i(Te)}r()}let z={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function q(C,F,re){return l`<div class="worker-repo-ops__policy-group" data-policy=${re}>
      <div class="worker-repo-ops__policy-label">${C}</div>
      <ul class="worker-repo-ops__policy-list">
        ${F.map(Te=>l`<li data-token=${Te}>
              ${z[Te]||Te}
            </li>`)}
      </ul>
    </div>`}function N(C){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${C.map(F=>{let re=[z[F.trigger]||F.trigger];return Number.isInteger(F.attempts_per_operation_attempt)?re.push(`operation\uB2F9 ${F.attempts_per_operation_attempt}\uD68C`):Number.isInteger(F.attempts)?re.push(`${z[F.budget]||F.budget} ${F.attempts}\uD68C`):Number.isInteger(F.sessions_per_user_action)&&re.push(`${F.sessions_per_user_action}\uD68C`,z[F.user_actions]||F.user_actions),F.applies_when&&re.push(z[F.applies_when]||F.applies_when),l`<li data-token=${F.id}>
            <strong>${z[F.id]||F.id}</strong>
            <span>${re.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function H(){let C=o(),F=C.auto_repair!==!1,re=C.repo_operation_policy&&typeof C.repo_operation_policy=="object"?C.repo_operation_policy:null,Te=Array.isArray(C.repo_operations)?C.repo_operations:[],ye=Te.find(Ae=>Ae.state==="repairing"),G=Te.filter(Ae=>Ae.state==="failed"||Ae.state==="repairing"),ee=G.length?Math.min(...G.map(Ae=>typeof Ae.repair?.remaining=="number"?Ae.repair.remaining:0)):re?.auto_repair?.resolution_ladder?.find(Ae=>Ae.id==="auto_repair_session")?.attempts??1,ve=Array.isArray(re?.auto_repair?.resolution_ladder)?re.auto_repair.resolution_ladder:[];return l`<section
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
          @change=${Ae=>{Z(Ae.target.checked)}}
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
          >남은 자동 해결 ${ee}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${ye?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${ye.repair?.owner_bead||ye.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
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
                ${ve.length} · 금지
                ${(re.never_automatic||[]).length}</span
              >
            </summary>
            ${q("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",re.worker_automatic||[],"worker-automatic")}
            ${re.supported===!1||re.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${re.schema_version})`}
                </div>`:N(ve)}
            ${q("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",re.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${W(c())} ${H()}
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
      title=${e.at?Wt(e.at):""}
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
          >${t.target_base}@${Uo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${xs(t.elapsed_ms)}`:""}</span
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
  </li>`}function Uh(e){let t=e.cleanup,n=vr(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Wt(e.at):""}
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
  </section>`}function Bp(e,t={}){let n=null;function r(){if(n===null){Ke(l``,e);return}let a=qh(n.operations,n.cleanup_failures,{expanded:n.expanded});Ke(Wh({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var zh=St("views:worker"),Hh="tab:worker:ready",Gh="tab:worker:blocked",Vh="tab:worker:in-progress",Kh="tab:worker:resolved",Yh="tab:worker:closed",da=1,Up=5;function Wp(e){return Eo(e).path.length>0}var Zh=new Set(["quick_fix","spec_backed","full_plan"]);function zp(e){return typeof e=="string"&&Zh.has(e)}var Kp="beads-ui.worker.candidate-filter",Ji={show_blocked:!1,spec:"all"};function Xh(){try{let e=window.localStorage.getItem(Kp);if(!e)return{...Ji};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Ji};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Ji}}}function Qh(e){try{window.localStorage.setItem(Kp,JSON.stringify(e))}catch{}}function Jh(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=n(i),u=r(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var ey=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Yp="bdui.worker.candidate_sort",ty=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],pa="spec";function ny(){try{let e=window.localStorage.getItem(Yp);return e==="board"||e==="created"||e==="spec"?e:pa}catch{return pa}}function ry(e){try{window.localStorage.setItem(Yp,e)}catch{}}var Zp="bdui.worker.done-range";function sy(){try{let e=window.localStorage.getItem(Zp);return bn(e)?e:dn}catch{return dn}}function oy(e){try{window.localStorage.setItem(Zp,e)}catch{}}var ay="(max-width: 640px)",Xp="beads-ui.worker.lane-collapsed",Is={queue:!0,done:!0};function iy(){try{let e=window.localStorage.getItem(Xp);if(!e)return{...Is};let t=JSON.parse(e);return!t||typeof t!="object"?{...Is}:{queue:typeof t.queue=="boolean"?t.queue:Is.queue,done:typeof t.done=="boolean"?t.done:Is.done}}catch{return{...Is}}}function ly(e){try{window.localStorage.setItem(Xp,JSON.stringify(e))}catch{}}function Hp(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function cy(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(_r):(r.sort(Xs(n)),t==="board"?r:[...r.filter(Wp),...r.filter(s=>!Wp(s))])}function uy(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function dy(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function Gp(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function py(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function fy(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function _y(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function my(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function gy(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function el(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var by=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),hy=new Set(["waiting_metadata","reviewing","retrying"]);function yy(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?Wt(r.next_at):"",c=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",c?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${c}`:""].filter(Boolean),live:!0}}default:return null}}function vy(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function wy(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let c=vy(e.terminal_reason);c&&i.push(`\uC6D0 \uC0AC\uC720: ${c}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!by.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Vp(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ky(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Vp(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Vp(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=py(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Gp(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Gp(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function $y(e,t,n,r,s=null,o=null,a=null,i=!1,c=null,u=!0,p=null,b=null,h=null,k={},T=!1,j=!1,W={}){let Z=!!c&&c.position>0,ce=!!c?.continuation_action&&c.continuation_action.continuation===null,z=!!c&&c.active===!0,q=c&&c.failure||null,N=_y(c?c.waiting:null,h),H=n[e]||null,C=H&&H.gate?H.gate:null,F=H&&H.pr?H.pr:null,re=my(c?c.resolution:null),Te=gy(c?c.head_review:null),ye=c&&c.head_review||null,G=yy(h,ye),ee=wy(h,G),ve=c&&c.authority||null,Ae=!!ye&&["pending","reviewing","revising"].includes(ye.state),ge=!!h&&typeof h=="object"&&hy.has(h.phase),se=Z&&!z&&(ye?.state==="failed"||!ve||ge||ve.source==="automatic"&&!j),Se=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":re?re.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":N,we=!!C&&C.base_badge==="\uCDA9\uB3CC",Y=!!C&&C.enabled===!0,Q=Rs({bead_id:e,merge_sha:W.merge_sha,cleanup_cursor:W.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:W.repo_operations}),$e=ca(Q),be=o&&!Q&&(o.queueing??null)?o.queueing:null,je=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!C&&C.tier==="merged",oe=i&&!!r&&!!C&&C.tier==="merged",Ve=se&&(Y||we||C?.reason==="base_behind"||C?.reason==="review_receipt_missing"||C?.reason==="review_receipt_stale"||je||oe),pt=i&&we&&u===!1,rt=En(k,e,{external:i,merge_active:z||Q?.step==="merge",merge_queued:Z,conflict_active:!!a,cleanup_active:$e,merged:!!r||C?.tier==="merged"}),O=!!rt.operation,de=!je&&!!r&&r.step==="repo_operations",he=ky({continuation_required:ce,queueing:be,merge_step:Q,conflict_badge:Se,conflict_live:re?.live===!0||a==="running",head_review:ye&&Te?{...Te,state:ye.state,failure_reason:ye.failure_reason}:null,auto_resolution:G,recovery:ee,cleanup_failed:r,cleanup_label:r?vr(r.step):null,base_exception:b,conflicting:we,gate:C,receipt_check:H&&H.receipt_check?H.receipt_check:null,queue_failure:q,auto_skip:p,queued:Z,queue_active:z,queue_position:c?c.position:0,activity:Se?null:o&&o.activity||null}),Ie=he?.live===!0&&he.title?l`<span title=${he.title}>${he.label}</span>`:he?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:r&&Q?.active!==!0?la(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:T,external:i,pr_number:F&&typeof F.number=="number"?F.number:null,pr_url:F&&typeof F.url=="string"?F.url:"",completion_badge:he?.live!==!0&&he?.title?he.label:null,completion_title:he?.title||"",completion_repair_pr_url:ee?ee.repair_pr_url:"",completion_repair_pr_number:ee?ee.repair_pr_number:null,badges:Ie?[Ie]:[],live_badge:he?.live===!0?Ie:null,usage:s,alert:he?.alert===!0,merge_action:C?.tier==="merged"&&!je&&!oe||de?!1:!Z||ce||se,timeline_action:de,cancel_action:Z&&!ce,cancel_enabled:(!z||Ae)&&!(ee&&ee.lock_actions),cancel_title:ee&&ee.lock_actions?`${ee.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:z&&!Ae?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Ae?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:rt,discard_action:rt.action,merge_step:Q,discard_enabled:rt.enabled,discard_title:rt.title,merge_enabled:!Q&&!be&&!a&&!O&&!b&&!(ee&&ee.lock_actions)&&!pt&&!de&&(Y||we||C?.reason==="base_behind"||C?.reason==="review_receipt_missing"||C?.reason==="review_receipt_stale"||je||oe||Ve||ge&&!z),merge_label:ce?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":je||oe?"\uC815\uB9AC \uC7AC\uAC1C":we&&!Q&&!je?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":C?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":C?.reason==="review_receipt_missing"||C?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":se?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:O?rt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${rt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${rt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ce?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":be?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":Q?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Q.label}`:oe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":pt?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":je?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":we?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":C?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":C?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":C?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":C?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Y?`\uBA38\uC9C0 (${C.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:C&&C.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${C&&C.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function tl(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,openDoc:p,doneRange:b,onDoneRangeChange:h}=t,k=r?Js(r,i):null,T=ro({transport:n,uiOrderStore:i}),j=null,W=[],Z=Xh(),ce=null,z=null,q={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},N=ny(),H=bn(b)?b:sy(),C=new Map;function F(){let f=Vn.find(y=>y.value===H);return f?f.label:"\uC624\uB298"}let re=iy(),Te=!1,ye=new Set,G=new Set,ee=new Set,ve=new Set,Ae=new Set,ge={},se=null,Se=0,we=null,Y=[];function Q(f){return se===f?ge:{}}async function $e(){if(!n)return;let f=u?.()||"";if(se===f||we&&we.key===f&&we.generation===Se)return;let y=++Se;we={key:f,generation:y};let m=null;try{m=await Promise.resolve(n("get-session-defaults",{}))}catch(E){if(y!==Se)return;we=null,zh("get-session-defaults failed: %o",E),qe();return}y===Se&&(ge=m&&typeof m.values=="object"&&m.values!==null?{...m.values}:{},se=f,we=null,qe())}function be(){se=null,Se+=1,$e()}let je=document.createElement("div");je.className="worker-console";let oe=document.createElement("div");oe.className="worker-top";let Ve=document.createElement("div");Ve.className="worker-drawer-overlay",Ve.hidden=!0;let pt=document.createElement("div");pt.className="worker-drawer-overlay__backdrop";let rt=document.createElement("div");rt.className="worker-drawer-host";let O=document.createElement("div");O.className="worker-drawer-host",O.hidden=!0,Ve.append(pt,rt,O);let de=document.createElement("div");de.className="worker-lanes-host",je.append(oe,Ve,de),e.appendChild(je);let he=null,Ie=null,Ne=jr(rt,{transport:n,sessionLogStore:a,onClose:()=>{he=null,Ie=null,Ve.hidden=!0,qe()}}),ze=Bp(O,{onClose:()=>{O.hidden=!0,Ve.hidden=!0,qe()}}),He=Ip({getWorkspacePath:u||(()=>"")}),at=u&&u()||"",bt=Pp({queueStore:s,transport:n,onChanged:()=>qe(),onOpenScript:(f,y)=>{He.open(f,y)}}),ne=o?Tp(je,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(f,y)=>ln(f,y)}):null;function te(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:da,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Pe(){let f=te(),y=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,m=Array.isArray(f.serial_lanes)?f.serial_lanes:[],E=[];for(let d of m){if(E.length>=y)break;!d||typeof d.id!="string"||!/^s[1-5]$/.test(d.id)||!Array.isArray(d.entries)||E.push({id:d.id,label:`\uC9C1\uB82C ${d.id.slice(1)}`,count:d.entries.length})}return E.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},...E]}function Qe(f){if(!ce||!f.some(m=>m.id===ce))return null;let y=Pe();return y?{bead_id:ce,lanes:y}:null}function Le(){let f=te();return typeof f.revision=="number"?f.revision:0}function xe(f){f&&f.queue&&s&&s.set(f.queue)}function We(){let f=te().queue;return Array.isArray(f)?f.length:0}async function Ye(f,y,m){if(!n)return;let E=()=>({bead_id:f,...y==="parallel"?{}:{lane:y},...m===void 0?{}:{index:m},expected_revision:Le()}),A=await n("worker-queue-place",E());xe(A),A&&A.conflict&&await n("worker-queue-place",E()).then(xe)}async function et(f,y,m){if(!n)return;let E=()=>({bead_id:f,...y==="parallel"?{}:{lane:y},to_index:m,expected_revision:Le()}),A=await n("worker-queue-reorder",E());xe(A),A&&A.conflict&&await n("worker-queue-reorder",E()).then(xe)}async function Xe(f){if(!n)return;let y=await n("worker-queue-remove",{bead_id:f,expected_revision:Le()});xe(y),y&&y.conflict&&await n("worker-queue-remove",{bead_id:f,expected_revision:Le()}).then(xe)}async function ft(f){if(!n||!f)return;let y=await n("worker-attempt-pause",{attempt_id:f});y&&y.paused===!1&&y.reason&&le(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function Ct(f){if(!n||!f)return;let y=await Mr();if(y===null)return;let m=async(A={})=>await n("worker-attempt-resume",{attempt_id:f,expected_revision:Le(),...y!==""?{instructions:y}:{},...A}),E=await m();xe(E),E&&E.conflict&&(E=await m(),xe(E)),E=await Dn(E,(A,d)=>m({continuation:A,decision_token:d}),{onResult:xe,refresh:()=>m()}),E&&E.resumed===!1&&!E.conflict&&E.reason&&le(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${E.reason}`,"error",2400)}async function yt(f){if(!n||!f)return;let y=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:Le()});xe(y),y&&y.conflict&&(y=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:Le()}),xe(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&le(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function _t(f,y,m=!0){if(!n)return null;let E=n,A=await E(f,{...y,expected_revision:Le()});return xe(A),A&&A.conflict&&m&&(A=await E(f,{...y,expected_revision:Le()}),xe(A)),A}async function Ot(f){if(!n||!f)return;let y=te().merge_queue?.find(E=>E.bead_id===f)?.continuation_action;if(y?.mismatch&&y.continuation===null){await Ge(f,y.mismatch);return}ye.add(f),qe();let m;try{m=await _t("worker-merge-queue-add",{bead_id:f})}catch{le("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ye.delete(f),qe()}if(!(!m||m.applied)){if(m.conflict){le("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}le(fy(m.reason),"error",2400)}}async function ct(f){if(!(!n||!f||G.has(f))){G.add(f),qe();try{let y=await n("worker-cleanup-retry",{bead_id:f,expected_revision:Le()});xe(y),y&&!y.retried&&!y.conflict&&y.reason&&le(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{G.delete(f),qe()}}}async function Ge(f,y){let m=await Dn({continuation_mismatch:y},(A,d)=>_t("worker-merge-queue-add",{bead_id:f,continuation:A,decision_token:d},!1)),E=m?.queue?.merge_queue?.find(A=>A.bead_id===f)?.continuation_action;if(m?.applied!==!0&&E?.continuation===null&&E.mismatch){await Ge(f,E.mismatch);return}m&&m.applied===!1&&!m.conflict&&le("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ee(f){if(!n)return;let y=await _t("worker-merge-auto-toggle",{on:f});!y||y.conflict||le(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function M(f){if(!n||!f)return;let y=await _t("worker-merge-queue-remove",{bead_id:f});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&le("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function X(){await _t("worker-merge-queue-remove",{all:!0})}async function ue(f,y=null,m="unmerged",E=null){if(!n||!f)return;let A=As(f,m);if(!(!!E||typeof globalThis.confirm!="function"||globalThis.confirm(A)))return;let _=await n("worker-discard",{bead_id:f,...y?{attempt_id:y}:{},...E?{operation_id:E}:{},expected_revision:Le()});if(xe(_),_&&_.conflict&&(_=await n("worker-discard",{bead_id:f,...y?{attempt_id:y}:{},...E?{operation_id:E}:{},expected_revision:Le()}),xe(_)),_&&_.discarded===!0){le(Go(_),"success",5e3);return}if(_&&_.reason){le(`\uD3D0\uAE30 \uC2E4\uD328: ${_.reason}`,"error",2800);return}if(_&&_.accepted&&_.pending==="merged_revert"){le("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(_&&_.accepted&&!_.discarded){le(`\uD3D0\uAE30 \uC9C4\uD589: ${_.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}_&&!_.conflict&&le("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function S(f,y,m){if(!(!n||!y||!m||ve.has(y))){ve.add(y),qe();try{let E=await n(f,{bead_id:y,action_id:m,expected_revision:Le()});xe(E),E?.conflict?le("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!E?.ok&&E?.reason&&le(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(E.reason)}`,"error",2800)}finally{ve.delete(y),qe()}}}async function K(f,y){if(!n||!y||ee.has(y))return;ee.add(y),qe();let m;try{let E=async(A={})=>await n(f,{bead_id:y,expected_revision:Le(),...A});m=await E(),xe(m),m&&m.conflict&&(m=await n(f,{bead_id:y,expected_revision:Le()}),xe(m)),f==="worker-revise-fix"&&(m=await Dn(m,(A,d)=>E({continuation:A,decision_token:d}),{onResult:xe,refresh:()=>E()}))}finally{ee.delete(y),qe()}if(!(!m||m.conflict)){if(m.ok){le(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}le(`\uCC98\uBD84 \uAC70\uBD80: ${m.reason||""}`,"error",3e3)}}async function _e(f){if(!n)return;let y=await n("worker-automation-toggle",{on:f,expected_revision:Le()});xe(y),y&&y.conflict&&await n("worker-automation-toggle",{on:f,expected_revision:Le()}).then(xe)}async function x(f){if(!n||!f)return;let y=await n("worker-repo-operation-repair",{operation_id:f});if(xe(y),y&&y.ok===!1){le(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${y.reason||""}`,"error",3e3);return}y&&y.ok===!0&&le("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function L(f){if(!n||!f)return;let y=await n("worker-repo-operation-dismiss",{operation_id:f});xe(y),y&&y.ok===!1&&le(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function w(f){if(!n||!Number.isFinite(f))return;let y=Math.max(da,Math.floor(f)),m=await n("worker-queue-set-slots",{slots:y,expected_revision:Le()});xe(m),m&&m.conflict&&await n("worker-queue-set-slots",{slots:y,expected_revision:Le()}).then(xe)}async function D(f){if(!n||!Number.isInteger(f)||f<1||f>Up)return;let y=te(),m=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(f).reduce((d,_)=>d+(Array.isArray(_?.entries)?_.entries.length:0),0),E=()=>({count:f,expected_revision:Le()}),A=await n("worker-queue-set-serial-lane-count",E());xe(A),A&&A.conflict&&(A=await n("worker-queue-set-serial-lane-count",E()),xe(A)),A&&A.applied&&m>0&&le(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${m}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let V="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function me(f,y){let m=Qi(f,y.id,q);return{id:y.id,title:y.title,location_label:y.location_label,prefixes:y.prefixes,action:m.kind==="note"?{kind:"note",text:m.text}:m.kind==="disabled"?{kind:"disabled",label:V,title:m.title}:{kind:"place",label:V,title:m.title}}}function ae(f,y){if(!z||z.bead_id!==f)return null;let m=z.counterpart_id,E=y.filter(A=>A.id===m);return E.length===0?null:{rows:E.map(A=>me(f,A))}}async function ke(f,y){let m=Qi(f,y,q);if(z=null,m.kind!=="ops"){qe();return}let E=Le();for(let A of m.ops){let d=await st(A,E);if(d===null)break;E=d}qe()}async function st(f,y){if(!n)return null;try{let m=await n("worker-queue-place",{bead_id:f.bead_id,lane:f.lane,index:f.index,expected_revision:y});if(xe(m),m&&m.conflict)return le("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!m||m.applied!==!0)return le(m&&typeof m.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${m.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let E=m.queue?m.queue.revision:void 0;return typeof E!="number"?(le("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):E}catch(m){return le(m instanceof Error&&m.message?m.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function Ze(){let f=te(),y=k?k.selectBoardColumn(Hh,"ready"):[],m=k?k.selectBoardColumn(Gh,"blocked"):[],E=k?k.selectBoardColumn(Yh,"closed"):[],A=k?k.selectBoardColumn(Vh,"in_progress"):[],d=k?k.selectBoardColumn(Kh,"resolved"):[],_=to([...y,...m,...A,...d,...E]),v=new Map;for(let g of[...y,...m,...A])g&&g.id&&!v.has(g.id)&&v.set(g.id,g);let $={...Q(u?.()||"")};for(let g of["orchestration_model","orchestration_effort","orchestration_speed"]){let U=f[g];typeof U=="string"&&($[g]=U)}function B(g,U){let ie=v.get(g);if(!ie)return null;let Ue=ie.metadata&&typeof ie.metadata=="object"?ie.metadata:{},Je=ie.workflow?.route,kt=Ue.route,Et=zp(Je)?Je:zp(kt)?kt:null;return on({pin:Ue,global:$,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:Et,controller_runtime:U})}function J(g){let U=g.runner||null,ie=B(g.bead_id,U),Ue=Ss(g),Je=ie?tr(ie,U):null;return Ue||Je?{orchestration:Ue,worker:Je}:null}let pe=new Map;function Oe(g){if(pe.has(g))return pe.get(g)??null;let U=B(g,null),ie=null;if(U){let Ue=Sn(f.runner_catalog??null,U.orchestration_model.value??""),Je=Ue===null?U:B(g,Ue),kt=yr(Je,f.runner_catalog??null),Et=tr(Je,Ue);ie=kt||Et?{orchestration:kt,worker:Et}:null}return pe.set(g,ie),ie}function Fe(g){let U=no(_,g);return U.total===0?null:U}let cn=f.bead_titles||{},Dt=new Map;for(let[g,U]of Object.entries(cn))typeof U=="string"&&U.length>0&&Dt.set(g,U);for(let g of[...y,...m])Dt.set(g.id,g.title||g.id);let Wn=new Map;for(let g of[...y,...m,...A,...d,...E])g&&g.id&&typeof g.from_id=="string"&&Wn.set(g.id,g.from_id);let Zt=new Map;for(let g of[...y,...m,...A,...d,...E])g&&g.id&&typeof g.priority=="number"&&Zt.set(g.id,g.priority);let sr=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},or=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},zn=f.bead_workflow&&typeof f.bead_workflow=="object"&&!Array.isArray(f.bead_workflow)?f.bead_workflow:{},Hn=new Map;for(let[g,U]of Object.entries(or))Array.isArray(U)&&Hn.set(g,Yi(U));for(let g of[...y,...m]){let U=g.labels;Array.isArray(U)&&!Hn.has(g.id)&&Hn.set(g.id,Yi(U))}let kr=new Map,Gr=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(Gr)?Gr:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let U=g.members.map(Ue=>{let Je=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(kt=>kt.entries.some(Et=>Et.bead_id===Ue));return Je?Je.id:null});if(!(U.every(Ue=>Ue!==null)&&new Set(U).size===1))for(let Ue of g.members)kr.set(Ue,g.members.filter(Je=>Je!==Ue))}let Ps=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},$r=new Map;for(let[g,U]of Object.entries(sr))U&&typeof U=="object"&&$r.set(g,U);for(let g of[...y,...m])$r.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let ar=g=>$r.get(g)||{},Gn=f.pr_wait||[],Vr=f.pr_observations||{},Be=f.pr_activity||{},lt=f.cleanup_failed||{},un=Object.entries(lt).map(([g,U])=>({bead_id:g,step:U&&U.step?U.step:"",reason:U&&U.reason?U.reason:"",at:U&&typeof U.at=="number"?U.at:null,detail:U&&typeof U.detail=="string"?U.detail:null,output_tail:U&&typeof U.output_tail=="string"&&U.output_tail?U.output_tail:void 0,log_path:U&&typeof U.log_path=="string"&&U.log_path?U.log_path:void 0,retry_count:U&&typeof U.retry_count=="number"&&Number.isInteger(U.retry_count)&&U.retry_count>0?U.retry_count:0,failure_code:U&&typeof U.failure_code=="string"?U.failure_code:void 0,subject_id:U&&typeof U.subject_id=="string"?U.subject_id:void 0,repair_eligible:!!(U&&U.repair_eligible),repair:U&&U.repair?U.repair:void 0})),fa=f.queue||[],df=new Set([...fa.map(g=>g.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(U=>U.bead_id)),...Gn.map(g=>g.bead_id),...f.done.map(g=>g.bead_id)]),pf=new Set(m.map(g=>g.id)),ff=i?i.get()?.order||{}:{},ol=new Set,al=[];for(let g of[...y,...m])df.has(g.id)||ol.has(g.id)||uy(g)||(ol.add(g.id),al.push(g));W=cy(al,N,ff);let _f=f.admission||{},il=g=>{let U=_f[g];if(!U)return"";if(U.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof U.reason=="string"?U.reason:"",Ue=ie.indexOf(":");return Ue>0&&Ue<ie.length-1?`\u26D4 ${ie.slice(0,Ue)} (${ie.slice(Ue+1)})`:`\u26D4 ${ie}`},mf=W.map(g=>{let U=Eo(g),ie=U.path.length>0,Ue=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",Je=!Object.hasOwn(g,"description")||typeof g.description=="string"&&g.description.trim().length>0,kt=Object.hasOwn(g,"labels")&&Ep(g.labels),Et=!kt&&(Ue?Je:ie&&!U.conflict),gt=pf.has(g.id),rn=[];gt&&rn.push(dy(g)),Ue&&!Je?rn.push("missing_description"):!Ue&&U.conflict?rn.push("spec_id_conflict"):!Ue&&!ie&&rn.push("spec \uC5C6\uC74C");let Us=il(g.id);return Us&&rn.push(Us),{id:g.id,title:g.title||g.id,reason:rn.join(" \xB7 "),draggable:Et,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Ue,status:g.status,worker_ineligible:kt,blocked:gt,has_spec:ie,exec_chips:Oe(g.id),from_id:g.from_id||void 0,priority:Zt.get(g.id)}}),_a=Jh(mf,Z),ma=_a.visible,gf=f.revise_parked||{},Ds=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},ga=(g,U)=>g.map((ie,Ue)=>{let Je=U!=="done",kt=U!=="done"&&U!=="queue",Et=Je?gf[ie.bead_id]:null,gt=Je?En(Ds,ie.bead_id):null,rn=gt?.operation?gt:null,Us=Je&&Hn.get(ie.bead_id)===!0,Nl=Ps[ie.bead_id]||[],Aa=f.admission&&typeof f.admission=="object"?f.admission[ie.bead_id]:null,Sa=Je?ud(Aa,!!rn||ve.has(ie.bead_id)):null,Sf=Je&&!Sa?il(ie.bead_id):null,Ef=Je?[Sf]:[],ql=Je&&Nl.length>0&&typeof Aa?.reason=="string"&&Aa.reason.startsWith("not_ready")?[`\u23F8 ${Nl.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Ea=Je?kr.get(ie.bead_id):void 0;return Ea&&Ea.length>0&&ql.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Ea.join(", ")}\uC640`),{id:ie.bead_id,title:Dt.get(ie.bead_id)||ie.bead_id,reason:Ef.filter(Boolean).join(" \xB7 "),draggable:Je&&!rn&&!Sa,done:U==="done",lane:U,seq:kt?Ue+1:void 0,worker_serial:Us,discard:rn,stale_work:Sa,badges:[...ql,...Et?["\u23F8 REVISE \uD30C\uD0B9"]:[],...U==="done"?Wo(f.attempts||{},ie.bead_id):[]],alert:!!Et,revise_action:!!Et,revise_enabled:!!Et&&!rn&&!ee.has(ie.bead_id),revise_title:Et?Et.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Et.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:U==="done"?hn(f.attempts||{},ie.bead_id):null,work_ms:U==="done"?zo(f.attempts||{},ie.bead_id):null,done_at:U==="done"&&typeof ie.added_at=="number"?ie.added_at:void 0,exec_chips:Je?Oe(ie.bead_id):null,workflow:Je&&zn[ie.bead_id]||null,from_id:Wn.get(ie.bead_id)||void 0,priority:Zt.get(ie.bead_id),...ar(ie.bead_id)}}),xr=f.attempts?Object.values(f.attempts).filter(Hr):[],ba=new Set;for(let g of xr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&ba.add(g.resumed_from);let ll=new Map;for(let g of xr)ll.set(g.bead_id,g.attempt_id);let Kr=new Map;for(let g of xr)Kr.set(g.attempt_id,g);function ha(g){let U=new Set,ie=g;for(;ie&&!U.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;U.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&Kr.get(ie.resumed_from)||null}return!1}let Ms=typeof f.declared_base=="string"?f.declared_base:null;function bf(g){let U=null;for(let ie of xr)!ie||ie.bead_id!==g||ha(ie)||(U===null||(typeof ie.started_at=="number"?ie.started_at:0)>=(typeof U.started_at=="number"?U.started_at:0))&&(U=ie);return U&&typeof U.target_base=="string"?U.target_base:null}let ya=[],Ns=[],hf=Sp(f),cl=g=>{let U=typeof g.session_id=="string"&&g.session_id.length>0,ie=ba.has(g.attempt_id);return{eligible:U&&!ie,reason:U?ie?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},wn=null;for(let g of xr){let U=g.status==="paused"&&!ba.has(g.attempt_id);if(g.status==="running"||U)Ns.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Dt.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:U,conflict_resolution:ha(g),base_exception:el(Ms,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:En(Ds,g.bead_id,{attempt_id:g.attempt_id}),workflow:zn[g.bead_id]||null,priority:Zt.get(g.bead_id),usage:hn(f.attempts||{},g.bead_id),rollup:Fe(g.bead_id),rollup_expanded:Ae.has(g.bead_id),exec_chips:J(g),...ar(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&hf(g)){let ie=cl(g);ya.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Dt.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:En(Ds,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ie.eligible,resume_reason:ie.reason,conflict_resolution:ha(g),base_exception:el(Ms,g.target_base),workflow:zn[g.bead_id]||null,priority:Zt.get(g.bead_id),usage:hn(f.attempts||{},g.bead_id),rollup:Fe(g.bead_id),rollup_expanded:Ae.has(g.bead_id),exec_chips:J(g),...ar(g.bead_id)}),wn=g}}let ul=new Set([...ya,...Ns].map(g=>g.bead_id));for(let g of Array.isArray(f.session_active)?f.session_active:[]){let U=g&&g.bead_id;typeof U!="string"||U.length===0||ul.has(U)||(ul.add(U),Ns.push({bead_id:U,attempt_id:null,kind:"session",title:g.title||Dt.get(U)||U,status:"in_progress",started_at:Cn(g.started_at)??Cn(g.updated_at),updated_at:Cn(g.updated_at),workflow:g.workflow||null,priority:Zt.get(U),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let Ar=[...ya,...Ns].map(g=>{let U=Kr.get(g.attempt_id),ie=U?.quickfix_landing;if(U?.quickfix_lane!==!0||!ie||typeof ie!="object")return g;let Ue=typeof ie.reason=="string"&&ie.reason.length>0?ie.reason:null,Je=Rs({bead_id:U.bead_id,merge_sha:ie.head_sha,cleanup_cursor:ie.cursor,cleanup_failed:Ue?{step:ie.cursor,reason:Ue}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return Je?{...g,landing:Je}:g}),dl=null;if(wn){let g=cl(wn),U=wn.cause_detail;dl={bead_id:wn.bead_id,repo:wn.repo||"",reason:wn.cause||wn.status,cause_detail:U&&typeof U.reason=="string"?{reason:U.reason,command:typeof U.command=="string"?U.command:null}:null,resume_attempt_id:wn.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:En(Ds,wn.bead_id,{attempt_id:wn.attempt_id})}}let pl=new Set(Ar.map(g=>g.bead_id)),va=Array.isArray(f.merge_queue)?f.merge_queue:[],fl=new Map,_l=new Map,ml=new Map,gl=new Map,bl=new Map;va.forEach((g,U)=>{g&&typeof g.bead_id=="string"&&(fl.set(g.bead_id,U+1),_l.set(g.bead_id,g.resolution),ml.set(g.bead_id,g.continuation_action||null),gl.set(g.bead_id,g.head_review||null),bl.set(g.bead_id,g.authority||null))});let Sr=f.merge_queue_state||{active:null,failures:{}},yf=Sr.failures||{},hl=Sr.waiting&&typeof Sr.waiting.bead_id=="string"&&typeof Sr.waiting.reason=="string"?Sr.waiting:null,vf=f.auto_merge_skips||{},yl=g=>{let U=vf[g];if(!U)return null;let ie=Vr[g],Ue=ie&&ie.pr?ie.pr.head_sha:null;return Ue&&Ue===U.head_sha?U.reason||"":null},qs=new Map;for(let g of Ar)g.failed!==!0&&g.conflict_resolution&&(g.paused?qs.has(g.bead_id)||qs.set(g.bead_id,"paused"):qs.set(g.bead_id,"running"));let vl=Ar.filter(g=>g.kind!=="session"&&!g.paused&&g.failed!==!0).length,wl=(f.workspace_info||{}).slots,kl=typeof wl=="number"?wl:typeof f.slots=="number"?f.slots:da,wf=vl>kl,Fs=pr(H),kf=(Array.isArray(f.done)?f.done.slice():[]).filter(g=>Fs===void 0||typeof g.added_at!="number"||g.added_at>=Fs).sort((g,U)=>(U.added_at||0)-(g.added_at||0)),Yr=ga(kf,"done"),$f=new Set((Array.isArray(f.done)?f.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),$l=[],xf=u?.()||"";for(let g of E){let U=Cn(g.closed_at);if(typeof g.id!="string"||$f.has(g.id)||U===null||Fs!==void 0&&U<Fs||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ie=`${xf}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Ue=C.get(ie);Ue===void 0&&n&&(C.set(ie,"pending"),Promise.resolve(n("get-comments",{id:g.id})).then(Je=>{let kt=Array.isArray(Je)&&Je.some(Et=>To(typeof Et?.text=="string"?Et.text:"")?.lane==="session");C.set(ie,kt?"session":"not-session"),qe()}).catch(()=>{C.set(ie,"failed"),qe()})),Ue==="session"&&$l.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:U,created_at:g.created_at,updated_at:g.updated_at})}Yr.push(...$l),Yr.sort((g,U)=>(U.done_at||0)-(g.done_at||0));let js={};for(let g of Mn)js[g]=0;let xl=!1,Al=0,wa=0,Sl=0;for(let g of Yr){let U=g.usage;if(U&&typeof U=="object"){let ie=!1;for(let Ue of Mn)Number.isFinite(U[Ue])&&(js[Ue]+=U[Ue],xl=!0,ie=!0);ie&&(wa+=1,Number.isFinite(U.total_cost_usd)&&(Al+=U.total_cost_usd,Sl+=1))}}wa>0&&Sl===wa&&(js.total_cost_usd=Al);let El=Yr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Af=El.length>0?zt(fo(El)):xl?Nn(js):null,Tl=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},Cl=Array.isArray(f.serial_lanes)?f.serial_lanes:[],Rl=g=>{if(Gn.some(Ue=>Ue.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let U=xr.filter(Ue=>Ue&&Ue.bead_id===g),ie=U.length>0?U[U.length-1].status:null;return ie==="failed"||ie==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ie==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Bs=Cl.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,U)=>{let ie=Tl[g.id]||{},Ue=new Map((Array.isArray(ie.corrections)?ie.corrections:[]).filter(gt=>gt&&typeof gt.bead_id=="string"&&typeof gt.after=="string").map(gt=>[gt.bead_id,gt.after])),Je=ga(g.entries.filter(gt=>!pl.has(gt.bead_id)),g.id).map(gt=>Ue.has(gt.id)?{...gt,badges:[`\u{1F517} ${Ue.get(gt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...gt.badges]}:gt),kt=Array.isArray(ie.occupied_by)?ie.occupied_by.filter(gt=>typeof gt=="string"):[],Et=kt.map(gt=>({id:gt,title:Dt.get(gt)||gt,draggable:!1,lane:g.id,ghost:!0,badges:[Rl(gt)]}));return{id:g.id,index:U+1,rows:[...Et,...Je],occupied:kt.length>0,badge:kt.length>0?Rl(kt[0]):"\uB300\uAE30",cycle:ie.cycle===!0}}),Ol=typeof f.serial_lane_count=="number"?f.serial_lane_count:Bs.length,ka=ga(fa.filter(g=>!pl.has(g.bead_id)),"queue"),Ll=new Map,Il=new Set;for(let[g,U]of Object.entries(Tl)){if(!/^s[1-5]$/.test(g))continue;let ie=U&&Array.isArray(U.occupied_by)?U.occupied_by:[];for(let Ue of ie)typeof Ue=="string"&&Ll.set(Ue,g);ie.length>0&&Il.add(g)}let Er=[];for(let g of Ar)typeof g.bead_id=="string"&&Er.push({id:g.bead_id,title:Dt.get(g.bead_id)||g.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ll.get(g.bead_id)??null});for(let g of Bs)for(let U of g.rows)U.ghost!==!0&&Er.push({id:U.id,title:U.title,location_label:`${g.id} #${U.seq??""}`.trim(),kind:"serial",lane_id:g.id});ka.forEach((g,U)=>{Er.push({id:g.id,title:g.title,location_label:`#${U+1}`,kind:"parallel",lane_id:null})});for(let g of ma)Er.push({id:g.id,title:g.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let Pl={};for(let g of Cl)g&&typeof g.id=="string"&&Array.isArray(g.entries)&&(Pl[g.id]=g.entries.length);let $a=new Map;for(let g of Er)$a.has(g.id)||$a.set(g.id,g);q={members_by_id:$a,serial_raw_lengths:Pl,serial_lane_count:Ol,occupied_lanes:Il};let Dl=Cp(f.bead_scope,Er),xa=(g,U)=>{let ie=Dl.get(g.id);if(!ie||ie.overlaps.length===0&&!ie.scope_missing)return g;let Ue=ae(g.id,ie.overlaps);return g.dependency_chips={...g.dependency_chips||{},...ie.overlaps.length>0?{overlaps:ie.overlaps}:{},...ie.scope_missing&&U!=="running"?{scope_missing:!0}:{},...Ue?{popover:Ue}:{}},g};for(let g of ka)xa(g,"queue");for(let g of Bs)for(let U of g.rows)U.ghost!==!0&&xa(U,g.id);for(let g of ma)xa(g,"candidate");let Ml=new Map;for(let g of Ar){let U=typeof g.bead_id=="string"?g.bead_id:"";if(U.length===0)continue;let ie=g.kind==="session",Ue=Dl.get(U),Je=Ue&&Ue.overlaps.length>0?Ue.overlaps:null,kt=typeof g.attempt_id=="string"&&g.attempt_id.length>0?Kr.get(g.attempt_id):void 0,Et=kt&&kt.last_activity&&typeof kt.last_activity=="object"?kt.last_activity:null,gt=kt&&Array.isArray(kt.legs)?kt.legs:[];if(!Je&&!Et&&gt.length===0&&!ie)continue;let rn=Je?ae(U,Je):null;Ml.set(U,{...Et?{last_activity:Et}:{},...gt.length>0?{legs:gt}:{},...Je?{dependency_chips:{overlaps:Je,...rn?{popover:rn}:{}}}:{}})}return{queue:f,idToTitle:Dt,candidates:ma,candidate_hidden:{blocked:_a.hidden_blocked,spec:_a.hidden_spec},running:Ar,live_count:vl,slots:kl,over_cap:wf,failure:dl,waiting:ka,serial_lanes:Bs,serial_lane_count:Ol,running_overlays:Ml,pr_wait:Gn.map(g=>$y(g.bead_id,Dt.get(g.bead_id)||g.bead_id,Vr,lt[g.bead_id]||null,hn(f.attempts||{},g.bead_id),Be[g.bead_id]||(ye.has(g.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:G.has(g.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),qs.get(g.bead_id)||null,g.external===!0,{position:fl.get(g.bead_id)||0,active:Sr.active===g.bead_id,failure:yf[g.bead_id]||null,waiting:hl?.bead_id===g.bead_id?hl.reason:null,resolution:_l.get(g.bead_id),continuation_action:ml.get(g.bead_id),head_review:gl.get(g.bead_id)||null,authority:bl.get(g.bead_id)||null},g.wt_present!==!1,f.auto_merge===!0?yl(g.bead_id):null,el(Ms,bf(g.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[g.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Kr.get(ll.get(g.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]})).map(g=>({...g,workflow:zn[g.id]||null,priority:Zt.get(g.id),...ar(g.id)})),merge_queue_length:va.length,merge_queue_running:va.length>0,auto_excluded:Gn.map(g=>g.bead_id).filter(g=>yl(g)!==null),declared_base:Ms,done:Yr,token_total:Af,cleanup_failures:un,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function Ce(){let y=!!o?.get()?.job,m=!y&&o?.isPending?.()===!0,E=y?"\uBD84\uC11D \uC911":m?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${E?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${E?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${E?l`<span class="worker-analysis-btn__badge">${E}</span>`:""}
    </button>`}function ut(f){let y=f.waiting.length>0?f.waiting[0].id:"\u2014",m=l`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,E=Ut(f),A=f.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",d=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${F()} 완료 <b>${f.done.length}</b></span
      >`,_=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,v=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${da}
          step="1"
          .value=${String(f.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Up},(J,pe)=>pe+1).map(J=>l`<option
                value=${String(J)}
                ?selected=${f.serial_lane_count===J}
              >
                ${J}
              </option>`)}
        </select>
      </label>
      ${o?Ce():""} `,$=bd({failure:f.failure}),B=cd(f.repo_operations,f.cleanup_failures);return Te?l`<div class="worker-ribbon">
          ${m} ${E}
          <div class="worker-kpi worker-kpi--ribbon">${A}${d}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${v}</div>
          <div class="worker-kpi">${_}</div>
        </div>
        ${B}${bt.template()}${$}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${m}${E}${v}</div>
        <div class="worker-kpi">
          ${A}${d}${_}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${F()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(J=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${J.tooltip}
                >${F()} 완료 · 누적 ${J.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${B}${bt.template()}${$}`}function it(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let y=f.running.some(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0);return l`<section
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
          >${f.running.length+f.pr_wait.length}</span
        >
      </header>
      ${f.running.length>0?Ii(f.running,Date.now(),he,f.running_overlays):""}
      ${f.pr_wait.map(m=>Qn(m))}
    </section>`}function Ft(f){let y=f.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${Z.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ey.map(m=>l`<button
              type="button"
              class="worker-filter__chip${Z.spec===m.value?" is-active":""}"
              data-spec=${m.value}
              aria-pressed=${Z.spec===m.value?"true":"false"}
            >
              ${m.label}
            </button>`)}
        ${y.spec>0?l`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function jt(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${N}
    >
      ${ty.map(f=>l`<option value=${f.value} ?selected=${N===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function Gt(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${H}
      >
        ${Vn.map(f=>l`<option value=${f.value} ?selected=${H===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function Mt(f){let y=l`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,m=f.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return vn({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:y,controls:m})}function Ut(f){let y=f.queue.auto_merge===!0;if(f.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${y?" is-active":""}"
        title=${y?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${y?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if(y)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let m=new Set(f.auto_excluded),E=f.pr_wait.filter(A=>A.merge_action&&A.merge_enabled&&!m.has(A.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${E>0?` ${E}`:""}
    </button>`}function It(f){let y=vn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:jt(),controls:Ft(f),place_menu:Qe(f.candidates),onOpenDoc:p?(m,E)=>p(E):void 0});return Te?l`<div class="worker-lanes worker-lanes--mobile">
        ${it(f)}
        ${vn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:re.queue,preview:Hp(f.waiting)})}
        ${f.serial_lanes.map(m=>Mt(m))}
        ${y}
        ${vn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${F()} \uC644\uB8CC \uC5C6\uC74C`,controls:Gt(),collapsible:!0,collapsed:re.done,preview:Array.isArray(f.token_total)?f.token_total.map(m=>m.label).join(" \xB7 "):f.token_total||Hp(f.done)})}
      </div>`:l`<div class="worker-lanes">
      ${y}
      <div class="worker-wait">
        ${vn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(m=>Mt(m))}
      </div>
      ${vn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0),body:Ii(f.running,Date.now(),he,f.running_overlays)})}
      ${vn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${vn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${F()} ${f.done.length}`,items:f.done,empty:`${F()} \uC644\uB8CC \uC5C6\uC74C`,controls:Gt()})}
    </div>`}function Kt(f){re={...re,[f]:!re[f]},ly(re),qe()}function qe(){let f=Ze();Ke(ut(f),oe),Ke(It(f),de)}function Nt(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(ay);Te=!!f.matches;let y=m=>{let E=!!(m&&typeof m.matches=="boolean"?m.matches:f.matches);E!==Te&&(Te=E,qe())};typeof f.addEventListener=="function"?(f.addEventListener("change",y),Y.push(()=>f.removeEventListener("change",y))):typeof f.addListener=="function"&&(f.addListener(y),Y.push(()=>f.removeListener(y)))}let Yt=null;function nt(f){Yt=f.target instanceof Element?f.target:null}function De(f){let m=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!m)return;if(Yt&&m.contains(Yt)&&Yt.closest("input, button, a")){f.preventDefault();return}let E=m.dataset.beadId||"",A=m.dataset.lane||"";j={bead_id:E,from_lane:A};try{f.dataTransfer?.setData("text/plain",E),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function I(f){let y=f.target?.closest?.(".worker-pane");if(!y)return;let m=y.dataset.lane||"";m!=="candidate"&&m!=="queue"&&!/^s[1-5]$/.test(m)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function fe(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Re(f,y){let m=W.find(_=>_.id===f);if(!m)return;let E=W.filter(_=>_.id!==f),A=E.length;if(y){let _=y.dataset.beadId;if(_===f)return;let v=E.findIndex($=>$.id===_);v>=0&&(A=v)}let d=E.slice();d.splice(A,0,m),T.applyReorder(f,d,A)}function tt(f){let y=f.target?.closest?.(".worker-pane");if(!y)return;f.preventDefault(),y.classList.remove("worker-pane--drag-over");let m=y.dataset.lane||"",E=j?.bead_id||f.dataTransfer?.getData("text/plain")||"",A=j?.from_lane||"";if(j=null,!E)return;let d=f.target?.closest?.(".worker-mini, .worker-card"),_=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),v=_.length;if(d){let $=_.indexOf(d);$>=0&&(v=$)}if(v=Math.max(0,v-y.querySelectorAll(".worker-mini--ghost").length),y.classList.contains("worker-pane--collapsed")&&(v=We()),m==="candidate"){if(A==="candidate"){Re(E,d);return}(A==="queue"||/^s[1-5]$/.test(A))&&Xe(E);return}if(m==="queue"||/^s[1-5]$/.test(m)){let $=m==="queue"?"parallel":m;A===m?et(E,$,v):Ye(E,$)}}function At(f){Z=f,Qh(f),qe()}function mt(f){N=f==="board"||f==="created"||f==="spec"?f:pa,ry(N),qe()}function Rt(f){H=bn(f)?f:dn,oy(H),h?.(H),qe()}function Pt(f){let y=f.target?.closest?.(".worker-serial-lane-count");if(y){let v=Number.parseInt(y.value,10);Number.isFinite(v)&&D(v).then(qe);return}let m=f.target?.closest?.(".worker-filter__blocked");if(m){At({...Z,show_blocked:m.checked});return}let E=f.target?.closest?.(".worker-done-range");if(E){Rt(E.value);return}let A=f.target?.closest?.(".worker-sort");if(A){mt(A.value||pa);return}let d=f.target?.closest?.(".worker-slots__input");if(!d)return;let _=Number.parseInt(d.value,10);if(!Number.isFinite(_)){qe();return}w(_).then(qe)}function Vt(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function tn(){let f=Ze();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function wt(){he&&Ne.close(),O.hidden=!1,Ve.hidden=!1,ze.open(tn()),qe()}function nn(f){let y=te(),m=y.attempts?y.attempts[f]:null;he=f,Ie=null,ze.close(),O.hidden=!0,Ve.hidden=!1,Ne.open({attempt_id:f,meta:Vt(m)}),qe()}function ln(f,y){he=null,Ie=f,ze.close(),O.hidden=!0,Ve.hidden=!1,Ne.open({attempt_id:f,meta:y,hide_prompt:!0}),qe()}function Ln(){if(ze.isOpen()&&ze.refresh(tn()),Ie){let m=(o?.get()?.runs||[]).find(E=>E.run_id===Ie);m?Ne.updateMeta(Xi(m)):Ne.close();return}if(!he)return;let f=te(),y=f.attempts?f.attempts[he]:null;if(y){Ne.updateMeta(Vt(y));return}Ne.close()}function R(f){let y=f.target;if(y?.closest?.(".worker-mini__serial, .worker-mini__grip")||y?.closest?.("#worker-parallel-analysis-dialog"))return;let m=y?.closest?.(".mon-overlap__chip");if(m){let Be=m.closest("[data-bead-id]"),lt=Be&&Be.getAttribute("data-bead-id")||"";if(lt){let un=m.getAttribute("data-overlap-id")||"";z=!!z&&z.bead_id===lt&&z.counterpart_id===un?null:{bead_id:lt,counterpart_id:un},qe()}return}let E=y?.closest?.(".mon-overlap__place");if(E){let Be=E.closest("[data-bead-id]"),lt=Be&&Be.getAttribute("data-bead-id")||"";lt&&ke(lt,E.getAttribute("data-counterpart-id")||"");return}if(y?.closest?.(".mon-overlap__popover"))return;if(y?.closest?.(".worker-analysis-btn")){ne?.open();return}if(y?.closest?.(".worker-repo-strip")||y?.closest?.(".worker-mini__timeline")){wt();return}let A=y?.closest?.(".worker-repo-op__session");if(A){let Be=A.dataset.attemptId;Be&&nn(Be);return}let d=y?.closest?.(".worker-repo-op__resolve");if(d){x(d.dataset.operationId||"");return}let _=y?.closest?.(".worker-repo-op__dismiss");if(_){L(_.dataset.operationId||"");return}let v=y?.closest?.(".worker-cleanup__resume");if(v){let Be=v.dataset.beadId;Be&&ct(Be);return}let $=y?.closest?.(".worker-banner__resume");if($){let Be=$.dataset.attemptId;Be&&Ct(Be);return}let B=y?.closest?.(".worker-banner__discard");if(B){let Be=B.dataset.confirmation==="merged"?"merged":"unmerged";ue(B.dataset.beadId||"",B.dataset.attemptId||null,Be,B.dataset.operationId||null);return}let J=y?.closest?.(".worker-banner__dismiss");if(J){let Be=J.dataset.attemptId;Be&&yt(Be);return}if(y?.closest?.(".worker-play")){_e(!te().auto_advance);return}let pe=y?.closest?.(".worker-merge-all");if(pe){pe.classList.contains("worker-merge-all--stop")?te().auto_merge===!0?Ee(!1):X():Ee(!0);return}let Oe=y?.closest?.(".worker-pane__hd--toggle");if(Oe){let Be=Oe.dataset.lane;(Be==="queue"||Be==="done")&&Kt(Be);return}let Fe=y?.closest?.(".worker-card__place-lane");if(Fe){let Be=Fe.dataset.beadId,lt=Fe.dataset.lane;Be&&(lt==="parallel"||/^s[1-5]$/.test(lt||""))&&(ce=null,qe(),Ye(Be,lt));return}if(y?.closest?.(".worker-card__place-cancel")){ce=null,qe();return}let Dt=y?.closest?.(".worker-card__place");if(Dt){let Be=Dt.dataset.beadId;Be&&!Dt.disabled&&(Pe()?(ce=Be,qe()):Ye(Be,"parallel"));return}let Wn=y?.closest?.(".worker-filter__chip");if(Wn){let Be=Wn.dataset.spec;(Be==="all"||Be==="with"||Be==="without")&&At({...Z,spec:Be});return}let Zt=y?.closest?.(".worker-mini__merge");if(Zt){let Be=Zt.dataset.beadId||"";te().cleanup_failed?.[Be]?ct(Be):Ot(Be);return}let sr=y?.closest?.(".worker-mini__merge-cancel");if(sr){M(sr.dataset.beadId||"");return}let or=y?.closest?.(".worker-mini__discard");if(or){ue(or.dataset.beadId||"",or.dataset.attemptId||null,or.dataset.discardMode==="merged"?"merged":"unmerged",or.dataset.operationId||null);return}let zn=y?.closest?.(".worker-mini__stale-continue");if(zn){S("worker-stale-work-continue",zn.dataset.beadId||"",zn.dataset.actionId||"");return}let Hn=y?.closest?.(".worker-mini__stale-backup");if(Hn){S("worker-stale-work-backup-fresh",Hn.dataset.beadId||"",Hn.dataset.actionId||"");return}let kr=y?.closest?.(".worker-mini__stale-recheck");if(kr){S("worker-stale-work-recheck",kr.dataset.beadId||"",kr.dataset.actionId||"");return}let Gr=y?.closest?.(".worker-mini__revise-fix");if(Gr){K("worker-revise-fix",Gr.dataset.beadId||"");return}let Ps=y?.closest?.(".worker-mini__revise-approve");if(Ps){K("worker-revise-approve",Ps.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__discard")){let Be=y?.closest?.(".rtile"),lt=Be?.dataset?.beadId,un=Be?.dataset?.attemptId;lt&&ue(lt,un||null,"unmerged",y?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(y?.closest?.(".rtile__dismiss")){let lt=y?.closest?.(".rtile")?.dataset?.attemptId;lt&&yt(lt);return}if(y?.closest?.(".rtile__pause")){let lt=y?.closest?.(".rtile")?.dataset?.attemptId;lt&&ft(lt);return}if(y?.closest?.(".rtile__resume")){let lt=y?.closest?.(".rtile")?.dataset?.attemptId;lt&&Ct(lt);return}if(y?.closest?.(".rtile__session")){let lt=y?.closest?.(".rtile")?.dataset?.attemptId;lt&&nn(lt);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){ze.close(),Ne.close();return}if(y?.closest?.(".worker-drawer-host"))return;let $r=y?.closest?.(".rtile .board-card__roll-toggle");if($r){let Be=$r.dataset.rollParent;Be&&(Ae.has(Be)?Ae.delete(Be):Ae.add(Be),qe());return}let ar=y?.closest?.(".rtile .board-card__roll-child");if(ar){let Be=ar.dataset.childId;Be&&c&&c(Be);return}let Gn=y?.closest?.(".rtile");if(Gn){if(y?.closest?.(".rtile__id")){let lt=Gn.dataset.beadId;lt&&fn(lt).then(un=>{un?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Be=Gn.dataset.beadId;Be&&c&&c(Be);return}let Vr=y?.closest?.(".worker-mini, .worker-card");if(Vr){let Be=Vr.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){Be&&fn(Be).then(un=>{un?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let lt=y?.closest?.(".ctl-chip--from");if(lt){let un=lt.dataset.fromId;un&&c&&c(un);return}Be&&c&&c(Be)}}e.addEventListener("pointerdown",nt),e.addEventListener("dragstart",De),e.addEventListener("dragover",I),e.addEventListener("dragleave",fe),e.addEventListener("drop",tt),e.addEventListener("click",R),e.addEventListener("change",Pt);function P(f){if(!z)return;let y=f.target;y&&typeof y.closest=="function"&&y.closest(".mon-overlap__popover, .mon-overlap__chip")||(z=null,qe())}function Me(f){f.key!=="Escape"||!z||(z=null,qe())}return document.addEventListener("click",P),document.addEventListener("keydown",Me),Y.push(()=>{document.removeEventListener("click",P),document.removeEventListener("keydown",Me)}),Nt(),k&&Y.push(k.subscribe(()=>{for(let[f,y]of C)y==="failed"&&C.delete(f);qe()})),s&&Y.push(s.subscribe(()=>{let f=u&&u()||"";f!==at&&(at=f,He.close()),qe(),Ln()})),o&&typeof o.subscribe=="function"&&Y.push(o.subscribe(()=>{Ln(),qe()})),qe(),{load(){$e(),qe()},refreshSessionDefaults:be,destroy(){for(let f of Y.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",nt),e.removeEventListener("dragstart",De),e.removeEventListener("dragover",I),e.removeEventListener("dragleave",fe),e.removeEventListener("drop",tt),e.removeEventListener("click",R),e.removeEventListener("change",Pt);try{Ne.destroy()}catch{}Ve.hidden=!0;try{ne?.destroy()}catch{}try{He.destroy()}catch{}Ke(l``,e)}}}function nl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Qp(e,t,n,r=async()=>{},s=async()=>{}){let o=St("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function p(H){let F=H.target.value,Te=t.getState().workspace?.current?.path||"";if(F&&F!==Te){o("switching workspace to %s",F),i=!0,N();try{await n(F)}catch(ye){o("workspace switch failed: %o",ye)}finally{i=!1,N()}}}async function b(){let H=t.getState(),C=H.workspace?.current?.path||H.workspace?.available?.[0]?.path||"";if(!(!C||c)){o("git-pulling workspace %s",C),c=!0,N();try{await r(C)}catch(F){o("workspace git pull failed: %o",F)}finally{c=!1,N()}}}function h(H){let C=H.target;C&&e.contains(C)||j()}function k(H){H.key==="Escape"&&j()}function T(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",k),N())}function j(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",k),N())}function W(){u?j():T()}async function Z(H){let C=H.target,F=C.value,re=C.checked;o("toggling visibility %s \u2192 %s",F,String(re));try{await s(F,re)}catch(Te){o("workspace visibility toggle failed: %o",Te)}}function ce(H){return H?l`
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
    `:l``}function z(H,C){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${W}
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
                ${H.map(F=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${F.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${F.path}"
                        .checked=${!C.has(F.path)}
                        @change=${Z}
                      />
                      <span class="workspace-picker__manage-name"
                        >${nl(F.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let H=t.getState(),C=H.workspace?.current,F=H.workspace?.available||[],re=new Set(H.workspace?.hidden||[]),Te=C?.path||F[0]?.path||"";if(F.length===0)return l``;let ye=F.filter(G=>!re.has(G.path)||G.path===Te);if(ye.length<=1){let G=ye[0]||F[0],ee=nl(G.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${G.path}"
            >${ee}</span
          >
          ${z(F,re)}
          ${ce(Te)}
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
          ${ye.map(G=>l`
              <option
                value="${G.path}"
                ?selected=${G.path===Te}
                title="${G.path}"
              >
                ${nl(G.path)}
              </option>
            `)}
        </select>
        ${z(F,re)}
        ${ce(Te)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function N(){Ke(q(),e)}return N(),a=t.subscribe(()=>N()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",k),Ke(l``,e)}}}var Jp=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function rl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function ef(e,t,n=rl()){return{id:n,type:e,payload:t}}function tf(e={}){let t=St("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,p=[],b=new Map,h=new Set;function k(q){for(let N of Array.from(h))try{N(q)}catch{}}function T(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),k(o);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),N=(n.jitterRatio||0)*q,H=Math.max(0,Math.round(q+(Math.random()*2-1)*N));t("ws retry in %d ms (attempt %d)",H,a+1),i=setTimeout(()=>{i=null,z()},H)}function j(q){try{s?.send(JSON.stringify(q))}catch(N){t("ws send failed",N)}}function W(){for(o="open",t("ws open"),k(o),a=0;p.length;){let q=p.shift();q&&j(q)}}function Z(q){let N;try{N=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!N||typeof N.id!="string"||typeof N.type!="string"){t("ws received invalid envelope");return}if(u.has(N.id)){let C=u.get(N.id);u.delete(N.id),N.ok?C?.resolve(N.payload):C?.reject(N.error||new Error("ws error"));return}let H=b.get(N.type);if(H&&H.size>0)for(let C of Array.from(H))try{C(N.payload)}catch(F){t("ws event handler error",F)}else t("ws received unhandled message type: %s",N.type)}function ce(){o="closed",t("ws closed"),k(o);for(let[q,N]of u.entries())N.reject(new Error("ws disconnected")),u.delete(q);a+=1,T()}function z(){if(!c)return;let q=r();try{s=new WebSocket(q),t("ws connecting %s",q),o="connecting",k(o),s.addEventListener("open",W),s.addEventListener("message",Z),s.addEventListener("error",()=>{}),s.addEventListener("close",ce)}catch(N){t("ws connect failed %o",N),T()}}return z(),{send(q,N){if(!Jp.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let H=rl(),C=ef(q,N,H);return t("send %s id=%s",q,H),new Promise((F,re)=>{u.set(H,{resolve:F,reject:re,type:q}),s&&s.readyState===s.OPEN?j(C):(t("queue %s id=%s (state=%s)",q,H,o),p.push(C))})},on(q,N){b.has(q)||b.set(q,new Set);let H=b.get(q);return H?.add(N),()=>{H?.delete(N)}},onConnection(q){return h.add(q),()=>{h.delete(q)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,z()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function xy(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Ay(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var sl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],nf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],nr="tab:worker:closed",Sy="bdui.worker.done-range",rf=op,sf="worker:queue",of="worker:parallel-analysis",af="ui:order",lf="ui:display-policy",cf="exec:presets",rr="tab:board:closed",uf="beads-ui.board.closed-range";function Ey(e){let t=St("main");t("bootstrap start");let n=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ke(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(a&&Ap(a),i&&c&&u&&p){let Q=function(R,P){let Me="Request failed",f="";if(R&&typeof R=="object"){let m=R;if(typeof m.message=="string"&&m.message.length>0&&(Me=m.message),typeof m.details=="string")f=m.details;else if(m.details&&typeof m.details=="object")try{f=JSON.stringify(m.details,null,2)}catch{f=""}}else typeof R=="string"&&R.length>0&&(Me=R);let y=P&&P.length>0?`Failed to load ${P}`:"Request failed";Y.open(y,Me,f)},Qe=function(R){return`${nt.getState().workspace.current?.path||""}\0${R}`},Le=function(){Ne&&(Ne().catch(()=>{}),Ne=null),ze=null,He=null},We=function(R){at=R;let P=()=>{at!==R||nt.getState().selected_id!==R||(at=null,xe(R))};if(!te){ne.then(P);return}P()},ft=function(R,P,Me,f,y){return Me!==Xe[P]?(y().catch(()=>{}),!1):(R.set(f,y),!0)},yt=function(){let R=nt.getState();Ee(R.view==="board"),_e(R.view==="worker"),V(R.view==="monitor"),L(R.view==="board"||R.view==="worker"||Ct||!!R.selected_id)},ct=function(){let R=pr(_t);return R===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:R}}},Ge=function(){let R=pr(Ot);return R===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:R}}},Ee=function(R){if(R)for(let[P,Me]of sl){if(Ye.has(P)||et.has(P))continue;let f=P===rr?ct():{type:Me};try{oe.register(P,f)}catch(E){t("register %s store failed: %o",P,E)}et.add(P);let y=Xe.board,m=!1;je.subscribeList(P,f).then(E=>{m=!ft(Ye,"board",y,P,E)}).catch(E=>{t("subscribe %s failed: %o",P,E),Q(E,"board")}).finally(()=>{et.delete(P),m&&yt()})}else ue()},ue=function(){Xe.board+=1;for(let[R]of sl){let P=Ye.get(R);P&&(P().catch(()=>{}),Ye.delete(R));try{oe.unregister(R)}catch(Me){t("unregister %s failed: %o",R,Me)}}},_e=function(R){if(!R){x();return}for(let[P,Me]of nf){if(S.has(P)||et.has(P))continue;let f=P===nr?Ge():{type:Me};try{oe.register(P,f)}catch(E){t("register %s store failed: %o",P,E)}et.add(P);let y=Xe.worker,m=!1;je.subscribeList(P,f).then(E=>{m=!ft(S,"worker",y,P,E)}).catch(E=>{t("subscribe %s failed: %o",P,E),Q(E,"worker")}).finally(()=>{et.delete(P),m&&yt()})}},x=function(){Xe.worker+=1;for(let[R]of nf){let P=S.get(R);P&&(P().catch(()=>{}),S.delete(R));try{oe.unregister(R)}catch(Me){t("unregister %s failed: %o",R,Me)}}},L=function(R){if(!R){w();return}K||(be("subscribe-worker-queue",{id:sf}).catch(P=>{t("subscribe-worker-queue failed: %o",P)}),be("subscribe-worker-parallel-analysis",{id:of}).catch(P=>{t("subscribe-worker-parallel-analysis failed: %o",P)}),K=()=>(be("unsubscribe-worker-parallel-analysis",{id:of}),be("unsubscribe-worker-queue",{id:sf})))},w=function(){K&&(K().catch(()=>{}),K=null),pt.clear()},V=function(R){if(!R){me();return}D||(be("subscribe-monitor-pipeline",{id:rf}).catch(P=>{t("subscribe-monitor-pipeline failed: %o",P)}),D=()=>be("unsubscribe-monitor-pipeline",{id:rf}))},me=function(){D&&(D().catch(()=>{}),D=null)},ke=function(){ae||(be("subscribe-ui-order",{id:af}).catch(R=>{t("subscribe-ui-order failed: %o",R)}),ae=()=>be("unsubscribe-ui-order",{id:af}))},st=function(){ae&&(ae().catch(()=>{}),ae=null),O.clear()},Ce=function(){Ze||(be("subscribe-display-policy",{id:lf}).catch(R=>{t("subscribe-display-policy failed: %o",R)}),Ze=()=>be("unsubscribe-display-policy",{id:lf}))},ut=function(){Ze&&(Ze().catch(()=>{}),Ze=null),de.clear()},Ft=function(){it||(be("subscribe-impl-presets",{id:cf}).catch(R=>{t("subscribe-impl-presets failed: %o",R)}),it=()=>be("unsubscribe-impl-presets",{id:cf}))},Kt=function(R){if(!R)return"Unknown";let P=R.split("/").filter(Boolean);return P.length>0?P[P.length-1]:"Unknown"},Pt=function(R,P){Rt.open(R.path,{missing_state:R.missing_state,...P?{workspace:P}:{}})};var b=Q,h=Qe,k=Le,T=We,j=ft,W=yt,Z=ct,ce=Ge,z=Ee,q=ue,N=_e,H=x,C=L,F=w,re=V,Te=me,ye=ke,G=st,ee=Ce,ve=ut,Ae=Ft,ge=Kt,se=Pt;let Se=document.getElementById("header-loading"),we=wc(Se),Y=ld(e),$e=tf(),be=we.wrapSend((R,P)=>$e.send(R,P)),je=fc(be),oe=_c(),Ve=bc(),pt=gc(),rt=Ql(),O=mc(),de=Zl(),he=Xl(),Ie=Jl();$e.on("impl-presets-snapshot",R=>{let P=R;P&&typeof P.revision=="number"&&Array.isArray(P.presets)&&he.set({revision:P.revision,presets:P.presets})}),$e.on("monitor-pipeline-snapshot",R=>{let P=R;if(!(!P||!Array.isArray(P.workspaces)))try{rt.set(P.workspaces,P.workspaces_state,P.cross_lanes)}catch{}}),$e.on("ui-order-snapshot",R=>{let P=R;if(P&&typeof P.revision=="number")try{O.set({revision:P.revision,order:P.order&&typeof P.order=="object"?P.order:{}})}catch{}}),$e.on("display-policy-snapshot",R=>{let P=R;if(P&&P.policy&&typeof P.policy=="object")try{de.set(P.policy)}catch{}}),$e.on("session-log-snapshot",R=>{let P=R;if(P&&typeof P.id=="string")try{Ie.set(P.id,Array.isArray(P.lines)?P.lines:[],typeof P.last_event_at=="number"?P.last_event_at:null)}catch{}}),$e.on("session-log-append",R=>{let P=R;if(P&&typeof P.id=="string")try{Ie.append(P.id,P.event)}catch{}}),$e.on("snapshot",R=>{let P=R,Me=P&&typeof P.id=="string"?P.id:"",f=Me?oe.getStore(Me):null;if(f&&P&&P.type==="snapshot")try{f.applyPush(P)}catch{}}),$e.on("upsert",R=>{let P=R,Me=P&&typeof P.id=="string"?P.id:"",f=Me?oe.getStore(Me):null;if(f&&P&&P.type==="upsert")try{f.applyPush(P)}catch{}}),$e.on("delete",R=>{let P=R,Me=P&&typeof P.id=="string"?P.id:"",f=Me?oe.getStore(Me):null;if(f&&P&&P.type==="delete")try{f.applyPush(P)}catch{}});let Ne=null,ze=null,He=null,at=null,bt=()=>{},ne=new Promise(R=>{bt=()=>R(void 0)}),te=!1,Pe=!1;async function xe(R){let P=Qe(R);if(P===ze||P===He)return;He=P;let Me=`detail:${R}`,f={type:"issue-detail",params:{id:R}};try{oe.register(Me,f)}catch(y){t("register detail store failed: %o",y)}try{let y=await je.subscribeList(Me,f);if(nt.getState().selected_id!==R||Qe(R)!==P){await y().catch(()=>{});return}Ne&&await Ne().catch(()=>{}),Ne=y,ze=P}catch(y){t("detail subscribe failed: %o",y),Q(y,"issue details")}finally{He===P&&(He=null)}}let Ye=new Map,et=new Set,Xe={board:0,worker:0},Ct=!1,_t=dn;try{let R=window.localStorage.getItem(uf);bn(R)&&(_t=R)}catch{}let Ot=dn;try{let R=window.localStorage.getItem(Sy);bn(R)&&(Ot=R)}catch{}async function M(R){if(!bn(R)||R===_t)return;_t=R;try{window.localStorage.setItem(uf,R)}catch{}let P=Ye.get(rr);if(!P)return;Ye.delete(rr),await P().catch(()=>{});let Me=ct();try{oe.register(rr,Me)}catch(f){t("register %s store failed: %o",rr,f)}try{let f=await je.subscribeList(rr,Me);Ye.set(rr,f)}catch(f){t("re-subscribe %s failed: %o",rr,f),Q(f,"board")}}async function X(R){if(!bn(R)||R===Ot)return;Ot=R;let P=S.get(nr);if(!P)return;S.delete(nr),await P().catch(()=>{});let Me=Ge();try{oe.register(nr,Me)}catch(f){t("register %s store failed: %o",nr,f)}try{let f=await je.subscribeList(nr,Me);S.set(nr,f)}catch(f){t("re-subscribe %s failed: %o",nr,f),Q(f,"worker")}}let S=new Map,K=null,D=null,ae=null,Ze=null,it=null;async function jt(){Ze=null,de.clear(),it=null,he.clear(),K=null,D=null,Ye.clear(),S.clear(),Xe.board+=1,Xe.worker+=1,Ft();let R=nt.getState().workspace.current?.path;if(R)try{await $e.send("set-workspace",{path:R})}catch(Me){t("workspace restore after reconnect failed: %o",Me);return}Ce();let P=nt.getState();Ee(P.view==="board"),_e(P.view==="worker"),V(P.view==="monitor"),L(P.view==="board"||P.view==="worker"||!!P.selected_id)}async function Gt(){t("clearing all subscriptions for workspace switch"),ue(),x(),w(),Ve.clear(),st(),ke(),ut(),Ce(),Le();let R=nt.getState();if(R.selected_id)try{oe.unregister(`detail:${R.selected_id}`)}catch{}let P=nt.getState();Ee(P.view==="board"),_e(P.view==="worker"),V(P.view==="monitor"),L(P.view==="board"||P.view==="worker"||!!P.selected_id),P.selected_id&&We(P.selected_id)}async function Mt(R){t("requesting workspace switch to %s",R),Pe=!0;try{let P=await $e.send("set-workspace",{path:R});t("workspace switch result: %o",P),P&&P.workspace&&(nt.setState({workspace:{current:{path:P.workspace.root_dir,database:P.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",R),P.changed&&(await Gt(),le("Switched to "+Kt(R),"success",2e3)))}catch(P){throw t("workspace switch failed: %o",P),le("Failed to switch workspace","error",3e3),P}finally{Pe=!1}}async function Ut(R){t("requesting workspace git pull for %s",R);try{let P=await $e.send("git-pull-workspace",{});t("workspace git pull result: %o",P);let Me=P?.status;if(Me==="up_to_date"){le("Already up to date","success",2e3);return}if(Me==="stash_pop_conflict"){le("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}le("Git pulled "+Kt(R),"success",2e3)}catch(P){t("workspace git pull failed: %o",P);let Me=P?.code,f=P?.message;if(Me==="rebase_conflict"){le("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Me==="rebase_conflict_abort_failed"){le("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Me==="busy"){le("Git pull skipped: another operation is running","warning",3e3);return}let y=f?`: ${f}`:"";throw le(`Git pull failed${y}`,"error",3e3),P}}async function It(R,P){t("setting workspace visibility %s \u2192 %s",R,String(P));try{await $e.send("set-workspace-visibility",{path:R,visible:P}),await qe()}catch(Me){t("workspace visibility update failed: %o",Me),le("Failed to update project visibility","error",3e3)}}async function qe(){try{let R=await $e.send("list-workspaces",{});if(t("workspaces loaded: %o",R),R&&Array.isArray(R.workspaces)){let P=R.workspaces.map(m=>({path:m.path,database:m.database,pid:m.pid,version:m.version})),Me=R.current?{path:R.current.root_dir,database:R.current.db_path}:null,f=Array.isArray(R.hidden)?R.hidden.filter(m=>typeof m=="string"):[];nt.setState({workspace:{current:Me,available:P,hidden:f}});let y=window.localStorage.getItem("beads-ui.workspace");y&&(!P.some(E=>E.path===y)||f.includes(y)?window.localStorage.removeItem("beads-ui.workspace"):Me&&y!==Me.path&&(t("restoring saved workspace preference: %s",y),await Mt(y)))}}catch(R){t("failed to load workspaces: %o",R)}}$e.on("workspace-changed",R=>{t("workspace-changed event: %o",R),R&&R.root_dir&&(nt.setState({workspace:{current:{path:R.root_dir,database:R.db_path}}}),qe(),Gt())});let Nt=!1;if(typeof $e.onConnection=="function"){let R=P=>{t("ws state %s",P),P==="reconnecting"||P==="closed"?(Nt=!0,le("Connection lost. Reconnecting\u2026","error",4e3)):P==="open"&&Nt&&(Nt=!1,le("Reconnected","success",2200),Ay(nt,(Me,f)=>{t(`${Me}: %o`,f)}),jt())};$e.onConnection(R)}let Yt="board";try{let R=window.localStorage.getItem("beads-ui.view");(R==="board"||R==="worker"||R==="monitor")&&(Yt=R)}catch(R){t("view parse error: %o",R)}let nt=vc({config:xy(),view:Yt});$e.on("worker-queue-snapshot",R=>{let P=R;if(!P||!P.queue)return;let Me=nt.getState().workspace.current?.path;if(typeof Me=="string"&&Me.length>0&&P.root_dir!==Me){t("dropping worker-queue snapshot for %s",String(P.root_dir));return}try{Ve.set(P.queue)}catch{}}),$e.on("worker-parallel-analysis-snapshot",R=>{let P=R;if(!P)return;let Me=nt.getState().workspace.current?.path;if(!(typeof Me=="string"&&Me.length>0&&typeof P.root_dir=="string"&&P.root_dir!==Me))try{pt.set({settings:P.settings,job:P.job??null,runs:Array.isArray(P.runs)?P.runs:[],last_good:P.last_good??null})}catch{}});let De=hc(nt);De.start();let I=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),fe=async(R,P)=>{try{return await be(R,P)}catch(Me){if(I.has(R))throw Me;return[]}};ip({global_element:r,repo_element:s},nt,De);let Re=document.getElementById("workspace-picker");Re&&Qp(Re,nt,Mt,Ut,It);let tt=dp(e,(R,P)=>be(R,P));try{let R=document.getElementById("new-issue-btn");R&&R.addEventListener("click",()=>tt.open())}catch{}let At=mp(e,{policyStore:de,queueStore:Ve,implPresetStore:he,transport:(R,P)=>be(R,P),onOpenChange:R=>{let P=Ct;Ct=R,yt(),P&&R===!1&&tn.refreshSessionDefaults()},labelOptions:()=>{let R=new Set;for(let[P]of sl)for(let Me of oe.snapshotFor(P)||[]){let f=Me.labels;if(Array.isArray(f))for(let y of f)typeof y=="string"&&y.length>0&&R.add(y)}return Array.from(R).sort()}});try{let R=document.getElementById("display-settings-btn");R&&(R.setAttribute("aria-label","\uC124\uC815"),R.setAttribute("title","\uC124\uC815"),R.addEventListener("click",()=>At.open()))}catch{}let mt=document.createElement("div");mt.className="md-viewer-root",document.body.appendChild(mt);let Rt=Fo(mt,{getWorkspacePath:()=>nt.getState().workspace.current?.path}),Vt=Pc(i,{gotoIssue:R=>De.gotoIssue(R),issueStores:oe,transport:fe,workerQueueStore:Ve,uiOrderStore:O,displayPolicyStore:de,closedRange:_t,onClosedRangeChange:R=>{M(R)},onNewIssue:()=>tt.open(),openDoc:Pt}),tn=tl(c,{transport:fe,issueStores:oe,queueStore:Ve,analysisStore:pt,sessionLogStore:Ie,uiOrderStore:O,gotoIssue:R=>nt.setState({selected_id:R}),getWorkspacePath:()=>nt.getState().workspace.current?.path,openDoc:Pt,doneRange:Ot,onDoneRangeChange:R=>{X(R)}}),wt=ap(u,{transport:fe,pipelineStore:rt,execPresetStore:he,sessionLogStore:Ie,router:De,gotoIssue:R=>De.gotoIssue(R),getWorkspacePath:()=>nt.getState().workspace.current?.path,switchWorkspace:R=>Mt(R),openDoc:Pt}),nn=id(p,{issueStores:oe,transport:fe,queueStore:Ve,execPresetStore:he,sessionLogStore:Ie,getWorkspacePath:()=>nt.getState().workspace.current?.path,mdViewer:Rt,onNavigate:R=>{nt.getState().view==="worker"?nt.setState({selected_id:R}):De.gotoIssue(R)},onClose:()=>{let R=nt.getState();nt.setState({selected_id:null});try{De.gotoView(R.view==="worker"||R.view==="monitor"?R.view:"board")}catch{}},onOpenExecPresets:()=>{At.open("execution")}}),ln=nt.getState().selected_id;ln&&(p.hidden=!1,nn.load(ln),We(ln)),nt.subscribe(R=>{let P=R.selected_id;P?(p.hidden=!1,nn.load(P),Pe||We(P)):(nn.clear(),p.hidden=!0,Le())});let Ln=R=>{i.hidden=R.view!=="board",c.hidden=R.view!=="worker",u.hidden=R.view!=="monitor",o&&o.classList.toggle("is-quiet",R.view==="monitor"),Ee(R.view==="board"),_e(R.view==="worker"),V(R.view==="monitor"),L(R.view==="board"||R.view==="worker"||Ct||!!R.selected_id),!R.selected_id&&R.view==="board"&&Vt.load(),R.view==="worker"&&tn.load(),R.view==="monitor"?wt.load():wt.pause(),window.localStorage.setItem("beads-ui.view",R.view)};nt.subscribe(Ln),Ln(nt.getState()),ke(),Ce(),Ft(),qe().finally(()=>{te=!0,bt()}),window.addEventListener("keydown",R=>{let P=R.ctrlKey||R.metaKey,Me=String(R.key||"").toLowerCase(),f=R.target,y=f&&f.tagName?String(f.tagName).toLowerCase():"",m=y==="input"||y==="textarea"||y==="select"||f&&typeof f.isContentEditable=="boolean"&&f.isContentEditable;P&&Me==="n"&&(m||(R.preventDefault(),tt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Ey(t)});export{Ey as bootstrap,xy as readBootstrapConfig,Ay as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
