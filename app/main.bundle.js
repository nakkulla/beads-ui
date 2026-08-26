var l_=Object.create;var ja=Object.defineProperty;var c_=Object.getOwnPropertyDescriptor;var u_=Object.getOwnPropertyNames;var d_=Object.getPrototypeOf,p_=Object.prototype.hasOwnProperty;var f_=(e,t,n)=>t in e?ja(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ba=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var __=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of u_(t))!p_.call(e,s)&&s!==n&&ja(e,s,{get:()=>t[s],enumerable:!(r=c_(t,s))||r.enumerable});return e};var m_=(e,t,n)=>(n=e!=null?l_(d_(e)):{},__(t||!e||!e.__esModule?ja(n,"default",{value:e,enumerable:!0}):n,e));var Tt=(e,t,n)=>f_(e,typeof t!="symbol"?t+"":t,n);var vc=Ba((Iv,yc)=>{var Rr=1e3,Or=Rr*60,Lr=Or*60,pr=Lr*24,h_=pr*7,y_=pr*365.25;yc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return v_(e);if(n==="number"&&isFinite(e))return t.long?k_(e):w_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function v_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*y_;case"weeks":case"week":case"w":return n*h_;case"days":case"day":case"d":return n*pr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Lr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Or;case"seconds":case"second":case"secs":case"sec":case"s":return n*Rr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function w_(e){var t=Math.abs(e);return t>=pr?Math.round(e/pr)+"d":t>=Lr?Math.round(e/Lr)+"h":t>=Or?Math.round(e/Or)+"m":t>=Rr?Math.round(e/Rr)+"s":e+"ms"}function k_(e){var t=Math.abs(e);return t>=pr?lo(e,t,pr,"day"):t>=Lr?lo(e,t,Lr,"hour"):t>=Or?lo(e,t,Or,"minute"):t>=Rr?lo(e,t,Rr,"second"):e+" ms"}function lo(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var kc=Ba((Pv,wc)=>{function $_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=a,n.enable=s,n.enabled=i,n.humanize=vc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let b=0;for(let k=0;k<d.length;k++)b=(b<<5)-b+d.charCodeAt(k),b|=0;return n.colors[Math.abs(b)%n.colors.length]}n.selectColor=t;function n(d){let b,k=null,y,x;function M(...U){if(!M.enabled)return;let V=M,se=Number(new Date),z=se-(b||se);V.diff=z,V.prev=b,V.curr=se,b=se,U[0]=n.coerce(U[0]),typeof U[0]!="string"&&U.unshift("%O");let j=0;U[0]=U[0].replace(/%([a-zA-Z%])/g,(H,I)=>{if(H==="%%")return"%";j++;let C=n.formatters[I];if(typeof C=="function"){let J=U[j];H=C.call(V,J),U.splice(j,1),j--}return H}),n.formatArgs.call(V,U),(V.log||n.log).apply(V,U)}return M.namespace=d,M.useColors=n.useColors(),M.color=n.selectColor(d),M.extend=r,M.destroy=n.destroy,Object.defineProperty(M,"enabled",{enumerable:!0,configurable:!1,get:()=>k!==null?k:(y!==n.namespaces&&(y=n.namespaces,x=n.enabled(d)),x),set:U=>{k=U}}),typeof n.init=="function"&&n.init(M),M}function r(d,b){let k=n(this.namespace+(typeof b>"u"?":":b)+d);return k.log=this.log,k}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let b=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let k of b)k[0]==="-"?n.skips.push(k.slice(1)):n.names.push(k)}function o(d,b){let k=0,y=0,x=-1,M=0;for(;k<d.length;)if(y<b.length&&(b[y]===d[k]||b[y]==="*"))b[y]==="*"?(x=y,M=k,y++):(k++,y++);else if(x!==-1)y=x+1,M++,k=M;else return!1;for(;y<b.length&&b[y]==="*";)y++;return y===b.length}function a(){let d=[...n.names,...n.skips.map(b=>"-"+b)].join(",");return n.enable(""),d}function i(d){for(let b of n.skips)if(o(d,b))return!1;for(let b of n.names)if(o(d,b))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}wc.exports=$_});var $c=Ba((an,co)=>{an.formatArgs=A_;an.save=S_;an.load=E_;an.useColors=x_;an.storage=T_();an.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();an.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function x_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function A_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+co.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}an.log=console.debug||console.log||(()=>{});function S_(e){try{e?an.storage.setItem("debug",e):an.storage.removeItem("debug")}catch{}}function E_(){let e;try{e=an.storage.getItem("debug")||an.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function T_(){try{return localStorage}catch{}}co.exports=kc()(an);var{formatters:C_}=co.exports;C_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var es=globalThis,to=es.trustedTypes,rc=to?to.createPolicy("lit-html",{createHTML:e=>e}):void 0,Wa="$lit$",qn=`lit$${Math.random().toFixed(9).slice(2)}$`,za="?"+qn,g_=`<${za}>`,lr=document,ts=()=>lr.createComment(""),ns=e=>e===null||typeof e!="object"&&typeof e!="function",Ha=Array.isArray,cc=e=>Ha(e)||typeof e?.[Symbol.iterator]=="function",Ua=`[ 	
\f\r]`,Jr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,sc=/-->/g,oc=/>/g,ar=RegExp(`>|${Ua}(?:([^\\s"'>=/]+)(${Ua}*=${Ua}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ac=/'/g,ic=/"/g,uc=/^(?:script|style|textarea|title)$/i,Ga=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Ga(1),ss=Ga(2),Sv=Ga(3),hn=Symbol.for("lit-noChange"),jt=Symbol.for("lit-nothing"),lc=new WeakMap,ir=lr.createTreeWalker(lr,129);function dc(e,t){if(!Ha(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return rc!==void 0?rc.createHTML(t):t}var pc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Jr;for(let i=0;i<n;i++){let l=e[i],u,d,b=-1,k=0;for(;k<l.length&&(a.lastIndex=k,d=a.exec(l),d!==null);)k=a.lastIndex,a===Jr?d[1]==="!--"?a=sc:d[1]!==void 0?a=oc:d[2]!==void 0?(uc.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=ar):d[3]!==void 0&&(a=ar):a===ar?d[0]===">"?(a=s??Jr,b=-1):d[1]===void 0?b=-2:(b=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?ar:d[3]==='"'?ic:ac):a===ic||a===ac?a=ar:a===sc||a===oc?a=Jr:(a=ar,s=void 0);let y=a===ar&&e[i+1].startsWith("/>")?" ":"";o+=a===Jr?l+g_:b>=0?(r.push(u),l.slice(0,b)+Wa+l.slice(b)+qn+y):l+qn+(b===-2?i:y)}return[dc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},rs=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,d]=pc(t,n);if(this.el=e.createElement(u,r),ir.currentNode=this.el.content,n===2||n===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(s=ir.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let b of s.getAttributeNames())if(b.endsWith(Wa)){let k=d[a++],y=s.getAttribute(b).split(qn),x=/([.?@])?(.*)/.exec(k);l.push({type:1,index:o,name:x[2],strings:y,ctor:x[1]==="."?ro:x[1]==="?"?so:x[1]==="@"?oo:ur}),s.removeAttribute(b)}else b.startsWith(qn)&&(l.push({type:6,index:o}),s.removeAttribute(b));if(uc.test(s.tagName)){let b=s.textContent.split(qn),k=b.length-1;if(k>0){s.textContent=to?to.emptyScript:"";for(let y=0;y<k;y++)s.append(b[y],ts()),ir.nextNode(),l.push({type:2,index:++o});s.append(b[k],ts())}}}else if(s.nodeType===8)if(s.data===za)l.push({type:2,index:o});else{let b=-1;for(;(b=s.data.indexOf(qn,b+1))!==-1;)l.push({type:7,index:o}),b+=qn.length-1}o++}}static createElement(t,n){let r=lr.createElement("template");return r.innerHTML=t,r}};function cr(e,t,n=e,r){if(t===hn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=ns(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=cr(e,s._$AS(e,t.values),s,r)),t}var no=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??lr).importNode(n,!0);ir.currentNode=s;let o=ir.nextNode(),a=0,i=0,l=r[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Tr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new ao(o,this,t)),this._$AV.push(u),l=r[++i]}a!==l?.index&&(o=ir.nextNode(),a++)}return ir.currentNode=lr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Tr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=jt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=cr(this,t,n),ns(t)?t===jt||t==null||t===""?(this._$AH!==jt&&this._$AR(),this._$AH=jt):t!==this._$AH&&t!==hn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):cc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==jt&&ns(this._$AH)?this._$AA.nextSibling.data=t:this.T(lr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=rs.createElement(dc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new no(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=lc.get(t.strings);return n===void 0&&lc.set(t.strings,n=new rs(t)),n}k(t){Ha(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(ts()),this.O(ts()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ur=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=jt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=jt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=cr(this,t,n,0),a=!ns(t)||t!==this._$AH&&t!==hn,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=cr(this,i[r+l],n,l),u===hn&&(u=this._$AH[l]),a||(a=!ns(u)||u!==this._$AH[l]),u===jt?t=jt:t!==jt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===jt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ro=class extends ur{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===jt?void 0:t}},so=class extends ur{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==jt)}},oo=class extends ur{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=cr(this,t,n,0)??jt)===hn)return;let r=this._$AH,s=t===jt&&r!==jt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==jt&&(r===jt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ao=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){cr(this,t)}},fc={M:Wa,P:qn,A:za,C:1,L:pc,R:no,D:cc,V:cr,I:Tr,H:ur,N:so,U:oo,B:ro,F:ao},b_=es.litHtmlPolyfillSupport;b_?.(rs,Tr),(es.litHtmlVersions??(es.litHtmlVersions=[])).push("3.3.1");var Qe=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Tr(t.insertBefore(ts(),o),o,void 0,n??{})}return s._$AI(e),s};var io="today",_c=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Cr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function In(e){return e==="today"?"today":"7d"}function Ka(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function dr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function mc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function gc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function bc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function hc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var xc=m_($c(),1);function It(e){return(0,xc.default)(`beads-ui:${e}`)}function xn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function fr(e,t){let n=xn(e.created_at),r=xn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ec(e,t){let n=xn(e.created_at),r=xn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function uo(e,t){let n=xn(e.updated_at),r=xn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Tc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=xn(e.created_at),o=xn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Cc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var R_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ac(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Sc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=R_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Rc(e,t){let n=Ac(e),r=Ac(t);if(n!==r)return n<r?-1:1;let s=Sc(e),o=Sc(t);if(s!==o)return s<o?-1:1;let a=xn(e&&e.created_at),i=xn(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var Va=2**20;function Ir(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-xn(e&&e.created_at)}function po(e){return(t,n)=>{let r=Ir(t,e),s=Ir(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Ya(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Ir(i,n)-Va};if(!i)return{rank:Ir(a,n)+Va};let l=Ir(a,n),u=Ir(i,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((b,k)=>({bead_id:b.id,rank:k*Va}))}}function Za(e,t={}){let n=It(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||fr;function u(){for(let k of Array.from(a))try{k()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function b(k){if(i||!k||k.id!==e)return;let y=Number(k.revision)||0;if(n("apply %s rev=%d",k.type,y),!(y<=o&&k.type!=="snapshot")){if(k.type==="snapshot"){if(y<=o)return;r.clear();let x=Array.isArray(k.issues)?k.issues:[];for(let M of x)M&&typeof M.id=="string"&&M.id.length>0&&r.set(M.id,M);d(),o=y,u();return}if(k.type==="upsert"){let x=k.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let M=r.get(x.id);if(!M)r.set(x.id,x);else{let U=Number.isFinite(M.updated_at)?M.updated_at:0,V=Number.isFinite(x.updated_at)?x.updated_at:0;if(U<=V){for(let se of Object.keys(M))se in x||delete M[se];for(let[se,z]of Object.entries(x))M[se]=z}}d()}o=y,u()}else if(k.type==="delete"){let x=String(k.issue_id||"");x&&(r.delete(x),d()),o=y,u()}}}return{id:e,subscribe(k){return a.add(k),()=>{a.delete(k)}},applyPush:b,snapshot(){return s},size(){return r.size},getById(k){return r.get(k)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function fo(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Oc(e){let t=It("subs"),n=new Map,r=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],b=Array.isArray(l.updated)?l.updated:[],k=Array.isArray(l.removed)?l.removed:[];for(let y of Array.from(u)){let x=n.get(y);if(!x)continue;let M=x.itemsById;for(let U of d)typeof U=="string"&&U.length>0&&M.set(U,!0);for(let U of b)typeof U=="string"&&U.length>0&&M.set(U,!0);for(let U of k)typeof U=="string"&&U.length>0&&M.delete(U)}}async function o(i,l){let u=fo(l);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let b=n.get(i);if(b&&b.key!==u){let k=r.get(b.key);k&&(k.delete(i),k.size===0&&r.delete(b.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(b){let k=n.get(i)||null;if(k){let y=r.get(k.key);y&&(y.delete(i),y.size===0&&r.delete(k.key))}throw n.delete(i),b}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let b=n.get(i)||null;if(b){let k=r.get(b.key);k&&(k.delete(i),k.size===0&&r.delete(b.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:fo,selectors:{getIds(i){let l=n.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=n.get(i);return u?u.itemsById.has(l):!1},count(i){let l=n.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=n.get(i),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function Lc(){let e=It("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function a(l,u,d){let b=u?fo(u):"",k=n.get(l)||"",y=t.has(l);if(e("register %s key=%s (prev=%s)",l,b,k),y&&k&&b&&k!==b){let x=t.get(l);if(x)try{x.dispose()}catch{}let M=s.get(l);if(M){try{M()}catch{}s.delete(l)}let U=Za(l,d);t.set(l,U);let V=U.subscribe(()=>o());s.set(l,V)}else if(!y){let x=Za(l,d);t.set(l,x);let M=x.subscribe(()=>o());s.set(l,M)}return n.set(l,b),()=>i(l)}function i(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function Ic(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Pc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Mc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Xa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function O_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function L_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Dc(e){let t=It("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):O_(r),a=L_(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Xa(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Xa(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var I_=Object.freeze({workspace_config:{default_workspace:null}});function Nc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:I_.workspace_config.default_workspace}}}function qc(e={}){let t=It("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Nc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Nc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!l||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Fc(e){let t=It("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(b,k)=>{let y=s++,x=Date.now();r.set(y,{type:b,start_ts:x}),t("request start id=%d type=%s count=%d",y,b,n+1),a();let M=!1,U=()=>{M||(M=!0,r.delete(y),i())},V=setTimeout(()=>{M||(t("request TIMEOUT id=%d type=%s elapsed=%dms",y,b,Date.now()-x),U())},3e4);try{let se=await u(b,k),z=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",y,b,z),se}catch(se){let z=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",y,b,z,se),se}finally{clearTimeout(V),U()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,b])=>({id:d,type:b.type,elapsed_ms:u-b.start_ts}))}}}function de(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function _o(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Cc),l;switch(i){case"created_desc":return l.sort(fr),l;case"created_asc":return l.sort(Ec),l;case"updated_desc":return l.sort(uo),l;case"priority":return l.sort(Tc),l;case"manual":default:{let u=n();return u?l.sort(po(u)):l.sort(fr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Pn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Yt(e){let t=Pn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function ln(e,t){let n=Pn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function jc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Pn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function mo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function go(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=mo(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function bo(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=jc(n);return{total:n.length,count:r,current:s,children:n}}function ho(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Ya(i,l,u.order),a);s(u,d);let b=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(b&&b.conflict){let k={revision:typeof b.revision=="number"?b.revision:0,order:b.order||{}};n.set(k);let y=r(Ya(i,l,k.order),a);s(k,y);let x=await t("ui-order-set",{expected_revision:k.revision,entries:y});x&&x.applied&&n.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else b&&b.applied&&n.set({revision:typeof b.revision=="number"?b.revision:0,order:b.order||{}})}return{applyReorder:o}}function Bc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function yo(e,t){let n=Bc(e),r=Bc(t);return n.length===0||r.length===0?!1:n!==r}function vo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Qa(e,t){return!t||typeof e!="string"||e.length===0||vo(t.visible_labels).includes(e)?!0:vo(t.hidden_labels).includes(e)?!1:!vo(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Uc(e,t){return vo(e).filter(n=>Qa(n,t))}function Yn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function P_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function M_(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function D_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${P_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function wo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(Rc):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?M_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((l,u)=>D_(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var N_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},zc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Wc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},q_={review:"\u2713",skip:"\u2298"},Zn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function F_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Hc(e){let t=e&&e.fill||"none";return t==="none"?Zn.none:e&&e.stale===!0?Zn.stale:t==="dim"?Zn.dim:e&&e.glyph==="review"?Zn.review:e&&e.glyph==="skip"?Zn.skip:Zn.done}function j_(e){if(!e||e.fill==="none"||!e.approval_state)return Hc(e);let t=[];return e.glyph==="review"?t.push(Zn.review):e.glyph==="skip"&&t.push(Zn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function B_(e,t,n,r){let s=N_[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=q_[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),a&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",b=zc[e]||e,k=r?Gc(t):null;if(!k)return c`
      <div class="seg">
        <div class=${l} style=${d}>${i}</div>
        <div class=${u}>${b}</div>
      </div>
    `;let y=`${b} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${k.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${y}
      title=${y}
      @click=${x=>{x.preventDefault(),x.stopPropagation(),r(x,k,e)}}
    >
      <div class=${l} style=${d}>${i}</div>
      <div class=${u}>${b}</div>
    </button>
  `}function Gc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ko(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=Wc[e.route]||Wc.spec_backed,o=e.stages,a=F_(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${zc[u]||u} ${u==="plan"?j_(o[u]||{}):Hc(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>Gc(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>B_(u,o[u]||{},u===a,r))}
    </div>
  `}function U_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Kc=2;function Vc(e){let t=e.slice(0,Kc).join(", "),n=e.length-Kc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function W_(e,t){if(!t)return[];let n=[];if(t.external){let a=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${a}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let a of r)(yo(e,a)?o:s).push(a);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Vc(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Vc(o)}</span
      >`),n}function Ja(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function $o(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Fn(e){return`${e.kind}:${$o(e)}@${e.sha}`}function xo(e,t){if(!e)return null;let n=Ja(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=Ja(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Fn(t)}`:"";return{kind:e.kind,label:i,title:`${l}${u}`}}function Yc(e,t){let n=xo(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function z_(e){if(!e)return null;let t=Ja(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Fn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function H_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Yn(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Yn(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Yn(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Yc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Fn(i)}`}
        >${`exec ${i.kind==="delegated"?$o(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of Uc(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Yn(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Yn(n,"blocked")&&s.push(...W_(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Yn(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function G_(e){let t=ln(e.created_at),n=ln(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Yt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Yt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function K_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return wo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:G_(e),empty_label:"children \uC5C6\uC74C",childChips:ei,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function ei(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return xo(t,n)?c`<span class="board-card__roll-child-chips">
    ${Yc(t,n)}
    ${z_(n)}
  </span>`:null}function Ao(e,t){let n=U_(e.priority);return c`
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
        ${n?c`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${H_(e,t)}
      ${e.workflow&&Yn(t.policy||null,"stepper")?ko(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${K_(e,t)}
    </article>
  `}function Pr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
        ${r?c`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${_c.map(o=>c`<option
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
        ${e.items.map(o=>Ao(o,t))}
      </div>
    </section>
  `}function Zc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Ao(r,t))}
        </div>
      </div>
    </dialog>
  `}var V_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Y_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Z_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function X_(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
      ${n.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(o=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${r>0?c`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Xc(e,t,n){return c`
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
        ${V_.map(r=>c`<option
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
        ${Y_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${X_(e,t,n)}
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
        ${Z_.map(r=>c`<option
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
  `}var Q_=200,J_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},em=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Qc="beads-ui.board.sort",Jc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function tm(){try{let e=window.localStorage.getItem(Qc);if(e&&Jc.has(e))return e}catch{}return"created_desc"}function eu(e,t){let n=It("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,b=t.openDoc,k=t.closedRange||io,y=s?_o(s,a):null,x=ho({transport:o,uiOrderStore:a}),M=[],U=[],V=[],se=[],z=[],j=[],F=!1,H=0,I=tm(),C=new Map,J=new Map,we=new Map,ve=new Set,W={search:"",priority:"",type:"",labels:[]},te=!1,fe=null;function Ae(E){return String(E.status||"open")==="open"}function he(E){let K=String(E.status||"open");return K==="open"||K==="blocked"}function le(E){let K=W.search.trim().toLowerCase(),pe=W.priority,S=W.type,h=W.labels;return E.filter(A=>{if(K){let B=String(A.id||"").toLowerCase(),re=String(A.title||"").toLowerCase();if(!B.includes(K)&&!re.includes(K))return!1}if(pe!==""&&String(A.priority)!==pe||S!==""&&String(A.issue_type||"")!==S)return!1;if(h.length>0){let B=Array.isArray(A.labels)?A.labels:[];if(!h.some(re=>B.includes(re)))return!1}return!0})}function Se(){let E=new Set;for(let K of[M,U,V,se,z,j])for(let pe of K){let S=Array.isArray(pe.labels)?pe.labels:[];for(let h of S)typeof h=="string"&&h.length>0&&E.add(h)}return Array.from(E).sort()}function ye(){return W.search.trim()!==""||W.priority!==""||W.type!==""||W.labels.length>0}function G(){try{if(y){let E=y.selectBoardColumn("tab:board:in-progress","in_progress",I),K=y.selectBoardColumn("tab:board:blocked","blocked",I).filter(he),pe=new Set(E.map(De=>De.id)),S=y.selectBoardColumn("tab:board:ready","ready",I).filter(De=>Ae(De)&&!pe.has(De.id)),h=y.selectBoardColumn("tab:board:resolved","resolved",I),A=y.selectBoardColumn("tab:board:deferred","deferred",I),B=y.selectBoardColumn("tab:board:closed","closed").slice(0,Q_),re=[...K,...S,...E,...h,...B];oe(re);let ae=new Set;for(let De of re)De&&De.id&&!mo(De)&&ae.add(De.id);let be=!ye();M=be?os(K,ae):K,U=be?os(S,ae):S,V=be?os(E,ae):E,se=be?os(h,ae):h,z=A,H=A.length,j=be?os(B,ae):B,C=new Map;for(let De of M)C.set(De.id,"open");for(let De of U)C.set(De.id,"open");for(let De of V)C.set(De.id,"in_progress");for(let De of se)C.set(De.id,"resolved");for(let De of z)C.set(De.id,"deferred");for(let De of j)C.set(De.id,"closed");J=new Map;for(let De of M)J.set(De.id,"blocked-col");for(let De of U)J.set(De.id,"ready-col");for(let De of V)J.set(De.id,"in-progress-col");for(let De of se)J.set(De.id,"resolved-col");for(let De of j)J.set(De.id,"closed-col")}et()}catch{M=[],U=[],V=[],se=[],z=[],j=[],we=new Map,et()}}function oe(E){we=go(E)}function ce(E){return bo(we,E)}function $e(E){return!ve.has(E)}function Ge(E,K){E.preventDefault(),E.stopPropagation(),ve.has(K)?ve.delete(K):ve.add(K),et()}function _e(E,K){E.preventDefault(),E.stopPropagation(),r(K)}function Fe(E,K){E.preventDefault(),E.stopPropagation(),r(K)}function D(E,K){fe||r(K)}function ge(E,K){E.preventDefault(),E.stopPropagation(),nm(K).then(pe=>{pe&&de("\uBCF5\uC0AC\uB428","success",1200)})}function Le(E,K){fe=K,E.dataTransfer&&(E.dataTransfer.setData("text/plain",K),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging")}function ze(E){E.target.classList.remove("board-card--dragging"),wt(),setTimeout(()=>{fe=null},0)}function He(E){let K=String(E.target.value||"");!K||K===k||(k=K,u&&u(K),et())}function Be(){return i?i.get():null}function Ke(E){let K=l?l.get():null,pe=K?K.cleanup_failed:null;if(!pe||typeof pe!="object"||Array.isArray(pe))return null;let S=pe[E];return!S||typeof S!="object"||Array.isArray(S)?null:S}let Je={onCardClick:D,onCopyId:ge,onDragStart:Le,onDragEnd:ze,onClosedRangeChange:He,rollupFor:ce,isExpanded:$e,onRollupToggle:Ge,onChildClick:_e,onFromChipClick:Fe,onOpenDoc:b?(E,K)=>b(K):void 0,cleanupFailureFor:Ke,get policy(){return Be()}};function it(E,K){fe||(Pe(),r(K))}function mt(E,K){E.preventDefault(),E.stopPropagation(),Pe(),r(K)}let St={...Je,onCardClick:it,onChildClick:mt,onFromChipClick:mt,onOpenDoc:b?(E,K)=>{Pe(),b(K)}:void 0,get policy(){return Be()}};function gt(E){let K=E.target,pe=e.querySelector(".board-filter__labels");K&&pe&&pe.contains(K)||Oe()}function X(E){E.key==="Escape"&&Oe()}function Q(){te||(te=!0,document.addEventListener("mousedown",gt),document.addEventListener("keydown",X),et())}function Oe(){te&&(te=!1,document.removeEventListener("mousedown",gt),document.removeEventListener("keydown",X),et())}function qe(E){E.key==="Escape"&&Pe()}function Ce(){F||(F=!0,document.addEventListener("keydown",qe),et())}function Pe(){F&&(F=!1,document.removeEventListener("keydown",qe),et())}let je={onClose:Pe,onOverlayClick(E){E.target===E.currentTarget&&Pe()}},at={onSearchInput(E){W.search=String(E.target.value||""),G()},onPriorityChange(E){W.priority=String(E.target.value||""),G()},onTypeChange(E){W.type=String(E.target.value||""),G()},onSortChange(E){let K=String(E.target.value||"");if(!(!Jc.has(K)||K===I)){I=K;try{window.localStorage.setItem(Qc,K)}catch{}G()}},onDeferredToggle(){F?Pe():Ce()},onLabelMenuToggle(){te?Oe():Q()},onLabelToggle(E){let K=W.labels.indexOf(E);K===-1?W.labels.push(E):W.labels.splice(K,1),G()},onLabelClear(){W.labels.length!==0&&(W.labels=[],G())},onNewIssue(){d&&d()}};function st(){return c`
      <div class="board-view">
        ${Xc(W,at,{sort_mode:I,deferred_popup_open:F,deferred_count:H,label_options:Se(),label_menu_open:te})}
        <div class="board-root">
          ${Pr({title:"Blocked",id:"blocked-col",items:le(M)},Je)}
          ${Pr({title:"Ready",id:"ready-col",items:le(U)},Je)}
          ${Pr({title:"In progress",id:"in-progress-col",items:le(V)},Je)}
          ${Pr({title:"Resolved",id:"resolved-col",items:le(se)},Je)}
          ${Pr({title:"Closed",id:"closed-col",items:le(j),is_closed:!0,closed_range:k},Je)}
        </div>
        ${F?Zc({items:le(z),count:H},St,je):""}
      </div>
    `}function et(){Qe(st(),e),vt()}function vt(){try{let E=e.querySelector("#deferred-popup");E&&!E.open&&(typeof E.showModal=="function"?E.showModal():E.setAttribute("open",""));let K=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let pe of K)Array.from(pe.querySelectorAll(".board-card")).forEach((h,A)=>{h.tabIndex=A===0?0:-1})}catch{}}async function Pt(E,K){if(!o){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:E,status:K}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(pe){n("update-status failed: %o",pe),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function bt(E){switch(E){case"blocked-col":return M;case"ready-col":return U;case"in-progress-col":return V;case"resolved-col":return se;default:return[]}}function Ft(E,K,pe){if(!o||!a)return;let S=bt(E),h=S.find(be=>be.id===K);if(!h)return;let A=S.filter(be=>be.id!==K),B=pe.closest?pe.closest(".board-card"):null,re=A.length;if(B){let be=B.getAttribute("data-issue-id");if(be===K)return;let De=A.findIndex(nt=>nt.id===be);De>=0&&(re=De)}let ae=A.slice();ae.splice(re,0,h),x.applyReorder(K,ae,re)}function wt(){for(let E of Array.from(e.querySelectorAll(".board-column--drag-over")))E.classList.remove("board-column--drag-over")}let Ve=null;e.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let pe=E.target.closest(".board-column");pe&&pe!==Ve&&(Ve&&Ve.classList.remove("board-column--drag-over"),pe.classList.add("board-column--drag-over"),Ve=pe)}),e.addEventListener("dragleave",E=>{let K=E.relatedTarget;(!K||!e.contains(K))&&Ve&&(Ve.classList.remove("board-column--drag-over"),Ve=null)}),e.addEventListener("drop",E=>{E.preventDefault(),Ve&&(Ve.classList.remove("board-column--drag-over"),Ve=null);let K=E.target,pe=K.closest(".board-column");if(!pe)return;let S=E.dataTransfer?.getData("text/plain")||"";if(!S)return;let h=pe.id,A=J.get(S);if(A&&A===h){if(em.has(h)){if(I!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ft(h,S,K)}return}let B=J_[h];if(!B){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}C.get(S)!==B&&Pt(S,B)}),e.addEventListener("keydown",E=>{let K=E.target;if(!(K instanceof HTMLElement))return;let pe=String(K.tagName||"").toLowerCase();if(pe==="input"||pe==="textarea"||pe==="select"||pe==="button"||pe==="a"||K.isContentEditable===!0)return;let S=K.closest(".board-card");if(!S)return;let h=String(E.key||"");if(h==="Enter"||h===" "){E.preventDefault();let ae=S.getAttribute("data-issue-id");ae&&r(ae);return}if(h!=="ArrowUp"&&h!=="ArrowDown"&&h!=="ArrowLeft"&&h!=="ArrowRight")return;E.preventDefault();let A=S.closest(".board-column");if(!A)return;let B=Array.from(A.querySelectorAll(".board-card")),re=B.indexOf(S);if(h==="ArrowDown"&&re<B.length-1){Me(S,B[re+1]);return}if(h==="ArrowUp"&&re>0){Me(S,B[re-1]);return}if(h==="ArrowLeft"||h==="ArrowRight"){let ae=Array.from(e.querySelectorAll(".board-column")),be=ae.indexOf(A),De=h==="ArrowRight"?1:-1,nt=be+De;for(;nt>=0&&nt<ae.length;){let ot=ae[nt].querySelector(".board-card");if(ot){Me(S,ot);return}nt+=De}}});function Me(E,K){try{E.tabIndex=-1,K.tabIndex=0,K.focus()}catch{}}let L=null;y&&y.subscribe&&(L=y.subscribe(()=>{try{G()}catch{}}));let Z=null;i&&i.subscribe&&(Z=i.subscribe(()=>{try{G()}catch{}}));let ue=null;return l&&l.subscribe&&(ue=l.subscribe(()=>{et()})),{async load(){n("load"),G()},clear(){Oe(),Pe(),L&&(L(),L=null),Z&&(Z(),Z=null),ue&&(ue(),ue=null),e.replaceChildren(),M=[],U=[],V=[],se=[],z=[],j=[],C=new Map,J=new Map}}}function os(e,t){return e.filter(n=>{let r=mo(n);return!(r&&t.has(r))})}async function nm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function fn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function _r(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function as(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function rm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${_r(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${_r(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function jn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await rm(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var sm=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],tu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},om=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Ht(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Dt(e){return typeof e=="string"&&e.length>0?e:null}function Mr(e){return e.startsWith("gpt-")?e.slice(4):e}function Ot(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function ru(e,t,n){let r=Dt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Dt(n[e]);return s===null?null:{value:s,source:"global"}}function is(e,t,n,r){return ru(e,t,n)||{value:r,source:"base"}}function ti(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Ht(s?.[t])){let a=Dt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Ht(s)){for(let a of Object.values(s))if(Ht(a)){let i=Dt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Dt(r?.runners?.[o]?.models?.[e]?.id)||e}function am(e,t){return Dt(t?.review?.reviewers?.[e]?.model)||e}function Dr(e,t,n=!1){if(e==="default")return Ot(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Mr(e):e;return Ot(e,t,r,e,"explicit")}function su(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Ht(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(Ht(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function im(e,t){let n=[],r=e?.implementation?.model_catalog;Ht(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Ht(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function lm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of im(t,n)){let o=su(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function ni(e){return Ot(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function nu(e,t,n){let r=ru(e,t,n);return r?Dr(r.value,r.source):Ot(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function cn(e){let t=Ht(e.pin)?e.pin:{},n=Ht(e.global)?e.global:{},r=Ht(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Ht(r.session)?r.session:null,o=r?.supported===!0&&Ht(r.orchestration)?r.orchestration:null,a=Ht(e.runner_catalog)?e.runner_catalog:null,i=Dt(n.quick_fix_impl_model),l=lm(i,s,a),u={};if(s){let d=is("workflow_mode",t,n,Dt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Ot(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Dr(d.value,d.source);for(let z of["spec_review","plan_review","impl_review"]){let j=`${z}_model`,F=Dt(z==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),H=is(j,t,n,F);if(H.value===null)u[j]=Ot(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(H.value!=="self"&&H.value!=="skip"&&!Ht(s.review?.reviewers?.[H.value]))u[j]=ni(Ot(H.value,H.source,"",null,"explicit"));else{let I=am(H.value,s);u[j]=Ot(H.value,H.source,Mr(I),I,H.source==="base"?"default":"explicit")}}for(let[z,j]of Object.entries(tu)){let F=u[j].value;if(F==="self"||F==="skip"){u[z]=Ot(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let H=Dt(s.review?.reviewers?.[F||""]?.effort),I=is(z,t,n,H);u[z]=I.value===null?Ot(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ot(I.value,I.source,I.value,I.value,I.source==="base"?"default":"explicit")}let b=Ht(s.implementation?.default)?s.implementation.default:{},k=Dt(e.route),y=k!==null&&["quick_fix","spec_backed","full_plan"].includes(k),x=Ht(s.implementation?.route_defaults)?s.implementation.route_defaults:{},M=y&&Ht(x[k])?x[k]:{};for(let z of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let j=is(z,t,n,z==="impl_dispatch"?Dt(M.dispatch)||Dt(b.dispatch):Dt(b[z.replace("impl_","")]));u[z]=j.value===null?Ot(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ot(j.value,j.source,j.value,j.value,j.source==="base"?"default":"explicit")}let U=Dt(t.impl_runtime),V=U==="inherit"?Dt(e.controller_runtime):U,se=k==="quick_fix"&&Dt(t.impl_dispatch)===null&&l.runtime!==null&&(U===null||V===l.runtime);if(se){let z=l.runtime,j=i;u.impl_dispatch=Ot("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),U===null&&(u.impl_runtime=Ot(z,"global",`${z} (\uC720\uB3C4)`,z,"explicit")),Dt(t.impl_model)===null&&(u.impl_model=Ot(j,"global",j,j,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let z of["impl_runtime","impl_model","impl_effort","impl_speed"])u[z]=Ot(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!se&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let z=u.impl_runtime.value==="inherit"?Dt(e.controller_runtime):u.impl_runtime.value,j=z?su(z,s,a):[];if(u.impl_model.value!=="auto"&&j.length>0&&!j.includes(u.impl_model.value))u.impl_model=ni(u.impl_model);else{let F=ti(u.impl_model.value,z,s,a);u.impl_model.display=Mr(F),u.impl_model.full_value=F}}if(u.impl_effort.value==="auto"){let z=Dt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),j=z?Dt(s.implementation?.effort_by_transport?.[z]?.auto):null;j&&!om.has(j)?(u.impl_effort.display=`${j} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=j,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Ot("default","base","default (\uC77C\uBC18)","default","default"):Dr("default",u.impl_speed.source))}}else for(let d of sm.filter(b=>!b.startsWith("orchestration_")))u[d]=nu(d,t,n);if(!s){for(let[d,b]of Object.entries(tu))(u[b].value==="self"||u[b].value==="skip")&&(u[d]=Ot(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Ot(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=nu(d,t,n);continue}let b=d.replace("orchestration_",""),k=Dt(o[b]),y=is(d,t,n,k);if(d==="orchestration_effort"&&y.source==="base"){u[d]=Ot(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(y.value===null){u[d]=Ot(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let x=y.source==="base"?Dt(o.model_id)||y.value:ti(y.value,null,s,a);u[d]=Ot(y.value,y.source,Mr(x),x,y.source==="base"?"default":"explicit");continue}if(y.value==="default"){u[d]=y.source==="base"?Ot("default","base","default (\uC77C\uBC18)","default","default"):Dr("default",y.source);continue}u[d]=Dr(y.value,y.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Ot(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Mr(d)})`,null,"default")}else if(l.runtime!==null){let d=ti(i,l.runtime,s,a);u.quick_fix_impl_model=Ot(i,"global",Mr(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=ni(Ot(i,"global","",null,"explicit")):u.quick_fix_impl_model=Dr(i,"global");return u}function cm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function So(e){let t=Ht(e.pin)?e.pin:{},n=Ht(e.global)?e.global:{},r=Ht(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=b=>{let k={...r,...b};return cn({pin:e.layer==="pin"?k:t,global:e.layer==="pin"?n:k,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],l=s(o)[e.key],u=Dt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:cm(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(b=>{let k=s({...o,[e.key]:b})[e.key];return{value:b,label:k.display,full_value:k.full_value}})}}function Nr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let l=!1,u=b=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(b))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",b=>{b.key==="Enter"&&(b.ctrlKey||b.metaKey)&&(b.preventDefault(),d())}),t.addEventListener("cancel",b=>{b.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function ri(e){return`session:${e.provider}:${e.session_id}`}function ls(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function um(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Eo(e,t,n,r){return{attempt_id:ri(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:ls(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:um(e,n)}}}var si="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",dm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",ou="\uBD84\uD574 \uC5C6\uB294 leg";function Bt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Dn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],qr=[...Dn,"reasoning_output_tokens"],pm={codex:["implementation","review-consult"],claude:["subagent"]};function oi(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Dn.some(t=>Number.isFinite(e[t]))}function fm(e){return!e||typeof e!="object"?!1:qr.some(t=>Number.isFinite(e[t]))}function ai(e){let t=0;for(let n of Dn)t+=Bt(e?.[n]);return t}function _m(e){return!e||typeof e!="object"?!1:Dn.some(t=>Number.isFinite(e[t]))}function au(e){return!e||typeof e!="object"?!1:qr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function mm(e){let t={};for(let n of qr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function iu(e){let t={};for(let n of qr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function lu(e,t){return oi(t)?Bt(t.total_tokens):e==="codex"?Bt(t.input_tokens)+Bt(t.output_tokens):ai(t)}function gm(e){return e==="claude"?"Claude":"Codex"}function bm(e){return`\u03C4 ${uu(e)}`}function hm(e,t){let n=t.breakdown||{},r=Bt(t.total_only_subtotal);if(oi(n)||r>0&&!fm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,dm];return t.replayed&&u.push(si),u.join(`
`)}let s=[`\uC785\uB825 ${Bt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Bt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Bt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${ou} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",a=r>0?`${o} + ${ou}`:o,l=[e==="claude"?`Claude subtotal = ${a}`:`Codex subtotal = ${a}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(si),l.join(`
`)}function Zt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${gm(n)} ${bm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:hm(n,r)})}return t}function Co(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal,Number.isFinite(a.total_only_subtotal)&&(i.total_only_subtotal=Bt(i.total_only_subtotal)+Bt(a.total_only_subtotal));for(let l of qr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=Bt(i.breakdown[l])+Bt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ii(e){return!e||typeof e!="object"?null:yn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function ym(e){return e==="codex"?"codex":"claude"}function Mn(){return{subtotal:0,breakdown:mm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function To(e,t,n){e.subtotal+=t.subtotal,oi(t.usage)&&(e.total_only+=t.subtotal);for(let r of qr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Bt(e.breakdown[r])+Bt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function cu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function uu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Fr(e){return _m(e)?`\u03C4 ${uu(ai(e))}`:null}function Bn(e){let t=Fr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function cs(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Bt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Bt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${ai(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(si),n.join(`
`)}function yn(e,t){let n={claude:Mn(),codex:Mn()},r={orchestrator:{claude:Mn(),codex:Mn()},implementation:{claude:Mn(),codex:Mn()},"review-consult":{claude:Mn(),codex:Mn()},subagent:{claude:Mn(),codex:Mn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(au(l)){let d=ym(i.runner),b=iu(l),k={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:b,subtotal:lu(d,b)};b.replayed===!0&&(k.replayed=!0),typeof i.model=="string"&&(k.model=i.model),typeof i.session_id=="string"&&(k.session_id=i.session_id),To(n[d],k,!0),To(r.orchestrator[d],k,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let b=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!pm[b].includes(d.role)||!au(d.usage))continue;let k=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!k||s.has(k))continue;s.add(k);let y=iu(d.usage),x={provider:b,role:d.role,attempt_id:String(i.attempt_id||""),usage:y,subtotal:lu(b,y)};x.receipt_id=k,typeof d.agent_type=="string"&&(x.agent_type=d.agent_type),typeof d.agent_id=="string"&&(x.agent_id=d.agent_id),typeof d.model=="string"&&(x.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(x.effort=d.effort),typeof d.session_id=="string"?x.session_id=d.session_id:typeof d.thread_id=="string"&&(x.session_id=d.thread_id),typeof d.turn_id=="string"&&(x.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(x.completed_at=d.completed_at),y.replayed===!0&&(x.replayed=!0),To(n[b],x,!1),To(r[x.role][b],x,!1)}}let o={};for(let i of["claude","codex"]){let l=n[i];if(l.legs.length===0)continue;let u=cu(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(l[u]={...cu(d,!0),legs:d.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:yu,setPrototypeOf:du,isFrozen:vm,getPrototypeOf:wm,getOwnPropertyDescriptor:km}=Object,{freeze:en,seal:vn,create:_i}=Object,{apply:mi,construct:gi}=typeof Reflect<"u"&&Reflect;en||(en=function(t){return t});vn||(vn=function(t){return t});mi||(mi=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});gi||(gi=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var Ro=tn(Array.prototype.forEach),$m=tn(Array.prototype.lastIndexOf),pu=tn(Array.prototype.pop),us=tn(Array.prototype.push),xm=tn(Array.prototype.splice),Lo=tn(String.prototype.toLowerCase),li=tn(String.prototype.toString),ci=tn(String.prototype.match),ds=tn(String.prototype.replace),Am=tn(String.prototype.indexOf),Sm=tn(String.prototype.trim),An=tn(Object.prototype.hasOwnProperty),Jt=tn(RegExp.prototype.test),ps=Em(TypeError);function tn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return mi(e,t,r)}}function Em(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return gi(e,n)}}function ut(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Lo;du&&du(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(vm(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Tm(e){for(let t=0;t<e.length;t++)An(e,t)||(e[t]=null);return e}function Un(e){let t=_i(null);for(let[n,r]of yu(e))An(e,n)&&(Array.isArray(r)?t[n]=Tm(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Un(r):t[n]=r);return t}function fs(e,t){for(;e!==null;){let r=km(e,t);if(r){if(r.get)return tn(r.get);if(typeof r.value=="function")return tn(r.value)}e=wm(e)}function n(){return null}return n}var fu=en(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ui=en(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),di=en(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Cm=en(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),pi=en(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Rm=en(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),_u=en(["#text"]),mu=en(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),fi=en(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),gu=en(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Oo=en(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Om=vn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Lm=vn(/<%[\w\W]*|[\w\W]*%>/gm),Im=vn(/\$\{[\w\W]*/gm),Pm=vn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Mm=vn(/^aria-[\-\w]+$/),vu=vn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Dm=vn(/^(?:\w+script|data):/i),Nm=vn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),wu=vn(/^html$/i),qm=vn(/^[a-z][.\w]*(-[.\w]+)+$/i),bu=Object.freeze({__proto__:null,ARIA_ATTR:Mm,ATTR_WHITESPACE:Nm,CUSTOM_ELEMENT:qm,DATA_ATTR:Pm,DOCTYPE_NAME:wu,ERB_EXPR:Lm,IS_ALLOWED_URI:vu,IS_SCRIPT_OR_DATA:Dm,MUSTACHE_EXPR:Om,TMPLIT_EXPR:Im}),_s={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Fm=function(){return typeof window>"u"?null:window},jm=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},hu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ku(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Fm(),t=Re=>ku(Re);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==_s.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:b,DOMParser:k,trustedTypes:y}=e,x=l.prototype,M=fs(x,"cloneNode"),U=fs(x,"remove"),V=fs(x,"nextSibling"),se=fs(x,"childNodes"),z=fs(x,"parentNode");if(typeof a=="function"){let Re=n.createElement("template");Re.content&&Re.content.ownerDocument&&(n=Re.content.ownerDocument)}let j,F="",{implementation:H,createNodeIterator:I,createDocumentFragment:C,getElementsByTagName:J}=n,{importNode:we}=r,ve=hu();t.isSupported=typeof yu=="function"&&typeof z=="function"&&H&&H.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:W,ERB_EXPR:te,TMPLIT_EXPR:fe,DATA_ATTR:Ae,ARIA_ATTR:he,IS_SCRIPT_OR_DATA:le,ATTR_WHITESPACE:Se,CUSTOM_ELEMENT:ye}=bu,{IS_ALLOWED_URI:G}=bu,oe=null,ce=ut({},[...fu,...ui,...di,...pi,..._u]),$e=null,Ge=ut({},[...mu,...fi,...gu,...Oo]),_e=Object.seal(_i(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Fe=null,D=null,ge=Object.seal(_i(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Le=!0,ze=!0,He=!1,Be=!0,Ke=!1,Je=!0,it=!1,mt=!1,St=!1,gt=!1,X=!1,Q=!1,Oe=!0,qe=!1,Ce="user-content-",Pe=!0,je=!1,at={},st=null,et=ut({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),vt=null,Pt=ut({},["audio","video","img","source","image","track"]),bt=null,Ft=ut({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),wt="http://www.w3.org/1998/Math/MathML",Ve="http://www.w3.org/2000/svg",Me="http://www.w3.org/1999/xhtml",L=Me,Z=!1,ue=null,E=ut({},[wt,Ve,Me],li),K=ut({},["mi","mo","mn","ms","mtext"]),pe=ut({},["annotation-xml"]),S=ut({},["title","style","font","a","script"]),h=null,A=["application/xhtml+xml","text/html"],B="text/html",re=null,ae=null,be=n.createElement("form"),De=function(R){return R instanceof RegExp||R instanceof Function},nt=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ae&&ae===R)){if((!R||typeof R!="object")&&(R={}),R=Un(R),h=A.indexOf(R.PARSER_MEDIA_TYPE)===-1?B:R.PARSER_MEDIA_TYPE,re=h==="application/xhtml+xml"?li:Lo,oe=An(R,"ALLOWED_TAGS")?ut({},R.ALLOWED_TAGS,re):ce,$e=An(R,"ALLOWED_ATTR")?ut({},R.ALLOWED_ATTR,re):Ge,ue=An(R,"ALLOWED_NAMESPACES")?ut({},R.ALLOWED_NAMESPACES,li):E,bt=An(R,"ADD_URI_SAFE_ATTR")?ut(Un(Ft),R.ADD_URI_SAFE_ATTR,re):Ft,vt=An(R,"ADD_DATA_URI_TAGS")?ut(Un(Pt),R.ADD_DATA_URI_TAGS,re):Pt,st=An(R,"FORBID_CONTENTS")?ut({},R.FORBID_CONTENTS,re):et,Fe=An(R,"FORBID_TAGS")?ut({},R.FORBID_TAGS,re):Un({}),D=An(R,"FORBID_ATTR")?ut({},R.FORBID_ATTR,re):Un({}),at=An(R,"USE_PROFILES")?R.USE_PROFILES:!1,Le=R.ALLOW_ARIA_ATTR!==!1,ze=R.ALLOW_DATA_ATTR!==!1,He=R.ALLOW_UNKNOWN_PROTOCOLS||!1,Be=R.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ke=R.SAFE_FOR_TEMPLATES||!1,Je=R.SAFE_FOR_XML!==!1,it=R.WHOLE_DOCUMENT||!1,gt=R.RETURN_DOM||!1,X=R.RETURN_DOM_FRAGMENT||!1,Q=R.RETURN_TRUSTED_TYPE||!1,St=R.FORCE_BODY||!1,Oe=R.SANITIZE_DOM!==!1,qe=R.SANITIZE_NAMED_PROPS||!1,Pe=R.KEEP_CONTENT!==!1,je=R.IN_PLACE||!1,G=R.ALLOWED_URI_REGEXP||vu,L=R.NAMESPACE||Me,K=R.MATHML_TEXT_INTEGRATION_POINTS||K,pe=R.HTML_INTEGRATION_POINTS||pe,_e=R.CUSTOM_ELEMENT_HANDLING||{},R.CUSTOM_ELEMENT_HANDLING&&De(R.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(_e.tagNameCheck=R.CUSTOM_ELEMENT_HANDLING.tagNameCheck),R.CUSTOM_ELEMENT_HANDLING&&De(R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(_e.attributeNameCheck=R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),R.CUSTOM_ELEMENT_HANDLING&&typeof R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(_e.allowCustomizedBuiltInElements=R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ke&&(ze=!1),X&&(gt=!0),at&&(oe=ut({},_u),$e=[],at.html===!0&&(ut(oe,fu),ut($e,mu)),at.svg===!0&&(ut(oe,ui),ut($e,fi),ut($e,Oo)),at.svgFilters===!0&&(ut(oe,di),ut($e,fi),ut($e,Oo)),at.mathMl===!0&&(ut(oe,pi),ut($e,gu),ut($e,Oo))),R.ADD_TAGS&&(typeof R.ADD_TAGS=="function"?ge.tagCheck=R.ADD_TAGS:(oe===ce&&(oe=Un(oe)),ut(oe,R.ADD_TAGS,re))),R.ADD_ATTR&&(typeof R.ADD_ATTR=="function"?ge.attributeCheck=R.ADD_ATTR:($e===Ge&&($e=Un($e)),ut($e,R.ADD_ATTR,re))),R.ADD_URI_SAFE_ATTR&&ut(bt,R.ADD_URI_SAFE_ATTR,re),R.FORBID_CONTENTS&&(st===et&&(st=Un(st)),ut(st,R.FORBID_CONTENTS,re)),Pe&&(oe["#text"]=!0),it&&ut(oe,["html","head","body"]),oe.table&&(ut(oe,["tbody"]),delete Fe.tbody),R.TRUSTED_TYPES_POLICY){if(typeof R.TRUSTED_TYPES_POLICY.createHTML!="function")throw ps('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof R.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ps('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=R.TRUSTED_TYPES_POLICY,F=j.createHTML("")}else j===void 0&&(j=jm(y,s)),j!==null&&typeof F=="string"&&(F=j.createHTML(""));en&&en(R),ae=R}},ot=ut({},[...ui,...di,...Cm]),Ee=ut({},[...pi,...Rm]),lt=function(R){let me=z(R);(!me||!me.tagName)&&(me={namespaceURI:L,tagName:"template"});let Ie=Lo(R.tagName),dt=Lo(me.tagName);return ue[R.namespaceURI]?R.namespaceURI===Ve?me.namespaceURI===Me?Ie==="svg":me.namespaceURI===wt?Ie==="svg"&&(dt==="annotation-xml"||K[dt]):!!ot[Ie]:R.namespaceURI===wt?me.namespaceURI===Me?Ie==="math":me.namespaceURI===Ve?Ie==="math"&&pe[dt]:!!Ee[Ie]:R.namespaceURI===Me?me.namespaceURI===Ve&&!pe[dt]||me.namespaceURI===wt&&!K[dt]?!1:!Ee[Ie]&&(S[Ie]||!ot[Ie]):!!(h==="application/xhtml+xml"&&ue[R.namespaceURI]):!1},Nt=function(R){us(t.removed,{element:R});try{z(R).removeChild(R)}catch{U(R)}},Ct=function(R,me){try{us(t.removed,{attribute:me.getAttributeNode(R),from:me})}catch{us(t.removed,{attribute:null,from:me})}if(me.removeAttribute(R),R==="is")if(gt||X)try{Nt(me)}catch{}else try{me.setAttribute(R,"")}catch{}},gn=function(R){let me=null,Ie=null;if(St)R="<remove></remove>"+R;else{let _t=ci(R,/^[\r\n\t ]+/);Ie=_t&&_t[0]}h==="application/xhtml+xml"&&L===Me&&(R='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+R+"</body></html>");let dt=j?j.createHTML(R):R;if(L===Me)try{me=new k().parseFromString(dt,h)}catch{}if(!me||!me.documentElement){me=H.createDocument(L,"template",null);try{me.documentElement.innerHTML=Z?F:dt}catch{}}let ht=me.body||me.documentElement;return R&&Ie&&ht.insertBefore(n.createTextNode(Ie),ht.childNodes[0]||null),L===Me?J.call(me,it?"html":"body")[0]:it?me.documentElement:ht},Kt=function(R){return I.call(R.ownerDocument||R,R,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Ut=function(R){return R instanceof b&&(typeof R.nodeName!="string"||typeof R.textContent!="string"||typeof R.removeChild!="function"||!(R.attributes instanceof d)||typeof R.removeAttribute!="function"||typeof R.setAttribute!="function"||typeof R.namespaceURI!="string"||typeof R.insertBefore!="function"||typeof R.hasChildNodes!="function")},Gt=function(R){return typeof i=="function"&&R instanceof i};function zt(Re,R,me){Ro(Re,Ie=>{Ie.call(t,R,me,ae)})}let Et=function(R){let me=null;if(zt(ve.beforeSanitizeElements,R,null),Ut(R))return Nt(R),!0;let Ie=re(R.nodeName);if(zt(ve.uponSanitizeElement,R,{tagName:Ie,allowedTags:oe}),Je&&R.hasChildNodes()&&!Gt(R.firstElementChild)&&Jt(/<[/\w!]/g,R.innerHTML)&&Jt(/<[/\w!]/g,R.textContent)||R.nodeType===_s.progressingInstruction||Je&&R.nodeType===_s.comment&&Jt(/<[/\w]/g,R.data))return Nt(R),!0;if(!(ge.tagCheck instanceof Function&&ge.tagCheck(Ie))&&(!oe[Ie]||Fe[Ie])){if(!Fe[Ie]&&bn(Ie)&&(_e.tagNameCheck instanceof RegExp&&Jt(_e.tagNameCheck,Ie)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(Ie)))return!1;if(Pe&&!st[Ie]){let dt=z(R)||R.parentNode,ht=se(R)||R.childNodes;if(ht&&dt){let _t=ht.length;for(let $t=_t-1;$t>=0;--$t){let Wt=M(ht[$t],!0);Wt.__removalCount=(R.__removalCount||0)+1,dt.insertBefore(Wt,V(R))}}}return Nt(R),!0}return R instanceof l&&!lt(R)||(Ie==="noscript"||Ie==="noembed"||Ie==="noframes")&&Jt(/<\/no(script|embed|frames)/i,R.innerHTML)?(Nt(R),!0):(Ke&&R.nodeType===_s.text&&(me=R.textContent,Ro([W,te,fe],dt=>{me=ds(me,dt," ")}),R.textContent!==me&&(us(t.removed,{element:R.cloneNode()}),R.textContent=me)),zt(ve.afterSanitizeElements,R,null),!1)},Ye=function(R,me,Ie){if(Oe&&(me==="id"||me==="name")&&(Ie in n||Ie in be))return!1;if(!(ze&&!D[me]&&Jt(Ae,me))){if(!(Le&&Jt(he,me))){if(!(ge.attributeCheck instanceof Function&&ge.attributeCheck(me,R))){if(!$e[me]||D[me]){if(!(bn(R)&&(_e.tagNameCheck instanceof RegExp&&Jt(_e.tagNameCheck,R)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(R))&&(_e.attributeNameCheck instanceof RegExp&&Jt(_e.attributeNameCheck,me)||_e.attributeNameCheck instanceof Function&&_e.attributeNameCheck(me,R))||me==="is"&&_e.allowCustomizedBuiltInElements&&(_e.tagNameCheck instanceof RegExp&&Jt(_e.tagNameCheck,Ie)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(Ie))))return!1}else if(!bt[me]){if(!Jt(G,ds(Ie,Se,""))){if(!((me==="src"||me==="xlink:href"||me==="href")&&R!=="script"&&Am(Ie,"data:")===0&&vt[R])){if(!(He&&!Jt(le,ds(Ie,Se,"")))){if(Ie)return!1}}}}}}}return!0},bn=function(R){return R!=="annotation-xml"&&ci(R,ye)},rn=function(R){zt(ve.beforeSanitizeAttributes,R,null);let{attributes:me}=R;if(!me||Ut(R))return;let Ie={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:$e,forceKeepAttr:void 0},dt=me.length;for(;dt--;){let ht=me[dt],{name:_t,namespaceURI:$t,value:Wt}=ht,Vt=re(_t),sn=Wt,Rt=_t==="value"?sn:Sm(sn);if(Ie.attrName=Vt,Ie.attrValue=Rt,Ie.keepAttr=!0,Ie.forceKeepAttr=void 0,zt(ve.uponSanitizeAttribute,R,Ie),Rt=Ie.attrValue,qe&&(Vt==="id"||Vt==="name")&&(Ct(_t,R),Rt=Ce+Rt),Je&&Jt(/((--!?|])>)|<\/(style|title|textarea)/i,Rt)){Ct(_t,R);continue}if(Vt==="attributename"&&ci(Rt,"href")){Ct(_t,R);continue}if(Ie.forceKeepAttr)continue;if(!Ie.keepAttr){Ct(_t,R);continue}if(!Be&&Jt(/\/>/i,Rt)){Ct(_t,R);continue}Ke&&Ro([W,te,fe],dn=>{Rt=ds(Rt,dn," ")});let on=re(R.nodeName);if(!Ye(on,Vt,Rt)){Ct(_t,R);continue}if(j&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!$t)switch(y.getAttributeType(on,Vt)){case"TrustedHTML":{Rt=j.createHTML(Rt);break}case"TrustedScriptURL":{Rt=j.createScriptURL(Rt);break}}if(Rt!==sn)try{$t?R.setAttributeNS($t,_t,Rt):R.setAttribute(_t,Rt),Ut(R)?Nt(R):pu(t.removed)}catch{Ct(_t,R)}}zt(ve.afterSanitizeAttributes,R,null)},tt=function Re(R){let me=null,Ie=Kt(R);for(zt(ve.beforeSanitizeShadowDOM,R,null);me=Ie.nextNode();)zt(ve.uponSanitizeShadowNode,me,null),Et(me),rn(me),me.content instanceof o&&Re(me.content);zt(ve.afterSanitizeShadowDOM,R,null)};return t.sanitize=function(Re){let R=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},me=null,Ie=null,dt=null,ht=null;if(Z=!Re,Z&&(Re="<!-->"),typeof Re!="string"&&!Gt(Re))if(typeof Re.toString=="function"){if(Re=Re.toString(),typeof Re!="string")throw ps("dirty is not a string, aborting")}else throw ps("toString is not a function");if(!t.isSupported)return Re;if(mt||nt(R),t.removed=[],typeof Re=="string"&&(je=!1),je){if(Re.nodeName){let Wt=re(Re.nodeName);if(!oe[Wt]||Fe[Wt])throw ps("root node is forbidden and cannot be sanitized in-place")}}else if(Re instanceof i)me=gn("<!---->"),Ie=me.ownerDocument.importNode(Re,!0),Ie.nodeType===_s.element&&Ie.nodeName==="BODY"||Ie.nodeName==="HTML"?me=Ie:me.appendChild(Ie);else{if(!gt&&!Ke&&!it&&Re.indexOf("<")===-1)return j&&Q?j.createHTML(Re):Re;if(me=gn(Re),!me)return gt?null:Q?F:""}me&&St&&Nt(me.firstChild);let _t=Kt(je?Re:me);for(;dt=_t.nextNode();)Et(dt),rn(dt),dt.content instanceof o&&tt(dt.content);if(je)return Re;if(gt){if(X)for(ht=C.call(me.ownerDocument);me.firstChild;)ht.appendChild(me.firstChild);else ht=me;return($e.shadowroot||$e.shadowrootmode)&&(ht=we.call(r,ht,!0)),ht}let $t=it?me.outerHTML:me.innerHTML;return it&&oe["!doctype"]&&me.ownerDocument&&me.ownerDocument.doctype&&me.ownerDocument.doctype.name&&Jt(wu,me.ownerDocument.doctype.name)&&($t="<!DOCTYPE "+me.ownerDocument.doctype.name+`>
`+$t),Ke&&Ro([W,te,fe],Wt=>{$t=ds($t,Wt," ")}),j&&Q?j.createHTML($t):$t},t.setConfig=function(){let Re=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};nt(Re),mt=!0},t.clearConfig=function(){ae=null,mt=!1},t.isValidAttribute=function(Re,R,me){ae||nt({});let Ie=re(Re),dt=re(R);return Ye(Ie,dt,me)},t.addHook=function(Re,R){typeof R=="function"&&us(ve[Re],R)},t.removeHook=function(Re,R){if(R!==void 0){let me=$m(ve[Re],R);return me===-1?void 0:xm(ve[Re],me,1)[0]}return pu(ve[Re])},t.removeHooks=function(Re){ve[Re]=[]},t.removeAllHooks=function(){ve=hu()},t}var $u=ku();var Wn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Io=e=>(...t)=>({_$litDirective$:e,values:t}),jr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ms=class extends jr{constructor(t){if(super(t),this.it=jt,t.type!==Wn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===jt||t==null)return this._t=void 0,this.it=t;if(t===hn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ms.directiveName="unsafeHTML",ms.resultType=1;var xu=Io(ms);function vi(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var gr=vi();function Ou(e){gr=e}var ys={exec:()=>null};function yt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(nn.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var Bm=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),nn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Um=/^(?:[ \t]*(?:\n|$))+/,Wm=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,zm=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,vs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Hm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,wi=/(?:[*+-]|\d{1,9}[.)])/,Lu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Iu=yt(Lu).replace(/bull/g,wi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Gm=yt(Lu).replace(/bull/g,wi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ki=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Km=/^[^\n]+/,$i=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Vm=yt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",$i).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ym=yt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,wi).getRegex(),Fo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",xi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Zm=yt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",xi).replace("tag",Fo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Pu=yt(ki).replace("hr",vs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fo).getRegex(),Xm=yt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Pu).getRegex(),Ai={blockquote:Xm,code:Wm,def:Vm,fences:zm,heading:Hm,hr:vs,html:Zm,lheading:Iu,list:Ym,newline:Um,paragraph:Pu,table:ys,text:Km},Au=yt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",vs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fo).getRegex(),Qm={...Ai,lheading:Gm,table:Au,paragraph:yt(ki).replace("hr",vs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Au).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fo).getRegex()},Jm={...Ai,html:yt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",xi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ys,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:yt(ki).replace("hr",vs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Iu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},eg=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,tg=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Mu=/^( {2,}|\\)\n(?!\s*$)/,ng=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,jo=/[\p{P}\p{S}]/u,Si=/[\s\p{P}\p{S}]/u,Du=/[^\s\p{P}\p{S}]/u,rg=yt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Si).getRegex(),Nu=/(?!~)[\p{P}\p{S}]/u,sg=/(?!~)[\s\p{P}\p{S}]/u,og=/(?:[^\s\p{P}\p{S}]|~)/u,ag=yt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Bm?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),qu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ig=yt(qu,"u").replace(/punct/g,jo).getRegex(),lg=yt(qu,"u").replace(/punct/g,Nu).getRegex(),Fu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",cg=yt(Fu,"gu").replace(/notPunctSpace/g,Du).replace(/punctSpace/g,Si).replace(/punct/g,jo).getRegex(),ug=yt(Fu,"gu").replace(/notPunctSpace/g,og).replace(/punctSpace/g,sg).replace(/punct/g,Nu).getRegex(),dg=yt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Du).replace(/punctSpace/g,Si).replace(/punct/g,jo).getRegex(),pg=yt(/\\(punct)/,"gu").replace(/punct/g,jo).getRegex(),fg=yt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),_g=yt(xi).replace("(?:-->|$)","-->").getRegex(),mg=yt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",_g).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Do=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,gg=yt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Do).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ju=yt(/^!?\[(label)\]\[(ref)\]/).replace("label",Do).replace("ref",$i).getRegex(),Bu=yt(/^!?\[(ref)\](?:\[\])?/).replace("ref",$i).getRegex(),bg=yt("reflink|nolink(?!\\()","g").replace("reflink",ju).replace("nolink",Bu).getRegex(),Su=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ei={_backpedal:ys,anyPunctuation:pg,autolink:fg,blockSkip:ag,br:Mu,code:tg,del:ys,emStrongLDelim:ig,emStrongRDelimAst:cg,emStrongRDelimUnd:dg,escape:eg,link:gg,nolink:Bu,punctuation:rg,reflink:ju,reflinkSearch:bg,tag:mg,text:ng,url:ys},hg={...Ei,link:yt(/^!?\[(label)\]\((.*?)\)/).replace("label",Do).getRegex(),reflink:yt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Do).getRegex()},bi={...Ei,emStrongRDelimAst:ug,emStrongLDelim:lg,url:yt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Su).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:yt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Su).getRegex()},yg={...bi,br:yt(Mu).replace("{2,}","*").getRegex(),text:yt(bi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Po={normal:Ai,gfm:Qm,pedantic:Jm},gs={normal:Ei,gfm:bi,breaks:yg,pedantic:hg},vg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Eu=e=>vg[e];function zn(e,t){if(t){if(nn.escapeTest.test(e))return e.replace(nn.escapeReplace,Eu)}else if(nn.escapeTestNoEncode.test(e))return e.replace(nn.escapeReplaceNoEncode,Eu);return e}function Tu(e){try{e=encodeURI(e).replace(nn.percentDecode,"%")}catch{return null}return e}function Cu(e,t){let n=e.replace(nn.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(nn.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(nn.slashPipe,"|");return r}function bs(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function wg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Ru(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,l}function kg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var No=class{constructor(e){Tt(this,"options");Tt(this,"rules");Tt(this,"lexer");this.options=e||gr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:bs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=kg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=bs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:bs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=bs(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))i.push(n[l]),a=!0;else if(!a)i.push(n[l]);else break;n=n.slice(l);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let b=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=b,n.length===0)break;let k=o.at(-1);if(k?.type==="code")break;if(k?.type==="blockquote"){let y=k,x=y.raw+`
`+n.join(`
`),M=this.blockquote(x);o[o.length-1]=M,r=r.substring(0,r.length-y.raw.length)+M.raw,s=s.substring(0,s.length-y.text.length)+M.text;break}else if(k?.type==="list"){let y=k,x=y.raw+`
`+n.join(`
`),M=this.list(x);o[o.length-1]=M,r=r.substring(0,r.length-k.raw.length)+M.raw,s=s.substring(0,s.length-y.raw.length)+M.raw,n=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let b=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,M=>" ".repeat(3*M.length)),k=e.split(`
`,1)[0],y=!b.trim(),x=0;if(this.options.pedantic?(x=2,d=b.trimStart()):y?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,d=b.slice(x),x+=t[1].length),y&&this.rules.other.blankLine.test(k)&&(u+=k+`
`,e=e.substring(k.length+1),l=!0),!l){let M=this.rules.other.nextBulletRegex(x),U=this.rules.other.hrRegex(x),V=this.rules.other.fencesBeginRegex(x),se=this.rules.other.headingBeginRegex(x),z=this.rules.other.htmlBeginRegex(x);for(;e;){let j=e.split(`
`,1)[0],F;if(k=j,this.options.pedantic?(k=k.replace(this.rules.other.listReplaceNesting,"  "),F=k):F=k.replace(this.rules.other.tabCharGlobal,"    "),V.test(k)||se.test(k)||z.test(k)||M.test(k)||U.test(k))break;if(F.search(this.rules.other.nonSpaceChar)>=x||!k.trim())d+=`
`+F.slice(x);else{if(y||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(b)||se.test(b)||U.test(b))break;d+=`
`+k}!y&&!k.trim()&&(y=!0),u+=j+`
`,e=e.substring(j.length+1),b=F.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(b=>b.type==="space"),d=u.length>0&&u.some(b=>this.rules.other.anyLine.test(b.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Cu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Cu(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=bs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=wg(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Ru(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Ru(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let d=[...r[0]][0].length,b=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let y=b.slice(1,-1);return{type:"em",raw:b,text:y,tokens:this.lexer.inlineTokens(y)}}let k=b.slice(2,-2);return{type:"strong",raw:b,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Sn=class hi{constructor(t){Tt(this,"tokens");Tt(this,"options");Tt(this,"state");Tt(this,"inlineQueue");Tt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||gr,this.options.tokenizer=this.options.tokenizer||new No,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:nn,block:Po.normal,inline:gs.normal};this.options.pedantic?(n.block=Po.pedantic,n.inline=gs.pedantic):this.options.gfm&&(n.block=Po.gfm,this.options.breaks?n.inline=gs.breaks:n.inline=gs.gfm),this.tokenizer.rules=n}static get rules(){return{block:Po,inline:gs}}static lex(t,n){return new hi(n).lex(t)}static lexInline(t,n){return new hi(n).inlineTokens(t)}lex(t){t=t.replace(nn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(nn.tabCharGlobal,"    ").replace(nn.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},i),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,i)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,b=t.slice(1),k;this.options.extensions.startInline.forEach(y=>{k=y.call({lexer:this},b),typeof k=="number"&&k>=0&&(d=Math.min(d,k))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},qo=class{constructor(e){Tt(this,"options");Tt(this,"parser");this.options=e||gr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(nn.notSpaceStart)?.[0],s=e.replace(nn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+zn(r)+'">'+(n?s:zn(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:zn(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${zn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Tu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+zn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Tu(e);if(s===null)return zn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${zn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:zn(e.text)}},Ti=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},En=class yi{constructor(t){Tt(this,"options");Tt(this,"renderer");Tt(this,"textRenderer");this.options=t||gr,this.options.renderer=this.options.renderer||new qo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ti}static parse(t,n){return new yi(n).parse(t)}static parseInline(t,n){return new yi(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},Mo,hs=(Mo=class{constructor(e){Tt(this,"options");Tt(this,"block");this.options=e||gr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Sn.lex:Sn.lexInline}provideParser(){return this.block?En.parse:En.parseInline}},Tt(Mo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Tt(Mo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Mo),$g=class{constructor(...e){Tt(this,"defaults",vi());Tt(this,"options",this.setOptions);Tt(this,"parse",this.parseMarkdown(!0));Tt(this,"parseInline",this.parseMarkdown(!1));Tt(this,"Parser",En);Tt(this,"Renderer",qo);Tt(this,"TextRenderer",Ti);Tt(this,"Lexer",Sn);Tt(this,"Tokenizer",No);Tt(this,"Hooks",hs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new qo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new No(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new hs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],l=s[a];hs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&hs.passThroughHooksRespectAsync.has(o))return(async()=>{let b=await i.call(s,u);return l.call(s,b)})();let d=i.call(s,u);return l.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let b=await i.apply(s,u);return b===!1&&(b=await l.apply(s,u)),b})();let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Sn.lex(e,t??this.defaults)}parser(e,t){return En.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Sn.lex:Sn.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?En.parse:En.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Sn.lex:Sn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?En.parse:En.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+zn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},mr=new $g;function kt(e,t){return mr.parse(e,t)}kt.options=kt.setOptions=function(e){return mr.setOptions(e),kt.defaults=mr.defaults,Ou(kt.defaults),kt};kt.getDefaults=vi;kt.defaults=gr;kt.use=function(...e){return mr.use(...e),kt.defaults=mr.defaults,Ou(kt.defaults),kt};kt.walkTokens=function(e,t){return mr.walkTokens(e,t)};kt.parseInline=mr.parseInline;kt.Parser=En;kt.parser=En.parse;kt.Renderer=qo;kt.TextRenderer=Ti;kt.Lexer=Sn;kt.lexer=Sn.lex;kt.Tokenizer=No;kt.Hooks=hs;kt.parse=kt;var ak=kt.options,ik=kt.setOptions,lk=kt.use,ck=kt.walkTokens,uk=kt.parseInline;var dk=En.parse,pk=Sn.lex;function Xn(e){let t=kt.parse(e),n=$u.sanitize(t);return xu(n)}function Hn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Br(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Bo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Wu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},xg={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Ag=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Sg=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Tn(e){return!!e&&typeof e=="object"}function Ci(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ri(e,t){let n=Ci(e),r=Ci(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function zu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Tn(s)&&typeof s.text=="string"?s.text:"").join(""):Tn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Eg(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Wu[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ci(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=Ri(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let l=Ri(Tn(i)?i.old_string:"",Tn(i)?i.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Oi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Tg=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Hu(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Tn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Tg,"").trim();return n.length>0?{kind:"user",text:n}:null}function Li(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Ag.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Sg.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Cg(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Rg(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Tn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(Li(a.text));else if(a.type==="thinking"){let i=Oi(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Eg(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?Uu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let a of s)if(Tn(a)&&a.type==="tool_result"){let i=t.get(String(a.tool_use_id));if(i){let l=zu(a.content);i.result=l,i.output=typeof a.content=="string"?a.content:l,a.is_error===!0&&(i.is_error=!0)}}let o=Hu(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Uu([s],n):[s]}return[]}function Uu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Og(e){let t=typeof e.command=="string"?e.command:"",n=zu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Wu.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Lg(e){if(e.type==="item.completed"&&Tn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Li(t.text)];if(t.type==="user_message"){let n=Hu(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Oi(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Og(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Ig(e){if(e.schema!=="codex-delegation-monitor-v1"||!Tn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Tn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Li(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Oi(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=xg[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Pg(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Mg(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Tn(t)?t:null}function Gu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Mg(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Cg(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Ig(o):Pg(o)?Lg(o):Rg(o,n);return a.length>0&&(r.progress=null),a}}}function Ii(e){let t=[],n=Gu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Dg=5,Ng=10,qg=/Task\s+#(\d+)/,Fg=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,jg=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ws(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Bg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Ug(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Wg(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=qg.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function zg(e){if(e.tool==="Bash"){let t=e.command||"";return Fg.test(t)?"~ PR/\uAC8C\uC2DC \uC911":jg.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Hg(e){let t=e.filter(s=>s.kind==="tool").slice(-Ng),n=new Map;t.forEach((s,o)=>{let a=zg(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Gg(e){let t=Ug(e);if(t)return{text:t,guess:!1};let n=Wg(e);if(n)return{text:n,guess:!1};let r=Hg(e);return r?{text:r,guess:!0}:null}function Kg(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:ln(e,t)}function Ur(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,l=null,u=null,d=!1,b={},k=!0,y=new Set,x=new Set,M=null,U=null,V=!1,se=!1,z=!1,j=null,F=null;function H(){V=!1,se=!1,z=!1,j=null,F=null}async function I(X){if(n){se=!0,z=!1,Fe();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:X,...u?{root_dir:u}:{}}));if(o!==X)return;!Q||typeof Q!="object"||Array.isArray(Q)?z=!0:(j=Q,F=X)}catch{o===X&&(z=!0)}finally{o===X&&(se=!1,Fe())}}}function C(){if(V=!V,V&&o&&F!==o){I(o);return}Fe()}function J(){if(!V)return"";let X=Br({loading:se,error:z});if(X)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${X}
      </div>`;if(!j)return"";if(j.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=Bo(j.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?c`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof j.task_prompt=="string"?Hn("\uACFC\uC5C5 (user)",j.task_prompt):""}
      ${typeof j.system_prompt=="string"?Hn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",j.system_prompt):""}
    </div>`}function we(){if(!l||!r)return[];let X=r.get(l);return Ii(X?X.lines:[])}function ve(){if(!l||!r)return null;let X=r.get(l),Q=X?X.last_event_at:null;return typeof Q=="number"?Q:null}function W(){return b.status==="running"}function te(){if(W()&&o){U||(U=setInterval(()=>Fe(),1e3));return}fe()}function fe(){U&&(clearInterval(U),U=null)}function Ae(X){let Q=[],Oe=0;for(;Oe<X.length;){let{idx:qe,line:Ce}=X[Oe];if(Ce.kind==="tool"){let Pe=Oe;for(;Pe<X.length&&X[Pe].line.kind==="tool"&&X[Pe].line.tool===Ce.tool;)Pe+=1;if(Pe-Oe>=Dg&&!x.has(qe)){Q.push({kind:"group",idx:qe,tool:Ce.tool||"",lines:X.slice(Oe,Pe)}),Oe=Pe;continue}}Q.push({kind:"line",idx:qe,line:Ce}),Oe+=1}return Q}function he(X){let Q=[],Oe=new Map;for(let Pe=0;Pe<X.length;Pe+=1){let je=X[Pe],at=je.parent_tool_use_id;if(typeof at=="string"&&at.length>0){let st=Oe.get(at);st||(st={kind:"subagent",idx:Pe,launch_id:at,agent_type:null,header:null,lines:[]},Oe.set(at,st),Q.push(st)),st.lines.push({idx:Pe,line:je});continue}if(je.kind==="tool"&&je.tool==="Agent"&&typeof je.launch_id=="string"&&je.launch_id.length>0){let st=le(je),et=Oe.get(je.launch_id);if(et){et.header={idx:Pe,line:je},et.agent_type=st;continue}let vt={kind:"subagent",idx:Pe,launch_id:je.launch_id,agent_type:st,header:{idx:Pe,line:je},lines:[]};Oe.set(je.launch_id,vt),Q.push(vt);continue}Q.push({kind:"entry",idx:Pe,line:je})}let qe=[],Ce=0;for(;Ce<Q.length;){if(Q[Ce].kind!=="entry"){qe.push(Q[Ce]),Ce+=1;continue}let Pe=Ce;for(;Pe<Q.length&&Q[Pe].kind==="entry";)Pe+=1;qe.push(...Ae(Q.slice(Ce,Pe))),Ce=Pe}return qe}function le(X){let Q=X.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function Se(X){for(let Q=X.length-1;Q>=0;Q-=1){let Oe=X[Q];if(Oe.kind==="result"||Oe.kind==="error")return null;if(Oe.kind==="tool"&&!Object.hasOwn(Oe,"result"))return Oe}return null}function ye(X){for(let Q=X.length-1;Q>=0;Q-=1)if(X[Q].kind==="thinking")return X[Q];return null}function G(X,Q){if(Q.kind==="gate")return c`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return c`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return c`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Xn(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let Oe=y.has(X);return c`<div
        class="sv__think${Oe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ge(X)}
      >
        <span class="sv__think-line">💭 ${ws(Q.text)}</span>
        ${Oe?c`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="user"){let Oe=y.has(X);return c`<div
        class="sv__line sv__line--user${Oe?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ge(X)}
      >
        <span class="sv__user-line">▷ ${ws(Q.text)}</span>
        ${Oe?c`<pre class="sv__user-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let Oe=y.has(X),qe=Q.tool==="Bash"?Bg(Q.command):0,Ce=Q.tool==="Bash"?qe>1?ws(Q.command):Q.command:Q.path||Q.command||"";return c`<div
        class="sv__tool${Oe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ge(X)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${Ce?c`<span class="sv__tool-detail">${Ce}</span>`:""}
          ${qe>1?c`<span class="sv__tool-more">⋯ ${qe}줄</span>`:""}
          ${typeof Q.added=="number"?c`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?c`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?c`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${Oe?c`<pre class="sv__tool-expand">${oe(Q)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Xn(Q.text||"")}</div>`}function oe(X){let Q=[];if(X.tool==="Bash"&&typeof X.command=="string"&&X.command.length>0)Q.push(X.command);else if(X.input!==void 0)try{Q.push(`input: ${JSON.stringify(X.input,null,2)}`)}catch{}return typeof X.output=="string"&&X.output.length>0&&Q.push(`output:
${X.output}`),Q.join(`

`)}function ce(){if(!o)return c``;let X=we(),Q=(a?[b.agent_type,b.model,b.effort]:[b.runner,b.model,b.effort]).filter(Boolean).join(" \xB7 "),Oe=b.session_id||"",qe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${k?"ON":"OFF"}`,Ce=W(),Pe=Ce?Kg(ve(),Date.now()):"",je=Ce?Se(X):null,at=Ce?ye(X):null,st=Gg(X);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${b.label||(a?b.role||"":o)}</span
        >
        ${st?c`<span
              class="sv__stage${st.guess?" sv__stage--guess":""}"
              title=${st.text}
              >${st.text}</span
            >`:""}
        ${Ce?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Pe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Pe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Pe?c`<span class="sv__live-ago">${Pe}</span>`:""}</span
            >`:""}
        ${Oe?c`<button
              type="button"
              class="sv__session"
              title=${Oe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Oe}`}
              @click=${()=>ze(Oe)}
            >
              ⧉ ${Oe.slice(0,8)}
            </button>`:""}
        ${b.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${b.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${b.resume_command}`}
              @click=${()=>ze(b.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Q?c`<span class="sv__meta">${Q}</span>`:""}
        ${b.worktree?c`<span class="sv__wt" title=${b.worktree}
              >${b.worktree}</span
            >`:""}
        ${a||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${V?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${V?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${C}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${k?" sv__follow--on":""}"
          aria-pressed=${k?"true":"false"}
          aria-label=${qe}
          @click=${Le}
        >
          <span class="sv__follow-full">⇣ ${qe}</span>
          <span class="sv__follow-short">⇣ ${k?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>gt()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":J()}
      <div class="sv__body">
        ${X.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:he(X).map(et=>et.kind==="subagent"?Ge(et):et.kind==="group"?$e(et):G(et.idx,et.line))}
      </div>
      ${je||at?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${je?c`<span class="sv__now-icon">${je.icon}</span>
                  <span class="sv__now-name">${je.tool}</span>
                  <span class="sv__now-detail"
                    >${je.tool==="Bash"?ws(je.command):je.path||je.command||""}</span
                  >`:""}
            ${at?c`<span class="sv__now-think"
                  >💭 ${ws(at.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function $e(X){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>_e(X.idx)}
    >
      <span class="sv__group-icon">${X.lines[0].line.icon}</span>
      <span class="sv__group-name">${X.tool}</span>
      <span class="sv__group-count">${X.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ge(X){let Q=x.has(X.idx),Oe=X.header?X.header.line:null,qe=Oe?Oe.is_error===!0?"\u2717":typeof Oe.result=="string"?"\u2713":"\u27F3":"",Ce=Oe&&Oe.command?Oe.command:"";return c`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>_e(X.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${X.agent_type||"subagent"}</span>
        ${Ce?c`<span class="sv__sub-detail">${Ce}</span>`:""}
        <span class="sv__sub-count">${X.lines.length}줄</span>
        ${qe?c`<span class="sv__sub-state">${qe}</span>`:""}
        ${Q?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?c`<div class="sv__sub-body">
            ${Ae(X.lines).map(Pe=>Pe.kind==="group"?$e(Pe):G(Pe.idx,Pe.line))}
          </div>`:""}
    </div>`}function _e(X){x.add(X),Fe()}function Fe(){Qe(ce(),e),te(),k&&D()}function D(){let X=e.querySelector(".sv__body");X&&(X.scrollTop=X.scrollHeight)}function ge(X){y.has(X)?y.delete(X):y.add(X),Fe()}function Le(){k=!k,Fe()}function ze(X){fn(X).then(Q=>{Q?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function He(X){!o||!X||(b={...b,...X},Fe())}function Be(X){let Q=X.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&k&&(k=!1,Fe())}e.addEventListener("scroll",Be,!0);function Ke(X){let Q=X.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||gt()}let Je=!1;function it(){Je||(document.addEventListener("mousedown",Ke),Je=!0)}function mt(){Je&&(document.removeEventListener("mousedown",Ke),Je=!1)}function St(X){let Q=X&&X.attempt_id;if(!Q)return;let Oe=typeof X.launch_id=="string"&&X.launch_id.length>0?X.launch_id:null,qe=X.session_ref&&typeof X.session_ref=="object"?X.session_ref:null;if(Oe&&qe)return;let Ce=l;o=Q,a=Oe,i=qe,l=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Ce&&Ce!==l&&Promise.resolve(n("unsubscribe-session-log",{id:Ce})).catch(()=>{}),u=typeof X.root_dir=="string"&&X.root_dir.length>0?X.root_dir:null,b=X.meta||{},d=X.hide_prompt===!0,k=!0,y.clear(),x.clear(),H(),!M&&r&&(M=r.subscribe(Fe)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{},...i?{session_ref:i}:{},...u?{root_dir:u}:{}})).catch(()=>{}),it(),Fe()}function gt(){let X=l;mt(),o=null,a=null,i=null,l=null,u=null,d=!1,y.clear(),x.clear(),H(),fe(),n&&X&&Promise.resolve(n("unsubscribe-session-log",{id:X})).catch(()=>{}),Qe(c``,e),s&&s()}return{open:St,updateMeta:He,close:gt,isOpen(){return o!==null},destroy(){fe(),mt(),M&&(M(),M=null),e.removeEventListener("scroll",Be,!0),o=null,a=null,i=null,l=null,u=null,d=!1,Qe(c``,e)}}}function Uo(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Pi(t.spec_id),s=Pi(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Pi(e){return typeof e=="string"?e.trim():""}function Ku(e){let t=Uo(e);if(t.path)return t;let n=Pi(Vg(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Vg(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function Yg(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Zg(e){let t=e&&e.metadata||{},n=Ku(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Yg(t)?null:"plan_pending"}),r}function Vu(e,t){let n=Zg(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${n.map(r=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?c`<span class="detail-art__badge">draft</span>`:null}
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
  `}var Xg="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Qg=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Jg=/^\*\*결론\*\* — (.+)$/;function Wo(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Xg)return null;let n=Qg.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Jg.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var Yu=20;function Zu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function eb(e){return e.length>Yu?`${e.slice(0,Yu)}\u2026`:e}function tb(e,t,n,r){let s=`${t.lane} ${eb(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Zu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${Xn(t.body)}
        </div>`:""}
  </div>`}function nb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Zu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Xn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Xu(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=Wo(typeof l.text=="string"?l.text:"");return u?tb(l,u,t,s.has(l.id)):nb(l)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${l=>t.onDraftInput&&t.onDraftInput(l.target.value)}
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
  `}var{I:Kk}=fc;var Qu=e=>e.strings===void 0;var rb={},Ju=(e,t=rb)=>e._$AH=t;var br=Io(class extends jr{constructor(e){if(super(e),e.type!==Wn.PROPERTY&&e.type!==Wn.ATTRIBUTE&&e.type!==Wn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Qu(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===hn||t===jt)return t;let n=e.element,r=e.name;if(e.type===Wn.PROPERTY){if(t===n[r])return hn}else if(e.type===Wn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return hn}else if(e.type===Wn.ATTRIBUTE&&n.getAttribute(r)===t+"")return hn;return Ju(e),t}});var zo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Di=[...zo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Gn=["orchestration_model","orchestration_effort","orchestration_speed"],Ho=[...zo,...Gn],sb=Di.filter(e=>Ho.includes(e)),ed=["delegated","main"],Go=["inherit","claude","codex"],ks=["default","fast"],$s=["standard","fast_track"],xs=["codex","opus","fable","self","skip"],Ko=["codex","fable","skip"],Vo=["low","medium","high","xhigh"],mn="auto";function _n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function td(e){if(!_n(e)||!_n(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))_n(r)&&_n(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Wr(e,t){let n=td(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[mn,...r.flatMap(([,s])=>s)]}function nd(e,t,n,r){if(!_n(e)||!_n(e.runners))return[mn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!_n(a)||!_n(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,l]of Object.entries(a.models)){if(n&&n!==mn&&i!==n)continue;let u=r(a,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[mn,...s]}function zr(e,t,n){return nd(e,t,n,(r,s)=>_n(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ni(e,t,n){return nd(e,t,n,(r,s)=>_n(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:_n(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function As(e,t){let n=td(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function rd(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Wr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!zr(t,s,r.impl_model||mn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var ob={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Mi=[...sb,...Gn],ab=[...Ho,...Di].filter((e,t,n)=>n.indexOf(e)===t&&!Mi.includes(e));function sd(e,t){let n=_n(e)?e:{},r=_n(t)?t:{},s=[];for(let a of Mi){let i=n[a]??null,l=r[a]??null;i!==l&&s.push({key:a,label:ob[a]||a,before:i,after:l,kind:i===null?"added":l===null?"removed":"changed"})}let o=[];for(let a of[...ab,...Object.keys(r)])!Mi.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function qi(e,t,n,r,s,o){return So({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function od(e,t){let n={};for(let r of Di){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function ad(e,t){let n={};for(let r of Gn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Fi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Gn]}],Qn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Yo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ji(e,t,n,r,s,o=null){let a=cn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function id(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of ji(e,t,n,r,s,o))a[i.source]+=1;return a}function ld(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function cd(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var s$=[...zo,...Gn];var ib=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Bi={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},ud={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},lb={pin:"pin",global:"global",base:"base"};function cb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${lb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function ub(e,t,n){switch(e){case"workflow_mode":return $s;case"spec_review_model":case"impl_review_model":return xs;case"plan_review_model":return Ko;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Vo;case"impl_dispatch":return ed;case"impl_runtime":return Go;case"impl_model":return Wr(n,t.impl_runtime);case"impl_effort":return zr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return ks;case"orchestration_model":return As(n,null);case"orchestration_effort":return zr(n,void 0,t.orchestration_model||mn).filter(r=>r!==mn);default:return[]}}function db(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${cb(e.source)}
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
      >${Yo[e.source]}</span
    >
    ${t.expanded?c`<select
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
          ${t.options.map(n=>c`<option
                value=${n.value}
                title=${n.full_value||""}
                ?selected=${e.source==="pin"&&e.value===n.value}
              >
                ${n.label}
              </option>`)}
        </select>`:""}
  </div>`}function dd(e,t){let n=Fi.flatMap(l=>l.keys),r=ji(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=id(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),a=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${l=>t.onToggle(l.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${l=>{l.preventDefault();let u=l.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${pb(o)}</span
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
    ${e.expanded?c`<div class="detail-effective__body">
          ${Fi.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=So({key:u.key,choices:ub(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return db(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${br(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${l=>t.onPresetSelect(String(l.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(l=>c`<option
                    value=${l.id}
                    ?selected=${l.id===e.preset_id}
                  >
                    ${l.name}${l.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function pb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function fb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function pd(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=fb(n.exec_receipt),l=i?Fn(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=xo(n.planned_execution,n.exec_receipt),b=n.chips?.pr?.number,k=typeof b=="number"?`PR #${b}`:"PR";return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >${k}</a
          >`:""}
      ${d?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${d.kind}
            title=${d.title}
            >${d.label}</span
          >`:""}
      ${l?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${l}
            >${u}${i?.effort?c`${" "}<span
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
      ${_b(s).map(y=>mb(y,t,r,{label:y.id==="pr"?k:y.label,href:y.id==="pr"?o:""}))}
    </div>
  </section>`}function _b(e){let n=typeof e=="string"&&Object.hasOwn(Bi,e)&&Bi[e]||Bi.spec_backed;return ib.filter(r=>n.includes(r.id))}var Zo={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function mb(e,t,n,r){let s=gb(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,l=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",b=u?Zo.stale:i?Zo.on:l?Zo.current:Zo.none,k=bb(e,n),y=`${r.label} \xB7 ${b}${k?` \xB7 ${k}`:""}${s?` \xB7 ${s}`:""}`,x=`detail-summary__gate${i?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,M=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${x}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${y}
      >${M}</a
    >`:c`<span
    class=${x}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${y}
    >${M}</span
  >`}function gb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function bb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(ud,n)?ud[n]:""}function Xo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function fd(e){return Xo(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function _d(e,t){let n=e&&e[t];if(!Xo(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(fd),s=fd(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function bd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Qo(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${bd(e)}${t}`}function Hr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${bd(e)}`}function hb(e,t,n){if(n!==null){let s=e==="claude"?Qo:Hr,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Hr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function md(e,t){if(!Xo(e)||e.state!=="usable"||!Xo(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function gd(e){let t=e.provider_key==="claude"?Qo:Hr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${hb(e.provider_key,e.provider,e.workspace_default)}
        </option>
        ${e.selected&&!n?c`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(r=>c`<option
              value=${r.key}
              ?selected=${r.key===e.selected}
            >
              ${t(r)}
            </option>`)||""}
      </select>
      ${e.hint?c`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":c`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function hd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${gd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:_d(t,"claude"),selected:s,workspace_default:md(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${gd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:_d(t,"codex"),selected:o,workspace_default:md(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var yd=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Ss(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Jo(e){if(!Ss(e)||!Ss(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Ss(n)&&Ss(n.models));return t.length>0?t:null}function Cn(e,t){let n=Jo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function vd(e,t){return Ss(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function wd(e,t){let n=Jo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return vd(r,r.models[t]);return[]}function yb(e){let t=Jo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of vd(r,s))n.includes(o)||n.push(o);return n}function vb(e,t){if(!t)return yb(e);let r=Jo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of wd(e,o))s.includes(a)||s.push(a);return s}function kd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=Cn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?wd(t,r.impl_model):vb(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function wb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function kb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function ea(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,l="";function u(M){M.key==="Escape"&&s&&(M.preventDefault(),y())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>y()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${wb(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>y()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${l}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${i===null?null:c`<pre class="mv__front">
${i}</pre
                        >`}${Xn(a)}`}
          </div>
        </div>
      </div>
    `:c``}function b(){Qe(d(),e)}async function k(M,U={}){s=M,o="loading",a="",i=null,l="",b();let V=U.workspace||(n?n():"");if(!V){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",b();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",b();return}let se="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(M);try{let z=await r(se),j=await z.json().catch(()=>({}));if(!z.ok||!j||j.ok!==!0){if(j?.error==="not_found"&&U.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",b();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(j&&j.error||z.status)+")",b();return}let F=kb(String(j.content||""));i=F.front,a=F.body,o="ready",b()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",b()}}function y(){s=null,Qe(c``,e)}function x(){document.removeEventListener("keydown",u),y()}return{open:k,close:y,destroy:x}}var $b=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Ad="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ta=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],xb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function $d(e){return typeof e=="string"&&xb.has(e)}var Ab=["running","done","failed","interrupted"],Sb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Eb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Tb(e){let t=Zt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Fr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Ad}
          >부분 집계</span
        >`:""}`}function xd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function zi(e){if(typeof e=="number")return Es(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Es(t):""}function Cb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Rb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ui(e){return e===null||typeof e=="string"&&e.trim().length>0}function Wi(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Ob(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!ta.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Ui(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ui(t.effort))||!(!("agent_type"in t)||Ui(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Ab.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Wi(t.started_at)||!Wi(t.last_event_at)||!Wi(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Lb(e,t,n){let s=Zt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${n.session_id?c`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${n.session_id}
          >${n.session_id.slice(0,8)}</span
        >`:""}
    ${zi(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${zi(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Ib(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Zt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Es(e.last_event_at):s?zi(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,Cb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Rb(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Sb[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${l}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${u.title}
      >${u.text}</span
    >
    ${i?c`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?c`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Pb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Mb(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let b=Ob(d);!b||s.has(b.launch_id)||$d(b.agent_type)||(s.add(b.launch_id),r.push(b))}r.sort((d,b)=>(d.started_at||0)-(b.started_at||0));let a={};for(let{role:d,provider:b}of ta){let k=t?t.roles[d]?.[b]:null;a[d]=k?[...k.legs]:[]}let i=ta.flatMap(({role:d})=>a[d]),l=new Set,u=[];for(let{role:d,provider:b}of ta){for(let k of r.filter(y=>y.role===d&&y.provider===b)){let y=i.find(x=>x.receipt_id===k.launch_id)||null;y&&!Pb(k,y)||(y&&l.add(y.receipt_id),u.push(Ib(k,y,e.attempt_id,n)))}for(let k of a[d])!l.has(k.receipt_id)&&!$d(k.agent_type)&&u.push(Lb(d,b,k))}return u}function Db(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...$b,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Eb(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Ad}</span>`:""}
  </div>`}var Nb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Es(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function qb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Fb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function jb(e,t){let n=Fb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${ri(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${ls(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Es(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Sd(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],a=[...o.filter(y=>y&&y.current===!0),...o.filter(y=>y&&y.current!==!0).sort((y,x)=>x.index-y.index)],i=a.map(y=>jb(y,t)),l=n.expanded||new Set;if(s.length===0&&a.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let y of s)y&&typeof y.resumed_from=="string"&&y.resumed_from.length>0&&u.add(y.resumed_from);let d=y=>{if(!(y.status==="failed"||y.status==="orphaned"))return"";let M=typeof y.session_id=="string"&&y.session_id.length>0,U=u.has(y.attempt_id),V=M&&!U,se=M?U?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${y.attempt_id}
      ?disabled=${!V}
      title=${se}
      @click=${z=>{z.stopPropagation(),V&&t.onResume&&t.onResume(y.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},b=y=>{if(!(y.status==="failed"||y.status==="orphaned")||typeof y.cause!="string"||y.cause==="")return"";let M=y.cause_detail,U=M&&typeof M.reason=="string"&&M.reason.length>0?typeof M.command=="string"&&M.command.length>0?`${M.reason} \xB7 ${M.command}`:M.reason:y.cause;return c`<div class="detail-session__cause" title=${U}>
      ${y.cause}
    </div>`},k=y=>{let x=xd(ii(y));if(Zt(x).length===0&&!Fr(y.usage))return"";let M=l.has(y.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${y.attempt_id}
      aria-expanded=${M?"true":"false"}
      title=${M?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${U=>{U.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(y.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Tb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${i}${s.map(y=>{let x=ii(y),M=xd(x),U=Zt(M);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${y.status||"unknown"}"
            data-attempt-id=${y.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(y.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Nb[y.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${y.attempt_id}</span>
            ${as(y)?c`<span
                  class="detail-session__resumed"
                  title=${as(y)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${_r(y)}</span>
            ${U.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${y.session_id?c`<span class="detail-session__sid" title=${y.session_id}
                  >${String(y.session_id).slice(0,8)}</span
                >`:""}
            ${U.length>0?U.map(V=>c`<span
                      class="detail-session__usage"
                      title=${V.tooltip}
                      >${V.label}</span
                    >`):Fr(y.usage)?c`<span class="detail-session__usage"
                    >${Fr(y.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Es(y.started_at)}</span>
          </button>
          ${k(y)} ${d(y)} ${b(y)} ${qb(y)}
          ${l.has(y.attempt_id)&&y.usage?Db(y.usage,y.runner==="codex"?"codex":"claude"):""}
          ${Mb(y,x,t)}
        </div>`})}
    </div>
  `}function Ed(e,t={}){return c`
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
    ${e.expanded?c`<div class="detail-prompt" data-seam="task-prompt">
          ${Bb(e)}
        </div>`:""}
  `}function Bb(e){let t=Br(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Hn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Bo(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Hn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Hn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Ub=["open","in_progress","deferred","resolved","closed"],Wb=[0,1,2,3,4];function Td(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,b={},k="",y=!1,x=[],M=!1,U={},V={claude:null,codex:null},se=null,z=null,j=0,F=!1,H=!1,I="",C="",J="";function we(){F=!1,H=!1,I="",C="",J=""}function ve(){V={claude:null,codex:null},se=null,z=null,j+=1}async function W(){if(!s)return null;try{let p=await Promise.resolve(s("get-workspace-accounts",{}));return p&&typeof p.state=="string"?p:null}catch{return null}}async function te(p){try{let v=await fetch(p);if(!v.ok)return null;let w=await v.json();if(!w||typeof w!="object"||!Array.isArray(w.accounts))return null;let P=w.accounts.filter(ee=>ee!==null&&typeof ee=="object"&&!Array.isArray(ee));return{accounts:P,active:P.find(ee=>ee.active===!0)||null}}catch{return null}}async function fe(p){z=p;let v=++j,[w,P,ee]=await Promise.all([te("/api/claude-usage"),te("/api/codex-usage"),W()]);v!==j||p!==u||(V={claude:w,codex:P},se=ee,m())}let Ae=[],he=null,le=null,Se=!1,ye="",G=!1,oe=0,ce=new Set;function $e(){Ae=[],he=null,le=null,Se=!1,ye="",G=!1,oe+=1,ce.clear()}async function Ge(p){if(!s)return;let v=++oe;try{let w=await Promise.resolve(s("get-comments",{id:p}));if(v!==oe||p!==u)return;Ae=Array.isArray(w)?w:[],Se=!1}catch{if(v!==oe||p!==u)return;Se=!0}m()}function _e(){if(!s||!u)return;let p=d&&typeof d.comment_count=="number"?d.comment_count:null;if(he!==u){he=u,le=p,Ge(u);return}p!==null&&p!==le&&(le=p,Ge(u))}function Fe(p){ce.has(p)?ce.delete(p):ce.add(p),m()}function D(p){let v=ye.trim().length===0;ye=p,v!==(p.trim().length===0)&&m()}async function ge(){let p=ye.trim();if(!s||!u||p.length===0||G)return;let v=u;G=!0,m();let w=!1;try{let P=await Promise.resolve(s("add-comment",{id:v,text:p}));Array.isArray(P)&&P.length>0&&(w=!0,v===u&&(Ae=P,Se=!1,ye="",le=P.length))}catch{w=!1}w||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),v===u&&(G=!1),m()}let Le={onToggle:Fe,onDraftInput:D,onSubmit:ge},ze=t.mdViewer||null,He=null;ze||(He=document.createElement("div"),He.className="md-viewer-root",document.body.appendChild(He));let Be=ze||ea(He,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ke=document.createElement("div");Ke.className="session-log-root",document.body.appendChild(Ke);let Je=Ur(Ke,{transport:s?(p,v)=>Promise.resolve(s(p,v)):void 0,sessionLogStore:l}),it=!1,mt=!1,St=!1,gt=null,X=null,Q=0;function Oe(p){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${p}`}function qe(){it=!1,mt=!1,St=!1,gt=null,X=null,Q+=1}async function Ce(p){if(!s)return;let v=++Q;mt=!0,St=!1,m();try{let w=await Promise.resolve(s("get-bead-prompt",{bead_id:p}));if(v!==Q)return;!w||typeof w!="object"||Array.isArray(w)?St=!0:(gt=w,X=Oe(p))}catch{v===Q&&(St=!0)}finally{v===Q&&(mt=!1,m())}}let Pe=[],je=null,at=0;function st(p,v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${p}::${v}`}function et(){Pe=[],je=null,at+=1}async function vt(p,v){if(!s)return;let w=++at,P;try{P=await Promise.resolve(s("get-session-refs",{bead_id:p}))}catch{P=null}w!==at||v!==je||(Pe=P&&Array.isArray(P.sessions)?P.sessions:[],m())}function Pt(){if(!s||!u)return;let p=d&&d.metadata,v=p&&typeof p=="object"&&typeof p.session_ref=="string"?p.session_ref:null;if(v===null){et();return}let w=st(u,v);je!==w&&(Pe=[],je=w,vt(u,w))}function bt(){if(it=!it,it&&u&&X!==Oe(u)){gt=null,Ce(u);return}m()}function Ft(){if(!a||!u)return[];let p=a.get();return(p&&p.attempts?Object.values(p.attempts):[]).filter(w=>w&&w.bead_id===u).sort((w,P)=>(P.started_at||0)-(w.started_at||0)).map(w=>({attempt_id:w.attempt_id,bead_id:w.bead_id,status:w.status,started_at:typeof w.started_at=="number"?w.started_at:null,runner:w.runner||null,model:w.model||null,effort:w.effort||w.observed_effort||null,speed:w.speed||null,session_id:w.session_id||null,resumed_from:w.resumed_from||null,continuation_mode:w.continuation_mode||null,dismissed_at:typeof w.dismissed_at=="number"?w.dismissed_at:null,cause:typeof w.cause=="string"?w.cause:null,cause_detail:w.cause_detail||null,exec_default_preset_id:typeof w.exec_default_preset_id=="string"?w.exec_default_preset_id:null,exec_default_preset_revision:typeof w.exec_default_preset_revision=="number"?w.exec_default_preset_revision:null,exec_values:w.exec_values&&typeof w.exec_values=="object"?w.exec_values:null,usage:w.usage||null,usage_legs:Array.isArray(w.usage_legs)?w.usage_legs:[],delegation_sessions:Array.isArray(w.delegation_sessions)?w.delegation_sessions:[]}))}function wt(){if(!a||!u)return null;let p=a.get();return yn(p&&p.attempts||{},u)}let Ve=new Set;function Me(p){Ve.has(p)?Ve.delete(p):Ve.add(p),m()}function L(p){let v=a?a.get():null,w=v&&v.attempts?v.attempts[p]:null;Je.open({attempt_id:p,meta:w?{runner:w.runner||void 0,model:w.model||void 0,effort:w.effort||void 0,status:w.status||void 0,session_id:w.session_id||void 0}:{}})}function Z(p,v){let w=a?a.get():null,P=w&&w.attempts?w.attempts[p]:null,Y=(P&&Array.isArray(P.delegation_sessions)?P.delegation_sessions:[]).find(xe=>xe&&typeof xe=="object"&&xe.launch_id===v);Y&&Je.open({attempt_id:p,launch_id:v,meta:{runner:Y.provider==="claude"?"claude":"codex",role:Y.role,...typeof Y.agent_type=="string"?{agent_type:Y.agent_type}:{},model:Y.model,effort:Y.effort,session_id:Y.session_id,status:Y.status}})}async function ue(p){if(!s||!p)return;let v=await Nr();if(v===null)return;let w=()=>{let xe=a?a.get():null;return xe&&typeof xe.revision=="number"?xe.revision:0},P=async(xe={},ke=w())=>await s("worker-attempt-resume",{attempt_id:p,expected_revision:ke,...v!==""?{instructions:v}:{},...xe}),ee=xe=>{xe?.queue&&a?.set&&a.set(xe.queue)},Y=await P();if(ee(Y),Y&&Y.conflict){let xe=Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:w();Y=await P({},xe),ee(Y)}Y=await jn(Y,(xe,ke)=>P({continuation:xe,decision_token:ke}),{onResult:ee,refresh:()=>P()}),Y&&Y.resumed===!1&&!Y.conflict&&Y.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Y.reason}`,"error",2400)}function E(p){!p||!u||Je.open(Eo(p,u,d&&d.status))}let K={onOpen:L,onOpenDelegation:Z,onResume:ue,onToggleUsage:Me,onOpenSessionRef:E,onCopyResumeCommand:Ct};function pe(){let p=a?a.get():null,v={...U};for(let w of["orchestration_model","orchestration_effort","orchestration_speed"]){let P=p&&p[w];typeof P=="string"&&(v[w]=P)}return v}async function S(){if(s){try{let p=await Promise.resolve(s("get-session-defaults",{}));U=p&&p.values&&typeof p.values=="object"?p.values:{}}catch{U={}}m()}}function h(){let p=a?a.get():null;return p&&p.runner_catalog||null}function A(){let p=a?a.get():null;return p&&typeof p.execution_defaults=="object"?p.execution_defaults:null}function B(){let p=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},w=cn({pin:{...p,...b},global:pe(),execution_defaults:A(),runner_catalog:h(),route:typeof p.route=="string"?p.route:null}).orchestration_model.value||"";return Cn(h(),w)}function re(){let p=i?i.get():null;return!p||typeof p.revision!="number"?null:{revision:p.revision,presets:Array.isArray(p.presets)?p.presets:[]}}function ae(p){return p?.compatible===!1}function be(p){i&&p&&typeof p.revision=="number"&&Array.isArray(p.presets)&&i.set({revision:p.revision,presets:p.presets})}async function De(){let p=re(),v=p?.presets.find(w=>w.id===k);if(!(!s||!u||!p||!v||ae(v)||y)){y=!0,x=[],m();try{let w=await Promise.resolve(s("apply-impl-preset",cd(u,v.id,p.revision)));if(w&&w.conflict){be(w),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let P=w&&Array.isArray(w.issue)?w.issue[0]:w?.issue;if(w&&w.applied&&P&&typeof P=="object"){d=P,x=Array.isArray(w.skipped_orchestration_keys)?w.skipped_orchestration_keys.filter(ee=>typeof ee=="string"):[];for(let ee of yd)delete b[ee];de(x.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}w&&w.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(w){w&&typeof w=="object"&&w.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{y=!1,m()}}}let nt=null;n&&n.subscribe&&(nt=n.subscribe(()=>Nt()));let ot=null;a&&typeof a.subscribe=="function"&&(ot=a.subscribe(()=>{u&&m()}));let Ee=null;i&&typeof i.subscribe=="function"&&(Ee=i.subscribe(()=>{u&&m()}));function lt(p){p.key==="Escape"&&u&&(p.preventDefault(),r())}document.addEventListener("keydown",lt);function Nt(){if(u){if(n&&typeof n.snapshotFor=="function"){let p=n.snapshotFor("detail:"+u)||[];d=p.find(w=>w&&w.id===u)||p[0]||d}_e(),Pt(),m()}}function Ct(p){fn(p).then(v=>{v?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function gn(p){p.preventDefault(),p.stopPropagation(),u&&Ct(u)}function Kt(p,v){p.preventDefault(),p.stopPropagation(),Ct(v)}function Ut(p,v,w){p.preventDefault(),p.stopPropagation(),Be.open(v,{missing_state:w})}function Gt(p,v){b[p]=v,m(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",ld(u,p,v.length===0?null:v))).catch(()=>{de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function zt(p,v){let w=d||{},P=w.metadata&&typeof w.metadata=="object"?w.metadata:{},ee={};for(let ke of["impl_runtime","impl_model","impl_effort"])ee[ke]=Object.hasOwn(b,ke)?b[ke]:typeof P[ke]=="string"?P[ke]:"";ee[p]=v;let Y=kd(ee,h(),B()),xe={};for(let ke of["impl_runtime","impl_model","impl_effort"])xe[ke]=b[ke],b[ke]=Y[ke]||"";m(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Y,orchestration_runtime:B()})).then(ke=>{let ct=Array.isArray(ke)?ke[0]:ke;if(!ct||typeof ct!="object"||!ct.id)throw new Error("implementation target readback failed");d=ct;for(let pt of["impl_runtime","impl_model","impl_effort"])delete b[pt];m()}).catch(()=>{for(let ke of["impl_runtime","impl_model","impl_effort"])xe[ke]===void 0?delete b[ke]:b[ke]=xe[ke];m(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Et(p,v,w){if(!s||!u)return!1;try{let P=await Promise.resolve(s(p,v)),ee=Array.isArray(P)?P[0]:P;return ee&&typeof ee=="object"&&ee.id?(d=ee,!0):(de(w,"error"),!1)}catch{return de(w,"error"),!1}}function Ye(p){setTimeout(()=>{try{let v=e.querySelector(p);v&&typeof v.focus=="function"&&v.focus()}catch{}},0)}function bn(){F=!0,I=d&&d.title||"",m(),Ye('.detail-edit__input[data-edit="title"]')}function rn(p){I=p.target.value}function tt(){F=!1,I="",m()}function Re(){Et("edit-text",{id:u,field:"title",value:I},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(v=>{v&&(F=!1,I=""),m()})}function R(){H=!0,C=d&&d.description||"",m(),Ye('.detail-edit__textarea[data-edit="description"]')}function me(p){C=p.target.value}function Ie(){H=!1,C="",m()}function dt(){Et("edit-text",{id:u,field:"description",value:C},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(v=>{v&&(H=!1,C=""),m()})}function ht(p,v,w,P){if(p.key==="Escape"){p.stopPropagation(),w();return}p.key==="Enter"&&(!P||p.ctrlKey||p.metaKey)&&(p.preventDefault(),v())}function _t(p){let v=p.target.value;Et("update-status",{id:u,status:v},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function $t(p){let v=Number(p.target.value);Et("update-priority",{id:u,priority:v},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function Wt(p){J=p.target.value}function Vt(){let p=J.trim();p.length!==0&&Et("label-add",{id:u,label:p},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(v=>{v&&(J=""),m()})}function sn(p){if(p.key==="Escape"){p.stopPropagation(),J="",m();return}p.key==="Enter"&&(p.preventDefault(),Vt())}function Rt(p){Et("label-remove",{id:u,label:p},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>m())}let on={onCopyPath:Kt,onOpenDoc:Ut};function dn(p){return typeof p=="string"?p:p&&typeof p=="object"?String(p.id||p.to||p.issue_id||p.depends_on||""):""}function Ln(p){switch(p&&typeof p=="object"?String(p.dependency_type||p.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function T(p){let w=(Array.isArray(p.dependencies)?p.dependencies:[]).map(P=>({id:dn(P),icon:Ln(P)})).filter(P=>P.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${w.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${w.map(P=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(P.id)}
                  >
                    ${P.icon?`${P.icon} `:""}${P.id}
                  </button>`:c`<span class="detail-dep"
                    >${P.icon?`${P.icon} `:""}${P.id}</span
                  >`)}
          </div>`}
    `}function O(p){let v=p.metadata||{},w=p.workflow||{},P=w.stages||{},ee=P.spec&&P.spec.stale,Y=P.impl&&P.impl.stale,xe=w.quick_fix_review?.state==="stale",ke=P.plan||null,ct=w.route_source==="derived",pt=w.route||v.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ct?" detail-kv__v--derived":""}"
          title=${ct?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ct?"unset":pt}</span
        >
      </div>
      ${w.route!=="quick_fix"||Object.hasOwn(v,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${v.spec_review||"\uC5C6\uC74C"}${ee?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${w.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ke?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ke?.approval_receipt||"\uC5C6\uC74C"}${ke?.approval_state==="stale"?" \xB7 stale":ke?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${w.route!=="quick_fix"||Object.hasOwn(v,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${v.impl_review||"\uC5C6\uC74C"}${Y?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${w.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${w.resolver.attempt} \xB7 ${w.resolver.prior_sha} \u2192 ${w.resolver.sha}`}
              >${`${w.resolver.prior_sha.slice(0,7)} \u2192 ${w.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${w.route==="quick_fix"||Object.hasOwn(v,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${v.quick_fix_review||"\uC5C6\uC74C"}${xe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${w.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${w.planned_execution.kind}</span>
            </div>
            ${w.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${w.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${w.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Fn(w.exec_receipt)}</span
            >
          </div>`:""}
      ${w.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${w.impl_entry.actor}@${w.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${v.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${v.pr_url}</span>
          </div>`:""}
    `}let Ne={route:["quick_fix","spec_backed","full_plan"]};async function f(p,v){let w=v.target.value;if(p==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&w!=="full_plan"&&!window.confirm(`full_plan \u2192 ${w||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){m();return}await Et("update-workflow-meta",{id:u,key:p,value:w},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),m()}function $(p){let v=p.metadata||{};return c` ${((P,ee)=>{let Y=Ne[P],xe=typeof v[P]=="string"?v[P]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${P}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${P}
          data-edit=${`wfmeta-${P}`}
          @change=${ke=>f(P,ke)}
        >
          <option value="" ?selected=${!Y.includes(xe)}>
            ${ee}
          </option>
          ${Y.map(ke=>c`<option value=${ke} ?selected=${xe===ke}>${ke}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function N(p,v){return F?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${I}
            @input=${rn}
            @keydown=${w=>ht(w,Re,tt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Re}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${tt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${p}</h2>
        ${Zt(v).map(w=>c`<span class="detail-usage-total" title=${w.tooltip}
              >${w.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${bn}
        >
          ✎
        </button>
      </div>
    `}function ne(p){let v=Yt(p.created_at),w=Yt(p.updated_at);return!v&&!w?c``:c`
      ${v?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${v}</span>
          </div>`:""}
      ${w?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${w}</span>
          </div>`:""}
    `}function Te(p,v){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${_t}
        >
          ${Ub.map(w=>c`<option value=${w} ?selected=${w===p}>${w}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${$t}
        >
          ${Wb.map(w=>c`<option value=${String(w)} ?selected=${w===v}>
                P${w}
              </option>`)}
        </select>
      </div>
    `}function rt(p){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${H?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${R}
            >
              ✎
            </button>`}
      </div>
      ${H?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${C}
              @input=${me}
              @keydown=${v=>ht(v,dt,Ie,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${dt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ie}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${p||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Xe(p){let v=typeof p.notes=="string"?p.notes:"";return v.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${v}</div>
    `}function Mt(p){let v=Array.isArray(p.labels)?p.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${v.map(w=>c`<span class="detail-label-chip"
              >${w}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${w}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+w}
                @click=${()=>Rt(w)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${J}
            @input=${Wt}
            @keydown=${sn}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Vt}
          >
            추가
          </button>
        </span>
      </div>
    `}function _(){if(!u)return c``;let p=d||{},v=String(p.id||u),w=p.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",P=wt(),ee=p.status||"open",Y=typeof p.priority=="number"?Math.max(0,Math.min(4,p.priority)):"",xe=p.description||"",ke={...p,metadata:{...p.metadata||{},...b}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${gn}
            >
              ${v}
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
          ${N(w,P)}
          ${pd(ke)}
          ${dd({metadata:ke.metadata,workspace_values:pe(),catalog:h(),execution_defaults:A(),expanded:M,presets:re()?.presets||[],preset_id:k,preset_busy:y,skipped_orchestration_keys:x},{onToggle:ct=>{M=ct,m()},onEdit:(ct,pt)=>{if(ct==="impl_runtime"||ct==="impl_model"||ct==="impl_effort"){zt(ct,pt??"");return}Gt(ct,pt??"")},onPresetSelect:ct=>{k=ct,x=[],m()},onPresetApply:()=>{De()}})}
          ${hd({md:ke.metadata,catalog:V,workspace_defaults:se,handlers:{onExecChange:Gt}})}
          ${Te(ee,Y)} ${ne(p)}
          ${rt(xe)}
          ${Xu(Ae,Le,{expanded:ce,draft:ye,sending:G,error:Se})}
          ${Xe(p)} ${Mt(p)} ${T(p)}
          ${O(p)} ${$(p)}
          ${Vu(p,on)}
          ${Ed({expanded:it,loading:mt,error:St,data:gt},{onToggle:bt})}
          ${Sd(Ft(),K,{total:P,expanded:Ve},Pe)}
        </div>
      </div>
    `}function m(){Qe(_(),e)}return{load(p){p!==u&&(b={},k="",x=[],M=!1,we(),$e(),qe(),et(),ve()),u=p,d=null,Nt(),S(),z!==p&&fe(p)},clear(){u=null,d=null,b={},k="",y=!1,x=[],M=!1,we(),$e(),qe(),et(),ve(),Be.close(),Je.close(),Qe(c``,e)},destroy(){nt&&(nt(),nt=null),ot&&(ot(),ot=null),Ee&&(Ee(),Ee=null),document.removeEventListener("keydown",lt),ze||(Be.destroy(),He&&He.parentNode&&He.parentNode.removeChild(He)),Je.destroy(),Ke.parentNode&&Ke.parentNode.removeChild(Ke),u=null,d=null,ve(),k="",y=!1,x=[],$e(),qe(),et(),Qe(c``,e)}}}function Cd(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,b="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let k=typeof b=="string"?b.trim():"";if(s&&(k.length>0?(s.textContent=k,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function na(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Cs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function ra(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function sa(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function oa(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function zb(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:na(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Rd(e,t){let n=zb(e,t);return n?c`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${n.deploy?c`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${n.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${n.deploy.at?Yt(n.deploy.at):""}
            >${oa(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Cs(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Gr(e){let t=ln(e.created_at),n=ln(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Yt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Yt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Hb(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Rs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function aa(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Rn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(b=>b&&b.bead_id===t&&b.phase!=="done").sort((b,k)=>(b.requested_at||0)-(k.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?Hb(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function Ts(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?c`<code>백업: ${r}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Gb={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Od(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Gb[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function ia(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return c`${e.orchestration?c`<span
        class="exec-chip exec-chip--orch${n}"
        title=${`${e.orchestration.title}${r}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?c`<span
        class="exec-chip exec-chip--worker${n}"
        title=${`${e.worker.title}${r}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function Kb(e){return c`<div
    class="mon-overlap__popover"
    role="dialog"
    aria-label="scope 겹침"
  >
    ${e.rows.map(t=>c`<div class="mon-overlap__row">
          <div class="mon-overlap__hd">
            <span class="mon-overlap__rid">${t.id}</span>
            <span class="mon-overlap__rtitle">${t.title}</span>
            <span class="mon-overlap__rwhere">${t.location_label}</span>
          </div>
          <ul class="mon-overlap__paths">
            ${t.prefixes.map(n=>c`<li>${n}</li>`)}
          </ul>
          ${t.action.kind==="note"?c`<p class="mon-overlap__note">${t.action.text}</p>`:c`<button
                type="button"
                class="mon-overlap__place"
                data-counterpart-id=${t.id}
                ?disabled=${t.action.kind==="disabled"}
                title=${t.action.title}
              >
                ${t.action.label}
              </button>`}
        </div>`)}
  </div>`}function la(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.overlaps)?e.overlaps:[],r=e.interactive!==!1,s=e.scope_missing===!0,o=e.popover||null,a=e.cross_lane||null;return t.length===0&&n.length===0&&!s&&!a?"":c`<div class="worker-deps">
    ${a?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${a.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${a.label}
        </button>`:""}
    ${t.map(i=>c`<span
          class=${`worker-dep worker-dep--pred${i.foreign?" worker-dep--foreign":""}`}
          title=${i.title||""}
          >${r?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${i.id}
              >
                ${i.label}
              </button>`:i.label}</span
        >`)}${n.map(i=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${i.id}
          aria-label=${`scope \uACB9\uCE68 ${i.id} (${i.location_label})`}
          title=${[`\uACB9\uCE68 ${i.id} (${i.location_label})`,...i.prefixes].join(`
`)}
        >
          ⧉ ${i.id}
        </button>`)}${s?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${o?Kb(o):""}
  </div>`}function ca(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Vb(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function Ld(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function ua(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Yb(e){let t=Array.isArray(e.badges)?e.badges:[],n=Zt(e.usage),r=Bn(e.usage),s=ln(e.done_at);return c`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${s?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Yt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(o=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(o=>c`<span class="worker-usage" title=${o.tooltip}
                >${o.label}</span
              >`):r?c`<span class="worker-usage" title=${cs(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${Cs(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Jn(e){if(e.lane==="done"&&e.done_layout==="three_line")return Yb(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Zt(e.usage),s=Bn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?ln(e.done_at):"",u=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",b=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",k=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",y=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,x=e.lane==="done"?"":ca(e.workflow),M=e.lane==="done"?"":Ld(e.from_id),U=ua(e.priority),V=c`<span class="worker-mini__title">${e.title}</span>`,se=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",z=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",j=n.map(ce=>ce===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ce}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ce===e.completion_badge&&e.completion_title||""}
          >${ce}</span
        >`),F=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",H=r.length>0?r.map(ce=>c`<span class="worker-usage" title=${ce.tooltip}
              >${ce.label}</span
            >`):s?c`<span class="worker-usage" title=${cs(e.usage)}
            >${s}</span
          >`:"",I=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",C=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",J=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",we=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ve=e.discard,W=ve?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ve?.attempt_id||""}
          data-operation-id=${ve?.operation?.operation_id||""}
          data-discard-mode=${ve?.confirmation||"unmerged"}
          ?disabled=${ve?!ve.enabled:e.discard_enabled===!1}
          title=${ve?ve.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ve?.label||"\uD3D0\uAE30"}
        </button>`:"",te=e.stale_work||null,fe=te?c`${te.can_resume||te.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            기존 작업 이어가기
          </button>`:""}${te.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            백업 후 새로 시작
          </button>`:""}${te.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            다시 확인
          </button>`:""}`:"",Ae=te?c`<div class="worker-mini__stale">
        <strong>${te.title}</strong>
        <span>${te.summary}</span>
        <span>${te.cause}</span>
        ${te.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",he=e.revise_action?c`<button
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
        </button>`:"",le=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Se=k||x||M||le||H?c`<div class="worker-chips">
          ${k}${x}${M}${le?ia(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${H}
        </div>`:"",ye=la(e.dependency_chips),G=Ts(e),oe=!!(o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ve?.operation||e.revise_action||te);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">
            ${k}${y}${U}${M}${V}
          </div>
          <div class="worker-mini__row2">
            ${H}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Yt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Cs(e.work_ms)}</span
                >`:""}${j}${I}
            <span class="worker-mini__actions"
              >${C}${J}${we}${W}</span
            >
            ${Gr(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${u}${d}${y}${U}${se}${z}${j}${b}${F}
            </div>
            <div class="worker-mini__body">${V}${Ae}</div>
            ${ye}${Se}${oe?c`<div class="worker-mini__foot">
                  ${I}
                  <span class="worker-mini__actions"
                    >${C}${J}${we}${W}${he}${fe}</span
                  >
                  ${Ts(e)}
                </div>`:""}
            ${Gr(e)}`:c`<div class="worker-mini__line">
              ${u}${d}${y}${U}${V}${se}${z}${j}${b}${F}${I}${C}${J}${we}${W}
            </div>
            ${ye}${Se}${G} ${Gr(e)}`}
  </div>`}function Zb(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var Xb={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50"};function Hi(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.session_preferred===!0,i=Xb[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),b=la(e.dependency_chips),k=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",y=ca(l),x=Ld(e.from_id),M=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${ua(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:a?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${i}
              >세션 권장</span
            >`:""}${Vb(l)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${l?ko(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${b}
    ${k||y||x||M?c`<div class="worker-chips">
          ${k}${y}${x}${ia(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason||n.dep_action===!0?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${Zb(t.lanes,e.id)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:c`${e.reason?c`<span
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
            >${n.dep_action===!0?c`<button
                  type="button"
                  class="worker-card__dep mon-dep__btn"
                  data-bead-id=${e.id}
                  title="의존성"
                  aria-label="의존성"
                >
                  ⛓
                </button>`:""}`}
    </div>
    ${Gr(e)}
  </div>`}function wn(e){let t=!!e.collapsible&&!!e.collapsed,n=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?c`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${n}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:c`<header class="worker-pane__hd">
          ${n}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(r=>e.lane==="candidate"?Hi(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Jn(r))}
          </div>`}
  </section>`}function da(e){return e.replace(/\/+$/,"")}function Qb(e,t){let n=da(e),r=da(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function pa(e,t){let n=new Set;for(let r of e)for(let s of t){if(!Qb(r,s))continue;let o=da(r),a=da(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}function Pd(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let l=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:l})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let l=pa(s[a].scope,s[i].scope);if(l.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var Id=["parallel","serial","candidate"];function Os(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function Gi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=Id.includes(r.kind),l=Id.includes(s.kind);if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&l&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&l&&a===null){let u=Jb(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:`${Os(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Os(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Jb(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Md={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Dd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Nd(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ki(e){for(let t of Nd(e))if(Object.hasOwn(Md,t))return Md[t];return null}function Vi(e){let t=null;for(let n of Nd(e))Object.hasOwn(Dd,n)&&(t=Dd[n]);return t}function fa(e){let t=Ki(e),n=Vi(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function qd(e,t){let n=Ki(e)??Ki(t),r=Vi(t)??Vi(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Fd=160;function eh(e){return e.length>Fd?`${e.slice(0,Fd)}\u2026`:e}function th(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${eh(e.command)}</code>`:""}
  </div>`}function nh(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function rh(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function jd(e){let t=e.failure?fa(e.failure.reason):"";return c`<div class="worker-banners">
    ${e.failure?c`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?c`<button
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
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${th(e.failure.cause_detail,e.failure.reason)}
          ${nh(e.failure.reason)}
          ${Ts({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function sh(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var oh=new Set(["codex-runner"]);function ah(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(y=>y&&!(typeof y.agent_type=="string"&&oh.has(y.agent_type))),l=i.filter(y=>y&&y.state==="live"),u=i.filter(y=>y&&y.state!=="live"),d=r&&typeof r.last_event_at=="number"?ln(r.last_event_at,t):"",b=r?ln(r.updated_at,t):"",k=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:b?`\uAC31\uC2E0 ${b}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?c`<span class="rtile__activity-age"
              >${ln(a,t)}</span
            >`:""}
      </div>`:k?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${k}</span>
        </div>`:""}${l.length>0||u.length>0?c`<div class="rtile__legs">
        ${l.map(y=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${y.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(y=>y.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var ih={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function lh(e){if(!e)return"";let t=ih[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Yi(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(te=>te&&te.current===!0)||null,a=e.failed===!0,i=!!e.paused,l=a?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):i?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?rh(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=as(e),b=Zt(e.usage),k=Bn(e.usage),y=e.conflict_resolution?i?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,x=e.base_exception||null,M=e.landing,U=e.attempt_id&&e.attempt_id===n,V=r.monitor||null,se=sh(V),z=V?la(V.dependency_chips):"",j=ah(V,t,i,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),F=s&&e.workflow?.chips?.exec_receipt||null,H=ca(e.workflow),I=F?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Fn(F)}`}
        >${`${F.kind}:${$o(F)}`}</span
      >`:"",C=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${ls(o)}</span
      >`:"",J=se||H||C||I?c`<div class="rtile__meta">
          ${se}${H}${C}${I}
        </div>`:"",we=c`${y?c`<span class="worker-mini__badge">${y}</span>`:""}${x?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${x}</span
      >`:""}`,ve=s?"":Gr(e),W=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
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
      ${ua(e.priority)}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}${we}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${lh(o)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${l}</span>`}
        ${s?"":a?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${e.resume_eligible===!1}
                  title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${W}
                <button
                  type="button"
                  class="rtile__dismiss"
                  title="실패 알림 닫기 — 레인에는 남습니다"
                  aria-label="실패 기록 닫기"
                >
                  ✕
                </button>`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${i?c`<button
                      type="button"
                      class="rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶
                    </button>`:c`<button
                      type="button"
                      class="rtile__pause"
                      ?disabled=${e.can_pause===!1}
                      title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                      aria-label="일시정지"
                    >
                      ⏸
                    </button>`}
                ${W}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${j}${e.rollup?wo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ei}):""}
    ${M?c`<div class="rtile__landing">
          <span
            class="merge-step${M.failed?" merge-step--failed":""}"
            style=${`--progress: ${M.percent}%`}
            >${M.label}${M.index>0?c`<span class="merge-step__n"
                  >${M.index}/${M.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${z}
    ${s?J:se||H||u||b.length>0||k?c`<div class="rtile__meta">
            ${se}${H}${ia(e.exec_chips)}
            ${b.length>0?b.map(te=>c`<span class="worker-usage" title=${te.tooltip}
                      >${te.label}</span
                    >`):k?c`<span
                    class="worker-usage"
                    title=${cs(e.usage)}
                    >${k}</span
                  >`:""}
          </div>`:""}
    ${Ts(e)} ${ve}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${a||i?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Zi(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Yi(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var Xi=new Set(["unavailable","not_applicable"]);function er(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Bd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function tr(e,t){return t===null?null:`${Qn[e]}: ${t.display} (${Yo[t.source]})`}function Qi(e){return e.filter(t=>t!==null).join(`
`)}function Ls(e){if(typeof e!="object"||e===null)return null;let t=_r(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Qi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Qn.orchestration_model,e.model),n(Qn.orchestration_effort,e.effort),n(Qn.orchestration_speed,e.speed)])}}function hr(e,t){let n=er(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=er(e,"orchestration_effort"),s=er(e,"orchestration_speed"),o=Bd([Cn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Qi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",tr("orchestration_model",n),tr("orchestration_effort",r),tr("orchestration_speed",s)])}}function ch(e,t){return e===null||e.value===null||Xi.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function uh(e){return e===null||Xi.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function dh(e){return e===null?null:e.value==="auto"?"auto":Xi.has(e.resolution)?null:e.display}function nr(e,t){if(typeof e!="object"||e===null)return null;let n=er(e,"impl_dispatch"),r=er(e,"impl_runtime"),s=er(e,"impl_model"),o=er(e,"impl_effort"),a=er(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":Bd([ch(r,t??null),uh(s),dh(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Qi(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",tr("impl_dispatch",n),tr("impl_runtime",r),tr("impl_model",s),tr("impl_effort",o),tr("impl_speed",a)])}}var Xt="",ph=["impl_runtime","impl_model","impl_effort"],fh=["claude_account","codex_account"],_h=5,_a=1;function un(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ma(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(L=>de(L,"error",4e3)),o={},a={},i=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},b={},k=Promise.resolve(),y={claude:null,codex:null},x=!1,M=null,U={},V="",se="",z=!1,j=!1,F=!1,H=null,I=!1;function C(){let L=t.queue?t.queue():null;return un(L)?L:null}function J(){let L=C();return L?L.runner_catalog:null}function we(){let L=C();return L&&un(L.execution_defaults)?L.execution_defaults:null}function ve(){let L=t.implPresetStore?.get();return un(L)&&Array.isArray(L.presets)?L:null}function W(){return r===null?{}:{root_dir:r}}async function te(L,Z){return I||!n?null:await n(L,Z)}function fe(L){L&&un(L.queue)&&t.onQueueAdopt?.(L.queue)}async function Ae(L,Z){let ue=C();if(!ue||I)return null;let E=await te(L,{...Z,...W(),expected_revision:ue.revision});if(fe(E),r!==null&&E&&E.conflict){let K=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:C()?.revision??ue.revision;E=await te(L,{...Z,...W(),expected_revision:K}),fe(E)}return E}async function he(){l=!0,Me();try{let L=await te("get-session-defaults",{...W()});o=un(L?.values)?{...L.values}:{},a={...o},i=Array.isArray(L?.warnings)?L.warnings:[]}catch(L){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}finally{l=!1,Me()}}async function le(){let L=od(o,a);if(Object.keys(L).length!==0){try{let Z=await te("set-session-defaults",{values:L,...W()});o=un(Z?.values)?{...Z.values}:{},a={...o},i=Array.isArray(Z?.warnings)?Z.warnings:[]}catch(Z){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}Me()}}function Se(L,Z){if(!un(L))return;let ue=L.state;u={state:ue==="usable"||ue==="unusable"||ue==="absent"?ue:"absent",values:un(L.values)?{...L.values}:{},warnings:Array.isArray(L.warnings)?L.warnings:[]},b={...u.values},Z&&(d={...b})}async function ye(){try{Se(await te("get-workspace-accounts",{...W()}),!0)}catch(L){u={state:"unusable",values:{},warnings:["kv_read_failed"]},b={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}Me()}async function G(L){try{let Z=await fetch(L);if(!Z.ok)return null;let ue=await Z.json();if(!un(ue)||!Array.isArray(ue.accounts))return null;let E=ue.accounts.filter(K=>un(K)&&typeof K.key=="string"&&K.key.length>0&&typeof K.email=="string"&&K.email.length>0);return{accounts:E,active:E.find(K=>K.active===!0)||null}}catch{return null}}async function oe(){x=!0;let[L,Z]=await Promise.all([G("/api/claude-usage"),G("/api/codex-usage")]);I||(y={claude:L,codex:Z},Me())}function ce(){let L={};for(let Z of fh){let ue=Object.hasOwn(d,Z)?d[Z]:null,E=Object.hasOwn(b,Z)?b[Z]:null;ue!==E&&(L[Z]=ue)}return L}async function $e(){let L=ce();if(Object.keys(L).length!==0){try{Se(await te("set-workspace-accounts",{values:L,...W()}),!1)}catch(Z){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}Me()}}function Ge(L,Z){Z===Xt?delete d[L]:d[L]=Z,Me(),k=k.then(()=>$e())}function _e(L,Z){if(ph.includes(L)){ge(L,Z);return}Z===Xt?delete a[L]:a[L]=Z,Me(),le()}function Fe(){let L=wt().orchestration_model,Z=cn({global:{orchestration_model:L??void 0},execution_defaults:we(),runner_catalog:J()}).orchestration_model.value;return Z?Cn(J(),Z):null}function D(L,Z){typeof Z=="string"&&Z.length>0?a[L]=Z:delete a[L]}function ge(L,Z){let ue=Z===Xt?void 0:Z,E=rd({impl_runtime:L==="impl_runtime"?ue:a.impl_runtime,impl_model:L==="impl_model"?ue:a.impl_model,impl_effort:L==="impl_effort"?ue:a.impl_effort},J(),Fe());D("impl_runtime",E.impl_runtime),D("impl_model",E.impl_model),D("impl_effort",E.impl_effort),Me(),le()}async function Le(){let L=C();if(!L)return;let Z={orchestration_model:L.orchestration_model??null,orchestration_effort:L.orchestration_effort??null,orchestration_speed:L.orchestration_speed??null},ue=ad(Z,{...Z,...U});if(Object.keys(ue).length!==0){try{let E=await Ae("worker-queue-set-orchestration-defaults",{values:ue});if(E&&E.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}U={}}catch(E){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}Me()}}function ze(L,Z){U[L]=Z===Xt?null:Z,Me(),Le()}function He(L){if(M=L,!L){Me();return}let Z=J(),ue=wt(),E=ue.orchestration_model;E&&!As(Z,L).includes(E)&&(U.orchestration_model=null,E=null);let K=ue.orchestration_effort;K&&!Ni(Z,L,E||mn).includes(K)&&(U.orchestration_effort=null),Me(),Le()}async function Be(L){if(!(!C()||L<_a)){try{await Ae("worker-queue-set-slots",{slots:L})}catch(Z){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}Me()}}async function Ke(L){if(!(!C()||L<_a||L>_h)){try{await Ae("worker-queue-set-serial-lane-count",{count:L})}catch(Z){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}Me()}}async function Je(L,Z){let ue=L==="auto_advance"?"worker-automation-toggle":L==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await Ae(ue,{on:Z})}catch(E){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}Me()}function it(){let L={},Z=wt();for(let ue of Ho){let E=Gn.includes(ue)?Z[ue]:a[ue];typeof E=="string"&&E.length>0&&(L[ue]=E)}return L}async function mt(){let L=ve();if(!L)return;let Z=it();if(Object.keys(Z).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ue=(L.presets||[]).find(K=>K.id===V),E=se.trim()||(ue?ue.name:"");if(!E){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let K=ue?await te("impl-preset-update",{expected_revision:L.revision,id:ue.id,name:E,settings:Z}):await te("impl-preset-create",{expected_revision:L.revision,name:E,settings:Z});if(K&&K.applied){if(se="",!ue&&Array.isArray(K.presets)){let pe=K.presets.find(S=>S.name===E);V=pe?pe.id:V}Me()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Me()}catch(K){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}}async function St(){let L=ve();if(!(!L||V.length===0))try{let Z=await te("impl-preset-delete",{expected_revision:L.revision,id:V});Z&&Z.applied?(V="",Me()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Me())}catch(Z){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}}function gt(L){o=un(L.values)?{...L.values}:{},a={...o},i=Array.isArray(L.warnings)?L.warnings:[],un(L.queue)&&(t.onQueueAdopt?.(L.queue),U={})}async function X(){let L=ve(),Z=C();if(!L||!Z||V.length===0)return;let ue=E=>({preset_id:V,expected_revision:L.revision,expected_queue_revision:E,...W()});try{let E=await te("apply-impl-preset-global",ue(Z.revision));if(E&&E.applied&&gt(E),r!==null&&E&&E.queue_applied===!1){let K=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:C()?.revision??Z.revision;E=await te("apply-impl-preset-global",ue(K)),E&&E.applied&&gt(E)}E&&E.applied?E.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):E&&E.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(E){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}Me()}async function Q(){j=!0,F=!1,Me();try{let L=await te("get-worker-system-prompt",{});!L||typeof L!="object"||Array.isArray(L)?F=!0:H=L}catch{F=!0}finally{j=!1,Me()}}function Oe(){if(z=!z,z&&!H){Q();return}Me()}function qe(){let L=Br({loading:j,error:F});if(L)return L;if(!H)return"";let Z=Array.isArray(H.variants)?H.variants:[];return c`<div class="settings-dialog__sp-body">
      ${H.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${H.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Z.map(ue=>c`<div class="settings-dialog__sp-variant" data-variant=${ue.key}>
            <div class="settings-dialog__sp-cond">${ue.condition}</div>
            ${Hn(ue.label,ue.system_prompt)}
          </div>`)}
    </div>`}function Ce(){return c`<section
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
        @click=${Oe}
      >
        ${z?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${z?qe():""}
    </section>`}function Pe(L,Z,ue,E,K,pe,S){let h=K[L]??Xt,A=qi(L,ue,K,we(),J(),S),B=A.options.find(ae=>ae.value===h),re=h===Xt?A.full_value:B?.full_value;return c`<select
        class=${h===Xt?"settings-dialog__unset":""}
        data-key=${L}
        aria-label=${Z}
        title=${re||""}
        ?disabled=${pe===!0||A.disabled}
        .value=${br(String(h))}
        @change=${ae=>E(L,String(ae.target.value))}
      >
        <option value=${Xt} ?selected=${h===Xt}>
          ${A.unset_label}
        </option>
        ${A.options.map(ae=>c`<option
              value=${ae.value}
              title=${ae.full_value||""}
              ?selected=${ae.value===h}
            >
              ${ae.label}
            </option>`)}
      </select>
      ${h===Xt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function je(L,Z,ue,E,K,pe=!1,S){return c`<div
      class=${`settings-dialog__row${pe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        ${Pe(L,Z,ue,E,K,pe,S)}
      </span>
    </div>`}function at(L,Z){let ue=Z?Z.active:null;return un(ue)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${L==="claude"?ue.email:Hr({...ue,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function st(L,Z,ue){let E=y[ue],K=Object.hasOwn(d,L)?d[L]:Xt,pe=ue==="claude"?Qo:Hr,S=!!E?.accounts.some(h=>h.key===K);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${Z}
          data-account-key=${L}
          @change=${h=>Ge(L,String(h.target.value))}
        >
          <option value=${Xt} ?selected=${K.length===0}>
            ${at(ue,E)}
          </option>
          ${K.length>0&&!S?c`<option value=${K} selected>
                ${K} (목록에 없음)
              </option>`:""}
          ${E?.accounts.map(h=>c`<option value=${h.key} ?selected=${h.key===K}>
                ${pe(h)}
              </option>`)||""}
        </select>
        ${E?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function et(){let L=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${L} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${L}`:null}function vt(L,Z,ue,E,K){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Z}-on)`}
        ></i>
        ${L}
      </span>
      <span class="settings-dialog__controls">
        ${Pe(ue,`${L} \uBAA8\uB378`,E,_e,a,!1)}
        ${Pe(K,`${L} effort`,Vo,_e,a,!1)}
      </span>
    </div>`}function Pt(L,Z,ue,E){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${E?" is-on":""}`}
          data-automation=${L}
          aria-pressed=${E?"true":"false"}
          aria-label=${Z}
          @click=${()=>Je(L,!E)}
        >
          ${E?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ue}</span>
      </span>
    </div>`}function bt(L,Z,ue,E){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${L}>
          <button
            type="button"
            aria-label=${`${Z} \uAC10\uC18C`}
            @click=${()=>E(ue-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ue}</span>
          <button
            type="button"
            aria-label=${`${Z} \uC99D\uAC00`}
            @click=${()=>E(ue+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ft(L){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${L.rows.length>0?`\uBCC0\uACBD ${L.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${L.rows.map(Z=>c`<div
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
      ${L.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${L.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function wt(){let L=C(),Z={};for(let ue of Gn)Z[ue]=Object.prototype.hasOwnProperty.call(U,ue)?U[ue]:L&&typeof L[ue]=="string"?L[ue]:null;return Z}function Ve(){let L=J(),Z=a.impl_runtime,ue=a.impl_model,E=ve(),K=C(),pe=wt(),S=As(L,M),h=Wr(L,void 0).filter(Ee=>Ee!==mn),A=Ni(L,M,pe.orchestration_model||mn).filter(Ee=>Ee!==mn),B=V?(E?.presets||[]).find(Ee=>Ee.id===V):null,re=B?sd(it(),un(B.settings)?B.settings:{}):null,ae=K&&typeof K.slots=="number"?K.slots:_a+1,be=K&&typeof K.serial_lane_count=="number"?K.serial_lane_count:_a,De=we()?.supported===!0,nt=et(),ot=qi("workflow_mode",$s,a,we(),L);return c`
      ${i.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${nt?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${nt}
          </div>`:""}
      ${De?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${l?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${br(V)}
                @change=${Ee=>{V=String(Ee.target.value),Me()}}
              >
                <option value="" ?selected=${V===""}>
                  실행 프리셋…
                </option>
                ${(E?.presets||[]).map(Ee=>c`<option
                      value=${Ee.id}
                      ?selected=${Ee.id===V}
                    >
                      ${Ee.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!re||re.rows.length===0}
                @click=${X}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${V?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${br(se)}
                @input=${Ee=>{se=String(Ee.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${V?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${mt}
              >
                ${V?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${V.length===0}
                @click=${St}
              >
                삭제
              </button>
            </div>
            ${re?Ft(re):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${br(M||Xt)}
                    @change=${Ee=>{let lt=String(Ee.target.value);He(lt===Xt?null:lt)}}
                  >
                    <option value=${Xt} ?selected=${!M}>
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
              ${je("orchestration_model","\uBAA8\uB378",S,ze,pe)}
              ${je("orchestration_effort","effort",A,ze,pe)}
              ${je("orchestration_speed","\uC18D\uB3C4",ks,ze,pe)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${st("claude_account","Claude","claude")}
              ${st("codex_account","Codex","codex")}
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
                      @click=${()=>_e("workflow_mode",Xt)}
                    >
                      ${ot.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${$s.map(Ee=>c`<button
                          type="button"
                          data-mode=${Ee}
                          aria-pressed=${String(a.workflow_mode===Ee)}
                          @click=${()=>_e("workflow_mode",Ee)}
                        >
                          ${Ee}
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
              ${vt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",xs,"spec_review_effort")}
              ${vt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ko,"plan_review_effort")}
              ${vt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",xs,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${je("impl_runtime","\uC704\uC784 \uB300\uC0C1",Go,_e,a)}
              ${je("impl_model","\uBAA8\uB378",Wr(L,Z),_e,a)}
              ${je("impl_effort","effort",zr(L,Z,ue),_e,a)}
              ${je("impl_speed","\uC18D\uB3C4",ks,_e,a)}
              ${je("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",h,_e,a,!1,{...a,...pe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Pt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",K?.auto_advance===!0)}
              ${Pt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",K?.auto_merge===!0)}
              ${Pt("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",K?.auto_repair===!0)}
              ${bt("slots","\uB3D9\uC2DC \uC2E4\uD589",ae,Ee=>Be(Ee))}
              ${bt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",be,Ee=>Ke(Ee))}
            </div>
            ${Ce()}
          `}
    `}function Me(){I||Qe(Ve(),e)}return{load(){U={};let L=[he(),ye()];return x||L.push(oe()),Promise.all(L).then(()=>{})},render:Me,sessionDraft:()=>({...a}),destroy(){I=!0,Qe(c``,e)}}}function ga(e){return c`<svg
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
  </svg>`}function Ud(){return ga(ss`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Wd(){return ga(ss`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function zd(){return ga(ss`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Hd(){return ga(ss`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Gd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Kd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Zt(Co(t));let n={};for(let i of Dn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let d of Dn){let b=l[d];typeof b=="number"&&Number.isFinite(b)&&(n[d]+=b,r=!0,u=!0)}if(u){o+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Bn(n):null}function On(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ji(e,t){let n=On(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function mh(e,t){if(!On(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function gh(e){if(!On(e)||!On(e.execution_defaults)||!On(e.runner_catalog)||!On(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=cn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Cn(e.runner_catalog,n.orchestration_model.value??""),s=hr(n,e.runner_catalog),o=nr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Vd(e,t){let n=t.notify||(G=>de(G,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,d=null,b=null,k=new Map;function y(){let G=t.workspacesState?t.workspacesState():[];return Array.isArray(G)?G.filter(oe=>On(oe)):[]}function x(G){return y().find(oe=>oe.root_dir===G)||null}function M(G){return mh(x(G),k.get(G))}function U(){for(let G of y()){let oe=k.get(G.root_dir);oe&&typeof oe.revision=="number"&&typeof G.revision=="number"&&G.revision>=oe.revision&&k.delete(G.root_dir)}}async function V(G,oe,ce){let $e=t.transport,Ge=M(oe);if(!(!$e||!On(Ge))){try{let _e=await $e(G,{...ce,root_dir:oe,expected_revision:Ge.revision});if(On(_e?.queue)&&k.set(oe,_e.queue),_e&&_e.conflict){let Fe=On(_e.queue)&&typeof _e.queue.revision=="number"?_e.queue.revision:M(oe)?.revision;_e=await $e(G,{...ce,root_dir:oe,expected_revision:Fe}),On(_e?.queue)&&k.set(oe,_e.queue)}}catch(_e){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${_e instanceof Error?_e.message:String(_e)}`)}le()}}function se(G){u!==G&&(u=G,t.onFocusChange?.(u),le())}function z(G){se(u===G?null:G)}function j(G){if(d===G){H();return}F(),d=G;let oe=x(G);a.textContent=`${oe?.name||G} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,b=ma(l,{root_dir:G,queue:()=>M(G),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ce=>{k.set(G,ce),le()}}),b.load(),le()}function F(){b?.destroy(),b=null}function H(G){F(),d=null,s.hidden=!0,a.textContent="",G!==!0&&le()}let I=()=>H();i.addEventListener("click",I);function C(G){G.key==="Escape"&&u!==null&&se(null)}document.addEventListener("keydown",C);function J(G,oe){let ce=Math.max(oe,G,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${oe}\uAC1C \uC911 ${G}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ce},($e,Ge)=>Ge<G?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function we(G){let oe=G.auto_advance===!0,ce=G.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${oe?" is-on":""}`}
        data-act="auto"
        aria-pressed=${oe?"true":"false"}
        aria-label=${`${G.name} \uC790\uB3D9\uD654`}
        title=${oe?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${oe?Wd():Ud()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ce?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ce?"true":"false"}
        aria-label=${`${G.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ce?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${zd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===G.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===G.root_dir?"true":"false"}
        aria-label=${`${G.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Hd()}
      </button>`}function ve(G){let oe=gh(G);return oe?c`<div class="mon2-deck__chips">
      ${oe.orchestration?c`<span class="mon2-deck__chip" title=${oe.orchestration.title}
            >오케 ${oe.orchestration.text}</span
          >`:""}
      ${oe.worker?c`<span class="mon2-deck__chip" title=${oe.worker.title}
            >워커 ${oe.worker.text}</span
          >`:""}
    </div>`:""}function W(G){let oe=[];for(let[ce,$e]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ge=Ji(G,ce);Ge>0&&oe.push(`${$e} ${Ge}`)}return oe.join(" \xB7 ")}function te(G){let oe=Ji(G,"running"),ce=typeof G.slots=="number"?G.slots:1;return c`<div
      class=${`mon2-deck__tile${u===G.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${G.root_dir}
      aria-pressed=${u===G.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${G.root_dir}>${G.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ce}\uAC1C \uC911 ${oe}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${oe}/${ce}</span>
          ${J(oe,ce)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${G.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${we(G)}</div>
        <span class="mon2-deck__counts">${W(G)}</span>
        ${ve(G)}
      </div>
    </div>`}function fe(G){let oe=t.doneItems?t.doneItems():[],ce=t.rangeLabel?t.rangeLabel():"",$e=Kd(Array.isArray(oe)?oe:[]),Ge=_e=>G.reduce((Fe,D)=>Fe+Ji(D,_e),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${G.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ce}`}
        >실행 ${Ge("running")} · 대기 ${Ge("queue")} · PR
        ${Ge("pr_wait")}${Ge("session_active")>0?` \xB7 \uC138\uC158 ${Ge("session_active")}`:""}
        · ${ce} 완료
        ${Array.isArray(oe)?oe.length:0}</span
      >
      ${$e===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof $e=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Gd(ce)}
                  >${$e}</span
                >`:$e.map(_e=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${_e.provider}
                      title=${_e.tooltip}
                      >${_e.label}</span
                    >`)}
          </span>`}
    </div>`}function Ae(){let G=y();return G.length===0?"":c`${fe(G)}
      <div class="mon2-deck__strip">
        ${G.map(oe=>te(oe))}
      </div>`}function he(){u!==null&&!x(u)&&(u=null,t.onFocusChange?.(null))}function le(){U(),he(),d!==null&&!x(d)&&H(!0),Qe(Ae(),r),b?.render()}function Se(G){let oe=G.target;if(!oe||typeof oe.closest!="function")return;let ce=oe.closest("[data-root-dir]");if(!ce)return;let $e=ce.getAttribute("data-root-dir")||"",Ge=oe.closest("[data-act]")?.getAttribute("data-act");if(Ge==="worker"){t.gotoWorkerTab?.($e);return}if(Ge==="auto"){V("worker-automation-toggle",$e,{on:M($e)?.auto_advance!==!0});return}if(Ge==="merge"){V("worker-merge-auto-toggle",$e,{on:M($e)?.auto_merge!==!0});return}if(Ge==="gear"){j($e);return}z($e)}function ye(G){if(G.key!=="Enter"&&G.key!==" ")return;let oe=G.target;if(!oe||typeof oe.closest!="function")return;let ce=oe.closest('[data-root-dir][role="button"]');!ce||ce!==oe||(G.preventDefault(),z(ce.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Se),r.addEventListener("keydown",ye),{render:le,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",C),r.removeEventListener("click",Se),r.removeEventListener("keydown",ye),i.removeEventListener("click",I),F(),Qe(c``,r),e.replaceChildren()}}}function Yd(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let d of r.get(u))if(!s.has(d))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let a=[],i=new Map(o.map((l,u)=>[l,u]));for(let l of o){let u=null;for(let d of r.get(l)){let b=Number(n.get(l))<Number(n.get(d)),k=Number(i.get(l))>Number(i.get(d));b&&k&&(u===null||Number(i.get(d))>Number(i.get(u)))&&(u=d)}u!==null&&a.push({bead_id:l,after:u})}return{order:o,corrections:a,cycle:!1}}var bh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",hh="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",yh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",vh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Kr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Is(e,t){return`${e}\0${t}`}function wh(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,a=o instanceof Map?o.get(s):void 0;if(!Array.isArray(a))return null;r.set(s,a.filter(i=>i!==s&&n.has(i)))}return r}function kh(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function ha(e,t){let n=e.entries,r=n.map(b=>b.bead_id),s=wh(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[b,k]of s)for(let y of k)o.push({blocker:y,blockee:b});let a=kh(e,t),i=new Map(r.map((b,k)=>[b,k])),l=r.slice(0,a).filter(b=>s.get(b).some(k=>Number(i.get(k))>Number(i.get(b)))),u=Yd(r.slice(a),o);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let d=new Map(n.map(b=>[b.bead_id,b]));return{entries:[...n.slice(0,a),...u.order.map(b=>d.get(b))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function $h(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function xh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Ah(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function el(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Sh(e,t){let n=new Set;for(let[a,i]of t)for(let l of i)n.add(Is(a,l));let r=new Map,s=new Map;for(let a of e){let i=Is(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Is(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Eh(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Th(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ba(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function tl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Ds(e){let t=Ah(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(s.refusal=xh(u),null):d};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(u,d,b)=>{if(s.refusal!==null||u===d)return;let k=t.get(u)||[];if(k.includes(d))return;let y=o(u);if(y!==null){if(el(t,d,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...k,d]),b!==void 0&&r.add(Is(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:y,...b===void 0?{}:{lane_id:b}})}},removeDep:(u,d)=>{if(s.refusal!==null||u===d)return;let b=t.get(u)||[];if(!b.includes(d))return;let k=o(u);k!==null&&(t.set(u,b.filter(y=>y!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:k}))},laneCreated:(u,d)=>r.has(Is(u,d))}}function Ns(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=Sh(e.dep_ops,t.blocked_by_map),a=o.filter(d=>d.type==="dep-remove"),i=o.filter(d=>d.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:$h(s.lane_id,s.correction);return{lane_ops:n,ops:[...a,...l,...i,...r],lane_op_index:a.length+l.length,...u===void 0?{}:{correction:u}}}function Zd(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Ps(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Xd(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let a of r){let i=e.owner_of.get(a.bead_id)||a.root_dir;typeof i!="string"||i.length===0||o.set(i,[...o.get(i)||[],a.bead_id])}for(let[a,i]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:i,lane_id:n},root_dir:a});return s}function Qd(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(ba(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function Ms(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function ya(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function nl(e,t,n){let r=Ds(n),s=[],o=[],a=[],i,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:bh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:yh};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${tl(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Kr}}if(e.kind==="chain"&&d===void 0)return{refused:Kr};let b=()=>{if(d===void 0||d.status!=="confirmed")return;let x=d.entries.findIndex(z=>z.bead_id===e.bead_id);if(x<0)return;let M=x>0?d.entries[x-1]:null,U=x+1<d.entries.length?d.entries[x+1]:null,V=Ps(d,x),se=U!==null&&Ps(d,x+1);V&&M!==null&&r.removeDep(e.bead_id,M.bead_id),se&&U!==null&&r.removeDep(U.bead_id,e.bead_id),(V||se)&&M!==null&&U!==null&&r.addDep(U.bead_id,M.bead_id,u)},k=(x,M)=>{let U=n.cross_lanes.get(x),V=U.entries.findIndex(we=>we.bead_id===e.bead_id),se=U.entries.filter(we=>we.bead_id!==e.bead_id),z=Math.max(0,Math.min(se.length,V>=0&&M>V?M-1:M)),j=-1;if(se.forEach((we,ve)=>{n.fixed_members.has(we.bead_id)&&(j=ve)}),z<=j){r.state.refusal=vh;return}let F=V>=0?U.entries[V]:d?.entries.find(we=>we.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};i=ha({status:U.status,entries:[...se.slice(0,z),F,...se.slice(z)]},n);let H=i.entries;if(ya(H,U.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:x,entries:Ms(H)}}),U.status!=="confirmed")return;let I=H.findIndex(we=>we.bead_id===e.bead_id),C=I>0?H[I-1].bead_id:null,J=I+1<H.length?H[I+1].bead_id:null;if(C===null){J!==null&&r.addDep(J,e.bead_id,x);return}if(r.addDep(e.bead_id,C,x),J!==null&&(r.graph.get(J)||[]).includes(C)){let we=U.entries.findIndex(ve=>ve.bead_id===J);(r.laneCreated(J,C)||we>0&&U.entries[we-1].bead_id===C&&Ps(U,we))&&r.removeDep(J,C),r.addDep(J,e.bead_id,x)}},y=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(b(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(a.push(...Xd(n,d,u,d.entries.filter(x=>x.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Ms(d.entries.filter(x=>x.bead_id!==e.bead_id))}}))),t.kind==="chain"&&k(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let x=Eh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(ba(e.bead_id,e.root_dir,x));else if(e.kind==="parallel"){let M=n.parallel_rows,U=M[Math.max(0,Math.min(M.length,t.marker_index))];if(!(!!U&&U.bead_id===e.bead_id)&&Th(n,e.root_dir)&&y!==void 0){let se=y>x?x:x-1;se>=0&&se!==y&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:se},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let x=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&x.status==="confirmed"&&o.push(ba(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(y!==void 0&&t.index!==y){let x=y>t.index?t.index:t.index-1;x>=0&&x!==y&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:x},root_dir:e.root_dir})}}else o.push(ba(e.bead_id,e.root_dir,t.index,t.lane_id));return Ns(r,n,s,o,{disarm_ops:a,...t.kind==="chain"?{lane_id:t.lane_id,correction:i}:{}})}function Jd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Kr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=ha(n,t);if(r.held)return{refused:hh};let s=r.entries,o=Ds(t),a=[];Zd(o,s,e),o.state.refusal===null&&Qd(o,t,s,a);let i=ya(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ms(s)}}];return i.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Ns(o,t,i,a,{lane_id:e,correction:r})}function ep(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Kr};let r=ha(n,t),s=r.entries,o=Ds(t),a=[];Zd(o,s,e),o.state.refusal===null&&Qd(o,t,s,a);let i=ya(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ms(s)}}];return Ns(o,t,i,a,{lane_id:e,correction:r})}function tp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Kr};let r=ha(n,t),s=r.entries;return Ns(Ds(t),t,ya(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ms(s)}}],[],{lane_id:e,correction:r})}function np(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Kr};let r=Ds(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)Ps(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return Ns(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Xd(t,n,e,n.entries)})}function rp(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let a=1;a<n.entries.length;a+=1){let i=`  ${n.entries[a].bead_id} \u2190 ${n.entries[a-1].bead_id}`;Ps(n,a)?r.push(i):s.push(`${i} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${tl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function sp(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function op(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function rl(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${tl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Ch="\uC0AC\uC774\uD074";function ap(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=el(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:Ch}:{}})}return o.sort((a,i)=>{let l=r!==void 0&&a.root_dir===r,u=r!==void 0&&i.root_dir===r;return l!==u?l?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function ip(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var lp={running:3,paused:2,failed:1};function yr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function cp(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function up(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),yr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!yr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),b=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=lp[u.run_state],b=lp[i];if(d>b||d===b&&(u.started_at??0)>(l??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:l})}return{winners:o,resumed_from_ids:r}}var dp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],qs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function va(e,t){let n=dp.find(s=>s.step===e);if(!n)return null;let r=dp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function pp(e){let t=qs.findIndex(n=>n.step===e);return qs.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function vr(e){let t=qs.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Rh(e){let t=qs.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:qs.length}}function wa(e){let t=Rh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ol=new Set(["queued","running","retry_pending","repairing"]),fp=new Set(["failed","succeeded"]),Oh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Fs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Lh={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Fs.base_containment,child_sweep:Fs.child_sweep,branch_cleanup:Fs.branch_cleanup,parent_close:Fs.parent_close};function Ih(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Ph(e,t,n){return!["verify","deploy"].includes(e.kind)||![...ol,...fp].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Mh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function sl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Oh[s];if(!o)return null;let a=va(n,`${r} ${o}`);return a?{...a,active:ol.has(s),failed:s==="failed"}:null}function Dh(e){return!e||typeof e!="object"?null:Lh[e.step]||null}function js(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Dh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=Ih(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(x=>x&&typeof x=="object"&&Ph(x,t,i)).sort(Mh):[],u=a?l:[],d=u.find(x=>ol.has(x.state));if(d)return sl(d);if(s)return s.step==="repo_operations"&&l[0]?sl(l[0],!0):null;let b=u.find(x=>fp.has(x.state)?x.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(b)return sl(b);if(r){let x=va(r.step,r.label);return x?{...x,active:!0,failed:!1}:null}let k=typeof e.cleanup_cursor=="string"?Fs[e.cleanup_cursor]:null;if(!k)return null;let y=va(k.step,k.label);return y?{...y,active:!0,failed:!1}:null}function ka(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Nh="\uBBF8\uC801\uC7AC";function al(e,t){let n=yo(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function _p(e,t){let n=new Map,r=new Map;for(let s of t)r.has(s.id)||r.set(s.id,s.location_label);for(let[s,o]of e){if(typeof s!="string"||s.length===0)continue;let a=[];for(let i of Array.isArray(o)?o:[])typeof i!="string"||i.length===0||a.push(al(s,{id:i,location_label:r.get(i)||Nh}));a.length>0&&n.set(s,a)}return n}function il(e,t){return`${e}\0${t}`}function mp(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function ll(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function $a(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function gp(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${$a(s)})`,location_label:$a(s),scope:null,same_lane_ahead:!1};let a=ll(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1}}function bp(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=il(i.root_dir,l.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=il(i.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,k=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],y=s.get(u);if(y)for(let x of k){let M=r.get(x);M&&M!==u&&!y.includes(M)&&y.push(M)}}let o=(i,l)=>{let u=new Set,d=[i];for(;d.length>0;){let b=d.pop();if(b===l)return!0;!b||u.has(b)||(u.add(b),d.push(...s.get(b)||[]))}return!1},a=new Map;for(let[i,l]of s){let u=[];for(let d of l){let b=n.get(d);o(d,i)&&b&&u.push(b)}u.length>0&&a.set(i,u)}return a}function hp(e,t){return il(e,t)}var yp=1,Bs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],ul=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Vr={show_blocked:!0,spec:"all"},vp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function qh(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!yr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Fh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!yr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function jh(e,t){let{winners:n,resumed_from_ids:r}=up(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,l=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:yn(e,i.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(i.attempt_id)})}return s}function wp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Lt(e){return e&&typeof e=="object"?e:{}}function Bh(e,t,n){let r=Lt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=k=>cn({pin:k,global:a,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=i(r),u=i(null)}catch{return null}let d=kp(hr(l,o),hr(u,o)),b=kp(nr(l,null),nr(u,null));return d||b?{orchestration:d,worker:b}:null}function kp(e,t){return!e||t&&t.text===e.text?null:e}function Uh(e,t){let n=ll(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function $p(e,t,n){let r=t.get(e);if(!r)return Uh(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return $a(r)}function Wh(e,t,n,r,s,o){let a=[];return e.forEach((i,l)=>{let u=typeof i.id=="string"?i.id:"";if(u.length===0)return;let d=i.status==="confirmed"?"confirmed":"draft",b=Array.isArray(i.entries)?i.entries:[],k=[];b.forEach((y,x)=>{let M=y&&typeof y.bead_id=="string"?y.bead_id:"";if(M.length===0)return;let U=y&&typeof y.root_dir=="string"?y.root_dir:"",V=n.get(M),se=V?V.state:void 0,z=se==="running"||se==="pr_wait"||se==="done",j=!V||se==="runnable",F=V&&V.lane==="parallel"&&typeof V.position=="number"?V.position-1:null,H=k.length>0?k[k.length-1].id:null,I=d==="confirmed"&&H!==null&&!(t.get(M)||[]).includes(H);k.push({id:M,title:s.get(M)||M,root_dir:V?V.root_dir:U,workspace_name:V?V.workspace_name:o.get(U)||"",seq:x+1,location_label:$p(M,n,r),draggable:!z,fixed:z,done:se==="done",unplaced:j,mismatch:I,...F!==null?{queue_index:F}:{}})}),k.forEach((y,x)=>{y.seq=x+1}),a.push({lane_id:u,status:d,draft:d==="draft",number:l+1,label:`\uC5F0\uACB0 ${l+1} \xB7 \uB808\uD3EC \uAC04`,rows:k,all_done:k.length>0&&k.every(y=>y.done),can_confirm:d==="draft"&&k.length>=2,has_mismatch:d==="confirmed"&&k.some(y=>y.mismatch||y.unplaced)})}),a}function zh(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Hh(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,d=o.get(u);if(d){d.cards.push(l);continue}let{scope:b,state:k}=zh(l,t,n);k!==void 0&&(l.scope_state=k),o.set(u,{cards:[l],scope:b})}let a=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let k of l.cards)k.scope_state=u;if(l.scope.length===0)continue;let d=l.cards[0].root_dir,b=a.get(d);b?b.push(l):a.set(d,[l])}let i=(l,u,d)=>{let b=u.cards[0],k={id:b.id,title:b.title,location_label:$p(b.id,r,s),prefixes:d};for(let y of l.cards)y.overlap_chips?y.overlap_chips.push(k):y.overlap_chips=[k]};for(let l of a.values())for(let u=0;u<l.length;u+=1)for(let d=u+1;d<l.length;d+=1){let b=pa(l[u].scope,l[d].scope);b.length!==0&&(i(l[u],l[d],b),i(l[d],l[u],b))}}function cl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function xa(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function dl(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...Vr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&Bs.some(D=>D.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let D of s)D&&typeof D.root_dir=="string"&&u.set(D.root_dir,D);let d=new Map;for(let D of s)D&&typeof D.root_dir=="string"&&d.set(D.root_dir,D.name||D.root_dir);for(let D of r)D&&typeof D.root_dir=="string"&&d.set(D.root_dir,D.name||D.root_dir);let b=[],k=[],y=[],x=[],M=[],U=[],V=new Map,se=new Map,z=new Map,j=new Map,F=new Map,H=new Map,I=new Map,C=new Map;for(let D of r){if(!D||typeof D.root_dir!="string")continue;let ge=D.root_dir,Le=D.name||ge,ze=u.get(ge),He=ze&&typeof ze.revision=="number"?ze.revision:typeof D.revision=="number"?D.revision:0,Be=Lt(D.attempts),Ke=Lt(D.bead_titles);for(let[h,A]of Object.entries(Ke))typeof A=="string"&&A.length>0&&C.set(h,A);let Je=Lt(D.bead_times),it=Lt(D.pr_observations),mt=Lt(D.admission),St=Lt(D.revise_parked),gt=Lt(D.merge_queue_state),X=Lt(D.cleanup_failed),Q=Lt(D.discard_operations),Oe=Lt(D.bead_blocked_by);Object.hasOwn(D,"bead_scope")&&H.set(ge,Lt(D.bead_scope));let qe=Lt(D.bead_workflow),Ce=Lt(D.pr_activity),Pe=Array.isArray(D.repo_operations)?D.repo_operations:[],je=Array.isArray(D.merge_queue)?D.merge_queue:[],at=new Set(je.filter(h=>h&&typeof h.bead_id=="string").map(h=>h.bead_id)),st=new Map(je.filter(h=>h&&typeof h.bead_id=="string").map(h=>[h.bead_id,h])),et=Array.isArray(D.queue)?D.queue:[],vt=(Array.isArray(D.serial_lanes)?D.serial_lanes:[]).filter(h=>h&&/^s[1-5]$/.test(h.id)&&Array.isArray(h.entries)),Pt=Lt(D.lane_states),bt=typeof D.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(D.serial_lane_count))):Math.min(5,vt.length);z.set(ge,bt),j.set(ge,et.length);let Ft=new Map(vt.map(h=>[h.id,h])),wt=new Map;for(let h of vt)for(let A of h.entries)A&&typeof A.bead_id=="string"&&wt.set(A.bead_id,h.id);for(let[h,A]of Object.entries(Oe))Array.isArray(A)&&F.set(h,A.filter(B=>typeof B=="string"&&B.length>0));let Ve=Array.isArray(D.done)?D.done:[];for(let h of Ve)h&&typeof h.bead_id=="string"&&U.push({id:h.bead_id,root_dir:ge,workspace_name:Le});let Me=new Map;for(let h of Ve)h&&typeof h.bead_id=="string"&&typeof h.added_at=="number"&&Me.set(h.bead_id,h.added_at);let L=h=>({id:h,title:Ke[h]||h,root_dir:ge,workspace_name:Le,expected_revision:He,draggable:!1,...Lt(Je[h]).created_at?{created_at:Lt(Je[h]).created_at}:{},...Lt(Je[h]).updated_at?{updated_at:Lt(Je[h]).updated_at}:{}}),Z=h=>Object.hasOwn(Oe,h)?{blocked_by:Array.isArray(Oe[h])?Oe[h].filter(A=>typeof A=="string"&&A.length>0):[]}:{},ue=new Set;for(let[h,A]of jh(Be,Me))ue.add(h),k.push({...L(h),lane:"running",...Z(h),...wt.has(h)?{serial_lane_id:wt.get(h)}:{},attempt_id:A.attempt_id,run_state:A.run_state,status:A.status||void 0,workflow:qe[h]||null,can_pause:A.can_pause,can_resume:A.can_resume,started_at:A.started_at,last_event_at:A.last_event_at,last_activity:A.last_activity,legs:A.legs,runner:A.runner,model:A.model,effort:A.effort,speed:A.speed,resumed_from:A.resumed_from,continuation_mode:A.continuation_mode,usage:A.usage,exec_chips:{orchestration:Ls(A),worker:null},discard:Rn(Q,h,{attempt_id:A.attempt_id}),badges:A.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:A.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:A.run_state==="failed"});for(let[h,A]of cp(Be)){if(k.some(ae=>ae.id===h))continue;let B=A.attempt,re=A.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";k.push({...L(h),lane:"running",kind:"session",...Z(h),attempt_id:typeof B.attempt_id=="string"?B.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:qe[h]||null,can_pause:!1,can_resume:!1,started_at:A.started_at,last_event_at:typeof B.last_event_at=="number"?B.last_event_at:null,last_activity:B.last_activity&&typeof B.last_activity=="object"?B.last_activity:null,legs:Array.isArray(B.legs)?B.legs:[],runner:typeof B.runner=="string"?B.runner:null,model:typeof B.model=="string"?B.model:null,effort:typeof B.effort=="string"?B.effort:null,speed:typeof B.speed=="string"?B.speed:null,resumed_from:null,continuation_mode:null,usage:B.usage&&typeof B.usage=="object"?B.usage:null,exec_chips:{orchestration:Ls(B),worker:null},discard:Rn(Q,h,{merge_queued:!0}),badges:[A.origin==="auto"?`${re} \xB7 \uC790\uB3D9`:re],alert:!1})}for(let h of Array.isArray(D.session_active)?D.session_active:[]){let A=h&&h.bead_id;typeof A!="string"||ue.has(A)||(ue.add(A),Array.isArray(h.blocked_by)&&h.blocked_by.length>0&&F.set(A,h.blocked_by.filter(B=>typeof B=="string"&&B.length>0)),typeof h.title=="string"&&h.title.length>0&&C.set(A,h.title),k.push({...L(A),title:h.title||Ke[A]||A,lane:"running",kind:"session",status:"in_progress",started_at:cl(h.started_at)??cl(h.updated_at)??void 0,updated_at:cl(h.updated_at)??void 0,workflow:h.workflow||null,labels:Array.isArray(h.labels)?h.labels:[],spec_id:typeof h.spec_id=="string"?h.spec_id:"",blocked:h.blocked===!0,...Array.isArray(h.blocked_by)?{blocked_by:h.blocked_by.filter(B=>typeof B=="string"&&B.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(h.session_refs)?h.session_refs:[],badges:[],alert:!1}))}for(let h of Array.isArray(D.pr_wait)?D.pr_wait:[]){let A=h&&h.bead_id;if(typeof A!="string"||ue.has(A))continue;ue.add(A);let B=Lt(it[A]),re=Lt(B.pr),ae=B.gate?Lt(B.gate):null,be=at.has(A),De=st.get(A)?.continuation_action||null,nt=!!De&&De.continuation===null,ot=gt.active===A,Ee=h.external===!0,lt=X[A]||null,Nt=Lt(Ce[A]),Ct=js({bead_id:A,merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,merge_progress:Nt.merge_progress||null,cleanup_failed:lt,repo_operations:Pe}),gn=ka(Ct),Kt=!!ae&&ae.base_badge==="\uCDA9\uB3CC",Ut=!!lt&&["child_sweep","branch_cleanup","parent_close"].includes(lt.step)&&!!ae&&ae.tier==="merged",Gt=Ee&&!!lt&&!!ae&&ae.tier==="merged",zt=!!ae&&["closed_unmerged","review","undecidable"].includes(ae.tier)&&ae.reason!=="review_receipt_undetermined",Et=Rn(Q,A,{external:Ee,merge_active:ot||Ct?.step==="merge",merge_queued:be,cleanup_active:gn,merged:!!lt||ae?.tier==="merged"}),Ye=!!Et.operation;y.push({...L(A),lane:"pr_wait",...Z(A),workflow:qe[A]||null,pr_number:typeof re.number=="number"?re.number:null,pr_url:typeof re.url=="string"?re.url:void 0,external:Ee,usage:yn(Be,A),merge_step:Ct,badges:nt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ct?[ae?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:lt?[vr(lt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${vr(lt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ae?.gate_badge=="string"&&ae.gate_badge.length>0?[ae.gate_badge]:[],alert:Ct?Ct.failed===!0:!!lt||zt,reason:lt&&Ct?.active!==!0?wa(lt.step):"PR \uB300\uAE30",merge_action:ae?.tier==="merged"&&!Ut&&!Gt?!1:!be||nt,merge_enabled:!Ye&&(nt||ae?.enabled===!0||Kt||Ut||Gt),merge_label:nt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Gt||Ut?"\uC815\uB9AC \uC7AC\uAC1C":Kt&&!Ut?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:nt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ye?Et.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Et.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Et.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Gt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ut?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Kt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ae?.enabled===!0?`\uBA38\uC9C0 (${ae.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ae?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:be&&!nt,cancel_enabled:!ot,continuation_mismatch:De?.mismatch||null,discard:Et,discard_action:Et.action,discard_enabled:Et.enabled,discard_title:Et.title})}let E=(h,A,B,re)=>{let ae=h&&h.bead_id;if(typeof ae!="string"||ue.has(ae))return null;ue.add(ae);let be=St[ae],De=Rn(Q,ae),nt=De.operation?De:null,ot={...L(ae),lane:A,workflow:qe[ae]||null,draggable:!nt,discard:nt||void 0,reason:wp(mt,ae),seq:B+1,queue_position:B+1,queue_index:B,queue_length:re,badges:be?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!be,revise_action:!!be,revise_enabled:!!be&&!nt,revise_title:be?be.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${be.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Ee=Z(ae);return Object.hasOwn(Ee,"blocked_by")&&(ot.blocked_by=Ee.blocked_by),ot};for(let h=0;h<et.length;h++){let A=E(et[h],"queue",h,et.length);if(!A)continue;x.push(A);let B=V.get(ge);B?B.push(A):V.set(ge,[A])}let K=h=>{let A=y.find(be=>be.id===h&&be.root_dir===ge);if(A)return{id:h,title:A.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let B=k.find(be=>be.id===h&&be.root_dir===ge),re=B?B.run_state:qh(Be,h),ae=re==="failed"||re==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":re==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:h,title:B?B.title:L(h).title,badge:ae}},pe=[];for(let h=0;h<Math.max(bt,vt.length);h++){let A=`s${h+1}`,B=Ft.get(A),re=B&&Array.isArray(B.entries)?B.entries:[],ae=Lt(Pt[A]),be=Array.isArray(ae.occupied_by)?ae.occupied_by.filter(ot=>typeof ot=="string"):[],De=new Set(be),nt=[];for(let ot=0;ot<re.length;ot++){let Ee=re[ot]&&re[ot].bead_id;if(typeof Ee=="string"&&De.has(Ee)){ue.add(Ee);continue}let lt=E(re[ot],A,ot,re.length);lt&&(nt.push(lt),x.push(lt))}nt.length===0&&be.length===0&&(bt<=1||h>=bt)||pe.push({id:A,index:h,items:nt,raw_length:re.length,occupied_by:be,occupants:be.map(ot=>K(ot)),corrections:Array.isArray(ae.corrections)?ae.corrections.length:0,cycle:ae.cycle===!0,...nt.length===0&&be.length===0?{empty:!0}:{}})}se.set(ge,pe);let S=Array.from({length:bt},(h,A)=>{let B=`s${A+1}`,re=Ft.get(B),ae=re&&Array.isArray(re.entries)?re.entries:[],be=Lt(Pt[B]);return{id:B,index:ae.length,length:ae.length,occupied_by:Array.isArray(be.occupied_by)?be.occupied_by.filter(De=>typeof De=="string"):[]}});for(let h of Array.isArray(D.runnable)?D.runnable:[]){let A=h&&h.bead_id;if(typeof A!="string"||ue.has(A))continue;ue.add(A);let B=h.workflow&&typeof h.workflow=="object"?h.workflow:null,re=B&&typeof B.route=="string"&&B.route||(typeof h.route=="string"?h.route:null),ae=Bh(Lt(ze),h.exec_pins,re);Array.isArray(h.blocked_by)&&h.blocked_by.length>0&&F.set(A,h.blocked_by.filter(be=>typeof be=="string"&&be.length>0)),typeof h.title=="string"&&h.title.length>0&&C.set(A,h.title),Array.isArray(h.scope)&&I.set(A,h.scope.filter(be=>typeof be=="string"&&be.length>0)),b.push({...L(A),title:h.title||Ke[A]||A,lane:"runnable",draggable:!0,reason:wp(mt,A),created_at:h.created_at??void 0,updated_at:h.updated_at??void 0,status:typeof h.status=="string"?h.status:void 0,labels:Array.isArray(h.labels)?h.labels:[],spec_id:typeof h.spec_id=="string"?h.spec_id:"",workflow:B||(re?{route:re,chips:{route:re}}:null),...ae?{exec_chips:ae}:{},blocked:h.blocked===!0,...Array.isArray(h.blocked_by)?{blocked_by:h.blocked_by.filter(be=>typeof be=="string"&&be.length>0)}:{},place_index:et.length,place_lanes:S})}for(let h of Ve){let A=h&&h.bead_id;if(typeof A!="string"||ue.has(A)||(ue.add(A),o!==void 0&&typeof h.added_at=="number"&&h.added_at<o))continue;let B=Fh(Be,A),re=B&&typeof B.done_kind=="string"?B.done_kind:null;M.push({...L(A),lane:"done",done:!0,done_layout:"three_line",usage:yn(Be,A),work_ms:sa(Be,A),done_at:typeof h.added_at=="number"?h.added_at:void 0,done_kind:re,badges:[...re&&vp[re]?[vp[re]]:[],...ra(Be,A)]})}}let J=new Map;s.forEach((D,ge)=>{D&&typeof D.root_dir=="string"&&J.set(D.root_dir,ge)});let we=n&&n.running_sort==="repo"?"repo":"started";k.sort((D,ge)=>{let Le=D.kind==="session",ze=ge.kind==="session";if(Le!==ze)return Le?1:-1;if(Le&&ze){let Ke=xa(ge.updated_at)-xa(D.updated_at);return Ke!==0?Ke:D.id.localeCompare(ge.id)}if(we==="repo"){let Ke=J.get(D.root_dir)??Number.MAX_SAFE_INTEGER,Je=J.get(ge.root_dir)??Number.MAX_SAFE_INTEGER;if(Ke!==Je)return Ke-Je}let He=typeof D.started_at=="number"&&Number.isFinite(D.started_at)?D.started_at:null,Be=typeof ge.started_at=="number"&&Number.isFinite(ge.started_at)?ge.started_at:null;return He!==null&&Be!==null&&He!==Be?He-Be:He===null&&Be!==null?1:He!==null&&Be===null?-1:D.id.localeCompare(ge.id)}),M.sort((D,ge)=>(ge.done_at??0)-(D.done_at??0));let ve=s.length>0?s:r.map(D=>({root_dir:D&&D.root_dir,name:D&&D.name,auto_advance:D&&D.auto_advance,auto_merge:D&&D.auto_merge,slots:D&&D.slots,revision:D&&D.revision,runner_catalog:D&&D.runner_catalog})),W=new Set(b.map(D=>D.root_dir)),te=[];for(let D of ve){if(!D||typeof D.root_dir!="string")continue;let ge=V.get(D.root_dir)||[],Le=se.get(D.root_dir)||[];!(ge.length>0||Le.some(He=>He.items.length>0||He.occupied_by.length>0))&&!W.has(D.root_dir)||te.push({root_dir:D.root_dir,name:D.name||D.root_dir,auto_advance:D.auto_advance===!0,auto_merge:D.auto_merge===!0,slots:typeof D.slots=="number"&&D.slots>=yp?D.slots:yp,revision:typeof D.revision=="number"?D.revision:0,runner_catalog:Lt(D.runner_catalog),items:ge,sublanes:{parallel:ge,serial:Le},serial_lane_count:z.get(D.root_dir)||0,raw_queue_length:j.get(D.root_dir)||0})}let fe={runnable:b,runnable_all:b,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:x,queue_groups:te,running:k,pr_wait:y,done:M,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(j),owner_of:{}},Ae=mp(fe);for(let D of U)Ae.has(D.id)||Ae.set(D.id,{root_dir:D.root_dir,workspace_name:D.workspace_name,lane:"done",state:"done"});for(let D of[...fe.queue,...fe.runnable,...fe.running,...fe.pr_wait]){if(!Object.hasOwn(D,"blocked_by"))continue;let ge=Ae.get(D.id);D.blockers=(D.blocked_by||[]).map(Le=>gp(Le,ge,Ae,s))}for(let D of[...fe.queue,...fe.runnable,...fe.running,...fe.pr_wait]){let ge=(D.blockers||[]).map(ze=>al(D.id,ze));if(ge.length===0)continue;let Le={predecessors:ge};D.dependency_chips=Le}Hh(fe,H,I,Ae,s);let he=bp(fe.queue_groups);for(let D of fe.queue_groups)for(let ge of D.sublanes.serial){let Le=he.get(hp(D.root_dir,ge.id));Le&&(ge.cross_wait_peers=Le)}fe.chain_lanes=Wh(i&&Array.isArray(i.lanes)?i.lanes:[],F,Ae,s,C,d);let le=new Map;for(let D of[...fe.queue,...fe.runnable])le.has(D.id)||le.set(D.id,D);let Se=new Set;for(let D of fe.chain_lanes)for(let ge of D.rows){if(D.status==="confirmed"&&!ge.unplaced&&!ge.fixed&&Se.add(ge.id),!D.draft&&!ge.unplaced)continue;let Le=le.get(ge.id);Le&&(Le.cross_lane_chip={lane_id:D.lane_id,number:D.number,status:D.status,label:D.draft?`\uC5F0\uACB0 ${D.number} (draft)`:`\uC5F0\uACB0 ${D.number}`})}let ye=[];for(let D of V.values())for(let ge of D)Se.has(ge.id)||ye.push(ge);ye.sort((D,ge)=>{let Le=D.workspace_name.localeCompare(ge.workspace_name);return Le!==0?Le:(D.queue_index??0)-(ge.queue_index??0)}),fe.parallel_rows=ye;let G={};for(let[D,ge]of Ae)typeof ge.root_dir=="string"&&ge.root_dir.length>0&&(G[D]=ge.root_dir);for(let D of fe.chain_lanes)for(let ge of D.rows)!Object.hasOwn(G,ge.id)&&ge.root_dir.length>0&&d.has(ge.root_dir)&&(G[ge.id]=ge.root_dir);fe.owner_of=G;let oe=fe.runnable.length;fe.runnable_all=fe.runnable.slice();let ce=fe.runnable;a.show_blocked||(ce=ce.filter(D=>D.blocked!==!0));let $e=ce.length;a.spec==="with"?ce=ce.filter(D=>!!D.spec_id):a.spec==="without"&&(ce=ce.filter(D=>!D.spec_id)),fe.runnable_hidden={blocked:oe-$e,spec:$e-ce.length};let Ge=(D,ge)=>{let Le=xa(ge.updated_at)-xa(D.updated_at);return Le!==0?Le:D.id.localeCompare(ge.id)},Fe=l==="repo_spec"?(D,ge)=>{let Le=D.spec_id?0:1,ze=ge.spec_id?0:1;return Le!==ze?Le-ze:Ge(D,ge)}:Ge;if(l==="updated_flat")fe.runnable=ce.slice().sort(Ge),fe.runnable_sections=[];else{let D=new Map;for(let ze of ce){let He=D.get(ze.root_dir);He?He.push(ze):D.set(ze.root_dir,[ze])}let ge=[],Le=[];for(let ze of ve){if(!ze||typeof ze.root_dir!="string")continue;let He=(D.get(ze.root_dir)||[]).slice().sort(Fe);D.delete(ze.root_dir),He.length!==0&&(ge.push({root_dir:ze.root_dir,name:ze.name||ze.root_dir,items:He.map(Be=>({...Be,workspace_name:""}))}),Le.push(...He))}for(let[ze,He]of D){let Be=He.slice().sort(Fe);ge.push({root_dir:ze,name:Be[0]?.workspace_name||ze,items:Be.map(Ke=>({...Ke,workspace_name:""}))}),Le.push(...Be)}fe.runnable=Le,fe.runnable_sections=ge}return fe}var xp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Ap(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Sp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Rp="bdui.monitor.done-range",Op="bdui.monitor.running_sort",Lp="bdui.monitor.candidate_sort",Ip="beads-ui.monitor.candidate-filter",Pp="beads-ui.monitor.sections";function Gh(){try{let e=window.localStorage.getItem(Ip);if(!e)return{...Vr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Vr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Vr.show_blocked,spec:ul.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Vr}}}function Ep(e){try{window.localStorage.setItem(Ip,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Kh(){try{let e=window.localStorage.getItem(Lp);return Bs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Vh(e){try{window.localStorage.setItem(Lp,e)}catch{}}function Yh(){try{let e=window.localStorage.getItem(Pp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Tp(e){try{window.localStorage.setItem(Pp,JSON.stringify(e))}catch{}}function Zh(){try{let e=window.localStorage.getItem(Rp);return e===null?"today":In(e)}catch{return"today"}}function Xh(e){try{window.localStorage.setItem(Rp,e)}catch{}}function Qh(){try{return window.localStorage.getItem(Op)==="repo"?"repo":"started"}catch{return"started"}}function Jh(e){try{window.localStorage.setItem(Op,e)}catch{}}var Mp="tab:monitor:pipeline",ey=1e3,ty=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Cp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function ny(e){return e>=1&&e<=Cp.length?Cp[e-1]:`(${e})`}function Dp(e,t){let n=It("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),b=t.confirm||(_=>typeof globalThis.confirm!="function"||globalThis.confirm(_)),k=Zh(),y=Qh(),x=Gh(),M=Kh(),U=Yh(),V=null,se=null,z=null,j=null,F=[],H=null;function I(){let _=Cr.find(m=>m.value===k);return _?_.label:""}let C=document.createElement("div");C.className="mon",e.appendChild(C);let J=document.createElement("div");J.className="worker-drawer-overlay",J.hidden=!0;let we=document.createElement("div");we.className="worker-drawer-overlay__backdrop";let ve=document.createElement("div");ve.className="worker-drawer-host mon2-drawer",J.append(we,ve),e.appendChild(J);let W=dl(null,null),te=new Map,fe=new Map,Ae=null,he=null,le=null,Se=Ur(ve,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{V=null,J.hidden=!0,pe()}});async function ye(_,m,p,v,w=!0){if(!o||!p)return null;let P=await o(_,{...m,root_dir:p,expected_revision:v});if(P&&P.conflict&&w){P.queue&&fe.set(p,P.queue);let ee=P.queue&&typeof P.queue.revision=="number"?P.queue.revision:v;P=await o(_,{...m,root_dir:p,expected_revision:ee})}return P&&P.queue&&p&&fe.set(p,P.queue),P}function G(_,m){let p=fe.get(_),v=s&&s.get?s.get():null,w=(Array.isArray(v)?v:[]).find(ee=>ee?.root_dir===_);return(p||w)?.merge_queue?.find(ee=>ee.bead_id===m)?.continuation_action}async function oe(_,m,p,v){let w=await ye(_,m,p,v),P=fe.get(p)?.revision??w?.queue?.revision??v;return jn(w,(ee,Y)=>ye(_,{...m,continuation:ee,decision_token:Y},p,P,!1),{refresh:ee=>ye(_,m,p,ee?.queue?.revision??fe.get(p)?.revision??P,!1)})}async function ce(_,m,p,v){let w=await jn({continuation_mismatch:v},(ee,Y)=>ye("worker-merge-queue-add",{bead_id:m,continuation:ee,decision_token:Y},_,p,!1)),P=w?.queue?.merge_queue?.find(ee=>ee.bead_id===m)?.continuation_action;w?.applied!==!0&&P?.continuation===null&&P.mismatch&&await ce(_,m,w.queue.revision,P.mismatch)}async function $e(_,m,p){let v=await ye("worker-discard",_,m,p);if(v&&v.discarded===!0){de(aa(v),"success",5e3);return}if(v&&v.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${v.reason}`,"error");return}if(v&&v.accepted&&v.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(v&&v.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${v.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}v&&!v.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ge(_,m,p){return!o||!p?null:await o(_,{...m,root_dir:p})}async function _e(){let _=new Map;for(let m of W.pr_wait)_.has(m.root_dir)||_.set(m.root_dir,m.expected_revision);for(let[m,p]of _)await ye("worker-merge-queue-add-all",{},m,p)}function Fe(_){let m=U[_];return!!(m&&m.runnable===!0)}function D(_){let m={...U[_]||{}};m.runnable=!m.runnable,U={...U,[_]:m},Tp(U),pe()}function ge(_){return U[_]===!0}function Le(_){U={...U,[_]:U[_]!==!0},Tp(U),pe()}function ze(_){let m=W.queue_groups.find(p=>p.root_dir===_);if(!m)return null;for(let p=0;p<m.serial_lane_count;p+=1){let v=`s${p+1}`,w=m.sublanes.serial.find(P=>P.id===v);if(!w||w.raw_length===0&&w.occupied_by.length===0)return v}return null}function He(_,m){let p=W.queue_groups.find(w=>w.root_dir===_),v=p?p.sublanes.serial.find(w=>w.id===m):void 0;return v?v.raw_length:0}function Be(_,m){let p=te.get(_),v=te.get(m);if(!p||!v)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let w=Ap(p),P=Ap(v);if(w!==null&&w===P&&p.root_dir===v.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let ee=Sp(p),Y=Sp(v);if(ee&&P!==null){let xe=P;return{kind:"ops",title:`${xe} \uB05D\uC5D0 ${_}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:_,lane:xe,index:He(v.root_dir,xe)}]}}if(w!==null&&Y&&P===null){let xe=w;return{kind:"ops",title:`${xe} \uB05D\uC5D0 ${m}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:p.root_dir,ops:[{bead_id:m,lane:xe,index:He(p.root_dir,xe)}]}}if(ee&&w===null&&Y&&P===null){let xe=ze(p.root_dir);return xe===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${xe} \uB808\uC778\uC5D0 ${m} \u2192 ${_} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:p.root_dir,ops:[{bead_id:m,lane:xe,index:0},{bead_id:_,lane:xe,index:1}]}}return!ee&&!Y?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:ee?{kind:"note",text:`${Os(v.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Os(p.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Ke(_,m){let p=Be(_,m.id);return{id:m.id,title:m.title,location_label:m.location_label,prefixes:m.prefixes,action:p.kind==="note"?{kind:"note",text:p.text}:p.kind==="disabled"?{kind:"disabled",label:xp,title:p.title}:{kind:"place",label:xp,title:p.title}}}function Je(_,m){if(!z||z.bead_id!==_)return null;let p=z.counterpart_id,v=m.filter(w=>w.id===p);return v.length===0?null:{rows:v.map(w=>Ke(_,w))}}function it(_){let m=_.dependency_chips||null,p=_.overlap_chips||[],v=_.scope_state==="missing",w=_.cross_lane_chip;if(!m&&p.length===0&&!v&&!w)return null;let P=Je(_.id,p);return{...m||{},...p.length>0?{overlaps:p}:{},...v?{scope_missing:!0}:{},...w?{cross_lane:{lane_id:w.lane_id,label:w.label}}:{},...P?{popover:P}:{}}}function mt(_){let m=it(_);return m?{..._,dependency_chips:m}:_}async function St(_,m){let p=Be(_,m);if(z=null,p.kind!=="ops"){pe();return}let v=Gt(p.root_dir,p.ops[0].bead_id);for(let w of p.ops){let P=await gt(w,p.root_dir,v);if(P===null)break;v=P}pe()}async function gt(_,m,p){try{let v=await ye("worker-queue-place",_,m,p,!1);if(v&&v.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!v||v.applied!==!0)return de(v&&typeof v.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${v.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let w=v.queue?v.queue.revision:void 0;return typeof w!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):w}catch(v){return de(De(v),"error"),null}}function X(_){let m=Fe(_.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${_.root_dir}
        data-section="runnable"
        aria-expanded=${m?"false":"true"}
        aria-label=${`${_.name} \uC139\uC158 ${m?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${m?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${_.root_dir}>${_.name}</span>
      <span class="mon2-sec__count">${_.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${_.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Q(_,m){return c`<div
      class="mon2-item"
      data-bead-id=${_.id}
      data-drag-kind="candidate"
      data-root-dir=${_.root_dir}
    >
      ${m}
    </div>`}function Oe(_){if(se!==_.id)return null;let m=W.queue_groups.find(P=>P.root_dir===_.root_dir),p=_.place_lanes||[],v=W.cross_lanes_revision!==null,w=[{id:"parallel",label:"\uBCD1\uB82C",count:_.place_index??0}];for(let P of W.chain_lanes)w.push({id:`lane:${P.lane_id}`,label:`\uC5F0\uACB0 ${P.number} (${P.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:P.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!v});w.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!v,title:v?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let P of p)w.push({id:`serial:${P.id}`,label:`\uC9C1\uB82C ${Number(P.id.slice(1))}`,count:P.length,group:`${m?m.name:""} \uC9C1\uB82C`});return{bead_id:_.id,lanes:w}}function qe(){let _=[],m=new Set,p=(v,w)=>{for(let P of v)m.has(P.id)||(m.add(P.id),_.push({bead_id:P.id,root_dir:P.root_dir,workspace_name:P.workspace_name,title:P.title,lane:w}))};return p(W.running,"running"),p(W.pr_wait,"pr_wait"),p(W.queue,"queue"),p(W.runnable_all,"runnable"),_}function Ce(_){if(!j||j.bead_id!==_)return"";let m=Nt(),p=qe(),v=new Map;for(let Y of p)v.set(Y.bead_id,Y);let w=(m.get(_)||[]).filter(Y=>v.has(Y)),P=ip(ap(_,{issues:p,blocked_by_map:m}),j.query),ee=W.owner_of[_];return c`<div
      class="mon-deppanel"
      data-bead-id=${_}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${w.length===0?c`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${w.map(Y=>c`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${Y}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${_}
                data-dep-b=${Y}
                aria-label=${`${Y} \uC5F0\uACB0 \uD574\uC81C`}
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
        ${P.length===0?c`<div class="mon-deppanel__empty">후보 없음</div>`:P.map(Y=>c`<button
                  type="button"
                  class="mon-deppanel__cand${Y.disabled?" is-disabled":""}"
                  data-dep-cand=${Y.bead_id}
                  ?disabled=${Y.disabled}
                  title=${Y.reason||Y.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${Y.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${Y.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${Y.title}</span
                  >${Y.reason?c`<span class="mon-deppanel__cand-reason"
                        >${Y.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${ee===void 0?c`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function Pe(_){return Q(_,c`${Hi(mt(_),Oe(_),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(m,p)=>i(p,_.root_dir):void 0})}${Ce(_.id)}`)}function je(){return W.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${W.runnable.map(_=>Pe(_))}
      </div>`:c`${W.runnable_sections.map(_=>{let m=Fe(_.root_dir);return c`<section
        class="mon2-sec${m?" is-collapsed":""}"
        data-root-dir=${_.root_dir}
        data-section="runnable"
      >
        ${X({root_dir:_.root_dir,name:_.name,count:_.items.length})}
        ${m?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${_.items.map(p=>Pe(p))}
            </div>`}
      </section>`})}`}function at(_,m){return c`<div
      class="mon2-item"
      data-bead-id=${_.id}
      data-drag-kind="parallel"
      data-root-dir=${_.root_dir}
      data-row-index=${m}
      data-queue-index=${String(_.queue_index??0)}
    >
      ${Jn(mt(_))}
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
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${_.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${_.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${_.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
      ${Ce(_.id)}
    </div>`}function st(){let _=ge("parallel");return c`<section
      class="mon2-area mon2-parallel${_?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${_?"false":"true"}
          aria-label=${`\uBCD1\uB82C \uC601\uC5ED ${_?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${_?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${W.parallel_rows.length}</span>
      </header>
      ${_?"":c`<div class="mon2-area__body" data-drop="parallel">
            ${W.parallel_rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:W.parallel_rows.map((m,p)=>at(m,p))}
          </div>`}
    </section>`}function et(_,m,p){return c`<div
      class="mon2-crow${m.fixed?" mon2-crow--fixed":""}"
      draggable=${m.draggable?"true":"false"}
      data-bead-id=${m.id}
      data-drag-kind="chain"
      data-root-dir=${m.root_dir}
      data-lane-id=${_.lane_id}
      data-row-index=${p}
      data-queue-index=${typeof m.queue_index=="number"?String(m.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${ny(m.seq)}</span
      >
      ${m.workspace_name?c`<span class="worker-mini__repo" title=${m.root_dir}
            >${m.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${m.id}</span>
      <span class="mon2-crow__title">${m.title}</span>
      ${m.mismatch?c`<span
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
    </div>`}function vt(_){let m=W.cross_lanes_revision!==null;return c`<div class="mon2-clane" data-lane-id=${_.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${_.label}</span>
        <span class="mon2-clane__count">${_.rows.length}</span>
        <span
          class="mon2-clane__badge mon2-clane__badge--${_.draft?"draft":"confirmed"}"
          >${_.draft?"draft":"\uD655\uC815"}</span
        >
        ${_.all_done?c`<span class="mon2-clane__badge mon2-clane__badge--done"
              >모두 완료</span
            >`:""}
        ${_.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${_.lane_id}
              ?disabled=${!m||!_.can_confirm}
              title=${_.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:_.has_mismatch?c`<button
                type="button"
                class="mon2-clane__reapply"
                data-lane-id=${_.lane_id}
                ?disabled=${!m}
                title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
              >
                재적용
              </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${_.lane_id}
          ?disabled=${!m}
          title=${_.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${_.lane_id}
      >
        ${_.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:_.rows.map((p,v)=>et(_,p,v))}
      </div>
    </div>`}function Pt(_,m,p){return c`<div
      class="mon2-item"
      data-bead-id=${m.id}
      data-drag-kind="repo-serial"
      data-root-dir=${m.root_dir}
      data-lane-id=${_.id}
      data-row-index=${p}
      data-queue-index=${String(m.queue_index??0)}
    >
      ${Jn(mt(m))}
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
      ${Ce(m.id)}
    </div>`}function bt(_){if(_.length===0)return"";let m=_.length-1;return`${_[0].id} \uC810\uC720${m>0?` +${m}`:""}`}function Ft(_){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${_.id}
    >
      ${Jn({id:_.id,title:_.title,lane:"running",draggable:!1,ghost:!0,badges:[_.badge]})}
    </div>`}function wt(_,m){return c`<div
      class="mon2-lane${m.empty?" mon2-lane--empty":""}"
      data-root-dir=${_.root_dir}
      data-lane-length=${String(m.raw_length)}
    >
      ${wn({id:"",lane:m.id,title:`${_.name} \xB7 \uC9C1\uB82C ${m.index+1}`,items:m.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:c`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${_.root_dir}
          data-lane-id=${m.id}
          data-lane-length=${String(m.raw_length)}
        >
          ${m.occupants.map(p=>Ft(p))}
          ${m.items.length>0?m.items.map((p,v)=>Pt(m,p,v)):m.occupants.length>0?"":c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:c`<span
            class="mon2-lane__badge${m.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${m.occupants.length>0?m.occupants.map(p=>`${p.id} \u2014 ${p.badge}`).join(`
`):""}
            >${bt(m.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${_.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${m.empty?c`<div class="mon2-lane__hint">
            ${_.name} 직렬 ${m.index+1} 비어 있음
          </div>`:""}
      ${m.cycle?c`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(m.cross_wait_peers||[]).map(p=>c`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${p.workspace_name}·${p.lane}과 교차 대기
          </div>`)}
    </div>`}function Ve(){let _=ge("serial"),m=W.cross_lanes_revision!==null,p=W.chain_lanes.some(v=>v.draft&&v.rows.length===0);return c`<section
      class="mon2-area mon2-serial${_?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${_?"false":"true"}
          aria-label=${`\uC9C1\uB82C \uC601\uC5ED ${_?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${_?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">직렬 영역</span>
        <button
          type="button"
          class="mon2-newlane"
          ?disabled=${p||!m}
          title=${m?p?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${_?"":c`<div class="mon2-area__body">
            ${W.cross_lanes_unreadable?c`<div class="mon2-clane__unreadable">
                  연결 레인 저장소를 읽을 수 없음
                </div>`:""}
            ${W.chain_lanes.map(v=>vt(v))}
            ${W.queue_groups.map(v=>v.sublanes.serial.map(w=>wt(v,w)))}
          </div>`}
    </section>`}function Me(){return c`<div class="mon2-wait">${st()}${Ve()}</div>`}function L(_){return c`<div class="worker-rungrid">
      ${W.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:W.running.map(m=>Yi({bead_id:m.id,attempt_id:m.attempt_id||"",title:m.title,runner:m.runner??null,model:m.model??null,effort:m.effort??null,speed:m.speed??null,started_at:m.started_at??null,kind:m.kind,...m.kind==="session"?{updated_at:m.updated_at,session_refs:m.session_refs||[]}:{},workflow:m.workflow||null,resumed_from:m.resumed_from??null,continuation_mode:m.continuation_mode??null,paused:m.run_state==="paused",failed:m.run_state==="failed",status:m.status,status_label:m.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:m.can_resume!==!1,can_pause:m.can_pause!==!1,exec_chips:m.exec_chips||null,usage:m.usage||null,discard:m.discard},_,V,{monitor:{repo:m.workspace_name,root_dir:m.root_dir,serial_lane_id:m.serial_lane_id,last_activity:m.last_activity||null,legs:m.legs||[],dependency_chips:it(m)}}))}
    </div>`}function Z(_){let m={runnable:W.runnable,queue:W.queue,running:W.running,pr_wait:W.pr_wait,done:W.done};return c`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${ty.map(p=>{let v=m[p.lane],w=p.lane==="runnable"?W.runnable_flat?v.length>0?je():void 0:W.runnable_sections.length>0?je():void 0:p.lane==="queue"?W.queue_groups.length>0||W.chain_lanes.length>0||W.parallel_rows.length>0?Me():void 0:p.lane==="running"?L(_):v.length>0?c`${v.map(P=>Jn(P))}`:void 0;return wn({id:`monitor-${p.lane}`,lane:p.pane,title:p.lane==="done"?`\uC644\uB8CC\xB7${I()}`:p.title,items:v,empty:p.empty,body:w,live:p.lane==="running"&&v.length>0,controls:p.lane==="runnable"?ue():void 0,header_control:E(p.lane,v.length)})})}
      </div>`}function ue(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${x.show_blocked}
        />
        🔒
        blocked${W.runnable_hidden.blocked>0?` ${W.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ul.map(_=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${x.spec===_.value?" is-active":""}"
              data-spec=${_.value}
              aria-pressed=${x.spec===_.value?"true":"false"}
            >
              ${_.label}
            </button>`)}
        ${W.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${W.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function E(_,m){return _==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${M}
      >
        ${Bs.map(p=>c`<option
              value=${p.value}
              ?selected=${M===p.value}
            >
              ${p.label}
            </option>`)}
      </select>`:_==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${y}
      >
        <option value="started" ?selected=${y==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${y==="repo"}>
          레포순
        </option>
      </select>`:_==="pr_wait"&&m>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:_==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${k}
      >
        ${Cr.map(p=>c`<option value=${p.value} ?selected=${k===p.value}>
              ${p.label}
            </option>`)}
      </select>`:""}function K(_){let m=s&&s.get?s.get():null,p=s&&s.getWorkspacesState?s.getWorkspacesState():[],v=_===void 0?s&&s.crossLanes?s.crossLanes():void 0:_,w={done_since:dr(k,d()),running_sort:y,candidate_filter:x,candidate_sort:M};return v!==void 0&&(w.cross_lanes=v),dl(m,p,w)}function pe(){let _=d();W=K(),te=new Map;for(let m of[...W.runnable,...W.queue,...W.running,...W.pr_wait,...W.done])!m.non_occupying&&!te.has(m.id)&&te.set(m.id,m);Qe(Z(_),C),h()?.render(),S(),A()}function S(){let _=new Map;for(let m of W.queue_groups)_.set(m.root_dir,m.auto_advance);for(let m of Array.from(C.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let p=m.closest(".mon2-item")?.getAttribute("data-root-dir")||"",v=_.get(p);typeof v=="boolean"&&m.setAttribute("title",`${m.textContent||""} \xB7 ${v?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function h(){if(le)return le;let _=C.querySelector(".mon2-deck");return _?(le=Vd(_,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>W.done,rangeLabel:I,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:re,onFocusChange:m=>{H=m,A()}}),le):null}function A(){C.classList.toggle("has-focus",H!==null);for(let _ of Array.from(C.querySelectorAll(".mon2-sec[data-root-dir]")))_.classList.toggle("is-focus",H!==null&&_.getAttribute("data-root-dir")===H);for(let _ of Array.from(C.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let m=te.get(_.getAttribute("data-bead-id")||"");_.classList.toggle("is-focus",H!==null&&!!m&&m.root_dir===H)}for(let _ of Array.from(C.querySelectorAll(".mon2-crow[data-root-dir]")))_.classList.toggle("is-focus",H!==null&&_.getAttribute("data-root-dir")===H)}function B(_,m){let p=a?a():void 0;if(!m||!p||m===p||!l){r(_);return}l(m).then(()=>{r(_)}).catch(v=>{n("workspace switch for %s failed: %o",m,v)})}function re(_){if(!_)return;let m=a?a():void 0,p=()=>{try{u?.gotoView("worker")}catch(v){n("gotoView(worker) failed: %o",v)}};if(!l||m&&m===_){p();return}l(_).then(p).catch(v=>{n("workspace switch for %s failed: %o",_,v),de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function ae(_){fn(_).then(m=>{de(m?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",m?"success":"error",1400)})}function be(_){let m=te.get(_)||null;return{item:m,root_dir:m?m.root_dir:"",revision:m?m.expected_revision:0}}function De(_){if(typeof _=="string"&&_.length>0)return _;if(_&&typeof _=="object"){let m=_;if(typeof m.message=="string"&&m.message.length>0)return m.message;if(typeof m.error=="string"&&m.error.length>0)return m.error;if(m.error&&typeof m.error=="object"&&typeof m.error.message=="string")return m.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function nt(_,m,p){let v=W.owner_of[m];if(typeof v!="string"||v.length===0){de(`${m}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await Ge(_,{a:m,b:p},v),await ot(_,m,p)}catch(w){de(De(w),"error")}pe()}async function ot(_,m,p){if(_!=="dep-add")return;let v=W.chain_lanes.find(w=>w.rows.some(P=>P.id===m));!v||!v.rows.some(w=>w.id===p)||await tt(w=>tp(v.lane_id,w),"",[{type:_,a:m,b:p}])}function Ee(_){return W.runnable.some(m=>m.id===_)||W.parallel_rows.some(m=>m.id===_)?!0:W.queue_groups.some(m=>m.sublanes.serial.some(p=>p.items.some(v=>v.id===_)))}function lt(_){!_||!Ee(_)||(j=j&&j.bead_id===_?null:{bead_id:_,query:""},pe())}function Nt(){let _=new Map,m=s&&s.get?s.get():null,p=v=>Array.isArray(v)?v.filter(w=>typeof w=="string"&&w.length>0):[];for(let v of Array.isArray(m)?m:[]){if(!v||typeof v!="object")continue;let w=v.bead_blocked_by&&typeof v.bead_blocked_by=="object"?v.bead_blocked_by:{};for(let[P,ee]of Object.entries(w))Array.isArray(ee)&&_.set(P,p(ee));for(let P of[...Array.isArray(v.runnable)?v.runnable:[],...Array.isArray(v.session_active)?v.session_active:[]])P&&typeof P.bead_id=="string"&&Array.isArray(P.blocked_by)&&P.blocked_by.length>0&&_.set(P.bead_id,p(P.blocked_by))}return _}function Ct(){let _=new Map,m=new Map,p=s&&s.get?s.get():null,v=w=>Array.isArray(w)?w.filter(P=>typeof P=="string"&&P.length>0):[];for(let w of Array.isArray(p)?p:[]){if(!w||typeof w!="object")continue;let P=w.bead_blocked_by&&typeof w.bead_blocked_by=="object"?w.bead_blocked_by:{};for(let[ee,Y]of Object.entries(P))Array.isArray(Y)&&_.set(ee,v(Y));for(let ee of Array.isArray(w.runnable)?w.runnable:[])ee&&typeof ee.bead_id=="string"&&Array.isArray(ee.blocked_by)&&m.set(ee.bead_id,v(ee.blocked_by))}for(let w of F)for(let P of[_,m]){let ee=P.get(w.a);ee!==void 0&&P.set(w.a,w.type==="dep-remove"?ee.filter(Y=>Y!==w.b):ee.includes(w.b)?ee:[...ee,w.b])}return{snapshot:_,runnable:m}}function gn(){let _=Nt();for(let m of F){let p=(_.get(m.a)||[]).slice();m.type==="dep-remove"?_.set(m.a,p.filter(v=>v!==m.b)):p.includes(m.b)||_.set(m.a,[...p,m.b])}return _}function Kt(_=W,m=Ut()){let p=new Map;for(let ke of Array.isArray(m?.lanes)?m.lanes:[]){let ct=new Map;for(let pt of Array.isArray(ke?.entries)?ke.entries:[])pt&&typeof pt.bead_id=="string"&&ct.set(pt.bead_id,pt.dep_created_by_lane===!0);p.set(typeof ke?.id=="string"?ke.id:"",ct)}let v=new Map,w=new Map,P=new Set,ee=new Set;for(let ke of _.chain_lanes){let ct=p.get(ke.lane_id);v.set(ke.lane_id,{status:ke.status,entries:ke.rows.map((pt,Qt)=>({bead_id:pt.id,root_dir:pt.root_dir,...Qt===0?{}:{dep_created_by_lane:ct?.get(pt.id)===!0}}))});for(let pt of ke.rows)w.set(pt.id,ke.lane_id),pt.fixed&&P.add(pt.id),pt.unplaced||ee.add(pt.id)}let Y=new Map;for(let ke of _.parallel_rows)typeof ke.queue_index=="number"&&Y.set(ke.id,ke.queue_index);for(let ke of _.queue_groups)for(let ct of ke.sublanes.serial)for(let pt of ct.items)typeof pt.queue_index=="number"&&Y.set(pt.id,pt.queue_index);let xe=Ct();return{blocked_by_map:gn(),snapshot_blocked_by:xe.snapshot,runnable_blocked_by:xe.runnable,owner_of:new Map(Object.entries(_.owner_of)),cross_lanes:v,owner_lane_of:w,fixed_members:P,placed_members:ee,parallel_rows:_.parallel_rows.map(ke=>({bead_id:ke.id,root_dir:ke.root_dir,queue_index:ke.queue_index??0})),parallel_raw_length:new Map(Object.entries(_.parallel_raw_length)),queue_index_of:Y}}function Ut(){return(s&&s.crossLanes?s.crossLanes():null)??null}function Gt(_,m){let p=te.get(m);if(p&&p.root_dir===_)return p.expected_revision;let v=W.queue_groups.find(w=>w.root_dir===_);return v?v.revision:0}async function zt(_,m,p){if(_.type==="worker-queue-disarm"){try{let v=await ye(_.type,_.payload,_.root_dir,p.get(_.root_dir)??Gt(_.root_dir,m));v&&v.queue&&typeof v.queue.revision=="number"&&p.set(_.root_dir,v.queue.revision)}catch{}return!0}try{if(_.type==="worker-queue-place"||_.type==="worker-queue-reorder"||_.type==="worker-queue-remove"){let v=await ye(_.type,_.payload,_.root_dir,p.get(_.root_dir)??Gt(_.root_dir,m));return!v||typeof v.applied!="boolean"?(de("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),!1):(v.queue&&typeof v.queue.revision=="number"&&p.set(_.root_dir,v.queue.revision),v.conflict?(de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):v.applied===!1?(de(v.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${v.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0)}return(_.type==="dep-add"||_.type==="dep-remove")&&await Ge(_.type,{a:_.a,b:_.b},_.root_dir),!0}catch(v){return de(De(v),"error"),!1}}function Et(_){(_.type==="dep-add"||_.type==="dep-remove")&&(F=[...F,{type:_.type,a:_.a,b:_.b}])}async function Ye(_,m){if(!o)return{ok:!1};try{let p=await o(_.type,{..._.payload,expected_revision:m});return!p||typeof p.revision!="number"?(de("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:p.revision}}catch(p){let v=p,w=v&&v.code==="conflict"?v.details?.cross_lanes:null;return w&&typeof w.revision=="number"&&Array.isArray(w.lanes)?{ok:!1,conflict:w}:(de(De(p),"error"),{ok:!1})}}async function bn(_,m,p){let v=new Map,w=[],P=_.ops.slice(0,_.lane_op_index),ee=_.ops.slice(_.lane_op_index);for(let xe of P){if(!await zt(xe,p,v))return{done:!0};Et(xe)}let Y=m;for(let xe of _.lane_ops){if(Y===null)return de("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let ke=await Ye(xe,Y);if(!ke.ok)return ke.conflict?{done:!1,conflict:ke.conflict}:{done:!0};Y=ke.revision}for(let xe of ee){if(!await zt(xe,p,v))return{done:!0};Et(xe),xe.type==="dep-add"&&w.push(xe)}for(let xe of sp(w))Y=await rn(xe,Y);return{done:!0}}async function rn(_,m){if(m===null||!o)return m;let p=_.pairs,v=m;for(let w=0;w<2;w+=1){if(p.length===0)return v;try{let P=await o("monitor-lane-provenance",{lane_id:_.lane_id,pairs:p.map(ee=>({bead_id:ee.bead_id,value:!0})),expected_revision:v});return P&&typeof P.revision=="number"?P.revision:v}catch(P){let ee=P,Y=ee&&ee.code==="conflict"?ee.details?.cross_lanes:null;if(!Y||typeof Y.revision!="number"||!Array.isArray(Y.lanes))return v;let xe=Y.lanes.find(ke=>ke&&ke.id===_.lane_id);p=op(Array.isArray(xe?.entries)?xe.entries:[],p),v=Y.revision}}return v}async function tt(_,m,p=[]){F=p;let v=W,w=Ut();for(let P=0;;P+=1){let ee=_(Kt(v,w));if("refused"in ee){de(ee.refused,"error");break}let Y=await bn(ee,v.cross_lanes_revision,m);if(Y.done)break;if(P>=1){de("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}v=K(Y.conflict),w=Y.conflict}F=[],pe()}async function Re(_,m){await tt(p=>nl(_,m,p),_.bead_id)}async function R(_,m){if(_==="create"){await tt(p=>rl(null,p),"");return}if(_==="remove"){let p=rp(m,Kt());if(p!==null&&!b(p))return;await tt(v=>np(m,v),"");return}await tt(p=>_==="confirm"?Jd(m,p):ep(m,p),"")}async function me(_,m){let p=te.get(_);if(!p){pe();return}let v={kind:"candidate",bead_id:_,root_dir:p.root_dir};if(m==="new-lane"){await tt(w=>rl({bead_id:_,root_dir:p.root_dir},w),_);return}if(m.startsWith("lane:")){let w=m.slice(5);if(!W.chain_lanes.find(ee=>ee.lane_id===w)){pe();return}await tt(ee=>nl(v,{kind:"chain",lane_id:w,marker_index:(ee.cross_lanes.get(w)?.entries??[]).length},ee),_);return}if(m.startsWith("serial:")){let w=m.slice(7),P=(p.place_lanes||[]).find(ee=>ee.id===w);await Re(v,{kind:"repo-serial",root_dir:p.root_dir,lane_id:w,index:P?P.index:0});return}await Re(v,{kind:"parallel",marker_index:W.parallel_rows.length})}async function Ie(_,m){let p=W.parallel_rows,v=p.findIndex(ke=>ke.id===_);if(v<0)return;let w=p[v].root_dir,P=[];p.forEach((ke,ct)=>{ke.root_dir===w&&P.push(ct)});let ee=P.indexOf(v),Y=P[ee+m];if(typeof Y!="number")return;let xe=m===-1?Y:P[ee+2]??Math.min(p.length,Y+1);await Re({kind:"parallel",bead_id:_,root_dir:w,queue_index:p[v].queue_index??0},{kind:"parallel",marker_index:xe})}async function dt(_){for(let m of W.chain_lanes){let p=m.rows.find(v=>v.id===_);if(p){await Re({kind:"chain",bead_id:_,root_dir:p.root_dir,lane_id:m.lane_id,...typeof p.queue_index=="number"?{queue_index:p.queue_index}:{}},{kind:"parallel",marker_index:W.parallel_rows.length});return}}}let ht=null,_t=!1,$t=null;function Wt(){$t!==null&&clearTimeout($t),$t=setTimeout(()=>{$t=null,_t=!1},0)}function Vt(_,m){let p=m&&typeof m.closest=="function"?m.closest("[data-row-index]"):null;if(p&&_.contains(p)){let v=Number(p.getAttribute("data-row-index"));return Number.isFinite(v)?v:0}return _.querySelectorAll("[data-row-index]").length}function sn(_){let m=_.target,p=typeof m?.closest=="function"?m.closest("[data-drop]"):null;if(!p||!ht)return null;let v=p.getAttribute("data-drop");if(v==="candidate")return{zone:p,target:{kind:"candidate"}};if(v==="parallel")return{zone:p,target:{kind:"parallel",marker_index:Vt(p,m)}};if(v==="chain")return{zone:p,target:{kind:"chain",lane_id:p.getAttribute("data-lane-id")||"",marker_index:Vt(p,m)}};if(v==="repo-serial"){let w=p.getAttribute("data-root-dir")||"";if(w!==ht.root_dir)return null;let P=typeof m?.closest=="function"?m.closest("[data-queue-index]"):null,ee=P&&p.contains(P)?P.getAttribute("data-queue-index"):p.getAttribute("data-lane-length"),Y=Number(ee);return{zone:p,target:{kind:"repo-serial",root_dir:w,lane_id:p.getAttribute("data-lane-id")||"",index:Number.isFinite(Y)?Y:0}}}return null}function Rt(){for(let _ of Array.from(C.querySelectorAll(".is-drop-over")))_.classList.remove("is-drop-over")}function on(_){let m=_.target,p=typeof m?.closest=="function"?m.closest('[draggable="true"][data-bead-id]'):null,v=p?p.closest("[data-drag-kind]"):null;if(!v)return;let w=v.getAttribute("data-bead-id")||"",P=v.getAttribute("data-drag-kind")||"",ee=v.getAttribute("data-root-dir")||"";if(!w||!P||!ee)return;let Y=v.getAttribute("data-queue-index")||"",xe=Number(Y),ke=v.getAttribute("data-lane-id")||"";ht={kind:P,bead_id:w,root_dir:ee,...Y!==""&&Number.isFinite(xe)?{queue_index:xe}:{},...ke?{lane_id:ke}:{}},_t=!0,se=null,C.classList.add("is-dragging");try{_.dataTransfer?.setData("text/plain",w),_.dataTransfer&&(_.dataTransfer.effectAllowed="move")}catch{}}function dn(_){let m=sn(_);m&&(_.preventDefault(),_.dataTransfer&&(_.dataTransfer.dropEffect="move"),m.zone.classList.add("is-drop-over"))}function Ln(_){let m=_.target;typeof m?.closest=="function"&&m.closest("[data-drop]")?.classList.remove("is-drop-over")}function T(){ht=null,Rt(),C.classList.remove("is-dragging"),Wt()}function O(_){let m=sn(_),p=ht;ht=null,Rt(),C.classList.remove("is-dragging"),!(!m||!p)&&(_.preventDefault(),Re(p,m.target))}function Ne(_){return{runner:_.runner||void 0,model:_.model||void 0,effort:_.effort||void 0,status:_.run_state==="running"?"running":_.run_state,worktree:_.root_dir}}function f(_,m){let{item:p,root_dir:v,revision:w}=be(m),P=p?.attempt_id||"",ee=_.classList;if(ee.contains("mon2-rowops__up")||ee.contains("mon2-rowops__down")){Ie(m,ee.contains("mon2-rowops__up")?-1:1);return}if(ee.contains("mon2-rowops__remove")){ye("worker-queue-remove",{bead_id:m},v,w);return}if(ee.contains("mon2-crow__detach")){dt(m);return}if(ee.contains("mon-dep__btn")){lt(m);return}if(ee.contains("worker-dep__open")){lt(m);return}if(ee.contains("mon-lane__chip")){let Y=_.getAttribute("data-lane-id")||"";C.querySelector(`.mon2-clane[data-lane-id="${Y}"]`)?.scrollIntoView({block:"nearest"});return}if(ee.contains("mon-deppanel__unlink")){let Y=_.getAttribute("data-dep-a")||"",xe=_.getAttribute("data-dep-b")||"";b(`${xe}\uAC00 ${Y}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&nt("dep-remove",Y,xe);return}if(ee.contains("mon-deppanel__cand")){let Y=_.getAttribute("data-dep-cand")||"";j&&Y&&nt("dep-add",j.bead_id,Y);return}if(ee.contains("mon-overlap__chip")){let Y=_.getAttribute("data-overlap-id")||"";z=!!z&&z.bead_id===m&&z.counterpart_id===Y?null:{bead_id:m,counterpart_id:Y},pe();return}if(ee.contains("mon-overlap__place")){St(m,_.getAttribute("data-counterpart-id")||"");return}if(ee.contains("worker-card__place")){se=se===m?null:m,pe();return}if(ee.contains("worker-card__place-cancel")){se=null,pe();return}if(ee.contains("worker-card__place-lane")){let Y=_.getAttribute("data-lane")||"parallel";se=null,me(m,Y);return}if(ee.contains("rtile__session")){if(p&&p.kind==="session"){let Y=(p.session_refs||[]).find(xe=>xe&&xe.current===!0);Y&&(J.hidden=!1,Se.open(Eo(Y,m,"in_progress",v)),pe());return}V=P,P&&p&&(J.hidden=!1,Se.open({attempt_id:P,root_dir:v,meta:Ne(p)})),pe();return}if(ee.contains("rtile__pause")){Ge("worker-attempt-pause",{attempt_id:P},v);return}if(ee.contains("rtile__resume")){Nr().then(Y=>{if(Y!==null)return oe("worker-attempt-resume",{attempt_id:P,...Y!==""?{instructions:Y}:{}},v,w)});return}if(ee.contains("rtile__dismiss")){ye("worker-attempt-dismiss",{attempt_id:P},v,w);return}if(ee.contains("rtile__discard")){if(!b(Rs(m,"unmerged")))return;$e({bead_id:m,...P?{attempt_id:P}:{},..._.dataset.operationId?{operation_id:_.dataset.operationId}:{}},v,w);return}if(ee.contains("worker-mini__merge")){let Y=G(v,m);Y?.mismatch&&Y.continuation===null?ce(v,m,w,Y.mismatch):ye("worker-merge-queue-add",{bead_id:m},v,w);return}if(ee.contains("worker-mini__merge-cancel")){ye("worker-merge-queue-remove",{bead_id:m},v,w);return}if(ee.contains("worker-mini__discard")){let Y=_.dataset.discardMode==="merged"?"merged":"unmerged";if(!b(Rs(m,Y)))return;$e({bead_id:m,..._.dataset.attemptId?{attempt_id:_.dataset.attemptId}:{},..._.dataset.operationId?{operation_id:_.dataset.operationId}:{}},v,w);return}if(ee.contains("worker-mini__revise-fix")){oe("worker-revise-fix",{bead_id:m},v,w);return}ee.contains("worker-mini__revise-approve")&&ye("worker-revise-approve",{bead_id:m},v,w)}function $(_){let m=_t;_t=!1;let p=_.target;if(!p||typeof p.closest!="function"||p.closest("dialog")||p.closest(".worker-drawer-overlay")||p.closest("a"))return;let v=p.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(v){_.preventDefault();let kn=p.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||v.textContent?.trim()||"";kn&&ae(kn);return}let w=p.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(w){_.preventDefault();let Qt=w.getAttribute("data-root-dir")||te.get(p.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||w.getAttribute("title")||"";re(Qt);return}let P=p.closest(".mon2-sec__toggle");if(P){_.preventDefault(),D(P.getAttribute("data-root-dir")||"");return}let ee=p.closest(".mon2-area__toggle");if(ee){_.preventDefault(),Le(ee.getAttribute("data-area")||"parallel");return}if(p.closest(".mon2-newlane")){_.preventDefault(),R("create","");return}let Y=p.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove");if(Y){_.preventDefault();let Qt=Y.getAttribute("data-lane-id")||"";R(Y.classList.contains("mon2-clane__confirm")?"confirm":Y.classList.contains("mon2-clane__reapply")?"reapply":"remove",Qt);return}if(p.closest(".mon-merge-all")){_.preventDefault(),_e();return}let xe=p.closest(".mon-filter__spec");if(xe){_.preventDefault(),x={...x,spec:xe.getAttribute("data-spec")||"all"},Ep(x),pe();return}let ke=p.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!ke)return;let ct=ke.getAttribute("data-bead-id")||"",pt=p.closest("button");if(pt){_.preventDefault(),f(pt,ct);return}ct&&!m&&(_.preventDefault(),B(ct,ke.getAttribute("data-root-dir")||be(ct).root_dir))}function N(_){let m=_.target;if(!m||typeof m.closest!="function")return;let p=m.closest(".mon-filter__blocked");if(p){x={...x,show_blocked:p.checked},Ep(x),pe();return}let v=m.closest(".mon-candidate-sort");if(v){M=Bs.some(ee=>ee.value===v.value)?v.value:"repo_spec",Vh(M),pe();return}let w=m.closest(".mon-running-sort");if(w){y=w.value==="repo"?"repo":"started",Jh(y),pe();return}let P=m.closest(".mon-done-range");P&&(k=In(P.value),Xh(k),pe())}function ne(_){let m=_.target,p=m&&typeof m.closest=="function"?w=>m.closest(w):()=>null,v=!1;z&&!p(".mon-overlap__popover, .mon-overlap__chip")&&(z=null,v=!0),j&&!p(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(j=null,v=!0),v&&pe()}function Te(_){_.key!=="Escape"||!z&&!j||(z=null,j=null,pe())}function rt(_){let m=_.target;!m||typeof m.closest!="function"||!m.closest(".mon-deppanel__search")||!j||(j={...j,query:m.value},pe())}e.addEventListener("click",$),e.addEventListener("change",N),e.addEventListener("input",rt),document.addEventListener("click",ne),document.addEventListener("keydown",Te),e.addEventListener("dragstart",on),e.addEventListener("dragover",dn),e.addEventListener("dragleave",Ln),e.addEventListener("drop",O),e.addEventListener("dragend",T),s&&typeof s.subscribe=="function"&&(Ae=s.subscribe(()=>{try{fe.clear(),pe()}catch{}}));function Xe(){he!==null&&(clearInterval(he),he=null)}function Mt(){$t!==null&&(clearTimeout($t),$t=null)}return{load(){n("load"),pe(),he===null&&(he=setInterval(()=>{try{pe()}catch{}},ey))},pause(){Xe()},clear(){Xe(),Mt(),Ae&&(Ae(),Ae=null),Se.destroy(),J.hidden=!0,le?.destroy(),le=null,e.removeEventListener("click",$),e.removeEventListener("change",N),e.removeEventListener("input",rt),document.removeEventListener("click",ne),document.removeEventListener("keydown",Te),e.removeEventListener("dragstart",on),e.removeEventListener("dragover",dn),e.removeEventListener("dragleave",Ln),e.removeEventListener("drop",O),e.removeEventListener("dragend",T),e.replaceChildren()}}}function Np(e,t,n){let r=It("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(k){return y=>{y.preventDefault();let x=k==="monitor"&&l()==="monitor"?"worker":k;r("click tab %s",x),n.gotoView(x)}}function l(){let k=t.getState();return k.view==="worker"||k.view==="monitor"?k.view:"board"}function u(){let k=l();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${k==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let k=l();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${k==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${k==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function b(){s&&Qe(u(),s),o&&Qe(d(),o)}return b(),a=t.subscribe(()=>b()),{destroy(){a&&(a(),a=null),s&&Qe(c``,s),o&&Qe(c``,o)}}}var qp=["bug","feature","task","epic","chore"];function Fp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var jp=["Critical","High","Medium","Low","Backlog"];function Bp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),b=n.querySelector("#btn-create"),k=n.querySelector(".new-issue__close");function y(){o.replaceChildren();let F=document.createElement("option");F.value="",F.textContent="\u2014 Select \u2014",o.appendChild(F);for(let H of qp){let I=document.createElement("option");I.value=H,I.textContent=Fp(H),o.appendChild(I)}a.replaceChildren();for(let H=0;H<=4;H+=1){let I=document.createElement("option");I.value=String(H);let C=jp[H]||"Medium";I.textContent=`${H} \u2013 ${C}`,a.appendChild(I)}}y();function x(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function M(F){s.disabled=F,o.disabled=F,a.disabled=F,i.disabled=F,l.disabled=F,d.disabled=F,b.disabled=F,b.textContent=F?"Creating\u2026":"Create"}function U(){u.textContent=""}function V(F){u.textContent=F}function se(){try{let F=window.localStorage.getItem("beads-ui.new.type");F?o.value=F:o.value="";let H=window.localStorage.getItem("beads-ui.new.priority");H&&/^\d$/.test(H)?a.value=H:a.value="2"}catch{o.value="",a.value="2"}}function z(){let F=o.value||"",H=a.value||"";F.length>0&&window.localStorage.setItem("beads-ui.new.type",F),H.length>0&&window.localStorage.setItem("beads-ui.new.priority",H)}async function j(){U();let F=String(s.value||"").trim();if(F.length===0){V("Title is required"),s.focus();return}let H=Number(a.value||"2");if(!(H>=0&&H<=4)){V("Priority must be 0..4"),a.focus();return}let I=String(o.value||""),C=String(l.value||""),J={title:F};I.length>0&&(J.type=I),String(H).length>0&&(J.priority=H),C.length>0&&(J.description=C),M(!0);try{await t("create-issue",J)}catch{M(!1),V("Failed to create issue");return}z(),M(!1),x()}return n.addEventListener("cancel",F=>{F.preventDefault(),x()}),k.addEventListener("click",()=>x()),d.addEventListener("click",()=>x()),n.addEventListener("keydown",F=>{F.key==="Enter"&&(F.ctrlKey||F.metaKey)&&(F.preventDefault(),j())}),r.addEventListener("submit",F=>{F.preventDefault(),j()}),{open(){r.reset(),U(),se();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var ry=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function sy(e,t){return Qa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Up(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=sy(r,e);return c`<button
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
  `}function Wp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(r=>c`<span class="settings-dialog__prefix">
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
  `}function zp(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${ry.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var oy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Hp(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(te=>de(te,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,u="",d=null;function b(){if(d)return d;let te=a.querySelector('[data-pane="execution"]');return te?(d=ma(te,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:fe=>t.queueStore?.set?.(fe)}),d):null}function k(){return c`
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
    `}function y(){let te=r.get();return c`
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
        ${te?c`
              ${Up(te,s(),V)}
              ${Wp(te,u,{onDraft:fe=>{u=fe},onAdd:se,onRemove:z})}
              ${zp(te,j)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function x(te){let fe=r.get();if(fe)try{let Ae=await n("display-policy-set",{expected_revision:fe.revision,policy:te(fe)});M(Ae),Ae&&Ae.conflict&&Ae.policy&&(Ae=await n("display-policy-set",{expected_revision:Ae.policy.revision,policy:te(Ae.policy)}),M(Ae)),Ae&&Ae.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function M(te){te&&te.policy&&typeof te.policy=="object"&&r.set(te.policy)}function U(te){x(te)}function V(te){let fe=r.get();if(!fe)return;let Ae=!ay(te,fe);U(he=>iy(te,he,Ae))}function se(){let te=u.trim();te.length!==0&&(u="",U(fe=>fe.hidden_prefixes.includes(te)?{hidden_prefixes:fe.hidden_prefixes}:{hidden_prefixes:[...fe.hidden_prefixes,te]}),F())}function z(te){U(fe=>({hidden_prefixes:fe.hidden_prefixes.filter(Ae=>Ae!==te)}))}function j(te){let fe=r.get();if(!fe)return;let Ae=fe.chips[te]===!1;U(()=>({chips:{[te]:Ae}}))}function F(){Qe(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${oy.map(te=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${te.id}
                  aria-selected=${String(i===te.id)}
                  aria-controls=${`settings-pane-${te.id}`}
                  @click=${()=>H(te.id)}
                >
                  <span class="settings-dialog__glyph">${te.glyph}</span>
                  ${te.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${W}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${k()} ${y()}
          </div>
        </div>
      `,a),b()}function H(te){i=te,F()}let I=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",I),a.addEventListener("cancel",I);let C=te=>{te.target===a&&W()};a.addEventListener("click",C);let J=null;r.subscribe&&(J=r.subscribe(()=>{l&&F()}));let we=null;t.implPresetStore?.subscribe&&(we=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function ve(te="execution"){l||(l=!0,t.onOpenChange?.(!0),i=te,u="",F(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),b()?.load())}function W(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:ve,close:W,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,a.removeEventListener("close",I),a.removeEventListener("cancel",I),a.removeEventListener("click",C),J&&(J(),J=null),we&&(we(),we=null),d?.destroy(),d=null,a.remove()}}}function ay(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function iy(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var ly=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Gp="usage-meter-card",cy="usage-meter-layer",pl=600,uy=["token_expired","relogin_required"];function Kp(e){return String(e).padStart(2,"0")}function dy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Vp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Kp(r.getHours())}:${Kp(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${ly[r.getMonth()]} ${r.getDate()} ${o}`;return`${dy(n,t)} \xB7 ${i}`}function py(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Yp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Zp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Xp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Jp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function fy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Jp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function _y(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let a=fy(o);a&&r.push(a)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?Jp(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function my(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=_y(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function ef(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function gy(e,t){return!e.held||ef(e,t)<=pl?e:{...e,available:!1,windows:[],accounts:[]}}function Qp(e,t){return`${e}:${t}`}function tf(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,l=null;function u(){Qe(c``,e),e.hidden=!0,b()}function d(){if(l===null){let he=e.ownerDocument;l=he.createElement("div"),l.id=cy,l.className="usage-meter__layer",he.body.appendChild(l)}return l}function b(){l!==null&&(Qe(c``,l),l.remove(),l=null)}function k(he){n!==he&&(n===null&&(document.addEventListener("mousedown",x),document.addEventListener("keydown",U),window.addEventListener("resize",M)),n=he)}function y(){n!==null&&(n=null,document.removeEventListener("mousedown",x),document.removeEventListener("keydown",U),window.removeEventListener("resize",M))}function x(he){let le=he.target;le&&(e.contains(le)||l!==null&&l.contains(le))||(y(),W())}function M(){W()}function U(he){he.key==="Escape"&&(y(),W())}function V(he){n===he?y():k(he),W()}function se(){y(),W()}async function z(he,le){if(r.has(he.key))return;let Se=Qp(he.key,le);r.set(he.key,le),a.delete(Se),W();let ye=null;try{ye=await(await fetch(he.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:le})})).json()}catch{ye=null}if(t)return;if(r.delete(he.key),!ye||ye.ok!==!0){let oe=ye&&typeof ye.error=="string"&&ye.error.length>0?ye.error:"network_error";a.set(Se,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${oe}`}),W();return}let G=Array.isArray(ye.warnings)?ye.warnings.filter(oe=>typeof oe=="string"&&oe.length>0):[];G.length>0&&a.set(Se,{kind:"warn",text:G.join(" \xB7 ")}),W(),await Ae()}function j(he,le,Se,ye){let G=Zp(he.pct),ce=`resets ${Vp(he.resetsAt,ye)}${le?` \xB7 ${Se}`:""}`;return c`<span
      class="usage-meter__window ${Yp(G)}"
      style=${`--progress: ${G}%`}
      title=${ce}
    >
      <span class="usage-meter__label">${he.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${G}%</span>
    </span>`}function F(he,le,Se){let ye=ef(le,Se),G=le.available&&(le.held||ye>pl),oe=G?`${Math.floor(ye/60)}\uBD84 \uC804 \uCE21\uC815`:"",ce=le.accounts.filter(Fe=>!Fe.active).length,$e=`usage-meter__group${G?" usage-meter__group--stale":""}`,Ge=c`<span class="usage-meter__provider"
        >${he.label}</span
      >
      ${le.available?le.windows.map(Fe=>j(Fe,G,oe,Se)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ce>0?c`<span class="usage-meter__badge">+${ce}</span>`:""}`;if(le.accounts.length===0)return c`<span
        class=${$e}
        aria-label=${`${he.label} usage`}
        >${Ge}</span
      >`;let _e=n===he.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${$e}`}
      aria-label=${`${he.label} usage`}
      aria-expanded=${_e?"true":"false"}
      aria-controls=${Gp}
      @click=${()=>V(he.key)}
    >
      ${Ge}
    </button>`}function H(he,le){return c`<span class="usage-meter" aria-label="Usage">
      ${he.map(Se=>F(Se.provider,Se.snapshot,le))}
    </span>`}function I(he,le){let Se=Zp(he.pct),ye=Vp(he.resetsAt,le);return c`<span
      class="usage-meter__account-window ${Yp(Se)}"
      style=${`--progress: ${Se}%`}
    >
      <span class="usage-meter__account-key">${he.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Se}%</span>
      <span class="usage-meter__account-reset"
        >${ye.length>0?`\u21BB ${ye}`:""}</span
      >
    </span>`}function C(he,le){return uy.includes(le)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${he.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function J(he,le,Se){let ye=le.status==="ok",G=typeof le.ageSeconds=="number"&&le.ageSeconds>pl,oe=a.get(Qp(he.key,le.number)),ce=r.get(he.key),$e=ce!==void 0,Ge=ce===le.number,_e=["usage-meter__account"];return le.active&&_e.push("usage-meter__account--active"),ye||_e.push("usage-meter__account--unavailable"),G&&_e.push("usage-meter__account--stale"),c`<div class=${_e.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${le.email}
          >${le.alias===null?le.email:le.alias}</span
        >
        ${le.plan===null?"":c`<span class="usage-meter__account-tag">${le.plan}</span>`}
        ${le.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${le.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${py(le.ageSeconds)}</span
            >`}
        ${le.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${$e}
              @click=${()=>{z(he,le.number)}}
            >
              ${Ge?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${ye?c`<div class="usage-meter__account-windows">
            ${le.windows.map(Fe=>I(Fe,Se))}
          </div>`:c`<div class="usage-meter__account-status">
            ${C(he,le.status)}
          </div>`}
      ${oe===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${oe.kind}"
          >
            ${oe.text}
          </div>`}
    </div>`}function we(he,le,Se){let ye=le.accounts.filter(G=>G.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${he.label} · 활성 ${ye} / 전체
        ${le.accounts.length}
      </h2>
      ${le.accounts.map(G=>J(he,G,Se))}
    </section>`}function ve(he,le){return c`<div
      class="usage-meter__card"
      id=${Gp}
      role="dialog"
      aria-label=${`${he.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${we(he.provider,he.snapshot,le)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function W(){let he=Date.now(),le=[];for(let ye of Xp){let G=o.get(ye.key);G&&le.push({provider:ye,snapshot:gy(G,he)})}if(le.length===0){y(),u();return}let Se=le.find(ye=>ye.provider.key===n&&ye.snapshot.accounts.length>0);Se||y(),Qe(H(le,he),e),e.hidden=!1,Se?te(Se,he):b()}function te(he,le){let Se=d(),ye=e.getBoundingClientRect(),G=e.ownerDocument.documentElement.clientWidth;Se.style.setProperty("--usage-meter-anchor-top",`${ye.bottom}px`),Se.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,G-ye.right)}px`),Qe(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${se}
        ></div>
        ${ve(he,le)}`,Se)}async function fe(he){try{let le=await fetch(he.endpoint);return le.ok?my(await le.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Ae(){i+=1;let he=i,le=await Promise.all(Xp.map(async Se=>({provider:Se,read:await fe(Se)})));if(!(t||he!==i)){for(let Se of le){let ye=Se.provider.key;if(Se.read.kind==="ok"){o.set(ye,Se.read.snapshot);continue}if(Se.read.kind==="empty"){o.delete(ye);continue}let G=o.get(ye);G!==void 0&&!G.held&&o.set(ye,{...G,held:!0})}W()}}return u(),Ae(),s=setInterval(()=>{Ae()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),y(),u()}}}function nf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var by="worker-ineligible";function Us(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function rf(e){return Us(e).includes(by)}var hy="session-preferred",yy=["exclusive_machine"];function sf(e,t){if(!Us(e).includes(hy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&yy.includes(n)?n:""}var vy="worker-serial";function fl(e){return Us(e).includes(vy)}function _l(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var wy=new Set(["done","failed","orphaned","stopped","discarded"]),ky={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},$y={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},xy={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function ml(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:xy[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function of(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,u=new Map,d=!1,b=null,k=null,y=null,x=new Set,M=!1,U=0,V=null,se=new Set;function z(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function j(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function F(){return o&&o()||""}async function H(){if(!s)return;let S=++U;M=!0,y=null,x.clear(),Ve();try{let h=await s("worker-parallel-analysis-targets",{root_dir:F()});if(S!==U||!Me)return;let A=Array.isArray(h?.qualified)?h.qualified:[],B=Array.isArray(h?.excluded)?h.excluded:[];y={qualified:A,excluded:B};for(let re of A)re&&typeof re.id=="string"&&x.add(re.id)}catch{S===U&&Me&&(y={qualified:[],excluded:[]},de("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{S===U&&(M=!1,Me&&Ve())}}function I(S){return Array.isArray(S.runs)?S.runs:[]}function C(){let S=z(),h=new Set;for(let A of Object.values(S.attempts||{})){let B=A;B&&typeof B.bead_id=="string"&&!wy.has(B.status)&&h.add(B.bead_id)}for(let A of Array.isArray(S.pr_wait)?S.pr_wait:[])A&&typeof A.bead_id=="string"&&h.add(A.bead_id);for(let A of Object.values(S.discard_operations||{})){let B=A;B&&B.phase!=="done"&&typeof B.bead_id=="string"&&h.add(B.bead_id)}return h}function J(S){return S.filter(h=>we(h)===null)}function we(S){let h=z();for(let A of Array.isArray(h.serial_lanes)?h.serial_lanes:[])if(Array.isArray(A?.entries)&&A.entries.some(B=>B.bead_id===S))return A.id;return(Array.isArray(h.queue)?h.queue:[]).some(A=>A.bead_id===S)?"parallel":null}function ve(S,h){let A=l.get(S);return A||[...h.order]}function W(S){if(S.length<2)return!1;let h=we(S[0]);if(!h||h==="parallel")return!1;let A=z(),B=(Array.isArray(A.serial_lanes)?A.serial_lanes:[]).find(ae=>ae.id===h)?.entries.map(ae=>ae.bead_id);if(!Array.isArray(B))return!1;let re=S.map(ae=>B.indexOf(ae));return re.every(ae=>ae>=0)&&re.every((ae,be)=>be===0||ae>re[be-1])}function te(){let S=z(),h=Array.isArray(S.serial_lanes)?S.serial_lanes:[],A=h.find(B=>Array.isArray(B.entries)&&B.entries.length===0);return A?A.id:h[0]?.id||"s1"}function fe(S){let h=z().bead_titles||{};return typeof h[S]=="string"?h[S]:S}async function Ae(S,h){if(!s||d)return null;d=!0,Ve();try{return await s(S,h)}finally{d=!1,Ve()}}async function he(S){r?.setPending?.(!0);try{let h=await Ae("worker-parallel-analysis-start",{force:S,target_ids:Array.from(x)});h&&h.applied===!1&&h.reason&&(h.reason==="target_not_qualified"&&Array.isArray(h.detail)?de(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${h.detail.join(", ")}`,"error",3200):de(`\uBD84\uC11D \uC2E4\uD328: ${h.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function le(){let S=j().job;!s||!S||await s("worker-parallel-analysis-cancel",{job_id:S.job_id})}async function Se(S){if(!(!s||se.has(S))){se.add(S),Ve();try{let h=await s("worker-parallel-analysis-prompt",{root_dir:F(),run_id:S});if(!Me)return;if(h?.ok===!0&&typeof h.prompt=="string"){V={run_id:S,prompt:h.prompt};return}de(h?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{se.delete(S),Ve()}}}function ye(){V=null,Ve()}async function G(){if(!V)return;let S=await fn(V.prompt);de(S?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",S?"success":"error",1400)}function oe(S,h){a&&a(S,ml(h))}function ce(){return z().runner_catalog}function $e(S){return Object.keys(ce()?.runners?.[S]?.models||{})}function Ge(S){let h=$e(S),A=ce()?.runners?.[S]?.default_model;return typeof A=="string"&&h.includes(A)?A:h[0]||""}function _e(){let S=j().settings,h=b||S.runner||"claude",A=$e(h),B=b?Ge(h):S.model||A[0]||"",re=_l(ce(),h,B),ae=S.effort||"",be=re.includes(ae)?ae:re[0]||"";return{runner:h,model:B,effort:be,models:A,efforts:re}}async function Fe(S){let h=j().settings,A=await Ae("worker-parallel-analysis-settings-update",{expected_revision:h.revision,runner:S.runner,model:S.model,effort:S.effort});(!A||A.applied!==!0)&&(b=null,Ve(),A&&A.reason&&de(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${A.reason}`,"error",2800))}function D(S){b=S,Ve();let h=_e();Fe({runner:S,model:h.model,effort:h.effort})}function ge(S){let h=_e(),A=_l(ce(),h.runner,S);Fe({runner:h.runner,model:S,effort:A.includes(h.effort)?h.effort:A[0]||""})}function Le(S){let h=_e();Fe({runner:h.runner,model:h.model,effort:S})}async function ze(S,h){if(!s||d)return;let A=ve(S,h),B=j();if(A.length<2||!B.last_good){de("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let re=u.get(S)||te(),ae=()=>({snapshot_digest:B.last_good.identity_digest,group_index:S,lane:re,ordered_bead_ids:A,expected_revision:z().revision});d=!0,Ve();try{let be=await s("worker-parallel-analysis-submit",ae());be&&be.queue&&n&&n.set(be.queue),be&&be.applied!==!0&&be.conflict===!0&&(be=await s("worker-parallel-analysis-submit",ae()),be&&be.queue&&n&&n.set(be.queue)),be&&be.applied===!0?(l.delete(S),de(`\uC9C1\uB82C \uB808\uC778 ${re}\uC5D0 ${A.length}\uAC1C \uBC30\uCE58`,"success")):de(`\uC81C\uCD9C \uAC70\uBD80: ${be?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,Ve()}}function He(S,h,A){l.set(S,ve(S,h).filter(B=>B!==A)),Ve()}function Be(S){l.delete(S),Ve()}function Ke(S,h,A,B){let re=[...ve(S,h)],ae=re.indexOf(A),be=ae+B;ae<0||be<0||be>=re.length||(re.splice(be,0,...re.splice(ae,1)),l.set(S,re),Ve())}function Je(){let S=j().settings,h=Object.keys(ce()?.runners||{}),A=_e();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${B=>D(B.target.value)}
        >
          ${h.map(B=>c`<option
                value=${B}
                ?selected=${A.runner===B}
              >
                ${B}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${B=>ge(B.target.value)}
        >
          ${A.models.map(B=>c`<option
                value=${B}
                ?selected=${A.model===B}
              >
                ${B}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${B=>Le(B.target.value)}
        >
          ${A.efforts.map(B=>c`<option
                value=${B}
                ?selected=${A.effort===B}
              >
                ${B}
              </option>`)}
        </select>
      </label>
      ${it(S)}
    </div>`}function it(S){return!St(S)||mt(S)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:S.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${S.runner}/${S.model} · effort
        ${S.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:S.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function mt(S){return S.is_default===!0&&S.compatible===!1}function St(S){return!!(S.runner&&S.model&&S.effort)}function gt(S){return St(S)&&S.compatible!==!1}function X(S){let h=Math.max(0,Math.floor(S/1e3)),A=Math.floor(h/60),B=h%60;return`${A}:${String(B).padStart(2,"0")}`}function Q(S){let h=S.job;if(h){let A=typeof h.started_at=="number"?h.started_at:0,B=`${h.runner||"?"}/${h.model||"?"}`,re=A?` \xB7 \uACBD\uACFC ${X(Date.now()-A)}`:"",ae=typeof h.session_id=="string"?h.session_id:"",be=I(S).find(De=>De.run_id===h.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${B} · effort ${h.effort||"?"}${re}</span
        >
        ${ae?c`<code class="pa-session-id" title=${ae}
              >${ae.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>oe(h.job_id,be||h)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${be?.prompt_saved!==!0||se.has(h.job_id)}
          @click=${()=>{Se(h.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return qe()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Oe(S){let h=Q(S);return h===""?"":c`<div class="pa__strip">${h}</div>`}function qe(){return r?.isPending?.()===!0}function Ce(S){let h=!!S.job,A=gt(S.settings),B=y!==null&&x.size===0,re=h||d||qe()||M;return c`<div class="pa-meta">
      ${S.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(S.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!A||re||B}
        @click=${()=>{he(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!A||re||B}
        @click=${()=>{he(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!h}
        @click=${()=>{le()}}
      >
        취소
      </button>
    </div>`}function Pe(S){return typeof S=="string"&&S.length>0?S:"\uBBF8\uBC30\uCE58"}function je(S,h){h?x.add(S):x.delete(S),Ve()}function at(S){let h=Array.isArray(S.scope)?S.scope:[],A=Array.isArray(S.overlaps)?S.overlaps:[];return h.length===0&&A.length===0?c``:c`<span class="pa-target__signals">
      ${h.length>0?c`<details class="pa-target__scope" title=${h.join(`
`)}>
            <summary>scope ${h.length}</summary>
            <ul>
              ${h.map(B=>c`<li><code>${B}</code></li>`)}
            </ul>
          </details>`:""}
      ${A.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${A.join(", ")}`}
            >겹침 ${A.join(", ")}</span
          >`:""}
    </span>`}function st(){let S=y?.qualified||[],h=y?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${M?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${S.length} \xB7 \uC81C\uC678 ${h.length}`}</span
        >
      </header>
      ${y&&S.length>0?c`<ul class="pa-targets__list">
            ${S.map(A=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${A.id}
                      .checked=${x.has(A.id)}
                      @change=${B=>je(A.id,B.target.checked)}
                    />
                    <span class="pa-target__title">${A.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${at(A)}
                    <span class="pa-target__route">${A.route}</span>
                    <span class="pa-target__lane"
                      >${Pe(A.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:y&&S.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${y&&h.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${h.length}</summary>
            <ul class="pa-targets__list">
              ${h.map(A=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${A.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${ky[A.reason]||A.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${Pe(A.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function et(S){let h=typeof S.session_id=="string"&&S.session_id.length>0,A=h?S.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${S.outcome}"
        >${$y[S.outcome]||S.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(S.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${S.runner||"?"} / ${S.model||"?"} / ${S.effort||"?"}</span
      >
      ${h?c`<code class="pa-session-id" title=${A}
            >${A.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${S.outcome==="failure"&&S.reason?c`<span class="pa-run-row__reason">${S.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>oe(S.run_id,S)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${S.prompt_saved!==!0||se.has(S.run_id)}
          @click=${()=>{Se(S.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function vt(S){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${S.length>0?c`<ul class="pa-runs__list">
            ${S.map(h=>et(h))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Pt(){return V?c`<div
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
            <code>${V.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{G()}}>
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
${V.prompt}</pre
        >
      </section>
    </div>`:""}function bt(S,h){let A=ve(S,h),B=C(),re=A.filter(Ee=>B.has(Ee)),ae=J(A),be=W(A),De=Array.isArray(z().serial_lanes)?z().serial_lanes:[],nt=u.get(S)||te(),ot=h.eligible!==!0||A.length<2||re.length>0||ae.length>0||be||d;return c`<section class="pa-group" data-group-index=${String(S)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${h.confidence}</span>
        ${h.categories.map(Ee=>c`<span class="pa-group__category">${Ee}</span>`)}
        ${be?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${h.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${ae.length>0?c`<span class="pa-group__stale"
              >stale — ${ae.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${h.reason}</p>
      <ol class="pa-group__members">
        ${A.map((Ee,lt)=>c`<li class="pa-member" data-bead-id=${Ee}>
              <span class="pa-member__seq">${lt+1}</span>
              <span class="pa-member__title">${fe(Ee)}</span>
              ${B.has(Ee)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ee}
                ?disabled=${lt===0}
                aria-label=${`${Ee} \uC704\uB85C`}
                @click=${()=>Ke(S,h,Ee,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ee}
                ?disabled=${lt===A.length-1}
                aria-label=${`${Ee} \uC544\uB798\uB85C`}
                @click=${()=>Ke(S,h,Ee,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ee}
                aria-label=${`${Ee} \uC81C\uC678`}
                @click=${()=>He(S,h,Ee)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${h.evidence.map(Ee=>c`<li class="pa-evidence">
              <code>${Ee.path}</code>
              <span class="pa-evidence__locator">${Ee.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Be(S)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ee=>{u.set(S,Ee.target.value),Ve()}}
          >
            ${De.map((Ee,lt)=>c`<option
                  value=${Ee.id}
                  ?selected=${nt===Ee.id}
                >
                  직렬 ${lt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${ot}
          @click=${()=>{ze(S,h)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Ft(S){let h=Array.isArray(S.issues)?S.issues:[],A=h.filter(re=>re.verdict==="parallel_ok").length,B=h.filter(re=>re.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${A}</span>
      <span>uncertain ${B}</span>
    </div>`}function wt(){let S=Me&&!!j().job;if(S&&k===null){k=setInterval(()=>Ve(),1e3);return}!S&&k!==null&&(clearInterval(k),k=null)}function Ve(){let S=j();b&&S.settings.runner===b&&(b=null);let h=S.last_good?.result;wt(),Qe(c`
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
          ${Oe(S)}
          <div class="pa__body">
            ${Je()} ${Ce(S)} ${st()}
            ${h?c`${h.groups.map((A,B)=>bt(B,A))}
                ${h.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Ft(h)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${vt(I(S))}
          </div>
        </div>
        ${Pt()}
      `,i)}let Me=!1,L=()=>{Me=!1,V=null,U+=1,wt()},Z=S=>{S.target===S.currentTarget&&pe()};i.addEventListener("close",L),i.addEventListener("cancel",L),i.addEventListener("click",Z);let ue=null;n&&n.subscribe&&(ue=n.subscribe(()=>{Me&&Ve()}));let E=null;r&&r.subscribe&&(E=r.subscribe(()=>{Me&&Ve()}));function K(){Me||(Me=!0,Ve(),H(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function pe(){Me&&(Me=!1,V=null,U+=1,wt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:K,close:pe,destroy(){Me=!1,k!==null&&(clearInterval(k),k=null),i.removeEventListener("close",L),i.removeEventListener("cancel",L),i.removeEventListener("click",Z),ue&&(ue(),ue=null),E&&(E(),E=null),i.remove()}}}var af=new Set(["sh","bash","zsh","dash","ksh"]),lf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function cf(e){let t=e.split("/");return t[t.length-1]||""}function Ay(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=cf(n[0]);if(r!=="env")return af.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&af.has(cf(s))}function Sy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Ey(e){let t=[],n=0;lf.lastIndex=0;for(let r of e.matchAll(lf)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Sy(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Ty(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function uf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",l=0,u=null,d=!1;function b(F,H){return H?Ey(F).map(I=>I.kind==="plain"?I.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${I.kind}"
            >${I.text}</span
          >`):F}function k(){if(!s)return c``;let F=o==="ready"&&Ay(a),H=o==="ready"?a.split(`
`):[];return c`<div
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
              @click=${()=>{x()}}
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
          ${o==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${H.map((I,C)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${C+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${b(I,F)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function y(){Qe(k(),r)}async function x(){if(o!=="ready")return;let F=await fn(a);de(F?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",F?"success":"error")}function M(F){F.key==="Escape"&&s&&(F.preventDefault(),z())}function U(){d||(document.addEventListener("keydown",M),d=!0)}function V(){d&&(document.removeEventListener("keydown",M),d=!1)}async function se(F,H=null){let I=++l;U(),s={...F},u=H||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",y(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let J=t?t():"";if(!J){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",y();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",y();return}let we="/api/repo-ops-script?workspace="+encodeURIComponent(J)+"&lane="+encodeURIComponent(F.lane)+"&base_sha="+encodeURIComponent(F.base_sha);try{let ve=await n(we),W=await ve.json().catch(()=>({}));if(I!==l)return;if((t?t():"")!==J){z();return}if(!ve.ok||!W||W.ok!==!0){o="error",i=Ty(W&&typeof W.error=="string"?W.error:""),y();return}s={lane:W.lane,base_sha:W.base_sha,path:W.path,base_ref:W.base_ref},a=String(W.content),o="ready",y()}catch{if(I!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",y()}}function z(){l+=1,V(),s=null,a="",y();let F=u;u=null,F?.isConnected&&F.focus()}function j(){z(),r.remove()}return{open:se,close:z,destroy:j}}function df(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let I=o();return typeof I.revision=="number"?I.revision:0}function i(I){t&&I&&I.queue&&typeof I.queue=="object"&&t.set(I.queue)}function l(){let I=o().workspace_info;return I&&typeof I=="object"?I:{}}function u(I,C){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${I}"
      >${C}</span
    >`}function d(I){if(typeof I!="number"||!Number.isFinite(I))return"";let C=I/6e4;return Number.isInteger(C)?`timeout ${C}\uBD84`:`timeout ${Math.round(I/1e3)}\uCD08`}function b(I){let C=d(I);return C?u("config",C):""}function k(I,C,J){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${J.script}
      @click=${we=>{s&&s({lane:I,base_sha:C.base_sha,path:J.script,base_ref:C.base_ref},we.currentTarget)}}
    ></button>`}function y(){let I=o().repo_ops_opt_out;return{verify:I?.verify===!0,deploy:I?.deploy===!0}}function x(I,C){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!C}
        @change=${J=>{se(I,!J.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function M(I){let C=typeof I.base_sha=="string"?I.base_sha:"",J=`${I.source_path||"repo-ops/config.toml"} @ ${I.base_ref||"?"}${C?`@${C.slice(0,7)}`:""}`,we=y(),ve=!!I.verify&&we.verify,W=!!I.deploy&&we.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${J}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ve?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${I.verify?c`${k("verify",I,I.verify)}
              ${b(I.verify.timeout_ms)}
              ${ve?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ve?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":I.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${I.verify?x("verify",we.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${W?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${I.deploy?c`${k("deploy",I,I.deploy)}
              ${b(I.deploy.timeout_ms)}
              ${W?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${W?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":I.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${I.deploy?x("deploy",we.deploy):""}
      </div>
    </section>`}function U(I){let C=I.repo_ops&&typeof I.repo_ops=="object"?I.repo_ops:null;return C&&(C.status==="resolved"||C.status==="absent")?M(C):C&&(C.status==="pending"||C.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${C.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${C.error_code?c` — <code>${C.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function V(I){if(!n)return;let C=await n("worker-auto-repair-toggle",{on:I,expected_revision:a()});if(i(C),C&&C.conflict){let J=await n("worker-auto-repair-toggle",{on:I,expected_revision:a()});i(J)}r()}async function se(I,C){if(!n)return;let J=await n("worker-repo-ops-opt-out-toggle",{kind:I,opted_out:C,expected_revision:a()});if(i(J),J&&J.conflict){let we=await n("worker-repo-ops-opt-out-toggle",{kind:I,opted_out:C,expected_revision:a()});i(we)}r()}let z={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function j(I,C,J){return c`<div class="worker-repo-ops__policy-group" data-policy=${J}>
      <div class="worker-repo-ops__policy-label">${I}</div>
      <ul class="worker-repo-ops__policy-list">
        ${C.map(we=>c`<li data-token=${we}>
              ${z[we]||we}
            </li>`)}
      </ul>
    </div>`}function F(I){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${I.map(C=>{let J=[z[C.trigger]||C.trigger];return Number.isInteger(C.attempts_per_operation_attempt)?J.push(`operation\uB2F9 ${C.attempts_per_operation_attempt}\uD68C`):Number.isInteger(C.attempts)?J.push(`${z[C.budget]||C.budget} ${C.attempts}\uD68C`):Number.isInteger(C.sessions_per_user_action)&&J.push(`${C.sessions_per_user_action}\uD68C`,z[C.user_actions]||C.user_actions),C.applies_when&&J.push(z[C.applies_when]||C.applies_when),c`<li data-token=${C.id}>
            <strong>${z[C.id]||C.id}</strong>
            <span>${J.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function H(){let I=o(),C=I.auto_repair!==!1,J=I.repo_operation_policy&&typeof I.repo_operation_policy=="object"?I.repo_operation_policy:null,we=Array.isArray(I.repo_operations)?I.repo_operations:[],ve=we.find(Ae=>Ae.state==="repairing"),W=we.filter(Ae=>Ae.state==="failed"||Ae.state==="repairing"),te=W.length?Math.min(...W.map(Ae=>typeof Ae.repair?.remaining=="number"?Ae.repair.remaining:0)):J?.auto_repair?.resolution_ladder?.find(Ae=>Ae.id==="auto_repair_session")?.attempts??1,fe=Array.isArray(J?.auto_repair?.resolution_ladder)?J.auto_repair.resolution_ladder:[];return c`<section
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
          .checked=${C}
          @change=${Ae=>{V(Ae.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${C?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${te}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${ve?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${ve.repair?.owner_bead||ve.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${J?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(J.worker_automatic||[]).length} · 해결 사다리
                ${fe.length} · 금지
                ${(J.never_automatic||[]).length}</span
              >
            </summary>
            ${j("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",J.worker_automatic||[],"worker-automatic")}
            ${J.supported===!1||J.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${J.schema_version})`}
                </div>`:F(fe)}
            ${j("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",J.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${U(l())} ${H()}
      </details>`}}}var mf=20,Cy=5,Ry=new Set(["failed","repairing","running","queued","retry_pending"]),pf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},ff={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Oy(e,t,n=mf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Ly(e){if(e.type==="cleanup")return!0;let t=e.operation;return Ry.has(t.state)&&!t.dismissed&&!t.superseded_by}function Iy(e,t,n={}){let r=Oy(e,t,1/0),s=n.expanded===!0?mf:Cy,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||Ly(i));return{visible:a,hidden:r.length-a.length}}function _f(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Py(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function gf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function bf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function My(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(ff,r)?ff[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${n}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function Dy(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Yt(e.at):""}
      >${oa(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${_f(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(pf,t.kind)?pf[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${na(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Cs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${_f(e)}"
          >${Py(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?bf(qd(t.failure_kind,r)):""}
      ${My(t)}
      ${gf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${na(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Ny(e){let t=e.cleanup,n=vr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Yt(e.at):""}
      >${oa(e.at)||"\u2014"}</span
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
        ${pp(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${bf(fa(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?c`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${gf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function qy(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?c`<div class="worker-repo-drawer__empty">기록 없음</div>`:c`<ul class="worker-rail">
          ${e.events.map(r=>r.type==="cleanup"?Ny(r):Dy(r))}
        </ul>`}
    ${t>0||n?c`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${n?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function hf(e,t={}){let n=null;function r(){if(n===null){Qe(c``,e);return}let a=Iy(n.operations,n.cleanup_failures,{expanded:n.expanded});Qe(qy({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var Fy=It("views:worker"),jy="tab:worker:ready",By="tab:worker:blocked",Uy="tab:worker:in-progress",Wy="tab:worker:resolved",zy="tab:worker:closed",Aa=1,yf=5;function vf(e){return Uo(e).path.length>0}var Hy=new Set(["quick_fix","spec_backed","full_plan"]);function wf(e){return typeof e=="string"&&Hy.has(e)}var Af="beads-ui.worker.candidate-filter",gl={show_blocked:!1,spec:"all"};function Gy(){try{let e=window.localStorage.getItem(Af);if(!e)return{...gl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...gl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...gl}}}function Ky(e){try{window.localStorage.setItem(Af,JSON.stringify(e))}catch{}}function Vy(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=n(i),u=r(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Yy=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Sf="bdui.worker.candidate_sort",Ef=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],hl="spec";function Tf(e){return Ef.some(t=>t.value===e)?e:hl}function Zy(){try{return Tf(window.localStorage.getItem(Sf))}catch{return hl}}function Xy(e){try{window.localStorage.setItem(Sf,e)}catch{}}var Cf="bdui.worker.done-range";function Qy(){try{let e=window.localStorage.getItem(Cf);return e===null?"today":In(e)}catch{return"today"}}function Jy(e){try{window.localStorage.setItem(Cf,e)}catch{}}var ev="(max-width: 640px)",Rf="beads-ui.worker.lane-collapsed",Ws={queue:!0,done:!0};function tv(){try{let e=window.localStorage.getItem(Rf);if(!e)return{...Ws};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ws}:{queue:typeof t.queue=="boolean"?t.queue:Ws.queue,done:typeof t.done=="boolean"?t.done:Ws.done}}catch{return{...Ws}}}function nv(e){try{window.localStorage.setItem(Rf,JSON.stringify(e))}catch{}}function kf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function rv(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(fr):t==="updated"?r.sort(uo):(r.sort(po(n)),t==="board"?r:[...r.filter(vf),...r.filter(s=>!vf(s))])}function sv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function ov(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var av="\u{1F512} blocked";function $f(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function iv(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function lv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function cv(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function uv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function dv(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function bl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var pv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),fv=new Set(["waiting_metadata","reviewing","retrying"]);function _v(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?Yt(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function mv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function gv(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=mv(e.terminal_reason);l&&i.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!pv.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function xf(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function bv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(xf(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${xf(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=iv(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${$f(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${$f(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function hv(e,t,n,r,s=null,o=null,a=null,i=!1,l=null,u=!0,d=null,b=null,k=null,y={},x=!1,M=!1,U={},V=null){let se=!!l&&l.position>0,z=!!l?.continuation_action&&l.continuation_action.continuation===null,j=!!l&&l.active===!0,F=l&&l.failure||null,H=cv(l?l.waiting:null,k),I=n[e]||null,C=I&&I.gate?I.gate:null,J=I&&I.pr?I.pr:null,we=uv(l?l.resolution:null),ve=dv(l?l.head_review:null),W=l&&l.head_review||null,te=_v(k,W),fe=gv(k,te),Ae=l&&l.authority||null,he=!!W&&["pending","reviewing","revising"].includes(W.state),le=!!k&&typeof k=="object"&&fv.has(k.phase),Se=se&&!j&&(W?.state==="failed"||!Ae||le||Ae.source==="automatic"&&!M),ye=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":we?we.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":H,G=!!C&&C.base_badge==="\uCDA9\uB3CC",oe=!!C&&C.enabled===!0,ce=js({bead_id:e,merge_sha:U.merge_sha,cleanup_cursor:U.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:U.repo_operations}),$e=ka(ce),Ge=o&&!ce&&(o.queueing??null)?o.queueing:null,_e=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!C&&C.tier==="merged",Fe=i&&!!r&&!!C&&C.tier==="merged",D=Se&&(oe||G||C?.reason==="base_behind"||C?.reason==="review_receipt_missing"||C?.reason==="review_receipt_stale"||C?.reason==="review_receipt_undetermined"||_e||Fe),ge=i&&G&&u===!1,Le=Rn(y,e,{external:i,merge_active:j||ce?.step==="merge",merge_queued:se,conflict_active:!!a,cleanup_active:$e,merged:!!r||C?.tier==="merged"}),ze=!!Le.operation,He=!_e&&!!r&&r.step==="repo_operations",Be=bv({continuation_required:z,queueing:Ge,merge_step:ce,conflict_badge:ye,conflict_live:we?.live===!0||a==="running",head_review:W&&ve?{...ve,state:W.state,failure_reason:W.failure_reason}:null,auto_resolution:te,recovery:fe,cleanup_failed:r,cleanup_label:r?vr(r.step):null,base_exception:b,conflicting:G,gate:C,receipt_check:I&&I.receipt_check?I.receipt_check:null,queue_failure:F,auto_skip:d,queued:se,queue_active:j,queue_position:l?l.position:0,activity:ye?null:o&&o.activity||null}),Ke=Be?.live===!0&&Be.title?c`<span title=${Be.title}>${Be.label}</span>`:Be?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ce?.active!==!0?wa(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:x,...V?{dependency_chips:V}:{},external:i,pr_number:J&&typeof J.number=="number"?J.number:null,pr_url:J&&typeof J.url=="string"?J.url:"",completion_badge:Be?.live!==!0&&Be?.title?Be.label:null,completion_title:Be?.title||"",completion_repair_pr_url:fe?fe.repair_pr_url:"",completion_repair_pr_number:fe?fe.repair_pr_number:null,badges:Ke?[Ke]:[],live_badge:Be?.live===!0?Ke:null,usage:s,alert:Be?.alert===!0,merge_action:C?.tier==="merged"&&!_e&&!Fe||He?!1:!se||z||Se,timeline_action:He,cancel_action:se&&!z,cancel_enabled:(!j||he)&&!(fe&&fe.lock_actions),cancel_title:fe&&fe.lock_actions?`${fe.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:j&&!he?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":he?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Le,discard_action:Le.action,merge_step:ce,discard_enabled:Le.enabled,discard_title:Le.title,merge_enabled:!ce&&!Ge&&!a&&!ze&&!b&&!(fe&&fe.lock_actions)&&!ge&&!He&&(oe||G||C?.reason==="base_behind"||C?.reason==="review_receipt_missing"||C?.reason==="review_receipt_stale"||C?.reason==="review_receipt_undetermined"||_e||Fe||D||le&&!j),merge_label:z?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":_e||Fe?"\uC815\uB9AC \uC7AC\uAC1C":G&&!ce&&!_e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":C?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":C?.reason==="review_receipt_missing"||C?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Se?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ze?Le.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Le.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Le.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:z?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ge?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ce?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ce.label}`:Fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ge?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":_e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":G?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":C?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":C?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":C?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":C?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":C?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":oe?`\uBA38\uC9C0 (${C.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:C&&C.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${C&&C.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function yl(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,openDoc:d,doneRange:b,onDoneRangeChange:k}=t,y=r?_o(r,i):null,x=ho({transport:n,uiOrderStore:i}),M=null,U=[],V=Gy(),se=null,z=null,j={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},F=Zy(),H=b?In(b):Qy(),I=new Map;function C(){let f=Cr.find($=>$.value===H);return f?f.label:"\uC624\uB298"}let J=tv(),we=!1,ve=new Set,W=new Set,te=new Set,fe=new Set,Ae=new Set,he={},le=null,Se=0,ye=null,G=[];function oe(f){return le===f?he:{}}async function ce(){if(!n)return;let f=u?.()||"";if(le===f||ye&&ye.key===f&&ye.generation===Se)return;let $=++Se;ye={key:f,generation:$};let N=null;try{N=await Promise.resolve(n("get-session-defaults",{}))}catch(ne){if($!==Se)return;ye=null,Fy("get-session-defaults failed: %o",ne),Ye();return}$===Se&&(he=N&&typeof N.values=="object"&&N.values!==null?{...N.values}:{},le=f,ye=null,Ye())}function $e(){le=null,Se+=1,ce()}let Ge=document.createElement("div");Ge.className="worker-console";let _e=document.createElement("div");_e.className="worker-top";let Fe=document.createElement("div");Fe.className="worker-drawer-overlay",Fe.hidden=!0;let D=document.createElement("div");D.className="worker-drawer-overlay__backdrop";let ge=document.createElement("div");ge.className="worker-drawer-host";let Le=document.createElement("div");Le.className="worker-drawer-host",Le.hidden=!0,Fe.append(D,ge,Le);let ze=document.createElement("div");ze.className="worker-lanes-host",Ge.append(_e,Fe,ze),e.appendChild(Ge);let He=null,Be=null,Ke=Ur(ge,{transport:n,sessionLogStore:a,onClose:()=>{He=null,Be=null,Fe.hidden=!0,Ye()}}),Je=hf(Le,{onClose:()=>{Le.hidden=!0,Fe.hidden=!0,Ye()}}),it=uf({getWorkspacePath:u||(()=>"")}),mt=u&&u()||"",St=df({queueStore:s,transport:n,onChanged:()=>Ye(),onOpenScript:(f,$)=>{it.open(f,$)}}),gt=o?of(Ge,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(f,$)=>dn(f,$)}):null;function X(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Aa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Q(){let f=X(),$=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,N=Array.isArray(f.serial_lanes)?f.serial_lanes:[],ne=[];for(let rt of N){if(ne.length>=$)break;!rt||typeof rt.id!="string"||!/^s[1-5]$/.test(rt.id)||!Array.isArray(rt.entries)||ne.push({id:rt.id,label:`\uC9C1\uB82C ${rt.id.slice(1)}`,count:rt.entries.length})}return ne.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},...ne]}function Oe(f){if(!se||!f.some(N=>N.id===se))return null;let $=Q();return $?{bead_id:se,lanes:$}:null}function qe(){let f=X();return typeof f.revision=="number"?f.revision:0}function Ce(f){f&&f.queue&&s&&s.set(f.queue)}function Pe(){let f=X().queue;return Array.isArray(f)?f.length:0}async function je(f,$,N){if(!n)return;let ne=()=>({bead_id:f,...$==="parallel"?{}:{lane:$},...N===void 0?{}:{index:N},expected_revision:qe()}),Te=await n("worker-queue-place",ne());Ce(Te),Te&&Te.conflict&&await n("worker-queue-place",ne()).then(Ce)}async function at(f,$,N){if(!n)return;let ne=()=>({bead_id:f,...$==="parallel"?{}:{lane:$},to_index:N,expected_revision:qe()}),Te=await n("worker-queue-reorder",ne());Ce(Te),Te&&Te.conflict&&await n("worker-queue-reorder",ne()).then(Ce)}async function st(f){if(!n)return;let $=await n("worker-queue-remove",{bead_id:f,expected_revision:qe()});Ce($),$&&$.conflict&&await n("worker-queue-remove",{bead_id:f,expected_revision:qe()}).then(Ce)}async function et(f){if(!n||!f)return;let $=await n("worker-attempt-pause",{attempt_id:f});$&&$.paused===!1&&$.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${$.reason}`,"error",2400)}async function vt(f){if(!n||!f)return;let $=await Nr();if($===null)return;let N=async(Te={})=>await n("worker-attempt-resume",{attempt_id:f,expected_revision:qe(),...$!==""?{instructions:$}:{},...Te}),ne=await N();Ce(ne),ne&&ne.conflict&&(ne=await N(),Ce(ne)),ne=await jn(ne,(Te,rt)=>N({continuation:Te,decision_token:rt}),{onResult:Ce,refresh:()=>N()}),ne&&ne.resumed===!1&&!ne.conflict&&ne.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ne.reason}`,"error",2400)}async function Pt(f){if(!n||!f)return;let $=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:qe()});Ce($),$&&$.conflict&&($=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:qe()}),Ce($)),$&&$.dismissed===!1&&!$.conflict&&$.reason&&de(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${$.reason}`,"error",2400)}async function bt(f,$,N=!0){if(!n)return null;let ne=n,Te=await ne(f,{...$,expected_revision:qe()});return Ce(Te),Te&&Te.conflict&&N&&(Te=await ne(f,{...$,expected_revision:qe()}),Ce(Te)),Te}async function Ft(f){if(!n||!f)return;let $=X().merge_queue?.find(ne=>ne.bead_id===f)?.continuation_action;if($?.mismatch&&$.continuation===null){await Ve(f,$.mismatch);return}ve.add(f),Ye();let N;try{N=await bt("worker-merge-queue-add",{bead_id:f})}catch{de("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ve.delete(f),Ye()}if(!(!N||N.applied)){if(N.conflict){de("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}de(lv(N.reason),"error",2400)}}async function wt(f){if(!(!n||!f||W.has(f))){W.add(f),Ye();try{let $=await n("worker-cleanup-retry",{bead_id:f,expected_revision:qe()});Ce($),$&&!$.retried&&!$.conflict&&$.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${$.reason}`,"error",2400)}finally{W.delete(f),Ye()}}}async function Ve(f,$){let N=await jn({continuation_mismatch:$},(Te,rt)=>bt("worker-merge-queue-add",{bead_id:f,continuation:Te,decision_token:rt},!1)),ne=N?.queue?.merge_queue?.find(Te=>Te.bead_id===f)?.continuation_action;if(N?.applied!==!0&&ne?.continuation===null&&ne.mismatch){await Ve(f,ne.mismatch);return}N&&N.applied===!1&&!N.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Me(f){if(!n)return;let $=await bt("worker-merge-auto-toggle",{on:f});!$||$.conflict||de(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function L(f){if(!n||!f)return;let $=await bt("worker-merge-queue-remove",{bead_id:f});$&&!$.conflict&&!$.applied&&$.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Z(){await bt("worker-merge-queue-remove",{all:!0})}async function ue(f,$=null,N="unmerged",ne=null){if(!n||!f)return;let Te=Rs(f,N);if(!(!!ne||typeof globalThis.confirm!="function"||globalThis.confirm(Te)))return;let Xe=await n("worker-discard",{bead_id:f,...$?{attempt_id:$}:{},...ne?{operation_id:ne}:{},expected_revision:qe()});if(Ce(Xe),Xe&&Xe.conflict&&(Xe=await n("worker-discard",{bead_id:f,...$?{attempt_id:$}:{},...ne?{operation_id:ne}:{},expected_revision:qe()}),Ce(Xe)),Xe&&Xe.discarded===!0){de(aa(Xe),"success",5e3);return}if(Xe&&Xe.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${Xe.reason}`,"error",2800);return}if(Xe&&Xe.accepted&&Xe.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Xe&&Xe.accepted&&!Xe.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${Xe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Xe&&!Xe.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function E(f,$,N){if(!(!n||!$||!N||fe.has($))){fe.add($),Ye();try{let ne=await n(f,{bead_id:$,action_id:N,expected_revision:qe()});Ce(ne),ne?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ne?.ok&&ne?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ne.reason)}`,"error",2800)}finally{fe.delete($),Ye()}}}async function K(f,$){if(!n||!$||te.has($))return;te.add($),Ye();let N;try{let ne=async(Te={})=>await n(f,{bead_id:$,expected_revision:qe(),...Te});N=await ne(),Ce(N),N&&N.conflict&&(N=await n(f,{bead_id:$,expected_revision:qe()}),Ce(N)),f==="worker-revise-fix"&&(N=await jn(N,(Te,rt)=>ne({continuation:Te,decision_token:rt}),{onResult:Ce,refresh:()=>ne()}))}finally{te.delete($),Ye()}if(!(!N||N.conflict)){if(N.ok){de(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${N.reason||""}`,"error",3e3)}}async function pe(f){if(!n)return;let $=await n("worker-automation-toggle",{on:f,expected_revision:qe()});Ce($),$&&$.conflict&&await n("worker-automation-toggle",{on:f,expected_revision:qe()}).then(Ce)}async function S(f){if(!n||!f)return;let $=await n("worker-repo-operation-repair",{operation_id:f});if(Ce($),$&&$.ok===!1){de(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${$.reason||""}`,"error",3e3);return}$&&$.ok===!0&&de("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function h(f){if(!n||!f)return;let $=await n("worker-repo-operation-dismiss",{operation_id:f});Ce($),$&&$.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${$.reason||""}`,"error",3e3)}async function A(f){if(!n||!Number.isFinite(f))return;let $=Math.max(Aa,Math.floor(f)),N=await n("worker-queue-set-slots",{slots:$,expected_revision:qe()});Ce(N),N&&N.conflict&&await n("worker-queue-set-slots",{slots:$,expected_revision:qe()}).then(Ce)}async function B(f){if(!n||!Number.isInteger(f)||f<1||f>yf)return;let $=X(),N=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).slice(f).reduce((rt,Xe)=>rt+(Array.isArray(Xe?.entries)?Xe.entries.length:0),0),ne=()=>({count:f,expected_revision:qe()}),Te=await n("worker-queue-set-serial-lane-count",ne());Ce(Te),Te&&Te.conflict&&(Te=await n("worker-queue-set-serial-lane-count",ne()),Ce(Te)),Te&&Te.applied&&N>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${N}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let re="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function ae(f,$){let N=Gi(f,$.id,j);return{id:$.id,title:$.title,location_label:$.location_label,prefixes:$.prefixes,action:N.kind==="note"?{kind:"note",text:N.text}:N.kind==="disabled"?{kind:"disabled",label:re,title:N.title}:{kind:"place",label:re,title:N.title}}}function be(f,$){if(!z||z.bead_id!==f)return null;let N=z.counterpart_id,ne=$.filter(Te=>Te.id===N);return ne.length===0?null:{rows:ne.map(Te=>ae(f,Te))}}async function De(f,$){let N=Gi(f,$,j);if(z=null,N.kind!=="ops"){Ye();return}let ne=qe();for(let Te of N.ops){let rt=await nt(Te,ne);if(rt===null)break;ne=rt}Ye()}async function nt(f,$){if(!n)return null;try{let N=await n("worker-queue-place",{bead_id:f.bead_id,lane:f.lane,index:f.index,expected_revision:$});if(Ce(N),N&&N.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!N||N.applied!==!0)return de(N&&typeof N.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${N.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let ne=N.queue?N.queue.revision:void 0;return typeof ne!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):ne}catch(N){return de(N instanceof Error&&N.message?N.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function ot(){let f=X(),$=y?y.selectBoardColumn(jy,"ready"):[],N=y?y.selectBoardColumn(By,"blocked"):[],ne=y?y.selectBoardColumn(zy,"closed"):[],Te=y?y.selectBoardColumn(Uy,"in_progress"):[],rt=y?y.selectBoardColumn(Wy,"resolved"):[],Xe=go([...$,...N,...Te,...rt,...ne]),Mt=new Map;for(let g of[...$,...N,...Te])g&&g.id&&!Mt.has(g.id)&&Mt.set(g.id,g);let _={...oe(u?.()||"")};for(let g of["orchestration_model","orchestration_effort","orchestration_speed"]){let q=f[g];typeof q=="string"&&(_[g]=q)}function m(g,q){let ie=Mt.get(g);if(!ie)return null;let We=ie.metadata&&typeof ie.metadata=="object"?ie.metadata:{},Ze=ie.workflow?.route,qt=We.route,xt=wf(Ze)?Ze:wf(qt)?qt:null;return cn({pin:We,global:_,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:xt,controller_runtime:q})}function p(g){let q=g.runner||null,ie=m(g.bead_id,q),We=Ls(g),Ze=ie?nr(ie,q):null;return We||Ze?{orchestration:We,worker:Ze}:null}let v=new Map;function w(g){if(v.has(g))return v.get(g)??null;let q=m(g,null),ie=null;if(q){let We=Cn(f.runner_catalog??null,q.orchestration_model.value??""),Ze=We===null?q:m(g,We),qt=hr(Ze,f.runner_catalog??null),xt=nr(Ze,We);ie=qt||xt?{orchestration:qt,worker:xt}:null}return v.set(g,ie),ie}function P(g){let q=bo(Xe,g);return q.total===0?null:q}let ee=f.bead_titles||{},Y=new Map;for(let[g,q]of Object.entries(ee))typeof q=="string"&&q.length>0&&Y.set(g,q);for(let g of[...$,...N])Y.set(g.id,g.title||g.id);let xe=new Map;for(let g of[...$,...N,...Te,...rt,...ne])g&&g.id&&typeof g.from_id=="string"&&xe.set(g.id,g.from_id);let ke=new Map;for(let g of[...$,...N,...Te,...rt,...ne])g&&g.id&&typeof g.priority=="number"&&ke.set(g.id,g.priority);let ct=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},pt=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},Qt=f.bead_workflow&&typeof f.bead_workflow=="object"&&!Array.isArray(f.bead_workflow)?f.bead_workflow:{},kn=new Map;for(let[g,q]of Object.entries(pt))Array.isArray(q)&&kn.set(g,fl(q));for(let g of[...$,...N]){let q=g.labels;Array.isArray(q)&&!kn.has(g.id)&&kn.set(g.id,fl(q))}let wr=new Map,Yr=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(Yr)?Yr:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let q=g.members.map(We=>{let Ze=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(qt=>qt.entries.some(xt=>xt.bead_id===We));return Ze?Ze.id:null});if(!(q.every(We=>We!==null)&&new Set(q).size===1))for(let We of g.members)wr.set(We,g.members.filter(Ze=>Ze!==We))}let zs=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},kr=new Map;for(let[g,q]of Object.entries(ct))q&&typeof q=="object"&&kr.set(g,q);for(let g of[...$,...N])kr.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let or=g=>kr.get(g)||{},Nn=f.pr_wait||[],Zr=f.pr_observations||{},Ue=f.pr_activity||{},ft=f.cleanup_failed||{},pn=Object.entries(ft).map(([g,q])=>({bead_id:g,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",at:q&&typeof q.at=="number"?q.at:null,detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0,failure_code:q&&typeof q.failure_code=="string"?q.failure_code:void 0,subject_id:q&&typeof q.subject_id=="string"?q.subject_id:void 0,repair_eligible:!!(q&&q.repair_eligible),repair:q&&q.repair?q.repair:void 0})),Sa=f.queue||[],Wf=new Set([...Sa.map(g=>g.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(q=>q.bead_id)),...Nn.map(g=>g.bead_id),...f.done.map(g=>g.bead_id)]),zf=new Set(N.map(g=>g.id)),Hf=i?i.get()?.order||{}:{},$l=new Set,xl=[];for(let g of[...$,...N])Wf.has(g.id)||$l.has(g.id)||sv(g)||($l.add(g.id),xl.push(g));U=rv(xl,F,Hf);let Gf=f.admission||{},Al=g=>{let q=Gf[g];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof q.reason=="string"?q.reason:"",We=ie.indexOf(":");return We>0&&We<ie.length-1?`\u26D4 ${ie.slice(0,We)} (${ie.slice(We+1)})`:`\u26D4 ${ie}`},Sl=new Map,Kf=U.map(g=>{let q=Uo(g),ie=q.path.length>0,We=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",Ze=!Object.hasOwn(g,"description")||typeof g.description=="string"&&g.description.trim().length>0,qt=Object.hasOwn(g,"labels")&&rf(g.labels),xt=qt||!Object.hasOwn(g,"labels")?"":sf(g.labels,g.metadata),Sr=xt.length>0,At=!qt&&(We?Ze:ie&&!q.conflict),Js=zf.has(g.id),Vn=[];if(Js){let eo=ov(g);eo.length>0?Sl.set(g.id,eo):Vn.push(av)}We&&!Ze?Vn.push("missing_description"):!We&&q.conflict?Vn.push("spec_id_conflict"):!We&&!ie&&Vn.push("spec \uC5C6\uC74C");let Er=Al(g.id);return Er&&Vn.push(Er),{id:g.id,title:g.title||g.id,reason:Vn.join(" \xB7 "),draggable:At,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:We,status:g.status,worker_ineligible:qt,session_preferred:Sr,session_preferred_reason:xt,blocked:Js,has_spec:ie,exec_chips:w(g.id),from_id:g.from_id||void 0,priority:ke.get(g.id)}}),Ea=Vy(Kf,V),Ta=Ea.visible,Vf=f.revise_parked||{},Hs=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Ca=(g,q)=>g.map((ie,We)=>{let Ze=q!=="done",qt=q!=="done"&&q!=="queue",xt=Ze?Vf[ie.bead_id]:null,Sr=Ze?Rn(Hs,ie.bead_id):null,At=Sr?.operation?Sr:null,Js=Ze&&kn.get(ie.bead_id)===!0,Vn=f.admission&&typeof f.admission=="object"?f.admission[ie.bead_id]:null,Er=Ze?Od(Vn,!!At||fe.has(ie.bead_id)):null,eo=Ze&&!Er?Al(ie.bead_id):null,i_=Ze?[eo]:[],nc=[],Fa=Ze?wr.get(ie.bead_id):void 0;return Fa&&Fa.length>0&&nc.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Fa.join(", ")}\uC640`),{id:ie.bead_id,title:Y.get(ie.bead_id)||ie.bead_id,reason:i_.filter(Boolean).join(" \xB7 "),draggable:Ze&&!At&&!Er,done:q==="done",lane:q,seq:qt?We+1:void 0,worker_serial:Js,discard:At,stale_work:Er,badges:[...nc,...xt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...q==="done"?ra(f.attempts||{},ie.bead_id):[]],alert:!!xt,revise_action:!!xt,revise_enabled:!!xt&&!At&&!te.has(ie.bead_id),revise_title:xt?xt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${xt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?yn(f.attempts||{},ie.bead_id):null,work_ms:q==="done"?sa(f.attempts||{},ie.bead_id):null,done_at:q==="done"&&typeof ie.added_at=="number"?ie.added_at:void 0,exec_chips:Ze?w(ie.bead_id):null,workflow:Ze&&Qt[ie.bead_id]||null,from_id:xe.get(ie.bead_id)||void 0,priority:ke.get(ie.bead_id),...or(ie.bead_id)}}),$r=f.attempts?Object.values(f.attempts).filter(yr):[],Ra=new Set;for(let g of $r)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&Ra.add(g.resumed_from);let El=new Map;for(let g of $r)El.set(g.bead_id,g.attempt_id);let Xr=new Map;for(let g of $r)Xr.set(g.attempt_id,g);function Oa(g){let q=new Set,ie=g;for(;ie&&!q.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;q.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&Xr.get(ie.resumed_from)||null}return!1}let Gs=typeof f.declared_base=="string"?f.declared_base:null;function Yf(g){let q=null;for(let ie of $r)!ie||ie.bead_id!==g||Oa(ie)||(q===null||(typeof ie.started_at=="number"?ie.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=ie);return q&&typeof q.target_base=="string"?q.target_base:null}let La=[],Ks=[],Zf=nf(f),Tl=g=>{let q=typeof g.session_id=="string"&&g.session_id.length>0,ie=Ra.has(g.attempt_id);return{eligible:q&&!ie,reason:q?ie?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},$n=null;for(let g of $r){let q=g.status==="paused"&&!Ra.has(g.attempt_id);if(g.status==="running"||q)Ks.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Y.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:q,conflict_resolution:Oa(g),base_exception:bl(Gs,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Rn(Hs,g.bead_id,{attempt_id:g.attempt_id}),workflow:Qt[g.bead_id]||null,priority:ke.get(g.bead_id),usage:yn(f.attempts||{},g.bead_id),rollup:P(g.bead_id),rollup_expanded:Ae.has(g.bead_id),exec_chips:p(g),...or(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&Zf(g)){let ie=Tl(g);La.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Y.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Rn(Hs,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ie.eligible,resume_reason:ie.reason,conflict_resolution:Oa(g),base_exception:bl(Gs,g.target_base),workflow:Qt[g.bead_id]||null,priority:ke.get(g.bead_id),usage:yn(f.attempts||{},g.bead_id),rollup:P(g.bead_id),rollup_expanded:Ae.has(g.bead_id),exec_chips:p(g),...or(g.bead_id)}),$n=g}}let Cl=new Set([...La,...Ks].map(g=>g.bead_id)),Rl=new Map;for(let g of Array.isArray(f.session_active)?f.session_active:[]){let q=g&&g.bead_id;if(!(typeof q!="string"||q.length===0||Cl.has(q))){if(Cl.add(q),Array.isArray(g.blocked_by)){let ie=g.blocked_by.filter(We=>typeof We=="string"&&We.length>0);ie.length>0&&Rl.set(q,ie)}Ks.push({bead_id:q,attempt_id:null,kind:"session",title:g.title||Y.get(q)||q,status:"in_progress",started_at:Pn(g.started_at)??Pn(g.updated_at),updated_at:Pn(g.updated_at),workflow:g.workflow||null,priority:ke.get(q),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1})}}let xr=[...La,...Ks].map(g=>{let q=Xr.get(g.attempt_id),ie=q?.quickfix_landing;if(q?.quickfix_lane!==!0||!ie||typeof ie!="object")return g;let We=typeof ie.reason=="string"&&ie.reason.length>0?ie.reason:null,Ze=js({bead_id:q.bead_id,merge_sha:ie.head_sha,cleanup_cursor:ie.cursor,cleanup_failed:We?{step:ie.cursor,reason:We}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return Ze?{...g,landing:Ze}:g}),Ol=null;if($n){let g=Tl($n),q=$n.cause_detail;Ol={bead_id:$n.bead_id,repo:$n.repo||"",reason:$n.cause||$n.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:$n.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Rn(Hs,$n.bead_id,{attempt_id:$n.attempt_id})}}let Ll=new Set(xr.map(g=>g.bead_id)),Ia=Array.isArray(f.merge_queue)?f.merge_queue:[],Il=new Map,Pl=new Map,Ml=new Map,Dl=new Map,Nl=new Map;Ia.forEach((g,q)=>{g&&typeof g.bead_id=="string"&&(Il.set(g.bead_id,q+1),Pl.set(g.bead_id,g.resolution),Ml.set(g.bead_id,g.continuation_action||null),Dl.set(g.bead_id,g.head_review||null),Nl.set(g.bead_id,g.authority||null))});let Ar=f.merge_queue_state||{active:null,failures:{}},Xf=Ar.failures||{},ql=Ar.waiting&&typeof Ar.waiting.bead_id=="string"&&typeof Ar.waiting.reason=="string"?Ar.waiting:null,Qf=f.auto_merge_skips||{},Fl=g=>{let q=Qf[g];if(!q)return null;let ie=Zr[g],We=ie&&ie.pr?ie.pr.head_sha:null;return We&&We===q.head_sha?q.reason||"":null},Vs=new Map;for(let g of xr)g.failed!==!0&&g.conflict_resolution&&(g.paused?Vs.has(g.bead_id)||Vs.set(g.bead_id,"paused"):Vs.set(g.bead_id,"running"));let jl=xr.filter(g=>g.kind!=="session"&&!g.paused&&g.failed!==!0).length,Bl=(f.workspace_info||{}).slots,Ul=typeof Bl=="number"?Bl:typeof f.slots=="number"?f.slots:Aa,Jf=jl>Ul,Ys=dr(H),e_=(Array.isArray(f.done)?f.done.slice():[]).filter(g=>Ys===void 0||typeof g.added_at!="number"||g.added_at>=Ys).sort((g,q)=>(q.added_at||0)-(g.added_at||0)),Qr=Ca(e_,"done"),t_=new Set((Array.isArray(f.done)?f.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Wl=[],n_=u?.()||"";for(let g of ne){let q=Pn(g.closed_at);if(typeof g.id!="string"||t_.has(g.id)||q===null||Ys!==void 0&&q<Ys||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ie=`${n_}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,We=I.get(ie);We===void 0&&n&&(I.set(ie,"pending"),Promise.resolve(n("get-comments",{id:g.id})).then(Ze=>{let qt=Array.isArray(Ze)&&Ze.some(xt=>Wo(typeof xt?.text=="string"?xt.text:"")?.lane==="session");I.set(ie,qt?"session":"not-session"),Ye()}).catch(()=>{I.set(ie,"failed"),Ye()})),We==="session"&&Wl.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:q,created_at:g.created_at,updated_at:g.updated_at})}Qr.push(...Wl),Qr.sort((g,q)=>(q.done_at||0)-(g.done_at||0));let Zs={};for(let g of Dn)Zs[g]=0;let zl=!1,Hl=0,Pa=0,Gl=0;for(let g of Qr){let q=g.usage;if(q&&typeof q=="object"){let ie=!1;for(let We of Dn)Number.isFinite(q[We])&&(Zs[We]+=q[We],zl=!0,ie=!0);ie&&(Pa+=1,Number.isFinite(q.total_cost_usd)&&(Hl+=q.total_cost_usd,Gl+=1))}}Pa>0&&Gl===Pa&&(Zs.total_cost_usd=Hl);let Kl=Qr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),r_=Kl.length>0?Zt(Co(Kl)):zl?Bn(Zs):null,Vl=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},Yl=Array.isArray(f.serial_lanes)?f.serial_lanes:[],Zl=g=>{if(Nn.some(We=>We.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let q=$r.filter(We=>We&&We.bead_id===g),ie=q.length>0?q[q.length-1].status:null;return ie==="failed"||ie==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ie==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Xs=Yl.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,q)=>{let ie=Vl[g.id]||{},We=new Map((Array.isArray(ie.corrections)?ie.corrections:[]).filter(At=>At&&typeof At.bead_id=="string"&&typeof At.after=="string").map(At=>[At.bead_id,At.after])),Ze=Array.isArray(ie.occupied_by)?ie.occupied_by.filter(At=>typeof At=="string"):[],qt=new Set(Ze),xt=Ca(g.entries.filter(At=>!Ll.has(At.bead_id)&&!qt.has(At.bead_id)),g.id).map(At=>We.has(At.id)?{...At,badges:[`\u{1F517} ${We.get(At.id)} \uB4A4 (blocks \uC790\uB3D9)`,...At.badges]}:At),Sr=Ze.map(At=>({id:At,title:Y.get(At)||At,draggable:!1,lane:g.id,ghost:!0,badges:[Zl(At)]}));return{id:g.id,index:q+1,rows:[...Sr,...xt],occupied:Ze.length>0,badge:Ze.length>0?Zl(Ze[0]):"\uB300\uAE30",cycle:ie.cycle===!0}}),Xl=typeof f.serial_lane_count=="number"?f.serial_lane_count:Xs.length,Ma=Ca(Sa.filter(g=>!Ll.has(g.bead_id)),"queue"),Ql=new Map,Jl=new Set;for(let[g,q]of Object.entries(Vl)){if(!/^s[1-5]$/.test(g))continue;let ie=q&&Array.isArray(q.occupied_by)?q.occupied_by:[];for(let We of ie)typeof We=="string"&&Ql.set(We,g);ie.length>0&&Jl.add(g)}let Kn=[];for(let g of xr)typeof g.bead_id=="string"&&Kn.push({id:g.bead_id,title:Y.get(g.bead_id)||g.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ql.get(g.bead_id)??null});for(let g of Nn){let q=g&&g.bead_id;typeof q!="string"||q.length===0||Kn.push({id:q,title:Y.get(q)||q,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let g of Xs)for(let q of g.rows)q.ghost!==!0&&Kn.push({id:q.id,title:q.title,location_label:`${g.id} #${q.seq??""}`.trim(),kind:"serial",lane_id:g.id});Ma.forEach((g,q)=>{Kn.push({id:g.id,title:g.title,location_label:`#${q+1}`,kind:"parallel",lane_id:null})});for(let g of Ta)Kn.push({id:g.id,title:g.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let ec={};for(let g of Yl)g&&typeof g.id=="string"&&Array.isArray(g.entries)&&(ec[g.id]=g.entries.length);let Da=new Map;for(let g of Kn)Da.has(g.id)||Da.set(g.id,g);j={members_by_id:Da,serial_raw_lengths:ec,serial_lane_count:Xl,occupied_lanes:Jl};let s_=Pd(f.bead_scope,Kn),Qs=new Map;for(let[g,q]of Rl)Qs.set(g,q);for(let[g,q]of Sl)Qs.set(g,q);for(let[g,q]of Object.entries(zs))Array.isArray(q)&&Qs.set(g,q.filter(ie=>typeof ie=="string"&&ie.length>0));let o_=_p(Qs,Kn),Na=(g,q=null)=>{let ie=s_.get(g),We=o_.get(g)||null,Ze=ie&&ie.overlaps.length>0?ie.overlaps:null,qt=!!ie&&ie.scope_missing;if(!We&&!Ze&&!qt)return q;let xt=Ze?be(g,Ze):null;return{...q||{},interactive:!1,...We?{predecessors:We}:{},...Ze?{overlaps:Ze}:{},...qt?{scope_missing:!0}:{},...xt?{popover:xt}:{}}},qa=g=>{let q=Na(g.id,g.dependency_chips||null);return q&&(g.dependency_chips=q),g};for(let g of Ma)qa(g);for(let g of Xs)for(let q of g.rows)q.ghost!==!0&&qa(q);for(let g of Ta)qa(g);let tc=new Map;for(let g of xr){let q=typeof g.bead_id=="string"?g.bead_id:"";if(q.length===0)continue;let ie=g.kind==="session",We=Na(q),Ze=typeof g.attempt_id=="string"&&g.attempt_id.length>0?Xr.get(g.attempt_id):void 0,qt=Ze&&Ze.last_activity&&typeof Ze.last_activity=="object"?Ze.last_activity:null,xt=Ze&&Array.isArray(Ze.legs)?Ze.legs:[];!We&&!qt&&xt.length===0&&!ie||tc.set(q,{...qt?{last_activity:qt}:{},...xt.length>0?{legs:xt}:{},...We?{dependency_chips:We}:{}})}let a_=Nn.map(g=>hv(g.bead_id,Y.get(g.bead_id)||g.bead_id,Zr,ft[g.bead_id]||null,yn(f.attempts||{},g.bead_id),Ue[g.bead_id]||(ve.has(g.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:W.has(g.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Vs.get(g.bead_id)||null,g.external===!0,{position:Il.get(g.bead_id)||0,active:Ar.active===g.bead_id,failure:Xf[g.bead_id]||null,waiting:ql?.bead_id===g.bead_id?ql.reason:null,resolution:Pl.get(g.bead_id),continuation_action:Ml.get(g.bead_id),head_review:Dl.get(g.bead_id)||null,authority:Nl.get(g.bead_id)||null},g.wt_present!==!1,f.auto_merge===!0?Fl(g.bead_id):null,bl(Gs,Yf(g.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[g.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Xr.get(El.get(g.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]},Na(g.bead_id))).map(g=>({...g,workflow:Qt[g.id]||null,priority:ke.get(g.id),...or(g.id)}));return{queue:f,idToTitle:Y,candidates:Ta,candidate_hidden:{blocked:Ea.hidden_blocked,spec:Ea.hidden_spec},running:xr,live_count:jl,slots:Ul,over_cap:Jf,failure:Ol,waiting:Ma,serial_lanes:Xs,serial_lane_count:Xl,running_overlays:tc,pr_wait:a_,merge_queue_length:Ia.length,merge_queue_running:Ia.length>0,auto_excluded:Nn.map(g=>g.bead_id).filter(g=>Fl(g)!==null),declared_base:Gs,done:Qr,token_total:r_,cleanup_failures:pn,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function Ee(){let $=!!o?.get()?.job,N=!$&&o?.isPending?.()===!0,ne=$?"\uBD84\uC11D \uC911":N?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${ne?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${ne?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${ne?c`<span class="worker-analysis-btn__badge">${ne}</span>`:""}
    </button>`}function lt(f){let $=f.waiting.length>0?f.waiting[0].id:"\u2014",N=c`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ne=Gt(f),Te=f.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",rt=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${C()} 완료 <b>${f.done.length}</b></span
      >`,Xe=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,Mt=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Aa}
          step="1"
          .value=${String(f.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:yf},(p,v)=>v+1).map(p=>c`<option
                value=${String(p)}
                ?selected=${f.serial_lane_count===p}
              >
                ${p}
              </option>`)}
        </select>
      </label>
      ${o?Ee():""} `,_=jd({failure:f.failure}),m=Rd(f.repo_operations,f.cleanup_failures);return we?c`<div class="worker-ribbon">
          ${N} ${ne}
          <div class="worker-kpi worker-kpi--ribbon">${Te}${rt}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Mt}</div>
          <div class="worker-kpi">${Xe}</div>
        </div>
        ${m}${St.template()}${_}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${N}${ne}${Mt}</div>
        <div class="worker-kpi">
          ${Te}${rt}${Xe}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${C()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(p=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${p.tooltip}
                >${C()} 완료 · 누적 ${p.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${$}</b></span
          >
        </div>
      </div>
      ${m}${St.template()}${_}`}function Nt(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let $=f.running.some(N=>N.kind!=="session"&&!N.paused&&N.failed!==!0);return c`<section
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
      ${f.running.length>0?Zi(f.running,Date.now(),He,f.running_overlays):""}
      ${f.pr_wait.map(N=>Jn(N))}
    </section>`}function Ct(f){let $=f.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${V.show_blocked}
        />
        🔒 blocked${$.blocked>0?` ${$.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Yy.map(N=>c`<button
              type="button"
              class="worker-filter__chip${V.spec===N.value?" is-active":""}"
              data-spec=${N.value}
              aria-pressed=${V.spec===N.value?"true":"false"}
            >
              ${N.label}
            </button>`)}
        ${$.spec>0?c`<span class="worker-filter__hidden">숨김 ${$.spec}</span>`:""}
      </div>
    </div>`}function gn(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${F}
    >
      ${Ef.map(f=>c`<option value=${f.value} ?selected=${F===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function Kt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${H}
      >
        ${Cr.map(f=>c`<option value=${f.value} ?selected=${H===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function Ut(f){let $=c`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,N=f.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return wn({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:$,controls:N})}function Gt(f){let $=f.queue.auto_merge===!0;if(f.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${$?" is-active":""}"
        title=${$?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${$?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if($)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let N=new Set(f.auto_excluded),ne=f.pr_wait.filter(Te=>Te.merge_action&&Te.merge_enabled&&!N.has(Te.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ne>0?` ${ne}`:""}
    </button>`}function zt(f){let $=wn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:gn(),controls:Ct(f),place_menu:Oe(f.candidates),onOpenDoc:d?(N,ne)=>d(ne):void 0});return we?c`<div class="worker-lanes worker-lanes--mobile">
        ${Nt(f)}
        ${wn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:J.queue,preview:kf(f.waiting)})}
        ${f.serial_lanes.map(N=>Ut(N))}
        ${$}
        ${wn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${C()} \uC644\uB8CC \uC5C6\uC74C`,controls:Kt(),collapsible:!0,collapsed:J.done,preview:Array.isArray(f.token_total)?f.token_total.map(N=>N.label).join(" \xB7 "):f.token_total||kf(f.done)})}
      </div>`:c`<div class="worker-lanes">
      ${$}
      <div class="worker-wait">
        ${wn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(N=>Ut(N))}
      </div>
      ${wn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(N=>N.kind!=="session"&&!N.paused&&N.failed!==!0),body:Zi(f.running,Date.now(),He,f.running_overlays)})}
      ${wn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${wn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${C()} ${f.done.length}`,items:f.done,empty:`${C()} \uC644\uB8CC \uC5C6\uC74C`,controls:Kt()})}
    </div>`}function Et(f){J={...J,[f]:!J[f]},nv(J),Ye()}function Ye(){let f=ot();Qe(lt(f),_e),Qe(zt(f),ze)}function bn(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(ev);we=!!f.matches;let $=N=>{let ne=!!(N&&typeof N.matches=="boolean"?N.matches:f.matches);ne!==we&&(we=ne,Ye())};typeof f.addEventListener=="function"?(f.addEventListener("change",$),G.push(()=>f.removeEventListener("change",$))):typeof f.addListener=="function"&&(f.addListener($),G.push(()=>f.removeListener($)))}let rn=null;function tt(f){rn=f.target instanceof Element?f.target:null}function Re(f){let N=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!N)return;if(rn&&N.contains(rn)&&rn.closest("input, button, a")){f.preventDefault();return}let ne=N.dataset.beadId||"",Te=N.dataset.lane||"";M={bead_id:ne,from_lane:Te};try{f.dataTransfer?.setData("text/plain",ne),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function R(f){let $=f.target?.closest?.(".worker-pane");if(!$)return;let N=$.dataset.lane||"";N!=="candidate"&&N!=="queue"&&!/^s[1-5]$/.test(N)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),$.classList.add("worker-pane--drag-over"))}function me(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ie(f,$){let N=U.find(Xe=>Xe.id===f);if(!N)return;let ne=U.filter(Xe=>Xe.id!==f),Te=ne.length;if($){let Xe=$.dataset.beadId;if(Xe===f)return;let Mt=ne.findIndex(_=>_.id===Xe);Mt>=0&&(Te=Mt)}let rt=ne.slice();rt.splice(Te,0,N),x.applyReorder(f,rt,Te)}function dt(f){let $=f.target?.closest?.(".worker-pane");if(!$)return;f.preventDefault(),$.classList.remove("worker-pane--drag-over");let N=$.dataset.lane||"",ne=M?.bead_id||f.dataTransfer?.getData("text/plain")||"",Te=M?.from_lane||"";if(M=null,!ne)return;let rt=f.target?.closest?.(".worker-mini, .worker-card"),Xe=Array.from($.querySelectorAll(".worker-mini, .worker-card")),Mt=Xe.length;if(rt){let _=Xe.indexOf(rt);_>=0&&(Mt=_)}if(Mt=Math.max(0,Mt-$.querySelectorAll(".worker-mini--ghost").length),$.classList.contains("worker-pane--collapsed")&&(Mt=Pe()),N==="candidate"){if(Te==="candidate"){Ie(ne,rt);return}(Te==="queue"||/^s[1-5]$/.test(Te))&&st(ne);return}if(N==="queue"||/^s[1-5]$/.test(N)){let _=N==="queue"?"parallel":N;Te===N?at(ne,_,Mt):je(ne,_)}}function ht(f){V=f,Ky(f),Ye()}function _t(f){F=Tf(f),Xy(F),Ye()}function $t(f){H=In(f),Jy(H),k?.(H),Ye()}function Wt(f){let $=f.target?.closest?.(".worker-serial-lane-count");if($){let Mt=Number.parseInt($.value,10);Number.isFinite(Mt)&&B(Mt).then(Ye);return}let N=f.target?.closest?.(".worker-filter__blocked");if(N){ht({...V,show_blocked:N.checked});return}let ne=f.target?.closest?.(".worker-done-range");if(ne){$t(ne.value);return}let Te=f.target?.closest?.(".worker-sort");if(Te){_t(Te.value||hl);return}let rt=f.target?.closest?.(".worker-slots__input");if(!rt)return;let Xe=Number.parseInt(rt.value,10);if(!Number.isFinite(Xe)){Ye();return}A(Xe).then(Ye)}function Vt(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function sn(){let f=ot();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function Rt(){He&&Ke.close(),Le.hidden=!1,Fe.hidden=!1,Je.open(sn()),Ye()}function on(f){let $=X(),N=$.attempts?$.attempts[f]:null;He=f,Be=null,Je.close(),Le.hidden=!0,Fe.hidden=!1,Ke.open({attempt_id:f,meta:Vt(N)}),Ye()}function dn(f,$){He=null,Be=f,Je.close(),Le.hidden=!0,Fe.hidden=!1,Ke.open({attempt_id:f,meta:$,hide_prompt:!0}),Ye()}function Ln(){if(Je.isOpen()&&Je.refresh(sn()),Be){let N=(o?.get()?.runs||[]).find(ne=>ne.run_id===Be);N?Ke.updateMeta(ml(N)):Ke.close();return}if(!He)return;let f=X(),$=f.attempts?f.attempts[He]:null;if($){Ke.updateMeta(Vt($));return}Ke.close()}function T(f){let $=f.target;if($?.closest?.(".worker-mini__serial, .worker-mini__grip")||$?.closest?.("#worker-parallel-analysis-dialog"))return;let N=$?.closest?.(".mon-overlap__chip");if(N){let Ue=N.closest("[data-bead-id]"),ft=Ue&&Ue.getAttribute("data-bead-id")||"";if(ft){let pn=N.getAttribute("data-overlap-id")||"";z=!!z&&z.bead_id===ft&&z.counterpart_id===pn?null:{bead_id:ft,counterpart_id:pn},Ye()}return}let ne=$?.closest?.(".mon-overlap__place");if(ne){let Ue=ne.closest("[data-bead-id]"),ft=Ue&&Ue.getAttribute("data-bead-id")||"";ft&&De(ft,ne.getAttribute("data-counterpart-id")||"");return}if($?.closest?.(".mon-overlap__popover"))return;if($?.closest?.(".worker-analysis-btn")){gt?.open();return}if($?.closest?.(".worker-repo-strip")||$?.closest?.(".worker-mini__timeline")){Rt();return}let Te=$?.closest?.(".worker-repo-op__session");if(Te){let Ue=Te.dataset.attemptId;Ue&&on(Ue);return}let rt=$?.closest?.(".worker-repo-op__resolve");if(rt){S(rt.dataset.operationId||"");return}let Xe=$?.closest?.(".worker-repo-op__dismiss");if(Xe){h(Xe.dataset.operationId||"");return}let Mt=$?.closest?.(".worker-cleanup__resume");if(Mt){let Ue=Mt.dataset.beadId;Ue&&wt(Ue);return}let _=$?.closest?.(".worker-banner__resume");if(_){let Ue=_.dataset.attemptId;Ue&&vt(Ue);return}let m=$?.closest?.(".worker-banner__discard");if(m){let Ue=m.dataset.confirmation==="merged"?"merged":"unmerged";ue(m.dataset.beadId||"",m.dataset.attemptId||null,Ue,m.dataset.operationId||null);return}let p=$?.closest?.(".worker-banner__dismiss");if(p){let Ue=p.dataset.attemptId;Ue&&Pt(Ue);return}if($?.closest?.(".worker-play")){pe(!X().auto_advance);return}let v=$?.closest?.(".worker-merge-all");if(v){v.classList.contains("worker-merge-all--stop")?X().auto_merge===!0?Me(!1):Z():Me(!0);return}let w=$?.closest?.(".worker-pane__hd--toggle");if(w){let Ue=w.dataset.lane;(Ue==="queue"||Ue==="done")&&Et(Ue);return}let P=$?.closest?.(".worker-card__place-lane");if(P){let Ue=P.dataset.beadId,ft=P.dataset.lane;Ue&&(ft==="parallel"||/^s[1-5]$/.test(ft||""))&&(se=null,Ye(),je(Ue,ft));return}if($?.closest?.(".worker-card__place-cancel")){se=null,Ye();return}let Y=$?.closest?.(".worker-card__place");if(Y){let Ue=Y.dataset.beadId;Ue&&!Y.disabled&&(Q()?(se=Ue,Ye()):je(Ue,"parallel"));return}let xe=$?.closest?.(".worker-filter__chip");if(xe){let Ue=xe.dataset.spec;(Ue==="all"||Ue==="with"||Ue==="without")&&ht({...V,spec:Ue});return}let ke=$?.closest?.(".worker-mini__merge");if(ke){let Ue=ke.dataset.beadId||"";X().cleanup_failed?.[Ue]?wt(Ue):Ft(Ue);return}let ct=$?.closest?.(".worker-mini__merge-cancel");if(ct){L(ct.dataset.beadId||"");return}let pt=$?.closest?.(".worker-mini__discard");if(pt){ue(pt.dataset.beadId||"",pt.dataset.attemptId||null,pt.dataset.discardMode==="merged"?"merged":"unmerged",pt.dataset.operationId||null);return}let Qt=$?.closest?.(".worker-mini__stale-continue");if(Qt){E("worker-stale-work-continue",Qt.dataset.beadId||"",Qt.dataset.actionId||"");return}let kn=$?.closest?.(".worker-mini__stale-backup");if(kn){E("worker-stale-work-backup-fresh",kn.dataset.beadId||"",kn.dataset.actionId||"");return}let wr=$?.closest?.(".worker-mini__stale-recheck");if(wr){E("worker-stale-work-recheck",wr.dataset.beadId||"",wr.dataset.actionId||"");return}let Yr=$?.closest?.(".worker-mini__revise-fix");if(Yr){K("worker-revise-fix",Yr.dataset.beadId||"");return}let zs=$?.closest?.(".worker-mini__revise-approve");if(zs){K("worker-revise-approve",zs.dataset.beadId||"");return}if($?.closest?.(".worker-mini__pr"))return;if($?.closest?.(".rtile__discard")){let Ue=$?.closest?.(".rtile"),ft=Ue?.dataset?.beadId,pn=Ue?.dataset?.attemptId;ft&&ue(ft,pn||null,"unmerged",$?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if($?.closest?.(".rtile__dismiss")){let ft=$?.closest?.(".rtile")?.dataset?.attemptId;ft&&Pt(ft);return}if($?.closest?.(".rtile__pause")){let ft=$?.closest?.(".rtile")?.dataset?.attemptId;ft&&et(ft);return}if($?.closest?.(".rtile__resume")){let ft=$?.closest?.(".rtile")?.dataset?.attemptId;ft&&vt(ft);return}if($?.closest?.(".rtile__session")){let ft=$?.closest?.(".rtile")?.dataset?.attemptId;ft&&on(ft);return}if($?.closest?.(".worker-drawer-overlay__backdrop")){Je.close(),Ke.close();return}if($?.closest?.(".worker-drawer-host"))return;let kr=$?.closest?.(".rtile .board-card__roll-toggle");if(kr){let Ue=kr.dataset.rollParent;Ue&&(Ae.has(Ue)?Ae.delete(Ue):Ae.add(Ue),Ye());return}let or=$?.closest?.(".rtile .board-card__roll-child");if(or){let Ue=or.dataset.childId;Ue&&l&&l(Ue);return}let Nn=$?.closest?.(".rtile");if(Nn){if($?.closest?.(".rtile__id")){let ft=Nn.dataset.beadId;ft&&fn(ft).then(pn=>{pn?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ue=Nn.dataset.beadId;Ue&&l&&l(Ue);return}let Zr=$?.closest?.(".worker-mini, .worker-card");if(Zr){let Ue=Zr.dataset.beadId;if($?.closest?.(".worker-mini__id, .worker-card__id")){Ue&&fn(Ue).then(pn=>{pn?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ft=$?.closest?.(".ctl-chip--from");if(ft){let pn=ft.dataset.fromId;pn&&l&&l(pn);return}Ue&&l&&l(Ue)}}e.addEventListener("pointerdown",tt),e.addEventListener("dragstart",Re),e.addEventListener("dragover",R),e.addEventListener("dragleave",me),e.addEventListener("drop",dt),e.addEventListener("click",T),e.addEventListener("change",Wt);function O(f){if(!z)return;let $=f.target;$&&typeof $.closest=="function"&&$.closest(".mon-overlap__popover, .mon-overlap__chip")||(z=null,Ye())}function Ne(f){f.key!=="Escape"||!z||(z=null,Ye())}return document.addEventListener("click",O),document.addEventListener("keydown",Ne),G.push(()=>{document.removeEventListener("click",O),document.removeEventListener("keydown",Ne)}),bn(),y&&G.push(y.subscribe(()=>{for(let[f,$]of I)$==="failed"&&I.delete(f);Ye()})),s&&G.push(s.subscribe(()=>{let f=u&&u()||"";f!==mt&&(mt=f,it.close()),Ye(),Ln()})),o&&typeof o.subscribe=="function"&&G.push(o.subscribe(()=>{Ln(),Ye()})),Ye(),{load(){ce(),Ye()},refreshSessionDefaults:$e,destroy(){for(let f of G.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",tt),e.removeEventListener("dragstart",Re),e.removeEventListener("dragover",R),e.removeEventListener("dragleave",me),e.removeEventListener("drop",dt),e.removeEventListener("click",T),e.removeEventListener("change",Wt);try{Ke.destroy()}catch{}Fe.hidden=!0;try{gt?.destroy()}catch{}try{it.destroy()}catch{}Qe(c``,e)}}}function vl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Of(e,t,n,r=async()=>{},s=async()=>{}){let o=It("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function d(H){let C=H.target.value,we=t.getState().workspace?.current?.path||"";if(C&&C!==we){o("switching workspace to %s",C),i=!0,F();try{await n(C)}catch(ve){o("workspace switch failed: %o",ve)}finally{i=!1,F()}}}async function b(){let H=t.getState(),I=H.workspace?.current?.path||H.workspace?.available?.[0]?.path||"";if(!(!I||l)){o("git-pulling workspace %s",I),l=!0,F();try{await r(I)}catch(C){o("workspace git pull failed: %o",C)}finally{l=!1,F()}}}function k(H){let I=H.target;I&&e.contains(I)||M()}function y(H){H.key==="Escape"&&M()}function x(){u||(u=!0,document.addEventListener("mousedown",k),document.addEventListener("keydown",y),F())}function M(){u&&(u=!1,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",y),F())}function U(){u?M():x()}async function V(H){let I=H.target,C=I.value,J=I.checked;o("toggling visibility %s \u2192 %s",C,String(J));try{await s(C,J)}catch(we){o("workspace visibility toggle failed: %o",we)}}function se(H){return H?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${b}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function z(H,I){return c`
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
        ${u?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${H.map(C=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${C.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${C.path}"
                        .checked=${!I.has(C.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${vl(C.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function j(){let H=t.getState(),I=H.workspace?.current,C=H.workspace?.available||[],J=new Set(H.workspace?.hidden||[]),we=I?.path||C[0]?.path||"";if(C.length===0)return c``;let ve=C.filter(W=>!J.has(W.path)||W.path===we);if(ve.length<=1){let W=ve[0]||C[0],te=vl(W.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${W.path}"
            >${te}</span
          >
          ${z(C,J)}
          ${se(we)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${ve.map(W=>c`
              <option
                value="${W.path}"
                ?selected=${W.path===we}
                title="${W.path}"
              >
                ${vl(W.path)}
              </option>
            `)}
        </select>
        ${z(C,J)}
        ${se(we)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function F(){Qe(j(),e)}return F(),a=t.subscribe(()=>F()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",k),document.removeEventListener("keydown",y),Qe(c``,e)}}}var Lf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function wl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function If(e,t,n=wl()){return{id:n,type:e,payload:t}}function Pf(e={}){let t=It("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,d=[],b=new Map,k=new Set;function y(j){for(let F of Array.from(k))try{F(j)}catch{}}function x(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),y(o);let j=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),F=(n.jitterRatio||0)*j,H=Math.max(0,Math.round(j+(Math.random()*2-1)*F));t("ws retry in %d ms (attempt %d)",H,a+1),i=setTimeout(()=>{i=null,z()},H)}function M(j){try{s?.send(JSON.stringify(j))}catch(F){t("ws send failed",F)}}function U(){for(o="open",t("ws open"),y(o),a=0;d.length;){let j=d.shift();j&&M(j)}}function V(j){let F;try{F=JSON.parse(String(j.data))}catch{t("ws received non-JSON message");return}if(!F||typeof F.id!="string"||typeof F.type!="string"){t("ws received invalid envelope");return}if(u.has(F.id)){let I=u.get(F.id);u.delete(F.id),F.ok?I?.resolve(F.payload):I?.reject(F.error||new Error("ws error"));return}let H=b.get(F.type);if(H&&H.size>0)for(let I of Array.from(H))try{I(F.payload)}catch(C){t("ws event handler error",C)}else t("ws received unhandled message type: %s",F.type)}function se(){o="closed",t("ws closed"),y(o);for(let[j,F]of u.entries())F.reject(new Error("ws disconnected")),u.delete(j);a+=1,x()}function z(){if(!l)return;let j=r();try{s=new WebSocket(j),t("ws connecting %s",j),o="connecting",y(o),s.addEventListener("open",U),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",se)}catch(F){t("ws connect failed %o",F),x()}}return z(),{send(j,F){if(!Lf.includes(j))return Promise.reject(new Error(`unknown message type: ${j}`));let H=wl(),I=If(j,F,H);return t("send %s id=%s",j,H),new Promise((C,J)=>{u.set(H,{resolve:C,reject:J,type:j}),s&&s.readyState===s.OPEN?M(I):(t("queue %s id=%s (state=%s)",j,H,o),d.push(I))})},on(j,F){b.has(j)||b.set(j,new Set);let H=b.get(j);return H?.add(F),()=>{H?.delete(F)}},onConnection(j){return k.add(j),()=>{k.delete(j)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,z()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function yv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function vv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var kl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Mf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],rr="tab:worker:closed",wv="bdui.worker.done-range",Df=Mp,Nf="worker:queue",qf="worker:parallel-analysis",Ff="ui:order",jf="ui:display-policy",Bf="exec:presets",sr="tab:board:closed",Uf="beads-ui.board.closed-range";function kv(e){let t=It("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Qe(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&tf(a),i&&l&&u&&d){let oe=function(T,O){let Ne="Request failed",f="";if(T&&typeof T=="object"){let N=T;if(typeof N.message=="string"&&N.message.length>0&&(Ne=N.message),typeof N.details=="string")f=N.details;else if(N.details&&typeof N.details=="object")try{f=JSON.stringify(N.details,null,2)}catch{f=""}}else typeof T=="string"&&T.length>0&&(Ne=T);let $=O&&O.length>0?`Failed to load ${O}`:"Request failed";G.open($,Ne,f)},Oe=function(T){return`${tt.getState().workspace.current?.path||""}\0${T}`},qe=function(){Ke&&(Ke().catch(()=>{}),Ke=null),Je=null,it=null},Pe=function(T){mt=T;let O=()=>{mt!==T||tt.getState().selected_id!==T||(mt=null,Ce(T))};if(!X){gt.then(O);return}O()},et=function(T,O,Ne,f,$){return Ne!==st[O]?($().catch(()=>{}),!1):(T.set(f,$),!0)},Pt=function(){let T=tt.getState();Me(T.view==="board"),pe(T.view==="worker"),re(T.view==="monitor"),h(T.view==="board"||T.view==="worker"||vt||!!T.selected_id)},wt=function(){let T=dr(bt);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},Ve=function(){let T=dr(Ft);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},Me=function(T){if(T)for(let[O,Ne]of kl){if(je.has(O)||at.has(O))continue;let f=O===sr?wt():{type:Ne};try{_e.register(O,f)}catch(ne){t("register %s store failed: %o",O,ne)}at.add(O);let $=st.board,N=!1;Ge.subscribeList(O,f).then(ne=>{N=!et(je,"board",$,O,ne)}).catch(ne=>{t("subscribe %s failed: %o",O,ne),oe(ne,"board")}).finally(()=>{at.delete(O),N&&Pt()})}else ue()},ue=function(){st.board+=1;for(let[T]of kl){let O=je.get(T);O&&(O().catch(()=>{}),je.delete(T));try{_e.unregister(T)}catch(Ne){t("unregister %s failed: %o",T,Ne)}}},pe=function(T){if(!T){S();return}for(let[O,Ne]of Mf){if(E.has(O)||at.has(O))continue;let f=O===rr?Ve():{type:Ne};try{_e.register(O,f)}catch(ne){t("register %s store failed: %o",O,ne)}at.add(O);let $=st.worker,N=!1;Ge.subscribeList(O,f).then(ne=>{N=!et(E,"worker",$,O,ne)}).catch(ne=>{t("subscribe %s failed: %o",O,ne),oe(ne,"worker")}).finally(()=>{at.delete(O),N&&Pt()})}},S=function(){st.worker+=1;for(let[T]of Mf){let O=E.get(T);O&&(O().catch(()=>{}),E.delete(T));try{_e.unregister(T)}catch(Ne){t("unregister %s failed: %o",T,Ne)}}},h=function(T){if(!T){A();return}K||($e("subscribe-worker-queue",{id:Nf}).catch(O=>{t("subscribe-worker-queue failed: %o",O)}),$e("subscribe-worker-parallel-analysis",{id:qf}).catch(O=>{t("subscribe-worker-parallel-analysis failed: %o",O)}),K=()=>($e("unsubscribe-worker-parallel-analysis",{id:qf}),$e("unsubscribe-worker-queue",{id:Nf})))},A=function(){K&&(K().catch(()=>{}),K=null),D.clear()},re=function(T){if(!T){ae();return}B||($e("subscribe-monitor-pipeline",{id:Df}).catch(O=>{t("subscribe-monitor-pipeline failed: %o",O)}),B=()=>$e("unsubscribe-monitor-pipeline",{id:Df}))},ae=function(){B&&(B().catch(()=>{}),B=null)},De=function(){be||($e("subscribe-ui-order",{id:Ff}).catch(T=>{t("subscribe-ui-order failed: %o",T)}),be=()=>$e("unsubscribe-ui-order",{id:Ff}))},nt=function(){be&&(be().catch(()=>{}),be=null),Le.clear()},Ee=function(){ot||($e("subscribe-display-policy",{id:jf}).catch(T=>{t("subscribe-display-policy failed: %o",T)}),ot=()=>$e("unsubscribe-display-policy",{id:jf}))},lt=function(){ot&&(ot().catch(()=>{}),ot=null),ze.clear()},Ct=function(){Nt||($e("subscribe-impl-presets",{id:Bf}).catch(T=>{t("subscribe-impl-presets failed: %o",T)}),Nt=()=>$e("unsubscribe-impl-presets",{id:Bf}))},Et=function(T){if(!T)return"Unknown";let O=T.split("/").filter(Boolean);return O.length>0?O[O.length-1]:"Unknown"},Wt=function(T,O){$t.open(T.path,{missing_state:T.missing_state,...O?{workspace:O}:{}})};var b=oe,k=Oe,y=qe,x=Pe,M=et,U=Pt,V=wt,se=Ve,z=Me,j=ue,F=pe,H=S,I=h,C=A,J=re,we=ae,ve=De,W=nt,te=Ee,fe=lt,Ae=Ct,he=Et,le=Wt;let Se=document.getElementById("header-loading"),ye=Fc(Se),G=Cd(e),ce=Pf(),$e=ye.wrapSend((T,O)=>ce.send(T,O)),Ge=Oc($e),_e=Lc(),Fe=Mc(),D=Pc(),ge=bc(),Le=Ic(),ze=mc(),He=gc(),Be=hc();ce.on("impl-presets-snapshot",T=>{let O=T;O&&typeof O.revision=="number"&&Array.isArray(O.presets)&&He.set({revision:O.revision,presets:O.presets})}),ce.on("monitor-pipeline-snapshot",T=>{let O=T;if(!(!O||!Array.isArray(O.workspaces)))try{ge.set(O.workspaces,O.workspaces_state,O.cross_lanes)}catch{}}),ce.on("ui-order-snapshot",T=>{let O=T;if(O&&typeof O.revision=="number")try{Le.set({revision:O.revision,order:O.order&&typeof O.order=="object"?O.order:{}})}catch{}}),ce.on("display-policy-snapshot",T=>{let O=T;if(O&&O.policy&&typeof O.policy=="object")try{ze.set(O.policy)}catch{}}),ce.on("session-log-snapshot",T=>{let O=T;if(O&&typeof O.id=="string")try{Be.set(O.id,Array.isArray(O.lines)?O.lines:[],typeof O.last_event_at=="number"?O.last_event_at:null)}catch{}}),ce.on("session-log-append",T=>{let O=T;if(O&&typeof O.id=="string")try{Be.append(O.id,O.event)}catch{}}),ce.on("snapshot",T=>{let O=T,Ne=O&&typeof O.id=="string"?O.id:"",f=Ne?_e.getStore(Ne):null;if(f&&O&&O.type==="snapshot")try{f.applyPush(O)}catch{}}),ce.on("upsert",T=>{let O=T,Ne=O&&typeof O.id=="string"?O.id:"",f=Ne?_e.getStore(Ne):null;if(f&&O&&O.type==="upsert")try{f.applyPush(O)}catch{}}),ce.on("delete",T=>{let O=T,Ne=O&&typeof O.id=="string"?O.id:"",f=Ne?_e.getStore(Ne):null;if(f&&O&&O.type==="delete")try{f.applyPush(O)}catch{}});let Ke=null,Je=null,it=null,mt=null,St=()=>{},gt=new Promise(T=>{St=()=>T(void 0)}),X=!1,Q=!1;async function Ce(T){let O=Oe(T);if(O===Je||O===it)return;it=O;let Ne=`detail:${T}`,f={type:"issue-detail",params:{id:T}};try{_e.register(Ne,f)}catch($){t("register detail store failed: %o",$)}try{let $=await Ge.subscribeList(Ne,f);if(tt.getState().selected_id!==T||Oe(T)!==O){await $().catch(()=>{});return}Ke&&await Ke().catch(()=>{}),Ke=$,Je=O}catch($){t("detail subscribe failed: %o",$),oe($,"issue details")}finally{it===O&&(it=null)}}let je=new Map,at=new Set,st={board:0,worker:0},vt=!1,bt=io;try{let T=window.localStorage.getItem(Uf);Ka(T)&&(bt=T)}catch{}let Ft="today";try{let T=window.localStorage.getItem(wv);T!==null&&(Ft=In(T))}catch{}async function L(T){if(!Ka(T)||T===bt)return;bt=T;try{window.localStorage.setItem(Uf,T)}catch{}let O=je.get(sr);if(!O)return;je.delete(sr),await O().catch(()=>{});let Ne=wt();try{_e.register(sr,Ne)}catch(f){t("register %s store failed: %o",sr,f)}try{let f=await Ge.subscribeList(sr,Ne);je.set(sr,f)}catch(f){t("re-subscribe %s failed: %o",sr,f),oe(f,"board")}}async function Z(T){let O=In(T);if(O===Ft)return;Ft=O;let Ne=E.get(rr);if(!Ne)return;E.delete(rr),await Ne().catch(()=>{});let f=Ve();try{_e.register(rr,f)}catch($){t("register %s store failed: %o",rr,$)}try{let $=await Ge.subscribeList(rr,f);E.set(rr,$)}catch($){t("re-subscribe %s failed: %o",rr,$),oe($,"worker")}}let E=new Map,K=null,B=null,be=null,ot=null,Nt=null;async function gn(){ot=null,ze.clear(),Nt=null,He.clear(),K=null,B=null,je.clear(),E.clear(),st.board+=1,st.worker+=1,Ct();let T=tt.getState().workspace.current?.path;if(T)try{await ce.send("set-workspace",{path:T})}catch(Ne){t("workspace restore after reconnect failed: %o",Ne);return}Ee();let O=tt.getState();Me(O.view==="board"),pe(O.view==="worker"),re(O.view==="monitor"),h(O.view==="board"||O.view==="worker"||!!O.selected_id)}async function Kt(){t("clearing all subscriptions for workspace switch"),ue(),S(),A(),Fe.clear(),nt(),De(),lt(),Ee(),qe();let T=tt.getState();if(T.selected_id)try{_e.unregister(`detail:${T.selected_id}`)}catch{}let O=tt.getState();Me(O.view==="board"),pe(O.view==="worker"),re(O.view==="monitor"),h(O.view==="board"||O.view==="worker"||!!O.selected_id),O.selected_id&&Pe(O.selected_id)}async function Ut(T){t("requesting workspace switch to %s",T),Q=!0;try{let O=await ce.send("set-workspace",{path:T});t("workspace switch result: %o",O),O&&O.workspace&&(tt.setState({workspace:{current:{path:O.workspace.root_dir,database:O.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",T),O.changed&&(await Kt(),de("Switched to "+Et(T),"success",2e3)))}catch(O){throw t("workspace switch failed: %o",O),de("Failed to switch workspace","error",3e3),O}finally{Q=!1}}async function Gt(T){t("requesting workspace git pull for %s",T);try{let O=await ce.send("git-pull-workspace",{});t("workspace git pull result: %o",O);let Ne=O?.status;if(Ne==="up_to_date"){de("Already up to date","success",2e3);return}if(Ne==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+Et(T),"success",2e3)}catch(O){t("workspace git pull failed: %o",O);let Ne=O?.code,f=O?.message;if(Ne==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Ne==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Ne==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let $=f?`: ${f}`:"";throw de(`Git pull failed${$}`,"error",3e3),O}}async function zt(T,O){t("setting workspace visibility %s \u2192 %s",T,String(O));try{await ce.send("set-workspace-visibility",{path:T,visible:O}),await Ye()}catch(Ne){t("workspace visibility update failed: %o",Ne),de("Failed to update project visibility","error",3e3)}}async function Ye(){try{let T=await ce.send("list-workspaces",{});if(t("workspaces loaded: %o",T),T&&Array.isArray(T.workspaces)){let O=T.workspaces.map(N=>({path:N.path,database:N.database,pid:N.pid,version:N.version})),Ne=T.current?{path:T.current.root_dir,database:T.current.db_path}:null,f=Array.isArray(T.hidden)?T.hidden.filter(N=>typeof N=="string"):[];tt.setState({workspace:{current:Ne,available:O,hidden:f}});let $=window.localStorage.getItem("beads-ui.workspace");$&&(!O.some(ne=>ne.path===$)||f.includes($)?window.localStorage.removeItem("beads-ui.workspace"):Ne&&$!==Ne.path&&(t("restoring saved workspace preference: %s",$),await Ut($)))}}catch(T){t("failed to load workspaces: %o",T)}}ce.on("workspace-changed",T=>{t("workspace-changed event: %o",T),T&&T.root_dir&&(tt.setState({workspace:{current:{path:T.root_dir,database:T.db_path}}}),Ye(),Kt())});let bn=!1;if(typeof ce.onConnection=="function"){let T=O=>{t("ws state %s",O),O==="reconnecting"||O==="closed"?(bn=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):O==="open"&&bn&&(bn=!1,de("Reconnected","success",2200),vv(tt,(Ne,f)=>{t(`${Ne}: %o`,f)}),gn())};ce.onConnection(T)}let rn="board";try{let T=window.localStorage.getItem("beads-ui.view");(T==="board"||T==="worker"||T==="monitor")&&(rn=T)}catch(T){t("view parse error: %o",T)}let tt=qc({config:yv(),view:rn});ce.on("worker-queue-snapshot",T=>{let O=T;if(!O||!O.queue)return;let Ne=tt.getState().workspace.current?.path;if(typeof Ne=="string"&&Ne.length>0&&O.root_dir!==Ne){t("dropping worker-queue snapshot for %s",String(O.root_dir));return}try{Fe.set(O.queue)}catch{}}),ce.on("worker-parallel-analysis-snapshot",T=>{let O=T;if(!O)return;let Ne=tt.getState().workspace.current?.path;if(!(typeof Ne=="string"&&Ne.length>0&&typeof O.root_dir=="string"&&O.root_dir!==Ne))try{D.set({settings:O.settings,job:O.job??null,runs:Array.isArray(O.runs)?O.runs:[],last_good:O.last_good??null})}catch{}});let Re=Dc(tt);Re.start();let R=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),me=async(T,O)=>{try{return await $e(T,O)}catch(Ne){if(R.has(T))throw Ne;return[]}};Np({global_element:r,repo_element:s},tt,Re);let Ie=document.getElementById("workspace-picker");Ie&&Of(Ie,tt,Ut,Gt,zt);let dt=Bp(e,(T,O)=>$e(T,O));try{let T=document.getElementById("new-issue-btn");T&&T.addEventListener("click",()=>dt.open())}catch{}let ht=Hp(e,{policyStore:ze,queueStore:Fe,implPresetStore:He,transport:(T,O)=>$e(T,O),onOpenChange:T=>{let O=vt;vt=T,Pt(),O&&T===!1&&sn.refreshSessionDefaults()},labelOptions:()=>{let T=new Set;for(let[O]of kl)for(let Ne of _e.snapshotFor(O)||[]){let f=Ne.labels;if(Array.isArray(f))for(let $ of f)typeof $=="string"&&$.length>0&&T.add($)}return Array.from(T).sort()}});try{let T=document.getElementById("display-settings-btn");T&&(T.setAttribute("aria-label","\uC124\uC815"),T.setAttribute("title","\uC124\uC815"),T.addEventListener("click",()=>ht.open()))}catch{}let _t=document.createElement("div");_t.className="md-viewer-root",document.body.appendChild(_t);let $t=ea(_t,{getWorkspacePath:()=>tt.getState().workspace.current?.path}),Vt=eu(i,{gotoIssue:T=>Re.gotoIssue(T),issueStores:_e,transport:me,workerQueueStore:Fe,uiOrderStore:Le,displayPolicyStore:ze,closedRange:bt,onClosedRangeChange:T=>{L(T)},onNewIssue:()=>dt.open(),openDoc:Wt}),sn=yl(l,{transport:me,issueStores:_e,queueStore:Fe,analysisStore:D,sessionLogStore:Be,uiOrderStore:Le,gotoIssue:T=>tt.setState({selected_id:T}),getWorkspacePath:()=>tt.getState().workspace.current?.path,openDoc:Wt,doneRange:Ft,onDoneRangeChange:T=>{Z(T)}}),Rt=Dp(u,{transport:me,pipelineStore:ge,execPresetStore:He,sessionLogStore:Be,router:Re,gotoIssue:T=>Re.gotoIssue(T),getWorkspacePath:()=>tt.getState().workspace.current?.path,switchWorkspace:T=>Ut(T),openDoc:Wt}),on=Td(d,{issueStores:_e,transport:me,queueStore:Fe,execPresetStore:He,sessionLogStore:Be,getWorkspacePath:()=>tt.getState().workspace.current?.path,mdViewer:$t,onNavigate:T=>{tt.getState().view==="worker"?tt.setState({selected_id:T}):Re.gotoIssue(T)},onClose:()=>{let T=tt.getState();tt.setState({selected_id:null});try{Re.gotoView(T.view==="worker"||T.view==="monitor"?T.view:"board")}catch{}},onOpenExecPresets:()=>{ht.open("execution")}}),dn=tt.getState().selected_id;dn&&(d.hidden=!1,on.load(dn),Pe(dn)),tt.subscribe(T=>{let O=T.selected_id;O?(d.hidden=!1,on.load(O),Q||Pe(O)):(on.clear(),d.hidden=!0,qe())});let Ln=T=>{i.hidden=T.view!=="board",l.hidden=T.view!=="worker",u.hidden=T.view!=="monitor",o&&o.classList.toggle("is-quiet",T.view==="monitor"),Me(T.view==="board"),pe(T.view==="worker"),re(T.view==="monitor"),h(T.view==="board"||T.view==="worker"||vt||!!T.selected_id),!T.selected_id&&T.view==="board"&&Vt.load(),T.view==="worker"&&sn.load(),T.view==="monitor"?Rt.load():Rt.pause(),window.localStorage.setItem("beads-ui.view",T.view)};tt.subscribe(Ln),Ln(tt.getState()),De(),Ee(),Ct(),Ye().finally(()=>{X=!0,St()}),window.addEventListener("keydown",T=>{let O=T.ctrlKey||T.metaKey,Ne=String(T.key||"").toLowerCase(),f=T.target,$=f&&f.tagName?String(f.tagName).toLowerCase():"",N=$==="input"||$==="textarea"||$==="select"||f&&typeof f.isContentEditable=="boolean"&&f.isContentEditable;O&&Ne==="n"&&(N||(T.preventDefault(),dt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&kv(t)});export{kv as bootstrap,yv as readBootstrapConfig,vv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
