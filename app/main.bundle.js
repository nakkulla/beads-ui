var Jf=Object.create;var Pa=Object.defineProperty;var e_=Object.getOwnPropertyDescriptor;var t_=Object.getOwnPropertyNames;var n_=Object.getPrototypeOf,r_=Object.prototype.hasOwnProperty;var s_=(e,t,n)=>t in e?Pa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Da=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var o_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of t_(t))!r_.call(e,s)&&s!==n&&Pa(e,s,{get:()=>t[s],enumerable:!(r=e_(t,s))||r.enumerable});return e};var a_=(e,t,n)=>(n=e!=null?Jf(n_(e)):{},o_(t||!e||!e.__esModule?Pa(n,"default",{value:e,enumerable:!0}):n,e));var At=(e,t,n)=>s_(e,typeof t!="symbol"?t+"":t,n);var _c=Da((yv,fc)=>{var Cr=1e3,Rr=Cr*60,Or=Rr*60,pr=Or*24,c_=pr*7,u_=pr*365.25;fc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return d_(e);if(n==="number"&&isFinite(e))return t.long?f_(e):p_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function d_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*u_;case"weeks":case"week":case"w":return n*c_;case"days":case"day":case"d":return n*pr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Or;case"minutes":case"minute":case"mins":case"min":case"m":return n*Rr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Cr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function p_(e){var t=Math.abs(e);return t>=pr?Math.round(e/pr)+"d":t>=Or?Math.round(e/Or)+"h":t>=Rr?Math.round(e/Rr)+"m":t>=Cr?Math.round(e/Cr)+"s":e+"ms"}function f_(e){var t=Math.abs(e);return t>=pr?no(e,t,pr,"day"):t>=Or?no(e,t,Or,"hour"):t>=Rr?no(e,t,Rr,"minute"):t>=Cr?no(e,t,Cr,"second"):e+" ms"}function no(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var gc=Da((vv,mc)=>{function __(e){n.debug=n,n.default=n,n.coerce=c,n.disable=a,n.enable=s,n.enabled=i,n.humanize=_c(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let g=0;for(let y=0;y<d.length;y++)g=(g<<5)-g+d.charCodeAt(y),g|=0;return n.colors[Math.abs(g)%n.colors.length]}n.selectColor=t;function n(d){let g,y=null,h,A;function M(...W){if(!M.enabled)return;let Z=M,le=Number(new Date),V=le-(g||le);Z.diff=V,Z.prev=g,Z.curr=le,g=le,W[0]=n.coerce(W[0]),typeof W[0]!="string"&&W.unshift("%O");let B=0;W[0]=W[0].replace(/%([a-zA-Z%])/g,(G,P)=>{if(G==="%%")return"%";B++;let L=n.formatters[P];if(typeof L=="function"){let ne=W[B];G=L.call(Z,ne),W.splice(B,1),B--}return G}),n.formatArgs.call(Z,W),(Z.log||n.log).apply(Z,W)}return M.namespace=d,M.useColors=n.useColors(),M.color=n.selectColor(d),M.extend=r,M.destroy=n.destroy,Object.defineProperty(M,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(h!==n.namespaces&&(h=n.namespaces,A=n.enabled(d)),A),set:W=>{y=W}}),typeof n.init=="function"&&n.init(M),M}function r(d,g){let y=n(this.namespace+(typeof g>"u"?":":g)+d);return y.log=this.log,y}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let g=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of g)y[0]==="-"?n.skips.push(y.slice(1)):n.names.push(y)}function o(d,g){let y=0,h=0,A=-1,M=0;for(;y<d.length;)if(h<g.length&&(g[h]===d[y]||g[h]==="*"))g[h]==="*"?(A=h,M=y,h++):(y++,h++);else if(A!==-1)h=A+1,M++,y=M;else return!1;for(;h<g.length&&g[h]==="*";)h++;return h===g.length}function a(){let d=[...n.names,...n.skips.map(g=>"-"+g)].join(",");return n.enable(""),d}function i(d){for(let g of n.skips)if(o(d,g))return!1;for(let g of n.names)if(o(d,g))return!0;return!1}function c(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}mc.exports=__});var bc=Da((on,ro)=>{on.formatArgs=g_;on.save=b_;on.load=h_;on.useColors=m_;on.storage=y_();on.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();on.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function m_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function g_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ro.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}on.log=console.debug||console.log||(()=>{});function b_(e){try{e?on.storage.setItem("debug",e):on.storage.removeItem("debug")}catch{}}function h_(){let e;try{e=on.storage.getItem("debug")||on.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function y_(){try{return localStorage}catch{}}ro.exports=gc()(on);var{formatters:v_}=ro.exports;v_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Jr=globalThis,Ys=Jr.trustedTypes,Xl=Ys?Ys.createPolicy("lit-html",{createHTML:e=>e}):void 0,Na="$lit$",Mn=`lit$${Math.random().toFixed(9).slice(2)}$`,qa="?"+Mn,i_=`<${qa}>`,lr=document,es=()=>lr.createComment(""),ts=e=>e===null||typeof e!="object"&&typeof e!="function",Fa=Array.isArray,rc=e=>Fa(e)||typeof e?.[Symbol.iterator]=="function",Ma=`[ 	
\f\r]`,Qr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ql=/-->/g,Jl=/>/g,ar=RegExp(`>|${Ma}(?:([^\\s"'>=/]+)(${Ma}*=${Ma}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ec=/'/g,tc=/"/g,sc=/^(?:script|style|textarea|title)$/i,ja=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=ja(1),rs=ja(2),pv=ja(3),bn=Symbol.for("lit-noChange"),Ft=Symbol.for("lit-nothing"),nc=new WeakMap,ir=lr.createTreeWalker(lr,129);function oc(e,t){if(!Fa(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Xl!==void 0?Xl.createHTML(t):t}var ac=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Qr;for(let i=0;i<n;i++){let c=e[i],u,d,g=-1,y=0;for(;y<c.length&&(a.lastIndex=y,d=a.exec(c),d!==null);)y=a.lastIndex,a===Qr?d[1]==="!--"?a=Ql:d[1]!==void 0?a=Jl:d[2]!==void 0?(sc.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=ar):d[3]!==void 0&&(a=ar):a===ar?d[0]===">"?(a=s??Qr,g=-1):d[1]===void 0?g=-2:(g=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?ar:d[3]==='"'?tc:ec):a===tc||a===ec?a=ar:a===Ql||a===Jl?a=Qr:(a=ar,s=void 0);let h=a===ar&&e[i+1].startsWith("/>")?" ":"";o+=a===Qr?c+i_:g>=0?(r.push(u),c.slice(0,g)+Na+c.slice(g)+Mn+h):c+Mn+(g===-2?i:h)}return[oc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ns=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,d]=ac(t,n);if(this.el=e.createElement(u,r),ir.currentNode=this.el.content,n===2||n===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=ir.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(Na)){let y=d[a++],h=s.getAttribute(g).split(Mn),A=/([.?@])?(.*)/.exec(y);c.push({type:1,index:o,name:A[2],strings:h,ctor:A[1]==="."?Xs:A[1]==="?"?Qs:A[1]==="@"?Js:ur}),s.removeAttribute(g)}else g.startsWith(Mn)&&(c.push({type:6,index:o}),s.removeAttribute(g));if(sc.test(s.tagName)){let g=s.textContent.split(Mn),y=g.length-1;if(y>0){s.textContent=Ys?Ys.emptyScript:"";for(let h=0;h<y;h++)s.append(g[h],es()),ir.nextNode(),c.push({type:2,index:++o});s.append(g[y],es())}}}else if(s.nodeType===8)if(s.data===qa)c.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(Mn,g+1))!==-1;)c.push({type:7,index:o}),g+=Mn.length-1}o++}}static createElement(t,n){let r=lr.createElement("template");return r.innerHTML=t,r}};function cr(e,t,n=e,r){if(t===bn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=ts(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=cr(e,s._$AS(e,t.values),s,r)),t}var Zs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??lr).importNode(n,!0);ir.currentNode=s;let o=ir.nextNode(),a=0,i=0,c=r[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Er(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new eo(o,this,t)),this._$AV.push(u),c=r[++i]}a!==c?.index&&(o=ir.nextNode(),a++)}return ir.currentNode=lr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Er=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Ft,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=cr(this,t,n),ts(t)?t===Ft||t==null||t===""?(this._$AH!==Ft&&this._$AR(),this._$AH=Ft):t!==this._$AH&&t!==bn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):rc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ft&&ts(this._$AH)?this._$AA.nextSibling.data=t:this.T(lr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ns.createElement(oc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Zs(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=nc.get(t.strings);return n===void 0&&nc.set(t.strings,n=new ns(t)),n}k(t){Fa(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(es()),this.O(es()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ur=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Ft,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Ft}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=cr(this,t,n,0),a=!ts(t)||t!==this._$AH&&t!==bn,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=cr(this,i[r+c],n,c),u===bn&&(u=this._$AH[c]),a||(a=!ts(u)||u!==this._$AH[c]),u===Ft?t=Ft:t!==Ft&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===Ft?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Xs=class extends ur{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ft?void 0:t}},Qs=class extends ur{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ft)}},Js=class extends ur{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=cr(this,t,n,0)??Ft)===bn)return;let r=this._$AH,s=t===Ft&&r!==Ft||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Ft&&(r===Ft||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},eo=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){cr(this,t)}},ic={M:Na,P:Mn,A:qa,C:1,L:ac,R:Zs,D:rc,V:cr,I:Er,H:ur,N:Qs,U:Js,B:Xs,F:eo},l_=Jr.litHtmlPolyfillSupport;l_?.(ns,Er),(Jr.litHtmlVersions??(Jr.litHtmlVersions=[])).push("3.3.1");var Qe=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Er(t.insertBefore(es(),o),o,void 0,n??{})}return s._$AI(e),s};var to="today",lc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Tr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Rn(e){return e==="today"?"today":"7d"}function Ba(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function dr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function cc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function uc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function dc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function pc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var hc=a_(bc(),1);function Lt(e){return(0,hc.default)(`beads-ui:${e}`)}function kn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function fr(e,t){let n=kn(e.created_at),r=kn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function wc(e,t){let n=kn(e.created_at),r=kn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function so(e,t){let n=kn(e.updated_at),r=kn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function kc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=kn(e.created_at),o=kn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function $c(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var w_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function yc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function vc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=w_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function xc(e,t){let n=yc(e),r=yc(t);if(n!==r)return n<r?-1:1;let s=vc(e),o=vc(t);if(s!==o)return s<o?-1:1;let a=kn(e&&e.created_at),i=kn(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Ua=2**20;function Lr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-kn(e&&e.created_at)}function oo(e){return(t,n)=>{let r=Lr(t,e),s=Lr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Wa(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Lr(i,n)-Ua};if(!i)return{rank:Lr(a,n)+Ua};let c=Lr(a,n),u=Lr(i,n),d=(c+u)/2;return c<d&&d<u?{rank:d}:{renormalize:r.map((g,y)=>({bead_id:g.id,rank:y*Ua}))}}function za(e,t={}){let n=Lt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||fr;function u(){for(let y of Array.from(a))try{y()}catch{}}function d(){s=Array.from(r.values()).sort(c)}function g(y){if(i||!y||y.id!==e)return;let h=Number(y.revision)||0;if(n("apply %s rev=%d",y.type,h),!(h<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if(h<=o)return;r.clear();let A=Array.isArray(y.issues)?y.issues:[];for(let M of A)M&&typeof M.id=="string"&&M.id.length>0&&r.set(M.id,M);d(),o=h,u();return}if(y.type==="upsert"){let A=y.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let M=r.get(A.id);if(!M)r.set(A.id,A);else{let W=Number.isFinite(M.updated_at)?M.updated_at:0,Z=Number.isFinite(A.updated_at)?A.updated_at:0;if(W<=Z){for(let le of Object.keys(M))le in A||delete M[le];for(let[le,V]of Object.entries(A))M[le]=V}}d()}o=h,u()}else if(y.type==="delete"){let A=String(y.issue_id||"");A&&(r.delete(A),d()),o=h,u()}}}return{id:e,subscribe(y){return a.add(y),()=>{a.delete(y)}},applyPush:g,snapshot(){return s},size(){return r.size},getById(y){return r.get(y)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function ao(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Ac(e){let t=Lt("subs"),n=new Map,r=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(c.added)?c.added:[],g=Array.isArray(c.updated)?c.updated:[],y=Array.isArray(c.removed)?c.removed:[];for(let h of Array.from(u)){let A=n.get(h);if(!A)continue;let M=A.itemsById;for(let W of d)typeof W=="string"&&W.length>0&&M.set(W,!0);for(let W of g)typeof W=="string"&&W.length>0&&M.set(W,!0);for(let W of y)typeof W=="string"&&W.length>0&&M.delete(W)}}async function o(i,c){let u=ao(c);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let g=n.get(i);if(g&&g.key!==u){let y=r.get(g.key);y&&(y.delete(i),y.size===0&&r.delete(g.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(g){let y=n.get(i)||null;if(y){let h=r.get(y.key);h&&(h.delete(i),h.size===0&&r.delete(y.key))}throw n.delete(i),g}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let g=n.get(i)||null;if(g){let y=r.get(g.key);y&&(y.delete(i),y.size===0&&r.delete(g.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:ao,selectors:{getIds(i){let c=n.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=n.get(i);return u?u.itemsById.has(c):!1},count(i){let c=n.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=n.get(i),u={};if(!c)return u;for(let d of c.itemsById.keys())u[d]=!0;return u}}}}function Sc(){let e=Lt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let c of Array.from(r))try{c()}catch{}}function a(c,u,d){let g=u?ao(u):"",y=n.get(c)||"",h=t.has(c);if(e("register %s key=%s (prev=%s)",c,g,y),h&&y&&g&&y!==g){let A=t.get(c);if(A)try{A.dispose()}catch{}let M=s.get(c);if(M){try{M()}catch{}s.delete(c)}let W=za(c,d);t.set(c,W);let Z=W.subscribe(()=>o());s.set(c,Z)}else if(!h){let A=za(c,d);t.set(c,A);let M=A.subscribe(()=>o());s.set(c,M)}return n.set(c,g),()=>i(c)}function i(c){e("unregister %s",c),n.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let d=s.get(c);if(d){try{d()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return r.add(c),()=>r.delete(c)}}}function Ec(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Tc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Cc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ha(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function k_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function $_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Rc(e){let t=Lt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):k_(r),a=$_(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ha(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ha(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var x_=Object.freeze({workspace_config:{default_workspace:null}});function Oc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:x_.workspace_config.default_workspace}}}function Lc(e={}){let t=Lt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Oc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Oc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),c=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!c||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Ic(e){let t=Lt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function c(u){return async(g,y)=>{let h=s++,A=Date.now();r.set(h,{type:g,start_ts:A}),t("request start id=%d type=%s count=%d",h,g,n+1),a();let M=!1,W=()=>{M||(M=!0,r.delete(h),i())},Z=setTimeout(()=>{M||(t("request TIMEOUT id=%d type=%s elapsed=%dms",h,g,Date.now()-A),W())},3e4);try{let le=await u(g,y),V=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",h,g,V),le}catch(le){let V=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",h,g,V,le),le}finally{clearTimeout(Z),W()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,g])=>({id:d,type:g.type,elapsed_ms:u-g.start_ts}))}}}function pe(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function io(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort($c),c;switch(i){case"created_desc":return c.sort(fr),c;case"created_asc":return c.sort(wc),c;case"updated_desc":return c.sort(so),c;case"priority":return c.sort(kc),c;case"manual":default:{let u=n();return u?c.sort(oo(u)):c.sort(fr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function On(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Kt(e){let t=On(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function an(e,t){let n=On(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Pc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=On(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function lo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function co(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=lo(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function uo(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=Pc(n);return{total:n.length,count:r,current:s,children:n}}function po(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Wa(i,c,u.order),a);s(u,d);let g=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(g&&g.conflict){let y={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};n.set(y);let h=r(Wa(i,c,y.order),a);s(y,h);let A=await t("ui-order-set",{expected_revision:y.revision,entries:h});A&&A.applied&&n.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else g&&g.applied&&n.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function Dc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function fo(e,t){let n=Dc(e),r=Dc(t);return n.length===0||r.length===0?!1:n!==r}function _o(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ga(e,t){return!t||typeof e!="string"||e.length===0||_o(t.visible_labels).includes(e)?!0:_o(t.hidden_labels).includes(e)?!1:!_o(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Mc(e,t){return _o(e).filter(n=>Ga(n,t))}function Yn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function A_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function S_(e,t,n,r,s){return l`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function E_(e,t,n,r){return l`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${A_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function mo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(xc):a;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?S_(t.parent_id,e.count,n,r,t.onToggle):l`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?l`<div class="board-card__roll-list">
            ${i.map((c,u)=>E_(c,u+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var T_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},qc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Nc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},C_={review:"\u2713",skip:"\u2298"},Zn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function R_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Fc(e){let t=e&&e.fill||"none";return t==="none"?Zn.none:e&&e.stale===!0?Zn.stale:t==="dim"?Zn.dim:e&&e.glyph==="review"?Zn.review:e&&e.glyph==="skip"?Zn.skip:Zn.done}function O_(e){if(!e||e.fill==="none"||!e.approval_state)return Fc(e);let t=[];return e.glyph==="review"?t.push(Zn.review):e.glyph==="skip"&&t.push(Zn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function L_(e,t,n,r){let s=T_[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=C_[t&&t.glyph||""]||"",c="bar";o==="dim"?c+=` b-${s} dim`:o==="full"&&(c+=` b-${s} full`),a&&(c+=" stale"),n&&(c+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",g=qc[e]||e,y=r?jc(t):null;if(!y)return l`
      <div class="seg">
        <div class=${c} style=${d}>${i}</div>
        <div class=${u}>${g}</div>
      </div>
    `;let h=`${g} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${y.path}`;return l`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${h}
      title=${h}
      @click=${A=>{A.preventDefault(),A.stopPropagation(),r(A,y,e)}}
    >
      <div class=${c} style=${d}>${i}</div>
      <div class=${u}>${g}</div>
    </button>
  `}function jc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function go(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=Nc[e.route]||Nc.spec_backed,o=e.stages,a=R_(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${qc[u]||u} ${u==="plan"?O_(o[u]||{}):Fc(o[u]||{})}`).join(" \xB7 ")}`,c=!!r&&s.some(u=>jc(o[u]||{})!==null);return l`
    <div
      class="stp"
      role=${c?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>L_(u,o[u]||{},u===a,r))}
    </div>
  `}function I_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Bc=2;function Uc(e){let t=e.slice(0,Bc).join(", "),n=e.length-Bc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function P_(e,t){if(!t)return[];let n=[];if(t.external){let a=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(l`<span class="ctl-chip ctl-chip--blocked">${a}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let a of r)(fo(e,a)?o:s).push(a);return s.length>0&&n.push(l`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Uc(s)}</span
      >`),o.length>0&&n.push(l`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Uc(o)}</span
      >`),n}function Ka(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function bo(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Nn(e){return`${e.kind}:${bo(e)}@${e.sha}`}function ho(e,t){if(!e)return null;let n=Ka(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=Ka(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Nn(t)}`:"";return{kind:e.kind,label:i,title:`${c}${u}`}}function Wc(e,t){let n=ho(e,t);return n?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function D_(e){if(!e)return null;let t=Ka(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Nn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function M_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Yn(n,"route")){let i=r.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Yn(n,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Yn(n,"pr")){let i=r.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Wc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Nn(i)}`}
        >${`exec ${i.kind==="delegated"?bo(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of Mc(e.labels,n))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Yn(n,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Yn(n,"blocked")&&s.push(...P_(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Yn(n,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function N_(e){let t=an(e.created_at),n=an(e.updated_at);return!t&&!n?"":l`<span class="board-card__times">
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
  </span>`}function q_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return mo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:N_(e),empty_label:"children \uC5C6\uC74C",childChips:Va,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Va(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return ho(t,n)?l`<span class="board-card__roll-child-chips">
    ${Wc(t,n)}
    ${D_(n)}
  </span>`:null}function yo(e,t){let n=I_(e.priority);return l`
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
      ${M_(e,t)}
      ${e.workflow&&Yn(t.policy||null,"stepper")?go(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${q_(e,t)}
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
              ${lc.map(o=>l`<option
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
        ${e.items.map(o=>yo(o,t))}
      </div>
    </section>
  `}function zc(e,t,n){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>yo(r,t))}
        </div>
      </div>
    </dialog>
  `}var F_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],j_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],B_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function U_(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return l`
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
  `}function Hc(e,t,n){return l`
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
        ${F_.map(r=>l`<option
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
        ${j_.map(r=>l`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${U_(e,t,n)}
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
        ${B_.map(r=>l`<option
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
  `}var W_=200,z_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},H_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Gc="beads-ui.board.sort",Kc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function G_(){try{let e=window.localStorage.getItem(Gc);if(e&&Kc.has(e))return e}catch{}return"created_desc"}function Vc(e,t){let n=Lt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,g=t.openDoc,y=t.closedRange||to,h=s?io(s,a):null,A=po({transport:o,uiOrderStore:a}),M=[],W=[],Z=[],le=[],V=[],B=[],j=!1,G=0,P=G_(),L=new Map,ne=new Map,Ee=new Map,ke=new Set,z={search:"",priority:"",type:"",labels:[]},te=!1,me=null;function xe(E){return String(E.status||"open")==="open"}function he(E){let Y=String(E.status||"open");return Y==="open"||Y==="blocked"}function ce(E){let Y=z.search.trim().toLowerCase(),fe=z.priority,x=z.type,b=z.labels;return E.filter($=>{if(Y){let U=String($.id||"").toLowerCase(),oe=String($.title||"").toLowerCase();if(!U.includes(Y)&&!oe.includes(Y))return!1}if(fe!==""&&String($.priority)!==fe||x!==""&&String($.issue_type||"")!==x)return!1;if(b.length>0){let U=Array.isArray($.labels)?$.labels:[];if(!b.some(oe=>U.includes(oe)))return!1}return!0})}function Ae(){let E=new Set;for(let Y of[M,W,Z,le,V,B])for(let fe of Y){let x=Array.isArray(fe.labels)?fe.labels:[];for(let b of x)typeof b=="string"&&b.length>0&&E.add(b)}return Array.from(E).sort()}function ye(){return z.search.trim()!==""||z.priority!==""||z.type!==""||z.labels.length>0}function K(){try{if(h){let E=h.selectBoardColumn("tab:board:in-progress","in_progress",P),Y=h.selectBoardColumn("tab:board:blocked","blocked",P).filter(he),fe=new Set(E.map(Re=>Re.id)),x=h.selectBoardColumn("tab:board:ready","ready",P).filter(Re=>xe(Re)&&!fe.has(Re.id)),b=h.selectBoardColumn("tab:board:resolved","resolved",P),$=h.selectBoardColumn("tab:board:deferred","deferred",P),U=h.selectBoardColumn("tab:board:closed","closed").slice(0,W_),oe=[...Y,...x,...E,...b,...U];se(oe);let ae=new Set;for(let Re of oe)Re&&Re.id&&!lo(Re)&&ae.add(Re.id);let we=!ye();M=we?ss(Y,ae):Y,W=we?ss(x,ae):x,Z=we?ss(E,ae):E,le=we?ss(b,ae):b,V=$,G=$.length,B=we?ss(U,ae):U,L=new Map;for(let Re of M)L.set(Re.id,"open");for(let Re of W)L.set(Re.id,"open");for(let Re of Z)L.set(Re.id,"in_progress");for(let Re of le)L.set(Re.id,"resolved");for(let Re of V)L.set(Re.id,"deferred");for(let Re of B)L.set(Re.id,"closed");ne=new Map;for(let Re of M)ne.set(Re.id,"blocked-col");for(let Re of W)ne.set(Re.id,"ready-col");for(let Re of Z)ne.set(Re.id,"in-progress-col");for(let Re of le)ne.set(Re.id,"resolved-col");for(let Re of B)ne.set(Re.id,"closed-col")}tt()}catch{M=[],W=[],Z=[],le=[],V=[],B=[],Ee=new Map,tt()}}function se(E){Ee=co(E)}function ue(E){return uo(Ee,E)}function $e(E){return!ke.has(E)}function He(E,Y){E.preventDefault(),E.stopPropagation(),ke.has(Y)?ke.delete(Y):ke.add(Y),tt()}function ge(E,Y){E.preventDefault(),E.stopPropagation(),r(Y)}function qe(E,Y){E.preventDefault(),E.stopPropagation(),r(Y)}function N(E,Y){me||r(Y)}function be(E,Y){E.preventDefault(),E.stopPropagation(),K_(Y).then(fe=>{fe&&pe("\uBCF5\uC0AC\uB428","success",1200)})}function Le(E,Y){me=Y,E.dataTransfer&&(E.dataTransfer.setData("text/plain",Y),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging")}function Ue(E){E.target.classList.remove("board-card--dragging"),vt(),setTimeout(()=>{me=null},0)}function ze(E){let Y=String(E.target.value||"");!Y||Y===y||(y=Y,u&&u(Y),tt())}function We(){return i?i.get():null}function Ge(E){let Y=c?c.get():null,fe=Y?Y.cleanup_failed:null;if(!fe||typeof fe!="object"||Array.isArray(fe))return null;let x=fe[E];return!x||typeof x!="object"||Array.isArray(x)?null:x}let et={onCardClick:N,onCopyId:be,onDragStart:Le,onDragEnd:Ue,onClosedRangeChange:ze,rollupFor:ue,isExpanded:$e,onRollupToggle:He,onChildClick:ge,onFromChipClick:qe,onOpenDoc:g?(E,Y)=>g(Y):void 0,cleanupFailureFor:Ge,get policy(){return We()}};function it(E,Y){me||(Pe(),r(Y))}function ft(E,Y){E.preventDefault(),E.stopPropagation(),Pe(),r(Y)}let $t={...et,onCardClick:it,onChildClick:ft,onFromChipClick:ft,onOpenDoc:g?(E,Y)=>{Pe(),g(Y)}:void 0,get policy(){return We()}};function _t(E){let Y=E.target,fe=e.querySelector(".board-filter__labels");Y&&fe&&fe.contains(Y)||Oe()}function Q(E){E.key==="Escape"&&Oe()}function ee(){te||(te=!0,document.addEventListener("mousedown",_t),document.addEventListener("keydown",Q),tt())}function Oe(){te&&(te=!1,document.removeEventListener("mousedown",_t),document.removeEventListener("keydown",Q),tt())}function Ne(E){E.key==="Escape"&&Pe()}function Te(){j||(j=!0,document.addEventListener("keydown",Ne),tt())}function Pe(){j&&(j=!1,document.removeEventListener("keydown",Ne),tt())}let je={onClose:Pe,onOverlayClick(E){E.target===E.currentTarget&&Pe()}},ot={onSearchInput(E){z.search=String(E.target.value||""),K()},onPriorityChange(E){z.priority=String(E.target.value||""),K()},onTypeChange(E){z.type=String(E.target.value||""),K()},onSortChange(E){let Y=String(E.target.value||"");if(!(!Kc.has(Y)||Y===P)){P=Y;try{window.localStorage.setItem(Gc,Y)}catch{}K()}},onDeferredToggle(){j?Pe():Te()},onLabelMenuToggle(){te?Oe():ee()},onLabelToggle(E){let Y=z.labels.indexOf(E);Y===-1?z.labels.push(E):z.labels.splice(Y,1),K()},onLabelClear(){z.labels.length!==0&&(z.labels=[],K())},onNewIssue(){d&&d()}};function nt(){return l`
      <div class="board-view">
        ${Hc(z,ot,{sort_mode:P,deferred_popup_open:j,deferred_count:G,label_options:Ae(),label_menu_open:te})}
        <div class="board-root">
          ${Ir({title:"Blocked",id:"blocked-col",items:ce(M)},et)}
          ${Ir({title:"Ready",id:"ready-col",items:ce(W)},et)}
          ${Ir({title:"In progress",id:"in-progress-col",items:ce(Z)},et)}
          ${Ir({title:"Resolved",id:"resolved-col",items:ce(le)},et)}
          ${Ir({title:"Closed",id:"closed-col",items:ce(B),is_closed:!0,closed_range:y},et)}
        </div>
        ${j?zc({items:ce(V),count:G},$t,je):""}
      </div>
    `}function tt(){Qe(nt(),e),yt()}function yt(){try{let E=e.querySelector("#deferred-popup");E&&!E.open&&(typeof E.showModal=="function"?E.showModal():E.setAttribute("open",""));let Y=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let fe of Y)Array.from(fe.querySelectorAll(".board-card")).forEach((b,$)=>{b.tabIndex=$===0?0:-1})}catch{}}async function It(E,Y){if(!o){pe("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:E,status:Y}),pe("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(fe){n("update-status failed: %o",fe),pe("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function mt(E){switch(E){case"blocked-col":return M;case"ready-col":return W;case"in-progress-col":return Z;case"resolved-col":return le;default:return[]}}function Mt(E,Y,fe){if(!o||!a)return;let x=mt(E),b=x.find(we=>we.id===Y);if(!b)return;let $=x.filter(we=>we.id!==Y),U=fe.closest?fe.closest(".board-card"):null,oe=$.length;if(U){let we=U.getAttribute("data-issue-id");if(we===Y)return;let Re=$.findIndex(Je=>Je.id===we);Re>=0&&(oe=Re)}let ae=$.slice();ae.splice(oe,0,b),A.applyReorder(Y,ae,oe)}function vt(){for(let E of Array.from(e.querySelectorAll(".board-column--drag-over")))E.classList.remove("board-column--drag-over")}let Ve=null;e.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let fe=E.target.closest(".board-column");fe&&fe!==Ve&&(Ve&&Ve.classList.remove("board-column--drag-over"),fe.classList.add("board-column--drag-over"),Ve=fe)}),e.addEventListener("dragleave",E=>{let Y=E.relatedTarget;(!Y||!e.contains(Y))&&Ve&&(Ve.classList.remove("board-column--drag-over"),Ve=null)}),e.addEventListener("drop",E=>{E.preventDefault(),Ve&&(Ve.classList.remove("board-column--drag-over"),Ve=null);let Y=E.target,fe=Y.closest(".board-column");if(!fe)return;let x=E.dataTransfer?.getData("text/plain")||"";if(!x)return;let b=fe.id,$=ne.get(x);if($&&$===b){if(H_.has(b)){if(P!=="manual"){pe("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Mt(b,x,Y)}return}let U=z_[b];if(!U){pe("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}L.get(x)!==U&&It(x,U)}),e.addEventListener("keydown",E=>{let Y=E.target;if(!(Y instanceof HTMLElement))return;let fe=String(Y.tagName||"").toLowerCase();if(fe==="input"||fe==="textarea"||fe==="select"||fe==="button"||fe==="a"||Y.isContentEditable===!0)return;let x=Y.closest(".board-card");if(!x)return;let b=String(E.key||"");if(b==="Enter"||b===" "){E.preventDefault();let ae=x.getAttribute("data-issue-id");ae&&r(ae);return}if(b!=="ArrowUp"&&b!=="ArrowDown"&&b!=="ArrowLeft"&&b!=="ArrowRight")return;E.preventDefault();let $=x.closest(".board-column");if(!$)return;let U=Array.from($.querySelectorAll(".board-card")),oe=U.indexOf(x);if(b==="ArrowDown"&&oe<U.length-1){De(x,U[oe+1]);return}if(b==="ArrowUp"&&oe>0){De(x,U[oe-1]);return}if(b==="ArrowLeft"||b==="ArrowRight"){let ae=Array.from(e.querySelectorAll(".board-column")),we=ae.indexOf($),Re=b==="ArrowRight"?1:-1,Je=we+Re;for(;Je>=0&&Je<ae.length;){let ct=ae[Je].querySelector(".board-card");if(ct){De(x,ct);return}Je+=Re}}});function De(E,Y){try{E.tabIndex=-1,Y.tabIndex=0,Y.focus()}catch{}}let D=null;h&&h.subscribe&&(D=h.subscribe(()=>{try{K()}catch{}}));let X=null;i&&i.subscribe&&(X=i.subscribe(()=>{try{K()}catch{}}));let de=null;return c&&c.subscribe&&(de=c.subscribe(()=>{tt()})),{async load(){n("load"),K()},clear(){Oe(),Pe(),D&&(D(),D=null),X&&(X(),X=null),de&&(de(),de=null),e.replaceChildren(),M=[],W=[],Z=[],le=[],V=[],B=[],L=new Map,ne=new Map}}}function ss(e,t){return e.filter(n=>{let r=lo(n);return!(r&&t.has(r))})}async function K_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function fn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function _r(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function os(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function V_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${_r(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${_r(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(c=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),c(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function qn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await V_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var Y_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Yc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Z_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Wt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Pt(e){return typeof e=="string"&&e.length>0?e:null}function Pr(e){return e.startsWith("gpt-")?e.slice(4):e}function Ct(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Xc(e,t,n){let r=Pt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Pt(n[e]);return s===null?null:{value:s,source:"global"}}function as(e,t,n,r){return Xc(e,t,n)||{value:r,source:"base"}}function Ya(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Wt(s?.[t])){let a=Pt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Wt(s)){for(let a of Object.values(s))if(Wt(a)){let i=Pt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Pt(r?.runners?.[o]?.models?.[e]?.id)||e}function X_(e,t){return Pt(t?.review?.reviewers?.[e]?.model)||e}function Dr(e,t,n=!1){if(e==="default")return Ct(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Pr(e):e;return Ct(e,t,r,e,"explicit")}function Qc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Wt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(Wt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function Q_(e,t){let n=[],r=e?.implementation?.model_catalog;Wt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Wt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function J_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of Q_(t,n)){let o=Qc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Za(e){return Ct(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Zc(e,t,n){let r=Xc(e,t,n);return r?Dr(r.value,r.source):Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function ln(e){let t=Wt(e.pin)?e.pin:{},n=Wt(e.global)?e.global:{},r=Wt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Wt(r.session)?r.session:null,o=r?.supported===!0&&Wt(r.orchestration)?r.orchestration:null,a=Wt(e.runner_catalog)?e.runner_catalog:null,i=Pt(n.quick_fix_impl_model),c=J_(i,s,a),u={};if(s){let d=as("workflow_mode",t,n,Pt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Ct(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Dr(d.value,d.source);for(let V of["spec_review","plan_review","impl_review"]){let B=`${V}_model`,j=Pt(V==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),G=as(B,t,n,j);if(G.value===null)u[B]=Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(G.value!=="self"&&G.value!=="skip"&&!Wt(s.review?.reviewers?.[G.value]))u[B]=Za(Ct(G.value,G.source,"",null,"explicit"));else{let P=X_(G.value,s);u[B]=Ct(G.value,G.source,Pr(P),P,G.source==="base"?"default":"explicit")}}for(let[V,B]of Object.entries(Yc)){let j=u[B].value;if(j==="self"||j==="skip"){u[V]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let G=Pt(s.review?.reviewers?.[j||""]?.effort),P=as(V,t,n,G);u[V]=P.value===null?Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ct(P.value,P.source,P.value,P.value,P.source==="base"?"default":"explicit")}let g=Wt(s.implementation?.default)?s.implementation.default:{},y=Pt(e.route),h=y!==null&&["quick_fix","spec_backed","full_plan"].includes(y),A=Wt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},M=h&&Wt(A[y])?A[y]:{};for(let V of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let B=as(V,t,n,V==="impl_dispatch"?Pt(M.dispatch)||Pt(g.dispatch):Pt(g[V.replace("impl_","")]));u[V]=B.value===null?Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ct(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}let W=Pt(t.impl_runtime),Z=W==="inherit"?Pt(e.controller_runtime):W,le=y==="quick_fix"&&Pt(t.impl_dispatch)===null&&c.runtime!==null&&(W===null||Z===c.runtime);if(le){let V=c.runtime,B=i;u.impl_dispatch=Ct("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),W===null&&(u.impl_runtime=Ct(V,"global",`${V} (\uC720\uB3C4)`,V,"explicit")),Pt(t.impl_model)===null&&(u.impl_model=Ct(B,"global",B,B,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let V of["impl_runtime","impl_model","impl_effort","impl_speed"])u[V]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!le&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let V=u.impl_runtime.value==="inherit"?Pt(e.controller_runtime):u.impl_runtime.value,B=V?Qc(V,s,a):[];if(u.impl_model.value!=="auto"&&B.length>0&&!B.includes(u.impl_model.value))u.impl_model=Za(u.impl_model);else{let j=Ya(u.impl_model.value,V,s,a);u.impl_model.display=Pr(j),u.impl_model.full_value=j}}if(u.impl_effort.value==="auto"){let V=Pt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),B=V?Pt(s.implementation?.effort_by_transport?.[V]?.auto):null;B&&!Z_.has(B)?(u.impl_effort.display=`${B} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=B,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Ct("default","base","default (\uC77C\uBC18)","default","default"):Dr("default",u.impl_speed.source))}}else for(let d of Y_.filter(g=>!g.startsWith("orchestration_")))u[d]=Zc(d,t,n);if(!s){for(let[d,g]of Object.entries(Yc))(u[g].value==="self"||u[g].value==="skip")&&(u[d]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=Zc(d,t,n);continue}let g=d.replace("orchestration_",""),y=Pt(o[g]),h=as(d,t,n,y);if(d==="orchestration_effort"&&h.source==="base"){u[d]=Ct(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(h.value===null){u[d]=Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let A=h.source==="base"?Pt(o.model_id)||h.value:Ya(h.value,null,s,a);u[d]=Ct(h.value,h.source,Pr(A),A,h.source==="base"?"default":"explicit");continue}if(h.value==="default"){u[d]=h.source==="base"?Ct("default","base","default (\uC77C\uBC18)","default","default"):Dr("default",h.source);continue}u[d]=Dr(h.value,h.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Ct(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Pr(d)})`,null,"default")}else if(c.runtime!==null){let d=Ya(i,c.runtime,s,a);u.quick_fix_impl_model=Ct(i,"global",Pr(d),d,"explicit")}else c.offered?u.quick_fix_impl_model=Za(Ct(i,"global","",null,"explicit")):u.quick_fix_impl_model=Dr(i,"global");return u}function em(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function vo(e){let t=Wt(e.pin)?e.pin:{},n=Wt(e.global)?e.global:{},r=Wt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=g=>{let y={...r,...g};return ln({pin:e.layer==="pin"?y:t,global:e.layer==="pin"?n:y,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],u=Pt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:em(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:d.map(g=>{let y=s({...o,[e.key]:g})[e.key];return{value:g,label:y.display,full_value:y.full_value}})}}function Mr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let c=!1,u=g=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(g))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",g=>{g.key==="Enter"&&(g.ctrlKey||g.metaKey)&&(g.preventDefault(),d())}),t.addEventListener("cancel",g=>{g.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function Xa(e){return`session:${e.provider}:${e.session_id}`}function is(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function tm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function wo(e,t,n,r){return{attempt_id:Xa(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:is(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:tm(e,n)}}}var Qa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",nm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Jc="\uBD84\uD574 \uC5C6\uB294 leg";function Bt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var In=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Nr=[...In,"reasoning_output_tokens"],rm={codex:["implementation","review-consult"],claude:["subagent"]};function Ja(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!In.some(t=>Number.isFinite(e[t]))}function sm(e){return!e||typeof e!="object"?!1:Nr.some(t=>Number.isFinite(e[t]))}function ei(e){let t=0;for(let n of In)t+=Bt(e?.[n]);return t}function om(e){return!e||typeof e!="object"?!1:In.some(t=>Number.isFinite(e[t]))}function eu(e){return!e||typeof e!="object"?!1:Nr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function am(e){let t={};for(let n of Nr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function tu(e){let t={};for(let n of Nr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function nu(e,t){return Ja(t)?Bt(t.total_tokens):e==="codex"?Bt(t.input_tokens)+Bt(t.output_tokens):ei(t)}function im(e){return e==="claude"?"Claude":"Codex"}function lm(e){return`\u03C4 ${su(e)}`}function cm(e,t){let n=t.breakdown||{},r=Bt(t.total_only_subtotal);if(Ja(n)||r>0&&!sm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,nm];return t.replayed&&u.push(Qa),u.join(`
`)}let s=[`\uC785\uB825 ${Bt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Bt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Bt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${Jc} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",a=r>0?`${o} + ${Jc}`:o,c=[e==="claude"?`Claude subtotal = ${a}`:`Codex subtotal = ${a}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&c.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&c.push(Qa),c.join(`
`)}function Vt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${im(n)} ${lm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:cm(n,r)})}return t}function $o(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal,Number.isFinite(a.total_only_subtotal)&&(i.total_only_subtotal=Bt(i.total_only_subtotal)+Bt(a.total_only_subtotal));for(let c of Nr)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=Bt(i.breakdown[c])+Bt(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ti(e){return!e||typeof e!="object"?null:hn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function um(e){return e==="codex"?"codex":"claude"}function Ln(){return{subtotal:0,breakdown:am(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function ko(e,t,n){e.subtotal+=t.subtotal,Ja(t.usage)&&(e.total_only+=t.subtotal);for(let r of Nr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Bt(e.breakdown[r])+Bt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ru(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function su(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function qr(e){return om(e)?`\u03C4 ${su(ei(e))}`:null}function Fn(e){let t=qr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ls(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Bt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Bt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${ei(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Qa),n.join(`
`)}function hn(e,t){let n={claude:Ln(),codex:Ln()},r={orchestrator:{claude:Ln(),codex:Ln()},implementation:{claude:Ln(),codex:Ln()},"review-consult":{claude:Ln(),codex:Ln()},subagent:{claude:Ln(),codex:Ln()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(eu(c)){let d=um(i.runner),g=tu(c),y={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:g,subtotal:nu(d,g)};g.replayed===!0&&(y.replayed=!0),typeof i.model=="string"&&(y.model=i.model),typeof i.session_id=="string"&&(y.session_id=i.session_id),ko(n[d],y,!0),ko(r.orchestrator[d],y,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let g=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!rm[g].includes(d.role)||!eu(d.usage))continue;let y=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!y||s.has(y))continue;s.add(y);let h=tu(d.usage),A={provider:g,role:d.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:nu(g,h)};A.receipt_id=y,typeof d.agent_type=="string"&&(A.agent_type=d.agent_type),typeof d.agent_id=="string"&&(A.agent_id=d.agent_id),typeof d.model=="string"&&(A.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(A.effort=d.effort),typeof d.session_id=="string"?A.session_id=d.session_id:typeof d.thread_id=="string"&&(A.session_id=d.thread_id),typeof d.turn_id=="string"&&(A.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(A.completed_at=d.completed_at),h.replayed===!0&&(A.replayed=!0),ko(n[g],A,!1),ko(r[A.role][g],A,!1)}}let o={};for(let i of["claude","codex"]){let c=n[i];if(c.legs.length===0)continue;let u=ru(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let c={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(c[u]={...ru(d,!0),legs:d.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:fu,setPrototypeOf:ou,isFrozen:dm,getPrototypeOf:pm,getOwnPropertyDescriptor:fm}=Object,{freeze:Qt,seal:yn,create:li}=Object,{apply:ci,construct:ui}=typeof Reflect<"u"&&Reflect;Qt||(Qt=function(t){return t});yn||(yn=function(t){return t});ci||(ci=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});ui||(ui=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var xo=Jt(Array.prototype.forEach),_m=Jt(Array.prototype.lastIndexOf),au=Jt(Array.prototype.pop),cs=Jt(Array.prototype.push),mm=Jt(Array.prototype.splice),So=Jt(String.prototype.toLowerCase),ni=Jt(String.prototype.toString),ri=Jt(String.prototype.match),us=Jt(String.prototype.replace),gm=Jt(String.prototype.indexOf),bm=Jt(String.prototype.trim),$n=Jt(Object.prototype.hasOwnProperty),Xt=Jt(RegExp.prototype.test),ds=hm(TypeError);function Jt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return ci(e,t,r)}}function hm(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ui(e,n)}}function lt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:So;ou&&ou(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(dm(t)||(t[r]=o),s=o)}e[s]=!0}return e}function ym(e){for(let t=0;t<e.length;t++)$n(e,t)||(e[t]=null);return e}function jn(e){let t=li(null);for(let[n,r]of fu(e))$n(e,n)&&(Array.isArray(r)?t[n]=ym(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=jn(r):t[n]=r);return t}function ps(e,t){for(;e!==null;){let r=fm(e,t);if(r){if(r.get)return Jt(r.get);if(typeof r.value=="function")return Jt(r.value)}e=pm(e)}function n(){return null}return n}var iu=Qt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),si=Qt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),oi=Qt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),vm=Qt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ai=Qt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),wm=Qt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),lu=Qt(["#text"]),cu=Qt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ii=Qt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),uu=Qt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ao=Qt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),km=yn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),$m=yn(/<%[\w\W]*|[\w\W]*%>/gm),xm=yn(/\$\{[\w\W]*/gm),Am=yn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Sm=yn(/^aria-[\-\w]+$/),_u=yn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Em=yn(/^(?:\w+script|data):/i),Tm=yn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),mu=yn(/^html$/i),Cm=yn(/^[a-z][.\w]*(-[.\w]+)+$/i),du=Object.freeze({__proto__:null,ARIA_ATTR:Sm,ATTR_WHITESPACE:Tm,CUSTOM_ELEMENT:Cm,DATA_ATTR:Am,DOCTYPE_NAME:mu,ERB_EXPR:$m,IS_ALLOWED_URI:_u,IS_SCRIPT_OR_DATA:Em,MUSTACHE_EXPR:km,TMPLIT_EXPR:xm}),fs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Rm=function(){return typeof window>"u"?null:window},Om=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},pu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function gu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Rm(),t=Ie=>gu(Ie);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==fs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:y,trustedTypes:h}=e,A=c.prototype,M=ps(A,"cloneNode"),W=ps(A,"remove"),Z=ps(A,"nextSibling"),le=ps(A,"childNodes"),V=ps(A,"parentNode");if(typeof a=="function"){let Ie=n.createElement("template");Ie.content&&Ie.content.ownerDocument&&(n=Ie.content.ownerDocument)}let B,j="",{implementation:G,createNodeIterator:P,createDocumentFragment:L,getElementsByTagName:ne}=n,{importNode:Ee}=r,ke=pu();t.isSupported=typeof fu=="function"&&typeof V=="function"&&G&&G.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:z,ERB_EXPR:te,TMPLIT_EXPR:me,DATA_ATTR:xe,ARIA_ATTR:he,IS_SCRIPT_OR_DATA:ce,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:ye}=du,{IS_ALLOWED_URI:K}=du,se=null,ue=lt({},[...iu,...si,...oi,...ai,...lu]),$e=null,He=lt({},[...cu,...ii,...uu,...Ao]),ge=Object.seal(li(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),qe=null,N=null,be=Object.seal(li(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Le=!0,Ue=!0,ze=!1,We=!0,Ge=!1,et=!0,it=!1,ft=!1,$t=!1,_t=!1,Q=!1,ee=!1,Oe=!0,Ne=!1,Te="user-content-",Pe=!0,je=!1,ot={},nt=null,tt=lt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),yt=null,It=lt({},["audio","video","img","source","image","track"]),mt=null,Mt=lt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),vt="http://www.w3.org/1998/Math/MathML",Ve="http://www.w3.org/2000/svg",De="http://www.w3.org/1999/xhtml",D=De,X=!1,de=null,E=lt({},[vt,Ve,De],ni),Y=lt({},["mi","mo","mn","ms","mtext"]),fe=lt({},["annotation-xml"]),x=lt({},["title","style","font","a","script"]),b=null,$=["application/xhtml+xml","text/html"],U="text/html",oe=null,ae=null,we=n.createElement("form"),Re=function(R){return R instanceof RegExp||R instanceof Function},Je=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ae&&ae===R)){if((!R||typeof R!="object")&&(R={}),R=jn(R),b=$.indexOf(R.PARSER_MEDIA_TYPE)===-1?U:R.PARSER_MEDIA_TYPE,oe=b==="application/xhtml+xml"?ni:So,se=$n(R,"ALLOWED_TAGS")?lt({},R.ALLOWED_TAGS,oe):ue,$e=$n(R,"ALLOWED_ATTR")?lt({},R.ALLOWED_ATTR,oe):He,de=$n(R,"ALLOWED_NAMESPACES")?lt({},R.ALLOWED_NAMESPACES,ni):E,mt=$n(R,"ADD_URI_SAFE_ATTR")?lt(jn(Mt),R.ADD_URI_SAFE_ATTR,oe):Mt,yt=$n(R,"ADD_DATA_URI_TAGS")?lt(jn(It),R.ADD_DATA_URI_TAGS,oe):It,nt=$n(R,"FORBID_CONTENTS")?lt({},R.FORBID_CONTENTS,oe):tt,qe=$n(R,"FORBID_TAGS")?lt({},R.FORBID_TAGS,oe):jn({}),N=$n(R,"FORBID_ATTR")?lt({},R.FORBID_ATTR,oe):jn({}),ot=$n(R,"USE_PROFILES")?R.USE_PROFILES:!1,Le=R.ALLOW_ARIA_ATTR!==!1,Ue=R.ALLOW_DATA_ATTR!==!1,ze=R.ALLOW_UNKNOWN_PROTOCOLS||!1,We=R.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ge=R.SAFE_FOR_TEMPLATES||!1,et=R.SAFE_FOR_XML!==!1,it=R.WHOLE_DOCUMENT||!1,_t=R.RETURN_DOM||!1,Q=R.RETURN_DOM_FRAGMENT||!1,ee=R.RETURN_TRUSTED_TYPE||!1,$t=R.FORCE_BODY||!1,Oe=R.SANITIZE_DOM!==!1,Ne=R.SANITIZE_NAMED_PROPS||!1,Pe=R.KEEP_CONTENT!==!1,je=R.IN_PLACE||!1,K=R.ALLOWED_URI_REGEXP||_u,D=R.NAMESPACE||De,Y=R.MATHML_TEXT_INTEGRATION_POINTS||Y,fe=R.HTML_INTEGRATION_POINTS||fe,ge=R.CUSTOM_ELEMENT_HANDLING||{},R.CUSTOM_ELEMENT_HANDLING&&Re(R.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ge.tagNameCheck=R.CUSTOM_ELEMENT_HANDLING.tagNameCheck),R.CUSTOM_ELEMENT_HANDLING&&Re(R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ge.attributeNameCheck=R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),R.CUSTOM_ELEMENT_HANDLING&&typeof R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ge.allowCustomizedBuiltInElements=R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ge&&(Ue=!1),Q&&(_t=!0),ot&&(se=lt({},lu),$e=[],ot.html===!0&&(lt(se,iu),lt($e,cu)),ot.svg===!0&&(lt(se,si),lt($e,ii),lt($e,Ao)),ot.svgFilters===!0&&(lt(se,oi),lt($e,ii),lt($e,Ao)),ot.mathMl===!0&&(lt(se,ai),lt($e,uu),lt($e,Ao))),R.ADD_TAGS&&(typeof R.ADD_TAGS=="function"?be.tagCheck=R.ADD_TAGS:(se===ue&&(se=jn(se)),lt(se,R.ADD_TAGS,oe))),R.ADD_ATTR&&(typeof R.ADD_ATTR=="function"?be.attributeCheck=R.ADD_ATTR:($e===He&&($e=jn($e)),lt($e,R.ADD_ATTR,oe))),R.ADD_URI_SAFE_ATTR&&lt(mt,R.ADD_URI_SAFE_ATTR,oe),R.FORBID_CONTENTS&&(nt===tt&&(nt=jn(nt)),lt(nt,R.FORBID_CONTENTS,oe)),Pe&&(se["#text"]=!0),it&&lt(se,["html","head","body"]),se.table&&(lt(se,["tbody"]),delete qe.tbody),R.TRUSTED_TYPES_POLICY){if(typeof R.TRUSTED_TYPES_POLICY.createHTML!="function")throw ds('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof R.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ds('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');B=R.TRUSTED_TYPES_POLICY,j=B.createHTML("")}else B===void 0&&(B=Om(h,s)),B!==null&&typeof j=="string"&&(j=B.createHTML(""));Qt&&Qt(R),ae=R}},ct=lt({},[...si,...oi,...vm]),Ce=lt({},[...ai,...wm]),pt=function(R){let _e=V(R);(!_e||!_e.tagName)&&(_e={namespaceURI:D,tagName:"template"});let Se=So(R.tagName),ut=So(_e.tagName);return de[R.namespaceURI]?R.namespaceURI===Ve?_e.namespaceURI===De?Se==="svg":_e.namespaceURI===vt?Se==="svg"&&(ut==="annotation-xml"||Y[ut]):!!ct[Se]:R.namespaceURI===vt?_e.namespaceURI===De?Se==="math":_e.namespaceURI===Ve?Se==="math"&&fe[ut]:!!Ce[Se]:R.namespaceURI===De?_e.namespaceURI===Ve&&!fe[ut]||_e.namespaceURI===vt&&!Y[ut]?!1:!Ce[Se]&&(x[Se]||!ct[Se]):!!(b==="application/xhtml+xml"&&de[R.namespaceURI]):!1},Nt=function(R){cs(t.removed,{element:R});try{V(R).removeChild(R)}catch{W(R)}},St=function(R,_e){try{cs(t.removed,{attribute:_e.getAttributeNode(R),from:_e})}catch{cs(t.removed,{attribute:null,from:_e})}if(_e.removeAttribute(R),R==="is")if(_t||Q)try{Nt(_e)}catch{}else try{_e.setAttribute(R,"")}catch{}},un=function(R){let _e=null,Se=null;if($t)R="<remove></remove>"+R;else{let ht=ri(R,/^[\r\n\t ]+/);Se=ht&&ht[0]}b==="application/xhtml+xml"&&D===De&&(R='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+R+"</body></html>");let ut=B?B.createHTML(R):R;if(D===De)try{_e=new y().parseFromString(ut,b)}catch{}if(!_e||!_e.documentElement){_e=G.createDocument(D,"template",null);try{_e.documentElement.innerHTML=X?j:ut}catch{}}let xt=_e.body||_e.documentElement;return R&&Se&&xt.insertBefore(n.createTextNode(Se),xt.childNodes[0]||null),D===De?ne.call(_e,it?"html":"body")[0]:it?_e.documentElement:xt},Ht=function(R){return P.call(R.ownerDocument||R,R,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Ut=function(R){return R instanceof g&&(typeof R.nodeName!="string"||typeof R.textContent!="string"||typeof R.removeChild!="function"||!(R.attributes instanceof d)||typeof R.removeAttribute!="function"||typeof R.setAttribute!="function"||typeof R.namespaceURI!="string"||typeof R.insertBefore!="function"||typeof R.hasChildNodes!="function")},Zt=function(R){return typeof i=="function"&&R instanceof i};function zt(Ie,R,_e){xo(Ie,Se=>{Se.call(t,R,_e,ae)})}let gt=function(R){let _e=null;if(zt(ke.beforeSanitizeElements,R,null),Ut(R))return Nt(R),!0;let Se=oe(R.nodeName);if(zt(ke.uponSanitizeElement,R,{tagName:Se,allowedTags:se}),et&&R.hasChildNodes()&&!Zt(R.firstElementChild)&&Xt(/<[/\w!]/g,R.innerHTML)&&Xt(/<[/\w!]/g,R.textContent)||R.nodeType===fs.progressingInstruction||et&&R.nodeType===fs.comment&&Xt(/<[/\w]/g,R.data))return Nt(R),!0;if(!(be.tagCheck instanceof Function&&be.tagCheck(Se))&&(!se[Se]||qe[Se])){if(!qe[Se]&&dn(Se)&&(ge.tagNameCheck instanceof RegExp&&Xt(ge.tagNameCheck,Se)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Se)))return!1;if(Pe&&!nt[Se]){let ut=V(R)||R.parentNode,xt=le(R)||R.childNodes;if(xt&&ut){let ht=xt.length;for(let Dt=ht-1;Dt>=0;--Dt){let jt=M(xt[Dt],!0);jt.__removalCount=(R.__removalCount||0)+1,ut.insertBefore(jt,Z(R))}}}return Nt(R),!0}return R instanceof c&&!pt(R)||(Se==="noscript"||Se==="noembed"||Se==="noframes")&&Xt(/<\/no(script|embed|frames)/i,R.innerHTML)?(Nt(R),!0):(Ge&&R.nodeType===fs.text&&(_e=R.textContent,xo([z,te,me],ut=>{_e=us(_e,ut," ")}),R.textContent!==_e&&(cs(t.removed,{element:R.cloneNode()}),R.textContent=_e)),zt(ke.afterSanitizeElements,R,null),!1)},Ke=function(R,_e,Se){if(Oe&&(_e==="id"||_e==="name")&&(Se in n||Se in we))return!1;if(!(Ue&&!N[_e]&&Xt(xe,_e))){if(!(Le&&Xt(he,_e))){if(!(be.attributeCheck instanceof Function&&be.attributeCheck(_e,R))){if(!$e[_e]||N[_e]){if(!(dn(R)&&(ge.tagNameCheck instanceof RegExp&&Xt(ge.tagNameCheck,R)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(R))&&(ge.attributeNameCheck instanceof RegExp&&Xt(ge.attributeNameCheck,_e)||ge.attributeNameCheck instanceof Function&&ge.attributeNameCheck(_e,R))||_e==="is"&&ge.allowCustomizedBuiltInElements&&(ge.tagNameCheck instanceof RegExp&&Xt(ge.tagNameCheck,Se)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Se))))return!1}else if(!mt[_e]){if(!Xt(K,us(Se,Ae,""))){if(!((_e==="src"||_e==="xlink:href"||_e==="href")&&R!=="script"&&gm(Se,"data:")===0&&yt[R])){if(!(ze&&!Xt(ce,us(Se,Ae,"")))){if(Se)return!1}}}}}}}return!0},dn=function(R){return R!=="annotation-xml"&&ri(R,ye)},tn=function(R){zt(ke.beforeSanitizeAttributes,R,null);let{attributes:_e}=R;if(!_e||Ut(R))return;let Se={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:$e,forceKeepAttr:void 0},ut=_e.length;for(;ut--;){let xt=_e[ut],{name:ht,namespaceURI:Dt,value:jt}=xt,Gt=oe(ht),nn=jt,Et=ht==="value"?nn:bm(nn);if(Se.attrName=Gt,Se.attrValue=Et,Se.keepAttr=!0,Se.forceKeepAttr=void 0,zt(ke.uponSanitizeAttribute,R,Se),Et=Se.attrValue,Ne&&(Gt==="id"||Gt==="name")&&(St(ht,R),Et=Te+Et),et&&Xt(/((--!?|])>)|<\/(style|title|textarea)/i,Et)){St(ht,R);continue}if(Gt==="attributename"&&ri(Et,"href")){St(ht,R);continue}if(Se.forceKeepAttr)continue;if(!Se.keepAttr){St(ht,R);continue}if(!We&&Xt(/\/>/i,Et)){St(ht,R);continue}Ge&&xo([z,te,me],gn=>{Et=us(Et,gn," ")});let rn=oe(R.nodeName);if(!Ke(rn,Gt,Et)){St(ht,R);continue}if(B&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!Dt)switch(h.getAttributeType(rn,Gt)){case"TrustedHTML":{Et=B.createHTML(Et);break}case"TrustedScriptURL":{Et=B.createScriptURL(Et);break}}if(Et!==nn)try{Dt?R.setAttributeNS(Dt,ht,Et):R.setAttribute(ht,Et),Ut(R)?Nt(R):au(t.removed)}catch{St(ht,R)}}zt(ke.afterSanitizeAttributes,R,null)},st=function Ie(R){let _e=null,Se=Ht(R);for(zt(ke.beforeSanitizeShadowDOM,R,null);_e=Se.nextNode();)zt(ke.uponSanitizeShadowNode,_e,null),gt(_e),tn(_e),_e.content instanceof o&&Ie(_e.content);zt(ke.afterSanitizeShadowDOM,R,null)};return t.sanitize=function(Ie){let R=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},_e=null,Se=null,ut=null,xt=null;if(X=!Ie,X&&(Ie="<!-->"),typeof Ie!="string"&&!Zt(Ie))if(typeof Ie.toString=="function"){if(Ie=Ie.toString(),typeof Ie!="string")throw ds("dirty is not a string, aborting")}else throw ds("toString is not a function");if(!t.isSupported)return Ie;if(ft||Je(R),t.removed=[],typeof Ie=="string"&&(je=!1),je){if(Ie.nodeName){let jt=oe(Ie.nodeName);if(!se[jt]||qe[jt])throw ds("root node is forbidden and cannot be sanitized in-place")}}else if(Ie instanceof i)_e=un("<!---->"),Se=_e.ownerDocument.importNode(Ie,!0),Se.nodeType===fs.element&&Se.nodeName==="BODY"||Se.nodeName==="HTML"?_e=Se:_e.appendChild(Se);else{if(!_t&&!Ge&&!it&&Ie.indexOf("<")===-1)return B&&ee?B.createHTML(Ie):Ie;if(_e=un(Ie),!_e)return _t?null:ee?j:""}_e&&$t&&Nt(_e.firstChild);let ht=Ht(je?Ie:_e);for(;ut=ht.nextNode();)gt(ut),tn(ut),ut.content instanceof o&&st(ut.content);if(je)return Ie;if(_t){if(Q)for(xt=L.call(_e.ownerDocument);_e.firstChild;)xt.appendChild(_e.firstChild);else xt=_e;return($e.shadowroot||$e.shadowrootmode)&&(xt=Ee.call(r,xt,!0)),xt}let Dt=it?_e.outerHTML:_e.innerHTML;return it&&se["!doctype"]&&_e.ownerDocument&&_e.ownerDocument.doctype&&_e.ownerDocument.doctype.name&&Xt(mu,_e.ownerDocument.doctype.name)&&(Dt="<!DOCTYPE "+_e.ownerDocument.doctype.name+`>
`+Dt),Ge&&xo([z,te,me],jt=>{Dt=us(Dt,jt," ")}),B&&ee?B.createHTML(Dt):Dt},t.setConfig=function(){let Ie=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Je(Ie),ft=!0},t.clearConfig=function(){ae=null,ft=!1},t.isValidAttribute=function(Ie,R,_e){ae||Je({});let Se=oe(Ie),ut=oe(R);return Ke(Se,ut,_e)},t.addHook=function(Ie,R){typeof R=="function"&&cs(ke[Ie],R)},t.removeHook=function(Ie,R){if(R!==void 0){let _e=_m(ke[Ie],R);return _e===-1?void 0:mm(ke[Ie],_e,1)[0]}return au(ke[Ie])},t.removeHooks=function(Ie){ke[Ie]=[]},t.removeAllHooks=function(){ke=pu()},t}var bu=gu();var Bn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Eo=e=>(...t)=>({_$litDirective$:e,values:t}),Fr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var _s=class extends Fr{constructor(t){if(super(t),this.it=Ft,t.type!==Bn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ft||t==null)return this._t=void 0,this.it=t;if(t===bn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};_s.directiveName="unsafeHTML",_s.resultType=1;var hu=Eo(_s);function _i(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var gr=_i();function Au(e){gr=e}var hs={exec:()=>null};function bt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(en.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var Lm=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),en={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Im=/^(?:[ \t]*(?:\n|$))+/,Pm=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Dm=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ys=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Mm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,mi=/(?:[*+-]|\d{1,9}[.)])/,Su=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Eu=bt(Su).replace(/bull/g,mi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Nm=bt(Su).replace(/bull/g,mi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),gi=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,qm=/^[^\n]+/,bi=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Fm=bt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",bi).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),jm=bt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,mi).getRegex(),Io="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",hi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Bm=bt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",hi).replace("tag",Io).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Tu=bt(gi).replace("hr",ys).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Io).getRegex(),Um=bt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Tu).getRegex(),yi={blockquote:Um,code:Pm,def:Fm,fences:Dm,heading:Mm,hr:ys,html:Bm,lheading:Eu,list:jm,newline:Im,paragraph:Tu,table:hs,text:qm},yu=bt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ys).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Io).getRegex(),Wm={...yi,lheading:Nm,table:yu,paragraph:bt(gi).replace("hr",ys).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",yu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Io).getRegex()},zm={...yi,html:bt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",hi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:hs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:bt(gi).replace("hr",ys).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Eu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Hm=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Gm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Cu=/^( {2,}|\\)\n(?!\s*$)/,Km=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Po=/[\p{P}\p{S}]/u,vi=/[\s\p{P}\p{S}]/u,Ru=/[^\s\p{P}\p{S}]/u,Vm=bt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,vi).getRegex(),Ou=/(?!~)[\p{P}\p{S}]/u,Ym=/(?!~)[\s\p{P}\p{S}]/u,Zm=/(?:[^\s\p{P}\p{S}]|~)/u,Xm=bt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Lm?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Lu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Qm=bt(Lu,"u").replace(/punct/g,Po).getRegex(),Jm=bt(Lu,"u").replace(/punct/g,Ou).getRegex(),Iu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",eg=bt(Iu,"gu").replace(/notPunctSpace/g,Ru).replace(/punctSpace/g,vi).replace(/punct/g,Po).getRegex(),tg=bt(Iu,"gu").replace(/notPunctSpace/g,Zm).replace(/punctSpace/g,Ym).replace(/punct/g,Ou).getRegex(),ng=bt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ru).replace(/punctSpace/g,vi).replace(/punct/g,Po).getRegex(),rg=bt(/\\(punct)/,"gu").replace(/punct/g,Po).getRegex(),sg=bt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),og=bt(hi).replace("(?:-->|$)","-->").getRegex(),ag=bt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",og).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ro=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ig=bt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ro).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Pu=bt(/^!?\[(label)\]\[(ref)\]/).replace("label",Ro).replace("ref",bi).getRegex(),Du=bt(/^!?\[(ref)\](?:\[\])?/).replace("ref",bi).getRegex(),lg=bt("reflink|nolink(?!\\()","g").replace("reflink",Pu).replace("nolink",Du).getRegex(),vu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,wi={_backpedal:hs,anyPunctuation:rg,autolink:sg,blockSkip:Xm,br:Cu,code:Gm,del:hs,emStrongLDelim:Qm,emStrongRDelimAst:eg,emStrongRDelimUnd:ng,escape:Hm,link:ig,nolink:Du,punctuation:Vm,reflink:Pu,reflinkSearch:lg,tag:ag,text:Km,url:hs},cg={...wi,link:bt(/^!?\[(label)\]\((.*?)\)/).replace("label",Ro).getRegex(),reflink:bt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ro).getRegex()},di={...wi,emStrongRDelimAst:tg,emStrongLDelim:Jm,url:bt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",vu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:bt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",vu).getRegex()},ug={...di,br:bt(Cu).replace("{2,}","*").getRegex(),text:bt(di.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},To={normal:yi,gfm:Wm,pedantic:zm},ms={normal:wi,gfm:di,breaks:ug,pedantic:cg},dg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},wu=e=>dg[e];function Un(e,t){if(t){if(en.escapeTest.test(e))return e.replace(en.escapeReplace,wu)}else if(en.escapeTestNoEncode.test(e))return e.replace(en.escapeReplaceNoEncode,wu);return e}function ku(e){try{e=encodeURI(e).replace(en.percentDecode,"%")}catch{return null}return e}function $u(e,t){let n=e.replace(en.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),r=n.split(en.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(en.slashPipe,"|");return r}function gs(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function pg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function xu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,c}function fg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Oo=class{constructor(e){At(this,"options");At(this,"rules");At(this,"lexer");this.options=e||gr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:gs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=fg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=gs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:gs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=gs(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))i.push(n[c]),a=!0;else if(!a)i.push(n[c]);else break;n=n.slice(c);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=g,n.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let h=y,A=h.raw+`
`+n.join(`
`),M=this.blockquote(A);o[o.length-1]=M,r=r.substring(0,r.length-h.raw.length)+M.raw,s=s.substring(0,s.length-h.text.length)+M.text;break}else if(y?.type==="list"){let h=y,A=h.raw+`
`+n.join(`
`),M=this.list(A);o[o.length-1]=M,r=r.substring(0,r.length-y.raw.length)+M.raw,s=s.substring(0,s.length-h.raw.length)+M.raw,n=A.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,M=>" ".repeat(3*M.length)),y=e.split(`
`,1)[0],h=!g.trim(),A=0;if(this.options.pedantic?(A=2,d=g.trimStart()):h?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,d=g.slice(A),A+=t[1].length),h&&this.rules.other.blankLine.test(y)&&(u+=y+`
`,e=e.substring(y.length+1),c=!0),!c){let M=this.rules.other.nextBulletRegex(A),W=this.rules.other.hrRegex(A),Z=this.rules.other.fencesBeginRegex(A),le=this.rules.other.headingBeginRegex(A),V=this.rules.other.htmlBeginRegex(A);for(;e;){let B=e.split(`
`,1)[0],j;if(y=B,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),j=y):j=y.replace(this.rules.other.tabCharGlobal,"    "),Z.test(y)||le.test(y)||V.test(y)||M.test(y)||W.test(y))break;if(j.search(this.rules.other.nonSpaceChar)>=A||!y.trim())d+=`
`+j.slice(A);else{if(h||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Z.test(g)||le.test(g)||W.test(g))break;d+=`
`+y}!h&&!y.trim()&&(h=!0),u+=B+`
`,e=e.substring(B.length+1),g=j.slice(A)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=d.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=d.raw+c.tokens[0].raw,c.tokens[0].text=d.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(d)):c.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):c.tokens.unshift(d)}}if(!s.loose){let u=c.tokens.filter(g=>g.type==="space"),d=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=d}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=$u(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push($u(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=gs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=pg(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),xu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return xu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,c=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let d=[...r[0]][0].length,g=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let h=g.slice(1,-1);return{type:"em",raw:g,text:h,tokens:this.lexer.inlineTokens(h)}}let y=g.slice(2,-2);return{type:"strong",raw:g,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},xn=class pi{constructor(t){At(this,"tokens");At(this,"options");At(this,"state");At(this,"inlineQueue");At(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||gr,this.options.tokenizer=this.options.tokenizer||new Oo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:en,block:To.normal,inline:ms.normal};this.options.pedantic?(n.block=To.pedantic,n.inline=ms.pedantic):this.options.gfm&&(n.block=To.gfm,this.options.breaks?n.inline=ms.breaks:n.inline=ms.gfm),this.tokenizer.rules=n}static get rules(){return{block:To,inline:ms}}static lex(t,n){return new pi(n).lex(t)}static lexInline(t,n){return new pi(n).inlineTokens(t)}lex(t){t=t.replace(en.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(d=>(c=d.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let d=n.at(-1);c.type==="text"&&d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,i)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,g=t.slice(1),y;this.options.extensions.startInline.forEach(h=>{y=h.call({lexer:this},g),typeof y=="number"&&y>=0&&(d=Math.min(d,y))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):n.push(c);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Lo=class{constructor(e){At(this,"options");At(this,"parser");this.options=e||gr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(en.notSpaceStart)?.[0],s=e.replace(en.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Un(r)+'">'+(n?s:Un(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Un(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Un(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=ku(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Un(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=ku(e);if(s===null)return Un(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Un(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Un(e.text)}},ki=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},An=class fi{constructor(t){At(this,"options");At(this,"renderer");At(this,"textRenderer");this.options=t||gr,this.options.renderer=this.options.renderer||new Lo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ki}static parse(t,n){return new fi(n).parse(t)}static parseInline(t,n){return new fi(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},Co,bs=(Co=class{constructor(e){At(this,"options");At(this,"block");this.options=e||gr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?xn.lex:xn.lexInline}provideParser(){return this.block?An.parse:An.parseInline}},At(Co,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),At(Co,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Co),_g=class{constructor(...e){At(this,"defaults",_i());At(this,"options",this.setOptions);At(this,"parse",this.parseMarkdown(!0));At(this,"parseInline",this.parseMarkdown(!1));At(this,"Parser",An);At(this,"Renderer",Lo);At(this,"TextRenderer",ki);At(this,"Lexer",xn);At(this,"Tokenizer",Oo);At(this,"Hooks",bs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Lo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Oo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new bs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],c=s[a];bs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&bs.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await i.call(s,u);return c.call(s,g)})();let d=i.call(s,u);return c.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let g=await i.apply(s,u);return g===!1&&(g=await c.apply(s,u)),g})();let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return xn.lex(e,t??this.defaults)}parser(e,t){return An.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?xn.lex:xn.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?An.parse:An.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?xn.lex:xn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?An.parse:An.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Un(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},mr=new _g;function wt(e,t){return mr.parse(e,t)}wt.options=wt.setOptions=function(e){return mr.setOptions(e),wt.defaults=mr.defaults,Au(wt.defaults),wt};wt.getDefaults=_i;wt.defaults=gr;wt.use=function(...e){return mr.use(...e),wt.defaults=mr.defaults,Au(wt.defaults),wt};wt.walkTokens=function(e,t){return mr.walkTokens(e,t)};wt.parseInline=mr.parseInline;wt.Parser=An;wt.parser=An.parse;wt.Renderer=Lo;wt.TextRenderer=ki;wt.Lexer=xn;wt.lexer=xn.lex;wt.Tokenizer=Oo;wt.Hooks=bs;wt.parse=wt;var Gw=wt.options,Kw=wt.setOptions,Vw=wt.use,Yw=wt.walkTokens,Zw=wt.parseInline;var Xw=An.parse,Qw=xn.lex;function Xn(e){let t=wt.parse(e),n=bu.sanitize(t);return hu(n)}function Wn(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function jr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Do(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Nu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},mg={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},gg=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,bg=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Sn(e){return!!e&&typeof e=="object"}function $i(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function xi(e,t){let n=$i(e),r=$i(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function qu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Sn(s)&&typeof s.text=="string"?s.text:"").join(""):Sn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function hg(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Nu[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=$i(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=xi(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let c=xi(Sn(i)?i.old_string:"",Sn(i)?i.new_string:"");s+=c.added,o+=c.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Ai(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var yg=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Fu(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Sn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(yg,"").trim();return n.length>0?{kind:"user",text:n}:null}function Si(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=gg.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:bg.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function vg(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function wg(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Sn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(Si(a.text));else if(a.type==="thinking"){let i=Ai(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=hg(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?Mu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let a of s)if(Sn(a)&&a.type==="tool_result"){let i=t.get(String(a.tool_use_id));if(i){let c=qu(a.content);i.result=c,i.output=typeof a.content=="string"?a.content:c,a.is_error===!0&&(i.is_error=!0)}}let o=Fu(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Mu([s],n):[s]}return[]}function Mu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function kg(e){let t=typeof e.command=="string"?e.command:"",n=qu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Nu.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function $g(e){if(e.type==="item.completed"&&Sn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Si(t.text)];if(t.type==="user_message"){let n=Fu(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Ai(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[kg(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function xg(e){if(e.schema!=="codex-delegation-monitor-v1"||!Sn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Sn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Si(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Ai(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=mg[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Ag(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Sg(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Sn(t)?t:null}function ju(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Sg(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return vg(o,r);let a=o.schema==="codex-delegation-monitor-v1"?xg(o):Ag(o)?$g(o):wg(o,n);return a.length>0&&(r.progress=null),a}}}function Ei(e){let t=[],n=ju(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Eg=5,Tg=10,Cg=/Task\s+#(\d+)/,Rg=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Og=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function vs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Lg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Ig(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Pg(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Cg.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Dg(e){if(e.tool==="Bash"){let t=e.command||"";return Rg.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Og.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Mg(e){let t=e.filter(s=>s.kind==="tool").slice(-Tg),n=new Map;t.forEach((s,o)=>{let a=Dg(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Ng(e){let t=Ig(e);if(t)return{text:t,guess:!1};let n=Pg(e);if(n)return{text:n,guess:!1};let r=Mg(e);return r?{text:r,guess:!0}:null}function qg(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:an(e,t)}function Br(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,c=null,u=null,d=!1,g={},y=!0,h=new Set,A=new Set,M=null,W=null,Z=!1,le=!1,V=!1,B=null,j=null;function G(){Z=!1,le=!1,V=!1,B=null,j=null}async function P(Q){if(n){le=!0,V=!1,qe();try{let ee=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Q,...u?{root_dir:u}:{}}));if(o!==Q)return;!ee||typeof ee!="object"||Array.isArray(ee)?V=!0:(B=ee,j=Q)}catch{o===Q&&(V=!0)}finally{o===Q&&(le=!1,qe())}}}function L(){if(Z=!Z,Z&&o&&j!==o){P(o);return}qe()}function ne(){if(!Z)return"";let Q=jr({loading:le,error:V});if(Q)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Q}
      </div>`;if(!B)return"";if(B.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let ee=Do(B.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${ee?l`<div class="prompt-block__meta">${ee} 발송</div>`:""}
      ${typeof B.task_prompt=="string"?Wn("\uACFC\uC5C5 (user)",B.task_prompt):""}
      ${typeof B.system_prompt=="string"?Wn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",B.system_prompt):""}
    </div>`}function Ee(){if(!c||!r)return[];let Q=r.get(c);return Ei(Q?Q.lines:[])}function ke(){if(!c||!r)return null;let Q=r.get(c),ee=Q?Q.last_event_at:null;return typeof ee=="number"?ee:null}function z(){return g.status==="running"}function te(){if(z()&&o){W||(W=setInterval(()=>qe(),1e3));return}me()}function me(){W&&(clearInterval(W),W=null)}function xe(Q){let ee=[],Oe=0;for(;Oe<Q.length;){let{idx:Ne,line:Te}=Q[Oe];if(Te.kind==="tool"){let Pe=Oe;for(;Pe<Q.length&&Q[Pe].line.kind==="tool"&&Q[Pe].line.tool===Te.tool;)Pe+=1;if(Pe-Oe>=Eg&&!A.has(Ne)){ee.push({kind:"group",idx:Ne,tool:Te.tool||"",lines:Q.slice(Oe,Pe)}),Oe=Pe;continue}}ee.push({kind:"line",idx:Ne,line:Te}),Oe+=1}return ee}function he(Q){let ee=[],Oe=new Map;for(let Pe=0;Pe<Q.length;Pe+=1){let je=Q[Pe],ot=je.parent_tool_use_id;if(typeof ot=="string"&&ot.length>0){let nt=Oe.get(ot);nt||(nt={kind:"subagent",idx:Pe,launch_id:ot,agent_type:null,header:null,lines:[]},Oe.set(ot,nt),ee.push(nt)),nt.lines.push({idx:Pe,line:je});continue}if(je.kind==="tool"&&je.tool==="Agent"&&typeof je.launch_id=="string"&&je.launch_id.length>0){let nt=ce(je),tt=Oe.get(je.launch_id);if(tt){tt.header={idx:Pe,line:je},tt.agent_type=nt;continue}let yt={kind:"subagent",idx:Pe,launch_id:je.launch_id,agent_type:nt,header:{idx:Pe,line:je},lines:[]};Oe.set(je.launch_id,yt),ee.push(yt);continue}ee.push({kind:"entry",idx:Pe,line:je})}let Ne=[],Te=0;for(;Te<ee.length;){if(ee[Te].kind!=="entry"){Ne.push(ee[Te]),Te+=1;continue}let Pe=Te;for(;Pe<ee.length&&ee[Pe].kind==="entry";)Pe+=1;Ne.push(...xe(ee.slice(Te,Pe))),Te=Pe}return Ne}function ce(Q){let ee=Q.input;return ee&&typeof ee.subagent_type=="string"?ee.subagent_type:null}function Ae(Q){for(let ee=Q.length-1;ee>=0;ee-=1){let Oe=Q[ee];if(Oe.kind==="result"||Oe.kind==="error")return null;if(Oe.kind==="tool"&&!Object.hasOwn(Oe,"result"))return Oe}return null}function ye(Q){for(let ee=Q.length-1;ee>=0;ee-=1)if(Q[ee].kind==="thinking")return Q[ee];return null}function K(Q,ee){if(ee.kind==="gate")return l`<div class="sv__gate">${ee.text}</div>`;if(ee.kind==="phase")return l`<div class="sv__phase">${ee.text}</div>`;if(ee.kind==="result")return l`<div
        class="sv__result${ee.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${ee.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Xn(ee.text||(ee.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(ee.kind==="thinking"){let Oe=h.has(Q);return l`<div
        class="sv__think${Oe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>be(Q)}
      >
        <span class="sv__think-line">💭 ${vs(ee.text)}</span>
        ${Oe?l`<pre class="sv__think-expand">${ee.text}</pre>`:""}
      </div>`}if(ee.kind==="user"){let Oe=h.has(Q);return l`<div
        class="sv__line sv__line--user${Oe?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>be(Q)}
      >
        <span class="sv__user-line">▷ ${vs(ee.text)}</span>
        ${Oe?l`<pre class="sv__user-expand">${ee.text}</pre>`:""}
      </div>`}if(ee.kind==="error")return l`<div class="sv__error">⛔ ${ee.text}</div>`;if(ee.kind==="blocker")return l`<div class="sv__error">⛔ ${ee.text}</div>`;if(ee.kind==="tool"){let Oe=h.has(Q),Ne=ee.tool==="Bash"?Lg(ee.command):0,Te=ee.tool==="Bash"?Ne>1?vs(ee.command):ee.command:ee.path||ee.command||"";return l`<div
        class="sv__tool${Oe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>be(Q)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${ee.icon}</span>
          <span class="sv__tool-name">${ee.tool}</span>
          ${Te?l`<span class="sv__tool-detail">${Te}</span>`:""}
          ${Ne>1?l`<span class="sv__tool-more">⋯ ${Ne}줄</span>`:""}
          ${typeof ee.added=="number"?l`<span class="sv__diff-add">+${ee.added}</span>`:""}
          ${typeof ee.removed=="number"?l`<span class="sv__diff-del">−${ee.removed}</span>`:""}
          ${ee.result?l`<span class="sv__tool-ok">→ ${ee.result}</span>`:""}
        </span>
        ${Oe?l`<pre class="sv__tool-expand">${se(ee)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Xn(ee.text||"")}</div>`}function se(Q){let ee=[];if(Q.tool==="Bash"&&typeof Q.command=="string"&&Q.command.length>0)ee.push(Q.command);else if(Q.input!==void 0)try{ee.push(`input: ${JSON.stringify(Q.input,null,2)}`)}catch{}return typeof Q.output=="string"&&Q.output.length>0&&ee.push(`output:
${Q.output}`),ee.join(`

`)}function ue(){if(!o)return l``;let Q=Ee(),ee=(a?[g.agent_type,g.model,g.effort]:[g.runner,g.model,g.effort]).filter(Boolean).join(" \xB7 "),Oe=g.session_id||"",Ne=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${y?"ON":"OFF"}`,Te=z(),Pe=Te?qg(ke(),Date.now()):"",je=Te?Ae(Q):null,ot=Te?ye(Q):null,nt=Ng(Q);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${g.label||(a?g.role||"":o)}</span
        >
        ${nt?l`<span
              class="sv__stage${nt.guess?" sv__stage--guess":""}"
              title=${nt.text}
              >${nt.text}</span
            >`:""}
        ${Te?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Pe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Pe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Pe?l`<span class="sv__live-ago">${Pe}</span>`:""}</span
            >`:""}
        ${Oe?l`<button
              type="button"
              class="sv__session"
              title=${Oe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Oe}`}
              @click=${()=>Ue(Oe)}
            >
              ⧉ ${Oe.slice(0,8)}
            </button>`:""}
        ${g.resume_command?l`<button
              type="button"
              class="sv__resume-cmd"
              title=${g.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${g.resume_command}`}
              @click=${()=>Ue(g.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${ee?l`<span class="sv__meta">${ee}</span>`:""}
        ${g.worktree?l`<span class="sv__wt" title=${g.worktree}
              >${g.worktree}</span
            >`:""}
        ${a||d?"":l`<button
              type="button"
              class="sv__prompt-toggle${Z?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${Z?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${L}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${y?" sv__follow--on":""}"
          aria-pressed=${y?"true":"false"}
          aria-label=${Ne}
          @click=${Le}
        >
          <span class="sv__follow-full">⇣ ${Ne}</span>
          <span class="sv__follow-short">⇣ ${y?"ON":"OFF"}</span>
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
      ${a||d?"":ne()}
      <div class="sv__body">
        ${Q.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:he(Q).map(tt=>tt.kind==="subagent"?He(tt):tt.kind==="group"?$e(tt):K(tt.idx,tt.line))}
      </div>
      ${je||ot?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${je?l`<span class="sv__now-icon">${je.icon}</span>
                  <span class="sv__now-name">${je.tool}</span>
                  <span class="sv__now-detail"
                    >${je.tool==="Bash"?vs(je.command):je.path||je.command||""}</span
                  >`:""}
            ${ot?l`<span class="sv__now-think"
                  >💭 ${vs(ot.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function $e(Q){return l`<div
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
    </div>`}function He(Q){let ee=A.has(Q.idx),Oe=Q.header?Q.header.line:null,Ne=Oe?Oe.is_error===!0?"\u2717":typeof Oe.result=="string"?"\u2713":"\u27F3":"",Te=Oe&&Oe.command?Oe.command:"";return l`<div class="sv__sub${ee?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ge(Q.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Q.agent_type||"subagent"}</span>
        ${Te?l`<span class="sv__sub-detail">${Te}</span>`:""}
        <span class="sv__sub-count">${Q.lines.length}줄</span>
        ${Ne?l`<span class="sv__sub-state">${Ne}</span>`:""}
        ${ee?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${ee?l`<div class="sv__sub-body">
            ${xe(Q.lines).map(Pe=>Pe.kind==="group"?$e(Pe):K(Pe.idx,Pe.line))}
          </div>`:""}
    </div>`}function ge(Q){A.add(Q),qe()}function qe(){Qe(ue(),e),te(),y&&N()}function N(){let Q=e.querySelector(".sv__body");Q&&(Q.scrollTop=Q.scrollHeight)}function be(Q){h.has(Q)?h.delete(Q):h.add(Q),qe()}function Le(){y=!y,qe()}function Ue(Q){fn(Q).then(ee=>{ee?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ze(Q){!o||!Q||(g={...g,...Q},qe())}function We(Q){let ee=Q.target;if(!ee||!ee.classList||!ee.classList.contains("sv__body"))return;!(ee.scrollHeight-ee.scrollTop-ee.clientHeight<=4)&&y&&(y=!1,qe())}e.addEventListener("scroll",We,!0);function Ge(Q){let ee=Q.target;!ee||typeof ee.closest!="function"||e.contains(ee)||ee.closest("dialog")||ee.closest(".md-viewer-root")||_t()}let et=!1;function it(){et||(document.addEventListener("mousedown",Ge),et=!0)}function ft(){et&&(document.removeEventListener("mousedown",Ge),et=!1)}function $t(Q){let ee=Q&&Q.attempt_id;if(!ee)return;let Oe=typeof Q.launch_id=="string"&&Q.launch_id.length>0?Q.launch_id:null,Ne=Q.session_ref&&typeof Q.session_ref=="object"?Q.session_ref:null;if(Oe&&Ne)return;let Te=c;o=ee,a=Oe,i=Ne,c=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Te&&Te!==c&&Promise.resolve(n("unsubscribe-session-log",{id:Te})).catch(()=>{}),u=typeof Q.root_dir=="string"&&Q.root_dir.length>0?Q.root_dir:null,g=Q.meta||{},d=Q.hide_prompt===!0,y=!0,h.clear(),A.clear(),G(),!M&&r&&(M=r.subscribe(qe)),n&&Promise.resolve(n("subscribe-session-log",{id:c,attempt_id:o,...a?{launch_id:a}:{},...i?{session_ref:i}:{},...u?{root_dir:u}:{}})).catch(()=>{}),it(),qe()}function _t(){let Q=c;ft(),o=null,a=null,i=null,c=null,u=null,d=!1,h.clear(),A.clear(),G(),me(),n&&Q&&Promise.resolve(n("unsubscribe-session-log",{id:Q})).catch(()=>{}),Qe(l``,e),s&&s()}return{open:$t,updateMeta:ze,close:_t,isOpen(){return o!==null},destroy(){me(),ft(),M&&(M(),M=null),e.removeEventListener("scroll",We,!0),o=null,a=null,i=null,c=null,u=null,d=!1,Qe(l``,e)}}}function Mo(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Ti(t.spec_id),s=Ti(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ti(e){return typeof e=="string"?e.trim():""}function Bu(e){let t=Mo(e);if(t.path)return t;let n=Ti(Fg(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Fg(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function jg(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Bg(e){let t=e&&e.metadata||{},n=Bu(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:jg(t)?null:"plan_pending"}),r}function Uu(e,t){let n=Bg(e);return l`
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
  `}var Ug="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Wg=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,zg=/^\*\*결론\*\* — (.+)$/;function No(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Ug)return null;let n=Wg.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?zg.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Wu=20;function zu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Hg(e){return e.length>Wu?`${e.slice(0,Wu)}\u2026`:e}function Gg(e,t,n,r){let s=`${t.lane} ${Hg(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${zu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?l`<div class="detail-report__body">
          ${Xn(t.body)}
        </div>`:""}
  </div>`}function Kg(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${zu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Xn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Hu(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=No(typeof c.text=="string"?c.text:"");return u?Gg(c,u,t,s.has(c.id)):Kg(c)})}
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
  `}var{I:Ik}=ic;var Gu=e=>e.strings===void 0;var Vg={},Ku=(e,t=Vg)=>e._$AH=t;var br=Eo(class extends Fr{constructor(e){if(super(e),e.type!==Bn.PROPERTY&&e.type!==Bn.ATTRIBUTE&&e.type!==Bn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Gu(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===bn||t===Ft)return t;let n=e.element,r=e.name;if(e.type===Bn.PROPERTY){if(t===n[r])return bn}else if(e.type===Bn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return bn}else if(e.type===Bn.ATTRIBUTE&&n.getAttribute(r)===t+"")return bn;return Ku(e),t}});var qo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ri=[...qo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],zn=["orchestration_model","orchestration_effort","orchestration_speed"],Fo=[...qo,...zn],Yg=Ri.filter(e=>Fo.includes(e)),Vu=["delegated","main"],jo=["inherit","claude","codex"],ws=["default","fast"],ks=["standard","fast_track"],$s=["codex","opus","fable","self","skip"],Bo=["codex","fable","skip"],Uo=["low","medium","high","xhigh"],mn="auto";function _n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Yu(e){if(!_n(e)||!_n(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))_n(r)&&_n(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Ur(e,t){let n=Yu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[mn,...r.flatMap(([,s])=>s)]}function Zu(e,t,n,r){if(!_n(e)||!_n(e.runners))return[mn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!_n(a)||!_n(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(n&&n!==mn&&i!==n)continue;let u=r(a,c);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[mn,...s]}function Wr(e,t,n){return Zu(e,t,n,(r,s)=>_n(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Oi(e,t,n){return Zu(e,t,n,(r,s)=>_n(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:_n(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function xs(e,t){let n=Yu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Xu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Ur(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Wr(t,s,r.impl_model||mn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Zg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ci=[...Yg,...zn],Xg=[...Fo,...Ri].filter((e,t,n)=>n.indexOf(e)===t&&!Ci.includes(e));function Qu(e,t){let n=_n(e)?e:{},r=_n(t)?t:{},s=[];for(let a of Ci){let i=n[a]??null,c=r[a]??null;i!==c&&s.push({key:a,label:Zg[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...Xg,...Object.keys(r)])!Ci.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Li(e,t,n,r,s,o){return vo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Ju(e,t){let n={};for(let r of Ri){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function ed(e,t){let n={};for(let r of zn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Ii=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...zn]}],Qn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Wo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Pi(e,t,n,r,s,o=null){let a=ln({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function td(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of Pi(e,t,n,r,s,o))a[i.source]+=1;return a}function nd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function rd(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var zk=[...qo,...zn];var Qg=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Di={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},sd={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Jg={pin:"pin",global:"global",base:"base"};function eb(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${Jg[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function tb(e,t,n){switch(e){case"workflow_mode":return ks;case"spec_review_model":case"impl_review_model":return $s;case"plan_review_model":return Bo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Uo;case"impl_dispatch":return Vu;case"impl_runtime":return jo;case"impl_model":return Ur(n,t.impl_runtime);case"impl_effort":return Wr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return ws;case"orchestration_model":return xs(n,null);case"orchestration_effort":return Wr(n,void 0,t.orchestration_model||mn).filter(r=>r!==mn);default:return[]}}function nb(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${eb(e.source)}
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
      >${Wo[e.source]}</span
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
  </div>`}function od(e,t){let n=Ii.flatMap(c=>c.keys),r=Pi(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=td(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(c=>[c.key,c])),a=Object.fromEntries(r.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=r.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return l`<details
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
        >${rb(o)}</span
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
          ${Ii.map(c=>l`
              <div class="detail-effective__subhead">${c.label}</div>
              ${r.filter(u=>c.keys.includes(u.key)).map(u=>{let d=vo({key:u.key,choices:tb(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return nb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
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
  </details>`}function rb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function sb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function ad(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=sb(n.exec_receipt),c=i?Nn(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=ho(n.planned_execution,n.exec_receipt),g=n.chips?.pr?.number,y=typeof g=="number"?`PR #${g}`:"PR";return l`<section class="detail-summary" data-seam="detail-summary">
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
      ${ob(s).map(h=>ab(h,t,r,{label:h.id==="pr"?y:h.label,href:h.id==="pr"?o:""}))}
    </div>
  </section>`}function ob(e){let n=typeof e=="string"&&Object.hasOwn(Di,e)&&Di[e]||Di.spec_backed;return Qg.filter(r=>n.includes(r.id))}var zo={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function ab(e,t,n,r){let s=ib(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,c=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",g=u?zo.stale:i?zo.on:c?zo.current:zo.none,y=lb(e,n),h=`${r.label} \xB7 ${g}${y?` \xB7 ${y}`:""}${s?` \xB7 ${s}`:""}`,A=`detail-summary__gate${i?" detail-summary__gate--on":""}${c?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,M=l`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?l`<a
      class=${A}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${h}
      >${M}</a
    >`:l`<span
    class=${A}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${h}
    >${M}</span
  >`}function ib(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function lb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(sd,n)?sd[n]:""}function Ho(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function id(e){return Ho(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function ld(e,t){let n=e&&e[t];if(!Ho(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(id),s=id(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function dd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Go(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${dd(e)}${t}`}function zr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${dd(e)}`}function cb(e,t,n){if(n!==null){let s=e==="claude"?Go:zr,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:zr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function cd(e,t){if(!Ho(e)||e.state!=="usable"||!Ho(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function ud(e){let t=e.provider_key==="claude"?Go:zr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${cb(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function pd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${ud({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:ld(t,"claude"),selected:s,workspace_default:cd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${ud({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:ld(t,"codex"),selected:o,workspace_default:cd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var fd=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function As(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ko(e){if(!As(e)||!As(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>As(n)&&As(n.models));return t.length>0?t:null}function En(e,t){let n=Ko(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function _d(e,t){return As(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function md(e,t){let n=Ko(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return _d(r,r.models[t]);return[]}function ub(e){let t=Ko(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of _d(r,s))n.includes(o)||n.push(o);return n}function db(e,t){if(!t)return ub(e);let r=Ko(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of md(e,o))s.includes(a)||s.push(a);return s}function gd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=En(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?md(t,r.impl_model):db(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function pb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function fb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Vo(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function u(M){M.key==="Escape"&&s&&(M.preventDefault(),h())}document.addEventListener("keydown",u);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${pb(s)}</span
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
    `:l``}function g(){Qe(d(),e)}async function y(M,W={}){s=M,o="loading",a="",i=null,c="",g();let Z=W.workspace||(n?n():"");if(!Z){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",g();return}if(!r){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",g();return}let le="/api/doc?workspace="+encodeURIComponent(Z)+"&path="+encodeURIComponent(M);try{let V=await r(le),B=await V.json().catch(()=>({}));if(!V.ok||!B||B.ok!==!0){if(B?.error==="not_found"&&W.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",g();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(B&&B.error||V.status)+")",g();return}let j=fb(String(B.content||""));i=j.front,a=j.body,o="ready",g()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",g()}}function h(){s=null,Qe(l``,e)}function A(){document.removeEventListener("keydown",u),h()}return{open:y,close:h,destroy:A}}var _b=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],yd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Yo=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],mb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function bd(e){return typeof e=="string"&&mb.has(e)}var gb=["running","done","failed","interrupted"],bb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function hb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function yb(e){let t=Vt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=qr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${yd}
          >부분 집계</span
        >`:""}`}function hd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function qi(e){if(typeof e=="number")return Ss(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ss(t):""}function vb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function wb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Mi(e){return e===null||typeof e=="string"&&e.trim().length>0}function Ni(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function kb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Yo.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Mi(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Mi(t.effort))||!(!("agent_type"in t)||Mi(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!gb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Ni(t.started_at)||!Ni(t.last_event_at)||!Ni(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function $b(e,t,n){let s=Vt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
    ${qi(n.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${qi(n.completed_at)}</span
        >`:""}
    ${s?l`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function xb(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Vt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Ss(e.last_event_at):s?qi(s.completed_at):"",c=(e.provider==="claude"?["Claude",e.agent_type,vb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=wb(e,s);return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${bb[e.status]}</span
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
  </button>`}function Ab(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Sb(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let g=kb(d);!g||s.has(g.launch_id)||bd(g.agent_type)||(s.add(g.launch_id),r.push(g))}r.sort((d,g)=>(d.started_at||0)-(g.started_at||0));let a={};for(let{role:d,provider:g}of Yo){let y=t?t.roles[d]?.[g]:null;a[d]=y?[...y.legs]:[]}let i=Yo.flatMap(({role:d})=>a[d]),c=new Set,u=[];for(let{role:d,provider:g}of Yo){for(let y of r.filter(h=>h.role===d&&h.provider===g)){let h=i.find(A=>A.receipt_id===y.launch_id)||null;h&&!Ab(y,h)||(h&&c.add(h.receipt_id),u.push(xb(y,h,e.attempt_id,n)))}for(let y of a[d])!c.has(y.receipt_id)&&!bd(y.agent_type)&&u.push($b(d,g,y))}return u}function Eb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[..._b,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${r.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${hb(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${yd}</span>`:""}
  </div>`}var Tb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ss(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Cb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Rb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Ob(e,t){let n=Rb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return l`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Xa(e)}
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
  </div>`}function vd(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],a=[...o.filter(h=>h&&h.current===!0),...o.filter(h=>h&&h.current!==!0).sort((h,A)=>A.index-h.index)],i=a.map(h=>Ob(h,t)),c=n.expanded||new Set;if(s.length===0&&a.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let h of s)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&u.add(h.resumed_from);let d=h=>{if(!(h.status==="failed"||h.status==="orphaned"))return"";let M=typeof h.session_id=="string"&&h.session_id.length>0,W=u.has(h.attempt_id),Z=M&&!W,le=M?W?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${h.attempt_id}
      ?disabled=${!Z}
      title=${le}
      @click=${V=>{V.stopPropagation(),Z&&t.onResume&&t.onResume(h.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},g=h=>{if(!(h.status==="failed"||h.status==="orphaned")||typeof h.cause!="string"||h.cause==="")return"";let M=h.cause_detail,W=M&&typeof M.reason=="string"&&M.reason.length>0?typeof M.command=="string"&&M.command.length>0?`${M.reason} \xB7 ${M.command}`:M.reason:h.cause;return l`<div class="detail-session__cause" title=${W}>
      ${h.cause}
    </div>`},y=h=>{let A=hd(ti(h));if(Vt(A).length===0&&!qr(h.usage))return"";let M=c.has(h.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${h.attempt_id}
      aria-expanded=${M?"true":"false"}
      title=${M?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${W=>{W.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(h.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${yb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${i}${s.map(h=>{let A=ti(h),M=hd(A),W=Vt(M);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${h.status||"unknown"}"
            data-attempt-id=${h.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(h.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Tb[h.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${h.attempt_id}</span>
            ${os(h)?l`<span
                  class="detail-session__resumed"
                  title=${os(h)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${_r(h)}</span>
            ${W.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${h.session_id?l`<span class="detail-session__sid" title=${h.session_id}
                  >${String(h.session_id).slice(0,8)}</span
                >`:""}
            ${W.length>0?W.map(Z=>l`<span
                      class="detail-session__usage"
                      title=${Z.tooltip}
                      >${Z.label}</span
                    >`):qr(h.usage)?l`<span class="detail-session__usage"
                    >${qr(h.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ss(h.started_at)}</span>
          </button>
          ${y(h)} ${d(h)} ${g(h)} ${Cb(h)}
          ${c.has(h.attempt_id)&&h.usage?Eb(h.usage,h.runner==="codex"?"codex":"claude"):""}
          ${Sb(h,A,t)}
        </div>`})}
    </div>
  `}function wd(e,t={}){return l`
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
          ${Lb(e)}
        </div>`:""}
  `}function Lb(e){let t=jr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Wn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Do(n.recorded_at);return l`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Wn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Wn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Ib=["open","in_progress","deferred","resolved","closed"],Pb=[0,1,2,3,4];function kd(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,d=null,g={},y="",h=!1,A=[],M=!1,W={},Z={claude:null,codex:null},le=null,V=null,B=0,j=!1,G=!1,P="",L="",ne="";function Ee(){j=!1,G=!1,P="",L="",ne=""}function ke(){Z={claude:null,codex:null},le=null,V=null,B+=1}async function z(){if(!s)return null;try{let v=await Promise.resolve(s("get-workspace-accounts",{}));return v&&typeof v.state=="string"?v:null}catch{return null}}async function te(v){try{let O=await fetch(v);if(!O.ok)return null;let C=await O.json();if(!C||typeof C!="object"||!Array.isArray(C.accounts))return null;let ve=C.accounts.filter(rt=>rt!==null&&typeof rt=="object"&&!Array.isArray(rt));return{accounts:ve,active:ve.find(rt=>rt.active===!0)||null}}catch{return null}}async function me(v){V=v;let O=++B,[C,ve,rt]=await Promise.all([te("/api/claude-usage"),te("/api/codex-usage"),z()]);O!==B||v!==u||(Z={claude:C,codex:ve},le=rt,H())}let xe=[],he=null,ce=null,Ae=!1,ye="",K=!1,se=0,ue=new Set;function $e(){xe=[],he=null,ce=null,Ae=!1,ye="",K=!1,se+=1,ue.clear()}async function He(v){if(!s)return;let O=++se;try{let C=await Promise.resolve(s("get-comments",{id:v}));if(O!==se||v!==u)return;xe=Array.isArray(C)?C:[],Ae=!1}catch{if(O!==se||v!==u)return;Ae=!0}H()}function ge(){if(!s||!u)return;let v=d&&typeof d.comment_count=="number"?d.comment_count:null;if(he!==u){he=u,ce=v,He(u);return}v!==null&&v!==ce&&(ce=v,He(u))}function qe(v){ue.has(v)?ue.delete(v):ue.add(v),H()}function N(v){let O=ye.trim().length===0;ye=v,O!==(v.trim().length===0)&&H()}async function be(){let v=ye.trim();if(!s||!u||v.length===0||K)return;let O=u;K=!0,H();let C=!1;try{let ve=await Promise.resolve(s("add-comment",{id:O,text:v}));Array.isArray(ve)&&ve.length>0&&(C=!0,O===u&&(xe=ve,Ae=!1,ye="",ce=ve.length))}catch{C=!1}C||pe("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),O===u&&(K=!1),H()}let Le={onToggle:qe,onDraftInput:N,onSubmit:be},Ue=t.mdViewer||null,ze=null;Ue||(ze=document.createElement("div"),ze.className="md-viewer-root",document.body.appendChild(ze));let We=Ue||Vo(ze,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ge=document.createElement("div");Ge.className="session-log-root",document.body.appendChild(Ge);let et=Br(Ge,{transport:s?(v,O)=>Promise.resolve(s(v,O)):void 0,sessionLogStore:c}),it=!1,ft=!1,$t=!1,_t=null,Q=null,ee=0;function Oe(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function Ne(){it=!1,ft=!1,$t=!1,_t=null,Q=null,ee+=1}async function Te(v){if(!s)return;let O=++ee;ft=!0,$t=!1,H();try{let C=await Promise.resolve(s("get-bead-prompt",{bead_id:v}));if(O!==ee)return;!C||typeof C!="object"||Array.isArray(C)?$t=!0:(_t=C,Q=Oe(v))}catch{O===ee&&($t=!0)}finally{O===ee&&(ft=!1,H())}}let Pe=[],je=null,ot=0;function nt(v,O){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}::${O}`}function tt(){Pe=[],je=null,ot+=1}async function yt(v,O){if(!s)return;let C=++ot,ve;try{ve=await Promise.resolve(s("get-session-refs",{bead_id:v}))}catch{ve=null}C!==ot||O!==je||(Pe=ve&&Array.isArray(ve.sessions)?ve.sessions:[],H())}function It(){if(!s||!u)return;let v=d&&d.metadata,O=v&&typeof v=="object"&&typeof v.session_ref=="string"?v.session_ref:null;if(O===null){tt();return}let C=nt(u,O);je!==C&&(Pe=[],je=C,yt(u,C))}function mt(){if(it=!it,it&&u&&Q!==Oe(u)){_t=null,Te(u);return}H()}function Mt(){if(!a||!u)return[];let v=a.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(C=>C&&C.bead_id===u).sort((C,ve)=>(ve.started_at||0)-(C.started_at||0)).map(C=>({attempt_id:C.attempt_id,bead_id:C.bead_id,status:C.status,started_at:typeof C.started_at=="number"?C.started_at:null,runner:C.runner||null,model:C.model||null,effort:C.effort||C.observed_effort||null,speed:C.speed||null,session_id:C.session_id||null,resumed_from:C.resumed_from||null,continuation_mode:C.continuation_mode||null,dismissed_at:typeof C.dismissed_at=="number"?C.dismissed_at:null,cause:typeof C.cause=="string"?C.cause:null,cause_detail:C.cause_detail||null,exec_default_preset_id:typeof C.exec_default_preset_id=="string"?C.exec_default_preset_id:null,exec_default_preset_revision:typeof C.exec_default_preset_revision=="number"?C.exec_default_preset_revision:null,exec_values:C.exec_values&&typeof C.exec_values=="object"?C.exec_values:null,usage:C.usage||null,usage_legs:Array.isArray(C.usage_legs)?C.usage_legs:[],delegation_sessions:Array.isArray(C.delegation_sessions)?C.delegation_sessions:[]}))}function vt(){if(!a||!u)return null;let v=a.get();return hn(v&&v.attempts||{},u)}let Ve=new Set;function De(v){Ve.has(v)?Ve.delete(v):Ve.add(v),H()}function D(v){let O=a?a.get():null,C=O&&O.attempts?O.attempts[v]:null;et.open({attempt_id:v,meta:C?{runner:C.runner||void 0,model:C.model||void 0,effort:C.effort||void 0,status:C.status||void 0,session_id:C.session_id||void 0}:{}})}function X(v,O){let C=a?a.get():null,ve=C&&C.attempts?C.attempts[v]:null,Ye=(ve&&Array.isArray(ve.delegation_sessions)?ve.delegation_sessions:[]).find(at=>at&&typeof at=="object"&&at.launch_id===O);Ye&&et.open({attempt_id:v,launch_id:O,meta:{runner:Ye.provider==="claude"?"claude":"codex",role:Ye.role,...typeof Ye.agent_type=="string"?{agent_type:Ye.agent_type}:{},model:Ye.model,effort:Ye.effort,session_id:Ye.session_id,status:Ye.status}})}async function de(v){if(!s||!v)return;let O=await Mr();if(O===null)return;let C=()=>{let at=a?a.get():null;return at&&typeof at.revision=="number"?at.revision:0},ve=async(at={},Ze=C())=>await s("worker-attempt-resume",{attempt_id:v,expected_revision:Ze,...O!==""?{instructions:O}:{},...at}),rt=at=>{at?.queue&&a?.set&&a.set(at.queue)},Ye=await ve();if(rt(Ye),Ye&&Ye.conflict){let at=Ye.queue&&typeof Ye.queue.revision=="number"?Ye.queue.revision:C();Ye=await ve({},at),rt(Ye)}Ye=await qn(Ye,(at,Ze)=>ve({continuation:at,decision_token:Ze}),{onResult:rt,refresh:()=>ve()}),Ye&&Ye.resumed===!1&&!Ye.conflict&&Ye.reason&&pe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ye.reason}`,"error",2400)}function E(v){!v||!u||et.open(wo(v,u,d&&d.status))}let Y={onOpen:D,onOpenDelegation:X,onResume:de,onToggleUsage:De,onOpenSessionRef:E,onCopyResumeCommand:St};function fe(){let v=a?a.get():null,O={...W};for(let C of["orchestration_model","orchestration_effort","orchestration_speed"]){let ve=v&&v[C];typeof ve=="string"&&(O[C]=ve)}return O}async function x(){if(s){try{let v=await Promise.resolve(s("get-session-defaults",{}));W=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{W={}}H()}}function b(){let v=a?a.get():null;return v&&v.runner_catalog||null}function $(){let v=a?a.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function U(){let v=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},C=ln({pin:{...v,...g},global:fe(),execution_defaults:$(),runner_catalog:b(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return En(b(),C)}function oe(){let v=i?i.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function ae(v){return v?.compatible===!1}function we(v){i&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&i.set({revision:v.revision,presets:v.presets})}async function Re(){let v=oe(),O=v?.presets.find(C=>C.id===y);if(!(!s||!u||!v||!O||ae(O)||h)){h=!0,A=[],H();try{let C=await Promise.resolve(s("apply-impl-preset",rd(u,O.id,v.revision)));if(C&&C.conflict){we(C),pe("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ve=C&&Array.isArray(C.issue)?C.issue[0]:C?.issue;if(C&&C.applied&&ve&&typeof ve=="object"){d=ve,A=Array.isArray(C.skipped_orchestration_keys)?C.skipped_orchestration_keys.filter(rt=>typeof rt=="string"):[];for(let rt of fd)delete g[rt];pe(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}C&&C.error==="bd_readback_failed"?pe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):pe("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(C){C&&typeof C=="object"&&C.code==="bd_readback_failed"?pe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):pe("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{h=!1,H()}}}let Je=null;n&&n.subscribe&&(Je=n.subscribe(()=>Nt()));let ct=null;a&&typeof a.subscribe=="function"&&(ct=a.subscribe(()=>{u&&H()}));let Ce=null;i&&typeof i.subscribe=="function"&&(Ce=i.subscribe(()=>{u&&H()}));function pt(v){v.key==="Escape"&&u&&(v.preventDefault(),r())}document.addEventListener("keydown",pt);function Nt(){if(u){if(n&&typeof n.snapshotFor=="function"){let v=n.snapshotFor("detail:"+u)||[];d=v.find(C=>C&&C.id===u)||v[0]||d}ge(),It(),H()}}function St(v){fn(v).then(O=>{O?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function un(v){v.preventDefault(),v.stopPropagation(),u&&St(u)}function Ht(v,O){v.preventDefault(),v.stopPropagation(),St(O)}function Ut(v,O,C){v.preventDefault(),v.stopPropagation(),We.open(O,{missing_state:C})}function Zt(v,O){g[v]=O,H(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",nd(u,v,O.length===0?null:O))).catch(()=>{pe("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function zt(v,O){let C=d||{},ve=C.metadata&&typeof C.metadata=="object"?C.metadata:{},rt={};for(let Ze of["impl_runtime","impl_model","impl_effort"])rt[Ze]=Object.hasOwn(g,Ze)?g[Ze]:typeof ve[Ze]=="string"?ve[Ze]:"";rt[v]=O;let Ye=gd(rt,b(),U()),at={};for(let Ze of["impl_runtime","impl_model","impl_effort"])at[Ze]=g[Ze],g[Ze]=Ye[Ze]||"";H(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Ye,orchestration_runtime:U()})).then(Ze=>{let qt=Array.isArray(Ze)?Ze[0]:Ze;if(!qt||typeof qt!="object"||!qt.id)throw new Error("implementation target readback failed");d=qt;for(let sn of["impl_runtime","impl_model","impl_effort"])delete g[sn];H()}).catch(()=>{for(let Ze of["impl_runtime","impl_model","impl_effort"])at[Ze]===void 0?delete g[Ze]:g[Ze]=at[Ze];H(),pe("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function gt(v,O,C){if(!s||!u)return!1;try{let ve=await Promise.resolve(s(v,O)),rt=Array.isArray(ve)?ve[0]:ve;return rt&&typeof rt=="object"&&rt.id?(d=rt,!0):(pe(C,"error"),!1)}catch{return pe(C,"error"),!1}}function Ke(v){setTimeout(()=>{try{let O=e.querySelector(v);O&&typeof O.focus=="function"&&O.focus()}catch{}},0)}function dn(){j=!0,P=d&&d.title||"",H(),Ke('.detail-edit__input[data-edit="title"]')}function tn(v){P=v.target.value}function st(){j=!1,P="",H()}function Ie(){gt("edit-text",{id:u,field:"title",value:P},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(O=>{O&&(j=!1,P=""),H()})}function R(){G=!0,L=d&&d.description||"",H(),Ke('.detail-edit__textarea[data-edit="description"]')}function _e(v){L=v.target.value}function Se(){G=!1,L="",H()}function ut(){gt("edit-text",{id:u,field:"description",value:L},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(O=>{O&&(G=!1,L=""),H()})}function xt(v,O,C,ve){if(v.key==="Escape"){v.stopPropagation(),C();return}v.key==="Enter"&&(!ve||v.ctrlKey||v.metaKey)&&(v.preventDefault(),O())}function ht(v){let O=v.target.value;gt("update-status",{id:u,status:O},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>H())}function Dt(v){let O=Number(v.target.value);gt("update-priority",{id:u,priority:O},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>H())}function jt(v){ne=v.target.value}function Gt(){let v=ne.trim();v.length!==0&&gt("label-add",{id:u,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(O=>{O&&(ne=""),H()})}function nn(v){if(v.key==="Escape"){v.stopPropagation(),ne="",H();return}v.key==="Enter"&&(v.preventDefault(),Gt())}function Et(v){gt("label-remove",{id:u,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>H())}let rn={onCopyPath:Ht,onOpenDoc:Ut};function gn(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function Pn(v){switch(v&&typeof v=="object"?String(v.dependency_type||v.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function T(v){let C=(Array.isArray(v.dependencies)?v.dependencies:[]).map(ve=>({id:gn(ve),icon:Pn(ve)})).filter(ve=>ve.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${C.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${C.map(ve=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(ve.id)}
                  >
                    ${ve.icon?`${ve.icon} `:""}${ve.id}
                  </button>`:l`<span class="detail-dep"
                    >${ve.icon?`${ve.icon} `:""}${ve.id}</span
                  >`)}
          </div>`}
    `}function I(v){let O=v.metadata||{},C=v.workflow||{},ve=C.stages||{},rt=ve.spec&&ve.spec.stale,Ye=ve.impl&&ve.impl.stale,at=C.quick_fix_review?.state==="stale",Ze=ve.plan||null,qt=C.route_source==="derived",sn=C.route||O.route||"\u2014";return l`
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
              >${O.spec_review||"\uC5C6\uC74C"}${rt?" \xB7 stale":""}</span
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
              >${Nn(C.exec_receipt)}</span
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
    `}let Me={route:["quick_fix","spec_backed","full_plan"]};async function f(v,O){let C=O.target.value;if(v==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&C!=="full_plan"&&!window.confirm(`full_plan \u2192 ${C||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){H();return}await gt("update-workflow-meta",{id:u,key:v,value:C},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),H()}function k(v){let O=v.metadata||{};return l` ${((ve,rt)=>{let Ye=Me[ve],at=typeof O[ve]=="string"?O[ve]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${ve}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ve}
          data-edit=${`wfmeta-${ve}`}
          @change=${Ze=>f(ve,Ze)}
        >
          <option value="" ?selected=${!Ye.includes(at)}>
            ${rt}
          </option>
          ${Ye.map(Ze=>l`<option value=${Ze} ?selected=${at===Ze}>${Ze}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function q(v,O){return j?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${P}
            @input=${tn}
            @keydown=${C=>xt(C,Ie,st,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ie}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${st}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
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
    `}function re(v){let O=Kt(v.created_at),C=Kt(v.updated_at);return!O&&!C?l``:l`
      ${O?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${O}</span>
          </div>`:""}
      ${C?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${C}</span>
          </div>`:""}
    `}function p(v,O){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ht}
        >
          ${Ib.map(C=>l`<option value=${C} ?selected=${C===v}>${C}</option>`)}
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
          ${Pb.map(C=>l`<option value=${String(C)} ?selected=${C===O}>
                P${C}
              </option>`)}
        </select>
      </div>
    `}function m(v){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${G?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${R}
            >
              ✎
            </button>`}
      </div>
      ${G?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${L}
              @input=${_e}
              @keydown=${O=>xt(O,ut,Se,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ut}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Se}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function w(v){let O=typeof v.notes=="string"?v.notes:"";return O.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${O}</div>
    `}function S(v){let O=Array.isArray(v.labels)?v.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${O.map(C=>l`<span class="detail-label-chip"
              >${C}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${C}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+C}
                @click=${()=>Et(C)}
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
    `}function J(){if(!u)return l``;let v=d||{},O=String(v.id||u),C=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ve=vt(),rt=v.status||"open",Ye=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",at=v.description||"",Ze={...v,metadata:{...v.metadata||{},...g}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${un}
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
          ${q(C,ve)}
          ${ad(Ze)}
          ${od({metadata:Ze.metadata,workspace_values:fe(),catalog:b(),execution_defaults:$(),expanded:M,presets:oe()?.presets||[],preset_id:y,preset_busy:h,skipped_orchestration_keys:A},{onToggle:qt=>{M=qt,H()},onEdit:(qt,sn)=>{if(qt==="impl_runtime"||qt==="impl_model"||qt==="impl_effort"){zt(qt,sn??"");return}Zt(qt,sn??"")},onPresetSelect:qt=>{y=qt,A=[],H()},onPresetApply:()=>{Re()}})}
          ${pd({md:Ze.metadata,catalog:Z,workspace_defaults:le,handlers:{onExecChange:Zt}})}
          ${p(rt,Ye)} ${re(v)}
          ${m(at)}
          ${Hu(xe,Le,{expanded:ue,draft:ye,sending:K,error:Ae})}
          ${w(v)} ${S(v)} ${T(v)}
          ${I(v)} ${k(v)}
          ${Uu(v,rn)}
          ${wd({expanded:it,loading:ft,error:$t,data:_t},{onToggle:mt})}
          ${vd(Mt(),Y,{total:ve,expanded:Ve},Pe)}
        </div>
      </div>
    `}function H(){Qe(J(),e)}return{load(v){v!==u&&(g={},y="",A=[],M=!1,Ee(),$e(),Ne(),tt(),ke()),u=v,d=null,Nt(),x(),V!==v&&me(v)},clear(){u=null,d=null,g={},y="",h=!1,A=[],M=!1,Ee(),$e(),Ne(),tt(),ke(),We.close(),et.close(),Qe(l``,e)},destroy(){Je&&(Je(),Je=null),ct&&(ct(),ct=null),Ce&&(Ce(),Ce=null),document.removeEventListener("keydown",pt),Ue||(We.destroy(),ze&&ze.parentNode&&ze.parentNode.removeChild(ze)),et.destroy(),Ge.parentNode&&Ge.parentNode.removeChild(Ge),u=null,d=null,ke(),y="",h=!1,A=[],$e(),Ne(),tt(),Qe(l``,e)}}}function $d(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,d,g="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let y=typeof g=="string"?g.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Zo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Ts(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function Xo(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function Qo(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function Jo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Db(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:Zo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function xd(e,t){let n=Db(e,t);return n?l`<button
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
            >${Jo(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Ts(n.deploy.elapsed_ms)}`:""}</span
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
  </div>`}function Mb(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Cs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ea(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Tn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(g=>g&&g.bead_id===t&&g.phase!=="done").sort((g,y)=>(g.requested_at||0)-(y.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?Mb(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:d}}function Es(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return l`<div
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
  </div>`}var Nb={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Ad(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Nb[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function ta(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function qb(e){return l`<div
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
  </div>`}function na(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.overlaps)?e.overlaps:[],r=e.interactive!==!1,s=e.scope_missing===!0,o=e.popover||null,a=e.cross_lane||null;return t.length===0&&n.length===0&&!s&&!a?"":l`<div class="worker-deps">
    ${a?l`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${a.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${a.label}
        </button>`:""}
    ${t.map(i=>l`<span
          class=${`worker-dep worker-dep--pred${i.foreign?" worker-dep--foreign":""}`}
          title=${i.title||""}
          >${r?l`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${i.id}
              >
                ${i.label}
              </button>`:i.label}</span
        >`)}${n.map(i=>l`<button
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
        >`:""}${o?qb(o):""}
  </div>`}function ra(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?l`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Fb(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return l`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function Sd(e){return e?l`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function sa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return l`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function jb(e){let t=Array.isArray(e.badges)?e.badges:[],n=Vt(e.usage),r=Fn(e.usage),s=an(e.done_at);return l`<div
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
  </div>`}function Jn(e){if(e.lane==="done"&&e.done_layout==="three_line")return jb(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Vt(e.usage),s=Fn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?an(e.done_at):"",u=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",y=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",h=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,A=e.lane==="done"?"":ra(e.workflow),M=e.lane==="done"?"":Sd(e.from_id),W=sa(e.priority),Z=l`<span class="worker-mini__title">${e.title}</span>`,le=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",V=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",B=n.map(ue=>ue===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ue}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ue===e.completion_badge&&e.completion_title||""}
          >${ue}</span
        >`),j=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",G=r.length>0?r.map(ue=>l`<span class="worker-usage" title=${ue.tooltip}
              >${ue.label}</span
            >`):s?l`<span class="worker-usage" title=${ls(e.usage)}
            >${s}</span
          >`:"",P=o?l`<span
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
      </button>`:"",ne=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Ee=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ke=e.discard,z=ke?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ke?.attempt_id||""}
          data-operation-id=${ke?.operation?.operation_id||""}
          data-discard-mode=${ke?.confirmation||"unmerged"}
          ?disabled=${ke?!ke.enabled:e.discard_enabled===!1}
          title=${ke?ke.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ke?.label||"\uD3D0\uAE30"}
        </button>`:"",te=e.stale_work||null,me=te?l`${te.can_resume||te.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            기존 작업 이어가기
          </button>`:""}${te.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            백업 후 새로 시작
          </button>`:""}${te.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            다시 확인
          </button>`:""}`:"",xe=te?l`<div class="worker-mini__stale">
        <strong>${te.title}</strong>
        <span>${te.summary}</span>
        <span>${te.cause}</span>
        ${te.can_backup_fresh?l`<small
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
        </button>`:"",ce=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Ae=y||A||M||ce||G?l`<div class="worker-chips">
          ${y}${A}${M}${ce?ta(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${G}
        </div>`:"",ye=na(e.dependency_chips),K=Es(e),se=!!(o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ke?.operation||e.revise_action||te);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">
            ${y}${h}${W}${M}${Z}
          </div>
          <div class="worker-mini__row2">
            ${G}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Kt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Ts(e.work_ms)}</span
                >`:""}${B}${P}
            <span class="worker-mini__actions"
              >${L}${ne}${Ee}${z}</span
            >
            ${Hr(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${u}${d}${h}${W}${le}${V}${B}${g}${j}
            </div>
            <div class="worker-mini__body">${Z}${xe}</div>
            ${ye}${Ae}${se?l`<div class="worker-mini__foot">
                  ${P}
                  <span class="worker-mini__actions"
                    >${L}${ne}${Ee}${z}${he}${me}</span
                  >
                  ${Es(e)}
                </div>`:""}
            ${Hr(e)}`:l`<div class="worker-mini__line">
              ${u}${d}${h}${W}${Z}${le}${V}${B}${g}${j}${P}${L}${ne}${Ee}${z}
            </div>
            ${ye}${Ae}${K} ${Hr(e)}`}
  </div>`}function Bb(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(l`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(l`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?l`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return l`${r}`}var Ub={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50"};function Fi(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.session_preferred===!0,i=Ub[e.session_preferred_reason||""]||"",c=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),g=na(e.dependency_chips),y=e.workspace_name?l`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",h=ra(c),A=Sd(e.from_id),M=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return l`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?l`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${sa(e.priority)}
      ${r?l`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:a?l`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${i}
              >세션 권장</span
            >`:""}${Fb(c)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${c?go(c,e.status,{onOpenDoc:n.onOpenDoc}):""}${g}
    ${y||h||A||M?l`<div class="worker-chips">
          ${y}${h}${A}${ta(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason||n.dep_action===!0?"":" worker-card__foot--actions-only"}"
    >
      ${o?l`<div class="worker-card__place-menu">
            ${Bb(t.lanes,e.id)}
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?Fi(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Jn(r))}
          </div>`}
  </section>`}var Ed={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Td={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Cd(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ji(e){for(let t of Cd(e))if(Object.hasOwn(Ed,t))return Ed[t];return null}function Bi(e){let t=null;for(let n of Cd(e))Object.hasOwn(Td,n)&&(t=Td[n]);return t}function oa(e){let t=ji(e),n=Bi(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Rd(e,t){let n=ji(e)??ji(t),r=Bi(t)??Bi(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Od=160;function Wb(e){return e.length>Od?`${e.slice(0,Od)}\u2026`:e}function zb(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${Wb(e.command)}</code>`:""}
  </div>`}function Hb(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Gb(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Ld(e){let t=e.failure?oa(e.failure.reason):"";return l`<div class="worker-banners">
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
          ${zb(e.failure.cause_detail)}
          ${Hb(e.failure.reason)}
          ${Es({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Kb(e){return!e||!e.repo&&!e.serial_lane_id?"":l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Vb=new Set(["codex-runner"]);function Yb(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(h=>h&&!(typeof h.agent_type=="string"&&Vb.has(h.agent_type))),c=i.filter(h=>h&&h.state==="live"),u=i.filter(h=>h&&h.state!=="live"),d=r&&typeof r.last_event_at=="number"?an(r.last_event_at,t):"",g=r?an(r.updated_at,t):"",y=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:g?`\uAC31\uC2E0 ${g}`:"";return l`${o?l`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?l`<span class="rtile__activity-age"
              >${an(a,t)}</span
            >`:""}
      </div>`:y?l`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${y}</span>
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
      </div>`:""}`}var Zb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Xb(e){if(!e)return"";let t=Zb[e.locality]||"";return l`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Ui(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(te=>te&&te.current===!0)||null,a=e.failed===!0,i=!!e.paused,c=a?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):i?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Gb(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=os(e),g=Vt(e.usage),y=Fn(e.usage),h=e.conflict_resolution?i?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,A=e.base_exception||null,M=e.landing,W=e.attempt_id&&e.attempt_id===n,Z=r.monitor||null,le=Kb(Z),V=Z?na(Z.dependency_chips):"",B=Yb(Z,t,i,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),j=s&&e.workflow?.chips?.exec_receipt||null,G=ra(e.workflow),P=j?l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Nn(j)}`}
        >${`${j.kind}:${bo(j)}`}</span
      >`:"",L=o?l`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${is(o)}</span
      >`:"",ne=le||G||L||P?l`<div class="rtile__meta">
          ${le}${G}${L}${P}
        </div>`:"",Ee=l`${h?l`<span class="worker-mini__badge">${h}</span>`:""}${A?l`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${A}</span
      >`:""}`,ke=s?"":Hr(e),z=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${W?" rtile--sel":""}${i?" rtile--paused":""}${a?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${sa(e.priority)}${d?l`<span class="rtile__resumed" title=${d}>↻</span>`:""}${Ee}
      <div class="rtile__hd-actions">
        ${s?l`${typeof e.started_at=="number"?l`<span class="rtile__elapsed">${c}</span>`:""}${Xb(o)}<span
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
    ${B}${e.rollup?mo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Va}):""}
    ${M?l`<div class="rtile__landing">
          <span
            class="merge-step${M.failed?" merge-step--failed":""}"
            style=${`--progress: ${M.percent}%`}
            >${M.label}${M.index>0?l`<span class="merge-step__n"
                  >${M.index}/${M.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${V}
    ${s?ne:le||G||u||g.length>0||y?l`<div class="rtile__meta">
            ${le}${G}${ta(e.exec_chips)}
            ${g.length>0?g.map(te=>l`<span class="worker-usage" title=${te.tooltip}
                      >${te.label}</span
                    >`):y?l`<span
                    class="worker-usage"
                    title=${ls(e.usage)}
                    >${y}</span
                  >`:""}
          </div>`:""}
    ${Es(e)} ${ke}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${a||i?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Wi(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Ui(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var zi=new Set(["unavailable","not_applicable"]);function er(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Id(e){return e.filter(t=>t!==null).join(" \xB7 ")}function tr(e,t){return t===null?null:`${Qn[e]}: ${t.display} (${Wo[t.source]})`}function Hi(e){return e.filter(t=>t!==null).join(`
`)}function Rs(e){if(typeof e!="object"||e===null)return null;let t=_r(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Hi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Qn.orchestration_model,e.model),n(Qn.orchestration_effort,e.effort),n(Qn.orchestration_speed,e.speed)])}}function hr(e,t){let n=er(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=er(e,"orchestration_effort"),s=er(e,"orchestration_speed"),o=Id([En(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Hi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",tr("orchestration_model",n),tr("orchestration_effort",r),tr("orchestration_speed",s)])}}function Qb(e,t){return e===null||e.value===null||zi.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Jb(e){return e===null||zi.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function eh(e){return e===null?null:e.value==="auto"?"auto":zi.has(e.resolution)?null:e.display}function nr(e,t){if(typeof e!="object"||e===null)return null;let n=er(e,"impl_dispatch"),r=er(e,"impl_runtime"),s=er(e,"impl_model"),o=er(e,"impl_effort"),a=er(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":Id([Qb(r,t??null),Jb(s),eh(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Hi(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",tr("impl_dispatch",n),tr("impl_runtime",r),tr("impl_model",s),tr("impl_effort",o),tr("impl_speed",a)])}}var Yt="",th=["impl_runtime","impl_model","impl_effort"],nh=["claude_account","codex_account"],rh=5,aa=1;function cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ia(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(D=>pe(D,"error",4e3)),o={},a={},i=[],c=!1,u={state:"absent",values:{},warnings:[]},d={},g={},y=Promise.resolve(),h={claude:null,codex:null},A=!1,M=null,W={},Z="",le="",V=!1,B=!1,j=!1,G=null,P=!1;function L(){let D=t.queue?t.queue():null;return cn(D)?D:null}function ne(){let D=L();return D?D.runner_catalog:null}function Ee(){let D=L();return D&&cn(D.execution_defaults)?D.execution_defaults:null}function ke(){let D=t.implPresetStore?.get();return cn(D)&&Array.isArray(D.presets)?D:null}function z(){return r===null?{}:{root_dir:r}}async function te(D,X){return P||!n?null:await n(D,X)}function me(D){D&&cn(D.queue)&&t.onQueueAdopt?.(D.queue)}async function xe(D,X){let de=L();if(!de||P)return null;let E=await te(D,{...X,...z(),expected_revision:de.revision});if(me(E),r!==null&&E&&E.conflict){let Y=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:L()?.revision??de.revision;E=await te(D,{...X,...z(),expected_revision:Y}),me(E)}return E}async function he(){c=!0,De();try{let D=await te("get-session-defaults",{...z()});o=cn(D?.values)?{...D.values}:{},a={...o},i=Array.isArray(D?.warnings)?D.warnings:[]}catch(D){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${D instanceof Error?D.message:String(D)}`)}finally{c=!1,De()}}async function ce(){let D=Ju(o,a);if(Object.keys(D).length!==0){try{let X=await te("set-session-defaults",{values:D,...z()});o=cn(X?.values)?{...X.values}:{},a={...o},i=Array.isArray(X?.warnings)?X.warnings:[]}catch(X){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}De()}}function Ae(D,X){if(!cn(D))return;let de=D.state;u={state:de==="usable"||de==="unusable"||de==="absent"?de:"absent",values:cn(D.values)?{...D.values}:{},warnings:Array.isArray(D.warnings)?D.warnings:[]},g={...u.values},X&&(d={...g})}async function ye(){try{Ae(await te("get-workspace-accounts",{...z()}),!0)}catch(D){u={state:"unusable",values:{},warnings:["kv_read_failed"]},g={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${D instanceof Error?D.message:String(D)}`)}De()}async function K(D){try{let X=await fetch(D);if(!X.ok)return null;let de=await X.json();if(!cn(de)||!Array.isArray(de.accounts))return null;let E=de.accounts.filter(Y=>cn(Y)&&typeof Y.key=="string"&&Y.key.length>0&&typeof Y.email=="string"&&Y.email.length>0);return{accounts:E,active:E.find(Y=>Y.active===!0)||null}}catch{return null}}async function se(){A=!0;let[D,X]=await Promise.all([K("/api/claude-usage"),K("/api/codex-usage")]);P||(h={claude:D,codex:X},De())}function ue(){let D={};for(let X of nh){let de=Object.hasOwn(d,X)?d[X]:null,E=Object.hasOwn(g,X)?g[X]:null;de!==E&&(D[X]=de)}return D}async function $e(){let D=ue();if(Object.keys(D).length!==0){try{Ae(await te("set-workspace-accounts",{values:D,...z()}),!1)}catch(X){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}De()}}function He(D,X){X===Yt?delete d[D]:d[D]=X,De(),y=y.then(()=>$e())}function ge(D,X){if(th.includes(D)){be(D,X);return}X===Yt?delete a[D]:a[D]=X,De(),ce()}function qe(){let D=vt().orchestration_model,X=ln({global:{orchestration_model:D??void 0},execution_defaults:Ee(),runner_catalog:ne()}).orchestration_model.value;return X?En(ne(),X):null}function N(D,X){typeof X=="string"&&X.length>0?a[D]=X:delete a[D]}function be(D,X){let de=X===Yt?void 0:X,E=Xu({impl_runtime:D==="impl_runtime"?de:a.impl_runtime,impl_model:D==="impl_model"?de:a.impl_model,impl_effort:D==="impl_effort"?de:a.impl_effort},ne(),qe());N("impl_runtime",E.impl_runtime),N("impl_model",E.impl_model),N("impl_effort",E.impl_effort),De(),ce()}async function Le(){let D=L();if(!D)return;let X={orchestration_model:D.orchestration_model??null,orchestration_effort:D.orchestration_effort??null,orchestration_speed:D.orchestration_speed??null},de=ed(X,{...X,...W});if(Object.keys(de).length!==0){try{let E=await xe("worker-queue-set-orchestration-defaults",{values:de});if(E&&E.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}W={}}catch(E){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}De()}}function Ue(D,X){W[D]=X===Yt?null:X,De(),Le()}function ze(D){if(M=D,!D){De();return}let X=ne(),de=vt(),E=de.orchestration_model;E&&!xs(X,D).includes(E)&&(W.orchestration_model=null,E=null);let Y=de.orchestration_effort;Y&&!Oi(X,D,E||mn).includes(Y)&&(W.orchestration_effort=null),De(),Le()}async function We(D){if(!(!L()||D<aa)){try{await xe("worker-queue-set-slots",{slots:D})}catch(X){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}De()}}async function Ge(D){if(!(!L()||D<aa||D>rh)){try{await xe("worker-queue-set-serial-lane-count",{count:D})}catch(X){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}De()}}async function et(D,X){let de=D==="auto_advance"?"worker-automation-toggle":D==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await xe(de,{on:X})}catch(E){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}De()}function it(){let D={},X=vt();for(let de of Fo){let E=zn.includes(de)?X[de]:a[de];typeof E=="string"&&E.length>0&&(D[de]=E)}return D}async function ft(){let D=ke();if(!D)return;let X=it();if(Object.keys(X).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let de=(D.presets||[]).find(Y=>Y.id===Z),E=le.trim()||(de?de.name:"");if(!E){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Y=de?await te("impl-preset-update",{expected_revision:D.revision,id:de.id,name:E,settings:X}):await te("impl-preset-create",{expected_revision:D.revision,name:E,settings:X});if(Y&&Y.applied){if(le="",!de&&Array.isArray(Y.presets)){let fe=Y.presets.find(x=>x.name===E);Z=fe?fe.id:Z}De()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),De()}catch(Y){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Y instanceof Error?Y.message:String(Y)}`)}}async function $t(){let D=ke();if(!(!D||Z.length===0))try{let X=await te("impl-preset-delete",{expected_revision:D.revision,id:Z});X&&X.applied?(Z="",De()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),De())}catch(X){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}}function _t(D){o=cn(D.values)?{...D.values}:{},a={...o},i=Array.isArray(D.warnings)?D.warnings:[],cn(D.queue)&&(t.onQueueAdopt?.(D.queue),W={})}async function Q(){let D=ke(),X=L();if(!D||!X||Z.length===0)return;let de=E=>({preset_id:Z,expected_revision:D.revision,expected_queue_revision:E,...z()});try{let E=await te("apply-impl-preset-global",de(X.revision));if(E&&E.applied&&_t(E),r!==null&&E&&E.queue_applied===!1){let Y=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:L()?.revision??X.revision;E=await te("apply-impl-preset-global",de(Y)),E&&E.applied&&_t(E)}E&&E.applied?E.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):E&&E.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(E){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}De()}async function ee(){B=!0,j=!1,De();try{let D=await te("get-worker-system-prompt",{});!D||typeof D!="object"||Array.isArray(D)?j=!0:G=D}catch{j=!0}finally{B=!1,De()}}function Oe(){if(V=!V,V&&!G){ee();return}De()}function Ne(){let D=jr({loading:B,error:j});if(D)return D;if(!G)return"";let X=Array.isArray(G.variants)?G.variants:[];return l`<div class="settings-dialog__sp-body">
      ${G.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${G.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${X.map(de=>l`<div class="settings-dialog__sp-variant" data-variant=${de.key}>
            <div class="settings-dialog__sp-cond">${de.condition}</div>
            ${Wn(de.label,de.system_prompt)}
          </div>`)}
    </div>`}function Te(){return l`<section
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
        aria-expanded=${V?"true":"false"}
        @click=${Oe}
      >
        ${V?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${V?Ne():""}
    </section>`}function Pe(D,X,de,E,Y,fe,x){let b=Y[D]??Yt,$=Li(D,de,Y,Ee(),ne(),x),U=$.options.find(ae=>ae.value===b),oe=b===Yt?$.full_value:U?.full_value;return l`<select
        class=${b===Yt?"settings-dialog__unset":""}
        data-key=${D}
        aria-label=${X}
        title=${oe||""}
        ?disabled=${fe===!0||$.disabled}
        .value=${br(String(b))}
        @change=${ae=>E(D,String(ae.target.value))}
      >
        <option value=${Yt} ?selected=${b===Yt}>
          ${$.unset_label}
        </option>
        ${$.options.map(ae=>l`<option
              value=${ae.value}
              title=${ae.full_value||""}
              ?selected=${ae.value===b}
            >
              ${ae.label}
            </option>`)}
      </select>
      ${b===Yt?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function je(D,X,de,E,Y,fe=!1,x){return l`<div
      class=${`settings-dialog__row${fe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        ${Pe(D,X,de,E,Y,fe,x)}
      </span>
    </div>`}function ot(D,X){let de=X?X.active:null;return cn(de)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${D==="claude"?de.email:zr({...de,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function nt(D,X,de){let E=h[de],Y=Object.hasOwn(d,D)?d[D]:Yt,fe=de==="claude"?Go:zr,x=!!E?.accounts.some(b=>b.key===Y);return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${X}
          data-account-key=${D}
          @change=${b=>He(D,String(b.target.value))}
        >
          <option value=${Yt} ?selected=${Y.length===0}>
            ${ot(de,E)}
          </option>
          ${Y.length>0&&!x?l`<option value=${Y} selected>
                ${Y} (목록에 없음)
              </option>`:""}
          ${E?.accounts.map(b=>l`<option value=${b.key} ?selected=${b.key===Y}>
                ${fe(b)}
              </option>`)||""}
        </select>
        ${E?"":l`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function tt(){let D=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${D} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${D}`:null}function yt(D,X,de,E,Y){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${X}-on)`}
        ></i>
        ${D}
      </span>
      <span class="settings-dialog__controls">
        ${Pe(de,`${D} \uBAA8\uB378`,E,ge,a,!1)}
        ${Pe(Y,`${D} effort`,Uo,ge,a,!1)}
      </span>
    </div>`}function It(D,X,de,E){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${E?" is-on":""}`}
          data-automation=${D}
          aria-pressed=${E?"true":"false"}
          aria-label=${X}
          @click=${()=>et(D,!E)}
        >
          ${E?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${de}</span>
      </span>
    </div>`}function mt(D,X,de,E){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${X}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${D}>
          <button
            type="button"
            aria-label=${`${X} \uAC10\uC18C`}
            @click=${()=>E(de-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${de}</span>
          <button
            type="button"
            aria-label=${`${X} \uC99D\uAC00`}
            @click=${()=>E(de+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Mt(D){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${D.rows.length>0?`\uBCC0\uACBD ${D.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${D.rows.map(X=>l`<div
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
      ${D.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${D.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function vt(){let D=L(),X={};for(let de of zn)X[de]=Object.prototype.hasOwnProperty.call(W,de)?W[de]:D&&typeof D[de]=="string"?D[de]:null;return X}function Ve(){let D=ne(),X=a.impl_runtime,de=a.impl_model,E=ke(),Y=L(),fe=vt(),x=xs(D,M),b=Ur(D,void 0).filter(Ce=>Ce!==mn),$=Oi(D,M,fe.orchestration_model||mn).filter(Ce=>Ce!==mn),U=Z?(E?.presets||[]).find(Ce=>Ce.id===Z):null,oe=U?Qu(it(),cn(U.settings)?U.settings:{}):null,ae=Y&&typeof Y.slots=="number"?Y.slots:aa+1,we=Y&&typeof Y.serial_lane_count=="number"?Y.serial_lane_count:aa,Re=Ee()?.supported===!0,Je=tt(),ct=Li("workflow_mode",ks,a,Ee(),D);return l`
      ${i.length>0?l`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${Je?l`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Je}
          </div>`:""}
      ${Re?"":l`<div
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
                .value=${br(Z)}
                @change=${Ce=>{Z=String(Ce.target.value),De()}}
              >
                <option value="" ?selected=${Z===""}>
                  실행 프리셋…
                </option>
                ${(E?.presets||[]).map(Ce=>l`<option
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
                ?disabled=${!oe||oe.rows.length===0}
                @click=${Q}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Z?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${br(le)}
                @input=${Ce=>{le=String(Ce.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${Z?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${ft}
              >
                ${Z?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${Z.length===0}
                @click=${$t}
              >
                삭제
              </button>
            </div>
            ${oe?Mt(oe):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${br(M||Yt)}
                    @change=${Ce=>{let pt=String(Ce.target.value);ze(pt===Yt?null:pt)}}
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
              ${je("orchestration_model","\uBAA8\uB378",x,Ue,fe)}
              ${je("orchestration_effort","effort",$,Ue,fe)}
              ${je("orchestration_speed","\uC18D\uB3C4",ws,Ue,fe)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${nt("claude_account","Claude","claude")}
              ${nt("codex_account","Codex","codex")}
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
                      ${ct.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${ks.map(Ce=>l`<button
                          type="button"
                          data-mode=${Ce}
                          aria-pressed=${String(a.workflow_mode===Ce)}
                          @click=${()=>ge("workflow_mode",Ce)}
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
              ${yt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",$s,"spec_review_effort")}
              ${yt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Bo,"plan_review_effort")}
              ${yt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",$s,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${je("impl_runtime","\uC704\uC784 \uB300\uC0C1",jo,ge,a)}
              ${je("impl_model","\uBAA8\uB378",Ur(D,X),ge,a)}
              ${je("impl_effort","effort",Wr(D,X,de),ge,a)}
              ${je("impl_speed","\uC18D\uB3C4",ws,ge,a)}
              ${je("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",b,ge,a,!1,{...a,...fe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${It("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",Y?.auto_advance===!0)}
              ${It("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",Y?.auto_merge===!0)}
              ${It("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",Y?.auto_repair===!0)}
              ${mt("slots","\uB3D9\uC2DC \uC2E4\uD589",ae,Ce=>We(Ce))}
              ${mt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",we,Ce=>Ge(Ce))}
            </div>
            ${Te()}
          `}
    `}function De(){P||Qe(Ve(),e)}return{load(){W={};let D=[he(),ye()];return A||D.push(se()),Promise.all(D).then(()=>{})},render:De,sessionDraft:()=>({...a}),destroy(){P=!0,Qe(l``,e)}}}function la(e){return l`<svg
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
  </svg>`}function Pd(){return la(rs`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Dd(){return la(rs`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Md(){return la(rs`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Nd(){return la(rs`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function qd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Fd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Vt($o(t));let n={};for(let i of In)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let d of In){let g=c[d];typeof g=="number"&&Number.isFinite(g)&&(n[d]+=g,r=!0,u=!0)}if(u){o+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Fn(n):null}function Cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Gi(e,t){let n=Cn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function sh(e,t){if(!Cn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function oh(e){if(!Cn(e)||!Cn(e.execution_defaults)||!Cn(e.runner_catalog)||!Cn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=ln({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=En(e.runner_catalog,n.orchestration_model.value??""),s=hr(n,e.runner_catalog),o=nr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function jd(e,t){let n=t.notify||(K=>pe(K,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let u=null,d=null,g=null,y=new Map;function h(){let K=t.workspacesState?t.workspacesState():[];return Array.isArray(K)?K.filter(se=>Cn(se)):[]}function A(K){return h().find(se=>se.root_dir===K)||null}function M(K){return sh(A(K),y.get(K))}function W(){for(let K of h()){let se=y.get(K.root_dir);se&&typeof se.revision=="number"&&typeof K.revision=="number"&&K.revision>=se.revision&&y.delete(K.root_dir)}}async function Z(K,se,ue){let $e=t.transport,He=M(se);if(!(!$e||!Cn(He))){try{let ge=await $e(K,{...ue,root_dir:se,expected_revision:He.revision});if(Cn(ge?.queue)&&y.set(se,ge.queue),ge&&ge.conflict){let qe=Cn(ge.queue)&&typeof ge.queue.revision=="number"?ge.queue.revision:M(se)?.revision;ge=await $e(K,{...ue,root_dir:se,expected_revision:qe}),Cn(ge?.queue)&&y.set(se,ge.queue)}}catch(ge){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ge instanceof Error?ge.message:String(ge)}`)}ce()}}function le(K){u!==K&&(u=K,t.onFocusChange?.(u),ce())}function V(K){le(u===K?null:K)}function B(K){if(d===K){G();return}j(),d=K;let se=A(K);a.textContent=`${se?.name||K} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,g=ia(c,{root_dir:K,queue:()=>M(K),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ue=>{y.set(K,ue),ce()}}),g.load(),ce()}function j(){g?.destroy(),g=null}function G(K){j(),d=null,s.hidden=!0,a.textContent="",K!==!0&&ce()}let P=()=>G();i.addEventListener("click",P);function L(K){K.key==="Escape"&&u!==null&&le(null)}document.addEventListener("keydown",L);function ne(K,se){let ue=Math.max(se,K,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${se}\uAC1C \uC911 ${K}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ue},($e,He)=>He<K?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function Ee(K){let se=K.auto_advance===!0,ue=K.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${se?" is-on":""}`}
        data-act="auto"
        aria-pressed=${se?"true":"false"}
        aria-label=${`${K.name} \uC790\uB3D9\uD654`}
        title=${se?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${se?Dd():Pd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ue?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ue?"true":"false"}
        aria-label=${`${K.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ue?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Md()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===K.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===K.root_dir?"true":"false"}
        aria-label=${`${K.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Nd()}
      </button>`}function ke(K){let se=oh(K);return se?l`<div class="mon2-deck__chips">
      ${se.orchestration?l`<span class="mon2-deck__chip" title=${se.orchestration.title}
            >오케 ${se.orchestration.text}</span
          >`:""}
      ${se.worker?l`<span class="mon2-deck__chip" title=${se.worker.title}
            >워커 ${se.worker.text}</span
          >`:""}
    </div>`:""}function z(K){let se=[];for(let[ue,$e]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let He=Gi(K,ue);He>0&&se.push(`${$e} ${He}`)}return se.join(" \xB7 ")}function te(K){let se=Gi(K,"running"),ue=typeof K.slots=="number"?K.slots:1;return l`<div
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
          title=${`\uC2AC\uB86F ${ue}\uAC1C \uC911 ${se}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${se}/${ue}</span>
          ${ne(se,ue)}
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
        <div class="mon2-deck__ops">${Ee(K)}</div>
        <span class="mon2-deck__counts">${z(K)}</span>
        ${ke(K)}
      </div>
    </div>`}function me(K){let se=t.doneItems?t.doneItems():[],ue=t.rangeLabel?t.rangeLabel():"",$e=Fd(Array.isArray(se)?se:[]),He=ge=>K.reduce((qe,N)=>qe+Gi(N,ge),0);return l`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${K.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ue}`}
        >실행 ${He("running")} · 대기 ${He("queue")} · PR
        ${He("pr_wait")}${He("session_active")>0?` \xB7 \uC138\uC158 ${He("session_active")}`:""}
        · ${ue} 완료
        ${Array.isArray(se)?se.length:0}</span
      >
      ${$e===null?"":l`<span class="mon2-deck__total-tokens">
            ${typeof $e=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${qd(ue)}
                  >${$e}</span
                >`:$e.map(ge=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${ge.provider}
                      title=${ge.tooltip}
                      >${ge.label}</span
                    >`)}
          </span>`}
    </div>`}function xe(){let K=h();return K.length===0?"":l`${me(K)}
      <div class="mon2-deck__strip">
        ${K.map(se=>te(se))}
      </div>`}function he(){u!==null&&!A(u)&&(u=null,t.onFocusChange?.(null))}function ce(){W(),he(),d!==null&&!A(d)&&G(!0),Qe(xe(),r),g?.render()}function Ae(K){let se=K.target;if(!se||typeof se.closest!="function")return;let ue=se.closest("[data-root-dir]");if(!ue)return;let $e=ue.getAttribute("data-root-dir")||"",He=se.closest("[data-act]")?.getAttribute("data-act");if(He==="worker"){t.gotoWorkerTab?.($e);return}if(He==="auto"){Z("worker-automation-toggle",$e,{on:M($e)?.auto_advance!==!0});return}if(He==="merge"){Z("worker-merge-auto-toggle",$e,{on:M($e)?.auto_merge!==!0});return}if(He==="gear"){B($e);return}V($e)}function ye(K){if(K.key!=="Enter"&&K.key!==" ")return;let se=K.target;if(!se||typeof se.closest!="function")return;let ue=se.closest('[data-root-dir][role="button"]');!ue||ue!==se||(K.preventDefault(),V(ue.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Ae),r.addEventListener("keydown",ye),{render:ce,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",L),r.removeEventListener("click",Ae),r.removeEventListener("keydown",ye),i.removeEventListener("click",P),j(),Qe(l``,r),e.replaceChildren()}}}var ah="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ih="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",lh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Os="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Ki(e,t){return`${e}\0${t}`}function ch(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function uh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Vi(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function dh(e,t){let n=new Set;for(let[a,i]of t)for(let c of i)n.add(Ki(a,c));let r=new Map,s=new Map;for(let a of e){let i=Ki(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Ki(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function ph(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function fh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ca(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Bd(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function ua(e){let t=uh(e.blocked_by_map),n=[],r={refusal:null},s=i=>{let c=e.owner_of.get(i);return typeof c!="string"||c.length===0?(r.refusal=ch(i),null):c};return{graph:t,dep_ops:n,state:r,ownerOf:s,addDep:(i,c)=>{if(r.refusal!==null||i===c)return;let u=t.get(i)||[];if(u.includes(c))return;let d=s(i);if(d!==null){if(Vi(t,c,i)){r.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${i}\uAC00 \uC774\uBBF8 ${c}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(i,[...u,c]),n.push({type:"dep-add",a:i,b:c,root_dir:d})}},removeDep:(i,c)=>{if(r.refusal!==null||i===c)return;let u=t.get(i)||[];if(!u.includes(c))return;let d=s(i);d!==null&&(t.set(i,u.filter(g=>g!==c)),n.push({type:"dep-remove",a:i,b:c,root_dir:d}))}}}function da(e,t,n,r){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=dh(e.dep_ops,t.blocked_by_map),o=s.filter(i=>i.type==="dep-remove"),a=s.filter(i=>i.type==="dep-add");return{lane_ops:n,ops:[...o,...a,...r],lane_op_index:o.length}}function Ud(e,t){for(let n=1;n<t.length;n+=1)e.addDep(t[n].bead_id,t[n-1].bead_id)}function Wd(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(ca(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function _h(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Yi(e,t,n){let r=ua(n),s=[],o=[],a=n.owner_lane_of.get(e.bead_id),i=e.kind==="chain"?e.lane_id??a:void 0,c=i===void 0?void 0:n.cross_lanes.get(i);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:ah};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:ih};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Bd(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Os}}if(e.kind==="chain"&&c===void 0)return{refused:Os};let u=()=>{if(c===void 0||c.status!=="confirmed")return;let y=c.entries.map(W=>W.bead_id),h=new Set(y),A=(r.graph.get(e.bead_id)||[]).filter(W=>h.has(W)),M=y.filter(W=>(r.graph.get(W)||[]).includes(e.bead_id));for(let W of A)r.removeDep(e.bead_id,W);for(let W of M)r.removeDep(W,e.bead_id);for(let W of A)for(let Z of M)r.addDep(Z,W)},d=(y,h)=>{let A=n.cross_lanes.get(y),M=A.entries.findIndex(P=>P.bead_id===e.bead_id),W=A.entries.filter(P=>P.bead_id!==e.bead_id),Z=Math.max(0,Math.min(W.length,M>=0&&h>M?h-1:h)),le=-1;if(W.forEach((P,L)=>{n.fixed_members.has(P.bead_id)&&(le=L)}),Z<=le){r.state.refusal=lh;return}let V=M>=0?A.entries[M]:c?.entries.find(P=>P.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir},B=[...W.slice(0,Z),V,...W.slice(Z)];if(_h(B,A.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:y,entries:B}}),A.status!=="confirmed")return;let j=Z>0?W[Z-1].bead_id:null,G=Z<W.length?W[Z].bead_id:null;if(j===null){G!==null&&r.addDep(G,e.bead_id);return}r.addDep(e.bead_id,j),G!==null&&(r.graph.get(G)||[]).includes(j)&&(r.removeDep(G,j),r.addDep(G,e.bead_id))},g=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(u(),c!==void 0&&(t.kind!=="chain"||t.lane_id!==i)&&s.push({type:"monitor-lane-update",payload:{lane_id:i,entries:c.entries.filter(y=>y.bead_id!==e.bead_id)}})),t.kind==="chain"&&d(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let y=ph(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(ca(e.bead_id,e.root_dir,y));else if(e.kind==="parallel"){let h=n.parallel_rows,A=h[Math.max(0,Math.min(h.length,t.marker_index))];if(!(!!A&&A.bead_id===e.bead_id)&&fh(n,e.root_dir)&&g!==void 0){let W=g>y?y:y-1;W>=0&&W!==g&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:W},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let y=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&y.status==="confirmed"&&o.push(ca(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(g!==void 0&&t.index!==g){let y=g>t.index?t.index:t.index-1;y>=0&&y!==g&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:y},root_dir:e.root_dir})}}else o.push(ca(e.bead_id,e.root_dir,t.index,t.lane_id));return da(r,n,s,o)}function zd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Os};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=ua(t),s=[];return Ud(r,n.entries),r.state.refusal===null&&Wd(r,t,n.entries,s),da(r,t,[{type:"monitor-lane-confirm",payload:{lane_id:e}}],s)}function Hd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Os};let r=ua(t),s=[];return Ud(r,n.entries),r.state.refusal===null&&Wd(r,t,n.entries,s),da(r,t,[],s)}function Gd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Os};let r=ua(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return da(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[])}function Zi(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Bd(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var mh="\uC0AC\uC774\uD074";function Kd(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=Vi(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:mh}:{}})}return o.sort((a,i)=>{let c=r!==void 0&&a.root_dir===r,u=r!==void 0&&i.root_dir===r;return c!==u?c?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function Vd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var Yd={running:3,paused:2,failed:1};function Gr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Zd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Xd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Gr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Gr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),g=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!g&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=Yd[u.run_state],g=Yd[i];if(d>g||d===g&&(u.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:r}}function pa(e){return e.replace(/\/+$/,"")}function gh(e,t){let n=pa(e),r=pa(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function fa(e,t){let n=new Set;for(let r of e)for(let s of t){if(!gh(r,s))continue;let o=pa(r),a=pa(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var Qd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ls=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function _a(e,t){let n=Qd.find(s=>s.step===e);if(!n)return null;let r=Qd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Jd(e){let t=Ls.findIndex(n=>n.step===e);return Ls.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function yr(e){let t=Ls.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function bh(e){let t=Ls.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ls.length}}function ma(e){let t=bh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Qi=new Set(["queued","running","retry_pending","repairing"]),ep=new Set(["failed","succeeded"]),hh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Is={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},yh={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Is.base_containment,child_sweep:Is.child_sweep,branch_cleanup:Is.branch_cleanup,parent_close:Is.parent_close};function vh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function wh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Qi,...ep].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function kh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function Xi(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=hh[s];if(!o)return null;let a=_a(n,`${r} ${o}`);return a?{...a,active:Qi.has(s),failed:s==="failed"}:null}function $h(e){return!e||typeof e!="object"?null:yh[e.step]||null}function Ps(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=$h(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=vh(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&wh(A,t,i)).sort(kh):[],u=a?c:[],d=u.find(A=>Qi.has(A.state));if(d)return Xi(d);if(s)return s.step==="repo_operations"&&c[0]?Xi(c[0],!0):null;let g=u.find(A=>ep.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(g)return Xi(g);if(r){let A=_a(r.step,r.label);return A?{...A,active:!0,failed:!1}:null}let y=typeof e.cleanup_cursor=="string"?Is[e.cleanup_cursor]:null;if(!y)return null;let h=_a(y.step,y.label);return h?{...h,active:!0,failed:!1}:null}function ga(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var xh="\uBBF8\uC801\uC7AC";function Ji(e,t){let n=fo(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function tp(e,t){let n=new Map,r=new Map;for(let s of t)r.has(s.id)||r.set(s.id,s.location_label);for(let[s,o]of e){if(typeof s!="string"||s.length===0)continue;let a=[];for(let i of Array.isArray(o)?o:[])typeof i!="string"||i.length===0||a.push(Ji(s,{id:i,location_label:r.get(i)||xh}));a.length>0&&n.set(s,a)}return n}function el(e,t){return`${e}\0${t}`}function np(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function tl(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function ba(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function rp(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${ba(s)})`,location_label:ba(s),scope:null,same_lane_ahead:!1};let a=tl(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1}}function sp(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=el(i.root_dir,c.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(u,[]);for(let d of Array.isArray(c.items)?c.items:[])r.set(d.id,u)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=el(i.root_dir,c.id),d=Array.isArray(c.items)?c.items[0]:null,y=!!d&&d.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],h=s.get(u);if(h)for(let A of y){let M=r.get(A);M&&M!==u&&!h.includes(M)&&h.push(M)}}let o=(i,c)=>{let u=new Set,d=[i];for(;d.length>0;){let g=d.pop();if(g===c)return!0;!g||u.has(g)||(u.add(g),d.push(...s.get(g)||[]))}return!1},a=new Map;for(let[i,c]of s){let u=[];for(let d of c){let g=n.get(d);o(d,i)&&g&&u.push(g)}u.length>0&&a.set(i,u)}return a}function op(e,t){return el(e,t)}var ap=1,Ds=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],rl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Kr={show_blocked:!0,spec:"all"},ip={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Ah(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Gr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Sh(e,t){let{winners:n,resumed_from_ids:r}=Xd(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,c=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:hn(e,i.bead_id),can_pause:c==="running"&&d,can_resume:c!=="running"&&d&&!r.has(i.attempt_id)})}return s}function lp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Rt(e){return e&&typeof e=="object"?e:{}}function Eh(e,t,n){let r=Rt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=y=>ln({pin:y,global:a,execution_defaults:s,runner_catalog:o,route:n}),c,u;try{c=i(r),u=i(null)}catch{return null}let d=cp(hr(c,o),hr(u,o)),g=cp(nr(c,null),nr(u,null));return d||g?{orchestration:d,worker:g}:null}function cp(e,t){return!e||t&&t.text===e.text?null:e}function Th(e,t){let n=tl(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function up(e,t,n){let r=t.get(e);if(!r)return Th(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return ba(r)}function Ch(e,t,n,r,s,o){let a=[];return e.forEach((i,c)=>{let u=typeof i.id=="string"?i.id:"";if(u.length===0)return;let d=i.status==="confirmed"?"confirmed":"draft",g=Array.isArray(i.entries)?i.entries:[],y=[];g.forEach((h,A)=>{let M=h&&typeof h.bead_id=="string"?h.bead_id:"";if(M.length===0)return;let W=h&&typeof h.root_dir=="string"?h.root_dir:"",Z=n.get(M),le=Z?Z.state:void 0,V=le==="running"||le==="pr_wait"||le==="done",B=!Z||le==="runnable",j=Z&&Z.lane==="parallel"&&typeof Z.position=="number"?Z.position-1:null,G=y.length>0?y[y.length-1].id:null,P=d==="confirmed"&&G!==null&&!(t.get(M)||[]).includes(G);y.push({id:M,title:s.get(M)||M,root_dir:Z?Z.root_dir:W,workspace_name:Z?Z.workspace_name:o.get(W)||"",seq:A+1,location_label:up(M,n,r),draggable:!V,fixed:V,done:le==="done",unplaced:B,mismatch:P,...j!==null?{queue_index:j}:{}})}),y.forEach((h,A)=>{h.seq=A+1}),a.push({lane_id:u,status:d,draft:d==="draft",number:c+1,label:`\uC5F0\uACB0 ${c+1} \xB7 \uB808\uD3EC \uAC04`,rows:y,all_done:y.length>0&&y.every(h=>h.done),can_confirm:d==="draft"&&y.length>=2,has_mismatch:d==="confirmed"&&y.some(h=>h.mismatch||h.unplaced)})}),a}function Rh(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Oh(e,t,n,r,s){let o=new Map;for(let c of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(c.root_dir))continue;let u=`${c.root_dir}\0${c.id}`,d=o.get(u);if(d){d.cards.push(c);continue}let{scope:g,state:y}=Rh(c,t,n);y!==void 0&&(c.scope_state=y),o.set(u,{cards:[c],scope:g})}let a=new Map;for(let c of o.values()){let u=c.cards[0].scope_state;if(u!==void 0)for(let y of c.cards)y.scope_state=u;if(c.scope.length===0)continue;let d=c.cards[0].root_dir,g=a.get(d);g?g.push(c):a.set(d,[c])}let i=(c,u,d)=>{let g=u.cards[0],y={id:g.id,title:g.title,location_label:up(g.id,r,s),prefixes:d};for(let h of c.cards)h.overlap_chips?h.overlap_chips.push(y):h.overlap_chips=[y]};for(let c of a.values())for(let u=0;u<c.length;u+=1)for(let d=u+1;d<c.length;d+=1){let g=fa(c[u].scope,c[d].scope);g.length!==0&&(i(c[u],c[d],g),i(c[d],c[u],g))}}function nl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ha(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function sl(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...Kr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,c=n&&Ds.some(N=>N.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let N of s)N&&typeof N.root_dir=="string"&&u.set(N.root_dir,N);let d=new Map;for(let N of s)N&&typeof N.root_dir=="string"&&d.set(N.root_dir,N.name||N.root_dir);for(let N of r)N&&typeof N.root_dir=="string"&&d.set(N.root_dir,N.name||N.root_dir);let g=[],y=[],h=[],A=[],M=[],W=[],Z=new Map,le=new Map,V=new Map,B=new Map,j=new Map,G=new Map,P=new Map,L=new Map;for(let N of r){if(!N||typeof N.root_dir!="string")continue;let be=N.root_dir,Le=N.name||be,Ue=u.get(be),ze=Ue&&typeof Ue.revision=="number"?Ue.revision:typeof N.revision=="number"?N.revision:0,We=Rt(N.attempts),Ge=Rt(N.bead_titles);for(let[b,$]of Object.entries(Ge))typeof $=="string"&&$.length>0&&L.set(b,$);let et=Rt(N.bead_times),it=Rt(N.pr_observations),ft=Rt(N.admission),$t=Rt(N.revise_parked),_t=Rt(N.merge_queue_state),Q=Rt(N.cleanup_failed),ee=Rt(N.discard_operations),Oe=Rt(N.bead_blocked_by);Object.hasOwn(N,"bead_scope")&&G.set(be,Rt(N.bead_scope));let Ne=Rt(N.bead_workflow),Te=Rt(N.pr_activity),Pe=Array.isArray(N.repo_operations)?N.repo_operations:[],je=Array.isArray(N.merge_queue)?N.merge_queue:[],ot=new Set(je.filter(b=>b&&typeof b.bead_id=="string").map(b=>b.bead_id)),nt=new Map(je.filter(b=>b&&typeof b.bead_id=="string").map(b=>[b.bead_id,b])),tt=Array.isArray(N.queue)?N.queue:[],yt=(Array.isArray(N.serial_lanes)?N.serial_lanes:[]).filter(b=>b&&/^s[1-5]$/.test(b.id)&&Array.isArray(b.entries)),It=Rt(N.lane_states),mt=typeof N.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(N.serial_lane_count))):Math.min(5,yt.length);V.set(be,mt),B.set(be,tt.length);let Mt=new Map(yt.map(b=>[b.id,b])),vt=new Map;for(let b of yt)for(let $ of b.entries)$&&typeof $.bead_id=="string"&&vt.set($.bead_id,b.id);for(let[b,$]of Object.entries(Oe))Array.isArray($)&&j.set(b,$.filter(U=>typeof U=="string"&&U.length>0));let Ve=Array.isArray(N.done)?N.done:[];for(let b of Ve)b&&typeof b.bead_id=="string"&&W.push({id:b.bead_id,root_dir:be,workspace_name:Le});let De=new Map;for(let b of Ve)b&&typeof b.bead_id=="string"&&typeof b.added_at=="number"&&De.set(b.bead_id,b.added_at);let D=b=>({id:b,title:Ge[b]||b,root_dir:be,workspace_name:Le,expected_revision:ze,draggable:!1,...Rt(et[b]).created_at?{created_at:Rt(et[b]).created_at}:{},...Rt(et[b]).updated_at?{updated_at:Rt(et[b]).updated_at}:{}}),X=b=>Object.hasOwn(Oe,b)?{blocked_by:Array.isArray(Oe[b])?Oe[b].filter($=>typeof $=="string"&&$.length>0):[]}:{},de=new Set;for(let[b,$]of Sh(We,De))de.add(b),y.push({...D(b),lane:"running",...X(b),...vt.has(b)?{serial_lane_id:vt.get(b)}:{},attempt_id:$.attempt_id,run_state:$.run_state,status:$.status||void 0,workflow:Ne[b]||null,can_pause:$.can_pause,can_resume:$.can_resume,started_at:$.started_at,last_event_at:$.last_event_at,last_activity:$.last_activity,legs:$.legs,runner:$.runner,model:$.model,effort:$.effort,speed:$.speed,resumed_from:$.resumed_from,continuation_mode:$.continuation_mode,usage:$.usage,exec_chips:{orchestration:Rs($),worker:null},discard:Tn(ee,b,{attempt_id:$.attempt_id}),badges:$.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:$.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:$.run_state==="failed"});for(let[b,$]of Zd(We)){if(y.some(ae=>ae.id===b))continue;let U=$.attempt,oe=$.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";y.push({...D(b),lane:"running",kind:"session",...X(b),attempt_id:typeof U.attempt_id=="string"?U.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:Ne[b]||null,can_pause:!1,can_resume:!1,started_at:$.started_at,last_event_at:typeof U.last_event_at=="number"?U.last_event_at:null,last_activity:U.last_activity&&typeof U.last_activity=="object"?U.last_activity:null,legs:Array.isArray(U.legs)?U.legs:[],runner:typeof U.runner=="string"?U.runner:null,model:typeof U.model=="string"?U.model:null,effort:typeof U.effort=="string"?U.effort:null,speed:typeof U.speed=="string"?U.speed:null,resumed_from:null,continuation_mode:null,usage:U.usage&&typeof U.usage=="object"?U.usage:null,exec_chips:{orchestration:Rs(U),worker:null},discard:Tn(ee,b,{merge_queued:!0}),badges:[$.origin==="auto"?`${oe} \xB7 \uC790\uB3D9`:oe],alert:!1})}for(let b of Array.isArray(N.session_active)?N.session_active:[]){let $=b&&b.bead_id;typeof $!="string"||de.has($)||(de.add($),Array.isArray(b.blocked_by)&&b.blocked_by.length>0&&j.set($,b.blocked_by.filter(U=>typeof U=="string"&&U.length>0)),typeof b.title=="string"&&b.title.length>0&&L.set($,b.title),y.push({...D($),title:b.title||Ge[$]||$,lane:"running",kind:"session",status:"in_progress",started_at:nl(b.started_at)??nl(b.updated_at)??void 0,updated_at:nl(b.updated_at)??void 0,workflow:b.workflow||null,labels:Array.isArray(b.labels)?b.labels:[],spec_id:typeof b.spec_id=="string"?b.spec_id:"",blocked:b.blocked===!0,...Array.isArray(b.blocked_by)?{blocked_by:b.blocked_by.filter(U=>typeof U=="string"&&U.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(b.session_refs)?b.session_refs:[],badges:[],alert:!1}))}for(let b of Array.isArray(N.pr_wait)?N.pr_wait:[]){let $=b&&b.bead_id;if(typeof $!="string"||de.has($))continue;de.add($);let U=Rt(it[$]),oe=Rt(U.pr),ae=U.gate?Rt(U.gate):null,we=ot.has($),Re=nt.get($)?.continuation_action||null,Je=!!Re&&Re.continuation===null,ct=_t.active===$,Ce=b.external===!0,pt=Q[$]||null,Nt=Rt(Te[$]),St=Ps({bead_id:$,merge_sha:b.merge_sha,cleanup_cursor:b.cleanup_cursor,merge_progress:Nt.merge_progress||null,cleanup_failed:pt,repo_operations:Pe}),un=ga(St),Ht=!!ae&&ae.base_badge==="\uCDA9\uB3CC",Ut=!!pt&&["child_sweep","branch_cleanup","parent_close"].includes(pt.step)&&!!ae&&ae.tier==="merged",Zt=Ce&&!!pt&&!!ae&&ae.tier==="merged",zt=!!ae&&["closed_unmerged","review","undecidable"].includes(ae.tier)&&ae.reason!=="review_receipt_undetermined",gt=Tn(ee,$,{external:Ce,merge_active:ct||St?.step==="merge",merge_queued:we,cleanup_active:un,merged:!!pt||ae?.tier==="merged"}),Ke=!!gt.operation;h.push({...D($),lane:"pr_wait",...X($),workflow:Ne[$]||null,pr_number:typeof oe.number=="number"?oe.number:null,pr_url:typeof oe.url=="string"?oe.url:void 0,external:Ce,usage:hn(We,$),merge_step:St,badges:Je?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:St?[ae?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:pt?[yr(pt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${yr(pt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ae?.gate_badge=="string"&&ae.gate_badge.length>0?[ae.gate_badge]:[],alert:St?St.failed===!0:!!pt||zt,reason:pt&&St?.active!==!0?ma(pt.step):"PR \uB300\uAE30",merge_action:ae?.tier==="merged"&&!Ut&&!Zt?!1:!we||Je,merge_enabled:!Ke&&(Je||ae?.enabled===!0||Ht||Ut||Zt),merge_label:Je?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Zt||Ut?"\uC815\uB9AC \uC7AC\uAC1C":Ht&&!Ut?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Je?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ke?gt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${gt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${gt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Zt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ut?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ht?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ae?.enabled===!0?`\uBA38\uC9C0 (${ae.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ae?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:we&&!Je,cancel_enabled:!ct,continuation_mismatch:Re?.mismatch||null,discard:gt,discard_action:gt.action,discard_enabled:gt.enabled,discard_title:gt.title})}let E=(b,$,U,oe)=>{let ae=b&&b.bead_id;if(typeof ae!="string"||de.has(ae))return null;de.add(ae);let we=$t[ae],Re=Tn(ee,ae),Je=Re.operation?Re:null,ct={...D(ae),lane:$,workflow:Ne[ae]||null,draggable:!Je,discard:Je||void 0,reason:lp(ft,ae),seq:U+1,queue_position:U+1,queue_index:U,queue_length:oe,badges:we?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!we,revise_action:!!we,revise_enabled:!!we&&!Je,revise_title:we?we.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${we.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Ce=X(ae);return Object.hasOwn(Ce,"blocked_by")&&(ct.blocked_by=Ce.blocked_by),ct};for(let b=0;b<tt.length;b++){let $=E(tt[b],"queue",b,tt.length);if(!$)continue;A.push($);let U=Z.get(be);U?U.push($):Z.set(be,[$])}let Y=b=>{let $=h.find(ae=>ae.id===b&&ae.root_dir===be);if($)return{id:b,title:$.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let U=y.find(ae=>ae.id===b&&ae.root_dir===be),oe=U&&U.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":U&&U.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:b,title:U?U.title:D(b).title,badge:oe}},fe=[];for(let b=0;b<Math.max(mt,yt.length);b++){let $=`s${b+1}`,U=Mt.get($),oe=U&&Array.isArray(U.entries)?U.entries:[],ae=[];for(let Je=0;Je<oe.length;Je++){let ct=E(oe[Je],$,Je,oe.length);ct&&(ae.push(ct),A.push(ct))}let we=Rt(It[$]),Re=Array.isArray(we.occupied_by)?we.occupied_by.filter(Je=>typeof Je=="string"):[];ae.length===0&&Re.length===0&&(mt<=1||b>=mt)||fe.push({id:$,index:b,items:ae,raw_length:oe.length,occupied_by:Re,occupants:Re.map(Je=>Y(Je)),corrections:Array.isArray(we.corrections)?we.corrections.length:0,cycle:we.cycle===!0,...ae.length===0&&Re.length===0?{empty:!0}:{}})}le.set(be,fe);let x=Array.from({length:mt},(b,$)=>{let U=`s${$+1}`,oe=Mt.get(U),ae=oe&&Array.isArray(oe.entries)?oe.entries:[],we=Rt(It[U]);return{id:U,index:ae.length,length:ae.length,occupied_by:Array.isArray(we.occupied_by)?we.occupied_by.filter(Re=>typeof Re=="string"):[]}});for(let b of Array.isArray(N.runnable)?N.runnable:[]){let $=b&&b.bead_id;if(typeof $!="string"||de.has($))continue;de.add($);let U=b.workflow&&typeof b.workflow=="object"?b.workflow:null,oe=U&&typeof U.route=="string"&&U.route||(typeof b.route=="string"?b.route:null),ae=Eh(Rt(Ue),b.exec_pins,oe);Array.isArray(b.blocked_by)&&b.blocked_by.length>0&&j.set($,b.blocked_by.filter(we=>typeof we=="string"&&we.length>0)),typeof b.title=="string"&&b.title.length>0&&L.set($,b.title),Array.isArray(b.scope)&&P.set($,b.scope.filter(we=>typeof we=="string"&&we.length>0)),g.push({...D($),title:b.title||Ge[$]||$,lane:"runnable",draggable:!0,reason:lp(ft,$),created_at:b.created_at??void 0,updated_at:b.updated_at??void 0,status:typeof b.status=="string"?b.status:void 0,labels:Array.isArray(b.labels)?b.labels:[],spec_id:typeof b.spec_id=="string"?b.spec_id:"",workflow:U||(oe?{route:oe,chips:{route:oe}}:null),...ae?{exec_chips:ae}:{},blocked:b.blocked===!0,...Array.isArray(b.blocked_by)?{blocked_by:b.blocked_by.filter(we=>typeof we=="string"&&we.length>0)}:{},place_index:tt.length,place_lanes:x})}for(let b of Ve){let $=b&&b.bead_id;if(typeof $!="string"||de.has($)||(de.add($),o!==void 0&&typeof b.added_at=="number"&&b.added_at<o))continue;let U=Ah(We,$),oe=U&&typeof U.done_kind=="string"?U.done_kind:null;M.push({...D($),lane:"done",done:!0,done_layout:"three_line",usage:hn(We,$),work_ms:Qo(We,$),done_at:typeof b.added_at=="number"?b.added_at:void 0,done_kind:oe,badges:[...oe&&ip[oe]?[ip[oe]]:[],...Xo(We,$)]})}}let ne=new Map;s.forEach((N,be)=>{N&&typeof N.root_dir=="string"&&ne.set(N.root_dir,be)});let Ee=n&&n.running_sort==="repo"?"repo":"started";y.sort((N,be)=>{let Le=N.kind==="session",Ue=be.kind==="session";if(Le!==Ue)return Le?1:-1;if(Le&&Ue){let Ge=ha(be.updated_at)-ha(N.updated_at);return Ge!==0?Ge:N.id.localeCompare(be.id)}if(Ee==="repo"){let Ge=ne.get(N.root_dir)??Number.MAX_SAFE_INTEGER,et=ne.get(be.root_dir)??Number.MAX_SAFE_INTEGER;if(Ge!==et)return Ge-et}let ze=typeof N.started_at=="number"&&Number.isFinite(N.started_at)?N.started_at:null,We=typeof be.started_at=="number"&&Number.isFinite(be.started_at)?be.started_at:null;return ze!==null&&We!==null&&ze!==We?ze-We:ze===null&&We!==null?1:ze!==null&&We===null?-1:N.id.localeCompare(be.id)}),M.sort((N,be)=>(be.done_at??0)-(N.done_at??0));let ke=s.length>0?s:r.map(N=>({root_dir:N&&N.root_dir,name:N&&N.name,auto_advance:N&&N.auto_advance,auto_merge:N&&N.auto_merge,slots:N&&N.slots,revision:N&&N.revision,runner_catalog:N&&N.runner_catalog})),z=new Set(g.map(N=>N.root_dir)),te=[];for(let N of ke){if(!N||typeof N.root_dir!="string")continue;let be=Z.get(N.root_dir)||[],Le=le.get(N.root_dir)||[];!(be.length>0||Le.some(ze=>ze.items.length>0||ze.occupied_by.length>0))&&!z.has(N.root_dir)||te.push({root_dir:N.root_dir,name:N.name||N.root_dir,auto_advance:N.auto_advance===!0,auto_merge:N.auto_merge===!0,slots:typeof N.slots=="number"&&N.slots>=ap?N.slots:ap,revision:typeof N.revision=="number"?N.revision:0,runner_catalog:Rt(N.runner_catalog),items:be,sublanes:{parallel:be,serial:Le},serial_lane_count:V.get(N.root_dir)||0,raw_queue_length:B.get(N.root_dir)||0})}let me={runnable:g,runnable_all:g,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:c==="updated_flat",queue:A,queue_groups:te,running:y,pr_wait:h,done:M,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(B),owner_of:{}},xe=np(me);for(let N of W)xe.has(N.id)||xe.set(N.id,{root_dir:N.root_dir,workspace_name:N.workspace_name,lane:"done",state:"done"});for(let N of[...me.queue,...me.runnable,...me.running,...me.pr_wait]){if(!Object.hasOwn(N,"blocked_by"))continue;let be=xe.get(N.id);N.blockers=(N.blocked_by||[]).map(Le=>rp(Le,be,xe,s))}for(let N of[...me.queue,...me.runnable,...me.running,...me.pr_wait]){let be=(N.blockers||[]).map(Ue=>Ji(N.id,Ue));if(be.length===0)continue;let Le={predecessors:be};N.dependency_chips=Le}Oh(me,G,P,xe,s);let he=sp(me.queue_groups);for(let N of me.queue_groups)for(let be of N.sublanes.serial){let Le=he.get(op(N.root_dir,be.id));Le&&(be.cross_wait_peers=Le)}me.chain_lanes=Ch(i&&Array.isArray(i.lanes)?i.lanes:[],j,xe,s,L,d);let ce=new Map;for(let N of[...me.queue,...me.runnable])ce.has(N.id)||ce.set(N.id,N);let Ae=new Set;for(let N of me.chain_lanes)for(let be of N.rows){if(N.status==="confirmed"&&!be.unplaced&&!be.fixed&&Ae.add(be.id),!N.draft&&!be.unplaced)continue;let Le=ce.get(be.id);Le&&(Le.cross_lane_chip={lane_id:N.lane_id,number:N.number,status:N.status,label:N.draft?`\uC5F0\uACB0 ${N.number} (draft)`:`\uC5F0\uACB0 ${N.number}`})}let ye=[];for(let N of Z.values())for(let be of N)Ae.has(be.id)||ye.push(be);ye.sort((N,be)=>{let Le=N.workspace_name.localeCompare(be.workspace_name);return Le!==0?Le:(N.queue_index??0)-(be.queue_index??0)}),me.parallel_rows=ye;let K={};for(let[N,be]of xe)typeof be.root_dir=="string"&&be.root_dir.length>0&&(K[N]=be.root_dir);for(let N of me.chain_lanes)for(let be of N.rows)!Object.hasOwn(K,be.id)&&be.root_dir.length>0&&d.has(be.root_dir)&&(K[be.id]=be.root_dir);me.owner_of=K;let se=me.runnable.length;me.runnable_all=me.runnable.slice();let ue=me.runnable;a.show_blocked||(ue=ue.filter(N=>N.blocked!==!0));let $e=ue.length;a.spec==="with"?ue=ue.filter(N=>!!N.spec_id):a.spec==="without"&&(ue=ue.filter(N=>!N.spec_id)),me.runnable_hidden={blocked:se-$e,spec:$e-ue.length};let He=(N,be)=>{let Le=ha(be.updated_at)-ha(N.updated_at);return Le!==0?Le:N.id.localeCompare(be.id)},qe=c==="repo_spec"?(N,be)=>{let Le=N.spec_id?0:1,Ue=be.spec_id?0:1;return Le!==Ue?Le-Ue:He(N,be)}:He;if(c==="updated_flat")me.runnable=ue.slice().sort(He),me.runnable_sections=[];else{let N=new Map;for(let Ue of ue){let ze=N.get(Ue.root_dir);ze?ze.push(Ue):N.set(Ue.root_dir,[Ue])}let be=[],Le=[];for(let Ue of ke){if(!Ue||typeof Ue.root_dir!="string")continue;let ze=(N.get(Ue.root_dir)||[]).slice().sort(qe);N.delete(Ue.root_dir),ze.length!==0&&(be.push({root_dir:Ue.root_dir,name:Ue.name||Ue.root_dir,items:ze.map(We=>({...We,workspace_name:""}))}),Le.push(...ze))}for(let[Ue,ze]of N){let We=ze.slice().sort(qe);be.push({root_dir:Ue,name:We[0]?.workspace_name||Ue,items:We.map(Ge=>({...Ge,workspace_name:""}))}),Le.push(...We)}me.runnable=Le,me.runnable_sections=be}return me}var dp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function pp(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function fp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var bp="bdui.monitor.done-range",hp="bdui.monitor.running_sort",yp="bdui.monitor.candidate_sort",vp="beads-ui.monitor.candidate-filter",wp="beads-ui.monitor.sections";function Lh(){try{let e=window.localStorage.getItem(vp);if(!e)return{...Kr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Kr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Kr.show_blocked,spec:rl.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Kr}}}function _p(e){try{window.localStorage.setItem(vp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Ih(){try{let e=window.localStorage.getItem(yp);return Ds.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Ph(e){try{window.localStorage.setItem(yp,e)}catch{}}function Dh(){try{let e=window.localStorage.getItem(wp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function mp(e){try{window.localStorage.setItem(wp,JSON.stringify(e))}catch{}}function Mh(){try{let e=window.localStorage.getItem(bp);return e===null?"today":Rn(e)}catch{return"today"}}function Nh(e){try{window.localStorage.setItem(bp,e)}catch{}}function qh(){try{return window.localStorage.getItem(hp)==="repo"?"repo":"started"}catch{return"started"}}function Fh(e){try{window.localStorage.setItem(hp,e)}catch{}}var kp="tab:monitor:pipeline",jh=1e3,Bh=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],gp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Uh(e){return e>=1&&e<=gp.length?gp[e-1]:`(${e})`}function $p(e,t){let n=Lt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,c=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),g=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),y=Mh(),h=qh(),A=Lh(),M=Ih(),W=Dh(),Z=null,le=null,V=null,B=null,j=[],G=null;function P(){let p=Tr.find(m=>m.value===y);return p?p.label:""}let L=document.createElement("div");L.className="mon",e.appendChild(L);let ne=document.createElement("div");ne.className="worker-drawer-overlay",ne.hidden=!0;let Ee=document.createElement("div");Ee.className="worker-drawer-overlay__backdrop";let ke=document.createElement("div");ke.className="worker-drawer-host mon2-drawer",ne.append(Ee,ke),e.appendChild(ne);let z=sl(null,null),te=new Map,me=new Map,xe=null,he=null,ce=null,Ae=Br(ke,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Z=null,ne.hidden=!0,fe()}});async function ye(p,m,w,S,J=!0){if(!o||!w)return null;let H=await o(p,{...m,root_dir:w,expected_revision:S});if(H&&H.conflict&&J){H.queue&&me.set(w,H.queue);let v=H.queue&&typeof H.queue.revision=="number"?H.queue.revision:S;H=await o(p,{...m,root_dir:w,expected_revision:v})}return H&&H.queue&&w&&me.set(w,H.queue),H}function K(p,m){let w=me.get(p),S=s&&s.get?s.get():null,J=(Array.isArray(S)?S:[]).find(v=>v?.root_dir===p);return(w||J)?.merge_queue?.find(v=>v.bead_id===m)?.continuation_action}async function se(p,m,w,S){let J=await ye(p,m,w,S),H=me.get(w)?.revision??J?.queue?.revision??S;return qn(J,(v,O)=>ye(p,{...m,continuation:v,decision_token:O},w,H,!1),{refresh:v=>ye(p,m,w,v?.queue?.revision??me.get(w)?.revision??H,!1)})}async function ue(p,m,w,S){let J=await qn({continuation_mismatch:S},(v,O)=>ye("worker-merge-queue-add",{bead_id:m,continuation:v,decision_token:O},p,w,!1)),H=J?.queue?.merge_queue?.find(v=>v.bead_id===m)?.continuation_action;J?.applied!==!0&&H?.continuation===null&&H.mismatch&&await ue(p,m,J.queue.revision,H.mismatch)}async function $e(p,m,w){let S=await ye("worker-discard",p,m,w);if(S&&S.discarded===!0){pe(ea(S),"success",5e3);return}if(S&&S.reason){pe(`\uD3D0\uAE30 \uC2E4\uD328: ${S.reason}`,"error");return}if(S&&S.accepted&&S.pending==="merged_revert"){pe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(S&&S.accepted){pe(`\uD3D0\uAE30 \uC9C4\uD589: ${S.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}S&&!S.conflict&&pe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function He(p,m,w){return!o||!w?null:await o(p,{...m,root_dir:w})}async function ge(){let p=new Map;for(let m of z.pr_wait)p.has(m.root_dir)||p.set(m.root_dir,m.expected_revision);for(let[m,w]of p)await ye("worker-merge-queue-add-all",{},m,w)}function qe(p){let m=W[p];return!!(m&&m.runnable===!0)}function N(p){let m={...W[p]||{}};m.runnable=!m.runnable,W={...W,[p]:m},mp(W),fe()}function be(p){return W[p]===!0}function Le(p){W={...W,[p]:W[p]!==!0},mp(W),fe()}function Ue(p){let m=z.queue_groups.find(w=>w.root_dir===p);if(!m)return null;for(let w=0;w<m.serial_lane_count;w+=1){let S=`s${w+1}`,J=m.sublanes.serial.find(H=>H.id===S);if(!J||J.raw_length===0&&J.occupied_by.length===0)return S}return null}function ze(p,m){let w=z.queue_groups.find(J=>J.root_dir===p),S=w?w.sublanes.serial.find(J=>J.id===m):void 0;return S?S.raw_length:0}function We(p,m){let w=te.get(p),S=te.get(m);if(!w||!S)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let J=pp(w),H=pp(S);if(J!==null&&J===H&&w.root_dir===S.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let v=fp(w),O=fp(S);if(v&&H!==null){let C=H;return{kind:"ops",title:`${C} \uB05D\uC5D0 ${p}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:S.root_dir,ops:[{bead_id:p,lane:C,index:ze(S.root_dir,C)}]}}if(J!==null&&O&&H===null){let C=J;return{kind:"ops",title:`${C} \uB05D\uC5D0 ${m}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:m,lane:C,index:ze(w.root_dir,C)}]}}if(v&&J===null&&O&&H===null){let C=Ue(w.root_dir);return C===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${C} \uB808\uC778\uC5D0 ${m} \u2192 ${p} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:m,lane:C,index:0},{bead_id:p,lane:C,index:1}]}}return!v&&!O?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:v?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function Ge(p,m){let w=We(p,m.id);return{id:m.id,title:m.title,location_label:m.location_label,prefixes:m.prefixes,action:w.kind==="note"?{kind:"note",text:w.text}:w.kind==="disabled"?{kind:"disabled",label:dp,title:w.title}:{kind:"place",label:dp,title:w.title}}}function et(p,m){if(!V||V.bead_id!==p)return null;let w=V.counterpart_id,S=m.filter(J=>J.id===w);return S.length===0?null:{rows:S.map(J=>Ge(p,J))}}function it(p){let m=p.dependency_chips||null,w=p.overlap_chips||[],S=p.scope_state==="missing",J=p.cross_lane_chip;if(!m&&w.length===0&&!S&&!J)return null;let H=et(p.id,w);return{...m||{},...w.length>0?{overlaps:w}:{},...S?{scope_missing:!0}:{},...J?{cross_lane:{lane_id:J.lane_id,label:J.label}}:{},...H?{popover:H}:{}}}function ft(p){let m=it(p);return m?{...p,dependency_chips:m}:p}async function $t(p,m){let w=We(p,m);if(V=null,w.kind!=="ops"){fe();return}let S=un(w.root_dir,w.ops[0].bead_id);for(let J of w.ops){let H=await _t(J,w.root_dir,S);if(H===null)break;S=H}fe()}async function _t(p,m,w){try{let S=await ye("worker-queue-place",p,m,w,!1);if(S&&S.conflict)return pe("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!S||S.applied!==!0)return pe(S&&typeof S.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${S.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let J=S.queue?S.queue.revision:void 0;return typeof J!="number"?(pe("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):J}catch(S){return pe(Re(S),"error"),null}}function Q(p){let m=qe(p.root_dir);return l`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${p.root_dir}
        data-section="runnable"
        aria-expanded=${m?"false":"true"}
        aria-label=${`${p.name} \uC139\uC158 ${m?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${m?"\u25B8":"\u25BE"}
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
    </header>`}function ee(p,m){return l`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${m}
    </div>`}function Oe(p){if(le!==p.id)return null;let m=z.queue_groups.find(H=>H.root_dir===p.root_dir),w=p.place_lanes||[],S=z.cross_lanes_revision!==null,J=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let H of z.chain_lanes)J.push({id:`lane:${H.lane_id}`,label:`\uC5F0\uACB0 ${H.number} (${H.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:H.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!S});J.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!S,title:S?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let H of w)J.push({id:`serial:${H.id}`,label:`\uC9C1\uB82C ${Number(H.id.slice(1))}`,count:H.length,group:`${m?m.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:J}}function Ne(){let p=[],m=new Set,w=(S,J)=>{for(let H of S)m.has(H.id)||(m.add(H.id),p.push({bead_id:H.id,root_dir:H.root_dir,workspace_name:H.workspace_name,title:H.title,lane:J}))};return w(z.running,"running"),w(z.pr_wait,"pr_wait"),w(z.queue,"queue"),w(z.runnable_all,"runnable"),p}function Te(p){if(!B||B.bead_id!==p)return"";let m=pt(),w=Ne(),S=new Map;for(let O of w)S.set(O.bead_id,O);let J=(m.get(p)||[]).filter(O=>S.has(O)),H=Vd(Kd(p,{issues:w,blocked_by_map:m}),B.query),v=z.owner_of[p];return l`<div
      class="mon-deppanel"
      data-bead-id=${p}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${J.length===0?l`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${J.map(O=>l`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
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
        .value=${B.query}
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
      ${v===void 0?l`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function Pe(p){return ee(p,l`${Fi(ft(p),Oe(p),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(m,w)=>i(w,p.root_dir):void 0})}${Te(p.id)}`)}function je(){return z.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${z.runnable.map(p=>Pe(p))}
      </div>`:l`${z.runnable_sections.map(p=>{let m=qe(p.root_dir);return l`<section
        class="mon2-sec${m?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${Q({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${m?"":l`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(w=>Pe(w))}
            </div>`}
      </section>`})}`}function ot(p,m){return l`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${m}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Jn(ft(p))}
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
      ${Te(p.id)}
    </div>`}function nt(){let p=be("parallel");return l`<section
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
                </div>`:z.parallel_rows.map((m,w)=>ot(m,w))}
          </div>`}
    </section>`}function tt(p,m,w){return l`<div
      class="mon2-crow${m.fixed?" mon2-crow--fixed":""}"
      draggable=${m.draggable?"true":"false"}
      data-bead-id=${m.id}
      data-drag-kind="chain"
      data-root-dir=${m.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${w}
      data-queue-index=${typeof m.queue_index=="number"?String(m.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Uh(m.seq)}</span
      >
      ${m.workspace_name?l`<span class="worker-mini__repo" title=${m.root_dir}
            >${m.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${m.id}</span>
      <span class="mon2-crow__title">${m.title}</span>
      ${m.mismatch?l`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      <span class="mon2-crow__where"
        >${m.location_label==="\uC2E4\uD589\uC911"?`\u25CF ${m.location_label}`:m.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${m.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function yt(p){let m=z.cross_lanes_revision!==null;return l`<div class="mon2-clane" data-lane-id=${p.lane_id}>
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
              ?disabled=${!m||!p.can_confirm}
              title=${p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:p.has_mismatch?l`<button
                type="button"
                class="mon2-clane__reapply"
                data-lane-id=${p.lane_id}
                ?disabled=${!m}
                title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
              >
                재적용
              </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${p.lane_id}
          ?disabled=${!m}
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
            </div>`:p.rows.map((w,S)=>tt(p,w,S))}
      </div>
    </div>`}function It(p,m,w){return l`<div
      class="mon2-item"
      data-bead-id=${m.id}
      data-drag-kind="repo-serial"
      data-root-dir=${m.root_dir}
      data-lane-id=${p.id}
      data-row-index=${w}
      data-queue-index=${String(m.queue_index??0)}
    >
      ${Jn(ft(m))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${m.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
      </span>
      ${Te(m.id)}
    </div>`}function mt(p){if(p.length===0)return"";let m=p.length-1;return`${p[0].id} \uC810\uC720${m>0?` +${m}`:""}`}function Mt(p){return l`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${Jn({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function vt(p,m){return l`<div
      class="mon2-lane${m.empty?" mon2-lane--empty":""}"
      data-root-dir=${p.root_dir}
      data-lane-length=${String(m.raw_length)}
    >
      ${vn({id:"",lane:m.id,title:`${p.name} \xB7 \uC9C1\uB82C ${m.index+1}`,items:m.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:l`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${p.root_dir}
          data-lane-id=${m.id}
          data-lane-length=${String(m.raw_length)}
        >
          ${m.occupants.map(w=>Mt(w))}
          ${m.items.length>0?m.items.map((w,S)=>It(m,w,S)):m.occupants.length>0?"":l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:l`<span
            class="mon2-lane__badge${m.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${m.occupants.length>0?m.occupants.map(w=>`${w.id} \u2014 ${w.badge}`).join(`
`):""}
            >${mt(m.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${p.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${m.empty?l`<div class="mon2-lane__hint">
            ${p.name} 직렬 ${m.index+1} 비어 있음
          </div>`:""}
      ${m.cycle?l`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(m.cross_wait_peers||[]).map(w=>l`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${w.workspace_name}·${w.lane}과 교차 대기
          </div>`)}
    </div>`}function Ve(){let p=be("serial"),m=z.cross_lanes_revision!==null,w=z.chain_lanes.some(S=>S.draft&&S.rows.length===0);return l`<section
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
          ?disabled=${w||!m}
          title=${m?w?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${p?"":l`<div class="mon2-area__body">
            ${z.cross_lanes_unreadable?l`<div class="mon2-clane__unreadable">
                  연결 레인 저장소를 읽을 수 없음
                </div>`:""}
            ${z.chain_lanes.map(S=>yt(S))}
            ${z.queue_groups.map(S=>S.sublanes.serial.map(J=>vt(S,J)))}
          </div>`}
    </section>`}function De(){return l`<div class="mon2-wait">${nt()}${Ve()}</div>`}function D(p){return l`<div class="worker-rungrid">
      ${z.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:z.running.map(m=>Ui({bead_id:m.id,attempt_id:m.attempt_id||"",title:m.title,runner:m.runner??null,model:m.model??null,effort:m.effort??null,speed:m.speed??null,started_at:m.started_at??null,kind:m.kind,...m.kind==="session"?{updated_at:m.updated_at,session_refs:m.session_refs||[]}:{},workflow:m.workflow||null,resumed_from:m.resumed_from??null,continuation_mode:m.continuation_mode??null,paused:m.run_state==="paused",failed:m.run_state==="failed",status:m.status,status_label:m.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:m.can_resume!==!1,can_pause:m.can_pause!==!1,exec_chips:m.exec_chips||null,usage:m.usage||null,discard:m.discard},p,Z,{monitor:{repo:m.workspace_name,root_dir:m.root_dir,serial_lane_id:m.serial_lane_id,last_activity:m.last_activity||null,legs:m.legs||[],dependency_chips:it(m)}}))}
    </div>`}function X(p){let m={runnable:z.runnable,queue:z.queue,running:z.running,pr_wait:z.pr_wait,done:z.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${Bh.map(w=>{let S=m[w.lane],J=w.lane==="runnable"?z.runnable_flat?S.length>0?je():void 0:z.runnable_sections.length>0?je():void 0:w.lane==="queue"?z.queue_groups.length>0||z.chain_lanes.length>0||z.parallel_rows.length>0?De():void 0:w.lane==="running"?D(p):S.length>0?l`${S.map(H=>Jn(H))}`:void 0;return vn({id:`monitor-${w.lane}`,lane:w.pane,title:w.lane==="done"?`\uC644\uB8CC\xB7${P()}`:w.title,items:S,empty:w.empty,body:J,live:w.lane==="running"&&S.length>0,controls:w.lane==="runnable"?de():void 0,header_control:E(w.lane,S.length)})})}
      </div>`}function de(){return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${A.show_blocked}
        />
        🔒
        blocked${z.runnable_hidden.blocked>0?` ${z.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${rl.map(p=>l`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${A.spec===p.value?" is-active":""}"
              data-spec=${p.value}
              aria-pressed=${A.spec===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${z.runnable_hidden.spec>0?l`<span class="worker-filter__hidden"
              >숨김 ${z.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function E(p,m){return p==="runnable"?l`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${M}
      >
        ${Ds.map(w=>l`<option
              value=${w.value}
              ?selected=${M===w.value}
            >
              ${w.label}
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
      </select>`:p==="pr_wait"&&m>0?l`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:p==="done"?l`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${y}
      >
        ${Tr.map(w=>l`<option value=${w.value} ?selected=${y===w.value}>
              ${w.label}
            </option>`)}
      </select>`:""}function Y(p){let m=s&&s.get?s.get():null,w=s&&s.getWorkspacesState?s.getWorkspacesState():[],S=p===void 0?s&&s.crossLanes?s.crossLanes():void 0:p,J={done_since:dr(y,d()),running_sort:h,candidate_filter:A,candidate_sort:M};return S!==void 0&&(J.cross_lanes=S),sl(m,w,J)}function fe(){let p=d();z=Y(),te=new Map;for(let m of[...z.runnable,...z.queue,...z.running,...z.pr_wait,...z.done])!m.non_occupying&&!te.has(m.id)&&te.set(m.id,m);Qe(X(p),L),b()?.render(),x(),$()}function x(){let p=new Map;for(let m of z.queue_groups)p.set(m.root_dir,m.auto_advance);for(let m of Array.from(L.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let w=m.closest(".mon2-item")?.getAttribute("data-root-dir")||"",S=p.get(w);typeof S=="boolean"&&m.setAttribute("title",`${m.textContent||""} \xB7 ${S?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function b(){if(ce)return ce;let p=L.querySelector(".mon2-deck");return p?(ce=jd(p,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>z.done,rangeLabel:P,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:oe,onFocusChange:m=>{G=m,$()}}),ce):null}function $(){L.classList.toggle("has-focus",G!==null);for(let p of Array.from(L.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",G!==null&&p.getAttribute("data-root-dir")===G);for(let p of Array.from(L.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let m=te.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",G!==null&&!!m&&m.root_dir===G)}for(let p of Array.from(L.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",G!==null&&p.getAttribute("data-root-dir")===G)}function U(p,m){let w=a?a():void 0;if(!m||!w||m===w||!c){r(p);return}c(m).then(()=>{r(p)}).catch(S=>{n("workspace switch for %s failed: %o",m,S)})}function oe(p){if(!p)return;let m=a?a():void 0,w=()=>{try{u?.gotoView("worker")}catch(S){n("gotoView(worker) failed: %o",S)}};if(!c||m&&m===p){w();return}c(p).then(w).catch(S=>{n("workspace switch for %s failed: %o",p,S),pe("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function ae(p){fn(p).then(m=>{pe(m?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",m?"success":"error",1400)})}function we(p){let m=te.get(p)||null;return{item:m,root_dir:m?m.root_dir:"",revision:m?m.expected_revision:0}}function Re(p){if(typeof p=="string"&&p.length>0)return p;if(p&&typeof p=="object"){let m=p;if(typeof m.message=="string"&&m.message.length>0)return m.message;if(typeof m.error=="string"&&m.error.length>0)return m.error;if(m.error&&typeof m.error=="object"&&typeof m.error.message=="string")return m.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function Je(p,m,w){let S=z.owner_of[m];if(typeof S!="string"||S.length===0){pe(`${m}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await He(p,{a:m,b:w},S)}catch(J){pe(Re(J),"error")}fe()}function ct(p){return z.runnable.some(m=>m.id===p)||z.parallel_rows.some(m=>m.id===p)?!0:z.queue_groups.some(m=>m.sublanes.serial.some(w=>w.items.some(S=>S.id===p)))}function Ce(p){!p||!ct(p)||(B=B&&B.bead_id===p?null:{bead_id:p,query:""},fe())}function pt(){let p=new Map,m=s&&s.get?s.get():null,w=S=>Array.isArray(S)?S.filter(J=>typeof J=="string"&&J.length>0):[];for(let S of Array.isArray(m)?m:[]){if(!S||typeof S!="object")continue;let J=S.bead_blocked_by&&typeof S.bead_blocked_by=="object"?S.bead_blocked_by:{};for(let[H,v]of Object.entries(J))Array.isArray(v)&&p.set(H,w(v));for(let H of[...Array.isArray(S.runnable)?S.runnable:[],...Array.isArray(S.session_active)?S.session_active:[]])H&&typeof H.bead_id=="string"&&Array.isArray(H.blocked_by)&&H.blocked_by.length>0&&p.set(H.bead_id,w(H.blocked_by))}return p}function Nt(){let p=pt();for(let m of j){let w=(p.get(m.a)||[]).slice();m.type==="dep-remove"?p.set(m.a,w.filter(S=>S!==m.b)):w.includes(m.b)||p.set(m.a,[...w,m.b])}return p}function St(p=z){let m=new Map,w=new Map,S=new Set,J=new Set;for(let v of p.chain_lanes){m.set(v.lane_id,{status:v.status,entries:v.rows.map(O=>({bead_id:O.id,root_dir:O.root_dir}))});for(let O of v.rows)w.set(O.id,v.lane_id),O.fixed&&S.add(O.id),O.unplaced||J.add(O.id)}let H=new Map;for(let v of p.parallel_rows)typeof v.queue_index=="number"&&H.set(v.id,v.queue_index);for(let v of p.queue_groups)for(let O of v.sublanes.serial)for(let C of O.items)typeof C.queue_index=="number"&&H.set(C.id,C.queue_index);return{blocked_by_map:Nt(),owner_of:new Map(Object.entries(p.owner_of)),cross_lanes:m,owner_lane_of:w,fixed_members:S,placed_members:J,parallel_rows:p.parallel_rows.map(v=>({bead_id:v.id,root_dir:v.root_dir,queue_index:v.queue_index??0})),parallel_raw_length:new Map(Object.entries(p.parallel_raw_length)),queue_index_of:H}}function un(p,m){let w=te.get(m);if(w&&w.root_dir===p)return w.expected_revision;let S=z.queue_groups.find(J=>J.root_dir===p);return S?S.revision:0}async function Ht(p,m,w){try{if(p.type==="worker-queue-place"||p.type==="worker-queue-reorder"||p.type==="worker-queue-remove"){let S=await ye(p.type,p.payload,p.root_dir,w.get(p.root_dir)??un(p.root_dir,m));return!S||typeof S.applied!="boolean"?(pe("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),!1):(S.queue&&typeof S.queue.revision=="number"&&w.set(p.root_dir,S.queue.revision),S.conflict?(pe("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):S.applied===!1?(pe(S.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${S.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0)}return(p.type==="dep-add"||p.type==="dep-remove")&&await He(p.type,{a:p.a,b:p.b},p.root_dir),!0}catch(S){return pe(Re(S),"error"),!1}}function Ut(p){(p.type==="dep-add"||p.type==="dep-remove")&&(j=[...j,{type:p.type,a:p.a,b:p.b}])}async function Zt(p,m){if(!o)return{ok:!1};try{let w=await o(p.type,{...p.payload,expected_revision:m});return!w||typeof w.revision!="number"?(pe("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:w.revision}}catch(w){let S=w,J=S&&S.code==="conflict"?S.details?.cross_lanes:null;return J&&typeof J.revision=="number"&&Array.isArray(J.lanes)?{ok:!1,conflict:J}:(pe(Re(w),"error"),{ok:!1})}}async function zt(p,m,w){let S=new Map,J=p.ops.slice(0,p.lane_op_index),H=p.ops.slice(p.lane_op_index);for(let O of J){if(!await Ht(O,w,S))return{done:!0};Ut(O)}let v=m;for(let O of p.lane_ops){if(v===null)return pe("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let C=await Zt(O,v);if(!C.ok)return C.conflict?{done:!1,conflict:C.conflict}:{done:!0};v=C.revision}for(let O of H){if(!await Ht(O,w,S))return{done:!0};Ut(O)}return{done:!0}}async function gt(p,m){j=[];let w=z;for(let S=0;;S+=1){let J=p(St(w));if("refused"in J){pe(J.refused,"error");break}let H=await zt(J,w.cross_lanes_revision,m);if(H.done)break;if(S>=1){pe("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}w=Y(H.conflict)}j=[],fe()}async function Ke(p,m){await gt(w=>Yi(p,m,w),p.bead_id)}async function dn(p,m){if(p==="create"){await gt(w=>Zi(null,w),"");return}if(p==="remove"){let w=z.chain_lanes.find(S=>S.lane_id===m);if(w&&!w.draft){let S=w.rows.filter((J,H)=>H===0?!1:!J.mismatch).length;if(!g(`\uC758\uC874 ${S}\uAC1C\uB97C \uD568\uAED8 \uC81C\uAC70\uD569\uB2C8\uB2E4`))return}await gt(S=>Gd(m,S),"");return}await gt(w=>p==="confirm"?zd(m,w):Hd(m,w),"")}async function tn(p,m){let w=te.get(p);if(!w){fe();return}let S={kind:"candidate",bead_id:p,root_dir:w.root_dir};if(m==="new-lane"){await gt(J=>Zi({bead_id:p,root_dir:w.root_dir},J),p);return}if(m.startsWith("lane:")){let J=m.slice(5);if(!z.chain_lanes.find(v=>v.lane_id===J)){fe();return}await gt(v=>Yi(S,{kind:"chain",lane_id:J,marker_index:(v.cross_lanes.get(J)?.entries??[]).length},v),p);return}if(m.startsWith("serial:")){let J=m.slice(7),H=(w.place_lanes||[]).find(v=>v.id===J);await Ke(S,{kind:"repo-serial",root_dir:w.root_dir,lane_id:J,index:H?H.index:0});return}await Ke(S,{kind:"parallel",marker_index:z.parallel_rows.length})}async function st(p,m){let w=z.parallel_rows,S=w.findIndex(ve=>ve.id===p);if(S<0)return;let J=w[S].root_dir,H=[];w.forEach((ve,rt)=>{ve.root_dir===J&&H.push(rt)});let v=H.indexOf(S),O=H[v+m];if(typeof O!="number")return;let C=m===-1?O:H[v+2]??Math.min(w.length,O+1);await Ke({kind:"parallel",bead_id:p,root_dir:J,queue_index:w[S].queue_index??0},{kind:"parallel",marker_index:C})}async function Ie(p){for(let m of z.chain_lanes){let w=m.rows.find(S=>S.id===p);if(w){await Ke({kind:"chain",bead_id:p,root_dir:w.root_dir,lane_id:m.lane_id,...typeof w.queue_index=="number"?{queue_index:w.queue_index}:{}},{kind:"parallel",marker_index:z.parallel_rows.length});return}}}let R=null,_e=!1,Se=null;function ut(){Se!==null&&clearTimeout(Se),Se=setTimeout(()=>{Se=null,_e=!1},0)}function xt(p,m){let w=m&&typeof m.closest=="function"?m.closest("[data-row-index]"):null;if(w&&p.contains(w)){let S=Number(w.getAttribute("data-row-index"));return Number.isFinite(S)?S:0}return p.querySelectorAll("[data-row-index]").length}function ht(p){let m=p.target,w=typeof m?.closest=="function"?m.closest("[data-drop]"):null;if(!w||!R)return null;let S=w.getAttribute("data-drop");if(S==="candidate")return{zone:w,target:{kind:"candidate"}};if(S==="parallel")return{zone:w,target:{kind:"parallel",marker_index:xt(w,m)}};if(S==="chain")return{zone:w,target:{kind:"chain",lane_id:w.getAttribute("data-lane-id")||"",marker_index:xt(w,m)}};if(S==="repo-serial"){let J=w.getAttribute("data-root-dir")||"";if(J!==R.root_dir)return null;let H=typeof m?.closest=="function"?m.closest("[data-queue-index]"):null,v=H&&w.contains(H)?H.getAttribute("data-queue-index"):w.getAttribute("data-lane-length"),O=Number(v);return{zone:w,target:{kind:"repo-serial",root_dir:J,lane_id:w.getAttribute("data-lane-id")||"",index:Number.isFinite(O)?O:0}}}return null}function Dt(){for(let p of Array.from(L.querySelectorAll(".is-drop-over")))p.classList.remove("is-drop-over")}function jt(p){let m=p.target,w=typeof m?.closest=="function"?m.closest('[draggable="true"][data-bead-id]'):null,S=w?w.closest("[data-drag-kind]"):null;if(!S)return;let J=S.getAttribute("data-bead-id")||"",H=S.getAttribute("data-drag-kind")||"",v=S.getAttribute("data-root-dir")||"";if(!J||!H||!v)return;let O=S.getAttribute("data-queue-index")||"",C=Number(O),ve=S.getAttribute("data-lane-id")||"";R={kind:H,bead_id:J,root_dir:v,...O!==""&&Number.isFinite(C)?{queue_index:C}:{},...ve?{lane_id:ve}:{}},_e=!0,le=null,L.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",J),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Gt(p){let m=ht(p);m&&(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),m.zone.classList.add("is-drop-over"))}function nn(p){let m=p.target;typeof m?.closest=="function"&&m.closest("[data-drop]")?.classList.remove("is-drop-over")}function Et(){R=null,Dt(),L.classList.remove("is-dragging"),ut()}function rn(p){let m=ht(p),w=R;R=null,Dt(),L.classList.remove("is-dragging"),!(!m||!w)&&(p.preventDefault(),Ke(w,m.target))}function gn(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function Pn(p,m){let{item:w,root_dir:S,revision:J}=we(m),H=w?.attempt_id||"",v=p.classList;if(v.contains("mon2-rowops__up")||v.contains("mon2-rowops__down")){st(m,v.contains("mon2-rowops__up")?-1:1);return}if(v.contains("mon2-rowops__remove")){ye("worker-queue-remove",{bead_id:m},S,J);return}if(v.contains("mon2-crow__detach")){Ie(m);return}if(v.contains("mon-dep__btn")){Ce(m);return}if(v.contains("worker-dep__open")){Ce(m);return}if(v.contains("mon-lane__chip")){let O=p.getAttribute("data-lane-id")||"";L.querySelector(`.mon2-clane[data-lane-id="${O}"]`)?.scrollIntoView({block:"nearest"});return}if(v.contains("mon-deppanel__unlink")){let O=p.getAttribute("data-dep-a")||"",C=p.getAttribute("data-dep-b")||"";g(`${C}\uAC00 ${O}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&Je("dep-remove",O,C);return}if(v.contains("mon-deppanel__cand")){let O=p.getAttribute("data-dep-cand")||"";B&&O&&Je("dep-add",B.bead_id,O);return}if(v.contains("mon-overlap__chip")){let O=p.getAttribute("data-overlap-id")||"";V=!!V&&V.bead_id===m&&V.counterpart_id===O?null:{bead_id:m,counterpart_id:O},fe();return}if(v.contains("mon-overlap__place")){$t(m,p.getAttribute("data-counterpart-id")||"");return}if(v.contains("worker-card__place")){le=le===m?null:m,fe();return}if(v.contains("worker-card__place-cancel")){le=null,fe();return}if(v.contains("worker-card__place-lane")){let O=p.getAttribute("data-lane")||"parallel";le=null,tn(m,O);return}if(v.contains("rtile__session")){if(w&&w.kind==="session"){let O=(w.session_refs||[]).find(C=>C&&C.current===!0);O&&(ne.hidden=!1,Ae.open(wo(O,m,"in_progress",S)),fe());return}Z=H,H&&w&&(ne.hidden=!1,Ae.open({attempt_id:H,root_dir:S,meta:gn(w)})),fe();return}if(v.contains("rtile__pause")){He("worker-attempt-pause",{attempt_id:H},S);return}if(v.contains("rtile__resume")){Mr().then(O=>{if(O!==null)return se("worker-attempt-resume",{attempt_id:H,...O!==""?{instructions:O}:{}},S,J)});return}if(v.contains("rtile__dismiss")){ye("worker-attempt-dismiss",{attempt_id:H},S,J);return}if(v.contains("rtile__discard")){if(!g(Cs(m,"unmerged")))return;$e({bead_id:m,...H?{attempt_id:H}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},S,J);return}if(v.contains("worker-mini__merge")){let O=K(S,m);O?.mismatch&&O.continuation===null?ue(S,m,J,O.mismatch):ye("worker-merge-queue-add",{bead_id:m},S,J);return}if(v.contains("worker-mini__merge-cancel")){ye("worker-merge-queue-remove",{bead_id:m},S,J);return}if(v.contains("worker-mini__discard")){let O=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!g(Cs(m,O)))return;$e({bead_id:m,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},S,J);return}if(v.contains("worker-mini__revise-fix")){se("worker-revise-fix",{bead_id:m},S,J);return}v.contains("worker-mini__revise-approve")&&ye("worker-revise-approve",{bead_id:m},S,J)}function T(p){let m=_e;_e=!1;let w=p.target;if(!w||typeof w.closest!="function"||w.closest("dialog")||w.closest(".worker-drawer-overlay")||w.closest("a"))return;let S=w.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(S){p.preventDefault();let Ze=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||S.textContent?.trim()||"";Ze&&ae(Ze);return}let J=w.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(J){p.preventDefault();let at=J.getAttribute("data-root-dir")||te.get(w.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||J.getAttribute("title")||"";oe(at);return}let H=w.closest(".mon2-sec__toggle");if(H){p.preventDefault(),N(H.getAttribute("data-root-dir")||"");return}let v=w.closest(".mon2-area__toggle");if(v){p.preventDefault(),Le(v.getAttribute("data-area")||"parallel");return}if(w.closest(".mon2-newlane")){p.preventDefault(),dn("create","");return}let O=w.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove");if(O){p.preventDefault();let at=O.getAttribute("data-lane-id")||"";dn(O.classList.contains("mon2-clane__confirm")?"confirm":O.classList.contains("mon2-clane__reapply")?"reapply":"remove",at);return}if(w.closest(".mon-merge-all")){p.preventDefault(),ge();return}let C=w.closest(".mon-filter__spec");if(C){p.preventDefault(),A={...A,spec:C.getAttribute("data-spec")||"all"},_p(A),fe();return}let ve=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!ve)return;let rt=ve.getAttribute("data-bead-id")||"",Ye=w.closest("button");if(Ye){p.preventDefault(),Pn(Ye,rt);return}rt&&!m&&(p.preventDefault(),U(rt,ve.getAttribute("data-root-dir")||we(rt).root_dir))}function I(p){let m=p.target;if(!m||typeof m.closest!="function")return;let w=m.closest(".mon-filter__blocked");if(w){A={...A,show_blocked:w.checked},_p(A),fe();return}let S=m.closest(".mon-candidate-sort");if(S){M=Ds.some(v=>v.value===S.value)?S.value:"repo_spec",Ph(M),fe();return}let J=m.closest(".mon-running-sort");if(J){h=J.value==="repo"?"repo":"started",Fh(h),fe();return}let H=m.closest(".mon-done-range");H&&(y=Rn(H.value),Nh(y),fe())}function Me(p){let m=p.target,w=m&&typeof m.closest=="function"?J=>m.closest(J):()=>null,S=!1;V&&!w(".mon-overlap__popover, .mon-overlap__chip")&&(V=null,S=!0),B&&!w(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(B=null,S=!0),S&&fe()}function f(p){p.key!=="Escape"||!V&&!B||(V=null,B=null,fe())}function k(p){let m=p.target;!m||typeof m.closest!="function"||!m.closest(".mon-deppanel__search")||!B||(B={...B,query:m.value},fe())}e.addEventListener("click",T),e.addEventListener("change",I),e.addEventListener("input",k),document.addEventListener("click",Me),document.addEventListener("keydown",f),e.addEventListener("dragstart",jt),e.addEventListener("dragover",Gt),e.addEventListener("dragleave",nn),e.addEventListener("drop",rn),e.addEventListener("dragend",Et),s&&typeof s.subscribe=="function"&&(xe=s.subscribe(()=>{try{me.clear(),fe()}catch{}}));function q(){he!==null&&(clearInterval(he),he=null)}function re(){Se!==null&&(clearTimeout(Se),Se=null)}return{load(){n("load"),fe(),he===null&&(he=setInterval(()=>{try{fe()}catch{}},jh))},pause(){q()},clear(){q(),re(),xe&&(xe(),xe=null),Ae.destroy(),ne.hidden=!0,ce?.destroy(),ce=null,e.removeEventListener("click",T),e.removeEventListener("change",I),e.removeEventListener("input",k),document.removeEventListener("click",Me),document.removeEventListener("keydown",f),e.removeEventListener("dragstart",jt),e.removeEventListener("dragover",Gt),e.removeEventListener("dragleave",nn),e.removeEventListener("drop",rn),e.removeEventListener("dragend",Et),e.replaceChildren()}}}function xp(e,t,n){let r=Lt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(y){return h=>{h.preventDefault();let A=y==="monitor"&&c()==="monitor"?"worker":y;r("click tab %s",A),n.gotoView(A)}}function c(){let y=t.getState();return y.view==="worker"||y.view==="monitor"?y.view:"board"}function u(){let y=c();return l`
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
    `}function d(){let y=c();return l`
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
    `}function g(){s&&Qe(u(),s),o&&Qe(d(),o)}return g(),a=t.subscribe(()=>g()),{destroy(){a&&(a(),a=null),s&&Qe(l``,s),o&&Qe(l``,o)}}}var Ap=["bug","feature","task","epic","chore"];function Sp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Ep=["Critical","High","Medium","Low","Backlog"];function Tp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),c=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),g=n.querySelector("#btn-create"),y=n.querySelector(".new-issue__close");function h(){o.replaceChildren();let j=document.createElement("option");j.value="",j.textContent="\u2014 Select \u2014",o.appendChild(j);for(let G of Ap){let P=document.createElement("option");P.value=G,P.textContent=Sp(G),o.appendChild(P)}a.replaceChildren();for(let G=0;G<=4;G+=1){let P=document.createElement("option");P.value=String(G);let L=Ep[G]||"Medium";P.textContent=`${G} \u2013 ${L}`,a.appendChild(P)}}h();function A(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function M(j){s.disabled=j,o.disabled=j,a.disabled=j,i.disabled=j,c.disabled=j,d.disabled=j,g.disabled=j,g.textContent=j?"Creating\u2026":"Create"}function W(){u.textContent=""}function Z(j){u.textContent=j}function le(){try{let j=window.localStorage.getItem("beads-ui.new.type");j?o.value=j:o.value="";let G=window.localStorage.getItem("beads-ui.new.priority");G&&/^\d$/.test(G)?a.value=G:a.value="2"}catch{o.value="",a.value="2"}}function V(){let j=o.value||"",G=a.value||"";j.length>0&&window.localStorage.setItem("beads-ui.new.type",j),G.length>0&&window.localStorage.setItem("beads-ui.new.priority",G)}async function B(){W();let j=String(s.value||"").trim();if(j.length===0){Z("Title is required"),s.focus();return}let G=Number(a.value||"2");if(!(G>=0&&G<=4)){Z("Priority must be 0..4"),a.focus();return}let P=String(o.value||""),L=String(c.value||""),ne={title:j};P.length>0&&(ne.type=P),String(G).length>0&&(ne.priority=G),L.length>0&&(ne.description=L),M(!0);try{await t("create-issue",ne)}catch{M(!1),Z("Failed to create issue");return}V(),M(!1),A()}return n.addEventListener("cancel",j=>{j.preventDefault(),A()}),y.addEventListener("click",()=>A()),d.addEventListener("click",()=>A()),n.addEventListener("keydown",j=>{j.key==="Enter"&&(j.ctrlKey||j.metaKey)&&(j.preventDefault(),B())}),r.addEventListener("submit",j=>{j.preventDefault(),B()}),{open(){r.reset(),W(),le();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){A()}}}var Wh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function zh(e,t){return Ga(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Cp(e,t,n){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=zh(r,e);return l`<button
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
  `}function Rp(e,t,n){return l`
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
  `}function Op(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Wh.map(([n,r])=>l`<label class="settings-dialog__toggle">
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
  `}var Hh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Lp(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(te=>pe(te,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,u="",d=null;function g(){if(d)return d;let te=a.querySelector('[data-pane="execution"]');return te?(d=ia(te,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:me=>t.queueStore?.set?.(me)}),d):null}function y(){return l`
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
    `}function h(){let te=r.get();return l`
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
        ${te?l`
              ${Cp(te,s(),Z)}
              ${Rp(te,u,{onDraft:me=>{u=me},onAdd:le,onRemove:V})}
              ${Op(te,B)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function A(te){let me=r.get();if(me)try{let xe=await n("display-policy-set",{expected_revision:me.revision,policy:te(me)});M(xe),xe&&xe.conflict&&xe.policy&&(xe=await n("display-policy-set",{expected_revision:xe.policy.revision,policy:te(xe.policy)}),M(xe)),xe&&xe.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function M(te){te&&te.policy&&typeof te.policy=="object"&&r.set(te.policy)}function W(te){A(te)}function Z(te){let me=r.get();if(!me)return;let xe=!Gh(te,me);W(he=>Kh(te,he,xe))}function le(){let te=u.trim();te.length!==0&&(u="",W(me=>me.hidden_prefixes.includes(te)?{hidden_prefixes:me.hidden_prefixes}:{hidden_prefixes:[...me.hidden_prefixes,te]}),j())}function V(te){W(me=>({hidden_prefixes:me.hidden_prefixes.filter(xe=>xe!==te)}))}function B(te){let me=r.get();if(!me)return;let xe=me.chips[te]===!1;W(()=>({chips:{[te]:xe}}))}function j(){Qe(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Hh.map(te=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${te.id}
                  aria-selected=${String(i===te.id)}
                  aria-controls=${`settings-pane-${te.id}`}
                  @click=${()=>G(te.id)}
                >
                  <span class="settings-dialog__glyph">${te.glyph}</span>
                  ${te.label}
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
            ${y()} ${h()}
          </div>
        </div>
      `,a),g()}function G(te){i=te,j()}let P=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",P),a.addEventListener("cancel",P);let L=te=>{te.target===a&&z()};a.addEventListener("click",L);let ne=null;r.subscribe&&(ne=r.subscribe(()=>{c&&j()}));let Ee=null;t.implPresetStore?.subscribe&&(Ee=t.implPresetStore.subscribe(()=>{c&&d?.render()}));function ke(te="execution"){c||(c=!0,t.onOpenChange?.(!0),i=te,u="",j(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),g()?.load())}function z(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:ke,close:z,sessionDraft:()=>d?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",P),a.removeEventListener("cancel",P),a.removeEventListener("click",L),ne&&(ne(),ne=null),Ee&&(Ee(),Ee=null),d?.destroy(),d=null,a.remove()}}}function Gh(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Kh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Vh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Ip="usage-meter-card",Yh="usage-meter-layer",ol=600,Zh=["token_expired","relogin_required"];function Pp(e){return String(e).padStart(2,"0")}function Xh(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Dp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Pp(r.getHours())}:${Pp(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Vh[r.getMonth()]} ${r.getDate()} ${o}`;return`${Xh(n,t)} \xB7 ${i}`}function Qh(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Mp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Np(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var qp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function jp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Jh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:jp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function ey(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let a=Jh(o);a&&r.push(a)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?jp(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function ty(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=ey(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Bp(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function ny(e,t){return!e.held||Bp(e,t)<=ol?e:{...e,available:!1,windows:[],accounts:[]}}function Fp(e,t){return`${e}:${t}`}function Up(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function u(){Qe(l``,e),e.hidden=!0,g()}function d(){if(c===null){let he=e.ownerDocument;c=he.createElement("div"),c.id=Yh,c.className="usage-meter__layer",he.body.appendChild(c)}return c}function g(){c!==null&&(Qe(l``,c),c.remove(),c=null)}function y(he){n!==he&&(n===null&&(document.addEventListener("mousedown",A),document.addEventListener("keydown",W),window.addEventListener("resize",M)),n=he)}function h(){n!==null&&(n=null,document.removeEventListener("mousedown",A),document.removeEventListener("keydown",W),window.removeEventListener("resize",M))}function A(he){let ce=he.target;ce&&(e.contains(ce)||c!==null&&c.contains(ce))||(h(),z())}function M(){z()}function W(he){he.key==="Escape"&&(h(),z())}function Z(he){n===he?h():y(he),z()}function le(){h(),z()}async function V(he,ce){if(r.has(he.key))return;let Ae=Fp(he.key,ce);r.set(he.key,ce),a.delete(Ae),z();let ye=null;try{ye=await(await fetch(he.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ce})})).json()}catch{ye=null}if(t)return;if(r.delete(he.key),!ye||ye.ok!==!0){let se=ye&&typeof ye.error=="string"&&ye.error.length>0?ye.error:"network_error";a.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${se}`}),z();return}let K=Array.isArray(ye.warnings)?ye.warnings.filter(se=>typeof se=="string"&&se.length>0):[];K.length>0&&a.set(Ae,{kind:"warn",text:K.join(" \xB7 ")}),z(),await xe()}function B(he,ce,Ae,ye){let K=Np(he.pct),ue=`resets ${Dp(he.resetsAt,ye)}${ce?` \xB7 ${Ae}`:""}`;return l`<span
      class="usage-meter__window ${Mp(K)}"
      style=${`--progress: ${K}%`}
      title=${ue}
    >
      <span class="usage-meter__label">${he.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${K}%</span>
    </span>`}function j(he,ce,Ae){let ye=Bp(ce,Ae),K=ce.available&&(ce.held||ye>ol),se=K?`${Math.floor(ye/60)}\uBD84 \uC804 \uCE21\uC815`:"",ue=ce.accounts.filter(qe=>!qe.active).length,$e=`usage-meter__group${K?" usage-meter__group--stale":""}`,He=l`<span class="usage-meter__provider"
        >${he.label}</span
      >
      ${ce.available?ce.windows.map(qe=>B(qe,K,se,Ae)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ue>0?l`<span class="usage-meter__badge">+${ue}</span>`:""}`;if(ce.accounts.length===0)return l`<span
        class=${$e}
        aria-label=${`${he.label} usage`}
        >${He}</span
      >`;let ge=n===he.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${$e}`}
      aria-label=${`${he.label} usage`}
      aria-expanded=${ge?"true":"false"}
      aria-controls=${Ip}
      @click=${()=>Z(he.key)}
    >
      ${He}
    </button>`}function G(he,ce){return l`<span class="usage-meter" aria-label="Usage">
      ${he.map(Ae=>j(Ae.provider,Ae.snapshot,ce))}
    </span>`}function P(he,ce){let Ae=Np(he.pct),ye=Dp(he.resetsAt,ce);return l`<span
      class="usage-meter__account-window ${Mp(Ae)}"
      style=${`--progress: ${Ae}%`}
    >
      <span class="usage-meter__account-key">${he.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ae}%</span>
      <span class="usage-meter__account-reset"
        >${ye.length>0?`\u21BB ${ye}`:""}</span
      >
    </span>`}function L(he,ce){return Zh.includes(ce)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${he.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ne(he,ce,Ae){let ye=ce.status==="ok",K=typeof ce.ageSeconds=="number"&&ce.ageSeconds>ol,se=a.get(Fp(he.key,ce.number)),ue=r.get(he.key),$e=ue!==void 0,He=ue===ce.number,ge=["usage-meter__account"];return ce.active&&ge.push("usage-meter__account--active"),ye||ge.push("usage-meter__account--unavailable"),K&&ge.push("usage-meter__account--stale"),l`<div class=${ge.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${ce.email}
          >${ce.alias===null?ce.email:ce.alias}</span
        >
        ${ce.plan===null?"":l`<span class="usage-meter__account-tag">${ce.plan}</span>`}
        ${ce.active?l`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${ce.ageSeconds===null?"":l`<span class="usage-meter__account-age"
              >${Qh(ce.ageSeconds)}</span
            >`}
        ${ce.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${$e}
              @click=${()=>{V(he,ce.number)}}
            >
              ${He?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${ye?l`<div class="usage-meter__account-windows">
            ${ce.windows.map(qe=>P(qe,Ae))}
          </div>`:l`<div class="usage-meter__account-status">
            ${L(he,ce.status)}
          </div>`}
      ${se===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${se.kind}"
          >
            ${se.text}
          </div>`}
    </div>`}function Ee(he,ce,Ae){let ye=ce.accounts.filter(K=>K.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${he.label} · 활성 ${ye} / 전체
        ${ce.accounts.length}
      </h2>
      ${ce.accounts.map(K=>ne(he,K,Ae))}
    </section>`}function ke(he,ce){return l`<div
      class="usage-meter__card"
      id=${Ip}
      role="dialog"
      aria-label=${`${he.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${Ee(he.provider,he.snapshot,ce)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function z(){let he=Date.now(),ce=[];for(let ye of qp){let K=o.get(ye.key);K&&ce.push({provider:ye,snapshot:ny(K,he)})}if(ce.length===0){h(),u();return}let Ae=ce.find(ye=>ye.provider.key===n&&ye.snapshot.accounts.length>0);Ae||h(),Qe(G(ce,he),e),e.hidden=!1,Ae?te(Ae,he):g()}function te(he,ce){let Ae=d(),ye=e.getBoundingClientRect(),K=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${ye.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,K-ye.right)}px`),Qe(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${le}
        ></div>
        ${ke(he,ce)}`,Ae)}async function me(he){try{let ce=await fetch(he.endpoint);return ce.ok?ty(await ce.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function xe(){i+=1;let he=i,ce=await Promise.all(qp.map(async Ae=>({provider:Ae,read:await me(Ae)})));if(!(t||he!==i)){for(let Ae of ce){let ye=Ae.provider.key;if(Ae.read.kind==="ok"){o.set(ye,Ae.read.snapshot);continue}if(Ae.read.kind==="empty"){o.delete(ye);continue}let K=o.get(ye);K!==void 0&&!K.held&&o.set(ye,{...K,held:!0})}z()}}return u(),xe(),s=setInterval(()=>{xe()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),h(),u()}}}function Wp(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var ry="worker-ineligible";function Ms(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function zp(e){return Ms(e).includes(ry)}var sy="session-preferred",oy=["exclusive_machine"];function Hp(e,t){if(!Ms(e).includes(sy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&oy.includes(n)?n:""}var ay="worker-serial";function al(e){return Ms(e).includes(ay)}function il(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var iy=new Set(["done","failed","orphaned","stopped","discarded"]),ly={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},cy={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},uy={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function ll(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:uy[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Gp(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,u=new Map,d=!1,g=null,y=null,h=null,A=new Set,M=!1,W=0,Z=null,le=new Set;function V(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function B(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function j(){return o&&o()||""}async function G(){if(!s)return;let x=++W;M=!0,h=null,A.clear(),Ve();try{let b=await s("worker-parallel-analysis-targets",{root_dir:j()});if(x!==W||!De)return;let $=Array.isArray(b?.qualified)?b.qualified:[],U=Array.isArray(b?.excluded)?b.excluded:[];h={qualified:$,excluded:U};for(let oe of $)oe&&typeof oe.id=="string"&&A.add(oe.id)}catch{x===W&&De&&(h={qualified:[],excluded:[]},pe("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{x===W&&(M=!1,De&&Ve())}}function P(x){return Array.isArray(x.runs)?x.runs:[]}function L(){let x=V(),b=new Set;for(let $ of Object.values(x.attempts||{})){let U=$;U&&typeof U.bead_id=="string"&&!iy.has(U.status)&&b.add(U.bead_id)}for(let $ of Array.isArray(x.pr_wait)?x.pr_wait:[])$&&typeof $.bead_id=="string"&&b.add($.bead_id);for(let $ of Object.values(x.discard_operations||{})){let U=$;U&&U.phase!=="done"&&typeof U.bead_id=="string"&&b.add(U.bead_id)}return b}function ne(x){return x.filter(b=>Ee(b)===null)}function Ee(x){let b=V();for(let $ of Array.isArray(b.serial_lanes)?b.serial_lanes:[])if(Array.isArray($?.entries)&&$.entries.some(U=>U.bead_id===x))return $.id;return(Array.isArray(b.queue)?b.queue:[]).some($=>$.bead_id===x)?"parallel":null}function ke(x,b){let $=c.get(x);return $||[...b.order]}function z(x){if(x.length<2)return!1;let b=Ee(x[0]);if(!b||b==="parallel")return!1;let $=V(),U=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).find(ae=>ae.id===b)?.entries.map(ae=>ae.bead_id);if(!Array.isArray(U))return!1;let oe=x.map(ae=>U.indexOf(ae));return oe.every(ae=>ae>=0)&&oe.every((ae,we)=>we===0||ae>oe[we-1])}function te(){let x=V(),b=Array.isArray(x.serial_lanes)?x.serial_lanes:[],$=b.find(U=>Array.isArray(U.entries)&&U.entries.length===0);return $?$.id:b[0]?.id||"s1"}function me(x){let b=V().bead_titles||{};return typeof b[x]=="string"?b[x]:x}async function xe(x,b){if(!s||d)return null;d=!0,Ve();try{return await s(x,b)}finally{d=!1,Ve()}}async function he(x){r?.setPending?.(!0);try{let b=await xe("worker-parallel-analysis-start",{force:x,target_ids:Array.from(A)});b&&b.applied===!1&&b.reason&&(b.reason==="target_not_qualified"&&Array.isArray(b.detail)?pe(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${b.detail.join(", ")}`,"error",3200):pe(`\uBD84\uC11D \uC2E4\uD328: ${b.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ce(){let x=B().job;!s||!x||await s("worker-parallel-analysis-cancel",{job_id:x.job_id})}async function Ae(x){if(!(!s||le.has(x))){le.add(x),Ve();try{let b=await s("worker-parallel-analysis-prompt",{root_dir:j(),run_id:x});if(!De)return;if(b?.ok===!0&&typeof b.prompt=="string"){Z={run_id:x,prompt:b.prompt};return}pe(b?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{le.delete(x),Ve()}}}function ye(){Z=null,Ve()}async function K(){if(!Z)return;let x=await fn(Z.prompt);pe(x?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",x?"success":"error",1400)}function se(x,b){a&&a(x,ll(b))}function ue(){return V().runner_catalog}function $e(x){return Object.keys(ue()?.runners?.[x]?.models||{})}function He(x){let b=$e(x),$=ue()?.runners?.[x]?.default_model;return typeof $=="string"&&b.includes($)?$:b[0]||""}function ge(){let x=B().settings,b=g||x.runner||"claude",$=$e(b),U=g?He(b):x.model||$[0]||"",oe=il(ue(),b,U),ae=x.effort||"",we=oe.includes(ae)?ae:oe[0]||"";return{runner:b,model:U,effort:we,models:$,efforts:oe}}async function qe(x){let b=B().settings,$=await xe("worker-parallel-analysis-settings-update",{expected_revision:b.revision,runner:x.runner,model:x.model,effort:x.effort});(!$||$.applied!==!0)&&(g=null,Ve(),$&&$.reason&&pe(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${$.reason}`,"error",2800))}function N(x){g=x,Ve();let b=ge();qe({runner:x,model:b.model,effort:b.effort})}function be(x){let b=ge(),$=il(ue(),b.runner,x);qe({runner:b.runner,model:x,effort:$.includes(b.effort)?b.effort:$[0]||""})}function Le(x){let b=ge();qe({runner:b.runner,model:b.model,effort:x})}async function Ue(x,b){if(!s||d)return;let $=ke(x,b),U=B();if($.length<2||!U.last_good){pe("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let oe=u.get(x)||te(),ae=()=>({snapshot_digest:U.last_good.identity_digest,group_index:x,lane:oe,ordered_bead_ids:$,expected_revision:V().revision});d=!0,Ve();try{let we=await s("worker-parallel-analysis-submit",ae());we&&we.queue&&n&&n.set(we.queue),we&&we.applied!==!0&&we.conflict===!0&&(we=await s("worker-parallel-analysis-submit",ae()),we&&we.queue&&n&&n.set(we.queue)),we&&we.applied===!0?(c.delete(x),pe(`\uC9C1\uB82C \uB808\uC778 ${oe}\uC5D0 ${$.length}\uAC1C \uBC30\uCE58`,"success")):pe(`\uC81C\uCD9C \uAC70\uBD80: ${we?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,Ve()}}function ze(x,b,$){c.set(x,ke(x,b).filter(U=>U!==$)),Ve()}function We(x){c.delete(x),Ve()}function Ge(x,b,$,U){let oe=[...ke(x,b)],ae=oe.indexOf($),we=ae+U;ae<0||we<0||we>=oe.length||(oe.splice(we,0,...oe.splice(ae,1)),c.set(x,oe),Ve())}function et(){let x=B().settings,b=Object.keys(ue()?.runners||{}),$=ge();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${U=>N(U.target.value)}
        >
          ${b.map(U=>l`<option
                value=${U}
                ?selected=${$.runner===U}
              >
                ${U}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${U=>be(U.target.value)}
        >
          ${$.models.map(U=>l`<option
                value=${U}
                ?selected=${$.model===U}
              >
                ${U}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${U=>Le(U.target.value)}
        >
          ${$.efforts.map(U=>l`<option
                value=${U}
                ?selected=${$.effort===U}
              >
                ${U}
              </option>`)}
        </select>
      </label>
      ${it(x)}
    </div>`}function it(x){return!$t(x)||ft(x)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:x.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${x.runner}/${x.model} · effort
        ${x.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:x.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function ft(x){return x.is_default===!0&&x.compatible===!1}function $t(x){return!!(x.runner&&x.model&&x.effort)}function _t(x){return $t(x)&&x.compatible!==!1}function Q(x){let b=Math.max(0,Math.floor(x/1e3)),$=Math.floor(b/60),U=b%60;return`${$}:${String(U).padStart(2,"0")}`}function ee(x){let b=x.job;if(b){let $=typeof b.started_at=="number"?b.started_at:0,U=`${b.runner||"?"}/${b.model||"?"}`,oe=$?` \xB7 \uACBD\uACFC ${Q(Date.now()-$)}`:"",ae=typeof b.session_id=="string"?b.session_id:"",we=P(x).find(Re=>Re.run_id===b.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${U} · effort ${b.effort||"?"}${oe}</span
        >
        ${ae?l`<code class="pa-session-id" title=${ae}
              >${ae.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>se(b.job_id,we||b)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${we?.prompt_saved!==!0||le.has(b.job_id)}
          @click=${()=>{Ae(b.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Ne()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Oe(x){let b=ee(x);return b===""?"":l`<div class="pa__strip">${b}</div>`}function Ne(){return r?.isPending?.()===!0}function Te(x){let b=!!x.job,$=_t(x.settings),U=h!==null&&A.size===0,oe=b||d||Ne()||M;return l`<div class="pa-meta">
      ${x.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(x.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!$||oe||U}
        @click=${()=>{he(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!$||oe||U}
        @click=${()=>{he(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!b}
        @click=${()=>{ce()}}
      >
        취소
      </button>
    </div>`}function Pe(x){return typeof x=="string"&&x.length>0?x:"\uBBF8\uBC30\uCE58"}function je(x,b){b?A.add(x):A.delete(x),Ve()}function ot(x){let b=Array.isArray(x.scope)?x.scope:[],$=Array.isArray(x.overlaps)?x.overlaps:[];return b.length===0&&$.length===0?l``:l`<span class="pa-target__signals">
      ${b.length>0?l`<details class="pa-target__scope" title=${b.join(`
`)}>
            <summary>scope ${b.length}</summary>
            <ul>
              ${b.map(U=>l`<li><code>${U}</code></li>`)}
            </ul>
          </details>`:""}
      ${$.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${$.join(", ")}`}
            >겹침 ${$.join(", ")}</span
          >`:""}
    </span>`}function nt(){let x=h?.qualified||[],b=h?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${M?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${x.length} \xB7 \uC81C\uC678 ${b.length}`}</span
        >
      </header>
      ${h&&x.length>0?l`<ul class="pa-targets__list">
            ${x.map($=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${$.id}
                      .checked=${A.has($.id)}
                      @change=${U=>je($.id,U.target.checked)}
                    />
                    <span class="pa-target__title">${$.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${ot($)}
                    <span class="pa-target__route">${$.route}</span>
                    <span class="pa-target__lane"
                      >${Pe($.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:h&&x.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${h&&b.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${b.length}</summary>
            <ul class="pa-targets__list">
              ${b.map($=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${$.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${ly[$.reason]||$.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${Pe($.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function tt(x){let b=typeof x.session_id=="string"&&x.session_id.length>0,$=b?x.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${x.outcome}"
        >${cy[x.outcome]||x.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(x.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${x.runner||"?"} / ${x.model||"?"} / ${x.effort||"?"}</span
      >
      ${b?l`<code class="pa-session-id" title=${$}
            >${$.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${x.outcome==="failure"&&x.reason?l`<span class="pa-run-row__reason">${x.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>se(x.run_id,x)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${x.prompt_saved!==!0||le.has(x.run_id)}
          @click=${()=>{Ae(x.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function yt(x){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${x.length>0?l`<ul class="pa-runs__list">
            ${x.map(b=>tt(b))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function It(){return Z?l`<div
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
            <code>${Z.run_id}</code>
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
${Z.prompt}</pre
        >
      </section>
    </div>`:""}function mt(x,b){let $=ke(x,b),U=L(),oe=$.filter(Ce=>U.has(Ce)),ae=ne($),we=z($),Re=Array.isArray(V().serial_lanes)?V().serial_lanes:[],Je=u.get(x)||te(),ct=b.eligible!==!0||$.length<2||oe.length>0||ae.length>0||we||d;return l`<section class="pa-group" data-group-index=${String(x)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${b.confidence}</span>
        ${b.categories.map(Ce=>l`<span class="pa-group__category">${Ce}</span>`)}
        ${we?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${b.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${ae.length>0?l`<span class="pa-group__stale"
              >stale — ${ae.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${b.reason}</p>
      <ol class="pa-group__members">
        ${$.map((Ce,pt)=>l`<li class="pa-member" data-bead-id=${Ce}>
              <span class="pa-member__seq">${pt+1}</span>
              <span class="pa-member__title">${me(Ce)}</span>
              ${U.has(Ce)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ce}
                ?disabled=${pt===0}
                aria-label=${`${Ce} \uC704\uB85C`}
                @click=${()=>Ge(x,b,Ce,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ce}
                ?disabled=${pt===$.length-1}
                aria-label=${`${Ce} \uC544\uB798\uB85C`}
                @click=${()=>Ge(x,b,Ce,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ce}
                aria-label=${`${Ce} \uC81C\uC678`}
                @click=${()=>ze(x,b,Ce)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${b.evidence.map(Ce=>l`<li class="pa-evidence">
              <code>${Ce.path}</code>
              <span class="pa-evidence__locator">${Ce.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>We(x)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ce=>{u.set(x,Ce.target.value),Ve()}}
          >
            ${Re.map((Ce,pt)=>l`<option
                  value=${Ce.id}
                  ?selected=${Je===Ce.id}
                >
                  직렬 ${pt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${ct}
          @click=${()=>{Ue(x,b)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Mt(x){let b=Array.isArray(x.issues)?x.issues:[],$=b.filter(oe=>oe.verdict==="parallel_ok").length,U=b.filter(oe=>oe.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${$}</span>
      <span>uncertain ${U}</span>
    </div>`}function vt(){let x=De&&!!B().job;if(x&&y===null){y=setInterval(()=>Ve(),1e3);return}!x&&y!==null&&(clearInterval(y),y=null)}function Ve(){let x=B();g&&x.settings.runner===g&&(g=null);let b=x.last_good?.result;vt(),Qe(l`
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
          ${Oe(x)}
          <div class="pa__body">
            ${et()} ${Te(x)} ${nt()}
            ${b?l`${b.groups.map(($,U)=>mt(U,$))}
                ${b.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Mt(b)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${yt(P(x))}
          </div>
        </div>
        ${It()}
      `,i)}let De=!1,D=()=>{De=!1,Z=null,W+=1,vt()},X=x=>{x.target===x.currentTarget&&fe()};i.addEventListener("close",D),i.addEventListener("cancel",D),i.addEventListener("click",X);let de=null;n&&n.subscribe&&(de=n.subscribe(()=>{De&&Ve()}));let E=null;r&&r.subscribe&&(E=r.subscribe(()=>{De&&Ve()}));function Y(){De||(De=!0,Ve(),G(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function fe(){De&&(De=!1,Z=null,W+=1,vt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:Y,close:fe,destroy(){De=!1,y!==null&&(clearInterval(y),y=null),i.removeEventListener("close",D),i.removeEventListener("cancel",D),i.removeEventListener("click",X),de&&(de(),de=null),E&&(E(),E=null),i.remove()}}}function Yp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let c=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(c.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:c})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let c=fa(s[a].scope,s[i].scope);if(c.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:c}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:c})}return n}var Kp=["parallel","serial","candidate"];function Vp(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function cl(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=Kp.includes(r.kind),c=Kp.includes(s.kind);if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&c&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&c&&a===null){let u=dy(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!c?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:`${Vp(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Vp(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function dy(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Zp=new Set(["sh","bash","zsh","dash","ksh"]),Xp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Qp(e){let t=e.split("/");return t[t.length-1]||""}function py(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Qp(n[0]);if(r!=="env")return Zp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Zp.has(Qp(s))}function fy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function _y(e){let t=[],n=0;Xp.lastIndex=0;for(let r of e.matchAll(Xp)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:fy(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function my(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Jp(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",c=0,u=null,d=!1;function g(j,G){return G?_y(j).map(P=>P.kind==="plain"?P.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${P.kind}"
            >${P.text}</span
          >`):j}function y(){if(!s)return l``;let j=o==="ready"&&py(a),G=o==="ready"?a.split(`
`):[];return l`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>V()}
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
              @click=${()=>{A()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>V()}
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
                  ${G.map((P,L)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${L+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${g(P,j)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function h(){Qe(y(),r)}async function A(){if(o!=="ready")return;let j=await fn(a);pe(j?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",j?"success":"error")}function M(j){j.key==="Escape"&&s&&(j.preventDefault(),V())}function W(){d||(document.addEventListener("keydown",M),d=!0)}function Z(){d&&(document.removeEventListener("keydown",M),d=!1)}async function le(j,G=null){let P=++c;W(),s={...j},u=G||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",h(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ne=t?t():"";if(!ne){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",h();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",h();return}let Ee="/api/repo-ops-script?workspace="+encodeURIComponent(ne)+"&lane="+encodeURIComponent(j.lane)+"&base_sha="+encodeURIComponent(j.base_sha);try{let ke=await n(Ee),z=await ke.json().catch(()=>({}));if(P!==c)return;if((t?t():"")!==ne){V();return}if(!ke.ok||!z||z.ok!==!0){o="error",i=my(z&&typeof z.error=="string"?z.error:""),h();return}s={lane:z.lane,base_sha:z.base_sha,path:z.path,base_ref:z.base_ref},a=String(z.content),o="ready",h()}catch{if(P!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",h()}}function V(){c+=1,Z(),s=null,a="",h();let j=u;u=null,j?.isConnected&&j.focus()}function B(){V(),r.remove()}return{open:le,close:V,destroy:B}}function ef(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let P=o();return typeof P.revision=="number"?P.revision:0}function i(P){t&&P&&P.queue&&typeof P.queue=="object"&&t.set(P.queue)}function c(){let P=o().workspace_info;return P&&typeof P=="object"?P:{}}function u(P,L){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${P}"
      >${L}</span
    >`}function d(P){if(typeof P!="number"||!Number.isFinite(P))return"";let L=P/6e4;return Number.isInteger(L)?`timeout ${L}\uBD84`:`timeout ${Math.round(P/1e3)}\uCD08`}function g(P){let L=d(P);return L?u("config",L):""}function y(P,L,ne){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${ne.script}
      @click=${Ee=>{s&&s({lane:P,base_sha:L.base_sha,path:ne.script,base_ref:L.base_ref},Ee.currentTarget)}}
    ></button>`}function h(){let P=o().repo_ops_opt_out;return{verify:P?.verify===!0,deploy:P?.deploy===!0}}function A(P,L){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!L}
        @change=${ne=>{le(P,!ne.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function M(P){let L=typeof P.base_sha=="string"?P.base_sha:"",ne=`${P.source_path||"repo-ops/config.toml"} @ ${P.base_ref||"?"}${L?`@${L.slice(0,7)}`:""}`,Ee=h(),ke=!!P.verify&&Ee.verify,z=!!P.deploy&&Ee.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${ne}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ke?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${P.verify?l`${y("verify",P,P.verify)}
              ${g(P.verify.timeout_ms)}
              ${ke?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ke?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":P.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${P.verify?A("verify",Ee.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${z?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${P.deploy?l`${y("deploy",P,P.deploy)}
              ${g(P.deploy.timeout_ms)}
              ${z?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${z?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":P.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${P.deploy?A("deploy",Ee.deploy):""}
      </div>
    </section>`}function W(P){let L=P.repo_ops&&typeof P.repo_ops=="object"?P.repo_ops:null;return L&&(L.status==="resolved"||L.status==="absent")?M(L):L&&(L.status==="pending"||L.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${L.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${L.error_code?l` — <code>${L.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function Z(P){if(!n)return;let L=await n("worker-auto-repair-toggle",{on:P,expected_revision:a()});if(i(L),L&&L.conflict){let ne=await n("worker-auto-repair-toggle",{on:P,expected_revision:a()});i(ne)}r()}async function le(P,L){if(!n)return;let ne=await n("worker-repo-ops-opt-out-toggle",{kind:P,opted_out:L,expected_revision:a()});if(i(ne),ne&&ne.conflict){let Ee=await n("worker-repo-ops-opt-out-toggle",{kind:P,opted_out:L,expected_revision:a()});i(Ee)}r()}let V={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function B(P,L,ne){return l`<div class="worker-repo-ops__policy-group" data-policy=${ne}>
      <div class="worker-repo-ops__policy-label">${P}</div>
      <ul class="worker-repo-ops__policy-list">
        ${L.map(Ee=>l`<li data-token=${Ee}>
              ${V[Ee]||Ee}
            </li>`)}
      </ul>
    </div>`}function j(P){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${P.map(L=>{let ne=[V[L.trigger]||L.trigger];return Number.isInteger(L.attempts_per_operation_attempt)?ne.push(`operation\uB2F9 ${L.attempts_per_operation_attempt}\uD68C`):Number.isInteger(L.attempts)?ne.push(`${V[L.budget]||L.budget} ${L.attempts}\uD68C`):Number.isInteger(L.sessions_per_user_action)&&ne.push(`${L.sessions_per_user_action}\uD68C`,V[L.user_actions]||L.user_actions),L.applies_when&&ne.push(V[L.applies_when]||L.applies_when),l`<li data-token=${L.id}>
            <strong>${V[L.id]||L.id}</strong>
            <span>${ne.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function G(){let P=o(),L=P.auto_repair!==!1,ne=P.repo_operation_policy&&typeof P.repo_operation_policy=="object"?P.repo_operation_policy:null,Ee=Array.isArray(P.repo_operations)?P.repo_operations:[],ke=Ee.find(xe=>xe.state==="repairing"),z=Ee.filter(xe=>xe.state==="failed"||xe.state==="repairing"),te=z.length?Math.min(...z.map(xe=>typeof xe.repair?.remaining=="number"?xe.repair.remaining:0)):ne?.auto_repair?.resolution_ladder?.find(xe=>xe.id==="auto_repair_session")?.attempts??1,me=Array.isArray(ne?.auto_repair?.resolution_ladder)?ne.auto_repair.resolution_ladder:[];return l`<section
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
          .checked=${L}
          @change=${xe=>{Z(xe.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${L?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${te}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${ke?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${ke.repair?.owner_bead||ke.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
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
                ${me.length} · 금지
                ${(ne.never_automatic||[]).length}</span
              >
            </summary>
            ${B("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",ne.worker_automatic||[],"worker-automatic")}
            ${ne.supported===!1||ne.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${ne.schema_version})`}
                </div>`:j(me)}
            ${B("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",ne.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${W(c())} ${G()}
      </details>`}}}var sf=20,gy=5,by=new Set(["failed","repairing","running","queued","retry_pending"]),tf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},nf={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function hy(e,t,n=sf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function yy(e){if(e.type==="cleanup")return!0;let t=e.operation;return by.has(t.state)&&!t.dismissed&&!t.superseded_by}function vy(e,t,n={}){let r=hy(e,t,1/0),s=n.expanded===!0?sf:gy,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||yy(i));return{visible:a,hidden:r.length-a.length}}function rf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function wy(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function of(e){let t=e.filter(n=>n.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>l`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function af(e,t="",n=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function ky(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(nf,r)?nf[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function $y(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Kt(e.at):""}
      >${Jo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${rf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(tf,t.kind)?tf[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Zo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Ts(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${rf(e)}"
          >${wy(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?af(Rd(t.failure_kind,r)):""}
      ${ky(t)}
      ${of([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Zo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function xy(e){let t=e.cleanup,n=yr(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Kt(e.at):""}
      >${Jo(e.at)||"\u2014"}</span
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
        ${Jd(t.step).map(r=>l`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${af(oa(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${of([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Ay(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?xy(r):$y(r))}
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
  </section>`}function lf(e,t={}){let n=null;function r(){if(n===null){Qe(l``,e);return}let a=vy(n.operations,n.cleanup_failures,{expanded:n.expanded});Qe(Ay({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var Sy=Lt("views:worker"),Ey="tab:worker:ready",Ty="tab:worker:blocked",Cy="tab:worker:in-progress",Ry="tab:worker:resolved",Oy="tab:worker:closed",ya=1,cf=5;function uf(e){return Mo(e).path.length>0}var Ly=new Set(["quick_fix","spec_backed","full_plan"]);function df(e){return typeof e=="string"&&Ly.has(e)}var mf="beads-ui.worker.candidate-filter",ul={show_blocked:!1,spec:"all"};function Iy(){try{let e=window.localStorage.getItem(mf);if(!e)return{...ul};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ul};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...ul}}}function Py(e){try{window.localStorage.setItem(mf,JSON.stringify(e))}catch{}}function Dy(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=n(i),u=r(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var My=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],gf="bdui.worker.candidate_sort",bf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],pl="spec";function hf(e){return bf.some(t=>t.value===e)?e:pl}function Ny(){try{return hf(window.localStorage.getItem(gf))}catch{return pl}}function qy(e){try{window.localStorage.setItem(gf,e)}catch{}}var yf="bdui.worker.done-range";function Fy(){try{let e=window.localStorage.getItem(yf);return e===null?"today":Rn(e)}catch{return"today"}}function jy(e){try{window.localStorage.setItem(yf,e)}catch{}}var By="(max-width: 640px)",vf="beads-ui.worker.lane-collapsed",Ns={queue:!0,done:!0};function Uy(){try{let e=window.localStorage.getItem(vf);if(!e)return{...Ns};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ns}:{queue:typeof t.queue=="boolean"?t.queue:Ns.queue,done:typeof t.done=="boolean"?t.done:Ns.done}}catch{return{...Ns}}}function Wy(e){try{window.localStorage.setItem(vf,JSON.stringify(e))}catch{}}function pf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function zy(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(fr):t==="updated"?r.sort(so):(r.sort(oo(n)),t==="board"?r:[...r.filter(uf),...r.filter(s=>!uf(s))])}function Hy(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function wf(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}function Gy(e){let t=wf(e);return t.length>0?`\u{1F512} ${t.join(", ")}`:"\u{1F512} blocked"}function ff(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Ky(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Vy(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Yy(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Zy(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Xy(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function dl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Qy=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Jy=new Set(["waiting_metadata","reviewing","retrying"]);function ev(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?Kt(r.next_at):"",c=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",c?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${c}`:""].filter(Boolean),live:!0}}default:return null}}function tv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function nv(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let c=tv(e.terminal_reason);c&&i.push(`\uC6D0 \uC0AC\uC720: ${c}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!Qy.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function _f(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function rv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(_f(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${_f(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=Ky(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${ff(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${ff(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function sv(e,t,n,r,s=null,o=null,a=null,i=!1,c=null,u=!0,d=null,g=null,y=null,h={},A=!1,M=!1,W={},Z=null){let le=!!c&&c.position>0,V=!!c?.continuation_action&&c.continuation_action.continuation===null,B=!!c&&c.active===!0,j=c&&c.failure||null,G=Yy(c?c.waiting:null,y),P=n[e]||null,L=P&&P.gate?P.gate:null,ne=P&&P.pr?P.pr:null,Ee=Zy(c?c.resolution:null),ke=Xy(c?c.head_review:null),z=c&&c.head_review||null,te=ev(y,z),me=nv(y,te),xe=c&&c.authority||null,he=!!z&&["pending","reviewing","revising"].includes(z.state),ce=!!y&&typeof y=="object"&&Jy.has(y.phase),Ae=le&&!B&&(z?.state==="failed"||!xe||ce||xe.source==="automatic"&&!M),ye=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Ee?Ee.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":G,K=!!L&&L.base_badge==="\uCDA9\uB3CC",se=!!L&&L.enabled===!0,ue=Ps({bead_id:e,merge_sha:W.merge_sha,cleanup_cursor:W.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:W.repo_operations}),$e=ga(ue),He=o&&!ue&&(o.queueing??null)?o.queueing:null,ge=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!L&&L.tier==="merged",qe=i&&!!r&&!!L&&L.tier==="merged",N=Ae&&(se||K||L?.reason==="base_behind"||L?.reason==="review_receipt_missing"||L?.reason==="review_receipt_stale"||L?.reason==="review_receipt_undetermined"||ge||qe),be=i&&K&&u===!1,Le=Tn(h,e,{external:i,merge_active:B||ue?.step==="merge",merge_queued:le,conflict_active:!!a,cleanup_active:$e,merged:!!r||L?.tier==="merged"}),Ue=!!Le.operation,ze=!ge&&!!r&&r.step==="repo_operations",We=rv({continuation_required:V,queueing:He,merge_step:ue,conflict_badge:ye,conflict_live:Ee?.live===!0||a==="running",head_review:z&&ke?{...ke,state:z.state,failure_reason:z.failure_reason}:null,auto_resolution:te,recovery:me,cleanup_failed:r,cleanup_label:r?yr(r.step):null,base_exception:g,conflicting:K,gate:L,receipt_check:P&&P.receipt_check?P.receipt_check:null,queue_failure:j,auto_skip:d,queued:le,queue_active:B,queue_position:c?c.position:0,activity:ye?null:o&&o.activity||null}),Ge=We?.live===!0&&We.title?l`<span title=${We.title}>${We.label}</span>`:We?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ue?.active!==!0?ma(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,...Z?{dependency_chips:Z}:{},external:i,pr_number:ne&&typeof ne.number=="number"?ne.number:null,pr_url:ne&&typeof ne.url=="string"?ne.url:"",completion_badge:We?.live!==!0&&We?.title?We.label:null,completion_title:We?.title||"",completion_repair_pr_url:me?me.repair_pr_url:"",completion_repair_pr_number:me?me.repair_pr_number:null,badges:Ge?[Ge]:[],live_badge:We?.live===!0?Ge:null,usage:s,alert:We?.alert===!0,merge_action:L?.tier==="merged"&&!ge&&!qe||ze?!1:!le||V||Ae,timeline_action:ze,cancel_action:le&&!V,cancel_enabled:(!B||he)&&!(me&&me.lock_actions),cancel_title:me&&me.lock_actions?`${me.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:B&&!he?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":he?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Le,discard_action:Le.action,merge_step:ue,discard_enabled:Le.enabled,discard_title:Le.title,merge_enabled:!ue&&!He&&!a&&!Ue&&!g&&!(me&&me.lock_actions)&&!be&&!ze&&(se||K||L?.reason==="base_behind"||L?.reason==="review_receipt_missing"||L?.reason==="review_receipt_stale"||L?.reason==="review_receipt_undetermined"||ge||qe||N||ce&&!B),merge_label:V?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ge||qe?"\uC815\uB9AC \uC7AC\uAC1C":K&&!ue&&!ge?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":L?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":L?.reason==="review_receipt_missing"||L?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Ae?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Ue?Le.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Le.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Le.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:V?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":He?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ue?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ue.label}`:qe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":be?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":K?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":L?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":L?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":L?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":L?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":L?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":se?`\uBA38\uC9C0 (${L.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:L&&L.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${L&&L.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function fl(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,openDoc:d,doneRange:g,onDoneRangeChange:y}=t,h=r?io(r,i):null,A=po({transport:n,uiOrderStore:i}),M=null,W=[],Z=Iy(),le=null,V=null,B={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},j=Ny(),G=g?Rn(g):Fy(),P=new Map;function L(){let f=Tr.find(k=>k.value===G);return f?f.label:"\uC624\uB298"}let ne=Uy(),Ee=!1,ke=new Set,z=new Set,te=new Set,me=new Set,xe=new Set,he={},ce=null,Ae=0,ye=null,K=[];function se(f){return ce===f?he:{}}async function ue(){if(!n)return;let f=u?.()||"";if(ce===f||ye&&ye.key===f&&ye.generation===Ae)return;let k=++Ae;ye={key:f,generation:k};let q=null;try{q=await Promise.resolve(n("get-session-defaults",{}))}catch(re){if(k!==Ae)return;ye=null,Sy("get-session-defaults failed: %o",re),Ke();return}k===Ae&&(he=q&&typeof q.values=="object"&&q.values!==null?{...q.values}:{},ce=f,ye=null,Ke())}function $e(){ce=null,Ae+=1,ue()}let He=document.createElement("div");He.className="worker-console";let ge=document.createElement("div");ge.className="worker-top";let qe=document.createElement("div");qe.className="worker-drawer-overlay",qe.hidden=!0;let N=document.createElement("div");N.className="worker-drawer-overlay__backdrop";let be=document.createElement("div");be.className="worker-drawer-host";let Le=document.createElement("div");Le.className="worker-drawer-host",Le.hidden=!0,qe.append(N,be,Le);let Ue=document.createElement("div");Ue.className="worker-lanes-host",He.append(ge,qe,Ue),e.appendChild(He);let ze=null,We=null,Ge=Br(be,{transport:n,sessionLogStore:a,onClose:()=>{ze=null,We=null,qe.hidden=!0,Ke()}}),et=lf(Le,{onClose:()=>{Le.hidden=!0,qe.hidden=!0,Ke()}}),it=Jp({getWorkspacePath:u||(()=>"")}),ft=u&&u()||"",$t=ef({queueStore:s,transport:n,onChanged:()=>Ke(),onOpenScript:(f,k)=>{it.open(f,k)}}),_t=o?Gp(He,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(f,k)=>gn(f,k)}):null;function Q(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:ya,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ee(){let f=Q(),k=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,q=Array.isArray(f.serial_lanes)?f.serial_lanes:[],re=[];for(let m of q){if(re.length>=k)break;!m||typeof m.id!="string"||!/^s[1-5]$/.test(m.id)||!Array.isArray(m.entries)||re.push({id:m.id,label:`\uC9C1\uB82C ${m.id.slice(1)}`,count:m.entries.length})}return re.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},...re]}function Oe(f){if(!le||!f.some(q=>q.id===le))return null;let k=ee();return k?{bead_id:le,lanes:k}:null}function Ne(){let f=Q();return typeof f.revision=="number"?f.revision:0}function Te(f){f&&f.queue&&s&&s.set(f.queue)}function Pe(){let f=Q().queue;return Array.isArray(f)?f.length:0}async function je(f,k,q){if(!n)return;let re=()=>({bead_id:f,...k==="parallel"?{}:{lane:k},...q===void 0?{}:{index:q},expected_revision:Ne()}),p=await n("worker-queue-place",re());Te(p),p&&p.conflict&&await n("worker-queue-place",re()).then(Te)}async function ot(f,k,q){if(!n)return;let re=()=>({bead_id:f,...k==="parallel"?{}:{lane:k},to_index:q,expected_revision:Ne()}),p=await n("worker-queue-reorder",re());Te(p),p&&p.conflict&&await n("worker-queue-reorder",re()).then(Te)}async function nt(f){if(!n)return;let k=await n("worker-queue-remove",{bead_id:f,expected_revision:Ne()});Te(k),k&&k.conflict&&await n("worker-queue-remove",{bead_id:f,expected_revision:Ne()}).then(Te)}async function tt(f){if(!n||!f)return;let k=await n("worker-attempt-pause",{attempt_id:f});k&&k.paused===!1&&k.reason&&pe(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function yt(f){if(!n||!f)return;let k=await Mr();if(k===null)return;let q=async(p={})=>await n("worker-attempt-resume",{attempt_id:f,expected_revision:Ne(),...k!==""?{instructions:k}:{},...p}),re=await q();Te(re),re&&re.conflict&&(re=await q(),Te(re)),re=await qn(re,(p,m)=>q({continuation:p,decision_token:m}),{onResult:Te,refresh:()=>q()}),re&&re.resumed===!1&&!re.conflict&&re.reason&&pe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${re.reason}`,"error",2400)}async function It(f){if(!n||!f)return;let k=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:Ne()});Te(k),k&&k.conflict&&(k=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:Ne()}),Te(k)),k&&k.dismissed===!1&&!k.conflict&&k.reason&&pe(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function mt(f,k,q=!0){if(!n)return null;let re=n,p=await re(f,{...k,expected_revision:Ne()});return Te(p),p&&p.conflict&&q&&(p=await re(f,{...k,expected_revision:Ne()}),Te(p)),p}async function Mt(f){if(!n||!f)return;let k=Q().merge_queue?.find(re=>re.bead_id===f)?.continuation_action;if(k?.mismatch&&k.continuation===null){await Ve(f,k.mismatch);return}ke.add(f),Ke();let q;try{q=await mt("worker-merge-queue-add",{bead_id:f})}catch{pe("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ke.delete(f),Ke()}if(!(!q||q.applied)){if(q.conflict){pe("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}pe(Vy(q.reason),"error",2400)}}async function vt(f){if(!(!n||!f||z.has(f))){z.add(f),Ke();try{let k=await n("worker-cleanup-retry",{bead_id:f,expected_revision:Ne()});Te(k),k&&!k.retried&&!k.conflict&&k.reason&&pe(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${k.reason}`,"error",2400)}finally{z.delete(f),Ke()}}}async function Ve(f,k){let q=await qn({continuation_mismatch:k},(p,m)=>mt("worker-merge-queue-add",{bead_id:f,continuation:p,decision_token:m},!1)),re=q?.queue?.merge_queue?.find(p=>p.bead_id===f)?.continuation_action;if(q?.applied!==!0&&re?.continuation===null&&re.mismatch){await Ve(f,re.mismatch);return}q&&q.applied===!1&&!q.conflict&&pe("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function De(f){if(!n)return;let k=await mt("worker-merge-auto-toggle",{on:f});!k||k.conflict||pe(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function D(f){if(!n||!f)return;let k=await mt("worker-merge-queue-remove",{bead_id:f});k&&!k.conflict&&!k.applied&&k.reason==="merge_active"&&pe("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function X(){await mt("worker-merge-queue-remove",{all:!0})}async function de(f,k=null,q="unmerged",re=null){if(!n||!f)return;let p=Cs(f,q);if(!(!!re||typeof globalThis.confirm!="function"||globalThis.confirm(p)))return;let w=await n("worker-discard",{bead_id:f,...k?{attempt_id:k}:{},...re?{operation_id:re}:{},expected_revision:Ne()});if(Te(w),w&&w.conflict&&(w=await n("worker-discard",{bead_id:f,...k?{attempt_id:k}:{},...re?{operation_id:re}:{},expected_revision:Ne()}),Te(w)),w&&w.discarded===!0){pe(ea(w),"success",5e3);return}if(w&&w.reason){pe(`\uD3D0\uAE30 \uC2E4\uD328: ${w.reason}`,"error",2800);return}if(w&&w.accepted&&w.pending==="merged_revert"){pe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(w&&w.accepted&&!w.discarded){pe(`\uD3D0\uAE30 \uC9C4\uD589: ${w.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}w&&!w.conflict&&pe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function E(f,k,q){if(!(!n||!k||!q||me.has(k))){me.add(k),Ke();try{let re=await n(f,{bead_id:k,action_id:q,expected_revision:Ne()});Te(re),re?.conflict?pe("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!re?.ok&&re?.reason&&pe(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(re.reason)}`,"error",2800)}finally{me.delete(k),Ke()}}}async function Y(f,k){if(!n||!k||te.has(k))return;te.add(k),Ke();let q;try{let re=async(p={})=>await n(f,{bead_id:k,expected_revision:Ne(),...p});q=await re(),Te(q),q&&q.conflict&&(q=await n(f,{bead_id:k,expected_revision:Ne()}),Te(q)),f==="worker-revise-fix"&&(q=await qn(q,(p,m)=>re({continuation:p,decision_token:m}),{onResult:Te,refresh:()=>re()}))}finally{te.delete(k),Ke()}if(!(!q||q.conflict)){if(q.ok){pe(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}pe(`\uCC98\uBD84 \uAC70\uBD80: ${q.reason||""}`,"error",3e3)}}async function fe(f){if(!n)return;let k=await n("worker-automation-toggle",{on:f,expected_revision:Ne()});Te(k),k&&k.conflict&&await n("worker-automation-toggle",{on:f,expected_revision:Ne()}).then(Te)}async function x(f){if(!n||!f)return;let k=await n("worker-repo-operation-repair",{operation_id:f});if(Te(k),k&&k.ok===!1){pe(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${k.reason||""}`,"error",3e3);return}k&&k.ok===!0&&pe("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function b(f){if(!n||!f)return;let k=await n("worker-repo-operation-dismiss",{operation_id:f});Te(k),k&&k.ok===!1&&pe(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${k.reason||""}`,"error",3e3)}async function $(f){if(!n||!Number.isFinite(f))return;let k=Math.max(ya,Math.floor(f)),q=await n("worker-queue-set-slots",{slots:k,expected_revision:Ne()});Te(q),q&&q.conflict&&await n("worker-queue-set-slots",{slots:k,expected_revision:Ne()}).then(Te)}async function U(f){if(!n||!Number.isInteger(f)||f<1||f>cf)return;let k=Q(),q=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).slice(f).reduce((m,w)=>m+(Array.isArray(w?.entries)?w.entries.length:0),0),re=()=>({count:f,expected_revision:Ne()}),p=await n("worker-queue-set-serial-lane-count",re());Te(p),p&&p.conflict&&(p=await n("worker-queue-set-serial-lane-count",re()),Te(p)),p&&p.applied&&q>0&&pe(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${q}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let oe="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function ae(f,k){let q=cl(f,k.id,B);return{id:k.id,title:k.title,location_label:k.location_label,prefixes:k.prefixes,action:q.kind==="note"?{kind:"note",text:q.text}:q.kind==="disabled"?{kind:"disabled",label:oe,title:q.title}:{kind:"place",label:oe,title:q.title}}}function we(f,k){if(!V||V.bead_id!==f)return null;let q=V.counterpart_id,re=k.filter(p=>p.id===q);return re.length===0?null:{rows:re.map(p=>ae(f,p))}}async function Re(f,k){let q=cl(f,k,B);if(V=null,q.kind!=="ops"){Ke();return}let re=Ne();for(let p of q.ops){let m=await Je(p,re);if(m===null)break;re=m}Ke()}async function Je(f,k){if(!n)return null;try{let q=await n("worker-queue-place",{bead_id:f.bead_id,lane:f.lane,index:f.index,expected_revision:k});if(Te(q),q&&q.conflict)return pe("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!q||q.applied!==!0)return pe(q&&typeof q.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${q.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let re=q.queue?q.queue.revision:void 0;return typeof re!="number"?(pe("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):re}catch(q){return pe(q instanceof Error&&q.message?q.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function ct(){let f=Q(),k=h?h.selectBoardColumn(Ey,"ready"):[],q=h?h.selectBoardColumn(Ty,"blocked"):[],re=h?h.selectBoardColumn(Oy,"closed"):[],p=h?h.selectBoardColumn(Cy,"in_progress"):[],m=h?h.selectBoardColumn(Ry,"resolved"):[],w=co([...k,...q,...p,...m,...re]),S=new Map;for(let _ of[...k,...q,...p])_&&_.id&&!S.has(_.id)&&S.set(_.id,_);let J={...se(u?.()||"")};for(let _ of["orchestration_model","orchestration_effort","orchestration_speed"]){let F=f[_];typeof F=="string"&&(J[_]=F)}function H(_,F){let ie=S.get(_);if(!ie)return null;let Fe=ie.metadata&&typeof ie.metadata=="object"?ie.metadata:{},Xe=ie.workflow?.route,Tt=Fe.route,kt=df(Xe)?Xe:df(Tt)?Tt:null;return ln({pin:Fe,global:J,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:kt,controller_runtime:F})}function v(_){let F=_.runner||null,ie=H(_.bead_id,F),Fe=Rs(_),Xe=ie?nr(ie,F):null;return Fe||Xe?{orchestration:Fe,worker:Xe}:null}let O=new Map;function C(_){if(O.has(_))return O.get(_)??null;let F=H(_,null),ie=null;if(F){let Fe=En(f.runner_catalog??null,F.orchestration_model.value??""),Xe=Fe===null?F:H(_,Fe),Tt=hr(Xe,f.runner_catalog??null),kt=nr(Xe,Fe);ie=Tt||kt?{orchestration:Tt,worker:kt}:null}return O.set(_,ie),ie}function ve(_){let F=uo(w,_);return F.total===0?null:F}let rt=f.bead_titles||{},Ye=new Map;for(let[_,F]of Object.entries(rt))typeof F=="string"&&F.length>0&&Ye.set(_,F);for(let _ of[...k,...q])Ye.set(_.id,_.title||_.id);let at=new Map;for(let _ of[...k,...q,...p,...m,...re])_&&_.id&&typeof _.from_id=="string"&&at.set(_.id,_.from_id);let Ze=new Map;for(let _ of[...k,...q,...p,...m,...re])_&&_.id&&typeof _.priority=="number"&&Ze.set(_.id,_.priority);let qt=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},sn=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},Hn=f.bead_workflow&&typeof f.bead_workflow=="object"&&!Array.isArray(f.bead_workflow)?f.bead_workflow:{},Gn=new Map;for(let[_,F]of Object.entries(sn))Array.isArray(F)&&Gn.set(_,al(F));for(let _ of[...k,...q]){let F=_.labels;Array.isArray(F)&&!Gn.has(_.id)&&Gn.set(_.id,al(F))}let vr=new Map,Vr=o?.get()?.last_good?.result?.groups;for(let _ of Array.isArray(Vr)?Vr:[]){if(_?.eligible!==!0||!Array.isArray(_.members))continue;let F=_.members.map(Fe=>{let Xe=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(Tt=>Tt.entries.some(kt=>kt.bead_id===Fe));return Xe?Xe.id:null});if(!(F.every(Fe=>Fe!==null)&&new Set(F).size===1))for(let Fe of _.members)vr.set(Fe,_.members.filter(Xe=>Xe!==Fe))}let qs=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},wr=new Map;for(let[_,F]of Object.entries(qt))F&&typeof F=="object"&&wr.set(_,F);for(let _ of[...k,...q])wr.set(_.id,{created_at:_.created_at,updated_at:_.updated_at});let or=_=>wr.get(_)||{},Dn=f.pr_wait||[],Yr=f.pr_observations||{},Be=f.pr_activity||{},dt=f.cleanup_failed||{},pn=Object.entries(dt).map(([_,F])=>({bead_id:_,step:F&&F.step?F.step:"",reason:F&&F.reason?F.reason:"",at:F&&typeof F.at=="number"?F.at:null,detail:F&&typeof F.detail=="string"?F.detail:null,output_tail:F&&typeof F.output_tail=="string"&&F.output_tail?F.output_tail:void 0,log_path:F&&typeof F.log_path=="string"&&F.log_path?F.log_path:void 0,retry_count:F&&typeof F.retry_count=="number"&&Number.isInteger(F.retry_count)&&F.retry_count>0?F.retry_count:0,failure_code:F&&typeof F.failure_code=="string"?F.failure_code:void 0,subject_id:F&&typeof F.subject_id=="string"?F.subject_id:void 0,repair_eligible:!!(F&&F.repair_eligible),repair:F&&F.repair?F.repair:void 0})),va=f.queue||[],Pf=new Set([...va.map(_=>_.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(_=>(Array.isArray(_?.entries)?_.entries:[]).map(F=>F.bead_id)),...Dn.map(_=>_.bead_id),...f.done.map(_=>_.bead_id)]),Df=new Set(q.map(_=>_.id)),Mf=i?i.get()?.order||{}:{},bl=new Set,hl=[];for(let _ of[...k,...q])Pf.has(_.id)||bl.has(_.id)||Hy(_)||(bl.add(_.id),hl.push(_));W=zy(hl,j,Mf);let Nf=f.admission||{},yl=_=>{let F=Nf[_];if(!F)return"";if(F.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof F.reason=="string"?F.reason:"",Fe=ie.indexOf(":");return Fe>0&&Fe<ie.length-1?`\u26D4 ${ie.slice(0,Fe)} (${ie.slice(Fe+1)})`:`\u26D4 ${ie}`},vl=new Map,qf=W.map(_=>{let F=Mo(_),ie=F.path.length>0,Fe=_.workflow?.route==="quick_fix"||_.metadata&&_.metadata.route==="quick_fix",Xe=!Object.hasOwn(_,"description")||typeof _.description=="string"&&_.description.trim().length>0,Tt=Object.hasOwn(_,"labels")&&zp(_.labels),kt=Tt||!Object.hasOwn(_,"labels")?"":Hp(_.labels,_.metadata),Ot=kt.length>0,Ar=!Tt&&(Fe?Xe:ie&&!F.conflict),Ks=Df.has(_.id),Vn=[];if(Ks){Vn.push(Gy(_));let Vs=wf(_);Vs.length>0&&vl.set(_.id,Vs)}Fe&&!Xe?Vn.push("missing_description"):!Fe&&F.conflict?Vn.push("spec_id_conflict"):!Fe&&!ie&&Vn.push("spec \uC5C6\uC74C");let Sr=yl(_.id);return Sr&&Vn.push(Sr),{id:_.id,title:_.title||_.id,reason:Vn.join(" \xB7 "),draggable:Ar,lane:"candidate",created_at:_.created_at,updated_at:_.updated_at,workflow:_.workflow,is_quick_fix:Fe,status:_.status,worker_ineligible:Tt,session_preferred:Ot,session_preferred_reason:kt,blocked:Ks,has_spec:ie,exec_chips:C(_.id),from_id:_.from_id||void 0,priority:Ze.get(_.id)}}),wa=Dy(qf,Z),ka=wa.visible,Ff=f.revise_parked||{},Fs=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},$a=(_,F)=>_.map((ie,Fe)=>{let Xe=F!=="done",Tt=F!=="done"&&F!=="queue",kt=Xe?Ff[ie.bead_id]:null,Ot=Xe?Tn(Fs,ie.bead_id):null,Ar=Ot?.operation?Ot:null,Ks=Xe&&Gn.get(ie.bead_id)===!0,Vn=f.admission&&typeof f.admission=="object"?f.admission[ie.bead_id]:null,Sr=Xe?Ad(Vn,!!Ar||me.has(ie.bead_id)):null,Vs=Xe&&!Sr?yl(ie.bead_id):null,Qf=Xe?[Vs]:[],Zl=[],Ia=Xe?vr.get(ie.bead_id):void 0;return Ia&&Ia.length>0&&Zl.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Ia.join(", ")}\uC640`),{id:ie.bead_id,title:Ye.get(ie.bead_id)||ie.bead_id,reason:Qf.filter(Boolean).join(" \xB7 "),draggable:Xe&&!Ar&&!Sr,done:F==="done",lane:F,seq:Tt?Fe+1:void 0,worker_serial:Ks,discard:Ar,stale_work:Sr,badges:[...Zl,...kt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...F==="done"?Xo(f.attempts||{},ie.bead_id):[]],alert:!!kt,revise_action:!!kt,revise_enabled:!!kt&&!Ar&&!te.has(ie.bead_id),revise_title:kt?kt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${kt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:F==="done"?hn(f.attempts||{},ie.bead_id):null,work_ms:F==="done"?Qo(f.attempts||{},ie.bead_id):null,done_at:F==="done"&&typeof ie.added_at=="number"?ie.added_at:void 0,exec_chips:Xe?C(ie.bead_id):null,workflow:Xe&&Hn[ie.bead_id]||null,from_id:at.get(ie.bead_id)||void 0,priority:Ze.get(ie.bead_id),...or(ie.bead_id)}}),kr=f.attempts?Object.values(f.attempts).filter(Gr):[],xa=new Set;for(let _ of kr)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&xa.add(_.resumed_from);let wl=new Map;for(let _ of kr)wl.set(_.bead_id,_.attempt_id);let Zr=new Map;for(let _ of kr)Zr.set(_.attempt_id,_);function Aa(_){let F=new Set,ie=_;for(;ie&&!F.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;F.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&Zr.get(ie.resumed_from)||null}return!1}let js=typeof f.declared_base=="string"?f.declared_base:null;function jf(_){let F=null;for(let ie of kr)!ie||ie.bead_id!==_||Aa(ie)||(F===null||(typeof ie.started_at=="number"?ie.started_at:0)>=(typeof F.started_at=="number"?F.started_at:0))&&(F=ie);return F&&typeof F.target_base=="string"?F.target_base:null}let Sa=[],Bs=[],Bf=Wp(f),kl=_=>{let F=typeof _.session_id=="string"&&_.session_id.length>0,ie=xa.has(_.attempt_id);return{eligible:F&&!ie,reason:F?ie?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},wn=null;for(let _ of kr){let F=_.status==="paused"&&!xa.has(_.attempt_id);if(_.status==="running"||F)Bs.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:Ye.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,paused:F,conflict_resolution:Aa(_),base_exception:dl(js,_.target_base),can_pause:typeof _.session_id=="string"&&_.session_id.length>0,discard:Tn(Fs,_.bead_id,{attempt_id:_.attempt_id}),workflow:Hn[_.bead_id]||null,priority:Ze.get(_.bead_id),usage:hn(f.attempts||{},_.bead_id),rollup:ve(_.bead_id),rollup_expanded:xe.has(_.bead_id),exec_chips:v(_),...or(_.bead_id)});else if((_.status==="failed"||_.status==="orphaned")&&Bf(_)){let ie=kl(_);Sa.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:Ye.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,failed:!0,status:_.status,status_label:_.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Tn(Fs,_.bead_id,{attempt_id:_.attempt_id}),resume_eligible:ie.eligible,resume_reason:ie.reason,conflict_resolution:Aa(_),base_exception:dl(js,_.target_base),workflow:Hn[_.bead_id]||null,priority:Ze.get(_.bead_id),usage:hn(f.attempts||{},_.bead_id),rollup:ve(_.bead_id),rollup_expanded:xe.has(_.bead_id),exec_chips:v(_),...or(_.bead_id)}),wn=_}}let $l=new Set([...Sa,...Bs].map(_=>_.bead_id)),xl=new Map;for(let _ of Array.isArray(f.session_active)?f.session_active:[]){let F=_&&_.bead_id;if(!(typeof F!="string"||F.length===0||$l.has(F))){if($l.add(F),Array.isArray(_.blocked_by)){let ie=_.blocked_by.filter(Fe=>typeof Fe=="string"&&Fe.length>0);ie.length>0&&xl.set(F,ie)}Bs.push({bead_id:F,attempt_id:null,kind:"session",title:_.title||Ye.get(F)||F,status:"in_progress",started_at:On(_.started_at)??On(_.updated_at),updated_at:On(_.updated_at),workflow:_.workflow||null,priority:Ze.get(F),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1})}}let $r=[...Sa,...Bs].map(_=>{let F=Zr.get(_.attempt_id),ie=F?.quickfix_landing;if(F?.quickfix_lane!==!0||!ie||typeof ie!="object")return _;let Fe=typeof ie.reason=="string"&&ie.reason.length>0?ie.reason:null,Xe=Ps({bead_id:F.bead_id,merge_sha:ie.head_sha,cleanup_cursor:ie.cursor,cleanup_failed:Fe?{step:ie.cursor,reason:Fe}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return Xe?{..._,landing:Xe}:_}),Al=null;if(wn){let _=kl(wn),F=wn.cause_detail;Al={bead_id:wn.bead_id,repo:wn.repo||"",reason:wn.cause||wn.status,cause_detail:F&&typeof F.reason=="string"?{reason:F.reason,command:typeof F.command=="string"?F.command:null}:null,resume_attempt_id:wn.attempt_id,resume_eligible:_.eligible,resume_reason:_.reason,discard:Tn(Fs,wn.bead_id,{attempt_id:wn.attempt_id})}}let Sl=new Set($r.map(_=>_.bead_id)),Ea=Array.isArray(f.merge_queue)?f.merge_queue:[],El=new Map,Tl=new Map,Cl=new Map,Rl=new Map,Ol=new Map;Ea.forEach((_,F)=>{_&&typeof _.bead_id=="string"&&(El.set(_.bead_id,F+1),Tl.set(_.bead_id,_.resolution),Cl.set(_.bead_id,_.continuation_action||null),Rl.set(_.bead_id,_.head_review||null),Ol.set(_.bead_id,_.authority||null))});let xr=f.merge_queue_state||{active:null,failures:{}},Uf=xr.failures||{},Ll=xr.waiting&&typeof xr.waiting.bead_id=="string"&&typeof xr.waiting.reason=="string"?xr.waiting:null,Wf=f.auto_merge_skips||{},Il=_=>{let F=Wf[_];if(!F)return null;let ie=Yr[_],Fe=ie&&ie.pr?ie.pr.head_sha:null;return Fe&&Fe===F.head_sha?F.reason||"":null},Us=new Map;for(let _ of $r)_.failed!==!0&&_.conflict_resolution&&(_.paused?Us.has(_.bead_id)||Us.set(_.bead_id,"paused"):Us.set(_.bead_id,"running"));let Pl=$r.filter(_=>_.kind!=="session"&&!_.paused&&_.failed!==!0).length,Dl=(f.workspace_info||{}).slots,Ml=typeof Dl=="number"?Dl:typeof f.slots=="number"?f.slots:ya,zf=Pl>Ml,Ws=dr(G),Hf=(Array.isArray(f.done)?f.done.slice():[]).filter(_=>Ws===void 0||typeof _.added_at!="number"||_.added_at>=Ws).sort((_,F)=>(F.added_at||0)-(_.added_at||0)),Xr=$a(Hf,"done"),Gf=new Set((Array.isArray(f.done)?f.done:[]).map(_=>_?.bead_id).filter(_=>typeof _=="string")),Nl=[],Kf=u?.()||"";for(let _ of re){let F=On(_.closed_at);if(typeof _.id!="string"||Gf.has(_.id)||F===null||Ws!==void 0&&F<Ws||typeof _.comment_count!="number"||_.comment_count<=0)continue;let ie=`${Kf}\0${_.id}\0${String(_.updated_at)}\0${_.comment_count}`,Fe=P.get(ie);Fe===void 0&&n&&(P.set(ie,"pending"),Promise.resolve(n("get-comments",{id:_.id})).then(Xe=>{let Tt=Array.isArray(Xe)&&Xe.some(kt=>No(typeof kt?.text=="string"?kt.text:"")?.lane==="session");P.set(ie,Tt?"session":"not-session"),Ke()}).catch(()=>{P.set(ie,"failed"),Ke()})),Fe==="session"&&Nl.push({id:_.id,title:_.title||_.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:F,created_at:_.created_at,updated_at:_.updated_at})}Xr.push(...Nl),Xr.sort((_,F)=>(F.done_at||0)-(_.done_at||0));let zs={};for(let _ of In)zs[_]=0;let ql=!1,Fl=0,Ta=0,jl=0;for(let _ of Xr){let F=_.usage;if(F&&typeof F=="object"){let ie=!1;for(let Fe of In)Number.isFinite(F[Fe])&&(zs[Fe]+=F[Fe],ql=!0,ie=!0);ie&&(Ta+=1,Number.isFinite(F.total_cost_usd)&&(Fl+=F.total_cost_usd,jl+=1))}}Ta>0&&jl===Ta&&(zs.total_cost_usd=Fl);let Bl=Xr.map(_=>_.usage).filter(_=>_&&typeof _=="object"&&_.providers),Vf=Bl.length>0?Vt($o(Bl)):ql?Fn(zs):null,Ul=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},Wl=Array.isArray(f.serial_lanes)?f.serial_lanes:[],zl=_=>{if(Dn.some(Fe=>Fe.bead_id===_))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let F=kr.filter(Fe=>Fe&&Fe.bead_id===_),ie=F.length>0?F[F.length-1].status:null;return ie==="failed"||ie==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ie==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Hs=Wl.filter(_=>_&&typeof _.id=="string"&&Array.isArray(_.entries)).map((_,F)=>{let ie=Ul[_.id]||{},Fe=new Map((Array.isArray(ie.corrections)?ie.corrections:[]).filter(Ot=>Ot&&typeof Ot.bead_id=="string"&&typeof Ot.after=="string").map(Ot=>[Ot.bead_id,Ot.after])),Xe=$a(_.entries.filter(Ot=>!Sl.has(Ot.bead_id)),_.id).map(Ot=>Fe.has(Ot.id)?{...Ot,badges:[`\u{1F517} ${Fe.get(Ot.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Ot.badges]}:Ot),Tt=Array.isArray(ie.occupied_by)?ie.occupied_by.filter(Ot=>typeof Ot=="string"):[],kt=Tt.map(Ot=>({id:Ot,title:Ye.get(Ot)||Ot,draggable:!1,lane:_.id,ghost:!0,badges:[zl(Ot)]}));return{id:_.id,index:F+1,rows:[...kt,...Xe],occupied:Tt.length>0,badge:Tt.length>0?zl(Tt[0]):"\uB300\uAE30",cycle:ie.cycle===!0}}),Hl=typeof f.serial_lane_count=="number"?f.serial_lane_count:Hs.length,Ca=$a(va.filter(_=>!Sl.has(_.bead_id)),"queue"),Gl=new Map,Kl=new Set;for(let[_,F]of Object.entries(Ul)){if(!/^s[1-5]$/.test(_))continue;let ie=F&&Array.isArray(F.occupied_by)?F.occupied_by:[];for(let Fe of ie)typeof Fe=="string"&&Gl.set(Fe,_);ie.length>0&&Kl.add(_)}let Kn=[];for(let _ of $r)typeof _.bead_id=="string"&&Kn.push({id:_.bead_id,title:Ye.get(_.bead_id)||_.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Gl.get(_.bead_id)??null});for(let _ of Dn){let F=_&&_.bead_id;typeof F!="string"||F.length===0||Kn.push({id:F,title:Ye.get(F)||F,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let _ of Hs)for(let F of _.rows)F.ghost!==!0&&Kn.push({id:F.id,title:F.title,location_label:`${_.id} #${F.seq??""}`.trim(),kind:"serial",lane_id:_.id});Ca.forEach((_,F)=>{Kn.push({id:_.id,title:_.title,location_label:`#${F+1}`,kind:"parallel",lane_id:null})});for(let _ of ka)Kn.push({id:_.id,title:_.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let Vl={};for(let _ of Wl)_&&typeof _.id=="string"&&Array.isArray(_.entries)&&(Vl[_.id]=_.entries.length);let Ra=new Map;for(let _ of Kn)Ra.has(_.id)||Ra.set(_.id,_);B={members_by_id:Ra,serial_raw_lengths:Vl,serial_lane_count:Hl,occupied_lanes:Kl};let Yf=Yp(f.bead_scope,Kn),Gs=new Map;for(let[_,F]of xl)Gs.set(_,F);for(let[_,F]of vl)Gs.set(_,F);for(let[_,F]of Object.entries(qs)){if(!Array.isArray(F))continue;let ie=F.filter(Fe=>typeof Fe=="string"&&Fe.length>0);ie.length>0&&Gs.set(_,ie)}let Zf=tp(Gs,Kn),Oa=(_,F=null)=>{let ie=Yf.get(_),Fe=Zf.get(_)||null,Xe=ie&&ie.overlaps.length>0?ie.overlaps:null,Tt=!!ie&&ie.scope_missing;if(!Fe&&!Xe&&!Tt)return F;let kt=Xe?we(_,Xe):null;return{...F||{},interactive:!1,...Fe?{predecessors:Fe}:{},...Xe?{overlaps:Xe}:{},...Tt?{scope_missing:!0}:{},...kt?{popover:kt}:{}}},La=_=>{let F=Oa(_.id,_.dependency_chips||null);return F&&(_.dependency_chips=F),_};for(let _ of Ca)La(_);for(let _ of Hs)for(let F of _.rows)F.ghost!==!0&&La(F);for(let _ of ka)La(_);let Yl=new Map;for(let _ of $r){let F=typeof _.bead_id=="string"?_.bead_id:"";if(F.length===0)continue;let ie=_.kind==="session",Fe=Oa(F),Xe=typeof _.attempt_id=="string"&&_.attempt_id.length>0?Zr.get(_.attempt_id):void 0,Tt=Xe&&Xe.last_activity&&typeof Xe.last_activity=="object"?Xe.last_activity:null,kt=Xe&&Array.isArray(Xe.legs)?Xe.legs:[];!Fe&&!Tt&&kt.length===0&&!ie||Yl.set(F,{...Tt?{last_activity:Tt}:{},...kt.length>0?{legs:kt}:{},...Fe?{dependency_chips:Fe}:{}})}let Xf=Dn.map(_=>sv(_.bead_id,Ye.get(_.bead_id)||_.bead_id,Yr,dt[_.bead_id]||null,hn(f.attempts||{},_.bead_id),Be[_.bead_id]||(ke.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:z.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Us.get(_.bead_id)||null,_.external===!0,{position:El.get(_.bead_id)||0,active:xr.active===_.bead_id,failure:Uf[_.bead_id]||null,waiting:Ll?.bead_id===_.bead_id?Ll.reason:null,resolution:Tl.get(_.bead_id),continuation_action:Cl.get(_.bead_id),head_review:Rl.get(_.bead_id)||null,authority:Ol.get(_.bead_id)||null},_.wt_present!==!1,f.auto_merge===!0?Il(_.bead_id):null,dl(js,jf(_.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[_.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Zr.get(wl.get(_.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:_.merge_sha,cleanup_cursor:_.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]},Oa(_.bead_id))).map(_=>({..._,workflow:Hn[_.id]||null,priority:Ze.get(_.id),...or(_.id)}));return{queue:f,idToTitle:Ye,candidates:ka,candidate_hidden:{blocked:wa.hidden_blocked,spec:wa.hidden_spec},running:$r,live_count:Pl,slots:Ml,over_cap:zf,failure:Al,waiting:Ca,serial_lanes:Hs,serial_lane_count:Hl,running_overlays:Yl,pr_wait:Xf,merge_queue_length:Ea.length,merge_queue_running:Ea.length>0,auto_excluded:Dn.map(_=>_.bead_id).filter(_=>Il(_)!==null),declared_base:js,done:Xr,token_total:Vf,cleanup_failures:pn,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function Ce(){let k=!!o?.get()?.job,q=!k&&o?.isPending?.()===!0,re=k?"\uBD84\uC11D \uC911":q?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${re?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${re?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${re?l`<span class="worker-analysis-btn__badge">${re}</span>`:""}
    </button>`}function pt(f){let k=f.waiting.length>0?f.waiting[0].id:"\u2014",q=l`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,re=Zt(f),p=f.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",m=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${L()} 완료 <b>${f.done.length}</b></span
      >`,w=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,S=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${ya}
          step="1"
          .value=${String(f.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:cf},(v,O)=>O+1).map(v=>l`<option
                value=${String(v)}
                ?selected=${f.serial_lane_count===v}
              >
                ${v}
              </option>`)}
        </select>
      </label>
      ${o?Ce():""} `,J=Ld({failure:f.failure}),H=xd(f.repo_operations,f.cleanup_failures);return Ee?l`<div class="worker-ribbon">
          ${q} ${re}
          <div class="worker-kpi worker-kpi--ribbon">${p}${m}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${S}</div>
          <div class="worker-kpi">${w}</div>
        </div>
        ${H}${$t.template()}${J}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${q}${re}${S}</div>
        <div class="worker-kpi">
          ${p}${m}${w}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${L()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(v=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${v.tooltip}
                >${L()} 완료 · 누적 ${v.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${k}</b></span
          >
        </div>
      </div>
      ${H}${$t.template()}${J}`}function Nt(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let k=f.running.some(q=>q.kind!=="session"&&!q.paused&&q.failed!==!0);return l`<section
      class="worker-now${k?" worker-pane--live":""}"
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
      ${f.running.length>0?Wi(f.running,Date.now(),ze,f.running_overlays):""}
      ${f.pr_wait.map(q=>Jn(q))}
    </section>`}function St(f){let k=f.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${Z.show_blocked}
        />
        🔒 blocked${k.blocked>0?` ${k.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${My.map(q=>l`<button
              type="button"
              class="worker-filter__chip${Z.spec===q.value?" is-active":""}"
              data-spec=${q.value}
              aria-pressed=${Z.spec===q.value?"true":"false"}
            >
              ${q.label}
            </button>`)}
        ${k.spec>0?l`<span class="worker-filter__hidden">숨김 ${k.spec}</span>`:""}
      </div>
    </div>`}function un(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${j}
    >
      ${bf.map(f=>l`<option value=${f.value} ?selected=${j===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function Ht(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${G}
      >
        ${Tr.map(f=>l`<option value=${f.value} ?selected=${G===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function Ut(f){let k=l`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,q=f.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return vn({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:k,controls:q})}function Zt(f){let k=f.queue.auto_merge===!0;if(f.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${k?" is-active":""}"
        title=${k?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${k?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if(k)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let q=new Set(f.auto_excluded),re=f.pr_wait.filter(p=>p.merge_action&&p.merge_enabled&&!q.has(p.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${re>0?` ${re}`:""}
    </button>`}function zt(f){let k=vn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:un(),controls:St(f),place_menu:Oe(f.candidates),onOpenDoc:d?(q,re)=>d(re):void 0});return Ee?l`<div class="worker-lanes worker-lanes--mobile">
        ${Nt(f)}
        ${vn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:ne.queue,preview:pf(f.waiting)})}
        ${f.serial_lanes.map(q=>Ut(q))}
        ${k}
        ${vn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ht(),collapsible:!0,collapsed:ne.done,preview:Array.isArray(f.token_total)?f.token_total.map(q=>q.label).join(" \xB7 "):f.token_total||pf(f.done)})}
      </div>`:l`<div class="worker-lanes">
      ${k}
      <div class="worker-wait">
        ${vn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(q=>Ut(q))}
      </div>
      ${vn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(q=>q.kind!=="session"&&!q.paused&&q.failed!==!0),body:Wi(f.running,Date.now(),ze,f.running_overlays)})}
      ${vn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${vn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${L()} ${f.done.length}`,items:f.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ht()})}
    </div>`}function gt(f){ne={...ne,[f]:!ne[f]},Wy(ne),Ke()}function Ke(){let f=ct();Qe(pt(f),ge),Qe(zt(f),Ue)}function dn(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(By);Ee=!!f.matches;let k=q=>{let re=!!(q&&typeof q.matches=="boolean"?q.matches:f.matches);re!==Ee&&(Ee=re,Ke())};typeof f.addEventListener=="function"?(f.addEventListener("change",k),K.push(()=>f.removeEventListener("change",k))):typeof f.addListener=="function"&&(f.addListener(k),K.push(()=>f.removeListener(k)))}let tn=null;function st(f){tn=f.target instanceof Element?f.target:null}function Ie(f){let q=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!q)return;if(tn&&q.contains(tn)&&tn.closest("input, button, a")){f.preventDefault();return}let re=q.dataset.beadId||"",p=q.dataset.lane||"";M={bead_id:re,from_lane:p};try{f.dataTransfer?.setData("text/plain",re),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function R(f){let k=f.target?.closest?.(".worker-pane");if(!k)return;let q=k.dataset.lane||"";q!=="candidate"&&q!=="queue"&&!/^s[1-5]$/.test(q)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),k.classList.add("worker-pane--drag-over"))}function _e(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Se(f,k){let q=W.find(w=>w.id===f);if(!q)return;let re=W.filter(w=>w.id!==f),p=re.length;if(k){let w=k.dataset.beadId;if(w===f)return;let S=re.findIndex(J=>J.id===w);S>=0&&(p=S)}let m=re.slice();m.splice(p,0,q),A.applyReorder(f,m,p)}function ut(f){let k=f.target?.closest?.(".worker-pane");if(!k)return;f.preventDefault(),k.classList.remove("worker-pane--drag-over");let q=k.dataset.lane||"",re=M?.bead_id||f.dataTransfer?.getData("text/plain")||"",p=M?.from_lane||"";if(M=null,!re)return;let m=f.target?.closest?.(".worker-mini, .worker-card"),w=Array.from(k.querySelectorAll(".worker-mini, .worker-card")),S=w.length;if(m){let J=w.indexOf(m);J>=0&&(S=J)}if(S=Math.max(0,S-k.querySelectorAll(".worker-mini--ghost").length),k.classList.contains("worker-pane--collapsed")&&(S=Pe()),q==="candidate"){if(p==="candidate"){Se(re,m);return}(p==="queue"||/^s[1-5]$/.test(p))&&nt(re);return}if(q==="queue"||/^s[1-5]$/.test(q)){let J=q==="queue"?"parallel":q;p===q?ot(re,J,S):je(re,J)}}function xt(f){Z=f,Py(f),Ke()}function ht(f){j=hf(f),qy(j),Ke()}function Dt(f){G=Rn(f),jy(G),y?.(G),Ke()}function jt(f){let k=f.target?.closest?.(".worker-serial-lane-count");if(k){let S=Number.parseInt(k.value,10);Number.isFinite(S)&&U(S).then(Ke);return}let q=f.target?.closest?.(".worker-filter__blocked");if(q){xt({...Z,show_blocked:q.checked});return}let re=f.target?.closest?.(".worker-done-range");if(re){Dt(re.value);return}let p=f.target?.closest?.(".worker-sort");if(p){ht(p.value||pl);return}let m=f.target?.closest?.(".worker-slots__input");if(!m)return;let w=Number.parseInt(m.value,10);if(!Number.isFinite(w)){Ke();return}$(w).then(Ke)}function Gt(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function nn(){let f=ct();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function Et(){ze&&Ge.close(),Le.hidden=!1,qe.hidden=!1,et.open(nn()),Ke()}function rn(f){let k=Q(),q=k.attempts?k.attempts[f]:null;ze=f,We=null,et.close(),Le.hidden=!0,qe.hidden=!1,Ge.open({attempt_id:f,meta:Gt(q)}),Ke()}function gn(f,k){ze=null,We=f,et.close(),Le.hidden=!0,qe.hidden=!1,Ge.open({attempt_id:f,meta:k,hide_prompt:!0}),Ke()}function Pn(){if(et.isOpen()&&et.refresh(nn()),We){let q=(o?.get()?.runs||[]).find(re=>re.run_id===We);q?Ge.updateMeta(ll(q)):Ge.close();return}if(!ze)return;let f=Q(),k=f.attempts?f.attempts[ze]:null;if(k){Ge.updateMeta(Gt(k));return}Ge.close()}function T(f){let k=f.target;if(k?.closest?.(".worker-mini__serial, .worker-mini__grip")||k?.closest?.("#worker-parallel-analysis-dialog"))return;let q=k?.closest?.(".mon-overlap__chip");if(q){let Be=q.closest("[data-bead-id]"),dt=Be&&Be.getAttribute("data-bead-id")||"";if(dt){let pn=q.getAttribute("data-overlap-id")||"";V=!!V&&V.bead_id===dt&&V.counterpart_id===pn?null:{bead_id:dt,counterpart_id:pn},Ke()}return}let re=k?.closest?.(".mon-overlap__place");if(re){let Be=re.closest("[data-bead-id]"),dt=Be&&Be.getAttribute("data-bead-id")||"";dt&&Re(dt,re.getAttribute("data-counterpart-id")||"");return}if(k?.closest?.(".mon-overlap__popover"))return;if(k?.closest?.(".worker-analysis-btn")){_t?.open();return}if(k?.closest?.(".worker-repo-strip")||k?.closest?.(".worker-mini__timeline")){Et();return}let p=k?.closest?.(".worker-repo-op__session");if(p){let Be=p.dataset.attemptId;Be&&rn(Be);return}let m=k?.closest?.(".worker-repo-op__resolve");if(m){x(m.dataset.operationId||"");return}let w=k?.closest?.(".worker-repo-op__dismiss");if(w){b(w.dataset.operationId||"");return}let S=k?.closest?.(".worker-cleanup__resume");if(S){let Be=S.dataset.beadId;Be&&vt(Be);return}let J=k?.closest?.(".worker-banner__resume");if(J){let Be=J.dataset.attemptId;Be&&yt(Be);return}let H=k?.closest?.(".worker-banner__discard");if(H){let Be=H.dataset.confirmation==="merged"?"merged":"unmerged";de(H.dataset.beadId||"",H.dataset.attemptId||null,Be,H.dataset.operationId||null);return}let v=k?.closest?.(".worker-banner__dismiss");if(v){let Be=v.dataset.attemptId;Be&&It(Be);return}if(k?.closest?.(".worker-play")){fe(!Q().auto_advance);return}let O=k?.closest?.(".worker-merge-all");if(O){O.classList.contains("worker-merge-all--stop")?Q().auto_merge===!0?De(!1):X():De(!0);return}let C=k?.closest?.(".worker-pane__hd--toggle");if(C){let Be=C.dataset.lane;(Be==="queue"||Be==="done")&&gt(Be);return}let ve=k?.closest?.(".worker-card__place-lane");if(ve){let Be=ve.dataset.beadId,dt=ve.dataset.lane;Be&&(dt==="parallel"||/^s[1-5]$/.test(dt||""))&&(le=null,Ke(),je(Be,dt));return}if(k?.closest?.(".worker-card__place-cancel")){le=null,Ke();return}let Ye=k?.closest?.(".worker-card__place");if(Ye){let Be=Ye.dataset.beadId;Be&&!Ye.disabled&&(ee()?(le=Be,Ke()):je(Be,"parallel"));return}let at=k?.closest?.(".worker-filter__chip");if(at){let Be=at.dataset.spec;(Be==="all"||Be==="with"||Be==="without")&&xt({...Z,spec:Be});return}let Ze=k?.closest?.(".worker-mini__merge");if(Ze){let Be=Ze.dataset.beadId||"";Q().cleanup_failed?.[Be]?vt(Be):Mt(Be);return}let qt=k?.closest?.(".worker-mini__merge-cancel");if(qt){D(qt.dataset.beadId||"");return}let sn=k?.closest?.(".worker-mini__discard");if(sn){de(sn.dataset.beadId||"",sn.dataset.attemptId||null,sn.dataset.discardMode==="merged"?"merged":"unmerged",sn.dataset.operationId||null);return}let Hn=k?.closest?.(".worker-mini__stale-continue");if(Hn){E("worker-stale-work-continue",Hn.dataset.beadId||"",Hn.dataset.actionId||"");return}let Gn=k?.closest?.(".worker-mini__stale-backup");if(Gn){E("worker-stale-work-backup-fresh",Gn.dataset.beadId||"",Gn.dataset.actionId||"");return}let vr=k?.closest?.(".worker-mini__stale-recheck");if(vr){E("worker-stale-work-recheck",vr.dataset.beadId||"",vr.dataset.actionId||"");return}let Vr=k?.closest?.(".worker-mini__revise-fix");if(Vr){Y("worker-revise-fix",Vr.dataset.beadId||"");return}let qs=k?.closest?.(".worker-mini__revise-approve");if(qs){Y("worker-revise-approve",qs.dataset.beadId||"");return}if(k?.closest?.(".worker-mini__pr"))return;if(k?.closest?.(".rtile__discard")){let Be=k?.closest?.(".rtile"),dt=Be?.dataset?.beadId,pn=Be?.dataset?.attemptId;dt&&de(dt,pn||null,"unmerged",k?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(k?.closest?.(".rtile__dismiss")){let dt=k?.closest?.(".rtile")?.dataset?.attemptId;dt&&It(dt);return}if(k?.closest?.(".rtile__pause")){let dt=k?.closest?.(".rtile")?.dataset?.attemptId;dt&&tt(dt);return}if(k?.closest?.(".rtile__resume")){let dt=k?.closest?.(".rtile")?.dataset?.attemptId;dt&&yt(dt);return}if(k?.closest?.(".rtile__session")){let dt=k?.closest?.(".rtile")?.dataset?.attemptId;dt&&rn(dt);return}if(k?.closest?.(".worker-drawer-overlay__backdrop")){et.close(),Ge.close();return}if(k?.closest?.(".worker-drawer-host"))return;let wr=k?.closest?.(".rtile .board-card__roll-toggle");if(wr){let Be=wr.dataset.rollParent;Be&&(xe.has(Be)?xe.delete(Be):xe.add(Be),Ke());return}let or=k?.closest?.(".rtile .board-card__roll-child");if(or){let Be=or.dataset.childId;Be&&c&&c(Be);return}let Dn=k?.closest?.(".rtile");if(Dn){if(k?.closest?.(".rtile__id")){let dt=Dn.dataset.beadId;dt&&fn(dt).then(pn=>{pn?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Be=Dn.dataset.beadId;Be&&c&&c(Be);return}let Yr=k?.closest?.(".worker-mini, .worker-card");if(Yr){let Be=Yr.dataset.beadId;if(k?.closest?.(".worker-mini__id, .worker-card__id")){Be&&fn(Be).then(pn=>{pn?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let dt=k?.closest?.(".ctl-chip--from");if(dt){let pn=dt.dataset.fromId;pn&&c&&c(pn);return}Be&&c&&c(Be)}}e.addEventListener("pointerdown",st),e.addEventListener("dragstart",Ie),e.addEventListener("dragover",R),e.addEventListener("dragleave",_e),e.addEventListener("drop",ut),e.addEventListener("click",T),e.addEventListener("change",jt);function I(f){if(!V)return;let k=f.target;k&&typeof k.closest=="function"&&k.closest(".mon-overlap__popover, .mon-overlap__chip")||(V=null,Ke())}function Me(f){f.key!=="Escape"||!V||(V=null,Ke())}return document.addEventListener("click",I),document.addEventListener("keydown",Me),K.push(()=>{document.removeEventListener("click",I),document.removeEventListener("keydown",Me)}),dn(),h&&K.push(h.subscribe(()=>{for(let[f,k]of P)k==="failed"&&P.delete(f);Ke()})),s&&K.push(s.subscribe(()=>{let f=u&&u()||"";f!==ft&&(ft=f,it.close()),Ke(),Pn()})),o&&typeof o.subscribe=="function"&&K.push(o.subscribe(()=>{Pn(),Ke()})),Ke(),{load(){ue(),Ke()},refreshSessionDefaults:$e,destroy(){for(let f of K.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",st),e.removeEventListener("dragstart",Ie),e.removeEventListener("dragover",R),e.removeEventListener("dragleave",_e),e.removeEventListener("drop",ut),e.removeEventListener("click",T),e.removeEventListener("change",jt);try{Ge.destroy()}catch{}qe.hidden=!0;try{_t?.destroy()}catch{}try{it.destroy()}catch{}Qe(l``,e)}}}function _l(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function kf(e,t,n,r=async()=>{},s=async()=>{}){let o=Lt("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function d(G){let L=G.target.value,Ee=t.getState().workspace?.current?.path||"";if(L&&L!==Ee){o("switching workspace to %s",L),i=!0,j();try{await n(L)}catch(ke){o("workspace switch failed: %o",ke)}finally{i=!1,j()}}}async function g(){let G=t.getState(),P=G.workspace?.current?.path||G.workspace?.available?.[0]?.path||"";if(!(!P||c)){o("git-pulling workspace %s",P),c=!0,j();try{await r(P)}catch(L){o("workspace git pull failed: %o",L)}finally{c=!1,j()}}}function y(G){let P=G.target;P&&e.contains(P)||M()}function h(G){G.key==="Escape"&&M()}function A(){u||(u=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",h),j())}function M(){u&&(u=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",h),j())}function W(){u?M():A()}async function Z(G){let P=G.target,L=P.value,ne=P.checked;o("toggling visibility %s \u2192 %s",L,String(ne));try{await s(L,ne)}catch(Ee){o("workspace visibility toggle failed: %o",Ee)}}function le(G){return G?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${g}
        ?disabled=${i||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function V(G,P){return l`
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
                ${G.map(L=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${L.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${L.path}"
                        .checked=${!P.has(L.path)}
                        @change=${Z}
                      />
                      <span class="workspace-picker__manage-name"
                        >${_l(L.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function B(){let G=t.getState(),P=G.workspace?.current,L=G.workspace?.available||[],ne=new Set(G.workspace?.hidden||[]),Ee=P?.path||L[0]?.path||"";if(L.length===0)return l``;let ke=L.filter(z=>!ne.has(z.path)||z.path===Ee);if(ke.length<=1){let z=ke[0]||L[0],te=_l(z.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${z.path}"
            >${te}</span
          >
          ${V(L,ne)}
          ${le(Ee)}
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
          ${ke.map(z=>l`
              <option
                value="${z.path}"
                ?selected=${z.path===Ee}
                title="${z.path}"
              >
                ${_l(z.path)}
              </option>
            `)}
        </select>
        ${V(L,ne)}
        ${le(Ee)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function j(){Qe(B(),e)}return j(),a=t.subscribe(()=>j()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",h),Qe(l``,e)}}}var $f=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function ml(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function xf(e,t,n=ml()){return{id:n,type:e,payload:t}}function Af(e={}){let t=Lt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,d=[],g=new Map,y=new Set;function h(B){for(let j of Array.from(y))try{j(B)}catch{}}function A(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),h(o);let B=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),j=(n.jitterRatio||0)*B,G=Math.max(0,Math.round(B+(Math.random()*2-1)*j));t("ws retry in %d ms (attempt %d)",G,a+1),i=setTimeout(()=>{i=null,V()},G)}function M(B){try{s?.send(JSON.stringify(B))}catch(j){t("ws send failed",j)}}function W(){for(o="open",t("ws open"),h(o),a=0;d.length;){let B=d.shift();B&&M(B)}}function Z(B){let j;try{j=JSON.parse(String(B.data))}catch{t("ws received non-JSON message");return}if(!j||typeof j.id!="string"||typeof j.type!="string"){t("ws received invalid envelope");return}if(u.has(j.id)){let P=u.get(j.id);u.delete(j.id),j.ok?P?.resolve(j.payload):P?.reject(j.error||new Error("ws error"));return}let G=g.get(j.type);if(G&&G.size>0)for(let P of Array.from(G))try{P(j.payload)}catch(L){t("ws event handler error",L)}else t("ws received unhandled message type: %s",j.type)}function le(){o="closed",t("ws closed"),h(o);for(let[B,j]of u.entries())j.reject(new Error("ws disconnected")),u.delete(B);a+=1,A()}function V(){if(!c)return;let B=r();try{s=new WebSocket(B),t("ws connecting %s",B),o="connecting",h(o),s.addEventListener("open",W),s.addEventListener("message",Z),s.addEventListener("error",()=>{}),s.addEventListener("close",le)}catch(j){t("ws connect failed %o",j),A()}}return V(),{send(B,j){if(!$f.includes(B))return Promise.reject(new Error(`unknown message type: ${B}`));let G=ml(),P=xf(B,j,G);return t("send %s id=%s",B,G),new Promise((L,ne)=>{u.set(G,{resolve:L,reject:ne,type:B}),s&&s.readyState===s.OPEN?M(P):(t("queue %s id=%s (state=%s)",B,G,o),d.push(P))})},on(B,j){g.has(B)||g.set(B,new Set);let G=g.get(B);return G?.add(j),()=>{G?.delete(j)}},onConnection(B){return y.add(B),()=>{y.delete(B)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,V()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function ov(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function av(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var gl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Sf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],rr="tab:worker:closed",iv="bdui.worker.done-range",Ef=kp,Tf="worker:queue",Cf="worker:parallel-analysis",Rf="ui:order",Of="ui:display-policy",Lf="exec:presets",sr="tab:board:closed",If="beads-ui.board.closed-range";function lv(e){let t=Lt("main");t("bootstrap start");let n=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Qe(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&Up(a),i&&c&&u&&d){let se=function(T,I){let Me="Request failed",f="";if(T&&typeof T=="object"){let q=T;if(typeof q.message=="string"&&q.message.length>0&&(Me=q.message),typeof q.details=="string")f=q.details;else if(q.details&&typeof q.details=="object")try{f=JSON.stringify(q.details,null,2)}catch{f=""}}else typeof T=="string"&&T.length>0&&(Me=T);let k=I&&I.length>0?`Failed to load ${I}`:"Request failed";K.open(k,Me,f)},Oe=function(T){return`${st.getState().workspace.current?.path||""}\0${T}`},Ne=function(){Ge&&(Ge().catch(()=>{}),Ge=null),et=null,it=null},Pe=function(T){ft=T;let I=()=>{ft!==T||st.getState().selected_id!==T||(ft=null,Te(T))};if(!Q){_t.then(I);return}I()},tt=function(T,I,Me,f,k){return Me!==nt[I]?(k().catch(()=>{}),!1):(T.set(f,k),!0)},It=function(){let T=st.getState();De(T.view==="board"),fe(T.view==="worker"),oe(T.view==="monitor"),b(T.view==="board"||T.view==="worker"||yt||!!T.selected_id)},vt=function(){let T=dr(mt);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},Ve=function(){let T=dr(Mt);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},De=function(T){if(T)for(let[I,Me]of gl){if(je.has(I)||ot.has(I))continue;let f=I===sr?vt():{type:Me};try{ge.register(I,f)}catch(re){t("register %s store failed: %o",I,re)}ot.add(I);let k=nt.board,q=!1;He.subscribeList(I,f).then(re=>{q=!tt(je,"board",k,I,re)}).catch(re=>{t("subscribe %s failed: %o",I,re),se(re,"board")}).finally(()=>{ot.delete(I),q&&It()})}else de()},de=function(){nt.board+=1;for(let[T]of gl){let I=je.get(T);I&&(I().catch(()=>{}),je.delete(T));try{ge.unregister(T)}catch(Me){t("unregister %s failed: %o",T,Me)}}},fe=function(T){if(!T){x();return}for(let[I,Me]of Sf){if(E.has(I)||ot.has(I))continue;let f=I===rr?Ve():{type:Me};try{ge.register(I,f)}catch(re){t("register %s store failed: %o",I,re)}ot.add(I);let k=nt.worker,q=!1;He.subscribeList(I,f).then(re=>{q=!tt(E,"worker",k,I,re)}).catch(re=>{t("subscribe %s failed: %o",I,re),se(re,"worker")}).finally(()=>{ot.delete(I),q&&It()})}},x=function(){nt.worker+=1;for(let[T]of Sf){let I=E.get(T);I&&(I().catch(()=>{}),E.delete(T));try{ge.unregister(T)}catch(Me){t("unregister %s failed: %o",T,Me)}}},b=function(T){if(!T){$();return}Y||($e("subscribe-worker-queue",{id:Tf}).catch(I=>{t("subscribe-worker-queue failed: %o",I)}),$e("subscribe-worker-parallel-analysis",{id:Cf}).catch(I=>{t("subscribe-worker-parallel-analysis failed: %o",I)}),Y=()=>($e("unsubscribe-worker-parallel-analysis",{id:Cf}),$e("unsubscribe-worker-queue",{id:Tf})))},$=function(){Y&&(Y().catch(()=>{}),Y=null),N.clear()},oe=function(T){if(!T){ae();return}U||($e("subscribe-monitor-pipeline",{id:Ef}).catch(I=>{t("subscribe-monitor-pipeline failed: %o",I)}),U=()=>$e("unsubscribe-monitor-pipeline",{id:Ef}))},ae=function(){U&&(U().catch(()=>{}),U=null)},Re=function(){we||($e("subscribe-ui-order",{id:Rf}).catch(T=>{t("subscribe-ui-order failed: %o",T)}),we=()=>$e("unsubscribe-ui-order",{id:Rf}))},Je=function(){we&&(we().catch(()=>{}),we=null),Le.clear()},Ce=function(){ct||($e("subscribe-display-policy",{id:Of}).catch(T=>{t("subscribe-display-policy failed: %o",T)}),ct=()=>$e("unsubscribe-display-policy",{id:Of}))},pt=function(){ct&&(ct().catch(()=>{}),ct=null),Ue.clear()},St=function(){Nt||($e("subscribe-impl-presets",{id:Lf}).catch(T=>{t("subscribe-impl-presets failed: %o",T)}),Nt=()=>$e("unsubscribe-impl-presets",{id:Lf}))},gt=function(T){if(!T)return"Unknown";let I=T.split("/").filter(Boolean);return I.length>0?I[I.length-1]:"Unknown"},jt=function(T,I){Dt.open(T.path,{missing_state:T.missing_state,...I?{workspace:I}:{}})};var g=se,y=Oe,h=Ne,A=Pe,M=tt,W=It,Z=vt,le=Ve,V=De,B=de,j=fe,G=x,P=b,L=$,ne=oe,Ee=ae,ke=Re,z=Je,te=Ce,me=pt,xe=St,he=gt,ce=jt;let Ae=document.getElementById("header-loading"),ye=Ic(Ae),K=$d(e),ue=Af(),$e=ye.wrapSend((T,I)=>ue.send(T,I)),He=Ac($e),ge=Sc(),qe=Cc(),N=Tc(),be=dc(),Le=Ec(),Ue=cc(),ze=uc(),We=pc();ue.on("impl-presets-snapshot",T=>{let I=T;I&&typeof I.revision=="number"&&Array.isArray(I.presets)&&ze.set({revision:I.revision,presets:I.presets})}),ue.on("monitor-pipeline-snapshot",T=>{let I=T;if(!(!I||!Array.isArray(I.workspaces)))try{be.set(I.workspaces,I.workspaces_state,I.cross_lanes)}catch{}}),ue.on("ui-order-snapshot",T=>{let I=T;if(I&&typeof I.revision=="number")try{Le.set({revision:I.revision,order:I.order&&typeof I.order=="object"?I.order:{}})}catch{}}),ue.on("display-policy-snapshot",T=>{let I=T;if(I&&I.policy&&typeof I.policy=="object")try{Ue.set(I.policy)}catch{}}),ue.on("session-log-snapshot",T=>{let I=T;if(I&&typeof I.id=="string")try{We.set(I.id,Array.isArray(I.lines)?I.lines:[],typeof I.last_event_at=="number"?I.last_event_at:null)}catch{}}),ue.on("session-log-append",T=>{let I=T;if(I&&typeof I.id=="string")try{We.append(I.id,I.event)}catch{}}),ue.on("snapshot",T=>{let I=T,Me=I&&typeof I.id=="string"?I.id:"",f=Me?ge.getStore(Me):null;if(f&&I&&I.type==="snapshot")try{f.applyPush(I)}catch{}}),ue.on("upsert",T=>{let I=T,Me=I&&typeof I.id=="string"?I.id:"",f=Me?ge.getStore(Me):null;if(f&&I&&I.type==="upsert")try{f.applyPush(I)}catch{}}),ue.on("delete",T=>{let I=T,Me=I&&typeof I.id=="string"?I.id:"",f=Me?ge.getStore(Me):null;if(f&&I&&I.type==="delete")try{f.applyPush(I)}catch{}});let Ge=null,et=null,it=null,ft=null,$t=()=>{},_t=new Promise(T=>{$t=()=>T(void 0)}),Q=!1,ee=!1;async function Te(T){let I=Oe(T);if(I===et||I===it)return;it=I;let Me=`detail:${T}`,f={type:"issue-detail",params:{id:T}};try{ge.register(Me,f)}catch(k){t("register detail store failed: %o",k)}try{let k=await He.subscribeList(Me,f);if(st.getState().selected_id!==T||Oe(T)!==I){await k().catch(()=>{});return}Ge&&await Ge().catch(()=>{}),Ge=k,et=I}catch(k){t("detail subscribe failed: %o",k),se(k,"issue details")}finally{it===I&&(it=null)}}let je=new Map,ot=new Set,nt={board:0,worker:0},yt=!1,mt=to;try{let T=window.localStorage.getItem(If);Ba(T)&&(mt=T)}catch{}let Mt="today";try{let T=window.localStorage.getItem(iv);T!==null&&(Mt=Rn(T))}catch{}async function D(T){if(!Ba(T)||T===mt)return;mt=T;try{window.localStorage.setItem(If,T)}catch{}let I=je.get(sr);if(!I)return;je.delete(sr),await I().catch(()=>{});let Me=vt();try{ge.register(sr,Me)}catch(f){t("register %s store failed: %o",sr,f)}try{let f=await He.subscribeList(sr,Me);je.set(sr,f)}catch(f){t("re-subscribe %s failed: %o",sr,f),se(f,"board")}}async function X(T){let I=Rn(T);if(I===Mt)return;Mt=I;let Me=E.get(rr);if(!Me)return;E.delete(rr),await Me().catch(()=>{});let f=Ve();try{ge.register(rr,f)}catch(k){t("register %s store failed: %o",rr,k)}try{let k=await He.subscribeList(rr,f);E.set(rr,k)}catch(k){t("re-subscribe %s failed: %o",rr,k),se(k,"worker")}}let E=new Map,Y=null,U=null,we=null,ct=null,Nt=null;async function un(){ct=null,Ue.clear(),Nt=null,ze.clear(),Y=null,U=null,je.clear(),E.clear(),nt.board+=1,nt.worker+=1,St();let T=st.getState().workspace.current?.path;if(T)try{await ue.send("set-workspace",{path:T})}catch(Me){t("workspace restore after reconnect failed: %o",Me);return}Ce();let I=st.getState();De(I.view==="board"),fe(I.view==="worker"),oe(I.view==="monitor"),b(I.view==="board"||I.view==="worker"||!!I.selected_id)}async function Ht(){t("clearing all subscriptions for workspace switch"),de(),x(),$(),qe.clear(),Je(),Re(),pt(),Ce(),Ne();let T=st.getState();if(T.selected_id)try{ge.unregister(`detail:${T.selected_id}`)}catch{}let I=st.getState();De(I.view==="board"),fe(I.view==="worker"),oe(I.view==="monitor"),b(I.view==="board"||I.view==="worker"||!!I.selected_id),I.selected_id&&Pe(I.selected_id)}async function Ut(T){t("requesting workspace switch to %s",T),ee=!0;try{let I=await ue.send("set-workspace",{path:T});t("workspace switch result: %o",I),I&&I.workspace&&(st.setState({workspace:{current:{path:I.workspace.root_dir,database:I.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",T),I.changed&&(await Ht(),pe("Switched to "+gt(T),"success",2e3)))}catch(I){throw t("workspace switch failed: %o",I),pe("Failed to switch workspace","error",3e3),I}finally{ee=!1}}async function Zt(T){t("requesting workspace git pull for %s",T);try{let I=await ue.send("git-pull-workspace",{});t("workspace git pull result: %o",I);let Me=I?.status;if(Me==="up_to_date"){pe("Already up to date","success",2e3);return}if(Me==="stash_pop_conflict"){pe("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}pe("Git pulled "+gt(T),"success",2e3)}catch(I){t("workspace git pull failed: %o",I);let Me=I?.code,f=I?.message;if(Me==="rebase_conflict"){pe("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Me==="rebase_conflict_abort_failed"){pe("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Me==="busy"){pe("Git pull skipped: another operation is running","warning",3e3);return}let k=f?`: ${f}`:"";throw pe(`Git pull failed${k}`,"error",3e3),I}}async function zt(T,I){t("setting workspace visibility %s \u2192 %s",T,String(I));try{await ue.send("set-workspace-visibility",{path:T,visible:I}),await Ke()}catch(Me){t("workspace visibility update failed: %o",Me),pe("Failed to update project visibility","error",3e3)}}async function Ke(){try{let T=await ue.send("list-workspaces",{});if(t("workspaces loaded: %o",T),T&&Array.isArray(T.workspaces)){let I=T.workspaces.map(q=>({path:q.path,database:q.database,pid:q.pid,version:q.version})),Me=T.current?{path:T.current.root_dir,database:T.current.db_path}:null,f=Array.isArray(T.hidden)?T.hidden.filter(q=>typeof q=="string"):[];st.setState({workspace:{current:Me,available:I,hidden:f}});let k=window.localStorage.getItem("beads-ui.workspace");k&&(!I.some(re=>re.path===k)||f.includes(k)?window.localStorage.removeItem("beads-ui.workspace"):Me&&k!==Me.path&&(t("restoring saved workspace preference: %s",k),await Ut(k)))}}catch(T){t("failed to load workspaces: %o",T)}}ue.on("workspace-changed",T=>{t("workspace-changed event: %o",T),T&&T.root_dir&&(st.setState({workspace:{current:{path:T.root_dir,database:T.db_path}}}),Ke(),Ht())});let dn=!1;if(typeof ue.onConnection=="function"){let T=I=>{t("ws state %s",I),I==="reconnecting"||I==="closed"?(dn=!0,pe("Connection lost. Reconnecting\u2026","error",4e3)):I==="open"&&dn&&(dn=!1,pe("Reconnected","success",2200),av(st,(Me,f)=>{t(`${Me}: %o`,f)}),un())};ue.onConnection(T)}let tn="board";try{let T=window.localStorage.getItem("beads-ui.view");(T==="board"||T==="worker"||T==="monitor")&&(tn=T)}catch(T){t("view parse error: %o",T)}let st=Lc({config:ov(),view:tn});ue.on("worker-queue-snapshot",T=>{let I=T;if(!I||!I.queue)return;let Me=st.getState().workspace.current?.path;if(typeof Me=="string"&&Me.length>0&&I.root_dir!==Me){t("dropping worker-queue snapshot for %s",String(I.root_dir));return}try{qe.set(I.queue)}catch{}}),ue.on("worker-parallel-analysis-snapshot",T=>{let I=T;if(!I)return;let Me=st.getState().workspace.current?.path;if(!(typeof Me=="string"&&Me.length>0&&typeof I.root_dir=="string"&&I.root_dir!==Me))try{N.set({settings:I.settings,job:I.job??null,runs:Array.isArray(I.runs)?I.runs:[],last_good:I.last_good??null})}catch{}});let Ie=Rc(st);Ie.start();let R=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),_e=async(T,I)=>{try{return await $e(T,I)}catch(Me){if(R.has(T))throw Me;return[]}};xp({global_element:r,repo_element:s},st,Ie);let Se=document.getElementById("workspace-picker");Se&&kf(Se,st,Ut,Zt,zt);let ut=Tp(e,(T,I)=>$e(T,I));try{let T=document.getElementById("new-issue-btn");T&&T.addEventListener("click",()=>ut.open())}catch{}let xt=Lp(e,{policyStore:Ue,queueStore:qe,implPresetStore:ze,transport:(T,I)=>$e(T,I),onOpenChange:T=>{let I=yt;yt=T,It(),I&&T===!1&&nn.refreshSessionDefaults()},labelOptions:()=>{let T=new Set;for(let[I]of gl)for(let Me of ge.snapshotFor(I)||[]){let f=Me.labels;if(Array.isArray(f))for(let k of f)typeof k=="string"&&k.length>0&&T.add(k)}return Array.from(T).sort()}});try{let T=document.getElementById("display-settings-btn");T&&(T.setAttribute("aria-label","\uC124\uC815"),T.setAttribute("title","\uC124\uC815"),T.addEventListener("click",()=>xt.open()))}catch{}let ht=document.createElement("div");ht.className="md-viewer-root",document.body.appendChild(ht);let Dt=Vo(ht,{getWorkspacePath:()=>st.getState().workspace.current?.path}),Gt=Vc(i,{gotoIssue:T=>Ie.gotoIssue(T),issueStores:ge,transport:_e,workerQueueStore:qe,uiOrderStore:Le,displayPolicyStore:Ue,closedRange:mt,onClosedRangeChange:T=>{D(T)},onNewIssue:()=>ut.open(),openDoc:jt}),nn=fl(c,{transport:_e,issueStores:ge,queueStore:qe,analysisStore:N,sessionLogStore:We,uiOrderStore:Le,gotoIssue:T=>st.setState({selected_id:T}),getWorkspacePath:()=>st.getState().workspace.current?.path,openDoc:jt,doneRange:Mt,onDoneRangeChange:T=>{X(T)}}),Et=$p(u,{transport:_e,pipelineStore:be,execPresetStore:ze,sessionLogStore:We,router:Ie,gotoIssue:T=>Ie.gotoIssue(T),getWorkspacePath:()=>st.getState().workspace.current?.path,switchWorkspace:T=>Ut(T),openDoc:jt}),rn=kd(d,{issueStores:ge,transport:_e,queueStore:qe,execPresetStore:ze,sessionLogStore:We,getWorkspacePath:()=>st.getState().workspace.current?.path,mdViewer:Dt,onNavigate:T=>{st.getState().view==="worker"?st.setState({selected_id:T}):Ie.gotoIssue(T)},onClose:()=>{let T=st.getState();st.setState({selected_id:null});try{Ie.gotoView(T.view==="worker"||T.view==="monitor"?T.view:"board")}catch{}},onOpenExecPresets:()=>{xt.open("execution")}}),gn=st.getState().selected_id;gn&&(d.hidden=!1,rn.load(gn),Pe(gn)),st.subscribe(T=>{let I=T.selected_id;I?(d.hidden=!1,rn.load(I),ee||Pe(I)):(rn.clear(),d.hidden=!0,Ne())});let Pn=T=>{i.hidden=T.view!=="board",c.hidden=T.view!=="worker",u.hidden=T.view!=="monitor",o&&o.classList.toggle("is-quiet",T.view==="monitor"),De(T.view==="board"),fe(T.view==="worker"),oe(T.view==="monitor"),b(T.view==="board"||T.view==="worker"||yt||!!T.selected_id),!T.selected_id&&T.view==="board"&&Gt.load(),T.view==="worker"&&nn.load(),T.view==="monitor"?Et.load():Et.pause(),window.localStorage.setItem("beads-ui.view",T.view)};st.subscribe(Pn),Pn(st.getState()),Re(),Ce(),St(),Ke().finally(()=>{Q=!0,$t()}),window.addEventListener("keydown",T=>{let I=T.ctrlKey||T.metaKey,Me=String(T.key||"").toLowerCase(),f=T.target,k=f&&f.tagName?String(f.tagName).toLowerCase():"",q=k==="input"||k==="textarea"||k==="select"||f&&typeof f.isContentEditable=="boolean"&&f.isContentEditable;I&&Me==="n"&&(q||(T.preventDefault(),ut.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&lv(t)});export{lv as bootstrap,ov as readBootstrapConfig,av as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
