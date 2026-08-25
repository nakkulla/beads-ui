var Bf=Object.create;var La=Object.defineProperty;var Uf=Object.getOwnPropertyDescriptor;var Wf=Object.getOwnPropertyNames;var zf=Object.getPrototypeOf,Hf=Object.prototype.hasOwnProperty;var Gf=(e,t,n)=>t in e?La(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ia=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Kf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Wf(t))!Hf.call(e,s)&&s!==n&&La(e,s,{get:()=>t[s],enumerable:!(r=Uf(t,s))||r.enumerable});return e};var Vf=(e,t,n)=>(n=e!=null?Bf(zf(e)):{},Kf(t||!e||!e.__esModule?La(n,"default",{value:e,enumerable:!0}):n,e));var At=(e,t,n)=>Gf(e,typeof t!="symbol"?t+"":t,n);var cc=Ia((lv,lc)=>{var Cr=1e3,Rr=Cr*60,Or=Rr*60,pr=Or*24,Xf=pr*7,Qf=pr*365.25;lc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Jf(e);if(n==="number"&&isFinite(e))return t.long?t_(e):e_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Jf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Qf;case"weeks":case"week":case"w":return n*Xf;case"days":case"day":case"d":return n*pr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Or;case"minutes":case"minute":case"mins":case"min":case"m":return n*Rr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Cr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function e_(e){var t=Math.abs(e);return t>=pr?Math.round(e/pr)+"d":t>=Or?Math.round(e/Or)+"h":t>=Rr?Math.round(e/Rr)+"m":t>=Cr?Math.round(e/Cr)+"s":e+"ms"}function t_(e){var t=Math.abs(e);return t>=pr?eo(e,t,pr,"day"):t>=Or?eo(e,t,Or,"hour"):t>=Rr?eo(e,t,Rr,"minute"):t>=Cr?eo(e,t,Cr,"second"):e+" ms"}function eo(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var dc=Ia((cv,uc)=>{function n_(e){n.debug=n,n.default=n,n.coerce=c,n.disable=a,n.enable=s,n.enabled=i,n.humanize=cc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let b=0;for(let v=0;v<d.length;v++)b=(b<<5)-b+d.charCodeAt(v),b|=0;return n.colors[Math.abs(b)%n.colors.length]}n.selectColor=t;function n(d){let b,v=null,h,x;function M(...U){if(!M.enabled)return;let Y=M,ae=Number(new Date),G=ae-(b||ae);Y.diff=G,Y.prev=b,Y.curr=ae,b=ae,U[0]=n.coerce(U[0]),typeof U[0]!="string"&&U.unshift("%O");let j=0;U[0]=U[0].replace(/%([a-zA-Z%])/g,(W,S)=>{if(W==="%%")return"%";j++;let F=n.formatters[S];if(typeof F=="function"){let oe=U[j];W=F.call(Y,oe),U.splice(j,1),j--}return W}),n.formatArgs.call(Y,U),(Y.log||n.log).apply(Y,U)}return M.namespace=d,M.useColors=n.useColors(),M.color=n.selectColor(d),M.extend=r,M.destroy=n.destroy,Object.defineProperty(M,"enabled",{enumerable:!0,configurable:!1,get:()=>v!==null?v:(h!==n.namespaces&&(h=n.namespaces,x=n.enabled(d)),x),set:U=>{v=U}}),typeof n.init=="function"&&n.init(M),M}function r(d,b){let v=n(this.namespace+(typeof b>"u"?":":b)+d);return v.log=this.log,v}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let b=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let v of b)v[0]==="-"?n.skips.push(v.slice(1)):n.names.push(v)}function o(d,b){let v=0,h=0,x=-1,M=0;for(;v<d.length;)if(h<b.length&&(b[h]===d[v]||b[h]==="*"))b[h]==="*"?(x=h,M=v,h++):(v++,h++);else if(x!==-1)h=x+1,M++,v=M;else return!1;for(;h<b.length&&b[h]==="*";)h++;return h===b.length}function a(){let d=[...n.names,...n.skips.map(b=>"-"+b)].join(",");return n.enable(""),d}function i(d){for(let b of n.skips)if(o(d,b))return!1;for(let b of n.names)if(o(d,b))return!0;return!1}function c(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}uc.exports=n_});var pc=Ia((on,to)=>{on.formatArgs=s_;on.save=o_;on.load=a_;on.useColors=r_;on.storage=i_();on.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();on.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function r_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function s_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+to.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}on.log=console.debug||console.log||(()=>{});function o_(e){try{e?on.storage.setItem("debug",e):on.storage.removeItem("debug")}catch{}}function a_(){let e;try{e=on.storage.getItem("debug")||on.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function i_(){try{return localStorage}catch{}}to.exports=dc()(on);var{formatters:l_}=to.exports;l_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Jr=globalThis,Ks=Jr.trustedTypes,Gl=Ks?Ks.createPolicy("lit-html",{createHTML:e=>e}):void 0,Da="$lit$",Nn=`lit$${Math.random().toFixed(9).slice(2)}$`,Ma="?"+Nn,Yf=`<${Ma}>`,lr=document,es=()=>lr.createComment(""),ts=e=>e===null||typeof e!="object"&&typeof e!="function",Na=Array.isArray,Ql=e=>Na(e)||typeof e?.[Symbol.iterator]=="function",Pa=`[ 	
\f\r]`,Qr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Kl=/-->/g,Vl=/>/g,ar=RegExp(`>|${Pa}(?:([^\\s"'>=/]+)(${Pa}*=${Pa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Yl=/'/g,Zl=/"/g,Jl=/^(?:script|style|textarea|title)$/i,qa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=qa(1),rs=qa(2),tv=qa(3),bn=Symbol.for("lit-noChange"),Ft=Symbol.for("lit-nothing"),Xl=new WeakMap,ir=lr.createTreeWalker(lr,129);function ec(e,t){if(!Na(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Gl!==void 0?Gl.createHTML(t):t}var tc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Qr;for(let i=0;i<n;i++){let c=e[i],u,d,b=-1,v=0;for(;v<c.length&&(a.lastIndex=v,d=a.exec(c),d!==null);)v=a.lastIndex,a===Qr?d[1]==="!--"?a=Kl:d[1]!==void 0?a=Vl:d[2]!==void 0?(Jl.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=ar):d[3]!==void 0&&(a=ar):a===ar?d[0]===">"?(a=s??Qr,b=-1):d[1]===void 0?b=-2:(b=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?ar:d[3]==='"'?Zl:Yl):a===Zl||a===Yl?a=ar:a===Kl||a===Vl?a=Qr:(a=ar,s=void 0);let h=a===ar&&e[i+1].startsWith("/>")?" ":"";o+=a===Qr?c+Yf:b>=0?(r.push(u),c.slice(0,b)+Da+c.slice(b)+Nn+h):c+Nn+(b===-2?i:h)}return[ec(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ns=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,d]=tc(t,n);if(this.el=e.createElement(u,r),ir.currentNode=this.el.content,n===2||n===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(s=ir.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let b of s.getAttributeNames())if(b.endsWith(Da)){let v=d[a++],h=s.getAttribute(b).split(Nn),x=/([.?@])?(.*)/.exec(v);c.push({type:1,index:o,name:x[2],strings:h,ctor:x[1]==="."?Ys:x[1]==="?"?Zs:x[1]==="@"?Xs:ur}),s.removeAttribute(b)}else b.startsWith(Nn)&&(c.push({type:6,index:o}),s.removeAttribute(b));if(Jl.test(s.tagName)){let b=s.textContent.split(Nn),v=b.length-1;if(v>0){s.textContent=Ks?Ks.emptyScript:"";for(let h=0;h<v;h++)s.append(b[h],es()),ir.nextNode(),c.push({type:2,index:++o});s.append(b[v],es())}}}else if(s.nodeType===8)if(s.data===Ma)c.push({type:2,index:o});else{let b=-1;for(;(b=s.data.indexOf(Nn,b+1))!==-1;)c.push({type:7,index:o}),b+=Nn.length-1}o++}}static createElement(t,n){let r=lr.createElement("template");return r.innerHTML=t,r}};function cr(e,t,n=e,r){if(t===bn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=ts(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=cr(e,s._$AS(e,t.values),s,r)),t}var Vs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??lr).importNode(n,!0);ir.currentNode=s;let o=ir.nextNode(),a=0,i=0,c=r[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Er(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Qs(o,this,t)),this._$AV.push(u),c=r[++i]}a!==c?.index&&(o=ir.nextNode(),a++)}return ir.currentNode=lr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Er=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Ft,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=cr(this,t,n),ts(t)?t===Ft||t==null||t===""?(this._$AH!==Ft&&this._$AR(),this._$AH=Ft):t!==this._$AH&&t!==bn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ql(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ft&&ts(this._$AH)?this._$AA.nextSibling.data=t:this.T(lr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ns.createElement(ec(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Vs(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Xl.get(t.strings);return n===void 0&&Xl.set(t.strings,n=new ns(t)),n}k(t){Na(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(es()),this.O(es()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ur=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Ft,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Ft}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=cr(this,t,n,0),a=!ts(t)||t!==this._$AH&&t!==bn,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=cr(this,i[r+c],n,c),u===bn&&(u=this._$AH[c]),a||(a=!ts(u)||u!==this._$AH[c]),u===Ft?t=Ft:t!==Ft&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===Ft?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ys=class extends ur{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ft?void 0:t}},Zs=class extends ur{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ft)}},Xs=class extends ur{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=cr(this,t,n,0)??Ft)===bn)return;let r=this._$AH,s=t===Ft&&r!==Ft||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Ft&&(r===Ft||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Qs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){cr(this,t)}},nc={M:Da,P:Nn,A:Ma,C:1,L:tc,R:Vs,D:Ql,V:cr,I:Er,H:ur,N:Zs,U:Xs,B:Ys,F:Qs},Zf=Jr.litHtmlPolyfillSupport;Zf?.(ns,Er),(Jr.litHtmlVersions??(Jr.litHtmlVersions=[])).push("3.3.1");var Xe=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Er(t.insertBefore(es(),o),o,void 0,n??{})}return s._$AI(e),s};var Js="today",rc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Tr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Rn(e){return e==="today"?"today":"7d"}function Fa(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function dr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function sc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function oc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ac(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function ic(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var fc=Vf(pc(),1);function Lt(e){return(0,fc.default)(`beads-ui:${e}`)}function kn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function fr(e,t){let n=kn(e.created_at),r=kn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function gc(e,t){let n=kn(e.created_at),r=kn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function bc(e,t){let n=kn(e.updated_at),r=kn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function hc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=kn(e.created_at),o=kn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function yc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var c_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function _c(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function mc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=c_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function vc(e,t){let n=_c(e),r=_c(t);if(n!==r)return n<r?-1:1;let s=mc(e),o=mc(t);if(s!==o)return s<o?-1:1;let a=kn(e&&e.created_at),i=kn(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var ja=2**20;function Lr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-kn(e&&e.created_at)}function no(e){return(t,n)=>{let r=Lr(t,e),s=Lr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Ba(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Lr(i,n)-ja};if(!i)return{rank:Lr(a,n)+ja};let c=Lr(a,n),u=Lr(i,n),d=(c+u)/2;return c<d&&d<u?{rank:d}:{renormalize:r.map((b,v)=>({bead_id:b.id,rank:v*ja}))}}function Ua(e,t={}){let n=Lt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||fr;function u(){for(let v of Array.from(a))try{v()}catch{}}function d(){s=Array.from(r.values()).sort(c)}function b(v){if(i||!v||v.id!==e)return;let h=Number(v.revision)||0;if(n("apply %s rev=%d",v.type,h),!(h<=o&&v.type!=="snapshot")){if(v.type==="snapshot"){if(h<=o)return;r.clear();let x=Array.isArray(v.issues)?v.issues:[];for(let M of x)M&&typeof M.id=="string"&&M.id.length>0&&r.set(M.id,M);d(),o=h,u();return}if(v.type==="upsert"){let x=v.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let M=r.get(x.id);if(!M)r.set(x.id,x);else{let U=Number.isFinite(M.updated_at)?M.updated_at:0,Y=Number.isFinite(x.updated_at)?x.updated_at:0;if(U<=Y){for(let ae of Object.keys(M))ae in x||delete M[ae];for(let[ae,G]of Object.entries(x))M[ae]=G}}d()}o=h,u()}else if(v.type==="delete"){let x=String(v.issue_id||"");x&&(r.delete(x),d()),o=h,u()}}}return{id:e,subscribe(v){return a.add(v),()=>{a.delete(v)}},applyPush:b,snapshot(){return s},size(){return r.size},getById(v){return r.get(v)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function ro(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function wc(e){let t=Lt("subs"),n=new Map,r=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(c.added)?c.added:[],b=Array.isArray(c.updated)?c.updated:[],v=Array.isArray(c.removed)?c.removed:[];for(let h of Array.from(u)){let x=n.get(h);if(!x)continue;let M=x.itemsById;for(let U of d)typeof U=="string"&&U.length>0&&M.set(U,!0);for(let U of b)typeof U=="string"&&U.length>0&&M.set(U,!0);for(let U of v)typeof U=="string"&&U.length>0&&M.delete(U)}}async function o(i,c){let u=ro(c);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let b=n.get(i);if(b&&b.key!==u){let v=r.get(b.key);v&&(v.delete(i),v.size===0&&r.delete(b.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(b){let v=n.get(i)||null;if(v){let h=r.get(v.key);h&&(h.delete(i),h.size===0&&r.delete(v.key))}throw n.delete(i),b}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let b=n.get(i)||null;if(b){let v=r.get(b.key);v&&(v.delete(i),v.size===0&&r.delete(b.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:ro,selectors:{getIds(i){let c=n.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=n.get(i);return u?u.itemsById.has(c):!1},count(i){let c=n.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=n.get(i),u={};if(!c)return u;for(let d of c.itemsById.keys())u[d]=!0;return u}}}}function kc(){let e=Lt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let c of Array.from(r))try{c()}catch{}}function a(c,u,d){let b=u?ro(u):"",v=n.get(c)||"",h=t.has(c);if(e("register %s key=%s (prev=%s)",c,b,v),h&&v&&b&&v!==b){let x=t.get(c);if(x)try{x.dispose()}catch{}let M=s.get(c);if(M){try{M()}catch{}s.delete(c)}let U=Ua(c,d);t.set(c,U);let Y=U.subscribe(()=>o());s.set(c,Y)}else if(!h){let x=Ua(c,d);t.set(c,x);let M=x.subscribe(()=>o());s.set(c,M)}return n.set(c,b),()=>i(c)}function i(c){e("unregister %s",c),n.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let d=s.get(c);if(d){try{d()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return r.add(c),()=>r.delete(c)}}}function $c(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function xc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Ac(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Wa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function u_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function d_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Sc(e){let t=Lt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):u_(r),a=d_(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Wa(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Wa(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var p_=Object.freeze({workspace_config:{default_workspace:null}});function Ec(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:p_.workspace_config.default_workspace}}}function Tc(e={}){let t=Lt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ec(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Ec(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),c=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!c||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Cc(e){let t=Lt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function c(u){return async(b,v)=>{let h=s++,x=Date.now();r.set(h,{type:b,start_ts:x}),t("request start id=%d type=%s count=%d",h,b,n+1),a();let M=!1,U=()=>{M||(M=!0,r.delete(h),i())},Y=setTimeout(()=>{M||(t("request TIMEOUT id=%d type=%s elapsed=%dms",h,b,Date.now()-x),U())},3e4);try{let ae=await u(b,v),G=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",h,b,G),ae}catch(ae){let G=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",h,b,G,ae),ae}finally{clearTimeout(Y),U()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,b])=>({id:d,type:b.type,elapsed_ms:u-b.start_ts}))}}}function ce(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function so(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(yc),c;switch(i){case"created_desc":return c.sort(fr),c;case"created_asc":return c.sort(gc),c;case"updated_desc":return c.sort(bc),c;case"priority":return c.sort(hc),c;case"manual":default:{let u=n();return u?c.sort(no(u)):c.sort(fr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function On(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Kt(e){let t=On(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function an(e,t){let n=On(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Rc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=On(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function oo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function ao(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=oo(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function io(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=Rc(n);return{total:n.length,count:r,current:s,children:n}}function lo(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Ba(i,c,u.order),a);s(u,d);let b=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(b&&b.conflict){let v={revision:typeof b.revision=="number"?b.revision:0,order:b.order||{}};n.set(v);let h=r(Ba(i,c,v.order),a);s(v,h);let x=await t("ui-order-set",{expected_revision:v.revision,entries:h});x&&x.applied&&n.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else b&&b.applied&&n.set({revision:typeof b.revision=="number"?b.revision:0,order:b.order||{}})}return{applyReorder:o}}function Oc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function co(e,t){let n=Oc(e),r=Oc(t);return n.length===0||r.length===0?!1:n!==r}function uo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function za(e,t){return!t||typeof e!="string"||e.length===0||uo(t.visible_labels).includes(e)?!0:uo(t.hidden_labels).includes(e)?!1:!uo(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Lc(e,t){return uo(e).filter(n=>za(n,t))}function Yn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function f_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function __(e,t,n,r,s){return l`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function m_(e,t,n,r){return l`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${f_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function po(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(vc):a;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?__(t.parent_id,e.count,n,r,t.onToggle):l`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?l`<div class="board-card__roll-list">
            ${i.map((c,u)=>m_(c,u+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var g_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Pc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ic={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},b_={review:"\u2713",skip:"\u2298"},Zn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function h_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Dc(e){let t=e&&e.fill||"none";return t==="none"?Zn.none:e&&e.stale===!0?Zn.stale:t==="dim"?Zn.dim:e&&e.glyph==="review"?Zn.review:e&&e.glyph==="skip"?Zn.skip:Zn.done}function y_(e){if(!e||e.fill==="none"||!e.approval_state)return Dc(e);let t=[];return e.glyph==="review"?t.push(Zn.review):e.glyph==="skip"&&t.push(Zn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function v_(e,t,n,r){let s=g_[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=b_[t&&t.glyph||""]||"",c="bar";o==="dim"?c+=` b-${s} dim`:o==="full"&&(c+=` b-${s} full`),a&&(c+=" stale"),n&&(c+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",b=Pc[e]||e,v=r?Mc(t):null;if(!v)return l`
      <div class="seg">
        <div class=${c} style=${d}>${i}</div>
        <div class=${u}>${b}</div>
      </div>
    `;let h=`${b} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${v.path}`;return l`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${h}
      title=${h}
      @click=${x=>{x.preventDefault(),x.stopPropagation(),r(x,v,e)}}
    >
      <div class=${c} style=${d}>${i}</div>
      <div class=${u}>${b}</div>
    </button>
  `}function Mc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function fo(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=Ic[e.route]||Ic.spec_backed,o=e.stages,a=h_(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${Pc[u]||u} ${u==="plan"?y_(o[u]||{}):Dc(o[u]||{})}`).join(" \xB7 ")}`,c=!!r&&s.some(u=>Mc(o[u]||{})!==null);return l`
    <div
      class="stp"
      role=${c?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>v_(u,o[u]||{},u===a,r))}
    </div>
  `}function w_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Nc=2;function qc(e){let t=e.slice(0,Nc).join(", "),n=e.length-Nc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function k_(e,t){if(!t)return[];let n=[];if(t.external){let a=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(l`<span class="ctl-chip ctl-chip--blocked">${a}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let a of r)(co(e,a)?o:s).push(a);return s.length>0&&n.push(l`<span class="ctl-chip ctl-chip--blocked-dep"
        >${qc(s)}</span
      >`),o.length>0&&n.push(l`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${qc(o)}</span
      >`),n}function Ha(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function _o(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function qn(e){return`${e.kind}:${_o(e)}@${e.sha}`}function mo(e,t){if(!e)return null;let n=Ha(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=Ha(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${qn(t)}`:"";return{kind:e.kind,label:i,title:`${c}${u}`}}function Fc(e,t){let n=mo(e,t);return n?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function $_(e){if(!e)return null;let t=Ha(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${qn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function x_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Yn(n,"route")){let i=r.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Yn(n,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Yn(n,"pr")){let i=r.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Fc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${qn(i)}`}
        >${`exec ${i.kind==="delegated"?_o(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of Lc(e.labels,n))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Yn(n,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Yn(n,"blocked")&&s.push(...k_(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Yn(n,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function A_(e){let t=an(e.created_at),n=an(e.updated_at);return!t&&!n?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Kt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?l`<span class="board-card__time-sep">·</span>`:""}
    ${n?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Kt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function S_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return po(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:A_(e),empty_label:"children \uC5C6\uC74C",childChips:Ga,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Ga(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return mo(t,n)?l`<span class="board-card__roll-child-chips">
    ${Fc(t,n)}
    ${$_(n)}
  </span>`:null}function go(e,t){let n=w_(e.priority);return l`
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
      ${x_(e,t)}
      ${e.workflow&&Yn(t.policy||null,"stepper")?fo(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${S_(e,t)}
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
              ${rc.map(o=>l`<option
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
        ${e.items.map(o=>go(o,t))}
      </div>
    </section>
  `}function jc(e,t,n){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>go(r,t))}
        </div>
      </div>
    </dialog>
  `}var E_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],T_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],C_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function R_(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return l`
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
  `}function Bc(e,t,n){return l`
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
        ${E_.map(r=>l`<option
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
        ${T_.map(r=>l`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${R_(e,t,n)}
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
        ${C_.map(r=>l`<option
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
  `}var O_=200,L_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},I_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Uc="beads-ui.board.sort",Wc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function P_(){try{let e=window.localStorage.getItem(Uc);if(e&&Wc.has(e))return e}catch{}return"created_desc"}function zc(e,t){let n=Lt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,b=t.openDoc,v=t.closedRange||Js,h=s?so(s,a):null,x=lo({transport:o,uiOrderStore:a}),M=[],U=[],Y=[],ae=[],G=[],j=[],q=!1,W=0,S=P_(),F=new Map,oe=new Map,Te=new Map,ye=new Set,z={search:"",priority:"",type:"",labels:[]},X=!1,ve=null;function $e(T){return String(T.status||"open")==="open"}function he(T){let V=String(T.status||"open");return V==="open"||V==="blocked"}function ie(T){let V=z.search.trim().toLowerCase(),fe=z.priority,m=z.type,w=z.labels;return T.filter(I=>{if(V){let ee=String(I.id||"").toLowerCase(),J=String(I.title||"").toLowerCase();if(!ee.includes(V)&&!J.includes(V))return!1}if(fe!==""&&String(I.priority)!==fe||m!==""&&String(I.issue_type||"")!==m)return!1;if(w.length>0){let ee=Array.isArray(I.labels)?I.labels:[];if(!w.some(J=>ee.includes(J)))return!1}return!0})}function Se(){let T=new Set;for(let V of[M,U,Y,ae,G,j])for(let fe of V){let m=Array.isArray(fe.labels)?fe.labels:[];for(let w of m)typeof w=="string"&&w.length>0&&T.add(w)}return Array.from(T).sort()}function be(){return z.search.trim()!==""||z.priority!==""||z.type!==""||z.labels.length>0}function K(){try{if(h){let T=h.selectBoardColumn("tab:board:in-progress","in_progress",S),V=h.selectBoardColumn("tab:board:blocked","blocked",S).filter(he),fe=new Set(T.map(xe=>xe.id)),m=h.selectBoardColumn("tab:board:ready","ready",S).filter(xe=>$e(xe)&&!fe.has(xe.id)),w=h.selectBoardColumn("tab:board:resolved","resolved",S),I=h.selectBoardColumn("tab:board:deferred","deferred",S),ee=h.selectBoardColumn("tab:board:closed","closed").slice(0,O_),J=[...V,...m,...T,...w,...ee];re(J);let me=new Set;for(let xe of J)xe&&xe.id&&!oo(xe)&&me.add(xe.id);let Re=!be();M=Re?ss(V,me):V,U=Re?ss(m,me):m,Y=Re?ss(T,me):T,ae=Re?ss(w,me):w,G=I,W=I.length,j=Re?ss(ee,me):ee,F=new Map;for(let xe of M)F.set(xe.id,"open");for(let xe of U)F.set(xe.id,"open");for(let xe of Y)F.set(xe.id,"in_progress");for(let xe of ae)F.set(xe.id,"resolved");for(let xe of G)F.set(xe.id,"deferred");for(let xe of j)F.set(xe.id,"closed");oe=new Map;for(let xe of M)oe.set(xe.id,"blocked-col");for(let xe of U)oe.set(xe.id,"ready-col");for(let xe of Y)oe.set(xe.id,"in-progress-col");for(let xe of ae)oe.set(xe.id,"resolved-col");for(let xe of j)oe.set(xe.id,"closed-col")}Je()}catch{M=[],U=[],Y=[],ae=[],G=[],j=[],Te=new Map,Je()}}function re(T){Te=ao(T)}function pe(T){return io(Te,T)}function ke(T){return!ye.has(T)}function je(T,V){T.preventDefault(),T.stopPropagation(),ye.has(V)?ye.delete(V):ye.add(V),Je()}function ge(T,V){T.preventDefault(),T.stopPropagation(),r(V)}function We(T,V){T.preventDefault(),T.stopPropagation(),r(V)}function D(T,V){ve||r(V)}function ue(T,V){T.preventDefault(),T.stopPropagation(),D_(V).then(fe=>{fe&&ce("\uBCF5\uC0AC\uB428","success",1200)})}function qe(T,V){ve=V,T.dataTransfer&&(T.dataTransfer.setData("text/plain",V),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging")}function Be(T){T.target.classList.remove("board-card--dragging"),ht(),setTimeout(()=>{ve=null},0)}function Me(T){let V=String(T.target.value||"");!V||V===v||(v=V,u&&u(V),Je())}function Ke(){return i?i.get():null}function Ve(T){let V=c?c.get():null,fe=V?V.cleanup_failed:null;if(!fe||typeof fe!="object"||Array.isArray(fe))return null;let m=fe[T];return!m||typeof m!="object"||Array.isArray(m)?null:m}let Qe={onCardClick:D,onCopyId:ue,onDragStart:qe,onDragEnd:Be,onClosedRangeChange:Me,rollupFor:pe,isExpanded:ke,onRollupToggle:je,onChildClick:ge,onFromChipClick:We,onOpenDoc:b?(T,V)=>b(V):void 0,cleanupFailureFor:Ve,get policy(){return Ke()}};function it(T,V){ve||(Ie(),r(V))}function pt(T,V){T.preventDefault(),T.stopPropagation(),Ie(),r(V)}let kt={...Qe,onCardClick:it,onChildClick:pt,onFromChipClick:pt,onOpenDoc:b?(T,V)=>{Ie(),b(V)}:void 0,get policy(){return Ke()}};function ft(T){let V=T.target,fe=e.querySelector(".board-filter__labels");V&&fe&&fe.contains(V)||Oe()}function Q(T){T.key==="Escape"&&Oe()}function ne(){X||(X=!0,document.addEventListener("mousedown",ft),document.addEventListener("keydown",Q),Je())}function Oe(){X&&(X=!1,document.removeEventListener("mousedown",ft),document.removeEventListener("keydown",Q),Je())}function Ne(T){T.key==="Escape"&&Ie()}function Ce(){q||(q=!0,document.addEventListener("keydown",Ne),Je())}function Ie(){q&&(q=!1,document.removeEventListener("keydown",Ne),Je())}let Fe={onClose:Ie,onOverlayClick(T){T.target===T.currentTarget&&Ie()}},st={onSearchInput(T){z.search=String(T.target.value||""),K()},onPriorityChange(T){z.priority=String(T.target.value||""),K()},onTypeChange(T){z.type=String(T.target.value||""),K()},onSortChange(T){let V=String(T.target.value||"");if(!(!Wc.has(V)||V===S)){S=V;try{window.localStorage.setItem(Uc,V)}catch{}K()}},onDeferredToggle(){q?Ie():Ce()},onLabelMenuToggle(){X?Oe():ne()},onLabelToggle(T){let V=z.labels.indexOf(T);V===-1?z.labels.push(T):z.labels.splice(V,1),K()},onLabelClear(){z.labels.length!==0&&(z.labels=[],K())},onNewIssue(){d&&d()}};function et(){return l`
      <div class="board-view">
        ${Bc(z,st,{sort_mode:S,deferred_popup_open:q,deferred_count:W,label_options:Se(),label_menu_open:X})}
        <div class="board-root">
          ${Ir({title:"Blocked",id:"blocked-col",items:ie(M)},Qe)}
          ${Ir({title:"Ready",id:"ready-col",items:ie(U)},Qe)}
          ${Ir({title:"In progress",id:"in-progress-col",items:ie(Y)},Qe)}
          ${Ir({title:"Resolved",id:"resolved-col",items:ie(ae)},Qe)}
          ${Ir({title:"Closed",id:"closed-col",items:ie(j),is_closed:!0,closed_range:v},Qe)}
        </div>
        ${q?jc({items:ie(G),count:W},kt,Fe):""}
      </div>
    `}function Je(){Xe(et(),e),bt()}function bt(){try{let T=e.querySelector("#deferred-popup");T&&!T.open&&(typeof T.showModal=="function"?T.showModal():T.setAttribute("open",""));let V=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let fe of V)Array.from(fe.querySelectorAll(".board-card")).forEach((w,I)=>{w.tabIndex=I===0?0:-1})}catch{}}async function It(T,V){if(!o){ce("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:T,status:V}),ce("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(fe){n("update-status failed: %o",fe),ce("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function _t(T){switch(T){case"blocked-col":return M;case"ready-col":return U;case"in-progress-col":return Y;case"resolved-col":return ae;default:return[]}}function Mt(T,V,fe){if(!o||!a)return;let m=_t(T),w=m.find(Re=>Re.id===V);if(!w)return;let I=m.filter(Re=>Re.id!==V),ee=fe.closest?fe.closest(".board-card"):null,J=I.length;if(ee){let Re=ee.getAttribute("data-issue-id");if(Re===V)return;let xe=I.findIndex(ot=>ot.id===Re);xe>=0&&(J=xe)}let me=I.slice();me.splice(J,0,w),x.applyReorder(V,me,J)}function ht(){for(let T of Array.from(e.querySelectorAll(".board-column--drag-over")))T.classList.remove("board-column--drag-over")}let He=null;e.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let fe=T.target.closest(".board-column");fe&&fe!==He&&(He&&He.classList.remove("board-column--drag-over"),fe.classList.add("board-column--drag-over"),He=fe)}),e.addEventListener("dragleave",T=>{let V=T.relatedTarget;(!V||!e.contains(V))&&He&&(He.classList.remove("board-column--drag-over"),He=null)}),e.addEventListener("drop",T=>{T.preventDefault(),He&&(He.classList.remove("board-column--drag-over"),He=null);let V=T.target,fe=V.closest(".board-column");if(!fe)return;let m=T.dataTransfer?.getData("text/plain")||"";if(!m)return;let w=fe.id,I=oe.get(m);if(I&&I===w){if(I_.has(w)){if(S!=="manual"){ce("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Mt(w,m,V)}return}let ee=L_[w];if(!ee){ce("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}F.get(m)!==ee&&It(m,ee)}),e.addEventListener("keydown",T=>{let V=T.target;if(!(V instanceof HTMLElement))return;let fe=String(V.tagName||"").toLowerCase();if(fe==="input"||fe==="textarea"||fe==="select"||fe==="button"||fe==="a"||V.isContentEditable===!0)return;let m=V.closest(".board-card");if(!m)return;let w=String(T.key||"");if(w==="Enter"||w===" "){T.preventDefault();let me=m.getAttribute("data-issue-id");me&&r(me);return}if(w!=="ArrowUp"&&w!=="ArrowDown"&&w!=="ArrowLeft"&&w!=="ArrowRight")return;T.preventDefault();let I=m.closest(".board-column");if(!I)return;let ee=Array.from(I.querySelectorAll(".board-card")),J=ee.indexOf(m);if(w==="ArrowDown"&&J<ee.length-1){Pe(m,ee[J+1]);return}if(w==="ArrowUp"&&J>0){Pe(m,ee[J-1]);return}if(w==="ArrowLeft"||w==="ArrowRight"){let me=Array.from(e.querySelectorAll(".board-column")),Re=me.indexOf(I),xe=w==="ArrowRight"?1:-1,ot=Re+xe;for(;ot>=0&&ot<me.length;){let dt=me[ot].querySelector(".board-card");if(dt){Pe(m,dt);return}ot+=xe}}});function Pe(T,V){try{T.tabIndex=-1,V.tabIndex=0,V.focus()}catch{}}let P=null;h&&h.subscribe&&(P=h.subscribe(()=>{try{K()}catch{}}));let Z=null;i&&i.subscribe&&(Z=i.subscribe(()=>{try{K()}catch{}}));let _e=null;return c&&c.subscribe&&(_e=c.subscribe(()=>{Je()})),{async load(){n("load"),K()},clear(){Oe(),Ie(),P&&(P(),P=null),Z&&(Z(),Z=null),_e&&(_e(),_e=null),e.replaceChildren(),M=[],U=[],Y=[],ae=[],G=[],j=[],F=new Map,oe=new Map}}}function ss(e,t){return e.filter(n=>{let r=oo(n);return!(r&&t.has(r))})}async function D_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function fn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function _r(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function os(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function M_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${_r(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${_r(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(c=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),c(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Fn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await M_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var N_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Hc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},q_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function zt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Pt(e){return typeof e=="string"&&e.length>0?e:null}function Pr(e){return e.startsWith("gpt-")?e.slice(4):e}function Et(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Kc(e,t,n){let r=Pt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Pt(n[e]);return s===null?null:{value:s,source:"global"}}function as(e,t,n,r){return Kc(e,t,n)||{value:r,source:"base"}}function Ka(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&zt(s?.[t])){let a=Pt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&zt(s)){for(let a of Object.values(s))if(zt(a)){let i=Pt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Pt(r?.runners?.[o]?.models?.[e]?.id)||e}function F_(e,t){return Pt(t?.review?.reviewers?.[e]?.model)||e}function Dr(e,t,n=!1){if(e==="default")return Et(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Pr(e):e;return Et(e,t,r,e,"explicit")}function Vc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];zt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(zt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function j_(e,t){let n=[],r=e?.implementation?.model_catalog;zt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(zt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function B_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of j_(t,n)){let o=Vc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Va(e){return Et(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Gc(e,t,n){let r=Kc(e,t,n);return r?Dr(r.value,r.source):Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function ln(e){let t=zt(e.pin)?e.pin:{},n=zt(e.global)?e.global:{},r=zt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&zt(r.session)?r.session:null,o=r?.supported===!0&&zt(r.orchestration)?r.orchestration:null,a=zt(e.runner_catalog)?e.runner_catalog:null,i=Pt(n.quick_fix_impl_model),c=B_(i,s,a),u={};if(s){let d=as("workflow_mode",t,n,Pt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Et(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Dr(d.value,d.source);for(let G of["spec_review","plan_review","impl_review"]){let j=`${G}_model`,q=Pt(G==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),W=as(j,t,n,q);if(W.value===null)u[j]=Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(W.value!=="self"&&W.value!=="skip"&&!zt(s.review?.reviewers?.[W.value]))u[j]=Va(Et(W.value,W.source,"",null,"explicit"));else{let S=F_(W.value,s);u[j]=Et(W.value,W.source,Pr(S),S,W.source==="base"?"default":"explicit")}}for(let[G,j]of Object.entries(Hc)){let q=u[j].value;if(q==="self"||q==="skip"){u[G]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let W=Pt(s.review?.reviewers?.[q||""]?.effort),S=as(G,t,n,W);u[G]=S.value===null?Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Et(S.value,S.source,S.value,S.value,S.source==="base"?"default":"explicit")}let b=zt(s.implementation?.default)?s.implementation.default:{},v=Pt(e.route),h=v!==null&&["quick_fix","spec_backed","full_plan"].includes(v),x=zt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},M=h&&zt(x[v])?x[v]:{};for(let G of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let j=as(G,t,n,G==="impl_dispatch"?Pt(M.dispatch)||Pt(b.dispatch):Pt(b[G.replace("impl_","")]));u[G]=j.value===null?Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Et(j.value,j.source,j.value,j.value,j.source==="base"?"default":"explicit")}let U=Pt(t.impl_runtime),Y=U==="inherit"?Pt(e.controller_runtime):U,ae=v==="quick_fix"&&Pt(t.impl_dispatch)===null&&c.runtime!==null&&(U===null||Y===c.runtime);if(ae){let G=c.runtime,j=i;u.impl_dispatch=Et("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),U===null&&(u.impl_runtime=Et(G,"global",`${G} (\uC720\uB3C4)`,G,"explicit")),Pt(t.impl_model)===null&&(u.impl_model=Et(j,"global",j,j,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let G of["impl_runtime","impl_model","impl_effort","impl_speed"])u[G]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ae&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let G=u.impl_runtime.value==="inherit"?Pt(e.controller_runtime):u.impl_runtime.value,j=G?Vc(G,s,a):[];if(u.impl_model.value!=="auto"&&j.length>0&&!j.includes(u.impl_model.value))u.impl_model=Va(u.impl_model);else{let q=Ka(u.impl_model.value,G,s,a);u.impl_model.display=Pr(q),u.impl_model.full_value=q}}if(u.impl_effort.value==="auto"){let G=Pt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),j=G?Pt(s.implementation?.effort_by_transport?.[G]?.auto):null;j&&!q_.has(j)?(u.impl_effort.display=`${j} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=j,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Et("default","base","default (\uC77C\uBC18)","default","default"):Dr("default",u.impl_speed.source))}}else for(let d of N_.filter(b=>!b.startsWith("orchestration_")))u[d]=Gc(d,t,n);if(!s){for(let[d,b]of Object.entries(Hc))(u[b].value==="self"||u[b].value==="skip")&&(u[d]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=Gc(d,t,n);continue}let b=d.replace("orchestration_",""),v=Pt(o[b]),h=as(d,t,n,v);if(d==="orchestration_effort"&&h.source==="base"){u[d]=Et(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(h.value===null){u[d]=Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let x=h.source==="base"?Pt(o.model_id)||h.value:Ka(h.value,null,s,a);u[d]=Et(h.value,h.source,Pr(x),x,h.source==="base"?"default":"explicit");continue}if(h.value==="default"){u[d]=h.source==="base"?Et("default","base","default (\uC77C\uBC18)","default","default"):Dr("default",h.source);continue}u[d]=Dr(h.value,h.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Et(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Pr(d)})`,null,"default")}else if(c.runtime!==null){let d=Ka(i,c.runtime,s,a);u.quick_fix_impl_model=Et(i,"global",Pr(d),d,"explicit")}else c.offered?u.quick_fix_impl_model=Va(Et(i,"global","",null,"explicit")):u.quick_fix_impl_model=Dr(i,"global");return u}function U_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function bo(e){let t=zt(e.pin)?e.pin:{},n=zt(e.global)?e.global:{},r=zt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=b=>{let v={...r,...b};return ln({pin:e.layer==="pin"?v:t,global:e.layer==="pin"?n:v,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],u=Pt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:U_(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:d.map(b=>{let v=s({...o,[e.key]:b})[e.key];return{value:b,label:v.display,full_value:v.full_value}})}}function Mr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let c=!1,u=b=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(b))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",b=>{b.key==="Enter"&&(b.ctrlKey||b.metaKey)&&(b.preventDefault(),d())}),t.addEventListener("cancel",b=>{b.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function Ya(e){return`session:${e.provider}:${e.session_id}`}function is(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function W_(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function ho(e,t,n,r){return{attempt_id:Ya(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:is(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:W_(e,n)}}}var Za="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",z_="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Yc="\uBD84\uD574 \uC5C6\uB294 leg";function Bt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var In=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Nr=[...In,"reasoning_output_tokens"],H_={codex:["implementation","review-consult"],claude:["subagent"]};function Xa(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!In.some(t=>Number.isFinite(e[t]))}function G_(e){return!e||typeof e!="object"?!1:Nr.some(t=>Number.isFinite(e[t]))}function Qa(e){let t=0;for(let n of In)t+=Bt(e?.[n]);return t}function K_(e){return!e||typeof e!="object"?!1:In.some(t=>Number.isFinite(e[t]))}function Zc(e){return!e||typeof e!="object"?!1:Nr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function V_(e){let t={};for(let n of Nr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Xc(e){let t={};for(let n of Nr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Qc(e,t){return Xa(t)?Bt(t.total_tokens):e==="codex"?Bt(t.input_tokens)+Bt(t.output_tokens):Qa(t)}function Y_(e){return e==="claude"?"Claude":"Codex"}function Z_(e){return`\u03C4 ${eu(e)}`}function X_(e,t){let n=t.breakdown||{},r=Bt(t.total_only_subtotal);if(Xa(n)||r>0&&!G_(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,z_];return t.replayed&&u.push(Za),u.join(`
`)}let s=[`\uC785\uB825 ${Bt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Bt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Bt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${Yc} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",a=r>0?`${o} + ${Yc}`:o,c=[e==="claude"?`Claude subtotal = ${a}`:`Codex subtotal = ${a}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&c.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&c.push(Za),c.join(`
`)}function Vt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Y_(n)} ${Z_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:X_(n,r)})}return t}function vo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal,Number.isFinite(a.total_only_subtotal)&&(i.total_only_subtotal=Bt(i.total_only_subtotal)+Bt(a.total_only_subtotal));for(let c of Nr)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=Bt(i.breakdown[c])+Bt(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ja(e){return!e||typeof e!="object"?null:hn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Q_(e){return e==="codex"?"codex":"claude"}function Ln(){return{subtotal:0,breakdown:V_(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function yo(e,t,n){e.subtotal+=t.subtotal,Xa(t.usage)&&(e.total_only+=t.subtotal);for(let r of Nr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Bt(e.breakdown[r])+Bt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Jc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function eu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function qr(e){return K_(e)?`\u03C4 ${eu(Qa(e))}`:null}function jn(e){let t=qr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ls(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Bt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Bt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Qa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Za),n.join(`
`)}function hn(e,t){let n={claude:Ln(),codex:Ln()},r={orchestrator:{claude:Ln(),codex:Ln()},implementation:{claude:Ln(),codex:Ln()},"review-consult":{claude:Ln(),codex:Ln()},subagent:{claude:Ln(),codex:Ln()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Zc(c)){let d=Q_(i.runner),b=Xc(c),v={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:b,subtotal:Qc(d,b)};b.replayed===!0&&(v.replayed=!0),typeof i.model=="string"&&(v.model=i.model),typeof i.session_id=="string"&&(v.session_id=i.session_id),yo(n[d],v,!0),yo(r.orchestrator[d],v,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let b=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!H_[b].includes(d.role)||!Zc(d.usage))continue;let v=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!v||s.has(v))continue;s.add(v);let h=Xc(d.usage),x={provider:b,role:d.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:Qc(b,h)};x.receipt_id=v,typeof d.agent_type=="string"&&(x.agent_type=d.agent_type),typeof d.agent_id=="string"&&(x.agent_id=d.agent_id),typeof d.model=="string"&&(x.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(x.effort=d.effort),typeof d.session_id=="string"?x.session_id=d.session_id:typeof d.thread_id=="string"&&(x.session_id=d.thread_id),typeof d.turn_id=="string"&&(x.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(x.completed_at=d.completed_at),h.replayed===!0&&(x.replayed=!0),yo(n[b],x,!1),yo(r[x.role][b],x,!1)}}let o={};for(let i of["claude","codex"]){let c=n[i];if(c.legs.length===0)continue;let u=Jc(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let c={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(c[u]={...Jc(d,!0),legs:d.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:cu,setPrototypeOf:tu,isFrozen:J_,getPrototypeOf:em,getOwnPropertyDescriptor:tm}=Object,{freeze:Qt,seal:yn,create:ai}=Object,{apply:ii,construct:li}=typeof Reflect<"u"&&Reflect;Qt||(Qt=function(t){return t});yn||(yn=function(t){return t});ii||(ii=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});li||(li=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var wo=Jt(Array.prototype.forEach),nm=Jt(Array.prototype.lastIndexOf),nu=Jt(Array.prototype.pop),cs=Jt(Array.prototype.push),rm=Jt(Array.prototype.splice),$o=Jt(String.prototype.toLowerCase),ei=Jt(String.prototype.toString),ti=Jt(String.prototype.match),us=Jt(String.prototype.replace),sm=Jt(String.prototype.indexOf),om=Jt(String.prototype.trim),$n=Jt(Object.prototype.hasOwnProperty),Xt=Jt(RegExp.prototype.test),ds=am(TypeError);function Jt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return ii(e,t,r)}}function am(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return li(e,n)}}function lt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:$o;tu&&tu(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(J_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function im(e){for(let t=0;t<e.length;t++)$n(e,t)||(e[t]=null);return e}function Bn(e){let t=ai(null);for(let[n,r]of cu(e))$n(e,n)&&(Array.isArray(r)?t[n]=im(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Bn(r):t[n]=r);return t}function ps(e,t){for(;e!==null;){let r=tm(e,t);if(r){if(r.get)return Jt(r.get);if(typeof r.value=="function")return Jt(r.value)}e=em(e)}function n(){return null}return n}var ru=Qt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ni=Qt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ri=Qt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),lm=Qt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),si=Qt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),cm=Qt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),su=Qt(["#text"]),ou=Qt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),oi=Qt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),au=Qt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ko=Qt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),um=yn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),dm=yn(/<%[\w\W]*|[\w\W]*%>/gm),pm=yn(/\$\{[\w\W]*/gm),fm=yn(/^data-[\-\w.\u00B7-\uFFFF]+$/),_m=yn(/^aria-[\-\w]+$/),uu=yn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),mm=yn(/^(?:\w+script|data):/i),gm=yn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),du=yn(/^html$/i),bm=yn(/^[a-z][.\w]*(-[.\w]+)+$/i),iu=Object.freeze({__proto__:null,ARIA_ATTR:_m,ATTR_WHITESPACE:gm,CUSTOM_ELEMENT:bm,DATA_ATTR:fm,DOCTYPE_NAME:du,ERB_EXPR:dm,IS_ALLOWED_URI:uu,IS_SCRIPT_OR_DATA:mm,MUSTACHE_EXPR:um,TMPLIT_EXPR:pm}),fs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},hm=function(){return typeof window>"u"?null:window},ym=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},lu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function pu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:hm(),t=Le=>pu(Le);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==fs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:b,DOMParser:v,trustedTypes:h}=e,x=c.prototype,M=ps(x,"cloneNode"),U=ps(x,"remove"),Y=ps(x,"nextSibling"),ae=ps(x,"childNodes"),G=ps(x,"parentNode");if(typeof a=="function"){let Le=n.createElement("template");Le.content&&Le.content.ownerDocument&&(n=Le.content.ownerDocument)}let j,q="",{implementation:W,createNodeIterator:S,createDocumentFragment:F,getElementsByTagName:oe}=n,{importNode:Te}=r,ye=lu();t.isSupported=typeof cu=="function"&&typeof G=="function"&&W&&W.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:z,ERB_EXPR:X,TMPLIT_EXPR:ve,DATA_ATTR:$e,ARIA_ATTR:he,IS_SCRIPT_OR_DATA:ie,ATTR_WHITESPACE:Se,CUSTOM_ELEMENT:be}=iu,{IS_ALLOWED_URI:K}=iu,re=null,pe=lt({},[...ru,...ni,...ri,...si,...su]),ke=null,je=lt({},[...ou,...oi,...au,...ko]),ge=Object.seal(ai(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),We=null,D=null,ue=Object.seal(ai(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),qe=!0,Be=!0,Me=!1,Ke=!0,Ve=!1,Qe=!0,it=!1,pt=!1,kt=!1,ft=!1,Q=!1,ne=!1,Oe=!0,Ne=!1,Ce="user-content-",Ie=!0,Fe=!1,st={},et=null,Je=lt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),bt=null,It=lt({},["audio","video","img","source","image","track"]),_t=null,Mt=lt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ht="http://www.w3.org/1998/Math/MathML",He="http://www.w3.org/2000/svg",Pe="http://www.w3.org/1999/xhtml",P=Pe,Z=!1,_e=null,T=lt({},[ht,He,Pe],ei),V=lt({},["mi","mo","mn","ms","mtext"]),fe=lt({},["annotation-xml"]),m=lt({},["title","style","font","a","script"]),w=null,I=["application/xhtml+xml","text/html"],ee="text/html",J=null,me=null,Re=n.createElement("form"),xe=function(R){return R instanceof RegExp||R instanceof Function},ot=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(me&&me===R)){if((!R||typeof R!="object")&&(R={}),R=Bn(R),w=I.indexOf(R.PARSER_MEDIA_TYPE)===-1?ee:R.PARSER_MEDIA_TYPE,J=w==="application/xhtml+xml"?ei:$o,re=$n(R,"ALLOWED_TAGS")?lt({},R.ALLOWED_TAGS,J):pe,ke=$n(R,"ALLOWED_ATTR")?lt({},R.ALLOWED_ATTR,J):je,_e=$n(R,"ALLOWED_NAMESPACES")?lt({},R.ALLOWED_NAMESPACES,ei):T,_t=$n(R,"ADD_URI_SAFE_ATTR")?lt(Bn(Mt),R.ADD_URI_SAFE_ATTR,J):Mt,bt=$n(R,"ADD_DATA_URI_TAGS")?lt(Bn(It),R.ADD_DATA_URI_TAGS,J):It,et=$n(R,"FORBID_CONTENTS")?lt({},R.FORBID_CONTENTS,J):Je,We=$n(R,"FORBID_TAGS")?lt({},R.FORBID_TAGS,J):Bn({}),D=$n(R,"FORBID_ATTR")?lt({},R.FORBID_ATTR,J):Bn({}),st=$n(R,"USE_PROFILES")?R.USE_PROFILES:!1,qe=R.ALLOW_ARIA_ATTR!==!1,Be=R.ALLOW_DATA_ATTR!==!1,Me=R.ALLOW_UNKNOWN_PROTOCOLS||!1,Ke=R.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ve=R.SAFE_FOR_TEMPLATES||!1,Qe=R.SAFE_FOR_XML!==!1,it=R.WHOLE_DOCUMENT||!1,ft=R.RETURN_DOM||!1,Q=R.RETURN_DOM_FRAGMENT||!1,ne=R.RETURN_TRUSTED_TYPE||!1,kt=R.FORCE_BODY||!1,Oe=R.SANITIZE_DOM!==!1,Ne=R.SANITIZE_NAMED_PROPS||!1,Ie=R.KEEP_CONTENT!==!1,Fe=R.IN_PLACE||!1,K=R.ALLOWED_URI_REGEXP||uu,P=R.NAMESPACE||Pe,V=R.MATHML_TEXT_INTEGRATION_POINTS||V,fe=R.HTML_INTEGRATION_POINTS||fe,ge=R.CUSTOM_ELEMENT_HANDLING||{},R.CUSTOM_ELEMENT_HANDLING&&xe(R.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ge.tagNameCheck=R.CUSTOM_ELEMENT_HANDLING.tagNameCheck),R.CUSTOM_ELEMENT_HANDLING&&xe(R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ge.attributeNameCheck=R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),R.CUSTOM_ELEMENT_HANDLING&&typeof R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ge.allowCustomizedBuiltInElements=R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ve&&(Be=!1),Q&&(ft=!0),st&&(re=lt({},su),ke=[],st.html===!0&&(lt(re,ru),lt(ke,ou)),st.svg===!0&&(lt(re,ni),lt(ke,oi),lt(ke,ko)),st.svgFilters===!0&&(lt(re,ri),lt(ke,oi),lt(ke,ko)),st.mathMl===!0&&(lt(re,si),lt(ke,au),lt(ke,ko))),R.ADD_TAGS&&(typeof R.ADD_TAGS=="function"?ue.tagCheck=R.ADD_TAGS:(re===pe&&(re=Bn(re)),lt(re,R.ADD_TAGS,J))),R.ADD_ATTR&&(typeof R.ADD_ATTR=="function"?ue.attributeCheck=R.ADD_ATTR:(ke===je&&(ke=Bn(ke)),lt(ke,R.ADD_ATTR,J))),R.ADD_URI_SAFE_ATTR&&lt(_t,R.ADD_URI_SAFE_ATTR,J),R.FORBID_CONTENTS&&(et===Je&&(et=Bn(et)),lt(et,R.FORBID_CONTENTS,J)),Ie&&(re["#text"]=!0),it&&lt(re,["html","head","body"]),re.table&&(lt(re,["tbody"]),delete We.tbody),R.TRUSTED_TYPES_POLICY){if(typeof R.TRUSTED_TYPES_POLICY.createHTML!="function")throw ds('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof R.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ds('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=R.TRUSTED_TYPES_POLICY,q=j.createHTML("")}else j===void 0&&(j=ym(h,s)),j!==null&&typeof q=="string"&&(q=j.createHTML(""));Qt&&Qt(R),me=R}},dt=lt({},[...ni,...ri,...lm]),Ae=lt({},[...si,...cm]),Nt=function(R){let de=G(R);(!de||!de.tagName)&&(de={namespaceURI:P,tagName:"template"});let Ee=$o(R.tagName),ct=$o(de.tagName);return _e[R.namespaceURI]?R.namespaceURI===He?de.namespaceURI===Pe?Ee==="svg":de.namespaceURI===ht?Ee==="svg"&&(ct==="annotation-xml"||V[ct]):!!dt[Ee]:R.namespaceURI===ht?de.namespaceURI===Pe?Ee==="math":de.namespaceURI===He?Ee==="math"&&fe[ct]:!!Ae[Ee]:R.namespaceURI===Pe?de.namespaceURI===He&&!fe[ct]||de.namespaceURI===ht&&!V[ct]?!1:!Ae[Ee]&&(m[Ee]||!dt[Ee]):!!(w==="application/xhtml+xml"&&_e[R.namespaceURI]):!1},wt=function(R){cs(t.removed,{element:R});try{G(R).removeChild(R)}catch{U(R)}},Ut=function(R,de){try{cs(t.removed,{attribute:de.getAttributeNode(R),from:de})}catch{cs(t.removed,{attribute:null,from:de})}if(de.removeAttribute(R),R==="is")if(ft||Q)try{wt(de)}catch{}else try{de.setAttribute(R,"")}catch{}},Zt=function(R){let de=null,Ee=null;if(kt)R="<remove></remove>"+R;else{let gt=ti(R,/^[\r\n\t ]+/);Ee=gt&&gt[0]}w==="application/xhtml+xml"&&P===Pe&&(R='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+R+"</body></html>");let ct=j?j.createHTML(R):R;if(P===Pe)try{de=new v().parseFromString(ct,w)}catch{}if(!de||!de.documentElement){de=W.createDocument(P,"template",null);try{de.documentElement.innerHTML=Z?q:ct}catch{}}let $t=de.body||de.documentElement;return R&&Ee&&$t.insertBefore(n.createTextNode(Ee),$t.childNodes[0]||null),P===Pe?oe.call(de,it?"html":"body")[0]:it?de.documentElement:$t},Ht=function(R){return S.call(R.ownerDocument||R,R,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Wt=function(R){return R instanceof b&&(typeof R.nodeName!="string"||typeof R.textContent!="string"||typeof R.removeChild!="function"||!(R.attributes instanceof d)||typeof R.removeAttribute!="function"||typeof R.setAttribute!="function"||typeof R.namespaceURI!="string"||typeof R.insertBefore!="function"||typeof R.hasChildNodes!="function")},un=function(R){return typeof i=="function"&&R instanceof i};function Ct(Le,R,de){wo(Le,Ee=>{Ee.call(t,R,de,me)})}let Rt=function(R){let de=null;if(Ct(ye.beforeSanitizeElements,R,null),Wt(R))return wt(R),!0;let Ee=J(R.nodeName);if(Ct(ye.uponSanitizeElement,R,{tagName:Ee,allowedTags:re}),Qe&&R.hasChildNodes()&&!un(R.firstElementChild)&&Xt(/<[/\w!]/g,R.innerHTML)&&Xt(/<[/\w!]/g,R.textContent)||R.nodeType===fs.progressingInstruction||Qe&&R.nodeType===fs.comment&&Xt(/<[/\w]/g,R.data))return wt(R),!0;if(!(ue.tagCheck instanceof Function&&ue.tagCheck(Ee))&&(!re[Ee]||We[Ee])){if(!We[Ee]&&dn(Ee)&&(ge.tagNameCheck instanceof RegExp&&Xt(ge.tagNameCheck,Ee)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Ee)))return!1;if(Ie&&!et[Ee]){let ct=G(R)||R.parentNode,$t=ae(R)||R.childNodes;if($t&&ct){let gt=$t.length;for(let Dt=gt-1;Dt>=0;--Dt){let jt=M($t[Dt],!0);jt.__removalCount=(R.__removalCount||0)+1,ct.insertBefore(jt,Y(R))}}}return wt(R),!0}return R instanceof c&&!Nt(R)||(Ee==="noscript"||Ee==="noembed"||Ee==="noframes")&&Xt(/<\/no(script|embed|frames)/i,R.innerHTML)?(wt(R),!0):(Ve&&R.nodeType===fs.text&&(de=R.textContent,wo([z,X,ve],ct=>{de=us(de,ct," ")}),R.textContent!==de&&(cs(t.removed,{element:R.cloneNode()}),R.textContent=de)),Ct(ye.afterSanitizeElements,R,null),!1)},Ge=function(R,de,Ee){if(Oe&&(de==="id"||de==="name")&&(Ee in n||Ee in Re))return!1;if(!(Be&&!D[de]&&Xt($e,de))){if(!(qe&&Xt(he,de))){if(!(ue.attributeCheck instanceof Function&&ue.attributeCheck(de,R))){if(!ke[de]||D[de]){if(!(dn(R)&&(ge.tagNameCheck instanceof RegExp&&Xt(ge.tagNameCheck,R)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(R))&&(ge.attributeNameCheck instanceof RegExp&&Xt(ge.attributeNameCheck,de)||ge.attributeNameCheck instanceof Function&&ge.attributeNameCheck(de,R))||de==="is"&&ge.allowCustomizedBuiltInElements&&(ge.tagNameCheck instanceof RegExp&&Xt(ge.tagNameCheck,Ee)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Ee))))return!1}else if(!_t[de]){if(!Xt(K,us(Ee,Se,""))){if(!((de==="src"||de==="xlink:href"||de==="href")&&R!=="script"&&sm(Ee,"data:")===0&&bt[R])){if(!(Me&&!Xt(ie,us(Ee,Se,"")))){if(Ee)return!1}}}}}}}return!0},dn=function(R){return R!=="annotation-xml"&&ti(R,be)},tn=function(R){Ct(ye.beforeSanitizeAttributes,R,null);let{attributes:de}=R;if(!de||Wt(R))return;let Ee={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ke,forceKeepAttr:void 0},ct=de.length;for(;ct--;){let $t=de[ct],{name:gt,namespaceURI:Dt,value:jt}=$t,Gt=J(gt),nn=jt,St=gt==="value"?nn:om(nn);if(Ee.attrName=Gt,Ee.attrValue=St,Ee.keepAttr=!0,Ee.forceKeepAttr=void 0,Ct(ye.uponSanitizeAttribute,R,Ee),St=Ee.attrValue,Ne&&(Gt==="id"||Gt==="name")&&(Ut(gt,R),St=Ce+St),Qe&&Xt(/((--!?|])>)|<\/(style|title|textarea)/i,St)){Ut(gt,R);continue}if(Gt==="attributename"&&ti(St,"href")){Ut(gt,R);continue}if(Ee.forceKeepAttr)continue;if(!Ee.keepAttr){Ut(gt,R);continue}if(!Ke&&Xt(/\/>/i,St)){Ut(gt,R);continue}Ve&&wo([z,X,ve],gn=>{St=us(St,gn," ")});let rn=J(R.nodeName);if(!Ge(rn,Gt,St)){Ut(gt,R);continue}if(j&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!Dt)switch(h.getAttributeType(rn,Gt)){case"TrustedHTML":{St=j.createHTML(St);break}case"TrustedScriptURL":{St=j.createScriptURL(St);break}}if(St!==nn)try{Dt?R.setAttributeNS(Dt,gt,St):R.setAttribute(gt,St),Wt(R)?wt(R):nu(t.removed)}catch{Ut(gt,R)}}Ct(ye.afterSanitizeAttributes,R,null)},rt=function Le(R){let de=null,Ee=Ht(R);for(Ct(ye.beforeSanitizeShadowDOM,R,null);de=Ee.nextNode();)Ct(ye.uponSanitizeShadowNode,de,null),Rt(de),tn(de),de.content instanceof o&&Le(de.content);Ct(ye.afterSanitizeShadowDOM,R,null)};return t.sanitize=function(Le){let R=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},de=null,Ee=null,ct=null,$t=null;if(Z=!Le,Z&&(Le="<!-->"),typeof Le!="string"&&!un(Le))if(typeof Le.toString=="function"){if(Le=Le.toString(),typeof Le!="string")throw ds("dirty is not a string, aborting")}else throw ds("toString is not a function");if(!t.isSupported)return Le;if(pt||ot(R),t.removed=[],typeof Le=="string"&&(Fe=!1),Fe){if(Le.nodeName){let jt=J(Le.nodeName);if(!re[jt]||We[jt])throw ds("root node is forbidden and cannot be sanitized in-place")}}else if(Le instanceof i)de=Zt("<!---->"),Ee=de.ownerDocument.importNode(Le,!0),Ee.nodeType===fs.element&&Ee.nodeName==="BODY"||Ee.nodeName==="HTML"?de=Ee:de.appendChild(Ee);else{if(!ft&&!Ve&&!it&&Le.indexOf("<")===-1)return j&&ne?j.createHTML(Le):Le;if(de=Zt(Le),!de)return ft?null:ne?q:""}de&&kt&&wt(de.firstChild);let gt=Ht(Fe?Le:de);for(;ct=gt.nextNode();)Rt(ct),tn(ct),ct.content instanceof o&&rt(ct.content);if(Fe)return Le;if(ft){if(Q)for($t=F.call(de.ownerDocument);de.firstChild;)$t.appendChild(de.firstChild);else $t=de;return(ke.shadowroot||ke.shadowrootmode)&&($t=Te.call(r,$t,!0)),$t}let Dt=it?de.outerHTML:de.innerHTML;return it&&re["!doctype"]&&de.ownerDocument&&de.ownerDocument.doctype&&de.ownerDocument.doctype.name&&Xt(du,de.ownerDocument.doctype.name)&&(Dt="<!DOCTYPE "+de.ownerDocument.doctype.name+`>
`+Dt),Ve&&wo([z,X,ve],jt=>{Dt=us(Dt,jt," ")}),j&&ne?j.createHTML(Dt):Dt},t.setConfig=function(){let Le=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ot(Le),pt=!0},t.clearConfig=function(){me=null,pt=!1},t.isValidAttribute=function(Le,R,de){me||ot({});let Ee=J(Le),ct=J(R);return Ge(Ee,ct,de)},t.addHook=function(Le,R){typeof R=="function"&&cs(ye[Le],R)},t.removeHook=function(Le,R){if(R!==void 0){let de=nm(ye[Le],R);return de===-1?void 0:rm(ye[Le],de,1)[0]}return nu(ye[Le])},t.removeHooks=function(Le){ye[Le]=[]},t.removeAllHooks=function(){ye=lu()},t}var fu=pu();var Un={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},xo=e=>(...t)=>({_$litDirective$:e,values:t}),Fr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var _s=class extends Fr{constructor(t){if(super(t),this.it=Ft,t.type!==Un.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ft||t==null)return this._t=void 0,this.it=t;if(t===bn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};_s.directiveName="unsafeHTML",_s.resultType=1;var _u=xo(_s);function pi(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var gr=pi();function wu(e){gr=e}var hs={exec:()=>null};function mt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(en.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var vm=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),en={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},wm=/^(?:[ \t]*(?:\n|$))+/,km=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,$m=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ys=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,xm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,fi=/(?:[*+-]|\d{1,9}[.)])/,ku=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,$u=mt(ku).replace(/bull/g,fi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Am=mt(ku).replace(/bull/g,fi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),_i=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Sm=/^[^\n]+/,mi=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Em=mt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",mi).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Tm=mt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,fi).getRegex(),Ro="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",gi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Cm=mt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",gi).replace("tag",Ro).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),xu=mt(_i).replace("hr",ys).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ro).getRegex(),Rm=mt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",xu).getRegex(),bi={blockquote:Rm,code:km,def:Em,fences:$m,heading:xm,hr:ys,html:Cm,lheading:$u,list:Tm,newline:wm,paragraph:xu,table:hs,text:Sm},mu=mt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ys).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ro).getRegex(),Om={...bi,lheading:Am,table:mu,paragraph:mt(_i).replace("hr",ys).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",mu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ro).getRegex()},Lm={...bi,html:mt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",gi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:hs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:mt(_i).replace("hr",ys).replace("heading",` *#{1,6} *[^
]`).replace("lheading",$u).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Im=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Pm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Au=/^( {2,}|\\)\n(?!\s*$)/,Dm=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Oo=/[\p{P}\p{S}]/u,hi=/[\s\p{P}\p{S}]/u,Su=/[^\s\p{P}\p{S}]/u,Mm=mt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,hi).getRegex(),Eu=/(?!~)[\p{P}\p{S}]/u,Nm=/(?!~)[\s\p{P}\p{S}]/u,qm=/(?:[^\s\p{P}\p{S}]|~)/u,Fm=mt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",vm?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Tu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,jm=mt(Tu,"u").replace(/punct/g,Oo).getRegex(),Bm=mt(Tu,"u").replace(/punct/g,Eu).getRegex(),Cu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Um=mt(Cu,"gu").replace(/notPunctSpace/g,Su).replace(/punctSpace/g,hi).replace(/punct/g,Oo).getRegex(),Wm=mt(Cu,"gu").replace(/notPunctSpace/g,qm).replace(/punctSpace/g,Nm).replace(/punct/g,Eu).getRegex(),zm=mt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Su).replace(/punctSpace/g,hi).replace(/punct/g,Oo).getRegex(),Hm=mt(/\\(punct)/,"gu").replace(/punct/g,Oo).getRegex(),Gm=mt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Km=mt(gi).replace("(?:-->|$)","-->").getRegex(),Vm=mt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Km).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Eo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ym=mt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Eo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ru=mt(/^!?\[(label)\]\[(ref)\]/).replace("label",Eo).replace("ref",mi).getRegex(),Ou=mt(/^!?\[(ref)\](?:\[\])?/).replace("ref",mi).getRegex(),Zm=mt("reflink|nolink(?!\\()","g").replace("reflink",Ru).replace("nolink",Ou).getRegex(),gu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,yi={_backpedal:hs,anyPunctuation:Hm,autolink:Gm,blockSkip:Fm,br:Au,code:Pm,del:hs,emStrongLDelim:jm,emStrongRDelimAst:Um,emStrongRDelimUnd:zm,escape:Im,link:Ym,nolink:Ou,punctuation:Mm,reflink:Ru,reflinkSearch:Zm,tag:Vm,text:Dm,url:hs},Xm={...yi,link:mt(/^!?\[(label)\]\((.*?)\)/).replace("label",Eo).getRegex(),reflink:mt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Eo).getRegex()},ci={...yi,emStrongRDelimAst:Wm,emStrongLDelim:Bm,url:mt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",gu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:mt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",gu).getRegex()},Qm={...ci,br:mt(Au).replace("{2,}","*").getRegex(),text:mt(ci.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ao={normal:bi,gfm:Om,pedantic:Lm},ms={normal:yi,gfm:ci,breaks:Qm,pedantic:Xm},Jm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},bu=e=>Jm[e];function Wn(e,t){if(t){if(en.escapeTest.test(e))return e.replace(en.escapeReplace,bu)}else if(en.escapeTestNoEncode.test(e))return e.replace(en.escapeReplaceNoEncode,bu);return e}function hu(e){try{e=encodeURI(e).replace(en.percentDecode,"%")}catch{return null}return e}function yu(e,t){let n=e.replace(en.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),r=n.split(en.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(en.slashPipe,"|");return r}function gs(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function eg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function vu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,c}function tg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var To=class{constructor(e){At(this,"options");At(this,"rules");At(this,"lexer");this.options=e||gr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:gs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=tg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=gs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:gs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=gs(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))i.push(n[c]),a=!0;else if(!a)i.push(n[c]);else break;n=n.slice(c);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let b=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=b,n.length===0)break;let v=o.at(-1);if(v?.type==="code")break;if(v?.type==="blockquote"){let h=v,x=h.raw+`
`+n.join(`
`),M=this.blockquote(x);o[o.length-1]=M,r=r.substring(0,r.length-h.raw.length)+M.raw,s=s.substring(0,s.length-h.text.length)+M.text;break}else if(v?.type==="list"){let h=v,x=h.raw+`
`+n.join(`
`),M=this.list(x);o[o.length-1]=M,r=r.substring(0,r.length-v.raw.length)+M.raw,s=s.substring(0,s.length-h.raw.length)+M.raw,n=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let b=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,M=>" ".repeat(3*M.length)),v=e.split(`
`,1)[0],h=!b.trim(),x=0;if(this.options.pedantic?(x=2,d=b.trimStart()):h?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,d=b.slice(x),x+=t[1].length),h&&this.rules.other.blankLine.test(v)&&(u+=v+`
`,e=e.substring(v.length+1),c=!0),!c){let M=this.rules.other.nextBulletRegex(x),U=this.rules.other.hrRegex(x),Y=this.rules.other.fencesBeginRegex(x),ae=this.rules.other.headingBeginRegex(x),G=this.rules.other.htmlBeginRegex(x);for(;e;){let j=e.split(`
`,1)[0],q;if(v=j,this.options.pedantic?(v=v.replace(this.rules.other.listReplaceNesting,"  "),q=v):q=v.replace(this.rules.other.tabCharGlobal,"    "),Y.test(v)||ae.test(v)||G.test(v)||M.test(v)||U.test(v))break;if(q.search(this.rules.other.nonSpaceChar)>=x||!v.trim())d+=`
`+q.slice(x);else{if(h||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(b)||ae.test(b)||U.test(b))break;d+=`
`+v}!h&&!v.trim()&&(h=!0),u+=j+`
`,e=e.substring(j.length+1),b=q.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=d.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=d.raw+c.tokens[0].raw,c.tokens[0].text=d.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(d)):c.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):c.tokens.unshift(d)}}if(!s.loose){let u=c.tokens.filter(b=>b.type==="space"),d=u.length>0&&u.some(b=>this.rules.other.anyLine.test(b.raw));s.loose=d}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=yu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(yu(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=gs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=eg(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),vu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return vu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,c=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let d=[...r[0]][0].length,b=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let h=b.slice(1,-1);return{type:"em",raw:b,text:h,tokens:this.lexer.inlineTokens(h)}}let v=b.slice(2,-2);return{type:"strong",raw:b,text:v,tokens:this.lexer.inlineTokens(v)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},xn=class ui{constructor(t){At(this,"tokens");At(this,"options");At(this,"state");At(this,"inlineQueue");At(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||gr,this.options.tokenizer=this.options.tokenizer||new To,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:en,block:Ao.normal,inline:ms.normal};this.options.pedantic?(n.block=Ao.pedantic,n.inline=ms.pedantic):this.options.gfm&&(n.block=Ao.gfm,this.options.breaks?n.inline=ms.breaks:n.inline=ms.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ao,inline:ms}}static lex(t,n){return new ui(n).lex(t)}static lexInline(t,n){return new ui(n).inlineTokens(t)}lex(t){t=t.replace(en.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(d=>(c=d.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let d=n.at(-1);c.type==="text"&&d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,i)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,b=t.slice(1),v;this.options.extensions.startInline.forEach(h=>{v=h.call({lexer:this},b),typeof v=="number"&&v>=0&&(d=Math.min(d,v))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):n.push(c);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Co=class{constructor(e){At(this,"options");At(this,"parser");this.options=e||gr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(en.notSpaceStart)?.[0],s=e.replace(en.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Wn(r)+'">'+(n?s:Wn(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Wn(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Wn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=hu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Wn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=hu(e);if(s===null)return Wn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Wn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Wn(e.text)}},vi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},An=class di{constructor(t){At(this,"options");At(this,"renderer");At(this,"textRenderer");this.options=t||gr,this.options.renderer=this.options.renderer||new Co,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new vi}static parse(t,n){return new di(n).parse(t)}static parseInline(t,n){return new di(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},So,bs=(So=class{constructor(e){At(this,"options");At(this,"block");this.options=e||gr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?xn.lex:xn.lexInline}provideParser(){return this.block?An.parse:An.parseInline}},At(So,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),At(So,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),So),ng=class{constructor(...e){At(this,"defaults",pi());At(this,"options",this.setOptions);At(this,"parse",this.parseMarkdown(!0));At(this,"parseInline",this.parseMarkdown(!1));At(this,"Parser",An);At(this,"Renderer",Co);At(this,"TextRenderer",vi);At(this,"Lexer",xn);At(this,"Tokenizer",To);At(this,"Hooks",bs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Co(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new To(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new bs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],c=s[a];bs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&bs.passThroughHooksRespectAsync.has(o))return(async()=>{let b=await i.call(s,u);return c.call(s,b)})();let d=i.call(s,u);return c.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let b=await i.apply(s,u);return b===!1&&(b=await c.apply(s,u)),b})();let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return xn.lex(e,t??this.defaults)}parser(e,t){return An.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?xn.lex:xn.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?An.parse:An.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?xn.lex:xn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?An.parse:An.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Wn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},mr=new ng;function vt(e,t){return mr.parse(e,t)}vt.options=vt.setOptions=function(e){return mr.setOptions(e),vt.defaults=mr.defaults,wu(vt.defaults),vt};vt.getDefaults=pi;vt.defaults=gr;vt.use=function(...e){return mr.use(...e),vt.defaults=mr.defaults,wu(vt.defaults),vt};vt.walkTokens=function(e,t){return mr.walkTokens(e,t)};vt.parseInline=mr.parseInline;vt.Parser=An;vt.parser=An.parse;vt.Renderer=Co;vt.TextRenderer=vi;vt.Lexer=xn;vt.lexer=xn.lex;vt.Tokenizer=To;vt.Hooks=bs;vt.parse=vt;var Dw=vt.options,Mw=vt.setOptions,Nw=vt.use,qw=vt.walkTokens,Fw=vt.parseInline;var jw=An.parse,Bw=xn.lex;function Xn(e){let t=vt.parse(e),n=fu.sanitize(t);return _u(n)}function zn(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function jr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Lo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Iu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},rg={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},sg=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,og=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Sn(e){return!!e&&typeof e=="object"}function wi(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ki(e,t){let n=wi(e),r=wi(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Pu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Sn(s)&&typeof s.text=="string"?s.text:"").join(""):Sn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function ag(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Iu[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=wi(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=ki(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let c=ki(Sn(i)?i.old_string:"",Sn(i)?i.new_string:"");s+=c.added,o+=c.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function $i(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var ig=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Du(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Sn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(ig,"").trim();return n.length>0?{kind:"user",text:n}:null}function xi(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=sg.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:og.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function lg(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function cg(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Sn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(xi(a.text));else if(a.type==="thinking"){let i=$i(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=ag(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?Lu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let a of s)if(Sn(a)&&a.type==="tool_result"){let i=t.get(String(a.tool_use_id));if(i){let c=Pu(a.content);i.result=c,i.output=typeof a.content=="string"?a.content:c,a.is_error===!0&&(i.is_error=!0)}}let o=Du(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Lu([s],n):[s]}return[]}function Lu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function ug(e){let t=typeof e.command=="string"?e.command:"",n=Pu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Iu.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function dg(e){if(e.type==="item.completed"&&Sn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[xi(t.text)];if(t.type==="user_message"){let n=Du(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=$i(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[ug(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function pg(e){if(e.schema!=="codex-delegation-monitor-v1"||!Sn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Sn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[xi(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=$i(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=rg[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function fg(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function _g(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Sn(t)?t:null}function Mu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=_g(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return lg(o,r);let a=o.schema==="codex-delegation-monitor-v1"?pg(o):fg(o)?dg(o):cg(o,n);return a.length>0&&(r.progress=null),a}}}function Ai(e){let t=[],n=Mu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var mg=5,gg=10,bg=/Task\s+#(\d+)/,hg=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,yg=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function vs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function vg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function wg(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function kg(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=bg.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function $g(e){if(e.tool==="Bash"){let t=e.command||"";return hg.test(t)?"~ PR/\uAC8C\uC2DC \uC911":yg.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function xg(e){let t=e.filter(s=>s.kind==="tool").slice(-gg),n=new Map;t.forEach((s,o)=>{let a=$g(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Ag(e){let t=wg(e);if(t)return{text:t,guess:!1};let n=kg(e);if(n)return{text:n,guess:!1};let r=xg(e);return r?{text:r,guess:!0}:null}function Sg(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:an(e,t)}function Br(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,c=null,u=null,d=!1,b={},v=!0,h=new Set,x=new Set,M=null,U=null,Y=!1,ae=!1,G=!1,j=null,q=null;function W(){Y=!1,ae=!1,G=!1,j=null,q=null}async function S(Q){if(n){ae=!0,G=!1,We();try{let ne=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Q,...u?{root_dir:u}:{}}));if(o!==Q)return;!ne||typeof ne!="object"||Array.isArray(ne)?G=!0:(j=ne,q=Q)}catch{o===Q&&(G=!0)}finally{o===Q&&(ae=!1,We())}}}function F(){if(Y=!Y,Y&&o&&q!==o){S(o);return}We()}function oe(){if(!Y)return"";let Q=jr({loading:ae,error:G});if(Q)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Q}
      </div>`;if(!j)return"";if(j.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let ne=Lo(j.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${ne?l`<div class="prompt-block__meta">${ne} 발송</div>`:""}
      ${typeof j.task_prompt=="string"?zn("\uACFC\uC5C5 (user)",j.task_prompt):""}
      ${typeof j.system_prompt=="string"?zn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",j.system_prompt):""}
    </div>`}function Te(){if(!c||!r)return[];let Q=r.get(c);return Ai(Q?Q.lines:[])}function ye(){if(!c||!r)return null;let Q=r.get(c),ne=Q?Q.last_event_at:null;return typeof ne=="number"?ne:null}function z(){return b.status==="running"}function X(){if(z()&&o){U||(U=setInterval(()=>We(),1e3));return}ve()}function ve(){U&&(clearInterval(U),U=null)}function $e(Q){let ne=[],Oe=0;for(;Oe<Q.length;){let{idx:Ne,line:Ce}=Q[Oe];if(Ce.kind==="tool"){let Ie=Oe;for(;Ie<Q.length&&Q[Ie].line.kind==="tool"&&Q[Ie].line.tool===Ce.tool;)Ie+=1;if(Ie-Oe>=mg&&!x.has(Ne)){ne.push({kind:"group",idx:Ne,tool:Ce.tool||"",lines:Q.slice(Oe,Ie)}),Oe=Ie;continue}}ne.push({kind:"line",idx:Ne,line:Ce}),Oe+=1}return ne}function he(Q){let ne=[],Oe=new Map;for(let Ie=0;Ie<Q.length;Ie+=1){let Fe=Q[Ie],st=Fe.parent_tool_use_id;if(typeof st=="string"&&st.length>0){let et=Oe.get(st);et||(et={kind:"subagent",idx:Ie,launch_id:st,agent_type:null,header:null,lines:[]},Oe.set(st,et),ne.push(et)),et.lines.push({idx:Ie,line:Fe});continue}if(Fe.kind==="tool"&&Fe.tool==="Agent"&&typeof Fe.launch_id=="string"&&Fe.launch_id.length>0){let et=ie(Fe),Je=Oe.get(Fe.launch_id);if(Je){Je.header={idx:Ie,line:Fe},Je.agent_type=et;continue}let bt={kind:"subagent",idx:Ie,launch_id:Fe.launch_id,agent_type:et,header:{idx:Ie,line:Fe},lines:[]};Oe.set(Fe.launch_id,bt),ne.push(bt);continue}ne.push({kind:"entry",idx:Ie,line:Fe})}let Ne=[],Ce=0;for(;Ce<ne.length;){if(ne[Ce].kind!=="entry"){Ne.push(ne[Ce]),Ce+=1;continue}let Ie=Ce;for(;Ie<ne.length&&ne[Ie].kind==="entry";)Ie+=1;Ne.push(...$e(ne.slice(Ce,Ie))),Ce=Ie}return Ne}function ie(Q){let ne=Q.input;return ne&&typeof ne.subagent_type=="string"?ne.subagent_type:null}function Se(Q){for(let ne=Q.length-1;ne>=0;ne-=1){let Oe=Q[ne];if(Oe.kind==="result"||Oe.kind==="error")return null;if(Oe.kind==="tool"&&!Object.hasOwn(Oe,"result"))return Oe}return null}function be(Q){for(let ne=Q.length-1;ne>=0;ne-=1)if(Q[ne].kind==="thinking")return Q[ne];return null}function K(Q,ne){if(ne.kind==="gate")return l`<div class="sv__gate">${ne.text}</div>`;if(ne.kind==="phase")return l`<div class="sv__phase">${ne.text}</div>`;if(ne.kind==="result")return l`<div
        class="sv__result${ne.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${ne.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Xn(ne.text||(ne.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(ne.kind==="thinking"){let Oe=h.has(Q);return l`<div
        class="sv__think${Oe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ue(Q)}
      >
        <span class="sv__think-line">💭 ${vs(ne.text)}</span>
        ${Oe?l`<pre class="sv__think-expand">${ne.text}</pre>`:""}
      </div>`}if(ne.kind==="user"){let Oe=h.has(Q);return l`<div
        class="sv__line sv__line--user${Oe?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ue(Q)}
      >
        <span class="sv__user-line">▷ ${vs(ne.text)}</span>
        ${Oe?l`<pre class="sv__user-expand">${ne.text}</pre>`:""}
      </div>`}if(ne.kind==="error")return l`<div class="sv__error">⛔ ${ne.text}</div>`;if(ne.kind==="blocker")return l`<div class="sv__error">⛔ ${ne.text}</div>`;if(ne.kind==="tool"){let Oe=h.has(Q),Ne=ne.tool==="Bash"?vg(ne.command):0,Ce=ne.tool==="Bash"?Ne>1?vs(ne.command):ne.command:ne.path||ne.command||"";return l`<div
        class="sv__tool${Oe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ue(Q)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${ne.icon}</span>
          <span class="sv__tool-name">${ne.tool}</span>
          ${Ce?l`<span class="sv__tool-detail">${Ce}</span>`:""}
          ${Ne>1?l`<span class="sv__tool-more">⋯ ${Ne}줄</span>`:""}
          ${typeof ne.added=="number"?l`<span class="sv__diff-add">+${ne.added}</span>`:""}
          ${typeof ne.removed=="number"?l`<span class="sv__diff-del">−${ne.removed}</span>`:""}
          ${ne.result?l`<span class="sv__tool-ok">→ ${ne.result}</span>`:""}
        </span>
        ${Oe?l`<pre class="sv__tool-expand">${re(ne)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Xn(ne.text||"")}</div>`}function re(Q){let ne=[];if(Q.tool==="Bash"&&typeof Q.command=="string"&&Q.command.length>0)ne.push(Q.command);else if(Q.input!==void 0)try{ne.push(`input: ${JSON.stringify(Q.input,null,2)}`)}catch{}return typeof Q.output=="string"&&Q.output.length>0&&ne.push(`output:
${Q.output}`),ne.join(`

`)}function pe(){if(!o)return l``;let Q=Te(),ne=(a?[b.agent_type,b.model,b.effort]:[b.runner,b.model,b.effort]).filter(Boolean).join(" \xB7 "),Oe=b.session_id||"",Ne=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${v?"ON":"OFF"}`,Ce=z(),Ie=Ce?Sg(ye(),Date.now()):"",Fe=Ce?Se(Q):null,st=Ce?be(Q):null,et=Ag(Q);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${b.label||(a?b.role||"":o)}</span
        >
        ${et?l`<span
              class="sv__stage${et.guess?" sv__stage--guess":""}"
              title=${et.text}
              >${et.text}</span
            >`:""}
        ${Ce?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ie?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ie}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ie?l`<span class="sv__live-ago">${Ie}</span>`:""}</span
            >`:""}
        ${Oe?l`<button
              type="button"
              class="sv__session"
              title=${Oe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Oe}`}
              @click=${()=>Be(Oe)}
            >
              ⧉ ${Oe.slice(0,8)}
            </button>`:""}
        ${b.resume_command?l`<button
              type="button"
              class="sv__resume-cmd"
              title=${b.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${b.resume_command}`}
              @click=${()=>Be(b.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${ne?l`<span class="sv__meta">${ne}</span>`:""}
        ${b.worktree?l`<span class="sv__wt" title=${b.worktree}
              >${b.worktree}</span
            >`:""}
        ${a||d?"":l`<button
              type="button"
              class="sv__prompt-toggle${Y?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${Y?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${F}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${v?" sv__follow--on":""}"
          aria-pressed=${v?"true":"false"}
          aria-label=${Ne}
          @click=${qe}
        >
          <span class="sv__follow-full">⇣ ${Ne}</span>
          <span class="sv__follow-short">⇣ ${v?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ft()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":oe()}
      <div class="sv__body">
        ${Q.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:he(Q).map(Je=>Je.kind==="subagent"?je(Je):Je.kind==="group"?ke(Je):K(Je.idx,Je.line))}
      </div>
      ${Fe||st?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Fe?l`<span class="sv__now-icon">${Fe.icon}</span>
                  <span class="sv__now-name">${Fe.tool}</span>
                  <span class="sv__now-detail"
                    >${Fe.tool==="Bash"?vs(Fe.command):Fe.path||Fe.command||""}</span
                  >`:""}
            ${st?l`<span class="sv__now-think"
                  >💭 ${vs(st.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ke(Q){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ge(Q.idx)}
    >
      <span class="sv__group-icon">${Q.lines[0].line.icon}</span>
      <span class="sv__group-name">${Q.tool}</span>
      <span class="sv__group-count">${Q.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function je(Q){let ne=x.has(Q.idx),Oe=Q.header?Q.header.line:null,Ne=Oe?Oe.is_error===!0?"\u2717":typeof Oe.result=="string"?"\u2713":"\u27F3":"",Ce=Oe&&Oe.command?Oe.command:"";return l`<div class="sv__sub${ne?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ge(Q.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Q.agent_type||"subagent"}</span>
        ${Ce?l`<span class="sv__sub-detail">${Ce}</span>`:""}
        <span class="sv__sub-count">${Q.lines.length}줄</span>
        ${Ne?l`<span class="sv__sub-state">${Ne}</span>`:""}
        ${ne?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${ne?l`<div class="sv__sub-body">
            ${$e(Q.lines).map(Ie=>Ie.kind==="group"?ke(Ie):K(Ie.idx,Ie.line))}
          </div>`:""}
    </div>`}function ge(Q){x.add(Q),We()}function We(){Xe(pe(),e),X(),v&&D()}function D(){let Q=e.querySelector(".sv__body");Q&&(Q.scrollTop=Q.scrollHeight)}function ue(Q){h.has(Q)?h.delete(Q):h.add(Q),We()}function qe(){v=!v,We()}function Be(Q){fn(Q).then(ne=>{ne?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Me(Q){!o||!Q||(b={...b,...Q},We())}function Ke(Q){let ne=Q.target;if(!ne||!ne.classList||!ne.classList.contains("sv__body"))return;!(ne.scrollHeight-ne.scrollTop-ne.clientHeight<=4)&&v&&(v=!1,We())}e.addEventListener("scroll",Ke,!0);function Ve(Q){let ne=Q.target;!ne||typeof ne.closest!="function"||e.contains(ne)||ne.closest("dialog")||ne.closest(".md-viewer-root")||ft()}let Qe=!1;function it(){Qe||(document.addEventListener("mousedown",Ve),Qe=!0)}function pt(){Qe&&(document.removeEventListener("mousedown",Ve),Qe=!1)}function kt(Q){let ne=Q&&Q.attempt_id;if(!ne)return;let Oe=typeof Q.launch_id=="string"&&Q.launch_id.length>0?Q.launch_id:null,Ne=Q.session_ref&&typeof Q.session_ref=="object"?Q.session_ref:null;if(Oe&&Ne)return;let Ce=c;o=ne,a=Oe,i=Ne,c=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Ce&&Ce!==c&&Promise.resolve(n("unsubscribe-session-log",{id:Ce})).catch(()=>{}),u=typeof Q.root_dir=="string"&&Q.root_dir.length>0?Q.root_dir:null,b=Q.meta||{},d=Q.hide_prompt===!0,v=!0,h.clear(),x.clear(),W(),!M&&r&&(M=r.subscribe(We)),n&&Promise.resolve(n("subscribe-session-log",{id:c,attempt_id:o,...a?{launch_id:a}:{},...i?{session_ref:i}:{},...u?{root_dir:u}:{}})).catch(()=>{}),it(),We()}function ft(){let Q=c;pt(),o=null,a=null,i=null,c=null,u=null,d=!1,h.clear(),x.clear(),W(),ve(),n&&Q&&Promise.resolve(n("unsubscribe-session-log",{id:Q})).catch(()=>{}),Xe(l``,e),s&&s()}return{open:kt,updateMeta:Me,close:ft,isOpen(){return o!==null},destroy(){ve(),pt(),M&&(M(),M=null),e.removeEventListener("scroll",Ke,!0),o=null,a=null,i=null,c=null,u=null,d=!1,Xe(l``,e)}}}function Io(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Si(t.spec_id),s=Si(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Si(e){return typeof e=="string"?e.trim():""}function Nu(e){let t=Io(e);if(t.path)return t;let n=Si(Eg(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Eg(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function Tg(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Cg(e){let t=e&&e.metadata||{},n=Nu(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Tg(t)?null:"plan_pending"}),r}function qu(e,t){let n=Cg(e);return l`
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
  `}var Rg="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Og=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Lg=/^\*\*결론\*\* — (.+)$/;function Po(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Rg)return null;let n=Og.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Lg.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Fu=20;function ju(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Ig(e){return e.length>Fu?`${e.slice(0,Fu)}\u2026`:e}function Pg(e,t,n,r){let s=`${t.lane} ${Ig(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${ju(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?l`<div class="detail-report__body">
          ${Xn(t.body)}
        </div>`:""}
  </div>`}function Dg(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${ju(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Xn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Bu(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=Po(typeof c.text=="string"?c.text:"");return u?Pg(c,u,t,s.has(c.id)):Dg(c)})}
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
  `}var{I:kk}=nc;var Uu=e=>e.strings===void 0;var Mg={},Wu=(e,t=Mg)=>e._$AH=t;var br=xo(class extends Fr{constructor(e){if(super(e),e.type!==Un.PROPERTY&&e.type!==Un.ATTRIBUTE&&e.type!==Un.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Uu(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===bn||t===Ft)return t;let n=e.element,r=e.name;if(e.type===Un.PROPERTY){if(t===n[r])return bn}else if(e.type===Un.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return bn}else if(e.type===Un.ATTRIBUTE&&n.getAttribute(r)===t+"")return bn;return Wu(e),t}});var Do=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ti=[...Do.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Hn=["orchestration_model","orchestration_effort","orchestration_speed"],Mo=[...Do,...Hn],Ng=Ti.filter(e=>Mo.includes(e)),zu=["delegated","main"],No=["inherit","claude","codex"],ws=["default","fast"],ks=["standard","fast_track"],$s=["codex","opus","fable","self","skip"],qo=["codex","fable","skip"],Fo=["low","medium","high","xhigh"],mn="auto";function _n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Hu(e){if(!_n(e)||!_n(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))_n(r)&&_n(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Ur(e,t){let n=Hu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[mn,...r.flatMap(([,s])=>s)]}function Gu(e,t,n,r){if(!_n(e)||!_n(e.runners))return[mn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!_n(a)||!_n(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(n&&n!==mn&&i!==n)continue;let u=r(a,c);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[mn,...s]}function Wr(e,t,n){return Gu(e,t,n,(r,s)=>_n(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ci(e,t,n){return Gu(e,t,n,(r,s)=>_n(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:_n(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function xs(e,t){let n=Hu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Ku(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Ur(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Wr(t,s,r.impl_model||mn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var qg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ei=[...Ng,...Hn],Fg=[...Mo,...Ti].filter((e,t,n)=>n.indexOf(e)===t&&!Ei.includes(e));function Vu(e,t){let n=_n(e)?e:{},r=_n(t)?t:{},s=[];for(let a of Ei){let i=n[a]??null,c=r[a]??null;i!==c&&s.push({key:a,label:qg[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...Fg,...Object.keys(r)])!Ei.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Ri(e,t,n,r,s,o){return bo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Yu(e,t){let n={};for(let r of Ti){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Zu(e,t){let n={};for(let r of Hn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Oi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Hn]}],Qn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},jo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Li(e,t,n,r,s,o=null){let a=ln({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Xu(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of Li(e,t,n,r,s,o))a[i.source]+=1;return a}function Qu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Ju(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Ik=[...Do,...Hn];var jg=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Ii={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},ed={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Bg={pin:"pin",global:"global",base:"base"};function Ug(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${Bg[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Wg(e,t,n){switch(e){case"workflow_mode":return ks;case"spec_review_model":case"impl_review_model":return $s;case"plan_review_model":return qo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Fo;case"impl_dispatch":return zu;case"impl_runtime":return No;case"impl_model":return Ur(n,t.impl_runtime);case"impl_effort":return Wr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return ws;case"orchestration_model":return xs(n,null);case"orchestration_effort":return Wr(n,void 0,t.orchestration_model||mn).filter(r=>r!==mn);default:return[]}}function zg(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${Ug(e.source)}
    <span class="detail-effective__k"
      >${Qn[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${jo[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Qn[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function td(e,t){let n=Oi.flatMap(c=>c.keys),r=Li(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Xu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(c=>[c.key,c])),a=Object.fromEntries(r.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=r.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return l`<details
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
        >${Hg(o)}</span
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
          ${Oi.map(c=>l`
              <div class="detail-effective__subhead">${c.label}</div>
              ${r.filter(u=>c.keys.includes(u.key)).map(u=>{let d=bo({key:u.key,choices:Wg(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return zg(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
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
  </details>`}function Hg(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Gg(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function nd(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=Gg(n.exec_receipt),c=i?qn(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=mo(n.planned_execution,n.exec_receipt),b=n.chips?.pr?.number,v=typeof b=="number"?`PR #${b}`:"PR";return l`<section class="detail-summary" data-seam="detail-summary">
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
            >${v}</a
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
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Kg(s).map(h=>Vg(h,t,r,{label:h.id==="pr"?v:h.label,href:h.id==="pr"?o:""}))}
    </div>
  </section>`}function Kg(e){let n=typeof e=="string"&&Object.hasOwn(Ii,e)&&Ii[e]||Ii.spec_backed;return jg.filter(r=>n.includes(r.id))}var Bo={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Vg(e,t,n,r){let s=Yg(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,c=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",b=u?Bo.stale:i?Bo.on:c?Bo.current:Bo.none,v=Zg(e,n),h=`${r.label} \xB7 ${b}${v?` \xB7 ${v}`:""}${s?` \xB7 ${s}`:""}`,x=`detail-summary__gate${i?" detail-summary__gate--on":""}${c?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,M=l`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?l`<a
      class=${x}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${h}
      >${M}</a
    >`:l`<span
    class=${x}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${h}
    >${M}</span
  >`}function Yg(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Zg(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(ed,n)?ed[n]:""}function Uo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function rd(e){return Uo(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function sd(e,t){let n=e&&e[t];if(!Uo(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(rd),s=rd(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function id(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Wo(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${id(e)}${t}`}function zr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${id(e)}`}function Xg(e,t,n){if(n!==null){let s=e==="claude"?Wo:zr,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:zr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function od(e,t){if(!Uo(e)||e.state!=="usable"||!Uo(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function ad(e){let t=e.provider_key==="claude"?Wo:zr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Xg(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function ld({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${ad({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:sd(t,"claude"),selected:s,workspace_default:od(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${ad({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:sd(t,"codex"),selected:o,workspace_default:od(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var cd=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function As(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function zo(e){if(!As(e)||!As(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>As(n)&&As(n.models));return t.length>0?t:null}function En(e,t){let n=zo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function ud(e,t){return As(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function dd(e,t){let n=zo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return ud(r,r.models[t]);return[]}function Qg(e){let t=zo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of ud(r,s))n.includes(o)||n.push(o);return n}function Jg(e,t){if(!t)return Qg(e);let r=zo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of dd(e,o))s.includes(a)||s.push(a);return s}function pd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=En(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?dd(t,r.impl_model):Jg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function eb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function tb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Ho(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function u(M){M.key==="Escape"&&s&&(M.preventDefault(),h())}document.addEventListener("keydown",u);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${eb(s)}</span
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
                        >`}${Xn(a)}`}
          </div>
        </div>
      </div>
    `:l``}function b(){Xe(d(),e)}async function v(M,U={}){s=M,o="loading",a="",i=null,c="",b();let Y=U.workspace||(n?n():"");if(!Y){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",b();return}if(!r){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",b();return}let ae="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(M);try{let G=await r(ae),j=await G.json().catch(()=>({}));if(!G.ok||!j||j.ok!==!0){if(j?.error==="not_found"&&U.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",b();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(j&&j.error||G.status)+")",b();return}let q=tb(String(j.content||""));i=q.front,a=q.body,o="ready",b()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",b()}}function h(){s=null,Xe(l``,e)}function x(){document.removeEventListener("keydown",u),h()}return{open:v,close:h,destroy:x}}var nb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],md="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Go=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],rb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function fd(e){return typeof e=="string"&&rb.has(e)}var sb=["running","done","failed","interrupted"],ob={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function ab(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function ib(e){let t=Vt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=qr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${md}
          >부분 집계</span
        >`:""}`}function _d(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Mi(e){if(typeof e=="number")return Ss(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ss(t):""}function lb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function cb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Pi(e){return e===null||typeof e=="string"&&e.trim().length>0}function Di(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function ub(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Go.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Pi(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Pi(t.effort))||!(!("agent_type"in t)||Pi(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!sb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Di(t.started_at)||!Di(t.last_event_at)||!Di(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function db(e,t,n){let s=Vt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Mi(n.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${Mi(n.completed_at)}</span
        >`:""}
    ${s?l`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function pb(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Vt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Ss(e.last_event_at):s?Mi(s.completed_at):"",c=(e.provider==="claude"?["Claude",e.agent_type,lb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=cb(e,s);return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${ob[e.status]}</span
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
  </button>`}function fb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function _b(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let b=ub(d);!b||s.has(b.launch_id)||fd(b.agent_type)||(s.add(b.launch_id),r.push(b))}r.sort((d,b)=>(d.started_at||0)-(b.started_at||0));let a={};for(let{role:d,provider:b}of Go){let v=t?t.roles[d]?.[b]:null;a[d]=v?[...v.legs]:[]}let i=Go.flatMap(({role:d})=>a[d]),c=new Set,u=[];for(let{role:d,provider:b}of Go){for(let v of r.filter(h=>h.role===d&&h.provider===b)){let h=i.find(x=>x.receipt_id===v.launch_id)||null;h&&!fb(v,h)||(h&&c.add(h.receipt_id),u.push(pb(v,h,e.attempt_id,n)))}for(let v of a[d])!c.has(v.receipt_id)&&!fd(v.agent_type)&&u.push(db(d,b,v))}return u}function mb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...nb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${r.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${ab(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${md}</span>`:""}
  </div>`}var gb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ss(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function bb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var hb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function yb(e,t){let n=hb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return l`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Ya(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${is(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Ss(e.last_event_at)}</span>
    </button>
    ${e.resume_command?l`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function gd(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],a=[...o.filter(h=>h&&h.current===!0),...o.filter(h=>h&&h.current!==!0).sort((h,x)=>x.index-h.index)],i=a.map(h=>yb(h,t)),c=n.expanded||new Set;if(s.length===0&&a.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let h of s)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&u.add(h.resumed_from);let d=h=>{if(!(h.status==="failed"||h.status==="orphaned"))return"";let M=typeof h.session_id=="string"&&h.session_id.length>0,U=u.has(h.attempt_id),Y=M&&!U,ae=M?U?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${h.attempt_id}
      ?disabled=${!Y}
      title=${ae}
      @click=${G=>{G.stopPropagation(),Y&&t.onResume&&t.onResume(h.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},b=h=>{if(!(h.status==="failed"||h.status==="orphaned")||typeof h.cause!="string"||h.cause==="")return"";let M=h.cause_detail,U=M&&typeof M.reason=="string"&&M.reason.length>0?typeof M.command=="string"&&M.command.length>0?`${M.reason} \xB7 ${M.command}`:M.reason:h.cause;return l`<div class="detail-session__cause" title=${U}>
      ${h.cause}
    </div>`},v=h=>{let x=_d(Ja(h));if(Vt(x).length===0&&!qr(h.usage))return"";let M=c.has(h.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${h.attempt_id}
      aria-expanded=${M?"true":"false"}
      title=${M?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${U=>{U.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(h.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${ib(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${i}${s.map(h=>{let x=Ja(h),M=_d(x),U=Vt(M);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${h.status||"unknown"}"
            data-attempt-id=${h.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(h.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${gb[h.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${h.attempt_id}</span>
            ${os(h)?l`<span
                  class="detail-session__resumed"
                  title=${os(h)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${_r(h)}</span>
            ${U.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${h.session_id?l`<span class="detail-session__sid" title=${h.session_id}
                  >${String(h.session_id).slice(0,8)}</span
                >`:""}
            ${U.length>0?U.map(Y=>l`<span
                      class="detail-session__usage"
                      title=${Y.tooltip}
                      >${Y.label}</span
                    >`):qr(h.usage)?l`<span class="detail-session__usage"
                    >${qr(h.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ss(h.started_at)}</span>
          </button>
          ${v(h)} ${d(h)} ${b(h)} ${bb(h)}
          ${c.has(h.attempt_id)&&h.usage?mb(h.usage,h.runner==="codex"?"codex":"claude"):""}
          ${_b(h,x,t)}
        </div>`})}
    </div>
  `}function bd(e,t={}){return l`
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
          ${vb(e)}
        </div>`:""}
  `}function vb(e){let t=jr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?zn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Lo(n.recorded_at);return l`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?zn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?zn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var wb=["open","in_progress","deferred","resolved","closed"],kb=[0,1,2,3,4];function hd(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,d=null,b={},v="",h=!1,x=[],M=!1,U={},Y={claude:null,codex:null},ae=null,G=null,j=0,q=!1,W=!1,S="",F="",oe="";function Te(){q=!1,W=!1,S="",F="",oe=""}function ye(){Y={claude:null,codex:null},ae=null,G=null,j+=1}async function z(){if(!s)return null;try{let y=await Promise.resolve(s("get-workspace-accounts",{}));return y&&typeof y.state=="string"?y:null}catch{return null}}async function X(y){try{let O=await fetch(y);if(!O.ok)return null;let C=await O.json();if(!C||typeof C!="object"||!Array.isArray(C.accounts))return null;let we=C.accounts.filter(nt=>nt!==null&&typeof nt=="object"&&!Array.isArray(nt));return{accounts:we,active:we.find(nt=>nt.active===!0)||null}}catch{return null}}async function ve(y){G=y;let O=++j,[C,we,nt]=await Promise.all([X("/api/claude-usage"),X("/api/codex-usage"),z()]);O!==j||y!==u||(Y={claude:C,codex:we},ae=nt,H())}let $e=[],he=null,ie=null,Se=!1,be="",K=!1,re=0,pe=new Set;function ke(){$e=[],he=null,ie=null,Se=!1,be="",K=!1,re+=1,pe.clear()}async function je(y){if(!s)return;let O=++re;try{let C=await Promise.resolve(s("get-comments",{id:y}));if(O!==re||y!==u)return;$e=Array.isArray(C)?C:[],Se=!1}catch{if(O!==re||y!==u)return;Se=!0}H()}function ge(){if(!s||!u)return;let y=d&&typeof d.comment_count=="number"?d.comment_count:null;if(he!==u){he=u,ie=y,je(u);return}y!==null&&y!==ie&&(ie=y,je(u))}function We(y){pe.has(y)?pe.delete(y):pe.add(y),H()}function D(y){let O=be.trim().length===0;be=y,O!==(y.trim().length===0)&&H()}async function ue(){let y=be.trim();if(!s||!u||y.length===0||K)return;let O=u;K=!0,H();let C=!1;try{let we=await Promise.resolve(s("add-comment",{id:O,text:y}));Array.isArray(we)&&we.length>0&&(C=!0,O===u&&($e=we,Se=!1,be="",ie=we.length))}catch{C=!1}C||ce("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),O===u&&(K=!1),H()}let qe={onToggle:We,onDraftInput:D,onSubmit:ue},Be=t.mdViewer||null,Me=null;Be||(Me=document.createElement("div"),Me.className="md-viewer-root",document.body.appendChild(Me));let Ke=Be||Ho(Me,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ve=document.createElement("div");Ve.className="session-log-root",document.body.appendChild(Ve);let Qe=Br(Ve,{transport:s?(y,O)=>Promise.resolve(s(y,O)):void 0,sessionLogStore:c}),it=!1,pt=!1,kt=!1,ft=null,Q=null,ne=0;function Oe(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function Ne(){it=!1,pt=!1,kt=!1,ft=null,Q=null,ne+=1}async function Ce(y){if(!s)return;let O=++ne;pt=!0,kt=!1,H();try{let C=await Promise.resolve(s("get-bead-prompt",{bead_id:y}));if(O!==ne)return;!C||typeof C!="object"||Array.isArray(C)?kt=!0:(ft=C,Q=Oe(y))}catch{O===ne&&(kt=!0)}finally{O===ne&&(pt=!1,H())}}let Ie=[],Fe=null,st=0;function et(y,O){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}::${O}`}function Je(){Ie=[],Fe=null,st+=1}async function bt(y,O){if(!s)return;let C=++st,we;try{we=await Promise.resolve(s("get-session-refs",{bead_id:y}))}catch{we=null}C!==st||O!==Fe||(Ie=we&&Array.isArray(we.sessions)?we.sessions:[],H())}function It(){if(!s||!u)return;let y=d&&d.metadata,O=y&&typeof y=="object"&&typeof y.session_ref=="string"?y.session_ref:null;if(O===null){Je();return}let C=et(u,O);Fe!==C&&(Ie=[],Fe=C,bt(u,C))}function _t(){if(it=!it,it&&u&&Q!==Oe(u)){ft=null,Ce(u);return}H()}function Mt(){if(!a||!u)return[];let y=a.get();return(y&&y.attempts?Object.values(y.attempts):[]).filter(C=>C&&C.bead_id===u).sort((C,we)=>(we.started_at||0)-(C.started_at||0)).map(C=>({attempt_id:C.attempt_id,bead_id:C.bead_id,status:C.status,started_at:typeof C.started_at=="number"?C.started_at:null,runner:C.runner||null,model:C.model||null,effort:C.effort||C.observed_effort||null,speed:C.speed||null,session_id:C.session_id||null,resumed_from:C.resumed_from||null,continuation_mode:C.continuation_mode||null,dismissed_at:typeof C.dismissed_at=="number"?C.dismissed_at:null,cause:typeof C.cause=="string"?C.cause:null,cause_detail:C.cause_detail||null,exec_default_preset_id:typeof C.exec_default_preset_id=="string"?C.exec_default_preset_id:null,exec_default_preset_revision:typeof C.exec_default_preset_revision=="number"?C.exec_default_preset_revision:null,exec_values:C.exec_values&&typeof C.exec_values=="object"?C.exec_values:null,usage:C.usage||null,usage_legs:Array.isArray(C.usage_legs)?C.usage_legs:[],delegation_sessions:Array.isArray(C.delegation_sessions)?C.delegation_sessions:[]}))}function ht(){if(!a||!u)return null;let y=a.get();return hn(y&&y.attempts||{},u)}let He=new Set;function Pe(y){He.has(y)?He.delete(y):He.add(y),H()}function P(y){let O=a?a.get():null,C=O&&O.attempts?O.attempts[y]:null;Qe.open({attempt_id:y,meta:C?{runner:C.runner||void 0,model:C.model||void 0,effort:C.effort||void 0,status:C.status||void 0,session_id:C.session_id||void 0}:{}})}function Z(y,O){let C=a?a.get():null,we=C&&C.attempts?C.attempts[y]:null,Ye=(we&&Array.isArray(we.delegation_sessions)?we.delegation_sessions:[]).find(at=>at&&typeof at=="object"&&at.launch_id===O);Ye&&Qe.open({attempt_id:y,launch_id:O,meta:{runner:Ye.provider==="claude"?"claude":"codex",role:Ye.role,...typeof Ye.agent_type=="string"?{agent_type:Ye.agent_type}:{},model:Ye.model,effort:Ye.effort,session_id:Ye.session_id,status:Ye.status}})}async function _e(y){if(!s||!y)return;let O=await Mr();if(O===null)return;let C=()=>{let at=a?a.get():null;return at&&typeof at.revision=="number"?at.revision:0},we=async(at={},Ze=C())=>await s("worker-attempt-resume",{attempt_id:y,expected_revision:Ze,...O!==""?{instructions:O}:{},...at}),nt=at=>{at?.queue&&a?.set&&a.set(at.queue)},Ye=await we();if(nt(Ye),Ye&&Ye.conflict){let at=Ye.queue&&typeof Ye.queue.revision=="number"?Ye.queue.revision:C();Ye=await we({},at),nt(Ye)}Ye=await Fn(Ye,(at,Ze)=>we({continuation:at,decision_token:Ze}),{onResult:nt,refresh:()=>we()}),Ye&&Ye.resumed===!1&&!Ye.conflict&&Ye.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ye.reason}`,"error",2400)}function T(y){!y||!u||Qe.open(ho(y,u,d&&d.status))}let V={onOpen:P,onOpenDelegation:Z,onResume:_e,onToggleUsage:Pe,onOpenSessionRef:T,onCopyResumeCommand:Ut};function fe(){let y=a?a.get():null,O={...U};for(let C of["orchestration_model","orchestration_effort","orchestration_speed"]){let we=y&&y[C];typeof we=="string"&&(O[C]=we)}return O}async function m(){if(s){try{let y=await Promise.resolve(s("get-session-defaults",{}));U=y&&y.values&&typeof y.values=="object"?y.values:{}}catch{U={}}H()}}function w(){let y=a?a.get():null;return y&&y.runner_catalog||null}function I(){let y=a?a.get():null;return y&&typeof y.execution_defaults=="object"?y.execution_defaults:null}function ee(){let y=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},C=ln({pin:{...y,...b},global:fe(),execution_defaults:I(),runner_catalog:w(),route:typeof y.route=="string"?y.route:null}).orchestration_model.value||"";return En(w(),C)}function J(){let y=i?i.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function me(y){return y?.compatible===!1}function Re(y){i&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&i.set({revision:y.revision,presets:y.presets})}async function xe(){let y=J(),O=y?.presets.find(C=>C.id===v);if(!(!s||!u||!y||!O||me(O)||h)){h=!0,x=[],H();try{let C=await Promise.resolve(s("apply-impl-preset",Ju(u,O.id,y.revision)));if(C&&C.conflict){Re(C),ce("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let we=C&&Array.isArray(C.issue)?C.issue[0]:C?.issue;if(C&&C.applied&&we&&typeof we=="object"){d=we,x=Array.isArray(C.skipped_orchestration_keys)?C.skipped_orchestration_keys.filter(nt=>typeof nt=="string"):[];for(let nt of cd)delete b[nt];ce(x.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}C&&C.error==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(C){C&&typeof C=="object"&&C.code==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{h=!1,H()}}}let ot=null;n&&n.subscribe&&(ot=n.subscribe(()=>wt()));let dt=null;a&&typeof a.subscribe=="function"&&(dt=a.subscribe(()=>{u&&H()}));let Ae=null;i&&typeof i.subscribe=="function"&&(Ae=i.subscribe(()=>{u&&H()}));function Nt(y){y.key==="Escape"&&u&&(y.preventDefault(),r())}document.addEventListener("keydown",Nt);function wt(){if(u){if(n&&typeof n.snapshotFor=="function"){let y=n.snapshotFor("detail:"+u)||[];d=y.find(C=>C&&C.id===u)||y[0]||d}ge(),It(),H()}}function Ut(y){fn(y).then(O=>{O?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Zt(y){y.preventDefault(),y.stopPropagation(),u&&Ut(u)}function Ht(y,O){y.preventDefault(),y.stopPropagation(),Ut(O)}function Wt(y,O,C){y.preventDefault(),y.stopPropagation(),Ke.open(O,{missing_state:C})}function un(y,O){b[y]=O,H(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Qu(u,y,O.length===0?null:O))).catch(()=>{ce("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Ct(y,O){let C=d||{},we=C.metadata&&typeof C.metadata=="object"?C.metadata:{},nt={};for(let Ze of["impl_runtime","impl_model","impl_effort"])nt[Ze]=Object.hasOwn(b,Ze)?b[Ze]:typeof we[Ze]=="string"?we[Ze]:"";nt[y]=O;let Ye=pd(nt,w(),ee()),at={};for(let Ze of["impl_runtime","impl_model","impl_effort"])at[Ze]=b[Ze],b[Ze]=Ye[Ze]||"";H(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Ye,orchestration_runtime:ee()})).then(Ze=>{let qt=Array.isArray(Ze)?Ze[0]:Ze;if(!qt||typeof qt!="object"||!qt.id)throw new Error("implementation target readback failed");d=qt;for(let sn of["impl_runtime","impl_model","impl_effort"])delete b[sn];H()}).catch(()=>{for(let Ze of["impl_runtime","impl_model","impl_effort"])at[Ze]===void 0?delete b[Ze]:b[Ze]=at[Ze];H(),ce("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Rt(y,O,C){if(!s||!u)return!1;try{let we=await Promise.resolve(s(y,O)),nt=Array.isArray(we)?we[0]:we;return nt&&typeof nt=="object"&&nt.id?(d=nt,!0):(ce(C,"error"),!1)}catch{return ce(C,"error"),!1}}function Ge(y){setTimeout(()=>{try{let O=e.querySelector(y);O&&typeof O.focus=="function"&&O.focus()}catch{}},0)}function dn(){q=!0,S=d&&d.title||"",H(),Ge('.detail-edit__input[data-edit="title"]')}function tn(y){S=y.target.value}function rt(){q=!1,S="",H()}function Le(){Rt("edit-text",{id:u,field:"title",value:S},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(O=>{O&&(q=!1,S=""),H()})}function R(){W=!0,F=d&&d.description||"",H(),Ge('.detail-edit__textarea[data-edit="description"]')}function de(y){F=y.target.value}function Ee(){W=!1,F="",H()}function ct(){Rt("edit-text",{id:u,field:"description",value:F},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(O=>{O&&(W=!1,F=""),H()})}function $t(y,O,C,we){if(y.key==="Escape"){y.stopPropagation(),C();return}y.key==="Enter"&&(!we||y.ctrlKey||y.metaKey)&&(y.preventDefault(),O())}function gt(y){let O=y.target.value;Rt("update-status",{id:u,status:O},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>H())}function Dt(y){let O=Number(y.target.value);Rt("update-priority",{id:u,priority:O},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>H())}function jt(y){oe=y.target.value}function Gt(){let y=oe.trim();y.length!==0&&Rt("label-add",{id:u,label:y},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(O=>{O&&(oe=""),H()})}function nn(y){if(y.key==="Escape"){y.stopPropagation(),oe="",H();return}y.key==="Enter"&&(y.preventDefault(),Gt())}function St(y){Rt("label-remove",{id:u,label:y},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>H())}let rn={onCopyPath:Ht,onOpenDoc:Wt};function gn(y){return typeof y=="string"?y:y&&typeof y=="object"?String(y.id||y.to||y.issue_id||y.depends_on||""):""}function Pn(y){switch(y&&typeof y=="object"?String(y.dependency_type||y.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function E(y){let C=(Array.isArray(y.dependencies)?y.dependencies:[]).map(we=>({id:gn(we),icon:Pn(we)})).filter(we=>we.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${C.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${C.map(we=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(we.id)}
                  >
                    ${we.icon?`${we.icon} `:""}${we.id}
                  </button>`:l`<span class="detail-dep"
                    >${we.icon?`${we.icon} `:""}${we.id}</span
                  >`)}
          </div>`}
    `}function L(y){let O=y.metadata||{},C=y.workflow||{},we=C.stages||{},nt=we.spec&&we.spec.stale,Ye=we.impl&&we.impl.stale,at=C.quick_fix_review?.state==="stale",Ze=we.plan||null,qt=C.route_source==="derived",sn=C.route||O.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${qt?" detail-kv__v--derived":""}"
          title=${qt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${qt?"unset":sn}</span
        >
      </div>
      ${C.route!=="quick_fix"||Object.hasOwn(O,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${O.spec_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${C.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ze?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ze?.approval_receipt||"\uC5C6\uC74C"}${Ze?.approval_state==="stale"?" \xB7 stale":Ze?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${C.route!=="quick_fix"||Object.hasOwn(O,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${O.impl_review||"\uC5C6\uC74C"}${Ye?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${C.resolver?l`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${C.resolver.attempt} \xB7 ${C.resolver.prior_sha} \u2192 ${C.resolver.sha}`}
              >${`${C.resolver.prior_sha.slice(0,7)} \u2192 ${C.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${C.route==="quick_fix"||Object.hasOwn(O,"quick_fix_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${O.quick_fix_review||"\uC5C6\uC74C"}${at?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${C.planned_execution?l`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${C.planned_execution.kind}</span>
            </div>
            ${C.planned_execution.kind==="main"?l`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${C.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${C.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${qn(C.exec_receipt)}</span
            >
          </div>`:""}
      ${C.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${C.impl_entry.actor}@${C.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${O.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${O.pr_url}</span>
          </div>`:""}
    `}let De={route:["quick_fix","spec_backed","full_plan"]};async function f(y,O){let C=O.target.value;if(y==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&C!=="full_plan"&&!window.confirm(`full_plan \u2192 ${C||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){H();return}await Rt("update-workflow-meta",{id:u,key:y,value:C},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),H()}function $(y){let O=y.metadata||{};return l` ${((we,nt)=>{let Ye=De[we],at=typeof O[we]=="string"?O[we]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${we}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${we}
          data-edit=${`wfmeta-${we}`}
          @change=${Ze=>f(we,Ze)}
        >
          <option value="" ?selected=${!Ye.includes(at)}>
            ${nt}
          </option>
          ${Ye.map(Ze=>l`<option value=${Ze} ?selected=${at===Ze}>${Ze}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function N(y,O){return q?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${S}
            @input=${tn}
            @keydown=${C=>$t(C,Le,rt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Le}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${rt}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${y}</h2>
        ${Vt(O).map(C=>l`<span class="detail-usage-total" title=${C.tooltip}
              >${C.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${dn}
        >
          ✎
        </button>
      </div>
    `}function se(y){let O=Kt(y.created_at),C=Kt(y.updated_at);return!O&&!C?l``:l`
      ${O?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${O}</span>
          </div>`:""}
      ${C?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${C}</span>
          </div>`:""}
    `}function p(y,O){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${gt}
        >
          ${wb.map(C=>l`<option value=${C} ?selected=${C===y}>${C}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Dt}
        >
          ${kb.map(C=>l`<option value=${String(C)} ?selected=${C===O}>
                P${C}
              </option>`)}
        </select>
      </div>
    `}function _(y){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${W?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${R}
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
              .value=${F}
              @input=${de}
              @keydown=${O=>$t(O,ct,Ee,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ct}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ee}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${y||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function k(y){let O=typeof y.notes=="string"?y.notes:"";return O.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${O}</div>
    `}function A(y){let O=Array.isArray(y.labels)?y.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${O.map(C=>l`<span class="detail-label-chip"
              >${C}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${C}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+C}
                @click=${()=>St(C)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${oe}
            @input=${jt}
            @keydown=${nn}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Gt}
          >
            추가
          </button>
        </span>
      </div>
    `}function te(){if(!u)return l``;let y=d||{},O=String(y.id||u),C=y.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",we=ht(),nt=y.status||"open",Ye=typeof y.priority=="number"?Math.max(0,Math.min(4,y.priority)):"",at=y.description||"",Ze={...y,metadata:{...y.metadata||{},...b}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Zt}
            >
              ${O}
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
          ${N(C,we)}
          ${nd(Ze)}
          ${td({metadata:Ze.metadata,workspace_values:fe(),catalog:w(),execution_defaults:I(),expanded:M,presets:J()?.presets||[],preset_id:v,preset_busy:h,skipped_orchestration_keys:x},{onToggle:qt=>{M=qt,H()},onEdit:(qt,sn)=>{if(qt==="impl_runtime"||qt==="impl_model"||qt==="impl_effort"){Ct(qt,sn??"");return}un(qt,sn??"")},onPresetSelect:qt=>{v=qt,x=[],H()},onPresetApply:()=>{xe()}})}
          ${ld({md:Ze.metadata,catalog:Y,workspace_defaults:ae,handlers:{onExecChange:un}})}
          ${p(nt,Ye)} ${se(y)}
          ${_(at)}
          ${Bu($e,qe,{expanded:pe,draft:be,sending:K,error:Se})}
          ${k(y)} ${A(y)} ${E(y)}
          ${L(y)} ${$(y)}
          ${qu(y,rn)}
          ${bd({expanded:it,loading:pt,error:kt,data:ft},{onToggle:_t})}
          ${gd(Mt(),V,{total:we,expanded:He},Ie)}
        </div>
      </div>
    `}function H(){Xe(te(),e)}return{load(y){y!==u&&(b={},v="",x=[],M=!1,Te(),ke(),Ne(),Je(),ye()),u=y,d=null,wt(),m(),G!==y&&ve(y)},clear(){u=null,d=null,b={},v="",h=!1,x=[],M=!1,Te(),ke(),Ne(),Je(),ye(),Ke.close(),Qe.close(),Xe(l``,e)},destroy(){ot&&(ot(),ot=null),dt&&(dt(),dt=null),Ae&&(Ae(),Ae=null),document.removeEventListener("keydown",Nt),Be||(Ke.destroy(),Me&&Me.parentNode&&Me.parentNode.removeChild(Me)),Qe.destroy(),Ve.parentNode&&Ve.parentNode.removeChild(Ve),u=null,d=null,ye(),v="",h=!1,x=[],ke(),Ne(),Je(),Xe(l``,e)}}}function yd(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,d,b="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let v=typeof b=="string"?b.trim():"";if(s&&(v.length>0?(s.textContent=v,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Ko(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Ts(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function Vo(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function Yo(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function Zo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function $b(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:Ko(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function vd(e,t){let n=$b(e,t);return n?l`<button
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
            title=${n.deploy.at?Kt(n.deploy.at):""}
            >${Zo(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Ts(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Hr(e){let t=an(e.created_at),n=an(e.updated_at);return!t&&!n?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${Kt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?l`<span>·</span>`:""}${n?l`<span title=${`\uC218\uC815 ${Kt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function xb(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Cs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Xo(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Tn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(b=>b&&b.bead_id===t&&b.phase!=="done").sort((b,v)=>(b.requested_at||0)-(v.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?xb(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:d}}function Es(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return l`<div
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
  </div>`}var Ab={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function wd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Ab[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Qo(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Sb(e){return l`<div
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
  </div>`}function Jo(e,t={}){if(!e)return"";let n=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.overlaps)?e.overlaps:[],s=e.scope_missing===!0&&t.lane!=="running",o=e.popover||null,a=e.cross_lane||null;return n.length===0&&r.length===0&&!s&&!a?"":l`<div class="worker-deps">
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
        >`:""}${o?Sb(o):""}
  </div>`}function ea(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?l`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Eb(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return l`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function kd(e){return e?l`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function ta(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return l`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Tb(e){let t=Array.isArray(e.badges)?e.badges:[],n=Vt(e.usage),r=jn(e.usage),s=an(e.done_at);return l`<div
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
            title=${`\uC644\uB8CC ${Kt(e.done_at)}`}
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
              >`):r?l`<span class="worker-usage" title=${ls(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?l`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${Ts(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Jn(e){if(e.lane==="done"&&e.done_layout==="three_line")return Tb(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Vt(e.usage),s=jn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?an(e.done_at):"",u=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",b=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",v=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",h=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,x=e.lane==="done"?"":ea(e.workflow),M=e.lane==="done"?"":kd(e.from_id),U=ta(e.priority),Y=l`<span class="worker-mini__title">${e.title}</span>`,ae=e.pr_url&&e.pr_number?l`<a
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
        >`:"",j=n.map(pe=>pe===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${pe}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${pe===e.completion_badge&&e.completion_title||""}
          >${pe}</span
        >`),q=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",W=r.length>0?r.map(pe=>l`<span class="worker-usage" title=${pe.tooltip}
              >${pe.label}</span
            >`):s?l`<span class="worker-usage" title=${ls(e.usage)}
            >${s}</span
          >`:"",S=o?l`<span
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
      </button>`:"",oe=e.cancel_action?l`<button
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
      </button>`:"",ye=e.discard,z=ye?.action||e.discard_action?l`<button
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
        </button>`:"",X=e.stale_work||null,ve=X?l`${X.can_resume||X.can_continue?l`<button
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
          </button>`:""}`:"",$e=X?l`<div class="worker-mini__stale">
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
        </button>`:"",ie=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Se=v||x||M||ie||W?l`<div class="worker-chips">
          ${v}${x}${M}${ie?Qo(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${W}
        </div>`:"",be=Jo(e.dependency_chips,{lane:e.lane}),K=Es(e),re=!!(o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ye?.operation||e.revise_action||X);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">
            ${v}${h}${U}${M}${Y}
          </div>
          <div class="worker-mini__row2">
            ${W}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Kt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Ts(e.work_ms)}</span
                >`:""}${j}${S}
            <span class="worker-mini__actions"
              >${F}${oe}${Te}${z}</span
            >
            ${Hr(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${u}${d}${h}${U}${ae}${G}${j}${b}${q}
            </div>
            <div class="worker-mini__body">${Y}${$e}</div>
            ${be}${Se}${re?l`<div class="worker-mini__foot">
                  ${S}
                  <span class="worker-mini__actions"
                    >${F}${oe}${Te}${z}${he}${ve}</span
                  >
                  ${Es(e)}
                </div>`:""}
            ${Hr(e)}`:l`<div class="worker-mini__line">
              ${u}${d}${h}${U}${Y}${ae}${G}${j}${b}${q}${S}${F}${oe}${Te}${z}
            </div>
            ${be}${Se}${K} ${Hr(e)}`}
  </div>`}function Cb(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(l`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(l`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?l`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return l`${r}`}var Rb={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50"};function Ni(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.session_preferred===!0,i=Rb[e.session_preferred_reason||""]||"",c=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),b=Jo(e.dependency_chips,{lane:e.lane}),v=e.workspace_name?l`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",h=ea(c),x=kd(e.from_id),M=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return l`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?l`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${ta(e.priority)}
      ${r?l`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:a?l`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${i}
              >세션 권장</span
            >`:""}${Eb(c)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${c?fo(c,e.status,{onOpenDoc:n.onOpenDoc}):""}${b}
    ${v||h||x||M?l`<div class="worker-chips">
          ${v}${h}${x}${Qo(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason||n.dep_action===!0?"":" worker-card__foot--actions-only"}"
    >
      ${o?l`<div class="worker-card__place-menu">
            ${Cb(t.lanes,e.id)}
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
                  class="worker-card__reason${d?" worker-card__reason--danger":""}"
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
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":u?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
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
    ${Hr(e)}
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?Ni(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Jn(r))}
          </div>`}
  </section>`}var $d={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},xd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Ad(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function qi(e){for(let t of Ad(e))if(Object.hasOwn($d,t))return $d[t];return null}function Fi(e){let t=null;for(let n of Ad(e))Object.hasOwn(xd,n)&&(t=xd[n]);return t}function na(e){let t=qi(e),n=Fi(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Sd(e,t){let n=qi(e)??qi(t),r=Fi(t)??Fi(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Ed=160;function Ob(e){return e.length>Ed?`${e.slice(0,Ed)}\u2026`:e}function Lb(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${Ob(e.command)}</code>`:""}
  </div>`}function Ib(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Pb(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Td(e){let t=e.failure?na(e.failure.reason):"";return l`<div class="worker-banners">
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
          ${Lb(e.failure.cause_detail)}
          ${Ib(e.failure.reason)}
          ${Es({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Db(e){return!e||!e.repo&&!e.serial_lane_id?"":l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Mb=new Set(["codex-runner"]);function Nb(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(h=>h&&!(typeof h.agent_type=="string"&&Mb.has(h.agent_type))),c=i.filter(h=>h&&h.state==="live"),u=i.filter(h=>h&&h.state!=="live"),d=r&&typeof r.last_event_at=="number"?an(r.last_event_at,t):"",b=r?an(r.updated_at,t):"",v=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:b?`\uAC31\uC2E0 ${b}`:"";return l`${o?l`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?l`<span class="rtile__activity-age"
              >${an(a,t)}</span
            >`:""}
      </div>`:v?l`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${v}</span>
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
      </div>`:""}`}var qb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Fb(e){if(!e)return"";let t=qb[e.locality]||"";return l`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function ji(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(X=>X&&X.current===!0)||null,a=e.failed===!0,i=!!e.paused,c=a?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):i?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Pb(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=os(e),b=Vt(e.usage),v=jn(e.usage),h=e.conflict_resolution?i?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,x=e.base_exception||null,M=e.landing,U=e.attempt_id&&e.attempt_id===n,Y=r.monitor||null,ae=Db(Y),G=Y?Jo(Y.dependency_chips,{lane:"running"}):"",j=Nb(Y,t,i,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),q=s&&e.workflow?.chips?.exec_receipt||null,W=ea(e.workflow),S=q?l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${qn(q)}`}
        >${`${q.kind}:${_o(q)}`}</span
      >`:"",F=o?l`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${is(o)}</span
      >`:"",oe=ae||W||F||S?l`<div class="rtile__meta">
          ${ae}${W}${F}${S}
        </div>`:"",Te=l`${h?l`<span class="worker-mini__badge">${h}</span>`:""}${x?l`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${x}</span
      >`:""}`,ye=s?"":Hr(e),z=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${U?" rtile--sel":""}${i?" rtile--paused":""}${a?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${ta(e.priority)}${d?l`<span class="rtile__resumed" title=${d}>↻</span>`:""}${Te}
      <div class="rtile__hd-actions">
        ${s?l`${typeof e.started_at=="number"?l`<span class="rtile__elapsed">${c}</span>`:""}${Fb(o)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:l`<span class="rtile__elapsed">${c}</span>`}
        ${s?"":a?l`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${e.resume_eligible===!1}
                  title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${z}
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
                ${i?l`<button
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
                ${z}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${j}${e.rollup?po(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Ga}):""}
    ${M?l`<div class="rtile__landing">
          <span
            class="merge-step${M.failed?" merge-step--failed":""}"
            style=${`--progress: ${M.percent}%`}
            >${M.label}${M.index>0?l`<span class="merge-step__n"
                  >${M.index}/${M.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${G}
    ${s?oe:ae||W||u||b.length>0||v?l`<div class="rtile__meta">
            ${ae}${W}${Qo(e.exec_chips)}
            ${b.length>0?b.map(X=>l`<span class="worker-usage" title=${X.tooltip}
                      >${X.label}</span
                    >`):v?l`<span
                    class="worker-usage"
                    title=${ls(e.usage)}
                    >${v}</span
                  >`:""}
          </div>`:""}
    ${Es(e)} ${ye}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${a||i?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Bi(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>ji(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var Ui=new Set(["unavailable","not_applicable"]);function er(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Cd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function tr(e,t){return t===null?null:`${Qn[e]}: ${t.display} (${jo[t.source]})`}function Wi(e){return e.filter(t=>t!==null).join(`
`)}function Rs(e){if(typeof e!="object"||e===null)return null;let t=_r(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Wi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Qn.orchestration_model,e.model),n(Qn.orchestration_effort,e.effort),n(Qn.orchestration_speed,e.speed)])}}function hr(e,t){let n=er(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=er(e,"orchestration_effort"),s=er(e,"orchestration_speed"),o=Cd([En(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Wi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",tr("orchestration_model",n),tr("orchestration_effort",r),tr("orchestration_speed",s)])}}function jb(e,t){return e===null||e.value===null||Ui.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Bb(e){return e===null||Ui.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Ub(e){return e===null?null:e.value==="auto"?"auto":Ui.has(e.resolution)?null:e.display}function nr(e,t){if(typeof e!="object"||e===null)return null;let n=er(e,"impl_dispatch"),r=er(e,"impl_runtime"),s=er(e,"impl_model"),o=er(e,"impl_effort"),a=er(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":Cd([jb(r,t??null),Bb(s),Ub(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Wi(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",tr("impl_dispatch",n),tr("impl_runtime",r),tr("impl_model",s),tr("impl_effort",o),tr("impl_speed",a)])}}var Yt="",Wb=["impl_runtime","impl_model","impl_effort"],zb=["claude_account","codex_account"],Hb=5,ra=1;function cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function sa(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(P=>ce(P,"error",4e3)),o={},a={},i=[],c=!1,u={state:"absent",values:{},warnings:[]},d={},b={},v=Promise.resolve(),h={claude:null,codex:null},x=!1,M=null,U={},Y="",ae="",G=!1,j=!1,q=!1,W=null,S=!1;function F(){let P=t.queue?t.queue():null;return cn(P)?P:null}function oe(){let P=F();return P?P.runner_catalog:null}function Te(){let P=F();return P&&cn(P.execution_defaults)?P.execution_defaults:null}function ye(){let P=t.implPresetStore?.get();return cn(P)&&Array.isArray(P.presets)?P:null}function z(){return r===null?{}:{root_dir:r}}async function X(P,Z){return S||!n?null:await n(P,Z)}function ve(P){P&&cn(P.queue)&&t.onQueueAdopt?.(P.queue)}async function $e(P,Z){let _e=F();if(!_e||S)return null;let T=await X(P,{...Z,...z(),expected_revision:_e.revision});if(ve(T),r!==null&&T&&T.conflict){let V=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:F()?.revision??_e.revision;T=await X(P,{...Z,...z(),expected_revision:V}),ve(T)}return T}async function he(){c=!0,Pe();try{let P=await X("get-session-defaults",{...z()});o=cn(P?.values)?{...P.values}:{},a={...o},i=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{c=!1,Pe()}}async function ie(){let P=Yu(o,a);if(Object.keys(P).length!==0){try{let Z=await X("set-session-defaults",{values:P,...z()});o=cn(Z?.values)?{...Z.values}:{},a={...o},i=Array.isArray(Z?.warnings)?Z.warnings:[]}catch(Z){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}Pe()}}function Se(P,Z){if(!cn(P))return;let _e=P.state;u={state:_e==="usable"||_e==="unusable"||_e==="absent"?_e:"absent",values:cn(P.values)?{...P.values}:{},warnings:Array.isArray(P.warnings)?P.warnings:[]},b={...u.values},Z&&(d={...b})}async function be(){try{Se(await X("get-workspace-accounts",{...z()}),!0)}catch(P){u={state:"unusable",values:{},warnings:["kv_read_failed"]},b={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}Pe()}async function K(P){try{let Z=await fetch(P);if(!Z.ok)return null;let _e=await Z.json();if(!cn(_e)||!Array.isArray(_e.accounts))return null;let T=_e.accounts.filter(V=>cn(V)&&typeof V.key=="string"&&V.key.length>0&&typeof V.email=="string"&&V.email.length>0);return{accounts:T,active:T.find(V=>V.active===!0)||null}}catch{return null}}async function re(){x=!0;let[P,Z]=await Promise.all([K("/api/claude-usage"),K("/api/codex-usage")]);S||(h={claude:P,codex:Z},Pe())}function pe(){let P={};for(let Z of zb){let _e=Object.hasOwn(d,Z)?d[Z]:null,T=Object.hasOwn(b,Z)?b[Z]:null;_e!==T&&(P[Z]=_e)}return P}async function ke(){let P=pe();if(Object.keys(P).length!==0){try{Se(await X("set-workspace-accounts",{values:P,...z()}),!1)}catch(Z){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}Pe()}}function je(P,Z){Z===Yt?delete d[P]:d[P]=Z,Pe(),v=v.then(()=>ke())}function ge(P,Z){if(Wb.includes(P)){ue(P,Z);return}Z===Yt?delete a[P]:a[P]=Z,Pe(),ie()}function We(){let P=ht().orchestration_model,Z=ln({global:{orchestration_model:P??void 0},execution_defaults:Te(),runner_catalog:oe()}).orchestration_model.value;return Z?En(oe(),Z):null}function D(P,Z){typeof Z=="string"&&Z.length>0?a[P]=Z:delete a[P]}function ue(P,Z){let _e=Z===Yt?void 0:Z,T=Ku({impl_runtime:P==="impl_runtime"?_e:a.impl_runtime,impl_model:P==="impl_model"?_e:a.impl_model,impl_effort:P==="impl_effort"?_e:a.impl_effort},oe(),We());D("impl_runtime",T.impl_runtime),D("impl_model",T.impl_model),D("impl_effort",T.impl_effort),Pe(),ie()}async function qe(){let P=F();if(!P)return;let Z={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},_e=Zu(Z,{...Z,...U});if(Object.keys(_e).length!==0){try{let T=await $e("worker-queue-set-orchestration-defaults",{values:_e});if(T&&T.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}U={}}catch(T){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}Pe()}}function Be(P,Z){U[P]=Z===Yt?null:Z,Pe(),qe()}function Me(P){if(M=P,!P){Pe();return}let Z=oe(),_e=ht(),T=_e.orchestration_model;T&&!xs(Z,P).includes(T)&&(U.orchestration_model=null,T=null);let V=_e.orchestration_effort;V&&!Ci(Z,P,T||mn).includes(V)&&(U.orchestration_effort=null),Pe(),qe()}async function Ke(P){if(!(!F()||P<ra)){try{await $e("worker-queue-set-slots",{slots:P})}catch(Z){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}Pe()}}async function Ve(P){if(!(!F()||P<ra||P>Hb)){try{await $e("worker-queue-set-serial-lane-count",{count:P})}catch(Z){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}Pe()}}async function Qe(P,Z){let _e=P==="auto_advance"?"worker-automation-toggle":P==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await $e(_e,{on:Z})}catch(T){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}Pe()}function it(){let P={},Z=ht();for(let _e of Mo){let T=Hn.includes(_e)?Z[_e]:a[_e];typeof T=="string"&&T.length>0&&(P[_e]=T)}return P}async function pt(){let P=ye();if(!P)return;let Z=it();if(Object.keys(Z).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let _e=(P.presets||[]).find(V=>V.id===Y),T=ae.trim()||(_e?_e.name:"");if(!T){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let V=_e?await X("impl-preset-update",{expected_revision:P.revision,id:_e.id,name:T,settings:Z}):await X("impl-preset-create",{expected_revision:P.revision,name:T,settings:Z});if(V&&V.applied){if(ae="",!_e&&Array.isArray(V.presets)){let fe=V.presets.find(m=>m.name===T);Y=fe?fe.id:Y}Pe()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Pe()}catch(V){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}}async function kt(){let P=ye();if(!(!P||Y.length===0))try{let Z=await X("impl-preset-delete",{expected_revision:P.revision,id:Y});Z&&Z.applied?(Y="",Pe()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Pe())}catch(Z){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}}function ft(P){o=cn(P.values)?{...P.values}:{},a={...o},i=Array.isArray(P.warnings)?P.warnings:[],cn(P.queue)&&(t.onQueueAdopt?.(P.queue),U={})}async function Q(){let P=ye(),Z=F();if(!P||!Z||Y.length===0)return;let _e=T=>({preset_id:Y,expected_revision:P.revision,expected_queue_revision:T,...z()});try{let T=await X("apply-impl-preset-global",_e(Z.revision));if(T&&T.applied&&ft(T),r!==null&&T&&T.queue_applied===!1){let V=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:F()?.revision??Z.revision;T=await X("apply-impl-preset-global",_e(V)),T&&T.applied&&ft(T)}T&&T.applied?T.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):T&&T.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(T){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}Pe()}async function ne(){j=!0,q=!1,Pe();try{let P=await X("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?q=!0:W=P}catch{q=!0}finally{j=!1,Pe()}}function Oe(){if(G=!G,G&&!W){ne();return}Pe()}function Ne(){let P=jr({loading:j,error:q});if(P)return P;if(!W)return"";let Z=Array.isArray(W.variants)?W.variants:[];return l`<div class="settings-dialog__sp-body">
      ${W.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${W.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Z.map(_e=>l`<div class="settings-dialog__sp-variant" data-variant=${_e.key}>
            <div class="settings-dialog__sp-cond">${_e.condition}</div>
            ${zn(_e.label,_e.system_prompt)}
          </div>`)}
    </div>`}function Ce(){return l`<section
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
        aria-expanded=${G?"true":"false"}
        @click=${Oe}
      >
        ${G?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${G?Ne():""}
    </section>`}function Ie(P,Z,_e,T,V,fe,m){let w=V[P]??Yt,I=Ri(P,_e,V,Te(),oe(),m),ee=I.options.find(me=>me.value===w),J=w===Yt?I.full_value:ee?.full_value;return l`<select
        class=${w===Yt?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${Z}
        title=${J||""}
        ?disabled=${fe===!0||I.disabled}
        .value=${br(String(w))}
        @change=${me=>T(P,String(me.target.value))}
      >
        <option value=${Yt} ?selected=${w===Yt}>
          ${I.unset_label}
        </option>
        ${I.options.map(me=>l`<option
              value=${me.value}
              title=${me.full_value||""}
              ?selected=${me.value===w}
            >
              ${me.label}
            </option>`)}
      </select>
      ${w===Yt?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Fe(P,Z,_e,T,V,fe=!1,m){return l`<div
      class=${`settings-dialog__row${fe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        ${Ie(P,Z,_e,T,V,fe,m)}
      </span>
    </div>`}function st(P,Z){let _e=Z?Z.active:null;return cn(_e)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${P==="claude"?_e.email:zr({..._e,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function et(P,Z,_e){let T=h[_e],V=Object.hasOwn(d,P)?d[P]:Yt,fe=_e==="claude"?Wo:zr,m=!!T?.accounts.some(w=>w.key===V);return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${Z}
          data-account-key=${P}
          @change=${w=>je(P,String(w.target.value))}
        >
          <option value=${Yt} ?selected=${V.length===0}>
            ${st(_e,T)}
          </option>
          ${V.length>0&&!m?l`<option value=${V} selected>
                ${V} (목록에 없음)
              </option>`:""}
          ${T?.accounts.map(w=>l`<option value=${w.key} ?selected=${w.key===V}>
                ${fe(w)}
              </option>`)||""}
        </select>
        ${T?"":l`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Je(){let P=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${P} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${P}`:null}function bt(P,Z,_e,T,V){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Z}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${Ie(_e,`${P} \uBAA8\uB378`,T,ge,a,!1)}
        ${Ie(V,`${P} effort`,Fo,ge,a,!1)}
      </span>
    </div>`}function It(P,Z,_e,T){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${T?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${T?"true":"false"}
          aria-label=${Z}
          @click=${()=>Qe(P,!T)}
        >
          ${T?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${_e}</span>
      </span>
    </div>`}function _t(P,Z,_e,T){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
          <button
            type="button"
            aria-label=${`${Z} \uAC10\uC18C`}
            @click=${()=>T(_e-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${_e}</span>
          <button
            type="button"
            aria-label=${`${Z} \uC99D\uAC00`}
            @click=${()=>T(_e+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Mt(P){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
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
    </div>`}function ht(){let P=F(),Z={};for(let _e of Hn)Z[_e]=Object.prototype.hasOwnProperty.call(U,_e)?U[_e]:P&&typeof P[_e]=="string"?P[_e]:null;return Z}function He(){let P=oe(),Z=a.impl_runtime,_e=a.impl_model,T=ye(),V=F(),fe=ht(),m=xs(P,M),w=Ur(P,void 0).filter(Ae=>Ae!==mn),I=Ci(P,M,fe.orchestration_model||mn).filter(Ae=>Ae!==mn),ee=Y?(T?.presets||[]).find(Ae=>Ae.id===Y):null,J=ee?Vu(it(),cn(ee.settings)?ee.settings:{}):null,me=V&&typeof V.slots=="number"?V.slots:ra+1,Re=V&&typeof V.serial_lane_count=="number"?V.serial_lane_count:ra,xe=Te()?.supported===!0,ot=Je(),dt=Ri("workflow_mode",ks,a,Te(),P);return l`
      ${i.length>0?l`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${ot?l`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${ot}
          </div>`:""}
      ${xe?"":l`<div
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
                @change=${Ae=>{Y=String(Ae.target.value),Pe()}}
              >
                <option value="" ?selected=${Y===""}>
                  실행 프리셋…
                </option>
                ${(T?.presets||[]).map(Ae=>l`<option
                      value=${Ae.id}
                      ?selected=${Ae.id===Y}
                    >
                      ${Ae.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!J||J.rows.length===0}
                @click=${Q}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Y?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${br(ae)}
                @input=${Ae=>{ae=String(Ae.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${Y?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${pt}
              >
                ${Y?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${Y.length===0}
                @click=${kt}
              >
                삭제
              </button>
            </div>
            ${J?Mt(J):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${br(M||Yt)}
                    @change=${Ae=>{let Nt=String(Ae.target.value);Me(Nt===Yt?null:Nt)}}
                  >
                    <option value=${Yt} ?selected=${!M}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${M==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${M==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Fe("orchestration_model","\uBAA8\uB378",m,Be,fe)}
              ${Fe("orchestration_effort","effort",I,Be,fe)}
              ${Fe("orchestration_speed","\uC18D\uB3C4",ws,Be,fe)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${et("claude_account","Claude","claude")}
              ${et("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Yt}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>ge("workflow_mode",Yt)}
                    >
                      ${dt.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${ks.map(Ae=>l`<button
                          type="button"
                          data-mode=${Ae}
                          aria-pressed=${String(a.workflow_mode===Ae)}
                          @click=${()=>ge("workflow_mode",Ae)}
                        >
                          ${Ae}
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
              ${bt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",$s,"spec_review_effort")}
              ${bt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",qo,"plan_review_effort")}
              ${bt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",$s,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Fe("impl_runtime","\uC704\uC784 \uB300\uC0C1",No,ge,a)}
              ${Fe("impl_model","\uBAA8\uB378",Ur(P,Z),ge,a)}
              ${Fe("impl_effort","effort",Wr(P,Z,_e),ge,a)}
              ${Fe("impl_speed","\uC18D\uB3C4",ws,ge,a)}
              ${Fe("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",w,ge,a,!1,{...a,...fe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${It("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",V?.auto_advance===!0)}
              ${It("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",V?.auto_merge===!0)}
              ${It("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",V?.auto_repair===!0)}
              ${_t("slots","\uB3D9\uC2DC \uC2E4\uD589",me,Ae=>Ke(Ae))}
              ${_t("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Re,Ae=>Ve(Ae))}
            </div>
            ${Ce()}
          `}
    `}function Pe(){S||Xe(He(),e)}return{load(){U={};let P=[he(),be()];return x||P.push(re()),Promise.all(P).then(()=>{})},render:Pe,sessionDraft:()=>({...a}),destroy(){S=!0,Xe(l``,e)}}}function oa(e){return l`<svg
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
  </svg>`}function Rd(){return oa(rs`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Od(){return oa(rs`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ld(){return oa(rs`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Id(){return oa(rs`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Pd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Dd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Vt(vo(t));let n={};for(let i of In)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let d of In){let b=c[d];typeof b=="number"&&Number.isFinite(b)&&(n[d]+=b,r=!0,u=!0)}if(u){o+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?jn(n):null}function Cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function zi(e,t){let n=Cn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Gb(e,t){if(!Cn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function Kb(e){if(!Cn(e)||!Cn(e.execution_defaults)||!Cn(e.runner_catalog)||!Cn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=ln({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=En(e.runner_catalog,n.orchestration_model.value??""),s=hr(n,e.runner_catalog),o=nr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Md(e,t){let n=t.notify||(K=>ce(K,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let u=null,d=null,b=null,v=new Map;function h(){let K=t.workspacesState?t.workspacesState():[];return Array.isArray(K)?K.filter(re=>Cn(re)):[]}function x(K){return h().find(re=>re.root_dir===K)||null}function M(K){return Gb(x(K),v.get(K))}function U(){for(let K of h()){let re=v.get(K.root_dir);re&&typeof re.revision=="number"&&typeof K.revision=="number"&&K.revision>=re.revision&&v.delete(K.root_dir)}}async function Y(K,re,pe){let ke=t.transport,je=M(re);if(!(!ke||!Cn(je))){try{let ge=await ke(K,{...pe,root_dir:re,expected_revision:je.revision});if(Cn(ge?.queue)&&v.set(re,ge.queue),ge&&ge.conflict){let We=Cn(ge.queue)&&typeof ge.queue.revision=="number"?ge.queue.revision:M(re)?.revision;ge=await ke(K,{...pe,root_dir:re,expected_revision:We}),Cn(ge?.queue)&&v.set(re,ge.queue)}}catch(ge){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ge instanceof Error?ge.message:String(ge)}`)}ie()}}function ae(K){u!==K&&(u=K,t.onFocusChange?.(u),ie())}function G(K){ae(u===K?null:K)}function j(K){if(d===K){W();return}q(),d=K;let re=x(K);a.textContent=`${re?.name||K} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,b=sa(c,{root_dir:K,queue:()=>M(K),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:pe=>{v.set(K,pe),ie()}}),b.load(),ie()}function q(){b?.destroy(),b=null}function W(K){q(),d=null,s.hidden=!0,a.textContent="",K!==!0&&ie()}let S=()=>W();i.addEventListener("click",S);function F(K){K.key==="Escape"&&u!==null&&ae(null)}document.addEventListener("keydown",F);function oe(K,re){let pe=Math.max(re,K,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${re}\uAC1C \uC911 ${K}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:pe},(ke,je)=>je<K?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function Te(K){let re=K.auto_advance===!0,pe=K.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${re?" is-on":""}`}
        data-act="auto"
        aria-pressed=${re?"true":"false"}
        aria-label=${`${K.name} \uC790\uB3D9\uD654`}
        title=${re?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${re?Od():Rd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${pe?" is-on":""}`}
        data-act="merge"
        aria-pressed=${pe?"true":"false"}
        aria-label=${`${K.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${pe?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Ld()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===K.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===K.root_dir?"true":"false"}
        aria-label=${`${K.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Id()}
      </button>`}function ye(K){let re=Kb(K);return re?l`<div class="mon2-deck__chips">
      ${re.orchestration?l`<span class="mon2-deck__chip" title=${re.orchestration.title}
            >오케 ${re.orchestration.text}</span
          >`:""}
      ${re.worker?l`<span class="mon2-deck__chip" title=${re.worker.title}
            >워커 ${re.worker.text}</span
          >`:""}
    </div>`:""}function z(K){let re=[];for(let[pe,ke]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let je=zi(K,pe);je>0&&re.push(`${ke} ${je}`)}return re.join(" \xB7 ")}function X(K){let re=zi(K,"running"),pe=typeof K.slots=="number"?K.slots:1;return l`<div
      class=${`mon2-deck__tile${u===K.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${K.root_dir}
      aria-pressed=${u===K.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${K.root_dir}>${K.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${pe}\uAC1C \uC911 ${re}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${re}/${pe}</span>
          ${oe(re,pe)}
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
        <span class="mon2-deck__counts">${z(K)}</span>
        ${ye(K)}
      </div>
    </div>`}function ve(K){let re=t.doneItems?t.doneItems():[],pe=t.rangeLabel?t.rangeLabel():"",ke=Dd(Array.isArray(re)?re:[]),je=ge=>K.reduce((We,D)=>We+zi(D,ge),0);return l`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${K.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${pe}`}
        >실행 ${je("running")} · 대기 ${je("queue")} · PR
        ${je("pr_wait")}${je("session_active")>0?` \xB7 \uC138\uC158 ${je("session_active")}`:""}
        · ${pe} 완료
        ${Array.isArray(re)?re.length:0}</span
      >
      ${ke===null?"":l`<span class="mon2-deck__total-tokens">
            ${typeof ke=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${Pd(pe)}
                  >${ke}</span
                >`:ke.map(ge=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${ge.provider}
                      title=${ge.tooltip}
                      >${ge.label}</span
                    >`)}
          </span>`}
    </div>`}function $e(){let K=h();return K.length===0?"":l`${ve(K)}
      <div class="mon2-deck__strip">
        ${K.map(re=>X(re))}
      </div>`}function he(){u!==null&&!x(u)&&(u=null,t.onFocusChange?.(null))}function ie(){U(),he(),d!==null&&!x(d)&&W(!0),Xe($e(),r),b?.render()}function Se(K){let re=K.target;if(!re||typeof re.closest!="function")return;let pe=re.closest("[data-root-dir]");if(!pe)return;let ke=pe.getAttribute("data-root-dir")||"",je=re.closest("[data-act]")?.getAttribute("data-act");if(je==="worker"){t.gotoWorkerTab?.(ke);return}if(je==="auto"){Y("worker-automation-toggle",ke,{on:M(ke)?.auto_advance!==!0});return}if(je==="merge"){Y("worker-merge-auto-toggle",ke,{on:M(ke)?.auto_merge!==!0});return}if(je==="gear"){j(ke);return}G(ke)}function be(K){if(K.key!=="Enter"&&K.key!==" ")return;let re=K.target;if(!re||typeof re.closest!="function")return;let pe=re.closest('[data-root-dir][role="button"]');!pe||pe!==re||(K.preventDefault(),G(pe.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Se),r.addEventListener("keydown",be),{render:ie,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",F),r.removeEventListener("click",Se),r.removeEventListener("keydown",be),i.removeEventListener("click",S),q(),Xe(l``,r),e.replaceChildren()}}}var Vb="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Yb="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Zb="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Os="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Hi(e,t){return`${e}\0${t}`}function Xb(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Qb(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Gi(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Jb(e,t){let n=new Set;for(let[a,i]of t)for(let c of i)n.add(Hi(a,c));let r=new Map,s=new Map;for(let a of e){let i=Hi(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Hi(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function eh(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function th(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function aa(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Nd(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function ia(e){let t=Qb(e.blocked_by_map),n=[],r={refusal:null},s=i=>{let c=e.owner_of.get(i);return typeof c!="string"||c.length===0?(r.refusal=Xb(i),null):c};return{graph:t,dep_ops:n,state:r,ownerOf:s,addDep:(i,c)=>{if(r.refusal!==null||i===c)return;let u=t.get(i)||[];if(u.includes(c))return;let d=s(i);if(d!==null){if(Gi(t,c,i)){r.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${i}\uAC00 \uC774\uBBF8 ${c}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(i,[...u,c]),n.push({type:"dep-add",a:i,b:c,root_dir:d})}},removeDep:(i,c)=>{if(r.refusal!==null||i===c)return;let u=t.get(i)||[];if(!u.includes(c))return;let d=s(i);d!==null&&(t.set(i,u.filter(b=>b!==c)),n.push({type:"dep-remove",a:i,b:c,root_dir:d}))}}}function la(e,t,n,r){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Jb(e.dep_ops,t.blocked_by_map),o=s.filter(i=>i.type==="dep-remove"),a=s.filter(i=>i.type==="dep-add");return{lane_ops:n,ops:[...o,...a,...r],lane_op_index:o.length}}function qd(e,t){for(let n=1;n<t.length;n+=1)e.addDep(t[n].bead_id,t[n-1].bead_id)}function Fd(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(aa(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function nh(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ki(e,t,n){let r=ia(n),s=[],o=[],a=n.owner_lane_of.get(e.bead_id),i=e.kind==="chain"?e.lane_id??a:void 0,c=i===void 0?void 0:n.cross_lanes.get(i);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Vb};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Yb};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Nd(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Os}}if(e.kind==="chain"&&c===void 0)return{refused:Os};let u=()=>{if(c===void 0||c.status!=="confirmed")return;let v=c.entries.map(U=>U.bead_id),h=new Set(v),x=(r.graph.get(e.bead_id)||[]).filter(U=>h.has(U)),M=v.filter(U=>(r.graph.get(U)||[]).includes(e.bead_id));for(let U of x)r.removeDep(e.bead_id,U);for(let U of M)r.removeDep(U,e.bead_id);for(let U of x)for(let Y of M)r.addDep(Y,U)},d=(v,h)=>{let x=n.cross_lanes.get(v),M=x.entries.findIndex(S=>S.bead_id===e.bead_id),U=x.entries.filter(S=>S.bead_id!==e.bead_id),Y=Math.max(0,Math.min(U.length,M>=0&&h>M?h-1:h)),ae=-1;if(U.forEach((S,F)=>{n.fixed_members.has(S.bead_id)&&(ae=F)}),Y<=ae){r.state.refusal=Zb;return}let G=M>=0?x.entries[M]:c?.entries.find(S=>S.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir},j=[...U.slice(0,Y),G,...U.slice(Y)];if(nh(j,x.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:v,entries:j}}),x.status!=="confirmed")return;let q=Y>0?U[Y-1].bead_id:null,W=Y<U.length?U[Y].bead_id:null;if(q===null){W!==null&&r.addDep(W,e.bead_id);return}r.addDep(e.bead_id,q),W!==null&&(r.graph.get(W)||[]).includes(q)&&(r.removeDep(W,q),r.addDep(W,e.bead_id))},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(u(),c!==void 0&&(t.kind!=="chain"||t.lane_id!==i)&&s.push({type:"monitor-lane-update",payload:{lane_id:i,entries:c.entries.filter(v=>v.bead_id!==e.bead_id)}})),t.kind==="chain"&&d(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let v=eh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(aa(e.bead_id,e.root_dir,v));else if(e.kind==="parallel"){let h=n.parallel_rows,x=h[Math.max(0,Math.min(h.length,t.marker_index))];if(!(!!x&&x.bead_id===e.bead_id)&&th(n,e.root_dir)&&b!==void 0){let U=b>v?v:v-1;U>=0&&U!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:U},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let v=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&v.status==="confirmed"&&o.push(aa(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let v=b>t.index?t.index:t.index-1;v>=0&&v!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:v},root_dir:e.root_dir})}}else o.push(aa(e.bead_id,e.root_dir,t.index,t.lane_id));return la(r,n,s,o)}function jd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Os};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=ia(t),s=[];return qd(r,n.entries),r.state.refusal===null&&Fd(r,t,n.entries,s),la(r,t,[{type:"monitor-lane-confirm",payload:{lane_id:e}}],s)}function Bd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Os};let r=ia(t),s=[];return qd(r,n.entries),r.state.refusal===null&&Fd(r,t,n.entries,s),la(r,t,[],s)}function Ud(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Os};let r=ia(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return la(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[])}function Vi(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Nd(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var rh="\uC0AC\uC774\uD074";function Wd(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=Gi(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:rh}:{}})}return o.sort((a,i)=>{let c=r!==void 0&&a.root_dir===r,u=r!==void 0&&i.root_dir===r;return c!==u?c?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function zd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var Hd={running:3,paused:2,failed:1};function Gr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Gd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Kd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Gr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Gr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),b=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=Hd[u.run_state],b=Hd[i];if(d>b||d===b&&(u.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:r}}function ca(e){return e.replace(/\/+$/,"")}function sh(e,t){let n=ca(e),r=ca(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ua(e,t){let n=new Set;for(let r of e)for(let s of t){if(!sh(r,s))continue;let o=ca(r),a=ca(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var Vd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ls=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function da(e,t){let n=Vd.find(s=>s.step===e);if(!n)return null;let r=Vd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Yd(e){let t=Ls.findIndex(n=>n.step===e);return Ls.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function yr(e){let t=Ls.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function oh(e){let t=Ls.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ls.length}}function pa(e){let t=oh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Zi=new Set(["queued","running","retry_pending","repairing"]),Zd=new Set(["failed","succeeded"]),ah={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Is={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},ih={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Is.base_containment,child_sweep:Is.child_sweep,branch_cleanup:Is.branch_cleanup,parent_close:Is.parent_close};function lh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function ch(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Zi,...Zd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function uh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function Yi(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=ah[s];if(!o)return null;let a=da(n,`${r} ${o}`);return a?{...a,active:Zi.has(s),failed:s==="failed"}:null}function dh(e){return!e||typeof e!="object"?null:ih[e.step]||null}function Ps(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=dh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=lh(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(x=>x&&typeof x=="object"&&ch(x,t,i)).sort(uh):[],u=a?c:[],d=u.find(x=>Zi.has(x.state));if(d)return Yi(d);if(s)return s.step==="repo_operations"&&c[0]?Yi(c[0],!0):null;let b=u.find(x=>Zd.has(x.state)?x.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(b)return Yi(b);if(r){let x=da(r.step,r.label);return x?{...x,active:!0,failed:!1}:null}let v=typeof e.cleanup_cursor=="string"?Is[e.cleanup_cursor]:null;if(!v)return null;let h=da(v.step,v.label);return h?{...h,active:!0,failed:!1}:null}function fa(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function Xi(e,t){return`${e}\0${t}`}function Xd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Qi(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function _a(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Qd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${_a(s)})`,location_label:_a(s),scope:null,same_lane_ahead:!1};let a=Qi(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1}}function Jd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Xi(i.root_dir,c.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(u,[]);for(let d of Array.isArray(c.items)?c.items:[])r.set(d.id,u)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Xi(i.root_dir,c.id),d=Array.isArray(c.items)?c.items[0]:null,v=!!d&&d.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],h=s.get(u);if(h)for(let x of v){let M=r.get(x);M&&M!==u&&!h.includes(M)&&h.push(M)}}let o=(i,c)=>{let u=new Set,d=[i];for(;d.length>0;){let b=d.pop();if(b===c)return!0;!b||u.has(b)||(u.add(b),d.push(...s.get(b)||[]))}return!1},a=new Map;for(let[i,c]of s){let u=[];for(let d of c){let b=n.get(d);o(d,i)&&b&&u.push(b)}u.length>0&&a.set(i,u)}return a}function ep(e,t){return Xi(e,t)}var tp=1,Ds=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],el=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Kr={show_blocked:!0,spec:"all"},np={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function ph(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Gr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function fh(e,t){let{winners:n,resumed_from_ids:r}=Kd(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,c=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:hn(e,i.bead_id),can_pause:c==="running"&&d,can_resume:c!=="running"&&d&&!r.has(i.attempt_id)})}return s}function rp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Tt(e){return e&&typeof e=="object"?e:{}}function _h(e,t,n){let r=Tt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=v=>ln({pin:v,global:a,execution_defaults:s,runner_catalog:o,route:n}),c,u;try{c=i(r),u=i(null)}catch{return null}let d=sp(hr(c,o),hr(u,o)),b=sp(nr(c,null),nr(u,null));return d||b?{orchestration:d,worker:b}:null}function sp(e,t){return!e||t&&t.text===e.text?null:e}function mh(e,t){let n=co(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function gh(e,t){let n=Qi(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function op(e,t,n){let r=t.get(e);if(!r)return gh(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return _a(r)}function bh(e,t,n,r,s,o){let a=[];return e.forEach((i,c)=>{let u=typeof i.id=="string"?i.id:"";if(u.length===0)return;let d=i.status==="confirmed"?"confirmed":"draft",b=Array.isArray(i.entries)?i.entries:[],v=[];b.forEach((h,x)=>{let M=h&&typeof h.bead_id=="string"?h.bead_id:"";if(M.length===0)return;let U=h&&typeof h.root_dir=="string"?h.root_dir:"",Y=n.get(M),ae=Y?Y.state:void 0,G=ae==="running"||ae==="pr_wait"||ae==="done",j=!Y||ae==="runnable",q=Y&&Y.lane==="parallel"&&typeof Y.position=="number"?Y.position-1:null,W=v.length>0?v[v.length-1].id:null,S=d==="confirmed"&&W!==null&&!(t.get(M)||[]).includes(W);v.push({id:M,title:s.get(M)||M,root_dir:Y?Y.root_dir:U,workspace_name:Y?Y.workspace_name:o.get(U)||"",seq:x+1,location_label:op(M,n,r),draggable:!G,fixed:G,done:ae==="done",unplaced:j,mismatch:S,...q!==null?{queue_index:q}:{}})}),v.forEach((h,x)=>{h.seq=x+1}),a.push({lane_id:u,status:d,draft:d==="draft",number:c+1,label:`\uC5F0\uACB0 ${c+1} \xB7 \uB808\uD3EC \uAC04`,rows:v,all_done:v.length>0&&v.every(h=>h.done),can_confirm:d==="draft"&&v.length>=2,has_mismatch:d==="confirmed"&&v.some(h=>h.mismatch||h.unplaced)})}),a}function hh(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function yh(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:c,state:u}=hh(i,t,n);if(u!==void 0&&(i.scope_state=u),c.length===0)continue;let d=o.get(i.root_dir);d?d.push({item:i,scope:c}):o.set(i.root_dir,[{item:i,scope:c}])}let a=(i,c,u)=>{let d={id:c.id,title:c.title,location_label:op(c.id,r,s),prefixes:u};i.overlap_chips?i.overlap_chips.push(d):i.overlap_chips=[d]};for(let i of o.values())for(let c=0;c<i.length;c+=1)for(let u=c+1;u<i.length;u+=1){let d=ua(i[c].scope,i[u].scope);d.length!==0&&(a(i[c].item,i[u].item,d),a(i[u].item,i[c].item,d))}}function Ji(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ma(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function tl(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...Kr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,c=n&&Ds.some(D=>D.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let D of s)D&&typeof D.root_dir=="string"&&u.set(D.root_dir,D);let d=new Map;for(let D of s)D&&typeof D.root_dir=="string"&&d.set(D.root_dir,D.name||D.root_dir);for(let D of r)D&&typeof D.root_dir=="string"&&d.set(D.root_dir,D.name||D.root_dir);let b=[],v=[],h=[],x=[],M=[],U=[],Y=new Map,ae=new Map,G=new Map,j=new Map,q=new Map,W=new Map,S=new Map,F=new Map;for(let D of r){if(!D||typeof D.root_dir!="string")continue;let ue=D.root_dir,qe=D.name||ue,Be=u.get(ue),Me=Be&&typeof Be.revision=="number"?Be.revision:typeof D.revision=="number"?D.revision:0,Ke=Tt(D.attempts),Ve=Tt(D.bead_titles);for(let[m,w]of Object.entries(Ve))typeof w=="string"&&w.length>0&&F.set(m,w);let Qe=Tt(D.bead_times),it=Tt(D.pr_observations),pt=Tt(D.admission),kt=Tt(D.revise_parked),ft=Tt(D.merge_queue_state),Q=Tt(D.cleanup_failed),ne=Tt(D.discard_operations),Oe=Tt(D.bead_blocked_by);Object.hasOwn(D,"bead_scope")&&W.set(ue,Tt(D.bead_scope));let Ne=Tt(D.bead_workflow),Ce=Tt(D.pr_activity),Ie=Array.isArray(D.repo_operations)?D.repo_operations:[],Fe=Array.isArray(D.merge_queue)?D.merge_queue:[],st=new Set(Fe.filter(m=>m&&typeof m.bead_id=="string").map(m=>m.bead_id)),et=new Map(Fe.filter(m=>m&&typeof m.bead_id=="string").map(m=>[m.bead_id,m])),Je=Array.isArray(D.queue)?D.queue:[],bt=(Array.isArray(D.serial_lanes)?D.serial_lanes:[]).filter(m=>m&&/^s[1-5]$/.test(m.id)&&Array.isArray(m.entries)),It=Tt(D.lane_states),_t=typeof D.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(D.serial_lane_count))):Math.min(5,bt.length);G.set(ue,_t),j.set(ue,Je.length);let Mt=new Map(bt.map(m=>[m.id,m])),ht=new Map;for(let m of bt)for(let w of m.entries)w&&typeof w.bead_id=="string"&&ht.set(w.bead_id,m.id);for(let[m,w]of Object.entries(Oe))Array.isArray(w)&&q.set(m,w.filter(I=>typeof I=="string"&&I.length>0));let He=Array.isArray(D.done)?D.done:[];for(let m of He)m&&typeof m.bead_id=="string"&&U.push({id:m.bead_id,root_dir:ue,workspace_name:qe});let Pe=new Map;for(let m of He)m&&typeof m.bead_id=="string"&&typeof m.added_at=="number"&&Pe.set(m.bead_id,m.added_at);let P=m=>({id:m,title:Ve[m]||m,root_dir:ue,workspace_name:qe,expected_revision:Me,draggable:!1,...Tt(Qe[m]).created_at?{created_at:Tt(Qe[m]).created_at}:{},...Tt(Qe[m]).updated_at?{updated_at:Tt(Qe[m]).updated_at}:{}}),Z=new Set;for(let[m,w]of fh(Ke,Pe))Z.add(m),v.push({...P(m),lane:"running",...ht.has(m)?{serial_lane_id:ht.get(m)}:{},attempt_id:w.attempt_id,run_state:w.run_state,status:w.status||void 0,workflow:Ne[m]||null,can_pause:w.can_pause,can_resume:w.can_resume,started_at:w.started_at,last_event_at:w.last_event_at,last_activity:w.last_activity,legs:w.legs,runner:w.runner,model:w.model,effort:w.effort,speed:w.speed,resumed_from:w.resumed_from,continuation_mode:w.continuation_mode,usage:w.usage,exec_chips:{orchestration:Rs(w),worker:null},discard:Tn(ne,m,{attempt_id:w.attempt_id}),badges:w.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:w.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:w.run_state==="failed"});for(let[m,w]of Gd(Ke)){if(v.some(J=>J.id===m))continue;let I=w.attempt,ee=w.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";v.push({...P(m),lane:"running",kind:"session",attempt_id:typeof I.attempt_id=="string"?I.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:Ne[m]||null,can_pause:!1,can_resume:!1,started_at:w.started_at,last_event_at:typeof I.last_event_at=="number"?I.last_event_at:null,last_activity:I.last_activity&&typeof I.last_activity=="object"?I.last_activity:null,legs:Array.isArray(I.legs)?I.legs:[],runner:typeof I.runner=="string"?I.runner:null,model:typeof I.model=="string"?I.model:null,effort:typeof I.effort=="string"?I.effort:null,speed:typeof I.speed=="string"?I.speed:null,resumed_from:null,continuation_mode:null,usage:I.usage&&typeof I.usage=="object"?I.usage:null,exec_chips:{orchestration:Rs(I),worker:null},discard:Tn(ne,m,{merge_queued:!0}),badges:[w.origin==="auto"?`${ee} \xB7 \uC790\uB3D9`:ee],alert:!1})}for(let m of Array.isArray(D.session_active)?D.session_active:[]){let w=m&&m.bead_id;typeof w!="string"||Z.has(w)||(Z.add(w),Array.isArray(m.blocked_by)&&m.blocked_by.length>0&&q.set(w,m.blocked_by.filter(I=>typeof I=="string"&&I.length>0)),typeof m.title=="string"&&m.title.length>0&&F.set(w,m.title),v.push({...P(w),title:m.title||Ve[w]||w,lane:"running",kind:"session",status:"in_progress",started_at:Ji(m.started_at)??Ji(m.updated_at)??void 0,updated_at:Ji(m.updated_at)??void 0,workflow:m.workflow||null,labels:Array.isArray(m.labels)?m.labels:[],spec_id:typeof m.spec_id=="string"?m.spec_id:"",blocked:m.blocked===!0,...Array.isArray(m.blocked_by)?{blocked_by:m.blocked_by.filter(I=>typeof I=="string"&&I.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(m.session_refs)?m.session_refs:[],badges:[],alert:!1}))}for(let m of Array.isArray(D.pr_wait)?D.pr_wait:[]){let w=m&&m.bead_id;if(typeof w!="string"||Z.has(w))continue;Z.add(w);let I=Tt(it[w]),ee=Tt(I.pr),J=I.gate?Tt(I.gate):null,me=st.has(w),Re=et.get(w)?.continuation_action||null,xe=!!Re&&Re.continuation===null,ot=ft.active===w,dt=m.external===!0,Ae=Q[w]||null,Nt=Tt(Ce[w]),wt=Ps({bead_id:w,merge_sha:m.merge_sha,cleanup_cursor:m.cleanup_cursor,merge_progress:Nt.merge_progress||null,cleanup_failed:Ae,repo_operations:Ie}),Ut=fa(wt),Zt=!!J&&J.base_badge==="\uCDA9\uB3CC",Ht=!!Ae&&["child_sweep","branch_cleanup","parent_close"].includes(Ae.step)&&!!J&&J.tier==="merged",Wt=dt&&!!Ae&&!!J&&J.tier==="merged",un=!!J&&["closed_unmerged","review","undecidable"].includes(J.tier)&&J.reason!=="review_receipt_undetermined",Ct=Tn(ne,w,{external:dt,merge_active:ot||wt?.step==="merge",merge_queued:me,cleanup_active:Ut,merged:!!Ae||J?.tier==="merged"}),Rt=!!Ct.operation;h.push({...P(w),lane:"pr_wait",workflow:Ne[w]||null,pr_number:typeof ee.number=="number"?ee.number:null,pr_url:typeof ee.url=="string"?ee.url:void 0,external:dt,usage:hn(Ke,w),merge_step:wt,badges:xe?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:wt?[J?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Ae?[yr(Ae.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${yr(Ae.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof J?.gate_badge=="string"&&J.gate_badge.length>0?[J.gate_badge]:[],alert:wt?wt.failed===!0:!!Ae||un,reason:Ae&&wt?.active!==!0?pa(Ae.step):"PR \uB300\uAE30",merge_action:J?.tier==="merged"&&!Ht&&!Wt?!1:!me||xe,merge_enabled:!Rt&&(xe||J?.enabled===!0||Zt||Ht||Wt),merge_label:xe?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Wt||Ht?"\uC815\uB9AC \uC7AC\uAC1C":Zt&&!Ht?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:xe?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Rt?Ct.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ct.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ct.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Wt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ht?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Zt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":J?.enabled===!0?`\uBA38\uC9C0 (${J.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${J?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:me&&!xe,cancel_enabled:!ot,continuation_mismatch:Re?.mismatch||null,discard:Ct,discard_action:Ct.action,discard_enabled:Ct.enabled,discard_title:Ct.title})}let _e=(m,w,I,ee)=>{let J=m&&m.bead_id;if(typeof J!="string"||Z.has(J))return null;Z.add(J);let me=kt[J],Re=Tn(ne,J),xe=Re.operation?Re:null,ot={...P(J),lane:w,workflow:Ne[J]||null,draggable:!xe,discard:xe||void 0,reason:rp(pt,J),seq:I+1,queue_position:I+1,queue_index:I,queue_length:ee,badges:me?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!me,revise_action:!!me,revise_enabled:!!me&&!xe,revise_title:me?me.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${me.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Oe,J)&&(ot.blocked_by=Array.isArray(Oe[J])?Oe[J].filter(dt=>typeof dt=="string"&&dt.length>0):[]),ot};for(let m=0;m<Je.length;m++){let w=_e(Je[m],"queue",m,Je.length);if(!w)continue;x.push(w);let I=Y.get(ue);I?I.push(w):Y.set(ue,[w])}let T=m=>{let w=h.find(J=>J.id===m&&J.root_dir===ue);if(w)return{id:m,title:w.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let I=v.find(J=>J.id===m&&J.root_dir===ue),ee=I&&I.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":I&&I.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:m,title:I?I.title:P(m).title,badge:ee}},V=[];for(let m=0;m<Math.max(_t,bt.length);m++){let w=`s${m+1}`,I=Mt.get(w),ee=I&&Array.isArray(I.entries)?I.entries:[],J=[];for(let xe=0;xe<ee.length;xe++){let ot=_e(ee[xe],w,xe,ee.length);ot&&(J.push(ot),x.push(ot))}let me=Tt(It[w]),Re=Array.isArray(me.occupied_by)?me.occupied_by.filter(xe=>typeof xe=="string"):[];J.length===0&&Re.length===0&&(_t<=1||m>=_t)||V.push({id:w,index:m,items:J,raw_length:ee.length,occupied_by:Re,occupants:Re.map(xe=>T(xe)),corrections:Array.isArray(me.corrections)?me.corrections.length:0,cycle:me.cycle===!0,...J.length===0&&Re.length===0?{empty:!0}:{}})}ae.set(ue,V);let fe=Array.from({length:_t},(m,w)=>{let I=`s${w+1}`,ee=Mt.get(I),J=ee&&Array.isArray(ee.entries)?ee.entries:[],me=Tt(It[I]);return{id:I,index:J.length,length:J.length,occupied_by:Array.isArray(me.occupied_by)?me.occupied_by.filter(Re=>typeof Re=="string"):[]}});for(let m of Array.isArray(D.runnable)?D.runnable:[]){let w=m&&m.bead_id;if(typeof w!="string"||Z.has(w))continue;Z.add(w);let I=m.workflow&&typeof m.workflow=="object"?m.workflow:null,ee=I&&typeof I.route=="string"&&I.route||(typeof m.route=="string"?m.route:null),J=_h(Tt(Be),m.exec_pins,ee);Array.isArray(m.blocked_by)&&m.blocked_by.length>0&&q.set(w,m.blocked_by.filter(me=>typeof me=="string"&&me.length>0)),typeof m.title=="string"&&m.title.length>0&&F.set(w,m.title),Array.isArray(m.scope)&&S.set(w,m.scope.filter(me=>typeof me=="string"&&me.length>0)),b.push({...P(w),title:m.title||Ve[w]||w,lane:"runnable",draggable:!0,reason:rp(pt,w),created_at:m.created_at??void 0,updated_at:m.updated_at??void 0,status:typeof m.status=="string"?m.status:void 0,labels:Array.isArray(m.labels)?m.labels:[],spec_id:typeof m.spec_id=="string"?m.spec_id:"",workflow:I||(ee?{route:ee,chips:{route:ee}}:null),...J?{exec_chips:J}:{},blocked:m.blocked===!0,...Array.isArray(m.blocked_by)?{blocked_by:m.blocked_by.filter(me=>typeof me=="string"&&me.length>0)}:{},place_index:Je.length,place_lanes:fe})}for(let m of He){let w=m&&m.bead_id;if(typeof w!="string"||Z.has(w)||(Z.add(w),o!==void 0&&typeof m.added_at=="number"&&m.added_at<o))continue;let I=ph(Ke,w),ee=I&&typeof I.done_kind=="string"?I.done_kind:null;M.push({...P(w),lane:"done",done:!0,done_layout:"three_line",usage:hn(Ke,w),work_ms:Yo(Ke,w),done_at:typeof m.added_at=="number"?m.added_at:void 0,done_kind:ee,badges:[...ee&&np[ee]?[np[ee]]:[],...Vo(Ke,w)]})}}let oe=new Map;s.forEach((D,ue)=>{D&&typeof D.root_dir=="string"&&oe.set(D.root_dir,ue)});let Te=n&&n.running_sort==="repo"?"repo":"started";v.sort((D,ue)=>{let qe=D.kind==="session",Be=ue.kind==="session";if(qe!==Be)return qe?1:-1;if(qe&&Be){let Ve=ma(ue.updated_at)-ma(D.updated_at);return Ve!==0?Ve:D.id.localeCompare(ue.id)}if(Te==="repo"){let Ve=oe.get(D.root_dir)??Number.MAX_SAFE_INTEGER,Qe=oe.get(ue.root_dir)??Number.MAX_SAFE_INTEGER;if(Ve!==Qe)return Ve-Qe}let Me=typeof D.started_at=="number"&&Number.isFinite(D.started_at)?D.started_at:null,Ke=typeof ue.started_at=="number"&&Number.isFinite(ue.started_at)?ue.started_at:null;return Me!==null&&Ke!==null&&Me!==Ke?Me-Ke:Me===null&&Ke!==null?1:Me!==null&&Ke===null?-1:D.id.localeCompare(ue.id)}),M.sort((D,ue)=>(ue.done_at??0)-(D.done_at??0));let ye=s.length>0?s:r.map(D=>({root_dir:D&&D.root_dir,name:D&&D.name,auto_advance:D&&D.auto_advance,auto_merge:D&&D.auto_merge,slots:D&&D.slots,revision:D&&D.revision,runner_catalog:D&&D.runner_catalog})),z=new Set(b.map(D=>D.root_dir)),X=[];for(let D of ye){if(!D||typeof D.root_dir!="string")continue;let ue=Y.get(D.root_dir)||[],qe=ae.get(D.root_dir)||[];!(ue.length>0||qe.some(Me=>Me.items.length>0||Me.occupied_by.length>0))&&!z.has(D.root_dir)||X.push({root_dir:D.root_dir,name:D.name||D.root_dir,auto_advance:D.auto_advance===!0,auto_merge:D.auto_merge===!0,slots:typeof D.slots=="number"&&D.slots>=tp?D.slots:tp,revision:typeof D.revision=="number"?D.revision:0,runner_catalog:Tt(D.runner_catalog),items:ue,sublanes:{parallel:ue,serial:qe},serial_lane_count:G.get(D.root_dir)||0,raw_queue_length:j.get(D.root_dir)||0})}let ve={runnable:b,runnable_all:b,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:c==="updated_flat",queue:x,queue_groups:X,running:v,pr_wait:h,done:M,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(j),owner_of:{}},$e=Xd(ve);for(let D of U)$e.has(D.id)||$e.set(D.id,{root_dir:D.root_dir,workspace_name:D.workspace_name,lane:"done",state:"done"});for(let D of[...ve.queue,...ve.runnable]){if(!Object.hasOwn(D,"blocked_by"))continue;let ue=$e.get(D.id);D.blockers=(D.blocked_by||[]).map(qe=>Qd(qe,ue,$e,s))}for(let D of[...ve.queue,...ve.runnable,...ve.running,...ve.pr_wait]){let ue=D.lane==="running"||D.lane==="pr_wait"?[]:(D.blockers||[]).map(Be=>mh(D.id,Be));if(ue.length===0)continue;let qe={predecessors:ue};D.dependency_chips=qe}yh(ve,W,S,$e,s);let he=Jd(ve.queue_groups);for(let D of ve.queue_groups)for(let ue of D.sublanes.serial){let qe=he.get(ep(D.root_dir,ue.id));qe&&(ue.cross_wait_peers=qe)}ve.chain_lanes=bh(i&&Array.isArray(i.lanes)?i.lanes:[],q,$e,s,F,d);let ie=new Map;for(let D of[...ve.queue,...ve.runnable])ie.has(D.id)||ie.set(D.id,D);let Se=new Set;for(let D of ve.chain_lanes)for(let ue of D.rows){if(D.status==="confirmed"&&!ue.unplaced&&!ue.fixed&&Se.add(ue.id),!D.draft&&!ue.unplaced)continue;let qe=ie.get(ue.id);qe&&(qe.cross_lane_chip={lane_id:D.lane_id,number:D.number,status:D.status,label:D.draft?`\uC5F0\uACB0 ${D.number} (draft)`:`\uC5F0\uACB0 ${D.number}`})}let be=[];for(let D of Y.values())for(let ue of D)Se.has(ue.id)||be.push(ue);be.sort((D,ue)=>{let qe=D.workspace_name.localeCompare(ue.workspace_name);return qe!==0?qe:(D.queue_index??0)-(ue.queue_index??0)}),ve.parallel_rows=be;let K={};for(let[D,ue]of $e)typeof ue.root_dir=="string"&&ue.root_dir.length>0&&(K[D]=ue.root_dir);for(let D of ve.chain_lanes)for(let ue of D.rows)!Object.hasOwn(K,ue.id)&&ue.root_dir.length>0&&d.has(ue.root_dir)&&(K[ue.id]=ue.root_dir);ve.owner_of=K;let re=ve.runnable.length;ve.runnable_all=ve.runnable.slice();let pe=ve.runnable;a.show_blocked||(pe=pe.filter(D=>D.blocked!==!0));let ke=pe.length;a.spec==="with"?pe=pe.filter(D=>!!D.spec_id):a.spec==="without"&&(pe=pe.filter(D=>!D.spec_id)),ve.runnable_hidden={blocked:re-ke,spec:ke-pe.length};let je=(D,ue)=>{let qe=ma(ue.updated_at)-ma(D.updated_at);return qe!==0?qe:D.id.localeCompare(ue.id)},We=c==="repo_spec"?(D,ue)=>{let qe=D.spec_id?0:1,Be=ue.spec_id?0:1;return qe!==Be?qe-Be:je(D,ue)}:je;if(c==="updated_flat")ve.runnable=pe.slice().sort(je),ve.runnable_sections=[];else{let D=new Map;for(let Be of pe){let Me=D.get(Be.root_dir);Me?Me.push(Be):D.set(Be.root_dir,[Be])}let ue=[],qe=[];for(let Be of ye){if(!Be||typeof Be.root_dir!="string")continue;let Me=(D.get(Be.root_dir)||[]).slice().sort(We);D.delete(Be.root_dir),Me.length!==0&&(ue.push({root_dir:Be.root_dir,name:Be.name||Be.root_dir,items:Me.map(Ke=>({...Ke,workspace_name:""}))}),qe.push(...Me))}for(let[Be,Me]of D){let Ke=Me.slice().sort(We);ue.push({root_dir:Be,name:Ke[0]?.workspace_name||Be,items:Ke.map(Ve=>({...Ve,workspace_name:""}))}),qe.push(...Ke)}ve.runnable=qe,ve.runnable_sections=ue}return ve}var ap="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function ip(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function lp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var pp="bdui.monitor.done-range",fp="bdui.monitor.running_sort",_p="bdui.monitor.candidate_sort",mp="beads-ui.monitor.candidate-filter",gp="beads-ui.monitor.sections";function vh(){try{let e=window.localStorage.getItem(mp);if(!e)return{...Kr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Kr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Kr.show_blocked,spec:el.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Kr}}}function cp(e){try{window.localStorage.setItem(mp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function wh(){try{let e=window.localStorage.getItem(_p);return Ds.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function kh(e){try{window.localStorage.setItem(_p,e)}catch{}}function $h(){try{let e=window.localStorage.getItem(gp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function up(e){try{window.localStorage.setItem(gp,JSON.stringify(e))}catch{}}function xh(){try{let e=window.localStorage.getItem(pp);return e===null?"today":Rn(e)}catch{return"today"}}function Ah(e){try{window.localStorage.setItem(pp,e)}catch{}}function Sh(){try{return window.localStorage.getItem(fp)==="repo"?"repo":"started"}catch{return"started"}}function Eh(e){try{window.localStorage.setItem(fp,e)}catch{}}var bp="tab:monitor:pipeline",Th=1e3,Ch=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],dp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Rh(e){return e>=1&&e<=dp.length?dp[e-1]:`(${e})`}function hp(e,t){let n=Lt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,c=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),b=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),v=xh(),h=Sh(),x=vh(),M=wh(),U=$h(),Y=null,ae=null,G=null,j=null,q=[],W=null;function S(){let p=Tr.find(_=>_.value===v);return p?p.label:""}let F=document.createElement("div");F.className="mon",e.appendChild(F);let oe=document.createElement("div");oe.className="worker-drawer-overlay",oe.hidden=!0;let Te=document.createElement("div");Te.className="worker-drawer-overlay__backdrop";let ye=document.createElement("div");ye.className="worker-drawer-host mon2-drawer",oe.append(Te,ye),e.appendChild(oe);let z=tl(null,null),X=new Map,ve=new Map,$e=null,he=null,ie=null,Se=Br(ye,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Y=null,oe.hidden=!0,fe()}});async function be(p,_,k,A,te=!0){if(!o||!k)return null;let H=await o(p,{..._,root_dir:k,expected_revision:A});if(H&&H.conflict&&te){H.queue&&ve.set(k,H.queue);let y=H.queue&&typeof H.queue.revision=="number"?H.queue.revision:A;H=await o(p,{..._,root_dir:k,expected_revision:y})}return H&&H.queue&&k&&ve.set(k,H.queue),H}function K(p,_){let k=ve.get(p),A=s&&s.get?s.get():null,te=(Array.isArray(A)?A:[]).find(y=>y?.root_dir===p);return(k||te)?.merge_queue?.find(y=>y.bead_id===_)?.continuation_action}async function re(p,_,k,A){let te=await be(p,_,k,A),H=ve.get(k)?.revision??te?.queue?.revision??A;return Fn(te,(y,O)=>be(p,{..._,continuation:y,decision_token:O},k,H,!1),{refresh:y=>be(p,_,k,y?.queue?.revision??ve.get(k)?.revision??H,!1)})}async function pe(p,_,k,A){let te=await Fn({continuation_mismatch:A},(y,O)=>be("worker-merge-queue-add",{bead_id:_,continuation:y,decision_token:O},p,k,!1)),H=te?.queue?.merge_queue?.find(y=>y.bead_id===_)?.continuation_action;te?.applied!==!0&&H?.continuation===null&&H.mismatch&&await pe(p,_,te.queue.revision,H.mismatch)}async function ke(p,_,k){let A=await be("worker-discard",p,_,k);if(A&&A.discarded===!0){ce(Xo(A),"success",5e3);return}if(A&&A.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${A.reason}`,"error");return}if(A&&A.accepted&&A.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(A&&A.accepted){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${A.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}A&&!A.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function je(p,_,k){return!o||!k?null:await o(p,{..._,root_dir:k})}async function ge(){let p=new Map;for(let _ of z.pr_wait)p.has(_.root_dir)||p.set(_.root_dir,_.expected_revision);for(let[_,k]of p)await be("worker-merge-queue-add-all",{},_,k)}function We(p){let _=U[p];return!!(_&&_.runnable===!0)}function D(p){let _={...U[p]||{}};_.runnable=!_.runnable,U={...U,[p]:_},up(U),fe()}function ue(p){return U[p]===!0}function qe(p){U={...U,[p]:U[p]!==!0},up(U),fe()}function Be(p){let _=z.queue_groups.find(k=>k.root_dir===p);if(!_)return null;for(let k=0;k<_.serial_lane_count;k+=1){let A=`s${k+1}`,te=_.sublanes.serial.find(H=>H.id===A);if(!te||te.raw_length===0&&te.occupied_by.length===0)return A}return null}function Me(p,_){let k=z.queue_groups.find(te=>te.root_dir===p),A=k?k.sublanes.serial.find(te=>te.id===_):void 0;return A?A.raw_length:0}function Ke(p,_){let k=X.get(p),A=X.get(_);if(!k||!A)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let te=ip(k),H=ip(A);if(te!==null&&te===H&&k.root_dir===A.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let y=lp(k),O=lp(A);if(y&&H!==null){let C=H;return{kind:"ops",title:`${C} \uB05D\uC5D0 ${p}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:A.root_dir,ops:[{bead_id:p,lane:C,index:Me(A.root_dir,C)}]}}if(te!==null&&O&&H===null){let C=te;return{kind:"ops",title:`${C} \uB05D\uC5D0 ${_}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:k.root_dir,ops:[{bead_id:_,lane:C,index:Me(k.root_dir,C)}]}}if(y&&te===null&&O&&H===null){let C=Be(k.root_dir);return C===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${C} \uB808\uC778\uC5D0 ${_} \u2192 ${p} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:k.root_dir,ops:[{bead_id:_,lane:C,index:0},{bead_id:p,lane:C,index:1}]}}return!y&&!O?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:y?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function Ve(p,_){let k=Ke(p,_.id);return{id:_.id,title:_.title,location_label:_.location_label,prefixes:_.prefixes,action:k.kind==="note"?{kind:"note",text:k.text}:k.kind==="disabled"?{kind:"disabled",label:ap,title:k.title}:{kind:"place",label:ap,title:k.title}}}function Qe(p,_){if(!G||G.bead_id!==p)return null;let k=G.counterpart_id,A=_.filter(te=>te.id===k);return A.length===0?null:{rows:A.map(te=>Ve(p,te))}}function it(p){let _=p.dependency_chips||null,k=p.overlap_chips||[],A=p.scope_state==="missing",te=p.cross_lane_chip;if(!_&&k.length===0&&!A&&!te)return null;let H=Qe(p.id,k);return{..._||{},...k.length>0?{overlaps:k}:{},...A?{scope_missing:!0}:{},...te?{cross_lane:{lane_id:te.lane_id,label:te.label}}:{},...H?{popover:H}:{}}}function pt(p){let _=it(p);return _?{...p,dependency_chips:_}:p}async function kt(p,_){let k=Ke(p,_);if(G=null,k.kind!=="ops"){fe();return}let A=Zt(k.root_dir,k.ops[0].bead_id);for(let te of k.ops){let H=await ft(te,k.root_dir,A);if(H===null)break;A=H}fe()}async function ft(p,_,k){try{let A=await be("worker-queue-place",p,_,k,!1);if(A&&A.conflict)return ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!A||A.applied!==!0)return ce(A&&typeof A.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${A.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let te=A.queue?A.queue.revision:void 0;return typeof te!="number"?(ce("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):te}catch(A){return ce(xe(A),"error"),null}}function Q(p){let _=We(p.root_dir);return l`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${p.root_dir}
        data-section="runnable"
        aria-expanded=${_?"false":"true"}
        aria-label=${`${p.name} \uC139\uC158 ${_?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${_?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${p.root_dir}>${p.name}</span>
      <span class="mon2-sec__count">${p.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function ne(p,_){return l`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${_}
    </div>`}function Oe(p){if(ae!==p.id)return null;let _=z.queue_groups.find(H=>H.root_dir===p.root_dir),k=p.place_lanes||[],A=z.cross_lanes_revision!==null,te=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let H of z.chain_lanes)te.push({id:`lane:${H.lane_id}`,label:`\uC5F0\uACB0 ${H.number} (${H.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:H.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!A});te.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!A,title:A?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let H of k)te.push({id:`serial:${H.id}`,label:`\uC9C1\uB82C ${Number(H.id.slice(1))}`,count:H.length,group:`${_?_.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:te}}function Ne(){let p=[],_=new Set,k=(A,te)=>{for(let H of A)_.has(H.id)||(_.add(H.id),p.push({bead_id:H.id,root_dir:H.root_dir,workspace_name:H.workspace_name,title:H.title,lane:te}))};return k(z.running,"running"),k(z.pr_wait,"pr_wait"),k(z.queue,"queue"),k(z.runnable_all,"runnable"),p}function Ce(p){if(!j||j.bead_id!==p)return"";let _=Nt(),k=Ne(),A=new Map;for(let O of k)A.set(O.bead_id,O);let te=(_.get(p)||[]).filter(O=>A.has(O)),H=zd(Wd(p,{issues:k,blocked_by_map:_}),j.query),y=z.owner_of[p];return l`<div
      class="mon-deppanel"
      data-bead-id=${p}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${te.length===0?l`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${te.map(O=>l`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${O}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${p}
                data-dep-b=${O}
                aria-label=${`${O} \uC5F0\uACB0 \uD574\uC81C`}
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
        .value=${j.query}
      />
      <div class="mon-deppanel__list">
        ${H.length===0?l`<div class="mon-deppanel__empty">후보 없음</div>`:H.map(O=>l`<button
                  type="button"
                  class="mon-deppanel__cand${O.disabled?" is-disabled":""}"
                  data-dep-cand=${O.bead_id}
                  ?disabled=${O.disabled}
                  title=${O.reason||O.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${O.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${O.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${O.title}</span
                  >${O.reason?l`<span class="mon-deppanel__cand-reason"
                        >${O.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${y===void 0?l`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function Ie(p){return ne(p,l`${Ni(pt(p),Oe(p),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(_,k)=>i(k,p.root_dir):void 0})}${Ce(p.id)}`)}function Fe(){return z.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${z.runnable.map(p=>Ie(p))}
      </div>`:l`${z.runnable_sections.map(p=>{let _=We(p.root_dir);return l`<section
        class="mon2-sec${_?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${Q({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${_?"":l`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(k=>Ie(k))}
            </div>`}
      </section>`})}`}function st(p,_){return l`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${_}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Jn(pt(p))}
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
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${p.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${p.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${p.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
      ${Ce(p.id)}
    </div>`}function et(){let p=ue("parallel");return l`<section
      class="mon2-area mon2-parallel${p?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${p?"false":"true"}
          aria-label=${`\uBCD1\uB82C \uC601\uC5ED ${p?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${p?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${z.parallel_rows.length}</span>
      </header>
      ${p?"":l`<div class="mon2-area__body" data-drop="parallel">
            ${z.parallel_rows.length===0?l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:z.parallel_rows.map((_,k)=>st(_,k))}
          </div>`}
    </section>`}function Je(p,_,k){return l`<div
      class="mon2-crow${_.fixed?" mon2-crow--fixed":""}"
      draggable=${_.draggable?"true":"false"}
      data-bead-id=${_.id}
      data-drag-kind="chain"
      data-root-dir=${_.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${k}
      data-queue-index=${typeof _.queue_index=="number"?String(_.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Rh(_.seq)}</span
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
    </div>`}function bt(p){let _=z.cross_lanes_revision!==null;return l`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span
          class="mon2-clane__badge mon2-clane__badge--${p.draft?"draft":"confirmed"}"
          >${p.draft?"draft":"\uD655\uC815"}</span
        >
        ${p.all_done?l`<span class="mon2-clane__badge mon2-clane__badge--done"
              >모두 완료</span
            >`:""}
        ${p.draft?l`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!_||!p.can_confirm}
              title=${p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:p.has_mismatch?l`<button
                type="button"
                class="mon2-clane__reapply"
                data-lane-id=${p.lane_id}
                ?disabled=${!_}
                title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
              >
                재적용
              </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${p.lane_id}
          ?disabled=${!_}
          title=${p.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${p.lane_id}
      >
        ${p.rows.length===0?l`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:p.rows.map((k,A)=>Je(p,k,A))}
      </div>
    </div>`}function It(p,_,k){return l`<div
      class="mon2-item"
      data-bead-id=${_.id}
      data-drag-kind="repo-serial"
      data-root-dir=${_.root_dir}
      data-lane-id=${p.id}
      data-row-index=${k}
      data-queue-index=${String(_.queue_index??0)}
    >
      ${Jn(pt(_))}
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
      ${Ce(_.id)}
    </div>`}function _t(p){if(p.length===0)return"";let _=p.length-1;return`${p[0].id} \uC810\uC720${_>0?` +${_}`:""}`}function Mt(p){return l`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${Jn({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function ht(p,_){return l`<div
      class="mon2-lane${_.empty?" mon2-lane--empty":""}"
      data-root-dir=${p.root_dir}
      data-lane-length=${String(_.raw_length)}
    >
      ${vn({id:"",lane:_.id,title:`${p.name} \xB7 \uC9C1\uB82C ${_.index+1}`,items:_.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:l`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${p.root_dir}
          data-lane-id=${_.id}
          data-lane-length=${String(_.raw_length)}
        >
          ${_.occupants.map(k=>Mt(k))}
          ${_.items.length>0?_.items.map((k,A)=>It(_,k,A)):_.occupants.length>0?"":l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:l`<span
            class="mon2-lane__badge${_.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${_.occupants.length>0?_.occupants.map(k=>`${k.id} \u2014 ${k.badge}`).join(`
`):""}
            >${_t(_.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${p.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${_.empty?l`<div class="mon2-lane__hint">
            ${p.name} 직렬 ${_.index+1} 비어 있음
          </div>`:""}
      ${_.cycle?l`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(_.cross_wait_peers||[]).map(k=>l`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${k.workspace_name}·${k.lane}과 교차 대기
          </div>`)}
    </div>`}function He(){let p=ue("serial"),_=z.cross_lanes_revision!==null,k=z.chain_lanes.some(A=>A.draft&&A.rows.length===0);return l`<section
      class="mon2-area mon2-serial${p?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${p?"false":"true"}
          aria-label=${`\uC9C1\uB82C \uC601\uC5ED ${p?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${p?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">직렬 영역</span>
        <button
          type="button"
          class="mon2-newlane"
          ?disabled=${k||!_}
          title=${_?k?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${p?"":l`<div class="mon2-area__body">
            ${z.cross_lanes_unreadable?l`<div class="mon2-clane__unreadable">
                  연결 레인 저장소를 읽을 수 없음
                </div>`:""}
            ${z.chain_lanes.map(A=>bt(A))}
            ${z.queue_groups.map(A=>A.sublanes.serial.map(te=>ht(A,te)))}
          </div>`}
    </section>`}function Pe(){return l`<div class="mon2-wait">${et()}${He()}</div>`}function P(p){return l`<div class="worker-rungrid">
      ${z.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:z.running.map(_=>ji({bead_id:_.id,attempt_id:_.attempt_id||"",title:_.title,runner:_.runner??null,model:_.model??null,effort:_.effort??null,speed:_.speed??null,started_at:_.started_at??null,kind:_.kind,..._.kind==="session"?{updated_at:_.updated_at,session_refs:_.session_refs||[]}:{},workflow:_.workflow||null,resumed_from:_.resumed_from??null,continuation_mode:_.continuation_mode??null,paused:_.run_state==="paused",failed:_.run_state==="failed",status:_.status,status_label:_.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:_.can_resume!==!1,can_pause:_.can_pause!==!1,exec_chips:_.exec_chips||null,usage:_.usage||null,discard:_.discard},p,Y,{monitor:{repo:_.workspace_name,root_dir:_.root_dir,serial_lane_id:_.serial_lane_id,last_activity:_.last_activity||null,legs:_.legs||[],dependency_chips:it(_)}}))}
    </div>`}function Z(p){let _={runnable:z.runnable,queue:z.queue,running:z.running,pr_wait:z.pr_wait,done:z.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${Ch.map(k=>{let A=_[k.lane],te=k.lane==="runnable"?z.runnable_flat?A.length>0?Fe():void 0:z.runnable_sections.length>0?Fe():void 0:k.lane==="queue"?z.queue_groups.length>0||z.chain_lanes.length>0||z.parallel_rows.length>0?Pe():void 0:k.lane==="running"?P(p):A.length>0?l`${A.map(H=>Jn(H))}`:void 0;return vn({id:`monitor-${k.lane}`,lane:k.pane,title:k.lane==="done"?`\uC644\uB8CC\xB7${S()}`:k.title,items:A,empty:k.empty,body:te,live:k.lane==="running"&&A.length>0,controls:k.lane==="runnable"?_e():void 0,header_control:T(k.lane,A.length)})})}
      </div>`}function _e(){return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${x.show_blocked}
        />
        🔒
        blocked${z.runnable_hidden.blocked>0?` ${z.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${el.map(p=>l`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${x.spec===p.value?" is-active":""}"
              data-spec=${p.value}
              aria-pressed=${x.spec===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${z.runnable_hidden.spec>0?l`<span class="worker-filter__hidden"
              >숨김 ${z.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function T(p,_){return p==="runnable"?l`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${M}
      >
        ${Ds.map(k=>l`<option
              value=${k.value}
              ?selected=${M===k.value}
            >
              ${k.label}
            </option>`)}
      </select>`:p==="running"?l`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${h}
      >
        <option value="started" ?selected=${h==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${h==="repo"}>
          레포순
        </option>
      </select>`:p==="pr_wait"&&_>0?l`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:p==="done"?l`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${v}
      >
        ${Tr.map(k=>l`<option value=${k.value} ?selected=${v===k.value}>
              ${k.label}
            </option>`)}
      </select>`:""}function V(p){let _=s&&s.get?s.get():null,k=s&&s.getWorkspacesState?s.getWorkspacesState():[],A=p===void 0?s&&s.crossLanes?s.crossLanes():void 0:p,te={done_since:dr(v,d()),running_sort:h,candidate_filter:x,candidate_sort:M};return A!==void 0&&(te.cross_lanes=A),tl(_,k,te)}function fe(){let p=d();z=V(),X=new Map;for(let _ of[...z.runnable,...z.queue,...z.running,...z.pr_wait,...z.done])!_.non_occupying&&!X.has(_.id)&&X.set(_.id,_);Xe(Z(p),F),w()?.render(),m(),I()}function m(){let p=new Map;for(let _ of z.queue_groups)p.set(_.root_dir,_.auto_advance);for(let _ of Array.from(F.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let k=_.closest(".mon2-item")?.getAttribute("data-root-dir")||"",A=p.get(k);typeof A=="boolean"&&_.setAttribute("title",`${_.textContent||""} \xB7 ${A?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function w(){if(ie)return ie;let p=F.querySelector(".mon2-deck");return p?(ie=Md(p,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>z.done,rangeLabel:S,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:J,onFocusChange:_=>{W=_,I()}}),ie):null}function I(){F.classList.toggle("has-focus",W!==null);for(let p of Array.from(F.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",W!==null&&p.getAttribute("data-root-dir")===W);for(let p of Array.from(F.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let _=X.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",W!==null&&!!_&&_.root_dir===W)}for(let p of Array.from(F.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",W!==null&&p.getAttribute("data-root-dir")===W)}function ee(p,_){let k=a?a():void 0;if(!_||!k||_===k||!c){r(p);return}c(_).then(()=>{r(p)}).catch(A=>{n("workspace switch for %s failed: %o",_,A)})}function J(p){if(!p)return;let _=a?a():void 0,k=()=>{try{u?.gotoView("worker")}catch(A){n("gotoView(worker) failed: %o",A)}};if(!c||_&&_===p){k();return}c(p).then(k).catch(A=>{n("workspace switch for %s failed: %o",p,A),ce("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function me(p){fn(p).then(_=>{ce(_?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",_?"success":"error",1400)})}function Re(p){let _=X.get(p)||null;return{item:_,root_dir:_?_.root_dir:"",revision:_?_.expected_revision:0}}function xe(p){if(typeof p=="string"&&p.length>0)return p;if(p&&typeof p=="object"){let _=p;if(typeof _.message=="string"&&_.message.length>0)return _.message;if(typeof _.error=="string"&&_.error.length>0)return _.error;if(_.error&&typeof _.error=="object"&&typeof _.error.message=="string")return _.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function ot(p,_,k){let A=z.owner_of[_];if(typeof A!="string"||A.length===0){ce(`${_}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await je(p,{a:_,b:k},A)}catch(te){ce(xe(te),"error")}fe()}function dt(p){return z.runnable.some(_=>_.id===p)||z.parallel_rows.some(_=>_.id===p)?!0:z.queue_groups.some(_=>_.sublanes.serial.some(k=>k.items.some(A=>A.id===p)))}function Ae(p){!p||!dt(p)||(j=j&&j.bead_id===p?null:{bead_id:p,query:""},fe())}function Nt(){let p=new Map,_=s&&s.get?s.get():null,k=A=>Array.isArray(A)?A.filter(te=>typeof te=="string"&&te.length>0):[];for(let A of Array.isArray(_)?_:[]){if(!A||typeof A!="object")continue;let te=A.bead_blocked_by&&typeof A.bead_blocked_by=="object"?A.bead_blocked_by:{};for(let[H,y]of Object.entries(te))Array.isArray(y)&&p.set(H,k(y));for(let H of[...Array.isArray(A.runnable)?A.runnable:[],...Array.isArray(A.session_active)?A.session_active:[]])H&&typeof H.bead_id=="string"&&Array.isArray(H.blocked_by)&&H.blocked_by.length>0&&p.set(H.bead_id,k(H.blocked_by))}return p}function wt(){let p=Nt();for(let _ of q){let k=(p.get(_.a)||[]).slice();_.type==="dep-remove"?p.set(_.a,k.filter(A=>A!==_.b)):k.includes(_.b)||p.set(_.a,[...k,_.b])}return p}function Ut(p=z){let _=new Map,k=new Map,A=new Set,te=new Set;for(let y of p.chain_lanes){_.set(y.lane_id,{status:y.status,entries:y.rows.map(O=>({bead_id:O.id,root_dir:O.root_dir}))});for(let O of y.rows)k.set(O.id,y.lane_id),O.fixed&&A.add(O.id),O.unplaced||te.add(O.id)}let H=new Map;for(let y of p.parallel_rows)typeof y.queue_index=="number"&&H.set(y.id,y.queue_index);for(let y of p.queue_groups)for(let O of y.sublanes.serial)for(let C of O.items)typeof C.queue_index=="number"&&H.set(C.id,C.queue_index);return{blocked_by_map:wt(),owner_of:new Map(Object.entries(p.owner_of)),cross_lanes:_,owner_lane_of:k,fixed_members:A,placed_members:te,parallel_rows:p.parallel_rows.map(y=>({bead_id:y.id,root_dir:y.root_dir,queue_index:y.queue_index??0})),parallel_raw_length:new Map(Object.entries(p.parallel_raw_length)),queue_index_of:H}}function Zt(p,_){let k=X.get(_);if(k&&k.root_dir===p)return k.expected_revision;let A=z.queue_groups.find(te=>te.root_dir===p);return A?A.revision:0}async function Ht(p,_,k){try{if(p.type==="worker-queue-place"||p.type==="worker-queue-reorder"||p.type==="worker-queue-remove"){let A=await be(p.type,p.payload,p.root_dir,k.get(p.root_dir)??Zt(p.root_dir,_));return!A||typeof A.applied!="boolean"?(ce("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),!1):(A.queue&&typeof A.queue.revision=="number"&&k.set(p.root_dir,A.queue.revision),A.conflict?(ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):A.applied===!1?(ce(A.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${A.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0)}return(p.type==="dep-add"||p.type==="dep-remove")&&await je(p.type,{a:p.a,b:p.b},p.root_dir),!0}catch(A){return ce(xe(A),"error"),!1}}function Wt(p){(p.type==="dep-add"||p.type==="dep-remove")&&(q=[...q,{type:p.type,a:p.a,b:p.b}])}async function un(p,_){if(!o)return{ok:!1};try{let k=await o(p.type,{...p.payload,expected_revision:_});return!k||typeof k.revision!="number"?(ce("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:k.revision}}catch(k){let A=k,te=A&&A.code==="conflict"?A.details?.cross_lanes:null;return te&&typeof te.revision=="number"&&Array.isArray(te.lanes)?{ok:!1,conflict:te}:(ce(xe(k),"error"),{ok:!1})}}async function Ct(p,_,k){let A=new Map,te=p.ops.slice(0,p.lane_op_index),H=p.ops.slice(p.lane_op_index);for(let O of te){if(!await Ht(O,k,A))return{done:!0};Wt(O)}let y=_;for(let O of p.lane_ops){if(y===null)return ce("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let C=await un(O,y);if(!C.ok)return C.conflict?{done:!1,conflict:C.conflict}:{done:!0};y=C.revision}for(let O of H){if(!await Ht(O,k,A))return{done:!0};Wt(O)}return{done:!0}}async function Rt(p,_){q=[];let k=z;for(let A=0;;A+=1){let te=p(Ut(k));if("refused"in te){ce(te.refused,"error");break}let H=await Ct(te,k.cross_lanes_revision,_);if(H.done)break;if(A>=1){ce("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}k=V(H.conflict)}q=[],fe()}async function Ge(p,_){await Rt(k=>Ki(p,_,k),p.bead_id)}async function dn(p,_){if(p==="create"){await Rt(k=>Vi(null,k),"");return}if(p==="remove"){let k=z.chain_lanes.find(A=>A.lane_id===_);if(k&&!k.draft){let A=k.rows.filter((te,H)=>H===0?!1:!te.mismatch).length;if(!b(`\uC758\uC874 ${A}\uAC1C\uB97C \uD568\uAED8 \uC81C\uAC70\uD569\uB2C8\uB2E4`))return}await Rt(A=>Ud(_,A),"");return}await Rt(k=>p==="confirm"?jd(_,k):Bd(_,k),"")}async function tn(p,_){let k=X.get(p);if(!k){fe();return}let A={kind:"candidate",bead_id:p,root_dir:k.root_dir};if(_==="new-lane"){await Rt(te=>Vi({bead_id:p,root_dir:k.root_dir},te),p);return}if(_.startsWith("lane:")){let te=_.slice(5);if(!z.chain_lanes.find(y=>y.lane_id===te)){fe();return}await Rt(y=>Ki(A,{kind:"chain",lane_id:te,marker_index:(y.cross_lanes.get(te)?.entries??[]).length},y),p);return}if(_.startsWith("serial:")){let te=_.slice(7),H=(k.place_lanes||[]).find(y=>y.id===te);await Ge(A,{kind:"repo-serial",root_dir:k.root_dir,lane_id:te,index:H?H.index:0});return}await Ge(A,{kind:"parallel",marker_index:z.parallel_rows.length})}async function rt(p,_){let k=z.parallel_rows,A=k.findIndex(we=>we.id===p);if(A<0)return;let te=k[A].root_dir,H=[];k.forEach((we,nt)=>{we.root_dir===te&&H.push(nt)});let y=H.indexOf(A),O=H[y+_];if(typeof O!="number")return;let C=_===-1?O:H[y+2]??Math.min(k.length,O+1);await Ge({kind:"parallel",bead_id:p,root_dir:te,queue_index:k[A].queue_index??0},{kind:"parallel",marker_index:C})}async function Le(p){for(let _ of z.chain_lanes){let k=_.rows.find(A=>A.id===p);if(k){await Ge({kind:"chain",bead_id:p,root_dir:k.root_dir,lane_id:_.lane_id,...typeof k.queue_index=="number"?{queue_index:k.queue_index}:{}},{kind:"parallel",marker_index:z.parallel_rows.length});return}}}let R=null,de=!1,Ee=null;function ct(){Ee!==null&&clearTimeout(Ee),Ee=setTimeout(()=>{Ee=null,de=!1},0)}function $t(p,_){let k=_&&typeof _.closest=="function"?_.closest("[data-row-index]"):null;if(k&&p.contains(k)){let A=Number(k.getAttribute("data-row-index"));return Number.isFinite(A)?A:0}return p.querySelectorAll("[data-row-index]").length}function gt(p){let _=p.target,k=typeof _?.closest=="function"?_.closest("[data-drop]"):null;if(!k||!R)return null;let A=k.getAttribute("data-drop");if(A==="candidate")return{zone:k,target:{kind:"candidate"}};if(A==="parallel")return{zone:k,target:{kind:"parallel",marker_index:$t(k,_)}};if(A==="chain")return{zone:k,target:{kind:"chain",lane_id:k.getAttribute("data-lane-id")||"",marker_index:$t(k,_)}};if(A==="repo-serial"){let te=k.getAttribute("data-root-dir")||"";if(te!==R.root_dir)return null;let H=typeof _?.closest=="function"?_.closest("[data-queue-index]"):null,y=H&&k.contains(H)?H.getAttribute("data-queue-index"):k.getAttribute("data-lane-length"),O=Number(y);return{zone:k,target:{kind:"repo-serial",root_dir:te,lane_id:k.getAttribute("data-lane-id")||"",index:Number.isFinite(O)?O:0}}}return null}function Dt(){for(let p of Array.from(F.querySelectorAll(".is-drop-over")))p.classList.remove("is-drop-over")}function jt(p){let _=p.target,k=typeof _?.closest=="function"?_.closest('[draggable="true"][data-bead-id]'):null,A=k?k.closest("[data-drag-kind]"):null;if(!A)return;let te=A.getAttribute("data-bead-id")||"",H=A.getAttribute("data-drag-kind")||"",y=A.getAttribute("data-root-dir")||"";if(!te||!H||!y)return;let O=A.getAttribute("data-queue-index")||"",C=Number(O),we=A.getAttribute("data-lane-id")||"";R={kind:H,bead_id:te,root_dir:y,...O!==""&&Number.isFinite(C)?{queue_index:C}:{},...we?{lane_id:we}:{}},de=!0,ae=null,F.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",te),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Gt(p){let _=gt(p);_&&(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),_.zone.classList.add("is-drop-over"))}function nn(p){let _=p.target;typeof _?.closest=="function"&&_.closest("[data-drop]")?.classList.remove("is-drop-over")}function St(){R=null,Dt(),F.classList.remove("is-dragging"),ct()}function rn(p){let _=gt(p),k=R;R=null,Dt(),F.classList.remove("is-dragging"),!(!_||!k)&&(p.preventDefault(),Ge(k,_.target))}function gn(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function Pn(p,_){let{item:k,root_dir:A,revision:te}=Re(_),H=k?.attempt_id||"",y=p.classList;if(y.contains("mon2-rowops__up")||y.contains("mon2-rowops__down")){rt(_,y.contains("mon2-rowops__up")?-1:1);return}if(y.contains("mon2-rowops__remove")){be("worker-queue-remove",{bead_id:_},A,te);return}if(y.contains("mon2-crow__detach")){Le(_);return}if(y.contains("mon-dep__btn")){Ae(_);return}if(y.contains("worker-dep__open")){Ae(_);return}if(y.contains("mon-lane__chip")){let O=p.getAttribute("data-lane-id")||"";F.querySelector(`.mon2-clane[data-lane-id="${O}"]`)?.scrollIntoView({block:"nearest"});return}if(y.contains("mon-deppanel__unlink")){let O=p.getAttribute("data-dep-a")||"",C=p.getAttribute("data-dep-b")||"";b(`${C}\uAC00 ${O}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&ot("dep-remove",O,C);return}if(y.contains("mon-deppanel__cand")){let O=p.getAttribute("data-dep-cand")||"";j&&O&&ot("dep-add",j.bead_id,O);return}if(y.contains("mon-overlap__chip")){let O=p.getAttribute("data-overlap-id")||"";G=!!G&&G.bead_id===_&&G.counterpart_id===O?null:{bead_id:_,counterpart_id:O},fe();return}if(y.contains("mon-overlap__place")){kt(_,p.getAttribute("data-counterpart-id")||"");return}if(y.contains("worker-card__place")){ae=ae===_?null:_,fe();return}if(y.contains("worker-card__place-cancel")){ae=null,fe();return}if(y.contains("worker-card__place-lane")){let O=p.getAttribute("data-lane")||"parallel";ae=null,tn(_,O);return}if(y.contains("rtile__session")){if(k&&k.kind==="session"){let O=(k.session_refs||[]).find(C=>C&&C.current===!0);O&&(oe.hidden=!1,Se.open(ho(O,_,"in_progress",A)),fe());return}Y=H,H&&k&&(oe.hidden=!1,Se.open({attempt_id:H,root_dir:A,meta:gn(k)})),fe();return}if(y.contains("rtile__pause")){je("worker-attempt-pause",{attempt_id:H},A);return}if(y.contains("rtile__resume")){Mr().then(O=>{if(O!==null)return re("worker-attempt-resume",{attempt_id:H,...O!==""?{instructions:O}:{}},A,te)});return}if(y.contains("rtile__dismiss")){be("worker-attempt-dismiss",{attempt_id:H},A,te);return}if(y.contains("rtile__discard")){if(!b(Cs(_,"unmerged")))return;ke({bead_id:_,...H?{attempt_id:H}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},A,te);return}if(y.contains("worker-mini__merge")){let O=K(A,_);O?.mismatch&&O.continuation===null?pe(A,_,te,O.mismatch):be("worker-merge-queue-add",{bead_id:_},A,te);return}if(y.contains("worker-mini__merge-cancel")){be("worker-merge-queue-remove",{bead_id:_},A,te);return}if(y.contains("worker-mini__discard")){let O=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!b(Cs(_,O)))return;ke({bead_id:_,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},A,te);return}if(y.contains("worker-mini__revise-fix")){re("worker-revise-fix",{bead_id:_},A,te);return}y.contains("worker-mini__revise-approve")&&be("worker-revise-approve",{bead_id:_},A,te)}function E(p){let _=de;de=!1;let k=p.target;if(!k||typeof k.closest!="function"||k.closest("dialog")||k.closest(".worker-drawer-overlay")||k.closest("a"))return;let A=k.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(A){p.preventDefault();let Ze=k.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||A.textContent?.trim()||"";Ze&&me(Ze);return}let te=k.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(te){p.preventDefault();let at=te.getAttribute("data-root-dir")||X.get(k.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||te.getAttribute("title")||"";J(at);return}let H=k.closest(".mon2-sec__toggle");if(H){p.preventDefault(),D(H.getAttribute("data-root-dir")||"");return}let y=k.closest(".mon2-area__toggle");if(y){p.preventDefault(),qe(y.getAttribute("data-area")||"parallel");return}if(k.closest(".mon2-newlane")){p.preventDefault(),dn("create","");return}let O=k.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove");if(O){p.preventDefault();let at=O.getAttribute("data-lane-id")||"";dn(O.classList.contains("mon2-clane__confirm")?"confirm":O.classList.contains("mon2-clane__reapply")?"reapply":"remove",at);return}if(k.closest(".mon-merge-all")){p.preventDefault(),ge();return}let C=k.closest(".mon-filter__spec");if(C){p.preventDefault(),x={...x,spec:C.getAttribute("data-spec")||"all"},cp(x),fe();return}let we=k.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!we)return;let nt=we.getAttribute("data-bead-id")||"",Ye=k.closest("button");if(Ye){p.preventDefault(),Pn(Ye,nt);return}nt&&!_&&(p.preventDefault(),ee(nt,we.getAttribute("data-root-dir")||Re(nt).root_dir))}function L(p){let _=p.target;if(!_||typeof _.closest!="function")return;let k=_.closest(".mon-filter__blocked");if(k){x={...x,show_blocked:k.checked},cp(x),fe();return}let A=_.closest(".mon-candidate-sort");if(A){M=Ds.some(y=>y.value===A.value)?A.value:"repo_spec",kh(M),fe();return}let te=_.closest(".mon-running-sort");if(te){h=te.value==="repo"?"repo":"started",Eh(h),fe();return}let H=_.closest(".mon-done-range");H&&(v=Rn(H.value),Ah(v),fe())}function De(p){let _=p.target,k=_&&typeof _.closest=="function"?te=>_.closest(te):()=>null,A=!1;G&&!k(".mon-overlap__popover, .mon-overlap__chip")&&(G=null,A=!0),j&&!k(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(j=null,A=!0),A&&fe()}function f(p){p.key!=="Escape"||!G&&!j||(G=null,j=null,fe())}function $(p){let _=p.target;!_||typeof _.closest!="function"||!_.closest(".mon-deppanel__search")||!j||(j={...j,query:_.value},fe())}e.addEventListener("click",E),e.addEventListener("change",L),e.addEventListener("input",$),document.addEventListener("click",De),document.addEventListener("keydown",f),e.addEventListener("dragstart",jt),e.addEventListener("dragover",Gt),e.addEventListener("dragleave",nn),e.addEventListener("drop",rn),e.addEventListener("dragend",St),s&&typeof s.subscribe=="function"&&($e=s.subscribe(()=>{try{ve.clear(),fe()}catch{}}));function N(){he!==null&&(clearInterval(he),he=null)}function se(){Ee!==null&&(clearTimeout(Ee),Ee=null)}return{load(){n("load"),fe(),he===null&&(he=setInterval(()=>{try{fe()}catch{}},Th))},pause(){N()},clear(){N(),se(),$e&&($e(),$e=null),Se.destroy(),oe.hidden=!0,ie?.destroy(),ie=null,e.removeEventListener("click",E),e.removeEventListener("change",L),e.removeEventListener("input",$),document.removeEventListener("click",De),document.removeEventListener("keydown",f),e.removeEventListener("dragstart",jt),e.removeEventListener("dragover",Gt),e.removeEventListener("dragleave",nn),e.removeEventListener("drop",rn),e.removeEventListener("dragend",St),e.replaceChildren()}}}function yp(e,t,n){let r=Lt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(v){return h=>{h.preventDefault();let x=v==="monitor"&&c()==="monitor"?"worker":v;r("click tab %s",x),n.gotoView(x)}}function c(){let v=t.getState();return v.view==="worker"||v.view==="monitor"?v.view:"board"}function u(){let v=c();return l`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${v==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let v=c();return l`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${v==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${v==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function b(){s&&Xe(u(),s),o&&Xe(d(),o)}return b(),a=t.subscribe(()=>b()),{destroy(){a&&(a(),a=null),s&&Xe(l``,s),o&&Xe(l``,o)}}}var vp=["bug","feature","task","epic","chore"];function wp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var kp=["Critical","High","Medium","Low","Backlog"];function $p(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),c=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),b=n.querySelector("#btn-create"),v=n.querySelector(".new-issue__close");function h(){o.replaceChildren();let q=document.createElement("option");q.value="",q.textContent="\u2014 Select \u2014",o.appendChild(q);for(let W of vp){let S=document.createElement("option");S.value=W,S.textContent=wp(W),o.appendChild(S)}a.replaceChildren();for(let W=0;W<=4;W+=1){let S=document.createElement("option");S.value=String(W);let F=kp[W]||"Medium";S.textContent=`${W} \u2013 ${F}`,a.appendChild(S)}}h();function x(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function M(q){s.disabled=q,o.disabled=q,a.disabled=q,i.disabled=q,c.disabled=q,d.disabled=q,b.disabled=q,b.textContent=q?"Creating\u2026":"Create"}function U(){u.textContent=""}function Y(q){u.textContent=q}function ae(){try{let q=window.localStorage.getItem("beads-ui.new.type");q?o.value=q:o.value="";let W=window.localStorage.getItem("beads-ui.new.priority");W&&/^\d$/.test(W)?a.value=W:a.value="2"}catch{o.value="",a.value="2"}}function G(){let q=o.value||"",W=a.value||"";q.length>0&&window.localStorage.setItem("beads-ui.new.type",q),W.length>0&&window.localStorage.setItem("beads-ui.new.priority",W)}async function j(){U();let q=String(s.value||"").trim();if(q.length===0){Y("Title is required"),s.focus();return}let W=Number(a.value||"2");if(!(W>=0&&W<=4)){Y("Priority must be 0..4"),a.focus();return}let S=String(o.value||""),F=String(c.value||""),oe={title:q};S.length>0&&(oe.type=S),String(W).length>0&&(oe.priority=W),F.length>0&&(oe.description=F),M(!0);try{await t("create-issue",oe)}catch{M(!1),Y("Failed to create issue");return}G(),M(!1),x()}return n.addEventListener("cancel",q=>{q.preventDefault(),x()}),v.addEventListener("click",()=>x()),d.addEventListener("click",()=>x()),n.addEventListener("keydown",q=>{q.key==="Enter"&&(q.ctrlKey||q.metaKey)&&(q.preventDefault(),j())}),r.addEventListener("submit",q=>{q.preventDefault(),j()}),{open(){r.reset(),U(),ae();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var Oh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Lh(e,t){return za(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function xp(e,t,n){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=Lh(r,e);return l`<button
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
  `}function Ap(e,t,n){return l`
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
  `}function Sp(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Oh.map(([n,r])=>l`<label class="settings-dialog__toggle">
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
  `}var Ih=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Ep(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(X=>ce(X,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,u="",d=null;function b(){if(d)return d;let X=a.querySelector('[data-pane="execution"]');return X?(d=sa(X,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:ve=>t.queueStore?.set?.(ve)}),d):null}function v(){return l`
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
    `}function h(){let X=r.get();return l`
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
              ${xp(X,s(),Y)}
              ${Ap(X,u,{onDraft:ve=>{u=ve},onAdd:ae,onRemove:G})}
              ${Sp(X,j)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function x(X){let ve=r.get();if(ve)try{let $e=await n("display-policy-set",{expected_revision:ve.revision,policy:X(ve)});M($e),$e&&$e.conflict&&$e.policy&&($e=await n("display-policy-set",{expected_revision:$e.policy.revision,policy:X($e.policy)}),M($e)),$e&&$e.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function M(X){X&&X.policy&&typeof X.policy=="object"&&r.set(X.policy)}function U(X){x(X)}function Y(X){let ve=r.get();if(!ve)return;let $e=!Ph(X,ve);U(he=>Dh(X,he,$e))}function ae(){let X=u.trim();X.length!==0&&(u="",U(ve=>ve.hidden_prefixes.includes(X)?{hidden_prefixes:ve.hidden_prefixes}:{hidden_prefixes:[...ve.hidden_prefixes,X]}),q())}function G(X){U(ve=>({hidden_prefixes:ve.hidden_prefixes.filter($e=>$e!==X)}))}function j(X){let ve=r.get();if(!ve)return;let $e=ve.chips[X]===!1;U(()=>({chips:{[X]:$e}}))}function q(){Xe(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Ih.map(X=>l`<button
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
              @click=${z}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${v()} ${h()}
          </div>
        </div>
      `,a),b()}function W(X){i=X,q()}let S=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",S),a.addEventListener("cancel",S);let F=X=>{X.target===a&&z()};a.addEventListener("click",F);let oe=null;r.subscribe&&(oe=r.subscribe(()=>{c&&q()}));let Te=null;t.implPresetStore?.subscribe&&(Te=t.implPresetStore.subscribe(()=>{c&&d?.render()}));function ye(X="execution"){c||(c=!0,t.onOpenChange?.(!0),i=X,u="",q(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),b()?.load())}function z(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:ye,close:z,sessionDraft:()=>d?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",S),a.removeEventListener("cancel",S),a.removeEventListener("click",F),oe&&(oe(),oe=null),Te&&(Te(),Te=null),d?.destroy(),d=null,a.remove()}}}function Ph(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Dh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Mh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Tp="usage-meter-card",Nh="usage-meter-layer",nl=600,qh=["token_expired","relogin_required"];function Cp(e){return String(e).padStart(2,"0")}function Fh(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Rp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Cp(r.getHours())}:${Cp(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Mh[r.getMonth()]} ${r.getDate()} ${o}`;return`${Fh(n,t)} \xB7 ${i}`}function jh(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Op(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Lp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Ip=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Dp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Bh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Dp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Uh(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let a=Bh(o);a&&r.push(a)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?Dp(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Wh(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Uh(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Mp(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function zh(e,t){return!e.held||Mp(e,t)<=nl?e:{...e,available:!1,windows:[],accounts:[]}}function Pp(e,t){return`${e}:${t}`}function Np(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function u(){Xe(l``,e),e.hidden=!0,b()}function d(){if(c===null){let he=e.ownerDocument;c=he.createElement("div"),c.id=Nh,c.className="usage-meter__layer",he.body.appendChild(c)}return c}function b(){c!==null&&(Xe(l``,c),c.remove(),c=null)}function v(he){n!==he&&(n===null&&(document.addEventListener("mousedown",x),document.addEventListener("keydown",U),window.addEventListener("resize",M)),n=he)}function h(){n!==null&&(n=null,document.removeEventListener("mousedown",x),document.removeEventListener("keydown",U),window.removeEventListener("resize",M))}function x(he){let ie=he.target;ie&&(e.contains(ie)||c!==null&&c.contains(ie))||(h(),z())}function M(){z()}function U(he){he.key==="Escape"&&(h(),z())}function Y(he){n===he?h():v(he),z()}function ae(){h(),z()}async function G(he,ie){if(r.has(he.key))return;let Se=Pp(he.key,ie);r.set(he.key,ie),a.delete(Se),z();let be=null;try{be=await(await fetch(he.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ie})})).json()}catch{be=null}if(t)return;if(r.delete(he.key),!be||be.ok!==!0){let re=be&&typeof be.error=="string"&&be.error.length>0?be.error:"network_error";a.set(Se,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${re}`}),z();return}let K=Array.isArray(be.warnings)?be.warnings.filter(re=>typeof re=="string"&&re.length>0):[];K.length>0&&a.set(Se,{kind:"warn",text:K.join(" \xB7 ")}),z(),await $e()}function j(he,ie,Se,be){let K=Lp(he.pct),pe=`resets ${Rp(he.resetsAt,be)}${ie?` \xB7 ${Se}`:""}`;return l`<span
      class="usage-meter__window ${Op(K)}"
      style=${`--progress: ${K}%`}
      title=${pe}
    >
      <span class="usage-meter__label">${he.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${K}%</span>
    </span>`}function q(he,ie,Se){let be=Mp(ie,Se),K=ie.available&&(ie.held||be>nl),re=K?`${Math.floor(be/60)}\uBD84 \uC804 \uCE21\uC815`:"",pe=ie.accounts.filter(We=>!We.active).length,ke=`usage-meter__group${K?" usage-meter__group--stale":""}`,je=l`<span class="usage-meter__provider"
        >${he.label}</span
      >
      ${ie.available?ie.windows.map(We=>j(We,K,re,Se)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${pe>0?l`<span class="usage-meter__badge">+${pe}</span>`:""}`;if(ie.accounts.length===0)return l`<span
        class=${ke}
        aria-label=${`${he.label} usage`}
        >${je}</span
      >`;let ge=n===he.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${ke}`}
      aria-label=${`${he.label} usage`}
      aria-expanded=${ge?"true":"false"}
      aria-controls=${Tp}
      @click=${()=>Y(he.key)}
    >
      ${je}
    </button>`}function W(he,ie){return l`<span class="usage-meter" aria-label="Usage">
      ${he.map(Se=>q(Se.provider,Se.snapshot,ie))}
    </span>`}function S(he,ie){let Se=Lp(he.pct),be=Rp(he.resetsAt,ie);return l`<span
      class="usage-meter__account-window ${Op(Se)}"
      style=${`--progress: ${Se}%`}
    >
      <span class="usage-meter__account-key">${he.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Se}%</span>
      <span class="usage-meter__account-reset"
        >${be.length>0?`\u21BB ${be}`:""}</span
      >
    </span>`}function F(he,ie){return qh.includes(ie)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${he.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function oe(he,ie,Se){let be=ie.status==="ok",K=typeof ie.ageSeconds=="number"&&ie.ageSeconds>nl,re=a.get(Pp(he.key,ie.number)),pe=r.get(he.key),ke=pe!==void 0,je=pe===ie.number,ge=["usage-meter__account"];return ie.active&&ge.push("usage-meter__account--active"),be||ge.push("usage-meter__account--unavailable"),K&&ge.push("usage-meter__account--stale"),l`<div class=${ge.join(" ")}>
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
              >${jh(ie.ageSeconds)}</span
            >`}
        ${ie.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ke}
              @click=${()=>{G(he,ie.number)}}
            >
              ${je?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${be?l`<div class="usage-meter__account-windows">
            ${ie.windows.map(We=>S(We,Se))}
          </div>`:l`<div class="usage-meter__account-status">
            ${F(he,ie.status)}
          </div>`}
      ${re===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${re.kind}"
          >
            ${re.text}
          </div>`}
    </div>`}function Te(he,ie,Se){let be=ie.accounts.filter(K=>K.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${he.label} · 활성 ${be} / 전체
        ${ie.accounts.length}
      </h2>
      ${ie.accounts.map(K=>oe(he,K,Se))}
    </section>`}function ye(he,ie){return l`<div
      class="usage-meter__card"
      id=${Tp}
      role="dialog"
      aria-label=${`${he.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${Te(he.provider,he.snapshot,ie)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function z(){let he=Date.now(),ie=[];for(let be of Ip){let K=o.get(be.key);K&&ie.push({provider:be,snapshot:zh(K,he)})}if(ie.length===0){h(),u();return}let Se=ie.find(be=>be.provider.key===n&&be.snapshot.accounts.length>0);Se||h(),Xe(W(ie,he),e),e.hidden=!1,Se?X(Se,he):b()}function X(he,ie){let Se=d(),be=e.getBoundingClientRect(),K=e.ownerDocument.documentElement.clientWidth;Se.style.setProperty("--usage-meter-anchor-top",`${be.bottom}px`),Se.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,K-be.right)}px`),Xe(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ae}
        ></div>
        ${ye(he,ie)}`,Se)}async function ve(he){try{let ie=await fetch(he.endpoint);return ie.ok?Wh(await ie.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function $e(){i+=1;let he=i,ie=await Promise.all(Ip.map(async Se=>({provider:Se,read:await ve(Se)})));if(!(t||he!==i)){for(let Se of ie){let be=Se.provider.key;if(Se.read.kind==="ok"){o.set(be,Se.read.snapshot);continue}if(Se.read.kind==="empty"){o.delete(be);continue}let K=o.get(be);K!==void 0&&!K.held&&o.set(be,{...K,held:!0})}z()}}return u(),$e(),s=setInterval(()=>{$e()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),h(),u()}}}function qp(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Hh="worker-ineligible";function Ms(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Fp(e){return Ms(e).includes(Hh)}var Gh="session-preferred",Kh=["exclusive_machine"];function jp(e,t){if(!Ms(e).includes(Gh)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Kh.includes(n)?n:""}var Vh="worker-serial";function rl(e){return Ms(e).includes(Vh)}function sl(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Yh=new Set(["done","failed","orphaned","stopped","discarded"]),Zh={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Xh={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Qh={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function ol(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Qh[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Bp(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,u=new Map,d=!1,b=null,v=null,h=null,x=new Set,M=!1,U=0,Y=null,ae=new Set;function G(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function j(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function q(){return o&&o()||""}async function W(){if(!s)return;let m=++U;M=!0,h=null,x.clear(),He();try{let w=await s("worker-parallel-analysis-targets",{root_dir:q()});if(m!==U||!Pe)return;let I=Array.isArray(w?.qualified)?w.qualified:[],ee=Array.isArray(w?.excluded)?w.excluded:[];h={qualified:I,excluded:ee};for(let J of I)J&&typeof J.id=="string"&&x.add(J.id)}catch{m===U&&Pe&&(h={qualified:[],excluded:[]},ce("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{m===U&&(M=!1,Pe&&He())}}function S(m){return Array.isArray(m.runs)?m.runs:[]}function F(){let m=G(),w=new Set;for(let I of Object.values(m.attempts||{})){let ee=I;ee&&typeof ee.bead_id=="string"&&!Yh.has(ee.status)&&w.add(ee.bead_id)}for(let I of Array.isArray(m.pr_wait)?m.pr_wait:[])I&&typeof I.bead_id=="string"&&w.add(I.bead_id);for(let I of Object.values(m.discard_operations||{})){let ee=I;ee&&ee.phase!=="done"&&typeof ee.bead_id=="string"&&w.add(ee.bead_id)}return w}function oe(m){return m.filter(w=>Te(w)===null)}function Te(m){let w=G();for(let I of Array.isArray(w.serial_lanes)?w.serial_lanes:[])if(Array.isArray(I?.entries)&&I.entries.some(ee=>ee.bead_id===m))return I.id;return(Array.isArray(w.queue)?w.queue:[]).some(I=>I.bead_id===m)?"parallel":null}function ye(m,w){let I=c.get(m);return I||[...w.order]}function z(m){if(m.length<2)return!1;let w=Te(m[0]);if(!w||w==="parallel")return!1;let I=G(),ee=(Array.isArray(I.serial_lanes)?I.serial_lanes:[]).find(me=>me.id===w)?.entries.map(me=>me.bead_id);if(!Array.isArray(ee))return!1;let J=m.map(me=>ee.indexOf(me));return J.every(me=>me>=0)&&J.every((me,Re)=>Re===0||me>J[Re-1])}function X(){let m=G(),w=Array.isArray(m.serial_lanes)?m.serial_lanes:[],I=w.find(ee=>Array.isArray(ee.entries)&&ee.entries.length===0);return I?I.id:w[0]?.id||"s1"}function ve(m){let w=G().bead_titles||{};return typeof w[m]=="string"?w[m]:m}async function $e(m,w){if(!s||d)return null;d=!0,He();try{return await s(m,w)}finally{d=!1,He()}}async function he(m){r?.setPending?.(!0);try{let w=await $e("worker-parallel-analysis-start",{force:m,target_ids:Array.from(x)});w&&w.applied===!1&&w.reason&&(w.reason==="target_not_qualified"&&Array.isArray(w.detail)?ce(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${w.detail.join(", ")}`,"error",3200):ce(`\uBD84\uC11D \uC2E4\uD328: ${w.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ie(){let m=j().job;!s||!m||await s("worker-parallel-analysis-cancel",{job_id:m.job_id})}async function Se(m){if(!(!s||ae.has(m))){ae.add(m),He();try{let w=await s("worker-parallel-analysis-prompt",{root_dir:q(),run_id:m});if(!Pe)return;if(w?.ok===!0&&typeof w.prompt=="string"){Y={run_id:m,prompt:w.prompt};return}ce(w?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{ae.delete(m),He()}}}function be(){Y=null,He()}async function K(){if(!Y)return;let m=await fn(Y.prompt);ce(m?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",m?"success":"error",1400)}function re(m,w){a&&a(m,ol(w))}function pe(){return G().runner_catalog}function ke(m){return Object.keys(pe()?.runners?.[m]?.models||{})}function je(m){let w=ke(m),I=pe()?.runners?.[m]?.default_model;return typeof I=="string"&&w.includes(I)?I:w[0]||""}function ge(){let m=j().settings,w=b||m.runner||"claude",I=ke(w),ee=b?je(w):m.model||I[0]||"",J=sl(pe(),w,ee),me=m.effort||"",Re=J.includes(me)?me:J[0]||"";return{runner:w,model:ee,effort:Re,models:I,efforts:J}}async function We(m){let w=j().settings,I=await $e("worker-parallel-analysis-settings-update",{expected_revision:w.revision,runner:m.runner,model:m.model,effort:m.effort});(!I||I.applied!==!0)&&(b=null,He(),I&&I.reason&&ce(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${I.reason}`,"error",2800))}function D(m){b=m,He();let w=ge();We({runner:m,model:w.model,effort:w.effort})}function ue(m){let w=ge(),I=sl(pe(),w.runner,m);We({runner:w.runner,model:m,effort:I.includes(w.effort)?w.effort:I[0]||""})}function qe(m){let w=ge();We({runner:w.runner,model:w.model,effort:m})}async function Be(m,w){if(!s||d)return;let I=ye(m,w),ee=j();if(I.length<2||!ee.last_good){ce("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let J=u.get(m)||X(),me=()=>({snapshot_digest:ee.last_good.identity_digest,group_index:m,lane:J,ordered_bead_ids:I,expected_revision:G().revision});d=!0,He();try{let Re=await s("worker-parallel-analysis-submit",me());Re&&Re.queue&&n&&n.set(Re.queue),Re&&Re.applied!==!0&&Re.conflict===!0&&(Re=await s("worker-parallel-analysis-submit",me()),Re&&Re.queue&&n&&n.set(Re.queue)),Re&&Re.applied===!0?(c.delete(m),ce(`\uC9C1\uB82C \uB808\uC778 ${J}\uC5D0 ${I.length}\uAC1C \uBC30\uCE58`,"success")):ce(`\uC81C\uCD9C \uAC70\uBD80: ${Re?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,He()}}function Me(m,w,I){c.set(m,ye(m,w).filter(ee=>ee!==I)),He()}function Ke(m){c.delete(m),He()}function Ve(m,w,I,ee){let J=[...ye(m,w)],me=J.indexOf(I),Re=me+ee;me<0||Re<0||Re>=J.length||(J.splice(Re,0,...J.splice(me,1)),c.set(m,J),He())}function Qe(){let m=j().settings,w=Object.keys(pe()?.runners||{}),I=ge();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${ee=>D(ee.target.value)}
        >
          ${w.map(ee=>l`<option
                value=${ee}
                ?selected=${I.runner===ee}
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
          @change=${ee=>ue(ee.target.value)}
        >
          ${I.models.map(ee=>l`<option
                value=${ee}
                ?selected=${I.model===ee}
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
          @change=${ee=>qe(ee.target.value)}
        >
          ${I.efforts.map(ee=>l`<option
                value=${ee}
                ?selected=${I.effort===ee}
              >
                ${ee}
              </option>`)}
        </select>
      </label>
      ${it(m)}
    </div>`}function it(m){return!kt(m)||pt(m)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:m.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${m.runner}/${m.model} · effort
        ${m.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:m.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function pt(m){return m.is_default===!0&&m.compatible===!1}function kt(m){return!!(m.runner&&m.model&&m.effort)}function ft(m){return kt(m)&&m.compatible!==!1}function Q(m){let w=Math.max(0,Math.floor(m/1e3)),I=Math.floor(w/60),ee=w%60;return`${I}:${String(ee).padStart(2,"0")}`}function ne(m){let w=m.job;if(w){let I=typeof w.started_at=="number"?w.started_at:0,ee=`${w.runner||"?"}/${w.model||"?"}`,J=I?` \xB7 \uACBD\uACFC ${Q(Date.now()-I)}`:"",me=typeof w.session_id=="string"?w.session_id:"",Re=S(m).find(xe=>xe.run_id===w.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${ee} · effort ${w.effort||"?"}${J}</span
        >
        ${me?l`<code class="pa-session-id" title=${me}
              >${me.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>re(w.job_id,Re||w)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Re?.prompt_saved!==!0||ae.has(w.job_id)}
          @click=${()=>{Se(w.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Ne()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Oe(m){let w=ne(m);return w===""?"":l`<div class="pa__strip">${w}</div>`}function Ne(){return r?.isPending?.()===!0}function Ce(m){let w=!!m.job,I=ft(m.settings),ee=h!==null&&x.size===0,J=w||d||Ne()||M;return l`<div class="pa-meta">
      ${m.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(m.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!I||J||ee}
        @click=${()=>{he(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!I||J||ee}
        @click=${()=>{he(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!w}
        @click=${()=>{ie()}}
      >
        취소
      </button>
    </div>`}function Ie(m){return typeof m=="string"&&m.length>0?m:"\uBBF8\uBC30\uCE58"}function Fe(m,w){w?x.add(m):x.delete(m),He()}function st(m){let w=Array.isArray(m.scope)?m.scope:[],I=Array.isArray(m.overlaps)?m.overlaps:[];return w.length===0&&I.length===0?l``:l`<span class="pa-target__signals">
      ${w.length>0?l`<details class="pa-target__scope" title=${w.join(`
`)}>
            <summary>scope ${w.length}</summary>
            <ul>
              ${w.map(ee=>l`<li><code>${ee}</code></li>`)}
            </ul>
          </details>`:""}
      ${I.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${I.join(", ")}`}
            >겹침 ${I.join(", ")}</span
          >`:""}
    </span>`}function et(){let m=h?.qualified||[],w=h?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${M?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${m.length} \xB7 \uC81C\uC678 ${w.length}`}</span
        >
      </header>
      ${h&&m.length>0?l`<ul class="pa-targets__list">
            ${m.map(I=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${I.id}
                      .checked=${x.has(I.id)}
                      @change=${ee=>Fe(I.id,ee.target.checked)}
                    />
                    <span class="pa-target__title">${I.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${st(I)}
                    <span class="pa-target__route">${I.route}</span>
                    <span class="pa-target__lane"
                      >${Ie(I.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:h&&m.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${h&&w.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${w.length}</summary>
            <ul class="pa-targets__list">
              ${w.map(I=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${I.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Zh[I.reason]||I.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${Ie(I.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function Je(m){let w=typeof m.session_id=="string"&&m.session_id.length>0,I=w?m.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${m.outcome}"
        >${Xh[m.outcome]||m.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(m.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${m.runner||"?"} / ${m.model||"?"} / ${m.effort||"?"}</span
      >
      ${w?l`<code class="pa-session-id" title=${I}
            >${I.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${m.outcome==="failure"&&m.reason?l`<span class="pa-run-row__reason">${m.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>re(m.run_id,m)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${m.prompt_saved!==!0||ae.has(m.run_id)}
          @click=${()=>{Se(m.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function bt(m){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${m.length>0?l`<ul class="pa-runs__list">
            ${m.map(w=>Je(w))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function It(){return Y?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${be}></div>
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
              @click=${be}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Y.prompt}</pre
        >
      </section>
    </div>`:""}function _t(m,w){let I=ye(m,w),ee=F(),J=I.filter(Ae=>ee.has(Ae)),me=oe(I),Re=z(I),xe=Array.isArray(G().serial_lanes)?G().serial_lanes:[],ot=u.get(m)||X(),dt=w.eligible!==!0||I.length<2||J.length>0||me.length>0||Re||d;return l`<section class="pa-group" data-group-index=${String(m)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${w.confidence}</span>
        ${w.categories.map(Ae=>l`<span class="pa-group__category">${Ae}</span>`)}
        ${Re?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${w.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${me.length>0?l`<span class="pa-group__stale"
              >stale — ${me.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${w.reason}</p>
      <ol class="pa-group__members">
        ${I.map((Ae,Nt)=>l`<li class="pa-member" data-bead-id=${Ae}>
              <span class="pa-member__seq">${Nt+1}</span>
              <span class="pa-member__title">${ve(Ae)}</span>
              ${ee.has(Ae)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ae}
                ?disabled=${Nt===0}
                aria-label=${`${Ae} \uC704\uB85C`}
                @click=${()=>Ve(m,w,Ae,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ae}
                ?disabled=${Nt===I.length-1}
                aria-label=${`${Ae} \uC544\uB798\uB85C`}
                @click=${()=>Ve(m,w,Ae,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ae}
                aria-label=${`${Ae} \uC81C\uC678`}
                @click=${()=>Me(m,w,Ae)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${w.evidence.map(Ae=>l`<li class="pa-evidence">
              <code>${Ae.path}</code>
              <span class="pa-evidence__locator">${Ae.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Ke(m)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ae=>{u.set(m,Ae.target.value),He()}}
          >
            ${xe.map((Ae,Nt)=>l`<option
                  value=${Ae.id}
                  ?selected=${ot===Ae.id}
                >
                  직렬 ${Nt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${dt}
          @click=${()=>{Be(m,w)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Mt(m){let w=Array.isArray(m.issues)?m.issues:[],I=w.filter(J=>J.verdict==="parallel_ok").length,ee=w.filter(J=>J.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${I}</span>
      <span>uncertain ${ee}</span>
    </div>`}function ht(){let m=Pe&&!!j().job;if(m&&v===null){v=setInterval(()=>He(),1e3);return}!m&&v!==null&&(clearInterval(v),v=null)}function He(){let m=j();b&&m.settings.runner===b&&(b=null);let w=m.last_good?.result;ht(),Xe(l`
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
          ${Oe(m)}
          <div class="pa__body">
            ${Qe()} ${Ce(m)} ${et()}
            ${w?l`${w.groups.map((I,ee)=>_t(ee,I))}
                ${w.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Mt(w)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${bt(S(m))}
          </div>
        </div>
        ${It()}
      `,i)}let Pe=!1,P=()=>{Pe=!1,Y=null,U+=1,ht()},Z=m=>{m.target===m.currentTarget&&fe()};i.addEventListener("close",P),i.addEventListener("cancel",P),i.addEventListener("click",Z);let _e=null;n&&n.subscribe&&(_e=n.subscribe(()=>{Pe&&He()}));let T=null;r&&r.subscribe&&(T=r.subscribe(()=>{Pe&&He()}));function V(){Pe||(Pe=!0,He(),W(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function fe(){Pe&&(Pe=!1,Y=null,U+=1,ht(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:V,close:fe,destroy(){Pe=!1,v!==null&&(clearInterval(v),v=null),i.removeEventListener("close",P),i.removeEventListener("cancel",P),i.removeEventListener("click",Z),_e&&(_e(),_e=null),T&&(T(),T=null),i.remove()}}}function Up(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let c=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(c.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:c})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let c=ua(s[a].scope,s[i].scope);if(c.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:c}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:c})}return n}function al(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",c=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&c&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&c&&a===null){let u=Jh(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!c?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function Jh(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Wp=new Set(["sh","bash","zsh","dash","ksh"]),zp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Hp(e){let t=e.split("/");return t[t.length-1]||""}function ey(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Hp(n[0]);if(r!=="env")return Wp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Wp.has(Hp(s))}function ty(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function ny(e){let t=[],n=0;zp.lastIndex=0;for(let r of e.matchAll(zp)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:ty(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function ry(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Gp(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",c=0,u=null,d=!1;function b(q,W){return W?ny(q).map(S=>S.kind==="plain"?S.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${S.kind}"
            >${S.text}</span
          >`):q}function v(){if(!s)return l``;let q=o==="ready"&&ey(a),W=o==="ready"?a.split(`
`):[];return l`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>G()}
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
              @click=${()=>G()}
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
                  ${W.map((S,F)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${F+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${b(S,q)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function h(){Xe(v(),r)}async function x(){if(o!=="ready")return;let q=await fn(a);ce(q?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",q?"success":"error")}function M(q){q.key==="Escape"&&s&&(q.preventDefault(),G())}function U(){d||(document.addEventListener("keydown",M),d=!0)}function Y(){d&&(document.removeEventListener("keydown",M),d=!1)}async function ae(q,W=null){let S=++c;U(),s={...q},u=W||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",h(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let oe=t?t():"";if(!oe){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",h();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",h();return}let Te="/api/repo-ops-script?workspace="+encodeURIComponent(oe)+"&lane="+encodeURIComponent(q.lane)+"&base_sha="+encodeURIComponent(q.base_sha);try{let ye=await n(Te),z=await ye.json().catch(()=>({}));if(S!==c)return;if((t?t():"")!==oe){G();return}if(!ye.ok||!z||z.ok!==!0){o="error",i=ry(z&&typeof z.error=="string"?z.error:""),h();return}s={lane:z.lane,base_sha:z.base_sha,path:z.path,base_ref:z.base_ref},a=String(z.content),o="ready",h()}catch{if(S!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",h()}}function G(){c+=1,Y(),s=null,a="",h();let q=u;u=null,q?.isConnected&&q.focus()}function j(){G(),r.remove()}return{open:ae,close:G,destroy:j}}function Kp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let S=o();return typeof S.revision=="number"?S.revision:0}function i(S){t&&S&&S.queue&&typeof S.queue=="object"&&t.set(S.queue)}function c(){let S=o().workspace_info;return S&&typeof S=="object"?S:{}}function u(S,F){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${S}"
      >${F}</span
    >`}function d(S){if(typeof S!="number"||!Number.isFinite(S))return"";let F=S/6e4;return Number.isInteger(F)?`timeout ${F}\uBD84`:`timeout ${Math.round(S/1e3)}\uCD08`}function b(S){let F=d(S);return F?u("config",F):""}function v(S,F,oe){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${oe.script}
      @click=${Te=>{s&&s({lane:S,base_sha:F.base_sha,path:oe.script,base_ref:F.base_ref},Te.currentTarget)}}
    ></button>`}function h(){let S=o().repo_ops_opt_out;return{verify:S?.verify===!0,deploy:S?.deploy===!0}}function x(S,F){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!F}
        @change=${oe=>{ae(S,!oe.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function M(S){let F=typeof S.base_sha=="string"?S.base_sha:"",oe=`${S.source_path||"repo-ops/config.toml"} @ ${S.base_ref||"?"}${F?`@${F.slice(0,7)}`:""}`,Te=h(),ye=!!S.verify&&Te.verify,z=!!S.deploy&&Te.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${oe}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ye?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${S.verify?l`${v("verify",S,S.verify)}
              ${b(S.verify.timeout_ms)}
              ${ye?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ye?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":S.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${S.verify?x("verify",Te.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${z?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${S.deploy?l`${v("deploy",S,S.deploy)}
              ${b(S.deploy.timeout_ms)}
              ${z?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${z?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":S.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${S.deploy?x("deploy",Te.deploy):""}
      </div>
    </section>`}function U(S){let F=S.repo_ops&&typeof S.repo_ops=="object"?S.repo_ops:null;return F&&(F.status==="resolved"||F.status==="absent")?M(F):F&&(F.status==="pending"||F.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function Y(S){if(!n)return;let F=await n("worker-auto-repair-toggle",{on:S,expected_revision:a()});if(i(F),F&&F.conflict){let oe=await n("worker-auto-repair-toggle",{on:S,expected_revision:a()});i(oe)}r()}async function ae(S,F){if(!n)return;let oe=await n("worker-repo-ops-opt-out-toggle",{kind:S,opted_out:F,expected_revision:a()});if(i(oe),oe&&oe.conflict){let Te=await n("worker-repo-ops-opt-out-toggle",{kind:S,opted_out:F,expected_revision:a()});i(Te)}r()}let G={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function j(S,F,oe){return l`<div class="worker-repo-ops__policy-group" data-policy=${oe}>
      <div class="worker-repo-ops__policy-label">${S}</div>
      <ul class="worker-repo-ops__policy-list">
        ${F.map(Te=>l`<li data-token=${Te}>
              ${G[Te]||Te}
            </li>`)}
      </ul>
    </div>`}function q(S){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${S.map(F=>{let oe=[G[F.trigger]||F.trigger];return Number.isInteger(F.attempts_per_operation_attempt)?oe.push(`operation\uB2F9 ${F.attempts_per_operation_attempt}\uD68C`):Number.isInteger(F.attempts)?oe.push(`${G[F.budget]||F.budget} ${F.attempts}\uD68C`):Number.isInteger(F.sessions_per_user_action)&&oe.push(`${F.sessions_per_user_action}\uD68C`,G[F.user_actions]||F.user_actions),F.applies_when&&oe.push(G[F.applies_when]||F.applies_when),l`<li data-token=${F.id}>
            <strong>${G[F.id]||F.id}</strong>
            <span>${oe.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function W(){let S=o(),F=S.auto_repair!==!1,oe=S.repo_operation_policy&&typeof S.repo_operation_policy=="object"?S.repo_operation_policy:null,Te=Array.isArray(S.repo_operations)?S.repo_operations:[],ye=Te.find($e=>$e.state==="repairing"),z=Te.filter($e=>$e.state==="failed"||$e.state==="repairing"),X=z.length?Math.min(...z.map($e=>typeof $e.repair?.remaining=="number"?$e.repair.remaining:0)):oe?.auto_repair?.resolution_ladder?.find($e=>$e.id==="auto_repair_session")?.attempts??1,ve=Array.isArray(oe?.auto_repair?.resolution_ladder)?oe.auto_repair.resolution_ladder:[];return l`<section
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
          @change=${$e=>{Y($e.target.checked)}}
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
          >남은 자동 해결 ${X}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${ye?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${ye.repair?.owner_bead||ye.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${oe?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(oe.worker_automatic||[]).length} · 해결 사다리
                ${ve.length} · 금지
                ${(oe.never_automatic||[]).length}</span
              >
            </summary>
            ${j("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",oe.worker_automatic||[],"worker-automatic")}
            ${oe.supported===!1||oe.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${oe.schema_version})`}
                </div>`:q(ve)}
            ${j("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",oe.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${U(c())} ${W()}
      </details>`}}}var Xp=20,sy=5,oy=new Set(["failed","repairing","running","queued","retry_pending"]),Vp={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Yp={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function ay(e,t,n=Xp){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function iy(e){if(e.type==="cleanup")return!0;let t=e.operation;return oy.has(t.state)&&!t.dismissed&&!t.superseded_by}function ly(e,t,n={}){let r=ay(e,t,1/0),s=n.expanded===!0?Xp:sy,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||iy(i));return{visible:a,hidden:r.length-a.length}}function Zp(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function cy(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Qp(e){let t=e.filter(n=>n.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>l`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Jp(e,t="",n=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function uy(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Yp,r)?Yp[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function dy(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Kt(e.at):""}
      >${Zo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Zp(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Vp,t.kind)?Vp[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Ko(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Ts(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Zp(e)}"
          >${cy(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?Jp(Sd(t.failure_kind,r)):""}
      ${uy(t)}
      ${Qp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ko(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function py(e){let t=e.cleanup,n=yr(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Kt(e.at):""}
      >${Zo(e.at)||"\u2014"}</span
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
        ${Yd(t.step).map(r=>l`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Jp(na(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Qp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function fy(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?py(r):dy(r))}
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
  </section>`}function ef(e,t={}){let n=null;function r(){if(n===null){Xe(l``,e);return}let a=ly(n.operations,n.cleanup_failures,{expanded:n.expanded});Xe(fy({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var _y=Lt("views:worker"),my="tab:worker:ready",gy="tab:worker:blocked",by="tab:worker:in-progress",hy="tab:worker:resolved",yy="tab:worker:closed",ga=1,tf=5;function nf(e){return Io(e).path.length>0}var vy=new Set(["quick_fix","spec_backed","full_plan"]);function rf(e){return typeof e=="string"&&vy.has(e)}var lf="beads-ui.worker.candidate-filter",il={show_blocked:!1,spec:"all"};function wy(){try{let e=window.localStorage.getItem(lf);if(!e)return{...il};let t=JSON.parse(e);if(!t||typeof t!="object")return{...il};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...il}}}function ky(e){try{window.localStorage.setItem(lf,JSON.stringify(e))}catch{}}function $y(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=n(i),u=r(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var xy=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],cf="bdui.worker.candidate_sort",Ay=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],ba="spec";function Sy(){try{let e=window.localStorage.getItem(cf);return e==="board"||e==="created"||e==="spec"?e:ba}catch{return ba}}function Ey(e){try{window.localStorage.setItem(cf,e)}catch{}}var uf="bdui.worker.done-range";function Ty(){try{let e=window.localStorage.getItem(uf);return e===null?"today":Rn(e)}catch{return"today"}}function Cy(e){try{window.localStorage.setItem(uf,e)}catch{}}var Ry="(max-width: 640px)",df="beads-ui.worker.lane-collapsed",Ns={queue:!0,done:!0};function Oy(){try{let e=window.localStorage.getItem(df);if(!e)return{...Ns};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ns}:{queue:typeof t.queue=="boolean"?t.queue:Ns.queue,done:typeof t.done=="boolean"?t.done:Ns.done}}catch{return{...Ns}}}function Ly(e){try{window.localStorage.setItem(df,JSON.stringify(e))}catch{}}function sf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Iy(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(fr):(r.sort(no(n)),t==="board"?r:[...r.filter(nf),...r.filter(s=>!nf(s))])}function Py(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Dy(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function of(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function My(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Ny(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function qy(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Fy(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function jy(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function ll(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var By=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Uy=new Set(["waiting_metadata","reviewing","retrying"]);function Wy(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?Kt(r.next_at):"",c=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",c?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${c}`:""].filter(Boolean),live:!0}}default:return null}}function zy(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Hy(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let c=zy(e.terminal_reason);c&&i.push(`\uC6D0 \uC0AC\uC720: ${c}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!By.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function af(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Gy(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(af(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${af(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=My(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${of(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${of(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Ky(e,t,n,r,s=null,o=null,a=null,i=!1,c=null,u=!0,d=null,b=null,v=null,h={},x=!1,M=!1,U={}){let Y=!!c&&c.position>0,ae=!!c?.continuation_action&&c.continuation_action.continuation===null,G=!!c&&c.active===!0,j=c&&c.failure||null,q=qy(c?c.waiting:null,v),W=n[e]||null,S=W&&W.gate?W.gate:null,F=W&&W.pr?W.pr:null,oe=Fy(c?c.resolution:null),Te=jy(c?c.head_review:null),ye=c&&c.head_review||null,z=Wy(v,ye),X=Hy(v,z),ve=c&&c.authority||null,$e=!!ye&&["pending","reviewing","revising"].includes(ye.state),he=!!v&&typeof v=="object"&&Uy.has(v.phase),ie=Y&&!G&&(ye?.state==="failed"||!ve||he||ve.source==="automatic"&&!M),Se=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":oe?oe.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":q,be=!!S&&S.base_badge==="\uCDA9\uB3CC",K=!!S&&S.enabled===!0,re=Ps({bead_id:e,merge_sha:U.merge_sha,cleanup_cursor:U.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:U.repo_operations}),pe=fa(re),ke=o&&!re&&(o.queueing??null)?o.queueing:null,je=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!S&&S.tier==="merged",ge=i&&!!r&&!!S&&S.tier==="merged",We=ie&&(K||be||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||S?.reason==="review_receipt_undetermined"||je||ge),D=i&&be&&u===!1,ue=Tn(h,e,{external:i,merge_active:G||re?.step==="merge",merge_queued:Y,conflict_active:!!a,cleanup_active:pe,merged:!!r||S?.tier==="merged"}),qe=!!ue.operation,Be=!je&&!!r&&r.step==="repo_operations",Me=Gy({continuation_required:ae,queueing:ke,merge_step:re,conflict_badge:Se,conflict_live:oe?.live===!0||a==="running",head_review:ye&&Te?{...Te,state:ye.state,failure_reason:ye.failure_reason}:null,auto_resolution:z,recovery:X,cleanup_failed:r,cleanup_label:r?yr(r.step):null,base_exception:b,conflicting:be,gate:S,receipt_check:W&&W.receipt_check?W.receipt_check:null,queue_failure:j,auto_skip:d,queued:Y,queue_active:G,queue_position:c?c.position:0,activity:Se?null:o&&o.activity||null}),Ke=Me?.live===!0&&Me.title?l`<span title=${Me.title}>${Me.label}</span>`:Me?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:r&&re?.active!==!0?pa(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:x,external:i,pr_number:F&&typeof F.number=="number"?F.number:null,pr_url:F&&typeof F.url=="string"?F.url:"",completion_badge:Me?.live!==!0&&Me?.title?Me.label:null,completion_title:Me?.title||"",completion_repair_pr_url:X?X.repair_pr_url:"",completion_repair_pr_number:X?X.repair_pr_number:null,badges:Ke?[Ke]:[],live_badge:Me?.live===!0?Ke:null,usage:s,alert:Me?.alert===!0,merge_action:S?.tier==="merged"&&!je&&!ge||Be?!1:!Y||ae||ie,timeline_action:Be,cancel_action:Y&&!ae,cancel_enabled:(!G||$e)&&!(X&&X.lock_actions),cancel_title:X&&X.lock_actions?`${X.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:G&&!$e?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":$e?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ue,discard_action:ue.action,merge_step:re,discard_enabled:ue.enabled,discard_title:ue.title,merge_enabled:!re&&!ke&&!a&&!qe&&!b&&!(X&&X.lock_actions)&&!D&&!Be&&(K||be||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||S?.reason==="review_receipt_undetermined"||je||ge||We||he&&!G),merge_label:ae?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":je||ge?"\uC815\uB9AC \uC7AC\uAC1C":be&&!re&&!je?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":S?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ie?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:qe?ue.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ue.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ue.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ae?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ke?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":re?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${re.label}`:ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":D?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":je?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":be?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":S?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":K?`\uBA38\uC9C0 (${S.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:S&&S.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${S&&S.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function cl(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,openDoc:d,doneRange:b,onDoneRangeChange:v}=t,h=r?so(r,i):null,x=lo({transport:n,uiOrderStore:i}),M=null,U=[],Y=wy(),ae=null,G=null,j={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},q=Sy(),W=b?Rn(b):Ty(),S=new Map;function F(){let f=Tr.find($=>$.value===W);return f?f.label:"\uC624\uB298"}let oe=Oy(),Te=!1,ye=new Set,z=new Set,X=new Set,ve=new Set,$e=new Set,he={},ie=null,Se=0,be=null,K=[];function re(f){return ie===f?he:{}}async function pe(){if(!n)return;let f=u?.()||"";if(ie===f||be&&be.key===f&&be.generation===Se)return;let $=++Se;be={key:f,generation:$};let N=null;try{N=await Promise.resolve(n("get-session-defaults",{}))}catch(se){if($!==Se)return;be=null,_y("get-session-defaults failed: %o",se),Ge();return}$===Se&&(he=N&&typeof N.values=="object"&&N.values!==null?{...N.values}:{},ie=f,be=null,Ge())}function ke(){ie=null,Se+=1,pe()}let je=document.createElement("div");je.className="worker-console";let ge=document.createElement("div");ge.className="worker-top";let We=document.createElement("div");We.className="worker-drawer-overlay",We.hidden=!0;let D=document.createElement("div");D.className="worker-drawer-overlay__backdrop";let ue=document.createElement("div");ue.className="worker-drawer-host";let qe=document.createElement("div");qe.className="worker-drawer-host",qe.hidden=!0,We.append(D,ue,qe);let Be=document.createElement("div");Be.className="worker-lanes-host",je.append(ge,We,Be),e.appendChild(je);let Me=null,Ke=null,Ve=Br(ue,{transport:n,sessionLogStore:a,onClose:()=>{Me=null,Ke=null,We.hidden=!0,Ge()}}),Qe=ef(qe,{onClose:()=>{qe.hidden=!0,We.hidden=!0,Ge()}}),it=Gp({getWorkspacePath:u||(()=>"")}),pt=u&&u()||"",kt=Kp({queueStore:s,transport:n,onChanged:()=>Ge(),onOpenScript:(f,$)=>{it.open(f,$)}}),ft=o?Bp(je,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(f,$)=>gn(f,$)}):null;function Q(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:ga,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ne(){let f=Q(),$=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,N=Array.isArray(f.serial_lanes)?f.serial_lanes:[],se=[];for(let _ of N){if(se.length>=$)break;!_||typeof _.id!="string"||!/^s[1-5]$/.test(_.id)||!Array.isArray(_.entries)||se.push({id:_.id,label:`\uC9C1\uB82C ${_.id.slice(1)}`,count:_.entries.length})}return se.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},...se]}function Oe(f){if(!ae||!f.some(N=>N.id===ae))return null;let $=ne();return $?{bead_id:ae,lanes:$}:null}function Ne(){let f=Q();return typeof f.revision=="number"?f.revision:0}function Ce(f){f&&f.queue&&s&&s.set(f.queue)}function Ie(){let f=Q().queue;return Array.isArray(f)?f.length:0}async function Fe(f,$,N){if(!n)return;let se=()=>({bead_id:f,...$==="parallel"?{}:{lane:$},...N===void 0?{}:{index:N},expected_revision:Ne()}),p=await n("worker-queue-place",se());Ce(p),p&&p.conflict&&await n("worker-queue-place",se()).then(Ce)}async function st(f,$,N){if(!n)return;let se=()=>({bead_id:f,...$==="parallel"?{}:{lane:$},to_index:N,expected_revision:Ne()}),p=await n("worker-queue-reorder",se());Ce(p),p&&p.conflict&&await n("worker-queue-reorder",se()).then(Ce)}async function et(f){if(!n)return;let $=await n("worker-queue-remove",{bead_id:f,expected_revision:Ne()});Ce($),$&&$.conflict&&await n("worker-queue-remove",{bead_id:f,expected_revision:Ne()}).then(Ce)}async function Je(f){if(!n||!f)return;let $=await n("worker-attempt-pause",{attempt_id:f});$&&$.paused===!1&&$.reason&&ce(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${$.reason}`,"error",2400)}async function bt(f){if(!n||!f)return;let $=await Mr();if($===null)return;let N=async(p={})=>await n("worker-attempt-resume",{attempt_id:f,expected_revision:Ne(),...$!==""?{instructions:$}:{},...p}),se=await N();Ce(se),se&&se.conflict&&(se=await N(),Ce(se)),se=await Fn(se,(p,_)=>N({continuation:p,decision_token:_}),{onResult:Ce,refresh:()=>N()}),se&&se.resumed===!1&&!se.conflict&&se.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${se.reason}`,"error",2400)}async function It(f){if(!n||!f)return;let $=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:Ne()});Ce($),$&&$.conflict&&($=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:Ne()}),Ce($)),$&&$.dismissed===!1&&!$.conflict&&$.reason&&ce(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${$.reason}`,"error",2400)}async function _t(f,$,N=!0){if(!n)return null;let se=n,p=await se(f,{...$,expected_revision:Ne()});return Ce(p),p&&p.conflict&&N&&(p=await se(f,{...$,expected_revision:Ne()}),Ce(p)),p}async function Mt(f){if(!n||!f)return;let $=Q().merge_queue?.find(se=>se.bead_id===f)?.continuation_action;if($?.mismatch&&$.continuation===null){await He(f,$.mismatch);return}ye.add(f),Ge();let N;try{N=await _t("worker-merge-queue-add",{bead_id:f})}catch{ce("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ye.delete(f),Ge()}if(!(!N||N.applied)){if(N.conflict){ce("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ce(Ny(N.reason),"error",2400)}}async function ht(f){if(!(!n||!f||z.has(f))){z.add(f),Ge();try{let $=await n("worker-cleanup-retry",{bead_id:f,expected_revision:Ne()});Ce($),$&&!$.retried&&!$.conflict&&$.reason&&ce(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${$.reason}`,"error",2400)}finally{z.delete(f),Ge()}}}async function He(f,$){let N=await Fn({continuation_mismatch:$},(p,_)=>_t("worker-merge-queue-add",{bead_id:f,continuation:p,decision_token:_},!1)),se=N?.queue?.merge_queue?.find(p=>p.bead_id===f)?.continuation_action;if(N?.applied!==!0&&se?.continuation===null&&se.mismatch){await He(f,se.mismatch);return}N&&N.applied===!1&&!N.conflict&&ce("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Pe(f){if(!n)return;let $=await _t("worker-merge-auto-toggle",{on:f});!$||$.conflict||ce(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function P(f){if(!n||!f)return;let $=await _t("worker-merge-queue-remove",{bead_id:f});$&&!$.conflict&&!$.applied&&$.reason==="merge_active"&&ce("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Z(){await _t("worker-merge-queue-remove",{all:!0})}async function _e(f,$=null,N="unmerged",se=null){if(!n||!f)return;let p=Cs(f,N);if(!(!!se||typeof globalThis.confirm!="function"||globalThis.confirm(p)))return;let k=await n("worker-discard",{bead_id:f,...$?{attempt_id:$}:{},...se?{operation_id:se}:{},expected_revision:Ne()});if(Ce(k),k&&k.conflict&&(k=await n("worker-discard",{bead_id:f,...$?{attempt_id:$}:{},...se?{operation_id:se}:{},expected_revision:Ne()}),Ce(k)),k&&k.discarded===!0){ce(Xo(k),"success",5e3);return}if(k&&k.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${k.reason}`,"error",2800);return}if(k&&k.accepted&&k.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(k&&k.accepted&&!k.discarded){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${k.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}k&&!k.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function T(f,$,N){if(!(!n||!$||!N||ve.has($))){ve.add($),Ge();try{let se=await n(f,{bead_id:$,action_id:N,expected_revision:Ne()});Ce(se),se?.conflict?ce("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!se?.ok&&se?.reason&&ce(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(se.reason)}`,"error",2800)}finally{ve.delete($),Ge()}}}async function V(f,$){if(!n||!$||X.has($))return;X.add($),Ge();let N;try{let se=async(p={})=>await n(f,{bead_id:$,expected_revision:Ne(),...p});N=await se(),Ce(N),N&&N.conflict&&(N=await n(f,{bead_id:$,expected_revision:Ne()}),Ce(N)),f==="worker-revise-fix"&&(N=await Fn(N,(p,_)=>se({continuation:p,decision_token:_}),{onResult:Ce,refresh:()=>se()}))}finally{X.delete($),Ge()}if(!(!N||N.conflict)){if(N.ok){ce(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ce(`\uCC98\uBD84 \uAC70\uBD80: ${N.reason||""}`,"error",3e3)}}async function fe(f){if(!n)return;let $=await n("worker-automation-toggle",{on:f,expected_revision:Ne()});Ce($),$&&$.conflict&&await n("worker-automation-toggle",{on:f,expected_revision:Ne()}).then(Ce)}async function m(f){if(!n||!f)return;let $=await n("worker-repo-operation-repair",{operation_id:f});if(Ce($),$&&$.ok===!1){ce(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${$.reason||""}`,"error",3e3);return}$&&$.ok===!0&&ce("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function w(f){if(!n||!f)return;let $=await n("worker-repo-operation-dismiss",{operation_id:f});Ce($),$&&$.ok===!1&&ce(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${$.reason||""}`,"error",3e3)}async function I(f){if(!n||!Number.isFinite(f))return;let $=Math.max(ga,Math.floor(f)),N=await n("worker-queue-set-slots",{slots:$,expected_revision:Ne()});Ce(N),N&&N.conflict&&await n("worker-queue-set-slots",{slots:$,expected_revision:Ne()}).then(Ce)}async function ee(f){if(!n||!Number.isInteger(f)||f<1||f>tf)return;let $=Q(),N=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).slice(f).reduce((_,k)=>_+(Array.isArray(k?.entries)?k.entries.length:0),0),se=()=>({count:f,expected_revision:Ne()}),p=await n("worker-queue-set-serial-lane-count",se());Ce(p),p&&p.conflict&&(p=await n("worker-queue-set-serial-lane-count",se()),Ce(p)),p&&p.applied&&N>0&&ce(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${N}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let J="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function me(f,$){let N=al(f,$.id,j);return{id:$.id,title:$.title,location_label:$.location_label,prefixes:$.prefixes,action:N.kind==="note"?{kind:"note",text:N.text}:N.kind==="disabled"?{kind:"disabled",label:J,title:N.title}:{kind:"place",label:J,title:N.title}}}function Re(f,$){if(!G||G.bead_id!==f)return null;let N=G.counterpart_id,se=$.filter(p=>p.id===N);return se.length===0?null:{rows:se.map(p=>me(f,p))}}async function xe(f,$){let N=al(f,$,j);if(G=null,N.kind!=="ops"){Ge();return}let se=Ne();for(let p of N.ops){let _=await ot(p,se);if(_===null)break;se=_}Ge()}async function ot(f,$){if(!n)return null;try{let N=await n("worker-queue-place",{bead_id:f.bead_id,lane:f.lane,index:f.index,expected_revision:$});if(Ce(N),N&&N.conflict)return ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!N||N.applied!==!0)return ce(N&&typeof N.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${N.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let se=N.queue?N.queue.revision:void 0;return typeof se!="number"?(ce("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):se}catch(N){return ce(N instanceof Error&&N.message?N.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function dt(){let f=Q(),$=h?h.selectBoardColumn(my,"ready"):[],N=h?h.selectBoardColumn(gy,"blocked"):[],se=h?h.selectBoardColumn(yy,"closed"):[],p=h?h.selectBoardColumn(by,"in_progress"):[],_=h?h.selectBoardColumn(hy,"resolved"):[],k=ao([...$,...N,...p,..._,...se]),A=new Map;for(let g of[...$,...N,...p])g&&g.id&&!A.has(g.id)&&A.set(g.id,g);let te={...re(u?.()||"")};for(let g of["orchestration_model","orchestration_effort","orchestration_speed"]){let B=f[g];typeof B=="string"&&(te[g]=B)}function H(g,B){let le=A.get(g);if(!le)return null;let ze=le.metadata&&typeof le.metadata=="object"?le.metadata:{},tt=le.workflow?.route,xt=ze.route,Ot=rf(tt)?tt:rf(xt)?xt:null;return ln({pin:ze,global:te,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:Ot,controller_runtime:B})}function y(g){let B=g.runner||null,le=H(g.bead_id,B),ze=Rs(g),tt=le?nr(le,B):null;return ze||tt?{orchestration:ze,worker:tt}:null}let O=new Map;function C(g){if(O.has(g))return O.get(g)??null;let B=H(g,null),le=null;if(B){let ze=En(f.runner_catalog??null,B.orchestration_model.value??""),tt=ze===null?B:H(g,ze),xt=hr(tt,f.runner_catalog??null),Ot=nr(tt,ze);le=xt||Ot?{orchestration:xt,worker:Ot}:null}return O.set(g,le),le}function we(g){let B=io(k,g);return B.total===0?null:B}let nt=f.bead_titles||{},Ye=new Map;for(let[g,B]of Object.entries(nt))typeof B=="string"&&B.length>0&&Ye.set(g,B);for(let g of[...$,...N])Ye.set(g.id,g.title||g.id);let at=new Map;for(let g of[...$,...N,...p,..._,...se])g&&g.id&&typeof g.from_id=="string"&&at.set(g.id,g.from_id);let Ze=new Map;for(let g of[...$,...N,...p,..._,...se])g&&g.id&&typeof g.priority=="number"&&Ze.set(g.id,g.priority);let qt=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},sn=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},Gn=f.bead_workflow&&typeof f.bead_workflow=="object"&&!Array.isArray(f.bead_workflow)?f.bead_workflow:{},Kn=new Map;for(let[g,B]of Object.entries(sn))Array.isArray(B)&&Kn.set(g,rl(B));for(let g of[...$,...N]){let B=g.labels;Array.isArray(B)&&!Kn.has(g.id)&&Kn.set(g.id,rl(B))}let vr=new Map,Vr=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(Vr)?Vr:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let B=g.members.map(ze=>{let tt=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(xt=>xt.entries.some(Ot=>Ot.bead_id===ze));return tt?tt.id:null});if(!(B.every(ze=>ze!==null)&&new Set(B).size===1))for(let ze of g.members)vr.set(ze,g.members.filter(tt=>tt!==ze))}let qs=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},wr=new Map;for(let[g,B]of Object.entries(qt))B&&typeof B=="object"&&wr.set(g,B);for(let g of[...$,...N])wr.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let or=g=>wr.get(g)||{},Vn=f.pr_wait||[],Yr=f.pr_observations||{},Ue=f.pr_activity||{},ut=f.cleanup_failed||{},pn=Object.entries(ut).map(([g,B])=>({bead_id:g,step:B&&B.step?B.step:"",reason:B&&B.reason?B.reason:"",at:B&&typeof B.at=="number"?B.at:null,detail:B&&typeof B.detail=="string"?B.detail:null,output_tail:B&&typeof B.output_tail=="string"&&B.output_tail?B.output_tail:void 0,log_path:B&&typeof B.log_path=="string"&&B.log_path?B.log_path:void 0,retry_count:B&&typeof B.retry_count=="number"&&Number.isInteger(B.retry_count)&&B.retry_count>0?B.retry_count:0,failure_code:B&&typeof B.failure_code=="string"?B.failure_code:void 0,subject_id:B&&typeof B.subject_id=="string"?B.subject_id:void 0,repair_eligible:!!(B&&B.repair_eligible),repair:B&&B.repair?B.repair:void 0})),ha=f.queue||[],xf=new Set([...ha.map(g=>g.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(B=>B.bead_id)),...Vn.map(g=>g.bead_id),...f.done.map(g=>g.bead_id)]),Af=new Set(N.map(g=>g.id)),Sf=i?i.get()?.order||{}:{},fl=new Set,_l=[];for(let g of[...$,...N])xf.has(g.id)||fl.has(g.id)||Py(g)||(fl.add(g.id),_l.push(g));U=Iy(_l,q,Sf);let Ef=f.admission||{},ml=g=>{let B=Ef[g];if(!B)return"";if(B.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof B.reason=="string"?B.reason:"",ze=le.indexOf(":");return ze>0&&ze<le.length-1?`\u26D4 ${le.slice(0,ze)} (${le.slice(ze+1)})`:`\u26D4 ${le}`},Tf=U.map(g=>{let B=Io(g),le=B.path.length>0,ze=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",tt=!Object.hasOwn(g,"description")||typeof g.description=="string"&&g.description.trim().length>0,xt=Object.hasOwn(g,"labels")&&Fp(g.labels),Ot=xt||!Object.hasOwn(g,"labels")?"":jp(g.labels,g.metadata),yt=Ot.length>0,Dn=!xt&&(ze?tt:le&&!B.conflict),Gs=Af.has(g.id),Mn=[];Gs&&Mn.push(Dy(g)),ze&&!tt?Mn.push("missing_description"):!ze&&B.conflict?Mn.push("spec_id_conflict"):!ze&&!le&&Mn.push("spec \uC5C6\uC74C");let Sr=ml(g.id);return Sr&&Mn.push(Sr),{id:g.id,title:g.title||g.id,reason:Mn.join(" \xB7 "),draggable:Dn,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:ze,status:g.status,worker_ineligible:xt,session_preferred:yt,session_preferred_reason:Ot,blocked:Gs,has_spec:le,exec_chips:C(g.id),from_id:g.from_id||void 0,priority:Ze.get(g.id)}}),ya=$y(Tf,Y),va=ya.visible,Cf=f.revise_parked||{},Fs=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},wa=(g,B)=>g.map((le,ze)=>{let tt=B!=="done",xt=B!=="done"&&B!=="queue",Ot=tt?Cf[le.bead_id]:null,yt=tt?Tn(Fs,le.bead_id):null,Dn=yt?.operation?yt:null,Gs=tt&&Kn.get(le.bead_id)===!0,Mn=qs[le.bead_id]||[],Sr=f.admission&&typeof f.admission=="object"?f.admission[le.bead_id]:null,Ra=tt?wd(Sr,!!Dn||ve.has(le.bead_id)):null,Ff=tt&&!Ra?ml(le.bead_id):null,jf=tt?[Ff]:[],Hl=tt&&Mn.length>0&&typeof Sr?.reason=="string"&&Sr.reason.startsWith("not_ready")?[`\u23F8 ${Mn.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Oa=tt?vr.get(le.bead_id):void 0;return Oa&&Oa.length>0&&Hl.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Oa.join(", ")}\uC640`),{id:le.bead_id,title:Ye.get(le.bead_id)||le.bead_id,reason:jf.filter(Boolean).join(" \xB7 "),draggable:tt&&!Dn&&!Ra,done:B==="done",lane:B,seq:xt?ze+1:void 0,worker_serial:Gs,discard:Dn,stale_work:Ra,badges:[...Hl,...Ot?["\u23F8 REVISE \uD30C\uD0B9"]:[],...B==="done"?Vo(f.attempts||{},le.bead_id):[]],alert:!!Ot,revise_action:!!Ot,revise_enabled:!!Ot&&!Dn&&!X.has(le.bead_id),revise_title:Ot?Ot.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ot.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:B==="done"?hn(f.attempts||{},le.bead_id):null,work_ms:B==="done"?Yo(f.attempts||{},le.bead_id):null,done_at:B==="done"&&typeof le.added_at=="number"?le.added_at:void 0,exec_chips:tt?C(le.bead_id):null,workflow:tt&&Gn[le.bead_id]||null,from_id:at.get(le.bead_id)||void 0,priority:Ze.get(le.bead_id),...or(le.bead_id)}}),kr=f.attempts?Object.values(f.attempts).filter(Gr):[],ka=new Set;for(let g of kr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&ka.add(g.resumed_from);let gl=new Map;for(let g of kr)gl.set(g.bead_id,g.attempt_id);let Zr=new Map;for(let g of kr)Zr.set(g.attempt_id,g);function $a(g){let B=new Set,le=g;for(;le&&!B.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;B.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&Zr.get(le.resumed_from)||null}return!1}let js=typeof f.declared_base=="string"?f.declared_base:null;function Rf(g){let B=null;for(let le of kr)!le||le.bead_id!==g||$a(le)||(B===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof B.started_at=="number"?B.started_at:0))&&(B=le);return B&&typeof B.target_base=="string"?B.target_base:null}let xa=[],Bs=[],Of=qp(f),bl=g=>{let B=typeof g.session_id=="string"&&g.session_id.length>0,le=ka.has(g.attempt_id);return{eligible:B&&!le,reason:B?le?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},wn=null;for(let g of kr){let B=g.status==="paused"&&!ka.has(g.attempt_id);if(g.status==="running"||B)Bs.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Ye.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:B,conflict_resolution:$a(g),base_exception:ll(js,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Tn(Fs,g.bead_id,{attempt_id:g.attempt_id}),workflow:Gn[g.bead_id]||null,priority:Ze.get(g.bead_id),usage:hn(f.attempts||{},g.bead_id),rollup:we(g.bead_id),rollup_expanded:$e.has(g.bead_id),exec_chips:y(g),...or(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&Of(g)){let le=bl(g);xa.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Ye.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Tn(Fs,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:le.eligible,resume_reason:le.reason,conflict_resolution:$a(g),base_exception:ll(js,g.target_base),workflow:Gn[g.bead_id]||null,priority:Ze.get(g.bead_id),usage:hn(f.attempts||{},g.bead_id),rollup:we(g.bead_id),rollup_expanded:$e.has(g.bead_id),exec_chips:y(g),...or(g.bead_id)}),wn=g}}let hl=new Set([...xa,...Bs].map(g=>g.bead_id));for(let g of Array.isArray(f.session_active)?f.session_active:[]){let B=g&&g.bead_id;typeof B!="string"||B.length===0||hl.has(B)||(hl.add(B),Bs.push({bead_id:B,attempt_id:null,kind:"session",title:g.title||Ye.get(B)||B,status:"in_progress",started_at:On(g.started_at)??On(g.updated_at),updated_at:On(g.updated_at),workflow:g.workflow||null,priority:Ze.get(B),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let $r=[...xa,...Bs].map(g=>{let B=Zr.get(g.attempt_id),le=B?.quickfix_landing;if(B?.quickfix_lane!==!0||!le||typeof le!="object")return g;let ze=typeof le.reason=="string"&&le.reason.length>0?le.reason:null,tt=Ps({bead_id:B.bead_id,merge_sha:le.head_sha,cleanup_cursor:le.cursor,cleanup_failed:ze?{step:le.cursor,reason:ze}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return tt?{...g,landing:tt}:g}),yl=null;if(wn){let g=bl(wn),B=wn.cause_detail;yl={bead_id:wn.bead_id,repo:wn.repo||"",reason:wn.cause||wn.status,cause_detail:B&&typeof B.reason=="string"?{reason:B.reason,command:typeof B.command=="string"?B.command:null}:null,resume_attempt_id:wn.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Tn(Fs,wn.bead_id,{attempt_id:wn.attempt_id})}}let vl=new Set($r.map(g=>g.bead_id)),Aa=Array.isArray(f.merge_queue)?f.merge_queue:[],wl=new Map,kl=new Map,$l=new Map,xl=new Map,Al=new Map;Aa.forEach((g,B)=>{g&&typeof g.bead_id=="string"&&(wl.set(g.bead_id,B+1),kl.set(g.bead_id,g.resolution),$l.set(g.bead_id,g.continuation_action||null),xl.set(g.bead_id,g.head_review||null),Al.set(g.bead_id,g.authority||null))});let xr=f.merge_queue_state||{active:null,failures:{}},Lf=xr.failures||{},Sl=xr.waiting&&typeof xr.waiting.bead_id=="string"&&typeof xr.waiting.reason=="string"?xr.waiting:null,If=f.auto_merge_skips||{},El=g=>{let B=If[g];if(!B)return null;let le=Yr[g],ze=le&&le.pr?le.pr.head_sha:null;return ze&&ze===B.head_sha?B.reason||"":null},Us=new Map;for(let g of $r)g.failed!==!0&&g.conflict_resolution&&(g.paused?Us.has(g.bead_id)||Us.set(g.bead_id,"paused"):Us.set(g.bead_id,"running"));let Tl=$r.filter(g=>g.kind!=="session"&&!g.paused&&g.failed!==!0).length,Cl=(f.workspace_info||{}).slots,Rl=typeof Cl=="number"?Cl:typeof f.slots=="number"?f.slots:ga,Pf=Tl>Rl,Ws=dr(W),Df=(Array.isArray(f.done)?f.done.slice():[]).filter(g=>Ws===void 0||typeof g.added_at!="number"||g.added_at>=Ws).sort((g,B)=>(B.added_at||0)-(g.added_at||0)),Xr=wa(Df,"done"),Mf=new Set((Array.isArray(f.done)?f.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Ol=[],Nf=u?.()||"";for(let g of se){let B=On(g.closed_at);if(typeof g.id!="string"||Mf.has(g.id)||B===null||Ws!==void 0&&B<Ws||typeof g.comment_count!="number"||g.comment_count<=0)continue;let le=`${Nf}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,ze=S.get(le);ze===void 0&&n&&(S.set(le,"pending"),Promise.resolve(n("get-comments",{id:g.id})).then(tt=>{let xt=Array.isArray(tt)&&tt.some(Ot=>Po(typeof Ot?.text=="string"?Ot.text:"")?.lane==="session");S.set(le,xt?"session":"not-session"),Ge()}).catch(()=>{S.set(le,"failed"),Ge()})),ze==="session"&&Ol.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:B,created_at:g.created_at,updated_at:g.updated_at})}Xr.push(...Ol),Xr.sort((g,B)=>(B.done_at||0)-(g.done_at||0));let zs={};for(let g of In)zs[g]=0;let Ll=!1,Il=0,Sa=0,Pl=0;for(let g of Xr){let B=g.usage;if(B&&typeof B=="object"){let le=!1;for(let ze of In)Number.isFinite(B[ze])&&(zs[ze]+=B[ze],Ll=!0,le=!0);le&&(Sa+=1,Number.isFinite(B.total_cost_usd)&&(Il+=B.total_cost_usd,Pl+=1))}}Sa>0&&Pl===Sa&&(zs.total_cost_usd=Il);let Dl=Xr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),qf=Dl.length>0?Vt(vo(Dl)):Ll?jn(zs):null,Ml=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},Nl=Array.isArray(f.serial_lanes)?f.serial_lanes:[],ql=g=>{if(Vn.some(ze=>ze.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let B=kr.filter(ze=>ze&&ze.bead_id===g),le=B.length>0?B[B.length-1].status:null;return le==="failed"||le==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":le==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Hs=Nl.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,B)=>{let le=Ml[g.id]||{},ze=new Map((Array.isArray(le.corrections)?le.corrections:[]).filter(yt=>yt&&typeof yt.bead_id=="string"&&typeof yt.after=="string").map(yt=>[yt.bead_id,yt.after])),tt=wa(g.entries.filter(yt=>!vl.has(yt.bead_id)),g.id).map(yt=>ze.has(yt.id)?{...yt,badges:[`\u{1F517} ${ze.get(yt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...yt.badges]}:yt),xt=Array.isArray(le.occupied_by)?le.occupied_by.filter(yt=>typeof yt=="string"):[],Ot=xt.map(yt=>({id:yt,title:Ye.get(yt)||yt,draggable:!1,lane:g.id,ghost:!0,badges:[ql(yt)]}));return{id:g.id,index:B+1,rows:[...Ot,...tt],occupied:xt.length>0,badge:xt.length>0?ql(xt[0]):"\uB300\uAE30",cycle:le.cycle===!0}}),Fl=typeof f.serial_lane_count=="number"?f.serial_lane_count:Hs.length,Ea=wa(ha.filter(g=>!vl.has(g.bead_id)),"queue"),jl=new Map,Bl=new Set;for(let[g,B]of Object.entries(Ml)){if(!/^s[1-5]$/.test(g))continue;let le=B&&Array.isArray(B.occupied_by)?B.occupied_by:[];for(let ze of le)typeof ze=="string"&&jl.set(ze,g);le.length>0&&Bl.add(g)}let Ar=[];for(let g of $r)typeof g.bead_id=="string"&&Ar.push({id:g.bead_id,title:Ye.get(g.bead_id)||g.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:jl.get(g.bead_id)??null});for(let g of Hs)for(let B of g.rows)B.ghost!==!0&&Ar.push({id:B.id,title:B.title,location_label:`${g.id} #${B.seq??""}`.trim(),kind:"serial",lane_id:g.id});Ea.forEach((g,B)=>{Ar.push({id:g.id,title:g.title,location_label:`#${B+1}`,kind:"parallel",lane_id:null})});for(let g of va)Ar.push({id:g.id,title:g.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let Ul={};for(let g of Nl)g&&typeof g.id=="string"&&Array.isArray(g.entries)&&(Ul[g.id]=g.entries.length);let Ta=new Map;for(let g of Ar)Ta.has(g.id)||Ta.set(g.id,g);j={members_by_id:Ta,serial_raw_lengths:Ul,serial_lane_count:Fl,occupied_lanes:Bl};let Wl=Up(f.bead_scope,Ar),Ca=(g,B)=>{let le=Wl.get(g.id);if(!le||le.overlaps.length===0&&!le.scope_missing)return g;let ze=Re(g.id,le.overlaps);return g.dependency_chips={...g.dependency_chips||{},...le.overlaps.length>0?{overlaps:le.overlaps}:{},...le.scope_missing&&B!=="running"?{scope_missing:!0}:{},...ze?{popover:ze}:{}},g};for(let g of Ea)Ca(g,"queue");for(let g of Hs)for(let B of g.rows)B.ghost!==!0&&Ca(B,g.id);for(let g of va)Ca(g,"candidate");let zl=new Map;for(let g of $r){let B=typeof g.bead_id=="string"?g.bead_id:"";if(B.length===0)continue;let le=g.kind==="session",ze=Wl.get(B),tt=ze&&ze.overlaps.length>0?ze.overlaps:null,xt=typeof g.attempt_id=="string"&&g.attempt_id.length>0?Zr.get(g.attempt_id):void 0,Ot=xt&&xt.last_activity&&typeof xt.last_activity=="object"?xt.last_activity:null,yt=xt&&Array.isArray(xt.legs)?xt.legs:[];if(!tt&&!Ot&&yt.length===0&&!le)continue;let Dn=tt?Re(B,tt):null;zl.set(B,{...Ot?{last_activity:Ot}:{},...yt.length>0?{legs:yt}:{},...tt?{dependency_chips:{overlaps:tt,...Dn?{popover:Dn}:{}}}:{}})}return{queue:f,idToTitle:Ye,candidates:va,candidate_hidden:{blocked:ya.hidden_blocked,spec:ya.hidden_spec},running:$r,live_count:Tl,slots:Rl,over_cap:Pf,failure:yl,waiting:Ea,serial_lanes:Hs,serial_lane_count:Fl,running_overlays:zl,pr_wait:Vn.map(g=>Ky(g.bead_id,Ye.get(g.bead_id)||g.bead_id,Yr,ut[g.bead_id]||null,hn(f.attempts||{},g.bead_id),Ue[g.bead_id]||(ye.has(g.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:z.has(g.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Us.get(g.bead_id)||null,g.external===!0,{position:wl.get(g.bead_id)||0,active:xr.active===g.bead_id,failure:Lf[g.bead_id]||null,waiting:Sl?.bead_id===g.bead_id?Sl.reason:null,resolution:kl.get(g.bead_id),continuation_action:$l.get(g.bead_id),head_review:xl.get(g.bead_id)||null,authority:Al.get(g.bead_id)||null},g.wt_present!==!1,f.auto_merge===!0?El(g.bead_id):null,ll(js,Rf(g.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[g.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Zr.get(gl.get(g.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]})).map(g=>({...g,workflow:Gn[g.id]||null,priority:Ze.get(g.id),...or(g.id)})),merge_queue_length:Aa.length,merge_queue_running:Aa.length>0,auto_excluded:Vn.map(g=>g.bead_id).filter(g=>El(g)!==null),declared_base:js,done:Xr,token_total:qf,cleanup_failures:pn,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function Ae(){let $=!!o?.get()?.job,N=!$&&o?.isPending?.()===!0,se=$?"\uBD84\uC11D \uC911":N?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${se?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${se?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${se?l`<span class="worker-analysis-btn__badge">${se}</span>`:""}
    </button>`}function Nt(f){let $=f.waiting.length>0?f.waiting[0].id:"\u2014",N=l`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,se=un(f),p=f.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",_=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${F()} 완료 <b>${f.done.length}</b></span
      >`,k=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,A=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${ga}
          step="1"
          .value=${String(f.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:tf},(y,O)=>O+1).map(y=>l`<option
                value=${String(y)}
                ?selected=${f.serial_lane_count===y}
              >
                ${y}
              </option>`)}
        </select>
      </label>
      ${o?Ae():""} `,te=Td({failure:f.failure}),H=vd(f.repo_operations,f.cleanup_failures);return Te?l`<div class="worker-ribbon">
          ${N} ${se}
          <div class="worker-kpi worker-kpi--ribbon">${p}${_}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${A}</div>
          <div class="worker-kpi">${k}</div>
        </div>
        ${H}${kt.template()}${te}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${N}${se}${A}</div>
        <div class="worker-kpi">
          ${p}${_}${k}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${F()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(y=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${y.tooltip}
                >${F()} 완료 · 누적 ${y.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${$}</b></span
          >
        </div>
      </div>
      ${H}${kt.template()}${te}`}function wt(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let $=f.running.some(N=>N.kind!=="session"&&!N.paused&&N.failed!==!0);return l`<section
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
      ${f.running.length>0?Bi(f.running,Date.now(),Me,f.running_overlays):""}
      ${f.pr_wait.map(N=>Jn(N))}
    </section>`}function Ut(f){let $=f.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${Y.show_blocked}
        />
        🔒 blocked${$.blocked>0?` ${$.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${xy.map(N=>l`<button
              type="button"
              class="worker-filter__chip${Y.spec===N.value?" is-active":""}"
              data-spec=${N.value}
              aria-pressed=${Y.spec===N.value?"true":"false"}
            >
              ${N.label}
            </button>`)}
        ${$.spec>0?l`<span class="worker-filter__hidden">숨김 ${$.spec}</span>`:""}
      </div>
    </div>`}function Zt(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${q}
    >
      ${Ay.map(f=>l`<option value=${f.value} ?selected=${q===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function Ht(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${W}
      >
        ${Tr.map(f=>l`<option value=${f.value} ?selected=${W===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function Wt(f){let $=l`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,N=f.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return vn({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:$,controls:N})}function un(f){let $=f.queue.auto_merge===!0;if(f.merge_queue_running)return l`<button
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
      </button>`;let N=new Set(f.auto_excluded),se=f.pr_wait.filter(p=>p.merge_action&&p.merge_enabled&&!N.has(p.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${se>0?` ${se}`:""}
    </button>`}function Ct(f){let $=vn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Zt(),controls:Ut(f),place_menu:Oe(f.candidates),onOpenDoc:d?(N,se)=>d(se):void 0});return Te?l`<div class="worker-lanes worker-lanes--mobile">
        ${wt(f)}
        ${vn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:oe.queue,preview:sf(f.waiting)})}
        ${f.serial_lanes.map(N=>Wt(N))}
        ${$}
        ${vn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${F()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ht(),collapsible:!0,collapsed:oe.done,preview:Array.isArray(f.token_total)?f.token_total.map(N=>N.label).join(" \xB7 "):f.token_total||sf(f.done)})}
      </div>`:l`<div class="worker-lanes">
      ${$}
      <div class="worker-wait">
        ${vn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(N=>Wt(N))}
      </div>
      ${vn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(N=>N.kind!=="session"&&!N.paused&&N.failed!==!0),body:Bi(f.running,Date.now(),Me,f.running_overlays)})}
      ${vn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${vn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${F()} ${f.done.length}`,items:f.done,empty:`${F()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ht()})}
    </div>`}function Rt(f){oe={...oe,[f]:!oe[f]},Ly(oe),Ge()}function Ge(){let f=dt();Xe(Nt(f),ge),Xe(Ct(f),Be)}function dn(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(Ry);Te=!!f.matches;let $=N=>{let se=!!(N&&typeof N.matches=="boolean"?N.matches:f.matches);se!==Te&&(Te=se,Ge())};typeof f.addEventListener=="function"?(f.addEventListener("change",$),K.push(()=>f.removeEventListener("change",$))):typeof f.addListener=="function"&&(f.addListener($),K.push(()=>f.removeListener($)))}let tn=null;function rt(f){tn=f.target instanceof Element?f.target:null}function Le(f){let N=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!N)return;if(tn&&N.contains(tn)&&tn.closest("input, button, a")){f.preventDefault();return}let se=N.dataset.beadId||"",p=N.dataset.lane||"";M={bead_id:se,from_lane:p};try{f.dataTransfer?.setData("text/plain",se),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function R(f){let $=f.target?.closest?.(".worker-pane");if(!$)return;let N=$.dataset.lane||"";N!=="candidate"&&N!=="queue"&&!/^s[1-5]$/.test(N)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),$.classList.add("worker-pane--drag-over"))}function de(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ee(f,$){let N=U.find(k=>k.id===f);if(!N)return;let se=U.filter(k=>k.id!==f),p=se.length;if($){let k=$.dataset.beadId;if(k===f)return;let A=se.findIndex(te=>te.id===k);A>=0&&(p=A)}let _=se.slice();_.splice(p,0,N),x.applyReorder(f,_,p)}function ct(f){let $=f.target?.closest?.(".worker-pane");if(!$)return;f.preventDefault(),$.classList.remove("worker-pane--drag-over");let N=$.dataset.lane||"",se=M?.bead_id||f.dataTransfer?.getData("text/plain")||"",p=M?.from_lane||"";if(M=null,!se)return;let _=f.target?.closest?.(".worker-mini, .worker-card"),k=Array.from($.querySelectorAll(".worker-mini, .worker-card")),A=k.length;if(_){let te=k.indexOf(_);te>=0&&(A=te)}if(A=Math.max(0,A-$.querySelectorAll(".worker-mini--ghost").length),$.classList.contains("worker-pane--collapsed")&&(A=Ie()),N==="candidate"){if(p==="candidate"){Ee(se,_);return}(p==="queue"||/^s[1-5]$/.test(p))&&et(se);return}if(N==="queue"||/^s[1-5]$/.test(N)){let te=N==="queue"?"parallel":N;p===N?st(se,te,A):Fe(se,te)}}function $t(f){Y=f,ky(f),Ge()}function gt(f){q=f==="board"||f==="created"||f==="spec"?f:ba,Ey(q),Ge()}function Dt(f){W=Rn(f),Cy(W),v?.(W),Ge()}function jt(f){let $=f.target?.closest?.(".worker-serial-lane-count");if($){let A=Number.parseInt($.value,10);Number.isFinite(A)&&ee(A).then(Ge);return}let N=f.target?.closest?.(".worker-filter__blocked");if(N){$t({...Y,show_blocked:N.checked});return}let se=f.target?.closest?.(".worker-done-range");if(se){Dt(se.value);return}let p=f.target?.closest?.(".worker-sort");if(p){gt(p.value||ba);return}let _=f.target?.closest?.(".worker-slots__input");if(!_)return;let k=Number.parseInt(_.value,10);if(!Number.isFinite(k)){Ge();return}I(k).then(Ge)}function Gt(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function nn(){let f=dt();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function St(){Me&&Ve.close(),qe.hidden=!1,We.hidden=!1,Qe.open(nn()),Ge()}function rn(f){let $=Q(),N=$.attempts?$.attempts[f]:null;Me=f,Ke=null,Qe.close(),qe.hidden=!0,We.hidden=!1,Ve.open({attempt_id:f,meta:Gt(N)}),Ge()}function gn(f,$){Me=null,Ke=f,Qe.close(),qe.hidden=!0,We.hidden=!1,Ve.open({attempt_id:f,meta:$,hide_prompt:!0}),Ge()}function Pn(){if(Qe.isOpen()&&Qe.refresh(nn()),Ke){let N=(o?.get()?.runs||[]).find(se=>se.run_id===Ke);N?Ve.updateMeta(ol(N)):Ve.close();return}if(!Me)return;let f=Q(),$=f.attempts?f.attempts[Me]:null;if($){Ve.updateMeta(Gt($));return}Ve.close()}function E(f){let $=f.target;if($?.closest?.(".worker-mini__serial, .worker-mini__grip")||$?.closest?.("#worker-parallel-analysis-dialog"))return;let N=$?.closest?.(".mon-overlap__chip");if(N){let Ue=N.closest("[data-bead-id]"),ut=Ue&&Ue.getAttribute("data-bead-id")||"";if(ut){let pn=N.getAttribute("data-overlap-id")||"";G=!!G&&G.bead_id===ut&&G.counterpart_id===pn?null:{bead_id:ut,counterpart_id:pn},Ge()}return}let se=$?.closest?.(".mon-overlap__place");if(se){let Ue=se.closest("[data-bead-id]"),ut=Ue&&Ue.getAttribute("data-bead-id")||"";ut&&xe(ut,se.getAttribute("data-counterpart-id")||"");return}if($?.closest?.(".mon-overlap__popover"))return;if($?.closest?.(".worker-analysis-btn")){ft?.open();return}if($?.closest?.(".worker-repo-strip")||$?.closest?.(".worker-mini__timeline")){St();return}let p=$?.closest?.(".worker-repo-op__session");if(p){let Ue=p.dataset.attemptId;Ue&&rn(Ue);return}let _=$?.closest?.(".worker-repo-op__resolve");if(_){m(_.dataset.operationId||"");return}let k=$?.closest?.(".worker-repo-op__dismiss");if(k){w(k.dataset.operationId||"");return}let A=$?.closest?.(".worker-cleanup__resume");if(A){let Ue=A.dataset.beadId;Ue&&ht(Ue);return}let te=$?.closest?.(".worker-banner__resume");if(te){let Ue=te.dataset.attemptId;Ue&&bt(Ue);return}let H=$?.closest?.(".worker-banner__discard");if(H){let Ue=H.dataset.confirmation==="merged"?"merged":"unmerged";_e(H.dataset.beadId||"",H.dataset.attemptId||null,Ue,H.dataset.operationId||null);return}let y=$?.closest?.(".worker-banner__dismiss");if(y){let Ue=y.dataset.attemptId;Ue&&It(Ue);return}if($?.closest?.(".worker-play")){fe(!Q().auto_advance);return}let O=$?.closest?.(".worker-merge-all");if(O){O.classList.contains("worker-merge-all--stop")?Q().auto_merge===!0?Pe(!1):Z():Pe(!0);return}let C=$?.closest?.(".worker-pane__hd--toggle");if(C){let Ue=C.dataset.lane;(Ue==="queue"||Ue==="done")&&Rt(Ue);return}let we=$?.closest?.(".worker-card__place-lane");if(we){let Ue=we.dataset.beadId,ut=we.dataset.lane;Ue&&(ut==="parallel"||/^s[1-5]$/.test(ut||""))&&(ae=null,Ge(),Fe(Ue,ut));return}if($?.closest?.(".worker-card__place-cancel")){ae=null,Ge();return}let Ye=$?.closest?.(".worker-card__place");if(Ye){let Ue=Ye.dataset.beadId;Ue&&!Ye.disabled&&(ne()?(ae=Ue,Ge()):Fe(Ue,"parallel"));return}let at=$?.closest?.(".worker-filter__chip");if(at){let Ue=at.dataset.spec;(Ue==="all"||Ue==="with"||Ue==="without")&&$t({...Y,spec:Ue});return}let Ze=$?.closest?.(".worker-mini__merge");if(Ze){let Ue=Ze.dataset.beadId||"";Q().cleanup_failed?.[Ue]?ht(Ue):Mt(Ue);return}let qt=$?.closest?.(".worker-mini__merge-cancel");if(qt){P(qt.dataset.beadId||"");return}let sn=$?.closest?.(".worker-mini__discard");if(sn){_e(sn.dataset.beadId||"",sn.dataset.attemptId||null,sn.dataset.discardMode==="merged"?"merged":"unmerged",sn.dataset.operationId||null);return}let Gn=$?.closest?.(".worker-mini__stale-continue");if(Gn){T("worker-stale-work-continue",Gn.dataset.beadId||"",Gn.dataset.actionId||"");return}let Kn=$?.closest?.(".worker-mini__stale-backup");if(Kn){T("worker-stale-work-backup-fresh",Kn.dataset.beadId||"",Kn.dataset.actionId||"");return}let vr=$?.closest?.(".worker-mini__stale-recheck");if(vr){T("worker-stale-work-recheck",vr.dataset.beadId||"",vr.dataset.actionId||"");return}let Vr=$?.closest?.(".worker-mini__revise-fix");if(Vr){V("worker-revise-fix",Vr.dataset.beadId||"");return}let qs=$?.closest?.(".worker-mini__revise-approve");if(qs){V("worker-revise-approve",qs.dataset.beadId||"");return}if($?.closest?.(".worker-mini__pr"))return;if($?.closest?.(".rtile__discard")){let Ue=$?.closest?.(".rtile"),ut=Ue?.dataset?.beadId,pn=Ue?.dataset?.attemptId;ut&&_e(ut,pn||null,"unmerged",$?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if($?.closest?.(".rtile__dismiss")){let ut=$?.closest?.(".rtile")?.dataset?.attemptId;ut&&It(ut);return}if($?.closest?.(".rtile__pause")){let ut=$?.closest?.(".rtile")?.dataset?.attemptId;ut&&Je(ut);return}if($?.closest?.(".rtile__resume")){let ut=$?.closest?.(".rtile")?.dataset?.attemptId;ut&&bt(ut);return}if($?.closest?.(".rtile__session")){let ut=$?.closest?.(".rtile")?.dataset?.attemptId;ut&&rn(ut);return}if($?.closest?.(".worker-drawer-overlay__backdrop")){Qe.close(),Ve.close();return}if($?.closest?.(".worker-drawer-host"))return;let wr=$?.closest?.(".rtile .board-card__roll-toggle");if(wr){let Ue=wr.dataset.rollParent;Ue&&($e.has(Ue)?$e.delete(Ue):$e.add(Ue),Ge());return}let or=$?.closest?.(".rtile .board-card__roll-child");if(or){let Ue=or.dataset.childId;Ue&&c&&c(Ue);return}let Vn=$?.closest?.(".rtile");if(Vn){if($?.closest?.(".rtile__id")){let ut=Vn.dataset.beadId;ut&&fn(ut).then(pn=>{pn?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ue=Vn.dataset.beadId;Ue&&c&&c(Ue);return}let Yr=$?.closest?.(".worker-mini, .worker-card");if(Yr){let Ue=Yr.dataset.beadId;if($?.closest?.(".worker-mini__id, .worker-card__id")){Ue&&fn(Ue).then(pn=>{pn?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ut=$?.closest?.(".ctl-chip--from");if(ut){let pn=ut.dataset.fromId;pn&&c&&c(pn);return}Ue&&c&&c(Ue)}}e.addEventListener("pointerdown",rt),e.addEventListener("dragstart",Le),e.addEventListener("dragover",R),e.addEventListener("dragleave",de),e.addEventListener("drop",ct),e.addEventListener("click",E),e.addEventListener("change",jt);function L(f){if(!G)return;let $=f.target;$&&typeof $.closest=="function"&&$.closest(".mon-overlap__popover, .mon-overlap__chip")||(G=null,Ge())}function De(f){f.key!=="Escape"||!G||(G=null,Ge())}return document.addEventListener("click",L),document.addEventListener("keydown",De),K.push(()=>{document.removeEventListener("click",L),document.removeEventListener("keydown",De)}),dn(),h&&K.push(h.subscribe(()=>{for(let[f,$]of S)$==="failed"&&S.delete(f);Ge()})),s&&K.push(s.subscribe(()=>{let f=u&&u()||"";f!==pt&&(pt=f,it.close()),Ge(),Pn()})),o&&typeof o.subscribe=="function"&&K.push(o.subscribe(()=>{Pn(),Ge()})),Ge(),{load(){pe(),Ge()},refreshSessionDefaults:ke,destroy(){for(let f of K.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",rt),e.removeEventListener("dragstart",Le),e.removeEventListener("dragover",R),e.removeEventListener("dragleave",de),e.removeEventListener("drop",ct),e.removeEventListener("click",E),e.removeEventListener("change",jt);try{Ve.destroy()}catch{}We.hidden=!0;try{ft?.destroy()}catch{}try{it.destroy()}catch{}Xe(l``,e)}}}function ul(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function pf(e,t,n,r=async()=>{},s=async()=>{}){let o=Lt("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function d(W){let F=W.target.value,Te=t.getState().workspace?.current?.path||"";if(F&&F!==Te){o("switching workspace to %s",F),i=!0,q();try{await n(F)}catch(ye){o("workspace switch failed: %o",ye)}finally{i=!1,q()}}}async function b(){let W=t.getState(),S=W.workspace?.current?.path||W.workspace?.available?.[0]?.path||"";if(!(!S||c)){o("git-pulling workspace %s",S),c=!0,q();try{await r(S)}catch(F){o("workspace git pull failed: %o",F)}finally{c=!1,q()}}}function v(W){let S=W.target;S&&e.contains(S)||M()}function h(W){W.key==="Escape"&&M()}function x(){u||(u=!0,document.addEventListener("mousedown",v),document.addEventListener("keydown",h),q())}function M(){u&&(u=!1,document.removeEventListener("mousedown",v),document.removeEventListener("keydown",h),q())}function U(){u?M():x()}async function Y(W){let S=W.target,F=S.value,oe=S.checked;o("toggling visibility %s \u2192 %s",F,String(oe));try{await s(F,oe)}catch(Te){o("workspace visibility toggle failed: %o",Te)}}function ae(W){return W?l`
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
    `:l``}function G(W,S){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${U}
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
                ${W.map(F=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${F.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${F.path}"
                        .checked=${!S.has(F.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ul(F.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function j(){let W=t.getState(),S=W.workspace?.current,F=W.workspace?.available||[],oe=new Set(W.workspace?.hidden||[]),Te=S?.path||F[0]?.path||"";if(F.length===0)return l``;let ye=F.filter(z=>!oe.has(z.path)||z.path===Te);if(ye.length<=1){let z=ye[0]||F[0],X=ul(z.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${z.path}"
            >${X}</span
          >
          ${G(F,oe)}
          ${ae(Te)}
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
          ${ye.map(z=>l`
              <option
                value="${z.path}"
                ?selected=${z.path===Te}
                title="${z.path}"
              >
                ${ul(z.path)}
              </option>
            `)}
        </select>
        ${G(F,oe)}
        ${ae(Te)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function q(){Xe(j(),e)}return q(),a=t.subscribe(()=>q()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",v),document.removeEventListener("keydown",h),Xe(l``,e)}}}var ff=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function dl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function _f(e,t,n=dl()){return{id:n,type:e,payload:t}}function mf(e={}){let t=Lt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,d=[],b=new Map,v=new Set;function h(j){for(let q of Array.from(v))try{q(j)}catch{}}function x(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),h(o);let j=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),q=(n.jitterRatio||0)*j,W=Math.max(0,Math.round(j+(Math.random()*2-1)*q));t("ws retry in %d ms (attempt %d)",W,a+1),i=setTimeout(()=>{i=null,G()},W)}function M(j){try{s?.send(JSON.stringify(j))}catch(q){t("ws send failed",q)}}function U(){for(o="open",t("ws open"),h(o),a=0;d.length;){let j=d.shift();j&&M(j)}}function Y(j){let q;try{q=JSON.parse(String(j.data))}catch{t("ws received non-JSON message");return}if(!q||typeof q.id!="string"||typeof q.type!="string"){t("ws received invalid envelope");return}if(u.has(q.id)){let S=u.get(q.id);u.delete(q.id),q.ok?S?.resolve(q.payload):S?.reject(q.error||new Error("ws error"));return}let W=b.get(q.type);if(W&&W.size>0)for(let S of Array.from(W))try{S(q.payload)}catch(F){t("ws event handler error",F)}else t("ws received unhandled message type: %s",q.type)}function ae(){o="closed",t("ws closed"),h(o);for(let[j,q]of u.entries())q.reject(new Error("ws disconnected")),u.delete(j);a+=1,x()}function G(){if(!c)return;let j=r();try{s=new WebSocket(j),t("ws connecting %s",j),o="connecting",h(o),s.addEventListener("open",U),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",ae)}catch(q){t("ws connect failed %o",q),x()}}return G(),{send(j,q){if(!ff.includes(j))return Promise.reject(new Error(`unknown message type: ${j}`));let W=dl(),S=_f(j,q,W);return t("send %s id=%s",j,W),new Promise((F,oe)=>{u.set(W,{resolve:F,reject:oe,type:j}),s&&s.readyState===s.OPEN?M(S):(t("queue %s id=%s (state=%s)",j,W,o),d.push(S))})},on(j,q){b.has(j)||b.set(j,new Set);let W=b.get(j);return W?.add(q),()=>{W?.delete(q)}},onConnection(j){return v.add(j),()=>{v.delete(j)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,G()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Vy(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Yy(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var pl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],gf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],rr="tab:worker:closed",Zy="bdui.worker.done-range",bf=bp,hf="worker:queue",yf="worker:parallel-analysis",vf="ui:order",wf="ui:display-policy",kf="exec:presets",sr="tab:board:closed",$f="beads-ui.board.closed-range";function Xy(e){let t=Lt("main");t("bootstrap start");let n=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Xe(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&Np(a),i&&c&&u&&d){let re=function(E,L){let De="Request failed",f="";if(E&&typeof E=="object"){let N=E;if(typeof N.message=="string"&&N.message.length>0&&(De=N.message),typeof N.details=="string")f=N.details;else if(N.details&&typeof N.details=="object")try{f=JSON.stringify(N.details,null,2)}catch{f=""}}else typeof E=="string"&&E.length>0&&(De=E);let $=L&&L.length>0?`Failed to load ${L}`:"Request failed";K.open($,De,f)},Oe=function(E){return`${rt.getState().workspace.current?.path||""}\0${E}`},Ne=function(){Ve&&(Ve().catch(()=>{}),Ve=null),Qe=null,it=null},Ie=function(E){pt=E;let L=()=>{pt!==E||rt.getState().selected_id!==E||(pt=null,Ce(E))};if(!Q){ft.then(L);return}L()},Je=function(E,L,De,f,$){return De!==et[L]?($().catch(()=>{}),!1):(E.set(f,$),!0)},It=function(){let E=rt.getState();Pe(E.view==="board"),fe(E.view==="worker"),J(E.view==="monitor"),w(E.view==="board"||E.view==="worker"||bt||!!E.selected_id)},ht=function(){let E=dr(_t);return E===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:E}}},He=function(){let E=dr(Mt);return E===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:E}}},Pe=function(E){if(E)for(let[L,De]of pl){if(Fe.has(L)||st.has(L))continue;let f=L===sr?ht():{type:De};try{ge.register(L,f)}catch(se){t("register %s store failed: %o",L,se)}st.add(L);let $=et.board,N=!1;je.subscribeList(L,f).then(se=>{N=!Je(Fe,"board",$,L,se)}).catch(se=>{t("subscribe %s failed: %o",L,se),re(se,"board")}).finally(()=>{st.delete(L),N&&It()})}else _e()},_e=function(){et.board+=1;for(let[E]of pl){let L=Fe.get(E);L&&(L().catch(()=>{}),Fe.delete(E));try{ge.unregister(E)}catch(De){t("unregister %s failed: %o",E,De)}}},fe=function(E){if(!E){m();return}for(let[L,De]of gf){if(T.has(L)||st.has(L))continue;let f=L===rr?He():{type:De};try{ge.register(L,f)}catch(se){t("register %s store failed: %o",L,se)}st.add(L);let $=et.worker,N=!1;je.subscribeList(L,f).then(se=>{N=!Je(T,"worker",$,L,se)}).catch(se=>{t("subscribe %s failed: %o",L,se),re(se,"worker")}).finally(()=>{st.delete(L),N&&It()})}},m=function(){et.worker+=1;for(let[E]of gf){let L=T.get(E);L&&(L().catch(()=>{}),T.delete(E));try{ge.unregister(E)}catch(De){t("unregister %s failed: %o",E,De)}}},w=function(E){if(!E){I();return}V||(ke("subscribe-worker-queue",{id:hf}).catch(L=>{t("subscribe-worker-queue failed: %o",L)}),ke("subscribe-worker-parallel-analysis",{id:yf}).catch(L=>{t("subscribe-worker-parallel-analysis failed: %o",L)}),V=()=>(ke("unsubscribe-worker-parallel-analysis",{id:yf}),ke("unsubscribe-worker-queue",{id:hf})))},I=function(){V&&(V().catch(()=>{}),V=null),D.clear()},J=function(E){if(!E){me();return}ee||(ke("subscribe-monitor-pipeline",{id:bf}).catch(L=>{t("subscribe-monitor-pipeline failed: %o",L)}),ee=()=>ke("unsubscribe-monitor-pipeline",{id:bf}))},me=function(){ee&&(ee().catch(()=>{}),ee=null)},xe=function(){Re||(ke("subscribe-ui-order",{id:vf}).catch(E=>{t("subscribe-ui-order failed: %o",E)}),Re=()=>ke("unsubscribe-ui-order",{id:vf}))},ot=function(){Re&&(Re().catch(()=>{}),Re=null),qe.clear()},Ae=function(){dt||(ke("subscribe-display-policy",{id:wf}).catch(E=>{t("subscribe-display-policy failed: %o",E)}),dt=()=>ke("unsubscribe-display-policy",{id:wf}))},Nt=function(){dt&&(dt().catch(()=>{}),dt=null),Be.clear()},Ut=function(){wt||(ke("subscribe-impl-presets",{id:kf}).catch(E=>{t("subscribe-impl-presets failed: %o",E)}),wt=()=>ke("unsubscribe-impl-presets",{id:kf}))},Rt=function(E){if(!E)return"Unknown";let L=E.split("/").filter(Boolean);return L.length>0?L[L.length-1]:"Unknown"},jt=function(E,L){Dt.open(E.path,{missing_state:E.missing_state,...L?{workspace:L}:{}})};var b=re,v=Oe,h=Ne,x=Ie,M=Je,U=It,Y=ht,ae=He,G=Pe,j=_e,q=fe,W=m,S=w,F=I,oe=J,Te=me,ye=xe,z=ot,X=Ae,ve=Nt,$e=Ut,he=Rt,ie=jt;let Se=document.getElementById("header-loading"),be=Cc(Se),K=yd(e),pe=mf(),ke=be.wrapSend((E,L)=>pe.send(E,L)),je=wc(ke),ge=kc(),We=Ac(),D=xc(),ue=ac(),qe=$c(),Be=sc(),Me=oc(),Ke=ic();pe.on("impl-presets-snapshot",E=>{let L=E;L&&typeof L.revision=="number"&&Array.isArray(L.presets)&&Me.set({revision:L.revision,presets:L.presets})}),pe.on("monitor-pipeline-snapshot",E=>{let L=E;if(!(!L||!Array.isArray(L.workspaces)))try{ue.set(L.workspaces,L.workspaces_state,L.cross_lanes)}catch{}}),pe.on("ui-order-snapshot",E=>{let L=E;if(L&&typeof L.revision=="number")try{qe.set({revision:L.revision,order:L.order&&typeof L.order=="object"?L.order:{}})}catch{}}),pe.on("display-policy-snapshot",E=>{let L=E;if(L&&L.policy&&typeof L.policy=="object")try{Be.set(L.policy)}catch{}}),pe.on("session-log-snapshot",E=>{let L=E;if(L&&typeof L.id=="string")try{Ke.set(L.id,Array.isArray(L.lines)?L.lines:[],typeof L.last_event_at=="number"?L.last_event_at:null)}catch{}}),pe.on("session-log-append",E=>{let L=E;if(L&&typeof L.id=="string")try{Ke.append(L.id,L.event)}catch{}}),pe.on("snapshot",E=>{let L=E,De=L&&typeof L.id=="string"?L.id:"",f=De?ge.getStore(De):null;if(f&&L&&L.type==="snapshot")try{f.applyPush(L)}catch{}}),pe.on("upsert",E=>{let L=E,De=L&&typeof L.id=="string"?L.id:"",f=De?ge.getStore(De):null;if(f&&L&&L.type==="upsert")try{f.applyPush(L)}catch{}}),pe.on("delete",E=>{let L=E,De=L&&typeof L.id=="string"?L.id:"",f=De?ge.getStore(De):null;if(f&&L&&L.type==="delete")try{f.applyPush(L)}catch{}});let Ve=null,Qe=null,it=null,pt=null,kt=()=>{},ft=new Promise(E=>{kt=()=>E(void 0)}),Q=!1,ne=!1;async function Ce(E){let L=Oe(E);if(L===Qe||L===it)return;it=L;let De=`detail:${E}`,f={type:"issue-detail",params:{id:E}};try{ge.register(De,f)}catch($){t("register detail store failed: %o",$)}try{let $=await je.subscribeList(De,f);if(rt.getState().selected_id!==E||Oe(E)!==L){await $().catch(()=>{});return}Ve&&await Ve().catch(()=>{}),Ve=$,Qe=L}catch($){t("detail subscribe failed: %o",$),re($,"issue details")}finally{it===L&&(it=null)}}let Fe=new Map,st=new Set,et={board:0,worker:0},bt=!1,_t=Js;try{let E=window.localStorage.getItem($f);Fa(E)&&(_t=E)}catch{}let Mt="today";try{let E=window.localStorage.getItem(Zy);E!==null&&(Mt=Rn(E))}catch{}async function P(E){if(!Fa(E)||E===_t)return;_t=E;try{window.localStorage.setItem($f,E)}catch{}let L=Fe.get(sr);if(!L)return;Fe.delete(sr),await L().catch(()=>{});let De=ht();try{ge.register(sr,De)}catch(f){t("register %s store failed: %o",sr,f)}try{let f=await je.subscribeList(sr,De);Fe.set(sr,f)}catch(f){t("re-subscribe %s failed: %o",sr,f),re(f,"board")}}async function Z(E){let L=Rn(E);if(L===Mt)return;Mt=L;let De=T.get(rr);if(!De)return;T.delete(rr),await De().catch(()=>{});let f=He();try{ge.register(rr,f)}catch($){t("register %s store failed: %o",rr,$)}try{let $=await je.subscribeList(rr,f);T.set(rr,$)}catch($){t("re-subscribe %s failed: %o",rr,$),re($,"worker")}}let T=new Map,V=null,ee=null,Re=null,dt=null,wt=null;async function Zt(){dt=null,Be.clear(),wt=null,Me.clear(),V=null,ee=null,Fe.clear(),T.clear(),et.board+=1,et.worker+=1,Ut();let E=rt.getState().workspace.current?.path;if(E)try{await pe.send("set-workspace",{path:E})}catch(De){t("workspace restore after reconnect failed: %o",De);return}Ae();let L=rt.getState();Pe(L.view==="board"),fe(L.view==="worker"),J(L.view==="monitor"),w(L.view==="board"||L.view==="worker"||!!L.selected_id)}async function Ht(){t("clearing all subscriptions for workspace switch"),_e(),m(),I(),We.clear(),ot(),xe(),Nt(),Ae(),Ne();let E=rt.getState();if(E.selected_id)try{ge.unregister(`detail:${E.selected_id}`)}catch{}let L=rt.getState();Pe(L.view==="board"),fe(L.view==="worker"),J(L.view==="monitor"),w(L.view==="board"||L.view==="worker"||!!L.selected_id),L.selected_id&&Ie(L.selected_id)}async function Wt(E){t("requesting workspace switch to %s",E),ne=!0;try{let L=await pe.send("set-workspace",{path:E});t("workspace switch result: %o",L),L&&L.workspace&&(rt.setState({workspace:{current:{path:L.workspace.root_dir,database:L.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",E),L.changed&&(await Ht(),ce("Switched to "+Rt(E),"success",2e3)))}catch(L){throw t("workspace switch failed: %o",L),ce("Failed to switch workspace","error",3e3),L}finally{ne=!1}}async function un(E){t("requesting workspace git pull for %s",E);try{let L=await pe.send("git-pull-workspace",{});t("workspace git pull result: %o",L);let De=L?.status;if(De==="up_to_date"){ce("Already up to date","success",2e3);return}if(De==="stash_pop_conflict"){ce("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ce("Git pulled "+Rt(E),"success",2e3)}catch(L){t("workspace git pull failed: %o",L);let De=L?.code,f=L?.message;if(De==="rebase_conflict"){ce("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(De==="rebase_conflict_abort_failed"){ce("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(De==="busy"){ce("Git pull skipped: another operation is running","warning",3e3);return}let $=f?`: ${f}`:"";throw ce(`Git pull failed${$}`,"error",3e3),L}}async function Ct(E,L){t("setting workspace visibility %s \u2192 %s",E,String(L));try{await pe.send("set-workspace-visibility",{path:E,visible:L}),await Ge()}catch(De){t("workspace visibility update failed: %o",De),ce("Failed to update project visibility","error",3e3)}}async function Ge(){try{let E=await pe.send("list-workspaces",{});if(t("workspaces loaded: %o",E),E&&Array.isArray(E.workspaces)){let L=E.workspaces.map(N=>({path:N.path,database:N.database,pid:N.pid,version:N.version})),De=E.current?{path:E.current.root_dir,database:E.current.db_path}:null,f=Array.isArray(E.hidden)?E.hidden.filter(N=>typeof N=="string"):[];rt.setState({workspace:{current:De,available:L,hidden:f}});let $=window.localStorage.getItem("beads-ui.workspace");$&&(!L.some(se=>se.path===$)||f.includes($)?window.localStorage.removeItem("beads-ui.workspace"):De&&$!==De.path&&(t("restoring saved workspace preference: %s",$),await Wt($)))}}catch(E){t("failed to load workspaces: %o",E)}}pe.on("workspace-changed",E=>{t("workspace-changed event: %o",E),E&&E.root_dir&&(rt.setState({workspace:{current:{path:E.root_dir,database:E.db_path}}}),Ge(),Ht())});let dn=!1;if(typeof pe.onConnection=="function"){let E=L=>{t("ws state %s",L),L==="reconnecting"||L==="closed"?(dn=!0,ce("Connection lost. Reconnecting\u2026","error",4e3)):L==="open"&&dn&&(dn=!1,ce("Reconnected","success",2200),Yy(rt,(De,f)=>{t(`${De}: %o`,f)}),Zt())};pe.onConnection(E)}let tn="board";try{let E=window.localStorage.getItem("beads-ui.view");(E==="board"||E==="worker"||E==="monitor")&&(tn=E)}catch(E){t("view parse error: %o",E)}let rt=Tc({config:Vy(),view:tn});pe.on("worker-queue-snapshot",E=>{let L=E;if(!L||!L.queue)return;let De=rt.getState().workspace.current?.path;if(typeof De=="string"&&De.length>0&&L.root_dir!==De){t("dropping worker-queue snapshot for %s",String(L.root_dir));return}try{We.set(L.queue)}catch{}}),pe.on("worker-parallel-analysis-snapshot",E=>{let L=E;if(!L)return;let De=rt.getState().workspace.current?.path;if(!(typeof De=="string"&&De.length>0&&typeof L.root_dir=="string"&&L.root_dir!==De))try{D.set({settings:L.settings,job:L.job??null,runs:Array.isArray(L.runs)?L.runs:[],last_good:L.last_good??null})}catch{}});let Le=Sc(rt);Le.start();let R=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),de=async(E,L)=>{try{return await ke(E,L)}catch(De){if(R.has(E))throw De;return[]}};yp({global_element:r,repo_element:s},rt,Le);let Ee=document.getElementById("workspace-picker");Ee&&pf(Ee,rt,Wt,un,Ct);let ct=$p(e,(E,L)=>ke(E,L));try{let E=document.getElementById("new-issue-btn");E&&E.addEventListener("click",()=>ct.open())}catch{}let $t=Ep(e,{policyStore:Be,queueStore:We,implPresetStore:Me,transport:(E,L)=>ke(E,L),onOpenChange:E=>{let L=bt;bt=E,It(),L&&E===!1&&nn.refreshSessionDefaults()},labelOptions:()=>{let E=new Set;for(let[L]of pl)for(let De of ge.snapshotFor(L)||[]){let f=De.labels;if(Array.isArray(f))for(let $ of f)typeof $=="string"&&$.length>0&&E.add($)}return Array.from(E).sort()}});try{let E=document.getElementById("display-settings-btn");E&&(E.setAttribute("aria-label","\uC124\uC815"),E.setAttribute("title","\uC124\uC815"),E.addEventListener("click",()=>$t.open()))}catch{}let gt=document.createElement("div");gt.className="md-viewer-root",document.body.appendChild(gt);let Dt=Ho(gt,{getWorkspacePath:()=>rt.getState().workspace.current?.path}),Gt=zc(i,{gotoIssue:E=>Le.gotoIssue(E),issueStores:ge,transport:de,workerQueueStore:We,uiOrderStore:qe,displayPolicyStore:Be,closedRange:_t,onClosedRangeChange:E=>{P(E)},onNewIssue:()=>ct.open(),openDoc:jt}),nn=cl(c,{transport:de,issueStores:ge,queueStore:We,analysisStore:D,sessionLogStore:Ke,uiOrderStore:qe,gotoIssue:E=>rt.setState({selected_id:E}),getWorkspacePath:()=>rt.getState().workspace.current?.path,openDoc:jt,doneRange:Mt,onDoneRangeChange:E=>{Z(E)}}),St=hp(u,{transport:de,pipelineStore:ue,execPresetStore:Me,sessionLogStore:Ke,router:Le,gotoIssue:E=>Le.gotoIssue(E),getWorkspacePath:()=>rt.getState().workspace.current?.path,switchWorkspace:E=>Wt(E),openDoc:jt}),rn=hd(d,{issueStores:ge,transport:de,queueStore:We,execPresetStore:Me,sessionLogStore:Ke,getWorkspacePath:()=>rt.getState().workspace.current?.path,mdViewer:Dt,onNavigate:E=>{rt.getState().view==="worker"?rt.setState({selected_id:E}):Le.gotoIssue(E)},onClose:()=>{let E=rt.getState();rt.setState({selected_id:null});try{Le.gotoView(E.view==="worker"||E.view==="monitor"?E.view:"board")}catch{}},onOpenExecPresets:()=>{$t.open("execution")}}),gn=rt.getState().selected_id;gn&&(d.hidden=!1,rn.load(gn),Ie(gn)),rt.subscribe(E=>{let L=E.selected_id;L?(d.hidden=!1,rn.load(L),ne||Ie(L)):(rn.clear(),d.hidden=!0,Ne())});let Pn=E=>{i.hidden=E.view!=="board",c.hidden=E.view!=="worker",u.hidden=E.view!=="monitor",o&&o.classList.toggle("is-quiet",E.view==="monitor"),Pe(E.view==="board"),fe(E.view==="worker"),J(E.view==="monitor"),w(E.view==="board"||E.view==="worker"||bt||!!E.selected_id),!E.selected_id&&E.view==="board"&&Gt.load(),E.view==="worker"&&nn.load(),E.view==="monitor"?St.load():St.pause(),window.localStorage.setItem("beads-ui.view",E.view)};rt.subscribe(Pn),Pn(rt.getState()),xe(),Ae(),Ut(),Ge().finally(()=>{Q=!0,kt()}),window.addEventListener("keydown",E=>{let L=E.ctrlKey||E.metaKey,De=String(E.key||"").toLowerCase(),f=E.target,$=f&&f.tagName?String(f.tagName).toLowerCase():"",N=$==="input"||$==="textarea"||$==="select"||f&&typeof f.isContentEditable=="boolean"&&f.isContentEditable;L&&De==="n"&&(N||(E.preventDefault(),ct.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Xy(t)});export{Xy as bootstrap,Vy as readBootstrapConfig,Yy as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
