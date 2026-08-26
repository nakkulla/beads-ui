var t_=Object.create;var qa=Object.defineProperty;var n_=Object.getOwnPropertyDescriptor;var r_=Object.getOwnPropertyNames;var s_=Object.getPrototypeOf,o_=Object.prototype.hasOwnProperty;var a_=(e,t,n)=>t in e?qa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Fa=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var i_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of r_(t))!o_.call(e,s)&&s!==n&&qa(e,s,{get:()=>t[s],enumerable:!(r=n_(t,s))||r.enumerable});return e};var l_=(e,t,n)=>(n=e!=null?t_(s_(e)):{},i_(t||!e||!e.__esModule?qa(n,"default",{value:e,enumerable:!0}):n,e));var Et=(e,t,n)=>a_(e,typeof t!="symbol"?t+"":t,n);var hc=Fa(($v,bc)=>{var Or=1e3,Lr=Or*60,Ir=Lr*60,pr=Ir*24,d_=pr*7,p_=pr*365.25;bc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return f_(e);if(n==="number"&&isFinite(e))return t.long?m_(e):__(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function f_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*p_;case"weeks":case"week":case"w":return n*d_;case"days":case"day":case"d":return n*pr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Ir;case"minutes":case"minute":case"mins":case"min":case"m":return n*Lr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Or;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function __(e){var t=Math.abs(e);return t>=pr?Math.round(e/pr)+"d":t>=Ir?Math.round(e/Ir)+"h":t>=Lr?Math.round(e/Lr)+"m":t>=Or?Math.round(e/Or)+"s":e+"ms"}function m_(e){var t=Math.abs(e);return t>=pr?ao(e,t,pr,"day"):t>=Ir?ao(e,t,Ir,"hour"):t>=Lr?ao(e,t,Lr,"minute"):t>=Or?ao(e,t,Or,"second"):e+" ms"}function ao(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var vc=Fa((xv,yc)=>{function g_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=a,n.enable=s,n.enabled=i,n.humanize=hc(),n.destroy=u,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let g=0;for(let v=0;v<p.length;v++)g=(g<<5)-g+p.charCodeAt(v),g|=0;return n.colors[Math.abs(g)%n.colors.length]}n.selectColor=t;function n(p){let g,v=null,h,A;function N(...U){if(!N.enabled)return;let Z=N,oe=Number(new Date),Y=oe-(g||oe);Z.diff=Y,Z.prev=g,Z.curr=oe,g=oe,U[0]=n.coerce(U[0]),typeof U[0]!="string"&&U.unshift("%O");let q=0;U[0]=U[0].replace(/%([a-zA-Z%])/g,(K,I)=>{if(K==="%%")return"%";q++;let L=n.formatters[I];if(typeof L=="function"){let ne=U[q];K=L.call(Z,ne),U.splice(q,1),q--}return K}),n.formatArgs.call(Z,U),(Z.log||n.log).apply(Z,U)}return N.namespace=p,N.useColors=n.useColors(),N.color=n.selectColor(p),N.extend=r,N.destroy=n.destroy,Object.defineProperty(N,"enabled",{enumerable:!0,configurable:!1,get:()=>v!==null?v:(h!==n.namespaces&&(h=n.namespaces,A=n.enabled(p)),A),set:U=>{v=U}}),typeof n.init=="function"&&n.init(N),N}function r(p,g){let v=n(this.namespace+(typeof g>"u"?":":g)+p);return v.log=this.log,v}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let g=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let v of g)v[0]==="-"?n.skips.push(v.slice(1)):n.names.push(v)}function o(p,g){let v=0,h=0,A=-1,N=0;for(;v<p.length;)if(h<g.length&&(g[h]===p[v]||g[h]==="*"))g[h]==="*"?(A=h,N=v,h++):(v++,h++);else if(A!==-1)h=A+1,N++,v=N;else return!1;for(;h<g.length&&g[h]==="*";)h++;return h===g.length}function a(){let p=[...n.names,...n.skips.map(g=>"-"+g)].join(",");return n.enable(""),p}function i(p){for(let g of n.skips)if(o(p,g))return!1;for(let g of n.names)if(o(p,g))return!0;return!1}function l(p){return p instanceof Error?p.stack||p.message:p}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}yc.exports=g_});var wc=Fa((sn,io)=>{sn.formatArgs=h_;sn.save=y_;sn.load=v_;sn.useColors=b_;sn.storage=w_();sn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();sn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function b_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function h_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+io.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}sn.log=console.debug||console.log||(()=>{});function y_(e){try{e?sn.storage.setItem("debug",e):sn.storage.removeItem("debug")}catch{}}function v_(){let e;try{e=sn.storage.getItem("debug")||sn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function w_(){try{return localStorage}catch{}}io.exports=vc()(sn);var{formatters:k_}=io.exports;k_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Jr=globalThis,Js=Jr.trustedTypes,tc=Js?Js.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ba="$lit$",Mn=`lit$${Math.random().toFixed(9).slice(2)}$`,Ua="?"+Mn,c_=`<${Ua}>`,lr=document,es=()=>lr.createComment(""),ts=e=>e===null||typeof e!="object"&&typeof e!="function",Wa=Array.isArray,ic=e=>Wa(e)||typeof e?.[Symbol.iterator]=="function",ja=`[ 	
\f\r]`,Qr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nc=/-->/g,rc=/>/g,ar=RegExp(`>|${ja}(?:([^\\s"'>=/]+)(${ja}*=${ja}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),sc=/'/g,oc=/"/g,lc=/^(?:script|style|textarea|title)$/i,za=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=za(1),rs=za(2),gv=za(3),gn=Symbol.for("lit-noChange"),Ft=Symbol.for("lit-nothing"),ac=new WeakMap,ir=lr.createTreeWalker(lr,129);function cc(e,t){if(!Wa(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return tc!==void 0?tc.createHTML(t):t}var uc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Qr;for(let i=0;i<n;i++){let l=e[i],u,p,g=-1,v=0;for(;v<l.length&&(a.lastIndex=v,p=a.exec(l),p!==null);)v=a.lastIndex,a===Qr?p[1]==="!--"?a=nc:p[1]!==void 0?a=rc:p[2]!==void 0?(lc.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=ar):p[3]!==void 0&&(a=ar):a===ar?p[0]===">"?(a=s??Qr,g=-1):p[1]===void 0?g=-2:(g=a.lastIndex-p[2].length,u=p[1],a=p[3]===void 0?ar:p[3]==='"'?oc:sc):a===oc||a===sc?a=ar:a===nc||a===rc?a=Qr:(a=ar,s=void 0);let h=a===ar&&e[i+1].startsWith("/>")?" ":"";o+=a===Qr?l+c_:g>=0?(r.push(u),l.slice(0,g)+Ba+l.slice(g)+Mn+h):l+Mn+(g===-2?i:h)}return[cc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ns=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,p]=uc(t,n);if(this.el=e.createElement(u,r),ir.currentNode=this.el.content,n===2||n===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=ir.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(Ba)){let v=p[a++],h=s.getAttribute(g).split(Mn),A=/([.?@])?(.*)/.exec(v);l.push({type:1,index:o,name:A[2],strings:h,ctor:A[1]==="."?to:A[1]==="?"?no:A[1]==="@"?ro:ur}),s.removeAttribute(g)}else g.startsWith(Mn)&&(l.push({type:6,index:o}),s.removeAttribute(g));if(lc.test(s.tagName)){let g=s.textContent.split(Mn),v=g.length-1;if(v>0){s.textContent=Js?Js.emptyScript:"";for(let h=0;h<v;h++)s.append(g[h],es()),ir.nextNode(),l.push({type:2,index:++o});s.append(g[v],es())}}}else if(s.nodeType===8)if(s.data===Ua)l.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(Mn,g+1))!==-1;)l.push({type:7,index:o}),g+=Mn.length-1}o++}}static createElement(t,n){let r=lr.createElement("template");return r.innerHTML=t,r}};function cr(e,t,n=e,r){if(t===gn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=ts(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=cr(e,s._$AS(e,t.values),s,r)),t}var eo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??lr).importNode(n,!0);ir.currentNode=s;let o=ir.nextNode(),a=0,i=0,l=r[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Cr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new so(o,this,t)),this._$AV.push(u),l=r[++i]}a!==l?.index&&(o=ir.nextNode(),a++)}return ir.currentNode=lr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Cr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Ft,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=cr(this,t,n),ts(t)?t===Ft||t==null||t===""?(this._$AH!==Ft&&this._$AR(),this._$AH=Ft):t!==this._$AH&&t!==gn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ic(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ft&&ts(this._$AH)?this._$AA.nextSibling.data=t:this.T(lr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ns.createElement(cc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new eo(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=ac.get(t.strings);return n===void 0&&ac.set(t.strings,n=new ns(t)),n}k(t){Wa(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(es()),this.O(es()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ur=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Ft,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Ft}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=cr(this,t,n,0),a=!ts(t)||t!==this._$AH&&t!==gn,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=cr(this,i[r+l],n,l),u===gn&&(u=this._$AH[l]),a||(a=!ts(u)||u!==this._$AH[l]),u===Ft?t=Ft:t!==Ft&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===Ft?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},to=class extends ur{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ft?void 0:t}},no=class extends ur{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ft)}},ro=class extends ur{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=cr(this,t,n,0)??Ft)===gn)return;let r=this._$AH,s=t===Ft&&r!==Ft||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Ft&&(r===Ft||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},so=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){cr(this,t)}},dc={M:Ba,P:Mn,A:Ua,C:1,L:uc,R:eo,D:ic,V:cr,I:Cr,H:ur,N:no,U:ro,B:to,F:so},u_=Jr.litHtmlPolyfillSupport;u_?.(ns,Cr),(Jr.litHtmlVersions??(Jr.litHtmlVersions=[])).push("3.3.1");var Ze=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Cr(t.insertBefore(es(),o),o,void 0,n??{})}return s._$AI(e),s};var oo="today",pc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Rr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function On(e){return e==="today"?"today":"7d"}function Ha(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function dr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function fc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function _c(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function mc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function gc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var kc=l_(wc(),1);function Lt(e){return(0,kc.default)(`beads-ui:${e}`)}function kn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function fr(e,t){let n=kn(e.created_at),r=kn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ac(e,t){let n=kn(e.created_at),r=kn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function lo(e,t){let n=kn(e.updated_at),r=kn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Sc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=kn(e.created_at),o=kn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ec(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var $_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function $c(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function xc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=$_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Tc(e,t){let n=$c(e),r=$c(t);if(n!==r)return n<r?-1:1;let s=xc(e),o=xc(t);if(s!==o)return s<o?-1:1;let a=kn(e&&e.created_at),i=kn(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var Ga=2**20;function Pr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-kn(e&&e.created_at)}function co(e){return(t,n)=>{let r=Pr(t,e),s=Pr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Ka(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Pr(i,n)-Ga};if(!i)return{rank:Pr(a,n)+Ga};let l=Pr(a,n),u=Pr(i,n),p=(l+u)/2;return l<p&&p<u?{rank:p}:{renormalize:r.map((g,v)=>({bead_id:g.id,rank:v*Ga}))}}function Va(e,t={}){let n=Lt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||fr;function u(){for(let v of Array.from(a))try{v()}catch{}}function p(){s=Array.from(r.values()).sort(l)}function g(v){if(i||!v||v.id!==e)return;let h=Number(v.revision)||0;if(n("apply %s rev=%d",v.type,h),!(h<=o&&v.type!=="snapshot")){if(v.type==="snapshot"){if(h<=o)return;r.clear();let A=Array.isArray(v.issues)?v.issues:[];for(let N of A)N&&typeof N.id=="string"&&N.id.length>0&&r.set(N.id,N);p(),o=h,u();return}if(v.type==="upsert"){let A=v.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let N=r.get(A.id);if(!N)r.set(A.id,A);else{let U=Number.isFinite(N.updated_at)?N.updated_at:0,Z=Number.isFinite(A.updated_at)?A.updated_at:0;if(U<=Z){for(let oe of Object.keys(N))oe in A||delete N[oe];for(let[oe,Y]of Object.entries(A))N[oe]=Y}}p()}o=h,u()}else if(v.type==="delete"){let A=String(v.issue_id||"");A&&(r.delete(A),p()),o=h,u()}}}return{id:e,subscribe(v){return a.add(v),()=>{a.delete(v)}},applyPush:g,snapshot(){return s},size(){return r.size},getById(v){return r.get(v)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function uo(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Cc(e){let t=Lt("subs"),n=new Map,r=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let p=Array.isArray(l.added)?l.added:[],g=Array.isArray(l.updated)?l.updated:[],v=Array.isArray(l.removed)?l.removed:[];for(let h of Array.from(u)){let A=n.get(h);if(!A)continue;let N=A.itemsById;for(let U of p)typeof U=="string"&&U.length>0&&N.set(U,!0);for(let U of g)typeof U=="string"&&U.length>0&&N.set(U,!0);for(let U of v)typeof U=="string"&&U.length>0&&N.delete(U)}}async function o(i,l){let u=uo(l);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let g=n.get(i);if(g&&g.key!==u){let v=r.get(g.key);v&&(v.delete(i),v.size===0&&r.delete(g.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let p=r.get(u);p&&p.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(g){let v=n.get(i)||null;if(v){let h=r.get(v.key);h&&(h.delete(i),h.size===0&&r.delete(v.key))}throw n.delete(i),g}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let g=n.get(i)||null;if(g){let v=r.get(g.key);v&&(v.delete(i),v.size===0&&r.delete(g.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:uo,selectors:{getIds(i){let l=n.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=n.get(i);return u?u.itemsById.has(l):!1},count(i){let l=n.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=n.get(i),u={};if(!l)return u;for(let p of l.itemsById.keys())u[p]=!0;return u}}}}function Rc(){let e=Lt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function a(l,u,p){let g=u?uo(u):"",v=n.get(l)||"",h=t.has(l);if(e("register %s key=%s (prev=%s)",l,g,v),h&&v&&g&&v!==g){let A=t.get(l);if(A)try{A.dispose()}catch{}let N=s.get(l);if(N){try{N()}catch{}s.delete(l)}let U=Va(l,p);t.set(l,U);let Z=U.subscribe(()=>o());s.set(l,Z)}else if(!h){let A=Va(l,p);t.set(l,A);let N=A.subscribe(()=>o());s.set(l,N)}return n.set(l,g),()=>i(l)}function i(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let p=s.get(l);if(p){try{p()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function Oc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Lc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Ic(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ya(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function x_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function A_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Pc(e){let t=Lt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):x_(r),a=A_(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ya(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ya(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var S_=Object.freeze({workspace_config:{default_workspace:null}});function Dc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:S_.workspace_config.default_workspace}}}function Mc(e={}){let t=Lt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Dc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Dc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,p)=>u!==n.workspace.hidden[p]),l=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,p)=>u===n.worker.show_closed_children[p])&&!i&&!l||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Nc(e){let t=Lt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(g,v)=>{let h=s++,A=Date.now();r.set(h,{type:g,start_ts:A}),t("request start id=%d type=%s count=%d",h,g,n+1),a();let N=!1,U=()=>{N||(N=!0,r.delete(h),i())},Z=setTimeout(()=>{N||(t("request TIMEOUT id=%d type=%s elapsed=%dms",h,g,Date.now()-A),U())},3e4);try{let oe=await u(g,v),Y=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",h,g,Y),oe}catch(oe){let Y=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",h,g,Y,oe),oe}finally{clearTimeout(Z),U()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([p,g])=>({id:p,type:g.type,elapsed_ms:u-g.start_ts}))}}}function le(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function po(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Ec),l;switch(i){case"created_desc":return l.sort(fr),l;case"created_asc":return l.sort(Ac),l;case"updated_desc":return l.sort(lo),l;case"priority":return l.sort(Sc),l;case"manual":default:{let u=n();return u?l.sort(co(u)):l.sort(fr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Ln(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Yt(e){let t=Ln(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function on(e,t){let n=Ln(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function qc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Ln(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function fo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function _o(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=fo(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function mo(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=qc(n);return{total:n.length,count:r,current:s,children:n}}function go(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},p=r(Ka(i,l,u.order),a);s(u,p);let g=await t("ui-order-set",{expected_revision:u.revision,entries:p});if(g&&g.conflict){let v={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};n.set(v);let h=r(Ka(i,l,v.order),a);s(v,h);let A=await t("ui-order-set",{expected_revision:v.revision,entries:h});A&&A.applied&&n.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else g&&g.applied&&n.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function Fc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function bo(e,t){let n=Fc(e),r=Fc(t);return n.length===0||r.length===0?!1:n!==r}function ho(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Za(e,t){return!t||typeof e!="string"||e.length===0||ho(t.visible_labels).includes(e)?!0:ho(t.hidden_labels).includes(e)?!1:!ho(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function jc(e,t){return ho(e).filter(n=>Za(n,t))}function Yn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function E_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function T_(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function C_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${E_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function yo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(Tc):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?T_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((l,u)=>C_(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var R_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Uc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Bc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},O_={review:"\u2713",skip:"\u2298"},Zn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function L_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Wc(e){let t=e&&e.fill||"none";return t==="none"?Zn.none:e&&e.stale===!0?Zn.stale:t==="dim"?Zn.dim:e&&e.glyph==="review"?Zn.review:e&&e.glyph==="skip"?Zn.skip:Zn.done}function I_(e){if(!e||e.fill==="none"||!e.approval_state)return Wc(e);let t=[];return e.glyph==="review"?t.push(Zn.review):e.glyph==="skip"&&t.push(Zn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function P_(e,t,n,r){let s=R_[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=O_[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),a&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,p=n?`color: var(--stage-${s}-on)`:"",g=Uc[e]||e,v=r?zc(t):null;if(!v)return c`
      <div class="seg">
        <div class=${l} style=${p}>${i}</div>
        <div class=${u}>${g}</div>
      </div>
    `;let h=`${g} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${v.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${h}
      title=${h}
      @click=${A=>{A.preventDefault(),A.stopPropagation(),r(A,v,e)}}
    >
      <div class=${l} style=${p}>${i}</div>
      <div class=${u}>${g}</div>
    </button>
  `}function zc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function vo(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=Bc[e.route]||Bc.spec_backed,o=e.stages,a=L_(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${Uc[u]||u} ${u==="plan"?I_(o[u]||{}):Wc(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>zc(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>P_(u,o[u]||{},u===a,r))}
    </div>
  `}function D_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Hc=2;function Gc(e){let t=e.slice(0,Hc).join(", "),n=e.length-Hc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function M_(e,t){if(!t)return[];let n=[];if(t.external){let a=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${a}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let a of r)(bo(e,a)?o:s).push(a);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Gc(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Gc(o)}</span
      >`),n}function Xa(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function wo(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Nn(e){return`${e.kind}:${wo(e)}@${e.sha}`}function ko(e,t){if(!e)return null;let n=Xa(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=Xa(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Nn(t)}`:"";return{kind:e.kind,label:i,title:`${l}${u}`}}function Kc(e,t){let n=ko(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function N_(e){if(!e)return null;let t=Xa(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Nn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function q_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Yn(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Yn(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Yn(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Kc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Nn(i)}`}
        >${`exec ${i.kind==="delegated"?wo(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of jc(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Yn(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Yn(n,"blocked")&&s.push(...M_(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Yn(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function F_(e){let t=on(e.created_at),n=on(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
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
  </span>`}function j_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return yo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:F_(e),empty_label:"children \uC5C6\uC74C",childChips:Qa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Qa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return ko(t,n)?c`<span class="board-card__roll-child-chips">
    ${Kc(t,n)}
    ${N_(n)}
  </span>`:null}function $o(e,t){let n=D_(e.priority);return c`
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
      ${q_(e,t)}
      ${e.workflow&&Yn(t.policy||null,"stepper")?vo(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${j_(e,t)}
    </article>
  `}function Dr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${pc.map(o=>c`<option
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
        ${e.items.map(o=>$o(o,t))}
      </div>
    </section>
  `}function Vc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>$o(r,t))}
        </div>
      </div>
    </dialog>
  `}var B_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],U_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],W_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function z_(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function Yc(e,t,n){return c`
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
        ${B_.map(r=>c`<option
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
        ${U_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${z_(e,t,n)}
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
        ${W_.map(r=>c`<option
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
  `}var H_=200,G_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},K_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Zc="beads-ui.board.sort",Xc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function V_(){try{let e=window.localStorage.getItem(Zc);if(e&&Xc.has(e))return e}catch{}return"created_desc"}function Qc(e,t){let n=Lt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,p=t.onNewIssue,g=t.openDoc,v=t.closedRange||oo,h=s?po(s,a):null,A=go({transport:o,uiOrderStore:a}),N=[],U=[],Z=[],oe=[],Y=[],q=[],j=!1,K=0,I=V_(),L=new Map,ne=new Map,Ee=new Map,we=new Set,H={search:"",priority:"",type:"",labels:[]},J=!1,fe=null;function xe(C){return String(C.status||"open")==="open"}function ge(C){let V=String(C.status||"open");return V==="open"||V==="blocked"}function ce(C){let V=H.search.trim().toLowerCase(),de=H.priority,S=H.type,b=H.labels;return C.filter(x=>{if(V){let B=String(x.id||"").toLowerCase(),re=String(x.title||"").toLowerCase();if(!B.includes(V)&&!re.includes(V))return!1}if(de!==""&&String(x.priority)!==de||S!==""&&String(x.issue_type||"")!==S)return!1;if(b.length>0){let B=Array.isArray(x.labels)?x.labels:[];if(!b.some(re=>B.includes(re)))return!1}return!0})}function Ae(){let C=new Set;for(let V of[N,U,Z,oe,Y,q])for(let de of V){let S=Array.isArray(de.labels)?de.labels:[];for(let b of S)typeof b=="string"&&b.length>0&&C.add(b)}return Array.from(C).sort()}function ve(){return H.search.trim()!==""||H.priority!==""||H.type!==""||H.labels.length>0}function G(){try{if(h){let C=h.selectBoardColumn("tab:board:in-progress","in_progress",I),V=h.selectBoardColumn("tab:board:blocked","blocked",I).filter(ge),de=new Set(C.map(Oe=>Oe.id)),S=h.selectBoardColumn("tab:board:ready","ready",I).filter(Oe=>xe(Oe)&&!de.has(Oe.id)),b=h.selectBoardColumn("tab:board:resolved","resolved",I),x=h.selectBoardColumn("tab:board:deferred","deferred",I),B=h.selectBoardColumn("tab:board:closed","closed").slice(0,H_),re=[...V,...S,...C,...b,...B];te(re);let se=new Set;for(let Oe of re)Oe&&Oe.id&&!fo(Oe)&&se.add(Oe.id);let he=!ve();N=he?ss(V,se):V,U=he?ss(S,se):S,Z=he?ss(C,se):C,oe=he?ss(b,se):b,Y=x,K=x.length,q=he?ss(B,se):B,L=new Map;for(let Oe of N)L.set(Oe.id,"open");for(let Oe of U)L.set(Oe.id,"open");for(let Oe of Z)L.set(Oe.id,"in_progress");for(let Oe of oe)L.set(Oe.id,"resolved");for(let Oe of Y)L.set(Oe.id,"deferred");for(let Oe of q)L.set(Oe.id,"closed");ne=new Map;for(let Oe of N)ne.set(Oe.id,"blocked-col");for(let Oe of U)ne.set(Oe.id,"ready-col");for(let Oe of Z)ne.set(Oe.id,"in-progress-col");for(let Oe of oe)ne.set(Oe.id,"resolved-col");for(let Oe of q)ne.set(Oe.id,"closed-col")}Je()}catch{N=[],U=[],Z=[],oe=[],Y=[],q=[],Ee=new Map,Je()}}function te(C){Ee=_o(C)}function ie(C){return mo(Ee,C)}function ke(C){return!we.has(C)}function Ue(C,V){C.preventDefault(),C.stopPropagation(),we.has(V)?we.delete(V):we.add(V),Je()}function _e(C,V){C.preventDefault(),C.stopPropagation(),r(V)}function je(C,V){C.preventDefault(),C.stopPropagation(),r(V)}function M(C,V){fe||r(V)}function me(C,V){C.preventDefault(),C.stopPropagation(),Y_(V).then(de=>{de&&le("\uBCF5\uC0AC\uB428","success",1200)})}function Me(C,V){fe=V,C.dataTransfer&&(C.dataTransfer.setData("text/plain",V),C.dataTransfer.effectAllowed="move"),C.target.classList.add("board-card--dragging")}function Ie(C){C.target.classList.remove("board-card--dragging"),wt(),setTimeout(()=>{fe=null},0)}function We(C){let V=String(C.target.value||"");!V||V===v||(v=V,u&&u(V),Je())}function Pe(){return i?i.get():null}function He(C){let V=l?l.get():null,de=V?V.cleanup_failed:null;if(!de||typeof de!="object"||Array.isArray(de))return null;let S=de[C];return!S||typeof S!="object"||Array.isArray(S)?null:S}let Ye={onCardClick:M,onCopyId:me,onDragStart:Me,onDragEnd:Ie,onClosedRangeChange:We,rollupFor:ie,isExpanded:ke,onRollupToggle:Ue,onChildClick:_e,onFromChipClick:je,onOpenDoc:g?(C,V)=>g(V):void 0,cleanupFailureFor:He,get policy(){return Pe()}};function it(C,V){fe||(be(),r(V))}function ft(C,V){C.preventDefault(),C.stopPropagation(),be(),r(V)}let xt={...Ye,onCardClick:it,onChildClick:ft,onFromChipClick:ft,onOpenDoc:g?(C,V)=>{be(),g(V)}:void 0,get policy(){return Pe()}};function _t(C){let V=C.target,de=e.querySelector(".board-filter__labels");V&&de&&de.contains(V)||Te()}function ee(C){C.key==="Escape"&&Te()}function X(){J||(J=!0,document.addEventListener("mousedown",_t),document.addEventListener("keydown",ee),Je())}function Te(){J&&(J=!1,document.removeEventListener("mousedown",_t),document.removeEventListener("keydown",ee),Je())}function Xe(C){C.key==="Escape"&&be()}function De(){j||(j=!0,document.addEventListener("keydown",Xe),Je())}function be(){j&&(j=!1,document.removeEventListener("keydown",Xe),Je())}let Fe={onClose:be,onOverlayClick(C){C.target===C.currentTarget&&be()}},at={onSearchInput(C){H.search=String(C.target.value||""),G()},onPriorityChange(C){H.priority=String(C.target.value||""),G()},onTypeChange(C){H.type=String(C.target.value||""),G()},onSortChange(C){let V=String(C.target.value||"");if(!(!Xc.has(V)||V===I)){I=V;try{window.localStorage.setItem(Zc,V)}catch{}G()}},onDeferredToggle(){j?be():De()},onLabelMenuToggle(){J?Te():X()},onLabelToggle(C){let V=H.labels.indexOf(C);V===-1?H.labels.push(C):H.labels.splice(V,1),G()},onLabelClear(){H.labels.length!==0&&(H.labels=[],G())},onNewIssue(){p&&p()}};function rt(){return c`
      <div class="board-view">
        ${Yc(H,at,{sort_mode:I,deferred_popup_open:j,deferred_count:K,label_options:Ae(),label_menu_open:J})}
        <div class="board-root">
          ${Dr({title:"Blocked",id:"blocked-col",items:ce(N)},Ye)}
          ${Dr({title:"Ready",id:"ready-col",items:ce(U)},Ye)}
          ${Dr({title:"In progress",id:"in-progress-col",items:ce(Z)},Ye)}
          ${Dr({title:"Resolved",id:"resolved-col",items:ce(oe)},Ye)}
          ${Dr({title:"Closed",id:"closed-col",items:ce(q),is_closed:!0,closed_range:v},Ye)}
        </div>
        ${j?Vc({items:ce(Y),count:K},xt,Fe):""}
      </div>
    `}function Je(){Ze(rt(),e),yt()}function yt(){try{let C=e.querySelector("#deferred-popup");C&&!C.open&&(typeof C.showModal=="function"?C.showModal():C.setAttribute("open",""));let V=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let de of V)Array.from(de.querySelectorAll(".board-card")).forEach((b,x)=>{b.tabIndex=x===0?0:-1})}catch{}}async function It(C,V){if(!o){le("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:C,status:V}),le("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(de){n("update-status failed: %o",de),le("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function vt(C){switch(C){case"blocked-col":return N;case"ready-col":return U;case"in-progress-col":return Z;case"resolved-col":return oe;default:return[]}}function Tt(C,V,de){if(!o||!a)return;let S=vt(C),b=S.find(he=>he.id===V);if(!b)return;let x=S.filter(he=>he.id!==V),B=de.closest?de.closest(".board-card"):null,re=x.length;if(B){let he=B.getAttribute("data-issue-id");if(he===V)return;let Oe=x.findIndex(et=>et.id===he);Oe>=0&&(re=Oe)}let se=x.slice();se.splice(re,0,b),A.applyReorder(V,se,re)}function wt(){for(let C of Array.from(e.querySelectorAll(".board-column--drag-over")))C.classList.remove("board-column--drag-over")}let ze=null;e.addEventListener("dragover",C=>{C.preventDefault(),C.dataTransfer&&(C.dataTransfer.dropEffect="move");let de=C.target.closest(".board-column");de&&de!==ze&&(ze&&ze.classList.remove("board-column--drag-over"),de.classList.add("board-column--drag-over"),ze=de)}),e.addEventListener("dragleave",C=>{let V=C.relatedTarget;(!V||!e.contains(V))&&ze&&(ze.classList.remove("board-column--drag-over"),ze=null)}),e.addEventListener("drop",C=>{C.preventDefault(),ze&&(ze.classList.remove("board-column--drag-over"),ze=null);let V=C.target,de=V.closest(".board-column");if(!de)return;let S=C.dataTransfer?.getData("text/plain")||"";if(!S)return;let b=de.id,x=ne.get(S);if(x&&x===b){if(K_.has(b)){if(I!=="manual"){le("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Tt(b,S,V)}return}let B=G_[b];if(!B){le("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}L.get(S)!==B&&It(S,B)}),e.addEventListener("keydown",C=>{let V=C.target;if(!(V instanceof HTMLElement))return;let de=String(V.tagName||"").toLowerCase();if(de==="input"||de==="textarea"||de==="select"||de==="button"||de==="a"||V.isContentEditable===!0)return;let S=V.closest(".board-card");if(!S)return;let b=String(C.key||"");if(b==="Enter"||b===" "){C.preventDefault();let se=S.getAttribute("data-issue-id");se&&r(se);return}if(b!=="ArrowUp"&&b!=="ArrowDown"&&b!=="ArrowLeft"&&b!=="ArrowRight")return;C.preventDefault();let x=S.closest(".board-column");if(!x)return;let B=Array.from(x.querySelectorAll(".board-card")),re=B.indexOf(S);if(b==="ArrowDown"&&re<B.length-1){Re(S,B[re+1]);return}if(b==="ArrowUp"&&re>0){Re(S,B[re-1]);return}if(b==="ArrowLeft"||b==="ArrowRight"){let se=Array.from(e.querySelectorAll(".board-column")),he=se.indexOf(x),Oe=b==="ArrowRight"?1:-1,et=he+Oe;for(;et>=0&&et<se.length;){let st=se[et].querySelector(".board-card");if(st){Re(S,st);return}et+=Oe}}});function Re(C,V){try{C.tabIndex=-1,V.tabIndex=0,V.focus()}catch{}}let P=null;h&&h.subscribe&&(P=h.subscribe(()=>{try{G()}catch{}}));let Q=null;i&&i.subscribe&&(Q=i.subscribe(()=>{try{G()}catch{}}));let ue=null;return l&&l.subscribe&&(ue=l.subscribe(()=>{Je()})),{async load(){n("load"),G()},clear(){Te(),be(),P&&(P(),P=null),Q&&(Q(),Q=null),ue&&(ue(),ue=null),e.replaceChildren(),N=[],U=[],Z=[],oe=[],Y=[],q=[],L=new Map,ne=new Map}}}function ss(e,t){return e.filter(n=>{let r=fo(n);return!(r&&t.has(r))})}async function Y_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function fn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function _r(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function os(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Z_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${_r(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${_r(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(l=>{let u=p=>{typeof n.close=="function"&&n.close(),n.remove(),l(p)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function qn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await Z_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var X_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Jc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Q_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function zt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Dt(e){return typeof e=="string"&&e.length>0?e:null}function Mr(e){return e.startsWith("gpt-")?e.slice(4):e}function Rt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function tu(e,t,n){let r=Dt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Dt(n[e]);return s===null?null:{value:s,source:"global"}}function as(e,t,n,r){return tu(e,t,n)||{value:r,source:"base"}}function Ja(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&zt(s?.[t])){let a=Dt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&zt(s)){for(let a of Object.values(s))if(zt(a)){let i=Dt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Dt(r?.runners?.[o]?.models?.[e]?.id)||e}function J_(e,t){return Dt(t?.review?.reviewers?.[e]?.model)||e}function Nr(e,t,n=!1){if(e==="default")return Rt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Mr(e):e;return Rt(e,t,r,e,"explicit")}function nu(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];zt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(zt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function em(e,t){let n=[],r=e?.implementation?.model_catalog;zt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(zt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function tm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of em(t,n)){let o=nu(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function ei(e){return Rt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function eu(e,t,n){let r=tu(e,t,n);return r?Nr(r.value,r.source):Rt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function an(e){let t=zt(e.pin)?e.pin:{},n=zt(e.global)?e.global:{},r=zt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&zt(r.session)?r.session:null,o=r?.supported===!0&&zt(r.orchestration)?r.orchestration:null,a=zt(e.runner_catalog)?e.runner_catalog:null,i=Dt(n.quick_fix_impl_model),l=tm(i,s,a),u={};if(s){let p=as("workflow_mode",t,n,Dt(s.workflow_mode_default));u.workflow_mode=p.source==="base"?Rt(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):Nr(p.value,p.source);for(let Y of["spec_review","plan_review","impl_review"]){let q=`${Y}_model`,j=Dt(Y==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),K=as(q,t,n,j);if(K.value===null)u[q]=Rt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(K.value!=="self"&&K.value!=="skip"&&!zt(s.review?.reviewers?.[K.value]))u[q]=ei(Rt(K.value,K.source,"",null,"explicit"));else{let I=J_(K.value,s);u[q]=Rt(K.value,K.source,Mr(I),I,K.source==="base"?"default":"explicit")}}for(let[Y,q]of Object.entries(Jc)){let j=u[q].value;if(j==="self"||j==="skip"){u[Y]=Rt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let K=Dt(s.review?.reviewers?.[j||""]?.effort),I=as(Y,t,n,K);u[Y]=I.value===null?Rt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Rt(I.value,I.source,I.value,I.value,I.source==="base"?"default":"explicit")}let g=zt(s.implementation?.default)?s.implementation.default:{},v=Dt(e.route),h=v!==null&&["quick_fix","spec_backed","full_plan"].includes(v),A=zt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},N=h&&zt(A[v])?A[v]:{};for(let Y of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=as(Y,t,n,Y==="impl_dispatch"?Dt(N.dispatch)||Dt(g.dispatch):Dt(g[Y.replace("impl_","")]));u[Y]=q.value===null?Rt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Rt(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let U=Dt(t.impl_runtime),Z=U==="inherit"?Dt(e.controller_runtime):U,oe=v==="quick_fix"&&Dt(t.impl_dispatch)===null&&l.runtime!==null&&(U===null||Z===l.runtime);if(oe){let Y=l.runtime,q=i;u.impl_dispatch=Rt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),U===null&&(u.impl_runtime=Rt(Y,"global",`${Y} (\uC720\uB3C4)`,Y,"explicit")),Dt(t.impl_model)===null&&(u.impl_model=Rt(q,"global",q,q,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let Y of["impl_runtime","impl_model","impl_effort","impl_speed"])u[Y]=Rt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!oe&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let Y=u.impl_runtime.value==="inherit"?Dt(e.controller_runtime):u.impl_runtime.value,q=Y?nu(Y,s,a):[];if(u.impl_model.value!=="auto"&&q.length>0&&!q.includes(u.impl_model.value))u.impl_model=ei(u.impl_model);else{let j=Ja(u.impl_model.value,Y,s,a);u.impl_model.display=Mr(j),u.impl_model.full_value=j}}if(u.impl_effort.value==="auto"){let Y=Dt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),q=Y?Dt(s.implementation?.effort_by_transport?.[Y]?.auto):null;q&&!Q_.has(q)?(u.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=q,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Rt("default","base","default (\uC77C\uBC18)","default","default"):Nr("default",u.impl_speed.source))}}else for(let p of X_.filter(g=>!g.startsWith("orchestration_")))u[p]=eu(p,t,n);if(!s){for(let[p,g]of Object.entries(Jc))(u[g].value==="self"||u[g].value==="skip")&&(u[p]=Rt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])u[p]=Rt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[p]=eu(p,t,n);continue}let g=p.replace("orchestration_",""),v=Dt(o[g]),h=as(p,t,n,v);if(p==="orchestration_effort"&&h.source==="base"){u[p]=Rt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(h.value===null){u[p]=Rt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let A=h.source==="base"?Dt(o.model_id)||h.value:Ja(h.value,null,s,a);u[p]=Rt(h.value,h.source,Mr(A),A,h.source==="base"?"default":"explicit");continue}if(h.value==="default"){u[p]=h.source==="base"?Rt("default","base","default (\uC77C\uBC18)","default","default"):Nr("default",h.source);continue}u[p]=Nr(h.value,h.source)}if(s)if(i===null){let p=u.orchestration_model.full_value;u.quick_fix_impl_model=Rt(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Mr(p)})`,null,"default")}else if(l.runtime!==null){let p=Ja(i,l.runtime,s,a);u.quick_fix_impl_model=Rt(i,"global",Mr(p),p,"explicit")}else l.offered?u.quick_fix_impl_model=ei(Rt(i,"global","",null,"explicit")):u.quick_fix_impl_model=Nr(i,"global");return u}function nm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function xo(e){let t=zt(e.pin)?e.pin:{},n=zt(e.global)?e.global:{},r=zt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=g=>{let v={...r,...g};return an({pin:e.layer==="pin"?v:t,global:e.layer==="pin"?n:v,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],l=s(o)[e.key],u=Dt(o[e.key]),p=[...e.choices];return u!==null&&!p.includes(u)&&p.unshift(u),{unset_label:nm(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:p.map(g=>{let v=s({...o,[e.key]:g})[e.key];return{value:g,label:v.display,full_value:v.full_value}})}}function qr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let l=!1,u=g=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(g))},p=()=>u(r.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",g=>{g.key==="Enter"&&(g.ctrlKey||g.metaKey)&&(g.preventDefault(),p())}),t.addEventListener("cancel",g=>{g.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function ti(e){return`session:${e.provider}:${e.session_id}`}function is(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function rm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Ao(e,t,n,r){return{attempt_id:ti(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:is(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:rm(e,n)}}}var ni="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",sm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",ru="\uBD84\uD574 \uC5C6\uB294 leg";function Bt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Pn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Fr=[...Pn,"reasoning_output_tokens"],om={codex:["implementation","review-consult"],claude:["subagent"]};function ri(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Pn.some(t=>Number.isFinite(e[t]))}function am(e){return!e||typeof e!="object"?!1:Fr.some(t=>Number.isFinite(e[t]))}function si(e){let t=0;for(let n of Pn)t+=Bt(e?.[n]);return t}function im(e){return!e||typeof e!="object"?!1:Pn.some(t=>Number.isFinite(e[t]))}function su(e){return!e||typeof e!="object"?!1:Fr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function lm(e){let t={};for(let n of Fr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function ou(e){let t={};for(let n of Fr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function au(e,t){return ri(t)?Bt(t.total_tokens):e==="codex"?Bt(t.input_tokens)+Bt(t.output_tokens):si(t)}function cm(e){return e==="claude"?"Claude":"Codex"}function um(e){return`\u03C4 ${lu(e)}`}function dm(e,t){let n=t.breakdown||{},r=Bt(t.total_only_subtotal);if(ri(n)||r>0&&!am(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,sm];return t.replayed&&u.push(ni),u.join(`
`)}let s=[`\uC785\uB825 ${Bt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Bt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Bt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${ru} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",a=r>0?`${o} + ${ru}`:o,l=[e==="claude"?`Claude subtotal = ${a}`:`Codex subtotal = ${a}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(ni),l.join(`
`)}function Zt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${cm(n)} ${um(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:dm(n,r)})}return t}function Eo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal,Number.isFinite(a.total_only_subtotal)&&(i.total_only_subtotal=Bt(i.total_only_subtotal)+Bt(a.total_only_subtotal));for(let l of Fr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=Bt(i.breakdown[l])+Bt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function oi(e){return!e||typeof e!="object"?null:bn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function pm(e){return e==="codex"?"codex":"claude"}function In(){return{subtotal:0,breakdown:lm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function So(e,t,n){e.subtotal+=t.subtotal,ri(t.usage)&&(e.total_only+=t.subtotal);for(let r of Fr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Bt(e.breakdown[r])+Bt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function iu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function lu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function jr(e){return im(e)?`\u03C4 ${lu(si(e))}`:null}function Fn(e){let t=jr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ls(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Bt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Bt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${si(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ni),n.join(`
`)}function bn(e,t){let n={claude:In(),codex:In()},r={orchestrator:{claude:In(),codex:In()},implementation:{claude:In(),codex:In()},"review-consult":{claude:In(),codex:In()},subagent:{claude:In(),codex:In()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(su(l)){let p=pm(i.runner),g=ou(l),v={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:g,subtotal:au(p,g)};g.replayed===!0&&(v.replayed=!0),typeof i.model=="string"&&(v.model=i.model),typeof i.session_id=="string"&&(v.session_id=i.session_id),So(n[p],v,!0),So(r.orchestrator[p],v,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of u){let g=p&&p.provider==="claude"?"claude":"codex";if(!p||p.provider!=="codex"&&p.provider!=="claude"||!om[g].includes(p.role)||!su(p.usage))continue;let v=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!v||s.has(v))continue;s.add(v);let h=ou(p.usage),A={provider:g,role:p.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:au(g,h)};A.receipt_id=v,typeof p.agent_type=="string"&&(A.agent_type=p.agent_type),typeof p.agent_id=="string"&&(A.agent_id=p.agent_id),typeof p.model=="string"&&(A.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(A.effort=p.effort),typeof p.session_id=="string"?A.session_id=p.session_id:typeof p.thread_id=="string"&&(A.session_id=p.thread_id),typeof p.turn_id=="string"&&(A.turn_id=p.turn_id),(typeof p.completed_at=="string"||typeof p.completed_at=="number"&&Number.isFinite(p.completed_at))&&(A.completed_at=p.completed_at),h.replayed===!0&&(A.replayed=!0),So(n[g],A,!1),So(r[A.role][g],A,!1)}}let o={};for(let i of["claude","codex"]){let l=n[i];if(l.legs.length===0)continue;let u=iu(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let p=r[i][u];p.legs.length>0&&(l[u]={...iu(p,!0),legs:p.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:bu,setPrototypeOf:cu,isFrozen:fm,getPrototypeOf:_m,getOwnPropertyDescriptor:mm}=Object,{freeze:en,seal:hn,create:pi}=Object,{apply:fi,construct:_i}=typeof Reflect<"u"&&Reflect;en||(en=function(t){return t});hn||(hn=function(t){return t});fi||(fi=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});_i||(_i=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var To=tn(Array.prototype.forEach),gm=tn(Array.prototype.lastIndexOf),uu=tn(Array.prototype.pop),cs=tn(Array.prototype.push),bm=tn(Array.prototype.splice),Ro=tn(String.prototype.toLowerCase),ai=tn(String.prototype.toString),ii=tn(String.prototype.match),us=tn(String.prototype.replace),hm=tn(String.prototype.indexOf),ym=tn(String.prototype.trim),$n=tn(Object.prototype.hasOwnProperty),Jt=tn(RegExp.prototype.test),ds=vm(TypeError);function tn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return fi(e,t,r)}}function vm(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return _i(e,n)}}function ut(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ro;cu&&cu(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(fm(t)||(t[r]=o),s=o)}e[s]=!0}return e}function wm(e){for(let t=0;t<e.length;t++)$n(e,t)||(e[t]=null);return e}function jn(e){let t=pi(null);for(let[n,r]of bu(e))$n(e,n)&&(Array.isArray(r)?t[n]=wm(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=jn(r):t[n]=r);return t}function ps(e,t){for(;e!==null;){let r=mm(e,t);if(r){if(r.get)return tn(r.get);if(typeof r.value=="function")return tn(r.value)}e=_m(e)}function n(){return null}return n}var du=en(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),li=en(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ci=en(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),km=en(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ui=en(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),$m=en(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),pu=en(["#text"]),fu=en(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),di=en(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),_u=en(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Co=en(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),xm=hn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Am=hn(/<%[\w\W]*|[\w\W]*%>/gm),Sm=hn(/\$\{[\w\W]*/gm),Em=hn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Tm=hn(/^aria-[\-\w]+$/),hu=hn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Cm=hn(/^(?:\w+script|data):/i),Rm=hn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),yu=hn(/^html$/i),Om=hn(/^[a-z][.\w]*(-[.\w]+)+$/i),mu=Object.freeze({__proto__:null,ARIA_ATTR:Tm,ATTR_WHITESPACE:Rm,CUSTOM_ELEMENT:Om,DATA_ATTR:Em,DOCTYPE_NAME:yu,ERB_EXPR:Am,IS_ALLOWED_URI:hu,IS_SCRIPT_OR_DATA:Cm,MUSTACHE_EXPR:xm,TMPLIT_EXPR:Sm}),fs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Lm=function(){return typeof window>"u"?null:window},Im=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},gu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function vu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Lm(),t=Ce=>vu(Ce);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==fs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:v,trustedTypes:h}=e,A=l.prototype,N=ps(A,"cloneNode"),U=ps(A,"remove"),Z=ps(A,"nextSibling"),oe=ps(A,"childNodes"),Y=ps(A,"parentNode");if(typeof a=="function"){let Ce=n.createElement("template");Ce.content&&Ce.content.ownerDocument&&(n=Ce.content.ownerDocument)}let q,j="",{implementation:K,createNodeIterator:I,createDocumentFragment:L,getElementsByTagName:ne}=n,{importNode:Ee}=r,we=gu();t.isSupported=typeof bu=="function"&&typeof Y=="function"&&K&&K.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:H,ERB_EXPR:J,TMPLIT_EXPR:fe,DATA_ATTR:xe,ARIA_ATTR:ge,IS_SCRIPT_OR_DATA:ce,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:ve}=mu,{IS_ALLOWED_URI:G}=mu,te=null,ie=ut({},[...du,...li,...ci,...ui,...pu]),ke=null,Ue=ut({},[...fu,...di,..._u,...Co]),_e=Object.seal(pi(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,M=null,me=Object.seal(pi(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Me=!0,Ie=!0,We=!1,Pe=!0,He=!1,Ye=!0,it=!1,ft=!1,xt=!1,_t=!1,ee=!1,X=!1,Te=!0,Xe=!1,De="user-content-",be=!0,Fe=!1,at={},rt=null,Je=ut({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),yt=null,It=ut({},["audio","video","img","source","image","track"]),vt=null,Tt=ut({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),wt="http://www.w3.org/1998/Math/MathML",ze="http://www.w3.org/2000/svg",Re="http://www.w3.org/1999/xhtml",P=Re,Q=!1,ue=null,C=ut({},[wt,ze,Re],ai),V=ut({},["mi","mo","mn","ms","mtext"]),de=ut({},["annotation-xml"]),S=ut({},["title","style","font","a","script"]),b=null,x=["application/xhtml+xml","text/html"],B="text/html",re=null,se=null,he=n.createElement("form"),Oe=function(R){return R instanceof RegExp||R instanceof Function},et=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(se&&se===R)){if((!R||typeof R!="object")&&(R={}),R=jn(R),b=x.indexOf(R.PARSER_MEDIA_TYPE)===-1?B:R.PARSER_MEDIA_TYPE,re=b==="application/xhtml+xml"?ai:Ro,te=$n(R,"ALLOWED_TAGS")?ut({},R.ALLOWED_TAGS,re):ie,ke=$n(R,"ALLOWED_ATTR")?ut({},R.ALLOWED_ATTR,re):Ue,ue=$n(R,"ALLOWED_NAMESPACES")?ut({},R.ALLOWED_NAMESPACES,ai):C,vt=$n(R,"ADD_URI_SAFE_ATTR")?ut(jn(Tt),R.ADD_URI_SAFE_ATTR,re):Tt,yt=$n(R,"ADD_DATA_URI_TAGS")?ut(jn(It),R.ADD_DATA_URI_TAGS,re):It,rt=$n(R,"FORBID_CONTENTS")?ut({},R.FORBID_CONTENTS,re):Je,je=$n(R,"FORBID_TAGS")?ut({},R.FORBID_TAGS,re):jn({}),M=$n(R,"FORBID_ATTR")?ut({},R.FORBID_ATTR,re):jn({}),at=$n(R,"USE_PROFILES")?R.USE_PROFILES:!1,Me=R.ALLOW_ARIA_ATTR!==!1,Ie=R.ALLOW_DATA_ATTR!==!1,We=R.ALLOW_UNKNOWN_PROTOCOLS||!1,Pe=R.ALLOW_SELF_CLOSE_IN_ATTR!==!1,He=R.SAFE_FOR_TEMPLATES||!1,Ye=R.SAFE_FOR_XML!==!1,it=R.WHOLE_DOCUMENT||!1,_t=R.RETURN_DOM||!1,ee=R.RETURN_DOM_FRAGMENT||!1,X=R.RETURN_TRUSTED_TYPE||!1,xt=R.FORCE_BODY||!1,Te=R.SANITIZE_DOM!==!1,Xe=R.SANITIZE_NAMED_PROPS||!1,be=R.KEEP_CONTENT!==!1,Fe=R.IN_PLACE||!1,G=R.ALLOWED_URI_REGEXP||hu,P=R.NAMESPACE||Re,V=R.MATHML_TEXT_INTEGRATION_POINTS||V,de=R.HTML_INTEGRATION_POINTS||de,_e=R.CUSTOM_ELEMENT_HANDLING||{},R.CUSTOM_ELEMENT_HANDLING&&Oe(R.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(_e.tagNameCheck=R.CUSTOM_ELEMENT_HANDLING.tagNameCheck),R.CUSTOM_ELEMENT_HANDLING&&Oe(R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(_e.attributeNameCheck=R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),R.CUSTOM_ELEMENT_HANDLING&&typeof R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(_e.allowCustomizedBuiltInElements=R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),He&&(Ie=!1),ee&&(_t=!0),at&&(te=ut({},pu),ke=[],at.html===!0&&(ut(te,du),ut(ke,fu)),at.svg===!0&&(ut(te,li),ut(ke,di),ut(ke,Co)),at.svgFilters===!0&&(ut(te,ci),ut(ke,di),ut(ke,Co)),at.mathMl===!0&&(ut(te,ui),ut(ke,_u),ut(ke,Co))),R.ADD_TAGS&&(typeof R.ADD_TAGS=="function"?me.tagCheck=R.ADD_TAGS:(te===ie&&(te=jn(te)),ut(te,R.ADD_TAGS,re))),R.ADD_ATTR&&(typeof R.ADD_ATTR=="function"?me.attributeCheck=R.ADD_ATTR:(ke===Ue&&(ke=jn(ke)),ut(ke,R.ADD_ATTR,re))),R.ADD_URI_SAFE_ATTR&&ut(vt,R.ADD_URI_SAFE_ATTR,re),R.FORBID_CONTENTS&&(rt===Je&&(rt=jn(rt)),ut(rt,R.FORBID_CONTENTS,re)),be&&(te["#text"]=!0),it&&ut(te,["html","head","body"]),te.table&&(ut(te,["tbody"]),delete je.tbody),R.TRUSTED_TYPES_POLICY){if(typeof R.TRUSTED_TYPES_POLICY.createHTML!="function")throw ds('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof R.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ds('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=R.TRUSTED_TYPES_POLICY,j=q.createHTML("")}else q===void 0&&(q=Im(h,s)),q!==null&&typeof j=="string"&&(j=q.createHTML(""));en&&en(R),se=R}},st=ut({},[...li,...ci,...km]),$e=ut({},[...ui,...$m]),ct=function(R){let pe=Y(R);(!pe||!pe.tagName)&&(pe={namespaceURI:P,tagName:"template"});let Se=Ro(R.tagName),dt=Ro(pe.tagName);return ue[R.namespaceURI]?R.namespaceURI===ze?pe.namespaceURI===Re?Se==="svg":pe.namespaceURI===wt?Se==="svg"&&(dt==="annotation-xml"||V[dt]):!!st[Se]:R.namespaceURI===wt?pe.namespaceURI===Re?Se==="math":pe.namespaceURI===ze?Se==="math"&&de[dt]:!!$e[Se]:R.namespaceURI===Re?pe.namespaceURI===ze&&!de[dt]||pe.namespaceURI===wt&&!V[dt]?!1:!$e[Se]&&(S[Se]||!st[Se]):!!(b==="application/xhtml+xml"&&ue[R.namespaceURI]):!1},qt=function(R){cs(t.removed,{element:R});try{Y(R).removeChild(R)}catch{U(R)}},Ct=function(R,pe){try{cs(t.removed,{attribute:pe.getAttributeNode(R),from:pe})}catch{cs(t.removed,{attribute:null,from:pe})}if(pe.removeAttribute(R),R==="is")if(_t||ee)try{qt(pe)}catch{}else try{pe.setAttribute(R,"")}catch{}},cn=function(R){let pe=null,Se=null;if(xt)R="<remove></remove>"+R;else{let gt=ii(R,/^[\r\n\t ]+/);Se=gt&&gt[0]}b==="application/xhtml+xml"&&P===Re&&(R='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+R+"</body></html>");let dt=q?q.createHTML(R):R;if(P===Re)try{pe=new v().parseFromString(dt,b)}catch{}if(!pe||!pe.documentElement){pe=K.createDocument(P,"template",null);try{pe.documentElement.innerHTML=Q?j:dt}catch{}}let At=pe.body||pe.documentElement;return R&&Se&&At.insertBefore(n.createTextNode(Se),At.childNodes[0]||null),P===Re?ne.call(pe,it?"html":"body")[0]:it?pe.documentElement:At},Qt=function(R){return I.call(R.ownerDocument||R,R,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},jt=function(R){return R instanceof g&&(typeof R.nodeName!="string"||typeof R.textContent!="string"||typeof R.removeChild!="function"||!(R.attributes instanceof p)||typeof R.removeAttribute!="function"||typeof R.setAttribute!="function"||typeof R.namespaceURI!="string"||typeof R.insertBefore!="function"||typeof R.hasChildNodes!="function")},Gt=function(R){return typeof i=="function"&&R instanceof i};function Ht(Ce,R,pe){To(Ce,Se=>{Se.call(t,R,pe,se)})}let mt=function(R){let pe=null;if(Ht(we.beforeSanitizeElements,R,null),jt(R))return qt(R),!0;let Se=re(R.nodeName);if(Ht(we.uponSanitizeElement,R,{tagName:Se,allowedTags:te}),Ye&&R.hasChildNodes()&&!Gt(R.firstElementChild)&&Jt(/<[/\w!]/g,R.innerHTML)&&Jt(/<[/\w!]/g,R.textContent)||R.nodeType===fs.progressingInstruction||Ye&&R.nodeType===fs.comment&&Jt(/<[/\w]/g,R.data))return qt(R),!0;if(!(me.tagCheck instanceof Function&&me.tagCheck(Se))&&(!te[Se]||je[Se])){if(!je[Se]&&Ve(Se)&&(_e.tagNameCheck instanceof RegExp&&Jt(_e.tagNameCheck,Se)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(Se)))return!1;if(be&&!rt[Se]){let dt=Y(R)||R.parentNode,At=oe(R)||R.childNodes;if(At&&dt){let gt=At.length;for(let Mt=gt-1;Mt>=0;--Mt){let Ut=N(At[Mt],!0);Ut.__removalCount=(R.__removalCount||0)+1,dt.insertBefore(Ut,Z(R))}}}return qt(R),!0}return R instanceof l&&!ct(R)||(Se==="noscript"||Se==="noembed"||Se==="noframes")&&Jt(/<\/no(script|embed|frames)/i,R.innerHTML)?(qt(R),!0):(He&&R.nodeType===fs.text&&(pe=R.textContent,To([H,J,fe],dt=>{pe=us(pe,dt," ")}),R.textContent!==pe&&(cs(t.removed,{element:R.cloneNode()}),R.textContent=pe)),Ht(we.afterSanitizeElements,R,null),!1)},Wt=function(R,pe,Se){if(Te&&(pe==="id"||pe==="name")&&(Se in n||Se in he))return!1;if(!(Ie&&!M[pe]&&Jt(xe,pe))){if(!(Me&&Jt(ge,pe))){if(!(me.attributeCheck instanceof Function&&me.attributeCheck(pe,R))){if(!ke[pe]||M[pe]){if(!(Ve(R)&&(_e.tagNameCheck instanceof RegExp&&Jt(_e.tagNameCheck,R)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(R))&&(_e.attributeNameCheck instanceof RegExp&&Jt(_e.attributeNameCheck,pe)||_e.attributeNameCheck instanceof Function&&_e.attributeNameCheck(pe,R))||pe==="is"&&_e.allowCustomizedBuiltInElements&&(_e.tagNameCheck instanceof RegExp&&Jt(_e.tagNameCheck,Se)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(Se))))return!1}else if(!vt[pe]){if(!Jt(G,us(Se,Ae,""))){if(!((pe==="src"||pe==="xlink:href"||pe==="href")&&R!=="script"&&hm(Se,"data:")===0&&yt[R])){if(!(We&&!Jt(ce,us(Se,Ae,"")))){if(Se)return!1}}}}}}}return!0},Ve=function(R){return R!=="annotation-xml"&&ii(R,ve)},vn=function(R){Ht(we.beforeSanitizeAttributes,R,null);let{attributes:pe}=R;if(!pe||jt(R))return;let Se={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ke,forceKeepAttr:void 0},dt=pe.length;for(;dt--;){let At=pe[dt],{name:gt,namespaceURI:Mt,value:Ut}=At,Kt=re(gt),rn=Ut,St=gt==="value"?rn:ym(rn);if(Se.attrName=Kt,Se.attrValue=St,Se.keepAttr=!0,Se.forceKeepAttr=void 0,Ht(we.uponSanitizeAttribute,R,Se),St=Se.attrValue,Xe&&(Kt==="id"||Kt==="name")&&(Ct(gt,R),St=De+St),Ye&&Jt(/((--!?|])>)|<\/(style|title|textarea)/i,St)){Ct(gt,R);continue}if(Kt==="attributename"&&ii(St,"href")){Ct(gt,R);continue}if(Se.forceKeepAttr)continue;if(!Se.keepAttr){Ct(gt,R);continue}if(!Pe&&Jt(/\/>/i,St)){Ct(gt,R);continue}He&&To([H,J,fe],dn=>{St=us(St,dn," ")});let un=re(R.nodeName);if(!Wt(un,Kt,St)){Ct(gt,R);continue}if(q&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!Mt)switch(h.getAttributeType(un,Kt)){case"TrustedHTML":{St=q.createHTML(St);break}case"TrustedScriptURL":{St=q.createScriptURL(St);break}}if(St!==rn)try{Mt?R.setAttributeNS(Mt,gt,St):R.setAttribute(gt,St),jt(R)?qt(R):uu(t.removed)}catch{Ct(gt,R)}}Ht(we.afterSanitizeAttributes,R,null)},ot=function Ce(R){let pe=null,Se=Qt(R);for(Ht(we.beforeSanitizeShadowDOM,R,null);pe=Se.nextNode();)Ht(we.uponSanitizeShadowNode,pe,null),mt(pe),vn(pe),pe.content instanceof o&&Ce(pe.content);Ht(we.afterSanitizeShadowDOM,R,null)};return t.sanitize=function(Ce){let R=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},pe=null,Se=null,dt=null,At=null;if(Q=!Ce,Q&&(Ce="<!-->"),typeof Ce!="string"&&!Gt(Ce))if(typeof Ce.toString=="function"){if(Ce=Ce.toString(),typeof Ce!="string")throw ds("dirty is not a string, aborting")}else throw ds("toString is not a function");if(!t.isSupported)return Ce;if(ft||et(R),t.removed=[],typeof Ce=="string"&&(Fe=!1),Fe){if(Ce.nodeName){let Ut=re(Ce.nodeName);if(!te[Ut]||je[Ut])throw ds("root node is forbidden and cannot be sanitized in-place")}}else if(Ce instanceof i)pe=cn("<!---->"),Se=pe.ownerDocument.importNode(Ce,!0),Se.nodeType===fs.element&&Se.nodeName==="BODY"||Se.nodeName==="HTML"?pe=Se:pe.appendChild(Se);else{if(!_t&&!He&&!it&&Ce.indexOf("<")===-1)return q&&X?q.createHTML(Ce):Ce;if(pe=cn(Ce),!pe)return _t?null:X?j:""}pe&&xt&&qt(pe.firstChild);let gt=Qt(Fe?Ce:pe);for(;dt=gt.nextNode();)mt(dt),vn(dt),dt.content instanceof o&&ot(dt.content);if(Fe)return Ce;if(_t){if(ee)for(At=L.call(pe.ownerDocument);pe.firstChild;)At.appendChild(pe.firstChild);else At=pe;return(ke.shadowroot||ke.shadowrootmode)&&(At=Ee.call(r,At,!0)),At}let Mt=it?pe.outerHTML:pe.innerHTML;return it&&te["!doctype"]&&pe.ownerDocument&&pe.ownerDocument.doctype&&pe.ownerDocument.doctype.name&&Jt(yu,pe.ownerDocument.doctype.name)&&(Mt="<!DOCTYPE "+pe.ownerDocument.doctype.name+`>
`+Mt),He&&To([H,J,fe],Ut=>{Mt=us(Mt,Ut," ")}),q&&X?q.createHTML(Mt):Mt},t.setConfig=function(){let Ce=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};et(Ce),ft=!0},t.clearConfig=function(){se=null,ft=!1},t.isValidAttribute=function(Ce,R,pe){se||et({});let Se=re(Ce),dt=re(R);return Wt(Se,dt,pe)},t.addHook=function(Ce,R){typeof R=="function"&&cs(we[Ce],R)},t.removeHook=function(Ce,R){if(R!==void 0){let pe=gm(we[Ce],R);return pe===-1?void 0:bm(we[Ce],pe,1)[0]}return uu(we[Ce])},t.removeHooks=function(Ce){we[Ce]=[]},t.removeAllHooks=function(){we=gu()},t}var wu=vu();var Bn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Oo=e=>(...t)=>({_$litDirective$:e,values:t}),Br=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var _s=class extends Br{constructor(t){if(super(t),this.it=Ft,t.type!==Bn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ft||t==null)return this._t=void 0,this.it=t;if(t===gn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};_s.directiveName="unsafeHTML",_s.resultType=1;var ku=Oo(_s);function hi(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var gr=hi();function Cu(e){gr=e}var hs={exec:()=>null};function bt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(nn.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var Pm=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),nn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Dm=/^(?:[ \t]*(?:\n|$))+/,Mm=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Nm=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ys=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,qm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,yi=/(?:[*+-]|\d{1,9}[.)])/,Ru=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ou=bt(Ru).replace(/bull/g,yi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Fm=bt(Ru).replace(/bull/g,yi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),vi=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,jm=/^[^\n]+/,wi=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Bm=bt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",wi).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Um=bt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,yi).getRegex(),No="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ki=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Wm=bt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ki).replace("tag",No).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Lu=bt(vi).replace("hr",ys).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",No).getRegex(),zm=bt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Lu).getRegex(),$i={blockquote:zm,code:Mm,def:Bm,fences:Nm,heading:qm,hr:ys,html:Wm,lheading:Ou,list:Um,newline:Dm,paragraph:Lu,table:hs,text:jm},$u=bt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ys).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",No).getRegex(),Hm={...$i,lheading:Fm,table:$u,paragraph:bt(vi).replace("hr",ys).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",$u).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",No).getRegex()},Gm={...$i,html:bt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ki).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:hs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:bt(vi).replace("hr",ys).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ou).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Km=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Vm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Iu=/^( {2,}|\\)\n(?!\s*$)/,Ym=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,qo=/[\p{P}\p{S}]/u,xi=/[\s\p{P}\p{S}]/u,Pu=/[^\s\p{P}\p{S}]/u,Zm=bt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,xi).getRegex(),Du=/(?!~)[\p{P}\p{S}]/u,Xm=/(?!~)[\s\p{P}\p{S}]/u,Qm=/(?:[^\s\p{P}\p{S}]|~)/u,Jm=bt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Pm?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Mu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,eg=bt(Mu,"u").replace(/punct/g,qo).getRegex(),tg=bt(Mu,"u").replace(/punct/g,Du).getRegex(),Nu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ng=bt(Nu,"gu").replace(/notPunctSpace/g,Pu).replace(/punctSpace/g,xi).replace(/punct/g,qo).getRegex(),rg=bt(Nu,"gu").replace(/notPunctSpace/g,Qm).replace(/punctSpace/g,Xm).replace(/punct/g,Du).getRegex(),sg=bt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Pu).replace(/punctSpace/g,xi).replace(/punct/g,qo).getRegex(),og=bt(/\\(punct)/,"gu").replace(/punct/g,qo).getRegex(),ag=bt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ig=bt(ki).replace("(?:-->|$)","-->").getRegex(),lg=bt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ig).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Po=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,cg=bt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Po).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),qu=bt(/^!?\[(label)\]\[(ref)\]/).replace("label",Po).replace("ref",wi).getRegex(),Fu=bt(/^!?\[(ref)\](?:\[\])?/).replace("ref",wi).getRegex(),ug=bt("reflink|nolink(?!\\()","g").replace("reflink",qu).replace("nolink",Fu).getRegex(),xu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ai={_backpedal:hs,anyPunctuation:og,autolink:ag,blockSkip:Jm,br:Iu,code:Vm,del:hs,emStrongLDelim:eg,emStrongRDelimAst:ng,emStrongRDelimUnd:sg,escape:Km,link:cg,nolink:Fu,punctuation:Zm,reflink:qu,reflinkSearch:ug,tag:lg,text:Ym,url:hs},dg={...Ai,link:bt(/^!?\[(label)\]\((.*?)\)/).replace("label",Po).getRegex(),reflink:bt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Po).getRegex()},mi={...Ai,emStrongRDelimAst:rg,emStrongLDelim:tg,url:bt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",xu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:bt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",xu).getRegex()},pg={...mi,br:bt(Iu).replace("{2,}","*").getRegex(),text:bt(mi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Lo={normal:$i,gfm:Hm,pedantic:Gm},ms={normal:Ai,gfm:mi,breaks:pg,pedantic:dg},fg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Au=e=>fg[e];function Un(e,t){if(t){if(nn.escapeTest.test(e))return e.replace(nn.escapeReplace,Au)}else if(nn.escapeTestNoEncode.test(e))return e.replace(nn.escapeReplaceNoEncode,Au);return e}function Su(e){try{e=encodeURI(e).replace(nn.percentDecode,"%")}catch{return null}return e}function Eu(e,t){let n=e.replace(nn.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(nn.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(nn.slashPipe,"|");return r}function gs(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function _g(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Tu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,l}function mg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Do=class{constructor(e){Et(this,"options");Et(this,"rules");Et(this,"lexer");this.options=e||gr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:gs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=mg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=gs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:gs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=gs(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))i.push(n[l]),a=!0;else if(!a)i.push(n[l]);else break;n=n.slice(l);let u=i.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${p}`:p;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=g,n.length===0)break;let v=o.at(-1);if(v?.type==="code")break;if(v?.type==="blockquote"){let h=v,A=h.raw+`
`+n.join(`
`),N=this.blockquote(A);o[o.length-1]=N,r=r.substring(0,r.length-h.raw.length)+N.raw,s=s.substring(0,s.length-h.text.length)+N.text;break}else if(v?.type==="list"){let h=v,A=h.raw+`
`+n.join(`
`),N=this.list(A);o[o.length-1]=N,r=r.substring(0,r.length-v.raw.length)+N.raw,s=s.substring(0,s.length-h.raw.length)+N.raw,n=A.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,u="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,N=>" ".repeat(3*N.length)),v=e.split(`
`,1)[0],h=!g.trim(),A=0;if(this.options.pedantic?(A=2,p=g.trimStart()):h?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,p=g.slice(A),A+=t[1].length),h&&this.rules.other.blankLine.test(v)&&(u+=v+`
`,e=e.substring(v.length+1),l=!0),!l){let N=this.rules.other.nextBulletRegex(A),U=this.rules.other.hrRegex(A),Z=this.rules.other.fencesBeginRegex(A),oe=this.rules.other.headingBeginRegex(A),Y=this.rules.other.htmlBeginRegex(A);for(;e;){let q=e.split(`
`,1)[0],j;if(v=q,this.options.pedantic?(v=v.replace(this.rules.other.listReplaceNesting,"  "),j=v):j=v.replace(this.rules.other.tabCharGlobal,"    "),Z.test(v)||oe.test(v)||Y.test(v)||N.test(v)||U.test(v))break;if(j.search(this.rules.other.nonSpaceChar)>=A||!v.trim())p+=`
`+j.slice(A);else{if(h||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Z.test(g)||oe.test(g)||U.test(g))break;p+=`
`+v}!h&&!v.trim()&&(h=!0),u+=q+`
`,e=e.substring(q.length+1),g=j.slice(A)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!s.loose){let u=l.tokens.filter(g=>g.type==="space"),p=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Eu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Eu(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=gs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=_g(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Tu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Tu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let p=[...r[0]][0].length,g=e.slice(0,s+r.index+p+a);if(Math.min(s,a)%2){let h=g.slice(1,-1);return{type:"em",raw:g,text:h,tokens:this.lexer.inlineTokens(h)}}let v=g.slice(2,-2);return{type:"strong",raw:g,text:v,tokens:this.lexer.inlineTokens(v)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},xn=class gi{constructor(t){Et(this,"tokens");Et(this,"options");Et(this,"state");Et(this,"inlineQueue");Et(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||gr,this.options.tokenizer=this.options.tokenizer||new Do,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:nn,block:Lo.normal,inline:ms.normal};this.options.pedantic?(n.block=Lo.pedantic,n.inline=ms.pedantic):this.options.gfm&&(n.block=Lo.gfm,this.options.breaks?n.inline=ms.breaks:n.inline=ms.gfm),this.tokenizer.rules=n}static get rules(){return{block:Lo,inline:ms}}static lex(t,n){return new gi(n).lex(t)}static lexInline(t,n){return new gi(n).inlineTokens(t)}lex(t){t=t.replace(nn.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let p=n.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,i)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let p=1/0,g=t.slice(1),v;this.options.extensions.startInline.forEach(h=>{v=h.call({lexer:this},g),typeof v=="number"&&v>=0&&(p=Math.min(p,v))}),p<1/0&&p>=0&&(u=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):n.push(l);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},Mo=class{constructor(e){Et(this,"options");Et(this,"parser");this.options=e||gr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(nn.notSpaceStart)?.[0],s=e.replace(nn.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Un(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Su(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Un(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Su(e);if(s===null)return Un(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Un(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Un(e.text)}},Si=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},An=class bi{constructor(t){Et(this,"options");Et(this,"renderer");Et(this,"textRenderer");this.options=t||gr,this.options.renderer=this.options.renderer||new Mo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Si}static parse(t,n){return new bi(n).parse(t)}static parseInline(t,n){return new bi(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},Io,bs=(Io=class{constructor(e){Et(this,"options");Et(this,"block");this.options=e||gr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?xn.lex:xn.lexInline}provideParser(){return this.block?An.parse:An.parseInline}},Et(Io,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Et(Io,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Io),gg=class{constructor(...e){Et(this,"defaults",hi());Et(this,"options",this.setOptions);Et(this,"parse",this.parseMarkdown(!0));Et(this,"parseInline",this.parseMarkdown(!1));Et(this,"Parser",An);Et(this,"Renderer",Mo);Et(this,"TextRenderer",Si);Et(this,"Lexer",xn);Et(this,"Tokenizer",Do);Et(this,"Hooks",bs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Mo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],l=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Do(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],l=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new bs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],l=s[a];bs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&bs.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await i.call(s,u);return l.call(s,g)})();let p=i.call(s,u);return l.call(s,p)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let g=await i.apply(s,u);return g===!1&&(g=await l.apply(s,u)),g})();let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return xn.lex(e,t??this.defaults)}parser(e,t){return An.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?xn.lex:xn.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?An.parse:An.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?xn.lex:xn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?An.parse:An.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Un(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},mr=new gg;function ht(e,t){return mr.parse(e,t)}ht.options=ht.setOptions=function(e){return mr.setOptions(e),ht.defaults=mr.defaults,Cu(ht.defaults),ht};ht.getDefaults=hi;ht.defaults=gr;ht.use=function(...e){return mr.use(...e),ht.defaults=mr.defaults,Cu(ht.defaults),ht};ht.walkTokens=function(e,t){return mr.walkTokens(e,t)};ht.parseInline=mr.parseInline;ht.Parser=An;ht.parser=An.parse;ht.Renderer=Mo;ht.TextRenderer=Si;ht.Lexer=xn;ht.lexer=xn.lex;ht.Tokenizer=Do;ht.Hooks=bs;ht.parse=ht;var Zw=ht.options,Xw=ht.setOptions,Qw=ht.use,Jw=ht.walkTokens,ek=ht.parseInline;var tk=An.parse,nk=xn.lex;function Xn(e){let t=ht.parse(e),n=wu.sanitize(t);return ku(n)}function Wn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Ur(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Fo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Bu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},bg={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},hg=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,yg=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Sn(e){return!!e&&typeof e=="object"}function Ei(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ti(e,t){let n=Ei(e),r=Ei(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Uu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Sn(s)&&typeof s.text=="string"?s.text:"").join(""):Sn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function vg(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Bu[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ei(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=Ti(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let l=Ti(Sn(i)?i.old_string:"",Sn(i)?i.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Ci(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var wg=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Wu(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Sn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(wg,"").trim();return n.length>0?{kind:"user",text:n}:null}function Ri(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=hg.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:yg.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function kg(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function $g(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Sn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(Ri(a.text));else if(a.type==="thinking"){let i=Ci(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=vg(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?ju(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let a of s)if(Sn(a)&&a.type==="tool_result"){let i=t.get(String(a.tool_use_id));if(i){let l=Uu(a.content);i.result=l,i.output=typeof a.content=="string"?a.content:l,a.is_error===!0&&(i.is_error=!0)}}let o=Wu(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?ju([s],n):[s]}return[]}function ju(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function xg(e){let t=typeof e.command=="string"?e.command:"",n=Uu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Bu.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Ag(e){if(e.type==="item.completed"&&Sn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ri(t.text)];if(t.type==="user_message"){let n=Wu(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Ci(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[xg(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Sg(e){if(e.schema!=="codex-delegation-monitor-v1"||!Sn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Sn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Ri(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Ci(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=bg[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Eg(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Tg(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Sn(t)?t:null}function zu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Tg(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return kg(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Sg(o):Eg(o)?Ag(o):$g(o,n);return a.length>0&&(r.progress=null),a}}}function Oi(e){let t=[],n=zu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Cg=5,Rg=10,Og=/Task\s+#(\d+)/,Lg=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Ig=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function vs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Pg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Dg(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Mg(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Og.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Ng(e){if(e.tool==="Bash"){let t=e.command||"";return Lg.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Ig.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function qg(e){let t=e.filter(s=>s.kind==="tool").slice(-Rg),n=new Map;t.forEach((s,o)=>{let a=Ng(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Fg(e){let t=Dg(e);if(t)return{text:t,guess:!1};let n=Mg(e);if(n)return{text:n,guess:!1};let r=qg(e);return r?{text:r,guess:!0}:null}function jg(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:on(e,t)}function Wr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,l=null,u=null,p=!1,g={},v=!0,h=new Set,A=new Set,N=null,U=null,Z=!1,oe=!1,Y=!1,q=null,j=null;function K(){Z=!1,oe=!1,Y=!1,q=null,j=null}async function I(ee){if(n){oe=!0,Y=!1,je();try{let X=await Promise.resolve(n("get-attempt-prompt",{attempt_id:ee,...u?{root_dir:u}:{}}));if(o!==ee)return;!X||typeof X!="object"||Array.isArray(X)?Y=!0:(q=X,j=ee)}catch{o===ee&&(Y=!0)}finally{o===ee&&(oe=!1,je())}}}function L(){if(Z=!Z,Z&&o&&j!==o){I(o);return}je()}function ne(){if(!Z)return"";let ee=Ur({loading:oe,error:Y});if(ee)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${ee}
      </div>`;if(!q)return"";if(q.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let X=Fo(q.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${X?c`<div class="prompt-block__meta">${X} 발송</div>`:""}
      ${typeof q.task_prompt=="string"?Wn("\uACFC\uC5C5 (user)",q.task_prompt):""}
      ${typeof q.system_prompt=="string"?Wn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",q.system_prompt):""}
    </div>`}function Ee(){if(!l||!r)return[];let ee=r.get(l);return Oi(ee?ee.lines:[])}function we(){if(!l||!r)return null;let ee=r.get(l),X=ee?ee.last_event_at:null;return typeof X=="number"?X:null}function H(){return g.status==="running"}function J(){if(H()&&o){U||(U=setInterval(()=>je(),1e3));return}fe()}function fe(){U&&(clearInterval(U),U=null)}function xe(ee){let X=[],Te=0;for(;Te<ee.length;){let{idx:Xe,line:De}=ee[Te];if(De.kind==="tool"){let be=Te;for(;be<ee.length&&ee[be].line.kind==="tool"&&ee[be].line.tool===De.tool;)be+=1;if(be-Te>=Cg&&!A.has(Xe)){X.push({kind:"group",idx:Xe,tool:De.tool||"",lines:ee.slice(Te,be)}),Te=be;continue}}X.push({kind:"line",idx:Xe,line:De}),Te+=1}return X}function ge(ee){let X=[],Te=new Map;for(let be=0;be<ee.length;be+=1){let Fe=ee[be],at=Fe.parent_tool_use_id;if(typeof at=="string"&&at.length>0){let rt=Te.get(at);rt||(rt={kind:"subagent",idx:be,launch_id:at,agent_type:null,header:null,lines:[]},Te.set(at,rt),X.push(rt)),rt.lines.push({idx:be,line:Fe});continue}if(Fe.kind==="tool"&&Fe.tool==="Agent"&&typeof Fe.launch_id=="string"&&Fe.launch_id.length>0){let rt=ce(Fe),Je=Te.get(Fe.launch_id);if(Je){Je.header={idx:be,line:Fe},Je.agent_type=rt;continue}let yt={kind:"subagent",idx:be,launch_id:Fe.launch_id,agent_type:rt,header:{idx:be,line:Fe},lines:[]};Te.set(Fe.launch_id,yt),X.push(yt);continue}X.push({kind:"entry",idx:be,line:Fe})}let Xe=[],De=0;for(;De<X.length;){if(X[De].kind!=="entry"){Xe.push(X[De]),De+=1;continue}let be=De;for(;be<X.length&&X[be].kind==="entry";)be+=1;Xe.push(...xe(X.slice(De,be))),De=be}return Xe}function ce(ee){let X=ee.input;return X&&typeof X.subagent_type=="string"?X.subagent_type:null}function Ae(ee){for(let X=ee.length-1;X>=0;X-=1){let Te=ee[X];if(Te.kind==="result"||Te.kind==="error")return null;if(Te.kind==="tool"&&!Object.hasOwn(Te,"result"))return Te}return null}function ve(ee){for(let X=ee.length-1;X>=0;X-=1)if(ee[X].kind==="thinking")return ee[X];return null}function G(ee,X){if(X.kind==="gate")return c`<div class="sv__gate">${X.text}</div>`;if(X.kind==="phase")return c`<div class="sv__phase">${X.text}</div>`;if(X.kind==="result")return c`<div
        class="sv__result${X.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${X.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Xn(X.text||(X.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(X.kind==="thinking"){let Te=h.has(ee);return c`<div
        class="sv__think${Te?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>me(ee)}
      >
        <span class="sv__think-line">💭 ${vs(X.text)}</span>
        ${Te?c`<pre class="sv__think-expand">${X.text}</pre>`:""}
      </div>`}if(X.kind==="user"){let Te=h.has(ee);return c`<div
        class="sv__line sv__line--user${Te?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>me(ee)}
      >
        <span class="sv__user-line">▷ ${vs(X.text)}</span>
        ${Te?c`<pre class="sv__user-expand">${X.text}</pre>`:""}
      </div>`}if(X.kind==="error")return c`<div class="sv__error">⛔ ${X.text}</div>`;if(X.kind==="blocker")return c`<div class="sv__error">⛔ ${X.text}</div>`;if(X.kind==="tool"){let Te=h.has(ee),Xe=X.tool==="Bash"?Pg(X.command):0,De=X.tool==="Bash"?Xe>1?vs(X.command):X.command:X.path||X.command||"";return c`<div
        class="sv__tool${Te?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>me(ee)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${X.icon}</span>
          <span class="sv__tool-name">${X.tool}</span>
          ${De?c`<span class="sv__tool-detail">${De}</span>`:""}
          ${Xe>1?c`<span class="sv__tool-more">⋯ ${Xe}줄</span>`:""}
          ${typeof X.added=="number"?c`<span class="sv__diff-add">+${X.added}</span>`:""}
          ${typeof X.removed=="number"?c`<span class="sv__diff-del">−${X.removed}</span>`:""}
          ${X.result?c`<span class="sv__tool-ok">→ ${X.result}</span>`:""}
        </span>
        ${Te?c`<pre class="sv__tool-expand">${te(X)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Xn(X.text||"")}</div>`}function te(ee){let X=[];if(ee.tool==="Bash"&&typeof ee.command=="string"&&ee.command.length>0)X.push(ee.command);else if(ee.input!==void 0)try{X.push(`input: ${JSON.stringify(ee.input,null,2)}`)}catch{}return typeof ee.output=="string"&&ee.output.length>0&&X.push(`output:
${ee.output}`),X.join(`

`)}function ie(){if(!o)return c``;let ee=Ee(),X=(a?[g.agent_type,g.model,g.effort]:[g.runner,g.model,g.effort]).filter(Boolean).join(" \xB7 "),Te=g.session_id||"",Xe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${v?"ON":"OFF"}`,De=H(),be=De?jg(we(),Date.now()):"",Fe=De?Ae(ee):null,at=De?ve(ee):null,rt=Fg(ee);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${g.label||(a?g.role||"":o)}</span
        >
        ${rt?c`<span
              class="sv__stage${rt.guess?" sv__stage--guess":""}"
              title=${rt.text}
              >${rt.text}</span
            >`:""}
        ${De?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${be?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${be}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${be?c`<span class="sv__live-ago">${be}</span>`:""}</span
            >`:""}
        ${Te?c`<button
              type="button"
              class="sv__session"
              title=${Te}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Te}`}
              @click=${()=>Ie(Te)}
            >
              ⧉ ${Te.slice(0,8)}
            </button>`:""}
        ${g.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${g.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${g.resume_command}`}
              @click=${()=>Ie(g.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${X?c`<span class="sv__meta">${X}</span>`:""}
        ${g.worktree?c`<span class="sv__wt" title=${g.worktree}
              >${g.worktree}</span
            >`:""}
        ${a||p?"":c`<button
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
          class="sv__follow${v?" sv__follow--on":""}"
          aria-pressed=${v?"true":"false"}
          aria-label=${Xe}
          @click=${Me}
        >
          <span class="sv__follow-full">⇣ ${Xe}</span>
          <span class="sv__follow-short">⇣ ${v?"ON":"OFF"}</span>
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
      ${a||p?"":ne()}
      <div class="sv__body">
        ${ee.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ge(ee).map(Je=>Je.kind==="subagent"?Ue(Je):Je.kind==="group"?ke(Je):G(Je.idx,Je.line))}
      </div>
      ${Fe||at?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Fe?c`<span class="sv__now-icon">${Fe.icon}</span>
                  <span class="sv__now-name">${Fe.tool}</span>
                  <span class="sv__now-detail"
                    >${Fe.tool==="Bash"?vs(Fe.command):Fe.path||Fe.command||""}</span
                  >`:""}
            ${at?c`<span class="sv__now-think"
                  >💭 ${vs(at.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ke(ee){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>_e(ee.idx)}
    >
      <span class="sv__group-icon">${ee.lines[0].line.icon}</span>
      <span class="sv__group-name">${ee.tool}</span>
      <span class="sv__group-count">${ee.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ue(ee){let X=A.has(ee.idx),Te=ee.header?ee.header.line:null,Xe=Te?Te.is_error===!0?"\u2717":typeof Te.result=="string"?"\u2713":"\u27F3":"",De=Te&&Te.command?Te.command:"";return c`<div class="sv__sub${X?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>_e(ee.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${ee.agent_type||"subagent"}</span>
        ${De?c`<span class="sv__sub-detail">${De}</span>`:""}
        <span class="sv__sub-count">${ee.lines.length}줄</span>
        ${Xe?c`<span class="sv__sub-state">${Xe}</span>`:""}
        ${X?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${X?c`<div class="sv__sub-body">
            ${xe(ee.lines).map(be=>be.kind==="group"?ke(be):G(be.idx,be.line))}
          </div>`:""}
    </div>`}function _e(ee){A.add(ee),je()}function je(){Ze(ie(),e),J(),v&&M()}function M(){let ee=e.querySelector(".sv__body");ee&&(ee.scrollTop=ee.scrollHeight)}function me(ee){h.has(ee)?h.delete(ee):h.add(ee),je()}function Me(){v=!v,je()}function Ie(ee){fn(ee).then(X=>{X?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function We(ee){!o||!ee||(g={...g,...ee},je())}function Pe(ee){let X=ee.target;if(!X||!X.classList||!X.classList.contains("sv__body"))return;!(X.scrollHeight-X.scrollTop-X.clientHeight<=4)&&v&&(v=!1,je())}e.addEventListener("scroll",Pe,!0);function He(ee){let X=ee.target;!X||typeof X.closest!="function"||e.contains(X)||X.closest("dialog")||X.closest(".md-viewer-root")||_t()}let Ye=!1;function it(){Ye||(document.addEventListener("mousedown",He),Ye=!0)}function ft(){Ye&&(document.removeEventListener("mousedown",He),Ye=!1)}function xt(ee){let X=ee&&ee.attempt_id;if(!X)return;let Te=typeof ee.launch_id=="string"&&ee.launch_id.length>0?ee.launch_id:null,Xe=ee.session_ref&&typeof ee.session_ref=="object"?ee.session_ref:null;if(Te&&Xe)return;let De=l;o=X,a=Te,i=Xe,l=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&De&&De!==l&&Promise.resolve(n("unsubscribe-session-log",{id:De})).catch(()=>{}),u=typeof ee.root_dir=="string"&&ee.root_dir.length>0?ee.root_dir:null,g=ee.meta||{},p=ee.hide_prompt===!0,v=!0,h.clear(),A.clear(),K(),!N&&r&&(N=r.subscribe(je)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{},...i?{session_ref:i}:{},...u?{root_dir:u}:{}})).catch(()=>{}),it(),je()}function _t(){let ee=l;ft(),o=null,a=null,i=null,l=null,u=null,p=!1,h.clear(),A.clear(),K(),fe(),n&&ee&&Promise.resolve(n("unsubscribe-session-log",{id:ee})).catch(()=>{}),Ze(c``,e),s&&s()}return{open:xt,updateMeta:We,close:_t,isOpen(){return o!==null},destroy(){fe(),ft(),N&&(N(),N=null),e.removeEventListener("scroll",Pe,!0),o=null,a=null,i=null,l=null,u=null,p=!1,Ze(c``,e)}}}function jo(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Li(t.spec_id),s=Li(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Li(e){return typeof e=="string"?e.trim():""}function Hu(e){let t=jo(e);if(t.path)return t;let n=Li(Bg(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Bg(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function Ug(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Wg(e){let t=e&&e.metadata||{},n=Hu(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Ug(t)?null:"plan_pending"}),r}function Gu(e,t){let n=Wg(e);return c`
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
  `}var zg="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Hg=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Gg=/^\*\*결론\*\* — (.+)$/;function Bo(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==zg)return null;let n=Hg.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Gg.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var Ku=20;function Vu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Kg(e){return e.length>Ku?`${e.slice(0,Ku)}\u2026`:e}function Vg(e,t,n,r){let s=`${t.lane} ${Kg(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Vu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${Xn(t.body)}
        </div>`:""}
  </div>`}function Yg(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Vu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Xn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Yu(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=Bo(typeof l.text=="string"?l.text:"");return u?Vg(l,u,t,s.has(l.id)):Yg(l)})}
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
  `}var{I:Nk}=dc;var Zu=e=>e.strings===void 0;var Zg={},Xu=(e,t=Zg)=>e._$AH=t;var br=Oo(class extends Br{constructor(e){if(super(e),e.type!==Bn.PROPERTY&&e.type!==Bn.ATTRIBUTE&&e.type!==Bn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Zu(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===gn||t===Ft)return t;let n=e.element,r=e.name;if(e.type===Bn.PROPERTY){if(t===n[r])return gn}else if(e.type===Bn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return gn}else if(e.type===Bn.ATTRIBUTE&&n.getAttribute(r)===t+"")return gn;return Xu(e),t}});var Uo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Pi=[...Uo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],zn=["orchestration_model","orchestration_effort","orchestration_speed"],Wo=[...Uo,...zn],Xg=Pi.filter(e=>Wo.includes(e)),Qu=["delegated","main"],zo=["inherit","claude","codex"],ws=["default","fast"],ks=["standard","fast_track"],$s=["codex","opus","fable","self","skip"],Ho=["codex","fable","skip"],Go=["low","medium","high","xhigh"],mn="auto";function _n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ju(e){if(!_n(e)||!_n(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))_n(r)&&_n(r.models)&&t.push([n,Object.keys(r.models)]);return t}function zr(e,t){let n=Ju(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[mn,...r.flatMap(([,s])=>s)]}function ed(e,t,n,r){if(!_n(e)||!_n(e.runners))return[mn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!_n(a)||!_n(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,l]of Object.entries(a.models)){if(n&&n!==mn&&i!==n)continue;let u=r(a,l);if(Array.isArray(u))for(let p of u)typeof p=="string"&&!s.includes(p)&&s.push(p)}return[mn,...s]}function Hr(e,t,n){return ed(e,t,n,(r,s)=>_n(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Di(e,t,n){return ed(e,t,n,(r,s)=>_n(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:_n(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function xs(e,t){let n=Ju(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function td(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!zr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Hr(t,s,r.impl_model||mn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Qg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ii=[...Xg,...zn],Jg=[...Wo,...Pi].filter((e,t,n)=>n.indexOf(e)===t&&!Ii.includes(e));function nd(e,t){let n=_n(e)?e:{},r=_n(t)?t:{},s=[];for(let a of Ii){let i=n[a]??null,l=r[a]??null;i!==l&&s.push({key:a,label:Qg[a]||a,before:i,after:l,kind:i===null?"added":l===null?"removed":"changed"})}let o=[];for(let a of[...Jg,...Object.keys(r)])!Ii.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Mi(e,t,n,r,s,o){return xo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function rd(e,t){let n={};for(let r of Pi){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function sd(e,t){let n={};for(let r of zn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Ni=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...zn]}],Qn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Ko={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function qi(e,t,n,r,s,o=null){let a=an({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function od(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of qi(e,t,n,r,s,o))a[i.source]+=1;return a}function ad(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function id(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Vk=[...Uo,...zn];var eb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Fi={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},ld={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},tb={pin:"pin",global:"global",base:"base"};function nb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${tb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function rb(e,t,n){switch(e){case"workflow_mode":return ks;case"spec_review_model":case"impl_review_model":return $s;case"plan_review_model":return Ho;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Go;case"impl_dispatch":return Qu;case"impl_runtime":return zo;case"impl_model":return zr(n,t.impl_runtime);case"impl_effort":return Hr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return ws;case"orchestration_model":return xs(n,null);case"orchestration_effort":return Hr(n,void 0,t.orchestration_model||mn).filter(r=>r!==mn);default:return[]}}function sb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${nb(e.source)}
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
      >${Ko[e.source]}</span
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
  </div>`}function cd(e,t){let n=Ni.flatMap(l=>l.keys),r=qi(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=od(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),a=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
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
        >${ob(o)}</span
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
          ${Ni.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let p=xo({key:u.key,choices:rb(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return sb(u,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
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
  </details>`}function ob(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function ab(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function ud(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=ab(n.exec_receipt),l=i?Nn(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],p=ko(n.planned_execution,n.exec_receipt),g=n.chips?.pr?.number,v=typeof g=="number"?`PR #${g}`:"PR";return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${v}</a
          >`:""}
      ${p?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
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
      ${ib(s).map(h=>lb(h,t,r,{label:h.id==="pr"?v:h.label,href:h.id==="pr"?o:""}))}
    </div>
  </section>`}function ib(e){let n=typeof e=="string"&&Object.hasOwn(Fi,e)&&Fi[e]||Fi.spec_backed;return eb.filter(r=>n.includes(r.id))}var Vo={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function lb(e,t,n,r){let s=cb(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,l=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,p=s&&s.split("@")[1]?.slice(0,7)||"",g=u?Vo.stale:i?Vo.on:l?Vo.current:Vo.none,v=ub(e,n),h=`${r.label} \xB7 ${g}${v?` \xB7 ${v}`:""}${s?` \xB7 ${s}`:""}`,A=`detail-summary__gate${i?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${p?" detail-summary__gate--receipt":""}`,N=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${p}</span>`;return r.href?c`<a
      class=${A}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${h}
      >${N}</a
    >`:c`<span
    class=${A}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${h}
    >${N}</span
  >`}function cb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function ub(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(ld,n)?ld[n]:""}function Yo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function dd(e){return Yo(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function pd(e,t){let n=e&&e[t];if(!Yo(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(dd),s=dd(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function md(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Zo(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${md(e)}${t}`}function Gr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${md(e)}`}function db(e,t,n){if(n!==null){let s=e==="claude"?Zo:Gr,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Gr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function fd(e,t){if(!Yo(e)||e.state!=="usable"||!Yo(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function _d(e){let t=e.provider_key==="claude"?Zo:Gr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${db(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function gd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${_d({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:pd(t,"claude"),selected:s,workspace_default:fd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${_d({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:pd(t,"codex"),selected:o,workspace_default:fd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var bd=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function As(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Xo(e){if(!As(e)||!As(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>As(n)&&As(n.models));return t.length>0?t:null}function En(e,t){let n=Xo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function hd(e,t){return As(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function yd(e,t){let n=Xo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return hd(r,r.models[t]);return[]}function pb(e){let t=Xo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of hd(r,s))n.includes(o)||n.push(o);return n}function fb(e,t){if(!t)return pb(e);let r=Xo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of yd(e,o))s.includes(a)||s.push(a);return s}function vd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=En(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?yd(t,r.impl_model):fb(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function _b(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function mb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Qo(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,l="";function u(N){N.key==="Escape"&&s&&(N.preventDefault(),h())}document.addEventListener("keydown",u);function p(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${_b(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${l}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${i===null?null:c`<pre class="mv__front">
${i}</pre
                        >`}${Xn(a)}`}
          </div>
        </div>
      </div>
    `:c``}function g(){Ze(p(),e)}async function v(N,U={}){s=N,o="loading",a="",i=null,l="",g();let Z=U.workspace||(n?n():"");if(!Z){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",g();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",g();return}let oe="/api/doc?workspace="+encodeURIComponent(Z)+"&path="+encodeURIComponent(N);try{let Y=await r(oe),q=await Y.json().catch(()=>({}));if(!Y.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&U.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",g();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||Y.status)+")",g();return}let j=mb(String(q.content||""));i=j.front,a=j.body,o="ready",g()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",g()}}function h(){s=null,Ze(c``,e)}function A(){document.removeEventListener("keydown",u),h()}return{open:v,close:h,destroy:A}}var gb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],$d="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Jo=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],bb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function wd(e){return typeof e=="string"&&bb.has(e)}var hb=["running","done","failed","interrupted"],yb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function vb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function wb(e){let t=Zt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=jr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${$d}
          >부분 집계</span
        >`:""}`}function kd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ui(e){if(typeof e=="number")return Ss(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ss(t):""}function kb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function $b(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function ji(e){return e===null||typeof e=="string"&&e.trim().length>0}function Bi(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function xb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Jo.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?ji(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||ji(t.effort))||!(!("agent_type"in t)||ji(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!hb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Bi(t.started_at)||!Bi(t.last_event_at)||!Bi(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Ab(e,t,n){let s=Zt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Ui(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Ui(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Sb(e,t,n,r){let s=e.status==="running"?null:t,a=(s?Zt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Ss(e.last_event_at):s?Ui(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,kb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=$b(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${yb[e.status]}</span
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
  </button>`}function Eb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Tb(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let g=xb(p);!g||s.has(g.launch_id)||wd(g.agent_type)||(s.add(g.launch_id),r.push(g))}r.sort((p,g)=>(p.started_at||0)-(g.started_at||0));let a={};for(let{role:p,provider:g}of Jo){let v=t?t.roles[p]?.[g]:null;a[p]=v?[...v.legs]:[]}let i=Jo.flatMap(({role:p})=>a[p]),l=new Set,u=[];for(let{role:p,provider:g}of Jo){for(let v of r.filter(h=>h.role===p&&h.provider===g)){let h=i.find(A=>A.receipt_id===v.launch_id)||null;h&&!Eb(v,h)||(h&&l.add(h.receipt_id),u.push(Sb(v,h,e.attempt_id,n)))}for(let v of a[p])!l.has(v.receipt_id)&&!wd(v.agent_type)&&u.push(Ab(p,g,v))}return u}function Cb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...gb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${vb(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${$d}</span>`:""}
  </div>`}var Rb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ss(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Ob(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Lb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Ib(e,t){let n=Lb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${ti(e)}
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
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function xd(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],a=[...o.filter(h=>h&&h.current===!0),...o.filter(h=>h&&h.current!==!0).sort((h,A)=>A.index-h.index)],i=a.map(h=>Ib(h,t)),l=n.expanded||new Set;if(s.length===0&&a.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let h of s)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&u.add(h.resumed_from);let p=h=>{if(!(h.status==="failed"||h.status==="orphaned"))return"";let N=typeof h.session_id=="string"&&h.session_id.length>0,U=u.has(h.attempt_id),Z=N&&!U,oe=N?U?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${h.attempt_id}
      ?disabled=${!Z}
      title=${oe}
      @click=${Y=>{Y.stopPropagation(),Z&&t.onResume&&t.onResume(h.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},g=h=>{if(!(h.status==="failed"||h.status==="orphaned")||typeof h.cause!="string"||h.cause==="")return"";let N=h.cause_detail,U=N&&typeof N.reason=="string"&&N.reason.length>0?typeof N.command=="string"&&N.command.length>0?`${N.reason} \xB7 ${N.command}`:N.reason:h.cause;return c`<div class="detail-session__cause" title=${U}>
      ${h.cause}
    </div>`},v=h=>{let A=kd(oi(h));if(Zt(A).length===0&&!jr(h.usage))return"";let N=l.has(h.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${h.attempt_id}
      aria-expanded=${N?"true":"false"}
      title=${N?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${U=>{U.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(h.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${wb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${i}${s.map(h=>{let A=oi(h),N=kd(A),U=Zt(N);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${h.status||"unknown"}"
            data-attempt-id=${h.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(h.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Rb[h.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${h.attempt_id}</span>
            ${os(h)?c`<span
                  class="detail-session__resumed"
                  title=${os(h)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${_r(h)}</span>
            ${U.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${h.session_id?c`<span class="detail-session__sid" title=${h.session_id}
                  >${String(h.session_id).slice(0,8)}</span
                >`:""}
            ${U.length>0?U.map(Z=>c`<span
                      class="detail-session__usage"
                      title=${Z.tooltip}
                      >${Z.label}</span
                    >`):jr(h.usage)?c`<span class="detail-session__usage"
                    >${jr(h.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ss(h.started_at)}</span>
          </button>
          ${v(h)} ${p(h)} ${g(h)} ${Ob(h)}
          ${l.has(h.attempt_id)&&h.usage?Cb(h.usage,h.runner==="codex"?"codex":"claude"):""}
          ${Tb(h,A,t)}
        </div>`})}
    </div>
  `}function Ad(e,t={}){return c`
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
          ${Pb(e)}
        </div>`:""}
  `}function Pb(e){let t=Ur(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Wn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Fo(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Wn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Wn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Db=["open","in_progress","deferred","resolved","closed"],Mb=[0,1,2,3,4];function Sd(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,p=null,g={},v="",h=!1,A=[],N=!1,U={},Z={claude:null,codex:null},oe=null,Y=null,q=0,j=!1,K=!1,I="",L="",ne="";function Ee(){j=!1,K=!1,I="",L="",ne=""}function we(){Z={claude:null,codex:null},oe=null,Y=null,q+=1}async function H(){if(!s)return null;try{let y=await Promise.resolve(s("get-workspace-accounts",{}));return y&&typeof y.state=="string"?y:null}catch{return null}}async function J(y){try{let O=await fetch(y);if(!O.ok)return null;let E=await O.json();if(!E||typeof E!="object"||!Array.isArray(E.accounts))return null;let ye=E.accounts.filter(tt=>tt!==null&&typeof tt=="object"&&!Array.isArray(tt));return{accounts:ye,active:ye.find(tt=>tt.active===!0)||null}}catch{return null}}async function fe(y){Y=y;let O=++q,[E,ye,tt]=await Promise.all([J("/api/claude-usage"),J("/api/codex-usage"),H()]);O!==q||y!==u||(Z={claude:E,codex:ye},oe=tt,W())}let xe=[],ge=null,ce=null,Ae=!1,ve="",G=!1,te=0,ie=new Set;function ke(){xe=[],ge=null,ce=null,Ae=!1,ve="",G=!1,te+=1,ie.clear()}async function Ue(y){if(!s)return;let O=++te;try{let E=await Promise.resolve(s("get-comments",{id:y}));if(O!==te||y!==u)return;xe=Array.isArray(E)?E:[],Ae=!1}catch{if(O!==te||y!==u)return;Ae=!0}W()}function _e(){if(!s||!u)return;let y=p&&typeof p.comment_count=="number"?p.comment_count:null;if(ge!==u){ge=u,ce=y,Ue(u);return}y!==null&&y!==ce&&(ce=y,Ue(u))}function je(y){ie.has(y)?ie.delete(y):ie.add(y),W()}function M(y){let O=ve.trim().length===0;ve=y,O!==(y.trim().length===0)&&W()}async function me(){let y=ve.trim();if(!s||!u||y.length===0||G)return;let O=u;G=!0,W();let E=!1;try{let ye=await Promise.resolve(s("add-comment",{id:O,text:y}));Array.isArray(ye)&&ye.length>0&&(E=!0,O===u&&(xe=ye,Ae=!1,ve="",ce=ye.length))}catch{E=!1}E||le("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),O===u&&(G=!1),W()}let Me={onToggle:je,onDraftInput:M,onSubmit:me},Ie=t.mdViewer||null,We=null;Ie||(We=document.createElement("div"),We.className="md-viewer-root",document.body.appendChild(We));let Pe=Ie||Qo(We,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),He=document.createElement("div");He.className="session-log-root",document.body.appendChild(He);let Ye=Wr(He,{transport:s?(y,O)=>Promise.resolve(s(y,O)):void 0,sessionLogStore:l}),it=!1,ft=!1,xt=!1,_t=null,ee=null,X=0;function Te(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function Xe(){it=!1,ft=!1,xt=!1,_t=null,ee=null,X+=1}async function De(y){if(!s)return;let O=++X;ft=!0,xt=!1,W();try{let E=await Promise.resolve(s("get-bead-prompt",{bead_id:y}));if(O!==X)return;!E||typeof E!="object"||Array.isArray(E)?xt=!0:(_t=E,ee=Te(y))}catch{O===X&&(xt=!0)}finally{O===X&&(ft=!1,W())}}let be=[],Fe=null,at=0;function rt(y,O){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}::${O}`}function Je(){be=[],Fe=null,at+=1}async function yt(y,O){if(!s)return;let E=++at,ye;try{ye=await Promise.resolve(s("get-session-refs",{bead_id:y}))}catch{ye=null}E!==at||O!==Fe||(be=ye&&Array.isArray(ye.sessions)?ye.sessions:[],W())}function It(){if(!s||!u)return;let y=p&&p.metadata,O=y&&typeof y=="object"&&typeof y.session_ref=="string"?y.session_ref:null;if(O===null){Je();return}let E=rt(u,O);Fe!==E&&(be=[],Fe=E,yt(u,E))}function vt(){if(it=!it,it&&u&&ee!==Te(u)){_t=null,De(u);return}W()}function Tt(){if(!a||!u)return[];let y=a.get();return(y&&y.attempts?Object.values(y.attempts):[]).filter(E=>E&&E.bead_id===u).sort((E,ye)=>(ye.started_at||0)-(E.started_at||0)).map(E=>({attempt_id:E.attempt_id,bead_id:E.bead_id,status:E.status,started_at:typeof E.started_at=="number"?E.started_at:null,runner:E.runner||null,model:E.model||null,effort:E.effort||E.observed_effort||null,speed:E.speed||null,session_id:E.session_id||null,resumed_from:E.resumed_from||null,continuation_mode:E.continuation_mode||null,dismissed_at:typeof E.dismissed_at=="number"?E.dismissed_at:null,cause:typeof E.cause=="string"?E.cause:null,cause_detail:E.cause_detail||null,exec_default_preset_id:typeof E.exec_default_preset_id=="string"?E.exec_default_preset_id:null,exec_default_preset_revision:typeof E.exec_default_preset_revision=="number"?E.exec_default_preset_revision:null,exec_values:E.exec_values&&typeof E.exec_values=="object"?E.exec_values:null,usage:E.usage||null,usage_legs:Array.isArray(E.usage_legs)?E.usage_legs:[],delegation_sessions:Array.isArray(E.delegation_sessions)?E.delegation_sessions:[]}))}function wt(){if(!a||!u)return null;let y=a.get();return bn(y&&y.attempts||{},u)}let ze=new Set;function Re(y){ze.has(y)?ze.delete(y):ze.add(y),W()}function P(y){let O=a?a.get():null,E=O&&O.attempts?O.attempts[y]:null;Ye.open({attempt_id:y,meta:E?{runner:E.runner||void 0,model:E.model||void 0,effort:E.effort||void 0,status:E.status||void 0,session_id:E.session_id||void 0}:{}})}function Q(y,O){let E=a?a.get():null,ye=E&&E.attempts?E.attempts[y]:null,nt=(ye&&Array.isArray(ye.delegation_sessions)?ye.delegation_sessions:[]).find(lt=>lt&&typeof lt=="object"&&lt.launch_id===O);nt&&Ye.open({attempt_id:y,launch_id:O,meta:{runner:nt.provider==="claude"?"claude":"codex",role:nt.role,...typeof nt.agent_type=="string"?{agent_type:nt.agent_type}:{},model:nt.model,effort:nt.effort,session_id:nt.session_id,status:nt.status}})}async function ue(y){if(!s||!y)return;let O=await qr();if(O===null)return;let E=()=>{let lt=a?a.get():null;return lt&&typeof lt.revision=="number"?lt.revision:0},ye=async(lt={},Ge=E())=>await s("worker-attempt-resume",{attempt_id:y,expected_revision:Ge,...O!==""?{instructions:O}:{},...lt}),tt=lt=>{lt?.queue&&a?.set&&a.set(lt.queue)},nt=await ye();if(tt(nt),nt&&nt.conflict){let lt=nt.queue&&typeof nt.queue.revision=="number"?nt.queue.revision:E();nt=await ye({},lt),tt(nt)}nt=await qn(nt,(lt,Ge)=>ye({continuation:lt,decision_token:Ge}),{onResult:tt,refresh:()=>ye()}),nt&&nt.resumed===!1&&!nt.conflict&&nt.reason&&le(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${nt.reason}`,"error",2400)}function C(y){!y||!u||Ye.open(Ao(y,u,p&&p.status))}let V={onOpen:P,onOpenDelegation:Q,onResume:ue,onToggleUsage:Re,onOpenSessionRef:C,onCopyResumeCommand:Ct};function de(){let y=a?a.get():null,O={...U};for(let E of["orchestration_model","orchestration_effort","orchestration_speed"]){let ye=y&&y[E];typeof ye=="string"&&(O[E]=ye)}return O}async function S(){if(s){try{let y=await Promise.resolve(s("get-session-defaults",{}));U=y&&y.values&&typeof y.values=="object"?y.values:{}}catch{U={}}W()}}function b(){let y=a?a.get():null;return y&&y.runner_catalog||null}function x(){let y=a?a.get():null;return y&&typeof y.execution_defaults=="object"?y.execution_defaults:null}function B(){let y=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},E=an({pin:{...y,...g},global:de(),execution_defaults:x(),runner_catalog:b(),route:typeof y.route=="string"?y.route:null}).orchestration_model.value||"";return En(b(),E)}function re(){let y=i?i.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function se(y){return y?.compatible===!1}function he(y){i&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&i.set({revision:y.revision,presets:y.presets})}async function Oe(){let y=re(),O=y?.presets.find(E=>E.id===v);if(!(!s||!u||!y||!O||se(O)||h)){h=!0,A=[],W();try{let E=await Promise.resolve(s("apply-impl-preset",id(u,O.id,y.revision)));if(E&&E.conflict){he(E),le("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ye=E&&Array.isArray(E.issue)?E.issue[0]:E?.issue;if(E&&E.applied&&ye&&typeof ye=="object"){p=ye,A=Array.isArray(E.skipped_orchestration_keys)?E.skipped_orchestration_keys.filter(tt=>typeof tt=="string"):[];for(let tt of bd)delete g[tt];le(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}E&&E.error==="bd_readback_failed"?le("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):le("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(E){E&&typeof E=="object"&&E.code==="bd_readback_failed"?le("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):le("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{h=!1,W()}}}let et=null;n&&n.subscribe&&(et=n.subscribe(()=>qt()));let st=null;a&&typeof a.subscribe=="function"&&(st=a.subscribe(()=>{u&&W()}));let $e=null;i&&typeof i.subscribe=="function"&&($e=i.subscribe(()=>{u&&W()}));function ct(y){y.key==="Escape"&&u&&(y.preventDefault(),r())}document.addEventListener("keydown",ct);function qt(){if(u){if(n&&typeof n.snapshotFor=="function"){let y=n.snapshotFor("detail:"+u)||[];p=y.find(E=>E&&E.id===u)||y[0]||p}_e(),It(),W()}}function Ct(y){fn(y).then(O=>{O?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function cn(y){y.preventDefault(),y.stopPropagation(),u&&Ct(u)}function Qt(y,O){y.preventDefault(),y.stopPropagation(),Ct(O)}function jt(y,O,E){y.preventDefault(),y.stopPropagation(),Pe.open(O,{missing_state:E})}function Gt(y,O){g[y]=O,W(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",ad(u,y,O.length===0?null:O))).catch(()=>{le("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Ht(y,O){let E=p||{},ye=E.metadata&&typeof E.metadata=="object"?E.metadata:{},tt={};for(let Ge of["impl_runtime","impl_model","impl_effort"])tt[Ge]=Object.hasOwn(g,Ge)?g[Ge]:typeof ye[Ge]=="string"?ye[Ge]:"";tt[y]=O;let nt=vd(tt,b(),B()),lt={};for(let Ge of["impl_runtime","impl_model","impl_effort"])lt[Ge]=g[Ge],g[Ge]=nt[Ge]||"";W(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...nt,orchestration_runtime:B()})).then(Ge=>{let Pt=Array.isArray(Ge)?Ge[0]:Ge;if(!Pt||typeof Pt!="object"||!Pt.id)throw new Error("implementation target readback failed");p=Pt;for(let Vt of["impl_runtime","impl_model","impl_effort"])delete g[Vt];W()}).catch(()=>{for(let Ge of["impl_runtime","impl_model","impl_effort"])lt[Ge]===void 0?delete g[Ge]:g[Ge]=lt[Ge];W(),le("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function mt(y,O,E){if(!s||!u)return!1;try{let ye=await Promise.resolve(s(y,O)),tt=Array.isArray(ye)?ye[0]:ye;return tt&&typeof tt=="object"&&tt.id?(p=tt,!0):(le(E,"error"),!1)}catch{return le(E,"error"),!1}}function Wt(y){setTimeout(()=>{try{let O=e.querySelector(y);O&&typeof O.focus=="function"&&O.focus()}catch{}},0)}function Ve(){j=!0,I=p&&p.title||"",W(),Wt('.detail-edit__input[data-edit="title"]')}function vn(y){I=y.target.value}function ot(){j=!1,I="",W()}function Ce(){mt("edit-text",{id:u,field:"title",value:I},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(O=>{O&&(j=!1,I=""),W()})}function R(){K=!0,L=p&&p.description||"",W(),Wt('.detail-edit__textarea[data-edit="description"]')}function pe(y){L=y.target.value}function Se(){K=!1,L="",W()}function dt(){mt("edit-text",{id:u,field:"description",value:L},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(O=>{O&&(K=!1,L=""),W()})}function At(y,O,E,ye){if(y.key==="Escape"){y.stopPropagation(),E();return}y.key==="Enter"&&(!ye||y.ctrlKey||y.metaKey)&&(y.preventDefault(),O())}function gt(y){let O=y.target.value;mt("update-status",{id:u,status:O},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>W())}function Mt(y){let O=Number(y.target.value);mt("update-priority",{id:u,priority:O},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>W())}function Ut(y){ne=y.target.value}function Kt(){let y=ne.trim();y.length!==0&&mt("label-add",{id:u,label:y},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(O=>{O&&(ne=""),W()})}function rn(y){if(y.key==="Escape"){y.stopPropagation(),ne="",W();return}y.key==="Enter"&&(y.preventDefault(),Kt())}function St(y){mt("label-remove",{id:u,label:y},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>W())}let un={onCopyPath:Qt,onOpenDoc:jt};function dn(y){return typeof y=="string"?y:y&&typeof y=="object"?String(y.id||y.to||y.issue_id||y.depends_on||""):""}function Hn(y){switch(y&&typeof y=="object"?String(y.dependency_type||y.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function T(y){let E=(Array.isArray(y.dependencies)?y.dependencies:[]).map(ye=>({id:dn(ye),icon:Hn(ye)})).filter(ye=>ye.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${E.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${E.map(ye=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(ye.id)}
                  >
                    ${ye.icon?`${ye.icon} `:""}${ye.id}
                  </button>`:c`<span class="detail-dep"
                    >${ye.icon?`${ye.icon} `:""}${ye.id}</span
                  >`)}
          </div>`}
    `}function D(y){let O=y.metadata||{},E=y.workflow||{},ye=E.stages||{},tt=ye.spec&&ye.spec.stale,nt=ye.impl&&ye.impl.stale,lt=E.quick_fix_review?.state==="stale",Ge=ye.plan||null,Pt=E.route_source==="derived",Vt=E.route||O.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Pt?" detail-kv__v--derived":""}"
          title=${Pt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Pt?"unset":Vt}</span
        >
      </div>
      ${E.route!=="quick_fix"||Object.hasOwn(O,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${O.spec_review||"\uC5C6\uC74C"}${tt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${E.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ge?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ge?.approval_receipt||"\uC5C6\uC74C"}${Ge?.approval_state==="stale"?" \xB7 stale":Ge?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${E.route!=="quick_fix"||Object.hasOwn(O,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${O.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${E.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${E.resolver.attempt} \xB7 ${E.resolver.prior_sha} \u2192 ${E.resolver.sha}`}
              >${`${E.resolver.prior_sha.slice(0,7)} \u2192 ${E.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${E.route==="quick_fix"||Object.hasOwn(O,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${O.quick_fix_review||"\uC5C6\uC74C"}${lt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${E.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${E.planned_execution.kind}</span>
            </div>
            ${E.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${E.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${E.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Nn(E.exec_receipt)}</span
            >
          </div>`:""}
      ${E.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${E.impl_entry.actor}@${E.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${O.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${O.pr_url}</span>
          </div>`:""}
    `}let Le={route:["quick_fix","spec_backed","full_plan"]};async function Be(y,O){let E=O.target.value;if(y==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&E!=="full_plan"&&!window.confirm(`full_plan \u2192 ${E||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){W();return}await mt("update-workflow-meta",{id:u,key:y,value:E},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),W()}function Qe(y){let O=y.metadata||{};return c` ${((ye,tt)=>{let nt=Le[ye],lt=typeof O[ye]=="string"?O[ye]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ye}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ye}
          data-edit=${`wfmeta-${ye}`}
          @change=${Ge=>Be(ye,Ge)}
        >
          <option value="" ?selected=${!nt.includes(lt)}>
            ${tt}
          </option>
          ${nt.map(Ge=>c`<option value=${Ge} ?selected=${lt===Ge}>${Ge}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function _(y,O){return j?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${I}
            @input=${vn}
            @keydown=${E=>At(E,Ce,ot,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ce}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${ot}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${y}</h2>
        ${Zt(O).map(E=>c`<span class="detail-usage-total" title=${E.tooltip}
              >${E.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ve}
        >
          ✎
        </button>
      </div>
    `}function k(y){let O=Yt(y.created_at),E=Yt(y.updated_at);return!O&&!E?c``:c`
      ${O?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${O}</span>
          </div>`:""}
      ${E?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
    `}function d(y,O){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${gt}
        >
          ${Db.map(E=>c`<option value=${E} ?selected=${E===y}>${E}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Mt}
        >
          ${Mb.map(E=>c`<option value=${String(E)} ?selected=${E===O}>
                P${E}
              </option>`)}
        </select>
      </div>
    `}function f(y){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${K?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${R}
            >
              ✎
            </button>`}
      </div>
      ${K?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${L}
              @input=${pe}
              @keydown=${O=>At(O,dt,Se,!0)}
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
                @click=${Se}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${y||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function w(y){let O=typeof y.notes=="string"?y.notes:"";return O.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${O}</div>
    `}function $(y){let O=Array.isArray(y.labels)?y.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${O.map(E=>c`<span class="detail-label-chip"
              >${E}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${E}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+E}
                @click=${()=>St(E)}
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
            @input=${Ut}
            @keydown=${rn}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Kt}
          >
            추가
          </button>
        </span>
      </div>
    `}function z(){if(!u)return c``;let y=p||{},O=String(y.id||u),E=y.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ye=wt(),tt=y.status||"open",nt=typeof y.priority=="number"?Math.max(0,Math.min(4,y.priority)):"",lt=y.description||"",Ge={...y,metadata:{...y.metadata||{},...g}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${cn}
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
          ${_(E,ye)}
          ${ud(Ge)}
          ${cd({metadata:Ge.metadata,workspace_values:de(),catalog:b(),execution_defaults:x(),expanded:N,presets:re()?.presets||[],preset_id:v,preset_busy:h,skipped_orchestration_keys:A},{onToggle:Pt=>{N=Pt,W()},onEdit:(Pt,Vt)=>{if(Pt==="impl_runtime"||Pt==="impl_model"||Pt==="impl_effort"){Ht(Pt,Vt??"");return}Gt(Pt,Vt??"")},onPresetSelect:Pt=>{v=Pt,A=[],W()},onPresetApply:()=>{Oe()}})}
          ${gd({md:Ge.metadata,catalog:Z,workspace_defaults:oe,handlers:{onExecChange:Gt}})}
          ${d(tt,nt)} ${k(y)}
          ${f(lt)}
          ${Yu(xe,Me,{expanded:ie,draft:ve,sending:G,error:Ae})}
          ${w(y)} ${$(y)} ${T(y)}
          ${D(y)} ${Qe(y)}
          ${Gu(y,un)}
          ${Ad({expanded:it,loading:ft,error:xt,data:_t},{onToggle:vt})}
          ${xd(Tt(),V,{total:ye,expanded:ze},be)}
        </div>
      </div>
    `}function W(){Ze(z(),e)}return{load(y){y!==u&&(g={},v="",A=[],N=!1,Ee(),ke(),Xe(),Je(),we()),u=y,p=null,qt(),S(),Y!==y&&fe(y)},clear(){u=null,p=null,g={},v="",h=!1,A=[],N=!1,Ee(),ke(),Xe(),Je(),we(),Pe.close(),Ye.close(),Ze(c``,e)},destroy(){et&&(et(),et=null),st&&(st(),st=null),$e&&($e(),$e=null),document.removeEventListener("keydown",ct),Ie||(Pe.destroy(),We&&We.parentNode&&We.parentNode.removeChild(We)),Ye.destroy(),He.parentNode&&He.parentNode.removeChild(He),u=null,p=null,we(),v="",h=!1,A=[],ke(),Xe(),Je(),Ze(c``,e)}}}function Ed(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,p,g="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let v=typeof g=="string"?g.trim():"";if(s&&(v.length>0?(s.textContent=v,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function ea(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Ts(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function ta(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function na(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function ra(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Nb(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:ea(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Td(e,t){let n=Nb(e,t);return n?c`<button
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
            >${ra(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Ts(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Kr(e){let t=on(e.created_at),n=on(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Yt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Yt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function qb(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Cs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function sa(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Tn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(g=>g&&g.bead_id===t&&g.phase!=="done").sort((g,v)=>(g.requested_at||0)-(v.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?qb(s.phase):null,u=s?.kind==="stale_work_backup_fresh",p=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:p}}function Es(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
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
  </div>`}var Fb={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Cd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Fb[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function oa(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function jb(e){return c`<div
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
  </div>`}function aa(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.overlaps)?e.overlaps:[],r=e.scope_missing===!0,s=e.popover||null,o=e.cross_lane||null;return t.length===0&&n.length===0&&!r&&!o?"":c`<div class="worker-deps">
    ${o?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${o.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${o.label}
        </button>`:""}
    ${t.map(a=>c`<span
          class=${`worker-dep worker-dep--pred${a.foreign?" worker-dep--foreign":""}`}
          title=${a.title||""}
          >${a.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${a.id}
                data-root-dir=${a.root_dir||""}
              >
                ${a.label}
              </button>`:a.label}</span
        >`)}${n.map(a=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${a.id}
          aria-label=${`scope \uACB9\uCE68 ${a.id} (${a.location_label})`}
          title=${[`\uACB9\uCE68 ${a.id} (${a.location_label})`,...a.prefixes].join(`
`)}
        >
          ⧉ ${a.id}
        </button>`)}${r?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${s?jb(s):""}
  </div>`}function ia(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Bb(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function Rd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function la(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Ub(e){let t=Array.isArray(e.badges)?e.badges:[],n=Zt(e.usage),r=Fn(e.usage),s=on(e.done_at);return c`<div
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
              >`):r?c`<span class="worker-usage" title=${ls(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${Ts(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Jn(e){if(e.lane==="done"&&e.done_layout==="three_line")return Ub(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Zt(e.usage),s=Fn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?on(e.done_at):"",u=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",v=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",h=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,A=e.lane==="done"?"":ia(e.workflow),N=e.lane==="done"?"":Rd(e.from_id),U=la(e.priority),Z=c`<span class="worker-mini__title">${e.title}</span>`,oe=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",Y=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",q=n.map(ie=>ie===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ie}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ie===e.completion_badge&&e.completion_title||""}
          >${ie}</span
        >`),j=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",K=r.length>0?r.map(ie=>c`<span class="worker-usage" title=${ie.tooltip}
              >${ie.label}</span
            >`):s?c`<span class="worker-usage" title=${ls(e.usage)}
            >${s}</span
          >`:"",I=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",L=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",ne=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Ee=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",we=e.discard,H=we?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${we?.attempt_id||""}
          data-operation-id=${we?.operation?.operation_id||""}
          data-discard-mode=${we?.confirmation||"unmerged"}
          ?disabled=${we?!we.enabled:e.discard_enabled===!1}
          title=${we?we.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${we?.label||"\uD3D0\uAE30"}
        </button>`:"",J=e.stale_work||null,fe=J?c`${J.can_resume||J.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${J.action_id}
            ?disabled=${J.locked}
          >
            기존 작업 이어가기
          </button>`:""}${J.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${J.action_id}
            ?disabled=${J.locked}
          >
            백업 후 새로 시작
          </button>`:""}${J.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${J.action_id}
            ?disabled=${J.locked}
          >
            다시 확인
          </button>`:""}`:"",xe=J?c`<div class="worker-mini__stale">
        <strong>${J.title}</strong>
        <span>${J.summary}</span>
        <span>${J.cause}</span>
        ${J.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ge=e.revise_action?c`<button
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
        </button>`:"",ce=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Ae=v||A||N||ce||K?c`<div class="worker-chips">
          ${v}${A}${N}${ce?oa(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${K}
        </div>`:"",ve=aa(e.dependency_chips),G=Es(e),te=!!(o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||we?.operation||e.revise_action||J);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">
            ${v}${h}${U}${N}${Z}
          </div>
          <div class="worker-mini__row2">
            ${K}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Yt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Ts(e.work_ms)}</span
                >`:""}${q}${I}
            <span class="worker-mini__actions"
              >${L}${ne}${Ee}${H}</span
            >
            ${Kr(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${u}${p}${h}${U}${oe}${Y}${q}${g}${j}
            </div>
            <div class="worker-mini__body">${Z}${xe}</div>
            ${ve}${Ae}${te?c`<div class="worker-mini__foot">
                  ${I}
                  <span class="worker-mini__actions"
                    >${L}${ne}${Ee}${H}${ge}${fe}</span
                  >
                  ${Es(e)}
                </div>`:""}
            ${Kr(e)}`:c`<div class="worker-mini__line">
              ${u}${p}${h}${U}${Z}${oe}${Y}${q}${g}${j}${I}${L}${ne}${Ee}${H}
            </div>
            ${ve}${Ae}${G} ${Kr(e)}`}
  </div>`}function Wb(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var zb={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50"};function Wi(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.session_preferred===!0,i=zb[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),p=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),g=aa(e.dependency_chips),v=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",h=ia(l),A=Rd(e.from_id),N=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${la(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:a?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${i}
              >세션 권장</span
            >`:""}${Bb(l)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${l?vo(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${g}
    ${v||h||A||N?c`<div class="worker-chips">
          ${v}${h}${A}${oa(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason||n.dep_action===!0?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${Wb(t.lanes,e.id)}
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
    ${Kr(e)}
  </div>`}function yn(e){let t=!!e.collapsible&&!!e.collapsed,n=c`<span
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?Wi(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Jn(r))}
          </div>`}
  </section>`}function ca(e){return e.replace(/\/+$/,"")}function Hb(e,t){let n=ca(e),r=ca(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ua(e,t){let n=new Set;for(let r of e)for(let s of t){if(!Hb(r,s))continue;let o=ca(r),a=ca(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}function Ld(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let l=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:l})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let l=ua(s[a].scope,s[i].scope);if(l.length===0)continue;let u=s[a].member,p=s[i].member;n.get(u.id)?.overlaps.push({id:p.id,title:p.title,location_label:p.location_label,prefixes:l}),n.get(p.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var Od=["parallel","serial","candidate"];function Rs(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function zi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=Od.includes(r.kind),l=Od.includes(s.kind);if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&l&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&l&&a===null){let u=Gb(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:`${Rs(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Rs(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Gb(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Id={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Pd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Dd(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Hi(e){for(let t of Dd(e))if(Object.hasOwn(Id,t))return Id[t];return null}function Gi(e){let t=null;for(let n of Dd(e))Object.hasOwn(Pd,n)&&(t=Pd[n]);return t}function da(e){let t=Hi(e),n=Gi(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Md(e,t){let n=Hi(e)??Hi(t),r=Gi(t)??Gi(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Nd=160;function Kb(e){return e.length>Nd?`${e.slice(0,Nd)}\u2026`:e}function Vb(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${Kb(e.command)}</code>`:""}
  </div>`}function Yb(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Zb(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function qd(e){let t=e.failure?da(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${Vb(e.failure.cause_detail,e.failure.reason)}
          ${Yb(e.failure.reason)}
          ${Es({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Xb(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Qb=new Set(["codex-runner"]);function Jb(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(h=>h&&!(typeof h.agent_type=="string"&&Qb.has(h.agent_type))),l=i.filter(h=>h&&h.state==="live"),u=i.filter(h=>h&&h.state!=="live"),p=r&&typeof r.last_event_at=="number"?on(r.last_event_at,t):"",g=r?on(r.updated_at,t):"",v=p?`\uCD5C\uADFC \uD65C\uB3D9 ${p}`:g?`\uAC31\uC2E0 ${g}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?c`<span class="rtile__activity-age"
              >${on(a,t)}</span
            >`:""}
      </div>`:v?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${v}</span>
        </div>`:""}${l.length>0||u.length>0?c`<div class="rtile__legs">
        ${l.map(h=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${h.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(h=>h.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var eh={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function th(e){if(!e)return"";let t=eh[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Ki(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(J=>J&&J.current===!0)||null,a=e.failed===!0,i=!!e.paused,l=a?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):i?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Zb(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,p=os(e),g=Zt(e.usage),v=Fn(e.usage),h=e.conflict_resolution?i?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,A=e.base_exception||null,N=e.landing,U=e.attempt_id&&e.attempt_id===n,Z=r.monitor||null,oe=Xb(Z),Y=Z?aa(Z.dependency_chips):"",q=Jb(Z,t,i,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),j=s&&e.workflow?.chips?.exec_receipt||null,K=ia(e.workflow),I=j?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Nn(j)}`}
        >${`${j.kind}:${wo(j)}`}</span
      >`:"",L=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${is(o)}</span
      >`:"",ne=oe||K||L||I?c`<div class="rtile__meta">
          ${oe}${K}${L}${I}
        </div>`:"",Ee=c`${h?c`<span class="worker-mini__badge">${h}</span>`:""}${A?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${A}</span
      >`:""}`,we=s?"":Kr(e),H=e.discard?.action?c`<button
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
      ${la(e.priority)}${p?c`<span class="rtile__resumed" title=${p}>↻</span>`:""}${Ee}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${th(o)}<span
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
                ${H}
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
                ${H}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${q}${e.rollup?yo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Qa}):""}
    ${N?c`<div class="rtile__landing">
          <span
            class="merge-step${N.failed?" merge-step--failed":""}"
            style=${`--progress: ${N.percent}%`}
            >${N.label}${N.index>0?c`<span class="merge-step__n"
                  >${N.index}/${N.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${Y}
    ${s?ne:oe||K||u||g.length>0||v?c`<div class="rtile__meta">
            ${oe}${K}${oa(e.exec_chips)}
            ${g.length>0?g.map(J=>c`<span class="worker-usage" title=${J.tooltip}
                      >${J.label}</span
                    >`):v?c`<span
                    class="worker-usage"
                    title=${ls(e.usage)}
                    >${v}</span
                  >`:""}
          </div>`:""}
    ${Es(e)} ${we}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${a||i?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Vi(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Ki(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var Yi=new Set(["unavailable","not_applicable"]);function er(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Fd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function tr(e,t){return t===null?null:`${Qn[e]}: ${t.display} (${Ko[t.source]})`}function Zi(e){return e.filter(t=>t!==null).join(`
`)}function Os(e){if(typeof e!="object"||e===null)return null;let t=_r(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Zi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Qn.orchestration_model,e.model),n(Qn.orchestration_effort,e.effort),n(Qn.orchestration_speed,e.speed)])}}function hr(e,t){let n=er(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=er(e,"orchestration_effort"),s=er(e,"orchestration_speed"),o=Fd([En(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Zi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",tr("orchestration_model",n),tr("orchestration_effort",r),tr("orchestration_speed",s)])}}function nh(e,t){return e===null||e.value===null||Yi.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function rh(e){return e===null||Yi.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function sh(e){return e===null?null:e.value==="auto"?"auto":Yi.has(e.resolution)?null:e.display}function nr(e,t){if(typeof e!="object"||e===null)return null;let n=er(e,"impl_dispatch"),r=er(e,"impl_runtime"),s=er(e,"impl_model"),o=er(e,"impl_effort"),a=er(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":Fd([nh(r,t??null),rh(s),sh(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Zi(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",tr("impl_dispatch",n),tr("impl_runtime",r),tr("impl_model",s),tr("impl_effort",o),tr("impl_speed",a)])}}var Xt="",oh=["impl_runtime","impl_model","impl_effort"],ah=["claude_account","codex_account"],ih=5,pa=1;function ln(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function fa(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(P=>le(P,"error",4e3)),o={},a={},i=[],l=!1,u={state:"absent",values:{},warnings:[]},p={},g={},v=Promise.resolve(),h={claude:null,codex:null},A=!1,N=null,U={},Z="",oe="",Y=!1,q=!1,j=!1,K=null,I=!1;function L(){let P=t.queue?t.queue():null;return ln(P)?P:null}function ne(){let P=L();return P?P.runner_catalog:null}function Ee(){let P=L();return P&&ln(P.execution_defaults)?P.execution_defaults:null}function we(){let P=t.implPresetStore?.get();return ln(P)&&Array.isArray(P.presets)?P:null}function H(){return r===null?{}:{root_dir:r}}async function J(P,Q){return I||!n?null:await n(P,Q)}function fe(P){P&&ln(P.queue)&&t.onQueueAdopt?.(P.queue)}async function xe(P,Q){let ue=L();if(!ue||I)return null;let C=await J(P,{...Q,...H(),expected_revision:ue.revision});if(fe(C),r!==null&&C&&C.conflict){let V=C.queue&&typeof C.queue.revision=="number"?C.queue.revision:L()?.revision??ue.revision;C=await J(P,{...Q,...H(),expected_revision:V}),fe(C)}return C}async function ge(){l=!0,Re();try{let P=await J("get-session-defaults",{...H()});o=ln(P?.values)?{...P.values}:{},a={...o},i=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{l=!1,Re()}}async function ce(){let P=rd(o,a);if(Object.keys(P).length!==0){try{let Q=await J("set-session-defaults",{values:P,...H()});o=ln(Q?.values)?{...Q.values}:{},a={...o},i=Array.isArray(Q?.warnings)?Q.warnings:[]}catch(Q){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Re()}}function Ae(P,Q){if(!ln(P))return;let ue=P.state;u={state:ue==="usable"||ue==="unusable"||ue==="absent"?ue:"absent",values:ln(P.values)?{...P.values}:{},warnings:Array.isArray(P.warnings)?P.warnings:[]},g={...u.values},Q&&(p={...g})}async function ve(){try{Ae(await J("get-workspace-accounts",{...H()}),!0)}catch(P){u={state:"unusable",values:{},warnings:["kv_read_failed"]},g={},p={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}Re()}async function G(P){try{let Q=await fetch(P);if(!Q.ok)return null;let ue=await Q.json();if(!ln(ue)||!Array.isArray(ue.accounts))return null;let C=ue.accounts.filter(V=>ln(V)&&typeof V.key=="string"&&V.key.length>0&&typeof V.email=="string"&&V.email.length>0);return{accounts:C,active:C.find(V=>V.active===!0)||null}}catch{return null}}async function te(){A=!0;let[P,Q]=await Promise.all([G("/api/claude-usage"),G("/api/codex-usage")]);I||(h={claude:P,codex:Q},Re())}function ie(){let P={};for(let Q of ah){let ue=Object.hasOwn(p,Q)?p[Q]:null,C=Object.hasOwn(g,Q)?g[Q]:null;ue!==C&&(P[Q]=ue)}return P}async function ke(){let P=ie();if(Object.keys(P).length!==0){try{Ae(await J("set-workspace-accounts",{values:P,...H()}),!1)}catch(Q){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Re()}}function Ue(P,Q){Q===Xt?delete p[P]:p[P]=Q,Re(),v=v.then(()=>ke())}function _e(P,Q){if(oh.includes(P)){me(P,Q);return}Q===Xt?delete a[P]:a[P]=Q,Re(),ce()}function je(){let P=wt().orchestration_model,Q=an({global:{orchestration_model:P??void 0},execution_defaults:Ee(),runner_catalog:ne()}).orchestration_model.value;return Q?En(ne(),Q):null}function M(P,Q){typeof Q=="string"&&Q.length>0?a[P]=Q:delete a[P]}function me(P,Q){let ue=Q===Xt?void 0:Q,C=td({impl_runtime:P==="impl_runtime"?ue:a.impl_runtime,impl_model:P==="impl_model"?ue:a.impl_model,impl_effort:P==="impl_effort"?ue:a.impl_effort},ne(),je());M("impl_runtime",C.impl_runtime),M("impl_model",C.impl_model),M("impl_effort",C.impl_effort),Re(),ce()}async function Me(){let P=L();if(!P)return;let Q={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},ue=sd(Q,{...Q,...U});if(Object.keys(ue).length!==0){try{let C=await xe("worker-queue-set-orchestration-defaults",{values:ue});if(C&&C.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}U={}}catch(C){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}Re()}}function Ie(P,Q){U[P]=Q===Xt?null:Q,Re(),Me()}function We(P){if(N=P,!P){Re();return}let Q=ne(),ue=wt(),C=ue.orchestration_model;C&&!xs(Q,P).includes(C)&&(U.orchestration_model=null,C=null);let V=ue.orchestration_effort;V&&!Di(Q,P,C||mn).includes(V)&&(U.orchestration_effort=null),Re(),Me()}async function Pe(P){if(!(!L()||P<pa)){try{await xe("worker-queue-set-slots",{slots:P})}catch(Q){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Re()}}async function He(P){if(!(!L()||P<pa||P>ih)){try{await xe("worker-queue-set-serial-lane-count",{count:P})}catch(Q){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Re()}}async function Ye(P,Q){let ue=P==="auto_advance"?"worker-automation-toggle":P==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await xe(ue,{on:Q})}catch(C){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}Re()}function it(){let P={},Q=wt();for(let ue of Wo){let C=zn.includes(ue)?Q[ue]:a[ue];typeof C=="string"&&C.length>0&&(P[ue]=C)}return P}async function ft(){let P=we();if(!P)return;let Q=it();if(Object.keys(Q).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ue=(P.presets||[]).find(V=>V.id===Z),C=oe.trim()||(ue?ue.name:"");if(!C){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let V=ue?await J("impl-preset-update",{expected_revision:P.revision,id:ue.id,name:C,settings:Q}):await J("impl-preset-create",{expected_revision:P.revision,name:C,settings:Q});if(V&&V.applied){if(oe="",!ue&&Array.isArray(V.presets)){let de=V.presets.find(S=>S.name===C);Z=de?de.id:Z}Re()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Re()}catch(V){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}}async function xt(){let P=we();if(!(!P||Z.length===0))try{let Q=await J("impl-preset-delete",{expected_revision:P.revision,id:Z});Q&&Q.applied?(Z="",Re()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Re())}catch(Q){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}}function _t(P){o=ln(P.values)?{...P.values}:{},a={...o},i=Array.isArray(P.warnings)?P.warnings:[],ln(P.queue)&&(t.onQueueAdopt?.(P.queue),U={})}async function ee(){let P=we(),Q=L();if(!P||!Q||Z.length===0)return;let ue=C=>({preset_id:Z,expected_revision:P.revision,expected_queue_revision:C,...H()});try{let C=await J("apply-impl-preset-global",ue(Q.revision));if(C&&C.applied&&_t(C),r!==null&&C&&C.queue_applied===!1){let V=C.queue&&typeof C.queue.revision=="number"?C.queue.revision:L()?.revision??Q.revision;C=await J("apply-impl-preset-global",ue(V)),C&&C.applied&&_t(C)}C&&C.applied?C.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):C&&C.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(C){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}Re()}async function X(){q=!0,j=!1,Re();try{let P=await J("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?j=!0:K=P}catch{j=!0}finally{q=!1,Re()}}function Te(){if(Y=!Y,Y&&!K){X();return}Re()}function Xe(){let P=Ur({loading:q,error:j});if(P)return P;if(!K)return"";let Q=Array.isArray(K.variants)?K.variants:[];return c`<div class="settings-dialog__sp-body">
      ${K.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${K.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Q.map(ue=>c`<div class="settings-dialog__sp-variant" data-variant=${ue.key}>
            <div class="settings-dialog__sp-cond">${ue.condition}</div>
            ${Wn(ue.label,ue.system_prompt)}
          </div>`)}
    </div>`}function De(){return c`<section
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
        aria-expanded=${Y?"true":"false"}
        @click=${Te}
      >
        ${Y?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Y?Xe():""}
    </section>`}function be(P,Q,ue,C,V,de,S){let b=V[P]??Xt,x=Mi(P,ue,V,Ee(),ne(),S),B=x.options.find(se=>se.value===b),re=b===Xt?x.full_value:B?.full_value;return c`<select
        class=${b===Xt?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${Q}
        title=${re||""}
        ?disabled=${de===!0||x.disabled}
        .value=${br(String(b))}
        @change=${se=>C(P,String(se.target.value))}
      >
        <option value=${Xt} ?selected=${b===Xt}>
          ${x.unset_label}
        </option>
        ${x.options.map(se=>c`<option
              value=${se.value}
              title=${se.full_value||""}
              ?selected=${se.value===b}
            >
              ${se.label}
            </option>`)}
      </select>
      ${b===Xt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Fe(P,Q,ue,C,V,de=!1,S){return c`<div
      class=${`settings-dialog__row${de?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        ${be(P,Q,ue,C,V,de,S)}
      </span>
    </div>`}function at(P,Q){let ue=Q?Q.active:null;return ln(ue)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${P==="claude"?ue.email:Gr({...ue,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function rt(P,Q,ue){let C=h[ue],V=Object.hasOwn(p,P)?p[P]:Xt,de=ue==="claude"?Zo:Gr,S=!!C?.accounts.some(b=>b.key===V);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${Q}
          data-account-key=${P}
          @change=${b=>Ue(P,String(b.target.value))}
        >
          <option value=${Xt} ?selected=${V.length===0}>
            ${at(ue,C)}
          </option>
          ${V.length>0&&!S?c`<option value=${V} selected>
                ${V} (목록에 없음)
              </option>`:""}
          ${C?.accounts.map(b=>c`<option value=${b.key} ?selected=${b.key===V}>
                ${de(b)}
              </option>`)||""}
        </select>
        ${C?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Je(){let P=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${P} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${P}`:null}function yt(P,Q,ue,C,V){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Q}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${be(ue,`${P} \uBAA8\uB378`,C,_e,a,!1)}
        ${be(V,`${P} effort`,Go,_e,a,!1)}
      </span>
    </div>`}function It(P,Q,ue,C){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${C?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${C?"true":"false"}
          aria-label=${Q}
          @click=${()=>Ye(P,!C)}
        >
          ${C?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ue}</span>
      </span>
    </div>`}function vt(P,Q,ue,C){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
          <button
            type="button"
            aria-label=${`${Q} \uAC10\uC18C`}
            @click=${()=>C(ue-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ue}</span>
          <button
            type="button"
            aria-label=${`${Q} \uC99D\uAC00`}
            @click=${()=>C(ue+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Tt(P){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${P.rows.length>0?`\uBCC0\uACBD ${P.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${P.rows.map(Q=>c`<div
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
      ${P.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${P.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function wt(){let P=L(),Q={};for(let ue of zn)Q[ue]=Object.prototype.hasOwnProperty.call(U,ue)?U[ue]:P&&typeof P[ue]=="string"?P[ue]:null;return Q}function ze(){let P=ne(),Q=a.impl_runtime,ue=a.impl_model,C=we(),V=L(),de=wt(),S=xs(P,N),b=zr(P,void 0).filter($e=>$e!==mn),x=Di(P,N,de.orchestration_model||mn).filter($e=>$e!==mn),B=Z?(C?.presets||[]).find($e=>$e.id===Z):null,re=B?nd(it(),ln(B.settings)?B.settings:{}):null,se=V&&typeof V.slots=="number"?V.slots:pa+1,he=V&&typeof V.serial_lane_count=="number"?V.serial_lane_count:pa,Oe=Ee()?.supported===!0,et=Je(),st=Mi("workflow_mode",ks,a,Ee(),P);return c`
      ${i.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${et?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${et}
          </div>`:""}
      ${Oe?"":c`<div
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
                .value=${br(Z)}
                @change=${$e=>{Z=String($e.target.value),Re()}}
              >
                <option value="" ?selected=${Z===""}>
                  실행 프리셋…
                </option>
                ${(C?.presets||[]).map($e=>c`<option
                      value=${$e.id}
                      ?selected=${$e.id===Z}
                    >
                      ${$e.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!re||re.rows.length===0}
                @click=${ee}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Z?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${br(oe)}
                @input=${$e=>{oe=String($e.target.value)}}
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
                @click=${xt}
              >
                삭제
              </button>
            </div>
            ${re?Tt(re):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${br(N||Xt)}
                    @change=${$e=>{let ct=String($e.target.value);We(ct===Xt?null:ct)}}
                  >
                    <option value=${Xt} ?selected=${!N}>
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
              ${Fe("orchestration_model","\uBAA8\uB378",S,Ie,de)}
              ${Fe("orchestration_effort","effort",x,Ie,de)}
              ${Fe("orchestration_speed","\uC18D\uB3C4",ws,Ie,de)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${rt("claude_account","Claude","claude")}
              ${rt("codex_account","Codex","codex")}
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
                      ${st.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${ks.map($e=>c`<button
                          type="button"
                          data-mode=${$e}
                          aria-pressed=${String(a.workflow_mode===$e)}
                          @click=${()=>_e("workflow_mode",$e)}
                        >
                          ${$e}
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
              ${yt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ho,"plan_review_effort")}
              ${yt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",$s,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Fe("impl_runtime","\uC704\uC784 \uB300\uC0C1",zo,_e,a)}
              ${Fe("impl_model","\uBAA8\uB378",zr(P,Q),_e,a)}
              ${Fe("impl_effort","effort",Hr(P,Q,ue),_e,a)}
              ${Fe("impl_speed","\uC18D\uB3C4",ws,_e,a)}
              ${Fe("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",b,_e,a,!1,{...a,...de})}
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
              ${vt("slots","\uB3D9\uC2DC \uC2E4\uD589",se,$e=>Pe($e))}
              ${vt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",he,$e=>He($e))}
            </div>
            ${De()}
          `}
    `}function Re(){I||Ze(ze(),e)}return{load(){U={};let P=[ge(),ve()];return A||P.push(te()),Promise.all(P).then(()=>{})},render:Re,sessionDraft:()=>({...a}),destroy(){I=!0,Ze(c``,e)}}}function _a(e){return c`<svg
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
  </svg>`}function jd(){return _a(rs`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Bd(){return _a(rs`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ud(){return _a(rs`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Wd(){return _a(rs`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function zd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Hd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Zt(Eo(t));let n={};for(let i of Pn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let p of Pn){let g=l[p];typeof g=="number"&&Number.isFinite(g)&&(n[p]+=g,r=!0,u=!0)}if(u){o+=1;let p=l.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Fn(n):null}function Cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Xi(e,t){let n=Cn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function lh(e,t){if(!Cn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function ch(e){if(!Cn(e)||!Cn(e.execution_defaults)||!Cn(e.runner_catalog)||!Cn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=an({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=En(e.runner_catalog,n.orchestration_model.value??""),s=hr(n,e.runner_catalog),o=nr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Gd(e,t){let n=t.notify||(G=>le(G,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,p=null,g=null,v=new Map;function h(){let G=t.workspacesState?t.workspacesState():[];return Array.isArray(G)?G.filter(te=>Cn(te)):[]}function A(G){return h().find(te=>te.root_dir===G)||null}function N(G){return lh(A(G),v.get(G))}function U(){for(let G of h()){let te=v.get(G.root_dir);te&&typeof te.revision=="number"&&typeof G.revision=="number"&&G.revision>=te.revision&&v.delete(G.root_dir)}}async function Z(G,te,ie){let ke=t.transport,Ue=N(te);if(!(!ke||!Cn(Ue))){try{let _e=await ke(G,{...ie,root_dir:te,expected_revision:Ue.revision});if(Cn(_e?.queue)&&v.set(te,_e.queue),_e&&_e.conflict){let je=Cn(_e.queue)&&typeof _e.queue.revision=="number"?_e.queue.revision:N(te)?.revision;_e=await ke(G,{...ie,root_dir:te,expected_revision:je}),Cn(_e?.queue)&&v.set(te,_e.queue)}}catch(_e){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${_e instanceof Error?_e.message:String(_e)}`)}ce()}}function oe(G){u!==G&&(u=G,t.onFocusChange?.(u),ce())}function Y(G){oe(u===G?null:G)}function q(G){if(p===G){K();return}j(),p=G;let te=A(G);a.textContent=`${te?.name||G} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,g=fa(l,{root_dir:G,queue:()=>N(G),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ie=>{v.set(G,ie),ce()}}),g.load(),ce()}function j(){g?.destroy(),g=null}function K(G){j(),p=null,s.hidden=!0,a.textContent="",G!==!0&&ce()}let I=()=>K();i.addEventListener("click",I);function L(G){G.key==="Escape"&&u!==null&&oe(null)}document.addEventListener("keydown",L);function ne(G,te){let ie=Math.max(te,G,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${te}\uAC1C \uC911 ${G}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ie},(ke,Ue)=>Ue<G?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function Ee(G){let te=G.auto_advance===!0,ie=G.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${te?" is-on":""}`}
        data-act="auto"
        aria-pressed=${te?"true":"false"}
        aria-label=${`${G.name} \uC790\uB3D9\uD654`}
        title=${te?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${te?Bd():jd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ie?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ie?"true":"false"}
        aria-label=${`${G.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ie?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Ud()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${p===G.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${p===G.root_dir?"true":"false"}
        aria-label=${`${G.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Wd()}
      </button>`}function we(G){let te=ch(G);return te?c`<div class="mon2-deck__chips">
      ${te.orchestration?c`<span class="mon2-deck__chip" title=${te.orchestration.title}
            >오케 ${te.orchestration.text}</span
          >`:""}
      ${te.worker?c`<span class="mon2-deck__chip" title=${te.worker.title}
            >워커 ${te.worker.text}</span
          >`:""}
    </div>`:""}function H(G){let te=[];for(let[ie,ke]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ue=Xi(G,ie);Ue>0&&te.push(`${ke} ${Ue}`)}return te.join(" \xB7 ")}function J(G){let te=Xi(G,"running"),ie=typeof G.slots=="number"?G.slots:1;return c`<div
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
          title=${`\uC2AC\uB86F ${ie}\uAC1C \uC911 ${te}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${te}/${ie}</span>
          ${ne(te,ie)}
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
        <div class="mon2-deck__ops">${Ee(G)}</div>
        <span class="mon2-deck__counts">${H(G)}</span>
        ${we(G)}
      </div>
    </div>`}function fe(G){let te=t.doneItems?t.doneItems():[],ie=t.rangeLabel?t.rangeLabel():"",ke=Hd(Array.isArray(te)?te:[]),Ue=_e=>G.reduce((je,M)=>je+Xi(M,_e),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${G.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ie}`}
        >실행 ${Ue("running")} · 대기 ${Ue("queue")} · PR
        ${Ue("pr_wait")}${Ue("session_active")>0?` \xB7 \uC138\uC158 ${Ue("session_active")}`:""}
        · ${ie} 완료
        ${Array.isArray(te)?te.length:0}</span
      >
      ${ke===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof ke=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${zd(ie)}
                  >${ke}</span
                >`:ke.map(_e=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${_e.provider}
                      title=${_e.tooltip}
                      >${_e.label}</span
                    >`)}
          </span>`}
    </div>`}function xe(){let G=h();return G.length===0?"":c`${fe(G)}
      <div class="mon2-deck__strip">
        ${G.map(te=>J(te))}
      </div>`}function ge(){u!==null&&!A(u)&&(u=null,t.onFocusChange?.(null))}function ce(){U(),ge(),p!==null&&!A(p)&&K(!0),Ze(xe(),r),g?.render()}function Ae(G){let te=G.target;if(!te||typeof te.closest!="function")return;let ie=te.closest("[data-root-dir]");if(!ie)return;let ke=ie.getAttribute("data-root-dir")||"",Ue=te.closest("[data-act]")?.getAttribute("data-act");if(Ue==="worker"){t.gotoWorkerTab?.(ke);return}if(Ue==="auto"){Z("worker-automation-toggle",ke,{on:N(ke)?.auto_advance!==!0});return}if(Ue==="merge"){Z("worker-merge-auto-toggle",ke,{on:N(ke)?.auto_merge!==!0});return}if(Ue==="gear"){q(ke);return}Y(ke)}function ve(G){if(G.key!=="Enter"&&G.key!==" ")return;let te=G.target;if(!te||typeof te.closest!="function")return;let ie=te.closest('[data-root-dir][role="button"]');!ie||ie!==te||(G.preventDefault(),Y(ie.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Ae),r.addEventListener("keydown",ve),{render:ce,focusRoot:()=>u,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",L),r.removeEventListener("click",Ae),r.removeEventListener("keydown",ve),i.removeEventListener("click",I),j(),Ze(c``,r),e.replaceChildren()}}}var uh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",dh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",ph="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ls="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Qi(e,t){return`${e}\0${t}`}function fh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function _h(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Ji(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function mh(e,t){let n=new Set;for(let[a,i]of t)for(let l of i)n.add(Qi(a,l));let r=new Map,s=new Map;for(let a of e){let i=Qi(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Qi(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function gh(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function bh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ma(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Kd(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function ga(e){let t=_h(e.blocked_by_map),n=[],r={refusal:null},s=i=>{let l=e.owner_of.get(i);return typeof l!="string"||l.length===0?(r.refusal=fh(i),null):l};return{graph:t,dep_ops:n,state:r,ownerOf:s,addDep:(i,l)=>{if(r.refusal!==null||i===l)return;let u=t.get(i)||[];if(u.includes(l))return;let p=s(i);if(p!==null){if(Ji(t,l,i)){r.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${i}\uAC00 \uC774\uBBF8 ${l}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(i,[...u,l]),n.push({type:"dep-add",a:i,b:l,root_dir:p})}},removeDep:(i,l)=>{if(r.refusal!==null||i===l)return;let u=t.get(i)||[];if(!u.includes(l))return;let p=s(i);p!==null&&(t.set(i,u.filter(g=>g!==l)),n.push({type:"dep-remove",a:i,b:l,root_dir:p}))}}}function ba(e,t,n,r){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=mh(e.dep_ops,t.blocked_by_map),o=s.filter(i=>i.type==="dep-remove"),a=s.filter(i=>i.type==="dep-add");return{lane_ops:n,ops:[...o,...a,...r],lane_op_index:o.length}}function Vd(e,t){for(let n=1;n<t.length;n+=1)e.addDep(t[n].bead_id,t[n-1].bead_id)}function Yd(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(ma(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function hh(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function el(e,t,n){let r=ga(n),s=[],o=[],a=n.owner_lane_of.get(e.bead_id),i=e.kind==="chain"?e.lane_id??a:void 0,l=i===void 0?void 0:n.cross_lanes.get(i);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:uh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:dh};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Kd(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Ls}}if(e.kind==="chain"&&l===void 0)return{refused:Ls};let u=()=>{if(l===void 0||l.status!=="confirmed")return;let v=l.entries.map(U=>U.bead_id),h=new Set(v),A=(r.graph.get(e.bead_id)||[]).filter(U=>h.has(U)),N=v.filter(U=>(r.graph.get(U)||[]).includes(e.bead_id));for(let U of A)r.removeDep(e.bead_id,U);for(let U of N)r.removeDep(U,e.bead_id);for(let U of A)for(let Z of N)r.addDep(Z,U)},p=(v,h)=>{let A=n.cross_lanes.get(v),N=A.entries.findIndex(I=>I.bead_id===e.bead_id),U=A.entries.filter(I=>I.bead_id!==e.bead_id),Z=Math.max(0,Math.min(U.length,N>=0&&h>N?h-1:h)),oe=-1;if(U.forEach((I,L)=>{n.fixed_members.has(I.bead_id)&&(oe=L)}),Z<=oe){r.state.refusal=ph;return}let Y=N>=0?A.entries[N]:l?.entries.find(I=>I.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir},q=[...U.slice(0,Z),Y,...U.slice(Z)];if(hh(q,A.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:v,entries:q}}),A.status!=="confirmed")return;let j=Z>0?U[Z-1].bead_id:null,K=Z<U.length?U[Z].bead_id:null;if(j===null){K!==null&&r.addDep(K,e.bead_id);return}r.addDep(e.bead_id,j),K!==null&&(r.graph.get(K)||[]).includes(j)&&(r.removeDep(K,j),r.addDep(K,e.bead_id))},g=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(u(),l!==void 0&&(t.kind!=="chain"||t.lane_id!==i)&&s.push({type:"monitor-lane-update",payload:{lane_id:i,entries:l.entries.filter(v=>v.bead_id!==e.bead_id)}})),t.kind==="chain"&&p(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let v=gh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(ma(e.bead_id,e.root_dir,v));else if(e.kind==="parallel"){let h=n.parallel_rows,A=h[Math.max(0,Math.min(h.length,t.marker_index))];if(!(!!A&&A.bead_id===e.bead_id)&&bh(n,e.root_dir)&&g!==void 0){let U=g>v?v:v-1;U>=0&&U!==g&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:U},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let v=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&v.status==="confirmed"&&o.push(ma(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(g!==void 0&&t.index!==g){let v=g>t.index?t.index:t.index-1;v>=0&&v!==g&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:v},root_dir:e.root_dir})}}else o.push(ma(e.bead_id,e.root_dir,t.index,t.lane_id));return ba(r,n,s,o)}function Zd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Ls};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=ga(t),s=[];return Vd(r,n.entries),r.state.refusal===null&&Yd(r,t,n.entries,s),ba(r,t,[{type:"monitor-lane-confirm",payload:{lane_id:e}}],s)}function Xd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Ls};let r=ga(t),s=[];return Vd(r,n.entries),r.state.refusal===null&&Yd(r,t,n.entries,s),ba(r,t,[],s)}function Qd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Ls};let r=ga(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return ba(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[])}function tl(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Kd(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var yh="\uC0AC\uC774\uD074";function Jd(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=Ji(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:yh}:{}})}return o.sort((a,i)=>{let l=r!==void 0&&a.root_dir===r,u=r!==void 0&&i.root_dir===r;return l!==u?l?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function ep(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var tp={running:3,paused:2,failed:1};function yr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function np(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function rp(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),yr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!yr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let p=t.get(a.bead_id),g=typeof p=="number"&&p>0&&typeof a.finished_at=="number"&&p>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!g&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let p=tp[u.run_state],g=tp[i];if(p>g||p===g&&(u.started_at??0)>(l??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:l})}return{winners:o,resumed_from_ids:r}}var sp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Is=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ha(e,t){let n=sp.find(s=>s.step===e);if(!n)return null;let r=sp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function op(e){let t=Is.findIndex(n=>n.step===e);return Is.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function vr(e){let t=Is.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function vh(e){let t=Is.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Is.length}}function ya(e){let t=vh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var rl=new Set(["queued","running","retry_pending","repairing"]),ap=new Set(["failed","succeeded"]),wh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Ps={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},kh={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ps.base_containment,child_sweep:Ps.child_sweep,branch_cleanup:Ps.branch_cleanup,parent_close:Ps.parent_close};function $h(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function xh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...rl,...ap].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Ah(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function nl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=wh[s];if(!o)return null;let a=ha(n,`${r} ${o}`);return a?{...a,active:rl.has(s),failed:s==="failed"}:null}function Sh(e){return!e||typeof e!="object"?null:kh[e.step]||null}function Ds(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Sh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=$h(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&xh(A,t,i)).sort(Ah):[],u=a?l:[],p=u.find(A=>rl.has(A.state));if(p)return nl(p);if(s)return s.step==="repo_operations"&&l[0]?nl(l[0],!0):null;let g=u.find(A=>ap.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(g)return nl(g);if(r){let A=ha(r.step,r.label);return A?{...A,active:!0,failed:!1}:null}let v=typeof e.cleanup_cursor=="string"?Ps[e.cleanup_cursor]:null;if(!v)return null;let h=ha(v.step,v.label);return h?{...h,active:!0,failed:!1}:null}function va(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Eh="\uBBF8\uC801\uC7AC";function sl(e,t){let n=bo(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function ip(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,a]of e){if(typeof o!="string"||o.length===0)continue;let i=[];for(let l of Array.isArray(a)?a:[]){if(typeof l!="string"||l.length===0)continue;let u=sl(o,{id:l,location_label:s.get(l)||Eh}),p=n[l];u.foreign!==!0?u.openable=!0:typeof p=="string"&&p.length>0&&(u.openable=!0,u.root_dir=p),i.push(u)}i.length>0&&r.set(o,i)}return r}function ol(e,t){return`${e}\0${t}`}function lp(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function al(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function wa(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function cp(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${wa(s)})`,location_label:wa(s),scope:null,same_lane_ahead:!1};let a=al(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1}}function up(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=ol(i.root_dir,l.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(u,[]);for(let p of Array.isArray(l.items)?l.items:[])r.set(p.id,u)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=ol(i.root_dir,l.id),p=Array.isArray(l.items)?l.items[0]:null,v=!!p&&p.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],h=s.get(u);if(h)for(let A of v){let N=r.get(A);N&&N!==u&&!h.includes(N)&&h.push(N)}}let o=(i,l)=>{let u=new Set,p=[i];for(;p.length>0;){let g=p.pop();if(g===l)return!0;!g||u.has(g)||(u.add(g),p.push(...s.get(g)||[]))}return!1},a=new Map;for(let[i,l]of s){let u=[];for(let p of l){let g=n.get(p);o(p,i)&&g&&u.push(g)}u.length>0&&a.set(i,u)}return a}function dp(e,t){return ol(e,t)}var pp=1,Ms=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],ll=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Vr={show_blocked:!0,spec:"all"},fp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Th(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!yr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Ch(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!yr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Rh(e,t){let{winners:n,resumed_from_ids:r}=rp(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,l=a.run_state,u=a.started_at,p=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:bn(e,i.bead_id),can_pause:l==="running"&&p,can_resume:l!=="running"&&p&&!r.has(i.attempt_id)})}return s}function _p(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Ot(e){return e&&typeof e=="object"?e:{}}function Oh(e,t,n){let r=Ot(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=v=>an({pin:v,global:a,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=i(r),u=i(null)}catch{return null}let p=mp(hr(l,o),hr(u,o)),g=mp(nr(l,null),nr(u,null));return p||g?{orchestration:p,worker:g}:null}function mp(e,t){return!e||t&&t.text===e.text?null:e}function Lh(e,t){let n=al(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function gp(e,t,n){let r=t.get(e);if(!r)return Lh(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return wa(r)}function Ih(e,t,n,r,s,o){let a=[];return e.forEach((i,l)=>{let u=typeof i.id=="string"?i.id:"";if(u.length===0)return;let p=i.status==="confirmed"?"confirmed":"draft",g=Array.isArray(i.entries)?i.entries:[],v=[];g.forEach((h,A)=>{let N=h&&typeof h.bead_id=="string"?h.bead_id:"";if(N.length===0)return;let U=h&&typeof h.root_dir=="string"?h.root_dir:"",Z=n.get(N),oe=Z?Z.state:void 0,Y=oe==="running"||oe==="pr_wait"||oe==="done",q=!Z||oe==="runnable",j=Z&&Z.lane==="parallel"&&typeof Z.position=="number"?Z.position-1:null,K=v.length>0?v[v.length-1].id:null,I=p==="confirmed"&&K!==null&&!(t.get(N)||[]).includes(K);v.push({id:N,title:s.get(N)||N,root_dir:Z?Z.root_dir:U,workspace_name:Z?Z.workspace_name:o.get(U)||"",seq:A+1,location_label:gp(N,n,r),draggable:!Y,fixed:Y,done:oe==="done",unplaced:q,mismatch:I,...j!==null?{queue_index:j}:{}})}),v.forEach((h,A)=>{h.seq=A+1}),a.push({lane_id:u,status:p,draft:p==="draft",number:l+1,label:`\uC5F0\uACB0 ${l+1} \xB7 \uB808\uD3EC \uAC04`,rows:v,all_done:v.length>0&&v.every(h=>h.done),can_confirm:p==="draft"&&v.length>=2,has_mismatch:p==="confirmed"&&v.some(h=>h.mismatch||h.unplaced)})}),a}function Ph(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Dh(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,p=o.get(u);if(p){p.cards.push(l);continue}let{scope:g,state:v}=Ph(l,t,n);v!==void 0&&(l.scope_state=v),o.set(u,{cards:[l],scope:g})}let a=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let v of l.cards)v.scope_state=u;if(l.scope.length===0)continue;let p=l.cards[0].root_dir,g=a.get(p);g?g.push(l):a.set(p,[l])}let i=(l,u,p)=>{let g=u.cards[0],v={id:g.id,title:g.title,location_label:gp(g.id,r,s),prefixes:p};for(let h of l.cards)h.overlap_chips?h.overlap_chips.push(v):h.overlap_chips=[v]};for(let l of a.values())for(let u=0;u<l.length;u+=1)for(let p=u+1;p<l.length;p+=1){let g=ua(l[u].scope,l[p].scope);g.length!==0&&(i(l[u],l[p],g),i(l[p],l[u],g))}}function il(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ka(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function cl(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...Vr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&Ms.some(M=>M.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let M of s)M&&typeof M.root_dir=="string"&&u.set(M.root_dir,M);let p=new Map;for(let M of s)M&&typeof M.root_dir=="string"&&p.set(M.root_dir,M.name||M.root_dir);for(let M of r)M&&typeof M.root_dir=="string"&&p.set(M.root_dir,M.name||M.root_dir);let g=[],v=[],h=[],A=[],N=[],U=[],Z=new Map,oe=new Map,Y=new Map,q=new Map,j=new Map,K=new Map,I=new Map,L=new Map;for(let M of r){if(!M||typeof M.root_dir!="string")continue;let me=M.root_dir,Me=M.name||me,Ie=u.get(me),We=Ie&&typeof Ie.revision=="number"?Ie.revision:typeof M.revision=="number"?M.revision:0,Pe=Ot(M.attempts),He=Ot(M.bead_titles);for(let[b,x]of Object.entries(He))typeof x=="string"&&x.length>0&&L.set(b,x);let Ye=Ot(M.bead_times),it=Ot(M.pr_observations),ft=Ot(M.admission),xt=Ot(M.revise_parked),_t=Ot(M.merge_queue_state),ee=Ot(M.cleanup_failed),X=Ot(M.discard_operations),Te=Ot(M.bead_blocked_by);Object.hasOwn(M,"bead_scope")&&K.set(me,Ot(M.bead_scope));let Xe=Ot(M.bead_workflow),De=Ot(M.pr_activity),be=Array.isArray(M.repo_operations)?M.repo_operations:[],Fe=Array.isArray(M.merge_queue)?M.merge_queue:[],at=new Set(Fe.filter(b=>b&&typeof b.bead_id=="string").map(b=>b.bead_id)),rt=new Map(Fe.filter(b=>b&&typeof b.bead_id=="string").map(b=>[b.bead_id,b])),Je=Array.isArray(M.queue)?M.queue:[],yt=(Array.isArray(M.serial_lanes)?M.serial_lanes:[]).filter(b=>b&&/^s[1-5]$/.test(b.id)&&Array.isArray(b.entries)),It=Ot(M.lane_states),vt=typeof M.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(M.serial_lane_count))):Math.min(5,yt.length);Y.set(me,vt),q.set(me,Je.length);let Tt=new Map(yt.map(b=>[b.id,b])),wt=new Map;for(let b of yt)for(let x of b.entries)x&&typeof x.bead_id=="string"&&wt.set(x.bead_id,b.id);for(let[b,x]of Object.entries(Te))Array.isArray(x)&&j.set(b,x.filter(B=>typeof B=="string"&&B.length>0));let ze=Array.isArray(M.done)?M.done:[];for(let b of ze)b&&typeof b.bead_id=="string"&&U.push({id:b.bead_id,root_dir:me,workspace_name:Me});let Re=new Map;for(let b of ze)b&&typeof b.bead_id=="string"&&typeof b.added_at=="number"&&Re.set(b.bead_id,b.added_at);let P=b=>({id:b,title:He[b]||b,root_dir:me,workspace_name:Me,expected_revision:We,draggable:!1,...Ot(Ye[b]).created_at?{created_at:Ot(Ye[b]).created_at}:{},...Ot(Ye[b]).updated_at?{updated_at:Ot(Ye[b]).updated_at}:{}}),Q=b=>Object.hasOwn(Te,b)?{blocked_by:Array.isArray(Te[b])?Te[b].filter(x=>typeof x=="string"&&x.length>0):[]}:{},ue=new Set;for(let[b,x]of Rh(Pe,Re))ue.add(b),v.push({...P(b),lane:"running",...Q(b),...wt.has(b)?{serial_lane_id:wt.get(b)}:{},attempt_id:x.attempt_id,run_state:x.run_state,status:x.status||void 0,workflow:Xe[b]||null,can_pause:x.can_pause,can_resume:x.can_resume,started_at:x.started_at,last_event_at:x.last_event_at,last_activity:x.last_activity,legs:x.legs,runner:x.runner,model:x.model,effort:x.effort,speed:x.speed,resumed_from:x.resumed_from,continuation_mode:x.continuation_mode,usage:x.usage,exec_chips:{orchestration:Os(x),worker:null},discard:Tn(X,b,{attempt_id:x.attempt_id}),badges:x.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:x.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:x.run_state==="failed"});for(let[b,x]of np(Pe)){if(v.some(se=>se.id===b))continue;let B=x.attempt,re=x.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";v.push({...P(b),lane:"running",kind:"session",...Q(b),attempt_id:typeof B.attempt_id=="string"?B.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:Xe[b]||null,can_pause:!1,can_resume:!1,started_at:x.started_at,last_event_at:typeof B.last_event_at=="number"?B.last_event_at:null,last_activity:B.last_activity&&typeof B.last_activity=="object"?B.last_activity:null,legs:Array.isArray(B.legs)?B.legs:[],runner:typeof B.runner=="string"?B.runner:null,model:typeof B.model=="string"?B.model:null,effort:typeof B.effort=="string"?B.effort:null,speed:typeof B.speed=="string"?B.speed:null,resumed_from:null,continuation_mode:null,usage:B.usage&&typeof B.usage=="object"?B.usage:null,exec_chips:{orchestration:Os(B),worker:null},discard:Tn(X,b,{merge_queued:!0}),badges:[x.origin==="auto"?`${re} \xB7 \uC790\uB3D9`:re],alert:!1})}for(let b of Array.isArray(M.session_active)?M.session_active:[]){let x=b&&b.bead_id;typeof x!="string"||ue.has(x)||(ue.add(x),Array.isArray(b.blocked_by)&&b.blocked_by.length>0&&j.set(x,b.blocked_by.filter(B=>typeof B=="string"&&B.length>0)),typeof b.title=="string"&&b.title.length>0&&L.set(x,b.title),v.push({...P(x),title:b.title||He[x]||x,lane:"running",kind:"session",status:"in_progress",started_at:il(b.started_at)??il(b.updated_at)??void 0,updated_at:il(b.updated_at)??void 0,workflow:b.workflow||null,labels:Array.isArray(b.labels)?b.labels:[],spec_id:typeof b.spec_id=="string"?b.spec_id:"",blocked:b.blocked===!0,...Array.isArray(b.blocked_by)?{blocked_by:b.blocked_by.filter(B=>typeof B=="string"&&B.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(b.session_refs)?b.session_refs:[],badges:[],alert:!1}))}for(let b of Array.isArray(M.pr_wait)?M.pr_wait:[]){let x=b&&b.bead_id;if(typeof x!="string"||ue.has(x))continue;ue.add(x);let B=Ot(it[x]),re=Ot(B.pr),se=B.gate?Ot(B.gate):null,he=at.has(x),Oe=rt.get(x)?.continuation_action||null,et=!!Oe&&Oe.continuation===null,st=_t.active===x,$e=b.external===!0,ct=ee[x]||null,qt=Ot(De[x]),Ct=Ds({bead_id:x,merge_sha:b.merge_sha,cleanup_cursor:b.cleanup_cursor,merge_progress:qt.merge_progress||null,cleanup_failed:ct,repo_operations:be}),cn=va(Ct),Qt=!!se&&se.base_badge==="\uCDA9\uB3CC",jt=!!ct&&["child_sweep","branch_cleanup","parent_close"].includes(ct.step)&&!!se&&se.tier==="merged",Gt=$e&&!!ct&&!!se&&se.tier==="merged",Ht=!!se&&["closed_unmerged","review","undecidable"].includes(se.tier)&&se.reason!=="review_receipt_undetermined",mt=Tn(X,x,{external:$e,merge_active:st||Ct?.step==="merge",merge_queued:he,cleanup_active:cn,merged:!!ct||se?.tier==="merged"}),Wt=!!mt.operation;h.push({...P(x),lane:"pr_wait",...Q(x),workflow:Xe[x]||null,pr_number:typeof re.number=="number"?re.number:null,pr_url:typeof re.url=="string"?re.url:void 0,external:$e,usage:bn(Pe,x),merge_step:Ct,badges:et?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ct?[se?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:ct?[vr(ct.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${vr(ct.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof se?.gate_badge=="string"&&se.gate_badge.length>0?[se.gate_badge]:[],alert:Ct?Ct.failed===!0:!!ct||Ht,reason:ct&&Ct?.active!==!0?ya(ct.step):"PR \uB300\uAE30",merge_action:se?.tier==="merged"&&!jt&&!Gt?!1:!he||et,merge_enabled:!Wt&&(et||se?.enabled===!0||Qt||jt||Gt),merge_label:et?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Gt||jt?"\uC815\uB9AC \uC7AC\uAC1C":Qt&&!jt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:et?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Wt?mt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${mt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${mt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Gt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":jt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Qt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":se?.enabled===!0?`\uBA38\uC9C0 (${se.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${se?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:he&&!et,cancel_enabled:!st,continuation_mismatch:Oe?.mismatch||null,discard:mt,discard_action:mt.action,discard_enabled:mt.enabled,discard_title:mt.title})}let C=(b,x,B,re)=>{let se=b&&b.bead_id;if(typeof se!="string"||ue.has(se))return null;ue.add(se);let he=xt[se],Oe=Tn(X,se),et=Oe.operation?Oe:null,st={...P(se),lane:x,workflow:Xe[se]||null,draggable:!et,discard:et||void 0,reason:_p(ft,se),seq:B+1,queue_position:B+1,queue_index:B,queue_length:re,badges:he?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!he,revise_action:!!he,revise_enabled:!!he&&!et,revise_title:he?he.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${he.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},$e=Q(se);return Object.hasOwn($e,"blocked_by")&&(st.blocked_by=$e.blocked_by),st};for(let b=0;b<Je.length;b++){let x=C(Je[b],"queue",b,Je.length);if(!x)continue;A.push(x);let B=Z.get(me);B?B.push(x):Z.set(me,[x])}let V=b=>{let x=h.find(he=>he.id===b&&he.root_dir===me);if(x)return{id:b,title:x.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let B=v.find(he=>he.id===b&&he.root_dir===me),re=B?B.run_state:Th(Pe,b),se=re==="failed"||re==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":re==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:b,title:B?B.title:P(b).title,badge:se}},de=[];for(let b=0;b<Math.max(vt,yt.length);b++){let x=`s${b+1}`,B=Tt.get(x),re=B&&Array.isArray(B.entries)?B.entries:[],se=Ot(It[x]),he=Array.isArray(se.occupied_by)?se.occupied_by.filter(st=>typeof st=="string"):[],Oe=new Set(he),et=[];for(let st=0;st<re.length;st++){let $e=re[st]&&re[st].bead_id;if(typeof $e=="string"&&Oe.has($e)){ue.add($e);continue}let ct=C(re[st],x,st,re.length);ct&&(et.push(ct),A.push(ct))}et.length===0&&he.length===0&&(vt<=1||b>=vt)||de.push({id:x,index:b,items:et,raw_length:re.length,occupied_by:he,occupants:he.map(st=>V(st)),corrections:Array.isArray(se.corrections)?se.corrections.length:0,cycle:se.cycle===!0,...et.length===0&&he.length===0?{empty:!0}:{}})}oe.set(me,de);let S=Array.from({length:vt},(b,x)=>{let B=`s${x+1}`,re=Tt.get(B),se=re&&Array.isArray(re.entries)?re.entries:[],he=Ot(It[B]);return{id:B,index:se.length,length:se.length,occupied_by:Array.isArray(he.occupied_by)?he.occupied_by.filter(Oe=>typeof Oe=="string"):[]}});for(let b of Array.isArray(M.runnable)?M.runnable:[]){let x=b&&b.bead_id;if(typeof x!="string"||ue.has(x))continue;ue.add(x);let B=b.workflow&&typeof b.workflow=="object"?b.workflow:null,re=B&&typeof B.route=="string"&&B.route||(typeof b.route=="string"?b.route:null),se=Oh(Ot(Ie),b.exec_pins,re);Array.isArray(b.blocked_by)&&b.blocked_by.length>0&&j.set(x,b.blocked_by.filter(he=>typeof he=="string"&&he.length>0)),typeof b.title=="string"&&b.title.length>0&&L.set(x,b.title),Array.isArray(b.scope)&&I.set(x,b.scope.filter(he=>typeof he=="string"&&he.length>0)),g.push({...P(x),title:b.title||He[x]||x,lane:"runnable",draggable:!0,reason:_p(ft,x),created_at:b.created_at??void 0,updated_at:b.updated_at??void 0,status:typeof b.status=="string"?b.status:void 0,labels:Array.isArray(b.labels)?b.labels:[],spec_id:typeof b.spec_id=="string"?b.spec_id:"",workflow:B||(re?{route:re,chips:{route:re}}:null),...se?{exec_chips:se}:{},blocked:b.blocked===!0,...Array.isArray(b.blocked_by)?{blocked_by:b.blocked_by.filter(he=>typeof he=="string"&&he.length>0)}:{},place_index:Je.length,place_lanes:S})}for(let b of ze){let x=b&&b.bead_id;if(typeof x!="string"||ue.has(x)||(ue.add(x),o!==void 0&&typeof b.added_at=="number"&&b.added_at<o))continue;let B=Ch(Pe,x),re=B&&typeof B.done_kind=="string"?B.done_kind:null;N.push({...P(x),lane:"done",done:!0,done_layout:"three_line",usage:bn(Pe,x),work_ms:na(Pe,x),done_at:typeof b.added_at=="number"?b.added_at:void 0,done_kind:re,badges:[...re&&fp[re]?[fp[re]]:[],...ta(Pe,x)]})}}let ne=new Map;s.forEach((M,me)=>{M&&typeof M.root_dir=="string"&&ne.set(M.root_dir,me)});let Ee=n&&n.running_sort==="repo"?"repo":"started";v.sort((M,me)=>{let Me=M.kind==="session",Ie=me.kind==="session";if(Me!==Ie)return Me?1:-1;if(Me&&Ie){let He=ka(me.updated_at)-ka(M.updated_at);return He!==0?He:M.id.localeCompare(me.id)}if(Ee==="repo"){let He=ne.get(M.root_dir)??Number.MAX_SAFE_INTEGER,Ye=ne.get(me.root_dir)??Number.MAX_SAFE_INTEGER;if(He!==Ye)return He-Ye}let We=typeof M.started_at=="number"&&Number.isFinite(M.started_at)?M.started_at:null,Pe=typeof me.started_at=="number"&&Number.isFinite(me.started_at)?me.started_at:null;return We!==null&&Pe!==null&&We!==Pe?We-Pe:We===null&&Pe!==null?1:We!==null&&Pe===null?-1:M.id.localeCompare(me.id)}),N.sort((M,me)=>(me.done_at??0)-(M.done_at??0));let we=s.length>0?s:r.map(M=>({root_dir:M&&M.root_dir,name:M&&M.name,auto_advance:M&&M.auto_advance,auto_merge:M&&M.auto_merge,slots:M&&M.slots,revision:M&&M.revision,runner_catalog:M&&M.runner_catalog})),H=new Set(g.map(M=>M.root_dir)),J=[];for(let M of we){if(!M||typeof M.root_dir!="string")continue;let me=Z.get(M.root_dir)||[],Me=oe.get(M.root_dir)||[];!(me.length>0||Me.some(We=>We.items.length>0||We.occupied_by.length>0))&&!H.has(M.root_dir)||J.push({root_dir:M.root_dir,name:M.name||M.root_dir,auto_advance:M.auto_advance===!0,auto_merge:M.auto_merge===!0,slots:typeof M.slots=="number"&&M.slots>=pp?M.slots:pp,revision:typeof M.revision=="number"?M.revision:0,runner_catalog:Ot(M.runner_catalog),items:me,sublanes:{parallel:me,serial:Me},serial_lane_count:Y.get(M.root_dir)||0,raw_queue_length:q.get(M.root_dir)||0})}let fe={runnable:g,runnable_all:g,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:A,queue_groups:J,running:v,pr_wait:h,done:N,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(q),owner_of:{}},xe=lp(fe);for(let M of U)xe.has(M.id)||xe.set(M.id,{root_dir:M.root_dir,workspace_name:M.workspace_name,lane:"done",state:"done"});for(let M of[...fe.queue,...fe.runnable,...fe.running,...fe.pr_wait]){if(!Object.hasOwn(M,"blocked_by"))continue;let me=xe.get(M.id);M.blockers=(M.blocked_by||[]).map(Me=>cp(Me,me,xe,s))}for(let M of[...fe.queue,...fe.runnable,...fe.running,...fe.pr_wait]){let me=(M.blockers||[]).map(Ie=>({...sl(M.id,Ie),openable:!0}));if(me.length===0)continue;let Me={predecessors:me};M.dependency_chips=Me}Dh(fe,K,I,xe,s);let ge=up(fe.queue_groups);for(let M of fe.queue_groups)for(let me of M.sublanes.serial){let Me=ge.get(dp(M.root_dir,me.id));Me&&(me.cross_wait_peers=Me)}fe.chain_lanes=Ih(i&&Array.isArray(i.lanes)?i.lanes:[],j,xe,s,L,p);let ce=new Map;for(let M of[...fe.queue,...fe.runnable])ce.has(M.id)||ce.set(M.id,M);let Ae=new Set;for(let M of fe.chain_lanes)for(let me of M.rows){if(M.status==="confirmed"&&!me.unplaced&&!me.fixed&&Ae.add(me.id),!M.draft&&!me.unplaced)continue;let Me=ce.get(me.id);Me&&(Me.cross_lane_chip={lane_id:M.lane_id,number:M.number,status:M.status,label:M.draft?`\uC5F0\uACB0 ${M.number} (draft)`:`\uC5F0\uACB0 ${M.number}`})}let ve=[];for(let M of Z.values())for(let me of M)Ae.has(me.id)||ve.push(me);ve.sort((M,me)=>{let Me=M.workspace_name.localeCompare(me.workspace_name);return Me!==0?Me:(M.queue_index??0)-(me.queue_index??0)}),fe.parallel_rows=ve;let G={};for(let[M,me]of xe)typeof me.root_dir=="string"&&me.root_dir.length>0&&(G[M]=me.root_dir);for(let M of fe.chain_lanes)for(let me of M.rows)!Object.hasOwn(G,me.id)&&me.root_dir.length>0&&p.has(me.root_dir)&&(G[me.id]=me.root_dir);fe.owner_of=G;let te=fe.runnable.length;fe.runnable_all=fe.runnable.slice();let ie=fe.runnable;a.show_blocked||(ie=ie.filter(M=>M.blocked!==!0));let ke=ie.length;a.spec==="with"?ie=ie.filter(M=>!!M.spec_id):a.spec==="without"&&(ie=ie.filter(M=>!M.spec_id)),fe.runnable_hidden={blocked:te-ke,spec:ke-ie.length};let Ue=(M,me)=>{let Me=ka(me.updated_at)-ka(M.updated_at);return Me!==0?Me:M.id.localeCompare(me.id)},je=l==="repo_spec"?(M,me)=>{let Me=M.spec_id?0:1,Ie=me.spec_id?0:1;return Me!==Ie?Me-Ie:Ue(M,me)}:Ue;if(l==="updated_flat")fe.runnable=ie.slice().sort(Ue),fe.runnable_sections=[];else{let M=new Map;for(let Ie of ie){let We=M.get(Ie.root_dir);We?We.push(Ie):M.set(Ie.root_dir,[Ie])}let me=[],Me=[];for(let Ie of we){if(!Ie||typeof Ie.root_dir!="string")continue;let We=(M.get(Ie.root_dir)||[]).slice().sort(je);M.delete(Ie.root_dir),We.length!==0&&(me.push({root_dir:Ie.root_dir,name:Ie.name||Ie.root_dir,items:We.map(Pe=>({...Pe,workspace_name:""}))}),Me.push(...We))}for(let[Ie,We]of M){let Pe=We.slice().sort(je);me.push({root_dir:Ie,name:Pe[0]?.workspace_name||Ie,items:Pe.map(He=>({...He,workspace_name:""}))}),Me.push(...Pe)}fe.runnable=Me,fe.runnable_sections=me}return fe}var bp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function hp(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function yp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var $p="bdui.monitor.done-range",xp="bdui.monitor.running_sort",Ap="bdui.monitor.candidate_sort",Sp="beads-ui.monitor.candidate-filter",Ep="beads-ui.monitor.sections";function Mh(){try{let e=window.localStorage.getItem(Sp);if(!e)return{...Vr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Vr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Vr.show_blocked,spec:ll.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Vr}}}function vp(e){try{window.localStorage.setItem(Sp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Nh(){try{let e=window.localStorage.getItem(Ap);return Ms.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function qh(e){try{window.localStorage.setItem(Ap,e)}catch{}}function Fh(){try{let e=window.localStorage.getItem(Ep);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function wp(e){try{window.localStorage.setItem(Ep,JSON.stringify(e))}catch{}}function jh(){try{let e=window.localStorage.getItem($p);return e===null?"today":On(e)}catch{return"today"}}function Bh(e){try{window.localStorage.setItem($p,e)}catch{}}function Uh(){try{return window.localStorage.getItem(xp)==="repo"?"repo":"started"}catch{return"started"}}function Wh(e){try{window.localStorage.setItem(xp,e)}catch{}}var Tp="tab:monitor:pipeline",zh=1e3,Hh=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],kp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Gh(e){return e>=1&&e<=kp.length?kp[e-1]:`(${e})`}function Cp(e,t){let n=Lt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,l=t.switchWorkspace,u=t.router,p=t.now||(()=>Date.now()),g=t.confirm||(d=>typeof globalThis.confirm!="function"||globalThis.confirm(d)),v=jh(),h=Uh(),A=Mh(),N=Nh(),U=Fh(),Z=null,oe=null,Y=null,q=null,j=[],K=null;function I(){let d=Rr.find(f=>f.value===v);return d?d.label:""}let L=document.createElement("div");L.className="mon",e.appendChild(L);let ne=document.createElement("div");ne.className="worker-drawer-overlay",ne.hidden=!0;let Ee=document.createElement("div");Ee.className="worker-drawer-overlay__backdrop";let we=document.createElement("div");we.className="worker-drawer-host mon2-drawer",ne.append(Ee,we),e.appendChild(ne);let H=cl(null,null),J=new Map,fe=new Map,xe=null,ge=null,ce=null,Ae=Wr(we,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Z=null,ne.hidden=!0,de()}});async function ve(d,f,w,$,z=!0){if(!o||!w)return null;let W=await o(d,{...f,root_dir:w,expected_revision:$});if(W&&W.conflict&&z){W.queue&&fe.set(w,W.queue);let y=W.queue&&typeof W.queue.revision=="number"?W.queue.revision:$;W=await o(d,{...f,root_dir:w,expected_revision:y})}return W&&W.queue&&w&&fe.set(w,W.queue),W}function G(d,f){let w=fe.get(d),$=s&&s.get?s.get():null,z=(Array.isArray($)?$:[]).find(y=>y?.root_dir===d);return(w||z)?.merge_queue?.find(y=>y.bead_id===f)?.continuation_action}async function te(d,f,w,$){let z=await ve(d,f,w,$),W=fe.get(w)?.revision??z?.queue?.revision??$;return qn(z,(y,O)=>ve(d,{...f,continuation:y,decision_token:O},w,W,!1),{refresh:y=>ve(d,f,w,y?.queue?.revision??fe.get(w)?.revision??W,!1)})}async function ie(d,f,w,$){let z=await qn({continuation_mismatch:$},(y,O)=>ve("worker-merge-queue-add",{bead_id:f,continuation:y,decision_token:O},d,w,!1)),W=z?.queue?.merge_queue?.find(y=>y.bead_id===f)?.continuation_action;z?.applied!==!0&&W?.continuation===null&&W.mismatch&&await ie(d,f,z.queue.revision,W.mismatch)}async function ke(d,f,w){let $=await ve("worker-discard",d,f,w);if($&&$.discarded===!0){le(sa($),"success",5e3);return}if($&&$.reason){le(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){le("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){le(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&le("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ue(d,f,w){return!o||!w?null:await o(d,{...f,root_dir:w})}async function _e(){let d=new Map;for(let f of H.pr_wait)d.has(f.root_dir)||d.set(f.root_dir,f.expected_revision);for(let[f,w]of d)await ve("worker-merge-queue-add-all",{},f,w)}function je(d){let f=U[d];return!!(f&&f.runnable===!0)}function M(d){let f={...U[d]||{}};f.runnable=!f.runnable,U={...U,[d]:f},wp(U),de()}function me(d){return U[d]===!0}function Me(d){U={...U,[d]:U[d]!==!0},wp(U),de()}function Ie(d){let f=H.queue_groups.find(w=>w.root_dir===d);if(!f)return null;for(let w=0;w<f.serial_lane_count;w+=1){let $=`s${w+1}`,z=f.sublanes.serial.find(W=>W.id===$);if(!z||z.raw_length===0&&z.occupied_by.length===0)return $}return null}function We(d,f){let w=H.queue_groups.find(z=>z.root_dir===d),$=w?w.sublanes.serial.find(z=>z.id===f):void 0;return $?$.raw_length:0}function Pe(d,f){let w=J.get(d),$=J.get(f);if(!w||!$)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let z=hp(w),W=hp($);if(z!==null&&z===W&&w.root_dir===$.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let y=yp(w),O=yp($);if(y&&W!==null){let E=W;return{kind:"ops",title:`${E} \uB05D\uC5D0 ${d}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:d,lane:E,index:We($.root_dir,E)}]}}if(z!==null&&O&&W===null){let E=z;return{kind:"ops",title:`${E} \uB05D\uC5D0 ${f}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:f,lane:E,index:We(w.root_dir,E)}]}}if(y&&z===null&&O&&W===null){let E=Ie(w.root_dir);return E===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${E} \uB808\uC778\uC5D0 ${f} \u2192 ${d} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:f,lane:E,index:0},{bead_id:d,lane:E,index:1}]}}return!y&&!O?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:y?{kind:"note",text:`${Rs($.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Rs(w.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function He(d,f){let w=Pe(d,f.id);return{id:f.id,title:f.title,location_label:f.location_label,prefixes:f.prefixes,action:w.kind==="note"?{kind:"note",text:w.text}:w.kind==="disabled"?{kind:"disabled",label:bp,title:w.title}:{kind:"place",label:bp,title:w.title}}}function Ye(d,f){if(!Y||Y.bead_id!==d)return null;let w=Y.counterpart_id,$=f.filter(z=>z.id===w);return $.length===0?null:{rows:$.map(z=>He(d,z))}}function it(d){let f=d.dependency_chips||null,w=d.overlap_chips||[],$=d.scope_state==="missing",z=d.cross_lane_chip;if(!f&&w.length===0&&!$&&!z)return null;let W=Ye(d.id,w);return{...f||{},...w.length>0?{overlaps:w}:{},...$?{scope_missing:!0}:{},...z?{cross_lane:{lane_id:z.lane_id,label:z.label}}:{},...W?{popover:W}:{}}}function ft(d){let f=it(d);return f?{...d,dependency_chips:f}:d}async function xt(d,f){let w=Pe(d,f);if(Y=null,w.kind!=="ops"){de();return}let $=cn(w.root_dir,w.ops[0].bead_id);for(let z of w.ops){let W=await _t(z,w.root_dir,$);if(W===null)break;$=W}de()}async function _t(d,f,w){try{let $=await ve("worker-queue-place",d,f,w,!1);if($&&$.conflict)return le("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!$||$.applied!==!0)return le($&&typeof $.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let z=$.queue?$.queue.revision:void 0;return typeof z!="number"?(le("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):z}catch($){return le(Oe($),"error"),null}}function ee(d){let f=je(d.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${d.root_dir}
        data-section="runnable"
        aria-expanded=${f?"false":"true"}
        aria-label=${`${d.name} \uC139\uC158 ${f?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${f?"\u25B8":"\u25BE"}
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
    </header>`}function X(d,f){return c`<div
      class="mon2-item"
      data-bead-id=${d.id}
      data-drag-kind="candidate"
      data-root-dir=${d.root_dir}
    >
      ${f}
    </div>`}function Te(d){if(oe!==d.id)return null;let f=H.queue_groups.find(W=>W.root_dir===d.root_dir),w=d.place_lanes||[],$=H.cross_lanes_revision!==null,z=[{id:"parallel",label:"\uBCD1\uB82C",count:d.place_index??0}];for(let W of H.chain_lanes)z.push({id:`lane:${W.lane_id}`,label:`\uC5F0\uACB0 ${W.number} (${W.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:W.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});z.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let W of w)z.push({id:`serial:${W.id}`,label:`\uC9C1\uB82C ${Number(W.id.slice(1))}`,count:W.length,group:`${f?f.name:""} \uC9C1\uB82C`});return{bead_id:d.id,lanes:z}}function Xe(){let d=[],f=new Set,w=($,z)=>{for(let W of $)f.has(W.id)||(f.add(W.id),d.push({bead_id:W.id,root_dir:W.root_dir,workspace_name:W.workspace_name,title:W.title,lane:z}))};return w(H.running,"running"),w(H.pr_wait,"pr_wait"),w(H.queue,"queue"),w(H.runnable_all,"runnable"),d}function De(d){if(!q||q.bead_id!==d)return"";let f=ct(),w=Xe(),$=new Map;for(let O of w)$.set(O.bead_id,O);let z=(f.get(d)||[]).filter(O=>$.has(O)),W=ep(Jd(d,{issues:w,blocked_by_map:f}),q.query),y=H.owner_of[d];return c`<div
      class="mon-deppanel"
      data-bead-id=${d}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${z.length===0?c`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${z.map(O=>c`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${O}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${d}
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
        .value=${q.query}
      />
      <div class="mon-deppanel__list">
        ${W.length===0?c`<div class="mon-deppanel__empty">후보 없음</div>`:W.map(O=>c`<button
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
                  >${O.reason?c`<span class="mon-deppanel__cand-reason"
                        >${O.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${y===void 0?c`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function be(d){return X(d,c`${Wi(ft(d),Te(d),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(f,w)=>i(w,d.root_dir):void 0})}${De(d.id)}`)}function Fe(){return H.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${H.runnable.map(d=>be(d))}
      </div>`:c`${H.runnable_sections.map(d=>{let f=je(d.root_dir);return c`<section
        class="mon2-sec${f?" is-collapsed":""}"
        data-root-dir=${d.root_dir}
        data-section="runnable"
      >
        ${ee({root_dir:d.root_dir,name:d.name,count:d.items.length})}
        ${f?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${d.items.map(w=>be(w))}
            </div>`}
      </section>`})}`}function at(d,f){return c`<div
      class="mon2-item"
      data-bead-id=${d.id}
      data-drag-kind="parallel"
      data-root-dir=${d.root_dir}
      data-row-index=${f}
      data-queue-index=${String(d.queue_index??0)}
    >
      ${Jn(ft(d))}
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
      ${De(d.id)}
    </div>`}function rt(){let d=me("parallel");return c`<section
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
        <span class="mon2-area__count">${H.parallel_rows.length}</span>
      </header>
      ${d?"":c`<div class="mon2-area__body" data-drop="parallel">
            ${H.parallel_rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:H.parallel_rows.map((f,w)=>at(f,w))}
          </div>`}
    </section>`}function Je(d,f,w){return c`<div
      class="mon2-crow${f.fixed?" mon2-crow--fixed":""}"
      draggable=${f.draggable?"true":"false"}
      data-bead-id=${f.id}
      data-drag-kind="chain"
      data-root-dir=${f.root_dir}
      data-lane-id=${d.lane_id}
      data-row-index=${w}
      data-queue-index=${typeof f.queue_index=="number"?String(f.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Gh(f.seq)}</span
      >
      ${f.workspace_name?c`<span class="worker-mini__repo" title=${f.root_dir}
            >${f.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${f.id}</span>
      <span class="mon2-crow__title">${f.title}</span>
      ${f.mismatch?c`<span
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
    </div>`}function yt(d){let f=H.cross_lanes_revision!==null;return c`<div class="mon2-clane" data-lane-id=${d.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${d.label}</span>
        <span class="mon2-clane__count">${d.rows.length}</span>
        <span
          class="mon2-clane__badge mon2-clane__badge--${d.draft?"draft":"confirmed"}"
          >${d.draft?"draft":"\uD655\uC815"}</span
        >
        ${d.all_done?c`<span class="mon2-clane__badge mon2-clane__badge--done"
              >모두 완료</span
            >`:""}
        ${d.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${d.lane_id}
              ?disabled=${!f||!d.can_confirm}
              title=${d.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:d.has_mismatch?c`<button
                type="button"
                class="mon2-clane__reapply"
                data-lane-id=${d.lane_id}
                ?disabled=${!f}
                title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
              >
                재적용
              </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${d.lane_id}
          ?disabled=${!f}
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
        ${d.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:d.rows.map((w,$)=>Je(d,w,$))}
      </div>
    </div>`}function It(d,f,w){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="repo-serial"
      data-root-dir=${f.root_dir}
      data-lane-id=${d.id}
      data-row-index=${w}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${Jn(ft(f))}
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
      ${De(f.id)}
    </div>`}function vt(d){if(d.length===0)return"";let f=d.length-1;return`${d[0].id} \uC810\uC720${f>0?` +${f}`:""}`}function Tt(d){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${d.id}
    >
      ${Jn({id:d.id,title:d.title,lane:"running",draggable:!1,ghost:!0,badges:[d.badge]})}
    </div>`}function wt(d,f){return c`<div
      class="mon2-lane${f.empty?" mon2-lane--empty":""}"
      data-root-dir=${d.root_dir}
      data-lane-length=${String(f.raw_length)}
    >
      ${yn({id:"",lane:f.id,title:`${d.name} \xB7 \uC9C1\uB82C ${f.index+1}`,items:f.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:c`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${d.root_dir}
          data-lane-id=${f.id}
          data-lane-length=${String(f.raw_length)}
        >
          ${f.occupants.map(w=>Tt(w))}
          ${f.items.length>0?f.items.map((w,$)=>It(f,w,$)):f.occupants.length>0?"":c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:c`<span
            class="mon2-lane__badge${f.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${f.occupants.length>0?f.occupants.map(w=>`${w.id} \u2014 ${w.badge}`).join(`
`):""}
            >${vt(f.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${d.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${f.empty?c`<div class="mon2-lane__hint">
            ${d.name} 직렬 ${f.index+1} 비어 있음
          </div>`:""}
      ${f.cycle?c`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(f.cross_wait_peers||[]).map(w=>c`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${w.workspace_name}·${w.lane}과 교차 대기
          </div>`)}
    </div>`}function ze(){let d=me("serial"),f=H.cross_lanes_revision!==null,w=H.chain_lanes.some($=>$.draft&&$.rows.length===0);return c`<section
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
          ?disabled=${w||!f}
          title=${f?w?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${d?"":c`<div class="mon2-area__body">
            ${H.cross_lanes_unreadable?c`<div class="mon2-clane__unreadable">
                  연결 레인 저장소를 읽을 수 없음
                </div>`:""}
            ${H.chain_lanes.map($=>yt($))}
            ${H.queue_groups.map($=>$.sublanes.serial.map(z=>wt($,z)))}
          </div>`}
    </section>`}function Re(){return c`<div class="mon2-wait">${rt()}${ze()}</div>`}function P(d){return c`<div class="worker-rungrid">
      ${H.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:H.running.map(f=>Ki({bead_id:f.id,attempt_id:f.attempt_id||"",title:f.title,runner:f.runner??null,model:f.model??null,effort:f.effort??null,speed:f.speed??null,started_at:f.started_at??null,kind:f.kind,...f.kind==="session"?{updated_at:f.updated_at,session_refs:f.session_refs||[]}:{},workflow:f.workflow||null,resumed_from:f.resumed_from??null,continuation_mode:f.continuation_mode??null,paused:f.run_state==="paused",failed:f.run_state==="failed",status:f.status,status_label:f.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:f.can_resume!==!1,can_pause:f.can_pause!==!1,exec_chips:f.exec_chips||null,usage:f.usage||null,discard:f.discard},d,Z,{monitor:{repo:f.workspace_name,root_dir:f.root_dir,serial_lane_id:f.serial_lane_id,last_activity:f.last_activity||null,legs:f.legs||[],dependency_chips:it(f)}}))}
    </div>`}function Q(d){let f={runnable:H.runnable,queue:H.queue,running:H.running,pr_wait:H.pr_wait,done:H.done};return c`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${Hh.map(w=>{let $=f[w.lane],z=w.lane==="runnable"?H.runnable_flat?$.length>0?Fe():void 0:H.runnable_sections.length>0?Fe():void 0:w.lane==="queue"?H.queue_groups.length>0||H.chain_lanes.length>0||H.parallel_rows.length>0?Re():void 0:w.lane==="running"?P(d):$.length>0?c`${$.map(W=>Jn(W))}`:void 0;return yn({id:`monitor-${w.lane}`,lane:w.pane,title:w.lane==="done"?`\uC644\uB8CC\xB7${I()}`:w.title,items:$,empty:w.empty,body:z,live:w.lane==="running"&&$.length>0,controls:w.lane==="runnable"?ue():void 0,header_control:C(w.lane,$.length)})})}
      </div>`}function ue(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${A.show_blocked}
        />
        🔒
        blocked${H.runnable_hidden.blocked>0?` ${H.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ll.map(d=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${A.spec===d.value?" is-active":""}"
              data-spec=${d.value}
              aria-pressed=${A.spec===d.value?"true":"false"}
            >
              ${d.label}
            </button>`)}
        ${H.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${H.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function C(d,f){return d==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${N}
      >
        ${Ms.map(w=>c`<option
              value=${w.value}
              ?selected=${N===w.value}
            >
              ${w.label}
            </option>`)}
      </select>`:d==="running"?c`<select
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
      </select>`:d==="pr_wait"&&f>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:d==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${v}
      >
        ${Rr.map(w=>c`<option value=${w.value} ?selected=${v===w.value}>
              ${w.label}
            </option>`)}
      </select>`:""}function V(d){let f=s&&s.get?s.get():null,w=s&&s.getWorkspacesState?s.getWorkspacesState():[],$=d===void 0?s&&s.crossLanes?s.crossLanes():void 0:d,z={done_since:dr(v,p()),running_sort:h,candidate_filter:A,candidate_sort:N};return $!==void 0&&(z.cross_lanes=$),cl(f,w,z)}function de(){let d=p();H=V(),J=new Map;for(let f of[...H.runnable,...H.queue,...H.running,...H.pr_wait,...H.done])!f.non_occupying&&!J.has(f.id)&&J.set(f.id,f);Ze(Q(d),L),b()?.render(),S(),x()}function S(){let d=new Map;for(let f of H.queue_groups)d.set(f.root_dir,f.auto_advance);for(let f of Array.from(L.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let w=f.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=d.get(w);typeof $=="boolean"&&f.setAttribute("title",`${f.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function b(){if(ce)return ce;let d=L.querySelector(".mon2-deck");return d?(ce=Gd(d,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>H.done,rangeLabel:I,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:re,onFocusChange:f=>{K=f,x()}}),ce):null}function x(){L.classList.toggle("has-focus",K!==null);for(let d of Array.from(L.querySelectorAll(".mon2-sec[data-root-dir]")))d.classList.toggle("is-focus",K!==null&&d.getAttribute("data-root-dir")===K);for(let d of Array.from(L.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let f=J.get(d.getAttribute("data-bead-id")||"");d.classList.toggle("is-focus",K!==null&&!!f&&f.root_dir===K)}for(let d of Array.from(L.querySelectorAll(".mon2-crow[data-root-dir]")))d.classList.toggle("is-focus",K!==null&&d.getAttribute("data-root-dir")===K)}function B(d,f){let w=a?a():void 0;if(!f||!w||f===w||!l){r(d);return}l(f).then(()=>{r(d)}).catch($=>{n("workspace switch for %s failed: %o",f,$)})}function re(d){if(!d)return;let f=a?a():void 0,w=()=>{try{u?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!l||f&&f===d){w();return}l(d).then(w).catch($=>{n("workspace switch for %s failed: %o",d,$),le("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function se(d){fn(d).then(f=>{le(f?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",f?"success":"error",1400)})}function he(d){let f=J.get(d)||null;return{item:f,root_dir:f?f.root_dir:"",revision:f?f.expected_revision:0}}function Oe(d){if(typeof d=="string"&&d.length>0)return d;if(d&&typeof d=="object"){let f=d;if(typeof f.message=="string"&&f.message.length>0)return f.message;if(typeof f.error=="string"&&f.error.length>0)return f.error;if(f.error&&typeof f.error=="object"&&typeof f.error.message=="string")return f.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function et(d,f,w){let $=H.owner_of[f];if(typeof $!="string"||$.length===0){le(`${f}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await Ue(d,{a:f,b:w},$)}catch(z){le(Oe(z),"error")}de()}function st(d){return H.runnable.some(f=>f.id===d)||H.parallel_rows.some(f=>f.id===d)?!0:H.queue_groups.some(f=>f.sublanes.serial.some(w=>w.items.some($=>$.id===d)))}function $e(d){!d||!st(d)||(q=q&&q.bead_id===d?null:{bead_id:d,query:""},de())}function ct(){let d=new Map,f=s&&s.get?s.get():null,w=$=>Array.isArray($)?$.filter(z=>typeof z=="string"&&z.length>0):[];for(let $ of Array.isArray(f)?f:[]){if(!$||typeof $!="object")continue;let z=$.bead_blocked_by&&typeof $.bead_blocked_by=="object"?$.bead_blocked_by:{};for(let[W,y]of Object.entries(z))Array.isArray(y)&&d.set(W,w(y));for(let W of[...Array.isArray($.runnable)?$.runnable:[],...Array.isArray($.session_active)?$.session_active:[]])W&&typeof W.bead_id=="string"&&Array.isArray(W.blocked_by)&&W.blocked_by.length>0&&d.set(W.bead_id,w(W.blocked_by))}return d}function qt(){let d=ct();for(let f of j){let w=(d.get(f.a)||[]).slice();f.type==="dep-remove"?d.set(f.a,w.filter($=>$!==f.b)):w.includes(f.b)||d.set(f.a,[...w,f.b])}return d}function Ct(d=H){let f=new Map,w=new Map,$=new Set,z=new Set;for(let y of d.chain_lanes){f.set(y.lane_id,{status:y.status,entries:y.rows.map(O=>({bead_id:O.id,root_dir:O.root_dir}))});for(let O of y.rows)w.set(O.id,y.lane_id),O.fixed&&$.add(O.id),O.unplaced||z.add(O.id)}let W=new Map;for(let y of d.parallel_rows)typeof y.queue_index=="number"&&W.set(y.id,y.queue_index);for(let y of d.queue_groups)for(let O of y.sublanes.serial)for(let E of O.items)typeof E.queue_index=="number"&&W.set(E.id,E.queue_index);return{blocked_by_map:qt(),owner_of:new Map(Object.entries(d.owner_of)),cross_lanes:f,owner_lane_of:w,fixed_members:$,placed_members:z,parallel_rows:d.parallel_rows.map(y=>({bead_id:y.id,root_dir:y.root_dir,queue_index:y.queue_index??0})),parallel_raw_length:new Map(Object.entries(d.parallel_raw_length)),queue_index_of:W}}function cn(d,f){let w=J.get(f);if(w&&w.root_dir===d)return w.expected_revision;let $=H.queue_groups.find(z=>z.root_dir===d);return $?$.revision:0}async function Qt(d,f,w){try{if(d.type==="worker-queue-place"||d.type==="worker-queue-reorder"||d.type==="worker-queue-remove"){let $=await ve(d.type,d.payload,d.root_dir,w.get(d.root_dir)??cn(d.root_dir,f));return!$||typeof $.applied!="boolean"?(le("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),!1):($.queue&&typeof $.queue.revision=="number"&&w.set(d.root_dir,$.queue.revision),$.conflict?(le("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):$.applied===!1?(le($.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0)}return(d.type==="dep-add"||d.type==="dep-remove")&&await Ue(d.type,{a:d.a,b:d.b},d.root_dir),!0}catch($){return le(Oe($),"error"),!1}}function jt(d){(d.type==="dep-add"||d.type==="dep-remove")&&(j=[...j,{type:d.type,a:d.a,b:d.b}])}async function Gt(d,f){if(!o)return{ok:!1};try{let w=await o(d.type,{...d.payload,expected_revision:f});return!w||typeof w.revision!="number"?(le("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:w.revision}}catch(w){let $=w,z=$&&$.code==="conflict"?$.details?.cross_lanes:null;return z&&typeof z.revision=="number"&&Array.isArray(z.lanes)?{ok:!1,conflict:z}:(le(Oe(w),"error"),{ok:!1})}}async function Ht(d,f,w){let $=new Map,z=d.ops.slice(0,d.lane_op_index),W=d.ops.slice(d.lane_op_index);for(let O of z){if(!await Qt(O,w,$))return{done:!0};jt(O)}let y=f;for(let O of d.lane_ops){if(y===null)return le("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let E=await Gt(O,y);if(!E.ok)return E.conflict?{done:!1,conflict:E.conflict}:{done:!0};y=E.revision}for(let O of W){if(!await Qt(O,w,$))return{done:!0};jt(O)}return{done:!0}}async function mt(d,f){j=[];let w=H;for(let $=0;;$+=1){let z=d(Ct(w));if("refused"in z){le(z.refused,"error");break}let W=await Ht(z,w.cross_lanes_revision,f);if(W.done)break;if($>=1){le("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}w=V(W.conflict)}j=[],de()}async function Wt(d,f){await mt(w=>el(d,f,w),d.bead_id)}async function Ve(d,f){if(d==="create"){await mt(w=>tl(null,w),"");return}if(d==="remove"){let w=H.chain_lanes.find($=>$.lane_id===f);if(w&&!w.draft){let $=w.rows.filter((z,W)=>W===0?!1:!z.mismatch).length;if(!g(`\uC758\uC874 ${$}\uAC1C\uB97C \uD568\uAED8 \uC81C\uAC70\uD569\uB2C8\uB2E4`))return}await mt($=>Qd(f,$),"");return}await mt(w=>d==="confirm"?Zd(f,w):Xd(f,w),"")}async function vn(d,f){let w=J.get(d);if(!w){de();return}let $={kind:"candidate",bead_id:d,root_dir:w.root_dir};if(f==="new-lane"){await mt(z=>tl({bead_id:d,root_dir:w.root_dir},z),d);return}if(f.startsWith("lane:")){let z=f.slice(5);if(!H.chain_lanes.find(y=>y.lane_id===z)){de();return}await mt(y=>el($,{kind:"chain",lane_id:z,marker_index:(y.cross_lanes.get(z)?.entries??[]).length},y),d);return}if(f.startsWith("serial:")){let z=f.slice(7),W=(w.place_lanes||[]).find(y=>y.id===z);await Wt($,{kind:"repo-serial",root_dir:w.root_dir,lane_id:z,index:W?W.index:0});return}await Wt($,{kind:"parallel",marker_index:H.parallel_rows.length})}async function ot(d,f){let w=H.parallel_rows,$=w.findIndex(ye=>ye.id===d);if($<0)return;let z=w[$].root_dir,W=[];w.forEach((ye,tt)=>{ye.root_dir===z&&W.push(tt)});let y=W.indexOf($),O=W[y+f];if(typeof O!="number")return;let E=f===-1?O:W[y+2]??Math.min(w.length,O+1);await Wt({kind:"parallel",bead_id:d,root_dir:z,queue_index:w[$].queue_index??0},{kind:"parallel",marker_index:E})}async function Ce(d){for(let f of H.chain_lanes){let w=f.rows.find($=>$.id===d);if(w){await Wt({kind:"chain",bead_id:d,root_dir:w.root_dir,lane_id:f.lane_id,...typeof w.queue_index=="number"?{queue_index:w.queue_index}:{}},{kind:"parallel",marker_index:H.parallel_rows.length});return}}}let R=null,pe=!1,Se=null;function dt(){Se!==null&&clearTimeout(Se),Se=setTimeout(()=>{Se=null,pe=!1},0)}function At(d,f){let w=f&&typeof f.closest=="function"?f.closest("[data-row-index]"):null;if(w&&d.contains(w)){let $=Number(w.getAttribute("data-row-index"));return Number.isFinite($)?$:0}return d.querySelectorAll("[data-row-index]").length}function gt(d){let f=d.target,w=typeof f?.closest=="function"?f.closest("[data-drop]"):null;if(!w||!R)return null;let $=w.getAttribute("data-drop");if($==="candidate")return{zone:w,target:{kind:"candidate"}};if($==="parallel")return{zone:w,target:{kind:"parallel",marker_index:At(w,f)}};if($==="chain")return{zone:w,target:{kind:"chain",lane_id:w.getAttribute("data-lane-id")||"",marker_index:At(w,f)}};if($==="repo-serial"){let z=w.getAttribute("data-root-dir")||"";if(z!==R.root_dir)return null;let W=typeof f?.closest=="function"?f.closest("[data-queue-index]"):null,y=W&&w.contains(W)?W.getAttribute("data-queue-index"):w.getAttribute("data-lane-length"),O=Number(y);return{zone:w,target:{kind:"repo-serial",root_dir:z,lane_id:w.getAttribute("data-lane-id")||"",index:Number.isFinite(O)?O:0}}}return null}function Mt(){for(let d of Array.from(L.querySelectorAll(".is-drop-over")))d.classList.remove("is-drop-over")}function Ut(d){let f=d.target,w=typeof f?.closest=="function"?f.closest('[draggable="true"][data-bead-id]'):null,$=w?w.closest("[data-drag-kind]"):null;if(!$)return;let z=$.getAttribute("data-bead-id")||"",W=$.getAttribute("data-drag-kind")||"",y=$.getAttribute("data-root-dir")||"";if(!z||!W||!y)return;let O=$.getAttribute("data-queue-index")||"",E=Number(O),ye=$.getAttribute("data-lane-id")||"";R={kind:W,bead_id:z,root_dir:y,...O!==""&&Number.isFinite(E)?{queue_index:E}:{},...ye?{lane_id:ye}:{}},pe=!0,oe=null,L.classList.add("is-dragging");try{d.dataTransfer?.setData("text/plain",z),d.dataTransfer&&(d.dataTransfer.effectAllowed="move")}catch{}}function Kt(d){let f=gt(d);f&&(d.preventDefault(),d.dataTransfer&&(d.dataTransfer.dropEffect="move"),f.zone.classList.add("is-drop-over"))}function rn(d){let f=d.target;typeof f?.closest=="function"&&f.closest("[data-drop]")?.classList.remove("is-drop-over")}function St(){R=null,Mt(),L.classList.remove("is-dragging"),dt()}function un(d){let f=gt(d),w=R;R=null,Mt(),L.classList.remove("is-dragging"),!(!f||!w)&&(d.preventDefault(),Wt(w,f.target))}function dn(d){return{runner:d.runner||void 0,model:d.model||void 0,effort:d.effort||void 0,status:d.run_state==="running"?"running":d.run_state,worktree:d.root_dir}}function Hn(d,f){let{item:w,root_dir:$,revision:z}=he(f),W=w?.attempt_id||"",y=d.classList;if(y.contains("mon2-rowops__up")||y.contains("mon2-rowops__down")){ot(f,y.contains("mon2-rowops__up")?-1:1);return}if(y.contains("mon2-rowops__remove")){ve("worker-queue-remove",{bead_id:f},$,z);return}if(y.contains("mon2-crow__detach")){Ce(f);return}if(y.contains("mon-dep__btn")){$e(f);return}if(y.contains("worker-dep__open")){$e(f);return}if(y.contains("mon-lane__chip")){let O=d.getAttribute("data-lane-id")||"";L.querySelector(`.mon2-clane[data-lane-id="${O}"]`)?.scrollIntoView({block:"nearest"});return}if(y.contains("mon-deppanel__unlink")){let O=d.getAttribute("data-dep-a")||"",E=d.getAttribute("data-dep-b")||"";g(`${E}\uAC00 ${O}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&et("dep-remove",O,E);return}if(y.contains("mon-deppanel__cand")){let O=d.getAttribute("data-dep-cand")||"";q&&O&&et("dep-add",q.bead_id,O);return}if(y.contains("mon-overlap__chip")){let O=d.getAttribute("data-overlap-id")||"";Y=!!Y&&Y.bead_id===f&&Y.counterpart_id===O?null:{bead_id:f,counterpart_id:O},de();return}if(y.contains("mon-overlap__place")){xt(f,d.getAttribute("data-counterpart-id")||"");return}if(y.contains("worker-card__place")){oe=oe===f?null:f,de();return}if(y.contains("worker-card__place-cancel")){oe=null,de();return}if(y.contains("worker-card__place-lane")){let O=d.getAttribute("data-lane")||"parallel";oe=null,vn(f,O);return}if(y.contains("rtile__session")){if(w&&w.kind==="session"){let O=(w.session_refs||[]).find(E=>E&&E.current===!0);O&&(ne.hidden=!1,Ae.open(Ao(O,f,"in_progress",$)),de());return}Z=W,W&&w&&(ne.hidden=!1,Ae.open({attempt_id:W,root_dir:$,meta:dn(w)})),de();return}if(y.contains("rtile__pause")){Ue("worker-attempt-pause",{attempt_id:W},$);return}if(y.contains("rtile__resume")){qr().then(O=>{if(O!==null)return te("worker-attempt-resume",{attempt_id:W,...O!==""?{instructions:O}:{}},$,z)});return}if(y.contains("rtile__dismiss")){ve("worker-attempt-dismiss",{attempt_id:W},$,z);return}if(y.contains("rtile__discard")){if(!g(Cs(f,"unmerged")))return;ke({bead_id:f,...W?{attempt_id:W}:{},...d.dataset.operationId?{operation_id:d.dataset.operationId}:{}},$,z);return}if(y.contains("worker-mini__merge")){let O=G($,f);O?.mismatch&&O.continuation===null?ie($,f,z,O.mismatch):ve("worker-merge-queue-add",{bead_id:f},$,z);return}if(y.contains("worker-mini__merge-cancel")){ve("worker-merge-queue-remove",{bead_id:f},$,z);return}if(y.contains("worker-mini__discard")){let O=d.dataset.discardMode==="merged"?"merged":"unmerged";if(!g(Cs(f,O)))return;ke({bead_id:f,...d.dataset.attemptId?{attempt_id:d.dataset.attemptId}:{},...d.dataset.operationId?{operation_id:d.dataset.operationId}:{}},$,z);return}if(y.contains("worker-mini__revise-fix")){te("worker-revise-fix",{bead_id:f},$,z);return}y.contains("worker-mini__revise-approve")&&ve("worker-revise-approve",{bead_id:f},$,z)}function T(d){let f=pe;pe=!1;let w=d.target;if(!w||typeof w.closest!="function"||w.closest("dialog")||w.closest(".worker-drawer-overlay")||w.closest("a"))return;let $=w.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){d.preventDefault();let Ge=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";Ge&&se(Ge);return}let z=w.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(z){d.preventDefault();let lt=z.getAttribute("data-root-dir")||J.get(w.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||z.getAttribute("title")||"";re(lt);return}let W=w.closest(".mon2-sec__toggle");if(W){d.preventDefault(),M(W.getAttribute("data-root-dir")||"");return}let y=w.closest(".mon2-area__toggle");if(y){d.preventDefault(),Me(y.getAttribute("data-area")||"parallel");return}if(w.closest(".mon2-newlane")){d.preventDefault(),Ve("create","");return}let O=w.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove");if(O){d.preventDefault();let lt=O.getAttribute("data-lane-id")||"";Ve(O.classList.contains("mon2-clane__confirm")?"confirm":O.classList.contains("mon2-clane__reapply")?"reapply":"remove",lt);return}if(w.closest(".mon-merge-all")){d.preventDefault(),_e();return}let E=w.closest(".mon-filter__spec");if(E){d.preventDefault(),A={...A,spec:E.getAttribute("data-spec")||"all"},vp(A),de();return}let ye=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!ye)return;let tt=ye.getAttribute("data-bead-id")||"",nt=w.closest("button");if(nt){d.preventDefault(),Hn(nt,tt);return}tt&&!f&&(d.preventDefault(),B(tt,ye.getAttribute("data-root-dir")||he(tt).root_dir))}function D(d){let f=d.target;if(!f||typeof f.closest!="function")return;let w=f.closest(".mon-filter__blocked");if(w){A={...A,show_blocked:w.checked},vp(A),de();return}let $=f.closest(".mon-candidate-sort");if($){N=Ms.some(y=>y.value===$.value)?$.value:"repo_spec",qh(N),de();return}let z=f.closest(".mon-running-sort");if(z){h=z.value==="repo"?"repo":"started",Wh(h),de();return}let W=f.closest(".mon-done-range");W&&(v=On(W.value),Bh(v),de())}function Le(d){let f=d.target,w=f&&typeof f.closest=="function"?z=>f.closest(z):()=>null,$=!1;Y&&!w(".mon-overlap__popover, .mon-overlap__chip")&&(Y=null,$=!0),q&&!w(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(q=null,$=!0),$&&de()}function Be(d){d.key!=="Escape"||!Y&&!q||(Y=null,q=null,de())}function Qe(d){let f=d.target;!f||typeof f.closest!="function"||!f.closest(".mon-deppanel__search")||!q||(q={...q,query:f.value},de())}e.addEventListener("click",T),e.addEventListener("change",D),e.addEventListener("input",Qe),document.addEventListener("click",Le),document.addEventListener("keydown",Be),e.addEventListener("dragstart",Ut),e.addEventListener("dragover",Kt),e.addEventListener("dragleave",rn),e.addEventListener("drop",un),e.addEventListener("dragend",St),s&&typeof s.subscribe=="function"&&(xe=s.subscribe(()=>{try{fe.clear(),de()}catch{}}));function _(){ge!==null&&(clearInterval(ge),ge=null)}function k(){Se!==null&&(clearTimeout(Se),Se=null)}return{load(){n("load"),de(),ge===null&&(ge=setInterval(()=>{try{de()}catch{}},zh))},pause(){_()},clear(){_(),k(),xe&&(xe(),xe=null),Ae.destroy(),ne.hidden=!0,ce?.destroy(),ce=null,e.removeEventListener("click",T),e.removeEventListener("change",D),e.removeEventListener("input",Qe),document.removeEventListener("click",Le),document.removeEventListener("keydown",Be),e.removeEventListener("dragstart",Ut),e.removeEventListener("dragover",Kt),e.removeEventListener("dragleave",rn),e.removeEventListener("drop",un),e.removeEventListener("dragend",St),e.replaceChildren()}}}function Rp(e,t,n){let r=Lt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(v){return h=>{h.preventDefault();let A=v==="monitor"&&l()==="monitor"?"worker":v;r("click tab %s",A),n.gotoView(A)}}function l(){let v=t.getState();return v.view==="worker"||v.view==="monitor"?v.view:"board"}function u(){let v=l();return c`
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
    `}function p(){let v=l();return c`
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
    `}function g(){s&&Ze(u(),s),o&&Ze(p(),o)}return g(),a=t.subscribe(()=>g()),{destroy(){a&&(a(),a=null),s&&Ze(c``,s),o&&Ze(c``,o)}}}var Op=["bug","feature","task","epic","chore"];function Lp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Ip=["Critical","High","Medium","Low","Backlog"];function Pp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),g=n.querySelector("#btn-create"),v=n.querySelector(".new-issue__close");function h(){o.replaceChildren();let j=document.createElement("option");j.value="",j.textContent="\u2014 Select \u2014",o.appendChild(j);for(let K of Op){let I=document.createElement("option");I.value=K,I.textContent=Lp(K),o.appendChild(I)}a.replaceChildren();for(let K=0;K<=4;K+=1){let I=document.createElement("option");I.value=String(K);let L=Ip[K]||"Medium";I.textContent=`${K} \u2013 ${L}`,a.appendChild(I)}}h();function A(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function N(j){s.disabled=j,o.disabled=j,a.disabled=j,i.disabled=j,l.disabled=j,p.disabled=j,g.disabled=j,g.textContent=j?"Creating\u2026":"Create"}function U(){u.textContent=""}function Z(j){u.textContent=j}function oe(){try{let j=window.localStorage.getItem("beads-ui.new.type");j?o.value=j:o.value="";let K=window.localStorage.getItem("beads-ui.new.priority");K&&/^\d$/.test(K)?a.value=K:a.value="2"}catch{o.value="",a.value="2"}}function Y(){let j=o.value||"",K=a.value||"";j.length>0&&window.localStorage.setItem("beads-ui.new.type",j),K.length>0&&window.localStorage.setItem("beads-ui.new.priority",K)}async function q(){U();let j=String(s.value||"").trim();if(j.length===0){Z("Title is required"),s.focus();return}let K=Number(a.value||"2");if(!(K>=0&&K<=4)){Z("Priority must be 0..4"),a.focus();return}let I=String(o.value||""),L=String(l.value||""),ne={title:j};I.length>0&&(ne.type=I),String(K).length>0&&(ne.priority=K),L.length>0&&(ne.description=L),N(!0);try{await t("create-issue",ne)}catch{N(!1),Z("Failed to create issue");return}Y(),N(!1),A()}return n.addEventListener("cancel",j=>{j.preventDefault(),A()}),v.addEventListener("click",()=>A()),p.addEventListener("click",()=>A()),n.addEventListener("keydown",j=>{j.key==="Enter"&&(j.ctrlKey||j.metaKey)&&(j.preventDefault(),q())}),r.addEventListener("submit",j=>{j.preventDefault(),q()}),{open(){r.reset(),U(),oe();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){A()}}}var Kh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Vh(e,t){return Za(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Dp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=Vh(r,e);return c`<button
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
  `}function Mp(e,t,n){return c`
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
  `}function Np(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Kh.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Yh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function qp(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(J=>le(J,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,u="",p=null;function g(){if(p)return p;let J=a.querySelector('[data-pane="execution"]');return J?(p=fa(J,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:fe=>t.queueStore?.set?.(fe)}),p):null}function v(){return c`
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
    `}function h(){let J=r.get();return c`
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
        ${J?c`
              ${Dp(J,s(),Z)}
              ${Mp(J,u,{onDraft:fe=>{u=fe},onAdd:oe,onRemove:Y})}
              ${Np(J,q)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function A(J){let fe=r.get();if(fe)try{let xe=await n("display-policy-set",{expected_revision:fe.revision,policy:J(fe)});N(xe),xe&&xe.conflict&&xe.policy&&(xe=await n("display-policy-set",{expected_revision:xe.policy.revision,policy:J(xe.policy)}),N(xe)),xe&&xe.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function N(J){J&&J.policy&&typeof J.policy=="object"&&r.set(J.policy)}function U(J){A(J)}function Z(J){let fe=r.get();if(!fe)return;let xe=!Zh(J,fe);U(ge=>Xh(J,ge,xe))}function oe(){let J=u.trim();J.length!==0&&(u="",U(fe=>fe.hidden_prefixes.includes(J)?{hidden_prefixes:fe.hidden_prefixes}:{hidden_prefixes:[...fe.hidden_prefixes,J]}),j())}function Y(J){U(fe=>({hidden_prefixes:fe.hidden_prefixes.filter(xe=>xe!==J)}))}function q(J){let fe=r.get();if(!fe)return;let xe=fe.chips[J]===!1;U(()=>({chips:{[J]:xe}}))}function j(){Ze(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Yh.map(J=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${J.id}
                  aria-selected=${String(i===J.id)}
                  aria-controls=${`settings-pane-${J.id}`}
                  @click=${()=>K(J.id)}
                >
                  <span class="settings-dialog__glyph">${J.glyph}</span>
                  ${J.label}
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
            ${v()} ${h()}
          </div>
        </div>
      `,a),g()}function K(J){i=J,j()}let I=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",I),a.addEventListener("cancel",I);let L=J=>{J.target===a&&H()};a.addEventListener("click",L);let ne=null;r.subscribe&&(ne=r.subscribe(()=>{l&&j()}));let Ee=null;t.implPresetStore?.subscribe&&(Ee=t.implPresetStore.subscribe(()=>{l&&p?.render()}));function we(J="execution"){l||(l=!0,t.onOpenChange?.(!0),i=J,u="",j(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),g()?.load())}function H(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:we,close:H,sessionDraft:()=>p?.sessionDraft()??{},destroy(){l=!1,a.removeEventListener("close",I),a.removeEventListener("cancel",I),a.removeEventListener("click",L),ne&&(ne(),ne=null),Ee&&(Ee(),Ee=null),p?.destroy(),p=null,a.remove()}}}function Zh(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Xh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Qh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Fp="usage-meter-card",Jh="usage-meter-layer",ul=600,ey=["token_expired","relogin_required"];function jp(e){return String(e).padStart(2,"0")}function ty(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Bp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${jp(r.getHours())}:${jp(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Qh[r.getMonth()]} ${r.getDate()} ${o}`;return`${ty(n,t)} \xB7 ${i}`}function ny(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Up(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Wp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var zp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Gp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function ry(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Gp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function sy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let a=ry(o);a&&r.push(a)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?Gp(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function oy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=sy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Kp(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function ay(e,t){return!e.held||Kp(e,t)<=ul?e:{...e,available:!1,windows:[],accounts:[]}}function Hp(e,t){return`${e}:${t}`}function Vp(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,l=null;function u(){Ze(c``,e),e.hidden=!0,g()}function p(){if(l===null){let ge=e.ownerDocument;l=ge.createElement("div"),l.id=Jh,l.className="usage-meter__layer",ge.body.appendChild(l)}return l}function g(){l!==null&&(Ze(c``,l),l.remove(),l=null)}function v(ge){n!==ge&&(n===null&&(document.addEventListener("mousedown",A),document.addEventListener("keydown",U),window.addEventListener("resize",N)),n=ge)}function h(){n!==null&&(n=null,document.removeEventListener("mousedown",A),document.removeEventListener("keydown",U),window.removeEventListener("resize",N))}function A(ge){let ce=ge.target;ce&&(e.contains(ce)||l!==null&&l.contains(ce))||(h(),H())}function N(){H()}function U(ge){ge.key==="Escape"&&(h(),H())}function Z(ge){n===ge?h():v(ge),H()}function oe(){h(),H()}async function Y(ge,ce){if(r.has(ge.key))return;let Ae=Hp(ge.key,ce);r.set(ge.key,ce),a.delete(Ae),H();let ve=null;try{ve=await(await fetch(ge.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ce})})).json()}catch{ve=null}if(t)return;if(r.delete(ge.key),!ve||ve.ok!==!0){let te=ve&&typeof ve.error=="string"&&ve.error.length>0?ve.error:"network_error";a.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${te}`}),H();return}let G=Array.isArray(ve.warnings)?ve.warnings.filter(te=>typeof te=="string"&&te.length>0):[];G.length>0&&a.set(Ae,{kind:"warn",text:G.join(" \xB7 ")}),H(),await xe()}function q(ge,ce,Ae,ve){let G=Wp(ge.pct),ie=`resets ${Bp(ge.resetsAt,ve)}${ce?` \xB7 ${Ae}`:""}`;return c`<span
      class="usage-meter__window ${Up(G)}"
      style=${`--progress: ${G}%`}
      title=${ie}
    >
      <span class="usage-meter__label">${ge.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${G}%</span>
    </span>`}function j(ge,ce,Ae){let ve=Kp(ce,Ae),G=ce.available&&(ce.held||ve>ul),te=G?`${Math.floor(ve/60)}\uBD84 \uC804 \uCE21\uC815`:"",ie=ce.accounts.filter(je=>!je.active).length,ke=`usage-meter__group${G?" usage-meter__group--stale":""}`,Ue=c`<span class="usage-meter__provider"
        >${ge.label}</span
      >
      ${ce.available?ce.windows.map(je=>q(je,G,te,Ae)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ie>0?c`<span class="usage-meter__badge">+${ie}</span>`:""}`;if(ce.accounts.length===0)return c`<span
        class=${ke}
        aria-label=${`${ge.label} usage`}
        >${Ue}</span
      >`;let _e=n===ge.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ke}`}
      aria-label=${`${ge.label} usage`}
      aria-expanded=${_e?"true":"false"}
      aria-controls=${Fp}
      @click=${()=>Z(ge.key)}
    >
      ${Ue}
    </button>`}function K(ge,ce){return c`<span class="usage-meter" aria-label="Usage">
      ${ge.map(Ae=>j(Ae.provider,Ae.snapshot,ce))}
    </span>`}function I(ge,ce){let Ae=Wp(ge.pct),ve=Bp(ge.resetsAt,ce);return c`<span
      class="usage-meter__account-window ${Up(Ae)}"
      style=${`--progress: ${Ae}%`}
    >
      <span class="usage-meter__account-key">${ge.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ae}%</span>
      <span class="usage-meter__account-reset"
        >${ve.length>0?`\u21BB ${ve}`:""}</span
      >
    </span>`}function L(ge,ce){return ey.includes(ce)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ge.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ne(ge,ce,Ae){let ve=ce.status==="ok",G=typeof ce.ageSeconds=="number"&&ce.ageSeconds>ul,te=a.get(Hp(ge.key,ce.number)),ie=r.get(ge.key),ke=ie!==void 0,Ue=ie===ce.number,_e=["usage-meter__account"];return ce.active&&_e.push("usage-meter__account--active"),ve||_e.push("usage-meter__account--unavailable"),G&&_e.push("usage-meter__account--stale"),c`<div class=${_e.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${ce.email}
          >${ce.alias===null?ce.email:ce.alias}</span
        >
        ${ce.plan===null?"":c`<span class="usage-meter__account-tag">${ce.plan}</span>`}
        ${ce.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${ce.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${ny(ce.ageSeconds)}</span
            >`}
        ${ce.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ke}
              @click=${()=>{Y(ge,ce.number)}}
            >
              ${Ue?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${ve?c`<div class="usage-meter__account-windows">
            ${ce.windows.map(je=>I(je,Ae))}
          </div>`:c`<div class="usage-meter__account-status">
            ${L(ge,ce.status)}
          </div>`}
      ${te===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${te.kind}"
          >
            ${te.text}
          </div>`}
    </div>`}function Ee(ge,ce,Ae){let ve=ce.accounts.filter(G=>G.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ge.label} · 활성 ${ve} / 전체
        ${ce.accounts.length}
      </h2>
      ${ce.accounts.map(G=>ne(ge,G,Ae))}
    </section>`}function we(ge,ce){return c`<div
      class="usage-meter__card"
      id=${Fp}
      role="dialog"
      aria-label=${`${ge.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${Ee(ge.provider,ge.snapshot,ce)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function H(){let ge=Date.now(),ce=[];for(let ve of zp){let G=o.get(ve.key);G&&ce.push({provider:ve,snapshot:ay(G,ge)})}if(ce.length===0){h(),u();return}let Ae=ce.find(ve=>ve.provider.key===n&&ve.snapshot.accounts.length>0);Ae||h(),Ze(K(ce,ge),e),e.hidden=!1,Ae?J(Ae,ge):g()}function J(ge,ce){let Ae=p(),ve=e.getBoundingClientRect(),G=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${ve.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,G-ve.right)}px`),Ze(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${oe}
        ></div>
        ${we(ge,ce)}`,Ae)}async function fe(ge){try{let ce=await fetch(ge.endpoint);return ce.ok?oy(await ce.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function xe(){i+=1;let ge=i,ce=await Promise.all(zp.map(async Ae=>({provider:Ae,read:await fe(Ae)})));if(!(t||ge!==i)){for(let Ae of ce){let ve=Ae.provider.key;if(Ae.read.kind==="ok"){o.set(ve,Ae.read.snapshot);continue}if(Ae.read.kind==="empty"){o.delete(ve);continue}let G=o.get(ve);G!==void 0&&!G.held&&o.set(ve,{...G,held:!0})}H()}}return u(),xe(),s=setInterval(()=>{xe()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),h(),u()}}}function Yp(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var iy="worker-ineligible";function Ns(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Zp(e){return Ns(e).includes(iy)}var ly="session-preferred",cy=["exclusive_machine"];function Xp(e,t){if(!Ns(e).includes(ly)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&cy.includes(n)?n:""}var uy="worker-serial";function dl(e){return Ns(e).includes(uy)}function pl(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var dy=new Set(["done","failed","orphaned","stopped","discarded"]),py={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},fy={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},_y={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function fl(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:_y[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Qp(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,u=new Map,p=!1,g=null,v=null,h=null,A=new Set,N=!1,U=0,Z=null,oe=new Set;function Y(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function q(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function j(){return o&&o()||""}async function K(){if(!s)return;let S=++U;N=!0,h=null,A.clear(),ze();try{let b=await s("worker-parallel-analysis-targets",{root_dir:j()});if(S!==U||!Re)return;let x=Array.isArray(b?.qualified)?b.qualified:[],B=Array.isArray(b?.excluded)?b.excluded:[];h={qualified:x,excluded:B};for(let re of x)re&&typeof re.id=="string"&&A.add(re.id)}catch{S===U&&Re&&(h={qualified:[],excluded:[]},le("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{S===U&&(N=!1,Re&&ze())}}function I(S){return Array.isArray(S.runs)?S.runs:[]}function L(){let S=Y(),b=new Set;for(let x of Object.values(S.attempts||{})){let B=x;B&&typeof B.bead_id=="string"&&!dy.has(B.status)&&b.add(B.bead_id)}for(let x of Array.isArray(S.pr_wait)?S.pr_wait:[])x&&typeof x.bead_id=="string"&&b.add(x.bead_id);for(let x of Object.values(S.discard_operations||{})){let B=x;B&&B.phase!=="done"&&typeof B.bead_id=="string"&&b.add(B.bead_id)}return b}function ne(S){return S.filter(b=>Ee(b)===null)}function Ee(S){let b=Y();for(let x of Array.isArray(b.serial_lanes)?b.serial_lanes:[])if(Array.isArray(x?.entries)&&x.entries.some(B=>B.bead_id===S))return x.id;return(Array.isArray(b.queue)?b.queue:[]).some(x=>x.bead_id===S)?"parallel":null}function we(S,b){let x=l.get(S);return x||[...b.order]}function H(S){if(S.length<2)return!1;let b=Ee(S[0]);if(!b||b==="parallel")return!1;let x=Y(),B=(Array.isArray(x.serial_lanes)?x.serial_lanes:[]).find(se=>se.id===b)?.entries.map(se=>se.bead_id);if(!Array.isArray(B))return!1;let re=S.map(se=>B.indexOf(se));return re.every(se=>se>=0)&&re.every((se,he)=>he===0||se>re[he-1])}function J(){let S=Y(),b=Array.isArray(S.serial_lanes)?S.serial_lanes:[],x=b.find(B=>Array.isArray(B.entries)&&B.entries.length===0);return x?x.id:b[0]?.id||"s1"}function fe(S){let b=Y().bead_titles||{};return typeof b[S]=="string"?b[S]:S}async function xe(S,b){if(!s||p)return null;p=!0,ze();try{return await s(S,b)}finally{p=!1,ze()}}async function ge(S){r?.setPending?.(!0);try{let b=await xe("worker-parallel-analysis-start",{force:S,target_ids:Array.from(A)});b&&b.applied===!1&&b.reason&&(b.reason==="target_not_qualified"&&Array.isArray(b.detail)?le(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${b.detail.join(", ")}`,"error",3200):le(`\uBD84\uC11D \uC2E4\uD328: ${b.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ce(){let S=q().job;!s||!S||await s("worker-parallel-analysis-cancel",{job_id:S.job_id})}async function Ae(S){if(!(!s||oe.has(S))){oe.add(S),ze();try{let b=await s("worker-parallel-analysis-prompt",{root_dir:j(),run_id:S});if(!Re)return;if(b?.ok===!0&&typeof b.prompt=="string"){Z={run_id:S,prompt:b.prompt};return}le(b?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{oe.delete(S),ze()}}}function ve(){Z=null,ze()}async function G(){if(!Z)return;let S=await fn(Z.prompt);le(S?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",S?"success":"error",1400)}function te(S,b){a&&a(S,fl(b))}function ie(){return Y().runner_catalog}function ke(S){return Object.keys(ie()?.runners?.[S]?.models||{})}function Ue(S){let b=ke(S),x=ie()?.runners?.[S]?.default_model;return typeof x=="string"&&b.includes(x)?x:b[0]||""}function _e(){let S=q().settings,b=g||S.runner||"claude",x=ke(b),B=g?Ue(b):S.model||x[0]||"",re=pl(ie(),b,B),se=S.effort||"",he=re.includes(se)?se:re[0]||"";return{runner:b,model:B,effort:he,models:x,efforts:re}}async function je(S){let b=q().settings,x=await xe("worker-parallel-analysis-settings-update",{expected_revision:b.revision,runner:S.runner,model:S.model,effort:S.effort});(!x||x.applied!==!0)&&(g=null,ze(),x&&x.reason&&le(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${x.reason}`,"error",2800))}function M(S){g=S,ze();let b=_e();je({runner:S,model:b.model,effort:b.effort})}function me(S){let b=_e(),x=pl(ie(),b.runner,S);je({runner:b.runner,model:S,effort:x.includes(b.effort)?b.effort:x[0]||""})}function Me(S){let b=_e();je({runner:b.runner,model:b.model,effort:S})}async function Ie(S,b){if(!s||p)return;let x=we(S,b),B=q();if(x.length<2||!B.last_good){le("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let re=u.get(S)||J(),se=()=>({snapshot_digest:B.last_good.identity_digest,group_index:S,lane:re,ordered_bead_ids:x,expected_revision:Y().revision});p=!0,ze();try{let he=await s("worker-parallel-analysis-submit",se());he&&he.queue&&n&&n.set(he.queue),he&&he.applied!==!0&&he.conflict===!0&&(he=await s("worker-parallel-analysis-submit",se()),he&&he.queue&&n&&n.set(he.queue)),he&&he.applied===!0?(l.delete(S),le(`\uC9C1\uB82C \uB808\uC778 ${re}\uC5D0 ${x.length}\uAC1C \uBC30\uCE58`,"success")):le(`\uC81C\uCD9C \uAC70\uBD80: ${he?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,ze()}}function We(S,b,x){l.set(S,we(S,b).filter(B=>B!==x)),ze()}function Pe(S){l.delete(S),ze()}function He(S,b,x,B){let re=[...we(S,b)],se=re.indexOf(x),he=se+B;se<0||he<0||he>=re.length||(re.splice(he,0,...re.splice(se,1)),l.set(S,re),ze())}function Ye(){let S=q().settings,b=Object.keys(ie()?.runners||{}),x=_e();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${B=>M(B.target.value)}
        >
          ${b.map(B=>c`<option
                value=${B}
                ?selected=${x.runner===B}
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
          @change=${B=>me(B.target.value)}
        >
          ${x.models.map(B=>c`<option
                value=${B}
                ?selected=${x.model===B}
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
          @change=${B=>Me(B.target.value)}
        >
          ${x.efforts.map(B=>c`<option
                value=${B}
                ?selected=${x.effort===B}
              >
                ${B}
              </option>`)}
        </select>
      </label>
      ${it(S)}
    </div>`}function it(S){return!xt(S)||ft(S)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:S.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${S.runner}/${S.model} · effort
        ${S.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:S.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function ft(S){return S.is_default===!0&&S.compatible===!1}function xt(S){return!!(S.runner&&S.model&&S.effort)}function _t(S){return xt(S)&&S.compatible!==!1}function ee(S){let b=Math.max(0,Math.floor(S/1e3)),x=Math.floor(b/60),B=b%60;return`${x}:${String(B).padStart(2,"0")}`}function X(S){let b=S.job;if(b){let x=typeof b.started_at=="number"?b.started_at:0,B=`${b.runner||"?"}/${b.model||"?"}`,re=x?` \xB7 \uACBD\uACFC ${ee(Date.now()-x)}`:"",se=typeof b.session_id=="string"?b.session_id:"",he=I(S).find(Oe=>Oe.run_id===b.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${B} · effort ${b.effort||"?"}${re}</span
        >
        ${se?c`<code class="pa-session-id" title=${se}
              >${se.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>te(b.job_id,he||b)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${he?.prompt_saved!==!0||oe.has(b.job_id)}
          @click=${()=>{Ae(b.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Xe()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Te(S){let b=X(S);return b===""?"":c`<div class="pa__strip">${b}</div>`}function Xe(){return r?.isPending?.()===!0}function De(S){let b=!!S.job,x=_t(S.settings),B=h!==null&&A.size===0,re=b||p||Xe()||N;return c`<div class="pa-meta">
      ${S.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(S.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!x||re||B}
        @click=${()=>{ge(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!x||re||B}
        @click=${()=>{ge(!0)}}
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
    </div>`}function be(S){return typeof S=="string"&&S.length>0?S:"\uBBF8\uBC30\uCE58"}function Fe(S,b){b?A.add(S):A.delete(S),ze()}function at(S){let b=Array.isArray(S.scope)?S.scope:[],x=Array.isArray(S.overlaps)?S.overlaps:[];return b.length===0&&x.length===0?c``:c`<span class="pa-target__signals">
      ${b.length>0?c`<details class="pa-target__scope" title=${b.join(`
`)}>
            <summary>scope ${b.length}</summary>
            <ul>
              ${b.map(B=>c`<li><code>${B}</code></li>`)}
            </ul>
          </details>`:""}
      ${x.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${x.join(", ")}`}
            >겹침 ${x.join(", ")}</span
          >`:""}
    </span>`}function rt(){let S=h?.qualified||[],b=h?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${N?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${S.length} \xB7 \uC81C\uC678 ${b.length}`}</span
        >
      </header>
      ${h&&S.length>0?c`<ul class="pa-targets__list">
            ${S.map(x=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${x.id}
                      .checked=${A.has(x.id)}
                      @change=${B=>Fe(x.id,B.target.checked)}
                    />
                    <span class="pa-target__title">${x.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${at(x)}
                    <span class="pa-target__route">${x.route}</span>
                    <span class="pa-target__lane"
                      >${be(x.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:h&&S.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${h&&b.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${b.length}</summary>
            <ul class="pa-targets__list">
              ${b.map(x=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${x.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${py[x.reason]||x.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${be(x.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function Je(S){let b=typeof S.session_id=="string"&&S.session_id.length>0,x=b?S.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${S.outcome}"
        >${fy[S.outcome]||S.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(S.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${S.runner||"?"} / ${S.model||"?"} / ${S.effort||"?"}</span
      >
      ${b?c`<code class="pa-session-id" title=${x}
            >${x.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${S.outcome==="failure"&&S.reason?c`<span class="pa-run-row__reason">${S.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>te(S.run_id,S)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${S.prompt_saved!==!0||oe.has(S.run_id)}
          @click=${()=>{Ae(S.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function yt(S){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${S.length>0?c`<ul class="pa-runs__list">
            ${S.map(b=>Je(b))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function It(){return Z?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${ve}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${Z.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{G()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${ve}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Z.prompt}</pre
        >
      </section>
    </div>`:""}function vt(S,b){let x=we(S,b),B=L(),re=x.filter($e=>B.has($e)),se=ne(x),he=H(x),Oe=Array.isArray(Y().serial_lanes)?Y().serial_lanes:[],et=u.get(S)||J(),st=b.eligible!==!0||x.length<2||re.length>0||se.length>0||he||p;return c`<section class="pa-group" data-group-index=${String(S)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${b.confidence}</span>
        ${b.categories.map($e=>c`<span class="pa-group__category">${$e}</span>`)}
        ${he?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${b.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${se.length>0?c`<span class="pa-group__stale"
              >stale — ${se.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${b.reason}</p>
      <ol class="pa-group__members">
        ${x.map(($e,ct)=>c`<li class="pa-member" data-bead-id=${$e}>
              <span class="pa-member__seq">${ct+1}</span>
              <span class="pa-member__title">${fe($e)}</span>
              ${B.has($e)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${$e}
                ?disabled=${ct===0}
                aria-label=${`${$e} \uC704\uB85C`}
                @click=${()=>He(S,b,$e,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${$e}
                ?disabled=${ct===x.length-1}
                aria-label=${`${$e} \uC544\uB798\uB85C`}
                @click=${()=>He(S,b,$e,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${$e}
                aria-label=${`${$e} \uC81C\uC678`}
                @click=${()=>We(S,b,$e)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${b.evidence.map($e=>c`<li class="pa-evidence">
              <code>${$e.path}</code>
              <span class="pa-evidence__locator">${$e.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Pe(S)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${$e=>{u.set(S,$e.target.value),ze()}}
          >
            ${Oe.map(($e,ct)=>c`<option
                  value=${$e.id}
                  ?selected=${et===$e.id}
                >
                  직렬 ${ct+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${st}
          @click=${()=>{Ie(S,b)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Tt(S){let b=Array.isArray(S.issues)?S.issues:[],x=b.filter(re=>re.verdict==="parallel_ok").length,B=b.filter(re=>re.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${x}</span>
      <span>uncertain ${B}</span>
    </div>`}function wt(){let S=Re&&!!q().job;if(S&&v===null){v=setInterval(()=>ze(),1e3);return}!S&&v!==null&&(clearInterval(v),v=null)}function ze(){let S=q();g&&S.settings.runner===g&&(g=null);let b=S.last_good?.result;wt(),Ze(c`
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
          ${Te(S)}
          <div class="pa__body">
            ${Ye()} ${De(S)} ${rt()}
            ${b?c`${b.groups.map((x,B)=>vt(B,x))}
                ${b.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Tt(b)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${yt(I(S))}
          </div>
        </div>
        ${It()}
      `,i)}let Re=!1,P=()=>{Re=!1,Z=null,U+=1,wt()},Q=S=>{S.target===S.currentTarget&&de()};i.addEventListener("close",P),i.addEventListener("cancel",P),i.addEventListener("click",Q);let ue=null;n&&n.subscribe&&(ue=n.subscribe(()=>{Re&&ze()}));let C=null;r&&r.subscribe&&(C=r.subscribe(()=>{Re&&ze()}));function V(){Re||(Re=!0,ze(),K(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function de(){Re&&(Re=!1,Z=null,U+=1,wt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:V,close:de,destroy(){Re=!1,v!==null&&(clearInterval(v),v=null),i.removeEventListener("close",P),i.removeEventListener("cancel",P),i.removeEventListener("click",Q),ue&&(ue(),ue=null),C&&(C(),C=null),i.remove()}}}var Jp=new Set(["sh","bash","zsh","dash","ksh"]),ef=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function tf(e){let t=e.split("/");return t[t.length-1]||""}function my(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=tf(n[0]);if(r!=="env")return Jp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Jp.has(tf(s))}function gy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function by(e){let t=[],n=0;ef.lastIndex=0;for(let r of e.matchAll(ef)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:gy(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function hy(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function nf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",l=0,u=null,p=!1;function g(j,K){return K?by(j).map(I=>I.kind==="plain"?I.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${I.kind}"
            >${I.text}</span
          >`):j}function v(){if(!s)return c``;let j=o==="ready"&&my(a),K=o==="ready"?a.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>Y()}
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
              @click=${()=>Y()}
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
                  ${K.map((I,L)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${L+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${g(I,j)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function h(){Ze(v(),r)}async function A(){if(o!=="ready")return;let j=await fn(a);le(j?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",j?"success":"error")}function N(j){j.key==="Escape"&&s&&(j.preventDefault(),Y())}function U(){p||(document.addEventListener("keydown",N),p=!0)}function Z(){p&&(document.removeEventListener("keydown",N),p=!1)}async function oe(j,K=null){let I=++l;U(),s={...j},u=K||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",h(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ne=t?t():"";if(!ne){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",h();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",h();return}let Ee="/api/repo-ops-script?workspace="+encodeURIComponent(ne)+"&lane="+encodeURIComponent(j.lane)+"&base_sha="+encodeURIComponent(j.base_sha);try{let we=await n(Ee),H=await we.json().catch(()=>({}));if(I!==l)return;if((t?t():"")!==ne){Y();return}if(!we.ok||!H||H.ok!==!0){o="error",i=hy(H&&typeof H.error=="string"?H.error:""),h();return}s={lane:H.lane,base_sha:H.base_sha,path:H.path,base_ref:H.base_ref},a=String(H.content),o="ready",h()}catch{if(I!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",h()}}function Y(){l+=1,Z(),s=null,a="",h();let j=u;u=null,j?.isConnected&&j.focus()}function q(){Y(),r.remove()}return{open:oe,close:Y,destroy:q}}function rf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let I=o();return typeof I.revision=="number"?I.revision:0}function i(I){t&&I&&I.queue&&typeof I.queue=="object"&&t.set(I.queue)}function l(){let I=o().workspace_info;return I&&typeof I=="object"?I:{}}function u(I,L){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${I}"
      >${L}</span
    >`}function p(I){if(typeof I!="number"||!Number.isFinite(I))return"";let L=I/6e4;return Number.isInteger(L)?`timeout ${L}\uBD84`:`timeout ${Math.round(I/1e3)}\uCD08`}function g(I){let L=p(I);return L?u("config",L):""}function v(I,L,ne){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${ne.script}
      @click=${Ee=>{s&&s({lane:I,base_sha:L.base_sha,path:ne.script,base_ref:L.base_ref},Ee.currentTarget)}}
    ></button>`}function h(){let I=o().repo_ops_opt_out;return{verify:I?.verify===!0,deploy:I?.deploy===!0}}function A(I,L){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!L}
        @change=${ne=>{oe(I,!ne.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function N(I){let L=typeof I.base_sha=="string"?I.base_sha:"",ne=`${I.source_path||"repo-ops/config.toml"} @ ${I.base_ref||"?"}${L?`@${L.slice(0,7)}`:""}`,Ee=h(),we=!!I.verify&&Ee.verify,H=!!I.deploy&&Ee.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${ne}</span>
      </p>
      <div
        class="worker-repo-ops__lane${we?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${I.verify?c`${v("verify",I,I.verify)}
              ${g(I.verify.timeout_ms)}
              ${we?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${we?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":I.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${I.verify?A("verify",Ee.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${H?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${I.deploy?c`${v("deploy",I,I.deploy)}
              ${g(I.deploy.timeout_ms)}
              ${H?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${H?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":I.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${I.deploy?A("deploy",Ee.deploy):""}
      </div>
    </section>`}function U(I){let L=I.repo_ops&&typeof I.repo_ops=="object"?I.repo_ops:null;return L&&(L.status==="resolved"||L.status==="absent")?N(L):L&&(L.status==="pending"||L.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${L.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${L.error_code?c` — <code>${L.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function Z(I){if(!n)return;let L=await n("worker-auto-repair-toggle",{on:I,expected_revision:a()});if(i(L),L&&L.conflict){let ne=await n("worker-auto-repair-toggle",{on:I,expected_revision:a()});i(ne)}r()}async function oe(I,L){if(!n)return;let ne=await n("worker-repo-ops-opt-out-toggle",{kind:I,opted_out:L,expected_revision:a()});if(i(ne),ne&&ne.conflict){let Ee=await n("worker-repo-ops-opt-out-toggle",{kind:I,opted_out:L,expected_revision:a()});i(Ee)}r()}let Y={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function q(I,L,ne){return c`<div class="worker-repo-ops__policy-group" data-policy=${ne}>
      <div class="worker-repo-ops__policy-label">${I}</div>
      <ul class="worker-repo-ops__policy-list">
        ${L.map(Ee=>c`<li data-token=${Ee}>
              ${Y[Ee]||Ee}
            </li>`)}
      </ul>
    </div>`}function j(I){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${I.map(L=>{let ne=[Y[L.trigger]||L.trigger];return Number.isInteger(L.attempts_per_operation_attempt)?ne.push(`operation\uB2F9 ${L.attempts_per_operation_attempt}\uD68C`):Number.isInteger(L.attempts)?ne.push(`${Y[L.budget]||L.budget} ${L.attempts}\uD68C`):Number.isInteger(L.sessions_per_user_action)&&ne.push(`${L.sessions_per_user_action}\uD68C`,Y[L.user_actions]||L.user_actions),L.applies_when&&ne.push(Y[L.applies_when]||L.applies_when),c`<li data-token=${L.id}>
            <strong>${Y[L.id]||L.id}</strong>
            <span>${ne.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function K(){let I=o(),L=I.auto_repair!==!1,ne=I.repo_operation_policy&&typeof I.repo_operation_policy=="object"?I.repo_operation_policy:null,Ee=Array.isArray(I.repo_operations)?I.repo_operations:[],we=Ee.find(xe=>xe.state==="repairing"),H=Ee.filter(xe=>xe.state==="failed"||xe.state==="repairing"),J=H.length?Math.min(...H.map(xe=>typeof xe.repair?.remaining=="number"?xe.repair.remaining:0)):ne?.auto_repair?.resolution_ladder?.find(xe=>xe.id==="auto_repair_session")?.attempts??1,fe=Array.isArray(ne?.auto_repair?.resolution_ladder)?ne.auto_repair.resolution_ladder:[];return c`<section
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
          >남은 자동 해결 ${J}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${we?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${we.repair?.owner_bead||we.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${ne?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(ne.worker_automatic||[]).length} · 해결 사다리
                ${fe.length} · 금지
                ${(ne.never_automatic||[]).length}</span
              >
            </summary>
            ${q("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",ne.worker_automatic||[],"worker-automatic")}
            ${ne.supported===!1||ne.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${ne.schema_version})`}
                </div>`:j(fe)}
            ${q("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",ne.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${U(l())} ${K()}
      </details>`}}}var lf=20,yy=5,vy=new Set(["failed","repairing","running","queued","retry_pending"]),sf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},of={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function wy(e,t,n=lf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function ky(e){if(e.type==="cleanup")return!0;let t=e.operation;return vy.has(t.state)&&!t.dismissed&&!t.superseded_by}function $y(e,t,n={}){let r=wy(e,t,1/0),s=n.expanded===!0?lf:yy,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||ky(i));return{visible:a,hidden:r.length-a.length}}function af(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function xy(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function cf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function uf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Ay(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(of,r)?of[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Sy(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Yt(e.at):""}
      >${ra(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${af(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(sf,t.kind)?sf[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ea(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Ts(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${af(e)}"
          >${xy(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?uf(Md(t.failure_kind,r)):""}
      ${Ay(t)}
      ${cf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ea(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Ey(e){let t=e.cleanup,n=vr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Yt(e.at):""}
      >${ra(e.at)||"\u2014"}</span
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
        ${op(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${uf(da(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${cf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Ty(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Ey(r):Sy(r))}
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
  </section>`}function df(e,t={}){let n=null;function r(){if(n===null){Ze(c``,e);return}let a=$y(n.operations,n.cleanup_failures,{expanded:n.expanded});Ze(Ty({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var Cy=Lt("views:worker"),Ry="tab:worker:ready",Oy="tab:worker:blocked",Ly="tab:worker:in-progress",Iy="tab:worker:resolved",Py="tab:worker:closed",$a=1,pf=5;function ff(e){return jo(e).path.length>0}var Dy=new Set(["quick_fix","spec_backed","full_plan"]);function _f(e){return typeof e=="string"&&Dy.has(e)}var hf="beads-ui.worker.candidate-filter",_l={show_blocked:!1,spec:"all"};function My(){try{let e=window.localStorage.getItem(hf);if(!e)return{..._l};let t=JSON.parse(e);if(!t||typeof t!="object")return{..._l};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{..._l}}}function Ny(e){try{window.localStorage.setItem(hf,JSON.stringify(e))}catch{}}function qy(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=n(i),u=r(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Fy=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],yf="bdui.worker.candidate_sort",vf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],gl="spec";function wf(e){return vf.some(t=>t.value===e)?e:gl}function jy(){try{return wf(window.localStorage.getItem(yf))}catch{return gl}}function By(e){try{window.localStorage.setItem(yf,e)}catch{}}var kf="bdui.worker.done-range";function Uy(){try{let e=window.localStorage.getItem(kf);return e===null?"today":On(e)}catch{return"today"}}function Wy(e){try{window.localStorage.setItem(kf,e)}catch{}}var zy="(max-width: 640px)",$f="beads-ui.worker.lane-collapsed",qs={queue:!0,done:!0};function Hy(){try{let e=window.localStorage.getItem($f);if(!e)return{...qs};let t=JSON.parse(e);return!t||typeof t!="object"?{...qs}:{queue:typeof t.queue=="boolean"?t.queue:qs.queue,done:typeof t.done=="boolean"?t.done:qs.done}}catch{return{...qs}}}function Gy(e){try{window.localStorage.setItem($f,JSON.stringify(e))}catch{}}function mf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Ky(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(fr):t==="updated"?r.sort(lo):(r.sort(co(n)),t==="board"?r:[...r.filter(ff),...r.filter(s=>!ff(s))])}function Vy(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Yy(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Zy="\u{1F512} blocked";function gf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Xy(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Qy(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Jy(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function ev(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function tv(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function ml(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var nv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),rv=new Set(["waiting_metadata","reviewing","retrying"]);function sv(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?Yt(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function ov(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function av(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=ov(e.terminal_reason);l&&i.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!nv.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function bf(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function iv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(bf(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${bf(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=Xy(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${gf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${gf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function lv(e,t,n,r,s=null,o=null,a=null,i=!1,l=null,u=!0,p=null,g=null,v=null,h={},A=!1,N=!1,U={},Z=null){let oe=!!l&&l.position>0,Y=!!l?.continuation_action&&l.continuation_action.continuation===null,q=!!l&&l.active===!0,j=l&&l.failure||null,K=Jy(l?l.waiting:null,v),I=n[e]||null,L=I&&I.gate?I.gate:null,ne=I&&I.pr?I.pr:null,Ee=ev(l?l.resolution:null),we=tv(l?l.head_review:null),H=l&&l.head_review||null,J=sv(v,H),fe=av(v,J),xe=l&&l.authority||null,ge=!!H&&["pending","reviewing","revising"].includes(H.state),ce=!!v&&typeof v=="object"&&rv.has(v.phase),Ae=oe&&!q&&(H?.state==="failed"||!xe||ce||xe.source==="automatic"&&!N),ve=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Ee?Ee.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":K,G=!!L&&L.base_badge==="\uCDA9\uB3CC",te=!!L&&L.enabled===!0,ie=Ds({bead_id:e,merge_sha:U.merge_sha,cleanup_cursor:U.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:U.repo_operations}),ke=va(ie),Ue=o&&!ie&&(o.queueing??null)?o.queueing:null,_e=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!L&&L.tier==="merged",je=i&&!!r&&!!L&&L.tier==="merged",M=Ae&&(te||G||L?.reason==="base_behind"||L?.reason==="review_receipt_missing"||L?.reason==="review_receipt_stale"||L?.reason==="review_receipt_undetermined"||_e||je),me=i&&G&&u===!1,Me=Tn(h,e,{external:i,merge_active:q||ie?.step==="merge",merge_queued:oe,conflict_active:!!a,cleanup_active:ke,merged:!!r||L?.tier==="merged"}),Ie=!!Me.operation,We=!_e&&!!r&&r.step==="repo_operations",Pe=iv({continuation_required:Y,queueing:Ue,merge_step:ie,conflict_badge:ve,conflict_live:Ee?.live===!0||a==="running",head_review:H&&we?{...we,state:H.state,failure_reason:H.failure_reason}:null,auto_resolution:J,recovery:fe,cleanup_failed:r,cleanup_label:r?vr(r.step):null,base_exception:g,conflicting:G,gate:L,receipt_check:I&&I.receipt_check?I.receipt_check:null,queue_failure:j,auto_skip:p,queued:oe,queue_active:q,queue_position:l?l.position:0,activity:ve?null:o&&o.activity||null}),He=Pe?.live===!0&&Pe.title?c`<span title=${Pe.title}>${Pe.label}</span>`:Pe?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ie?.active!==!0?ya(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,...Z?{dependency_chips:Z}:{},external:i,pr_number:ne&&typeof ne.number=="number"?ne.number:null,pr_url:ne&&typeof ne.url=="string"?ne.url:"",completion_badge:Pe?.live!==!0&&Pe?.title?Pe.label:null,completion_title:Pe?.title||"",completion_repair_pr_url:fe?fe.repair_pr_url:"",completion_repair_pr_number:fe?fe.repair_pr_number:null,badges:He?[He]:[],live_badge:Pe?.live===!0?He:null,usage:s,alert:Pe?.alert===!0,merge_action:L?.tier==="merged"&&!_e&&!je||We?!1:!oe||Y||Ae,timeline_action:We,cancel_action:oe&&!Y,cancel_enabled:(!q||ge)&&!(fe&&fe.lock_actions),cancel_title:fe&&fe.lock_actions?`${fe.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:q&&!ge?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ge?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Me,discard_action:Me.action,merge_step:ie,discard_enabled:Me.enabled,discard_title:Me.title,merge_enabled:!ie&&!Ue&&!a&&!Ie&&!g&&!(fe&&fe.lock_actions)&&!me&&!We&&(te||G||L?.reason==="base_behind"||L?.reason==="review_receipt_missing"||L?.reason==="review_receipt_stale"||L?.reason==="review_receipt_undetermined"||_e||je||M||ce&&!q),merge_label:Y?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":_e||je?"\uC815\uB9AC \uC7AC\uAC1C":G&&!ie&&!_e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":L?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":L?.reason==="review_receipt_missing"||L?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Ae?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Ie?Me.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Me.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Me.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Y?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ue?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ie?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ie.label}`:je?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":me?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":_e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":G?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":L?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":L?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":L?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":L?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":L?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":te?`\uBA38\uC9C0 (${L.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:L&&L.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${L&&L.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function bl(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,switchWorkspace:p,openDoc:g,doneRange:v,onDoneRangeChange:h}=t,A=r?po(r,i):null,N=go({transport:n,uiOrderStore:i}),U=null,Z=[],oe=My(),Y=null,q=null,j={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},K=jy(),I=v?On(v):Uy(),L=new Map;function ne(){let _=Rr.find(k=>k.value===I);return _?_.label:"\uC624\uB298"}let Ee=Hy(),we=!1,H=new Set,J=new Set,fe=new Set,xe=new Set,ge=new Set,ce={},Ae=null,ve=0,G=null,te=[];function ie(_){return Ae===_?ce:{}}async function ke(){if(!n)return;let _=u?.()||"";if(Ae===_||G&&G.key===_&&G.generation===ve)return;let k=++ve;G={key:_,generation:k};let d=null;try{d=await Promise.resolve(n("get-session-defaults",{}))}catch(f){if(k!==ve)return;G=null,Cy("get-session-defaults failed: %o",f),Ve();return}k===ve&&(ce=d&&typeof d.values=="object"&&d.values!==null?{...d.values}:{},Ae=_,G=null,Ve())}function Ue(){Ae=null,ve+=1,ke()}let _e=document.createElement("div");_e.className="worker-console";let je=document.createElement("div");je.className="worker-top";let M=document.createElement("div");M.className="worker-drawer-overlay",M.hidden=!0;let me=document.createElement("div");me.className="worker-drawer-overlay__backdrop";let Me=document.createElement("div");Me.className="worker-drawer-host";let Ie=document.createElement("div");Ie.className="worker-drawer-host",Ie.hidden=!0,M.append(me,Me,Ie);let We=document.createElement("div");We.className="worker-lanes-host",_e.append(je,M,We),e.appendChild(_e);let Pe=null,He=null,Ye=Wr(Me,{transport:n,sessionLogStore:a,onClose:()=>{Pe=null,He=null,M.hidden=!0,Ve()}}),it=df(Ie,{onClose:()=>{Ie.hidden=!0,M.hidden=!0,Ve()}}),ft=nf({getWorkspacePath:u||(()=>"")}),xt=u&&u()||"",_t=rf({queueStore:s,transport:n,onChanged:()=>Ve(),onOpenScript:(_,k)=>{ft.open(_,k)}}),ee=o?Qp(_e,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(_,k)=>Hn(_,k)}):null;function X(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:$a,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Te(){let _=X(),k=typeof _.serial_lane_count=="number"&&Number.isInteger(_.serial_lane_count)&&_.serial_lane_count>0?Math.min(_.serial_lane_count,5):0,d=Array.isArray(_.serial_lanes)?_.serial_lanes:[],f=[];for(let $ of d){if(f.length>=k)break;!$||typeof $.id!="string"||!/^s[1-5]$/.test($.id)||!Array.isArray($.entries)||f.push({id:$.id,label:`\uC9C1\uB82C ${$.id.slice(1)}`,count:$.entries.length})}return f.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(_.queue)?_.queue:[]).length},...f]}function Xe(_){if(!Y||!_.some(d=>d.id===Y))return null;let k=Te();return k?{bead_id:Y,lanes:k}:null}function De(){let _=X();return typeof _.revision=="number"?_.revision:0}function be(_){_&&_.queue&&s&&s.set(_.queue)}function Fe(){let _=X().queue;return Array.isArray(_)?_.length:0}async function at(_,k,d){if(!n)return;let f=()=>({bead_id:_,...k==="parallel"?{}:{lane:k},...d===void 0?{}:{index:d},expected_revision:De()}),w=await n("worker-queue-place",f());be(w),w&&w.conflict&&await n("worker-queue-place",f()).then(be)}async function rt(_,k,d){if(!n)return;let f=()=>({bead_id:_,...k==="parallel"?{}:{lane:k},to_index:d,expected_revision:De()}),w=await n("worker-queue-reorder",f());be(w),w&&w.conflict&&await n("worker-queue-reorder",f()).then(be)}async function Je(_){if(!n)return;let k=await n("worker-queue-remove",{bead_id:_,expected_revision:De()});be(k),k&&k.conflict&&await n("worker-queue-remove",{bead_id:_,expected_revision:De()}).then(be)}async function yt(_){if(!n||!_)return;let k=await n("worker-attempt-pause",{attempt_id:_});k&&k.paused===!1&&k.reason&&le(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function It(_){if(!n||!_)return;let k=await qr();if(k===null)return;let d=async(w={})=>await n("worker-attempt-resume",{attempt_id:_,expected_revision:De(),...k!==""?{instructions:k}:{},...w}),f=await d();be(f),f&&f.conflict&&(f=await d(),be(f)),f=await qn(f,(w,$)=>d({continuation:w,decision_token:$}),{onResult:be,refresh:()=>d()}),f&&f.resumed===!1&&!f.conflict&&f.reason&&le(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${f.reason}`,"error",2400)}async function vt(_){if(!n||!_)return;let k=await n("worker-attempt-dismiss",{attempt_id:_,expected_revision:De()});be(k),k&&k.conflict&&(k=await n("worker-attempt-dismiss",{attempt_id:_,expected_revision:De()}),be(k)),k&&k.dismissed===!1&&!k.conflict&&k.reason&&le(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Tt(_,k,d=!0){if(!n)return null;let f=n,w=await f(_,{...k,expected_revision:De()});return be(w),w&&w.conflict&&d&&(w=await f(_,{...k,expected_revision:De()}),be(w)),w}async function wt(_){if(!n||!_)return;let k=X().merge_queue?.find(f=>f.bead_id===_)?.continuation_action;if(k?.mismatch&&k.continuation===null){await Re(_,k.mismatch);return}H.add(_),Ve();let d;try{d=await Tt("worker-merge-queue-add",{bead_id:_})}catch{le("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{H.delete(_),Ve()}if(!(!d||d.applied)){if(d.conflict){le("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}le(Qy(d.reason),"error",2400)}}async function ze(_){if(!(!n||!_||J.has(_))){J.add(_),Ve();try{let k=await n("worker-cleanup-retry",{bead_id:_,expected_revision:De()});be(k),k&&!k.retried&&!k.conflict&&k.reason&&le(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${k.reason}`,"error",2400)}finally{J.delete(_),Ve()}}}async function Re(_,k){let d=await qn({continuation_mismatch:k},(w,$)=>Tt("worker-merge-queue-add",{bead_id:_,continuation:w,decision_token:$},!1)),f=d?.queue?.merge_queue?.find(w=>w.bead_id===_)?.continuation_action;if(d?.applied!==!0&&f?.continuation===null&&f.mismatch){await Re(_,f.mismatch);return}d&&d.applied===!1&&!d.conflict&&le("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function P(_){if(!n)return;let k=await Tt("worker-merge-auto-toggle",{on:_});!k||k.conflict||le(_?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",_?"success":"info",2400)}async function Q(_){if(!n||!_)return;let k=await Tt("worker-merge-queue-remove",{bead_id:_});k&&!k.conflict&&!k.applied&&k.reason==="merge_active"&&le("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ue(){await Tt("worker-merge-queue-remove",{all:!0})}async function C(_,k=null,d="unmerged",f=null){if(!n||!_)return;let w=Cs(_,d);if(!(!!f||typeof globalThis.confirm!="function"||globalThis.confirm(w)))return;let z=await n("worker-discard",{bead_id:_,...k?{attempt_id:k}:{},...f?{operation_id:f}:{},expected_revision:De()});if(be(z),z&&z.conflict&&(z=await n("worker-discard",{bead_id:_,...k?{attempt_id:k}:{},...f?{operation_id:f}:{},expected_revision:De()}),be(z)),z&&z.discarded===!0){le(sa(z),"success",5e3);return}if(z&&z.reason){le(`\uD3D0\uAE30 \uC2E4\uD328: ${z.reason}`,"error",2800);return}if(z&&z.accepted&&z.pending==="merged_revert"){le("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(z&&z.accepted&&!z.discarded){le(`\uD3D0\uAE30 \uC9C4\uD589: ${z.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}z&&!z.conflict&&le("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function V(_,k,d){if(!(!n||!k||!d||xe.has(k))){xe.add(k),Ve();try{let f=await n(_,{bead_id:k,action_id:d,expected_revision:De()});be(f),f?.conflict?le("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!f?.ok&&f?.reason&&le(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(f.reason)}`,"error",2800)}finally{xe.delete(k),Ve()}}}async function de(_,k){if(!n||!k||fe.has(k))return;fe.add(k),Ve();let d;try{let f=async(w={})=>await n(_,{bead_id:k,expected_revision:De(),...w});d=await f(),be(d),d&&d.conflict&&(d=await n(_,{bead_id:k,expected_revision:De()}),be(d)),_==="worker-revise-fix"&&(d=await qn(d,(w,$)=>f({continuation:w,decision_token:$}),{onResult:be,refresh:()=>f()}))}finally{fe.delete(k),Ve()}if(!(!d||d.conflict)){if(d.ok){le(_==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}le(`\uCC98\uBD84 \uAC70\uBD80: ${d.reason||""}`,"error",3e3)}}async function S(_){if(!n)return;let k=await n("worker-automation-toggle",{on:_,expected_revision:De()});be(k),k&&k.conflict&&await n("worker-automation-toggle",{on:_,expected_revision:De()}).then(be)}async function b(_){if(!n||!_)return;let k=await n("worker-repo-operation-repair",{operation_id:_});if(be(k),k&&k.ok===!1){le(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${k.reason||""}`,"error",3e3);return}k&&k.ok===!0&&le("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function x(_){if(!n||!_)return;let k=await n("worker-repo-operation-dismiss",{operation_id:_});be(k),k&&k.ok===!1&&le(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${k.reason||""}`,"error",3e3)}async function B(_){if(!n||!Number.isFinite(_))return;let k=Math.max($a,Math.floor(_)),d=await n("worker-queue-set-slots",{slots:k,expected_revision:De()});be(d),d&&d.conflict&&await n("worker-queue-set-slots",{slots:k,expected_revision:De()}).then(be)}async function re(_){if(!n||!Number.isInteger(_)||_<1||_>pf)return;let k=X(),d=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).slice(_).reduce(($,z)=>$+(Array.isArray(z?.entries)?z.entries.length:0),0),f=()=>({count:_,expected_revision:De()}),w=await n("worker-queue-set-serial-lane-count",f());be(w),w&&w.conflict&&(w=await n("worker-queue-set-serial-lane-count",f()),be(w)),w&&w.applied&&d>0&&le(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${d}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let se="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function he(_,k){let d=zi(_,k.id,j);return{id:k.id,title:k.title,location_label:k.location_label,prefixes:k.prefixes,action:d.kind==="note"?{kind:"note",text:d.text}:d.kind==="disabled"?{kind:"disabled",label:se,title:d.title}:{kind:"place",label:se,title:d.title}}}function Oe(_,k){if(!q||q.bead_id!==_)return null;let d=q.counterpart_id,f=k.filter(w=>w.id===d);return f.length===0?null:{rows:f.map(w=>he(_,w))}}async function et(_,k){let d=zi(_,k,j);if(q=null,d.kind!=="ops"){Ve();return}let f=De();for(let w of d.ops){let $=await st(w,f);if($===null)break;f=$}Ve()}async function st(_,k){if(!n)return null;try{let d=await n("worker-queue-place",{bead_id:_.bead_id,lane:_.lane,index:_.index,expected_revision:k});if(be(d),d&&d.conflict)return le("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!d||d.applied!==!0)return le(d&&typeof d.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${d.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let f=d.queue?d.queue.revision:void 0;return typeof f!="number"?(le("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):f}catch(d){return le(d instanceof Error&&d.message?d.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function $e(){let _=X(),k=A?A.selectBoardColumn(Ry,"ready"):[],d=A?A.selectBoardColumn(Oy,"blocked"):[],f=A?A.selectBoardColumn(Py,"closed"):[],w=A?A.selectBoardColumn(Ly,"in_progress"):[],$=A?A.selectBoardColumn(Iy,"resolved"):[],z=_o([...k,...d,...w,...$,...f]),W=new Map;for(let m of[...k,...d,...w])m&&m.id&&!W.has(m.id)&&W.set(m.id,m);let y={...ie(u?.()||"")};for(let m of["orchestration_model","orchestration_effort","orchestration_speed"]){let F=_[m];typeof F=="string"&&(y[m]=F)}function O(m,F){let ae=W.get(m);if(!ae)return null;let qe=ae.metadata&&typeof ae.metadata=="object"?ae.metadata:{},Ke=ae.workflow?.route,Nt=qe.route,kt=_f(Ke)?Ke:_f(Nt)?Nt:null;return an({pin:qe,global:y,execution_defaults:_.execution_defaults??null,runner_catalog:_.runner_catalog??null,route:kt,controller_runtime:F})}function E(m){let F=m.runner||null,ae=O(m.bead_id,F),qe=Os(m),Ke=ae?nr(ae,F):null;return qe||Ke?{orchestration:qe,worker:Ke}:null}let ye=new Map;function tt(m){if(ye.has(m))return ye.get(m)??null;let F=O(m,null),ae=null;if(F){let qe=En(_.runner_catalog??null,F.orchestration_model.value??""),Ke=qe===null?F:O(m,qe),Nt=hr(Ke,_.runner_catalog??null),kt=nr(Ke,qe);ae=Nt||kt?{orchestration:Nt,worker:kt}:null}return ye.set(m,ae),ae}function nt(m){let F=mo(z,m);return F.total===0?null:F}let lt=_.bead_titles||{},Ge=new Map;for(let[m,F]of Object.entries(lt))typeof F=="string"&&F.length>0&&Ge.set(m,F);for(let m of[...k,...d])Ge.set(m.id,m.title||m.id);let Pt=new Map;for(let m of[...k,...d,...w,...$,...f])m&&m.id&&typeof m.from_id=="string"&&Pt.set(m.id,m.from_id);let Vt=new Map;for(let m of[...k,...d,...w,...$,...f])m&&m.id&&typeof m.priority=="number"&&Vt.set(m.id,m.priority);let Fs=_.bead_times&&typeof _.bead_times=="object"&&!Array.isArray(_.bead_times)?_.bead_times:{},js=_.bead_labels&&typeof _.bead_labels=="object"&&!Array.isArray(_.bead_labels)?_.bead_labels:{},Rn=_.bead_workflow&&typeof _.bead_workflow=="object"&&!Array.isArray(_.bead_workflow)?_.bead_workflow:{},Gn=new Map;for(let[m,F]of Object.entries(js))Array.isArray(F)&&Gn.set(m,dl(F));for(let m of[...k,...d]){let F=m.labels;Array.isArray(F)&&!Gn.has(m.id)&&Gn.set(m.id,dl(F))}let wr=new Map,kr=o?.get()?.last_good?.result?.groups;for(let m of Array.isArray(kr)?kr:[]){if(m?.eligible!==!0||!Array.isArray(m.members))continue;let F=m.members.map(qe=>{let Ke=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).find(Nt=>Nt.entries.some(kt=>kt.bead_id===qe));return Ke?Ke.id:null});if(!(F.every(qe=>qe!==null)&&new Set(F).size===1))for(let qe of m.members)wr.set(qe,m.members.filter(Ke=>Ke!==qe))}let Bs=_.bead_blocked_by&&typeof _.bead_blocked_by=="object"&&!Array.isArray(_.bead_blocked_by)?_.bead_blocked_by:{},Us=_.blocker_workspaces&&typeof _.blocker_workspaces=="object"&&!Array.isArray(_.blocker_workspaces)?_.blocker_workspaces:{},$r=new Map;for(let[m,F]of Object.entries(Fs))F&&typeof F=="object"&&$r.set(m,F);for(let m of[...k,...d])$r.set(m.id,{created_at:m.created_at,updated_at:m.updated_at});let or=m=>$r.get(m)||{},Dn=_.pr_wait||[],Yr=_.pr_observations||{},Ne=_.pr_activity||{},pt=_.cleanup_failed||{},pn=Object.entries(pt).map(([m,F])=>({bead_id:m,step:F&&F.step?F.step:"",reason:F&&F.reason?F.reason:"",at:F&&typeof F.at=="number"?F.at:null,detail:F&&typeof F.detail=="string"?F.detail:null,output_tail:F&&typeof F.output_tail=="string"&&F.output_tail?F.output_tail:void 0,log_path:F&&typeof F.log_path=="string"&&F.log_path?F.log_path:void 0,retry_count:F&&typeof F.retry_count=="number"&&Number.isInteger(F.retry_count)&&F.retry_count>0?F.retry_count:0,failure_code:F&&typeof F.failure_code=="string"?F.failure_code:void 0,subject_id:F&&typeof F.subject_id=="string"?F.subject_id:void 0,repair_eligible:!!(F&&F.repair_eligible),repair:F&&F.repair?F.repair:void 0})),xa=_.queue||[],Mf=new Set([...xa.map(m=>m.bead_id),...(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).flatMap(m=>(Array.isArray(m?.entries)?m.entries:[]).map(F=>F.bead_id)),...Dn.map(m=>m.bead_id),..._.done.map(m=>m.bead_id)]),Nf=new Set(d.map(m=>m.id)),qf=i?i.get()?.order||{}:{},wl=new Set,kl=[];for(let m of[...k,...d])Mf.has(m.id)||wl.has(m.id)||Vy(m)||(wl.add(m.id),kl.push(m));Z=Ky(kl,K,qf);let Ff=_.admission||{},$l=m=>{let F=Ff[m];if(!F)return"";if(F.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof F.reason=="string"?F.reason:"",qe=ae.indexOf(":");return qe>0&&qe<ae.length-1?`\u26D4 ${ae.slice(0,qe)} (${ae.slice(qe+1)})`:`\u26D4 ${ae}`},xl=new Map,jf=Z.map(m=>{let F=jo(m),ae=F.path.length>0,qe=m.workflow?.route==="quick_fix"||m.metadata&&m.metadata.route==="quick_fix",Ke=!Object.hasOwn(m,"description")||typeof m.description=="string"&&m.description.trim().length>0,Nt=Object.hasOwn(m,"labels")&&Zp(m.labels),kt=Nt||!Object.hasOwn(m,"labels")?"":Xp(m.labels,m.metadata),Er=kt.length>0,$t=!Nt&&(qe?Ke:ae&&!F.conflict),Xs=Nf.has(m.id),Vn=[];if(Xs){let Qs=Yy(m);Qs.length>0?xl.set(m.id,Qs):Vn.push(Zy)}qe&&!Ke?Vn.push("missing_description"):!qe&&F.conflict?Vn.push("spec_id_conflict"):!qe&&!ae&&Vn.push("spec \uC5C6\uC74C");let Tr=$l(m.id);return Tr&&Vn.push(Tr),{id:m.id,title:m.title||m.id,reason:Vn.join(" \xB7 "),draggable:$t,lane:"candidate",created_at:m.created_at,updated_at:m.updated_at,workflow:m.workflow,is_quick_fix:qe,status:m.status,worker_ineligible:Nt,session_preferred:Er,session_preferred_reason:kt,blocked:Xs,has_spec:ae,exec_chips:tt(m.id),from_id:m.from_id||void 0,priority:Vt.get(m.id)}}),Aa=qy(jf,oe),Sa=Aa.visible,Bf=_.revise_parked||{},Ws=_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},Ea=(m,F)=>m.map((ae,qe)=>{let Ke=F!=="done",Nt=F!=="done"&&F!=="queue",kt=Ke?Bf[ae.bead_id]:null,Er=Ke?Tn(Ws,ae.bead_id):null,$t=Er?.operation?Er:null,Xs=Ke&&Gn.get(ae.bead_id)===!0,Vn=_.admission&&typeof _.admission=="object"?_.admission[ae.bead_id]:null,Tr=Ke?Cd(Vn,!!$t||xe.has(ae.bead_id)):null,Qs=Ke&&!Tr?$l(ae.bead_id):null,e_=Ke?[Qs]:[],ec=[],Na=Ke?wr.get(ae.bead_id):void 0;return Na&&Na.length>0&&ec.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Na.join(", ")}\uC640`),{id:ae.bead_id,title:Ge.get(ae.bead_id)||ae.bead_id,reason:e_.filter(Boolean).join(" \xB7 "),draggable:Ke&&!$t&&!Tr,done:F==="done",lane:F,seq:Nt?qe+1:void 0,worker_serial:Xs,discard:$t,stale_work:Tr,badges:[...ec,...kt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...F==="done"?ta(_.attempts||{},ae.bead_id):[]],alert:!!kt,revise_action:!!kt,revise_enabled:!!kt&&!$t&&!fe.has(ae.bead_id),revise_title:kt?kt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${kt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:F==="done"?bn(_.attempts||{},ae.bead_id):null,work_ms:F==="done"?na(_.attempts||{},ae.bead_id):null,done_at:F==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,exec_chips:Ke?tt(ae.bead_id):null,workflow:Ke&&Rn[ae.bead_id]||null,from_id:Pt.get(ae.bead_id)||void 0,priority:Vt.get(ae.bead_id),...or(ae.bead_id)}}),xr=_.attempts?Object.values(_.attempts).filter(yr):[],Ta=new Set;for(let m of xr)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&Ta.add(m.resumed_from);let Al=new Map;for(let m of xr)Al.set(m.bead_id,m.attempt_id);let Zr=new Map;for(let m of xr)Zr.set(m.attempt_id,m);function Ca(m){let F=new Set,ae=m;for(;ae&&!F.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;F.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&Zr.get(ae.resumed_from)||null}return!1}let zs=typeof _.declared_base=="string"?_.declared_base:null;function Uf(m){let F=null;for(let ae of xr)!ae||ae.bead_id!==m||Ca(ae)||(F===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof F.started_at=="number"?F.started_at:0))&&(F=ae);return F&&typeof F.target_base=="string"?F.target_base:null}let Ra=[],Hs=[],Wf=Yp(_),Sl=m=>{let F=typeof m.session_id=="string"&&m.session_id.length>0,ae=Ta.has(m.attempt_id);return{eligible:F&&!ae,reason:F?ae?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},wn=null;for(let m of xr){let F=m.status==="paused"&&!Ta.has(m.attempt_id);if(m.status==="running"||F)Hs.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Ge.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,paused:F,conflict_resolution:Ca(m),base_exception:ml(zs,m.target_base),can_pause:typeof m.session_id=="string"&&m.session_id.length>0,discard:Tn(Ws,m.bead_id,{attempt_id:m.attempt_id}),workflow:Rn[m.bead_id]||null,priority:Vt.get(m.bead_id),usage:bn(_.attempts||{},m.bead_id),rollup:nt(m.bead_id),rollup_expanded:ge.has(m.bead_id),exec_chips:E(m),...or(m.bead_id)});else if((m.status==="failed"||m.status==="orphaned")&&Wf(m)){let ae=Sl(m);Ra.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Ge.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,failed:!0,status:m.status,status_label:m.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Tn(Ws,m.bead_id,{attempt_id:m.attempt_id}),resume_eligible:ae.eligible,resume_reason:ae.reason,conflict_resolution:Ca(m),base_exception:ml(zs,m.target_base),workflow:Rn[m.bead_id]||null,priority:Vt.get(m.bead_id),usage:bn(_.attempts||{},m.bead_id),rollup:nt(m.bead_id),rollup_expanded:ge.has(m.bead_id),exec_chips:E(m),...or(m.bead_id)}),wn=m}}let El=new Set([...Ra,...Hs].map(m=>m.bead_id)),Tl=new Map;for(let m of Array.isArray(_.session_active)?_.session_active:[]){let F=m&&m.bead_id;if(!(typeof F!="string"||F.length===0||El.has(F))){if(El.add(F),Array.isArray(m.blocked_by)){let ae=m.blocked_by.filter(qe=>typeof qe=="string"&&qe.length>0);ae.length>0&&Tl.set(F,ae)}Hs.push({bead_id:F,attempt_id:null,kind:"session",title:m.title||Ge.get(F)||F,status:"in_progress",started_at:Ln(m.started_at)??Ln(m.updated_at),updated_at:Ln(m.updated_at),workflow:m.workflow||null,priority:Vt.get(F),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1})}}let Ar=[...Ra,...Hs].map(m=>{let F=Zr.get(m.attempt_id),ae=F?.quickfix_landing;if(F?.quickfix_lane!==!0||!ae||typeof ae!="object")return m;let qe=typeof ae.reason=="string"&&ae.reason.length>0?ae.reason:null,Ke=Ds({bead_id:F.bead_id,merge_sha:ae.head_sha,cleanup_cursor:ae.cursor,cleanup_failed:qe?{step:ae.cursor,reason:qe}:null,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]});return Ke?{...m,landing:Ke}:m}),Cl=null;if(wn){let m=Sl(wn),F=wn.cause_detail;Cl={bead_id:wn.bead_id,repo:wn.repo||"",reason:wn.cause||wn.status,cause_detail:F&&typeof F.reason=="string"?{reason:F.reason,command:typeof F.command=="string"?F.command:null}:null,resume_attempt_id:wn.attempt_id,resume_eligible:m.eligible,resume_reason:m.reason,discard:Tn(Ws,wn.bead_id,{attempt_id:wn.attempt_id})}}let Rl=new Set(Ar.map(m=>m.bead_id)),Oa=Array.isArray(_.merge_queue)?_.merge_queue:[],Ol=new Map,Ll=new Map,Il=new Map,Pl=new Map,Dl=new Map;Oa.forEach((m,F)=>{m&&typeof m.bead_id=="string"&&(Ol.set(m.bead_id,F+1),Ll.set(m.bead_id,m.resolution),Il.set(m.bead_id,m.continuation_action||null),Pl.set(m.bead_id,m.head_review||null),Dl.set(m.bead_id,m.authority||null))});let Sr=_.merge_queue_state||{active:null,failures:{}},zf=Sr.failures||{},Ml=Sr.waiting&&typeof Sr.waiting.bead_id=="string"&&typeof Sr.waiting.reason=="string"?Sr.waiting:null,Hf=_.auto_merge_skips||{},Nl=m=>{let F=Hf[m];if(!F)return null;let ae=Yr[m],qe=ae&&ae.pr?ae.pr.head_sha:null;return qe&&qe===F.head_sha?F.reason||"":null},Gs=new Map;for(let m of Ar)m.failed!==!0&&m.conflict_resolution&&(m.paused?Gs.has(m.bead_id)||Gs.set(m.bead_id,"paused"):Gs.set(m.bead_id,"running"));let ql=Ar.filter(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0).length,Fl=(_.workspace_info||{}).slots,jl=typeof Fl=="number"?Fl:typeof _.slots=="number"?_.slots:$a,Gf=ql>jl,Ks=dr(I),Kf=(Array.isArray(_.done)?_.done.slice():[]).filter(m=>Ks===void 0||typeof m.added_at!="number"||m.added_at>=Ks).sort((m,F)=>(F.added_at||0)-(m.added_at||0)),Xr=Ea(Kf,"done"),Vf=new Set((Array.isArray(_.done)?_.done:[]).map(m=>m?.bead_id).filter(m=>typeof m=="string")),Bl=[],Yf=u?.()||"";for(let m of f){let F=Ln(m.closed_at);if(typeof m.id!="string"||Vf.has(m.id)||F===null||Ks!==void 0&&F<Ks||typeof m.comment_count!="number"||m.comment_count<=0)continue;let ae=`${Yf}\0${m.id}\0${String(m.updated_at)}\0${m.comment_count}`,qe=L.get(ae);qe===void 0&&n&&(L.set(ae,"pending"),Promise.resolve(n("get-comments",{id:m.id})).then(Ke=>{let Nt=Array.isArray(Ke)&&Ke.some(kt=>Bo(typeof kt?.text=="string"?kt.text:"")?.lane==="session");L.set(ae,Nt?"session":"not-session"),Ve()}).catch(()=>{L.set(ae,"failed"),Ve()})),qe==="session"&&Bl.push({id:m.id,title:m.title||m.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:F,created_at:m.created_at,updated_at:m.updated_at})}Xr.push(...Bl),Xr.sort((m,F)=>(F.done_at||0)-(m.done_at||0));let Vs={};for(let m of Pn)Vs[m]=0;let Ul=!1,Wl=0,La=0,zl=0;for(let m of Xr){let F=m.usage;if(F&&typeof F=="object"){let ae=!1;for(let qe of Pn)Number.isFinite(F[qe])&&(Vs[qe]+=F[qe],Ul=!0,ae=!0);ae&&(La+=1,Number.isFinite(F.total_cost_usd)&&(Wl+=F.total_cost_usd,zl+=1))}}La>0&&zl===La&&(Vs.total_cost_usd=Wl);let Hl=Xr.map(m=>m.usage).filter(m=>m&&typeof m=="object"&&m.providers),Zf=Hl.length>0?Zt(Eo(Hl)):Ul?Fn(Vs):null,Gl=_.lane_states&&typeof _.lane_states=="object"&&!Array.isArray(_.lane_states)?_.lane_states:{},Kl=Array.isArray(_.serial_lanes)?_.serial_lanes:[],Vl=m=>{if(Dn.some(qe=>qe.bead_id===m))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let F=xr.filter(qe=>qe&&qe.bead_id===m),ae=F.length>0?F[F.length-1].status:null;return ae==="failed"||ae==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ae==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Ys=Kl.filter(m=>m&&typeof m.id=="string"&&Array.isArray(m.entries)).map((m,F)=>{let ae=Gl[m.id]||{},qe=new Map((Array.isArray(ae.corrections)?ae.corrections:[]).filter($t=>$t&&typeof $t.bead_id=="string"&&typeof $t.after=="string").map($t=>[$t.bead_id,$t.after])),Ke=Array.isArray(ae.occupied_by)?ae.occupied_by.filter($t=>typeof $t=="string"):[],Nt=new Set(Ke),kt=Ea(m.entries.filter($t=>!Rl.has($t.bead_id)&&!Nt.has($t.bead_id)),m.id).map($t=>qe.has($t.id)?{...$t,badges:[`\u{1F517} ${qe.get($t.id)} \uB4A4 (blocks \uC790\uB3D9)`,...$t.badges]}:$t),Er=Ke.map($t=>({id:$t,title:Ge.get($t)||$t,draggable:!1,lane:m.id,ghost:!0,badges:[Vl($t)]}));return{id:m.id,index:F+1,rows:[...Er,...kt],occupied:Ke.length>0,badge:Ke.length>0?Vl(Ke[0]):"\uB300\uAE30",cycle:ae.cycle===!0}}),Yl=typeof _.serial_lane_count=="number"?_.serial_lane_count:Ys.length,Ia=Ea(xa.filter(m=>!Rl.has(m.bead_id)),"queue"),Zl=new Map,Xl=new Set;for(let[m,F]of Object.entries(Gl)){if(!/^s[1-5]$/.test(m))continue;let ae=F&&Array.isArray(F.occupied_by)?F.occupied_by:[];for(let qe of ae)typeof qe=="string"&&Zl.set(qe,m);ae.length>0&&Xl.add(m)}let Kn=[];for(let m of Ar)typeof m.bead_id=="string"&&Kn.push({id:m.bead_id,title:Ge.get(m.bead_id)||m.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Zl.get(m.bead_id)??null});for(let m of Dn){let F=m&&m.bead_id;typeof F!="string"||F.length===0||Kn.push({id:F,title:Ge.get(F)||F,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let m of Ys)for(let F of m.rows)F.ghost!==!0&&Kn.push({id:F.id,title:F.title,location_label:`${m.id} #${F.seq??""}`.trim(),kind:"serial",lane_id:m.id});Ia.forEach((m,F)=>{Kn.push({id:m.id,title:m.title,location_label:`#${F+1}`,kind:"parallel",lane_id:null})});for(let m of Sa)Kn.push({id:m.id,title:m.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let Ql={};for(let m of Kl)m&&typeof m.id=="string"&&Array.isArray(m.entries)&&(Ql[m.id]=m.entries.length);let Pa=new Map;for(let m of Kn)Pa.has(m.id)||Pa.set(m.id,m);j={members_by_id:Pa,serial_raw_lengths:Ql,serial_lane_count:Yl,occupied_lanes:Xl};let Xf=Ld(_.bead_scope,Kn),Zs=new Map;for(let[m,F]of Tl)Zs.set(m,F);for(let[m,F]of xl)Zs.set(m,F);for(let[m,F]of Object.entries(Bs))Array.isArray(F)&&Zs.set(m,F.filter(ae=>typeof ae=="string"&&ae.length>0));let Qf=ip(Zs,Kn,Us),Da=(m,F=null)=>{let ae=Xf.get(m),qe=Qf.get(m)||null,Ke=ae&&ae.overlaps.length>0?ae.overlaps:null,Nt=!!ae&&ae.scope_missing;if(!qe&&!Ke&&!Nt)return F;let kt=Ke?Oe(m,Ke):null;return{...F||{},...qe?{predecessors:qe}:{},...Ke?{overlaps:Ke}:{},...Nt?{scope_missing:!0}:{},...kt?{popover:kt}:{}}},Ma=m=>{let F=Da(m.id,m.dependency_chips||null);return F&&(m.dependency_chips=F),m};for(let m of Ia)Ma(m);for(let m of Ys)for(let F of m.rows)F.ghost!==!0&&Ma(F);for(let m of Sa)Ma(m);let Jl=new Map;for(let m of Ar){let F=typeof m.bead_id=="string"?m.bead_id:"";if(F.length===0)continue;let ae=m.kind==="session",qe=Da(F),Ke=typeof m.attempt_id=="string"&&m.attempt_id.length>0?Zr.get(m.attempt_id):void 0,Nt=Ke&&Ke.last_activity&&typeof Ke.last_activity=="object"?Ke.last_activity:null,kt=Ke&&Array.isArray(Ke.legs)?Ke.legs:[];!qe&&!Nt&&kt.length===0&&!ae||Jl.set(F,{...Nt?{last_activity:Nt}:{},...kt.length>0?{legs:kt}:{},...qe?{dependency_chips:qe}:{}})}let Jf=Dn.map(m=>lv(m.bead_id,Ge.get(m.bead_id)||m.bead_id,Yr,pt[m.bead_id]||null,bn(_.attempts||{},m.bead_id),Ne[m.bead_id]||(H.has(m.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:J.has(m.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Gs.get(m.bead_id)||null,m.external===!0,{position:Ol.get(m.bead_id)||0,active:Sr.active===m.bead_id,failure:zf[m.bead_id]||null,waiting:Ml?.bead_id===m.bead_id?Ml.reason:null,resolution:Ll.get(m.bead_id),continuation_action:Il.get(m.bead_id),head_review:Pl.get(m.bead_id)||null,authority:Dl.get(m.bead_id)||null},m.wt_present!==!1,_.auto_merge===!0?Nl(m.bead_id):null,ml(zs,Uf(m.bead_id)),_.completion_status&&typeof _.completion_status=="object"&&!Array.isArray(_.completion_status)&&_.completion_status[m.bead_id]||null,_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},Zr.get(Al.get(m.bead_id)||"")?.worker_serial===!0,_.auto_merge===!0,{merge_sha:m.merge_sha,cleanup_cursor:m.cleanup_cursor,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]},Da(m.bead_id))).map(m=>({...m,workflow:Rn[m.id]||null,priority:Vt.get(m.id),...or(m.id)}));return{queue:_,idToTitle:Ge,candidates:Sa,candidate_hidden:{blocked:Aa.hidden_blocked,spec:Aa.hidden_spec},running:Ar,live_count:ql,slots:jl,over_cap:Gf,failure:Cl,waiting:Ia,serial_lanes:Ys,serial_lane_count:Yl,running_overlays:Jl,pr_wait:Jf,merge_queue_length:Oa.length,merge_queue_running:Oa.length>0,auto_excluded:Dn.map(m=>m.bead_id).filter(m=>Nl(m)!==null),declared_base:zs,done:Xr,token_total:Zf,cleanup_failures:pn,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]}}function ct(){let k=!!o?.get()?.job,d=!k&&o?.isPending?.()===!0,f=k?"\uBD84\uC11D \uC911":d?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${f?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${f?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${f?c`<span class="worker-analysis-btn__badge">${f}</span>`:""}
    </button>`}function qt(_){let k=_.waiting.length>0?_.waiting[0].id:"\u2014",d=c`<button
      type="button"
      class="worker-play${_.queue.auto_advance?" is-active":""}"
    >
      ${_.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,f=Ht(_),w=_.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",$=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${_.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${_.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${ne()} 완료 <b>${_.done.length}</b></span
      >`,z=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${_.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${_.declared_base||"?"}</span
    >`,W=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${$a}
          step="1"
          .value=${String(_.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:pf},(E,ye)=>ye+1).map(E=>c`<option
                value=${String(E)}
                ?selected=${_.serial_lane_count===E}
              >
                ${E}
              </option>`)}
        </select>
      </label>
      ${o?ct():""} `,y=qd({failure:_.failure}),O=Td(_.repo_operations,_.cleanup_failures);return we?c`<div class="worker-ribbon">
          ${d} ${f}
          <div class="worker-kpi worker-kpi--ribbon">${w}${$}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${W}</div>
          <div class="worker-kpi">${z}</div>
        </div>
        ${O}${_t.template()}${y}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${d}${f}${W}</div>
        <div class="worker-kpi">
          ${w}${$}${z}
          ${(Array.isArray(_.token_total)?_.token_total:_.token_total?[{label:_.token_total,tooltip:`${ne()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(E=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${E.tooltip}
                >${ne()} 완료 · 누적 ${E.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${k}</b></span
          >
        </div>
      </div>
      ${O}${_t.template()}${y}`}function Ct(_){if(_.running.length===0&&_.pr_wait.length===0)return"";let k=_.running.some(d=>d.kind!=="session"&&!d.paused&&d.failed!==!0);return c`<section
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
          >${_.running.length+_.pr_wait.length}</span
        >
      </header>
      ${_.running.length>0?Vi(_.running,Date.now(),Pe,_.running_overlays):""}
      ${_.pr_wait.map(d=>Jn(d))}
    </section>`}function cn(_){let k=_.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${oe.show_blocked}
        />
        🔒 blocked${k.blocked>0?` ${k.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Fy.map(d=>c`<button
              type="button"
              class="worker-filter__chip${oe.spec===d.value?" is-active":""}"
              data-spec=${d.value}
              aria-pressed=${oe.spec===d.value?"true":"false"}
            >
              ${d.label}
            </button>`)}
        ${k.spec>0?c`<span class="worker-filter__hidden">숨김 ${k.spec}</span>`:""}
      </div>
    </div>`}function Qt(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${K}
    >
      ${vf.map(_=>c`<option value=${_.value} ?selected=${K===_.value}>
            ${_.label}
          </option>`)}
    </select>`}function jt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${I}
      >
        ${Rr.map(_=>c`<option value=${_.value} ?selected=${I===_.value}>
              ${_.label}
            </option>`)}
      </select>
    </div>`}function Gt(_){let k=c`<span
      class="worker-lane__badge${_.occupied?" worker-lane__badge--held":""}"
      >${_.badge}</span
    >`,d=_.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return yn({id:`worker-pane-lane-${_.id}`,lane:_.id,title:`\uC9C1\uB82C ${_.index}`,items:_.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:k,controls:d})}function Ht(_){let k=_.queue.auto_merge===!0;if(_.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${k?" is-active":""}"
        title=${k?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${k?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${_.merge_queue_length}
      </button>`;if(k)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let d=new Set(_.auto_excluded),f=_.pr_wait.filter(w=>w.merge_action&&w.merge_enabled&&!d.has(w.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${f>0?` ${f}`:""}
    </button>`}function mt(_){let k=yn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:_.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Qt(),controls:cn(_),place_menu:Xe(_.candidates),onOpenDoc:g?(d,f)=>g(f):void 0});return we?c`<div class="worker-lanes worker-lanes--mobile">
        ${Ct(_)}
        ${yn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:Ee.queue,preview:mf(_.waiting)})}
        ${_.serial_lanes.map(d=>Gt(d))}
        ${k}
        ${yn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:_.done,empty:`${ne()} \uC644\uB8CC \uC5C6\uC74C`,controls:jt(),collapsible:!0,collapsed:Ee.done,preview:Array.isArray(_.token_total)?_.token_total.map(d=>d.label).join(" \xB7 "):_.token_total||mf(_.done)})}
      </div>`:c`<div class="worker-lanes">
      ${k}
      <div class="worker-wait">
        ${yn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${_.serial_lanes.map(d=>Gt(d))}
      </div>
      ${yn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${_.slots}`,items:_.running,live:_.running.some(d=>d.kind!=="session"&&!d.paused&&d.failed!==!0),body:Vi(_.running,Date.now(),Pe,_.running_overlays)})}
      ${yn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:_.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${yn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${ne()} ${_.done.length}`,items:_.done,empty:`${ne()} \uC644\uB8CC \uC5C6\uC74C`,controls:jt()})}
    </div>`}function Wt(_){Ee={...Ee,[_]:!Ee[_]},Gy(Ee),Ve()}function Ve(){let _=$e();Ze(qt(_),je),Ze(mt(_),We)}function vn(){if(typeof window.matchMedia!="function")return;let _=window.matchMedia(zy);we=!!_.matches;let k=d=>{let f=!!(d&&typeof d.matches=="boolean"?d.matches:_.matches);f!==we&&(we=f,Ve())};typeof _.addEventListener=="function"?(_.addEventListener("change",k),te.push(()=>_.removeEventListener("change",k))):typeof _.addListener=="function"&&(_.addListener(k),te.push(()=>_.removeListener(k)))}let ot=null;function Ce(_){ot=_.target instanceof Element?_.target:null}function R(_){let d=_.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!d)return;if(ot&&d.contains(ot)&&ot.closest("input, button, a")){_.preventDefault();return}let f=d.dataset.beadId||"",w=d.dataset.lane||"";U={bead_id:f,from_lane:w};try{_.dataTransfer?.setData("text/plain",f),_.dataTransfer&&(_.dataTransfer.effectAllowed="move")}catch{}}function pe(_){let k=_.target?.closest?.(".worker-pane");if(!k)return;let d=k.dataset.lane||"";d!=="candidate"&&d!=="queue"&&!/^s[1-5]$/.test(d)||(_.preventDefault(),_.dataTransfer&&(_.dataTransfer.dropEffect="move"),k.classList.add("worker-pane--drag-over"))}function Se(_){_.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function dt(_,k){let d=Z.find(z=>z.id===_);if(!d)return;let f=Z.filter(z=>z.id!==_),w=f.length;if(k){let z=k.dataset.beadId;if(z===_)return;let W=f.findIndex(y=>y.id===z);W>=0&&(w=W)}let $=f.slice();$.splice(w,0,d),N.applyReorder(_,$,w)}function At(_){let k=_.target?.closest?.(".worker-pane");if(!k)return;_.preventDefault(),k.classList.remove("worker-pane--drag-over");let d=k.dataset.lane||"",f=U?.bead_id||_.dataTransfer?.getData("text/plain")||"",w=U?.from_lane||"";if(U=null,!f)return;let $=_.target?.closest?.(".worker-mini, .worker-card"),z=Array.from(k.querySelectorAll(".worker-mini, .worker-card")),W=z.length;if($){let y=z.indexOf($);y>=0&&(W=y)}if(W=Math.max(0,W-k.querySelectorAll(".worker-mini--ghost").length),k.classList.contains("worker-pane--collapsed")&&(W=Fe()),d==="candidate"){if(w==="candidate"){dt(f,$);return}(w==="queue"||/^s[1-5]$/.test(w))&&Je(f);return}if(d==="queue"||/^s[1-5]$/.test(d)){let y=d==="queue"?"parallel":d;w===d?rt(f,y,W):at(f,y)}}function gt(_){oe=_,Ny(_),Ve()}function Mt(_){K=wf(_),By(K),Ve()}function Ut(_){I=On(_),Wy(I),h?.(I),Ve()}function Kt(_){let k=_.target?.closest?.(".worker-serial-lane-count");if(k){let W=Number.parseInt(k.value,10);Number.isFinite(W)&&re(W).then(Ve);return}let d=_.target?.closest?.(".worker-filter__blocked");if(d){gt({...oe,show_blocked:d.checked});return}let f=_.target?.closest?.(".worker-done-range");if(f){Ut(f.value);return}let w=_.target?.closest?.(".worker-sort");if(w){Mt(w.value||gl);return}let $=_.target?.closest?.(".worker-slots__input");if(!$)return;let z=Number.parseInt($.value,10);if(!Number.isFinite(z)){Ve();return}B(z).then(Ve)}function rn(_){return _?{runner:_.runner||void 0,model:_.model||void 0,effort:_.effort||void 0,worktree:_.worktree||void 0,status:_.status||void 0,session_id:_.session_id||void 0}:{}}function St(){let _=$e();return{operations:_.repo_operations,cleanup_failures:_.cleanup_failures,repo:u&&u()||""}}function un(){Pe&&Ye.close(),Ie.hidden=!1,M.hidden=!1,it.open(St()),Ve()}function dn(_){let k=X(),d=k.attempts?k.attempts[_]:null;Pe=_,He=null,it.close(),Ie.hidden=!0,M.hidden=!1,Ye.open({attempt_id:_,meta:rn(d)}),Ve()}function Hn(_,k){Pe=null,He=_,it.close(),Ie.hidden=!0,M.hidden=!1,Ye.open({attempt_id:_,meta:k,hide_prompt:!0}),Ve()}function T(){if(it.isOpen()&&it.refresh(St()),He){let d=(o?.get()?.runs||[]).find(f=>f.run_id===He);d?Ye.updateMeta(fl(d)):Ye.close();return}if(!Pe)return;let _=X(),k=_.attempts?_.attempts[Pe]:null;if(k){Ye.updateMeta(rn(k));return}Ye.close()}function D(_,k){if(_.length===0||!l)return;let d=u?u():void 0;if(k.length===0||!d||k===d||!p){l(_);return}Promise.resolve(p(k)).then(()=>{l(_)}).catch(()=>{le("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function Le(_){let k=_.target;if(k?.closest?.(".worker-mini__serial, .worker-mini__grip")||k?.closest?.("#worker-parallel-analysis-dialog"))return;let d=k?.closest?.(".worker-dep__open");if(d){D(d.getAttribute("data-dep-id")||"",d.getAttribute("data-root-dir")||"");return}let f=k?.closest?.(".mon-overlap__chip");if(f){let Ne=f.closest("[data-bead-id]"),pt=Ne&&Ne.getAttribute("data-bead-id")||"";if(pt){let pn=f.getAttribute("data-overlap-id")||"";q=!!q&&q.bead_id===pt&&q.counterpart_id===pn?null:{bead_id:pt,counterpart_id:pn},Ve()}return}let w=k?.closest?.(".mon-overlap__place");if(w){let Ne=w.closest("[data-bead-id]"),pt=Ne&&Ne.getAttribute("data-bead-id")||"";pt&&et(pt,w.getAttribute("data-counterpart-id")||"");return}if(k?.closest?.(".mon-overlap__popover"))return;if(k?.closest?.(".worker-analysis-btn")){ee?.open();return}if(k?.closest?.(".worker-repo-strip")||k?.closest?.(".worker-mini__timeline")){un();return}let $=k?.closest?.(".worker-repo-op__session");if($){let Ne=$.dataset.attemptId;Ne&&dn(Ne);return}let z=k?.closest?.(".worker-repo-op__resolve");if(z){b(z.dataset.operationId||"");return}let W=k?.closest?.(".worker-repo-op__dismiss");if(W){x(W.dataset.operationId||"");return}let y=k?.closest?.(".worker-cleanup__resume");if(y){let Ne=y.dataset.beadId;Ne&&ze(Ne);return}let O=k?.closest?.(".worker-banner__resume");if(O){let Ne=O.dataset.attemptId;Ne&&It(Ne);return}let E=k?.closest?.(".worker-banner__discard");if(E){let Ne=E.dataset.confirmation==="merged"?"merged":"unmerged";C(E.dataset.beadId||"",E.dataset.attemptId||null,Ne,E.dataset.operationId||null);return}let ye=k?.closest?.(".worker-banner__dismiss");if(ye){let Ne=ye.dataset.attemptId;Ne&&vt(Ne);return}if(k?.closest?.(".worker-play")){S(!X().auto_advance);return}let tt=k?.closest?.(".worker-merge-all");if(tt){tt.classList.contains("worker-merge-all--stop")?X().auto_merge===!0?P(!1):ue():P(!0);return}let nt=k?.closest?.(".worker-pane__hd--toggle");if(nt){let Ne=nt.dataset.lane;(Ne==="queue"||Ne==="done")&&Wt(Ne);return}let lt=k?.closest?.(".worker-card__place-lane");if(lt){let Ne=lt.dataset.beadId,pt=lt.dataset.lane;Ne&&(pt==="parallel"||/^s[1-5]$/.test(pt||""))&&(Y=null,Ve(),at(Ne,pt));return}if(k?.closest?.(".worker-card__place-cancel")){Y=null,Ve();return}let Pt=k?.closest?.(".worker-card__place");if(Pt){let Ne=Pt.dataset.beadId;Ne&&!Pt.disabled&&(Te()?(Y=Ne,Ve()):at(Ne,"parallel"));return}let Vt=k?.closest?.(".worker-filter__chip");if(Vt){let Ne=Vt.dataset.spec;(Ne==="all"||Ne==="with"||Ne==="without")&&gt({...oe,spec:Ne});return}let Fs=k?.closest?.(".worker-mini__merge");if(Fs){let Ne=Fs.dataset.beadId||"";X().cleanup_failed?.[Ne]?ze(Ne):wt(Ne);return}let js=k?.closest?.(".worker-mini__merge-cancel");if(js){Q(js.dataset.beadId||"");return}let Rn=k?.closest?.(".worker-mini__discard");if(Rn){C(Rn.dataset.beadId||"",Rn.dataset.attemptId||null,Rn.dataset.discardMode==="merged"?"merged":"unmerged",Rn.dataset.operationId||null);return}let Gn=k?.closest?.(".worker-mini__stale-continue");if(Gn){V("worker-stale-work-continue",Gn.dataset.beadId||"",Gn.dataset.actionId||"");return}let wr=k?.closest?.(".worker-mini__stale-backup");if(wr){V("worker-stale-work-backup-fresh",wr.dataset.beadId||"",wr.dataset.actionId||"");return}let kr=k?.closest?.(".worker-mini__stale-recheck");if(kr){V("worker-stale-work-recheck",kr.dataset.beadId||"",kr.dataset.actionId||"");return}let Bs=k?.closest?.(".worker-mini__revise-fix");if(Bs){de("worker-revise-fix",Bs.dataset.beadId||"");return}let Us=k?.closest?.(".worker-mini__revise-approve");if(Us){de("worker-revise-approve",Us.dataset.beadId||"");return}if(k?.closest?.(".worker-mini__pr"))return;if(k?.closest?.(".rtile__discard")){let Ne=k?.closest?.(".rtile"),pt=Ne?.dataset?.beadId,pn=Ne?.dataset?.attemptId;pt&&C(pt,pn||null,"unmerged",k?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(k?.closest?.(".rtile__dismiss")){let pt=k?.closest?.(".rtile")?.dataset?.attemptId;pt&&vt(pt);return}if(k?.closest?.(".rtile__pause")){let pt=k?.closest?.(".rtile")?.dataset?.attemptId;pt&&yt(pt);return}if(k?.closest?.(".rtile__resume")){let pt=k?.closest?.(".rtile")?.dataset?.attemptId;pt&&It(pt);return}if(k?.closest?.(".rtile__session")){let pt=k?.closest?.(".rtile")?.dataset?.attemptId;pt&&dn(pt);return}if(k?.closest?.(".worker-drawer-overlay__backdrop")){it.close(),Ye.close();return}if(k?.closest?.(".worker-drawer-host"))return;let $r=k?.closest?.(".rtile .board-card__roll-toggle");if($r){let Ne=$r.dataset.rollParent;Ne&&(ge.has(Ne)?ge.delete(Ne):ge.add(Ne),Ve());return}let or=k?.closest?.(".rtile .board-card__roll-child");if(or){let Ne=or.dataset.childId;Ne&&l&&l(Ne);return}let Dn=k?.closest?.(".rtile");if(Dn){if(k?.closest?.(".rtile__id")){let pt=Dn.dataset.beadId;pt&&fn(pt).then(pn=>{pn?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ne=Dn.dataset.beadId;Ne&&l&&l(Ne);return}let Yr=k?.closest?.(".worker-mini, .worker-card");if(Yr){let Ne=Yr.dataset.beadId;if(k?.closest?.(".worker-mini__id, .worker-card__id")){Ne&&fn(Ne).then(pn=>{pn?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let pt=k?.closest?.(".ctl-chip--from");if(pt){let pn=pt.dataset.fromId;pn&&l&&l(pn);return}Ne&&l&&l(Ne)}}e.addEventListener("pointerdown",Ce),e.addEventListener("dragstart",R),e.addEventListener("dragover",pe),e.addEventListener("dragleave",Se),e.addEventListener("drop",At),e.addEventListener("click",Le),e.addEventListener("change",Kt);function Be(_){if(!q)return;let k=_.target;k&&typeof k.closest=="function"&&k.closest(".mon-overlap__popover, .mon-overlap__chip")||(q=null,Ve())}function Qe(_){_.key!=="Escape"||!q||(q=null,Ve())}return document.addEventListener("click",Be),document.addEventListener("keydown",Qe),te.push(()=>{document.removeEventListener("click",Be),document.removeEventListener("keydown",Qe)}),vn(),A&&te.push(A.subscribe(()=>{for(let[_,k]of L)k==="failed"&&L.delete(_);Ve()})),s&&te.push(s.subscribe(()=>{let _=u&&u()||"";_!==xt&&(xt=_,ft.close()),Ve(),T()})),o&&typeof o.subscribe=="function"&&te.push(o.subscribe(()=>{T(),Ve()})),Ve(),{load(){ke(),Ve()},refreshSessionDefaults:Ue,destroy(){for(let _ of te.splice(0))try{_()}catch{}e.removeEventListener("pointerdown",Ce),e.removeEventListener("dragstart",R),e.removeEventListener("dragover",pe),e.removeEventListener("dragleave",Se),e.removeEventListener("drop",At),e.removeEventListener("click",Le),e.removeEventListener("change",Kt);try{Ye.destroy()}catch{}M.hidden=!0;try{ee?.destroy()}catch{}try{ft.destroy()}catch{}Ze(c``,e)}}}function hl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function xf(e,t,n,r=async()=>{},s=async()=>{}){let o=Lt("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function p(K){let L=K.target.value,Ee=t.getState().workspace?.current?.path||"";if(L&&L!==Ee){o("switching workspace to %s",L),i=!0,j();try{await n(L)}catch(we){o("workspace switch failed: %o",we)}finally{i=!1,j()}}}async function g(){let K=t.getState(),I=K.workspace?.current?.path||K.workspace?.available?.[0]?.path||"";if(!(!I||l)){o("git-pulling workspace %s",I),l=!0,j();try{await r(I)}catch(L){o("workspace git pull failed: %o",L)}finally{l=!1,j()}}}function v(K){let I=K.target;I&&e.contains(I)||N()}function h(K){K.key==="Escape"&&N()}function A(){u||(u=!0,document.addEventListener("mousedown",v),document.addEventListener("keydown",h),j())}function N(){u&&(u=!1,document.removeEventListener("mousedown",v),document.removeEventListener("keydown",h),j())}function U(){u?N():A()}async function Z(K){let I=K.target,L=I.value,ne=I.checked;o("toggling visibility %s \u2192 %s",L,String(ne));try{await s(L,ne)}catch(Ee){o("workspace visibility toggle failed: %o",Ee)}}function oe(K){return K?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${g}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function Y(K,I){return c`
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
                ${K.map(L=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${L.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${L.path}"
                        .checked=${!I.has(L.path)}
                        @change=${Z}
                      />
                      <span class="workspace-picker__manage-name"
                        >${hl(L.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let K=t.getState(),I=K.workspace?.current,L=K.workspace?.available||[],ne=new Set(K.workspace?.hidden||[]),Ee=I?.path||L[0]?.path||"";if(L.length===0)return c``;let we=L.filter(H=>!ne.has(H.path)||H.path===Ee);if(we.length<=1){let H=we[0]||L[0],J=hl(H.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${H.path}"
            >${J}</span
          >
          ${Y(L,ne)}
          ${oe(Ee)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${we.map(H=>c`
              <option
                value="${H.path}"
                ?selected=${H.path===Ee}
                title="${H.path}"
              >
                ${hl(H.path)}
              </option>
            `)}
        </select>
        ${Y(L,ne)}
        ${oe(Ee)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function j(){Ze(q(),e)}return j(),a=t.subscribe(()=>j()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",v),document.removeEventListener("keydown",h),Ze(c``,e)}}}var Af=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function yl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Sf(e,t,n=yl()){return{id:n,type:e,payload:t}}function Ef(e={}){let t=Lt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,p=[],g=new Map,v=new Set;function h(q){for(let j of Array.from(v))try{j(q)}catch{}}function A(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),h(o);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),j=(n.jitterRatio||0)*q,K=Math.max(0,Math.round(q+(Math.random()*2-1)*j));t("ws retry in %d ms (attempt %d)",K,a+1),i=setTimeout(()=>{i=null,Y()},K)}function N(q){try{s?.send(JSON.stringify(q))}catch(j){t("ws send failed",j)}}function U(){for(o="open",t("ws open"),h(o),a=0;p.length;){let q=p.shift();q&&N(q)}}function Z(q){let j;try{j=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!j||typeof j.id!="string"||typeof j.type!="string"){t("ws received invalid envelope");return}if(u.has(j.id)){let I=u.get(j.id);u.delete(j.id),j.ok?I?.resolve(j.payload):I?.reject(j.error||new Error("ws error"));return}let K=g.get(j.type);if(K&&K.size>0)for(let I of Array.from(K))try{I(j.payload)}catch(L){t("ws event handler error",L)}else t("ws received unhandled message type: %s",j.type)}function oe(){o="closed",t("ws closed"),h(o);for(let[q,j]of u.entries())j.reject(new Error("ws disconnected")),u.delete(q);a+=1,A()}function Y(){if(!l)return;let q=r();try{s=new WebSocket(q),t("ws connecting %s",q),o="connecting",h(o),s.addEventListener("open",U),s.addEventListener("message",Z),s.addEventListener("error",()=>{}),s.addEventListener("close",oe)}catch(j){t("ws connect failed %o",j),A()}}return Y(),{send(q,j){if(!Af.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let K=yl(),I=Sf(q,j,K);return t("send %s id=%s",q,K),new Promise((L,ne)=>{u.set(K,{resolve:L,reject:ne,type:q}),s&&s.readyState===s.OPEN?N(I):(t("queue %s id=%s (state=%s)",q,K,o),p.push(I))})},on(q,j){g.has(q)||g.set(q,new Set);let K=g.get(q);return K?.add(j),()=>{K?.delete(j)}},onConnection(q){return v.add(q),()=>{v.delete(q)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,Y()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function cv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function uv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var vl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Tf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],rr="tab:worker:closed",dv="bdui.worker.done-range",Cf=Tp,Rf="worker:queue",Of="worker:parallel-analysis",Lf="ui:order",If="ui:display-policy",Pf="exec:presets",sr="tab:board:closed",Df="beads-ui.board.closed-range";function pv(e){let t=Lt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ze(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(a&&Vp(a),i&&l&&u&&p){let te=function(T,D){let Le="Request failed",Be="";if(T&&typeof T=="object"){let _=T;if(typeof _.message=="string"&&_.message.length>0&&(Le=_.message),typeof _.details=="string")Be=_.details;else if(_.details&&typeof _.details=="object")try{Be=JSON.stringify(_.details,null,2)}catch{Be=""}}else typeof T=="string"&&T.length>0&&(Le=T);let Qe=D&&D.length>0?`Failed to load ${D}`:"Request failed";G.open(Qe,Le,Be)},Te=function(T){return`${ot.getState().workspace.current?.path||""}\0${T}`},Xe=function(){He&&(He().catch(()=>{}),He=null),Ye=null,it=null},be=function(T){ft=T;let D=()=>{ft!==T||ot.getState().selected_id!==T||(ft=null,De(T))};if(!ee){_t.then(D);return}D()},Je=function(T,D,Le,Be,Qe){return Le!==rt[D]?(Qe().catch(()=>{}),!1):(T.set(Be,Qe),!0)},It=function(){let T=ot.getState();Re(T.view==="board"),de(T.view==="worker"),re(T.view==="monitor"),b(T.view==="board"||T.view==="worker"||yt||!!T.selected_id)},wt=function(){let T=dr(vt);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},ze=function(){let T=dr(Tt);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},Re=function(T){if(T)for(let[D,Le]of vl){if(Fe.has(D)||at.has(D))continue;let Be=D===sr?wt():{type:Le};try{_e.register(D,Be)}catch(k){t("register %s store failed: %o",D,k)}at.add(D);let Qe=rt.board,_=!1;Ue.subscribeList(D,Be).then(k=>{_=!Je(Fe,"board",Qe,D,k)}).catch(k=>{t("subscribe %s failed: %o",D,k),te(k,"board")}).finally(()=>{at.delete(D),_&&It()})}else ue()},ue=function(){rt.board+=1;for(let[T]of vl){let D=Fe.get(T);D&&(D().catch(()=>{}),Fe.delete(T));try{_e.unregister(T)}catch(Le){t("unregister %s failed: %o",T,Le)}}},de=function(T){if(!T){S();return}for(let[D,Le]of Tf){if(C.has(D)||at.has(D))continue;let Be=D===rr?ze():{type:Le};try{_e.register(D,Be)}catch(k){t("register %s store failed: %o",D,k)}at.add(D);let Qe=rt.worker,_=!1;Ue.subscribeList(D,Be).then(k=>{_=!Je(C,"worker",Qe,D,k)}).catch(k=>{t("subscribe %s failed: %o",D,k),te(k,"worker")}).finally(()=>{at.delete(D),_&&It()})}},S=function(){rt.worker+=1;for(let[T]of Tf){let D=C.get(T);D&&(D().catch(()=>{}),C.delete(T));try{_e.unregister(T)}catch(Le){t("unregister %s failed: %o",T,Le)}}},b=function(T){if(!T){x();return}V||(ke("subscribe-worker-queue",{id:Rf}).catch(D=>{t("subscribe-worker-queue failed: %o",D)}),ke("subscribe-worker-parallel-analysis",{id:Of}).catch(D=>{t("subscribe-worker-parallel-analysis failed: %o",D)}),V=()=>(ke("unsubscribe-worker-parallel-analysis",{id:Of}),ke("unsubscribe-worker-queue",{id:Rf})))},x=function(){V&&(V().catch(()=>{}),V=null),M.clear()},re=function(T){if(!T){se();return}B||(ke("subscribe-monitor-pipeline",{id:Cf}).catch(D=>{t("subscribe-monitor-pipeline failed: %o",D)}),B=()=>ke("unsubscribe-monitor-pipeline",{id:Cf}))},se=function(){B&&(B().catch(()=>{}),B=null)},Oe=function(){he||(ke("subscribe-ui-order",{id:Lf}).catch(T=>{t("subscribe-ui-order failed: %o",T)}),he=()=>ke("unsubscribe-ui-order",{id:Lf}))},et=function(){he&&(he().catch(()=>{}),he=null),Me.clear()},$e=function(){st||(ke("subscribe-display-policy",{id:If}).catch(T=>{t("subscribe-display-policy failed: %o",T)}),st=()=>ke("unsubscribe-display-policy",{id:If}))},ct=function(){st&&(st().catch(()=>{}),st=null),Ie.clear()},Ct=function(){qt||(ke("subscribe-impl-presets",{id:Pf}).catch(T=>{t("subscribe-impl-presets failed: %o",T)}),qt=()=>ke("unsubscribe-impl-presets",{id:Pf}))},mt=function(T){if(!T)return"Unknown";let D=T.split("/").filter(Boolean);return D.length>0?D[D.length-1]:"Unknown"},Ut=function(T,D){Mt.open(T.path,{missing_state:T.missing_state,...D?{workspace:D}:{}})};var g=te,v=Te,h=Xe,A=be,N=Je,U=It,Z=wt,oe=ze,Y=Re,q=ue,j=de,K=S,I=b,L=x,ne=re,Ee=se,we=Oe,H=et,J=$e,fe=ct,xe=Ct,ge=mt,ce=Ut;let Ae=document.getElementById("header-loading"),ve=Nc(Ae),G=Ed(e),ie=Ef(),ke=ve.wrapSend((T,D)=>ie.send(T,D)),Ue=Cc(ke),_e=Rc(),je=Ic(),M=Lc(),me=mc(),Me=Oc(),Ie=fc(),We=_c(),Pe=gc();ie.on("impl-presets-snapshot",T=>{let D=T;D&&typeof D.revision=="number"&&Array.isArray(D.presets)&&We.set({revision:D.revision,presets:D.presets})}),ie.on("monitor-pipeline-snapshot",T=>{let D=T;if(!(!D||!Array.isArray(D.workspaces)))try{me.set(D.workspaces,D.workspaces_state,D.cross_lanes)}catch{}}),ie.on("ui-order-snapshot",T=>{let D=T;if(D&&typeof D.revision=="number")try{Me.set({revision:D.revision,order:D.order&&typeof D.order=="object"?D.order:{}})}catch{}}),ie.on("display-policy-snapshot",T=>{let D=T;if(D&&D.policy&&typeof D.policy=="object")try{Ie.set(D.policy)}catch{}}),ie.on("session-log-snapshot",T=>{let D=T;if(D&&typeof D.id=="string")try{Pe.set(D.id,Array.isArray(D.lines)?D.lines:[],typeof D.last_event_at=="number"?D.last_event_at:null)}catch{}}),ie.on("session-log-append",T=>{let D=T;if(D&&typeof D.id=="string")try{Pe.append(D.id,D.event)}catch{}}),ie.on("snapshot",T=>{let D=T,Le=D&&typeof D.id=="string"?D.id:"",Be=Le?_e.getStore(Le):null;if(Be&&D&&D.type==="snapshot")try{Be.applyPush(D)}catch{}}),ie.on("upsert",T=>{let D=T,Le=D&&typeof D.id=="string"?D.id:"",Be=Le?_e.getStore(Le):null;if(Be&&D&&D.type==="upsert")try{Be.applyPush(D)}catch{}}),ie.on("delete",T=>{let D=T,Le=D&&typeof D.id=="string"?D.id:"",Be=Le?_e.getStore(Le):null;if(Be&&D&&D.type==="delete")try{Be.applyPush(D)}catch{}});let He=null,Ye=null,it=null,ft=null,xt=()=>{},_t=new Promise(T=>{xt=()=>T(void 0)}),ee=!1,X=!1;async function De(T){let D=Te(T);if(D===Ye||D===it)return;it=D;let Le=`detail:${T}`,Be={type:"issue-detail",params:{id:T}};try{_e.register(Le,Be)}catch(Qe){t("register detail store failed: %o",Qe)}try{let Qe=await Ue.subscribeList(Le,Be);if(ot.getState().selected_id!==T||Te(T)!==D){await Qe().catch(()=>{});return}He&&await He().catch(()=>{}),He=Qe,Ye=D}catch(Qe){t("detail subscribe failed: %o",Qe),te(Qe,"issue details")}finally{it===D&&(it=null)}}let Fe=new Map,at=new Set,rt={board:0,worker:0},yt=!1,vt=oo;try{let T=window.localStorage.getItem(Df);Ha(T)&&(vt=T)}catch{}let Tt="today";try{let T=window.localStorage.getItem(dv);T!==null&&(Tt=On(T))}catch{}async function P(T){if(!Ha(T)||T===vt)return;vt=T;try{window.localStorage.setItem(Df,T)}catch{}let D=Fe.get(sr);if(!D)return;Fe.delete(sr),await D().catch(()=>{});let Le=wt();try{_e.register(sr,Le)}catch(Be){t("register %s store failed: %o",sr,Be)}try{let Be=await Ue.subscribeList(sr,Le);Fe.set(sr,Be)}catch(Be){t("re-subscribe %s failed: %o",sr,Be),te(Be,"board")}}async function Q(T){let D=On(T);if(D===Tt)return;Tt=D;let Le=C.get(rr);if(!Le)return;C.delete(rr),await Le().catch(()=>{});let Be=ze();try{_e.register(rr,Be)}catch(Qe){t("register %s store failed: %o",rr,Qe)}try{let Qe=await Ue.subscribeList(rr,Be);C.set(rr,Qe)}catch(Qe){t("re-subscribe %s failed: %o",rr,Qe),te(Qe,"worker")}}let C=new Map,V=null,B=null,he=null,st=null,qt=null;async function cn(){st=null,Ie.clear(),qt=null,We.clear(),V=null,B=null,Fe.clear(),C.clear(),rt.board+=1,rt.worker+=1,Ct();let T=ot.getState().workspace.current?.path;if(T)try{await ie.send("set-workspace",{path:T})}catch(Le){t("workspace restore after reconnect failed: %o",Le);return}$e();let D=ot.getState();Re(D.view==="board"),de(D.view==="worker"),re(D.view==="monitor"),b(D.view==="board"||D.view==="worker"||!!D.selected_id)}async function Qt(){t("clearing all subscriptions for workspace switch"),ue(),S(),x(),je.clear(),et(),Oe(),ct(),$e(),Xe();let T=ot.getState();if(T.selected_id)try{_e.unregister(`detail:${T.selected_id}`)}catch{}let D=ot.getState();Re(D.view==="board"),de(D.view==="worker"),re(D.view==="monitor"),b(D.view==="board"||D.view==="worker"||!!D.selected_id),D.selected_id&&be(D.selected_id)}async function jt(T){t("requesting workspace switch to %s",T),X=!0;try{let D=await ie.send("set-workspace",{path:T});t("workspace switch result: %o",D),D&&D.workspace&&(ot.setState({workspace:{current:{path:D.workspace.root_dir,database:D.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",T),D.changed&&(await Qt(),le("Switched to "+mt(T),"success",2e3)))}catch(D){throw t("workspace switch failed: %o",D),le("Failed to switch workspace","error",3e3),D}finally{X=!1}}async function Gt(T){t("requesting workspace git pull for %s",T);try{let D=await ie.send("git-pull-workspace",{});t("workspace git pull result: %o",D);let Le=D?.status;if(Le==="up_to_date"){le("Already up to date","success",2e3);return}if(Le==="stash_pop_conflict"){le("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}le("Git pulled "+mt(T),"success",2e3)}catch(D){t("workspace git pull failed: %o",D);let Le=D?.code,Be=D?.message;if(Le==="rebase_conflict"){le("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Le==="rebase_conflict_abort_failed"){le("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Le==="busy"){le("Git pull skipped: another operation is running","warning",3e3);return}let Qe=Be?`: ${Be}`:"";throw le(`Git pull failed${Qe}`,"error",3e3),D}}async function Ht(T,D){t("setting workspace visibility %s \u2192 %s",T,String(D));try{await ie.send("set-workspace-visibility",{path:T,visible:D}),await Wt()}catch(Le){t("workspace visibility update failed: %o",Le),le("Failed to update project visibility","error",3e3)}}async function Wt(){try{let T=await ie.send("list-workspaces",{});if(t("workspaces loaded: %o",T),T&&Array.isArray(T.workspaces)){let D=T.workspaces.map(_=>({path:_.path,database:_.database,pid:_.pid,version:_.version})),Le=T.current?{path:T.current.root_dir,database:T.current.db_path}:null,Be=Array.isArray(T.hidden)?T.hidden.filter(_=>typeof _=="string"):[];ot.setState({workspace:{current:Le,available:D,hidden:Be}});let Qe=window.localStorage.getItem("beads-ui.workspace");Qe&&(!D.some(k=>k.path===Qe)||Be.includes(Qe)?window.localStorage.removeItem("beads-ui.workspace"):Le&&Qe!==Le.path&&(t("restoring saved workspace preference: %s",Qe),await jt(Qe)))}}catch(T){t("failed to load workspaces: %o",T)}}ie.on("workspace-changed",T=>{t("workspace-changed event: %o",T),T&&T.root_dir&&(ot.setState({workspace:{current:{path:T.root_dir,database:T.db_path}}}),Wt(),Qt())});let Ve=!1;if(typeof ie.onConnection=="function"){let T=D=>{t("ws state %s",D),D==="reconnecting"||D==="closed"?(Ve=!0,le("Connection lost. Reconnecting\u2026","error",4e3)):D==="open"&&Ve&&(Ve=!1,le("Reconnected","success",2200),uv(ot,(Le,Be)=>{t(`${Le}: %o`,Be)}),cn())};ie.onConnection(T)}let vn="board";try{let T=window.localStorage.getItem("beads-ui.view");(T==="board"||T==="worker"||T==="monitor")&&(vn=T)}catch(T){t("view parse error: %o",T)}let ot=Mc({config:cv(),view:vn});ie.on("worker-queue-snapshot",T=>{let D=T;if(!D||!D.queue)return;let Le=ot.getState().workspace.current?.path;if(typeof Le=="string"&&Le.length>0&&D.root_dir!==Le){t("dropping worker-queue snapshot for %s",String(D.root_dir));return}try{je.set(D.queue)}catch{}}),ie.on("worker-parallel-analysis-snapshot",T=>{let D=T;if(!D)return;let Le=ot.getState().workspace.current?.path;if(!(typeof Le=="string"&&Le.length>0&&typeof D.root_dir=="string"&&D.root_dir!==Le))try{M.set({settings:D.settings,job:D.job??null,runs:Array.isArray(D.runs)?D.runs:[],last_good:D.last_good??null})}catch{}});let Ce=Pc(ot);Ce.start();let R=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),pe=async(T,D)=>{try{return await ke(T,D)}catch(Le){if(R.has(T))throw Le;return[]}};Rp({global_element:r,repo_element:s},ot,Ce);let Se=document.getElementById("workspace-picker");Se&&xf(Se,ot,jt,Gt,Ht);let dt=Pp(e,(T,D)=>ke(T,D));try{let T=document.getElementById("new-issue-btn");T&&T.addEventListener("click",()=>dt.open())}catch{}let At=qp(e,{policyStore:Ie,queueStore:je,implPresetStore:We,transport:(T,D)=>ke(T,D),onOpenChange:T=>{let D=yt;yt=T,It(),D&&T===!1&&rn.refreshSessionDefaults()},labelOptions:()=>{let T=new Set;for(let[D]of vl)for(let Le of _e.snapshotFor(D)||[]){let Be=Le.labels;if(Array.isArray(Be))for(let Qe of Be)typeof Qe=="string"&&Qe.length>0&&T.add(Qe)}return Array.from(T).sort()}});try{let T=document.getElementById("display-settings-btn");T&&(T.setAttribute("aria-label","\uC124\uC815"),T.setAttribute("title","\uC124\uC815"),T.addEventListener("click",()=>At.open()))}catch{}let gt=document.createElement("div");gt.className="md-viewer-root",document.body.appendChild(gt);let Mt=Qo(gt,{getWorkspacePath:()=>ot.getState().workspace.current?.path}),Kt=Qc(i,{gotoIssue:T=>Ce.gotoIssue(T),issueStores:_e,transport:pe,workerQueueStore:je,uiOrderStore:Me,displayPolicyStore:Ie,closedRange:vt,onClosedRangeChange:T=>{P(T)},onNewIssue:()=>dt.open(),openDoc:Ut}),rn=bl(l,{transport:pe,issueStores:_e,queueStore:je,analysisStore:M,sessionLogStore:Pe,uiOrderStore:Me,gotoIssue:T=>ot.setState({selected_id:T}),getWorkspacePath:()=>ot.getState().workspace.current?.path,switchWorkspace:T=>jt(T),openDoc:Ut,doneRange:Tt,onDoneRangeChange:T=>{Q(T)}}),St=Cp(u,{transport:pe,pipelineStore:me,execPresetStore:We,sessionLogStore:Pe,router:Ce,gotoIssue:T=>Ce.gotoIssue(T),getWorkspacePath:()=>ot.getState().workspace.current?.path,switchWorkspace:T=>jt(T),openDoc:Ut}),un=Sd(p,{issueStores:_e,transport:pe,queueStore:je,execPresetStore:We,sessionLogStore:Pe,getWorkspacePath:()=>ot.getState().workspace.current?.path,mdViewer:Mt,onNavigate:T=>{ot.getState().view==="worker"?ot.setState({selected_id:T}):Ce.gotoIssue(T)},onClose:()=>{let T=ot.getState();ot.setState({selected_id:null});try{Ce.gotoView(T.view==="worker"||T.view==="monitor"?T.view:"board")}catch{}},onOpenExecPresets:()=>{At.open("execution")}}),dn=ot.getState().selected_id;dn&&(p.hidden=!1,un.load(dn),be(dn)),ot.subscribe(T=>{let D=T.selected_id;D?(p.hidden=!1,un.load(D),X||be(D)):(un.clear(),p.hidden=!0,Xe())});let Hn=T=>{i.hidden=T.view!=="board",l.hidden=T.view!=="worker",u.hidden=T.view!=="monitor",o&&o.classList.toggle("is-quiet",T.view==="monitor"),Re(T.view==="board"),de(T.view==="worker"),re(T.view==="monitor"),b(T.view==="board"||T.view==="worker"||yt||!!T.selected_id),!T.selected_id&&T.view==="board"&&Kt.load(),T.view==="worker"&&rn.load(),T.view==="monitor"?St.load():St.pause(),window.localStorage.setItem("beads-ui.view",T.view)};ot.subscribe(Hn),Hn(ot.getState()),Oe(),$e(),Ct(),Wt().finally(()=>{ee=!0,xt()}),window.addEventListener("keydown",T=>{let D=T.ctrlKey||T.metaKey,Le=String(T.key||"").toLowerCase(),Be=T.target,Qe=Be&&Be.tagName?String(Be.tagName).toLowerCase():"",_=Qe==="input"||Qe==="textarea"||Qe==="select"||Be&&typeof Be.isContentEditable=="boolean"&&Be.isContentEditable;D&&Le==="n"&&(_||(T.preventDefault(),dt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&pv(t)});export{pv as bootstrap,cv as readBootstrapConfig,uv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
